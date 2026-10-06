import React from "react";
import { AbsoluteFill, random } from "remotion";
import { COLORS, HEIGHT, WIDTH } from "../config";

const ORB_COLORS = [COLORS.pink, COLORS.cyan, COLORS.green, COLORS.yellow];

/** Shifting purple-navy gradient + blurred orbs + floating particles, driven by the global frame. */
export const Background: React.FC<{ globalFrame: number; accent: string }> = ({ globalFrame: f, accent }) => {
  const angle = 160 + Math.sin(f / 90) * 25;
  const mid = 50 + Math.sin(f / 70) * 15;
  const orbs = [
    { color: accent, x: 0.2, y: 0.18, r: 520, sx: 70, sy: 50, speed: 60 },
    { color: ORB_COLORS[(f / 600) % 4 | 0], x: 0.8, y: 0.55, r: 600, sx: 90, sy: 80, speed: 85 },
    { color: accent, x: 0.3, y: 0.85, r: 480, sx: 80, sy: 60, speed: 75 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${angle}deg, ${COLORS.bgA} 0%, #140F3F ${mid}%, ${COLORS.bgB} 100%)`, overflow: "hidden" }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.r, height: o.r, borderRadius: "50%",
          left: o.x * WIDTH - o.r / 2 + Math.sin(f / o.speed + i) * o.sx,
          top: o.y * HEIGHT - o.r / 2 + Math.cos(f / o.speed + i * 2) * o.sy,
          background: `radial-gradient(circle, ${o.color}55 0%, ${o.color}00 70%)`, filter: "blur(40px)",
        }} />
      ))}
      {new Array(36).fill(0).map((_, i) => {
        const size = 3 + random(`s${i}`) * 7;
        const x = random(`x${i}`) * WIDTH + Math.sin(f / 40 + i) * 20;
        const y = (((random(`y${i}`) * HEIGHT - f * (0.6 + random(`v${i}`) * 1.6)) % HEIGHT) + HEIGHT) % HEIGHT;
        const c = ORB_COLORS[i % 4];
        return <div key={`p${i}`} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: c, opacity: 0.25 + random(`o${i}`) * 0.45, boxShadow: `0 0 ${size * 3}px ${c}` }} />;
      })}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 42%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
};
