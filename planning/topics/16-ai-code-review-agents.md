# 16. AI code review agents (Alibaba Open Code Review), benchmarked

> **Rank:** 16 of 18 (new addition, suggested priority #7) · **Difficulty:** Low–Medium · **YouTube upside:** High (every dev team is buying one; nobody shows real precision numbers) · **Build time:** 2–3 days (setup + seeded-bug repo + runs), plus ~1 day of labeling/scoring

## 1. Overview
Open Code Review (`ocr`) is Alibaba Group's internal AI code reviewer, open-sourced under **Apache-2.0**. It is a Go CLI distributed on npm as `@alibaba-group/open-code-review`. The GitHub repo was created **May 18, 2026**. It had 16,300+ stars by **Jul 30** (Galen Guan's deep dive), 23,041 by Sept 13 (Tom Rochette), and **42.5k stars / 3.0k forks on Sept 29** (GitHub API). It is **#5 on Trendshift's monthly list**, and InfoQ covered it on **Sept 20, 2026**. The design is a **"deterministic engineering × agent hybrid"**. Go pipelines handle file selection, file bundling (each bundle runs as an isolated sub-agent), template-based rule matching, and separate comment-positioning and reflection modules. An LLM agent with a small, purpose-built toolset does the dynamic review. The built-in rules cover NPE, thread safety, XSS and SQL injection. On Alibaba's own **AACR-Bench** (50 repos, 200 real PRs, 10 languages, 1,505 annotated issues), the README claims **higher precision and F1 than Claude Code with the same model on "~1/9 of the tokens"**, and it states outright that **recall is lower** ("a deliberate trade-off"). It works with OpenAI- and Anthropic-compatible models. It ships plugins for **Claude Code, Codex, Cursor, Kimi Code and OpenCode**, a **Delegation Mode** (your coding agent's own LLM runs the review, no OCR key needed), an MCP server, OpenTelemetry telemetry, a reusable **GitHub Action** (`action.yml`), and CI examples for **GitLab CI**, Bitbucket, Gerrit, GitFlic and Codeup. **Key caveats:** every headline number comes from Alibaba's own benchmark. Best-case recall is ~20%, so 80% of expert-found issues go unfound. The one independent run reported ~12% precision on 10 Martian-benchmark PRs (disputed by the maintainer, fixed, and not re-validated).

## 2. Why it attracts subscribers
- **Audience:** Working developers, tech leads and DevOps folks deciding whether to put an AI reviewer on every PR (and which one), plus agent builders interested in "deterministic scaffolding beats a free-roaming agent" (file 02).
- **Competition gap:** Existing OCR videos are tutorials and explainers (Fahd Mirza, Prism Labs, kite, Code Presenter, NBX Studio, Micro Learning) or hype titles repeating Alibaba's claims ("5x More Precise Than Claude Code"). Head-to-head content exists for *commercial* tools (Augment's "We benchmarked the TOP AI Code Reviewers", Greptile vs CodeRabbit vs Augment, Claude Code vs Codex vs Cursor). No video found runs OCR against Claude Code review and a plain-prompt baseline **on the creator's own repo with known ground truth**, scoring precision, recall and token cost.
- **Winning angle:** "I made AI review every PR, and measured if it's actually right." Plant 20 real bugs, let three reviewers loose, and publish a leaderboard with precision, recall, F1, $ per PR and false-alarm count. Treat Alibaba's numbers as claims under test (file 07's eval discipline).

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Made AI Review Every PR, and Measured If It's Actually Right | X vs Y benchmark + build | 18–22 min |
| 2 | Alibaba's Code Reviewer vs Claude Code: 20 Planted Bugs, One Leaderboard | X vs Y benchmark | 12–15 min |
| 3 | Set Up Free AI Code Review on GitHub Actions in 10 Minutes (Open Code Review) | Tutorial | 10 min |
| 4 | Why a "Dumber" Pipeline Beats a Smart Agent at Code Review | Explainer (harness design) | 8–10 min |
| 5 | AI Found 4 of My 20 Bugs. Here's Which Ones. | Short | <60 s |

**Thumbnail / hook:** A PR with 20 red bug markers, three robot avatars (OCR / Claude / "plain GPT"), and a scoreboard reading "Caught 7/20 · 2 false alarms · $0.04". **Hook (first 15 s):** "Alibaba says its open-source reviewer beats Claude Code on a ninth of the tokens. It also admits it misses most bugs. So I hid 20 bugs in a real codebase and let three AI reviewers find them. The results were not what the thumbnails promised."

## 4. Project build plan
**Project:** *"I made AI review every PR, and measured if it's actually right": a seeded-bug benchmark repo + GitHub Actions + a 3-way reviewer leaderboard.*
**Stack:** `@alibaba-group/open-code-review` (CLI + the repo's GitHub Action), Claude Code (`/code-review` locally, and optionally the managed Code Review service or `claude-code-action` in CI), a plain-LLM baseline (one prompt: "review this diff, output JSON findings"), the same underlying model for all three where possible, Git ≥ 2.41, a Python/TS scoring script, and optionally the Martian Code Review Bench offline set as a second, third-party dataset.
**Steps:**
1. Pick a real mid-size repo you own (TS or Python) and create a `bench` branch.
2. Seed **20 known bugs** across categories, e.g. off-by-one, null deref, SQL injection, XSS, race condition, missing auth check, wrong error handling, resource leak, logic inversion, and a cross-file API contract break. Spread them over ~8 PRs of different sizes. Record the ground truth (`file:line`, category, severity) in `truth.json`. Add 2–3 "clean" PRs to measure false alarms.
3. Install OCR (`npm i -g @alibaba-group/open-code-review`), then run `ocr config provider` / `ocr config model` and `ocr review --from main --to <pr-branch> --format json --output ocr.json`.
4. Wire up GitHub Actions: copy `examples/github_actions/ocr-review.yml` and set the secrets `OCR_LLM_URL` and `OCR_LLM_AUTH_TOKEN` and the variables `OCR_LLM_MODEL` and `OCR_LLM_USE_ANTHROPIC`. Show inline PR comments and the `/open-code-review` re-review comment trigger. Mention that GitLab CI has its own example folder.
5. Run the competitors on the same PRs: Claude Code `/code-review` (fixed effort level, recorded), optionally Claude Code Review via `@claude review` if you have Team/Enterprise, and the plain-prompt baseline. Use the same model for OCR and the baseline and log tokens for each run.
6. Score the results. A finding counts as a true positive if it matches a planted bug's file and ±3 lines *and* the category (judge by hand, or with an LLM judge plus a manual audit, following Martian's golden-comment + judge method). Compute precision, recall, F1, false alarms on clean PRs, tokens, $ per PR and wall-clock time.
7. Run 3 times per tool to show variance (the README itself calls general-agent review quality "unstable").
8. Add a custom ruleset: write an OCR rule (see `.opencodereview/rule.json` and the Review Rules docs) for one project-specific bug class. For Claude, write a `REVIEW.md`. Re-run and show the recall change on that class.
9. Try Delegation Mode (`ocr delegate …` or the Claude Code plugin's `/open-code-review:delegate-review`) to see whether OCR's scaffolding helps Claude's own model.
10. Build the leaderboard (table + bar chart) and a "missed bugs" reel. Point out which bug types *no* tool caught, most likely cross-file/architectural ones, as Daniel Vaughan predicts.

**Demo moments:** The GitHub Action posts line-precise inline comments on a PR in real time. Claude Code's review finds a bug OCR missed, and vice versa. A "confident false alarm" on a clean PR. The custom rule catches the bug it was written for. The leaderboard reveal, with the token-cost bar (OCR vs Claude Code) as the punchline.
**On-screen numbers:** Precision/recall/F1 per tool on your 20 bugs, false alarms on clean PRs, tokens and $ per PR, minutes per review, run-to-run variance, and recall gain from the custom rule. For context (labeled vendor/third-party): AACR-Bench SEM-F1 25.10% (OCR) vs 11.57% (Claude Code) with Claude 4.6 Opus, 385K vs 5,664K tokens (as cited by Vaughan). Also Claude Code Review's $15–25 average per review and Copilot's $0.05–$1 (Lite) / $0.25–$5 (Balanced) per review.

## 5. Resources
### Official docs & specs
- [Open Code Review website](https://open-codereview.ai) — docs hub (fetched)
- OCR docs linked from the README: [Quickstart](https://open-codereview.ai/docs/quickstart), [Review Rules](https://open-codereview.ai/docs/review-rules), [CI/CD Integration](https://open-codereview.ai/docs/cicd), [Delegation Mode](https://open-codereview.ai/docs/delegate), [MCP Server](https://open-codereview.ai/docs/mcp), [Configuration](https://open-codereview.ai/docs/configuration), [Telemetry](https://open-codereview.ai/docs/telemetry) (unverified — direct fetches returned 404, likely a client-side-routed site; open them in a browser)
- [OCR GitHub Action (`action.yml`)](https://github.com/alibaba/open-code-review/blob/main/action.yml) — inputs `llm_url`, `llm_auth_token`, `llm_model`, `llm_use_anthropic`, `llm_protocol`, `llm_reasoning_effort` (fetched)
- [OCR coding-agent plugins README](https://github.com/alibaba/open-code-review/blob/main/plugins/open-code-review/README.md) — Claude Code, Codex, Cursor, Kimi Code install steps (fetched)
- [npm: @alibaba-group/open-code-review](https://www.npmjs.com/package/@alibaba-group/open-code-review) (unverified — npm blocked the fetch; install command confirmed from the README)
- [AACR-Bench dataset (Hugging Face)](https://huggingface.co/datasets/Alibaba-Aone/aacr-bench) · [AACR-Bench paper (arXiv 2601.19494)](https://arxiv.org/abs/2601.19494) — Alibaba's benchmark behind the claims
- [Claude Code: Code Review](https://code.claude.com/docs/en/code-review) — managed multi-agent PR review; research preview for Team/Enterprise; avg $15–25 per review, ~20 min; `REVIEW.md`; local `/code-review` (fetched)
- [Claude Code GitHub Actions](https://docs.anthropic.com/en/docs/claude-code/github-actions) — run Claude in your own CI
- [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) · [Using Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) — automatic reviews, `.github/copilot-instructions.md`, per-review AI-credit cost (fetched)
- [CodeRabbit docs](https://docs.coderabbit.ai/) · [CodeRabbit pricing](https://www.coderabbit.ai/pricing)
- [Graphite AI Reviews docs](https://graphite.dev/docs/ai-reviews) · [Cursor Bugbot docs](https://cursor.com/docs/bugbot) · [Greptile docs](https://www.greptile.com/docs) · [Qodo](https://www.qodo.ai/)
- [OpenAI Codex GitHub integration](https://developers.openai.com/codex/integrations/github) (unverified content — JS-rendered page; returned 200)

### Articles & blog posts
- [InfoQ: Alibaba Open Sources OpenCodeReview for AI-Assisted Code Review](https://www.infoq.com/news/2026/09/alibaba-opencodereview/) — Renato Losio, Sept 20; covers the 20% recall and the ~12% independent-precision result (fetched)
- [Daniel Vaughan: OpenCodeReview and the Determinism Dividend](https://codex.danielvaughan.com/2026/08/11/opencodereview-deterministic-code-review-agent-codex-cli-rule-dispatch-grounded-review-independent-reflection/) — AACR numbers (SEM-F1 25.10% vs 11.57%, 385K vs 5,664K tokens), precision 25–38%, recall 12–20%, and how to copy the pattern in Codex CLI (fetched)
- [Tom Rochette: OpenCodeReview](https://tomrochette.com/agents/open-code-review/) — 23,041 stars on Sept 13; notes the claims rest on the vendor's own benchmark (fetched)
- [Galen Guan: Alibaba Open Code Review deep dive](https://guancyxx.cn/en/blog/alibaba-open-code-review-deep-dive) — Jul 30; 16,300+ stars; six agent tools; skews toward Java/web security; custom rules need Go (fetched)
- [Hacker News comment thread (linked by InfoQ)](https://news.ycombinator.com/item?id=48407230) — "My team tried coderabbit and qodo and they are both trash compared to…"; early reactions
- [Martian Code Review Bench](https://codereview.withmartian.com/) — third-party leaderboard of commercial reviewers (page is JS-rendered; methodology taken from the GitHub repo below)
- [OSSInsight: alibaba/open-code-review](https://ossinsight.io/analyze/alibaba/open-code-review) — 42,273 stars at fetch; no dated 16k milestone shown (fetched)
- [Trendshift monthly](https://trendshift.io/monthly) — OCR #5 monthly (fetched Sept 29; Trendshift's 20.7k star count lags GitHub)
- [OpenSSF Best Practices: project 13328](https://www.bestpractices.dev/projects/13328) — README badge says Gold (Guan's July post said Silver)

### GitHub repos & templates
- [alibaba/open-code-review](https://github.com/alibaba/open-code-review) — the tool (Apache-2.0; v1.12.10 released Sept 28) (fetched)
- [examples/github_actions](https://github.com/alibaba/open-code-review/tree/main/examples/github_actions) (`ocr-review.yml`) · [examples/gitlab_ci](https://github.com/alibaba/open-code-review/tree/main/examples/gitlab_ci) · [ROADMAP.md](https://github.com/alibaba/open-code-review/blob/main/ROADMAP.md)
- [alibaba/aacr-bench](https://github.com/alibaba/aacr-bench) — benchmark code
- [withmartian/code-review-benchmark](https://github.com/withmartian/code-review-benchmark) — MIT; offline set of 50 PRs from Sentry/Grafana/Cal.com/Discourse/Keycloak with 173 golden comments + LLM judge; evaluated tools include Augment, Claude Code, CodeRabbit, Cursor Bugbot, GitHub Copilot, GitLab Duo, Graphite, Greptile, Qodo and others (fetched). Reuse its judge for step 6.
- [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) · [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) — Claude in GitHub Actions
- [The-PR-Agent/pr-agent](https://github.com/The-PR-Agent/pr-agent) — open-source PR reviewer (the old `qodo-ai/pr-agent` URL redirects here; the repo says it "is not the Qodo free tier")

### YouTube videos (study / beat these)
- [Open Code Review Tutorial: Alibaba Open-Sourced Their Internal Code Reviewer](https://www.youtube.com/watch?v=HYLsulk3FdI) — Fahd Mirza · install/tutorial
- [Alibaba Open Code Review: 5x More Precise Than Claude Code](https://www.youtube.com/watch?v=yCJtCZM0C6A) — Business Builder · repeats the vendor claim in the title; the thing to beat with real data
- [Open Code Review: AI Reviews Without Token Burn](https://www.youtube.com/watch?v=Kcn0SrTt068) — Full Stack · token-cost angle
- [Alibaba Open Code Review — Two Years Of Battle-Tested AI Review, Open Sourced](https://www.youtube.com/watch?v=a7elTIiFBe8) — Prism Labs · overview
- [This AI Reviews Your Code in One Command (9x Fewer Tokens) — Open Code Review](https://www.youtube.com/watch?v=kj8Xl5b41k8) — kite · quick demo
- [Alibaba's Open-Code-Review: Why Deterministic Scaffolding Wins](https://www.youtube.com/watch?v=BkkiCjBXddM) — Autopilot Engineer · architecture angle (closest to video #4)
- [Open Code Review: Alibaba open-sourced the code reviewer it validated on a million real tasks](https://www.youtube.com/watch?v=DbO6_tIS6Ro) — Code Presenter · explainer
- [We benchmarked the TOP AI Code Reviewers](https://www.youtube.com/watch?v=TixGCWbrDU4) — Augment Code · vendor-run benchmark (no OCR in the title)
- [AI Code Review Battle: Claude Code vs Codex vs Cursor](https://www.youtube.com/watch?v=t4vlTwK5H_4) — Software Engineer Meets AI · head-to-head format to borrow
- [Best AI code review tool for real teams in 2026 (Greptile vs CodeRabbit vs Augment)](https://www.youtube.com/watch?v=JmS5hbwwe4E) — Samuel Gregory · commercial comparison
- Also: [Open Code Review: A hands-on with Alibaba's Free Code Reviewer](https://www.youtube.com/watch?v=R7h1zYq1fwI) (THE NBX STUDIO), [AI Checks AI: Alibaba Open Code Review Explained](https://www.youtube.com/watch?v=cREuC2gE2KU) (NewEraAi), [Is AI Actually Good at Code Review? Introducing the c-CRAB Benchmark](https://www.youtube.com/watch?v=1S1RHO1adbA) (Let'sStart2Finish), [Claude Sonnet 5 Review: Precision vs Recall Trade-Off](https://www.youtube.com/watch?v=7XE846SJ84E) (CodeRabbit), [AI Code Reviews That Actually Work (CodeRabbit Tutorial)](https://www.youtube.com/watch?v=gR1HmrfcaIo) (Beau Carnes)
- **Notable channels:** Fahd Mirza, Prism Labs, Augment Code, CodeRabbit, Software Engineer Meets AI. (Titles and channel names were verified through YouTube oEmbed; the videos weren't watched, so the notes come from titles.)

### Tools & install
```bash
npm install -g @alibaba-group/open-code-review   # gives the `ocr` command (needs Git >= 2.41)
ocr config provider && ocr config model          # interactive LLM setup
ocr review --from main --to feature-branch --format json --output ocr.json
ocr scan --path src/                             # full-file scan, no diff needed
ocr delegate preview                             # delegation mode (agent's own LLM)
# Claude Code plugin:
#   /plugin marketplace add alibaba/open-code-review
#   /plugin install open-code-review@open-code-review   → /open-code-review:review
codex plugin marketplace add alibaba/open-code-review   # Codex plugin
git clone https://github.com/withmartian/code-review-benchmark   # optional third-party dataset + judge
```

### Not found — search for:
- The source of the **independent ~12% precision on 10 Martian PRs** run: InfoQ and Rochette mention it without a link. Search GitHub issues `open-code-review martian precision`.
- Whether OCR has been added to the **Martian leaderboard**: the site is JS-rendered, so check [codereview.withmartian.com](https://codereview.withmartian.com/) in a browser.
- Content of the OCR docs pages (404 via fetch): open them in a browser, or read the repo's `pages/` source.
- An official Alibaba launch blog post / announcement: search `Alibaba Aone Open Code Review announcement`.
- Any video benchmarking OCR on the creator's own repo: none found. Re-check YouTube `open code review benchmark` before publishing.

## 6. Caveats & fact-checks before filming
- **All headline numbers are Alibaba's.** "Higher precision/F1 on ~1/9 the tokens" comes from AACR-Bench, Alibaba's own dataset. Vaughan's cited figures put the token cut at **15× (5–15× across models)**, not 9×, so say "roughly 9–15× fewer tokens, per the vendor".
- **Recall is low by design:** best configuration ~20%, range 12–20%, precision 25–38% (Vaughan). Don't say it "finds more bugs", because it finds *fewer* with less noise. The "5x More Precise" and "2.17x" figures are SEM-F1 ratios on the vendor benchmark (InfoQ attributes "2.17×" to Rochette, but his page doesn't state it; Vaughan does).
- **Independent evidence is thin:** one run reported ~12% precision on 10 Martian PRs, which the maintainer disputed as a tool-call anomaly. It was fixed, with no post-fix validation. Your video fills this gap, so say so.
- **Star counts and sources:** the "~16k by Jul 30" figure comes from **Galen Guan's blog**, not OSSInsight. OSSInsight shows only the current total (42,273). GitHub showed 42,471 on Sept 29, and Trendshift's 20.7k lags. Show a dated screenshot.
- **Language skew:** Guan notes the rules skew toward Java and web security, with thinner Python/Rust coverage, and that extending built-in rules may require Go. Pick your test repo's language with that in mind and disclose it.
- **Fair comparison:** use the same model for OCR and the baseline, fixed effort levels, 3 runs each, and a ground truth written *before* running anything. Claude Code's managed Code Review is Team/Enterprise research preview, costs ~$15–25/review, and isn't available with ZDR. If you use local `/code-review` instead, say so.
- **GitHub Action security:** the example uses `pull_request_target` and gates comment triggers on MEMBER/OWNER/COLLABORATOR. Don't loosen that on a public repo, because secrets are exposed to that trigger.
- **The action disables "thinking" by default** (`llm_extra_body` default `{"thinking": {"type": "disabled"}}`). Note that setting and keep it consistent across tools.
- **Alternatives named on screen:** only CodeRabbit, GitHub Copilot code review, Graphite, Cursor Bugbot, Greptile, Qodo/PR-Agent and Claude Code Review have docs linked above. Verify current pricing and plans before quoting.
- **Pin versions:** `@alibaba-group/open-code-review@1.12.10` (or the tag you film with; releases ship almost daily), the `alibaba/open-code-review` Action pinned to a tag or SHA, the Claude Code version (`/code-review` behavior changed at v2.1.218/v2.1.223), the exact model IDs for every tool, and the Martian benchmark commit if used. Show the filming date on screen.
