// Read-only views of the pipeline's JSON artefacts (pace table, payoffs beats, qa, watch, benchmark, scenes).
import { useState } from "react";
import type { Project } from "../api";
import { Card, Chip, Empty, Gate, Icon, Mark } from "./ui";

const fmt = (n: number | null | undefined, d = 2) => (n === null || n === undefined ? "n/a" : Number(n).toFixed(d));
/** a panel's title with its source file in the tooltip */
const Src = ({ title, file }: { title: string; file: string }) => <span title={file}>{title}</span>;
/** the one line under a gate panel: how many passed, and the toggle that shows the passing checks too */
function PassedLine({ passed, total, noun = "passed", all, onAll }: { passed: number; total: number; noun?: string; all: boolean; onAll: (v: boolean) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5"><Mark ok={passed === total} /><b className="font-extrabold text-ink">{passed}/{total}</b> {noun}</span>
      <button className="link" aria-expanded={all} onClick={() => onAll(!all)}>{all ? "Show failures only" : "Show all checks"}</button>
    </div>);
}

export function PaceTable({ p }: { p: Project }) {
  const pace = p.pace;
  if (!pace) return <Card title="Pace"><Empty>No build/timings.json yet: run the voice step.</Empty></Card>;
  const L = pace.limits;
  return (
    <Card pad={false} title={<span title={`build/timings.json · words ÷ (last word end − first word start). Warn > ${L.sceneWarn}, fail > ${L.sceneMax} (lines under ${L.minWordsGate} words only warn); delivery max ${L.deliveryMax}.`}>Pace</span>} right={<>
      <Chip tone={pace.deliveryFail ? "bad" : pace.delivery > L.target + 0.15 ? "warn" : "ok"} title={`delivery max ${L.deliveryMax}, house ${L.target}`}>delivery {fmt(pace.delivery)} w/s</Chip>
      <span>about <b className="font-extrabold text-ink">{pace.totalSeconds}</b> s</span></>}>
      {pace.accept && <div className="pt-3 text-xs text-muted">Pace accepted at {pace.accept.accept}: {pace.accept.why || "(no reason given)"}.</div>}
      <div className="scroll-thin max-h-[460px] overflow-auto pb-2">
        <table className="data">
          <thead><tr><th>scene</th><th className="num">words</th><th className="num">w/s</th><th className="num">guessed</th><th>flags</th><th>line</th></tr></thead>
          <tbody>{pace.rows.map((r) => {
            const fail = r.flags.some((f) => f.kind === "fail"); const warn = r.flags.length > 0;
            return (
              <tr key={r.scene} data-row={fail ? "bad" : undefined}>
                <td className="">{r.scene}</td>
                <td className="num">{r.words}</td>
                <td className={`num font-extrabold ${r.wps > L.sceneMax ? "text-bad" : r.wps > L.sceneWarn ? "text-warn" : ""}`}>{fmt(r.wps)}</td>
                <td className={`num ${r.guessedPct > 25 ? "text-bad" : r.guessedPct > 10 ? "text-warn" : "text-muted"}`}>{r.guessedPct}%</td>
                <td><div className="flex flex-wrap gap-1">{r.flags.map((f, i) => <Gate key={i} state={f.kind === "fail" ? "fail" : "warn"}>{f.what}</Gate>)}{!warn && <Mark ok />}</div></td>
                <td className="max-w-[16rem] truncate text-muted" title={r.text}>{r.text}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>
    </Card>
  );
}

export function VoicePaceLog({ p }: { p: Project }) {
  const rows = p.voicePaceAll.slice(-8).reverse();
  if (!rows.length) return null;
  return (
    <Card pad={false} title={<Src title="Raw pace per take" file="studio/voice-pace.json" />}>
      <div className="pb-2"><table className="data">
        <thead><tr><th>date</th><th>project</th><th>voice</th><th className="num">raw w/s</th><th className="num">words</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className={r.slug === p.slug ? "font-medium" : "text-muted"}><td>{r.date}</td><td className="">{r.slug}</td><td>{r.voice}</td><td className="num">{fmt(r.raw_pace)}</td><td className="num">{r.words}</td></tr>)}</tbody>
      </table></div>
    </Card>
  );
}

export function PayoffsTable({ p, onSeek }: { p: Project; onSeek?: (t: number) => void }) {
  const po = p.payoffs;
  const [all, setAll] = useState(false);
  if (!po) return <Card title="Payoffs"><Empty>No out/payoffs.json yet: run assemble, then payoffs.</Empty></Card>;
  const beats = [...po.beats].sort((a, b) => Number(a.ok || !!a.skipped) - Number(b.ok || !!b.skipped) || a.at - b.at);
  const failed = beats.filter((b) => !b.ok && !b.skipped);
  const checked = beats.filter((b) => !b.skipped);
  const shown = all ? beats : failed;
  const s = po.summary ?? {};
  const bad = [["caption overflow", s.caption_overflow], ["still scenes", s.still_scenes]].filter(([, n]) => n) as [string, number][];
  return (
    <Card pad={false} title={<Src title="Payoffs" file="out/payoffs.json" />} right={<>
      {p.status.payoffs?.fresh === false && <Chip tone="warn" title="hf/index.html changed since this payoffs run: re-run payoffs">stale vs hf/</Chip>}</>}>
      <PassedLine passed={checked.length - failed.length} total={checked.length} noun={`beats on their word${beats.length > checked.length ? `, ${beats.length - checked.length} skipped` : ""}`} all={all} onAll={setAll} />
      {(all || bad.length > 0) && <div className="flex flex-wrap gap-1.5 pb-2">
        {(all ? [["caption overflow", s.caption_overflow ?? 0], ["still scenes", s.still_scenes ?? 0]] as [string, number][] : bad).map(([k, n]) => <Chip key={k} tone={n ? "bad" : "muted"}>{k} {n}</Chip>)}
        {all && <><Chip>camera moves {s.camera_moves ?? 0}</Chip><Chip>skipped {s.skipped ?? 0}</Chip></>}
      </div>}
      {po.warnings?.length > 0 && <ul className="mb-2 space-y-1 text-xs text-warn">{po.warnings.map((w, i) => <li key={i} className="flex gap-1.5"><Icon name="warn" size={14} label="warning" />{w}</li>)}</ul>}
      {shown.length > 0 && <div className="scroll-thin max-h-[460px] overflow-auto pb-2">
        <table className="data">
          <thead><tr><th></th><th>beat</th><th>word</th><th className="num">at</th><th>reason</th></tr></thead>
          <tbody>{shown.map((b, i) => (
            <tr key={i} data-row={!b.ok && !b.skipped ? "bad" : undefined}>
              <td>{b.skipped ? <span className="text-muted">skip</span> : <Mark ok={b.ok} />}</td>
              <td className="whitespace-nowrap">{b.scene}/{b.target}</td>
              <td>“{b.word}”</td>
              <td className="num">{onSeek ? <button className="link" title="seek the player here" onClick={() => onSeek(b.at)}>{fmt(b.at, 1)}s</button> : `${fmt(b.at, 1)}s`}</td>
              <td className="text-muted">{b.reason || (b.mode ? `on screen (${b.mode})` : "")}</td>
            </tr>))}</tbody>
        </table>
      </div>}
    </Card>
  );
}

export function QaList({ p }: { p: Project }) {
  const qa = p.qa;
  const [all, setAll] = useState(false);
  if (!qa) return <Card title="QA"><Empty>No out/qa.json yet: render, then qa.</Empty></Card>;
  const passed = qa.checks.filter((c) => c.ok).length;
  const shown = [...qa.checks].sort((a, b) => Number(a.ok) - Number(b.ok)).filter((c) => all || !c.ok);
  return (
    <Card pad={false} title={<Src title="QA" file="out/qa.json" />} right={<>
      {p.status.qa?.fresh === false && <Chip tone="warn" title="the MP4 changed since this qa run: re-run qa">stale vs MP4</Chip>}<span>{qa.date}</span></>}>
      <PassedLine passed={passed} total={qa.checks.length} all={all} onAll={setAll} />
      <ul className="divide-y divide-rule">
        {shown.map((c) => (
          <li key={c.name} className="flex gap-2.5 py-2 text-sm"><Mark ok={c.ok} /><div><div className="font-medium">{c.name}</div><div className="text-muted">{c.detail}</div></div></li>
        ))}
      </ul>
      {qa.warnings?.length > 0 && (
        <div className="border-t border-rule py-3">
          <h3 className="mb-1.5 max-w-none text-sm font-extrabold">Warnings <span className="font-medium text-muted">{qa.warnings.length}</span></h3>
          <ul className="space-y-1 text-sm text-warn">{qa.warnings.map((w, i) => <li key={i} className="flex gap-1.5"><Icon name="warn" size={14} label="warning" /><span><span className="font-extrabold">{w.name}</span>: {w.detail}</span></li>)}</ul>
        </div>
      )}
    </Card>
  );
}

export function WatchPanel({ p, onSeek }: { p: Project; onSeek?: (t: number) => void }) {
  const w = p.watch;
  const [all, setAll] = useState(false);
  if (!w) return <Card title="Watch"><Empty>No out/watch.json yet: run watch after the render.</Empty></Card>;
  return (
    <Card pad={false} title={<Src title="Watch" file="out/watch.json" />} right={<span>{w.date}</span>}>
      <PassedLine passed={w.gates.filter((g) => g.ok).length} total={w.gates.length} all={all} onAll={setAll} />
      <ul className="divide-y divide-rule">
        {w.gates.filter((g) => all || !g.ok).map((g) => <li key={g.name} className="flex gap-2.5 py-2 text-sm"><Mark ok={g.ok} /><div><div className="font-medium">{g.name}</div><div className="text-muted">{g.detail}</div></div></li>)}
      </ul>
      {all && <div className="flex flex-wrap gap-1.5 border-t border-rule py-3">
        <Chip>heard pace {fmt(w.pace_delivery)} w/s</Chip>
        {w.levels && <Chip title="speech vs between-word level">bed {fmt(w.levels.under, 1)} dB under</Chip>}
        <Chip>{w.pauses.length} pauses &gt; 0.9 s</Chip>
      </div>}
      <div className="border-t border-rule py-3">
        <h3 className="mb-1.5 max-w-none text-sm font-extrabold">Unclear words <span className="font-medium text-muted">{w.unclear.length}</span></h3>
        {w.unclear.length === 0 ? <Empty>none</Empty> : (
          <div className="flex flex-wrap gap-1.5">{w.unclear.map((u, i) => {
            const chip = <Chip tone={u.p < 0.2 ? "bad" : "warn"} title={`p=${u.p}${onSeek ? "; click to seek the player" : ""}`}>{u.scene}, {fmt(u.t, 1)}s, “{u.word}”</Chip>;
            return onSeek ? <button key={i} onClick={() => onSeek(Math.max(0, u.t - 0.5))} className="hover:opacity-80">{chip}</button> : <span key={i}>{chip}</span>;
          })}</div>
        )}
      </div>
    </Card>
  );
}

export function Transcript({ p }: { p: Project }) {
  const w = p.watch;
  if (!w?.transcript) return null;
  const unclear = new Set(w.unclear.map((u) => u.word.toLowerCase()));
  return (
    <Card title={<span title="what Whisper heard">Transcript</span>} right={<span className="inline-flex items-center gap-1.5"><mark className="bg-accent-2 px-0.5 text-plate">word</mark>unclear words marked</span>}>
      <p className="scroll-thin max-h-[300px] max-w-[60ch] overflow-y-auto pr-1 text-sm leading-6">{w.transcript.split(/(\s+)/).map((t, i) =>
        unclear.has(t.toLowerCase()) ? <mark key={i} className="bg-accent-2 px-0.5 text-plate">{t}</mark> : <span key={i}>{t}</span>)}</p>
    </Card>
  );
}

const METRICS: { key: string; label: string; unit?: string; better?: "low" | "high" | "near" }[] = [
  { key: "duration_s", label: "duration", unit: "s" }, { key: "pace_wps", label: "pace", unit: "w/s", better: "near" },
  { key: "still_pct", label: "still", unit: "%", better: "low" }, { key: "longest_still_s", label: "longest still", unit: "s", better: "low" },
  { key: "cuts_per_min", label: "cuts / min", better: "low" }, { key: "pauses_over_0_9s", label: "pauses > 0.9 s" },
  { key: "scene_median_s", label: "scene median", unit: "s" }, { key: "caption_words_per_card", label: "words / caption card" },
  { key: "loudness_lufs", label: "loudness", unit: "LUFS" }, { key: "true_peak_dbtp", label: "true peak", unit: "dBTP" }, { key: "words", label: "words" },
];
export function BenchmarkTable({ p }: { p: Project }) {
  const b = p.benchmark;
  const [all, setAll] = useState(false);
  if (!b) return <Card title="Benchmark"><Empty>No out/benchmark.json yet: run the benchmark step after the render.</Empty></Card>;
  const delta = (a: number | null | undefined, r: number | null | undefined) => (a == null || r == null ? null : a - r);
  const dcls = (d: number | null) => (d === null ? "text-muted" : "");
  return (
    <Card pad={false} title={<Src title="Benchmark" file="vs references/benchmark.json" />} right={<span>{b.date}</span>}>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><Mark ok warn={!!b.warnings?.length} /><b className="font-extrabold text-ink">{b.warnings?.length ?? 0}</b> warning{b.warnings?.length === 1 ? "" : "s"} across {METRICS.length} metrics</span>
        <button className="link" aria-expanded={all} onClick={() => setAll(!all)}>{all ? "Hide the metrics" : "Show all metrics"}</button>
      </div>
      {b.warnings?.length > 0 && <ul className="space-y-1 pb-3 text-sm text-warn">{b.warnings.map((w, i) => <li key={i} className="flex gap-1.5"><Icon name="warn" size={14} label="warning" />{w}</li>)}</ul>}
      {all && <div className="scroll-thin overflow-x-auto border-t border-rule pb-2">
        <table className="data">
          <thead><tr><th>metric</th><th className="num">this</th><th className="num">reference</th><th className="num">Δ</th><th className="num">IG median</th><th className="num">Δ</th></tr></thead>
          <tbody>{METRICS.map((m) => {
            const v = b.metrics[m.key], r = b.benchmark[m.key], ig = b.ig_median[m.key];
            const d1 = delta(v, r), d2 = delta(v, ig);
            return (
              <tr key={m.key}>
                <td>{m.label}{m.unit && <span className="text-muted"> {m.unit}</span>}</td>
                <td className="num font-extrabold">{fmt(v as number, 1)}</td>
                <td className="num text-muted">{fmt(r as number, 1)}</td>
                <td className={`num ${dcls(d1)}`}>{d1 === null ? "n/a" : `${d1 > 0 ? "+" : ""}${d1.toFixed(1)}`}</td>
                <td className="num text-muted">{fmt(ig as number, 1)}</td>
                <td className={`num ${dcls(d2)}`}>{d2 === null ? "n/a" : `${d2 > 0 ? "+" : ""}${d2.toFixed(1)}`}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>}
    </Card>
  );
}

export function ScenesTable({ p }: { p: Project }) {
  return (
    <Card pad={false} title={<>{p.scenes.length} scenes <span className="font-medium text-muted">in scenes.json</span></>} >
      <div className="scroll-thin max-h-[520px] overflow-auto pb-2">
        <table className="data">
          <thead><tr><th>id</th><th>type</th><th className="num">words</th><th>beats</th><th>say</th></tr></thead>
          <tbody>{p.scenes.map((s) => (
            <tr key={s.id}><td className="">{s.id}</td><td className="text-muted">{s.type}</td><td className="num">{s.words}</td>
              <td className="min-w-[9rem] text-muted">{s.beats.map((b) => b.target).join(", ") || "none"}</td><td title={s.say} className="w-full max-w-0"><div className="truncate">{s.say}</div></td></tr>))}</tbody>
        </table>
      </div>
    </Card>
  );
}
