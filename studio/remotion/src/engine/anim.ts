// Time-based animation helpers for Remotion stages: the same verbs as the HyperFrames kit (kit.js), as pure functions
// of the current time t (seconds). Every value is computed from t, never from state, so any frame renders on its own.
import type { CSSProperties } from "react";

export type Ease = (x: number) => number;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const ease = {
  linear: (x: number) => x,
  out2: (x: number) => 1 - Math.pow(1 - x, 3),          // GSAP power2.out
  out3: (x: number) => 1 - Math.pow(1 - x, 4),          // power3.out
  out4: (x: number) => 1 - Math.pow(1 - x, 5),          // power4.out
  in3: (x: number) => Math.pow(x, 4),                    // power3.in
  inOut2: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),   // power2.inOut
  inOut3: (x: number) => (x < 0.5 ? 8 * Math.pow(x, 4) : 1 - Math.pow(-2 * x + 2, 4) / 2),
  back: (s = 1.7) => (x: number) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),   // back.out(s)
};

/** progress 0..1 of a tween starting at t0 lasting d, eased */
export const prog = (t: number, t0: number, d: number, e: Ease = ease.out2) => e(clamp01((t - t0) / Math.max(d, 1e-6)));
/** visible between t0 and t1 (t1 optional) */
export const on = (t: number, t0: number, t1?: number) => t >= t0 && (t1 === undefined || t < t1);
/** tween a number from a to b */
export const tween = (t: number, t0: number, d: number, a: number, b: number, e: Ease = ease.out2) => a + (b - a) * prog(t, t0, d, e);

type PopOpts = { x?: number; y?: number; s?: number; d?: number; e?: Ease; out?: number; outD?: number };
/** entrance (overshoot-and-settle by default) + optional exit at `out`; returns style for the element */
export const pop = (t: number, t0: number, o: PopOpts = {}): CSSProperties => {
  const d = o.d ?? 0.45, e = o.e ?? ease.back(1.7), p = t < t0 ? 0 : e(clamp01((t - t0) / d));
  const x = (o.x ?? 0) * (1 - p), y = (o.y ?? 30) * (1 - p), s = (o.s ?? 0.9) + (1 - (o.s ?? 0.9)) * p;
  let op = t < t0 ? 0 : clamp01((t - t0) / (d * 0.6));
  if (o.out !== undefined && t >= o.out) op *= 1 - clamp01((t - o.out) / (o.outD ?? 0.3));
  return { opacity: op, transform: `translate(${x}px, ${y}px) scale(${s})` };
};
/** stamp: big, rotated, slams down to `rot` degrees */
export const slam = (t: number, t0: number, rot = -5): CSSProperties => {
  if (t < t0) return { opacity: 0 };
  const p = ease.back(2)(clamp01((t - t0) / 0.32));
  return { opacity: clamp01((t - t0) / 0.12), transform: `scale(${2.2 - 1.2 * p}) rotate(${rot - 10 + 10 * p}deg)` };
};
/** fade out from t1 over d */
export const fadeOut = (t: number, t1: number, d = 0.3) => (t < t1 ? 1 : 1 - clamp01((t - t1) / d));
/** count-up value, or null before it starts (the element is hidden: never a "0" on screen) */
export const count = (t: number, t0: number, from: number, to: number, d: number) => (t < t0 ? null : tween(t, t0, d, from, to));
/** typed text: the first n characters between t0 and t1 */
export const typed = (text: string, t: number, t0: number, t1: number) => text.slice(0, Math.round(text.length * clamp01((t - t0) / Math.max(0.2, t1 - t0))));
/** slow settle so nothing ever sits still */
export const drift = (t: number, t0: number, t1: number) => `scale(${1 + 0.018 * clamp01((t - t0) / (t1 - t0))})`;
