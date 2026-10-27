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
