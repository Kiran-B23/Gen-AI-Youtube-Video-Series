# Reel script · REA ("Reverse Engineer Anything")

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
