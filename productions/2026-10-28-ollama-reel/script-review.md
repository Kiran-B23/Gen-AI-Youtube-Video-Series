# Script review · Ollama: run a small AI model on your own laptop (reel)

## Script review · 2026-10-29

**Inputs:** content-plan.md (ticked ready 2026-10-29), script-reel.md (13 beats, 141 words), research.md (S1–S12), brief.md,
hooks.md, comprehension.md (Goldfish run 2, read-aloud sha1 11dd89707503 = current); style-rules.md, learnings.md,
archetypes/tutorial.md. Owner constraint: "keep it short and simple" (~50–65 s). No `our test`: every terminal is an
illustrative replica, labelled on screen.

**Linter (script checks):** all ✓ (13 beats, beats ≤ 6 s, sentences ≤ 16 words, read-aloud clean, hook-first, absolutes
sourced, table = read-aloud 100 %, planned catch present and sourced). The ✗ rows are later stages (storyboard, animation plan,
art direction, publish kit, package.md) plus this review.

**Goldfish vs plan:** TAKEAWAY = the core message (install, one command, answers offline) ✓. WHAT IT IS / WHY I'D CARE said ✓.
Must-include 1–6 all in REMEMBERED ✓. LOST ME: "llama three point two" (no idea what Llama is: the core message's model) and
"seven-billion-parameter" (the must-include 5 gotcha) are blocking by the rubric. "This one line" (install command never heard)
and the 8 GB / 7B / 3B / 2 GB number run are improve items. QUESTIONS LEFT "how do I tell local from cloud?" is the plan's
catch fix (point 6: "need a sign-in … skip the sign-in"), which the script leaves out.

### Verdict: CHANGES
scores: plan 3 · specific 5 · accurate 5 · clear 3 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 3

blocking:
- beat 4: "Step two: type ollama run llama three point two." → "Step two: type ollama run llama three point two, a small AI
  model." (Goldfish LOST ME: Llama never said to be a model; it is the core message's model. "small" = 3B / 2.0GB, S2, S3)
- beat 9: "Now, the size rule. Eight gigabytes of RAM runs seven-billion-parameter models." → "Now, the size rule. Models are
  sized in parameters, the numbers they learned." (Goldfish LOST ME on "parameter", the must-include 5 term; define it before the
  numbers and take one number out of this beat. A definition, no source needed.)
- beat 10: "Llama three point two has three billion, so it fits." → "Eight gigabytes of RAM runs seven billion. Llama three point
  two is three billion. It fits." (the S4 rule moves here, so the comparison is said in one beat; S3, S4)
- beat 11: "One catch: Ollama also offers cloud models, run on its servers." → "One catch: Ollama's cloud models need a sign-in
  and run on its servers." (plan must-include 6 and the catch line: the sign-in is the visible tell and the fix; the Goldfish asked
  "how do I tell a local model from a cloud model?"; also fixes the dangling "run on its servers"; S5, S6). Beat 12 stays as is:
  "Private and offline only applies to local ones, like llama three point two." now reads as the fix.

improve (word budget: they pay for the blocking additions):
- beat 3: "Step one: install Ollama. On a Mac or Linux, it's this one line." → "Step one: install Ollama. On Mac or Linux, paste
  this line." (an action verb for a line the voice can't read; -3 words; S1). Keep the Windows chip on screen (plan point 2).
- beat 5: "The first time, it downloads the model, about two gigabytes, onto your laptop." → "The first run downloads it, about two
  gigabytes, onto your laptop." (-2 words; "it" is mid-sentence, the model was named in beat 4; S3, S7, S8)
- beat 6: "Step three: ask it something, like explain recursion in one line." → "Step three: ask it to explain recursion in one
  line." (-1 word)
- beat 13: "What should I explain next? Tell me below." → "What should I explain next?" (-3 words; still channel-generic)
- beats 9–10 on screen: one number per moment (Goldfish mixed the 2 GB download with 8 GB RAM): the RAM bar shows "8 GB RAM"
  as a bar, never next to the "~2 GB" file; beat 9 overlay "size = parameters · learned numbers", beat 10 "8 GB → 7B · llama3.2 =
  3B · fits"; beat 11 overlay "cloud = sign-in · Ollama's servers".

Net: about 148 words (from 141), ≈ 64 s of speech at 2.3 w/s. That is the top of the owner's ~50–65 s; if the voice take runs
long, the pace ladder adds pauses, not words. Pronunciation note to add: "parameters". The Time column shifts by ~2 s from beat 4.

**After applying:** keep the table and read-aloud identical, re-lint, re-run the `script-comprehension` agent on the new
read-aloud (the sha1 changes), then re-run this review.

- [ ] Script review passed

## Script review · 2026-10-29 (pass 2: rewrites applied, Goldfish run 4)

**Inputs:** script-reel.md (13 beats, lint 149 words ≈ 64–66 s at 2.3 w/s), comprehension.md run 4 (read-aloud sha1
5414cedc8d7e = current). All pass-1 rewrites applied, plus beat 10 "seven billion parameters" (run 3 had no unit).

**Linter (script checks):** one ✗ → `beats ≤ 6 s: #10 17w`. Beat 10 has 17 words, not 16 (8 + 7 + 2), in a 6 s slot. Everything else ✓
(sentences ≤ 16 words, table = read-aloud 100 %, absolutes sourced, catch present).

**Goldfish run 4 vs plan:** TAKEAWAY = the core message, plus the local-only condition ✓. WHAT IT IS / WHY I'D CARE said ✓.
Must-include 1–6 all in REMEMBERED (items 1–6) ✓. "Llama" is no longer lost ✓. LOST ME still has two must-include terms:
"parameters, the numbers they learned" is vague, with two new ideas back to back (must-include 5), and "Ollama's cloud models" came
"out of nowhere" (must-include 6). The pass-1 rewrite dropped "also", which had framed cloud models as a second option in the
same app. Improve items: "paste this line" (the screen carries it), the number burst, and "it" in beat 7.

### Verdict: CHANGES
scores: plan 5 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 3 · understood 3

blocking:
- beat 10 (lint ✗, 17 words in 6 s; Goldfish "three numbers in a row"): split it into two beats, one claim each.
  - 10: "Eight gigabytes of RAM runs seven billion parameters." [VS] · on screen "8 GB RAM → 7B" · S4
  - 11: "Llama three point two is three billion. It fits." [VS] · on screen "llama3.2 = 3B · fits" · S3, S4
  (old 11–13 → 12–14; about 3 s each)
- beat 9: "Models are sized in parameters, the numbers they learned." → "Models are sized in parameters, the numbers they learned in
  training." (Goldfish LOST ME on the must-include 5 term: "vague". The split above also gives the definition its own beat before
  the numbers. This is a definition, so it needs no source.)
- beat 11 (now 12): "One catch: Ollama's cloud models need a sign-in and run on its servers." → "One catch: Ollama also has cloud
  models. They need a sign-in and run on its servers." (Goldfish LOST ME on the must-include 6 term: "out of nowhere". "Also" says
  it's the same app with a second kind of model. S5, S6. 6 + 9 words.)

improve:
- beat 7: "Ollama says it doesn't see your prompts when you run locally." → "Ollama says they don't see your prompts when you run
  locally." (Goldfish couldn't tell whether "it" meant the company or the model. "They" matches S5's "We don't see your prompts".)
- beat 8: "After that one download, it answers even with the Wi-Fi off." → "After that one download, it answers with the Wi-Fi
  off." (-1 word to pay for the additions. Keep "one": the plan's safe wording is "you need internet once".)
- beat 3: "paste this line" stays. A Tutorial puts the exact command on screen (archetype must-have), and the Windows chip covers the
  Goldfish's Windows question. The storyboard must keep the curl line on screen and readable for the whole beat.

Net: about 153 words (lint count), ≈ 66 s of speech at 2.3 w/s, 14 beats. That's at the top of the owner's ~50–65 s. Fix a long
voice take with pauses, never words or atempo.

**After applying:** keep the table and read-aloud identical, re-lint (beats ≤ 6 s must be ✓), re-run the Goldfish (the sha1
changes), and run this review again.

- [ ] Script review passed

## Script review · 2026-10-29 (pass 3: Goldfish run 5)

**Inputs:** script-reel.md (14 beats, lint 153 words), comprehension.md run 5 (read-aloud sha1 fecb29124883 = current).

**Linter (script checks):** all ✓ (14 beats, beats ≤ 6 s, sentences ≤ 16 words, table = read-aloud 100 %, absolutes and numbers
sourced, catch present).

**Goldfish run 5 vs plan:** TAKEAWAY = the core message plus the local-only condition ✓. WHAT IT IS / WHY I'D CARE said ✓.
Must-include 1–6 all in REMEMBERED ✓. Cloud models and the "it" in beat 7 are no longer lost ✓. Remaining LOST ME:
- the install line: the screen carries it by design (Tutorial must-have: exact commands on screen), so no change;
- who makes Llama: not needed for the core message, and research.md has no source for it, so leave it out;
- the size rule: "is it a maximum, does it scale?" This is must-include 5, so it's **blocking**. It is also a plan gap: the plan's
  point 5 is "at least 8 GB of RAM" for 7B models, 16 GB for 13B. The script drops "at least" and the 16 GB / 13B pair, which is
  exactly what turns one number into a rule. Beat 10's "runs" is also slightly looser than S4's "at least".

### Verdict: CHANGES
scores: plan 4 · specific 5 · accurate 4 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 3

blocking:
- beat 10: "Eight gigabytes of RAM runs seven billion parameters." → "Seven billion parameters need at least eight gigabytes of RAM.
  Thirteen billion need sixteen gigabytes." (S4, "at least 8 GB of RAM available to run the 7B models, 16 GB to run the 13B models".
  "At least" answers "is it a maximum?" and the second pair answers "does it scale?". It also restores plan point 5. The unit is said twice
  because run 3 lost a bare "seven billion". 10 + 5 = 15 words is about 6 s, so give it 44–49 s. On screen: an "8 GB" bar labelled "7B" and a "16 GB" bar labelled
  "13B", one per sentence.)

improve:
- beat 9: "Now, the size rule." → "The size rule." ([slow down] already marks the turn; -1 word to pay for beat 10.)
- beat 11 stays: "Llama three point two is three billion. It fits." It now lands below the 7B floor on the bars (the plan's inference
  "this one is a 3B · start small").
- Leave "who makes Llama" and "how good is a 3B model" unanswered. Both are unsourced or locked out by the brief (no quality
  comparison).

Net: about 158 words (lint count), ≈ 69 s of speech at 2.3 w/s. That's about 4 s over the owner's ~65 s. Accuracy and the
must-include make up those words. Fix pace in the voice ladder with pauses, never with atempo. If the owner wants it under 65 s,
the cheapest cut is beat 3's "On Mac or Linux," (the Windows chip and the curl line are on screen), but run 1 asked for it, so
keep it unless the owner asks.

**After applying:** re-lint, re-run the Goldfish on the new read-aloud, and run this review again. If run 6 keeps the size rule
out of LOST ME and nothing new appears on a must-include, this review passes.

- [ ] Script review passed

## Script review · 2026-10-29 (pass 4: Goldfish run 6)

**Inputs:** script-reel.md (14 beats, lint 159 words), comprehension.md run 6 (read-aloud sha1 5373e57bd8ac = current).

**Linter (script checks):** all ✓ (14 beats, beats ≤ 6 s, sentences ≤ 16 words, read-aloud clean, table = read-aloud 100 %,
numbers and absolutes sourced, planned catch present).

**Goldfish run 6 vs plan:**
- TAKEAWAY = the core message, with the local-only and fits-your-RAM conditions ✓. WHAT IT IS / WHY I'D CARE said ✓.
- Must-include 1–6 all in REMEMBERED. The size rule is now remembered as a rule ("7B … 8 GB, 13B needs 16 GB … 3B, so it fits"),
  which matches S4 ✓.
- No LOST ME item is on a term the core message or a must-include depends on:
  - the install line is a screen-carried command (Tutorial must-have);
  - "they" in beat 7 was still read correctly (REMEMBERED 4);
  - "might mix 7/8 and 13/16" is a risk, not a loss: REMEMBERED 5 has the pairs right;
  - "parameters" is now "explained well enough".
- ONE-LISTEN RISK is medium. These are improve items only.

**Accuracy line by line:** b1/b8 use the plan's safe wording (illustrative, after the one download) · b2 MIT "free, open-source" (S12)
· b3 the curl line (S1) · b4–b5 3B, "about two gigabytes" (S3, S7, S8) · b7 attributed company claim, local only (S5) · b10 is S4
nearly verbatim ("at least 8 GB … 7B … 16 GB … 13B") · b11 "it fits" is the plan's allowed inference · b12–b13 the planned catch
with the sign-in tell (S5, S6). No unsourced fact, no overstatement, and none of the plan's banned wordings ("100% private",
"never needs internet", "any laptop", "just one command").

### Verdict: PASS
scores: plan 4 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 4

blocking:
- none

improve (no script change required; the first three are for the visual-plan / storyboard stage):
- beat 10: show one bar per sentence, on its word ("8 GB" + "7B" on "eight gigabytes", then "16 GB" + "13B" on "sixteen
  gigabytes"), then the "3B" block dropping into the 8 GB bar on beat 11. This covers the Goldfish's 7/8 vs 13/16 risk.
- beats 3, 6, 8: the curl line and the Windows chip stay readable for all of beat 3. The recursion reply types out on screen in
  beat 6 and is still visible, Wi-Fi struck out, in beat 8. The Goldfish asked "was the answer any good?" because the voice never
  says it. The screen pays off the hook, using the plan's written-by-us reply, labelled illustrative.
- beat 7 (optional): "Ollama says they don't see your prompts" was read correctly. Only reword it if a later run loses it.
- **Runtime, the owner's call:** 159 words ≈ 69 s of speech at the house 2.3 w/s (the lint estimate is 59 s). That's above the
  owner's "~50–65 s" and the plan's ~130-word budget. Each addition since pass 1 paid for a must-include or a Goldfish loss. If the owner
  wants ≤ 65 s, the least costly cuts are beat 3's "On Mac or Linux," (-4) and beat 13's "like llama three point two"
  (-5). Both were added for Goldfish run 1, so a cut means another Goldfish run. Don't fix pace with atempo.

- [x] Script review passed (2026-10-29)
