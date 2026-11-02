// The agentic Package view's parts: the session stream (SSE), the timeline (one card per tool call, subagent calls
// nested under their Agent card, approval cards inline, verdict chips), the composer, and the artifact tabs that render
// the package's Markdown and refresh when a file changes (fs.watch → SSE).
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, ago, type AgentMsg, type FileGate, type Gate, type Session } from "../api";
import { Markdown } from "./Markdown";
import { Button, Chip, Empty, ErrorLine, Gate as GateTag, Icon, Skeleton, type GateState, type Tone } from "./ui";

export const sessionTone = (s?: string | null): Tone =>
  s === "running" ? "accent" : s === "queued" ? "warn" : s === "idle" ? "ok" : s === "failed" || s === "interrupted" ? "bad" : "muted";
export const verdictTone = (v: string): Tone => (v === "PASS" || v === "READY" ? "ok" : "bad");
/** the scripter gates in the stepper language: todo = not run, done = written, open = waiting on its gate, pass, bad = failed */
const fileGateState: Record<FileGate["state"], GateState> = { todo: "pending", done: "done", open: "waiting", pass: "pass", bad: "fail" };

export function GateChips({ gates, files }: { gates?: Gate[]; files?: FileGate[] }) {
  return (
    <ol className="flex flex-wrap gap-1" aria-label="package gates, in order">
      {files?.map((g) => <li key={g.id} className="contents"><GateTag state={fileGateState[g.state]} title={g.verdict ? `${g.verdict.verdict}${g.verdict.scores ? `: ${g.verdict.scores}` : ""}` : g.state}>
        {g.label}{g.detail ? <b>{g.detail}</b> : null}</GateTag></li>)}
      {gates?.map((g) => <li key={g.gate} className="contents"><GateTag state={verdictTone(g.verdict) === "ok" ? "pass" : "fail"} title={g.scores ?? undefined}>{g.gate}: {g.verdict}</GateTag></li>)}
    </ol>
  );
}

/** the session's stored messages, then live ones (SSE); the status rides along */
export function useSession(sid: number | null | undefined) {
  const [msgs, setMsgs] = useState<AgentMsg[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const qc = useQueryClient();
  useEffect(() => {
    setMsgs([]); setSession(null);
    if (!sid) return;
    const es = new EventSource(`/api/sessions/${sid}/stream`);
    es.addEventListener("message", (e) => { const m = JSON.parse((e as MessageEvent).data) as AgentMsg; setMsgs((xs) => (xs.length && xs[xs.length - 1].seq >= m.seq ? xs : [...xs, m])); });
    es.addEventListener("status", (e) => { setSession(JSON.parse((e as MessageEvent).data)); qc.invalidateQueries({ queryKey: ["packages"] }); });
    return () => es.close();
  }, [sid, qc]);
  return { msgs, session };
}

type Entry =
  | { type: "msg"; m: AgentMsg }
  | { type: "tool"; use: AgentMsg; result: AgentMsg | null; children: Entry[]; approvals: AgentMsg[] };

/** messages → entries: tool results folded into their call, subagent messages nested under the Agent call, approvals on their call */
function build(msgs: AgentMsg[]): { entries: Entry[]; done: Map<string, AgentMsg> } {
  const done = new Map<string, AgentMsg>();
  for (const m of msgs) if (m.kind === "approval_done") done.set(m.data.id, m);
  const tools = new Map<string, Entry & { type: "tool" }>();
  const root: Entry[] = [];
  const into = (parent: string | null | undefined) => (parent && tools.get(parent)?.children) || root;
  for (const m of msgs) {
    if (m.kind === "approval_done" || m.kind === "stderr") continue;
    if (m.kind === "tool_use") { const e = { type: "tool" as const, use: m, result: null, children: [], approvals: [] }; tools.set(m.data.id, e); into(m.data.parent).push(e); continue; }
    if (m.kind === "tool_result") { const t = tools.get(m.data.toolUseId); if (t) { t.result = m; continue; } }
    if (m.kind === "approval") { const t = tools.get(m.data.toolUseId); if (t) { t.approvals.push(m); continue; } }
    into(m.data?.parent).push({ type: "msg", m });
  }
  return { entries: root, done };
}

function Verdicts({ v }: { v?: { verdict: string; scores: string | null }[] }) {
  if (!v?.length) return null;
  return <div className="mt-1.5 flex flex-wrap gap-1.5">{v.map((x, i) => <Chip key={i} tone={verdictTone(x.verdict)} title={x.scores ?? undefined}>verdict {x.verdict}{x.scores ? `: ${x.scores.slice(0, 80)}` : ""}</Chip>)}</div>;
}

function ApprovalCard({ m, done, live }: { m: AgentMsg; done?: AgentMsg; live: boolean }) {
  const d = m.data;
  const [now, setNow] = useState(Date.now());
  const pending = !done && live && d.expiresAt > now;
  useEffect(() => { if (!pending) return; const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, [pending]);
  const act = useMutation({ mutationFn: (decision: "allow" | "deny") => api.approve(d.id, decision) });
  const left = Math.max(0, Math.round((d.expiresAt - now) / 1000));
  const outcome = done?.data.decision ?? (pending ? null : "expired");
  return (
    <div className={`border-2 px-3 py-2.5 ${pending ? "border-accent-2" : "border-rule bg-paper-2"}`} role={pending ? "alertdialog" : undefined} aria-label="approval">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {pending ? <GateTag state="waiting"><b>Approval needed</b></GateTag> : <span className="font-extrabold">Approval</span>}
        <Chip>{d.tool}</Chip>
        {outcome && <Chip tone={outcome === "allowed" ? "ok" : "bad"}>{outcome}{done?.data.by && done.data.by !== "owner" ? ` (${done.data.by})` : ""}</Chip>}
        {pending && <span className="ml-auto text-xs text-muted" title="denied by default when the time runs out">{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</span>}
      </div>
      <div className="mt-1.5 break-all text-xs">{d.summary}</div>
      {(d.description || d.reason) && <div className="mt-1 text-xs text-muted">{d.reason ?? d.description}</div>}
      <details className="mt-1"><summary className="cursor-pointer text-xs text-muted">full input</summary>
        <pre className="plate scroll-thin mt-1 max-h-48 overflow-auto whitespace-pre-wrap p-2 text-xs">{d.input}</pre></details>
      {pending && (
        <div className="mt-2 flex items-center gap-2">
          <Button small kind="primary" disabled={act.isPending} onClick={() => act.mutate("allow")}>Allow once</Button>
          <Button small kind="danger" disabled={act.isPending} onClick={() => act.mutate("deny")}>Deny</Button>
          {act.isError && <span role="alert" className="text-xs text-bad">{(act.error as Error).message}</span>}
        </div>)}
    </div>
  );
}

function ToolCard({ e, done, live, depth }: { e: Entry & { type: "tool" }; done: Map<string, AgentMsg>; live: boolean; depth: number }) {
  const u = e.use.data, r = e.result?.data;
  const pendingApproval = e.approvals.some((a) => !done.has(a.data.id) && live && a.data.expiresAt > Date.now());
  const isAgent = u.name === "Agent" || u.name === "Task";
  const [open, setOpen] = useState(false);
  const show = open || pendingApproval;
  const status = !r ? (live ? "running" : "no result") : r.isError ? "error" : "ok";
  return (
    <div className={`border-t ${pendingApproval ? "border-t-2 border-accent-2" : "border-rule"}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={show} className="flex min-h-11 w-full items-start gap-2 py-2 text-left hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
        <span className={`mt-0.5 ${status === "ok" ? "text-ok" : status === "error" ? "text-bad" : status === "running" ? "text-accent" : "text-muted"}`}><Icon name={status === "ok" ? "check" : status === "error" ? "cross" : status === "running" ? "running" : "pending"} size={14} label={status} /></span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5"><span className="text-sm font-extrabold">{isAgent ? `Agent: ${u.gate ?? "agent"}` : u.name}</span>
            {isAgent && e.children.length > 0 && <span className="text-xs text-muted">{e.children.length} steps</span>}
            {r?.verdicts?.map((v: any, i: number) => <Chip key={i} tone={verdictTone(v.verdict)} title={v.scores ?? undefined}>{v.verdict}</Chip>)}</span>
          <span className="block truncate text-xs text-muted" title={u.summary}>{u.summary.length > 120 ? `${u.summary.slice(0, 119)}…` : u.summary}</span>
        </span>
        <span className="text-muted"><Icon name={show ? "chevron-down" : "chevron-right"} size={14} /></span>
      </button>
      {e.approvals.length > 0 && <div className="space-y-2 pb-2">{e.approvals.map((a) => <ApprovalCard key={a.seq} m={a} done={done.get(a.data.id)} live={live} />)}</div>}
      {show && (
        <div className="space-y-2 pb-2 pl-6">
          <details><summary className="cursor-pointer text-xs text-muted">input</summary>
            <pre className="plate scroll-thin mt-1 max-h-56 overflow-auto whitespace-pre-wrap p-2 text-xs">{u.input}</pre></details>
          {e.children.length > 0 && <div className="space-y-0 border-l-2 border-ink pl-3"><Entries entries={e.children} done={done} live={live} depth={depth + 1} /></div>}
          {r && <div><div className="text-xs text-muted">result{r.isError ? " (error)" : ""}</div>
            <pre className={`out scroll-thin mt-1 max-h-72 overflow-auto ${r.isError ? "text-bad" : ""}`}>{r.text || "(empty)"}</pre></div>}
        </div>)}
    </div>
  );
}

function MsgCard({ m }: { m: AgentMsg }) {
  const d = m.data;
  switch (m.kind) {
    case "user": return <div className="ml-auto max-w-[92%] border-2 border-ink bg-paper-3 px-3 py-2 text-sm"><div className="mb-0.5 text-xs font-medium text-muted">{d.resume ? "you" : "prompt"}</div><div className="whitespace-pre-wrap break-words">{d.text}</div></div>;
    case "text": return <div className="px-1 text-sm"><Markdown text={d.text} /><Verdicts v={d.verdicts} /></div>;
    case "init": return <dl className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted"><dt className="font-extrabold text-ink">session started</dt><dd>{d.model}</dd><dd>{d.apiKeySource === "none" ? "Claude Code login (no API key)" : `key: ${d.apiKeySource}`}</dd><dd>permissions {d.permissionMode}</dd><dd>Claude Code {d.version}</dd><dd>{d.tools} tools</dd></dl>;
    case "result": return <div className={`border-t-2 py-1.5 text-xs ${d.isError ? "border-bad text-bad" : "border-ink text-muted"}`}><div className="flex flex-wrap gap-x-4"><span className="font-extrabold text-ink">turn ended</span><span>{d.subtype}</span><span>{d.turns} turns</span><span>{(d.durationMs / 1000).toFixed(0)} s</span>{d.denials ? <span>{d.denials} denied</span> : null}</div><Verdicts v={d.verdicts} /></div>;
    case "error": return <div role="alert" className="border-2 border-bad px-3 py-2 text-sm text-bad">{d.text}</div>;
    case "system": return <div className="text-xs text-muted">{d.text}</div>;
    default: return null;
  }
}

function Entries({ entries, done, live, depth = 0 }: { entries: Entry[]; done: Map<string, AgentMsg>; live: boolean; depth?: number }) {
  return <>{entries.map((e) => e.type === "tool"
    ? <ToolCard key={e.use.seq} e={e} done={done} live={live} depth={depth} />
    : e.m.kind === "approval" ? <ApprovalCard key={e.m.seq} m={e.m} done={done.get(e.m.data.id)} live={live} /> : <MsgCard key={e.m.seq} m={e.m} />)}</>;
}

/** an approval the owner still has to answer, or one that ended without an allow (denied, expired) */
const approvalMatters = (a: AgentMsg, done: Map<string, AgentMsg>) => {
  const d = done.get(a.data.id);
  return !d || d.data.decision !== "allowed"; // no answer: pending, or expired (denied by default)
};

const STEP_KIND: Record<string, string> = { Read: "read", Grep: "read", Glob: "read", LS: "read", NotebookRead: "read", Write: "wrote", Edit: "wrote", MultiEdit: "wrote", NotebookEdit: "wrote",
  Bash: "ran", BashOutput: "ran", KillShell: "ran", WebFetch: "web", WebSearch: "web", Skill: "skill", TodoWrite: "planned" };
const stepKind = (name: string) => STEP_KIND[name] ?? (name.startsWith("mcp__") ? "tools" : name.toLowerCase());

type ToolEntry = Entry & { type: "tool" };
const isAgentCall = (e: ToolEntry) => e.use.data.name === "Agent" || e.use.data.name === "Task";
type Row = { type: "entry"; e: Entry } | { type: "steps"; tools: ToolEntry[] };

/** the summary rows: consecutive plain tool calls fold into one "steps" row; a gate agent, an approval that matters, a message stay rows of their own */
function summarize(entries: Entry[], done: Map<string, AgentMsg>): Row[] {
  const rows: Row[] = [];
  for (const e of entries) {
    const plain = e.type === "tool" && !isAgentCall(e) && !e.approvals.some((a) => approvalMatters(a, done));
    if (plain) { const last = rows[rows.length - 1]; if (last?.type === "steps") last.tools.push(e as ToolEntry); else rows.push({ type: "steps", tools: [e as ToolEntry] }); continue; }
    if (e.type === "msg" && e.m.kind === "approval" && !approvalMatters(e.m, done)) continue;
    rows.push({ type: "entry", e });
  }
  return rows;
}

function StepsRow({ tools, done, live }: { tools: ToolEntry[]; done: Map<string, AgentMsg>; live: boolean }) {
  const [open, setOpen] = useState(false);
  const counts = new Map<string, number>();
  for (const t of tools) { const k = stepKind(t.use.data.name); counts.set(k, (counts.get(k) ?? 0) + 1); }
  const failed = tools.filter((t) => t.result?.data.isError).length;
  const running = live && tools.some((t) => !t.result);
  const what = [...counts].map(([k, n]) => `${k} ${n}`).join(", ");
  return (
    <div className="border-t border-rule">
      <button onClick={() => setOpen(!open)} aria-expanded={open} title={tools.map((t) => t.use.data.name).join(", ")}
        className="flex min-h-11 w-full items-center gap-2 py-2 text-left text-xs text-muted hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
        <Icon name={open ? "chevron-down" : "chevron-right"} size={14} />
        <span className="min-w-0 flex-1"><b className="text-ink-2">{tools.length} step{tools.length > 1 ? "s" : ""}</b>: {what}</span>
        {failed > 0 && <span className="inline-flex items-center gap-1 text-bad"><Icon name="cross" size={12} label="failed" />{failed} failed</span>}
        {running && <span className="inline-flex items-center gap-1 text-accent"><Icon name="running" size={12} label="running" />running</span>}
      </button>
      {open && <div className="border-l-2 border-rule pl-3"><Entries entries={tools} done={done} live={live} /></div>}
    </div>
  );
}

/** a gate agent (Agent/Task call) in one line: "script-review: PASS", its scores in the tooltip; click for its full card */
function GateLine({ e, done, live }: { e: ToolEntry; done: Map<string, AgentMsg>; live: boolean }) {
  const [open, setOpen] = useState(false);
  const u = e.use.data, r = e.result?.data;
  const childVerdicts = e.children.flatMap((c) => (c.type === "msg" ? c.m.data?.verdicts ?? [] : []));
  const v: { verdict: string; scores: string | null } | undefined = r?.verdicts?.[r.verdicts.length - 1] ?? childVerdicts[childVerdicts.length - 1];
  const state: GateState = v ? (verdictTone(v.verdict) === "ok" ? "pass" : "fail") : !r ? (live ? "running" : "pending") : r.isError ? "fail" : "done";
  const name = u.gate ?? "agent";
  const matters = e.approvals.filter((a) => approvalMatters(a, done));
  return (
    <div className="border-t border-rule">
      <button onClick={() => setOpen(!open)} aria-expanded={open} title={v?.scores ?? u.summary}
        className="flex min-h-11 w-full items-center gap-2 py-2 text-left hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
        <GateTag state={state} title={v?.scores ?? undefined}><b>{name}</b>{v ? `: ${v.verdict}` : state === "running" ? ": working" : r?.isError ? ": error" : ""}</GateTag>
        {e.children.length > 0 && <span className="text-xs text-muted">{e.children.length} steps</span>}
        <span className="ml-auto text-muted"><Icon name={open ? "chevron-down" : "chevron-right"} size={14} /></span>
      </button>
      {!open && matters.length > 0 && <div className="space-y-2 pb-2">{matters.map((a) => <ApprovalCard key={a.seq} m={a} done={done.get(a.data.id)} live={live} />)}</div>}
      {open && <div className="border-l-2 border-rule pl-3"><ToolCard e={e} done={done} live={live} depth={0} /></div>}
    </div>
  );
}

function SummaryMsg({ m }: { m: AgentMsg }) {
  const d = m.data;
  if (m.kind === "init") return <div className="text-xs text-muted" title={`${d.model} · permissions ${d.permissionMode} · Claude Code ${d.version} · ${d.tools} tools`}>started</div>;
  if (m.kind === "result") {
    const s = Math.round((d.durationMs ?? 0) / 1000);
    const took = s < 60 ? `${s} s` : `${Math.round(s / 60)} min`;
    return <div className={`border-t-2 py-1.5 text-xs ${d.isError ? "border-bad text-bad" : "border-ink text-muted"}`}>
      <span title={`${d.subtype} · ${d.turns} turns${d.denials ? ` · ${d.denials} denied` : ""}`}>{d.isError ? <><Icon name="cross" size={12} label="error" /> Turn ended with an error after {took}</> : <>Turn finished in {took}</>}</span>
      <Verdicts v={d.verdicts} /></div>;
  }
  return <MsgCard m={m} />;
}

const VIEW_KEY = "studio-timeline-every-step";
export function Timeline({ msgs, session }: { msgs: AgentMsg[]; session: Session | null }) {
  const { entries, done } = useMemo(() => build(msgs), [msgs]);
  const live = session?.status === "running";
  const [all, setAll] = useState(() => { try { return localStorage.getItem(VIEW_KEY) === "1"; } catch { return false; } });
  const toggle = (v: boolean) => { setAll(v); try { localStorage.setItem(VIEW_KEY, v ? "1" : "0"); } catch { /* private mode */ } };
  const rows = useMemo(() => summarize(entries, done), [entries, done]);
  if (!msgs.length) return <Empty>{session ? (session.status === "queued" ? "Queued: starts when the agent is free." : "No messages yet.") : "Not started."}</Empty>;
  return <div className="space-y-2">
    <label className="flex min-h-8 items-center gap-2 text-xs text-muted"><input type="checkbox" checked={all} onChange={(e) => toggle(e.target.checked)} />Show every step</label>
    {all ? <Entries entries={entries} done={done} live={live} />
      : rows.map((r) => r.type === "steps" ? <StepsRow key={`s${r.tools[0].use.seq}`} tools={r.tools} done={done} live={live} />
        : r.e.type === "tool" ? (isAgentCall(r.e) ? <GateLine key={r.e.use.seq} e={r.e} done={done} live={live} /> : <ToolCard key={r.e.use.seq} e={r.e} done={done} live={live} depth={0} />)
        : r.e.m.kind === "approval" ? <ApprovalCard key={r.e.m.seq} m={r.e.m} done={done.get(r.e.m.data.id)} live={live} />
        : <SummaryMsg key={r.e.m.seq} m={r.e.m} />)}
    {live && <div role="status" className="flex items-center gap-2 text-xs text-muted"><GateTag state="running">working…</GateTag></div>}</div>;
}

export function Composer({ session }: { session: Session }) {
  const [text, setText] = useState("");
  const send = useMutation({ mutationFn: () => api.send(session.id, text), onSuccess: () => setText("") });
  const can = session.status !== "running" && session.status !== "queued" && !!session.sdk_session_id;
  return (
    <form className="space-y-1.5" onSubmit={(e) => { e.preventDefault(); if (text.trim() && can) send.mutate(); }}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder={can ? "Reply to the agent, e.g. “Use hook B instead” (resumes the session)" : session.status === "running" ? "the agent is working: reply when its turn ends" : "start the session first"}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (text.trim() && can) send.mutate(); } }}
        className="field w-full" aria-label="reply to the agent" disabled={!can} />
      <div className="flex items-center gap-2">
        <Button small kind="primary" type="submit" disabled={!can || !text.trim() || send.isPending}>Send</Button>
        <span className="text-xs text-muted" title="one agent turn runs at a time">ctrl+enter sends</span>
        {send.isError && <span role="alert" className="text-xs text-bad">{(send.error as Error).message}</span>}
      </div>
    </form>
  );
}

/** the package's Markdown files as tabs; refreshed on every file change in the folder */
export function ArtifactTabs({ folder }: { folder: string }) {
  const qc = useQueryClient();
  const prod = useQuery({ queryKey: ["production", folder], queryFn: () => api.production(folder) });
  const [tab, setTab] = useState<string | null>(null);
  const [changed, setChanged] = useState<string | null>(null);
  useEffect(() => {
    const es = new EventSource(`/api/productions/${encodeURIComponent(folder)}/events`);
    es.addEventListener("change", (e) => {
      const { files } = JSON.parse((e as MessageEvent).data) as { files: string[] };
      qc.invalidateQueries({ queryKey: ["production", folder] });
      for (const f of files) qc.invalidateQueries({ queryKey: ["prodfile", folder, f] });
      setChanged(`${files.join(", ")} at ${new Date().toLocaleTimeString()}`);
    });
    return () => es.close();
  }, [folder, qc]);
  const p = prod.data;
  const tabs = p ? [...p.tabs.filter((t) => t.file), ...p.others.map((o) => ({ id: o, label: o.replace(/\.md$/, ""), file: o }))] : [];
  const cur = tabs.find((t) => t.id === tab) ?? tabs[0];
  const file = useQuery({ queryKey: ["prodfile", folder, cur?.file], queryFn: () => api.productionFile(folder, cur!.file!), enabled: !!cur?.file });
  if (prod.error) return <ErrorLine error={prod.error} what="Could not read the package folder." todo="Check productions/ on disk, or reload." />;
  if (!p) return <Skeleton rows={6} label="Loading the package files" />;
  const meta = p.files.find((f) => f.name === cur?.file);
  return (
    <div className="space-y-3">
      <div className="seg gap-y-1" role="group" aria-label="package files">
        {p.tabs.map((t) => <button key={t.id} disabled={!t.file} onClick={() => setTab(t.id)} title={t.file ?? "not written yet"} aria-pressed={cur?.id === t.id}
          className={t.file ? "" : "is-missing"}>{t.label}</button>)}
        {p.others.map((o) => <button key={o} onClick={() => setTab(o)} aria-pressed={cur?.id === o}>{o.replace(/\.md$/, "")}</button>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span className="break-all">productions/{folder}/{cur?.file ?? ""}{meta ? <span className="text-ink-2">, {ago(meta.mtime)}</span> : ""}</span>
        {changed && <span title="fs.watch on the folder">changed: {changed}</span>}
      </div>
      {!cur ? <Empty>No Markdown files yet.</Empty> : file.error ? <ErrorLine error={file.error} what={`Could not read ${cur.file}.`} /> : file.data ? <Markdown text={file.data.text} /> : <Skeleton rows={8} label={`Loading ${cur.file}`} />}
    </div>
  );
}

export const Section = ({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) => (
  <section className="panel"><div className="panel__head"><h2>{title}</h2>{right}</div><div className="panel__body">{children}</div></section>
);
