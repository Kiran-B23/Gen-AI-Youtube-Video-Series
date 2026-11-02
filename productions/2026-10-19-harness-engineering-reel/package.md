# Package · Harness Engineering (reel)

---

_For the editor: brief, chosen hook, script, storyboard and publish kit in one file. Built 2026-10-29. Gates: content plan READY (owner-approved) · script review PASS · Goldfish run 4 · visual plan PASS (plan + storyboard) · structure check PASS · lint green. Next step: `/video-studio productions/2026-10-19-harness-engineering-reel`._

---

## Brief · Harness Engineering

| | |
|---|---|
| Topic | **Harness engineering**: designing everything around an AI model (instructions, tools, checks, feedback loops) so a coding agent does reliable work. Named in Feb 2026 (Hashimoto, OpenAI, Böckeler/Fowler, LangChain) [S1–S6] |
| Format(s) | reel (9:16, faceless) · the owner asked for a reel |
| Viewer | global tech audience · level: curious practitioner (default; uses or has tried a coding agent such as Claude Code, Codex or Cursor; has seen "harness" in their feed but can't say what it is) |
| **Viewer's question** | "What is harness engineering, and what would I actually do differently with my coding agent?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" + a mechanism; definition topic; not Tutorial: no imperative "build a harness"; not Trend: "prompt engineering is dead" framing is hype, not the viewer's question) → **confirmed after YouTube analysis: Concept** (standard "how X works" sheet). 3 of 3 winning Shorts and 2 of 3 long winners are Concept; the gap (no example, no proof, no guide/check split, no habit) is a mechanism gap, which the standard sheet's mechanism beats fill and the 45 s definition variant can't (inspiration.md) |
| **Tone (voice style)** | Curious and delighted, like revealing a trick a senior engineer uses: brisk on the loop, slow on the reveal "same model", plain and practical on the takeaway. |
| Must include | (provisional; the content plan decides) a one-line definition by what it does; agent = model + harness; the two halves (guides before the agent acts, checks after); the loop (check fails → agent fixes → passes); the habit "every mistake becomes a rule or a check"; one striking, sourced proof that the harness alone moves results |
| Running example | **one coding task an agent says it finished but didn't** (illustrative): "Add a password-reset button" → the agent writes it, re-reads its own code, says "Done ✓", and stops, while a test is red. This is the most common failure LangChain reports [S5]. We follow the same task card through guide → check → fix → pass |
| Angle (one sentence) | (provisional) Show on one task that the model isn't what made the agent fail: the same model, wrapped in a map, a check and a loop, gets caught by the test and fixes its own mistake, so the viewer learns the three things to add around their own agent today. |
| Chosen hook | (owner approved 2026-10-19) hooks.md #1, 20/20: "Your coding agent says 'Done.' The test says it isn't. The fix might not be a smarter model." First frame: a task card with a giant green "DONE ✓" stamp over a red "✗ 1 test failing" row |
| Runtime target | ~75–90 s (~170–200 words at the house pace 2.3 w/s, `studio/templates/reel/pace.json`); winning Shorts run 79–176 s but pad with part lists and plugs |
| Open questions / unverified | No "our test": we report LangChain's and OpenAI's published results as company claims. OpenAI's post blocks direct fetch; read through a text mirror (r.jina.ai) on 2026-10-19. |

### Locks (must never appear)
- No logos (OpenAI, Anthropic, LangChain, Claude, GitHub); product names as plain text only.
- No "prompt engineering is dead", "models don't matter", "AI writes all code now" or "no humans needed" claims.
- No claim that a harness makes an agent correct or bug-free (Böckeler: behaviour correctness is unsolved [S3]).
- No "we tested" / "our test" wording: we didn't run a benchmark.
- No sources on screen; code, files and UI on screen are labelled "illustrative".
- No line from any watched video; no horse / safety-harness / wiring-harness imagery that reads literal or kids-style.

---

## Chosen hook

**Line:** "Your coding agent says 'Done.' The test says it isn't. The fix might not be a smarter model." (hooks.md #1, 20/20, owner-approved 2026-10-19)

**Pick:** #1 (20/20). It opens on the failure the viewer has *seen* (the agent claims it's done), it's literally true (LangChain's most common failure [S5], Anthropic's "declared the job done" [S4]), and the third sentence opens the loop the whole reel closes. The number from #2 moves to the reveal, where it proves the payoff (Concept foundation-first rule: the striking fact moves out of the hook). "Might not be" keeps it honest: the harness isn't the only lever.
**First frame (described):** Full-bleed light block. Upper centre, a large white task card (≈ 70 % frame width) titled "Add password-reset button"; across it a giant green "DONE ✓" stamp, tilted, filling half the card. Directly below, a red test row as wide as the card, "✗ 1 test failing" in caption-size bold type. The contradiction (DONE vs failing) reads on mute in under a second; nothing empty, nothing in the bottom 20 % or right 12 %.
**How the video pays it off:** the same card goes through the harness — a short map before the agent acts, a test that writes back after, the loop — and ends green ("✓ all passing"), with the DONE stamp now *earned*. Then the proof that the harness alone moves results (same model, 52.8 → 66.5 % in LangChain's own run) answers "might not be a smarter model".

---

## Reel script · Harness Engineering

**Archetype:** Concept (standard "how X works" sheet) · **Viewer's question:** "What is harness engineering, and what would I actually do differently with my coding agent?" · **Running example:** one task card, "Add password-reset button" (illustrative), with one test the viewer wrote, `✗ sends reset email`
**Tone:** curious and delighted, like a senior engineer showing a trick: brisk on the loop, slow on "same model" and on the catch, plain and practical on the habit · **Words:** 243 (read-aloud, numbers spelled out) · **Est. runtime:** ~111 s at the house pace (÷2.3 + 0.4 s per beat, `studio/templates/reel/pace.json`) · **Winners' range:** winning Shorts 79–176 s at 2.4–3.4 w/s

_Rows = the Concept reel beat sheet: Hook → The example → (the failure) → The concept → Mechanism 1 (guides) → Mechanism 2 (checks + the loop) → Why it matters to you (the same-model number) → Takeaway (the habit) → the content plan's material catch → Recap → CTA. Two mechanism steps (archetype max 3). Follows content-plan.md (owner-approved 2026-10-19), including its safe wording. Runtime ~111 s, above the plan's 75–90 s band: the comprehension fixes (define "hook", introduce LangChain, clarify the number) added words and script-review's cuts (2026-10-28) took it as short as it goes without dropping a must-include, the catch or the recap; the owner is asked to accept it; every beat carries a must-include, so the recap stays (house rule) and the excess is noted for script-review. Owner approved this draft for review on 2026-10-28._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–8 s | [urgent] Your coding agent says, "Done." [beat] The test says it isn't. [slow down] The fix might not be a smarter model. | 18 | `[TITLE]` | DONE ✓ · ✗ 1 test failing | [S5] [S4] |
| 2 | The example | 8–11 s | The task? A password-reset button. | 5 | `[ANIMATE]` | Add password-reset button (illustrative) | illustrative |
| 3 | The example · the failure | 11–17 s | The agent writes the code, re-reads it, decides it looks fine, and stops. | 13 | `[ANIMATE]` | write → re-read → "looks fine" → stop | [S5] |
| 4 | The example · the failure | 17–19 s | [beat] The test? Never even ran. | 5 | `[VERDICT]` | TEST: NEVER RAN | [S5] [S4] |
| 5 | The concept | 19–22 s | Agent equals model plus harness. | 5 | `[TITLE]` | AGENT = MODEL + HARNESS | [S6] |
| 6 | The concept | 22–29 s | The harness is everything around the model: what it reads first, what checks its work after. | 16 | `[ANIMATE]` | BEFORE: guides · AFTER: checks | [S6] [S3] |
| 7 | Mechanism 1 · guides | 29–36 s | First, the guides: a short file it reads first, named agents dot M D. | 14 | `[ANIMATE]` | GUIDES · AGENTS.md | [S3] [S2b] |
| 8 | Mechanism 1 · guides | 36–43 s | A map, not a manual. Add one line: run the tests before you say done. | 15 | `[CODE]` | AGENTS.md · + Run the tests before you say done. | [S2b] [S1] |
| 9 | Mechanism 2 · checks (re-hook) | 43–47 s | [lean in] But nobody checks that rule. Second: the checks. | 8 | `[ANIMATE]` | CHECKS | [S3] |
| 10 | Mechanism 2 · checks | 47–54 s | Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done. | 21 | `[TERMINAL]` | HOOK · runs on its own → tests · every time | [S7] |
| 11 | Mechanism 2 · the loop | 54–60 s | Red. The error, with a fix hint, goes straight back to the agent. | 13 | `[ANIMATE]` | ✗ sends reset email + hint → back to the agent | [S3] [S2c] |
| 12 | Mechanism 2 · the loop | 60–64 s | The agent fixes the code and re-runs. [beat] Green. | 8 | `[ANIMATE]` | fix → re-run → ✓ passing | [S5] [S3] |
| 13 | Mechanism 2 · payoff | 64–68 s | [smile] Now the test passes, so "Done" means something. | 8 | `[VERDICT]` | DONE ✓ (earned) | [S3] |
| 14 | Why it matters to you | 68–77 s | [slow down] Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness. | 19 | `[VERDICT]` | SAME MODEL · new harness | [S5] |
| 15 | Why it matters to you | 77–88 s | They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. [beat] Now? Sixty-six point five. That's their own agent, measured by them. | 26 | `[NUMBER]` | 52.8% → 66.5% tasks solved · their own run | [S5] |
| 16 | Takeaway | 88–95 s | The habit: every mistake becomes a rule it reads, or a check it must pass. | 15 | `[ANIMATE]` | mistake → + rule · or + check | [S1] |
| 17 | The catch | 95–102 s | [slow down] One catch. Green only means your checks passed. So write or review the test yourself. | 15 | `[VERDICT]` | GREEN = YOUR CHECKS PASSED | [S3] |
| 18 | Recap | 102–107 s | [warm] A map before. A check after. Every mistake, a new rule. | 11 | `[RECAP]` | MAP BEFORE → CHECK AFTER → NEW RULE | [S3] [S1] |
| 19 | CTA | 107–111 s | What should I explain next? Tell me below. | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** AGENTS.md (spoken "agents dot M D"; on screen and in captions AGENTS.md), LangChain ("Lang-Chain"), 52.8 ("fifty-two point eight"), 66.5 ("sixty-six point five") → `names`: AGENTS.md, LangChain

**Re-hooks:** #4 at ~16 s ("Never even ran"), #9 at ~41 s ("But nobody checks that rule"), #14 at ~64 s ("Does it matter?"), #17 at ~85 s ("One catch"): every 20–25 s.

**Accuracy notes (content-plan claim safety):**
- #1 is the approved hook, an illustrative scenario of the documented failure [S5, S4]; never widened to "agents always…". "Might not be" stays (unsafe: "isn't a smarter model").
- #4 matches LangChain's reported pattern (re-read, "looks ok", stopped) and Anthropic's "marked complete without end-to-end testing".
- #5 "Agent equals model plus harness": LangChain's formula [S6]; the hook's "might not be a smarter model" carries the "not only the model" point.
- #8 "A map, not a manual" paraphrases OpenAI's AGENTS.md advice [S2b]; the added line is ours, illustrative.
- #9 compresses Böckeler's "feedforward alone → rules never get checked" [S3].
- #10 follows the Claude Code docs: hooks run at set points and make certain actions always happen rather than relying on the model to choose [S7]; "every time it says done" = a check at the finish (Stop hook / LangChain's pre-completion check, S5). Never "can't stop" or "can't claim done"; no lock or "blocked" visual.
- #11 "The error goes straight back to the agent": the check's output is fed into its context [S3, S2c]; no claim the agent catches its own mistake.
- #13 "'Done' means something", never "correct" / "bug-free" [S3].
- #14–15 credited to LangChain ("They say", "That's their own agent, measured by them": Terminal Bench isn't LangChain's test, the run is); 52.8 → 66.5 as said, never "26 %", "14 percent", "top 5" or "proven"; the model was held fixed and only the harness changed [S5, confirmed on langchain.com 2026-10-19]. Benchmark name (Terminal Bench 2.0) in the description only.
- #16 is Hashimoto's habit, in the plan's safe wording (not "never makes that mistake again") [S1].
- #17 is the plan's exact catch [S3].

### Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

Your coding agent says, "Done." The test says it isn't. The fix might not be a smarter model.

The task? A password-reset button.

The agent writes the code, re-reads it, decides it looks fine, and stops.

The test? Never even ran.

Agent equals model plus harness.

The harness is everything around the model: what it reads first, what checks its work after.

First, the guides: a short file it reads first, named agents dot M D.

A map, not a manual. Add one line: run the tests before you say done.

But nobody checks that rule. Second: the checks.

Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done.

Red. The error, with a fix hint, goes straight back to the agent.

The agent fixes the code and re-runs. Green.

Now the test passes, so "Done" means something.

Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness.

They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. Now? Sixty-six point five. That's their own agent, measured by them.

The habit: every mistake becomes a rule it reads, or a check it must pass.

One catch. Green only means your checks passed. So write or review the test yourself.

A map before. A check after. Every mistake, a new rule.

What should I explain next? Tell me below.

---

## Storyboard · Harness Engineering · reel · archetype: Concept (two mechanism halves, plain section titles)

_One row per script beat (script-reel.md, review PASS 2026-10-28), expanding animation-plan.md row for row (visual plan PASS 2026-10-28, structure check PASS 2026-10-29). Where a detail differs, the animation plan's row wins._

_Fixed layout (the workbench, s05–s13): task card y 310–570 · harness outline x 60–950, y 620–940 with legends "AGENT =" / "+ HARNESS" on its top edge · `MODEL` pill at (505, 790), 300×120, navy, never changes colour, size or label · guide slot x 90–330 · check slot x 680–920 · loop arc y 910–975 · test row y 1040–1160 (state chip x 790–920) · callout band y 1180–1300 (s11 only). No step counter, no numerals on section cards (structure check). Everything inside x 60–950 and above y 1460; captions are the engine's at 81–90 % height, left grid. No sources on screen; task card, AGENTS.md, the hook box and the error are tagged "illustrative"._

**Continuous spans:** A = s01 (the hook frame) · B = s02–s04 (the failure, on navy) · C = s05–s13 (the workbench: the harness is built and the loop closes; section wipes at s07 and s09 change only the background) · D = s14–s15 (the same-model comparison; the task card docked top-left) · E = s16–s17 (the right copy grows back into the workbench) · F = s18 (recap) · G = s19 (CTA). The task card + test row are the running object from s01 to s13, dock through D, rejoin in E and ride the recap chain.

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–8 s | Your coding agent says, "Done." The test says it isn't. The fix might not be a smarter model. | `[TITLE]` | light | Frame 0 (never empty): light; a white task card (y 300–700, x 162–918) "Add password-reset button", "illustrative" tag; a giant green "DONE ✓" (Anton 200 px) STAMP across it, tilted −8°; below (y 760–880) a red test row "✗ 1 test failing". From frame 0 the stamp SETTLES (1.10 → 1.00, 0–0.4 s) and the ✗ pulses at 0.6 s. On "Done" the stamp THUMPS; on "test" the ✗ PULSES; on "isn't" the red row SHAKES; on "fix" a dashed pill slot DRAWS under the row; on "smarter" a navy `MODEL` pill SLIDES UP into it with a "+ smarter?" chip that GREYS OUT on "model" | cold open (no fade) | DONE ✓ · ✗ 1 test failing | stamp · tick · tick · pop · whoosh | none (sources in description) |
| 2 | 8–11 s | The task? A password-reset button. | `[ANIMATE]` | dark | The card SHRINKS to the workbench position (y 310–570); the stamp, the red row and the MODEL pill LIFT OFF and park off-frame; on "task" the title RE-TYPES letter by letter; on "password-reset" the "illustrative" tag POPS | WIPE (light → dark) | Add password-reset button (illustrative) | whoosh · key · pop | none (sources in description) |
| 3 | 11–17 s | The agent writes the code, re-reads it, decides it looks fine, and stops. | `[ANIMATE]` | dark | On "agent" a caret DROPS into the card body; on "writes" 4 code lines TYPE OUT (mono 32 px, illustrative); camera PUSH IN [510, 440, 1.3] on "re-reads" as a scan line SCANS the code top to bottom; on "fine" a "looks fine" chip POPS; on "stops" camera home, the green DONE stamp STAMPS back on the card and the test row SLIDES IN grey with chip `not run` (internal change per clause, 6 s) | continuous | looks fine | blip · key · tick · pop · stamp | none (sources in description) |
| 4 | 17–19 s | The test? Never even ran. | `[VERDICT]` | dark | On "test" PUSH IN [525, 1100, 1.3] on the test row; on "Never" its grey `not run` chip FLASHES; on "ran" "NEVER RAN." STAMPS across the row (yellow Anton 110 px) | continuous | NEVER RAN. | whoosh · tick · stamp | none (sources in description) |
| 5 | 19–22 s | Agent equals model plus harness. | `[TITLE]` | blue | Camera home; "NEVER RAN." SHRINKS AWAY into the `not run` chip; the `MODEL` pill SLIDES back to centre (505, 790). The equation BUILDS on the diagram: on "Agent" the legend "AGENT =" TYPES OUT on the outline zone's top-left; on "model" a ring PULSES around the pill; on "harness" the outline DRAWS around the pill in one stroke and "+ HARNESS" TYPES OUT on its top-right | WIPE (dark → blue) | AGENT = MODEL + HARNESS | whoosh · pop · tick · pop | none (sources in description) |
| 6 | 22–29 s | The harness is everything around the model: what it reads first, what checks its work after. | `[ANIMATE]` | blue | On "everything" a dash RUNS once around the outline; on "reads" the left dashed slot LIGHTS "BEFORE", and on "first" an arrow ROUTES slot → pill; on "checks" the right slot LIGHTS "AFTER", and on "after" an arrow ROUTES pill → slot; the task card stays on top, the grey test row below (internal change per clause, 7 s) | continuous | BEFORE · AFTER | tick · pop · blip · pop · blip | none (sources in description) |
| 7 | 29–36 s | First, the guides: a short file it reads first, named agents dot M D. | `[ANIMATE]` | yellow | Section card "GUIDES" with a small "BEFORE" kicker (~1 s, no numeral); on "guides" the workbench returns; camera PUSH IN [340, 790, 1.6] on "file" as a doc icon FILLS the left slot ("illustrative" tag); on "reads" the BEFORE arrow ROUTES doc → pill; on "agents" the filename TYPES OUT "AGENTS" and on "dot" ".md" completes it (mono 32 px) | WIPE (blue → yellow) + section card | GUIDES · AGENTS.md | whoosh · pop · pop · blip · key · key | none (sources in description) |
| 8 | 36–43 s | A map, not a manual. Add one line: run the tests before you say done. | `[CODE]` | yellow | On "map" the doc shows 3 short heading lines (a table of contents); on "manual" a 40-page ghost stack SLIDES behind it and SHRINKS AWAY; on "line" a new line TYPES OUT in the doc: `+ Run tests` / `before "done"` (mono 26 px); on "before" a yellow marker SWEEPS it; camera home on "done" | continuous | + Run tests before "done" | pop · whoosh · key · tick | none (sources in description) |
| 9 | 43–47 s | But nobody checks that rule. Second: the checks. | `[ANIMATE]` | light | On "nobody" the new AGENTS.md line PULSES and a dashed connector DRAWS toward the test row; on "rule" a "?" POPS at its end, which stays EMPTY; on "Second" the background WIPES to light; on "checks" section card "CHECKS" with a small "AFTER" kicker (~1 s, no numeral), then the workbench | WIPE (yellow → light) + section card | CHECKS | tick · pop · whoosh · pop | none (sources in description) |
| 10 | 47–54 s | Add a hook: a command your agent tool runs on its own. Now the test runs every time it says done. | `[TERMINAL]` | light | Camera PUSH IN [720, 790, 1.5] on "hook" as a generic mono box SNAPS into the right slot ("illustrative"); on "command" it TYPES OUT `hook ›` / `run tests`; on "tool" a ▶ POPS beside it, and on "own" it SPINS; on "test" a dashed connector DRAWS hook → test chip; on "every" two ghost DONE stamps FLICKER on the card, each pulsing down the connector; on "done" camera home, the DONE stamp THUMPS, a pulse ROUTES stamp → hook and the test row SCANS left to right (no lock, no "blocked") | continuous | hook › run tests | pop · key · pop · tick · pop · tick · stamp | none (sources in description) |
| 11 | 54–60 s | Red. The error, with a fix hint, goes straight back to the agent. | `[ANIMATE]` | light | On "Red" the test row FILLS red, chip `✗`, and the DONE stamp FADES to an outline; on "error" a red chip TYPES OUT in the callout band `expected email sent · got none` (illustrative); on "hint" `hint: call sendResetEmail()` TYPES OUT under it; on "back" the chip ROUTES up the connector and along the loop arc; on "agent" it ENTERS the pill's left edge and a ring PULSES around the pill | continuous | ✗ · expected email sent · got none | pop · key · key · whoosh · blip | none (sources in description) |
| 12 | 60–64 s | The agent fixes the code and re-runs. Green. | `[ANIMATE]` | light | On "fixes" one code line RETYPES with the missing call (highlighted yellow); on "re-runs" the hook's ▶ spins and the row SCANS again; on "Green" camera [525, 1100, 1.3] as the row FILLS green, chip `✓` | continuous | ✓ | key · tick · ding | none (sources in description) |
| 13 | 64–68 s | Now the test passes, so "Done" means something. | `[VERDICT]` | light | On "Now" camera home; on "passes" the ✓ chip BOUNCES; on "Done" DONE ✓ STAMPS back solid on the card (the s01 frame replayed with ✓ instead of ✗); on "means" the harness outline glows green once | continuous | DONE ✓ | tick · stamp | none (sources in description) |
| 14 | 68–77 s | Does it matter? The team behind LangChain, an agent framework, kept the same model, and changed only the harness. | `[VERDICT]` | dark | On "Does" the task card DOCKS top-left as a mini ✓ card (x 90–420, y 230–300, staying through s15); on "matter" the workbench SPLITS into two identical copies (x 60–480 / 520–940, y 380–760), the same MODEL in the same thin old outline; on "LangChain" the plain-text label "LangChain" TYPES OUT above (no logo), and on "framework" "· agent framework" completes it; on "same" a ring PULSES around both pills and "SAME MODEL" STAMPS across the pair (yellow Anton 96 px); on "changed" the right copy's thin outline LIFTS OFF; on "harness" a thicker outline with both slots filled DRAWS around the right pill (internal change per clause, 9 s) | WIPE (light → dark) | LangChain · agent framework · SAME MODEL | whoosh · pop · key · key · stamp · tick · pop | none (sources in description) |
| 15 | 77–88 s | They say their agent used to solve fifty-two point eight percent of a benchmark's tasks. Now? Sixty-six point five. That's their own agent, measured by them. | `[NUMBER]` | dark | On "They" the label SHRINKS AWAY and the legends "BEFORE" / "AFTER" TYPE OUT on the two outlines; on "used" the left copy brightens and the right dims; "52.8%" COUNTS UP under the left from "fifty-two" and lands on "percent" (Anton 170 px, white); on "tasks" "tasks solved" TYPES OUT beneath; on "Sixty-six" camera [660, 1000, 1.3] as "66.5%" COUNTS UP under the right (Anton 200 px, yellow) and lands on "five"; on "own" a chip "their own run" STAMPS; camera home on "measured". Numbers hidden until their words, then both numbers, "SAME MODEL" and the chip stay on screen to the section's end (internal change per clause, 11 s) · **Build as two scenes** (26 words ≈ 11 s > the 10 s long-reel beat cap): s15a "They say … tasks." (52.8% lands) and s15b "Now? … measured by them." (66.5% lands), split at "Now?" in `scenes.json`; the spoken words are unchanged | continuous | 52.8% · 66.5% · tasks solved · their own run | pop · tick · tick · ding · pop · tick · ding · stamp | none (sources in description) |
| 16 | 88–95 s | The habit: every mistake becomes a rule it reads, or a check it must pass. | `[ANIMATE]` | blue | The left copy SHRINKS AWAY; the right copy GROWS back into the small workbench (scale 0.7) with the mini card on top; on "mistake" a red chip `✗ wrong command` DROPS beside the pill; on "rule" it SPLITS, one half FILLING the guide slot as `+ use npm test`; on "check" the other half FILLS the check slot as `+ check: npm test`; on "pass" the outline GROWS one notch thicker | WIPE (dark → blue) | + use npm test · + check: npm test | whoosh · pop · pop · pop · tick | none (sources in description) |
| 17 | 95–102 s | One catch. Green only means your checks passed. So write or review the test yourself. | `[VERDICT]` | blue | On "catch" camera [540, 840, 1.3] as the green test row SLIDES to centre; on "only" "= your checks passed" TYPES OUT beside the ✓; on "passed" camera home and the label STAMPS UP into "GREEN = / YOUR CHECKS PASSED" (Anton 96 px, two lines, yellow); on "write" a pencil ROUTES onto the row; on "review" a yellow marker SWEEPS `sends reset email`; on "yourself" the pencil underlines it | continuous | GREEN = YOUR CHECKS PASSED | whoosh · key · stamp · pop · tick · tick | none (sources in description) |
| 18 | 102–107 s | A map before. A check after. Every mistake, a new rule. | `[RECAP]` | yellow | The recap chain BUILDS one link per sentence: on "map" "MAP BEFORE" (doc icon); on "check" "CHECK AFTER" (green test row); on "mistake" a red chip DROPS on the third link and on "rule" turns into "NEW RULE" (+ line); the mini DONE ✓ card rides along the chain | WIPE (blue → yellow) | MAP BEFORE → CHECK AFTER → NEW RULE | whoosh · pop · pop · tick · pop | none (sources in description) |
| 19 | 107–111 s | What should I explain next? Tell me below. | `[CTA]` | dark | The question BUILDS WORD BY WORD from "What" to "next" (Anton 140 px, two lines); on "below" the "Follow for more AI breakdowns" pill SLIDES UP; the last frame holds the mini DONE ✓ card top-centre (it loops into frame 0's card) | WIPE (yellow → dark) | What should I explain next? | whoosh · pop · pop · pop | none (sources in description) |

_Reels: a visual change every ≤ 2.5 s (planned still ≈ 6.6 %, longest hold 1.3 s); captions at 81–90 % height; bottom 20 % / right 12 % clear; generic icons, no logos. Camera: 14 moves (~7.6/min), each landing on the actor named in its row. Music: `fresh-focus`, ducked under speech._
_Locks re-grepped for this file: no logos, no "can't"/"blocked"/lock visual at s10–s13, no "correct"/"bug-free"/"proven", MODEL unchanged s05–s15 (s16 scales the whole workbench to 0.7, outside the lock), no numerals on section cards, no step counter._

---

## Publish kit · Harness Engineering

_Title patterns that reached (inspiration.md): the viewer's exact question ("What is…?") and a contrast with the model. We use the patterns, never their words. No unsafe wordings from content-plan.md ("models don't matter", "prompt engineering is dead", "bug-free", "never makes that mistake again")._

### Titles (pick 1)
1. **Your AI agent says "Done." The test says no. (Harness engineering)** _(default: the hook as a title; true, and the video pays it off)_
2. Harness engineering, explained on one bug
3. Same AI model, a better coding agent: what harness engineering is

### Thumbnail concept (≤4 words of text)
The s01 frame, tighter: the white task card with the giant tilted green **"DONE ✓"** stamp, and the red row below reading **"TEST: NEVER RAN"**. On-image text: **"DONE? NEVER RAN"** (3 words). Light background, no logo, no face. Readable at phone-grid size: the green vs red contrast carries it.

### Caption / description
Your coding agent says "Done"… and the test never ran. 🧪

Harness engineering is building the rules and checks around your agent's model, so "Done" has to pass a check. Agent = model + harness.

In this reel, one password-reset task (illustrative) goes through:
• Guides, before: a short instructions file (AGENTS.md), a map, not a manual
• Checks, after: a hook that runs your tests every time the agent says it's done, and sends the error back
• The habit: every mistake becomes a rule it reads, or a check it must pass

LangChain says it kept the same model, changed only the harness, and its coding agent went from solving 52.8% to 66.5% of Terminal Bench 2.0's tasks. That's their own agent and their own run.

One catch: green only means your checks passed, so write or review the test yourself.

Where to set this up: a hook is configured in your coding tool's settings. One example is Claude Code's hooks guide (linked below). The file name for agent instructions differs by tool; AGENTS.md is the one used in OpenAI's write-up.

### Chapters (long-form)
_n/a (reel)_

### Sources (for the description / pinned comment)
- [S1] Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): https://mitchellh.com/writing/my-ai-adoption-journey
- [S2] OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11): https://openai.com/index/harness-engineering/
- [S3] Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com (2026-04-02): https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- [S4] Anthropic, "Effective harnesses for long-running agents" (2025-11-26): https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- [S5] LangChain, "Improving Deep Agents with harness engineering" (2026-02-17): https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering
- [S6] LangChain, "The anatomy of an agent harness" (2026-03-10): https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
- [S7] Claude Code docs, "Automate actions with hooks": https://code.claude.com/docs/en/hooks-guide

### Hashtags
#AIAgents #HarnessEngineering #CodingAgents #AIEngineering #GenAI #SoftwareEngineering #LearnAI #shorts

### Pinned comment (invites replies)
What's the one mistake your coding agent keeps making? 👇 Drop it below, and I'll suggest the rule or the check that would catch it. (Sources for every number are in the description.)

### Repurposing (long-form moments → reels)
- **Explainer seed (8–12 min):** the full harness on one repo: guides (AGENTS.md as a map, Skills), checks (tests, linters whose errors are written for the model, type checks), computational vs inferential checks (Böckeler [S3]), and a live before/after run. All cut from this reel for depth.
- **Short #2 (Myth-buster):** "A smarter model won't always fix your agent": the same-model number [S5] as the hook, with honest framing (their own run).
- **Short #3 (Tips):** "3 lines to add to your AGENTS.md today", built from Hashimoto's habit [S1]; needs its own research and content plan.
