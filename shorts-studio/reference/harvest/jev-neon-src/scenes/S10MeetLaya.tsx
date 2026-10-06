import React from "react";
import { COLORS, wordFrame } from "../config";
import { GlowChip } from "../components/GlowChip";
import { Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";

export const S10MeetLaya: React.FC = () => {
  const at = (w: string) => wordFrame("s10", w);
  const rows: [number, string, string, string][] = [
    [at("convai"), "🏢", "By Convai Innovations", COLORS.cyan],
    [at("september"), "🗓️", "Sept 18, 2026", COLORS.yellow],
    [at("421"), "🧩", "421M parameters", COLORS.green],
    [at("33"), "⚡", "~33 ms per decision", COLORS.pink],
    [at("100"), "🌍", "100+ languages", COLORS.cyan],
    [at("apache"), "📜", "Apache 2.0 = free to use", COLORS.green],
  ];
  return (
    <SceneShell id="s10" extraPunches={rows.map((r) => r[0])}>
      <div style={{ position: "absolute", top: 70, width: SAFE_W, textAlign: "center" }}>
        <Slam at={at("laya")} fontSize={170} color={COLORS.green} style={{ letterSpacing: 10, textShadow: `0 0 40px ${COLORS.green}AA, 0 12px 0 rgba(0,0,0,0.35)` }}>LAYA</Slam>
      </div>
      <div style={{ position: "absolute", top: BAND_TOP - 10, width: SAFE_W, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ height: 50 }}><SourcePill text="Convai's claim" at={rows[1][0]} /></div>
        {rows.map(([t, icon, label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", height: 80 }}>
            <GlowChip label={label} icon={icon} color={color} at={t} fontSize={42} />
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
