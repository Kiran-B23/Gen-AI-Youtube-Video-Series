# Publish kit · Harness Engineering (v2)

_Title patterns that reach (inspiration.md, references/web-shorts-2026-10-30.md): the viewer's question ("Why does…?"), and model vs harness as a contrast. We use the patterns, never their words. Unsafe wordings from content-plan.md stay out: "the harness doesn't matter", "Claude Code costs 5×", "proved", "bug-free", "don't shop for a harness", no harness ranking._

## Titles (pick 1)
1. **Why does my AI agent say "Done" too early?** _(default: the pinned hook question; the video answers it)_
2. Your coding agent said "Done." Your test would say no.
3. Harness engineering: pick a harness for price, build checks for "Done"

## Thumbnail concept (≤4 words of text)
The frame-0 picture, cropped tighter: the white task card with the giant tilted green **"DONE ✓"** stamp over a red test row. On-image text: **"DONE TOO EARLY?"** (3 words). Light background, no logo, no face. The green-vs-red contrast still reads at phone-grid size.

## Caption / description
Your coding agent says "Done", and it never ran your test.

The harness is everything around the model: what it reads, and what checks its work. A rule in a file (like AGENTS.md) only asks. A hook runs your test every time the agent says it's done, and the error goes back to the agent until the test passes.

Should you shop for a better harness? Researchers at UC Berkeley and Arena ran the same 7 models in Claude Code, Codex CLI and Pi on SWE-bench Lite and Terminal-Bench 2.0. Success moved only a few points between harnesses (about ±2 on one benchmark and ±5 on the other). Token cost moved 1.5 to 2× on average, and up to 5× for some model and harness pairs. Treat the results as directional: two public benchmarks, 30 sampled tasks each, and the models may have seen those tasks in training.

So pick a harness for price, and build checks for "Done": turn every mistake into a rule, plus a check. Green only means your checks passed, and AI-written tests can pass bad code, so review the test yourself.

Claude Code's hooks guide (linked below) shows how to set up a hook; other tools put it in their own settings. The task, file and test in the video are illustrative.

## Chapters (long-form)
_n/a (reel)_

## Sources (for the description / pinned comment)
- [S8] Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia (UC Berkeley + Arena), "HarnessTax: How Much Does the Harness Matter for Coding Agents?" (2026-09-16): https://harnesstax.github.io/
- [S3] Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com (2026-04-02): https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- [S1] Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): https://mitchellh.com/writing/my-ai-adoption-journey
- [S5] LangChain, "Improving Deep Agents with harness engineering" (2026-02-17), the "re-read, looks ok, stopped" failure: https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering
- [S4] Anthropic, "Effective harnesses for long-running agents" (2025-11-26): https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- [S6] LangChain, "The anatomy of an agent harness" (2026-03-10), "Agent = Model + Harness": https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
- [S2] OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11), AGENTS.md as "a map, not a manual": https://openai.com/index/harness-engineering/
- [S7] Claude Code docs, "Automate actions with hooks": https://code.claude.com/docs/en/hooks-guide

## Hashtags
#AIAgents #HarnessEngineering #CodingAgents #AIEngineering #GenAI #SoftwareTesting #LearnAI #shorts

## Pinned comment (invites replies)
What mistake does your coding agent keep repeating? Tell me below and I'll reply with a rule and a check that would catch it. Sources for every number are in the description.

## Repurposing (long-form moments → reels)
- **Explainer seed (8–12 min):** a real repo with a rule file, a hook and a test, run live (an "our test" we'd have to run ourselves), plus HarnessTax read properly: cost per task, the Pareto frontier, why a minimal harness can keep up.
- **Short #2 (Myth-buster):** "Your Claude may not need Claude Code": too close to a ranking for this channel's locks; only with a fair test of our own.
- **Short #3 (Tips):** "Three hooks worth adding today" (format, tests, a pre-done checklist), from the hooks docs [S7] and Hashimoto's habit [S1]; needs its own research and content plan.
