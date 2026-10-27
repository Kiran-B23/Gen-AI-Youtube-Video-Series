# Art direction · <Topic>

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`) _(another named style only if the user asked)_
- **Accent that leads** (blue / yellow / light / navy for the hook and verdict): _
- **Dials:** realistic | stylised · image-led | sound-led _(pick one of each: a Launch / Tutorial replica is realistic; a Concept metaphor is stylised; sound-led when the sound *is* the content, e.g. a pan test)_

## Reference board (style lock)
_3–6 images or frames whose **look or motion** this video should match: the house benchmark plus anything the user sent.
Keep the files in git-ignored `productions/<folder>/yt/refs/` (the repo is public); list them here. Before building,
Claude reads them and writes "what to take" (layout, density, motion), never "what to copy"._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object, chapter cards, flat blocks, giant type |
| 2 | | |

## Concept → visual world
- **Central metaphor** (one image the whole video lives in): _
- **Running object** (the one thing that is typed, cut, checked, routed, counted through every step): _
- **Steps** (3–6 chapter titles, "01 Read the ticket"): _

## Replica (Launch / Tutorial only)
_The running object is a replica of the real UI, not a metaphor. Fill every line; a Concept video deletes this block._
- **Source screenshots** (official screenshots / docs only, files in git-ignored `yt/refs/`): _
- **Lifted:** fonts _ · colours _ · layout _ (what is reproduced exactly, what is simplified)
- **Waits cut:** which pauses are shortened, each declared on screen with a "sped up" chip: _
- **Rights:** official screenshots or docs only; no other creator's capture; labelled "illustrative" where simplified: _

## Locks (must never happen)
_Hard limits for this video, e.g. "no logos", "never show a real person's face", "no number without a source",
"the running object never leaves the screen in steps 1–3"._
- _

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs** (from the house vocabulary: TYPES OUT · SCANS · SLICES · STAMPS · COUNTS UP · FILLS · ROUTES · RACES · SHRINKS AWAY · BUILDS WORD BY WORD · PUSH IN): _
- **Section colour per chapter** (`dark` / `blue` / `light` / `yellow`, changed at every chapter): _
- **Music** (from `studio/templates/reel/audio/music/cc0/manifest.json`, by mood): _

## Checks
- [ ] House style named; palette from its `sections.json`
- [ ] Reference board lists what to take from each, nothing copied
- [ ] Running object appears in ≥ 60 % of the video
- [ ] Locks written (the visual-plan agent greps them across the whole folder; no self-tick needed)
