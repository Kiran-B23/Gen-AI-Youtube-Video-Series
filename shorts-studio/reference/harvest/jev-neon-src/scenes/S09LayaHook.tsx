import React from "react";
import { COLORS, wordFrame } from "../config";
import { GlowChip } from "../components/GlowChip";
import { Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";

/** Part 2's own hook: the question is on screen from frame 0. */
export const S09LayaHook: React.FC = () => {
  const at = (w: string) => wordFrame("s09", w);
  return (
    <SceneShell id="s09">
      <div style={{ position: "absolute", top: BAND_TOP - 40, width: SAFE_W, textAlign: "center" }}>
        <Slam at={-30} fontSize={100} rotate={-3}>Why is <span style={{ color: COLORS.pink }}>NO ONE</span> talking about <span style={{ color: COLORS.green }}>Laya</span>? 🤫</Slam>
      </div>
      <div style={{ position: "absolute", top: BAND_TOP + 400, width: SAFE_W, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
        <GlowChip label="Free" icon="💸" color={COLORS.green} at={at("free")} fontSize={48} />
        <GlowChip label="Open-source" icon="🔓" color={COLORS.cyan} at={at("open")} fontSize={48} rotate={8} />
        <GlowChip label="Runs on your laptop" icon="💻" color={COLORS.yellow} at={at("laptop")} fontSize={48} />
      </div>
    </SceneShell>
  );
};
