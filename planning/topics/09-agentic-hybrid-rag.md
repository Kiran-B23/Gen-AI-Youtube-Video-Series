# 9. Agentic & hybrid RAG

> **Rank:** 9 of 11 · **Difficulty:** Intermediate · **YouTube upside:** Medium (crowded, needs a new angle) · **Build time:** 2–3 days

## 1. Overview
RAG still shows up in job postings (13.6% of AI-engineer postings in a secondary compilation of Lightcast data), but "naive RAG is seen as a prototype at best." The 2026 baseline has four parts: hybrid search (dense vectors plus BM25, fused with Reciprocal Rank Fusion), a reranker, and adaptive routing, where simple queries skip retrieval and complex ones get an agentic loop. What makes it newsworthy now is a run of 2026 papers showing agents that search the corpus directly with grep or keywords competing with vector pipelines, and sometimes beating them (e.g. "Is Grep All You Need?", May 2026). The space is crowded, so the three-way "vs" benchmark is the angle that sets a video apart. The job-share figure is secondary data, and the grep results depend on the harness and the corpus. Present both carefully.

## 2. Why it attracts subscribers
- **Audience:** Intermediate AI engineers and backend devs who already built a "chat with your PDF" demo and now need it accurate in production. Job seekers too, since RAG is in the postings.
- **Competition gap:** YouTube is full of single-stack tutorials: hybrid search explainers (Dave Ebbelaar, Venelin Valkov, Harish Neel) and LangGraph CRAG/agentic RAG builds (Analytics Vidhya, Coding Crash Courses, DSwithBappy). Grep vs vector has been covered in explainer or paper-review form (The Hidden Layer). **Almost no one runs all three approaches on the same corpus with the same question set and puts accuracy, latency and $/query side by side.**
- **Winning angle:** "I benchmarked vector vs grep vs agentic RAG on my own docs." Numbers on screen, an honest winner per query type, and the eval harness released on GitHub.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | Vector Search vs Grep vs Agentic RAG: Which Actually Answers Questions About My Docs? | X vs Y benchmark | 18–25 min |
| 2 | Hybrid Search in Postgres in 100 Lines (pgvector + BM25 + RRF) | Full build | 12–15 min |
| 3 | Does a Reranker Actually Help? Cohere Rerank vs BGE vs None | X vs Y benchmark | 10–12 min |
| 4 | I Tried to Break My RAG: 30 Adversarial Questions | I tried to break it | 12–15 min |
| 5 | Reciprocal Rank Fusion Explained in 60 Seconds | Explainer short | <1 min |

**Thumbnail / hook:** Three lanes on a scoreboard ("VECTOR / GREP / AGENT") with accuracy percentages and a red "?" over the winner. Hook (first 15 s): *"Coding agents stopped using vector databases and started using grep. So I took 100 real questions about one documentation site and ran all three approaches. The winner is not the one you'd expect, and it depends on the question."*

## 4. Project build plan
**Project:** *"Vector search vs grep vs agentic RAG: which actually answers questions about my docs?"*
**Stack:** Python 3.12 · Postgres + pgvector (or Qdrant) · Postgres FTS / ParadeDB BM25 or Tantivy · RRF fusion · Cohere Rerank v3.5 or BAAI/bge-reranker-v2-m3 · LangGraph (agentic loop with grep/read_file/vector_search tools) · RAGAS + a hand-labeled answer key · one LLM held constant across all three pipelines.
**Steps:**
1. Pick one public docs corpus (e.g. a framework's docs repo as Markdown). Freeze a commit hash so the benchmark can be reproduced.
2. Write 100 questions with gold answers and source files. Tag each one as *exact-identifier*, *conceptual*, or *multi-hop*.
3. **Pipeline A (vector):** chunk, embed, store in pgvector (HNSW), retrieve top-k, answer.
4. **Pipeline B (hybrid):** add BM25 (Postgres FTS/ParadeDB or Tantivy), fuse with RRF (k=60), rerank the top 50 down to 8 with Cohere or BGE.
5. **Pipeline C (agentic grep):** LangGraph agent with `grep`, `list_files`, `read_file` tools over the raw files. No index. Cap it at N tool calls.
6. **Pipeline D (adaptive):** a cheap router classifies each query as no-retrieval, single-shot hybrid, or agentic loop (Adaptive-RAG style).
7. Score everything with RAGAS (faithfulness, context precision/recall) **plus** exact-match against your gold answers. Don't rely on LLM-judge scores alone.
8. Log latency (p50/p95), tokens, and $ per query for each pipeline. Log tool-call counts for C and D.
9. Break the results down by question type and show where grep wins (identifiers) and where embeddings win (paraphrased concepts).
10. Publish the repo with a `make bench` target and pinned versions.

**Demo moments:** The agent grepping its way to an answer live, with tool calls on screen. The vector pipeline confidently answering an identifier question wrong. The reranker reordering results before and after. The router sending "hi" straight to the LLM with no retrieval.
**On-screen numbers:** Accuracy % per pipeline and per question type · RAGAS faithfulness and context precision · p50/p95 latency · $ per 100 queries · average tool calls per agentic answer · index build time and storage size (vector vs none for grep).

## 5. Resources
### Official docs & specs
- [pgvector (GitHub)](https://github.com/pgvector/pgvector): official Postgres vector extension (HNSW/IVFFlat, cosine/L2/IP)
- [Qdrant: Hybrid Queries](https://qdrant.tech/documentation/search/hybrid-queries/): Query API prefetch + RRF/weighted RRF fusion
- [Qdrant: Hybrid Search with Reranking tutorial](https://qdrant.tech/documentation/tutorials-basics/reranking-hybrid-search/): dense + sparse + rerank walkthrough
- [Qdrant: Agentic RAG with LangGraph](https://qdrant.tech/documentation/tutorials-build-essentials/agentic-rag-langgraph/): multi-source routing tutorial
- [Tantivy (quickwit-oss/tantivy)](https://github.com/quickwit-oss/tantivy): Rust Lucene-style engine with BM25 scoring
- [OpenSearch: Hybrid search](https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/): BM25 + k-NN with a normalization pipeline
- [OpenSearch: Optimizing hybrid search](https://docs.opensearch.org/latest/search-plugins/search-relevance/optimize-hybrid-search/): tuning weights/normalization
- [Reciprocal Rank Fusion paper (Cormack, Clarke, Büttcher, SIGIR 2009), PDF](https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf): the original RRF paper
- [Cohere: Rerank overview](https://docs.cohere.com/docs/rerank-overview) · [Rerank API v2 reference](https://docs.cohere.com/reference/rerank) · [Rerank v3.5 changelog](https://docs.cohere.com/changelog/rerank-v3.5)
- [BAAI/bge-reranker-v2-m3 (Hugging Face)](https://huggingface.co/BAAI/bge-reranker-v2-m3): open multilingual cross-encoder reranker
- [LlamaIndex: Advanced Retrieval Strategies](https://developers.llamaindex.ai/python/framework/optimizing/advanced_retrieval/advanced_retrieval/): hybrid, reranking, and more
- [LangChain docs: Build a custom RAG agent with LangGraph](https://docs.langchain.com/oss/python/langgraph/agentic-rag): the official agentic RAG tutorial
- [Ragas: List of available metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/) · [Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/)

### Papers (grep / keyword agentic search vs vector RAG)
- [Is Grep All You Need? How Agent Harnesses Reshape Agentic Search (arXiv 2605.15184, May 14 2026)](https://arxiv.org/abs/2605.15184): grep generally beats vector, but the harness matters as much as the retriever
- [Beyond Semantic Similarity: Direct Corpus Interaction (arXiv 2605.05242, May 2026)](https://arxiv.org/abs/2605.05242): agents using grep and file reads beat sparse/dense/rerank baselines
- [Rethinking Agentic RAG: LLM-Driven Logical Retrieval Beyond Embeddings (arXiv 2605.27123), PDF](https://arxiv.org/pdf/2605.27123) (unverified, seen in search only)
- [Deep Agentic Search for Repository-Level Code QA (arXiv 2608.01507), PDF](https://arxiv.org/pdf/2608.01507) (unverified)
- [Adaptive-RAG: routing by question complexity (arXiv 2403.14403)](https://arxiv.org/abs/2403.14403): the canonical adaptive routing paper
- [Lightweight Query Routing for Adaptive RAG: RAGRouter-Bench (arXiv 2604.03455)](https://arxiv.org/abs/2604.03455): a TF-IDF+SVM router with 28% token savings (unverified)
- [SoK: Agentic RAG taxonomy (arXiv 2603.07379), PDF](https://arxiv.org/pdf/2603.07379) (unverified)

### Articles & blog posts
- [LlamaIndex: Is grep all you need? Lexical vs Semantic Search for Agents (May 26 2026)](https://www.llamaindex.ai/blog/is-grep-all-you-need-lexical-vs-sematic-search-for-agents): grep is fine for small corpora, and big corpora still need layered retrieval
- [LlamaIndex: RAG is dead, long live agentic retrieval](https://www.llamaindex.ai/blog/rag-is-dead-long-live-agentic-retrieval) (unverified)
- [Shaped: Why grep is beating your vector DB](https://www.shaped.ai/blog/why-grep-is-beating-your-vector-db) (unverified)
- [Sara Zan: Is grep really better than a vector DB? (Mar 2026)](https://www.zansara.dev/posts/2026-03-15-vector-dbs-vs-grep/) (unverified)
- [On the Lost Nuance of Grep vs. Semantic Search](https://www.nuss-and-bolts.com/p/on-the-lost-nuance-of-grep-vs-semantic) (unverified)
- [ParadeDB: Hybrid Search in PostgreSQL, the Missing Manual](https://www.paradedb.com/blog/hybrid-search-in-postgresql-the-missing-manual): BM25 in Postgres + RRF SQL (unverified)
- [pgEdge: Hybrid Search in PostgreSQL with BM25, Sparse Vectors and RRF](https://www.pgedge.com/blog/hybrid-search-in-postgresql-bm25-sparse-vectors-and-reciprocal-rank-fusion) (unverified)
- [DEV: Hybrid Search in 100 Lines: BM25 + pgvector with RRF](https://dev.to/gabrielanhaia/hybrid-search-in-100-lines-bm25-pgvector-with-rrf-merge-58cn) (unverified)
- [OpenSearch blog: Building effective hybrid search](https://opensearch.org/blog/building-effective-hybrid-search-in-opensearch-techniques-and-best-practices/) (unverified)
- [Langfuse cookbook: Evaluating RAG with Ragas](https://langfuse.com/guides/cookbook/evaluation_of_rag_with_ragas) (unverified)

### GitHub repos & templates
- [pgvector/pgvector](https://github.com/pgvector/pgvector)
- [quickwit-oss/tantivy](https://github.com/quickwit-oss/tantivy)
- [GiovanniPasq/agentic-rag-for-dummies](https://github.com/GiovanniPasq/agentic-rag-for-dummies): a modular LangGraph agentic RAG starter
- [qdrant/landing_page: hybrid-queries.md source](https://github.com/qdrant/landing_page/blob/master/qdrant-landing/content/documentation/search/hybrid-queries.md)

### YouTube videos (study / beat these)
- [Grep vs Vector Search: The Battle for the Future of Agentic Search](https://www.youtube.com/watch?v=-kfj3m9Yto8), The Hidden Layer: Decoding Artificial Intelligence · Explains the debate (May 2026). No benchmark of its own on real docs.
- [The Complete Guide to Hybrid Search in RAG (BM25 + Embeddings + Reranker)](https://www.youtube.com/watch?v=XvKiTfd6Xvo), Dave Ebbelaar · Strong hybrid explainer and build. No grep or agentic comparison.
- [Advanced Retrieval Pipeline for RAG (HyDE, Hybrid Search, Reranking), 100% Local](https://www.youtube.com/watch?v=_ZHM4wsUwPs), Venelin Valkov · Local hybrid + rerank pipeline.
- [RAG Tutorial 2026 #16: Hybrid Search combining Vector and Keyword Search](https://www.youtube.com/watch?v=7WEtNxVh1vo), Harish Neel | AI · Part of a beginner series.
- [Advanced RAG Techniques: 90%+ Accuracy with Hybrid Search & Re-ranking](https://www.youtube.com/watch?v=YF6l0kXtmV8), SH AI Academy · Accuracy claim; check how it's measured.
- [Corrective RAG (CRAG) Tutorial with LangGraph and LangChain](https://www.youtube.com/watch?v=cAdu8mO01Bo), Analytics Vidhya · Agentic self-correction (Jun 2026). No cost or latency data.
- [Self-Corrective RAG with LangGraph: Agentic RAG Tutorial](https://www.youtube.com/watch?v=uZoz3T3Z6-w), Coding Crash Courses · Older (2024) CRAG build.
- [Build Agentic RAG End-to-End with LangGraph + Pinecone + Tavily](https://www.youtube.com/watch?v=bASVM1LVSOI), DSwithBappy · Full-stack build, vector-only.
- [A-RAG: Scaling Agentic RAG via Hierarchical Interfaces](https://www.youtube.com/watch?v=zHsSgOSDbyI), PaperLens · Paper review format.

**Notable channels:** Dave Ebbelaar, Venelin Valkov, Analytics Vidhya, Coding Crash Courses, The Hidden Layer.

### Tools & install
```bash
pip install "psycopg[binary]" pgvector qdrant-client tantivy
pip install cohere FlagEmbedding sentence-transformers
pip install langgraph langchain llama-index ragas
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pg pgvector/pgvector:pg17   # verify tag before filming
```

### Not found (search for these):
- A YouTube video that benchmarks vector vs grep vs agentic RAG on one corpus with $/query. None found, and that's the gap. Search: `site:youtube.com "grep" "vector" RAG benchmark accuracy latency`.
- A LangChain/LangGraph "adaptive RAG" official tutorial page. Search: `langgraph adaptive rag tutorial docs.langchain.com`.

## 6. Caveats & fact-checks before filming
- The "13.6% of AI-engineer postings" figure comes from a secondary compilation of Lightcast data. Attribute it as such or leave it out.
- The grep-vs-vector papers use specific benchmarks (e.g. LongMemEval, 116 questions, in 2605.15184). The authors found that *how tool output is delivered* (inline vs file) matters as much as the retriever. Don't claim "grep beats vectors" in general.
- Grep favours small, plain-text, identifier-heavy corpora (code, API docs). LlamaIndex's own post argues large, heterogeneous corpora still need semantic indexes. Say this on camera.
- RAGAS scores come from an LLM judge. Pair them with exact-match against a human-labeled key, and report which judge model you used.
- Qdrant RRF parameters (weighted RRF ≥1.17, parameterized ≥1.16) are version-gated. Check your server version.
- Cohere Rerank v3.5 is listed as deprecated on at least one cloud (Oracle). Check the current Cohere model name and pricing.
- Hold the generator LLM, the chunking, and top-k constant across pipelines, or the comparison isn't fair.
- **Pin versions:** Postgres/pgvector, Qdrant server + client, tantivy-py, LangGraph, LlamaIndex, ragas, reranker model ID, embedding model ID, LLM model ID + date, and the corpus commit hash.
