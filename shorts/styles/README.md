# Jev in four house styles

Same script, Kokoro voice, timing, captions and facts in all three; only the look differs. 74.9 s each, QA 10/10, watched end to end.

| File | Style | Engine | Look | Render time | Style kit |
|---|---|---|---|---|---|
| `jev-1-reference.mp4` | reference-flat (tokenization benchmark) | HyperFrames | flat colour blocks (blue / yellow / off-white / navy), giant Anton type, chapter numerals, mono chips, stamps | ~45 s | `studio/templates/styles/reference-flat/` |
| `jev-2-hyperframes.mp4` | hyperframes-glass | HyperFrames | deep navy/indigo/teal with drifting colour blobs, frosted-glass cards, blur-in type, light sweeps, 3D-tilt stamps, zoom-blur step exits | ~4 min | `studio/templates/styles/hyperframes-glass/` |
| `jev-3-remotion.mp4` | remotion-spring | Remotion (personal use) | bright cream/pastel blocks, chunky white cards with hard offset shadows, pill chips, springy bouncy motion, word-by-word headlines, slide/flip steps | ~2 min | `studio/templates/styles/remotion-spring/` + `studio/remotion/src/styles/remotion-spring/` |
| `jev-4-3b1b.mp4` | 3b1b-manim (3Blue1Brown's method: Manim) | HyperFrames + 5 Manim clips | near-black board, serif type, shapes that transform (number line, token grids, 100-dot board, bar race, router), yes/no shown as probabilities | ~16 min clips (5 in parallel) + ~2.5 min render | `studio/templates/styles/3b1b-manim/` |

Known small issues (each under ~2.5 s):
- 2: the 68% donut sits empty ~2.5 s (41.8–44.3 s); "ONE UNIVERSITY TEST" heading alone ~2 s (59.2–61 s); near-blank frame at 71.2 s.
- 3: header overlaps the ticket for a moment at 15.2 s; headers alone ~0.6 s at 41.0 s and 64.8 s.

Pick a style with `"stage": {"kit": "<style>"}` (HyperFrames) or `"engine": "remotion"` + a remotion-spring `Stage.tsx`.
- 4: "$0.21 total" sits on the bottom edge of the clip box (33.8–35.2 s, slightly cut); the confidence chip brushes the Jev ring at 53.8 s.
