# Animation plan · Why AI can't count letters (bad-visual fixture: 5 planted lint failures)

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
| s02 why it feels true | It answers like it read every word, so it must have, right? | blue | none: the strawberry chip holds; caption only | listens · right | no cam | pop | chat-message |
| s03 proof | Ask it how many r's are in strawberry. Models often get it wrong. | blue | none: the strawberry chip holds; caption only | Ask · strawberry · wrong | no cam | ding | count-up |
| s04 real picture | It sees chunks called tokens, about four characters each. | light | WIPE to light; the strawberry chip SLICES into three token chunks "str · aw · berry" on "chunks"; "TOKENS" STAMPS above on "tokens"; "~4" COUNTS UP beside the chunks on "four" | chunks · tokens · four | [540, 600, 1.15] | pop | marker-highlight |
| s05 fix | So for letters and counting, ask it to spell the word out first, or use code. | yellow | none: the strawberry chip holds; caption only | spell · code | no cam | click | code-typing |
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
- [ ] Visual plan passed (visual-plan agent)
- [x] Structure check passed (2026-10-16)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-16

## Visual plan check · 2026-10-16
```
VERDICT: CHANGES
depth: 1/1 shown · running object: 100 % of beats (named, but held still in 3) · none-rows: 3 · still: ~56 % (> 20 %: s02, s03, s05 held; longest hold 6 s) · cam: 2.2/min · hook: self 18 / blind 18
blocking:
- s02 1: "none: the strawberry chip holds; caption only" → a chat card BUILDS WORD BY WORD a reply that quotes the strawberry sentence on "answers"; a "?" chip STAMPS beside the chip on "right"
- s03 1: "none: the strawberry chip holds; caption only" → second none in a row, on the proof beat: the question TYPES OUT on "Ask"; "2" COUNTS UP (Anton 230 px) on "strawberry"; a red ✕ STAMPS on "wrong"
- s05 1: "none: the strawberry chip holds; caption only" → 3/6 none rows (50 %, limit 20 %): the chunks SLICE into letters on "spell", the r's FILL red; a code chip TYPES OUT `len("strawberry")` on "code"
- s02 2: s02 and s03 are the same held frame; the object must transform (fixes above)
- s02 4: cue "listens" → not in the spoken line ("It answers like it read every word…"): use "answers"
- storyboard #5 5: "Spell the word out letter by letter first, or write a bit of code" (14 words) → two chips: "Spell it out" · "Use code"
- hooks 6: "First frame (described):" is empty → copy the s01 "frame 0: …" description (navy; "AI READS WORD BY WORD" Anton 170 px yellow at y 260–460; the strawberry chip at y 520; "MYTH" chip at y 760)
- s02 7: 12 words with no change inside the beat (none row) → the two cues above
- s03 7: 13 words, none → the three cues above · s05 7: 16 words, none → the two cues above
improve:
- none
```
| Depth point (content-plan) | Row(s) | What moves |
|---|---|---|
| the word split into token chunks | s04 | the strawberry chip SLICES into "str · aw · berry" on "chunks"; "~4" COUNTS UP on "four" |

Hook re-score (blind): clarity 5 · curiosity 4 · accuracy 5 · frame 4 = 18 (self 18). Rule 9 grep: clean. Linter: 5 ✗ (cue words, none-rows, overlay, first frame, visual plan passed).
