"""
Static check of projects/<slug>/scenes.json, run before voice (which spends a Gemini request).
The assembler silently falls back to a fixed time for a beat it cannot resolve, so a typo ships a
visual that never syncs with the voice. Fail here instead.

usage: python tools/validate.py <slug>
"""
import json, os, re, sys

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())

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
if len(set(secs)) == 1 and len(secs) > 6: warn.append("every scene uses the same section colour: colour-block the sections (pattern breaks)")
if spec.get("music", "upbeat-synth") not in MUSIC: err.append(f"music '{spec['music']}' not in {MUSIC}")
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
        if tg not in allowed and not (idx.isdigit() and f"{base}.N" in allowed):
            err.append(f"{sid}: beat target '{tg}' not understood by {t} (use {allowed or 'none'})")
        elif idx.isdigit() and int(idx) >= len(p.get(base, [])):
            err.append(f"{sid}: beat target '{tg}' but props.{base} has {len(p.get(base, []))} entries")
        w = norm(b.get("word", ""))
        if not any(x == w or x.startswith(w) for x in said): err.append(f"{sid}: beat word '{b.get('word')}' is not in the say line")
    if t in ("title", "counter", "points", "compare", "stamp") and s.get("say") and len(s["say"].split()) > 30:
        warn.append(f"{sid}: {len(s['say'].split())} words on one scene; split it (a visual change every 2-4 s)")

if spec.get("format", "reel") == "reel":
    est = words_total / 2.7
    if est > 180: err.append(f"script ≈ {est:.0f}s at 2.7 words/s; Shorts/Reels max 3 min")
    elif est > 60: warn.append(f"script ≈ {est:.0f}s: fine if the content needs it; keep a re-hook every 30-40 s")
for w in warn: print("  ⚠", w)
for e in err: print("  ✗", e)
print(f"validate: {len(spec['scenes'])} scenes · {words_total} words ≈ {words_total / 2.7:.0f}s · {len(err)} error(s), {len(warn)} warning(s)")
sys.exit(1 if err else 0)
