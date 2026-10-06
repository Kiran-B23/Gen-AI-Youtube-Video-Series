import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { Counter } from "../components/Counter";
import { GlowChip } from "../components/GlowChip";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Title } from "../components/Title";

export const S12Silence: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string, n = 0) => wordFrame("s12", w, n);
  const items = [["No $40M funding", at("no", 0)], ["No ex-OpenAI founder", at("no", 1)], ["No 40M-view launch", at("no", 2)]] as const;
  const t36 = at("36"), tTune = at("finetune");
  return (
    <SceneShell id="s12" extraPunches={items.map((i) => i[1])}>
      <Title at={0}>Why no one's talking 🤐</Title>
      <div style={{ position: "absolute", top: BAND_TOP - 30, width: SAFE_W, display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map(([label, t]) => {
          const strike = interpolate(frame, [t + 6, t + 14], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <Card key={label} at={t} color={COLORS.red} from="left" style={{ position: "relative", height: 96, display: "flex", alignItems: "center", padding: "0 28px", fontWeight: 800, fontSize: 46 }}>
              <span style={{ color: "white" }}>❌ {label}</span>
              <div style={{ position: "absolute", left: 22, top: 44, height: 8, width: `${strike * 0.9}%`, background: COLORS.red, borderRadius: 4, boxShadow: `0 0 12px ${COLORS.red}` }} />
            </Card>
          );
        })}
      </div>
      {frame >= t36 ? (
        <Card at={t36} color={COLORS.yellow} from="up" style={{ position: "absolute", top: BAND_TOP + 330, width: SAFE_W, padding: "20px 28px", textAlign: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 92, color: COLORS.yellow, lineHeight: 1 }}><Counter to={36} at={t36} duration={14} prefix="~" suffix="%" /></div>
          <div style={{ fontWeight: 800, fontSize: 42, margin: "6px 0 10px" }}>accuracy out of the box</div>
          <SourcePill text="Laya model card" at={t36} />
        </Card>
      ) : null}
      <div style={{ position: "absolute", top: BAND_TOP + 610, width: SAFE_W, display: "flex", justifyContent: "center" }}>
        <GlowChip label="Fine-tune it on your data first" icon="🔧" color={COLORS.cyan} at={tTune} fontSize={42} />
      </div>
    </SceneShell>
  );
};
