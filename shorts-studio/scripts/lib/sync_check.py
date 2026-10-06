"""Re-transcribe a rendered preview and compare each spoken word with the frame its caption highlight / beat fires."""
import json, re, subprocess, sys, numpy as np, soundfile as sf, imageio_ffmpeg
from faster_whisper import WhisperModel
from scipy.signal import resample_poly
FF = imageio_ffmpeg.get_ffmpeg_exe(); FPS = 30
clip, start_frame, scene = sys.argv[1], int(sys.argv[2]), sys.argv[3]
plan = json.load(open("scripts/plan.json"))["JevFull"]; vo = json.load(open("src/vo-timings.json"))
ids = [m[0] for m in plan["mid"]]; frames = lambda s: int(np.ceil((vo[s]["duration"] + 0.3) * FPS))
starts = [0]
for i in range(1, len(ids)): starts.append(starts[-1] + frames(ids[i-1]) - 9)
s0 = starts[ids.index(scene)]
subprocess.run([FF, "-v", "error", "-y", "-i", clip, "-vn", "-ac", "1", "-ar", "16000", "/tmp/claude-1000/-home-nxtwave-Youtube-Videos/6892f593-e4a6-4c9f-a351-28d11d87ca89/scratchpad/sync.wav"], check=True)
x, sr = sf.read("/tmp/claude-1000/-home-nxtwave-Youtube-Videos/6892f593-e4a6-4c9f-a351-28d11d87ca89/scratchpad/sync.wav", dtype="float32")
m = WhisperModel("small.en", device="cpu", compute_type="int8")
segs, _ = m.transcribe(x, word_timestamps=True, language="en")
heard = [(re.sub(r"[^a-z0-9]", "", w.word.lower()), start_frame + w.start * FPS) for s in segs for w in s.words]
norm = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())
deltas = []
for w in vo[scene]["words"]:
    exp = s0 + round(w["s"] * FPS)                      # frame the highlight/beat fires
    cands = [f for t, f in heard if t and (t == norm(w["w"]) or t.startswith(norm(w["w"])[:4]))]
    if cands:
        best = min(cands, key=lambda f: abs(f - exp)); deltas.append(best - exp)
        if abs(best - exp) > 2: print("  outlier:", w["w"], "expected frame", exp, "heard", round(best, 1))
d = np.array(deltas)
print(f"{scene}: {len(d)}/{len(vo[scene]['words'])} words matched | offset frames: median {np.median(d):+.1f}, mean |Δ| {np.mean(np.abs(d)):.2f}, within ±2 frames: {np.mean(np.abs(d) <= 2)*100:.0f}%, max |Δ| {np.max(np.abs(d)):.1f}")
