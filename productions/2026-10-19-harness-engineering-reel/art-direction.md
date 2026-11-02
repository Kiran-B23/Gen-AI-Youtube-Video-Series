# Art direction · Harness Engineering

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`)
- **Accent that leads:** **green-vs-red on light** for the hook (the DONE stamp in the light section's `ok` #14B87A against the test row in `danger` #E5364A); **yellow** for the verdict / number beats (on navy, the dark section's accent #FFD23F)
- **Dials:** **stylised** (a Concept: the agent, its file and its test are clean diagram objects, not a replica of any real tool's UI) · **image-led** (CC0 bed ducked under speech; one cue per visible action)

## Reference board (style lock)
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object followed through every step; section cards (numbered only for ordered stages); flat colour blocks changed at each section; giant Anton type for hook / verdict; a recap chain before the CTA |
| 2 | `studio/projects/` LangGraph reel (approved 2026-10-13, ours) | a **fixed layout** where the stations stay put and only the running object moves; a loop arc that draws on "loop" / "back"; the hook frame replayed as the earned payoff |
| 3 | `yt/W9BX0jyzd2k/sheet.jpg` (Google Cloud Tech, analysis only) | density lesson only: a full-screen "Is it done?" question card is the one moment that lands; we make that question the centre of our stage (the DONE stamp being checked), drawn our way |
| 4 | `yt/r03FFAUQf_U/sheet.jpg` (Learn with Whiteboard, analysis only) | what *not* to do: a near-empty frame and 0 cuts/min for 3 min; we keep a change every ≤ 2.5 s and fill the zone |

_No frame, line, metaphor drawing, palette or layout is copied from refs 3–4 (other creators); they are listed for density and pacing contrast only. Files stay in git-ignored `yt/`._

## Concept → visual world
- **Central metaphor:** **the harness is a frame that gets built around the model.** At centre sits one navy pill, `MODEL`, that never changes. The harness is literally drawn around it, piece by piece: an outline DRAWS around the pill (s05), a **guide slot** on its left fills with the AGENTS.md doc (the guides section), a **check slot** on its right fills with the test (the checks section), and a **loop arc** connects the check back into the model. Same model, a growing frame: that's the whole idea in one picture.
- **Running object:** the **task card** "Add password-reset button" (white card, ink border, illustrative) with its **test row** `sends reset email` and its **DONE stamp**. The card is written, stamped, checked, sent back, fixed and re-stamped; the test row goes grey "not run" → red ✗ → green ✓.
- **Sections:** Guides (before: the map it reads first) · Checks (after: the test that runs every time it says done, and the loop). Plain section titles with BEFORE / AFTER kickers, no numerals (structure-check 2026-10-29: two halves, not ordered stages)

## Locks (must never happen)
- No logos (OpenAI, Anthropic, LangChain, Claude, GitHub, any editor's); product names in plain text only; no real tool's UI copied (the hook "terminal" is a generic mono box).
- No lock, padlock, "BLOCKED" or "can't finish" visual at s10–s13: the hook sends the agent back to work, it doesn't forbid it (content plan + script review).
- Never "correct", "bug-free", "guaranteed" or "proven" on screen; green means "checks passed" only.
- No "prompt engineering is dead", "models don't matter", "AI writes all code" on screen.
- No horse, reins, climbing or wiring harness imagery; no robot face, mascot or character.
- No sources on screen; the task card, AGENTS.md and the test are labelled "illustrative".
- The `MODEL` pill never changes colour, size or label from s05 to s15 (the point is "same model").
- Numbers hidden until they count: "52.8%" and "66.5%" appear only on their words.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** STAMPS (DONE, NEVER RAN, verdicts) · TYPES OUT (the code, the AGENTS.md line, the error) · SCANS (the agent "re-reads" its own code; the test runs) · BUILDS WORD BY WORD (the equation) · ROUTES (the error chip travels back along the loop arc into MODEL) · FILLS (the guide and check slots) · COUNTS UP (52.8 → 66.5) · SHRINKS AWAY (the old harness copy in s16) · DOCKS (the task card top-left through the proof, s14–s15) · PUSH IN (on the test row) · WIPE (section changes)
- **Section colour per chapter:** hook `light` → the failure `dark` → the concept `blue` → Guides `yellow` → Checks `light` → proof `dark` → habit + catch `blue` → recap `yellow` → CTA `dark`
- **Music:** `fresh-focus` ("bright, steady; good under explanations"), ducked under speech

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (task card / test row on screen s01–s13, s16–s18: ~75 %)
- [x] Locks written
