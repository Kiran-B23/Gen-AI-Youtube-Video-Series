import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionPresentation, TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { COMPOSITIONS, CompId, SceneId, TRANSITION_FRAMES, sceneFrames, sceneStarts, totalFrames } from "./config";
import { AudioAvailability, AudioProvider, Music, duckCurve } from "./components/Audio";
import { ProgressBar } from "./components/ProgressBar";
import { SceneCtx } from "./components/SceneShell";
import { S01Hook } from "./scenes/S01Hook";
import { S02Talking } from "./scenes/S02Talking";
import { S03Different } from "./scenes/S03Different";
import { S04Numbers } from "./scenes/S04Numbers";
import { S05Replace } from "./scenes/S05Replace";
import { S06Useful } from "./scenes/S06Useful";
import { S07Verdict } from "./scenes/S07Verdict";
import { S08Cliff } from "./scenes/S08Cliff";
import { SNext } from "./scenes/SNext";
import { S09LayaHook } from "./scenes/S09LayaHook";
import { S10MeetLaya } from "./scenes/S10MeetLaya";
import { S11Twist } from "./scenes/S11Twist";
import { S12Silence } from "./scenes/S12Silence";
import { S13Others } from "./scenes/S13Others";
import { S14Project } from "./scenes/S14Project";
import { S15Sense } from "./scenes/S15Sense";
import { S16Ending } from "./scenes/S16Ending";

export const SCENE_COMPONENTS: Record<Exclude<SceneId, "s16">, React.FC> = {
  s01: S01Hook, s02: S02Talking, s03: S03Different, s04: S04Numbers, s05: S05Replace, s06: S06Useful,
  s07: S07Verdict, s08: S08Cliff, next: SNext, s09: S09LayaHook, s10: S10MeetLaya, s11: S11Twist,
  s12: S12Silence, s13: S13Others, s14: S14Project, s15: S15Sense,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TRANSITIONS: TransitionPresentation<any>[] = [
  slide({ direction: "from-right" }), wipe({ direction: "from-bottom-right" }), fade(), slide({ direction: "from-bottom" }),
  wipe({ direction: "from-left" }), slide({ direction: "from-left" }), fade(), wipe({ direction: "from-top" }),
  slide({ direction: "from-top" }), wipe({ direction: "from-top-left" }),
];

export type MainProps = { comp: CompId; audio: AudioAvailability };

export const Main: React.FC<MainProps> = ({ comp, audio }) => {
  const ids = COMPOSITIONS[comp];
  const starts = sceneStarts(ids);
  const curve = duckCurve(ids, totalFrames(ids));
  const loop = SCENE_COMPONENTS[ids[0] as Exclude<SceneId, "s16">];
  return (
    <AudioProvider value={audio}>
      <AbsoluteFill style={{ backgroundColor: "#120A2E" }}>
        <TransitionSeries>
          {ids.map((id, i) => {
            const Scene = id === "s16" ? null : SCENE_COMPONENTS[id];
            return (
              <React.Fragment key={id}>
                {i > 0 ? <TransitionSeries.Transition presentation={TRANSITIONS[(i - 1) % TRANSITIONS.length]} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} /> : null}
                <TransitionSeries.Sequence durationInFrames={sceneFrames(id)}>
                  <SceneCtx.Provider value={{ globalStart: starts[i], first: i === 0 }}>
                    {Scene ? <Scene /> : <S16Ending loop={loop} />}
                  </SceneCtx.Provider>
                </TransitionSeries.Sequence>
              </React.Fragment>
            );
          })}
        </TransitionSeries>
        <ProgressBar />
        <Music curve={curve} />
      </AbsoluteFill>
    </AudioProvider>
  );
};
