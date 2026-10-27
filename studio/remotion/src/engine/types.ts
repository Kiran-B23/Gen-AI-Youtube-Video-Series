// build/layout.json written by tools/assemble.py (the single source of truth for both engines)
export type Section = Record<string, string>;
/** a camera keyframe (beat "cam": [x, y, zoom] or cam() in stage.js): point (x, y) lands on the zone centre at `zoom` over d s */
export type CamMove = { scene?: string | null; at: number; x: number; y: number; zoom: number; d?: number };
export type BeatCheck = "visible" | "reveal" | "motion" | "none";
export type Beat = {
  scene: string; word: string; target: string; at: number;
  el?: string | null;            // the element id the beat reveals (data-beat="sNN/target" in HyperFrames)
  check?: BeatCheck;             // what payoffs asserts (HyperFrames only; Remotion has no DOM check)
  sfx?: string | null;           // the cue placed on this beat (null = silent)
  cam?: [number, number, number] | null;   // [x, y, zoom]
  settle?: number;               // seconds after the word when the element must be on screen (default 0.5)
};
export type Layout = {
  total: number; size: [number, number]; flat: boolean; music?: string;
  scenes: { id: string; type: string; start: number; duration: number; section: string; words: [string, number][] }[];
  beats: Beat[];
  sections: Record<string, Section>;
  captions: { scene: string; a: number; b: number; words: { w: string; t: number; hot: boolean }[] }[];
  wipes: { t0: number; t1: number; axis: "x" | "y"; section: string }[];
  camera?: CamMove[];                                   // every camera move, sorted by `at`
  sfx?: { t: number; name: string }[];                  // the cues as mixed (after the ≥ 0.35 s / ≤ 4 per 2 s cap)
  caption?: { top: number; width: number; px: number; min_s: number };   // caption geometry (top 1555, width 880, 60 px)
  stage_zone?: [number, number];                        // [220, 1460]: the stage never draws below it
};
