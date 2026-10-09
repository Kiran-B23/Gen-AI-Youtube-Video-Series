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
