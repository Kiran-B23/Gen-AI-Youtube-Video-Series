import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_TOP, COLORS, FPS, SAFE, Word } from "../config";
import { FONT, TEXT_SHADOW } from "../theme";
import { SAFE_W } from "./SafeArea";

type Card = { words: Word[]; from: number; to: number };

/** Group spoken words into 2–4 word cards, breaking after punctuation. */
export const buildCards = (words: Word[]): Card[] => {
  const groups: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const punct = /[.,!?:;]$/.test(w.w);
    const next = words[i + 1];
    const pause = next ? next.s - w.e > 0.25 : true;
    if (cur.length >= 4 || (cur.length >= 2 && (punct || pause))) { groups.push(cur); cur = []; }
  });
  if (cur.length) {
    // never leave a 1-word orphan if the previous card has room
    if (cur.length === 1 && groups.length && groups[groups.length - 1].length < 4) groups[groups.length - 1].push(...cur);
    else groups.push(cur);
  }
  return groups.map((g, i) => ({
    words: g,
    from: Math.round(g[0].s * FPS),
    to: groups[i + 1] ? Math.round(groups[i + 1][0].s * FPS) : Math.round((g[g.length - 1].e + 0.45) * FPS),
  }));
};

/** Captions follow speech: every word white, only the word being spoken lights up (exactly on its timestamp). */
export const SpokenCaption: React.FC<{ words: Word[]; accent: string; fontSize?: number }> = ({ words, accent, fontSize = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = buildCards(words).find((c) => frame >= c.from && frame < c.to);
  if (!card) return null;
  const pop = spring({ frame: frame - card.from, fps, config: { damping: 13, stiffness: 220 } });
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: CAPTION_TOP, width: SAFE_W, height: 300, display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", columnGap: fontSize * 0.28, rowGap: fontSize * 0.06, padding: `0 ${fontSize * 0.3}px`, boxSizing: "border-box", fontFamily: FONT, fontWeight: 900, fontSize, lineHeight: 1.12, transform: `scale(${0.88 + 0.12 * pop})` }}>
      {card.words.map((w, i) => {
        const s = Math.round(w.s * FPS);
        const nextS = card.words[i + 1] ? Math.round(card.words[i + 1].s * FPS) : card.to;
        const active = frame >= s && frame < nextS;
        const k = active ? spring({ frame: frame - s, fps, config: { damping: 9, stiffness: 240 } }) : 0;
        return (
          <span key={i} style={{ display: "inline-block", color: active ? accent : COLORS.white, transform: `scale(${1 + 0.1 * k})`, margin: active ? `0 ${fontSize * 0.08 * k}px` : 0, textShadow: active ? `0 0 26px ${accent}99, ${TEXT_SHADOW}` : TEXT_SHADOW, WebkitTextStroke: "2px rgba(0,0,0,0.3)" }}>
            {w.w}
          </span>
        );
      })}
    </div>
  );
};
