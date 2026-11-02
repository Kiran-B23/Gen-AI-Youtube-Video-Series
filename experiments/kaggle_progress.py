# Live progress for Kaggle notebooks (used by an experiment's make_notebook.py).
# Kaggle shows nothing of a running notebook but "running", so the notebook posts one JSON line per step to an ntfy.sh topic
# (free, no account). `kaggle.sh push` swaps TOPIC_PLACEHOLDER for a fresh random topic on every push (tracked notebooks
# never hold a real one) and starts `kaggle.sh watch`, which writes <experiment>/progress.json for the studio app's
# Experiments page. Only stage/job ids, timings and short notes are sent: never prompts, images or keys.
#
#   from kaggle_progress import progress_cells, write_plan
#   cells = progress_cells(code)      # first two cells of the notebook: /tmp/progress.py + "setup start"
#   worker code then calls:  from progress import say; say("clips", "start", job="A-d1")   (or: !python /tmp/progress.py setup done)
#   write_plan(exp_dir, slug, stages)  # run-plan.json: the stations and expected seconds the page draws
import json, os

TOPIC_PLACEHOLDER = "__PROGRESS_TOPIC__"

PROGRESS_PY = f'''%%writefile /tmp/progress.py
# say(stage, state, job=None, **extra): one line to this run's ntfy.sh topic. Never raises: progress must not break a run.
import json, sys, time, urllib.request
TOPIC = "{TOPIC_PLACEHOLDER}"
def say(stage, state, job=None, **extra):
    if TOPIC.startswith("__"): return                      # not pushed through kaggle.sh: no relay
    ev = dict(t=round(time.time(), 1), stage=stage, state=state, job=job, **extra)
    try:
        req = urllib.request.Request(f"https://ntfy.sh/{{TOPIC}}", data=json.dumps(ev).encode(), method="POST")
        urllib.request.urlopen(req, timeout=10).read()
    except Exception as e:
        print("progress not sent:", e, file=sys.stderr)
if __name__ == "__main__":                                 # python /tmp/progress.py <stage> <state> [job]
    say(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)'''

PROGRESS_START = '''import sys; sys.path.insert(0, "/tmp")
from progress import say
say("setup", "start")'''


def progress_cells(code):
    """the notebook's first two cells, built with the generator's own code() cell helper"""
    return [code(PROGRESS_PY), code(PROGRESS_START)]


def write_plan(exp_dir, slug, stages):
    """stages: [{key, label, kind, jobs: [{id, expect}]}] in run order; kind picks the pet's activity
    (setup | still | clip | pack | other). The page adds Fetch and Review after them."""
    os.makedirs(exp_dir, exist_ok=True)
    json.dump(dict(slug=slug, stages=stages), open(os.path.join(exp_dir, "run-plan.json"), "w"), indent=1)
