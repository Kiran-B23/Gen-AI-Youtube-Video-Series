# video.json format

One file per video at `videos/<slug>/video.json`. It is the only thing that
normally changes between videos.

```json
{
  "slug": "openai-dots",
  "title": "OpenAI Dots explained",
  "theme": "dayToNight",
  "music": "music/upbeat-01.mp3",
  "parts": {
    "full": ["s01", "s02", "s03", "s04", "s05"],
    "part1": ["s01", "s02", "s03"]
  },
  "scenes": [
    {
      "id": "s01",
      "type": "hook-scene",
      "props": {
        "setting": "bedroom-night",
        "clock": "3:00 AM",
        "notifications": [
          { "text": "Bug found & fix drafted", "emoji": "🐞" },
          { "text": "Invoice ready for approval", "emoji": "🧾" }
        ]
      },
      "beats": [
        { "word": "bug", "action": "show", "target": "notifications.0" },
        { "word": "invoice", "action": "show", "target": "notifications.1" },
        { "word": "Dots", "action": "burst" }
      ]
    },
    {
      "id": "s02",
      "type": "split-compare",
      "props": {
        "left": { "title": "ChatGPT", "items": ["waits for you"] },
        "right": { "title": "Dots", "items": ["keeps working 24/7"] },
        "verdictLine": "ChatGPT waits. A dot doesn't."
      },
      "beats": [{ "word": "doesn't", "action": "show", "target": "verdictLine" }],
      "source": "OpenAI, Sept 29 2026"
    }
  ]
}
```

## Fields

- `id` must match the voice file name (`s01` ↔ `voice/s01.m4a`).
- `type` must be a type from `scene-catalog.md`.
- Scene duration is never written here; it comes from the voice clip length.
- `beats[].word` is matched against Whisper timings for that scene. Use a
  distinctive word from the spoken line. Actions: `show`, `hide`, `burst`,
  `stamp`, `zoom-punch`, `count-up`, `highlight`, `sfx:<name>`.
- `target` uses dot paths into props (`notifications.0`, `verdictLine`).
- `parts` defines extra outputs rendered from the same scenes.

## Validation

`scripts/voice.mjs` and `scripts/render.mjs` must validate video.json first:
unknown scene types, missing voice files, beat words not found in the
transcript (warn and list close matches), and total duration over 180s.
