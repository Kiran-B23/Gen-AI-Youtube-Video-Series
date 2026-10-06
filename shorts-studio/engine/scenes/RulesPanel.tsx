import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, DISPLAY, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { title: string; options: string[]; tip?: string; locked?: string };

/** A shield assembles from dots, then the Custom Rules panel lights each option as it's said. */
export const RulesPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const th = useTheme();
  const { props, at, item } = useScene<P>();
  const tShield = at("shield", 0), tPanel = at("panel", 30);
  // sample 36 points evenly along a shield outline
  const poly = [[30, 26], [170, 26], [170, 92], [100, 176], [30, 92], [30, 26]];
  const segs = poly.slice(1).map((q, i) => Math.hypot(q[0] - poly[i][0], q[1] - poly[i][1]));
  const perim = segs.reduce((a, b) => a + b, 0);
  const pts = new Array(36).fill(0).map((_, k) => {
    let d = (k / 36) * perim, i = 0;
    while (d > segs[i]) { d -= segs[i]; i++; }
    const u = d / segs[i];
    return { x: poly[i][0] + (poly[i + 1][0] - poly[i][0]) * u, y: poly[i][1] + (poly[i + 1][1] - poly[i][1]) * u };
  });
  const p = interpolate(frame - tShield, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <svg width={200} height={200} style={{ position: "absolute", left: SAFE_W / 2 - 100, top: 150 }}>
        {pts.map((q, i) => <circle key={i} cx={(random(`sx${i}`) * 200) * (1 - p) + q.x * p} cy={(random(`sy${i}`) * 200) * (1 - p) + q.y * p} r={5} fill={th.colors.secondary} opacity={frame >= tShield ? 1 : 0} style={{ filter: `drop-shadow(0 0 6px ${th.colors.secondary})` }} />)}
        {p >= 1 ? <text x={100} y={112} textAnchor="middle" fontSize={56}>✓</text> : null}
      </svg>
      <Reveal at={tPanel} style={{ position: "absolute", left: 0, top: 380, width: SAFE_W }}>
        <Glass style={{ padding: "26px 30px" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 64, color: "#fff", marginBottom: 12 }}>{props.title}</div>
          {props.options.map((o, i) => {
            const on = frame >= item("options", i, 20);
            return (
              <div key={o} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: "1.5px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 46, color: on ? "#fff" : "rgba(255,255,255,0.45)" }}>{o}</span>
                <span style={{ width: 92, height: 50, borderRadius: 25, background: on ? th.colors.secondary : "rgba(255,255,255,0.18)", position: "relative" }}>
                  <span style={{ position: "absolute", top: 5, left: on ? 47 : 5, width: 40, height: 40, borderRadius: "50%", background: "#fff" }} />
                </span>
              </div>
            );
          })}
          {props.tip ? <Reveal at={at("tip", 9999)} style={{ marginTop: 14 }} sfx="pop"><span style={{ display: "inline-block", padding: "10px 18px", borderRadius: 14, background: "rgba(255,193,69,0.28)", border: `2px solid ${th.colors.highlight}`, fontFamily: BODY, fontWeight: 800, fontSize: 40, color: "#fff" }}>💡 {props.tip}</span></Reveal> : null}
        </Glass>
      </Reveal>
      {props.locked ? (
        <Reveal at={at("locked", 9999)} dy={30} sfx="pop" style={{ position: "absolute", left: 0, top: 920, width: SAFE_W }}>
          <Glass glow={th.colors.secondary} style={{ padding: "18px 26px", fontFamily: BODY, fontWeight: 900, fontSize: 46, color: "#fff" }}>{props.locked}</Glass>
        </Reveal>
      ) : null}
    </>
  );
};
