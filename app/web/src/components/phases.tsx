// The Package phase strip: where an autopilot package session is (research → script → gates → build → voice → render
// → QA → ready for your review), derived client-side from what the page already has: the package folder's file gates,
// the session's gate verdicts, the run_step tool calls and their results, the approval cards and the session status.
import { useMemo } from "react";
import { Link } from "react-router";
import type { AgentMsg, PkgView, Session } from "../api";
import { Gate as GateTag, type GateState } from "./ui";

type PhaseState = "pending" | "running" | "pass" | "fail" | "waiting";
const WORD: Record<PhaseState, string> = { pending: "not started", running: "running", pass: "passed", fail: "failed", waiting: "waiting for you" };
interface Phase { id: string; label: string; state: PhaseState; why: string }

const RUN_STEP = "mcp__studio__run_step";
const GATE_AGENTS = ["content-plan", "script-comprehension", "script-review", "visual-plan", "structure-check"];
const BUILD_STEPS = ["new", "validate", "clips", "assemble", "check", "payoffs"];
const QA_STEPS = ["qa", "watch", "review"];
const okVerdict = (v: string) => v === "PASS" || v === "READY";
const parse = (s: unknown): any => { try { return typeof s === "string" ? JSON.parse(s) : s ?? {}; } catch { return {}; } };

interface Run { step: string; slug: string; result: "ok" | "error" | null; seq: number }

/** one pass over the messages: run_step calls (latest per step), gate-agent calls in flight, lint runs, approvals */
function read(msgs: AgentMsg[]) {
  const uses = new Map<string, Run & { kind: "step" | "agent" | "lint" }>();
  const done = new Set<string>();
  const approvals: AgentMsg[] = [];
  const writes: string[] = []; // package files the session wrote (Write/Edit under productions/), in order
  let last: string | undefined; // the phase of the latest thing the session did (a file write, a gate agent, a run_step)
  for (const m of msgs) {
    const d = m.data ?? {};
    if (m.kind === "tool_use") {
      if (d.name === RUN_STEP) { const i = parse(d.input); uses.set(d.id, { kind: "step", step: String(i.step ?? ""), slug: String(i.slug ?? ""), result: null, seq: m.seq }); last = stepPhase(String(i.step ?? "")); }
      else if ((d.name === "Agent" || d.name === "Task") && GATE_AGENTS.includes(d.gate)) { uses.set(d.id, { kind: "agent", step: d.gate, slug: "", result: null, seq: m.seq }); last = "gates"; }
      else if (d.name === "Bash" && /lint_package/.test(d.summary ?? "")) uses.set(d.id, { kind: "lint", step: "lint", slug: "", result: null, seq: m.seq });
      else if ((d.name === "Write" || d.name === "Edit") && !d.parent) { const f = String(d.summary ?? "").match(/productions\/[^/]+\/([^/\s]+\.md)/); if (f) { writes.push(f[1]); last = writePhase(f[1]); } }
    } else if (m.kind === "tool_result") {
      const u = uses.get(d.toolUseId); if (u) u.result = d.isError ? "error" : "ok";
    } else if (m.kind === "approval") approvals.push(m);
    else if (m.kind === "approval_done") done.add(d.id);
  }
  const steps = new Map<string, Run>(); // latest call per run.sh step
  let inFlight: Run | null = null, agentInFlight = false, lint: Run | null = null, slug = "";
  for (const u of [...uses.values()].sort((a, b) => a.seq - b.seq)) {
    if (u.kind === "step") { steps.set(u.step, u); if (u.slug) slug = u.slug; if (!u.result) inFlight = u; }
    else if (u.kind === "agent" && !u.result) agentInFlight = true;
    else if (u.kind === "lint") lint = u;
  }
  const now = Date.now();
  const pending = approvals.filter((a) => !done.has(a.data.id) && a.data.expiresAt > now);
  const voicePending = pending.some((a) => a.data.tool === RUN_STEP && parse(a.data.input).step === "voice");
  return { steps, inFlight, agentInFlight, lint, slug, pending, voicePending, writes, last };
}

export function derivePhases(p: PkgView, msgs: AgentMsg[], s: Session | null) {
  const live = s?.status === "running";
  const idle = s?.status === "idle";
  const r = read(msgs);
  const files = new Set(p.production?.files.map((f) => f.name) ?? []);
  const fg = new Map((p.production?.gates ?? []).map((g) => [g.id, g]));
  const result = (step: string) => r.steps.get(step)?.result;
  const seen = (steps: string[]) => steps.some((x) => r.steps.has(x));
  const failedIn = (steps: string[]) => steps.filter((x) => result(x) === "error");

  // gates: the session's latest verdict per gate agent, else the tick in the package file
  const verdicts = new Map(p.gates.filter((g) => GATE_AGENTS.includes(g.gate)).map((g) => [g.gate, g.verdict]));
  const fileOf: Record<string, string> = { "script-review": "script-review", "visual-plan": "visual-plan", "structure-check": "structure", "content-plan": "content-plan" };
  const gateOk = (g: string) => (verdicts.has(g) ? okVerdict(verdicts.get(g)!) : fg.get(fileOf[g])?.state === "pass");
  const gateBad = (g: string) => (verdicts.has(g) ? !okVerdict(verdicts.get(g)!) : fg.get(fileOf[g])?.state === "bad");
  const badGates = GATE_AGENTS.filter(gateBad).concat(r.lint?.result === "error" ? ["lint"] : []);
  const required = ["script-review", "visual-plan", "structure-check"];
  const later = seen([...BUILD_STEPS, "voice", "render", ...QA_STEPS]);

  const phases: Phase[] = [];
  const add = (id: string, label: string, state: PhaseState, why: string) => phases.push({ id, label, state, why });

  // a file counts once the session wrote it: the scripter scaffolds every package file from a template at the start, so
  // being on disk proves nothing. A package without session messages (an older folder) falls back to the files on disk.
  const byWrites = msgs.length > 0;
  const RESEARCH_RE = /^(research|brief)\.md$/, SCRIPT_RE = /^script-(?!review).+\.md$/;
  const wrote = (re: RegExp) => r.writes.some((f) => re.test(f));
  const research = byWrites ? wrote(RESEARCH_RE) : files.has("research.md") || files.has("brief.md") || fg.get("research")?.state === "done";
  add("research", "Research", research ? "pass" : "pending", research ? "research.md / brief.md written" : "the session has not written research.md or brief.md");

  const script = byWrites ? wrote(SCRIPT_RE) : fg.get("script")?.state === "done" || [...files].some((f) => SCRIPT_RE.test(f));
  // the owner's one checkpoint: the script waits for "Approve script" (the build tools are refused until then)
  const approved = !!p.script_approved_at;
  const awaiting = script && !approved && !live && !!s?.sdk_session_id;
  add("script", "Script", approved ? "pass" : awaiting ? "waiting" : script ? "pass" : "pending",
    approved ? "you approved the script" : awaiting ? "read the script, then Approve script or reply with changes" : script ? "script written; its gates are running" : "the session has not written the script (a template file does not count)");

  const gatesPass = required.every(gateOk) && badGates.length === 0;
  const gatesSeen = verdicts.size > 0 || required.some((g) => fg.get(fileOf[g])?.state !== "todo" && fg.has(fileOf[g]));
  add("gates", "Gates",
    badGates.length && !live ? "fail" : gatesPass ? "pass" : later && !badGates.length ? "pass" : "pending",
    badGates.length ? `changes asked by ${badGates.join(", ")}` : gatesPass ? "script-review, visual-plan and structure-check passed"
      : later ? "the build started after the gates" : gatesSeen ? "not every gate has passed yet" : "no gate verdict yet");

  const bFail = failedIn(BUILD_STEPS);
  const bDone = result("payoffs") === "ok" || (seen(["voice", "render", ...QA_STEPS]) && !bFail.length);
  add("build", "Build", bFail.length ? "fail" : bDone ? "pass" : "pending",
    bFail.length ? `${bFail.join(", ")} failed` : bDone ? "the build steps ran" : seen(BUILD_STEPS) ? `ran: ${BUILD_STEPS.filter((x) => r.steps.has(x)).join(", ")}` : "no build step yet");

  const v = result("voice");
  add("voice", "Voice", v === "ok" ? "pass" : v === "error" ? "fail" : "pending",
    v === "ok" ? "voice ran" : v === "error" ? "voice failed or was denied" : "no voice request yet");

  const rr = result("render");
  add("render", "Render", rr === "ok" ? "pass" : rr === "error" ? "fail" : "pending", rr === "ok" ? "render ran" : rr === "error" ? "render failed" : "not rendered yet");

  const qFail = failedIn(QA_STEPS);
  const reviewOk = result("review") === "ok";
  add("qa", "QA", qFail.length ? "fail" : reviewOk ? "pass" : "pending",
    qFail.length ? `${qFail.join(", ")} failed` : reviewOk ? "qa, watch and review ran" : seen(QA_STEPS) ? `ran: ${QA_STEPS.filter((x) => r.steps.has(x)).join(", ")}` : "not checked yet");

  const ready = reviewOk && idle && !qFail.length;
  add("ready", "Ready for your review", ready ? "waiting" : "pending", ready ? "watch it on a phone, then Deliver from Review" : "review has not run, or the session is still going");

  // the current phase: the one a step in flight belongs to, else the first one not passed; it runs while the session runs
  if (live) {
    const at = r.inFlight ? stepPhase(r.inFlight.step) : r.agentInFlight ? "gates" : r.last ?? phases.find((x) => x.state !== "pass")?.id;
    const cur = phases.find((x) => x.id === at);
    if (cur && cur.state !== "waiting") { const wasFail = cur.state === "fail"; cur.state = "running"; cur.why = `${cur.why}; the agent is ${wasFail ? "fixing it" : "on it"}`; }
  }
  const next = awaiting ? "Read the script in the timeline, then press Approve script, or reply with the changes you want."
    : r.pending.length ? "Answer the approval request below." : ready ? "Watch it on your phone, then Deliver from Review." : null;
  return { phases, next, slug: r.slug, ready };
}

const stepPhase = (step: string) => (BUILD_STEPS.includes(step) ? "build" : QA_STEPS.includes(step) ? "qa" : step === "voice" || step === "render" ? step : step === "stills" || step === "benchmark" ? "qa" : "build");
/** the phase a package file belongs to: research and the YouTube analysis, the script and hooks, the rest (plans, storyboard) the gates' span */
function writePhase(f: string | undefined) {
  if (!f) return undefined;
  return /^(research|brief|inspiration)\.md$/.test(f) ? "research" : /^(script-(?!review).+|hooks)\.md$/.test(f) ? "script" : "gates";
}

const GATE_STATE: Record<PhaseState, GateState> = { pending: "pending", running: "running", pass: "pass", fail: "fail", waiting: "waiting" };

export function PhaseStrip({ p, msgs, session }: { p: PkgView; msgs: AgentMsg[]; session: Session | null }) {
  const { phases, next, slug, ready } = useMemo(() => derivePhases(p, msgs, session), [p, msgs, session]);
  return (
    <div className="space-y-1.5">
      <ol className="flex flex-wrap items-center gap-1" aria-label="package phases, in order">
        <li className="mr-1 text-xs font-extrabold text-ink-2" aria-hidden="true">Phases</li>
        {phases.map((x) => {
          const loud = x.state === "running" || x.state === "fail" || x.state === "waiting";
          return <li key={x.id} className="contents" aria-current={x.state === "running" ? "step" : undefined}>
            <GateTag state={GATE_STATE[x.state]} title={`${x.label}: ${WORD[x.state]}. ${x.why}`}><span>{x.id === "ready" && x.state === "waiting" ? <b>{x.label}</b> : loud ? <><b>{x.label}</b>: {WORD[x.state]}</> : x.label}</span></GateTag></li>;
        })}
      </ol>
      {next && <p role="status" className="text-sm font-medium text-ink">
        <span className="font-extrabold">Next for you:</span> {ready && slug ? <>Watch it on your phone, then Deliver from <Link className="link" to={`/p/${slug}/review`}>Review</Link>.</> : next}</p>}
    </div>
  );
}
