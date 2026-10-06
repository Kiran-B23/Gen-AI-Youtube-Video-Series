# QA checklist (run before any full render)

Render a still from the middle of every scene and at every transition point
(`npm run still <slug>`), then look at each image yourself.

## Visual
- [ ] First frame already shows the hook (not a fade-in from black)
- [ ] No frame shows only the background (check every transition)
- [ ] Captions have correct spacing between words
- [ ] Nothing important in the bottom 20% or right 12%
- [ ] No text under 40px; source pills readable
- [ ] Main visual fills the 25% to 60% band; no empty bottom halves
- [ ] No more than two similar layouts in a row
- [ ] Captions don't duplicate large on-screen text

## Content
- [ ] Every number has a source pill; company claims labeled as claims
- [ ] No logos, wordmarks, mascots, real app icons or real people's likenesses
- [ ] Facts match script.md sources and dates
- [ ] The catch / limitations scene is present

## Sync and audio
- [ ] Render a 10s preview around the two busiest scenes; beats land within
      about 2 frames of the spoken word
- [ ] Music ducks under voice; no clipping; final loudness about -14 LUFS
- [ ] Total duration ≤ 180s (and each part within its target)

Report results to the user as a short list of what passed and what was fixed.
