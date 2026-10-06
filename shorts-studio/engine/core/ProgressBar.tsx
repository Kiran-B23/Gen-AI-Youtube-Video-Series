import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "./context";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = useTheme();
  const c = t.rotation.map((k) => t.colors[k]);
  const p = interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.12)" }}>
      <div style={{ width: `${p}%`, height: "100%", background: `linear-gradient(90deg, ${c.join(", ")})`, backgroundSize: "1080px 100%", boxShadow: `0 0 16px ${c[1]}`, borderRadius: "0 6px 6px 0" }} />
    </div>
  );
};
