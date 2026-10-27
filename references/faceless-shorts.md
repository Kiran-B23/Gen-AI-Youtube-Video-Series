# Faceless Shorts · style references

Faceless explainer Shorts the user picked as style references (look, motion, density, pacing). Add new ones as rows.
The research tool reads every YouTube link in this file:

```
studio/.venv/bin/python studio/tools/yt_research.py --urls references/faceless-shorts.md --out productions/<folder>/yt/refs
```

Learn structure, motion and density only: never copy their lines, visuals, logos or characters. Their transcripts and
frames stay in git-ignored `yt/` folders (the repo is public).

| # | Link | Added | What to look at (user's note) | Takeaways (filled after analysis) |
|---|---|---|---|---|
| 1 | https://www.youtube.com/shorts/i0AOokzwb1k | 2026-10-11 | | |
| 2 | https://www.youtube.com/shorts/zkZQT5rbrf4 | 2026-10-11 | | |
| 3 | https://www.youtube.com/shorts/-QO7mWLFy2k | 2026-10-11 | | |
| 4 | https://www.youtube.com/shorts/BnxFmXVOyKk | 2026-10-11 | | |
| 5 | https://www.youtube.com/shorts/4Q_YSgS2zMQ | 2026-10-11 | | |
| 6 | https://www.youtube.com/shorts/_Q7Ie5OmUoE | 2026-10-11 | | |
| 7 | https://www.youtube.com/shorts/XS1PBKUQo3k | 2026-10-11 | | |

## Instagram

| # | Link | Added | What to look at (user's note) | Takeaways |
|---|---|---|---|---|
| 1 | https://www.instagram.com/reel/DePNMMWli4J/ | 2026-10-12 | | **Not faceless:** creator on camera (blurred when a graphic shows). Serif gold kicker titles ("method 02 · DIAGRAMS") above karaoke pill captions; real Claude screenshots, an animated sequence diagram and a 3Blue1Brown-style Manim clip in a centred card; "Day 03" series tag; 4-item list, ~69 s |
| 2 | https://www.instagram.com/reel/DehL0UdMPw4/ | 2026-10-16 | Linux story (@rick.theengineer) | 2:27, 3.31 w/s, 0.2 % still, ~10 camera moves/min, 4.5 cuts/min. One green-on-black 3-D grid the camera drifts over; the kernel cube is the running object from first frame to recap; 3–4-word mono captions with one keyword lit (~79 % height); 7-tab section bar + "04 · TERMINAL" numbering; a vector terminal typed command by command with the file tree updating on the keystroke; numbers land as objects ("1991" on an empty grid, then a timeline) and stay as chips; music bed + sfx on every cut and reveal. Measured in `references/ig-reels.md` |
| 3 | https://www.instagram.com/reel/Dc9lkKjAaX2/ | 2026-10-16 | Load balancing (@howtechmoves) | 0:34, no narration, 9.6 % still, locked camera, 1 cut (the crash flash). One diagram carries everything: packets as dots, a load bar that climbs 16 → 100 % and turns green → red, warning triangles, a red full-frame "SERVER CRASHED", then a balancer node fades in and three servers spawn; one goes OFFLINE and traffic re-routes. Tiny type (title 2 %, captions 1.5 %, ~13 words/card at ~90 %), diagram fills y 5–85 %; first frame is the diagram already running; music fades in with the flow. `references/ig-reels.md` |
| 4 | https://www.instagram.com/reel/DeecNSBNplG/ | 2026-10-16 | Kafka vs RabbitMQ (@krishnachaytanyaa) | 0:59, 2.88 w/s, 8.1 % still, 0 cuts, ~10 camera moves/min. "Fast once, then slow with every step named": 9 s silent run with 4–6-word captions, pivot title "REPLAYED 8, LOST 0. HOW?", then the same 9 s slowed with narration and zooms that blur the rest of the diagram; labels type on/off next to the object (COPY, STILL HERE, STUCK, BACK, 30 SECONDS); scoreboard on screen first frame to last, counters count up where the number belongs, a 30-s lease bar fills green → red; colour = actor; caption underline takes the actor's colour; no music, a click on every action. `references/ig-reels.md` |

## Instagram profiles

Creators whose reels the owner picked (2026-10-16). Reel ids live in git-ignored `references/ig-reels/<id>/`; the
measured numbers and the "what they do that we don't" lists are in `references/ig-reels.md`.

| handle | what they do well | reels analysed |
|---|---|---|
| @rick.theengineer | Long (2–3 min) story-plus-mechanism explainers on one 3-D set: a kernel/cube running object that survives every chapter, a camera that never rests, a 7-tab progress bar, replica terminal UI typed action by action, 3–4-word mono captions, every reveal with a sound | DehL0UdMPw4 (Linux) |
| @howtechmoves | 30-s single-diagram system-design loops with no narration: state (load %, colour, OFFLINE) tells the story, packets never stop moving, tiny type, diagram fills the frame, the first frame is already running | Dc9lkKjAaX2 (load balancing) |
| @krishnachaytanyaa | "Fast once, then slow with every step named": a silent 9-s run, a pivot question, then the same run slowed with zooms, typed step labels, a live scoreboard and a click per action; colour = actor | DeecNSBNplG (Kafka vs RabbitMQ round 2) |
