from kit import *

class CatchSpan(B1BScene):
    """s08-s09 (Step 3): 100 dots, 68 light up (matched frontier models), 32 turn red; then a reply that fits the format
    perfectly and is still wrong."""
    def construct(self):
        S8, S9 = "s08", "s09"
        hd = header(3, 4, "The catch")
        dots = VGroup(*[Circle(radius=0.37, stroke_color=GREY_C, stroke_width=4) for _ in range(100)]).arrange_in_grid(10, 10, buff=0.2).move_to(DOWN * 1.1)
        self.add(hd, dots)   # the board of 100 is there from frame 1
        cap = S("matched frontier models", 66, INK).next_to(dots, DOWN, buff=0.4)
        sub = S("TypeSafe's own test", 50, SOFT, slant=ITALIC).next_to(cap, DOWN, buff=0.2)
        self.until(w("catch", scene=S8) + 0.1)
        self.play(LaggedStart(*[Indicate(d, scale_factor=1.15, color=GREY_B) for d in dots], lag_ratio=0.008), run_time=0.8)
        self.until(w("test", scene=S8) - 0.4)
        self.play(FadeIn(cap), FadeIn(sub), run_time=0.4)
        self.until(w("68", scene=S8) - 0.15)
        self.play(LaggedStart(*[d.animate.set_fill(BLUE_, 0.9).set_stroke(BLUE_) for d in dots[:68]], lag_ratio=0.02), run_time=0.9)
        pct = count_to(self, 68, lambda v: f"{v:.0f}%", [3.4, 4.6, 0], 170, YEL, run_time=0.7, cue="ding")
        self.play(*[d.animate.set_stroke(RED_, width=5) for d in dots[68:]], run_time=0.5)
        self.until(at(S9) - 0.35)
        # s09: valid but wrong
        tk = card(13.4, 2.1).move_to(UP * 4.0)
        tq = S("“My order is three weeks late.”", 64).move_to(tk)
        fitw(tq, 0.88)
        self.crossfade([tk, tq], keep=[hd])
        illustrative(self)
        self.until(w("answer", scene=S9) - 0.15)
        js = card(11.6, 4.0, GREY_C, "#232323").move_to(UP * 0.3)
        lines = VGroup(M("{", 72), VGroup(M('"team": ', 72, SOFT), M('"billing"', 72, BLUE_)).arrange(RIGHT, buff=0.05), M("}", 72)).arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(js)
        lines[1].shift(RIGHT * 0.6)
        arr = Arrow(tk.get_bottom(), js.get_top(), buff=0.12, color=GREY_B, stroke_width=6)
        self.cue("pop")
        self.play(GrowArrow(arr), Create(js), Write(lines), run_time=0.6)
        self.until(w("format", scene=S9) - 0.1)
        ok = check("valid format", 72, GRN).next_to(js, DOWN, buff=0.45)
        self.cue("pop"); self.play(FadeIn(ok, shift=UP * 0.2), run_time=0.3)
        self.until(w("wrong", scene=S9) - 0.15)
        val = lines[1][1]
        x = Cross(val, stroke_color=RED_, stroke_width=10, scale_factor=1.1)
        wrong = S("still wrong", 140, RED_).next_to(ok, DOWN, buff=0.45)
        should = VGroup(S("should be:", 64, SOFT), S("shipping", 72, GRN)).arrange(RIGHT, buff=0.3).next_to(wrong, DOWN, buff=0.35)
        self.cue("stamp")
        self.play(Create(x), val.animate.set_color(RED_), FadeIn(wrong, scale=1.3), run_time=0.4)
        self.play(FadeIn(should, shift=UP * 0.2), run_time=0.3)
        self.finish()
