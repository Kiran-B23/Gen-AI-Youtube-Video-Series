import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Sfx } from "../components/Audio";
import { GlowChip } from "../components/GlowChip";
import { Flash, Slam, useShake } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { FONT } from "../theme";

export const S05Replace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (w: string, n = 0) => wordFrame("s05", w, n);
  const tNo = at("nope"), tEmails = at("emails"), tDecides = at("decides"), tHundred = at("hundred"), tThousand = at("thousand"), tBigger = at("bigger");
  const stamp = spring({ frame: frame - tNo, fps, config: { damping: 10, stiffness: 240, mass: 0.7 } });
  const shrink = interpolate(frame, [tEmails - 2, tEmails + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = useShake(tNo + 3, 26, 14);
  const math = frame >= tHundred;
  return (
    <SceneShell id="s05" extraPunches={[tNo, tBigger]}>
      <AbsoluteFill style={{ transform: shake }}>
        {frame < tNo ? (
          <div style={{ position: "absolute", top: BAND_TOP + 160, width: SAFE_W, textAlign: "center" }}>
            <Slam at={0} fontSize={96} rotate={-3}>Will it replace LLMs? 🤔</Slam>
          </div>
        ) : null}
        {frame >= tNo && !math ? (
          <div style={{ position: "absolute", top: 0, left: 0, width: SAFE_W, height: BAND_TOP + 640, display: "flex", justifyContent: "center", alignItems: "center", transform: `translateY(${-310 * shrink}px) scale(${1 - 0.55 * shrink})` }}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 330, lineHeight: 1, color: COLORS.pink, padding: "0 36px", border: `16px solid ${COLORS.pink}`, borderRadius: 40, textShadow: `0 0 50px ${COLORS.pink}AA`, boxShadow: `0 0 60px ${COLORS.pink}88`, background: "rgba(20,8,40,0.6)", transform: `scale(${3 - 2 * stamp}) rotate(${-10 + (1 - stamp) * -20}deg)`, opacity: Math.min(1, stamp * 3) }}>NO.</div>
          </div>
        ) : null}
        {frame >= tEmails && !math ? (
          <div style={{ position: "absolute", top: BAND_TOP + 90, width: SAFE_W, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
            {[["emails", at("emails")], ["code", at("code")], ["explanations", at("explanations")]].map(([l, t]) => (
              <GlowChip key={l as string} label={<span style={{ textDecoration: "line-through", textDecorationThickness: 5 }}>{l}</span>} icon="✕" color={COLORS.red} filled={false} at={t as number} fontSize={46} />
            ))}
          </div>
        ) : null}
        {frame >= tDecides && !math ? (
          <div style={{ position: "absolute", top: BAND_TOP + 400, width: SAFE_W, display: "flex", justifyContent: "center", gap: 20 }}>
            <GlowChip label="Jev decides" icon="🎯" color={COLORS.green} at={tDecides} fontSize={46} />
            <GlowChip label="LLM talks" icon="💬" color={COLORS.cyan} at={at("talks")} fontSize={46} rotate={8} />
          </div>
        ) : null}
        {math ? (
          <div style={{ position: "absolute", top: BAND_TOP + 10, width: SAFE_W, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontFamily: FONT }}>
            <Slam at={tHundred} fontSize={84} color={COLORS.green} from={1.8}>100x cheaper</Slam>
            {frame >= tThousand ? <Slam at={tThousand} fontSize={70} color={COLORS.white} from={1.8}>×</Slam> : null}
            <Slam at={tThousand} fontSize={84} color={COLORS.cyan} from={1.8}>1,000x more calls</Slam>
            {frame >= tBigger ? <Slam at={tBigger - 4} fontSize={70} from={1.8}>=</Slam> : null}
            <Slam at={tBigger} fontSize={96} color={COLORS.yellow} rotate={-5}>10x BIGGER bill 😅</Slam>
            <SourcePill text="Illustrative math" at={tHundred} />
          </div>
        ) : null}
      </AbsoluteFill>
      <Flash at={tNo} color={COLORS.pink} peak={0.5} />
      <Sfx name="stamp" at={tNo} />
    </SceneShell>
  );
};
