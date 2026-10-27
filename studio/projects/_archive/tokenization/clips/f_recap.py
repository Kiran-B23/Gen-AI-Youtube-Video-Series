import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

class RecapReplay(TimedScene):
    """recap (s20): four rows, one per spoken step."""
    def construct(self):
        title = headline("Recap", 120, TEXT)
        def row(n, label, mini): return VGroup(T(f"{n}  {label}", 68, TEXT), fit(mini, 0.84)).arrange(DOWN, buff=0.26)
        r1 = row(1, "Letters → numbers", VGroup(T("strawberry", 60, ACCENT, mono=True), T("→", 60, TEXT), T("115 116 …", 60, TEXT, mono=True)).arrange(RIGHT, buff=0.3))
        r2 = row(2, "Text → tokens", VGroup(*[chip(t, ACCENT if t == "strawberry" else ACCENT2, 56, pad=0.2) for t in TOKS]).arrange(RIGHT, buff=0.22))
        r3 = row(3, "Tokens → IDs", VGroup(chip("strawberry", ACCENT, 60, pad=0.22), T("→", 66, TEXT), hud_tag("101830", ACCENT2, 60)).arrange(RIGHT, buff=0.35))
        r4 = row(4, "You pay per token", VGroup(chip("6", ACCENT2, 60), T("vs", 54, TEXT), chip("10", ACCENT, 60), T("tokens", 54, TEXT)).arrange(RIGHT, buff=0.3))
        even_column([title, r1, r2, r3, r4], top=7.2, bottom=-7.0)
        self.add(title)
        for r, (word, nth) in zip((r1, r2, r3, r4), (("letters", 0), ("text", 0), ("tokens", 1), ("pay", 0))):
            self.until(w(word, nth=nth, scene="s20") - 0.15)
            self.cue("pop"); self.play(settle(r[0]), LaggedStart(*[pop_in(m) for m in r[1]], lag_ratio=0.08), run_time=0.5)
        breathe(self, VGroup(r1, r2, r3, r4), CLIP_LEN - 0.05, amp=0.05)
