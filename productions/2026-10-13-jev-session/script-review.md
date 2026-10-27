# Script review · Jev session

## Script review · 2026-10-13

**Reviewed:** `script-session.md` (house format W12; sources, visual cues, promise ledger and beat sheet in `production-notes.md`).
**Judged against:** content-plan.md (ready 2026-10-13), research.md S1–S17, brief.md, hooks.md (H3), style-rules.md, learnings.md, session-teaching-guidelines.md, archetypes/launch.md.
**Linter:** 14/25. Script-related ✗ and how they were handled:
- "numbers carry a source" (12 lines): W12 bans `[Sx]` tags in a session script. I checked each numbered line against the source map in production-notes.md. All are covered except "well under a dollar" (Intro, see improve). The linter needs a session/W12 mode.
- "planned catch present and sourced": the linter searches for the word "catch". The plan says the catch is the story, not a "but there's a catch" segment, and it is present (Step 6 → calibration → Step 7). Content OK. Tooling mismatch.
- The other ✗ (storyboard, art-direction, publish, qa, animation plan, structure check) are downstream files and outside this review.

VERDICT: CHANGES
scores: plan 5 · specific 5 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a: W12 has no beat table; the script is the read-aloud) · hook 3 · structure 5

### Blocking
1. **Hook:** "A chatbot would need a few seconds, and a whole paragraph." → "A chatbot would write you a whole paragraph about it." (No source gives chatbot latency. S10 has independent tests at 0.5×–12.1× Jev's speed, which puts some LLMs near or under ~1 s, so "a few seconds" overstates. Our own race number ⟦Y⟧ comes later.)
   - Same issue in "An AI That Doesn't Write?": "You waited a few seconds for it. And you paid for every word." → "You waited while it wrote all that. And you paid for every word it wrote." Also add the gemini-3.8-flash output price (its OpenRouter model page) to research.md as S18 and to the source map. Without that source, cut "And you paid for every word it wrote."
2. **Step 1:** "chatbots have a JSON mode that fixes most of this" → "chatbots have a JSON mode built for exactly this" ("fixes most" is an unsourced amount).
3. **Step 3:** "And adding those two questions barely changed the response time. It only adds a few words to what we send." → "And Jev's docs say extra questions barely change the response time. They just add a few words to what we send." (S13 is reported docs, not something we measured. Frame it as their claim.)
4. **Step 3:** "Without that line, Jev might panic at a scary word." → "So we tell Jev up front that a scary word on its own doesn't make a message a scam." (A hedged claim about how the model behaves, with no source or test. The rewrite describes our prompt.)
5. **Step 5 accuracy branches:** add the missing branch, and fix the bridge so it fits every branch.
   - Add: "⟦If Jev is clearly ahead:⟧ Jev actually did better on our hundred. But it's one small test, so don't read too much into it."
   - "And a much bigger independent study found the same pattern." → "And here's what a much bigger independent study found." ("same pattern" is false after the "close / noise" branch. S16 rule: never round in Jev's favour, and don't drop a branch.)
6. **Step 6 + its echoes:** the script has no branch for a run where the Step 4 plant wasn't a confident mistake, or where no mistake was above 0.9. Production-notes has a fallback, but the presenter has nothing written to say. If they read the current lines, they would say something false. Replace lines 185–191 with:
   - "⟦If Step 4 caught a confident mistake:⟧ Here it is, along with ⟦N⟧ more like it. Jev got every one of these wrong, and it was more than ninety percent sure each time."
   - "⟦If Step 4 planted the unsure message:⟧ Here it is. Jev wasn't sure about this one, and that's honest. But now look at these ⟦N⟧. Jev got them wrong, and it was more than ninety percent sure each time."
   - "⟦If no mistake was above 0.9:⟧ Here it is. In this run, none of Jev's mistakes came with more than ninety percent confidence. But it still got ⟦N⟧ wrong, and here's how sure it was about each one."
   - "It's not lying on purpose. It's confident, and wrong." → keep it for the first two branches only. For the third branch, use "It's not lying. It's just wrong."
   - "Jev never broke our code. It handed us a perfectly valid, perfectly confident, wrong answer." → "In our run, Jev never once gave our code an answer it couldn't read. ⟦first two branches:⟧ But it handed us perfectly valid, perfectly confident, wrong answers. ⟦third:⟧ But it still handed us perfectly valid, wrong answers."
   - Calibration: "That's what we just saw." → keep it for the first two branches. For the third branch: "We didn't hit one in our small run, but with enough messages, that's exactly what calibration predicts."
   - Intro agenda: "We'll catch it being wrong, and sure of itself, and we'll understand what its confidence really means." → "We'll catch it being wrong, and work out what its confidence really means."
   - Outro: "caught it being confidently wrong" → "caught its mistakes"
7. **Calibration:** "A chatbot's paragraph doesn't come with a number like this. Jev's answer does, and in tests that number mostly means what it says." → "A chatbot's paragraph doesn't hand you a ready-made number like this. Jev's answer always does. And in that study, its number was better calibrated than most of the chatbots tested." (S5 measured LLM calibration, so LLM confidence does exist. "Mostly means what it says" goes beyond S5's relative "better than 16 of 19".)
8. **Step 8:** "which explains them in plain words: the one thing Jev can't do." → "which explains them in plain words, something Jev can't do." (S14 lists several things Jev can't do: counting, dates, adversarial defence. "The one thing" overstates and contradicts the "doesn't fit" list.)

### Improve
- **Hook / Verdict, claim 2:** "Its makers say … its answers are free" and the quoted "'The answers are free'?". Plan correction S2: the TypeSafe homepage lists only the input price. "Output tokens are free" comes from the promptfoo provider docs and the Layer3 guide. Before recording, check TypeSafe's own pricing/docs page says output is free. If it doesn't, change the hook to "And its pricing doesn't charge you for the answers." and the Verdict to "And free answers? True, for the answers." Either way, drop the quote marks in the Verdict, because that wording isn't verbatim.
- **"An AI That Doesn't Write?":** "Chatbots are built for System Two. Jev is built for System One." → "In TypeSafe's framing, chatbots are for System Two. Jev is built for System One." (company framing, S1)
- **Step 3:** "Scam: ⟦0.9x⟧. Type: ⟦bill disconnection⟧. Pressure: ⟦x⟧ out of 3." → "It's ⟦0.9x⟧ sure it's a scam. It picks ⟦bill disconnection⟧ as the type. And it rates the pressure ⟦x⟧ out of 3." (list fragment, learnings 2026-10-12)
- **Step 5:** "Scams caught: Jev got ⟦…⟧ out of sixty. The chatbot got ⟦…⟧. Genuine messages wrongly flagged: Jev ⟦…⟧, the chatbot ⟦…⟧." → "Out of the sixty scams, Jev caught ⟦…⟧. The chatbot caught ⟦…⟧. And of the forty genuine messages, Jev wrongly flagged ⟦…⟧. The chatbot flagged ⟦…⟧." (list fragment)
- **Step 5:** "And the chatbot gets JSON mode, its best setting." → "And to be fair, the chatbot gets JSON mode." (an unsourced superlative)
- **Step 5:** "Jev cost a median of forty-four times less than nineteen LLMs." → "Jev's cost was, at the median, forty-four times lower than the nineteen LLMs it was compared with." (hard to say aloud; ambiguous comparator)
- **Step 7, DRS:** "In DRS, if the ball is clearly hitting the stumps, the decision is overturned. If it's only just clipping them, it stays umpire's call." → "In DRS, when ball-tracking is clear, it decides. When it's too close to call, it's umpire's call, and the on-field umpire decides." Then "anything in between is umpire's call: we ask the chatbot for a second opinion" → "anything in between is umpire's call: the chatbot decides." ("Clearly hitting → overturned" is only true if the original call was not-out. Cricket-literate viewers will notice.)
- **Step 7:** "on a judging task" → "on a task where an AI judges which of two written answers is better" (term not explained; S6)
- **Step 7:** "It just needs three lines." → "It just needs three lines and a backup." (matches the Step 8 safety line and the outro)
- **Outro CTA:** "which AI tool we should put to the test next" → "what we should explore next" (channel-generic rule, learnings 2026-10-09; X3)
- **Intro:** "this whole session costs well under a dollar": add it to the production-notes source map (S16, the notebook run).
- **Length:** about 2,500 spoken words against the plan's ~2,340 (production-notes says ~2,450). That's about 17 min of speech plus about 2 min of runs, which puts it at the top of the 16–20 min range. Re-time it at the table read (W11) and use the existing cut plan if needed.

### What already works
The core message is said, and it lands in Step 7 and the Verdict. All six must-includes are covered and nothing from "leave out" appears (no Laya, no founder or funding, 444× kept to one line with its missing comparator). The catch is carried as the open loop and pays off in Step 6. The running SMS goes from the hook to the app. Company claims are attributed, our numbers are all ⟦slots⟧ marked "in our run", and S5/S6/S7 match the plan's safe wording. Terms are defined (LLM, JSON, state, Noul/Choice/Score, calibration). The promise ledger is complete, and the Outro covers X1–X3 plus 1930.

- [ ] Script review passed

## Script review · 2026-10-13 (re-review)

**Reviewed:** `script-session.md` after the first review's edits, with `production-notes.md` (updated source map and Step 6 three branches).
**Linter:** 15/21. The script ✗ are the same tooling mismatches as before: "numbers carry a source" (W12 bans `[Sx]`; I checked every number against the source map and all are mapped now, including "well under a dollar" → S16) and "planned catch present" (searches for the word "catch"; the catch is present as Step 6). The other ✗ are downstream files.

**Previous items:** all 8 blocking items are applied correctly. With "you paid for every word it wrote" cut, item 1 is closed without an S18. Every improve item is applied too: claim 2 wording, the Verdict without quote marks, TypeSafe's framing, the list fragments, JSON mode, 44×, DRS, the judging task, "and a backup", the CTA and the source map.

VERDICT: CHANGES
scores: plan 5 · specific 5 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 4 · structure 5

### Blocking
1. **Step 6, closing question (line 199):** "If Jev can be sure and still be wrong, why trust its confidence at all?" → "If Jev's answers can be wrong, what is its confidence actually worth?" (This is a leftover echo of item 6. In the third branch, where no mistake was above 0.9, our run never showed Jev being sure and wrong, so the premise is false. The rewrite is true in all three branches and still sets up the calibration chapter.)
2. **Verdict (line 259):** "The truth isn't. It can be wrong, and sure of itself." → "The truth isn't. A valid number can still be a wrong answer." (The same leftover echo. In the third branch, nothing we showed backs up "sure of itself", and no source shows a confident error. The rewrite is true in every branch.)
3. **Step 4 branches (lines 149–151) do not cover every outcome, and they don't line up with Step 6:**
   - "⟦If one is wrong and confident:⟧ Look at this one. Jev was very sure, and it was wrong." → "⟦If one is wrong at above 0.9:⟧ Look at this one. Jev was more than ninety percent sure, and it was wrong." ("Very sure" is undefined. Step 6 branch 1 then says the plant was "more than ninety percent sure". If the plant was wrong at 0.8, the presenter would say something false.)
   - "⟦If none fooled it:⟧ Look at this one. It landed near ⟦0.5⟧, so Jev isn't sure." → "⟦Otherwise:⟧ Look at this one. Jev gave it ⟦0.xx⟧, its least confident answer of the five." Then optionally add "⟦If it was wrong:⟧ And it got this one wrong." (The current branches leave out two outcomes: a wrong answer below 0.9, and all five right and confident with nothing near 0.5. In both cases neither line is true.)
   - Step 6 branch 2 (line 187): "Jev wasn't sure about this one, and that's honest." → "Jev was less sure about this one, and that's honest." Also relabel the branch "⟦If Step 4 planted the least-confident message, and some race mistakes were above 0.9:⟧" so it can't overlap the third branch.
4. **"An AI That Doesn't Write?" (line 55):** "Today, most people hand those to a chatbot: a large language model…" → "Say you hand those to a chatbot: a large language model…". Don't use "a lot of apps now…" either, because that is still an unsourced trend. ("Most people" is an unsourced, countable claim, and probably false: many of these decisions still run on rules or classic ML. I missed this in the first pass. The rewrite makes it a scenario, not a fact.)

### Improve
- **Step 5, claim 2 (line 169):** "The answers really aren't billed. You only pay for what you send in. That part holds." → "And on our bill, the answers really weren't charged. We only paid for what we sent in. That part holds." (S2 is a reported company claim. "That part holds" needs our own evidence, so check the OpenRouter activity page during the dry run and tie the line to it. If the dry run can't show it, say "TypeSafe's pricing says the answers aren't billed." and drop "That part holds". Then this becomes blocking.)
- **Calibration, last paragraph:** "Jev's answer always does. And in that study, its number was better calibrated than most of the chatbots tested. So we can draw a line with it." → "Jev's answer always does. So we can draw a line with it." (The sentence repeats the "sixteen of nineteen" point from one paragraph earlier.)
- **Verdict, claim 2:** "Free answers? True, for the answers." → "Free answers? True. You don't pay for what it sends back, only for what you send in." Then drop the next sentence, "You pay for what you send in." ("True, for the answers" sounds circular when spoken.)
- **Step 6 branch 3:** "Here it is. In this run…" → "Here it is. Jev gave it ⟦0.xx⟧. And in this run, none of Jev's mistakes…" ("Here it is" with nothing said about the message reads like a dropped line.)
- **Step 6 branch 1:** if ⟦N⟧ = 0, read "Here it is." and drop "along with ⟦N⟧ more like it" and "every one of these". Add this to the production-notes branch note.
- **production-notes.md (not the script):** the Step 7 visual cue still says "overturned / umpire's call / overturned". Change it to "ball-tracking decides / umpire's call / ball-tracking decides", or "flag / chatbot decides / let through". The Verdict stamp "TRUE (FOR OUTPUT)" is fine. Also add "Intro: total session cost" to "Slots to fill after the dry run" so "well under a dollar" is checked against the real bill.
- **Length:** about 2,500 spoken words is unchanged. Re-time it at the table read (W11) and use the cut plan if needed.

### What already works
Everything listed in the first review still holds. The three Step 6 branches each read naturally on their own now, and the echoes in the intro, outro and calibration are branch-safe. The CTA is channel-generic. Every remaining number maps to a source or to our run.

- [ ] Script review passed

## Script review · 2026-10-13 (third pass)

**Reviewed:** `script-session.md` after the re-review edits, with `production-notes.md` (DRS cue, session-cost slot, claim-2 bill check) and `publish.md` chapters.
**Linter:** 15/21. The script ✗ are the same tooling mismatches as before: "numbers carry a source" (W12 bans `[Sx]`, and every number maps to the source map or S16) and "planned catch present" (it searches for the word "catch", but the catch is Step 6). The other ✗ are downstream files.

**Previous items:** all 4 blocking items are closed. The simplified Step 4/Step 6 branching is better than my wording. Step 4's two branches (wrong / all right → least confident) cover every Step 4 outcome. Step 6's reveal (wrong / right) and the race branches (some above 0.9 / none) each read true on their own. The claim-1 line, the calibration line, the closing question (line 201) and the Verdict (line 261) are now true in every branch. The improve items are applied too: claim 2 tied to the bill with a fallback in the notes, the calibration trim, the Verdict claim-2 wording, "Say you hand those…", the DRS cue and the session-cost slot.

**Branch walk:** I ran every path (Step 4: wrong / all right × race: some >0.9 / mistakes but none >0.9 / zero mistakes) through Steps 4, 6, calibration, 7, the Verdict, the intro and the outro. Two paths still produce a false line. Both are below.

VERDICT: CHANGES
scores: plan 5 · specific 5 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 4 · structure 5

### Blocking
1. **Step 7 (line 229), in the "none above 0.9" branch:** "Fewer automatic mistakes. More messages sent to the chatbot. That's the trade." Step 6 said no mistake came with more than 90% confidence. So at 0.90, every mistake already goes to the chatbot: ⟦b⟧ = ⟦b2⟧ = 0, and "fewer automatic mistakes" is false. The same happens whenever ⟦b2⟧ = ⟦b⟧. A stricter line can never add mistakes, so two branches cover every outcome:
   - "⟦If b2 is lower than b:⟧ Fewer automatic mistakes. More messages sent to the chatbot. That's the trade."
   - "⟦If b2 equals b:⟧ Here, the stricter line didn't remove a single mistake. It only sent more messages to the chatbot. So in our run, 0.90 is the better line. Test it on your own messages before you pick yours."
   - Keep "And you pick the line based on what a wrong call costs you." after both.
2. **Zero race mistakes (Step 6 line 193 and its echoes):** if Jev gets all hundred right, the "none above 0.9" branch reads "it still got ⟦0⟧ wrong… Here's how sure it was about each one". Claim 1 ("handed us… wrong answers") and Step 7 also become false. This outcome is unlikely, but the run doesn't rule it out, and nothing written covers it. Fix:
   - Line 193 label: "⟦If none were above 0.9:⟧" → "⟦If there were mistakes, but none above 0.9:⟧"
   - production-notes.md, "Slots to fill after the dry run": add "If Jev makes zero mistakes in the race, stop. Don't record. Re-plan Steps 6–7 with the content-plan agent (the Step 6 payoff and the Step 7 trade both need at least one mistake)." Most of the session is built on Jev making a mistake, so a stop rule is more honest than a patch branch.

### Improve
- **Step 4 (line 149):** "⟦If Jev got one wrong:⟧" → "⟦If Jev got any wrong (use its most confident mistake):⟧" (this tells the presenter which one to plant when there are two).
- **Step 6 branch 1 (line 191):** if ⟦N⟧ = 1, read "Look at this one. Jev got it wrong, and it was more than ninety percent sure." Add this to the production-notes branch note.
- **Reading low probabilities (lines 149–151, 187):** Jev's number is the chance that a message is a scam. So "Jev got it right, but only at ⟦0.30⟧" on a genuine message sounds like 30% confidence, when it means 70% sure the message is genuine. Add a rule to production-notes: "least confident = closest to 0.5. When Jev leaned genuine, say it as '⟦70⟧ percent sure it was genuine'." Example rewrite of line 187's second branch: "⟦If it was right:⟧ Jev got it right, but it was only ⟦70⟧ percent sure."
- **Calibration (line 211):** "So one answer at 0.99 can still be wrong" → "So even a very confident answer can still be wrong". Then "That's what we just saw" matches a run whose mistakes sat at 0.92, not 0.99.
- **Step 6 heading (line 183) + publish.md chapter "8:30 Wrong, and sure of it" + the description's "the confident mistakes":** these are false in the "none above 0.9" branch. Use "Step 6: Catching it wrong" or pick the title after the dry run. The same applies to the production-notes calibration cue "the Step 6 wrong 0.9x message beside it": make it "the Step 6 message (whichever branch happened)".
- **Length:** about 2,500 spoken words. Re-time it at the table read (W11). The cut plan is in place.

### What already works
The hook is true and paid off in every branch. The "half survives" verdict holds even in the weakest branch, through the S7 wording test and the study. Claim 2 is tied to our bill, with an honest fallback. All attributions hold ("TypeSafe says", "independent", "in our run"). The CTA is channel-generic, and the greeting follows the hook.

- [ ] Script review passed

## Script review · 2026-10-13 (fourth pass)

**Reviewed:** `script-session.md` after the third-pass edits, with `production-notes.md` (stop rule, N = 1 reading, the closest-to-0.5 rule), `publish.md` (chapter "8:30 Catching it wrong", description) and the notebook helpers (`jev_helpers.py`: `confident_mistakes`, `band_report`, `verdict`).
**Linter:** 15/25. The script ✗ are the same tooling mismatches as before. "Numbers carry a source" now reports 19 lines because W12 bans `[Sx]`. I checked each one: every number is in the SMS itself, maps to the source map, or is a ⟦slot⟧ (S16). "Planned catch present" searches for the word "catch", but the catch is Step 6. The other ✗ are downstream files.

**Previous items:** both blocking items are closed. Step 7 now has two branches (fewer / same). They cover every outcome, because a stricter line can't add automatic mistakes, and "Either way…" is true after both. The race label now reads "mistakes, but none above 0.9", and the zero-mistakes path is handled by the stop rule in production-notes. Every improve item is applied too: the Step 4 "most confident mistake" label, the N = 1 reading, the closest-to-0.5 / percent-genuine rule, the reveal's "only ⟦70⟧ percent sure", the calibration's "even a very confident answer", and "Catching it wrong" in the heading, the publish chapters and the production-notes table.

**Branch walk:** I ran Step 4 (wrong / all right) × race (some confident mistakes / mistakes but none confident; zero is stopped) × Step 7 (fewer / same) through Step 6, claim 1, calibration, Step 7, the Verdict, the intro and the outro. All 8 paths read true. I also checked the paths against the notebook. `confident_mistakes` counts a mistake as "sure" at p ≥ 0.90 or p ≤ 0.10, and `band_report` uses the same `verdict()` bands. So ⟦b⟧ at 0.90 equals the Step 6 confident count. In the "none" branch, ⟦b⟧ = ⟦b2⟧ = 0, which lands in the "same" branch, and that branch reads true. No path produces a false line.

VERDICT: PASS
scores: plan 5 · specific 5 · accurate 4 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 4 · structure 5

### Blocking
None.

### Improve (production-notes only; none changes the script)
- **What "above 0.9" means (Step 6 lines 191–197, calibration line 211):** the notebook counts a mistake as confident at p ≥ 0.90 *or* p ≤ 0.10, but the labels say "above 0.9". Add this to the branch notes: "'Above 0.9' = the notebook's 'SURE of itself' count (p ≥ 0.90 or p ≤ 0.10). For a mistake that leaned genuine, say it as percent sure it was genuine (0.04 → '96 percent sure it was genuine')." Otherwise, a scam waved through at 0.04 could push the presenter into the "none" branch, and "none of Jev's mistakes came with more than ninety percent confidence" would be false. A mistake at exactly 0.90 counts as "sure" but isn't "more than ninety percent". If that happens, read "ninety percent sure or more".
- **Two different ⟦N⟧s:** line 191's ⟦N⟧ is the confident-mistake count, and line 193's ⟦N⟧ is all mistakes. In the slot list, rename them "Step 6 N_sure (some branch) / N_all (none branch)" so the presenter reads the right figure.
- **N_all = 1 in the "none" branch:** read "But it still got one wrong. Here's how sure it was." and, in claim 1, "But it still handed us a perfectly valid, wrong answer." Add this to the N = 1 note.
- **Step 6 reveal, wrong branch (line 187):** apply the percent-genuine rule here too. A scam that Jev scored 0.20 → "Jev got it wrong. It was 80 percent sure it was genuine."
- **Step 7 "same" branch when ⟦b⟧ = 0:** the line is true, but it sounds odd when 0.90 already had no automatic mistakes. Optional reading: "At 0.90, there were already no automatic mistakes. The stricter line only sent more messages to the chatbot." Keep the rest.
- **Length:** about 2,450 words ≈ 18 min recorded. Re-time it at the table read (W11). The cut plan is in place.

### What already works
The hook is true and paid off in every branch. Claim 1 and the Verdict are true in every branch. Claim 2 is tied to our bill, with an honest fallback. The stop rule is more honest than a patch branch. Every attribution holds ("TypeSafe says", "independent", "in our run"). The greeting follows the hook, and the CTA is channel-generic.

- [x] Script review passed (2026-10-13)

## Script review · 2026-10-13 · v2

**Reviewed:** `script-session.md` v2 (the outside reviewer's changes), diffed against the frozen `versions/script-session-v1.md`. Also read: `production-notes.md` (v2), the notebook `jev_scam_detector.ipynb` (every cell), and `jev_helpers.py`, in particular the new `calibration_buckets` and `cascade_report`, plus `verdict()`, `band_report` and `confident_mistakes`.
**Judged against:** content-plan.md (ready 2026-10-13), research.md S1–S17, style-rules, learnings, archetypes/launch.md. House context is unchanged: W12 format, no tags, ⟦…⟧ slots, greeting after the hook, and the stop rule for zero race mistakes.
**v1 status:** v1 passed (the fourth pass above, ticked) and is frozen. **That tick does not carry over to v2. v2 does NOT pass yet.**
**Linter:** 16/21. The script ✗ are the same tooling mismatches as in v1: "numbers carry a source" (23 lines; W12 bans `[Sx]`, so I checked them by hand; one new unsourced claim is below) and "planned catch present" (the check searches for the word "catch"; the catch is Step 6). The other ✗ are downstream files.
**Deliberately not applied (house rules), accepted:** no sources on screen, the spoken agenda kept, the channel-generic CTA kept, no "can't hallucinate" stated as fact.

**What the two new helpers compute (checked line by line):**
- `cascade_report(results, threshold)`: "unsure" is `1 - t < p < t`, with strict inequalities. That is exactly `verdict()`'s ⚠️ band, so ⟦n⟧ "the chatbot only had to check" equals Step 7's ⟦c⟧ at the same threshold. The backup's cost is Jev's cost on all 100 messages plus the chatbot's cost on the unsure ones only, which is correct (Jev sees every message). Time adds the chatbot's latency on unsure messages (sequential); the script doesn't speak it. Cost per 1,000 is the sum × 10, matching "per thousand messages". An invalid chatbot answer counts as "not a scam" in both the chatbot-alone column and the backup column. It uses no new API calls. ✔
- `calibration_buckets(results)`: confidence = max(p, 1−p), so "how sure it was" in its own answer. ✔ The buckets are `pd.cut([0.5, 0.7, 0.9, 1.0], include_lowest=True)`, which gives [0.5, 0.7], (0.7, 0.9] and (0.9, 1.0]. So "above ninety" in the script matches, but p = 0.90 lands in the "70–90%" bucket, while the notebook labels the top bucket "90%+" and Step 6 / Step 7 treat 0.90 as sure (see improve). An empty bucket shows "—" (see blocking 5).
- The three zones in Step 7 match `verdict()`: p ≥ t → flag, p ≤ 1 − t → let through, otherwise the chatbot. ✔ The slider is symmetric, so the 0.95 asymmetry line is a "you could", not something we demo. That's fine as worded.
- The Step 3 Score scale (none / mild deadline / strong urgency / threats) and the Choice examples (bill disconnection, fake KYC, job scam) match `QUESTIONS` and `SCAM_TYPES`. ✔ The "even if it mentions OTPs…" quote matches the criterion. ✔

**Branch walk:** Step 4 (wrong / all right) × race (some sure / none sure; zero is stopped) × Step 5 accuracy (chatbot ahead / close / Jev ahead) × calibration (rising / not; a bucket empty) × Step 7 threshold (fewer / same) × cascade (close / not; backup ≥ chatbot). The v1 paths through Step 4, Step 6, claim 1, the Verdict, the intro and the outro still read true. The Step 2 plant ("valid = right? hold that thought") pays off in Step 6 in both race branches. The new branches produce four false or unreadable lines (blocking 2–5).

VERDICT: CHANGES
scores: plan 4 · specific 5 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 4 · structure 5

### Blocking
1. **Notebook (stops the recording): `jev_helpers.py` line 15, `__all__`.** The notebook loads the helpers with `from jev_helpers import *`, and `__all__` lists neither new helper. So `calibration_buckets(results)` and `cascade_report(results, threshold)` raise `NameError` on camera, and the calibration ⟦X/Y/Z⟧ and the Step 7 table can't be produced. Fix: add `"calibration_buckets", "cascade_report"` to `__all__`. (I checked this statically with the AST; there's no pandas locally.)
2. **Step 2:** "That's what TypeSafe means by "zero hallucinations": the answer always comes back as a valid number." → "That's the part of "zero hallucinations" you can count on: the answer always comes back as a valid number." (S8 says only that TypeSafe *advertises* "zero hallucinations"; no source says what they *mean*. It also breaks the payoff: if TypeSafe only meant the format, then "Not true about the answer" in Step 6 rebuts a claim they never made, and claim 1 survives in full. The plan's safe wording is "What that really guarantees is the shape.")
3. **Step 7, "same" branch:** "So in our run, 0.90 gave the same accuracy for less money." → "So in our run, the stricter line only added cost. At 0.90, Jev made no more automatic mistakes, and fewer messages went to the chatbot." (The plan's claim-safety table lists "same accuracy" as unsafe. And the logic doesn't hold: in this branch the extra messages sent at 0.99 were ones Jev already had right, so if the chatbot misjudges any of them, 0.99 is *less* accurate, not the same. The rewrite is true in every sub-case.)
4. **Step 7, the backup branches + the study bridge.** In the paths where the backup matches or beats the chatbot, which can happen (S5: "matched or beat"; Step 5's "Jev clearly ahead" branch makes it likely), "close to the chatbot's accuracy" is wrong, and "didn't close the gap" makes no sense because there's no gap. Replace both branches with:
   - "⟦If the backup matches or beats the chatbot:⟧ So the backup matched the chatbot's accuracy, or beat it, at ⟦a fraction⟧ of its cost."
   - "⟦If it's two or three messages behind:⟧ So we got within ⟦k⟧ messages of the chatbot's accuracy, at ⟦a fraction⟧ of its cost. With a hundred messages, that's close."
   - "⟦If it's further behind:⟧ So on our messages, the backup didn't close the gap. Which is exactly why you test this on your own data before you trust it."
   - And the bridge "And this isn't just our small test. That independent study found…" → "And here's what that independent study found, at a much bigger scale. Sending only the low-confidence items to an LLM matched or beat the LLM alone, at a quarter to half of its cost." ("This isn't just our small test" claims our test showed it, which is false after the "further behind" branch. This is the same bug as v1's "found the same pattern". S5 rule: don't round in Jev's favour.)
5. **Calibration, an empty bucket.** Jev's answers are often near 0 or 1, so with 100 messages the 50–70% bucket can easily be empty. The helper then prints "—", and "it was right ⟦X⟧ percent of the time" can't be read. Add after the bucket line: "⟦If a group is empty:⟧ And Jev was never ⟦fifty to seventy⟧ percent sure on any of our messages, so that group is empty." The "go up / don't" branch then compares only the filled groups. Add it to the production-notes branch notes.
6. **Step 1:** "A chatbot charges for every word it writes." The v1 first review required a source for exactly this (proposed S18: gemini-3.8-flash's output price on its OpenRouter page) or a cut, and v1 cut it. v2 brings it back without the source. Either add S18 to research.md and the source map and say "A chatbot charges for the text it writes back." (the bill is in tokens, not words), or cut the sentence: "Either way, look at how much it wrote back, and how long that took. We'll see what that adds up to in the race."
7. **Step 5:** "Both models get the same questions, and both run ten messages at a time." → "Both models answer the same two things, scam or not, and what kind, and both run ten messages at a time." (In `race()`, Jev gets all three `QUESTIONS`, including pressure and the type descriptions. The chatbot gets `LLM_PROMPT`: a probability plus the type *keys*. So "the same questions" is false about our own setup. v1 had "same questions and the same rules" and I missed it in the fourth pass. The notebook's "Same questions, same rules" markdown, cell 14, needs the same fix.)

### Improve
- **Step 7, which threshold the cascade uses:** `cascade_report(results, threshold)` reads the slider's current value, and the script runs it right after sliding to 0.99. "Here are three setups, on the same hundred messages." → "Here are three setups, on the same hundred messages, with the line back at ⟦0.90⟧." In production-notes 7b, replace "re-run after moving the slider" with "set the slider to the line you just chose, then run". That keeps ⟦n⟧ = ⟦c⟧ at the threshold the viewer has in mind.
- **Chatbot's broken answers in the race:** `_llm_one` marks an answer invalid if `scam_type` isn't an exact key, so a JSON-mode chatbot can still produce some. Neither the script nor the cascade's chatbot-alone column says how those are counted. Add in Step 5 after the bill: "⟦If any chatbot answers broke:⟧ And even in JSON mode, ⟦k⟧ of the chatbot's answers came back in a shape our code couldn't use. We count those as 'not a scam'." (The plan's claim-safety row asks for the broken-answer count. It also strengthens the claim-1 contrast.)
- **Step 5:** "And to be fair, the chatbot gets JSON mode." → "And to be fair, the chatbot gets JSON mode, a setting that asks it to reply only in JSON." (v1 defined JSON mode in Step 1. v2 cut that, so the term is now undefined.)
- **`calibration_buckets` edge:** use `pd.cut(sure, [0.5, 0.7, 0.9, 1.0001], right=False, labels=[...])`, so 0.90 counts as "90%+", the same as `confident_mistakes` and `verdict()`. Then the script's "And above ninety" → "And at ninety or more". Optionally read the bucket sizes ("…fifty to seventy percent sure, which happened ⟦k⟧ times…") so viewers can see how small the groups are.
- **Calibration, what to compare against (optional):** after the bucket line, "If its confidence is honest, those should land around sixty, eighty and ninety-five." That turns "surer = more often right" into an actual calibration check (S11).
- **Step 3:** the Score comes back as a decimal (the app prints `:.1f`). Production-notes: "read ⟦x⟧ rounded, and name the nearest label (2.4 → 'about two: strong urgency')."
- **Step 6 opening:** "Now, remember the message I asked you to remember?" → "Now, remember that message from the five tricky ones?" (the doubled "remember" trips when spoken)
- **On-screen notebook text contradicts branch-safe speech** (screen-recorded, so fix before recording): cell 17 "We caught it lying / Wrong, and sure of it" (the script says "It's not lying", and "sure of it" is false in the "none" branch) → "Catching it wrong". Cell 25 "Stricter slider → fewer mistakes" → "Stricter slider → never more automatic mistakes, but more messages land in ⚠️". Cell 28 "wrong, and confident" → "still be wrong". Cell 13 prints all five answers right under the tricky-messages cell, so collapse or scroll past it during the guess pause and the one-by-one reveal.
- **Plan deviations to record** (ask the content-plan agent for a one-line amendment): (a) the calibration buckets are a new cell next to the plan's "reliability plot: leave out (noisy with 100 messages)". The coarse buckets plus the "they don't" branch address that reason, but the plan should say so. (b) Must-include 6 names S6 (CMU, about 99% at roughly half the fee), and v2 drops it. Point 6 is still covered by our own cascade and S5, so this isn't blocking, but either restore one line or note the swap in the plan.
- **production-notes.md, stale after v2:** in the source map, drop the Carnegie Mellon/S6 row (no longer spoken), move "the three question types" to Steps 2–3, add the Step 5 latency caveat → S3, and add S18 if you keep blocking 6. Drop "GPT-6" from the captions list. In the visual cues, the theory section no longer has the JEE split or the Noul/Choice/Score cards (move the cards to Steps 2–3). The promise ledger still quotes v1's agenda ("why anyone would want one", "including one in Hinglish", "stopwatch and a bill"); map v2's three bullets instead.
- **`verdict()` float edge (notebook):** `1 - 0.9` is 0.0999…98, so p = 0.10 goes to the chatbot even though the script says "ninety percent sure or more that it's genuine", and `confident_mistakes` counts 0.10 as sure. Use `round(1 - threshold, 6)` in `verdict()` and `cascade_report`.
- **Length:** the same count method gives v1 2,667 and v2 2,819 spoken words (+152, ≈ +1 min), plus two new cell runs. That's ≈ 19–19.5 min recorded, at the top of the 16–20 range. Re-time it at the table read (W11). The cut plan still applies.

### What already works
The hook is true and its loop pays off in Step 6. Moving the claim-1 verdict out of Step 2 and planting "is a valid number the same as a right one?" makes a better open loop, and the payoff works in both race branches. The 3-bullet agenda, teaching Noul/Choice/Score when they're first used, the explained pressure scale, the one-by-one reveal with "comment your score", the end-to-end latency caveat, "missing a scam is worse" before accuracy, the explicit three zones with one asymmetry line, the electricity-message callback, 1930 in Step 8 and the OTP/account-number warning are all accurate and improve clarity and viewer value. The "We wrote / with help from an AI" slot is the honest way to handle how the 100 messages were made. The greeting follows the hook, the CTA stays channel-generic, and the ⟦slots⟧ are labelled "in our run".

- [ ] Script review passed (v2, 2026-10-13): not ticked. v2 needs blocking 1–7 fixed and a re-review.

## Script review · 2026-10-13 · v2 (second pass)

**Reviewed:** `script-session.md` v2 after the fixes, against the "v2" section above. Also re-read: `jev_helpers.py` (all of it), every cell of `jev_scam_detector.ipynb`, `production-notes.md` v2, and the deviations at the end of `content-plan.md`. Same house context as before: W12, no tags, ⟦…⟧ slots, greeting after the hook, and the stop rule for zero race mistakes.
**Linter:** 16/25. The script ✗ are the same tooling mismatches as before. "Numbers carry a source" flags 24 lines. W12 bans tags, so I checked them by hand against the source map. Every new number is a ⟦slot⟧ / our test (S16) or already mapped. "Planned catch present" is a keyword search; the catch is Step 6. The other ✗ are downstream files.

**v2 blocking 1–7: all fixed.** `__all__` now exports both helpers (line 15–17). Step 2 says "the part of 'zero hallucinations' you can count on". The Step 7 "same" branch is true in every sub-case. The three cascade branches plus the "much bigger scale" bridge are in. The empty-bucket branch is in. Step 1's bill line is now our test, with a check in production-notes. Step 5 says "answer the same two things", and cell 14 matches.
**v2 improve items: applied.** Slider back at ⟦0.90⟧ before the cascade, the broken-answers branch, JSON mode defined. `pd.cut(..., [0.5, 0.7, 0.9, 1.0001], right=False)` gives [0.5,0.7) [0.7,0.9) [0.9,1]. Float check: 1 − 0.1 = 0.9 and 1 − 0.3 = 0.7 exactly, so p = 0.10 lands in "90%+", the same as `verdict()` and `confident_mistakes`. "At ninety or more" matches. `round(1 - threshold, 6)` is in `verdict()` and `cascade_report`, so `cascade_report`'s "backup checked n" equals `band_report`'s "sent for a second opinion" at the same slider value. Cells 17, 25 and 28 are fixed. The Score is read rounded, and the plan deviations are recorded.

**Branch walk.** I walked every path: Step 1 parsed / crashed; Step 4 a wrong one / all right; chatbot broke k > 0 / none; Step 5 chatbot ahead / close / Jev ahead; Step 6 some ≥ 0.9 / none (zero → stop); calibration rising / not / an empty group; Step 7 fewer / same; cascade matches-or-beats / 2–3 behind / further. Every path reads true except two. Both are places where a spoken line describes a table the helper doesn't produce (blocking 1 and 2). In earlier passes I read these helpers for their maths, not for what they show on screen, and missed both.

VERDICT: CHANGES
scores: plan 5 · specific 5 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 5 · structure 5

### Blocking
1. **Step 5, the k > 0 branch versus `scoreboard()`.** The script says: "We count those as 'not a scam.' … Out of the sixty scams, … The chatbot caught ⟦…⟧." But `scoreboard()` grades the chatbot on valid answers only (`grade("llm", valid)`, column "valid answers only, n/100"). So the screen shows e.g. "51 / 57", which contradicts both "we count those as not a scam" and "out of the sixty". It also disagrees with Step 7's "chatbot alone" column, because `cascade_report` does count broken answers as "not scam". So the chatbot's Step 5 and Step 7 numbers wouldn't match. Fix the helper, not the script: in `scoreboard()`, replace `grade("llm", valid)` with `grade("llm", results)`, and change the column label to `"Regular LLM (broken answers count as 'not a scam')"`. A NaN `p_scam_llm` is already `>= 0.5 → False`, and a None type counts as wrong. Delete the `valid = …` line, or keep it only for the label count. (Our test, S16. Claim wording: "always 'in our run'". This is the same rule as in the plan's claim-safety row.)
2. **Step 6, the "none above 0.9" branch:** "Here's how sure it was about each one." `confident_mistakes()` displays only the *sure* mistakes (`sure = wrong[...]`). In exactly this branch the table is empty, so the line points at nothing on screen. The production-notes line for N_all = 1 ("Here's how sure it was.") has the same problem. (I proposed this wording in the first pass, so this is my own miss.) Use one of these fixes:
   - (preferred, helper) In `confident_mistakes`, show *every* wrong message with a column `"sure of itself?"` (✓ when p ≥ scam_at or p ≤ safe_at), sorted with the sure ones first. Keep the printed "wrong on N, SURE on M" line. Both branches then have something to point at, and "Look at these ⟦N⟧" in the "some" branch still works off the ✓ rows.
   - (script only) "But it still got ⟦N⟧ wrong. Here's how sure it was about each one." → "But it still got ⟦N⟧ wrong." Then cut the N_all = 1 "Here's how sure it was." from production-notes.
3. **Notebook cell 8 (on screen in Step 2, right under the float):** "That's what "can't hallucinate" really means: **the format is guaranteed**." This is the error fixed in v2 blocking 2, now in on-screen text. No source says what TypeSafe *means* (S8: they advertise "zero hallucinations"). "Can't hallucinate" is also the wording the plan marks unsafe (content-plan claim table). → "A **number**, the probability that the answer is *yes*. No JSON, nothing to parse, and it can't come back in the wrong shape. That's the part of "zero hallucinations" you can count on: **the format is guaranteed**. Whether the *answer* is right is what we test next."

### Improve
- **Notebook headings that misquote the claim or say "lie"** (screen-recorded; the script says "zero hallucinations" and "It's not lying"):
  - cell 0 title → `# 🕵️ Jev Says "Zero Hallucinations". So We Tried to Catch It Wrong.`, and claim 1 → `**"Zero hallucinations."**`;
  - claim 2 → `**You don't pay for its answers.**` (S2: output-free comes from the provider docs, not a TypeSafe quote);
  - cell 4 → `# Claim #1: "Zero hallucinations". Let's test it.`;
  - cell 11 → `## 🧑‍🏫 Try to fool it`;
  - cell 14 → `# Claim #2: you don't pay for the answers. Is that true?`;
  - cell 28 → `**Claim #1, "zero hallucinations":**`.
- **Step 1, parsed branch:** "Either way, look at how much it wrote back, and how long that took." If the chatbot returns only `{"is_scam": true}`, there isn't "much". Add a production note: if the reply is only the bare JSON, read "Either way, look how long that took." Also: "We'll see how much in the race." → "We'll see what the whole bill comes to in the race." The race shows the total chatbot cost, not the writing part alone.
- **Calibration, an empty group:** the bucket line is read before the empty-group line, so ⟦X⟧ would be "—". Production note: "drop the empty group's clause from the bucket line. If only one group has messages, skip the 'go up / don't' sentence."
- **Step 7, reading ⟦a/b/c⟧:** `band_report` prints "waved through · flagged · sent for a second opinion", not a/b/c. Production note: "a = 100 − sent for a second opinion; b = waved through + flagged; c = sent for a second opinion."
- **Step 5:** "Both models answer the same two things, scam or not, and what kind, and both run ten messages at a time." → "Both models answer the same two things: is it a scam, and what kind? And both run ten messages at a time." (easier to say: one idea per sentence)
- **production-notes.md stale bits:** the 7b beat-sheet row still says "re-run after moving the slider", which contradicts the new "move the slider back to 0.90" note. Change it to "slider at 0.90, then run". The runtime is still "~2,450 words ≈ 18 min". v2 is ≈ 2,800 spoken words on one path, so ≈ 19–19.5 min recorded: re-time it at the table read (W11). In the W7 check, "the message I asked you to remember" is now "that message from the five tricky ones". "Step 6 bucket % (X/Y/Z)" in the slots list belongs to the calibration chapter.

### What works
The v2 fixes land cleanly. The claim-1 open loop ("hold that thought" → "valid ≠ right") pays off on both race paths. The calibration chapter is now honest about small groups. The cascade branches can't overstate our result, and the study bridge no longer borrows its authority. The `verdict()` / `band_report` / `cascade_report` / `calibration_buckets` thresholds all agree at 0.90, including the 0.10 float edge. The hook is true and paid off, the greeting follows it, and the CTA is channel-generic.

- [ ] Script review passed (v2, 2026-10-13): not ticked. Needs blocking 1–3 fixed (two helper/notebook edits, plus one line or a helper change) and a quick re-check.

## Script review · 2026-10-13 · v2 (third pass)

**Reviewed:** `script-session.md` v2 against the "v2 (second pass)" section above. Also re-read: `jev_helpers.py` (all of it), every cell of `jev_scam_detector.ipynb`, and `production-notes.md`. Same house context: W12, no tags, ⟦…⟧ slots, greeting after the hook, and the stop rule for zero race mistakes.
**Linter:** 16/25. The script ✗ are the same tooling mismatches as before. "Numbers carry a source" flags 24 lines; W12 bans tags, so I checked them by hand against the source map, and nothing new is unsourced. "Planned catch present" is a keyword search; the catch is Step 6. The other ✗ are downstream files (storyboard, art direction, animation plan, qa).
**Helpers tested, not just read:** I ran `scoreboard`, `confident_mistakes`, `calibration_buckets` and `cascade_report` on synthetic race tables with pandas 3.0.6 (in the scratchpad, not the repo). Cases: some sure mistakes with 2 broken chatbot answers; mistakes with none sure; a CSV round trip (`load_saved_results` path); every chatbot answer broken (object dtype); and a mix of sure and unsure mistakes.

**Second-pass blocking 1–3: all fixed.**
1. `scoreboard()` now grades the chatbot on all rows. A broken answer (NaN, or None in an object column) gives `>= 0.5` → False, so it counts as "not a scam". The column header reads "Regular LLM (broken answers count as 'not a scam': k)", and its accuracy, scams caught and false alarms equal `cascade_report`'s "Chatbot alone" column exactly (tested). So "We count those as 'not a scam'", "Out of the sixty scams…" and Step 7's chatbot-alone line now describe the same numbers. It also works when every chatbot answer is broken.
2. `confident_mistakes()` lists every wrong message with a "sure of itself?" ✓ column, and ✓ rows sort first (tested on a mixed case). The printed line "wrong on N…, SURE of itself on M" gives N_all and N_sure. "Now let's look at every message Jev got wrong" is true in both branches. "Look at these ⟦N⟧" points at the ✓ rows. "Here's how sure it was about each one" points at a filled table in the none branch.
3. Cell 8 now says "That's the part of "zero hallucinations" you can count on: **the format is guaranteed**", which matches Step 2.

**Second-pass improve items: applied.** Notebook cells 0/4/11/14/28, Step 1 "what the whole bill comes to", the Step 5 sentence split, and the production-notes lines (bare JSON, empty group, a/b/c mapping, N_all = 1, 7b slider, runtime, W7 wording, slot list) are all in.

**Branch walk.** I walked every path: Step 1 parsed / crashed / bare JSON; Step 4 a wrong one / all right; chatbot broke k > 0 / none; Step 5 chatbot ahead / close / Jev ahead; Step 6 Step-4 message wrong / right × race some ≥ 0.9 / none (zero → stop), N = 1 variants; calibration rising / not / an empty group / one group only; Step 7 fewer / same / none at 0.90; cascade matches-or-beats / 2–3 behind / further; Step 8. Each spoken line now matches what the helper prints or the notebook shows. The thresholds agree across `verdict()`, `band_report`, `confident_mistakes`, `calibration_buckets` and `cascade_report`, including p = 0.90 and p = 0.10. Edge reading ("exactly 0.90 → ninety percent sure or more") is covered by production-notes line 94. The Step 4 reveal order matches `TRICKY` and cell 13. The scoreboard's x/60 and x/40 match "out of the sixty / of the forty".

VERDICT: PASS
scores: plan 5 · specific 5 · accurate 5 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 5 · structure 5

### Blocking
None.

### Improve (non-blocking; fix in passing)
- **production-notes beat sheet, Step 6 row:** expected output "N confident mistakes" → "every mistake, sure ones ticked (N_all; N_sure = ✓ rows)".
- **production-notes line 106, N_all = 1:** make the whole replacement explicit: "But it still got one wrong. Here's how sure it was." (Otherwise the presenter reads "about each one" over a one-row table.)
- **Notebook cell 28:** `"free answers"` is in quote marks, as if TypeSafe said it (S2 is pricing, not a quote). → `**Claim #2, you don't pay for the answers:**`, the same as cells 0 and 14.
- **Step 7, "matches or beats" branch:** "at ⟦a fraction⟧ of its cost" assumes the backup costs less than the chatbot. It does unless nearly every message lands in ⚠️. Read the cost cell before saying it.

### What works
All three helper fixes make the screen agree with the voice, and the Step 5 and Step 7 chatbot numbers now match. The claim-1 loop (Step 2 plant → Step 6 "valid ≠ right" → "only half survives") pays off on every race path. The calibration and cascade branches can't overstate our run. The hook is true and paid off, the greeting follows it, and the CTA is channel-generic.

- [x] Script review passed (v2, 2026-10-13)

## Script review · 2026-10-13 · v3

**Reviewed:** `script-session.md` v3 against the frozen v2 (`versions/script-session-v2.md`, passed in "v2 (third pass)") and `yt-comparison.md` §7–§8. Also re-read: `research.md` (S18, S19, the S4 note), `content-plan.md` (must-include 5, cut order), `production-notes.md` (v3 notes), the notebook's `SCAM_TYPES`/`QUESTIONS` cell, `jev_helpers.py` (race, LLM prompt, scoreboard, `make_checker`, app) and `data/scam_messages.csv`. Same house context: W12, no tags, ⟦…⟧ slots, greeting after the hook, the zero-race-mistakes stop rule.
**Linter:** 16/25, the same ✗ as v2. "Numbers carry a source" flags 23 lines. W12 bans tags, so I checked the new numbers by hand: 80–100 % → S18, 0.5 / 2.6 → S12/S19 + slot. "Planned catch present" is a keyword search; the catch is Step 6. The other ✗ are downstream files.
**Sources checked online:** arXiv 2306.13063 (abstract + HTML §5.1/§5.2), promptfoo TypeSafe provider docs, Langfuse "Jev as a judge".

**What checks out**
- **S18 → calibration opening.** §5.1 of the paper says verbalised confidence values "primarily range between 80% and 100%, often in multiples of 5". It also says many wrong answers sit "even in the 100% confidence bar", and failure-prediction AUROC is close to chance. So "most … between eighty and a hundred percent, right or wrong" is supported. Note that the 80–100 % figure is in the paper body, not the abstract that research.md links (see improve).
- **"It's the answer itself"** follows from S1 ("typed decisions with probabilities") and S12 (Noul → one probability). **"TypeSafe says it trains Jev so that number means something"** keeps the company-claim framing (S11, the plan's safe wording).
- **S19 → Step 3 score.** promptfoo says up to 10 levels and "a probability-weighted position along the levels". Langfuse says "1.7 means 'between level 1 and level 2, closer to 2'". So "a weighted average … can land between the levels" and "close to outright threats" are supported.
- **Step 2 reading rule** matches S12 (Noul = probability of yes) and S11 (confidence = how peaked the spread is). It also prepares Step 6's "80 percent sure it was genuine".
- **The trap line** follows from S12 (pick one of your options). promptfoo: "Choice probabilities are relative to the labels you list".
- **`other_scam`.** It's in `SCAM_TYPES` ("Some other kind of scam that isn't listed above"), which matches the spoken "some other kind of scam". The chatbot prompt gets the same list (`LLM_PROMPT.format(types=list(scam_types))`), and the chatbot's validity check accepts it, so the race stays fair. The dataset has no `other_scam` label (all 60 scams fall in the 8 named types, plus 40 `not_scam`). So any `other_scam` pick counts as a wrong type in `scoreboard`'s "scam type correct". That's the right grading, and no spoken line uses that number. `make_checker`/the app show the raw key; that's cosmetic.
- **"16 of 19" without "three frontier models"**: allowed by plan cut order (3), and it isn't an overstatement (16 of 19 implies 3 did better).
- **Step 5 study in one sentence**: the figures match S5.
- **Back-references** ("that same independent study", "the thought I asked you to hold") still come after their set-ups.
- **Pipeline diagram**: production-notes line 69. The S4 note in research.md has been corrected.

**Branch walk.** Every v2 path still holds: Step 1, Step 4, Step 5 (chatbot broke / ahead / close / Jev ahead), Step 6 (wrong/right × some ≥ 0.9 / none, N = 1), calibration buckets, cascade. Two new problems, both in Step 7. **(a)** On the Step 6 "none above 0.9" path, `band_report` at 0.90 always shows b = 0, because the "sure" test is the same p ≥ 0.90 / ≤ 0.10. The merged line then reads "…removed none of the automatic mistakes. That's the trade." There were no mistakes to remove, and there was no trade. Production-notes line 102 has a replacement, but it lives outside the script, it isn't tied to this line, and it doesn't say to drop "That's the trade". v2 had this as a scripted branch, so this is a regression. **(b)** With b > 0 and m = none, "That's the trade" is also wrong: the stricter line only added cost.

VERDICT: CHANGES
scores: plan 5 · specific 4 · accurate 3 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 5 · structure 5

### Blocking
1. **Theory, line 57:** "And you don't train Jev on examples first. You just describe your options in plain English." This is a general claim about Jev, and no research.md source supports it. promptfoo only says Jev "is not trained on customer requests", which is a different point. The plan doesn't list it, and the support in yt-comparison is community videos (CampusX, David). → "And in our notebook, we never train Jev on examples. We just describe the options in plain English. You'll see that in a minute." (This makes it our test, S16. It's shown in Steps 2–3.) Alternative: keep the line and add a fact-sheet row with a source that says it explicitly.
2. **Step 7, line 239:** "So the stricter line sent ⟦k⟧ more messages to the chatbot, and removed ⟦m / none⟧ of the automatic mistakes. That's the trade. And you pick the line based on what a wrong call costs you." → "So the stricter line sent ⟦k⟧ more messages to the chatbot, and removed ⟦m / none⟧ of the automatic mistakes. ⟦If there were no automatic mistakes at 0.90, say instead:⟧ At 0.90, there were already no automatic mistakes, so the stricter line only sent ⟦k⟧ more messages to the chatbot. A stricter line means more checks, so you pick it based on what a wrong call costs you." (On the Step 6 "none" path this line always has b = 0. "That's the trade" misdescribes our run whenever m = none. S16, our test.) Then delete production-notes line 102, which this branch replaces.

### Improve (non-blocking)
- **Calibration, lines 203 + 209:** "means something" is vague, and the link to "calibration" is left for the viewer to make. → line 203: "Jev's number isn't written text. It's the answer itself." Line 209: "That's called calibration, and it's what TypeSafe says it trains Jev for. Across many answers, the ones Jev gives 0.8 should come true about eighty percent of the time." (Same claim and framing, S11. Saves 2 words.)
- **Calibration, line 201:** "most answers landed between eighty and a hundred percent, right or wrong" → "most of their confidence numbers landed between eighty and a hundred percent, whether the answer was right or wrong." ("Most answers landed" sounds like it means the answers themselves. S18 is about the confidence values.) Optional: "In one 2023 study…". The models tested are older, so the date is honest and costs one word.
- **Step 5, line 173:** at 38 words, it's too long to say in one breath, and "at the median" dangles. → "And at a much bigger scale, an independent study of nearly eight thousand examples found Jev typically cost forty-four times less than nineteen LLMs. But it was behind the best one on fourteen of fifteen tasks." (S5; "typically" glosses median.)
- **Step 7, k = 0 (production-notes):** if no message sits between 0.90 and 0.99, read "At 0.99, nothing changed: every message Jev decided was already ninety-nine percent sure."
- **Dry run, Step 3:** check that `a.scores["pressure"].score` comes back on the 0–3 level scale. promptfoo exposes a *normalised 0–1* score, and the notebook prints "/ 3". If it's 0–1, multiply by 3 in the cell before reading "out of 3". Also, if it lands on a whole level (e.g. 2.0), read "So ⟦2.0⟧ is ⟦strong urgency⟧" and keep the "can land between" sentence as the general rule.
- **research.md:** S18: link the HTML (§5.1), because the 80–100 % figure isn't in the abstract. S19: add promptfoo's caveat "Score values aren't calibrated for interpolating between levels" (we only say "close to", which stays inside it). S12: add "Choice probabilities are relative to the labels you list" (the trap line). "The catch" section still lists S4's 67.8 % vs 74.1 % even though S4 is marked not used: strike it.

### Length (+131 words vs v2 by my count, 2,971 → 3,102 including branch alternatives, ≈ +50 s)
That's acceptable for the content, since #1–#6 each answer a real student question. But it's twice the proposal's +60, and the middle is already the retention risk (C1). These exact trims recover about 70 words and bring it back to about +60:
- Line 257, cut: "So the fast model sees every message. The slow model sees only the ones the fast one isn't sure about." (−21; Step 8 and the verdict say it again straight after.)
- Line 261 (plan cut order 1): → "Let's wrap it into an app. Jev decides first, and only the unsure messages go to the chatbot, which explains them in plain words." (−14)
- Line 75: → "Either way, look how much it wrote, and how long that took. We'll see what that writing costs in the race." (−14. If the bare-JSON note applies, read "Either way, look how long that took. We'll see what it costs in the race.")
- Line 103: → "…And it rates the pressure ⟦2.6⟧ out of 3, so ⟦close to outright threats⟧. A score can land between the levels, because it's a weighted average of all of them." (−4. Say the number once.)
- Line 303, cut: "Not bad for one session, right?" (−6)
- Calibration improve above (−2), plus blocking 2's net (about −5 on the main path).

### What works
Each §7 item lands where it's needed. The reading rule pays off in Step 6, the "why not ask the chatbot" opening gives calibration a question to answer, the trap is real in our own options list and fixed in the notebook, and the glance test ties back to the hook. The trims removed the slider branch sprawl without losing the trade. The claim-1 loop, the hook payoff, the greeting and the generic CTA are intact.

- [ ] Script review passed (v3, 2026-10-13): not ticked. Fix blocking 1–2 (two lines plus one production-notes deletion), then a quick re-check.

## Script review · 2026-10-13 · v3 (second pass)

**Reviewed:** `script-session.md` v3 after the fixes from "Script review · 2026-10-13 · v3". Re-read: `content-plan.md` (ready), `research.md` (S12, S18, S19, the S4 row, "the catch" list), `production-notes.md` (Slots + reading rules), the notebook's old-way, `QUESTIONS` and `verdict` cells, and `jev_helpers.py` (`band_report`, `confident_mistakes`, `make_checker`). Same house context as before: W12, no tags, ⟦…⟧ slots, greeting after the hook, the zero-race-mistakes stop rule.
**Linter:** 16/25, the same ✗ as v2/v3. "Numbers carry a source" flags 25 lines. I checked them by hand: every one is mapped (S2/S3/S5/S7/S10/S13/S18/S19) or is a ⟦slot⟧ / our test (S16). "Planned catch present" is a keyword search; the catch is Step 6. The other ✗ are downstream files (storyboard, art direction, qa, animation plan, structure check).

**Fixes verified**
- **Blocking 1 (line 57):** the line now reads "in our notebook, we never train Jev on examples". The notebook's `QUESTIONS` cell has only plain-English `instructions`/`criteria`, with no labelled examples, so this is our test (S16) and it's shown in Steps 2–3.
- **Blocking 2 (line 239):** the merged line and the ⟦no automatic mistakes at 0.90⟧ alternative are in, and the shared closing line is true on every path. The old production-notes line is gone. The k = 0 reading is in (production-notes line 110).
- **Improve items:** line 203 "It's the answer itself." Line 209 "what TypeSafe says it trains Jev for" (S11, company framing). Line 201 "In one 2023 study … most of their confidence numbers … right or wrong" (S18 §5.1, which research.md now links). Line 173 is two sentences with "typically" (S5 median). The trims are applied (lines 75, 103, 259, the Step 8 cut, the outro cut). The pressure-scale dry-run check is production-notes line 111. research.md now has the S19 caveat and the S12 "relative to the labels you list" note, and S4 is struck from the catch list.

**Branch walk (all paths).** Step 1 parsed / crashed. Step 4 any wrong / all right. Step 5 broke-k / chatbot ahead / close / Jev ahead. Step 6 reveal wrong / right × race some ≥ 0.9 / none, plus N = 1 and N_all = 1 (production notes). Calibration: empty group, up / not up, some / none ≥ 0.9. Step 7: b > 0 with m > 0, b > 0 with m = none, b = 0 (the scripted alternative, which is forced on the Step 6 "none" path because `band_report` and `confident_mistakes` share p ≥ 0.90 / ≤ 0.10), and k = 0 (which forces m = 0, so "nothing changed" is consistent). Cascade: matches / close / behind, with the cost-row check. Zero race mistakes → stop rule (production notes line 95). Every path reads true, and none contradicts what's on screen.

VERDICT: PASS
scores: plan 5 · specific 4 · accurate 5 · clear 4 · value 4 · spoken 4 · match 5 (n/a, W12) · hook 5 · structure 5

### Blocking
None.

### Improve (non-blocking)
- **Calibration, line 221:** "In that same independent study, Jev's confidence was better calibrated…" Since v3, two other studies sit between this line and Step 5: the S7 "independent test" (line 187) and the S18 "2023 study" (line 201). A viewer could pin Jev's result on the 2023 study, which never tested Jev. → "In that eight-thousand-example study from the race, Jev's confidence was better calibrated than sixteen of the nineteen LLMs." (S5)
- **Step 7, line 239:** the main sentence has no condition marker, so a presenter reading cold may say both versions. → put "⟦If there were automatic mistakes at 0.90:⟧" before "So the stricter line sent…", and change "⟦If there were no automatic mistakes at 0.90, say instead:⟧" to "⟦If there were none:⟧". The last sentence ("A stricter line means more checks…") stays shared.
- **Step 3, line 103:** "So it's ⟦close to outright threats⟧" now follows the general rule, so the "So" doesn't follow from anything. → "And it rates the pressure ⟦2.6⟧ out of 3, so ⟦close to outright threats⟧. A score can land between the levels, because it's a weighted average of all of them."
- **production-notes line 105:** it still quotes the old wording ("skip 'how much it wrote back'"). → "Step 1: if the chatbot replied with bare JSON only, read 'Either way, look how long that took. We'll see what it costs in the race.'" (The old-way prompt shows `{"is_scam": true}` as the example, so a bare reply is likely.)

### Length
Raw `wc -w` is 3,291, against 3,176 for v2 (+115, including the branch alternatives and slot labels). On the main path that's about +60 to +70 spoken words, roughly the agreed budget. Watch the middle (C1) in the table read.

### What works
Both claims are tested and paid off with the right labels. Every absolute is now our test or attributed. The Step 7 trade can't misdescribe our run on any branch. The calibration chapter goes question → weather → our buckets → S5, and the "TypeSafe says" framing is intact.

- [x] Script review passed (v3, 2026-10-13)
