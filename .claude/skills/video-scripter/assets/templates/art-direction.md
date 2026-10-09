# Art direction · <Topic>

_Decide the look **from the concept**, never from a reference video. Learn from references how they move, not how they look._

## Concept → visual world
- **Central metaphor** (one image the whole video lives in): _
- **Running object** (one thing that stays on screen and transforms through the sections): _
- **Mood** (2–3 references in words, not hex codes): _

## Palette (from the metaphor; **modern/futuristic**: deep saturated bases, electric accents, glass and glow; no pastel or cartoon; tint neutrals toward the accent; no pure #000/#fff)
| Section role | bg | text | accent | accent2 | Why it fits the concept |
|---|---|---|---|---|---|
| main | | | | | |
| alt (for pattern breaks) | | | | | |
| highlight (the reveal / why it matters) | | | | | |

These go into `scenes.json` → `"sections"` (overrides) and each scene's `"section"`.

## Motion language
- **Primary verb set** (how things enter, transform, exit; e.g. SLICE · SLIDE · STAMP): _
- **Continuous spans** (which beats are one unbroken animation of the running object): _
- **Transitions:** primary _ (60–70% of section changes), accent _ (the climax)
- **Ambient motion** (one per scene during "breathe"): _
- **Music** (from `studio/templates/reel/audio/music/cc0/manifest.json`, by mood): _

## Checks
- [ ] Palette and layout differ from every reference video the user gave
- [ ] Every beat in the storyboard has a motion verb for each element
- [ ] The running object appears in ≥ 60% of the video
- [ ] At least 2 visual metaphors beyond text chips
