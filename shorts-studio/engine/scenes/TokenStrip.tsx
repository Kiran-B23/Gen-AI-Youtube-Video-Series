import React from "react";
import { usePage } from "../core/context";
import { Box, Eyebrow, Reveal } from "../core/editorial";
import { BAND_TOP, DISPLAY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { eyebrow?: string; tokens: { text: string; kind?: "plain" | "accent" | "ok" | "no" | "special" }[]; counterLabel?: string };

/** A row of mono boxes that grows token by token, with a running count. */
export const TokenStrip: React.FC = () => {
  const page = usePage();
  const { props, item } = useScene<P>();
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP, width: SAFE_W - 2 * INSET }}>
      {props.eyebrow ? <Eyebrow>{props.eyebrow}</Eyebrow> : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
        {props.tokens.map((t, i) => <Reveal key={i} at={item("tokens", i, 8)} dy={20} sfx="tick"><Box tone={t.kind ?? "plain"}>{t.text}</Box></Reveal>)}
      </div>
      {props.counterLabel ? <div style={{ marginTop: 40, fontFamily: DISPLAY, fontSize: 160, color: page.accent, lineHeight: 1 }}>{props.tokens.length}<span style={{ fontFamily: MONO, fontSize: 40, color: page.text, marginLeft: 16 }}>{props.counterLabel}</span></div> : null}
    </div>
  );
};
