import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *

class RouteSpan(TimedScene):
    """span B (s10-s11): tickets SLIDE into the gate; the gate ROUTES confident ones (mint) to DONE and unsure ones (pink)
    to the LLM panel, which PULSES; then the lanes dim and two readouts COUNT UP: 99.6% accuracy kept, 47% of the cost."""
    def construct(self):
        gate, spin = decision_gate(1.45)
        gate.move_to(UP * 3.9)
        done = VGroup(glass_panel(4.6, 2.3, tint=OK), T("DONE", 64, OK, display=True))
        llm = VGroup(glass_panel(4.6, 2.3, tint=DANGER), T("LLM", 64, DANGER, display=True))
        done.move_to([3.9, -1.0, 0]); llm.move_to([-3.9, -1.0, 0])
        l_ok = Line(gate.get_bottom() + RIGHT * 0.4, done.get_top(), color=OK, stroke_width=6, stroke_opacity=0.7)
        l_no = Line(gate.get_bottom() + LEFT * 0.4, llm.get_top(), color=DANGER, stroke_width=6, stroke_opacity=0.7)
        t_ok = T("CONFIDENT", 46, OK, mono=True).next_to(done, DOWN, buff=0.35)
        t_no = T("UNSURE", 46, DANGER, mono=True).next_to(llm, DOWN, buff=0.35)
        self.play(pop_in(gate), run_time=0.45)
        self.until(w("both", scene="s10") - 0.1)
        self.cue("whoosh")
        self.play(Create(l_ok), Create(l_no), FadeIn(done, shift=LEFT * 0.6), FadeIn(llm, shift=RIGHT * 0.6), run_time=0.5)
        ring = gate[0]
        def send(label, ok, run=0.55):
            # the ticket drops onto the ring's top edge, the ring flashes, and the ticket leaves from its bottom edge:
            # it passes "through" the gate without ever covering the JEV label
            col = OK if ok else DANGER
            c = chip(label, col, 46).move_to(gate.get_top() + UP * 1.9).set_opacity(0)
            self.add(c)
            self.play(c.animate.move_to(gate.get_top() + UP * 0.55).set_opacity(1), run_time=0.25, rate_func=rate_functions.ease_in_quad)
            c2 = c.copy().move_to(gate.get_bottom() + DOWN * 0.55)
            self.play(FadeOut(c, shift=DOWN * 0.3), FadeIn(c2, shift=DOWN * 0.3), ring.animate.set_color(col), run_time=0.14)
            dest = done if ok else llm
            self.cue("pop")
            self.play(c2.animate.move_to(dest.get_center()).scale(0.7).set_opacity(0), ring.animate.set_color(ACCENT),
                      run_time=run, rate_func=rate_functions.ease_in_out_cubic)
            self.remove(c, c2)
        self.until(w("confident", scene="s10") - 0.35)
        self.play(FadeIn(t_ok, shift=UP * 0.2), run_time=0.25)
        send("#4821", True)
        self.until(w("unsure", scene="s10") - 0.35)
        self.play(FadeIn(t_no, shift=UP * 0.2), run_time=0.25)
        send("#4822", False)
        self.until(w("LLM", scene="s10", default=4.9) - 0.05)
        self.cue("ding"); punch(self, llm, 1.12)
        while self.renderer.time + 1.0 < at("s11") - 0.1:
            send("#48" + str(23 + int(self.renderer.time * 10) % 70), True, 0.45)
        self.until(at("s11") - 0.02)
        # s11: the result
        # the routing diagram stays readable as context (half strength, never near-invisible)
        lanes = VGroup(gate, done, llm, l_ok, l_no, t_ok, t_no)
        lanes.generate_target(); lanes.target.scale(0.62).move_to(UP * 3.6)
        for m in lanes.target.family_members_with_points():   # leaves only: a group-level set_fill would compound the factor
            m.set_stroke(opacity=m.get_stroke_opacity() * 0.55, family=False); m.set_fill(opacity=m.get_fill_opacity() * 0.55, family=False)
        self.play(MoveToTarget(lanes), run_time=0.5)
        # each result card arrives WITH its number (no empty box, no 0% frame); the first sits centred until the second joins
        p1 = glass_panel(6.2, 4.2, tint=OK).move_to([0, -3.0, 0]); p2 = glass_panel(6.2, 4.2, tint=ACCENT).move_to([3.4, -3.0, 0])
        c1 = T("of GPT-6's accuracy", 44, TEXT).move_to(p1.get_bottom() + UP * 0.75)
        c2 = T("of its cost", 44, TEXT).move_to(p2.get_bottom() + UP * 0.75)
        breathe(self, lanes, w("almost", scene="s11", default=at("s11") + 2.0) - 0.45, amp=0.05, period=0.9)
        self.until(w("almost", scene="s11", default=at("s11") + 2.0) - 0.45)
        self.cue("pop"); self.play(pop_in(VGroup(p1, c1)), run_time=0.3)
        n1 = decimal_count(self, 99.6, p1.get_center() + UP * 0.45, "{:.1f}", suffix="%", size=130, color=OK, run_time=0.8, start=80)
        card1 = VGroup(p1, c1, n1)
        breathe(self, VGroup(card1, lanes), w("half", scene="s11", default=at("s11") + 5.4) - 0.45, amp=0.04)
        self.play(card1.animate.move_to([-3.4, card1.get_center()[1], 0]), FadeIn(VGroup(p2, c2), shift=LEFT * 0.6), run_time=0.35)
        n2 = decimal_count(self, 47, p2.get_center() + UP * 0.45, "{:.0f}", suffix="%", size=130, color=ACCENT, run_time=0.5, start=30)
        self.cue("ding")
        breathe(self, VGroup(card1, p2, n2, c2), CLIP_LEN - 0.05, amp=0.05)
