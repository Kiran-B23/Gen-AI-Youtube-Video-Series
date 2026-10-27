import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

class IdsSpan(TimedScene):
    """span D (s12-s15): HUD tags SWING in; the list SCROLLS to row 101830; the numbers COLLAPSE into one ID; X-ray."""
    def construct(self):
        rows, chips = token_rows(76, gap=1.25, buff=0.7); rows.move_to(UP * 3.2)
        self.add(rows)
        self.until(w("ID", scene="s12", default=2.0) - 0.4)
        tags = VGroup(*[hud_tag(i, ACCENT if i == 101830 else ACCENT2).scale(0.85).next_to(c, DOWN, buff=0.16) for c, i in zip(chips, IDS)])
        for k in range(8): self.cue("pop", at=self.renderer.time + 0.1 * k)
        self.add(tags); self.play(LaggedStart(*[swing_in(t) for t in tags], lag_ratio=0.08), run_time=1.0)
        self.until(w("row", scene="s12") - 0.15)
        lab = T("row numbers in the list", 54, TEXT).move_to(DOWN * 2.6)
        self.play(FadeIn(lab, shift=UP * 0.2), run_time=0.3)
        # --- s13: the list scrolls to row 101830
        self.until(w("single", scene="s13") - 0.3)
        sb = VGroup(chips[6], tags[6]); others = VGroup(*[VGroup(c, t) for k, (c, t) in enumerate(zip(chips, tags)) if k != 6])
        self.play(FadeOut(lab), *[o.animate.shift((LEFT if o.get_center()[0] < 0 else RIGHT) * 12) for o in others],
                  sb.animate.scale(1.2).move_to(UP * 5.6), run_time=0.5, rate_func=rate_functions.ease_in_out_cubic)
        panel = glass_panel(11.0, 6.6).move_to(DOWN * 1.0)
        rowsdata = [(101828, "straw"), (101829, " eighty"), (101830, " strawberry"), (101831, "ourney"), (101832, " ensures")]
        lines = VGroup(*[VGroup(T(str(i), 46, DIM if i != 101830 else ACCENT, mono=True), T(repr(t)[1:-1], 46, TEXT if i != 101830 else ACCENT, mono=True)).arrange(RIGHT, buff=1.2, aligned_edge=DOWN)
                         for i, t in rowsdata]).arrange(DOWN, buff=0.42, aligned_edge=LEFT).move_to(panel)
        hl = RoundedRectangle(corner_radius=0.2, width=10.2, height=0.9, fill_color=ACCENT, fill_opacity=0.14, stroke_width=0).move_to(lines[2])
        self.play(FadeIn(panel, shift=UP * 0.4), run_time=0.35)
        self.cue("riser"); self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.6) for l in lines], lag_ratio=0.12), run_time=0.8)
        self.play(FadeIn(hl), Indicate(lines[2], color=ACCENT, scale_factor=1.04), run_time=0.5)
        self.until(w("nothing", scene="s13") - 0.2)
        note = T("the number means nothing by itself", 50, TEXT).next_to(panel, DOWN, buff=0.4)
        self.play(FadeIn(note, shift=UP * 0.2), run_time=0.3)
        self.until(w("points", scene="s13") - 0.15)
        arrow = Arrow(sb.get_bottom() + DOWN * 0.1, hl.get_top() + UP * 0.05, color=ACCENT, stroke_width=8, max_tip_length_to_length_ratio=0.12)
        self.cue("ding"); self.play(GrowArrow(arrow), run_time=0.4)
        # --- s14: collapse to one number
        self.until(w("isn't", scene="s14") - 0.4)
        self.play(FadeOut(VGroup(panel, lines, hl, note, arrow)), sb.animate.move_to(UP * 5.0), run_time=0.4)
        codes = VGroup(T("115 116 114 97 119", 64, TEXT, mono=True), T("98 101 114 114 121", 64, TEXT, mono=True)).arrange(DOWN, buff=0.25).move_to(UP * 1.4)
        self.play(FadeIn(codes, shift=UP * 0.2), run_time=0.3)
        self.until(w("one", nth=1, scene="s14") - 0.1)
        box = chip("101830", ACCENT2, 150, pad=0.45).move_to(DOWN * 2.2)
        self.cue("ding", at=self.renderer.time + 0.3); self.play(codes.animate.scale(0.2).move_to(box).set_opacity(0), pop_in(box, scale=0.3, run_time=0.5))
        lab2 = T("what GPT-4o's tokenizer sees", 50, TEXT).next_to(box, DOWN, buff=0.45)
        self.play(FadeIn(lab2), run_time=0.25); self.push_in(box, 1.22, 0.5)
        # --- s15: X-ray + honest line
        self.until(at("s15") - 0.3); self.pull_back(0.3)
        self.until(w("miscount", scene="s15") - 0.15)
        ghosts = VGroup(*[T(ch, 80, ACCENT if ch == "r" else TEXT, mono=True) for ch in "strawberry"]).arrange(RIGHT, buff=0.12)
        xray(self, box, ghosts)
        self.until(w("hidden", scene="s15") - 0.15)
        unxray(self, box, ghosts)
        hid = headline("letters hidden inside", 110, ACCENT).move_to(DOWN * 5.6)
        self.cue("stamp"); self.play(pop_in(hid, scale=1.4, run_time=0.3))
        self.until(w("only", scene="s15") - 0.2)
        honest = T("a big reason — not the only one", 50, DIM).next_to(hid, DOWN, buff=0.35)
        self.play(FadeIn(honest, shift=UP * 0.2), run_time=0.3)
        breathe(self, VGroup(box, lab2), CLIP_LEN - 0.05)
