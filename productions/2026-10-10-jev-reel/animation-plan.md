## Approval
- [x] Structure check passed (2026-10-12)

## Structure check · 2026-10-12
```
VERDICT: CHANGES
archetype: Launch · steps justified: no · why: the four sections (read the ticket / check the cost / find the catch / route it) are Launch story beats (demo, cost, catch, verdict); cost and catch can swap without breaking the logic, and brief.md:22 already promises "a step-free Launch flow".
findings:
- jev-reel stage/stage.html:4 + stage/stage.js:15-19 · 4-segment progress bar "#prog" with "/ 04" label → remove
- jev-reel stage/stage.html:29-32 (s03, s05, s08, s10; animated in stage/stage.js:44-55, 70, 115, 135) · chapter cards "STEP n OF 4" + numerals 01-04 → replace with plain section titles "Read the ticket" / "Check the cost" / "The catch" / "Route it" (no kicker, no numeral; keep the section colour change)
- jev-talk stage/stage.html:4 + stage/stage.js:15-19 · same 4-segment progress bar "/ 04" → remove
- jev-talk stage/stage.html:29-32 (stage/stage.js:55, 70, 118, 138) · chapter cards "STEP n OF 4" + 01-04 → replace with "Read the ticket" / "Check the cost" / "The catch" / "Route it"
- jev-glass stage/stage.html:4 + stage/stage.js:4 · progress ring with "STEP n / 4" label (kit progress()) → remove
- jev-glass stage/stage.html:25-28 (stage/stage.js:29, 42, 87, 107) · chapter cards "STEP n OF 4" + 01-04 → replace with "Read the ticket" / "Check the cost" / "The catch" / "Route it"
- jev-spring remotion/Stage.tsx:53, 86, 158, 192 · <StepHead n={1..4}> = 4-pip step progress + "STEP n OF 4" → replace with a plain title header (same titles, no pips, no "of 4")
- jev-3b1b clips/b_ticket.py:7, c_cost.py:8, d_catch.py:8, e_route.py:8 · header(n, 4, …) draws "Step n of 4" above each title → replace with the title alone ("Read the ticket" / "Check the cost" / "Find the catch" / "Route it"), drop the "Step n of 4" line
- storyboard-reel.md:18 (s12) · recap card "SAVE THIS" with four numbered rows → replace with unnumbered verdict rows (they summarise a verdict, not steps the video taught); the built stages already show an unnumbered verdict, keep that
- jev-reel / jev-glass stage "3 · ANSWERS · ONE PASS" (s04) → keep (a spoken number, not a structure device)
```
Root cause to fix once (not edited here): the shared helpers bake numbering in — `studio/templates/styles/hyperframes-glass/kit.js:39-43` (progress label "STEP k / n"), `studio/remotion/src/styles/remotion-spring/kit.tsx:77-89` (StepHead), `studio/templates/styles/3b1b-manim/b1b_kit.py:28-34` (header "Step n of total"). Give each an unnumbered variant for non-Tutorial/non-Concept reels.

## Structure check · 2026-10-12 (re-check after fixes)
```
VERDICT: PASS
archetype: Launch · steps justified: no · why: the four sections are Launch story beats (demo, cost, catch, verdict), and every built stage now shows them as plain titles with the section colour change, no numbers.
findings:
- jev-reel, jev-talk stage/stage.html:27-30 · section cards are plain titles "Read the ticket" / "Check the cost" / "The catch" / "Route it" (no numeral, no "STEP n OF 4") → keep
- jev-reel, jev-talk stage/stage.html + stage.js · no #prog element and no progress animation; only orphan .prog/.proglab rules left in stage.css:9-12 (not rendered) → keep (optional cleanup)
- jev-glass stage/stage.html:24-27 · plain-title section cards; progress() is never called and NUMBERED is not set, so no "STEP k / n" label → keep
- jev-spring remotion/Stage.tsx:53, 86, 158, 192 · <StepHead n=…> without numbered, kit default numbered=false (kit.tsx:78), so title only, no pips, no "STEP n OF 4" → keep
- jev-3b1b clips/b_ticket.py:7, c_cost.py:8, d_catch.py:8, e_route.py:8 · header(n, 4, title) with b1b_kit default numbered=False (b1b_kit.py:28), so title + underline only → keep
- storyboard-reel.md:18 / scenes.json s12 · verdict rows are unnumbered; the built stages show "VERDICT" (the stale "Save this" prop title in scenes.json is not drawn by any stage) → keep
- jev-reel / jev-glass s04 "3 · ANSWERS · ONE PASS" · a spoken count, not a structure device → keep
- all five out/*.mp4 renders are newer than the fixed stage/clip/kit sources (reels 14:57 sources → renders 15:01-15:36) → keep
```
Leftover cosmetic notes (no on-screen effect): stage.html:1 comments in jev-reel/jev-talk/jev-glass still say "through 4 (numbered) steps", and the 3b1b clip docstrings say "(Step n)".
