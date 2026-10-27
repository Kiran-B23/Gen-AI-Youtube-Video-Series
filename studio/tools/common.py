"""Shared by voice.py / assemble.py / qa_video.py / watch.py / validate.py: word normalisation and the one pace definition."""
import json, os, re

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACE = json.load(open(os.path.join(STUDIO, "templates", "reel", "pace.json")))   # the single source of truth for words/s

_NUMW = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split())}
norm = lambda w: (lambda t: _NUMW.get(t, t))(re.sub(r"[^a-z0-9]", "", w.lower()))   # "ten" == "10" (Whisper writes digits)

def pace_of(words, s="s", e="e"):
    """words/s of a timed word list [{"s", "e"}, ...] (or objects with .start/.end): count ÷ (last end − first start)."""
    if not words: return 0.0
    get = (lambda w, k: w[k]) if isinstance(words[0], dict) else (lambda w, k: getattr(w, {"s": "start", "e": "end"}[k]))
    span = get(words[-1], e) - get(words[0], s)
    return len(words) / span if span > 0.3 else 0.0

def pace_limits(spec):
    """(scene_max, delivery_max) for a project; scenes.json "pace": {"accept": 2.8, "why": "..."} loosens both (reported, never silent)."""
    acc = (spec.get("pace") or {}).get("accept")
    return (max(PACE["scene_max"], acc), max(PACE["delivery_max"], acc)) if acc else (PACE["scene_max"], PACE["delivery_max"])
