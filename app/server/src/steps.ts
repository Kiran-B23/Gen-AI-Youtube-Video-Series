// The allow-list: the only commands the app can run are these run.sh steps (no shell, no arguments from the client
// beyond a validated slug, and only the documented RETAKE / RESPLIT switches for voice; preview's PORT is computed here).
import crypto from "node:crypto";
import { PREVIEW_PORT_BASE } from "./config.js";
export interface StepDef {
  id: string;
  label: string;
  what: string;
  /** asks the owner before it runs (spends a Gemini request, a long render, or copies to shorts/) */
  confirm?: string;
  /** shown in the Build stepper (deliver/benchmark/stills sit outside the main line) */
  main: boolean;
}

export const STEPS: StepDef[] = [
  { id: "validate", label: "Validate", what: "static check of scenes.json: types, props, beat words, clip files, length", main: true },
  { id: "voice", label: "Voice", what: "one Gemini take (or recordings / Kokoro) → clean → Whisper word timings + the pace table", main: true,
    confirm: "Voice spends a Gemini TTS request (unless RESPLIT re-splits the saved take). Run it?" },
  { id: "clips", label: "Clips", what: "render the Manim / Playwright / VHS clips the scenes ask for", main: true },
  { id: "assemble", label: "Assemble", what: "scenes.json + timings → HyperFrames project (hf/) + audio mix", main: true },
  { id: "check", label: "Check", what: "HyperFrames lint / layout / contrast checks", main: true },
  { id: "payoffs", label: "Payoffs", what: "every beat's element on screen on its word, captions ≤ 2 lines, nothing still > 2.5 s", main: true },
  { id: "stills", label: "Stills", what: "contact sheet of every scene's middle frame → out/stills.png", main: false },
  { id: "render", label: "Render", what: "MP4 → out/<slug>.mp4 only (several minutes, CPU-bound)", main: true,
    confirm: "Render takes several minutes of CPU and replaces out/<slug>.mp4. Run it?" },
  { id: "qa", label: "QA", what: "eval of the rendered MP4 → out/qa.json", main: true },
  { id: "watch", label: "Watch", what: "2 fps contact sheets + transcript, unclear words, pauses, pace → out/watch.json", main: true },
  { id: "review", label: "Review", what: "merge every ✗ from qa / payoffs / watch into review.md (the fix list)", main: true },
  { id: "benchmark", label: "Benchmark", what: "the render vs references/benchmark.json: pace, still-%, cuts/min", main: false },
  { id: "preview", label: "Studio preview", what: "HyperFrames Studio in the background on this project's port: frame-accurate scrubbing and element selection", main: false },
  { id: "deliver", label: "Deliver", what: "copy to shorts/ only when every gate is green and review.md is closed and ticked", main: false,
    confirm: "Deliver copies the MP4 to shorts/ (run.sh refuses if any gate is open). Run it?" },
];
export const STEP_IDS = new Set(STEPS.map((s) => s.id));
export const CONFIRM_STEPS = new Set(STEPS.filter((s) => s.confirm).map((s) => s.id));

/** Env switches the client may set, per step. Values are fixed here, never taken from the request. */
export const STEP_FLAGS: Record<string, Record<string, Record<string, string>>> = {
  voice: { resplit: { RESPLIT: "1" }, retake: { RETAKE: "1" } },
};

/** a stable port per project for `run.sh <slug> preview` (several projects can have a Studio open at once) */
export const previewPort = (slug: string) => PREVIEW_PORT_BASE + (crypto.createHash("sha1").update(slug).digest().readUInt16BE(0) % 200);

/** env the server sets for a step, whatever the request says */
export function stepEnv(slug: string, step: string): Record<string, string> {
  return step === "preview" ? { PORT: String(previewPort(slug)) } : {};
}
