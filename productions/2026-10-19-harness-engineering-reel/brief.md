# Brief · Harness Engineering

| | |
|---|---|
| Topic | **Harness engineering**: designing everything around an AI model (instructions, tools, checks, feedback loops) so a coding agent does reliable work. Named in Feb 2026 (Hashimoto, OpenAI, Böckeler/Fowler, LangChain) [S1–S6] |
| Format(s) | reel (9:16, faceless) · the owner asked for a reel |
| Viewer | global tech audience · level: curious practitioner (default; uses or has tried a coding agent such as Claude Code, Codex or Cursor; has seen "harness" in their feed but can't say what it is) |
| **Viewer's question** | "What is harness engineering, and what would I actually do differently with my coding agent?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" + a mechanism; definition topic; not Tutorial: no imperative "build a harness"; not Trend: "prompt engineering is dead" framing is hype, not the viewer's question) → **confirmed after YouTube analysis: Concept** (standard "how X works" sheet). 3 of 3 winning Shorts and 2 of 3 long winners are Concept; the gap (no example, no proof, no guide/check split, no habit) is a mechanism gap, which the standard sheet's mechanism beats fill and the 45 s definition variant can't (inspiration.md) |
| **Tone (voice style)** | Curious and delighted, like revealing a trick a senior engineer uses: brisk on the loop, slow on the reveal "same model", plain and practical on the takeaway. |
| Must include | (provisional; the content plan decides) a one-line definition by what it does; agent = model + harness; the two halves (guides before the agent acts, checks after); the loop (check fails → agent fixes → passes); the habit "every mistake becomes a rule or a check"; one striking, sourced proof that the harness alone moves results |
| Running example | **one coding task an agent says it finished but didn't** (illustrative): "Add a password-reset button" → the agent writes it, re-reads its own code, says "Done ✓", and stops, while a test is red. This is the most common failure LangChain reports [S5]. We follow the same task card through guide → check → fix → pass |
| Angle (one sentence) | (provisional) Show on one task that the model isn't what made the agent fail: the same model, wrapped in a map, a check and a loop, gets caught by the test and fixes its own mistake, so the viewer learns the three things to add around their own agent today. |
| Chosen hook | (owner approved 2026-10-19) hooks.md #1, 20/20: "Your coding agent says 'Done.' The test says it isn't. The fix might not be a smarter model." First frame: a task card with a giant green "DONE ✓" stamp over a red "✗ 1 test failing" row |
| Runtime target | ~75–90 s (~170–200 words at the house pace 2.3 w/s, `studio/templates/reel/pace.json`); winning Shorts run 79–176 s but pad with part lists and plugs |
| Open questions / unverified | No "our test": we report LangChain's and OpenAI's published results as company claims. OpenAI's post blocks direct fetch; read through a text mirror (r.jina.ai) on 2026-10-19. |

## Locks (must never appear)
- No logos (OpenAI, Anthropic, LangChain, Claude, GitHub); product names as plain text only.
- No "prompt engineering is dead", "models don't matter", "AI writes all code now" or "no humans needed" claims.
- No claim that a harness makes an agent correct or bug-free (Böckeler: behaviour correctness is unsolved [S3]).
- No "we tested" / "our test" wording: we didn't run a benchmark.
- No sources on screen; code, files and UI on screen are labelled "illustrative".
- No line from any watched video; no horse / safety-harness / wiring-harness imagery that reads literal or kids-style.
