from kit import *

class HookSpan(B1BScene):
    """s01-s02: an empty page with a blinking cursor (it never writes) -> a fork that picks one option (it decides);
    then Jev as a node: questions flow in, typed answers flow out, each with its probability."""
    def construct(self):
        S1, S2 = "s01", "s02"
        title = S("Never writes.", 150).move_to(UP * 7.0)
        page = card(12.6, 3.4).move_to(UP * 3.3)
        self.add(title, page)   # on screen from frame 1
        cur = Rectangle(width=0.12, height=1.5, fill_color=INK, fill_opacity=1, stroke_width=0).move_to(page.get_left() + RIGHT * 1.0)
        self.play(FadeIn(cur), run_time=0.3)
        cur.add_updater(lambda m, dt: m.set_opacity(1 if (self.renderer.time * 2) % 2 < 1.2 else 0))
        self.until(w("word", scene=S1) - 0.1)
        zero = S("words written:  0", 76, RED_).next_to(page, DOWN, buff=0.5)
        self.cue("pop"); self.play(Write(zero), run_time=0.5)
        # it only decides: one input, three options, one is chosen
        self.until(w("decisions", scene=S1) - 0.55)
        dec = S("Only decides.", 150, YEL).move_to(title)
        dot = Dot(DOWN * 1.9, radius=0.22, color=INK)
        opts = VGroup(*[S(t, 76, SOFT) for t in ("billing", "shipping", "sales")]).arrange(RIGHT, buff=0.8).move_to(DOWN * 6.0)
        arrows = VGroup(*[Arrow(dot.get_center(), o.get_top(), buff=0.3, color=GREY_B, stroke_width=7) for o in opts])
        self.play(becomes(title, dec), FadeIn(dot), run_time=0.45)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), FadeIn(opts), run_time=0.5)
        self.cue("ding")
        self.play(arrows[0].animate.set_color(YEL).set_stroke(width=10), opts[0].animate.set_color(YEL).scale(1.12),
                  arrows[1].animate.set_opacity(0.25), arrows[2].animate.set_opacity(0.25), opts[1].animate.set_opacity(0.35), opts[2].animate.set_opacity(0.35), run_time=0.4)
        self.play(Circumscribe(opts[0], color=YEL, buff=0.15), run_time=0.6)
        self.until(at(S2) - 0.35)
        cur.clear_updaters()

        # s02: meet Jev (cross-fades in as the page leaves)
        meet = S("Meet", 72, SOFT, slant=ITALIC).move_to(UP * 7.9)
        jev = node("Jev", 1.9, BLUE_, 130).move_to(UP * 1.6)
        self.crossfade([meet, jev])
        self.cue("pop")
        xs = (-4.6, 0, 4.6)
        qs = VGroup(*[S(q, 72, INK) for q in ("team?", "urgent?", "refund?")])
        for q, x in zip(qs, xs): q.move_to([x, 6.0, 0])
        qa = VGroup(*[Arrow(q.get_bottom(), jev.get_top() + RIGHT * x * 0.14, buff=0.2, color=GREY_B, stroke_width=6) for q, x in zip(qs, xs)])
        self.until(w("questions", scene=S2) - 0.45)
        self.play(LaggedStart(*[FadeIn(q, shift=DOWN * 0.3) for q in qs], lag_ratio=0.2), run_time=0.5)
        self.play(LaggedStart(*[GrowArrow(a) for a in qa], lag_ratio=0.15), run_time=0.45)
        # typed answers: a choice, and two yes/no answers that come back as probabilities (never a bare word)
        self.until(w("typed", scene=S2) - 0.35)
        ans = [("billing", "choice"), ("yes · 0.81", "yes / no"), ("no · 0.57", "yes / no")]
        outs = VGroup()
        for (a, ty), x in zip(ans, xs):
            outs.add(VGroup(S(a, 66, YEL), M(ty, 44, SOFT)).arrange(DOWN, buff=0.22).move_to([x, -3.2, 0]))
        oa = VGroup(*[Arrow(jev.get_bottom() + RIGHT * x * 0.14, o.get_top(), buff=0.2, color=YEL, stroke_width=6) for o, x in zip(outs, xs)])
        self.cue("pop")
        self.play(LaggedStart(*[GrowArrow(a) for a in oa], lag_ratio=0.15), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(o, shift=DOWN * 0.3) for o in outs], lag_ratio=0.15), run_time=0.5)
        # confidence: a bar fills under each answer, with its score
        self.until(w("confidence", scene=S2) - 0.3)
        confs = (0.94, 0.81, 0.57)
        tracks, fills, labs = VGroup(), VGroup(), VGroup()
        for o, c in zip(outs, confs):
            tr = Rectangle(width=4.0, height=0.46, stroke_color=GREY_C, stroke_width=3).next_to(o, DOWN, buff=0.45)
            f = Rectangle(width=4.0 * c, height=0.46, fill_color=TEALC, fill_opacity=0.9, stroke_width=0).align_to(tr, LEFT).move_to(tr, coor_mask=[0, 1, 0])
            tracks.add(tr); fills.add(f); labs.add(S(f"{c:.2f}", 64, TEALC).next_to(tr, DOWN, buff=0.3))
        cl = S("confidence", 56, SOFT, slant=ITALIC).move_to(DOWN * 7.9)
        self.cue("ding")
        self.play(Create(tracks), FadeIn(cl), run_time=0.3)
        self.play(*[GrowFromEdge(f, LEFT) for f in fills], LaggedStart(*[FadeIn(l) for l in labs], lag_ratio=0.2), run_time=0.7)
        self.finish()
