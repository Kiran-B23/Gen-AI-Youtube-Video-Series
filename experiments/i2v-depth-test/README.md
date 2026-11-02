# Depth-stills test (FLUX.2 klein stills → Wan2.2 camera moves, Kaggle)

A follow-up to `experiments/i2v-camera-test/`, whose verdict was a general **no-go**. Wan2.2-5B moved the camera only on the two stills with strong perspective (the
`s04` ribbon and the `s05` aisle). On flat, front-on stills it gave frozen frames. This run asks whether composing stills **for depth** makes the motion
reliable, and whether 81-frame clips fit on a T4 with memory fixes. It doesn't touch the studio pipeline.

## Two stages in one notebook
1. **Stills:** FLUX.2 klein 4B (Apache-2.0) makes 4 one-point-perspective stills at 720×1280, using the t2i-test settings (bf16, split across both T4s, 4 steps).
   Then they are centre-cropped to 480×832.
   - `d1` data highway · `d2` tunnel of square frames · `d3` server corridor · `d4` tile road between block towers.
2. **Clips:** Wan2.2 TI2V-5B, at the same settings as i2v-camera-test.
   - **Set A:** each still gets one forward camera move at 49 frames (2 s), seed 1234.
   - **Set B:** `d1` and `d3` at 81 frames (3.4 s), run last, as in the previous test.
   - **Memory fixes under test:** `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`, plus `gc.collect()` and `torch.cuda.empty_cache()` before each clip.

## Pass bar (set before the run)
- **Stills:** at least **3 of 4** are on-palette, have a clear vanishing point and show no text. These are the inputs, so this is a precondition and not the verdict.
- **Set A:** at least **3 of 4** clips are usable as-is.
  - Usable means a visible forward move (not `static`), on-palette, no warping or melting, and no new objects.
  - If it passes, the rule becomes: "compose the still for depth, then Wan gives a dolly".
- **Set B:** **both** 81-frame clips finish without running out of GPU memory, each in **15 min or less**, and score no lower than their 49-frame twins.
- **Budget:** about 1 h of Kaggle GPU (~5 min FLUX + ~30 min Set A + ~26 min Set B + installs and loads).

## Steps
1. Optional: `python3 experiments/i2v-depth-test/make_notebook.py` rebuilds the notebook.
2. `experiments/kaggle.sh push experiments/i2v-depth-test/i2v-depth-test.ipynb i2v-depth-test`
3. `experiments/kaggle.sh status i2v-depth-test` until it says `complete`.
4. `experiments/kaggle.sh fetch i2v-depth-test experiments/i2v-depth-test/results`
5. `experiments/i2v-depth-test/review.sh` makes `results/sheets/` (the stills plus 6 frames per clip), `out/camera-preview.mp4` and `out/length-preview.mp4`.
6. Score from the sheets, then fill in `RESULTS.md`. The owner watches the previews on a phone.

The auto-flags are the same as in `../i2v-camera-test/README.md`, and they are advisory.
