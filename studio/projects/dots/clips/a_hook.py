from kit import *

class NightHook(TimedScene):
    def construct(self):
        floor = grid_floor(14, 4.2).move_to(DOWN * 5.0)
        clock = T("3:00 AM", 190, TEXT, display=True).move_to(UP * 4.3)
        clock_glow = glow(clock.copy(), ACCENT, layers=3, opacity=0.10)[0]
        o = orb(0.55, awake=False).move_to([-4.6, -2.6, 0])
        self.add(floor, clock_glow, clock, o)                       # first frame: the 3 AM clock already on screen
        breathe(self, VGroup(clock, clock_glow), w("bug") - 0.15, amp=0.06, period=0.8)
        # the bug report lands
        tag = chip("BUG", DANGER, 48)
        msg = T("Checkout fails on iOS", 58, TEXT)
        card_body = glass_panel(11.4, 2.6)
        VGroup(tag, msg).arrange(RIGHT, buff=0.45).move_to(card_body)
        card = VGroup(card_body, tag, msg).move_to(UP * 1.2)
        src = T("new message · team chat", 42, DIM).next_to(card, DOWN, buff=0.25).align_to(card, LEFT)
        self.cue("pop"); self.play(pop_in(card, shift=DOWN * 0.4), FadeIn(src), run_time=0.45)
        self.until(w("Slack") - 0.1)
        awake = orb(0.55).move_to(o)
        self.cue("tick"); self.play(FadeOut(o), FadeIn(awake), run_time=0.3); o = awake
        wake(self, o, 0.45)
        self.until(w("morning") - 0.1)
        clock2 = T("7:00 AM", 190, ACCENT2, display=True).move_to(clock)
        self.cue("whoosh"); self.play(morph(clock, clock2), clock_glow.animate.set_stroke(ACCENT2), run_time=0.4)
        self.until(w("fix") - 0.1)
        fix = chip("FIX READY", ACCENT2, 56)
        rev = T("Review & approve", 50, TEXT)
        fb = glass_panel(11.4, 2.4, tint=ACCENT2)
        VGroup(fix, rev).arrange(RIGHT, buff=0.45).move_to(fb)
        fixcard = VGroup(fb, fix, rev).move_to(DOWN * 2.9 + RIGHT * 0.9)
        note = T("illustrative", 34, DIM).next_to(fixcard, DOWN, buff=0.3).align_to(fixcard, RIGHT)
        self.cue("ding"); self.play(pop_in(fixcard, shift=UP * 0.5), o.animate.move_to(fixcard.get_left() + LEFT * 0.2 + UP * 1.3).scale(0.8), FadeIn(note), run_time=0.45)
        self.push_in(np.array([0.4, 0.3, 0]), 1.06, 0.45)   # gentle push on the whole layout: clock, card and fix all stay in frame
        self.drift_camera(CLIP_LEN - 0.05 if CLIP_LEN else self.renderer.time + 1.0, dx=0.12, dy=0.06, period=1.0)
