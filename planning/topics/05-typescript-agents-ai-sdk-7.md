# 5. Type-safe TypeScript agents with Vercel AI SDK 7

> **Rank:** 5 of 11 · **Difficulty:** Intermediate · **YouTube upside:** High for a TS audience · **Build time:** 2–3 days

## 1. Overview
AI SDK 7 shipped on June 25, 2026. It moved Vercel's TypeScript AI layer from "stream tokens in a React app" to a production agent platform. The new pieces are `WorkflowAgent` (`@ai-sdk/workflow`) for durable, resumable agents that survive restarts, deploys, and delayed approvals; agent-level tool approvals (`toolApproval`); typed per-tool context (`contextSchema` + `toolsContext`); MCP Apps; a terminal UI (`@ai-sdk/tui`); sandbox support; and redesigned OpenTelemetry telemetry (`@ai-sdk/otel`). It builds on AI SDK 6's `ToolLoopAgent`, stable MCP and human-in-the-loop approvals. With TypeScript now #1 on GitHub, "type-safe AI engineering" is a defensible niche that fits a "TypeSafe" channel brand. **Caveats:** AI SDK 7 requires Node 22+ and is ESM-only. Several reviewers warn that the smoothest path pulls you toward Vercel's platform (Workflows, Gateway, Sandbox), so show a portable setup too.

## 2. Why it attracts subscribers
- **Audience:** TypeScript/Next.js developers moving from chatbots to real agents, plus teams upgrading from AI SDK 5/6 who need migration help.
- **Competition gap:** Most AI SDK videos on YouTube predate v7: general guides (Matt Pocock's "AI SDK 6 is SWEET", Vercel's Ship 2025 workshop, "A Complete Guide to Vercel's AI SDK"). v7-specific coverage is thin. It is mainly a web-search agent + TUI demo (Cand Dev), the Langfuse/ClickHouse telemetry talk, and Vercel's own Workflow DevKit talks. **No video we found shows an agent being killed mid-run and resumed, typed tool context, or a v6→v7 migration done on camera.**
- **Winning angle:** Show that the types and durability actually hold: kill the server during the run, resume it, approve a risky tool call from the UI, then show the trace. Follow with a "portable version" that isn't tied to Vercel.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Killed My AI Agent Mid-Task. It Came Back. (AI SDK 7 WorkflowAgent) | Full build | 20–25 min |
| 2 | AI SDK 6 → 7 Migration: Every Breaking Change in 12 Minutes | Migration guide | 12–15 min |
| 3 | AI SDK 7 vs Mastra: Same Agent, Two Frameworks | X vs Y benchmark | 15–18 min |
| 4 | Your Agent Can Spend Money. Here's How to Make It Ask First (Tool Approvals) | Full build (mini) | 10–12 min |
| 5 | Typed Tool Context in 60 Seconds | Explainer short | <60 s |

**Thumbnail / hook:** A terminal with `^C` and "SERVER KILLED" in red, then a green "RESUMED — step 4/7" beside the agent's progress bar. **Hook (first 15 s):** "I'm going to kill this AI agent halfway through a 7-step research task. Most agents just lose everything. This one, built on AI SDK 7, will pick up exactly where it left off and still ask my permission before it sends an email."

## 4. Project build plan
**Project:** *"A durable research agent that survives crashes."*
**Stack:** Next.js + TypeScript, `ai@7`, `@ai-sdk/workflow` (WorkflowAgent), Zod, `@ai-sdk/react` (`useChat`), `@ai-sdk/otel` + Langfuse (`@langfuse/vercel-ai-sdk`, `@langfuse/otel`), AI Gateway (or a direct provider for the portable version), and optionally Vercel Sandbox. Mastra is the comparison framework. Optionally, a Jev decision node from Topic 1.
**Steps:**
1. Scaffold Next.js on Node 22+ (ESM) and install `ai@7`, `@ai-sdk/workflow`, `zod`, and a provider. Pin exact versions.
2. Define typed tools with Zod input/output schemas: `webSearch`, `fetchPage`, `summarize`, and two risky ones, `sendEmail` and `purchaseReport`. Give the risky tools a `contextSchema` (e.g. `{ userId, budgetCents }`) and pass the values through `toolsContext`, so each tool only receives its own validated context.
3. Build a `ToolLoopAgent` first and get it working end to end. This is the "before" baseline.
4. Switch to `WorkflowAgent` inside a workflow so state is persisted between steps. Use Zod-typed structured output for the final report (`{ title, findings[], sources[] }`).
5. Add approvals: `toolApproval: { sendEmail: 'user-approval', purchaseReport: <function checking budget> }`, and render the Approve/Deny UI through `useChat`.
6. Demo the crash: start a 7-step run, `kill -9` the dev server at step 4, restart, and show the run resuming. Then leave an approval pending for minutes and approve it later.
7. Add telemetry: register `@ai-sdk/otel` / the Langfuse integration in `instrumentation.ts` and show the per-step trace tree, tokens and latency in Langfuse.
8. Optionally test locally with `runAgentTUI({ agent })` from `@ai-sdk/tui`.
9. Portable version: swap AI Gateway for a direct provider key and self-hosted Langfuse, and explain what changes if you run outside Vercel. Check the Workflow DevKit hosting options before promising this.
10. Optionally, for the migration video, run `npx @ai-sdk/codemod v7` on an AI SDK 6 project and walk through the diff.

**Demo moments:** Kill the server and watch the run resume. Approve an email from the UI minutes after the agent paused. Show the typed `toolsContext` error when you pass the wrong field (a compile-time red squiggle). Show the full trace tree in Langfuse. Show the TUI running in a terminal.
**On-screen numbers:** Total run time and time per step, tokens and $ per research run, steps completed before and after the crash (0 lost), approval wait time, and trace span count. For the Mastra comparison: lines of code, cold-start time, and $ per run.

## 5. Resources
### Official docs & specs
- [AI SDK 7 is now available (changelog)](https://vercel.com/changelog/ai-sdk-7) — official release notes
- [AI SDK 7 is now available (blog)](https://vercel.com/blog/ai-sdk-7) — feature tour, codemod, and migration skill (fetched)
- [Migration guide: AI SDK 6.x → 7.0](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0) — Node ≥22, ESM-only, renames, `needsApproval` → `toolApproval`
- [AI SDK docs](https://ai-sdk.dev/docs/introduction) · [Agents overview](https://ai-sdk.dev/docs/agents/overview) · [Building agents](https://ai-sdk.dev/docs/agents/building-agents)
- [Agents: WorkflowAgent](https://ai-sdk.dev/v7/docs/agents/workflow-agent) · [WorkflowAgent reference](https://ai-sdk.dev/docs/reference/ai-sdk-workflow/workflow-agent)
- [Agents: Tool Approvals](https://ai-sdk.dev/docs/agents/tool-approvals) · [Runtime and Tool Context](https://ai-sdk.dev/docs/ai-sdk-core/runtime-and-tool-context) · [Tool calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK Core: Telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry) — `@ai-sdk/otel` setup
- [Agents: Workflow Patterns](https://ai-sdk.dev/docs/agents/workflows)
- [Vercel docs: AI SDK](https://vercel.com/docs/ai-sdk) · [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk)
- [vercel/ai CHANGELOG](https://github.com/vercel/ai/blob/main/CHANGELOG.md) — use it to pin exact 7.0.x versions

### Articles & blog posts
- [Developers Digest: Vercel AI SDK 7: The Production Agent Upgrade](https://www.developersdigest.tech/blog/vercel-ai-sdk-7-production-agents) — durability, approvals, telemetry, realtime
- [Langfuse: Trace AI SDK 7 with Langfuse](https://langfuse.com/changelog/2026-06-26-vercel-ai-sdk-7) — packages and setup (fetched)
- [Langfuse: Vercel AI SDK integration docs](https://langfuse.com/integrations/frameworks/vercel-ai-sdk)
- [Mastra: AI SDK v7 support in Mastra](https://mastra.ai/blog/ai-sdk-v7-support) — day-one support; `@mastra/ai-sdk` 1.9.0
- [Mastra docs](https://mastra.ai/docs) — the alternative TS framework
- [FoundrySoft: Vercel AI SDK 7: What Actually Changed](https://foundrysoft.co/blog/vercel-ai-sdk-7)
- [Vercel changelog: Program Claude Code, Codex, Pi and other agent harnesses with AI SDK](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) — HarnessAgent
- [SigNoz: Observing Vercel AI SDK with OpenTelemetry](https://signoz.io/blog/opentelemetry-vercel-ai-sdk/) — a non-Vercel observability option
- [Callstack: Building AI agent workflows with Vercel's AI SDK](https://www.callstack.com/blog/building-ai-agent-workflows-with-vercels-ai-sdk-a-practical-guide)
- [Vercel KB: Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk)

### GitHub repos & templates
- [vercel/ai](https://github.com/vercel/ai) — the SDK monorepo (via its CHANGELOG link)
- [vercel-labs/jev-ai-sdk-form-router](https://github.com/vercel-labs/jev-ai-sdk-form-router) — an AI SDK 7 + Next.js 16 template (links this topic to Topic 1)
- [zirkelc/ai-tool-set](https://github.com/zirkelc/ai-tool-set) — type-safe conditional tool activation and approvals
- [dyad-sh/dyad PR #4586: Upgrade AI SDK to v7](https://github.com/dyad-sh/dyad/pull/4586) — a real-world migration diff to study
- migrate-ai-sdk-v6-to-v7 agent skill — [skillrepo listing](https://skillrepo.dev/skills/vercel/migrate-ai-sdk-v6-to-v7) (unverified; seen in search only)

### YouTube videos (study / beat these)
- [I Built an AI Agent That Searches the Web in Real-Time | AI SDK 7](https://www.youtube.com/watch?v=kQLplVrd5AM) — Cand Dev · day-after-launch TUI demo; no durability or approvals
- [Telemetry in Vercel AI SDK, V7 with Langfuse](https://www.youtube.com/watch?v=cJP22B9tzUE) — ClickHouse · talk on observability and evals for v7
- [Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel](https://www.youtube.com/watch?v=kmV-qg4uoNI) — AI Engineer · durability concepts from before v7's WorkflowAgent
- [How Vercel Builds Agents and AI Apps](https://www.youtube.com/watch?v=VQCNVpzrR5Q) — Resend · a tour of Vercel's agent primitives
- [Vercel Eve Tested: What It Really Removes From Agent Builds](https://www.youtube.com/watch?v=HDZIrMQM2_o) — Fluid Coding & AI · compares against plain `ToolLoopAgent`
- [AI SDK 6 is SWEET](https://www.youtube.com/watch?v=YCrj0E_P6ls) — Matt Pocock · v6 coverage; the audience you'd bring to a v7 upgrade video
- [Vercel Ship 2025 workshop: Building agents with the AI SDK (Nico Albanese)](https://www.youtube.com/watch?v=1bx-eosOOkE) — Vercel · foundational, pre-v7
- [Build an Agent Loop from Scratch: FULL BUILD (TypeScript, Ollama, AI SDK, pi-tui)](https://www.youtube.com/watch?v=doYxGYxLsQo) — Joe Maddalone · long-form build format to emulate
- [The AI SDK Killer is Here...](https://www.youtube.com/watch?v=187LlZkqXeU) — Ben Davis · the competitor/alternatives angle
- **Notable channels:** Matt Pocock, Vercel, AI Engineer, Joe Maddalone, Ben Davis, ClickHouse/Langfuse. (Channel names were verified through YouTube oEmbed.)

### Tools & install
```bash
node -v   # must be >= 22
npm i ai@7 @ai-sdk/workflow @ai-sdk/react @ai-sdk/otel zod
npm i @ai-sdk/tui                          # terminal UI (optional)
npm i @langfuse/vercel-ai-sdk @langfuse/otel @langfuse/tracing @opentelemetry/sdk-node
npx @ai-sdk/codemod v7                     # migrate an AI SDK 6 project
npm i @mastra/core @mastra/ai-sdk          # comparison framework
```

### Not found — search for:
- A YouTube video on WorkflowAgent crash and resume specifically — search YouTube `AI SDK 7 WorkflowAgent resume` (none found, which is your gap)
- A YouTube walkthrough of the v6→v7 migration — search YouTube `AI SDK 7 migration codemod`
- Vercel Sandbox + AI SDK 7 `SandboxSession` docs page — search `ai-sdk.dev SandboxSession`
- Reviewer write-ups on Vercel lock-in for AI SDK 7 — search `AI SDK 7 vendor lock-in Vercel Workflow self-host`

## 6. Caveats & fact-checks before filming
- **Node 22+ and ESM-only.** Say this in the first minute, because it is the most common upgrade blocker.
- **Renamed and deprecated APIs:** `experimental_onStart` → `onStart`, `experimental_onStepStart` → `onStepStart`, `experimental_telemetry` → `telemetry` (the old name still works as an alias), and `experimental_prepareStep` has been removed. `needsApproval` is deprecated for `generateText`/`streamText`/`ToolLoopAgent` in favor of `toolApproval`, but **WorkflowAgent still configures approval on the tool with `needsApproval`**. Check both docs pages before recording.
- **Lock-in:** WorkflowAgent is designed to run inside Vercel Workflows (Workflow DevKit). Before calling it "portable," verify which hosting options are supported outside Vercel, and show a direct-provider + self-hosted Langfuse path.
- **Provider package majors changed** (e.g. `@ai-sdk/openai` 2.x for v6 → 4.x for v7, per Mastra). Mismatched provider and core versions produce confusing type errors.
- Realtime and video features are experimental, so keep them out of the main build.
- **Pin versions:** use the exact `ai@7.0.x`, `@ai-sdk/workflow`, `@ai-sdk/otel` and `@langfuse/vercel-ai-sdk@≥5.9.0` versions from your lockfile, record the Node version, and show the filming date on screen. AI SDK 7 releases patches frequently.
