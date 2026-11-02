# Depth-stills test: results

_Run 2026-10-29 on Kaggle (private notebook `harryjerry/i2v-depth-test`, version 1). Claude pushed and fetched it with `experiments/kaggle.sh`.
The numbers come from `results/manifest.json`. The scores come from `results/sheets/` (the stills, and 6 frames per clip), all of which were read.
Wall time: ~5 min of FLUX stills + 61.5 min of Wan clips (1 worker, first rung, no restarts), ~70 min with installs. The run finished at 18:19._

| | |
|---|---|
| Stills | FLUX.2 klein 4B, bf16 split across both T4s, 4 steps: **63–75 s per image** (t2i-test: 62 s) |
| Clips | Wan2.2 TI2V-5B, fp16 split, VAE fp32, 30 steps, 480×832 @ 24 fps |
| Speed | **449 s per 49-frame clip** (2 s), **784 s per 81-frame clip** (3.4 s) |
| Peak VRAM | 13.6 GB at 49 frames, 13.8 GB at 81 frames |

## Stills (precondition)
| Still | On-palette | Clear vanishing point | No text | OK? |
|---|---|---|---|---|
| d1 data highway | ✅ | ✅ | ✅ | ✅ |
| d2 tunnel of square frames | ✅ | ✅ | ✅ | ✅ |
| d3 server corridor | ✅ | ✅ (yellow ceiling) | ✅ | ✅ the cleanest composition |
| d4 tile road between towers | ⚠️ light-cyan sky | ✅ | ✅ | ✅ |

**4 of 4** pass the precondition (the bar was 3). FLUX.2 klein does depth compositions well.

## Set A: one forward camera move per still, 49 frames. Score 1–5 (Claude's first pass; the owner should re-score after watching)
| Clip | Prompt match | Stability (5 = no warping) | Motion | Auto-flags | Usable as-is? |
|---|---|---|---|---|---|
| d1 highway dolly | 3 | 1 | 4 | drift | ❌ moves forward, but the road surface **melts** into blue and white waves mid-clip |
| d2 tunnel fly-through | 4 | 4 | 3 | — | ✅ the rings advance like a fly-through; the outer yellow ring drops out after the first frames |
| d3 corridor glide | 1 | 5 | 1 | — (motion 0.0022) | ❌ **frozen**: clean, but effectively a still |
| d4 road dolly | 3 | 2 | 3 | — | ❌ the dashes move, but the black lane **re-colours to yellow** (object change) |

- **Usable: 1 of 4.** The bar was **3 of 4**. ❌
- Composing for depth didn't make Wan move reliably. The cleanest, most symmetrical still (d3) froze, just like the flat stills in the last test. The stills with lane textures (d1, d4) moved but changed their surfaces.

## Set B: 81 frames (3.4 s) with the memory fixes
| Clip | Result | Seconds | Peak VRAM | vs. its 49-frame twin |
|---|---|---|---|---|
| d1, 81 frames | ✅ made | 784 (13.1 min) | 13.8 GB | **Better** than the 49-frame clip: forward motion with lane tiles cycling and only light smears. Still ⚠️ not clean (stability 3). |
| d3, 81 frames | ✅ made | 784 (13.1 min) | 13.8 GB | The same: frozen (motion 0.0029) |

- **Memory: both 81-frame clips fit** this time. In i2v-camera-test, 1 of 2 failed with the same settings, so the fixes (expandable CUDA segments and a cache clear per clip) look like they help. With only 2 clips, that is a hint, not proof.
- **Time: 13.1 min**, within the 15 min bar. ✅
- **Quality:** neither clip scores lower than its twin. ✅
- So Set B passes, but it is a pass on clips that weren't usable to begin with.

## Verdict
**Close the open video-model track (Wan2.2-5B on a free T4).** Across the two follow-ups, **5 of 16** two-second clips were usable as-is (4/12 + 1/4).
- **Freezing and melting are unpredictable.** They depend on the still in ways composition doesn't control, and the run costs ~7.5 GPU-min per 2 s clip.
- **Keep FLUX.2 klein stills.** 4 of 4 were good here, plus 6 of 8 in t2i-test, at ~1 min each.
- **Move stills with ffmpeg Ken Burns** (`experiments/t2i-test/make_reel.sh`) or with HyperFrames camera moves. Both are free, instant and deterministic.
- If AI visuals join the studio, the change is an `image` media scene, with no GPU at render time.

## Failure modes found
1. **Melting on lane textures** (d1, and d4's re-coloured lane). `drift` caught d1 (0.90) but missed d4 (0.35).
2. **Frozen output on clean symmetrical stills** (d3: motion 0.0022 and 0.0029).
   - `static` (< 0.002) missed both.
   - Raising the threshold to 0.004 would catch them, but the good `s05` glide in i2v-camera-test was 0.0048, so the margin is thin.
   - Keep the flags advisory; the contact sheets decide.
3. **A jump in the first frames** (d2: the outer yellow ring vanishes after frame 1). Trim the first ~4 frames before use.

## Previews (git-ignored, for watching; also on the studio app's Experiments page)
- `out/camera-preview.mp4`: d1 to d4 at 49 frames, 1080×1920.
- `out/length-preview.mp4`: d1 at 49 → 81 frames, then d3 at 49 → 81 frames.
- `results/flux/d1–d4.png`: the 720×1280 stills, usable on their own as Ken Burns backgrounds.
- Watched by the owner: **not yet**.
