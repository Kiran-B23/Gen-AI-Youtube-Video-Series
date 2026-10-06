import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { usePage, useTheme } from "../core/context";
import { Reveal, SourcePill } from "../core/editorial";
import { BODY, MONO } from "../theme/tokens";

export type GateRow = { q: string; a: string; c: number };

/** Answers with confidence bars, a threshold line, then ✅ auto / 🙋 human marks. Shared by code-card and mechanism-step. */
export const Gate: React.FC<{ rows: GateRow[]; threshold: number; at: number; passAt: number; failAt: number; source?: string; width: number }> = ({ rows, threshold, at, passAt, failAt, source, width }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  const t = useTheme();
  const barW = 170;
  return (
    <div style={{ width }}>
      {rows.map((r, i) => {
        const appear = at + i * 5;
        const grow = interpolate(frame - appear, [0, 14], [0, r.c], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const pass = r.c >= threshold;
        const marked = frame >= (pass ? passAt : failAt);
        const col = !marked ? page.accent : pass ? t.colors.ok : t.colors.danger;
        return (
          <Reveal key={r.q} at={appear} dx={30} dy={0} sfx={i === 0 ? "pop" : null}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, height: 92, borderBottom: `2px solid ${page.line}` }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: page.dim, width: 190 }}>{r.q}</span>
              <span style={{ fontFamily: BODY, fontWeight: 900, fontSize: 46, color: page.text, width: 170 }}>{r.a}</span>
              <div style={{ position: "relative", width: barW, height: 26, borderRadius: 13, background: page.line }}>
                <div style={{ width: barW * grow, height: "100%", borderRadius: 13, background: col }} />
                <div style={{ position: "absolute", left: barW * threshold - 2, top: -8, width: 4, height: 42, background: page.text, opacity: frame >= passAt - 10 ? 0.9 : 0 }} />
              </div>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: page.text, width: 90 }}>{r.c.toFixed(2)}</span>
              <span style={{ fontSize: 44, width: 50 }}>{marked ? (pass ? "✅" : "🙋") : ""}</span>
            </div>
          </Reveal>
        );
      })}
      <div style={{ display: "flex", gap: 14, marginTop: 22, flexWrap: "wrap", alignItems: "center" }}>
        <Reveal at={passAt - 10} dy={10}><span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: page.text }}>≥ {threshold.toFixed(2)} → auto ✅</span></Reveal>
        <Reveal at={failAt} dy={10}><span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: t.colors.danger }}>below → human 🙋</span></Reveal>
      </div>
      {source ? <div style={{ marginTop: 18 }}><SourcePill text={source} at={at} /></div> : null}
    </div>
  );
};
