import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { usePop } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Title } from "../components/Title";
import { FONT, glow } from "../theme";

/** Vertical timeline: two dated nodes, then the creator's claim. */
export const S11Twist: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string, n = 0) => wordFrame("s11", w, n);
  const tMar = at("march"), tSep = at("september"), tEarly = at("earlier");
  const line = interpolate(frame, [tMar, tSep + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const node = (t: number, y: number, color: string, date: string, text: string) => {
    const s = usePop(t);
    return frame < t ? null : (
      <>
        <div style={{ position: "absolute", left: 30, top: y, width: 60, height: 60, borderRadius: "50%", background: color, boxShadow: glow(color, 1.2), transform: `scale(${s})` }} />
        <Card at={t} color={color} from="right" sfx style={{ position: "absolute", left: 130, top: y - 40, width: SAFE_W - 130, padding: "18px 26px" }}>
          <div style={{ fontWeight: 900, fontSize: 48, color }}>{date}</div>
          <div style={{ fontWeight: 800, fontSize: 42, lineHeight: 1.15 }}>{text}</div>
        </Card>
      </>
    );
  };
  return (
    <SceneShell id="s11" extraPunches={[tMar, tSep, tEarly]}>
      <Title at={0}>Plot twist 🌀</Title>
      <div style={{ position: "absolute", left: 56, top: BAND_TOP + 30, width: 8, height: 420 * line, background: `linear-gradient(${COLORS.green}, ${COLORS.pink})`, borderRadius: 4 }} />
      {node(tMar, BAND_TOP + 20, COLORS.green, "MARCH 2025", "Laya's creator publishes the core idea")}
      {node(tSep, BAND_TOP + 400, COLORS.pink, "SEPT 2026", "Jev launches as a “breakthrough”")}
      {frame >= tEarly ? (
        <div style={{ position: "absolute", top: BAND_TOP + 560, width: SAFE_W, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 56, color: COLORS.yellow, textShadow: `0 0 30px ${COLORS.yellow}88` }}>“I got there a year earlier.”</div>
          <SourcePill text="Creator's claim" at={tEarly} />
        </div>
      ) : null}
    </SceneShell>
  );
};
