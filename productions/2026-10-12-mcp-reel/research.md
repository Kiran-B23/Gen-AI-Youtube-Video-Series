# Research · How MCP works

_Researched on 2026-10-12. Labels: company claim · independent · our test · community. The spec moves fast: the
current version is **2026-07-28** (stateless; `server/discover` replaced the old `initialize` handshake), so we avoid
handshake details that older videos teach and that are now out of date._

## One-line definition (by what it does)
MCP (Model Context Protocol, say "M-C-P") is an open standard that lets any AI app plug into any outside tool or data
source the same way: the app asks a server what tools it has, the model picks one, and the app makes the call. [S1] [S2]

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | "MCP is an open-source standard for connecting AI applications to external systems." Docs' own analogy: "like a USB-C port for AI applications". | https://modelcontextprotocol.io/docs/getting-started/intro | live docs, read 2026-10-12 | company claim (spec owner) | the plain definition; the analogy everyone already uses (we name it only to move past it) | reel |
| S2 | Three participants: the **host** (the AI app, e.g. Claude Desktop, VS Code) creates one **client** per **server**; each client keeps a dedicated connection to its server. Servers can be local (stdio) or remote (Streamable HTTP). | https://modelcontextprotocol.io/docs/learn/architecture | spec 2026-07-28 | company claim (spec) | who does what: the cast of the animation | reel |
| S3 | Messages are **JSON-RPC 2.0**; the same message format runs over both transports. | https://modelcontextprotocol.io/docs/learn/architecture | spec 2026-07-28 | company claim (spec) | the "note" the client sends is plain JSON: shows it's ordinary software, not magic | reel |
| S4 | Servers expose three primitives: **tools** (actions), **resources** (data), **prompts** (templates). Each has `*/list` to discover it; tools also have `tools/call`. | https://modelcontextprotocol.io/docs/learn/architecture | spec 2026-07-28 | company claim (spec) | the menu has three kinds of items; we focus on tools | reel (one line) |
| S5 | **Discovery:** the client sends `tools/list`; the server answers with each tool's `name`, `description` and `inputSchema` (the arguments it needs). The app merges every server's tools into one registry **the language model can see**. | https://modelcontextprotocol.io/docs/learn/architecture ; https://modelcontextprotocol.io/specification/latest/server/tools | spec 2026-07-28 | company claim (spec) | step 1: the model learns what exists by reading a menu of descriptions | reel |
| S6 | **Selection + invocation:** the LLM selects a tool; the **client** sends `tools/call` with `name` + `arguments`; the server returns `content`; the client hands the result back to the LLM. ("When the language model decides to use a tool… the AI application intercepts the tool call, routes it to the appropriate MCP server, executes it, and returns the results back to the LLM.") | spec tools page "Message Flow"; architecture page | spec 2026-07-28 | company claim (spec) | steps 2–3, and the hook: the model only *asks*; the app makes the call | reel |
| S7 | Tools are "model-controlled", but "there SHOULD always be a human in the loop with the ability to deny tool invocations"; clients SHOULD show tool inputs before calling and ask for confirmation on sensitive operations. | https://modelcontextprotocol.io/specification/latest/server/tools | spec 2026-07-28 | company claim (spec) | the protection: approve calls, read what's about to run | reel (catch fix) |
| S8 | Servers can tell clients their tool list changed (`notifications/tools/list_changed`) | spec tools page | spec 2026-07-28 | company claim | tools can appear later without re-coding the app | explainer / cut |
| S9 | Anthropic's launch post: "Every new data source requires its own custom implementation"; MCP replaces "fragmented integrations with a single protocol". | https://www.anthropic.com/news/model-context-protocol | 2024-11-25 | company claim | the "why it exists": before MCP every app × every tool needed custom glue | reel |
| S10 | MCP "has been adopted by ChatGPT, Cursor, Gemini, Microsoft Copilot, Visual Studio Code"; "more than 10,000 active public MCP servers"; "97M+ monthly SDK downloads". Donated to the Agentic AI Foundation (Linux Foundation). | https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation | 2025-12-09 | company claim | it's not one company's plug: rival apps use it, so a server you build works in all of them | reel ("10,000" + rival apps) |
| S11 | **Tool poisoning:** hidden instructions inside a tool's *description* (which the model reads but the user's UI may truncate) made an agent read and leak private files in Invariant Labs' proof of concept against Cursor. Mitigations: show full tool descriptions, pin server versions, limit data flow between servers. | https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks | 2025-04-01 | independent (security research) | the honest catch: the menu itself can lie; only install servers you trust | reel |
| S12 | Cloud Security Alliance research notes (July 2026) still list poisoned tool descriptions as a live exfiltration path. | https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-tool-description-poisoning-20260711-cs/ | 2026-07-11 | independent | the catch is current, not a 2025 footnote | reel (supports S11) |
| S13 | Example tool definition shape (`get_weather`, `location`) and `tools/call` request/response in the spec | spec tools page | spec 2026-07-28 | company claim | our running example uses the same real message shape | reel (illustrative JSON) |

## Running-example candidates
1. **"Will it rain in Tokyo tomorrow?"** typed into a chat app, answered via a weather server's `get_forecast` tool. ✅ chosen:
   everyone knows the model can't *know* tomorrow's weather, so the need for a tool is obvious; the real spec uses a
   weather tool, so our illustrative JSON mirrors the true message shape (S13). Our tool name `get_forecast` and the
   answer are illustrative and labelled so.
2. "Which issues are assigned to me?" via a code-host server: good for devs, but needs a brand name.
3. "Book a table for two" : an action with side effects, better for the explainer's human-in-the-loop section.

## Analogy candidates
- USB-C (the docs' own, S1): accurate for "one standard plug", but every MCP video uses it. Mention once, then show the
  mechanism the analogy hides (the menu → the note → the call).
- **A waiter with a menu** (ours): the model reads the menu (tools/list), writes an order slip (tool call), the waiter
  (client) takes it to the kitchen (server). Accurate, but adds a second world; **cut** for the reel: the running object
  is the JSON note itself, drawn as tech.

## The catch (limitations, risks, costs)
- The model trusts whatever a tool description says: poisoned descriptions (S11, S12). Fix: install trusted servers only,
  read the tool's full description, keep "ask before running" on (S7).
- Every tool's description sits in the model's context, so connecting many servers costs context (spec mentions
  "progressive tool discovery" for clients with many servers, S5 page). Explainer only.

## Alternatives / competitors
- Plain function calling (each app defines its own tools): MCP standardises the discovery and the call across apps.
- Agent "skills", CLIs: covered by the winners' "vs" videos; out of scope for "how it works".

## Viewer questions to answer
- Does the AI run the tool itself? (No: it writes the request; the app runs it. S6)
- Why not just an API? (An API is one service's door; MCP is one way for any AI app to find and use any door. S9)
- Is it only for Claude? (No: ChatGPT, Gemini, Copilot, VS Code, Cursor use it. S10)
- Is it safe? (Only as safe as the servers you install; approve calls. S7, S11)

## Cut by the viewer-value filter (and why)
- Launch date (Nov 2024), the Linux Foundation donation date, SDK download counts: trivia for "how it works".
- Transport details (stdio vs Streamable HTTP), `_meta` fields, `server/discover`, caching TTLs: true but don't change
  what the viewer understands in a reel.
- Sampling / elicitation / notifications: explainer material.
