// Preview: the composition before any render (hf/ in a frame, emulated runtime), HyperFrames Studio for frame-accurate
// scrubbing with element selection, and the rendered MP4 at the same time for comparison.
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fileUrl, type Project } from "../api";
import { Panes } from "../components/Shell";
import { ProjectHeader } from "../components/ProjectHeader";
import { CompositionPreview } from "../components/CompositionPreview";
import { PayoffsTable } from "../components/artefacts";
import { LogPanel } from "../components/LogPanel";
import { useJobStream } from "../components/useJobStream";
import type { PlayerApi } from "../components/Player";
import { Button, Card, Chip, Empty } from "../components/ui";

/** the rendered MP4, held on the preview's time while the preview is paused (side-by-side check) */
function Mp4AtTime({ p, t, playing }: { p: Project; t: number; playing: boolean }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => { const el = v.current; if (el && !playing && Math.abs(el.currentTime - t) > 1 / 60) el.currentTime = t + 0.001; }, [t, playing]);
  if (!p.exists.mp4) return <Card title="The MP4 at the same time"><Empty>No render yet: the preview is all there is before render.</Empty></Card>;
  const stale = p.timeline && p.hfMtime && p.status.qa?.fresh === false;
  return (
    <Card title="The MP4 at the same time" right={<>{stale && <Chip tone="warn">qa is for an older MP4</Chip>}<span>{playing ? "follows when paused" : `${t.toFixed(2)} s`}</span></>}>
      <video ref={v} src={fileUrl(p.slug, `${p.slug}.mp4`)} preload="auto" muted playsInline className="mx-auto aspect-[9/16] max-h-[60vh] w-full rounded-lg bg-black object-contain" />
      <p className="mt-2 text-[11.5px] text-muted">out/{p.slug}.mp4 (the truth). If the composition changed since the render (assemble ran after it), the two differ by design.</p>
    </Card>
  );
}

function StudioCard({ p }: { p: Project }) {
  const qc = useQueryClient();
  const [jobId, setJobId] = useState<number | null>(p.lastJobs.preview?.id ?? null);
  const stream = useJobStream(jobId, p.slug);
  const run = useMutation({ mutationFn: () => api.run(p.slug, "preview"), onSuccess: (j) => { setJobId(j.id); qc.invalidateQueries({ queryKey: ["jobs"] }); } });
  // HyperFrames Studio listens on 127.0.0.1 only: it opens from this PC, not from a phone on the LAN
  const url = `http://localhost:${p.previewPort}`;
  const remote = !["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const ok = (stream.end?.status ?? stream.job?.status ?? p.lastJobs.preview?.status) === "ok";
  return (
    <Card title="HyperFrames Studio (frame-accurate)" right={<span>run.sh {p.slug} preview · port {p.previewPort}</span>}>
      <p className="text-[12.5px] text-muted">The real HyperFrames runtime in its own server: scrub frame by frame, select an element and tell Claude what to change
        (<span className="font-mono">npx hyperframes preview --selection --json</span> in hf/). It keeps running in the background after the step ends.</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button kind="primary" disabled={run.isPending || stream.job?.status === "running" || stream.job?.status === "queued"} onClick={() => run.mutate()}>Start Studio</Button>
        <a href={url} target="_blank" rel="noreferrer" className={`text-[13px] ${ok ? "text-accent hover:underline" : "text-muted"}`}>open {url} ↗</a>
        {run.isError && <span className="text-xs text-bad">{(run.error as Error).message}</span>}
      </div>
      <p className="mt-2 text-[11.5px] text-muted">Studio listens on 127.0.0.1:{p.previewPort} (this PC only){remote ? `: from this device use ssh -L ${p.previewPort}:localhost:${p.previewPort} <this-pc>` : ""}.
        Stop it with <span className="font-mono">npx hyperframes preview studio/projects/{p.slug}/hf --stop</span>.</p>
      {jobId && <div className="mt-3"><LogPanel lines={stream.lines} job={stream.job} end={stream.end} height="h-28" /></div>}
    </Card>
  );
}

export function Preview() {
  const { slug = "" } = useParams();
  const q = useQuery({ queryKey: ["project", slug], queryFn: () => api.project(slug) });
  const player = useRef<PlayerApi | null>(null);
  const [now, setNow] = useState({ t: 0, playing: false });
  const last = useRef(0);
  // the MP4 pane only needs the time when paused (and a few times a second while playing)
  const onTime = (t: number, playing: boolean) => { const n = performance.now(); if (!playing || n - last.current > 300) { last.current = n; setNow({ t, playing }); } };
  const p = q.data;
  if (q.error) return <div className="p-6"><Empty>{(q.error as Error).message}</Empty></div>;
  if (!p) return <div className="p-6"><Empty>Loading…</Empty></div>;
  const beatOk = new Map((p.payoffs?.beats ?? []).map((b) => [`${b.scene}/${b.target}`, b.skipped ? null : b.ok]));
  const beats = p.timeline?.beats.map((b) => ({ ...b, ok: beatOk.get(`${b.scene}/${b.target}`) }));
  const hfNewer = p.timeline && p.hfMtime && p.timeline.mtime && Math.abs(p.hfMtime - p.timeline.mtime) > 120000;
  return (
    <Panes header={<ProjectHeader p={p} />} artifactTitle="The render at this time · payoffs"
      artifact={<><Mp4AtTime p={p} t={now.t} playing={now.playing} /><PayoffsTable p={p} onSeek={(t) => player.current?.seek(t)} /></>}
      main={<>
        {p.engine === "remotion" && <div className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-xs text-muted">engine remotion: this preview shows the HyperFrames hf/ only (the Remotion Player is not embedded; owner's personal use).</div>}
        <Card title="Live composition preview (no render)" right={<span>hf/index.html{hfNewer ? " · hf/ and layout.json differ in age" : ""}</span>}>
          {!p.exists.hf || !p.timeline
            ? <Empty>No hf/ or build/layout.json yet: run assemble.</Empty>
            : <CompositionPreview slug={p.slug} tl={p.timeline} version={p.hfMtime} beats={beats} apiRef={player} onTime={onTime} />}
        </Card>
        <StudioCard p={p} />
      </>} />
  );
}
