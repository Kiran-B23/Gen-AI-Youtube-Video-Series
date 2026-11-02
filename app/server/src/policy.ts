// What an agent session may do (owner, 2026-10-28: "too much human involvement"; then "replan the whole process").
// The boundary is the sandbox, not a reading of shell commands:
//   - Bash always runs in the OS sandbox (bubblewrap) with no way out (agent.ts: allowUnsandboxedCommands false). It can
//     write only inside productions/ and studio/projects/ (sandboxDenyWrite), cannot read secrets, and reaches only the
//     free sites in RESEARCH_DOMAINS. So every shell command is allowed, whatever its shape.
//   - Pipeline steps run through the app's build queue (studio-tools.ts: run_step), outside the sandbox with the key,
//     Chrome and ffmpeg. Before the owner approves the script, run_step is refused (agent.ts); after it, every step runs, voice included; a step past MAX_RUNS is refused and the agent reports. deliver is not
//     offered at all: it stays the owner's button after watching on a phone.
//   - Write/Edit (in-process, not sandboxed) are held to the same folders here.
// Anything else is denied with a message (no card): the agent says what it needed instead.
import fs from "node:fs";
import path from "node:path";
import { REPO } from "./config.js";

export type Verdict = { decision: "allow"; reason: string } | { decision: "ask"; reason: string } | { decision: "deny"; reason: string };
const allow = (reason: string): Verdict => ({ decision: "allow", reason });
const ask = (reason: string): Verdict => ({ decision: "ask", reason });
const deny = (reason: string): Verdict => ({ decision: "deny", reason });

/** run.sh steps the agent may queue (no deliver, preview, remotion or all) */
export const AGENT_STEPS = ["new", "validate", "voice", "clips", "assemble", "check", "payoffs", "render", "qa", "watch", "review", "stills", "benchmark"] as const;
/** runs per step and project until the owner next replies, then the owner decides: the steps that spend (a Gemini request,
 *  minutes of render) get 1 run + 3 fix rounds; the quick local checks more, since a stage fix often takes several passes;
 *  assemble is the rebuild after every edit, so it is not capped */
export const MAX_RUNS: Record<string, number> = { voice: 4, render: 4, assemble: Infinity };
const CHEAP_RUNS = 8;
export const maxRuns = (step: string) => MAX_RUNS[step] ?? CHEAP_RUNS;

/** free sites the sandboxed shell may reach (GitHub, HF, HN, arXiv, npm, PyPI). Not YouTube (yt-dlp hangs behind the sandbox
 *  proxy: the research tool runs it in the app) and not Gemini (voice is a card). */
export const RESEARCH_DOMAINS = ["github.com", "*.github.com",
  "*.githubusercontent.com", "huggingface.co", "*.huggingface.co", "*.hf.co", "news.ycombinator.com", "hn.algolia.com", "arxiv.org", "*.arxiv.org",
  "registry.npmjs.org", "pypi.org", "files.pythonhosted.org"];
const domainOk = (host: string) => RESEARCH_DOMAINS.some((d) => (d.startsWith("*.") ? host.endsWith(d.slice(1)) : host === d));

const WRITE_ROOTS = ["productions", path.join("studio", "projects")];
/** every path in the repo the sandboxed shell may not write: all top-level entries but productions/ and studio/, and all of studio/ but projects/ */
export function sandboxDenyWrite(): string[] {
  const out = [path.join(REPO, ".git")];
  for (const e of fs.readdirSync(REPO)) if (e !== "productions" && e !== "studio") out.push(path.join(REPO, e));
  for (const e of fs.readdirSync(path.join(REPO, "studio"))) if (e !== "projects") out.push(path.join(REPO, "studio", e));
  return [...new Set(out)];
}
export function sandboxDenyRead(): string[] {
  const H = process.env.HOME ?? "/home";
  return [path.join(REPO, ".env"), path.join(REPO, "app/.env"), path.join(REPO, "studio/.env"), path.join(H, ".ssh"), path.join(H, ".agent-reach"),
    path.join(H, ".config/google-chrome"), path.join(H, ".claude/.credentials.json")];
}

const SECRET_RE = /(^|\/)\.env(\.|$)|(^|\/)\.git\/|id_rsa|\.ssh\/|\.credentials|\.netrc|cookies/i;
function real(p: string): string {
  let abs = path.resolve(REPO, p.replace(/^~(?=\/|$)/, process.env.HOME ?? "~"));
  let rest = "";
  while (!fs.existsSync(abs) && path.dirname(abs) !== abs) { rest = path.join(path.basename(abs), rest); abs = path.dirname(abs); }
  try { abs = fs.realpathSync(abs); } catch { /* keep */ }
  return path.join(abs, rest);
}
const inside = (abs: string, dir: string) => abs === dir || abs.startsWith(dir + path.sep);

/** Write/Edit: inside a package, a project, or /tmp; never a secret */
export function writable(p: string): Verdict {
  const abs = real(p), rel = path.relative(REPO, abs);
  if (SECRET_RE.test(abs)) return deny(`${rel} is a secret or git internals`);
  if (inside(abs, "/tmp")) return allow("scratch file in /tmp");
  for (const r of WRITE_ROOTS) if (rel.startsWith(r + path.sep) && rel.split(path.sep).length > r.split(path.sep).length + 1) return allow(`inside ${r}/`);
  return deny(`${rel.startsWith("..") ? abs : rel} is outside productions/<folder>/ and studio/projects/<slug>/; write only there, and tell the owner if a tool, template or doc needs a change`);
}

export interface Ctx { runs: Map<string, number> }

/** the decision for one tool call that reached canUseTool */
export function decide(tool: string, input: any, ctx: Ctx): Verdict {
  const i = input ?? {};
  switch (tool) {
    case "Bash": return allow("sandboxed shell"); // only reached for shapes Claude Code double-checks; the sandbox still applies
    case "Read": return SECRET_RE.test(real(String(i.file_path ?? ""))) ? deny("that file holds secrets") : allow("read");
    case "Glob": case "Grep": case "LS": case "TodoWrite": case "Skill": case "Agent": case "Task": case "WebSearch": case "WebFetch": case "ToolSearch":
      return allow("read-only");
    case "Write": case "Edit": case "MultiEdit": case "NotebookEdit": {
      const text = [i.content, i.new_string, ...(i.edits ?? []).map((e: any) => e?.new_string)].filter((x) => typeof x === "string").join("\n");
      if (/\[x\]\s*Listened on a phone/i.test(text)) return deny("only the user ticks 'Listened on a phone with sound', after watching and listening on a phone");
      return writable(String(i.file_path ?? i.notebook_path ?? ""));
    }
    case "SandboxNetworkAccess": {
      const host = String(i.host ?? "");
      return domainOk(host) ? allow(`research site ${host}`) : deny(`${host} is not reachable from the sandboxed shell (only GitHub, Hugging Face, HN, arXiv, npm, PyPI); use WebFetch to read a page, and the research tool for YouTube`);
    }
    case "mcp__studio__run_step": {
      // the owner's checkpoint is the script (agent.ts refuses run_step before it); after it, steps run, voice included
      const n = (ctx.runs.get(`${i.slug}/${i.step}`) ?? 0) + 1;
      if (n > maxRuns(String(i.step))) return deny(`${i.step} has run ${maxRuns(String(i.step))} times for ${i.slug}: stop and report what keeps failing`);
      return allow(i.step === "voice" ? `voice${i.retake ? " retake" : ""} (after the script approval)` : `free step ${i.step}`);
    }
    case "mcp__studio__step_status": return allow("read-only");
    case "mcp__studio__research": return allow("free YouTube research");
    default: return deny(`${tool} is not available on autopilot`);
  }
}
/** count a run once the call is allowed (by the policy or by the owner) */
export function counted(tool: string, input: any, ctx: Ctx) {
  if (tool === "mcp__studio__run_step") { const k = `${input.slug}/${input.step}`; ctx.runs.set(k, (ctx.runs.get(k) ?? 0) + 1); }
}
