import { useRef, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fileUrl, type Project } from "../api";
import { Panes } from "../components/Shell";
import { ProjectHeader } from "../components/ProjectHeader";
import { ReviewTable, type Prefill } from "../components/ReviewTable";
import { BenchmarkTable, PayoffsTable, QaList, Transcript, WatchPanel } from "../components/artefacts";
import { Player, type PlayerApi } from "../components/Player";
import { Card, Empty, ErrorLine, Gate, Skeleton } from "../components/ui";

function Ticks({ p }: { p: Project }) {
  const qc = useQueryClient();
  const [out, setOut] = useState<string | null>(null);
  const m = useMutation({
    mutationFn: (v: { which: "watched" | "listened"; checked: boolean }) => api.review(p.slug, { op: "tick", ...v, viewportWidth: window.innerWidth }),
    onSuccess: (d) => { qc.setQueryData(["project", p.slug], d.project); qc.invalidateQueries({ queryKey: ["projects"] }); setOut(d.check.output.split("\n")[0]); },
  });
  const rv = p.review;
  if (!rv) return null;
  const box = "shrink-0";
  return (
    <Card title={<span title="ticks in review.md">Sign-off</span>}>
      <div className="space-y-3 text-sm">
        <label className={`flex min-h-11 items-start gap-3 ${rv.watched ? "cursor-pointer" : "cursor-not-allowed opacity-55"}`}>
          <input type="checkbox" className={`${box} mt-0.5`} disabled={!rv.watched || m.isPending} checked={!!rv.watched?.checked}
            onChange={(e) => m.mutate({ which: "watched", checked: e.target.checked })} />
          <span title="every sheet, review.png, transitions.png, payoffs.png, the transcript, the levels"><span className="font-extrabold">Watched end to end</span><span className="block text-xs text-muted">
            sheets, images, transcript{rv.watched?.date ? `; ticked ${rv.watched.date}` : ""}</span></span>
        </label>
        <label className={`flex min-h-11 items-start gap-3 ${rv.listened ? "cursor-pointer" : "cursor-not-allowed opacity-55"}`}>
          <input type="checkbox" className={`${box} mt-0.5`} disabled={!rv.listened || m.isPending} checked={!!rv.listened?.checked}
            onChange={(e) => m.mutate({ which: "listened", checked: e.target.checked })} />
          <span><span className="font-extrabold">Listened on a phone with sound</span><span className="block text-xs text-muted">
            your listen{rv.listened?.date ? `; ticked ${rv.listened.date}` : ""}</span></span>
        </label>
        {m.isError && <div role="alert" className="text-xs text-bad">{(m.error as Error).message}</div>}
        {out && <div role="status" className="out">{out}</div>}
      </div>
    </Card>
  );
}

function Sheets({ p }: { p: Project }) {
  const [zoom, setZoom] = useState<string | null>(null);
  if (!p.sheets.length) return <Card title="Watch sheets"><Empty>No out/watch/ sheets yet: run watch after the render.</Empty></Card>;
  return (
    <Card pad={false} title={<>{p.sheets.length} watch sheets <span className="font-medium text-muted">at 2 fps</span></>} right={<span title="12 s per sheet">click to enlarge</span>}>
      <div className="scroll-thin flex snap-x gap-3 overflow-x-auto pb-3 pt-1" tabIndex={0} aria-label="watch sheets">
        {p.sheets.map((s, i) => (
          <figure key={s} className="shrink-0 snap-start">
            <button onClick={() => setZoom(s)} aria-label={`enlarge ${s}`} className="block overflow-hidden border-2 border-ink hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <img loading="lazy" alt={s} src={fileUrl(p.slug, `watch/${s}`)} className="h-56 w-auto" />
            </button>
            <figcaption className="mt-1 text-xs text-muted"><span className="text-ink">{s.replace(".png", "")}</span>, {i * 12} to {(i + 1) * 12} s</figcaption>
          </figure>))}
      </div>
      {zoom && (
        <div role="dialog" aria-label={zoom} className="fixed inset-0 z-50 grid place-items-center bg-scrim p-4" onClick={() => setZoom(null)}>
          <img alt={zoom} src={fileUrl(p.slug, `watch/${zoom}`)} className="max-h-full max-w-full border-2 border-ink" />
        </div>)}
    </Card>
  );
}

export function Review() {
  const { slug = "" } = useParams();
  const q = useQuery({ queryKey: ["project", slug], queryFn: () => api.project(slug) });
  const player = useRef<PlayerApi | null>(null);
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const p = q.data;
  if (q.error) return <div className="p-6"><ErrorLine error={q.error} what={`Could not load the project ${slug}.`} todo="Check the slug in studio/projects/, or reload." /></div>;
  if (!p) return <div className="max-w-3xl space-y-6 p-6"><Empty>Loading…</Empty><Skeleton rows={6} label="Loading the review" /></div>;
  const seek = (t: number) => player.current?.seek(t);
  // payoffs' verdict per beat colours the ticks on the scrub bar (only when payoffs is for this composition)
  const beatOk = new Map((p.payoffs?.beats ?? []).map((b) => [`${b.scene}/${b.target}`, b.skipped ? null : b.ok]));
  const beats = p.timeline?.beats.map((b) => ({ ...b, ok: beatOk.get(`${b.scene}/${b.target}`) }));
  return (
    <Panes header={<ProjectHeader p={p} />} artifactTitle={<span title="qa, watch, payoffs, benchmark">Gates</span>}
      artifact={<><QaList p={p} /><WatchPanel p={p} onSeek={p.exists.mp4 ? seek : undefined} /><PayoffsTable p={p} onSeek={p.exists.mp4 ? seek : undefined} /><BenchmarkTable p={p} /></>}
      main={<>
        <div className="@container"><div className="grid items-start gap-6 @lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <Card title={<span title={`out/${p.slug}.mp4${p.timeline ? ` · ${p.timeline.scenes.length} scenes, ${p.timeline.beats.length} beats` : ""}`}>Video</span>} right={p.status.qa?.fresh === false ? <Gate state="warn">qa is for an older MP4</Gate> : undefined}>
            {p.exists.mp4
              ? <Player src={fileUrl(p.slug, `${p.slug}.mp4`)} tl={p.timeline} beats={beats} apiRef={player} label={`${p.slug}.mp4`}
                  onAddFinding={p.review ? ({ t, scene }) => setPrefill({ time: `${t.toFixed(1)}s`, scene: scene ?? "", id: `seen:${scene ?? "t"}@${t.toFixed(1)}`, nonce: Date.now() }) : undefined} />
              : <Empty>No render yet: run render from Build once payoffs passes.</Empty>}
          </Card>
          <div className="space-y-6">
            <Ticks p={p} />
            <Transcript p={p} />
          </div>
        </div></div>
        <Sheets p={p} />
        <ReviewTable p={p} onSeek={p.exists.mp4 ? seek : undefined} prefill={prefill} />
      </>} />
  );
}
