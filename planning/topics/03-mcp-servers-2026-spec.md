# 3. MCP servers on the 2026-07-28 spec

> **Rank:** 3 of 11 · **Difficulty:** Intermediate · **YouTube upside:** High · **Build time:** 1–3 days

## 1. Overview
The Model Context Protocol (MCP) is the standard way to connect models to tools and data. Anthropic donated it to the Linux Foundation's Agentic AI Foundation (AAIF) in December 2025. The MCP Blog reported "over 97 million monthly SDK downloads" and 10,000 active servers at that point, with client support in ChatGPT, Claude, Cursor, Gemini, Copilot, and VS Code. The **2026-07-28 spec** (RC locked May 21; final July 28) is the largest revision since launch. It removes the `initialize` handshake and `Mcp-Session-Id` to create a stateless core, adds Multi Round-Trip Requests (`input_required`), `Mcp-Method`/`Mcp-Name` routing headers, cacheable list results (`ttlMs`), a formal Extensions framework (MCP Apps for server-rendered UI, Tasks as `io.modelcontextprotocol/tasks`), and hardened OAuth (RFC 9207 issuer validation, CIMD instead of DCR). Caveat: it is **not fully backward-compatible** with older stateful servers. Roots, Sampling, Logging, legacy HTTP+SSE, and DCR are deprecated, with a 12-month offramp.

## 2. Why it attracts subscribers
- **Audience:** Developers who have shipped (or want to ship) MCP servers for Claude, Cursor, ChatGPT, or VS Code. That includes platform and infra engineers who care about load balancers, serverless, and OAuth, plus TS devs using AI SDK.
- **Competition gap:** The spec-change explainers are already out (Theo, Kent C. Dodds, Better Stack, Devsplainers, AAIF Live, Michael Levan). MCP Apps demos exist too (ZazenCodes, Den Delimarsky, GitHub at AI Engineer). Most Cloudflare/remote-server and OAuth tutorials date from 2025, before the stateless spec. **Nobody combines** a hands-on migration of a real stateful server, a stateless deploy behind a load balancer or serverless, OAuth with CIMD, and an MCP App UI in one build that's tested across multiple clients.
- **Winning angle:** "I migrated my MCP server to 2026-07-28, and here's everything that broke." Show the diff, kill workers mid-session to prove statelessness, then add an MCP App UI and use the same server from Claude, Cursor, and an AI SDK 7 agent.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | Migrating My MCP Server to the 2026-07-28 Spec (Everything That Broke) | Migration guide | 18–25 min |
| 2 | Stateless, OAuth-Protected MCP Server + MCP App UI on Cloudflare Workers | Full build | 30–40 min |
| 3 | I Round-Robined My MCP Server Across 3 Workers and Killed Them Mid-Call | I tried to break it | 10–14 min |
| 4 | Cloudflare Workers vs Vercel for MCP: Cold Start, Latency, Cost | X vs Y benchmark | 12–18 min |
| 5 | MCP Went Stateless: What Changed in 60 Seconds | Explainer short | <60 s |

**Thumbnail / hook:** A crossed-out `Mcp-Session-Id` header next to a green "3 workers, 0 sessions" badge, with an inline dashboard (MCP App) rendered inside a Claude chat bubble. Hook line (first 15 s): *"On July 28th, MCP deleted its handshake and its session ID. If your server depends on either, it's on a one-year clock. I migrated mine live. Here's every break, and the MCP App UI I got out of it."*

## 4. Project build plan
**Project:** *"Build a stateless, OAuth-protected MCP server with an MCP App UI for your own Notion/GitHub/Postgres data."* Deploy it to Cloudflare Workers or Vercel, then use it from Claude, Cursor, and an AI SDK 7 agent.
**Stack:** `@modelcontextprotocol/server` v2 (TS) or `mcp` 2.x (Python); `@modelcontextprotocol/ext-apps` for the UI; Cloudflare Workers + `@cloudflare/workers-oauth-provider` (or Vercel + `mcp-handler` 2.x); GitHub OAuth; Postgres (Neon/Supabase) or the GitHub API as the data source; MCP Inspector; `@ai-sdk/mcp` + `ai@7` client.
**Steps:**
1. **Record the "before" state.** Start from a v1 SDK (`@modelcontextprotocol/sdk` 1.x) stateful server with 3 tools (e.g. `list_issues`, `query_db`, `summarize_repo`). Record how it uses sessions and SSE.
2. **Upgrade to the v2 SDK.** Read the [changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog). Remove `Mcp-Session-Id` assumptions and replace any in-memory session state with explicit handles (IDs passed in tool args, with state stored in KV or Postgres).
3. **Replace server-initiated streams** for elicitation with Multi Round-Trip Requests (`resultType: "input_required"`), e.g. a "confirm before writing" step.
4. **Add `ttlMs`/`cacheScope`** to list results and confirm the `Mcp-Method`/`Mcp-Name` headers are emitted.
5. **Add OAuth.** Use GitHub OAuth through `workers-oauth-provider`, with issuer validation and CIMD-style client registration per the new authorization section. Scope tools per user.
6. **Build the MCP App.** Add a `ui://` resource (an issues dashboard or query-results chart) linked to a tool through metadata, and render it sandboxed in the host.
7. **Test in MCP Inspector.** Try the Web UI and the CLI mode, and review the app with the Inspector's MCP App review flow.
8. **Deploy and prove statelessness.** Deploy to Cloudflare Workers (and optionally Vercel). Run 3 instances or rely on the platform's scale-out, send parallel requests, and kill or redeploy instances mid-conversation.
9. **Test across clients.** Connect Claude, Cursor, and a 30-line AI SDK 7 agent (`createMCPClient` → `ToolLoopAgent`). Show which ones render the MCP App and which fall back to text.
10. **Publish.** Release a repo with a `MIGRATION.md` (a before/after diff table) and pinned versions.

**Demo moments:** The v1 client breaking against the v2 server, then being fixed. A redeploy mid-chat with the conversation continuing. The OAuth consent screen appearing inside Claude. The MCP App dashboard rendering inline. The same tools running from three different clients.
**On-screen numbers:** p50/p95 tool-call latency (Workers vs Vercel, cold vs warm), requests handled per instance during the kill test (with zero errors), lines changed in the migration diff, list-call cache hits after `ttlMs`, and monthly cost estimate at 100k calls on each platform.

## 5. Resources
### Official docs & specs
- [MCP Specification 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28). The normative spec.
- [2026-07-28 Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog). The complete list of changes. Base your migration checklist on this.
- [Getting started (2026-07-28 docs)](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) (unverified: the link came from the release post and wasn't opened)
- [Extensions Overview](https://modelcontextprotocol.io/extensions/overview). The extensions framework (Apps, Tasks).
- [The 2026-07-28 Specification (MCP Blog)](https://blog.modelcontextprotocol.io/posts/2026-07-28/). The GA post: stateless core, MRTR, headers, auth hardening, deprecations, and the claim of about 500M monthly Tier 1 SDK downloads.
- [The 2026-07-28 MCP Specification Release Candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). The RC post (locked May 21).
- [Beta SDKs for the 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/). SDK beta announcement.
- [MCP joins the Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/). Dec 9, 2025; source of "97M+ monthly SDK downloads, 10,000 active servers."
- [MCP Inspector docs](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP TypeScript SDK v2 docs](https://ts.sdk.modelcontextprotocol.io/v2/)
- [MCP Apps API docs](https://apps.extensions.modelcontextprotocol.io/api/)
- [Build a Remote MCP server (Cloudflare Agents docs)](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/)
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel). Uses `mcp-handler` 2.x, which pairs with `@modelcontextprotocol/server` v2 and zod 4.
- [AI SDK: createMCPClient](https://ai-sdk.dev/docs/reference/ai-sdk-core/create-mcp-client) and [AI SDK: MCP Apps](https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-apps)
- [WorkOS AuthKit for MCP](https://workos.com/docs/authkit/mcp). An alternative OAuth provider.

### Articles & blog posts
- [Everything your team needs to know about MCP in 2026](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026). WorkOS, Mar 26, 2026 (written before the GA spec, so pair it with the changelog).
- [MCP joins the Linux Foundation (GitHub Blog)](https://github.blog/open-source/maintainers/mcp-joins-the-linux-foundation-what-this-means-for-developers-building-the-next-era-of-ai-tools-and-agents/)
- [The New MCP Roadmap (MCP Blog)](https://blog.modelcontextprotocol.io/posts/mcp-roadmap/)
- [MCP 2026-07-28 Migration: Python and TypeScript](https://computingforgeeks.com/migrate-mcp-server-stateless/). ComputingForGeeks.
- [The MCP 2026-07-28 Rewrite: What Breaks and How to Migrate](https://www.developersdigest.tech/blog/mcp-2026-07-28-breaking-changes). Developers Digest.
- [Is MCP Stateless Now? Server Migration Guide 2026](https://wavect.io/blog/mcp-stateless-server-migration-2026/). Wavect.
- [Migrating to the Stateless MCP: What Breaks in Session-Based Servers](https://hidekazu-konishi.com/entry/stateless_mcp_migration_guide.html). hidekazu-konishi.
- [MCP Went Stateless: What It Means for Long-Running Deploy Tools](https://bex.co/blog/2026/09/24/mcp-stateless-turn-deploy-from-chat-self-hosted). bex.co, Sept 24, 2026.
- [Build and deploy Remote MCP servers to Cloudflare](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/). Cloudflare Blog (predates the 2026 spec).
- [Building an MCP server with OAuth and Cloudflare Workers](https://stytch.com/blog/building-an-mcp-server-oauth-cloudflare-workers/). Stytch.
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers). Vercel.

### GitHub repos & templates
- [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) ([releases](https://github.com/modelcontextprotocol/typescript-sdk/releases)). v2 is the stable line for 2026-07-28; v1.x gets fixes for at least 6 months.
- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)
- [modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps). The MCP Apps spec and SDK, with [examples](https://github.com/modelcontextprotocol/ext-apps/tree/main/examples).
- [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector). Web UI, CLI, and TUI; requires Node ≥22.19. See also the [MCP App review doc](https://github.com/modelcontextprotocol/inspector/blob/main/docs/mcp-app-review.md).
- [modelcontextprotocol/modelcontextprotocol releases](https://github.com/modelcontextprotocol/modelcontextprotocol/releases)
- [vercel-labs/mcp-handler](https://github.com/vercel-labs/mcp-handler). MCP on Next.js, Nuxt, SvelteKit, and Hono.
- [Vercel template: MCP Server on Next.js](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)
- [microsoft/mcp-for-beginners: 2026-07-28 RC lesson](https://github.com/microsoft/mcp-for-beginners/blob/main/01-CoreConcepts/mcp-2026-07-28-release-candidate.md)
- [SEP-1865: MCP Apps PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865). The design history behind MCP Apps.

### YouTube videos (study / beat these)
- [Did Anthropic finally fix MCP?](https://www.youtube.com/watch?v=gVfEtktkvnE). Theo - t3.gg · A big-reach opinion piece on the new spec; not a build.
- [Here's how the new MCP spec works](https://www.youtube.com/watch?v=1B9H6RTAGmE). Kent C. Dodds · A clear spec walkthrough from a respected TS educator.
- [MCP Was Wrong From The Start (They Just Fixed It)](https://www.youtube.com/watch?v=f4mI3d-nTrI). Better Stack · Explainer of why stateless matters for load balancing.
- [Breaking Down The NEW Stateless MCP Spec](https://www.youtube.com/watch?v=tlAxnGTkBEg). Agentic Intelligence w/ Michael Levan · An infra-focused breakdown.
- [MCP Release Overview: Stateless and the Big Changes in the New Spec](https://www.youtube.com/watch?v=-uvKf47fbbY). AAIF Live · The official foundation channel; cite it for authority.
- [MCP V2 Release Event: 2026-07-28 spec update + mcp-use V2](https://www.youtube.com/watch?v=W9XtugrmHts). Manufact (mcp-use) · A long livestream; mine it for edge cases.
- [MCP Is Getting Its Biggest Update Ever (No One's Ready)](https://www.youtube.com/watch?v=U7fcJvVukHQ). Devsplainers · RC-era hype video.
- [MCP Will Never Be The Same - Render UI With MCP Apps](https://www.youtube.com/watch?v=d1Aditif0wI). Den Delimarsky · An MCP Apps demo from an MCP maintainer.
- [How to Build MCP Apps with UI (Full Guide)](https://www.youtube.com/watch?v=lZBm7tZgvRA). ZazenCodes · A recent full MCP Apps build. This is the one to beat on production concerns (auth, deploy).
- [Building Interactive UIs in VS Code with MCP Apps](https://www.youtube.com/watch?v=_xIwFcnHqp4). AI Engineer (GitHub's Marlene Mhangami & Liam Hampton)
- [Build your own remote MCP Server with Cloudflare](https://www.youtube.com/watch?v=Pjc8cC8zVRY). Cloudflare Developers · From May 2025, pre-stateless. Your updated version fills this gap.
- [Auth for agents: Understanding OAuth for MCP Servers](https://www.youtube.com/watch?v=We8_v_WEwiU). Stytch by Twilio · From 2025, before the CIMD change.
- **Channels to watch:** Theo - t3.gg, Kent C. Dodds, Den Delimarsky, AAIF Live, Cloudflare Developers, AI Engineer, Manufact (mcp-use).

### Tools & install
```bash
# Server SDKs (2026-07-28)
npm i @modelcontextprotocol/server@2 zod@4       # latest seen: 2.2.0
pip install "mcp>=2"                             # latest seen: 2.2.0
# MCP Apps
npm i @modelcontextprotocol/ext-apps             # latest seen: 2.0.3
# Inspector (Node >=22.19)
npx @modelcontextprotocol/inspector              # latest seen: 2.8.0
# Cloudflare
npm create cloudflare@latest -- my-mcp-server-github-auth --template=cloudflare/ai/demos/remote-mcp-github-oauth
npm i @cloudflare/workers-oauth-provider agents  # 1.2.1 / 0.24.0 seen
# Vercel
npm i mcp-handler@2                               # latest seen: 2.2.0
# AI SDK 7 client
npm i ai@7 @ai-sdk/mcp                            # 7.0.122 / 2.0.62 seen
# Legacy v1 (for the "before" state)
npm i @modelcontextprotocol/sdk@1                 # latest seen: 1.31.0
```

### Not found — search for:
- A Cloudflare changelog/blog post confirming `agents`/`workers-oauth-provider` support for the 2026-07-28 stateless core. Search: `cloudflare agents sdk MCP 2026-07-28 stateless support`.
- An official Vercel note on `mcp-handler` and 2026-07-28 compatibility beyond the docs page. Search: `vercel mcp-handler 2026-07-28 changelog`.
- The GA post's "migration guide" doc on modelcontextprotocol.io. Search: `site:modelcontextprotocol.io 2026-07-28 migration`.

## 6. Caveats & fact-checks before filming
- **Backward compatibility:** 2026-07-28 is **not** fully backward-compatible with stateful servers. Deprecated features (Roots, Sampling, Logging, HTTP+SSE, DCR) keep working for about 12 months. Say "deprecated," not "removed."
- **Download numbers conflict by date:** "97M+ monthly SDK downloads" is the Dec 2025 AAIF post. The July 2026 GA post claims about 500M monthly across Tier 1 SDKs and over 1B total each for TS and Python. Always attribute the figure and give its date.
- **"10,000+ active public servers"** is also a Dec 2025 figure. Don't present it as current.
- **Client support for MCP Apps varies** (Claude, ChatGPT, and VS Code support it, per the sources). Test each client on filming day and show fallbacks honestly.
- **Rust SDK** is still beta for 2026-07-28, while the TS, Python, Go, and C# SDKs are Tier 1.
- **Third-party migration posts** (ComputingForGeeks, Wavect, IoT Digital Twin, etc.) sometimes disagree on how many breaking changes there are. Use the official changelog as the source of truth.
- **Security:** Scope OAuth tokens per user. Never expose raw SQL to the model. Pair this with Topic 6 (tool poisoning, prompt injection via tool output).
- **Pin versions:** Record `@modelcontextprotocol/server` 2.x, `mcp` 2.x, `ext-apps` 2.x, Inspector 2.x, `mcp-handler` 2.x, `ai` 7.0.x, the protocol version string `2026-07-28`, and the filming date.
