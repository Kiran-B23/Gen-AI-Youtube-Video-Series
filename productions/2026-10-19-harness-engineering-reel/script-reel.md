# Reel script · Harness Engineering

**Archetype:** Concept (standard "how X works" sheet) · **Viewer's question:** "What is harness engineering, and what would I actually do differently with my coding agent?" · **Running example:** one task card, "Add password-reset button" (illustrative), with one test the viewer wrote, `✗ sends reset email`
**Tone:** curious and delighted, like a senior engineer showing a trick: brisk on the loop, slow on "same model" and on the catch, plain and practical on the habit · **Words:** 243 (read-aloud, numbers spelled out) · **Est. runtime:** ~111 s at the house pace (÷2.3 + 0.4 s per beat, `studio/templates/reel/pace.json`) · **Winners' range:** winning Shorts 79–176 s at 2.4–3.4 w/s

_Rows = the Concept reel beat sheet: Hook → The example → (the failure) → The concept → Mechanism 1 (guides) → Mechanism 2 (checks + the loop) → Why it matters to you (the same-model number) → Takeaway (the habit) → the content plan's material catch → Recap → CTA. Two mechanism steps (archetype max 3). Follows content-plan.md (owner-approved 2026-10-19), including its safe wording. Runtime ~111 s, above the plan's 75–90 s band: the comprehension fixes (define "hook", introduce LangChain, clarify the number) added words and script-review's cuts (2026-10-28) took it as short as it goes without dropping a must-include, the catch or the recap; the owner is asked to accept it; every beat carries a must-include, so the recap stays (house rule) and the excess is noted for script-review. Owner approved this draft for review on 2026-10-28._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–8 s | [urgent] Your coding agent says, "Done." [beat] The test says it isn't. [slow down] The fix might not be a smarter model. | 18 | `[TITLE]` | DONE ✓ · ✗ 1 test failing | [S5] [S4] |
| 2 | The example | 8–11 s | The task? A password-reset button. | 5 | `[ANIMATE]` | Add password-reset button (illustrative) | illustrative |
| 3 | The example · the failure | 11–17 s | The agent writes the code, re-reads it, decides it looks fine, and stops. | 13 | `[ANIMATE]` | write → re-read → "looks fine" → stop | [S5] |
| 4 | The example · the failure | 17–19 s | [beat] The test? Never even ran. | 5 | `[VERDICT]` | TEST: NEVER RAN | [S5] [S4] |
| 5 | The concept | 19–22 s | Agent equals model plus harness. | 5 | `[TITLE]` | AGENT = MODEL + HARNESS | [S6] |
| 6 | The concept | 22–29 s | The harness is everything around the model: what it reads first, what checks its work after. | 16 | `[ANIMATE]` | BEFORE: guides · AFTER: checks | [S6] [S3] |
| 7 | Mechanism 1 · guides | 29–36 s | First, the guides: a short file it reads first, named agents dot M D. | 14 | `[ANIMATE]` | GUIDES · AGENTS.md | [S3] [S2b] |
| 8 | Mechanism 1 · guides | 36–43 s | A map, not a manual. Add one line: run the tests before you say done. | 15 | `[CODE]` | AGENTS.md · + Run the tests before you say done. | [S2b] [S1] |
| 9 | Mechanism 2 · checks (re-hook) | 43–47 s | [lean in] But nobody checks that rule. Second: the checks. | 8 | `[ANIMATE]` | CHECKS | [S3] |
| 10 | Mechanism 2 · checks | 47–54 s | Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done. | 21 | `[TERMINAL]` | HOOK · runs on its own → tests · every time | [S7] |
| 11 | Mechanism 2 · the loop | 54–60 s | Red. The error, with a fix hint, goes straight back to the agent. | 13 | `[ANIMATE]` | ✗ sends reset email + hint → back to the agent | [S3] [S2c] |
| 12 | Mechanism 2 · the loop | 60–64 s | The agent fixes the code and re-runs. [beat] Green. | 8 | `[ANIMATE]` | fix → re-run → ✓ passing | [S5] [S3] |
| 13 | Mechanism 2 · payoff | 64–68 s | [smile] Now the test passes, so "Done" means something. | 8 | `[VERDICT]` | DONE ✓ (earned) | [S3] |
| 14 | Why it matters to you | 68–77 s | [slow down] Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness. | 19 | `[VERDICT]` | SAME MODEL · new harness | [S5] |
| 15 | Why it matters to you | 77–88 s | They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. [beat] Now? Sixty-six point five. That's their own agent, measured by them. | 26 | `[NUMBER]` | 52.8% → 66.5% tasks solved · their own run | [S5] |
| 16 | Takeaway | 88–95 s | The habit: every mistake becomes a rule it reads, or a check it must pass. | 15 | `[ANIMATE]` | mistake → + rule · or + check | [S1] |
| 17 | The catch | 95–102 s | [slow down] One catch. Green only means your checks passed. So write or review the test yourself. | 15 | `[VERDICT]` | GREEN = YOUR CHECKS PASSED | [S3] |
| 18 | Recap | 102–107 s | [warm] A map before. A check after. Every mistake, a new rule. | 11 | `[RECAP]` | MAP BEFORE → CHECK AFTER → NEW RULE | [S3] [S1] |
| 19 | CTA | 107–111 s | What should I explain next? Tell me below. | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** AGENTS.md (spoken "agents dot M D"; on screen and in captions AGENTS.md), LangChain ("Lang-Chain"), 52.8 ("fifty-two point eight"), 66.5 ("sixty-six point five") → `names`: AGENTS.md, LangChain

**Re-hooks:** #4 at ~16 s ("Never even ran"), #9 at ~41 s ("But nobody checks that rule"), #14 at ~64 s ("Does it matter?"), #17 at ~85 s ("One catch"): every 20–25 s.

**Accuracy notes (content-plan claim safety):**
- #1 is the approved hook, an illustrative scenario of the documented failure [S5, S4]; never widened to "agents always…". "Might not be" stays (unsafe: "isn't a smarter model").
- #4 matches LangChain's reported pattern (re-read, "looks ok", stopped) and Anthropic's "marked complete without end-to-end testing".
- #5 "Agent equals model plus harness": LangChain's formula [S6]; the hook's "might not be a smarter model" carries the "not only the model" point.
- #8 "A map, not a manual" paraphrases OpenAI's AGENTS.md advice [S2b]; the added line is ours, illustrative.
- #9 compresses Böckeler's "feedforward alone → rules never get checked" [S3].
- #10 follows the Claude Code docs: hooks run at set points and make certain actions always happen rather than relying on the model to choose [S7]; "every time it says done" = a check at the finish (Stop hook / LangChain's pre-completion check, S5). Never "can't stop" or "can't claim done"; no lock or "blocked" visual.
- #11 "The error goes straight back to the agent": the check's output is fed into its context [S3, S2c]; no claim the agent catches its own mistake.
- #13 "'Done' means something", never "correct" / "bug-free" [S3].
- #14–15 credited to LangChain ("They say", "That's their own agent, measured by them": Terminal Bench isn't LangChain's test, the run is); 52.8 → 66.5 as said, never "26 %", "14 percent", "top 5" or "proven"; the model was held fixed and only the harness changed [S5, confirmed on langchain.com 2026-10-19]. Benchmark name (Terminal Bench 2.0) in the description only.
- #16 is Hashimoto's habit, in the plan's safe wording (not "never makes that mistake again") [S1].
- #17 is the plan's exact catch [S3].

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

Your coding agent says, "Done." The test says it isn't. The fix might not be a smarter model.

The task? A password-reset button.

The agent writes the code, re-reads it, decides it looks fine, and stops.

The test? Never even ran.

Agent equals model plus harness.

The harness is everything around the model: what it reads first, what checks its work after.

First, the guides: a short file it reads first, named agents dot M D.

A map, not a manual. Add one line: run the tests before you say done.

But nobody checks that rule. Second: the checks.

Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done.

Red. The error, with a fix hint, goes straight back to the agent.

The agent fixes the code and re-runs. Green.

Now the test passes, so "Done" means something.

Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness.

They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. Now? Sixty-six point five. That's their own agent, measured by them.

The habit: every mistake becomes a rule it reads, or a check it must pass.

One catch. Green only means your checks passed. So write or review the test yourself.

A map before. A check after. Every mistake, a new rule.

What should I explain next? Tell me below.
