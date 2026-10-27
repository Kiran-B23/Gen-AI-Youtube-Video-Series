# Evals for video-scripter

| What | How to run | Pass |
|---|---|---|
| **Package linter** (deterministic) | `python3 scripts/lint_package.py evals/fixtures/good-reel` and `… bad-reel` | good: 0 ✗ (44 checks) · bad: every planted error ✗ (currently 13: including the missing art-direction.md and sources list; bad-reel has no animation plan, so the visual checks don't run on it) |
| **Archetype choice** (judgement) | For each `group: archetype` case in `evals.json`, classify the prompt using only `references/archetypes/README.md`, blind to `expect_archetype` (a fresh subagent works well) | ≥ 14/15 (all of them after a chooser change), and the hybrid/definition notes match |
| **Content gates** (judgement) | Run each `group: content` case through its `agent` (`content-plan` or `script-review`, `.claude/agents/`) with only the case's prompt as input | all expectations met; re-run after editing either agent or the catch / vague / absolute rules |
| **Visual gate** (judgement) | Run each `group: visual` case through the `visual-plan` agent (`.claude/agents/visual-plan.md`) with only the case's prompt (or the named fixture) as input | all expectations met: none-run → CHANGES rule 1, depth-not-shown → CHANGES rule 3, good-reel → PASS, overlay-too-long → CHANGES rule 5; re-run after editing the agent, `animation-plan.md` / `hooks.md` / `art-direction.md` templates or the motion vocabulary |
| **Visual linter** (deterministic) | `python3 scripts/lint_package.py evals/fixtures/bad-visual` | exactly 5 ✗: visual plan not passed, a cue word not in its spoken line (s02 'listens'), none-rows 3/6 with two in a row, a 14-word storyboard overlay, an empty first-frame description (good-reel: 0 ✗ across all 44 checks, incl. a motion verb per row and the running object in ≥ 60 % of rows) |
| **Content linter** (deterministic) | `python3 scripts/lint_package.py evals/fixtures/bad-content` | exactly 5 ✗: script review not passed, vague filler, unsourced absolute, catch added when the plan says skip, table ≠ read-aloud (good-reel: 0 ✗, incl. table = read-aloud) |
| **Guardrails** (judgement) | Run each `group: guardrail` case through the relevant stage and check its `expectations` | all expectations met |
| **Real packages** | Every production runs `lint_package.py` at the QA stage | 0 ✗ before handover (the visual checks run on packages dated ≥ 2026-10-16 or whose animation plan carries the "Visual plan passed" line; older packages keep their counts) |

When a real video teaches us something (the user's review, analytics), add a case here so the skill
can't regress on it.

**Goldfish comprehension (2026-10-27).** `script-comprehension` (a stateless viewer given only the read-aloud) and the
`understood` dimension of `script-review`: cases `goldfish-jargon`, `goldfish-isolated`, `review-takeaway-mismatch`,
`review-stale-goldfish`. Linter: `comprehension: Goldfish report present`, `… for the current read-aloud` (sha1 of the
read-aloud, `--read-aloud-sha1`), `script review: understood ≥ 4`; good-reel now 44/44 (it has `comprehension.md`).
