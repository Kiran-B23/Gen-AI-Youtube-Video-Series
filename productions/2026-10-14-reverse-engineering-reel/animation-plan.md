# Animation plan · REA ("Reverse Engineer Anything")

_For each beat: what the picture DOES to the running object, or "none". Each section is built as its own 4–10 s piece from
the standalone brief below._

**Running object:** the function card `sound( ____ )` (the decompiler's draft of the sound function, with an input slot) that
fills, drives the pan needle and is tested · **Sections (Launch, plain titles, no numbers):** The question · The first draft ·
The formula · The check · The catch · **House style:** reference-flat

**Fixed layout (s06–s16):** **Game view** y 250–760: a flat brick grid (6 columns × 3 rows, ~140×50 px bricks, 12 px gaps)
centred at x 140–940, a paddle at y 700, a ball; a **speaker** icon at each side (x 60 and x 1020, y 480); under the grid a
**pan meter** (y 730–760): a bar from "−500 · L" to "+500 · R" with a centre tick and a needle. **Bench** y 800–1440: the
sealed `game.exe` block on the left (x 72–420, a hex texture) and the **function card** on the right (x 460–1008, mono 46 px,
white on light / translucent on navy-blue, 4 px ink border). Small "illustrative" tags on the game view and the card.

## Hook direction (pick one, or write your own)
- **A (default, used):** split frame on navy: left a sealed `game.exe` block of scrolling hex with a struck-through
  "source code ✗" tag; right a giant mono counter already full, "3,205 / 3,205 ✓" in green. On "rebuilt" a function card
  SLIDES OUT of the hex block; on "matched" the counter PULSES and "one function" STAMPS under it.
- **B:** a flat brick game plays at frame 0; the ball hits a left brick and the sound icon flashes on the left; giant
  "NO SOURCE CODE." SLAMS over it; on "3,205" a counter COUNTS UP in a corner. (The feature first, then the claim.)
- **C:** a wall of hex fills the whole screen; a scan beam SWEEPS down it and leaves one readable line behind:
  `pan = position × 1.5625 − 500`; "FROM A 1996 GAME FILE." TYPES OUT. (The result first, as a formula.)

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | Block to adapt (registry, optional) |
|---|---|---|---|---|---|
| s01 hook | No source code. Just a game file from 1996. | dark | frame 0: the hex block (x 72–520, y 400–1200) SCROLLS slowly, tag `game.exe`; "source code" tag STAMPS then a strike LINES through it; the right half holds a giant "3,205 / 3,205 ✓" (mono 200 px, green) already full | source · game · 1996 | headline-slam |
| s02 hook | An AI agent rebuilt one of its functions… all 3,205 tests | dark | an agent chip (mono "agent") POPS above the block; a function card SLIDES OUT of the hex to the centre; on "matched" the counter PULSES, "one function" STAMPS under it, a tick grid (5 × 8 mini squares) TICKS green left to right | agent · functions · matched · 3,205 | count-up |
| s03 what it is | That's from the showcase of REA… Reverse Engineer Anything | blue | WIPE to blue; the counter SHRINKS AWAY to the top-right corner; "REA" SLAMS (Anton 230 px); "Reverse Engineer Anything" TYPES OUT under it; "open source" chip POPS; "from their showcase" mono tag | REA · Reverse · open | kinetic-center-build |
| s04 what it is | It lets your coding agent look inside a program without its source code | blue | "REA" SHRINKS to a chip; the sealed `game.exe` block returns centre; a SCAN beam passes over it top to bottom; the block turns translucent so faint structure shows inside; "source code ✗" stays struck | agent · inside · program · without | |
| s05 how it works | Your agent asks a question… decompilers… readable code… evidence (8 s, internal change) | blue | a four-box chain BUILDS left to right on its words: `agent` → `REA` → `decompilers` → `evidence`; on "compiled code back into readable code" a mini hex strip FLIPS into a mini code strip inside the `decompilers` box (giant arrow, ref 2); on "evidence" three evidence cards SLIDE OUT (`code` · `caller` · `data`) and ROUTE back to `agent` | question · decompilers · readable · evidence | flowchart |
| s06 the question | Here's their question… left… left. How? | light | WIPE to light; section title "The question" (~0.8 s); the game view BUILDS (bricks drop in row by row); the ball HITS a left brick on the first "left": the brick SHATTERS, the left speaker PULSES, the pan needle SWINGS left; on "How?" a giant "?" POPS between the speakers; label "DX-Ball (1996) · illustrative" | question · left · left · How | |
| s07 the first draft | The decompiler's first draft… incomplete… no input at all | dark | WIPE to navy; section title "The first draft"; the game view dims and stays at the top; the function card TYPES OUT on the bench: `sound( ____ )` + three blurred body lines; "first draft" tag; on "incomplete" a yellow "INCOMPLETE" tag STAMPS; on "no input" PUSH IN on the empty slot, it FLASHES red | draft · incomplete · input | code-typing |
| s08 the input found | But the raw instructions take a number in… mismatch… kept digging | dark | the hex block on the left SLIDES OUT an instruction table (12 unreadable mono rows); one row LIGHTS yellow with a plain tag "a number goes in"; a "≠" STAMPS between that row and the empty slot; on "kept digging" the scan beam SWEEPS the table again | instructions · number · mismatch · digging | marker-highlight |
| s09 the caller | It followed the call back to the brick… position on screen (6 s, internal change) | dark | a call line DRAWS from the card up to the game view; a dot ROUTES along it to the hit brick; the brick's x-position ruler (0 … 640) BUILDS under the grid; the ruler's value FLIES down the line into the empty slot: the slot FILLS `position` (click) and turns from red to ink | call · brick · position · screen | hw-arrow |
| s10 the formula | Then it read the constants… Position, times 1.5625, minus 500 | yellow | WIPE to yellow; section title "The formula"; two constant chips `1.5625` and `500` SLIDE OUT of the hex block; the card's body TYPES OUT the formula word by word: `position` · `× 1.5625` · `− 500` (each operator on its word) | constants · times · minus | |
| s11 the formula | Times the pan scale, which starts at one… −500 · 0 · +500 (7 s, internal change) | yellow | `× pan scale (1.0)` TYPES OUT; `→ whole number` appears; the game view re-lights: the ball hits a left-edge brick → needle SWINGS to −500 (left speaker pulses), centre → 0, right edge → +500 (right speaker pulses), each on its word | scale · Left · Centre · Right | |
| s12 the check | Then the rebuilt function was tested against the original | blue | WIPE to blue; section title "The check"; two columns BUILD: "original" (the hex block) and "rebuilt" (the function card, now complete); a compare bar between them | tested · original | comparison-split |
| s13 the check | Every position, at five pan scales. All 3,205 cases match. | blue | the hook's counter returns centre and COUNTS UP 0 → 3,205 (hidden until "All"); the tick grid FILLS row by row (5 rows = 5 scales, each sweeping 0 → 640); "match ✓" and "one function" STAMP | position · five · 3,205 · match | count-up |
| s14 the check | And compiled the old way… the same 63 bytes | blue | the counter SHRINKS AWAY up; two byte strips (63 cells each, one labelled "original", one "rebuilt") BUILD; cells LIGHT pairwise left to right; "63 / 63" COUNTS UP on "63"; "one function" stays | compiled · same · 63 · original | |
| s15 not a clone | So it's not a clone button… how a feature works, not the original code | light | WIPE to light; a big "CLONE" button outline appears; "NOT A CLONE BUTTON." STAMPS across it (Anton 170 px); on "how a feature works" the mini function card POPS ✓; on "original code" a "source code" chip stays struck through | clone · works · original | headline-slam |
| s16 evidence | It hands back the evidence with each answer, so you can check it | light | three evidence cards (`code` · `caller` · `data`) FAN OUT under the function card; a magnifier SCANS them and a tick lands on each on "check" | evidence · answer · check | |
| s17 the catch | Now, the catch. Only use it on software you own, or are allowed to examine. | dark | WIPE to navy; section title "The catch"; "ONLY ON SOFTWARE YOU MAY EXAMINE." BUILDS WORD BY WORD (Anton 150 px, yellow); two chips POP on their words: "you own" · "you're allowed to examine" | catch · own · allowed | |
| s18 the catch | Licences and local laws can forbid… no rights to the original | dark | under the title three plain chips STAMP in a row on their words: "licence" · "local law" · "no rights to the original"; no icons of locks or weapons, no technique names | Licences · laws · rights | |
| s19 verdict | It's built for learning, security work and preserving old software… check the evidence (7 s, internal change) | yellow | WIPE to yellow; three tiles BUILD on their words: "learning" · "security work" · "preserving old software"; on "Ask one focused question" they SHRINK AWAY and the mini function card + one question chip POP; on "check the evidence" the three evidence cards fan under it with ticks | learning · security · preserving · question · evidence | |
| s20 CTA | What should I explain next? Tell me below. | dark | WIPE to navy; "What should I explain next?" BUILDS WORD BY WORD; follow pill | explain · below | |

## Build briefs (one per section; each can be built in parallel)
### Hook · s01–s02 (~9 s)
Navy. Frame 0 must already read on mute: left, the sealed `game.exe` block (x 72–520, y 400–1200) of slowly scrolling dim
hex (mono 30 px, 50 % opacity), tag `game.exe` above; a "source code" chip STAMPS at "source" and a strike line draws through
it at "code". Right half, a giant mono "3,205 / 3,205" (200 px, green `#22C55E`) with a ✓, already full (the one place a
number shows before its word, as the hook's claim; it is not a count). s02: on "agent" an `agent` chip POPS above the block;
on "functions" a function card (`sound( … )`, illustrative) SLIDES OUT of the hex to centre-bottom; on "matched" the counter
PULSES and "one function" STAMPS under it; a 5 × 8 tick grid TICKS green. Nothing below y 1460.

### What it is · s03–s05 (~18 s)
Blue. Counter SHRINKS AWAY to the top-right. "REA" SLAMS (Anton 230 px, white); "Reverse Engineer Anything" TYPES OUT (mono 50
px); "open source" chip POPS; "from their showcase" small tag. s04: "REA" shrinks to a chip at the top; the `game.exe` block
returns centre (y 500–1100); a scan beam passes on "inside"; the block goes translucent. s05 (8 s, internal change): a chain
of four translucent boxes BUILDS across y 700 (`agent` → `REA` → `decompilers` → `evidence`), each on its word; inside
`decompilers` a hex strip FLIPS into a code strip on "readable code"; on "evidence" three cards (`code`, `caller`, `data`)
SLIDE OUT and ROUTE back to `agent`. Keep every box ≥ 40 px apart (no touching boxes).

### The question · s06 (~6 s)
Light. Section title "The question" (Inter 900, 0.8 s). The game view BUILDS: bricks drop in row by row (ink borders,
blue/yellow fill), paddle, ball; speakers at both sides; pan meter under the grid. On the first "left" the ball hits a
left brick: it SHATTERS into 6 flat shards, the left speaker PULSES, the needle SWINGS left (SFX panned left). On "How?" a
giant "?" POPS centre. "DX-Ball (1996) · illustrative" tag. This game view stays in the top zone (dimmed on navy) through s11.

### The first draft · s07–s09 (~18 s)
Navy; the game view dims at the top. s07: the function card TYPES OUT on the bench (x 460–1008): `sound( ____ )` plus three
blurred lines; "first draft" tag; on "incomplete" a yellow "INCOMPLETE" tag STAMPS; on "no input" PUSH IN on the empty slot
(red dashed, FLASHES twice). s08: from the `game.exe` block an instruction table of 12 unreadable mono rows SLIDES OUT (x 72–
420); one row LIGHTS yellow with the plain tag "a number goes in"; "≠" STAMPS between that row and the slot; the beam SWEEPS
the table on "digging". s09 (internal change): a call line DRAWS up to the game view; a dot ROUTES to the hit brick; a 0 … 640
ruler BUILDS under the grid; the value FLIES down into the slot, which FILLS `position` and turns ink.

### The formula · s10–s11 (~12 s)
Yellow. Section title "The formula". Two chips `1.5625` and `500` SLIDE OUT of the hex block. The card's body TYPES OUT
`position × 1.5625 − 500` one token per word, then `× pan scale (1.0)` and `→ whole number`. s11: the game view re-lights; three
hits in sequence on "Left edge" / "Centre" / "Right edge": a left-edge brick → needle −500 (left speaker), centre → 0, right
edge → +500 (right speaker), each value COUNTS on its word (hidden before). SFX bonks panned L / C / R.

### The check · s12–s14 (~13 s)
Blue. Section title "The check". Two columns BUILD: "original" (the hex block) and "rebuilt" (the completed card), a compare
bar between. s13: the counter returns centre, hidden until "All", then COUNTS UP 0 → 3,205 (fast ticks); the 5-row tick
grid FILLS row by row (one row per pan scale); "match ✓" and "one function" STAMP. s14: two 63-cell byte strips ("original",
"rebuilt") BUILD; cells LIGHT pairwise left to right; "63 / 63" COUNTS UP on "63"; "one function" stays visible.

### Not a clone + evidence · s15–s16 (~10 s)
Light. A big "CLONE" button outline; "NOT A CLONE BUTTON." STAMPS (Anton 170 px, ink); the mini function card POPS ✓ on "how
a feature works"; the struck "source code" chip on "original code". s16: three evidence cards FAN OUT; a magnifier SCANS; a
tick lands on each on "check".

### The catch · s17–s18 (~12 s)
Navy, calm (music dips). Section title "The catch". "ONLY ON SOFTWARE YOU MAY EXAMINE." BUILDS WORD BY WORD (Anton 150 px,
yellow). Chips "you own" · "you're allowed to examine" POP. s18: three plain chips STAMP in a row: "licence" · "local law" ·
"no rights to the original". No lock, skull, weapon or technique imagery.

### Verdict + CTA · s19–s20 (~10 s)
Yellow: three tiles BUILD on "learning" / "security work" / "preserving old software"; on "Ask" they SHRINK AWAY and the mini
function card + a question chip POP; on "evidence" the three evidence cards fan with ticks. WIPE to navy: "What should I
explain next?" BUILDS WORD BY WORD; follow pill.

## Approval
- [x] Structure check passed (2026-10-14)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-14 · the user said "go ahead"; defaults used without stopping: hook direction A, all beats as planned (the user can still pick B or C before `/video-studio`) · user replied "approve" to the finished package (hook direction A, all defaults), 2026-10-14

## Structure check · 2026-10-14
**VERDICT: PASS** · archetype: Launch · steps justified: no (none used, correctly)
- Sections (The question · The first draft · The formula · The check · The catch) are plain story-beat titles with a colour
  change; no "STEP n OF m", no chapter numbers, no progress bar anywhere in the plan or art direction. Keep.
- s02 / s13 tick grid (5 rows): earned by the script's "at five pan scales" (#13); one row per scale. Keep (the hook's
  5 × 8 grid is an illustrative fill with the same 5 rows, not a count).
- s01 / s13 "3,205 / 3,205" counter and s14 "63 / 63": both are counts the script says ("all 3,205 tests/cases", "the same
  63 bytes"), and "one function" stays beside them. Keep.
- s05 four-box chain and s11 −500 · 0 · +500: they illustrate a mechanism and three spoken values, not numbered steps. Keep.
- s19 evidence cards with ticks: recalls the three cards shown in s05 and s16, nothing new. Keep.
- storyboard-reel.md is still the empty template: when it is written, its Section column must reuse these plain titles
  (no numbers, no "of 5").

