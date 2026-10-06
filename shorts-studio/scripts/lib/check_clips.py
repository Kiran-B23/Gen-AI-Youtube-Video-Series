"""Check each voice/sNN clip says its script line (catches skipped or invented words)."""
import re, sys, difflib, soundfile as sf
from faster_whisper import WhisperModel
from scipy.signal import resample_poly
slug = sys.argv[1]
script = dict(re.findall(r"### (s\d\d): .+?\n\n(.+?)\n", open(f"videos/{slug}/script.md").read()))
m = WhisperModel("small.en", device="cpu", compute_type="int8")
words = lambda t: re.sub(r"[^a-z0-9 ]", " ", t.lower().replace("-", " ")).split()
num = {"forty": "40", "ten": "10", "four": "4", "eighty": "80", "five": "5", "sixty": "60", "eight": "8", "thirty": "30", "six": "6", "three": "3", "hundred": "100"}
bad = 0
for sid in sorted(script):
    x, sr = sf.read(f"videos/{slug}/voice/{sid}.wav", dtype="float32"); x = resample_poly(x, 16000, sr).astype("float32")
    heard = " ".join(s.text for s in m.transcribe(x, language="en", initial_prompt="Jev, Kev, Laya, Nimble, TypeSafe")[0])
    a = [num.get(w, w) for w in words(script[sid])]; b = words(heard)
    r = difflib.SequenceMatcher(None, a, b).ratio()
    ok = r > 0.8; bad += not ok
    print(f"{sid} {r:.2f} {'ok' if ok else 'CHECK'}" + ("" if ok else f"\n   script: {script[sid][:110]}\n   heard:  {heard.strip()[:110]}"))
sys.exit(1 if bad else 0)
