// Experiments: the free-GPU model tests in experiments/<name>/ (read-only). Verdict and RESULTS.md, the previews and clips
// they made, and their contact sheets. Nothing here is a channel video: these never go to shorts/.
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ago, api, expUrl, type ExpFile, type Experiment } from "../api";
import { Card, Empty, ErrorLine, Icon, Skeleton } from "../components/ui";
import { Markdown } from "../components/Markdown";
import { RunPet } from "../components/Pet";

/** files grouped by folder (out/, results/clips/, results/sheets/ …), previews in out/ first */
function groups(files: ExpFile[]) {
  const m = new Map<string, ExpFile[]>();
  for (const f of files) { const d = f.path.includes("/") ? f.path.slice(0, f.path.lastIndexOf("/")) : "."; m.set(d, [...(m.get(d) ?? []), f]); }
  return [...m.entries()].sort(([a], [b]) => (a === "out" ? -1 : b === "out" ? 1 : a.localeCompare(b)));
}
const base = (p: string) => p.slice(p.lastIndexOf("/") + 1);
const mb = (n: number) => (n < 1e6 ? `${Math.max(1, Math.round(n / 1e3))} kB` : `${(n / 1e6).toFixed(1)} MB`);

export function Experiments() {
  // poll while a Kaggle run is live or waiting to be fetched, so the run pet keeps up with kaggle.sh watch
  const q = useQuery({ queryKey: ["experiments"], queryFn: api.experiments,
    refetchInterval: (qq) => (qq.state.data?.some((e) => e.run?.progress && (["queued", "running"].includes(e.run.progress.status) || !e.run.reviewed)) ? 10_000 : false) });
  const [params, setParams] = useSearchParams();
  const sel = q.data?.find((e) => e.name === params.get("e")) ?? q.data?.[0];
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
        <h1 className="max-w-none text-xl font-extrabold">Experiments</h1>
        <p className="text-sm text-muted">Free-GPU model tests from <code>experiments/</code>. Read-only, never delivered to shorts/.</p>
      </div>
      <div className="space-y-6 px-4 py-6 sm:px-6">
        {q.isLoading && <Skeleton rows={4} label="Loading the experiments" />}
        {q.error && <ErrorLine error={q.error} what="Could not load the experiments." todo="Reload; the server reads experiments/." />}
        {q.data?.length === 0 && <Empty>No experiments yet.</Empty>}
        {q.data && q.data.length > 0 && (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Experiments">
            {q.data.map((e) => (
              <button key={e.name} role="tab" aria-selected={sel?.name === e.name} onClick={() => setParams({ e: e.name })}
                className={`btn btn--sm ${sel?.name === e.name ? "btn--primary" : ""}`} title={e.title}>
                {e.name}<span className="text-xs opacity-75">{e.videos.length} clips</span></button>))}
          </div>)}
        {sel && <ExperimentView e={sel} />}
      </div>
    </div>
  );
}

function ExperimentView({ e }: { e: Experiment }) {
  const [open, setOpen] = useState<ExpFile | null>(null);
  return (
    <>
      {e.run && <RunPet run={e.run} />}
      <Card title={e.title} right={<span title={e.updated}>updated {ago(e.updated)}</span>}>
        {e.verdict ? <p className="text-sm"><b>Verdict:</b> {e.verdict}</p>
          : <p className="text-sm text-muted">No RESULTS.md yet: the run is still going or hasn't been scored.</p>}
        {e.results && (
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-extrabold">RESULTS.md</summary>
            <div className="mt-2"><Markdown text={e.results} /></div>
          </details>)}
      </Card>

      {e.videos.length === 0 && e.images.length === 0 && <Empty>No clips or sheets yet: fetch the run's output into results/ first.</Empty>}

      {groups(e.videos).map(([dir, files]) => (
        <Card key={dir} title={<span title={`experiments/${e.name}/${dir}/`}>{dir === "out" ? "Previews" : dir} · {files.length}</span>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {files.map((f) => (
              <button key={f.path} onClick={() => setOpen(f)} className="group text-left" aria-label={`play ${f.path}`}>
                <video src={`${expUrl(e.name, f.path)}#t=0.5`} muted playsInline preload="metadata"
                  className="aspect-[9/16] w-full border-2 border-ink bg-plate object-cover group-hover:border-accent" />
                <div className="mt-1 truncate text-xs font-extrabold" title={f.path}>{base(f.path)}</div>
                <div className="text-xs text-muted">{mb(f.size)}</div>
              </button>))}
          </div>
        </Card>))}

      {groups(e.images).map(([dir, files]) => (
        <Card key={dir} title={<span title={`experiments/${e.name}/${dir}/`}>{dir} · {files.length}</span>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
            {files.map((f) => (
              <button key={f.path} onClick={() => setOpen(f)} className="group text-left" aria-label={`open ${f.path}`}>
                <img loading="lazy" alt={f.path} src={expUrl(e.name, f.path)} className="max-h-48 w-full border-2 border-ink bg-plate object-contain group-hover:border-accent" />
                <div className="mt-1 truncate text-xs font-extrabold" title={f.path}>{base(f.path)}</div>
              </button>))}
          </div>
        </Card>))}

      {open && (
        <div role="dialog" aria-label={open.path} className="fixed inset-0 z-50 grid place-items-center bg-scrim p-4" onClick={() => setOpen(null)}>
          <div className="flex max-h-full max-w-full flex-col items-end gap-2" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex w-full items-center justify-between gap-3">
              <span className="truncate bg-paper px-2 text-sm font-extrabold">{open.path}</span>
              <button type="button" onClick={() => setOpen(null)} className="btn btn--sm bg-paper" aria-label="close"><Icon name="close" />Close</button>
            </div>
            {open.kind === "video"
              /* the owner presses play: no autoplay with sound */
              ? <video src={expUrl(e.name, open.path)} controls loop playsInline preload="metadata" className="max-h-[85dvh] max-w-full border-2 border-ink bg-plate" />
              : <img alt={open.path} src={expUrl(e.name, open.path)} className="max-h-[85dvh] max-w-full border-2 border-ink bg-plate object-contain" />}
          </div>
        </div>)}
    </>
  );
}
