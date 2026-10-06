import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { usePage, useTheme } from "../core/context";
import { Box, Eyebrow, Reveal, SourcePill } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";
import { Gate, GateRow } from "./Gate";

type P = {
  mode: "token-loop" | "one-pass" | "gate";
  label?: string; answer?: string; counterLabel?: string; counterTo?: number;
  question?: string; options?: { label: string; p: number }[]; answers?: { q: string; a: string }[]; passLabel?: string; badge?: string;
  rows?: GateRow[]; threshold?: number; verdicts?: { kind: "ok" | "no"; text: string }[];
  source?: string;
};

/** token-loop: an LLM writes one piece at a time and the run counter ticks with every piece. */
const TokenLoop: React.FC<{ p: P }> = ({ p }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { at, highlightAt } = useScene<P>();
  const tokens = (p.answer ?? "").split(" ");
  const start = at("loop"), end = at("counter", start + 90);
  const n = Math.max(0, Math.min(tokens.length, Math.floor(interpolate(frame, [start, end], [0, tokens.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))));
  const runs = Math.round((n / tokens.length) * (p.counterTo ?? tokens.length));
  const loopOn = frame >= highlightAt("loop");
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 130, width: SAFE_W - 2 * INSET }}>
      <Eyebrow>{p.label} · one piece at a time</Eyebrow>
      <div style={{ marginTop: 20, padding: 24, borderRadius: 24, background: page.card, border: `3px solid ${page.line}`, minHeight: 330, display: "flex", flexWrap: "wrap", gap: 10, alignContent: "flex-start" }}>
        {tokens.slice(0, n).map((t, i) => <Box key={i} size={36} tone={i === n - 1 ? "accent" : t === "billing" ? "ok" : "plain"}>{t}</Box>)}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 26 }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44, color: page.dim, opacity: loopOn ? 1 : 0 }}>↻ the whole model runs again</div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 200, lineHeight: 0.9, color: page.accent }}>{runs}</div>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 36, letterSpacing: "0.2em", color: page.text }}>{p.counterLabel ?? "RUNS"}</div>
        </div>
      </div>
    </div>
  );
};

/** one-pass: the model runs once and returns a probability for every option, plus other answers in the same pass. */
const OnePass: React.FC<{ p: P }> = ({ p }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  const t = useTheme();
  const { at, highlightAt } = useScene<P>();
  const tPass = at("pass", 0), tOpt = at("options", 30), tHi = highlightAt("options"), tAns = at("answers", 999), tBadge = at("badge", 9999);
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 120, width: SAFE_W - 2 * INSET }}>
      <Reveal at={tPass}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Box size={44} tone="filled">{p.label}</Box>
          <span style={{ fontFamily: DISPLAY, fontSize: 96, color: page.accent, lineHeight: 1 }}>{p.passLabel}</span>
        </div>
      </Reveal>
      <Reveal at={tOpt} style={{ marginTop: 28 }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 48, color: page.text, marginBottom: 14 }}>{p.question}</div>
        {(p.options ?? []).map((o, i) => {
          const w = interpolate(frame - tOpt - i * 3, [0, 16], [0, o.p], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const hi = i === 0 && frame >= tHi;
          return (
            <div key={o.label} style={{ display: "flex", alignItems: "center", gap: 18, height: 74 }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, width: 220, color: page.text }}>{o.label}</span>
              <div style={{ flex: 1, height: 34, borderRadius: 8, background: page.line }}>
                <div style={{ width: `${Math.max(1.5, w * 100)}%`, height: "100%", borderRadius: 8, background: hi ? t.colors.ok : page.accent }} />
              </div>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, width: 110, textAlign: "right", color: page.text }}>{Math.round(w * 100)}%</span>
            </div>
          );
        })}
      </Reveal>
      <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
        {(p.answers ?? []).map((a, i) => <Reveal key={a.q} at={tAns + i * 6} dy={20} sfx={i === 0 ? "pop" : null}><Box size={38}>{a.q} → {a.a}</Box></Reveal>)}
      </div>
      <Reveal at={tBadge} style={{ marginTop: 24 }}><Box size={36} tone="special">{p.badge}</Box></Reveal>
      {p.source ? <div style={{ marginTop: 18 }}><SourcePill text={p.source} at={tOpt} /></div> : null}
    </div>
  );
};

const GateMode: React.FC<{ p: P }> = ({ p }) => {
  const t = useTheme();
  const { at, item } = useScene<P>();
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 120, width: SAFE_W - 2 * INSET }}>
      <Gate rows={p.rows ?? []} threshold={p.threshold ?? 0.85} at={at("rows", 0)} passAt={at("pass", 60)} failAt={at("fail", 90)} source={p.source} width={SAFE_W - 2 * INSET} />
      <div style={{ display: "flex", gap: 14, marginTop: 22, flexWrap: "wrap" }}>
        {(p.verdicts ?? []).map((v, i) => (
          <Reveal key={v.text} at={item("verdicts", i, 30)} dy={20} sfx="pop">
            <span style={{ display: "inline-block", padding: "14px 22px", borderRadius: 16, background: v.kind === "ok" ? t.colors.ok : t.colors.danger, color: "#0B1020", fontFamily: BODY, fontWeight: 900, fontSize: 42 }}>{v.kind === "ok" ? "✓ " : "✕ "}{v.text}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export const MechanismStep: React.FC = () => {
  const { props } = useScene<P>();
  if (props.mode === "token-loop") return <TokenLoop p={props} />;
  if (props.mode === "one-pass") return <OnePass p={props} />;
  return <GateMode p={props} />;
};
