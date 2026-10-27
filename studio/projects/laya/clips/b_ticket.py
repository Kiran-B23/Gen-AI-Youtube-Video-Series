from kit import *

class TicketSpan(TimedScene):
    """span B (s05-s07): the real ticket DROPS into the console; a scan line SWEEPS it; TEAM/URGENT/LEAVING tags LOCK ON;
    TEAM bar CHARGES to 98% (billing ✓); urgency shows unsure; LEAVING CHARGES to 48% and WOBBLES; camera PUNCHES IN;
    a coin FLIPS; the ticket DIVERTS to a human check. Numbers: our test (S12)."""
    def construct(self):
        cons = console(); tracks = VGroup(*[bar_track(y) for y in ROW_Y])
        self.add(cons, tracks)
        self.play(FadeIn(cons[0], scale=1.02), run_time=0.3)
        card = ticket_card(["I was charged twice.", "Refund me, or I cancel."]).move_to([0, 4.0, 0])   # in at the scene start: no empty console
        self.cue("whoosh"); self.play(FadeIn(card, shift=DOWN * 1.4), run_time=0.45)
        self.play(card.animate.shift(UP * 0.12), run_time=0.12); self.play(card.animate.shift(DOWN * 0.12), run_time=0.18)
        self.until(w("charged", scene="s05"))
        beam = glow(Line(UP * card.height / 2, DOWN * card.height / 2, color=ACCENT, stroke_width=6), ACCENT).move_to(card.get_left() + RIGHT * 0.3)
        self.add(beam); self.cue("riser")
        self.play(beam.animate.move_to(card.get_right() + LEFT * 0.3), run_time=1.1, rate_func=linear)
        self.play(FadeOut(beam), run_time=0.15)
        self.until(w("cancel", scene="s05") - 0.6)
        tags = [row_tag(l, y) for l, y in zip(["TEAM?", "URGENT?", "LEAVING?"], ROW_Y)]
        for k in range(3): self.cue("tick", at=self.renderer.time + 0.15 * k + 0.1)
        self.play(LaggedStart(*[swing_in(t) for t in tags], lag_ratio=0.25), run_time=0.75)
        # --- s06: billing 98%
        self.until(w("Billing", scene="s06") - 0.15)
        f1 = charge(self, ROW_Y[0], 0.98, ACCENT, run_time=0.55)
        lab1 = T("billing", 46, ink_on(ACCENT), mono=True).move_to([BAR_L + 1.4, ROW_Y[0], 0])
        v = ValueTracker(0); pos = [BAR_L + BAR_W - 1.1, ROW_Y[0], 0]
        num = always_redraw(lambda: T(f"{int(round(v.get_value()))}%", 56, ink_on(ACCENT), mono=True).move_to(pos))
        self.add(lab1, num)
        self.play(v.animate.set_value(98), run_time=0.5)
        self.until(w("Nailed", scene="s06") - 0.1)
        ok = T("✓", 90, ACCENT).next_to(tracks[0], RIGHT, buff=0.12)
        if ok.get_right()[0] > FRAME_W / 2 - 0.2: ok.move_to([FRAME_W / 2 - 0.55, ROW_Y[0], 0])
        self.cue("pop"); self.play(pop_in(ok, scale=1.8, run_time=0.3))
        f2 = charge(self, ROW_Y[1], 0.32, DIM, run_time=0.4, cue="tick")
        uns = T("unsure", 42, TEXT, mono=True).next_to(f2, RIGHT, buff=0.3)
        self.play(FadeIn(uns), run_time=0.2)
        # --- s07: leaving 48%, wobble, coin flip, divert
        self.until(w("leave", scene="s07") - 0.2)
        self.play(Indicate(tags[2], color=DANGER, scale_factor=1.12), run_time=0.45)
        self.until(w("48", scene="s07") - 0.15)
        f3 = charge(self, ROW_Y[2], 0.48, DANGER, run_time=0.5)
        n3 = T("48%", 60, TEXT, display=True).next_to(f3, RIGHT, buff=0.35)
        self.add(n3)
        # emphasis without a camera push (a push-in cropped "98%" and the ticket): a danger frame locks onto the row
        hl = SurroundingRectangle(VGroup(tags[2], bar_track(ROW_Y[2])), color=DANGER, buff=0.3, corner_radius=0.2, stroke_width=5)
        self.play(Create(hl), run_time=0.3)
        for d in (0.05, -0.05, 0.04, -0.03):
            self.play(f3.animate.stretch(1 + d, 0, about_edge=LEFT), run_time=0.11)
        self.until(w("guess", scene="s07") - 0.15)
        coin = VGroup(Circle(radius=0.62, fill_color=DANGER, fill_opacity=1, stroke_color=shade(DANGER, 0.6), stroke_width=6),
                      T("?", 64, ink_on(DANGER), display=True)).move_to(n3.get_right() + RIGHT * 1.1)
        if coin.get_right()[0] > FRAME_W / 2 - 0.2: coin.shift(LEFT * (coin.get_right()[0] - FRAME_W / 2 + 0.3))
        self.cue("tick"); self.play(FadeIn(coin, scale=0.5), run_time=0.2)
        for _ in range(3):
            self.play(coin.animate.stretch(0.08, 0), run_time=0.09); self.play(coin.animate.stretch(12.5, 0), run_time=0.09)
        self.until(w("cancel", scene="s07") - 0.3)
        divert = hud_tag("→ HUMAN CHECK", DANGER, size=44).move_to([2.6, -6.55, 0])   # straight, clear of the console edge
        self.cue("whoosh"); self.play(FadeIn(divert, shift=UP * 0.3), card.animate.set_opacity(0.55), run_time=0.45)
        breathe(self, VGroup(divert, coin), CLIP_LEN - 0.05, amp=0.05)
