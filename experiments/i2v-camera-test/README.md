# Camera-move B-roll test (Wan2.2 image→video, Kaggle)

A follow-up to `experiments/t2v-test/`, whose verdict was **conditional go, narrow use**: camera moves on a still work, and object motion melts.
This run checks that narrow use on more clips before anyone builds a `broll` media tool into `/video-studio`. It doesn't touch the
studio pipeline, and deleting this folder removes the whole test.

- **Model:** `Wan-AI/Wan2.2-TI2V-5B-Diffusers` (Apache-2.0, not gated). It runs at the settings that worked in t2v-test v1: fp16, split across both T4s, VAE fp32, 30 steps, guidance 5.0, 480×832, 24 fps.
- **Stills:** the six usable t2i-test stills (`s01 s03 s04 s05 s07 s08`), embedded in the notebook at 480×832.

## Two questions
| Set | Clips | What it answers |
|---|---|---|
| **A: camera only** | 6 stills × seeds 1234 and 42, 49 frames (2 s) = 12 | Each prompt names one camera move (push-in, glide, dolly, pan, pull-back), with "everything stays still; only the camera moves". Does the narrow use hold up? |
| **B: length** | `s04`, `s05` × 81 and 121 frames (3.4 s and 5 s) = 4 | Does quality hold on longer clips, and do they fit in a T4's memory? 121 frames is Wan2.2-5B's native length. |

## Pass bar (set before the run)
- **Set A:** at least **8 of 12** clips are usable as-is, and at least **5 of 6** stills have one usable seed.
  - Usable means: on-palette, no warping or melting, the camera move matches the prompt, and no new objects appear.
- **Set B:** each 81-frame clip scores **no lower** than its 49-frame twin from Set A. Each clip takes **15 min or less**, and peak VRAM is **14.5 GB or less**.
  - Expect about 11 min for 81 frames and about 17 min for 121 frames. A 121-frame clip that runs out of memory or goes over time is a recorded result, not a crash.
- **Budget:** about 2.5 h of Kaggle GPU, one unattended run.

## Steps
1. Optional: `python3 experiments/i2v-camera-test/make_notebook.py` rebuilds the notebook. Prompts and jobs live there.
2. `experiments/kaggle.sh push experiments/i2v-camera-test/i2v-camera-test.ipynb i2v-camera-test` pushes a private notebook on T4 ×2 with Internet on, and it runs at once.
3. `experiments/kaggle.sh status i2v-camera-test` until it says `complete`.
   - Every clip is checkpointed. A crashed worker restarts and skips the clips that are already done.
4. `experiments/kaggle.sh fetch i2v-camera-test experiments/i2v-camera-test/results`
5. `experiments/i2v-camera-test/review.sh` makes `results/sheets/` (6 frames per clip), `out/camera-preview.mp4` and `out/length-preview.mp4`.
6. Score from the sheets, then fill in `RESULTS.md`. The owner watches the previews on a phone.

## Auto-flags (advisory; the scores come from the sheets)
| Flag | What it catches |
|---|---|
| `blank` | NaN, or a per-frame, per-channel std under 0.05. This catches flat frames like the v1 CogVideoX clip, which the old check missed. |
| `static` | No frame-to-frame change. |
| `drift` | The last frame's colour histogram is far from the still's. This is a cheap proxy for melting or off-palette drift. |
| `hue_collapse` | One hue covers more than 90 % of the last frame while the still is mixed. |

## Files
| File | What |
|---|---|
| `i2v-camera-test.ipynb` | The Kaggle notebook (generated, with the stills embedded) |
| `make_notebook.py` | Builds the notebook: prompts, jobs, worker |
| `review.sh` | Contact sheets and previews (ffmpeg) |
| `RESULTS.md` | Scorecard and go/no-go, written after the run |
| `results/`, `out/` | Fetched output and previews (git-ignored) |
| `../kaggle.sh` | push / status / fetch through Composio, shared by experiments |
