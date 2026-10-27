// Jev · style remotion-spring (Remotion engine) · same story and facts as projects/jev-reel/stage/: ticket #4821 through 4 steps
import React from "react";
import { useStage } from "../../../remotion/src/engine/stage";
import { typed } from "../../../remotion/src/engine/anim";
import { abs, BOUNCY, card, countTo, FT, Illus, lin, P, Panel, Pill, SMOOTH, sp, springIn, stampIn, StepHead, Words } from "../../../remotion/src/styles/remotion-spring/kit";

const TXT = "Charged twice this month. Refund me or I cancel.";

const Stage: React.FC = () => {
  const { t, S, END, at, W } = useStage();
  const w = (sid: string, word: string, d = 0) => (W(sid, word) ?? S[sid]) + d;

  return (
    <>
      {/* ---------- s01 hook ---------- */}
      <Panel from={0} to={S.s02 + 0.1} enter="none">
        <Words words={["NEVER", "WRITES."]} times={[0, w("s01", "writes", -0.1)]}
          style={abs({ left: 72, top: 260, width: 936, fontFamily: FT.d, fontSize: 250, lineHeight: 0.92, color: P.ink })} />
        <div style={abs({ left: 72, top: 760, ...springIn(t, at("s01/word"), { y: 30, s: 0.5, r: -6 }) })}><Pill bg={P.coral} color={P.white}>0 words written</Pill></div>
        {[["billing", 80, 1380, P.mint], ["0.97", 640, 1330, P.sun], ["urgent", 760, 940, P.sky], ["yes", 120, 1190, P.white]].map(([txt, x, y, bg], i) => (
          <div key={i} style={abs({ left: x as number, top: y as number, ...springIn(t, at("s01/decides") + 0.15 + i * 0.08, { y: 60, s: 0.2, r: i % 2 ? 20 : -20 }) })}><Pill bg={bg as string} size={38}>{txt}</Pill></div>
        ))}
        <div style={abs({ left: 72, top: 900, padding: "18px 40px 10px", ...card(P.violet), fontFamily: FT.d, fontSize: 150, lineHeight: 1, color: P.white,
          ...springIn(t, at("s01/decides"), { y: 0, s: 0.2, r: -14, c: BOUNCY }) })}>ONLY DECIDES.</div>
      </Panel>

      {/* ---------- s02 meet Jev ---------- */}
      <Panel from={S.s02 - 0.25} to={S.s03 + 0.1}>
        <div style={abs({ left: 72, top: 230, ...springIn(t, S.s02 - 0.1, { y: -30, s: 0.6 }) })}><Pill bg={P.sun} size={36}>MEET</Pill></div>
        <div style={abs({ left: 60, top: 320, fontFamily: FT.d, fontSize: 420, lineHeight: 1, color: P.violet, textShadow: `12px 12px 0 ${P.ink}`,
          ...springIn(t, at("s02/jev"), { y: 160, s: 0.2, r: -12 }) })}>JEV</div>
        <div style={abs({ left: 72, top: 900, width: 936 })}>
          {[["team?", "billing", 94], ["urgent?", "yes", 81], ["refund?", "no", 57]].map(([q, a, c], k) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 18, height: 120 }}>
              <div style={springIn(t, at("s02/questions") + k * 0.12, { x: -120, y: 0, s: 0.6 })}><Pill size={40} style={{ width: 270, textAlign: "center" }}>{q}</Pill></div>
              <span style={{ fontSize: 56, fontWeight: 900, color: P.ink, ...springIn(t, at("s02/typed") + k * 0.12, { x: -30, y: 0, s: 0.5 }) }}>→</span>
              <div style={springIn(t, at("s02/typed") + 0.1 + k * 0.12, { y: 0, s: 0.2, r: 10 })}><Pill bg={P.sun} size={40} style={{ width: 210, textAlign: "center" }}>{a}</Pill></div>
              <span style={{ flex: 1, height: 30, borderRadius: 15, border: `4px solid ${P.ink}`, background: P.white, overflow: "hidden", opacity: lin(t, at("s02/confidence") - 0.1, at("s02/confidence")) }}>
                <i style={{ display: "block", height: "100%", width: `${c}%`, background: P.violet, transformOrigin: "0 50%", transform: `scaleX(${Math.min(1.04, sp(t, at("s02/confidence") + k * 0.12, BOUNCY))})` }} />
              </span>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 10, fontFamily: FT.m, fontSize: 24, fontWeight: 800, letterSpacing: "0.12em", color: "rgba(27,20,51,0.7)" }}>
            <span style={{ width: 288, opacity: lin(t, at("s02/questions"), at("s02/questions") + 0.2) }}>QUESTIONS IN</span>
            <span style={{ width: 300, paddingLeft: 60, opacity: lin(t, at("s02/typed"), at("s02/typed") + 0.2) }}>TYPED ANSWERS</span>
            <span style={{ opacity: lin(t, at("s02/confidence"), at("s02/confidence") + 0.2) }}>CONFIDENCE</span>
          </div>
        </div>
      </Panel>

      {/* ---------- section · read the ticket (s03-s04) ---------- */}
      <Panel from={S.s03 - 0.25} to={S.s05 + 0.1} enter="up">
        <StepHead n={1} title="Read the ticket" t0={S.s03 - 0.1} out={S.s04 - 0.15} />
        {(() => {
          const up = sp(t, S.s04 - 0.1, SMOOTH), top = 560 - 360 * up;
          return (
            <div style={abs({ left: 72, top, width: 936, padding: "28px 38px 34px", overflow: "hidden", ...card(), ...springIn(t, at("s03/ticket"), { y: 200, s: 0.5, r: 4 }) })}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FT.m, fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: P.violet }}>TICKET #4821</span><span style={{ color: "rgba(27,20,51,0.5)" }}>support inbox</span>
              </div>
              <div style={{ marginTop: 18, minHeight: 140, fontSize: 58, fontWeight: 800, lineHeight: 1.2, color: P.ink }}>
                {typed(TXT, t, at("s03/type"), at("s03/typed"))}<span style={{ display: "inline-block", width: 6, height: 58, marginLeft: 4, verticalAlign: -6, background: P.violet,
                  opacity: t < at("s03/typed") || Math.floor((t - at("s03/typed")) * 3) % 2 ? 1 : 0 }} />
              </div>
              <div style={abs({ top: 0, bottom: 0, width: 40, left: -60 + 1060 * lin(t, at("s04/pass"), at("s04/pass") + 0.7), background: `linear-gradient(90deg, transparent, ${P.coral}, transparent)`,
                opacity: t >= at("s04/pass") && t < at("s04/pass") + 0.75 ? 0.8 : 0 })} />
            </div>
          );
        })()}
        <div style={abs({ left: 72, top: 520, display: "flex", alignItems: "center", gap: 30, ...springIn(t, at("s04/three"), { y: 0, s: 0.1, r: -30 }) })}>
          <div style={{ width: 200, height: 200, borderRadius: 100, ...card(P.violet, 100), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FT.d, fontSize: 150, color: P.white }}>3</div>
          <div style={{ fontFamily: FT.m, fontSize: 40, fontWeight: 800, letterSpacing: "0.12em", color: P.ink, lineHeight: 1.3 }}>ANSWERS<br />ONE PASS</div>
        </div>
        {[["TEAM?", "billing", P.mint, "s04/billing"], ["URGENT?", "yes", P.sun, "s04/urgent"], ["CHURN RISK?", "high", P.coral, "s04/high"]].map(([q, a, bg, b], k) => (
          <div key={k} style={abs({ left: 72, top: 790 + k * 160, width: 936, height: 128, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px",
            ...card(), ...springIn(t, S.s04 + 0.35 + k * 0.1, { x: -200, y: 0, s: 0.7, c: SMOOTH }) })}>
            <span style={{ fontFamily: FT.m, fontSize: 44, fontWeight: 800, color: P.ink }}>{q}</span>
            <span style={springIn(t, at(b), { y: 0, s: 0.1, r: 14 })}><Pill bg={bg} color={bg === P.coral ? P.white : P.ink} size={46}>{a}</Pill></span>
          </div>
        ))}
        <Illus />
      </Panel>

      {/* ---------- section · check the cost (s05-s07): header stays, the content pushes ---------- */}
      <Panel from={S.s05 - 0.25} to={S.s08 + 0.1} enter="left">
        <StepHead n={2} title="Check the cost" t0={S.s05 - 0.1} />
        {/* s05 speed */}
        <Panel from={S.s05 - 0.25} to={S.s06 + 0.1} enter="none">
          <svg viewBox="0 0 400 400" style={abs({ left: 300, top: 430, width: 480, height: 480, ...springIn(t, S.s05 + 0.05, { y: 60, s: 0.3 }) })}>
            <circle cx={200} cy={200} r={165} fill={P.white} stroke={P.ink} strokeWidth={10} />
            <circle cx={200} cy={200} r={130} fill="none" stroke="rgba(27,20,51,0.12)" strokeWidth={46} />
            <circle cx={200} cy={200} r={130} fill="none" stroke={P.coral} strokeWidth={46} strokeDasharray={816.8} transform="rotate(-90 200 200)"
              strokeDashoffset={816.8 * (1 - 0.1 * Math.min(1.15, sp(t, at("s05/tenth"), BOUNCY)))} />
            <text x={200} y={212} textAnchor="middle" fontFamily={FT.m} fontSize={30} fontWeight={800} fill={P.ink}>1 second</text>
          </svg>
          <div style={abs({ left: 0, width: 1080, top: 960, textAlign: "center", fontFamily: FT.d, fontSize: 230, lineHeight: 1, color: P.ink, ...springIn(t, at("s05/tenth"), { y: 120, s: 0.2, r: -8 }) })}>~0.1 s</div>
          <div style={abs({ left: 0, width: 1080, top: 1220, textAlign: "center", ...springIn(t, at("s05/label"), { y: 30, s: 0.6 }) })}><Pill size={38}>per answer · TypeSafe's claim</Pill></div>
        </Panel>
        {/* s06 price */}
        <Panel from={S.s06 - 0.25} to={S.s07 + 0.1}>
          {(() => { const v = countTo(t, at("s06/price"), 0, 0.042, 0.7);
            return <div style={abs({ left: 0, width: 1080, top: 420, textAlign: "center", fontFamily: FT.d, fontSize: 250, lineHeight: 1, color: P.violet, textShadow: `10px 10px 0 ${P.ink}`,
              opacity: v === null ? 0 : 1, transform: `scale(${0.5 + 0.5 * sp(t, at("s06/price"), BOUNCY)})` })}>{v === null ? "" : "$" + v.toFixed(3)}</div>; })()}
          <div style={abs({ left: 0, width: 1080, top: 700, textAlign: "center", ...springIn(t, S.s06 - 0.1, { y: 30, s: 0.6 }) })}><Pill size={40}>per million input tokens</Pill></div>
          <div style={abs({ left: 90, top: 820, width: 900, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 12 })}>
            {Array.from({ length: 30 }, (_, i) => (
              <span key={i} style={{ height: 44, borderRadius: 22, border: `4px solid ${P.ink}`, background: [P.sun, P.mint, P.sky, P.white][i % 4],
                ...springIn(t, w("s06", "million", -0.1) + i * 0.04, { y: -60, s: 0.2 }) }} />
            ))}
          </div>
          <div style={abs({ left: 0, width: 1080, top: 1100, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 })}>
            <span style={{ fontFamily: FT.d, fontSize: 150, lineHeight: 1, color: P.ink, ...springIn(t, at("s06/output"), { y: 80, s: 0.4 }) }}>OUTPUT</span>
            <span style={{ display: "inline-block", padding: "4px 34px", ...card(P.mint, 26), fontFamily: FT.d, fontSize: 140, lineHeight: 1.05, color: P.ink, ...stampIn(t, at("s06/free"), -6) }}>FREE</span>
          </div>
        </Panel>
        {/* s07 7,977 items for 21 cents vs the priciest LLM */}
        <Panel from={S.s07 - 0.25} to={S.s08 + 0.1} enter="none">
          {(() => {
            const t0 = at("s07/labeled"), t1 = at("s07/items"), tc = at("s07/cents"), tp = at("s07/priciest"), gone = 1 - lin(t, tp - 0.3, tp);
            const v = countTo(t, t0, 0, 7977, t1 - t0);
            return gone <= 0 ? null : (
              <div style={{ opacity: gone }}>
                <div style={abs({ left: 0, width: 1080, top: 420, textAlign: "center", fontFamily: FT.d, fontSize: 190, lineHeight: 1, color: P.ink, opacity: v === null ? 0 : 1,
                  transform: `scale(${0.6 + 0.4 * sp(t, t0, BOUNCY)})` })}>{v === null ? "" : Math.round(v).toLocaleString("en-US")}</div>
                <div style={abs({ left: 0, width: 1080, top: 620, textAlign: "center", ...springIn(t, S.s07 - 0.1, { y: 20, s: 0.6 }) })}><Pill size={34}>items labelled · independent test</Pill></div>
                <div style={abs({ left: 165, top: 730, width: 750, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 14 })}>
                  {Array.from({ length: 80 }, (_, k) => { const tk = t0 + (t1 - t0) * (k / 80); const on = t >= tk; const green = t >= tc + (k % 10) * 0.03;
                    return <span key={k} style={{ height: 61, borderRadius: 14, border: `4px solid ${P.ink}`, background: green ? P.mint : on ? P.violet : "rgba(255,255,255,0.6)",
                      transform: `scale(${on ? 0.6 + 0.4 * sp(t, tk, SNAPPYish) : 0.85})` }} />; })}
                </div>
                <div style={abs({ left: 0, width: 1080, top: 1340, textAlign: "center", fontFamily: FT.m, fontSize: 26, fontWeight: 800, color: "rgba(27,20,51,0.7)", opacity: lin(t, S.s07, S.s07 + 0.3) })}>each square ≈ 100 items</div>
                <div style={abs({ left: 290, top: 900, width: 500, padding: "24px 0 16px", textAlign: "center", ...card(P.ink, 34), color: P.sun, fontFamily: FT.d, fontSize: 170, lineHeight: 1,
                  ...springIn(t, tc, { y: 0, s: 0.1, r: -12 }) })}>$0.21<div style={{ fontFamily: FT.m, fontSize: 28, color: P.white, letterSpacing: "0.2em" }}>TOTAL</div></div>
              </div>
            );
          })()}
          {t >= at("s07/priciest") && (() => {
            const tp = at("s07/priciest"), v = countTo(t, tp + 0.3, 0, 62.99, 1.4);
            return (
              <div style={abs({ left: 120, top: 440, width: 840, height: 960, display: "flex", gap: 80, alignItems: "flex-end" })}>
                {[{ n: "Jev", val: "$0.21", h: 16, bg: P.mint, t0: tp + 0.05 }, { n: "priciest of 19 LLMs", val: v === null ? "" : "$" + v.toFixed(2), h: 640, bg: P.violet, t0: tp + 0.3 }].map((b, i) => (
                  <div key={i} style={{ width: 380, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontFamily: FT.d, fontSize: 96, lineHeight: 1, color: P.ink, marginBottom: 16, ...springIn(t, b.t0, { y: 40, s: 0.4 }) }}>{b.val}</div>
                    <div style={{ width: 240, height: b.h, ...card(b.bg, 22), borderBottomLeftRadius: 0, borderBottomRightRadius: 0, transformOrigin: "50% 100%",
                      transform: `scaleY(${Math.max(0, sp(t, b.t0, i ? SMOOTH : BOUNCY))})` }} />
                    <div style={{ marginTop: 18, fontFamily: FT.m, fontSize: 34, fontWeight: 800, color: P.ink, textAlign: "center" }}>{b.n}</div>
                  </div>
                ))}
                <div style={abs({ left: 0, top: 260, width: 380, textAlign: "center", fontFamily: FT.d, fontSize: 150, lineHeight: 1, color: P.coralInk, ...stampIn(t, at("s07/times"), -6) })}>~300×</div>
              </div>
            );
          })()}
        </Panel>
      </Panel>

      {/* ---------- section · find the catch (s08-s09) ---------- */}
      <Panel from={S.s08 - 0.25} to={S.s10 + 0.1} enter="flip">
        <StepHead n={3} title="The catch" t0={S.s08 - 0.1} />
        <Panel from={S.s08 - 0.25} to={S.s09 + 0.1} enter="none">
          {(() => { const tp = at("s08/pct"), v = countTo(t, tp, 0, 68, 0.8), n = v === null ? 0 : Math.round(v);
            return <>
              <div style={abs({ left: 0, width: 1080, top: 420, textAlign: "center", fontFamily: FT.d, fontSize: 210, lineHeight: 1, color: P.coralInk, opacity: v === null ? 0 : 1,
                transform: `scale(${0.4 + 0.6 * sp(t, tp, BOUNCY)})` })}>{n}%</div>
              <div style={abs({ left: 215, top: 660, width: 650, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 9, ...springIn(t, at("s08/catch") + 1.0, { y: 80, s: 0.6 }) })}>
                {Array.from({ length: 100 }, (_, k) => (
                  <span key={k} style={{ height: 56, borderRadius: 12, border: `4px solid ${k >= 68 && t > tp + 0.8 ? P.red : P.ink}`,
                    background: k < n ? P.sun : P.white, transform: `scale(${k < n ? 0.75 + 0.25 * sp(t, tp + k * 0.011, SNAPPYish) : 1})` }} />
                ))}
              </div>
              <div style={abs({ left: 0, width: 1080, top: 1330, textAlign: "center", ...springIn(t, at("s08/catch") + 1.1, { y: 30, s: 0.6 }) })}><Pill size={32}>matched frontier models · TypeSafe's own test</Pill></div>
            </>; })()}
        </Panel>
        <Panel from={S.s09 - 0.25} to={S.s10 + 0.1} exit="none">
          <div style={abs({ left: 72, top: 430, width: 936, padding: "24px 34px", ...card(), ...springIn(t, S.s09 - 0.1, { x: 200, y: 0, s: 0.7 }) })}>
            <div style={{ fontFamily: FT.m, fontSize: 28, fontWeight: 800, color: P.violet }}>TICKET #4830</div>
            <div style={{ marginTop: 8, fontSize: 54, fontWeight: 800, color: P.ink }}>"My order is three weeks late."</div>
          </div>
          <div style={abs({ left: 72, top: 690, width: 936, padding: "28px 40px", ...card(P.ink), fontFamily: FT.m, fontSize: 62, fontWeight: 800, lineHeight: 1.35, color: P.white,
            ...springIn(t, at("s09/answer"), { y: 100, s: 0.5, r: -3 }) })}>
            <div>{"{"}</div><div>&nbsp;&nbsp;"team": <span style={{ color: t >= at("s09/wrong") ? P.coral : P.sun }}>"billing"</span></div><div>{"}"}</div>
          </div>
          <div style={abs({ left: 72, top: 1000, ...springIn(t, at("s09/format"), { y: 0, s: 0.2, r: -10 }) })}><Pill bg={P.mint} size={40}>✓ fits the format</Pill></div>
          <div style={abs({ left: 470, top: 1060, padding: "4px 40px", border: `12px solid ${P.red}`, borderRadius: 28, background: P.white, fontFamily: FT.d, fontSize: 170, lineHeight: 1.05, color: P.red,
            ...stampIn(t, at("s09/wrong"), -7) })}>WRONG</div>
          <div style={abs({ left: 72, top: 1330, fontSize: 46, fontWeight: 800, color: P.ink, ...springIn(t, at("s09/wrong") + 0.15, { y: 30, s: 0.6 }) })}>should be: <span style={{ color: P.mintInk }}>shipping</span></div>
          <Illus />
        </Panel>
      </Panel>

      {/* ---------- section · route it (s10-s11) ---------- */}
      <Panel from={S.s10 - 0.25} to={S.s12 + 0.1} enter="up">
        <StepHead n={4} title="Route it" t0={S.s10 - 0.1} out={S.s11 + 1.0} />
        {(() => {
          const t10 = at("s10/both") + 0.45, shrink = sp(t, S.s11 + 1.2, SMOOTH);
          const chips: [string, number, number][] = [["#4821 · 0.97", at("s10/confident") - 0.15, -1], ["#4822 · 0.52", at("s10/unsure") - 0.15, 1], ["#4823 · 0.95", END("s10") - 0.9, -1], ["#4824 · 0.91", S.s11 + 0.6, -1]];
          const bump = (side: number) => chips.reduce((m, [, tc, sd]) => (sd === side && t >= tc + 1.1 ? Math.max(m, Math.sin(Math.PI * Math.min(1, (t - tc - 1.1) / 0.3))) : m), 0);
          return (
            <div style={abs({ left: 40, top: 440, width: 1000, height: 820, transformOrigin: "50% 0", transform: `translateY(${-200 * shrink}px) scale(${1 - 0.45 * shrink})` })}>
              <svg viewBox="0 0 1000 820" style={abs({ inset: 0, width: 1000, height: 820, overflow: "visible" })}>
                {[["M500 240 C500 420 220 400 220 560", P.mintInk], ["M500 240 C500 420 780 400 780 560", P.violet]].map(([d, c], i) => (
                  <path key={i} d={d} fill="none" stroke={c} strokeWidth={12} strokeLinecap="round" strokeDasharray={520} strokeDashoffset={520 * (1 - lin(t, t10 + 0.15, t10 + 0.65))} />
                ))}
              </svg>
              <div style={abs({ left: 380, top: 0, width: 240, height: 240, borderRadius: 120, ...card(P.violet, 120), display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FT.d, fontSize: 100, color: P.white, ...springIn(t, t10, { y: 0, s: 0.1, r: -30 }) })}>JEV</div>
              {[{ x: 40, label: "DONE", sub: "confident", bg: P.mint, side: -1, t0: t10 + 0.35 }, { x: 600, label: "LLM", sub: "unsure", bg: P.violet, side: 1, t0: t10 + 0.45 }].map((b) => (
                <div key={b.label} style={abs({ left: b.x, top: 560, width: 360, height: 200, ...card(b.bg, 30), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  color: b.bg === P.mint ? P.ink : P.white, ...springIn(t, b.t0, { y: 60, s: 0.4 }), transform: `${springIn(t, b.t0, { y: 60, s: 0.4 }).transform} scale(${1 + 0.08 * bump(b.side)})` })}>
                  <div style={{ fontFamily: FT.d, fontSize: 96, lineHeight: 1 }}>{b.label}</div><div style={{ fontFamily: FT.m, fontSize: 30, fontWeight: 800 }}>{b.sub}</div>
                </div>
              ))}
              {chips.map(([label, tc, side], i) => {
                if (t < tc || t > tc + 1.3) return null;
                const drop = sp(t, tc, BOUNCY), go = lin(t, tc + 0.55, tc + 1.1), e = go * go * (3 - 2 * go);
                return <div key={i} style={abs({ left: 330 + side * 290 * e, top: -110 + 100 * Math.min(drop, 1.1) + 560 * e, opacity: 1 - lin(t, tc + 1.1, tc + 1.3) })}>
                  <Pill bg={P.ink} color={P.white} size={38} style={{ width: 340, textAlign: "center" }}>{label}</Pill></div>;
              })}
            </div>
          );
        })()}
        <div style={abs({ left: 72, top: 800, ...springIn(t, S.s11 + 1.8, { y: 20, s: 0.6 }) })}><Pill bg={P.sun} size={32}>ONE UNIVERSITY TEST</Pill></div>
        {[{ x: 72, n: countTo(t, at("s11/accuracy"), 80, 99.6, 0.8), f: (v: number) => v.toFixed(1) + "%", l: "of GPT-6's accuracy", fill: 0.996, c: P.mintInk, t0: at("s11/accuracy") },
          { x: 560, n: countTo(t, at("s11/cost"), 0, 47, 0.7), f: (v: number) => Math.round(v) + "%", l: "of its cost", fill: 0.47, c: P.violet, t0: at("s11/cost") }].map((s, i) => (
          <div key={i} style={abs({ left: s.x, top: 900, width: 448, padding: "30px 30px 34px", ...card(), ...springIn(t, s.t0, { y: 120, s: 0.4, r: i ? 6 : -6 }) })}>
            <div style={{ fontFamily: FT.d, fontSize: 130, lineHeight: 1, color: s.c }}>{s.n === null ? "" : s.f(s.n)}</div>
            <div style={{ marginTop: 6, fontSize: 38, fontWeight: 800, color: P.ink }}>{s.l}</div>
            <div style={{ marginTop: 24, height: 28, borderRadius: 14, border: `4px solid ${P.ink}`, overflow: "hidden" }}>
              <i style={{ display: "block", height: "100%", width: `${s.fill * 100}%`, background: s.c, transformOrigin: "0 50%", transform: `scaleX(${Math.min(1, sp(t, s.t0 + 0.1, SMOOTH))})` }} />
            </div>
          </div>
        ))}
        <Illus />
      </Panel>

      {/* ---------- s12 verdict ---------- */}
      <Panel from={S.s12 - 0.25} to={S.s13 + 0.1} enter="flip">
        <div style={abs({ left: 72, top: 260, ...springIn(t, S.s12 - 0.1, { y: -30, s: 0.6 }) })}><Pill bg={P.sun} size={34}>VERDICT</Pill></div>
        <Words words={["JEV", "DECIDES."]} times={[at("s12/jev"), w("s12", "decides", -0.1)]}
          style={abs({ left: 72, top: 380, width: 936, fontFamily: FT.d, fontSize: 160, lineHeight: 1, color: P.violet })} />
        <Words words={["THE", "LLM", "WRITES."]} times={[at("s12/llm") - 0.12, at("s12/llm"), w("s12", "writes", -0.1)]}
          style={abs({ left: 72, top: 570, width: 936, fontFamily: FT.d, fontSize: 160, lineHeight: 1, color: P.ink })} />
        <div style={abs({ left: 72, top: 960, display: "flex", flexDirection: "column", gap: 30, alignItems: "flex-start" })}>
          <div style={springIn(t, at("s12/routing"), { x: -160, y: 0, s: 0.5 })}><Pill bg={P.mint} size={54}>routing ✓</Pill></div>
          <div style={springIn(t, at("s12/routing") + 0.5, { x: -160, y: 0, s: 0.5 })}><Pill bg={P.mint} size={54}>tagging ✓</Pill></div>
          <div style={stampIn(t, at("s12/writing"), -4)}><Pill bg={P.coral} color={P.white} size={54}>writing ✗</Pill></div>
        </div>
      </Panel>

      {/* ---------- s13 CTA ---------- */}
      <Panel from={S.s13 - 0.25} to={END("s13") + 1} exit="none">
        <Words words={["WHAT", "SHOULD", "I", "EXPLAIN", "NEXT?"]} times={["what", "should", "i", "explain", "next"].map((x) => w("s13", x, -0.05))}
          colors={[undefined, undefined, undefined, undefined, P.coralInk]}
          style={abs({ left: 72, top: 400, width: 936, fontFamily: FT.d, fontSize: 190, lineHeight: 1.02, color: P.ink })} />
        <div style={abs({ left: 72, top: 1240, ...springIn(t, at("s13/tell"), { y: 60, s: 0.3, r: -8 }) })}><Pill bg={P.sun} size={48}>+ Follow for more AI breakdowns</Pill></div>
      </Panel>
    </>
  );
};
const SNAPPYish = { damping: 12, stiffness: 200, mass: 0.6 };
export default Stage;
