from kit import *

class CostSpan(B1BScene):
    """s05-s07 (Step 2): a one-second number line, a dot runs to 0.1 s; the price of a million input tokens, output free;
    7,977 items fill a grid for $0.21; the grid collapses into a bar next to the priciest LLM's: ~300x."""
    def construct(self):
        S5, S6, S7 = "s05", "s06", "s07"
        hd = header(2, 4, "Check the cost")
        nl = NumberLine(x_range=[0, 1, 0.1], length=12.4, include_numbers=False, color=SOFT, stroke_width=5, tick_size=0.15).move_to(UP * 3.0)
        l0 = S("0", 64, SOFT).next_to(nl.n2p(0), DOWN, buff=0.35); l1 = S("1 second", 64, SOFT).next_to(nl.n2p(1), DOWN, buff=0.35).shift(LEFT * 1.5)
        self.add(hd, nl, l0, l1)
        dot = Dot(nl.n2p(0), radius=0.26, color=YEL)
        self.add(dot)
        claim = S("TypeSafe's claim", 56, SOFT, slant=ITALIC).move_to(DOWN * 5.0)
        self.play(FadeIn(claim), run_time=0.3)
        self.until(w("tenth", scene=S5) - 0.35)
        self.cue("ding")
        self.play(dot.animate.move_to(nl.n2p(0.1)), run_time=0.45, rate_func=rate_functions.ease_out_cubic)
        br = Brace(Line(nl.n2p(0), nl.n2p(0.1)), UP, color=YEL, buff=0.2)
        big = S("≈ 0.1 s", 170, YEL).move_to(DOWN * 0.8)
        sub = S("per answer", 76, INK).next_to(big, DOWN, buff=0.35)
        self.play(GrowFromCenter(br), FadeIn(big, scale=0.8), FadeIn(sub), run_time=0.4)
        self.until(at(S6) - 0.35)
        # s06: price per million input tokens; output free
        def grid(n, side, col, op):
            g = VGroup(*[Square(side_length=side, stroke_width=1.5, stroke_color=col, fill_color=col, fill_opacity=op) for _ in range(n * n)])
            return g.arrange_in_grid(n, n, buff=side * 0.18)
        gin = grid(10, 0.3, BLUE_, 0.75).move_to([-3.9, 3.0, 0])
        lin = S("1M input tokens", 56, SOFT).next_to(gin, DOWN, buff=0.35)
        self.crossfade([gin, lin], keep=[hd])
        self.until(w("4.2", scene=S6, default=at(S6) + 0.78) - 0.2)
        price = count_to(self, 0.042, lambda v: f"${v:.3f}", [3.0, 3.2, 0], 150, YEL, run_time=0.6)
        self.until(w("Output", scene=S6) - 0.2)
        gout = grid(10, 0.3, GREY_C, 0.25).move_to([-3.9, -3.2, 0])
        lout = S("output tokens", 56, SOFT).next_to(gout, DOWN, buff=0.35)
        self.play(LaggedStart(*[FadeIn(s) for s in gout], lag_ratio=0.004), FadeIn(lout), run_time=0.45)
        self.until(w("free", scene=S6) - 0.1)
        free = S("free", 180, TEALC).move_to([3.0, -3.0, 0])
        self.cue("stamp")
        self.play(FadeIn(free, scale=1.4), run_time=0.3)
        self.play(Circumscribe(free, color=TEALC, buff=0.2), run_time=0.6)
        self.until(at(S7) - 0.35)
        # s07: 7,977 items in a grid (each square = 100 items), for 21 cents
        cells = VGroup(*[Square(side_length=0.92, stroke_width=3, stroke_color=GREY_C) for _ in range(80)]).arrange_in_grid(8, 10, buff=0.16).move_to(DOWN * 1.9)
        key = S("each square = 100 items", 48, SOFT, slant=ITALIC).next_to(cells, DOWN, buff=0.3)
        lab = S("items labelled · independent test", 56, SOFT).next_to(cells, UP, buff=0.35)
        self.crossfade([cells, key, lab], keep=[hd])
        ta, tb = w("labeled", scene=S7) - 0.1, w("items", scene=S7) + 0.2
        self.until(ta)
        v = ValueTracker(0)
        num = counter(v, lambda x: f"{int(x):,}", 150, INK, lab.get_center() + UP * 1.25, opacity=lambda: min(1, 0.25 + v.get_value() / 800))
        def fill(m):
            k = v.get_value() / 100
            for i, c in enumerate(m): c.set_fill(BLUE_, opacity=0.85 if i < k else 0)
        cells.add_updater(fill)
        self.add(num); self.cue("riser")
        self.play(v.animate.set_value(7977), run_time=tb - ta, rate_func=rate_functions.ease_in_out_sine)
        cells.clear_updaters(); fill(cells)
        self.remove(num, v); num = S("7,977", 150, INK).move_to(lab.get_center() + UP * 1.25); self.add(num)
        self.until(w("21", scene=S7) - 0.15)
        cost = S("$0.21 total", 130, GRN).next_to(key, DOWN, buff=0.4)
        self.cue("ding")
        self.play(FadeIn(cost, scale=0.8), cells.animate.set_fill(GRN, opacity=0.85), run_time=0.45)
        self.until(w("priciest", scene=S7) - 0.35)
        # the whole grid collapses into one short bar; the priciest LLM's bar rises beside it
        base_y = -6.4
        axis = Line([-6.4, base_y, 0], [6.4, base_y, 0], color=SOFT, stroke_width=5)
        jbar = Rectangle(width=3.0, height=0.14, fill_color=GRN, fill_opacity=1, stroke_width=0).move_to([-3.1, base_y + 0.07, 0])
        self.play(morph_shape(cells, jbar), FadeOut(VGroup(key, lab, num, cost), shift=UP * 0.3), Create(axis), run_time=0.6)
        j_val = S("$0.21", 84, GRN).next_to(jbar, UP, buff=0.3)
        j_name = S("Jev", 64, INK).next_to(axis, DOWN, buff=0.3).set_x(-3.1)
        l_name = S("priciest of 19 LLMs", 52, INK).next_to(axis, DOWN, buff=0.3).set_x(3.1)
        self.play(FadeIn(j_val), FadeIn(j_name), FadeIn(l_name), run_time=0.3)
        h = ValueTracker(0.14)
        top = 10.6
        lbar = always_redraw(lambda: Rectangle(width=3.0, height=h.get_value(), fill_color=BLUE_, fill_opacity=1, stroke_width=0).move_to([3.1, base_y + h.get_value() / 2, 0]))
        lv = always_redraw(lambda: S(f"${62.99 * (h.get_value() - 0.14) / (top - 0.14):.2f}", 84, BLUE_).next_to(lbar, UP, buff=0.3)
                           .set_opacity(min(1, max(0, (h.get_value() - 0.6) / 1.2))))   # hidden until it has risen: never "$0.00"
        self.add(lbar, lv); self.cue("riser")
        self.play(h.animate.set_value(top), run_time=1.5, rate_func=rate_functions.ease_out_cubic)
        lbar.clear_updaters(); lv.clear_updaters(); self.remove(h)
        self.until(w("300", scene=S7) - 0.2)
        arr = DoubleArrow([0.4, base_y + 0.5, 0], [0.4, base_y + top - 0.2, 0], color=YEL, buff=0, stroke_width=8, tip_length=0.4)
        x300 = S("≈ 300×", 150, YEL).move_to([-3.1, base_y + top * 0.55, 0])
        self.cue("stamp")
        self.play(GrowFromCenter(arr), FadeIn(x300, scale=1.3), run_time=0.45)
        self.finish()
