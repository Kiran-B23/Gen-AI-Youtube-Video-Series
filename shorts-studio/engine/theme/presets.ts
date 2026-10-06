import { ColorKey } from "../types";

/** A flat "page" colour set (editorial preset). Text/accents are picked to pass contrast on that page. */
export type Page = { bg: string; text: string; dim: string; accent: string; accent2: string; card: string; line: string };

export type Theme = {
  name: string;
  /** flat = editorial (solid pages, no orbs); otherwise animated gradient + orbs. */
  flat: boolean;
  bg: [string, string];
  bgEnd?: [string, string];
  colors: Record<ColorKey | "special", string>;
  rotation: ColorKey[];
  calm: [string, string];
  pages?: Record<string, Page>;
  /** Font roles: display (titles/numerals), body (captions/text), mono (data). */
  fonts: "editorial" | "neon";
  /** Background motif for non-flat themes. */
  motif?: "orbs" | "constellation";
  /** Captions sit on a soft glass backing (for bright/moving backgrounds). */
  captionBacking?: boolean;
};

export const PRESETS: Record<string, Theme> = {
  editorial: {
    name: "editorial",
    flat: true,
    bg: ["#0B1020", "#0B1020"],
    colors: { primary: "#2840E6", secondary: "#FFD43B", tertiary: "#A99BFF", highlight: "#FFD43B", ok: "#2ED3A0", warn: "#FFB020", danger: "#FF5A6E", special: "#A99BFF" },
    rotation: ["primary", "secondary", "tertiary", "highlight"],
    calm: ["#0B1020", "#0B1020"],
    fonts: "editorial",
    pages: {
      ink: { bg: "#0B1020", text: "#FFFFFF", dim: "rgba(255,255,255,0.58)", accent: "#FFD43B", accent2: "#A99BFF", card: "#151B33", line: "rgba(255,255,255,0.2)" },
      royal: { bg: "#2840E6", text: "#FFFFFF", dim: "rgba(255,255,255,0.62)", accent: "#FFD43B", accent2: "#C9C2FF", card: "#3A52F0", line: "rgba(255,255,255,0.32)" },
      paper: { bg: "#EEF1F6", text: "#0B1020", dim: "rgba(11,16,32,0.5)", accent: "#2840E6", accent2: "#6B5CE6", card: "#FFFFFF", line: "rgba(11,16,32,0.16)" },
      sunflower: { bg: "#FFD43B", text: "#0B1020", dim: "rgba(11,16,32,0.55)", accent: "#2840E6", accent2: "#0B1020", card: "#FFE680", line: "rgba(11,16,32,0.22)" },
    },
  },
  neonNight: {
    name: "neonNight",
    flat: false,
    bg: ["#1A0B3D", "#0B1A3D"],
    colors: { primary: "#39FF88", secondary: "#FF3CAC", tertiary: "#00E5FF", highlight: "#FFD60A", ok: "#39FF88", warn: "#FFD60A", danger: "#FF4D4D", special: "#A99BFF" },
    rotation: ["secondary", "tertiary", "primary", "highlight"],
    calm: ["#141A3A", "#0E1630"],
    fonts: "neon",
  },
  dayToNight: {
    name: "dayToNight",
    flat: false,
    bg: ["#0D1030", "#151A45"],
    bgEnd: ["#6C63FF", "#FF8A5B"],
    colors: { primary: "#6C63FF", secondary: "#2EC4B6", tertiary: "#FF8A5B", highlight: "#FFC145", ok: "#2EC4B6", warn: "#FFC145", danger: "#FF5A5F", special: "#A99BFF" },
    rotation: ["primary", "secondary", "tertiary", "highlight"],
    calm: ["#0E1A3A", "#123048"],
    fonts: "editorial",
    motif: "constellation",
    captionBacking: true,
    // glass "page" so editorial building blocks (Box, pills, captions) read well on the moving gradient
    pages: { ink: { bg: "transparent", text: "#FFFFFF", dim: "rgba(255,255,255,0.68)", accent: "#FFC145", accent2: "#2EC4B6", card: "rgba(13,16,48,0.55)", line: "rgba(255,255,255,0.26)" } },
  },
};

export const getTheme = (name: string): Theme => PRESETS[name] ?? PRESETS.editorial;
