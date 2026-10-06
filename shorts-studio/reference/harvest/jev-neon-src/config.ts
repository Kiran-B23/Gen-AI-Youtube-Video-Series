/**
 * Timing is driven by the voice: every scene lasts its voice clip + PAD seconds.
 * Word timestamps (Whisper, aligned to the script) live in vo-timings.json.
 */
import VO from "./vo-timings.json";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const MAX_SECONDS = 180;
export const PAD_SECONDS = 0.3;
/** Transitions overlap neighbouring scenes by exactly the voice pad, so no voice ever overlaps and no frame is blank. */
export const TRANSITION_FRAMES = Math.round(PAD_SECONDS * FPS);

/** Platform UI covers the bottom 20% and right 12%. */
export const SAFE = { top: 120, left: 60, right: 950, bottom: 1536 };
/** Main visuals sit in the 25%–60% band; captions sit below it. */
export const BAND = { top: 480, bottom: 1152 };
export const CAPTION_TOP = 1190;

export const COLORS = {
  bgA: "#1A0B3D",
  bgB: "#0B1A3D",
  green: "#39FF88",
  pink: "#FF3CAC",
  cyan: "#00E5FF",
  yellow: "#FFD60A",
  red: "#FF4D4D",
  white: "#FFFFFF",
  dim: "rgba(255,255,255,0.75)",
};

export type Word = { w: string; s: number; e: number };
type VoEntry = { duration: number; words: Word[] };
export const VOICE = VO as Record<string, VoEntry>;

export type SceneId =
  | "s01" | "s02" | "s03" | "s04" | "s05" | "s06" | "s07" | "s08" | "next"
  | "s09" | "s10" | "s11" | "s12" | "s13" | "s14" | "s15" | "s16";

export const ACCENT: Record<SceneId, string> = {
  s01: COLORS.pink, s02: COLORS.cyan, s03: COLORS.green, s04: COLORS.yellow, s05: COLORS.pink,
  s06: COLORS.cyan, s07: COLORS.yellow, s08: COLORS.pink, next: COLORS.cyan,
  s09: COLORS.green, s10: COLORS.cyan, s11: COLORS.yellow, s12: COLORS.pink, s13: COLORS.green,
  s14: COLORS.cyan, s15: COLORS.yellow, s16: COLORS.green,
};

/** Seconds for the silent "Part 2 →" end card of Part 1. */
const NEXT_CARD_SECONDS = 1.8;

export const sceneSeconds = (id: SceneId) =>
  id === "next" ? NEXT_CARD_SECONDS : VOICE[id].duration + PAD_SECONDS;
export const sceneFrames = (id: SceneId) => Math.ceil(sceneSeconds(id) * FPS);

export const COMPOSITIONS = {
  JevFull: ["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08",
            "s09", "s10", "s11", "s12", "s13", "s14", "s15", "s16"] as SceneId[],
  "Part1-Jev": ["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "next"] as SceneId[],
  "Part2-Laya": ["s09", "s10", "s11", "s12", "s13", "s14", "s15", "s16"] as SceneId[],
};
export type CompId = keyof typeof COMPOSITIONS;

export const sceneStarts = (ids: SceneId[]) =>
  ids.reduce<number[]>((acc, id, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + sceneFrames(ids[i - 1]) - TRANSITION_FRAMES);
    return acc;
  }, []);

export const totalFrames = (ids: SceneId[]) =>
  ids.reduce((a, id) => a + sceneFrames(id), 0) - TRANSITION_FRAMES * (ids.length - 1);

// ---------- word lookup for visual beats ----------
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Frame (scene-local) at which a spoken word starts.
 * `match` is compared after stripping punctuation; prefix match allowed ("faster" matches "faster,").
 * Throws if the word is missing so a re-recorded line can never silently desync a beat.
 */
export const wordFrame = (id: SceneId, match: string, nth = 0): number => {
  const m = norm(match);
  const hits = VOICE[id].words.filter((w) => norm(w.w) === m || norm(w.w).startsWith(m));
  const hit = hits[nth];
  if (!hit) throw new Error(`Word "${match}" #${nth} not found in ${id}: ${VOICE[id].words.map((w) => w.w).join(" ")}`);
  return Math.round(hit.s * FPS);
};

/** Words that get a quick zoom punch when spoken. */
export const EMPHASIS = /\d|^(nope|decides|no|free|both|kev|laya)$/i;
