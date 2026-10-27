import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fileUrl, type Project } from "../api";
import { Panes } from "../components/Shell";
import { ProjectHeader } from "../components/ProjectHeader";
import { ReviewTable, type Prefill } from "../components/ReviewTable";
import { BenchmarkTable, PayoffsTable, QaList, Transcript, WatchPanel } from "../components/artefacts";
import { Player, type PlayerApi } from "../components/Player";
import { Card, Chip, Empty } from "../components/ui";

const PHONE = "(max-width: 520px)";
function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => { const m = window.matchMedia(PHONE); const f = () => setPhone(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return phone;
}

function Ticks({ p }: { p: Project }) {
  const phone = usePhone();
  const qc = useQueryClient();
  const [out, setOut] = useState<string | null>(null);
  const m = useMutation({
    mutationFn: (v: { which: "watched" | "listened"; checked: boolean }) => api.review(p.slug, { op: "tick", ...v, viewportWidth: window.innerWidth }),
    onSuccess: (d) => { qc.setQueryData(["project", p.slug], d.project); qc.invalidateQueries({ queryKey: ["projects"] }); setOut(d.check.output.split("\n")[0]); },
  });
  const rv = p.review;
  if (!rv) return null;
  const box = "h-4 w-4 accent-[var(--accent)]";
  return (
    <Card title="Sign-off (review.md)">
      <div className="space-y-3 text-[13px]">
        <label className={`flex items-start gap-2.5 ${rv.watched ? "" : "opacity-50"}`}>
          <input type="checkbox" className={`${box} mt-0.5`} disabled={!rv.watched || m.isPending} checked={!!rv.watched?.checked}
            onChange={(e) => m.mutate({ which: "watched", checked: e.target.checked })} />
          <span><span className="font-medium">Watched end to end</span><span className="block text-xs text-muted">
            every sheet, review.png, transitions.png, payoffs.png, the transcript, the levels{rv.watched?.date ? ` · ${rv.watched.date}` : ""}</span></span>
        </label>
        <label className={`flex items-start gap-2.5 ${phone && rv.listened ? "" : "opacity-50"}`} title={phone ? "" : "Open this page on a phone to tick it: the listen on a phone speaker is the point"}>
          <input type="checkbox" className={`${box} mt-0.5`} disabled={!phone || !rv.listened || m.isPending} checked={!!rv.listened?.checked}
            onChange={(e) => m.mutate({ which: "listened", checked: e.target.checked })} />
          <span><span className="font-medium">Listened on a phone with sound</span><span className="block text-xs text-muted">
            {phone ? "the user's listen" : "only from a phone-sized screen"}{rv.listened?.date ? ` · ${rv.listened.date}` : ""}</span></span>
        </label>
        {m.isError && <div className="text-xs text-bad">{(m.error as Error).message}</div>}
        {out && <div className="rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] text-muted">{out}</div>}
      </div>
    </Card>
  );
}

function Sheets({ p }: { p: Project }) {
  const [zoom, setZoom] = useState<string | null>(null);
  if (!p.sheets.length) return <Card title="Watch sheets"><Empty>No out/watch/ sheets yet: run watch after the render.</Empty></Card>;
  return (
    <Card pad={false} title={`Watch sheets · 2 fps · ${p.sheets.length}`} right={<span>12 s per sheet · click to enlarge</span>}>
      <div className="scroll-thin flex snap-x gap-3 overflow-x-auto p-4">
        {p.sheets.map((s, i) => (
          <figure key={s} className="shrink-0 snap-start">
            <button onClick={() => setZoom(s)} className="block overflow-hidden rounded-md border border-line hover:border-accent">
              <img loading="lazy" alt={s} src={fileUrl(p.slug, `watch/${s}`)} className="h-56 w-auto" />
            </button>
            <figcaption className="mt-1 text-[11px] text-muted"><span className="font-mono">{s.replace(".png", "")}</span> · {i * 12}–{(i + 1) * 12} s</figcaption>
          </figure>))}
      </div>
      {zoom && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setZoom(null)}>
          <img alt={zoom} src={fileUrl(p.slug, `watch/${zoom}`)} className="max-h-full max-w-full rounded-md" />
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
  if (q.error) return <div className="p-6"><Empty>{(q.error as Error).message}</Empty></div>;
  if (!p) return <div className="p-6"><Empty>Loading…</Empty></div>;
  const seek = (t: number) => player.current?.seek(t);
  // payoffs' verdict per beat colours the ticks on the scrub bar (only when payoffs is for this composition)
  const beatOk = new Map((p.payoffs?.beats ?? []).map((b) => [`${b.scene}/${b.target}`, b.skipped ? null : b.ok]));
  const beats = p.timeline?.beats.map((b) => ({ ...b, ok: beatOk.get(`${b.scene}/${b.target}`) }));
  return (
    <Panes header={<ProjectHeader p={p} />} artifactTitle="Gates · qa · watch · payoffs · benchmark"
      artifact={<><QaList p={p} /><WatchPanel p={p} onSeek={p.exists.mp4 ? seek : undefined} /><PayoffsTable p={p} onSeek={p.exists.mp4 ? seek : undefined} /><BenchmarkTable p={p} /></>}
      main={<>
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <Card title={`out/${p.slug}.mp4`} right={<>{p.status.qa?.fresh === false && <Chip tone="warn">qa is for an older MP4</Chip>}{p.timeline && <span>{p.timeline.scenes.length} scenes · {p.timeline.beats.length} beats</span>}</>}>
            {p.exists.mp4
              ? <Player src={fileUrl(p.slug, `${p.slug}.mp4`)} tl={p.timeline} beats={beats} apiRef={player} label={`${p.slug}.mp4`}
                  onAddFinding={p.review ? ({ t, scene }) => setPrefill({ time: `${t.toFixed(1)}s`, scene: scene ?? "", id: `seen:${scene ?? "t"}@${t.toFixed(1)}`, nonce: Date.now() }) : undefined} />
              : <Empty>No render yet.</Empty>}
          </Card>
          <div className="space-y-4">
            <Ticks p={p} />
            <Transcript p={p} />
          </div>
        </div>
        <Sheets p={p} />
        <ReviewTable p={p} onSeek={p.exists.mp4 ? seek : undefined} prefill={prefill} />
      </>} />
  );
}
