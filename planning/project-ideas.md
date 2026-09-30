# AI Topics to Learn and Teach on YouTube (Late September 2026): A Ranked Playbook Built Around "Jev from TypeSafe"

"Jev from TypeSafe" isn't a YouTuber. Jev is a new AI model from TypeSafe AI, released in early access on September 15, 2026. It returns typed, calibrated decisions instead of generated text, and it is the most talked-about developer launch of the past two weeks. The best plan is to open with a Jev video now, while the topic is new and under-covered, and then work through a ranked list of agentic-era topics that have strong 2026 demand signals: agentic coding and harness engineering, MCP, Agent Skills, type-safe TypeScript agents (AI SDK 7), agent security, evals and observability, personal agents (OpenClaw), agentic RAG, voice agents, and small local models.

## TL;DR

- **"Jev from TypeSafe" is a model, not a person.** TypeSafe AI, founded by ex-OpenAI researcher Diogo Almeida, launched Jev on Sept 15, 2026 as the first "System One Model." It takes unstructured state and answers typed questions (yes/no, choice, score) with calibrated probabilities. TypeSafe claims it is "two orders of magnitude faster and more efficient" than LLMs on these tasks. Dozens of YouTube videos, a LangChain integration, Vercel and OpenRouter support, and a Hacker News thread with more than 1,800 points followed within days. That makes it your most timely video topic, especially a *skeptical, hands-on* test of its claims.
- **Build the rest of the channel around the agentic stack.** In JetBrains' 2026 survey, 90% of professional developers used AI coding agents at least weekly. MCP moved to Linux Foundation governance and shipped a major stateless spec on July 28, 2026. Agent Skills (SKILL.md) had spread to roughly 40 products on the official agentskills.io showcase as of June 2026, according to Agentman's 2026 ecosystem report. Vercel's AI SDK 7 (June 25, 2026) turned TypeScript agents into production infrastructure. These are the topics developers are actively adopting right now.
- **Every video should ship a working project.** The underserved angles are the "production" layers: harness engineering, agent guardrails, prompt-injection defense (OWASP's Agentic Top 10), evals and tracing with OpenTelemetry, and honest independent benchmarks. Most channels cover demos. Few cover how to make agents trustworthy, and that gap fits Jev's "decisions software can depend on" framing.

## Key Findings

### 1. Who (or what) "Jev from TypeSafe" is, and the style to emulate

- **Identity:** Jev is TypeSafe AI's first public model. Founder Diogo Almeida says that at OpenAI he "helped build the methods that made language models useful at following instructions… That work ended up as the research behind ChatGPT." After "two years in stealth," TypeSafe released Jev as "a new class of frontier models built to make fast, structured decisions that software can use directly." TypeSafe was founded in 2024 by Diogo Almeida, Erik Gafni and Sasha Sheng. It raised a $40M seed round led by DCVC, announced Sept 15, which Forbes reported valued the company at US$200 million.
- **What it does:** You send a `state` (text or JSON) and a map of named questions. There are three types: **Noul** (yes/no probability), **Choice** (pick from options, cardinality up to 255), and **Score** (an ordered rubric). All questions are evaluated in parallel in one pass. The endpoint is `POST https://api.typesafe.ai/v1/systemone`, with model `jev-latest` (currently `jev-1.13.0`).
- **Claims:** $0.042 per million input tokens, with output "FREE (too cheap to meter)." End-to-end latency is 70–500 ms, against "3 to 329 seconds" for frontier models. The headline numbers are "193.6x faster, 444.6x cheaper."
- **TypeSafe's own caveats (important for credibility):** Those figures come from four in-house workflow evals that TypeSafe says are "on the higher end of real world gains." The workflows "were made by individuals on our model capabilities team, so some bias could exist." Reference answers are an average of GPT-6 Astra and Fable 5.1. On pricing: "We can't prove it isn't subsidized." The 0% hallucination figure "is not empirical. Schema matching is guaranteed."
- **Ecosystem within two weeks:**
  - Official JS/TS (`@typesafe-ai/sdk`) and Python (`typesafe_sdk`) SDKs.
  - LangChain's `langchain-typesafe`, with model-routing and "AutoMode" tool-risk middleware.
  - Vercel AI Gateway (`typesafe-ai/jev`, via `experimental_evaluate` in AI SDK 7), plus a "Jev x AI SDK Form Router" template.
  - OpenRouter's Decisions API, Cloudflare Workers AI, DigitalOcean, and Pydantic AI.
  - LangChain wrote that "this one had a pretty outsized response." Community reports put the Hacker News launch thread at 1,655–1,978 points depending on when it was counted.
- **Existing YouTube coverage (the formats to match or beat):**
  - Explainers ("What Is Jev? TypeSafe's New System One AI Model Explained").
  - First-look tests ("I tried TypeSafe's System One Model: Jev").
  - "50 use cases" listicles.
  - Live-coding streams, including a Spanish-language one and one that reverse-engineers "Parallel Constrained Decoding."
  - Podcast segments (Tech Brew Ride Home).
  - **Implication:** The audience is intermediate-to-advanced developers who want to know what a model is, whether the claims hold up, and what to build with it. Hands-on, skeptical, code-first videos fit this audience best.

### 2. The macro demand signals behind the ranking

- **Jobs:**
  - LinkedIn's 2026 Jobs on the Rise ranked AI engineer the fastest-growing US job title, with postings up 143% year over year.
  - PwC's 2026 AI Jobs Barometer puts the wage premium for AI skills at 62%.
  - A secondary analysis of Lightcast data reports "agentic AI" rising from 0.06% to 0.23% of US postings (+280%). The same analysis found RAG in 13.6% of AI-engineer postings and "prompt engineering" in only 8.9%. Prompt engineer is fading as a job title.
- **Developer adoption:**
  - JetBrains (15,000+ developers, May–July 2026): 90% use AI coding agents at least weekly and 68% use them daily. The same JetBrains Developer Ecosystem Survey 2026 found 39% of professional developers use Claude Code at work, a rise of 21 percentage points from JetBrains' January AI Pulse survey. JetBrains adds that "Claude Code is the most used AI coding tool for 31% of developers."
  - Stack Overflow's latest published survey (2025): 84% use or plan to use AI tools, but 52% either don't use agents or stick to simpler tools. Trust remains the sticking point.
- **Language:** GitHub's Octoverse found TypeScript overtook Python and JavaScript in August 2025 as the most-used language on GitHub. It attributed part of the shift to typed languages making AI-assisted coding more reliable. That supports a "type-safe AI" channel identity.

## Ranked Topic List

| Rank | Topic | Why now (one line) | Difficulty | YouTube upside |
|---|---|---|---|---|
| 1 | Typed decision models (Jev / System One) | Launched Sept 15, 2026; community is still testing the claims | Beginner–Intermediate | Very high (newsjacking + gap) |
| 2 | Agentic coding & harness engineering | 90% of developers use coding agents weekly; "Agent = Model + Harness" | Intermediate | Very high (huge audience) |
| 3 | MCP servers (2026-07-28 spec) | Stateless core, MCP Apps, Tasks; 97M+ monthly SDK downloads (MCP Blog) | Intermediate | High |
| 4 | Agent Skills (SKILL.md) | Open standard since Dec 18, 2025; ~40 products on the agentskills.io showcase (June 2026) | Beginner | High (quick wins) |
| 5 | Type-safe TypeScript agents (AI SDK 7) | GA June 25, 2026: WorkflowAgent, approvals, telemetry | Intermediate | High for a TS audience |
| 6 | Agent security & guardrails | OWASP Agentic Top 10; malicious skills in the wild | Intermediate–Advanced | High, underserved |
| 7 | Evals & observability (OTel GenAI) | 89% use agent observability; only 52.4% run offline evals | Intermediate | Medium–High, underserved |
| 8 | Personal autonomous agents (OpenClaw) | 247k stars by Mar 2026; OpenClaw 2.0 on Aug 30 | Beginner–Intermediate | High (consumer appeal) |
| 9 | Agentic / hybrid RAG | Still in 13.6% of AI-engineer postings; naive RAG is outdated | Intermediate | Medium (crowded, needs a new angle) |
| 10 | Realtime voice agents | LiveKit/Pipecat each grew ~63–64% in stars Jan 1–Sept 15, 2026 (LiveKit's own analysis) | Intermediate–Advanced | Medium–High (demos are visual) |
| 11 | Small/local models (Gemma 4, Qwen 3.5) | Gemma 4 under Apache 2.0 (Apr 2, 2026); edge SLMs | Beginner–Intermediate | Medium–High |

## Details: Each Topic With a Project

### 1. Typed decision models: Jev / "System One" (flagship video)

- **What and why:** Jev replaces "ask an LLM for JSON, then parse and validate it" with schema-guaranteed, calibrated answers. TypeSafe describes it as "a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out." Its target uses are routing, classification, scoring, extraction, and guardrails: "smart if-statements." LangChain describes the pairing this way: "use an LLM for open-ended reasoning and generation, and Jev for fast, structured decisions along the way."
- **Evidence it's hot:**
  - Rapid integrations from LangChain, Vercel, and OpenRouter.
  - Vercel reportedly called it the fastest-adopted model in AI Gateway history (secondary report).
  - A wave of community projects: the awesome-typesafe-jev list had 539 stars by Sept 23.
  - Signups opened Sept 20 with $5 of free credit, then paused Sept 22 under demand, according to a Firecrawl write-up. Check current availability before filming.
- **Independent evidence to use in the video (the angle most channels lack):**
  - Every's CEO Dan Shipper ran Jev against Fable 5.1 on writing checks. Median latency was 0.35 s vs 8.83 s at "roughly 580x lower cost," and "Jev caught six of seven planted defects. Fable caught all seven."
  - JevBench (Florian Standhartinger, explicitly preliminary) scored Jev 1.13.0 at 75.3 in v1.2.2. That included the highest calibration in the visible rows (82.7), behind a classifier.dev fast tier at 84.8.
  - HN critics noted that a confident wrong answer is still a hallucination: Jev "can't emit an invalid type, but it can still emit a wrong valid value."
  - Community studies found mixed results: one ranking benchmark "failed four of six on 306 human-graded shopping pairs," and a context-pruning experiment "dropped information needed later."
- **Project:** *"I replaced my LLM if-statements with Jev: a support-ticket triage and coding-agent guardrail."*
  - Build a Next.js or Node app that sends each incoming ticket to Jev with 5 questions: urgency (Noul), category (Choice), sentiment (Score), refund risk (Noul), and escalate-to-human (Noul).
  - Route on confidence thresholds, for example: act at ≥0.95, otherwise fall back to an LLM. This mirrors Vercel's Form Router template.
  - Add a second segment that gates coding-agent tool calls, using LangChain `AutoModeMiddleware` or a custom bash-command classifier.
  - Close with your own 100-item labeled test set. Compare Jev against a frontier LLM on accuracy, latency, cost, and calibration (a reliability plot).
- **Tools:** `@typesafe-ai/sdk` or `typesafe_sdk`; Vercel AI SDK 7 with `@ai-sdk/typesafe-ai`; `langchain-typesafe`; OpenRouter Decisions API; `system-one-adapter-python` (to run the same typed interface over LLMs for fair comparison).
- **Difficulty/scope:** Beginner–Intermediate. The core build takes a weekend. The eval segment takes 1–2 more days.
- **Learning resources:** TypeSafe launch post and docs (Quickstart, "System One" concepts, the primitives page); LangChain's "Building a Harness with Jev" and "Building Prod with Jev and LangGraph"; OpenRouter's TypeSafe SDK guide and cookbooks; awesome-typesafe-jev on GitHub.
- **Caveat:** Most performance numbers still come from TypeSafe or from preliminary community benchmarks. Present them as claims under test, not facts. An honest "where Jev fails" video will likely age better than hype.

### 2. Agentic coding and harness engineering

- **What and why:** Coding agents (Claude Code, Codex, Cursor, Copilot) are now mainstream, and the discipline has shifted to "harness engineering," built around the formula "Agent = Model + Harness" (Birgitta Böckeler, martinfowler.com, April 2026). Faros reports that LangChain moved its coding agent from 30th to 5th on Terminal Bench 2.0 "without changing the underlying model at all," purely through harness changes.
- **Evidence:**
  - JetBrains 2026: 90% weekly agent use, 68% daily. Claude Code is used by about 39% of professional developers at work (47% in the US).
  - OpenAI's Codex usage report (June 2, 2026, via Constellation Research) put Codex at "more than 5 million weekly active users with knowledge workers representing 20% of users."
- **Project:** *"Build a mini coding-agent harness in 300 lines."*
  - A loop, file and bash tools, an AGENTS.md context file, a test-runner "sensor," context compaction, and a permission gate. Jev from Topic 1 works well as the gate.
  - Race the same model with and without your harness on 10 real bugs.
- **Tools:** Claude Agent SDK or LangChain Deep Agents, OpenAI Codex CLI, AI SDK 7 `ToolLoopAgent`/`WorkflowAgent`, pytest/vitest, git worktrees.
- **Difficulty/scope:** Intermediate. Plan a 2–4 part series.
- **Resources:** Böckeler's "Harness engineering for coding agent users"; Phil Schmid's "The importance of Agent Harness in 2026"; Marmelab's "State of AI Harness Engineering 2026" (Sept 24, 2026); the awesome-harness-engineering list.

### 3. MCP (Model Context Protocol) servers on the new spec

- **What and why:** MCP is the standard way to connect models to tools and data.
  - Anthropic donated it to the Linux Foundation's Agentic AI Foundation in December 2025, reporting "more than 10,000 active public MCP servers" and adoption by ChatGPT, Cursor, Gemini, Copilot, and VS Code.
  - The 2026-07-28 spec is "the largest revision of the protocol since launch." It includes a stateless core, an Extensions framework, Tasks, MCP Apps (server-rendered UI), and hardened OAuth authorization.
  - The MCP Blog (Dec 9, 2025, "MCP joins the Agentic AI Foundation") reported "over 97 million monthly SDK downloads" across the Python and TypeScript SDKs combined.
- **Gap:** Most MCP tutorials on YouTube predate the stateless spec. "Migrating your MCP server to 2026-07-28" and "MCP Apps: ship UI from your server" are fresh angles.
- **Project:** *"Build a stateless, OAuth-protected MCP server with an MCP App UI for your own Notion/GitHub/Postgres data."* Deploy it to Cloudflare Workers or Vercel, then use it from Claude, Cursor, and an AI SDK 7 agent.
- **Tools:** Official TypeScript/Python MCP SDKs, `@ai-sdk/mcp`, MCP Inspector, Cloudflare/Vercel.
- **Difficulty/scope:** Intermediate. Allow 1–3 days.
- **Resources:** The MCP blog post on the 2026-07-28 release candidate; the spec at modelcontextprotocol.io; WorkOS's "Everything your team needs to know about MCP in 2026."
- **Caveat:** The new spec isn't fully backward-compatible with older stateful servers.

### 4. Agent Skills (SKILL.md)

- **What and why:** A skill is a folder with a SKILL.md file (YAML frontmatter plus instructions, with optional scripts). It loads through "progressive disclosure," so it barely costs context until it is needed. Anthropic published it as an open standard on Dec 18, 2025. As of June 2026, roughly 40 skills-compatible products appeared on the official agentskills.io showcase, including OpenAI Codex, GitHub Copilot, Cursor, Gemini CLI, and VS Code (Agentman's 2026 ecosystem report, citing a rywalker.com analysis).
- **Project:** *"Write one skill, run it in 4 agents."* Build a "release-notes-from-git" or "brand-style PDF report" skill with a bundled script. Install it with `npx skills add`, then show it working in Claude Code, Codex, Copilot, and Gemini CLI. Add a short security segment on vetting third-party skills.
- **Tools:** agentskills.io spec, skills CLI, Claude Code/Codex/Copilot.
- **Difficulty/scope:** Beginner. Short videos (8–12 min) that suit a series.
- **Resources:** agentskills.io; Anthropic's Agent Skills docs; Strapi's "What Are Agent Skills and How To Use Them."
- **Caveat:** Reports of "hundreds of thousands" of skills come from auto-indexing aggregators. Treat those counts as marketing.

### 5. Type-safe TypeScript agents with Vercel AI SDK 7

- **What and why:** This is the most direct match to a "TypeSafe" brand. AI SDK 7 shipped June 25, 2026. It adds `WorkflowAgent` for durable, resumable agents, agent-level tool approval, typed tool and runtime context, MCP Apps, a terminal UI, sandbox support, and redesigned OpenTelemetry telemetry (`@ai-sdk/otel`). AI SDK 6 had earlier introduced `ToolLoopAgent`, stable MCP, and human-in-the-loop approval. Together with TypeScript's rise to #1 on GitHub, this makes "type-safe AI engineering" a defensible niche.
- **Project:** *"A durable research agent that survives crashes."* A Next.js app where a `WorkflowAgent` researches a topic across multiple steps. It uses Zod-typed structured outputs, pauses for human approval before any "send email" or "spend money" tool call, and resumes after you kill the server mid-run. Traces go to Langfuse.
- **Tools:** `ai@7`, `@ai-sdk/workflow`, Zod, `@ai-sdk/otel`, AI Gateway, Vercel Sandbox; Mastra as an alternative TypeScript framework.
- **Difficulty/scope:** Intermediate. Allow 2–3 days. Note that AI SDK 7 requires Node 22+.
- **Resources:** Vercel's "AI SDK 7 is now available" changelog and migration guide; ai-sdk.dev docs; Developers Digest's "Vercel AI SDK 7: The Production Agent Upgrade."
- **Caveat:** Several reviewers warn the smoothest path pulls you toward Vercel's platform. Show a portable setup too.

### 6. Agent security, guardrails, and prompt injection

- **What and why:** The OWASP GenAI Security Project published the Top 10 for Agentic Applications (ASI01–ASI10) on Dec 9, 2025. ASI01, Agent Goal Hijack, ranks first. The framework introduces the principles of "Least-Agency" and "Strong Observability." Real-world risk is visible: researchers found 1,184 malicious skills on the ClawHub registry. One analysis reports that about 17% of third-party OpenClaw skills it examined in early 2026 contained malicious code (secondary; verify before citing on camera).
- **Project:** *"I tried to hijack my own AI agent."* Build an email-reading agent. Attack it with indirect prompt injection (hidden white-text instructions, poisoned tool output, memory poisoning). Then add defenses: a least-privilege tool scope, a Jev or small-model injection classifier, human approval for destructive tools, and output validation. Show the before and after attack success rate.
- **Tools:** Promptfoo (red-teaming), AgentDojo-style test cases, LangChain `AutoModeMiddleware`, AI SDK tool approval, Lakera/guardrail libraries.
- **Difficulty/scope:** Intermediate–Advanced. Allow 2–4 days.
- **Resources:** OWASP Top 10 for Agentic Applications 2026 (genai.owasp.org); NeuralTrust's and Cycode's OWASP deep dives; the AgentDojo paper.

### 7. LLM/agent evals and observability

- **What and why:** Teams trace far more than they test. One industry survey summarized by MarkTechPost found that "89% of surveyed organizations use agent observability, while 52.4% run offline evals and 37.3% run online evals." OpenTelemetry's GenAI semantic conventions (`gen_ai.*`) have become the vendor-neutral standard. Langfuse (now part of ClickHouse), LangSmith, Braintrust, and Arize Phoenix lead the tooling.
- **Project:** *"Your agent has no tests: let's fix that."* Take the agent from Topic 5 or 6. Instrument it with OTel, build a 50-case golden dataset, add LLM-as-judge plus deterministic checks, and wire a CI gate that blocks a PR when scores regress. Bonus: use Jev as a cheap judge and compare it against an LLM judge.
- **Tools:** Langfuse (self-hostable), Braintrust, Arize Phoenix, DeepEval/RAGAS, OpenTelemetry, GitHub Actions.
- **Difficulty/scope:** Intermediate. Allow 1–2 days.
- **Resources:** SigNoz's LLM observability comparison; Braintrust's "Agent observability: The complete guide for 2026"; the OTel GenAI semantic conventions.

### 8. Personal autonomous agents (OpenClaw)

- **What and why:** OpenClaw is a self-hosted, model-agnostic agent that acts on your behalf through messaging apps. Peter Steinberger created it, and it went through the names Clawdbot and Moltbot before becoming OpenClaw. It reached 247,000 GitHub stars by March 2, 2026, and OpenClaw 2.0 (v2026.8.1) shipped Aug 30, 2026. NVIDIA built NemoClaw on it for hardened enterprise use.
- **Project:** *"My OpenClaw agent runs my week."* Self-host it on a Raspberry Pi or VPS with a local or low-cost model. Add two custom skills (calendar digest, expense logger) and a security hardening segment.
- **Tools:** OpenClaw, ClawHub skills, Ollama, NVIDIA OpenShell/NemoClaw.
- **Difficulty/scope:** Beginner–Intermediate. Allow 1 day.
- **Caveat:** Broad system access is risky. Pair this video with Topic 6.

### 9. Agentic and hybrid RAG

- **What and why:** RAG remains a staple in job postings, but "naive RAG is seen as a prototype at best." The 2026 baseline is hybrid search (dense plus BM25, fused with Reciprocal Rank Fusion), a reranker, and adaptive routing, where simple queries skip retrieval and complex ones get an agentic loop. Recent papers also show agents using grep- or keyword-style direct corpus search competing with vector pipelines.
- **Project:** *"Vector search vs grep vs agentic RAG: which actually answers questions about my docs?"* Run a three-way benchmark over one documentation corpus, measuring accuracy, latency, and cost per query.
- **Tools:** pgvector or Qdrant, BM25 (Tantivy/OpenSearch), Cohere or BGE rerankers, LlamaIndex/LangGraph, RAGAS.
- **Difficulty/scope:** Intermediate. Allow 2–3 days.
- **YouTube note:** This space is crowded. The "vs" benchmark format is what differentiates it.

### 10. Realtime voice agents

- **What and why:** LiveKit Agents and Pipecat are the two leading open-source frameworks. LiveKit's own blog analysis says their stars "are roughly even and growing at similar rates. Between January 1 and September 15, 2026, both grew about 63–64%." TECHSY counted Pipecat at 13,416 stars and LiveKit Agents at 11,356 on July 14, 2026. OpenAI shipped gpt-realtime-2.1 on July 6, 2026 (about 25% lower p95 voice latency), and Google shipped Gemini 3.1 Flash Live on March 26, 2026.
- **Project:** *"A phone receptionist that books appointments."* A LiveKit or Pipecat pipeline with interruption handling, calendar tools, and a Jev "is the caller done / needs a human?" classifier for turn-taking decisions. Show a latency waterfall on screen.
- **Tools:** LiveKit Agents, Pipecat, OpenAI Realtime API, Deepgram/AssemblyAI, ElevenLabs/Inworld TTS, Twilio/Plivo SIP.
- **Difficulty/scope:** Intermediate–Advanced. Allow 3–5 days.

### 11. Small and local models

- **What and why:** Gemma 4 (April 2, 2026) is licensed under Apache 2.0, with ~2B and 4B edge models that accept image and audio input. Qwen 3.5 offers small and MoE variants. Privacy and cost are pushing inference onto laptops and edge devices through Ollama and llama.cpp.
- **Project:** *"A fully offline meeting summarizer on a laptop."* Gemma 4 E4B via Ollama with local transcription, then fine-tune a tiny model on your own notes with LoRA. Compare the results against a cloud model.
- **Tools:** Ollama, llama.cpp, MLX, Unsloth (LoRA), LM Studio.
- **Difficulty/scope:** Beginner–Intermediate. Allow 1–2 days.
- **Caveat:** Enterprise-adoption percentages in SLM blog posts are often unsourced. Avoid quoting them.

## Recommendations

1. **Publish the Jev video within the next 1–2 weeks.** Launch-window topics decay fast. Title ideas: "Jev Isn't an LLM, So I Tested It Against GPT/Claude on 100 Real Decisions" or "Replace Your LLM If-Statements With Jev (Full Build)." Include the independent benchmark results and the failure cases. That is the gap in existing coverage, which is mostly explainers and use-case lists.
2. **Sequence the channel as one connected build.** Topics 1, 5, 6, and 7 fit together as a single running project: a type-safe TypeScript agent (AI SDK 7) with a Jev decision layer, security hardening, and an eval pipeline. Each video stands alone, but together they tell a "production AI engineer" story that matches job-market demand for AI engineers.
3. **Use high-volume topics (2, 3, 4, 8) for reach and underserved topics (6, 7, stateless MCP, harness engineering) for authority.** Big audiences exist for Claude Code, Codex, OpenClaw, and MCP, but competition is heavy. The production and trust layers have less coverage and a more senior, loyal audience.
4. **Formats that fit these topics:** "X vs Y benchmark on my own data," "I tried to break it," "build it in under N lines," and "migrate to the new spec." Always show cost and latency numbers on screen.
5. **Validate demand yourself before each video.** I could not measure YouTube search volume directly. Check Google Trends and YouTube search autocomplete for each keyword (Jev, MCP Apps, AI SDK 7, Agent Skills, OpenClaw) before committing.

## Caveats

- **Identity:** I found no YouTuber or creator named "Jev" associated with TypeSafe. All evidence points to Jev being TypeSafe AI's model. If you meant a specific creator, the recommendations still apply, but the "style" section describes the channels covering Jev, not a person.
- **Claims under test:** Jev's speed, cost, and "can't hallucinate" claims are mostly company-reported, and TypeSafe acknowledges possible bias. Independent results are early and mixed, and JevBench explicitly asks not to be cited yet. Numbers in secondary coverage conflict: Every's judgment counts are reported as 777 in one source and 1,709 in another, and Hacker News point totals vary by snapshot.
- **Survey data:** The 2026 Stack Overflow survey opened June 23, 2026. Some blogs present 2025 figures as "2026 results," so I used the 2025 numbers labeled as such. Job-share figures for "agentic AI" and RAG come from a secondary compilation of Lightcast data.
- **Fast-moving versions:** AI SDK (v7.0.x), MCP (2026-07-28), OpenClaw (2.0), and Jev (1.13.0) all update frequently. Pin versions in your repos and mention the date in each video.