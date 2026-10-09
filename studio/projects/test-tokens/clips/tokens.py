import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *

class Tokens(Scene):
    def construct(self):
        words = T("Tokenization matters", 88)
        self.play(Write(words), run_time=0.8)
        parts = ["Token", "ization", "matters"]
        boxes = VGroup(*[VGroup(RoundedRectangle(corner_radius=0.18, width=len(p) * 0.46 + 0.7, height=1.2, color=ACCENT, stroke_width=7), T(p, 60, ACCENT, mono=True))
                         for p in parts]).arrange(RIGHT, buff=0.3)
        for b in boxes: b[1].move_to(b[0])
        boxes.move_to(DOWN * 0.4)
        self.play(words.animate.shift(UP * 1.9), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in boxes], lag_ratio=0.35), run_time=1.4)
        lab = T("2 words → 3 tokens", 70).next_to(boxes, DOWN, buff=0.9)
        self.play(FadeIn(lab, shift=UP * 0.2), run_time=0.5); self.wait(1.5)
