# Package · LangGraph reel

_For the editor: brief, chosen hook, script, storyboard and publish kit in one file. Gates: content plan READY, script review PASS, structure check PASS, user approved (2026-10-13)._


---

# Brief · LangGraph

| | |
|---|---|
| Topic | LangGraph: what it is and how it works |
| Format(s) | reel (9:16, faceless) · default, the user gave only "Langgraph reel" |
| Viewer | global tech audience · level: curious practitioner (default; has built or seen a simple LLM agent / tool-calling loop, has heard "LangGraph", doesn't know what the graph adds) |
| **Viewer's question** | "What is LangGraph, and what does it give my agent that a plain loop doesn't?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" / a framework whose value is a mechanism: state, nodes, edges, checkpoints); not Launch (v1 is a year old, nothing new is the story), not Tutorial (no imperative "build X"), not Comparison (no second tool named). Foundation-first variant: the viewer half-knows the agent loop → why a loop isn't enough → the graph → the reveal (it saves after every step, so it can pause and resume). → **confirmed after YouTube analysis: Concept** is used by 4 of 6 winners (LangChain-in-2-min, the 8-minute beginner guide, ByteMonk's stack breakdown, the maker's own talk); the other 2 are Comparisons riding the "vs LangChain / which framework" intent, which gets one line (the relationship, the right way round) inside an existing beat, not a beat sheet. The gap (nobody shows the checkpoint, the pause and the resume on one input) is a mechanism gap that the Concept sheet's `[ANIMATE]` steps fill |
| **Tone (voice style)** | Curious and delighted, like revealing how a magic trick is done: calm teaching read (~2.4–2.6 w/s), brisk on the steps, slow on the reveal (the pause-and-resume) and on any catch. |
| Must include | (provisional; content-plan decides) the plain agent loop as the foundation; state, nodes and edges shown on one running example; a conditional edge and a loop; the checkpoint + human approval (pause, resume); when you don't need it |
| Running example | one support email, "I was charged twice", handled by a refund agent (illustrative; same shape as the docs' own support-email agent [S9]) |
| Angle (one sentence) | Follow one refund email ("I was charged twice") through a LangGraph agent, and show the part nobody draws: after every step the graph saves where it is, so it can stop for a human's OK and resume from that step with the same state. |
| Chosen hook | "Your AI agent just refunded a customer. Nobody approved it." (hooks.md #1, 19/20; first frame: a refund card "approved by: ____" + giant "NOBODY APPROVED IT.", illustrative) |
| Runtime target | ~110–125 s (~300–330 words ÷ 2.7), a long Short at benchmark depth with re-hooks every 30–40 s; the winning Shorts run 90–138 s at 2.8–3.2 w/s, the house benchmark 2–3 min at ~2.3 w/s |
| Open questions / unverified | Node names and the email are illustrative. Production users (Uber, LinkedIn, Klarna…) are a company claim. Download/star counts disagree between sources: not used. |

## Locks (must never appear)
- No logos (LangChain parrot, any company): product names as plain text only.
- No outdated API (no `MessageGraph`, no pre-1.0 imports); code on screen uses `StateGraph`, `add_node`, `add_edge`, `add_conditional_edges`, `compile`, `interrupt` (v1 docs).
- No download or star numbers (sources disagree); no number without a source.
- No sources on screen; illustrative code and email are labelled "illustrative".
- No line from any watched video; no real customer data (the email is invented).

---

# Hooks · LangGraph

Archetype Concept (foundation-first) → formulas #1 paradox, #14 myth-buster, #18 one-line definition, #2 striking number (plus
the house rule "open on the failure", #6 story cold-open, and #7 to compare).
Bar to beat (inspiration.md): the winners open by naming the tool over a black frame or a meme (#1), a vendor homepage (#2) or
a presenter (#3–#6); the low performers open on "welcome back" (#7) or stock footage (#8). None opens on a concrete moment, and
none works on mute.
Checked against the user's reference lines (tokenization reel: "It only reads numbers."; MCP reel: "An AI model can't check the
weather."): no echo.

| # | Formula | Hook line | First frame | Clarity | Curiosity | Accuracy | Frame | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | open on the failure (#6 cold-open + #1 paradox) | "Your AI agent just refunded a customer. Nobody approved it." | A refund toast "$49 REFUNDED ✓" on navy; under it a field "approved by:" with an empty, blinking slot; giant "NOBODY APPROVED IT." | 5 | 5 | 4 | 5 | 19 |
| 2 | #1 paradox (the foundation) | "Your AI agent is just a loop. Restart the server, and it forgets everything it was doing." | A `while True:` loop spinning; a power icon blinks; the loop's progress bar snaps back to 0 | 4 | 4 | 4 | 4 | 16 |
| 3 | #18 one-line definition | "LangGraph turns your AI agent into a map with save points." | A transit-style map of nodes with a save icon on each station | 4 | 3 | 4 | 4 | 15 |
| 4 | #14 myth-buster | "LangGraph isn't built on LangChain. It's the other way round." | Two stacked blocks flipping order | 3 | 4 | 4 | 3 | 14 |
| 5 | #1 paradox | "The smartest thing an AI agent can learn is how to stop." | A big STOP sign made of graph nodes | 3 | 4 | 4 | 3 | 14 |
| 6 | #2 striking number | "One email. Six steps. Six save points." | "1 → 6 → 6" in giant mono | 3 | 3 | 4 | 3 | 13 |
| 7 | #7 question the viewer has | "What does LangGraph give your agent that a plain loop doesn't?" | The question in giant type | 5 | 3 | 5 | 3 | 16 |

**Pick:** #1 (19/20). It opens on the failure the video exists to prevent (the house rule: open on the failure, works on mute), it's
concrete money in front of the viewer, and the whole video pays it off: the same refund toast returns at the end of step 3 with
"approved by: you". Accuracy is 4, not 5, because the moment is a hypothetical: the line says "your AI agent" (a plain loop
agent) and the toast is labelled illustrative. #2's idea (a loop forgets on restart) becomes the foundation/bridge beats, so
the hook stays its own moment (Concept foundation-first rule). #4 is true only with nuance (LangChain's *agents* run on LangGraph):
it moves to a one-line aside. #7 is clear but every winner already asks it.

**First frame (described):** navy. A white notification card (mono 44 px) top-centre: "Refund sent · $49 ✓" (green tick), and
under it a mono field "approved by: ____" with a blinking cursor in the empty slot. Across the middle, giant Anton
"NOBODY APPROVED IT." in yellow, "NOBODY" underlined. A small "illustrative" tag. Readable on mute in under a second.

**How the video pays it off:** the email that caused the refund appears in beat 2; steps 1–3 show the graph that handles it;
in step 3 the graph stops at the approval node, saves, waits, and resumes when a person clicks Approve; the refund card returns
with "approved by: you". The recap repeats "nodes, edges, checkpoints".

---

# Reel script · LangGraph

**Archetype:** Concept (standard "how X works" sheet, foundation-first opening, expanded to benchmark depth) · **Viewer's question:** "What is LangGraph, and what does it give my agent that a plain loop doesn't?" · **Running example:** one support email, "I was charged twice.", handled by a refund agent (`read → classify → draft → check → approve → refund`, illustrative; same shape as the docs' support-email agent [S9])
**Tone:** curious and delighted, like showing how a magic trick is done; calm teaching read, brisk on the steps, slow on the pause (the reveal) and on the catch · **Words:** 355 · **Est. runtime:** 131 s (÷2.7) · **Winners' range:** winning Shorts 90–138 s at 2.8–3.2 w/s; house benchmark 2–3 min at ~2.3 w/s

_Rows = the Concept reel beat sheet: Hook → The example → Mechanism 1 → Mechanism 2 (+ the 3rd) → Why it matters to you → Takeaway → CTA, with the foundation-first opening (foundation → bridge → the concept), the content plan's material catch after step 3, and the benchmark's recap card. Three mechanism steps (the archetype's maximum). Beats over 6 s (#3, #4) name an internal visual change in the storyboard (long reel rule). Follows content-plan.md (2026-10-13), including its safe wording._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–4 s | [urgent] Your AI agent just refunded a customer. [beat] Nobody approved it. | 10 | `[TITLE]` | NOBODY APPROVED IT. | [S5] |
| 2 | The example | 4–7 s | Here's the email it got. [beat] I was charged twice. | 9 | `[ANIMATE]` | "I was charged twice." (illustrative) | [S9] |
| 3 | Foundation | 7–14 s | Most agents are a loop. The model picks a tool, reads the result, and goes again until it's done. | 19 | `[ANIMATE]` | model → tool → result → repeat | [S8] |
| 4 | Bridge (why a loop isn't enough) | 14–22 s | That loop keeps its progress in memory. [beat] Pausing for hours, or carrying on after a restart? That's code you'd write yourself. | 21 | `[ANIMATE]` | progress: in memory | framing |
| 5 | The concept | 22–30 s | LangGraph is an open-source framework for building that same agent as a graph. [slow down] And that graph can stop, and pick up again. | 22 | `[TITLE]` | LangGraph · your agent as a graph | [S1] [S5] |
| 6 | The cast | 30–34 s | Three pieces. Nodes, edges, and checkpoints. Let's run the email through. | 11 | `[LIST]` | NODES · EDGES · CHECKPOINTS | [S2] [S4] |
| 7 | Mechanism 1 · nodes | 34–39 s | Step one, the nodes. Each node does one job, like read, classify, or draft. | 14 | `[ANIMATE]` | STEP 1 OF 3 · 01 NODES | [S2] [S9] |
| 8 | Mechanism 1 · nodes | 39–44 s | They all share one state, a card that travels with the email. | 12 | `[ANIMATE]` | STATE | [S2] |
| 9 | Mechanism 1 · nodes | 44–48 s | Read fills in the email. Classify writes refund. Draft writes the reply. | 12 | `[CODE]` | email: "I was charged twice." · intent: refund · reply: … | [S2] [S9] |
| 10 | Mechanism 1 · nodes | 48–52 s | Each node reads the card, and writes back only its part. | 11 | `[ANIMATE]` | reads the card · writes its part | [S2] |
| 11 | Mechanism 2 · edges | 52–56 s | Step two, the edges. Edges decide what runs next. | 9 | `[ANIMATE]` | STEP 2 OF 3 · 02 EDGES | [S2] |
| 12 | Mechanism 2 · edges | 56–61 s | A conditional edge reads the card. Intent is refund, so the email takes the refund path. | 16 | `[ANIMATE]` | intent: refund → refund path | [S3] |
| 13 | Mechanism 2 · edges (re-hook) | 61–66 s | [lean in] And edges can loop back. The check finds no amount in the draft. | 13 | `[ANIMATE]` | ✕ no amount | [S3] [S8] |
| 14 | Mechanism 2 · edges | 66–70 s | So the email goes back to draft, gets fixed, and passes. | 11 | `[ANIMATE]` | draft → check ✓ | [S3] |
| 15 | Mechanism 3 · checkpoints | 70–77 s | Step three, the checkpoints. Give it a checkpointer, and after every step, it saves where it is. | 17 | `[ANIMATE]` | STEP 3 OF 3 · 03 CHECKPOINTS | [S4] [S12] |
| 16 | Mechanism 3 · checkpoints (the reveal) | 77–82 s | Now the email reaches approve. The approve node calls interrupt, and the whole graph stops. | 15 | `[VERDICT]` | PAUSED. | [S5] |
| 17 | Mechanism 3 · checkpoints | 82–87 s | [slow down] Everything's saved under a thread ID, one per email. It waits until someone answers. | 14 | `[ANIMATE]` | saved · thread ID: email-1 (illustrative) · waiting… | [S5] [S12] |
| 18 | Mechanism 3 · checkpoints | 87–92 s | You tap approve. It resumes from that step, with the same card. | 12 | `[ANIMATE]` | Approve ✓ · resumed | [S5] |
| 19 | Mechanism 3 · payoff | 92–95 s | [smile] Then the refund goes out. Approved by you. | 8 | `[ANIMATE]` | Refund sent ✓ · approved by: you (illustrative) | [S5] |
| 20 | The catch | 95–100 s | [slow down] Now, here's the catch. On resume, the paused step runs again from its top. | 14 | `[VERDICT]` | IT RUNS AGAIN FROM THE TOP. | [S6] [S12] |
| 21 | The catch | 100–106 s | So if it emailed the customer before the pause, that email could go out twice. | 15 | `[ANIMATE]` | ✉ ✉ sent twice | [S6] [S12] |
| 22 | Takeaway | 106–109 s | Put actions after the approval, or in their own node. | 10 | `[ANIMATE]` | actions after approve · or own node | [S12] |
| 23 | When you need it (1/2) | 109–115 s | You don't need LangChain to use it. LangChain's own agents are built on top of LangGraph. | 16 | `[VS]` | LangChain agents → built on LangGraph | [S13] [S10] |
| 24 | When you need it (2/2) · decision | 115–123 s | For a simple agent, start with those. Need your own branches, loops and approval steps? That's when you reach for LangGraph. | 21 | `[LIST]` | simple agent → prebuilt · your own branches, loops, approvals → LangGraph | [S13] [S10] [S14] |
| 25 | Recap | 123–129 s | [warm] Nodes. Edges. Checkpoints. It saves after every step, so it can wait for your OK. | 15 | `[RECAP]` | 01 NODES → 02 EDGES → 03 CHECKPOINTS | [S2] [S4] [S5] |
| 26 | CTA | 129–131 s | What should I explain next? Tell me below. | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** LangGraph (say "Lang-Graph", one word, stress on "Graph"), LangChain ("Lang-Chain"), interrupt (the plain word), checkpointer ("check-pointer"), thread ID ("thread I-D") → `names`: LangGraph, LangChain, interrupt, checkpointer

**Re-hooks (long Short):** #5 at ~22 s ("that graph can stop, and pick up again"), #13 at ~61 s ("edges can loop back"), #16 at ~77 s ("the whole graph stops"), #20 at ~95 s ("here's the catch"): every 15–40 s.

**Accuracy notes:**
- The hook is a hypothetical about an agent with no approval step (the card is labelled "illustrative"); nothing implies LangGraph agents refund without approval by default.
- #4 is framing, not a sourced fact, and avoids absolutes (content plan: "a plain loop can't pause" is unsafe).
- "After every step, it saves where it is": one checkpoint per super-step = one after every node in this straight-line graph, with a checkpointer attached (S12); the line says "Give it a checkpointer".
- "It resumes from that step, with the same card", never "exactly where it left off" (the paused node restarts from its top: S6, which is the catch).
- No crash claim (cut: it needs "saved to a database" and a manual resume, S12).
- "LangChain's own agents are built on top of LangGraph" and "for a simple agent, start with those" paraphrase the docs (S13, S10); approvals are also available in LangChain's prebuilt agents (S14), so #24 says "your own" branches, loops and approval steps.
- The catch says "could go out twice", not "will" (S6, S12).
- Node names, the thread name, the email and the refund card are illustrative.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

Your AI agent just refunded a customer. Nobody approved it.

Here's the email it got. I was charged twice.

Most agents are a loop. The model picks a tool, reads the result, and goes again until it's done.

That loop keeps its progress in memory. Pausing for hours, or carrying on after a restart? That's code you'd write yourself.

LangGraph is an open-source framework for building that same agent as a graph. And that graph can stop, and pick up again.

Three pieces. Nodes, edges, and checkpoints. Let's run the email through.

Step one, the nodes. Each node does one job, like read, classify, or draft.

They all share one state, a card that travels with the email.

Read fills in the email. Classify writes refund. Draft writes the reply.

Each node reads the card, and writes back only its part.

Step two, the edges. Edges decide what runs next.

A conditional edge reads the card. Intent is refund, so the email takes the refund path.

And edges can loop back. The check finds no amount in the draft.

So the email goes back to draft, gets fixed, and passes.

Step three, the checkpoints. Give it a checkpointer, and after every step, it saves where it is.

Now the email reaches approve. The approve node calls interrupt, and the whole graph stops.

Everything's saved under a thread ID, one per email. It waits until someone answers.

You tap approve. It resumes from that step, with the same card.

Then the refund goes out. Approved by you.

Now, here's the catch. On resume, the paused step runs again from its top.

So if it emailed the customer before the pause, that email could go out twice.

Put actions after the approval, or in their own node.

You don't need LangChain to use it. LangChain's own agents are built on top of LangGraph.

For a simple agent, start with those. Need your own branches, loops and approval steps? That's when you reach for LangGraph.

Nodes. Edges. Checkpoints. It saves after every step, so it can wait for your OK.

What should I explain next? Tell me below.

---

# Storyboard · LangGraph · reel · archetype: Concept (3 mechanism steps)

_One row per script beat. The switchboard (graph zone y 250–880 with six node pills in a two-row snake + side pill `answer` + loop
arc; save rail y 895–945; state card y 960–1440) stays in the same positions from s07 to s19, so nothing jumps between scenes;
only the email chip, the card's fields and the save tiles change. Captions: engine's, 81–90 % height, left grid; the stage
never draws below y 1460; right 12 % clear. Step counter "STEP 0n / 03" (3 segments) is lit only s07–s19._

**Continuous spans:** A = s02–s04 (the email meets the plain loop) · B = s05–s06 (the loop unrolls into a graph) · C = s07–s10
(step 1) · D = s11–s14 (step 2) · E = s15–s19 (step 3; ends on the hook's refund card, now approved) · F = s20–s22 (the catch →
fix) · G = s23–s24 (when you need it). The email chip + state card are the running object from s02 to s22 and ride the recap chain.

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–4 s | Your AI agent just refunded a customer. Nobody approved it. | `[TITLE]` | dark | Frame 0 (never empty): navy; the refund card at y 300–620 (mono 44 px) "Refund sent · $49 ✓" and "approved by: ____" with a BLINKING empty slot, "illustrative" tag. On "Nobody" the headline SLAMS across y 780–1100 (Anton 170 px, yellow, "NOBODY" underlined); the empty slot FLASHES red | cold open (no fade) | NOBODY APPROVED IT. | stamp, soft alarm blip | none (sources in description) |
| 2 | 4–7 s | Here's the email it got. I was charged twice. | `[ANIMATE]` | blue | The refund card SHRINKS AWAY to the top-right corner; an email card (white, 4 px ink border) TYPES OUT "I was charged twice." centred at y 700; "twice" HIGHLIGHTS yellow | WIPE (dark → blue) | "I was charged twice." (illustrative) | whoosh, typing ticks | none (sources in description) |
| 3 | 7–14 s | Most agents are a loop. The model picks a tool, reads the result, and goes again until it's done. | `[ANIMATE]` | blue | The email SHRINKS to a chip in the centre; a ring BUILDS around it: `model` → `tool` → `result` pills on a circle (y 450–1150); a dot RACES round the ring on "picks", "reads", "again"; on "done" it EXITS to a `done` chip (internal change per clause, 7 s) | continuous | model → tool → result → repeat | tick ×3, whoosh loop | none (sources in description) |
| 4 | 14–22 s | That loop keeps its progress in memory. Pausing for hours, or carrying on after a restart? That's code you'd write yourself. | `[ANIMATE]` | blue | A bar "progress: in memory" FILLS at y 1250 under the ring; on "Pausing" a ⏸ chip POPS with a "?", on "restart" a ↻ chip POPS with a "?"; on "yourself" a hand-drawn bracket DRAWS around both chips: "your code" (internal change, 8 s) | continuous | progress: in memory | pop ×2, pen scratch | none (sources in description) |
| 5 | 22–30 s | LangGraph is an open-source framework for building that same agent as a graph. And that graph can stop, and pick up again. | `[TITLE]` | dark | The ring UNROLLS into a straight row of node pills (same agent, now a graph); "LangGraph" TYPES OUT above at y 300 (Anton 150 px) with "open-source framework" in mono under it; on "stop" the whole row FREEZES grey; on "again" it RE-LIGHTS left to right | WIPE (blue → dark) | LangGraph · your agent as a graph | whoosh, typing, power-down, power-up | none (sources in description) |
| 6 | 30–34 s | Three pieces. Nodes, edges, and checkpoints. Let's run the email through. | `[LIST]` | dark | Three labels STAMP in a column on their words: NODES (on a pill), EDGES (on an arrow), CHECKPOINTS (on a save tile); on "email" the email chip SLIDES in at the left of the row | continuous | NODES · EDGES · CHECKPOINTS | stamp ×3, slide | none (sources in description) |
| 7 | 34–39 s | Step one, the nodes. Each node does one job, like read, classify, or draft. | `[ANIMATE]` | light | Chapter card "STEP 1 OF 3 / 01 Nodes" (numeral Inter 900, 330 px, ~1 s), then the switchboard on light (graph ghosted): `read`, `classify`, `draft` BUILD one per word in row 1 (y 360); step counter "STEP 01 / 03" lights top-left | WIPE + chapter card | STEP 1 OF 3 · 01 NODES | whoosh, tick ×3 | none (sources in description) |
| 8 | 39–44 s | They all share one state, a card that travels with the email. | `[ANIMATE]` | light | The state card BUILDS under the graph (y 960–1440) with four empty rows `email:` `intent:` `reply:` `approved:` (dim "—"); the email chip DOCKS onto the card's top edge, they now move as one | continuous | STATE | pop, clack | none (sources in description) |
| 9 | 44–48 s | Read fills in the email. Classify writes refund. Draft writes the reply. | `[CODE]` | light | Chip + card ROUTE `read` → `classify` → `draft`; at each node its field FILLS (TYPES OUT): `email: "I was charged twice."`, `intent: refund`, `reply: "Sorry! Refund on its way."` | continuous | email: "I was charged twice." · intent: refund · reply: … | send swoosh ×3, typing | none (sources in description) |
| 10 | 48–52 s | Each node reads the card, and writes back only its part. | `[ANIMATE]` | light | On `draft`: a scan line SCANS the whole card top to bottom on "reads"; then only the `reply` row HIGHLIGHTS blue on "only"; the other rows stay dim | continuous | reads the card · writes its part | scan, click | none (sources in description) |
| 11 | 52–56 s | Step two, the edges. Edges decide what runs next. | `[ANIMATE]` | yellow | Chapter card "STEP 2 OF 3 / 02 Edges"; counter 02 / 03; the edges between the pills DRAW as ink lines with arrowheads, left to right | WIPE + chapter card | STEP 2 OF 3 · 02 EDGES | whoosh, pen draw | none (sources in description) |
| 12 | 56–61 s | A conditional edge reads the card. Intent is refund, so the email takes the refund path. | `[ANIMATE]` | yellow | Chip + card REWIND to `classify`; a lever icon on its out-edges; a scan READS `intent: refund` on the card; the lever FLIPS toward `draft` on "refund"; the `answer` path DIMS; the chip ROUTES on | continuous | intent: refund → refund path | rewind, scan, click, send swoosh | none (sources in description) |
| 13 | 61–66 s | And edges can loop back. The check finds no amount in the draft. | `[ANIMATE]` | yellow | Chip ROUTES `draft` → `check`; the loop arc `check → draft` DRAWS on the right edge on "loop"; `check` SCANS the reply; "✕ no amount" STAMPS red | continuous | ✕ no amount | pen draw, scan, buzz (soft) | none (sources in description) |
| 14 | 66–70 s | So the email goes back to draft, gets fixed, and passes. | `[ANIMATE]` | yellow | The chip LOOPS along the arc back to `draft` on "back"; the `reply` field RETYPES "Sorry! Your $49 refund is on its way." on "fixed"; the chip ROUTES to `check` again and a green ✓ STAMPS on "passes" | continuous | draft → check ✓ | swoosh, typing, ding | none (sources in description) |
| 15 | 70–77 s | Step three, the checkpoints. Give it a checkpointer, and after every step, it saves where it is. | `[ANIMATE]` | blue | Chapter card "STEP 3 OF 3 / 03 Checkpoints"; counter 03 / 03; the save rail BUILDS (y 895–945, "thread ID: email-1 · illustrative"); six save tiles DROP onto it 0.3 s apart (one per node passed: read, classify, draft, check, draft, check), each a mini copy of the card | WIPE + chapter card | STEP 3 OF 3 · 03 CHECKPOINTS | whoosh, save blip ×6 | none (sources in description) |
| 16 | 77–82 s | Now the email reaches approve. The approve node calls interrupt, and the whole graph stops. | `[VERDICT]` | blue | Chip ROUTES `check` → `approve`; PUSH IN on `approve`; an `interrupt()` tag STAMPS on it on "interrupt"; on "stops" everything FREEZES grey (music dips) and "PAUSED." STAMPS (Anton 200 px) | continuous | PAUSED. | send swoosh, stamp, low hum | none (sources in description) |
| 17 | 82–87 s | Everything's saved under a thread ID, one per email. It waits until someone answers. | `[ANIMATE]` | blue | A seventh save tile with a lock glyph DROPS on "saved"; the rail label "thread ID: email-1" HIGHLIGHTS on "thread"; a wait ring SPINS on `approve` and a small clock FAST-FORWARDS on "waits" (hours pass, no number) | continuous | saved · thread ID: email-1 (illustrative) · waiting… | save blip, clock ticks | none (sources in description) |
| 18 | 87–92 s | You tap approve. It resumes from that step, with the same card. | `[ANIMATE]` | blue | An Approve button SLIDES UP beside `approve`; a tap ripple on "tap"; `approved: you` FILLS on the card; the graph UNFREEZES from `approve` only (rows before it stay done), on "resumes"; the last tile glows "resumed" | continuous | Approve ✓ · resumed | confirm chime, power-up | none (sources in description) |
| 19 | 92–95 s | Then the refund goes out. Approved by you. | `[ANIMATE]` | blue | Chip ROUTES `approve` → `refund`; the hook's refund card POPS out of `refund`, now "approved by: you" with a green ✓: the hook's frame, earned (step counter fades out) | continuous | Refund sent ✓ · approved by: you (illustrative) | send swoosh, ding | none (sources in description) |
| 20 | 95–100 s | Now, here's the catch. On resume, the paused step runs again from its top. | `[VERDICT]` | dark | The switchboard SHRINKS to the `approve` node, which opens into a code card (mono 40 px, illustrative): `send_email("We're on it")` · `ok = interrupt(...)` · `return ...`; a run pointer RUNS down and stops at `interrupt`; on "again" it JUMPS back to line 1; "IT RUNS AGAIN FROM THE TOP." STAMPS | WIPE (blue → dark) | IT RUNS AGAIN FROM THE TOP. | whoosh, tick, rewind, stamp | none (sources in description) |
| 21 | 100–106 s | So if it emailed the customer before the pause, that email could go out twice. | `[ANIMATE]` | dark | On the second pass `send_email` FIRES again: two envelopes ✉ ✉ FLY to a customer inbox chip at the right; the inbox count STAMPS "2" in red on "twice" | continuous | ✉ ✉ sent twice | swoosh ×2, buzz (soft) | none (sources in description) |
| 22 | 106–109 s | Put actions after the approval, or in their own node. | `[ANIMATE]` | dark | The `send_email` line SLIDES below `interrupt` on "after"; quick replay: the pointer stops, resumes, one envelope only; then the line LIFTS OUT into its own pill node `notify` after `approve` on "own node" | continuous | actions after approve · or own node | slide, ding | none (sources in description) |
| 23 | 109–115 s | You don't need LangChain to use it. LangChain's own agents are built on top of LangGraph. | `[VS]` | light | Two plain-text blocks: "LangGraph" STANDS alone on "don't need" (a struck-through "LangChain required?" chip beside it); then a "LangChain agents" block STACKS on top of it on "built on top" | WIPE (dark → light) | LangChain agents → built on LangGraph | whoosh, clack | none (sources in description) |
| 24 | 115–123 s | For a simple agent, start with those. Need your own branches, loops and approval steps? That's when you reach for LangGraph. | `[LIST]` | light | A two-row decision card BUILDS: row 1 "simple agent → LangChain's prebuilt agent ✓" on "simple"; row 2 "your own branches · loops · approval steps → LangGraph" with three mini icons (switch, arc, pause) POPPING on "branches", "loops", "approval" | continuous | simple agent → prebuilt · your own branches, loops, approvals → LangGraph | tick, pop ×3 | none (sources in description) |
| 25 | 123–129 s | Nodes. Edges. Checkpoints. It saves after every step, so it can wait for your OK. | `[RECAP]` | yellow | Recap chain "01 NODES → 02 EDGES → 03 CHECKPOINTS" BUILDS on each word, the mini email card riding along; save tiles DROP under the chain on "every step"; "approved by: you" STAMPS on "OK" | WIPE (light → yellow) | 01 NODES → 02 EDGES → 03 CHECKPOINTS | whoosh, tick ×3, save blips, stamp | none (sources in description) |
| 26 | 129–131 s | What should I explain next? Tell me below. | `[CTA]` | dark | The question BUILDS WORD BY WORD (Anton 130 px); "Follow for more AI breakdowns" pill SLIDES UP; the last frame is navy like frame 0 (loop) | WIPE (yellow → dark) | What should I explain next? | whoosh, pop | none (sources in description) |

_Reels: a visual change every 2–3 s (every row above changes on its cue words); captions from 81 %; bottom 20 % / right 12 % clear; generic icons, no logos._
_Mock UI and code are labelled "illustrative". Music: `inventing-flight`, ducked; near silence during the s16 freeze._

---

# Publish kit · LangGraph

_Title patterns from the winners (evidence, not words): the searched term up front + a plain promise ("X explained", "how X
works"); the "vs LangChain" confusion. Ours lead with the term and the one thing nobody shows (pause → approve → resume)._

## Titles (pick 1)
1. LangGraph explained: how an AI agent pauses for your OK
2. What LangGraph actually adds to your AI agent
3. LangGraph on one refund email: nodes, edges, checkpoints

## Thumbnail concept (≤4 words of text)
Navy, the refund card with "approved by: ____" and its blank slot glowing red; giant yellow **"NOBODY APPROVED IT"** (3 words) on
the left, and a small node graph with a pause icon on the right. No logos, no faces.

## Caption / description
Your AI agent just refunded a customer, and nobody approved it. Here's how LangGraph fixes that. One refund email ("I was charged
twice") goes through a LangGraph agent: nodes that each do one job on a shared state, edges that branch and loop, and checkpoints
that save after every step. That's why it can stop at an approval, wait, and resume with the same state.
Plus the catch the docs warn about: on resume, the paused step re-runs from its top, so put your actions after the approval.
The email, node names and code are illustrative.

## Chapters (long-form)
_n/a (Short)_

## Sources (for the description / pinned comment)
- [S1] LangGraph overview (docs): https://docs.langchain.com/oss/python/langgraph/overview
- [S2] [S3] Graph API: state, nodes, edges, conditional edges (docs): https://docs.langchain.com/oss/python/langgraph/graph-api
- [S4] Persistence / checkpointers (docs): https://docs.langchain.com/oss/python/langgraph/persistence
- [S5] [S6] Interrupts (docs): https://docs.langchain.com/oss/python/langgraph/interrupts
- [S8] Workflows and agents (docs): https://docs.langchain.com/oss/python/langgraph/workflows-agents
- [S9] Thinking in LangGraph: the support-email agent (docs): https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph
- [S10] LangChain overview: when to use which (docs): https://docs.langchain.com/oss/python/langchain/overview
- [S12] Checkpointers (docs): https://docs.langchain.com/oss/python/langgraph/checkpointers
- [S13] LangGraph overview: "you don't need to use LangChain to use LangGraph" (docs): https://docs.langchain.com/oss/python/langgraph/overview
- [S14] LangChain human-in-the-loop middleware (docs): https://docs.langchain.com/oss/python/langchain/human-in-the-loop

## Hashtags
#LangGraph #AIAgents #LangChain #GenAI #Python #LLM #Shorts

## Pinned comment (invites replies)
Would you let an AI agent send refunds without asking you first? 👀 Where would you put the approval step: before every tool, or
only before money moves? Tell me below. Sources for every claim are in the description.

## Repurposing (long-form moments → reels)
- A future LangGraph explainer could open with this reel's hook and add the parts we cut here: durable vs in-memory checkpointers,
  time travel, the recursion limit, and subgraphs.
- The 14 s catch → fix segment (s20–s22) works on its own as a "LangGraph gotcha" Short.
- The when-you-need-it beats (s23–s24) could seed a "LangChain vs LangGraph, the right way round" Comparison reel (needs its
  own research and archetype).
