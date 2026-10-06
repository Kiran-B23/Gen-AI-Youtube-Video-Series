import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, DISPLAY, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { points: { year: string; label: string }[]; versus?: { a: string; b: string; caption: string } };

/** A horizontal timeline that grows point by point, then a versus card. */
export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const th = useTheme();
  const { props, item, at } = useScene<P>();
  const times = props.points.map((_, i) => item("points", i, 40));
  const n = props.points.length, step = SAFE_W / n;
  const line = interpolate(frame, [times[0], times[n - 1] + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pal = th.rotation.map((k) => th.colors[k]);
  return (
    <>
      <div style={{ position: "absolute", left: step / 2, top: 460, width: (SAFE_W - step) * line, height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${pal.join(",")})` }} />
      {props.points.map((p, i) => (
        <Reveal key={p.year} at={times[i]} dy={30} sfx="pop" style={{ position: "absolute", left: i * step, top: 340, width: step, textAlign: "center" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 84, lineHeight: 1, color: i === n - 1 ? th.colors.highlight : "#fff" }}>{p.year}</div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: pal[i % 4], boxShadow: `0 0 20px ${pal[i % 4]}`, margin: "26px auto 22px" }} />
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 40, lineHeight: 1.15, color: "#fff", padding: "0 8px" }}>{p.label}</div>
        </Reveal>
      ))}
      {props.versus ? (
        <Reveal at={at("versus", 9999)} dy={40} sfx="pop" style={{ position: "absolute", left: 0, top: 700, width: SAFE_W }}>
          <Glass glow={th.colors.highlight} style={{ padding: "26px 30px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 96, color: "#fff" }}>{props.versus.a}</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 60, color: th.colors.highlight }}>VS</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 96, color: "#fff" }}>{props.versus.b}</span>
            </div>
            <div style={{ fontFamily: BODY, fontWeight: 900, fontSize: 42, color: "#fff", marginTop: 6, whiteSpace: "nowrap" }}>The race: {props.versus.caption}</div>
          </Glass>
        </Reveal>
      ) : null}
    </>
  );
};
