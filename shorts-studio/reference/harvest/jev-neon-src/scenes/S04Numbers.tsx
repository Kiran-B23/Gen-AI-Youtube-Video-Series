import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, SAFE, wordFrame } from "../config";
import { BarRace } from "../components/BarRace";
import { Card } from "../components/Card";
import { Counter } from "../components/Counter";
import { Confetti, Slam } from "../components/Kinetic";
import { BAND_TOP, SAFE_W } from "../components/SafeArea";
import { SceneShell } from "../components/SceneShell";
import { SourcePill } from "../components/SourcePill";
import { Title } from "../components/Title";

export const S04Numbers: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (w: string, n = 0) => wordFrame("s04", w, n);
  const tRace = at("faster"), tCheap = at("171"), tEvery = at("everys"), tVercel = at("vercel");
  const growFrames = Math.max(24, tCheap - tRace - 4);
  const phaseB = interpolate(frame, [tEvery - 4, tEvery + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell id="s04" extraPunches={[tRace + growFrames, tEvery, tVercel]}>
      <Title fontSize={70}>{frame < tEvery ? "The numbers 📊" : "Independent tests 🔬"}</Title>
      {/* phase A: TypeSafe's demo */}
      <div style={{ position: "absolute", top: BAND_TOP, width: SAFE_W, opacity: 1 - phaseB, transform: `translateY(${-120 * phaseB}px)` }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}><SourcePill text="TypeSafe's claim" at={0} /></div>
        <BarRace width={SAFE_W} at={tRace} growFrames={growFrames} rows={[{ label: "Jev", value: 0.114, color: COLORS.green }, { label: "GPT-5.6 Terra", value: 8.566, color: COLORS.pink }]} />
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 36 }}>
          <Slam at={tRace + 6} fontSize={74} color={COLORS.green} from={2}>~75x faster</Slam>
          {frame >= tCheap ? <div style={{ fontFamily: "inherit" }}><Slam at={tCheap} fontSize={74} color={COLORS.yellow} from={1.6}><Counter to={171} at={tCheap} duration={16} prefix="~" suffix="x" /> cheaper</Slam></div> : null}
        </div>
      </div>
      {/* phase B: independent results */}
      {frame >= tEvery - 4 ? (
        <div style={{ position: "absolute", top: BAND_TOP + 20, width: SAFE_W, display: "flex", flexDirection: "column", gap: 30 }}>
          <Card at={tEvery} color={COLORS.cyan} from="left" style={{ padding: "26px 30px" }}>
            <div style={{ fontWeight: 800, fontSize: 42 }}>Every's test vs Claude Fable 5.1</div>
            <div style={{ fontWeight: 900, fontSize: 66, color: COLORS.cyan, margin: "8px 0 10px", lineHeight: 1.1 }}>~25x faster<br />{frame >= at("580") ? <><Counter to={580} at={at("580")} duration={16} prefix="~" suffix="x" /> cheaper</> : "\u00a0"}</div>
            <SourcePill text="Every's test" at={tEvery} />
          </Card>
          <Card at={tVercel} color={COLORS.green} from="right" style={{ padding: "26px 30px" }}>
            <div style={{ fontWeight: 800, fontSize: 42 }}>Vercel vs GPT Luna</div>
            <div style={{ fontWeight: 900, fontSize: 70, color: COLORS.green, margin: "8px 0 10px" }}>up to {frame >= at("18") ? <Counter to={18} at={at("18")} duration={12} suffix="x" /> : "…"} faster <span style={{ fontSize: 44 }}>(p95)</span></div>
            <SourcePill text="Vercel's test" at={tVercel} />
          </Card>
        </div>
      ) : null}
      <Confetti at={Math.round(tRace + 2)} x={SAFE.left + 200} y={SAFE.top + BAND_TOP + 120} />
    </SceneShell>
  );
};
