import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from motion_kit import *
"""Dots-specific pieces (kept in the project: the fork may not edit motion_kit). Proposed for motion_kit: orb(), app_tile(), browser_window()."""

def orb(r=1.0, color=None, awake=True):
    """The running object: a glowing agent orb (generic, no mascot). Concentric fading discs + a bright core + a highlight."""
    col = color or ACCENT
    halo = VGroup(*[Circle(radius=r * (1.0 + 0.28 * k), stroke_width=0, fill_color=col, fill_opacity=(0.16 if awake else 0.06) * (1 - k / 5)) for k in range(5)])
    core = Circle(radius=r, stroke_width=0, fill_color=col, fill_opacity=0.95 if awake else 0.35)
    hi = Circle(radius=r * 0.32, stroke_width=0, fill_color="#FFFFFF", fill_opacity=0.55 if awake else 0.15).move_to(core.get_center() + UP * r * 0.38 + LEFT * r * 0.3)
    return VGroup(halo, core, hi)

def wake(scene, o, run_time=0.5):
    """WAKES: the orb's glow swells and settles."""
    scene.play(o.animate.scale(1.25), run_time=run_time * 0.45, rate_func=rate_functions.ease_out_quad)
    scene.play(o.animate.scale(1 / 1.25), run_time=run_time * 0.55, rate_func=rate_functions.ease_out_back)

def app_tile(label, color=None, size=1.7):
    """A generic app tile: glass square with a short mono label (no brand marks)."""
    col = color or ACCENT2
    sq = RoundedRectangle(corner_radius=0.32, width=size, height=size, fill_color=col, fill_opacity=0.18, stroke_color=col, stroke_width=4)
    lab = T(label, 40, TEXT, mono=True).move_to(sq)
    if lab.width > size * 0.86: lab.scale_to_fit_width(size * 0.86)
    return VGroup(sq, lab)

def browser_window(width=9.0, height=5.4):
    """An illustrative browser: glass body, top bar with three dots and an address pill."""
    body = glass_panel(width, height, tint=TEXT, radius=0.3)
    bar_y = body.get_top()[1] - 0.45
    dots = VGroup(*[Dot(radius=0.11, color=c) for c in (DANGER, ACCENT, ACCENT2)]).arrange(RIGHT, buff=0.18).move_to([body.get_left()[0] + 0.75, bar_y, 0])
    pill = RoundedRectangle(corner_radius=0.2, width=width * 0.55, height=0.42, fill_color=TEXT, fill_opacity=0.12, stroke_width=0).move_to([body.get_center()[0] + 0.6, bar_y, 0])
    sep = Line([body.get_left()[0], bar_y - 0.38, 0], [body.get_right()[0], bar_y - 0.38, 0], color=TEXT, stroke_opacity=0.3, stroke_width=2)
    return VGroup(body, dots, pill, sep)
