# Brief · REA ("Reverse Engineer Anything")

| | |
|---|---|
| Topic | "Reverse Engineering Anything" = **REA: Reverse Engineer Anything** (github.com/morluto/rea), the open-source MCP server + CLI that went to #1 on GitHub in October 2026 |
| Format(s) | reel (9:16, faceless) · default, the user gave only "Reverse Engineering Anything reel" |
| Viewer | global tech audience · level: curious practitioner (default; uses a coding agent like Claude Code or Cursor, has seen the "software is dead / clone anything" posts, has never opened a decompiler) |
| **Viewer's question** | "What does this viral 'reverse engineer anything' tool actually do, is it real, and can I use it?" |
| **Archetype** | primary: Launch · secondary (one beat only): none |
| **Why this archetype** | provisional: Launch (chooser: a newly viral tool; the viewer asks "what is it and should I care?"); not Concept (the question isn't "how does reverse engineering work" in general), not Tutorial (no imperative "set up X"), not Trend (the "software is dead" framing is the hype we answer, not the viewer's question). → **confirmed after YouTube analysis: Launch** is used by 3 of the 5 REA winners (#1, #3, #5 in inspiration.md); #4 is Trend and #2 is Story. The gap (nobody shows the evidence, an incomplete raw output being caught, or a check) fits the Launch beat sheet's Demo + "why it's different" beats, expanded to a longer demo |
| **Tone (voice style)** | Genuinely excited but honest, like a developer who just watched it work: brisk on the trace, a beat of surprise on "the first draft was incomplete", proud on the check, calm and serious on the permission line. |
| Must include | (provisional; the content plan decides) what REA does, by what it does; the agent → REA → tools → evidence loop; the demo on one running example; the incomplete raw output and the input the agent found anyway; the two checks; that it recovers logic, not the original source; the permission line (if the plan says it's material) |
| Running example | **one question about DX-Ball** (an old Windows brick-breaker): "hit a brick on the left and the sound comes from the left — how?" From REA's own showcase (project claim; the reconstruction is public) [research S6]. Drawn as a generic brick-breaker in house style, no game art |
| Angle (one sentence) | Show what REA really does on one tiny, real question: the agent asks, REA digs out the evidence, the decompiler's first draft turns out to be incomplete, the agent spots the mismatch, rebuilds the formula, and it is checked two ways against the original, so the viewer learns it's an evidence tool for software you're allowed to examine, not a "clone anything" button. |
| Chosen hook | "No source code. Just a game file from 1996. An AI agent rebuilt one of its functions. It matched the original in all 3,205 tests." (hooks.md #1, 19/20; first frame: a hex wall "game.exe · source code ✗" beside a giant "3,205 / 3,205 ✓") |
| Runtime target | ~110 s (294 words in the reviewed script, ~2.6–2.7 w/s; set after the content plan's six must-includes). Longer than the 35–55 s Launch sheet because the demo's payoff (incomplete → mismatch spotted → checked) is the gap; matches the channel's approved reels (2.5–2.7 w/s). No REA Short with reach exists to match (inspiration.md) |
| Open questions / unverified | **No "our test"**: running REA locally was blocked by this machine's permission policy, so every demo fact is REA's own showcase (labelled "in their own showcase"). Star counts move hourly ("over 200,000" is safe on 2026-10-14). |

## Locks (must never appear)
- No logos (GitHub, Anthropic, NSA, Ghidra dragon, the game's art); product names as plain text only; the brick game is drawn generically.
- No "clone any app / software is dead / open source now" claims, and no link between REA and the Adobe-alternative or bank-hacking stories (research S13).
- No working attack steps, no DRM / licence-check / anti-cheat bypass, no "how to get a paid app's API", no named commercial app as a copy target.
- No "our test" wording: we didn't run it.
- No sources on screen; code and UI on screen are labelled "illustrative" (the formula is the showcase's, simplified).
- No line from any watched video.
