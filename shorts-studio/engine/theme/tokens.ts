import { loadFont } from "@remotion/google-fonts/Poppins";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/InterTight";

const { fontFamily: poppins } = loadFont("normal", { weights: ["600", "800", "900"], subsets: ["latin"] });
const { fontFamily: mono } = loadMono("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: anton } = loadAnton("normal", { weights: ["400"], subsets: ["latin"] });
const { fontFamily: inter } = loadInter("normal", { weights: ["500", "700", "800", "900"], subsets: ["latin"] });

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const MAX_SECONDS = 180;
/** Scene length = voice clip + PAD. Transitions overlap by exactly PAD, so voices never overlap and no frame is blank. */
export const PAD_SECONDS = 0.3;
export const TRANSITION_FRAMES = Math.round(PAD_SECONDS * FPS);

/** Platform UI covers the bottom 20% and right 12%. */
export const SAFE = { top: 120, left: 60, right: 950, bottom: 1536 };
/** Content width is 840 (not 890) so zoom punches never drift into the right UI zone. */
export const SAFE_W = 840;
export const COL_W = (SAFE_W - 40) / 2;
export const COL2_X = COL_W + 40;
/** Main visuals live in the 25%–60% band (canvas y 480–1152); in SafeArea coordinates: */
export const BAND_TOP = 480 - SAFE.top;
export const BAND_H = 1152 - 480;
/** Captions sit at ~62–78% of frame height. */
export const CAPTION_TOP = 1350;

export const FONT = `${poppins}, "Noto Color Emoji", sans-serif`;
export const MONO = `${mono}, monospace`;
/** Editorial roles: condensed display for titles/numerals, grotesk for body/captions. */
export const DISPLAY = `${anton}, "Noto Color Emoji", sans-serif`;
export const BODY = `${inter}, "Noto Color Emoji", sans-serif`;
/** Editorial grid margin inside the safe area. */
export const EDGE = 12;
/** Editorial content inset inside the safe area: 36 px -> text starts 96 px from the screen edge. */
export const INSET = 36;
export const EMOJI_FONT = `"Noto Color Emoji", "Apple Color Emoji", sans-serif`;
export const SIZE = { headline: 96, title: 72, body: 44, chip: 44, caption: 80, pill: 36, min: 40 };
export const TEXT_SHADOW = "0 6px 0 rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.55)";
export const glow = (color: string, strength = 1) =>
  `0 0 ${24 * strength}px ${color}AA, 0 0 ${60 * strength}px ${color}55, 0 12px 30px rgba(0,0,0,0.45)`;
