# TR Doc Check: `03-TR-doc.md` against the Session Teaching Guidelines

**Checked against:** `reference_projects/session_teaching_guidelines.md` (rules derived from the RAG, MCP and n8n videos and from the house TR docs).
**Date:** Sept 29, 2026 · **Result before fixes (Part B, 33 rules):** 18 met, 8 partial, 7 missing · **After fixes:** all applicable rules met (see the "Fix applied" column).

Rules that apply only to the on-camera script (E11 check-ins, X3 CTA, C2, C4, C6, C7) are checked against `01-session-script.md` / `04-recording-checklist.md`, and are listed at the end.

## Session outcome (the anchor for every rule)
> *Build a scam detector that decides fast — and knows when not to trust itself.*

Every section was checked for whether it moves toward this outcome. Nothing drifts: the problem (unreliable LLM decisions), the concept (typed decisions with probabilities), the build (threshold → test → race), the twist (confident mistakes) and the fix (a fallback) all serve it, and **What Changed** returns to it.

## Part 0: standalone session (added after review)
| ID | Status before | Gap | Fix applied |
|---|---|---|---|
| S1 | ❌ | The Introduction called back to the "AI Agents with n8n" video (10.11 > 10.9), the Problem section had a "Where This Session Sits" table listing the n8n and MCP videos, and the script said "Remember in our AI agents episode…" | All removed. The 10.11 callback is replaced by the in-session live demo ("See It Happen"), and the table by **"Where a Decision Model Fits"** (chat model / agent / decision model) |
| S2 | ⚠️ | The refresher was framed as "three things from earlier sessions" | Reframed as **"Three Terms We Will Use"**, taught in-session: API, JSON, API key |
| S3 | ✅ | The scam SMS, JEE (System Two) and DRS analogies are everyday references | — |
| S4 | ✅ | The unreliable-LLM evidence now comes from this session's own notebook cell | — |
| S5 | ✅ | Other videos appear only on the end card / in the CTA | — |

## Part A: the session arc
| Beat | Status | Where in the TR doc | Fix applied |
|---|---|---|---|
| 1 Hook | ✅ | Introduction: the electricity SMS → "What if the model could only decide…" | Added an early preview of the finished app (C1) |
| 2 Roadmap | ✅ | Key Takeaways + "How We Get There" | — |
| 3 Problem | ⚠️ Partial | "The Problem": code + table of replies, but no live demonstration | Added **"See It Happen"** with a real LLM call (new notebook cell in Step 0) (E8) |
| 4 Concept | ✅ | What Is Jev: System One/Two, OMR, the three types | Added a formal definition after the analogy (E7) |
| 5 Under the hood | ✅ | state → questions → answers; Reading the Answer | — |
| 6 Hands-on | ✅ | Steps 0–13, continuous | — |
| 7 Reality check | ✅ | The Twist, Steps 9–12, Going Further | — |
| 8 Recap | ⚠️ Partial | What Changed (before/after), but no recap list and no challenge | Added **Session Recap** and **Your Turn** (X1, X2) |

## Part B: rule-by-rule
| ID | Rule | Before | Evidence / gap | Fix applied |
|---|---|---|---|---|
| H1 | Personal pain first | ✅ | Opens on a phone buzzing with a scam SMS | — |
| H2 | "Imagine" contrast | ✅ | "Now imagine the phone could say…" | — |
| H3 | Promise a build | ✅ | "the project we build with it…" | Made it explicit: "By the end of this session…" |
| H4 | "That's where X comes in" | ✅ | "That is the model we meet in this session" | — |
| H5 | Roadmap | ✅ | Key Takeaways + How We Get There | — |
| H6 | Lower the fear | ❌ | No reassurance anywhere; the async code (Step 5) and calibration (Step 11) are the difficulty spikes | Added reassurance lines at Heads Up, Step 5 and Step 11 |
| E1 | Problem before solution | ✅ | The Problem comes before What Is Jev | — |
| E2 | Teach the prerequisite in-session | ⚠️ | What an LLM API call and JSON are was assumed | Added "Three Terms We Will Use" in the Introduction |
| E3 | Analogy per idea | ⚠️ | Analogies for LLM vs Jev (essay/OMR, System 1/2), but **none for thresholds or calibration**, the two hardest ideas | Added **DRS "umpire's call"** for the unsure zone and a **weather forecast** for calibration |
| E4 | Indian running example | ✅ | The electricity SMS runs from the hook through to the app's first example | — |
| E5 | Numbered steps | ✅ | Steps 0–13; state/questions/answers | — |
| E6 | Before/after | ✅ | The Problem table; What Changed table | — |
| E7 | Intuition, then definition | ⚠️ | The name "System One model" came before any intuition, and there was no one-line definition | Added a formal definition after the OMR analogy |
| E8 | Show the limitation live | ❌ | The failure was described in a table, never shown | New notebook cell + TR section "See It Happen" |
| E9 | Mini-recaps | ❌ | None | Added **"So Far"** recaps after What Is Jev, Step 3, Step 8 and Step 12 |
| E10 | Bridges | ✅ | Every step ends with a bridge sentence | — |
| E12 | Define terms at first use | ⚠️ | **"tokens"** used without definition in The Problem; "API key" is assumed | Defined tokens at first use; defined API key in Heads Up |
| P1 | State the build first | ✅ | What We Are Building + How We Get There | — |
| P2 | Free, beginner tools | ⚠️ | Colab is free, but OpenRouter needs a little paid credit; this was stated but not flagged | Made the cost explicit in Heads Up, with what it buys |
| P3 | Bare version first, then one capability at a time | ✅ | 1 Noul → 4 questions → threshold → test → race → fallback → app | — |
| P4 | Map back to theory | ✅ | Steps refer back to "three hopeful lines", Noul/Choice/Score | — |
| P5 | Keep real errors | ⚠️ | Model errors are covered (Step 9), but **setup/API errors** are not | Added "If it fails" notes at Steps 0, 1 and 5 |
| P6 | Normalise debugging | ❌ | Missing | Added a line in the Step 1 "If it fails" note |
| P7 | Verify real-world effect | ⚠️ | The app is tested with examples only | Step 13: test with a real message from your own phone (personal details removed) |
| P9 | Production lessons | ✅ | Going Further + the decision framework | — |
| P10 | Extension ideas | ✅ | Going Further: per-type thresholds, other decisions | — |
| X1 | Recap list | ❌ | Missing | Added **Session Recap** |
| X2 | Affirm / challenge | ❌ | Missing | Added **Your Turn** challenge |
| C1 | Result early | ❌ | The app first appears in Step 13 | Added a preview of the app's verdict in the Introduction |
| C3 | No overclaims | ✅ | "format guarantee is not a truth guarantee"; the safety warning | — |
| C5 | Measure | ✅ | The race, accuracy, threshold table, reliability plot | — |
| C8 | Pin versions and date | ⚠️ | Versions pinned; no recording date | Added a `**Recorded:** ⟦date⟧ · versions` line to the header |
| C9 | Vendor claims labelled | ✅ | "The Claims, and Why We Test Them Ourselves" | — |

## Part D: house format
| Item | Status |
|---|---|
| Title `- V1`, Series/Topic metadata, `---` | ✅ |
| Key Takeaways (bold, nested) | ✅ (updated for the new sections) |
| Introduction from a known moment + a bold `>` question | ✅ |
| The Problem with an artifact + comparison table | ✅ |
| Where This Session Sits | ✅ |
| Key line in a `>` quote per concept section | ✅ |
| What We Are Building + How We Get There (question → step) | ✅ |
| Steps labelled `**Notebook — Step N**`, bullets, expected output, bridge | ✅ |
| `<MultiLineNote>` / `<MultiLineWarning text="…">` | ✅ |
| What Changed returning to the opening artifact | ✅ |
| Final code in `<details>` | ✅ |
| Going Further + "When Should We…?" decision framework | ✅ |
| Diagrams as Image Blocks (PNGs to be made for `assets/`) | ⚠️ Prompts written; PNGs not yet created |

## Script-only rules (checked in `01-session-script.md` / `04-recording-checklist.md`)
| ID | Status |
|---|---|
| E11 conversational check-ins | ✅ in the script ("See the difference?"-style lines, reactions) |
| X3 CTA + "comment what's next" | ✅ script §9 |
| C2 no setup waiting | ✅ script ✂️ edit notes + checklist |
| C4 no PII or keys | ✅ checklist §3 + runbook sign-off |
| C6 outcome/conflict titles | ✅ slide outline title options |
| C7 corrected captions | ✅ checklist §5 |

## V2 revision (after reviewer feedback)
| Feedback | New rule | Change |
|---|---|---|
| "The hook is not catchy as expected" | **H7**: paradox → proof → stakes → secret | New hook: *"This AI can't write a single word… yet it finished 100 messages before the chatbot… one dangerous flaw."* It runs through the TR doc Introduction, script §1, slides 1–2, title and thumbnail. The flaw is revealed in Step 6 |
| "The code part is very difficult… teach only where we use Jev instead of a regular LLM" | **P11**: teach only the idea-carrying code | The plumbing moved to `jev_helpers.py`. The notebook went from 13 steps to 8 (Steps 0–8), with cells marked 🧑‍🏫 / ▶️. Taught code is about 35 lines: the old chatbot call (Step 1), **the swap** (Step 2), questions (Step 3), threshold (Step 4) and backup (Step 7). The TR doc's "What Changed" is now the swap, before vs after. Session length went from 32–35 to 22–25 min |

## V3 revision: YouTube investigation format (Sept 30, 2026)
The research behind it covered hook patterns, how top coding videos present code, 30+ existing Jev videos and their chapter structures, sourced Jev facts, and Laya.

| Decision | Why (evidence) | Change |
|---|---|---|
| Lead the hook with **Jev**, not the project | User direction. The big Jev videos all lead with Jev | Hook = TypeSafe's two claims ("can't hallucinate", "answers are free") + "one doesn't survive" + "I usually skip AI launches" |
| Drop "can't write a single word" | Already used by Devsplainers (42K); "LLMs generate, Jev decides" by TestMu | Removed |
| Structure: hype → why → different → replace? → demo → use cases → catch → Laya → verdict | Every top video defines Jev before the "replace?" question; demo-led winners start demos at 16–30%; nearly all have a catch and a verdict; Laya goes near the end (Fireship, CampusX) | 11 YouTube-style chapters, demo from 30% |
| YouTube style, not a lecture | User direction; hook research (Kallaway, Aprilynne Alter, Paddy Galloway, MrBeast guide) | Chapter titles as questions or teases, a re-hook at every chapter end, one open loop, face + screen, first person |
| Code: ~15 taught lines | Code research (Real Python, Dave Ebbelaar, codebasics): one swap + 3 bands | 4 taught moments: old way, the swap, "try to make it lie", the slider. The 3-question cell became ▶️; the fallback folded into the ⚠️ band |
