import React from "react";
import { useCurrentFrame } from "remotion";
import { usePage } from "../core/context";
import { Box, Eyebrow, Reveal, SourcePill } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { eyebrow?: string; rows: { label: string; tokens: string[]; note?: string; source?: string }[] };

/** Same job, different systems: one row per variant, mono token boxes. */
export const SideBySideVariants: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { props, item, highlightAt } = useScene<P>();
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 150, width: SAFE_W - 2 * INSET }}>
      {props.eyebrow ? <Eyebrow style={{ marginBottom: 18 }}>{props.eyebrow}</Eyebrow> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {props.rows.map((r, i) => {
          const at = item("rows", i, 40);
          const hi = frame >= highlightAt(`rows.${i}`);
          return (
            <Reveal key={r.label} at={at} dx={-40} dy={0} sfx="pop">
              <div style={{ padding: "22px 28px", borderRadius: 24, background: page.card, border: `3px solid ${hi ? page.accent : page.line}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 72, lineHeight: 1, color: page.accent, width: 210 }}>{r.label}</span>
                  {r.tokens.map((t) => <Box key={t} size={38}>{t}</Box>)}
                </div>
                {r.note ? <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 42, color: page.text, marginTop: 10, opacity: hi ? 1 : 0.7 }}>{r.note}</div> : null}
                {r.source ? <div style={{ marginTop: 10 }}><SourcePill text={r.source} at={at} /></div> : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};
