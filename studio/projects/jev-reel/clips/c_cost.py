import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *

class CostBars(TimedScene):
    """clip C (s07): the chart frame is there from frame 1; the item count COUNTS UP on 'labeled … 8,000' in the empty
    chart, then SHRINKS into a HUD tag as JEV's bar barely RISES to $0.21 on '21'; the 19-LLM bar SHOOTS UP to $62.99 on
    '19' while its readout COUNTS UP; ~300x lands in JEV's empty column on '300' (independent arXiv study; the source is
    in the description, not on screen). No camera moves: the chart never shifts sideways."""
    def construct(self):
        g, bars = data_bars([0.21, 62.99], ["Jev", "19 LLMs"], width=4.4, max_h=7.2, color=ACCENT)
        g.move_to(DOWN * 0.9)
        for back in (g[0], g[4]): back.set_fill(opacity=0.10).set_stroke(opacity=0.45)   # the empty frame reads from frame 1
        bars[1][0].set_fill(ACCENT2)
        for bar, num, bh in bars:
            bar.stretch(0.01, 1, about_edge=DOWN)
            num.set_opacity(0)   # data_bars' static readouts stay hidden: breathe(g) re-adds them, the live readouts replace them
        nums = [num for _, num, _ in bars]
        self.play(FadeIn(VGroup(*[m for m in g if m not in nums]), shift=UP * 0.6), run_time=0.4)

        # the dataset: 7,977 items counted up inside the empty chart
        cnt_pos = UP * 4.95   # above the bar frames (they top out at y 2.7), never across their outlines
        v_items = ValueTracker(1000)
        items = always_redraw(lambda: T("{:,}".format(int(v_items.get_value())), 170, TEXT, display=True)
                              .move_to(cnt_pos).set_opacity(min(1, (v_items.get_value() - 1000) / 1500 + 0.15)))
        items_lab = T("items labelled", 56, DIM).move_to(cnt_pos + DOWN * 1.3)
        self.until(w("labeled", scene="s07", default=1.3) - 0.1)
        self.add(items); self.cue("riser")
        self.play(v_items.animate.set_value(7977), FadeIn(items_lab, shift=UP * 0.2),
                  run_time=max(0.6, w("items", scene="s07", default=3.4) - self.renderer.time), rate_func=rate_functions.ease_out_cubic)
        items.clear_updaters()
        breathe(self, VGroup(items, items_lab), w("21", scene="s07", default=4.7) - 0.45, amp=0.05, period=1.2)

        # '21': the count becomes the tag; JEV's bar rises to a visible sliver (its real height is 0.3% of the LLM bar)
        tag = hud_tag("7,977 ITEMS LABELLED", ACCENT2, 44).move_to(UP * 5.9)
        jev_bar = bars[0][0]
        self.cue("pop")
        self.play(morph(VGroup(items, items_lab), tag), run_time=0.4)
        self.cue("riser"); self.play(jev_bar.animate.stretch_to_fit_height(0.35, about_edge=DOWN), run_time=0.35)
        jev_num = T("$0.21", 110, ACCENT, display=True).move_to(bars[0][1])
        self.cue("ding"); self.play(pop_in(jev_num), run_time=0.35)
        punch(self, jev_num, 1.1)
        breathe(self, VGroup(g, jev_num, tag), w("19", scene="s07", default=7.4) - 0.1, amp=0.05)

        llm_bar = bars[1][0]
        self.cue("riser")
        v = ValueTracker(0)
        llm_num = always_redraw(lambda: T("${:.2f}".format(v.get_value()), 110, ACCENT2, display=True).move_to(bars[1][1]))
        self.add(llm_num)
        self.play(llm_bar.animate.stretch_to_fit_height(bars[1][2], about_edge=DOWN), v.animate.set_value(62.99),
                  run_time=1.6, rate_func=rate_functions.ease_out_cubic)
        llm_num.clear_updaters()
        up_to = T("up to", 48, DIM).next_to(llm_num, UP, buff=0.15)
        self.cue("ding"); self.play(FadeIn(up_to, shift=DOWN * 0.2), run_time=0.3)
        breathe(self, VGroup(g, jev_num, llm_num, up_to, tag), w("300", scene="s07", default=9.8) - 0.1, amp=0.05)

        # '300': the ratio lands in JEV's empty column
        x0 = g[0].get_center()[0]
        ratio = VGroup(T("~300x", 120, ACCENT2, display=True), T("more", 52, DIM)).arrange(DOWN, buff=0.2).move_to([x0, 0.4, 0])
        self.cue("ding"); self.play(pop_in(ratio), run_time=0.4)
        breathe(self, VGroup(g, jev_num, llm_num, up_to, tag, ratio), CLIP_LEN - 0.05, amp=0.05)
