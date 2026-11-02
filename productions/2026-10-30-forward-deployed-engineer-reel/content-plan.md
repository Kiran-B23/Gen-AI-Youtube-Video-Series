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
