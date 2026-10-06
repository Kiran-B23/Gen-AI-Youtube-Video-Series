"""
Sync check on a rendered video: re-transcribe chosen scenes from the MP4 and compare every spoken word
with the frame its caption highlight / visual beat fires (from build/timings.json).

usage: python scripts/lib/sync_full.py <slug> <mp4> s05 s09 ...
"""
import json, math, os, re, subprocess, sys, tempfile
import imageio_ffmpeg, numpy as np, soundfile as sf
from faster_whisper import WhisperModel

FF = imageio_ffmpeg.get_ffmpeg_exe(); FPS, PAD, TR = 30, 0.3, 9
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
slug, mp4, scenes = sys.argv[1], sys.argv[2], sys.argv[3:]
spec = json.load(open(f"{ROOT}/videos/{slug}/video.json")); tm = json.load(open(f"{ROOT}/videos/{slug}/build/timings.json"))
ids = spec["parts"]["full"]; by = {s["id"]: s for s in spec["scenes"]}
frames = [math.ceil((by[i].get("silentSeconds") or tm[i]["duration"] + PAD) * FPS) for i in ids]
starts = [0]
for i in range(1, len(ids)): starts.append(starts[-1] + frames[i - 1] - TR)
norm = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())
model = WhisperModel("small.en", device="cpu", compute_type="int8")
for sid in scenes:
    i = ids.index(sid); t0 = starts[i] / FPS; dur = frames[i] / FPS
    with tempfile.NamedTemporaryFile(suffix=".wav") as f:
        subprocess.run([FF, "-v", "error", "-y", "-ss", f"{t0:.3f}", "-t", f"{dur:.3f}", "-i", mp4, "-vn", "-ac", "1", "-ar", "16000", f.name], check=True)
        x, _ = sf.read(f.name, dtype="float32")
    segs, _ = model.transcribe(x, word_timestamps=True, language="en")
    heard = [(norm(w.word), w.start * FPS) for s in segs for w in s.words]
    beats = {norm(b["word"]) for b in by[sid].get("beats", [])}
    d, key = [], []
    for w in tm[sid]["words"]:
        exp = round(w["s"] * FPS); n = norm(w["w"])
        c = [f for t, f in heard if t and (t == n or (len(n) > 3 and t.startswith(n[:4])))]
        if c:
            best = min(c, key=lambda f: abs(f - exp)) - exp
            if abs(best) < 30: d.append(best); key.append(best) if n in beats or any(n.startswith(b) for b in beats) else None
    d = np.array(d); k = np.array(key) if key else np.array([0.0])
    print(f"{sid}: {len(d)}/{len(tm[sid]['words'])} words | median {np.median(d):+.1f} fr | within ±2 fr: {np.mean(np.abs(d) <= 2) * 100:.0f}% | beat words max |Δ| {np.max(np.abs(k)):.1f} fr")
