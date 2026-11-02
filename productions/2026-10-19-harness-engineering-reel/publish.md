# Publish kit · Harness Engineering

_Title patterns that reached (inspiration.md): the viewer's exact question ("What is…?") and a contrast with the model. We use the patterns, never their words. No unsafe wordings from content-plan.md ("models don't matter", "prompt engineering is dead", "bug-free", "never makes that mistake again")._

## Titles (pick 1)
1. **Your AI agent says "Done." The test says no. (Harness engineering)** _(default: the hook as a title; true, and the video pays it off)_
2. Harness engineering, explained on one bug
3. Same AI model, a better coding agent: what harness engineering is

## Thumbnail concept (≤4 words of text)
The s01 frame, tighter: the white task card with the giant tilted green **"DONE ✓"** stamp, and the red row below reading **"TEST: NEVER RAN"**. On-image text: **"DONE? NEVER RAN"** (3 words). Light background, no logo, no face. Readable at phone-grid size: the green vs red contrast carries it.

## Caption / description
Your coding agent says "Done"… and the test never ran. 🧪

Harness engineering is building the rules and checks around your agent's model, so "Done" has to pass a check. Agent = model + harness.

In this reel, one password-reset task (illustrative) goes through:
• Guides, before: a short instructions file (AGENTS.md), a map, not a manual
• Checks, after: a hook that runs your tests every time the agent says it's done, and sends the error back
• The habit: every mistake becomes a rule it reads, or a check it must pass

LangChain says it kept the same model, changed only the harness, and its coding agent went from solving 52.8% to 66.5% of Terminal Bench 2.0's tasks. That's their own agent and their own run.

One catch: green only means your checks passed, so write or review the test yourself.

Where to set this up: a hook is configured in your coding tool's settings. One example is Claude Code's hooks guide (linked below). The file name for agent instructions differs by tool; AGENTS.md is the one used in OpenAI's write-up.

## Chapters (long-form)
_n/a (reel)_

## Sources (for the description / pinned comment)
- [S1] Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): https://mitchellh.com/writing/my-ai-adoption-journey
- [S2] OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11): https://openai.com/index/harness-engineering/
- [S3] Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com (2026-04-02): https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- [S4] Anthropic, "Effective harnesses for long-running agents" (2025-11-26): https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- [S5] LangChain, "Improving Deep Agents with harness engineering" (2026-02-17): https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering
- [S6] LangChain, "The anatomy of an agent harness" (2026-03-10): https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
- [S7] Claude Code docs, "Automate actions with hooks": https://code.claude.com/docs/en/hooks-guide

## Hashtags
#AIAgents #HarnessEngineering #CodingAgents #AIEngineering #GenAI #SoftwareEngineering #LearnAI #shorts

## Pinned comment (invites replies)
What's the one mistake your coding agent keeps making? 👇 Drop it below, and I'll suggest the rule or the check that would catch it. (Sources for every number are in the description.)

## Repurposing (long-form moments → reels)
- **Explainer seed (8–12 min):** the full harness on one repo: guides (AGENTS.md as a map, Skills), checks (tests, linters whose errors are written for the model, type checks), computational vs inferential checks (Böckeler [S3]), and a live before/after run. All cut from this reel for depth.
- **Short #2 (Myth-buster):** "A smarter model won't always fix your agent": the same-model number [S5] as the hook, with honest framing (their own run).
- **Short #3 (Tips):** "3 lines to add to your AGENTS.md today", built from Hashimoto's habit [S1]; needs its own research and content plan.
