# Animation plan · OpenAI Dots (v3 reel)

_For each beat: what the picture DOES to the running object (a house verb + the object + the spoken cue word), the camera move
with its reason, and the sound on each action. The user approves this plan before any stage code is written; then each section
is built as its own 4–10 s piece from the standalone brief below. House pace 2.3 w/s (`studio/templates/reel/pace.json`)._

**Running object:** the dot window: a vector replica of the dot's ChatGPT chat (left rail · bubbles · composer · name chip) with the dot's computer pane under it, carrying the checkout bug · **Sections (Launch, plain titles, no numbers):** What it is · How it works · You set the rules · The catch · My take · **House style:** reference-flat

**Fixed geometry (every beat):** the **chat window** x 40–1040, y 240–1120 (top bar y 240–300 with three neutral grey dots and the
title "ChatGPT · your dot"; left rail x 40–104 with five line icons; message column x 120–1020; composer y 1030–1100). The **dot's
computer pane** slides up to x 40–1040, y 820–1420 (dark chrome, a URL pill, a white page, a terminal strip at its foot). **Sheets**
(profile tabs, Custom rules, Plugins) open inside the window at x 120–1020, y 400–1100; the **Reset dialog** at x 160–920, y 560–1000.
The **clock** sits top-left at x 60–560, y 230–400 (Anton 170 px in the hook, then a 32 px mono chip). The **avatar** is a plain blue
circle at x 540, y 330 with a chip under it. Small "illustrative" chip at x 60, y 1130 (Inter 26 px). Nothing below y 1460, nothing
at x > 950 except the window's own right edge at 1040 (static chrome, no content).

## First frame (frame 0, before a word is spoken)
The house navy block. The dot's chat window (x 40–1040, y 240–1120) is already open and lit: grey left rail with five line icons,
one blue user bubble "Goal: keep the checkout bug-free" at the top of the column, the plain blue circle avatar with the chip "Dot ·
idle", the composer "Send a message". Over the window's head, top-left, the giant yellow mono clock "3:00 AM" (170 px) with its
colon blinking from frame 0. At 0.3 s a grey message card "Slack · #bugs — Checkout fails on iOS" slides in from the right edge into
the chat column; the "illustrative" chip sits under the window. On mute it reads: a chat, 3 AM, a bug arriving.

## Hook direction (pick one, or write your own)
- **A (default):** the plan below: the dot window at 3:00 AM, the Slack bug card ROUTES in, the clock COUNTS UP to 7:00, the "fix is
  ready for review" bubble SLIDES IN and the camera pushes onto the "Review the fix" link.
- **B:** frame 0 is a phone lock screen at "3:00" with one notification from your dot ("The fix is ready for review"); on "Slack" the
  notification EXPANDS into the full chat window (the same replica), then A's beat 2.
- **C:** frame 0 is the giant clock alone: "3:00 AM" COUNTS UP to "7:00 AM" across the first line while, beneath it, the chat window
  BUILDS WORD BY WORD (rail, bubbles, composer) as if the dot were assembling its own desk; the bug card and the review bubble land
  inside it on their words.
_(Each is a different first image: a chat with a clock, a lock screen, a clock that builds the window.)_

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | cam | sfx | Block to adapt (registry, optional) |
|---|---|---|---|---|---|---|---|
| s01 hook | It's three A.M. A bug report lands in Slack. | dark | frame 0: the chat window already open on navy (rail, goal bubble, avatar chip "Dot · idle", composer); the giant yellow clock "3:00 AM" with its colon BLINKING from frame 0; on "three" the clock PULSES; on "bug" a grey message card "Slack · #bugs — Checkout fails on iOS" ROUTES from the right edge into the chat column and docks as a bubble; on "Slack" the "illustrative" chip STAMPS under the window | three · bug · Slack | no cam (frame 0 is the whole window) | tick on the colon, blip on "bug", stamp on "Slack" | chat-message |
| s02 hook | By morning, a fix is waiting for you to review. | dark | on "morning" the clock over the chat window COUNTS UP 3:00 → 7:00 (digits roll, yellow → white) while the avatar chip TYPES "Working…" then "Done" and a "sped up" chip STAMPS beside the clock; on "fix" a grey bubble SLIDES IN "The fix is ready for review." with the underlined link "Review the fix" and a receipt "7:02 AM"; on "review" the link's underline DRAWS blue | morning · fix · review | [540, 900, 1.4] on "review": the payoff lands on the link | tick on the roll, stamp on "sped up", ding on "fix", pop on "review" | count-up |
| s03 what it is | That's a dot: an always-on agent inside ChatGPT. | blue | WIPE to blue, section title "What it is" (0.8 s); the chat window SHRINKS to 0.78 and docks at y 520–1240; on "dot" "A DOT" SLAMS above it (Anton 180 px, white: the hook's answer); on "always-on" a chip "always-on agent · in ChatGPT" POPS under the title; on "ChatGPT" the avatar circle in the window PULSES blue | dot · always-on · ChatGPT | home on the wipe: the whole window and the title | whoosh on the wipe, stamp on "dot", pop on "always-on", tick on "ChatGPT" | headline-slam |
| s04 what it is | You give it a goal, and it keeps working between your chats. | blue | the title SHRINKS AWAY to a 32 px kicker; the window GROWS back to full; on "goal" the composer TYPES OUT "keep the checkout bug-free" and the send button CLICKS, the goal bubble (blue) SLIDES IN; on "working" the avatar chip TYPES "Working…" and a thin blue progress bar under the composer FILLS; on "chats" the chat column DIMS to 40 % (you left) while the bar keeps FILLING and the chip keeps its spinner | goal · working · chats | no cam (the whole window is the point: nothing moves on your side) | key on "goal", click on send, tick ×3 on the bar, pop on "chats" | code-typing |
| s05 demo | How? Each dot gets its own cloud computer, with its own browser. | light | WIPE to light, section title "How it works" (0.8 s); on "computer" the dot's computer pane SLIDES IN from below the window (y 820–1420: dark chrome, an empty URL pill, a blank page) and the chat column above re-lights; on "browser" the URL pill TYPES OUT "localhost:4920/checkout" and the page FILLS with a checkout form (three fields, a Pay button) | computer · browser | [540, 1120, 1.5] on "computer": a new actor arrives under the chat | whoosh on the wipe, click on the pane, key on "browser", pop on the form | |
| s06 demo | So it doesn't just talk about the bug. In OpenAI's own example, it writes the fix, and tests it. | light | on "talk" a grey bubble SLIDES IN in the chat window above: "Investigating the iOS checkout…" (its typing dots and the avatar chip's spinner keep TURNING through the beat, so nothing holds); on "example" a chip "OpenAI's own example · illustrative" STAMPS on the pane's chrome; on "writes" a code strip inside the pane TYPES OUT three lines, the last lit green "+ fix"; on "tests" the terminal strip at the pane's foot SCANS "npm test" left to right and a counter COUNTS UP to "12 passed" (hidden before), with a "sped up" chip beside it | talk · example · writes · tests | [700, 1250, 1.6] on "tests": pan to the terminal strip where the count lands | pop on "talk", stamp on "example", key on "writes", tick ×3 then ding on "tests" | terminal-simulator |
| s07 demo | You can open its computer any time and watch it work. | light | cam HOME on "open" so the chat and the pane are both in frame; on "computer" a label "Dot's computer" TYPES next to the URL pill; on "watch" a cursor in the pane MOVES across the checkout form and a field FILLS (the dot clicking through the fix); the "12 passed" chip STAYS | open · computer · watch | home on "open": the viewer sees the whole desk | click on "open", key on "computer", tick on "watch" | |
| s08 demo | When it's done, the results come back to you, for review. | light | on "done" the avatar chip TYPES "Done" and the pane's progress bar FILLS to the end (green tip); on "results" the "The fix is ready for review." bubble SLIDES IN with "Review the fix" underlined and a "7:02 AM" receipt; on "review" PUSH IN on the link and a cursor CLICKS it (the link FLASHES blue) | done · results · review | [540, 760, 1.4] on "review": the hook's payoff, the same link as s02 | tick on "done", ding on "results", click on "review" | |
| s09 demo | It can also run on a schedule, like checking your calendar every morning. | light | on "schedule" the computer pane SLIDES AWAY down and the dot's profile sheet SLIDES IN inside the chat window with three tabs "In progress · Scheduled · Completed" whose rows SETTLE one by one (In progress 1 · Completed 2) and the tab underline SLIDES to "Scheduled"; on "calendar" a row TYPES OUT "Calendar check · every morning"; on "morning" a small clock chip beside the row TICKS once and the row's toggle CLICKS on | schedule · calendar · morning | [320, 560, 1.5] on "schedule": the Scheduled tab is the actor | whoosh on the pane, pop on "schedule", key on "calendar", tick on "morning" | |
| s10 different | Now, the part that matters: you decide how much it can do alone. | yellow | WIPE to yellow, section title "You set the rules" (0.8 s); cam home; on "part" the profile sheet inside the chat window FLIPS in place to the "Custom rules" sheet (header "Customize → Custom rules", exact Help Center words); on "decide" a cursor CLICKS "+ Add a rule" and a field TYPES OUT "Merging a fix to main"; on "alone" four empty behaviour slots (outlines only, no text) SLIDE IN under the field | part · decide · alone | home on the wipe | whoosh on the wipe, click on "decide", key on the rule, pop on "alone" | |
| s11 different | There are four levels. At the top, it acts on its own, without asking you. | yellow | PUSH IN on the four empty slots in the rules sheet (chat window) on "four"; on "top" the highlight bar SLIDES to the first slot; on "asking" that slot FILLS with the exact label "Take action without asking" (an empty radio in it, none chosen) | four · top · asking | [540, 760, 1.35] on "four": the list is the actor (built capped at 1.28, edge-safe) | tick on "top", pop on "asking" | |
| s12 different | One step down, it acts only on what your prompt already asked for. | yellow | on "down" the highlight bar SLIDES one slot down in the rules sheet (chat window); on "only" the second slot FILLS with the exact label "Take action if pre-approved"; on "prompt" its sub-label "pre-approved = you asked for it in your prompt" TYPES OUT under it | down · only · prompt | no cam (the s11 push holds the four slots) | tick on "down", pop on "only", key on "prompt" | |
| s13 different | Next, it asks you first, and waits for your okay. | yellow | on "Next" the highlight bar SLIDES to the third slot in the rules sheet (chat window); on "first" it FILLS with the exact label "Ask before taking action"; on "okay" a small chip "waiting for your okay" POPS at the slot's end, its three dots TURNING | Next · first · okay | no cam | tick on "Next", pop on "first", blip on "okay" | |
| s14 different | At the bottom, it doesn't act. It hands the job back to you. | yellow | on "bottom" the highlight bar SLIDES to the fourth slot in the rules sheet (chat window); on "act" it FILLS with the exact label "Hand off to you"; on "hands" a chip "you do it" STAMPS at its end; the sheet now holds all four labels, none chosen | bottom · act · hands | no cam | tick on "bottom", pop on "act", stamp on "hands" | |
| s15 different | And some things, like changing a password, it always leaves to you. | yellow | on "things" the cursor DRIFTS down the four rows of the sheet (chat window); under them a fifth greyed row SLIDES IN on "password": "Changing a password" with a lock icon; on "always" the tag "always you" STAMPS on it; on "leaves" the cursor tries its radio and the row SHAKES (locked, no choice offered) | things · password · always · leaves | no cam (the s11 frame already holds the rows; home comes with the next wipe) | pop on "password", stamp on "always", blip on "leaves" | |
| s16 catch | Now, here's the catch. Disconnect an app like Slack from your dot, and what it already read there stays. | dark | WIPE to navy, section title "The catch" (0.8 s), cam home, music dips; on "catch" the sheet FLIPS to "Customize → Plugins": three connected app rows (Slack · Calendar · Code) each with a toggle ON and, to their right, two small memory notes ("deploy day = Thursday", "iOS build on TestFlight") joined by thin lines; on "Disconnect" PUSH IN on the Slack row; on "app" the cursor CLICKS its toggle OFF (the row DIMS, its line to the notes CUTS); on "read" the two notes LIGHT one after the other; on "stays" they PULSE and a chip "what it read stays" STAMPS beside them (all inside the chat window) | catch · Disconnect · app · read · stays | [540, 640, 1.5] on "Disconnect": the toggle is the action | whoosh on the wipe, pop on "catch", click on "app", pop ×2 on "read", stamp on "stays" | |
| s17 catch | To wipe that, you delete the whole dot. Chats, memories, schedules, all of it. | dark | on "wipe" the ••• menu OPENS at the window's head and "Reset" is CLICKED; on "delete" the Reset dialog SLIDES IN over the window: "Reset deletes your dot, including its conversations, saved memories, and scheduled tasks." with "Cancel · Reset"; on "Chats" the word "conversations" LIGHTS yellow, on "memories" "saved memories", on "schedules" "scheduled tasks"; on "all" the cursor CLICKS Reset and the whole window (bubbles, notes, sheet) SHRINKS AWAY into the avatar circle, which FADES to a dot | wipe · delete · Chats · memories · schedules · all | [540, 760, 1.4] on "delete": the dialog is the actor | click on "wipe", pop on "delete", tick ×3 on the three words, whoosh on "all" | |
| s18 verdict | And it can still make mistakes, even while following your rules. So check its work. | blue | WIPE to blue, section title "My take" (0.8 s), cam home; the chat window RETURNS whole, its parts SLIDING IN one after another (rail, goal bubble, the chip "Dot · idle", composer) across the first words; on "mistakes" the "The fix is ready for review." bubble SLIDES IN and one line of a small diff strip under it FLASHES red ("qty + 1"); on "rules" a kicker chip "rule: merging → Ask before taking action" POPS at the window's head; on "check" a cursor CLICKS "Review the fix" and the red line gets a yellow RING | mistakes · rules · check | home on the wipe | whoosh on the wipe, blip on "mistakes", pop on "rules", click on "check" | |
| s19 verdict | My take? Start it on ask first, and loosen the rules as it earns your trust. | blue | on "take" the kicker chip at the chat window's head PULSES; on "ask" PUSH IN on the kicker's rule row (it EXPANDS to the four labels) and the radio CLICKS "Ask before taking action"; on "first" "ASK FIRST." SLAMS above the window (Anton 160 px, yellow); on "loosen" the radio SLIDES one row up to "Take action if pre-approved"; on "trust" a tick chip "earned" STAMPS beside it | take · ask · first · loosen · trust | [540, 760, 1.5] on "ask": the chosen rule is the actor | click on "ask", stamp on "first", click on "loosen", pop on "trust" | headline-slam |
| s20 CTA | What should I explain next? Tell me below. | dark | WIPE to navy, cam home; the window SHRINKS AWAY upward; on "explain" "What should I explain next?" BUILDS WORD BY WORD (Anton 140 px, yellow); on "below" a follow pill POPS | explain · below | home on the wipe | whoosh on the wipe, pop on "below" | kinetic-center-build |

_Each row: a house verb (TYPES OUT · SCANS · SLICES · STAMPS · COUNTS UP · FILLS · ROUTES · RACES · SHRINKS AWAY · BUILDS WORD BY
WORD · PUSH IN · WIPE) + the object it acts on + the cue word it fires on; no "none" rows in this plan. Beats over ~6 words name a
second change on its own cue. Giant type only on the hook (the clock, "A DOT" as the hook's answer) and the verdict ("ASK FIRST.");
every other text element ≤ 58 px. Numbers that land stay as chips ("12 passed" from s06 to s09; "7:02 AM" receipts). s11 reworded 2026-10-27 at the user's request (option b): the four levels get one beat each (s11–s14); old s12–s17 are now s15–s20._

## Build briefs (one per section; each can be built in parallel)
### Hook · s01–s02 (~11 s)
Navy. Frame 0 must already read on mute: the chat window (x 40–1040, y 240–1120) open with its grey rail, one blue goal bubble, the
plain blue avatar circle with the chip "Dot · idle", the composer "Send a message"; the giant yellow mono clock "3:00 AM" (170 px)
top-left with its colon blinking at 1 Hz from frame 0; the "illustrative" chip under the window. s01: on "three" the clock pulses; on
"bug" a grey card "Slack · #bugs — Checkout fails on iOS" routes from x 1080 into the column and docks as a bubble (blip); on "Slack"
the "illustrative" chip stamps. s02: on "morning" the clock digits roll 3:00 → 7:00 over 1.2 s (ticks), the chip under the avatar
types "Working…" then "Done", a "sped up" chip stamps beside the clock; on "fix" the bubble "The fix is ready for review." slides in
with "Review the fix" underlined and a "7:02 AM" receipt (ding); on "review" the camera pushes to [540, 900, 1.4] and the underline
draws blue. Exit state: the window with the review bubble, the clock at 7:00 AM, camera on the link.

### What it is · s03–s04 (~10 s)
Blue. Wipe; section title "What it is" (Inter 900, 0.8 s); camera home. The window shrinks to 0.78 and docks at y 520–1240; "A DOT"
slams above it (Anton 180 px, white) on "dot"; the chip "always-on agent · in ChatGPT" pops on "always-on"; the avatar pulses on
"ChatGPT". s04: the title shrinks to a 32 px kicker; the window grows back to full; on "goal" the composer types "keep the checkout
bug-free" (keys) and the send button clicks, the blue goal bubble slides in; on "working" the chip reads "Working…" with a spinner
and a thin blue bar under the composer starts filling (ticks); on "chats" the chat column dims to 40 % while the bar keeps filling
and the spinner keeps turning. Exit: a dimmed chat, the dot still working. Keep every element ≥ 40 px apart.

### How it works · s05–s09 (~31 s)
Light. Wipe; section title "How it works". s05: on "computer" the dot's computer pane slides up from below the window to y 820–1420
(dark chrome, URL pill, blank page; camera [540, 1120, 1.5]); the chat above re-lights; on "browser" the URL types
"localhost:4920/checkout" and the page fills with a checkout form. s06: on "talk" the bubble "Investigating the iOS checkout…"
slides in above; on "example" the chip "OpenAI's own example · illustrative" stamps on the pane's chrome; on "writes" a code strip
types three lines, the last green "+ fix"; on "tests" the terminal strip scans "npm test" and "12 passed" counts up (hidden before,
ding), "sped up" chip beside it; camera pans to [700, 1250, 1.6]. s07: camera home on "open"; "Dot's computer" types next to the
URL pill on "computer"; on "watch" a cursor moves over the form and a field fills. s08: on "done" the chip reads "Done" and the
pane's bar fills to the end; on "results" the review bubble slides in with "Review the fix" and "7:02 AM"; on "review" camera
[540, 760, 1.4] and the cursor clicks the link. s09: on "schedule" the pane slides away and the profile sheet slides in with the
three tabs ("In progress · Scheduled · Completed", "Scheduled" lit; camera [320, 560, 1.5]); on "calendar" the row "Calendar
check · every morning" types; on "morning" its clock chip ticks and the toggle clicks on. "12 passed" stays as a chip through s09.

### You set the rules · s10–s15 (~36 s)
Yellow. Wipe; section title "You set the rules"; camera home. The profile sheet flips in place to the Custom rules sheet (header
"Customize → Custom rules"); on "decide" the cursor clicks "+ Add a rule" and the field types "Merging a fix to main"; on "alone"
four empty slots slide in. s11: camera [540, 760, 1.35] on "four" (built capped at 1.28); a highlight bar walks the slots, one per
beat, and each slot fills with its exact label on its own beat: s11 "Take action without asking" on "asking"; s12 "Take action if
pre-approved" on "only", its sub-label "pre-approved = you asked for it in your prompt" typing on "prompt"; s13 "Ask before taking
action" on "first", a chip "waiting for your okay" on "okay"; s14 "Hand off to you" on "act", a chip "you do it" on "hands". No
numbers, no radio chosen. s15: a fifth greyed row "Changing a password" with a lock slides in on "password"; "always you" stamps on
"always"; on "leaves" the cursor tries its radio and the row shakes. Exit: the rules sheet with five rows, camera still pushed in
(home comes with the next wipe).

### The catch · s16–s17 (~17 s)
Navy, calm (music dips). Wipe; section title "The catch"; camera home. On "catch" the sheet flips to "Customize → Plugins": three
rows (Slack · Calendar · Code) with toggles ON and two memory notes to the right ("deploy day = Thursday", "iOS build on
TestFlight") joined by thin lines; on "Disconnect" camera [540, 640, 1.5]; on "app" the Slack toggle clicks OFF, the row dims and
its line to the notes cuts; on "read" the two notes light one after the other; on "stays" they pulse and the chip "what it read stays" stamps. s17: on "wipe" the ••• menu
opens and "Reset" is clicked; on "delete" the Reset dialog slides in ("Reset deletes your dot, including its conversations, saved
memories, and scheduled tasks." · Cancel · Reset; camera [540, 760, 1.4]); the three phrases light on "Chats" / "memories" /
"schedules"; on "all" the cursor clicks Reset and the window shrinks into the avatar circle, which fades. No alarm icons.

### My take + CTA · s18–s20 (~18 s)
Blue. Wipe; section title "My take"; camera home. The window returns whole with a fresh dot; on "mistakes" the review bubble slides
in and one diff line flashes red ("qty + 1"); on "rules" the kicker chip "rule: merging → Ask before taking action" pops at the
window's head; on "check" the cursor clicks "Review the fix" and the red line gets a yellow ring. s19: on "ask" camera
[540, 760, 1.5] and the kicker expands to the four labels, the radio clicks "Ask before taking action"; on "first" "ASK FIRST." slams
(Anton 160 px, yellow); on "loosen" the radio slides up one row to "Take action if pre-approved"; on "trust" the chip "earned"
stamps. s20: wipe to navy, camera home; the window shrinks away upward; "What should I explain next?" builds word by word; the
follow pill pops.

## Approval
- [x] Visual plan passed (visual-plan agent, 2026-10-27: plan + storyboard mode after the s11 rewording, see below)
- [x] Structure check passed (structure-check agent, 2026-10-27, see below)
- [x] User approved the plan (2026-10-16: "Approve, build it"; hook direction A, voice Puck) · s11 reworded 2026-10-27 at the user's request (option b: four level beats s11–s14; old s12–s17 renumbered s15–s20)

## Visual plan check · 2026-10-16 (plan mode)
Inputs: content-plan.md (5 Depth points, running example, Claim-safety grep list), art-direction.md (running object, Replica block,
locks, dials), hooks.md (pick #1, first frame), script-reel.md (17 beats), animation-plan.md, brief.md (Launch);
`studio/templates/reel/pace.json` (2.3 w/s · 2.5 s · 6 s); `references/ig-reels.md` targets. Linter first: animation-plan checks
all ✓ (17 rows, a verb per row, every cue spoken, 0 none rows, running object in 11/17 rows); the old v1 storyboard failed the
overlay check (#6 13 w, #10 21 w) and is rewritten in stage 6.

### Pass 1 (as written): CHANGES
```
VERDICT: CHANGES
depth: 5/5 shown · running object: 65 % of beats (11/17 named) · none-rows: 0 · still: ~13 % (longest hold 4.2 s, s13) · cam: 15 moves ≈ 8.2/min · hook: self 19 / blind 18
blocking:
- s13 <4>: cues "app · Disconnect" in that order → the script says "Disconnect an app": PUSH IN on "Disconnect", the toggle CLICKS OFF on "app"; add "learned" (the two notes LIGHT one by one) so the 4.2 s between "app" and "stays" (> 1.5 s hold) is not a still
- s06 <7>: "talk" bubble → "example" chip is a 2.5 s hold (> 1.5 s) → the bubble's typing dots and the avatar chip's spinner keep TURNING through the beat
- s09 <7>: 1.6 s hold after the profile sheet slides in → the sheet's rows SETTLE one by one and the tab underline SLIDES to "Scheduled"
- s10 <7>: 2.1 s between the wipe and "decide" → the sheet FLIPS to Custom rules on "part"
- s12 <7>: 2.5 s from s11's last fill ("hand") to "password" → the cursor DRIFTS down the rows on "things"
- s16 <7>: 2.3 s from s15's ring ("check") to "ask" → the kicker chip PULSES on "take"
- <9> locks / unsafe wordings outside a never-say context: brief.md:17 "Pro price not stated" · publish.md:21 "(4,000+ apps)" · storyboard-reel.md:9 "over four thousand apps … Slack or Teams" and :14 "Pro and Business Premium … EU, UK, Switzerland" · qa.md:23 "4,000+" (all v1 leftovers) → rewrite those four files in this run (brief, publish, storyboard, qa); inspiration.md's "devday" search query and the Fireship "everything you missed" quote are analysis data, art-direction.md's lock list and the script's "nothing about … Teams" note are never-say contexts
improve:
- s02, s06, s09, s10, s11, s12, s16 <2>: name the object the verb acts on ("in the chat window", "the sheet (chat window)") so the running object is named in every row, not 65 %
```

### Applied
All seven row fixes and the naming improvements were applied to the Beats table and the catch build brief (s13's cue order and
"learned"; s06 spinner; s09 settle + underline; s10 "part"; s12 "things"; s16 "take"). brief.md, publish.md, storyboard-reel.md
and qa.md are rewritten in the same run (stages 6–8) without the flagged wordings. Linter: cue words still all spoken; running
object now in 16/17 rows.

### Pass 2 (revised plan): PASS
```
VERDICT: PASS
depth: 5/5 shown · running object: 94 % of beats (16/17 named; s17 shrinks it away) · none-rows: 0 · still: ~6 % (longest hold 1.3 s, s14 "delete" → "Chats") · cam: 15 moves ≈ 8.2/min · hook: self 19 / blind 18
blocking: none
improve:
- s11 <5>: the four Help Center labels are replica UI text (16 words inside the sheet), not an overlay; the storyboard's overlay cell for #11 must stay "none" so the 12-word screen budget holds (checked in storyboard mode)
- captions: b9, b10, b11 and b16 carry 13–15-word sentences; the engine's caption cards are ≤ 9 words (brand.md), so `/video-studio` must let the caption split at the commas, not force one card
```

**Depth mapping (content-plan Depth → rows → what moves)**
| Depth point | Row(s) | What moves |
|---|---|---|
| Between chats | s02, s04 | the clock COUNTS UP 3:00 → 7:00 and the review bubble SLIDES IN with no new message from you; the progress bar FILLS while the chat column DIMS |
| Its own computer | s05, s06, s07 | the computer pane SLIDES IN under the chat, the URL TYPES OUT, the code strip TYPES, the test run SCANS and COUNTS UP to "12 passed", the cursor FILLS the form |
| Goal → work → review | s04, s06, s08 | the goal TYPES OUT and the send button CLICKS; the "Investigating…" bubble; the "Review the fix" link lands on "review" and is CLICKED |
| The four rules and the floor | s10, s11, s12 | the rule TYPES OUT, the four slots FILL with the exact labels on their words, the password row SLIDES IN locked and SHAKES |
| The catch, in place | s13, s14 | the Slack toggle CLICKS OFF while the notes stay lit; the Reset dialog LIGHTS its three phrases and the window SHRINKS AWAY |

**Hook re-score (blind, from the line and the first-frame text only):** clarity 5 · curiosity 4 · accuracy 4 (an illustration of
OpenAI's own example; said so in beat 6) · first frame 5 = **18** vs self 19: no gap ≥ 3.

**Measured targets (estimated from the plan):** still ≈ 6 % (every row has 2–6 word cues and a continuous element: the blinking
colon, the spinner, the filling bar, the typing strips, the cursor), longest hold 1.3 s ≤ 1.5 · cam 15 moves in ≈ 110 s = 8.2/min
(6–10), each with a reason, home on every wipe; the two s13 moves are 2.7 s apart (≥ 2.5) · first second: the window is lit at frame 0,
the colon blinks from 0 s, the Slack card routes in at 0.3 s · the object survives every section (it shrinks and docks in s03, the
pane slides under it in s05, sheets open inside it in s09–s13, it shrinks into the avatar on Reset and returns in s15) · numbers
persist ("12 passed" chip s06–s09; "7:02 AM" receipts) · type: non-hero ≤ 58 px; giant type only on the hook (clock, "A DOT"),
the verdict ("ASK FIRST.") and the CTA · sound: a cue on every reveal (blip, tick, key, click, ding, pop, stamp, whoosh) · rule 11
(Launch): the Replica block is present with official sources, lifted fonts/colours, cut waits declared with "sped up" chips and a
rights line; every action beat names `cam` + `sfx` or "no cam" on purpose (s01 frame 0, s04 the whole desk, s12 the held frame).

**Rule 9 grep (2026-10-16, after the stage 6–8 rewrites):** `4,000 | 4000 | Teams | Pro | Business | Premium | EEA | EU | UK |
Switzerland | $ | Astra | DevDay | forgets | never makes | anything | everything | logo` across brief, hooks, script, storyboard,
animation plan, publish kit, qa: hits only in never-say contexts (the lock list in art-direction.md, the script's accuracy note, the
content plan's Leave-out table) and in analysis data (inspiration.md's search-query record and a quoted winner structure);
research.md keeps them in its source tables by design.

- [x] Visual plan passed (2026-10-16)

## Structure check · 2026-10-16
```
VERDICT: PASS
archetype: Launch · steps justified: no (none used) · why: the sections (What it is · How it works · You set the rules · The catch · My take) are story beats that could be reordered without breaking the logic, so they carry plain titles and a colour change: no numbers, no "of n", no progress bar.
findings:
- animation-plan.md section titles (s03, s05, s10, s13, s15) → keep (plain titles, unnumbered)
- animation-plan.md s11 four rule slots → keep: the script itself counts them ("There are four levels") and the screen shows four unnumbered rows with the Help Center's labels; no "1." / "2." on them
- animation-plan.md s09 profile tabs "In progress · Scheduled · Completed" → keep: the real UI's tabs, not a progress device
- animation-plan.md s04 / s08 progress bar under the composer → keep: the dot's task progress inside the replica (the UI's own state), not a chapter progress bar
- animation-plan.md s14 the three lit phrases (conversations / saved memories / scheduled tasks) → keep: the dialog's own sentence, lit on the spoken words, not a recap chain
- art-direction.md "Sections (Launch: plain titles, no numbers)" and the lock "no STEP n OF m, no progress bar, no numbered list" → keep
- storyboard-reel.md → its Section column must reuse these plain titles (re-checked in storyboard mode below)
- studio project: not built yet for v3 (the 2026-10-12 check of dots-flat / dots-glass / dots-spring / dots-v2 stands; the v3 build must not reuse their numbered chapter cards or progress UI)
```
- [x] Structure check passed (2026-10-16)

## Visual plan check · 2026-10-16 (storyboard mode)
```
VERDICT: PASS
depth: 5/5 shown · running object: 94 % of beats · none-rows: 0 · still: ~6 % (longest hold 1.3 s) · cam: 15 moves ≈ 8.2/min · hook: self 19 / blind 18
blocking: none
improve:
- #9–#11, #16 <captions>: 13–15-word sentences; the engine splits sentence captions at ≤ 9 words / commas after 5+ words (assemble.py), as the storyboard's note says; nothing to change in the script
```
Rule 10: the storyboard's 17 rows match the plan row for row: section titles (hook · What it is · How it works · You set the
rules · The catch · My take · CTA, same colours), every cue word of every plan row quoted in the board's visual cell, the same
verbs (the board writes PUSHES IN / SETTLING for the plan's PUSH IN / SETTLE); "Continuous spans" A–G listed, the dot window
carried through A–F. Rule 5: overlays 1–8 words per row (max 8: #3, #6), ≤ 12 on screen with the giant type (#3 "A DOT" + chip = 8;
#16 "ASK FIRST." + "earned" = 4); #11 and #14 keep the replica's UI text out of the overlay cell. Rule 8: nothing planned below
y 1460 or at x > 950 except the window's static right edge. Rule 9 re-grep across brief, hooks, script, storyboard, plan, publish,
qa: hits only in never-say contexts (the brief's user-rules and locks rows, the script's accuracy note, this plan's own findings).
Linter: storyboard overlays ✓, rows with tags 17/17 ✓; the one remaining ✗ is "animation plan: approved", pending the user.

## Visual plan check · 2026-10-27 (plan mode, after the s11 rewording, option b)
```
VERDICT: PASS
depth: 5/5 shown · running object: 19/20 rows (95 %) · none-rows: 0 · still: ≈ 5 % (longest hold ≈ 1.2 s) · cam: 10 moves in ≈ 2:05 (≈ 5/min on the stage, + the 6 wipes) · hook: self 19 / blind 18
blocking:
- none
improve:
- s13 <5>: the chip "waiting for your okay" is a sub-line inside the third slot (replica UI), not a free overlay; keep it ≤ 4 words
```
Scope: rows s11–s14 are new; s15–s20 are the old s12–s17 renumbered (verbs, cues, cam and sfx unchanged); s16's spoken line and
cue moved "learned" → "read" with the script. Rule 1: every new row has a vocabulary verb on the rules sheet (SLIDES, FILLS,
TYPES OUT, POPS, STAMPS) on a spoken cue. Rule 2: the rules sheet in the chat window is the object in all four rows; one slot
changes per beat, so the sheet keeps transforming (a continuous span, not a repeat). Rule 3: "The four rules and the floor" →
s10–s15: the four slots FILL one per beat with the exact labels, the password row SLIDES IN locked. Rule 4: cues four · top ·
asking / down · only · prompt / Next · first · okay / bottom · act · hands / s16 read: all in their script lines. Rule 5: the
labels and sub-lines are replica UI text; the chips are 3–4 words; ≤ 12 words of overlay on screen. Rule 6: s01 unchanged. Rule 7:
each new beat (9–15 words) has three cues ≈ 1.5–2.5 s apart. Rule 8: the slots sit at stage x ≈ 184–864, y ≈ 690–1040 under the
s11 push (capped at 1.28, edge-safe): inside the safe zone. Rule 9: grep (4,000 · 4000 · Teams · Pro · Business · Premium · EEA · EU
· UK · Switzerland · $ · Astra · anything · everything · forgets · never makes mistakes · "hand off" spoken) across brief, hooks,
script, storyboard, animation plan and publish kit: hits only in never-say contexts (brief user rules, script notes, this plan's
old findings) and "Hand off to you" as the on-screen label only. Rule 11: s11 names its cam; s12–s14 say "no cam" on purpose
(the push holds the four slots); every action names its sfx.

| Depth point | Row(s) | What moves |
|---|---|---|
| Between chats | s01, s02, s04 | the clock COUNTS UP, the chip TYPES Working… → Done, the review bubble SLIDES IN unasked |
| Its own computer | s05–s07 | the pane SLIDES IN, URL TYPES OUT, tests SCAN and COUNT UP |
| Goal → work → review | s04, s08 | the goal TYPES and sends, the Review link is CLICKED |
| The four rules and the floor | s10–s15 | one slot FILLS per level beat with its exact label; the password row SLIDES IN locked and SHAKES |
| The catch, in place | s16, s17 | the toggle CLICKS OFF while the notes stay lit; the Reset dialog lists what goes |

Hook re-score (blind): clarity 5 · curiosity 5 · accuracy 4 · first-frame 4 = 18 (self 19; gap 1).

## Structure check · 2026-10-27
```
VERDICT: PASS
archetype: Launch · steps justified: no (none used) · why: the sections are story beats; the four levels are a counted list the script itself announces ("There are four levels"), shown as four unnumbered rows with the Help Center labels, one per beat
findings:
- animation-plan.md s11–s14 four level beats → keep: a counted list (rule 2), not steps; "at the top / one step down / next / at the bottom" are positions on the list as the Help Center orders it, with no "1." / "STEP n OF 4", no progress bar
- storyboard-reel.md rows 11–14 → keep (no numbers on the rows)
- section titles (s03, s05, s10, s16, s18) → keep (plain, unnumbered)
- studio/projects/dots-v3/stage/stage.html → keep (grep STEP / chap / prog / "of 4": none)
```
- [x] Structure check passed (2026-10-27)

## Visual plan check · 2026-10-27 (storyboard mode)
```
VERDICT: PASS
blocking:
- none
```
Rule 10: storyboard rows 1–20 match the plan row for row: section titles (Hook · What it is · How it works · You set the rules ·
The catch · My take · CTA), the verbs (PUSHES IN / SLIDES / FILLS / TYPES OUT / POPS / STAMPS) and every cue word of rows s11–s14
and s16 quoted in the board's visual cell; "Continuous spans" list D = s10–s15, E = s16–s17, F = s18–s19, G = s20. Rule 5: overlay
cells ≤ 12 words ("waiting for your okay", "you do it", "what it read stays"). Rule 8: nothing planned below y 1460 or at x > 950.
Rule 9: as in plan mode. `--viewer-text` for rows 11–14 shows each level's exact label in its own beat.
- [x] Visual plan passed (2026-10-27)
