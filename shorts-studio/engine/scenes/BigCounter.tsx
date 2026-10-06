import React from "react";
import { useCurrentFrame } from "remotion";
import { usePage } from "../core/context";
import { Counter, Reveal, SourcePill } from "../core/editorial";
import { BAND_TOP, BODY, DISPLAY, MONO, SAFE_W, INSET } from "../theme/tokens";
import { useScene } from "./common";

type Item = { value: number | string; prefix?: string; suffix?: string; decimals?: number; label: string; source?: string };
type P = { items: Item[] };

/** One giant number at a time; earlier numbers collapse into a running list above it. */
export const BigCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const page = usePage();
  const { props, item } = useScene<P>();
  const times = props.items.map((_, i) => item("items", i, 40));
  const cur = times.reduce((a, t, i) => (frame >= t ? i : a), -1);
  const fmt = (it: Item) => typeof it.value === "number" ? `${it.prefix ?? ""}${it.value}${it.suffix ?? ""}` : it.value;
  return (
    <div style={{ position: "absolute", left: INSET, top: BAND_TOP - 120, width: SAFE_W - 2 * INSET }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 260 }}>
        {props.items.slice(0, Math.max(0, cur)).map((it, i) => (
          <Reveal key={i} at={times[i + 1]} dy={-20}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: MONO, fontSize: 40, color: page.dim }}>
              <span style={{ color: page.text, fontWeight: 700 }}>{fmt(it)}</span><span style={{ fontFamily: BODY, fontWeight: 700 }}>{it.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
      {cur >= 0 ? (
        <Reveal key={cur} at={times[cur]}>
          <div style={{ fontFamily: DISPLAY, fontSize: Math.min(300, Math.floor((SAFE_W - 2 * INSET) / (Math.max(3, fmt(props.items[cur]).length) * 0.5))), lineHeight: 1, whiteSpace: "nowrap", color: page.accent, marginTop: 20 }}>
            {typeof props.items[cur].value === "number"
              ? <Counter to={props.items[cur].value as number} at={times[cur]} prefix={props.items[cur].prefix} suffix={props.items[cur].suffix} decimals={props.items[cur].decimals} />
              : props.items[cur].value}
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 56, color: page.text, marginTop: 10, lineHeight: 1.1 }}>{props.items[cur].label}</div>
          {props.items[cur].source ? <div style={{ marginTop: 18 }}><SourcePill text={props.items[cur].source!} at={times[cur]} /></div> : null}
        </Reveal>
      ) : null}
    </div>
  );
};
