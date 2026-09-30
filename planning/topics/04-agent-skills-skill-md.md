# 4. Agent Skills (SKILL.md)

> **Rank:** 4 of 11 · **Difficulty:** Beginner · **YouTube upside:** High (quick wins) · **Build time:** 1–2 days per video (short 8–12 min series)

## 1. Overview
A skill is a folder containing a `SKILL.md` file (YAML frontmatter with at minimum `name` and `description`, followed by Markdown instructions), plus optional `scripts/`, `references/`, and `assets/`. Skills load through **progressive disclosure**: only the name and description sit in context at startup, the body loads when the skill is relevant, and bundled files load only when referenced. Idle skills therefore cost almost no context. Anthropic introduced Skills on Oct 16, 2025 and published them as an open standard at agentskills.io on Dec 18, 2025. As of June 2026, roughly 40 skills-compatible products appear on the agentskills.io showcase, including OpenAI Codex, GitHub Copilot, Cursor, Gemini CLI, and VS Code (Agentman's 2026 ecosystem report). Caveat: claims of "hundreds of thousands" or even "1.9 million" skills come from auto-indexing aggregators, so treat them as marketing. Also, third-party skills are a real supply-chain risk: one study behaviorally verified 157 malicious skills out of 98k scanned.

## 2. Why it attracts subscribers
- **Audience:** A broad beginner-to-intermediate audience of Claude Code, Codex, Copilot, and Gemini CLI users who want quick wins. Teams standardizing workflows are also interested. Short videos convert well into a series.
- **Competition gap:** There are plenty of "what is SKILL.md" explainers (DigitalOcean, Shaw Talebi, Anthony Sistilli, Appychip, PyCharm/JetBrains, Burke Holland), but most are single-agent (Claude-only or Copilot-only). Very few show **the same skill running unmodified in 4 agents**, and almost none show a script-bundled skill, measure trigger reliability, or cover vetting a third-party skill for malicious instructions.
- **Winning angle:** "One skill, four agents, zero edits (almost)." A portable, script-backed skill installed with `npx skills add`, tested in Claude Code, Codex, Copilot CLI, and Gemini CLI, with a trigger-rate scorecard and a closing security segment.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Wrote One SKILL.md and Ran It in 4 AI Agents | Full build | 10–12 min |
| 2 | Does Your Skill Actually Trigger? Claude Code vs Codex vs Copilot vs Gemini CLI | X vs Y benchmark | 10–14 min |
| 3 | I Hid Malicious Instructions in a Skill. Would You Have Caught It? | I tried to break it | 8–12 min |
| 4 | Skills vs MCP vs AGENTS.md: When to Use Which | Explainer | 8–10 min |
| 5 | SKILL.md in 60 Seconds | Explainer short | <60 s |

**Thumbnail / hook:** One glowing `SKILL.md` file in the middle, with arrows to four agent logos and a checkmark on each. Big text: "WRITE ONCE." Hook line (first 15 s): *"This folder is 40 lines of Markdown and one script, and it just wrote my release notes in Claude Code. Now watch the exact same folder, with no edits, do it in Codex, Copilot, and Gemini CLI."*

## 4. Project build plan
**Project:** *"Write one skill, run it in 4 agents."* Build a "release-notes-from-git" skill (primary) or a "brand-style PDF report" skill (alternative) with a bundled script.
**Stack:** agentskills.io spec; `skills` CLI (`npx skills`); Claude Code, Codex CLI, GitHub Copilot CLI, Gemini CLI; Node or Python script (`git log` → grouped Markdown); optional `skills-ref` validator from the agentskills repo; a sample OSS repo with conventional commits.
**Steps:**
1. **Scaffold** `release-notes-from-git/SKILL.md`. The `name` must match the folder name exactly: lowercase letters, digits, and hyphens, 64 characters max. The `description` (1,024 characters max) must say *what* the skill does and *when* to use it. That description is what drives triggering.
2. **Write the instruction body.** Steps to find the last tag, run the script, group commits into Features/Fixes/Breaking, and follow the output format. Keep it short and move long guidance into `references/style.md`, which the body points to only when needed.
3. **Bundle** `scripts/collect_commits.(js|py)` that outputs JSON of commits since the last tag. The skill tells the agent to run it rather than parse `git log` itself (a deterministic step).
4. **Validate** against the spec (frontmatter fields, folder layout), and stick to portable frontmatter only.
5. **Publish** the skill to a GitHub repo and install it with `npx skills add <you>/<repo> -a claude-code -a codex ...`. Show where each agent's files land (`.claude/skills`, `.agents/skills`, `.github/skills`, `.gemini/skills`).
6. **Run the same prompt** ("write release notes for v1.4") in Claude Code, Codex CLI, Copilot CLI, and Gemini CLI. Record whether the skill triggered implicitly, needed explicit invocation (`/skills`, `$skill`), or failed.
7. **Build a trigger scorecard.** Use 10 prompts per agent (5 that should trigger, 5 that shouldn't) and tally true and false triggers. Then tweak the description once and re-run.
8. **Security segment.** Take a third-party skill, read its SKILL.md and scripts, and point out the risk patterns: network calls, `curl | sh`, hidden instructions, overly broad descriptions. Run a scanner (e.g. Snyk Agent Scan or Cisco Skill Scanner, if available) and show what it misses.
9. **Wrap up.** Show a portability table covering which frontmatter keys each agent honors and any agent-specific extras (e.g. Codex's `agents/openai.yaml`, Claude Code's invocation control).

**Demo moments:** The same folder producing near-identical release notes in four terminals side by side. A description tweak turning a non-trigger into a trigger. The context meter barely moving with 20 skills installed (progressive disclosure). A malicious line hidden in a "helpful" skill.
**On-screen numbers:** Trigger rate per agent (true and false positives out of 10), tokens added to context at idle vs activated, time to finished notes per agent, lines in SKILL.md, and number of edits needed for portability (target: 0).

## 5. Resources
### Official docs & specs
- [Agent Skills (agentskills.io)](https://agentskills.io/). The official home of the open standard and its showcase.
- [Specification: Agent Skills](https://agentskills.io/specification). Frontmatter rules, folder structure, and progressive disclosure.
- [agentskills/agentskills](https://github.com/agentskills/agentskills). Spec and documentation repo.
- [Agent Skills overview (Claude Platform Docs)](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview). Anthropic's docs, covering pre-built pptx/xlsx/docx/pdf skills and custom skills.
- [Get started with Agent Skills in the API](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) and [Using Agent Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide)
- [Extend Claude with skills (Claude Code Docs)](https://code.claude.com/docs/en/skills). Claude Code's extensions to the standard (invocation control, subagent execution).
- [Build skills (Codex)](https://developers.openai.com/codex/skills). Codex skill invocation (`/skills`, `$`), `$skill-creator`, and `agents/openai.yaml`.
- [About agent skills (GitHub Docs)](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) and [Adding skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Agent Skills (Gemini CLI)](https://geminicli.com/docs/cli/skills/), [Creating Agent Skills](https://geminicli.com/docs/cli/creating-skills/), and [Skill best practices](https://geminicli.com/docs/cli/skills-best-practices/)
- [Skills CLI docs (skills.sh)](https://www.skills.sh/docs/cli). `npx skills add`, `--list`, `--skill`, `-a <agent>`, `-g`, `--all`.

### Articles & blog posts
- [Introducing Agent Skills (Anthropic)](https://www.anthropic.com/news/skills). The original announcement.
- [Equipping agents for the real world with Agent Skills (Anthropic Engineering)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills). The design rationale and progressive disclosure, Oct 16, 2025.
- [What Are Agent Skills and How To Use Them (Strapi)](https://strapi.io/blog/what-are-agent-skills-and-how-to-use-them). The beginner explainer named in the playbook.
- [The Agent Skills Ecosystem in 2026 (Agentman)](https://agentman.ai/blog/agent-skills-ecosystem-report-2026). Source of the "~40 products" figure; also cites SkillsBench (average quality 6.2/12; curated skills added +16.2 pp to pass rates).
- [Anthropic makes agent Skills an open standard (SiliconANGLE)](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/). Dec 18, 2025 coverage.
- [GitHub Copilot now supports Agent Skills (GitHub Changelog)](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/)
- [Introducing skills, the open agent skills ecosystem (Vercel)](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem) and [Agent Skills: Creating, Installing, and Sharing (Vercel KB)](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context)
- [Agent Skills Explained: How SKILL.md Files Work (Firecrawl)](https://www.firecrawl.dev/blog/agent-skills)
- [SKILL.md Cross-Agent Compatibility: Tested Across 6 Agents (Agensi)](https://www.agensi.io/learn/skill-md-cross-agent-compatibility-tested). Reports 8 of 10 skills working identically everywhere. Replicate this claim rather than quoting it.
- [Malicious AI agent skills can slip past the scanners built to stop them (Help Net Security)](https://www.helpnetsecurity.com/2026/07/09/malicious-ai-agent-skills-scan/)
- [Malicious Agent Skills in the Wild: A Large-Scale Security Empirical Study (arXiv)](https://arxiv.org/html/2602.06547v1). 157 malicious skills confirmed out of 98,380 behaviorally verified.
- [The Complete Guide to Building Skills for Claude (Anthropic PDF)](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) (unverified: not opened)

### GitHub repos & templates
- [anthropics/skills](https://github.com/anthropics/skills). Anthropic's official example skills, plus the [spec copy](https://github.com/anthropics/skills/blob/main/spec/agent-skills-spec.md). It can also be added as a Claude Code plugin marketplace.
- [vercel-labs/skills](https://github.com/vercel-labs/skills). Source for the `npx skills` CLI.
- [github/awesome-copilot: skills list](https://github.com/github/awesome-copilot/blob/main/docs/README.skills.md)
- [gmh5225/awesome-skills](https://github.com/gmh5225/awesome-skills). A cross-agent awesome list.
- [eworthing/agent-skills](https://github.com/eworthing/agent-skills). Reusable skills for Claude Code, Codex, Gemini CLI, and Copilot CLI (useful as portability references).
- [google-gemini/gemini-cli skills docs (source)](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/skills.md)

### YouTube videos (study / beat these)
- [Claude Skills clearly explained in under 10 minutes](https://www.youtube.com/watch?v=DB_t1v4xOfQ). DigitalOcean · Clean explainer; Claude-only.
- [Claude Skills Explained in 23 Minutes](https://www.youtube.com/watch?v=vEvytl7wrGM). Shaw Talebi · A deeper explainer; single agent.
- [The complete guide to Agent Skills](https://www.youtube.com/watch?v=fabAI1OKKww). Burke Holland · The VS Code/Copilot angle; a strong competitor on the "complete guide" framing.
- [Agent Skills: The Complete Guide](https://www.youtube.com/watch?v=TZ-ilGRnN1w). PyCharm, a JetBrains IDE · The JetBrains/IDE perspective.
- [Agent Skills Spec Explained: How to Build Portable Capabilities for AI Agents](https://www.youtube.com/watch?v=3_DEFblo49I). Appychip · Spec-focused; covers portability in theory, not cross-agent testing.
- [My AGENTS.md & SKILLS.md Breakdown (Don't copy them)](https://www.youtube.com/watch?v=e1snsuY4lTI). Theo - t3.gg · High reach and opinionated; covers personal setups.
- [How Anthropic Uses Skills in Claude Code: Lessons from Building It](https://www.youtube.com/watch?v=2YuBrgGW6MY). TL;DR Studio · A recap of Thariq's (Anthropic) guidance.
- [Progressive Disclosure in Claude Code](https://www.youtube.com/watch?v=DQHFow2NoQc). Developers Digest · The context-cost angle.
- [Claude Skills Just Fixed MCP's Biggest Problem (First Impressions)](https://www.youtube.com/watch?v=A-ZScvLMd-U). JeredBlu · From Oct 2025, the launch-era Skills vs MCP take.
- [Skills.md from Scratch: Build a Skill-Driven Coding Agent](https://www.youtube.com/watch?v=OhgDEZfHsvg). Alexey Grigorev · Implements skill loading in your own agent (a good crossover with Topic 2).
- [SKILLS.md explained in 2 minutes](https://www.youtube.com/watch?v=7XwP9ueIRaE). Anthony Sistilli · A short-form benchmark for video #5.
- **Channels to watch:** Theo - t3.gg, Burke Holland, DigitalOcean, Shaw Talebi, Developers Digest, PyCharm/JetBrains, AI Engineer.

### Tools & install
```bash
# Skills CLI (Vercel Labs) — package manager for agent skills
npx skills add anthropics/skills --list          # browse a repo's skills
npx skills add <you>/<repo> --skill release-notes-from-git -a claude-code -a codex -y
npm i -g skills                                  # latest seen: 1.7.0
# Agents to test in
npm i -g @openai/codex                           # Codex CLI (0.159.0 seen)
# Claude Code, GitHub Copilot CLI, Gemini CLI: install per their official docs above
# Skill locations to show on screen
#   Claude Code: .claude/skills/   ~/.claude/skills/
#   Copilot:     .github/skills/ .claude/skills/ .agents/skills/   ~/.copilot/skills/
#   Gemini CLI:  .gemini/skills/ .agents/skills/   ~/.gemini/skills/
```

### Not found — search for:
- The rywalker.com analysis that Agentman cites for the "~40 products" count. Search: `rywalker agent skills agentskills.io showcase products`.
- Direct links to Snyk Agent Scan / Cisco Skill Scanner / NVIDIA SkillSpector project pages (they appeared only as mentions in search summaries). Search: `snyk agent-scan skills github`, `cisco skill-scanner github`, `NVIDIA SkillSpector`.
- A `skills-ref` validator (mentioned in some guides as part of the agentskills repo). Search: `agentskills skills-ref validate`.

## 6. Caveats & fact-checks before filming
- **Skill counts are marketing.** Aggregator numbers (SkillsMP about 1.9M, "hundreds of thousands") come from auto-scraping GitHub. The only defensible figure is "~40 products on the agentskills.io showcase as of June 2026 (Agentman)." Re-count the showcase on filming day.
- **Dates:** Skills launched Oct 16, 2025, and the open standard was published Dec 18, 2025. Don't mix the two up.
- **Portability isn't perfect:** Agent-specific frontmatter and extras (Claude Code invocation control and subagents, Codex `agents/openai.yaml`) aren't portable. Stick to `name` + `description` for the cross-agent demo and show honestly where edits were needed.
- **Triggering is probabilistic.** Run each prompt several times, report rates rather than single anecdotes, and note the model and version for each agent.
- **Security stats vary by study** (157/98,380 confirmed malicious; Snyk's 36.82% "at least one flaw" figure is a different metric). Name the study for each number. Never run unvetted skills with scripts outside a sandbox.
- **Telemetry:** The `skills` CLI collects anonymous telemetry by default (skill name, files, timestamp). Mention it and show how to opt out, per its README.
- **Pin versions:** Record `skills` 1.7.x, Codex CLI 0.159.x, and the Claude Code / Copilot CLI / Gemini CLI versions (`--version` on screen), the agentskills.io spec revision date, and the filming date.
