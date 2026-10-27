# Script review · OpenAI Dots (v3 reel)

## Script review · 2026-10-16

**Inputs:** content-plan.md (ticked ready 2026-10-16), script-reel.md (v3, 17 beats), research.md (S14 Help Center · S15
openai.com re-read via their Wayback snapshots), brief.md, hooks.md; style-rules.md, learnings.md, archetypes/launch.md. No
`our test`: the demo is an illustration of OpenAI's own example job (S14 "Improve an app … working changes to review", S15 "A bug
appears in Slack, and dots immediately start investigating").

**Linter (script checks), pass 1:** 3 ✗ → `sentences ≤ 16 words` (#11, one 19-word sentence), `numbers carry a source` (3 prose
note lines under the table carried digits with no source: the italic rows note and the accuracy notes), `script review: passed`
(this file). Everything else ✓ (beats ≤ 10 s, read-aloud clean, hook-first, no avoid-list or vague words, absolutes sourced,
table = read-aloud 100 %, planned catch present and sourced).

### Pass 1 (as submitted): CHANGES
scores: plan 5 · specific 5 · accurate 4 · clear 5 · value 5 · spoken 4 · match 5 · hook 4 · structure 4

blocking:
- beat 11: "There are four levels: act without asking, act only when you asked, ask first, or hand it to you." → "There are four
  levels. Act without asking, act only when you asked, ask first, or hand it to you." (one 19-word sentence; the house limit is
  16 and the caption engine needs the break; the words don't change, S14)
- notes under the table: "beats 1–2 and 6–8 … (S15 …) … Beat 11 …" → written as bullet notes, not prose (the linter reads
  unprefixed prose as spoken text and flags its digits as unsourced numbers; a bullet list is a note)
- Source column "S14 · S15" → "S14, S15" (the linter's Source-column regex accepts commas only; otherwise a beat with a number
  would be read as unsourced)

improve:
- beat 6: "So it doesn't just talk about the bug. It writes the fix, and tests it." → "So it doesn't just talk about the bug. In
  OpenAI's own example, it writes the fix, and tests it." (hook payoff / accuracy: the 3 AM story is OpenAI's example, not a
  recorded run; the Launch rule says the company's demo is "labelled as such"; "illustrative" on screen is not enough for a
  listener. REA did the same with "That's from the showcase of REA", learnings 2026-10-14, S14 · S15)
- beat 16: "Start it on ask first" is our shorthand for the Help Center's "Ask before taking action"; keep it (beat 11 has
  already paired "ask first" with the exact label on screen), but the storyboard must show the exact label on the row the
  cursor picks.

### Applied (table and read-aloud kept identical)
All three blocking items and the beat 6 improvement were applied to script-reel.md (218 words ≈ 95 s at 2.3 w/s; the Time
column of beats 6–17 shifted by ~1 s). Re-linted: every script check ✓, table = read-aloud 100 %.

### Pass 2 (revised script): PASS
scores: plan 5 · specific 5 · accurate 5 · clear 5 · value 5 · spoken 4 · match 5 · hook 5 · structure 4

Checked line by line against the plan:
- **Plan adherence:** core message said across beats 3–5 and 10 ("always-on agent inside ChatGPT", "its own cloud computer",
  "keeps working between your chats", "you decide how much it can do alone"); must-include 1–6 all present (1 → b3–4, 2 → b5/b7,
  3 → b1–2/b6/b8, 4 → b9, 5 → b10–12, 6 → b13–15); nothing from Leave out (no plans, prices, regions, app count, Teams, model
  name, characters, texting, local-computer access, proactive read-only detail); the catch is the planned one (b13–14) and the
  "can make mistakes" line opens the verdict as planned (b15).
- **Accuracy vs S14 / S15:** b3 "always-on agent in ChatGPT" ✓ · b4 "keep making progress between conversations" ✓ · b5 "its own
  cloud computer" + "cloud browser" ✓ · b6 "Scope a change, write code, and test it" ✓, labelled as OpenAI's example ✓ · b7 "open your
  dot's computer … to view" / "inspect its work" ✓ · b8 "bring results back for your review" ✓ · b9 "review your calendar each
  morning" ✓ · b10 "define what it can do on its own" ✓ · b11 the four behaviours, "only when you asked" = the pre-approved
  definition ✓ · b12 "must be completed by you" / "always stay with you" ✓ · b13 "does not delete information your dot has already
  obtained" ✓ · b14 "Reset deletes your dot, including its conversations, saved memories, and scheduled tasks" ✓ · b15 "can make
  mistakes, including when following your rules. Review its work" ✓ · b16 is marked as opinion ("My take?").
- **Specificity:** every beat carries the running example, a named mechanism or an exact UI behaviour; no pasteable lines.
- **Clarity:** "dot" is defined by what it does before anything else; "cloud computer" is explained by what it lets the dot do;
  "pre-approved" is never said, only its plain meaning.
- **Spoken:** "you", contractions, ask-and-answer ("How?", "My take?"), a breath before the catch; b11 is a list by nature (the
  four options) and stays at 4, not 5.
- **Hook and payoff:** first line is the hook, true as OpenAI's own example (said so in b6), paid off in b8 with the same
  "ready for review" link; CTA channel-generic.
- **Structure:** Launch beat sheet, plain sections, no numbered steps; "four levels" is a counted list that the screen matches
  (4 rows, unnumbered).

blocking: none

improve (optional, not required for PASS):
- b9 could end on the viewer ("… every morning, without you asking") if the voice take runs short; not needed.
- Runtime: 218 words ≈ 95 s of speech, ≈ 105–110 s with house pauses; inside the brief's 85–110 s. If the Gemini take runs over
  2.6 w/s on b11 (19 words), the pace ladder adds `pauseAfter` on "levels." before any retake.

Folder grep (the plan's list: 4,000 / 4000 / Teams / Pro / Business / Premium / EEA / EU / UK / Switzerland / $ / Astra /
anything / everything / forgets): none in script-reel.md. Hits remain in brief.md, hooks.md (the old "4,000 apps" cut note),
inspiration.md and publish.md from v1; those files are rewritten in the next stages and the visual-plan gate greps them again.

- [x] Script review passed (2026-10-16)

## Script review · 2026-10-27 (s11 reworded at the user's request)

**Why:** the Goldfish could not tell "act without asking" from "act only when you asked" (beat 11) and could not keep the four
levels apart. Beat 11 was rewritten and split into beats 11–12 (old 12–17 → 13–18); beat 14 names Slack ("Disconnect an app
like Slack from your dot, and what it already read there stays"), because "an app" and "learned" had no referent in 3 Goldfish runs.

**Goldfish runs on the four levels (16 fresh runs, 11 wordings; each heard only the read-aloud):** every run kept "ask first",
the password floor and the catch, but every one put the levels in LOST ME, nearly always because the top two ("without asking"
vs "pre-approved") sounded alike. Wordings tried: distinct verbs ("go ahead" / "do only what your prompt says"); the merge as a
concrete rule; parallel "It can …"; the label word "pre-approved"; named levels ("Pick X, and …", "X means …"); an explicit
contrast ("even if you never mentioned it"); a ladder (top → bottom); a consent axis ("no okay / okay in advance / okay every
time"); two pairs ("in two it acts alone, in the other two you're in charge"); a dial (261 words, over budget: the only run that
listed all four as distinct items in REMEMBERED, still with the top two in LOST ME). Current draft = the two-pairs wording
(247 words).

### Verdict: CHANGES
scores: plan 4 · specific 4 · accurate 4 · clear 3 · value 4 · spoken 3 · match 5 · hook 4 · structure 4 · understood 2

blocking:
- beats 11–12: the four levels (must include 5) are in LOST ME in every run and never in REMEMBERED as four distinct items
  except once (dial, over budget). Fixing a line hasn't worked 11 times, so per SKILL 5a the content plan is the problem: a
  one-listen reel can't carry four levels whose top two differ only by "was it in your prompt". User decision needed (see below).
- beat 12 (draft): "Hand off, you do it yourself" is read backwards ("hands-off") in 2/2 runs. Don't use "hand off" as a spoken name.

improve:
- beat 3: "That's a dot" is heard as a common word in most runs (product name unclear); the screen's "A DOT" carries it.
- beat 15: "memories" is new at the catch (5 runs).

**Options for the user (content plan, must include 5):** (a) say two levels aloud, the two ends plus the recommended one
("it can act without asking, ask first, or hand the job to you"), with all four exact labels on screen; (b) keep four but give
each its own beat with a picture (~+15 words, ~255 total); (c) accept the dial wording at 261 words.

- [ ] (superseded by the option-b review below)

## Script review · 2026-10-27 (option b, the user's choice)

**Change:** the four levels get one beat each (11–14: "At the top, it acts on its own, without asking you." · "One step down,
it acts only on what your prompt already asked for." · "Next, it asks you first, and waits for your okay." · "At the bottom, it
doesn't act. It hands the job back to you."), each with its own slot showing the exact Help Center label on its word; "hand
off" is never spoken. Beat 16 keeps the Slack referent. Old beats 12–17 → 15–20. 250 words (lint count 253, ≈ 124 s with pauses).

**Goldfish (watch mode, `--viewer-text`):** two fresh runs. Run 1 listed the four levels as one distinct REMEMBERED item but
flagged a "real loss" on beat 17: garbled ON SCREEN text, a parsing artifact from a > 80-character quote in the storyboard row
(not in the video). The row was rewritten (quotes ≤ 80 chars) and the viewer text re-checked clean. Run 2, saved verbatim in
`comprehension.md`: the four levels are REMEMBERED item 5 as four distinct levels; the level-2 LOST ME says "With both, I got
it" (screen needed, allowed); no "lost even with the screen".

**Linter (script checks):** all ✓ (20 beats, beats ≤ 10 s, sentences ≤ 16 words, table = read-aloud 100 %, read-aloud clean).

### Verdict: PASS
scores: plan 5 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 4

blocking:
- none

improve (left for the user; no change, per "change nothing else unless blocking"):
- beat 16: "what it already read there stays": "stays where?" (the next beat says "memories"); the screen's memory notes carry it.
- beat 3: "That's a dot": the name needs the screen's "A DOT"; it has it.
- beat 6: "In OpenAI's own example" vs "illustrative": kept, the accuracy rule needs both.

Accuracy: beats 11–14 match S14's four labels and the pre-approved definition ("you explicitly requested the action in your
prompt" = "only on what your prompt already asked for"); "at the top / one step down / at the bottom" orders the labels as the
Help Center lists them (most to least autonomy), with no claim about a default.

- [x] Script review passed (2026-10-27)
