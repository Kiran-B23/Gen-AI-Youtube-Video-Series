# Reel script · Forward Deployed Engineer

**Archetype:** Concept (standard "how X works" sheet, the mechanism shown on one example) · **Viewer's question:** "What does a forward deployed engineer actually do, and should I aim for it?" · **Running example:** one AI claims assistant at an insurance company (illustrative): works in the demo, breaks inside the company, made to work by the FDE
**Tone:** curious and delighted, like a friend who just figured out what this job really is: brisk on the broken demo, slow and clear on what the engineer does, straight and calm on the travel, encouraging on what to practise · **Words:** see the count under the table · **Est. runtime:** ~93 s at the house pace (÷2.3 + 0.4 s per beat, `studio/templates/reel/pace.json`) · **Winners' range:** topic Shorts 87–172 s at 3.1–3.4 w/s

_Rows = the Concept reel beat sheet: Hook → The example → The concept (the definition) → Mechanism 1 (find) → Mechanism 2 (build) → Mechanism 3 (ship and feed back) → Why it matters to you (demand) → the content plan's material catch (travel + the bar) → Takeaway (what to practise) → Recap → CTA. Three mechanism steps (archetype max 3). Follows content-plan.md (2026-10-30), including its safe wording._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–6 s | [brisk] This AI assistant works in the demo. [beat] Inside a real company, it breaks. | 13 | `[TITLE]` | WORKS IN THE DEMO · BREAKS IN THE COMPANY | illustrative |
| 2 | The example | 6–9 s | Take an insurance company's claims assistant. | 6 | `[ANIMATE]` | Claims assistant (illustrative) · "Is my claim covered?" | illustrative |
| 3 | The example · the failure | 9–16 s | Inside, the policies are scanned PDFs. Claims sit in an old system the assistant can't reach. | 16 | `[ANIMATE]` | SCANNED PDFs 🔒 · OLD CLAIMS SYSTEM 🔒 | illustrative [S1] |
| 4 | The concept | 16–23 s | [slow down] The model's fine. Nobody connected it. [beat] That's the job of a forward deployed engineer. | 14 | `[TITLE]` | FORWARD DEPLOYED ENGINEER | [S1] [S2] |
| 5 | The concept · definition | 23–30 s | They work inside the customer's company, writing the code that makes the AI work there. | 15 | `[ANIMATE]` | INSIDE THE CUSTOMER'S COMPANY · WRITES THE CODE | [S1] [S2] |
| 6 | Mechanism 1 · find | 30–35 s | First, they sit with the claims team and find the real blocker. | 12 | `[ANIMATE]` | 01 FIND · the real blocker | [S3] [S1] |
| 7 | Mechanism 2 · build | 35–44 s | Then they connect the assistant to the PDFs and the old system. They test it on real claims. | 18 | `[ANIMATE]` | 02 BUILD · connects PDFs + old system · tested on real claims | [S2] [S3] |
| 8 | Mechanism 3 · ship | 44–48 s | They ship it. [smile] Now it answers inside the company. | 9 | `[ANIMATE]` | 03 SHIP · INSIDE THE COMPANY ✓ | [S3] |
| 9 | Mechanism 3 · feed back | 48–53 s | And they tell the product team where the model fell short. | 11 | `[ANIMATE]` | → PRODUCT TEAM · where it fell short | [S3] |
| 10 | Why it matters to you · re-hook | 53–60 s | [lean in] Why care? Job posts for this role rose over a thousand percent this year. | 14 | `[NUMBER]` | 1,000 %+ | [S4] |
| 11 | Why it matters to you | 60–63 s | Tech jobs overall? Up thirteen percent. | 6 | `[VS]` | 1,000 %+ vs 13 % | [S4] |
| 12 | The catch · fit check | 63–72 s | [calm] Is it for you? Palantir and Anthropic hire them. Both expect you to travel a quarter to half your time. | 20 | `[VERDICT]` | PALANTIR · ANTHROPIC · TRAVEL 25–50 % | [S1] [S2] |
| 13 | The catch · the bar | 72–78 s | And the bar varies. Palantir asks for six months' experience. Anthropic, four years. | 13 | `[VS]` | PALANTIR 6 MONTHS ↔ ANTHROPIC 4 YEARS | [S1] [S2] |
| 14 | Takeaway | 78–83 s | [warm] Want in? Build a small AI app on messy PDFs. | 10 | `[LIST]` | 1 · build on messy data | [S1] [S2] |
| 15 | Takeaway | 83–87 s | Test its answers. Then explain it to a non-coder. | 9 | `[LIST]` | 2 · test its answers · 3 · explain it | [S3] [S2] |
| 16 | Recap | 87–91 s | That's the job: find, build, ship, report back. | 8 | `[RECAP]` | FIND · BUILD · SHIP · REPORT BACK | [S1] [S3] |
| 17 | CTA | 91–93 s | What should I explain next? | 5 | `[CTA]` | What should I explain next? | — |

**Words:** 199 (read-aloud) · ~93 s at 2.3 w/s with 0.4 s per beat (target 75–90 s; plan ceiling 200)

**Pronunciation notes:** "PDFs" (P-D-F-s) · "Palantir" ("PAL-an-teer") · "Anthropic" ("an-THROP-ic") → `names`: Palantir, Anthropic, PDFs

**Re-hooks:** #4 at ~16 s ("Nobody connected it."), #10 at ~53 s ("Why care?"), #12 at ~63 s ("Is it for you?").

**Accuracy notes (content-plan claim safety):**
- #1–3 are our illustrative example, labelled "illustrative" on screen; no real product or insurer. "Works in the demo, breaks inside" is framing on our own example, never a claim about a named product.
- #3: the blocker is access to the company's data and systems, matching "engineered for a specific customer's reality" [S1]; never "the model is broken".
- #4–5: the definition by what it does: "embedding engineers directly with our customers" [S1], "work within customer systems to build production applications" [S2]; "inside the customer's company", never "lives at" or "moves in".
- #6 discovery and scoping [S3]; #7 connectors are what Anthropic lists as deliverables ("MCP servers, sub-agents, and agent skills") [S2] and "test it on real claims" is the eval-driven check [S3]; #9 is S3's field feedback ("where models succeed and where they fall short").
- #10–11: Lightcast via Fortune [S4]: "more than 1,000 %" Jan–Aug 2026 vs Jan–Aug 2025, against 13 % for tech postings; "this year" = 2026 so far; never "fastest" or "hottest".
- #12 "a quarter to half" = "25–50 % travel" in both postings [S1][S2]; "expect" matches Palantir's "Expect 25–50% travel".
- #13: Palantir 6+ months post-college [S1]; Anthropic 4+ years in a technical customer-facing role [S2]; "varies", never "freshers can't" / "anyone can".
- #14–15 are our advice built from the postings' requirements (Python, connectors, evals, customer-facing) [S1][S2][S3]; not a guarantee.
- #16 is the plan's three steps in one line.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

This AI assistant works in the demo. Inside a real company, it breaks.

Take an insurance company's claims assistant.

Inside, the policies are scanned PDFs. Claims sit in an old system the assistant can't reach.

The model's fine. Nobody connected it. That's the job of a forward deployed engineer.

They work inside the customer's company, writing the code that makes the AI work there.

First, they sit with the claims team and find the real blocker.

Then they connect the assistant to the PDFs and the old system. They test it on real claims.

They ship it. Now it answers inside the company.

And they tell the product team where the model fell short.

Why care? Job posts for this role rose over a thousand percent this year.

Tech jobs overall? Up thirteen percent.

Is it for you? Palantir and Anthropic hire them. Both expect you to travel a quarter to half your time.

And the bar varies. Palantir asks for six months' experience. Anthropic, four years.

Want in? Build a small AI app on messy PDFs.

Test its answers. Then explain it to a non-coder.

That's the job: find, build, ship, report back.

What should I explain next?
