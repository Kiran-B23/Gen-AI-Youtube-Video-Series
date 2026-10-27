# Remotion engine (optional, personal use)

A second renderer for the same studio projects. **HyperFrames stays the default engine.** This one exists for the
repo owner's own use: Remotion's free licence covers individuals (and companies up to 3 people); rendering for a
larger company needs a paid Remotion company licence. Don't use it for team or company production without one.

## How it fits
`tools/run.sh <slug> validate voice assemble` is unchanged: `assemble` writes `build/layout.json` (scenes, beats with
el/check/sfx/cam, captions, wipes, palette, `camera[]`, `sfx[]`, `caption`, `stage_zone`) and `hf/assets/mix.wav`
(voice + ducked music + SFX at −14 LUFS). Both engines read those, so voice, timing, captions, camera and audio are
identical; only the stage is written twice (HTML/GSAP vs React).

```
tools/run.sh <slug> remotion                    # -> out/<slug>-remotion.mp4 only (nothing reaches shorts/ yet)
tools/run.sh <slug> remotion-studio             # Remotion Studio: scrub the timeline in the browser
RM=1 tools/run.sh <slug> qa watch review        # the same gates on the Remotion file (sheets in out/watch-remotion/,
                                                #   findings into projects/<slug>/review.md)
RM=1 tools/run.sh <slug> deliver                # -> shorts/<slug>-remotion.mp4 when qa.json is clean for that MP4,
                                                #   watch-remotion.json exists, review.md has no open row and is ticked
```
There is no `payoffs` step for Remotion (no DOM to seek): the beat check is the image-mode one inside `RM=1 qa`.

## Writing a stage: `projects/<slug>/remotion/Stage.tsx`
A React component that draws the whole reel as a pure function of time (no state, no CSS animations):
- `useStage()` → `{ t, S, D, END, at, W, layout }`: same names as the HyperFrames kit (`at("s04/pip")` = a beat from
  scenes.json, `W("s10", "jev's")` = any spoken word).
- `engine/anim.ts`: `pop`, `slam`, `count` (null before it starts, so never a "0"), `typed`, `prog`, `tween`, `fadeOut`, eases.
- `engine/kit.tsx` (house style reference-flat): `Group`, `Chapter` (numbered only when the structure check allows),
  `chapterEnd`, `Progress`, `Chip`, `Stamp`, `Cta`, `cam`, `CAM_HOME`, colours `C`, fonts `F`.
  `styles/remotion-spring/kit.tsx`: the spring style's `P` colours, `springIn`, `stampIn`, `Words`, `Panel`.
- `engine/Camera.tsx`: the engine wraps the Stage in `<Camera>`, which reads `layout.camera` (every beat's
  `"cam": [x, y, zoom]`, written by `assemble`) and applies the HyperFrames `#cam` transform:
  `translate(540 − x·z, 840 − y·z) scale(z)`, origin 0 0, eased in-out over `d` from the previous move; home =
  (540, 840, 1). A stage that drives its own moves uses `cam(t, [{at, x, y, zoom, d}, …])` from `engine/kit.tsx` on
  its own wrapper and leaves beat `"cam"` unset for those scenes. Same rules as the HyperFrames kit: zoom 1.3–2.6×,
  every move lands on the action then returns home, ≤ 1 move per 2.5 s, nothing zoomed below the stage zone.
- The engine draws section blocks, wipes, camera, captions and audio; the stage draws only the visual, inside the
  stage zone y 220–1460 (captions from y 1555).
Pilot: `projects/laya/remotion/Stage.tsx` (port of `projects/laya/stage/`); spring style: `projects/_archive/jev-spring/`.

Typecheck: `cd studio/remotion && npx tsc --noEmit` (project stages under `../projects/*/remotion` resolve `react`
only when run from here).
