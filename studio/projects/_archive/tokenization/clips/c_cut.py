import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

class CutSpan(TimedScene):
    """span C (s08-s11): the question TYPES onto a glass panel; the SCAN BEAM cuts and checks; in-context vs standalone; 8 tokens."""
    def construct(self):
        floor = grid_floor(14, 4.0).move_to(DOWN * 4.8); panel = glass_panel(13.4, 9.6).move_to(DOWN * 0.6)
        title = fit(T("Tokenization = cutting", 84, TEXT)).move_to(UP * 6.2)
        self.add(floor, panel, title)
        q = wrap_phrase(Q_PARTS, 104).move_to(UP * 2.0)
        self.until(w("follow", scene="s08", default=1.6) - 0.3)
        self.cue("tick"); self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in q], lag_ratio=0.08), run_time=0.7)
        # --- s09: cut and check
        self.until(w("cuts", scene="s09") - 0.2)
        scan_beam(self, q)
        crumbs(self, q.get_center() + DOWN * 0.3, ACCENT, n=9, spread=3.0)
        self.until(w("checks", scene="s09") - 0.1)
        ticks = VGroup(*[T("✓", 40, ACCENT2).next_to(p, DOWN, buff=0.12) for p in q])
        for k in range(len(q)): self.cue("tick", at=self.renderer.time + 0.09 * k)
        self.play(LaggedStart(*[pop_in(t, run_time=0.25) for t in ticks], lag_ratio=0.1), run_time=0.8)
        # --- s10: in this sentence one piece; alone three
        self.until(w("sentence", scene="s10") - 0.2)
        self.play(FadeOut(ticks), run_time=0.2)
        ctx = chip("␣strawberry", ACCENT, 72); ctx.move_to(DOWN * 1.9)
        lab1 = T("in the sentence: one piece", 50, TEXT).next_to(ctx, UP, buff=0.3)
        self.cue("pop"); self.play(q[6].animate.set_opacity(0.3), pop_in(ctx), FadeIn(lab1), run_time=0.5)
        self.until(w("three", scene="s10") - 0.15)
        alone = VGroup(*[chip(p, ACCENT2, 72) for p in ("st", "raw", "berry")]).arrange(RIGHT, buff=0.2).move_to(DOWN * 4.6)
        lab2 = T("on its own: three pieces", 50, TEXT).next_to(alone, UP, buff=0.3)
        for k in range(3): self.cue("pop", at=self.renderer.time + 0.15 * k)
        self.play(LaggedStart(*[pop_in(c) for c in alone], lag_ratio=0.2), FadeIn(lab2), run_time=0.7)
        self.until(w("space", scene="s10") - 0.1)
        sp = SurroundingRectangle(ctx[1][0], color=ACCENT2, buff=0.1, corner_radius=0.1)
        self.cue("ding"); self.play(Create(sp), Indicate(ctx[1][0], color=ACCENT2, scale_factor=1.4), run_time=0.6)
        # --- s11: 8 tokens
        self.until(at("s11") - 0.1)
        rows, chips = token_rows(80); rows.move_to(DOWN * 0.8)
        self.play(FadeOut(VGroup(ctx, lab1, alone, lab2, sp)), LaggedStart(*[morph(q[k], chips[k]) for k in range(len(q))], lag_ratio=0.06), run_time=0.7)
        self.until(w("eight", nth=1, scene="s11", default=w("tokens", scene="s11") - 0.3) - 0.1)
        n8 = headline("8 tokens", 130, ACCENT).move_to(DOWN * 6.0)
        self.cue("ding"); self.play(pop_in(n8, scale=1.4, run_time=0.3)); self.push_in(rows, 1.15, 0.5)
        breathe(self, VGroup(panel, rows), CLIP_LEN - 0.05, amp=0.05)
