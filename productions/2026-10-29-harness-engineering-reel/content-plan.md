# Content plan · Harness Engineering (v2)

_Reel (9:16) · Concept, standard sheet · viewer: curious practitioner who uses a coding agent · **Reel 45–75 s: ~150 read-aloud words (ceiling 155), ≤ 14 beats, at 2.3 w/s** · 2026-10-30._
_Updated 2026-10-30 (pm) to the house rules of 2026-10-30 (`learnings.md` last entry, `references/web-shorts-2026-10-30.md`): adds Length and Hook question, and cuts the plan to fit 75 s. The 205-word draft (`script-reel.md`, ~97 s) is over budget and must be rewritten to this plan. Cuts: the separate "rule in its instructions file" mechanism beat and its "nothing checks that rule" re-hook (the rule survives inside the loop line and the habit), the spoken "Let's replay that, slowly" (the 2× → 1× chip shows it on mute), the standalone "What was missing? A harness." beat (merged into the definition), and beats merged so there are ≤ 14. Kept: all four Depth points, the S8 qualifiers and the catch. The core message and claim safety are unchanged; two rows are added (the hook question and the catch's new "AI-written tests" clause)._
_Written by the `content-plan` agent. v1 (`productions/2026-10-19-harness-engineering-reel/content-plan.md`, owner-approved 2026-10-19) is the base. What still holds is kept: the definition, the false-"Done" failure, the loop, the habit, the catch, and most of the claim-safety table. What changed: the proof beat (S8 replaces S5's number), a shorter must-include list (6 → 5), and one wording fix forced by S9 ("never ran **your** test")._
_Source check (2026-10-30): S8 re-read in full from the site's source (`github.com/HarnessTax/HarnessTax.github.io` → `data/blog/harness-x-model.0af74054a7.json`); every S8 wording below is checked against that text. S7 was re-fetched from code.claude.com and its "deterministic control" sentence is unchanged. S1/S3/S4/S5/S6 rely on research.md quotes, which v1 checked on 2026-10-19._

## Viewer's question
"What is harness engineering, and what would I actually do differently with my coding agent?"

## Core message
The harness you pick barely changes success, mostly cost; your checks are what make "Done" mean something.
_(16 words. Owner's change, 2026-10-30: the harness buys price, not correctness. "Success" because S8 measured benchmark success; "mostly cost" because S8's cost spread (1.5–2× on average, up to 5×) is the finding that moved. The second half is S1/S3 reasoning, not a measured gain. Short form for the recap card: "Pick a harness for price. Build checks for 'Done.'" (replaces "Don't shop for a harness. Build your checks.", which overreached: Pi often matched success at about half the cost, so a sharp viewer could fairly conclude "shop for a cheaper harness").)_

## Length
**Reel: 45–75 s.** Target ~70 s: ~150 read-aloud words (ceiling 155) in ≤ 14 beats. At the house pace that's 150 ÷ 2.3 + 14 × 0.4 ≈ 71 s; 155 words ≈ 73 s.
_A long reel isn't needed. All four Depth points fit in 75 s once the duplicated mechanism (a rule beat **and** a hook beat, both teaching "check before Done") becomes one loop. The 205-word draft got its length from repetition: three hook-ish beats, a separate rule beat, a re-hook just to set up the hook, and a 2-beat recap + CTA. It didn't need a fifth idea. If the rewrite can't fit 155 words, cut in this order: the definition's examples → the habit's wording → the CTA. Never cut the S8 qualifiers ("ready-made", "two … benchmarks", "up to") or the catch._

## Hook question
**"Why does my agent say 'Done' too early?"** (8 words)
_The viewer's own question, the one a coding-agent user types after a false "Done" (S4, S5). It's large over the task card in frame 0, with the DONE ✓ stamp and the red `✗ sends reset email` row already acting, and it fills ≥ 45 % of the band at 1.5 s. Then it's pinned at the top on one background for the whole reel. Every section answers it. The fast failure shows the symptom. The definition and loop say why: nothing checked your test, so add the check that runs. The S8 beat says "Your agent tool is a ready-made harness" and asks "Should you shop for a better one?" (for success, barely: it moved a few points; for price, yes). The habit and catch say what to do. The recap, "Pick a harness for price. Build checks for 'Done.'", is the answer._
**Spoken hook:** keep hooks.md #1's first two sentences and replace the third with the question: "Your coding agent says, 'Done.' Your test would say no. Why?" (~11 words; owner 2026-10-30: "says it isn't" contradicted "Never ran"). Drop "Let's replay that, slowly.": the fast-then-slow device stays, shown by the `▶▶ 2×` → `▶ 1×` chip, not said. hooks.md is to be updated to match. Claim check: "too early" is the viewer's question about one illustrative case, not a claim that agents always stop early (see Claim safety).

## Proof decision (S5 vs S8): **S8 only. S5's number is out of the script.**
- **Why S8:** it's independent (UC Berkeley + Arena), from Sept 2026, and covers 7 models × 3 harnesses. It answers the live "model or harness?" question that no watched video covers (inspiration.md, gap 1). It also helps the viewer **decide**: don't pay for a fancier ready-made harness hoping it will fix results, because the cost can move far more than success does.
- **Why not S5 (52.8 → 66.5):** it's LangChain tuning its own agent in its own run, on an older model (Feb 2026). The fix it measured (verify before you exit) is the generic test-running habit S9 says newer models have since absorbed. Putting S5 next to S8 makes the viewer hear "the harness gave +14" and then "the harness barely matters". Those don't actually conflict (S5 *added checks*, S8 *swapped finished products*), but explaining that costs about 25 words and adds a second number. That's a caveat longer than the claim. S5 stays in the reel only as the source of the failure pattern (must-include 2), and in the description.
- **How S8 fits the core message without overclaiming:** S8 measured **swapping ready-made harnesses** (Claude Code, Codex CLI, Pi at their default settings, on public benchmarks). It did **not** test adding your own project's checks. So the script must split the word "harness" into two parts out loud: *the harness you pick* (S8: barely moved success) vs *the part you build* (your rules and checks, S1/S3). The "your checks" conclusion is our reasoning from S3 (a harness checks only what you specify; correctness is otherwise unsolved). It is never attributed to the study.
- **S9 (Katz talk):** context only, not in the script (a single practitioner claim). It changes one wording: the failure is "it never ran *your* test", not "agents never run tests", because newer models often do run generic tests on their own.

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **Definition (one line):** the harness is everything around the model: what it reads and what checks its work. ("Agent = Model + Harness" is on screen only, not spoken.) | S6, S3 | company claim (definition) · independent |
| 2 | **The failure:** the agent writes the code, re-reads it, decides it looks fine, says "Done" and stops, while your test is red. It never ran your test. This is LangChain's most common failure, and Anthropic saw features marked complete without end-to-end testing. | S5, S4 | company claim |
| 3 | **The loop (rule + hook in one beat):** a rule only asks ("run the tests before you say done"), and rules alone never get checked. A hook runs your test every time, not only when the agent decides to. The test goes red, the error goes back to the agent, the agent fixes the code, and the test passes. Only then does "Done" mean something. | S3, S7, S5 | independent · official docs · company claim |
| 4 | **Would a better harness fix it? (S8):** researchers ran the same models in three ready-made harnesses (the agent tools you install) on two public coding benchmarks. Tasks solved barely moved; token cost moved by up to 5× between harnesses. So a fancier harness off the shelf isn't automatically better. | S8 | independent |
| 5 | **The habit (what to do):** no ready-made harness knows your project. Your checks do. You turn every mistake into a rule it reads or a check it must pass. | S1, S3 | independent (practitioner) · independent |

_v2 (morning) had the rule as its own mechanism beat with a re-hook ("But nothing checks that rule"). In the 75 s cut it's one clause inside #3: same idea (S3: feedforward alone → rules never get checked), about 15 fewer words, and no separate visual. The Goldfish didn't follow "instructions file" (comprehension.md run 3), so the file isn't named on voice; the screen shows `AGENTS.md · illustrative` on the card. "A map, not a manual" (S2b) moves to the description._
_For the Goldfish's S8 loss ("two numbers in one sentence", "is it the agent tool itself?"), split #4 into two short sentences and gloss "ready-made harness" once as the agent tools you install. Keep "two … benchmarks" on voice: it's the scope qualifier._

## Leave out
_Description must say the study is directional: two public benchmarks, 30 sampled tasks each, 3 attempts per task (primary post, "Experiment Setup"), models may have seen the tasks in training (owner, 2026-10-30)._
| Item | Why it's out |
|---|---|
| LangChain's 52.8% → 66.5% (S5) | Older, their own run on an older model, and it collides with S8 unless we spend a caveat sentence on it. Kept for the description only (see Proof decision). |
| Naming the three harnesses in the S8 beat, or showing any per-harness cost (Claude Code ~2× Pi, 1.6× Codex, Pi on the frontier, "your Claude models may not need Claude Code") | Locked: no harness ranking. A ranking on two benchmarks isn't a quality verdict for the viewer's work, and naming harnesses next to "5×" invites "Claude Code costs 5×", which the source doesn't say. Names go in the description only. |
| Model names and scores (Claude Fable 5 97.8 / 96.7, GPT-5.6 Sol, Kimi K3, Sonnet 4.6) | Version trivia, plus a second set of numbers |
| "Harness tax" as a term, Pi's four tools, 10× initial context, 9 of 12 comparisons, bootstrap CIs, 100-turn cap | True but each one is a second idea. The cost point is made once, by "up to 5×". |
| Authors, UC Berkeley Sky Lab, Arena sponsorship, Sept 16 date | Trivia. On voice it's just "researchers"; the full credit goes in the description. |
| S8's benchmark caveats in full (models may have seen the tasks in training, 30 tasks, wide intervals) | Longer than the claim. Covered by saying "on two public benchmarks" and by never generalising beyond it. |
| S9: models have absorbed generic habits; "is the harness dead?" | Single practitioner claim. Saying "harness is dead" would break a lock. It only shapes the wording "your test". |
| OpenAI no-manual-code / ~1M lines / PRs / team size | Company claim that needs a long caveat, nothing the viewer can act on, and it leans toward the locked "AI writes all code" |
| Anthropic's initializer agent, 200+ feature list, init.sh, Puppeteer | Too much machinery. S4 is used only for the failure. |
| Computational vs inferential checks, AI reviewers, loop detection, time warnings, reasoning sandwich | Second ideas, and some are temporary patches |
| DevTools, per-worktree logs, structural tests | Explainer depth |
| Prompt → context → harness history, who coined the term | Concept don't (history lesson / naming trivia) |
| Horse / lane-assist analogies | No analogy; the card shows the mechanism (and horse imagery is locked) |
| Product plugs, other creators' lines, the Katz talk's lines | Off-message / lock |
| A separate "rule in the instructions file" beat, the file's name on voice, "a map, not a manual" (S2b) | 75 s cut: the rule is a clause in the loop (#3). The Goldfish lost "instructions file". The file name goes on screen only and the map line goes in the description. |
| Spoken "Let's replay that, slowly"; a separate "What was missing? A harness." beat | 75 s cut: the 2× → 1× chip shows the replay; "the harness" is named in the definition line. |

## Catch decision
**Catch:** include
**Why:** it's material, and in v2 it holds up the core message. The reel ends by telling the viewer to build their own checks and shows a green test as the payoff. The hype hides that green only means the checks you wrote passed, and an agent that writes or edits its own test can turn green meaningless. That changes how the viewer sets up the habit: they must own the check. The source is independent (S3: functional correctness is "still unsolved"; AI-generated tests are "not good enough yet"). It fits in one sentence. S8's cost finding is the proof beat, not the catch.
**Exact point:** "One catch: green only means your checks passed. AI-written tests can pass bad code. Review the test yourself." [S3] (owner, 2026-10-30: "aren't good enough yet" was vague and ages badly; "can pass bad code" says what's meant and is true by construction)
_(Updated 2026-10-30 pm: the Goldfish said "the 'so' skips a step" (run 3). The added clause is S3's own caveat ("not good enough yet") and gives the reason. ~18 words; if it must shrink, keep "green only means your checks passed" and "review the test yourself".)_

## Running example
The same "Add password-reset button" task card as v1 (illustrative), with **one test the viewer wrote**: `✗ sends reset email`, a project requirement the agent can't guess. Fast pass: the agent writes the code, re-reads it, stamps DONE ✓ and stops, while your test is red because it never ran. Slow replay (one background, the hook question pinned at the top, the card growing parts): one rule line ("Run the tests before you say done") → a hook runs the test → red → the error goes back → fix → green → DONE earned. In the S8 beat the card shrinks to the pinned strip while the harness bars race. Then the card comes back for the habit: the next mistake becomes a new line or check. Why it fits: every coding-agent user has seen a false "Done" (S4, S5), the test is *theirs* (which is what S8's ready-made harnesses can't supply), and the fix can go into their repo the same day. No second task.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| **"Don't shop for a harness"** (the v2 draft's recap) | S8: harness choice barely moved success but moved cost 1.5–2× on average, up to 5×; Pi often matched success at ~half the cost | **Unsafe (owner, 2026-10-30): it implies harness choice doesn't matter at all, when it matters for price.** Say: "Pick a harness for price. Build checks for 'Done.'" | S8 |
| "Success barely moved" | ±2 points SWE-bench Lite, about ±5 Terminal-Bench 2.0 | "success moved a few points between tools"; the ±2–5 range on screen | S8 |
| **"The harness doesn't matter"** / "harnesses don't matter" / "the harness is dead" | "Harness choice has little effect on task success rate, but can significantly affect the cost", and only among 3 ready-made harnesses on 2 public benchmarks. "Richer harness features may still benefit other models, workloads." | **Unsafe (lock).** Say: "Which ready-made harness you pick barely changed success." | S8 |
| "Swapping the harness changed nothing" / "same score" | Within ±2% (SWE-bench Lite), about ±5% (Terminal-Bench 2.0); e.g. 97.8 vs 96.7 | "Success barely moved." / "within a few points". Unsafe: "nothing", "identical", "same score" | S8 |
| **"Claude Code costs 5×"** / "Claude Code is 5× more expensive" | "up to 5x costs" is the widest spread for some model. Not attributed to one harness. Claude Code vs Pi is ~2.0× (SWE-bench Lite) and ~1.5× (TB2), vs Codex 1.6× (geometric means) | **Unsafe (lock: no ranking).** Say: "The cost changed by up to five times." No harness named next to 5× on voice or on screen. | S8 |
| "Claude Code is overpriced" / "use Pi instead" / "your Claude doesn't need Claude Code" | The study's own tease, on two benchmarks; per-workload | **Unsafe (lock).** Don't use. | S8 |
| **"A fancy harness is a waste"** / "fancy harnesses are useless" | "many tasks may not require fancy add-on features"; "harness complexity should … be treated as an empirical trade-off" | "A fancier harness isn't automatically better." Unsafe: "waste", "useless", "never worth it" | S8 |
| "Switch harness and save 5×" / "you're overpaying 5×" / "cut your bill by 5×" | Up to 5× on these benchmarks, at a fixed API price list. Subscription users don't pay per token. | Unsafe. Only "the cost changed by up to five times" in the study. Avoid "your bill". | S8 |
| "Researchers proved…" / "a study proves the model is all that matters" | "Our study reveals … on these two open-source benchmarks"; "Results may differ on other benchmarks and workloads" | "Researchers tested … on two public coding benchmarks" / "found". Unsafe: "proved", "models are all that matter" (lock) | S8 |
| "Same model, three harnesses" | 7 models, each run in all 3 harnesses | "They ran the same models in three popular harnesses." Safe | S8 |
| "The study shows your own checks are what matter" | S8 didn't test custom checks | **Unsafe.** Say it as our conclusion: "None of them knows your project. Your checks do." (S3: a harness checks what you specify.) Never "the study says…" | S3 (not S8) |
| "Models run their own tests now, so harnesses are dying" | Single practitioner talk | Unsafe. Don't use. | S9 |
| "Your coding agent says 'Done.' Your test would say no." (not "says it isn't": the test never ran) | Common documented failure, not universal | Safe as an illustrative scenario. Unsafe: "agents always lie about done", "agents never test" | S4, S5 |
| Hook question "Why does my agent say 'Done' too early?" | Asked in the viewer's voice about a documented failure (LangChain's most common; Anthropic: marked complete without end-to-end testing) | Safe as the viewer's question. Unsafe as a claim: "Why do agents always say Done too early?", "agents lie" | S4, S5 |
| "AI-written tests can't be trusted" / "the agent cheats its tests" | "not good enough yet" (S3) | "AI-written tests can pass bad code." Unsafe: "can't be trusted", "cheats", "always", "aren't good enough yet" (vague, dates) | S3 |
| "A rule is useless" / "the agent ignores rules" | Feedforward alone → rules never get checked | "A rule only asks; nothing checks it." Unsafe: "ignores", "useless" | S3 |
| "It never ran the test" | Newer models often run generic tests (S9); the gap is *your* requirement | "It never ran **your** test." | S5, S9 |
| "Done ✓" at the payoff | Passing means your checks passed; correctness is unsolved | "Now the test passes, so 'Done' means something." Unsafe: correct / bug-free / guaranteed | S3 |
| "The agent catches its own mistake" | The check catches it; the agent fixes it | "The test catches it. The agent reads the error and fixes it." | S3, S5 |
| "A hook always runs your check" | "certain actions always happen rather than relying on the LLM to choose to run them" (re-checked 2026-10-30) | "A hook runs your check every time, not only when the agent decides to." | S7 |
| "The agent can't stop until the test passes" | A hook enforces only what you configured | Unsafe. "A check before 'Done' sends it back to work." | S7, S5 |
| "Agent = Model + Harness" | LangChain's formula | Safe as a definition. Attribute "If you're not the model, you're the harness" if quoted | S6 |
| "…never makes that mistake again" | Hashimoto's stated aim, not a guarantee | "Every mistake becomes a rule it reads or a check it must pass." If quoted, attribute it as his goal | S1 |
| "Keep AGENTS.md short / 100 lines" | OpenAI ~100 lines, "a map, not a 1,000-page instruction manual" | "Keep it short: a map, not a manual." | S2b |
| "Prompt engineering is dead" / "just renamed" | A harness also runs code | Unsafe (lock). "It's more than the prompt: checks that actually run." | S3, S7 |
| "52.8 → 66.5" (if anyone tries to restore it) | LangChain's own agent and run, older model, one benchmark | Out of the script. If restored: "LangChain says its agent went from 52.8 to 66.5 percent, their agent, their test, on an older model." Unsafe: "26% jump", "proven", "your agent will score higher" | S5 |
| "free" / "first" / "best" / "only way" / "cheapest harness" | No source for our use | Don't use | n/a |

_After the script, grep the whole folder (brief, hooks, storyboard, art direction) for "doesn't matter", "5×" next to a harness name, "waste", "never ran the test" and "prove" (LangGraph lesson)._

## Depth (what the viewer must see, not just hear)
- **The false Done, fast:** write → re-read → giant DONE ✓ stamp → stop, while *your* test row `✗ sends reset email` sits red and unrun.
- **The loop closing, slow:** the model sits in the centre with the harness assembling around it (one rule line before, a check after; "Agent = Model + Harness"). Then the hook fires → red → the error text travels back along a lit path into the agent's context → edit → re-run → green. Only then is DONE re-inked as earned.
- **The study, as racing bars:** three *unlabelled* harness bars land level on success, while their cost bars stretch, one to "up to 5×". The pinned task card above them is unchanged, so "the harness you pick" visibly didn't fix the card.
- **The part you build:** the card returns and one new line / one new check snaps onto it (a next mistake → a rule or check), with a "✓ passed ≠ correct" stacked tag for the catch.

_All four stay on one background under the pinned hook question; the card is the one diagram that grows (≤ 5 boxes on screen)._

## Word budget (guide for the scripter: ~150 words, ceiling 155, ≤ 14 beats, ≈ 71 s)
| Section | Words | Beats |
|---|---|---|
| Hook (+ the pinned question) | ~11 | 1 |
| Fast failure (task, write/re-read/stop, "your test never ran") | ~16 | 2 |
| Definition (the harness = what it reads + what checks its work) | ~14 | 1 |
| Loop (a rule only asks → a hook runs your test every time → red → error back → fix → green → "Done" means something) | ~32 | 3 |
| S8 ("Would a better harness fix it?" + same models, three ready-made harnesses, two benchmarks + tasks solved barely moved, cost up to 5×) | ~30 | 3 |
| No ready-made harness knows your project + the habit | ~20 | 2 |
| Catch | ~15–18 | 1 |
| Recap ("Pick a harness for price. Build checks for 'Done.'") + CTA on the card | ~9 | 1 |

If it runs over, trim in this order: the definition's examples, the loop's wording (never its red → back → fix → green steps), then the CTA (fold it into the recap card). Never trim the S8 qualifiers ("ready-made", "two … benchmarks", "up to") or the catch. Re-run the Goldfish after the rewrite (the linter checks the read-aloud sha1).

## Status
- [x] Content plan ready (2026-10-30)
