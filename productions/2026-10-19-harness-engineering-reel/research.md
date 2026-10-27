# Research · Harness Engineering

_Researched on 2026-10-19. Labels: company claim · independent · our test · community._

## One-line definition (by what it does)
Harness engineering is building everything around an AI model — the instructions it reads, the tools it can use, and the
automatic checks that tell it when it's wrong — so a coding agent catches and fixes its own mistakes. "Agent = Model + Harness" [S6].

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Mitchell Hashimoto (creator of Terraform, Ghostty) calls it "harness engineering": "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again." Two forms: AGENTS.md lines for simple problems (wrong commands, wrong APIs); programmed tools (scripts to take screenshots, run filtered tests) for harder ones. Each line in his Ghostty AGENTS.md answers a specific bad behaviour | [mitchellh.com · My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) | 2026-02-05 | independent (practitioner) | the habit the viewer can copy today: every mistake becomes a rule or a check | reel |
| S2 | OpenAI's post: a team built and shipped an internal beta with **no manually written code**; ~1 million lines, ~1,500 PRs merged in ~5 months, 3 engineers growing to 7, ~3.5 PRs per engineer per day; estimated ~1/10th the time of hand-writing. "Humans steer. Agents execute." Engineers' job became "designing environments, specify intent, and build feedback loops" | [OpenAI · Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) (read via r.jina.ai text mirror; direct fetch 403) · [InfoQ coverage](https://www.infoq.com/news/2026/02/openai-harness-engineering-codex) | 2026-02-11 (InfoQ 2026-02-21) | company claim | proof the idea scales; shows the human job shifts to environment + feedback | reel (optional) |
| S2b | OpenAI: AGENTS.md kept to ~100 lines as a table of contents — "give Codex a map, not a 1,000-page instruction manual"; a structured `docs/` folder is the system of record | same as S2 | 2026-02-11 | company claim | practical: keep the instructions file short, a map | reel |
| S2c | OpenAI: custom linters whose error messages are written for the agent, with fix instructions injected into its context; structural tests enforce layer order; Chrome DevTools Protocol + per-worktree logs/metrics let the agent see its own app | same as S2 | 2026-02-11 | company claim | concrete "checks" examples | reel / explainer |
| S3 | Böckeler (Thoughtworks), on martinfowler.com: a harness's controls are **guides** (feedforward: steer before the agent acts, e.g. AGENTS.md, Skills) and **sensors** (feedback: observe after it acts, e.g. tests, linters, type checkers, AI review). Feedback alone → the agent repeats mistakes; feedforward alone → rules never get checked. Sensors work best when their messages are written for the LLM (linter messages that include fix instructions). Computational checks (tests, linters) are fast and deterministic; inferential ones (LLM-as-judge) are slower and probabilistic. Caveats: functional correctness is still unsolved; AI-generated tests "not good enough yet"; harnesses direct human input, they don't remove it | [martinfowler.com · Harness engineering for coding agent users](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) | 2026-04-02 (memo 2026-02-17) | independent | the clearest mental model: before (guide) + after (check) | reel |
| S4 | Anthropic: an agent given only a high-level prompt tried to one-shot the app, declared the job done early, and marked features complete without end-to-end testing. Fix: an initializer agent writes a feature list (200+ features, all marked failing; agents may only flip `passes`), a progress file, init.sh, git commits, and browser testing via Puppeteer MCP | [Anthropic Engineering · Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | 2025-11-26 | company claim | the "says done but isn't" failure is real and documented | reel (support) |
| S5 | LangChain: same model (GPT-5.2-Codex), only the harness changed → deepagents-cli went from **52.8% to 66.5%** on Terminal Bench 2.0 (89 tasks), from outside the Top 30 to ~Top 5. Most common failure: the agent "wrote a solution, re-read its own code, confirmed it looks ok, and stopped." Fixes: a build–verify loop in the prompt, a pre-completion checklist that stops the agent before it exits, loop detection, time warnings | [LangChain · Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) | 2026-02-17 | company claim (their own agent, their own run) | the striking proof: harness alone, +13.7 points | reel (hook / reveal) |
| S6 | LangChain: "Agent = Model + Harness"; a harness is all code, configuration and execution logic that isn't the model (system prompts, tools/skills/MCP, sandbox/filesystem/browser, orchestration, hooks/middleware). "If you're not the model, you're the harness." "A raw model is not an agent." | [LangChain · The anatomy of an agent harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) | 2026-03-10 | company claim (definition) | the one-line definition | reel |
| S7 | Claude Code docs: hooks are shell commands that run at set points in the agent's lifecycle, giving "deterministic control: certain actions always happen rather than relying on the LLM to choose to run them" (e.g. run a formatter or checks after every edit) | [Claude Code docs · Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) | accessed 2026-10-19 | company docs | where the viewer adds a check today | reel (takeaway) |

## Running-example candidates
1. **(chosen, provisional)** One task card, "Add a password-reset button" (illustrative): the agent writes it, re-reads, says "Done ✓", stops — a test is red (the failure pattern in S5 and S4). Then: a guide line in AGENTS.md, a test as the check, the error message fed back, the fix, green. Carried through every beat.
2. The agent runs the wrong test command every time (S1's "wrong commands") → one AGENTS.md line fixes it forever. Good for the habit beat, too small for the whole reel.
3. OpenAI's million-line product (S2): too big to show on one object; one-line proof at most.

## Analogy candidates
- **A horse harness** (the word's origin): reins steer a powerful animal; risky (reads literal/kids-style; locks forbid cartoon horses). Words only, at most once.
- **Lane-assist + dashboard warnings**: guides before, sensors after. Adds a second world.
- **No analogy**: show the loop on the task card. Preferred (Concept: one analogy at most).

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- Correctness is still unsolved: a harness only checks what you wrote checks for; AI-written tests aren't trustworthy yet (S3).
- Inferential checks (AI reviewers) are probabilistic (S3).
- Some harness tricks are patches for today's models (LangChain calls loop detection a temporary patch, S5).
- Benchmark numbers are LangChain's own run on its own agent (S5).

## Alternatives / competitors
Not a product; related terms: prompt engineering (the words you send), context engineering (what goes into the context window). Harness engineering = the whole environment, including checks and loops (S3, S6).

## Viewer questions to answer
- Is this just prompt engineering with a new name? (No: checks and loops run code, not words — S3, S7.)
- What do I add first? (A short instructions file as a map; a test/linter the agent must run; a hook/checklist before "done".)
- Does a better model make this unnecessary? (Partly — some patches are temporary, S5; checks still catch what you specify.)

## Cut by the viewer-value filter (and why)
- Who coined it first (Hashimoto vs OpenAI vs Fowler): naming trivia.
- OpenAI team size, PRs/day, layer names: impressive but not actionable in a reel.
- Model names / version numbers (GPT-5.2-Codex), Harbor, Daytona, LangSmith: version trivia.
- The "reasoning sandwich" detail: real but a second idea.
