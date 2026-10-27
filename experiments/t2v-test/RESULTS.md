# Text/image-to-video test: results

_Run 2026-10-14 on Kaggle (private notebook `harryjerry/t2v-test`, version 1), pushed and fetched by Claude via Composio. Numbers come
from `results/manifest.json` and `results/kaggle-log.txt`; scores from `results/sheets/` (6 frames per clip). Wall time: 1 h 20 min
(16:48–18:09), all in one run, no failed attempts._

| | |
|---|---|
| Platform / GPU | Kaggle, 2× Tesla T4 (14.6 GB each), 31 GB RAM · torch 2.11, diffusers 0.41.0.dev0 |
| Winner / licence | **Wan2.2 TI2V-5B** (`Wan-AI/Wan2.2-TI2V-5B-Diffusers`), Apache-2.0 |
| Settings | fp16, pipeline split across both T4s (`device_map="balanced"`), VAE fp32, 30 steps, guidance 5.0 |
| Clip | 49 frames at 24 fps = **2.0 s**, 480×832 (portrait) or 832×480 (landscape) |
| Speed | **393 s per 2 s clip** on average (391–395), + ~5 min model load |
| Peak VRAM | 13.5 GB (largest single GPU) |

## Smoke test (one short text→video clip each; first ladder rung, fp16 split, worked for all three)
| Model | s / clip | Clip | Load | Peak VRAM | Speed pass? | Picture |
|---|---|---|---|---|---|---|
| wan22-5b | 264 | 1.4 s | 292 s | 13.5 GB | ✅ | Off-prompt: the scene morphs from navy columns into a yellow wall with a chat bubble. On-palette. |
| wan21-1.3b | 409 | 2.1 s | 257 s | 12.7 GB | ✅ | Close to the prompt (isometric phone, bubble appears) but off-palette cyan; fine motion. |
| cogvideox-2b | 572 | 6.1 s | 136 s | 10.8 GB | ✅ | ❌ **Blank**: a flat light-cyan frame for the whole clip. The notebook's black/NaN check (std < 0.01) missed it. |

## Clips with Wan2.2-5B: score 1–5 (Claude's first pass from contact sheets; the owner should re-score after watching)
| Clip | Prompt match | House style | Stability (5 = no warping) | Motion | Usable as-is? |
|---|---|---|---|---|---|
| i2v s01 phone + "?" bubble | 2 | 5 | 2 | 2 | ❌ the bubble **melts into dots**; the phone stays static |
| i2v s04 tile ribbon | 5 | 5 | 3 | 5 | ✅ strong forward dolly as prompted; one glitch band mid-clip |
| i2v s05 rack aisle | 3 | 5 | 5 | 2 | ✅ as subtle B-roll (very slow glide, clean) |
| i2v s08 meter + tiles | 3 | 5 | 2 | 3 | ❌ tiles fall but **swirl artefacts** mid-clip; the needle never moves |
| t2v b1 envelope on network | 3 | 3 | 5 | 1 | ⚠️ background only: the envelope barely moves; cyan off-palette |
| t2v b2 phone + red warning | 4 | 3 | 4 | 3 | ✅ the red warning appears on cue; lighter blues than the palette |

- **Usable: 3 of 6 as-is, 4 with b1 as a background.** The bar was 4 of 6, so this is a **borderline** result.
- **Speed: 6.5 min per 2 s clip.** ✅ Under the 15 min bar, but only 2 s each: a 10-minute video's worth of B-roll (say 20 clips) is ~2.5 h of GPU.

## Previews (git-ignored, for watching)
- `out/i2v-preview.mp4`: the 4 image→video clips, 1080×1920, 8.2 s.
- `out/broll-preview.mp4`: b1, b2 and the Wan2.1 smoke clip, 1920×1080, 6.2 s.
- Watched by the owner: **not yet**.

## Verdict
**Conditional go, narrow use:** Wan2.2-5B image→video works for **simple camera moves on a still** (dolly, glide, push-in): the
s04 and s05 kind of shot. Use it to bring FLUX stills to life as 2 s B-roll in long-form or as reel backgrounds.
**No-go** for anything that must **change in a precise way** (a bubble rising, a needle climbing, objects arriving): those melt or swirl.
Code-built HyperFrames/Manim animation stays the tool for the explanation; open video models are texture, not teaching.
- Prompt for camera motion only; keep the subject still.
- Expect to generate 2 takes per usable clip.
- CogVideoX-2B is out (blank output). Wan2.1-1.3B is a fallback for text→video only, and off-palette.

## Failure modes found
1. **Blank clip passed the auto-check** (CogVideoX): raise the threshold, e.g. reject clips whose per-frame std is under ~0.05 or whose
   colours collapse to one hue.
2. **Object motion melts** (s01 bubble, s08 needle and tiles): a model limit at this size and step count, not a setting bug.
3. **Text-to-video ignores the palette** more than image-to-video (b1/b2 drift to cyan and light blue): image→video from on-brand stills
   keeps the house style far better.

## Proposed next steps (separate decisions)
- Re-run only camera-move prompts on 4–6 more stills, 2 seeds each, to confirm the narrow use (~1.5 h GPU).
- Try longer clips (81–121 frames = 3.4–5 s) on the best still to see if quality holds.
- If adopted: add a `broll` scene type to `/video-studio` that drops a clip under a section, with the Ken Burns fallback for still images.
