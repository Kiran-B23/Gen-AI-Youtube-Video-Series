// Laya · Remotion stage (house style reference-flat) · same beats as stage/stage.js; running object: the ticket
import React from "react";
import { useStage } from "../../../remotion/src/engine/stage";
import { count, ease, fadeOut, pop, prog, slam, typed } from "../../../remotion/src/engine/anim";
import { abs, C, Chapter, chapterEnd, Chip, Cta, F, Group, Stamp } from "../../../remotion/src/engine/kit";

const TXT = "I was charged twice. Refund me, or I cancel.";
const pct = (v: number | null, dec = 0) => (v === null ? "" : v.toFixed(dec) + "%");

const Stage: React.FC = () => {
  const { t, S, at, W } = useStage();

  // ---------- timings (all from spoken words) ----------
  const t04 = chapterEnd(at("s04/pip") - 0.35);
  const t05 = chapterEnd(at("s05/ticket") + 0.2);
  const t09 = chapterEnd(at("s09/jev") - 0.05);
  const t11 = chapterEnd(at("s11/catch") + 0.45);
  const tkUp = prog(t, S.s06 - 0.1, 0.5, ease.inOut3);

  return (
    <>

      {/* s01 hook */}
      <Group from={0} to={S.s02}>
        <div style={abs({ left: 60, top: 250, fontFamily: F.display, fontSize: 300, lineHeight: 0.95, color: C.yellow, ...slam(t, 0, -3) })}>FREE.</div>
        <svg viewBox="0 0 900 560" style={abs({ left: 90, top: 620, width: 900, height: 560, overflow: "visible" })}>
          {["M90 20 H810 Q830 20 830 40 V420 H70 V40 Q70 20 90 20 Z", "M10 440 H890 L850 520 H50 Z"].map((d, i) => (
            <path key={i} d={d} fill="none" stroke={C.white} strokeWidth={10} strokeLinejoin="round" strokeDasharray={2600}
              strokeDashoffset={2600 * (1 - prog(t, Math.min(at("s01/free") + 0.3, at("s01/laptop") - 0.9) + i * 0.1, 0.7, ease.inOut2))} />
          ))}
        </svg>
        <div style={abs({ left: 180, top: 730, width: 720, textAlign: "center", color: C.white, ...pop(t, at("s01/laptop") - 0.3) })}>
          <div style={{ fontFamily: F.display, fontSize: 140, lineHeight: 0.95 }}>JEV RIVAL</div>
          <div style={{ marginTop: 18, fontFamily: F.mono, fontSize: 32, fontWeight: 800, letterSpacing: "0.25em", color: C.yellow }}>ON YOUR OWN LAPTOP</div>
        </div>
      </Group>

      {/* s02-s03 what it is */}
      <Group from={S.s02} to={S.s04 - 0.2}>
        <div style={abs({ left: 60, top: 230, fontFamily: F.display, fontSize: 330, lineHeight: 0.95, color: C.white, ...pop(t, S.s02 - 0.15, { y: 80, s: 1, d: 0.4, e: ease.out4 }) })}>LAYA</div>
        <div style={abs({ left: 72, top: 590, display: "flex", gap: 22 })}>
          <Chip kind="yel" style={pop(t, at("s02/decides"), { y: 20 })}>decides ✓</Chip>
          <Chip kind="wht" style={{ position: "relative", ...pop(t, at("s02/decides") + 0.15, { y: 20 }), opacity: Math.min(pop(t, at("s02/decides") + 0.15).opacity as number, t > at("s02/never") + 0.3 ? 0.55 : 1) }}>
            writes text
            <i style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 7, marginTop: -3, background: C.redHot, borderRadius: 4, transformOrigin: "0 50%",
              transform: `scaleX(${prog(t, at("s02/never"), 0.3)})` }} />
          </Chip>
        </div>
        <div style={abs({ left: 72, top: 760, width: 936, padding: "26px 34px", borderRadius: 30, background: "rgba(255,255,255,0.10)", border: "3px solid rgba(255,255,255,0.28)",
          fontSize: 54, fontWeight: 800, color: C.white, ...pop(t, at("s03/msg"), { x: -80, y: 0, e: ease.out3 }) })}>
          <span style={{ display: "block", fontFamily: F.mono, fontSize: 26, fontWeight: 800, letterSpacing: "0.25em", color: C.yellow, marginBottom: 8 }}>MESSAGE</span>"Where is my refund?"
        </div>
        <div style={abs({ left: 72, top: 1000, width: 936 })}>
          {[["team?", 94], ["urgent?", 71], ["refund?", 63]].map(([q, v], k) => {
            const tq = at("s03/qs") + k * 0.15, tp = at("s03/pct") + k * 0.12, val = count(t, tp, 0, v as number, 0.6);
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 22, height: 112, ...pop(t, tq, { x: -50, y: 0, s: 1, d: 0.35, e: ease.out3 }) }}>
                <Chip kind="wht" style={{ width: 260, textAlign: "center" }}>{q}</Chip>
                <span style={{ flex: 1, height: 30, borderRadius: 15, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
                  <i style={{ display: "block", height: "100%", width: `${v}%`, borderRadius: 15, background: C.yellow, transformOrigin: "0 50%", transform: `scaleX(${prog(t, tp, 0.6)})` }} />
                </span>
                <span style={{ width: 150, fontFamily: F.display, fontSize: 70, color: C.white, textAlign: "right", opacity: val === null ? 0 : 1 }}>{pct(val)}</span>
              </div>
            );
          })}
        </div>
        <div style={abs({ right: 60, top: 1440, fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.55)" })}>illustrative</div>
      </Group>

      {/* 01 install it */}
      <Chapter start={S.s04} until={at("s04/pip") - 0.35} n={1} of={4} title="Install it" on="dark" />
      <Group from={t04 - 0.05} to={S.s05 - 0.2}>
        <div style={abs({ left: 60, top: 760, width: 960, paddingBottom: 34, borderRadius: 28, background: "#151A2E", border: "3px solid rgba(255,255,255,0.18)", overflow: "hidden",
          fontFamily: F.mono, fontSize: 50, fontWeight: 700, color: C.white, ...pop(t, t04 - 0.05, { y: 40, d: 0.35 }) })}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 24px", background: "rgba(255,255,255,0.07)", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <i key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />)}<span style={{ marginLeft: 14 }}>our laptop · CPU only</span>
          </div>
          <div style={{ padding: "14px 34px 0", minHeight: 76 }}><span style={{ color: C.yellow }}>$</span> {typed("pip install laya", t, t04 + 0.1, at("s04/pip") + 0.45)}</div>
          <div style={{ padding: "14px 34px 0", minHeight: 76, color: "#8FE3C1", opacity: t >= at("s04/ver") - 0.2 ? 1 : 0 }}>Version: 0.4.2</div>
          <div style={{ padding: "14px 34px 0", minHeight: 76 }}><span style={{ color: C.yellow }}>$</span> {typed("nvidia-smi", t, at("s04/ver"), at("s04/gpu") - 0.4)}</div>
          <div style={{ padding: "14px 34px 0", minHeight: 76, fontSize: 44, color: "#FF8A95", opacity: t >= at("s04/gpu") - 0.25 ? 1 : 0 }}>nvidia-smi: command not found</div>
        </div>
        <div style={abs({ left: 270, top: 1230, ...slam(t, at("s04/gpu"), -6) })}><Stamp size={150}>NO GPU</Stamp></div>
      </Group>

      {/* 02 ask it: the ticket */}
      <Chapter start={S.s05} until={at("s05/ticket") + 0.2} n={2} of={4} title="Ask it" on="light" />
      <Group from={S.s05} to={S.s08 - 0.05}>
        <div style={abs({ left: 72, top: 820, width: 936, padding: "30px 38px 36px", background: C.white, border: `4px solid ${C.navy}`, borderRadius: 30, color: C.navy,
          ...pop(t, t05 - 0.1, { y: 60 }), transform: `${pop(t, t05 - 0.1, { y: 60 }).transform} translateY(${-560 * tkUp}px) scale(${1 - 0.06 * tkUp})` })}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontSize: 28, fontWeight: 800 }}>
            <span style={{ color: C.blue }}>TICKET</span><span style={{ color: "rgba(11,16,32,0.5)" }}>real test · our laptop</span>
          </div>
          <div style={{ marginTop: 18, minHeight: 140, fontSize: 60, fontWeight: 800, lineHeight: 1.2 }}>
            {(() => {   // typed letter by letter; "cancel" carries its own highlight (as spoken in s07)
              const shown = typed(TXT, t, Math.max(t05, at("s05/type")), at("s05/typed")), i0 = TXT.lastIndexOf("cancel");
              const hl = prog(t, at("s07/cancel"), 0.35) * 100;
              return <>{shown.slice(0, i0)}<span style={{ backgroundImage: `linear-gradient(${C.yellow}, ${C.yellow})`, backgroundRepeat: "no-repeat",
                backgroundSize: `${hl}% 100%`, borderRadius: 8, padding: "0 4px" }}>{shown.slice(i0, i0 + 6)}</span>{shown.slice(i0 + 6)}</>;
            })()}
          </div>
        </div>
        {/* s06 which team */}
        {t < S.s07 && <>
          <div style={abs({ left: 72, top: 590, fontFamily: F.mono, fontSize: 40, fontWeight: 800, letterSpacing: "0.15em", color: C.blue, ...pop(t, at("s06/team") + 0.1, { y: 10, out: S.s07 - 0.25 }) })}>WHICH TEAM?</div>
          <div style={abs({ left: 72, top: 660, width: 936, opacity: fadeOut(t, S.s07 - 0.25, 0.25) })}>
            {[["billing", 98.4], ["other", 0.6], ["technical", 0.5], ["sales", 0.4]].map(([n, v], k) => {
              const win = k === 0, val = win ? count(t, at("s06/pct"), 0, 98.4, 0.6) : (v as number);
              return (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 20, height: 112, ...pop(t, at("s06/team") + 0.15 + k * 0.1, { x: -40, y: 0, s: 1, d: 0.35, e: ease.out3 }) }}>
                  <span style={{ width: 250, fontFamily: F.mono, fontSize: 44, fontWeight: 800, color: C.navy }}>{n}</span>
                  <span style={{ flex: 1, height: 54, border: `4px solid ${C.navy}`, borderRadius: 14, background: C.white, overflow: "hidden" }}>
                    <i style={{ display: "block", height: "100%", width: win ? "98.4%" : "1.5%", background: win ? C.green : C.navy, transformOrigin: "0 50%",
                      transform: `scaleX(${win ? prog(t, at("s06/billing"), 0.7) : prog(t, at("s06/billing") + 0.1, 0.3)})` }} />
                  </span>
                  <span style={{ width: 170, textAlign: "right", fontFamily: F.display, fontSize: 64, color: win ? C.greenInk : C.navy, opacity: val === null ? 0 : 1 }}>{pct(val, 1)}</span>
                </div>
              );
            })}
          </div>
          <div style={abs({ left: 200, top: 1150, opacity: fadeOut(t, S.s07 - 0.25, 0.25) })}><div style={slam(t, at("s06/nailed"), -5)}><Stamp size={120} color={C.greenInk}>✓ NAILED IT</Stamp></div></div>
        </>}
        {/* s07 will they leave */}
        <div style={abs({ left: 72, top: 590, fontFamily: F.mono, fontSize: 40, fontWeight: 800, letterSpacing: "0.15em", color: C.blue, ...pop(t, at("s07/leave") - 0.1, { y: 10 }) })}>WILL THEY LEAVE?</div>
        <div style={abs({ left: 72, top: 690, width: 936, ...pop(t, S.s07 + 0.05, { y: 30 }) })}>
          <div style={{ position: "relative", height: 90, border: `5px solid ${C.navy}`, borderRadius: 22, background: C.white, overflow: "hidden" }}>
            <i style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "48.25%", background: C.amber, transformOrigin: "0 50%", transform: `scaleX(${prog(t, at("s07/pct") - 0.1, 0.8)})` }} />
            <b style={{ position: "absolute", left: "50%", top: -5, bottom: -5, width: 6, marginLeft: -3, background: C.red }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontFamily: F.mono, fontSize: 30, fontWeight: 800, color: C.navy }}>
            <span>0</span><span style={{ color: C.red }}>50% = coin flip</span><span>100</span>
          </div>
        </div>
        {(() => { const v = count(t, at("s07/pct"), 0, 48, 0.7); return <div style={abs({ left: 0, width: 1080, top: 870, textAlign: "center", fontFamily: F.display, fontSize: 230, lineHeight: 1, color: C.navy, opacity: v === null ? 0 : 1 })}>{pct(v)}</div>; })()}
        <div style={abs({ left: 250, top: 1140, ...slam(t, at("s07/guess"), -6) })}><Stamp size={140} color={C.red}>A GUESS</Stamp></div>
      </Group>

      {/* s08 speed */}
      <Group from={S.s08} to={S.s09 - 0.2}>
        <svg viewBox="0 0 400 400" style={abs({ left: 290, top: 250, width: 500, height: 500, ...pop(t, S.s08 - 0.1, { y: 0, s: 0.85, d: 0.4, e: ease.back(1.6) }) })}>
          <circle cx={200} cy={200} r={170} fill="none" stroke="rgba(11,16,32,0.15)" strokeWidth={40} />
          <circle cx={200} cy={200} r={170} fill="none" stroke={C.blue} strokeWidth={40} strokeDasharray={1068.1} transform="rotate(-90 200 200)"
            strokeDashoffset={1068.1 * (1 - 0.651 * prog(t, at("s08/time"), 0.8))} />
        </svg>
        <div style={abs({ left: 0, width: 1080, top: 480, textAlign: "center", fontFamily: F.mono, fontSize: 30, fontWeight: 800, color: "rgba(11,16,32,0.7)", ...pop(t, S.s08, { y: 10 }) })}>of 1 second</div>
        {(() => { const v = count(t, at("s08/time"), 0, 0.65, 0.8); return <div style={abs({ left: 0, width: 1080, top: 800, textAlign: "center", fontFamily: F.display, fontSize: 230, lineHeight: 1, color: C.navy, opacity: v === null ? 0 : 1 })}>{v === null ? "" : v.toFixed(2) + " s"}</div>; })()}
        <div style={abs({ left: 0, width: 1080, top: 1060, display: "flex", justifyContent: "center", gap: 20 })}>
          <Chip kind="ink" style={{ fontSize: 38, ...pop(t, at("s08/three"), { y: 20 }) }}>3 answers</Chip>
          <Chip kind="wht" style={{ fontSize: 38, ...pop(t, at("s08/three") + 0.2, { y: 20 }) }}>median of 20 runs</Chip>
        </div>
        <div style={abs({ left: 230, top: 1200, ...slam(t, at("s08/cpu"), -5) })}><Stamp size={130} color={C.navy}>CPU ONLY</Stamp></div>
      </Group>

      {/* 03 compare */}
      <Chapter start={S.s09} until={at("s09/jev") - 0.05} n={3} of={4} title="Laya vs Jev" on="blue" />
      <Group from={t09 - 0.05} to={S.s11 - 0.2}>
        <div style={abs({ left: 72, top: 260, width: 936, display: "flex", gap: 36 })}>
          {[{ n: "JEV", chip: "paid cloud API", k: "yel" as const, t0: t09 - 0.05, tc: at("s09/paid"), x: -60, icon: "M50 100 H160 A35 35 0 0 0 150 32 A50 50 0 0 0 58 45 A30 30 0 0 0 50 100 Z" },
            { n: "LAYA", chip: "free · open", k: "wht" as const, t0: at("s09/laya"), tc: at("s09/laya") + 0.3, x: 60, icon: "M40 15 H160 V85 H40 Z M15 95 H185 L172 110 H28 Z" }].map((c, i) => {
            const bump = i === 1 ? 1 + 0.05 * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - at("s09/machine") - 0.3) / 0.3))) : 1;
            return (
              <div key={i} style={{ flex: 1, height: 470, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, borderRadius: 30,
                background: "rgba(255,255,255,0.10)", border: "3px solid rgba(255,255,255,0.28)", ...pop(t, c.t0, { x: c.x, y: 0, e: ease.out3 }),
                transform: `${pop(t, c.t0, { x: c.x, y: 0, e: ease.out3 }).transform} scale(${bump})` }}>
                <svg viewBox="0 0 200 120" style={{ width: 230, height: 140 }}><path d={c.icon} fill="none" stroke={C.white} strokeWidth={8} strokeLinejoin="round" /></svg>
                <div style={{ fontFamily: F.display, fontSize: 120, lineHeight: 0.95, color: C.white }}>{c.n}</div>
                <Chip kind={c.k} style={{ fontSize: 36, ...pop(t, c.tc, { y: 10 }) }}>{c.chip}</Chip>
              </div>
            );
          })}
        </div>
        {(() => {   // the ticket flies into the laptop card: it stays on your machine
          const tm = at("s09/machine"); if (t < tm - 0.5 || t > tm + 0.45) return null;
          const p = prog(t, tm - 0.3, 0.6, ease.inOut2);
          return <div style={abs({ left: 140 + 460 * p, top: 800 - 300 * p, transform: `scale(${1 - 0.4 * p})`, opacity: t > tm + 0.3 ? 1 - (t - tm - 0.3) / 0.15 : 1 })}><Chip kind="ink" style={{ fontSize: 36 }}>ticket</Chip></div>;
        })()}
        <div style={abs({ left: 0, width: 1080, top: 790, textAlign: "center", fontFamily: F.mono, fontSize: 38, fontWeight: 800, letterSpacing: "0.25em", color: C.yellow, ...pop(t, at("s09/machine") + 0.3, { y: 10, out: S.s10 - 0.2, outD: 0.2 }) })}>STAYS ON YOUR MACHINE</div>
        {t >= S.s10 && <div style={abs({ left: 120, top: 800, width: 840, height: 640, display: "flex", gap: 90, alignItems: "flex-end", justifyContent: "center" })}>
          <div style={abs({ left: 0, width: 840, top: 0, textAlign: "center", fontFamily: F.mono, fontSize: 30, fontWeight: 800, letterSpacing: "0.25em", color: C.white, ...pop(t, at("s10/bench"), { y: -20, s: 1, d: 0.4 }) })}>LAYA'S OWN BENCHMARK</div>
          {[{ n: "Laya · tuned", v: 77, c: C.yellow, t0: at("s10/tuned"), show: S.s10 }, { n: "Jev · published", v: 73, c: C.white, t0: at("s10/jev"), show: (W("s10", "jev's") ?? at("s10/jev") - 0.8) - 0.1 }].map((b, i) => {
            const v = count(t, b.t0, 0, b.v, 0.7);
            return (
              <div key={i} style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center", ...pop(t, b.show, { x: i ? 60 : 0, y: 0, s: 1, d: 0.45, e: ease.out3 }) }}>
                <div style={{ fontFamily: F.display, fontSize: 110, lineHeight: 1, color: C.white, marginBottom: 12, opacity: v === null ? 0 : 1 }}>{pct(v)}</div>
                <div style={{ width: 220, height: 420, display: "flex", alignItems: "flex-end", borderBottom: `6px solid ${C.white}` }}>
                  <i style={{ display: "block", width: "100%", height: `${b.v}%`, background: b.c, borderRadius: "16px 16px 0 0", transformOrigin: "50% 100%", transform: `scaleY(${prog(t, b.t0, 0.7)})` }} />
                </div>
                <div style={{ marginTop: 16, fontFamily: F.mono, fontSize: 32, fontWeight: 800, color: C.white }}>{b.n}</div>
              </div>
            );
          })}
        </div>}
      </Group>

      {/* 04 the catch */}
      <Chapter start={S.s11} until={at("s11/catch") + 0.45} n={4} of={4} title="The catch" on="dark" />
      <Group from={t11} to={S.s12 - 0.2}>
        <div style={abs({ left: 120, top: 330, width: 840, height: 900, display: "flex", gap: 70, alignItems: "flex-end", justifyContent: "center", ...pop(t, t11, { y: 40, s: 1, d: 0.4, e: ease.out3 }) })}>
          {(() => { const tu = at("s11/untuned") + 0.2, v = count(t, tu, 77, 36, 0.9) ?? 77, k = t >= at("s11/pct") ? 1 + 0.15 * Math.sin(Math.PI * Math.min(1, (t - at("s11/pct")) / 0.3)) : 1;
            return (
              <div style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontFamily: F.display, fontSize: 110, lineHeight: 1, color: C.redHot, marginBottom: 12, transform: `scale(${k})` }}>{Math.round(v)}%</div>
                <div style={{ position: "relative", width: 220, height: 700, display: "flex", alignItems: "flex-end", borderBottom: `6px solid ${C.white}` }}>
                  <b style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "77%", border: "5px dashed rgba(255,255,255,0.45)", borderBottom: 0, borderRadius: "16px 16px 0 0" }} />
                  <i style={{ display: "block", width: "100%", height: `${v}%`, background: C.redHot, borderRadius: "16px 16px 0 0" }} />
                </div>
                <div style={{ marginTop: 16, fontFamily: F.mono, fontSize: 32, fontWeight: 800, color: C.white }}>Laya · untuned</div>
              </div>
            ); })()}
          <div style={{ width: 420, paddingBottom: 80, color: C.white }}>
            <div style={{ fontFamily: F.mono, fontSize: 30, fontWeight: 800, letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)" }}>TUNED</div>
            <div style={{ fontFamily: F.display, fontSize: 150, lineHeight: 1, color: "rgba(255,255,255,0.45)", textDecoration: "line-through", textDecorationColor: C.redHot }}>77%</div>
            <Chip kind="yel" style={{ marginTop: 30, fontSize: 36, whiteSpace: "normal", ...pop(t, at("s11/tune"), { y: 20 }) }}>tune it on your tickets first</Chip>
          </div>
        </div>
      </Group>

      {/* s12 verdict */}
      <Group from={S.s12 - 0.15} to={S.s13}>
        <div style={abs({ left: 72, top: 280, fontFamily: F.mono, fontSize: 32, fontWeight: 800, letterSpacing: "0.25em", color: C.navy })}>VERDICT</div>
        {[{ when: ["private data", "+ time to tune"], who: "LAYA", t0: S.s12 - 0.15, tw: at("s12/try"), top: 380 }, { when: ["zero setup", "+ accuracy"], who: "JEV", t0: at("s12/acc"), tw: at("s12/pay"), top: 780 }].map((r, i) => (
          <div key={i} style={abs({ left: 72, top: r.top, width: 936, height: 330, display: "flex", alignItems: "center", gap: 24, padding: "0 36px", background: C.white,
            border: `5px solid ${C.navy}`, borderRadius: 34, ...pop(t, r.t0, { x: -60, y: 0, s: 1, d: 0.35, e: ease.out3 }) })}>
            <div style={{ flex: 1, fontSize: 52, fontWeight: 800, lineHeight: 1.15, color: C.navy }}>{r.when[0]}<br />{r.when[1]}</div>
            <div style={{ fontSize: 80, fontWeight: 900, color: C.blue }}>→</div>
            <div style={{ fontFamily: F.display, fontSize: 150, lineHeight: 0.95, color: C.blue, ...slam(t, r.tw, -3) }}>{r.who}</div>
          </div>
        ))}
      </Group>

      <Cta sid="s13" words={["What", "should", "I", "explain", "next?"]} follow={at("s13/tell")} />
    </>
  );
};
export default Stage;
