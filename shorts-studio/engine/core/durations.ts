import { FPS, TRANSITION_FRAMES } from "../theme/tokens";
import { SceneSpec, Timings } from "../types";
import { PAD_SECONDS } from "../theme/tokens";

export const sceneSeconds = (s: SceneSpec, t: Timings) => (s.silentSeconds ?? (t[s.id]?.duration ?? 3)) + (s.silentSeconds ? 0 : PAD_SECONDS);
export const sceneFrames = (s: SceneSpec, t: Timings) => Math.ceil(sceneSeconds(s, t) * FPS);
export const partLayout = (scenes: SceneSpec[], t: Timings) => {
  const frames = scenes.map((s) => sceneFrames(s, t));
  const starts = frames.reduce<number[]>((acc, _f, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + frames[i - 1] - TRANSITION_FRAMES); return acc; }, []);
  const total = frames.reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * Math.max(0, scenes.length - 1);
  return { frames, starts, total };
};
