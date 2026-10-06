# Style guide

The channel should feel consistent across videos (same captions, font,
progress bar, outro), while each topic gets its own color preset.

## Theme presets (engine/theme/presets.ts)

**neonNight** (AI models, technical topics)
background gradient #1A0B3D → #0B1A3D, accents #39FF88 green, #FF3CAC pink,
#00E5FF cyan, #FFD60A yellow. Floating blurred orbs and particles.

**dayToNight** (agents, assistants, "works while you sleep" topics)
background shifts across the video from night navy #0D1030 to sunrise
(#FF8A5B coral, #FFC145 amber), accents #6C63FF violet, #2EC4B6 teal.
Glowing abstract dots that connect with light trails.

To add a preset, define background stops, 4 accent colors, a warning color,
and a "calm" variant used for safety scenes.

## Typography

- One bold rounded sans family across the channel (Poppins ExtraBold /
  Montserrat Black via @remotion/google-fonts).
- Sizes: headline 96 to 140px, body/caption 64 to 80px, chips 44 to 56px,
  source pills 36px. Never below 40px for anything meant to be read.

## Captions

- Show spoken words, synced from Whisper timings, 2 to 4 words per card.
- All words solid white with a soft shadow; only the active word gets the
  accent color and a small scale-up. Spaces are separate non-scaling spans.
- Positioned at 62% to 72% of frame height. Never duplicate text that is
  already large on screen; if a visual shows the number, the caption carries
  the spoken sentence and nothing extra.

## Layout

- Main visual centered in the 25% to 60% band and large. Avoid empty bottom
  halves.
- Safe zones: nothing important in the bottom 20% or the right 12%.
- Wide items scale down rather than overflow.

## Motion

- Springs with slight overshoot for entrances; ease-out for exits.
- A pattern interrupt every 3 to 5 seconds: zoom punch, color flash, layout
  change, emoji pop.
- Overlapping transitions (~10 frames). No frame may show only background.
- Slow background motion (gradient drift, parallax orbs) so nothing is static.
- A thin progress bar across the top for the whole video.

## Illustration rules

- Flat vector characters with generic, non-identifiable faces or no faces.
- Generic app icons (chat bubble, calendar, envelope, code brackets) with
  text labels. Never real logos, wordmarks, mascots or product characters.
- Glassmorphism cards (blurred translucent backgrounds, soft borders) for UI
  mockups.

## Preset: editorial (the channel's preferred "teaching" look)

Use for any "how does X work" topic, and as the default unless the topic is
pure news/hype. Modeled on the channel's reference reel (tokenization
explainer). It feels premium because it is restrained: flat color, big type,
lots of space, and visuals that literally show the mechanism.

**Color.** Flat solid backgrounds only, no gradients, glows or orbs.
- ink navy `#0B1020` (intro, deep technical chapters)
- royal blue `#2840E6` (concept chapters)
- paper grey `#EEF1F6` (step-by-step mechanism chapters)
- sunflower `#FFD43B` (number/ID chapters, emphasis)
- accents: mint `#2ED3A0` (yes / correct), coral `#FF5A6E` (no / error),
  lavender `#A99BFF` (special items), white and ink for text
Change background color per chapter so each chapter feels like a new page.

**Type.** Three families, each with one job:
- Display: condensed heavy sans (e.g. Anton, Bebas Neue, Oswald 700) for hook
  titles, giant chapter numerals ("01"), and big counters ("5 TOKENS")
- Body/captions: clean grotesk (e.g. Inter Tight / Manrope 700)
- Data: monospace (e.g. JetBrains Mono / IBM Plex Mono) for tokens, IDs,
  code, tables
Eyebrow labels: monospace, 28 to 32px, letter-spaced 0.2em, uppercase, accent
color ("FOLLOW ONE SENTENCE", "THE SHELF", "STEP 2 OF 6").

**Layout.** Left-aligned editorial grid with a 72px margin. Chapter progress
indicator at top: "STEP 02 / 06" plus segmented bar. Main visual centered in
the 25% to 60% band. Captions left-aligned at 62% to 72% of height (never
lower: the bottom 20% is covered by platform UI).

**Captions.** Karaoke reveal is fine in this preset, but upcoming words must
stay at least 60% opacity and pass contrast on every background (check the
yellow and blue chapters especially).

**Motion.** Calm and precise rather than bouncy: elements slide 40px and fade,
boxes draw their outlines, counters tick up, highlights sweep. Chapter changes
use full-screen color wipes (block or circle) with a riser SFX. A wipe must
never cover the caption while it is being spoken; finish the caption first.

**Audio.** Soft synth pad under the voice, a riser/whoosh at each chapter
change, small ticks on counters. Same loudness targets as voice-pipeline.md.
