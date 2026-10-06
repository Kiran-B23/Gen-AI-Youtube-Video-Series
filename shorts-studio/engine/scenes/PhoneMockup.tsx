import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Counter, Reveal } from "../core/editorial";
import { BODY, DISPLAY, MONO, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { name: string; choices: { emoji: string; label: string }[]; poll?: string; counter: { to: number; suffix?: string; label: string }; steps: { icon: string; label: string }[] };

/** Setup walkthrough in three phases driven by spoken words: phone mockup -> app constellation + counter -> 3-step flow. */
export const PhoneMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, at, item } = useScene<P>();
  const tName = at("name", 0), tChoices = at("choices", 40), tPoll = at("poll", 9999), tCount = at("counter", 9999), tStep0 = item("steps", 0);
  const phoneOut = interpolate(frame, [tCount - 6, tCount + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const constOut = interpolate(frame, [tStep0 - 6, tStep0 + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = props.name.slice(0, Math.max(0, Math.floor((frame - tName) / 4)));
  const pal = th.rotation.map((k) => th.colors[k]);
  return (
    <>
      {/* phase 1: glass phone */}
      {phoneOut < 1 ? (
        <div style={{ position: "absolute", left: 40, top: 250, width: 440, opacity: 1 - phoneOut, transform: `scale(${1 - 0.2 * phoneOut})` }}>
          <Glass style={{ borderRadius: 54, padding: "40px 28px", height: 780 }}>
            <div style={{ width: 120, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.4)", margin: "0 auto 30px" }} />
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.15em", color: th.colors.highlight }}>NAME YOUR DOT</div>
            <div style={{ marginTop: 12, padding: "16px 20px", borderRadius: 18, background: "rgba(13,16,48,0.5)", border: "2px solid rgba(255,255,255,0.3)", fontFamily: BODY, fontWeight: 800, fontSize: 52, color: "#fff", minHeight: 64 }}>
              {typed}<span style={{ opacity: Math.floor(frame / 9) % 2 ? 0 : 1 }}>|</span>
            </div>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: "0.15em", color: th.colors.highlight, marginTop: 40 }}>PICK A CHARACTER</div>
            <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
              {props.choices.map((c, i) => {
                const a = tChoices + i * 5; const s = frame < a ? 0 : spring({ frame: frame - a, fps, config: { damping: 9, stiffness: 200 } });
                return (
                  <div key={c.label} style={{ position: "relative", width: 112, height: 150, borderRadius: 24, background: "rgba(255,255,255,0.14)", border: `2px solid ${pal[i]}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${s})` }}>
                    <span style={{ fontSize: 64 }}>{c.emoji}</span>
                    <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, color: "#fff" }}>{c.label}</span>
                    <span style={{ position: "absolute", top: -14, left: -10, width: 44, height: 44, borderRadius: "50%", background: pal[i], color: "#0D1030", fontFamily: DISPLAY, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 36, color: "rgba(255,255,255,0.8)", marginTop: 40 }}>@you-dot</div>
          </Glass>
        </div>
      ) : null}
      {props.poll && phoneOut < 1 ? (
        <Reveal at={tPoll} dx={40} dy={0} style={{ position: "absolute", left: 500, top: 540, width: 330, opacity: 1 - phoneOut }} sfx="pop">
          <Glass glow={th.colors.highlight} style={{ padding: "22px 22px", borderRadius: "30px 30px 30px 6px" }}>
            <div style={{ fontFamily: BODY, fontWeight: 900, fontSize: 46, lineHeight: 1.12, color: "#fff" }}>{props.poll}</div>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, color: th.colors.highlight, marginTop: 10 }}>1 · 2 · 3</div>
          </Glass>
        </Reveal>
      ) : null}
      {/* phase 2: one dot explodes into a constellation of apps */}
      {frame >= tCount - 6 && constOut < 1 ? (
        <div style={{ position: "absolute", left: 0, top: 230, width: SAFE_W, height: 760, opacity: phoneOut * (1 - constOut) }}>
          <svg width={SAFE_W} height={760} style={{ position: "absolute", inset: 0 }}>
            {new Array(160).fill(0).map((_, i) => {
              const p = interpolate(frame - tCount - (i % 20), [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const ang = random(`a${i}`) * Math.PI * 2, r = 60 + random(`r${i}`) * 340;
              const x = 420 + Math.cos(ang) * r * p, y = 330 + Math.sin(ang) * r * 0.85 * p;
              return <g key={i}>{i % 7 === 0 ? <line x1={420} y1={330} x2={x} y2={y} stroke="#fff" strokeOpacity={0.12 * p} /> : null}<circle cx={x} cy={y} r={2 + random(`s${i}`) * 4} fill={pal[i % 4]} opacity={0.9} /></g>;
            })}
            <circle cx={420} cy={330} r={22} fill={th.colors.highlight} style={{ filter: `drop-shadow(0 0 20px ${th.colors.highlight})` }} />
          </svg>
          <div style={{ position: "absolute", left: 0, top: 500, width: SAFE_W, textAlign: "center" }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 200, lineHeight: 1, color: "#fff", textShadow: `0 0 40px ${th.colors.highlight}` }}><Counter to={props.counter.to} at={tCount} duration={30} suffix={props.counter.suffix} /></div>
            <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 56, color: "#fff" }}>{props.counter.label}</div>
          </div>
        </div>
      ) : null}
      {/* phase 3: goal -> works on its own -> back for approval */}
      {frame >= tStep0 - 6 ? (
        <div style={{ position: "absolute", left: 60, top: 360, width: SAFE_W - 120, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0, opacity: constOut }}>
          {props.steps.map((st, i) => (
            <React.Fragment key={st.label}>
              {i > 0 ? <Reveal at={item("steps", i) - 4} dy={-10}><div style={{ textAlign: "center", fontSize: 54, color: "#fff", lineHeight: 1.3 }}>↓</div></Reveal> : null}
              <Reveal at={item("steps", i)} dx={-40} dy={0} sfx="pop">
                <Glass glow={pal[i]} style={{ display: "flex", alignItems: "center", gap: 22, padding: "26px 30px" }}>
                  <span style={{ fontSize: 64 }}>{st.icon}</span><span style={{ fontFamily: BODY, fontWeight: 900, fontSize: 54, color: "#fff" }}>{st.label}</span>
                </Glass>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};
