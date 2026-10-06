import React from "react";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { Counter } from "../components/Counter";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Title } from "../components/Title";

export const S02Talking: React.FC = () => {
  const at = (w: string, n = 0) => wordFrame("s02", w, n);
  const cards = [
    { at: at("launch"), color: COLORS.cyan, big: <Counter to={40} at={at("launch") + 2} suffix="M+" />, text: "launch video views in a week", pill: "TypeSafe's claim" },
    { at: at("vercel"), color: COLORS.green, big: <Counter to={2} at={at("vercel") + 2} duration={10} suffix="x" />, text: "Vercel paid sign-ups in 24 hrs", pill: "Vercel" },
    { at: at("40", 1), color: COLORS.yellow, big: <Counter to={40} at={at("40", 1) + 2} prefix="$" suffix="M" />, text: "seed, now in talks at ~$10B", pill: "media reports" },
    { at: at("founder"), color: COLORS.pink, big: <span>👤</span>, text: "Founder: Diogo Almeida, ex-OpenAI researcher", pill: "" },
  ];
  return (
    <SceneShell id="s02" extraPunches={cards.map((c) => c.at)}>
      <Title top={90} fontSize={62}>Why everyone's talking 🔥</Title>
      <div style={{ position: "absolute", top: BAND_TOP - 130, width: SAFE_W, display: "flex", flexDirection: "column", gap: 12 }}>
        {cards.map((c, i) => (
          <Card key={i} at={c.at} color={c.color} from="right" style={{ minHeight: 150, display: "flex", alignItems: "center", padding: "16px 24px", gap: 18 }}>
            <div style={{ width: 230, flexShrink: 0, fontWeight: 900, fontSize: 70, color: c.color, textShadow: `0 0 26px ${c.color}88`, textAlign: "center" }}>{c.big}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.15 }}>{c.text}</div>
              {c.pill ? <SourcePill text={c.pill} at={c.at} style={{ alignSelf: "flex-start" }} /> : null}
            </div>
          </Card>
        ))}
      </div>
    </SceneShell>
  );
};
