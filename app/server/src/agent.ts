// Agent sessions over the Claude Agent SDK, under the owner's Claude Code login (no API key: the session is refused if
// the CLI reports one). query() runs with cwd = the repo and settingSources ["project"], so .claude/skills,
// .claude/agents and CLAUDE.md load; the model is Claude Code's default. Every tool call that needs permission becomes
// an approval card (canUseTool → SSE → POST), denied by default after 10 minutes. Every SDK message is normalised into
// the messages table, so the timeline survives reloads; a follow-up message resumes the same SDK session (`resume`).
//
// Lock: one agent turn at a time (its own lock, separate from the build queue in jobs.ts): a session mostly waits on
// the model and on the owner's approvals, and a waiting session must not stall a render. Idle sessions (turn finished,
// waiting for a reply) hold no lock.
import crypto from "node:crypto";
import { EventEmitter } from "node:events";
import { query, type PermissionResult, type SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { FOLDER_RE, PIPELINE_PATH, REPO } from "./config.js";
import { db, now } from "./db.js";

db.exec(`
CREATE TABLE IF NOT EXISTS packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, topic TEXT NOT NULL, format TEXT NOT NULL DEFAULT 'reel',
  notes TEXT NOT NULL DEFAULT '', folder TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL UNIQUE, sdk_session_id TEXT, status TEXT NOT NULL,
  pending TEXT, queued_at TEXT, started_at TEXT, finished_at TEXT, turns INTEGER NOT NULL DEFAULT 0, cost_usd REAL,
  model TEXT, api_key_source TEXT, error TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS messages (
  session_id INTEGER NOT NULL, seq INTEGER NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL, t INTEGER NOT NULL,
  PRIMARY KEY (session_id, seq));
CREATE TABLE IF NOT EXISTS approvals (
  id TEXT PRIMARY KEY, session_id INTEGER NOT NULL, tool TEXT NOT NULL, summary TEXT NOT NULL, input TEXT NOT NULL,
  status TEXT NOT NULL, created_at TEXT NOT NULL, decided_at TEXT, decided_by TEXT);
`);
// a restart ends the SDK process: the turn that was running is interrupted (a reply resumes it); open approvals die
db.prepare("UPDATE sessions SET status='interrupted', finished_at=? WHERE status='running'").run(now());
db.prepare("UPDATE approvals SET status='expired', decided_at=?, decided_by='restart' WHERE status='pending'").run(now());

export type SessionStatus = "queued" | "running" | "idle" | "stopped" | "failed" | "interrupted";
export interface Pkg { id: number; kind: "package" | "ask"; topic: string; format: string; notes: string; folder: string | null; created_at: string }
export interface Session { id: number; package_id: number; sdk_session_id: string | null; status: SessionStatus; pending: string | null;
  queued_at: string | null; started_at: string | null; finished_at: string | null; turns: number; cost_usd: number | null;
  model: string | null; api_key_source: string | null; error: string | null; created_at: string }
export interface Msg { seq: number; kind: string; data: any; t: number }

const q = {
  insPkg: db.prepare("INSERT INTO packages (kind, topic, format, notes, folder, created_at) VALUES (?, ?, ?, ?, ?, ?)"),
  pkg: db.prepare("SELECT * FROM packages WHERE id=?"),
  pkgs: db.prepare("SELECT * FROM packages ORDER BY id DESC LIMIT ?"),
  setFolder: db.prepare("UPDATE packages SET folder=? WHERE id=? AND folder IS NULL"),
  delPkg: db.prepare("DELETE FROM packages WHERE id=?"),
  insSession: db.prepare("INSERT INTO sessions (package_id, status, pending, queued_at, created_at) VALUES (?, 'queued', ?, ?, ?)"),
  session: db.prepare("SELECT * FROM sessions WHERE id=?"),
  sessionOf: db.prepare("SELECT * FROM sessions WHERE package_id=?"),
  next: db.prepare("SELECT * FROM sessions WHERE status='queued' ORDER BY queued_at, id LIMIT 1"),
  queue: db.prepare("UPDATE sessions SET status='queued', pending=?, queued_at=?, error=NULL WHERE id=?"),
  start: db.prepare("UPDATE sessions SET status='running', pending=NULL, started_at=?, finished_at=NULL WHERE id=?"),
  end: db.prepare("UPDATE sessions SET status=?, finished_at=?, error=? WHERE id=?"),
  meta: db.prepare("UPDATE sessions SET sdk_session_id=COALESCE(?, sdk_session_id), model=COALESCE(?, model), api_key_source=COALESCE(?, api_key_source) WHERE id=?"),
  result: db.prepare("UPDATE sessions SET turns=turns+?, cost_usd=? WHERE id=?"),
  stop: db.prepare("UPDATE sessions SET status='stopped', finished_at=? WHERE id=?"),
  maxSeq: db.prepare("SELECT COALESCE(MAX(seq), 0) n FROM messages WHERE session_id=?"),
  insMsg: db.prepare("INSERT INTO messages (session_id, seq, kind, data, t) VALUES (?, ?, ?, ?, ?)"),
  msgs: db.prepare("SELECT seq, kind, data, t FROM messages WHERE session_id=? AND seq>? ORDER BY seq"),
  insApproval: db.prepare("INSERT INTO approvals (id, session_id, tool, summary, input, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)"),
  decide: db.prepare("UPDATE approvals SET status=?, decided_at=?, decided_by=? WHERE id=? AND status='pending'"),
  approval: db.prepare("SELECT * FROM approvals WHERE id=?"),
  pendingApprovals: db.prepare("SELECT id, session_id, tool, summary, created_at FROM approvals WHERE status='pending' ORDER BY created_at"),
};

export const events = new EventEmitter(); // "session:<id>" → {type:"message", msg} | {type:"status", session}
events.setMaxListeners(100);
export const getPkg = (id: number) => q.pkg.get(id) as Pkg | undefined;
export const getSession = (id: number) => q.session.get(id) as Session | undefined;
export const sessionOf = (pkgId: number) => q.sessionOf.get(pkgId) as Session | undefined;
export const messagesAfter = (sid: number, seq: number): Msg[] =>
  (q.msgs.all(sid, seq) as { seq: number; kind: string; data: string; t: number }[]).map((m) => ({ ...m, data: JSON.parse(m.data) }));
export const pendingApprovals = () => q.pendingApprovals.all();

// ---------- the agent's prompt ----------
export const FORMATS = ["reel"] as const;
export function promptFor(p: Pkg): string {
  if (p.kind === "ask") return p.topic + (p.notes ? `\n\n${p.notes}` : "");
  return `/video-scripter ${p.topic}\n\nFormat: ${p.format}.${p.notes ? `\nNotes from the owner: ${p.notes}` : ""}\n\n` +
    "You are running inside the studio app (an approval card is shown for every tool that needs permission). " +
    "Stop and ask in words wherever the skill asks the owner to approve something (the hook, the content plan, the animation plan); " +
    "the owner answers in the next message.";
}

export function createPackage(kind: Pkg["kind"], topic: string, format: string, notes: string, folder: string | null) {
  const id = Number(q.insPkg.run(kind, topic, format, notes, folder, now()).lastInsertRowid);
  return getPkg(id)!;
}
export function listPackages(limit = 200) {
  return (q.pkgs.all(limit) as Pkg[]).map((p) => ({ ...p, session: sessionOf(p.id) ?? null, gates: gatesOf(sessionOf(p.id)?.id) }));
}
export function deletePackage(id: number) {
  const s = sessionOf(id);
  if (s && ["running", "queued"].includes(s.status)) return false;
  if (s) { db.prepare("DELETE FROM messages WHERE session_id=?").run(s.id); db.prepare("DELETE FROM sessions WHERE id=?").run(s.id); }
  q.delPkg.run(id);
  return true;
}

// ---------- messages ----------
function addMsg(sid: number, kind: string, data: Record<string, unknown>): Msg {
  const seq = (q.maxSeq.get(sid) as { n: number }).n + 1;
  const m = { seq, kind, data, t: Date.now() };
  q.insMsg.run(sid, seq, kind, JSON.stringify(data), m.t);
  events.emit(`session:${sid}`, { type: "message", msg: m });
  return m;
}
const emitStatus = (sid: number) => events.emit(`session:${sid}`, { type: "status", session: getSession(sid) });

const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n) + `… (${s.length - n} more characters)` : s);
/** one line that says what a tool call does (the approval card and the timeline header) */
export function summarize(tool: string, input: any): string {
  const i = input ?? {};
  switch (tool) {
    case "Bash": return cut(String(i.command ?? ""), 400) + (i.description ? `  # ${i.description}` : "");
    case "Read": case "Write": case "Edit": case "NotebookEdit": return `${i.file_path ?? i.notebook_path ?? ""}${tool === "Write" && typeof i.content === "string" ? ` (${i.content.length} characters)` : ""}`;
    case "Glob": case "Grep": return `${i.pattern ?? ""}${i.path ? ` in ${i.path}` : ""}`;
    case "WebFetch": return String(i.url ?? "");
    case "WebSearch": return String(i.query ?? "");
    case "Skill": return `${i.skill ?? i.command ?? ""} ${i.args ?? ""}`.trim();
    case "Agent": case "Task": return `${i.subagent_type ?? "agent"}: ${i.description ?? ""}`;
    case "TodoWrite": return `${(i.todos ?? []).length} todos`;
    default: return cut(JSON.stringify(i), 300);
  }
}

// gate outputs: "VERDICT: PASS | CHANGES | READY | NEEDS RESEARCH" + its scores / depth line
const VERDICT_RE = /VERDICT:\s*\**\s*(PASS|CHANGES|READY|NEEDS RESEARCH)\b/g;
export function verdictsIn(text: string) {
  const out: { verdict: string; scores: string | null }[] = [];
  for (const m of text.matchAll(VERDICT_RE)) {
    const after = text.slice(m.index! + m[0].length, m.index! + m[0].length + 600);
    const sc = after.match(/^\s*(?:scores?|depth):[^\n]*/im);
    out.push({ verdict: m[1], scores: sc ? sc[0].trim() : null });
  }
  return out;
}

/** latest verdict per gate agent in a session (stored on the tool_result / text messages) */
export function gatesOf(sid: number | undefined) {
  if (!sid) return [];
  const rows = db.prepare("SELECT seq, data FROM messages WHERE session_id=? AND kind IN ('text','tool_result') AND data LIKE '%\"verdicts\":[{%' ORDER BY seq").all(sid) as { seq: number; data: string }[];
  const by = new Map<string, { gate: string; verdict: string; scores: string | null; seq: number }>();
  for (const r of rows) {
    const d = JSON.parse(r.data);
    for (const v of d.verdicts ?? []) by.set(d.gate ?? "agent", { gate: d.gate ?? "agent", verdict: v.verdict, scores: v.scores, seq: r.seq });
  }
  return [...by.values()];
}

function blockText(c: any): string {
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.map((b) => (b?.type === "text" ? b.text : b?.type === "image" ? "[image]" : "")).join("\n");
  return "";
}

// ---------- approvals ----------
const TIMEOUT_MS = 10 * 60 * 1000;
const waiters = new Map<string, { resolve: (r: PermissionResult) => void; timer: NodeJS.Timeout; sid: number; input: Record<string, unknown> }>();

function askOwner(sid: number, tool: string, input: Record<string, unknown>, opts: { signal: AbortSignal; title?: string; description?: string;
  decisionReason?: string; blockedPath?: string; toolUseID: string; agentID?: string; displayName?: string }): Promise<PermissionResult> {
  const id = crypto.randomUUID();
  const summary = summarize(tool, input);
  q.insApproval.run(id, sid, tool, summary, cut(JSON.stringify(input), 20000), now());
  addMsg(sid, "approval", { id, tool, summary, input: cut(JSON.stringify(input, null, 1), 4000), title: opts.title ?? null, description: opts.description ?? null,
    reason: opts.decisionReason ?? null, blockedPath: opts.blockedPath ?? null, toolUseId: opts.toolUseID, agentId: opts.agentID ?? null,
    expiresAt: Date.now() + TIMEOUT_MS });
  emitStatus(sid);
  return new Promise((resolve) => {
    const timer = setTimeout(() => decide(id, "timeout", "timeout"), TIMEOUT_MS);
    waiters.set(id, { resolve, timer, sid, input });
    opts.signal.addEventListener("abort", () => decide(id, "aborted", "session stopped"), { once: true });
  });
}

/** allow once / deny (owner), or timeout / aborted (default deny). False when the approval is no longer pending. */
export function decide(id: string, decision: "allow" | "deny" | "timeout" | "aborted", by = "owner"): boolean {
  const w = waiters.get(id);
  const status = decision === "allow" ? "allowed" : decision === "deny" ? "denied" : decision === "timeout" ? "timeout" : "expired";
  const changed = q.decide.run(status, now(), by, id).changes > 0;
  if (!w) return changed;
  clearTimeout(w.timer); waiters.delete(id);
  addMsg(w.sid, "approval_done", { id, decision: status, by });
  w.resolve(decision === "allow" ? { behavior: "allow", updatedInput: w.input }
    : { behavior: "deny", message: decision === "deny" ? "The owner denied this tool call in the studio app. Do not retry it; say what you needed it for and continue or ask."
      : decision === "timeout" ? "No answer from the owner in 10 minutes: denied by default." : "The session was stopped." });
  return true;
}

// ---------- the runner ----------
let active: { sid: number; abort: AbortController } | null = null;
export const activeSession = () => active?.sid ?? null;

export function start(pkgId: number): Session {
  const p = getPkg(pkgId)!;
  const s = sessionOf(pkgId);
  if (!s) {
    const id = Number(q.insSession.run(pkgId, promptFor(p), now(), now()).lastInsertRowid);
    emitStatus(id); setImmediate(pump);
    return getSession(id)!;
  }
  if (s.status === "running" || s.status === "queued") return s;
  if (s.sdk_session_id) throw new AgentError(409, "this session has started: send a message to continue it");
  q.queue.run(promptFor(p), now(), s.id); emitStatus(s.id); setImmediate(pump);
  return getSession(s.id)!;
}

export class AgentError extends Error { constructor(public code: number, msg: string) { super(msg); } }

export function reply(sid: number, text: string): Session {
  const s = getSession(sid);
  if (!s) throw new AgentError(404, "no such session");
  const t = text.trim();
  if (!t) throw new AgentError(400, "empty message");
  if (s.status === "running") throw new AgentError(409, "the agent is still working: wait for its turn to end (or stop it), then reply");
  if (s.status === "queued") throw new AgentError(409, "this session is already queued");
  if (!s.sdk_session_id) throw new AgentError(409, "the session has not started yet: press Start");
  q.queue.run(t, now(), sid); emitStatus(sid); setImmediate(pump);
  return getSession(sid)!;
}

export function stop(sid: number): boolean {
  const s = getSession(sid);
  if (!s) return false;
  if (s.status === "queued") { q.stop.run(now(), sid); emitStatus(sid); return true; }
  if (s.status === "running" && active?.sid === sid) { q.stop.run(now(), sid); active.abort.abort(); emitStatus(sid); return true; }
  return false;
}

function pump() {
  if (active) return;
  const s = q.next.get() as Session | undefined;
  if (s) void run(s);
}

/** env for the Claude Code process: the owner's login only; never an API key from this machine's environment */
function agentEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [k, v] of Object.entries(process.env)) if (v !== undefined) env[k] = v;
  for (const k of ["ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "APP_PASSWORD"]) delete env[k];
  env.PATH = PIPELINE_PATH;
  return env;
}

async function run(s: Session) {
  const p = getPkg(s.package_id)!;
  const prompt = s.pending ?? promptFor(p);
  const abort = new AbortController();
  active = { sid: s.id, abort };
  q.start.run(now(), s.id); emitStatus(s.id);
  addMsg(s.id, "user", { text: prompt, resume: !!s.sdk_session_id });
  const toolNames = new Map<string, { name: string; gate: string | null }>(); // tool_use id → tool (to attribute verdicts)
  for (const r of db.prepare("SELECT data FROM messages WHERE session_id=? AND kind='tool_use'").all(s.id) as { data: string }[]) {
    const d = JSON.parse(r.data); toolNames.set(d.id, { name: d.name, gate: d.gate ?? null });
  }
  let failed: string | null = null;
  try {
    const it = query({
      prompt,
      options: {
        cwd: REPO,
        settingSources: ["project"],     // .claude/settings.json, .claude/skills, .claude/agents, CLAUDE.md
        permissionMode: "default",        // manual approvals through canUseTool (not auto mode's classifier)
        resume: s.sdk_session_id ?? undefined,
        abortController: abort,
        env: agentEnv(),
        disallowedTools: ["AskUserQuestion"], // the agent asks in words; the owner answers in the composer
        canUseTool: (tool, input, opts) => askOwner(s.id, tool, input, opts),
        stderr: (d: string) => { if (/error/i.test(d)) addMsg(s.id, "stderr", { text: cut(d.trim(), 2000) }); },
      },
    });
    for await (const m of it as AsyncIterable<SDKMessage>) {
      const err = handle(s.id, p, m, toolNames);
      if (err) { failed = err; abort.abort(); break; }
    }
  } catch (e) {
    if (!abort.signal.aborted) failed = e instanceof Error ? e.message : String(e);
  } finally {
    for (const [id, w] of waiters) if (w.sid === s.id) decide(id, "aborted", "turn ended");
    const now_ = getSession(s.id)!;
    if (failed) { q.end.run("failed", now(), failed, s.id); addMsg(s.id, "error", { text: failed }); }
    else if (now_.status !== "stopped") q.end.run("idle", now(), null, s.id);
    else addMsg(s.id, "system", { text: "stopped by the owner" });
    active = null;
    emitStatus(s.id);
    setImmediate(pump);
  }
}

/** one SDK message → zero or more timeline messages. Returns an error string to end the turn. */
function handle(sid: number, p: Pkg, m: SDKMessage, tools: Map<string, { name: string; gate: string | null }>): string | null {
  if (m.type === "system" && m.subtype === "init") {
    q.meta.run(m.session_id, m.model, m.apiKeySource, sid);
    addMsg(sid, "init", { model: m.model, apiKeySource: m.apiKeySource, permissionMode: m.permissionMode, version: m.claude_code_version,
      cwd: m.cwd, tools: m.tools.length, agents: m.agents ?? [], sessionId: m.session_id });
    emitStatus(sid);
    // the decision: Claude Code login only. 'none' = no API key (claude.ai OAuth login).
    if (m.apiKeySource && m.apiKeySource !== "none") return `refused: this session would use an API key (source: ${m.apiKeySource}). The app runs agents on the owner's Claude Code login only: unset the key and run \`claude /login\`.`;
    return null;
  }
  if (m.type === "assistant") {
    if (m.error) addMsg(sid, "error", { text: `assistant error: ${m.error}`, parent: m.parent_tool_use_id });
    for (const b of (m.message.content ?? []) as any[]) {
      if (b.type === "text" && b.text?.trim()) {
        const verdicts = verdictsIn(b.text);
        const gate = m.parent_tool_use_id ? tools.get(m.parent_tool_use_id)?.gate ?? null : null;
        addMsg(sid, "text", { text: b.text, parent: m.parent_tool_use_id, verdicts, gate });
      } else if (b.type === "tool_use") {
        const gate = (b.name === "Agent" || b.name === "Task") ? String(b.input?.subagent_type ?? "agent") : null;
        tools.set(b.id, { name: b.name, gate });
        addMsg(sid, "tool_use", { id: b.id, name: b.name, summary: summarize(b.name, b.input), input: cut(JSON.stringify(b.input, null, 1), 6000), parent: m.parent_tool_use_id, gate });
        // the package folder, the first time the agent writes into productions/<date>-<slug>/
        const fp = String(b.input?.file_path ?? "");
        const mm = fp.match(/productions\/([^/]+)\//);
        if (p.kind === "package" && mm && FOLDER_RE.test(mm[1]) && (b.name === "Write" || b.name === "Edit")) {
          if (q.setFolder.run(mm[1], p.id).changes) addMsg(sid, "system", { text: `package folder: productions/${mm[1]}/`, folder: mm[1] });
        }
      }
    }
    return null;
  }
  if (m.type === "user") {
    const content = (m.message as any).content;
    if (!Array.isArray(content)) return null;
    for (const b of content) {
      if (b?.type !== "tool_result") continue;
      const text = blockText(b.content);
      const t = tools.get(b.tool_use_id);
      addMsg(sid, "tool_result", { toolUseId: b.tool_use_id, name: t?.name ?? null, isError: !!b.is_error, text: cut(text, 8000), parent: m.parent_tool_use_id,
        verdicts: verdictsIn(text), gate: t?.gate ?? null });
    }
    return null;
  }
  if (m.type === "result") {
    q.result.run(m.num_turns ?? 0, m.total_cost_usd ?? null, sid);
    addMsg(sid, "result", { subtype: m.subtype, isError: m.is_error, result: "result" in m ? cut(String((m as any).result ?? ""), 8000) : null,
      turns: m.num_turns, durationMs: m.duration_ms, costUsd: m.total_cost_usd, denials: (m.permission_denials ?? []).length,
      errors: "errors" in m ? (m as any).errors : undefined, verdicts: "result" in m ? verdictsIn(String((m as any).result ?? "")) : [] });
    return null;
  }
  if (m.type === "system" && (m as any).subtype === "compact_boundary") addMsg(sid, "system", { text: "context compacted" });
  return null;
}

export function shutdown() {
  for (const id of [...waiters.keys()]) decide(id, "aborted", "server stopped");
  active?.abort.abort();
}

setImmediate(pump); // anything left queued from the last run starts now
