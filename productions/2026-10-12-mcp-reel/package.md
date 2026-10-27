# Package · How MCP works (reel)

_For the editor: brief, chosen hook, script, storyboard and publish kit in one file. Animation plan: `animation-plan.md` (approved 2026-10-12); art direction: `art-direction.md`; gates: `content-plan.md`, `script-review.md`. Next step: `/video-studio productions/2026-10-12-mcp-reel`._

## Brief · How MCP works

| | |
|---|---|
| Topic | How MCP (Model Context Protocol) works |
| Format(s) | reel (9:16, faceless) · default, the user gave only "How MCP Works reel" |
| Viewer | global tech audience · level: curious practitioner (default; has heard "MCP server", hasn't seen the moving parts) |
| **Viewer's question** | "When an AI app 'uses an MCP server', what actually happens, and who really calls the tool?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept, standard "how X works" sheet (chooser row 1: "how … works" is a neutral question about a mechanism) → confirmed after YouTube analysis: Concept is used by 3 of 4 winners (the 2-min winning Short and "How MCP actually works" are clean Concept; the 1.2M "MCP vs API" is Comparison with a Concept middle). The gap we found (no winner shows one request end to end, one says the model is the client) is a mechanism gap, which the Concept sheet's `[ANIMATE]` steps fill; "vs API" gets one line inside "why a standard", not a beat sheet |
| **Tone (voice style)** | Curious and delighted, like revealing how a magic trick is done: a calm teaching read (~2.3–2.6 words/s), brisk on the three steps, slow on the reveal ("the model never calls anything") and on the catch. |
| Must include | the three moving parts (app/client, model, server); the mechanism shown on one request (list → choose → call → answer); why a standard beats custom glue; the honest catch (poisoned tool descriptions) and the fix (trusted servers, approve calls) |
| Running example | one question typed into an AI app: "Will it rain in Tokyo tomorrow?", answered through a weather server's `get_forecast` tool (illustrative, same message shape as the spec's own weather example [S13]) |
| Angle (one sentence) | Show the one thing every "USB-C for AI" video skips: the model never touches the tool; it reads a menu and writes a note, and the app does the calling. |
| Chosen hook | "An AI model can't check the weather. So how did it just tell you it's going to rain?" (hooks.md #1, 20/20; first frame: the answered chat + giant "IT CAN'T SEE THE WEATHER.") |
| Runtime target | ~124 s (336 words ÷ 2.7); a long Short at benchmark depth with re-hooks at ~15 / 57 / 96 s. The only winning Short runs 148 s at 3.08 w/s; the house benchmark runs 2–3 min at ~2.3 w/s |
| Open questions / unverified | The tool name `get_forecast`, its arguments and the rain answer are illustrative (labelled on screen). The adoption figure ("more than 10,000 public servers") is a company claim from Dec 2025. |

## Locks (must never appear)
- No logos (Anthropic, OpenAI, Google, Microsoft…): product names as plain text only, and only in one beat.
- No outdated protocol details (no `initialize` handshake, no sampling); stick to `tools/list` and `tools/call`, which are current in spec 2026-07-28.
- No working attack payload: the catch explains tool poisoning at a high level only.
- No sources on screen; the JSON "note" is marked "illustrative".
- No line from any watched video; no "USB-C" as the hook (it's every competitor's opener and the docs' own line).

## Chosen hook
**Pick:** #1 (20/20) because it starts from the foundation the viewer already knows (a model alone can't see live data),
opens a loop the whole video closes (how *did* it know?), and its first frame tells the story on mute. #2's surprise
("never touches it") moves to beat 4 as the first re-hook, so the hook stays its own paradox (concept archetype,
foundation-first rule). #7 echoes every competitor's framing and the docs' own line: rejected.

**First frame (described):** navy. A white chat card (mono 44 px) top-centre: "Will it rain in Tokyo tomorrow?", and
under it the AI's reply bubble "Yes, pack an umbrella." with a small ☂ glyph. Across the middle, giant Anton
"IT CAN'T SEE THE WEATHER." in yellow, with "CAN'T" underlined. Readable on mute in under a second.

**How the video pays it off:** steps 1–3 show exactly how the answer arrived (menu → note → call); beat 14 replays the
same reply bubble, now earned; the recap repeats "the model decides, the app does".

## Reel script · How MCP works

**Archetype:** Concept (standard "how X works" sheet, foundation-first opening, expanded to benchmark depth) · **Viewer's question:** "When an AI app 'uses an MCP server', what actually happens, and who really calls the tool?" · **Running example:** the question "Will it rain in Tokyo tomorrow?" answered through a weather server's `get_forecast` tool (illustrative)
**Tone:** curious and delighted, like showing how a magic trick is done; calm teaching read, brisk on the steps, slow on the twist and the catch · **Words:** 336 · **Est. runtime:** 124 s (÷2.7) · ~129 s at the benchmark's calmer read · **Winners' range:** the one winning Short 148 s at 3.08 w/s; long-form winners 2.3–2.6 w/s

_Rows = the Concept reel beat sheet: Hook → The example → Mechanism 1 → Mechanism 2 (+ the 3rd) → Why it matters to you → Takeaway → CTA, with the foundation-first opening (foundation → twist → the concept), the honest catch before the takeaway, and the benchmark's recap card. Three mechanism steps (the archetype's maximum). Beats over 6 s (#1, #6, #8, #14) name an internal visual change in the storyboard (long reel rule)._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–7 s | [curious] An AI model can't check the weather. [beat] So how did it just tell you it's going to rain? | 18 | `[TITLE]` | IT CAN'T SEE THE WEATHER. | [S6] |
| 2 | The example | 7–10 s | Here's the question. Will it rain in Tokyo tomorrow? | 9 | `[ANIMATE]` | Will it rain in Tokyo tomorrow? | — |
| 3 | Foundation | 10–15 s | On its own, a model has no live data. It can't see tomorrow. | 13 | `[ANIMATE]` | model alone · no live data | [S6] |
| 4 | Re-hook (the twist) | 15–20 s | [lean in] And here's the twist. The model never calls the weather service itself. Not once. | 14 | `[VERDICT]` | NEVER CALLS IT. | [S6] |
| 5 | The concept | 20–24 s | The app makes that call, using MCP. [slow down] The Model Context Protocol. | 11 | `[TITLE]` | MCP · Model Context Protocol | [S1] [S2] [S6] |
| 6 | The cast | 24–32 s | Three players. The app you type into. The model inside it. And an MCP server, a program that wraps a real tool. | 22 | `[ANIMATE]` | APP (host + MCP client) · MODEL · MCP SERVER | [S2] |
| 7 | Mechanism 1 · the menu | 32–37 s | Step one, the menu. [beat] The app asks the server: what can you do? | 13 | `[ANIMATE]` | STEP 1 OF 3 · 01 THE MENU | [S5] |
| 8 | Mechanism 1 · the menu | 37–47 s | The server sends back its tools, each with a description. Get forecast, which gets the weather for a city. It needs a city and a date. | 26 | `[CODE]` | get_forecast · gets the weather for a city · (city, date) | [S5] [S13] |
| 9 | Mechanism 1 · the menu | 47–52 s | The app slides that menu in front of the model, right next to your question. | 15 | `[ANIMATE]` | menu + question → model | [S5] |
| 10 | Mechanism 2 · the note | 52–57 s | Step two, the note. The model reads the menu and picks the forecast tool. | 14 | `[ANIMATE]` | STEP 2 OF 3 · 02 THE NOTE | [S6] |
| 11 | Mechanism 2 · the note | 57–63 s | [slow down] But it doesn't run it. It just writes a note. Get forecast, Tokyo, tomorrow. | 14 | `[CODE]` | { "name": "get_forecast", "arguments": { "city": "Tokyo", "date": "tomorrow" } } (illustrative) | [S6] |
| 12 | Mechanism 3 · the call | 63–68 s | Step three, the call. The app takes that note and sends it to the server. | 15 | `[ANIMATE]` | STEP 3 OF 3 · 03 THE CALL | [S6] |
| 13 | Mechanism 3 · the call | 68–73 s | The server asks the real weather service, then sends the result back. | 12 | `[ANIMATE]` | rain likely (illustrative) | [S6] |
| 14 | Mechanism 3 · the call | 73–79 s | The app hands it to the model, and the model finally answers you. [smile] Yes, pack an umbrella. | 17 | `[ANIMATE]` | Yes, pack an umbrella. | [S6] |
| 15 | Why it matters to you | 79–84 s | So why a standard? Before MCP, every app needed custom code for every tool. | 14 | `[VS]` | apps × tools = custom code | [S9] |
| 16 | Why it matters to you | 84–90 s | Now each tool needs one MCP server, and apps that speak MCP can plug it in. | 16 | `[ANIMATE]` | one server · many apps | [S9] [S10] |
| 17 | Why it matters to you | 90–97 s | Anthropic says ChatGPT, Gemini, Copilot and VS Code use it. The same post counted over 10,000 public MCP servers. | 19 | `[NUMBER]` | 10,000+ public servers | [S10] |
| 18 | The catch | 97–100 s | [slow down] Now, here's the catch. The model believes the menu. | 9 | `[VERDICT]` | THE MODEL BELIEVES THE MENU. | [S11] |
| 19 | The catch | 100–106 s | A bad server can hide instructions in a tool's description. You might not see them. | 15 | `[ANIMATE]` | hidden instructions in a description | [S11] [S12] |
| 20 | The catch | 106–110 s | [slow down] But the model reads them, and it may follow them. | 10 | `[ANIMATE]` | the model reads them | [S11] |
| 21 | Takeaway | 110–116 s | So install only servers you trust. And check what a tool will send before you approve it. | 17 | `[LIST]` | trusted servers · check before you approve | [S7] [S11] |
| 22 | Takeaway | 116–118 s | And never auto-approve every tool. | 5 | `[LIST]` | trusted servers · check before you approve · no 'allow all' | [S12] [S7] |
| 23 | Recap | 118–121 s | [warm] Menu. Note. Call. The model decides, and the app does. | 10 | `[RECAP]` | 01 MENU → 02 NOTE → 03 CALL | [S5] [S6] |
| 24 | CTA | 121–124 s | What should I explain next? Tell me below. | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** MCP (say "M-C-P", letter by letter), Model Context Protocol, get forecast (say "get forecast"; on screen `get_forecast`), Tokyo, Gemini, Copilot, VS Code (say "V-S Code"), Anthropic → `names`: MCP, Model Context Protocol, get_forecast, Tokyo, ChatGPT, Gemini, Copilot, VS Code, Anthropic

**Re-hooks (long Short):** #4 at ~15 s ("never calls the weather service itself"), #11 at ~57 s ("but it doesn't run it"), #18 at ~96 s ("here's the catch"): every 30–40 s.

**Accuracy notes:**
- "The app" = the host application with its MCP client inside (spec terms, S2). The voice says "the app"; the stage labels it "APP · host + MCP client" once, in #6. Wording follows content-plan.md (2026-10-12).
- The order "list → model selects → client calls → result back to the model" is the spec's own message flow (S5, S6). The model's "note" is the tool call it emits; the client sends `tools/call`.
- `get_forecast`, its arguments and the umbrella answer are **illustrative** (marked on screen); the message shape matches the spec's weather example (S13).
- "over 10,000 public servers" and the product list are company claims (Anthropic, Dec 2025), worded as "Anthropic says … The same post counted".
- The catch is described at a high level only (no payload), from Invariant Labs' disclosure (S11) and CSA's 2026 note (S12).

### Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

An AI model can't check the weather. So how did it just tell you it's going to rain?

Here's the question. Will it rain in Tokyo tomorrow?

On its own, a model has no live data. It can't see tomorrow.

And here's the twist. The model never calls the weather service itself. Not once.

The app makes that call, using MCP. The Model Context Protocol.

Three players. The app you type into. The model inside it. And an MCP server, a program that wraps a real tool.

Step one, the menu. The app asks the server: what can you do?

The server sends back its tools, each with a description. Get forecast, which gets the weather for a city. It needs a city and a date.

The app slides that menu in front of the model, right next to your question.

Step two, the note. The model reads the menu and picks the forecast tool.

But it doesn't run it. It just writes a note. Get forecast, Tokyo, tomorrow.

Step three, the call. The app takes that note and sends it to the server.

The server asks the real weather service, then sends the result back.

The app hands it to the model, and the model finally answers you. Yes, pack an umbrella.

So why a standard? Before MCP, every app needed custom code for every tool.

Now each tool needs one MCP server, and apps that speak MCP can plug it in.

Anthropic says ChatGPT, Gemini, Copilot and VS Code use it. The same post counted over 10,000 public MCP servers.

Now, here's the catch. The model believes the menu.

A bad server can hide instructions in a tool's description. You might not see them.

But the model reads them, and it may follow them.

So install only servers you trust. And check what a tool will send before you approve it.

And never auto-approve every tool.

Menu. Note. Call. The model decides, and the app does.

What should I explain next? Tell me below.

## Storyboard · How MCP works · reel · archetype: Concept (3 mechanism steps)

_One row per script beat. The relay desk (MODEL top · APP middle · SERVER bottom, hatched gap with no wire between MODEL and
SERVER) stays in the same positions from s04 to s14, so nothing jumps between scenes. Captions: engine's, 81–90 % height, left
grid; the stage never draws below y 1460; right 12 % clear. Step counter "STEP 0n / 03" (3 segments) is lit only s07–s14._

**Continuous spans:** A = s02–s03 (the question meets the model alone) · B = s04–s06 (the desk builds around the gap) ·
C = s07–s09 (step 1) · D = s10–s11 (step 2) · E = s12–s14 (step 3; ends on the hook's answered chat) · F = s15–s17 (grid → rail) ·
G = s18–s22 (the catch → protection). The question card is the running object from s02 to s14 and rides the recap chain.

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–7 s | An AI model can't check the weather. So how did it just tell you it's going to rain? | `[TITLE]` | dark | Frame 0 (never empty): navy; chat card with the question TYPED (mono 44 px, y 300) and the reply bubble "Yes, pack an umbrella." (y 520). On "weather" the headline SLAMS across y 800–1100 (Anton 170 px, yellow, "CAN'T" underlined); on "how" a yellow "?" STAMPS on the reply bubble | cold open (no fade) | IT CAN'T SEE THE WEATHER. | stamp, pop | none (sources in description) |
| 2 | 7–10 s | Here's the question. Will it rain in Tokyo tomorrow? | `[ANIMATE]` | blue | The chat SHRINKS AWAY; only the question card stays, re-centred (y 760), and TYPES OUT again letter by letter; "Tokyo" and "tomorrow" HIGHLIGHT in yellow as spoken | WIPE (dark → blue) | — | whoosh, typing ticks | none (sources in description) |
| 3 | 10–15 s | On its own, a model has no live data. It can't see tomorrow. | `[ANIMATE]` | blue | MODEL card BUILDS above the question (y 250–520); a shelf of grey "training data" chips FILLS inside it; a calendar strip DRAWS to a hard right edge; a "tomorrow" chip SLIDES toward it and BOUNCES OFF the edge (internal change at "can't see") | continuous | model alone · no live data | tick, thud | none (sources in description) |
| 4 | 15–20 s | And here's the twist. The model never calls the weather service itself. Not once. | `[VERDICT]` | dark | SERVER card + grey weather-service box BUILD at the bottom (y 1080–1440); camera PUSHES IN on the hatched empty gap between MODEL and SERVER; "NEVER CALLS IT." STAMPS into the gap on "never" | WIPE (blue → dark) | NEVER CALLS IT. | whoosh, stamp | none (sources in description) |
| 5 | 20–24 s | The app makes that call, using MCP. The Model Context Protocol. | `[TITLE]` | blue | APP card BUILDS in the middle (y 640–960); two lanes DRAW (APP↔MODEL, APP↔SERVER), no wire across the gap; "MCP" STAMPS on the lower lane; "Model Context Protocol" TYPES OUT under it | WIPE (dark → blue) | MCP · Model Context Protocol | whoosh, stamp | none (sources in description) |
| 6 | 24–32 s | Three players. The app you type into. The model inside it. And an MCP server, a program that wraps a real tool. | `[ANIMATE]` | blue | Each station PULSES on its word and its mono label POPS: "APP · host + MCP client", "MODEL", "MCP SERVER · wraps a tool"; on "tool" the weather box LIGHTS; the question card SLIDES into the APP card and parks (internal change per word, 8 s span) | continuous | APP (host + MCP client) · MODEL · MCP SERVER | tick ×3, pop | none (sources in description) |
| 7 | 32–37 s | Step one, the menu. The app asks the server: what can you do? | `[ANIMATE]` | light | Chapter card "STEP 1 OF 3 / 01 The menu" (numeral Inter 900, 330 px, ~1 s), then the desk returns on light; step counter "STEP 01 / 03" lights top-left; a `tools/list` chip ROUTES down the lower lane APP → SERVER on "asks" | WIPE + chapter card | STEP 1 OF 3 · 01 THE MENU | whoosh, send swoosh | none (sources in description) |
| 8 | 37–47 s | The server sends back its tools, each with a description. Get forecast, which gets the weather for a city. It needs a city and a date. | `[CODE]` | light | A menu card (white, 4 px ink border, "illustrative" tag) ROUTES up SERVER → APP with three mono rows `get_forecast` · `get_alerts` · `find_city`, each with a one-line grey description; on "description" the descriptions UNDERLINE; `get_forecast` reads "gets the weather for a city"; on "city" and "date" the `get_forecast` row EXPANDS to show two input chips `city` `date` (internal change, 7 s) | continuous | get_forecast · gets the weather for a city · (city, date) | pop, tick ×3 | none (sources in description) |
| 9 | 47–52 s | The app slides that menu in front of the model, right next to your question. | `[ANIMATE]` | light | Menu card + question card ROUTE up the upper lane together and land side by side inside MODEL; MODEL card glows its border once | continuous | menu + question → model | send swoosh, pop | none (sources in description) |
| 10 | 52–57 s | Step two, the note. The model reads the menu and picks the forecast tool. | `[ANIMATE]` | yellow | Chapter card "STEP 2 OF 3 / 02 The note"; counter 02 / 03; a scan line SCANS the menu inside MODEL on "reads"; on "picks" the other two rows fade and the menu SLICES to the one `get_forecast` row | WIPE + chapter card | STEP 2 OF 3 · 02 THE NOTE | whoosh, scan, click | none (sources in description) |
| 11 | 57–63 s | But it doesn't run it. It just writes a note. Get forecast, Tokyo, tomorrow. | `[CODE]` | yellow | A "run ▶" button on the row GREYS OUT with a ✕ on "doesn't"; a white note card TYPES OUT key by key: `{"name": "get_forecast", "arguments": {"city": "Tokyo", "date": "tomorrow"}}` (mono 40 px, wrapped inside x 120–960, "illustrative") | continuous | { "name": "get_forecast", "arguments": { "city": "Tokyo", "date": "tomorrow" } } (illustrative) | buzz (soft), typing ticks | none (sources in description) |
| 12 | 63–68 s | Step three, the call. The app takes that note and sends it to the server. | `[ANIMATE]` | blue | Chapter card "STEP 3 OF 3 / 03 The call"; counter 03 / 03; the note card ROUTES down MODEL → APP, a `tools/call` tag STAMPS on it, then it ROUTES down APP → SERVER (never across the gap) | WIPE + chapter card | STEP 3 OF 3 · 03 THE CALL | whoosh, stamp, send swoosh | none (sources in description) |
| 13 | 68–73 s | The server asks the real weather service, then sends the result back. | `[ANIMATE]` | blue | SERVER pings the weather box: a pulse RUNS down and back; a result chip "rain likely · illustrative" POPS out of SERVER and ROUTES up to APP | continuous | rain likely (illustrative) | ping, send swoosh | none (sources in description) |
| 14 | 73–79 s | The app hands it to the model, and the model finally answers you. Yes, pack an umbrella. | `[ANIMATE]` | blue | The result ROUTES up to MODEL; MODEL's border FLASHES; under the question card the reply bubble "Yes, pack an umbrella." BUILDS WORD BY WORD (the hook's frame, now earned); step counter fades out | continuous | Yes, pack an umbrella. | pop, chime | none (sources in description) |
| 15 | 79–84 s | So why a standard? Before MCP, every app needed custom code for every tool. | `[VS]` | light | The desk SHRINKS AWAY to a corner chip; a 4×4 grid (4 generic app chips as rows × 4 tool chips as columns) BUILDS; on "every … every" all 16 cells FILL one by one with red "custom code" tiles | WIPE (blue → light) | apps × tools = custom code | whoosh, tick ×16 (fast) | none (sources in description) |
| 16 | 84–90 s | Now each tool needs one MCP server, and apps that speak MCP can plug it in. | `[ANIMATE]` | light | On "Now" the 16 tiles COLLAPSE; each tool gets one "MCP" plug; one line per app RACES to a single shared MCP rail (8 connections instead of 16) | continuous | one server · many apps | whoosh (reverse), click ×4 | none (sources in description) |
| 17 | 90–97 s | Anthropic says ChatGPT, Gemini, Copilot and VS Code use it. The same post counted over 10,000 public MCP servers. | `[NUMBER]` | light | Four plain-text mono chips POP onto the rail in order: ChatGPT · Gemini · Copilot · VS Code (no logos); "10,000+" COUNTS UP (Anton 280 px) on "10,000" with "public MCP servers" under it; hidden until counted | cut | 10,000+ public servers | pop ×4, ding | none (sources in description) |
| 18 | 97–100 s | Now, here's the catch. The model believes the menu. | `[VERDICT]` | dark | The step-1 menu card DROPS back in, centred; "THE MODEL BELIEVES THE MENU." STAMPS (Anton 150 px, yellow) on "believes" | WIPE (light → dark) | THE MODEL BELIEVES THE MENU. | whoosh, stamp | none (sources in description) |
| 19 | 100–106 s | A bad server can hide instructions in a tool's description. You might not see them. | `[ANIMATE]` | dark | Inside one menu row's grey description a hatched, redacted line SLIDES in (deliberately unreadable); on "see" a user-view panel beside it shows the same row truncated ("get_forecast · gets the weather…"), the hidden line cut off | continuous | hidden instructions in a description | glitch tick | none (sources in description) |
| 20 | 106–110 s | But the model reads them, and it may follow them. | `[ANIMATE]` | dark | On "reads" a scan line SCANS the full description inside a mini MODEL card; on "follow" a thin red arrow DRAWS from the hidden line into the MODEL, which TINTS red | continuous | the model reads them | scan, low hit | none (sources in description) |
| 21 | 110–116 s | So install only servers you trust. And check what a tool will send before you approve it. | `[LIST]` | dark | Two rows BUILD: "✓ install servers you trust" (on "trust") and a call preview card showing `get_forecast · city: Tokyo · date: tomorrow` with an "Approve" button that PULSES on "approve" | continuous | trusted servers · check before you approve | pop, click | none (sources in description) |
| 22 | 116–118 s | And never auto-approve every tool. | `[LIST]` | dark | A third row BUILDS: an "Allow all tools" toggle that STAYS OFF and gets a ✕ STAMP on "every" | continuous | trusted servers · check before you approve · no 'allow all' | stamp | none (sources in description) |
| 23 | 118–121 s | Menu. Note. Call. The model decides, and the app does. | `[RECAP]` | yellow | Recap chain BUILDS on each word: "01 MENU" → "02 NOTE" → "03 CALL", connectors DRAW between them, the mini question card RIDES along the chain; "the model decides · the app does" STAMPS under it | WIPE (dark → yellow) | 01 MENU → 02 NOTE → 03 CALL | whoosh, pop ×3, stamp | none (sources in description) |
| 24 | 121–124 s | What should I explain next? Tell me below. | `[CTA]` | dark | "What should I explain next?" BUILDS WORD BY WORD (Anton 130 px); "Follow for more AI breakdowns" pill SLIDES UP; last frame navy like frame 0 (loop) | WIPE (yellow → dark) | What should I explain next? | pop | none (sources in description) |

_Every visual change lands on a spoken word (word cues in animation-plan.md); no beat holds a still frame longer than ~2.5 s. Mock JSON and the result chip carry "illustrative". Music: `inventing-flight`, ducked under the voice._

## Publish kit · How MCP works

_Title patterns that reached (evidence, not wording): the winners put the viewer's question or "explained" plus a time box in
the title ("…in 2 minutes", "how … actually works"). Ours leads with the reveal instead, then the question._

### Titles (pick 1)
1. **The AI never touches the tool: how MCP actually works** (recommended)
2. How MCP Works in 2 Minutes: One Question, End to End
3. What Really Happens When AI "Uses" an MCP Server

### Thumbnail concept (≤4 words of text)
Navy frame, the relay desk: MODEL card on top, SERVER card at the bottom, a hatched empty gap between them with a big yellow
✕ over where a wire would be. Text: **"IT NEVER CALLS IT"** (4 words) in Anton, yellow. No logos, no faces.

### Caption / description
An AI model can't see tomorrow's weather, yet it just told you to pack an umbrella. Here's how MCP (Model Context Protocol)
made that happen, step by step: the app gets a menu of tools from an MCP server, the model picks one and writes a note,
and the app makes the call. The model never touches the tool. Plus the catch: the model believes the menu, so only
install servers you trust, check what a tool will send before you approve it, and never auto-approve every tool.

The weather tool, its arguments and the answer are illustrative; the message flow is the real one from the MCP spec.

What should I explain next? Tell me in the comments.

### Chapters (long-form)
n/a (reel). Loose timeline for the description if wanted: 0:00 the paradox · 0:20 what MCP is · 0:32 step 1 the menu · 0:52 step 2 the note · 1:02 step 3 the call · 1:19 why a standard · 1:36 the catch · 1:57 recap

### Sources (for the description / pinned comment)
- [S1] What is MCP? (official docs): https://modelcontextprotocol.io/docs/getting-started/intro
- [S2–S5] MCP architecture overview, spec 2026-07-28 (host, client, server; JSON-RPC; tools/list): https://modelcontextprotocol.io/docs/learn/architecture
- [S5–S7, S13] MCP spec, Tools (tools/list, tools/call, message flow, human in the loop): https://modelcontextprotocol.io/specification/latest/server/tools
- [S9] Anthropic, Introducing the Model Context Protocol (2024-11-25): https://www.anthropic.com/news/model-context-protocol
- [S10] Anthropic, Donating MCP and establishing the Agentic AI Foundation (2025-12-09): https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- [S11] Invariant Labs, MCP Security Notification: Tool Poisoning Attacks (2025-04-01): https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- [S12] Cloud Security Alliance, research note on MCP tool-description poisoning (2026-07-11): https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-tool-description-poisoning-20260711-cs/

### Hashtags
#MCP #ModelContextProtocol #AIAgents #LLM #GenAI #AIExplained #Shorts

### Pinned comment (invites replies)
Menu → note → call. The model decides, the app does. 🧩
Which MCP server would you plug into your AI first: your calendar, your codebase, or your notes? And what should I explain next?
(Sources are in the description.)

### Repurposing (long-form moments → reels)
- The catch (s18–s22) works alone as a 20 s Risk short: "Your AI believes every tool menu it reads."
- Steps 1–3 (s07–s14) as a silent loop / GIF for a carousel: "menu → note → call".
- The 16-tiles-to-one-rail grid (s15–s16) as a 15 s "why MCP exists" clip.
- A future explainer: add resources and prompts, remote vs local servers, and tool approvals in a real client.

