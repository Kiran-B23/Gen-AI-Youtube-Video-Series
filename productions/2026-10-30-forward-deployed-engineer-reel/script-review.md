# Script review · Forward Deployed Engineer (reel)

## Script review · 2026-10-30

Inputs: script-reel.md, content-plan.md (ticked ready 2026-10-30), research.md, brief.md, hooks.md, comprehension.md
(read-aloud sha1 c21b3327c61f = current read-aloud, run 2). Linter script checks: one ✗ ("sentences ≤ 16 words", beat 7,
17 words; the table's word count says 16). Read-aloud today: 198 words, about 93 s at 2.3 w/s + 0.4 s per beat (plan
range 170–195 words, 75–90 s; hard ceiling 200).

```
VERDICT: CHANGES
scores: plan 4 · specific 5 · accurate 4 · clear 3 · value 5 · spoken 4 · match 5 · hook 4 · structure 5 · understood 4
blocking:
- beat 7: "Then they connect it to the PDFs and the old system, and test it on real claims." → "Then they connect the assistant to the PDFs and the old system. They test it on real claims." (linter ✗: 17-word sentence carrying two steps; Goldfish LOST ME "two connections plus testing all at once"; S2 deliverables, S3 eval-driven feedback). On screen unchanged.
- hooks.md line 14: "The role's name and the "fastest-growing" stake land in the next line (2–6 s), so the topic is named before the viewer can swipe." → "The role's name lands at beat 4 (~20 s), after the broken example; the demand stake (over 1,000 %, against 13 % for tech jobs) lands at the re-hook at ~55 s." ("fastest" is on the plan's claim-safety ban list and its grep list includes hooks.md; the timing claim is also false for this script; S4)
improve:
- beat 3: "Claims sit in an old system it can't reach." → "Claims sit in an old system the assistant can't reach." (Goldfish LOST ME: unclear "it"; style rule: name the thing; +1 word)
- beat 12: "Is it for you? Two big hirers, Palantir and Anthropic, both expect a quarter to half your time travelling." → "Is it for you? Palantir and Anthropic hire them. Both expect you to travel a quarter to half your time." (Goldfish LOST ME: two names plus a fraction in one breath, fraction heard before "travelling"; travel now comes before the range; S1 "Expect 25–50% travel", S2 "Travel frequently (25-50%)", S4 hirers; +1 word)
- beat 13: "And the bar varies: six months' experience at Palantir, four years at Anthropic." → "And the bar varies. Palantir asks for six months' experience. Anthropic, four years." On screen "6 MONTHS ↔ 4 YEARS" → "PALANTIR 6 MONTHS ↔ ANTHROPIC 4 YEARS". (Goldfish LOST ME: which number goes with which company; company first fixes the mapping; S1 6+ months post-college, S2 4+ years; same 13 words)
- beat 15: "Then explain it to someone who doesn't code." → "Then explain it to a non-coder." (pays for the +2 above; keeps the read-aloud at 199 ≤ 200; S2 "technical, customer-facing")
- header + footer: "Est. runtime: ~88 s" / "~91 s" → recompute after the edits (199 words ≈ 93 s at 2.3 w/s + 0.4 s × 17 beats) and fix beat 7's word count (17 → 11 + 6). The plan asks for 170–195 words; if the voice pace gate needs room, the next trim is beat 2 "Take an insurance company's claims assistant." → "Say, an insurer's claims assistant." (-1).
- hooks.md line 16 "the engineer moves in" → "the engineer joins the claims team"; brief.md line 13 "The FDE moves in" → "The FDE sits with the claims team" (plan claim safety: "moves in" is unsafe as literal; grep the whole folder, LangGraph lesson).
- QUESTIONS LEFT "over a thousand percent from what?": no script change; the publish kit's description must name Lightcast via Fortune and the Jan–Aug 2026 vs Jan–Aug 2025 window (S4).
```

**Proposed read-aloud after the edits (199 words; verify with the linter):**

This AI assistant works in the demo. Inside a real company, it breaks. / Take an insurance company's claims assistant. /
Inside, the policies are scanned PDFs. Claims sit in an old system the assistant can't reach. / The model's fine. Nobody
connected it. That's the job of a forward deployed engineer. / They work inside the customer's company, writing the code
that makes the AI work there. / First, they sit with the claims team and find the real blocker. / Then they connect the
assistant to the PDFs and the old system. They test it on real claims. / They ship it. Now it answers inside the company.
/ And they tell the product team where the model fell short. / Why care? Job posts for this role rose over a thousand
percent this year. / Tech jobs overall? Up thirteen percent. / Is it for you? Palantir and Anthropic hire them. Both
expect you to travel a quarter to half your time. / And the bar varies. Palantir asks for six months' experience.
Anthropic, four years. / Want in? Build a small AI app on messy PDFs. / Test its answers. Then explain it to a
non-coder. / That's the job: find, build, ship, report back. / What should I explain next?

**What passed:** core message said in meaning (beats 4–5) and the Goldfish's TAKEAWAY matches it; all six must-includes
are in REMEMBERED; the catch (travel + bar) is present, calm and worded as the plan's safe wording; nothing from "leave
out" (no salary, no 25/50/25 split, no India 19×, no "invented"); every number sourced; table = read-aloud 100 %; hook is
illustrative and paid off at beat 8; CTA is channel-generic; three mechanism steps (archetype max).

**Next:** apply the edits in table and read-aloud together, then re-run `script-comprehension` (the read-aloud sha1
will change), then re-run this review.

_Round 1 result: CHANGES (superseded by round 2 below)._

## Script review · 2026-10-30 (round 2)

Inputs: script-reel.md after the round-1 rewrites (199 words, ~93 s), content-plan.md, research.md, brief.md, hooks.md,
comprehension.md run 3 (read-aloud sha1 7a3afa8f338a = `--read-aloud-sha1`). Linter script checks: all ✓ (sentences ≤ 16
words ok, table = read-aloud 100 %, absolutes and numbers sourced, planned catch present). Grep for the plan's banned
wordings ("moves in", "fastest", "hottest", "every", "only", "invented", "$"): clean in script, hooks, brief, research;
remaining hits are the plan's own ban list and quoted competitor titles in inspiration.md.

```
VERDICT: PASS
scores: plan 4 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 5 · match 5 · hook 5 · structure 5 · understood 4
blocking:
- none
improve:
- beat 9: "And they tell the product team where the model fell short." → "And they tell their own product team where the model fell short." (Goldfish LOST ME: unsure whose product team; S3 "shows Research and Product where models succeed and where they fall short"; +1 word → 200, at the ceiling). Optional: if applied, the read-aloud sha1 changes, so re-run script-comprehension before the voice step.
- beat 12 (visual, no word change): put "TRAVEL · 25–50 % OF YOUR TIME" as one giant number on the word "travel", then swap to the 6 MONTHS ↔ 4 YEARS split on beat 13 (Goldfish: the travel fraction "only half stuck" among four numbers; S1, S2). For the visual-plan agent.
- header: re-hook times say ~17 s / ~52 s / ~60 s; the table now has beat 4 at 16 s, beat 10 at 53 s, beat 12 at 63 s. Update the line. At 199 words / ~93 s the script is above the plan's 170–195-word, 75–90 s range (within the 200 ceiling): if the voice pace gate fails, trim beat 2 to "Say, an insurer's claims assistant." before slowing anything.
```

**Understood (Goldfish run 3) vs the plan:** TAKEAWAY says the core message in meaning (works inside the customer's
company, makes the AI work there); WHAT IT IS and WHY I'D CARE are said; all six must-includes are in REMEMBERED
(definition, why it exists, find/build/ship+feed back, 1,000 % vs 13 %, travel + 6 months vs 4 years, the three practice
items). The four LOST ME items are not on terms the core depends on: the meaning of the phrase "forward deployed"
(etymology; the plan leaves the military origin out), what Palantir is (named only as a hirer), the travel fraction
(remembered in REMEMBERED 5), and whose product team (improve above). QUESTIONS LEFT (vs software/solutions engineer,
which skills, India/freshers, the base of 1,000 %) were not promised by the video; the plan leaves the comparison and
India data out. The publish kit's description should name Lightcast via Fortune with the Jan–Aug 2026 vs 2025 window
(S4). ONE-LISTEN RISK medium, not high.

**Outside the script (not scored here):** the linter's "hooks scored (≥5, pick ≥16)" counts only 3 of the 6 rows in
hooks.md (rows 1, 5 and 6 carry bold or trailing notes in the Total cell); put the notes in a separate column so the
check parses. The animation plan, art direction, storyboard, package.md and publish sources are the next stages' gates.

- [x] Script review passed (2026-10-30)
