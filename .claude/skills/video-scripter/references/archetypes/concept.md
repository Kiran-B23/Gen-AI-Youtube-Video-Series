# Concept / mechanism: "How does X actually work?"

**Signals:** tokens, embeddings, RAG, attention, context window, temperature, fine-tuning, agents, MCP;
"explained", "what is", "how … works".
**Answered when:** the viewer can explain X in one sentence to a friend *and* knows one thing to do
differently because of it.

**Best hooks:**
- #14 myth-buster: "AI doesn't read your words."
- #1 paradox
- #18 one-line definition: "An agent is just an LLM in a loop, with tools."
- #2 striking number: "Two words, three tokens."

**Running example:** one tiny, everyday input that the mechanism visibly acts on, carried through every
beat. Examples: the phrase "Tokenization matters"; one question sent to a RAG bot; one email an agent
handles. Never switch examples mid-video.

## Reel beat sheet (35–55 s)
| Beat | Time | Job | Must contain | Tag |
|---|---|---|---|---|
| Hook | 0–2 s | Break the viewer's mental model | A myth, paradox or surprising number about X | `[TITLE]` |
| The example | 2–7 s | Put the running example on screen | The input, concrete and visible | `[ANIMATE]` / `[SCREEN]` |
| Mechanism 1 | 7–15 s | The first thing that happens to the example | One verb, one visual change | `[ANIMATE]` |
| Mechanism 2 | 15–24 s | The next step (and an optional 3rd) | Show it on the same example | `[ANIMATE]` / `[NUMBER]` |
| Why it matters to you | 24–34 s | The consequence for the viewer | Cost, quality, limits, a failure they've seen | `[NUMBER]` / `[SCREEN]` / `[VS]` |
| Takeaway | 34–44 s | One thing to do differently | An action, not a summary | `[LIST]` (≤ 3) / `[VERDICT]` |
| CTA | last 3–5 s | Comment prompt or loop | A question that invites a reply | `[CTA]` |

**"X in 45 s" variant** (definition topics): Hook (one-line definition) → the analogy → the real example →
where you'll meet it → CTA.

**Foundation-first variant** (default when the concept rests on something more basic the viewer already
half-knows; added 2026-10-09 after the user's review of the tokenization reel):
Hook (a paradox about the *foundation*, e.g. "Your computer has never seen a single letter") → the foundation
(how computers already handle it) → the bridge (why the simple way isn't enough) → the concept → the concept
in action on the running example → the reveal (the striking fact, e.g. "strawberry is one number") → why it
matters to you → takeaway → CTA. Keep it to ~10 beats and ≤ 55 s. The striking fact moves from the hook to
the reveal, so the hook must be its own paradox.

## Explainer outline (8–15 min)
| Section | Share | Job |
|---|---|---|
| Cold open | ≤ 30 s | The surprising behaviour on the running example, plus a promise: "by the end you'll see why" |
| The everyday picture | 10% | What people think happens; the analogy |
| The mechanism | 35% | 2–4 stages, each shown on the running example (diagram per stage). 🔁 Open loop at ~25% |
| Proof / demo | 20% | A screen or terminal showing it really behaves that way |
| Consequences | 20% | Cost, limits, failure modes; what experts do differently. 🔁 Open loop pay-off at ~60% |
| Takeaways + CTA | 10% | 3 actions + comment question |

## Session variant (30–60 min)
Build a tiny version of the mechanism (e.g. a toy tokenizer, a 50-line RAG). Each chapter adds one stage
and ends with a ✅ checkpoint on the running example.

**Tone (→ voice style):** "Curious and delighted, like revealing a magic trick: slow down on the reveal, speed up on the steps."

**Must-haves:**
- The mechanism is *shown*, not just described: at least one `[ANIMATE]` beat.
- One analogy at most, and it is accurate.
- Every number is sourced.
- The takeaway is an action.

**Don'ts:**
- No history lesson ("in 2017 researchers…") unless it is the explanation.
- No more than 3 mechanism steps in a reel.
- No jargon that is left undefined.

## Worked mini example (reel)
| Beat | Line | Tag |
|---|---|---|
| Hook | "AI doesn't read your words. It reads tokens." | `[TITLE]` |
| Example | "Watch. 'Tokenization matters', two words…" | `[ANIMATE]` |
| Mechanism | "…becomes three tokens: token, ization, matters." | `[ANIMATE]` |
| Mechanism | "In English, a token is about four characters. [S1]" | `[NUMBER]` |
| Why it matters | "And you pay per token, not per word. Limits count tokens too." | `[SCREEN]` |
| Takeaway | "So keep prompts tight and cut repeated context." | `[LIST]` |
| CTA | "What should I break down next?" | `[CTA]` |
