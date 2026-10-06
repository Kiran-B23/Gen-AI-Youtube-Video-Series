import React from "react";
import { usePage } from "../core/context";
import { Box, Eyebrow, Reveal } from "../core/editorial";
import { BAND_TOP, BODY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type P = { eyebrow: string; ticket: { id: string; from: string; plan: string; text: string }; questions: string[] };

/** The one concrete example followed through the whole video. */
export const RunningExample: React.FC = () => {
  const page = usePage();
  const { props, at } = useScene<P>();
  const tQ = at("questions", 60);
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 60, width: SAFE_W - 2 * INSET }}>
      <Eyebrow>{props.eyebrow}</Eyebrow>
      <Reveal at={at("ticket", 0)} style={{ marginTop: 24 }}>
        <div style={{ borderRadius: 24, background: "#FFFFFF", color: "#0B1020", padding: "26px 30px", boxShadow: "0 18px 40px rgba(0,0,0,0.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: MONO, fontSize: 32, fontWeight: 700, color: "#6B7280" }}>
            <span>{props.ticket.id}</span>
            <span style={{ padding: "2px 12px", borderRadius: 8, background: "#DDF7EE", color: "#0E9F6E" }}>● Open</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#2840E6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY, fontWeight: 900, fontSize: 34 }}>{props.ticket.from[0]}</div>
            <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 40 }}>{props.ticket.from} <span style={{ color: "#6B7280", fontWeight: 600 }}>· {props.ticket.plan}</span></div>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 52, lineHeight: 1.18, marginTop: 18 }}>“{props.ticket.text}”</div>
        </div>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {props.questions.map((q, i) => (
          <Reveal key={q} at={tQ + i * 7} dx={-40} dy={0} sfx="pop">
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Box tone="accent" size={40}>{i + 1}</Box>
              <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 48, color: page.text }}>{q}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
