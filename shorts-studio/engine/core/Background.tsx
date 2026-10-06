import React from "react";
import { AbsoluteFill, interpolateColors, random } from "remotion";
import { HEIGHT, WIDTH } from "../theme/tokens";
import { useTheme, useVideo } from "./context";

/** Moving gradient (+ optional night→sunrise drift across the video) with orbs or a constellation of light dots. */
export const Background: React.FC<{ globalFrame: number; accent: string; calm?: boolean }> = ({ globalFrame: f, accent, calm }) => {
  const theme = useTheme();
  const { total } = useVideo();
  const p = Math.min(1, f / Math.max(1, total));
  const ease = p * p * (3 - 2 * p);
  let [a, b] = theme.bgEnd ? [interpolateColors(ease, [0, 1], [theme.bg[0], theme.bgEnd[0]]), interpolateColors(ease, [0, 1], [theme.bg[1], theme.bgEnd[1]])] : theme.bg;
  if (calm) [a, b] = [interpolateColors(0.55, [0, 1], [a, theme.calm[0]]), interpolateColors(0.55, [0, 1], [b, theme.calm[1]])];
  const palette = theme.rotation.map((k) => theme.colors[k]);
  const angle = 165 + Math.sin(f / 120) * 12;
  if (theme.motif === "constellation") {
    const N = 22;
    const nodes = new Array(N).fill(0).map((_, i) => ({
      x: random(`nx${i}`) * WIDTH + Math.sin(f / (90 + i * 7) + i) * 40,
      y: random(`ny${i}`) * HEIGHT * 0.95 + Math.cos(f / (110 + i * 5) + i) * 40,
      r: 3 + random(`nr${i}`) * 5, c: palette[i % palette.length],
    }));
    const links: [number, number, number][] = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 300) links.push([i, j, 1 - d / 300]);
    }
    return (
      <AbsoluteFill style={{ background: `linear-gradient(${angle}deg, ${a} 0%, ${b} 100%)`, overflow: "hidden" }}>
        {/* soft horizon glow that rises toward sunrise */}
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% ${110 - ease * 30}%, ${theme.colors.highlight}${Math.round(20 + ease * 70).toString(16).padStart(2, "0")} 0%, transparent 60%)` }} />
        <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
          {links.map(([i, j, s], k) => <line key={k} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} stroke="#FFFFFF" strokeOpacity={0.05 + s * 0.16} strokeWidth={1.5} />)}
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.r * (1 + 0.25 * Math.sin(f / 12 + i))} fill={n.c} opacity={0.75} style={{ filter: `drop-shadow(0 0 8px ${n.c})` }} />)}
        </svg>
        {new Array(40).fill(0).map((_, i) => {
          const s = 1.5 + random(`s${i}`) * 2.5;
          const y = (((random(`y${i}`) * HEIGHT - f * (0.3 + random(`v${i}`) * 0.6)) % HEIGHT) + HEIGHT) % HEIGHT;
          return <div key={i} style={{ position: "absolute", left: random(`x${i}`) * WIDTH, top: y, width: s, height: s, borderRadius: "50%", background: "#fff", opacity: (0.15 + random(`o${i}`) * 0.5) * (1 - ease * 0.6) }} />;
        })}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 42%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)" }} />
      </AbsoluteFill>
    );
  }
  const orbs = [
    { color: accent, x: 0.2, y: 0.18, r: 520, sx: 70, sy: 50, speed: 60 },
    { color: palette[(f / 600) % palette.length | 0], x: 0.8, y: 0.55, r: 600, sx: 90, sy: 80, speed: 85 },
    { color: accent, x: 0.3, y: 0.85, r: 480, sx: 80, sy: 60, speed: 75 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${angle}deg, ${a} 0%, ${b} 100%)`, overflow: "hidden" }}>
      {orbs.map((o, i) => <div key={i} style={{ position: "absolute", width: o.r, height: o.r, borderRadius: "50%", left: o.x * WIDTH - o.r / 2 + Math.sin(f / o.speed + i) * o.sx, top: o.y * HEIGHT - o.r / 2 + Math.cos(f / o.speed + i * 2) * o.sy, background: `radial-gradient(circle, ${o.color}55 0%, ${o.color}00 70%)`, filter: "blur(40px)" }} />)}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 42%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
};
