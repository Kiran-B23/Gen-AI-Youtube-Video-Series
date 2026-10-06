import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, COL2_X, COL_W, DISPLAY, MONO } from "../theme/tokens";
import { useScene } from "./common";

type Side = { title: string; status?: string; tasks?: string[]; badge?: string; illustration?: "phone-call" | "office-night" };
type P = { mode: "chat-vs-dot" | "analogy"; left: Side; right: Side; verdictLine?: string };

const ChatWait: React.FC<{ s: Side; grey: number }> = ({ s, grey }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ filter: `grayscale(${grey})`, opacity: 1 - grey * 0.5 }}>
      <div style={{ height: 220, borderRadius: 22, background: "rgba(13,16,48,0.45)", border: "1.5px solid rgba(255,255,255,0.2)", padding: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.12)" }}>
          <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 40, color: "rgba(255,255,255,0.6)" }}>Ask anything</span>
          <span style={{ width: 4, height: 40, background: "#fff", opacity: Math.floor(frame / 10) % 2 ? 0 : 1 }} />
        </div>
      </div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: "rgba(255,255,255,0.75)", marginTop: 16 }}>{s.status}</div>
    </div>
  );
};

const DotTasks: React.FC<{ s: Side; badgeAt: number; clockAt: number }> = ({ s, badgeAt, clockAt }) => {
  const frame = useCurrentFrame();
  const th = useTheme();
  const n = s.tasks?.length ?? 3, k = (frame / 24) % n, i = Math.floor(k), f = k - i;
  const y = (j: number) => 10 + j * 80;
  const dotY = y(i) + (y((i + 1) % n) - y(i)) * Math.min(1, f * 1.6);
  const spin = frame >= clockAt ? (frame - clockAt) * 24 : 0;
  return (
    <div style={{ position: "relative", height: 340 }}>
      {(s.tasks ?? []).map((t, j) => (
        <div key={t} style={{ position: "absolute", left: 40, top: y(j), width: COL_W - 90, padding: "12px 16px", borderRadius: 14, background: j === i ? "rgba(255,193,69,0.22)" : "rgba(255,255,255,0.10)", border: "1.5px solid rgba(255,255,255,0.2)", fontFamily: BODY, fontWeight: 800, fontSize: 40, color: "#fff", whiteSpace: "nowrap" }}>{t}</div>
      ))}
      <div style={{ position: "absolute", left: 4, top: dotY + 20, width: 26, height: 26, borderRadius: "50%", background: th.colors.highlight, boxShadow: `0 0 24px ${th.colors.highlight}, 0 0 50px ${th.colors.tertiary}` }} />
      <Reveal at={badgeAt} style={{ position: "absolute", left: 20, top: 250 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "rgba(46,196,182,0.25)", border: `2px solid ${th.colors.secondary}`, fontFamily: BODY, fontWeight: 800, fontSize: 34, color: "#fff", whiteSpace: "nowrap" }}>☁️ {s.badge}</span>
      </Reveal>
      {frame >= clockAt ? <div style={{ position: "absolute", right: 6, top: 244, fontSize: 48, transform: `rotate(${spin}deg)` }}>🕒</div> : null}
    </div>
  );
};

/** Original line illustrations for the analogy mode. */
const Illustration: React.FC<{ kind: Side["illustration"]; nightAt: number }> = ({ kind, nightAt }) => {
  const frame = useCurrentFrame();
  const dark = interpolate(frame, [nightAt, nightAt + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (kind === "phone-call") return (
    <svg width={COL_W - 40} height={340} viewBox="0 0 360 340">
      <rect x={110} y={40} width={140} height={260} rx={26} fill="#151A45" stroke="#fff" strokeWidth={6} />
      <circle cx={180} cy={270} r={10} fill="#fff" />
      <path d="M200 10 h140 a18 18 0 0 1 18 18 v54 a18 18 0 0 1 -18 18 h-90 l-30 26 v-26 h-20 a18 18 0 0 1 -18 -18 v-54 a18 18 0 0 1 18 -18z" fill="#2EC4B6" />
      {[0, 1, 2].map((i) => <circle key={i} cx={250 + i * 30} cy={55} r={8} fill="#fff" opacity={0.4 + 0.6 * ((Math.floor(frame / 8) + i) % 3 === 0 ? 1 : 0)} />)}
    </svg>
  );
  return (
    <svg width={COL_W - 40} height={340} viewBox="0 0 360 340">
      <rect x={20} y={10} width={320} height={130} rx={12} fill={interpolate(dark, [0, 1], [0, 1]) > 0.5 ? "#0B0E25" : "#5B7BD6"} opacity={0.9} />
      {dark > 0.5 ? [[60, 40], [140, 90], [260, 50], [300, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="#fff" />) : null}
      <rect x={40} y={230} width={280} height={18} rx={6} fill="#A07A5A" />
      <rect x={60} y={248} width={14} height={80} fill="#7A5A40" /><rect x={286} y={248} width={14} height={80} fill="#7A5A40" />
      <rect x={110} y={180} width={110} height={50} rx={6} fill="#22264F" stroke="#fff" strokeWidth={3} />
      <line x1={270} y1={230} x2={270} y2={170} stroke="#fff" strokeWidth={5} /><path d="M245 170 h50 l-12 -28 h-26z" fill="#FFC145" />
      <path d="M248 172 L200 232 L340 232 L292 172 z" fill="#FFC145" opacity={0.18 + 0.3 * dark} />
    </svg>
  );
};

export const SplitCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, at, highlightAt } = useScene<P>();
  const tL = at("left", 0), tR = at("right", 10);
  const hl = highlightAt("left");
  const grey = Number.isFinite(hl) ? interpolate(frame, [hl, hl + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const tV = at("verdictLine", 9999);
  const v = frame < tV ? 0 : spring({ frame: frame - tV, fps, config: { damping: 11, stiffness: 180 } });
  const panel = (side: Side, x: number, t: number, body: React.ReactNode, glow?: string) => (
    <Reveal at={t} dx={x === 0 ? -50 : 50} dy={0} sfx="pop" style={{ position: "absolute", left: x, top: 320, width: COL_W }}>
      <Glass glow={glow} style={{ padding: 22, height: props.mode === "analogy" ? 560 : 450 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: props.mode === "analogy" ? 54 : 70, lineHeight: 1.05, color: "#fff", marginBottom: 18, minHeight: props.mode === "analogy" ? 116 : undefined }}>{side.title}</div>
        {body}
      </Glass>
    </Reveal>
  );
  return (
    <>
      {props.mode === "chat-vs-dot" ? (
        <>
          {panel(props.left, 0, tL, <ChatWait s={props.left} grey={grey} />)}
          {panel(props.right, COL2_X, tR, <DotTasks s={props.right} badgeAt={at("right.badge", 9999)} clockAt={at("clock", 9999)} />, th.colors.highlight)}
        </>
      ) : (
        <>
          {panel(props.left, 0, tL, <Illustration kind={props.left.illustration} nightAt={9999} />)}
          {panel(props.right, COL2_X, tR, <Illustration kind={props.right.illustration} nightAt={at("night", 9999)} />, th.colors.highlight)}
        </>
      )}
      {props.verdictLine && frame >= tV ? (
        <div style={{ position: "absolute", left: 0, top: 800, width: COL_W * 2 + 40, textAlign: "center", transform: `scale(${0.6 + 0.4 * v})`, opacity: Math.min(1, v * 2) }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 78, lineHeight: 1.05, color: "#fff" }}>{props.verdictLine.split(/(?<=\.)\s/)[0]} <span style={{ color: th.colors.highlight }}>{props.verdictLine.split(/(?<=\.)\s/).slice(1).join(" ")}</span></span>
        </div>
      ) : null}
    </>
  );
};
