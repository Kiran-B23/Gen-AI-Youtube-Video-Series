// remotion-spring style kit: Remotion spring() physics, kinetic type, light neo-brutalist cards, push/flip transitions.
// Everything is a pure function of the stage time t (seconds); frames = t * FPS. See templates/styles/remotion-spring/design.md
import React, { type CSSProperties } from "react";
import { Easing, interpolate, spring } from "remotion";
import { useStage } from "../../engine/stage";

export const FPS = 30;
export const P = { cream: "#FFF4E6", ink: "#1B1433", coral: "#FF5A4E", coralInk: "#D9352A", violet: "#6B4CFF", mint: "#22C993", mintInk: "#0B7F5E",
  sun: "#FFC83D", white: "#FFFFFF", red: "#E8364A", sky: "#3DB8FF" };
export const FT = { d: "Anton", b: "Inter", m: "JetBrains Mono" };

export type Cfg = { damping?: number; stiffness?: number; mass?: number };
export const BOUNCY: Cfg = { damping: 10, stiffness: 150, mass: 0.8 };
export const SNAPPY: Cfg = { damping: 9, stiffness: 220, mass: 0.6 };
export const SMOOTH: Cfg = { damping: 18, stiffness: 120, mass: 1 };
/** spring value (0 → ~1 with overshoot) of a spring released at t0 */
export const sp = (t: number, t0: number, c: Cfg = BOUNCY) =>
  t < t0 ? 0 : spring({ frame: (t - t0) * FPS, fps: FPS, config: { damping: c.damping ?? 10, stiffness: c.stiffness ?? 150, mass: c.mass ?? 0.8 } });
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const lin = (t: number, a: number, b: number, from = 0, to = 1) => interpolate(t, [a, b], [from, to], CL);
export const easeOut = (t: number, a: number, b: number, from: number, to: number) => interpolate(t, [a, b], [from, to], { ...CL, easing: Easing.out(Easing.cubic) });
export const abs = (s: CSSProperties): CSSProperties => ({ position: "absolute", ...s });

export type In = { x?: number; y?: number; s?: number; r?: number; c?: Cfg; out?: number };
/** spring entrance: from offset (x, y), scale s and rotation r into place, overshooting; optional exit at `out` */
export const springIn = (t: number, t0: number, o: In = {}): CSSProperties => {
  const v = sp(t, t0, o.c);
  let op = lin(t, t0, t0 + 0.1), k = 0;
  if (o.out !== undefined && t >= o.out) { k = lin(t, o.out, o.out + 0.25); op *= 1 - k; }
  const s0 = o.s ?? 0.4, sc = (s0 + (1 - s0) * v) * (1 - 0.35 * k);
  return { opacity: op, transform: `translate(${(o.x ?? 0) * (1 - v)}px, ${(o.y ?? 80) * (1 - v) - 40 * k}px) scale(${sc}) rotate(${(o.r ?? 0) * (1 - v)}deg)` };
};
/** stamp: lands from big and twisted with a hard spring, settles at `rot` */
export const stampIn = (t: number, t0: number, rot = -6): CSSProperties => {
  const v = sp(t, t0, SNAPPY);
  return { opacity: lin(t, t0, t0 + 0.08), transform: `scale(${2.3 - 1.3 * v}) rotate(${rot - 22 * (1 - v)}deg)` };
};
/** count-up, null before it starts (hide the element: never a "0" on screen) */
export const countTo = (t: number, t0: number, from: number, to: number, d = 0.8) => (t < t0 ? null : easeOut(t, t0, t0 + d, from, to));

export const card = (bg: string = P.white, r = 36): CSSProperties => ({ background: bg, border: `6px solid ${P.ink}`, borderRadius: r, boxShadow: `14px 14px 0 ${P.ink}` });

export const Pill: React.FC<{ bg?: string; color?: string; size?: number; style?: CSSProperties; children: React.ReactNode }> = ({ bg = P.white, color = P.ink, size = 44, style, children }) => (
  <span style={{ display: "inline-block", padding: "10px 30px", borderRadius: 999, border: `5px solid ${P.ink}`, boxShadow: `6px 6px 0 ${P.ink}`, background: bg, color,
    fontFamily: FT.m, fontSize: size, fontWeight: 800, whiteSpace: "nowrap", ...style }}>{children}</span>
);

/** a section of the reel that pushes in and out (time-based, like @remotion/transitions slide/flip); everything inside bobs gently */
export const Panel: React.FC<{ from: number; to: number; enter?: "left" | "up" | "flip" | "none"; exit?: "left" | "up" | "none"; children: React.ReactNode }> = ({ from, to, enter = "left", exit = "left", children }) => {
  const { t } = useStage();
  if (t < from || t >= to) return null;
  const vin = sp(t, from, SMOOTH), vout = Math.pow(lin(t, to - 0.35, to), 2);
  let tr = "", op = 1;
  if (enter === "left") tr += `translateX(${1080 * (1 - vin)}px) `;
  if (enter === "up") tr += `translateY(${1920 * (1 - vin)}px) `;
  if (enter === "flip") { tr += `perspective(2400px) rotateY(${75 * (1 - vin)}deg) `; op = lin(t, from, from + 0.15); }
  if (exit === "left") tr += `translateX(${-1080 * vout}px) `;
  if (exit === "up") tr += `translateY(${-1920 * vout}px) `;
  const bob = Math.sin((t - from) * 2.1) * 6;
  return <div style={abs({ inset: 0, transformOrigin: "50% 45%", opacity: op, transform: `${tr}translateY(${bob}px)` })}>{children}</div>;
};

/** kinetic words: each word springs in at its own time */
export const Words: React.FC<{ words: string[]; times: number[]; style?: CSSProperties; colors?: (string | undefined)[]; out?: number }> = ({ words, times, style, colors, out }) => {
  const { t } = useStage();
  return (
    <div style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", marginRight: "0.22em", color: colors?.[i], transformOrigin: "50% 80%",
          ...springIn(t, times[i], { y: 110, s: 0.25, r: i % 2 ? 9 : -9, out }) }}>{w}</span>
      ))}
    </div>
  );
};

/** step header: progress pips + "STEP n OF 4" + the title springing in word by word */
// numbered: only for Tutorial / Concept mechanisms (structure-check agent); default is a plain section title
export const StepHead: React.FC<{ n: number; title: string; t0: number; out?: number; numbered?: boolean }> = ({ n, title, t0, out, numbered = false }) => {
  const { t } = useStage();
  return (
    <div style={abs({ left: 72, top: 200, width: 936 })}>
      {numbered && <div style={{ display: "flex", gap: 12, alignItems: "center", ...springIn(t, t0, { y: -40, s: 0.6, out }) }}>
        {[1, 2, 3, 4].map((k) => <span key={k} style={{ width: k === n ? 70 : 24, height: 24, borderRadius: 12, border: `4px solid ${P.ink}`, background: k <= n ? P.ink : "transparent" }} />)}
        <span style={{ marginLeft: 12, fontFamily: FT.m, fontSize: 30, fontWeight: 800, letterSpacing: "0.15em", color: P.ink }}>STEP {n} OF 4</span>
      </div>}
      <Words words={title.toUpperCase().split(" ")} times={title.split(" ").map((_, i) => t0 + 0.08 + i * 0.07)} out={out}
        style={{ marginTop: 14, fontFamily: FT.d, fontSize: 120, lineHeight: 1, color: P.ink }} />
    </div>
  );
};

export const Illus: React.FC = () => <div style={abs({ right: 60, top: 1440, fontSize: 24, fontWeight: 700, color: "rgba(27,20,51,0.55)" })}>illustrative</div>;
