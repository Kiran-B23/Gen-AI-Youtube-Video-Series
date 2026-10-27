# Script review · How MCP works

- [x] Script review passed (2026-10-12)

## Script review · 2026-10-12

Reviewed `script-reel.md` (revised to the content plan's departures list) against `content-plan.md` (ticked ready
2026-10-12), `research.md`, the Concept archetype, style-rules.md and learnings.md. Linter: 33/34; the only ✗ is
"script review: passed" (this review). Table = read-aloud: 100% same words.

Departures check: #1 source fixed; #3 line fixed but its source still `[S1]`; #4, #5, #6, #11 (spoken), #16 (spoken),
#17, #18, #19/#20 split, #20/#21 approvals wording, read-aloud: all applied. Left over: #3 source, #16 on-screen text,
#11 on-screen shape (minor).

VERDICT: CHANGES
scores: plan 4 · specific 5 · accurate 3 · clear 4 · value 5 · spoken 4 · match 5 · hook 5 · structure 5

blocking:
- beat 3: source "[S1]" → "[S6]" (S1 is the "open-source standard" definition and says nothing about a model having no live data; S6's "access real-time data" line is what supports "On its own, a model has no live data". The plan's departure #3 asked for `[S6]`; the line was changed, the source wasn't.)
- beat 16: on-screen "one server · every app" → "one server · many apps" (the spoken line was fixed to "apps that speak MCP can plug it in", but the caption still says "every app": the overstatement the plan's claim-safety table rules out; S1, S9, S10 support "apps that speak MCP", not every app)

improve:
- header: viewer's question "…and why does everyone need it?" → "When an AI app 'uses an MCP server', what actually happens, and who really calls the tool?" (match the plan's viewer question; "everyone needs it" is also stronger than S10 supports)
- beat 4: on-screen "NEVER TOUCHES IT." → "NEVER CALLS IT." (match the spoken "never calls the weather service itself"; plan says "calls" is the more exact word, S6)
- beat 5: source "[S1] [S2]" → "[S1] [S2] [S6]" ("The app makes that call" is S6's "intercepts the tool call … executes it")
- beat 6: on-screen "APP · MODEL · MCP SERVER" → "APP (host + MCP client) · MODEL · MCP SERVER" (plan must-include #1 asks for the label once on stage; it is only in the storyboard and the accuracy notes, so put it in the script's on-screen column too, S2)
- beat 8: "The server sends back its tools. Like get forecast: gets the weather for a city." → "The server sends back its tools, each with a description. Get forecast: gets the weather for a city." (the word "description" has to land here so the catch in #19, "a tool's description", points back to this card; it also removes the "Like X: Y" fragment, which reads like a list. S5, S13. Update the read-aloud to match.)
- beat 11: on-screen "{ name: get_forecast, arguments: { city: Tokyo, date: tomorrow } }" → "{ "name": "get_forecast", "arguments": { "city": "Tokyo", "date": "tomorrow" } } (illustrative)" (plan departure #11: mirror the real shape, S13)
- beat 12: source "[S6] [S3]" → "[S6]" (S3 is JSON-RPC plumbing, which the plan leaves out; the line doesn't depend on it)
- beat 17: "It counted over 10,000 public servers." → "Anthropic also counted over 10,000 public MCP servers." (right after "use it", "It" reads as MCP, not Anthropic; captions have to read on their own. S10 says "more than 10,000 active public MCP servers". Update the read-aloud to match.)
- beat 21: "So install only servers you trust. And check what a tool will send before you approve it." → keep, and add the plan's third action (must-include #6, S12) as a new beat: "[beat] And don't switch on 'allow all tools'." on-screen "trusted servers · check before you approve · no 'allow all'" (≈ 3 s; read-aloud to match)

Downstream (not script findings, fix before build): `storyboard-reel.md` and `animation-plan.md` still carry the old
lines ("never touches", "a small program", "any app that speaks MCP can use it", "every app"). Sync them after this
script passes.

## Script review · 2026-10-12 (re-review after fixes)

Re-reviewed the revised `script-reel.md` (24 beats, 334 words, ~124 s). Linter: everything else passes. Table = read-aloud:
100% same words. Both blocking items are fixed: beat 3 now cites [S6], and beat 16's on-screen text says "one server · many apps".
Every improvement from the first review is applied. The new beat 22, "And never auto-approve every tool.", is the plan's
must-include #6 action (no blanket "allow all", S12; human in the loop, S7). The "never" is advice to the viewer, not a
factual claim, and it's no stronger than the plan allows.

VERDICT: PASS
scores: plan 5 · specific 5 · accurate 5 · clear 5 · value 5 · spoken 4 · match 5 · hook 5 · structure 5

blocking:
- none

improve (optional, don't block):
- beat 17: "Anthropic also counted over 10,000 public MCP servers." → "The same post counted over 10,000 public MCP servers." (only if saying "Anthropic" twice in a row sounds stiff read aloud; keeps the attribution, S10)
- beat 8: "Get forecast: gets the weather for a city." could be easier to say as "Get forecast, which gets the weather for a city." (spoken naturalness)

Downstream (do before build, not script findings): update `storyboard-reel.md` and `animation-plan.md` to the new lines
(#4 "never calls" / "NEVER CALLS IT.", #6 no "small", #8 "description", #16 "apps that speak MCP can plug it in" /
"many apps", #17, #19–#20 split, the new #22 row), so the animation plan has one row per beat for all 24 beats.

_Post-PASS note (2026-10-12): the two optional rewrites from this review were applied verbatim (beat 8 "Get forecast, which gets the weather for a city."; beat 17 "The same post counted over 10,000 public MCP servers."). 335 words, ~124 s; read-aloud regenerated from the table._
