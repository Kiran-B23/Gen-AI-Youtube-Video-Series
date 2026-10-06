import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sfx } from "./Audio";

export const Counter: React.FC<{ to: number; from?: number; at?: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; ding?: boolean; style?: React.CSSProperties }> = ({ to, from = 0, at = 0, duration = 20, decimals = 0, prefix = "", suffix = "", ding = true, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = interpolate(frame, [at, at + duration], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const land = spring({ frame: frame - at - duration, fps, config: { damping: 8, stiffness: 260 } });
  const punch = frame >= at + duration ? 1 + 0.12 * Math.sin(land * Math.PI) : 1;
  const txt = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <span style={{ display: "inline-block", transform: `scale(${punch})`, fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}{txt}{suffix}
      {ding ? <Sfx name="ding" at={at + duration} /> : null}
    </span>
  );
};
