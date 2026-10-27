// The pace table, computed from build/timings.json with the same definition as studio/tools/common.py
// (pace_of, pace_limits) and the same flags as studio/tools/voice.py's report.
import fs from "node:fs";
import { PACE_JSON } from "./config.js";

interface Word { w: string; s: number; e: number; src?: string }
type Timings = Record<string, { duration: number; words: Word[] }>;

export function readPace(): Record<string, number> {
  const raw = JSON.parse(fs.readFileSync(PACE_JSON, "utf8"));
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => typeof v === "number")) as Record<string, number>;
}

/** words ÷ (last end − first start); 0 when the span is ≤ 0.3 s (common.py pace_of). */
export function paceOf(words: Word[]): number {
  if (!words.length) return 0;
  const span = words[words.length - 1].e - words[0].s;
  return span > 0.3 ? words.length / span : 0;
}

export function paceTable(timings: Timings, spec: any) {
  const P = readPace();
  const accept = spec?.pace?.accept as number | undefined;
  const sceneMax = accept ? Math.max(P.scene_max, accept) : P.scene_max;
  const deliveryMax = accept ? Math.max(P.delivery_max, accept) : P.delivery_max;
  const pad = typeof spec?.padSeconds === "number" ? spec.padSeconds : 0.3;
  const rows = Object.entries(timings).map(([id, t]) => {
    const ws = t.words ?? [];
    const p = paceOf(ws);
    const guessed = ws.filter((w) => (w.src ?? "heard") !== "heard").length;
    const gp = guessed / Math.max(1, ws.length);
    const gate = ws.length >= P.min_words_gate;
    const flags: { kind: "fail" | "warn"; what: string }[] = [];
    if (p > sceneMax && gate) flags.push({ kind: "fail", what: "pace" });
    else if (p > P.scene_warn) flags.push({ kind: "warn", what: gate ? "pace" : "pace (short line: warns only)" });
    if (gp > 0.25) flags.push({ kind: "fail", what: "timings" });
    else if (gp > 0.1) flags.push({ kind: "warn", what: "timings" });
    return { scene: id, duration: t.duration, words: ws.length, wps: Number(p.toFixed(2)), guessed, guessedPct: Math.round(gp * 100),
      text: ws.map((w) => w.w).join(" "), flags };
  });
  const allWords = rows.reduce((n, r) => n + r.words, 0);
  const durs = Object.values(timings).reduce((n, t) => n + t.duration, 0);
  const delivery = allWords / Math.max(0.3, durs + pad * (rows.length - 1));
  const total = Object.values(timings).reduce((n, t) => n + t.duration + pad, 0);
  return {
    rows,
    delivery: Number(delivery.toFixed(2)),
    deliveryFail: delivery > deliveryMax,
    totalSeconds: Number(total.toFixed(1)),
    limits: { target: P.target, sceneWarn: P.scene_warn, sceneMax, deliveryMax, minWordsGate: P.min_words_gate },
    accept: accept ? { accept, why: spec?.pace?.why ?? "" } : null,
  };
}
