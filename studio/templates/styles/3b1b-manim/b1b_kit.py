"""3b1b-manim house style: shared Manim helpers (the look of a 3Blue1Brown explainer, built with Manim itself).
In a project clip:  sys.path.insert(0, <studio>/templates/styles/3b1b-manim); from b1b_kit import *
Rules: studio/templates/styles/3b1b-manim/design.md. No LaTeX on this machine: numbers are serif Text, never MathTex."""
import os, sys
sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import TimedScene, w, at, CLIP_LEN, OFFSETS   # voice-synced scene + word times (shared engine)
from manim import *

# palette (Manim's own 3b1b colours) on a near-black board
BOARD = "#1C1C1C"
INK, SOFT, FAINT = WHITE, GREY_B, GREY_D
BLUE_, BLUE_D_, YEL, TEALC, GRN, RED_, GOLD_ = BLUE_C, BLUE_E, YELLOW_C, TEAL_C, GREEN_C, RED_C, GOLD_C
config.background_color = BOARD
config.frame_height = config.frame_width * config.pixel_height / config.pixel_width
FW, FH = config.frame_width, config.frame_height
SERIF, MONO = "Noto Serif", "JetBrains Mono"

def S(s, size=56, color=INK, slant=NORMAL, weight=NORMAL):
    """Serif text (the 3b1b voice: titles, labels, numbers)."""
    return Text(s, font=SERIF, font_size=size, color=color, slant=slant, weight=weight)
def M(s, size=48, color=INK):
    """Monospace (code, JSON, ids)."""
    return Text(s, font=MONO, font_size=size, color=color)
def fitw(mob, frac=0.88):
    if mob.width > FW * frac: mob.scale_to_fit_width(FW * frac)
    return mob

def header(n, total, title, color=YEL, numbered=False):
    """Section header at the top: serif title with an underline that draws in. 'Step n of total' above it only when
    numbered=True (Tutorial / Concept mechanisms, per the structure-check agent)."""
    t = S(title, 100, color)
    g = (VGroup(S(f"Step {n} of {total}", 52, SOFT, slant=ITALIC), t).arrange(DOWN, buff=0.18, aligned_edge=LEFT) if numbered else VGroup(t)).to_corner(UL, buff=0.5)
    u = Line(t.get_corner(DL) + DOWN * 0.15, t.get_corner(DR) + DOWN * 0.15, color=color, stroke_width=3)
    return VGroup(g, u)

def card(width, height, color=GREY_C, fill="#262626"):
    return RoundedRectangle(corner_radius=0.22, width=width, height=height, stroke_color=color, stroke_width=3, fill_color=fill, fill_opacity=1)

def counter(tracker, fmt, size=120, color=YEL, pos=ORIGIN, opacity=lambda: 1):
    """A live serif number driven by a ValueTracker (DecimalNumber needs LaTeX, which isn't installed)."""
    return always_redraw(lambda: S(fmt(tracker.get_value()), size, color).move_to(pos).set_opacity(opacity()))

def hold(scene, t_end, *mobs, amp=0.012, period=2.0):
    """Ambient 'breathing' during a hold (keeps the motion QA green without looking busy): a gentle scale pulse."""
    g = VGroup(*mobs)
    while scene.renderer.time + period <= t_end - 0.05:
        scene.play(g.animate.scale(1 + amp), run_time=period / 2, rate_func=rate_functions.ease_in_out_sine)
        scene.play(g.animate.scale(1 / (1 + amp)), run_time=period / 2, rate_func=rate_functions.ease_in_out_sine)
    scene.until(t_end)

def node(label, radius=1.0, color=BLUE_, size=None):
    """A model / decision node: a circle with a serif label (3b1b's 'neuron' look)."""
    c = Circle(radius=radius, color=color, stroke_width=5, fill_color=color, fill_opacity=0.18)
    return VGroup(c, S(label, size or int(radius * 64), INK).move_to(c))

def illustrative(scene):
    t = S("illustrative", 26, FAINT, slant=ITALIC).to_corner(DR, buff=0.3)
    scene.add(t); return t

def becomes(a, b, run_time=0.45, shift=UP * 0.2):
    """Text changes form as a clean cross-fade (never glyph-scrambling Transform on text)."""
    return AnimationGroup(FadeOut(a, shift=shift), FadeIn(b, shift=shift), run_time=run_time)

def morph_shape(a, b, **kw):
    """Shapes DO transform into each other (the 3b1b signature): circle -> bar, dots -> grid."""
    return ReplacementTransform(a, b, **kw)

def count_to(scene, to, fmt, pos, size=120, color=YEL, run_time=0.8, start=0.0, cue="riser"):
    """Count a serif number from `start` to `to`; it fades in as it starts (never a '0' frame). Returns a static copy."""
    if cue: scene.cue(cue)
    v = ValueTracker(start)
    num = counter(v, fmt, size, color, pos, opacity=lambda: min(1.0, 0.25 + 3 * (v.get_value() - start) / max(1e-9, to - start)))
    scene.add(num)
    scene.play(v.animate.set_value(to), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
    final = S(fmt(to), size, color).move_to(pos)
    scene.remove(num); scene.add(final)
    return final

def check(s, size=56, color=GRN):
    return VGroup(Text("✓", font="DejaVu Sans", font_size=size, color=color), S(s, size, color)).arrange(RIGHT, buff=0.25)
def cross(s, size=56, color=RED_):
    return VGroup(Text("✗", font="DejaVu Sans", font_size=size, color=color), S(s, size, color)).arrange(RIGHT, buff=0.25)

class B1BScene(TimedScene):
    """TimedScene whose waits breathe: any gap longer than 0.9 s becomes a gentle whole-frame scale pulse, so no beat ever
    sits still (QA motion) and the board feels alive the way a 3b1b frame does, without adding new objects."""
    AMP = 0.022
    def until(self, t):
        gap = t - self.renderer.time
        vis = [m for m in self.mobjects if not isinstance(m, ValueTracker) and m.has_points() or (not isinstance(m, ValueTracker) and len(m.submobjects))]
        if gap > 0.9 and vis:   # never scale ValueTrackers (their value lives in their points: scaling one blanks the frame)
            # each object scales about the frame centre (one coherent breath) and no Group is added to the scene
            n = max(1, int(gap // 1.6)); per = (gap - 0.02) / n
            for _ in range(n):
                self.play(*[m.animate.scale(1 + self.AMP, about_point=ORIGIN) for m in vis], run_time=per / 2, rate_func=rate_functions.ease_in_out_sine)
                self.play(*[m.animate.scale(1 / (1 + self.AMP), about_point=ORIGIN) for m in vis], run_time=per / 2, rate_func=rate_functions.ease_in_out_sine)
        super().until(t)

    def visible(self):
        return [m for m in self.mobjects if not isinstance(m, ValueTracker) and (m.has_points() or len(m.submobjects))]

    def crossfade(self, new, keep=(), run_time=0.35, shift=UP * 0.4):
        """Hand-off inside a span: the old frame leaves while the new one arrives (no blank frame, no overlap).
        `keep`: mobjects that stay (e.g. the chapter header)."""
        keep_f = set(id(f) for k in keep for f in k.get_family())
        old = [m for m in self.visible() if id(m) not in keep_f]
        new = new if isinstance(new, (list, tuple)) else [new]
        if old: self.play(*[FadeOut(m, shift=shift) for m in old], run_time=run_time * 0.45)   # out first, then in: never two layouts on top of each other
        self.play(*[FadeIn(n, shift=shift) for n in new], run_time=run_time * 0.55)

    def finish(self):
        """End of the clip: everything clears just before the next clip's first frame (clean hand-off between clips)."""
        self.until(CLIP_LEN - 0.45)
        vis = self.visible()
        if vis: self.play(*[FadeOut(m) for m in vis], run_time=0.3)
        self.until(CLIP_LEN)
