"""
Voice pipeline for one video: videos/<slug>/voice/sNN.* -> cleaned clips + word timings.

  1. (optional --web-voice) generate missing lines from script.md with the Microsoft Emma web voice
  2. cleanup: trim silence (keep 0.15 s), high-pass 80 Hz, afftdn, compression, de-ess, loudnorm per clip
  3. Whisper (faster-whisper small.en) word timestamps, aligned to script.md so names/words are spelled right
  4. durations: per scene + per part; exits non-zero if any part is over 180 s

Outputs: videos/<slug>/build/sNN.wav, videos/<slug>/build/timings.json, public/vo/<slug>/sNN.wav
Raw recordings are never modified.
"""
import asyncio, difflib, glob, json, os, re, shutil, subprocess, sys

import imageio_ffmpeg
import soundfile as sf
from scipy.signal import resample_poly

FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
slug = sys.argv[1]
web_voice = "--web-voice" in sys.argv
VD = os.path.join(ROOT, "videos", slug)
spec = json.load(open(os.path.join(VD, "video.json")))
script = dict(re.findall(r"### (s\d\d): .+?\n\n(.+?)\n", open(os.path.join(VD, "script.md")).read()))
voiced = [s["id"] for s in spec["scenes"] if not s.get("silentSeconds")]
os.makedirs(os.path.join(VD, "voice"), exist_ok=True)
build = os.path.join(VD, "build"); os.makedirs(build, exist_ok=True)
pub = os.path.join(ROOT, "public", "vo", slug); os.makedirs(pub, exist_ok=True)

def raw_file(sid):
    hits = sorted(glob.glob(os.path.join(VD, "voice", sid + ".*")))
    return hits[0] if hits else None

# ---- validation ----
missing_script = [s for s in voiced if s not in script]
if missing_script: sys.exit(f"script.md has no line for: {missing_script}")
missing = [s for s in voiced if not raw_file(s)]

# ElevenLabs (natural, energetic) when a key is set in the environment or shorts-studio/.env
env = dict(os.environ)
for envfile in (os.path.join(ROOT, ".env"), os.path.join(os.path.dirname(ROOT), ".env")):
    if not os.path.exists(envfile): continue
    for line in open(envfile):
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.strip().split("=", 1); env.setdefault(k.strip().removeprefix("export ").strip(), v.strip().strip('"').strip("'"))
key = env.get("ELEVENLABS_API_KEY", "")
if missing and key and spec.get("voiceProvider", "auto") in ("auto", "elevenlabs"):
    import urllib.request
    voice_id = spec.get("elevenVoice", "cgSgspJ2msm6clMCkdW9")  # "Jessica": bright, playful, conversational
    settings = spec.get("elevenSettings", {"stability": 0.32, "similarity_boost": 0.8, "style": 0.55, "use_speaker_boost": True})
    for sid in missing:
        body = json.dumps({"text": script[sid], "model_id": spec.get("elevenModel", "eleven_multilingual_v2"), "voice_settings": settings}).encode()
        req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=mp3_44100_192", data=body,
                                     headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"})
        try:
            audio = urllib.request.urlopen(req, timeout=120).read()
        except urllib.error.HTTPError as e:
            print(f"ElevenLabs unavailable ({e.code}): {e.read()[:120].decode(errors='ignore')} -> trying the next voice source")
            break
        open(os.path.join(VD, "voice", sid + ".mp3"), "wb").write(audio)
        print("ElevenLabs ->", sid)
    missing = [s for s in voiced if not raw_file(s)]
# Google Gemini TTS (free tier, steerable delivery) when GEMINI_API_KEY is set
gkey = env.get("GEMINI_API_KEY") or env.get("GOOGLE_API_KEY")
if missing and gkey and spec.get("voiceProvider", "auto") in ("gemini", "auto"):
    import base64, time, urllib.request, wave
    notes = dict(re.findall(r"### (s\d\d): .+?\n\n.+?\n\n\*Delivery: (.+?)\*", open(os.path.join(VD, "script.md")).read()))
    voice = spec.get("geminiVoice", "Laomedeia")  # upbeat female; "Puck" = upbeat male
    models = [spec.get("geminiModel", "gemini-3.1-flash-tts-preview"), "gemini-2.5-flash-preview-tts"]
    style = spec.get("geminiStyle", "You are a young, energetic Indian tech creator recording a YouTube Short / Instagram Reel. "
             "Sound genuinely excited and conversational, like talking to a friend: lively pace, natural pitch movement, a smile in the voice, "
             "punchy emphasis on key words and numbers. Never robotic, never news-anchor flat.")
    for sid in missing:
        prompt = f"{style}\nDelivery for this line: {notes.get(sid, 'enthusiastic')}.\nSay every word of this, from the very first word, nothing else (questions are part of the script, say them too):\n{script[sid]}"
        body = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"responseModalities": ["AUDIO"],
                "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
        pcm = None
        for model in models:
            for attempt in range(6):
                req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                                             data=json.dumps(body).encode(), headers={"x-goog-api-key": gkey, "Content-Type": "application/json"})
                try:
                    r = json.loads(urllib.request.urlopen(req, timeout=180).read())
                    pcm = base64.b64decode(r["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]); break
                except urllib.error.HTTPError as e:
                    msg = e.read()[:300].decode(errors="ignore")
                    if e.code == 429: print(f"  {sid}: rate limited, waiting 25 s…"); time.sleep(25); continue
                    if e.code in (400, 404) and ("not found" in msg.lower() or "not supported" in msg.lower()): print(f"  {model} unavailable, trying fallback"); break
                    sys.exit(f"Gemini error {e.code} on {sid}: {msg}")
                except (KeyError, IndexError):
                    print(f"  {sid}: empty response, retrying"); time.sleep(3)
            if pcm: break
        if not pcm: sys.exit(f"Gemini gave no audio for {sid}")
        with wave.open(os.path.join(VD, "voice", sid + ".wav"), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
        print(f"Gemini ({model}, {voice}) ->", sid); time.sleep(2)
    missing = [s for s in voiced if not raw_file(s)]
if missing and web_voice:
    import edge_tts
    async def gen():
        for sid in missing:
            out = os.path.join(VD, "voice", sid + ".mp3")
            await edge_tts.Communicate(script[sid], spec.get("webVoice", "en-US-EmmaMultilingualNeural"), rate=spec.get("webVoiceRate", "+8%")).save(out)
            print("web voice ->", os.path.relpath(out, ROOT))
    asyncio.run(gen()); missing = [s for s in voiced if not raw_file(s)]
if missing:
    sys.exit(f"Missing recordings for {missing}. Record them into videos/{slug}/voice/ (s01.m4a …), "
             "set ELEVENLABS_API_KEY, or re-run with --web-voice for a temporary voice.")

# ---- 1. cleanup ----
TRIM = "silenceremove=start_periods=1:start_duration=0:start_threshold=-45dB:start_silence=0.15"
CHAIN = (f"{TRIM},areverse,{TRIM},areverse,highpass=f=80,afftdn=nr=8:nf=-40,"
         "acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,deesser=i=0.4,loudnorm=I=-16:TP=-2:LRA=7")
for sid in voiced:
    out = os.path.join(build, sid + ".wav")
    subprocess.run([FF, "-v", "error", "-y", "-i", raw_file(sid), "-af", CHAIN, "-ar", "48000", "-ac", "1", out], check=True)
    shutil.copy(out, os.path.join(pub, sid + ".wav"))

# ---- 2. Whisper word timings, aligned to the script ----
from faster_whisper import WhisperModel
model = WhisperModel("small.en", device="cpu", compute_type="int8")
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())
digit = lambda w: bool(re.search(r"\d", w))
prompt = ", ".join(spec.get("names", []) + ["Jev", "Kev", "Laya", "TypeSafe", "Convai", "Kahneman", "Almeida", "Vercel", "Nimble"])
timings = {}
for sid in voiced:
    f = os.path.join(build, sid + ".wav")
    x, sr = sf.read(f, dtype="float32"); x = resample_poly(x, 1, 3).astype("float32")
    segs, _ = model.transcribe(x, word_timestamps=True, language="en", beam_size=5, initial_prompt=prompt)
    ws = []
    for s in segs:
        for w in s.words:
            t = w.word.strip()
            if ws and re.match(r"^[-.]\S", t) and not ws[-1]["w"].endswith((".", ",", "?", "!")):
                ws[-1] = {"w": ws[-1]["w"] + t, "s": ws[-1]["s"], "e": round(w.end, 3)}
            else:
                ws.append({"w": t, "s": round(w.start, 3), "e": round(w.end, 3)})
    sc = script[sid].split()
    res, ops = [], difflib.SequenceMatcher(None, [norm(a) for a in sc], [norm(b["w"]) for b in ws], autojunk=False).get_opcodes()
    for k, (tag, i1, i2, j1, j2) in enumerate(ops):
        if tag == "equal":
            res += [{"w": sc[a], "s": ws[b]["s"], "e": ws[b]["e"]} for a, b in zip(range(i1, i2), range(j1, j2))]
        elif tag == "replace" and any(digit(w["w"]) for w in ws[j1:j2]) and (i2 - i1) == (j2 - j1):
            # same length: pair word by word -> numerals from whisper, every other word from the script
            for a, b in zip(range(i1, i2), range(j1, j2)):
                w = ws[b]; tail = re.search(r"[.,!?:;]+$", sc[a])
                res.append({"w": (w["w"].rstrip(".,!?:;") + (tail.group(0) if tail else "")) if digit(w["w"]) else sc[a], "s": w["s"], "e": w["e"]})
        elif tag == "replace" and any(digit(w["w"]) for w in ws[j1:j2]):
            # numbers: show whisper's numerals ("40", "0.85") but keep the script's trailing punctuation
            for w in ws[j1:j2]: res.append({"w": w["w"].rstrip(".,!?:;"), "s": w["s"], "e": w["e"]})
            tail = re.search(r"[.,!?:;]+$", sc[i2 - 1]); res[-1]["w"] += tail.group(0) if tail else ""
        elif tag == "replace":
            t0, t1, n = ws[j1]["s"], ws[j2 - 1]["e"], i2 - i1
            res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)} for m, a in enumerate(range(i1, i2))]
        elif tag == "delete":
            prev = ops[k - 1] if k else None
            if prev and prev[0] == "replace" and any(digit(w["w"]) for w in ws[prev[3]:prev[4]]):
                continue  # e.g. "dollars" already carried by "$40"
            t0 = res[-1]["e"] if res else 0.0
            t1 = ws[j1]["s"] if j1 < len(ws) else t0 + 0.3 * (i2 - i1)
            n = i2 - i1
            res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)} for m, a in enumerate(range(i1, i2))]
        elif tag == "insert":
            res += [w for w in ws[j1:j2] if digit(w["w"])]
    # tidy: "%" glued to its number
    tidy = []
    for w in res:
        if w["w"] in ("%", "%.", "%,") and tidy: tidy[-1]["w"] += w["w"]; tidy[-1]["e"] = w["e"]
        elif re.match(r"^dollars?[.,]?$", w["w"]) and len(tidy) > 1 and tidy[-2]["w"].startswith("$"):
            tidy[-1]["w"] += w["w"][len(w["w"].rstrip(".,")):]; tidy[-1]["e"] = w["e"]  # "$40 million dollar" -> "$40 million"
        else: tidy.append(w)
    timings[sid] = {"duration": round(sf.info(f).duration, 3), "words": tidy}
json.dump(timings, open(os.path.join(build, "timings.json"), "w"), indent=1)

# ---- 3. beat validation + durations ----
problems = []
for s in spec["scenes"]:
    words = [norm(w["w"]) for w in timings.get(s["id"], {}).get("words", [])]
    for b in s.get("beats", []):
        m = norm(b["word"])
        if not any(w == m or w.startswith(m) for w in words):
            close = difflib.get_close_matches(m, words, n=3)
            problems.append(f"  {s['id']}: beat word '{b['word']}' not spoken (close: {close})")
if problems: print("BEAT WARNINGS:\n" + "\n".join(problems))
PAD, FPS, TR = 0.3, 30, 9
import math
fr = lambda s: math.ceil(((s.get("silentSeconds") or 0) if s.get("silentSeconds") else timings[s["id"]]["duration"] + PAD) * FPS)
by_id = {s["id"]: s for s in spec["scenes"]}
print("\nscene  voice")
for sid in voiced: print(f"{sid}   {timings[sid]['duration']:6.2f}s")
over = False
for part, ids in spec["parts"].items():
    total = (sum(fr(by_id[i]) for i in ids) - TR * (len(ids) - 1)) / FPS
    flag = "  ❌ OVER 180s: shorten the longest lines (never speed up the voice)" if total > 180 else ""
    over |= total > 180
    print(f"{part:8s} {total:6.1f}s{flag}")
sys.exit(1 if over else 0)
