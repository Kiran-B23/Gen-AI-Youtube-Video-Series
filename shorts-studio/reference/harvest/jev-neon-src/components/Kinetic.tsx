import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config";
import { EMOJI_FONT, FONT, TEXT_SHADOW } from "../theme";
import { Sfx } from "./Audio";

/** Word that slams in: oversized -> spring bounce with overshoot and slight rotation. Hidden before `at`. */
export const Slam: React.FC<{ children: React.ReactNode; at?: number; color?: string; fontSize?: number; rotate?: number; style?: React.CSSProperties; from?: number }> = ({ children, at = 0, color = COLORS.white, fontSize = 110, rotate = -4, style, from = 2.6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < at) return null;
  const s = spring({ frame: frame - at, fps, config: { damping: 9, stiffness: 160, mass: 0.8 } });
  return (
    <div style={{ fontFamily: FONT, fontWeight: 900, fontSize, lineHeight: 1.05, color, textShadow: TEXT_SHADOW, transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${rotate * s}deg)`, opacity: Math.min(1, s * 3), ...style }}>
      {children}
    </div>
  );
};

export const useShake = (at: number, intensity = 22, frames = 14) => {
  const t = useCurrentFrame() - at;
  if (t < 0 || t > frames) return "translate(0px,0px)";
  const k = intensity * (1 - t / frames);
  return `translate(${(random(`sx${t}`) - 0.5) * 2 * k}px, ${(random(`sy${t}`) - 0.5) * 2 * k}px)`;
};

/** Spring-in scale for anything that should pop on a spoken word. Returns 0 before `at`. */
export const usePop = (at: number, damping = 10, stiffness = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame < at ? 0 : spring({ frame: frame - at, fps, config: { damping, stiffness } });
};

export const EmojiPop: React.FC<{ emoji: string; at?: number; size?: number; style?: React.CSSProperties }> = ({ emoji, at = 0, size = 150, style }) => {
  const frame = useCurrentFrame();
  const s = usePop(at, 7, 170);
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", fontFamily: EMOJI_FONT, fontSize: size, lineHeight: 1, transform: `translateY(${Math.sin((frame - at) / 12) * 10}px) scale(${s}) rotate(${(1 - s) * -30 + Math.sin(frame / 15) * 6}deg)`, filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.5))", ...style }}>
      {emoji}
      <Sfx name="pop" at={at} />
    </div>
  );
};

export const Flash: React.FC<{ at: number; color: string; peak?: number }> = ({ at, color, peak = 0.5 }) => {
  const o = interpolate(useCurrentFrame() - at, [0, 2, 12], [0, peak, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: color, opacity: o, pointerEvents: "none" }} />;
};

const CONFETTI = [COLORS.green, COLORS.pink, COLORS.cyan, COLORS.yellow, "#FFFFFF"];
export const Confetti: React.FC<{ at: number; x: number; y: number; count?: number }> = ({ at, x, y, count = 80 }) => {
  const t = useCurrentFrame() - at;
  if (t < 0 || t > 75) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const ang = random(`ca${i}`) * Math.PI * 2;
        const v = 14 + random(`cv${i}`) * 26;
        const w = 12 + random(`cw${i}`) * 14;
        return <div key={i} style={{ position: "absolute", left: x + Math.cos(ang) * v * t, top: y + Math.sin(ang) * v * t * 0.8 + 0.9 * t * t, width: w, height: w * 0.5, background: CONFETTI[i % 5], transform: `rotate(${t * 18 + i * 40}deg)`, opacity: interpolate(t, [50, 75], [1, 0], { extrapolateLeft: "clamp" }), borderRadius: 3 }} />;
      })}
    </AbsoluteFill>
  );
};
