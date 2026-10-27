// Package (agentic view): left the agent timeline (tool cards, verdict chips, approval cards inline, the composer);
// right the package's Markdown artifacts as tabs, refreshed as the agent writes them. /productions/:folder shows a
// package folder without a session (its artifacts and gate ticks).
import { Link, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api } from "../api";
import { ArtifactTabs, Composer, GateChips, Section, Timeline, sessionTone, useSession } from "../components/agent";
import { Panes } from "../components/Shell";
import { Button, Chip, Empty } from "../components/ui";

export function Package() {
  const id = Number(useParams().id);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["package", id], queryFn: () => api.pkg(id), refetchInterval: 4000 });
  const p = q.data;
  const { msgs, session: live } = useSession(p?.session?.id);
  const act = useMutation({ mutationFn: (op: "start" | "stop") => (op === "start" ? api.startPkg(id) : api.stopPkg(id)), onSuccess: (d) => qc.setQueryData(["package", id], d) });
  if (q.error) return <div className="p-6"><Empty>{(q.error as Error).message}</Empty></div>;
  if (!p) return <div className="p-6"><Empty>Loading…</Empty></div>;
  const s = live ?? p.session;
  const st = s?.status ?? "new";
  const header = (
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] text-muted"><Link to="/queue" className="hover:underline">Queue</Link> · #{p.id} · {p.kind === "ask" ? "ask" : `${p.format} package`} · added {ago(p.created_at)}</div>
          <h1 className="line-clamp-2 text-lg font-semibold" title={p.topic}>{p.kind === "ask" ? p.topic.split("\n")[0] : p.topic}</h1>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <Chip tone={sessionTone(st)}>{st}</Chip>
            {s?.model && <span>{s.model}</span>}
            {s?.api_key_source && <span>{s.api_key_source === "none" ? "Claude Code login (no API key)" : `API key: ${s.api_key_source}`}</span>}
            {s && s.turns > 0 && <span>{s.turns} turns</span>}
            {p.folder && <Link to={`/productions/${p.folder}`} className="font-mono text-accent hover:underline">productions/{p.folder}/</Link>}
          </div>
        </div>
        <div className="flex gap-1.5">
          {(!s || (!s.sdk_session_id && ["stopped", "failed", "interrupted"].includes(st))) && <Button kind="primary" onClick={() => act.mutate("start")}>Start</Button>}
          {(st === "running" || st === "queued") && <Button kind="danger" onClick={() => act.mutate("stop")}>Stop</Button>}
        </div>
      </div>
      {(p.gates.length > 0 || p.production) && <GateChips gates={p.gates} files={p.production?.gates} />}
      {act.isError && <div className="text-xs text-bad">{(act.error as Error).message}</div>}
      {s?.error && <div className="text-xs text-bad">{s.error}</div>}
    </div>);
  return (
    <Panes header={header} artifactTitle={p.folder ? <>Artifacts · productions/{p.folder}/</> : "Artifacts"}
      artifact={p.folder ? <ArtifactTabs folder={p.folder} /> : <Empty>{p.kind === "package" ? "The package folder appears here once the agent writes into productions/<date>-<slug>/." : "This question has no package attached."}</Empty>}
      main={<>
        <Section title="Agent timeline" right={<span className="text-[11px] text-muted">{msgs.length} messages · persisted in app/data.db</span>}>
          <Timeline msgs={msgs} session={s} />
        </Section>
        {s && <div className="sticky bottom-0 -mx-5 border-t border-line bg-bg/95 px-5 py-3 backdrop-blur"><Composer session={s} /></div>}
        <details className="text-[11.5px] text-muted"><summary className="cursor-pointer">first prompt</summary><pre className="mt-1 whitespace-pre-wrap font-mono">{p.prompt}</pre></details>
      </>} />
  );
}

export function ProductionView() {
  const { folder = "" } = useParams();
  const q = useQuery({ queryKey: ["production", folder], queryFn: () => api.production(folder) });
  const pk = useQuery({ queryKey: ["packages"], queryFn: api.packages });
  const sessions = pk.data?.items.filter((i) => i.folder === folder) ?? [];
  if (q.error) return <div className="p-6"><Empty>{(q.error as Error).message}</Empty></div>;
  return (
    <Panes header={<div><div className="text-[11px] text-muted"><Link to="/queue" className="hover:underline">Queue</Link> · package folder</div><h1 className="font-mono text-lg font-semibold">productions/{folder}/</h1>
      {q.data && <div className="mt-2"><GateChips files={q.data.gates} /></div>}</div>}
      artifactTitle="Artifacts" artifact={<ArtifactTabs folder={folder} />}
      main={<>
        <Section title="Files">
          <ul className="space-y-0.5 text-[12.5px]">{q.data?.files.map((f) => <li key={f.name} className="flex justify-between gap-2"><span className="font-mono">{f.name}</span><span className="text-muted">{(f.size / 1024).toFixed(1)} KB · {ago(f.mtime)}</span></li>)}</ul>
        </Section>
        <Section title="Agent sessions on this folder">
          {sessions.length ? <ul className="space-y-1 text-[13px]">{sessions.map((s) => <li key={s.id}><Link className="text-accent hover:underline" to={`/packages/${s.id}`}>#{s.id} {s.kind === "ask" ? s.topic.slice(0, 90) : s.topic}</Link> <Chip tone={sessionTone(s.session?.status)}>{s.session?.status ?? "new"}</Chip></li>)}</ul>
            : <Empty>None. Ask the agent about it from the Queue (“Ask the agent”, then pick this folder).</Empty>}
        </Section>
      </>} />
  );
}
