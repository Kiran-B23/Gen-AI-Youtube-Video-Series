import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT, glow } from "../theme";
import { Sfx } from "./Audio";
import { usePop } from "./Kinetic";

/** Rounded neon pill that springs in on `at` (hidden before). */
export const GlowChip: React.FC<{ label: React.ReactNode; color: string; at?: number; fontSize?: number; filled?: boolean; icon?: string; rotate?: number; sfx?: boolean; style?: React.CSSProperties }> = ({ label, color, at = 0, fontSize = 44, filled = true, icon, rotate = -8, sfx = true, style }) => {
  const frame = useCurrentFrame();
  const s = usePop(at);
  if (frame < at) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: fontSize * 0.3, padding: `${fontSize * 0.3}px ${fontSize * 0.55}px`, borderRadius: 999, fontFamily: FONT, fontWeight: 800, fontSize, whiteSpace: "nowrap", color: filled ? "#120A2E" : color, background: filled ? color : "rgba(10,8,40,0.7)", border: `4px solid ${color}`, boxShadow: glow(color, 0.8), transform: `scale(${s * (1 + Math.sin((frame - at) / 8) * 0.012)}) rotate(${(1 - s) * rotate}deg)`, opacity: Math.min(1, s * 2), ...style }}>
      {icon ? <span>{icon}</span> : null}
      {label}
      {sfx ? <Sfx name="pop" at={at} /> : null}
    </div>
  );
};
