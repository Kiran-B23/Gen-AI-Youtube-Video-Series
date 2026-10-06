import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, MONO, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { note: string; lines: string[]; sent: string; reaction: string };

/** A real anecdote, illustrated: freelancer at a desk (no face), sticky note falls, a dot notices, the invoice builds itself and flies off. */
export const StoryCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, at } = useScene<P>();
  const tNote = at("note", 10), tPulse = at("pulse", 50), tInv = at("invoice", 70), tSent = at("sent", 110), tReact = at("reaction", 150);
  const fall = interpolate(frame - tNote, [6, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fly = frame < tSent ? 0 : spring({ frame: frame - tSent, fps, config: { damping: 14, stiffness: 120 } });
  const ring = ((frame - tPulse) % 30) / 30;
  return (
    <>
      {/* desk scene */}
      <svg width={SAFE_W} height={520} viewBox="0 0 840 520" style={{ position: "absolute", left: 0, top: 545 }}>
        <rect x={40} y={330} width={760} height={24} rx={8} fill="#A07A5A" /><rect x={90} y={354} width={20} height={160} fill="#7A5A40" /><rect x={730} y={354} width={20} height={160} fill="#7A5A40" />
        <circle cx={250} cy={150} r={56} fill="#C98F6B" /><path d="M196 130 q54 -70 110 0" fill="#2B1E1E" />
        <path d="M150 330 q0 -120 100 -120 q100 0 100 120z" fill="#2EC4B6" />
        <rect x={390} y={210} width={260} height={120} rx={10} fill="#22264F" stroke="#fff" strokeWidth={4} /><rect x={370} y={326} width={300} height={10} rx={4} fill="#fff" />
        <rect x={690} y={280} width={44} height={50} rx={8} fill="#FF8A5B" />
        <g transform={`translate(${560 + fall * 60} ${200 + fall * 150}) rotate(${-8 + fall * 70})`} opacity={1 - fall * 0.2}>
          <rect x={0} y={0} width={130} height={110} fill="#FFE066" /><text x={65} y={64} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={26} fill="#0D1030">{props.note}</text>
        </g>
        {frame >= tPulse ? <><circle cx={520} cy={150} r={16} fill={th.colors.highlight} style={{ filter: `drop-shadow(0 0 16px ${th.colors.highlight})` }} />
          <circle cx={520} cy={150} r={16 + ring * 60} fill="none" stroke={th.colors.highlight} strokeWidth={4} opacity={1 - ring} /></> : null}
      </svg>
      {/* invoice builds itself, then flies away with Sent */}
      {frame >= tInv ? (
        <div style={{ position: "absolute", left: 80, top: 290, width: 680, transform: `translate(${fly * 420}px, ${-fly * 260}px) scale(${1 - fly * 0.6}) rotate(${fly * 8}deg)`, opacity: 1 - fly * 0.9 }}>
          <Glass glow={th.colors.highlight} style={{ padding: "26px 30px" }}>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, letterSpacing: "0.15em", color: th.colors.highlight }}>INVOICE #027</div>
            {props.lines.map((l, i) => <Reveal key={l} at={tInv + 6 + i * 7} dy={14} sfx="tick"><div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44, color: "#fff", marginTop: 12 }}>{l}</div></Reveal>)}
          </Glass>
        </div>
      ) : null}
      <Reveal at={tSent + 6} style={{ position: "absolute", left: 470, top: 250 }} sfx="ding">
        <span style={{ display: "inline-block", padding: "14px 26px", borderRadius: 999, background: th.colors.ok, color: "#0D1030", fontFamily: BODY, fontWeight: 900, fontSize: 48 }}>{props.sent}</span>
      </Reveal>
      {frame >= tReact ? new Array(9).fill(0).map((_, i) => {
        const t = frame - tReact - i * 3; if (t < 0) return null;
        return <div key={i} style={{ position: "absolute", left: 120 + random(`rx${i}`) * 600, top: 760 - t * 9, fontSize: 70 + random(`rs${i}`) * 40, opacity: Math.max(0, 1 - t / 40) }}>{props.reaction}</div>;
      }) : null}
    </>
  );
};
