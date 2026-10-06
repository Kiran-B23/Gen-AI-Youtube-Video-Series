import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { BODY, DISPLAY, MONO, INSET } from "../theme/tokens";
import { usePage, useVideo, useSceneCtx } from "./context";
import { Sfx, SfxName } from "../audio/AudioMix";

const ease = Easing.out(Easing.cubic);

/** Calm entrance: slide 40px + fade over ~10 frames (editorial motion). Hidden before `at`. */
export const Reveal: React.FC<{ at: number; children: React.ReactNode; dy?: number; dx?: number; style?: React.CSSProperties; until?: number; sfx?: SfxName | null }> = ({ at, children, dy = 40, dx = 0, style, until = Infinity, sfx = null }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until + 8) return null;
  const p = interpolate(frame - at, [0, 10], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const out = until === Infinity ? 0 : interpolate(frame - until, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: p * (1 - out), transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy - out * 30}px)`, ...style }}>
      {children}
      {sfx ? <Sfx name={sfx} at={at} /> : null}
    </div>
  );
};

/** Mono outlined token box, the visual unit carried through every scene. */
export const Box: React.FC<{ children: React.ReactNode; tone?: "plain" | "accent" | "ok" | "no" | "special" | "filled"; size?: number; style?: React.CSSProperties }> = ({ children, tone = "plain", size = 40, style }) => {
  const page = usePage();
  const { theme } = useVideo();
  const c = { plain: page.text, accent: page.accent, ok: theme.colors.ok, no: theme.colors.danger, special: theme.colors.special, filled: page.text }[tone];
  const filled = tone === "ok" || tone === "no" || tone === "filled" || tone === "special";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: `${size * 0.26}px ${size * 0.5}px`, border: `3px solid ${c}`, borderRadius: 12, fontFamily: MONO, fontWeight: 700, fontSize: size, lineHeight: 1.1, color: filled ? (tone === "filled" ? page.bg : "#0B1020") : c, background: filled ? c : page.card, whiteSpace: "nowrap", ...style }}>
      {children}
    </span>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const page = usePage();
  return <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.2em", textTransform: "uppercase", color: page.accent, ...style }}>{children}</div>;
};

/** "STEP 02 / 06" + segmented bar, top-left. */
export const StepHeader: React.FC<{ index: number; total: number; at?: number }> = ({ index, total, at = 0 }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  if (frame < at) return null;
  const p = interpolate(frame - at, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: INSET, top: 10, opacity: p, fontFamily: MONO, color: page.text }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.2em", color: page.dim }}>STEP</span>
        <span style={{ fontFamily: DISPLAY, fontSize: 52, lineHeight: 1 }}>{String(index).padStart(2, "0")}</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: page.dim }}>/ {String(total).padStart(2, "0")}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {new Array(total).fill(0).map((_, i) => <div key={i} style={{ width: 46, height: 6, borderRadius: 3, background: i < index ? page.accent : page.line }} />)}
      </div>
    </div>
  );
};

/** Chapter opener: giant numeral + title, shown until the scene's main visual takes over. */
export const ChapterIntro: React.FC<{ index: number; total: number; title: string; until: number }> = ({ index, total, title, until }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  if (frame >= until + 10) return null;
  const p = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const out = interpolate(frame - until, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: INSET, top: 330, opacity: 1 - out, transform: `translateY(${(1 - p) * 40 - out * 60}px)` }}>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.2em", color: page.dim, marginBottom: 10, opacity: p }}>STEP {index} OF {total}</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 330, lineHeight: 0.95, color: page.accent, opacity: p }}>{String(index).padStart(2, "0")}</div>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 70, color: page.text, marginTop: 18, maxWidth: 780, lineHeight: 1.08, opacity: p }}>{title}</div>
    </div>
  );
};

/** 36px source pill, styled for the page. */
export const SourcePill: React.FC<{ text: string; at?: number; style?: React.CSSProperties }> = ({ text, at = 0, style }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  if (frame < at) return null;
  const p = interpolate(frame - at, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const label = /^(source|real|illustrative)/i.test(text) ? text : `Source: ${text}`;
  return <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: 999, border: `2px solid ${page.line}`, background: page.card, fontFamily: BODY, fontWeight: 700, fontSize: 36, color: page.text, opacity: p, whiteSpace: "nowrap", ...style }}>{label}</span>;
};

/** Number that ticks up (ease-out), with a tick SFX when it lands. */
export const Counter: React.FC<{ to: number; at: number; duration?: number; decimals?: number; prefix?: string; suffix?: string }> = ({ to, at, duration = 18, decimals = 0, prefix = "", suffix = "" }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + duration], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{prefix}{v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}<Sfx name="tick" at={at + duration} /></span>;
};

/** The scene's step index/total, if it's inside a chapter (for scenes that continue a chapter). */
export const useStep = () => {
  const { scene } = useSceneCtx();
  const { spec, ids } = useVideo();
  const total = spec.steps ?? 0;
  // the most recent chapter at or before this scene in the current part
  let index = 0;
  for (const id of ids) {
    const s = spec.scenes.find((x) => x.id === id);
    if (s?.chapter) index = s.chapter.index;
    if (id === scene.id) break;
  }
  return { index, total };
};
