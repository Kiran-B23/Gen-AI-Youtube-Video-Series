# Instagram reels the owner likes: measured targets (2026-10-16)

Three reels, downloaded with `studio/.venv/bin/yt-dlp` into git-ignored `references/ig-reels/<id>/` (mp4, `meta.json`,
2 fps contact sheets in `sheets/`, `transcript.txt`, `metrics.json`). Measured with the same method as our own renders
(`studio/tools/watch.py` for sheets + Whisper, `studio/tools/qa_video.py` for the motion check), then every sheet read.
Learn structure, motion and density only: never their lines, visuals, characters or palettes (the repo is public; the
media stays local).

Method notes: pace = words ÷ (last word end − first word start), Whisper small.en. still-% = share of 0.25 s steps where
the 10–76 % height band of a 108 px grey frame changes < 0.35 mean abs diff. Cuts = full-frame diff spikes > 25, with
spikes inside 0.5 s merged into one event (a whip or portal wipe spans 2–4 steps). Camera moves and caption words are
counted by eye on the sheets. Benchmark for comparison: our `references/tokenization-reel.mp4` (2.3 w/s; **48 % still** by the same band method, `tools/benchmark.py`; the house tokenization render is 26 %).

## The table

| reel | creator | length | pace | still-% (longest) | cuts/min | camera moves/min | captions (style, words/card, position) | music / sfx | first frame | how steps/sections are named |
|---|---|---|---|---|---|---|---|---|---|---|
| DehL0UdMPw4 · "What exactly is Linux?" | @rick.theengineer | 2:27 | 3.31 w/s (480 words, 0 pauses > 0.9 s) | 0.2 % (0.25 s) | 4.5 (11 events) | ~10 (24: constant drift + push/pull or whip at every section) | 3–4-word mono cards in a dark box with a green border, one keyword green; centred, ~79 % height | music bed throughout (never below −29 dB) + sfx on cuts, particles, typing, the KILLED burst | green wireframe corridor + scan line + "WHAT EXACTLY IS"; "LINUX?" + Tux by 1.2 s | tab bar KERNEL · DISTRO · FILES · SHELL · PERMS · PROCS · PKGS (active tab lit) + "01 · KERNEL" … "10 · THE CORE" top right; big chapter words (KERNEL, SERVERS, THE MENTAL MODEL) |
| Dc9lkKjAaX2 · "How Load Balancing Works" | @howtechmoves | 0:34 | no narration (music only; Whisper's 22 words were a hallucination) | 9.6 % (2.5 s) | 1.8 (1: the red crash flash) | 0 (locked camera) | 2-line sentence subtitles, small white sans, ~13 words/card, centred ~90 %; persistent title at the top | music bed (fades in over 1.5 s, swells to the crash); ticks start at 11.4 s exactly when routing starts (probable sfx) | the whole diagram already live: 6 users, packets flowing down lines into one SERVER card at 16 % load | none: one title, captions carry the sequence, the end card names the concept ("LOAD BALANCING / Share the traffic. Keep things running.") |
| DeecNSBNplG · "Kafka vs RabbitMQ round 2" | @krishnachaytanyaa | 0:59 | 2.88 w/s (126 words from 11.0 s, 0 pauses) | 8.1 % (1.5 s) | 0 (one blurred rewind at 9–10.5 s) | ~10 (zoom in/out at every step) | 1–2 lines white sans, ~11 words/card (4–6 in the fast part), words brighten as spoken, coloured underline in the active service's colour; ~82 % | no music bed; 0–11 s is silence with a click at ~0 dBFS on every action; sfx on action throughout | the complete neon diagram + title + scoreboard "REPLAYED 8 · LOST 0" + caption "Round two. RabbitMQ first." | kicker "KAFKA VS RABBITMQ · ROUND 2"; halves named by broker label and colour; pivot title "REPLAYED 8, LOST 0. HOW?"; callout labels name each step (COPY, STILL HERE, FROM #1, STUCK, BACK, 30 SECONDS) |
| *ours* · tokenization-reel.mp4 | NxtWave | 3:14 | 2.3 w/s | 48 % (same method; house render 26 %) | — | ~0 | sentence captions ≤ 9 words, bottom-left 81–90 % | music bed ducked; whoosh/pop/ding/stamp | hook card | "STEP n OF m" cards + colour change |

## What each reel does that we don't

Our house style (`studio/templates/styles/reference-flat/design.md`, `.claude/skills/video-scripter/references/brand.md`):
one running object, flat colour blocks per chapter, giant Anton/Inter type (8–12 % of frame height, numbers to 17 %),
mono chips, captions bottom-left, a wipe between sections, no camera.

### DehL0UdMPw4 · Linux (@rick.theengineer)
1. **A camera, always.** The scene is a 3-D grid floor the camera drifts over; every section change is a push, pull or
   whip to a new spot, not a wipe. 24 moves in 147 s and the frame is never still (0.2 % still, longest hold 0.25 s).
2. **The running object survives every chapter.** The glowing kernel cube is the first thing on screen and the last
   (inside the CRT at 141 s). Tools/libraries/apps stack around it to become a distro; it duplicates into Ubuntu/
   Debian/Fedora/Arch boxes; it sits at the centre of the mental model; it is the recap. We rebuild the object per
   section; he keeps one and changes its surroundings.
3. **Numbers land as objects in space, then become a chip.** "1991" appears as 6 %-height pixel type on an empty grid,
   then a 1969→TODAY timeline grows under it; "10,239 LINES · FREE" and "500 OF 500 RUN LINUX" are small bordered chips
   that stay on screen while the next thing happens. Our numbers count up and leave.
4. **Captions are 3–4 words, mono, one keyword lit.** Twice the card rate of our ≤ 9-word sentences; the caption reads
   like a terminal prompt and the lit keyword matches the object being revealed. It sits centred at ~79 %, above where
   IG's UI lives.
5. **Visible progress without a counter.** A 7-tab bar across the top with the active tab lit plus "04 · TERMINAL" top
   right. Nobody says "step four"; the viewer sees where they are and how much is left.
6. **Real UI, rebuilt.** The terminal is a vector window with a cursor, typed command by command (`pwd`, `ls`, `cd`,
   `mkdir`, `rm old.txt`), and the file tree under it updates on the exact keystroke (a `projects/` node appears on
   `mkdir`, `old.txt` bursts into particles on `rm`). The ps/kill scene strikes the row through and the bar for PID 2041
   explodes with a "KILLED" label. Every typed action has a visible consequence in the diagram.
7. **One colour, many brightnesses.** Everything is one green on black; hierarchy comes from glow intensity, line
   weight and the single orange/red exception (the warning dialog, the `old.txt` and permission-denied cells). Where we
   change the whole background per chapter, he changes the object and keeps the world.
8. **A host character and photo inserts.** A cartoon presenter stands at the left of every chapter 22–140 s, and the
   1991 story uses two tinted photos (university, Linus) and a period CRT with a real Usenet post. (Character and photos
   are his; the device, a story scene with a tinted still, is usable with CC0 or our own material.)
9. **Hook frame moves in the first second.** 0.2 s: a corridor of lines and a horizontal scan line; 1.2 s: the title
   plus mascot; 2.2 s: a wireframe globe labelled THE INTERNET docks onto the cube. Three visual events before the
   third second.

### Dc9lkKjAaX2 · Load balancing (@howtechmoves)
1. **One diagram, no words spoken.** A single locked-camera network diagram carries the whole 34 s: users at the top,
   packets as dots sliding down lines, one server card with a load bar. There is no narration at all; two-line captions
   read like a voice. 9.6 % still because the packets never stop.
2. **The state is the story.** The load bar climbs 16 → 100 % and turns green → yellow → orange → red; warning
   triangles stack up at the server; the whole frame tints red and "SERVER CRASHED" slams in. Then a diamond LOAD
   BALANCER node fades in between users and servers and three servers spawn; packets re-route and the per-server bars
   hover at 30–50 %. Nothing is labelled that the diagram does not already show.
3. **Failure shown in place.** At 26 s SERVER 2 goes grey with "OFFLINE ✕" and the packet lines to it stop; the other
   two bars rise. One state change answers "what if one fails?".
4. **Type is tiny, the diagram is big.** Title ~2 % of the frame height, captions ~1.5 %, server labels < 1 %. The
   diagram fills y 5–85 %. The only big type is the end card (~3 %).
5. **The first frame is the full diagram already running** (packets mid-flight, bar at 16 %): no empty opening, no
   title card. The end card ("LOAD BALANCING / Share the traffic. Keep things running.") sits on top of the diagram
   dimmed behind it, not on a fresh background.
6. **Sound follows the picture:** music fades in with the packet flow, builds to the crash, and a regular tick starts
   the moment the balancer starts routing.

### DeecNSBNplG · Kafka vs RabbitMQ (@krishnachaytanyaa)
1. **Fast once, then slow with every step named.** 0–9 s plays the whole 9-second mechanism with 4–6-word captions and
   no voice (clicks only), a title "REPLAYED 8, LOST 0. HOW?" pivots at 9 s, then 11–55 s replays the same 9 seconds
   slowly with narration and the camera moving over the same diagram. The hook is the result; the body is the
   explanation. (This matches the owner's own description of the format.)
2. **Camera zooms with a reason.** ~10 moves/min: each zoom lands on the part being explained (the ACK, the bookmark,
   the lease bar, worker 1) and the rest of the diagram goes out of focus (depth-of-field blur). Zoom out when the
   next actor joins (analytics service, Kafka).
3. **Labels type on and type off.** "CO▌ → COPY / the order stays", "ST▌ → STUCK / W1 is down", "BAC▌ → BACK / lease
   ran out", "30 SECONDS / the default lease" are typed with a cursor next to the object they describe, with a
   one-line sub-label, and un-type when done. The label is the step name; the sub-label is the reason.
4. **Numbers land where they belong and stay.** "7 REPLAYED → 8 REPLAYED" counts up next to the service receiving the
   replay; a top-left scoreboard "RABBITMQ KEEPS 8 ORDERS" shows 8 order chips, "KAFKA · LEASE ON #7 · 0 LOST" shows
   two worker bars, and the 30-s lease bar fills green → yellow → red in real time and turns the crash into a visible
   countdown. The scoreboard is on screen from the first frame to the last.
5. **Colour = actor.** Teal RabbitMQ/email, amber analytics, red for the dead worker ("DOWN" + ✕), blue Kafka; the
   caption's underline bar takes the colour of whoever is acting. One palette, roles instead of chapters.
6. **Captions brighten word by word** with a dim lookahead (the unspoken words are already visible, grey). Ours light
   words up too; his also shows what comes next, so a 13-word line reads calmly.
7. **Silence as sound design.** No music bed; each action has a click near 0 dBFS and the opening 11 s are otherwise
   silent. The narration enters at 11 s as the pivot.
8. **Recap is the same frame as the hook.** The last 3 s return to the opening composition with the scoreboard at
   8 / 0 and one line: "STREAMS: KEEP + REPLAY · SHARE GROUPS: LEASE + RETRY".

## Motion-design method (reel DeKOzQRouIf, "Make motion design videos with Claude", 2026-10-07)

In our words, the method that reel describes:

- **Scene as code, one clock.** Every scene is a program; picture and sound read the same timeline, so a frame number
  is the only address anything needs.
- **Camera as keyframes.** The camera is a list of `[time, x, y, zoom]` points with an easing per segment; a shot is a
  path, and a zoom is a keyframe, not a cut.
- **Frame-by-frame render.** The video is rendered frame by frame from the program, so it is deterministic and any
  frame can be regenerated alone.
- **Every visible action writes a sound cue** that lands on the exact frame the action lands (a pop when a chip
  appears, a tick when a packet arrives, a thud when the bar hits red). Sound is produced by the scene, not added
  afterwards.
- **Stills before any full render.** Key moments are rendered as single frames and approved first; the full render
  comes after the stills look right.
- **Feedback one point per line, with a timestamp** ("12.4 s: the label overlaps the bar"), so each note maps to one
  frame and one fix.
- **A per-brand style skill:** colours, fonts, easing curves, camera rules (how fast, how far, when to move), the sound
  palette and the export settings live in one place and every video pulls from it.
- **Two dials for every brief:** realistic ↔ stylised, and image-led ↔ sound-led. Set them before designing a scene.
- **Tool videos = an exact replica of the real UI,** rebuilt in vector from screenshots, animated with short zooms on
  each action (click, type, result) rather than a screen recording.
- **The checklist:** the first second is moving · every zoom has a reason · waits are cut, and the ones that stay are
  declared on screen · text is clear of the IG buttons · each action has a sound · loudness is checked · the piece was
  watched on a phone with sound · there are rights to every logo, UI and sound.

| We already do | We add in Phase 1 |
|---|---|
| Code-drawn scenes (HyperFrames stage, Manim, Playwright, VHS) | **Camera keyframes** `[time, x, y, zoom]` + easing on the stage: a push-in per reveal, a pull-out per new actor, a move at every section change (target ≥ 6/min) |
| One GSAP timeline per stage, beats keyed to words (`at("s04/team")`) | **A sound cue per action** on stage scenes: pop/tick/thud bound to the same word beats as the visuals, not only on section wipes and numbers |
| HyperFrames frame-by-frame render (deterministic, seek-safe) | **Replica UI for Launch and Tutorial:** vector rebuild of the real tool from screenshots, typed action by action with the diagram updating on the keystroke |
| Loudness −14 LUFS / −1 dBTP gate in `qa_video.py` | **The two dials in art-direction** (`realistic ↔ stylised`, `image-led ↔ sound-led`), set per video before the animation plan |
| Stills (`stills.py`, `review.png`, `payoffs.png`) before handover | The checklist above as a QA block (first second moving, zoom reasons, declared waits, clear of IG buttons, phone-with-sound watch) |
| Timestamped review notes (`watch.py` sheets, "s04 @ 12.8s") | Per-brand style skill: already `reference-flat/design.md`; add easing, camera and sound-palette rules to it |

## Targets for the visual-plan rubric

> **Superseded in part (2026-10-30), `references/web-shorts-2026-10-30.md`:** 12 top explainer shorts run 0–94 % still,
> so still share is no longer a target (only a frame frozen for more than 5 s fails), and the first-frame row is now
> "the hook question in large type with the object acting under it, ≥ 45 % of the band at 1.5 s". The rows below
> stay as background.

Derived from the three reels and our benchmark (`references/tokenization-reel.mp4`: 2.3 w/s, 48 % still by `tools/benchmark.py`; the pace is the benchmark's strength, the stillness is not).

| metric | reels measured | benchmark | target | fail |
|---|---|---|---|---|
| pace | 3.31 (hyped), 2.88, none | 2.25 | **2.3 w/s** house-wide (2.2–2.6 acceptable; calm teaching, not a creator read) | > 2.9 or < 1.9 |
| still-% (10–76 % band) | 0.2 / 9.6 / 8.1 | 28 | **≤ 10 %** | > 20 % |
| longest hold | 0.25 / 2.5 / 1.5 s | — | **≤ 1.5 s** on the main band (end card excepted) | > 2.5 s (current `qa_video.py` gate) |
| cuts/min | 4.5 / 1.8 / 0 | ~0 | **0–5**: transform or move the camera rather than cut | > 8 |
| camera moves/min | 10 / 0 / 10 | 0 | **6–10** on stage scenes, each with a reason (reveal, new actor, section); 0 is allowed only for a single-diagram scene that never stops moving (load-balancer style) | a move with nothing to land on |
| caption words/card | 3.5 / 13 / 11 | ≤ 9 | **3–9**: sentence captions ≤ 9 words stay the default; a 3–4-word mono-card mode (one keyword lit) is allowed for Tutorial and Story | > 12 |
| first second | all three move by 0.2 s | hook card | **the running object is on screen and moving before 1.0 s**; no title-only opening | blank or static first 0.5 s |
| sound per action | Linux yes, Kafka yes, LB probable | section/number only | **every reveal on the stage has a cue**, landing on its frame | a reveal with no cue |
| type size | 1.5–6 % of frame height | 8–17 % | keep giant type for hook, verdict and the one headline number; everything else ≤ 3 % so the diagram can fill y 5–85 % | three chips on an empty screen |
| sections named | tab bar / colour roles / none | STEP n OF m | a visible position marker for every multi-step video (tab bar or progress), numbered cards only where `structure-check` allows | — |
