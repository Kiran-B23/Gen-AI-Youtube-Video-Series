import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from motion_kit import *

def bubble(text, fill, color, width, size, corner=0.45):
    t = T(text, size, color)
    b = RoundedRectangle(corner_radius=corner, width=width, height=t.height + 1.0, fill_color=fill, fill_opacity=1, stroke_width=0)
    t.move_to(b)
    return VGroup(b, t)

class ChatFail(TimedScene):
    def construct(self):
        you = T("You", 44, DIM).move_to([-3.0, 5.6, 0])
        q1 = bubble("How many r's", ACCENT2, ink_on(ACCENT2), 12.0, 96).move_to([0.6, 3.6, 0])
        q2 = T("in strawberry?", 96, ink_on(ACCENT2)).next_to(q1[1], DOWN, buff=0.25)
        q1[0].stretch_to_fit_height(q1[1].height + q2.height + 1.25).align_to(q1[1], UP).shift(UP * 0.5)
        phone = phone_frame(12.2, 12.6, screen=shade(BG, 1.35)).move_to(UP * 0.4)
        for m in (you, q1, q2): m.shift(UP * 0.2)
        floor = grid_floor(14, 4.5).move_to(DOWN * 6.0)
        self.add(floor, phone, you, q1, q2)                                 # first frame: the question + the strawberry, already on screen
        ai = T("AI", 44, DIM).move_to([-5.4, -0.6, 0])
        dots = VGroup(*[Dot(radius=0.18, color=DIM) for _ in range(3)]).arrange(RIGHT, buff=0.3).move_to([-3.6, -2.0, 0])
        breathe(self, VGroup(you, q1, q2), w("and") - 0.1, amp=0.1, period=1.0)   # alive from frame 1
        self.play(FadeIn(ai), FadeIn(dots, shift=UP * 0.2), run_time=0.3)
        self.play(LaggedStart(*[d.animate.shift(UP * 0.25) for d in dots], lag_ratio=0.3, rate_func=there_and_back), run_time=0.45)
        self.until(w("two") - 0.15)                                  # "it might say two."
        ans = VGroup(T("There are", 88, TEXT), T("2", 120, ACCENT2), T("r's.", 88, TEXT)).arrange(RIGHT, buff=0.38, aligned_edge=DOWN)
        box = RoundedRectangle(corner_radius=0.45, width=ans.width + 1.4, height=ans.height + 1.0, fill_color=shade(TEXT, 0.22), fill_opacity=1, stroke_width=0)
        reply = VGroup(box, ans.move_to(box)).move_to([-1.2, -2.2, 0])
        self.cue("pop"); self.play(FadeOut(dots), pop_in(reply, run_time=0.35))
        x = T("✗", 170, ACCENT).next_to(reply, RIGHT, buff=0.35)
        tag = T("illustrative", 40, DIM).next_to(reply, DOWN, buff=0.45).align_to(reply, LEFT)
        self.cue("stamp"); self.play(pop_in(x, scale=1.8, run_time=0.3), FadeIn(tag))
        self.push_in(reply, 1.18, 0.5)   # camera leans in on the wrong answer
        self.wait(0.9)
