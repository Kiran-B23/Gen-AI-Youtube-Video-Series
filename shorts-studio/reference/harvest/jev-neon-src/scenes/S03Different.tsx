import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, wordFrame } from "../config";
import { GlowChip } from "../components/GlowChip";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Slam } from "../components/Kinetic";
import { FONT, glow } from "../theme";

const LLM_TEXT = "Sure! This looks like a billing issue, because the customer mentions being charged twice, so I would route";
const RIGHT_X = 350, RIGHT_W = SAFE_W - RIGHT_X;
const JEV = { x: RIGHT_X + RIGHT_W / 2, y: BAND_TOP + 520 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** One continuous animation: the LLM types word by word while Jev takes a ticket + questions and fires all answers at once. */
export const S03Different: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (w: string, n = 0) => wordFrame("s03", w, n);
  const tLLM = at("llm"), tTicket = at("ticket"), tQ = at("questions"), tPass = at("pass"), tAns = at("answers"), tConf = at("confidence"), tSys = at("system");
  const words = LLM_TEXT.split(" ");
  const shown = frame < tLLM ? 0 : Math.min(words.length, 1 + Math.floor((frame - tLLM) / 7));
  const absorb = interpolate(frame, [tPass, tPass + 12], [0, 1], clamp);
  const gulp = interpolate(frame, [tPass + 10, tPass + 16, tPass + 30], [0, 1, 0], clamp);
  const qs = ["Team?", "Urgent?", "Frustration 1–5?"];
  const answers = [
    { label: "Team: billing 97%", color: COLORS.green },
    { label: "Urgent? Yes 88%", color: COLORS.cyan },
    { label: "Frustration: 4/5", color: COLORS.yellow },
  ];
  const conf = frame >= tConf ? 1 + 0.6 * Math.abs(Math.sin((frame - tConf) / 6)) : 1;
  return (
    <SceneShell id="s03" extraPunches={[tAns]}>
      <div style={{ position: "absolute", top: 60, width: SAFE_W, textAlign: "center" }}>
        {frame < tSys ? (
          <Slam at={at("decides")} fontSize={70} rotate={-2} from={1.8}>LLMs write ✍️ Jev decides 🎯</Slam>
        ) : (
          <Slam at={tSys} fontSize={52} rotate={-2} from={1.6} color={COLORS.pink}>🧠 TypeSafe: “System One”<br /><span style={{ color: "white", fontSize: 44 }}>after Kahneman's fast thinking</span></Slam>
        )}
      </div>
      {/* LLM typing */}
      <div style={{ position: "absolute", left: 0, top: BAND_TOP, width: 320, height: 640, borderRadius: 32, background: "rgba(12,10,45,0.85)", border: `4px solid ${COLORS.pink}`, boxShadow: glow(COLORS.pink, 0.4), padding: 24, boxSizing: "border-box", fontFamily: FONT, overflow: "hidden" }}>
        <div style={{ fontWeight: 900, fontSize: 48, color: COLORS.pink, marginBottom: 14 }}>LLM</div>
        <div style={{ fontWeight: 600, fontSize: 40, lineHeight: 1.28, color: "white" }}>{words.slice(0, shown).join(" ")}<span style={{ color: COLORS.pink, opacity: Math.floor(frame / 8) % 2 ? 0.2 : 1 }}>▍</span></div>
      </div>
      {/* ticket + questions fly into JEV */}
      {frame >= tTicket && absorb < 1 ? (
        <div style={{ position: "absolute", left: RIGHT_X, top: BAND_TOP, width: RIGHT_W, padding: "18px 22px", borderRadius: 24, background: "#fff", color: "#120A2E", fontFamily: FONT, fontWeight: 800, fontSize: 42, boxSizing: "border-box", transform: `translate(${(JEV.x - RIGHT_X - RIGHT_W / 2) * absorb}px, ${(JEV.y - BAND_TOP - 50) * absorb}px) scale(${spring({ frame: frame - tTicket, fps, config: { damping: 12 } }) * (1 - 0.8 * absorb)})`, opacity: 1 - absorb }}>
          🎫 “I was charged twice!!”
        </div>
      ) : null}
      {qs.map((q, i) => {
        if (frame < tQ + i * 4 || absorb >= 1) return null;
        const y = BAND_TOP + 130 + i * 84;
        const s = spring({ frame: frame - tQ - i * 4, fps, config: { damping: 12 } });
        return (
          <div key={q} style={{ position: "absolute", left: RIGHT_X, top: y, width: RIGHT_W, height: 70, borderRadius: 18, border: `3px solid ${COLORS.cyan}`, background: "rgba(12,10,45,0.9)", display: "flex", alignItems: "center", paddingLeft: 20, boxSizing: "border-box", fontFamily: FONT, fontWeight: 800, fontSize: 40, color: "white", transform: `translate(${(1 - s) * 500 + (JEV.x - RIGHT_X - RIGHT_W / 2) * absorb}px, ${(JEV.y - y - 35) * absorb}px) scale(${1 - 0.8 * absorb})`, opacity: 1 - absorb }}>
            <span style={{ color: COLORS.cyan, marginRight: 12 }}>Q{i + 1}</span>{q}
          </div>
        );
      })}
      {/* pulsing JEV block */}
      <div style={{ position: "absolute", left: JEV.x - 150, top: JEV.y - 60, width: 300, height: 120, borderRadius: 30, background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`, boxShadow: glow(COLORS.green, 1 + gulp * 1.5), transform: `scale(${(1 + Math.sin(frame / 6) * 0.03 + gulp * 0.12) * spring({ frame: frame - tTicket, fps, config: { damping: 12 } })})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 900, fontSize: 80, color: "#120A2E", letterSpacing: 4 }}>JEV</div>
      {/* answers fire out together */}
      {answers.map((a, i) => {
        if (frame < tAns) return null;
        const s = spring({ frame: frame - tAns, fps, config: { damping: 12, stiffness: 160 } });
        const ty = BAND_TOP + 30 + i * 100;
        return (
          <div key={a.label} style={{ position: "absolute", left: RIGHT_X + 10, top: 0, transform: `translate(0px, ${JEV.y - 40 + (ty - JEV.y + 40) * s}px)` }}>
            <GlowChip label={a.label} color={a.color} at={tAns} fontSize={40} sfx={i === 0} style={{ boxShadow: glow(a.color, 0.8 * conf) }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: RIGHT_X + 10, top: BAND_TOP + 330 }}>
        <SourcePill text="Illustrative example" at={tAns} />
      </div>
    </SceneShell>
  );
};
