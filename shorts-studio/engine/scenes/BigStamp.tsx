import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useColor, usePage } from "../core/context";
import { Eyebrow, Reveal } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { text: string; sub?: string; color?: string; pair?: { left: { title: string; value: string }; right: { title: string; value: string } } };

/** A blunt answer stamped on a spoken word; optionally followed by a two-column pair. */
export const BigStamp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const page = usePage();
  const color = useColor();
  const { props, at } = useScene<P>();
  const tStamp = at("stamp", 0);
  const tLeft = at("pair.left", 9999);
  const s = frame < tStamp ? 0 : spring({ frame: frame - tStamp, fps, config: { damping: 11, stiffness: 240, mass: 0.7 } });
  const up = props.pair ? interpolate(frame, [tLeft - 4, tLeft + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const c = color(props.color ?? "danger");
  const long = props.text.length > 6;
  return (
    <>
      {frame >= tStamp ? (
        <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 40 - up * 250, transform: `scale(${(2.4 - 1.4 * s) * (1 - 0.45 * up)}) rotate(${-6 * s}deg)`, transformOrigin: "0% 50%", opacity: Math.min(1, s * 3) }}>
          <div style={{ display: "inline-block", padding: long ? "10px 28px" : "0 34px", border: `12px solid ${c}`, borderRadius: 26, fontFamily: DISPLAY, fontSize: long ? 150 : 300, lineHeight: 1.05, color: c, maxWidth: long ? 760 : undefined }}>{props.text}</div>
        </div>
      ) : null}
      {props.sub ? <Reveal at={at("sub", 9999)} style={{ position: "absolute", left: INSET, top: BAND_TOP + 520 }}><div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 58, color: page.text }}>{props.sub}</div></Reveal> : null}
      {props.pair ? (
        <div style={{ position: "absolute", left: INSET, top: BAND_TOP + 120, width: SAFE_W - 2 * INSET, display: "flex", flexDirection: "column", gap: 22 }}>
          {(["left", "right"] as const).map((k) => (
            <Reveal key={k} at={at(`pair.${k}`, 9999)} dx={-40} dy={0} sfx="pop">
              <div style={{ padding: "22px 28px", borderRadius: 24, background: page.card, border: `3px solid ${page.line}` }}>
                <Eyebrow>{props.pair![k].title}</Eyebrow>
                <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52, color: page.text, marginTop: 8, lineHeight: 1.15 }}>{props.pair![k].value}</div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}
    </>
  );
};
