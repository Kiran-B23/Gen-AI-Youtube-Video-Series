# Content plan · How MCP works

_Written by the `content-plan` agent after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file. Planned from brief.md / research.md / inspiration.md / hooks.md
(not from the existing script-reel.md). Official sources re-read on 2026-10-12: spec tools page and architecture page
(spec 2026-07-28), Anthropic's Dec 2025 adoption post, Invariant Labs' disclosure, CSA's July 2026 note._

## Viewer's question
"When an AI app 'uses an MCP server', what actually happens, and who really calls the tool?"

## Core message
With MCP, the model only picks a tool from a menu and writes a request; the app makes the call.

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **The cast.** The AI app (the host) runs one MCP client per server; an MCP server is a program that wraps a real tool or service. The model sits inside the app and is *not* an MCP participant. Said as "the app", labelled once on stage as "app = host + MCP client". | S2 | official docs |
| 2 | **Step 1, the menu.** The app's client sends `tools/list`; the server answers with each tool's `name`, `description` and `inputSchema` (the arguments it needs). The app merges every server's tools into one registry the model can see, next to your question. Show the **description** line on the menu card: the catch (point 6) depends on it. | S5, S13 | official docs |
| 3 | **Step 2, the note.** The model reads the menu and *selects* a tool, writing a tool call (tool name + arguments). It doesn't run anything. On screen the note mirrors the real shape: `name` + `arguments` (illustrative values). | S6, S13 | official docs |
| 4 | **Step 3, the call.** The app "intercepts the tool call, routes it to the appropriate MCP server, executes it, and returns the results back to the LLM"; the client sends `tools/call`, the server returns `content`, and the model then answers the user. | S6 | official docs |
| 5 | **Why a standard (the viewer's "so what").** Before MCP, every new data source needed its own custom integration; with MCP a tool is wrapped once as a server and apps that speak MCP can use it. Anthropic says ChatGPT, Cursor, Gemini, Microsoft Copilot and VS Code adopted it, and counted 10,000+ active public servers (Dec 2025). This is what the viewer can *decide*: build or install one server instead of one integration per app. | S9, S10 | company claim |
| 6 | **The catch (material).** The model reads tool descriptions as part of its instructions, and the user may not see them in full; a poisoned description made an agent read and leak private files (SSH key, MCP config) in a proof of concept, and the attack class is still reported in 2026. Action: install only servers you trust, look at what a tool call is about to send before approving it, and don't switch on blanket "allow all tools". | S11, S12 (independent); S7 (official docs) | independent + official docs |

## Leave out
| Item | Why it's out |
|---|---|
| "USB-C port for AI" analogy | Every competitor opens with it and it is the docs' own line (brief lock); it hides the mechanism this video exists to show. Not about the core message. |
| Resources and prompts (the other two primitives, S4) | True, but a third/fourth kind of menu item adds load without changing the core message; tools carry the whole story. Explainer material. |
| JSON-RPC 2.0, stdio vs Streamable HTTP, `_meta`, `server/discover`, caching TTLs (S3) | Plumbing that doesn't change what the viewer understands; `server/discover` is new in spec 2026-07-28 and risks dating fast. The note can *look* like JSON on screen without naming JSON-RPC. |
| The old `initialize` handshake, sampling | Outdated/deprecated as of spec 2026-07-28 (brief lock). |
| `notifications/tools/list_changed` (S8) | Not about the core message. |
| Launch date (Nov 2024), Linux Foundation / Agentic AI Foundation donation, 97M SDK downloads | Trivia for "how it works". |
| Context cost of connecting many servers ("progressive tool discovery") | A real cost but only bites at many servers; needs a longer caveat than a reel beat. Explainer. |
| MCPTox 36.5% average attack success rate, the postmark-mcp incident (~300 orgs) (via S12) | Strong, but a single benchmark / single report relayed by one note; the caveat (configurations, models) is longer than the claim. The qualitative risk (S11, S12) is enough. |
| Any working attack payload | Brief lock: high level only. |
| "MCP vs API" as its own section | Competitors' search intent, not our question; the "why a standard" point covers it in one line. |
| Calling out the competitor who says "the model is the client" | Rival content, not the viewer's question; we simply show it right. |
| The waiter analogy | Adds a second world; the running note is enough (research.md). |

## Catch decision
**Catch:** include
**Why:** material and sourced: installing an MCP server puts text the user may never read into the model's instructions, and a poisoned description has exfiltrated private files (Invariant Labs PoC on Cursor, S11; still listed as a live path by CSA in July 2026, S12); the spec itself says tool annotations from untrusted servers must be treated as untrusted and a human should be able to deny calls (S7). It changes how the viewer uses MCP (which servers they install, whether they approve blindly), and the "plug anything in" hype hides it. Exact point: "A tool's description goes straight to the model, and you might not see it; a bad server can hide instructions there, so install servers you trust and check calls before you approve them."

## Running example
The question "Will it rain in Tokyo tomorrow?", answered through a weather server's `get_forecast` tool (city + date; illustrative, mirroring the spec's own `get_weather` example, S13). It works because everyone knows a model can't know tomorrow's weather, so the need for a tool is self-evident, and it maps one-to-one onto the real message flow (menu → note → call → answer). The same question card stays on screen from the example beat to the final answer and the recap; the menu card from step 1 returns in the catch (the menu is what gets poisoned).

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "An AI model can't check the weather" (hook) | Tools "enable the LLM to access real-time data"; without them it has none. Safe as long as it's "the model on its own". | "An AI model can't check the weather. So how did it just tell you it's going to rain?" (safe) | S6 (architecture page) |
| "A model only knows what it learned in training" | Overstated: it also sees your message and anything the app adds. | "On its own, a model has no live data. It can't see tomorrow." | S6 |
| "The model never touches the weather service. Not once." | Spec flow: the client sends `tools/call`; the app executes and returns results. The model never contacts the server; the result does reach it. | "The model never calls the weather service itself. Not once." ("touches" acceptable; "calls/contacts" is more exact) | S6 |
| "It can't run it" (the note) | The model selects; the app executes. Under MCP the model doesn't execute. | "But it doesn't run it. It just writes a note." | S6 |
| "the model only picks / only writes a request" (core) | "LLM → Client: Select tool to use"; app "intercepts the tool call … executes it". Safe. | as written in the core message | S6 |
| "a small program that wraps a tool" | Spec: "A program that provides context to MCP clients"; servers can be large remote services. "small" unsupported. | "an MCP server, a program that wraps a real tool" | S2 |
| "any app that speaks MCP can use it" / "works everywhere" | Standard for connecting AI apps to external systems; support for transports/features varies by app. | "and apps that speak MCP can plug it in" | S1, S9 |
| "every app needed custom code for every tool" | "Every new data source requires its own custom implementation" (company claim). | "Before MCP, each new tool needed its own custom code." (or keep "every app … every tool" as framing; it's the launch post's own argument) | S9 |
| "ChatGPT, Gemini, Copilot and VS Code all speak it" | "MCP has been adopted by ChatGPT, Cursor, Gemini, Microsoft Copilot, Visual Studio Code…" (Anthropic, company claim). | "Anthropic says ChatGPT, Gemini, Copilot and VS Code use it" (attribution before the claim) | S10 |
| "over 10,000 servers" | "more than 10,000 active public MCP servers" as of 2025-12-09. | "Anthropic counted over 10,000 public servers." (past tense; no date needed on screen) | S10 |
| "The model believes the menu" / "always follows" | Models *may* follow poisoned descriptions; not always (CSA reports partial success rates). | "The model trusts the menu" + "and the model may follow them" (never "will" / "always") | S11, S12 |
| "invisible to you" / "you'll never see it" | Invariant: instructions "invisible to users but visible to AI models" in the tested UI; UIs differ. | "You might not see it. The model does." | S11 |
| "approvals keep you safe" / "keep approvals on and you're fine" | Spec: a human SHOULD be able to deny calls and clients SHOULD show inputs; Invariant found a confirmation dialog that hid the real inputs; CSA: drop blanket "allow all". Approvals help, they don't guarantee. | "install only servers you trust, and check what a tool's about to send before you approve it" | S7, S11, S12 |
| "MCP is free / open" | "open-source standard". | "an open standard" (avoid "free") | S1 |
| "first" / "the only way" / "the best" | Not supported. | don't use | — |

## Depth (what the viewer must see, not just hear)
- **The menu lands in the model's view:** the server's tool card (name, one-line description, the city/date slots) slides out of the server, through the app, and sits next to the question in front of the model (`tools/list` → registry).
- **The model's hand stops short:** the model writes a note (`name: get_forecast`, `arguments: Tokyo, tomorrow`) and *hands it to the app*; no line ever connects the model to the server.
- **The round trip:** the app carries the note to the server, the server fetches the forecast, the result rides back through the app to the model, and the question card's reply fills in "Yes, pack an umbrella." The same path, drawn once, is the recap.
- **The poisoned line (catch):** the step-1 menu card returns with a hidden line inside the description that the model's view shows and the user's view truncates; high level only, no payload.

## Departures in the existing script-reel.md (for the scriptwriter to fix)
| Beat | Now | Change to |
|---|---|---|
| 1 | Source column `[S1]` | `[S6]` (S1 doesn't support "can't check the weather"; the architecture page's "access real-time data" line does). Line is fine. |
| 3 | "a model only knows what it learned in training" | Overstated (it also sees your message). "On its own, a model has no live data. It can't see tomorrow." `[S6]` |
| 4 | "never touches the weather service" | Acceptable; tighter: "never calls the weather service itself. Not once." `[S6]` |
| 5 | "The app around it does that, using MCP." ("does that" = touches the service; really the server does, the app calls it) | "The app makes that call, using MCP." |
| 6 | "a small program that wraps a real tool" | Drop "small": "an MCP server, a program that wraps a real tool." `[S2]` |
| 8 | Menu shows only name + arguments | Show and say the **description** too, so the catch pays off: e.g. "The server sends back its tools. Like get forecast: gets the weather for a city. It needs a city and a date." `[S5] [S13]` |
| 11 | On-screen `{ tool: get_forecast, city: Tokyo, date: tomorrow }`; "But it can't run it." | Mirror the real shape: `{ "name": "get_forecast", "arguments": { "city": "Tokyo", "date": "tomorrow" } }` (illustrative); spoken "But it doesn't run it. It just writes a note." `[S6] [S13]` |
| 16 | "any app that speaks MCP can use it" | "apps that speak MCP can plug it in" `[S9] [S10]` |
| 17 | "ChatGPT, Gemini, Copilot and VS Code all speak it. Anthropic counts over 10,000 public servers." | Attribution first, past tense: "Anthropic says ChatGPT, Gemini, Copilot and VS Code use it, and it counted over 10,000 public servers." `[S10]` |
| 18 | "The model believes the menu." | Keep, or "The model trusts the menu." Fine because #19 says "may". |
| 19 | "A bad server can hide instructions in a tool's description, and the model may follow them." | Add the part that makes it material (the user may not see it): "A bad server can hide instructions in a tool's description. You might not see them. The model reads them, and may follow them." (split into two beats if over ~14 words/6 s) `[S11] [S12]` |
| 20 | "keep tool approvals switched on" | Approvals alone aren't a guarantee (S11 dialog hid inputs): "So install only servers you trust, and check what a tool's about to send before you approve it." `[S7] [S11] [S12]` |
| Read-aloud | — | Update the read-aloud to match every table change (lint requires ≥ 97% match). |

No departures on: running example, three steps, the hook, the "why a standard" beat (15), the catch decision (include), the recap (21) and the generic CTA (22).

## Status
- [x] Content plan ready (2026-10-12)
