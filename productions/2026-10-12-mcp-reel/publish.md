# Publish kit · How MCP works

_Title patterns that reached (evidence, not wording): the winners put the viewer's question or "explained" plus a time box in
the title ("…in 2 minutes", "how … actually works"). Ours leads with the reveal instead, then the question._

## Titles (pick 1)
1. **The AI never touches the tool: how MCP actually works** (recommended)
2. How MCP Works in 2 Minutes: One Question, End to End
3. What Really Happens When AI "Uses" an MCP Server

## Thumbnail concept (≤4 words of text)
Navy frame, the relay desk: MODEL card on top, SERVER card at the bottom, a hatched empty gap between them with a big yellow
✕ over where a wire would be. Text: **"IT NEVER CALLS IT"** (4 words) in Anton, yellow. No logos, no faces.

## Caption / description
An AI model can't see tomorrow's weather, yet it just told you to pack an umbrella. Here's how MCP (Model Context Protocol)
made that happen, step by step: the app gets a menu of tools from an MCP server, the model picks one and writes a note,
and the app makes the call. The model never touches the tool. Plus the catch: the model believes the menu, so only
install servers you trust, check what a tool will send before you approve it, and never auto-approve every tool.

The weather tool, its arguments and the answer are illustrative; the message flow is the real one from the MCP spec.

What should I explain next? Tell me in the comments.

## Chapters (long-form)
n/a (reel). Loose timeline for the description if wanted: 0:00 the paradox · 0:20 what MCP is · 0:32 step 1 the menu · 0:52 step 2 the note · 1:02 step 3 the call · 1:19 why a standard · 1:36 the catch · 1:57 recap

## Sources (for the description / pinned comment)
- [S1] What is MCP? (official docs): https://modelcontextprotocol.io/docs/getting-started/intro
- [S2–S5] MCP architecture overview, spec 2026-07-28 (host, client, server; JSON-RPC; tools/list): https://modelcontextprotocol.io/docs/learn/architecture
- [S5–S7, S13] MCP spec, Tools (tools/list, tools/call, message flow, human in the loop): https://modelcontextprotocol.io/specification/latest/server/tools
- [S9] Anthropic, Introducing the Model Context Protocol (2024-11-25): https://www.anthropic.com/news/model-context-protocol
- [S10] Anthropic, Donating MCP and establishing the Agentic AI Foundation (2025-12-09): https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- [S11] Invariant Labs, MCP Security Notification: Tool Poisoning Attacks (2025-04-01): https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- [S12] Cloud Security Alliance, research note on MCP tool-description poisoning (2026-07-11): https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-tool-description-poisoning-20260711-cs/

## Hashtags
#MCP #ModelContextProtocol #AIAgents #LLM #GenAI #AIExplained #Shorts

## Pinned comment (invites replies)
Menu → note → call. The model decides, the app does. 🧩
Which MCP server would you plug into your AI first: your calendar, your codebase, or your notes? And what should I explain next?
(Sources are in the description.)

## Repurposing (long-form moments → reels)
- The catch (s18–s22) works alone as a 20 s Risk short: "Your AI believes every tool menu it reads."
- Steps 1–3 (s07–s14) as a silent loop / GIF for a carousel: "menu → note → call".
- The 16-tiles-to-one-rail grid (s15–s16) as a 15 s "why MCP exists" clip.
- A future explainer: add resources and prompts, remote vs local servers, and tool approvals in a real client.
