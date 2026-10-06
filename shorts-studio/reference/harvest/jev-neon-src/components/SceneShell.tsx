import React, { useContext } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { ACCENT, EMPHASIS, FPS, SceneId, VOICE, sceneFrames } from "../config";
import { Background } from "./Background";
import { SafeArea } from "./SafeArea";
import { SilentCtx, Sfx, Voice } from "./Audio";
import { SpokenCaption } from "./SpokenCaption";
import { useCurrentFrame } from "remotion";

export const SceneCtx = React.createContext<{ globalStart: number; first: boolean }>({ globalStart: 0, first: true });

/**
 * Every scene: opaque background (continuous across scenes), voice, slow 1.00->1.05 camera zoom,
 * a quick zoom punch on emphasised spoken words, captions synced to speech, whoosh on entry.
 */
export const SceneShell: React.FC<{ id: SceneId; children: React.ReactNode; captions?: boolean; extraPunches?: number[] }> = ({ id, children, captions = true, extraPunches = [] }) => {
  const frame = useCurrentFrame();
  const { globalStart, first } = useContext(SceneCtx);
  const silent = useContext(SilentCtx);
  const dur = sceneFrames(id);
  const words = id === "next" ? [] : VOICE[id].words;
  // punch frames: emphasised words, at most one every 0.5 s
  const punches: number[] = [];
  for (const w of words) {
    const f = Math.round(w.s * FPS);
    if (EMPHASIS.test(w.w.replace(/[^\w$%]/g, "")) && (!punches.length || f - punches[punches.length - 1] > 15)) punches.push(f);
  }
  punches.push(...extraPunches);
  const zoom = interpolate(frame, [0, dur], [1, 1.05], { extrapolateRight: "clamp" });
  const punch = punches.reduce((acc, p) => acc + interpolate(frame - p, [0, 3, 12], [0, 0.03, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), 0);
  return (
    <AbsoluteFill>
      <Background globalFrame={globalStart + frame} accent={ACCENT[id]} />
      <AbsoluteFill style={{ transform: `scale(${zoom + Math.min(punch, 0.05)})`, transformOrigin: "44.5% 42%" }}>
        <SafeArea>{children}</SafeArea>
      </AbsoluteFill>
      {captions && words.length ? <SpokenCaption words={words} accent={ACCENT[id]} /> : null}
      <Voice id={id} />
      {!first && !silent ? <Sfx name="whoosh" at={0} /> : null}
    </AbsoluteFill>
  );
};
