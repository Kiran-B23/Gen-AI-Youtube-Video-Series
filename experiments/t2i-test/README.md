# Text-to-image test (free, open-source, Kaggle/Colab)

A self-contained experiment: can an **Apache-2.0 text-to-image model on a free GPU** make reel stills in the channel's flat style?
It doesn't touch the studio pipeline. Deleting this folder removes the whole test.

## Steps
1. **Colab** (browser, or VS Code with the Colab extension → *Select Kernel → Colab → T4*): *Run all*.
   - Free Colab has about 12.7 GB RAM, so the notebook loads the models 4-bit and skips FLUX.1 schnell automatically.
   - If the kernel dies, re-run: finished models are skipped.
   - **Kaggle** also works (GPU T4 x2, Internet On, verified phone) and tries full precision first.
2. The notebook:
   - smoke-tests **Z-Image-Turbo**, **FLUX.2 klein 4B** and **FLUX.1 schnell** (all Apache-2.0) with an automatic fp16 → bf16 / GPU → split → offload fallback;
   - makes 8 stills (adapted from the tokenization storyboard) with the winner;
   - upscales them to 1080×1920;
   - zips everything as `t2i-test-results.zip`.
3. Download the zip (browser: automatic; VS Code: **Colab: Download** on `/content/t2i-test-results.zip`) and unzip it into `images/`. Google Drive isn't used. That gives `images/reel/s01–s08.png`, `images/smoke/` and `images/manifest.json`.
4. Build the test reel locally: `experiments/t2i-test/make_reel.sh` gives `out/t2i-test.mp4` plus 2 fps contact sheets in `out/sheets/`.
   - Optional args: `[images_dir] [cc0 music name]`.
   - Music is read in place from `studio/templates/reel/audio/music/cc0/`.
5. Score the stills and fill in `RESULTS.md`.

## Files
| File | What |
|---|---|
| `t2i-test.ipynb` | GPU notebook (Kaggle or Colab, unchanged) |
| `make_reel.sh` | Standalone ffmpeg: Ken Burns per still, crossfades, CC0 music, contact sheets |
| `RESULTS.md` | Scorecard + go/no-go |
| `images/` | Unzipped notebook output |
| `out/` | Rendered test reel (git-ignored) |
