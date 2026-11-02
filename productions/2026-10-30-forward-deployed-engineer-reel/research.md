# Research · Forward Deployed Engineer (FDE)

_Researched on 2026-10-30. Labels: company claim · independent · our test · community. No "our test": this is a job role, there is nothing for us to run._

## One-line definition (by what it does)
A forward deployed engineer is a software engineer who works inside a customer's company, often on site, to build and ship the code that makes an AI product actually work on that customer's real problem [S1][S2][S4].

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Palantir's FDSE posting: "embedding engineers directly with our customers to tackle their most pressing challenges"; builds "custom applications, LLM workflows, and production solutions"; owns projects "end-to-end from first customer contact to shipping"; asks for proficiency in one or more programming languages and **6+ months** of post-college experience; **25–50 % travel** | [Palantir · Forward Deployed Software Engineer, London (Lever)](https://jobs.lever.co/palantir/5168e8fd-fec1-4fea-b7a1-81bdaea65850) | read 2026-10-30 | company claim (official posting) | what the job is, in the employer's words; entry bar is reachable for early-career devs; the travel cost | reel |
| S2 | Anthropic's FDE posting (Applied AI): "embeds directly with our most strategic customers"; "work within customer systems to build production applications with Claude models"; delivers "MCP servers, sub-agents, and agent skills"; **travel 25–50 %** to customer sites; 4+ years in a technical customer-facing role; Python; London, **£225k–255k** | [Anthropic · Forward Deployed Engineer (via Accel job board)](https://jobs.accel.com/companies/anthropic/jobs/93102649-forward-deployed-engineer) | posted 2026-09-14 | company claim (official posting) | the AI-era version of the job: what they actually build (agents, connectors) | reel (what they build, travel); pay → cut |
| S3 | OpenAI FDE postings: partner with customers "to turn research breakthroughs into production systems"; own "discovery, technical scoping, system design, build, and production rollout"; success = production adoption + measurable workflow impact + eval-driven feedback | [OpenAI careers · FDE Tokyo / SF](https://openai.com/careers/forward-deployed-engineer-tokyo/) (page 403 to our fetcher; text from the search index) | read 2026-10-30 | company claim (official posting, read via index) | the steps of the job: discover → scope → build → roll out → feed back | reel (the loop), labelled as from postings |
| S4 | Fortune (Lightcast data): FDE postings rose **more than 1,000 %** Jan–Aug 2026 vs Jan–Aug 2025 (vs 13 % for tech jobs overall); median advertised FDE salary **> $188,000** vs ~$145,000 for software engineers (Lightcast via Dice's president); Palantir "has long used a forward-deployed model"; hiring: Palantir, Microsoft, Meta, Google, OpenAI, Anthropic | [Fortune · Preston Fore](https://fortune.com/2026/09/03/forward-deployed-engineers-fast-growing-six-figure-silicon-valley-job-integrate-ai-with-customers-tech-careers-palantir/) | 2026-09-03 | independent (reporting on Lightcast data) | demand is real and fresh; pay premium is a median, not the $1M hype | reel (the number) |
| S5 | Indeed (via PTI): FDE postings in India up **nearly 19-fold** y/y in June 2026 (1,807 %); ~16× in July, >6× in August; Indeed India MD: "companies want engineers who can sit with a customer, unpack a real problem and make the technology work in practice" | [People Matters / PTI](https://www.peoplematters.in/news/workforce-planning/demand-for-forward-deployed-engineers-jumps-19-fold-in-india-report-52770) | 2026-10-15 | independent (job-site data, reported) | NxtWave's core audience is in India: the role is not only Silicon Valley | reel (optional second number) |
| S6 | Pragmatic Engineer: the author's reading of FDE job ads ≈ **25 % coding, 50 % integration/plumbing, 25 % meetings**; "a contractor who codes at a customer's office"; drifts toward solutions architect / consultant; suits early-career engineers who like shipping end to end, poor fit for people who want greenfield or deep focus; Google calls the role an "embedded builder who bridges the gap between frontier AI products and production-grade reality" | [The Pulse: Forward deployed engineering heats up again](https://blog.pragmaticengineer.com/the-pulse-forward-deployed-engineering-heats-up-again/) | 2026-05-24 | independent (opinion/analysis) | the honest shape of the job; who it suits | reel (the split, labelled as one analyst's estimate) |
| S7 | OpenAI launched the OpenAI Deployment Company (2026-05-11), starting with ~150 FDEs and deployment specialists and $4B from 19 partners; acquired Tomoro; Anthropic announced a separate FDE venture; AWS launched its own FDE org (July 2026) | [Constellation Research](https://www.constellationr.com/insights/news/openai-launches-openai-deployment-company-acquires-tomoro) · [HR Executive, 2026-07-22](https://hrexecutive.com/aws-joins-openai-and-anthropic-in-race-to-embed-engineers-inside-enterprises/) | 2026-05 / 2026-07 | independent (reporting; primary announcement not fetched) | AI labs are building whole companies of FDEs | cut from reel (trivia-adjacent; one signal is enough) |
| S8 | Bloomberry (1,000 postings): +1,165 % (Jan–Oct 2025 vs 2024); Indeed via Business Insider: 643 (Apr 2025) → 5,330 (Apr 2026) US postings | [Scaler summary](https://www.scaler.com/topics/forward-deployed-engineer-jobs-grew-1165-percent/) | 2026 | independent but second-hand | corroborates S4's direction | cut (S4 is the cleaner single source) |
| S9 | Titles vary: Applied AI Engineer, Deployment Engineer, Forward Deployed Software Engineer, Solutions/Applied AI Architect | [Paraform](https://www.paraform.com/insights/forward-deployed-ai-engineer) | 2026-05 | community (recruiter blog) | helps the viewer search job boards | explainer; reel only if a beat needs it |

## Running-example candidates
1. **One customer problem, followed from "demo works" to "it works in their building"** (illustrative): an insurance company's claims team wants an AI assistant. The demo is perfect. Inside the company the answers live in scanned PDFs and an old claims system the model can't reach. The FDE sits with the claims team → finds the real blocker → builds the connector and a check → ships it → sends what broke back to the product team. Matches S1–S3's own verbs (embed, discover, build, roll out, feed back).
2. A hospital's appointment scheduler (a common example in posts; less close to the AI-agent work S2 lists).
3. A day-in-the-life timeline (the format of the Northslope/Salesforce Shorts; a schedule, not a mechanism).

## Analogy candidates
- **The product's engineer who sits with the customer's team** (plain, accurate to S1/S2's "embeds").
- A "translator between the model and the messy company" (partly accurate; risks implying no coding: S6 says ~25 % coding, 50 % integration). Not preferred.
- Military origin of "forward deployed" (a soldier at the front): off-tone, avoid.

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- **Travel 25–50 %** at both Palantir and Anthropic (official postings S1, S2): a lifestyle cost that changes the decision.
- **Most of the work is plumbing and meetings, not model work**: ~25/50/25 (S6, one analyst's estimate).
- Scope creep / "can't say no to the customer" (S6, opinion).
- At OpenAI/Anthropic's spun-out FDE ventures, equity may be in a different company (S6, opinion): too niche for a reel.
- The salary videos' "$1M" is an outlier; the median advertised is ~$188K (S4).

## Alternatives / competitors (neighbouring roles)
- Solutions engineer / sales engineer: demos and pre-sales, usually doesn't own production code (S6 places FDE between this and SWE).
- Consultant: advises, often doesn't ship (S6's "consultant drift" critique).
- Product software engineer: builds one product for many customers from the inside (S1 contrasts "embedding" with that).

## Viewer questions to answer
- What does an FDE actually do all day? → embed, find the real problem, build in their systems, ship, feed back (S1–S3).
- Is it just consulting? → they write and ship production code (S1–S3), though much is integration (S6).
- Why is it suddenly everywhere? → AI products don't plug into messy companies by themselves; postings >1,000 % (S4).
- Can a fresher/early-career dev get in? → Palantir asks 6+ months experience (S1); Anthropic asks 4+ years (S2): it varies.
- What should I practise? → Python, APIs/integration, talking to non-engineers (S2, S5's quote, S6).

## Cut by the viewer-value filter (and why)
- "$1 million a year" outliers: unverifiable and not representative; the median (S4) is the honest number.
- Exact pay bands per company: varies by city/level, dates fast; one median is enough.
- OpenAI Deployment Company funding, Tomoro, Northslope acquisitions (S7): business news, doesn't change what the viewer does.
- Palantir alumni founding companies: second-hand, not about the viewer.
- Palantir's internal "Delta / Echo" labels: insider trivia, sources disagree.
