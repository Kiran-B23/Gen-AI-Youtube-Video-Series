# Clip recipes (media scenes)

Clips are written into `studio/projects/<slug>/clips/`, built by `tools/run.sh <slug> clips` into
`build/clips/<id>.mp4`, then fitted into the media box (820×780 portrait) and held on the last frame
until the scene's voice ends. So **a clip may be shorter than the line** but should finish its main
action by about 70 % of the line.

## Choose the tool
| The line is about… | Tool | Why |
|---|---|---|
| how something works (a mechanism, data flow, an equation, a split, a ranking) | **Manim** | precise, explanatory motion |
| a product, website or app being used | **Playwright** | a real, repeatable "screen recording" |
| a command line, an install, a script running | **VHS** | pixel-clean terminal |
| a static diagram or list | a native scene type (no clip) | faster and sharper |

## Shared motion library: `studio/tools/manim_lib/motion_kit.py` (use it before writing anything new)
`from motion_kit import *`. Everything follows the scene's section palette, so it fits any art direction.

| Primitive | Motion verb | Use for |
|---|---|---|
| `breathe(scene, mob, t_end)` | DRIFTS | ambient float during holds (keeps the motion QA green) |
| `flip_to(scene, mob, new)` | FLIPS | a thing turning into its encoding (letter → number, word → ID) |
| `count_up(scene, to, pos, suffix=…)` | COUNTS UP | any striking number |
| `chip_rows(items, rows, highlight=…)` | — | tokens, tags, options laid out in rows |
| `phrase(parts)` / `wrap_phrase(parts)` | — | a sentence whose parts can be sliced or morphed (wrap keeps it big) |
| `slice_between(scene, parts, y)` | SLICES | chopping text or data into pieces |
| `ribbon(text)` | SCROLLS | "too long" sequences |
| `card_pile(words)` | RAINS / PILES UP | "too many" collections |
| `shelf(rows)` | SLIDES IN, PULLED OUT | vocabularies, catalogues, toolboxes |
| `price_tag(label)` | TAGS | IDs, prices, counts attached to things |
| `receipt(…)` + `print_lines(scene, r)` | PRINTS | cost, usage, line-item comparisons |
| `meter(label)` | COUNTS | running totals (tokens, requests, dollars) |
| `chat_bubble(lines, fill, color)` + `typing_dots()` | POPS | chat UIs (label them "illustrative") |
| `xray(scene, box, ghosts)` / `unxray(…)` | X-RAYS | what's hidden inside an encoding or a box |
| `even_column(mobs, top, bottom)` | — | stacking rows without overlaps (recaps, lists) |
| `pop_in(mob)` | POPS IN (overshoot + settle) | the default entrance for primary elements |
| `morph(a, b)` | BECOMES | change of form as a clean cross-fade (never glyph-scrambling ReplacementTransform on text) |
| `punch(scene, mob)` | PUNCHES | emphasis on the word that matters |
| `headline(text)` | — | display (Anton) headlines and big statements, fitted to the safe width |
| `strawberry()`, `cutting_board()`, `knife()` | — | vector illustrations; add new ones here (code-built, no licence issues) |

**Design system** (studio_style): `chip()` is solid, rounded and shadowed, with contrast-picked text (`style="outline"` for
secondary); `T(..., display=True)` = Anton; `ink_on(color)` / `shade(color)` for readable text and shadows.
| `fit(mob)` | — | keep any wide text inside 0.86 × frame width (clip edges are feathered) |

When a new video needs a primitive that isn't here, **add it to motion_kit.py** (generic, palette-aware, documented in
this table), not to the project's clips. Project `clips/` hold only topic data and the span choreography.

## Continuous spans (the core of the motion-graphics style)
One clip can cover several voice scenes, so the running object transforms without cuts:
`"build": {"tool": "manim", "file": "clips/b.py", "scene": "BoardSpan", "span": ["s05", "s06"]}` on the first scene,
and `"props": {"of": "s04"}` on the spanned ones (they keep the same `section`; they still get their kicker, tracker and captions).
In the clip, `w("word", scene="s05")` and `at("s05")` give times relative to the clip start, and `CLIP_LEN` is the total length.
Plan one span per section of the art direction (e.g. A: letters → numbers; B: ribbon → pile → shelf → knife).

## Manim clips are transparent
Manim renders with `-t` to VP9 WebM with alpha, so the section colour and glow show through and the clip never looks
like a box. Draw on nothing; don't add a background rectangle.

## Sound cues
`self.cue("pop" | "ding" | "tick" | "whoosh" | "stamp" | "riser", at=None)` inside a `TimedScene` marks a sound at that
moment; `assemble` mixes it. Cue every visible event (flip, cut, tag, collapse, count), and keep ticks light.

## Overlap guard
Every `chip()` and `price_tag()` is a tracked box. `TimedScene` checks all visible boxes at every `until()` and prints
`OVERLAP t=…: 'a' x 'b'` when two touch. Fix the layout (use `chip_rows(..., buff=)`, `card_pile`, `even_column`, `fit`),
never ship a clip with an OVERLAP line.

## Ambient motion
`breathe(scene, mobject, t_end)` (in the project's kit, or copy it) floats the main object during holds. The QA
`motion` check fails any scene that sits still for more than 2.5 s.

## Manim (`build: {"tool": "manim", "file": "clips/x.py", "scene": "ClassName"}`)
```python
import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *          # Inter / JetBrains Mono, channel colours, dark background

class Split(Scene):
    def construct(self):
        t = T("Tokenization matters", 88)            # T(text, size, color, mono=False)
        self.play(Write(t), run_time=0.8)
        ...
        self.wait(1.5)
```
- Rendered at 1640×1560 (2× the box). The frame is **14.22 × 13.5 units** (`FRAME_W`, `FRAME_H`; 1 unit ≈ 58 px in
  the final video). Use the whole frame: `to_edge()` reaches the real edges, and spread layouts to about ±6 units.
  Sizes: titles 76–90, chips 64–80, labels and numbers ≥ 46. For a long line, `scale_to_fit_width(FRAME_W * 0.88)`.
- Sync to the voice: subclass `TimedScene` and call `self.until(t)` with word times from `build/timings.json`
  (run `voice` first, then write the clips).
- Colours: `ACCENT` (amber), `ACCENT2` (teal), `OK`, `DANGER`, `TEXT`.
- Keep it to one idea, 3–6 s. Always use `T()`, never bare `Text()` (the default font is serif).

## Playwright (`build: {"tool": "playwright", "file": "clips/x.mjs"}`)
```js
import { chromium } from "playwright";
const W = +(process.env.VIEW_W || 820), H = +(process.env.VIEW_H || 780);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: process.env.OUT_DIR, size: { width: W, height: H } } });
const page = await ctx.newPage();
await page.setContent(`<body style="margin:0;background:#11163a;color:#fff;font:600 52px Inter,sans-serif;padding:36px">…</body>`);
// …type, click, wait…
await ctx.close(); await browser.close();
```
- The viewport **is** the media box (820×780), so CSS px = final px: body text ≥ 44 px.
- A real site works too (`page.goto(url)`), but zoom in (`page.evaluate(() => document.body.style.zoom = 1.6)`)
  and check it's logo-safe. Label illustrative pages "illustrative".
- `page.keyboard.type(text, { delay: 35 })` reads as human typing.

## VHS (`build: {"tool": "vhs", "file": "clips/x.tape"}`)
```
Set Width 1040
Set Height 990
Set FontSize 44
Set Padding 36
Set Theme "Catppuccin Mocha"
Type 'wc -w <<< "Tokenization matters"'
Sleep 400ms
Enter
Sleep 1.2s
```
- At these settings a line holds about 33 characters. Keep commands shorter or they wrap.
- The `Output` line is set by the builder; leave it out.

## Visual upgrade set (2026-10-09; use these by default)
- **Camera:** `self.push_in(target, 1.2, 0.5)` on every reveal, `self.pull_back()` before the next beat, `self.drift_camera(t_end)` on holds (TimedScene is a MovingCameraScene).
- **Secondary motion:** `crumbs(scene, point)` on cuts/impacts, `swing_in(tag)` for tags, `settle(mob)` for drop-and-bounce arrivals, `roll_to(scene, tracker, value)` for counters.
- **Depth (HTML side, automatic):** every section background gets a vignette, a light spot and film grain; HTML reveals use overshoot-and-settle; the key caption word pops as it is spoken.
- **Illustrations:** `phone_frame()`, `bowl()`, `printer()`, `grain_board()`, `shelf()` (real planks). Add new ones here, palette-aware.

## Futuristic set (the channel aesthetic; prefer these over physical-object illustrations)
`glow(mob)` · `glass_panel(w, h)` · `hud_tag(label)` · `scan_beam(scene, parts)` (replaces the knife) · `grid_floor()` ·
`data_bars(values, labels)` (replaces receipts / tables). `phone_frame()` stays (it's already sleek). Palettes: deep
saturated bases (#0A0F1E navy, #121A2E indigo, #0E1B2A teal-navy) with electric accents (mint #4DF2C2, blue #7C9CFF,
pink #FF5C8A, amber #FFD166). Never pastel/cartoon (bowl, strawberry, cutting board are kept only as examples of what
the user rejected as "kids centric").
