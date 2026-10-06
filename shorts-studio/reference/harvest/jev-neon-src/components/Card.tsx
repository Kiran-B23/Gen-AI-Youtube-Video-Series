import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT, glow } from "../theme";
import { usePop } from "./Kinetic";
import { Sfx } from "./Audio";

/** Glass card that springs in on `at` (hidden before), with an optional slide direction. */
export const Card: React.FC<{ at?: number; color: string; children: React.ReactNode; style?: React.CSSProperties; from?: "scale" | "left" | "right" | "up"; sfx?: boolean; dim?: boolean }> = ({ at = 0, color, children, style, from = "scale", sfx = true, dim = false }) => {
  const frame = useCurrentFrame();
  const s = usePop(at, 12, 170);
  if (frame < at) return null;
  const tf = from === "scale" ? `scale(${0.6 + 0.4 * s})` : from === "left" ? `translateX(${(1 - s) * -700}px)` : from === "right" ? `translateX(${(1 - s) * 700}px)` : `translateY(${(1 - s) * 200}px)`;
  return (
    <div style={{ borderRadius: 32, background: "rgba(12,10,45,0.86)", border: `4px solid ${color}`, boxShadow: glow(color, dim ? 0.2 : 0.6), boxSizing: "border-box", fontFamily: FONT, color: "white", transform: tf, opacity: Math.min(1, s * 2) * (dim ? 0.55 : 1), ...style }}>
      {children}
      {sfx ? <Sfx name="pop" at={at} /> : null}
    </div>
  );
};
