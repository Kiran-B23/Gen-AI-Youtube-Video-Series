import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EMOJI_FONT, FONT, TEXT_SHADOW } from "../theme/tokens";
import { Sfx } from "../audio/AudioMix";
import { useTheme } from "./context";

export const usePop = (at: number, damping = 10, stiffness = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame < at ? 0 : spring({ frame: frame - at, fps, config: { damping, stiffness } });
};

/** Oversized -> spring bounce with overshoot and a slight rotation. Hidden before `at`. */
export const Slam: React.FC<{ children: React.ReactNode; at?: number; color?: string; fontSize?: number; rotate?: number; style?: React.CSSProperties; from?: number }> = ({ children, at = 0, color = "#fff", fontSize = 96, rotate = -3, style, from = 2.2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < at) return null;
  const s = spring({ frame: frame - at, fps, config: { damping: 9, stiffness: 160, mass: 0.8 } });
  return <div style={{ fontFamily: FONT, fontWeight: 900, fontSize, lineHeight: 1.08, color, textShadow: TEXT_SHADOW, transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${rotate * s}deg)`, opacity: Math.min(1, s * 3), ...style }}>{children}</div>;
};

export const useShake = (at: number, intensity = 22, frames = 14) => {
  const t = useCurrentFrame() - at;
  if (t < 0 || t > frames) return "translate(0px,0px)";
  const k = intensity * (1 - t / frames);
  return `translate(${(random(`sx${t}`) - 0.5) * 2 * k}px, ${(random(`sy${t}`) - 0.5) * 2 * k}px)`;
};

export const EmojiPop: React.FC<{ emoji: string; at?: number; size?: number; style?: React.CSSProperties }> = ({ emoji, at = 0, size = 140, style }) => {
  const frame = useCurrentFrame();
  const s = usePop(at, 7, 170);
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", fontFamily: EMOJI_FONT, fontSize: size, lineHeight: 1, transform: `translateY(${Math.sin((frame - at) / 12) * 10}px) scale(${s}) rotate(${(1 - s) * -30 + Math.sin(frame / 15) * 6}deg)`, filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.5))", ...style }}>
      {emoji}<Sfx name="pop" at={at} />
    </div>
  );
};

export const Flash: React.FC<{ at: number; color: string; peak?: number }> = ({ at, color, peak = 0.45 }) => {
  const o = interpolate(useCurrentFrame() - at, [0, 2, 12], [0, peak, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: color, opacity: o, pointerEvents: "none" }} />;
};

export const Confetti: React.FC<{ at: number; x: number; y: number; count?: number }> = ({ at, x, y, count = 90 }) => {
  const t = useCurrentFrame() - at;
  const th = useTheme();
  const cols = [...th.rotation.map((k) => th.colors[k]), "#FFFFFF"];
  if (t < 0 || t > 75) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const ang = random(`ca${i}`) * Math.PI * 2, v = 14 + random(`cv${i}`) * 26, w = 12 + random(`cw${i}`) * 14;
        return <div key={i} style={{ position: "absolute", left: x + Math.cos(ang) * v * t, top: y + Math.sin(ang) * v * t * 0.8 + 0.9 * t * t, width: w, height: w * 0.5, background: cols[i % cols.length], transform: `rotate(${t * 18 + i * 40}deg)`, opacity: interpolate(t, [50, 75], [1, 0], { extrapolateLeft: "clamp" }), borderRadius: 3 }} />;
      })}
    </AbsoluteFill>
  );
};
