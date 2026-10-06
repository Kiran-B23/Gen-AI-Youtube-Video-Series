import { useBeats, useSceneCtx } from "../core/context";
import { useMainAt } from "../core/SceneShell";

/** Typed access to the scene's props plus beat helpers. Fallback timing staggers items after the main visual starts. */
export const useScene = <P,>() => {
  const { scene } = useSceneCtx();
  const b = useBeats();
  const mainAt = useMainAt();
  const at = (target: string, fallback?: number) => b.at(target, fallback ?? mainAt);
  const item = (prefix: string, i: number, step = 10) => b.at(`${prefix}.${i}`, mainAt + 6 + i * step);
  return { scene, props: scene.props as P, ...b, at, item, mainAt };
};
