"""
Render the clips that media scenes ask for, into projects/<slug>/build/clips/<scene>.mp4.

In scenes.json a media scene declares its builder:
  {"type": "media", "props": {"build": {"tool": "manim", "file": "clips/tokens.py", "scene": "Tokens"}}}
  {"type": "media", "props": {"build": {"tool": "playwright", "file": "clips/demo.mjs"}}}      # script records into $OUT_DIR
  {"type": "media", "props": {"build": {"tool": "vhs", "file": "clips/terminal.tape"}}}         # tape's Output is overridden
  {"type": "media", "props": {"clip": "clips/existing.mp4"}}                                     # pre-made / stock
usage: python tools/build_clips.py <slug> [scene-id ...]
"""
import json, glob, os, re, shutil, subprocess, sys, tempfile
STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug, only = sys.argv[1], set(sys.argv[2:])
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))
OUT = os.path.join(P, "build", "clips"); os.makedirs(OUT, exist_ok=True)
W, H = spec.get("size", [1080, 1920])
env = dict(os.environ, PYTHONNOUSERSITE="1", STUDIO_MANIM_LIB=os.path.join(STUDIO, "tools", "manim_lib"),
           STUDIO_TIMINGS=os.path.join(P, "build", "timings.json"))   # clips read word times: retakes stay in sync

def to_mp4(src, dst):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", dst], check=True)

changed = False
for s in spec["scenes"]:
    b = s.get("props", {}).get("build")
    if s["type"] != "media" or not b or (only and s["id"] not in only): continue
    dst = os.path.join(OUT, f"{s['id']}.mp4"); src = os.path.join(P, b["file"])
    print(f"{s['id']}: {b['tool']} {b['file']}")
    if b["tool"] == "manim":   # design-system guard: glyph-morphing text scrambles mid-transition (caught on review 2026-10-09)
        _src = open(src).read()
        for _m in re.finditer(r"(Replacement)?Transform\(", _src):
            print(f"  ⚠ {b['file']}:{_src[:_m.start()].count(chr(10)) + 1}: {_m.group(0)} morphs glyphs and scrambles text mid-way; use morph(a, b) (motion_kit) for text")
    env["STUDIO_SCENE"] = s["id"]
    os.makedirs(os.path.join(P, "build", "cues"), exist_ok=True)
    env["STUDIO_CUES"] = os.path.join(P, "build", "cues", f"{s['id']}.txt")
    if os.path.exists(env["STUDIO_CUES"]): os.remove(env["STUDIO_CUES"])
    # a clip may span the following scenes ("span": [ids]): one continuous animation across several voice lines.
    # Clips get every spanned scene's start offset so w(word, scene=...) lands on the right voice line.
    _tm = json.load(open(os.path.join(P, "build", "timings.json"))) if os.path.exists(os.path.join(P, "build", "timings.json")) else {}
    _pad = spec.get("padSeconds", 0.3); _off, _t = {}, 0.0
    _ids = [s["id"]] + list(b.get("span", []))
    for sc in spec["scenes"]:
        if sc["id"] in _ids:
            _off[sc["id"]] = round(_t, 3)
            _t += sc.get("seconds") or (_tm[sc["id"]]["duration"] + sc.get("pad", _pad) if sc["id"] in _tm else 3.0)
    env["STUDIO_OFFSETS"] = json.dumps(_off); env["STUDIO_CLIP_LEN"] = str(round(_t, 3))
    secs = json.load(open(os.path.join(STUDIO, "templates", "reel", "sections.json"))); secs.update(spec.get("sections", {}))
    env["STUDIO_PALETTE"] = json.dumps(secs[s.get("section", spec.get("section", "dark"))])   # clip background = section colour
    with tempfile.TemporaryDirectory() as tmp:
        if b["tool"] == "manim":
            w, h = b.get("size", [1600, 1664] if H > W else [W, H])  # 1.6x the 1000x1040 visual zone (crisp, renders fast)
            # transparent background (VP9 + alpha): the section's own colour and glow show through, so the clip can never
            # look like a box (an opaque clip drifts a few RGB levels off the page colour after YUV encoding)
            subprocess.run([os.path.join(STUDIO, ".manim-env", "bin", "manim"), "-q", b.get("quality", "h"), "-t", "--format", "webm", "-r", f"{w},{h}",
                            "--media_dir", tmp, "-o", "clip.webm", src, b["scene"]], check=True, env=env, cwd=os.path.dirname(src))
            dst = dst[:-4] + ".webm"
            shutil.copy(glob.glob(os.path.join(tmp, "**", "clip.webm"), recursive=True)[0], dst)
            if os.path.exists(dst[:-5] + ".mp4"): os.remove(dst[:-5] + ".mp4")
        elif b["tool"] == "playwright":
            PW = [1000, 1040] if H > W else [1720, 840]  # = the media box, so page text keeps its CSS size
            subprocess.run(["node", src], check=True, env=dict(env, OUT_DIR=tmp, VIEW_W=str(b.get("size", PW)[0]), VIEW_H=str(b.get("size", PW)[1])), cwd=STUDIO)
            to_mp4(sorted(glob.glob(os.path.join(tmp, "*.webm")))[0], dst)
        elif b["tool"] == "vhs":
            tape = re.sub(r"(?m)^Output .*$", "", open(src).read())
            tf = os.path.join(tmp, "t.tape"); open(tf, "w").write(f"Output \"{tmp}/clip.mp4\"\n" + tape)
            subprocess.run(["vhs", tf], check=True, cwd=os.path.dirname(src))
            to_mp4(os.path.join(tmp, "clip.mp4"), dst)
        else:
            sys.exit(f"unknown builder {b['tool']}")
    s["props"]["clip"] = os.path.relpath(dst, P); changed = True
if changed: json.dump(spec, open(os.path.join(P, "scenes.json"), "w"), indent=2, ensure_ascii=False)
print("clips ->", os.path.relpath(OUT, STUDIO))
