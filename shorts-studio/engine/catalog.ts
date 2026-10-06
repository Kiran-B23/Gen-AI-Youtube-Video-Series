import { Timings, VideoSpec } from "./types";

/** "catalog" composition: every scene type with placeholder data (silent, no captions). Open it in `npm run preview`. */
const scenes: VideoSpec["scenes"] = [
  { id: "c01", type: "title-hook", page: "ink", props: { lines: ["HOW DOES", "IT WORK?"], highlight: "IT", backdrop: "token-rain", sub: "title-hook" } },
  { id: "c02", type: "running-example", page: "royal", props: { eyebrow: "FOLLOW ONE TICKET", ticket: { id: "#1", from: "Asha", plan: "Free plan", text: "running-example: the one thing we follow." }, questions: ["Question one?", "Question two?"] } },
  { id: "c03", type: "chapter-card", page: "sunflower", props: { index: 1, total: 6, title: "chapter-card" } },
  { id: "c04", type: "big-counter", page: "sunflower", props: { items: [{ value: 120000, label: "big-counter (lakh style: 1,20,000)", source: "Example" }] } },
  { id: "c05", type: "mechanism-step", page: "paper", props: { mode: "token-loop", label: "LLM", answer: "mechanism-step token-loop one piece at a time", counterTo: 8 } },
  { id: "c06", type: "mechanism-step", page: "paper", props: { mode: "one-pass", label: "MODEL", passLabel: "1 PASS", question: "one-pass?", options: [{ label: "yes", p: 0.9 }, { label: "no", p: 0.1 }] } },
  { id: "c07", type: "mechanism-step", page: "paper", props: { mode: "gate", threshold: 0.85, rows: [{ q: "gate", a: "pass", c: 0.93 }, { q: "gate", a: "fail", c: 0.4 }] } },
  { id: "c08", type: "token-strip", page: "royal", props: { eyebrow: "TOKEN-STRIP", tokens: [{ text: "[CLS]", kind: "accent" }, { text: "To" }, { text: "##ken" }, { text: "[SEP]", kind: "special" }], counterLabel: "TOKENS" } },
  { id: "c09", type: "lookup-table", page: "paper", props: { eyebrow: "LOOKUP-TABLE", columns: ["TOKEN", "ID"], rows: [["[CLS]", "101"], ["matters", "50807"]] } },
  { id: "c10", type: "side-by-side-variants", page: "paper", props: { eyebrow: "SIDE-BY-SIDE-VARIANTS", rows: [{ label: "A", tokens: ["To", "##ken"] }, { label: "B", tokens: ["Token"] }] } },
  { id: "c11", type: "big-stamp", page: "ink", props: { text: "NO.", color: "danger" } },
  { id: "c12", type: "equation", page: "ink", props: { terms: [{ text: "2", label: "words" }, { text: "7", label: "tokens", color: "danger" }], ops: ["→"] } },
  { id: "c13", type: "checklist", page: "ink", props: { items: [{ text: "checklist ok", kind: "ok" }, { text: "warn", kind: "warn" }, { text: "no", kind: "no" }] } },
  { id: "c14", type: "code-card", page: "paper", props: { filename: "code-card.py", code: ["x = model.decide(text)", "print(x)"] } },
  { id: "c15", type: "recap-card", page: "ink", props: { title: "RECAP", subtitle: "recap-card", steps: ["One", "Two", "Three", "Four"], question: "Comment question? 👇" } },
];

export const CATALOG: { spec: VideoSpec; timings: Timings } = {
  spec: { slug: "catalog", title: "Scene catalog", theme: "editorial", steps: 6, parts: { full: scenes.map((s) => s.id) }, scenes: scenes.map((s) => ({ ...s, silentSeconds: 4, captions: false })) },
  timings: {},
};
