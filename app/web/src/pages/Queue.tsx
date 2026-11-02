// Queue: topics in → packages out. Each item is one agent session (/video-scripter <topic> under the owner's Claude
// Code login) or a one-off question for the agent ("ask", no package). One agent turn runs at a time.
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api } from "../api";
import { GateChips, sessionTone } from "../components/agent";
import { Button, Card, Chip, Empty, ErrorLine, Gate, Skeleton } from "../components/ui";

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
  const inp = "field w-full";
  return (
    <Card title="Add to the queue" right={
      <div className="seg" role="group" aria-label="kind of item">
        {(["package", "ask"] as const).map((k) => <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k}>{k === "package" ? "New package" : "Ask the agent"}</button>)}
      </div>}>
      <form className="max-w-3xl space-y-3" onSubmit={(e) => { e.preventDefault(); add.mutate(false); }}>
        {kind === "package" ? <>
          <input className={inp} aria-label="topic or tool" placeholder="Topic or tool, e.g. “Claude Skills”, “what is RAG”" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted"><label className="flex items-center gap-2" title={`prompt: /video-scripter ${f.topic || "<topic>"} + the notes`}>format<select className="field field--sm" value="reel" disabled><option value="reel">reel</option></select></label></div>
          <textarea className={inp} rows={2} aria-label="notes for the agent" placeholder="Notes for the agent (optional): angle, sources to use, what to avoid" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
        </> : <>
          <textarea className={inp} rows={3} aria-label="question for the agent" placeholder="A question or task for the agent (no package is created unless you ask for one), e.g. “Read productions/…/content-plan.md and summarise it; don’t edit anything”" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
          <label className="flex flex-wrap items-center gap-2 text-xs text-muted">show the artifacts of
            <select className="field field--sm max-w-full" value={f.folder} onChange={(e) => setF({ ...f, folder: e.target.value })}>
              <option value="">(no package)</option>{prods.data?.map((p) => <option key={p.folder} value={p.folder}>{p.folder}</option>)}
            </select></label>
        </>}
        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={f.topic.trim().length < 3 || add.isPending}>Add to queue</Button>
          <Button kind="primary" disabled={f.topic.trim().length < 3 || add.isPending} onClick={() => add.mutate(true)}>Add and start</Button>
          <span className="text-xs text-muted" title="on your Claude Code login (no API key); it also asks before working outside its folder">Runs on autopilot. Asks you only to spend a voice request, deliver, delete or commit.</span>
          {add.isError && <span role="alert" className="text-xs text-bad">{(add.error as Error).message}</span>}
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
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
        <h1 className="max-w-none text-xl font-extrabold">Queue</h1>
      </div>
      <div className="space-y-8 px-4 py-6 sm:px-6">
        <NewItem />
        <Card pad={false} title="Items" right={<>{q.data?.active ? <Gate state="running">agent running, session #{q.data.active}</Gate> : <Gate state="pending">agent idle</Gate>}
          {(q.data?.approvals.length ?? 0) > 0 && <Gate state="waiting">{q.data!.approvals.length} approval(s) waiting</Gate>}</>}>
          {q.isLoading ? <Skeleton rows={4} label="Loading the queue" /> : q.error ? <ErrorLine error={q.error} what="Could not load the queue." todo="Reload; the queue lives in app/data.db." /> : items.length === 0 ? <div className="py-3"><Empty>Nothing queued yet. Add a topic above, or queue one from Trends.</Empty></div> : (
            <ul className="divide-y divide-rule">{items.map((p) => {
              const st = p.session?.status ?? "new";
              const waiting = q.data?.approvals.filter((a) => a.session_id === p.session?.id).length ?? 0;
              return (
                <li key={p.id} className="flex flex-wrap items-start gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link to={`/packages/${p.id}`} className="link max-w-full truncate text-sm font-extrabold no-underline hover:underline" title={p.topic}>{p.kind === "ask" ? p.topic.split("\n")[0].slice(0, 110) : p.topic}</Link>
                      <Chip>{p.kind === "ask" ? "ask" : p.format}</Chip>
                      <Chip tone={sessionTone(st)}>{st}</Chip>
                      {waiting > 0 && <Gate state="waiting">{waiting} approval waiting</Gate>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted"><span className="font-extrabold text-ink">#{p.id}</span><span>added {ago(p.created_at)}</span>{p.session?.finished_at && <span>last turn {ago(p.session.finished_at)}</span>}
                      {p.folder ? <Link className="link" to={`/productions/${p.folder}`}>productions/{p.folder}/</Link> : p.kind === "package" ? <span>no package folder yet</span> : null}</div>
                    {p.gates.length > 0 && <div className="mt-1.5"><GateChips gates={p.gates} /></div>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(!p.session || (!p.session.sdk_session_id && ["stopped", "failed", "interrupted"].includes(st))) && <Button small kind="primary" onClick={() => act.mutate({ id: p.id, op: "start" })}>Start</Button>}
                    {(st === "running" || st === "queued") && <Button small kind="danger" onClick={() => act.mutate({ id: p.id, op: "stop" })}>Stop</Button>}
                    <Link to={`/packages/${p.id}`} className="btn btn--sm">Open</Link>
                    {st !== "running" && st !== "queued" && <Button small kind="ghost" onClick={() => { if (confirm(`Remove #${p.id} and its timeline from the queue? (files in productions/ stay)`)) act.mutate({ id: p.id, op: "delete" }); }} title={`remove #${p.id} from the queue`}>Remove</Button>}
                  </div>
                </li>);
            })}</ul>)}
          {act.isError && <div role="alert" className="pb-3 text-xs text-bad">{(act.error as Error).message}</div>}
        </Card>
        <Card pad={false} title={<span title="read from the files: the gate ticks the linter reads">Packages in productions/</span>}>
          {prods.isLoading && <Skeleton rows={4} label="Loading the packages" />}
          {prods.error && <ErrorLine error={prods.error} what="Could not read productions/." todo="Reload; the server lists the package folders." />}
          {prods.data?.length === 0 && <Empty>No package folders in productions/ yet. Add a topic above to make one.</Empty>}
          <ul className="divide-y divide-rule">{prods.data?.map((p) => (
            <li key={p.folder} className="py-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2"><Link to={`/productions/${p.folder}`} className="link text-sm font-extrabold no-underline hover:underline">{p.folder}</Link><span className="text-xs text-muted">{p.files} files, {ago(p.mtime)}</span></div>
              <div className="mt-1"><GateChips files={p.gates} /></div>
            </li>))}</ul>
        </Card>
      </div>
    </div>
  );
}
