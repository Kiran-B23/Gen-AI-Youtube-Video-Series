# Content plan · REA ("Reverse Engineer Anything")

_Written by the `content-plan` agent on 2026-10-14 after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file. Format: faceless reel, ~85–100 s, Launch archetype._

**Primary sources re-read on 2026-10-14:** the README (github.com/morluto/rea, raw README.md), DISCLAIMER.md, and the
DX-Ball case study (rea.tools/showcase/dx-ball/). The reconstruction repo (github.com/N0zoM1z0/dx-ball, MIT) exists and
describes itself as "backed by original-x86 differential tests and pinned MSVC byte-exact oracles".
**No "our test":** we did not run REA. Every demo fact is the project's own showcase → say "in their own showcase".

**Corrections to research.md found while verifying (the script must use the verified wording):**
1. "omitted the crucial integer parameter" is **not on any primary page**. The showcase says the first pseudocode
   declared the function with no input (`FUN_00406400(void)`), and the instruction view "exposes the integer input
   missing from the decompiler view". The README calls it "incomplete pseudocode". Use **"incomplete" / "missing the
   input"**, not "wrong" and not the "crucial parameter" quote.
2. The checks are run by the **reconstruction project**, not by REA: "REA supplies the instructions, callers and data
   reads; the reconstruction project implements and tests the result." Say "the rebuilt function passes…", not "REA
   proved…".
3. The showcase does not name which decompiler (Ghidra / Hopper / IDA) produced the draft. Don't name one for DX-Ball.

## Viewer's question
"Everyone says this tool can 'reverse engineer anything'. What does it actually do, is it real, and can I use it?"

## Core message
REA lets your AI agent rebuild one feature's logic from compiled software, with evidence you check, not a clone.
_(19 words)_

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **What it is, by what it does:** an open-source add-on (an MCP server + CLI) that gives a coding agent (Claude Code, Codex, Cursor, Gemini CLI…) tools to inspect an app or program **without its source code**, trace how one feature works, and hand back the evidence. It connects to the decompilers experts already use (Hopper, Ghidra or IDA for native programs); it isn't a new decompiler. | README [S1] [S2] [S4] | company claim (project README) |
| 2 | **The loop:** the agent asks a question → REA inspects and traces → returns findings *with their evidence* (code, callers, data) → the agent asks follow-ups, explains, or writes and tests its own version. "Results include the evidence and limitations behind each conclusion." | README [S2] | company claim |
| 3 | **The demo, step by step (DX-Ball, a 1996 Windows brick-breaker):** question "how does a brick's position become left/right sound?" The decompiler's first draft is **incomplete**: it shows the function taking **no input**. REA's instruction view shows an integer input the draft left out; that mismatch is the agent's reason to keep digging. It follows the caller (the brick's screen position, 20 + 30 × the brick's column) and reads the two constants from the file. | rea.tools/showcase/dx-ball [S6] | company claim (project showcase; the reconstruction repo is public) |
| 4 | **The recovered formula** (the one thing the viewer should be able to picture): take the screen position (0–640) → × 1.5625 → − 500 → × the pan scale (1.0 at start) → round to a whole number. At scale 1: **−500 at the left edge, 0 in the centre, +500 at the right**. | showcase [S6] | company claim (checkable) |
| 5 | **The check, two ways:** the rebuilt C function returns the same value as the original x86 code in **3,205 cases** (every position 0–640 at five pan scales: 0, 0.5, 1, 20, −1; 641 × 5 = 3,205), and, compiled with the same-era compiler (VC4.0), it reproduces **all 63 bytes** of the original function. One function, not the whole game. | showcase + README Showcases [S6] | company claim (tests in the public reconstruction repo) |
| 6 | **Logic, not the original code; and only on software you may examine** (the catch, below): REA "does not recover original source code"; lawful uses are things like education, preservation, interoperability, security research, and "software you own or are authorized to examine". | README; DISCLAIMER.md [S9] [S10] | company claim (official project docs) + independent [S10] |

Verdict line it builds to: _for focused questions about software you're allowed to look inside, it's an evidence tool, and
the evidence is the part you check._ (DISCLAIMER: "Review the underlying evidence and verify consequential conclusions" [S8].)

## Leave out
| Item | Why it's out |
|---|---|
| Star counts (215K today), "#1 on GitHub", the growth curve, repo creation date, version numbers (REA 4.1.0, "seven versions in nine days") | trivia; the hook already carries the "why care" with a checkable result. If one "everyone's talking about it" phrase is needed, say "the viral repo" with no number |
| Install command (`npx rea-agents setup`), Node versions, the 20+ format table, JADX/JDK | setup/tutorial detail; one phrase of range ("apps, programs, websites") is enough |
| Setup needs Ghidra / Hopper / IDA as a separate warning | not material to try/skip (Ghidra is free; JS/.NET need no engine); folded into point 1 as "it plugs into the decompilers experts already use" |
| Privacy (analysis is local, but results go to your model provider [S5]) | real but secondary for this viewer (students on their own or permitted software); a reel holds one catch. Keep for the long-form explainer |
| "Young, fast-changing, local bridge is not a sandbox" [S12] | single-source press, needs a longer caveat than it's worth |
| Notion clipboard showcase [S7] | one running example only; a live commercial app muddies the permission line |
| Adobe-alternative / "AI cloned app X" / bank-hacking stories [S13] | unsupported by primary sources; rival/viral news, off-message; locked out in the brief |
| "Software is dead / everything is open source now" framing | the hype we answer, not a claim we make |
| Using it on a paid app, private APIs, DRM, licence checks, anti-cheat, game cheats | dual-use: never shown, named or implied as a use, not even as a "don't" example with steps |
| Memory addresses, register names, instruction mnemonics as readable content (`[EBP+8]`, `FILD`, `0x406400`) | too deep for the viewer and closer to a how-to than needed; on screen at most as an unreadable "illustrative" assembly texture with one row lit |
| The rest of the DX-Ball project (55 functions, 45,380 comparisons) | true but not about the core message; risks implying the whole game is rebuilt |
| Who made REA, the decompiler history, the creator's interests | trivia |

## Catch decision
**Catch:** include
**Why:** material and hidden by the hype. The README's own headline pitch is "See a feature in an app that you want in your
own product? … build a version for your project", and the viral videos say "clone any software". For a student this is the
decision that matters: using it on someone else's app can break that app's licence or local law, and output gives no rights.
It is sourced in the project's own official DISCLAIMER.md.
**Exact point (one line):** "Only use it on software you own or are allowed to examine: licences and local laws can forbid
reverse engineering, and the output gives you no rights to the original." [S9: "debugging or auditing software you own or are
authorized to examine" · "Reverse engineering may be restricted in your jurisdiction or by the license of the software you
analyze" · "Obtaining source-like output … does not grant rights to the original program"]

Not the catch (and why):
- **Raw output can be wrong/incomplete** → already *shown* inside the demo (the draft missing its input, caught via the
  instructions); it becomes the verdict's "check the evidence" [S8], not a separate "but" beat.
- **Privacy** and **setup** → see Leave out.

Tone for the catch: calm and serious, no joke, no fear-mongering, no list of forbidden techniques.

## Running example
**DX-Ball's sound pan:** "Hit a brick on the left, and the sound comes from the left. How does the game decide that?"
followed from the question → the incomplete draft → the missing input found → the formula → 3,205 / 3,205 and 63 / 63.
Why it fits: a feature anyone can picture and hear; one small function, so the whole arc (ask → evidence → mismatch caught →
rebuild → check) fits a reel; it's lawful (a 1996 game, a preservation/education reconstruction that is public and MIT); and it
models the right use for the viewer: one focused question, answered with evidence, then checked. Drawn as a generic
brick-breaker in house style, no game art.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "reverse engineer **anything**" / "it can read any app" | Name/tagline only; in practice a list of target types, each with its own requirements | ❌ as our claim. ✅ "It's called Reverse Engineer Anything. In practice: apps, native programs, websites and more." | README [S1] [S3] |
| "**without source code**" | README: "It can inspect the app without its source code" | ✅ "It looks inside a program without its source code." | README [S1] |
| "No source code. Just a compiled game file." (hook) | The case study starts "from its executable" | ✅ safe | showcase [S6] |
| "the pseudocode was **wrong**" / "**omitted the crucial** parameter" | "incomplete pseudocode"; declared `(void)`; "the integer input missing from the decompiler view" | ❌ "wrong", ❌ the "crucial parameter" quote. ✅ "The decompiler's first draft was incomplete: it showed no input at all." | README Showcases; showcase [S6] |
| "the agent **caught** it" | "That discrepancy gave the agent a concrete reason to keep investigating" | ✅ "The agent noticed the instructions didn't match the draft, and kept digging." | showcase [S6] |
| "**passed all** 3,205 tests" / "3,205 out of 3,205" | "passes 3,205 original-x86 cases", covering every position 0–640 at five scales (641 × 5 = 3,205) | ✅ "It matches the original in all 3,205 test cases", labelled "in their own showcase", and tied to **one function** | showcase + README [S6] |
| "**The AI's rebuild** passed…" (hook) | The agent used REA's results "to write the C function"; the reconstruction project maintains and tests it | ✅ only if "one function / one formula" lands by beat 2–3 (don't imply the whole game). ✅ "an AI agent's rebuild of one function" | showcase [S6] |
| "**identical** / byte-for-byte" | "reproduces all 63 compiled function bytes" with the pinned VC4.0 compiler, "after applying the reviewed relocations" | ✅ "Compiled the old way, it produces the same 63 bytes as the original function." ❌ "the same program" | showcase [S6] |
| "**proves** / proof / guaranteed correct" | The page says "checks": "passes two checks" | ❌ "proves", ❌ "guaranteed". ✅ "checked two ways", "matches" (the brief's "proof/proven" wording must change) | showcase [S6]; DISCLAIMER [S8] |
| "REA proved / REA tested it" | "REA supplies the instructions, callers and data reads; the reconstruction project implements and tests the result" | ✅ "The rebuilt function was then tested against the original." | showcase [S6] |
| "**clone** any app" / "copy any feature" | "does not recover original source code"; DISCLAIMER won't help "copying proprietary software or reproducing its protected code and assets" | ❌ never. ✅ "It recovers how a feature works, not the original code." | README; DISCLAIMER [S9] [S10] |
| "**free**" | MIT licence; the README never says "free"; you still need an AI agent (often paid) and, for some targets, commercial tools (IDA/Hopper) | ❌ "free" alone. ✅ "open source" | README [S1] [S4] |
| "**runs locally / private**" | "Analysis runs locally", but "its model provider has its own data policy" | ❌ "private" / "nothing leaves your machine". Not in the reel (left out); if said: "the analysis runs on your machine" | README FAQ [S5] |
| "it's **legal** to reverse engineer old games / it's legal" | "may be restricted in your jurisdiction or by the license" | ❌ "it's legal". ✅ the catch line above | DISCLAIMER [S9] |
| "**never** guesses / always shows evidence" | "results include the evidence and limitations behind each conclusion"; "may be incomplete or incorrect" | ❌ "never wrong". ✅ "It hands back the evidence with each answer, so you can check it." | README [S2]; DISCLAIMER [S8] |
| "the **first** AI reverse-engineering tool" / "a new decompiler" | AI + Ghidra/IDA MCPs existed before REA; REA uses existing Hopper/Ghidra/IDA | ❌. ✅ "It connects your agent to the decompilers experts already use." | README [S4]; inspiration (OALabs, Ghidra MCP tutorials) |
| "a 1990s game" | "the 1996 Windows game" | ✅ "a 1996 Windows game" / "a 90s game" | showcase [S6] |

**Grep before script-review:** "wrong", "proof/proves/proven", "crucial", "omitted", "clone" (other than "not a clone"),
"free", "anything" (other than the name) appear in `brief.md` (tone, angle, must-include rows) and `hooks.md`. Fix them in
the whole folder, not just the script (learnings 2026-10-13, LangGraph).

## Depth (what the viewer must see, not just hear)
- **The loop as a picture:** agent → REA → decompiler tools → evidence cards (code, caller, data) → back to the agent, which
  asks the next question. Shown once, then the demo runs on it.
- **The mismatch:** the draft function with an empty input slot next to the instruction view with one row lit showing a
  number going in. The viewer sees *why* the agent kept digging (illustrative, no readable addresses).
- **The formula as a slider:** a brick's position 0 → 640 flowing through × 1.5625 → − 500 → × scale → whole number, with the
  output needle swinging −500 (left speaker) / 0 / +500 (right speaker). This is the payoff of the running example.
- **The check:** a counter filling 0 → 3,205 against the original (the hook's counter returns), then 63 / 63 bytes lighting
  up. Labelled "in their own showcase"; "one function" visible on screen.

## Safety (dual-use)
Mechanisms stay at the level of "ask → evidence → rebuild → check". No install or run commands on screen, no addresses or
instructions a viewer could follow, no commercial app as a target, no DRM / licence / anti-cheat / private-API mention as a
use case. The permission line is said once, plainly, as the catch.

## Status
- [x] Content plan ready (2026-10-14)
