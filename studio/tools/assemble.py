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
    """Start time of the nth spoken `word` in a scene: exact matches first, prefix matches only when there is no exact hit
    ("an" never lands on "and"; same rule as the stage's W())."""
    ws = tm.get(sid, {}).get("words", []); n = norm(word)
    ex = [w for w in ws if norm(w["w"]) == n]
    hits = ex if len(ex) > nth else [w for w in ws if norm(w["w"]) == n or norm(w["w"]).startswith(n)]
    return hits[nth]["s"] if len(hits) > nth else None

# ---------- HTML builders ----------
body, gs, sfx = [], [], []   # html fragments, gsap lines, (time, name)
uid = [0]
def nid(p): uid[0] += 1; return f"{p}{uid[0]}"

# Every beat is an event on the one timeline: the element it reveals (el / data-beat), how payoffs.mjs checks it
# ("check": visible | reveal | motion | none), its sound cue ("sfx": name | "none"; default by kind, like the motion-design
# method: every visible action has a sound landing on its frame) and an optional camera move ("cam": [x, y, zoom]).
SFX_DEFAULT = {"reveal": "pop", "visible": "pop", "motion": None, "none": None}
SFX_DEFAULT.update({k: (None if v == "none" else v) for k, v in (spec.get("sfxDefault") or {}).items()})
CAM = []   # camera keyframes for layout.json (stage scenes only; the stage is wrapped in #cam)
CAMC = 840   # the stage zone's centre (y 220-1460): a zoom brings its focus point here
def cam_to(at, x, y, z, d=0.6, sid=None, cue=True):
    tx, ty = W / 2 - x * z, CAMC - y * z   # origin 0 0: point (x, y) lands on the zone centre at scale z; [540, 840, 1] = home
    gs.append(f'tl.to("#cam", {{x: {tx:.1f}, y: {ty:.1f}, scale: {z}, transformOrigin: "0 0", duration: {d}, ease: "power3.inOut"}}, {at:.3f});')
    CAM.append({"scene": sid, "at": round(at, 3), "x": x, "y": y, "zoom": z, "d": d})
    if z != 1 and cue: sfx.append((at, "whoosh"))   # a zoom whooshes unless the beat already carries its own sound

BEATS = {}   # (scene, target) -> resolved time + el/check/sfx/cam; written to layout.json for payoffs.mjs and the payoff sheet
def beat_at(s, i, target, fallback, el=None):
    """Time of a beat. A beat whose word was not spoken is a defect, not a silent fallback: it stops the build unless the
    beat carries an explicit "fallback": <s>. Presets with no beat for `target` keep their built-in default."""
    for b in s.get("beats", []):
        if b.get("target") == target:
            wt = word_time(s["id"], b["word"], b.get("nth", 0))
            if wt is None:
                if "fallback" not in b:
                    sys.exit(f"✗ {s['id']}: beat '{target}' word '{b['word']}' is not in the voice timings (voice.py listed close matches). "
                             "Fix the word in scenes.json, re-voice, or add \"fallback\": <seconds> to accept a fixed time.")
                print(f"  ⚠ {s['id']}: beat '{target}' word '{b['word']}' not spoken; using fallback {b['fallback']}s")
                at = starts[i] + b["fallback"]
            else:
                at = starts[i] + wt + b.get("offset", 0)
            chk = b.get("check", "reveal" if el else "visible")
            cue = b.get("sfx", SFX_DEFAULT.get(chk)); cue = None if cue == "none" else cue
            BEATS[(s["id"], target)] = {"scene": s["id"], "word": b["word"], "target": target, "at": round(at, 3), "el": el, "check": chk,
                                        "sfx": cue, "settle": b.get("settle", 0.5), "cam": b.get("cam")}
            if b.get("cam"):
                x, y, z = b["cam"]; cam_to(at + b.get("camOffset", 0), x, y, z, b.get("camDur", 0.6), s["id"], cue=cue is None)
            return at
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
    if drift:   # slow settle so no frame is ever fully static (animate the inner wrapper, never the .clip); 1.01 only: it must not pass for motion
        gs.append(f'tl.fromTo("#{did}", {{scale: 1}}, {{scale: 1.01, duration: {durs[i]:.3f}, ease: "none"}}, {starts[i]:.3f});')
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
    if p.get("sub"): reveal(sub_id, beat_at(s, i, "sub", 0.8, sub_id))
    for k, c in enumerate(chips_ids):
        at = beat_at(s, i, f"chips.{k}", 1.0 + k * 0.5, c); reveal(c, at, 24); sfx.append((at, "pop"))

def scene_points(s, i, p):
    ids = [nid("pt") for _ in p["items"]]
    rows = "".join(f'<div id="{r}" class="row"><span class="ico">{esc(it.get("icon", "•"))}</span><span>{esc(it["text"])}</span>'
                   + (f'<span class="pill">{esc(it["source"])}</span>' if it.get("source") else "") + "</div>"
                   for r, it in zip(ids, p["items"]))
    title = f'<div class="h2">{esc(p["title"])}</div>' if p.get("title") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band">{title}<div class="rows">{rows}</div></div>{source_html(s)}')
    for k, r in enumerate(ids):
        at = beat_at(s, i, f"items.{k}", 0.5 + k * 0.8, r); reveal(r, at, 0); gs.append(f'tl.fromTo("#{r}", {{x: -40}}, {{x: 0, duration: 0.45, ease: "power3.out"}}, {at:.3f});'); sfx.append((at, "pop"))

def scene_counter(s, i, p):
    nid_ = nid("num"); lid = nid("lbl")
    # the number stays hidden until its spoken word (never a "0" on screen); the label sets the context first
    clipdiv(i, f'{kicker_html(s)}<div class="band center"><div id="{nid_}" class="bignum" style="opacity:0">{esc(p.get("prefix", ""))}0{esc(p.get("suffix", ""))}</div>'
               f'<div id="{lid}" class="h2">{esc(p.get("label", ""))}</div>'
               + (f'<span class="pill big">{esc(p["source"])}</span>' if p.get("source") else "") + f'</div>{source_html(s)}')
    at = beat_at(s, i, "number", 0.4, nid_)
    to = p["value"]; dec = p.get("decimals", 0)
    gs.append(f'tl.fromTo("#{nid_}", {{opacity: 0, scale: 0.85}}, {{opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)"}}, {at:.3f});')
    gs.append(f'(function(){{var o={{v:0}}, el=document.getElementById("{nid_}"); tl.to(o,{{v:{to},duration:0.7,ease:"power2.out",onUpdate:function(){{el.textContent="{p.get("prefix","")}"+o.v.toFixed({dec}).replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,",")+"{p.get("suffix","")}";}}}},{at:.3f});}})();')
    reveal(lid, min(at + 0.3, beat_at(s, i, "label", 0.15, lid)), 20); sfx.append((at + 0.7, "ding"))

def scene_compare(s, i, p):
    lid, rid, vid = nid("l"), nid("r"), nid("v")
    col = lambda c, side: (f'<div class="h3">{esc(side["title"])}</div>' + "".join(f'<div class="li">{esc(x)}</div>' for x in side.get("items", [])))
    verdict = f'<div id="{vid}" class="verdict">{esc(p["verdict"])}</div>' if p.get("verdict") else ""
    clipdiv(i, f'{kicker_html(s)}<div class="band"><div class="cols"><div id="{lid}" class="card col">{col("l", p["left"])}</div>'
               f'<div id="{rid}" class="card col accent">{col("r", p["right"])}</div></div>{verdict}</div>{source_html(s)}')
    reveal(lid, beat_at(s, i, "left", 0.3, lid)); at = beat_at(s, i, "right", 1.0, rid); reveal(rid, at); sfx.append((at, "pop"))
    if p.get("verdict"): at = beat_at(s, i, "verdict", 2.0, vid); reveal(vid, at, 30); sfx.append((at, "stamp"))

def scene_stamp(s, i, p):
    st = nid("st"); sub = nid("ss")
    clipdiv(i, f'{kicker_html(s)}<div class="band center"><div id="{st}" class="stamp"{f' style="font-size:{int(p["size"])}px"' if p.get("size") else ""}>{esc(p["text"])}</div>'
               + (f'<div id="{sub}" class="sub">{esc(p["sub"])}</div>' if p.get("sub") else "") + f'</div>{source_html(s)}')
    at = beat_at(s, i, "stamp", 0.3, st)
    gs.append(f'tl.fromTo("#{st}", {{scale: 2.4, opacity: 0, rotation: -12}}, {{scale: 1, opacity: 1, rotation: -4, duration: 0.35, ease: "back.out(2)"}}, {at:.3f});')
    sfx.append((at, "stamp"))
    if p.get("sub"): reveal(sub, beat_at(s, i, "sub", 1.0, sub))

def scene_code(s, i, p):
    lines = p["code"]; ids = [nid("cl") for _ in lines]
    code = "".join(f'<div id="{c}" class="cline">{esc(l) or "&nbsp;"}</div>' for c, l in zip(ids, lines))
    clipdiv(i, f'{kicker_html(s)}<div class="band"><div class="codecard"><div class="codebar">● ● ● &nbsp;{esc(p.get("file", ""))}</div><div class="code">{code}</div></div></div>{source_html(s)}')
    t0 = beat_at(s, i, "code", 0.3, ids[0] if ids else None)
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
    reveal(q, beat_at(s, i, "question", 0.2, q), 40); at = beat_at(s, i, "follow", 1.5, f); reveal(f, at, 30); sfx.append((at, "pop"))

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
        c, n = ids[side]; at = beat_at(s, i, side, fb, c); reveal(c, at, 30)
        gs.append(f'(function(){{var o={{v:0}}, el=document.getElementById("{n}"); tl.to(o,{{v:{p[side]["value"]},duration:0.6,ease:"power2.out",onUpdate:function(){{el.textContent=Math.round(o.v);}}}},{at:.3f});}})();')
        sfx.append((at + 0.6, "ding"))
    if p.get("verdict"): at = beat_at(s, i, "verdict", 2.2, vid); reveal(vid, at, 30); sfx.append((at, "pop"))

def scene_recap(s, i, p):
    """A save-worthy chain: item -> item -> item, revealed on spoken words."""
    ids = [nid("rc") for _ in p["items"]]
    arrows = [nid("ra") for _ in p["items"]]
    chain = "".join((f'<div id="{arrows[k]}" class="arrow">↓</div>' if k else "") + f'<div id="{r}" class="recapitem"><span class="recapn">{k + 1}</span>{esc(t)}</div>'
                    for k, (r, t) in enumerate(zip(ids, p["items"])))
    title = f'<div class="recaptitle">{esc(p.get("title", "Recap"))}</div>'
    clipdiv(i, f'{kicker_html(s)}<div class="band center">{title}<div class="recap">{chain}</div></div>{source_html(s)}')
    for k, r in enumerate(ids):
        at = beat_at(s, i, f"items.{k}", 0.3 + k * 0.7, r); reveal(r, at, 24); sfx.append((at, "pop"))
        if k: reveal(arrows[k], at - 0.15, 0, 0.25)   # each arrow appears with the item it points to

def scene_stage(s, i, p):
    """A scene drawn by the project's custom stage (spec "stage": html/css/js, the reference-reel way: one bespoke
    animation that performs the explanation on one running object). The engine still does section colour, captions,
    audio and wipes; beats resolve here for the payoffs sheet and may name an "sfx" (pop, ding, stamp, whoosh, tick)."""
    for b in s.get("beats", []):
        at = beat_at(s, i, b["target"], 0.3)
        cue = BEATS.get((s["id"], b["target"]), {}).get("sfx")   # the beat's own "sfx", else the default for its kind, "none" = silent
        if cue: sfx.append((at, cue))

BUILD ={"stage": scene_stage, "duel": scene_duel, "recap": scene_recap, "title": scene_title, "points": scene_points, "counter": scene_counter, "compare": scene_compare,
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
    if s["type"] not in ("media", "stage") and times and starts[i] + durs[i] - max(times) < 0.9:
        print(f"  ⚠ {s['id']}: an element appears only {starts[i] + durs[i] - max(times):.1f}s before the scene ends; trigger it on an earlier word")
    # whole-scene entrance: gentle fade/settle on the scene's content (never on the .clip itself)
    if i > 0 and s.get("section", spec.get("section", "dark")) == scenes[i - 1].get("section", spec.get("section", "dark")) and not s.get("props", {}).get("of"):
        sfx.append((starts[i], "tick"))

# ---------- section transitions: a wipe in the next section's colour (the transition IS the exit) ----------
# primary: wipe up from the bottom; accent: every third section change wipes in from the right
wipes, D, nchg = [], 0.38, 0
WIPES = []   # for layout.json (the Remotion engine draws the same wipes)
for i in range(1, len(scenes)):
    if scenes[i].get("section", spec.get("section", "dark")) == scenes[i - 1].get("section", spec.get("section", "dark")): continue
    nchg += 1; t1 = starts[i] - 0.05; t0 = max(starts[i - 1], t1 - D); wid = nid("wp")   # the wipe lands 0.05 s BEFORE the scene starts, so its first frame shows content
    axis, frm = ("x", W) if nchg % 3 == 0 else ("y", H)
    WIPES.append({"t0": round(t0, 3), "t1": round(t1, 3), "axis": axis, "section": scenes[i].get("section", spec.get("section", "dark"))})
    wipes.append(f'<div class="clip wipe" data-start="{t0:.3f}" data-duration="{t1 - t0:.3f}" data-track-index="3" style="{secvars(scenes[i])}"><div id="{wid}" class="wipefill"></div></div>')
    gs.append(f'tl.fromTo("#{wid}", {{{axis}: {frm}}}, {{{axis}: 0, duration: {t1 - t0 - 0.02:.3f}, ease: "power3.inOut"}}, {t0:.3f});')
    sfx.append((t0, "whoosh"))

# ---------- captions: 2-6 word cards, words light up as spoken ----------
keys = {norm(k) for k in spec.get("keywords", [])}
CAP0 = len(body)   # captions start here: the glow layer goes between the scenes and the captions
CAPS = []   # for layout.json (the Remotion engine draws the same caption cards)
CAPTION_TOP, CAP_W, CAP_PX = 1555, 880, 60   # the one caption geometry (styles.css reads --cap-top; stills.py/qa read layout.json)
from PIL import ImageFont
_capfont = ImageFont.truetype(os.path.join(TPL, "fonts", "Inter.ttf"), CAP_PX)
def cap_lines(ws):
    """Lines a card needs at 880 px (Inter 800 ≈ regular × 1.08, plus the per-word margin); a card may never reach a third line."""
    lines, cur = 1, 0.0
    for w in ws:
        wl = _capfont.getlength(w["w"]) * 1.08 + 0.12 * CAP_PX
        if cur and cur + wl > CAP_W: lines += 1; cur = wl
        else: cur += wl + (0.25 * CAP_PX if cur else 0)
    return lines
MIN_CARD = 0.9   # a card shown for less than this can't be read (qa checks it)
for i, s in enumerate(scenes):
    words = tm.get(s["id"], {}).get("words", [])
    cards, cur = [], []
    for k, w in enumerate(words):
        cur.append(w); nxt = words[k + 1] if k + 1 < len(words) else None
        # sentence captions: up to 2 lines (≤ 9 words, measured); break at sentence ends, at commas after 5+ words, or at long pauses
        if len(cur) >= 9 or (len(cur) >= 2 and re.search(r"[.!?]$", w["w"])) or (len(cur) >= 5 and re.search(r"[,:;]$", w["w"])) \
                or (nxt and nxt["s"] - w["e"] > 0.5 and len(cur) >= 2) or (nxt and cap_lines(cur + [nxt]) > 2):
            cards.append(cur); cur = []
    if cur:
        if len(cur) == 1 and cards and len(cards[-1]) < 9 and cap_lines(cards[-1] + cur) <= 2: cards[-1] += cur
        else: cards.append(cur)
    # a card that would flash by (< MIN_CARD s before the next card) joins its neighbour when that still fits two lines
    k = 0
    while k + 1 < len(cards):
        if cards[k + 1][0]["s"] - cards[k][0]["s"] < MIN_CARD and len(cards[k]) + len(cards[k + 1]) <= 9 and cap_lines(cards[k] + cards[k + 1]) <= 2:
            cards[k] += cards.pop(k + 1)
        else: k += 1
    for c, card in enumerate(cards):
        # cards stay inside their scene so two captions never overlap at a scene change
        a = max(starts[i], starts[i] + card[0]["s"] - 0.05)
        b = starts[i] + (cards[c + 1][0]["s"] - 0.05 if c + 1 < len(cards) else min(card[-1]["e"] + 0.5, durs[i] - 0.04))
        cid = nid("cap"); spans = []
        CAPS.append({"scene": s["id"], "a": round(a, 3), "b": round(max(a + 0.2, b), 3),
                     "words": [{"w": w["w"], "t": round(starts[i] + w["s"], 3), "hot": bool(re.search(r"\d", w["w"])) or norm(w["w"]) in keys} for w in card]})
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
mname = f"music/{spec.get('music', 'upbeat-synth') if spec.get('music') != 'none' else 'upbeat-synth'}.wav"
m, msr = sf.read(os.path.join(mdir, mname)); m = m.mean(1) if m.ndim > 1 else m
if msr != SR: from scipy.signal import resample_poly; m = resample_poly(m, SR, msr)
def tile_xfade(m, n, xf=int(0.5 * SR)):
    """Loop the bed with a 0.5 s equal-power crossfade at every seam (a hard loop point is audible)."""
    out = np.zeros(n + len(m)); pos = 0; w = np.linspace(0, 1, xf)
    while pos < n:
        seg = m.copy()
        if pos: seg[:xf] *= np.sqrt(w); out[pos:pos + xf] *= np.sqrt(1 - w)
        out[pos:pos + len(seg)] += seg; pos += len(m) - xf
    return out[:n]
music = tile_xfade(m, N) if len(m) < N else m[:N]
# duck (user, 2026-10-12: "loud music … grabs the attention"): the voice sits at -16 LUFS; the bed stays a quiet
# background: ~-36 LUFS under speech (20 LU below the voice), ~-30 LUFS in gaps. Override with "musicLevel":
# {"speech": -36, "gap": -30} or "music": "none"; "sfxLevel" (default 0.6) scales the sound effects.
# "speech" = the spoken words ±0.15 s; a pause inside a scene longer than 0.45 s lets the bed breathe back up.
speech = np.zeros(N, bool)
for i, s in enumerate(scenes):
    for w in tm.get(s["id"], {}).get("words", []):
        speech[max(0, int((starts[i] + w["s"] - 0.15) * SR)): int((starts[i] + w["e"] + 0.15) * SR)] = True
edges = np.flatnonzero(np.diff(speech.astype(np.int8))) + 1   # close gaps shorter than 0.45 s (they stay ducked)
for a_, b_ in zip(edges[:-1], edges[1:]):
    if not speech[a_] and b_ - a_ < 0.45 * SR: speech[a_:b_] = True
ML = {"speech": -36, "gap": -30}; ML.update(spec.get("musicLevel", {}))
lo, hi = 10 ** ((ML["speech"] - levels[mname]) / 20), 10 ** ((ML["gap"] - levels[mname]) / 20)
if spec.get("music") == "none": lo = hi = 0.0
target = np.where(speech, lo, hi); ramp = int(0.2 * SR)
gain = np.convolve(target, np.ones(ramp) / ramp, mode="same")
fade = np.minimum(1, np.minimum(np.arange(N) / SR, (TOTAL - np.arange(N) / SR).clip(0) / 1.5))
mix += music * gain * fade + voice
# sound effects: one per visible action, but never a pile-up: ≥ 0.35 s apart (the louder kind wins a clash), ≤ 4 in any 2 s
PRI = {"stamp": 5, "ding": 4, "riser": 4, "whoosh": 3, "pop": 2, "click": 2, "blip": 2, "tick": 1, "key": 1}
kept, dropped = [], []
for t, name in sorted(sfx, key=lambda x: (x[0], -PRI.get(x[1], 2))):
    if kept and t - kept[-1][0] < 0.35:
        if PRI.get(name, 2) > PRI.get(kept[-1][1], 2): dropped.append(kept[-1]); kept[-1] = (t, name)
        else: dropped.append((t, name))
        continue
    if sum(1 for k_ in kept if t - k_[0] < 2.0) >= 4: dropped.append((t, name)); continue
    kept.append((t, name))
if dropped: print(f"  sfx: {len(dropped)} dropped to keep the mix clean (≥ 0.35 s apart, ≤ 4 per 2 s): " + ", ".join(f"{n}@{t:.1f}" for t, n in dropped[:8]) + (" …" if len(dropped) > 8 else ""))
sfx = kept
SFX_GAIN = {"pop": 0.18, "whoosh": 0.12, "ding": 0.15, "stamp": 0.25, "tick": 0.1, "riser": 0.15, "click": 0.16, "key": 0.1, "blip": 0.14}
SFX_OUT = []   # for layout.json: the cues as placed (qa "sound on action" reads them)
for t, name in sfx:
    f = os.path.join(mdir, "sfx", f"{name}.wav")
    if not os.path.exists(f): print(f"  ⚠ sfx '{name}' not in templates/reel/audio/sfx/ (run tools/sfx_synth.py for click/key/blip)"); continue
    x, sr = sf.read(f); x = x.mean(1) if x.ndim > 1 else x
    a = int(t * SR)
    if 0 <= a < N: mix[a:a + len(x)] += x[: N - a] * spec.get("sfxLevel", 0.6) * SFX_GAIN.get(name, 0.15); SFX_OUT.append({"t": round(t, 3), "name": name})
mix = mix[: int(TOTAL * SR)]
meter = pyln.Meter(SR)
mix = pyln.normalize.loudness(mix, meter.integrated_loudness(np.stack([mix, mix], 1)), -14.0)  # measure as the stereo file it becomes
peak = np.max(np.abs(mix)); ceiling = 10 ** (-1.5 / 20)
if peak > ceiling:   # soft knee from 0.9 × ceiling: only the peaks are bent, the rest of the mix is untouched (true peak stays under about -1 dBTP)
    knee = 0.9 * ceiling; a_ = np.abs(mix); over = a_ > knee
    mix[over] = np.sign(mix[over]) * (knee + (ceiling - knee) * np.tanh((a_[over] - knee) / (ceiling - knee)))
sf.write(os.path.join(A, "mix.wav"), np.stack([mix, mix], 1), SR, subtype="PCM_16")

# ---------- 3D avatar (optional): spec "stage": {"avatar": {"model", "speaker", "box", "camera"}} ----------
IPA2 = {"tʃ": "CH", "dʒ": "CH", "aɪ": "aa", "aʊ": "aa", "eɪ": "E", "oʊ": "O", "ɔɪ": "O"}
IPA1 = {**{c: "PP" for c in "pbm"}, **{c: "FF" for c in "fv"}, **{c: "TH" for c in "θð"}, **{c: "DD" for c in "tdɾ"},
        **{c: "kk" for c in "kgŋ"}, **{c: "CH" for c in "ʃʒ"}, **{c: "SS" for c in "sz"}, **{c: "nn" for c in "nl"},
        **{c: "RR" for c in "ɹrɚɝɜ"}, **{c: "aa" for c in "aɑæʌɐ"}, **{c: "E" for c in "ɛeə"}, **{c: "I" for c in "ɪiᵻj"},
        **{c: "O" for c in "oɔɒ"}, **{c: "U" for c in "uʊw"}}
VOWEL = {"aa", "E", "I", "O", "U"}
def ipa_visemes(ipa):
    ipa = re.sub(r"[ːˈˌ\s-]", "", ipa); out, k = [], 0
    while k < len(ipa):
        two = ipa[k:k + 2]
        if two in IPA2: out.append(IPA2[two]); k += 2; continue
        if ipa[k] in IPA1: out.append(IPA1[ipa[k]])
        k += 1   # h, ʔ and unknown marks keep the previous mouth
    return out
def avatar_visemes(speaker):
    """[[t, viseme], ...] for every word the avatar's speaker says: espeak phonemes spread over the word, vowels held longer."""
    import espeakng_loader
    from phonemizer.backend.espeak.wrapper import EspeakWrapper
    EspeakWrapper.set_library(espeakng_loader.get_library_path()); EspeakWrapper.set_data_path(espeakng_loader.get_data_path())
    from phonemizer.backend import EspeakBackend
    be = EspeakBackend("en-us", preserve_punctuation=False, with_stress=False)
    keys = []
    for i, s in enumerate(scenes):
        if s.get("speaker") != speaker: continue
        words = tm.get(s["id"], {}).get("words", [])
        for w, ipa in zip(words, be.phonemize([w["w"] for w in words], strip=True)):
            vs = ipa_visemes(ipa) or ["aa"]; wt = [1.6 if v in VOWEL else 1.0 for v in vs]
            t, span = starts[i] + w["s"], max(0.05, w["e"] - w["s"])
            for v, x in zip(vs, wt): keys.append([round(t, 3), v]); t += span * x / sum(wt)
            keys.append([round(starts[i] + w["e"], 3), "sil"])
    keys.sort(); out = []
    for k in keys:
        if out and k[1] == out[-1][1]: continue
        if out and k[0] - out[-1][0] < 0.035: out[-1] = k   # faster than a frame: keep the later shape
        else: out.append(k)
    return out

# ---------- write project ----------
for f in ("gsap.min.js",): shutil.copy(os.path.join(TPL, f), os.path.join(HF, f))
shutil.copytree(os.path.join(TPL, "fonts"), os.path.join(HF, "fonts"), dirs_exist_ok=True)
css = open(os.path.join(TPL, "styles.css")).read()
ST = spec.get("stage")
stage_html = stage_js = ""
if ST:
    rd = lambda k: open(os.path.join(P, ST[k])).read() if ST.get(k) else ""
    KIT = os.path.join(STUDIO, "templates", "styles", ST["kit"]) if ST.get("kit") else None   # house style: shared kit.css / kit.js
    kit = lambda f: open(os.path.join(KIT, f)).read() if KIT and os.path.exists(os.path.join(KIT, f)) else ""
    CAST = os.path.join(STUDIO, "templates", "characters") if ST.get("cast") else None   # long-form cast: SVG characters + lip-sync
    cast = lambda f: open(os.path.join(CAST, f)).read() if CAST else ""
    css += "\n/* house style */\n" + kit("kit.css") + "\n/* cast */\n" + cast("cast.css") + "\n/* project stage */\n" + rd("css")
    AV = ST.get("avatar")
    avatar_canvas = ""
    if AV:
        TJ = os.path.join(STUDIO, "node_modules", "three")
        for src, dst in (("build/three.module.js", "build/three.module.js"), ("build/three.core.js", "build/three.core.js"),
                         ("examples/jsm/loaders/GLTFLoader.js", "jsm/loaders/GLTFLoader.js"),
                         ("examples/jsm/utils/BufferGeometryUtils.js", "jsm/utils/BufferGeometryUtils.js"),
                         ("examples/jsm/utils/SkeletonUtils.js", "jsm/utils/SkeletonUtils.js")):
            os.makedirs(os.path.dirname(os.path.join(HF, "vendor", "three", dst)), exist_ok=True)
            shutil.copy(os.path.join(TJ, src), os.path.join(HF, "vendor", "three", dst))
        shutil.copy(os.path.join(STUDIO, AV["model"]), os.path.join(A, "avatar.glb"))
        bx = AV.get("box", [0, 0, 720, 1080])
        avatar_canvas = (f'<canvas id="avatar3d" style="position:absolute;left:{bx[0]}px;top:{bx[1]}px;width:{bx[2]}px;height:{bx[3]}px" '
                         f'width="{bx[2]}" height="{bx[3]}"></canvas>')
        import random; rng = random.Random(4821); blinks, t_ = [], 1.0
        while t_ < TOTAL - 0.3: blinks.append(round(t_, 2)); t_ += 2.6 + rng.random() * 1.8
        AVATAR = {"model": "assets/avatar.glb", "size": bx[2:], "camera": AV["camera"], "visemes": avatar_visemes(AV.get("speaker")), "blinks": blinks}
    # #cam wraps the stage: camera keyframes (beat "cam": [x, y, zoom], or cam() in stage.js) zoom the stage only; captions stay put
    stage_html = f'<div id="stage" class="clip stage" data-start="0" data-duration="{TOTAL}" data-track-index="2">{avatar_canvas}<div id="cam">{rd("html")}</div></div>'
    # S/D: scene start/duration · TOTAL · W(scene, word, nth): absolute time the word is spoken (null if not spoken); exact words win over prefixes ('an' never hits 'and')
    words_js = {sc["id"]: [[norm(w["w"]), w["s"], w["e"]] for w in tm.get(sc["id"], {}).get("words", [])] for sc in scenes}
    # B["s04/team"]: the time of that scene's beat (beats in scenes.json: word / nth / offset / sfx), so timing lives in one place
    beats_js = {f"{b['scene']}/{b['target']}": b["at"] for b in BEATS.values()}
    stage_js = (f"const B = {json.dumps(beats_js)};\n"
                "function at(key) { if (!(key in B)) throw new Error('no beat ' + key + ' (add it to scenes.json)'); return B[key]; }\n"
                f"const S = {json.dumps({sc['id']: starts[k] for k, sc in enumerate(scenes)})}, D = {json.dumps({sc['id']: durs[k] for k, sc in enumerate(scenes)})}, TOTAL = {TOTAL};\n"
                f"const TMW = {json.dumps(words_js)};\n"
                "const NUMW = {zero:'0',one:'1',two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10',eleven:'11',twelve:'12'};\n"
                "function W(sid, word, nth = 0) { let n = word.toLowerCase().replace(/[^a-z0-9]/g, ''); n = NUMW[n] || n;\n"
                "  const ws = TMW[sid] || [], ex = ws.filter(x => x[0] === n), hits = ex.length > nth ? ex : ws.filter(x => x[0] === n || x[0].startsWith(n)); if (hits.length <= nth) { console.warn('W: not spoken', sid, word); return null; } return S[sid] + hits[nth][1]; }\n"
                + kit("kit.js") + "\n" + cast("cast.js") + "\n"
                + (f"window.AVATAR = {json.dumps(AVATAR)}; window.GEST = [];\n" if AV else "")
                + (f"const SPEAKER = {json.dumps({sc['id']: sc['speaker'] for sc in scenes if sc.get('speaker')})};\n" if CAST else "")
                + rd("js"))
AV = (ST or {}).get("avatar") if ST else None
AV_HEAD = ('<script type="importmap">{"imports":{"three":"./vendor/three/build/three.module.js","three/addons/":"./vendor/three/jsm/"}}</script>'
           if AV else "")
AV_MOD = (f'<script type="module">\n{open(os.path.join(STUDIO, "templates", "characters", "avatar3d.js")).read()}\n</script>' if AV else "")
root_vars = "".join(f"--{k}:{v};" for k, v in TH.items()) + f"--cap-top:{CAPTION_TOP}px;--cap-w:{CAP_W}px;--cap-px:{CAP_PX}px;"
FLAT = spec.get("flat", False)   # "flat": true = solid colour blocks like the reference reel (no vignette, light spot, grain, glow)
secbgs = "".join(f'<div class="clip secbg" data-start="{starts[i]}" data-duration="{durs[i]}" data-track-index="0" style="{secvars(s)}">'
                 + ("" if FLAT else '<div class="vignette"></div><div class="lightspot"></div><div class="grain"></div>') + '</div>' for i, s in enumerate(scenes))   # depth: vignette + light + grain on every section
bg = (f'<div class="clip bgfill" data-start="0" data-duration="{TOTAL}" data-track-index="0"></div>{secbgs}')
glow = "" if FLAT else f'<div class="clip glowlayer" data-start="0" data-duration="{TOTAL}" data-track-index="4"><div id="bgglow" class="bgglow" data-layout-allow-overflow></div></div>'
doc = f"""<!doctype html>
<html lang="en" data-resolution="{'portrait' if H > W else 'landscape'}">
<head><meta charset="UTF-8" /><meta name="viewport" content="width={W}, height={H}" />
<script src="gsap.min.js"></script>
{AV_HEAD}
<style>:root{{{root_vars}}}
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;background:{TH['bg']};}}
{css}</style></head>
<body>
<div id="root" class="{'portrait' if H > W else 'landscape'}" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="{W}" data-height="{H}">
{bg}
{chr(10).join(body[:CAP0] + [stage_html] + wipes + [glow] + body[CAP0:])}
<audio id="mix" src="assets/mix.wav" data-start="0" data-duration="{TOTAL}" data-track-index="10" data-volume="1"></audio>
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
{"" if FLAT else f'tl.fromTo("#bgglow", {{xPercent: -10, yPercent: -6}}, {{xPercent: 10, yPercent: 6, duration: {TOTAL}, ease: "none"}}, 0);'}
{chr(10).join(gs)}
{stage_js}
window.__timelines["main"] = tl;
tl.seek(0);
</script>
{AV_MOD}
</body></html>
"""
# data-beat="sNN/target" on every preset element a beat reveals, so payoffs.mjs can check it is on screen on its word
for b in BEATS.values():
    if b.get("el"): doc = doc.replace(f'id="{b["el"]}"', f'id="{b["el"]}" data-beat="{b["scene"]}/{b["target"]}"', 1)
open(os.path.join(HF, "index.html"), "w").write(doc)
for f in ("hyperframes.json", "meta.json", "package.json"):
    src = os.path.join(TPL, "hf", f)
    if os.path.exists(src) and not os.path.exists(os.path.join(HF, f)): shutil.copy(src, os.path.join(HF, f))
json.dump({"total": TOTAL, "size": [W, H], "flat": spec.get("flat", False), "music": spec.get("music"), "pad": PAD,
           "caption": {"top": CAPTION_TOP, "width": CAP_W, "px": CAP_PX, "min_s": MIN_CARD}, "stage_zone": [220, 1460],
           "scenes": [{"id": s["id"], "type": s["type"], "start": starts[i], "duration": durs[i], "section": s.get("section", spec.get("section", "dark")),
                       "words": [[norm(w["w"]), round(w["s"], 3)] for w in tm.get(s["id"], {}).get("words", [])]} for i, s in enumerate(scenes)],
           "beats": sorted(BEATS.values(), key=lambda b: b["at"]), "camera": sorted(CAM, key=lambda c: c["at"]), "sfx": SFX_OUT,
           "sections": SECTIONS, "captions": CAPS, "wipes": WIPES},
          open(os.path.join(P, "build", "layout.json"), "w"), indent=1)
print(f"assembled {len(scenes)} scenes · {TOTAL:.1f}s · {len(sfx)} sfx · {len(CAM)} camera moves · -> {os.path.relpath(HF, STUDIO)}/index.html")
