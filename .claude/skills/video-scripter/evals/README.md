# Evals for video-scripter

| What | How to run | Pass |
|---|---|---|
| **Package linter** (deterministic) | `python3 scripts/lint_package.py evals/fixtures/good-reel` and `… bad-reel` | good: 0 ✗ · bad: every planted error ✗ (currently 13: including the missing art-direction.md and sources list) |
| **Archetype choice** (judgement) | For each `group: archetype` case in `evals.json`, classify the prompt using only `references/archetypes/README.md`, blind to `expect_archetype` (a fresh subagent works well) | ≥ 14/15 (all of them after a chooser change), and the hybrid/definition notes match |
| **Guardrails** (judgement) | Run each `group: guardrail` case through the relevant stage and check its `expectations` | all expectations met |
| **Real packages** | Every production runs `lint_package.py` at the QA stage | 0 ✗ before handover |

When a real video teaches us something (the user's review, analytics), add a case here so the skill
can't regress on it.
