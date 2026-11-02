// Package (agentic view): left the agent timeline (tool cards, verdict chips, approval cards inline, the composer);
// right the package's Markdown artifacts as tabs, refreshed as the agent writes them. /productions/:folder shows a
// package folder without a session (its artifacts and gate ticks).
import { Link, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api } from "../api";
import { ArtifactTabs, Composer, GateChips, Section, Timeline, sessionTone, useSession } from "../components/agent";
import { PhaseStrip } from "../components/phases";
import { Panes } from "../components/Shell";
import { Button, Chip, Empty, ErrorLine, Skeleton } from "../components/ui";

export function Package() {
  const id = Number(useParams().id);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["package", id], queryFn: () => api.pkg(id), refetchInterval: 4000 });
  const p = q.data;
  const { msgs, session: live } = useSession(p?.session?.id);
  const approve = useMutation({ mutationFn: () => api.approveScript(id), onSuccess: (d) => qc.setQueryData(["package", id], d) });
  const act = useMutation({ mutationFn: (op: "start" | "stop") => (op === "start" ? api.startPkg(id) : api.stopPkg(id)), onSuccess: (d) => qc.setQueryData(["package", id], d) });
  if (q.error) return <div className="p-6"><ErrorLine error={q.error} what={`Could not load queue item #${id}.`} todo="It may have been removed; go back to the Queue." /></div>;
  if (!p) return <div className="max-w-3xl space-y-6 p-6"><Empty>Loading…</Empty><Skeleton rows={6} label="Loading the package" /></div>;
  const s = live ?? p.session;
  const st = s?.status ?? "new";
  const header = (
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-3 text-xs text-muted"><Link to="/queue" className="link">Queue</Link><span className="font-extrabold text-ink">#{p.id}</span><span>{p.kind === "ask" ? "ask" : `${p.format} package`}</span><span>added {ago(p.created_at)}</span></nav>
          <h1 className="mt-1 line-clamp-2 max-w-none text-xl font-extrabold" title={p.topic}>{p.kind === "ask" ? p.topic.split("\n")[0] : p.topic}</h1>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <Chip tone={sessionTone(st)} title={[s?.model, s?.api_key_source ? (s.api_key_source === "none" ? "Claude Code login (no API key)" : `API key: ${s.api_key_source}`) : null, s && s.turns > 0 ? `${s.turns} turns` : null].filter(Boolean).join(" · ") || undefined}>{st}</Chip>
            {p.folder && <Link to={`/productions/${p.folder}`} className="link max-w-full truncate">productions/{p.folder}/</Link>}
          </div>
        </div>
        <div className="flex gap-1.5">
          {(!s || (!s.sdk_session_id && ["stopped", "failed", "interrupted"].includes(st))) && <Button kind="primary" onClick={() => act.mutate("start")}>Start</Button>}
          {(st === "running" || st === "queued") && <Button kind="danger" onClick={() => act.mutate("stop")}>Stop</Button>}
        </div>
      </div>
      {p.kind === "package" && <PhaseStrip p={p} msgs={msgs} session={s} />}
      {p.kind === "package" && s?.sdk_session_id && (p.script_approved_at
        ? <p className="text-xs text-muted">Script approved {ago(p.script_approved_at)}: the rest runs on its own.</p>
        : <div className="flex flex-wrap items-center gap-2 border-2 border-ink px-3 py-2" role="group" aria-label="script approval">
            <span className="text-sm"><b className="font-extrabold">Your checkpoint: the script.</b> <span className="text-muted">Approve it, or reply below with changes.</span></span>
            <span className="ml-auto"><Button small kind="primary" disabled={approve.isPending || st === "running" || st === "queued"}
              title={st === "running" ? "the agent is still working: approve when it shows you the script" : undefined} onClick={() => approve.mutate()}>Approve script</Button></span>
            {approve.isError && <span role="alert" className="text-xs text-bad">{(approve.error as Error).message}</span>}
          </div>)}
      {(p.gates.length > 0 || p.production) && <GateChips gates={p.gates} files={p.production?.gates} />}
      {act.isError && <div role="alert" className="text-xs text-bad">{(act.error as Error).message}</div>}
      {s?.error && <div role="alert" className="text-xs text-bad">{s.error}</div>}
    </div>);
  return (
    <Panes header={header} artifactTitle={p.folder ? <>Artifacts: productions/{p.folder}/</> : "Artifacts"}
      artifact={p.folder ? <ArtifactTabs folder={p.folder} /> : <Empty>{p.kind === "package" ? "The package folder appears here once the agent writes into productions/<date>-<slug>/." : "This question has no package attached."}</Empty>}
      main={<>
        <Section title="Agent timeline" right={<span className="text-xs text-muted" title="persisted in app/data.db">{msgs.length} messages</span>}>
          <Timeline msgs={msgs} session={s} />
        </Section>
        {s && <div className="sticky bottom-0 -mx-4 border-t-2 border-ink bg-paper px-4 py-3 sm:-mx-6 sm:px-6"><Composer session={s} /></div>}
        <details className="text-xs text-muted"><summary className="cursor-pointer">first prompt</summary><pre className="out mt-1">{p.prompt}</pre></details>
      </>} />
  );
}

export function ProductionView() {
  const { folder = "" } = useParams();
  const q = useQuery({ queryKey: ["production", folder], queryFn: () => api.production(folder) });
  const pk = useQuery({ queryKey: ["packages"], queryFn: api.packages });
  const sessions = pk.data?.items.filter((i) => i.folder === folder) ?? [];
  if (q.error) return <div className="p-6"><ErrorLine error={q.error} what={`Could not read productions/${folder}/.`} todo="Check the folder exists, or go back to the Queue." /></div>;
  return (
    <Panes header={<div><nav aria-label="Breadcrumb" className="flex gap-x-3 text-xs text-muted"><Link to="/queue" className="link">Queue</Link><span>package folder</span></nav><h1 className="mt-1 max-w-none break-words text-lg font-extrabold">productions/{folder}/</h1>
      {q.data && <div className="mt-2"><GateChips files={q.data.gates} /></div>}</div>}
      artifactTitle="Artifacts" artifact={<ArtifactTabs folder={folder} />}
      main={<>
        <Section title="Files">
          {!q.data ? <Skeleton rows={5} label="Loading the files" /> : q.data.files.length === 0 ? <Empty>No files in this folder yet.</Empty> :
          <table className="data"><thead><tr><th>file</th><th className="num">size</th><th className="num">changed</th></tr></thead>
            <tbody>{q.data.files.map((f) => <tr key={f.name}><td className="break-all">{f.name}</td><td className="num whitespace-nowrap">{(f.size / 1024).toFixed(1)} KB</td><td className="num whitespace-nowrap text-muted">{ago(f.mtime)}</td></tr>)}</tbody></table>}
        </Section>
        <Section title="Agent sessions on this folder">
          {sessions.length ? <ul className="divide-y divide-rule text-sm">{sessions.map((s) => <li key={s.id} className="flex items-start justify-between gap-3 py-2"><Link className="link min-w-0 truncate" title={s.topic} to={`/packages/${s.id}`}>#{s.id} {s.kind === "ask" ? s.topic.slice(0, 90) : s.topic}</Link> <Chip tone={sessionTone(s.session?.status)}>{s.session?.status ?? "new"}</Chip></li>)}</ul>
            : <Empty>None. Ask the agent about it from the Queue (“Ask the agent”, then pick this folder).</Empty>}
        </Section>
      </>} />
  );
}
