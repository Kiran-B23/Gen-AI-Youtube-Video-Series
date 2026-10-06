/** The video.json contract. See .claude/skills/shorts-video/references/video-json.md */
export type BeatAction = "show" | "hide" | "burst" | "stamp" | "zoom-punch" | "count-up" | "highlight" | `sfx:${string}`;
export type Beat = { word: string; nth?: number; action: BeatAction; target?: string; offset?: number };
export type ColorKey = "primary" | "secondary" | "tertiary" | "highlight" | "ok" | "warn" | "danger";

export type SceneSpec = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  beats?: Beat[];
  source?: string;
  accent?: ColorKey;
  /** Scenes without a voice clip (e.g. an end card) give their length here. */
  silentSeconds?: number;
  captions?: boolean;
  /** Flat page colour for the editorial preset: ink | royal | paper | sunflower. */
  page?: string;
  /** Small section label (news flow) shown top-left instead of a step header. */
  kicker?: string;
  /** "calm" = cooler background tint (safety scenes). */
  tone?: string;
  /** Opens a numbered chapter: big numeral + title, then the scene's main visual. */
  chapter?: { index: number; title: string };
};

export type VideoSpec = {
  slug: string;
  title: string;
  theme: string;
  music?: string;
  voiceNote?: string;
  /** Number of chapters, for the "STEP 02 / 06" header. */
  steps?: number;
  names?: string[];
  /** Words coloured in captions once spoken (numbers are always coloured). */
  keywords?: string[];
  /** Max words per caption card (default 8). */
  captionMaxWords?: number;
  /** Recurring 24h clock: start/end time across the whole video. */
  clock?: { from: string; to: string };
  /** Video-wide overlays pinned across scenes, between two spoken words. */
  overlays?: { type: "padlock" | "clock"; label?: string; from: { scene: string; word: string }; until: { scene: string; word: string } }[];
  parts: Record<string, string[]>;
  scenes: SceneSpec[];
};

export type Word = { w: string; s: number; e: number };
export type Timings = Record<string, { duration: number; words: Word[] }>;
