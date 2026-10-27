from kit import *

class ConsoleSpan(TimedScene):
    """span A (s02-s03): LAYA title; a chat box's cursor never types (GHOSTS OUT); the decision console BUILDS;
    a message card SLIDES IN; three typed questions LOCK ON; three probability bars CHARGE UP."""
    def construct(self):
        title = T("LAYA", 150, TEXT, display=True).move_to([0, 4.9, 0])
        sub = T("decides · never writes", 50, ACCENT, mono=True).next_to(title, DOWN, buff=0.15)
        self.play(FadeIn(title, shift=DOWN * 0.3, scale=1.1), run_time=0.45)
        # a chat box whose cursor blinks but never types
        box = glass_panel(11.0, 2.4, tint=TEXT).move_to([0, -0.6, 0])
        hint = T("writes text…", 46, DIM).move_to(box).align_to(box, LEFT).shift(RIGHT * 0.6)
        cur = Rectangle(width=0.1, height=0.9, fill_color=TEXT, fill_opacity=1, stroke_width=0).next_to(hint, RIGHT, buff=0.25)
        self.play(FadeIn(box, shift=UP * 0.3), FadeIn(hint), FadeIn(cur), run_time=0.4)
        for _ in range(3):
            self.play(cur.animate.set_opacity(0), run_time=0.14); self.play(cur.animate.set_opacity(1), run_time=0.14)
        self.until(w("decision", scene="s02") - 0.1)
        self.play(FadeIn(sub, shift=UP * 0.2), run_time=0.3)
        self.until(w("never", scene="s02") - 0.05)
        x = Line(box.get_corner(UL) + RIGHT * 0.3 + DOWN * 0.2, box.get_corner(DR) + LEFT * 0.3 + UP * 0.2, color=ACCENT, stroke_width=10)
        self.cue("stamp"); self.play(Create(x), run_time=0.25)
        self.play(FadeOut(VGroup(box, hint, cur, x), scale=0.85), run_time=0.35)
        # --- s03: console builds, message slides in, questions lock on, bars charge
        cons = console()
        tracks = VGroup(*[bar_track(y) for y in ROW_Y])
        self.play(FadeIn(cons, shift=UP * 0.4), title.animate.scale(0.55).move_to([-4.6, 5.6, 0]), FadeOut(sub), run_time=0.45)
        msg = ticket_card(["a message, an email, a ticket…"], width=9.6).scale(0.9).move_to([1.6, 3.75, 0])   # arrives with the console: no empty box
        self.cue("whoosh"); self.play(FadeIn(msg, shift=LEFT * 1.2), run_time=0.4)
        self.until(w("questions", scene="s03") - 0.15)
        tags = [row_tag(l, y) for l, y in zip(["CHOICE?", "SCORE?", "YES/NO?"], ROW_Y)]
        for k, t in enumerate(tags):
            self.cue("tick", at=self.renderer.time + 0.12 * k + 0.1)
        self.play(LaggedStart(*[swing_in(t) for t in tags], lag_ratio=0.25), FadeIn(tracks), run_time=0.8)
        self.until(w("probability", scene="s03") - 0.45)
        fills = []
        for frac, y, col in zip([0.82, 0.55, 0.3], ROW_Y, [ACCENT, ACCENT2, ACCENT]):
            fills.append(charge(self, y, frac, col, run_time=0.35, cue="tick"))
        pct = VGroup(*[T("%", 54, BG if f.width > 1 else TEXT, mono=True).move_to(f.get_right() + LEFT * 0.45) for f in fills])
        self.play(FadeIn(pct), run_time=0.2)
        ex = T("example", 30, DIM, mono=True).next_to(cons[0], DOWN, buff=0.15).align_to(cons[0], RIGHT)
        self.add(ex)
        breathe(self, VGroup(*fills, pct), CLIP_LEN - 0.05, amp=0.05)
