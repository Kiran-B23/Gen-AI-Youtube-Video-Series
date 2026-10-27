# Art direction · Laya, the free local Jev rival

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), v2 (2026-10-11). The v1 dark palette below is kept for history.
- **Accent that leads:** navy hook, blue for "what it is" and the comparison, light for the demo, yellow for speed and the verdict.

## Reference board (style lock)
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object through every section, flat blocks, giant type (its numbered steps fit a Concept mechanism; Laya is Launch → section titles + colour change) |
| 2 | `studio/projects/jev-reel/stage/` (pilot in the house style) | ticket as running object, bar race, stamps |

## Locks (must never happen)
- No numbered steps, "STEP n OF m" or step progress bar (Launch archetype; structure-check 2026-10-12).
- No logos (Jev, Laya, Hugging Face): names as plain text only.
- Every on-screen number comes from `our-test/result.json` or a sourced claim in `research.md`; the terminal shows only lines our run really printed.
- The ticket stays the running object through the "Ask it" and "Laya vs Jev" sections.

## v1 (superseded)

## Concept → visual world
- **Central metaphor:** a **local decision gate**: a glass triage console sitting on your own machine. A message enters,
  question tags lock onto it, and probability bars charge up; confident answers pass through the gate, unsure ones divert to a "human" lane.
- **Running object:** the **ticket card** ("I was charged twice. Refund me, or I cancel."). It's sketched as a generic
  message in span A, becomes the real ticket in span B, grows answer bars, and returns as a mini card in the comparison and recap.
- **Mood:** an engineer's local dashboard at night · a HUD on a terminal · quiet confidence vs a distant cloud.

## Palette (modern/futuristic; from "local and open" vs "someone else's cloud")
| Section role | bg | text | accent | accent2 | Why it fits the concept |
|---|---|---|---|---|---|
| main `local` | #0B1A22 | #E6F4F1 | #4DF2C2 mint | #7C9CFF | teal-navy = your own machine; mint = free/open/confident |
| alt `cloud` | #15112E | #EDEBFF | #FF5C8A pink | #7C9CFF | indigo night sky for the paid cloud and the head-to-head |
| highlight `catch` | #1E1608 | #FFF4DD | #FFD166 amber | #4DF2C2 | amber warning light for the honest catch and the unsure answers |

These go into `scenes.json` → `"sections"`: `local`, `cloud`, `catch`.

## Motion language
- **Primary verb set:** SLIDES IN (ticket) · LOCKS ON (question tags) · CHARGES UP (probability bars) · ROUTES (pass / divert) · STAMPS (catch)
- **Continuous spans:** A = s02–s03 (an empty decision console builds: message → questions → % bars); B = s05–s07 (the real ticket drops into the console, bars charge, billing passes, churn wobbles at 48% and diverts)
- **Transitions:** primary = the section wipe (local → cloud → catch); accent = the punch-in on the 48% coin flip (s07)
- **Ambient motion:** slow drift on the console glass, a scan line sweeping the ticket, bars breathing ±1% while holding
- **Music:** `cc0/fresh-focus` (bright, steady; good under explanations)

## Checks
- [x] Palette and layout differ from every reference video (the watched winners use black whiteboards, game footage and console screenshots)
- [x] Every beat in the storyboard has a motion verb for each element
- [x] The running object (ticket / console) appears in ≥ 60% of the video (s02–s08 and the recap: ~65%)
- [x] At least 2 visual metaphors beyond text chips (the decision console with charging bars; the pass/divert gate; the coin-flip wobble)
