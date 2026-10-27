import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *

class GateSpan(TimedScene):
    """span A (s03-s04): ticket #4821 SLIDES IN and TYPES on; the gate GLOWS ON; the ticket SLIDES INTO the gate,
    a beam SCANS, three answer chips SPLIT out and LIGHT UP on 'Billing', 'Urgent', 'High'."""
    def construct(self):
        gate, spin = decision_gate(1.75)
        gate.move_to(UP * 4.0)
        panel = glass_panel(12.2, 4.6, tint=TEXT)
        tag = hud_tag("TICKET #4821", ACCENT2, 46)
        lines = VGroup(*[T(l, 62, TEXT) for l in TICKET]).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        card = VGroup(panel, tag, lines)
        tag.move_to(panel.get_corner(UL) + RIGHT * (tag.width / 2 + 0.45) + DOWN * 0.65)
        lines.next_to(tag, DOWN, buff=0.45, aligned_edge=LEFT)
        fit(card, 0.9); card.move_to(DOWN * 1.6)
        illus = T("illustrative", 36, DIM).move_to(DOWN * 6.2 + RIGHT * 4.6)
        # s03: the ticket arrives, the gate powers on
        self.add(illus)
        self.cue("whoosh")
        self.play(FadeIn(VGroup(panel, tag), shift=RIGHT * 3), run_time=0.5, rate_func=rate_functions.ease_out_cubic)
        self.until(w("ticket", scene="s03") - 0.1)
        self.cue("pop"); self.play(pop_in(gate), run_time=0.45)
        self.until(w("charged", scene="s03") - 0.1)
        self.play(AddTextLetterByLetter(lines[0]), run_time=0.7)
        self.until(w("refund", scene="s03") - 0.1)
        self.play(AddTextLetterByLetter(lines[1]), run_time=0.75)
        self.until(at("s04") - 0.02)
        # s04: one pass through the gate
        self.cue("whoosh")
        self.play(card.animate.scale(0.18).move_to(gate.get_center()).set_opacity(0), run_time=0.45, rate_func=rate_functions.ease_in_cubic)
        self.remove(card)
        flash = Circle(radius=1.75, color=WHITE, stroke_width=14).move_to(gate)
        self.add(flash); self.play(flash.animate.scale(1.5).set_opacity(0), run_time=0.35)
        self.remove(flash)
        cols = [ACCENT2, ACCENT, DANGER]
        chips = [chip(t, c, 66) for (t, _), c in zip(ANSWERS, cols)]
        ys = [0.2, -1.9, -4.0]
        for ch, y in zip(chips, ys): ch.move_to([0, y, 0])
        beams = [Line(gate.get_bottom(), ch.get_top(), color=c, stroke_width=4, stroke_opacity=0.55) for ch, c in zip(chips, cols)]
        for (txt, word), ch, bm in zip(ANSWERS, chips, beams):
            self.until(w(word, scene="s04") - 0.12)
            start = ch.copy().scale(0.3).move_to(gate.get_center()).set_opacity(0)
            self.cue("pop")
            self.play(Create(bm), Transform(start, ch), run_time=0.38, rate_func=rate_functions.ease_out_back)
            self.remove(start); self.add(ch)
        self.play(*[FadeOut(b) for b in beams], run_time=0.3)
        breathe(self, VGroup(*chips), CLIP_LEN - 0.05, amp=0.06)
