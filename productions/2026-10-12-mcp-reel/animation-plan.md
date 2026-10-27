# Animation plan · How MCP works

_For each beat: what the picture DOES to the running object, or "none". Each step is built as its own 4–10 s piece from
the standalone brief below._

**Running object:** the question card "Will it rain in Tokyo tomorrow?" (with the menu, the note and the answer that attach to it) · **Steps:** 01 The menu · 02 The note · 03 The call (Concept mechanism, numbered) · **House style:** reference-flat

**Fixed layout (all steps):** the relay desk. Three stations stacked in the visual zone, x 72–1008: MODEL card at y 250–520,
APP card at y 640–960, SERVER card at y 1080–1300, a grey "weather service" box at y 1340–1440. Two lanes connect
APP↔MODEL and APP↔SERVER. Between MODEL and SERVER: a hatched **gap** with no wire (lock).

## Hook direction (pick one, or write your own)
- **A (default, used):** the answered chat already on screen (question + "Yes, pack an umbrella."), and giant "IT CAN'T SEE THE WEATHER." SLAMS across it; on "how" a "?" STAMPS onto the reply bubble.
- **B:** a weather icon locked behind glass; the model chip bumps into the glass twice; "IT CAN'T SEE THIS." types out.
- **C:** a split frame: top "MODEL" with an empty forecast panel (dashes), bottom the same panel filled with rain; "SO WHO FILLED THIS IN?" builds word by word.

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | Block to adapt (registry, optional) |
|---|---|---|---|---|---|
| s01 hook | An AI model can't check the weather… going to rain? | dark | answered chat on screen at frame 0; "IT CAN'T SEE THE WEATHER." SLAMS in (Anton 170 px, yellow); "?" STAMPS on the reply bubble | weather · how · rain | headline-slam, chat-message |
| s02 example | Here's the question… Tokyo tomorrow? | blue | WIPE to blue; the chat SHRINKS AWAY, only the question card stays and TYPES OUT again, centred | question · Tokyo · tomorrow | code-typing |
| s03 foundation | On its own, a model has no live data… can't see tomorrow | blue | the MODEL card BUILDS above the question; a "training data" shelf of grey chips FILLS behind it, a calendar strip ends at a hard edge; "tomorrow" chip bounces off the edge | own · training · tomorrow | |
| s04 twist | here's the twist… never calls the weather service itself… Not once | dark | WIPE to navy; the SERVER card + weather box BUILD at the bottom; PUSH IN on the empty gap between MODEL and SERVER; "NEVER CALLS IT." STAMPS in the gap | twist · never · once | |
| s05 concept | The app makes that call, using MCP | blue | the APP card BUILDS in the middle, between the two; two lanes DRAW from APP up and down; "MCP" label STAMPS on the lower lane, "Model Context Protocol" TYPES OUT under it | app · MCP · Protocol | flowchart |
| s06 cast | Three players… a program that wraps a real tool | blue | each station PULSES on its word with a mono label: "APP · host + MCP client", "MODEL", "MCP SERVER · wraps a tool"; the question card SLIDES into the APP card and stays there | app · model · server · tool | |
| s07 step 1 | Step one, the menu… what can you do? | light | chapter card "STEP 1 OF 3 / 01 The menu" (1 s), the desk returns on light; a `tools/list` chip ROUTES down the lower lane from APP to SERVER | one · menu · asks · do | |
| s08 step 1 | The server sends back its tools… a city and a date | light | a menu card (3 rows: `get_forecast`, `get_alerts`, `find_city`, illustrative) ROUTES up to APP; the `get_forecast` row EXPANDS to show `city · date` inputs; label "illustrative" | tools · forecast · city · date | |
| s09 step 1 | The app slides that menu in front of the model… | light | the menu card + the question card ROUTE up the upper lane together and land side by side inside MODEL | slides · model · question | |
| s10 step 2 | Step two, the note… picks the forecast tool | yellow | chapter card "STEP 2 OF 3 / 02 The note"; a scan line SCANS the menu inside MODEL; the menu SLICES to the one picked row `get_forecast` (others fade) | two · note · reads · picks | marker-highlight |
| s11 step 2 | But it doesn't run it… Get forecast, Tokyo, tomorrow | yellow | a "run ▶" button on the row greys out with a ✕ ("doesn't run"); a white note card TYPES OUT `{"name":"get_forecast","arguments":{"city":"Tokyo","date":"tomorrow"}}` key by key | doesn't · note · Tokyo · tomorrow | code-typing |
| s12 step 3 | Step three, the call… sends it to the server | blue | chapter card "STEP 3 OF 3 / 03 The call"; the note ROUTES down from MODEL to APP, gets a `tools/call` tag, then ROUTES down to SERVER (never across the gap) | three · call · note · server | |
| s13 step 3 | The server asks the real weather service… result back | blue | SERVER pings the weather box (a pulse runs down and back); a result chip "rain likely · illustrative" ROUTES up to APP | asks · weather · back | |
| s14 step 3 | The app hands it to the model… pack an umbrella | blue | the result ROUTES up to MODEL; the reply bubble "Yes, pack an umbrella." BUILDS WORD BY WORD under the question card: the hook's frame, now earned | hands · answers · umbrella | |
| s15 why | So why a standard? Before MCP… custom code for every tool | light | the desk SHRINKS AWAY to a chip; a 4×4 grid: 4 apps (rows) × 4 tools (cols), every cell FILLS with a red "custom code" tile one by one (16 tiles) | standard · Before · every · every | |
| s16 why | Now each tool needs one MCP server… apps that speak MCP can plug it in | light | the 16 tiles collapse: each tool gets one "MCP" plug; one line per app RACES to a shared MCP rail (4 + 4 connections instead of 16) | Now · one · plug | |
| s17 why | Anthropic says ChatGPT, Gemini, Copilot and VS Code use it… the same post counted over 10,000 public MCP servers | light | four plain-text app chips POP onto the rail; "10,000+" COUNTS UP (Anton 280 px) with "public MCP servers" under it | ChatGPT · VS Code · 10,000 | count-up |
| s18 catch | Now, here's the catch. The model believes the menu | dark | WIPE to navy; the menu card from step 1 returns; "THE MODEL BELIEVES THE MENU." STAMPS | catch · believes · menu | |
| s19 catch | A bad server can hide instructions in a tool's description. You might not see them. | dark | inside one menu row's grey description a hatched/redacted line SLIDES in (unreadable on purpose); a user-view panel beside it shows the same row truncated, the hidden line cut off | bad · hide · description · see | |
| s20 catch | But the model reads them, and it may follow them. | dark | a scan line SCANS the full description inside a mini MODEL card; a thin red arrow DRAWS from the hidden line into the MODEL, which TINTS red | reads · follow | |
| s21 takeaway | So install only servers you trust. And check what a tool will send before you approve it. | dark | row "✓ install servers you trust" BUILDS; a call preview card (`get_forecast · city: Tokyo · date: tomorrow`) SLIDES in with an "Approve" button that PULSES | trust · check · approve | |
| s22 takeaway | And never auto-approve every tool. | dark | a third row: an "Allow all tools" toggle STAYS OFF and a ✕ STAMPS on it | never · every | |
| s23 recap | Menu. Note. Call. The model decides, and the app does | yellow | recap chain: "01 MENU → 02 NOTE → 03 CALL" BUILDS on each word, the mini question card riding along; "model decides · app does" STAMPS | Menu · Note · Call · decides · does | |
| s24 CTA | What should I explain next? | dark | the question BUILDS WORD BY WORD; "Follow for more AI breakdowns" pill SLIDES UP; the last frame is navy like frame 0 (loop) | What · next | |

## Build briefs (one per step; each can be built in parallel)
### Hook · s01–s06 (~33 s, three pieces: s01, s02–s03, s04–s06)
Navy frame 0: a chat card at y 300 (question, mono 44 px) and the reply bubble at y 520 ("Yes, pack an umbrella."). On
"weather" (s01) "IT CAN'T SEE THE WEATHER." slams across y 800–1100 in Anton 170 px yellow; on "how" a yellow "?" stamps
on the reply. s02 wipes to blue; the chat shrinks, the question card retypes at y 760. s03: MODEL card builds at y 250–520;
grey chips fill a shelf inside it; a calendar strip with a hard right edge; the "tomorrow" chip bounces off it. s04 wipes
to navy: SERVER + weather box build at the bottom, push-in on the hatched gap, "NEVER CALLS IT." stamps there. s05–s06
on blue: APP builds in the middle, the two lanes draw, "MCP" stamps on the lower lane; the three labels pulse on their words;
the question card ends parked inside APP. Exit state: the full desk on blue, question card in APP.
### Step 01 · The menu (s07–s09, ~17 s)
Entry: the desk (as the hook left it) on light; chapter card first (~1 s). `tools/list` chip routes APP→SERVER on "asks";
the menu card (white, 4 px ink border, three mono rows, each with a grey one-line description that underlines on "description", "illustrative" tag) routes SERVER→APP on "tools"; the
`get_forecast` row expands to `city · date` on "city"/"date"; on "slides", menu + question route APP→MODEL together.
Exit: menu and question side by side inside MODEL. Nothing ever crosses the gap.
### Step 02 · The note (s10–s11, ~11 s)
Entry: MODEL holds menu + question, on yellow; chapter card first. A scan line sweeps the menu on "reads"; on "picks" the
other rows fade and the `get_forecast` row stays (slice). On "doesn't" a run ▶ button greys with ✕. On "note" a white note card
types the JSON key by key (mono 40 px, wraps inside x 120–960). Exit: the note card under the question in MODEL.
### Step 03 · The call (s12–s14, ~16 s)
Entry: as step 2 left it, on blue; chapter card first. The note routes MODEL→APP ("note"), gets a `tools/call` tag, routes
APP→SERVER ("server"); a pulse runs SERVER→weather box→SERVER ("weather"); the result chip routes SERVER→APP→MODEL ("back",
"hands"); the reply bubble builds word by word on "umbrella". Exit: the hook's answered chat, recreated inside the desk.
### Why a standard · s15–s17 (~17 s)
Light. The desk shrinks to a corner chip. 4×4 grid (apps × tools), 16 red tiles fill one per ~0.15 s on "every … every";
on "Now" they collapse into 4 tool plugs + 4 app lines racing to one MCP rail; app names pop as plain mono text; 10,000+
counts up on "10,000". Exit: rail + number.
### The catch → takeaway · s18–s22 (~21 s)
Navy. The menu card returns; the verdict stamps; a hatched redacted line slides into one description (never readable text);
a user-view panel shows the same row truncated (the viewer can't see the hidden line); a scan reads it inside a mini MODEL card and an arrow draws in, the card tints red; then the protections build: trusted servers, a call preview with Approve, and an "Allow all tools" toggle that stays off.
### Recap → CTA · s23–s24 (~7 s)
Yellow recap chain built on "Menu / Note / Call", the mini question card riding along; "model decides · app does" stamps;
wipe to navy for the CTA (builds word by word, follow pill).

## Approval
- [x] Structure check passed (2026-10-12)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-12 · user replied "Approve" to the finished plan (hook direction A, all defaults); first pass used the defaults under "go ahead" · user replied "approve" again to the revised 24-beat script after the content-plan and script-review gates (2026-10-12)

## Structure check · 2026-10-12
```
VERDICT: PASS
archetype: Concept (secondary: none) · steps justified: yes · why: menu → note → call is the protocol's own ordered flow (tools/list → model emits the tool call → tools/call → result); the note can only pick from the menu and the call can only carry the note, so no two steps can swap.
findings:
- script-reel.md:18, 21, 23 (#7, #10, #12) · voice says "Step one / two / three" → keep (on-screen count of 3 matches the script)
- animation-plan.md:31, 34, 36 (s07, s10, s12) · chapter cards "STEP 1/2/3 OF 3" + 01-03 The menu / The note / The call → keep (each lands on the spoken "Step n" line; 3 is within the Concept max of 3)
- animation-plan.md:6 + Build briefs "Step 01-03" · numbered mechanism steps → keep
- animation-plan.md:40 (s21) + script-reel.md:32 (#21) · recap chain "01 MENU → 02 NOTE → 03 CALL" → keep (summarises exactly the three steps shown; use one numeral style, "01/02/03" or "1/2/3", in both files)
- animation-plan.md:38-39 (s18-s19 catch), s15-s17 (why a standard), s20 takeaway · unnumbered story beats after the mechanism → keep (correctly outside the step count; no "Step 4", no card numeral)
- art-direction.md:13 · benchmark "STEP 0n / 03" counter + segment bar → keep if built (optional); it must have 3 segments, light only during s07-s14, and be hidden in the hook, why-a-standard, catch, recap and CTA
- storyboard-reel.md · still the blank template → re-run this check on the storyboard and stage (studio/projects/<slug>/) once written
```

## Structure check · 2026-10-12 (re-check: 24-beat script, storyboard written)
```
VERDICT: PASS
archetype: Concept (secondary: none) · steps justified: yes · why: still the protocol's ordered flow menu (tools/list) → note (model writes the call) → call (tools/call → result). Each step needs the one before it, and the new catch/takeaway beats sit outside the step count.
findings:
- script-reel.md:16, 19, 21 (#7, #10, #12) · voice "Step one / two / three" + on-screen "STEP n OF 3 · 0n THE …" → keep (count of 3 matches the script)
- storyboard-reel.md:19, 22, 24 (s07, s10, s12) + animation-plan.md:26, 29, 31 · chapter cards "STEP 1/2/3 OF 3" + 01-03 The menu / The note / The call → keep (each lands on its spoken "Step n" line)
- storyboard-reel.md:5, 19, 22, 24, 26 · step counter "STEP 0n / 03" (3 segments), lit s07-s14, fades out at s14 → keep (hidden in the hook, why a standard, catch, takeaway, recap and CTA)
- storyboard-reel.md:35 (s23) + animation-plan.md:42 + script-reel.md:32 · recap chain "01 MENU → 02 NOTE → 03 CALL" → keep (sums up exactly the three steps shown; numeral style now matches in all three files)
- storyboard-reel.md:30-34 (s18-s22) + animation-plan.md:37-41 · catch + takeaway (reused step-1 menu card, three unnumbered protection rows) → keep (no numerals, no "Step 4", no "of n"; the script doesn't count the protections, so nothing to match)
- storyboard-reel.md:27-29 (s15-s17) · why a standard (grid → rail, 10,000+ count-up) → keep (a data number, not a step device)
- stage not built yet → re-check chapter cards, the counter and the recap in /video-studio (studio/projects/<slug>/stage/*)
```
