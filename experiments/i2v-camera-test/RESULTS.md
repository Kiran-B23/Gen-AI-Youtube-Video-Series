# Camera-move B-roll test: results

_Run 2026-10-29 on Kaggle (private notebook `harryjerry/i2v-camera-test`, version 1). Claude pushed and fetched it with
`experiments/kaggle.sh`. The numbers come from `results/manifest.json`. The scores come from `results/sheets/` (6 frames per clip), all of which were read.
Wall time: 1 h 59 min of generation plus ~5 min of installs and loading. It was one worker on the first rung (fp16 split), with no NaN fallback needed._

| | |
|---|---|
| Model / licence | Wan2.2 TI2V-5B (`Wan-AI/Wan2.2-TI2V-5B-Diffusers`), Apache-2.0 |
| Settings | fp16, split across both T4s, VAE fp32, 30 steps, guidance 5.0, 480×832, 24 fps |
| Speed, 49 frames (2 s) | **438 s per clip** (436–439). v1 took 393 s. |
| Speed, 81 frames (3.4 s) | **767 s** (1 clip) |
| Peak VRAM | 13.6 GB at 49 frames, 13.8 GB at 81 frames (largest single GPU) |

## Set A: camera-move-only prompts, 49 frames. Score 1–5 (Claude's first pass; the owner should re-score after watching)
| Clip | Prompt match | Stability | Motion | Auto-flags | Usable as-is? |
|---|---|---|---|---|---|
| s01 push-in, seed 1234 | 2 | 5 | 1 | — | ⚠️ clean, but it barely moves. It is a "living still", not a push-in. |
| s01 push-in, seed 42 | 2 | 5 | 2 | — | ⚠️ same: a faint drift, and the bubble stays intact (v1 melted it) |
| s03 lateral glide, seed 1234 | 1 | 5 | 1 | static | ❌ a frozen frame, no glide |
| s03 lateral glide, seed 42 | 1 | 5 | 1 | static | ❌ a frozen frame |
| s04 forward dolly, seed 1234 | 5 | 4 | 5 | — | ✅ strong dolly along the ribbon; the tile colours recycle as they pass |
| s04 forward dolly, seed 42 | 5 | 4 | 5 | — | ✅ same, a slightly softer last frame |
| s05 aisle glide, seed 1234 | 4 | 5 | 3 | — | ✅ slow, clean glide |
| s05 aisle glide, seed 42 | 4 | 5 | 3 | — | ✅ same |
| s07 vertical pan, seed 1234 | 1 | 2 | 2 | — | ❌ no pan; the list rows **re-colour and reshuffle** (object change) |
| s07 vertical pan, seed 42 | 2 | 3 | 2 | — | ❌ a slight zoom, but rows still change colour |
| s08 pull-back, seed 1234 | 1 | 5 | 1 | static | ❌ a frozen frame; the needle never moves |
| s08 pull-back, seed 42 | 1 | 5 | 1 | static | ❌ a frozen frame |

- **Usable: 4 of 12 as-is (6 of 12 if the near-static s01 counts as a background).** The bar was **8 of 12**. ❌
- **Stills with a usable seed: 2 of 6 (s04, s05), or 3 with s01.** The bar was **5 of 6**. ❌
- **Seeds agree**: both seeds of each still behave the same way. The result depends on the still, not on luck.

## Set B: length
| Clip | Result | Seconds | Peak VRAM | vs. its 49-frame twin |
|---|---|---|---|---|
| s04, 81 frames | ❌ **out of GPU memory** | — | 13.8 GB | — |
| s05, 81 frames | ✅ | 767 (12.8 min) | 13.8 GB | Same quality: the glide holds for 3.4 s, clean and on-palette |
| s04, 121 frames | ❌ out of GPU memory | — | 13.4 GB | — |
| s05, 121 frames | ❌ out of GPU memory | — | 13.4 GB | — |

- **81 frames (3.4 s) is on the edge of a T4.** One clip fit at 13.8 GB, but the same settings ran out of memory on the other still.
  - It is within the time bar (12.8 min against 15).
  - The quality holds where it ran.
- **121 frames (5 s, the model's native length) does not fit** at 480×832 when split across two T4s.
- Against the bar: time ✅ and quality ✅ where it ran, **memory ❌**.

## Verdict
**No-go** for a general `broll` generator in `/video-studio`. The narrow use from v1 is **narrower still**.
- The "only the camera moves" wording worked in one way: nothing melted except the s07 rows. But on **flat, frontal compositions** (s01, s03, s08) the model then barely moves at all, and 4 of the 12 clips are frozen frames. A free, instant ffmpeg Ken Burns move gives those stills more camera motion than Wan does.
- Wan2.2-5B earns its 7 GPU-minutes per 2 s only on stills with **strong perspective depth**: a ribbon or road into the distance (s04), or a corridor or aisle (s05). There it gives a real dolly or glide that Ken Burns can't fake.
- **Recommendation:**
  - Default to **FLUX.2 klein stills + Ken Burns** (`experiments/t2i-test/make_reel.sh`) for AI backgrounds.
  - Hand-make a Wan clip only for a depth shot, written as "a corridor / road / ribbon receding to a vanishing point", with 2 s clips.
  - That is an occasional manual Kaggle run, not a pipeline step.

## Failure modes found
1. **Frozen output on flat stills**: `static` caught all 4 (motion ≤ 0.0014). Two more (s01) are close to static at 0.003 and 0.009. A threshold of about 0.01 would flag "barely moves" as well.
2. **Object change without melting** (s07): rows re-colour and reshuffle. The auto-flags missed it (drift 0.13–0.29), so contact sheets stay necessary.
3. **Out of memory at 81 or more frames.** It probably isn't fixed by settings at this size. Untested options:
   - `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` and a cache clear before each clip (the s04 81-frame clip ran straight after 12 others);
   - VAE decode on the second GPU;
   - a smaller frame (384×672).
4. **`drift` flags nothing useful at 0.8**: the highest real clip was 0.64 (s04, which is a good clip because its colours legitimately change). Keep the flag but don't trust it.

## Previews (git-ignored, for watching)
- `out/camera-preview.mp4`: Set A, 1080×1920, both seeds of each still back to back.
- `out/length-preview.mp4`: s05 at 49 → 81 frames, plus s04 at 49 frames.
- Watched by the owner: **not yet**.

## Proposed next steps (separate decisions)
- Optional: a small "depth stills" run. Make 4 new FLUX stills composed for depth (tunnel, road, server corridor, data highway) × 1 seed at 49 frames (~35 min GPU), with the out-of-memory fixes above tried on one 81-frame clip.
- Otherwise, close the video-model track. If AI stills are adopted, the studio change would be an `image` media scene with Ken Burns, with no GPU at render time.
