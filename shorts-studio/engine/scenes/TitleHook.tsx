import React from "react";
import { random, useCurrentFrame } from "remotion";
import { usePage } from "../core/context";
import { Box, Reveal } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { lines: string[]; highlight?: string; backdrop?: "token-rain" | "none"; sub?: string; chips?: string[]; eyebrow?: string };

/** Giant condensed headline, fully visible on frame 0 (first-frame hook). */
export const TitleHook: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { props, at, item } = useScene<P>();
  // condensed display type sized to the longest line so it never wraps (Anton ≈ 0.47em per uppercase char)
  const longest = Math.max(...props.lines.map((l) => l.length));
  const size = Math.min(170, Math.floor((SAFE_W - 2 * INSET) / (longest * 0.47)));
  return (
    <>
      {props.backdrop === "token-rain" ? (
        <div style={{ position: "absolute", left: 440, top: BAND_TOP - 300, width: 420, height: 900, fontFamily: MONO, fontSize: 40, color: page.text, overflow: "hidden" }}>
          {new Array(7).fill(0).map((_, c) => (
            <div key={c} style={{ position: "absolute", left: c * 58, top: ((frame * (1.2 + random(`r${c}`))) % 120) - 120 }}>
              {new Array(22).fill(0).map((__, r) => <div key={r} style={{ opacity: 0.05 + random(`o${c}-${r}`) * 0.18, height: 50 }}>{Math.floor(random(`d${c}-${r}`) * 10)}</div>)}
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 80, width: SAFE_W - 2 * INSET }}>
        {props.eyebrow ? <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.2em", color: page.accent, marginBottom: 16 }}>{props.eyebrow}</div> : null}
        {props.lines.map((l, i) => (
          <div key={i} style={{ fontFamily: DISPLAY, fontSize: size, lineHeight: 0.98, whiteSpace: "nowrap", color: page.text, textTransform: "uppercase" }}>
            {props.highlight && l.includes(props.highlight) ? (
              <>{l.split(props.highlight)[0]}<span style={{ color: page.accent }}>{props.highlight}</span>{l.split(props.highlight)[1]}</>
            ) : l}
          </div>
        ))}
        {props.sub ? <Reveal at={at("sub", 999)}><div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52, color: page.dim, marginTop: 28, maxWidth: 760 }}>{props.sub}</div></Reveal> : null}
        {props.chips ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 34 }}>
            {props.chips.map((c, i) => <Reveal key={c} at={item("chips", i)} dy={20} sfx="pop"><Box tone={i === 0 ? "accent" : "plain"}>{c}</Box></Reveal>)}
          </div>
        ) : null}
      </div>
    </>
  );
};
