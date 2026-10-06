import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT } from "../theme";
import { usePop } from "./Kinetic";

/** Small 36px "Source:" pill that rides along with every number. */
export const SourcePill: React.FC<{ text: string; at?: number; style?: React.CSSProperties }> = ({ text, at = 0, style }) => {
  const frame = useCurrentFrame();
  const s = usePop(at + 4, 14, 180);
  if (frame < at) return null;
  return (
    <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 999, background: "rgba(255,255,255,0.14)", border: "2px solid rgba(255,255,255,0.45)", fontFamily: FONT, fontWeight: 600, fontSize: 36, color: "white", whiteSpace: "nowrap", opacity: s, transform: `translateY(${(1 - s) * 10}px)`, ...style }}>
      {text.startsWith("Source") || text.endsWith("output") ? text : `Source: ${text}`}
    </div>
  );
};
