import React, { createContext, useContext } from "react";
import { Page, Theme } from "../theme/presets";
import { FPS } from "../theme/tokens";
import { ColorKey, SceneSpec, Timings, VideoSpec } from "../types";

export type VideoCtxValue = { spec: VideoSpec; timings: Timings; theme: Theme; ids: string[]; starts: number[]; total: number };
export const VideoCtx = createContext<VideoCtxValue | null>(null);
export { getTheme } from "../theme/presets";
export type SceneCtxValue = { scene: SceneSpec; index: number; globalStart: number; first: boolean; accent: ColorKey };
export const SceneCtx = createContext<SceneCtxValue | null>(null);
/** True inside a frozen loop-back preview (renders silently). */
export const SilentCtx = createContext(false);

export const useVideo = () => {
  const v = useContext(VideoCtx);
  if (!v) throw new Error("useVideo outside a video");
  return v;
};
export const useSceneCtx = () => {
  const s = useContext(SceneCtx);
  if (!s) throw new Error("useSceneCtx outside a scene");
  return s;
};
export const useTheme = () => useVideo().theme;
/** Resolve a theme color key (ok/warn/danger/special/primary…) or a raw hex to a color. */
export const useColor = () => {
  const t = useTheme();
  return (k?: string, fallback: ColorKey = "primary") =>
    k && k.startsWith("#") ? k : (t.colors as Record<string, string>)[k ?? fallback] ?? t.colors[fallback];
};

const DEFAULT_PAGE: Page = { bg: "#0B1020", text: "#FFFFFF", dim: "rgba(255,255,255,0.58)", accent: "#FFD43B", accent2: "#A99BFF", card: "#151B33", line: "rgba(255,255,255,0.2)" };
/** The current scene's flat page (editorial). Falls back to ink. */
export const usePage = (): Page => {
  const t = useTheme();
  const s = useContext(SceneCtx);
  return (s && t.pages?.[s.scene.page ?? "ink"]) ?? t.pages?.ink ?? DEFAULT_PAGE;
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const lev = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

/** Find the frame (scene-local) where a spoken word starts: exact, then prefix, then fuzzy (edit distance ≤ 2). */
export const findWord = (timings: Timings, sceneId: string, word: string, nth = 0): number | null => {
  const words = timings[sceneId]?.words ?? [];
  const m = norm(word);
  const tiers = [
    words.filter((w) => norm(w.w) === m),
    words.filter((w) => norm(w.w).startsWith(m)),
    words.filter((w) => m.length > 3 && lev(norm(w.w), m) <= 2),
  ];
  for (const tier of tiers) if (tier[nth]) return Math.round(tier[nth].s * FPS);
  return null;
};

/**
 * Word-triggered beats for the current scene.
 * at(target, fallback)  -> frame the target appears (show / stamp / count-up / burst beat), else fallback
 * hideAt(target)        -> frame a `hide` beat removes it (Infinity if none)
 * highlightAt(target)   -> frame a `highlight` beat fires (Infinity if none)
 * word(w, nth)          -> frame a spoken word starts (null if missing)
 */
export const useBeats = () => {
  const { timings } = useVideo();
  const { scene } = useSceneCtx();
  const resolved = (scene.beats ?? []).map((b) => ({ ...b, frame: (findWord(timings, scene.id, b.word, b.nth ?? 0) ?? -1) + (b.offset ?? 0) })).filter((b) => b.frame >= 0);
  const first = (target: string, actions: string[]) => resolved.find((b) => b.target === target && actions.includes(b.action))?.frame;
  return {
    beats: resolved,
    at: (target: string, fallback = 0) => first(target, ["show", "stamp", "count-up", "burst", "zoom-punch"]) ?? fallback,
    hideAt: (target: string) => first(target, ["hide"]) ?? Infinity,
    highlightAt: (target: string) => first(target, ["highlight"]) ?? Infinity,
    word: (w: string, nth = 0) => findWord(timings, scene.id, w, nth),
    words: timings[scene.id]?.words ?? [],
  };
};

export const SceneProvider: React.FC<{ value: SceneCtxValue; children: React.ReactNode }> = ({ value, children }) => <SceneCtx.Provider value={value}>{children}</SceneCtx.Provider>;
