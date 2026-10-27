# Reel script · How MCP works

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

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

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
