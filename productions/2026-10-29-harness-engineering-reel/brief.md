# Brief · Harness Engineering (v2)

| | |
|---|---|
| Topic | **Harness engineering**: designing everything around an AI model (instructions, tools, checks, feedback loops) so a coding agent does reliable work [S1–S7]; updated with the Sept 2026 HarnessTax study on how much the harness itself matters [S8] |
| Format(s) | reel (9:16, faceless) · the owner asked for a reel |
| Viewer | global tech audience · level: curious practitioner (default; uses or has tried a coding agent such as Claude Code, Codex or Cursor; has seen "harness" in their feed but can't say what it is) |
| **Viewer's question** | "What is harness engineering, and what would I actually do differently with my coding agent?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" + a mechanism; not Tutorial: no imperative "build a harness"; not Trend: "is the harness dead?" is a debate the reel answers in one beat, not the viewer's question) → **confirmed after YouTube analysis: Concept** (standard "how X works" sheet). 3 of 4 topic Shorts are Concept, the 4th a product launch; the gap is a mechanism on one task plus the measured model-vs-harness answer (inspiration.md) |
| **Tone (voice style)** | Curious and delighted, like a senior engineer replaying a bug for a friend: quick and dry on the fast failure, slow and clear on the replay, a raised eyebrow on the study's twist, plain and practical on the habit. |
| Must include | (provisional; the content plan decides) a one-line definition by what it does; agent = model + harness; guides before the agent acts, checks after; the loop (check fails → error goes back → agent fixes → passes); the habit "every mistake becomes a rule or a check"; the HarnessTax finding (swapping ready-made harnesses barely moved success, moved cost up to 5×) and what it means for the viewer |
| Running example | **one coding task an agent says it finished but didn't** (illustrative): "Add a password-reset button" → the agent writes it, re-reads its own code, says "Done", stops, while a test is red (LangChain's most common failure [S5]). The same task card goes through fail-fast → slow replay → guide → check → fix → pass |
| Angle (one sentence) | Watch one false "Done" fail fast, then replay it slow with the harness named piece by piece, and learn from the newest study that the harness you pick mostly changes price, not success, so pick it for price and build your own checks for "Done". |
| Chosen hook | hooks.md #1: "Your coding agent says, 'Done.' Your test would say no. Why?" · pinned hook question "Why does my agent say 'Done' too early?" |
| Runtime target | 45–75 s (content plan, 2026-10-30 house rule): ~150–155 words at the house pace 2.3 w/s (`studio/templates/reel/pace.json`); top explainer Shorts median 57 s (`references/web-shorts-2026-10-30.md`); v1 ran ~111 s |
| Effects (owner's note) | "Refer similar shorts/reels for exclusive effects" → effects analysis in inspiration.md (fast-then-slow replay, pinned scoreboard, lit path, stacked pass ≠ correct verdict, racing bars with a cost meter, a camera that never rests); carried into art-direction.md and animation-plan.md |
| Defaults taken on autopilot | reel · curious practitioner · Concept · reuse v1's verified sources S1–S7 (one line why: unchanged official pages, 10 days old) · new folder (v1 package and build stay untouched as the owner's earlier version) |
| Open questions / unverified | No "our test". LangChain's 52.8 → 66.5 (S5) is their own run on an older model; HarnessTax (S8) is independent but only two public benchmarks, 30 tasks each. The HarnessTax page loads by script; its text was read from the site's GitHub source on 2026-10-30. |

## Locks (must never appear)
- No logos (OpenAI, Anthropic, LangChain, Claude, GitHub, Cursor); product names as plain text only.
- No "prompt engineering is dead", "models don't matter", "the harness is dead", "harnesses don't matter", "AI writes all code now" or "no humans needed" claims.
- No claim that a harness makes an agent correct or bug-free (Böckeler: behaviour correctness is unsolved [S3]).
- No "Claude Code is bad / overpriced" or any harness ranking: HarnessTax compares cost on two benchmarks, not quality for your work.
- No "we tested" / "our test" wording: we didn't run a benchmark.
- No sources on screen; code, files and UI on screen are labelled "illustrative".
- No line from any watched video; no horse / safety-harness / wiring-harness imagery; no photoreal AI-generated people (E5).
