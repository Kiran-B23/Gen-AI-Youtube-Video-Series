# QA · LangGraph

_Run 2026-10-13. Deterministic eval first (`lint_package.py`), then the judgement checklist from `references/qa-checklist.md`,
including the Concept archetype's must-haves and don'ts. Every failure was fixed in the files before ticking._

## Deterministic eval
`python3 .claude/skills/video-scripter/scripts/lint_package.py productions/2026-10-13-langgraph-reel` → see the final run below
(all ✓ required).

## Hook & structure
- [x] The first spoken line *is* the hook (≤ 2 s: "Your AI agent just refunded a customer."); first frame described in hooks.md (refund card + "NOBODY APPROVED IT.")
- [x] The hook is true (a labelled hypothetical about an agent with no approval step) and paid off: s19 brings back the same refund card, "approved by: you"
- [x] Archetype stated in brief.md (Concept) with the viewer's question and the evidence (4 of 6 winners, inspiration.md)
- [x] The script follows the Concept beat sheet, foundation-first variant (hook → example → foundation → bridge → concept → 3 mechanism steps → catch → when you need it → recap → CTA); no merged sheets
- [x] Concept must-haves: mechanism *shown* (`[ANIMATE]` steps s03–s19); no spoken analogy (the switchboard is only the look); every number sourced (the only number on screen, "$49", is labelled illustrative); the takeaway is an action (put actions after the approval; pick prebuilt vs LangGraph). Don'ts: no history lesson, exactly 3 mechanism steps, jargon defined on first use (state, node, edge, conditional edge, checkpointer, interrupt, thread ID)
- [x] One running example (the "I was charged twice." email + its state card) introduced in beat 2 and carried to the recap

## Content
- [x] Zero trivia lines: no dates, versions, users, downloads (content plan's leave-out list followed)
- [x] Every fact has a source tag resolving in research.md with date + label (12 cited: S1–S6, S8–S10, S12–S14); beat 4 is marked "framing"
- [x] Unsafe content-plan wordings grepped across the folder (brief angle line fixed 2026-10-13)
- [x] Company claims worded as claims; the unsafe wordings from the content plan avoided ("exactly where it left off", "survives a crash", "built on LangChain")
- [x] Catch decision followed: include (interrupt re-runs the paused node from its top, S6/S12), worded "could go out twice", ending on the fix
- [x] YouTube analysis done: 6 winners + 2 low performers watched (low performers by URL, since none qualified automatically); winners-vs-low findings written
- [x] Differentiated angle stated (inspiration.md: the checkpoint/pause/resume nobody draws, on one email); no copied lines (checked against all 8 transcripts)

## Timing & pacing
- [x] Runtime: 355 words ≈ 131 s, a long Short that the content needs (3 steps + catch + decision), with re-hooks at ~22 / 61 / 77 / 95 s
- [x] Every beat has a visual tag; beats over 6 s (#3, #4, #5, #24: 7–8 s) are allowed for > 60 s reels and each names an internal visual change in the storyboard; no 4 s without a visual change; the only number ("$49", illustrative) appears on screen when it's in the reply
- [x] Pace in the winners' range: Shorts 90–138 s at 2.8–3.2 w/s; ours 131 s at 2.7 w/s budget (benchmark-calm, tone asks for brisk steps)
- [x] Long-form checks: n/a (reel)

## Visual design
- [x] art-direction.md filled: house style reference-flat, palette from sections.json, reference board with "what to take", locks
- [x] Every storyboard element has a motion verb; continuous spans A–G marked; the running object persists s02–s22 (~78 %)
- [x] Section colours change at every section break (dark → blue → dark → light → yellow → blue → dark → light → yellow → dark); one primary transition (WIPE) + chapter cards + PUSH IN accent
- [x] animation-plan.md: a row per beat, hook A/B/C, build briefs; structure check PASS; approval ticked with the "go ahead" note

## Delivery & ending
- [x] Reads naturally aloud (ask-and-answer in #4 and #24, small reactions); delivery cues present; no avoid-list words
- [x] Clean read-aloud text present and word-identical to the table; captions read standalone (no beat opens on an unclear "it/this"; #23 "use it" follows "LangChain… LangGraph" context and the on-screen block names LangGraph); pronunciation notes for LangGraph / LangChain / checkpointer / thread ID
- [x] CTA is channel-generic ("What should I explain next?"); the last frame is navy like frame 0 (loop)
- [x] Publish kit complete: 3 titles, thumbnail (3 words), caption, sources list with links, hashtags, pinned comment; chapters n/a
- [x] No sources on screen (every source pill "none (sources in description)"); mock UI, code, email and refund card labelled "illustrative"

## Fixes made during QA and the gates
| Check | ✓ | Fix made |
|---|---|---|
| Script review: beat 24 implied LangChain's prebuilt agents can't do approvals | ✓ | rewritten to "your own branches, loops and approval steps", S14 added to research.md |
| Script review: beat 5 lacked a category; 16/17 wording; recap didn't restate the core | ✓ | applied the review's rewrites in both the table and the read-aloud |
| Re-hook note timings stale after the rewrite | ✓ | updated to ~22 / 61 / 77 / 95 s |
| Publish title 3 promised "in 2 minutes" (runtime ≈ 2:11) | ✓ | changed to "LangGraph on one refund email: nodes, edges, checkpoints" |
| animation-plan.md structure-check box was ticked before the agent ran | ✓ | unticked; the structure-check agent ran and ticked it on PASS |
