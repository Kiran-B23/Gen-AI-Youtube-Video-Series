import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

WORDS = ["apple", "zebra", "running", "quantum", "hello", "bridge", "seven", "purple", "token", "galaxy", "laptop", "river",
         "dance", "pixel", "orange", "planet", "music", "coffee", "window", "silver", "jungle", "rocket", "garden", "puzzle",
         "camera", "forest", "winter", "candle", "spider", "violin"]
SHELF = [["the", "Hello", "ing", "st"], ["un", "tion", "raw", "and"], ["bel", "AI", "berry", "er"], ["Token", "?", "ievable", "ization"]]

class BoardSpan(TimedScene):
    """span B (s05-s07): too long (ribbon) / too many (pile); the token list on racks; 200,019; whole word vs pieces."""
    def construct(self):
        lab1 = T("letter by letter", 70, TEXT).move_to(UP * 6.2)
        rib = ribbon("s t r a w b e r r y   i s   t e n   l e t t e r s   a n d   t h i s   s e n t e n c e   k e e p s   g o i n g")
        self.add(lab1, rib)
        t_whole = w("whole", scene="s05")
        self.play(rib.animate.shift(LEFT * (rib.width - 10)), run_time=max(1.0, t_whole - 0.4), rate_func=linear)
        tl = headline("far too long", 120, ACCENT).move_to(DOWN * 0.6)
        self.cue("stamp"); self.play(pop_in(tl, run_time=0.3))
        self.until(t_whole - 0.1)
        cards = card_pile(WORDS); lab2 = T("whole words", 70, TEXT).move_to(UP * 6.2)
        self.play(FadeOut(rib, shift=UP), FadeOut(tl), morph(lab1, lab2), LaggedStart(*[FadeIn(c, shift=DOWN * 3) for c in cards], lag_ratio=0.02), run_time=0.7)
        self.until(w("many", scene="s05") - 0.15)
        fm = headline("far too many", 130, ACCENT).move_to(UP * 4.4)
        self.cue("stamp"); self.play(pop_in(fm, scale=1.4, run_time=0.3))
        # --- s06: the token list
        self.until(at("s06") - 0.05)
        title = T("The token list", 84, TEXT).move_to(UP * 6.2)
        shelf_g, tiles = shelf(SHELF); shelf_g.shift(RIGHT * 15)
        self.play(FadeOut(VGroup(cards, fm), shift=LEFT * 15), FadeOut(lab2, shift=UP * 0.6), shelf_g.animate.shift(LEFT * 15), run_time=0.5, rate_func=rate_functions.ease_in_out_cubic)
        self.play(FadeIn(title, shift=DOWN * 0.3), run_time=0.25)
        self.until(w("tokens", scene="s06") - 0.1)
        self.play(LaggedStart(*[Indicate(c, color=ACCENT, scale_factor=1.08) for c in tiles.values()], lag_ratio=0.03), run_time=0.6)
        self.until(w("hundred", scene="s06", default=w("list", nth=1, scene="s06", default=at("s06") + 6.5)) - 0.5)
        count_up(self, 200019, DOWN * 5.6, suffix=" pieces"); self.push_in(DOWN * 4.0, 1.12, 0.4)
        # --- s07: whole vs pieces
        self.until(at("s07") - 0.3); self.pull_back(0.3)
        self.until(w("whole", scene="s07") - 0.1)
        hello = tiles["Hello"]
        self.cue("pop"); self.play(hello.animate.scale(1.25).move_to([-3.4, -2.7, 0]), run_time=0.4)
        self.add(T("whole word", 54, ACCENT).next_to(hello, RIGHT, buff=0.4))
        self.until(w("pieces", scene="s07") - 0.1)
        parts = VGroup(tiles["un"], tiles["bel"], tiles["ievable"])
        tgt = VGroup(*[p.copy() for p in parts]).arrange(RIGHT, buff=0.16).move_to([-1.2, -4.5, 0])
        for k in range(3): self.cue("pop", at=self.renderer.time + 0.15 * k)
        self.play(*[p.animate.move_to(t) for p, t in zip(parts, tgt)], run_time=0.45)
        self.add(T("pieces", 54, ACCENT).next_to(tgt, RIGHT, buff=0.4))
        breathe(self, shelf_g, CLIP_LEN - 0.05, amp=0.04)
