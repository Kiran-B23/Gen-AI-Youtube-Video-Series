# Reel script · Harness Engineering (v2)

**Archetype:** Concept (standard "how X works" sheet) · **Viewer's question:** "What is harness engineering, and what would I actually do differently with my coding agent?" · **Hook question (pinned):** "Why does my agent say 'Done' too early?" · **Running example:** one task card, "Add password-reset button" (illustrative), with one test the viewer wrote, `✗ sends reset email`
**Tone:** curious and delighted, like a senior engineer replaying a bug for a friend: quick and dry on the fast failure, slow and clear on the replay, a raised eyebrow on the study's twist, plain and practical on the habit · **Words:** 158 (read-aloud) · **Est. runtime:** ~75 s (158 ÷ 2.3 = 69 s of speech + 0.4 s pause per beat × 15; v1's real voice ran 2.14 w/s overall incl. pauses → ~74 s), at the top of the 45–75 s reel band · **Winners' range:** topic Shorts 79–176 s; top explainer Shorts median 57 s (`references/web-shorts-2026-10-30.md`)

_Rows = the Concept reel beat sheet: Hook → The example (the fast failure) → The concept → Mechanism (rule + hook = the loop) → Why it matters to you (HarnessTax) → Takeaway (the habit) → the content plan's material catch → Recap + CTA. Follows content-plan.md (2026-10-30 pm, 75 s cut), including its safe wording. The fast-then-slow effect is shown, not said: beats 2–3 play under a `▶▶ 2×` chip, beat 4 on under `▶ 1×`._
_History: owner's script review (2026-10-30, not yet approved) asked for 6 changes: the closing line overreached (→ "Pick a harness for price. Build checks for 'Done.'"), the hook contradicted the body (→ "would say no"), the catch's reason (→ "AI-written tests can pass bad code"), the rule shown as it's spoken (+ the example "run tests first"), the timing maths, and success vs cost as two beats. Before that, script-review (2026-10-30, CHANGES) merged to 15 beats (catch kept as 2 beats for the 6 s beat limit), defined the hook, split the S8 line and moved the CTA onto the card. Before that, the morning draft (205 words, ~97 s) went through three Goldfish runs (harness named before use, hook trigger said, cost given a unit, "you" turn mistakes into rules); the 2026-10-30 house rules (45–75 s, pinned hook question) then cut it to this version: the rule and hook beats became one loop, the formula moved on screen, the instructions file is named on screen only._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–5 s | [urgent] Your coding agent says, "Done." [beat] Your test would say no. [lean in] Why? | 11 | `[TITLE]` | WHY DOES MY AGENT SAY "DONE" TOO EARLY? · DONE ✓ · ✗ sends reset email (would fail) | [S5] [S4] |
| 2 | The example · the failure (fast, 2×) | 5–11 s | [brisk] The agent writes a password-reset button, re-reads it, stops. [beat] Your test? Never ran. | 13 | `[ANIMATE]` | ▶▶ 2× · Add password-reset button (illustrative) · write → re-read → stop · YOUR TEST: NEVER RAN | [S5] [S4] |
| 3 | The concept (replay, 1×) | 11–18 s | [slow down] The harness is everything around the model: what it reads, what checks its work. | 14 | `[ANIMATE]` | ▶ 1× · AGENT = MODEL + HARNESS · READS · CHECKS | [S6] [S3] |
| 4 | Mechanism · a rule | 18–22 s | A rule like "run tests first" only asks. | 8 | `[CODE]` | AGENTS.md · + Run tests first. (types on "rule") · asks | [S3] |
| 5 | Mechanism · a hook | 22–28 s | A hook is a command that runs your test whenever the agent says done. | 14 | `[TERMINAL]` | HOOK = a command · "done" → your test | [S7] |
| 6 | Mechanism · the loop + payoff | 28–35 s | Red. The error goes back. The agent fixes it. [beat] Green. [smile] Now "Done" means something. | 14 | `[ANIMATE]` | FAIL ✗ → error → agent → fix → PASS ✓ · DONE ✓ (earned) | [S3] [S2c] [S5] |
| 7 | Why it matters to you · re-hook | 35–41 s | Your agent tool is a ready-made harness. [raised eyebrow] Should you shop for a better one? | 14 | `[TITLE]` | ring around the model relabels → YOUR AGENT TOOL · SHOP FOR A BETTER ONE? | [S6] [S8] |
| 8 | Why it matters to you | 41–45 s | Researchers ran the same models in three popular tools. | 9 | `[VS]` | same models × 3 tools (unlabelled) | [S8] |
| 9 | Why it matters to you · success | 45–50 s | On two benchmarks, success moved a few points between tools. | 10 | `[NUMBER]` | SUCCESS ±2–5 pts (bars stay still) | [S8] |
| 10 | Why it matters to you · cost | 50–53 s | [beat] Token cost varied up to fivefold. | 6 | `[NUMBER]` | TOKEN COST up to 5× (only this bar moves) | [S8] |
| 11 | Takeaway | 53–57 s | No ready-made harness knows your project. Your checks do. | 9 | `[VERDICT]` | YOUR PROJECT → YOUR CHECKS | [S3] |
| 12 | Takeaway · the habit | 57–62 s | Turn every mistake into a rule, plus a check. | 9 | `[ANIMATE]` | mistake → + rule + check | [S1] [S3] |
| 13 | The catch | 62–66 s | [slow down] One catch: green only means your checks passed. | 8 | `[VERDICT]` | ✓ PASSED ≠ CORRECT | [S3] |
| 14 | The catch · why | 66–70 s | AI-written tests can pass bad code. Review the test yourself. | 10 | `[ANIMATE]` | weak test ✓ on bad code → review the test | [S3] |
| 15 | Recap | 70–75 s | [warm] Pick a harness for price. Build checks for "Done." | 9 | `[RECAP]` | HARNESS → PRICE · CHECKS → "DONE" · What should I explain next? | [S8] [S3] |

**Pronunciation notes:** AGENTS.md and the harness names are on screen only (not spoken) · "re-reads" ("ree-reeds") · "AI-written" ("A-I written") → `names`: none needed

**Re-hooks:** #2 at ~5 s ("Never ran"), #7 at ~30 s ("Should you shop for a better one?"), #13 at ~58 s ("One catch"): every ~25 s; the pinned hook question stays on screen throughout.

**Accuracy notes (content-plan claim safety):**
- #1 is an illustrative scenario of the documented failure [S5, S4]; "would say no" (owner, 2026-10-30): the test never ran, so it can't have said anything; the red row reads as "would fail". "Why?" asks the pinned hook question.
- #2 matches LangChain's reported pattern (re-read, "looks ok", stopped) and Anthropic's "marked complete without end-to-end testing"; "**your** test" per the plan (S9).
- #3 is the definition by what it does [S6, S3]; "Agent = Model + Harness" [S6] on screen only.
- #4 "only asks" is the plan's safe wording of "feedforward alone → rules never get checked" [S3] (never "useless" / "ignored"); the example rule is spoken and types onto `AGENTS.md` on the word "rule" (owner, 2026-10-30).
- #5 a hook is a command run at set points, "certain actions always happen rather than relying on the LLM to choose" [S7]. Never "can't stop".
- #6 the test catches it, the error is fed back into the agent's context [S3, S2c], the agent fixes it [S5]; "means something", never "correct" / "bug-free" [S3].
- #7–10: S8. "your agent tool is a ready-made harness" (S6/S8 call these tools harnesses; said before the question so "harness" lands as something you can pick), "the same models in three popular tools", "on two benchmarks", "success moved a few points between tools" (±2 SWE-bench Lite, ~±5 Terminal-Bench 2.0; the range is on screen), "token cost varied up to fivefold" (same model, between harnesses; 1.5–2× on average, up to 5× for some pairs). Success and cost are two beats so the success bars hold still while only the cost bar moves (owner, point 6). No harness named, no per-harness cost row on screen, no "proved", no "doesn't matter".
- #11 is our conclusion from S3 (a harness checks only what you specify), not attributed to the study.
- #12 is Hashimoto's habit [S1] with a check behind each rule [S3]; never "never makes that mistake again".
- #13–14 are the catch [S3: functional correctness unsolved]. "AI-written tests can pass bad code" (owner, 2026-10-30) replaces "aren't good enough yet": a test that doesn't check the requirement passes wrong code; S3 says AI-generated tests aren't trustworthy yet.
- #15 (owner, 2026-10-30) replaces "Don't shop for a harness. Build your checks.", which overreached: S8 found harness choice moves price (Pi often matched success at about half Claude Code's cost) but not correctness. "Pick a harness for price" is what the study supports; "Build checks for 'Done'" is the core message. The channel-generic CTA "What should I explain next?" is on the recap card.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

Your coding agent says, "Done." Your test would say no. Why?

The agent writes a password-reset button, re-reads it, stops. Your test? Never ran.

The harness is everything around the model: what it reads, what checks its work.

A rule like "run tests first" only asks.

A hook is a command that runs your test whenever the agent says done.

Red. The error goes back. The agent fixes it. Green. Now "Done" means something.

Your agent tool is a ready-made harness. Should you shop for a better one?

Researchers ran the same models in three popular tools.

On two benchmarks, success moved a few points between tools.

Token cost varied up to fivefold.

No ready-made harness knows your project. Your checks do.

Turn every mistake into a rule, plus a check.

One catch: green only means your checks passed.

AI-written tests can pass bad code. Review the test yourself.

Pick a harness for price. Build checks for "Done."
