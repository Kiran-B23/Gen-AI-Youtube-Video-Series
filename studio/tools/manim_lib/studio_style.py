"""Shared Manim style for studio clips: channel fonts + colours. In a clip file:
    import sys, os; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"]); from studio_style import *
"""
import os
import numpy as np
from manim import *
FONTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "templates", "reel", "fonts")
BG, TEXT, ACCENT, ACCENT2, OK, DANGER = "#0B1020", "#FFFFFF", "#FFC145", "#2EC4B6", "#2ED3A0", "#FF5A6E"
DIM = "#B8BCD0"
if os.environ.get("STUDIO_PALETTE"):   # the scene's section colours (templates/reel/sections.json), so the clip blends into its section
    import json as _j
    _p = _j.loads(os.environ["STUDIO_PALETTE"])
    BG, TEXT, ACCENT, ACCENT2 = _p["bg"], _p["text"], _p["accent"], _p["accent2"]
    OK, DANGER = _p.get("ok", OK), _p.get("danger", DANGER)
    _h = lambda c: [int(c.lstrip("#")[k:k + 2], 16) for k in (0, 2, 4)]
    DIM = "#" + "".join(f"{round(a * 0.62 + b * 0.38):02X}" for a, b in zip(_h(TEXT), _h(BG)))   # text blended toward the background
_ctx = register_font(os.path.join(FONTS_DIR, "Inter.ttf")); _ctx.__enter__()
_ctx2 = register_font(os.path.join(FONTS_DIR, "JetBrainsMono.ttf")); _ctx2.__enter__()
_ctx3 = register_font(os.path.join(FONTS_DIR, "Anton.ttf")); _ctx3.__enter__()
config.background_color = BG
# Manim keeps frame_width = 14.22 units at any resolution and scales by width; match frame_height to the clip's
# real aspect so to_edge()/corners land on the true edges (portrait media box 1640x1560 -> 14.22 x 13.5 units).
config.frame_height = config.frame_width * config.pixel_height / config.pixel_width
FRAME_W, FRAME_H = config.frame_width, config.frame_height
def T(s, size=48, color=TEXT, mono=False, weight=BOLD, display=False):
    """Channel text: Inter (body), JetBrains Mono (mono=True: tokens, code, numbers-as-data), Anton (display=True: headlines,
    big numbers; the brand display face)."""
    if display: return Text(s, font="Anton", font_size=size, color=color)
    return Text(s, font="JetBrains Mono" if mono else "Inter", font_size=size, color=color, weight=weight)

def _rgb(c): c = c.lstrip("#"); return [int(c[k:k + 2], 16) / 255 for k in (0, 2, 4)]
def ink_on(color):
    """Readable text colour on a fill: near-black on light fills, near-white on dark fills (WCAG relative luminance)."""
    lin = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in _rgb(color)]
    return "#14110F" if 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2] > 0.32 else "#FFFFFF"
def shade(color, k=0.55):
    """Darker version of a colour (for shadows and edges)."""
    return "#" + "".join(f"{round(x * 255 * k):02X}" for x in _rgb(color))

class TimedScene(MovingCameraScene):
    """Scene whose beats are placed on the voice: self.until(t) waits until t seconds into the clip
    (word times come from build/timings.json; the clip starts with its scene). It has a movable camera:
    push_in() / pull_back() give reveals depth (the camera frame is never left off-centre at a scene end)."""
    def push_in(self, target, factor=1.25, run_time=0.6, cue=None):
        """Camera pushes in on `target` (a mobject or point): the reveal move."""
        if cue: self.cue(cue)
        pt = target.get_center() if hasattr(target, "get_center") else target
        self.camera.frame.save_state()
        self.play(self.camera.frame.animate.scale(1 / factor).move_to(pt), run_time=run_time, rate_func=rate_functions.ease_in_out_cubic)
    def camera_home(self, run_time=0.4):
        """Return the camera to its saved state if a push_in left it off-centre (called by breathe() and at span ends)."""
        f = self.camera.frame
        try:
            if abs(f.width - FRAME_W) > 1e-3 or np.linalg.norm(f.get_center()) > 1e-3: self.play(Restore(f), run_time=run_time, rate_func=rate_functions.ease_in_out_cubic)
        except Exception: pass
    def pull_back(self, run_time=0.5):
        self.play(Restore(self.camera.frame), run_time=run_time, rate_func=rate_functions.ease_in_out_cubic)
    def drift_camera(self, t_end, dx=0.25, dy=0.12, period=2.4):
        """Slow camera sway during a hold (ambient; finite)."""
        f = self.camera.frame; c = f.get_center()
        while self.renderer.time + period <= t_end:
            self.play(f.animate.move_to(c + RIGHT * dx + UP * dy), run_time=period / 2, rate_func=rate_functions.ease_in_out_sine)
            self.play(f.animate.move_to(c), run_time=period / 2, rate_func=rate_functions.ease_in_out_sine)
        self.until(t_end)
    def cue(self, name, at=None):
        """Sound cue at the current clip time (or `at`): pop, ding, tick, whoosh, stamp, riser. Mixed by assemble."""
        f = os.environ.get("STUDIO_CUES")
        if f:
            with open(f, "a") as fh: fh.write(f"{(self.renderer.time if at is None else at):.3f} {name}\n")

    def check_overlaps(self, tol=0.02):
        """Design-system guard: warn when two visible boxes (chips, tags) touch or overlap. Runs at every beat."""
        boxes = []
        for m in self.mobjects:
            for f in m.get_family():
                if getattr(f, "is_box", False) and f[0][-1].get_fill_opacity() > 0.3 and f.width > 0.05:
                    boxes.append(f)
        seen = set()
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                a, b = boxes[i], boxes[j]
                if a in b.get_family() or b in a.get_family(): continue
                ox = min(a.get_right()[0], b.get_right()[0]) - max(a.get_left()[0], b.get_left()[0])
                oy = min(a.get_top()[1], b.get_top()[1]) - max(a.get_bottom()[1], b.get_bottom()[1])
                if ox > tol and oy > tol:
                    key = (a.box_text, b.box_text)
                    if key not in seen:
                        seen.add(key)
                        print(f"OVERLAP t={self.renderer.time:.2f}s: '{a.box_text}' x '{b.box_text}' ({ox:.2f} x {oy:.2f} units)")

    def until(self, t):
        self.check_overlaps()
        dt = t - self.renderer.time
        if dt > 1 / 60: self.wait(dt)

def chip(s, color=ACCENT2, size=52, mono=True, pad=0.28, style="solid"):
    """Design-system chip (tokens, tags, labels). style="solid" (default): filled, rounded, soft drop shadow, contrast-picked
    text. style="outline": the light, secondary look. Returns VGroup(box, label); box = VGroup(shadow, plate)."""
    lab = T(s, size, ink_on(color) if style == "solid" else color, mono=mono)
    w, h = lab.width + 2 * pad, lab.height + 2 * pad
    r = min(0.22, h * 0.32)
    if style == "solid":
        plate = RoundedRectangle(corner_radius=r, width=w, height=h, fill_color=color, fill_opacity=1, stroke_width=0)
        shadow = RoundedRectangle(corner_radius=r, width=w, height=h, fill_color=shade(color, 0.45), fill_opacity=0.85, stroke_width=0).shift(DOWN * 0.09 + RIGHT * 0.04)
        box = VGroup(shadow, plate)
    else:
        box = VGroup(RoundedRectangle(corner_radius=r, width=w, height=h, stroke_color=color, stroke_width=6, fill_color=color, fill_opacity=0.12))
    lab.move_to(box[-1])
    g = VGroup(box, lab); g.is_box = True; g.box_text = s
    return g

import json as _json, re as _re
_TM = {}
OFFSETS = _json.loads(os.environ.get("STUDIO_OFFSETS", "{}"))      # spanned clips: scene id -> start offset in this clip
CLIP_LEN = float(os.environ.get("STUDIO_CLIP_LEN", "0") or 0)        # total length the clip covers (all spanned scenes)
def at(scene):
    """Offset (s) in this clip where `scene` starts (spanned clips)."""
    return OFFSETS.get(scene, 0.0)

def w(word, nth=0, default=None, end=False, scene=None):
    """Time (s, from clip start) when `word` is spoken in this clip's scene: the nth match of its start (or end).
    Read from build/timings.json, so the clip stays in sync after a voice retake. Falls back to `default`."""
    f, sid = os.environ.get("STUDIO_TIMINGS"), scene or os.environ.get("STUDIO_SCENE")
    if f and sid and not _TM and os.path.exists(f): _TM.update(_json.load(open(f)))
    _NUMW = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split())}
    n = lambda x: (lambda t: _NUMW.get(t, t))(_re.sub(r"[^a-z0-9]", "", x.lower()))
    hits = [x for x in _TM.get(sid, {}).get("words", []) if n(x["w"]) == n(word) or n(x["w"]).startswith(n(word))]
    if len(hits) > nth: return hits[nth]["e" if end else "s"] + OFFSETS.get(sid, 0.0)
    if default is None: raise ValueError(f"word '{word}' not found in scene {sid} timings")
    return default
