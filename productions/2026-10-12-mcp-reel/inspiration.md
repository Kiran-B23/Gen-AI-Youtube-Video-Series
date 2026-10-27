# Inspiration · How MCP works

_YouTube research: `yt/summary.md` · searched 2026-10-12 · 11 queries: MCP explained; what is MCP; how MCP works; MCP #shorts;
model context protocol explained; MCP server explained; MCP vs API; why MCP matters for AI agents; MCP in 60 seconds;
MCP server claude #shorts; model context protocol shorts · context: "AI LLM Claude agent agents protocol tools ChatGPT Anthropic context" ·
exclude: "minecraft certification exam fortnite" (a first run wrongly excluded "MCP" itself and was re-run) · dropped by review:
`V_t51u1tBJc`, `aR-vfec4Njg` (about making money with YouTube Shorts, not MCP) · watched 5 (1 winner Short, 3 winner long-form,
1 low-performer Short). Only one on-topic Short cleared the 5K-view winner bar (72 videos found): **MCP has no Short with
real reach yet**, so pace targets lean on the house benchmark plus the one winning Short. Confidence: medium._

_No instructions were found inside the watched data._

## Watched videos
| # | Role | Video (link) | Reach (views · /day · outlier · eng) | Hook 0–3 s (line + first frame) | Archetype | Beat map (timestamps) | Running example | Devices | Pace (len · w/s · cuts/min) | Why it reached | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | winner-short | [MCP Explained in 2 Minutes](https://www.youtube.com/watch?v=taeX8tgpPRQ) | 50K · 104/day · 0.61 · 1.2% | Expands the acronym; frame 0 is an empty navy screen, the title fades in at 0:02 (formula #18-ish definition, weak first frame) | Concept, "X in 45 s" variant | 0:00 definition · 0:10 "the LLM on its own" can't act · 0:35 connect it to tools: context + action · 1:20 MCP = agreed standard instead of one method per tool · 1:57 CTA to a demo | none (generic "send an email", CRM) | a flat white diagram that BUILDS: LLM icon → dotted lines → tool icons (brand logos) → an MCP server box inserted in the middle; presenter in a corner bubble | 148 s · 3.08 w/s · 2.8 cuts/min | Answers the searched question plainly; the diagram grows step by step, one change every ~5–10 s; the before/after ("can't act" → "can act") is clear | Never shows *how* a request travels; the model "connects to tools" directly (blurs who calls what); uses brand logos; no catch; ends on "click this video" |
| 2 | winner-long | [MCP vs API: Why traditional APIs are failing AI agents](https://www.youtube.com/watch?v=185XGEMefgc) | 1.2M · 11K/day · 1164 · 2.3% | "If you've ever built an app that talks to an AI model…" over a white "MCP vs API" title card with a logo (#7 question-ish; weak frame) | Comparison (MCP vs API) with Concept middle | 0:04 promise · 1:01 APIs were the handshake · 1:41 why APIs don't fit models (locked-cabinet analogy) · 3:25 support-ticket agent example · 5:25 HTTP analogy · 8:49 honest "not all magic": adoption, security/permissions · 9:53+ verdict | an AI support agent wired to mail, notes and tickets | presenter + slides, analogies (cabinet, map vs manual) | 745 s · 2.33 w/s · 2.3 cuts/min | Owns the "vs API" search intent; big brand channel; the comparison frame answers "do I still need APIs?" | Mechanism stays abstract (no message shown); the catch is generic ("permissions"), no concrete risk |
| 3 | winner-long | [How Model Context Protocol (MCP) actually works](https://www.youtube.com/watch?v=cGuyrANVi4A) | 373K · 3K/day · 373 · 2.5% | "If you've ever tried to make an AI model talk to your tools… it's messy" over a dark agent diagram (#16 relatable pain) | Concept | 0:04 pain · 0:25 promise + agenda · 0:48 definition · 1:33 why APIs don't fit models · 2:28 clients and servers · 3:25 list / call / retrieve requests · 3:52 tools, resources, prompts · 6:20 calendar/notes/email example · 7:06 "like HTTP for the web" | calendar + notes + email servers (late) | presenter + dark slides with numbered agenda, simple glyph diagrams | 478 s · 2.44 w/s · 1.9 cuts/min | Its title *is* our viewer's question; calm, structured teaching; names the list → call loop | Says "the client is usually the language model" (the spec says the client lives in the host app and the model only selects tools): the exact confusion we can fix; no catch; the example arrives at 6:20 |
| 4 | winner-long | [Building Agents with MCP, full workshop](https://www.youtube.com/watch?v=kQmXtrmQ5Zg) | 358K · – · – · – | conference talk opener (not a hook) | Concept (session) | 0:34 agenda · 1:14 "models are only as good as the context we provide" · 2:08 protocols that came before (APIs, LSP) · … 104 min | live demos later | stage + slides | 6252 s · 2.61 w/s · 0.3 cuts/min | First-party authority; long-tail search | Not a format to borrow for a reel; we used it only for the framing "context is the bottleneck" |
| 5 | low-short | [How UserTesting's MCP turns your LLM into a better research assistant](https://www.youtube.com/watch?v=pAsHB13L1Qs) | 67 · 0.5/day · 0.01 · 0% | "You're already using LLM to synthesize your research…" over a talking head + screen | Launch/product promo | 0:00 pain · 0:10 product MCP server · 0:27 results · 0:54 logo end card | a product research test | presenter + fast screen cuts (10 cuts/min) | 60 s · 2.65 w/s · 10.1 cuts/min | — | Never explains MCP; a product ad wearing an MCP title; the first frame doesn't say anything on mute |

## Winners vs low performers
- **Winners answer the question in the title; the low performer advertises.** All three explainer winners say what MCP is and why it exists within 50 s; the low performer is a product pitch that assumes you already know MCP.
- **Winners build one diagram over time; the low performer cuts fast between screens.** The winning Short adds one element to the same diagram every 5–10 s (LLM → tools → MCP server in the middle). The low performer runs 10 cuts/min of UI with nothing to follow. Growth of one picture beats cut count.
- **Winners use a before/after:** "the model alone can't act" → "connected, it can". The low performer has no "before".
- **Winners are calm (2.3–3.1 w/s).** None is hyped; the Short is the fastest at 3.08 w/s.
- **What *no* winner does:** show one real request travelling end to end (the actual `tools/list` menu, the model's choice, the `tools/call` note, the result). Every one leaves the mechanism as "the model connects to tools", and one says the model *is* the client. None has a concrete catch.

## Winning archetype
_Concept · used by 3 of 4 winners (the 4th, the 1.2M "MCP vs API", is a Comparison with a Concept middle). Our topic says "how MCP works", so Concept stays; the "vs API" question gets one line inside the "why it exists" beat, not a second beat sheet._

## Pace and length targets
_Winners' median: the one winning Short runs 148 s at 3.08 w/s, 2.8 cuts/min (but its diagram changes every ~5 s); long-form winners 2.3–2.6 w/s. House benchmark: 2–3 min at ~2.3 w/s, every step shown on one running object.
→ our target: **~100–120 s**, ~280 words, delivered at ~2.6 w/s, a visual change every 2–3 s, three numbered mechanism steps, re-hooks at ~35 s and ~70 s, a recap card._

## Gaps nobody covers
- One request followed end to end, with the real message shapes (`tools/list` → model's choice → `tools/call` → result).
- **Who actually calls the tool.** The model never touches the server; it writes a request and the app sends it. One winner gets this wrong.
- A concrete catch: the model reads tool descriptions as instructions, so a poisoned description can steer it (S11). Winners say "security" in general or nothing.
- Current spec: most videos predate spec 2026-07-28; we stay on the parts that haven't changed (`tools/list`, `tools/call`) and avoid the old handshake.
- Logo-free, full-screen motion in 9:16; every winner is landscape with a presenter.

## Our angle (one sentence)
Follow one question ("Will it rain in Tokyo tomorrow?") through MCP end to end, and show the thing nobody draws: the model never touches the tool; it reads a menu and writes a note, and the app makes the call.

_Borrowed devices (not lines): one diagram that grows instead of cutting away (Short #1); a before/after of "the model alone" vs "connected" (Short #1); a plain promise of what you'll understand (long #3); an honest "it's not all magic" beat before the end (long #2), made concrete._
