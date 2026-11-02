# Comprehension check · Harness Engineering (v2)

_The `script-comprehension` agent's report, saved verbatim: a stateless first-time viewer (the Goldfish) who heard only
the read-aloud once. It never saw the content plan, research or brief. `script-review` compares it with the content plan
(dimension "understood"). Re-run it whenever the read-aloud changes: the linter checks the sha1 below._

read-aloud sha1: bda97752297d
date: 2026-10-30
_Run 14, after the owner's 6 changes + script-review's beat 7–8 reorder. Left for the screen: the `AGENTS.md` line types on "rule"; FAIL/PASS on the test row; the error travelling into the agent; the harness ring around the model relabelled "your agent tool"; three unlabelled tools; success bars still at ±2–5 pts while only the token-cost bar (per task) moves; the beat-12 card snapping a check onto each rule._

```
TAKEAWAY: When a coding agent says "Done," it hasn't actually checked anything, so you add a hook that runs your tests automatically and sends errors back to it. The video also says switching agent tools mostly changes the cost, not how well it works.
WHAT IT IS: A "harness" is everything around the AI model: what it reads and what checks its work. A "hook" is a command that runs your test automatically every time the agent says it's done.
WHY I'D CARE: Set up a hook so my tests run whenever the agent says "Done." Pick an agent tool based on price, and read through any tests the AI wrote myself.
REMEMBERED (in order):
1. The agent writes code (a password-reset button), re-reads it and says "Done," but the test never ran.
2. A written rule like "run tests first" only asks the agent. A hook actually runs the test.
3. The loop: test fails (red), the error goes back to the agent, it fixes it, test passes (green).
4. Researchers ran the same models in three popular tools. Success changed by only a few points, but token cost changed up to 5x.
5. No ready-made tool knows your project. Your own checks do. Every time the agent makes a mistake, add a rule and a check for it.
6. Green only means your checks passed. Tests written by AI can pass bad code, so review them yourself.
7. Choose a tool based on price, and build your own checks for "Done."
LOST ME:
- "Your agent tool is a ready-made harness": I only just learned what a harness is, and now my tool is one. It took me a second to see that "shopping for a better one" means switching tools like the ones I already use.
- "On two benchmarks, success moved a few points between tools": I don't know which benchmarks, and "a few points" has no scale, so I can't tell if it's small or big.
- "Token cost varied up to fivefold": This one number lands, but I'm not sure if it's cost per task or in total.
- "Turn every mistake into a rule, plus a check": A rule and a check in the same sentence. Earlier the video said rules "only ask," so I don't get why I'd still write the rule.
QUESTIONS LEFT:
- How do I actually set up a hook in my agent tool? Where does that command go?
- Which three tools were tested, and which one was cheapest?
- If I write a rule and a check every time, what does the rule add that the check doesn't?
ONE-LISTEN RISK: medium — The first half (the Done, red, green loop) is clear. In the second half, "harness" changes from a concept to a product I'd shop for, and the benchmark numbers come in fast with no names or scale.
```
