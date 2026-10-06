import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.12)" }}>
      <div style={{ width: `${p}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan}, ${COLORS.pink}, ${COLORS.yellow})`, backgroundSize: "1080px 100%", boxShadow: `0 0 16px ${COLORS.cyan}`, borderRadius: "0 6px 6px 0" }} />
    </div>
  );
};
