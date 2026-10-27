# Text-to-image test: results

_Run 2026-10-13/14 on Kaggle (private notebook `harryjerry/t2i-test`, version 3), pushed and fetched by Claude via Composio. Numbers come from `images/manifest.json` and the Kaggle log._

| | |
|---|---|
| Platform / GPU | Kaggle, 2× Tesla T4 (14.6 GB each), 31 GB RAM |
| Winner / licence | **FLUX.2 [klein] 4B** (`black-forest-labs/FLUX.2-klein-4B`), Apache-2.0 |
| Settings | bf16, pipeline split across both T4s (`device_map="balanced"`), 4 steps, guidance 1.0 |
| Speed | **62.4 s per image** on average (61.5–63.4) at 720×1280 |
| Peak VRAM | 11.5 GB (largest single GPU) |
| Upscale | Real-ESRGAN x2plus (BSD-3) → 1080×1920 |
| GPU time used | ~2 min (v1) + ~2 min (diagnostic) + ~13 min (v2) + v3 run |

## Smoke test
| Model | Result (dtype / placement) | s/img | Peak VRAM | Pass? | Notes |
|---|---|---|---|---|---|
| z-image-turbo | bf16 / 4-bit NF4 | 205.6 | 10.2 GB | ❌ too slow | fp16 split gave **NaN/black**; bf16 split ran **out of memory**; only 4-bit worked, and it is ~3× slower than klein. |
| flux2-klein-4b | bf16 / split across 2 T4s | 61.5 | 11.5 GB | ✅ | Worked on the first try. The picture matched the prompt more literally (phone on a grid floor, chat bubble). |
| flux1-schnell | — | — | — | ❌ | **Gated on Hugging Face now (401)**: it needs an HF token and accepting the licence on its model page. It wasn't tested. (Earlier notes calling it ungated were wrong.) |

## Reel stills: score 1–5 (Claude's first pass; the owner should re-score)
| Shot | Prompt match | House style | Consistency | Artefacts (5 = none) | Usable as-is? |
|---|---|---|---|---|---|
| s01 phone + question bubble | 4 | 5 | 4 | 5 | ✅ |
| s02 cursor → binary bars | 2 | 4 | 4 | 4 | ❌ no cursor; random "mountain" shapes, so it doesn't explain anything |
| s03 2×5 tile grid, 3 ringed | 3 | 4 | 4 | 4 | ✅ as a background (3×4 grid, not 2×5; rings everywhere) |
| s04 endless tile ribbon | 4 | 4 | 4 | 5 | ✅ |
| s05 racks of tiles | 5 | 4 | 4 | 5 | ✅ |
| s06 scan beam cuts bar into 7 | 2 | 4 | 4 | 4 | ❌ there's a beam, but no seven pieces |
| s07 list, one row highlighted | 4 | 4 | 4 | 5 | ✅ |
| s08 tiles dropping into meter | 4 | 4 | 4 | 5 | ✅ |

The bar to pass was at least 6 of 8 usable and an average of 60 s per image or less.
- **Usable: 6 of 8.** ✅ That meets the bar.
- **Speed: 62.4 s average.** It misses the bar by 2.4 s. It is still about 8–9 minutes for 8 images, plus about 3 minutes of model loading.

## Test reel
- `out/t2i-test.mp4`: 1080×1920, 30 fps, 24.5 s, H.264 + AAC (CC0 "fresh-focus").
- I read all five 2 fps contact sheets in `out/sheets/`.
  - The stills hold up at full size, with no artefacts, garbled text, people or logos, and the brand palette is kept on every shot.
  - The Ken Burns move is subtle.
  - The 0.5 s crossfades show the usual double-exposure frames.
- Watched by the owner: **not yet**, so this is ready for your review.

## Verdict
**Conditional go**, for **backgrounds and illustrative inserts** inside the reference-flat stage. Not yet for frames that must *explain* something precise.
- It **works for free**: an Apache-2.0 model on Kaggle's free T4 ×2 gives on-brand, flat, artefact-free 1080×1920 stills at about 1 minute each.
- It **can't follow counts or exact diagrams**: "2×5 grid", "seven pieces" and "a cursor" were ignored. Code-built visuals (HyperFrames or Manim) stay better for the explanation itself.
- **Avoid Z-Image-Turbo on a T4**: in fp16 it gives NaN images, at full precision it runs out of memory, and in 4-bit it takes over 3 minutes per image.
- **Kaggle beats Colab** here: two T4s let klein run in bf16 without 4-bit. On free Colab it would need 4-bit, which is untested.

## Failure modes found (and fixed in the notebook)
1. **v1:** Kaggle's old `torchao` breaks the newest diffusers' import (`FqnToConfig`). The fix is `pip uninstall torchao`.
2. **v2:** fp16 gave NaN images. A single T4 ran out of memory. CPU offload exhausted RAM and got the kernel `Killed`. The fixes are bf16 first, no offload, and each attempt in its own child process.
3. **v3:** FLUX.1 schnell is gated. It needs an `HF_TOKEN` secret.

## Proposed next steps (separate decisions, not part of this test)
- Re-run only s02 and s06 with simpler, object-level prompts. Try FLUX.2 klein's reference-image editing for consistency.
- If AI stills become a channel option, add an `image` scene type with Ken Burns to `/video-studio`. That would be a separate change to the studio pipeline.
- Optional: add an `HF_TOKEN` Kaggle secret and re-test FLUX.1 schnell for comparison.
