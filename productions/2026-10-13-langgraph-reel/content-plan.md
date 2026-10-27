# Content plan · LangGraph (reel, Concept, foundation-first)

_Written by the `content-plan` agent after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file. Planned from brief.md / research.md / inspiration.md / hooks.md (hook #1)
/ yt/summary.md. Official docs re-read on 2026-10-13: overview, interrupts, persistence, checkpointers (the last two added
to research.md as S12; the overview's beginner recommendation as S13)._

## Viewer's question
"What is LangGraph, and what does it give my agent that a plain loop doesn't?"

## Core message
LangGraph runs your agent as a graph that saves after every step, so it can pause for approval and resume.

(20 words. The repeatable version for the recap: "nodes, edges, checkpoints".)

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **Foundation: an agent is a loop.** The model calls a tool, looks at the result, decides again, until it's done. LangGraph's own agent example draws exactly this: a model node, a conditional edge "tool calls? → tools node, else END", and the tools node edging back to the model. **Bridge:** a plain loop keeps its progress in the running program, so stopping for hours to wait for a person, or carrying on after a restart, is code you'd have to write yourself. | S8 (loop as a graph); bridge is framing, worded modestly (see Claim safety) | official docs + framing |
| 2 | **Step 01, nodes and one shared state.** State is "a shared data structure" (the current snapshot); nodes are functions that receive the state, do one job, and return an update. On the refund email: `read` fills `email`, `classify` writes `intent: refund`, `draft` writes `reply`. One state card travels with the email and fills in. | S2, S9 | official docs |
| 3 | **Step 02, edges, including a conditional route and a loop back.** Edges decide what runs next: fixed, or conditional (a routing function reads the state and returns the next node). Show `classify` → refund path vs question path, and `check` → back to `draft` when the draft fails the check (e.g. no amount in it). Loops are allowed by design: that's what an agent needs and a straight chain can't do. | S2, S3, S8 | official docs |
| 4 | **Step 03, checkpoints + pause + resume (the reveal).** With a checkpointer, the state is saved after each step (a snapshot per super-step; in a straight-line graph, one after every node), under the email's `thread_id`. At the approval node, `interrupt()` pauses the run, saves the state and waits until someone answers; resuming with `Command(resume=...)` and the same thread ID continues from that step with the same state card. The refund runs only after "Approve". Pays off the hook: the refund card returns with "approved by: you". | S4, S5, S12 | official docs |
| 5 | **The relationship and when you need it (one line, inside an existing beat).** You don't need LangChain to use LangGraph; LangChain's own agents are built on top of it. For a simple agent the docs recommend starting with LangChain's prebuilt agents; LangGraph is for when you need control like branches, loops and human approval. This is the viewer's decision point. | S1, S10, S13 | official docs |
| 6 | **The catch (material, see below).** On resume, the paused node runs again from its first line, so anything it did before `interrupt()` happens again. Fix: put the action after the approval, or in its own node. The graph in step 03 already has that shape (approve node → refund node), so the catch ends on the right design, not a warning. | S6, S12 | official docs |

## Leave out
| Item | Why it's out |
|---|---|
| Production users (Uber, LinkedIn, Klarna, JP Morgan…) | Company claim from one blog post; social proof, not mechanism. Doesn't answer the viewer's question. |
| Download / star counts (S11) | Sources disagree (brief lock). |
| Release dates, v1.0 / 1.0.6 / 1.2.1, "no breaking changes until 2.0" | Trivia. Only consequence used: code on screen is v1 API (`StateGraph`, `add_node`, `add_edge`, `add_conditional_edges`, `compile`, `interrupt`). |
| Recursion limit (1000 steps) | Real, but it's a version-dependent number and needs its own explanation; the loop beat doesn't need it. Just don't claim loops can't run away. |
| In-memory vs durable checkpointer as its own beat | A setup detail, not a decision for a first-time viewer. It is handled in the wording instead: any crash/restart claim must say "saved to a database" (Claim safety). |
| Durability modes (exit / async / sync), pending writes, super-steps by name, Pregel, reducers, `Command(update/goto)` | True and important for builders; too deep for a reel. "Super-step" is replaced on screen by "step". |
| Time travel, long-term memory store, subgraphs, streaming | Explainer material; not the core message. |
| LangSmith, LangGraph Platform / Agent Server, pricing | Upsell, not the mechanism. |
| CrewAI, AutoGen, OpenAI Agents SDK, "which framework is best" | Rival comparison; not our question. |
| "LangGraph vs LangChain" as a section | Covered in one line (point 5), the right way round. |
| Subway-map metaphor as spoken analogy; video-game save points | At most a visual look (transit-style diagram, save-stamp icon). No second world in the narration. |
| "Store raw data, not formatted text" (S9 design advice) | Good practice, not the core message. |
| Calling out the videos that say LangGraph sits on top of LangChain | Rival content; we simply say it right. |
| Don't wrap `interrupt()` in try/except; `while True` + `interrupt()` replay | Builder gotchas beyond the one catch; one catch only. |

## Catch decision
**Catch:** include
**Why:** material, sourced in the official docs, and hidden by the hype. The headline promise ("pauses for a human and
picks up where it left off") is exactly where it bites: on resume, LangGraph re-runs the paused node from its start, so any
code before `interrupt()` runs again; the docs warn this can create duplicate records and tell you to put side effects after
the interrupt or in a separate node [S6, S12]. It changes how the viewer builds the one feature this video sells (the approval
step), and on a refund agent a repeated action means a second customer email or a duplicate refund record. It also ties back to
the running example ("I was charged twice"). Exact point (one line): **"When it resumes, the paused step runs again from its
top, so anything it did before the pause, like emailing the customer, could happen twice: put actions after the approval."**
Say "could happen twice", not "will". The other two
candidates are not the catch: in-memory vs durable [S5, S12] is handled by safe wording on any crash claim; "you may not need
it" [S10, S13] is decision help and goes in as must-include #5, not as a warning.

## Running example
One support email, "I was charged twice." (invented, labelled illustrative), handled by a refund agent with illustrative nodes
`read → classify → draft → check → approve → refund/send`. It mirrors the docs' own customer-support email agent [S9], it's the
channel's proven running object, and it needs every piece LangGraph adds: a branch (refund vs question), a loop (draft → check →
redraft) and a human approval before money moves (checkpoint + interrupt). It's the agent a junior developer actually gets asked to
build. The same email and state card stay on screen from beat 2 through the recap; the refund toast from the hook returns at the end
of step 03 with "approved by: you"; the catch reuses the approve node.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "picks up exactly where it left off" | The v1.0 blog (company claim) says this about server restarts, but the docs say resume continues from the last checkpoint (a step boundary) and the paused node **restarts from its beginning**. "Exactly" is contradicted by the catch. **Unsafe.** | "It picks up from the last save, with everything it knew." / "It resumes from the approval step, same state." | S5, S6, S12 |
| "survives a crash" / "even if your server dies, it carries on" | Fault tolerance: "you can restart your graph from the last successful step", only with a persistent checkpointer (`InMemorySaver` loses everything on restart; "exit" durability doesn't save mid-run); and *you* resume it, it doesn't restart itself. **Unsafe as stated.** | "Save those checkpoints to a database, and after a crash you can resume from the last good step." (If it doesn't fit, cut the crash claim; it isn't needed for the core message.) | S12, S5 |
| "built on LangChain" / "LangGraph sits on top of LangChain" | Backwards. "You don't need to use LangChain to use LangGraph"; LangChain's agents are "built on top of LangGraph". **Unsafe.** | "You don't need LangChain to use it. LangChain's own agents are built on top of LangGraph." | S1, S10, S13 |
| "saves after every step" | "Saves a snapshot of graph state at each super-step"; sequential graph → "a checkpoint after each" node. Safe for our straight-line example, with a checkpointer attached. | "After every step, it saves where it is." (on screen: a save stamp per node) | S12, S4 |
| "it saves automatically" / "always saves" | Only when compiled with a checkpointer. | "Give it a checkpointer, and after every step it saves…" (one clause is enough) | S4, S12 |
| "waits forever" / "as long as it takes" | "waits indefinitely until you resume". Safe; but "for days" across restarts needs a durable checkpointer. | "It stops and waits until someone answers." | S5 |
| "a plain loop can't pause" / "can't ask a human" | Unsourced and false (a loop can call `input()`). What's true: saving and resuming later isn't built in. **Unsafe.** | "A plain loop keeps its progress in memory. Pausing for hours, or carrying on after a restart, is code you'd write yourself." | framing (no absolute) |
| "Nobody approved it." (hook) | A hypothetical about an agent without an approval step; illustrative. Safe as long as it's "your AI agent" and the card is labelled illustrative, and the video doesn't imply LangGraph agents do this by default. | "Your AI agent just refunded a customer. Nobody approved it." (keep) | hooks.md #1 (illustrative) |
| "the paused step runs again" / "the refund goes out twice" | Code **before** `interrupt()` in that node runs again; may create duplicates. Only if placed before. | "Anything that step did before the pause runs again. A refund there could go out twice." Use "could", never "will". | S6, S12 |
| "the only way to add human approval" / "every agent needs LangGraph" | Not supported; docs recommend LangChain's prebuilt agents for beginners. **Unsafe.** | "For a simple agent, start with LangChain's prebuilt agent. Reach for LangGraph when you need branches, loops and approvals." | S13, S10 |
| "edges decide" / "the graph decides" | Edges are functions; a conditional edge calls a routing function that reads the state. | "A conditional edge reads the state and picks the next node." | S2, S3 |
| "nodes write to the state" | Nodes "receive the current state … and return an updated state". Safe. | "Each node reads the state and writes back its part." | S2 |
| "it remembers everything" | Checkpointer = short-term, thread-scoped memory. | "It remembers where this email is." (per thread) | S4 |
| "loops never get stuck" | A recursion limit exists and raises an error; not covered. **Unsafe.** | don't claim; just show the loop | S3 |
| "free" | Library is open source; the hosted platform is paid. | "open-source" (avoid "free") | S1 |
| "first", "best", "most popular", "used by Uber…" | Not supported / company claim only. | don't use | — |

## Depth (what the viewer must see, not just hear)
- **One state card travels with the email:** as the email passes `read → classify → draft`, the card's fields fill in
  (`email`, `intent: refund`, `reply`); each node visibly reads the card and writes back only its field.
- **Edges as switches and a loop:** at `classify` a switch flips to the refund path (the question path dims); at `check` the
  draft fails (missing amount), and the email visibly travels back to `draft`, then passes.
- **The save stamp and the pause:** after each node a save stamp drops onto the card (stack of snapshots under one thread ID);
  at `approve`, `interrupt()` freezes the whole graph, a clock/wait indicator runs, a person taps Approve, and the run resumes
  from `approve` with the same card; `refund` fires and the hook's toast returns "approved by: you".
- **The catch, on the approve node:** a "We're on it" email line placed above `interrupt()` fires once, then fires again on
  resume (two envelopes, echoing "charged twice"); the fix slides that line below the approval / into its own node, and the
  second envelope disappears.

## Notes for the scriptwriter
- Three numbered steps only (01 nodes + state, 02 edges, 03 checkpoints); the catch is a short beat after 03, before "why it
  matters / when you need it" (point 5), then recap ("nodes, edges, checkpoints") and a channel-generic CTA.
- Pronunciation: "LangGraph" (Lang-Graph), "interrupt" said as the word; `thread_id` said "thread ID".
- Code on screen, if any: v1 names only (`StateGraph`, `add_node`, `add_edge`, `add_conditional_edges`, `compile`,
  `interrupt`), labelled illustrative. No `MessageGraph`.

## Status
- [x] Content plan ready (2026-10-13)
