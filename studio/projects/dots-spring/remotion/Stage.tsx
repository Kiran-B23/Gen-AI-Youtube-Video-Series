// Dots v2 · style remotion-spring (Remotion engine) · running object: the 3 a.m. bug report → a fix waiting for review.
// Facts from OpenAI's Help Center (see productions/2026-10-11-dots/research.md): no plans, regions, app counts.
import React from "react";
import { useStage } from "../../../remotion/src/engine/stage";
import { abs, BOUNCY, card, FT, Illus, lin, P, Panel, Pill, SMOOTH, sp, springIn, stampIn, StepHead, Words } from "../../../remotion/src/styles/remotion-spring/kit";

/** the dot: a bouncy round teammate with eyes */
const Dot: React.FC<{ size?: number; t: number; t0: number; blink?: boolean; color?: string }> = ({ size = 220, t, t0, color = P.violet }) => {
  const bob = Math.sin((t - t0) * 3) * 6, blink = Math.floor((t - t0) * 0.7) % 4 === 3 && ((t - t0) * 0.7) % 1 < 0.15;
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, ...card(color, size / 2), position: "relative", transform: `translateY(${bob}px)` }}>
      {[0.33, 0.6].map((x, i) => (
        <i key={i} style={abs({ left: size * x, top: size * 0.36, width: size * 0.11, height: blink ? size * 0.02 : size * 0.16, borderRadius: size, background: P.white })} />
      ))}
    </div>
  );
};

/** a chat bubble (the dot's status updates) */
const Bubble: React.FC<{ from?: "dot" | "you"; style?: React.CSSProperties; children: React.ReactNode }> = ({ from = "dot", style, children }) => (
  <div style={{ display: "inline-block", padding: "22px 30px", fontSize: 46, fontWeight: 800, lineHeight: 1.2, color: P.ink, ...card(from === "dot" ? P.white : P.sun, 34),
    borderBottomLeftRadius: from === "dot" ? 8 : 34, borderBottomRightRadius: from === "you" ? 8 : 34, ...style }}>{children}</div>
);

const Stage: React.FC = () => {
  const { t, S, END, at, W } = useStage();
  const w = (sid: string, word: string, d = 0, nth = 0) => (W(sid, word, nth) ?? S[sid]) + d;

  return (
    <>
      {/* ---------- s01 hook: 3 a.m., a bug report, a fix waiting ---------- */}
      <Panel from={0} to={S.s02 + 0.1} enter="none">
        <Words words={["3", "A.M."]} times={[0, w("s01", "a.m.", -0.1)]}
          style={abs({ left: 72, top: 220, width: 936, fontFamily: FT.d, fontSize: 280, lineHeight: 0.92, color: P.ink, textShadow: `10px 10px 0 ${P.sun}` })} />
        <div style={abs({ left: 840, top: 250, ...springIn(t, 0.3, { y: -60, s: 0.3, r: 30 }) })}>
          <div style={{ width: 150, height: 150, borderRadius: 75, background: P.sun, border: `6px solid ${P.ink}`, boxShadow: `inset -36px -10px 0 ${P.cream}` }} />
        </div>
        <div style={abs({ left: 72, top: 560, width: 936, padding: "26px 34px 32px", ...card(), ...springIn(t, at("s01/bug") - 0.15, { y: 160, s: 0.5, r: -4 }) })}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FT.m, fontSize: 30, fontWeight: 800 }}>
            <span style={{ color: P.violet }}># bugs</span><span style={{ color: "rgba(27,20,51,0.5)" }}>3:02 AM</span>
          </div>
          <div style={{ marginTop: 16, fontSize: 54, fontWeight: 800, lineHeight: 1.2, color: P.ink }}>🐞 Checkout crashes on iOS</div>
          <div style={abs({ right: 30, bottom: -40, ...springIn(t, at("s01/slack"), { y: 30, s: 0.3, r: 12 }) })}><Pill bg={P.sky} size={36}>new message · Slack</Pill></div>
        </div>
        <div style={abs({ left: 72, top: 900, display: "flex", alignItems: "flex-end", gap: 24 })}>
          <div style={springIn(t, w("s01", "wake", -0.2), { y: 120, s: 0.1, r: -30 })}><Dot t={t} t0={w("s01", "wake")} size={170} /></div>
          <div style={springIn(t, at("s01/fix"), { x: -80, y: 20, s: 0.4, r: 4 })}><Bubble>Fix drafted · tests pass ✓</Bubble></div>
        </div>
        <div style={abs({ left: 72, top: 1180, ...stampIn(t, at("s01/review"), -4) })}><Pill bg={P.mint} size={54}>ready for your review</Pill></div>
        <Illus />
      </Panel>

      {/* ---------- s02 that's a dot: always-on, keeps working after you close the chat ---------- */}
      <Panel from={S.s02 - 0.25} to={S.s03 + 0.1}>
        <Words words={["THAT'S", "A", "DOT."]} times={[S.s02 - 0.1, w("s02", "a", -0.05), at("s02/dot")]}
          colors={[undefined, undefined, P.violet]}
          style={abs({ left: 72, top: 220, width: 936, fontFamily: FT.d, fontSize: 190, lineHeight: 1, color: P.ink })} />
        <div style={abs({ left: 740, top: 380, ...springIn(t, at("s02/dot"), { y: -160, s: 0.1, r: 40 }) })}><Dot t={t} t0={at("s02/dot")} size={240} /></div>
        <div style={abs({ left: 72, top: 660, display: "flex", gap: 20, flexWrap: "wrap", width: 936 })}>
          <div style={springIn(t, at("s02/always") - 0.05, { y: 40, s: 0.3, r: -8 })}><Pill bg={P.mint} size={50}>always-on agent</Pill></div>
          <div style={springIn(t, w("s02", "inside", -0.05), { y: 40, s: 0.3, r: 8 })}><Pill bg={P.white} size={50}>inside ChatGPT</Pill></div>
        </div>
        {(() => {   // the chat window closes on "close"; the dot keeps working
          const tc = at("s02/close"), shut = sp(t, tc, SMOOTH);
          return (
            <>
              <div style={abs({ left: 72, top: 900, width: 936, height: 430, padding: "0 0 30px", overflow: "hidden", ...card(), ...springIn(t, w("s02", "keeps", -0.6), { y: 140, s: 0.6 }),
                transform: `${springIn(t, w("s02", "keeps", -0.6), { y: 140, s: 0.6 }).transform} scale(${1 - 0.92 * Math.min(1, shut)})`, transformOrigin: "88% 6%" })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 26px", borderBottom: `6px solid ${P.ink}`, fontFamily: FT.m, fontSize: 30, fontWeight: 800, color: P.ink }}>
                  <span>chat</span><span style={{ width: 54, height: 54, borderRadius: 27, background: t > tc - 0.35 ? P.coral : P.white, border: `5px solid ${P.ink}`, display: "inline-flex",
                    alignItems: "center", justifyContent: "center", color: P.ink, fontSize: 32 }}>✕</span>
                </div>
                <div style={{ padding: "26px 30px", display: "flex", flexDirection: "column", gap: 20 }}>
                  <Bubble from="you" style={{ alignSelf: "flex-end" }}>Look into the crash?</Bubble>
                  <Bubble>On it.</Bubble>
                </div>
              </div>
              <div style={abs({ left: 72, top: 1080, display: "flex", alignItems: "center", gap: 26, ...springIn(t, tc + 0.25, { y: 80, s: 0.3 }) })}>
                <Dot t={t} t0={tc} size={150} />
                <Pill bg={P.sun} size={46}>still working{".".repeat(1 + Math.max(0, Math.floor((t - tc) * 3)) % 3)}</Pill>
              </div>
            </>
          );
        })()}
      </Panel>

      {/* ---------- section · its own computer (s03) ---------- */}
      <Panel from={S.s03 - 0.25} to={S.s04 + 0.1} enter="up">
        <StepHead n={1} title="Its own computer" t0={S.s03 - 0.1} />
        {(() => {
          const t0 = w("s03", "gets", -0.2), tb = at("s03/browser"), tw = w("s03", "actually", -0.1);
          const steps = ["Reproduce the crash", "Find the cause", "Draft a fix, run tests"];
          return (
            <>
              <div style={abs({ left: 72, top: 520, ...springIn(t, S.s03 + 0.2, { y: 40, s: 0.2, r: -20 }) })}>
                <Bubble from="you">How does it do that?</Bubble>
              </div>
              <div style={abs({ left: 72, top: 700, width: 936, height: 620, ...card(P.ink, 40), padding: 26, ...springIn(t, t0, { y: 220, s: 0.5, r: 3 }) })}>
                <div style={abs({ left: 30, top: -38, ...springIn(t, at("s03/computer") - 0.1, { y: 30, s: 0.3, r: -8 }) })}><Pill bg={P.sky} size={40}>☁ its own cloud computer</Pill></div>
                <div style={{ marginTop: 40, height: 520, background: P.white, borderRadius: 20, overflow: "hidden", ...springIn(t, tb - 0.1, { y: 60, s: 0.7 }) }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: P.cream, borderBottom: `5px solid ${P.ink}` }}>
                    {[P.coral, P.sun, P.mint].map((c) => <i key={c} style={{ width: 22, height: 22, borderRadius: 11, background: c, border: `3px solid ${P.ink}` }} />)}
                    <span style={{ marginLeft: 12, flex: 1, padding: "6px 18px", borderRadius: 999, border: `4px solid ${P.ink}`, fontFamily: FT.m, fontSize: 26, fontWeight: 800, color: P.ink }}>
                      its own browser</span>
                  </div>
                  <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
                    {steps.map((s, i) => {
                      const ti = tw - 0.9 + i * 0.55;
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 44, fontWeight: 800, color: P.ink, ...springIn(t, ti - 0.45, { x: -80, y: 0, s: 0.8, c: SMOOTH }) }}>
                          <span style={{ width: 56, height: 56, borderRadius: 14, border: `5px solid ${P.ink}`, background: t >= ti ? P.mint : P.white, display: "inline-flex",
                            alignItems: "center", justifyContent: "center", fontSize: 36, transform: `scale(${t >= ti ? 0.9 + 0.1 * Math.min(1.2, sp(t, ti, BOUNCY)) : 1})` }}>{t >= ti ? "✓" : ""}</span>{s}
                        </div>
                      );
                    })}
                    <div style={{ marginTop: 6, height: 24, borderRadius: 12, border: `4px solid ${P.ink}`, overflow: "hidden", opacity: lin(t, tb, tb + 0.2) }}>
                      <i style={{ display: "block", height: "100%", background: P.violet, width: `${100 * lin(t, tb, tw + 1.2)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={abs({ left: 560, top: 470, ...stampIn(t, at("s03/talk"), 6) })}><Pill bg={P.white} size={44} style={{ textDecoration: "line-through", textDecorationColor: P.red, textDecorationThickness: 6 }}>just talks</Pill></div>
              <div style={abs({ left: 470, top: 1380, ...stampIn(t, at("s03/work"), -5) })}><Pill bg={P.coral} color={P.white} size={50}>does the work</Pill></div>
              <Illus />
            </>
          );
        })()}
      </Panel>

      {/* ---------- section · goals and schedules (s04-s05) ---------- */}
      <Panel from={S.s04 - 0.25} to={S.s06 + 0.1} enter="flip">
        <StepHead n={2} title="Give it a goal" t0={S.s04 - 0.1} />
        {(() => {
          const up = sp(t, S.s05 + 0.05, SMOOTH), y0 = -320 * Math.min(1, up), shrink = 1 - 0.25 * Math.min(1, up);
          const flow = [
            { t0: at("s04/goal") - 0.1, label: "GOAL", body: "Fix the iOS checkout crash", bg: P.sun },
            { t0: at("s04/apps") - 0.15, label: "APPS", body: "chat · code · tickets", bg: P.sky },
            { t0: at("s04/results") - 0.1, label: "RESULTS", body: "Fix ready · waiting for you", bg: P.mint },
          ];
          return (
            <>
              <div style={abs({ left: 72, top: 520 + y0, width: 936, transformOrigin: "50% 0", transform: `scale(${shrink})`, opacity: 1 - lin(t, S.s05 + 0.4, S.s05 + 0.8) })}>
                {flow.map((f, i) => (
                  <div key={i}>
                    {i > 0 && <div style={{ height: 100, alignItems: "center", display: "flex", justifyContent: "center", fontSize: 72, fontWeight: 900, color: P.ink, ...springIn(t, f.t0 - 0.15, { y: -20, s: 0.4 }) }}>↓</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "46px 30px", ...card(), ...springIn(t, f.t0, { x: i % 2 ? 160 : -160, y: 0, s: 0.5, r: i % 2 ? 5 : -5 }) }}>
                      <Pill bg={f.bg} size={36} style={{ width: 210, textAlign: "center" }}>{f.label}</Pill>
                      <span style={{ fontSize: 50, fontWeight: 800, color: P.ink, lineHeight: 1.15 }}>{f.body}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* s05: it doesn't always wait: scheduled checks */}
              <div style={abs({ left: 72, top: 500, ...springIn(t, at("s05/wait") - 0.2, { y: 40, s: 0.3, r: -6 }) })}><Pill bg={P.coral} color={P.white} size={46}>doesn't always wait to be asked</Pill></div>
              <div style={abs({ left: 72, top: 640, width: 936, padding: "26px 30px 34px", ...card(), ...springIn(t, at("s05/wait") + 0.45, { y: 200, s: 0.5, r: 3 }) })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: FT.d, fontSize: 80, color: P.ink }}>SCHEDULED</span>
                  <Pill bg={P.sun} size={36}>every morning · 8:00</Pill>
                </div>
                <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
                  {["MON", "TUE", "WED", "THU", "FRI"].map((d, i) => {
                    const td = at("s05/calendar") - 0.2 + i * 0.22;
                    return (
                      <div key={d} style={{ height: 210, borderRadius: 22, border: `5px solid ${P.ink}`, background: t >= td ? P.mint : P.cream, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <span style={{ fontFamily: FT.m, fontSize: 30, fontWeight: 800, color: P.ink }}>{d}</span>
                        <span style={{ fontSize: 60, fontWeight: 900, color: P.ink, ...springIn(t, td, { y: 20, s: 0.1, r: -20 }) }}>✓</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 22, fontSize: 40, fontWeight: 800, color: P.ink, ...springIn(t, at("s05/calendar") + 0.4, { y: 20, s: 0.6 }) }}>📅 Go through your calendar</div>
              </div>
              <Illus />
            </>
          );
        })()}
      </Panel>

      {/* ---------- section · you set the freedom (s06-s07) ---------- */}
      <Panel from={S.s06 - 0.25} to={S.s08 + 0.1}>
        <StepHead n={3} title="You set the freedom" t0={S.s06 - 0.1} out={S.s07 - 0.2} />
        {(() => {
          const lv = [
            { k: "l1", label: "Act on its own", bg: P.coral, fg: P.white },
            { k: "l2", label: "Act only when you asked", bg: P.sun, fg: P.ink },
            { k: "l3", label: "Ask you first", bg: P.sky, fg: P.ink },
            { k: "l4", label: "Hand it back to you", bg: P.mint, fg: P.ink },
          ];
          const times = lv.map((l) => at(`s06/${l.k}`) - 0.2);
          // the dot slides down the ladder as each level is spoken
          let idx = 0; times.forEach((tt, i) => { if (t >= tt) idx = i; });
          const prev = Math.max(0, idx - 1), mv = idx === 0 ? 1 : sp(t, times[idx], SMOOTH), y = (prev + (idx - prev) * Math.min(1, mv)) * 175;
          const out = S.s07 - 0.2, gone = lin(t, out, out + 0.35);
          return (
            <div style={{ opacity: 1 - gone }}>
              <div style={abs({ left: 72, top: 545, ...springIn(t, at("s06/freedom") - 0.15, { y: 30, s: 0.3, r: -6 }) })}>
                <Pill bg={P.ink} color={P.white} size={40}>more freedom ↑ · less freedom ↓</Pill>
              </div>
              <div style={abs({ left: 72, top: 660, width: 790 })}>
                {lv.map((l, i) => (
                  <div key={l.k} style={{ position: "relative", height: 145, marginBottom: 30 }}>
                    <div style={abs({ inset: 0, borderRadius: 30, border: `5px dashed rgba(27,20,51,0.35)`, opacity: lin(t, S.s06 + 0.3 + i * 0.15, S.s06 + 0.6 + i * 0.15) })} />
                    <div style={abs({ inset: 0, display: "flex", alignItems: "center", padding: "0 34px", fontSize: 52, fontWeight: 900,
                      color: l.fg, ...card(l.bg, 30), ...springIn(t, times[i], { x: -220, y: 0, s: 0.6, r: -4 }) })}>{l.label}</div>
                  </div>
                ))}
              </div>
              <div style={abs({ left: 880, top: 660 + 8 + y, opacity: t >= times[0] ? 1 : 0, ...springIn(t, times[0], { y: -120, s: 0.2 }) })}><Dot t={t} t0={times[0]} size={128} /></div>
            </div>
          );
        })()}
        {/* s07: some things always stay with you */}
        <div style={abs({ left: 72, top: 520, width: 936, padding: "40px 40px 46px", ...card(), ...springIn(t, S.s07 - 0.05, { y: 220, s: 0.4, r: -4 }) })}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <span style={{ fontSize: 150, lineHeight: 1 }}>🔒</span>
            <div>
              <div style={{ fontFamily: FT.m, fontSize: 32, fontWeight: 800, color: "rgba(27,20,51,0.6)" }}>e.g.</div>
              <div style={{ fontFamily: FT.d, fontSize: 96, lineHeight: 1, color: P.ink }}>CHANGING A PASSWORD</div>
            </div>
          </div>
        </div>
        <div style={abs({ left: 180, top: 960, ...stampIn(t, at("s07/you"), -6) })}>
          <div style={{ width: "fit-content", padding: "8px 46px", border: `12px solid ${P.coralInk}`, borderRadius: 30, fontFamily: FT.d, fontSize: 170, lineHeight: 1.05, color: P.coralInk, background: P.white }}>ALWAYS<br />YOU</div>
        </div>
      </Panel>

      {/* ---------- section · the catch (s08-s10) ---------- */}
      <Panel from={S.s08 - 0.25} to={S.s11 + 0.1} enter="up">
        <StepHead n={4} title="The catch" t0={S.s08 - 0.1} />
        {(() => {
          const td = at("s08/disconnect"), ts = at("s08/stays"), snap = lin(t, td, td + 0.25), tw = at("s09/wipe"), tr = at("s09/reset"), tdel = at("s09/deletes");
          const gone = sp(t, tdel, SMOOTH), mem = ["your repo layout", "who's on the team", "how you like fixes"];
          const showCatch = t < S.s10 - 0.1, fadeC = 1 - lin(t, S.s10 - 0.35, S.s10 - 0.05);
          return (
            <>
              {showCatch && (
                <div style={{ opacity: fadeC }}>
                  {/* app ↔ dot with a cable that snaps on "disconnect" */}
                  <div style={{ opacity: 1 - lin(t, tw - 0.45, tw - 0.25) }}><div style={abs({ left: 72, top: 560, ...springIn(t, S.s08 + 0.4, { x: -160, y: 0, s: 0.5 }) })}><Pill bg={P.sky} size={44}>a connected app</Pill></div></div>
                  <svg style={abs({ left: 0, top: 0, width: 1080, height: 1920, overflow: "visible" })}>
                    <path d={`M 330 650 C 420 760, 560 760, ${640 - 40 * snap} ${720 + 60 * snap}`} stroke={P.ink} strokeWidth={10} fill="none" strokeLinecap="round"
                      strokeDasharray="14 14" opacity={lin(t, S.s08 + 0.6, S.s08 + 0.9) * (1 - lin(t, td + 0.25, td + 0.6))} />
                    <path d={`M ${700 + 40 * snap} ${780 + 30 * snap} C 740 800, 760 820, 790 850`} stroke={P.ink} strokeWidth={10} fill="none" strokeLinecap="round"
                      strokeDasharray="14 14" opacity={lin(t, S.s08 + 0.6, S.s08 + 0.9) * (1 - lin(t, tdel, tdel + 0.3))} />
                  </svg>
                  <div style={{ opacity: 1 - lin(t, tw - 0.45, tw - 0.25) }}><div style={abs({ left: 300, top: 640, ...stampIn(t, td, -10) })}><Pill bg={P.red} color={P.white} size={42}>✂ disconnected</Pill></div></div>
                  <div style={abs({ left: 700, top: 800, opacity: 1 - lin(t, tdel, tdel + 0.3), transform: `scale(${1 - 0.9 * Math.min(1, gone)})` })}><Dot t={t} t0={S.s08} size={240} /></div>
                  <div style={abs({ left: 72, top: 1080, width: 936 })}>
                    <div style={{ fontFamily: FT.m, fontSize: 32, fontWeight: 800, color: P.ink, marginBottom: 14, opacity: lin(t, w("s08", "already", -0.2), w("s08", "already")) * (1 - lin(t, tr - 0.35, tr - 0.1)) }}>
                      WHAT YOUR DOT ALREADY LEARNED</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                      {mem.map((m, i) => (
                        <div key={m} style={{ opacity: 1 - lin(t, tr - 0.35, tr - 0.1) }}>
                          <div style={springIn(t, w("s08", "learned", -0.1) + i * 0.12, { y: 60, s: 0.2, r: i % 2 ? 10 : -10 })}><Pill bg={P.white} size={46}>{m}</Pill></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ opacity: 1 - lin(t, tr - 0.35, tr - 0.1) }}><div style={abs({ left: 580, top: 1170, ...stampIn(t, ts, -6) })}><Pill bg={P.coral} color={P.white} size={60}>STILL STAYS</Pill></div></div>
                  {/* s09: only a reset wipes it */}
                  <div style={abs({ left: 72, top: 560, opacity: lin(t, tw - 0.3, tw), ...springIn(t, tw - 0.3, { y: -30, s: 0.6 }) })}><Pill bg={P.ink} color={P.white} size={42}>the only way to wipe it ↓</Pill></div>
                  <div style={abs({ left: 72, top: 1290, ...springIn(t, tr - 0.15, { y: 160, s: 0.3, r: -8 }) })}>
                    <div style={{ padding: "18px 60px", ...card(P.red, 999), fontFamily: FT.d, fontSize: 110, lineHeight: 1, color: P.white,
                      transform: `translateY(${t > tdel - 0.1 && t < tdel + 0.15 ? 8 : 0}px)` }}>RESET</div>
                  </div>
                  <div style={abs({ left: 470, top: 1320, ...springIn(t, tdel + 0.1, { y: 40, s: 0.3, r: 6 }) })}><Pill bg={P.white} size={38}>deletes the whole dot</Pill></div>
                </div>
              )}
              {/* s10: it can still make mistakes */}
              <div style={abs({ left: 72, top: 540, width: 936, padding: "28px 34px 34px", ...card(), ...springIn(t, S.s10 - 0.05, { y: 200, s: 0.5, r: 3 }) })}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FT.m, fontSize: 30, fontWeight: 800 }}>
                  <span style={{ color: P.violet }}>FIX · checkout.swift</span><span style={{ color: "rgba(27,20,51,0.5)" }}>for review</span>
                </div>
                {["guard cart.isEmpty == false", "let total = cart.sum(\\.price)", "pay(total, currency: .usd)"].map((l, i) => {
                  const bad = i === 2, tb = at("s10/mistakes");
                  return (
                    <div key={i} style={{ marginTop: 14, padding: "10px 16px", borderRadius: 14, fontFamily: FT.m, fontSize: 40, fontWeight: 700, color: P.ink,
                      background: bad && t >= tb ? "rgba(232,54,74,0.18)" : "transparent", border: bad && t >= tb ? `4px solid ${P.red}` : "4px solid transparent",
                      ...springIn(t, S.s10 + 0.15 + i * 0.12, { x: -60, y: 0, s: 0.9, c: SMOOTH }) }}>{l}{bad && t >= tb ? "  ✗" : ""}</div>
                  );
                })}
              </div>
              <div style={abs({ left: 72, top: 1110, ...springIn(t, at("s10/rules") - 0.15, { y: 40, s: 0.3, r: -6 }) })}><Pill bg={P.sun} size={44}>even while following your rules</Pill></div>
              <div style={abs({ left: 160, top: 1205, ...stampIn(t, at("s10/check"), -5) })}>
                <div style={{ width: "fit-content", padding: "6px 40px", border: `12px solid ${P.violet}`, borderRadius: 30, fontFamily: FT.d, fontSize: 120, lineHeight: 1.0, color: P.violet, background: P.white }}>CHECK<br />ITS WORK</div>
              </div>
              <div style={abs({ left: 400, top: 1000, ...stampIn(t, at("s10/mistakes"), 6) })}><Pill bg={P.red} color={P.white} size={50}>can make mistakes</Pill></div>
              <Illus />
            </>
          );
        })()}
      </Panel>

      {/* ---------- s11 verdict: start on "ask first", loosen as it earns trust ---------- */}
      <Panel from={S.s11 - 0.25} to={S.s12 + 0.1} enter="flip">
        <div style={abs({ left: 72, top: 230, ...springIn(t, S.s11 - 0.1, { y: -30, s: 0.6 }) })}><Pill bg={P.sun} size={36}>MY TAKE</Pill></div>
        <Words words={["GREAT", "FOR", "ONGOING", "JOBS"]} times={[w("s11", "great", -0.1), w("s11", "for", -0.05), at("s11/ongoing") - 0.05, w("s11", "jobs", -0.05)]}
          colors={[undefined, undefined, P.violet, undefined]}
          style={abs({ left: 72, top: 330, width: 936, fontFamily: FT.d, fontSize: 150, lineHeight: 1, color: P.ink })} />
        <div style={abs({ left: 72, top: 650, ...springIn(t, w("s11", "review", -0.15), { y: 40, s: 0.3, r: -6 }) })}><Pill bg={P.mint} size={46}>you can review ✓</Pill></div>
        {(() => {   // freedom slider: starts on "ask first", the dot climbs as trust grows
          const ts = at("s11/start"), tt = at("s11/trust"), stops = ["ask first", "only when asked", "on its own"];
          const pos = lin(t, w("s11", "give", 0), tt + 0.4) * 2;   // 0 → 2
          return (
            <div style={abs({ left: 72, top: 800, width: 936, height: 520, padding: "34px 40px", ...card(), ...springIn(t, ts - 0.2, { y: 200, s: 0.5, r: 3 }) })}>
              <div style={{ fontFamily: FT.m, fontSize: 32, fontWeight: 800, color: P.ink }}>FREEDOM</div>
              <div style={{ position: "relative", marginTop: 40, height: 40, borderRadius: 20, border: `5px solid ${P.ink}`, background: P.cream }}>
                <i style={{ display: "block", height: "100%", borderRadius: 20, background: P.violet, width: `${8 + 42 * pos}%` }} />
                <div style={abs({ left: `calc(${8 + 42 * pos}% - 70px)`, top: -60 })}><Dot t={t} t0={ts} size={140} /></div>
              </div>
              <div style={{ marginTop: 110, display: "flex", justifyContent: "space-between" }}>
                {stops.map((s, i) => <Pill key={s} bg={Math.round(pos) === i ? P.sun : P.white} size={34}>{s}</Pill>)}
              </div>
              <div style={{ marginTop: 40, fontSize: 44, fontWeight: 800, color: P.ink, ...springIn(t, tt - 0.2, { y: 30, s: 0.5 }) }}>…as it earns your trust</div>
            </div>
          );
        })()}
      </Panel>

      {/* ---------- s12 CTA ---------- */}
      <Panel from={S.s12 - 0.25} to={END("s12") + 1} exit="none">
        <Words words={["WHAT", "SHOULD", "I", "EXPLAIN", "NEXT?"]} times={["what", "should", "i", "explain", "next"].map((x) => w("s12", x, -0.05))}
          colors={[undefined, undefined, undefined, undefined, P.coralInk]}
          style={abs({ left: 72, top: 400, width: 936, fontFamily: FT.d, fontSize: 190, lineHeight: 1.02, color: P.ink })} />
        <div style={abs({ left: 760, top: 230, ...springIn(t, S.s12, { y: -120, s: 0.1, r: 30 }) })}><Dot t={t} t0={S.s12} size={170} /></div>
        <div style={abs({ left: 72, top: 1240, ...springIn(t, at("s12/tell"), { y: 60, s: 0.3, r: -8 }) })}><Pill bg={P.sun} size={48}>+ Follow for more AI breakdowns</Pill></div>
      </Panel>
    </>
  );
};
export default Stage;
