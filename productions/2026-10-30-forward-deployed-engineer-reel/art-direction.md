# Art direction · Forward Deployed Engineer

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`) · default, one line why: the owner's house style for every reel.
- **Accent that leads:** **green-vs-red on navy** for the hook (DEMO ✓ in the dark section's `ok` #2ED3A0 against INSIDE THE COMPANY ✗ in `danger` #FF4D5E); **yellow** for the number and verdict beats (#FFD23F on navy / navy on yellow).
- **Dials:** **stylised** (a Concept: the claims assistant, the PDFs and the old system are clean diagram objects, not a replica of any real product) · **image-led** (CC0 bed ducked under speech; one cue per visible action)

## Reference board (style lock)
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object followed through every step; numbered mechanism steps with a small tracker; flat colour blocks changed at every section; giant Anton type for the hook and the numbers; a recap chain before the CTA |
| 2 | `studio/projects/harness-reel/` (ours, 2026-10-30) | a **fixed workbench** where the stations stay put and only the running object and its connections change; the hook frame replayed as the earned payoff (frame 0's ✗ label becomes ✓) |
| 3 | `yt/Dr174JDdNXo/sheet.jpg` (Shade of Code, analysis only) | pace lesson only: a visual change every ~2 s keeps a career topic moving; we get it from the card changing state and the camera, never from memes, stock clips or logos |
| 4 | `yt/SdneobvQOi4/sheet.jpg` (Salesforce Careers, analysis only) | what *not* to do: one static shot for 100 s while the voice lists jargon; every beat of ours changes the object on its word |

_No frame, line, drawing, palette or layout is copied from refs 3–4 (other creators); they are listed for pacing contrast only. Files stay in git-ignored `yt/`._

## Concept → visual world
- **Central metaphor:** **the demo card and the company's locked boxes.** The AI works on its own card; inside a company it has to reach data in boxes it can't open. The forward deployed engineer is the one who walks into the company outline and draws the wires. Same model all the way through: what changes is the connections.
- **Running object:** the **claims-assistant card** (white card, ink border, "illustrative" tag): header "Claims assistant", the question bubble "Is my claim covered?", an answer bubble, and a status strip at its foot (DEMO ✓ → INSIDE THE COMPANY ✗ → INSIDE THE COMPANY ✓). It is cracked, connected, tested, answered, and finally docked as a small "Claims assistant ✓" chip that stays on screen through the numbers.
- **Steps** (a real Concept mechanism, 3 steps; numbering subject to the structure check): 01 Find · 02 Build · 03 Ship (and report back)

## Locks (must never happen)
- No company logos (Palantir, Anthropic, OpenAI, Google, any insurer's); company names only as plain text chips on s12–s13.
- No dollar, rupee or pound amounts anywhere (no pay; the claims answer names no amount).
- No "fastest", "hottest", "#1 job", "every company" text on screen.
- Never "AI replaces engineers", "coding is dead" or "the model is broken" on screen; the `MODEL` pill stays green-ringed "fine" from s04 on.
- No military imagery, soldiers, maps with arrows "to the front", no memes, no stock clips, no photoreal or cartoon people: people are plain labelled chips ("FDE", "CLAIMS TEAM", "PRODUCT TEAM").
- No real product UI copied; the claims card, PDFs, the old system and the feedback note are labelled "illustrative".
- No sources on screen.
- Numbers hidden until they count: "1,000 %+", "13 %", "25–50 %", "6 MONTHS", "4 YEARS" appear only on their words.
- Nothing right of x 950 or below y 1460 (captions excepted).

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** STAMPS (DEMO ✓, the ✗/✓ status, BLOCKER) · TYPES OUT (the card header, answers, the feedback note) · SCANS (the scanned PDFs; the find step's search ring) · ROUTES (the FDE badge into the company; the feedback note to the product team) · DRAWS (the company outline; the connector wires) · FILLS (the job-post grid; the week strip for travel; the test ticks) · COUNTS UP (1,000 %+, 13 %, 25–50 %, 6 months, 4 years) · RACES (the two demand bars) · SHRINKS AWAY (the workbench into the docked chip) · BUILDS WORD BY WORD (the recap chain) · PUSH IN (the locks, the answer) · WIPE (section changes)
- **Section colour per chapter:** hook `dark` → the example `light` → the concept `blue` → 01 Find `yellow` → 02 Build `light` → 03 Ship `dark` → why care `yellow` → is it for you `light` → want in `blue` → recap `yellow` → CTA `dark`
- **Music:** `inventing-flight` ("curious, building") · default pick, one line why: the reel builds a solution step by step, and the harness reel already used `fresh-focus`.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (full card s01–s09 ≈ 52 s, docked chip s10–s13 ≈ 22 s, card in the recap s16 ≈ 4 s: ~84 % of ~93 s)
- [x] Locks written
