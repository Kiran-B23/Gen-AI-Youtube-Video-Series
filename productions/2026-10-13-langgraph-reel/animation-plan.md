# Animation plan · LangGraph

_For each beat: what the picture DOES to the running object, or "none". Each step is built as its own 4–10 s piece from
the standalone brief below._

**Running object:** the email chip "I was charged twice." and the state card that travels with it (fields `email`, `intent`,
`reply`, `approved`) · **Steps:** 01 Nodes · 02 Edges · 03 Checkpoints (Concept mechanism, numbered) · **House style:** reference-flat

**Fixed layout (s07–s19):** the switchboard. **Graph zone** y 250–880: six node pills (white on light / translucent on
blue-yellow, mono 40 px, 4 px ink border, ~300×110 px) in a two-row snake: row 1 at y 360 `read` (x 90–390) → `classify`
(x 390–690 … spaced 40 px apart) → `draft`; row 2 at y 720 `refund` ← `approve` ← `check` (right to left, so the path snakes
down at the right edge). Side pill `answer` above `classify` at y 260 (the question path). Loop arc from `check` back up to
`draft` on the right edge. **Save rail** y 895–945: a thin bar labelled `thread ID: email-1 · illustrative` where save tiles
drop. **State card** y 960–1440, x 72–1008: four rows (mono 44 px) `email:` · `intent:` · `reply:` · `approved:`, empty
values as a dim "—". Step counter "STEP 0n / 03" top-left (y 120–200), lit s07–s19 only.

## Hook direction (pick one, or write your own)
- **A (default, used):** the refund card already on screen at frame 0 ("Refund sent · $49 ✓", "approved by: ____" with a blinking
  empty slot, "illustrative"); giant "NOBODY APPROVED IT." SLAMS across it on "Nobody", and the empty slot flashes red.
- **B:** a looping arrow spins around a robot-free "agent" chip, faster and faster; it fires a refund card out of the loop with
  no stop on the way; "NO ONE SAID YES." TYPES OUT. (The loop first, then the consequence.)
- **C:** a split frame: top a refund button being pressed by a cursor labelled "agent", bottom an empty "Approve" button
  nobody touches, greyed; "WHO CLICKED THIS?" BUILDS WORD BY WORD.

## Beats
| Beat | Spoken line (short) | Section | What the picture does (motion verbs) | Word cues (beat words) | Block to adapt (registry, optional) |
|---|---|---|---|---|---|
| s01 hook | Your AI agent just refunded a customer. Nobody approved it. | dark | frame 0: the refund card (y 300–620) with "approved by: ____" blinking; "NOBODY APPROVED IT." SLAMS across y 780–1100 (Anton 170 px, yellow); the empty slot FLASHES red | refunded · Nobody · approved | headline-slam |
| s02 example | Here's the email it got. I was charged twice. | blue | WIPE to blue; the refund card SHRINKS AWAY up-right; an email card TYPES OUT "I was charged twice." centred (y 700), "illustrative" tag | email · charged · twice | code-typing |
| s03 foundation | Most agents are a loop… goes again until it's done | blue | the email SHRINKS to a chip; a ring BUILDS around it: `model` → `tool` → `result` nodes on a circle; a dot RACES round the ring once per clause ("picks", "reads", "again"); on "done" it exits to a `done` chip | loop · picks · reads · again · done | flowchart |
| s04 bridge | That loop keeps its progress in memory… code you'd write yourself | blue | a small "progress: in memory" bar FILLS beside the ring; on "Pausing" a pause ⏸ chip and on "restart" a ↻ chip POP with a "?" each; on "yourself" both chips get a hand-drawn bracket "your code" (internal change, 8 s) | memory · Pausing · restart · yourself | hw-callout-circle |
| s05 concept | LangGraph is an open-source framework… that graph can stop, and pick up again | dark | WIPE to navy; the ring UNROLLS into a straight row of node pills (the same agent, now as a graph); "LangGraph" TYPES OUT above (Anton 150 px); on "stop" the row FREEZES grey; on "pick up" it lights again left to right | LangGraph · graph · stop · again | kinetic-center-build |
| s06 cast | Three pieces. Nodes, edges, and checkpoints… run the email through | dark | three labels STAMP in a column on their words: NODES (on a pill), EDGES (on an arrow), CHECKPOINTS (on a save tile); on "email" the email chip SLIDES in at the left of the row | Nodes · edges · checkpoints · email | |
| s07 step 1 | Step one, the nodes… like read, classify, or draft | light | chapter card "STEP 1 OF 3 / 01 Nodes" (~1 s); the switchboard on light: `read`, `classify`, `draft` BUILD one per word; the rest of the graph is ghosted | one · read · classify · draft | |
| s08 step 1 | They all share one state, a card that travels with the email | light | the state card BUILDS under the graph (y 960–1440) with four empty fields; the email chip DOCKS onto the card's top edge (they now move together) | share · state · card · email | |
| s09 step 1 | Read fills in the email. Classify writes refund. Draft writes the reply. | light | the chip + card ROUTE `read` → `classify` → `draft`; at each node the matching field FILLS: `email: "I was charged twice."`, `intent: refund`, `reply: "Sorry! Refund on its way."` (TYPES OUT) | email · refund · reply | |
| s10 step 1 | Each node reads the card, and writes back only its part | light | replay at speed on `draft`: a scan line SCANS the whole card (reads), then only the `reply` row highlights blue (writes); the other rows stay dim | reads · only · part | marker-highlight |
| s11 step 2 | Step two, the edges. Edges decide what runs next. | yellow | chapter card "STEP 2 OF 3 / 02 Edges"; counter 02 / 03; the edges between the pills DRAW (ink lines, arrowheads) | two · edges · next | |
| s12 step 2 | A conditional edge reads the card… takes the refund path | yellow | rewind: chip + card back at `classify`; a lever icon on its out-edge; a scan reads `intent: refund`; the lever FLIPS toward `draft`; the `answer` path DIMS; the chip ROUTES on | conditional · reads · refund · path | |
| s13 step 2 | And edges can loop back. The check finds no amount in the draft. | yellow | the chip ROUTES `draft` → `check`; the loop arc `check → draft` DRAWS on the right edge; `check` SCANS the reply: "✕ no amount" STAMPS red | loop · check · amount | |
| s14 step 2 | So the email goes back to draft, gets fixed, and passes | yellow | the chip LOOPS along the arc back to `draft`; the `reply` field RETYPES to "Sorry! Your $49 refund is on its way."; chip ROUTES to `check` again: ✓ green STAMPS | back · fixed · passes | success-check |
| s15 step 3 | Step three, the checkpoints… after every step, it saves where it is | blue | chapter card "STEP 3 OF 3 / 03 Checkpoints"; counter 03 / 03; the save rail BUILDS; a quick replay: one save tile DROPS onto the rail per node passed so far (read, classify, draft, check, draft, check: six tiles, 0.3 s apart), each a mini copy of the card | three · checkpointer · every · saves | |
| s16 step 3 | Now the email reaches approve… the whole graph stops | blue | chip ROUTES `check` → `approve`; PUSH IN on `approve`; an `interrupt()` tag STAMPS on it; on "stops" everything FREEZES (graph greys, music dips); "PAUSED." STAMPS (Anton 200 px) | approve · interrupt · stops | |
| s17 step 3 | Everything's saved under a thread ID… waits until someone answers | blue | a seventh save tile DROPS with a lock glyph; the rail label "thread ID: email-1" HIGHLIGHTS; a wait ring SPINS on `approve`; a tiny clock beside it FAST-FORWARDS (hours pass, no number) | saved · thread · waits · answers | |
| s18 step 3 | You tap approve. It resumes from that step, with the same card. | blue | an Approve button SLIDES UP beside the node; a tap ripple; `approved: you` FILLS on the card; the graph UNFREEZES from `approve` (not from `read`); the last save tile glows "resumed" | tap · resumes · same | |
| s19 step 3 | Then the refund goes out. Approved by you. | blue | chip ROUTES `approve` → `refund`; the hook's refund card POPS out of `refund`, now "approved by: you" with a green tick: the hook's frame, earned | refund · Approved · you | |
| s20 catch | Now, here's the catch. On resume, the paused step runs again from its top. | dark | WIPE to navy; the switchboard SHRINKS to the `approve` node, opened up as a code card (mono 40 px, illustrative): `send_email("We're on it")` · `ok = interrupt(…)` · `return …`; a run pointer RUNS top to bottom, stops at `interrupt`, then on "again" JUMPS back to line 1; "IT RUNS AGAIN FROM THE TOP." STAMPS | catch · resume · again · top | code-typing |
| s21 catch | So if it emailed the customer before the pause… could go out twice | dark | on the second pass `send_email` fires again; two envelopes ✉ ✉ FLY out to a customer inbox chip; the inbox shows "2" in red | emailed · before · twice | |
| s22 fix | Put actions after the approval, or in their own node. | dark | the `send_email` line SLIDES below `interrupt`; replay: pointer stops, resumes, one envelope only; then a second option: the line LIFTS OUT into its own pill node `notify` after `approve` | after · own · node | |
| s23 when (1/2) | You don't need LangChain to use it… built on top of LangGraph | light | WIPE to light; two plain-text blocks: "LangGraph" alone STANDS (on "don't need"); then a "LangChain agents" block STACKS on top of it (on "built on top") | LangChain · need · top | |
| s24 when (2/2) | For a simple agent, start with those… reach for LangGraph | light | a two-row decision card BUILDS: "simple agent → LangChain's prebuilt agent" ✓; then "your own branches · loops · approval steps → LangGraph" with three mini icons (switch, arc, pause) POPPING on their words | simple · branches · loops · approval · LangGraph | comparison-split |
| s25 recap | Nodes. Edges. Checkpoints. It saves after every step, so it can wait for your OK. | yellow | recap chain "01 NODES → 02 EDGES → 03 CHECKPOINTS" BUILDS on each word, the mini email card riding along; save tiles DROP under it on "every step"; "approved by: you" STAMPS on "OK" | Nodes · Edges · Checkpoints · saves · OK | |
| s26 CTA | What should I explain next? Tell me below. | dark | the question BUILDS WORD BY WORD; "Follow for more AI breakdowns" pill SLIDES UP; last frame navy like frame 0 (loop) | What · next | |

## Build briefs (one per step; each can be built in parallel)
### Hook → concept · s01–s06 (~34 s, three pieces: s01–s02, s03–s04, s05–s06)
Navy frame 0: refund card at y 300–620 (mono 44 px: "Refund sent · $49 ✓", "approved by: ____" blinking, "illustrative").
On "Nobody" (s01) "NOBODY APPROVED IT." slams across y 780–1100 (Anton 170 px yellow), the blank flashes red. s02 wipes to
blue; the refund card shrinks away up-right, the email card types "I was charged twice." at y 700. s03: the email shrinks to a
chip; a ring of three pills (`model`, `tool`, `result`) builds around it at y 450–1150, a dot races the ring once per clause and
exits to `done`. s04: "progress: in memory" bar fills at y 1250; ⏸ and ↻ chips pop with "?" on "Pausing"/"restart"; a
hand-drawn bracket "your code" on "yourself". s05 wipes to navy: the ring unrolls into a straight row of pills, "LangGraph"
types out at y 300; on "stop" the row greys, on "again" it re-lights left to right. s06: NODES / EDGES / CHECKPOINTS stamp
in a column; the email chip slides in at the left. Exit state: navy, row of pills, email chip at the left.
### Step 01 · Nodes (s07–s10, ~18 s)
Entry: light, chapter card first (~1 s), then the fixed switchboard layout (see top) with the graph ghosted. `read`,
`classify`, `draft` build on their words; the state card builds under the graph (four empty fields); the email chip docks onto
it. The chip + card route read → classify → draft; fields fill on "email", "refund", "reply" (values typed, mono 44 px). s10:
on `draft`, a scan sweeps the whole card on "reads", then only `reply` highlights on "only". Exit: card with three fields
filled, chip at `draft`. Nothing moves the graph or card positions.
### Step 02 · Edges (s11–s14, ~18 s)
Entry: as step 01 left it, on yellow; chapter card first. Edges draw between pills on "edges". Rewind the chip to `classify`;
a lever on its out-edge flips toward `draft` on "refund"; `answer` dims. Chip routes to `check`; the loop arc draws on "loop";
"✕ no amount" stamps red on "amount". Chip loops along the arc to `draft` on "back"; `reply` retypes with the amount on
"fixed"; chip routes to `check`, ✓ stamps on "passes". Exit: chip at `check`, card complete except `approved`.
### Step 03 · Checkpoints (s15–s19, ~25 s)
Entry: as step 02 left it, on blue; chapter card first. The save rail builds; six save tiles drop (0.3 s apart) on "every
step"/"saves". Chip routes to `approve` on "approve"; push-in; `interrupt()` tag stamps on "interrupt"; on "stops" the whole
frame freezes grey (music dips) and "PAUSED." stamps. s17: a seventh tile with a lock drops on "saved"; "thread ID: email-1"
highlights on "thread"; a wait ring spins, a small clock fast-forwards on "waits". s18: Approve button slides up, tap
ripple on "tap"; `approved: you` fills; the graph unfreezes from `approve` only, on "resumes". s19: chip routes to `refund`;
the hook's refund card pops out with "approved by: you" ✓ on "you". Lock: refund never fires before the tap.
### The catch → fix · s20–s22 (~14 s)
Navy. The graph shrinks to the `approve` node, which opens into a code card (illustrative, mono 40 px, three lines). A run
pointer runs to `interrupt` and stops; on "again" it jumps back to line 1 ("IT RUNS AGAIN FROM THE TOP." stamps). s21: on the
second pass `send_email` fires again; two envelopes fly to an inbox chip that reads "2" in red on "twice". s22: the
`send_email` line slides below `interrupt` on "after", replay shows one envelope; then the line lifts out into its own pill
`notify` after `approve` on "own node".
### When you need it → recap → CTA · s23–s26 (~22 s)
Light: "LangGraph" block stands alone on "don't need"; a "LangChain agents" block stacks on top of it on "built on top". s24:
the two-row decision card builds; switch / arc / pause icons pop on "branches" / "loops" / "approval". Wipe to yellow: recap
chain 01 NODES → 02 EDGES → 03 CHECKPOINTS builds on each word, the mini card riding along; tiles drop on "every step";
"approved by: you" stamps on "OK". Wipe to navy for the CTA (builds word by word, follow pill).

## Approval
- [x] Structure check passed (2026-10-13) (structure-check agent)
- [x] User approved the plan (or the default was used because the user said to go ahead): 2026-10-13 · the user said "go ahead"; defaults used without stopping: hook direction A, all beats as planned (the user can still pick B or C before `/video-studio`) · user replied "approve" to the finished package (hook direction A, all defaults), 2026-10-13

## Structure check · 2026-10-13
```
VERDICT: PASS
archetype: Concept · steps justified: yes · why: the email literally travels the graph in order (nodes fill the card → edges route it, incl. the check→draft loop → the checkpoint pauses it at approve), so step k needs step k-1 and no two steps can swap
findings:
- script-reel.md #7/#11/#15, storyboard rows 7/11/15, animation-plan s07/s11/s15 chapter cards "STEP n OF 3 / 0n …" → keep (spoken "Step one/two/three" matches; 3 = archetype max)
- animation-plan line 15, storyboard line 6 step counter "STEP 0n / 03", lit s07–s19, fades at s19 → keep (covers exactly the three steps; off for the catch, when-you-need-it, recap)
- script-reel.md #6 / animation-plan s06 cast list NODES · EDGES · CHECKPOINTS → keep (script says "Three pieces"; count 3 matches)
- script-reel.md #25 / animation-plan s25 recap chain "01 NODES → 02 EDGES → 03 CHECKPOINTS" → keep (summarises the three steps actually shown)
- s20–s24 (catch, fix, when you need it) → keep unnumbered (story beats, plain titles + colour change, correct)
```
Swap test: edges with nodes breaks (edges connect nodes); checkpoints before edges breaks (the s15 save-tile replay includes the s13–s14 loop, and the email reaches `approve` only via the edges). It is also the real build order (`add_node` → `add_edge`/`add_conditional_edges` → `compile(checkpointer=…)`).
