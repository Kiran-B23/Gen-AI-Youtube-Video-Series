// The scrub bar both players use: scenes from build/layout.json as blocks in their section colour, beat ticks under
// them (red when payoffs.json failed that beat), the playhead, click / drag to seek, hover for time + scene + beat.
import { useEffect, useRef, useState } from "react";
import type { Timeline } from "../api";

export interface BeatMark { scene: string; target: string; word: string; at: number; ok?: boolean | null }

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

export function Scrubber({ tl, t, onSeek, beats, onScrub }: { tl: Timeline; t: number; onSeek: (t: number) => void; beats?: BeatMark[];
  onScrub?: (active: boolean) => void }) {
  const bar = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [drag, setDrag] = useState(false);
  const [width, setWidth] = useState(600);
  useEffect(() => {
    const el = bar.current; if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth)); ro.observe(el); return () => ro.disconnect();
  }, []);
  const total = tl.total || 1;
  const pct = (x: number) => `${Math.max(0, Math.min(100, (x / total) * 100))}%`;
  const at = (clientX: number) => {
    const r = bar.current!.getBoundingClientRect();
    return Math.max(0, Math.min(total - 1 / tl.fps, ((clientX - r.left) / r.width) * total));
  };
  const marks: BeatMark[] = beats ?? tl.beats;
  const hs = hover !== null ? tl.scenes.find((s) => hover >= s.start && hover < s.start + s.duration) : null;
  const hb = hover !== null ? marks.find((b) => Math.abs(b.at - hover) < total / 300) : null;
  return (
    <div className="select-none">
      <div ref={bar} role="slider" aria-label="scrub" aria-valuemin={0} aria-valuemax={total} aria-valuenow={t} tabIndex={0}
        className="relative h-11 cursor-pointer touch-none border-2 border-ink bg-paper-2"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(true); onScrub?.(true); onSeek(at(e.clientX)); }}
        onPointerMove={(e) => { const x = at(e.clientX); setHover(x); if (drag) onSeek(x); }}
        onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); setDrag(false); onScrub?.(false); }}
        onPointerLeave={() => setHover(null)}>
        {/* scenes: one block per scene, its section colour */}
        <div className="absolute inset-x-0 top-0 h-7 overflow-hidden">
          {tl.scenes.map((s) => (
            <div key={s.id} title={`${s.id}${s.section ? `, ${s.section}` : ""}: ${s.start.toFixed(1)} to ${(s.start + s.duration).toFixed(1)} s`}
              className="absolute top-0 h-full border-r border-plate/30 text-xs font-extrabold leading-7"
              style={{ left: pct(s.start), width: pct(s.duration), background: s.color ?? "var(--color-rule)", color: s.ink ?? "var(--color-ink)" }}>
              {(s.duration / total) * width >= 26 && <span className="block overflow-hidden whitespace-nowrap px-1 opacity-90">{s.id}</span>}
            </div>))}
        </div>
        {/* beat ticks */}
        <div className="absolute inset-x-0 bottom-0 h-4">
          {marks.map((b, i) => (
            <span key={i} className={`absolute bottom-0.5 h-3 ${b.ok === false ? "w-0.5 bg-bad" : "w-px bg-muted"}`} style={{ left: pct(b.at) }} />))}
        </div>
        <span className="pointer-events-none absolute -top-0.5 -bottom-0.5 w-0.5 bg-accent shadow-[0_0_0_1px_var(--color-paper)]" style={{ left: pct(t) }} />
        {hover !== null && (
          <span className="pointer-events-none absolute -top-0.5 -bottom-0.5 w-px bg-ink/40" style={{ left: pct(hover) }} />)}
        {hover !== null && (
          <div className="pointer-events-none absolute bottom-full z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-paper-3 px-2 py-1 text-xs shadow-card"
            style={{ left: `clamp(60px, ${pct(hover)}, calc(100% - 60px))` }}>
            <b className="font-extrabold">{fmt(hover)}</b>{hs && <>, {hs.id}</>}{hb && <>, “{hb.word}” shows {hb.target}{hb.ok === false ? <span className="text-bad"> (failed)</span> : ""}</>}
          </div>)}
      </div>
    </div>
  );
}

export { fmt as fmtTime };
