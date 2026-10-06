import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { BODY, CAPTION_TOP, FPS, INSET, SAFE, SAFE_W } from "../theme/tokens";
import { Word } from "../types";
import { usePage, useVideo } from "./context";

type Card = { words: Word[]; from: number; to: number };

/** Sentence-sized cards (2–8 words), breaking after punctuation or a pause. */
export const buildCards = (words: Word[], max = 8): Card[] => {
  const groups: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const end = /[.!?]$/.test(w.w) || (/[,:;]$/.test(w.w) && cur.length >= 5);
    const nxt = words[i + 1];
    if (cur.length >= max || (cur.length >= 2 && end) || (nxt && nxt.s - w.e > 0.6 && cur.length >= 2)) { groups.push(cur); cur = []; }
  });
  if (cur.length) { if (cur.length === 1 && groups.length && groups[groups.length - 1].length < max) groups[groups.length - 1].push(...cur); else groups.push(cur); }
  return groups.map((g, i) => ({ words: g, from: Math.round(g[0].s * FPS) - 2, to: groups[i + 1] ? Math.round(groups[i + 1][0].s * FPS) - 2 : Math.round((g[g.length - 1].e + 0.5) * FPS) }));
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Calm karaoke captions: words become solid as they're spoken, upcoming words wait at 55%.
 * Only key words (numbers + video.json `keywords`) take the page accent. No per-word colour flicker.
 */
export const Captions: React.FC<{ words: Word[]; fontSize?: number }> = ({ words, fontSize = 56 }) => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { spec, theme } = useVideo();
  const keys = new Set((spec.keywords ?? []).map(norm));
  const card = buildCards(words, spec.captionMaxWords ?? 8).find((c) => frame >= c.from && frame < c.to);
  if (!card) return null;
  const fade = interpolate(frame - card.from, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: SAFE.left + INSET, top: CAPTION_TOP, width: SAFE_W - 2 * INSET, fontFamily: BODY, fontWeight: 800, fontSize, lineHeight: 1.24, letterSpacing: "-0.01em", color: page.text, opacity: fade, textAlign: "left", ...(theme.captionBacking ? { padding: "18px 26px", borderRadius: 26, background: "rgba(13,16,48,0.5)", backdropFilter: "blur(14px)", border: "1.5px solid rgba(255,255,255,0.18)", width: "auto", maxWidth: SAFE_W - 2 * INSET, display: "inline-block" } : {}) }}>
      {card.words.map((w, i) => {
        const spoken = frame >= Math.round(w.s * FPS);
        const key = /\d/.test(w.w) || keys.has(norm(w.w));
        return (
          <React.Fragment key={i}>
            <span style={{ color: spoken && key ? page.accent : page.text, opacity: spoken ? 1 : 0.55 }}>{w.w}</span>
            {i < card.words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
