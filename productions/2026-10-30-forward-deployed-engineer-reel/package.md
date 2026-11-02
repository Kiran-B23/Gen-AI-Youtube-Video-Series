# Package · Forward Deployed Engineer (reel)

_For the editor: the brief, chosen hook, content plan, script, art direction, storyboard and publish kit in one file. Gates: content-plan READY · script-review PASS · Goldfish (voice + viewer text) · visual-plan PASS (plan + storyboard) · structure-check PASS · owner approved the script 2026-10-30. Build: `studio/projects/fde-reel/`._


---

<!-- brief.md -->
# Brief · Forward Deployed Engineer

| | |
|---|---|
| Topic | **Forward Deployed Engineer (FDE)**: the software engineer who works inside a customer's company to make an AI product actually work on that customer's real problem [S1–S3] |
| Format(s) | reel (9:16, faceless) · the owner asked for a reel |
| Viewer | global tech audience · level: curious practitioner / early-career developer (default; has seen "FDE" in job posts and feeds, can't say what the job is or whether it's for them) |
| **Viewer's question** | "What does a forward deployed engineer actually do, and should I aim for it?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept (chooser: "what is X" — a definition topic about a role's mechanism; not Trend: the viewer isn't asking "where is this going", they're asking what the job is; not Story: no first-person case) → **confirmed after YouTube analysis: Concept** (standard sheet, mechanism shown on one example). The only real topic Short is a career "should you" piece; the long-form winners are Tips and a podcast; none shows the job on one concrete problem — that gap is our angle (inspiration.md). The career stake sits in the "why it matters to you" and takeaway beats. |
| **Tone (voice style)** | Curious and delighted, like a friend who just figured out what this job really is: brisk on the broken demo, slow and clear on what the engineer does, straight and honest on the travel, encouraging on what to practise. |
| Must include | (provisional; the content plan decides) a one-line definition by what it does; why the role exists (an AI product doesn't plug into a company's old systems by itself); the work on one example (embed → find the real blocker → build in their systems → ship → feed back); the demand number with its source; the fit check (travel / mostly integration and people); what to practise |
| Running example | **one AI assistant that works in the demo and breaks inside a company** (illustrative): an insurance company's claims assistant; inside the company the answers sit in scanned PDFs and an old claims system the model can't reach. The FDE sits with the claims team, finds that blocker, builds the connector and a check, ships it, and sends what broke back to the product team. |
| Angle (one sentence) | Follow one AI demo that works on stage and breaks inside a real company, and watch a forward deployed engineer make it work — so you can say what the job is, why it exploded, and whether it's for you. |
| Chosen hook | #1 Paradox: "This AI assistant works in the demo. Inside a real company, it breaks." (20/20, hooks.md) |
| Runtime target | ~75–90 s (~170–200 words at the house pace 2.3 w/s, `studio/templates/reel/pace.json`); the topic's Shorts run 87–172 s |
| Defaults taken on autopilot | reel (owner's ask) · curious practitioner (skill default: no level given) · Concept (chooser + gap evidence) · illustrative running example (no real customer story is public and sourced; labelled "illustrative") · no "our test" (a job role, nothing to run) |
| Open questions / unverified | OpenAI's careers pages return 403 to our fetcher; S3 wording comes from the search index of the official pages. The "25/50/25" split (S6) is one analyst's reading of job ads, not a measurement. Growth numbers differ by data source (Lightcast >1,000 %, Indeed India ~19×, Bloomberry +1,165 %); we use one, named. |

## Locks (must never appear)
- No company logos (Palantir, OpenAI, Anthropic, Google, Salesforce…); company names as plain text only, and only where a fact needs them.
- No "$1 million a year" / "$1M job" or any salary outlier as a headline; pay only as the sourced median, if at all.
- No "AI will replace software engineers" / "coding is dead" / "the only AI job worth having" claims.
- No "anyone can become an FDE in 30 days" or guaranteed-job wording; no "freshers can't apply" either (bars vary: 6 months at Palantir, 4+ years at Anthropic).
- No claim that FDEs train or build the AI models; they build *with* them inside customers' systems.
- No real customer, company workflow or person shown as the example: the insurance claims case is illustrative and labelled so.
- No sources on screen; mock UIs and documents say "illustrative".
- No military imagery (soldiers, front lines) for "forward deployed"; no memes, stock clips or photoreal AI people.
- No line from any watched video.

---

<!-- hooks.md -->
# Hooks · Forward Deployed Engineer

_Written to beat the winners' hooks (inspiration.md): the top Short opens on an outlier salary ("$1M"), the contrast Short on jargon. Ours opens on the problem the job exists to solve, true and visual on mute._

| # | Formula | Hook line | First frame | Clarity | Curiosity | Accuracy | Frame | Note | Total |
|---|---|---|---|---|---|---|---|---|---|
| 1 | #1 Paradox | "This AI assistant works in the demo. Inside a real company, it breaks." | A big claims-assistant card: "DEMO ✓" green, already cracking into a red "INSIDE THE COMPANY ✗" | 5 | 5 | 5 | 5 | picked | 20 |
| 2 | #18 One-line definition | "A forward deployed engineer is the engineer who works inside the customer's company." | The title "FORWARD DEPLOYED ENGINEER" in giant type with a desk sliding into a building outline | 4 | 3 | 5 | 4 | — | 16 |
| 3 | #2 Striking number | "Job posts for this role grew more than ten times in a year." | "10×" in giant type over a rising bar | 4 | 4 | 4 | 5 | — | 17 |
| 4 | #7 Viewer's question | "Forward deployed engineer. AI companies are hiring them. What do they actually do?" | The job title stamped across a wall of postings | 4 | 4 | 4 | 4 | — | 16 |
| 5 | #8 Contrarian | "This booming AI job barely touches the AI." | "AI JOB" with the "AI" crossed out | 3 | 5 | 2 | 4 | accuracy: FDEs do build agents and MCP servers [S2] | 14 |
| 6 | #5 Contrast | "The demo took a day. Making it work for one company takes an engineer on site." | Split: "DEMO · 1 day" vs "REAL COMPANY · ?" | 3 | 4 | 3 | 4 | "a day" is invented | 14 |

**Pick:** #1 because it opens on the exact problem the role exists for (the gap between a model's demo and a company's real systems), is true for any illustrative AI product, works on mute, and sets up the payoff without a salary outlier. The role's name lands at beat 4 (~19 s), after the broken example; the demand stake (over 1,000 %, against 13 % for tech jobs) lands at the re-hook at ~54 s.
**First frame (described):** Full-bleed navy block. One idea, the demo working: "Works in the demo." in giant white Anton (140 px, two lines "Works in" / "the demo.") at y 360–650; below it a large white claims-assistant card (x 90–930, y 840–1240) tagged "illustrative", with a green answer "Yes, water damage is covered." and a green "DEMO ✓" stamp on its upper right. No crack, no red strip, no locks yet: each arrives on its own word (owner note 2026-10-30: the opening looked cluttered). Nothing in the bottom 20 % or right 12 %.
**How the video pays it off:** the same claims card is carried through every beat: the engineer joins the claims team, finds why it breaks (answers locked in scanned PDFs and an old claims system), builds the connector and a check, and the card turns green again "inside the company" — the cracked label from frame 0 is replaced by "INSIDE THE COMPANY ✓".

---

<!-- content-plan.md -->
# Content plan · Forward Deployed Engineer (reel)

_Written by the `content-plan` agent after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file._

_Format: reel, Concept archetype, ~75–90 s at the house 2.3 w/s → **170–195 spoken words** (hard ceiling 200). Official
postings S1 (Palantir) and S2 (Anthropic) and the Fortune/Lightcast figure (S4) were re-read on 2026-10-30; S3 (OpenAI)
still returns 403, so its wording is confirmed only through the search index of openai.com/careers (London, Munich,
Seoul and SF postings)._

## Viewer's question
"What does a forward deployed engineer actually do, and should I aim for it?"

## Core message
A forward deployed engineer works inside a customer's company and builds the code that makes an AI product work there.
_(19 words)_

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **Definition by what it does:** a software engineer who embeds with a customer's company and builds and ships production code with the AI product, inside that customer's systems. They build *with* the model, not the model itself. Palantir: "embedding engineers directly with our customers"; "custom applications, LLM workflows, and production solutions engineered for a specific customer's reality". Anthropic: "work within customer systems to build production applications with Claude models". | S1, S2 | company claim (official postings) |
| 2 | **Why the role exists:** an AI product doesn't plug into one company's real data and old systems by itself. Someone has to build it "for a specific customer's reality" (S1), "turn research breakthroughs into production systems" (S3). On our example, the demo works on clean data; inside the company the answers sit in scanned PDFs and an old claims system the assistant can't reach. | S1, S3 (example illustrative) | company claim + illustrative |
| 3 | **The work, as three steps on the running example:** (1) **find** the real blocker by sitting with the team ("discovery, technical scoping"), (2) **build** in their systems, meaning the connector to the claims system and PDFs plus a check: a set of real claims the answers are tested against (Anthropic lists "MCP servers, sub-agents, and agent skills" as deliverables; OpenAI ties success to "eval-driven feedback"), (3) **ship and feed back**: roll it out, then tell the product team where the model fell short ("field feedback that shows Research and Product where models succeed and where they fall short"). | S2, S3 | company claim (official postings; S3 via search index) |
| 4 | **Demand, one number, named:** FDE job postings rose **more than 1,000 %** in Jan–Aug 2026 vs the same months of 2025, against **13 %** for tech jobs overall (Lightcast data, reported by Fortune). | S4 | independent |
| 5 | **Fit check (the catch, see below):** Palantir and Anthropic both list **25–50 % travel** to customer sites. The entry bar varies by company: Palantir asks for **6+ months** of post-college experience, Anthropic **4+ years** in a technical customer-facing role. | S1, S2 | company claim (official postings) |
| 6 | **What to practise (the takeaway, an action):** build one small AI app that connects to a messy real source (PDFs, an old API) in Python, test its answers on real examples, and explain it to a non-engineer. Maps to: Python / one more language (S1, S2), connectors and agent tools (S2), discovery and evals (S3), "technical, customer-facing" (S2). | S1, S2, S3 | company claim (requirements in official postings), framed as our advice |

## Leave out
| Item | Why it's out |
|---|---|
| "$1M a year", "$530K offer", any salary headline | Brief lock; outliers, not representative. |
| Median pay ($188K vs $145K, S4) and company pay bands (£225–255k, S2) | US/UK advertised medians in dollars and pounds mislead an India-heavy audience without a region caveat longer than the claim; not needed for the core message. Plan/price/region detail. |
| The "25 % coding / 50 % integration / 25 % meetings" split (S6) | One analyst's reading of job ads, not a measurement. A number on screen would look like data. The qualitative point ("you'll talk to the customer as much as you code") is covered by S3's discovery/scoping and S2's "customer facing" without a number. |
| India's "19-fold" Indeed figure (S5) | A second growth number with a different source, base and region; it fell to ~16× in July and >6× in August, so the headline needs a caveat. One named number (S4) is enough. The Indeed India quote in research.md ("sit with a customer, unpack a real problem…") was **not** found on re-reading the People Matters page: do not use it. |
| OpenAI Deployment Company, $4B, Tomoro, Anthropic's venture, AWS's FDE org (S7) | Business news / trivia; doesn't change what the viewer does. Primary announcements not fetched. |
| Bloomberry +1,165 %, Business Insider 643 → 5,330 (S8) | Second-hand; S4 is the cleaner single source. Mixing numbers invites "which is it?". |
| Title variants (Applied AI Engineer, Deployment Engineer… S9) | Useful for a job search but recruiter-blog sourced and costs ~12 words; long-form/description material. |
| Palantir "invented" the role / its history / "Delta" and "Echo" labels | History lesson and insider trivia; S4 only supports "has long used a forward-deployed model". |
| Military origin of "forward deployed" | Brief lock; off-tone. |
| Interview format (OOP Python live, take-homes) | A different video (Tips); not the viewer's question here. |
| Equity in spun-out FDE ventures, scope creep, "consultant drift" (S6) | Opinion, niche, needs a long caveat. |
| Solutions engineer / consultant comparison | Costs a beat; the single contrast we need ("they ship code, not slides") is inside point 1. |
| Company names in general | Plain text only where a fact needs them (Palantir and Anthropic on the travel/bar beat, Lightcast on the number if said). No logos. |

## Catch decision
**Catch:** include
**Why:** It is material to the viewer's own question ("should I aim for it?") and the hype videos bury it under salary
hooks. Exact point: **"Both Palantir and Anthropic list a quarter to half of your time travelling to customer sites"**
[S1: "Expect 25–50% travel, depending on team and location."; S2: "Travel frequently (25-50%) to customer sites"].
It's a lifestyle cost that changes the decision, from two official postings. Pair it with the honest bar (6+ months at
Palantir, 4+ years at Anthropic) so it reads as a fit check, not a warning. Say it once, in a calm, straight tone; no
"but here's the dark side".

## Running example
**One AI claims assistant at an insurance company (illustrative, labelled on screen).** The demo card answers "Is my
claim covered?" perfectly. Inside the company it breaks: the policy wording sits in scanned PDFs and the claim status in
an old claims system the assistant can't reach. The FDE sits with the claims team, finds that blocker, builds the
connector and a check (answers tested against real past claims), ships it (the card turns green "inside the company"),
and sends what broke back to the product team.
Why it fits: it's the role's whole loop in the postings' own verbs (embed, discover, build, roll out, feed back), it's
the AI-agent work S2 lists (connectors/MCP servers), and "works in the demo, breaks in the real system" is something
every student who has shipped a project has felt. One object, never swapped.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "moves in with the customer" / "lives at the client" (UNSAFE as literal) | "embeds directly with" customers; 25–50 % travel, so not full-time on site | "works inside the customer's company, often on site" / "sits with the customer's team" | S1, S2 |
| "fastest-growing job" / "hottest job in tech" / "#1 AI job" (UNSAFE) | no source ranks it | "job posts up more than 1,000 % this year, against 13 % for tech jobs overall" | S4 |
| "10× in a year" (safe only as "more than") | ">1,000 %" rise = more than 11×, Jan–Aug 2026 vs Jan–Aug 2025 | "more than ten times" / on screen "1,000 %+" or "10×+"; don't call it worldwide or Indian data | S4 |
| "every AI company is hiring" (UNSAFE) | named hirers: Palantir, Microsoft, Meta, Google, OpenAI, Anthropic | "Palantir, OpenAI, Anthropic and Google are all hiring them" or "AI companies are hiring" | S4 |
| "barely touches the AI" / "no AI work" (UNSAFE) | they deliver "MCP servers, sub-agents, and agent skills", "LLM workflows" | "builds *with* the AI model inside their systems" | S1, S2 |
| "trains / builds the models" (UNSAFE, brief lock) | they build applications with the models | "builds with the model, not the model itself" | S1, S2 |
| "it's just consulting" / "no coding" (UNSAFE) | "build … production solutions", own "build and production rollout" | "they ship real code" | S1, S3 |
| "always travelling" / "half your life on the road" (UNSAFE) | "25–50 % travel, depending on team and location" | "a quarter to half of your time travelling, in Palantir's and Anthropic's postings" | S1, S2 |
| "freshers can't apply" / "anyone can get in" (both UNSAFE, brief lock) | 6+ months post-college (Palantir); 4+ years (Anthropic) | "the bar varies: six months' experience at Palantir, four years at Anthropic" | S1, S2 |
| "only needs Python" (UNSAFE) | Palantir: any one language "such as Python, Java, C++, TypeScript/JavaScript"; Anthropic: Python | "Python is the safe bet" / "Python plus one more language" | S1, S2 |
| "Palantir invented the role" (UNSAFE) | "has long used a forward-deployed model" | leave out (see Leave out) | S4 |
| "The AI demo works perfectly" (safe only as illustrative) | a framing on our own made-up example | keep, with the card labelled "illustrative"; never name a real product or insurer | brief |
| "the FDE fixes the model" (UNSAFE) | they fix the *connection* and *report* model gaps back | "finds what's blocking it", "tells the product team where the model fell short" | S3 |
| "pays $188K" (out) | US median advertised, Lightcast | not used | S4 |

**Grep after scripting:** "fastest", "hottest", "every", "only", "never", "always", "invented", "$", "million", "lakh",
"train" across script, hooks, storyboard and brief (the LangGraph lesson).

## Depth (what the viewer must see, not just hear)
- **The gap, shown on the card:** the same claims card answers in the demo (clean data), then cracks inside the company
  because its answers sit behind two locked boxes (scanned PDFs, the old claims system) the assistant can't reach. The
  viewer must *see* that the model is fine and the access is the problem.
- **Find → Build → Ship & feed back (a 3-step tracker, max 3 steps):** the engineer joins the claims team and points at
  the locked boxes (find); a connector line draws from the assistant into both boxes, and a check runs the answers
  against a stack of real past claims (build); the card turns green with "INSIDE THE COMPANY ✓", then an arrow carries a
  "what broke" note back to the product team (ship & feed back).
- **The demand number on screen as it's spoken:** "1,000 %+" against "13 %" as two giant numbers (a duel), not list text.
- **The fit check as a split:** travel 25–50 % and the bar (6 months ↔ 4 years) on one card, then the takeaway as ≤ 3
  practice items on a recap card (connect AI to messy data · test its answers · explain it to a non-engineer).

## Status
- [x] Content plan ready (2026-10-30)

---

<!-- script-reel.md -->
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

---

<!-- art-direction.md -->
# Art direction · Forward Deployed Engineer

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`) · default, one line why: the owner's house style for every reel.
- **Accent that leads:** **green-vs-red on navy** for the hook (DEMO ✓ in the dark section's `ok` #2ED3A0 against INSIDE THE COMPANY ✗ in `danger` #FF4D5E); **yellow** for the number and verdict beats (#FFD23F on navy / navy on yellow).
- **Dials:** **stylised** (a Concept: the claims assistant, the PDFs and the old system are clean diagram objects, not a replica of any real product) · **image-led** (CC0 bed ducked under speech; one cue per visible action)

## Reference board (style lock)
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object followed through every step; numbered mechanism steps with a small tracker; flat colour blocks changed at every section; giant Anton type for the hook and the numbers; a recap chain before the CTA |
| 2 | `studio/projects/harness-reel/` (ours, 2026-10-30) | a **fixed workbench** where the stations stay put and only the running object and its connections change; the hook frame replayed as the earned payoff (frame 0's ✗ label becomes ✓) |
| 3 | `yt/Dr174JDdNXo/sheet.jpg` (Shade of Code, analysis only) | pace lesson only: a visual change every ~2 s keeps a career topic moving; we get it from the card changing state and the camera, never from memes, stock clips or logos |
| 4 | `yt/SdneobvQOi4/sheet.jpg` (Salesforce Careers, analysis only) | what *not* to do: one static shot for 100 s while the voice lists jargon; every beat of ours changes the object on its word |

_No frame, line, drawing, palette or layout is copied from refs 3–4 (other creators); they are listed for pacing contrast only. Files stay in git-ignored `yt/`._

## Concept → visual world
- **Central metaphor:** **the demo card and the company's locked boxes.** The AI works on its own card; inside a company it has to reach data in boxes it can't open. The forward deployed engineer is the one who walks into the company outline and draws the wires. Same model all the way through: what changes is the connections.
- **Running object:** the **claims-assistant card** (white card, ink border, "illustrative" tag): header "Claims assistant", the question bubble "Is my claim covered?", an answer bubble, and a status strip at its foot (DEMO ✓ → INSIDE THE COMPANY ✗ → INSIDE THE COMPANY ✓). It is cracked, connected, tested, answered, and finally docked as a small "Claims assistant ✓" chip that stays on screen through the numbers.
- **Steps** (a real Concept mechanism, 3 steps; numbering subject to the structure check): 01 Find · 02 Build · 03 Ship (and report back)

## Locks (must never happen)
- No company logos (Palantir, Anthropic, OpenAI, Google, any insurer's); company names only as plain text chips on s12–s13.
- No dollar, rupee or pound amounts anywhere (no pay; the claims answer names no amount).
- No "fastest", "hottest", "#1 job", "every company" text on screen.
- Never "AI replaces engineers", "coding is dead" or "the model is broken" on screen; the `MODEL` pill stays green-ringed "fine" from s04 on.
- No military imagery, soldiers, maps with arrows "to the front", no memes, no stock clips, no photoreal or cartoon people: people are plain labelled chips ("FDE", "CLAIMS TEAM", "PRODUCT TEAM").
- No real product UI copied; the claims card, PDFs, the old system and the feedback note are labelled "illustrative".
- No sources on screen.
- Numbers hidden until they count: "1,000 %+", "13 %", "25–50 %", "6 MONTHS", "4 YEARS" appear only on their words.
- Nothing right of x 950 or below y 1460 (captions excepted).

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** STAMPS (DEMO ✓, the ✗/✓ status, BLOCKER) · TYPES OUT (the card header, answers, the feedback note) · SCANS (the scanned PDFs; the find step's search ring) · ROUTES (the FDE badge into the company; the feedback note to the product team) · DRAWS (the company outline; the connector wires) · FILLS (the job-post grid; the week strip for travel; the test ticks) · COUNTS UP (1,000 %+, 13 %, 25–50 %, 6 months, 4 years) · RACES (the two demand bars) · SHRINKS AWAY (the workbench into the docked chip) · BUILDS WORD BY WORD (the recap chain) · PUSH IN (the locks, the answer) · WIPE (section changes)
- **Section colour per chapter:** hook `dark` → the example `light` → the concept `blue` → 01 Find `yellow` → 02 Build `light` → 03 Ship `dark` → why care `yellow` → is it for you `light` → want in `blue` → recap `yellow` → CTA `dark`
- **Music:** `inventing-flight` ("curious, building") · default pick, one line why: the reel builds a solution step by step, and the harness reel already used `fresh-focus`.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video (full card s01–s09 ≈ 52 s, docked chip s10–s13 ≈ 22 s, card in the recap s16 ≈ 4 s: ~84 % of ~93 s)
- [x] Locks written

---

<!-- storyboard-reel.md -->
# Storyboard · Forward Deployed Engineer · reel · archetype: Concept

_One row per script beat (17), expanded from animation-plan.md row for row (same section titles, verbs, cue words, cam and sfx).
Times are the script's estimates at the house pace; the voice take sets the real ones. Sources never appear on screen: the
"Source pill" column says where each fact is credited (the description / pinned comment)._

| # | Beat | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | s01 hook | 0–6 s | This AI assistant works in the demo. Inside a real company, it breaks. | `[TITLE]` | dark | frame 0: "Works in the demo." in giant white type over the claims card (green answer, "DEMO ✓" stamp), nothing else; from frame 0 the stamp SETTLES (1.10 → 1.00) and the answer PULSES at 0.5 s; on "assistant" the green answer is RINGED; on "demo" the DEMO ✓ stamp THUMPS and inks; on "Inside" a building outline DRAWS around the card's lower half; on "company" two grey lock chips DROP onto the outline's floor and the headline dims; on "breaks" the crack DRAWS across the card, the red "INSIDE THE COMPANY ✗" strip STAMPS in, the answer GLITCHES to red "Sorry, I can't find that." and the headline SWAPS to red "Breaks in the company." · **cues:** assistant · demo · Inside · company · breaks · **cam:** no cam | cold open (frame 0 already complete) | Works in the demo.; DEMO✓; then Breaks in the company.; COMPANY✗ | pop (assistant) · stamp (demo) · whoosh (Inside) · pop (company) · stamp (breaks) | none on screen (description: illustrative) |
| 2 | s02 example | 6–9 s | Take an insurance company's claims assistant. | `[ANIMATE]` | light | WIPE to light; the hook text LIFTS OFF; the card SLIDES UP and SHRINKS to the workbench (y 300–700), crack and strip cleared, answer bubble empty; on "insurance" the header TYPES OUT "Claims assistant · Insurance Co." with its "illustrative" tag; on "claims" the question bubble "Is my claim covered?" POPS · **cues:** insurance · claims · **cam:** no cam | WIPE to light | Claims assistant · Insurance Co. · illustrative · Is my claim covered? | whoosh (wipe) · key (insurance) · pop (claims) | none on screen (description: illustrative) |
| 3 | s03 example · failure | 9–16 s | Inside, the policies are scanned PDFs. Claims sit in an old system the assistant can't reach. | `[ANIMATE]` | light | on "policies" the PDF box SLIDES UP from below with three tilted page tiles; on "scanned" a scan line SCANS the tiles top to bottom, leaving grey grain; on "Claims" the old-system box SLIDES UP; on "system" its screen TYPES OUT "CLAIM 4471 · OPEN"; on "reach" two dashed wires RUN from the card's foot toward both boxes and SNAP short halfway, a lock chip STAMPS on each box, and the answer bubble TYPES OUT red "Sorry, I can't find that." · **cues:** policies · scanned · Claims · system · reach · **cam:** [510, 1040, 1.4] on "scanned" (the new actors), home on "reach" (both broken wires and the red answer in view) | continuous (no cut) | SCANNED PDFs · OLD CLAIMS SYSTEM · Sorry, I can't find that. | whoosh (policies) · tick (scanned) · whoosh (Claims) · key (system) · stamp (reach) | none on screen (description: illustrative [S1]) |
| 4 | s04 concept | 16–23 s | The model's fine. Nobody connected it. That's the job of a forward deployed engineer. | `[TITLE]` | blue | WIPE to blue; on "fine" a navy `MODEL` pill POPS into the card header with a green ring that PULSES once (the model is fine); on "connected" the two broken wire gaps FLASH yellow; on "job" an empty dashed badge slot (no text) DRAWS between the two gaps, the place someone has to fill; on "forward" the whole workbench SHRINKS (scale 0.6, to y 780–1440) and "FORWARD DEPLOYED ENGINEER" SLAMS in white Anton 140 px, three lines, at y 260–720; on "engineer" its last word underlines in yellow · **cues:** fine · connected · job · forward · engineer · **cam:** [510, 760, 1.5] on "connected" (the two gaps), home on "forward" | WIPE to blue | MODEL · FORWARD DEPLOYED ENGINEER | pop (fine) · tick (connected) · pop (job) · stamp (forward) · none (engineer: < 0.35 s after a stamp) | none on screen (description: [S1] [S2]) |
| 5 | s05 concept · definition | 23–30 s | They work inside the customer's company, writing the code that makes the AI work there. | `[ANIMATE]` | blue | the title COLLAPSES into the navy "FDE </>" badge (the three words SHRINK AWAY to its letters) parked at the left edge, and the workbench GROWS back to full size; on "inside" the company outline DRAWS around the workbench and the badge ROUTES in through a gap in its left wall to its spot (x 410–670, y 1300–1396); on "company" the label "CUSTOMER'S COMPANY" TYPES OUT on the outline's top edge; on "code" a mono line `connect( )` TYPES OUT beside the badge; on "AI" the badge PULSES; on "there" a short yellow dashed line DRAWS from `connect( )` toward the broken wires · **cues:** inside · company · code · AI · there · **cam:** no cam | continuous (no cut) | FDE </> · CUSTOMER'S COMPANY · connect( ) | whoosh (inside) · key (company) · key (code) · pop (AI) · tick (there) | none on screen (description: [S1] [S2]) |
| 6 | s06 step 01 find | 30–35 s | First, they sit with the claims team and find the real blocker. | `[ANIMATE]` | yellow | WIPE to yellow; the step tracker SLIDES DOWN into the top band with "01 FIND" filled; on "sit" the badge SLIDES right to make room; on "claims" a "CLAIMS TEAM" chip POPS beside it (x 90–370, y 1300–1396); on "find" a search ring SCANS from the card along both wires to the two locks; on "blocker" the ring LANDS on the locks and a red "BLOCKER" stamp STAMPS across the gap between the boxes · **cues:** First · sit · claims · find · blocker · **cam:** [510, 900, 1.6] on "find" (the ring on the locks), home on "blocker" | WIPE to yellow | 01 FIND · CLAIMS TEAM · BLOCKER | whoosh (First) · whoosh (sit) · pop (claims) · tick (find) · stamp (blocker) | none on screen (description: [S3] [S1]) |
| 7 | s07 step 02 build | 35–44 s | Then they connect the assistant to the PDFs and the old system. They test it on real claims. | `[ANIMATE]` | light | WIPE to light; tracker "02 BUILD" fills; the BLOCKER stamp SHRINKS AWAY; on "connect" the left wire DRAWS solid from the card's foot down; on "PDFs" it reaches the PDF box, the lock FLIPS open (green) and a pulse RUNS up the wire into the card; on "system" the right wire DRAWS solid into the old-system box and its lock FLIPS open; on "test" a row of five small claim tiles SLIDES IN under the card's answer (y 610–690, replacing the status strip for this beat); on "real" the five tiles FILL with green ticks one by one (0.15 s apart) · **cues:** connect · PDFs · system · test · real · **cam:** [300, 900, 1.5] on "PDFs" (the lock that opens), home on "test" | WIPE to light | 02 BUILD · five claim tiles ✓ | whoosh (wipe) · pop (connect) · ding (PDFs) · ding (system) · pop (test) · tick (real) | none on screen (description: [S2] [S3]) |
| 8 | s08 step 03 ship | 44–48 s | They ship it. Now it answers inside the company. | `[ANIMATE]` | dark | WIPE to navy; tracker "03 SHIP" fills; on "ship" the card LIFTS slightly and a "LIVE" chip STAMPS on its header; on "Now" a green pulse RUNS up both solid wires into the card; on "answers" the answer bubble TYPES OUT green "Yes, water damage is covered." (5 words) and a small mono "policy p. 12" tag POPS under it; on "company" the status strip STAMPS "INSIDE THE COMPANY ✓" in green, replaying the frame-0 strip with the ✗ turned ✓ · **cues:** ship · Now · answers · company · **cam:** [510, 520, 1.5] on "answers" (the answer typing), home on "company" | WIPE to dark | 03 SHIP; LIVE; Yes, water damage is covered.; INSIDE THE COMPANY✓ | stamp (ship) · tick (Now) · key (answers) · stamp (company) | none on screen (description: [S3]) |
| 9 | s09 step 03 report back | 48–53 s | And they tell the product team where the model fell short. | `[ANIMATE]` | dark | on "tell" a small note card POPS from the badge (mono 30 px, illustrative); on "product" the whole company SHRINKS to the left 62 % (anchored x 60) and a "PRODUCT TEAM" box SLIDES IN on the right (x 690–940, y 640–860); the note ROUTES out through the company wall into it (the route runs across "team where"); on "model" the card's `MODEL` pill PULSES once (the note is about the model, the pill stays green "fine"); on "short" the note TYPES OUT "misreads handwritten notes" (2 lines) inside the product box · **cues:** tell · product · model · short · **cam:** no cam | continuous (no cut) | PRODUCT TEAM · misreads handwritten notes (illustrative) | pop (tell) · whoosh (product) · tick (model) · key (short) | none on screen (description: [S3]) |
| 10 | s10 why care | 53–60 s | Why care? Job posts for this role rose over a thousand percent this year. | `[NUMBER]` | yellow | WIPE to yellow; the whole workbench SHRINKS AWAY into the docked chip "Claims assistant ✓" top-left; on "posts" a grid of small job-post tiles FILLS x 90–930, y 340–1300 (6 × 8, each a white mini card with two grey lines, no text) tile by tile; on "rose" the grid's rows STACK upward and a yellow up-arrow DRAWS along its left edge; on "thousand" a giant navy "1,000 %+" COUNTS UP (Anton 200 px, ≈ 720 px wide, centred; 280 px would cross x 950) over the grid, which dims to 30 %; on "year" a small "this year" chip POPS under the number · **cues:** care · posts · rose · thousand · year · **cam:** [540, 760, 1.3] on "thousand" (the number), home on "year" | WIPE to yellow | Claims assistant ✓ · 1,000 %+ · this year | whoosh (care) · tick (posts) · whoosh (rose) · ding (thousand) · pop (year) | none on screen (description: [S4]) |
| 11 | s11 why care | 60–63 s | Tech jobs overall? Up thirteen percent. | `[VS]` | yellow | the "1,000 %+" SHRINKS to the top of a tall navy bar on the left (x 140–440); on "Tech" a second bar slot DRAWS on the right labelled "ALL TECH JOBS" (x 600–900); on "Up" the right bar starts to RACE up; on "thirteen" it stops at a short stub while "13 %" COUNTS UP (Anton 160 px, centred over the bar, inside x 590–910) above it; the tall bar holds, the gap is the picture · **cues:** Tech · Up · thirteen · **cam:** no cam | continuous (no cut) | 1,000 %+ · ALL TECH JOBS · 13 % | pop (Tech) · whoosh (Up) · ding (thirteen) | none on screen (description: [S4]) |
| 12 | s12 is it for you · catch | 63–72 s | Is it for you? Palantir and Anthropic hire them. Both expect you to travel a quarter to half your time. | `[VERDICT]` | light | WIPE to light; the docked chip stays top-left; on "you" a section header "IS IT FOR YOU?" TYPES OUT in Inter 900 56 px at y 330–400 (not giant: the verdict below is the giant line); on "Palantir" a plain-text chip "PALANTIR" POPS at left (x 90–470, y 540–620); on "Anthropic" "ANTHROPIC" POPS at right (x 550–930); on "Both" a bracket DRAWS under the two chips, joining them, and points down; on "travel" a week strip of 10 cells (x 90–930, y 760–900) labelled "YOUR TIME" DRAWS out of the bracket and a suitcase chip (simple outline) SLIDES onto it; on "quarter" the first 25 % FILLS navy and "25 %" COUNTS UP; on "half" the fill RUNS on to 50 % as a striped range and the label becomes the verdict "TRAVEL 25–50 %" in Anton 120 px (≈ 760 px wide, x 160–920, y 950–1100; 160 px would cross x 950) · **cues:** you · Palantir · Anthropic · Both · travel · quarter · half · **cam:** [510, 830, 1.3] on "travel" (the strip), home on "half" | WIPE to light | IS IT FOR YOU?; PALANTIR; ANTHROPIC; YOUR TIME; TRAVEL 25–50% | pop (you) · pop (Palantir) · pop (Anthropic) · whoosh (Both) · whoosh (travel) · tick (quarter) · stamp (half) | none on screen (description: [S1] [S2]) |
| 13 | s13 the bar | 72–78 s | And the bar varies. Palantir asks for six months' experience. Anthropic, four years. | `[VS]` | light | the strip SHRINKS AWAY and the verdict SHRINKS into a "TRAVEL 25–50 %" chip (mono 34 px, x 560–930, y 230–290) beside the docked chip, where it stays to the end of s13 (numbers persist); the "IS IT FOR YOU?" header SHRINKS AWAY (keeps the frame ≤ 12 words); the two name chips stay; on "varies" a horizontal bar DRAWS left to right (0.9 s) between the chips with "EXPERIENCE" over it; on "six" a "6" COUNTS UP 1 → 6 under "PALANTIR" (Anton 150 px) with "MONTHS" (Inter 800 40 px) under it, inside x 90–470; on "four" a "4" COUNTS UP under "ANTHROPIC" with "YEARS" under it, inside x 550–930, and the bar TILTS toward it (the bar varies) · **cues:** varies · six · four · **cam:** no cam | continuous (no cut) | EXPERIENCE; PALANTIR 6 MONTHS; ANTHROPIC 4 YEARS; TRAVEL 25–50% | pop (varies) · ding (six) · ding (four) | none on screen (description: [S1] [S2]) |
| 14 | s14 want in | 78–83 s | Want in? Build a small AI app on messy PDFs. | `[LIST]` | blue | WIPE to blue; the docked chip stays top-left; on "Want" a section header "WANT IN?" TYPES OUT (Inter 900 56 px, y 330–400); no tracker in the top band (that band belongs to the FDE's 01–03 steps); on "Build" the docked chip throws off a copy that GROWS into a blank card the shape of the claims card (x 90–620, y 480–900, empty bubbles, dashed border) and a plain label "BUILD" (mono 34 px, no number, no fill state) TYPES OUT on the card's top edge; on "app" its header TYPES OUT "Your app"; on "PDFs" the scanned-page tile stack from s03 DROPS in at its right (x 680–930, y 560–820), slightly crooked (the messy data), and a wire DRAWS solid from the stack into the card · **cues:** Want · Build · app · PDFs · **cam:** no cam | WIPE to blue | WANT IN? · BUILD · Your app | pop (Want) · whoosh (Build) · key (app) · pop (PDFs) | none on screen (description: [S1] [S2]) |
| 15 | s15 want in | 83–87 s | Test its answers. Then explain it to a non-coder. | `[LIST]` | blue | on "Test" a plain label "TEST" (mono 34 px) TYPES OUT at the left of the tile row, the row of five claim tiles from s07 SLIDES IN under "Your app" (y 930–1010) and FILLS with green ticks one by one (0.15 s apart) while its answer bubble TYPES OUT a short grey line; on "explain" a plain label "EXPLAIN" (mono 34 px) TYPES OUT above the coming bubble and a "NON-CODER" chip POPS at the right (x 680–930, y 1060–1140); on "non-coder" a speech bubble ROUTES from "Your app" to the chip and the chip's outline turns green · **cues:** Test · explain · non-coder · **cam:** no cam | continuous (no cut) | TEST · EXPLAIN · NON-CODER | tick (Test) · pop (explain) · whoosh (non-coder) | none on screen (description: [S3] [S2]) |
| 16 | s16 recap | 87–91 s | That's the job: find, build, ship, report back. | `[RECAP]` | yellow | WIPE to yellow; the docked "Claims assistant ✓" chip GROWS back into the small claims card (answer green, status ✓) at the centre-top (x 240–840, y 260–520), the same object, not a new card; the recap chain (four chips at x 90–930, y 640–900, mono 40 px) BUILDS WORD BY WORD below it as four linked chips with arrows: on "find" FIND, on "build" BUILD, on "ship" SHIP, on "report" REPORT BACK (the last arrow loops up to the card) · **cues:** job · find · build · ship · report · **cam:** no cam | WIPE to yellow | FIND → BUILD → SHIP → REPORT BACK | pop (job) · pop (find) · pop (build) · pop (ship) · pop (report) | none on screen (description: [S1] [S3]) |
| 17 | s17 CTA | 91–93 s | What should I explain next? | `[CTA]` | dark | WIPE to navy; on "explain" the question BUILDS WORD BY WORD (Anton 130 px, ctaWords, wrapped inside x 90–930); on "next" a "Follow for more AI breakdowns" pill SLIDES UP below it (y 980–1060) · **cues:** explain · next · **cam:** no cam | WIPE to dark | What should I explain next? · Follow for more AI breakdowns | whoosh (explain) · pop (next) | none on screen (description: —) |

_Text overlay lists the headline words a viewer reads; small UI labels inside the illustrative card (header, status strip, CLAIM 4471 · OPEN, IS IT FOR YOU? header) are described in the visual column._

_Reels: a visual change every ≤ 2.5 s (every row has a cue on each spoken phrase); captions at 81–90 % height, ≤ 9 words per card (s05 splits at its comma); keep the bottom 20 % / right 12 % clear (everything inside x 60–950, y 222–1460); generic chips, no logos, no people drawn. s14–s15 use the unnumbered labels BUILD / TEST / EXPLAIN (structure check)._

**Continuous spans** (copied from animation-plan.md):
- s02–s09: one workbench; the claims card, boxes and wires never cut, only change state (the section colour wipes under them).
- s10–s15: the docked "Claims assistant ✓" chip stays top-left (s14 copies it into "Your app"); s16: it GROWS back into the small card for the recap.
- s10–s11: "1,000 %+" never leaves: it counts up, then rides the tall bar. s12–s13: "TRAVEL 25–50 %" lands, then parks as a chip beside the docked chip.

_s08's "policy p. 12" tag stays small mono (≤ 30 px)._

---

<!-- publish.md -->
# Publish kit · Forward Deployed Engineer

## Titles (pick 1)
1. What a Forward Deployed Engineer Actually Does (default: names the role and answers the viewer's question)
2. The AI Demo Worked. Then It Met a Real Company.
3. Forward Deployed Engineer, Explained on One Broken AI App

_Patterns from the winners (inspiration.md): the role's full name in the title, a promise to explain what it "actually" is. No salary numbers (lock)._

## Thumbnail concept (≤4 words of text)
The claims-assistant card from frame 0 on navy: green "DEMO ✓" above, a red crack, red "COMPANY ✗" below. Text: **"WHAT FDEs DO"** in yellow Anton. No logos, no faces.

## Caption / description
An AI assistant works in the demo, then breaks inside a real company. Fixing that gap is the job of a forward deployed engineer: they work inside the customer's company, find the real blocker, connect the AI to the company's data, ship it, and report back where the model fell short. Job posts for the role rose over 1,000 % in Jan–Aug 2026 vs the same months of 2025 (Lightcast data, reported by Fortune). Before you aim for it: Palantir and Anthropic both list 25–50 % travel, and the experience bar varies (6+ months at Palantir, 4+ years at Anthropic).
The insurance claims assistant in this video is an illustrative example, not a real company or product.

## Chapters (long-form)
n/a (reel)

## Sources (for the description / pinned comment)
- [S1] Palantir · Forward Deployed Software Engineer job posting (London): https://jobs.lever.co/palantir/5168e8fd-fec1-4fea-b7a1-81bdaea65850
- [S2] Anthropic · Forward Deployed Engineer job posting (London, posted 2026-09-14): https://jobs.accel.com/companies/anthropic/jobs/93102649-forward-deployed-engineer
- [S3] OpenAI · Forward Deployed Engineer job postings: https://openai.com/careers/forward-deployed-engineer-tokyo/
- [S4] Fortune, 2026-09-03 · Lightcast job-postings data: https://fortune.com/2026/09/03/forward-deployed-engineers-fast-growing-six-figure-silicon-valley-job-integrate-ai-with-customers-tech-careers-palantir/

## Hashtags
#ForwardDeployedEngineer #FDE #AIcareers #SoftwareEngineering #GenAI #TechCareers #Shorts

## Pinned comment (invites replies)
Would you take a job that's a quarter to half travel if it meant shipping real AI inside companies? Yes / no and why 👇 (And what should I explain next?)

## Repurposing (long-form moments → reels)
- An explainer could expand each step on a real open-source example (a PDF-reading connector + an eval set) and add the interview format (take-homes, live Python) from the long-form winners.
- A Tips reel: "3 projects that look like FDE work" (connect messy data, test answers, explain to a non-coder).
