import React from "react";
import { Composition } from "remotion";
import { COMPOSITIONS, CompId, FPS, HEIGHT, WIDTH, totalFrames } from "./config";
import { NO_AUDIO, detectAudio } from "./components/Audio";
import { Main, MainProps } from "./Main";

export const RemotionRoot: React.FC = () => (
  <>
    {(Object.keys(COMPOSITIONS) as CompId[]).map((id) => (
      <Composition key={id} id={id} component={Main} durationInFrames={totalFrames(COMPOSITIONS[id])} fps={FPS} width={WIDTH} height={HEIGHT}
        defaultProps={{ comp: id, audio: NO_AUDIO } satisfies MainProps}
        calculateMetadata={({ props }) => ({ props: { ...props, audio: detectAudio() } })} />
    ))}
  </>
);
