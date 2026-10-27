# Script review · LangGraph reel

- [x] Script review passed (2026-10-13)

## Script review · 2026-10-13

Reviewed `script-reel.md` (Concept reel, foundation-first, 26 beats, 337 words ≈ 125 s) against `content-plan.md`
(ticked ready 2026-10-13), `research.md`, `brief.md` and `hooks.md`. I also checked the LangChain human-in-the-loop docs
for beat 24.

**Linter:** every script check passes: beats ≤ 10 s, sentences ≤ 16 words, read-aloud clean, hook-first, no avoid-list or
filler, sources resolve, absolutes sourced, table = read-aloud at 100%, planned catch present. The ✗ items are all for
later stages (art-direction, storyboard, publish, animation plan, structure check, qa) and the review gate itself. None
of them is a script finding.

```
VERDICT: CHANGES
scores: plan 5 · specific 4 · accurate 3 · clear 4 · value 5 · spoken 5 · match 5 · hook 5 · structure 4
blocking:
- beat 24: "Reach for LangGraph when you need branches, loops and approvals." → "Need your own branches, loops and approval steps? That's when you reach for LangGraph." (full row and read-aloud paragraph below; the line implies LangChain's prebuilt agents can't do approvals, but LangChain's `create_agent` has `HumanInTheLoopMiddleware`, which "lets you add human oversight to agent tool calls" using LangGraph's interrupt and checkpointer. It misleads the viewer at the decision point. New source S14: https://docs.langchain.com/oss/python/langchain/human-in-the-loop, company claim (docs), read 2026-10-13. Add it to research.md.)
improve:
- beat 5: "LangGraph builds that same agent as a graph. And a graph can stop, and pick up again." → "LangGraph is an open-source framework for building that same agent as a graph. And that graph can stop, and pick up again." (answers the "what is it" half of the viewer's question with a category [S1]. "That graph" keeps the pause tied to LangGraph and not to graphs in general.)
- beat 16: "The graph hits interrupt, and stops." → "The approve node calls interrupt, and the whole graph stops." (explains interrupt by what it does: it's a call the node makes [S5].)
- beat 17: "Everything is saved under this email's thread." → "Everything's saved under a thread ID, one per email." ("this email's thread" sounds like an email conversation thread. This wording says what the ID does [S4, S12]. Change the on-screen text to "saved · thread ID: email-1 (illustrative) · waiting…".)
- beat 25: "It does the work, and you approve what matters." → "It saves after every step, so it can wait for your OK." (the recap then restates the plan's core message and not a general line.)
- beat 4 source column: "[S12]" → "framing" (S12 is about InMemorySaver, not plain loops. The plan labels this bridge as framing.)
- beat 23 label: "Why it matters to you" → "When you need it (1/2)", and beat 24 → "When you need it (2/2) · decision" (the beat is the relationship line. The viewer's decision lands in 24.)
- accuracy notes: "are the docs' own wording (S13, S10)" → "paraphrase the docs (S13, S10); approvals are also available in LangChain's agents (S14)".
```

### Blocking rewrite: identical in the table and the read-aloud

Table row 24 (replace the whole row; times shift by about 1.5 s from here, and the header word count goes 337 → 341):

| 24 | When you need it (2/2) · decision | 111–118 s | For a simple agent, start with those. Need your own branches, loops and approval steps? That's when you reach for LangGraph. | 21 | `[LIST]` | simple agent → prebuilt · your own branches, loops, approvals → LangGraph | [S13] [S10] [S14] |

Read-aloud paragraph 24 (replace):

For a simple agent, start with those. Need your own branches, loops and approval steps? That's when you reach for LangGraph.

If you take any of the improve rewrites, change the table cell and its read-aloud paragraph to the same words, then
re-run `lint_package.py` (table = read-aloud).

### Scores, briefly
1. **Plan adherence 5.** The script covers all six must-includes, including the catch exactly as the plan decided (S6/S12, "could"). Nothing from the leave-out list appears. The recap is "nodes, edges, checkpoints". There's no crash claim and no "exactly where it left off".
2. **Specificity 4.** Every beat is on the refund email and its state card. Only beat 25's "you approve what matters" is loose.
3. **Accuracy 3.** Beat 24 is blocking (above). Everything else matches the plan's safe wording: "Give it a checkpointer", "resumes from that step", "could go out twice", the LangChain relationship the right way round.
4. **Clarity 4.** Nodes, state, edges and conditional edges are each explained by what they do. "interrupt" (16) and "thread" (17) need the small fixes above.
5. **Viewer value 5.** No trivia. The catch and the "when you need it" line both change how the viewer builds.
6. **Spoken 5.** The script talks to "you", uses contractions, has an ask-and-answer at beat 4, says "Now, here's the catch." and varies sentence length.
7. **Table = read-aloud 5.** The words match 100% (linter).
8. **Hook and payoff 5.** It's a true, illustrative hypothetical. The refund returns "approved by you" at beat 19. The CTA is channel-generic.
9. **Structure 4.** It follows the foundation-first Concept sheet the plan extended: three numbered mechanism steps (allowed), the catch after 03, then the decision, the recap and the CTA. It's longer than the archetype's ~10 beats, but the brief and plan set benchmark depth with re-hooks. Only the row labels need tidying.

## Script review · 2026-10-13 (re-review)

Re-reviewed the revised `script-reel.md` (355 words ≈ 131 s). The coordinator applied the blocking rewrite and every
improvement from the first review. All of them are in the script, and I checked each one. S14 is in `research.md` (line 29)
with the URL, its label and the quote. The linter's script checks all pass, including table = read-aloud at 100% and sources
resolving (12 cited). The remaining ✗ are later-stage files and the review gate itself.

```
VERDICT: PASS
scores: plan 5 · specific 5 · accurate 5 · clear 4 · value 5 · spoken 5 · match 5 · hook 5 · structure 5
blocking:
- none
improve:
- re-hooks note (not spoken): "#5 at ~22 s ("a graph can stop, and pick up again") … #20 at ~91 s" → "#5 at ~22 s ("that graph can stop, and pick up again") … #20 at ~95 s" (the note should match the new line and the new timing)
- beat 15: "Give it a checkpointer, and after every step, it saves where it is." → optional: keep as is (the clause itself says what a checkpointer does). Only rewrite it if test viewers stumble on the word. Any change must go into both the table and the read-aloud.
```

**Check of the changes:**
- **Beat 24:** it now says "your own branches, loops and approval steps" and cites [S14]. It no longer implies LangChain's agents can't ask for approval.
- **Beat 5:** it now defines LangGraph as an open-source framework [S1], and "that graph" ties the pause to LangGraph.
- **Beat 16:** "calls interrupt" says what interrupt is.
- **Beat 17:** "thread ID, one per email" removes the email-thread confusion. The on-screen text was updated to match.
- **Beat 25:** the recap now restates the core message.
- **Beat 4:** the source is now labelled framing.
- **Beats 23 and 24:** the labels were fixed.
- **Accuracy note:** updated.
- **New sentences:** none is over 16 words, and none adds an absolute or an unsourced claim.

- [x] Script review passed (2026-10-13)
