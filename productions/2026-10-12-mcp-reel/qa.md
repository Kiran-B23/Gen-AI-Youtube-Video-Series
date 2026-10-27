# QA · How MCP works

Deterministic eval: `lint_package.py productions/2026-10-12-mcp-reel` (results at the bottom). Judgement checks below.

| Check | ✓ | Fix made |
|---|---|---|
| **Hook & structure** | | |
| The first spoken line *is* the hook (≤2 s); the first-frame visual is described | ✓ | "An AI model can't check the weather." is 7 words (~2.5 s at the calm read; the first 2 s carry the claim). Frame described in hooks.md |
| The hook is true and paid off by the end | ✓ | **Fixed:** "Your AI can't check the weather" was false for apps that already use tools; changed to "An AI model…" in every file. Paid off in s12–s14 (the call) and the recap |
| Archetype stated in brief.md with the viewer's question and the evidence | ✓ | — |
| The script follows that archetype's beat sheet (no merged sheets) | ✓ | Concept sheet + its foundation-first opening; the catch and recap are house-benchmark beats, not a second archetype |
| Every must-have of the archetype is present; none of its don'ts appear | ✓ | Shown, not described (13 `[ANIMATE]`/`[CODE]` beats); one analogy at most (none: USB-C named nowhere in the script); every number sourced; takeaway is an action (trusted servers, approvals on). Don'ts: no history lesson (launch date cut), exactly 3 mechanism steps, every term defined on screen (host/client label in s06) |
| One running example is introduced early and carried through | ✓ | The Tokyo question card, s02–s14 + recap |
| **Content** | | |
| Zero trivia lines | ✓ | Launch date, donation, SDK downloads, transports cut (research.md) |
| Every fact has a source tag that resolves in research.md, with date + label | ✓ | 11 cited, all resolve |
| Company claims worded as claims; unverified flagged | ✓ | "Anthropic says … use it. The same post counted over 10,000 public MCP servers."; the tool, arguments and answer are labelled illustrative |
| At least one honest catch | ✓ | s18–s22 tool poisoning (S11, S12), judged material by the content plan; high level only, no payload; three protections (trusted servers, check before approving, no "allow all") |
| YouTube analysis done: winners and low performers watched; findings written | ✓ | 5 watched; only one Short cleared 5K views (stated, confidence medium) |
| Differentiated angle stated and no copied lines | ✓ | Checked the script against the 5 transcripts: no shared phrasing; "USB-C", "HTTP of AI", "locked cabinet" not used |
| **Timing & pacing** | | |
| Runtime within budget | ✓ | 336 words ≈ 124 s, a long Short justified by 3 mechanism steps (benchmark depth); re-hooks at ~15 / 57 / 96 s |
| Reels: every beat tagged; beats ≤ 6 s or with a named internal change; no 4 s without a visual change; numbers on screen when spoken | ✓ | #1, #6, #8, #14 (6.3–8.9 s) each name an internal change in the storyboard; "10,000+" counts up on its word |
| Runtime and pace in the winners' range | ✓ | Shorter than the one winning Short (148 s); delivery ~2.6 w/s between the benchmark (2.3) and the winner (3.08) |
| **Visual design** | | |
| art-direction.md filled; palette from the house style | ✓ | reference-flat, sections.json (the 2026-10-11 rule replaces "palette from the concept") |
| Every storyboard element has a motion verb; spans marked; running object persists | ✓ | Spans A–G; question card ≈ 62 % of runtime |
| Section colours change at section breaks; transitions chosen | ✓ | dark → blue → dark → blue → light → yellow → blue → light → dark → yellow → dark; primary WIPE, accents PUSH IN (s04) and chapter cards |
| Structure check passed | ✓ | structure-check agent: PASS (2026-10-12); fixed its note: recap and on-screen steps now both use "01 / 02 / 03" |
| **Delivery & ending** | | |
| Reads naturally aloud; delivery cues present; no avoid-list words | ✓ | Ask-and-answer ("So why a standard?"), reactions ("Not once."), contractions |
| Clean read-aloud text present; captions read standalone; pronunciation notes | ✓ | No beat opens on an unclear "it"; s05 names "the app" |
| CTA present; ends on a comment question and loops | ✓ | Generic "What should I explain next?"; last frame navy like frame 0 |
| Publish kit complete | ✓ | 3 titles, thumbnail (4 words), description, sources, hashtags, pinned comment, repurposing (chapters n/a for a reel) |
| No sources on screen; mock UIs say "illustrative" | ✓ | the menu, the note and the result chip all carry "illustrative" |

| **Gates added mid-run (2026-10-12)** | | |
| Content plan (content-plan agent) | ✓ | READY; its 12 departures applied (S6 for the foundation, "never calls … itself", no "small", the description is shown and spoken in step 1, real JSON shape, "many apps", attributed adoption claim, catch split so the viewer learns they might not see the hidden text, approvals reframed as "check before you approve") |
| Script review (script-review agent) | ✓ | CHANGES (2 blocking: beat 3 source, beat 16 on-screen "every app") → fixed → PASS; optional rewrites for beats 8 and 17 applied |
| Storyboard + animation plan synced to the 24-beat script | ✓ | rows regenerated; structure check re-run on the storyboard |

**Lint (2026-10-12):** 34/34 passed (after these fixes: an italic note wrapped over 3 lines was read as spoken text with
an unsourced number (joined into one line), and `package.md` was added; then the two new gates were added).
