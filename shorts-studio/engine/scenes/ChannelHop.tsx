import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, COL2_X, COL_W, MONO } from "../theme/tokens";
import { useScene } from "./common";

type P = { channels: string[]; call: string; ring: string };
const ICONS = ["💬", "#", "👥"];

/** The dot hops between generic chat windows (text labels only, no logos), then a call screen; a style ring fills. */
export const ChannelHop: React.FC = () => {
  const frame = useCurrentFrame();
  const th = useTheme();
  const { props, item, at } = useScene<P>();
  const tCall = at("call", 9999), tRing = at("ring", 9999);
  const slots = [...props.channels, props.call];
  const times = [...props.channels.map((_, i) => item("channels", i, 20)), tCall];
  const cur = times.reduce((a, t, i) => (frame >= t ? i : a), 0);
  const pos = (i: number) => ({ x: (i % 2) * COL2_X, y: 270 + Math.floor(i / 2) * 290 });
  const prev = Math.max(0, cur - 1), hopP = interpolate(frame - times[cur], [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dx = pos(prev).x + (pos(cur).x - pos(prev).x) * hopP + COL_W - 40, dy = pos(prev).y + (pos(cur).y - pos(prev).y) * hopP - 10 - Math.sin(hopP * Math.PI) * 80;
  const ringP = interpolate(frame - tRing, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      {slots.map((label, i) => (
        <Reveal key={label} at={times[i]} dy={30} sfx="pop" style={{ position: "absolute", left: pos(i).x, top: pos(i).y, width: COL_W }}>
          <Glass glow={i === cur ? th.colors.highlight : undefined} style={{ padding: 20, height: 250 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 54, height: 54, borderRadius: 14, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 700, fontSize: 34, color: "#fff" }}>{i < 3 ? ICONS[i] : "📞"}</span>
              <span style={{ fontFamily: BODY, fontWeight: 900, fontSize: 44, color: "#fff" }}>{label}</span>
            </div>
            {i < 3 ? (
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ alignSelf: "flex-start", padding: "10px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.16)", fontFamily: BODY, fontWeight: 700, fontSize: 36, color: "#fff" }}>Plan my week?</div>
                <div style={{ alignSelf: "flex-end", padding: "10px 16px", borderRadius: "18px 18px 4px 18px", background: "rgba(255,193,69,0.35)", fontFamily: BODY, fontWeight: 700, fontSize: 36, color: "#fff" }}>On it ✓</div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 6, height: 140, justifyContent: "center" }}>
                {new Array(22).fill(0).map((_, k) => <div key={k} style={{ width: 8, height: 14 + 90 * Math.abs(Math.sin(k * 0.8 + frame / 4)) * (frame >= tCall ? 1 : 0.1), borderRadius: 4, background: th.colors.secondary }} />)}
              </div>
            )}
          </Glass>
        </Reveal>
      ))}
      <div style={{ position: "absolute", left: dx, top: dy, width: 32, height: 32, borderRadius: "50%", background: th.colors.highlight, boxShadow: `0 0 26px ${th.colors.highlight}, 0 0 60px ${th.colors.tertiary}` }} />
      <Reveal at={tRing} style={{ position: "absolute", left: 0, top: 850, display: "flex", alignItems: "center", gap: 24 }}>
        <svg width={170} height={170} viewBox="0 0 170 170">
          <circle cx={85} cy={85} r={70} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={16} />
          <circle cx={85} cy={85} r={70} fill="none" stroke={th.colors.secondary} strokeWidth={16} strokeLinecap="round" strokeDasharray={`${440 * ringP} 440`} transform="rotate(-90 85 85)" />
          <text x={85} y={98} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={38} fill="#fff">{Math.round(ringP * 100)}%</text>
        </svg>
        <span style={{ fontFamily: BODY, fontWeight: 900, fontSize: 56, color: "#fff" }}>{props.ring}</span>
      </Reveal>
    </>
  );
};
