# 7. LLM/agent evals & observability (OTel GenAI)

> **Rank:** 7 of 11 · **Difficulty:** Intermediate · **YouTube upside:** Medium–High, underserved · **Build time:** 1–2 days

## 1. Overview
Teams trace far more than they test. LangChain's *State of Agent Engineering* survey (1,300+ respondents, later summarized by MarkTechPost) found that "89% of surveyed organizations use agent observability, while 52.4% run offline evals and 37.3% run online evals," and 29.5% run no evals at all. OpenTelemetry's GenAI semantic conventions (`gen_ai.*` spans, metrics and events, including agent spans) have become the vendor-neutral way to record prompts, tokens, tool calls and model metadata. Datadog, SigNoz, MLflow, Phoenix and Langfuse all ingest them. The leading tools are Langfuse (open source, acquired by ClickHouse in Jan 2026 and still self-hostable), LangSmith, Braintrust and Arize Phoenix, with DeepEval and RAGAS for metrics. The GenAI conventions have moved to their own repo and are still evolving, so pin the semconv version.

## 2. Why it attracts subscribers
- **Audience:** Developers who have shipped an agent or RAG app and now have regressions they can't see, plus tech leads setting up CI for AI features. They tend to be senior, have budget, and watch long videos.
- **Competition gap:** Existing videos fall into three groups. The first is vendor walkthroughs (Langfuse, Braintrust "Evals 101"). The second is theory talks (Hamel Husain and Shreya Shankar on error analysis). The third is OTel-for-LLMs explainers (OpenLLMetry). Few, if any, show the *whole loop* in one project, vendor-neutrally: OTel instrumentation, a golden dataset, deterministic checks plus an LLM judge, and a CI gate that blocks a PR.
- **Winning angle:** "Your agent has no tests: let's fix that." It's code-first and uses OTel so it isn't tied to one vendor. The payoff is a real PR getting blocked by a score regression on camera. Bonus: a cheap-judge vs frontier-judge agreement test (Jev vs LLM).

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | Your AI Agent Has No Tests. Let's Fix That (OTel + Evals + CI Gate) | Full build | 25–35 min |
| 2 | Langfuse vs LangSmith vs Braintrust vs Phoenix: Same Agent, Same Traces | X vs Y benchmark | 18–25 min |
| 3 | Is Your LLM Judge Lying? Judge vs Human Agreement on 50 Cases | I tried to break it | 12–15 min |
| 4 | OpenTelemetry `gen_ai.*` in 10 Minutes: Vendor-Neutral Agent Tracing | Explainer / migration guide | 10 min |
| 5 | 89% trace, 52% test: the agent eval gap | Explainer short | <60 s |

**Thumbnail / hook:** A GitHub PR page with a big red "Checks failed: faithfulness 0.91 → 0.74" and a sad agent mascot. Text: "MY AI FAILED CI." Hook (first 15 s): "I changed one line in my agent's prompt. It looked better. It was actually 17 points worse, and without this pipeline I'd never have known. In the next 30 minutes we'll add tracing, a test set and a CI gate to any agent, with no vendor lock-in."

## 4. Project build plan
**Project:** *"Your agent has no tests: let's fix that."*
**Stack:** The agent from Topic 5 (AI SDK 7 `WorkflowAgent`) or Topic 6 (email agent). OpenTelemetry SDK + GenAI semconv (`@ai-sdk/otel` for TS, or OpenLLMetry/OpenInference for Python). Langfuse self-hosted (Docker Compose) as the primary backend, with Phoenix as a second OTLP target to prove portability. DeepEval (pytest-style) and/or RAGAS metrics. GitHub Actions.
**Steps:**
1. Instrument the agent with OTel. Emit `gen_ai.operation.name`, `gen_ai.request.model`, token usage and tool-call spans, and export over OTLP to self-hosted Langfuse.
2. Point the same exporter at Arize Phoenix (or SigNoz). Same traces, different UI, which is the vendor-neutral proof.
3. Do error analysis first: read 30 real traces, cluster the failures (Hamel Husain's method), and write down 4–6 failure modes.
4. Build a 50-case golden dataset from those traces, with inputs, expected tool calls and reference answers. Store it versioned in Langfuse datasets or as JSONL in the repo.
5. Add deterministic checks: correct tool called, JSON schema valid, no forbidden domains, latency and cost budgets.
6. Add an LLM-as-judge for faithfulness and helpfulness (DeepEval G-Eval or RAGAS faithfulness). Hand-label 20 cases and report the judge's agreement with the human labels.
7. Bonus: swap in Jev (or a small model) as the judge and compare agreement, cost and latency against the frontier judge.
8. Wire a GitHub Actions job that runs the eval suite on every PR, posts a score table as a PR comment, and fails if any metric drops more than a threshold below `main`.
9. Make a "bad" prompt change live, open the PR, watch the gate fail, then fix it.
10. Close with online evals: sample 5–10% of production traces for automatic scoring, and feed failures back into the dataset.

**Demo moments:** A trace waterfall showing the agent looping twice on a tool. The same trace opened in Langfuse and in Phoenix side by side. The judge confidently giving a wrong answer 5/5. A red CI check on a PR. The dataset growing from a production failure.
**On-screen numbers:** Eval suite runtime and cost per CI run ($), judge-human agreement (%), per-metric scores before and after the change, p50/p95 agent latency, tokens and cost per task, trace overhead (ms), and Jev-judge vs LLM-judge cost ratio.

## 5. Resources
### Official docs & specs
- [OTel GenAI semantic conventions: spans (new dedicated repo)](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)
- [OTel GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md)
- [opentelemetry.io GenAI semconv page (now a "Moved" notice)](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/)
- [Pinned snapshot: semconv v1.41.0 gen-ai-spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.41.0/docs/gen-ai/gen-ai-spans.md)
- [Langfuse self-hosting docs](https://langfuse.com/self-hosting)
- [LangSmith evaluation concepts](https://docs.langchain.com/langsmith/evaluation-concepts): datasets, heuristic, LLM-judge and summary evaluators
- [Arize Phoenix product page](https://arize.com/phoenix/)
- [DeepEval 5-min quickstart](https://deepeval.com/docs/getting-started)
- [Ragas installation docs](https://docs.ragas.io/en/v0.3.4/getstarted/install/): versioned URL; check for a newer version
- [SigNoz: LLM Observability with OpenTelemetry docs](https://signoz.io/docs/llm-observability/)
- [MLflow: OpenTelemetry GenAI semconv support](https://mlflow.org/docs/latest/genai/tracing/opentelemetry/genai-semconv/)

### Articles & blog posts
- [Braintrust: Agent observability, the complete guide for 2026](https://www.braintrust.dev/articles/agent-observability-complete-guide-2026): June 21, 2026; trace-to-eval workflow
- [SigNoz: LLM Observability Tools, the Top Choices (2026)](https://signoz.io/comparisons/llm-observability-tools/)
- [MarkTechPost: Top LLM Observability and Evaluation Platforms in 2026](https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/): Aug 9, 2026
- [LangChain: State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering): primary source of the 89% / 52.4% / 37.3% stats
- [Dash0: OpenTelemetry GenAI semantic conventions explained](https://www.dash0.com/knowledge/opentelemetry-genai-semantic-conventions-explained)
- [OpenObserve: OTel GenAI semconv practical guide](https://openobserve.ai/blog/opentelemetry-genai-semantic-conventions/)
- [Datadog: native support for OTel GenAI semconv](https://www.datadoghq.com/blog/llm-otel-semantic-convention/)
- [Langfuse joins ClickHouse](https://langfuse.com/blog/joining-clickhouse) and [ClickHouse's announcement](https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability)
- [DEV: Your Agent Has Observability. It Doesn't Have Evals.](https://dev.to/jasonl888/your-agent-has-observability-it-doesnt-have-evals-3ce5)
- [Evaluating AI agents in production: from traces to test suites](https://slavadubrov.github.io/blog/2026/06/10/agent-evals-traces-to-test-suites/)

### GitHub repos & templates
- [langfuse/langfuse](https://github.com/langfuse/langfuse): OSS, Docker Compose self-host, OTel ingestion
- [Arize-ai/phoenix](https://github.com/arize-ai/phoenix): OTel-based tracing and evals; supports the AI SDK, Claude Agent SDK and LangGraph
- [confident-ai/deepeval](https://github.com/confident-ai/deepeval) and its [getting-started test example](https://github.com/confident-ai/deepeval/blob/main/examples/getting_started/test_example.py)
- [explodinggradients/ragas](https://github.com/explodinggradients/ragas/blob/main/docs/index.md): the repo now appears to redirect to `vibrantlabsai/ragas`, so check
- [open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)

### YouTube videos (study / beat these)
Channel names were not visible on the pages. Titles and URLs come from search results, except the Hamel Husain channel link.
- [Langfuse Walkthrough: Full Demo of Agent Tracing, Evals, Experiments and Prompt Management](https://www.youtube.com/watch?v=THfB4p2xCFY), channel not confirmed (likely official Langfuse): vendor tour, one tool only
- [LLM Evals Explained: Evalite vs Self-Hosted Langfuse](https://www.youtube.com/watch?v=iL-bEudSaBo), channel not confirmed: closest to a "vs" format (June 2026)
- [Master LLM Evaluation with LLM as a Judge using Langfuse](https://www.youtube.com/watch?v=QhrLzKbYaGM), channel not confirmed: judge setup, no judge-human agreement check
- [How to Build AI Evals in 2026 (Step-by-Step, No Hype)](https://www.youtube.com/watch?v=J7N9FMouSKg), Hamel Husain & Shreya Shankar (per search snippet): methodology, not CI
- [AI Evaluations Clearly Explained in 50 Minutes (Real Example)](https://www.youtube.com/watch?v=uiza7wp1KrE), featuring Hamel Husain
- [Intro to Evals with Braintrust](https://www.youtube.com/watch?v=9uEay1jQM3w) and [Evals 101 with Doug Guthrie, Braintrust](https://www.youtube.com/watch?v=bk0TmxoZlUY): vendor workflow
- [LLM Observability with OpenTelemetry: Ultimate Guide](https://www.youtube.com/watch?v=crEyMDJ4Bp0), channel not confirmed: OTel angle, predates the semconv repo move
- [Temporal AI Agent Monitoring and Observability with OpenTelemetry](https://www.youtube.com/watch?v=0EUxin5g0sk), channel not confirmed: OTel + SigNoz (Aug 2026)
- [Evaluate LLMs in Python with DeepEval](https://www.youtube.com/watch?v=HAoKJT3af7Y), channel not confirmed
- **Notable channel:** [Hamel Husain](https://www.youtube.com/@hamelhusain7140)

### Tools & install
```bash
git clone https://github.com/langfuse/langfuse.git && cd langfuse && docker compose up   # self-host Langfuse
pip install arize-phoenix deepeval ragas opentelemetry-sdk opentelemetry-exporter-otlp
npm i ai@7 @ai-sdk/otel @opentelemetry/sdk-node @opentelemetry/exporter-trace-otlp-http
deepeval test run test_agent.py          # pytest-style eval run for CI
```

### Not found (search for these)
- An official Langfuse or Braintrust GitHub Actions eval-gate template. Search "langfuse github action evaluation CI" and "braintrust eval github action".
- A dedicated LangSmith YouTube tutorial for 2026. Search YouTube for "LangSmith evaluation tutorial 2026".

## 6. Caveats & fact-checks before filming
- **The 89% / 52.4% / 37.3% stats come from LangChain's own survey.** MarkTechPost only summarizes it, and LangChain is a vendor (LangSmith). Cite both, and say so.
- **The GenAI semconv is still in development status** and has moved to the `semantic-conventions-genai` repo. Attribute names (e.g. `gen_ai.provider.name` replacing older `gen_ai.system`) have changed between versions, so show the version you target.
- **LLM judges are biased and noisy.** Always report judge-human agreement on a hand-labeled subset. Don't present judge scores as ground truth.
- **Langfuse is now owned by ClickHouse.** It says it stays OSS and self-hostable. Phoenix is under the Elastic License 2.0, which is not OSI open source.
- **Keep the comparison fair:** use the same agent, the same traces and the same dataset across tools, and disclose any sponsorship.
- **Pin versions:** the semconv version (e.g. v1.41.0 or the genai-repo tag), the Langfuse server/SDK version, `arize-phoenix`, `deepeval`, `ragas`, `ai@7.0.x` / `@ai-sdk/otel`, and the judge model ID and date.
