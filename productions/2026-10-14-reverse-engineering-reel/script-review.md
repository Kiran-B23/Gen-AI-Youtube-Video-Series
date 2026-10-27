# Script review · REA ("Reverse Engineer Anything") reel

## Script review · 2026-10-14

**Inputs:** content-plan.md (ticked ready 2026-10-14), script-reel.md, research.md, brief.md, hooks.md; style-rules.md,
learnings.md, archetypes/launch.md. Primary sources re-checked today: rea.tools/showcase/dx-ball/ (S6), README and
DISCLAIMER.md (S1, S2, S8, S9), and the reconstruction repo README (github.com/N0zoM1z0/dx-ball: "Codex uses REA to inspect
the original executable … recover its functions", which supports "an AI agent rebuilt one of its functions").
No `our test`: every demo fact is labelled as REA's showcase (beat 3).

**Linter (script checks):** all ✓ before and after the edits (table = read-aloud 100%, sentences ≤ 16 words, beats ≤ 10 s,
absolutes sourced, catch present). Remaining ✗ are downstream stages (package.md, storyboard rows, publish sources,
animation plan, art direction, structure check), not script findings.

### Pass 1 (as submitted): CHANGES
scores: plan 5 · specific 5 · accurate 3 · clear 3 · value 5 · spoken 4 · match 5 · hook 5 · structure 4

blocking:
- beat 5: "REA runs the decompilers experts already use, and hands back the evidence." → "REA runs existing decompilers, which turn compiled code back into readable code. Then it hands back the evidence." (clarity: "decompiler" is the video's key term and was never explained; brief.md says the viewer "has never opened a decompiler". "Existing" keeps must-include #1, not a new decompiler [S4])
- beat 11: "Times the pan scale. Left edge, minus 500. Centre, zero. Right edge, plus 500." → "Times the pan scale, which starts at one. Left edge, minus 500. Centre, zero. Right edge, plus 500." (accuracy: ±500 holds only at scale 1.0, the value read from the file; at the tested scale 20 it would be ±10,000. Also tells the viewer what "pan scale" is before beat 13 reuses it [S6])

improve:
- beat 8: "the raw instructions clearly take a number in" → "the raw instructions take a number in" ("clearly" is our intensifier; the showcase says the instruction view "exposes" the input [S6])
- beat 19: "learning, security work and old software" → "learning, security work and preserving old software" (matches the DISCLAIMER's "software preservation" [S9]; "old software" alone reads as "any old app")

### Applied (table and read-aloud kept identical)
All four rewrites above were applied to script-reel.md; the Time column, word count (294 ≈ 109 s), re-hook times and
accuracy notes were updated. Re-linted: script checks all ✓, table = read-aloud 100%.

### Pass 2 (revised script): PASS
scores: plan 5 · specific 5 · accurate 4 · clear 4 · value 5 · spoken 4 · match 5 · hook 5 · structure 4

blocking: none

improve (optional, not required for PASS):
- beat 13: "Every position, at five pan scales." → "They tried every position, at five pan scales." (a list fragment; ask-and-say rule, learnings 2026-10-12)
- beat 14: "compiled the old way" → "compiled with a 1990s compiler" (more concrete; S6: the pinned VC4.0 toolchain. Don't say "the same compiler")
- beat 14: "the same 63 bytes" → "the same 63 bytes of machine code" (says what the bytes are)
- beat 18: "Licences and local laws can forbid reverse engineering." → "Licences and local laws can restrict reverse engineering." (S9 says "may be restricted"; "forbid" is the plan's approved wording, so optional)
- beat 19: the verdict is use-level; the Launch sheet asks for a person-level call, e.g. "Learning how programs work? Try it on software you're allowed to study." Optional: the catch already carries the who-not.
- runtime: 294 words ≈ 109 s at 2.7 w/s (~113 s at 2.6), a little over the ~105 s target and the plan's 85–100 s. If it must be shorter, beat 12 can fold into beat 13 on screen.

Folder grep (plan's list: wrong / proof / crucial / omitted / clone / free / anything): only in hooks.md's rejected
candidates and brief.md's "don't" lines; none in the script beyond "not a clone button" and the name.

- [x] Script review passed (2026-10-14)
