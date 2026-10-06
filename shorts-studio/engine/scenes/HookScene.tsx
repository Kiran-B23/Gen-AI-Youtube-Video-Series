import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { Sfx } from "../audio/AudioMix";
import { BODY, DISPLAY, INSET, MONO, SAFE_W } from "../theme/tokens";
import { useTheme } from "../core/context";
import { useScene } from "./common";

type P = { clock: string; title: string; subtitle?: string; notifications: { emoji: string; text: string }[] };

/** Original flat illustration: dark bedroom at 3 AM, sleeping figure (no face), phone on the nightstand. */
export const Bedroom: React.FC<{ phoneOn: number; clock: string; dim?: number }> = ({ phoneOn, clock, dim = 0 }) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame - phoneOn, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (0.85 + 0.15 * Math.sin(frame / 5));
  const z = (i: number) => ((frame + i * 25) % 75) / 75;
  return (
    <svg width={SAFE_W} height={760} viewBox="0 0 840 760" style={{ position: "absolute", left: 0, top: 300, opacity: 1 - dim }}>
      {/* window with moon + stars */}
      <rect x={470} y={20} width={320} height={260} rx={18} fill="#1B2260" stroke="#2C3478" strokeWidth={10} />
      <circle cx={690} cy={95} r={38} fill="#F4F1DE" /><circle cx={706} cy={84} r={34} fill="#1B2260" />
      {[[520, 70], [560, 160], [610, 60], [745, 200], [650, 210], [540, 230]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="#fff" opacity={0.5 + 0.5 * Math.sin(frame / 9 + i)} />)}
      <line x1={630} y1={20} x2={630} y2={280} stroke="#2C3478" strokeWidth={8} />
      {/* bed */}
      <rect x={10} y={420} width={150} height={260} rx={20} fill="#2A2F6B" />
      <rect x={60} y={520} width={560} height={110} rx={28} fill="#3A3F86" />
      <rect x={60} y={620} width={560} height={40} rx={12} fill="#232861" />
      <ellipse cx={170} cy={500} rx={80} ry={36} fill="#E8E6F2" opacity={0.9} />
      {/* sleeping figure: head + blanket hump, no face */}
      <circle cx={190} cy={470} r={44} fill="#C98F6B" /><path d="M140 452 q50 -50 100 0" fill="#3B2A2A" />
      <path d="M200 520 q140 -90 300 -30 q90 30 120 30 l0 40 l-420 0 z" fill="#6C63FF" opacity={0.95} />
      {[0, 1, 2].map((i) => <text key={i} x={250 + i * 26} y={420 - z(i) * 120} fontFamily={DISPLAY} fontSize={34 + i * 6} fill="#fff" opacity={1 - z(i)}>z</text>)}
      {/* nightstand + clock + phone */}
      <rect x={650} y={520} width={170} height={160} rx={14} fill="#2A2F6B" />
      <rect x={668} y={470} width={134} height={52} rx={10} fill="#0B0E25" />
      <text x={735} y={507} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={32} fill="#FF5A5F">{clock.replace(" AM", "")}</text>
      <g transform={`translate(700 ${445 - glow * 6})`}>
        <ellipse cx={34} cy={18} rx={110 * glow} ry={70 * glow} fill="#FFC145" opacity={0.18 * glow} />
        <rect x={0} y={0} width={68} height={22} rx={6} fill={glow > 0.05 ? "#FFE6A8" : "#151A45"} stroke="#0B0E25" strokeWidth={3} />
      </g>
    </svg>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, at, item } = useScene<P>();
  const tPhone = at("phone", 30), tBurst = at("title", 9999);
  const dim = interpolate(frame, [tBurst - 4, tBurst + 10], [0, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tTitle = tBurst + 12;
  const t = frame < tTitle ? 0 : spring({ frame: frame - tTitle, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <>
      <Bedroom phoneOn={tPhone} clock={props.clock} dim={dim * 0.8} />
      {/* big time on frame 0 = the hook is striking immediately */}
      <div style={{ position: "absolute", left: INSET, top: 150, opacity: 1 - dim }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 210, lineHeight: 0.9, color: "#fff", textShadow: "0 0 40px rgba(108,99,255,0.6)" }}>{props.clock.replace(" AM", "")}<span style={{ fontSize: 90, color: th.colors.highlight }}> AM</span></div>
      </div>
      {props.notifications.map((n, i) => {
        const a = item("notifications", i, 30);
        const s = frame < a ? 0 : spring({ frame: frame - a, fps, config: { damping: 13, stiffness: 170 } });
        return frame < a ? null : (
          <div key={i} style={{ position: "absolute", left: INSET, top: 380 + i * 118, width: SAFE_W - 2 * INSET, transform: `translateX(${(1 - s) * 700}px) translateY(${-dim * 260}px)`, opacity: 1 - dim }}>
            <Glass glow={th.colors.highlight} style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 24px" }}>
              <span style={{ fontSize: 48 }}>{n.emoji}</span>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 42, color: "#fff" }}>{n.text}</span>
            </Glass>
            <Sfx name="pop" at={a} />
          </div>
        );
      })}
      {/* burst: glowing dots rush in and form the title */}
      {frame >= tBurst ? new Array(90).fill(0).map((_, i) => {
        const p = interpolate(frame - tBurst, [0, 14], [0, 1], { extrapolateRight: "clamp" });
        const sx = random(`bx${i}`) * 1000 - 80, sy = random(`by${i}`) * 1400 - 100;
        const tx = INSET + 40 + random(`tx${i}`) * 640, ty = 520 + random(`ty${i}`) * 200;
        const c = th.rotation.map((k) => th.colors[k])[i % 4];
        return <div key={i} style={{ position: "absolute", left: sx + (tx - sx) * p, top: sy + (ty - sy) * p, width: 12, height: 12, borderRadius: "50%", background: c, boxShadow: `0 0 14px ${c}`, opacity: 1 - t * 0.9 }} />;
      }) : null}
      {frame >= tTitle ? (
        <div style={{ position: "absolute", left: INSET, top: 470, transform: `scale(${0.7 + 0.3 * t})`, transformOrigin: "0% 50%", opacity: Math.min(1, t * 2) }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 280, lineHeight: 0.9, background: `linear-gradient(90deg, ${th.colors.highlight}, ${th.colors.tertiary}, ${th.colors.primary})`, WebkitBackgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 30px rgba(255,193,69,0.5))" }}>{props.title}</div>
          {props.subtitle ? <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 56, color: "#fff", marginTop: 10 }}>{props.subtitle}</div> : null}
        </div>
      ) : null}
      <Sfx name="riser" at={tBurst - 10} />
    </>
  );
};
