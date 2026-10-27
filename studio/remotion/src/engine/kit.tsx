// reference-flat house style for Remotion stages: the same pieces as studio/templates/styles/reference-flat/kit.css|js
import React, { type CSSProperties } from "react";
import { ease, fadeOut, pop, prog } from "./anim";
import { useStage } from "./stage";
import { CAM_HOME, camStyle } from "./Camera";
import type { CamMove } from "./types";

export const C = { blue: "#2B3BE0", yellow: "#FFD23F", light: "#EEF1F6", navy: "#0B1020", white: "#FFFFFF", green: "#14B87A", greenInk: "#0C8F5F",
  red: "#E5364A", redHot: "#FF4D5E", amber: "#F5A400" };
export const F = { display: "Anton", body: "Inter", mono: "JetBrains Mono" };
export const abs = (s: CSSProperties): CSSProperties => ({ position: "absolute", ...s });

/** a beat group: visible from t0 to t1 with a slow drift (nothing ever sits still) */
export const Group: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const { t } = useStage();
  if (t < from || t >= to) return null;
  return <div style={abs({ inset: 0, transformOrigin: "50% 40%", transform: `scale(${1 + 0.018 * prog(t, from, to - from, ease.linear)})` })}>{children}</div>;
};

/** chapter card "STEP 1 OF 4 / 01 / title": lands 0.2 s early under the wipe, leaves at `until`. Returns nothing; use chapterEnd() for timing. */
export const chapterEnd = (until: number) => until + 0.25;
// numbered: "STEP n OF m" + numeral only for Tutorial / Concept mechanisms (structure-check agent); default = a big section title
export const Chapter: React.FC<{ start: number; until: number; n: number; of: number; title: string; on: "dark" | "blue" | "light" | "yellow"; numbered?: boolean }> = ({ start, until, n, of, title, on, numbered = false }) => {
  const { t } = useStage(); const t0 = start - 0.2;
  if (t < t0 || t >= until + 0.25) return null;
  const numC = on === "light" || on === "yellow" ? C.blue : C.yellow, txt = on === "light" || on === "yellow" ? C.navy : C.white;
  const out = t >= until ? prog(t, until, 0.25, ease.in3) : 0;
  return (
    <div style={abs({ inset: 0, opacity: 1 - out, transform: `translateY(${-60 * out}px)` })}>
      {numbered && <div style={abs({ left: 72, top: 250, fontFamily: F.mono, fontSize: 30, fontWeight: 800, letterSpacing: "0.2em", color: on === "light" ? C.blue : txt, ...pop(t, t0 + 0.05, { y: 0, s: 1, d: 0.3 }) })}>STEP {n} OF {of}</div>}
      {numbered && <div style={abs({ left: 56, top: 280, fontFamily: F.body, fontWeight: 900, fontSize: 330, lineHeight: 1, letterSpacing: "-0.06em", color: numC, ...pop(t, t0, { y: 80, s: 1, d: 0.3, e: ease.out4 }) })}>{String(n).padStart(2, "0")}</div>}
      <div style={abs({ left: 72, top: numbered ? 640 : 300, fontSize: numbered ? 76 : 150, fontWeight: 800, fontFamily: numbered ? undefined : F.display, lineHeight: 1, color: txt, ...pop(t, t0 + 0.15, { y: 30, s: 1, d: 0.4, e: ease.out3 }) })}>{title}</div>
    </div>
  );
};

/** progress bar "—— / 04": segment k lights at lights[k]; ink follows the section */
/** step progress bar: only when the structure check allows numbered steps */
export const Progress: React.FC<{ from: number; to: number; lights: number[]; ink: (t: number) => string }> = ({ from, to, lights, ink }) => {
  const { t } = useStage();
  if (t < from || t >= to) return null;
  return (
    <div style={abs({ left: 72, top: 72, display: "flex", gap: 10, alignItems: "center", color: ink(t) })}>
      {lights.map((l, k) => <span key={k} style={{ width: 70, height: 8, borderRadius: 4, background: "currentColor", opacity: 0.22 + 0.78 * prog(t, l, 0.3) }} />)}
      <span style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 700, marginLeft: 10, opacity: 0.7 }}>/ {String(lights.length).padStart(2, "0")}</span>
    </div>
  );
};

export const Chip: React.FC<{ kind?: "ok" | "warn" | "bad" | "ink" | "yel" | "wht"; style?: CSSProperties; children: React.ReactNode }> = ({ kind = "wht", style, children }) => {
  const k = { ok: [C.green, C.white], warn: [C.amber, C.navy], bad: [C.red, C.white], ink: [C.navy, C.white], yel: [C.yellow, C.navy], wht: [C.white, C.blue] }[kind];
  return <span style={{ display: "inline-block", padding: "10px 24px", borderRadius: 16, fontFamily: F.mono, fontSize: 44, fontWeight: 800, background: k[0], color: k[1], ...style }}>{children}</span>;
};

export const Stamp: React.FC<{ color?: string; size?: number; style?: CSSProperties; children: React.ReactNode }> = ({ color = C.redHot, size = 180, style, children }) => (
  <div style={{ display: "inline-block", padding: "6px 44px", border: `12px solid ${color}`, borderRadius: 28, fontFamily: F.display, fontSize: size, lineHeight: 1.05, color, ...style }}>{children}</div>
);

/** CTA: the question builds word by word as spoken, then the follow pill */
export const Cta: React.FC<{ sid: string; words: string[]; follow: number }> = ({ sid, words, follow }) => {
  const { t, S, W, END } = useStage();
  if (t < S[sid] || t >= END(sid)) return null;
  return (
    <>
      <div style={abs({ left: 72, top: 420, width: 936, fontFamily: F.display, fontSize: 190, lineHeight: 1.02, color: C.white })}>
        {words.map((w, i) => <span key={i} style={{ display: "inline-block", marginRight: "0.22em", color: i === words.length - 1 ? C.yellow : undefined,
          ...pop(t, (W(sid, w) ?? S[sid]) - 0.05, { y: 40, d: 0.3, e: ease.out4 }) }}>{w.toUpperCase()}</span>)}
      </div>
      <div style={abs({ left: 72, top: 1240, padding: "26px 52px", borderRadius: 999, background: C.yellow, color: C.navy, fontSize: 50, fontWeight: 900, ...pop(t, follow) })}>+ Follow for more AI breakdowns</div>
    </>
  );
};
/** camera for a stage that drives its own moves (instead of beat "cam" in scenes.json): the same rule as kit.js
 *  cam(t, x, y, zoom, d) → point (x, y) lands on the zone centre at `zoom`; end with a move back to CAM_HOME.
 *  <div style={cam(t, [{ at: at("s03/pip"), x: 300, y: 600, zoom: 1.8 }, { at: at("s03/pip") + 2.5, ...CAM_HOME }])}> */
export const cam = (t: number, moves: CamMove[]) => camStyle(moves, t);
export { CAM_HOME, fadeOut };
