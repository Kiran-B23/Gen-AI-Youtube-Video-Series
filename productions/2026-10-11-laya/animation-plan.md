# Animation plan · Laya, the free local Jev rival

**Running object:** the ticket "I was charged twice. Refund me, or I cancel." · **Sections:** Install it · Ask it · Laya vs Jev · The catch (plain titles, no numbers: Launch archetype) · **House style:** reference-flat

## Hook direction (pick one, or write your own)
- **A (default, built):** giant "FREE." slams on navy, then a laptop outline draws around "JEV RIVAL · ON YOUR LAPTOP": the price and the place in one frame.
- **B:** a cloud labelled "JEV · paid API" on top; on "laptop" a ticket drops out of the cloud into a laptop below.
- **C:** a price tag "$0" spins onto a laptop keyboard; "FREE JEV RIVAL" types out on its screen.

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | Block to adapt (registry, optional) |
|---|---|---|---|---|---|
| s01 hook | There's a free rival to Jev… laptop | dark | "FREE." SLAMS in; a laptop outline DRAWS around "JEV RIVAL · ON YOUR LAPTOP" | free · laptop | headline-slam |
| s02 | It's called Laya… never writes text | blue | "LAYA" in giant type; chips "decides ✓" POP, "writes text" is STRUCK THROUGH | Laya · decision · never | strikethrough-replace |
| s03 | Give it a message… probability | blue | a message card SLIDES in, 3 question chips LOCK ON, each answer bar FILLS with a % | message · questions · probability | |
| s04 · Install it | one pip command… no GPU | dark | section title "Install it"; a terminal TYPES OUT `pip install laya` → `Version: 0.4.2` → `nvidia-smi: command not found`; "NO GPU" STAMPS | pip · laptop · GPU | terminal-simulator |
| s05 · Ask it | a real ticket: I was charged twice… | light | section title "Ask it"; the ticket card TYPES OUT letter by letter | ticket · charged · cancel | code-typing |
| s06 | Which team? Billing, 98% sure. Nailed it. | light | the ticket SHRINKS to the top; four probability bars RACE: billing 98.4 / other 0.6 / technical 0.5 / sales 0.4; "✓ NAILED IT" STAMPS | team · Billing · 98 · Nailed | animated-bar-chart |
| s07 | Will they leave? 48%… they'd cancel | light | a churn gauge FILLS to 48% next to a 50% "coin flip" line; "A GUESS" STAMPS; the word "cancel" in the ticket is HIGHLIGHTED | leave · 48 · guess · cancel | marker-highlight |
| s08 | two thirds of a second, CPU only | yellow | a stopwatch ring SWEEPS to 0.65 s; "3 answers" chip; "CPU ONLY" STAMPS | three · two · CPU | conic-progress-ring |
| s09 · Laya vs Jev | Jev is a paid cloud API. Laya is free… your machine | blue | section title "Laya vs Jev"; JEV card (cloud, "paid API") vs LAYA card (laptop, "free · open"); the mini ticket ROUTES into the laptop | Jev · paid · Laya · machine | comparison-split |
| s10 | tuned version scores 77%. Jev's published score is 73 | blue | two bars RACE: "Laya, tuned" 77 vs "Jev, published" 73; label "Laya's own benchmark" | benchmark · 77 · published | bar-chart-race |
| s11 · The catch | Untuned, Laya scores just 36%… tune it | dark | section title "The catch"; the 77 bar DROPS to 36 (red), the old height left as a ghost; "TUNE IT FIRST" chip | catch · Untuned · 36 · Tune | |
| s12 verdict | Private data… Try Laya. Zero setup… Pay for Jev | yellow | two verdict rows BUILD: "private data + time → LAYA", "zero setup + accuracy → JEV" | Private · Try · Accuracy · Pay | |
| s13 CTA | What should I explain next? | dark | the question BUILDS WORD BY WORD; follow pill | What · Tell | |

## Build briefs (one per section; each can be built in parallel)
### Hook · s01–s03 (~12 s)
Navy → blue. FREE. at y 330, 260 px Anton; the laptop outline (SVG stroke draw, 0.6 s) on "laptop". s02: LAYA 400 px; two chips under it.
s03: message card at y 820 + three rows "team? / urgent? / churn?" with bars filling to 98 / 56 / 48 %. Everything inside x 72–1008.
### Install it (s04, ~4.5 s)
Section title on navy until ~1 s, then a terminal card (dark glass, mono 46 px) types three real lines from `our-test/`; "NO GPU" stamp on "GPU".
### Ask it (s05–s08, ~19 s)
The ticket (white card, ink border) types out on light; moves to the top on s06; bars race; churn gauge on s07 with the
"cancel" highlight back in the ticket; s08 on yellow: stopwatch 0.65 s (real median 651 ms over 20 runs).
### Laya vs Jev (s09–s10, ~14 s)
Two cards side by side; the mini ticket flies into the laptop card on "machine". s10: two vertical bars, values count with the bars.
### The catch (s11, ~6.6 s) → verdict (s12) → CTA (s13)
The tuned bar falls from 77 to 36 with a red fill and a ghost outline; verdict rows on yellow; CTA word by word.

## Approval
- [x] Structure check passed (2026-10-12)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-11 · user: "go ahead with the pipeline changes and redo Laya"; hook A used as the default

## Structure check · 2026-10-12
```
VERDICT: CHANGES
archetype: Launch (one Comparison beat) · steps justified: no · why: "Install it / Ask it / Compare / The catch" are Launch beats (demo, why it's different, catch), not a process the viewer follows; Compare and The catch can swap without breaking the logic, and the script never says "step".
findings:
- animation-plan.md:3 + Beats s04/s05/s09/s11 + Build briefs "Step 01-04" · plan labels the beats as numbered steps → replace with plain section titles (relabel when the plan is revised)
- laya stage/stage.html:2 + stage/stage.js:3-5 · 4-segment progress bar "/ 04" → remove
- laya stage/stage.html:27-30 (s04, s05, s09, s11; stage/stage.js:27, 38, 72, 92) · chapter cards "STEP n OF 4" + 01-04 → replace with plain section titles "Install it" / "Ask it" / "Laya vs Jev" / "The catch" (no kicker, no numeral; keep the section colour change)
- laya remotion/Stage.tsx:23 · <Progress lights=[s04,s05,s09,s11]> "/ 04" → remove
- laya remotion/Stage.tsx:73, 89, 157, 198 · <Chapter n={1..4} of={4}> "STEP n OF 4" + 01-04 → replace with the same plain titles, no "of 4", no numeral
- storyboard-reel.md:16 (s12) · two-row verdict "recap chain" (Laya / Jev picks) → keep (summarises the comparison the video actually showed; unnumbered)
- art-direction.md:10-11, 16 · cites "numbered steps, chapter cards, progress bar" from the tokenization (Concept) benchmark as the model → replace with "section titles + colour change" for this Launch reel
```

## Structure check · 2026-10-12 (re-check after fixes)
```
VERDICT: PASS
archetype: Launch (one Comparison beat) · steps justified: no · why: sections are Launch beats that could swap without breaking the logic; every on-screen step device is now gone, so nothing unearned remains.
findings:
- laya stage/stage.html:25-29 + stage.css:104-107 · section cards c1-c4 are `chap plain` with empty kicker/numeral (hidden) and titles "Install it" / "Ask it" / "Laya vs Jev" / "The catch" → keep
- laya stage/stage.html + stage/stage.js · 4-segment progress bar "/ 04" → removed (no #prog, no progress() call; built hf/index.html matches) → keep
- laya remotion/Stage.tsx:71, 87, 155, 196 · <Chapter ... n={k} of={4}> with `numbered` left at its default false, so only the title renders (no "STEP n OF 4", no 01-04) → keep (optional tidy: drop the inert n/of props)
- laya remotion/Stage.tsx · <Progress> → removed → keep
- laya stage/stage.html:50 (s06) · "pbars" are the team-probability bars (billing 98.4%…), not a progress UI → keep
- animation-plan.md:3 + Beats s04 · sections listed as plain titles, no "Step 01-04" → keep
- art-direction.md:10, 14 · now states no numbered steps / "STEP n OF m" / step progress bar for this Launch reel → keep
- storyboard-reel.md (s12) · unnumbered Laya / Jev verdict recap summarises the comparison shown → keep
```
