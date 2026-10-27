// The agentic Package view's parts: the session stream (SSE), the timeline (one card per tool call, subagent calls
// nested under their Agent card, approval cards inline, verdict chips), the composer, and the artifact tabs that render
// the package's Markdown and refresh when a file changes (fs.watch → SSE).
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, ago, type AgentMsg, type FileGate, type Gate, type Session } from "../api";
import { Markdown } from "./Markdown";
import { Button, Chip, Empty, type Tone } from "./ui";

export const sessionTone = (s?: string | null): Tone =>
  s === "running" ? "accent" : s === "queued" ? "warn" : s === "idle" ? "ok" : s === "failed" || s === "interrupted" ? "bad" : "muted";
export const verdictTone = (v: string): Tone => (v === "PASS" || v === "READY" ? "ok" : "bad");
const fileGateTone: Record<FileGate["state"], Tone> = { todo: "muted", done: "accent", open: "warn", pass: "ok", bad: "bad" };

export function GateChips({ gates, files }: { gates?: Gate[]; files?: FileGate[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {files?.map((g) => <Chip key={g.id} tone={fileGateTone[g.state]} title={g.verdict ? `${g.verdict.verdict}${g.verdict.scores ? ` · ${g.verdict.scores}` : ""}` : g.state}>
        {g.label}{g.state === "pass" ? " ✓" : g.state === "bad" ? " ✗" : g.state === "open" ? " …" : g.state === "done" ? " ·" : ""}{g.detail ? ` ${g.detail}` : ""}</Chip>)}
      {gates?.map((g) => <Chip key={g.gate} tone={verdictTone(g.verdict)} title={g.scores ?? undefined}>{g.gate}: {g.verdict}</Chip>)}
    </div>
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
  return <div className="mt-1.5 flex flex-wrap gap-1.5">{v.map((x, i) => <Chip key={i} tone={verdictTone(x.verdict)} title={x.scores ?? undefined}>VERDICT {x.verdict}{x.scores ? ` · ${x.scores.slice(0, 80)}` : ""}</Chip>)}</div>;
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
    <div className={`rounded-lg border px-3 py-2.5 ${pending ? "border-warn bg-warn/10" : "border-line bg-panel-2"}`} role={pending ? "alertdialog" : undefined} aria-label="approval">
      <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="font-semibold">{pending ? "Approval needed" : "Approval"}</span>
        <Chip tone="accent">{d.tool}</Chip>
        {outcome && <Chip tone={outcome === "allowed" ? "ok" : "bad"}>{outcome}{done?.data.by && done.data.by !== "owner" ? ` (${done.data.by})` : ""}</Chip>}
        {pending && <span className="ml-auto text-[11px] text-muted">denied by default in {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</span>}
      </div>
      <div className="mt-1.5 break-all font-mono text-[11.5px]">{d.summary}</div>
      {(d.description || d.reason) && <div className="mt-1 text-[11.5px] text-muted">{d.reason ?? d.description}</div>}
      <details className="mt-1"><summary className="cursor-pointer text-[11px] text-muted">full input</summary>
        <pre className="scroll-thin mt-1 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-term p-2 font-mono text-[11px] text-term-ink">{d.input}</pre></details>
      {pending && (
        <div className="mt-2 flex items-center gap-2">
          <Button small kind="primary" disabled={act.isPending} onClick={() => act.mutate("allow")}>Allow once</Button>
          <Button small kind="danger" disabled={act.isPending} onClick={() => act.mutate("deny")}>Deny</Button>
          {act.isError && <span className="text-[11px] text-bad">{(act.error as Error).message}</span>}
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
    <div className={`rounded-lg border ${pendingApproval ? "border-warn" : "border-line"} bg-panel`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-start gap-2 px-3 py-2 text-left">
        <span className={`mt-0.5 text-[11px] ${status === "ok" ? "text-ok" : status === "error" ? "text-bad" : "text-accent"}`}>{status === "ok" ? "✓" : status === "error" ? "✗" : status === "running" ? "●" : "–"}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5"><span className="text-[12.5px] font-semibold">{isAgent ? `Agent · ${u.gate ?? "agent"}` : u.name}</span>
            {isAgent && e.children.length > 0 && <span className="text-[11px] text-muted">{e.children.length} steps</span>}
            {r?.verdicts?.map((v: any, i: number) => <Chip key={i} tone={verdictTone(v.verdict)} title={v.scores ?? undefined}>{v.verdict}</Chip>)}</span>
          <span className="block truncate font-mono text-[11.5px] text-muted">{u.summary}</span>
        </span>
        <span className="text-[11px] text-muted">{show ? "▾" : "▸"}</span>
      </button>
      {e.approvals.length > 0 && <div className="space-y-2 px-3 pb-2">{e.approvals.map((a) => <ApprovalCard key={a.seq} m={a} done={done.get(a.data.id)} live={live} />)}</div>}
      {show && (
        <div className="space-y-2 border-t border-line px-3 py-2">
          <details><summary className="cursor-pointer text-[11px] text-muted">input</summary>
            <pre className="scroll-thin mt-1 max-h-56 overflow-auto whitespace-pre-wrap rounded bg-term p-2 font-mono text-[11px] text-term-ink">{u.input}</pre></details>
          {e.children.length > 0 && <div className={`space-y-2 border-l-2 border-line pl-3 ${depth > 2 ? "" : ""}`}><Entries entries={e.children} done={done} live={live} depth={depth + 1} /></div>}
          {r && <div><div className="text-[11px] text-muted">result{r.isError ? " (error)" : ""}</div>
            <pre className={`scroll-thin mt-1 max-h-72 overflow-auto whitespace-pre-wrap rounded bg-panel-2 p-2 font-mono text-[11px] ${r.isError ? "text-bad" : ""}`}>{r.text || "(empty)"}</pre></div>}
        </div>)}
    </div>
  );
}

function MsgCard({ m }: { m: AgentMsg }) {
  const d = m.data;
  switch (m.kind) {
    case "user": return <div className="ml-auto max-w-[92%] rounded-xl rounded-br-sm bg-accent/12 px-3 py-2 text-[13px]"><div className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted">{d.resume ? "you" : "prompt"}</div><div className="whitespace-pre-wrap break-words">{d.text}</div></div>;
    case "text": return <div className="rounded-lg px-1 text-[13px]"><Markdown text={d.text} /><Verdicts v={d.verdicts} /></div>;
    case "init": return <div className="text-[11px] text-muted">session started · {d.model} · {d.apiKeySource === "none" ? "Claude Code login (no API key)" : `key: ${d.apiKeySource}`} · permissions {d.permissionMode} · Claude Code {d.version} · {d.tools} tools</div>;
    case "result": return <div className={`rounded-md border px-3 py-1.5 text-[11.5px] ${d.isError ? "border-bad/40 text-bad" : "border-line text-muted"}`}>turn ended · {d.subtype} · {d.turns} turns · {(d.durationMs / 1000).toFixed(0)} s{d.denials ? ` · ${d.denials} denied` : ""}<Verdicts v={d.verdicts} /></div>;
    case "error": return <div className="rounded-md border border-bad/40 bg-bad/10 px-3 py-2 text-[12.5px] text-bad">{d.text}</div>;
    case "system": return <div className="text-[11.5px] text-muted">· {d.text}</div>;
    default: return null;
  }
}

function Entries({ entries, done, live, depth = 0 }: { entries: Entry[]; done: Map<string, AgentMsg>; live: boolean; depth?: number }) {
  return <>{entries.map((e) => e.type === "tool"
    ? <ToolCard key={e.use.seq} e={e} done={done} live={live} depth={depth} />
    : e.m.kind === "approval" ? <ApprovalCard key={e.m.seq} m={e.m} done={done.get(e.m.data.id)} live={live} /> : <MsgCard key={e.m.seq} m={e.m} />)}</>;
}

export function Timeline({ msgs, session }: { msgs: AgentMsg[]; session: Session | null }) {
  const { entries, done } = useMemo(() => build(msgs), [msgs]);
  const live = session?.status === "running";
  if (!msgs.length) return <Empty>{session ? (session.status === "queued" ? "Queued: starts when the agent is free." : "No messages yet.") : "Not started."}</Empty>;
  return <div className="space-y-2.5"><Entries entries={entries} done={done} live={live} />
    {live && <div className="flex items-center gap-2 text-[12px] text-muted"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" />working…</div>}</div>;
}

export function Composer({ session }: { session: Session }) {
  const [text, setText] = useState("");
  const send = useMutation({ mutationFn: () => api.send(session.id, text), onSuccess: () => setText("") });
  const can = session.status !== "running" && session.status !== "queued" && !!session.sdk_session_id;
  return (
    <form className="space-y-1.5" onSubmit={(e) => { e.preventDefault(); if (text.trim() && can) send.mutate(); }}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder={can ? "Reply to the agent, e.g. “Approve, hook A” (resumes the session)" : session.status === "running" ? "the agent is working: reply when its turn ends" : "start the session first"}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (text.trim() && can) send.mutate(); } }}
        className="w-full resize-y rounded-lg border border-line bg-panel px-3 py-2 text-[13px]" disabled={!can} />
      <div className="flex items-center gap-2">
        <Button small kind="primary" type="submit" disabled={!can || !text.trim() || send.isPending}>Send</Button>
        <span className="text-[11px] text-muted">ctrl+enter · one agent turn runs at a time</span>
        {send.isError && <span className="text-[11px] text-bad">{(send.error as Error).message}</span>}
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
      setChanged(`${files.join(", ")} · ${new Date().toLocaleTimeString()}`);
    });
    return () => es.close();
  }, [folder, qc]);
  const p = prod.data;
  const tabs = p ? [...p.tabs.filter((t) => t.file), ...p.others.map((o) => ({ id: o, label: o.replace(/\.md$/, ""), file: o }))] : [];
  const cur = tabs.find((t) => t.id === tab) ?? tabs[0];
  const file = useQuery({ queryKey: ["prodfile", folder, cur?.file], queryFn: () => api.productionFile(folder, cur!.file!), enabled: !!cur?.file });
  if (prod.error) return <Empty>{(prod.error as Error).message}</Empty>;
  if (!p) return <Empty>Loading…</Empty>;
  const meta = p.files.find((f) => f.name === cur?.file);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1">
        {p.tabs.map((t) => <button key={t.id} disabled={!t.file} onClick={() => setTab(t.id)} title={t.file ?? "not written yet"}
          className={`rounded-md border px-2 py-0.5 text-[12px] ${cur?.id === t.id ? "border-accent bg-accent/10 text-ink" : t.file ? "border-line text-muted hover:text-ink" : "border-dashed border-line text-muted/50"}`}>{t.label}</button>)}
        {p.others.map((o) => <button key={o} onClick={() => setTab(o)} className={`rounded-md border px-2 py-0.5 text-[12px] ${cur?.id === o ? "border-accent bg-accent/10" : "border-line text-muted hover:text-ink"}`}>{o.replace(/\.md$/, "")}</button>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <span className="font-mono">productions/{folder}/{cur?.file ?? ""}{meta ? ` · ${ago(meta.mtime)}` : ""}</span>
        {changed && <span title="fs.watch on the folder">changed: {changed}</span>}
      </div>
      {!cur ? <Empty>No Markdown files yet.</Empty> : file.data ? <Markdown text={file.data.text} /> : <Empty>Loading…</Empty>}
    </div>
  );
}

export const Section = ({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) => (
  <section className="space-y-2"><div className="flex items-center justify-between gap-2"><h3 className="text-[11px] font-semibold uppercase tracking-wide text-muted">{title}</h3>{right}</div>{children}</section>
);
