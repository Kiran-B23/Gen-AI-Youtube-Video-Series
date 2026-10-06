import React from "react";
import { AbsoluteFill, Freeze, interpolate, useCurrentFrame } from "remotion";
import { TransitionPresentation, TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { AudioAvailability, AudioProvider, Music, duckCurve } from "./audio/AudioMix";
import { SceneCtxValue, SceneProvider, SilentCtx, VideoCtx, getTheme } from "./core/context";
import { partLayout } from "./core/durations";
import { ProgressBar } from "./core/ProgressBar";
import { Overlays } from "./core/Overlays";
import { SceneShell } from "./core/SceneShell";
import { SCENES } from "./scenes";
import { TRANSITION_FRAMES } from "./theme/tokens";
import { SceneSpec, Timings, VideoSpec } from "./types";
import { ColorKey } from "./types";

export type VideoProps = { spec: VideoSpec; timings: Timings; part: string; musicLufs: number; audio: AudioAvailability };

const Scene: React.FC<{ s: SceneSpec }> = ({ s }) => {
  const C = SCENES[s.type];
  return <SceneShell>{C ? <C /> : <div style={{ color: "red", fontSize: 60 }}>Unknown scene type: {s.type}</div>}</SceneShell>;
};

/** Last scene with props.loopTo = "first": its final frames dissolve into the part's first frame (seamless loop). */
const LoopOut: React.FC<{ dur: number; first: SceneCtxValue; firstScene: SceneSpec; children: React.ReactNode }> = ({ dur, first, firstScene, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [dur - 12, dur - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      {children}
      {o > 0 ? (
        <AbsoluteFill style={{ opacity: o }}>
          <SilentCtx.Provider value>
            <SceneProvider value={first}><Freeze frame={0}><Scene s={firstScene} /></Freeze></SceneProvider>
          </SilentCtx.Provider>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

export const Video: React.FC<VideoProps> = ({ spec, timings, part, musicLufs, audio }) => {
  const theme = getTheme(spec.theme);
  const ids = spec.parts[part] ?? spec.parts.full;
  const scenes = ids.map((id) => spec.scenes.find((s) => s.id === id)!).filter(Boolean);
  const { frames, starts, total } = partLayout(scenes, timings);
  const curve = duckCurve(ids, starts, timings, total, musicLufs);
  const accentFor = (i: number): ColorKey => scenes[i].accent ?? theme.rotation[i % theme.rotation.length];
  const ctx = (i: number): SceneCtxValue => ({ scene: scenes[i], index: i, globalStart: starts[i], first: i === 0, accent: accentFor(i) });
  // page changes get a full-screen colour wipe (alternating direction); same page -> quick fade
  const transition = (i: number): TransitionPresentation<Record<string, unknown>> =>
    (theme.flat
      ? scenes[i].page !== scenes[i - 1].page ? wipe({ direction: i % 2 ? "from-right" : "from-bottom" }) : fade()
      : [fade(), slide({ direction: "from-right" }), fade(), slide({ direction: "from-bottom" })][i % 4]) as TransitionPresentation<Record<string, unknown>>;
  return (
    <VideoCtx.Provider value={{ spec, timings, theme, ids, starts, total }}>
      <AudioProvider value={audio}>
        <AbsoluteFill style={{ background: theme.pages?.ink.bg ?? theme.bg[0] }}>
          <TransitionSeries>
            {scenes.map((s, i) => (
              <React.Fragment key={s.id}>
                {i > 0 ? <TransitionSeries.Transition presentation={transition(i)} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} /> : null}
                <TransitionSeries.Sequence durationInFrames={frames[i]}>
                  <SceneProvider value={ctx(i)}>
                    {i === scenes.length - 1 && (s.props as { loopTo?: string }).loopTo ? (
                      <LoopOut dur={frames[i]} first={ctx(0)} firstScene={scenes[0]}><Scene s={s} /></LoopOut>
                    ) : <Scene s={s} />}
                  </SceneProvider>
                </TransitionSeries.Sequence>
              </React.Fragment>
            ))}
          </TransitionSeries>
          <Overlays />
          {!theme.flat ? <ProgressBar /> : null}
          <Music src={spec.music} curve={curve} />
        </AbsoluteFill>
      </AudioProvider>
    </VideoCtx.Provider>
  );
};
