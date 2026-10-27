from kit import *

class TicketSpan(B1BScene):
    """s03-s04 (Step 1): the ticket types itself out; one scan pass through Jev; three typed answers, one per spoken word."""
    def construct(self):
        S3, S4 = "s03", "s04"
        hd = header(1, 4, "Read the ticket")
        tk = card(13.6, 4.6).move_to(UP * 3.3)
        self.add(hd, tk)   # the running object is there from frame 1
        illustrative(self)
        tid = M("ticket #4821", 44, SOFT).move_to(tk.get_corner(UL) + RIGHT * 2.2 + DOWN * 0.5)
        self.until(w("ticket", scene=S3) - 0.35)
        self.cue("pop"); self.play(FadeIn(tid), Indicate(tk, color=YEL, scale_factor=1.03), run_time=0.45)
        l1, l2 = S("Charged twice this month.", 72), S("Refund me or I cancel.", 72)
        VGroup(l1, l2).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(tk).shift(DOWN * 0.35)
        t0, t1 = w("charged", scene=S3) - 0.15, w("cancel", scene=S3) + 0.3
        self.until(t0)
        n1, n2 = len("Chargedtwicethismonth."), len("RefundmeorIcancel.")
        self.play(AddTextLetterByLetter(l1, time_per_char=(t1 - t0) * 0.55 / n1), run_time=(t1 - t0) * 0.55)
        self.play(AddTextLetterByLetter(l2, time_per_char=(t1 - t0) * 0.45 / n2), run_time=(t1 - t0) * 0.45)
        self.until(at(S4) - 0.05)
        # s04: one pass
        jev = node("Jev", 1.3, BLUE_, 88).move_to(DOWN * 0.9)
        down = Arrow(tk.get_bottom(), jev.get_top(), buff=0.15, color=GREY_B, stroke_width=6)
        self.play(GrowFromCenter(jev), GrowArrow(down), run_time=0.35)
        self.until(w("pass", scene=S4) - 0.15)
        beam = Line(tk.get_corner(UL) + RIGHT * 0.15, tk.get_corner(DL) + RIGHT * 0.15, color=YEL, stroke_width=12)
        self.cue("whoosh")
        self.play(beam.animate.move_to(tk.get_right() + LEFT * 0.15), run_time=0.55, rate_func=rate_functions.ease_in_out_sine)
        self.play(FadeOut(beam), Indicate(jev, color=YEL, scale_factor=1.12), run_time=0.35)
        xs = (-4.65, 0, 4.65)
        labels = ("team", "urgent", "churn risk")
        boxes = VGroup(*[card(4.45, 3.2).move_to([x, -5.6, 0]) for x in xs])
        tags = VGroup(*[M(l, 44, SOFT).move_to(b.get_top() + DOWN * 0.55) for l, b in zip(labels, boxes)])
        fan = VGroup(*[Arrow(jev.get_bottom(), b.get_top(), buff=0.15, color=GREY_B, stroke_width=5) for b in boxes])
        self.until(w("three", scene=S4) - 0.1)
        self.cue("pop")
        self.play(LaggedStart(*[GrowArrow(a) for a in fan], lag_ratio=0.12), LaggedStart(*[FadeIn(VGroup(b, t), shift=DOWN * 0.3) for b, t in zip(boxes, tags)], lag_ratio=0.12), run_time=0.55)
        vals = (("billing", GRN, "Billing", 76), ("yes · 0.81", GOLD_, "Urgent", 64), ("high", RED_, "High", 76))
        for (v, col, word, size), b, a in zip(vals, boxes, fan):
            self.until(w(word, scene=S4) - 0.12)
            m = S(v, size, col).move_to(b.get_center() + DOWN * 0.4)
            self.cue("pop")
            self.play(FadeIn(m, scale=0.6), a.animate.set_color(col), b.animate.set_stroke(col), run_time=0.3)
        self.finish()
