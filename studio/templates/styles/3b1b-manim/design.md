# House style · 3b1b-manim

The look of a 3Blue1Brown explainer, made the way 3Blue1Brown makes it: with **Manim**. Origin: a reference reel
(user, 2026-10-12) whose method was "ask Claude to explain the concept as an explainer video in the style of
3Blue1Brown" — Claude writes Manim. Pilot: `studio/projects/_archive/jev-3b1b/` (`shorts/styles/jev-4-3b1b.mp4`).

## In one line
A calm near-black board where shapes **transform into each other** to explain a mechanism; serif type; the visual
leads, the voice explains.

## Rules
- **Board:** flat near-black `#1C1C1C` everywhere (one section, `"flat": true`); no glow, vignette or grain. Clips are
  transparent, so the board colour is the engine's section colour (`sections.json`).
- **Palette (Manim's own constants):** `BLUE_C` (the model, the main object) · `YELLOW_C` (the thing to look at,
  titles) · `TEAL_C` / `GREEN_C` (good, confident) · `RED_C` (wrong, misses) · `GREY_B/C/D` (scaffolding, labels).
  White text. One accent per idea.
- **Type:** serif (`Noto Serif`, via `S()`) for titles, labels and numbers; `JetBrains Mono` (`M()`) only for code/JSON/ids.
  No LaTeX on this machine: never `MathTex`/`Tex`/`DecimalNumber`/`Integer`/`BraceLabel`; count with `counter()` /
  `count_to()` (serif text driven by a ValueTracker). `Brace`, `NumberLine(include_numbers=False)`, `Cross` work.
- **Motion:** objects transform rather than cut (`morph_shape`: a grid collapses into a bar, a dot travels a number line);
  text changes by cross-fade (`becomes`), never glyph-morphing `Transform` on text. Verbs: `Create`, `Write`,
  `GrowArrow`, `GrowFromCenter`, `GrowFromEdge`, `Indicate`, `Circumscribe`, `MoveAlongPath`, `AddTextLetterByLetter`.
- **Composition:** one idea per beat, centred, generous whitespace; a section header top-left (yellow serif title
  with an underline; numbered "Step n of 4" italic above it only when the structure-check agent allows: Tutorial /
  Concept mechanism). Mock UIs say "illustrative".
- **Always alive:** `B1BScene` turns every wait longer than 1.4 s into a gentle whole-frame breath (QA motion), and the
  first element of every clip is on screen from frame 1 (QA openings).
- **Sizes (1000×1260 clip, ~70 px/unit):** titles 96–110, labels 44–56, big numbers 120–150.
- **Geometry** as reference-flat: stage zone y 220–1460; media clip box y 220–1260 (x 40–1040); captions from y 1555
  (81–90 %), bottom and lower-right button column clear. This style's spanned clips are taller than the default media
  clip box: the pilot's `box [40, 190, 1000, 1260]` runs y 190–1450, i.e. the whole stage zone (plus the kicker row
  for the section header). Whatever the box, the clip never draws below y 1460 or under the captions.

## Files
- `b1b_kit.py`: `B1BScene`, `S`, `M`, `header`, `card`, `node`, `counter`, `count_to`, `becomes`, `morph_shape`,
  `check`, `cross`, `hold`, `illustrative`, palette constants. Project clips import it through their `clips/kit.py`.
- `sections.json`: the single `board` section.

## How a reel is built
Media scenes with Manim builds, one **spanned clip per chapter** (hook · step 1 · step 2 · step 3 · step 4 + verdict +
CTA), box `[40, 190, 1000, 1260]` (the whole stage zone, see Geometry), size `[1000, 1260]`, quality `m` (30 fps). Every reveal is placed on its spoken word
with `w("word", scene="sNN")`. Five clips render in parallel in ~7 min on this laptop (draft quality `l`: ~3 min).

## Camera
Manim clips carry their own camera: `self.camera.frame` moves (a `MovingCameraScene` push-in on the object being
explained, then back) follow the reference-flat rule: zoom 1.3–2.6×, every move lands on the action then returns,
≤ 1 move per 2.5 s, 6–10/min, nothing pushed out of the clip box. The engine's `#cam` is not used on `media` scenes.

## Sound
As reference-flat, keyed to the clip's reveals through the scene's beats (`"sfx"` per beat; `tick` on a count step,
`pop` on a reveal, `ding` when a number lands, `"sfx": "none"` to silence; ≥ 0.35 s apart, ≤ 4 per 2 s). 3b1b is
image-led: keep the CC0 bed at −36/−30 LUFS; a sound-led build (`"music": "none"`, `"sfxLevel": 1.0`) is the exception.

## Pace
As reference-flat: `templates/reel/pace.json` (2.3 w/s; scene ≤ 2.9, delivery ≤ 2.6 or `voice` fails; never speed the
voice). `B1BScene`'s breath keeps a wait alive, but a real change every ≤ 2.5 s is still the rule.

## Export
As reference-flat: 1080×1920, 30 fps, H.264 yuv420p + AAC, −14 LUFS, true peak ≤ −1 dBTP;
`run.sh <slug> clips payoffs render qa watch review` → `deliver` (clips re-render only when their inputs change).

## Best for / weaker for
Mechanisms and maths-like ideas (tokens → vectors, attention, routing, lag). Weaker for launch/news numbers and verdicts,
where reference-flat or remotion-spring read better on a phone; mix: hook and verdict flat, the mechanism step in 3b1b.
