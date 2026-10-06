import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { GlowChip } from "../components/GlowChip";
import { EmojiPop, usePop } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { FONT, glow } from "../theme";

export const S08Cliff: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string) => wordFrame("s08", w);
  const tRival = at("rival"), tNobody = at("nobody");
  const s = usePop(tRival, 12, 150);
  const dark = interpolate(frame, [0, 20], [0, 0.45], { extrapolateRight: "clamp" });
  return (
    <SceneShell id="s08" extraPunches={[tRival]}>
      <AbsoluteFill style={{ background: `rgba(0,0,0,${dark})` }} />
      {frame >= tRival ? (
        <div style={{ position: "absolute", top: BAND_TOP + 40, left: SAFE_W / 2 - 230, width: 460, height: 460, borderRadius: 48, background: "rgba(10,8,30,0.9)", border: `5px dashed ${COLORS.pink}`, boxShadow: glow(COLORS.pink, 1), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: FONT, transform: `scale(${s}) rotate(${(1 - s) * 10}deg)` }}>
          <div style={{ fontSize: 210, fontWeight: 900, color: COLORS.pink, lineHeight: 1, filter: "blur(1px)" }}>?</div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "white", marginTop: 10 }}>A free rival</div>
        </div>
      ) : null}
      <div style={{ position: "absolute", top: BAND_TOP + 540, width: SAFE_W, display: "flex", justifyContent: "center", gap: 18 }}>
        <GlowChip label="FREE" color={COLORS.green} at={at("free")} fontSize={44} />
        <GlowChip label="OPEN-SOURCE" color={COLORS.cyan} at={at("open")} fontSize={44} rotate={8} />
      </div>
      <EmojiPop emoji="👀" at={tNobody} size={150} style={{ left: SAFE_W / 2 + 160, top: BAND_TOP - 40 }} />
    </SceneShell>
  );
};
