# Voice pipeline

## Source priority

1. **User recordings** in `videos/<slug>/voice/` named `s01`, `s02`... (m4a,
   mp3 or wav). One file per scene so retakes are easy.
2. **Premium natural voice**: only if `ELEVENLABS_API_KEY` is set. Use a
   natural, energetic conversational voice and keep the same voice across
   videos for channel consistency.
3. **Neither**: write `script.md`, give the user recording tips, and stop.
   Never fall back to system or basic TTS.

Recording tips to share with the user: quiet room with soft furnishings,
phone a hand's length from the mouth, 20% more energy than normal speech,
re-record any line with a stumble rather than editing it.

## `npm run voice <slug>` must do

1. **Cleanup** each clip with ffmpeg into `build/`: trim silence (keep
   0.15s), high-pass 80 Hz, `afftdn` noise reduction, gentle compression,
   de-ess. Keep raw files untouched.
2. **Loudness**: two-pass `loudnorm` so the final mix lands near -14 LUFS
   integrated, true peak ≤ -1 dBTP.
3. **Timings**: transcribe with local Whisper (faster-whisper preferred) with
   word timestamps → `build/timings.json`. Correct spellings against
   `script.md` (product and people names).
4. **Durations**: print each scene's length and the total. Fail loudly if
   the total exceeds 180s and suggest which lines to shorten. Never speed up
   the voice to fit.

## Mixing (engine/audio/AudioMix.tsx)

- Voice per scene, aligned to the scene start.
- Music ducked to about -24 LUFS under speech, rising to about -16 LUFS in
  gaps over 0.6s and during the outro, with 200 ms ramps.
- SFX from `public/sfx/` on beats (pop on chips, whoosh on transitions, stamp
  on big-stamp), always quieter than the voice.
