"""
UI sounds built in code (the motion-design method: every visible action has a sound, built from the same timeline):
click (a mouse click), key (one keystroke), blip (a soft confirmation). Written once into templates/reel/audio/sfx/,
next to the CC0 samples (pop, ding, stamp, whoosh, tick, riser). Deterministic; FORCE=1 rewrites.

usage: python tools/sfx_synth.py
"""
import os, numpy as np, soundfile as sf

SR = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "templates", "reel", "audio", "sfx")
rng = np.random.default_rng(4821)
t = lambda d: np.arange(int(d * SR)) / SR
def env(d, a=0.001, tau=0.02):
    x = t(d); return np.minimum(1, x / a) * np.exp(-(x - a).clip(0) / tau)
def lowpass(x, fc):
    from scipy.signal import butter, lfilter
    b, a = butter(2, fc / (SR / 2)); return lfilter(b, a, x)
def bandpass(x, lo, hi):
    from scipy.signal import butter, lfilter
    b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], btype="band"); return lfilter(b, a, x)
def norm(x, db=-6): return x / (np.max(np.abs(x)) + 1e-9) * 10 ** (db / 20)

def click():   # a mouse button: a bright transient with a woody body
    d = 0.06; n = rng.standard_normal(int(d * SR))
    return norm(bandpass(n, 1800, 6000) * env(d, 0.0005, 0.006) + 0.5 * np.sin(2 * np.pi * 320 * t(d)) * env(d, 0.001, 0.012))
def key():     # one keystroke: a softer, lower click, with the key bottoming out
    d = 0.08; n = rng.standard_normal(int(d * SR)); x = t(d)
    return norm(bandpass(n, 900, 3500) * env(d, 0.0005, 0.008) + 0.35 * lowpass(rng.standard_normal(int(d * SR)), 700) * env(d, 0.001, 0.02) * (x > 0.018))
def blip():    # a soft confirmation: a rising two-tone, quick decay
    d = 0.14; x = t(d); f = 880 + 320 * np.minimum(1, x / 0.05)
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * env(d, 0.004, 0.045), -8)

for name, fn in (("click", click), ("key", key), ("blip", blip)):
    f = os.path.join(OUT, f"{name}.wav")
    if os.path.exists(f) and not os.environ.get("FORCE"): print(f"{name}: kept"); continue
    sf.write(f, fn().astype(np.float32), SR, subtype="PCM_16"); print(f"{name}: wrote {os.path.relpath(f, OUT)}")
