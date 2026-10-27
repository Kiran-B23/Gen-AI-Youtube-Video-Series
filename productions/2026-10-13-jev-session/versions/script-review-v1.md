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
