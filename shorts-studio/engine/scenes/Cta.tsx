import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glass } from "../core/Glass";
import { useTheme } from "../core/context";
import { Reveal } from "../core/editorial";
import { BODY, DISPLAY, SAFE_W } from "../theme/tokens";
import { useScene } from "./common";

type P = { save?: string; question: string; follow: string };

/** Channel outro: save chip, big comment bubble, bouncing follow button (same layout across videos). */
export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const th = useTheme();
  const { props, at } = useScene<P>();
  const tF = at("follow", 9999);
  const b = frame < tF ? 0 : spring({ frame: frame - tF, fps, config: { damping: 8, stiffness: 160 } });
  return (
    <>
      {props.save ? <Reveal at={at("save", 0)} style={{ position: "absolute", left: 0, top: 260 }} sfx="pop">
        <span style={{ display: "inline-block", padding: "14px 26px", borderRadius: 999, background: th.colors.highlight, color: "#0D1030", fontFamily: BODY, fontWeight: 900, fontSize: 50 }}>{props.save}</span>
      </Reveal> : null}
      <Reveal at={at("question", 30)} dy={40} style={{ position: "absolute", left: 0, top: 390, width: SAFE_W }} sfx="pop">
        <Glass glow={th.colors.highlight} style={{ padding: "36px 36px", borderRadius: "44px 44px 44px 10px" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 96, lineHeight: 1.05, color: "#fff" }}>{props.question}</div>
        </Glass>
      </Reveal>
      {frame >= tF ? (
        <div style={{ position: "absolute", left: 0, top: 880, width: SAFE_W, display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "24px 44px", borderRadius: 999, whiteSpace: "nowrap", background: `linear-gradient(90deg, ${th.colors.primary}, ${th.colors.tertiary})`, fontFamily: BODY, fontWeight: 900, fontSize: 44, color: "#fff", boxShadow: `0 0 40px ${th.colors.tertiary}88`, transform: `translateY(${Math.abs(Math.sin((frame - tF) / 7)) * -20}px) scale(${b})` }}>+ {props.follow}</div>
        </div>
      ) : null}
    </>
  );
};
