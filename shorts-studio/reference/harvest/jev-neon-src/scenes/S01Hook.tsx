import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { GlowChip } from "../components/GlowChip";
import { EmojiPop, Slam } from "../components/Kinetic";
import { BAND_TOP, COL2_X, COL_W, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { FONT, glow } from "../theme";

const PARAGRAPH = "Great question! Based on the details you shared, it sounds like this ticket is most likely related to";

/** Split screen: a chatbot slowly typing vs Jev's instant answer. Fully visible on frame 0. */
export const HookSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = PARAGRAPH.slice(0, 18 + Math.floor(frame * 0.55));
  const panel = (left: number, color: string): React.CSSProperties => ({ position: "absolute", left, top: BAND_TOP + 20, width: COL_W, height: 600, borderRadius: 36, background: "rgba(12,10,45,0.85)", border: `4px solid ${color}`, boxShadow: glow(color, 0.5), padding: 30, boxSizing: "border-box", fontFamily: FONT, overflow: "hidden" });
  return (
    <>
      <div style={panel(0, COLORS.pink)}>
        <div style={{ fontWeight: 900, fontSize: 52, color: COLORS.pink, marginBottom: 18 }}>Chatbot 💬</div>
        <div style={{ fontWeight: 600, fontSize: 40, lineHeight: 1.3, color: "white" }}>
          {typed}
          <span style={{ color: COLORS.pink, opacity: Math.floor(frame / 8) % 2 ? 0.2 : 1 }}>▍</span>
        </div>
      </div>
      <div style={panel(COL2_X, COLORS.green)}>
        <div style={{ fontWeight: 900, fontSize: 52, color: COLORS.green, marginBottom: 18 }}>Jev ⚡</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 140 }}>
          <GlowChip label="billing" icon="✓" color={COLORS.green} at={-30} fontSize={60} sfx={false} />
        </div>
        <div style={{ textAlign: "center", marginTop: 40, fontWeight: 800, fontSize: 40, color: COLORS.dim }}>in 0.1s</div>
      </div>
    </>
  );
};

export const S01Hook: React.FC = () => {
  const at = (w: string, n = 0) => wordFrame("s01", w, n);
  return (
    <SceneShell id="s01">
      <div style={{ position: "absolute", top: 40, width: SAFE_W, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <Slam at={at("views")} fontSize={58} color={COLORS.cyan} from={2} style={{ whiteSpace: "nowrap" }}>40M views</Slam>
          <Slam at={at("dollars")} fontSize={58} color={COLORS.yellow} from={2} style={{ whiteSpace: "nowrap" }}>$40M funding</Slam>
        </div>
        <SourcePill text="TypeSafe's claim" at={at("views")} />
      </div>
      <HookSplit />
      <EmojiPop emoji="✍️🚫" at={at("can't")} size={90} style={{ left: COL2_X + 120, top: BAND_TOP + 440 }} />
      <EmojiPop emoji="🤔" at={at("hype")} size={130} style={{ left: SAFE_W - 150, top: 170 }} />
    </SceneShell>
  );
};
