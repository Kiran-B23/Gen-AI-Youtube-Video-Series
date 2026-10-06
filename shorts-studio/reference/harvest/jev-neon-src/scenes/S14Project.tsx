import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, wordFrame } from "../config";
import { Card } from "../components/Card";
import { Counter } from "../components/Counter";
import { GlowChip } from "../components/GlowChip";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { FONT, MONO, glow } from "../theme";

// ≤32 chars per line so 40px monospace fits the 840px safe width
const CODE = [
  `from laya import Router`,
  `router = Router(preload=True)`,
  `email = {"subject": "Refund?",`,
  ` "body": "Billed twice! Refund"`,
  `         " or we cancel."}`,
  `qs = {"department": CHOICE,`,
  `      "urgency":    SCORE,`,
  `      "churn_risk": YES_NO,`,
  `      "phishing":   YES_NO}`,
  `res = router.predict(email, qs)`,
];
const KW = /\b(from|import|True)\b/g;

const highlight = (line: string) => {
  const parts: React.ReactNode[] = [];
  const re = /("[^"]*")|\b(from|import|True)\b|\b([A-Z_]{3,})\b|([=(){}:,.])/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(<span key={k++}>{line.slice(last, m.index)}</span>);
    const color = m[1] ? COLORS.green : m[2] ? COLORS.pink : m[3] ? COLORS.yellow : "rgba(255,255,255,0.6)";
    parts.push(<span key={k++} style={{ color }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  parts.push(<span key={k++}>{line.slice(last)}</span>);
  void KW;
  return parts;
};

/** Real Laya output for this email (laya 0.3.22, CPU). confidence = the model's own confidence field. */
const OUTPUT = [
  { q: "department", a: "billing", c: 0.875 },
  { q: "urgency", a: "critical", c: 0.23 },
  { q: "churn_risk", a: "yes", c: 0.86 },
  { q: "phishing", a: "no", c: 0.9 },
];

export const S14Project: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string, n = 0) => wordFrame("s14", w, n);
  const tMini = at("mini"), tQ = at("questions"), tConf = at("confidence"), tThr = at("085"), tAuto = at("automatically"), tHuman = at("human"), t92 = at("92");
  const lines = Math.min(CODE.length, Math.max(0, Math.floor((frame - tMini) / 3) + 1));
  const shrink = interpolate(frame, [tConf - 6, tConf + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell id="s14" extraPunches={[tConf, tThr, t92]}>
      {/* code card: full size in the band, then shrinks up into the header zone */}
      <div style={{ position: "absolute", top: BAND_TOP - 120 - 160 * shrink, left: 0, width: SAFE_W, opacity: 1 - shrink }}>
        <div style={{ borderRadius: 28, background: "#0D0B26", border: `3px solid ${COLORS.cyan}`, boxShadow: glow(COLORS.cyan, 0.5), overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: "rgba(255,255,255,0.07)", fontFamily: FONT, fontWeight: 700, fontSize: 36, color: COLORS.dim }}>
            <span style={{ color: COLORS.red }}>●</span><span style={{ color: COLORS.yellow }}>●</span><span style={{ color: COLORS.green }}>●</span>&nbsp;triage.py · simplified
          </div>
          <div style={{ padding: "16px 22px", fontFamily: MONO, fontWeight: 500, fontSize: 40, lineHeight: 1.3, color: "white", whiteSpace: "pre" }}>
            {CODE.map((l, i) => (
              <div key={i} style={{ opacity: i < lines ? 1 : 0, background: frame >= tQ && i >= 5 && i <= 8 && shrink < 1 ? "rgba(0,229,255,0.12)" : "transparent" }}>{highlight(l)}</div>
            ))}
          </div>
        </div>
      </div>
      {/* real outputs + confidence gating */}
      {frame >= tConf ? (
        <div style={{ position: "absolute", top: BAND_TOP - 20, width: SAFE_W, display: "flex", flexDirection: "column", gap: 12 }}>
          {OUTPUT.map((o, i) => {
            const pass = o.c >= 0.85;
            const gated = frame >= (pass ? tAuto : tHuman);
            const color = !gated ? COLORS.cyan : pass ? COLORS.green : COLORS.yellow;
            return (
              <Card key={o.q} at={tConf + i * 3} color={color} from="right" sfx={i === 0} style={{ height: 84, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", fontWeight: 800, fontSize: 40 }}>
                <span><span style={{ color: COLORS.dim, fontFamily: MONO, fontSize: 40 }}>{o.q}</span> → {o.a}</span>
                <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontFamily: MONO, color, fontSize: 40 }}>{o.c.toFixed(2)}</span>
                  {gated ? <span>{pass ? "✅" : "🙋"}</span> : null}
                </span>
              </Card>
            );
          })}
          <div><SourcePill text="Real output" at={tConf} /> <SourcePill text="laya 0.3.22, CPU" at={tConf} style={{ marginLeft: 10 }} /></div>
        </div>
      ) : null}
      {frame < t92 ? (
        <div style={{ position: "absolute", top: BAND_TOP + 440, width: SAFE_W, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <GlowChip label="Confidence ≥ 0.85 → auto ✅" color={COLORS.green} at={tThr} fontSize={40} />
          <GlowChip label="Below → a human 🙋" color={COLORS.yellow} at={tHuman} fontSize={40} rotate={8} />
        </div>
      ) : (
        <div style={{ position: "absolute", top: BAND_TOP + 440, width: SAFE_W, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: FONT }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontWeight: 900, fontSize: 80, color: COLORS.green, textShadow: `0 0 26px ${COLORS.green}88` }}><Counter to={92} at={t92} duration={14} suffix="%" /></span>
            <span style={{ fontWeight: 800, fontSize: 42, color: "white" }}>accuracy, confident half</span>
          </div>
          <SourcePill text="creator's results" at={t92} />
        </div>
      )}
    </SceneShell>
  );
};
