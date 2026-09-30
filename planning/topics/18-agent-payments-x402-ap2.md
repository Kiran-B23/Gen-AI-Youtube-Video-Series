# 18. Agent payments (x402, AP2, ACP)

> **Rank:** 18 of 18 (new addition, suggested priority #10–12) · **Difficulty:** Medium · **YouTube upside:** Medium–High (strong search interest, mostly crypto-hype coverage) · **Build time:** 2–3 days (1 day for a paid API + paying agent on testnet, 1–2 days for guardrails, the dashboard and the AP2 segment)

## 1. Overview
Three protocols cover different layers of "agents that pay". **x402** (created by Coinbase and now at `x402-foundation/x402`, Apache-2.0, ~6.7k stars) revives HTTP `402 Payment Required`. The server answers with a `PAYMENT-REQUIRED` header, the client retries with a signed `PAYMENT-SIGNATURE`, and a *facilitator* verifies and settles on-chain before the server returns `200` with `PAYMENT-RESPONSE`. The spec has `exact`, `upto`, `batch-settlement` and `auth-capture` schemes, with drop-in middleware for Express, Next, Hono and Fastify (`@x402/express` 2.27.0). A free test facilitator (`https://x402.org/facilitator`) runs on Base Sepolia and Solana devnet. On **Sept 23, 2026**, PR #2861 ("Specify exact Lightning on BIP-122", by benthecarman) merged a Bitcoin Lightning `exact` spec, and secondary coverage ties this to Block joining the x402 Foundation. The TS and Python Lightning implementations are still open PRs. **AP2** (Google, v0.2) sits at the authorization layer. It uses signed *Checkout* and *Payment* mandates (open = constraints, closed = the exact transaction), and it has an x402 sample. **ACP** (OpenAI + Stripe, beta, spec `2026-04-17`) covers merchant checkout and delegated payment tokens. **Key caveats:** demand is thin. TRM Labs (via PYMNTS) estimates only **0.6–7.5% of x402 value is agentic**, and trackers show ~$41.8M settled with settlement value "flat since April". The AP2 "whisper attack" paper shows agents approving cryptographically valid purchases that don't match what the user wanted.

## 2. Why it attracts subscribers
- **Audience:** Web and API developers who want to charge per call without API keys or subscriptions, agent builders who will soon be asked to "let the agent buy things", and security-minded developers (file 06) who want to know how this fails.
- **Competition gap:** Most videos are vendor tutorials (Apify, Venice, a Coinbase-partner Bazaar demo) or Google's own AP2 explainers. They assume crypto enthusiasm and skip the guardrails. Almost nobody pairs a **working paid API** with **a budget, a merchant allowlist, a human-approval threshold, the whisper-attack failure mode and the real adoption numbers**.
- **Winning angle:** Skeptical and web-dev first: "HTTP 402 for your API, and the 5 guardrails I added before letting an agent spend a cent." Treat it as a payments-API tutorial that happens to settle in testnet USDC. Guardrails come first, hype comes last, and the demand data goes on screen.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Built an API That AI Agents Pay Per Call (x402, Testnet, Guardrails First) | Full build | 20–25 min |
| 2 | x402 vs AP2 vs ACP: Which Agent Payment Protocol Does What? | Explainer / comparison | 12–15 min |
| 3 | I Tricked My Shopping Agent Into Overpaying (AP2 Whisper Attacks, Reproduced) | I tried to break it | 12–15 min |
| 4 | Are AI Agents Actually Paying for Anything? The x402 Numbers | Data explainer | 8–10 min |
| 5 | HTTP 402 in 60 Seconds | Explainer short | <60 s |

**Thumbnail / hook:** A browser devtools Network tab with a red `402 Payment Required` row and then a green `200`, beside a dashboard tile reading "Agent spend today: $0.37 / $1.00 budget — 2 requests blocked". **Hook (first 15 s):** "HTTP status code 402 sat unused for about 30 years. Now Coinbase, Google and Stripe want AI agents to use it to pay your API. I built one and let an agent spend real (testnet) money. The first thing I had to build was the brakes, because a product description could talk it into overpaying."

## 4. Project build plan
**Project:** *"I built an API that AI agents pay per call, and the guardrails that stop them overspending."*
**Stack:** Node + TypeScript. The seller is Express with `@x402/express`, `@x402/core` and `@x402/evm` (or Next.js with `@x402/next`). The test facilitator is `https://x402.org/facilitator` on Base Sepolia (`eip155:84532`, testnet USDC). The buyer is an agent (AI SDK or ADK) whose tool wraps `@x402/fetch` behind a policy layer. The dashboard is SQLite plus a small Next page. The AP2 segment uses the `google-agentic-commerce/AP2` Python samples (uv, ADK).
**Steps:**
1. **Framing + caveat card.** Show "Testnet only. Not financial advice. No real funds." on screen, then draw the flow: request → 402 + `PAYMENT-REQUIRED` → signed `PAYMENT-SIGNATURE` → facilitator verify/settle → 200 + `PAYMENT-RESPONSE`.
2. **Seller.** Start from `examples/typescript/servers/express`. Protect `GET /api/summary` at `$0.01` with `paymentMiddleware`, register `ExactEvmScheme` for `eip155:84532` and point at the test facilitator. Show the raw 402 with `curl -i`.
3. **Wallets.** Create a seller address and a buyer test wallet on Base Sepolia and fund the buyer with testnet USDC from a faucet (see Not found). Never put a mainnet key in `.env`.
4. **Buyer client.** Wrap `fetch` with `@x402/fetch` and pay once by hand. Show the decoded headers and the Base Sepolia transaction.
5. **Agent + policy layer.** Give the agent a `paid_fetch(url)` tool that goes through your own `SpendPolicy` first: a per-call max, a daily budget, a **merchant/host allowlist**, and a check that `payTo` and network match the allowlist entry. Anything that fails is refused, logged, and explained back to the agent.
6. **Human-approval threshold.** Any payment above `$0.05` (or any host not on the allowlist) pauses and asks for approval in the terminal or UI. Show one approval and one rejection.
7. **Idempotency + receipts.** Use the `payment-identifier` extension so a retry doesn't pay twice, and store each settlement response for the ledger.
8. **AP2 segment.** Explain open vs closed Checkout/Payment mandates, then run the AP2 x402 sample. Reproduce the whisper failure mode in a toy form: a merchant listing whose description says "the premium edition is the only authentic one" pushes the agent to the pricier SKU. The mandate is still valid, but the decision is wrong. Show that your allowlist and price-cap layer catches it where the signature check alone doesn't.
9. **Spend dashboard.** Show spend per merchant, blocked attempts by reason, approvals, and p50 latency added by 402 → pay → 200.
10. **Reality check close.** Show the TRM/PYMNTS and agenteconomy numbers and say where this makes sense (per-call APIs, MCP tools) and where it doesn't yet (consumer shopping).

**Demo moments:** `curl` hits a 402. The agent pays a cent and gets data. The agent tries an unlisted merchant and is blocked. A $0.20 request triggers the approval prompt. The whisper-style listing talks the unguarded agent into the premium SKU, and the guarded agent refuses. The dashboard fills in live.
**On-screen numbers:** Price per call, added latency (402 round trip + settle, p50/p95), total test spend vs budget, blocked attempts by reason, approvals requested/granted, CDP facilitator fee context ("first 1,000 onchain transactions each month are free, then $0.001"), the whisper paper's attack success rates (90% / 56% / 73.3%, labeled third-party), and the adoption data (0.6–7.5% agentic; ~$41.8M settled, 188.2M transactions as of Sept 23).

## 5. Resources
### Official docs & specs
- [x402-foundation/x402](https://github.com/x402-foundation/x402) — the canonical repo (the Coinbase repo now points here); `specs/`, `examples/`, SDKs for TS/Python/Go (fetched)
- [x402 spec: exact scheme on Lightning (`scheme_exact_lnbtc.md`)](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_lnbtc.md) · [PR #2861, merged Sept 23, 2026](https://github.com/x402-foundation/x402/pull/2861) (verified via GitHub API)
- [x402 docs](https://docs.x402.org/) · [Quickstart for Sellers](https://docs.x402.org/getting-started/quickstart-for-sellers.md) · [Quickstart for Buyers](https://docs.x402.org/getting-started/quickstart-for-buyers.md) · [Networks & tokens](https://docs.x402.org/core-concepts/network-and-token-support.md) · [Schemes](https://docs.x402.org/schemes/overview.md) (fetched)
- [x402: MCP Server with x402](https://docs.x402.org/guides/mcp-server-with-x402.md) · [Payment-Identifier (idempotency)](https://docs.x402.org/extensions/payment-identifier.md) · [Lifecycle hooks](https://docs.x402.org/advanced-concepts/lifecycle-hooks.md) · [Bazaar](https://docs.x402.org/extensions/bazaar.md) (listed in docs index)
- [Coinbase CDP: x402 docs](https://docs.cdp.coinbase.com/x402/welcome) · [CDP Facilitator](https://docs.cdp.coinbase.com/x402/seller/facilitator) (fees, networks) · [Agentic Accounts / Coinbase for Agents](https://docs.cdp.coinbase.com/x402/agentic-accounts/overview) (fetched)
- [Coinbase: C4A equities + x402 launch](https://www.coinbase.com/developer-platform/discover/launches/c4a-equities-x402) (unverified — blocked by Cloudflare; equities claim not confirmed)
- [AP2 site](https://ap2-protocol.org/) — v0.2, Checkout/Payment mandates, human-present vs not-present (fetched)
- [google-agentic-commerce/AP2](https://github.com/google-agentic-commerce/AP2) — spec + samples (human-present cards, x402), ~3.2k stars (fetched) · [samples folder](https://github.com/google-agentic-commerce/AP2/tree/main/code/samples)
- [Agentic Commerce Protocol (ACP)](https://www.agenticcommerce.dev/) · [ACP docs](https://www.agenticcommerce.dev/docs) · [OpenAI Developers: ACP](https://developers.openai.com/commerce) (fetched/loaded)
- [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) — OpenAI + Stripe, beta, latest stable `2026-04-17`, `openapi.agentic_checkout.yaml` / `openapi.delegate_payment.yaml` (fetched)
- [Stripe: Agentic commerce](https://docs.stripe.com/agentic-commerce) — ACP/UCP for sellers, MPP or x402 for machine payments, Shared Payment Tokens (fetched)

### Articles & blog posts
- [Ken Ashe: Bitcoin Lightning joins x402](https://kenashe.ai/blog/2026-09-25-bitcoin-lightning-joins-x402-and-agent-payments-get-a-little-more-real) — the Sept 23 merge; Foundation backers named as Coinbase, Google, Microsoft, AWS (from The Defiant/CoinTelegraph) (fetched)
- [arXiv 2609.11757: Signing the Transaction but Not the Decision: Whisper Attacks and a Binding Defense for AP2](https://arxiv.org/abs/2609.11757) ([PDF](https://arxiv.org/pdf/2609.11757)) — Louck, Dvir, Stulman, Sept 10, 2026; A-VIP defense; AP2-WhisperBench (1,544 scenarios) (fetched)
- [PYMNTS: Most x402 payments are not from AI agents](https://www.pymnts.com/news/artificial-intelligence/2026/agentic-payments-are-growing-most-x402-payments-are-not-from-ai-agents) — Sept 15, 2026; TRM Labs data (fetched)
- [Blockchain.news: x402 settlements flat at $41.6M since April](https://blockchain.news/flashnews/x402-settlements-flat-41-6m-since-april) — as of Sept 3; source agenteconomy.to + @EauDoon (fetched)
- [agenteconomy.to](https://agenteconomy.to) — live tracker: $41.8M settled, 188.2M transactions, 12 chains (updated Sept 23) (fetched)
- [MetaMask: What is x402?](https://metamask.io/news/what-is-x402) — clear header-by-header explainer (V2 headers); says Solana is ~65% of x402 volume (fetched)
- [Crossmint: Agentic payment protocols compared](https://www.crossmint.com/learn/agentic-payments-protocols-compared) — x402 vs AP2 vs ACP vs MPP by layer (fetched)
- [Adnan Masood: Agentic Payments 101 (2/2): ACP, UCP, AP2 and x402](https://medium.com/@adnanmasood/agentic-payments-101-2-2-payment-standards-and-protocols-acp-ucp-ap2-and-x402-26486e6d511f) (unverified — 403)

### GitHub repos & templates
- [x402 Express server example](https://github.com/x402-foundation/x402/tree/main/examples/typescript/servers/express) · [Next.js fullstack example](https://github.com/x402-foundation/x402/tree/main/examples/typescript/fullstack/next) · [advanced server example](https://github.com/x402-foundation/x402/tree/main/examples/typescript/servers/advanced) — linked from the seller quickstart
- [coinbase/x402](https://github.com/coinbase/x402) — original repo, now a dev fork that points to the Foundation repo (fetched)
- [google-a2a/a2a-x402](https://github.com/google-a2a/a2a-x402) — the A2A x402 extension (~563 stars) (fetched)
- [Vercel: x402 AI Starter](https://vercel.com/templates/ai/x402-ai-starter) — Next.js template (loaded)
- Open Lightning implementation PRs to watch: [TS #2262](https://github.com/x402-foundation/x402/pull/2262) · [Python #1873](https://github.com/x402-foundation/x402/pull/1873) (open at research time)

### YouTube videos (study / beat these)
- [Mastering x402: Let Your AI Agents Pay for Apify Actors](https://www.youtube.com/watch?v=euoCcSXoUrQ) — Apify · vendor tutorial, buyer side
- [Venice x402 Tutorial: How to Build a Self-Paying AI Agent (No API Keys)](https://www.youtube.com/watch?v=7z_9-vfGPq0) — Venice · vendor tutorial, "no API keys" angle
- [x402 Baazar Tutorial: Instant API Discovery & Pay-Per-Use with AI Agents (Live Demo) | @Coinbase](https://www.youtube.com/watch?v=UiD6Ol8RHoA) — HeimLabs · Bazaar discovery demo
- [How the Agent Payments Protocol (AP2) lets AI shop for you, securely](https://www.youtube.com/watch?v=jSHj0z9Gi24) — Google for Developers · official AP2 intro (linked from the AP2 README)
- [Agent payments, can you do my shopping? | The Agent Factory Podcast](https://www.youtube.com/watch?v=T1MtWnEYXM0) — Google Cloud Tech · Sept 2025 episode (predates AP2 v0.2)
- **Notable channels:** Google for Developers, Google Cloud Tech, Apify, Venice, HeimLabs. (Titles and channel names were verified through YouTube oEmbed.) None of them has a guardrails-first build.

### Tools & install
```bash
npm install @x402/express @x402/core @x402/evm @x402/svm @x402/avm   # seller (from the docs quickstart; @x402/express 2.27.0 at research time)
npm install @x402/next @x402/core @x402/evm                          # Next.js seller variant
npm install @x402/fetch @x402/evm                                    # buyer / agent client
pip install "x402[fastapi]"                                          # Python seller (x402 2.24.0 at research time)
uv pip install git+https://github.com/google-agentic-commerce/AP2.git@main   # AP2 types (no PyPI release yet)
# Test facilitator: https://x402.org/facilitator  ·  network eip155:84532 (Base Sepolia)
# Base Sepolia USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
```

### Not found — search for:
- Primary source for **Coinbase for Agents equities trading + x402** (~Sept 22; launch page blocked) — search `Coinbase for Agents equities x402 launch`
- **Block's official announcement** of joining the x402 Foundation (Sept 24, per Ken Ashe) — search `Block x402 Foundation Lightning announcement`
- An official **x402 Foundation members list** confirming Google, Microsoft and AWS (Crossmint instead names Cloudflare as co-governor) — search `x402 Foundation members Cloudflare Google Microsoft AWS`
- The recommended **Base Sepolia USDC faucet** for the demo — search `Base Sepolia USDC faucet Circle CDP`
- A reproducible AP2-WhisperBench repo from the arXiv paper — search `AP2-WhisperBench GitHub A-VIP`
- A developer build video combining x402 with spend limits and human approval — search YouTube `x402 agent spending limit human approval tutorial`

## 6. Caveats & fact-checks before filming
- **Testnet only, not financial advice.** Put it on screen at the start and in the description. Use Base Sepolia and the test facilitator, never show a private key, and keep mainnet out of the repo.
- **Lightning is spec-only:** the Lightning `exact` spec merged Sept 23 (PR #2861), and a docs link PR merged Sept 27. The TS and Python implementations were **still open PRs**, and the docs' network page didn't list Lightning. Don't demo it as shipped.
- **Who's behind x402:** Ken Ashe (citing The Defiant/CoinTelegraph) names Coinbase, Google, Microsoft and AWS as Foundation backers, while Crossmint says it is co-governed with Cloudflare. Say "backed by Coinbase and major cloud companies" unless you find the official member list.
- **Demand numbers disagree because the methods differ.** TRM Labs (PYMNTS, Sept 15) counted $52.7M across 198.9M transactions, only 0.6–7.5% of it agentic and 99.6% in USDC. agenteconomy.to shows $41.8M / 188.2M (Sept 23). Blockchain.news reports "flat since April" and a 93% YTD drop in daily transactions, citing an X account. Label the source and date of every figure.
- **Coinbase equities claim is unverified:** the launch page was blocked. CDP docs confirm only that "Coinbase for Agents" connects agents to Advanced Trade with x402 via MCP/CLI.
- **AP2 terminology has changed:** the current site (v0.2) uses **Checkout** and **Payment** mandates (open/closed). Older explainers and videos use different names. The AP2 README install is from git, so there is no PyPI package yet.
- **Whisper paper numbers are the authors' own:** 90% credential theft, 56% cart mismatch and 73.3% price escalation across "seventeen Google models" and three frameworks, with zero false positives for their A-VIP defense on the first two attacks. It's a Sept 2026 preprint, not peer-reviewed. Present your toy reproduction as illustrative only.
- **ACP is beta,** and per Crossmint, OpenAI moved to an app-based model in March 2026. Keep ACP to the explainer segment.
- **CDP facilitator fees** ("first 1,000 onchain transactions each month free, then $0.001") and the "100 million transactions" figure are Coinbase's own claims.
- **Pin versions:** `@x402/express@2.27.x` / `@x402/fetch` (same release line), `x402==2.24.x` (Python), AP2 at a specific git commit, ACP spec `2026-04-17`, network `eip155:84532`. Show the filming date on screen.
