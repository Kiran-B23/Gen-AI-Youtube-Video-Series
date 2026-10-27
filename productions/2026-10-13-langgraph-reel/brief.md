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
