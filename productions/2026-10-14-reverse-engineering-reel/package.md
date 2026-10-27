# Package · REA ("Reverse Engineer Anything") · reel

_For the editor: brief, chosen hook, script, storyboard and publish kit in one file (2026-10-14). Gates: content plan READY · script review PASS · structure check PASS · approved by the user 2026-10-14 (hook direction A, all defaults) · lint green. Next: `/video-studio productions/2026-10-14-reverse-engineering-reel`._


---

## Brief · REA ("Reverse Engineer Anything")

| | |
|---|---|
| Topic | "Reverse Engineering Anything" = **REA: Reverse Engineer Anything** (github.com/morluto/rea), the open-source MCP server + CLI that went to #1 on GitHub in October 2026 |
| Format(s) | reel (9:16, faceless) · default, the user gave only "Reverse Engineering Anything reel" |
| Viewer | global tech audience · level: curious practitioner (default; uses a coding agent like Claude Code or Cursor, has seen the "software is dead / clone anything" posts, has never opened a decompiler) |
| **Viewer's question** | "What does this viral 'reverse engineer anything' tool actually do, is it real, and can I use it?" |
| **Archetype** | primary: Launch · secondary (one beat only): none |
| **Why this archetype** | provisional: Launch (chooser: a newly viral tool; the viewer asks "what is it and should I care?"); not Concept (the question isn't "how does reverse engineering work" in general), not Tutorial (no imperative "set up X"), not Trend (the "software is dead" framing is the hype we answer, not the viewer's question). → **confirmed after YouTube analysis: Launch** is used by 3 of the 5 REA winners (#1, #3, #5 in inspiration.md); #4 is Trend and #2 is Story. The gap (nobody shows the evidence, an incomplete raw output being caught, or a check) fits the Launch beat sheet's Demo + "why it's different" beats, expanded to a longer demo |
| **Tone (voice style)** | Genuinely excited but honest, like a developer who just watched it work: brisk on the trace, a beat of surprise on "the first draft was incomplete", proud on the check, calm and serious on the permission line. |
| Must include | (provisional; the content plan decides) what REA does, by what it does; the agent → REA → tools → evidence loop; the demo on one running example; the incomplete raw output and the input the agent found anyway; the two checks; that it recovers logic, not the original source; the permission line (if the plan says it's material) |
| Running example | **one question about DX-Ball** (an old Windows brick-breaker): "hit a brick on the left and the sound comes from the left — how?" From REA's own showcase (project claim; the reconstruction is public) [research S6]. Drawn as a generic brick-breaker in house style, no game art |
| Angle (one sentence) | Show what REA really does on one tiny, real question: the agent asks, REA digs out the evidence, the decompiler's first draft turns out to be incomplete, the agent spots the mismatch, rebuilds the formula, and it is checked two ways against the original, so the viewer learns it's an evidence tool for software you're allowed to examine, not a "clone anything" button. |
| Chosen hook | "No source code. Just a game file from 1996. An AI agent rebuilt one of its functions. It matched the original in all 3,205 tests." (hooks.md #1, 19/20; first frame: a hex wall "game.exe · source code ✗" beside a giant "3,205 / 3,205 ✓") |
| Runtime target | ~110 s (294 words in the reviewed script, ~2.6–2.7 w/s; set after the content plan's six must-includes). Longer than the 35–55 s Launch sheet because the demo's payoff (incomplete → mismatch spotted → checked) is the gap; matches the channel's approved reels (2.5–2.7 w/s). No REA Short with reach exists to match (inspiration.md) |
| Open questions / unverified | **No "our test"**: running REA locally was blocked by this machine's permission policy, so every demo fact is REA's own showcase (labelled "in their own showcase"). Star counts move hourly ("over 200,000" is safe on 2026-10-14). |

## Locks (must never appear)
- No logos (GitHub, Anthropic, NSA, Ghidra dragon, the game's art); product names as plain text only; the brick game is drawn generically.
- No "clone any app / software is dead / open source now" claims, and no link between REA and the Adobe-alternative or bank-hacking stories (research S13).
- No working attack steps, no DRM / licence-check / anti-cheat bypass, no "how to get a paid app's API", no named commercial app as a copy target.
- No "our test" wording: we didn't run it.
- No sources on screen; code and UI on screen are labelled "illustrative" (the formula is the showcase's, simplified).
- No line from any watched video.

---

## Hooks · REA ("Reverse Engineer Anything")

Archetype Launch → formulas #9 before → after, #1 paradox, #5 time contrast, #7 the viewer's question (plus #2 striking number
and the house rule "open on the failure or a striking visual that works on mute").
Bar to beat (inspiration.md): the winners open on a talking head naming the tool and its promise (#1, #3, #5), a paradox about
Adobe (#4) or a time contrast (#2). None works on mute, none shows a result you can check, and three repeat an overclaim ("clone
any software").
Checked against the user's reference lines (tokenization: "It only reads numbers."; MCP: "An AI model can't check the weather.";
LangGraph: "Nobody approved it."): no echo.

| # | Formula | Hook line | First frame | Clarity | Curiosity | Accuracy | Frame | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | #2 striking number + #1 paradox | "No source code. Just a game file from 1996. An AI agent rebuilt one of its functions. It matched the original in all 3,205 tests." | Left: a wall of hex bytes labelled ".exe"; right: a giant green counter "3,205 / 3,205 ✓"; a crossed-out "source code" tag | 5 | 5 | 4 | 5 | 19 |
| 2 | #9 before → after | "This is machine code from a 1990s game. Watch an AI turn it into a formula you can test." | A hex wall with one row lit, an arrow, a blank formula slot | 4 | 4 | 4 | 4 | 16 |
| 3 | #1 paradox | "Every app you use is a locked box. This open-source tool lets your AI look inside." | A sealed box with ".exe" on it, a scan beam passing over | 4 | 4 | 3 | 4 | 15 |
| 4 | #7 the viewer's question | "Can AI really reverse engineer anything? I checked the receipts." | The question in giant type | 5 | 3 | 3 | 3 | 14 |
| 5 | myth-buster (#14 shape) | "Reverse Engineer Anything won't clone your favourite app. Here's what it really does." | "CLONE ✗" stamp over an app icon outline | 4 | 4 | 5 | 3 | 16 |
| 6 | #5 time contrast | "Reading this by hand takes an expert days. An AI agent did it in an evening." | Two timers | 4 | 4 | 2 | 4 | 14 |

**Pick:** #1 (19/20). It's a result you can check, not a promise; it states the paradox (no source, yet a match in every test case) in the
first two seconds; and the whole demo pays it off: the 3,205 counter returns at the check beat and fills to the same number.
Accuracy is 4, not 5: it is REA's own showcase (labelled as their showcase in beat 3), and the line itself says "one of its functions"
(content plan: never imply the whole game). #6 is cut: there is no sourced time for the showcase. #3's
"locked box" image survives as the visual metaphor in art direction. #5's idea becomes the verdict ("not a clone button").

**First frame (described):** a split frame on the house dark block. Left half: a dense, slowly scrolling wall of hex bytes in
mono, a small tag "game.exe" and a struck-through tag "source code ✗". Right half: a giant mono counter "3,205 / 3,205" with a
green tick, already full. Readable on mute in under a second; the voice explains the contrast.

**How the video pays it off:** beat 4 sets up the question (left brick → left speaker); the agent spots that the decompiler's first draft is
incomplete, finds the missing input and rebuilds the formula; the check beat runs the test: the counter counts up from 0 to 3,205 with every case ticking green,
then 63 / 63 compiled bytes.

---

## Reel script · REA ("Reverse Engineer Anything")

**Archetype:** Launch (reel beat sheet, Demo beat expanded for the check) · **Viewer's question:** "What does this viral 'reverse engineer anything' tool actually do, is it real, and can I use it?" · **Running example:** REA's own DX-Ball showcase: how a 1996 brick game turns a brick's position into left/right sound (one function) [S6]
**Tone:** genuinely excited but honest, like a developer who just watched it work: brisk on the trace, a beat of surprise on "the first draft was incomplete", proud on the check, calm and serious on the permission line · **Words:** 294 · **Est. runtime:** 109 s (÷2.7; ~113 s at the house 2.6 w/s) · **Winners' range:** REA winners are long-form only (292–898 s at 3.5–4.1 w/s); the category Short 108 s; the channel's approved reels 2.5–2.7 w/s

_Rows = the Launch reel beat sheet: Hook → What it is → Demo (expanded: question → incomplete draft → the input found → formula → the check) → Why it's different → The catch (material: content-plan.md) → Verdict → CTA. No numbered steps (Launch). Beats over 6 s (#5, #9, #11) name an internal visual change in the storyboard (long reel rule). Follows content-plan.md (2026-10-14), including its claim-safety wording._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook (1/2) | 0–3 s | [punchy] No source code. [beat] Just a game file from 1996. | 9 | `[TITLE]` | game.exe · source code ✗ | [S6] |
| 2 | Hook (2/2) | 3–9 s | An AI agent rebuilt one of its functions. [beat] It matched the original in all 3,205 tests. | 16 | `[NUMBER]` | 3,205 / 3,205 ✓ | [S6] |
| 3 | What it is (1/2) | 9–14 s | That's from the showcase of REA, the viral open-source tool called Reverse Engineer Anything. | 15 | `[TITLE]` | REA · Reverse Engineer Anything · open source | [S1] [S6] |
| 4 | What it is (2/2) | 14–19 s | It lets your coding agent look inside a program without its source code. | 13 | `[ANIMATE]` | your agent → inside the program | [S1] |
| 5 | How it works (the loop) | 19–27 s | Your agent asks a question. REA runs existing decompilers, which turn compiled code back into readable code. Then it hands back the evidence. | 23 | `[ANIMATE]` | question → REA → decompilers → evidence | [S2] [S4] |
| 6 | Demo · the question | 27–33 s | Here's their question. Hit a brick on the left, and you hear it on the left. How? | 16 | `[ANIMATE]` | brick on the left → sound on the left · how? | [S6] |
| 7 | Demo · the incomplete draft (re-hook) | 33–39 s | [lean in] The decompiler's first draft of the sound function was incomplete. It showed no input at all. | 17 | `[CODE]` | first draft: sound( ) · no input (illustrative) | [S6] |
| 8 | Demo · the input found | 39–45 s | But the raw instructions take a number in. [beat] The agent spotted the mismatch, and kept digging. | 16 | `[ANIMATE]` | instructions: a number goes in ≠ draft | [S6] |
| 9 | Demo · the caller | 45–51 s | It followed the call back to the brick. That number is the brick's position on screen. | 16 | `[ANIMATE]` | position: 0 … 640 | [S6] |
| 10 | Demo · the formula (1/2) | 51–56 s | Then it read the constants and rebuilt the formula. Position, times 1.5625, minus 500. | 14 | `[CODE]` | position × 1.5625 − 500 | [S6] |
| 11 | Demo · the formula (2/2) | 56–63 s | Times the pan scale, which starts at one. [beat] Left edge, minus 500. Centre, zero. Right edge, plus 500. | 17 | `[ANIMATE]` | × pan scale → −500 · 0 · +500 | [S6] |
| 12 | Why it's different · the check (re-hook) | 63–66 s | [build] Then the rebuilt function was tested against the original. | 9 | `[NUMBER]` | tested against the original | [S6] |
| 13 | Why it's different · the check | 66–70 s | Every position, at five pan scales. All 3,205 cases match. | 10 | `[NUMBER]` | 3,205 / 3,205 ✓ · one function | [S6] |
| 14 | Why it's different · the check | 70–76 s | [proud] And compiled the old way, it makes the same 63 bytes as the original function. | 15 | `[VS]` | 63 / 63 bytes | [S6] |
| 15 | Why it's different · what it is not | 76–82 s | So it's not a clone button. It recovers how a feature works, not the original code. | 16 | `[VERDICT]` | NOT A CLONE BUTTON. | [S9] [S10] |
| 16 | Why it's different · the evidence | 82–86 s | It hands back the evidence with each answer, so you can check it. | 13 | `[VERDICT]` | evidence → you check | [S2] [S8] |
| 17 | The catch (1/2) | 86–92 s | [slow down] Now, the catch. Only use it on software you own, or are allowed to examine. | 16 | `[VERDICT]` | ONLY ON SOFTWARE YOU MAY EXAMINE. | [S9] |
| 18 | The catch (2/2) | 92–98 s | Licences and local laws can forbid reverse engineering. And the output gives you no rights to the original. | 18 | `[VERDICT]` | licences · local laws · no rights to the original | [S9] |
| 19 | Verdict | 98–105 s | It's built for learning, security work and preserving old software. Ask one focused question, then check the evidence. | 18 | `[LIST]` | learning · security work · old software → one question, check the evidence | [S9] [S8] |
| 20 | CTA | 105–108 s | What should I explain next? Tell me below. | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** REA (say the letters "R-E-A"), Reverse Engineer Anything (the plain words, as a name), decompiler ("dee-com-PILE-er"), 1.5625 ("one point five six two five"), 3,205 ("three thousand two hundred and five"), 1996 ("nineteen ninety-six"), DX-Ball (on screen only, "D-X Ball" if said) → `names`: REA, DX-Ball, decompiler

**Re-hooks (long Short):** #7 at ~33 s ("the first draft… was incomplete"), #12 at ~63 s ("tested against the original": the hook's counter returns), #17 at ~86 s ("Now, the catch"): every 22–30 s.

**Accuracy notes:**
- Every demo fact is REA's own showcase; beat 3 labels it ("That's from the showcase of REA"). Nothing is "our test" (we didn't run REA).
- The hook and #13 say "one of its functions" / "one function" on screen: never the whole game (content plan).
- #7–#8: "incomplete", "no input at all", "spotted the mismatch, and kept digging", never "wrong" (the showcase: the draft declared no input; the instruction view "exposes the integer input missing from the decompiler view"; "That discrepancy gave the agent a concrete reason to keep investigating"). The decompiler isn't named (the showcase doesn't say which).
- #10–#11: "which starts at one" = the pan scale's starting value 1.0 read from the file [S6]; the ±500 edges hold at that scale (script review 2026-10-14). The showcase's formula (× 1.5625, − 500, × pan scale, convert to a whole number; ±500 at the edges at scale 1). "Rounded to a whole number" is omitted from the voice to save time; the on-screen formula ends "→ whole number".
- #12–#14: "the rebuilt function was tested" (the reconstruction project ran the checks, not REA), "match", "the same 63 bytes"; never "proves" or "identical program".
- #4 and #15: "without its source code" and "not the original code" (README, S10). "Open source" (MIT), never "free".
- #5: "existing decompilers" (Hopper, Ghidra or IDA; S4), never "a new decompiler"; "decompiler" is defined by what it does on first use (the brief's viewer has never opened one). Script review 2026-10-14.
- #17–#18: the content plan's catch, worded from DISCLAIMER.md [S9]. No list of forbidden techniques.
- #19: uses from the DISCLAIMER's list (education, security research, software preservation) [S9] + "verify consequential conclusions" [S8].

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

No source code. Just a game file from 1996.

An AI agent rebuilt one of its functions. It matched the original in all 3,205 tests.

That's from the showcase of REA, the viral open-source tool called Reverse Engineer Anything.

It lets your coding agent look inside a program without its source code.

Your agent asks a question. REA runs existing decompilers, which turn compiled code back into readable code. Then it hands back the evidence.

Here's their question. Hit a brick on the left, and you hear it on the left. How?

The decompiler's first draft of the sound function was incomplete. It showed no input at all.

But the raw instructions take a number in. The agent spotted the mismatch, and kept digging.

It followed the call back to the brick. That number is the brick's position on screen.

Then it read the constants and rebuilt the formula. Position, times 1.5625, minus 500.

Times the pan scale, which starts at one. Left edge, minus 500. Centre, zero. Right edge, plus 500.

Then the rebuilt function was tested against the original.

Every position, at five pan scales. All 3,205 cases match.

And compiled the old way, it makes the same 63 bytes as the original function.

So it's not a clone button. It recovers how a feature works, not the original code.

It hands back the evidence with each answer, so you can check it.

Now, the catch. Only use it on software you own, or are allowed to examine.

Licences and local laws can forbid reverse engineering. And the output gives you no rights to the original.

It's built for learning, security work and preserving old software. Ask one focused question, then check the evidence.

What should I explain next? Tell me below.

---

## Storyboard · REA ("Reverse Engineer Anything") · reel · archetype: Launch (plain section titles, no numbered steps)

_One row per script beat. Fixed layout from s06 to s16: the **game view** (y 250–760: a 6 × 3 flat brick grid, paddle, ball,
a speaker on each side, the pan meter −500 · 0 · +500) and the **bench** (y 800–1440: the sealed `game.exe` hex block on the
left, the **function card** on the right). Only the card, the needle and the evidence change, so nothing jumps between scenes.
Captions: the engine's, 81–90 % height, left grid; the stage never draws below y 1460; right 12 % clear. Section titles are
plain words ("The question", "The first draft", "The formula", "The check", "The catch"): no numbers, no "of 5", no progress bar
(structure check, 2026-10-14)._

**Continuous spans:** A = s01–s02 (hook: the sealed file → the counter) · B = s03–s05 (what it is → the loop) · C = s06 (the
question) · D = s07–s09 (the draft → the slot fills) · E = s10–s11 (the formula drives the needle) · F = s12–s14 (the check) ·
G = s15–s16 (not a clone, the evidence) · H = s17–s18 (the catch) · I = s19–s20 (verdict → CTA). The function card is the
running object from s02 (it slides out of the file) through s16, and returns as a mini card in s19.

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–3 s | No source code. Just a game file from 1996. | `[TITLE]` | dark | Frame 0 (never empty): navy; left, the sealed `game.exe` block (x 72–520, y 400–1200) of dim hex SCROLLS slowly; a "source code" chip STAMPS on "source" and a red strike DRAWS through it on "code"; "1996" POPS on the tag. Right half: giant mono "3,205 / 3,205 ✓" (200 px, green), already full: the claim the voice is about to make | cold open (no fade) | game.exe · source code ✗ | stamp, scratch | none (sources in description) |
| 2 | 3–9 s | An AI agent rebuilt one of its functions. It matched the original in all 3,205 tests. | `[NUMBER]` | dark | An `agent` chip POPS above the block; on "functions" a function card SLIDES OUT of the hex to centre-bottom (illustrative); on "matched" the counter PULSES; "one function" STAMPS under it; a 5 × 8 tick grid TICKS green left to right (internal change at 5 s) | continuous | 3,205 / 3,205 ✓ · one function | pop, slide, tick run, chime | none (sources in description) |
| 3 | 9–14 s | That's from the showcase of REA, the viral open-source tool called Reverse Engineer Anything. | `[TITLE]` | blue | The counter SHRINKS AWAY to the top-right; "REA" SLAMS centre (Anton 230 px, white); "Reverse Engineer Anything" TYPES OUT under it (mono 50 px); "open source" chip POPS; small tag "from their showcase" | WIPE (dark → blue) | REA · Reverse Engineer Anything · open source | whoosh, slam, typing | none (sources in description) |
| 4 | 14–19 s | It lets your coding agent look inside a program without its source code. | `[ANIMATE]` | blue | "REA" SHRINKS to a chip at the top; the `game.exe` block returns centre (y 500–1100); on "inside" a scan beam SCANS it top to bottom and the block turns translucent (faint structure inside); the struck "source code" chip stays | continuous | your agent → inside the program | scan hum | none (sources in description) |
| 5 | 19–27 s | Your agent asks a question. REA runs existing decompilers, which turn compiled code back into readable code. Then it hands back the evidence. | `[ANIMATE]` | blue | Four translucent boxes BUILD across y 700 on their words: `agent` → `REA` → `decompilers` → `evidence` (≥ 40 px apart); on "readable code" a hex strip inside `decompilers` FLIPS into a code strip (giant arrow); on "evidence" three cards `code` · `caller` · `data` SLIDE OUT and ROUTE back to `agent` (internal change at 22 s and 25 s) | continuous | question → REA → decompilers → evidence | tick ×4, flip, slide ×3 | none (sources in description) |
| 6 | 27–33 s | Here's their question. Hit a brick on the left, and you hear it on the left. How? | `[ANIMATE]` | light | Section title "The question" (0.8 s). The game view BUILDS: bricks drop in row by row, paddle, ball, two speakers, pan meter. On the first "left" the ball hits a left brick: it SHATTERS into flat shards, the left speaker PULSES, the needle SWINGS left; on "How?" a giant "?" POPS centre | WIPE (blue → light) + section title | brick on the left → sound on the left · how? · DX-Ball (1996) · illustrative | whoosh, brick bonk panned hard left, pop | none (sources in description) |
| 7 | 33–39 s | The decompiler's first draft of the sound function was incomplete. It showed no input at all. | `[CODE]` | dark | Section title "The first draft". The game view dims at the top. On the bench the function card TYPES OUT `sound( ____ )` + three blurred body lines, "first draft" tag; on "incomplete" a yellow "INCOMPLETE" tag STAMPS; on "no input" PUSH IN on the empty slot, which FLASHES red twice | WIPE (light → dark) + section title | first draft: sound( ) · no input (illustrative) | whoosh, typing, error blip | none (sources in description) |
| 8 | 39–45 s | But the raw instructions take a number in. The agent spotted the mismatch, and kept digging. | `[ANIMATE]` | dark | From the `game.exe` block an instruction table SLIDES OUT (12 unreadable mono rows, x 72–420); on "number" one row LIGHTS yellow with the plain tag "a number goes in"; on "mismatch" a "≠" STAMPS between that row and the empty slot; on "digging" the scan beam SWEEPS the table again | continuous | instructions: a number goes in ≠ draft | slide, highlight, stamp, scan | none (sources in description) |
| 9 | 45–51 s | It followed the call back to the brick. That number is the brick's position on screen. | `[ANIMATE]` | dark | A call line DRAWS from the card up to the game view; a dot ROUTES along it to the hit brick; a 0 … 640 ruler BUILDS under the grid; on "position" the value FLIES down the line into the slot, which FILLS `position` and turns from red to ink (internal change at 48 s) | continuous | position: 0 … 640 | line draw, swoosh, click | none (sources in description) |
| 10 | 51–56 s | Then it read the constants and rebuilt the formula. Position, times 1.5625, minus 500. | `[CODE]` | yellow | Section title "The formula". Two chips `1.5625` and `500` SLIDE OUT of the hex block on "constants"; the card body TYPES OUT one token per word: `position` · `× 1.5625` · `− 500` | WIPE (dark → yellow) + section title | position × 1.5625 − 500 | whoosh, slide ×2, typing | none (sources in description) |
| 11 | 56–63 s | Times the pan scale, which starts at one. Left edge, minus 500. Centre, zero. Right edge, plus 500. | `[ANIMATE]` | yellow | `× pan scale (1.0)` and `→ whole number` TYPE OUT; the game view re-lights; three hits on their words: left-edge brick → needle SWINGS to −500 (left speaker pulses), centre → 0, right edge → +500 (right speaker pulses); each value COUNTS on its word (hidden before) (internal change at 59 s) | continuous | × pan scale → −500 · 0 · +500 | typing, bonk L / C / R | none (sources in description) |
| 12 | 63–66 s | Then the rebuilt function was tested against the original. | `[NUMBER]` | blue | Section title "The check". Two columns BUILD: "original" (the hex block) and "rebuilt" (the completed function card), a compare bar between them | WIPE (yellow → blue) + section title | tested against the original | whoosh, build | none (sources in description) |
| 13 | 66–70 s | Every position, at five pan scales. All 3,205 cases match. | `[NUMBER]` | blue | The hook's counter returns centre, hidden until "All", then COUNTS UP 0 → 3,205; the 5-row tick grid FILLS row by row on "five" (one row per scale, each sweeping 0 → 640); "match ✓" and "one function" STAMP | continuous | 3,205 / 3,205 ✓ · one function | fast ticks, chime | none (sources in description) |
| 14 | 70–76 s | And compiled the old way, it makes the same 63 bytes as the original function. | `[VS]` | blue | The counter SHRINKS AWAY up; two 63-cell byte strips BUILD ("original", "rebuilt"); cells LIGHT pairwise left to right; "63 / 63" COUNTS UP on "63"; "one function" stays | continuous | 63 / 63 bytes · one function | tick run, chime | none (sources in description) |
| 15 | 76–82 s | So it's not a clone button. It recovers how a feature works, not the original code. | `[VERDICT]` | light | A big "CLONE" button outline appears; "NOT A CLONE BUTTON." STAMPS across it (Anton 170 px, ink); on "how a feature works" the mini function card POPS with a ✓; on "original code" the struck "source code" chip returns | WIPE (blue → light) | NOT A CLONE BUTTON. | whoosh, stamp, pop | none (sources in description) |
| 16 | 82–86 s | It hands back the evidence with each answer, so you can check it. | `[VERDICT]` | light | Three evidence cards (`code` · `caller` · `data`) FAN OUT under the function card; a magnifier SCANS across them; a tick lands on each on "check" | continuous | evidence → you check | fan, scan, tick ×3 | none (sources in description) |
| 17 | 86–92 s | Now, the catch. Only use it on software you own, or are allowed to examine. | `[VERDICT]` | dark | Section title "The catch". "ONLY ON SOFTWARE YOU MAY EXAMINE." BUILDS WORD BY WORD (Anton 150 px, yellow); chips "you own" and "you're allowed to examine" POP on their words. Calm: music dips | WIPE (light → dark) + section title | ONLY ON SOFTWARE YOU MAY EXAMINE. | whoosh, soft stamp | none (sources in description) |
| 18 | 92–98 s | Licences and local laws can forbid reverse engineering. And the output gives you no rights to the original. | `[VERDICT]` | dark | Under the title three plain chips STAMP in a row on their words: "licence" · "local law" · "no rights to the original". No lock, weapon or technique imagery | continuous | licences · local laws · no rights to the original | soft stamp ×3 | none (sources in description) |
| 19 | 98–105 s | It's built for learning, security work and preserving old software. Ask one focused question, then check the evidence. | `[LIST]` | yellow | Three tiles BUILD on their words: "learning" · "security work" · "preserving old software"; on "Ask" they SHRINK AWAY and the mini function card + one question chip POP; on "evidence" the three evidence cards fan under it with ticks (internal change at 101 s) | WIPE (dark → yellow) | learning · security work · old software → one question, check the evidence | whoosh, tick ×3, pop | none (sources in description) |
| 20 | 105–108 s | What should I explain next? Tell me below. | `[CTA]` | dark | "What should I explain next?" BUILDS WORD BY WORD (Anton 140 px, yellow on navy); a follow pill POPS | WIPE (yellow → dark) | What should I explain next? | whoosh, pop | none (sources in description) |

_Reels: a visual change every 2–3 s (every row above has a word-cued change at least every 3 s); captions at 81–90 % height; the
bottom 20 % / right 12 % clear; generic icons, no logos. Every on-screen number appears on its spoken word, except the hook's full
counter, which is the claim itself._

---

## Publish kit · REA ("Reverse Engineer Anything")

_Title patterns from the winners (evidence, not words): the tool's name up front + a test framing ("I tested…", "Has AI
solved…?") outperformed the pure "clone any software" promise on the big channels. Ours lead with the name and the one
thing nobody shows (the check), and never promise a clone._

## Titles (pick 1)
1. Reverse Engineer Anything: what it actually does (no source code)
2. An AI rebuilt a 1996 game's sound formula. Here's the evidence.
3. The viral REA tool on one function: 3,205 / 3,205 in their own showcase

## Thumbnail concept (≤4 words of text)
Navy split: left a sealed block of hex labelled "game.exe"; right a giant green **"3,205 / 3,205"** with a tick, and the text
**"NO SOURCE CODE"** (3 words) in yellow Anton across the top. A small flat brick-breaker icon in the corner. No logos, no faces.

## Caption / description
No source code, just a game file from 1996, and an AI agent's rebuild of one of its functions matched the original in all
3,205 test cases. That's from the showcase of REA ("Reverse Engineer Anything"), the viral open-source tool that lets a coding
agent look inside a program without its source code. Here's what it really does: the decompiler's first draft was incomplete,
the agent spotted the mismatch, found the input, rebuilt the formula, and the rebuilt function was tested against the original.
It recovers how a feature works, not the original code, and it's only for software you own or are allowed to examine.
The game view and code on screen are illustrative; the demo is REA's own published showcase (we didn't run it ourselves).

## Chapters (long-form)
_n/a (Short)_

## Sources (for the description / pinned comment)
- [S1] [S2] [S3] [S4] REA README (what it does, how it works, targets, requirements): https://github.com/morluto/rea
- [S5] REA FAQ: "Does REA upload my app?": https://github.com/morluto/rea#faq
- [S6] DX-Ball showcase (the incomplete draft, the formula, 3,205 cases, 63 bytes): https://rea.tools/showcase/dx-ball/
- [S6] The public reconstruction and its tests: https://github.com/N0zoM1z0/dx-ball
- [S8] [S9] REA DISCLAIMER (responsible use, permission, verify the evidence): https://github.com/morluto/rea/blob/main/DISCLAIMER.md
- [S10] Geeky Gadgets: logic and behaviour, not the original source (2026-10-11): https://www.geeky-gadgets.com/reverse-engineer-anything-github-repo/

## Hashtags
#ReverseEngineering #AIAgents #MCP #ClaudeCode #OpenSource #GenAI #Shorts

## Pinned comment (invites replies)
Would you trust an AI's reverse-engineering result without the tests? 🤔 What's one program *you own* you'd want to look
inside: an old game, a tool you lost the code for, something else? Tell me below. Every source is in the description.

## Repurposing (long-form moments → reels)
- A long-form explainer could cover what this reel left out: privacy (analysis is local, but results go to your model provider),
  setup (Ghidra / Hopper / IDA), the Notion clipboard showcase on an Electron app, and how to write one focused question.
- The 12 s "first draft was incomplete → mismatch spotted" segment (s07–s08) works on its own as a "never trust raw
  decompiler output" Short (needs its own content plan).
- The catch (s17–s18) can seed a Risk/Myth reel: "Is reverse engineering legal?" (needs legal sources per country; not covered here).
