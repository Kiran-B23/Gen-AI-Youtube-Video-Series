import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { usePop } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Title } from "../components/Title";
import { FONT, glow } from "../theme";

export const S07Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string, n = 0) => wordFrame("s07", w, n);
  const tVerdict = at("verdict");
  const rows: { t: number; ok: boolean; text: string; pill?: string }[] = [
    { t: at("useful"), ok: true, text: "The idea is genuinely useful" },
    { t: at("adoption"), ok: true, text: "Real adoption, real integrations" },
    { t: at("speed"), ok: false, text: "Speed & cost numbers are TypeSafe's own" },
    { t: at("68"), ok: false, text: "Its own benchmark: ~68% accuracy", pill: "TypeSafe's benchmark" },
    { t: at("gemini"), ok: false, text: "Gemini: slightly more accurate in one test, but 10–20x pricier", pill: "third-party test" },
  ];
  const v = usePop(tVerdict, 11, 170);
  const head = (label: string, color: string, t: number) => frame >= t ? <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 46, color, margin: "6px 0 2px" }}>{label}</div> : null;
  return (
    <SceneShell id="s07">
      <Title at={0}>Worth the hype? ⚖️</Title>
      <div style={{ position: "absolute", top: BAND_TOP - 40, width: SAFE_W, display: "flex", flexDirection: "column", gap: 10 }}>
        {head("✅ The good", COLORS.green, rows[0].t)}
        {rows.slice(0, 2).map((r) => <Card key={r.text} at={r.t} color={COLORS.green} from="left" style={{ padding: "14px 24px", fontWeight: 800, fontSize: 40 }}>{r.text}</Card>)}
        {head("⚠️ The fine print", COLORS.yellow, rows[2].t)}
        {rows.slice(2).map((r) => (
          <Card key={r.text} at={r.t} color={COLORS.yellow} from="right" style={{ padding: "14px 24px", fontWeight: 800, fontSize: 40, lineHeight: 1.2 }}>
            {r.text}
            {r.pill ? <div style={{ marginTop: 8 }}><SourcePill text={r.pill} at={r.t} /></div> : null}
          </Card>
        ))}
      </div>
      {frame >= tVerdict ? (
        <AbsoluteFill style={{ background: `rgba(8,6,30,${0.75 * v})` }}>
          <div style={{ position: "absolute", top: BAND_TOP + 120, left: 20, width: SAFE_W - 40, padding: "40px 30px", borderRadius: 40, background: "linear-gradient(160deg, #2A1466, #0E1C4A)", border: `6px solid ${COLORS.yellow}`, boxShadow: glow(COLORS.yellow, 1.2), textAlign: "center", fontFamily: FONT, transform: `scale(${0.5 + 0.5 * v}) rotate(${(1 - v) * -6}deg)`, opacity: v, boxSizing: "border-box" }}>
            <div style={{ fontWeight: 900, fontSize: 50, color: COLORS.yellow }}>VERDICT</div>
            <div style={{ fontWeight: 900, fontSize: 76, color: "white", lineHeight: 1.1, margin: "10px 0 16px" }}>Promising, not proven.</div>
            <div style={{ fontWeight: 800, fontSize: 48, color: COLORS.cyan }}>Test it on YOUR data. 🧪</div>
          </div>
        </AbsoluteFill>
      ) : null}
    </SceneShell>
  );
};
