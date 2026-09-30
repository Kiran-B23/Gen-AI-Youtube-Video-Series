# AI YouTube Project Ideas: Index (late Sept 2026)

Source: [`../project-ideas.md`](../project-ideas.md). Each file below covers one topic: the idea, why it attracts subscribers, video titles, a build plan, and linked resources (docs, articles, GitHub, YouTube).

| Rank | Topic | Difficulty | YouTube upside | File |
|---|---|---|---|---|
| 1 | Typed decision models (Jev / System One) | Beginner–Intermediate | Very high (newsjacking + gap) | [01-jev-typed-decision-models.md](01-jev-typed-decision-models.md) |
| 2 | Agentic coding & harness engineering | Intermediate | Very high | [02-agentic-coding-harness-engineering.md](02-agentic-coding-harness-engineering.md) |
| 3 | MCP servers (2026-07-28 spec) | Intermediate | High | [03-mcp-servers-2026-spec.md](03-mcp-servers-2026-spec.md) |
| 4 | Agent Skills (SKILL.md) | Beginner | High (quick wins) | [04-agent-skills-skill-md.md](04-agent-skills-skill-md.md) |
| 5 | Type-safe TypeScript agents (AI SDK 7) | Intermediate | High for TS audience | [05-typescript-agents-ai-sdk-7.md](05-typescript-agents-ai-sdk-7.md) |
| 6 | Agent security & guardrails | Intermediate–Advanced | High, underserved | [06-agent-security-prompt-injection.md](06-agent-security-prompt-injection.md) |
| 7 | Evals & observability (OTel GenAI) | Intermediate | Medium–High, underserved | [07-evals-observability-otel.md](07-evals-observability-otel.md) |
| 8 | Personal autonomous agents (OpenClaw) | Beginner–Intermediate | High (consumer appeal) | [08-personal-agents-openclaw.md](08-personal-agents-openclaw.md) |
| 9 | Agentic / hybrid RAG | Intermediate | Medium (needs new angle) | [09-agentic-hybrid-rag.md](09-agentic-hybrid-rag.md) |
| 10 | Realtime voice agents | Intermediate–Advanced | Medium–High | [10-realtime-voice-agents.md](10-realtime-voice-agents.md) |
| 11 | Small/local models (Gemma 4, Qwen 3.x — 3.8 is latest) | Beginner–Intermediate | Medium–High | [11-small-local-models.md](11-small-local-models.md) |

### New trending topics (added 2026-09-29)

These come from a separate trend scan covering Aug–Sept 2026 and don't overlap topics 1–11. "Priority" shows where each would sit in the ranking above.

| # | Topic | Why now | Difficulty | YouTube upside | Priority | File |
|---|---|---|---|---|---|---|
| 12 | Computer-use / browser agents (GPT-6 Astra) | Astra launched Sep 3; biggest launch of the month | Medium–High | Very high | ~#2–3 | [12-computer-use-browser-agents.md](12-computer-use-browser-agents.md) |
| 13 | Local voice cloning & AI dubbing (VoiceStudio / OmniVoice) | #1 on Trendshift monthly; Eleven v4 on Sep 28 (⚠ OmniVoice weights are non-commercial, CC-BY-NC) | Medium | Very high | ~#3–4 | [13-local-voice-cloning-dubbing.md](13-local-voice-cloning-dubbing.md) |
| 14 | Open robotics world models (FLUX 3 Action + LeRobot) | Released Sep 23; almost no build videos yet | High (hardware) | High | ~#5 | [14-open-robotics-flux-3-action.md](14-open-robotics-flux-3-action.md) |
| 15 | God's Eye View + AI agent layer | #1 on GitHub Trending in Aug; ~45k stars | Medium | Very high (clicks) | ~#6 | [15-gods-eye-view-geospatial-agent.md](15-gods-eye-view-geospatial-agent.md) |
| 16 | AI code review agents (Alibaba open-code-review) | ~42k stars; covered by InfoQ in Sept | Low–Medium | High | ~#7 | [16-ai-code-review-agents.md](16-ai-code-review-agents.md) |
| 17 | Real-time AI avatars (Gemini 3.8 Live Avatar) | Generally available since Sep 24 | Medium | High | ~#9 | [17-realtime-ai-avatars-gemini-live.md](17-realtime-ai-avatars-gemini-live.md) |
| 18 | Agent payments (x402 / AP2 / ACP) | Lightning merged into x402 on Sep 23; AP2 attack paper | Medium | Medium–High | ~#10–12 | [18-agent-payments-x402-ap2.md](18-agent-payments-x402-ap2.md) |

## Suggested publishing order

1. **Now (next 1–2 weeks):** #1 Jev. The launch window is short, so publish while the topic is still new.
2. **Flagship series, "Production AI Engineer":** #1 → #5 → #6 → #7. This is one running project: a type-safe AI SDK 7 agent with a Jev decision layer, then security hardening, then an eval pipeline. Each video stands alone, and each one points viewers to the next.
3. **Reach videos (big audiences, heavy competition):** #2, #3, #4, #8.
4. **Authority videos (less coverage, more senior audience):** #6, #7, stateless MCP (#3), harness engineering (#2).
5. **Fill-ins and shorts:** #4 as an 8–12 min skills series, #11 local models, #9 "vs" benchmark, #10 voice demo.
6. **New trend topics:**
   - Go early (right after Jev, while each launch is fresh): #12 Astra computer-use, #13 voice dubbing.
   - Next, because build videos are still rare: #14 FLUX 3 Action and #17 Live Avatar.
   - Anytime (these stay relevant longer): #15 God's Eye View, #16 code review (pairs well with #2 and #7) and #18 agent payments (pairs with #6).

## Formats that work for these topics
"X vs Y on my own data" · "I tried to break it" · "Build it in under N lines" · "Migrate to the new spec". Always show cost and latency on screen, and put the recording date in each video.

## Before each video
- Check Google Trends and YouTube autocomplete for the topic's keyword.
- Recheck versions (Jev 1.13.0, AI SDK 7.0.x, MCP 2026-07-28, OpenClaw 2.0) and pin them in the repo.
- Present vendor numbers as claims you are testing, not as facts.
