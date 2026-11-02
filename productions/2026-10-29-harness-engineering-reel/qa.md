# QA · Harness Engineering (v2)

`lint_package.py` run first; every ✗ fixed (see below). Judgement checks from `references/qa-checklist.md`:

| Check | ✓ | Fix made |
|---|---|---|
| The first spoken line *is* the hook (≤ 2 s); the first-frame visual is described | [x] | "Your coding agent says, 'Done.'" lands by ~1.5 s; frame 0 described in hooks.md and animation-plan.md (visual-plan aligned them) |
| The hook is true and paid off by the end | [x] | owner: "says it isn't" → "would say no" (the test never ran); paid off by s06 (DONE earned) and the recap answers the pinned question |
| Archetype stated in brief.md with the viewer's question and the evidence | [x] | Concept, 3 of 4 topic Shorts (inspiration.md) |
| The script follows that archetype's beat sheet | [x] | Hook → example → concept → mechanism (rule, hook, loop) → why it matters (S8) → takeaway → catch → recap |
| Every must-have present; no don'ts | [x] | mechanism shown (s03–s06 `[ANIMATE]`), no analogy, every number sourced, takeaway is an action; no history lesson, 1 mechanism loop |
| One running example introduced early and carried through | [x] | the password-reset task card s01–s15 (mini card through the study) |
| Zero trivia lines | [x] | study authors, dates, model names and harness names are in the description only |
| Every fact has a source tag that resolves, with date + label | [x] | S1–S9 in research.md; lint "sources resolve" ✓ |
| Company claims worded as claims; unverified flagged | [x] | S8 is independent and scoped ("on two benchmarks", "a few points", "up to fivefold"); LangChain's number dropped |
| Unsafe wordings gone from the whole folder | [x] | grepped "doesn't matter", "costs 5", "prove", "don't shop", "says it isn't", "never ran the test", "good enough yet", "harness is dead", "bug-free": only in locks, the rejected hook #6 and a watched video's title |
| The catch decision is followed | [x] | include, material (S3); owner's wording "AI-written tests can pass bad code" |
| YouTube analysis done, winners vs low performers written | [x] | topic run + the owner's effects references (inspiration.md); the effects plan feeds art-direction.md |
| Differentiated angle, no copied lines | [x] | inspiration.md "Our angle"; devices only, no lines or frames |
| Runtime within budget | [x] | 158 words ≈ 59 s at 2.7 (lint) · ~75 s at the house 2.3 + pauses; 45–75 s band (content plan); the voice's pace table decides |
| Every beat tagged; no beat over 6 s; numbers on screen when spoken | [x] | lint ✓; "±2–5 pts" and "up to 5×" count up on their words |
| Runtime and pace in the winners' range (or why not) | [x] | shorter than topic Shorts (79–176 s), near top explainer Shorts (median 57 s) |
| Long-form open loops / chapters | [x] | n/a (reel) |
| art-direction.md filled; palette from the house style, not copied | [x] | reference-flat light; reference board lists devices only |
| Every storyboard element has a motion verb; spans; running object persists | [x] | lint ✓; spans A–E in storyboard-reel.md |
| Section colours change at section breaks | [x] | superseded by the 2026-10-30 one-background rule: sections change by a title sliding in under the pinned question |
| Reads naturally aloud; cues present; no avoid-list words | [x] | lint ✓; 14 Goldfish runs |
| Clean read-aloud; captions standalone; names noted | [x] | lint ✓; no names need respelling (AGENTS.md on screen only) |
| CTA present; ends on a comment question | [x] | "What should I explain next?" on the recap card (script review: the plan's allowed cut); pinned comment asks for a reply |
| Publish kit complete | [x] | 3 titles, thumbnail, caption, sources, hashtags, pinned comment, repurposing; humanizer pass on the prose |
| No sources on screen; mock UIs say "illustrative" | [x] | card, AGENTS.md, hook box and test tagged "illustrative" |
