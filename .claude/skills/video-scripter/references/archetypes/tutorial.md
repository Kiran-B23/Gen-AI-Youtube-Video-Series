# Tutorial / how-to: "How do I do it?"

**Signals:** "build", "set up", "make", "automate", "connect", "deploy", "step by step", "with <tool>",
"in N minutes".
**Answered when:** the viewer could reproduce the result from the video (or the saved reel) alone, and
knows the one mistake that would stop them.

**Best hooks:**
- #9 before → after: show the finished result first
- #5 time contrast
- #16 relatable pain
- #12 "explain like I'm busy"

**Running example:** the one concrete thing being built, with real inputs (this PDF, this inbox, this
repo), shown working in the first 2 seconds.

This is **the only archetype where numbered steps are right.** Keep reels to 3–4 steps. When a build
needs more, the reel shows the outcome and the key step, and the long-form has the rest.

## Reel beat sheet (40–60 s)
| Beat | Time | Job | Must contain | Tag |
|---|---|---|---|---|
| Result first | 0–3 s | Show it working | The finished thing doing its job | `[SCREEN]` / `[TERMINAL]` |
| Promise + needs | 3–8 s | What you need, in one line | Tools and cost ("free", "one API key") | `[LIST]` |
| Step 1 | 8–18 s | The first action | Exact names (menu, command, setting) visible | `[SCREEN]` / `[TERMINAL]` / `[CODE]` |
| Step 2 | 18–28 s | The next action | Same | same |
| Step 3 | 28–38 s | The step that makes it work | Same | same |
| Gotcha | 38–46 s | The mistake everyone makes | The symptom + the fix | `[VERDICT]` / `[CODE]` |
| Result again + CTA | last 5 s | Close the loop, then the save prompt | "Save this so you can build it later" or a question | `[CTA]` |

## Explainer outline (8–15 min)
Cold open on the result (≤ 30 s) → what we're building and why (10%) → setup (10%) → build steps
(50%, each ending with a visible check; 🔁 open loop at ~25%: "the step at the end is where most people
get stuck") → the gotchas (15%) → extend it + CTA (10%).

## Session variant (30–60 min)
Follow `assets/templates/script-session.md`:
- prerequisites;
- code/asset list;
- chapters named by the **result** ("Chapter 2 · the bot answers from your PDF"), each ending in a ✅ checkpoint;
- a recap card.

**Tone (→ voice style):** "Clear, upbeat and confident, like a friend sitting next to you: steady pace, slight emphasis on each exact name or command."

**Must-haves:**
- The result is shown first.
- Exact names, commands and settings are on screen.
- Every step is verifiable.
- The gotcha is included.
- Costs and accounts are named.

**Don'ts:**
- No theory beyond one line.
- No skipped steps ("then just configure it").
- No secrets or real API keys on screen.

## Worked mini example (reel, generic)
| Beat | Line | Tag |
|---|---|---|
| Result | "This bot answers questions from my PDF, and it took ten minutes." | `[SCREEN]` |
| Needs | "You need: Python, one free API key, and your PDF." | `[LIST]` |
| Step 1 | "One: split the PDF into small chunks." | `[CODE]` |
| Step 2 | "Two: turn each chunk into numbers, called embeddings, and store them." | `[CODE]` |
| Step 3 | "Three: for each question, fetch the closest chunks and send them with the question." | `[ANIMATE]` |
| Gotcha | "Answers vague? Your chunks are too big. Try about 500 characters." | `[VERDICT]` |
| CTA | "Save this, and tell me what PDF you'd use." | `[CTA]` |
