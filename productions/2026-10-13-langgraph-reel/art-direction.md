# Art direction · LangGraph

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), palette from its `sections.json` (dark / blue / light / yellow), `"flat": true`.
- **Accent that leads:** navy for the hook, the pause verdict's echo in the catch, and the CTA (yellow type on navy); blue for the plain loop and for step 03 (the checkpoints, where the hook's refund card returns); light / yellow for steps 01 / 02; yellow for the recap.

## Reference board (style lock)
_Files in git-ignored `productions/2026-10-13-langgraph-reel/yt/refs/`. All were read before writing this._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) → `yt/refs/benchmark-sheet.jpg` | one running object carried through every step; "STEP 0n / 03" counter top-left with a segment bar; a giant chapter numeral card at each step; one flat colour block per chapter; mono chips with ink borders on light, translucent on blue/navy; dense frames (the 30-row grid, the ID table): fill the zone, never three chips on an empty screen; sentence captions bottom-left with a keyword colour |
| 2 | `yt/refs/winner-long-diagram-grows.jpg` (IBM `qAF1NjEVHhY`, analysis only) | **motion idea only:** the graph is drawn one node at a time while the voice names it, and stays up for the rest of the explanation; the "state" box sits *under* the nodes as a separate object everyone writes to. Not its presenter, light-board look, handwriting or colours |
| 3 | `yt/refs/winner-long-flow-path.jpg` (ByteMonk `e-GR3PlEOVU`, analysis only) | **motion idea only:** the active path through a flow diagram lights up while the rest dims; a loop is drawn as an explicit arc back. Not its neon dark look, icons or layout |
| 4 | `studio/projects/jev-reel/stage/` (pilot in the house style) | a card that ROUTES down a lane, STAMPS, and fields that FILL: how the kit's helpers look in motion |

## Concept → visual world
- **Central metaphor:** a **switchboard graph** drawn as clean tech, in the top of the frame (y 250–880): six node pills in a
  two-row snake, `read → classify → draft` (row 1) and `check → approve → refund` (row 2), plus a side pill `answer`
  hanging off `classify` (the question path). Edges are ink lines with arrowheads; the conditional edge at `classify` is a
  **switch** (a small lever that flips); the loop is an **arc** from `check` back to `draft`. Under the graph, a full-width
  **state card** (y 960–1440) with four mono fields: `email`, `intent`, `reply`, `approved`. Between them, a thin
  **save rail** (y 895–945) where a save tile drops after every node (`thread ID: email-1`). The three layers stay in the
  same positions from s07 to s19, so only the email, the card's fields and the save tiles change.
- **Running object:** the **email chip** "I was charged twice." and the **state card** that travels with it. The chip enters in
  beat 2, rides the loop in beats 3–4, then moves node to node in steps 01–03 while the card fills in; it pauses at
  `approve`, and the hook's refund card returns at `refund` with "approved by: you". It comes back as the mini card in the recap.
- **Steps** (Concept mechanism; numbered, structure-check to confirm): **01 Nodes** (each does one job, reads and writes the
  state) · **02 Edges** (a conditional switch and a loop back) · **03 Checkpoints** (a save after every step, interrupt, resume).

## Locks (must never happen)
- No logos (LangChain parrot, any company, any payment brand): "LangGraph" and "LangChain" as plain text only.
- Code and field names on screen use the v1 API only (`StateGraph`, `add_node`, `add_edge`, `add_conditional_edges`,
  `compile`, `interrupt`, `thread_id`); no `MessageGraph`, no pre-1.0 imports. Everything mock is labelled "illustrative".
- **The refund never fires before Approve is tapped** (the point of step 03). In the catch, the repeated action is the
  "We're on it" email, never the refund itself.
- No crash/restart animation that implies automatic recovery (the content plan cut the crash claim).
- No sources on screen; no numbers except the step counters and the illustrative "$49" on the refund card.
- The email chip + state card are on screen from beat 2 to beat 22 (≥ 60 % of the video), and nothing draws below y 1460.
- No line, frame, icon or colour scheme from a watched video.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** TYPES OUT (the email, field values) · BUILDS (nodes, one by one on their word) · ROUTES (the email chip
  along an edge) · FILLS (a state field) · SCANS (a node reading the card) · FLIPS (the conditional switch) · LOOPS (the chip
  rides the arc back) · STAMPS (NOBODY APPROVED IT., PAUSED., the catch verdict) · DROPS (a save tile onto the rail) ·
  FREEZES (everything greys at interrupt, a wait ring runs) · SHRINKS AWAY · PUSH IN (on the approve node) · WIPE (section change).
- **Section colour per chapter:** hook `dark` → the plain loop `blue` → LangGraph enters `dark` → Step 01 `light` → Step 02
  `yellow` → Step 03 `blue` → the catch + fix `dark` → when you need it `light` → recap `yellow` → CTA `dark`.
- **Music:** `inventing-flight` (curious, building) from `studio/templates/reel/audio/music/cc0/manifest.json`, ducked under
  the voice, dipped to near silence for the 2 s freeze at interrupt; fallback `fresh-focus`.
- **SFX:** whoosh on wipes, tick on each node build, soft "send" swoosh on each ROUTE, a click on the switch, a save "blip" on
  each tile drop, a held low hum during the freeze, a confirm chime on Approve, stamp on verdicts.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (email chip + state card from beat 2 to beat 22 ≈ 4–106 s of 131 s ≈ 78 %, plus the mini card in the recap)
- [x] Locks written
