# 2. Agentic coding & harness engineering

> **Rank:** 2 of 11 · **Difficulty:** Intermediate · **YouTube upside:** Very high (huge audience) · **Build time:** 2–4 part series (roughly 1 week of build + filming)

## 1. Overview
Coding agents (Claude Code, Codex, Cursor, Copilot) are now mainstream. JetBrains' Developer Ecosystem Survey 2026 (15,000+ devs, May–July 2026) found 90% of professional developers use AI coding agents at least weekly and 68% daily, with Claude Code at about 39% adoption at work. OpenAI reported Codex at "more than 5 million weekly active users" (June 2026, via Constellation Research). The craft has shifted from prompting to **harness engineering**, summed up as "Agent = Model + Harness" (Birgitta Böckeler, martinfowler.com). The best-known proof point: LangChain took deepagents-cli from outside the Top 30 to the Top 5 on Terminal Bench 2.0 (52.8% → 66.5%) by changing only the harness, keeping the model (gpt-5.2-codex) the same. Caveat: Marmelab's Sept 24, 2026 audit found 60% of testable harnesses have no tests or evals. It also found prose rules (CLAUDE.md/AGENTS.md) are followed only 4–16% of the time, versus executable guards. Harness claims need measurement, not vibes.

## 2. Why it attracts subscribers
- **Audience:** Working developers who already use Claude Code/Codex daily and want to know why agents fail. That means intermediate-to-senior engineers, tech leads, and people building internal agents. It's the biggest developer audience in AI right now.
- **Competition gap:** Existing videos are mostly concept explainers (Cole Medin, Google Cloud Tech, Pyronix), conference talks (AI Engineer, AI Native Dev, Thoughtworks), or "build a loop from scratch" tutorials (Neural Breakdown with AVB, AWS Developers, Bitswired). Almost none **measure** a harness: the same model and the same bugs, run with and without harness features, with pass rate, cost, and time shown on screen. Marmelab's "only 11 repos actually test their harness" finding is the angle nobody has filmed.
- **Winning angle:** "Same model, better harness: I measured every feature." Build the harness live in about 300 lines, then do ablations (remove the test sensor, remove compaction, prose rule vs hook) against 10 real bugs. Credibility comes from showing the numbers.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Built a Coding Agent Harness in 300 Lines (and It Beat the Raw Model) | Full build | 25–35 min |
| 2 | Same Model, 3 Harnesses: Claude Agent SDK vs Deep Agents vs My 300 Lines on 10 Real Bugs | X vs Y benchmark | 18–25 min |
| 3 | Your CLAUDE.md Is Being Ignored: Prose Rules vs Hooks, Measured | I tried to break it | 12–15 min |
| 4 | Harness Engineering Explained in 60 Seconds: Agent = Model + Harness | Explainer short | <60 s |
| 5 | Add a Permission Gate to Your Coding Agent (Jev / small-model classifier) | Full build (series pt. 3) | 15–20 min |

**Thumbnail / hook:** Split screen showing the same model logo on both sides. Left: "RAW MODEL 3/10 bugs". Right: "MY HARNESS 8/10". Center label: "Same model." Hook line (first 15 s): *"LangChain jumped 25 spots on Terminal Bench without touching the model. Today I'll show you exactly which harness pieces make that happen, and I'll measure every one of them on real bugs."* (Replace the example scores with your measured results before publishing.)

## 4. Project build plan
**Project:** *"Build a mini coding-agent harness in 300 lines."*
**Stack:** TypeScript (AI SDK 7 `ToolLoopAgent`) or Python (Claude Agent SDK as the "pro harness" baseline); LangChain Deep Agents as a second baseline; vitest/pytest; git worktrees; optional Jev or a small model as the permission gate; Codex CLI as a reference harness.
**Steps:**
1. **Pick the bug set.** Choose 10 real bugs from a small OSS repo, each with a failing test. Freeze the commit hashes, then create one git worktree per run so every attempt starts clean.
2. **Build the bare loop** (about 40 lines). The loop is: model call → tool calls → results appended → repeat, with a step cap. This is your "raw model" baseline.
3. **Add tools.** `read_file`, `write_file`/`apply_patch`, `list_dir`, `grep`, `bash` (with a timeout). Keep the tool count small, since Marmelab cites Vercel going from 80% to 100% success after cutting 80% of its tools.
4. **Add a context file.** Load AGENTS.md (build/test commands, conventions, files the agent must not touch) into the system prompt.
5. **Add a test-runner sensor.** After each edit, automatically run the failing test and feed the pass/fail output back to the model. This is the self-verification loop from LangChain's writeup and Böckeler's "sensors."
6. **Add context compaction.** When the token count passes a threshold, summarize older turns and keep the most recent tool outputs verbatim.
7. **Add a permission gate.** Classify each bash command as allow, ask, or deny (a regex allowlist plus a Jev or small-model classifier for unclear cases), and log every decision.
8. **Add doom-loop detection.** If the same tool call with the same arguments happens 3 times, inject a "change strategy" message (LangChain-style middleware).
9. **Benchmark with ablations.** Run the raw loop, then the full harness, then the full harness minus each feature. Repeat the whole set with Claude Agent SDK and Deep Agents on the same model. Run each configuration 3 times to measure variance.
10. **Publish.** Release the repo plus a results table (CSV) and a short README explaining the method.

**Demo moments:** The raw model "fixing" a bug by deleting the test (the sensor catches it). The permission gate blocking `rm -rf` or `git push --force` live. The doom-loop detector firing. A side-by-side terminal race between the raw loop and your harness.
**On-screen numbers:** Bugs fixed out of 10 for each configuration (mean ± range across 3 runs), $ per solved bug, wall-clock time per bug, tokens per bug (before and after compaction), number of permission-gate blocks and false blocks, and line count of the harness.

## 5. Resources
### Official docs & specs
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html). Birgitta Böckeler on martinfowler.com, the source of "Agent = Model + Harness."
- [Maintainability sensors for coding agents](https://martinfowler.com/articles/sensors-for-coding-agents.html). Böckeler's follow-up on sensors, which directly supports step 5.
- [Harness Engineering: first thoughts (memo)](https://www.martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html). An earlier short memo in the same series.
- [Agent SDK overview (Claude Code Docs)](https://code.claude.com/docs/en/agent-sdk/overview). The Claude Code harness as a library for Python and TS. Also at [platform.claude.com](https://platform.claude.com/docs/en/agent-sdk/overview).
- [Agent SDK Quickstart](https://platform.claude.com/docs/en/agent-sdk/quickstart). The bug-fixing agent quickstart.
- [Deep Agents overview (LangChain Docs)](https://docs.langchain.com/oss/python/deepagents/overview). The "batteries-included agent harness."
- [Codex CLI docs](https://developers.openai.com/codex/cli). OpenAI's terminal coding agent.
- [AI SDK: ToolLoopAgent](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) and [WorkflowAgent](https://ai-sdk.dev/docs/agents/workflow-agent). ToolLoopAgent defaults to a 20-step cap; WorkflowAgent has no default cap. See also [Tool Approvals](https://ai-sdk.dev/docs/agents/tool-approvals) and [Loop Control](https://ai-sdk.dev/docs/agents/loop-control).
- [AGENTS.md](https://agents.md/). The open format for agent context files, now stewarded by the AAIF / Linux Foundation.
- [Terminal-Bench](https://www.tbench.ai/) and the [Terminal-Bench 2.0 leaderboard (Snorkel)](https://snorkel.ai/leaderboard/terminal-bench-2-0/). 89 containerized tasks, with one leaderboard row per agent + model pair.

### Articles & blog posts
- [The importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026). Phil Schmid, Jan 5, 2026. Argues harnesses must stay lightweight to survive the Bitter Lesson. [HN thread](https://news.ycombinator.com/item?id=46531173).
- [The State Of AI Harness Engineering 2026](https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html). Marmelab, Sept 24, 2026. Covers 246 repos and 57 publications; 60% of harnesses are untested; prose rules are followed 4–16% of the time.
- [Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering). LangChain's own writeup of the Top 30 → Top 5 result.
- [Harness Engineering: A Guide to AI Coding Agents](https://www.faros.ai/blog/harness-engineering). Faros, the source of the "without changing the underlying model" framing.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents). Anthropic Engineering.
- [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk). Anthropic Engineering.
- [AI Coding Agents: Adoption Trends](https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/). JetBrains, Aug 2026, with the 90% weekly / 68% daily / Claude Code ~39% figures.
- [OpenAI touts broadening Codex usage with 5 million weekly active users](https://www.constellationr.com/insights/news/openai-touts-broadening-codex-usage-5-million-weekly-active-users). Constellation Research.
- [What is harness engineering? (Thoughtworks podcast)](https://www.thoughtworks.com/insights/podcasts/technology-podcasts/what-harness-engineering)

### GitHub repos & templates
- [walkinglabs/awesome-harness-engineering](https://github.com/walkinglabs/awesome-harness-engineering). Articles, playbooks, benchmarks, and specs.
- [ai-boost/awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering). Tools, patterns, evals, memory, MCP, and permissions.
- [Jiaaqiliu/Awesome-Harness-Engineering](https://github.com/Jiaaqiliu/Awesome-Harness-Engineering) and [yenanjing/awesome-harness-engineering](https://github.com/yenanjing/awesome-harness-engineering). Alternative lists; several similarly named lists exist, so pick one and credit it.
- [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents) (Python) and [langchain-ai/deepagentsjs](https://github.com/langchain-ai/deepagentsjs) (JS). See also the [examples](https://github.com/langchain-ai/deepagents/tree/main/examples).
- [langchain-samples/deepagents-deep-dive](https://github.com/langchain-samples/deepagents-deep-dive). Runnable notebooks.
- [openai/codex](https://github.com/openai/codex). The open-source Codex CLI, useful as a reference harness to read.
- [agentsmd/agents.md](https://github.com/agentsmd/agents.md). The AGENTS.md format repo.
- [harbor-framework/terminal-bench-2-1](https://github.com/harbor-framework/terminal-bench-2-1). The Terminal-Bench 2.1 task set, if you want an official harness to run.

### YouTube videos (study / beat these)
- [Harness Engineering: What Separates Top Agentic Engineers Right Now](https://www.youtube.com/watch?v=ulNsa0sD8N0). Cole Medin · A concept and workflow overview; no controlled benchmark.
- [The Next Evolution of AI Coding Is Harnesses - Here's How to Build Them](https://www.youtube.com/watch?v=qMnClynCAmM). Cole Medin · A build-oriented video. Study its pacing; beat it with measurements.
- [Let's build a Coding Agent Harness from Scratch (Step by Step, No frameworks)](https://www.youtube.com/watch?v=Lu1UWqVTbQg). Neural Breakdown with AVB · The closest competitor to video #1. It builds features but doesn't do ablations.
- [Harness engineering beyond skills: Using sensors to keep your coding agent in check](https://www.youtube.com/watch?v=uLWOLmeHOSE). Thoughtworks · Böckeler's sensors idea as a talk. Cite it for the concept.
- [Harness Engineering: How to Build Software When Humans Steer, Agents Execute](https://www.youtube.com/watch?v=am_oeAoUhew). AI Engineer (Ryan Lopopolo, OpenAI) · Conference talk; the insider view from the Codex team.
- [Harness Engineering Explained: Inside the Stack Behind Antigravity, Claude Code & Cursor](https://www.youtube.com/watch?v=F8EZJAm9iO8). Google Cloud Tech · A vendor explainer at the architecture level.
- [Claude Agent SDK [Full Workshop]](https://www.youtube.com/watch?v=TqC1qOfiVcQ). AI Engineer (Thariq Shihipar, Anthropic) · Authoritative SDK walkthrough for your baseline.
- [Agents Are Just Loops](https://www.youtube.com/watch?v=3zvWHe94xCY). AWS Developers · A minimal-loop explainer, good for the short-form angle.
- [The Importance of Agent Harness in 2026](https://www.youtube.com/watch?v=MIaN7xLrvN8) (unverified: couldn't confirm the channel) · Appears to be a video version of Phil Schmid's post.
- **Channels to watch:** Cole Medin, AI Engineer, AI Native Dev, Thoughtworks, Neural Breakdown with AVB, Owain Lewis ([Agent Loops: Complete Guide](https://www.youtube.com/watch?v=RVEaDvh6f5A)).

### Tools & install
```bash
# Claude Agent SDK (TS / Python)
npm i @anthropic-ai/claude-agent-sdk          # latest seen: 0.3.284
pip install claude-agent-sdk                   # latest seen: 0.2.161
# LangChain Deep Agents
pip install deepagents                         # latest seen: 0.7.19
npm i deepagents                               # JS, latest seen: 1.14.1
# Codex CLI
npm i -g @openai/codex                         # latest seen: 0.159.0
# AI SDK 7 (ToolLoopAgent / WorkflowAgent) — Node 22+
npm i ai@7 @ai-sdk/workflow zod
# Test runners + isolation
npm i -D vitest   |   pip install pytest
git worktree add ../run-01 <commit>
```

### Not found — search for:
- A standalone Faros page that ranks LangChain "30th → 5th". The Faros harness guide above states it, but check the exact wording on the page before quoting.

## 6. Caveats & fact-checks before filming
- **LangChain's Terminal Bench result** is self-reported: 52.8% → 66.5% with gpt-5.2-codex. Say "LangChain reports" on camera. Terminal-Bench has since moved to 2.1 (and Artificial Analysis lists a 4.0), so say "on Terminal Bench **2.0**" specifically.
- **JetBrains figures** (90% weekly, 68% daily, ~39% Claude Code) come from the May–July 2026 survey. The US-specific 47% figure in the playbook wasn't re-verified here, so check the JetBrains post before citing it.
- **Codex "5M+ WAU / 20% knowledge workers"** is an OpenAI-reported figure relayed by Constellation. Later reports mention 8M+ Codex users (The New Stack), so use the newest number with its date.
- **Marmelab's 4–16% rule-adherence** comes from its audit of published studies, not a universal constant. Present it as "reported in."
- **Benchmark hygiene:** Use the same model, temperature, step cap, and bug set; run 3 or more times; report variance. Don't cherry-pick bugs after seeing results. Freeze the list first.
- **Safety:** Run the bash tool in a container or throwaway worktree. Never demo the permission gate against a real home directory.
- **Pin versions:** Record the model ID/snapshot, `@anthropic-ai/claude-agent-sdk`, `deepagents`, `@openai/codex`, and `ai@7.x` versions in the README, plus the date filmed (2026-09-29). These packages ship weekly.
