import React, { useContext } from "react";
import { AbsoluteFill, Freeze, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SAFE, sceneFrames, wordFrame } from "../config";
import { SilentCtx } from "../components/Audio";
import { Confetti, Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneCtx, SceneShell } from "../components/SceneShell";
import { FONT, glow } from "../theme";
import { usePop } from "../components/Kinetic";

/** Ending + follow CTA. The last frames dissolve into the composition's own first frame for a seamless loop. */
export const S16Ending: React.FC<{ loop?: React.FC }> = ({ loop: Loop }) => {
  const frame = useCurrentFrame();
  const ctx = useContext(SceneCtx);
  const at = (w: string) => wordFrame("s16", w);
  const tSlow = at("slow"), tFast = at("fast"), tBoth = at("both"), tFollow = at("follow");
  const out = interpolate(frame, [tBoth - 2, tBoth + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const btn = usePop(tFollow, 8, 160);
  const dur = sceneFrames("s16");
  const loopIn = interpolate(frame, [dur - 12, dur - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <SceneShell id="s16" extraPunches={[tBoth]}>
        <div style={{ position: "absolute", top: BAND_TOP - 20, width: SAFE_W, textAlign: "center", opacity: 1 - out, transform: `translateY(${out * 200}px) scale(${1 - 0.4 * out})` }}>
          <Slam at={tSlow} fontSize={84} color={COLORS.pink} rotate={-3}>LLMs think slow. 🐢</Slam>
          <div style={{ height: 40 }} />
          <Slam at={tFast} fontSize={84} color={COLORS.green} rotate={3}>Decision models think fast. ⚡</Slam>
        </div>
        {frame >= tBoth ? (
          <div style={{ position: "absolute", top: BAND_TOP + 60, width: SAFE_W, textAlign: "center" }}>
            <Slam at={tBoth} fontSize={170} rotate={-4} style={{ background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.yellow}, ${COLORS.green})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "none", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}>Use both.</Slam>
          </div>
        ) : null}
        {frame >= tFollow ? (
          <div style={{ position: "absolute", top: BAND_TOP + 420, width: SAFE_W, display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "30px 80px", borderRadius: 999, background: `linear-gradient(90deg, ${COLORS.pink}, #FF6B6B)`, boxShadow: glow(COLORS.pink, 1.1), fontFamily: FONT, fontWeight: 900, fontSize: 70, color: "white", transform: `translateY(${Math.abs(Math.sin((frame - tFollow) / 7)) * -22}px) scale(${btn})` }}>+ Follow 🚀</div>
          </div>
        ) : null}
      </SceneShell>
      <Confetti at={tBoth} x={SAFE.left + SAFE_W / 2} y={SAFE.top + BAND_TOP + 160} count={110} />
      {Loop && loopIn > 0 ? (
        <AbsoluteFill style={{ opacity: loopIn }}>
          <SilentCtx.Provider value>
            <SceneCtx.Provider value={{ ...ctx, globalStart: 0, first: true }}>
              <Freeze frame={0}><Loop /></Freeze>
            </SceneCtx.Provider>
          </SilentCtx.Provider>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
