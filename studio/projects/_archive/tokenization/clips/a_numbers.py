import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

class NumbersSpan(TimedScene):
    """span A (s02-s04): A FLIPS to 65; strawberry's letters FLIP to numbers; the numbers STREAM to the model and get a ✗."""
    def construct(self):
        a = T("A", 380, TEXT)
        cursor = Rectangle(width=0.14, height=3.2, fill_color=TEXT, fill_opacity=1, stroke_width=0).next_to(a, RIGHT, buff=0.2)
        self.add(a, cursor)
        self.play(cursor.animate.set_opacity(0), run_time=0.15); self.play(cursor.animate.set_opacity(1), run_time=0.15)
        self.until(w("never", scene="s02") - 0.05); self.play(Indicate(a, color=TEXT, scale_factor=1.1), run_time=0.45)
        self.until(w("letter", scene="s02") - 0.05)
        n = flip_to(self, a, T("65", 380, ACCENT2))
        self.remove(cursor)
        lab = T("Unicode", 64, TEXT, mono=True).next_to(n, DOWN, buff=0.6)
        self.play(FadeIn(lab, shift=UP * 0.2), run_time=0.25); self.push_in(n, 1.2, 0.5)
        # --- s03
        self.until(at("s03") - 0.3); self.pull_back(0.3)
        chipA = T("A = 65", 80, ACCENT2, mono=True).move_to(DOWN * 6.2)
        self.play(morph(VGroup(n, lab), chipA))
        cells = VGroup()
        for i, ch in enumerate("strawberry"):
            x, y = (i % 5 - 2) * 2.4, (3.6 if i < 5 else -0.6)
            cells.add(VGroup(T(ch, 130, TEXT, mono=True).move_to([x, y, 0]), T(str(CODES[i]), 76, ACCENT2 if ch == "r" else TEXT, mono=True).move_to([x, y - 1.7, 0])))
        self.play(LaggedStart(*[FadeIn(c[0], shift=DOWN * 0.3) for c in cells], lag_ratio=0.08), run_time=0.8)
        self.until(w("stored", scene="s03") - 0.1)
        for k in range(10): self.cue("tick", at=self.renderer.time + 0.07 * k)
        self.play(LaggedStart(*[AnimationGroup(c[0].animate.set_color(DIM), FadeIn(c[1], shift=DOWN * 0.3, scale=0.6)) for c in cells], lag_ratio=0.07), run_time=1.0)
        rs = VGroup(*[SurroundingRectangle(c[1], color=ACCENT2, buff=0.12, corner_radius=0.12) for c in cells if c[0].text == "r"])
        self.play(Create(rs), run_time=0.35)
        self.until(w("capital", scene="s03") - 0.1); self.play(Circumscribe(chipA, color=ACCENT2, buff=0.2), run_time=0.6)
        # --- s04: ten numbers stream to the model, then ✗
        self.until(w("numbers", scene="s04") - 0.2)
        nums = VGroup(*[c[1] for c in cells])
        row = VGroup(*[m.copy() for m in nums]).arrange(RIGHT, buff=0.22); fit(row, 0.9); row.move_to(UP * 1.2)
        self.play(FadeOut(VGroup(*[c[0] for c in cells]), rs, chipA), *[Transform(m, r) for m, r in zip(nums, row)], run_time=0.6)
        model = glass_panel(5.2, 3.0).move_to(DOWN * 4.2); mlab = T("MODEL", 54, ACCENT2, mono=True).move_to(model)
        self.play(FadeIn(model, shift=UP * 0.4), FadeIn(mlab), run_time=0.35)
        self.until(w("not", scene="s04") - 0.35)
        self.cue("riser"); self.play(nums.animate.move_to(model.get_top() + UP * 0.9).scale(0.8), run_time=0.5)
        x = T("✗", 200, ACCENT).move_to(model.get_top() + UP * 0.9)
        self.cue("stamp"); self.play(nums.animate.shift(UP * 1.6).set_opacity(0.35), pop_in(x, scale=1.8, run_time=0.3))
        note = T("not what the AI gets", 54, TEXT).next_to(model, DOWN, buff=0.4)
        self.play(FadeIn(note, shift=UP * 0.2), run_time=0.3)
        breathe(self, VGroup(model, mlab, x), CLIP_LEN - 0.05, amp=0.05)
