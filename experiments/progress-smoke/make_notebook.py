# Builds experiments/progress-smoke/progress-smoke.ipynb + run-plan.json: a CPU-only Kaggle notebook that sleeps through
# fake stages and posts live progress, to test kaggle_progress.py, `kaggle.sh watch` and the app's run pet without spending GPU.
# Run from the repo root:  python3 experiments/progress-smoke/make_notebook.py
#                          GPU=0 experiments/kaggle.sh push experiments/progress-smoke/progress-smoke.ipynb progress-smoke
import json, os, sys, uuid
sys.path.insert(0, "experiments")
from kaggle_progress import progress_cells, write_plan

DIR = "experiments/progress-smoke"
STILLS = [("p1", 20), ("p2", 20), ("p3", 20)]
CLIPS = [("A-p1", 30), ("A-p2", 30, "out of GPU memory"), ("A-p3", 30)]   # the second one fakes an OOM, to see the pet get dizzy

def md(s): return dict(cell_type="markdown", id=uuid.uuid4().hex[:8], metadata={}, source=s)
def code(s): return dict(cell_type="code", id=uuid.uuid4().hex[:8], metadata={}, execution_count=None, outputs=[], source=s)

cells = [md("# Progress smoke test\nSleeps through fake stages (no model, CPU only) and posts each step to the run's ntfy.sh topic.")]
cells += progress_cells(code)
cells.append(code('''import time
time.sleep(25); say("setup", "done")'''))
cells.append(code(f'''# fake stills: a model load, then one job each
say("stills", "start", note="loading model"); time.sleep(15); say("stills", "done", note="model loaded")
for sid, secs in {json.dumps(STILLS)}:
    say("stills", "start", job=sid); time.sleep(secs); say("stills", "done", job=sid, secs=secs)'''))
cells.append(code(f'''# fake clips, one of them fails like an out-of-memory clip
say("clips", "start", note="loading model"); time.sleep(15); say("clips", "done", note="model loaded")
for job in {json.dumps(CLIPS)}:
    cid, secs = job[0], job[1]
    say("clips", "start", job=cid); time.sleep(secs)
    if len(job) > 2: say("clips", "error", job=cid, error=job[2])
    else: say("clips", "done", job=cid, secs=secs, vram_gb=13.6)'''))
cells.append(code('''say("pack", "start"); time.sleep(10)
open("/kaggle/working/progress-smoke-results.txt", "w").write("ok\\n"); say("pack", "done")'''))

nb = dict(nbformat=4, nbformat_minor=5, cells=cells,
          metadata=dict(kernelspec=dict(name="python3", display_name="Python 3", language="python"), language_info=dict(name="python")))
json.dump(nb, open(f"{DIR}/progress-smoke.ipynb", "w"), indent=1)
write_plan(DIR, "progress-smoke", [
    dict(key="setup", label="Install", kind="setup", jobs=[dict(id="setup", expect=25)]),
    dict(key="stills", label="Stills", kind="still", load=15, jobs=[dict(id=s, expect=e) for s, e in STILLS]),
    dict(key="clips", label="Clips", kind="clip", load=15, jobs=[dict(id=c[0], expect=c[1]) for c in CLIPS]),
    dict(key="pack", label="Pack", kind="pack", jobs=[dict(id="pack", expect=10)]),
])
print("wrote", f"{DIR}/progress-smoke.ipynb and run-plan.json")
