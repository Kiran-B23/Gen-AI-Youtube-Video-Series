# Learnings log (read first, every run)

Add a dated entry whenever the user reviews a package or shares results.
Format: `## YYYY-MM-DD · <topic>` → **Worked** / **Didn't** / **Rule change**.

## 2026-10-01 · Seed lessons from earlier Jev / Laya / Dots work
**Worked**
- One running example followed through the whole video (the "I was charged twice" ticket; the reference reel's "Tokenization matters.").
- Visuals that literally show the mechanism (token-by-token loop vs one pass; myth → fact flip card).
- Honest catch + source pills built trust; the user liked the "verdict" framing.
- Interactive beats: numbered poll ("which would you pick?"), "save this", comment question; loop ending.

**Didn't**
- Robotic / flat TTS voices: the user wants an enthusiastic real-creator delivery (human or premium voice).
- Trivia (launch date, venue, "by <company>") felt like filler.
- Numbered "Step 1, Step 2" on a news/tool topic felt forced; steps only suit "how does X work".
- Colour-flickering captions and tight padding looked cheap; calmer captions with generous margins are preferred.

**Rule change**
- These are encoded in `style-rules.md`.

## 2026-10-09 · Structure per topic type + real YouTube analysis
**Rule change**
- One generic beat list didn't fit every topic (user: "making it generic won't fulfill all the topics").
  Every script now follows one of 9 archetypes (`archetypes/`), each with its own beats, hooks, tone and must-haves.
- Inspiration now comes from YouTube itself: `yt_research.py` ranks by reach (views/day, outlier, engagement),
  "watches" the winners and the low performers, and the findings choose the archetype, hook and pace
  (user: "go to youtube and search, view, understand and analyse … which ones got the huge reach").
- Every script beat carries a visual tag, so `/video-studio` can build scenes directly from the script.

## 2026-10-09 · Tokenization reel (script review)
**Didn't:** v1 opened straight on the reveal ("strawberry is one number") without the basics.
**User:** "May be it should start with computers and how they read text, then to tokens then to tokenization."
**Rule change:** for Concept topics, build up from the foundation the viewer already half-knows (how
computers handle it) → why that isn't enough → the concept → the reveal. Added as the concept archetype's
**foundation-first variant**. Keep a paradox hook about the foundation in the first line.

## 2026-10-09 · Tokenization Short vs the reference reel and the YouTube winners (v2 → v3)
Measured side by side: ours 58 s · 2.34 words/s · 37% of seconds with no motion · one dark background throughout;
the reference reel 194 s · 2.25 w/s · 28% still · colour-blocked sections · "Step 02/06" counters · a recap card;
the winning Shorts 3.0–3.2 w/s, opening on a paradox or a live AI failure.
**Worked (keep):** under 60 s; the right depth; real token IDs; the language-cost point; the honest catch; a practical fix.
**Didn't:**
1. The hook echoed the reference's own line ("…only reads numbers"). Too close.
2. A weak first frame (a cursor in a dark box).
3. Visuals boxed in a small card instead of using the full screen.
4. The same background for 58 s, and token chips repeated three scenes in a row.
5. Slow (2.34 w/s; the voice ran 57.5 s against a 51 s estimate, plus up to 1 s silences at scene starts).
6. No progress markers and no recap card.
7. "6 vs 10 tokens" shown as small card text.
8. 37% of seconds with no motion.
9. Tiny source labels.
**Rule changes (encoded in style-rules.md, the scene catalog and the engine):**
- **Open on the failure, or a striking visual that works on mute.** The first frame carries big text or the
  failing answer, never an empty or near-empty screen. Check every hook against the user's reference lines.
- **Colour-block the sections** (`section` per scene: dark / blue / light / yellow). A new colour at each
  section break is the pattern break.
- **Full-screen visuals:** media scenes fill the frame, with no card. Text in clips is at least as big as the captions.
- **A progress tracker** for multi-step explanations (`steps` + `step` per scene).
- **A recap card** before the CTA for any explanation (`recap` scene). It makes people save the video.
- **Head-to-head numbers are giant** (`duel` scene), never list text.
- **Visual metaphors over repeated chips:** at most 2 consecutive scenes in the same visual form.
- **Pace target ~3.0 words/s:** voice style asks for a brisk delivery; scene starts are trimmed to the first word.

## 2026-10-09 · Tokenization v4: art direction + real motion graphics
**User:** "I think the theme used from the reference right? You do not need to use the same theme… there are no
visualization or motion graphical like content which is the core of the reference reels."
**Didn't:** v3 copied the reference reel's palette and still played as a series of cards (appear, one reveal, cut).
**Rule changes:**
- A new **art-direction stage** (`art-direction.md`): the metaphor, a running object, a palette from the concept,
  motion verbs, continuous spans, transitions and music. A light shared brand layer lives in `brand.md`; the user
  chose per-concept looks plus a light brand.
- **Continuous spans** (one animation across several voice lines), **transparent clips**, **section wipes**,
  **sound cues** on every visual event, and a CC0 music library.
- Reusable motion lives in `studio/tools/manim_lib/motion_kit.py`; projects hold only data and choreography
  (user: "make sure it works for future projects").
- Reels can run to **3 min** when the content needs it, with re-hooks every 30–40 s.

## 2026-10-09 · Tokenization v4 polish review (user)
**User:** "I'm still seeing sources, captions are pretty high and the letters boxes are overlapping one on another.
Along with these the visuals and motions are pretty average…"
**Rule changes:**
- **No sources on screen, ever.** Description / pinned comment only. ("illustrative" on mock UIs stays.)
- **Captions low:** 81–90% of the height.
- **No touching boxes:** layouts space by real widths; the clip build prints OVERLAP warnings that must be zero.
- **Review at the right density:** a frame every 1.5 s hides overlaps and glitches; check transitions at 0.25 s and
  read the overlap guard, not just the contact sheet.
- The bar is "would someone stop scrolling for this", not "is it technically correct". Visual ambition (illustration,
  depth, camera moves, secondary motion) is part of the definition of done.

## 2026-10-09 · Theme direction (user)
**User:** "ensure that the theme should modern and futuristic rather than old and kids centric".
**Didn't:** the v4 kitchen world (cream board, cartoon strawberry, wooden shelf) read as a children's explainer.
**Rule:** the channel aesthetic is modern/futuristic tech (dark saturated bases, electric accents, glass, glow, HUD tags,
scan beams). Metaphors stay, but are drawn as technology. Encoded in brand.md, style-rules.md and the art-direction template.

## 2026-10-09 · The reference reel is the house benchmark (user)
**User:** "The explanation, detailing, voice and visualisation can be taken from the reference tokenization reel which is
generated using Opus 5.5 for all the future reels."
**Rule:** `references/tokenization-reel.mp4` is first-party, so its depth (every step on one running sentence, step
counters, recap), its voice (calm, clear, ~2.3 w/s) and its visualisation approach are the default for all reels.
Palette stays per-video and modern/futuristic (the user's later instruction). Encoded in brand.md / style-rules.md / formats.md.

## 2026-10-09 · v6 at benchmark depth; generic CTA (user)
**User:** "re-script tokenization at the reference's depth as v6. Also we are not only breaking the words, so remove it at the end."
**Rule:** CTAs are channel-generic ("What should I explain next?"); never imply a niche like "which word should I break
down". v6 is the first reel written to the benchmark: ~2:20, five numbered steps on one running sentence, the
in-context vs standalone split, IDs as row numbers, tokenizers differ, honest limits, recap.

## 2026-10-11 · Watch every video end to end (user)
**User:** "Did you reviewed the shorts?" … "make sure to watch end to end".
**Rule:** a review means every half-second of the render, not one frame per scene. `tools/run.sh <slug> watch` writes
2 fps contact sheets (`out/watch/`) and a transcript check (unclear words, pauses, pace); read every sheet before
saying a video is reviewed (video-studio gate 2b). The first full watch of jev-reel / laya / dots found what the
per-scene sheet missed: counters showing "0" before their word (now hidden until the beat in assemble.py), a zoom
pushing numbers off-screen, boxes overlapping, 2-3 s empty openings, overlapping captions at a scene change, a
rushed 2.8 w/s voice, and a CTA that broke the generic-CTA rule above. Say plainly what was and wasn't checked:
frames and a transcript are not listening.

## 2026-10-11 · Reference style is the house style; plan animations before building (user)
**User:** "why I'm not getting videos similar to how … claude [chat] creates?" → "yes use the reference style, start
the Jev pilot" → (after 6 tutorials on making videos with Claude) "go ahead with the pipeline changes and redo Laya".
**What was wrong:** reels were filled-in preset cards (title / counter / points) on dark-and-moody palettes; the
reference performs the explanation on one running object in flat colour blocks with giant type. Gates checked
correctness, not likeness to the reference.
**Rules:** (1) the house style `studio/templates/styles/reference-flat/` (design.md, kit.css/kit.js, sections.json)
replaces the 2026-10-09 "modern/futuristic dark" palette rule; reels are built as a bespoke stage (`"type": "stage"`)
on the shared kit. (2) Every package gets a reference board, locks and an `animation-plan.md` the user approves
before any build (lint enforces it from 2026-10-12). (3) Each step is a 4–10 s piece with a standalone brief, buildable
in parallel. (4) Revisions change one thing at a time. (5) Check the free HyperFrames registry (300+ blocks) before
hand-building an effect. Remotion stays out: it needs a paid company licence for a team of NxtWave's size.

## 2026-10-12 · Write for speech, voice in one human take (user)
**User:** "the voice over is same for all the video … it lacks conversation ability like how a human express and explain."
**What was wrong:** every reel used the local Kokoro voice (af_heart), synthesised line by line (no tone carried between
sentences), reading scripts written as dense claim-sentences ("Price: 4.2 cents per million input tokens.").
**Rules:** (1) Scripts are written to be *said*: talk to "you", contractions, ask-and-answer ("The price? 4.2 cents…"),
small reactions ("Not one.", "Now, here's the catch."), varied sentence length, a breath before the catch. Facts and
sources unchanged. (2) The voice is one continuous Gemini take (free key in `.env`) with a performance brief in
`voice.style` (who is talking to whom, where to slow down, how the catch sounds), not a per-line local TTS; Kokoro is
for drafts only. (3) Pick a voice per series (`voice.name`), not one voice for everything. ElevenLabs free tier is
non-commercial: tests only. Pilot: `studio/projects/jev-talk/` (Gemini "Achird").

## 2026-10-12 · Long-form characters must look human, not flat shapes (user)
**User:** "the characters are not looking great and are very old … make the video more attractive and just like humanoid."
**What was wrong:** the first long-form teasers (`shorts/jev-teaser-geo.mp4`, `jev-teaser-ink.mp4`) used flat SVG characters built
from circles and pills (`studio/templates/characters/`). The pipeline worked (two voices, lip-sync, gestures, 9/9 QA), but the cast read
as dated clip-art.
**Rules:** (1) Long-form characters are human-proportioned with real faces: expressions, mouth shapes per sound, eye contact. Simple
shape-built figures are for icons only. (2) Show the user a still of a candidate cast before building any video with it. (3) Still free only:
3D humanoids (VRM / three.js, tested headless on 2026-10-12) or original illustrated humans; no paid generators.

## 2026-10-12 · Content decided by agents; the catch only when it matters (user)
**User:** "There is no need to include the catch for all the concepts. If it is evident or important … only then we can
mention. … all these should be taken care by agent, like what needs to be included, which needs to be ignored. If we
do not have the right script or generate vague scripts, all the videos of any type would go to trash. … add evals,
guardrails, whatever possible."
**Rules:** (1) The catch is included only when it is material (changes the viewer's decision, real cost/risk/data, or
hidden by hype) and sourced; the `content-plan` agent decides it, with a reason, in `content-plan.md`. (2) Two gates
before anything visual: `content-plan` (what's in, what's out, core message, safe wording for absolutes) and
`script-review` (rubric score ≥ 4 on plan adherence, specificity, accuracy, clarity, viewer value, spoken naturalness,
hook payoff, structure; exact rewrites until PASS). (3) The linter enforces: plan ready, catch decision with a reason,
review passed, no vague filler phrases, every absolute ("never", "zero", "only", "free"…) sourced on its beat, and a
catch only if the plan says include. Evals: `evals/evals.json` group `content`, fixture `evals/fixtures/bad-content`.
Applies to packages from 2026-10-12 on; already-generated videos are left as they are.

## 2026-10-12 · Long-form = one instructor explaining to camera, not a two-character dialogue (user)
**User:** "the video style is not good of having 2 characters talking. It should be like the instructor explaining about the tool
or technology like most content creators do."
**What was wrong:** the Jev teasers were written as mentor + learner dialogue (two voices, question bubbles).
**Rules:** (1) Long-form explainers have ONE on-screen instructor talking to "you" (the viewer), like the top creators in
`productions/2026-10-12-jev-explainer/inspiration.md`. No second character, no scripted Q&A between characters. (2) The viewer's
questions are asked by the instructor ("Is it real?", "So can you trust it?"), not by a second voice. (3) One voice per video
(`voice.name`), no `voice.speakers`. Supersedes the "mentor + learner" plan in `teaser.md` (v1).

## 2026-10-13 · How MCP works reel (approved)
**User:** approved the package (twice, after the content-plan and script-review gates were added mid-run) and the render.
**Worked (keep):** a foundation-first paradox hook that the ending replays ("An AI model can't check the weather" → the
same answered chat at the end of step 3); one running object (the Tokyo question) through three numbered mechanism steps;
a desk layout that keeps the stations fixed so only the messages move; the honest catch made concrete (a poisoned tool
description the user can't see) with protections the content plan made precise ("check before you approve", not "keep
approvals on"); recap card; one Gemini take (`Sadaltager`) with a performance brief; pauses added (pad 0.3 s + 0.65 s at
section ends) instead of a faster read, landing at 2.56 w/s.
**Didn't (fixed during the build, now rules):** first stage pass had 24–28 px text in cards and a half-empty frame;
motion below the QA band read as static; `W('s14','an')` matched "and" (prefix match), so a word popped early. Encoded:
`video-studio/SKILL.md` stage rules (text sizes, fill, in-band motion) and `assemble.py` W() now matches exact words first.

## 2026-10-13 · LangGraph reel (approved)
**User:** replied "approve" to the finished package (run under "go ahead": hook direction A and all defaults).
**Worked (keep):** a failure-first hook that the payoff replays ("Nobody approved it." → the same refund card, "approved by: you");
one running object (the "I was charged twice." email + its state card) through three ordered steps (nodes → edges → checkpoints);
the content plan's claim-safety table caught three wordings the docs contradict ("picks up exactly where it left off", "survives a
crash", "built on LangChain"); the script-review gate caught a line that implied LangChain's prebuilt agents can't do approvals.
**Didn't (fixed, now habits):** the unsafe "exactly where it left off" survived in the brief's angle line after the script was fixed:
when the content plan bans a wording, grep the whole folder for it, not just the script. `yt_research.py` found no low performer
from a ≥ 5K-sub channel, so the contrast Shorts were watched with `--urls`.

## 2026-10-14 · REA ("Reverse Engineer Anything") reel (approved)
**User:** replied "approve" to the finished package (run under "go ahead": hook direction A and all defaults).
**Worked (keep):** reading a vague topic phrase as the thing actually trending (the viral repo REA, found by searching the exact
phrase before scripting); a Launch demo built on the project's own published showcase, labelled out loud ("That's from the showcase
of REA"), when we couldn't run the tool ourselves; a checkable-result hook ("all 3,205 tests") that the check beat replays; the
content plan's claim-safety table caught "wrong" (the source says "incomplete"), "proves" (it says "checks") and "free" (it's MIT,
"open source"); the script-review gate caught an unexplained key term ("decompiler") and a number true only under a condition
(±500 holds at pan scale 1).
**Didn't (fixed during the run, now habits):** `yt_research.py --context` dropped every title that only said "REA" or "Reverse
Engineer Anything": when the topic is a product name, add the name to `--context` or watch the hits with `--urls`. Running the tool
locally for an "our test" was blocked by the machine's permission policy: say "no our test" in the brief and label every demo fact
as the maker's showcase. For dual-use topics, the content plan's safety section (no commands, no readable addresses, no commercial
target, permission line once) kept the reel at "ask → evidence → rebuild → check".

## 2026-10-16 · Quality gates for the whole pipeline (user)
**User:** "check and fix the system to generate high quality videos", then chose: house pace **2.3 w/s** (like the reference),
Dots as the validation pilot, full scope. Shared three Instagram creators whose technical reels are the bar (@rick.theengineer,
@howtechmoves, @krishnachaytanyaa) and the "Make motion design videos with Claude" method (camera as keyframes, one sound per
visible action, stills before any render, a style skill per brand, replica UI for tool videos).
**What the audit found (now fixed on branch `video-quality-gates`):** every Gemini take read at 2.8–3.1 w/s and the docs disagreed
(2.3 / 2.7 / 3.0) → one `studio/templates/reel/pace.json`, a per-scene pace gate in `voice` and a ladder (pauses → `pauseAfter` →
`slow` retake / fewer words; never atempo). Nothing gated the visuals between script-review and the user watching → the
`visual-plan` agent (concrete visual per beat, running object, depth points shown, overlays ≤ 12 words, first frame, locks grepped,
measured targets from `references/ig-reels.md`) and `tools/payoffs.mjs` (seeks the composition to every beat and asserts the element
is on screen on its word; captions ≤ 2 lines; nothing planned still > 2.5 s). Results were never saved and `render` shipped to
`shorts/` before QA → `out/qa.json`, `out/watch.json`, `review.md` (the fix list) and a `deliver` gate. Music was ducked by scene,
not by word gaps; the loop had a hard seam; SFX piled up → fixed in `assemble.py`.
**Measured against the references:** their reels sit still 0.2–10 % of the time (the reference reel 48 %, our renders 26–28 %, by `tools/benchmark.py`), move the camera ~10×/min, keep one
object alive across every section as state changes, put a click/tick on every action, and keep non-hero type ≤ 3 % of the frame so
the diagram fills it. Rules now in the visual-plan rubric and each style's design.md (Camera / Sound / Pace / Export sections).
**Keep:** read the per-scene pace table before touching anything else; the approved REA reel would have failed (13/20 scenes > 2.9),
so the gate is not cosmetic. A beat whose word was not spoken stops the build; a stage beat names its element with
`data-beat="sNN/target"`.

## 2026-10-27 · Goldfish comprehension check (user: "go ahead with EGM install and comprehension check")
**What:** Google's Elephant-Goldfish Model, applied to scripts. This session is the Elephant (holds the plan); the
`script-comprehension` agent is a Goldfish: a stateless first-time viewer given only the read-aloud, never the content
plan or research. `script-review` scores "understood" from its report (takeaway = core message, every must-include
remembered, no lost term the core depends on); the linter fails a missing or stale report.
**First runs:** a jargon-dense MCP script came back "WHAT IT IS: not said", 8 lost points, risk high. Even the passing
good-reel fixture lost the viewer on the unframed myth opener and the missing "why tokens hide the r's" link, and the
approved Dots script packed its four permission levels (a must-include) into one breath. Keep: one new idea per sentence,
frame a myth as a myth, say the mechanism's link out loud.

## 2026-10-30 · Measured against the top explainer shorts (user: "review and compare against the real reels … what needs to be improved", then "Go ahead")
**What:** 12 top AI and dev explainer shorts (ByteByteGo, Fireship, KodeKloud, codebasics, bycloud, IBM,
LearnThatStack, Under the Hood AI, 9x) measured next to our 7 latest renders (`references/web-shorts-2026-10-30.md`).
**Found:**
- Ours are twice as long (median 114 s vs 57 s).
- Ours are slower, with dead air: 2.5 vs 3.3 words/s, and 9 pauses over 0.9 s vs 0.
- Ours open weaker: Harness fills 32 % of the band at 1.5 s; every reference fills 48–100 %.
- Ours change the background every section; the references keep one background and grow one diagram under a
  pinned question.
- Still share doesn't predict reach (references 0–94 %), and fix rounds spent lowering it were wasted money.
**Now:**
- 45–75 s by default; a `Long reel: <reason>` line in the content plan unlocks more.
- The content plan writes a Hook question, shown large over the acting object by 1.5 s (`payoffs` fails < 45 % fill).
- One background with the question pinned.
- Only a frozen frame over 5 s fails.
- Pace stays 2.3 until the owner decides.


## 2026-10-30 · Openings are cluttered (user: "the opening scene or frame cluttered … dig this out", then "Plan and proceed")
**What:** our reels opened with the whole hook already on screen: Harness v2 had 5 things and 24 words at 0 s, the
same at 3 s. The first seconds of 12 top shorts (`references/web-shorts-openings-2026-10-30.md`) open on 1–3
things and ≤ ~5 words, then build the hook as it is spoken.
**Why ours did it:** every opening rule set a minimum and none set a maximum. "Never empty", "≥ 45 % fill at 1.5 s"
and "fill the frame" were read as "put more in"; the fill test measures span, so clutter passed it; the 12-word rule
skipped card titles, chips, tags and the caption; disclosure tags had no time, so they sat on frame 0.
**Now:**
- Frame 0: the hook question's first words + one object, ≤ 3 things and ≤ 6 words, everything readable counted.
- The question types out with the voice; the object acts on its word.
- By 3 s: ≤ 5 things and ≤ 12 words.
- While the question types, the scene sets `"captions": false`.
- "illustrative" tags and chips arrive after 3 s.
- `payoffs` fails over the ceiling; the 45 % fill test stays.
