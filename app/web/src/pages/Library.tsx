// Library: every reel in shorts/ matched to its studio project, with its qa and benchmark numbers side by side.
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ago, api, fileUrl, shortsUrl, type LibraryItem } from "../api";
import { Card, Chip, Empty } from "../components/ui";

const COLS: { key: string; label: string; unit?: string; d?: number }[] = [
  { key: "duration_s", label: "length", unit: "s", d: 0 }, { key: "pace_wps", label: "pace", unit: "w/s", d: 2 }, { key: "still_pct", label: "still", unit: "%", d: 0 },
  { key: "longest_still_s", label: "longest still", unit: "s", d: 1 }, { key: "cuts_per_min", label: "cuts/min", d: 1 }, { key: "pauses_over_0_9s", label: "pauses>0.9s", d: 0 },
  { key: "loudness_lufs", label: "LUFS", d: 1 },
];
const f = (v: number | null | undefined, d = 1) => (v == null ? "–" : Number(v).toFixed(d));

export function Library() {
  const q = useQuery({ queryKey: ["library"], queryFn: api.library });
  const [play, setPlay] = useState<LibraryItem | null>(null);
  const ref = q.data?.find((x) => x.benchmark)?.benchmark;
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bg/90 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold">Library</h1>
        <p className="text-xs text-muted">shorts/*.mp4 (what deliver copied), matched to studio/projects/&lt;slug&gt;. Numbers from that project's out/qa.json and out/benchmark.json; “for an older file” when those describe a different render.</p>
      </div>
      <div className="space-y-5 p-6">
        {q.isLoading && <Empty>Loading…</Empty>}
        {q.data?.length === 0 && <Empty>Nothing delivered yet.</Empty>}
        {q.data && q.data.length > 0 && (
          <Card pad={false} title={`${q.data.length} delivered reels`} right={ref && <span>reference reel and IG median from references/benchmark.json</span>}>
            <div className="scroll-thin overflow-x-auto px-2 pb-2">
              <table className="data min-w-[980px]">
                <thead><tr><th></th><th>reel</th><th>delivered</th><th>qa</th><th>review</th>{COLS.map((c) => <th key={c.key} className="num">{c.label}{c.unit ? ` ${c.unit}` : ""}</th>)}</tr></thead>
                <tbody>
                  {ref && <tr className="text-muted"><td></td><td colSpan={4} className="italic">reference reel</td>{COLS.map((c) => <td key={c.key} className="num">{f(ref.reference[c.key], c.d)}</td>)}</tr>}
                  {ref && <tr className="text-muted"><td></td><td colSpan={4} className="italic">Instagram median</td>{COLS.map((c) => <td key={c.key} className="num">{f(ref.ig[c.key], c.d)}</td>)}</tr>}
                  {q.data.map((x) => (
                    <tr key={x.file}>
                      <td><button onClick={() => setPlay(x)} className="block h-[54px] w-[30px] overflow-hidden rounded border border-line bg-panel-2 hover:border-accent" title="play">
                        {x.hasSheets && <img loading="lazy" alt="" src={fileUrl(x.slug, "watch/sheet-01.png")} className="h-full w-full object-cover object-left-top" />}</button></td>
                      <td><div className="font-medium">{x.project ? <Link className="hover:underline" to={`/p/${x.slug}/review`}>{x.file}</Link> : x.file}</div>
                        <div className="text-[11px] text-muted">{x.engine}{x.slug.startsWith("personal-") ? " · personal" : ""}{!x.project ? " · no project" : x.current ? " · = current render" : " · project has a newer render"}</div></td>
                      <td className="whitespace-nowrap text-muted">{ago(x.deliveredAt)}<div className="text-[11px]">{(x.size / 1e6).toFixed(1)} MB</div></td>
                      <td>{x.qa ? <Chip tone={x.qa.passed === x.qa.total ? "ok" : "bad"} title={x.qa.forThisFile === false ? "qa.json describes another render" : x.qa.date ?? ""}>{x.qa.passed}/{x.qa.total}{x.qa.forThisFile === false ? " · older file" : ""}</Chip> : <span className="text-muted">–</span>}</td>
                      <td>{x.review ? <Chip tone={x.review.open ? "bad" : "ok"}>{x.review.open} open{x.review.watched ? " · watched" : ""}</Chip> : <span className="text-muted">–</span>}</td>
                      {COLS.map((c) => <td key={c.key} className="num">{f(x.benchmark?.metrics[c.key], c.d)}</td>)}
                    </tr>))}
                </tbody>
              </table>
            </div>
          </Card>)}
        {play && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setPlay(null)}>
            <video src={shortsUrl(play.file)} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
          </div>)}
      </div>
    </div>
  );
}
