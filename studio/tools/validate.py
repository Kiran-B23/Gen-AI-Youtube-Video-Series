"""
Static check of projects/<slug>/scenes.json, run before voice (which spends a Gemini request).
The assembler silently falls back to a fixed time for a beat it cannot resolve, so a typo ships a
visual that never syncs with the voice. Fail here instead.

usage: python tools/validate.py <slug>
"""
import difflib, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import PACE, norm

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(STUDIO)
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))

# scene type -> (required props, beat targets it understands); "items.N"/"chips.N" take any index in range
TYPES = {
    "title":   (["lines"], ["sub", "chips.N"]),
    "points":  (["items"], ["items.N"]),
    "counter": (["value"], ["number"]),
    "compare": (["left", "right"], ["left", "right", "verdict"]),
    "stamp":   (["text"], ["stamp", "sub"]),
    "code":    (["code"], ["code"]),
    "media":   ([], []),
    "cta":     (["question"], ["question", "follow"]),
    "duel":    (["left", "right"], ["left", "right", "verdict"]),
    "recap":   (["items"], ["items.N"]),
    "stage":   ([], ["*"]),   # drawn by the project's custom stage (spec "stage"): any target name the stage script reads with at()
}
TOOLS = {"manim": ["file", "scene"], "playwright": ["file"], "vhs": ["file"]}
_MD = os.path.join(STUDIO, "templates", "reel", "audio", "music")
MUSIC = [f[:-4] for f in os.listdir(_MD) if f.endswith(".wav")] + ["cc0/" + f[:-4] for f in os.listdir(os.path.join(_MD, "cc0")) if f.endswith(".wav")] if os.path.isdir(os.path.join(_MD, "cc0")) else [f[:-4] for f in os.listdir(_MD) if f.endswith(".wav")]

err, warn = [], []
SECS = json.load(open(os.path.join(STUDIO, "templates", "reel", "sections.json"))); SECS.update(spec.get("sections", {}))
steps = spec.get("steps", [])
for sc in spec["scenes"]:
    if sc.get("section", spec.get("section", "dark")) not in SECS: err.append(f"{sc.get('id')}: section '{sc.get('section')}' not in {list(SECS)}")
    if sc.get("step") and not (1 <= sc["step"] <= len(steps)): err.append(f"{sc.get('id')}: step {sc['step']} but spec has {len(steps)} steps")
    if sc.get("type") == "duel":
        for side in ("left", "right"):
            if not isinstance(sc.get("props", {}).get(side, {}).get("value"), (int, float)): err.append(f"{sc.get('id')}: duel {side} needs a numeric value")
secs = [sc.get("section", spec.get("section", "dark")) for sc in spec["scenes"]]
# one background for the whole reel (2026-10-30: the top explainer shorts keep one background and grow one diagram;
# a section change is a title under the pinned hook question, not a colour wipe). reference-flat/design.md
_chg = sum(1 for a, b in zip(secs, secs[1:]) if a != b)
if _chg: warn.append(f"{len(set(secs))} background colours, {_chg} colour change(s) between scenes: set \"section\" once at the top and leave it off the scenes (one background; a section is a title under the pinned question)")
if spec.get("music", "upbeat-synth") not in MUSIC:
    m = spec["music"]; hint = ""
    if m.startswith("cc0/"):
        man = json.load(open(os.path.join(_MD, "cc0", "manifest.json")))["tracks"]
        hint = (" (CC0 library not downloaded: run studio/.venv/bin/python studio/tools/get_music.py)" if m[4:] in man
                else f" (not in the CC0 manifest: {', '.join('cc0/' + k for k in man)})")
    err.append(f"music '{m}' not in {MUSIC}{hint}")
ids = [s.get("id") for s in spec["scenes"]]
if len(set(ids)) != len(ids): err.append(f"duplicate scene ids: {ids}")
words_total = 0
for s in spec["scenes"]:
    sid, t, p = s.get("id", "?"), s.get("type"), s.get("props", {})
    if t not in TYPES: err.append(f"{sid}: unknown type '{t}' (known: {', '.join(TYPES)})"); continue
    if not s.get("say") and not s.get("seconds"): err.append(f"{sid}: needs 'say' (voice-led) or 'seconds' (silent)")
    words_total += len(s.get("say", "").split())
    for k in TYPES[t][0]:
        if k not in p: err.append(f"{sid}: {t} needs props.{k}")
    if t == "media":
        b = p.get("build")
        if b:
            if b.get("tool") not in TOOLS: err.append(f"{sid}: build.tool must be one of {list(TOOLS)}")
            else:
                for k in TOOLS[b["tool"]]:
                    if k not in b: err.append(f"{sid}: {b['tool']} build needs '{k}'")
                if b.get("file") and not os.path.exists(os.path.join(P, b["file"])): err.append(f"{sid}: missing {b['file']}")
        elif p.get("of"):
            owner = next((x for x in spec["scenes"] if x.get("id") == p["of"]), None)
            if not owner or sid not in owner.get("props", {}).get("build", {}).get("span", []): err.append(f"{sid}: 'of' {p['of']} but that scene's build.span doesn't list {sid}")
            elif owner.get("section", spec.get("section", "dark")) != s.get("section", spec.get("section", "dark")): err.append(f"{sid}: a spanned scene must keep {p['of']}'s section (the clip background)")
        elif not p.get("clip"): err.append(f"{sid}: media needs props.build, props.clip or props.of")
        elif not os.path.exists(os.path.join(P, p["clip"])): err.append(f"{sid}: missing clip {p['clip']}")
    said = [norm(w) for w in s.get("say", "").split()]
    for b in s.get("beats", []):
        tg = b.get("target", "")
        base, _, idx = tg.partition(".")
        allowed = TYPES[t][1]
        if allowed == ["*"]: pass
        elif tg not in allowed and not (idx.isdigit() and f"{base}.N" in allowed):
            err.append(f"{sid}: beat target '{tg}' not understood by {t} (use {allowed or 'none'})")
        elif idx.isdigit() and int(idx) >= len(p.get(base, [])):
            err.append(f"{sid}: beat target '{tg}' but props.{base} has {len(p.get(base, []))} entries")
        w = norm(b.get("word", ""))
        if not any(x == w or x.startswith(w) for x in said): err.append(f"{sid}: beat word '{b.get('word')}' is not in the say line")
        if b.get("check") and b["check"] not in ("visible", "reveal", "motion", "none"): err.append(f"{sid}: beat '{tg}' check must be visible | reveal | motion | none")
        if b.get("cam"):
            c = b["cam"]
            if not (isinstance(c, list) and len(c) == 3): err.append(f"{sid}: beat '{tg}' cam must be [x, y, zoom]")
            elif not (0 <= c[0] <= 1080 and 220 <= c[1] <= 1460 and 1 <= c[2] <= 2.6): err.append(f"{sid}: beat '{tg}' cam {c}: x in 0-1080, y in the stage zone 220-1460, zoom 1-2.6")
        for w_ in b.get("pauseAfter", []):
            if not any(x == norm(w_) for x in said): err.append(f"{sid}: pauseAfter word '{w_}' is not in the say line")
    if t in ("title", "counter", "points", "compare", "stamp") and s.get("say") and len(s["say"].split()) > 30:
        warn.append(f"{sid}: {len(s['say'].split())} words on one scene; split it (a visual change every 2-4 s)")
    cap = PACE["max_beat_s_long" if spec.get("format", "reel") != "reel" else "max_beat_s"] * PACE["target"]
    if s.get("say") and len(s["say"].split()) > cap and len(s.get("beats", [])) < 2:
        warn.append(f"{sid}: {len(s['say'].split())} words (≈ {len(s['say'].split()) / PACE['target']:.0f} s at {PACE['target']} w/s) with fewer than 2 beats: add a beat so something changes every {PACE['max_change_s']} s")

SPK = spec.get("voice", {}).get("speakers")
if SPK:
    for s in spec["scenes"]:
        if s.get("say") and s.get("speaker") not in SPK: err.append(f"{s.get('id')}: dialogue needs \"speaker\" in {list(SPK)}")
ST = spec.get("stage")
RMO = spec.get("engine") == "remotion"   # Remotion-only project: the stage is projects/<slug>/remotion/Stage.tsx
if RMO and not os.path.exists(os.path.join(P, "remotion", "Stage.tsx")): err.append("engine remotion: missing remotion/Stage.tsx")
if any(s.get("type") == "stage" for s in spec["scenes"]) and not ST and not RMO: err.append("stage scenes need spec \"stage\": {html, css, js}")
if ST:
    if ST.get("kit") and not os.path.isdir(os.path.join(STUDIO, "templates", "styles", ST["kit"])):
        err.append(f"stage.kit '{ST['kit']}' not in studio/templates/styles/")
    for k in ("html", "css", "js"):
        if ST.get(k) and not os.path.exists(os.path.join(P, ST[k])): err.append(f"stage.{k}: missing {ST[k]}")
    if ST.get("js") and os.path.exists(os.path.join(P, ST["js"])):   # every at("scene/target") the script reads must be a beat in scenes.json
        have = {f"{s.get('id')}/{b.get('target')}" for s in spec["scenes"] for b in s.get("beats", [])}
        js_ = open(os.path.join(P, ST["js"])).read()
        for key in sorted(set(re.findall(r"""at\(['"]([\w-]+/[\w.-]+)['"]\)""", js_)) - have):
            err.append(f"stage.js reads at('{key}') but scenes.json has no such beat")
        if re.search(r"\bW\(", js_): warn.append("stage.js calls W() directly: those timings bypass the beat list (payoffs can't check them); prefer beats + at()")
    if ST.get("html") and os.path.exists(os.path.join(P, ST["html"])):   # every stage beat names the element it reveals (data-beat) unless check: none
        html_ = open(os.path.join(P, ST["html"])).read()
        tagged = {k.strip() for m in re.findall(r'data-beat="([^"]+)"', html_) for k in m.split(",")}
        js_ = open(os.path.join(P, ST["js"])).read() if ST.get("js") and os.path.exists(os.path.join(P, ST["js"])) else ""
        for s in spec["scenes"]:
            if s.get("type") != "stage": continue
            for b in s.get("beats", []):
                key = f"{s['id']}/{b.get('target')}"
                if b.get("check") == "none" or key in tagged: continue
                if re.search(r"\bat\(['\"]" + re.escape(key) + r"['\"]\)", js_): continue   # payoffs.mjs derives the element from the statement that reads at()
                warn.append(f"{key}: no element carries data-beat=\"{key}\" in {ST['html']} and stage.js never reads at('{key}'): payoffs can't check it (add data-beat, or \"check\": \"none\")")

if spec.get("format", "reel") == "reel":
    est = words_total / PACE["budget"]
    if est > 180: err.append(f"script ≈ {est:.0f}s at {PACE['budget']} words/s; Shorts/Reels max 3 min")
    elif est > 60: warn.append(f"script ≈ {est:.0f}s: fine if the content needs it; keep a re-hook every 30-40 s")

# storyboard -> scenes.json fidelity: "package": "productions/<folder>" links the project to its script
PKG = spec.get("package")
if PKG:
    pdir = os.path.join(REPO, PKG)
    scr = next((os.path.join(pdir, f) for f in sorted(os.listdir(pdir)) if re.match(r"script-\w+\.md$", f)), None) if os.path.isdir(pdir) else None
    if not scr: err.append(f"package {PKG}: no script-<format>.md found")
    else:
        md = open(scr).read()
        m = re.search(r"##\s*Read[- ]aloud.*?\n(.*?)(?:\n## |\Z)", md, re.S | re.I)
        ra = re.sub(r"\s+", " ", re.sub(r"[*_`>#\[\]()]", " ", m.group(1))).strip() if m else ""
        say = " ".join(s.get("say", "") for s in spec["scenes"])
        tok = lambda t: [norm(w) for w in t.split() if norm(w)]
        if ra:
            r = difflib.SequenceMatcher(None, tok(ra), tok(say), autojunk=False).ratio()
            if r < 0.97: err.append(f"scenes.json say lines differ from the script's read-aloud ({r:.0%} match; needs 97 %): the voice must read the reviewed script")
        else: warn.append(f"{os.path.relpath(scr, REPO)}: no '## Read-aloud' section to compare against")
        sb = next((os.path.join(pdir, f) for f in sorted(os.listdir(pdir)) if re.match(r"storyboard-\w+\.md$", f)), None)
        if sb:
            rows = [l for l in open(sb).read().splitlines() if re.match(r"\|\s*\d+\s*\|", l)]
            spoken = [s for s in spec["scenes"] if s.get("say")]
            if rows and len(spoken) != len(rows) and not all(s.get("beat") for s in spoken):
                err.append(f"{len(spoken)} spoken scenes vs {len(rows)} storyboard rows: one scene per row, or give split scenes \"beat\": <row number>")
        else: warn.append(f"{PKG}: no storyboard-<format>.md")
else: warn.append('no "package": "productions/<folder>" in scenes.json: the say lines are not checked against the reviewed script')
for w in warn: print("  ⚠", w)
for e in err: print("  ✗", e)
print(f"validate: {len(spec['scenes'])} scenes · {words_total} words ≈ {words_total / PACE['budget']:.0f}s at {PACE['budget']} w/s · {len(err)} error(s), {len(warn)} warning(s)")
sys.exit(1 if err else 0)
