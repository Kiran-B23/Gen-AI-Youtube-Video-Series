import React from "react";
import { useCurrentFrame } from "remotion";
import { usePage, useTheme } from "../core/context";
import { Reveal, SourcePill } from "../core/editorial";
import { BAND_TOP, BODY, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { title?: string; items: { text: string; kind: "ok" | "warn" | "no"; source?: string }[] };

/** The catch / pros-and-cons: rows arrive on spoken words; "no" rows get struck through. */
export const Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const t = useTheme();
  const { props, item } = useScene<P>();
  const icon = { ok: "✓", warn: "!", no: "✕" };
  const col = { ok: t.colors.ok, warn: t.colors.warn, no: t.colors.danger };
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 150, width: SAFE_W - 2 * INSET, display: "flex", flexDirection: "column", gap: 20 }}>
      {props.title ? <div style={{ fontFamily: BODY, fontWeight: 900, fontSize: 60, color: page.text }}>{props.title}</div> : null}
      {props.items.map((it, i) => {
        const at = item("items", i, 30);
        return (
          <Reveal key={i} at={at} dx={-40} dy={0} sfx="pop">
            <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 30px", borderRadius: 24, background: page.card, border: `3px solid ${page.line}` }}>
              <span style={{ flexShrink: 0, width: 58, height: 58, borderRadius: 14, background: col[it.kind], color: "#0B1020", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY, fontWeight: 900, fontSize: 40 }}>{icon[it.kind]}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44, lineHeight: 1.15, color: page.text, textDecoration: it.kind === "no" && frame > at + 8 ? `line-through ${t.colors.danger} 5px` : "none" }}>{it.text}</span>
                {it.source ? <span><SourcePill text={it.source} at={at} /></span> : null}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};
