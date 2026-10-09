# Channel brand layer (light; the same on every video)

Each video's **look comes from its concept** (art-direction.md). Only this thin layer is shared, so the channel
stays recognisable without every video looking the same.

| Element | Fixed choice |
|---|---|
| **Aesthetic** | **Modern and futuristic tech**: deep, saturated dark bases with electric accents, glass panels, glow, clean geometry, HUD-style tags, scan lines. Never cartoon, pastel, hand-drawn or kids-style illustration. A metaphor is fine (a slicer, a vault, a pipeline) but drawn as sleek tech, not as a toy or a kitchen |
| Type | **Anton** for display and headlines · **Inter** 600–900 for body and captions · **JetBrains Mono** for code, tokens and numbers-as-data |
| Captions | sentence captions (≤ 9 words, 1–2 lines), **no box**, low on the screen at **81–90%** of the height, left-aligned to the grid; words light up as spoken; section text colour with a halo in the section background; keywords in the section accent |
| Progress | step pills at the top for multi-step explanations (colours follow the video's palette) |
| Recap | a numbered chain card before the CTA for every explanation |
| End card | a **channel-generic** question ("What should I explain next?"), never one that narrows the channel to a niche (e.g. "which word"), + "Follow for more AI breakdowns" pill |
| Sound | brisk, warm, enthusiastic voice (Gemini, ~3 words/s); CC0 music bed ducked under speech; whoosh on section wipes, pop on reveals, ding on numbers, stamp on verdicts |
| Safe zones | right 12% and bottom 20% clear of content (captions excepted) |
| Sources | **never on screen.** The full list goes in the description / pinned comment. "illustrative" stays only inside mock UIs |
| Layout grid | tracker top-left · visual zone centred on the frame (x 40–1040, y 220–1260) · captions bottom-left zone · the same positions in every scene |

Not shared (decided per video): palette, background treatment, metaphor, motion verbs, transitions, music track.

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
  step counters; colour-blocked sections; one metaphor per mechanism; a recap card. (The exact palette is still
  decided per video and must stay modern/futuristic.)
Other creators' videos: learn structure and pacing only; never lines, visuals or palettes.
