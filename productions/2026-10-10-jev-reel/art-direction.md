# Art direction · Jev by TypeSafe AI

_Decided from the concept ("a model that only decides"), not from any reference video. The 90-second winner is a cream editorial page; Caleb is a black whiteboard; IBM a lightboard. Ours is none of these._

## Concept → visual world
- **Central metaphor:** a **decision gate**: a glowing glass ring in a dark signal room. Text goes in one side; typed answers come out as lit signal chips. No words are ever "written": things are *routed*.
- **Running object:** **ticket #4821** ("Charged twice this month. Refund me or I cancel."). It slides into the gate (s03), splits into three answer chips (s04), and comes back in the cascade (s10), where it takes the confident lane. Its id rides in the kicker of the numbers scenes ("#4821 ANSWERED IN…", "#4821 COST"), so it is on screen or named in ~70% of the video.
- **Mood:** air-traffic control at night · a fibre switch panel · a calm HUD.

## Palette (from the metaphor: signal lights in a dark room)
| Section role | bg | text | accent | accent2 | Why it fits the concept |
|---|---|---|---|---|---|
| main · `gate` (hook, what it is, demo) | #0A1022 signal navy | #E8EEFF | #FFC24A signal amber (a decision lighting up) | #4DF2C2 mint (confident) | the control room; amber = "decided" |
| alt · `proof` (speed, price, independent test) | #0B1C24 deep teal-navy | #E6F6F4 | #4DF2C2 mint | #7C9CFF blue | numbers read as instrument readouts |
| highlight · `caution` (the catch) | #1C0F26 deep plum | #F6EAF4 | #FF5C8A warning pink | #FFC24A amber | the warning light |
| alt · `route` (cascade, proof, recap, CTA) | #121A3A indigo | #E8EEFF | #7C9CFF electric blue | #4DF2C2 mint | two lanes of traffic; calm resolution |

These go into `scenes.json` → `"sections"` and each scene's `"section"`.

## Motion language
- **Primary verb set:** SLIDES IN (ticket) · SCANS (beam through the gate) · SPLITS / LIGHTS UP (answer chips) · COUNTS UP (readouts) · STAMPS (verdict) · ROUTES (cascade lanes).
- **Continuous spans:** span A = s03–s04 (ticket → gate → three chips, one unbroken Manim clip); span B = s10–s11 (cascade: the ticket stream forks into "confident → done" and "unsure → LLM", then the result readouts count up); clip C = s07 (cost bars).
- **Transitions:** primary = section colour wipe (engine default) at each section change; accent = a hard cut into the `caution` plum on "The catch?".
- **Ambient motion:** the gate ring slowly rotates; HUD grid drifts; readouts flicker their last digit once during holds.
- **Music:** `cc0/fresh-focus` (bright, steady; good under explanations), ducked under the voice.

## Checks
- [x] Palette and layout differ from every reference video the user gave (tokenization reel used void/core/signal with mint/pink; ours is amber-led navy + plum warning + indigo routing)
- [x] Every beat in the storyboard has a motion verb for each element
- [x] The running object appears in ≥ 60% of the video (on screen in s03–s04, s10; named in kickers s05–s07, s11)
- [x] At least 2 visual metaphors beyond text chips (the decision gate; the forked routing lanes; the instrument readouts)
