# QA · REA ("Reverse Engineer Anything")

_2026-10-14. First `lint_package.py` (33/34 before package.md; the only ✗ was the missing package.md, fixed by writing it), then
the judgement checklist from `references/qa-checklist.md`, including the Launch archetype's must-haves and don'ts._

## Hook & structure
- [x] The first spoken line *is* the hook ("No source code. Just a game file from 1996.", ~3 s); the first frame is described (hooks.md, storyboard row 1, animation plan s01).
- [x] The hook is true and paid off: "one of its functions… all 3,205 tests" returns at s13 (the counter counts to 3,205 with "one function") and s14 (63 / 63); labelled as REA's showcase in beat 3.
- [x] Archetype stated in brief.md (Launch) with the viewer's question and the evidence (3 of 5 REA winners, inspiration.md).
- [x] The script follows the Launch reel beat sheet (Hook → What it is → Demo → Why it's different → The catch → Verdict → CTA), the Demo expanded; no merged sheets.
- [x] Launch must-haves: the demo is shown (the DX-Ball trace, in REA's own showcase, labelled); claims worded as claims ("from the showcase of REA"); the catch only because the content plan judged it material; introduced by what it does (beat 4). Don'ts: no launch trivia (no date, creator, stars, versions), no "game-changer", no verdict without a demo.
- [x] One running example (the DX-Ball sound function) from beat 2 to beat 16, back as a mini card in beat 19.

## Content
- [x] Zero trivia lines (star counts, the creator, version history, install command all cut by the content plan).
- [x] Every fact carries `[Sx]` resolving in research.md with date + label (linter: 7 cited, all resolve).
- [x] Company claims worded as claims; unverified items flagged. **Not verified by us:** the DX-Ball results are REA's own showcase (the reconstruction repo is public); we did not run REA (a local run was blocked by this machine's permission policy). Said in brief, script notes and the description.
- [x] Unsafe wordings from the content plan grepped across the folder: "wrong", "proves/proof", "crucial", "omitted", "free", "clone" (other than "not a clone"), "identical". **Fixed:** brief.md (tone, angle, must-include, runtime), hooks.md (pick, payoff, hook line), research.md (S6 quote replaced with the verified wording, "free" → "open source (MIT)"), inspiration.md (angle, gaps, "identical bytes" → "the same 63 bytes"), publish.md (title 3 said "tested on one function" → "in their own showcase"). Remaining hits are rejected-hook rows, quoted YouTube titles, and notes that forbid the word.
- [x] Catch decision followed: include (the permission line, DISCLAIMER [S9]); the "raw output can be incomplete" point is shown inside the demo, not as a filler "but".
- [x] YouTube analysis done: 12 videos watched (5 REA winners, 1 REA low performer, the category Short, an ad-like low performer, 4 category long-forms); one silent Short noted as unusable; winners-vs-low written.
- [x] Differentiated angle stated (inspiration.md: show the evidence, the incomplete draft and the check, which no video does); no copied lines (the hook and every line checked against the transcripts; "not a copy button" from #6 was not used, ours is "not a clone button", a common phrase that also appears in the content plan's safe wording).

## Timing & pacing
- [x] Runtime: 294 words ≈ 109 s (÷2.7). Over the 30–60 s reel default on purpose (content plan's six must-includes and the check that is the gap); re-hooks at ~33 s ("first draft… incomplete"), ~63 s ("tested against the original") and ~86 s ("Now, the catch"), every 23–30 s.
- [x] Every beat has a visual tag (20/20). Beats over 6 s (#5 8 s, #9 6 s, #11 7 s, #19 7 s) each name an internal visual change in the storyboard (long reel rule); no 4 s without a word-cued change; every number appears on its spoken word (the hook's full counter is the claim itself).
- [x] Pace sits in range: ~2.7 w/s, between the channel's approved reels (2.5–2.7) and the REA winners' 3.5–4.1 (talking heads); no REA Short exists to match (written in inspiration.md).
- [x] Long-form checks: n/a (reel).

## Visual design
- [x] art-direction.md filled: house style `reference-flat`, its palette; one swapped accent (green for matches) with a reason; reference board with "what to take", nothing copied.
- [x] Every storyboard element has a motion verb; continuous spans A–I marked; the function card persists s02–s16.
- [x] Section colours change at every section break (dark → blue → light → dark → yellow → blue → light → dark → yellow → dark); WIPE primary, SLAM / PUSH IN accents. Structure check PASS (plain section titles, no numbers).

## Delivery & ending
- [x] Reads naturally aloud (ask-and-answer "How?", reactions "kept digging", "Now, the catch."); delivery cues present; no avoid-list words (linter).
- [x] Clean read-aloud present (linter: no cues/tags/symbols; table = read-aloud 100 %); captions read standalone (no beat opens on an unclear "it": #4 "It lets your coding agent…" follows the named REA directly; accepted); pronunciation notes for REA, decompiler, 1.5625, 3,205, 1996.
- [x] CTA present and channel-generic ("What should I explain next?"). It doesn't loop to the first frame; the verdict's mini function card echoes the hook instead (accepted, as in the LangGraph reel).
- [x] Publish kit complete: 3 titles, thumbnail (3 words), caption, sources list with links, hashtags, pinned comment, chapters n/a.
- [x] No sources on screen (storyboard source column: "none"); the game view and code are labelled "illustrative".

## Safety (dual-use topic)
- [x] Mechanisms stay at "ask → evidence → rebuild → check"; no install/run commands, no readable addresses or instructions, no commercial app as a target, no DRM / licence / anti-cheat / private-API use; the permission line is said once, plainly.
