import React from "react";
import { Composition } from "remotion";
import { detectAudio } from "./audio/AudioMix";
import { partLayout } from "./core/durations";
import { CATALOG } from "./catalog";
import { MUSIC_LEVELS, VIDEOS } from "./registry.generated";
import { FPS, HEIGHT, WIDTH } from "./theme/tokens";
import { Video, VideoProps } from "./Video";
import { Timings, VideoSpec } from "./types";

const comps = [...VIDEOS, CATALOG].flatMap(({ spec, timings }) =>
  Object.keys((spec as VideoSpec).parts).map((part) => ({ spec: spec as VideoSpec, timings: timings as Timings, part })),
);

/** One composition per videos/<slug> part: "<slug>" for full, "<slug>-<part>" otherwise. */
export const RemotionRoot: React.FC = () => (
  <>
    {comps.map(({ spec, timings, part }) => {
      const scenes = spec.parts[part].map((id) => spec.scenes.find((s) => s.id === id)!);
      const id = part === "full" ? spec.slug : `${spec.slug}-${part}`;
      return (
        <Composition key={id} id={id} component={Video} fps={FPS} width={WIDTH} height={HEIGHT}
          durationInFrames={Math.max(1, partLayout(scenes, timings).total)}
          defaultProps={{ spec, timings, part, musicLufs: MUSIC_LEVELS[spec.music ?? ""] ?? -14, audio: {} } satisfies VideoProps}
          calculateMetadata={({ props }) => ({ props: { ...props, audio: detectAudio() } })} />
      );
    })}
  </>
);
