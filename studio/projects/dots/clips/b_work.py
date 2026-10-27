from kit import *

class WorkSpan(TimedScene):
    """span s03–s04: the dot gets its own computer and browser, takes a goal, links apps, hands back a result."""
    def construct(self):
        o = orb(0.9).move_to(UP * 0.4)
        self.add(o)                                                   # first frame: the orb already glowing
        # its own computer + browser arrive at once (no lone-orb opening)
        panel = glass_panel(12.6, 9.6).move_to(DOWN * 0.4)
        tag = hud_tag("its own computer", ACCENT2, 44).next_to(panel, UP, buff=0.35).align_to(panel, LEFT)
        br = browser_window(10.2, 6.6).move_to(panel.get_center() + DOWN * 0.55 + LEFT * 0.35)
        self.cue("whoosh")
        self.play(Create(panel[0]), FadeIn(panel[1]), o.animate.scale(0.55).move_to(panel.get_corner(UR) + LEFT * 0.9 + DOWN * 0.9), run_time=0.5)
        self.play(swing_in(tag), FadeIn(br, shift=LEFT * 0.6), run_time=0.4)
        url = T("checkout · staging", 34, DIM, mono=True).move_to(br[2])
        cursor = Rectangle(width=0.08, height=0.62, fill_color=ACCENT, fill_opacity=1, stroke_width=0).move_to(br.get_left() + RIGHT * 0.9 + UP * 0.6)
        self.play(FadeIn(url), FadeIn(cursor), run_time=0.3)              # the window is never empty
        # a page in the window: the dot is already working on it
        rows = VGroup(*[RoundedRectangle(corner_radius=0.12, width=wd, height=0.42, fill_color=TEXT, fill_opacity=0.16, stroke_width=0)
                        for wd in (6.8, 5.2, 6.0)]).arrange(DOWN, buff=0.38, aligned_edge=LEFT)
        err = chip("iOS checkout: failing", DANGER, 40)
        page = VGroup(rows, err).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(br.get_center() + DOWN * 0.35).align_to(br, LEFT).shift(RIGHT * 0.8)
        self.until(w("computer") - 0.1)
        self.cue("tick")
        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.3) for r in rows], lag_ratio=0.25), cursor.animate.move_to(rows[0].get_right() + RIGHT * 0.15), run_time=0.6)
        self.until(w("browser") - 0.1)
        self.play(cursor.animate.move_to(rows[2].get_right() + RIGHT * 0.15), *[r.animate.set_fill(opacity=0.24) for r in rows], run_time=0.4)
        self.until(w("work") - 0.35)
        self.cue("pop"); self.play(pop_in(err), cursor.animate.move_to(err.get_right() + RIGHT * 0.15), run_time=0.3)
        breathe(self, VGroup(o), w("goal", scene="s04") - 0.45, amp=0.08, period=0.7)
        self.play(FadeOut(page), FadeOut(url), cursor.animate.move_to(br.get_left() + RIGHT * 0.9 + UP * 0.6), run_time=0.25)
        # the goal
        goal = T("Goal: fix the checkout bug", 48, TEXT).move_to(br.get_center() + UP * 0.6)
        if goal.width > br.width * 0.86: goal.scale_to_fit_width(br.width * 0.86)
        self.cue("tick"); self.play(AddTextLetterByLetter(goal, run_time=0.7), cursor.animate.move_to(goal.get_right() + RIGHT * 0.12), rate_func=linear)
        self.until(w("apps", scene="s04") - 0.2)
        # connect the apps (generic tiles) to the orb
        tiles = VGroup(*[app_tile(l, c) for l, c in (("chat", ACCENT2), ("code", ACCENT), ("files", DANGER))]).arrange(RIGHT, buff=0.7)
        tiles.move_to(br.get_center() + DOWN * 1.65)
        links = VGroup(*[Line(o.get_center(), t.get_top(), color=ACCENT, stroke_width=4, stroke_opacity=0.8) for t in tiles])
        for k, (t, l) in enumerate(zip(tiles, links)):
            self.cue("tick"); self.play(pop_in(t, run_time=0.25), Create(l), run_time=0.25)
        self.until(w("results", scene="s04") - 0.15)
        # the result comes back for review
        rc = chip("REVIEW", ACCENT2, 50)
        rt = T("Fix drafted · tests pass", 44, TEXT)
        content = VGroup(rc, rt).arrange(RIGHT, buff=0.4)
        if content.width > br.width * 0.78: content.scale_to_fit_width(br.width * 0.78)   # the result card stays inside the window
        res = glass_panel(content.width + 0.9, 2.1, tint=ACCENT2).move_to(content)
        result = VGroup(res, content).move_to(br.get_center() + DOWN * 0.2)
        note = T("illustrative", 34, DIM).next_to(panel, DOWN, buff=0.25).align_to(panel, RIGHT)
        self.cue("whoosh")
        self.play(FadeIn(result, scale=0.6), br.animate.set_opacity(0.3), FadeOut(tiles), FadeOut(links), FadeOut(goal), FadeOut(cursor), FadeIn(note), run_time=0.55, rate_func=rate_functions.ease_out_back)
        self.until(w("review", scene="s04") - 0.1)
        self.cue("pop"); punch(self, rc)
        end = CLIP_LEN - 0.05 if CLIP_LEN else self.renderer.time + 0.8
        breathe(self, o, end, amp=0.06, period=0.6)
