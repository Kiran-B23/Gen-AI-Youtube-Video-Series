import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, DISPLAY, INSET, SAFE_W } from "../theme/tokens";
import { Sfx } from "../audio/AudioMix";
import { useScene } from "./common";

type Card = { persona: string; emoji: string; ui: string; items: string[] };
type P = { header: string; cards: Card[] };

/** Swipeable persona cards with spring physics; a hand hints the swipe before each change. */
export const CardCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, item, highlightAt } = useScene<P>();
  const times = props.cards.map((_, i) => item("cards", i, 60));
  const cur = times.reduce((a, t, i) => (frame >= t ? i : a), 0);
  // spring position along the carousel
  let pos = 0;
  times.forEach((t, i) => { if (i > 0) pos += frame < t ? 0 : spring({ frame: frame - t, fps, config: { damping: 15, stiffness: 140 } }); });
  const W = 640, GAP = 40;
  const pal = th.rotation.map((k) => th.colors[k]);
  const hint = times.slice(1).find((t) => frame >= t - 14 && frame < t + 4);
  return (
    <>
      <div style={{ position: "absolute", left: INSET, top: 200, fontFamily: DISPLAY, fontSize: 70, lineHeight: 1, whiteSpace: "nowrap", color: "#fff" }}>
        {props.header.split("YOUR").map((part, i, arr) => <React.Fragment key={i}>{part}{i < arr.length - 1 ? <span style={{ color: th.colors.highlight }}>YOUR</span> : null}</React.Fragment>)}
      </div>
      <div style={{ position: "absolute", left: INSET, top: 330, width: SAFE_W - INSET, height: 680, overflow: "hidden" }}>
        {props.cards.map((c, i) => {
          const x = (i - pos) * (W + GAP);
          const done = frame >= highlightAt(`cards.${i}`);
          return (
            <div key={c.persona} style={{ position: "absolute", left: x, top: 0, width: W, transform: `scale(${i === cur ? 1 : 0.92})`, opacity: Math.abs(i - pos) > 1.2 ? 0 : 1 }}>
              <Glass glow={pal[i]} style={{ padding: "30px 32px", height: 600 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}><span style={{ fontSize: 76 }}>{c.emoji}</span><span style={{ fontFamily: DISPLAY, fontSize: 76, color: "#fff" }}>{c.persona}</span></div>
                {c.ui === "creator" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, height: 90, marginTop: 20 }}>
                    {new Array(44).fill(0).map((_, k) => <div key={k} style={{ width: 9, height: 20 + 60 * Math.abs(Math.sin(k * 0.7 + frame / 6)), borderRadius: 4, background: [8, 20, 33].includes(k) ? th.colors.highlight : "rgba(255,255,255,0.5)" }} />)}
                  </div>
                ) : null}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
                  {c.items.map((it, k) => (
                    <Reveal key={it} at={times[i] + 8 + k * 9} dy={16} sfx={k === 0 ? "tick" : null}>
                      <div style={{ padding: "16px 20px", borderRadius: 18, background: k === c.items.length - 1 && (done || c.ui !== "dev") ? "rgba(46,196,182,0.28)" : "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.22)", fontFamily: BODY, fontWeight: 800, fontSize: 44, color: "#fff" }}>{it}</div>
                    </Reveal>
                  ))}
                </div>
              </Glass>
            </div>
          );
        })}
      </div>
      {hint !== undefined ? (
        <div style={{ position: "absolute", left: 560 - interpolate(frame - (hint - 14), [0, 14], [0, 260], { extrapolateRight: "clamp" }), top: 800, fontSize: 90, opacity: 0.95 }}>👆</div>
      ) : null}
      {times.slice(1).map((t, i) => <Sfx key={i} name="whoosh" at={t} />)}
    </>
  );
};
