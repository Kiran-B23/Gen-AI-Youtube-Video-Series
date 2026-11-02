# Animation plan · Harness Engineering

_For each beat: what the picture DOES to the running object, or "none". Each step is built as its own 4–10 s piece from
the standalone brief below. Beats follow script-reel.md (script review PASS 2026-10-28, 19 beats)._

**Running object:** the task card "Add password-reset button" (illustrative) with its test row `sends reset email` and its DONE stamp · **Sections:** Guides (before) · Checks (after): two halves of the harness, not ordered steps (structure check 2026-10-29: plain section titles, no numbers, no counter) · **House style:** reference-flat

**Fixed layout (s05–s13, the workbench; visual-plan fix 2026-10-28: everything inside x 60–950 so the right 12 % button column stays clear; structure check 2026-10-29: no step counter, the band y 230–290 stays empty):** **Task card** y 310–570, x 90–930 (white, 4 px ink border, title mono 46 px "Add password-reset button", tag "illustrative" 26 px, code lines mono 32 px). **Harness outline**: a rounded rectangle x 60–950, y 620–940 that DRAWS around the pill in s05; two legends sit on its top edge like fieldset labels (Inter 800 44 px): "AGENT =" at x 80–300 and "+ HARNESS" at x 640–930, y 596–644. **Model pill** centred at (505, 790), 300×120 px (x 355–655), navy `#0B1020` with white Inter 900 "MODEL" 56 px: never changes colour, size or label (emphasis is a ring that pulses *around* it, never a scale on it). **Guide slot** left inside the outline (x 90–330, y 670–910), **check slot** right (x 680–920, y 670–910), both empty dashed until filled; text in a slot is mono 26–32 px, ≤ 2 lines. **Loop arc** from the check slot's bottom, under the pill, back into the pill's left edge (y 910–975). **Test row** y 1040–1160, x 90–930: mono 44 px `sends reset email`, state chip at x 790–920 (`not run` grey → `✗` red → `✓` green). **Callout band** y 1180–1300, x 90–930 (s11 error + hint only). Nothing below y 1460, nothing right of x 950. Camera centres keep the view inside the 1080 stage (x between 1080 ÷ 2zoom and 1080 − 1080 ÷ 2zoom).

## First frame (frame 0, before a word is spoken)
Full-bleed light block (#EEF1F6). Upper centre, a large white task card (~70 % of the frame width, y 300–700) titled "Add password-reset button" in mono 46 px, tagged "illustrative"; across it a giant green "DONE ✓" stamp (Anton 200 px, #14B87A), tilted −8°, filling half the card. Directly below (y 760–880), a red test row as wide as the card: "✗ 1 test failing" in Inter 800 52 px on white with a red #E5364A left bar. The contradiction (DONE vs failing) reads on mute in under a second; nothing in the bottom 20 % or right 12 % (card x 162–918).
**First second (visual-plan fix 2026-10-28):** frame 0 is already the full picture, and it is not static: from frame 0 the DONE stamp settles (scale 1.10 → 1.00 over 0–0.4 s, fully readable at every frame) and the red ✗ pulses once at 0.6 s, so the running object moves before 1.0 s (the first cue word, "Done", lands at ~1.7 s).

## Hook direction (pick one, or write your own)
- **A (default):** frame 0 above, already complete; on "Done" the DONE stamp THUMPS (scale 1.08 → 1, stamp sfx); on "isn't" the red row SHAKES once and its ✗ pulses; on "smarter model" a navy `MODEL` pill SLIDES UP under the row with a small "+ smarter?" chip that greys out (the question the reel answers).
- **B:** split frame: top half a chat bubble "Done! ✅ Password reset is ready." TYPES OUT from the agent; bottom half a terminal line `1 failed` TYPES OUT in red right under it; the two halves hold side by side.
- **C:** a green "DONE" stamp SLAMS onto an empty card; a scan beam SCANS the card and the stamp CRACKS in half, revealing "TEST: NOT RUN" underneath.
_(A is the approved hook's described first frame; B and C are genuinely different first images.)_

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | cam | sfx | Block to adapt (registry, optional) |
|---|---|---|---|---|---|---|---|
| s01 hook | Your coding agent says, "Done." The test says it isn't. The fix might not be a smarter model. | light | frame 0: task card with the giant green "DONE ✓" STAMP over "Add password-reset button", red row "✗ 1 test failing" below; from frame 0 the stamp SETTLES (1.10 → 1.00, 0–0.4 s) and the ✗ pulses at 0.6 s; on "Done" the stamp THUMPS (1.08 → 1); on "test" the red row's ✗ PULSES; on "isn't" the red row SHAKES once; on "fix" a dashed empty pill slot DRAWS under the red row (x 355–655, y 940–1060); on "smarter" a navy `MODEL` pill SLIDES UP into that slot with a "+ smarter?" chip (x 680–900) that GREYS OUT on "model" | Done · test · isn't · fix · smarter · model | no cam | stamp (Done) · tick (test) · tick (isn't) · pop (fix) · whoosh (smarter) · none (model: < 0.35 s after) | headline-slam |
| s02 example | The task? A password-reset button. | dark | WIPE to navy; the card SHRINKS to the workbench position (y 310–570); the DONE stamp, the red row and the `MODEL` pill with its greyed chip LIFT OFF and park off-frame (the pill returns in s05); on "task" the title RE-TYPES "Add password-reset button" letter by letter; on "password-reset" its "illustrative" tag POPS | task · password-reset | no cam | whoosh (wipe) · key (task) · pop (password-reset) | code-typing |
| s03 failure | The agent writes the code, re-reads it, decides it looks fine, and stops. | dark | on "agent" a blinking caret DROPS into the empty card body; on "writes" 4 lines of code TYPE OUT (mono 32 px, illustrative); on "re-reads" a scan line SCANS the code top to bottom; on "fine" a small "looks fine" chip POPS; on "stops" the green DONE stamp STAMPS back onto the card and, under it, the test row SLIDES IN grey with chip `not run` | agent · writes · re-reads · fine · stops | [510, 440, 1.3] on "re-reads" (lands on the scan), home on "stops" (the test row enters below) | blip (agent) · key (writes) · tick (re-reads) · pop (fine) · stamp (stops) | code-typing |
| s04 failure | The test? Never even ran. | dark | on "test" PUSH IN on the test row; on "Never" its grey `not run` chip FLASHES; on "ran" "NEVER RAN." STAMPS across the row in yellow Anton 110 px (≈ 460 px wide, ≈ 600 px on screen at 1.3) | test · Never · ran | [525, 1100, 1.3] on "test" (reveal: the row that never ran; the whole row and its chip stay in view) | whoosh (cam) · tick (Never) · stamp (ran) | |
| s05 concept | Agent equals model plus harness. | blue | WIPE to blue; camera home; "NEVER RAN." SHRINKS AWAY into the row's `not run` chip; the `MODEL` pill SLIDES back in to the centre (505, 790); the equation BUILDS WORD BY WORD on the diagram itself: on "Agent" the legend "AGENT =" TYPES OUT on the outline zone's top-left; on "model" a ring PULSES around the pill (the pill is the MODEL term and never changes); on "harness" the outline DRAWS around the pill in one stroke and the legend "+ HARNESS" TYPES OUT on its top-right, so the frame reads AGENT = [MODEL] + HARNESS | Agent · model · harness | home on the wipe (section) | whoosh (wipe) · pop (Agent) · tick (model) · pop (harness) | kinetic-center-build |
| s06 concept | The harness is everything around the model: what it reads first, what checks its work after. | blue | on "everything" a dash RUNS once around the outline (1.6 s, the "around"); on "reads" the left dashed slot LIGHTS with label "BEFORE" and on "first" a short arrow ROUTES from it into the pill; on "checks" the right slot LIGHTS "AFTER" and on "after" an arrow ROUTES from the pill into it; the task card stays at the top, the grey test row at the bottom | everything · reads · first · checks · after | no cam | tick (everything) · pop (reads) · blip (first) · pop (checks) · blip (after) | flowchart |
| s07 guides | First, the guides: a short file it reads first, named agents dot M D. | yellow | WIPE to yellow; section card "GUIDES" with a small "BEFORE" kicker above it (~1 s, Inter 900 title, no numeral), then on "guides" the workbench returns; on "file" a small doc icon FILLS the left slot (tiny "illustrative" tag); on "reads" the BEFORE arrow ROUTES from the doc into the pill; on "agents" its filename TYPES OUT "AGENTS" and on "dot" ".md" completes it ("AGENTS.md", mono 32 px; keyed to "dot", not "M", in case the alignment merges "M D") | guides · file · reads · agents · dot | [340, 790, 1.6] on "file" (new actor: the doc) | whoosh (wipe) · pop (guides) · pop (file) · blip (reads) · key (agents) · key (dot) | |
| s08 guides | A map, not a manual. Add one line: run the tests before you say done. | yellow | on "map" the doc shows 3 short heading lines (a table of contents); on "manual" a thick ghost stack of 40 pages SLIDES behind it and SHRINKS AWAY; on "line" a new line TYPES OUT in the doc, 2 lines mono 26 px: `+ Run tests` / `before "done"` (4 words; the caption carries the full sentence); on "before" a yellow marker SWEEPS that line; camera home on "done" | map · manual · line · before · done | home on "done" (the rule is written; back to the whole workbench) | pop (map) · whoosh (manual) · key (line) · tick (before) · none (done: the cam's whoosh) | code-typing |
| s09 checks (re-hook) | But nobody checks that rule. Second: the checks. | light | on "nobody" the new AGENTS.md line PULSES and a dashed connector DRAWS from it toward the test row; on "rule" a "?" POPS at the connector's end, which stays EMPTY (nothing reads the rule back); on "Second" WIPE to light; on "checks" section card "CHECKS" with a small "AFTER" kicker above it (~1 s, no numeral) | nobody · rule · Second · checks | no cam | tick (nobody) · pop (rule) · whoosh (Second) · pop (checks) | |
| s10 checks | Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done. | light | on "hook" a small generic mono box SNAPS into the right slot (tiny "illustrative" tag); on "command" its text TYPES OUT `hook ›` / `run tests` (2 lines, mono 30 px); on "tool" a tiny ▶ glyph POPS beside it and on "own" it SPINS (it fires by itself); on "test" a dashed connector DRAWS from the hook down to the test row's chip; on "every" two ghost DONE stamps FLICKER on the card and each sends a pulse down the connector (every time); on "done" the DONE stamp THUMPS again (the agent says done) and, the same instant, the hook FIRES: a pulse ROUTES from the stamp into the hook, and the test row SCANS left to right | hook · command · tool · own · test · every · done | [720, 790, 1.5] on "hook" (new actor: the hook), home on "done" (the scan needs the whole row) | pop (hook) · key (command) · pop (tool) · tick (own) · pop (test) · tick (every) · stamp (done) | terminal-simulator |
| s11 loop | Red. The error, with a fix hint, goes straight back to the agent. | light | on "Red" the test row FILLS red, chip `✗`; the DONE stamp FADES to an outline (not earned yet: no lock, no "blocked"); on "error" a red error chip TYPES OUT in the callout band under the row: `expected email sent · got none` (mono 32 px, illustrative); on "hint" a line `hint: call sendResetEmail()` TYPES OUT under it; on "back" the chip ROUTES up the connector and along the loop arc toward the pill; on "agent" it ENTERS the pill's left edge and a ring PULSES around the pill (the pill itself unchanged) | Red · error · hint · back · agent | no cam | pop (Red) · key (error) · key (hint) · whoosh (back) · blip (agent) | |
| s12 loop | The agent fixes the code and re-runs. Green. | light | on "fixes" one code line in the card RETYPES (the missing call added, highlighted yellow); on "re-runs" the hook's ▶ spins and the test row SCANS again; on "Green" the row FILLS green, chip `✓` | fixes · re-runs · Green | [525, 1100, 1.3] on "Green" (the reveal; whole row in view) | key (fixes) · tick (re-runs) · ding (Green) | success-check |
| s13 payoff | Now the test passes, so "Done" means something. | light | on "Now" camera home; on "passes" the green ✓ chip BOUNCES once; on "Done" the DONE ✓ STAMPS back solid on the card (the s01 layout replayed with ✓ instead of ✗: the hook's frame, now earned); on "means" the whole harness outline glows green once | Now · passes · Done · means | home on "Now" (the payoff is the whole frame) | tick (passes) · stamp (Done) · none (means: a glow, not a reveal) | |
| s14 proof | Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness. | dark | on "Does" WIPE to navy and the task card DOCKS as a mini card with its earned ✓ top-left (x 90–420, y 230–300), staying through s15; on "matter" the workbench SPLITS into two identical side-by-side copies (left x 60–480, right x 520–940, y 380–760), each the same `MODEL` pill inside the same thin grey outline with one dashed slot (their old harness: before ≠ no harness); on "LangChain" a plain-text label "LangChain" TYPES OUT above the pair (x 440–930, y 300–350, no logo) and on "framework" "· agent framework" completes it; on "same" a ring PULSES around both pills together and "SAME MODEL" STAMPS across the pair (yellow Anton 96 px, y 790–880); on "changed" the right copy's thin outline LIFTS OFF; on "harness" a new, thicker outline DRAWS around the right pill with both slots filled (doc + hook): the model stays, the harness changes | Does · matter · LangChain · framework · same · changed · harness | no cam | whoosh (Does) · pop (matter) · key (LangChain) · key (framework) · stamp (same) · tick (changed) · pop (harness) | comparison-split |
| s15 proof | They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. Now? Sixty-six point five. That's their own agent, measured by them. | dark | on "They" the LangChain label SHRINKS AWAY and legends "BEFORE" / "AFTER" TYPE OUT on the two outlines' top edges; on "used" the left copy brightens and the right dims; under the left copy "52.8%" COUNTS UP from "fifty-two" and lands on "percent" (Anton 170 px, white, x 80–450, y 920–1100); on "tasks" "tasks solved" TYPES OUT beneath both (Inter 700 40 px, y 1140–1190); on "Sixty-six" the right copy brightens and "66.5%" COUNTS UP under it (Anton 200 px, yellow, x 520–940), landing on "five"; on "own" a small chip "their own run" STAMPS under the pair (y 1220–1280); camera home on "measured". Both numbers, "SAME MODEL" and the chip stay on screen to the section's end | They · used · fifty-two · percent · tasks · Sixty-six · five · own · measured | [660, 1000, 1.3] on "Sixty-six" (the headline number lands), home on "measured" | pop (They) · tick (used) · tick (fifty-two) · ding (percent) · pop (tasks) · tick (Sixty-six) · ding (five) · stamp (own) | count-up |
| s16 habit | The habit: every mistake becomes a rule it reads, or a check it must pass. | blue | WIPE to blue; the left copy SHRINKS AWAY and the right copy (the new harness) GROWS back to centre as the small workbench (scale 0.7, y 400–1000), the docked mini card rejoining it at the top; on "mistake" a red chip `✗ wrong command` DROPS onto the outline beside the pill; on "rule" it SPLITS: one half FILLS the guide slot as a new AGENTS.md line `+ use npm test`; on "check" the other half FILLS the check slot as a second test line `+ check: npm test`; on "pass" the outline GROWS one notch thicker | mistake · rule · check · pass | no cam | whoosh (wipe) · pop (mistake) · pop (rule) · pop (check) · tick (pass) | |
| s17 catch | One catch. Green only means your checks passed. So write or review the test yourself. | blue | on "catch" the green test row SLIDES to centre (y 780–900; the camera does the enlarging); on "only" a label "= your checks passed" TYPES OUT beside the ✓; on "passed" the camera goes home and that label STAMPS UP into the giant line "GREEN = / YOUR CHECKS PASSED" (Anton 96 px, two lines, ≈ 730 px wide, yellow: the same words, so no duplicate stays on screen); on "write" a small pencil glyph ROUTES onto the test row; on "review" a yellow marker SWEEPS `sends reset email`; on "yourself" the pencil underlines it | catch · only · passed · write · review · yourself | [540, 840, 1.3] on "catch" (the row is the actor), home on "passed" (the verdict needs the full width) | whoosh (catch) · key (only) · stamp (passed) · pop (write) · tick (review) · tick (yourself) | marker-highlight |
| s18 recap | A map before. A check after. Every mistake, a new rule. | yellow | WIPE to yellow; recap chain BUILDS one link per sentence: on "map" "MAP BEFORE" (doc icon), on "check" "CHECK AFTER" (green test row), on "mistake" the red mistake chip DROPS on the third link and on "rule" it turns into "NEW RULE" (+ line); the mini task card with its earned DONE ✓ rides along the chain to the last link | map · check · mistake · rule | no cam | whoosh (wipe) · pop (map) · pop (check) · tick (mistake) · pop (rule) | |
| s19 CTA | What should I explain next? Tell me below. | dark | WIPE to navy; the question BUILDS WORD BY WORD from "What" to "next" (Anton 140 px, two lines, x 90–930); on "below" the "Follow for more AI breakdowns" pill SLIDES UP; the last frame holds the mini DONE ✓ card top-centre (loops into frame 0's card) | What · next · below | no cam | whoosh (wipe) · pop (What) · pop (next) · pop (below) | |

_Continuous spans: s05–s13 is one stage (the workbench never cuts; only slots fill and the test row changes state); s14–s15 one comparison stage (the task card docked top-left, the workbench split in two); s16–s17 one stage (the right copy grows back into the workbench). Section wipes are the only cuts; the running object survives each one (it SHRINKS, DOCKS or GROWS back, never rebuilt)._

## Build briefs (one per step; each can be built in parallel)
### Hook → failure · s01–s04 (~18 s)
_Briefs follow the beat rows above (visual-plan fixes 2026-10-28); where a brief and a row differ, the row wins. Layout: everything x 60–950, nothing below y 1460._
Frame 0 on light exactly as "First frame" above; the stamp settles 0–0.4 s and the ✗ pulses at 0.6 s. s01: stamp thumps on "Done"; ✗ pulses on "test"; red row shakes on "isn't"; a dashed pill slot draws under the row on "fix"; navy MODEL pill slides up into it on "smarter" with a "+ smarter?" chip that greys out on "model". s02: wipe to navy; card shrinks to y 310–570; stamp, red row and MODEL pill lift off (the pill returns in s05); title retypes on "task"; "illustrative" tag pops on "password-reset". s03: caret drops on "agent"; four illustrative code lines type out on "writes"; scan line on "re-reads" (cam [510,440,1.3]); "looks fine" chip on "fine"; DONE stamps back on "stops", cam home, grey test row slides in with `not run`. s04: push-in [525,1100,1.3] on "test"; `not run` flashes on "Never"; "NEVER RAN." (Anton 110 px) stamps yellow on "ran". Exit: navy, card with DONE at the top, grey row at y 1040–1160.
### Concept · s05–s06 (~13 s)
Entry: as s04 left it, wipe to blue, cam home; NEVER RAN shrinks into the `not run` chip. MODEL pill slides back to (505, 790). The equation builds on the diagram: "AGENT =" legend types on the outline zone's top-left on "Agent"; a ring pulses round the pill on "model" (the pill never changes); the outline (x 60–950, y 620–940) draws in one stroke and "+ HARNESS" types on its top-right on "harness". s06: a dash runs round the outline on "everything"; left slot lights "BEFORE" on "reads", arrow slot → pill on "first"; right slot lights "AFTER" on "checks", arrow pill → slot on "after". Exit: the full workbench (card top, model + outline + two empty slots, grey row bottom).
### Guides (s07–s08, ~13 s)
Entry: workbench, wipe to yellow, section card "GUIDES" (kicker "BEFORE", no numeral) ~1 s, workbench back on "guides"; no step counter. Doc icon (tagged illustrative) fills the left slot on "file" (cam [340,790,1.6]); BEFORE arrow routes doc → pill on "reads"; "AGENTS" types on "agents", ".md" on "dot". s08: three heading lines appear on "map"; a 40-page ghost stack slides behind on "manual" and shrinks away; `+ Run tests` / `before "done"` types out on "line" (mono 26 px); a yellow marker sweeps it on "before"; cam home on "done". Exit: guide slot filled, rest unchanged.
### Checks + the loop (s09–s13, ~27 s)
Entry: as the guides section left it. s09: the new line pulses and a dashed connector draws toward the test row on "nobody"; a "?" pops at its empty end on "rule"; wipe to light on "Second"; section card "CHECKS" (kicker "AFTER", no numeral) on "checks"; no step counter. s10: generic mono box (tagged illustrative) snaps into the right slot on "hook" (cam [720,790,1.5]); `hook ›` / `run tests` types on "command"; ▶ pops on "tool", spins on "own"; connector hook → test chip draws on "test"; two ghost DONE stamps flicker and pulse down it on "every"; on "done" the DONE stamp thumps, a pulse routes stamp → hook, the row scans (cam home). s11: row fills red on "Red"; DONE fades to an outline (no lock, no "blocked"); error chip types in the callout band (y 1180–1300) on "error", hint line on "hint"; chip routes up the connector and along the loop arc on "back" and enters the pill on "agent" (a ring pulses round it). s12: one code line retypes on "fixes"; ▶ spins and the row scans on "re-runs"; row fills green on "Green" (cam [525,1100,1.3]). s13: cam home on "Now"; ✓ bounces on "passes"; DONE ✓ stamps solid on "Done"; outline glows green once on "means". Lock: MODEL never changes colour, size or label.
### Proof · s14–s15 (~17 s)
Navy wipe on "Does"; the task card docks as a mini ✓ card top-left (x 90–420, y 230–300). On "matter" the workbench splits into two identical copies (x 60–480 and 520–940, y 380–760), both the same MODEL inside the same thin old outline (before is a harness too, not a bare model). "LangChain" types above (plain text, no logo) on "LangChain", "· agent framework" on "framework"; a ring pulses round both pills and "SAME MODEL" stamps across the pair on "same"; the right copy's thin outline lifts off on "changed" and a thicker outline with both slots filled draws on "harness". s15: label shrinks away and BEFORE / AFTER legends type on "They"; left copy brightens on "used"; "52.8%" (Anton 170 px) counts up from "fifty-two", lands on "percent"; "tasks solved" on "tasks"; "66.5%" (Anton 200 px, yellow) counts up from "Sixty-six" (cam [660,1000,1.3]), lands on "five"; "their own run" chip stamps on "own"; cam home on "measured". Numbers hidden until their words, then held to the section's end.
### Habit → catch → recap → CTA · s16–s19 (~24 s)
Blue: the left copy shrinks away, the right copy grows back into the small workbench with the mini card on top; a red `✗ wrong command` chip drops on "mistake", splits into a new AGENTS.md line `+ use npm test` (guide slot) on "rule" and a second test line `+ check: npm test` (check slot) on "check"; outline thickens on "pass". s17: green row slides centre on "catch" (cam [540,840,1.3]); "= your checks passed" types on "only"; on "passed" cam home and the label stamps up into "GREEN = / YOUR CHECKS PASSED" (Anton 96 px, two lines); pencil routes onto the row on "write", marker sweeps the test name on "review", pencil underlines it on "yourself". s18: yellow recap chain MAP BEFORE → CHECK AFTER → NEW RULE builds on "map", "check", "mistake"/"rule" with the mini card riding along. s19: navy CTA builds word by word, follow pill on "below", mini DONE ✓ card top-centre for the loop.

## Approval
- [x] Visual plan passed (2026-10-28)
- [x] Structure check passed (2026-10-29)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-29 · the owner approved the script and said "continue on autopilot to the end: no more approvals"; defaults used without stopping: hook direction A (the approved hook's first frame), all beats as planned after the visual-plan fixes (the owner can still pick B or C before `/video-studio`)

## Visual plan check · 2026-10-28

_Plan mode, run by the `visual-plan` agent. Inputs: content-plan.md, art-direction.md, hooks.md, script-reel.md (script review PASS 2026-10-28), brief.md, reference-flat design.md, pace.json (2.3 w/s · 2.5 s · 6 s), ig-reels.md targets. Concept archetype, so rule 11 needs no replica; rule 10 does not apply in plan mode. The first pass found 14 blocking items. The launching session asked for them to be fixed in this file, so the rows, layout, first frame and build briefs above were rewritten in place, and the revised plan was then re-checked. Linter after the fixes: every animation-plan and first-frame check passes (19 rows, a verb per row, every cue spoken, 0 none-rows, running object 18/19 rows)._

**Verdict: PASS** (after the in-place fixes; the first pass was CHANGES)
depth: 4/4 shown · running object: 95 % of beats named, 74 % transformed (the rest transform the harness built around it) · none-rows: 0 · still: 6.6 % (longest hold 1.3 s; first pass 12 %, longest 3.0 s) · cam: 14 moves ≈ 7.6/min · hook: self 20 / blind 19

### Depth mapping
| Depth point (content-plan.md) | Row(s) | What moves |
|---|---|---|
| The broken loop: write → re-read → DONE ✓ → stop, the test visibly never run | s03, s04 | code TYPES OUT, a scan line SCANS it, "looks fine" POPS, DONE STAMPS, the grey `not run` row slides in; PUSH IN, the chip FLASHES, "NEVER RAN." STAMPS |
| Same model in the centre; a guide lights before, a check after; "Agent = Model + Harness" assembles from them | s05, s06, s07, s10 | "AGENT =" / ring on MODEL / outline DRAWS + "+ HARNESS" build the equation on the diagram itself; BEFORE / AFTER slots LIGHT with arrows ROUTING in and out of the pill; the doc FILLS the guide slot, the hook SNAPS into the check slot |
| The loop closing: hook fires, red, the error travels back into the agent, edit, re-run, green; only then is DONE earned | s10–s13 | the pulse ROUTES stamp → hook, the row SCANS, FILLS red; error + hint TYPE OUT and ROUTE along the loop arc into the pill; a code line RETYPES, the row re-SCANS and FILLS green; DONE ✓ STAMPS solid (the s01 frame replayed) |
| The harness grows by one line/check; "52.8 % → 66.5 %" labelled "same model · LangChain's own run" | s14–s16 | two identical MODEL copies, "SAME MODEL" STAMPS, only the right harness is redrawn; 52.8 % and 66.5 % COUNT UP on their words, "their own run" STAMPS; a mistake chip SPLITS into a new AGENTS.md line + a new check, the outline GROWS |
| (plan point 3, second half) rules alone are never verified | s09 | a connector from the new rule DRAWS toward the test row and its "?" end stays EMPTY |

### Hook re-score (blind, from the line and the first-frame description only)
| Axis | Self | Blind | Note |
|---|---|---|---|
| Clarity | 5 | 5 | DONE vs failing reads on mute |
| Curiosity | 5 | 4 | "might not be a smarter model" opens the loop, but the softened "might" and no hint of *what* the fix is cost a point |
| Accuracy | 5 | 5 | an illustrative scenario of the documented failure; "might not" is the plan's safe wording |
| First-frame visual | 5 | 5 | concrete, filled, carries the claim |
| **Total** | **20** | **19** | gap 1 < 3: no finding |

### Blocking findings (first pass) and the fix applied
- s01 first second: "frame 0 … on "Done" the stamp THUMPS": nothing moved until "Done" at ~1.7 s (target: moving before 1.0 s). Fix: the stamp settles 0–0.4 s and the ✗ pulses at 0.6 s from frame 0.
- s01 rule 7: "isn't" → "smarter" was 7 words (≈ 3.0 s) on a still (> 2.5 s). Fix: ✗ PULSES on "test", a dashed pill slot DRAWS on "fix".
- layout rule 8: outline x 60–1020, card and test row to x 990, check slot x 750–990 and the ✓/✗ chip "at the right" all sat in the right 12 % (x > 950); the counter at y 120–200 sat above the stage zone (y 220). Fix: everything x 60–950, counter y 230–290, pill at (505, 790), cam centres kept inside the stage.
- s04 rule 5: "NEVER RAN." in Anton 160 px at cam 1.6 is ≈ 1070 px on screen (wider than the frame), and the 1.6 zoom cropped the row's chip. Fix: Anton 110 px, cam [525, 1100, 1.3].
- s05 rule 5: the equation in Anton 110 px "above the outline" had an 80 px gap (card to y 520, outline from y 600), so it collided with the card. Fix: the equation builds on the diagram ("AGENT =" legend, ring on the pill, "+ HARNESS" legend). This also makes depth point 2 "assemble from them".
- s08 rule 5: `+ Run the tests before you say done.` is 7 words (> 6), about 730 px of mono in a 240 px slot. Fix: `+ Run tests` / `before "done"` (4 words, 2 lines, mono 26 px) plus a marker on "before".
- s10 rule 7: "command" → "own" (7 words ≈ 3.0 s) and "own" → "done" (9 words ≈ 3.9 s) held still. Fix: text TYPES on "command", ▶ on "tool", a connector DRAWS on "test", ghost stamps pulse on "every".
- s14 rule 3: "left a bare `MODEL` pill, right the same `MODEL` pill inside the outline" showed "no harness → harness", but LangChain changed its harness, it didn't add one (claim safety: "changed only the harness around it"). Fix: both copies start in the same thin old outline; the right one's lifts off on "changed" and a new one draws on "harness".
- s14/s15 rule 9 (lock "MODEL never changes … size"): "the pill pulses" / "both pills PULSE". Fix: a ring pulses *around* the pill.
- s14 → s15 still: "harness" → "fifty-two" held 7 words (≈ 3.0 s > 1.5 s), and the whole plan was ≈ 12 % still (> 10 %). Fix: BEFORE / AFTER legends on "They", the left copy brightens on "used"; s14 gained "framework" and "changed" cues.
- s15 rule 5: "52.8%" and "66.5%" side by side in Anton 260 px are ≈ 2 × 550 px, wider than the frame. Fix: 170 px (left) and 200 px (right, the headline), with positions, all inside x 950.
- s17 rule 5 / 7: "GREEN = YOUR CHECKS PASSED" in Anton 120 px on one line is ≈ 1300 px, under a 1.3 zoom, and it repeated the "= your checks passed" label. The 7 words "passed" → "yourself" (≈ 3.0 s) also held still. Fix: cam home on "passed"; the label STAMPS UP into a two-line Anton 96 px verdict; pencil on "write", marker on "review".
- sound target: several reveals had no cue (s01 pill, s03 chip and row, s11 error and hint, s16 the second fill, …). Fix: every row now names one sfx per reveal, ≥ 0.35 s apart.
- rule 9 (lock: AGENTS.md and the hook are labelled "illustrative"): the doc and the hook box had no tag. Fix: a tiny "illustrative" tag on both.
- object survives (s14 → s16): the card vanished in the proof and the workbench "returned" with no stated path back. Fix: the card DOCKS top-left through s14–s15; the right copy GROWS back into the workbench in s16.

### Still open (improve, not blocking)
- s07 "M" cue: if the voice alignment merges "M D" into one token, `payoffs` won't find "M". At build time, key ".md" to "dot" or "D" instead (both are spoken).
- art-direction.md motion language still says "SHRINKS AWAY (the workbench to a corner chip for the habit)". The plan now docks the *card* in s14 and grows the workbench back in s16, so update that line when the art direction is next touched. This agent edits only this file.
- hooks.md candidate #4 "Stop blaming the model" is an unsafe wording, but it appears only as a rejected option marked "overstates", so it is not a shipped line. Keep it out of the publish kit.
- Giant type outside the hook, verdict and number: the section numerals (330 px) and the CTA question (140 px). Both are house-style elements in design.md, so they are acceptable; everything else is ≤ 58 px.
- Runtime ~111 s is still waiting on the owner's acceptance (script review). This is not a visual item.
- Locks grepped across brief, hooks, script, script-review, content plan, art direction and this plan: every hit is in a "never" / "no" context. There is no storyboard or publish kit yet, so re-grep both at the storyboard gate.

## Structure check · 2026-10-29

_Run by the `structure-check` agent. Inputs: brief.md (archetype Concept), script-reel.md (19 beats), this plan, art-direction.md, the Concept archetype sheet and README. There is no storyboard and no studio project yet. Structure only: facts and script wording were not touched._

**Verdict: CHANGES** (the fixes below were applied in place in this file; re-run this gate to tick the box)
archetype: Concept · steps justified: no · why: guides (before) and checks (after) are two independent halves of the harness. The hook check works whether or not AGENTS.md exists, and the habit (s16) treats them as either/or ("a rule … or a check"), so they are not ordered stages where step 2 depends on step 1.

Swap test: the guides and checks sections could swap with only the s09 bridge line reworded, so they are not steps. The spoken "First … Second" is a two-item enumeration in the script, which is fine, and plain titles without numbers don't contradict it.

### Findings and fixes
- header line 6 "**Steps:** 01 Guides · 02 Checks (… numbered)" → replaced with "**Sections:** Guides (before) · Checks (after)"
- Fixed layout: **step counter** "01 / 02" (x 90–330, y 230–290), lit s07–s13 → removed. The band stays empty, and the colour change plus the slot filling carry progress.
- s07 section card "01 GUIDES" (330 px numeral) and the counter "01 / 02" lighting → replaced with "GUIDES" plus a small "BEFORE" kicker, no numeral and no counter
- s09 section card "02 CHECKS" and the counter "02 / 02" lighting → replaced with "CHECKS" plus a small "AFTER" kicker, no numeral and no counter
- row ids "s07/s08 step 01", "s09/s10 step 02" and the build-brief headings "Step 01 · Guides" / "Step 02 · Checks + the loop" → renamed "guides" / "checks" (internal labels, changed so a builder doesn't put the numbers back)
- s18 recap chain MAP BEFORE → CHECK AFTER → NEW RULE → keep. It summarises what the video actually showed (the map in s07–s08, the check in s10–s13, the habit in s16), and it carries no numbers and no "of n".
- s06 BEFORE / AFTER slots → keep (these are real timing, relative to when the agent acts). The new section-card kickers reuse those words, so the cards, slots and recap share one vocabulary.

### Outside this file (not edited; this agent edits only animation-plan.md)
- art-direction.md line 23 "**Steps:** 01 Guides · 02 Checks" and line 37 "01 Guides `yellow` → 02 Checks `light`" → replace with "**Sections:** Guides (before) · Checks (after)" and "Guides `yellow` → Checks `light`"
- art-direction.md line 13 cites the tokenization reference's "numbered section cards". That device is earned there (an ordered mechanism) but not here, so add "(numbers only for ordered stages)".
- The visual-plan record above (line 93 "counter y 230–290", line 111 "section numerals (330 px)") is that gate's dated history. It is superseded by these fixes, and the rows above win.

## Structure check · 2026-10-29 (re-run)

_Run again by the `structure-check` agent after the first pass's fixes. Inputs: brief.md (archetype Concept), script-reel.md, this plan, art-direction.md. There is still no storyboard and no studio project. Structure only._

**Verdict: CHANGES** (one item left, outside this file)
archetype: Concept · steps justified: no · why: guides and checks are two independent halves of the harness, not ordered stages, so no numerals and no counter. The plan and the art direction are now clean, but the script's on-screen text column still asks for numbered cards.

### Findings
- this plan, header line 6 "**Sections:** Guides (before) · Checks (after)" → keep (fixed)
- this plan, fixed layout: the step counter is gone and the band y 230–290 stays empty → keep (fixed)
- this plan s07 / s09 section cards "GUIDES" / "CHECKS" with BEFORE / AFTER kickers, no numeral → keep (fixed)
- this plan s18 recap chain MAP BEFORE → CHECK AFTER → NEW RULE → keep (it summarises what the video showed, with no numbers)
- spoken "First … Second" (s07, s09) → keep (a two-item enumeration in the script, and plain titles don't contradict it)
- art-direction.md line 13 "section cards (numbered only for ordered stages)" and line 23 "**Sections:** Guides (before) · Checks (after) … no numerals" → keep (fixed)
- **script-reel.md line 16 (beat 7), On-screen text "01 GUIDES · AGENTS.md"** → replace with "GUIDES · AGENTS.md"
- **script-reel.md line 18 (beat 9), On-screen text "02 CHECKS"** → replace with "CHECKS"

These two cells are the on-screen text the storyboard copies from, so if they stay, the numerals come back at the storyboard step. The fix touches only the on-screen text column, not the spoken lines. This agent edits only this file, so the scripter session has to make the change and then re-run this gate to tick the box.

## Structure check · 2026-10-29 (second re-run)

_Run by the `structure-check` agent after the scripter fixed the last two on-screen cells. Inputs: brief.md (archetype Concept), script-reel.md, this plan, art-direction.md. There is still no storyboard and no studio project. This check covers structure only._

**Verdict: PASS**
archetype: Concept · steps justified: no · why: guides and checks are two independent halves of the harness, not ordered stages. Every surface now uses plain section titles (GUIDES / CHECKS with BEFORE / AFTER kickers): no numerals, no "of n", no counter.

### Findings
- script-reel.md line 16 (beat 7), on-screen text "GUIDES · AGENTS.md" → keep (fixed)
- script-reel.md line 18 (beat 9), on-screen text "CHECKS" → keep (fixed)
- script-reel.md beat-column labels "Mechanism 1 / 2" and the line 6 note "Two mechanism steps" → keep. These are internal archetype-sheet labels that never appear on screen.
- spoken "First … Second" (s07, s09) → keep. The script counts two items, and the plain titles don't contradict that.
- this plan, header line 6, fixed layout (no counter, band y 230–290 empty), s07 / s09 section cards with no numeral, and the build briefs (Guides / Checks + the loop, "no step counter") → keep
- this plan s07 ".md" cue on "dot" (row, sfx `key (dot)`, build brief) → keep. This is a timing fix, not a structural device.
- this plan s18 recap chain MAP BEFORE → CHECK AFTER → NEW RULE → keep. It summarises what the video showed, with no numbers.
- art-direction.md lines 13, 23 and 37 → keep. They describe sections with no numerals.

At the storyboard and studio steps, grep `storyboard-reel.md`, `scenes.json` and the stage for "01", "02", "STEP", "of 2" and any counter or progress bar. None should come back.

## Visual plan check · 2026-10-29 (storyboard mode)

_Storyboard mode, run by the `visual-plan` agent on storyboard-reel.md against this plan (rules 10, 5, 8, 9). Concept archetype, so rule 11 needs no replica. Linter: every storyboard-overlay, animation-plan and first-frame check passes. The only ✗ items are later-stage files (publish.md, qa.md, package.md)._

**Verdict: PASS**
depth: 4/4 shown · running object: 18/19 rows (95 %) · none-rows: 0 · still: 6.6 % (longest hold 1.3 s) · cam: 14 moves ≈ 7.6/min · hook: self 20 / blind 19

### Rule 10: row-for-row match
All 19 rows match. The section/colour sequence is identical (light · dark ×3 · blue ×2 · yellow ×2 · light ×5 · dark ×2 · blue ×2 · yellow · dark). Every cue word in the plan is in the storyboard row with the same verb on the same object (s01 6/6, s02 2/2, s03 5/5, s04 3/3, s05 3/3, s06 5/5, s07 5/5, s08 5/5, s09 4/4, s10 7/7, s11 5/5, s12 3/3, s13 4/4, s14 7/7, s15 9/9, s16 4/4, s17 6/6, s18 4/4, s19 3/3). Camera moves are the same 14, on the same words. Continuous spans are listed (A–G), and they include the plan's three spans: s05–s13, s14–s15 and s16–s17.

### Depth mapping (unchanged from the plan check; the storyboard carries every moving part)
| Depth point | Storyboard row(s) | What moves |
|---|---|---|
| Broken loop, test never run | 3, 4 | code TYPES OUT, SCANS, DONE STAMPS, grey `not run` row SLIDES IN; PUSH IN, chip FLASHES, NEVER RAN. STAMPS |
| Same model; guide before, check after; equation assembles | 5, 6, 7, 10 | AGENT = / ring / outline DRAWS + "+ HARNESS"; BEFORE / AFTER slots LIGHT, arrows ROUTE; doc FILLS, hook SNAPS |
| Loop closes, DONE earned | 10–13 | pulse ROUTES, row SCANS, FILLS red, error ROUTES into the pill, line RETYPES, FILLS green, DONE ✓ STAMPS |
| Harness grows; 52.8 → 66.5, same model, their own run | 14–16 | SAME MODEL STAMPS, the right outline is redrawn, both numbers COUNT UP and are held, "their own run" STAMPS, the mistake chip SPLITS into a rule + a check |

### Overlays (rule 5), safe zones (rule 8), locks (rule 9)
- Overlays: the most words on screen at once is s15, at 9 (52.8% · 66.5% · tasks solved · their own run · SAME MODEL), within the 12-word limit. No element is longer than 6 words.
- Safe zones: every coordinate in the storyboard is inside x 60–950 and above y 1460. The captions are the engine's.
- Locks and unsafe wordings, grepped across brief, hooks, script, storyboard, this plan, art direction and content plan: every hit is in a "no" / "never" / "unsafe" context. hooks.md #4 "Stop blaming the model" is a rejected candidate. There is no publish kit yet, so grep it at the publish step.
- Structure re-grep: "01", "02", "STEP", "of 2" and "progress bar" are absent from the storyboard. "counter" appears only as "no step counter".

### Fixes applied to storyboard-reel.md (improve-level drift, not blocking; applied at the launching session's request)
- row 12, overlay "✓ passing" → "✓" (the plan's chip has no "passing" text)
- row 14: added the dock position "(x 90–420, y 230–300, staying through s15)" from the plan
- row 15: added "and the right dims" on "used"; added "both numbers, SAME MODEL and the chip stay on screen to the section's end" (the numbers-persist target); overlay "52.8% → 66.5% · …" → "52.8% · 66.5% · tasks solved · their own run" (the plan draws no arrow; the held SAME MODEL is written in the visual column, so it isn't repeated in the overlay cell, which the linter counts by token)
- row 16, overlay "+ rule · + check" → "+ use npm test · + check: npm test" (the plan's actual element text)
- footer lock line "MODEL unchanged s05–s16" → "s05–s15 (s16 scales the whole workbench to 0.7, outside the lock)". The old line claimed a lock that s16 breaks.

### Still open (improve)
- Continuous span C says the wipes at s07 / s09 "change only the background", but the ~1 s GUIDES / CHECKS section cards do cover the workbench briefly. The plan says the same, so at build time make the section card an overlay over the dimmed workbench rather than a full replacement.

## Visual plan check · 2026-10-29 (scenes mode)

_Scenes mode, run by the `visual-plan` agent on `studio/projects/harness-reel/scenes.json` and `stage/{stage.html,stage.css,stage.js}` against this plan (rules 10, 8, 9; the measured targets re-estimated from the stage). Plan row 15 is built as scenes s15 + s16 (both `"beat": 15`), so scenes s17–s20 are plan rows s16–s19. Before the fixes, the linter passed 44/44 and `validate` passed with 0 errors. The blocking items below were fixed in place in the studio files, at the launching session's request. After the fixes `validate` passes again: 20 scenes, 243 words ≈ 106 s, 0 errors. No voice yet, so the still-time figure is an estimate; measure it at `payoffs` / `watch`._

**Verdict: PASS** (after the in-place fixes; the first pass was CHANGES)
depth: 4/4 shown · running object: 18/19 rows (on screen s01–s13, docked s14–s16, regrown s17–s18, riding the s19 recap) · none-rows: 0 · still: ≈ 7 % est. (longest ≈ 1.3 s) · cam: 12 moves / 106 s ≈ 6.8/min (10 before the fix ≈ 5.7/min, under the 6/min target) · hook: self 20 / blind 19

### Rule 10: scenes against plan rows (after the fixes)
| Plan row | Scene(s) | Beats / cues (need ≥ cues − 1) | Words not in the cue cell | data-beat or check none |
|---|---|---|---|---|
| s01 | s01 | 6/6 | – | all |
| s02 | s02 | 2/2 | `password` (prefix of the cue `password-reset`; see improve) | all |
| s03 | s03 | 6/5 | – | all |
| s04 | s04 | 3/3 | – | all |
| s05 | s05 | 4/3 | – | all |
| s06 | s06 | 5/5 | – | all |
| s07 | s07 | 5/5 | – | all |
| s08 | s08 | 5/5 | – | all (`done` = check none, cam home) |
| s09 | s09 | 4/4 | – | all |
| s10 | s10 | 7/7 | – | all |
| s11 | s11 | 5/5 | – | all |
| s12 | s12 | 3/3 | – | all |
| s13 | s13 | 4/4 (was 3) | – | all |
| s14 | s14 | 7/7 | – | all |
| s15 | s15 + s16 | 9/9 (was 7/9: `percent`, `five` missing, under the 8 needed) | – | all (`measured` = check none) |
| s16 | s17 | 4/4 | – (was `habit`, not a cue) | all |
| s17 | s18 | 6/6 | – | all |
| s18 | s19 | 4/4 | – | all |
| s19 | s20 | 3/3 | – | all |

### Deliberate deviations (judged)
- **No cam on s04 / s12: accepted.** The test row is 840 px wide. Any zoom that keeps it inside x 60–950 on screen needs 840 z ≤ 890, so z ≤ 1.06. The plan's [525, 1100, 1.3] maps the row to x 15–1107. s04 keeps a change on every cue (row pulse 1.04 → chip flash → NEVER RAN stamp). s12 Green keeps its fill and the ✓ pop. Side effects, both fixed below: the camera rate fell under target, and plan s13's "home on Now" disappeared, which left a ≈ 1.9 s hold.
- **s18 zoom 1.15: accepted.** The row is scaled 0.85 (714 px) at centre 510, so on screen it spans x 129–951 and the chip ends at 940. "= your checks passed" maps to x 258–810.
- **s09 wipe at the scene start: accepted.** The engine changes the section per scene. The title landing on "Second" left plan cue "checks" pulsing the check slot *under* the opaque CHECKS panel, an invisible beat; fixed below.
- **Cam centres s03 [400, 470, 1.3] and s07 [210, 790, 1.6]: accepted, with s03's chip moved (below).** The camera maps a stage point to (540, 840). At s03 the code lines (x 116–656) land at screen x 171–873, and at s07 the guide slot (x 80–340) lands at x 332–748, both better framed than the plan's centres. These centres fall outside the plan's stated clamp (x from 1080 ÷ 2z to 1080 − 1080 ÷ 2z; s03 is also above the vertical clamp), but the section background is drawn on track 0, outside `#cam`, so no off-stage edge shows. Not on the launcher's list, but checked the same way: s10 [800, 790, 1.5] (plan 720; the hook slot lands at x 345–735) and s16 [700, 1000, 1.3] (plan 660; 66.5% lands at x 271–848). Both are accepted.
- **GUIDES / CHECKS panels: no numerals, no counter, no "of 2", no progress bar** (grepped in the stage and scenes.json).

### Blocking findings (first pass) and the fix applied
- s09 (scenes.json) 10: `"word": "checks", "nth": 2`. `nth` is 0-based (`word_time` returns `hits[nth]`) and "checks" is spoken twice, so assemble would stop the build. → `"nth": 1`.
- s09 1 / 10: "checks" target `cslot` pulsed under the opaque CHECKS panel (`.h-sect` is full-zone #EEF1F6, drawn above the workbench), so nothing showed on the word. → The panel and its AFTER kicker land on "Second", and the title `#h-tct` "CHECKS" SLAMS on "checks" (`s09/tct`, reveal, pop). That is the plan's "section card CHECKS on checks". The `s09/cslot` data-beat and its pulse were removed.
- s15 + s16 10 / numbers persist: 7 beats for the plan row's 9 cues (need ≥ 8), and neither number landed on its word (fixed 1.3 s / 1.2 s counts). → New beats `percent` (`s15/n1l`, motion, ding) and `five` (`s16/n2l`, motion, ding). Each count now runs from its first word to its landing word and pulses 1.08 on landing. The first words now use the plan's sound: `fifty-two` and `Sixty-six` changed from ding to tick.
- s16 8 / 5: "66.5%" in Anton 190 px is 526 px wide (measured with the project's Anton.ttf) in a 420 px box centred at 730, so it spanned x 467–993. That is over 950 and 38 px into "52.8%" (170 px = 470 wide, x 35–505). → `.h-n1` 130 px (360 wide, x 90–450, top 945) and `.h-n2` 160 px in a box from x 490, 450 wide (443 wide, x 494–937). The headline number stays the larger of the two.
- s03 8: the "looks fine" chip at x 600–848 landed at screen x 800–1122 under the s03 cam [400, 470, 1.3], which is under the button column and partly off frame, on its own cue word. → `.h-fine` left 330 (screen x 449–771 zoomed, x 330–578 at home).
- camera target: 10 moves in 106 s ≈ 5.7/min, under 6–10/min. → s15 adds `cam [270, 900, 1.3]` on "fifty-two" (reveal: 52.8% lands; it maps to screen x 306–774, with the left copy above it) and home on "tasks" ("tasks solved" spans both copies). s16 then pushes in on "Sixty-six" as before. Total 12 moves ≈ 6.8/min.
- s13 still: with no s12 cam, nothing changed from the end of the Green fill to "passes" (≈ 1.9 s > 1.5 s). → New beat `Now` (`s13/now`, motion): the test row pulses 1.03 on the plan's cue.
- s17 10: the beat word `habit` is not in plan row s16's cue cell (mistake · rule · check · pass). → The beat was removed. The scene-entry grow is keyed to `S.s17 + 0.15` (`tWb` in stage.js), and the `s17/wb` data-beat was removed. The scene keeps 4/4 beats.
- frame 0 / rule 6 (hardening): `.h-slot` had no `opacity: 0`, so the two dashed slots were hidden at frame 0 only by s06's `fromTo` immediate render, and theme(0, 'light') had already given them a dark border at y 670–910 behind the hook row. → `.h-slot { opacity: 0 }`; s06's pop still reveals them.

### Rules 8 and 9 on the stage files
- Safe zones: every element measured (Anton / Inter / JetBrains Mono from the project fonts) sits inside x 60–950 and above y 1460. Exceptions are the section panels' and the full-width boxes' background, which is section colour, not content; `.h-sect` ends at y 1460 exactly. The widest texts: the CTA lines 813 / 806 px from x 72 (to 885); the follow pill 668 + 104 px from x 72 (to 844); "YOUR CHECKS PASSED" 760 px (x 125–885); "GUIDES" / "CHECKS" 587 / 642 px centred. Under each cam, the actor stays inside screen x 60–950 and above 1460 (s10's row bottom maps to y 1395; s16's chip to y 1192).
- Locks: no logo ("LangChain" is plain text); no lock, padlock or "blocked" in s10–s13 (the stamp fades to 0.25 opacity); no "correct", "bug-free", "guaranteed" or "proven". Scene `"source"` fields never render (`source_html` returns ""). The MODEL pill changes only its entry `y` and opacity, and the ring pulses around it. 52.8% and 66.5% have opacity 0 until `count` starts on their words. Unsafe wordings grepped across brief, hooks, script, storyboard, this plan, publish.md, package.md, scenes.json and the stage: hits only in "no" / "never" / "unsafe" contexts, plus hooks.md #4 "Stop blaming the model" (a rejected candidate, not shipped).

### Depth mapping (scenes)
| Depth point | Scene(s) | What moves |
|---|---|---|
| Broken loop, test never run | s03, s04 | code TYPES (`s03/code`), scan SCANS (`s03/scan`, cam in), DONE STAMPS + grey row slides in (`s03/stops`, `s03/row`); chip FLASHES, NEVER RAN STAMPS |
| Same model; guide before, check after; equation assembles | s05, s06, s07, s10 | AGENT = / ring / outline DRAWS + "+ HARNESS"; slots LIGHT, arrows ROUTE; doc FILLS (cam in), hook SNAPS (cam in) |
| Loop closes, DONE earned | s10–s13 | stamp thump → row SCANS; FILLS red; error + hint TYPE; dot ROUTES along the loop into the pill; line RETYPES; FILLS green; DONE STAMPS solid |
| Harness grows; 52.8 → 66.5, same model, their own run | s14–s17 | SAME MODEL STAMPS; the right outline is redrawn; 52.8% COUNTS UP to "percent" (cam in), 66.5% to "five" (cam in), held; "their own run" STAMPS; a mistake chip SPLITS into a rule + a check |

### Still open (improve)
- s02 rule 4: beat word `password` vs cue `password-reset`. `word_time` falls back to a prefix match, so it lands on the same spoken token whether the alignment keeps or splits the hyphen. Keep it; if `validate` / voice shows `password-reset` as one token, exact spelling is optional.
- Hyphenated beat words (`re-reads`, `re-runs`, `fifty-two`, `Sixty-six`) assume the alignment keeps the hyphen. If voice splits them, assemble stops with a clear message: key them to the first half.
- s03 cam: the card's right edge and its "illustrative" tag (x ≈ 760–908) sit at screen x ≈ 994–1186 during the 1–2 s zoom. The actor (the code) is clear, so this is acceptable, but check it on the watch sheet.
- s07 / s09 section panels are full opaque replacements of the workbench for ~1 s (the open storyboard-mode item). A dimmed overlay would keep the object on screen; this is a style choice, not a gate.
- Type size: the recap link labels are Anton 96 px ×3. design.md doesn't specify a recap-chain size, so this is the house-style recap; everything else outside hook / verdict / number / section titles is ≤ 58 px.
- Still time is estimated from the plan cadence because there is no voice yet. Re-measure it at `payoffs` / `watch` against ≤ 10 % and a longest hold ≤ 1.5 s.
