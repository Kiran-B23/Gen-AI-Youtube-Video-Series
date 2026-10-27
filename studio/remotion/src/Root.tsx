// One composition: the project that tools/run.sh <slug> remotion selected (src/current.generated.ts).
// Props are serialised to JSON by Remotion, so the layout and the Stage component are imported, never passed as props.
import React from "react";
import { Composition } from "remotion";
import { Reel } from "./engine/Reel";
import { layout } from "./current.generated";

const FPS = 30;
export const Root: React.FC = () => (
  <Composition id="Reel" component={Reel} defaultProps={{}}
    durationInFrames={Math.ceil(layout.total * FPS)} fps={FPS} width={layout.size[0]} height={layout.size[1]} />
);
