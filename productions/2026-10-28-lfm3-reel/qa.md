# QA · LFM3

_Run 2026-10-29 after `lint_package.py` (all ✓ except package.md, written last) and the four gates (content-plan READY, script-review PASS, visual-plan PASS, structure-check PASS)._

| Check | ✓ | Fix made |
|---|---|---|
| The first spoken line *is* the hook (≤2 s); the first-frame visual is described | [x] | hooks.md + animation-plan.md "frame 0" synced by visual-plan |
| The hook is true and paid off by the end | [x] | "just one gigabyte" → "about one gigabyte of memory" (content plan); the demo replays the message → event; "~1 GB" returns in s05/s09/s10 |
| Archetype stated in brief.md with the viewer's question and the evidence for it (inspiration.md) | [x] | — |
| The script follows that archetype's beat sheet / outline (no generic structure, no merged sheets) | [x] | Launch: hook · what it is · demo · why different · catch · verdict · CTA |
| Every must-have of the archetype is present; none of its don'ts appear | [x] | demo shown (labelled illustrative), claims worded as Liquid's, catch material per content plan, introduced by what it does; no launch trivia |
| One running example is introduced early and carried through | [x] | the "lab moved to thu 3pm" message / add_event form, on screen in every beat |
| Zero trivia lines (each line passes the viewer-value test) | [x] | release date, family, architecture, licence cut (content plan) |
| Every fact has a source tag `[Sx]` that resolves in research.md, with date + label | [x] | S15 (Ollama FAQ) added by the content-plan agent |
| Company claims are worded as claims; unverified items flagged or removed | [x] | "By Liquid's own scores", "Liquid says"; no our test (stated in brief and description) |
| Every wording the content plan marks unsafe is gone from the whole folder (brief angle, inspiration, hooks, publish, package), not just the script: grep for it | [x] | "Wi-Fi off" removed from brief/research; "just one gigabyte" removed from brief/hooks; H5 label renamed from "free alternative"; remaining hits are bans/analysis only (visual-plan grep) |
| The catch decision in content-plan.md is followed (included only when material and sourced; no filler catch) | [x] | beats 7–8, [S6] [S7] [S8] |
| YouTube analysis done: winners and low performers watched (or the reason they couldn't be); winners-vs-low findings written | [x] | the context filter dropped the LFM3 titles; watched with `--urls` (noted in inspiration.md) |
| Differentiated angle stated (inspiration.md) and no copied lines | [x] | the low performer's "turn off the Wi-Fi" opening avoided |
| Runtime within budget (words ÷ 2.7): reel 30–60 s (up to 3 min only if the content needs it, with re-hooks every 30–40 s) · explainer 8–15 min · session 30–60 min | [x] | 150 words ≈ 56 s ÷2.7; ~65 s at the house pace 2.3 (reason in brief: six must-includes + Goldfish fixes; section wipes every 7–15 s) |
| Reels: every beat has a visual tag; no beat over 6 s; no 4 s without a visual change; numbers shown on screen when spoken | [x] | still-holds ≤ 1.4 s per visual-plan |
| Runtime and pace sit in the winners' range (or the reason it doesn't is written down) | [x] | no LFM3 creator Short exists; house pace 2.3 w/s by rule (inspiration.md) |
| Long-form: open loops at ~25% and ~60%, pattern break every 60–90 s, chapters marked | [x] | n/a (reel) |
| art-direction.md filled; palette from the concept, not copied from a reference | [x] | house palette; Liquid's purple not used |
| Every storyboard element has a motion verb; continuous spans marked; a running object persists | [x] | storyboard re-synced from the passed plan |
| Section colours change at section breaks; transitions chosen (1 primary + 1–2 accents) | [x] | light → blue → light → yellow → dark → blue → yellow → dark; WIPE primary, PUSH IN accent |
| Reads naturally aloud; delivery cues present; no words from the avoid list | [x] | — |
| Clean read-aloud text present (no cues, tags or symbols); captions read standalone; names have pronunciation notes | [x] | LFM3, Ollama, Qwen noted; beat 5 starts "LFM3 has…" not "It" |
| CTA present; reels end on a comment question / save prompt and ideally loop to the first frame | [x] | the CTA's mini bubble → calendar card echoes frame 0 |
| Publish kit complete (3 titles, thumbnail concept, caption, **sources list**, hashtags, pinned comment, chapters) | [x] | chapters n/a for a reel |
| No sources on screen (they're in the publish kit); mock UIs say "illustrative" | [x] | — |
