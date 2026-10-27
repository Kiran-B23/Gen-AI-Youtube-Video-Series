import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from motion_kit import *
"""Laya project DATA + span choreography helpers (the decision console). Generic pieces belong in motion_kit.py."""

ROW_Y = [0.55, -1.85, -4.25]          # three answer rows inside the console
BAR_L, BAR_W, BAR_H = -2.55, 8.3, 0.86
TAG_X = -4.7

def console():
    """Glass decision console around the three answer rows, with a header label."""
    panel = glass_panel(13.3, 7.6, tint=ACCENT2).move_to([0, -1.85, 0])
    # the label sits INSIDE the panel's top edge, so a card above the console never touches it
    lab = T("DECISION MODEL · LOCAL", 34, DIM, mono=True).align_to(panel, UP).align_to(panel, LEFT).shift(RIGHT * 0.45 + DOWN * 0.3)
    return VGroup(panel, lab)

def bar_track(y):
    return RoundedRectangle(corner_radius=0.18, width=BAR_W, height=BAR_H, fill_color=TEXT, fill_opacity=0.06,
                            stroke_color=TEXT, stroke_opacity=0.25, stroke_width=2).move_to([BAR_L + BAR_W / 2, y, 0])

def bar_fill(y, frac, color):
    w = max(0.05, BAR_W * frac)
    return RoundedRectangle(corner_radius=0.18, width=w, height=BAR_H, fill_color=color, fill_opacity=0.92,
                            stroke_width=0).move_to([BAR_L + w / 2, y, 0])

def row_tag(label, y, color=None):
    t = hud_tag(label, color or ACCENT2, size=40)
    return t.move_to([TAG_X, y, 0])

def charge(scene, y, frac, color, run_time=0.6, cue="ding"):
    """CHARGES UP: a bar grows from the left edge of its track to `frac` of the width. Returns the fill."""
    start = bar_fill(y, 0.0, color)
    end = bar_fill(y, frac, color)
    scene.add(start)
    if cue: scene.cue(cue, at=scene.renderer.time + run_time)
    scene.play(Transform(start, end), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
    return start

def ticket_card(lines, width=11.6):
    body = VGroup(*[T(l, 52, TEXT) for l in lines]).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
    head = T("SUPPORT TICKET", 32, ACCENT, mono=True)
    content = VGroup(head, body).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
    panel = glass_panel(max(width, content.width + 1.0), content.height + 0.9, tint=TEXT)
    content.move_to(panel)
    return VGroup(panel, content)
