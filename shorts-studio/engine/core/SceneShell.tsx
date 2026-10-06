import React, { useContext } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Voice } from "../audio/AudioMix";
import { FPS, INSET, SAFE } from "../theme/tokens";
import { Background } from "./Background";
import { Captions } from "./Captions";
import { SilentCtx, useBeats, usePage, useSceneCtx, useTheme, useVideo } from "./context";
import { ChapterIntro, Eyebrow, Reveal, SourcePill, StepHeader, useStep } from "./editorial";
import { Confetti, useShake } from "./Kinetic";
import { SafeArea } from "./SafeArea";

/** When does a chapter's main visual take over? Right after the "Step N." sentence. */
export const useMainAt = () => {
  const { scene } = useSceneCtx();
  const { words } = useBeats();
  if (!scene.chapter) return 0;
  const i = words.findIndex((w) => /[.!?]$/.test(w.w));
  const nxt = words[i + 1];
  return nxt ? Math.round(nxt.s * FPS) - 4 : 30;
};

/**
 * Wraps every scene: page/background, voice, step header + chapter intro, captions,
 * and the generic beat actions (zoom-punch, stamp shake, burst confetti, sfx:<name>).
 */
export const SceneShell: React.FC<{ children: React.ReactNode; captions?: boolean }> = ({ children, captions = true }) => {
  const frame = useCurrentFrame();
  const { spec } = useVideo();
  const theme = useTheme();
  const page = usePage();
  const { scene, globalStart, first, accent } = useSceneCtx();
  const silent = useContext(SilentCtx);
  const { beats, words } = useBeats();
  const step = useStep();
  const mainAt = useMainAt();
  const punches = beats.filter((b) => b.action === "zoom-punch" || b.action === "stamp" || b.action === "burst").map((b) => b.frame);
  // non-flat themes: a light zoom punch on emphasised spoken words (numbers + video keywords), max one per 0.6 s
  if (!theme.flat) {
    const keys = new Set((spec.keywords ?? []).map((k) => k.toLowerCase().replace(/[^a-z0-9]/g, "")));
    for (const w of words) {
      const n = w.w.toLowerCase().replace(/[^a-z0-9]/g, ""); const f = Math.round(w.s * FPS);
      if ((/\d/.test(n) || keys.has(n)) && punches.every((p) => Math.abs(p - f) > 18)) punches.push(f);
    }
  }
  const punch = punches.reduce((a, p) => a + interpolate(frame - p, [0, 3, 12], [0, theme.flat ? 0.025 : 0.018, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), 0);
  const stamp = beats.find((b) => b.action === "stamp");
  const shake = useShake(stamp ? stamp.frame + 2 : -999, 16, 12);
  const calmZoom = theme.flat ? 1 : interpolate(frame, [0, 300], [1, 1.05], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: theme.flat ? page.bg : undefined }}>
      {!theme.flat ? <Background globalFrame={globalStart + frame} accent={theme.colors[accent]} calm={scene.tone === "calm"} /> : null}
      <AbsoluteFill style={{ transform: `${shake} scale(${calmZoom + Math.min(punch, 0.04)})`, transformOrigin: "44% 42%" }}>
        <SafeArea>
          {scene.chapter ? <ChapterIntro index={scene.chapter.index} total={spec.steps ?? 6} title={scene.chapter.title} until={mainAt} /> : null}
          {step.index > 0 && scene.type !== "recap-card" ? <StepHeader index={step.index} total={step.total} at={scene.chapter ? mainAt : 0} /> : null}
          {scene.kicker ? <Reveal at={0} dy={-16} style={{ position: "absolute", left: INSET, top: 30 }}><Eyebrow style={{ fontSize: 32 }}>{scene.kicker}</Eyebrow></Reveal> : null}
          {frame >= mainAt - 2 ? children : null}
          {scene.source ? <div style={{ position: "absolute", left: INSET, top: 1000 }}><SourcePill text={scene.source} at={mainAt + 10} /></div> : null}
        </SafeArea>
      </AbsoluteFill>
      {beats.filter((b) => b.action === "burst").map((b, i) => <Confetti key={i} at={b.frame} x={SAFE.left + 420} y={700} />)}
      {captions !== false && scene.captions !== false ? <Captions words={words} /> : null}
      <Voice slug={spec.slug} id={scene.id} />
      {!silent && !first ? <Sfx name={scene.chapter ? "riser" : "whoosh"} at={0} /> : null}
      {beats.filter((b) => b.action.startsWith("sfx:")).map((b, i) => <Sfx key={i} name={b.action.slice(4) as "pop"} at={b.frame} />)}
      {stamp ? <Sfx name="stamp" at={stamp.frame} /> : null}
    </AbsoluteFill>
  );
};
