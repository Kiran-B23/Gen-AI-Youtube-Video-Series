# Cast (long-form characters)

SVG characters for 16:9 long-form videos: a **mentor** (calm, explains) and a **learner** (asks the viewer's question).
Loaded into a stage when `scenes.json` has `"stage": {"cast": true, …}`; each scene's `"speaker"` (with
`voice.speakers`) tells the lip-sync who is talking. API and poses: the header of `cast.js`.

- **Looks** (`castMount(div, who, look)`): `geo` (flat circles and pills, no outlines) and `ink` (flat fills with an ink
  outline). Both share one skeleton, so poses and lip-sync work for any look. A new look = a new entry in `CAST_LOOKS`.
- **Layout**: mentor in the left column (x < 460), learner in the right (x > 1460); the stage uses the middle; captions
  sit low and centred between them (`styles.css`, `#root.landscape`).
- **Lip-sync** is driven by the Whisper word timings (`TMW`): open/mid shapes inside a word, closed between words.
- Pilot: `studio/projects/jev-teaser-geo/` and `jev-teaser-ink/` (2026-10-12, the A/B test of the two looks).
