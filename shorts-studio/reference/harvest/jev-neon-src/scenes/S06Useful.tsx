import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { Title } from "../components/Title";
import { EMOJI_FONT } from "../theme";

const TILES: [string, string, string, string][] = [
  ["ticket", "🎫", "Ticket routing", COLORS.pink],
  ["spam", "🎣", "Spam & phishing", COLORS.cyan],
  ["guardrails", "🛡️", "Guardrails", COLORS.green],
  ["lead", "📈", "Lead scoring", COLORS.yellow],
  ["picking", "🔀", "Picking which LLM to call", COLORS.pink],
  ["spotting", "🤖", "Is my AI agent stuck?", COLORS.cyan],
  ["grading", "📝", "Grading AI outputs", COLORS.green],
];

/** Each tile pops exactly when its name is said. */
export const S06Useful: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string) => wordFrame("s06", w);
  const times = TILES.map(([w]) => at(w));
  const active = times.reduce((a, t, i) => (frame >= t ? i : a), -1);
  return (
    <SceneShell id="s06" extraPunches={times}>
      <Title at={at("useful")}>Where it's useful 🎯</Title>
      <div style={{ position: "absolute", top: BAND_TOP - 20, width: SAFE_W, display: "flex", flexDirection: "column", gap: 12 }}>
        {TILES.map(([, icon, label, color], i) => (
          <Card key={label} at={times[i]} color={color} from={i % 2 ? "right" : "left"} dim={active !== i} style={{ height: 86, display: "flex", alignItems: "center", gap: 22, padding: "0 26px" }}>
            <span style={{ fontFamily: EMOJI_FONT, fontSize: 52 }}>{icon}</span>
            <span style={{ fontWeight: 800, fontSize: 42 }}>{label}</span>
          </Card>
        ))}
      </div>
    </SceneShell>
  );
};
