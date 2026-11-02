# Script review · LFM3 reel

## Script review · 2026-10-29

Inputs: script-reel.md, content-plan.md (ticked ready 2026-10-29), research.md, brief.md, hooks.md, Launch archetype,
style-rules.md, learnings.md, comprehension.md (read-aloud sha1 babb22a10166 = current read-aloud; fresh).
Linter: every script check passes (11 beats, sentences <= 16 words, table = read-aloud 100 %, sources resolve, catch
present and sourced). The failing lint rows are downstream (package.md, storyboard, animation plan, art direction,
publish kit, visual-plan / structure-check) and are not script findings.

```
VERDICT: CHANGES
scores: plan 3 · specific 5 · accurate 3 · clear 3 · value 5 · spoken 5 · match 5 · hook 4 · structure 4 · understood 2
blocking:
- beat 4: "It fills in a calendar action. Your app adds the event." → "[smile] No essay back. It fills in the event's details, like a form, for an app to add." (16 words; Goldfish LOST ME on must-include 1/2: says what the model returns, structured fields, and that an app, not the model, adds the event; S5)
- beat 5: "One point seven billion numbers, four bits each. That's about one gigabyte." → "Why so small? It's 1.7 billion learned numbers. [beat] Four bits each: about one gigabyte." (16 words; Goldfish LOST ME on must-include 3: "learned" says what the numbers are, and the two ideas get two sentences; S2, S3)
- beat 6: "On Liquid's own test of exactly that, it outscores a model about five times its size." → "On Liquid's own numbers, it outscores Qwen at actions. And Qwen's about five times bigger." (15 words; BFCL V4 is a public tool-calling benchmark, not Liquid's test: the scores are Liquid's, so "own numbers" is accurate; "exactly that" pointed back past the size beat; names the bigger model; S6)
- beat 7: "The catch? On knowledge questions, that bigger model wins." → "[slow down] The catch? On knowledge questions, Qwen wins." (7 words; resolves the unnamed "that bigger model"; S6 GPQA 63 vs 80)
- beat 8: "Liquid says skip LFM3 for coding agents. For facts, pair it with search." → "Liquid says LFM3's too small for coding agents or long reasoning. For facts, add search." (15 words; must-include 6 omitted "complex multi-step reasoning"; Goldfish asked why, and S7 gives the reason: "due to its small size"; S7, S8)
- beat 10: "Great for small actions. Not a know-it-all." → "Great for small actions on your own laptop. Not a know-it-all." (12 words; the Goldfish TAKEAWAY dropped "on your own laptop", which is part of the core message; the verdict should restate it; S3, S15)
improve:
- beat 2: "It turns requests into actions." → "LFM3 is a new open model from Liquid AI. It's built to turn requests into actions." (15 words, same count; S5 says "designed for" tool calling and structured output, so frame it as design intent, not a claim we tested)
- header and times: the header says 140 words, 51 s at ÷2.7. The linter counts 142, and the house pace is 2.3 w/s, so it runs about 62 s. With the fixes above it's about 147 words, about 64 s. That's over the plan's 40–50 s and the Launch sheet's 35–55 s, and the 15–16-word beats run about 7 s, not 6. Restate the runtime at 2.3 w/s and re-time the table. If it has to be shorter, cut "Why so small?" (beat 5, -3) or "Give it this:" (beat 3, -3) first.
- pronunciation notes: add "Qwen = 'chwen'" and put Qwen in `names` so the caption is spelled right; the VS beats show "Qwen3.5-9B" on screen.
```

### Notes for the scripter
- What the screen carries vs the voice: the add_event fields, the full `ollama run hf.co/...` command and "Qwen3.5-9B"
  can stay on screen only. The Goldfish's question "what is the one line?" is answered by the [TERMINAL] beat. Its
  "which fields?" question is answered by the [ANIMATE] beat, as long as beat 4 says "like a form" so the viewer
  knows to look for fields. The bigger model still needs a spoken name. The catch beat has to point at something the
  viewer heard, and one word ("Qwen") does it more cheaply than "that bigger model".
- Visual plan (not a script finding): beat 6's on-screen text says "tool calling: 71 vs 63", but the spoken word is now
  "actions". Use "actions (tool calling) · 71 vs 63 · Liquid's numbers" so the screen and voice share the word and the
  self-reported label appears.
- Unchanged and fine: the hook (true, illustrative, paid off by beats 3–4), "about one gigabyte" (S3), the Ollama line
  and "your prompts stay on your laptop" (S9, S15, plan wording), the generic CTA, no banned wording ("free",
  "offline", "beats Qwen 9B", "just one gigabyte").
- After the edits the read-aloud changes: re-run `script-comprehension`, save `comprehension.md` with the new sha1,
  then re-run this review.


## Script review · 2026-10-29 (re-review, read-aloud sha1 f6e78500dc31)

Inputs: the revised script-reel.md (147 words, about 63 s at 2.3 w/s), and a comprehension.md whose sha1 matches the
current read-aloud. Linter: every script check passes. The first review's six blocking items are fixed: beat 4 says
"like a form, for your app to add", beat 5 says "learned numbers", beat 7 names Qwen, beat 8 includes long reasoning,
and beat 10 says "on your laptop". Beat 6 no longer says "Liquid's own test". The Goldfish now remembers all six
must-includes in order, and both WHAT IT IS and WHY I'D CARE are said. Its TAKEAWAY matches the core message in
meaning: about 1 GB, open, messy text into actions, not a know-it-all. "On your own laptop" is in WHY I'D CARE.

```
VERDICT: CHANGES
scores: plan 4 · specific 5 · accurate 3 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 3
blocking:
- beat 6: "By Liquid's own scores, it beats Qwen, an open model about five times bigger, at actions." → "By Liquid's own scores, it beats Qwen, a model about five times bigger, on action tasks." (16 words; "open" about Qwen3.5-9B has no source in research.md: S6 gives only its scores. Either drop "open" or add a source for Qwen's licence to research.md. "On action tasks" answers the Goldfish's "at actions is vague". "Beats" is fine here because it carries both qualifiers, Liquid's own scores and one task type, as the plan requires; S6)
- beat 8: "For facts, add search." → "Liquid says LFM3's too small for coding agents or long reasoning. For facts, let it search." (16 words; Goldfish LOST ME on must-include 6: "add search" didn't say who searches. "Let it search" says the model looks things up; S7 "use retrieval or search")
- beat 9: "One line, and your prompts stay on your laptop." → "[excited] Got Ollama, the local model app? One terminal command, and your prompts stay on your laptop." (16 words; Goldfish LOST ME on must-include 5: "one line of what?". The [TERMINAL] beat shows the command itself, so the voice only needs to say what kind of line it is; S9, S15)
improve:
- beat 5: "It has one point seven billion learned numbers. Four bits each. About one gigabyte." → "LFM3 has one point seven billion learned numbers. Each takes four bits: about one gigabyte." (15 words; captions shouldn't open on a bare "It", and this replaces two list fragments with one spoken sentence. The Goldfish understood it, but only because the gigabyte followed)
- beat 1 (hook): the Goldfish found three fragments too cryptic as an opener. The first frame (bubble, arrow, calendar card, "~1 GB" chip) carries it on mute, so keep H1 if the storyboard delivers that frame. If not: "One messy text becomes one calendar event, on an AI that needs about one gigabyte." (15 words)
- runtime: with these fixes it's about 150 words, about 65 s at 2.3 w/s. brief.md now says ~60 s, but content-plan.md still says 40–50 s (Downstream notes). Have the content-plan agent update that line so the two agree, and update the header word count.
```

Not findings: the Goldfish's questions about JSON (the add_event fields on screen), the exact command (the [TERMINAL]
beat) and laptop speed (the plan leaves speed out on purpose) are answered by the screen or deliberately left out.
After these three edits, re-run script-comprehension (the sha1 will change), then re-run this review.


## Script review · 2026-10-29 (re-review 2, read-aloud sha1 6ae063073314)

Inputs: the revised script-reel.md (150 words, about 65 s at 2.3 w/s; content-plan.md and brief.md now agree on that
runtime) and a comprehension.md whose sha1 matches the current read-aloud. Linter: every script check passes. All three
blocking items from re-review 1 are applied exactly, plus the beat 5 improvement. Hook H1 is kept, and its frame 0 in
hooks.md and animation-plan.md carries the claim on mute.

Goldfish check against the plan:
- **Takeaway:** matches the core message in meaning (small open model, about 1 GB, messy text into a structured
  action, weak on knowledge). WHAT IT IS and WHY I'D CARE are both said, and "on my own laptop" is in WHY I'D CARE.
- **Remembered:** all six must-includes, in order.
- **Lost me:** none of the four items blocks a must-include point. The bits sentence was accepted ("learned numbers
  works"). Qwen and "action tasks" were both understood well enough to remember point 4. "Let it search" was
  remembered, and the open question is how to set it up, which is beyond the reel's scope.
- **Questions left:** the command and the output format are on screen (the [TERMINAL] beat and the add_event fields).
  "Is it free?" was never promised, and the plan bans "free".

Accuracy re-checked: beat 5 (1.73B x 4 bits is about 0.87 GB; S3 says "about 1 GB"), beat 6 (BFCL 71 vs 63,
self-reported, about 5.2x; "beats" carries both qualifiers), beat 8 (S7 "due to its small size", "retrieval or search"),
and beat 9 (S9, S15). No banned wording appears.

```
VERDICT: PASS
scores: plan 5 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 4 · match 5 · hook 4 · structure 4 · understood 4
blocking:
- none
improve:
- beat 8: "For facts, let it search." → "For facts, hook up search." (16 words for the beat; says that you connect the search, which answers the Goldfish's "does LFM3 do it by itself?"; S7)
- beat 6: "by Liquid's own scores" stays the only self-reported label in the voice, so the [VS] screen should keep "Liquid's numbers" next to 71 vs 63 and 63 vs 80 (visual plan)
- table times end at 63 s, but 150 words at 2.3 w/s comes to about 65 s; the voice step will re-time it, and beats of 15–16 words will run about 7 s
```

- [x] Script review passed (2026-10-29)
