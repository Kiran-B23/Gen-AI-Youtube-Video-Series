import React from "react";
import { usePage } from "../core/context";
import { Box, Reveal } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { title: string; subtitle: string; steps: string[]; question?: string; next?: string; loopTo?: string };

/** Screenshot-worthy summary of every step + comment question (+ optional Part 2 teaser). */
export const RecapCard: React.FC = () => {
  const page = usePage();
  const { props, at } = useScene<P>();
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 200, width: SAFE_W - 2 * INSET }}>
      <div style={{ fontFamily: DISPLAY, fontSize: 190, lineHeight: 0.95, color: page.text }}>{props.title}</div>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52, lineHeight: 1.15, color: page.accent, marginTop: 18, marginBottom: 30 }}>{props.subtitle}</div>
      <div style={{ display: props.steps.length ? "grid" : "none", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {props.steps.map((s, i) => (
          <Reveal key={s} at={4 + i * 5} dy={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 16, border: `3px solid ${page.line}`, background: page.card, height: 92, boxSizing: "border-box" }}>
              <Box tone="accent" size={36}>{i + 1}</Box>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 40, lineHeight: 1.05, color: page.text }}>{s}</span>
            </div>
          </Reveal>
        ))}
      </div>
      {props.question ? <Reveal at={at("question", 9999)} style={{ marginTop: 30 }}><div style={{ fontFamily: BODY, fontWeight: 900, fontSize: 52, color: page.text, lineHeight: 1.15 }}>{props.question}</div></Reveal> : null}
      {props.next ? <Reveal at={at("next", 9999)} style={{ marginTop: 18 }} sfx="pop"><Box tone="accent" size={42}>{props.next}</Box></Reveal> : null}
    </div>
  );
};
