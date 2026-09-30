# 1. Typed decision models (Jev / TypeSafe AI "System One")

> **Rank:** 1 of 11 · **Difficulty:** Beginner–Intermediate · **YouTube upside:** Very high (newsjacking + gap) · **Build time:** Weekend for the core build + 1–2 days for the eval segment

## 1. Overview
Jev is TypeSafe AI's first "System One Model," released in early access on Sept 15, 2026. It does not generate text. You send a `state` (text or JSON) plus named typed questions: **Noul** (yes/no probability), **Choice** (pick one of up to 255 options) and **Score** (ordered rubric). You get back calibrated probabilities from a single parallel pass (`POST https://api.typesafe.ai/v1/systemone`, model `jev-latest` = `jev-1.13.0`). TypeSafe claims 70–500 ms latency, $0.042/M input tokens with free output, and "193.6x faster, 444.6x cheaper" on its own workflow evals. Within two weeks it had LangChain, Vercel AI Gateway/AI SDK 7, OpenRouter, Cloudflare, DigitalOcean and Pydantic AI integrations, plus a front-page Hacker News launch thread. **Key caveats:** TypeSafe says its own evals may be biased and its pricing may be subsidized, and its 0% hallucination figure "is not empirical". Jev can't return an invalid type, but it can still return a wrong valid value.

## 2. Why it attracts subscribers
- **Audience:** Intermediate-to-advanced developers building agents, routers, classifiers and guardrails who want to know whether "smart if-statements" can replace LLM-JSON-parse-validate loops.
- **Competition gap:** Existing videos are mostly explainers (Gary Explains, CampusX, TestMu), "50 use cases" listicles (Yash Thakker), hype titles ("193x faster", "Destroys GPT-6") and quick first-look tests. A few small channels have built their own benchmarks (Forbidden Byte, Tenacity, Devsplainers). Almost none show a **production build + a labeled test set + a calibration/reliability plot + documented failure cases**. Nobody seems to combine the Every result, JevBench and the HN criticism in one video.
- **Winning angle:** Skeptical and code-first: "I replaced my LLM if-statements with Jev, then tried to make it fail." Treat every number as a claim under test and show the cases where Jev is wrong but confident.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | Replace Your LLM If-Statements With Jev (Full Build) | Full build | 20–25 min |
| 2 | Jev Isn't an LLM, So I Tested It Against GPT/Claude on 100 Real Decisions | X vs Y benchmark | 15–18 min |
| 3 | I Tried to Break Jev: Confident, Valid and Wrong | I tried to break it | 12–15 min |
| 4 | Gate Your Coding Agent's Bash Calls With Jev (LangChain AutoMode) | Full build (mini) | 10–12 min |
| 5 | Jev in 60 Seconds: Noul, Choice, Score | Explainer short | <60 s |

**Thumbnail / hook:** Split screen: a spinning "LLM… 8.8 s" timer next to "Jev 0.35 s", with a red-circled wrong answer marked "100% valid JSON. Still wrong." **Hook (first 15 s):** "This model answers in a third of a second for about a five-hundredth of the price, and it can't return invalid JSON. It can still be confidently wrong, though. I built a real app on it and graded 100 decisions by hand to find out how often."

## 4. Project build plan
**Project:** *"I replaced my LLM if-statements with Jev: a support-ticket triage and coding-agent guardrail."*
**Stack:** Next.js (or Node) + TypeScript, `@typesafe-ai/sdk` (or AI SDK 7 + `@ai-sdk/typesafe-ai` via AI Gateway), a fallback frontier LLM through AI Gateway/OpenRouter, `langchain-typesafe` (Python) for the guardrail segment, `system-one-adapter-python` for a like-for-like LLM baseline, and a small Python/JS script for the calibration plot.
**Steps:**
1. Get access. Direct signups were paused on Sept 22, so check the console first. Otherwise use Vercel AI Gateway (`typesafe-ai/jev`) or OpenRouter (`typesafe/jev-1.13`). Pin `jev-1.13.0` rather than `jev-latest`.
2. Scaffold from the Vercel "Jev x AI SDK Form Router" template (or `create-next-app`) and replace its form schema with a ticket schema.
3. Define 5 questions per ticket: `urgency` (Noul), `category` (Choice: billing/bug/account/feature/other), `sentiment` (Score, 1–5 rubric), `refund_risk` (Noul) and `escalate_to_human` (Noul). Send all of them in one call.
4. Add confidence-threshold routing: act automatically at ≥0.95, otherwise fall back to an LLM (the same pattern as the template's `lib/router.ts`). Log which path handled each ticket.
5. Build a small dashboard showing each ticket's typed answers, probabilities, the deciding model, and latency.
6. Guardrail segment: wrap a coding agent with LangChain `AutoModeMiddleware` (or a custom Noul "is this bash command destructive?") and feed it `rm -rf`, `curl | sh`, and benign commands.
7. Label a 100-ticket test set by hand, including ~15 deliberately ambiguous or adversarial tickets.
8. Run the same questions through a frontier LLM using `system-one-adapter-python` (same typed interface) so the comparison is fair.
9. Compute accuracy per question, p50/p95 latency, $ per 1,000 decisions, and a reliability diagram (predicted probability vs observed accuracy).
10. Close on the failure reel: confident-wrong cases, and what threshold tuning would have caught them.

**Demo moments:** Paste in an angry refund ticket and watch 5 answers come back in ~300 ms. Watch a low-confidence ticket fall back to the LLM live. Show the guardrail blocking `rm -rf ~`. Reveal the reliability plot. End with a "confident and wrong" montage.
**On-screen numbers:** p50/p95 latency (Jev vs LLM), $ per 1,000 decisions, accuracy per question on your 100 items, share of tickets auto-handled at ≥0.95, calibration error (ECE), and the number of confident-wrong answers. For context, show Every's 0.35 s vs 8.83 s and 6/7 vs 7/7 result, labeled as third-party.

## 5. Resources
### Official docs & specs
- [Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) — TypeSafe launch post, including the bias, subsidy and "not empirical" caveats (fetched)
- [TypeSafe docs](https://docs.typesafe.ai/) — docs home
- [Quickstart](https://docs.typesafe.ai/introduction/quickstart) — from API key to first decision
- [Primitives](https://docs.typesafe.ai/primitives) — Noul / Choice / Score
- [How to build with System One (concepts)](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) — how to split a workflow into narrow judgments
- [Patterns](https://docs.typesafe.ai/patterns) and [Cookbook: parallel questions](https://docs.typesafe.ai/cookbooks/parallel_questions)
- [HTTP API reference](https://docs.typesafe.ai/api) · [JavaScript SDK docs](https://docs.typesafe.ai/sdk/javascript) · [Agent Skill guide](https://docs.typesafe.ai/agent-skill)
- [TypeSafe workflow evals](https://evals.typesafe.ai/) — the in-house evals behind the headline numbers
- [@typesafe-ai/sdk on npm](https://www.npmjs.com/package/@typesafe-ai/sdk) — official TS SDK (v0.6.0 at time of search; Node 20+)
- [langchain-typesafe on PyPI](https://pypi.org/project/langchain-typesafe/) — alpha; `TypeSafeClassifier` Runnable
- [LangChain TypeSafe integration docs](https://docs.langchain.com/oss/python/integrations/providers/typesafe)
- [AI SDK Provider: TypeSafe](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai) — `@ai-sdk/typesafe-ai`, `experimental_evaluate`
- [Vercel AI Gateway: Jev](https://vercel.com/ai-gateway/models/jev) · [AI Gateway evaluation quickstart](https://vercel.com/docs/ai-gateway/getting-started/evaluation)
- [OpenRouter: Jev guide](https://openrouter.ai/docs/guides/community/jev) · [OpenRouter: TypeSafe SDK guide](https://openrouter.ai/docs/guides/community/typesafe-sdk) · [Jev 1.13 on OpenRouter](https://openrouter.ai/typesafe/jev-1.13)
- [Pydantic AI: TypeSafe (Jev)](https://pydantic.dev/docs/ai/models/typesafe/)

### Articles & blog posts
- [LangChain: Building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) — Sept 17; `ModelRouterMiddleware`, `AutoModeMiddleware` (fetched; page title reads "What Is Jev? A Guide…")
- [LangChain: Building Production Agents with Jev and LangGraph](https://www.langchain.com/blog/building-prod-with-jev-and-langgraph) — 5–6x faster than a Sonnet judge in a doc-discovery graph
- [Every: Mini-Vibe Check: Jev judged everything I've written in 0.7 seconds](https://every.to/vibe-check/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) — Dan Shipper's test
- [Every: How to Get the Most Out of Jev](https://every.to/context-window/how-to-get-the-most-out-of-jev)
- [Firecrawl: What Is Jev?](https://www.firecrawl.dev/blog/what-is-jev) — signups opened Sept 20 and paused Sept 22; lists access routes (fetched)
- [Hacker News: Introducing System One Models and Jev](https://news.ycombinator.com/item?id=49717558) — launch thread (point totals differ by snapshot)
- [HN: Jev: System One Models for Prod, Not God (with Diogo Almeida)](https://news.ycombinator.com/item?id=49794590)
- [OpenRouter: How to Use Jev: Moderation in TypeScript](https://openrouter.ai/blog/tutorials/how-to-use-jev/)
- [Vercel KB: Route form submissions with Jev and AI SDK](https://vercel.com/kb/guide/jev-ai-sdk-form-router)
- [Flavio Copes: A deep dive into Jev](https://flaviocopes.com/jev/) · [MarkTechPost launch coverage](https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/) · [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/typesafe-ais-jev-offers-an-alternative-to-llms-that-claims-to-be-193x-faster-and-445x-cheaper-system-one-type-model-is-bespoke-for-probabilistic-decision-making) · [Forbes](https://www.forbes.com/sites/josipamajic/2026/09/19/jev-cuts-ai-decision-costs-100x-and-vercel-cloudflare-rushed-to-add-it/)
- [Latent Space AINews: Jev](https://www.latent.space/p/ainews-jev-a-system-one-model-that)
- [Hindsight: We added Jev as a reranker, here's what we learned](https://hindsight.vectorize.io/blog/2026/09/24/adding-jev-reranker-what-we-learned) — mixed results; good material for the "where it fails" segment
- [HF blog: I benchmarked Jev against open CPU-only stacks. It won by 0.6 points](https://huggingface.co/blog/dylantom2012/i-benchmarked-jev-against-open-cpu-only-stacks-it)
- [arXiv: JEV-as-a-Judge: Accept When Confident, Escalate When Unsure](https://arxiv.org/html/2609.26550v1) (unverified — seen in search only)

### GitHub repos & templates
- [AbdelStark/awesome-typesafe-jev](https://github.com/AbdelStark/awesome-typesafe-jev) — the original awesome list ([24601 fork](https://github.com/24601/awesome-typesafe-jev) fetched; the fork links here as the original)
- [typesafe-ai/typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) · [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) · [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) · [typesafe-ai/skills](https://github.com/typesafe-ai/skills)
- [vercel-labs/jev-ai-sdk-form-router](https://github.com/vercel-labs/jev-ai-sdk-form-router) — Next.js 16 + AI SDK 7 template ([Vercel template page](https://vercel.com/templates/next.js/jev-and-ai-sdk))
- [fstandhartinger/jevbench](https://github.com/fstandhartinger/jevbench) — JevBench (fetched; see caveats)
- [anessbelbati/jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) · [jujumilk3/jev-calibration-audit](https://github.com/jujumilk3/jev-calibration-audit) · [Gaurav-Gosain/jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench)
- [jamalla/jev-langgraph-ticket-app](https://github.com/jamalla/jev-langgraph-ticket-app) — an existing ticket-triage example worth studying

### YouTube videos (study / beat these)
- [Jev From TypeSafe is a New Class of AI Model that is FAST and CHEAP - But There is a Caveat!](https://www.youtube.com/watch?v=qdji39XXgEY) — Gary Explains · clear explainer, light on code
- [I tried TypeSafe's System One Model: Jev](https://www.youtube.com/watch?v=CcmqPS6q9Gw) — Joe Maddalone · first-look hands-on
- [What Is Jev? TypeSafe's New System One AI Model Explained](https://www.youtube.com/watch?v=x_Bo9G-QQds) — TestMu AI (formerly LambdaTest) · explainer
- [Jev by TypeSafe AI | What is a System-1 Decision Model](https://www.youtube.com/watch?v=0zFfcEr1e9U) — CampusX · conceptual explainer, strong reach with Indian developers
- [Full Jev (TypeSafe AI) Intro + 50 Insane Use cases](https://www.youtube.com/watch?v=im_hLbl6ldU) — Yash Thakker · listicle, no evaluation
- [Livestream Coding with the new TypeSafe AI JEV Model | Parallel Constrained Decoding](https://www.youtube.com/watch?v=5Lx4DLLYafM) — Neural Breakdown with AVB · deep technical stream
- [Jev vs Claude. i built the benchmark so you don't have to](https://www.youtube.com/watch?v=UT4bZkaxDe4) — Forbidden Byte · 5 tasks vs Sonnet, the closest competitor to video #2
- [This AI Claims It's 200x Faster Than GPT — I Tested It Live](https://www.youtube.com/watch?v=S03Cc1EX4wI) — Tenacity · live test
- [How to Use Jev AI With Claude Code (5 Real Tests)](https://www.youtube.com/watch?v=jO8uzewZGwo) — Nuno Tavares | Automated Marketer · agent-tooling angle
- [What Is Jev, the New Model From TypeSafe AI?](https://www.youtube.com/watch?v=Ipom6c1fcP0) — Tech Brew Ride Home Podcast · news segment
- Also: [Jev Destroys Claude and GPT on Simple Tasks](https://www.youtube.com/watch?v=B-1nLUAixzI) (Devsplainers), [TypeSafe's Jev: the Model that Answers without Writing Anything](https://www.youtube.com/watch?v=BYbG4I2A8fc) (Squintist), [Jev AI Is INSANE… 193× Faster Than LLMs?!](https://www.youtube.com/watch?v=JZknBu3u8C0) (AI WITH Rithesh; hype format)
- **Notable channels:** Gary Explains, CampusX, Joe Maddalone, Neural Breakdown with AVB, Forbidden Byte. (Channel names were verified through YouTube oEmbed.)

### Tools & install
```bash
npm i @typesafe-ai/sdk                      # official TS SDK
npm i ai @ai-sdk/typesafe-ai                # AI SDK 7 provider (needs TYPESAFE_AI_API_KEY)
pip install typesafe_sdk langchain-typesafe  # Python SDK + LangChain integration (alpha)
git clone https://github.com/typesafe-ai/system-one-adapter-python  # LLM baseline with the same interface (follow its README)
```

### Not found — search for:
- Vercel's "fastest-adopted model in AI Gateway history" statement — search `Vercel AI Gateway Jev fastest adopted model`
- The community ranking study that "failed four of six on 306 human-graded shopping pairs" — search `Jev 306 human-graded shopping pairs`
- The context-pruning experiment that "dropped information needed later" — search `Jev context pruning experiment dropped information`
- Spanish-language Jev live-coding stream — search YouTube `Jev TypeSafe en vivo español`

## 6. Caveats & fact-checks before filming
- **All headline numbers are claims made by TypeSafe itself.** "193.6x faster / 444.6x cheaper" comes from 4 in-house workflow evals built by TypeSafe's own team ("some bias could exist"). Pricing is possibly subsidized ("We can't prove it isn't"). The 0% hallucination figure "is not empirical." Say this on camera.
- **Valid ≠ correct:** schema matching is guaranteed, but a wrong value that fits the schema is still a hallucination (the HN criticism). Build the video around this point.
- **JevBench has changed:** the source doc cites v1.2.2 (Jev 1.13.0 = 75.3, calibration 82.7). The live repo now shows **v1.4.2.2, with Jev 1.13.0 at 63.29 (#4)** behind Imajev-4B, Plumb-4B, and decider-4b. Cost there is per 1,000 *decisions*. The benchmark calls itself preliminary, so re-check it on filming day and don't present it as final.
- **Every's test is small:** 12 passages and 7 planted defects. Jev caught 6/7 and Fable 7/7. Secondary sources give conflicting total judgment counts (777 vs 1,709).
- **Hacker News points differ by snapshot** (sources say 1,516, 1,655, and ~1,978). Say "1,500+ points" or show a dated screenshot.
- **Access:** direct signups were paused Sept 22 (existing accounts still work). The Gateway/OpenRouter routes still worked at the time of research. Free Gateway access ended Sept 25, so budget for real costs.
- `langchain-typesafe` is alpha (0.0.1aN), and `AutoModeMiddleware` is experimental.
- **Pin versions:** `jev-1.13.0` (not `jev-latest`), `@typesafe-ai/sdk@0.6.0`, `ai@7.0.x` (`evaluate` needs ≥7.0.105), and the exact `langchain-typesafe` alpha. Show the filming date on screen.
