from manim import *
class Smoke(Scene):
    def construct(self):
        t = Text("2 words → 7 tokens", font_size=64)
        boxes = VGroup(*[Square(0.8).set_stroke(YELLOW, 4) for _ in range(7)]).arrange(RIGHT, buff=0.15).next_to(t, DOWN, buff=0.8)
        self.play(Write(t), run_time=1)
        self.play(LaggedStart(*[Create(b) for b in boxes], lag_ratio=0.15), run_time=1.2)
