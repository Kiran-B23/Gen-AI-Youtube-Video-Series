# Content plan · Harness Engineering

_Reel (9:16) · Concept, standard sheet · viewer: curious practitioner who uses a coding agent · ~75–90 s, ~170–200 words · 2026-10-19._
_Written by the `content-plan` agent; saved by the main session because the agent's write timed out on permission. Source check: S7 re-confirmed by the agent; S5 (model held fixed, only the harness changed, 52.8 → 66.5) confirmed directly from langchain.com by the main session on 2026-10-19; S1/S3/S4 rely on research.md's quotes from the same day._

## Viewer's question
"What is harness engineering, and what would I actually do differently with my coding agent?"

## Core message
Harness engineering is building the rules and checks around your agent's model, so "Done" has to pass a check.

## Must include
| # | Point | Source | Label |
|---|---|---|---|
| 1 | The harness is everything around the model that isn't the model: the instructions it reads, the tools it uses, the checks that tell it it's wrong. "Agent = Model + Harness." | S6, S3 | company claim (definition) · independent |
| 2 | The failure: the agent writes the code, re-reads it, decides it looks fine, says done, stops. It never ran the test. LangChain's most common failure; Anthropic reports features marked complete without end-to-end testing. | S5, S4 | company claim |
| 3 | Guides steer the agent before it acts (a short AGENTS.md, "a map, not a manual"); checks look at the result after (tests, linters, type checkers). Only one of them fails: without checks the rules are never verified, and with only checks the agent repeats mistakes. | S3, S2b | independent · company claim |
| 4 | The loop: the check runs every time (a hook or a check before the agent may finish), the error goes back into the agent's context with a hint on how to fix it, the agent fixes and runs it again, and it passes. Messages work best when written for the model. | S7, S5, S3, S2c | official docs · company claim · independent |
| 5 | LangChain kept the same model, changed only the harness, and says its coding agent went from 52.8% to 66.5% on a coding benchmark. Their agent, their run. | S5 | company claim |
| 6 | The habit: every mistake becomes a rule it reads (one AGENTS.md line) or a check it must pass (a script or test). | S1 | independent |

## Leave out
| Item | Why it's out |
|---|---|
| Who coined it first, Feb 2026 dates, Hashimoto's credentials | trivia |
| OpenAI's no-manual-code / ~1M lines / PRs / team size / "1/10th the time" | company claim needing a longer caveat; nothing the viewer can act on; leans toward the locked "AI writes all code" |
| GPT-5.2-Codex, deepagents-cli, Terminal Bench 2.0 (89 tasks), Top 30 → Top 5 | version/leaderboard trivia; benchmark name goes in the description only |
| Reasoning sandwich, loop detection, time warnings | second ideas; some are temporary patches |
| Anthropic initializer agent, 200+ feature list, init.sh, Puppeteer | too much machinery; S4 is used only for the failure |
| Computational vs inferential checks | second idea |
| DevTools, per-worktree logs, structural tests | explainer depth |
| Prompt → context → harness history | Concept don't (history lesson) |
| Horse / lane-assist analogies | no analogy; the card shows the mechanism |
| "Patches are temporary as models improve" | doesn't change what the viewer does today |
| Product plugs, other creators' lines | off-message / lock |

## Catch decision
**Catch:** include
**Why:** material. The payoff is a green check, and the hype hides that green only means the checks you wrote passed. Agent-written or agent-edited tests make it meaningless, so the viewer must own the check. Independent source; one sentence. The benchmark being LangChain's own run is handled in the wording, not as a catch.
**Exact point:** "Green only means your checks passed. A harness catches what you test for, so write or review the test yourself." [S3]

## Running example
"Add a password-reset button" task card (illustrative) with one failing test the viewer wrote (e.g. `✗ sends reset email`). The agent writes the code, re-reads it, stamps DONE ✓ and stops; the test is red because it was **never run**. Then a guide line in AGENTS.md ("Run the tests before you say done"); then a hook / pre-done check runs the test, red, the error goes back, the agent fixes it, green; then the next mistake becomes a new line/check. Why: every coding-agent user has seen a false "done" (S4, S5), and the fix can go into their repo the same day. No second task.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "Your coding agent says 'Done.' The test says it isn't." | common documented failure, not universal | Safe as an illustrative scenario; unsafe: "agents always lie about done", "agents never test" | S4, S5 |
| "The fix might not be a smarter model." | same-model gain; models still matter | Safe as written; unsafe: "isn't a smarter model", "models don't matter", "stop blaming the model" | S5 |
| "Done ✓" at the payoff | passing = your checks passed; correctness unsolved | "Now the test passes, so 'Done' means something." Unsafe: correct / bug-free / guaranteed | S3 |
| "Same model" | model held fixed | Safe | S5 |
| "Only the harness changed" / "Nothing retrained" / "didn't touch the model" | LangChain's harness includes prompts, tools, middleware, reasoning-effort budgeting | "LangChain changed only the harness around it." Avoid "nothing about the model changed", "same settings"; drop "Nothing retrained" | S5 |
| "52.8 → 66.5" | LangChain's own agent and run, one benchmark | "LangChain says its coding agent went from 52.8 to 66.5 percent on a coding benchmark. Their agent, their test." Unsafe: "26% jump", "14 percent better" (13.7 points), "proven", "top 5", "we tested", "your agent will score higher" | S5 |
| "…never makes that mistake again" | Hashimoto's stated aim, not a guarantee | "Every mistake becomes a rule it reads or a check it must pass." If quoted, attribute as his goal | S1 |
| "The agent catches its own mistake" | the check catches it; the agent fixes it | "The test catches it. The agent reads the error and fixes it." | S3, S5 |
| "A hook always runs your check" | "certain actions always happen rather than relying on the LLM to choose" | "A hook runs your check every time, not only when the agent decides to." | S7 |
| "The agent can't stop until the test passes" | Stop hook sends a reason back "so it keeps working"; enforces only what you configured | Unsafe. "A check before 'done' sends it back to work." | S7, S5 |
| "Agent = Model + Harness" | LangChain's formula | Safe as a definition; attribute "If you're not the model, you're the harness" | S6 |
| "Prompt engineering is dead" / "just renamed" | a harness also runs code | Unsafe (lock). "It's more than the prompt: it's checks that actually run." | S3, S7 |
| "Keep AGENTS.md short / 100 lines" | OpenAI ~100 lines, "a map, not a 1,000-page instruction manual" | "Keep it short, a map, not a manual." If the number is used: "OpenAI keeps theirs around 100 lines" | S2b |
| "free" / "first" / "best" / "only way" | no source | don't use | n/a |

## Depth (what the viewer must see, not just hear)
- The broken loop: write → re-read → DONE ✓ → stop, the test row visibly never run.
- Same model in the centre: a guide lights up before it acts, a check after; "Agent = Model + Harness" assembles from them.
- The loop closing: the hook fires, red, the error text travels back into the agent's context, edit, re-run, green; only then is DONE earned.
- The harness grows by one new line/check; then "52.8% → 66.5%" labelled "same model · LangChain's own run".

## Status
- [x] Content plan ready (2026-10-19)

_Owner approved this plan on 2026-10-19 (reply "Approve")._
_Runtime: ~105–112 s (240 words at 2.3 w/s, + pauses), above the 75–90 s band; accepted by the owner on 2026-10-29, who approved the script at that length (script review 2026-10-28: every beat carries a must-include, the catch or the recap)._
