# Style · remotion-spring (Remotion engine)

Built on what Remotion does best: `spring()` physics and `interpolate()`, as pure functions of the frame.
First reel: `studio/projects/jev-spring/remotion/Stage.tsx` (kit: `studio/remotion/src/styles/remotion-spring/kit.tsx`).
Personal use only (Remotion licence: individuals / companies ≤ 3 people).

## Look
- Light theme: cream `#FFF4E6`, violet tint `#ECE6FF`, mint tint `#E2F7EE`, sunshine `#FFE7A3` (one per chapter; `sections.json`).
- Saturated accents: coral `#FF5A4E` (fill) with coral ink `#D9352A` (text, borders on coral), violet `#6B4CFF`,
  mint `#22C993` (mint ink `#0B7F5E`), sunshine `#FFC83D`, sky `#3DB8FF`, red `#E8364A`; ink `#1B1433`. These are
  the `P` constants in `studio/remotion/src/styles/remotion-spring/kit.tsx`.
- Neo-brutalist cards: white, 6 px ink border, radius 36, hard 14 px offset shadow; pill chips with 5 px border + 6 px shadow.
- Giant Anton type with a hard ink drop shadow on hero words (JEV, $0.042).

## Motion
- Everything springs: entrances overshoot and settle (`springIn`: offset + scale + rotation), numbers scale-pop while counting,
  stamps land big and twisted (`stampIn`), bars and progress rings overshoot slightly.
- Kinetic type: titles and verdicts spring in word by word on the spoken word (`Words`).
- Section header: a kinetic title (progress pips + numbered "STEP n OF 4" only when the structure-check agent allows:
  Tutorial / Concept mechanism); stays while the step's content pushes.
- Transitions: panels push left / up / flip between steps (`Panel`, time-based like @remotion/transitions), under the engine's colour wipes.
- Every panel bobs gently (±6 px), so nothing is ever static.

## Sizes / safe zones
- Hero words Anton 170–230 px; chapter titles 90–120 px; chip text 40–48 px; body ≥ 30 px (names ≥ 40 px); non-hero
  type ≤ 3 % of the frame height.
- **Geometry** as reference-flat: stage zone y 220–1460; media clip box y 220–1260 (x 40–1040); captions from y 1555
  (81–90 %), bottom and lower-right button column clear. The engine draws captions and the colour blocks; the Stage
  draws only inside the zone.

## Camera
As reference-flat: zoom 1.3–2.6× to the action, then home; ≤ 1 move per 2.5 s, 6–10/min on stage scenes; nothing
zoomed below the zone. The engine's `Camera` wrapper (`remotion/src/engine/Camera.tsx`) reads `layout.camera` (the
beats' `"cam": [x, y, zoom]` written by `assemble`) and applies the same transform as the HyperFrames `#cam`; a Stage
that wants its own move calls `cam(t, moves)` from `engine/kit.tsx` with the same `{at, x, y, zoom, d}` keyframes.

## Sound
As reference-flat: one cue per visible action on its frame, chosen per beat in `scenes.json` (`"sfx"`; reveals default
to `pop`, `"sfx": "none"` silences; click / key / blip for UI replicas; ≥ 0.35 s apart, ≤ 4 per 2 s). Springs read
well sound-led: when the art direction's dial says so, `"music": "none"` + `"sfxLevel": 1.0`; otherwise the CC0 bed at
−36/−30 LUFS. The mix is `assemble`'s `mix.wav`, shared by both engines.

## Pace
As reference-flat: `templates/reel/pace.json` (2.3 w/s; scene ≤ 2.9, delivery ≤ 2.6 or `voice` fails; never speed
the voice); a spring overshoot counts as the change for its 2.5 s window only on the frame it lands.

## Export
1080×1920, 30 fps, H.264 (crf 18) + AAC 256k from `run.sh <slug> remotion` → `out/<slug>-remotion.mp4`; the mix is
already −14 LUFS, true peak ≤ −1 dBTP. Then `RM=1 run.sh <slug> qa watch review` and `RM=1 … deliver` (no `payoffs`
step: there is no DOM; the beat check comes with `qa`).

## Files
- `studio/remotion/src/styles/remotion-spring/kit.tsx`: `P` colours, `FT` fonts, spring configs (`BOUNCY` /
  `SNAPPY` / `SMOOTH`), `springIn`, `stampIn`, `countTo`, `card`, `Pill`, `Panel`, `Words`, `StepHead` (pips +
  title; `numbered` only when the structure check allows), `Illus`. A project's `remotion/Stage.tsx` imports it; the
  engine pieces (`Group`, `Chapter`, `Cta`, `cam`, `CAM_HOME`) come from `studio/remotion/src/engine/kit.tsx`.
- `sections.json`: the four tints; copy into the project's `"sections"`.
