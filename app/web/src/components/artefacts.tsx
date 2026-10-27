// Read-only views of the pipeline's JSON artefacts (pace table, payoffs beats, qa, watch, benchmark, scenes).
import { useState } from "react";
import type { Project } from "../api";
import { Card, Chip, Empty, Mark } from "./ui";

const fmt = (n: number | null | undefined, d = 2) => (n === null || n === undefined ? "–" : Number(n).toFixed(d));

export function PaceTable({ p }: { p: Project }) {
  const pace = p.pace;
  if (!pace) return <Card title="Pace"><Empty>No build/timings.json yet: run the voice step.</Empty></Card>;
  const L = pace.limits;
  return (
    <Card pad={false} title="Pace (from build/timings.json)" right={<>
      <Chip tone={pace.deliveryFail ? "bad" : pace.delivery > L.target + 0.15 ? "warn" : "ok"} title={`delivery max ${L.deliveryMax}, house ${L.target}`}>delivery {fmt(pace.delivery)} w/s</Chip>
      <span>≈ {pace.totalSeconds}s</span></>}>
      <div className="px-4 pt-3 text-xs text-muted">
        words ÷ (last word end − first word start). Warn &gt; {L.sceneWarn}, fail &gt; {L.sceneMax} (lines under {L.minWordsGate} words only warn); delivery max {L.deliveryMax}.
        {pace.accept && <> Pace accepted at {pace.accept.accept}: {pace.accept.why || "(no reason given)"}.</>}
      </div>
      <div className="scroll-thin max-h-[460px] overflow-auto px-2 pb-2">
        <table className="data">
          <thead><tr><th>scene</th><th className="num">words</th><th className="num">w/s</th><th className="num">guessed</th><th>flags</th><th>line</th></tr></thead>
          <tbody>{pace.rows.map((r) => {
            const fail = r.flags.some((f) => f.kind === "fail"); const warn = r.flags.length > 0;
            return (
              <tr key={r.scene} className={fail ? "bg-bad/5" : ""}>
                <td className="font-mono">{r.scene}</td>
                <td className="num">{r.words}</td>
                <td className={`num font-semibold ${r.wps > L.sceneMax ? "text-bad" : r.wps > L.sceneWarn ? "text-warn" : ""}`}>{fmt(r.wps)}</td>
                <td className={`num ${r.guessedPct > 25 ? "text-bad" : r.guessedPct > 10 ? "text-warn" : "text-muted"}`}>{r.guessedPct}%</td>
                <td><div className="flex flex-wrap gap-1">{r.flags.map((f, i) => <Chip key={i} tone={f.kind === "fail" ? "bad" : "warn"}>{f.kind === "fail" ? "✗" : "⚠"} {f.what}</Chip>)}{!warn && <span className="text-ok">✓</span>}</div></td>
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
    <Card pad={false} title="Raw pace per take (studio/voice-pace.json)">
      <div className="px-2 pb-2"><table className="data">
        <thead><tr><th>date</th><th>project</th><th>voice</th><th className="num">raw w/s</th><th className="num">words</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className={r.slug === p.slug ? "font-medium" : "text-muted"}><td>{r.date}</td><td className="font-mono">{r.slug}</td><td>{r.voice}</td><td className="num">{fmt(r.raw_pace)}</td><td className="num">{r.words}</td></tr>)}</tbody>
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
  const shown = all ? beats : failed.length ? failed.concat(beats.filter((b) => b.ok || b.skipped).slice(0, 8)) : beats.slice(0, 12);
  const s = po.summary ?? {};
  return (
    <Card pad={false} title="Payoffs (out/payoffs.json)" right={<>
      <Chip tone={failed.length ? "bad" : "ok"}>{s.passed}/{s.checked} beats</Chip>
      {p.status.payoffs?.fresh === false ? <Chip tone="warn" title="hf/index.html changed since this payoffs run: re-run payoffs">stale vs hf/</Chip>
        : p.status.payoffs?.fresh ? <Chip tone="ok">fresh</Chip> : null}</>}>
      <div className="flex flex-wrap gap-1.5 px-4 pt-3">
        <Chip tone={s.caption_overflow ? "bad" : "muted"}>caption overflow {s.caption_overflow ?? 0}</Chip>
        <Chip tone={s.still_scenes ? "bad" : "muted"}>still scenes {s.still_scenes ?? 0}</Chip>
        <Chip>camera moves {s.camera_moves ?? 0}</Chip>
        <Chip>skipped {s.skipped ?? 0}</Chip>
      </div>
      {po.warnings?.length > 0 && <ul className="mx-4 mt-3 space-y-1 text-xs text-warn">{po.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}</ul>}
      <div className="scroll-thin mt-2 max-h-[460px] overflow-auto px-2 pb-2">
        <table className="data">
          <thead><tr><th></th><th>beat</th><th>word</th><th className="num">at</th><th>reason</th></tr></thead>
          <tbody>{shown.map((b, i) => (
            <tr key={i} className={!b.ok && !b.skipped ? "bg-bad/5" : ""}>
              <td>{b.skipped ? <span className="text-muted">skip</span> : <Mark ok={b.ok} />}</td>
              <td className="font-mono whitespace-nowrap">{b.scene}/{b.target}</td>
              <td>“{b.word}”</td>
              <td className="num">{onSeek ? <button className="text-accent hover:underline" title="seek the player here" onClick={() => onSeek(b.at)}>{fmt(b.at, 1)}s</button> : `${fmt(b.at, 1)}s`}</td>
              <td className="text-muted">{b.reason || (b.mode ? `on screen (${b.mode})` : "")}</td>
            </tr>))}</tbody>
        </table>
        {beats.length > shown.length && <button className="mx-2 my-2 text-xs text-accent hover:underline" onClick={() => setAll(true)}>show all {beats.length} beats</button>}
      </div>
    </Card>
  );
}

export function QaList({ p }: { p: Project }) {
  const qa = p.qa;
  if (!qa) return <Card title="QA"><Empty>No out/qa.json yet: render, then qa.</Empty></Card>;
  const passed = qa.checks.filter((c) => c.ok).length;
  return (
    <Card pad={false} title="QA (out/qa.json)" right={<><Chip tone={passed === qa.checks.length ? "ok" : "bad"}>{passed}/{qa.checks.length}</Chip>
      {p.status.qa?.fresh === false && <Chip tone="warn" title="the MP4 changed since this qa run: re-run qa">stale vs MP4</Chip>}<span>{qa.date}</span></>}>
      <ul className="divide-y divide-line">
        {[...qa.checks].sort((a, b) => Number(a.ok) - Number(b.ok)).map((c) => (
          <li key={c.name} className="flex gap-2.5 px-4 py-2 text-[12.5px]"><Mark ok={c.ok} /><div><div className="font-medium">{c.name}</div><div className="text-muted">{c.detail}</div></div></li>
        ))}
      </ul>
      {qa.warnings?.length > 0 && (
        <div className="border-t border-line px-4 py-3">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">warnings ({qa.warnings.length})</div>
          <ul className="space-y-1 text-[12.5px] text-warn">{qa.warnings.map((w, i) => <li key={i}>⚠ <span className="font-medium">{w.name}</span>: {w.detail}</li>)}</ul>
        </div>
      )}
    </Card>
  );
}

export function WatchPanel({ p, onSeek }: { p: Project; onSeek?: (t: number) => void }) {
  const w = p.watch;
  if (!w) return <Card title="Watch"><Empty>No out/watch.json yet: run watch after the render.</Empty></Card>;
  return (
    <Card pad={false} title="Watch (out/watch.json)" right={<span>{w.date}</span>}>
      <ul className="divide-y divide-line">
        {w.gates.map((g) => <li key={g.name} className="flex gap-2.5 px-4 py-2 text-[12.5px]"><Mark ok={g.ok} /><div><div className="font-medium">{g.name}</div><div className="text-muted">{g.detail}</div></div></li>)}
      </ul>
      <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
        <Chip>heard pace {fmt(w.pace_delivery)} w/s</Chip>
        {w.levels && <Chip title="speech vs between-word level">bed {fmt(w.levels.under, 1)} dB under</Chip>}
        <Chip>{w.pauses.length} pauses &gt; 0.9 s</Chip>
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">unclear words ({w.unclear.length})</div>
        {w.unclear.length === 0 ? <Empty>none</Empty> : (
          <div className="flex flex-wrap gap-1.5">{w.unclear.map((u, i) => {
            const chip = <Chip tone={u.p < 0.2 ? "bad" : "warn"} title={`p=${u.p}${onSeek ? " · click to seek the player" : ""}`}>{u.scene} · {fmt(u.t, 1)}s · “{u.word}”</Chip>;
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
    <Card title="Transcript (what Whisper heard · unclear words marked)">
      <p className="scroll-thin max-h-[300px] overflow-y-auto pr-1 text-[13px] leading-6">{w.transcript.split(/(\s+)/).map((t, i) =>
        unclear.has(t.toLowerCase()) ? <mark key={i} className="rounded bg-warn/20 px-0.5 text-ink">{t}</mark> : <span key={i}>{t}</span>)}</p>
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
  if (!b) return <Card title="Benchmark"><Empty>No out/benchmark.json yet: run the benchmark step after the render.</Empty></Card>;
  const delta = (a: number | null | undefined, r: number | null | undefined) => (a == null || r == null ? null : a - r);
  const dcls = (d: number | null) => (d === null ? "text-muted" : "");
  return (
    <Card pad={false} title="Benchmark (vs references/benchmark.json)" right={<span>{b.date}</span>}>
      <div className="scroll-thin overflow-x-auto px-2 pb-2">
        <table className="data">
          <thead><tr><th>metric</th><th className="num">this</th><th className="num">reference</th><th className="num">Δ</th><th className="num">IG median</th><th className="num">Δ</th></tr></thead>
          <tbody>{METRICS.map((m) => {
            const v = b.metrics[m.key], r = b.benchmark[m.key], ig = b.ig_median[m.key];
            const d1 = delta(v, r), d2 = delta(v, ig);
            return (
              <tr key={m.key}>
                <td>{m.label}{m.unit && <span className="text-muted"> {m.unit}</span>}</td>
                <td className="num font-semibold">{fmt(v as number, 1)}</td>
                <td className="num text-muted">{fmt(r as number, 1)}</td>
                <td className={`num ${dcls(d1)}`}>{d1 === null ? "–" : `${d1 > 0 ? "+" : ""}${d1.toFixed(1)}`}</td>
                <td className="num text-muted">{fmt(ig as number, 1)}</td>
                <td className={`num ${dcls(d2)}`}>{d2 === null ? "–" : `${d2 > 0 ? "+" : ""}${d2.toFixed(1)}`}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>
      {b.warnings?.length > 0 && <ul className="space-y-1 border-t border-line px-4 py-3 text-[12.5px] text-warn">{b.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}</ul>}
    </Card>
  );
}

export function ScenesTable({ p }: { p: Project }) {
  return (
    <Card pad={false} title={`Scenes (scenes.json · ${p.scenes.length})`} right={<span>{p.spec.stage ? `kit ${p.spec.stage}` : p.engine}</span>}>
      <div className="scroll-thin max-h-[520px] overflow-auto px-2 pb-2">
        <table className="data">
          <thead><tr><th>id</th><th>type</th><th className="num">words</th><th>beats</th><th>say</th></tr></thead>
          <tbody>{p.scenes.map((s) => (
            <tr key={s.id}><td className="font-mono">{s.id}</td><td className="text-muted">{s.type}</td><td className="num">{s.words}</td>
              <td className="text-muted">{s.beats.map((b) => b.target).join(", ") || "–"}</td><td className="max-w-[18rem] truncate" title={s.say}>{s.say}</td></tr>))}</tbody>
        </table>
      </div>
    </Card>
  );
}
