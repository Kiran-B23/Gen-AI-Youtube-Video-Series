// The shared layers, drawn the same way as the HyperFrames engine: section colour blocks, section wipes, the project's
// stage inside the camera (layout.camera, the same transform as #cam), captions (words light up as spoken, keywords
// pop) and the mixed audio (voice + ducked music + SFX, -14 LUFS).
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Layout } from "./types";
import { ease, prog } from "./anim";
import { makeApi, StageProvider } from "./stage";
import { Camera } from "./Camera";
import { layout as LAYOUT, Stage } from "../current.generated";

const FONTS: [string, string, string][] = [["Anton", "Anton.ttf", "400"], ["Inter", "Inter.ttf", "100 900"], ["JetBrains Mono", "JetBrainsMono.ttf", "100 900"]];
const useFonts = () => {
  const [h] = useState(() => delayRender("fonts"));
  useEffect(() => {
    Promise.all(FONTS.map(([fam, f, w]) => new FontFace(fam, `url(${staticFile(`fonts/${f}`)})`, { weight: w }).load().then((ff) => document.fonts.add(ff))))
      .then(() => continueRender(h)).catch((e) => { console.error(e); continueRender(h); });
  }, [h]);
};

const sceneAt = (layout: Layout, t: number) => [...layout.scenes].reverse().find((s) => s.start <= t) ?? layout.scenes[0];

const Captions: React.FC<{ layout: Layout; t: number }> = ({ layout, t }) => {
  const card = layout.captions.find((c) => t >= c.a && t < c.b);
  if (!card) return null;
  const sec = layout.sections[layout.scenes.find((s) => s.id === card.scene)?.section ?? "dark"];
  return (
    <div style={{ position: "absolute", left: 72, top: layout.caption?.top ?? 1555, width: layout.caption?.width ?? 880, fontFamily: "Inter", fontSize: layout.caption?.px ?? 60, fontWeight: 800, lineHeight: 1.2,
      color: sec.text, textShadow: `0 0 18px ${sec.bg}, 0 0 6px ${sec.bg}, 0 2px 0 ${sec.bg}` }}>
      {card.words.map((w, i) => {
        const said = t >= w.t, k = w.hot && said ? Math.sin(Math.PI * Math.min(1, (t - w.t) / 0.28)) : 0;
        return <React.Fragment key={i}>{i ? " " : ""}<span style={{ display: "inline-block", margin: "0 0.06em", opacity: said ? 1 : 0.55, color: w.hot ? sec.accent : undefined,
          transform: `scale(${1 + 0.09 * k})`, transformOrigin: "50% 70%" }}>{w.w}</span></React.Fragment>;
      })}
    </div>
  );
};

export const Reel: React.FC = () => {
  useFonts();
  const layout: Layout = LAYOUT;
  const frame = useCurrentFrame(), { fps, width, height } = useVideoConfig(), t = frame / fps;
  const sc = sceneAt(layout, t + 0.06), sec = layout.sections[sc.section];   // the wipe lands 0.05 s before the scene: switch the block under it
  const api = makeApi(layout, t);
  return (
    <AbsoluteFill style={{ background: sec.bg, fontFamily: "Inter", color: sec.text, overflow: "hidden" }}>
      <StageProvider api={api}><Camera><Stage /></Camera></StageProvider>
      {layout.wipes.filter((w) => t >= w.t0 && t < w.t1).map((w, i) => {
        const p = prog(t, w.t0, w.t1 - w.t0 - 0.02, ease.inOut3), off = (1 - p) * (w.axis === "x" ? width : height);
        return <AbsoluteFill key={i} style={{ background: layout.sections[w.section].bg, transform: w.axis === "x" ? `translateX(${off}px)` : `translateY(${off}px)` }} />;
      })}
      <Captions layout={layout} t={t} />
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
};
