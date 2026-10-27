// Queue: topics in → packages out. Each item is one agent session (/video-scripter <topic> under the owner's Claude
// Code login) or a one-off question for the agent ("ask", no package). One agent turn runs at a time.
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api } from "../api";
import { GateChips, sessionTone } from "../components/agent";
import { Button, Card, Chip, Empty } from "../components/ui";

function NewItem() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const [kind, setKind] = useState<"package" | "ask">("package");
  const [f, setF] = useState({ topic: "", notes: "", folder: "" });
  const prods = useQuery({ queryKey: ["productions"], queryFn: api.productions, enabled: kind === "ask" });
  const add = useMutation({
    mutationFn: (start: boolean) => api.createPkg({ kind, topic: f.topic, notes: f.notes, format: "reel", folder: f.folder || undefined, start }),
    onSuccess: (p) => { qc.invalidateQueries({ queryKey: ["packages"] }); setF({ topic: "", notes: "", folder: "" }); if (p.session) nav(`/packages/${p.id}`); },
  });
  const inp = "w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px]";
  return (
    <Card title="Add to the queue" right={
      <div className="flex rounded-lg border border-line p-0.5">
        {(["package", "ask"] as const).map((k) => <button key={k} onClick={() => setKind(k)} className={`rounded-md px-2 py-0.5 text-xs ${kind === k ? "bg-panel-2 text-ink" : "text-muted hover:text-ink"}`}>{k === "package" ? "New package" : "Ask the agent"}</button>)}
      </div>}>
      <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); add.mutate(false); }}>
        {kind === "package" ? <>
          <input className={inp} placeholder="Topic or tool, e.g. “Claude Skills”, “what is RAG”" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
          <div className="flex flex-wrap gap-2 text-[12px] text-muted"><span>format</span><select className="rounded-md border border-line bg-panel px-1.5 py-0.5" value="reel" disabled><option value="reel">reel</option></select>
            <span>prompt: <span className="font-mono">/video-scripter {f.topic || "<topic>"}</span> + the notes</span></div>
          <textarea className={inp} rows={2} placeholder="Notes for the agent (optional): angle, sources to use, what to avoid" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
        </> : <>
          <textarea className={inp} rows={3} placeholder="A question or task for the agent (no package is created unless you ask for one), e.g. “Read productions/…/content-plan.md and summarise it; don't edit anything”" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted">show the artifacts of
            <select className="rounded-md border border-line bg-panel px-1.5 py-1" value={f.folder} onChange={(e) => setF({ ...f, folder: e.target.value })}>
              <option value="">(no package)</option>{prods.data?.map((p) => <option key={p.folder} value={p.folder}>{p.folder}</option>)}
            </select></div>
        </>}
        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={f.topic.trim().length < 3 || add.isPending}>Add to queue</Button>
          <Button kind="primary" disabled={f.topic.trim().length < 3 || add.isPending} onClick={() => add.mutate(true)}>Add and start</Button>
          <span className="text-[11px] text-muted">runs on your Claude Code login (no API key); every tool that needs permission asks here first</span>
          {add.isError && <span className="text-xs text-bad">{(add.error as Error).message}</span>}
        </div>
      </form>
    </Card>
  );
}

export function Queue() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["packages"], queryFn: api.packages, refetchInterval: 3000 });
  const prods = useQuery({ queryKey: ["productions"], queryFn: api.productions });
  const act = useMutation({
    mutationFn: async ({ id, op }: { id: number; op: "start" | "stop" | "delete" }): Promise<unknown> => op === "start" ? api.startPkg(id) : op === "stop" ? api.stopPkg(id) : api.deletePkg(id),
    onSettled: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
  const items = q.data?.items ?? [];
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bg/90 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold">Queue</h1>
        <p className="text-xs text-muted">Topics → packages (productions/&lt;date&gt;-&lt;slug&gt;/) through the four scripter gates. The agent is Claude Code (Agent SDK) with this repo's skills, agents and CLAUDE.md.</p>
      </div>
      <div className="space-y-5 p-6">
        <NewItem />
        <Card pad={false} title="Items" right={<>{q.data?.active ? <Chip tone="accent">agent running · session #{q.data.active}</Chip> : <Chip>agent idle</Chip>}
          {(q.data?.approvals.length ?? 0) > 0 && <Chip tone="warn">{q.data!.approvals.length} approval(s) waiting</Chip>}</>}>
          {items.length === 0 ? <div className="p-4"><Empty>Nothing queued yet.</Empty></div> : (
            <ul className="divide-y divide-line">{items.map((p) => {
              const st = p.session?.status ?? "new";
              const waiting = q.data?.approvals.filter((a) => a.session_id === p.session?.id).length ?? 0;
              return (
                <li key={p.id} className="flex flex-wrap items-start gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link to={`/packages/${p.id}`} className="max-w-full truncate text-[14px] font-semibold hover:underline" title={p.topic}>{p.kind === "ask" ? p.topic.split("\n")[0].slice(0, 110) : p.topic}</Link>
                      <Chip tone={p.kind === "ask" ? "muted" : "accent"}>{p.kind === "ask" ? "ask" : p.format}</Chip>
                      <Chip tone={sessionTone(st)}>{st}</Chip>
                      {waiting > 0 && <Chip tone="warn">{waiting} approval waiting</Chip>}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted">#{p.id} · added {ago(p.created_at)}{p.session?.finished_at ? ` · last turn ${ago(p.session.finished_at)}` : ""}
                      {p.folder ? <> · <Link className="font-mono text-accent hover:underline" to={`/productions/${p.folder}`}>productions/{p.folder}/</Link></> : p.kind === "package" ? " · no package folder yet" : ""}</div>
                    {p.gates.length > 0 && <div className="mt-1.5"><GateChips gates={p.gates} /></div>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(!p.session || (!p.session.sdk_session_id && ["stopped", "failed", "interrupted"].includes(st))) && <Button small kind="primary" onClick={() => act.mutate({ id: p.id, op: "start" })}>Start</Button>}
                    {(st === "running" || st === "queued") && <Button small kind="danger" onClick={() => act.mutate({ id: p.id, op: "stop" })}>Stop</Button>}
                    <Link to={`/packages/${p.id}`}><Button small>Open</Button></Link>
                    {st !== "running" && st !== "queued" && <Button small kind="ghost" onClick={() => { if (confirm(`Remove #${p.id} and its timeline from the queue? (files in productions/ stay)`)) act.mutate({ id: p.id, op: "delete" }); }}>✕</Button>}
                  </div>
                </li>);
            })}</ul>)}
          {act.isError && <div className="px-4 pb-3 text-xs text-bad">{(act.error as Error).message}</div>}
        </Card>
        <Card pad={false} title="Packages in productions/" right={<span>read from the files: the gate ticks the linter reads</span>}>
          <ul className="divide-y divide-line">{prods.data?.map((p) => (
            <li key={p.folder} className="px-4 py-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2"><Link to={`/productions/${p.folder}`} className="font-mono text-[13px] hover:underline">{p.folder}</Link><span className="text-[11px] text-muted">{p.files} files · {ago(p.mtime)}</span></div>
              <div className="mt-1"><GateChips files={p.gates} /></div>
            </li>))}</ul>
        </Card>
      </div>
    </div>
  );
}
