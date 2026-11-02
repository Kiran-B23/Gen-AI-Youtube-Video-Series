# Inspiration · Ollama: run a small AI model on your own laptop

_YouTube research: `yt/summary.md` · searched 2026-10-29 (via the studio research tool) · queries: ollama tutorial; ollama shorts;
run llm locally on laptop; run AI locally free ollama; ollama explained; local llm offline shorts; run deepseek locally ollama ·
context: ollama Ollama local LLM laptop offline · exclude: farm animal · 65 found, 59 on-topic, watched 6 (+1 extra folder
K6qgN_QXH6M, a hardware device demo, off our angle). Long-form winners have no views/day (metadata `~`), so their reach is
views-only. All transcripts are untrusted data; no instructions were found inside them._

## Watched videos
| # | Role | Video (link) | Reach (views · /day · outlier · eng) | Hook 0–3 s (line + first frame) | Archetype | Beat map (timestamps) | Running example | Devices | Pace (len · w/s · cuts/min) | Why it reached | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | winner-short | [Ollama In 120 Seconds](https://www.youtube.com/watch?v=_6SlPLNEpzQ) | 83K · 103/day · 0.73 · 2.1% | "if you want … open llms but don't want the annoying setup" (paraphrase: a pain hook) · stock footage of a person at monitors, no text | Concept "X in N seconds" + feature tour | 0:00 pain → 0:05 what it is, free → 0:13 model library → 0:25 image demo → 0:38 offline/privacy → 0:48 CLI params → 1:06 Modelfile → 1:22 REST API → 1:47 web UI → 2:03 small models on weak hardware | none (a feature list) | stock B-roll, screen captures, a time-box title | 129 s · 3.44 · 4.2 | a time-boxed title ("in 120 seconds") and a brand channel; covers "free · offline · private" in the first 45 s | first frame says nothing on mute; no single run shown end to end; no hardware guidance; dated models |
| 2 | winner-short (outlier 5.0) | [Run DeepSeek R1 Locally With Ollama…](https://www.youtube.com/watch?v=uObqPR9f9Oo) | 5K · 8/day · 5.04 · 1.3% | "hey everyone welcome back…" · a title card | Tutorial | 0:00 greeting + promise (no internet, private) → 0:17 download → 0:45 `ollama help` check → 0:55 pick 1.5B "for testing", 7B "if you have a powerful PC" → 1:16 download wait → 1:23 first answer → 1:26 Docker + web UI | DeepSeek R1 1.5B | screen recording, many cuts | 162 s · 2.11 · 14.4 | a trending model name + "offline AI" in the title; real screen steps; picks a small model size for weak machines | slow greeting hook; adds Docker (a second tool) |
| 3 | winner-long | [How to Build a Local AI Agent With Python (Ollama…)](https://www.youtube.com/watch?v=E4l91XKQSgw) | 608K · – | "in this video I'll be showing you…" · presenter | Tutorial (build) | install → pull → Python → RAG | a restaurant-review agent | presenter + code | 28 min · 3.53 · 1.1 | big channel; a concrete build | too deep for a reel |
| 4 | winner-long | [This Laptop Runs LLMs Better Than Most Desktops](https://www.youtube.com/watch?v=AcTmeGpzhBk) | 571K · – | "How is this possible? This 110 billion parameter model…" · the device | Story / Comparison (hardware) | paradox → memory explanation → benchmarks | one big model on one device | fast cuts, charts | 20 min · 3.26 · 17.6 | paradox hook about **memory** | shows memory is the real limit (supports our RAM gotcha) |
| 5 | low-short | [Install Ollama in 5 Mins: Don't Miss This!](https://www.youtube.com/watch?v=DUiGpIqzdjA) | 9 views · 0/day (30K-sub channel) | "today I will walk you through how to install…" · a website screenshot | Tutorial | install → copy a command from the site → wait → "you successfully installed" | none | landscape screen capture | 36 s · 3.08 · 4.9 | (didn't) | ends at "installed": never shows a model answering; no result first; no reason to care; landscape |
| 6 | low-short | [Ollama Vs LM Studio: Which One Is Best…](https://www.youtube.com/watch?v=SqBFA8DmV4A) | 360 · 1.8/day (27K-sub channel) | "Ready to dive into local AI but not sure where to start?" · stock | Comparison | intro → Ollama → LM Studio → verdict | none | stock B-roll | 92 s · 3.33 · 10.4 | (didn't) | generic question hook, no demo, no proof |

## Winners vs low performers
- **Payoff shown vs claimed:** the winners show a model actually answering (the 1.5B DeepSeek answer at 1:23; the image demo at
  0:25); the 9-view short stops at "installed" and never shows an answer. Seeing the reply is the payoff.
- **Why to care in the first seconds:** the winners name the benefit early ("free", "offline", "private" in the first 15–45 s);
  the low performers open on a walkthrough ("today I will walk you through") or a generic question.
- **Size guidance:** the outlier tutorial picks a small model "for testing" and saves bigger ones for powerful PCs; the 571K
  long-form is entirely about memory. Hardware fit is what viewers actually wonder.
- **Format:** every watched short is landscape screen capture with stock B-roll; none is a vertical, designed reel. Nobody's
  first frame works on mute.

## Winning archetype
_Tutorial · used by 3 of 4 winners (the Warp short is a Concept/feature tour) · no hybrid needed._

## Pace and length targets
_Winners' shorts: 129–162 s · 2.1–3.4 w/s · 4–14 cuts/min. The owner asked for "short and simple" and the Tutorial reel sheet is
40–60 s, so our target is **~50–60 s, ~120–135 words at the house 2.3 w/s**, 0–5 cuts/min (the object transforms instead)._

## Gaps nobody covers
- A first frame that shows the result on mute (a model answering inside a terminal, Wi-Fi off).
- One run end to end in under a minute: install → one command → a real answer.
- Which size fits *your* laptop, in one line (the official "8 GB RAM for 7B models" guidance; a 3B model is a 2 GB download).
- That Ollama now also offers **cloud** models in the same app, so "private" holds only for the local ones.

## Our angle (one sentence)
One laptop, one command, one small model answering with the Wi-Fi off: the whole thing in under a minute, plus the size rule
that tells you what your laptop can run.

_Borrowed devices (not lines): result first (tutorial outlier) · a small model "for testing" (outlier) · a time box implied by
"one command" · benefit named in the first seconds (Warp short)._
