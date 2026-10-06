"""Royalty-free synthesized music bed + SFX (no samples, no voice)."""
import json, os, subprocess, tempfile, sys
import numpy as np, pyloudnorm as pyln, imageio_ffmpeg
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 44100; FF = imageio_ffmpeg.get_ffmpeg_exe(); rng = np.random.default_rng(7)
t_axis = lambda s: np.arange(int(s * SR)) / SR
lp = lambda x, hz: sosfilt(butter(2, hz, "low", fs=SR, output="sos"), x)
hp = lambda x, hz: sosfilt(butter(2, hz, "high", fs=SR, output="sos"), x)
note = lambda n: 440.0 * 2 ** ((n - 69) / 12)
norm = lambda x, p=0.85: x / (np.max(np.abs(x)) + 1e-9) * p

def to_mp3(x, path, width=0.0):
    x = np.clip(x, -1, 1)
    d = int(SR * 0.012); r = np.concatenate([np.zeros(d), x[:-d]]) if width else x
    st = np.stack([x, x * (1 - width) + r * width], 1)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        wavfile.write(f.name, SR, (st * 32767).astype(np.int16))
        subprocess.run([FF, "-v", "error", "-y", "-i", f.name, "-b:a", "192k", path], check=True)
    os.unlink(f.name)

BPM = 112; BEAT = 60 / BPM; BAR = 4 * BEAT; BARS = 16
CHORDS = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [52, 55, 60]), (55, [55, 59, 62])]
N = int(BARS * BAR * SR); mix = np.zeros(N)
def place(sig, t0, g=1.0):
    i = int(t0 * SR); e = min(N, i + len(sig)); mix[i:e] += sig[: e - i] * g
    over = i + len(sig) - N
    if over > 0: mix[:over] += sig[len(sig) - over:] * g
def kick():
    t = t_axis(0.35); return np.sin(2 * np.pi * np.cumsum(50 + 110 * np.exp(-t * 30)) / SR) * np.exp(-t * 9)
def hat(): t = t_axis(0.08); return hp(rng.standard_normal(len(t)), 7000) * np.exp(-t * 40)
def clap(): t = t_axis(0.2); return hp(rng.standard_normal(len(t)), 1500) * np.exp(-t * 22)
def pad(fs, s):
    t = t_axis(s); o = sum(np.sin(2 * np.pi * f * 2 ** (d / 12) * h * t) / h for f in fs for d in (-0.12, 0, 0.12) for h in range(1, 6))
    return lp(o * np.minimum(1, t / 0.25) * np.minimum(1, (s - t) / 0.3), 1800) / (len(fs) * 3)
def pluck(f): t = t_axis(0.25); return (np.sin(2*np.pi*f*t) + 0.4*np.sin(4*np.pi*f*t)) * np.exp(-t * 14)
def bass(f, s): t = t_axis(s); return lp(np.sin(2*np.pi*f*t) + 0.3*np.sign(np.sin(2*np.pi*f*t)), 600) * np.minimum(1, t / 0.01) * np.exp(-t * 3)
for b in range(BARS):
    root, tri = CHORDS[b % 4]; t0 = b * BAR
    place(pad([note(n) for n in tri], BAR + 0.3), t0, 0.55)
    for k in range(4):
        s = t0 + k * BEAT; place(kick(), s, 0.9); place(hat(), s + BEAT / 2, 0.18)
        if k in (1, 3): place(clap(), s, 0.25)
    for e in range(8): place(bass(note(root - 12), BEAT / 2), t0 + e * BEAT / 2, 0.5)
    arp = [tri[0] + 12, tri[1] + 12, tri[2] + 12, tri[1] + 12]
    for s16 in range(16): place(pluck(note(arp[s16 % 4])), t0 + s16 * BEAT / 4, 0.12)
music = np.tanh(norm(mix, 0.8) * 1.4) / np.tanh(1.4)

def whoosh():
    t = t_axis(0.5); n = rng.standard_normal(len(t)); y = 0.0; o = np.zeros(len(t))
    for i, x in enumerate(n):
        fc = 300 + 5700 * np.sin(np.pi * min(1, t[i] / t[-1] * 1.2)) ** 2; a = 1 - np.exp(-2 * np.pi * fc / SR); y += a * (x - y); o[i] = y
    return norm(o * np.sin(np.pi * t / t[-1]) ** 1.5, 0.7)
def pop(): t = t_axis(0.14); return norm(np.sin(2*np.pi*np.cumsum(500 + 1100*np.exp(-t*45))/SR) * np.exp(-t*30), 0.7)
def ding(): t = t_axis(1.2); return norm(sum(a*np.sin(2*np.pi*1318.5*r*t)*np.exp(-t*d) for a, r, d in [(1,1,4),(.5,2,6),(.3,2.76,8),(.15,5.4,12)]) * np.minimum(1, t/0.003), 0.6)
def stamp():
    t = t_axis(0.6); thump = np.sin(2*np.pi*np.cumsum(45 + 140*np.exp(-t*25))/SR) * np.exp(-t*8)
    crack = hp(rng.standard_normal(len(t)), 900) * np.exp(-t * 35)
    return norm(thump + 0.6 * crack, 0.85)


def soft_pad():
    """Calm editorial bed: slow detuned pad on a 4-chord loop + soft sub, no drums."""
    out = np.zeros(N)
    for b in range(BARS):
        root, tri = CHORDS[b % 4]
        sig = pad([note(n) for n in tri] + [note(tri[0] + 12)], BAR + 1.2)
        i = int(b * BAR * SR); e = min(N, i + len(sig)); out[i:e] += sig[: e - i] * 0.6
        over = i + len(sig) - N
        if over > 0: out[:over] += sig[len(sig) - over:] * 0.6
        t = t_axis(BAR); sub = np.sin(2 * np.pi * note(root - 24) * t) * np.minimum(1, t / 0.4) * np.minimum(1, (BAR - t) / 0.4)
        out[i:i + len(sub)] += sub[: min(len(sub), N - i)] * 0.25
    return np.tanh(norm(lp(out, 2400), 0.8) * 1.2) / np.tanh(1.2)

def riser():
    t = t_axis(0.7); n = hp(rng.standard_normal(len(t)), 1200) * (t / t[-1]) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(300 + 900 * (t / t[-1]) ** 2) / SR) * (t / t[-1]) ** 2 * 0.3
    return norm((n + tone) * np.minimum(1, (t[-1] - t) / 0.05), 0.6)

def tick():
    t = t_axis(0.05); return norm(np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 120), 0.5)

pub = sys.argv[1]; os.makedirs(f"{pub}/sfx", exist_ok=True); os.makedirs(f"{pub}/music", exist_ok=True)
pad_bed = soft_pad()
to_mp3(pad_bed, f"{pub}/music/soft-pad.mp3", 0.4)
to_mp3(music, f"{pub}/music/neon-synth.mp3", 0.35)
for name, fn in [("whoosh", whoosh), ("pop", pop), ("ding", ding), ("stamp", stamp), ("riser", riser), ("tick", tick)]: to_mp3(fn(), f"{pub}/sfx/{name}.mp3")
meter = pyln.Meter(SR)
levels = {"music/soft-pad.mp3": round(float(meter.integrated_loudness(np.stack([pad_bed, pad_bed], 1))), 2),
          "music/neon-synth.mp3": round(float(meter.integrated_loudness(np.stack([music, music], 1))), 2)}
json.dump(levels, open(f"{pub}/music/levels.json", "w"), indent=1)
print("music levels", levels)
