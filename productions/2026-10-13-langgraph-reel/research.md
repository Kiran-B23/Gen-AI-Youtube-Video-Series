# Research · LangGraph

_Researched on 2026-10-13. Labels: company claim · independent · our test · community. LangGraph is v1 (Oct 2025,
"no breaking changes until 2.0"), so the core API below (`StateGraph`, `add_node`, `add_edge`,
`add_conditional_edges`, `compile`, checkpointer, `interrupt`) is stable; older videos that teach pre-1.0 imports
(`MessageGraph`, `langgraph.prebuilt` agents as the main path) are partly out of date._

## One-line definition (by what it does)
LangGraph (say "Lang-Graph") is an open-source framework that lets you build an AI agent as a **graph**: one shared
**state**, **nodes** that each do one job and update it, and **edges** that decide what runs next, including loops. It
**saves a checkpoint after each step**, so an agent can pause for a human and resume, or recover after a crash. [S1] [S2] [S4]

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | "A low-level orchestration framework and runtime for building, managing, and deploying long-running, stateful agents." Benefits listed: durable execution, human-in-the-loop, memory, mix deterministic and agentic steps. Open source; "can be used independently without LangChain". | https://docs.langchain.com/oss/python/langgraph/overview | live docs, read 2026-10-13 | company claim (maker's docs) | the plain definition; you don't need LangChain to use it | reel |
| S2 | **State:** "A shared data structure that represents the current snapshot of your application." **Nodes:** "Functions that encode the logic of your agents. They receive the current state as input, perform some computation or side-effect, and return an updated state." **Edges:** "Functions that determine which Node to execute next based on the current state. They can be conditional branches or fixed transitions." | https://docs.langchain.com/oss/python/langgraph/graph-api | live docs, read 2026-10-13 | company claim (docs) | the three moving parts: the cast of the animation | reel |
| S3 | **Conditional edges** (`add_conditional_edges`) call a routing function after a node; its return value picks the next node. Cycles: nodes can route back to themselves or earlier nodes. Special `START` and `END` nodes. Default **recursion limit 1000 steps** (from 1.0.6) stops runaway loops. | graph-api page (as S2) | live docs | company claim (docs) | loops are first-class (agents retry, re-plan); a runaway loop is capped | reel (loop) · explainer (limit) |
| S4 | **Checkpointer:** "Checkpointers persist a thread's graph state as checkpoints. Use them for short-term, thread-scoped memory, including conversation continuity, human-in-the-loop workflows, time travel, and fault tolerance." Each run is identified by a `thread_id`. | https://docs.langchain.com/oss/python/langgraph/persistence | live docs | company claim (docs) | the reveal: the agent's progress is saved, step by step | reel |
| S5 | **interrupt():** "pauses graph execution and returns a value to the caller… LangGraph saves the current graph state and waits for you to resume execution with input." Resume with `Command(resume=...)`. Needs a checkpointer ("use a durable checkpointer in production") and a thread ID. | https://docs.langchain.com/oss/python/langgraph/interrupts | live docs | company claim (docs) | a human approves before the agent acts; the agent waits as long as needed | reel |
| S6 | Interrupt gotcha: "The node restarts from the beginning of the node where the interrupt was called when resumed, so any code before the interrupt runs again." Don't wrap `interrupt()` in try/except. | interrupts page (as S5) | live docs | company claim (docs) | a real cost: side effects before the pause run twice (e.g. a duplicate email or charge) | catch candidate |
| S7 | v1.0 post: durable state: "if your server restarts mid-conversation or a long-running workflow gets interrupted, it picks up exactly where it left off"; "Pause agent execution for human review, modification, or approval"; LangChain's `create_agent` is "built on the LangGraph runtime"; "no breaking changes until 2.0"; production users named: Uber, LinkedIn, Klarna, JP Morgan, BlackRock, Cisco. | https://www.langchain.com/blog/langchain-langgraph-1dot0 | 2025-10-22 | company claim | resume after a crash; it's used in production by big teams (claim) | reel (resume; users named as a claim, optional) |
| S8 | "Workflows have predetermined code paths… Agents are dynamic and define their own processes and tool usage." LangGraph's agent example: an LLM node; a conditional edge `should_continue` routes to a tool node if there are tool calls, else END; the tool node edges back to the LLM node. | https://docs.langchain.com/oss/python/langgraph/workflows-agents | live docs | company claim (docs) | the agent loop drawn as a graph: what "an agent is a loop" literally looks like | reel |
| S9 | The docs' own design walkthrough uses a **customer-support email agent**: nodes "Read Email", "Classify Intent", "Doc Search", "Draft Reply", "Human Review"; "Store raw data, not formatted text" in state; `interrupt()` pauses for human review with all state preserved. | https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph | live docs | company claim (docs) | our running example mirrors the docs' own shape, so the mechanism shown is the real one | reel (running example) |
| S10 | When to use which: LangChain's `create_agent` for a quick, customizable agent; LangGraph for "advanced needs combining deterministic and agentic workflows". "LangChain's agents are built on top of LangGraph." | https://docs.langchain.com/oss/python/langchain/overview | live docs | company claim (docs) | decision help: you may not need to write the graph yourself for a simple agent | reel (one line, if the plan wants it) |
| S11 | PyPI download stats for `langgraph` (tens of millions per month; figures differ by source: ~34.5M to ~73.6M / 30 days in 2026). | https://pepy.tech/projects/langgraph ; https://select.keenable.ai/r/open-source-ai-agents-usage-github-share/jfXoGkRU0H2l6G2hKZhPGw | 2026 | independent (download counters; inconsistent) | adoption signal, but sources disagree | cut (numbers inconsistent) |
| S12 | **Checkpointers page:** "A checkpointer saves a snapshot of graph state at each super-step"; "For a sequential graph like `START -> A -> B -> END`, there are separate super-steps for the input, node A, and node B — producing a checkpoint after each one." Fault tolerance: "if one or more nodes fail at a given superstep, you can restart your graph from the last successful step." Durability modes: `"exit"` saves only when the run exits, so "you cannot recover from system failures (like process crashes) mid-execution"; `"sync"` writes every checkpoint before the next step. Persistence page: "`MemorySaver` and `InMemorySaver` store checkpoints in RAM. When the process restarts, all checkpoints are lost." → "Use a persistent checkpointer for production" (`PostgresSaver`). Interrupts page: the graph "waits indefinitely until you resume"; side effects before `interrupt` "should (ideally) be idempotent", else re-running can create "duplicate records"; fix: "Place side effects after `interrupt` calls" / "Separate side effects into separate nodes". | https://docs.langchain.com/oss/python/langgraph/checkpointers ; https://docs.langchain.com/oss/python/langgraph/persistence ; https://docs.langchain.com/oss/python/langgraph/interrupts | live docs, read 2026-10-13 (content-plan agent) | company claim (official docs) | exact wording for "saves after every step", "recovers from a crash" (only with a durable checkpointer) and the catch's fix | reel (claim safety, catch) |
| S13 | Overview page: "you don't need to use LangChain to use LangGraph"; LangChain has "agent abstractions built on top of LangGraph"; "If you are just getting started with agents or want a higher-level abstraction, we recommend you use LangChain's agents that provide prebuilt architectures." | https://docs.langchain.com/oss/python/langgraph/overview | live docs, read 2026-10-13 (content-plan agent) | company claim (official docs) | the relationship the right way round, and when you don't need to write the graph yourself | reel (one line) |
| S14 | LangChain's Human-in-the-Loop middleware: "The Human-in-the-Loop (HITL) middleware lets you add human oversight to agent tool calls." "The graph state is saved using LangGraph's persistence layer, so execution can pause safely and resume later." | https://docs.langchain.com/oss/python/langchain/human-in-the-loop | live docs, read 2026-10-13 | company claim (official docs) | approvals are not LangGraph-only: LangChain's prebuilt agents can ask for them too (built on LangGraph's interrupt + checkpoints) | reel (keeps #24 accurate) |

## Running-example candidates
1. **One refund email: "I was charged twice."** ✅ chosen: it's the docs' own example shape (a support email agent, S9),
   the channel's proven running object (learnings 2026-10-01), and it naturally needs all three things LangGraph adds:
   branching (refund vs question), a loop (draft → check → redraft), and a **human approval before money moves**
   (interrupt + checkpoint). Nodes (illustrative names): read → classify → draft reply → check → human approval → send.
2. A research agent that searches until it has enough sources: shows loops well, but no clear pause moment.
3. A coding agent that runs tests and retries: great loop, but abstract for non-devs.

## Analogy candidates
- **A subway map with save points** (ours): stations = nodes, tracks = edges (with switches = conditional edges), the
  rider's ticket = state, and a stamp at each station = checkpoint. Accurate and drawn as clean tech; risk: a second
  world. Use only as the *look* (a transit-style diagram), not as spoken metaphor.
- A flowchart: everyone knows it, but a flowchart doesn't run, loop back on its own decision or save progress.
- Video-game save points for checkpoints: accurate for "resume from the last save"; one line at most.

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- **Resume re-runs the paused node from its start** (S6): any side effect before `interrupt()` (sending an email,
  charging a card) happens again. Material for anyone who builds the approval step.
- **In-memory checkpointer loses everything on restart**; production needs a durable one (S5). Material if we claim
  "survives a crash".
- **Loops can run away**; capped by the recursion limit (1000 by default, S3), which then raises an error.
- **You may not need it**: for a simple agent, `create_agent` (built on LangGraph) is enough (S10). Changes the viewer's
  decision about whether to learn it now.
- Low-level = more code to write than "batteries-included" frameworks (S1 calls itself low-level).

## Alternatives / competitors
- LangChain `create_agent` (higher level, runs on LangGraph), CrewAI, AutoGen / Microsoft Agent Framework, OpenAI Agents
  SDK, plain Python loops. Out of scope for "what LangGraph is"; at most one line on `create_agent` (S10).

## Viewer questions to answer
- Is LangGraph the same as LangChain? (No: separate, usable without it; LangChain's agents run on it. S1, S10)
- Why a graph instead of a loop in plain Python? (Branches, loops, and a saved checkpoint after each step, so it can pause and resume. S2–S5)
- Can it wait for a human? (Yes, `interrupt()` pauses and keeps the state. S5)
- What if my server crashes mid-task? (With a durable checkpointer, it resumes from the last step. S4, S5, S7)
- Do I need it for a simple chatbot? (Probably not. S10)

## Cut by the viewer-value filter (and why)
- Release dates, version numbers (1.0.6, 1.2.1), LangChain Inc. funding, LangSmith / LangGraph Platform pricing: trivia
  or upsell, not the mechanism.
- Download counts and star counts (S11): sources disagree; doesn't change what the viewer can do.
- Pregel / super-steps / reducers / `Command`: true and important for builders, but too deep for a reel (explainer).
- Time travel, long-term memory store, subgraphs, streaming modes: explainer material.
