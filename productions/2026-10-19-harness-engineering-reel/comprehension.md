# Comprehension (Goldfish) · Harness Engineering

read-aloud sha1: 530fe19fd192

_Run 4, 2026-10-28, by the `script-comprehension` agent on exactly `lint_package.py <folder> --read-aloud` (after script-review's improve item: #10 "…every time it says done"). Runs 1–3: run 1 lost "hook", "LangChain", "its score"; run 2 lost "hook" again; run 3 lost when the hook runs. All fixed. Saved by the main session._

TAKEAWAY: When your AI coding agent says "done" too early, the fix can be what sits around the model (a rules file it reads first, plus automatic checks like tests), not a smarter model.
WHAT IT IS: A "harness" is everything around the AI model in a coding agent: what it reads before it starts (a short agents.md file) and what checks its work after (hooks that run tests).
WHY I'D CARE: I could add an agents.md file and a hook that runs my tests every time the agent says done, so "done" really means the tests pass. I'd still write or review the tests myself.
REMEMBERED (in order):
1. The agent wrote a password-reset button, re-read its code, decided it looked fine and stopped, but never ran the test.
2. Agent = model + harness.
3. Guides: a short agents.md file the agent reads first; "a map, not a manual", e.g. "run the tests before you say done."
4. Checks: a hook is a command the tool runs on its own, so the test runs every time the agent says done. Red → the error and a fix hint go back → the agent fixes it → green.
5. LangChain kept the same model, changed only the harness; 52.8% → 66.5% on a benchmark, measured by LangChain itself.
6. Every mistake becomes a new rule the agent reads or a check it must pass.
7. Catch: green only means your own checks passed, so write or review the tests yourself.
LOST ME:
- "named agents dot M D": a second to realise it's a filename by voice alone.
- "fifty-two point eight percent of a benchmark's tasks": benchmark unnamed, so the size of the gain is unanchored; kept "about 53 to 66, a big jump".
- "Add a hook: a command your agent tool runs on its own": two new ideas in one line; followed it, but fast.
- "But nobody checks that rule. Second: the checks.": "checks" twice in a row blurs the two points.
QUESTIONS LEFT:
- Where do I set up a hook (which tools, which config file)?
- What else goes in agents.md; what does "map, not manual" look like?
ONE-LISTEN RISK: medium.

## Main-session notes
- Takeaway = the core message; all 6 must-includes + the catch remembered in order; the hook's timing (run 3's gap) now lands.
- Not changed in words, handled on screen (storyboard/animation plan): AGENTS.md shown as a filename on its word (#7–#8); "52.8% → 66.5%" giant with "tasks solved" on their words (#15); a clear section change at "Second" (#9: new colour block + "02 CHECKS") to separate the rule from the checks; the hook drawn as a small command firing at the DONE moment (#10).
- Setup specifics (which tool, which file) are out of scope for a Concept reel: description / pinned comment.
