import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from motion_kit import *
"""Jev reel: topic data + two small project helpers (proposed for motion_kit in the hand-back report)."""

TICKET = ["Charged twice this month.", "Refund me or I cancel."]          # running example (illustrative)
ANSWERS = [("TEAM: BILLING", "Billing"), ("URGENT: YES", "Urgent"), ("CHURN RISK: HIGH", "High")]

def decision_gate(radius=1.9, label="JEV", color=None):
    """The decision gate: a glowing ring, a slowly rotating dashed inner ring (ambient motion), a display label.
    Returns (VGroup, spinner) — the spinner already has a rotation updater."""
    col = color or ACCENT
    ring = glow(Circle(radius=radius, color=col, stroke_width=8), col)
    spinner = DashedVMobject(Circle(radius=radius * 0.78, color=col, stroke_width=4, stroke_opacity=0.7), num_dashes=28)
    spinner.add_updater(lambda m, dt: m.rotate(dt * 0.7))
    lab = T(label, int(radius * 46), TEXT, display=True)
    return VGroup(ring, spinner, lab), spinner

def decimal_count(scene, to, pos, fmt="{:.1f}", prefix="", suffix="", size=120, color=None, run_time=0.8, cue="riser", start=0):
    """count_up with decimals and a prefix (count_up() only formats integers). Returns the live mobject.
    start > 0: the count begins there and fades in over its first third (never a "0" frame)."""
    if cue: scene.cue(cue)
    v = ValueTracker(start)
    op = lambda: 1 if not start else min(1, 0.2 + 2.4 * (v.get_value() - start) / max(1e-6, to - start))
    num = always_redraw(lambda: T(prefix + fmt.format(v.get_value()) + suffix, size, color or ACCENT, display=True).move_to(pos).set_opacity(op()))
    scene.add(num); scene.play(v.animate.set_value(to), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
    num.clear_updaters(); return num
