"""
One continuous Gemini take for a whole video, split into per-scene clips (voice/sNN.wav).

Why: one take = one consistent, naturally energetic performance (like a creator recording in one go), and it
costs 1 API request per video instead of 1 per line (the Gemini free tier allows ~10 requests/day/model).

usage: python scripts/lib/single_take.py <slug> [model] [voice]
Splits at the silence between scenes, using Whisper word timestamps aligned to script.md.
"""
import base64, difflib, json, os, re, sys, time, urllib.request
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
slug = sys.argv[1]
model = sys.argv[2] if len(sys.argv) > 2 else "gemini-2.5-flash-preview-tts"
VD = os.path.join(ROOT, "videos", slug)
spec = json.load(open(os.path.join(VD, "video.json")))
voice = sys.argv[3] if len(sys.argv) > 3 else spec.get("geminiVoice", "Laomedeia")
lines = re.findall(r"### (s\d\d): .+?\n\n(.+?)\n", open(os.path.join(VD, "script.md")).read())
key = None
for f in (os.path.join(ROOT, ".env"), os.path.join(os.path.dirname(ROOT), ".env")):
    if os.path.exists(f):
        m = re.search(r'(?:GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*["\']?([^\s"\']+)', open(f).read())
        if m: key = m.group(1)
if not key: sys.exit("GEMINI_API_KEY not found in .env")

style = spec.get("geminiStyle", "Read this script as a young, energetic Indian tech creator recording a YouTube Short. "
         "Sound genuinely excited and conversational, like explaining something cool to a friend: lively pace, natural pitch movement, "
         "a smile in the voice, punchy emphasis on key words and numbers, and a short natural pause between paragraphs. "
         "Never robotic, never news-anchor flat. Read every word, including the questions.")
text = style + "\n\n" + "\n\n".join(t for _, t in lines)
body = {"contents": [{"parts": [{"text": text}]}], "generationConfig": {"responseModalities": ["AUDIO"],
        "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
pcm = None
for attempt in range(8):
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                                 data=json.dumps(body).encode(), headers={"x-goog-api-key": key, "Content-Type": "application/json"})
    try:
        r = json.loads(urllib.request.urlopen(req, timeout=600).read())
        pcm = base64.b64decode(r["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]); break
    except urllib.error.HTTPError as e:
        msg = e.read()[:300].decode(errors="ignore")
        if e.code in (429, 500, 503): print(f"  {e.code}, retrying in 30 s…"); time.sleep(30); continue
        sys.exit(f"Gemini error {e.code}: {msg}")
if not pcm: sys.exit("no audio from Gemini")
x = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768; SR = 24000
os.makedirs(os.path.join(VD, "voice", "_take"), exist_ok=True)
sf.write(os.path.join(VD, "voice", "_take", f"full-{model}-{voice}.wav"), x, SR)
print(f"take: {len(x)/SR:.1f}s ({model}, {voice})")

# ---- align the take to the script and cut between scenes ----
w = WhisperModel("small.en", device="cpu", compute_type="int8")
x16 = resample_poly(x, 2, 3).astype(np.float32)
segs, _ = w.transcribe(x16, word_timestamps=True, language="en", initial_prompt=", ".join(spec.get("names", [])))
heard = [(re.sub(r"[^a-z0-9]", "", ww.word.lower()), ww.start, ww.end) for s in segs for ww in s.words]
heard = [h for h in heard if h[0]]
sw, owner = [], []
for i, (_, t) in enumerate(lines):
    for tok in t.split():
        n = re.sub(r"[^a-z0-9]", "", tok.lower())
        if n: sw.append(n); owner.append(i)
sm = difflib.SequenceMatcher(None, sw, [h[0] for h in heard], autojunk=False)
first, last = {}, {}
for a, b, size in sm.get_matching_blocks():
    for k in range(size):
        i = owner[a + k]; first.setdefault(i, heard[b + k][1]); last[i] = heard[b + k][2]
print(f"aligned {sum(s for _, _, s in sm.get_matching_blocks())}/{len(sw)} script words")
cuts = [0.0]
for i in range(1, len(lines)):
    if i not in first or (i - 1) not in last: sys.exit(f"could not locate scene {lines[i][0]} in the take")
    cuts.append((last[i - 1] + first[i]) / 2)
cuts.append(len(x) / SR)
for i, (sid, _) in enumerate(lines):
    a, b = int(cuts[i] * SR), int(cuts[i + 1] * SR)
    sf.write(os.path.join(VD, "voice", f"{sid}.wav"), x[a:b], SR)
    print(f"  {sid}: {cuts[i]:6.2f}–{cuts[i+1]:6.2f}s")
