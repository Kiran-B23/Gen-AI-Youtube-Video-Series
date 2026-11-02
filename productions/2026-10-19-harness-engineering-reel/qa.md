# QA · Harness Engineering

_Run 2026-10-29. Deterministic eval first: `lint_package.py` 42/44 before this file and package.md existed (both missing-file checks), every content, script, storyboard, animation-plan, gate and Goldfish check green. Then the judgement checks below; every failure was fixed in the files before ticking._

| Check | ✓ | Fix made |
|---|---|---|
| The first spoken line *is* the hook (≤ 2 s); the first-frame visual is described | - [x] | "Your coding agent says, 'Done.'" is the first line; frame 0 is described in hooks.md, animation-plan.md and storyboard row 1 (they match) |
| The hook is true and paid off by the end | - [x] | an illustrative case of the documented failure [S4, S5]; paid off at s13 (DONE ✓ earned, the s01 frame replayed) and s14–s15 (the same-model answer to "might not be a smarter model") |
| Archetype stated in brief.md with the viewer's question and the evidence | - [x] | Concept, confirmed by 3/3 winning Shorts and 2/3 long winners (inspiration.md) |
| The script follows that archetype's beat sheet (no generic structure, no merged sheets) | - [x] | Concept standard sheet: hook → example → concept → mechanism (two halves) → why it matters → takeaway → catch → recap → CTA |
| Every must-have of the archetype is present; none of its don'ts | - [x] | the mechanism is shown (s03–s13 ANIMATE); no analogy; every number sourced; the takeaway is an action (the habit). Don'ts: no history lesson, ≤ 3 mechanism steps, every term defined (Goldfish run 4) |
| One running example, introduced early and carried through | - [x] | the "Add password-reset button" card + test row, s01–s13, docked through s14–s15, back in s16–s17, on the recap chain |
| Zero trivia lines | - [x] | who coined it, dates, model/version names, OpenAI team stats all cut (content plan "Leave out") |
| Every fact has a source tag `[Sx]` that resolves in research.md, with date + label | - [x] | S1–S7 all dated and labelled; linter "sources resolve" ✓ |
| Company claims worded as claims; unverified items flagged or removed | - [x] | "LangChain… They say… That's their own agent, measured by them" (s14–s15); OpenAI's stats left out; flagged in brief.md (no our test; OpenAI read via mirror) |
| Every wording the content plan marks unsafe is gone from the whole folder | - [x] | grepped brief, inspiration, hooks, script, storyboard, art direction, animation plan, publish: every hit is a "never/no/unsafe" note or an attributed source quote. Earlier fixes: "catches its own mistake" (brief, inspiration), "Nothing retrained" (hooks #2). Rejected hooks.md #4 "Stop blaming the model" stays out of the publish kit |
| The catch decision is followed (material, sourced; no filler catch) | - [x] | include: "Green only means your checks passed… write or review the test yourself" [S3] at s17, exactly once |
| YouTube analysis done: winners and low performers watched (or why not); findings written | - [x] | 6 watched; no low-performer Short qualified (only 3 on-topic Shorts exist), contrast within the Shorts, stated in inspiration.md |
| Differentiated angle stated and no copied lines | - [x] | inspiration.md "Our angle"; the script shares no lines with the transcripts. The "same model, different harness" idea appears in #3's transcript as an unproven claim; ours is LangChain's sourced number in our own words |
| Runtime within budget (reel up to 3 min if the content needs it, re-hooks every 30–40 s) | - [x] | ~111 s (240 words at 2.3 w/s + pauses); owner accepted the runtime 2026-10-29 (content-plan.md); re-hooks at ~17, 43, 68, 95 s |
| Reels: every beat has a visual tag; no beat over 6 s (10 s with an internal change); no 4 s without a visual change; numbers on screen when spoken | - [x] | 19/19 tags; beats over 6 s name per-clause changes; **fixed:** beat 15 (~11 s) is built as two scenes split at "Now?" (storyboard row 15); planned still 6.6 %, longest hold 1.3 s; 52.8 % / 66.5 % count up on their words |
| Runtime and pace sit in the winners' range | - [x] | winning Shorts 79–176 s; house pace 2.3 w/s (below the winners' 2.4–3.4, by house rule) |
| Long-form: open loops, pattern breaks, chapters | - [x] | n/a (reel) |
| art-direction.md filled; palette from the house style, not copied | - [x] | reference-flat + `sections.json`; refs 3–4 for density only, nothing copied |
| Every storyboard element has a motion verb; continuous spans marked; running object persists | - [x] | visual-plan storyboard mode PASS 2026-10-29; spans A–G listed |
| Section colours change at section breaks; transitions chosen | - [x] | light → dark → blue → yellow → light → dark → blue → yellow → dark; WIPE primary, PUSH IN / DOCK accents |
| Reads naturally aloud; delivery cues present; no words from the avoid list | - [x] | cues on every key beat; avoid-list grep clean; script review "spoken 5" |
| Clean read-aloud text; captions standalone; names have pronunciation notes | - [x] | linter "read-aloud is clean" ✓; table = read-aloud 100 %; AGENTS.md and LangChain in the notes |
| CTA present; ends on a comment question and loops to the first frame | - [x] | "What should I explain next?" (channel-generic); the last frame holds the mini DONE ✓ card that loops into frame 0 |
| Publish kit complete (3 titles, thumbnail, caption, sources list, hashtags, pinned comment) | - [x] | publish.md; the description also answers the Goldfish's "where do I set up a hook?" with a docs link |
| No sources on screen; mock UIs say "illustrative" | - [x] | storyboard source pill "none" on every row; task card, AGENTS.md, hook box and error chip tagged "illustrative" |
| Archetype must-haves (Concept): the mechanism shown in ≥ 1 `[ANIMATE]` beat; ≤ 1 accurate analogy; takeaway is an action | - [x] | s03, s06, s07, s09, s11, s12, s16 ANIMATE; no analogy; "every mistake becomes a rule it reads, or a check it must pass" |
| Structure: numbered steps only where earned | - [x] | **fixed** by structure check 2026-10-29: "01 GUIDES / 02 CHECKS" and the "01 / 02" counter became plain GUIDES / CHECKS titles (two halves, not ordered stages) in the plan, art direction, script on-screen column and storyboard |

**Still unverified (say it to the owner):** no "our test" (we didn't run a benchmark or a harness); the LangChain numbers are their own run; OpenAI's post was read through a text mirror (it blocks direct fetches) and is used only as a source for "a map, not a manual"; S1/S3/S4 quotes come from this package's research pass on 2026-10-19.
