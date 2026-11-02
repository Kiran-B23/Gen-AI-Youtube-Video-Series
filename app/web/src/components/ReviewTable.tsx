// review.md rows as an editable table. Every save is a PATCH that rewrites the one row in review.py's format,
// then the server runs review.py --check and returns what it says.
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Project, type ReviewRow } from "../api";
import { Button, Card, Chip, Empty } from "./ui";

type Kind = "open" | "fixed" | "accepted";
const kindTone = { open: "bad", fixed: "ok", accepted: "accent", other: "muted" } as const;

function useRowEdit(r: ReviewRow, slug: string, onSaved: (out: string) => void) {
  const initKind: Kind = r.kind === "other" ? "open" : r.kind;
  const [kind, setKind] = useState<Kind>(initKind);
  const [reason, setReason] = useState(r.reason);
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: () => api.review(slug, { op: "row", id: r.id, status: kind, reason }),
    onSuccess: (d) => { qc.setQueryData(["project", slug], d.project); qc.invalidateQueries({ queryKey: ["projects"] }); onSaved(d.check.output); },
  });
  const dirty = kind !== initKind || (kind !== "open" && reason.trim() !== r.reason);
  const needsReason = kind !== "open" && !reason.trim();
  const editor = (
    <>
      <div className="flex flex-col gap-1.5">
        <select value={kind} onChange={(e) => setKind(e.target.value as Kind)} aria-label={`status of ${r.id}`}
          className="field field--sm w-32">
          <option value="open">open</option><option value="fixed">fixed</option><option value="accepted">accepted</option>
        </select>
        {kind !== "open"
          ? <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={Math.min(5, Math.max(1, Math.ceil(reason.length / 34)))} placeholder={kind === "fixed" ? "what changed" : "why it is fine"}
              className="field field--sm w-full" aria-label={`reason for ${r.id}`} />
          : r.status !== "open" && r.kind === "open" ? <span className="text-xs text-muted">note kept in the file: “{r.reason}”</span> : null}
      </div>
      {(dirty || m.isError) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button small kind="primary" disabled={needsReason || m.isPending} onClick={() => m.mutate()}>{m.isPending ? "Saving…" : "Save"}</Button>
          <Button small kind="ghost" onClick={() => { setKind(initKind); setReason(r.reason); m.reset(); }}>Reset</Button>
          {needsReason && <span className="text-xs text-muted">a reason is required</span>}
          {m.isError && <span role="alert" className="text-xs text-bad">{(m.error as Error).message}</span>}
        </div>)}
    </>
  );
  return editor;
}

/** "23.2s" / "1:02.5" → seconds (the time column), or null */
export function parseTime(s: string): number | null {
  const m = s.trim().match(/^(?:(\d+):)?(\d+(?:\.\d+)?)\s*s?$/);
  return m ? (m[1] ? Number(m[1]) * 60 : 0) + Number(m[2]) : null;
}
type Seek = ((t: number) => void) | undefined;
function TimeCell({ time, onSeek }: { time: string; onSeek: Seek }) {
  const t = parseTime(time);
  return onSeek && t !== null ? <button className="link" title="seek the player here" onClick={() => onSeek(t)}>{time}</button> : <>{time}</>;
}

function Row({ r, slug, onSaved, onSeek }: { r: ReviewRow; slug: string; onSaved: (out: string) => void; onSeek: Seek }) {
  const editor = useRowEdit(r, slug, onSaved);
  return (
    <tr data-row={r.countsAsOpen ? "bad" : undefined}>
      <td className="break-all text-xs">{r.id}</td>
      <td className="break-words text-muted"><TimeCell time={r.time} onSeek={onSeek} /></td>
      <td className="whitespace-nowrap text-muted">{r.scene}</td>
      <td className="break-words text-sm">{r.finding}</td>
      <td>{editor}</td>
    </tr>
  );
}

/** phone layout: one card per finding */
function RowCard({ r, slug, onSaved, onSeek }: { r: ReviewRow; slug: string; onSaved: (out: string) => void; onSeek: Seek }) {
  const editor = useRowEdit(r, slug, onSaved);
  return (
    <li className={`space-y-2 py-3 ${r.countsAsOpen ? "bg-bad/5 px-2" : ""}`}>
      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted"><span className="break-all text-ink">{r.id}</span>{r.time && <TimeCell time={r.time} onSeek={onSeek} />}{r.scene && <span>{r.scene}</span>}</div>
      <div className="text-sm">{r.finding}</div>
      {editor}
    </li>
  );
}

export interface Prefill { time: string; scene: string; id: string; nonce: number }
function AddRow({ slug, onSaved, prefill }: { slug: string; onSaved: (out: string) => void; prefill?: Prefill | null }) {
  const [f, setF] = useState({ id: "", time: "", scene: "", finding: "" });
  const form = useRef<HTMLFormElement>(null);
  const finding = useRef<HTMLInputElement>(null);
  // "+ Finding at <time>" in the player fills id / time / scene and focuses the finding
  useEffect(() => {
    if (!prefill) return;
    setF((x) => ({ ...x, id: prefill.id, time: prefill.time, scene: prefill.scene }));
    form.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    setTimeout(() => finding.current?.focus(), 250);
  }, [prefill]);
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: () => api.review(slug, { op: "add", ...f }),
    onSuccess: (d) => { qc.setQueryData(["project", slug], d.project); onSaved(d.check.output); setF({ id: "", time: "", scene: "", finding: "" }); },
  });
  const inp = "field field--sm";
  return (
    <form ref={form} className={`flex flex-wrap items-end gap-2 border-t-2 border-ink py-3 ${prefill && f.id === prefill.id ? "bg-accent/5" : ""}`} onSubmit={(e) => { e.preventDefault(); m.mutate(); }}>
      <span className="w-full text-sm font-extrabold">Add a finding</span>
      <input className={`${inp} w-40`} aria-label="finding id" placeholder="sheet:s05@23.2" value={f.id} onChange={(e) => setF({ ...f, id: e.target.value })} />
      <input className={`${inp} w-20`} aria-label="time" placeholder="23.2s" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} />
      <input className={`${inp} w-16`} aria-label="scene" placeholder="s05" value={f.scene} onChange={(e) => setF({ ...f, scene: e.target.value })} />
      <input ref={finding} className={`${inp} min-w-48 flex-1`} aria-label="finding" placeholder="what the sheet / the listen shows" value={f.finding} onChange={(e) => setF({ ...f, finding: e.target.value })} />
      <Button small type="submit" disabled={!f.id.trim() || !f.finding.trim() || m.isPending}>Add (open)</Button>
      {m.isError && <span role="alert" className="text-xs text-bad">{(m.error as Error).message}</span>}
    </form>
  );
}

export function ReviewTable({ p, onSeek, prefill }: { p: Project; onSeek?: (t: number) => void; prefill?: Prefill | null }) {
  const [filter, setFilter] = useState<"all" | Kind>(() => (p.review?.rows.some((r) => r.kind === "open") ? "open" : "all"));
  const [check, setCheck] = useState<string | null>(null);
  const rv = p.review;
  if (!rv) return <Card title={<span title="review.md">Fix list</span>}><Empty>No review.md yet: run the review step.</Empty></Card>;
  const counts = { all: rv.rows.length, open: rv.rows.filter((r) => r.kind === "open").length, fixed: rv.rows.filter((r) => r.kind === "fixed").length, accepted: rv.rows.filter((r) => r.kind === "accepted").length };
  const rows = rv.rows.filter((r) => filter === "all" || r.kind === filter);
  return (
    <Card pad={false} title={<span title="review.md">Fix list</span>} right={<>
      <Chip tone={rv.open ? "bad" : "ok"} title="rows whose status starts with “open” (what review.py and deliver count)">{rv.open} open</Chip>
      <div className="seg" role="group" aria-label="filter rows">
        {(["all", "open", "fixed", "accepted"] as const).map((k) => (
          <button key={k} aria-pressed={filter === k} onClick={() => setFilter(k)}>{k}&nbsp;<b className="font-extrabold">{counts[k]}</b></button>))}
      </div></>}>
      {check && <pre role="status" className="out scroll-thin mb-3 max-h-32 overflow-auto">review.py --check: {check}</pre>}
      <ul className="divide-y divide-rule sm:hidden">{rows.map((r) => <RowCard key={r.id + r.status} r={r} slug={p.slug} onSaved={setCheck} onSeek={onSeek} />)}</ul>
      {rows.length === 0 && <div className="py-4 sm:hidden"><Empty>No {filter} rows.</Empty></div>}
      <div className="scroll-thin hidden max-h-[640px] overflow-auto pb-2 sm:block">
        <table className="data min-w-[680px] table-fixed">
          <colgroup><col className="w-[9rem]" /><col className="w-[5.5rem]" /><col className="w-[4rem]" /><col /><col className="w-[16rem]" /></colgroup>
          <thead><tr><th>id</th><th>time</th><th>scene</th><th>finding</th><th>status</th></tr></thead>
          <tbody>{rows.map((r) => <Row key={r.id + r.status} r={r} slug={p.slug} onSaved={setCheck} onSeek={onSeek} />)}</tbody>
        </table>
        {rows.length === 0 && <div className="py-4"><Empty>No {filter} rows.</Empty></div>}
      </div>
      <AddRow slug={p.slug} onSaved={setCheck} prefill={prefill} />
    </Card>
  );
}
export { kindTone };
