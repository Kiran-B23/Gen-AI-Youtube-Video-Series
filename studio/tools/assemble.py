"""
Assemble a HyperFrames project from projects/<slug>/scenes.json + build/timings.json.

Output: projects/<slug>/hf/  (index.html, styles, fonts, gsap, assets/mix.wav, assets/clips/*)
Then render with:  tools/run.sh <slug> render

Timing is voice-led: scene i starts where scene i-1's voice ends + PAD. Visual beats fire on the
spoken word ({"word": "...", "target": "items.0"}); captions highlight words as they are spoken.
A shared background layer is always visible, so there is never a blank frame between scenes.
"""
import html, json, math, os, re, shutil, subprocess, sys
import numpy as np, soundfile as sf
import pyloudnorm as pyln

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))
tm = json.load(open(os.path.join(P, "build", "timings.json")))
TPL = os.path.join(STUDIO, "templates", "reel")
HF = os.path.join(P, "hf"); A = os.path.join(HF, "assets"); os.makedirs(os.path.join(A, "clips"), exist_ok=True)
W, H = spec.get("size", [1080, 1920])
PAD = spec.get("padSeconds", 0.3)
# Layout grid (portrait): tracker y 70 · kicker y 150 · VISUAL ZONE x 40-1040, y 220-1260, centred on the frame
# (platform buttons only cover the lower right, so the upper area can use the full width) · source tag y 1272 ·
# CAPTION ZONE y 1555-1730 (81-90%, the user's preference: low) · visuals stay above y 1260.
MEDIA_BOX = [40, 220, 1000, 1040] if H > W else [100, 120, 1720, 840]
TH = {"bg": "#0B1020", "bg2": "#1B1F4A", "text": "#FFFFFF", "dim": "rgba(255,255,255,0.66)", "accent": "#FFC145",
      "accent2": "#2EC4B6", "ok": "#2ED3A0", "danger": "#FF5A6E", "card": "rgba(255,255,255,0.08)", "line": "rgba(255,255,255,0.18)"}
TH.update(spec.get("theme", {}))
# Colour-blocked sections: each scene picks one ("section": dark | blue | light | yellow); a new colour = a pattern break
SECTIONS = json.load(open(os.path.join(TPL, "sections.json")))   # shared with Manim clips (tools/manim_lib/studio_style.py)
SECTIONS.update(spec.get("sections", {}))
sec = lambda s: SECTIONS[s.get("section", spec.get("section", "dark"))]
secvars = lambda s: "".join(f"--{k}:{v};" for k, v in sec(s).items())
esc = lambda s: html.escape(str(s))
_NUMW = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split())}
norm = lambda w: (lambda t: _NUMW.get(t, t))(re.sub(r"[^a-z0-9]", "", w.lower()))   # "ten" == "10" (Whisper writes digits)

# ---------- timeline ----------
scenes = spec["scenes"]
starts, durs, t = [], [], 0.0
for s in scenes:
    d = s.get("seconds") or (tm[s["id"]]["duration"] + s.get("pad", PAD) if s["id"] in tm else 3.0)   # "pad": per-scene hold (e.g. let a reveal land)
    starts.append(round(t, 3)); durs.append(round(d, 3)); t += d
TOTAL = round(t, 3)

def word_time(sid, word, nth=0):
    hits = [w for w in tm.get(sid, {}).get("words", []) if norm(w["w"]) == norm(word) or norm(w["w"]).startswith(norm(word))]
    return hits[nth]["s"] if len(hits) > nth else None

# ---------- HTML builders ----------
body, gs, sfx = [], [], []   # html fragments, gsap lines, (time, name)
uid = [0]
def nid(p): uid[0] += 1; return f"{p}{uid[0]}"

def beat_at(s, i, target, fallback):
    for b in s.get("beats", []):
        if b.get("target") == target:
            wt = word_time(s["id"], b["word"], b.get("nth", 0))
            if wt is not None: return starts[i] + wt + b.get("offset", 0)
    return starts[i] + fallback

def reveal(el, at, dy=40, dur=0.5):
    # overshoot-and-settle entrance (the design system's default; matches motion_kit.pop_in)
    gs.append(f'tl.fromTo("#{el}", {{opacity: 0, y: {dy}, scale: 0.92}}, {{opacity: 1, y: 0, scale: 1, duration: {dur}, ease: "back.out(1.6)"}}, {at:.3f});')

STEPS = spec.get("steps", [])
def tracker_html(s):
    """Progress pills (spec "steps" + scene "step", 1-based): done = filled dim, current = accent, next = outline."""
    if not STEPS or not s.get("step"): return ""
    k = s["step"]
    pills = "".join(f'<span class="step{" now" if j + 1 == k else " done" if j + 1 < k else ""}">{j + 1} {esc(t)}</span>' for j, t in enumerate(STEPS))
    return f'<div class="tracker">{pills}</div>'

def clipdiv(i, inner, cls="scene", drift=True):
    sid, did = nid("sc"), nid("dr")
    s = scenes[i]
    body.append(f'<div id="{sid}" class="clip {cls}" data-start="{starts[i]}" data-duration="{durs[i]}" data-track-index="1" style="{secvars(s)}">'
                f'{tracker_html(s)}<div id="{did}" class="drift">{inner}</div></div>')
    if drift:   # slow settle so no frame is ever fully static (animate the inner wrapper, never the .clip)
        gs.append(f'tl.fromTo("#{did}", {{scale: 1}}, {{scale: 1.025, duration: {durs[i]:.3f}, ease: "none"}}, {starts[i]:.3f});')
    return sid

def kicker_html(s):
    return f'<div class="kicker">{esc(s["kicker"])}</div>' if s.get("kicker") else ""

def source_html(s):
    """On-screen source tag only for key claims ("source_on_screen": true). Every source still lives in the scene's
    "source" field and in the publish kit's description (the default: nothing on screen, like top Shorts)."""
    return ""   # user rule (2026-10-09): no sources on screen; every source goes in the description (publish kit)

def scene_title(s, i, p):
    lines = "".join(f'<div class="hl">{esc(l)}</div>' for l in p.get("lines", []))
    hi = p.get("highlight")
    if hi: lines = lines.replace(esc(hi), f'<span class="acc">{esc(hi)}</span>', 1)
    chips_ids = [nid("chip") for _ in p.get("chips", [])]
    chips = "".join(f'<span id="{c}" class="chip">{esc(t)}</span>' for c, t in zip(chips_ids, p.get("chips", [])))
    sub_id = nid("sub")
    sub = f'<div id="{sub_id}" class="sub">{esc(p["sub"])}</div>' if p.get("sub") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band band-top">{lines}{sub}<div class="chips">{chips}</div></div>{source_html(s)}')
    if p.get("sub"): reveal(sub_id, beat_at(s, i, "sub", 0.8))
    for k, c in enumerate(chips_ids):
        at = beat_at(s, i, f"chips.{k}", 1.0 + k * 0.5); reveal(c, at, 24); sfx.append((at, "pop"))

def scene_points(s, i, p):
    ids = [nid("pt") for _ in p["items"]]
    rows = "".join(f'<div id="{r}" class="row"><span class="ico">{esc(it.get("icon", "•"))}</span><span>{esc(it["text"])}</span>'
                   + (f'<span class="pill">{esc(it["source"])}</span>' if it.get("source") else "") + "</div>"
                   for r, it in zip(ids, p["items"]))
    title = f'<div class="h2">{esc(p["title"])}</div>' if p.get("title") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band">{title}<div class="rows">{rows}</div></div>{source_html(s)}')
    for k, r in enumerate(ids):
        at = beat_at(s, i, f"items.{k}", 0.5 + k * 0.8); reveal(r, at, 0); gs.append(f'tl.fromTo("#{r}", {{x: -40}}, {{x: 0, duration: 0.45, ease: "power3.out"}}, {at:.3f});'); sfx.append((at, "pop"))

def scene_counter(s, i, p):
    nid_ = nid("num"); lid = nid("lbl")
    clipdiv(i, f'{kicker_html(s)}<div class="band center"><div id="{nid_}" class="bignum">{esc(p.get("prefix", ""))}0{esc(p.get("suffix", ""))}</div>'
               f'<div id="{lid}" class="h2">{esc(p.get("label", ""))}</div>'
               + (f'<span class="pill big">{esc(p["source"])}</span>' if p.get("source") else "") + f'</div>{source_html(s)}')
    at = beat_at(s, i, "number", 0.4)
    to = p["value"]; dec = p.get("decimals", 0)
    gs.append(f'(function(){{var o={{v:0}}, el=document.getElementById("{nid_}"); tl.to(o,{{v:{to},duration:0.9,ease:"power2.out",onUpdate:function(){{el.textContent="{p.get("prefix","")}"+o.v.toFixed({dec}).replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,",")+"{p.get("suffix","")}";}}}},{at:.3f});}})();')
    reveal(lid, at + 0.3, 20); sfx.append((at + 0.9, "ding"))

def scene_compare(s, i, p):
    lid, rid, vid = nid("l"), nid("r"), nid("v")
    col = lambda c, side: (f'<div class="h3">{esc(side["title"])}</div>' + "".join(f'<div class="li">{esc(x)}</div>' for x in side.get("items", [])))
    verdict = f'<div id="{vid}" class="verdict">{esc(p["verdict"])}</div>' if p.get("verdict") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band"><div class="cols"><div id="{lid}" class="card col">{col("l", p["left"])}</div>'
               f'<div id="{rid}" class="card col accent">{col("r", p["right"])}</div></div>{verdict}</div>{source_html(s)}')
    reveal(lid, beat_at(s, i, "left", 0.3)); reveal(rid, beat_at(s, i, "right", 1.0)); sfx.append((beat_at(s, i, "right", 1.0), "pop"))
    if p.get("verdict"): at = beat_at(s, i, "verdict", 2.0); reveal(vid, at, 30); sfx.append((at, "stamp"))

def scene_stamp(s, i, p):
    st = nid("st"); sub = nid("ss")
    clipdiv(i, f'{kicker_html(s)}<div class="band center"><div id="{st}" class="stamp"{f' style="font-size:{int(p["size"])}px"' if p.get("size") else ""}>{esc(p["text"])}</div>'
               + (f'<div id="{sub}" class="sub">{esc(p["sub"])}</div>' if p.get("sub") else "") + f'</div>{source_html(s)}')
    at = beat_at(s, i, "stamp", 0.3)
    gs.append(f'tl.fromTo("#{st}", {{scale: 2.4, opacity: 0, rotation: -12}}, {{scale: 1, opacity: 1, rotation: -4, duration: 0.35, ease: "back.out(2)"}}, {at:.3f});')
    sfx.append((at, "stamp"))
    if p.get("sub"): reveal(sub, beat_at(s, i, "sub", 1.0))

def scene_code(s, i, p):
    lines = p["code"]; ids = [nid("cl") for _ in lines]
    code = "".join(f'<div id="{c}" class="cline">{esc(l) or "&nbsp;"}</div>' for c, l in zip(ids, lines))
    clipdiv(i, f'{kicker_html(s)}<div class="band"><div class="codecard"><div class="codebar">● ● ● &nbsp;{esc(p.get("file", ""))}</div><div class="code">{code}</div></div></div>{source_html(s)}')
    t0 = beat_at(s, i, "code", 0.3)
    for k, c in enumerate(ids): gs.append(f'tl.fromTo("#{c}", {{opacity: 0}}, {{opacity: 1, duration: 0.12}}, {t0 + k * 0.12:.3f});')

def scene_media(s, i, p):
    """A clip from a builder (manim / playwright / vhs / stock), padded to the scene length. A clip with build.span
    covers the following scenes too (one continuous animation); those scenes say {"of": "<owner id>"} and only add overlays."""
    if p.get("of"):
        over = f'{kicker_html(s)}{source_html(s)}'
        if over or tracker_html(s): clipdiv(i, over, "scene overlay", drift=False)
        return
    span = p.get("build", {}).get("span", [])
    total = round(durs[i] + sum(durs[k] for k, x in enumerate(scenes) if x["id"] in span), 3)
    src = os.path.join(P, p["clip"]) if not os.path.isabs(p["clip"]) else p["clip"]
    alpha = src.endswith(".webm")      # transparent Manim clips keep their alpha through padding (VP9 yuva420p)
    dst = os.path.join(A, "clips", f"{s['id']}.{'webm' if alpha else 'mp4'}")
    box = p.get("box", MEDIA_BOX)  # x, y, w, h · borderless, same colour as the section, inside the safe band
    # pad (clone last frame) so the clip always covers the scene; scale to fit the box
    PRE = 0.12   # pre-roll: the video starts this early with its first frame held, so the first frame is already decoded when the scene begins
    fit = f"scale={box[2]}:{box[3]}:force_original_aspect_ratio=decrease"
    cues = os.path.join(P, "build", "cues", f"{s['id']}.txt")   # sound cues the clip emitted (self.cue)
    if os.path.exists(cues):
        for line in open(cues):
            t_, name = line.split(); sfx.append((starts[i] + float(t_), name))
    if alpha:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", src, "-vf",
                        f"{fit},format=yuva420p,pad={box[2]}:{box[3]}:(ow-iw)/2:(oh-ih)/2:color=0x00000000,tpad=start_mode=clone:start_duration={PRE}:stop_mode=clone:stop_duration={total},fps=30",
                        "-t", str(total + PRE), "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "24", "-row-mt", "1",
                        "-deadline", "good", "-cpu-used", "4", "-auto-alt-ref", "0", dst], check=True)
    else:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf",
                        f"{fit}:out_color_matrix=bt709,pad={box[2]}:{box[3]}:(ow-iw)/2:(oh-ih)/2:color={sec(s)['bg']},tpad=start_mode=clone:start_duration={PRE}:stop_mode=clone:stop_duration={total},fps=30",
                        "-t", str(total + PRE), "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", dst], check=True)
    vid, wid = nid("vid"), nid("mw")
    body.append(f'<div id="{wid}" class="mwrap" style="left:{box[0]}px;top:{box[1]}px;width:{box[2]}px;height:{box[3]}px">')
    v0 = max(0.0, starts[i] - PRE)
    body.append(f'<video id="{vid}" class="clip media" src="assets/clips/{os.path.basename(dst)}" data-start="{v0:.3f}" data-duration="{total + (starts[i] - v0):.3f}" '
                f'data-track-index="2" muted playsinline style="left:0;top:0;width:{box[2]}px;height:{box[3]}px"></video></div>')
    gs.append(f'tl.fromTo("#{wid}", {{scale: 1}}, {{scale: 1.02, duration: {total:.3f}, ease: "none"}}, {starts[i]:.3f});')
    over = (f'{kicker_html(s)}' + (f'<div class="medialabel">{esc(p["label"])}</div>' if p.get("label") else "") + source_html(s))
    if over or tracker_html(s): clipdiv(i, over, "scene overlay", drift=False)

def scene_cta(s, i, p):
    q, f = nid("q"), nid("f")
    clipdiv(i, f'<div class="band center"><div id="{q}" class="bubble">{esc(p["question"])}</div>'
               f'<div id="{f}" class="follow">+ {esc(p.get("follow", "Follow for more"))}</div></div>')
    reveal(q, beat_at(s, i, "question", 0.2), 40); at = beat_at(s, i, "follow", 1.5); reveal(f, at, 30); sfx.append((at, "pop"))

def scene_duel(s, i, p):
    """Two giant numbers head to head (e.g. 6 vs 10 tokens)."""
    ids = {}
    cols = ""
    for side in ("left", "right"):
        d = p[side]; ids[side] = (nid("dc"), nid("dn"))
        cols += (f'<div id="{ids[side][0]}" class="duelcol{" accent" if side == "right" else ""}"><div class="duellab">{esc(d["label"])}</div>'
                 f'<div id="{ids[side][1]}" class="duelnum">0</div><div class="duelunit">{esc(d.get("unit", ""))}</div>'
                 + (f'<div class="duelsub">{esc(d["sub"])}</div>' if d.get("sub") else "") + '</div>')
    vid = nid("dv")
    verdict = f'<div id="{vid}" class="verdict">{esc(p["verdict"])}</div>' if p.get("verdict") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band center"><div class="duel">{cols}</div>{verdict}</div>{source_html(s)}')
    for side, fb in (("left", 0.2), ("right", 1.2)):
        at = beat_at(s, i, side, fb); c, n = ids[side]; reveal(c, at, 30)
        gs.append(f'(function(){{var o={{v:0}}, el=document.getElementById("{n}"); tl.to(o,{{v:{p[side]["value"]},duration:0.6,ease:"power2.out",onUpdate:function(){{el.textContent=Math.round(o.v);}}}},{at + 0.1:.3f});}})();')
        sfx.append((at + 0.6, "ding"))
    if p.get("verdict"): at = beat_at(s, i, "verdict", 2.2); reveal(vid, at, 30); sfx.append((at, "pop"))

def scene_recap(s, i, p):
    """A save-worthy chain: item -> item -> item, revealed on spoken words."""
    ids = [nid("rc") for _ in p["items"]]
    arrows = [nid("ra") for _ in p["items"]]
    chain = "".join((f'<div id="{arrows[k]}" class="arrow">↓</div>' if k else "") + f'<div id="{r}" class="recapitem"><span class="recapn">{k + 1}</span>{esc(t)}</div>'
                    for k, (r, t) in enumerate(zip(ids, p["items"])))
    title = f'<div class="recaptitle">{esc(p.get("title", "Recap"))}</div>'
    clipdiv(i, f'{kicker_html(s)}<div class="band center">{title}<div class="recap">{chain}</div></div>{source_html(s)}')
    for k, r in enumerate(ids):
        at = beat_at(s, i, f"items.{k}", 0.3 + k * 0.7); reveal(r, at, 24); sfx.append((at, "pop"))
        if k: reveal(arrows[k], at - 0.15, 0, 0.25)   # each arrow appears with the item it points to

BUILD = {"duel": scene_duel, "recap": scene_recap, "title": scene_title, "points": scene_points, "counter": scene_counter, "compare": scene_compare,
         "stamp": scene_stamp, "code": scene_code, "media": scene_media, "cta": scene_cta}

for i, s in enumerate(scenes):
    if s["type"] not in BUILD: sys.exit(f"Unknown scene type '{s['type']}' in {s['id']}. Known: {', '.join(BUILD)}")
    g0 = len(gs)
    BUILD[s["type"]](s, i, s.get("props", {}))
    if s["type"] in ("compare", "points", "stamp", "code", "duel", "recap"):   # everything in these is revealed: catch empty openings
        first = min([float(x) for x in re.findall(r", (\d+\.\d+)\);$", "\n".join(gs[g0:]), re.M)] or [starts[i]])
        if first - starts[i] > 0.8:
            print(f"  ⚠ {s['id']}: screen is empty for the first {first - starts[i]:.1f}s; move its first beat to an earlier word")
    times = [float(x) for x in re.findall(r", (\d+\.\d+)\);$", "\n".join(gs[g0:]), re.M)]
    if s["type"] != "media" and times and starts[i] + durs[i] - max(times) < 0.9:
        print(f"  ⚠ {s['id']}: an element appears only {starts[i] + durs[i] - max(times):.1f}s before the scene ends; trigger it on an earlier word")
    # whole-scene entrance: gentle fade/settle on the scene's content (never on the .clip itself)
    if i > 0 and s.get("section", spec.get("section", "dark")) == scenes[i - 1].get("section", spec.get("section", "dark")) and not s.get("props", {}).get("of"):
        sfx.append((starts[i], "tick"))

# ---------- section transitions: a wipe in the next section's colour (the transition IS the exit) ----------
# primary: wipe up from the bottom; accent: every third section change wipes in from the right
wipes, D, nchg = [], 0.38, 0
for i in range(1, len(scenes)):
    if scenes[i].get("section", spec.get("section", "dark")) == scenes[i - 1].get("section", spec.get("section", "dark")): continue
    nchg += 1; t1 = starts[i] - 0.05; t0 = max(starts[i - 1], t1 - D); wid = nid("wp")   # the wipe lands 0.05 s BEFORE the scene starts, so its first frame shows content
    axis, frm = ("x", W) if nchg % 3 == 0 else ("y", H)
    wipes.append(f'<div class="clip wipe" data-start="{t0:.3f}" data-duration="{t1 - t0:.3f}" data-track-index="3" style="{secvars(scenes[i])}"><div id="{wid}" class="wipefill"></div></div>')
    gs.append(f'tl.fromTo("#{wid}", {{{axis}: {frm}}}, {{{axis}: 0, duration: {t1 - t0 - 0.02:.3f}, ease: "power3.inOut"}}, {t0:.3f});')
    sfx.append((t0, "whoosh"))

# ---------- captions: 2-6 word cards, words light up as spoken ----------
keys = {norm(k) for k in spec.get("keywords", [])}
CAP0 = len(body)   # captions start here: the glow layer goes between the scenes and the captions
for i, s in enumerate(scenes):
    words = tm.get(s["id"], {}).get("words", [])
    cards, cur = [], []
    for k, w in enumerate(words):
        cur.append(w); nxt = words[k + 1] if k + 1 < len(words) else None
        # sentence captions: up to ~2 lines (9 words); break at sentence ends, at commas after 5+ words, or at long pauses
        if len(cur) >= 9 or (len(cur) >= 2 and re.search(r"[.!?]$", w["w"])) or (len(cur) >= 5 and re.search(r"[,:;]$", w["w"])) \
                or (nxt and nxt["s"] - w["e"] > 0.5 and len(cur) >= 2):
            cards.append(cur); cur = []
    if cur:
        if len(cur) == 1 and cards and len(cards[-1]) < 9: cards[-1] += cur
        else: cards.append(cur)
    for c, card in enumerate(cards):
        a = max(0.0, starts[i] + card[0]["s"] - 0.05)
        b = starts[i] + (cards[c + 1][0]["s"] - 0.05 if c + 1 < len(cards) else min(card[-1]["e"] + 0.5, durs[i] - 0.02))
        cid = nid("cap"); spans = []
        for w in card:
            wid = nid("w"); hot = bool(re.search(r"\d", w["w"])) or norm(w["w"]) in keys
            spans.append(f'<span id="{wid}" class="w{" hot" if hot else ""}">{esc(w["w"])}</span>')
            gs.append(f'tl.set("#{wid}", {{opacity: 1}}, {starts[i] + w["s"]:.3f});')
            if hot:   # kinetic caption: the key word pops as it is spoken
                gs.append(f'tl.fromTo("#{wid}", {{scale: 1}}, {{scale: 1.09, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out"}}, {starts[i] + w["s"]:.3f});')
        body.append(f'<div id="{cid}" class="clip caption" data-start="{a:.3f}" data-duration="{max(0.2, b - a):.3f}" data-track-index="5" style="{secvars(s)}"><div class="capbox">{" ".join(spans)}</div></div>')

# ---------- audio mix: voice + ducked music + sfx -> -14 LUFS ----------
SR = 48000
N = int(math.ceil(TOTAL * SR)) + SR
mix = np.zeros(N); voice = np.zeros(N)
for i, s in enumerate(scenes):
    f = os.path.join(P, "build", "voice", f"{s['id']}.wav")
    if not os.path.exists(f): continue
    x, sr = sf.read(f); x = x if x.ndim == 1 else x.mean(1)
    a = int(starts[i] * SR); voice[a:a + len(x)] += x[: N - a]
mdir = os.path.join(TPL, "audio")
levels = json.load(open(os.path.join(mdir, "music", "levels.json")))
mname = f"music/{spec.get('music', 'upbeat-synth')}.wav"
m, msr = sf.read(os.path.join(mdir, mname)); m = m.mean(1) if m.ndim > 1 else m
if msr != SR: from scipy.signal import resample_poly; m = resample_poly(m, SR, msr)
music = np.tile(m, N // len(m) + 1)[:N]
# duck: ~-24 LUFS under speech, ~-16 LUFS in gaps > 0.6 s, 200 ms ramps
speech = np.zeros(N, bool)
for i, s in enumerate(scenes):
    ws = tm.get(s["id"], {}).get("words", [])
    if ws: speech[int((starts[i] + ws[0]["s"] - 0.2) * SR): int((starts[i] + ws[-1]["e"]) * SR)] = True
lo, hi = 10 ** ((-24 - levels[mname]) / 20), 10 ** ((-16 - levels[mname]) / 20)
target = np.where(speech, lo, hi); ramp = int(0.2 * SR)
gain = np.convolve(target, np.ones(ramp) / ramp, mode="same")
fade = np.minimum(1, np.minimum(np.arange(N) / SR, (TOTAL - np.arange(N) / SR).clip(0) / 1.5))
mix += music * gain * fade + voice
for t, name in sfx:
    f = os.path.join(mdir, "sfx", f"{name}.wav")
    x, sr = sf.read(f); x = x.mean(1) if x.ndim > 1 else x
    a = int(t * SR)
    if 0 <= a < N: mix[a:a + len(x)] += x[: N - a] * {"pop": 0.18, "whoosh": 0.12, "ding": 0.15, "stamp": 0.25, "tick": 0.1, "riser": 0.15}.get(name, 0.15)
mix = mix[: int(TOTAL * SR)]
meter = pyln.Meter(SR)
mix = pyln.normalize.loudness(mix, meter.integrated_loudness(np.stack([mix, mix], 1)), -14.0)  # measure as the stereo file it becomes
peak = np.max(np.abs(mix)); ceiling = 10 ** (-1.5 / 20)
if peak > ceiling: mix = np.tanh(mix / ceiling) * ceiling  # soft-limit so true peak stays below about -1 dBTP
sf.write(os.path.join(A, "mix.wav"), np.stack([mix, mix], 1), SR, subtype="PCM_16")

# ---------- write project ----------
for f in ("gsap.min.js",): shutil.copy(os.path.join(TPL, f), os.path.join(HF, f))
shutil.copytree(os.path.join(TPL, "fonts"), os.path.join(HF, "fonts"), dirs_exist_ok=True)
css = open(os.path.join(TPL, "styles.css")).read()
root_vars = "".join(f"--{k}:{v};" for k, v in TH.items())
secbgs = "".join(f'<div class="clip secbg" data-start="{starts[i]}" data-duration="{durs[i]}" data-track-index="0" style="{secvars(s)}">'
                 f'<div class="vignette"></div><div class="lightspot"></div><div class="grain"></div></div>' for i, s in enumerate(scenes))   # depth: vignette + light + grain on every section
bg = (f'<div class="clip bgfill" data-start="0" data-duration="{TOTAL}" data-track-index="0"></div>{secbgs}')
glow = f'<div class="clip glowlayer" data-start="0" data-duration="{TOTAL}" data-track-index="4"><div id="bgglow" class="bgglow" data-layout-allow-overflow></div></div>'
doc = f"""<!doctype html>
<html lang="en" data-resolution="{'portrait' if H > W else 'landscape'}">
<head><meta charset="UTF-8" /><meta name="viewport" content="width={W}, height={H}" />
<script src="gsap.min.js"></script>
<style>:root{{{root_vars}}}
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;background:{TH['bg']};}}
{css}</style></head>
<body>
<div id="root" class="{'portrait' if H > W else 'landscape'}" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="{W}" data-height="{H}">
{bg}
{chr(10).join(body[:CAP0] + wipes + [glow] + body[CAP0:])}
<audio id="mix" src="assets/mix.wav" data-start="0" data-duration="{TOTAL}" data-track-index="10" data-volume="1"></audio>
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
tl.fromTo("#bgglow", {{xPercent: -10, yPercent: -6}}, {{xPercent: 10, yPercent: 6, duration: {TOTAL}, ease: "none"}}, 0);
{chr(10).join(gs)}
window.__timelines["main"] = tl;
tl.seek(0);
</script>
</body></html>
"""
open(os.path.join(HF, "index.html"), "w").write(doc)
for f in ("hyperframes.json", "meta.json", "package.json"):
    src = os.path.join(TPL, "hf", f)
    if os.path.exists(src) and not os.path.exists(os.path.join(HF, f)): shutil.copy(src, os.path.join(HF, f))
json.dump({"total": TOTAL, "scenes": [{"id": s["id"], "type": s["type"], "start": starts[i], "duration": durs[i]} for i, s in enumerate(scenes)]},
          open(os.path.join(P, "build", "layout.json"), "w"), indent=1)
print(f"assembled {len(scenes)} scenes · {TOTAL:.1f}s · {len(sfx)} sfx · -> {os.path.relpath(HF, STUDIO)}/index.html")
