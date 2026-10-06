import React, { createContext, useContext } from "react";
import { Html5Audio, Sequence, getStaticFiles, staticFile, useVideoConfig } from "remotion";
import { SilentCtx } from "../core/context";
import { FPS } from "../theme/tokens";
import { Timings } from "../types";

export type SfxName = "whoosh" | "pop" | "ding" | "stamp" | "riser" | "tick";
export type AudioAvailability = Record<string, boolean>;
const AudioCtx = createContext<AudioAvailability>({});
export const AudioProvider = AudioCtx.Provider;

export const detectAudio = (): AudioAvailability => {
  const out: AudioAvailability = {};
  for (const f of getStaticFiles()) out[f.name] = true;
  return out;
};

/** SFX always sit well under the voice. */
const SFX_VOLUME: Record<SfxName, number> = { whoosh: 0.2, pop: 0.22, ding: 0.2, stamp: 0.35, riser: 0.22, tick: 0.12 };

export const Sfx: React.FC<{ name: SfxName; at: number }> = ({ name, at }) => {
  const available = useContext(AudioCtx);
  const silent = useContext(SilentCtx);
  if (!available[`sfx/${name}.mp3`] || silent) return null;
  return (
    <Sequence from={Math.max(0, Math.round(at))} durationInFrames={60} layout="none">
      <Html5Audio src={staticFile(`sfx/${name}.mp3`)} volume={SFX_VOLUME[name]} />
    </Sequence>
  );
};

/** The scene's cleaned voice clip, from scene frame 0. */
export const Voice: React.FC<{ slug: string; id: string }> = ({ slug, id }) => {
  const available = useContext(AudioCtx);
  const silent = useContext(SilentCtx);
  const src = `vo/${slug}/${id}.wav`;
  if (silent || !available[src]) return null;
  return <Html5Audio src={staticFile(src)} />;
};

// ---- music ducked from word timestamps: ~-24 LUFS under speech, ~-16 LUFS in gaps > 0.6 s and the outro, 200 ms ramps ----
const db = (x: number) => Math.pow(10, x / 20);
export const duckCurve = (ids: string[], starts: number[], timings: Timings, total: number, musicLufs: number): number[] => {
  const speech: [number, number][] = [];
  ids.forEach((id, i) => (timings[id]?.words ?? []).forEach((w) => speech.push([starts[i] / FPS + w.s, starts[i] / FPS + w.e])));
  const merged: [number, number][] = [];
  for (const iv of speech.sort((a, b) => a[0] - b[0])) {
    const last = merged[merged.length - 1];
    if (last && iv[0] - last[1] <= 0.6) last[1] = Math.max(last[1], iv[1]);
    else merged.push([...iv]);
  }
  const lo = -24 - musicLufs, hi = -16 - musicLufs, ramp = Math.round(0.2 * FPS);
  const target = new Array(total).fill(hi);
  for (const [s, e] of merged) for (let f = Math.max(0, Math.floor(s * FPS) - ramp); f < Math.min(total, Math.ceil(e * FPS)); f++) target[f] = lo;
  const out = new Array(total);
  let cur = target[0];
  const step = (hi - lo) / ramp;
  for (let f = 0; f < total; f++) {
    cur = target[f] > cur ? Math.min(target[f], cur + step) : Math.max(target[f], cur - step);
    out[f] = db(cur) * Math.min(1, f / FPS, (total - 1 - f) / FPS);
  }
  return out;
};

export const Music: React.FC<{ src?: string; curve: number[] }> = ({ src, curve }) => {
  const available = useContext(AudioCtx);
  const { durationInFrames } = useVideoConfig();
  if (!src || !available[src]) return null;
  return <Html5Audio src={staticFile(src)} loop volume={(f) => curve[Math.min(durationInFrames - 1, Math.max(0, Math.round(f)))] ?? 0} />;
};
