import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { findWord, useVideo } from "./context";
import { BODY, DISPLAY, MONO, SAFE } from "../theme/tokens";
import { Glass } from "./Glass";

/** Converts {scene, word} into a frame on the part's timeline. */
const useGlobalFrame = () => {
  const { ids, starts, timings } = useVideo();
  return (ref: { scene: string; word: string }) => {
    const i = ids.indexOf(ref.scene);
    if (i < 0) return null;
    const w = findWord(timings, ref.scene, ref.word);
    return starts[i] + (w ?? 0);
  };
};

/** Recurring 24h clock: time runs from clock.from to clock.to across the whole part (night -> sunrise). */
const Clock: React.FC<{ from: number; until: number }> = ({ from, until }) => {
  const frame = useCurrentFrame();
  const { spec, total } = useVideo();
  if (frame < from || frame > until + 10) return null;
  const [h0, m0] = (spec.clock?.from ?? "03:00").split(":").map(Number); const [h1, m1] = (spec.clock?.to ?? "07:00").split(":").map(Number);
  const mins = h0 * 60 + m0 + ((h1 * 60 + m1) - (h0 * 60 + m0)) * (frame / total);
  const hh = Math.floor(mins / 60) % 24, mm = Math.floor(mins % 60);
  const o = interpolate(frame, [from, from + 12, until, until + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ang = (mins % 60) * 6;
  return (
    <div style={{ position: "absolute", left: SAFE.right - 250, top: 132, opacity: o }}>
      <Glass style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 18px", borderRadius: 999 }}>
        <svg width={40} height={40} viewBox="0 0 40 40"><circle cx={20} cy={20} r={17} fill="none" stroke="#fff" strokeWidth={3} opacity={0.8} />
          <line x1={20} y1={20} x2={20 + 11 * Math.sin((ang * Math.PI) / 180)} y2={20 - 11 * Math.cos((ang * Math.PI) / 180)} stroke="#FFC145" strokeWidth={3} strokeLinecap="round" />
          <line x1={20} y1={20} x2={20 + 7 * Math.sin(((hh % 12) * 30 + mm / 2) * Math.PI / 180)} y2={20 - 7 * Math.cos(((hh % 12) * 30 + mm / 2) * Math.PI / 180)} stroke="#fff" strokeWidth={3} strokeLinecap="round" /></svg>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: "#fff" }}>{String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}</span>
      </Glass>
    </div>
  );
};

/** Padlock teaser pinned top-left between two spoken words; flies toward centre and fades when released. */
const Padlock: React.FC<{ from: number; until: number; label: string }> = ({ from, until, label }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > until + 20) return null;
  const inP = interpolate(frame - from, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fly = interpolate(frame - until, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: SAFE.left + 36 + fly * 220, top: 205 + fly * 420, opacity: inP * (1 - fly), transform: `translateX(${(1 - inP) * -80}px) scale(${1 + fly * 0.6})` }}>
      <Glass glow="#FFC145" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 999 }}>
        <span style={{ fontSize: 40 }}>🔒</span><span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 36, color: "#fff" }}>{label}</span>
      </Glass>
    </div>
  );
};

export const Overlays: React.FC = () => {
  const { spec, total } = useVideo();
  const gf = useGlobalFrame();
  return (
    <>
      {(spec.overlays ?? []).map((o, i) => {
        const from = gf(o.from), until = gf(o.until) ?? total;
        if (from === null) return null;
        if (o.type === "clock") return <Clock key={i} from={from} until={until} />;
        return <Padlock key={i} from={from} until={until} label={o.label ?? ""} />;
      })}
    </>
  );
};
void DISPLAY;
