# Script review · Harness Engineering

## Script review · 2026-10-28

_Reviewed script-reel.md against content-plan.md (owner-approved 2026-10-19), research.md, brief.md, hooks.md and script-comprehension.md. Linter run on 2026-10-28: 30/48. The script-level failures are "sentences ≤ 16 words (#6)", "table = read-aloud (97 %)" and "script-comprehension.md: planned catch present". That last one is a false hit: the linter globs `script-*.md`, so it reads the Goldfish report as a script._

### Gate: the Goldfish report is stale (stop condition)
- The linter and this gate read `comprehension.md`, but the report is saved as `script-comprehension.md`.
- The report has no `read-aloud sha1:` line.
- It was run on the 222-word first draft. The read-aloud has since changed: 256 words, with four fixes and the edits below.
- Fix: apply the blocking items below first. Then re-run the `script-comprehension` agent on `lint_package.py <folder> --read-aloud`. Save its report as `comprehension.md` with `read-aloud sha1: <lint_package.py <folder> --read-aloud-sha1>`. Delete `script-comprehension.md`, or move its "Fixes applied" table into `comprehension.md` under the report.
- "Understood" is scored only provisionally. The old report had two blocking LOST ME items on must-include terms: "hook" (#4) and "LangChain" (#5). Both are rewritten now, but no fresh listener has confirmed the rewrites work.

VERDICT: CHANGES
scores: plan 3 · specific 5 · accurate 4 · clear 4 · value 5 · spoken 4 · match 2 · hook 5 · structure 5 · understood 3

blocking:
- gate: comprehension.md is missing or stale → re-run script-comprehension on the current read-aloud and record the sha1 (see above).
- beat 7 / beat 15 (table = read-aloud, 97 %): the table says "like AGENTS.md," and "66.5 percent … up from 52.8". The read-aloud says "like agents dot M D," and "sixty-six point five … fifty-two point eight". Fix: make the table's spoken lines the exact read-aloud words. The on-screen text and the `names` entry keep AGENTS.md / 52.8% → 66.5% for captions. (The voice reads the read-aloud.)
- beat 6 (17 words, linter ✗): "The harness is everything around the model: what it reads first, and what checks its work after." → "The harness is everything around the model: what it reads first, what checks its work after." (16 words; S6, S3)
- beat 11 (must-include #4 is only partly covered: the plan has "the error goes back … with a hint on how to fix it" and "messages work best when written for the model"): "Red. The error goes straight back to the agent." → "Red. The error, with a fix hint, goes straight back to the agent." On-screen: "✗ sends reset email · hint: call the email service (illustrative)". (S3: sensors work best when their messages are written for the LLM; S2c: fix instructions injected into context)

improve:
- runtime (the plan says 75–90 s; the script says ~103 s): the header undercounts. The read-aloud is 256 words, not 236, because the numbers and "agents dot M D" are spelled out. That is about 111 s at 2.3 w/s. Exact cuts:
  - beat 5: "This isn't just a model problem. Agent equals model plus harness." → "Agent equals model plus harness." (−6; it repeats the hook's "might not be a smarter model", and the definition then follows the formula at once, which fixes the Goldfish's "harness before it's explained")
  - beat 7: "First, the guides. A short instructions file, like AGENTS.md, that it reads before it starts." → "First, the guides. A short instructions file it reads first, like agents dot M D." (−3; S3, S2b)
  - beat 9: "So, second, the checks." → "Second: the checks." (−1)
  - beat 10: "Add a hook, a command that runs on its own. Now the test runs every time, not just when the agent decides to." → "Add a hook. It runs the test every time, not just when the agent decides to." (−7; the hook is now defined by what it does, in the plan's safe wording; S7)
  - beat 12: "The agent fixes the code, and runs it again. [beat] Green." → "The agent fixes the code and re-runs. [beat] Green." (−2)
  - beat 13: "so "Done" actually means something" → "so "Done" means something" (−1; still the plan's safe wording)
  - After these cuts and the +4 in beat 11, the read-aloud is about 240 words, roughly 104 s at 2.3 w/s.
  - Judgement: about 104 s is the floor. Going further means dropping a must-include, the planned catch, or the recap (a house rule). The remaining ~14 s over the band is planned content, not padding. It sits inside the winners' range (79–176 s) and the learnings' 3-minute allowance, with a re-hook every 20–25 s. That makes it acceptable, but only if the owner agrees: the band is part of the owner-approved plan. Record the owner's acceptance in content-plan.md (e.g. "runtime ~100–110 s accepted by owner, <date>") before the re-review. Also correct the script header to the real word count and runtime.
- beat 15: "They say their coding agent now solves 66.5 percent of a benchmark's tasks, up from 52.8. [beat] Their own agent, their own test." → "They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. [beat] Now? Sixty-six point five. Their own agent, their own run."
  - The spoken order now matches the on-screen 52.8% → 66.5%, so each number lands on its word.
  - The sentences are now ≤ 16 words.
  - "run" replaces "test": Terminal Bench 2.0 isn't LangChain's own test, and in this reel "the test" means the viewer's unit test, so "their own test" could be heard as "they graded themselves". "Run" matches S5's label and the on-screen "their own run". The plan allowed "their test", so this isn't blocking.
- plan point #3, second half ("with only checks the agent repeats mistakes", S3): this is not said directly. The habit beat (#16) implies it. Acceptable for runtime; no line needs to be added.

### What holds
- The core message comes through: rules before, checks after, and "Done" has to pass a check.
- Every must-include is in the order the plan sets.
- Nothing from the leave-out list (no Terminal Bench name, model name, OpenAI figures or history).
- The planned catch is word for word [S3].
- The approved hook is true and paid off at #13. The CTA is channel-generic.
- The Concept sheet has two numbered mechanism steps, which is allowed.
- Every absolute ("nobody checks that rule", "every time", "only the harness") is within S3 / S7 / S5 and the plan's claim-safety table.

## Script review · 2026-10-28 (re-review, after the rebuild and Goldfish run 3)

_Re-reviewed by the `script-review` agent; saved by the main session (the agent's append timed out on permission). Linter 28/43 at review time: every script check passes (table = read-aloud 100 %, sentences ≤ 16 words, catch present and sourced, sources resolve); the remaining ✗ are later-stage files. Goldfish gate clear: comprehension.md sha1 5baed5918c30 = current read-aloud._

### Runtime: pending owner acceptance (not blocking)
240 words ≈ 104 s spoken (~111 s with 0.4 s per beat) vs the plan's 75–90 s. Every beat carries a must-include, the catch or the recap. Record the owner's acceptance in content-plan.md before the storyboard.

### Goldfish check (run 3)
- TAKEAWAY matches the core message; all 6 must-includes + the catch remembered in order.
- LOST ME items are setup specifics or exact decimals, not the terms themselves: not blocking.
- #10 never said *when* the hook runs → improve item 1.
- The listener inferred "my agent can't claim done until the tests pass" (unsafe per the plan). The script doesn't say it and #17 limits it: never add "can't", and the storyboard must not show a lock / "blocked" state at #10–#13.

VERDICT: PASS
scores: plan 4 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 5 · match 5 · hook 5 · structure 5 · understood 4

blocking:
- none

improve:
- beat 10: "Now the test runs every time." → "Now the test runs every time it says done." (S7, S5; re-run the Goldfish after, sha changes)
- header/notes stale: words 240; #10/#15 counts; accuracy notes for #5, #13, #14–15
- runtime: record the owner's acceptance

### What holds
#5 → #6 formula + definition back to back; #10's hook definition made "hook" land; #15 old → new order matches the screen and "measured by them" lands as LangChain's own claim; #7 lands as a filename; all claim-safety wording holds; hook true and paid off at #13; generic CTA; two mechanism steps.

- [x] Script review passed (2026-10-28)
