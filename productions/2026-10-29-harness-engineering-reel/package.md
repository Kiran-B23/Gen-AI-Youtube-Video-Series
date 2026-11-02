# Package · Harness Engineering (v2) · reel

_For the editor: brief, chosen hook, script, storyboard and publish kit, concatenated on 2026-10-30. Script owner-approved 2026-10-30; gates: content-plan READY · script-review PASS · visual-plan PASS (plan + storyboard) · structure-check PASS · lint._

# Brief · Harness Engineering (v2)

| | |
|---|---|
| Topic | **Harness engineering**: designing everything around an AI model (instructions, tools, checks, feedback loops) so a coding agent does reliable work [S1–S7]; updated with the Sept 2026 HarnessTax study on how much the harness itself matters [S8] |
| Format(s) | reel (9:16, faceless) · the owner asked for a reel |
| Viewer | global tech audience · level: curious practitioner (default; uses or has tried a coding agent such as Claude Code, Codex or Cursor; has seen "harness" in their feed but can't say what it is) |
| **Viewer's question** | "What is harness engineering, and what would I actually do differently with my coding agent?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" + a mechanism; not Tutorial: no imperative "build a harness"; not Trend: "is the harness dead?" is a debate the reel answers in one beat, not the viewer's question) → **confirmed after YouTube analysis: Concept** (standard "how X works" sheet). 3 of 4 topic Shorts are Concept, the 4th a product launch; the gap is a mechanism on one task plus the measured model-vs-harness answer (inspiration.md) |
| **Tone (voice style)** | Curious and delighted, like a senior engineer replaying a bug for a friend: quick and dry on the fast failure, slow and clear on the replay, a raised eyebrow on the study's twist, plain and practical on the habit. |
| Must include | (provisional; the content plan decides) a one-line definition by what it does; agent = model + harness; guides before the agent acts, checks after; the loop (check fails → error goes back → agent fixes → passes); the habit "every mistake becomes a rule or a check"; the HarnessTax finding (swapping ready-made harnesses barely moved success, moved cost up to 5×) and what it means for the viewer |
| Running example | **one coding task an agent says it finished but didn't** (illustrative): "Add a password-reset button" → the agent writes it, re-reads its own code, says "Done", stops, while a test is red (LangChain's most common failure [S5]). The same task card goes through fail-fast → slow replay → guide → check → fix → pass |
| Angle (one sentence) | Watch one false "Done" fail fast, then replay it slow with the harness named piece by piece, and learn from the newest study that the harness you pick mostly changes price, not success, so pick it for price and build your own checks for "Done". |
| Chosen hook | hooks.md #1: "Your coding agent says, 'Done.' Your test would say no. Why?" · pinned hook question "Why does my agent say 'Done' too early?" |
| Runtime target | 45–75 s (content plan, 2026-10-30 house rule): ~150–155 words at the house pace 2.3 w/s (`studio/templates/reel/pace.json`); top explainer Shorts median 57 s (`references/web-shorts-2026-10-30.md`); v1 ran ~111 s |
| Effects (owner's note) | "Refer similar shorts/reels for exclusive effects" → effects analysis in inspiration.md (fast-then-slow replay, pinned scoreboard, lit path, stacked pass ≠ correct verdict, racing bars with a cost meter, a camera that never rests); carried into art-direction.md and animation-plan.md |
| Defaults taken on autopilot | reel · curious practitioner · Concept · reuse v1's verified sources S1–S7 (one line why: unchanged official pages, 10 days old) · new folder (v1 package and build stay untouched as the owner's earlier version) |
| Open questions / unverified | No "our test". LangChain's 52.8 → 66.5 (S5) is their own run on an older model; HarnessTax (S8) is independent but only two public benchmarks, 30 tasks each. The HarnessTax page loads by script; its text was read from the site's GitHub source on 2026-10-30. |

## Locks (must never appear)
- No logos (OpenAI, Anthropic, LangChain, Claude, GitHub, Cursor); product names as plain text only.
- No "prompt engineering is dead", "models don't matter", "the harness is dead", "harnesses don't matter", "AI writes all code now" or "no humans needed" claims.
- No claim that a harness makes an agent correct or bug-free (Böckeler: behaviour correctness is unsolved [S3]).
- No "Claude Code is bad / overpriced" or any harness ranking: HarnessTax compares cost on two benchmarks, not quality for your work.
- No "we tested" / "our test" wording: we didn't run a benchmark.
- No sources on screen; code, files and UI on screen are labelled "illustrative".
- No line from any watched video; no horse / safety-harness / wiring-harness imagery; no photoreal AI-generated people (E5).

---

## Chosen hook

**Pick:** #1 (20/20). (Owner, 2026-10-30: "says it isn't" → "would say no", because the body says the test never ran.) It keeps the failure every coding-agent user has *seen* (LangChain's most common failure [S5], Anthropic's "declared the job done" [S4]) and turns the owner's effects note into the structure itself: the false "Done" plays at 2× under a `▶▶ 2×` chip, then the replay at 1× names each harness piece. "Why?" hands over to the pinned hook question (content plan, 2026-10-30 house rule), which the whole reel answers. (Revised 2026-10-30: "Let's replay that, slowly" is shown by the chip, not said, to fit 45–75 s.) It drops v1's "might not be a smarter model", which the HarnessTax result (S8) makes too loose. The number moves to "why it matters".
**First frame (described):** Full-bleed light block (#EEF1F6, one background for the whole reel). Top (y 230–590), the hook question "WHY DOES MY AGENT SAY 'DONE' TOO EARLY?" in giant ink Anton, three lines (it stays pinned there, smaller, all video). Below it (y 640–1020), a large white task card (≈ 78 % frame width) titled "Add password-reset button", tagged "illustrative"; across it a giant green "DONE ✓" stamp, tilted, filling half the card. Directly below (y 1060–1180), a red test row as wide as the card, "✗ sends reset email" in bold mono with a red left bar and a "would fail" chip. Under it, bottom-left (y 1196–1256), a small dark "▶▶ 2×" playback chip that says "this is a replay". From frame 0 the stamp settles and the ✗ pulses. The contradiction (DONE vs failing) reads on mute in under a second; nothing empty, nothing in the bottom 20 % or right 12 %.
**How the video pays it off:** the replay runs at 1× with each harness piece stamped onto the same card — a short map before the agent acts, a check after, the error routed back, the fix — and ends with the test green and the DONE stamp re-inked as earned. The replay is paid by the chip switching from "2×" to "1×" and the camera pushing in on each step; the hook question is answered by the recap card "Pick a harness for price. Build checks for 'Done.'" The question + card + stamp fill ≥ 45 % of the stage band by 1.5 s.

---

# Reel script · Harness Engineering (v2)

**Archetype:** Concept (standard "how X works" sheet) · **Viewer's question:** "What is harness engineering, and what would I actually do differently with my coding agent?" · **Hook question (pinned):** "Why does my agent say 'Done' too early?" · **Running example:** one task card, "Add password-reset button" (illustrative), with one test the viewer wrote, `✗ sends reset email`
**Tone:** curious and delighted, like a senior engineer replaying a bug for a friend: quick and dry on the fast failure, slow and clear on the replay, a raised eyebrow on the study's twist, plain and practical on the habit · **Words:** 158 (read-aloud) · **Est. runtime:** ~75 s (158 ÷ 2.3 = 69 s of speech + 0.4 s pause per beat × 15; v1's real voice ran 2.14 w/s overall incl. pauses → ~74 s), at the top of the 45–75 s reel band · **Winners' range:** topic Shorts 79–176 s; top explainer Shorts median 57 s (`references/web-shorts-2026-10-30.md`)

_Rows = the Concept reel beat sheet: Hook → The example (the fast failure) → The concept → Mechanism (rule + hook = the loop) → Why it matters to you (HarnessTax) → Takeaway (the habit) → the content plan's material catch → Recap + CTA. Follows content-plan.md (2026-10-30 pm, 75 s cut), including its safe wording. The fast-then-slow effect is shown, not said: beats 2–3 play under a `▶▶ 2×` chip, beat 4 on under `▶ 1×`._
_History: owner's script review (2026-10-30, not yet approved) asked for 6 changes: the closing line overreached (→ "Pick a harness for price. Build checks for 'Done.'"), the hook contradicted the body (→ "would say no"), the catch's reason (→ "AI-written tests can pass bad code"), the rule shown as it's spoken (+ the example "run tests first"), the timing maths, and success vs cost as two beats. Before that, script-review (2026-10-30, CHANGES) merged to 15 beats (catch kept as 2 beats for the 6 s beat limit), defined the hook, split the S8 line and moved the CTA onto the card. Before that, the morning draft (205 words, ~97 s) went through three Goldfish runs (harness named before use, hook trigger said, cost given a unit, "you" turn mistakes into rules); the 2026-10-30 house rules (45–75 s, pinned hook question) then cut it to this version: the rule and hook beats became one loop, the formula moved on screen, the instructions file is named on screen only._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–5 s | [urgent] Your coding agent says, "Done." [beat] Your test would say no. [lean in] Why? | 11 | `[TITLE]` | WHY DOES MY AGENT SAY "DONE" TOO EARLY? · DONE ✓ · ✗ sends reset email (would fail) | [S5] [S4] |
| 2 | The example · the failure (fast, 2×) | 5–11 s | [brisk] The agent writes a password-reset button, re-reads it, stops. [beat] Your test? Never ran. | 13 | `[ANIMATE]` | ▶▶ 2× · Add password-reset button (illustrative) · write → re-read → stop · YOUR TEST: NEVER RAN | [S5] [S4] |
| 3 | The concept (replay, 1×) | 11–18 s | [slow down] The harness is everything around the model: what it reads, what checks its work. | 14 | `[ANIMATE]` | ▶ 1× · AGENT = MODEL + HARNESS · READS · CHECKS | [S6] [S3] |
| 4 | Mechanism · a rule | 18–22 s | A rule like "run tests first" only asks. | 8 | `[CODE]` | AGENTS.md · + Run tests first. (types on "rule") · asks | [S3] |
| 5 | Mechanism · a hook | 22–28 s | A hook is a command that runs your test whenever the agent says done. | 14 | `[TERMINAL]` | HOOK = a command · "done" → your test | [S7] |
| 6 | Mechanism · the loop + payoff | 28–35 s | Red. The error goes back. The agent fixes it. [beat] Green. [smile] Now "Done" means something. | 14 | `[ANIMATE]` | FAIL ✗ → error → agent → fix → PASS ✓ · DONE ✓ (earned) | [S3] [S2c] [S5] |
| 7 | Why it matters to you · re-hook | 35–41 s | Your agent tool is a ready-made harness. [raised eyebrow] Should you shop for a better one? | 14 | `[TITLE]` | ring around the model relabels → YOUR AGENT TOOL · SHOP FOR A BETTER ONE? | [S6] [S8] |
| 8 | Why it matters to you | 41–45 s | Researchers ran the same models in three popular tools. | 9 | `[VS]` | same models × 3 tools (unlabelled) | [S8] |
| 9 | Why it matters to you · success | 45–50 s | On two benchmarks, success moved a few points between tools. | 10 | `[NUMBER]` | SUCCESS ±2–5 pts (bars stay still) | [S8] |
| 10 | Why it matters to you · cost | 50–53 s | [beat] Token cost varied up to fivefold. | 6 | `[NUMBER]` | TOKEN COST up to 5× (only this bar moves) | [S8] |
| 11 | Takeaway | 53–57 s | No ready-made harness knows your project. Your checks do. | 9 | `[VERDICT]` | YOUR PROJECT → YOUR CHECKS | [S3] |
| 12 | Takeaway · the habit | 57–62 s | Turn every mistake into a rule, plus a check. | 9 | `[ANIMATE]` | mistake → + rule + check | [S1] [S3] |
| 13 | The catch | 62–66 s | [slow down] One catch: green only means your checks passed. | 8 | `[VERDICT]` | ✓ PASSED ≠ CORRECT | [S3] |
| 14 | The catch · why | 66–70 s | AI-written tests can pass bad code. Review the test yourself. | 10 | `[ANIMATE]` | weak test ✓ on bad code → review the test | [S3] |
| 15 | Recap | 70–75 s | [warm] Pick a harness for price. Build checks for "Done." | 9 | `[RECAP]` | HARNESS → PRICE · CHECKS → "DONE" · What should I explain next? | [S8] [S3] |

**Pronunciation notes:** AGENTS.md and the harness names are on screen only (not spoken) · "re-reads" ("ree-reeds") · "AI-written" ("A-I written") → `names`: none needed

**Re-hooks:** #2 at ~5 s ("Never ran"), #7 at ~30 s ("Should you shop for a better one?"), #13 at ~58 s ("One catch"): every ~25 s; the pinned hook question stays on screen throughout.

**Accuracy notes (content-plan claim safety):**
- #1 is an illustrative scenario of the documented failure [S5, S4]; "would say no" (owner, 2026-10-30): the test never ran, so it can't have said anything; the red row reads as "would fail". "Why?" asks the pinned hook question.
- #2 matches LangChain's reported pattern (re-read, "looks ok", stopped) and Anthropic's "marked complete without end-to-end testing"; "**your** test" per the plan (S9).
- #3 is the definition by what it does [S6, S3]; "Agent = Model + Harness" [S6] on screen only.
- #4 "only asks" is the plan's safe wording of "feedforward alone → rules never get checked" [S3] (never "useless" / "ignored"); the example rule is spoken and types onto `AGENTS.md` on the word "rule" (owner, 2026-10-30).
- #5 a hook is a command run at set points, "certain actions always happen rather than relying on the LLM to choose" [S7]. Never "can't stop".
- #6 the test catches it, the error is fed back into the agent's context [S3, S2c], the agent fixes it [S5]; "means something", never "correct" / "bug-free" [S3].
- #7–10: S8. "your agent tool is a ready-made harness" (S6/S8 call these tools harnesses; said before the question so "harness" lands as something you can pick), "the same models in three popular tools", "on two benchmarks", "success moved a few points between tools" (±2 SWE-bench Lite, ~±5 Terminal-Bench 2.0; the range is on screen), "token cost varied up to fivefold" (same model, between harnesses; 1.5–2× on average, up to 5× for some pairs). Success and cost are two beats so the success bars hold still while only the cost bar moves (owner, point 6). No harness named, no per-harness cost row on screen, no "proved", no "doesn't matter".
- #11 is our conclusion from S3 (a harness checks only what you specify), not attributed to the study.
- #12 is Hashimoto's habit [S1] with a check behind each rule [S3]; never "never makes that mistake again".
- #13–14 are the catch [S3: functional correctness unsolved]. "AI-written tests can pass bad code" (owner, 2026-10-30) replaces "aren't good enough yet": a test that doesn't check the requirement passes wrong code; S3 says AI-generated tests aren't trustworthy yet.
- #15 (owner, 2026-10-30) replaces "Don't shop for a harness. Build your checks.", which overreached: S8 found harness choice moves price (Pi often matched success at about half Claude Code's cost) but not correctness. "Pick a harness for price" is what the study supports; "Build checks for 'Done'" is the core message. The channel-generic CTA "What should I explain next?" is on the recap card.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

Your coding agent says, "Done." Your test would say no. Why?

The agent writes a password-reset button, re-reads it, stops. Your test? Never ran.

The harness is everything around the model: what it reads, what checks its work.

A rule like "run tests first" only asks.

A hook is a command that runs your test whenever the agent says done.

Red. The error goes back. The agent fixes it. Green. Now "Done" means something.

Your agent tool is a ready-made harness. Should you shop for a better one?

Researchers ran the same models in three popular tools.

On two benchmarks, success moved a few points between tools.

Token cost varied up to fivefold.

No ready-made harness knows your project. Your checks do.

Turn every mistake into a rule, plus a check.

One catch: green only means your checks passed.

AI-written tests can pass bad code. Review the test yourself.

Pick a harness for price. Build checks for "Done."

---

# Storyboard · Harness Engineering (v2) · reel · archetype: Concept (one loop, plain section titles)

_One row per script beat (script-reel.md, owner-approved 2026-10-30), expanding animation-plan.md row for row (visual plan PASS and structure check PASS, 2026-10-30). Where a detail differs, the animation plan's row and its Fixed layout win._

_One background (`light` #EEF1F6) for the whole reel; the hook question is pinned at y 230–330 from s02. The pinned question, the section title and the docked chip are a fixed layer outside `#cam`, on an opaque #EEF1F6 band y 220–400; pushes move only the diagram, which passes under the band; section titles ("The replay" · "Pick a harness?" · "Your checks") slide in under it, no numerals. Everything inside x 60–950 and above y 1320; captions are the engine's at 81–90 % height. No sources on screen; the task card, AGENTS.md, the hook box and the test are tagged "illustrative". No harness names, no per-harness cost row._

**Continuous spans:** A = s01–s02 (the hook frame, then the fast 2× failure on the same card) · B = s03–s06 (the workbench: card, ring, MODEL pill, slots and test row stay put while only state changes) · C = s07–s10 (the study: the card pinned as a mini card; the ring clones into three; success bars race and then hold still while only the cost bar moves) · D = s11–s14 (the workbench returns and gains the habit and the catch) · E = s15 (recap). The task card / test row / DONE stamp are the running object in every span.

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–5 s | Your coding agent says, "Done." Your test would say no. Why? | `[TITLE]` | light | frame 0: giant question over the task card with the green DONE ✓ STAMP and the red test row "✗ sends reset email · would fail" below; from frame 0 the stamp SETTLES and the ✗ PULSES; on "Done" the DONE stamp THUMPS (1.08 → 1); on "test" the red row's ✗ PULSES and its "would fail" chip FLASHES; on "Why" the giant question PULSES once and the `▶▶ 2×` chip starts BLINKING | cold open (no fade): frame 0 already complete | WHY DOES MY AGENT SAY "DONE" TOO EARLY? DONE ✓ | stamp (Done) · tick (test) · pop (Why) | none (sources in description) |
| 2 | 5–11 s | The agent writes a password-reset button, re-reads it, stops. Your test? Never ran. | `[ANIMATE]` | light | the giant question SHRINKS AWAY into the pinned header (y 230–330); the card SHRINKS to the workbench slot (y 420–660) and its DONE stamp and red row LIFT OFF; at 2× (motion blur on moves, `▶▶ 2×` chip blinking): on "writes" 3 code lines TYPE OUT fast; on "re-reads" a scan line SCANS the code twice; on "stops" the DONE stamp STAMPS back on the card; on "test" the test row (x 160–820) SLIDES IN grey with chip `not run`; on "Never" the chip FLASHES; on "ran" "NEVER RAN" STAMPS across the row (Anton 90 px, red) · camera: [505, 1115, 1.3] on "test" (the row that never ran) | continuous: question shrinks to the header, card to the workbench (2×) | ▶▶ 2× · NEVER RAN | key (writes) · tick (re-reads) · stamp (stops) · whoosh (test) · tick (Never) · stamp (ran) | none (sources in description) |
| 3 | 11–18 s | The harness is everything around the model: what it reads, what checks its work. | `[ANIMATE]` | light | camera home; the chip FLIPS to `▶ 1×` and docks beside the section title "The replay", which SLIDES IN under the question; "NEVER RAN" SHRINKS AWAY into the row's `not run` chip; the navy `MODEL` pill SLIDES IN at (505, 855); on "harness" the ring DRAWS around the pill in one stroke and the legend "AGENT = MODEL + HARNESS" BUILDS WORD BY WORD on its top edge; on "everything" a dash RUNS once around the ring; on "model" a ring PULSES around the pill (the pill never changes); on "reads" the left slot LIGHTS "READS"; on "checks" the right slot LIGHTS "CHECKS" · camera: home on "harness" | continuous: chip flips ▶ 1×, title "The replay" slides in | ▶ 1× · AGENT = MODEL + HARNESS · READS · CHECKS | pop (harness) · tick (everything) · tick (model) · pop (reads) · pop (checks) | none (sources in description) |
| 4 | 18–22 s | A rule like "run tests first" only asks. | `[CODE]` | light | on "rule" the slot label "READS" PULSES and an `AGENTS.md` doc FILLS the left slot and its line `Run tests first.` TYPES OUT at once (mono 34 px, two lines "Run tests" / "first.", fully typed within 0.4 s, so the rule line is on screen as "rule" is spoken: owner, 2026-10-30); on "run" a yellow marker SWEEPS the line in time with "run tests first"; on "asks" a speech tag "asks" (34 px) POPS on the line and a dashed connector DRAWS from the rule toward the test row and stops short (nothing runs it): the test chip stays grey `not run` · camera: [330, 855, 1.6] on "rule" (new actor: the rule) | continuous (cam push to the rule slot) | AGENTS.md · Run tests first. · asks | key (rule) · tick (run) · pop (asks) | none (sources in description) |
| 5 | 22–28 s | A hook is a command that runs your test whenever the agent says done. | `[TERMINAL]` | light | on "hook" a generic mono box SNAPS into the right slot (covered by the ring's "illustrative" tag); on "command" its text TYPES OUT `on "done"` / `› run tests` (2 lines, mono 34 px); on "runs" a solid connector DRAWS from the hook down to the test row's chip; on "says" the DONE stamp on the card THUMPS (the agent says done); on "done" the hook FIRES: a pulse ROUTES from the stamp into the hook and down the connector while the camera follows it down to the row, and the test row SCANS left to right · camera: [800, 780, 1.4] on "hook" (new actor), [505, 1115, 1.3] on "done" (follow the pulse to the row; the whole row x 160–820 is in frame for the scan and s06's red) | continuous (cam to the hook slot) | on "done" › run tests | pop (hook) · key (command) · pop (runs) · stamp (says) · whoosh (done) | none (sources in description) |
| 6 | 28–35 s | Red. The error goes back. The agent fixes it. Green. Now "Done" means something. | `[ANIMATE]` | light | on "Red" the test row FILLS red, chip `FAIL ✗`, and the DONE stamp FADES to an outline (not earned yet; no lock); on "error" a red chip `expected 1 email · got 0` (mono 34 px) TYPES OUT in the callout band (x 260–760); on "back" the chip ROUTES along a path that LIGHTS from the test row up into the pill's left edge and a ring PULSES around the pill (all inside the pushed frame from s05); on "fixes" the camera returns home as one code line on the card RETYPES with the missing call (highlighted yellow); on "Green" the row FILLS green, chip `PASS ✓`; on "Done" the DONE ✓ STAMPS back solid (the hook's frame, now earned, in full view); on "means" the ring GLOWS green once · camera: held at [505, 1115, 1.3] from s05 through "back"; home on "fixes" (the fix is on the card; Green → Done → means need the full frame) | continuous (held push on the row) | FAIL ✗ · expected 1 email · got 0 · PASS ✓ | pop (Red) · key (error) · whoosh (back) · key (fixes) · ding (Green) · stamp (Done) · tick (means) | none (sources in description) |
| 7 | 35–41 s | Your agent tool is a ready-made harness. Should you shop for a better one? | `[TITLE]` | light | the section title SLIDES to "Pick a harness?" and the docked `▶ 1×` chip SHRINKS AWAY with it (the replay is over); on "agent" the task card SHRINKS AWAY into the pinned mini card (x 90–470, y 410–470, its earned ✓ kept); on "tool" the ring's legend RETYPES "YOUR AGENT TOOL" (the same ring: concept = product); on "ready-made" a "ready-made" box-label STAMPS onto the ring's corner; on "shop" a price tag "$" SWINGS onto the ring; on "better" a "?" POPS beside it | continuous: title slides to "Pick a harness?", chip shrinks away | YOUR AGENT TOOL · ready-made · $ ? | whoosh (agent) · key (tool) · stamp (ready-made) · pop (shop) · pop (better) | none (sources in description) |
| 8 | 41–45 s | Researchers ran the same models in three popular tools. | `[VS]` | light | on "Researchers" the ring SHRINKS and CLONES into three identical unlabelled rings (x 60–330 / 370–640 / 680–950, y 500–720), each around the same small MODEL pill; on "same" a ring PULSES around all three pills at once and "SAME MODELS" STAMPS across them (Inter 900 44 px); on "three" the rings BOUNCE one by one; on "tools" each ring's dashed outline TICKS solid (no names: lock); the mini card stays still above | continuous: ring clones into three | SAME MODELS | whoosh (Researchers) · stamp (same) · tick (three) · tick (tools) | none (sources in description) |
| 9 | 45–50 s | On two benchmarks, success moved a few points between tools. | `[NUMBER]` | light | on "two" a chip "2 benchmarks" POPS above the bars; on "success" three unlabelled green success bars RACE out from x 160 and land level (y 790–1000, lengths 600 / 612 / 620 px) under the label "SUCCESS"; on "few" "±2–5 pts" COUNTS UP on the label row, right-aligned to x 930 above the bar ends (not after them: x 780 + the label would pass x 950); on "points" a dashed baseline DRAWS across the bar ends; then the bars HOLD STILL | continuous: bars race in | 2 benchmarks · SUCCESS · ±2–5 pts | pop (two) · whoosh (success) · tick (few) · tick (points) | none (sources in description) |
| 10 | 50–53 s | Token cost varied up to fivefold. | `[NUMBER]` | light | on "Token" a label "TOKEN COST PER TASK" TYPES OUT under the success bars (still); on "cost" **one** blue cost bar RACES out from x 160 (y 1075–1165) to 150 px and leaves a dashed ghost mark there; on "varied" its end STRETCHES 150 → 450 → 300 px (the cost swings between tools; no per-tool bars, no labels); on "fivefold" it STRETCHES to 750 px (end x 910) and "up to 5×" COUNTS UP under its end (Anton 90 px, right-aligned to x 910, y 1180–1290); the three success bars above stay exactly still the whole beat: only the cost bar moves (owner, 2026-10-30) | continuous: success bars hold still | TOKEN COST PER TASK · up to 5× | key (Token) · whoosh (cost) · tick (varied) · ding (fivefold) | none (sources in description) |
| 11 | 53–57 s | No ready-made harness knows your project. Your checks do. | `[VERDICT]` | light | the section title SLIDES to "Your checks" (whoosh on entry); on "harness" the three rings, the success bars and the cost bar SHRINK AWAY; on "knows" the mini card GROWS back into the full task card and the single ring (legend "HARNESS") with its rule and hook slots RETURNS around the pill; on "project" a "YOUR PROJECT" tag (Inter 800 40 px) STAMPS on the card; on "checks" the test row PULSES green and the hook's connector LIGHTS | continuous: title slides to "Your checks" | YOUR PROJECT | whoosh (harness) · pop (knows) · stamp (project) · ding (checks) | none (sources in description) |
| 12 | 57–62 s | Turn every mistake into a rule, plus a check. | `[ANIMATE]` | light | on "mistake" a red chip `✗ sent 2 emails` DROPS onto the card; on "rule" it SPLITS and one half FILLS the rule slot as a new line `+ One email` / `per request.` (mono 34 px, under `Run tests first.`); on "plus" a "+" connector DRAWS between the two slots; on "check" the slot label "CHECKS" PULSES and the other half FILLS the hook slot as `+ test:` / `1 email` (mono 34 px) and SNAPS to the rule (a check behind every rule) | continuous | sent 2 emails → One email per request. + test: 1 email | pop (mistake) · key (rule) · tick (plus) · pop (check) | none (sources in description) |
| 13 | 62–66 s | One catch: green only means your checks passed. | `[VERDICT]` | light | on "catch" PUSH IN on the green test row; on "green" the row's `PASS ✓` chip PULSES; on "only" a "≠ correct" tag (mono 34 px) POPS on the row's top edge above the chip (x 640–820, y 1018–1058; a tag to the chip's right would land past x 950 in the push); on "passed" the stacked verdict STAMPS above the row: "✓ PASSED" (green, Anton 110 px) over "≠ CORRECT" (ink, Anton 110 px, yellow marker behind) · camera: [505, 1115, 1.3] on "catch", home on "passed" (the verdict needs the full width) | continuous (cam push on the row) | ✓ PASSED ≠ CORRECT | whoosh (catch) · tick (green) · pop (only) · stamp (passed) | none (sources in description) |
| 14 | 66–70 s | AI-written tests can pass bad code. Review the test yourself. | `[ANIMATE]` | light | on "written" the stacked verdict SHRINKS AWAY into the "≠ correct" tag (frees the ring) and a test line TYPES OUT in the callout band `expect(page).toBeTruthy()` (mono 34 px) tagged "AI-written"; on "pass" its chip FILLS green ✓ while on "bad" a red bug chip POPS on the card's code line (green on bad code); on "Review" a yellow marker SWEEPS the test line; on "yourself" the line RETYPES `expect(emails).toBe(1)` and the bug chip turns red ✗ FAIL (the real check catches it) | continuous: verdict shrinks into its tag | AI-written · expect(emails).toBe(1) | key (written) · tick (pass) · pop (bad) · tick (Review) · key (yourself) | none (sources in description) |
| 15 | 70–75 s | Pick a harness for price. Build checks for "Done." | `[RECAP]` | light | the workbench SHRINKS AWAY to a mini card with its earned DONE ✓ under the pinned question; the recap card BUILDS two lines: on "harness" "HARNESS → PRICE" STAMPS (Anton 120 px) with a "$" tag; on "price" the tag SWINGS; on "checks" "CHECKS → "DONE"" STAMPS with a green ✓; on "Done" the mini card's DONE ✓ THUMPS and "What should I explain next?" TYPES OUT under the card (Inter 700 44 px) | continuous: workbench shrinks to the mini card | HARNESS→PRICE · CHECKS→"DONE" · What should I explain next? | stamp (harness) · tick (price) · stamp (checks) · pop (Done) | none (sources in description) |

_Reels: a visual change every ≤ 2.5 s; captions at 81–90 %; bottom 20 % / right 12 % clear; generic icons, no logos._

---

# Publish kit · Harness Engineering (v2)

_Title patterns that reach (inspiration.md, references/web-shorts-2026-10-30.md): the viewer's question ("Why does…?"), and model vs harness as a contrast. We use the patterns, never their words. Unsafe wordings from content-plan.md stay out: "the harness doesn't matter", "Claude Code costs 5×", "proved", "bug-free", "don't shop for a harness", no harness ranking._

## Titles (pick 1)
1. **Why does my AI agent say "Done" too early?** _(default: the pinned hook question; the video answers it)_
2. Your coding agent said "Done." Your test would say no.
3. Harness engineering: pick a harness for price, build checks for "Done"

## Thumbnail concept (≤4 words of text)
The frame-0 picture, cropped tighter: the white task card with the giant tilted green **"DONE ✓"** stamp over a red test row. On-image text: **"DONE TOO EARLY?"** (3 words). Light background, no logo, no face. The green-vs-red contrast still reads at phone-grid size.

## Caption / description
Your coding agent says "Done", and it never ran your test.

The harness is everything around the model: what it reads, and what checks its work. A rule in a file (like AGENTS.md) only asks. A hook runs your test every time the agent says it's done, and the error goes back to the agent until the test passes.

Should you shop for a better harness? Researchers at UC Berkeley and Arena ran the same 7 models in Claude Code, Codex CLI and Pi on SWE-bench Lite and Terminal-Bench 2.0. Success moved only a few points between harnesses (about ±2 on one benchmark and ±5 on the other). Token cost moved 1.5 to 2× on average, and up to 5× for some model and harness pairs. Treat the results as directional: two public benchmarks, 30 sampled tasks each, and the models may have seen those tasks in training.

So pick a harness for price, and build checks for "Done": turn every mistake into a rule, plus a check. Green only means your checks passed, and AI-written tests can pass bad code, so review the test yourself.

Claude Code's hooks guide (linked below) shows how to set up a hook; other tools put it in their own settings. The task, file and test in the video are illustrative.

## Chapters (long-form)
_n/a (reel)_

## Sources (for the description / pinned comment)
- [S8] Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia (UC Berkeley + Arena), "HarnessTax: How Much Does the Harness Matter for Coding Agents?" (2026-09-16): https://harnesstax.github.io/
- [S3] Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com (2026-04-02): https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- [S1] Mitchell Hashimoto, "My AI Adoption Journey" (2026-02-05): https://mitchellh.com/writing/my-ai-adoption-journey
- [S5] LangChain, "Improving Deep Agents with harness engineering" (2026-02-17), the "re-read, looks ok, stopped" failure: https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering
- [S4] Anthropic, "Effective harnesses for long-running agents" (2025-11-26): https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- [S6] LangChain, "The anatomy of an agent harness" (2026-03-10), "Agent = Model + Harness": https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
- [S2] OpenAI, "Harness engineering: leveraging Codex in an agent-first world" (2026-02-11), AGENTS.md as "a map, not a manual": https://openai.com/index/harness-engineering/
- [S7] Claude Code docs, "Automate actions with hooks": https://code.claude.com/docs/en/hooks-guide

## Hashtags
#AIAgents #HarnessEngineering #CodingAgents #AIEngineering #GenAI #SoftwareTesting #LearnAI #shorts

## Pinned comment (invites replies)
What mistake does your coding agent keep repeating? Tell me below and I'll reply with a rule and a check that would catch it. Sources for every number are in the description.

## Repurposing (long-form moments → reels)
- **Explainer seed (8–12 min):** a real repo with a rule file, a hook and a test, run live (an "our test" we'd have to run ourselves), plus HarnessTax read properly: cost per task, the Pareto frontier, why a minimal harness can keep up.
- **Short #2 (Myth-buster):** "Your Claude may not need Claude Code": too close to a ranking for this channel's locks; only with a fair test of our own.
- **Short #3 (Tips):** "Three hooks worth adding today" (format, tests, a pre-done checklist), from the hooks docs [S7] and Hashimoto's habit [S1]; needs its own research and content plan.
