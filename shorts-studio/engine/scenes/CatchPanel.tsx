import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, DISPLAY, MONO, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { items: { text: string; kind: "warn" | "no" | "ok" }[]; myth: string; fact: string; reset: string; mistakes: string };

/** Amber "catch" checklist, then a MYTH -> FACT flip card for the privacy payoff, reset + mistakes. */
export const CatchPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const th = useTheme();
  const { props, at, item } = useScene<P>();
  const tMyth = at("myth", 9999), tFact = at("fact", 9999);
  const flip = interpolate(frame, [tFact, tFact + 12], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const amber = th.colors.highlight;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 160, width: SAFE_W, display: "flex", flexDirection: "column", gap: 14 }}>
        {props.items.map((it, i) => (
          <Reveal key={it.text} at={item("items", i, 20)} dy={-30} sfx="pop">
            <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 22px", borderRadius: 20, background: "rgba(255,193,69,0.16)", border: `2px solid ${amber}` }}>
              <span style={{ width: 50, height: 50, borderRadius: 12, background: amber, color: "#0D1030", fontFamily: DISPLAY, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44, color: "#fff" }}>{it.text}</span>
            </div>
          </Reveal>
        ))}
      </div>
      {frame >= tMyth ? (
        <div style={{ position: "absolute", left: 0, top: 500, width: SAFE_W, height: 270, perspective: 1400 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: `rotateY(${flip}deg)` }}>
            {[{ face: "MYTH ✕", text: props.myth, c: th.colors.danger, rot: 0 }, { face: "FACT ✓", text: props.fact, c: th.colors.ok, rot: 180 }].map((f) => (
              <Glass key={f.face} glow={f.c} style={{ position: "absolute", inset: 0, padding: "26px 30px", backfaceVisibility: "hidden", transform: `rotateY(${f.rot}deg)`, border: `3px solid ${f.c}` }}>
                <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: "0.15em", color: f.c }}>{f.face}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 14 }}>
                  <span style={{ fontSize: 70 }}>{f.rot ? "🧠" : "🔌"}</span>
                  <span style={{ fontFamily: BODY, fontWeight: 900, fontSize: 52, lineHeight: 1.12, color: "#fff" }}>{f.text}</span>
                </div>
              </Glass>
            ))}
          </div>
        </div>
      ) : null}
      <Reveal at={at("reset", 9999)} dy={20} sfx="pop" style={{ position: "absolute", left: 0, top: 800 }}>
        <span style={{ display: "inline-block", padding: "14px 22px", borderRadius: 16, background: "rgba(255,90,95,0.22)", border: `2px solid ${th.colors.danger}`, fontFamily: BODY, fontWeight: 900, fontSize: 44, color: "#fff" }}>🗑️ {props.reset}</span>
      </Reveal>
      <Reveal at={at("mistakes", 9999)} dy={20} sfx="pop" style={{ position: "absolute", left: 0, top: 900 }}>
        <span style={{ display: "inline-block", padding: "14px 22px", borderRadius: 16, background: "rgba(255,193,69,0.22)", border: `2px solid ${amber}`, fontFamily: BODY, fontWeight: 900, fontSize: 44, color: "#fff" }}>{props.mistakes}</span>
      </Reveal>
    </>
  );
};
