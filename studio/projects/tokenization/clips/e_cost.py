import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from kit import *

class CostSpan(TimedScene):
    """span E (s16-s18): token meter COUNTS UP with 'price' and 'context limit'; bars 6 vs 10; then GPT-4 vs GPT-4o 42 vs 10."""
    def construct(self):
        title = VGroup(headline("You pay", 150, TEXT), headline("per token", 150, ACCENT)).arrange(DOWN, buff=0.1).move_to(UP * 4.9)
        mtr, v, num = meter("TOKENS", panel_color=shade(BG, 1.6), label_color=ACCENT2, num_color=TEXT); mtr.move_to(DOWN * 1.2); panel, lab = mtr
        self.add(title, panel, lab, num)
        drops = VGroup(*[chip(t, ACCENT, 50) for t in ["And", "this", "is", "where", "it", "costs"]])
        for k, d in enumerate(drops): d.move_to([-4.6 + (k % 3) * 2.2, -5.2 - (k // 3) * 1.0, 0])
        self.add(drops)
        self.play(LaggedStart(*[d.animate.move_to(panel.get_center()).scale(0.3).set_opacity(0) for d in drops], lag_ratio=0.25), v.animate.set_value(6), run_time=1.6)
        self.until(w("prices", scene="s16") - 0.1)
        p1 = chip("price", ACCENT2, 56, mono=False).move_to([-2.6, -5.0, 0]); p2 = chip("context limit", ACCENT2, 56, mono=False).move_to([2.6, -5.0, 0])
        self.cue("pop"); self.play(pop_in(p1), run_time=0.35)
        self.until(w("context", scene="s16") - 0.1); self.cue("pop"); self.play(pop_in(p2), run_time=0.35)
        # --- s17: 6 vs 10
        self.until(at("s17") - 0.05)
        bars_g, bars = data_bars([6, 10], ["English", "Tamil"], width=5.4, max_h=6.0, color=ACCENT, subs=["Hello, how are you?", "வணக்கம், எப்படி இருக்கிறீர்கள்?"])
        bars_g.move_to(DOWN * 0.6)
        for bar, n_, bh in bars: bar.save_state(); bar.stretch(0.01, 1, about_edge=DOWN); n_.set_opacity(0)
        self.play(FadeOut(VGroup(panel, lab, num, p1, p2), shift=UP * 2), title.animate.scale(0.5).move_to(UP * 6.0), FadeIn(bars_g, shift=UP * 0.6), run_time=0.45)
        self.until(w("six", scene="s17") - 0.1); self.cue("riser"); self.play(Restore(bars[0][0]), bars[0][1].animate.set_opacity(1), run_time=0.6, rate_func=rate_functions.ease_out_back)
        self.until(w("ten", scene="s17") - 0.1); self.cue("riser"); self.play(Restore(bars[1][0]), bars[1][1].animate.set_opacity(1), run_time=0.6, rate_func=rate_functions.ease_out_back)
        self.until(w("more", nth=1, scene="s17", default=w("same", nth=1, scene="s17") + 0.6) - 0.1)
        verdict = headline("Same meaning, more tokens", 90, ACCENT).move_to(DOWN * 6.7)
        self.cue("ding"); self.play(pop_in(verdict, run_time=0.3))
        # --- s18: GPT-4 vs GPT-4o on the Tamil greeting
        self.until(w("GPT", scene="s18", default=at("s18") + 1.5) - 0.3)
        bars2_g, bars2 = data_bars([42, 10], ["GPT-4", "GPT-4o"], width=5.4, max_h=6.0, color=ACCENT2, subs=["the same Tamil greeting", "the same Tamil greeting"])
        bars2_g.move_to(DOWN * 0.6)
        for bar, n_, bh in bars2: bar.save_state(); bar.stretch(0.01, 1, about_edge=DOWN); n_.set_opacity(0)
        t2 = headline("Different models, different cuts", 80, TEXT).move_to(UP * 6.0)
        self.play(FadeOut(VGroup(bars_g, verdict)), morph(title, t2), FadeIn(bars2_g, shift=UP * 0.6), run_time=0.5)
        self.until(w("forty", scene="s18", default=at("s18") + 3.5) - 0.1); self.cue("riser"); self.play(Restore(bars2[0][0]), bars2[0][1].animate.set_opacity(1), run_time=0.7, rate_func=rate_functions.ease_out_back)
        self.until(w("ten", scene="s18", default=at("s18") + 6.5) - 0.1); self.cue("riser"); self.play(Restore(bars2[1][0]), bars2[1][1].animate.set_opacity(1), run_time=0.6, rate_func=rate_functions.ease_out_back)
        self.cue("ding"); self.push_in(bars2[1][1], 1.15, 0.4); self.pull_back(0.35)
        breathe(self, bars2_g, CLIP_LEN - 0.05, amp=0.05)
