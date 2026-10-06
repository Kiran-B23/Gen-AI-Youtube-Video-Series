import React from "react";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { BAND_TOP, COL2_X, COL_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { Title } from "../components/Title";
import { EMOJI_FONT } from "../theme";

export const S15Sense: React.FC = () => {
  const at = (w: string) => wordFrame("s15", w);
  const col = (left: number, t: number, color: string, icon: string, head: string, text: string) => (
    <Card at={t} color={color} from="up" style={{ position: "absolute", left, top: BAND_TOP + 20, width: COL_W, height: 560, padding: "40px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 26, textAlign: "center" }}>
      <span style={{ fontFamily: EMOJI_FONT, fontSize: 120 }}>{icon}</span>
      <span style={{ fontWeight: 900, fontSize: 58, color }}>{head}</span>
      <span style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.2 }}>{text}</span>
    </Card>
  );
  return (
    <SceneShell id="s15" extraPunches={[at("yes"), at("no")]}>
      <Title at={0} fontSize={70}>Does Laya make sense? 🤔</Title>
      {col(0, at("yes"), COLORS.green, "✅", "Yes, if…", "your data must stay private")}
      {col(COL2_X, at("no"), COLORS.red, "❌", "No, if…", "you want plug-and-play today")}
    </SceneShell>
  );
};
