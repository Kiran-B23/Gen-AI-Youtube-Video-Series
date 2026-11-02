# Progress smoke test (live Kaggle progress, no GPU)

A CPU-only Kaggle notebook that sleeps through fake stages (install, 3 stills, 3 clips with one fake out-of-memory, pack) and
posts each step to the run's ntfy.sh topic. It tests `experiments/kaggle_progress.py`, `kaggle.sh watch` and the studio app's
run pet on the Experiments page without spending GPU quota. About 4 minutes on Kaggle.

```bash
python3 experiments/progress-smoke/make_notebook.py      # notebook + run-plan.json
GPU=0 experiments/kaggle.sh push experiments/progress-smoke/progress-smoke.ipynb progress-smoke
# open the app's Experiments page (progress-smoke tab); then:
experiments/kaggle.sh fetch progress-smoke experiments/progress-smoke/results
```

Real experiments get live progress the same way: build the notebook with `progress_cells()` first, call `say(stage, state,
job=…)` around each step, and write `run-plan.json` with `write_plan()` (see `kaggle_progress.py`).
