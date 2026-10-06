import React from "react";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";

export const S13Others: React.FC = () => {
  const at = (w: string, n = 0) => wordFrame("s13", w, n);
  const tiles = [
    { t: at("jev"), name: "Jev", desc: "closed, cloud", color: COLORS.pink },
    { t: at("kev"), name: "Kev", desc: "open, 0.8B to 9B", extra: "(yes, named after Jev 😂)", color: COLORS.yellow, pill: "Kev's release" },
    { t: at("laya"), name: "Laya", desc: "open, tiny, local", color: COLORS.green },
    { t: at("nimble"), name: "Nimble", desc: "adds decisions to any open LLM", color: COLORS.cyan },
  ];
  return (
    <SceneShell id="s13" extraPunches={tiles.map((x) => x.t)}>
      <div style={{ position: "absolute", top: 120, width: SAFE_W, textAlign: "center" }}>
        <Slam at={at("category")} fontSize={66} color={COLORS.yellow} rotate={-3} from={1.8}>A whole new category ✨</Slam>
      </div>
      <div style={{ position: "absolute", top: BAND_TOP - 40, width: SAFE_W, display: "flex", flexDirection: "column", gap: 16 }}>
        {tiles.map((x) => (
          <Card key={x.name} at={x.t} color={x.color} from="right" style={{ padding: "16px 26px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 900, fontSize: 58, color: x.color }}>{x.name}</span>
              <span style={{ fontWeight: 800, fontSize: 42 }}>{x.desc}</span>
            </div>
            {x.extra ? <div style={{ fontWeight: 700, fontSize: 40, color: "rgba(255,255,255,0.85)" }}>{x.extra}</div> : null}
            {x.pill ? <div><SourcePill text={x.pill} at={x.t} /></div> : null}
          </Card>
        ))}
      </div>
    </SceneShell>
  );
};
