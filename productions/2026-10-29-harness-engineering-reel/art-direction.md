# Art direction · Harness Engineering (v2)

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), **one background for the whole reel** (2026-10-30 house rule): `light` #EEF1F6. Why light: the running object is a white task card with green/red test states, which read best on light; v1's per-section colour wipes are gone.
- **Accent that leads:** **green-vs-red** for the hook and the loop (light palette `ok` #14B87A vs `danger` #E5364A); **blue** #2B3BE0 for the pinned question, the harness outline and the study's cost bar; **yellow** #FFD23F only as a marker / stamp fill on the verdict and the catch
- **Dials:** **stylised** (a Concept: card, model pill, harness ring and test row are clean diagram objects, not a replica of any real tool) · **image-led** (CC0 bed ducked under speech; one cue per visible action). Why: no tool is demonstrated, and the owner's note asked for effects, which are visual.

## Reference board (style lock)
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object followed through every step; giant Anton type for hook / verdict; a recap card before the end |
| 2 | `references/web-shorts-2026-10-30.md` (measured top explainer Shorts) | the viewer's question large in frame 0 over the object already acting, then pinned; one background; one diagram that grows; ≥ 45 % band fill at 1.5 s |
| 3 | `yt/4Q_YSgS2zMQ/sheet.jpg` (Under the Hood AI, 127× outlier; analysis only) | **motion only:** the running objects shrink into a pinned mini strip and stay all video; numbers land on their word then become a bar; racing horizontal bars with a dashed baseline and a delta callout; red strike-through over a claim |
| 4 | `yt/i0AOokzwb1k/sheet.jpg` (DataInterview; analysis only) | **motion only:** one message routed through a fixed diagram, the chosen path lights up; a "valid ✓ / wrong ✗" stacked verdict under one result |
| 5 | `yt/XS1PBKUQo3k/sheet.jpg` (LangChain PII short; analysis only) | **motion only:** a timed race on one input with a live readout, the question pinned on top |
| 6 | `references/ig-reels.md` (@krishnachaytanyaa, @rick.theengineer) | "fast once, then slow with every step named": a 2× pass, then the 1× replay; a camera that pushes to the action and returns; a click on every action |

_Nothing is copied from refs 3–6 (other creators): no frame, palette, layout, line or drawing. They are listed for motion devices only. Files stay in git-ignored `yt/` and `references/ig-reels/`._

## Concept → visual world
- **Central metaphor:** **the harness is a ring that gets built around one model pill.** At centre sits one navy pill `MODEL` that never changes. The harness is drawn around it: an outline DRAWS (the definition), a **rule slot** on its left fills with an `AGENTS.md` line, a **hook slot** on its right fills with a command box, and a **loop path** lights from the test back into the pill. In the study section the same ring is relabelled **YOUR AGENT TOOL** and clones into three unlabelled rings (same pill inside each): the harness you pick. Back home, the ring gains your checks: the part you build.
- **Running object:** the **task card** "Add password-reset button" (white card, ink border, "illustrative") with its **test row** `sends reset email` (grey `not run` → red `FAIL ✗` → green `PASS ✓`) and its **DONE stamp** (claimed → struck → earned). In the study section it shrinks to a **pinned mini card** under the question and stays, unchanged, while the tools race: the harness you pick doesn't touch the card.
- **Effects (the owner's note, devices from inspiration.md):** (1) **fast-then-slow replay**: s02 plays at 2× under a `▶▶ 2×` chip with motion blur on moves, s03 on runs at 1× under `▶ 1×`; (2) **pinned question + pinned mini card**; (3) **lit path**: the error travels back along a lighting path into the pill; (4) **stacked verdict** `✓ PASSED` over `≠ CORRECT`; (5) **racing bars**: three success bars land level and HOLD STILL while only the token-cost bar stretches to 5× (owner, point 6); (6) **a camera that pushes to the action and returns**, ~8 moves/min.
- **Sections (plain titles under the pinned question, no numerals; structure-check decides):** Hook (s01–s02) · **The replay** (s03–s06) · **Pick a harness?** (s07–s10) · **Your checks** (s11–s14) · Recap (s15)

## Locks (must never happen)
- No logos (OpenAI, Anthropic, LangChain, Claude, Cursor, GitHub, any editor's); no real tool's UI copied (the hook is a generic mono box).
- **No harness names anywhere on screen**, and no per-harness cost row or ranking: the three study rings and their bars are unlabelled (content plan lock; owner, 2026-10-30).
- No lock, padlock, "BLOCKED" or "can't finish" visual on the hook: it sends the agent back to work, it doesn't forbid it.
- Never "correct", "bug-free", "guaranteed" or "proven" as a claim on screen; green means "checks passed" only (the catch shows `≠ CORRECT`).
- No "prompt engineering is dead", "models don't matter", "the harness doesn't matter", "harness is dead" on screen.
- No horse, reins, climbing or wiring harness imagery; no robot face, mascot or character; no photoreal people.
- No sources on screen; the task card, AGENTS.md, the hook box and the test are labelled "illustrative".
- The `MODEL` pill never changes colour, size or label (emphasis is a ring pulsing around it).
- Numbers hidden until they count: "±2–5 pts" and "5×" appear only on their words.
- One background (#EEF1F6) for the whole reel: no colour wipes, no vignette, no glow.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** STAMPS (DONE, NEVER RAN, verdicts) · TYPES OUT (the code, the rule, the hook command, the error) · SCANS (re-reads; the test runs) · ROUTES (the error along the lit path into the pill) · FILLS (rule slot, hook slot, the test row red → green) · RACES (bars) · COUNTS UP (±2–5, 5×) · SHRINKS AWAY (the giant question into the header; the card into the mini card) · CLONES (the ring into three) · PUSH IN (on the test row, the cost bar) · SLIDES IN (section titles)
- **Section colour per chapter:** one background `light` for every section (2026-10-30 rule); sections change by a title SLIDING IN under the pinned question, not by colour
- **Music:** `cc0/fresh-focus` ("bright, steady; good under explanations"), ducked under speech

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (task card / test row / mini card on screen s01–s15)
- [x] Locks written
