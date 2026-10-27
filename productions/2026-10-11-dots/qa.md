# QA · OpenAI Dots (reel, v3: the validation pilot for the new scripter gates, 2026-10-16)

`lint_package.py`: see the last run at the end. The four gates: content-plan READY · script-review PASS (pass 2) · visual-plan PASS
(plan mode pass 2; storyboard mode PASS) · structure-check PASS. The user-approval line in `animation-plan.md` is left pending on
purpose (the user approves the plan).

## Hook & structure
- [x] The first spoken line *is* the hook ("It's three A.M. A bug report lands in Slack."); the first frame is described in hooks.md (131 words) and as "frame 0" in the plan's s01
- [x] The hook is true (OpenAI's own example job, S14 · S15; said out loud in beat 6, "illustrative" on screen) and paid off: beat 8 lands the same "Review the fix" link and clicks it
- [x] Archetype stated in brief.md with the viewer's question and the evidence (3 of 4 winners are Launch videos)
- [x] The script follows the Launch reel beat sheet (hook → what it is → demo → why it's different → the catch → verdict → CTA), demo expanded to five beats; no merged sheets, no numbered steps
- [x] Launch must-haves: the demo is shown (beats 5–8 inside the replica), claims worded as claims (official Help Center wording; "In OpenAI's own example"), the catch is material and planned (beats 16–17), introduced by what it does (beat 3). Don'ts: no launch trivia, no "game-changer", no verdict before the demo
- [x] One running example (the 3 AM checkout bug) introduced in beat 1 and carried through to the verdict (beat 18 re-opens the same review bubble)

## Content
- [x] Zero trivia lines (model name, event, date, characters, texting, plans, regions all out: content-plan Leave out)
- [x] Every fact has a source tag that resolves in research.md (S14 official docs, S15 official page, both with date and label; press rows kept as the record)
- [x] Company claims labelled (research.md labels; the description says every feature claim is OpenAI's own); unverified items flagged in brief.md (Wayback reads; no our test)
- [x] Every wording the content plan marks unsafe is gone from the whole folder (grep 2026-10-16 after the rewrites: hits only in never-say contexts, analysis data and research.md's tables)
- [x] The catch decision in content-plan.md is followed (include: the memory / Reset point, S14; "can make mistakes" opens the verdict as planned; no filler catch)
- [x] YouTube analysis done: 4 winners watched (yt/, yt/v2); no low performer met the 5K-subscriber rule, the low-reach Shorts were analysed from stats and titles (stated in inspiration.md); winners-vs-low findings written
- [x] Differentiated angle stated (the control dial and the memory catch nobody covers in a Short, inside the real UI); no copied lines

## Timing & pacing
- [x] Runtime: 218 words ≈ 95 s of speech at the house 2.3 w/s (`studio/templates/reel/pace.json`), ≈ 105–110 s with pauses; a long Short with re-hooks at ~52 s ("Now, the part that matters") and ~74 s ("Now, here's the catch")
- [x] Reels: every beat has a visual tag; beats 6 (19 w) and 11 (19 w) run to ~8–9 s with 4–5 word-cued internal changes each (allowed for > 60 s reels); numbers appear on their spoken word ("12 passed" on "tests", 7:00 on "morning")
- [x] Pace: 2.3 w/s is the house rule (brand.md, 2026-10-16), below the winners' 2.75–3.55; the reason is written in inspiration.md
- [x] Long-form items: n/a (reel)

## Visual design
- [x] art-direction.md filled: house style `reference-flat`, dials realistic · image-led, reference board (benchmark + the five official screenshots read before writing + ig-reels motion notes), the Replica block (official sources, lifted fonts/colours, waits cut with "sped up" chips, rights), locks
- [x] Every storyboard element has a motion verb; continuous spans A–G marked; the dot window persists from frame 0 to beat 19 and changes state in every section
- [x] Section colours change at every break (dark → blue → light → yellow → dark → blue → dark); primary transition = the house wipe + section title, accents = the window shrinking into the avatar on Reset and the camera pushes (15 moves ≈ 8/min, each with a reason)

## Delivery & ending
- [x] Reads naturally aloud (to "you", contractions, "How?", "My take?", a breath before the catch); delivery cues present; no avoid-list or vague words (linter)
- [x] Clean read-aloud text present and identical to the table (100 %); captions name the thing ("That's a dot", "Each dot…"); pronunciation notes present
- [x] CTA present and channel-generic ("What should I explain next?"); the verdict replays the hook's review bubble, so the ending loops to the first image
- [x] Publish kit complete (3 titles, thumbnail ≤ 4 words, description with the illustration note, sources with links, hashtags, pinned comment; chapters n/a)
- [x] No sources on screen (description only); the replica carries "illustrative" and "sped up" chips

## Gates (this run)
- [x] content-plan.md: READY (core message 20 words; catch: include, with the reason and the exact point)
- [x] script-review.md: pass 1 CHANGES (3 linter items + 1 accuracy improvement) → applied → pass 2 PASS (all scores ≥ 4)
- [x] visual-plan (plan mode): pass 1 CHANGES (cue order s13, six hold > 1.5 s findings, rule-9 hits in v1 files) → applied → pass 2 PASS; storyboard mode: PASS
- [x] structure-check: PASS (Launch, plain titles, four unnumbered rule rows)
- [x] The user-approval line is pending by design; `/video-studio` must not build before it is ticked

## Last lint run
See the "lint_package" line reported with the package (the only ✗ is "animation plan: approved", pending the user).
