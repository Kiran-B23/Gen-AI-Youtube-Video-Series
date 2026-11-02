# Script review · Harness Engineering (v2)

## Script review · 2026-10-30 (sixth run, after the beat 7–8 reorder)

_Reviewed `script-reel.md` (158 words, 15 beats, ≈ 74.7 s at 158 ÷ 2.3 + 15 × 0.4; read-aloud sha1 bda97752297d, which matches comprehension.md run 14) against the updated `content-plan.md` (core message: "The harness you pick barely changes success, mostly cost; your checks are what make 'Done' mean something."), research.md, hooks.md and comprehension.md. Linter: every script-reel check is ✓ (table = read-aloud 100 %, absolutes and numbers sourced, planned catch present). The ✗ rows are downstream files only._

**VERDICT: PASS**

**scores:** plan 4 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 4 · match 5 · hook 5 · structure 5 · understood 4

### blocking
- none

### Accepted deviations
- **15 beats (plan ≤ 14) and 158 words (plan ceiling 155).** The catch is split for the 6 s beat limit, and ≈ 74.7 s is inside the 45–75 s band. There's **no headroom**: any later word needs a cut, and the voice/payoffs gates measure the real length.

### improve (screen only; no voice change, so no new Goldfish run)
- **beat 7 ("harness" concept → product, "took me a second"):** the ring around the model from beat 3 must visibly relabel to `YOUR AGENT TOOL` on "Your agent tool", so the two meanings are one object on screen. The Goldfish now resolves it unaided (WHAT IT IS and TAKEAWAY are both right), so it no longer blocks.
- **beats 9–10 (scale of "a few points", cost per task or total):** `SUCCESS ±2–5 pts` with still bars, and the cost bar labelled `token cost per task · up to 5×` (S8 compares per-task cost for the same model).
- **beats 4 and 12 / QUESTIONS LEFT ("what does the rule add?"):** the beat 12 card snaps a check onto the rule (S3: guides steer before, sensors check after). Hook setup → the description (link S7). Tool names and the cheapest tool → description only (plan lock).

### Dimension notes
- **Plan (4):** says the core message (beats 9–10 and 15), covers all five must-includes and the plan's exact catch, and contains nothing from Leave out (no tool names, no 52.8 → 66.5, no model names). Beat 15 is the plan's approved short form. Only the accepted beat/word deviations above.
- **Specific (5):** every beat carries the running card, a named mechanism (rule, hook, red → back → fix → green) or S8's numbers.
- **Accurate (5):** "Your agent tool is a ready-made harness" matches S6/S8 (the tools tested are harnesses). "Three popular tools" is the plan's safe S8 row. "Success moved a few points" matches ±2 / ~±5. "Token cost varied up to fivefold" keeps "up to" and names no tool. "Pick a harness for price" is the owner-approved plan row, scoped by "two benchmarks". "AI-written tests can pass bad code" is hedged and on the plan's S3 row. Beat 11 is our conclusion (S3), not the study's.
- **Clear (4):** every term is explained by what it does (harness, rule, hook, ready-made harness = your agent tool). The S8 section is still the densest part (ONE-LISTEN RISK medium), and the screen notes above carry its scale.
- **Value (5):** every line answers "what do I do with my agent": add the check, pick on price, review the test.
- **Spoken (4):** "you", ask-and-answer ("Your test? Never ran.", "Should you shop for a better one?"), varied length, no list fragments.
- **Match (5):** the table and the read-aloud are 100 % the same words.
- **Hook (5):** hooks.md #1. True and consistent with "Never ran" ("would say no"). Paid off by beat 6 and the recap. The CTA is channel-generic, on the card.
- **Structure (5):** the Concept beat sheet, with no numbered steps.
- **Understood (4):** the TAKEAWAY says the core message in meaning ("switching agent tools mostly changes the cost, not how well it works" + checks via a hook). WHAT IT IS and WHY I'D CARE are said. REMEMBERED covers every must-include in order (failure, rule + hook, loop, S8, project → your checks + the habit) plus the catch and the recap, and the definition is in WHAT IT IS. LOST ME on "harness" is now a one-second delay that the Goldfish resolved itself. The rest of LOST ME is scale, "per task" and rule-vs-check, which the screen carries. ONE-LISTEN RISK is medium.

- [x] Script review passed (2026-10-30)
