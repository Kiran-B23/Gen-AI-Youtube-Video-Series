// The stage contract: what a project's remotion/Stage.tsx receives. Same names as the HyperFrames kit:
// S[sid] / D[sid] scene start / duration, at("s04/pip") a beat from scenes.json, W(sid, word) any spoken word.
import React, { createContext, useContext } from "react";
import type { Layout } from "./types";

export type StageApi = {
  t: number; S: Record<string, number>; D: Record<string, number>; END: (sid: string) => number;
  at: (key: string) => number; W: (sid: string, word: string, nth?: number) => number | null; layout: Layout;
};
const NUMW: Record<string, string> = { zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12" };

export const makeApi = (layout: Layout, t: number): StageApi => {
  const S: Record<string, number> = {}, D: Record<string, number> = {};
  layout.scenes.forEach((s) => { S[s.id] = s.start; D[s.id] = s.duration; });
  const B: Record<string, number> = {};
  layout.beats.forEach((b) => { B[`${b.scene}/${b.target}`] = b.at; });
  const at = (key: string) => { if (!(key in B)) throw new Error(`no beat ${key} (add it to scenes.json)`); return B[key]; };
  const W = (sid: string, word: string, nth = 0) => {
    let n = word.toLowerCase().replace(/[^a-z0-9]/g, ""); n = NUMW[n] ?? n;
    const sc = layout.scenes.find((s) => s.id === sid); const hits = (sc?.words ?? []).filter(([w]) => w === n || w.startsWith(n));
    return hits.length > nth ? S[sid] + hits[nth][1] : null;
  };
  return { t, S, D, END: (sid) => S[sid] + D[sid], at, W, layout };
};

const Ctx = createContext<StageApi | null>(null);
export const StageProvider: React.FC<{ api: StageApi; children: React.ReactNode }> = ({ api, children }) => <Ctx.Provider value={api}>{children}</Ctx.Provider>;
export const useStage = () => { const v = useContext(Ctx); if (!v) throw new Error("useStage outside the Reel"); return v; };
