import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { usePage, useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BAND_TOP, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";
import { Gate, GateRow } from "./Gate";

type P = { filename: string; code: string[]; outputs?: GateRow[]; threshold?: number; source?: string; highlightLines?: [number, number] };

const highlight = (line: string, c: { str: string; kw: string; name: string; punct: string }) => {
  const parts: React.ReactNode[] = [];
  const re = /("[^"]*"?)|\b(for|in|if|else|import|from|True|False)\b|\b([A-Z_]{3,})\b|(\d+\.\d+)|([=(){}:,.[\]>]+)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(<span key={k++}>{line.slice(last, m.index)}</span>);
    const col = m[1] ? c.str : m[2] ? c.kw : m[3] ? c.name : m[4] ? c.name : c.punct;
    parts.push(<span key={k++} style={{ color: col }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  parts.push(<span key={k++}>{line.slice(last)}</span>);
  return parts;
};

/** ≤10 lines of 40px mono code that types in, then gives way to the outputs + confidence gate. */
export const CodeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const t = useTheme();
  const { props, at, highlightAt, mainAt } = useScene<P>();
  const tOut = at("outputs", 9999);
  const lines = Math.min(props.code.length, Math.max(0, Math.floor((frame - mainAt) / 3) + 1));
  const away = interpolate(frame, [tOut - 6, tOut + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [h0, h1] = props.highlightLines ?? [2, 5];
  const hi = frame >= highlightAt("code") && frame < tOut;
  const colors = { str: t.colors.ok, kw: "#FF7AB6", name: "#FFD43B", punct: "rgba(255,255,255,0.55)" };
  return (
    <>
      {away < 1 ? (
        <div style={{ position: "absolute", left: 0, top: BAND_TOP - 110 - away * 120, width: SAFE_W, opacity: 1 - away }}>
          <div style={{ borderRadius: 24, background: "#0D1124", border: `3px solid ${page.line}`, overflow: "hidden" }}>
            <div style={{ padding: "12px 22px", background: "rgba(255,255,255,0.06)", fontFamily: MONO, fontWeight: 700, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
              <span style={{ color: t.colors.danger }}>●</span> <span style={{ color: "#FFD43B" }}>●</span> <span style={{ color: t.colors.ok }}>●</span>&nbsp; {props.filename}
            </div>
            <div style={{ padding: "16px 22px", fontFamily: MONO, fontWeight: 500, fontSize: 40, lineHeight: 1.32, color: "white", whiteSpace: "pre" }}>
              {props.code.map((l, i) => <div key={i} style={{ opacity: i < lines ? 1 : 0, background: hi && i >= h0 && i <= h1 ? "rgba(255,212,59,0.16)" : "transparent" }}>{highlight(l, colors)}</div>)}
            </div>
          </div>
        </div>
      ) : null}
      {props.outputs ? (
        <Reveal at={tOut} style={{ position: "absolute", left: INSET, top: BAND_TOP - 120, width: SAFE_W - 2 * INSET }}>
          <Gate rows={props.outputs} threshold={props.threshold ?? 0.85} at={tOut} passAt={at("pass", tOut + 40)} failAt={at("fail", tOut + 70)} source={props.source} width={SAFE_W - 2 * INSET} />
        </Reveal>
      ) : null}
    </>
  );
};
