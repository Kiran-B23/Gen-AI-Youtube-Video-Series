from kit import *

class MemorySpan(TimedScene):
    """span s08–s09: links and memories; disconnecting an app keeps the memories; only a reset (delete) clears them."""
    def construct(self):
        o = orb(1.0).move_to([-3.2, 3.2, 0])
        tiles = VGroup(*[app_tile(l, c, 1.8) for l, c in (("mail", ACCENT2), ("files", ACCENT), ("code", ACCENT2))]).arrange(DOWN, buff=0.9).move_to([4.3, 1.0, 0])
        links = VGroup(*[Line(o.get_right(), t.get_left(), color=ACCENT2, stroke_width=5, stroke_opacity=0.8) for t in tiles])
        self.add(links, o, tiles)                                     # first frame: the dot linked to three apps
        mem_title = T("what it learned", 46, DIM).move_to([-3.2, 1.3, 0])
        mems = VGroup(*[chip(s, ACCENT, 46) for s in ("client names", "your schedule", "repo notes")]).arrange(DOWN, buff=0.45).next_to(mem_title, DOWN, buff=0.4)
        self.play(FadeIn(mem_title), run_time=0.2)
        for m in mems:
            self.cue("tick"); self.play(pop_in(m, shift=UP * 0.3, run_time=0.22))
        breathe(self, o, w("Disconnect") - 0.15, amp=0.08, period=0.6)
        # disconnect one app: the link snaps, the tile dims
        cut_pt = links[0].point_from_proportion(0.5)
        flash = Cross(scale_factor=0.35, stroke_color=DANGER, stroke_width=10).move_to(cut_pt)
        self.cue("stamp"); self.play(FadeIn(flash, scale=1.6), run_time=0.2)
        off = hud_tag("disconnected", DANGER, 46).next_to(tiles[0], UP, buff=0.35)
        self.play(FadeOut(links[0], shift=DOWN * 0.2), tiles[0].animate.set_opacity(0.3), FadeOut(flash), swing_in(off), run_time=0.4)
        breathe(self, o, w("already") - 0.1, amp=0.08, period=0.6)
        # "what your dot already learned": the memories light up one by one
        self.cue("tick")
        self.play(LaggedStart(*[m.animate(rate_func=there_and_back).scale(1.12) for m in mems], lag_ratio=0.35), mem_title.animate.set_color(TEXT), run_time=0.8)
        self.until(w("stays") - 0.15)
        # ...but the memories stay
        stay = hud_tag("memories stay", ACCENT, 44).next_to(mems, DOWN, buff=0.45)
        self.cue("ding"); self.play(*[m.animate.scale(1.08) for m in mems], FadeIn(stay, shift=UP * 0.2), run_time=0.2)
        self.play(*[m.animate.scale(1 / 1.08) for m in mems], run_time=0.25, rate_func=rate_functions.ease_out_back)
        breathe(self, VGroup(mems, stay), w("wipe", scene="s09") - 0.2, amp=0.06, period=0.6)
        # the only way to wipe it: delete the whole dot
        reset = chip("RESET", DANGER, 56).move_to([4.3, -5.2, 0])
        self.cue("pop"); self.play(pop_in(reset, shift=UP * 0.3), run_time=0.3)
        self.until(w("deleting", scene="s09") - 0.1)
        everything = VGroup(o, tiles, links[1:], mems, mem_title, stay, off)
        self.cue("riser")
        self.play(*[FadeOut(m, scale=0.2, target_position=o.get_center()) for m in everything], FadeOut(reset), run_time=0.6, rate_func=rate_functions.ease_in_cubic)
        final = fit(T("reset = delete the dot", 104, TEXT, display=True)).move_to(UP * 0.6)
        sub = T("chats, memories, tasks: all gone", 46, DIM).next_to(final, DOWN, buff=0.4)
        self.cue("stamp"); self.play(pop_in(final), FadeIn(sub, shift=UP * 0.2), run_time=0.4)
        end = CLIP_LEN - 0.05 if CLIP_LEN else self.renderer.time + 0.8
        breathe(self, VGroup(final, sub), end, amp=0.05, period=0.6)
