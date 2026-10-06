import { loadFont } from "@remotion/google-fonts/Poppins";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: poppins } = loadFont("normal", { weights: ["600", "800", "900"], subsets: ["latin"] });
const { fontFamily: mono } = loadMono("normal", { weights: ["500", "700"], subsets: ["latin"] });

export const FONT = `${poppins}, "Noto Color Emoji", sans-serif`;
export const MONO = `${mono}, monospace`;
export const EMOJI_FONT = `"Noto Color Emoji", "Apple Color Emoji", sans-serif`;
export const TEXT_SHADOW = "0 6px 0 rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.55)";
export const glow = (color: string, strength = 1) =>
  `0 0 ${24 * strength}px ${color}AA, 0 0 ${60 * strength}px ${color}55, 0 12px 30px rgba(0,0,0,0.45)`;
