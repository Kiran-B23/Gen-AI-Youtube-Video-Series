# Art direction · REA ("Reverse Engineer Anything")

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), palette from its `sections.json` (dark / blue / light / yellow), `"flat": true`.
- **Accent that leads:** navy for the hook, the incomplete draft and the catch (yellow type on navy: the serious moments);
  blue for "what it is" and the check (the counter's home); light for the brick-game question and "not a clone";
  yellow for the formula and the verdict. A green tick `#22C55E` only for test matches (the one swapped accent, used
  sparingly); red `#E5484D` only for the empty input slot.

## Reference board (style lock)
_Files in git-ignored `productions/2026-10-14-reverse-engineering-reel/yt/refs/`. All were read before writing this._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) → `yt/refs/benchmark-sheet.jpg` | one running object carried through every section; flat colour blocks changed at each section; giant Anton type for the hook and verdict; mono chips with 4 px ink borders on light, translucent on blue/navy; dense frames (the 30-row grid, the ID table) → our hex wall and instruction table fill the zone; sentence captions bottom-left with one keyword coloured. **Not** its step counters (Launch: no numbered steps) |
| 2 | `yt/refs/category-short-binary-to-c.jpg` ("Ghidra in 100 Seconds", analysis only) | **motion idea only:** one giant arrow from a wall of machine code to readable code, a visual change every ~2 s. Not its memes, logos, photos or characters |
| 3 | `yt/refs/low-claim-check.jpg` (`EPHVoBA7JoM`, analysis only) | **idea only:** a row of check boxes that fill as claims are verified ("7/8" scoreboard) → our 3,205 counter with a tick grid; a three-box "agent → connector → decompiler" chain. Not its dark-blue HUD look, game screenshots or layout. Its near-static screen is the warning: ours moves on every word |
| 4 | `yt/refs/winner-fast-cuts.jpg` (`jtfpCGsbSJU`, analysis only) | **pace only:** ~10 s per shot with something new each 2–3 s. Not its talking head, tweets or app screenshots |
| 5 | `studio/projects/jev-reel/stage/` and the LangGraph stage (pilots in the house style) | how the kit's `typeText`, `slam`, `count`, `pop` and cards look in motion |

## Concept → visual world
- **Central metaphor:** **an evidence bench under a sealed program.** The top of the frame (y 250–760) is the *game view*: a
  generic flat brick-breaker (a 6×3 grid of flat bricks, a paddle, a ball) with a **speaker on each side** and a **pan meter**
  under it (a horizontal bar from −500 to +500 with a needle). The bottom (y 800–1440) is the *bench*: the sealed
  `game.exe` block (a hex wall), and the evidence cards REA pulls out of it. "Looking inside without source code" is drawn
  literally: a scan beam passes over the sealed block and cards slide out of it.
- **Running object:** the **function card** for the sound effect: a mono card `sound( ____ )` with an **input slot**. It enters
  as the decompiler's first draft with the slot **empty** (red dashed outline), the slot **fills** with `position` when the
  instructions show a number going in, the card's body **types out** the formula, the card then **drives the pan meter
  needle** in the game view, and finally sits beside the original as the test counter runs. It returns as a mini card in the
  verdict. On screen from beat 7 to beat 16 (~33–86 s) plus the hook's counter and the bench from beat 4: ≥ 60 % of the video.
- **Sections** (Launch: plain titles, no numbers; the structure-check agent confirms): The question · The first draft · The
  formula · The check · The catch. Hook before the first; verdict + CTA after the last.

## Locks (must never happen)
- No logos (GitHub, REA's site art, Anthropic, NSA, the Ghidra dragon, Hopper, IDA, the game's own art or title screen):
  product names as plain text only; the brick game is a generic flat drawing labelled "illustrative".
- No readable real addresses, registers or instructions (`0x406400`, `EBP`, `FILD`): the instruction view is an
  unreadable mono texture with one row lit and a plain-English tag ("a number goes in"). No install or run commands.
- No commercial app as a target, no DRM / licence / anti-cheat / private-API imagery, no "clone" animation that copies an app.
- The word "proves", "wrong" or "free" never appears on screen; the counter says "match", the draft says "incomplete".
- "one function" is visible whenever 3,205 or 63 is on screen.
- No sources on screen; the code and the game are labelled "illustrative". No line, frame, icon or colour scheme from a watched video.
- Nothing draws below y 1460 (captions); no number shows "0" before its word.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** SCANS (the beam over the sealed `game.exe`) · SLIDES OUT (evidence cards from the block) · TYPES OUT (the
  draft, the formula) · FLASHES (the empty input slot, red) · LIGHTS (one instruction row) · FILLS (the input slot with
  `position`) · ROUTES (a dot from the brick back along the call line to the card) · COUNTS UP (3,205; 63) · SWINGS (the pan
  needle −500 / 0 / +500) · TICKS (the test grid, green) · STAMPS (NOT A CLONE BUTTON., the catch) · SHRINKS AWAY · PUSH IN
  (on the input slot) · BUILDS WORD BY WORD (CTA) · WIPE (section change).
- **Section colour per chapter:** hook `dark` → what it is `blue` → the question `light` → the first draft `dark` → the
  formula `yellow` → the check `blue` → not a clone + evidence `light` → the catch `dark` → verdict `yellow` → CTA `dark`.
- **Music:** `beat-one` (electronic, techy) from `studio/templates/reel/audio/music/cc0/manifest.json`, ducked under the voice,
  dipped for the catch (beats 17–18); fallback `inventing-flight`.
- **SFX:** whoosh on wipes; a soft scan hum on the beam; a card "slide" on each evidence card; a low "error" blip when the empty
  slot flashes; a click when the slot fills; a ball "bonk" panned left/right on the brick hits (the one place sound *is* the
  content: pan it hard left at "left", centre, right); fast ticks during the count-up and a confirm chime at 3,205; a stamp on verdicts.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (the function card 33–86 s, the bench/counter from 0–27 s, the mini card in the verdict ≈ 75 %)
- [x] Locks written
