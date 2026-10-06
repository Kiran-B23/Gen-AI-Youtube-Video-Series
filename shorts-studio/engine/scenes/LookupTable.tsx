import React from "react";
import { useCurrentFrame } from "remotion";
import { usePage } from "../core/context";
import { Eyebrow, Reveal } from "../core/editorial";
import { BAND_TOP, BODY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { eyebrow?: string; columns: string[]; rows: string[][] };

/** A table whose rows arrive on spoken words; the newest row is highlighted (like an ID lookup). */
export const LookupTable: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { props, item } = useScene<P>();
  const times = props.rows.map((_, i) => item("rows", i, 12));
  const cur = times.reduce((a, t, i) => (frame >= t ? i : a), -1);
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 150, width: SAFE_W - 2 * INSET }}>
      {props.eyebrow ? <Eyebrow style={{ marginBottom: 16 }}>{props.eyebrow}</Eyebrow> : null}
      <div style={{ borderRadius: 24, background: page.card, border: `3px solid ${page.line}`, padding: "10px 0" }}>
        <div style={{ display: "flex", padding: "8px 26px", fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.15em", color: page.dim }}>
          <span style={{ width: 340 }}>{props.columns[0]}</span><span>{props.columns[1]}</span>
        </div>
        {props.rows.map((r, i) => (
          <Reveal key={i} at={times[i]} dy={16} sfx="tick">
            <div style={{ display: "flex", alignItems: "center", height: 84, margin: "0 12px", padding: "0 14px", borderRadius: 14, border: `3px solid ${i === cur ? page.accent : "transparent"}`, background: i === cur ? `${page.accent}22` : "transparent" }}>
              <span style={{ width: 340, flexShrink: 0, paddingRight: 14, fontFamily: BODY, fontWeight: 800, fontSize: 42, color: page.text }}>{r[0]}</span>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 36, whiteSpace: "nowrap", color: i === cur ? page.text : page.dim }}>{r[1]}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
