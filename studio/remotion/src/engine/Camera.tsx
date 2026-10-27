// The camera, mirrored from the HyperFrames kit: the stage sits inside one wrapper (#cam there, this component here)
// and every move is `translate(540 − x·z, 840 − y·z) scale(z)` with transform-origin 0 0, so stage point (x, y) lands on
// the stage zone's centre (540, 840) at zoom z; home = (540, 840, 1). Moves come from layout.camera (a beat's
// "cam": [x, y, zoom], written by tools/assemble.py) and tween exactly like GSAP's `tl.to('#cam', {x, y, scale})`:
// the transform values interpolate, eased in-out over d seconds, from the previous move's end state.
import React, { type CSSProperties } from "react";
import { ease, prog } from "./anim";
import { useStage } from "./stage";
import type { CamMove } from "./types";

export const CAM_HOME = { x: 540, y: 840, zoom: 1 } as const;
const W2 = 540, CAMC = 840;   // frame centre x, stage zone centre y (zone y 220–1460)
type CamState = { tx: number; ty: number; z: number };
const stateOf = (m: { x: number; y: number; zoom: number }): CamState => ({ tx: W2 - m.x * m.zoom, ty: CAMC - m.y * m.zoom, z: m.zoom });

/** the camera transform at time t: the last keyframe before t, tweening into the active move (power3.inOut over d) */
export const camState = (camera: CamMove[] | undefined, t: number): CamState => {
  const moves = [...(camera ?? [])].sort((a, b) => a.at - b.at);
  let prev = stateOf(CAM_HOME);
  for (const m of moves) {
    if (t < m.at) break;
    const next = stateOf(m), p = prog(t, m.at, m.d ?? 0.6, ease.inOut3);
    if (p >= 1) { prev = next; continue; }
    return { tx: prev.tx + (next.tx - prev.tx) * p, ty: prev.ty + (next.ty - prev.ty) * p, z: prev.z + (next.z - prev.z) * p };
  }
  return prev;
};
export const camStyle = (camera: CamMove[] | undefined, t: number): CSSProperties => {
  const { tx, ty, z } = camState(camera, t);
  return { transformOrigin: "0 0", transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${z.toFixed(4)})` };
};

/** wraps the project Stage; captions and section blocks stay outside, like the HyperFrames engine */
export const Camera: React.FC<{ moves?: CamMove[]; children: React.ReactNode }> = ({ moves, children }) => {
  const { t, layout } = useStage();
  return <div style={{ position: "absolute", inset: 0, ...camStyle(moves ?? layout.camera, t) }}>{children}</div>;
};
