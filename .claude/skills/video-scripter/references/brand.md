# Channel brand layer (light; the same on every video)

Every video uses the **house style** `studio/templates/styles/reference-flat/design.md` (user, 2026-10-11: "use the
reference style"): one bespoke animation on one running object, flat colour blocks, giant type, numbered steps. The
concept decides the running object, metaphor and motion; the house style decides the look.

| Element | Fixed choice |
|---|---|
| **Aesthetic** | **The reference reel's look** (house style `reference-flat`): flat colour blocks per chapter (electric blue, yellow, off-white, navy), giant Anton/Inter type, mono chips, white cards with ink borders, clean geometry. Modern and confident, never cartoon, pastel, hand-drawn or kids-style; not dark-and-moody throughout (no glow/vignette/grain) |
| Type | **Anton** for display and headlines · **Inter** 600–900 for body and captions · **JetBrains Mono** for code, tokens and numbers-as-data |
| Captions | sentence captions (≤ 9 words, 1–2 lines), **no box**, low on the screen at **81–90%** of the height, left-aligned to the grid; words light up as spoken; section text colour with a halo in the section background; keywords in the section accent |
| Progress | section cards + colour change for every video; numbered "STEP 1 OF 4" cards and the step bar only for Tutorial / Concept mechanisms (structure-check agent) |
| Recap | a numbered chain card before the CTA for every explanation |
| End card | a **channel-generic** question ("What should I explain next?"), never one that narrows the channel to a niche (e.g. "which word"), + "Follow for more AI breakdowns" pill |
| Sound | brisk, warm, enthusiastic voice (Gemini, ~3 words/s); CC0 music bed ducked under speech; whoosh on section wipes, pop on reveals, ding on numbers, stamp on verdicts |
| Safe zones | right 12% and bottom 20% clear of content (captions excepted) |
| Sources | **never on screen.** The full list goes in the description / pinned comment. "illustrative" stays only inside mock UIs |
| Layout grid | tracker top-left · visual zone centred on the frame (x 40–1040, y 220–1260) · captions bottom-left zone · the same positions in every scene |

Decided per video: the running object, metaphor, motion verbs, which accent leads, music track. A video may use another named style only when the user asks.

## The house benchmark: `references/tokenization-reel.mp4` (first-party)
This reel is **ours** (generated with Opus 5.5), so unlike other creators' videos it may be used directly. For every
future reel, take from it:
- **Explanation depth and detailing:** one running sentence followed through every step; numbered steps with a
  "Step N / M" counter; each mechanism shown, not named (the shelf for the vocabulary, the ID table, the batch grid);
  honest limits at the end; a recap card. Length follows the content (it runs 3:14; 2–3 min is fine when a topic has steps).
- **Voice:** calm, clear, deliberate teaching delivery at ~2.3 words/s with short pauses between steps (not a hyped
  creator read). The Gemini style prompt should ask for this; if the user names the voice engine that made the
  reference, match it.
- **Visualisation:** full-frame motion graphics where the running object transforms rather than cuts; big type;
  step counters; colour-blocked sections; one metaphor per mechanism; a recap card. (The palette is the house style's.)
Other creators' videos: learn structure and pacing only; never lines, visuals or palettes.

## Measured targets (2026-10-16)
From three Instagram reels the owner likes plus our benchmark, measured with the studio's own tooling (sheets, Whisper,
motion check): full table, per-reel observations and the motion-design method in `references/ig-reels.md`.

| metric | target | reels / benchmark |
|---|---|---|
| pace | **2.3 w/s house-wide** (2.2–2.6 acceptable; > 2.9 fails). A `studio/templates/reel/pace.json` is being added separately; the voice prompt and `watch.py` warning follow it | reels 3.31 / 2.88 / none; benchmark 2.25 |
| still-% (10–76 % band, 0.25 s steps) | **≤ 10 %**, longest hold ≤ 1.5 s (> 20 % fails) | reels 0.2 / 9.6 / 8.1; benchmark 28 |
| cuts/min | **0–5**: transform the object or move the camera, don't cut | reels 4.5 / 1.8 / 0 |
| camera moves/min | **6–10** on stage scenes, each with a reason (0 only for a single diagram that never stops moving) | reels 10 / 0 / 10; benchmark 0 |
| caption words/card | **3–9** (sentence captions ≤ 9 stay the default; 3–4-word mono cards allowed for Tutorial / Story) | reels 3.5 / 13 / 11 |
| first second | running object on screen and moving before 1.0 s | all three |
| sound | a cue on every stage reveal, landing on its frame | Linux yes, Kafka yes, LB probable |
