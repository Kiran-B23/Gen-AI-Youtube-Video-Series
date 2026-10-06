import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { FONT } from "../theme";

/** End card of Part 1 (silent). */
export const SNext: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell id="next" captions={false}>
      <div style={{ position: "absolute", top: BAND_TOP + 140, width: SAFE_W, textAlign: "center" }}>
        <Slam at={4} fontSize={150} color={COLORS.cyan}>Part 2 <span style={{ display: "inline-block", transform: `translateX(${Math.abs(Math.sin(frame / 6)) * 24}px)` }}>→</span></Slam>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 52, color: "white", marginTop: 30, opacity: frame > 14 ? 1 : 0 }}>The free rival nobody's talking about 👀</div>
      </div>
    </SceneShell>
  );
};
