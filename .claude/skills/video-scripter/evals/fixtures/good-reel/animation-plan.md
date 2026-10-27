# Animation plan · Why AI can't count letters (fixture)

_For each beat: what the picture DOES to the running object, or "none". Each step is built as its own 4–10 s piece._

**Running object:** the word "strawberry" as a mono chip (JetBrains Mono 50 px, white card, 4 px ink border) · **Steps:** none (Myth-buster: plain section titles) · **House style:** reference-flat

## First frame (frame 0, before a word is spoken)
Navy. The strawberry chip sits centred at y 520 (mono 50 px, white card). Above it, giant Anton 170 px yellow "AI READS WORD BY WORD", each word in its own box with a thin gap, y 260–460. Below the chip a small "MYTH" chip (mono 40 px, translucent) at y 760. Nothing moves yet; the claim reads on mute.

## Hook direction (pick one, or write your own)
- **A (default, used):** the sentence boxes on screen at frame 0; a red strike SLICES through "WORD BY WORD" on "doesn't".
- **B:** the strawberry chip alone; "2" COUNTS UP under it, then a red ✕ STAMPS; "IT CAN'T COUNT." TYPES OUT.
- **C:** a magnifying glass PUSHES IN on the chip and finds token seams instead of letters; "NOT LETTERS." SLAMS.

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | cam | sfx | Block to adapt (registry, optional) |
|---|---|---|---|---|---|---|---|
| s01 hook | AI reads your sentence word by word. It doesn't. | dark | frame 0: the strawberry chip centred (y 520) under giant "AI READS WORD BY WORD" (Anton 170 px, yellow, y 260–460) and a "MYTH" chip (y 760); on "reads" the word boxes LIGHT one by one left to right; on "doesn't" a red strike SLICES through "WORD BY WORD" | reads · doesn't | no cam | stamp | headline-slam |
| s02 why it feels true | It answers like it read every word, so it must have, right? | blue | WIPE to blue; a chat card (y 300–900, "illustrative") BUILDS WORD BY WORD a reply that quotes the strawberry sentence on "answers"; on "right" a "?" chip STAMPS beside the strawberry chip | answers · right | no cam | pop | chat-message |
| s03 proof | Ask it how many r's are in strawberry. Models often get it wrong. | blue | the question "how many r's in strawberry?" TYPES OUT in the chat card on "Ask"; the reply "2" COUNTS UP (Anton 230 px) on "strawberry" (exception: 2 is the model's wrong answer, no spoken word says it); a red ✕ STAMPS over the 2 on "wrong" | Ask · strawberry · wrong | no cam | ding | count-up |
| s04 real picture | It sees chunks called tokens, about four characters each. | light | WIPE to light; the strawberry chip SLICES into three token chunks "str · aw · berry" on "chunks"; "TOKENS" STAMPS above on "tokens"; "~4" COUNTS UP beside the chunks on "four" | chunks · tokens · four | [540, 600, 1.15] | pop | marker-highlight |
| s05 fix | So for letters and counting, ask it to spell the word out first, or use code. | yellow | WIPE to yellow; the strawberry chunks SLICE again into single letters "s t r a w b e r r y" on "spell", the three r's FILL red; on "code" a mono chip TYPES OUT `len("strawberry")` → 10 under the letters | spell · code | no cam | click | code-typing |
| s06 CTA | Which AI myth should I test next? Tell me in the comments. | dark | WIPE to navy; the strawberry chip SHRINKS AWAY top-left; the question BUILDS WORD BY WORD on "myth"; "Follow for more AI breakdowns" pill SLIDES UP on "comments" | myth · comments | no cam | whoosh | kinetic-center-build |

## Build briefs (one per step; each can be built in parallel)
### Hook → proof · s01–s03 (~11 s)
Navy frame 0 as described. On "reads" the four word boxes light left to right; on "doesn't" a red strike slices through
"WORD BY WORD". s02 wipes to blue; a chat card builds a reply word by word; "?" stamps on "right". s03: the question types
out, "2" counts up at 230 px, ✕ stamps on "wrong". Exit: blue, chat card with ✕.
### Real picture → fix · s04–s05 (~12 s)
Light: the chip slices into "str · aw · berry" on "chunks" (0.2 s apart), "TOKENS" stamps, "~4" counts up on "four".
Yellow: the chunks slice into letters on "spell", the r's fill red; a code chip types `len("strawberry")` on "code".
Exit: yellow, letters + code chip.
### CTA · s06 (~4 s)
Navy; chip shrinks away; question builds word by word; follow pill slides up. Last frame navy like frame 0.

## Approval
- [x] Visual plan passed (2026-10-16)
- [x] Structure check passed (2026-10-16)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-16

## Visual plan check · 2026-10-16
```
VERDICT: PASS
depth: 1/1 shown · running object: 100 % of beats · none-rows: 0 · still: ~4 % (longest hold 1.0 s, s02 before "answers") · cam: 2.2/min (s04 push-in on the slice; the rest "no cam" on a 27 s reel, below the 6–10 target but every move has a reason) · hook: self 18 / blind 18
blocking:
- none
improve:
- none
```
| Depth point (content-plan) | Row(s) | What moves |
|---|---|---|
| the word split into token chunks | s04 | the strawberry chip SLICES into "str · aw · berry" on "chunks"; "~4" COUNTS UP on "four" |

Hook re-score (blind, from the line + first frame): clarity 5 · curiosity 4 · accuracy 5 · frame 4 = 18 (self 18).
Rule 9 grep ("logo", "AI can't read letters") across the folder: hits only in the lock itself and the claim-safety row (never-say contexts). Linter: 0 ✗.
