# Art direction · How MCP works

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), palette from its `sections.json` (dark / blue / light / yellow), `"flat": true`.
- **Accent that leads:** navy for the hook, the twist and the catch (yellow type on navy); blue for "what MCP is"; light / yellow / blue blocks for the three steps; yellow for the recap.

## Reference board (style lock)
_Files in git-ignored `productions/2026-10-12-mcp-reel/yt/refs/`. All were read before writing this._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) → `yt/refs/benchmark-sheet.jpg` | one running object carried through every step; "STEP 0n / 03" counter top-left with a segment bar; a giant chapter numeral card at each step; flat colour block per chapter; mono chips with ink borders on light, translucent on blue/navy; dense frames (the 30-row vocabulary grid, the ID table): fill the zone, never three chips in an empty screen; sentence captions bottom-left with keyword colour |
| 2 | `yt/refs/winner-short-diagram-grows.jpg` (winning Short `taeX8tgpPRQ`, analysis only) | **motion idea only:** one diagram that grows by one element every few seconds instead of cutting away; the server box being *inserted between* the model and the tools. Not its layout, icons, logos, colours or presenter bubble |
| 3 | `studio/projects/jev-reel/stage/` (pilot in the house style) | a card that ROUTES down a lane, STAMPS, and bars that FILL: how the kit's helpers look in motion |

## Concept → visual world
- **Central metaphor:** a **relay desk** drawn as clean tech: three stations stacked down the frame, MODEL at the top, APP
  in the middle, SERVER at the bottom (the real weather service sits just below it as a grey box). The model and the
  server are separated by a visible **gap with no wire**: only the APP has lanes up and down. That gap *is* the
  explanation ("the model never touches the tool"), and it stays on screen through all three steps.
- **Running object:** the **question card** "Will it rain in Tokyo tomorrow?". It enters the APP in beat 2, has the
  **menu** clipped to it in step 1, gets the **note** written under it in step 2, watches the note ROUTE down and the
  result ROUTE back up in step 3, and ends with the answer bubble attached in beat 14. It returns as the mini card in the
  recap.
- **Steps** (Concept mechanism; numbered, structure-check to confirm): **01 The menu** (`tools/list`) · **02 The note**
  (the model writes the tool call) · **03 The call** (`tools/call` → result).

## Locks (must never happen)
- **No wire between MODEL and SERVER, ever.** Every message passes through the APP station (this is the point of the video).
- No logos (Anthropic, OpenAI, Google, Microsoft, any weather brand): product names as plain mono text only, in beat 17 only.
- The JSON on screen is the real message shape (`tools/list`, `tools/call`, `name`, `arguments`) from spec 2026-07-28, labelled "illustrative"; no `initialize` handshake, no sampling.
- No working attack text in the catch: the poisoned description is shown as a redacted/hatched line, never a readable payload.
- No sources on screen; no number without a source (the only numbers: "10,000+" [S10] and the step counters).
- The question card is on screen from beat 2 to beat 14 (≥ 60 % of the video), and nothing draws below y 1460.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** TYPES OUT (the question, the note) · BUILDS (the three stations, one by one) · ROUTES (menu up, note down, result up) · SCANS (the model reading the menu) · STAMPS (NEVER CALLS IT, the catch) · SLICES (the menu into one picked row) · COUNTS UP (10,000+) · SHRINKS AWAY (the station stack to make room for the M×N grid) · WIPE (section change) · PUSH IN (on the empty gap).
- **Section colour per chapter:** hook `dark` → what MCP is `blue` → Step 01 `light` → Step 02 `yellow` → Step 03 `blue` → why a standard `light` → the catch + takeaway `dark` → recap `yellow` → CTA `dark`.
- **Music:** `inventing-flight` (curious, building) from `studio/templates/reel/audio/music/cc0/manifest.json`, ducked under the voice; fallback `fresh-focus`.
- **SFX:** whoosh on wipes, tick on each station build, pop on menu/note arrivals, a soft "send" swoosh on each ROUTE, stamp on verdicts, ding on 10,000+.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (beats 2–14 ≈ 7–79 s of 124 s ≈ 58 %, plus the menu card back in s18–s20 and the mini card in the recap s23 ≈ 70 %, plus the recap)
- [x] Locks written
