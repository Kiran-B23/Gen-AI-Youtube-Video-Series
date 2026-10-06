import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useColor, usePage } from "../core/context";
import { Reveal, SourcePill } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { terms: { text: string; label: string; color?: string }[]; ops: string[]; source?: string };

/** term × term = result, each term arriving on its spoken word; the result can be stamped. */
export const Equation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const page = usePage();
  const color = useColor();
  const { props, item, beats } = useScene<P>();
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 120, width: SAFE_W - 2 * INSET }}>
      {props.terms.map((t, i) => {
        const at = item("terms", i, 30);
        const stamped = beats.some((b) => b.target === `terms.${i}` && b.action === "stamp");
        const s = frame < at ? 0 : spring({ frame: frame - at, fps, config: { damping: 10, stiffness: 220 } });
        return (
          <React.Fragment key={i}>
            {i > 0 ? <Reveal at={at - 2} dy={10}><div style={{ fontFamily: DISPLAY, fontSize: 90, color: page.dim, lineHeight: 1 }}>{props.ops[i - 1]}</div></Reveal> : null}
            <Reveal at={at}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 22, transform: stamped ? `scale(${1.6 - 0.6 * s}) rotate(${-3 * s}deg)` : undefined, transformOrigin: "0% 50%" }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 170, lineHeight: 1, color: color(t.color ?? "highlight") }}>{t.text}</span>
                <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52, color: page.text }}>{t.label}</span>
              </div>
            </Reveal>
          </React.Fragment>
        );
      })}
      {props.source ? <div style={{ marginTop: 22 }}><SourcePill text={props.source} at={item("terms", 0)} /></div> : null}
    </div>
  );
};
