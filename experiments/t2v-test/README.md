# Text/image-to-video test (free, open-source, Kaggle)

A self-contained experiment, sibling of `experiments/t2i-test/`: can an **Apache-2.0 video model on Kaggle's free T4 ×2** make short,
on-brand clips for the channel (B-roll for long-form, animated stills for reels)? It doesn't touch the studio pipeline. Deleting this
folder removes the whole test.

## Models (licences checked on Hugging Face, 2026-10-14)
| Model | Licence | Used for |
|---|---|---|
| `Wan-AI/Wan2.2-TI2V-5B-Diffusers` | Apache-2.0 | text→video and **image→video** (animates the t2i-test stills) |
| `Wan-AI/Wan2.1-T2V-1.3B-Diffusers` | Apache-2.0 | text→video (small, fast fallback) |
| `zai-org/CogVideoX-2b` | Apache-2.0 | text→video baseline (landscape 720×480 only) |

Left out: LTX-Video and CogVideoX-5B/1.5 (licence "other": custom terms, some revenue-gated), Mochi 1 (Apache-2.0 but 10B, too big for a T4).

## Steps
1. The notebook is pushed to Kaggle by Claude through Composio (`composio proxy https://www.kaggle.com/api/v1/kernels/push`), private,
   GPU T4 ×2, Internet on. It runs immediately. To run it yourself: open it on Kaggle → *Save & Run All*.
2. The notebook:
   - smoke-tests the three models with one short text→video clip each (fp16 first, bf16 if fp16 gives NaN/black; each attempt in its own process);
   - makes 4 **image→video** clips from the t2i-test stills (`s01`, `s04`, `s05`, `s08`, embedded in the notebook) with Wan2.2-5B;
   - makes 2 landscape **text→video** B-roll clips;
   - writes `manifest.json` and zips everything as `t2v-test-results.zip`.
3. Claude fetches the output (`KAGGLE_KERNEL_OUTPUT`) and unzips it into `results/` (git-ignored), builds contact sheets, scores the clips
   and fills in `RESULTS.md`.

## Pass bar (set before the run)
- A 2 s clip in **≤ 15 min** on a T4, peak VRAM ≤ 15 GB.
- At least **4 of 6** clips usable as-is: on-brand palette, no garbled text, no warping or melting objects, motion that matches the prompt.

## Files
| File | What |
|---|---|
| `t2v-test.ipynb` | Kaggle notebook (stills embedded) |
| `RESULTS.md` | Scorecard + go/no-go (after the run) |
| `results/` | Unzipped notebook output (git-ignored) |
