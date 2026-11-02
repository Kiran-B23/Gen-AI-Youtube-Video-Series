// Library: every reel in shorts/ matched to its studio project, with its qa and benchmark numbers side by side.
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ago, api, fileUrl, shortsUrl, type LibraryItem } from "../api";
import { Card, Empty, ErrorLine, Gate, Icon, Skeleton } from "../components/ui";

const COLS: { key: string; label: string; unit?: string; d?: number }[] = [
  { key: "duration_s", label: "length", unit: "s", d: 0 }, { key: "pace_wps", label: "pace", unit: "w/s", d: 2 }, { key: "still_pct", label: "still", unit: "%", d: 0 },
  { key: "longest_still_s", label: "longest still", unit: "s", d: 1 }, { key: "cuts_per_min", label: "cuts/min", d: 1 }, { key: "pauses_over_0_9s", label: "pauses>0.9s", d: 0 },
  { key: "loudness_lufs", label: "LUFS", d: 1 },
];
const f = (v: number | null | undefined, d = 1) => (v == null ? "n/a" : Number(v).toFixed(d));

export function Library() {
  const q = useQuery({ queryKey: ["library"], queryFn: api.library });
  const [play, setPlay] = useState<LibraryItem | null>(null);
  const ref = q.data?.find((x) => x.benchmark)?.benchmark;
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
        <h1 className="max-w-none text-xl font-extrabold">Library</h1>
      </div>
      <div className="space-y-8 px-4 py-6 sm:px-6">
        {q.isLoading && <Skeleton rows={6} label="Loading the library" />}
        {q.error && <ErrorLine error={q.error} what="Could not load the library." todo="Reload; the server reads shorts/ and studio/projects/." />}
        {q.data?.length === 0 && <Empty>Nothing delivered yet. A reel lands here when deliver copies it to shorts/.</Empty>}
        {q.data && q.data.length > 0 && (
          <Card pad={false} title={<span title="shorts/*.mp4 matched to studio/projects/<slug>; numbers from out/qa.json and out/benchmark.json; reference reel and IG median from references/benchmark.json">{q.data.length} delivered reels</span>} >
            <div className="scroll-thin overflow-x-auto pb-2">
              <table className="data min-w-[980px]">
                <thead><tr><th></th><th>reel</th><th>delivered</th><th>qa</th><th>review</th>{COLS.map((c) => <th key={c.key} className="num">{c.label}{c.unit ? ` ${c.unit}` : ""}</th>)}</tr></thead>
                <tbody>
                  {ref && <tr className="text-muted"><td></td><td colSpan={4}>reference reel</td>{COLS.map((c) => <td key={c.key} className="num">{f(ref.reference[c.key], c.d)}</td>)}</tr>}
                  {ref && <tr className="text-muted"><td></td><td colSpan={4}>Instagram median</td>{COLS.map((c) => <td key={c.key} className="num">{f(ref.ig[c.key], c.d)}</td>)}</tr>}
                  {q.data.map((x) => (
                    <tr key={x.file}>
                      <td><button onClick={() => setPlay(x)} className="relative block h-[54px] w-[30px] overflow-hidden border-2 border-ink bg-paper-2 hover:border-accent" title="play" aria-label={`play ${x.file}`}>
                        {x.hasSheets && <img loading="lazy" alt="" src={fileUrl(x.slug, "watch/sheet-01.png")} className="h-full w-full object-cover object-left-top" />}</button></td>
                      <td><div className="font-extrabold">{x.project ? <Link className="link no-underline hover:underline" to={`/p/${x.slug}/review`}>{x.file}</Link> : x.file}</div>
                        <div className="flex flex-wrap gap-x-3 text-xs text-muted" title={x.engine}>{x.slug.startsWith("personal-") && <span className="text-ink">personal</span>}{!x.project ? <span>no project</span> : !x.current ? <span>project has a newer render</span> : null}</div></td>
                      <td className="whitespace-nowrap text-muted">{ago(x.deliveredAt)}<div className="text-xs">{(x.size / 1e6).toFixed(1)} MB</div></td>
                      <td>{x.qa ? <Gate state={x.qa.passed === x.qa.total ? (x.qa.forThisFile === false ? "warn" : "pass") : "fail"} title={x.qa.forThisFile === false ? "qa.json describes another render" : x.qa.date ?? ""}><b>{x.qa.passed}/{x.qa.total}</b>{x.qa.forThisFile === false ? " older file" : ""}</Gate> : <Gate state="pending">none</Gate>}</td>
                      <td>{x.review ? <Gate state={x.review.open ? "fail" : "pass"}><b>{x.review.open}</b> open{x.review.watched ? ", watched" : ""}</Gate> : <Gate state="pending">none</Gate>}</td>
                      {COLS.map((c) => <td key={c.key} className="num">{f(x.benchmark?.metrics[c.key], c.d)}</td>)}
                    </tr>))}
                </tbody>
              </table>
            </div>
          </Card>)}
        {play && (
          <div role="dialog" aria-label={play.file} className="fixed inset-0 z-50 grid place-items-center bg-scrim p-4" onClick={() => setPlay(null)}>
            <div className="flex max-h-full flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setPlay(null)} className="btn btn--sm bg-paper" aria-label="close the player"><Icon name="close" />Close</button>
              {/* the owner presses play: no autoplay with sound */}
              <video src={shortsUrl(play.file)} controls playsInline preload="metadata" className="max-h-[85dvh] max-w-full border-2 border-ink bg-plate" />
            </div>
          </div>)}
      </div>
    </div>
  );
}
