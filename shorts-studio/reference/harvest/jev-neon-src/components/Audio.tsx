import React, { createContext, useContext } from "react";
import { Html5Audio, Sequence, getStaticFiles, staticFile, useVideoConfig } from "remotion";
import LEVELS from "../audio-levels.json";
import { FPS, SceneId, VOICE, sceneStarts } from "../config";

export type AudioAvailability = { music: boolean; whoosh: boolean; pop: boolean; ding: boolean; stamp: boolean };
export const NO_AUDIO: AudioAvailability = { music: false, whoosh: false, pop: false, ding: false, stamp: false };
const AudioCtx = createContext<AudioAvailability>(NO_AUDIO);
export const AudioProvider = AudioCtx.Provider;
/** Inside a <Freeze>d loop-back preview we render a scene's first frame silently. */
export const SilentCtx = createContext(false);

export const detectAudio = (): AudioAvailability => {
  const f = new Set(getStaticFiles().map((x) => x.name));
  return { music: f.has("music.mp3"), whoosh: f.has("sfx/whoosh.mp3"), pop: f.has("sfx/pop.mp3"), ding: f.has("sfx/ding.mp3"), stamp: f.has("sfx/stamp.mp3") };
};

/** SFX stay well under the voice. */
const SFX_VOLUME: Record<string, number> = { whoosh: 0.22, pop: 0.28, ding: 0.22, stamp: 0.4 };

export const Sfx: React.FC<{ name: "whoosh" | "pop" | "ding" | "stamp"; at: number }> = ({ name, at }) => {
  const available = useContext(AudioCtx);
  const silent = useContext(SilentCtx);
  if (!available[name] || silent) return null;
  return (
    <Sequence from={Math.max(0, Math.round(at))} durationInFrames={45} layout="none">
      <Html5Audio src={staticFile(`sfx/${name}.mp3`)} volume={SFX_VOLUME[name]} />
    </Sequence>
  );
};

/** The scene's voice clip, starting at the scene's frame 0. */
export const Voice: React.FC<{ id: SceneId }> = ({ id }) => {
  const silent = useContext(SilentCtx);
  if (id === "next" || silent) return null;
  return <Html5Audio src={staticFile(`vo/${id}.wav`)} />;
};

// ---------- music with sidechain-style ducking from the word timestamps ----------
const db = (x: number) => Math.pow(10, x / 20);
/** Gains that place the music at about -24 LUFS under speech and -16 LUFS in gaps/outro. */
const GAIN_SPEECH = db(-24 - LEVELS.musicLufs);
const GAIN_GAP = db(-16 - LEVELS.musicLufs);
const GAP_SECONDS = 0.6;
const RAMP_FRAMES = Math.round(0.2 * FPS);

export const duckCurve = (ids: SceneId[], total: number): number[] => {
  const starts = sceneStarts(ids);
  const speech: [number, number][] = [];
  ids.forEach((id, i) => {
    if (id === "next") return;
    for (const w of VOICE[id].words) speech.push([starts[i] / FPS + w.s, starts[i] / FPS + w.e]);
  });
  // merge words separated by short gaps: the music only rises in gaps longer than GAP_SECONDS
  const merged: [number, number][] = [];
  for (const iv of speech.sort((a, b) => a[0] - b[0])) {
    const last = merged[merged.length - 1];
    if (last && iv[0] - last[1] <= GAP_SECONDS) last[1] = Math.max(last[1], iv[1]);
    else merged.push([...iv]);
  }
  const target = new Array(total).fill(GAIN_GAP);
  for (const [s, e] of merged) {
    // start ducking a ramp early so the voice never fights the music
    for (let f = Math.max(0, Math.floor(s * FPS) - RAMP_FRAMES); f < Math.min(total, Math.ceil(e * FPS)); f++) target[f] = GAIN_SPEECH;
  }
  // smooth 200 ms ramps (linear in dB)
  const out = new Array(total);
  let cur = 20 * Math.log10(target[0]);
  const step = (20 * Math.log10(GAIN_GAP) - 20 * Math.log10(GAIN_SPEECH)) / RAMP_FRAMES;
  for (let f = 0; f < total; f++) {
    const t = 20 * Math.log10(target[f]);
    cur = t > cur ? Math.min(t, cur + step) : Math.max(t, cur - step);
    out[f] = db(cur);
  }
  // fade in / out over 1 s
  for (let f = 0; f < total; f++) out[f] *= Math.min(1, f / FPS, (total - 1 - f) / FPS);
  return out;
};

export const Music: React.FC<{ curve: number[] }> = ({ curve }) => {
  const available = useContext(AudioCtx);
  const { durationInFrames } = useVideoConfig();
  if (!available.music) return null;
  return <Html5Audio src={staticFile("music.mp3")} loop volume={(f) => curve[Math.min(durationInFrames - 1, Math.max(0, Math.round(f)))] ?? 0} />;
};
