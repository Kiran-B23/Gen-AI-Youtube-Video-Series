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
