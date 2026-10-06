import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, glow } from "../theme";

export type RaceRow = { label: string; value: number; color: string };

/** Bars grow at the same speed and stop at their value, so bar length = response time. */
export const BarRace: React.FC<{ rows: RaceRow[]; at: number; growFrames: number; width: number }> = ({ rows, at, growFrames, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...rows.map((r) => r.value));
  const t = (Math.max(0, frame - at) / growFrames) * max;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 34, width }}>
      {rows.map((r) => {
        const cur = Math.min(r.value, t);
        const done = frame >= at && t >= r.value;
        const fin = at + (r.value / max) * growFrames;
        const win = spring({ frame: frame - fin, fps, config: { damping: 8, stiffness: 200 } });
        return (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: FONT, fontWeight: 900, color: "white", marginBottom: 10 }}>
              <span style={{ fontSize: 48 }}>{r.label}</span>
              <span style={{ fontSize: 58, color: r.color, fontVariantNumeric: "tabular-nums", display: "inline-block", transform: `scale(${done ? 1 + 0.18 * Math.sin(Math.min(win, 1) * Math.PI) : 1})`, textShadow: `0 0 24px ${r.color}88` }}>
                {cur.toFixed(3)}s {done ? "🏁" : ""}
              </span>
            </div>
            <div style={{ height: 60, borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div style={{ width: `${Math.max(0.035, cur / max) * 100}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${r.color}AA, ${r.color})`, boxShadow: done ? glow(r.color, 1) : "none" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
