# 6. Agent security, guardrails & prompt injection

> **Rank:** 6 of 11 · **Difficulty:** Intermediate–Advanced · **YouTube upside:** High, underserved · **Build time:** 2–4 days

## 1. Overview
The OWASP GenAI Security Project published the Top 10 for Agentic Applications (ASI01–ASI10) on Dec 9, 2025. ASI01, Agent Goal Hijack, is ranked first, and the framework sets out two principles: "Least-Agency" and "Strong Observability." The risk is already showing up in real systems. The ClawHavoc campaign placed 1,184 malicious skills on OpenClaw's ClawHub registry, and they stole SSH keys, wallets and browser passwords. Bitdefender reports that about 17% of the OpenClaw skills it reviewed in early February 2026 were malicious. That number is secondary and comes from a single sample, so attribute it on camera. Indirect prompt injection is the attack most tutorials skip: hidden text in emails or web pages, poisoned tool output, and memory poisoning. Most security videos still stop at chatbot jailbreaks. The gap is a before-and-after attack-success-rate demo on a real agent that has tools. Note that OWASP also released a 2026 LLM Top 10 and a new "Agent Control Standard" on Sept 1, 2026. Check how these relate to the Agentic Top 10 before filming.

## 2. Why it attracts subscribers
- **Audience:** Intermediate to senior developers shipping agents with tools (email, browser, shell, MCP), AppSec engineers moving into AI, and team leads who need a mental model of the risks. This audience is smaller than the "build an agent" crowd, but it is more loyal and more senior.
- **Competition gap:** Existing videos fall into three groups. The first is OWASP explainers and talks (John Sotiropoulos's deep dive, several "OWASP Agentic Top 10 Explained" videos). The second is Promptfoo scan walkthroughs on chatbots. The third is short "how hackers hijack agents" clips. Very few videos build a real tool-using agent, attack it with *indirect* injection, add layered defenses, and then *measure* attack success rate before and after.
- **Winning angle:** "I tried to hijack my own AI agent", a hands-on red-team-then-harden video with a scoreboard. Map every attack to an ASI ID on screen and tie it to Simon Willison's "lethal trifecta" (private data + untrusted content + exfiltration channel).

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Tried to Hijack My Own AI Agent (and Then Made It Unhackable-ish) | I tried to break it + full build | 25–35 min |
| 2 | OWASP Agentic Top 10 in 10 Real Attacks (Live Demos) | Explainer with demos | 18–25 min |
| 3 | Promptfoo vs AgentDojo vs Lakera: Which Actually Catches Prompt Injection? | X vs Y benchmark | 15–20 min |
| 4 | 1,184 Malicious Skills: How to Vet an Agent Skill Before You Install It | Explainer + checklist | 10–12 min |
| 5 | White Text Hijacked My Agent in 1 Email | Explainer short | <60 s |

**Thumbnail / hook:** A split screen. On the left, an inbox showing an innocent-looking email. On the right, a terminal showing `send_email(to=attacker@...)` in red. Big text: "1 EMAIL. FULL TAKEOVER." Hook (first 15 s): "This email looks empty. It isn't. There's white-on-white text in it, and when my AI agent read it, the agent forwarded my private files to a stranger. Today I'm attacking my own agent 50 times, then fixing it until the attack rate drops to near zero."

## 4. Project build plan
**Project:** *"I tried to hijack my own AI agent."*
**Stack:** TypeScript + Vercel AI SDK 7 (tool approval), or Python + LangChain (`AutoModeMiddleware` from `langchain-typesafe`, experimental). A mock inbox (JSON/IMAP sandbox) with tools `read_inbox`, `search_files`, `send_email`, `delete_file`. Promptfoo for red-teaming. AgentDojo-style task/injection pairs. Classifiers: Lakera Guard, Jev, or a small local model. Langfuse or OTel for traces (this sets up Topic 7).
**Steps:**
1. Build a baseline email assistant with four tools and a broad scope. Give it one normal user task ("summarize today's emails and file receipts").
2. Write a 50-case attack set in the AgentDojo style, pairing each user task with an injection. Include hidden white-text/HTML-comment instructions, a poisoned tool result (a fake "search_files" output), a memory-poisoning note that persists across sessions, and an exfiltration request via `send_email`. Tag each case with an OWASP ASI ID.
3. Run the baseline and record the attack success rate (ASR) and the utility rate (whether the benign task still completes).
4. Run `promptfoo redteam` against the agent endpoint with its agent plugins and the OWASP Agentic preset. Compare its findings to your hand-built set.
5. Defense 1, least privilege (Least-Agency): split the tools into read-only and write, scope `send_email` to an allowlist, and remove `delete_file` from the default profile.
6. Defense 2, an input/tool-output classifier: pass fetched content through Lakera Guard or a Jev/small-model "contains instructions?" classifier before it reaches the model.
7. Defense 3, human approval on destructive tools (AI SDK tool approval or HITL middleware). Defense 4, output validation: a schema check on outgoing emails and a block on external domains.
8. Re-run all 50 attacks after each defense layer and chart ASR vs utility for each layer (defenses often cost utility).
9. Show traces of one blocked attack end to end, so the "Strong Observability" principle is visible on screen.
10. Publish the attack set and harness as a repo, with a pinned-versions README.

**Demo moments:** The agent obediently emails "secrets.txt" to an attacker. A white-text reveal (select-all in the email). A memory-poisoned agent misbehaves in a *new* session. The classifier flags a poisoned tool result live. An approval prompt pops up at the exact moment the attack would have fired.
**On-screen numbers:** ASR per layer (e.g. baseline, then +least-privilege, +classifier, +approval). Benign-task utility per layer. Added latency per classifier call (ms). Cost per 1k guarded calls. False-positive rate on 50 benign emails.

## 5. Resources
### Official docs & specs
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/): the ASI01–ASI10 list (Dec 9, 2025)
- [OWASP Agentic Security Initiative](https://genai.owasp.org/initiatives/agentic-security-initiative/): home of the ASI working group
- [OWASP GenAI 2026 LLM Top 10 + Agent Control Standard announcement](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/): Sept 1, 2026 update, worth checking
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/): companion model-level list
- [Promptfoo: How to red team LLM Agents](https://www.promptfoo.dev/docs/red-team/agents/): agent plugins, OTel trajectory support
- [Promptfoo: OWASP Top 10 for Agentic Applications preset](https://www.promptfoo.dev/docs/red-team/owasp-agentic-ai/): maps scans to ASI IDs
- [Promptfoo red-team quickstart](https://www.promptfoo.dev/docs/red-team/quickstart/)
- [Lakera Guard: prompt injection docs](https://platform.lakera.ai/docs/prompt_injection) and [Lakera quickstart](https://docs.lakera.ai/docs/quickstart): note that Lakera docs now carry Check Point branding
- [LangChain TypeSafe integration (AutoModeMiddleware)](https://docs.langchain.com/oss/python/integrations/providers/typesafe): experimental tool-risk gating

### Articles & blog posts
- [NeuralTrust: A Deep Dive into the OWASP Top 10 for Agentic Applications 2026](https://neuraltrust.ai/blog/owasp-top-10-for-agentic-applications-2026)
- [Cycode: OWASP Top 10 for Agentic Applications 2026](https://cycode.com/blog/owasp-top-10-agentic-applications/): how it differs from the LLM and MCP Top 10s
- [Cycode: OWASP MCP Top 10](https://cycode.com/blog/owasp-mcp-top-10/): useful if you add an MCP attack segment
- [Aikido: OWASP Top 10 for Agentic Applications full guide](https://www.aikido.dev/blog/owasp-top-10-agentic-applications)
- [Giskard: OWASP Agentic Top 10 security guide](https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026)
- [Simon Willison: The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): the best framing device for the video
- [Promptfoo: Testing AI's "Lethal Trifecta"](https://www.promptfoo.dev/blog/lethal-trifecta-testing/)
- [Antiy Labs: ClawHavoc analysis (1,184 malicious skills)](https://www.antiy.net/p/clawhavoc-analysis-of-large-scale-poisoning-campaign-targeting-the-openclaw-skill-market-for-ai-agents/): primary source for the 1,184 figure
- [Cybersecurity News: ClawHavoc poisoned ClawHub](https://cybersecuritynews.com/clawhavoc-poisoned-openclaws-clawhub/)
- [Bitdefender Labs: OpenClaw malicious skill trap](https://www.bitdefender.com/en-us/blog/labs/helpful-skills-or-hidden-payloads-bitdefender-labs-dives-deep-into-the-openclaw-malicious-skill-trap): source of the ~17% figure
- [Unit 42: OpenClaw skill marketplace and AI supply chain risk](https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/)
- [AgentDojo paper (NeurIPS 2024 D&B)](https://github.com/ethz-spylab/agentdojo): paper linked from the repo; 97 tasks, 629 security test cases

### GitHub repos & templates
- [ethz-spylab/agentdojo](https://github.com/ethz-spylab/agentdojo): benchmark with banking, Slack, workspace and travel suites, plus pluggable defenses
- [ethz-spylab/agentdojo-core](https://github.com/ethz-spylab/agentdojo-core): core code
- [promptfoo/promptfoo red-team strategies](https://github.com/promptfoo/promptfoo/tree/main/site/docs/red-team/strategies)
- [Joe-B-Security/awesome-prompt-injection](https://github.com/Joe-B-Security/awesome-prompt-injection): curated list (includes Meta's "Agents Rule of Two")
- [nibzard/awesome-agentic-patterns: lethal trifecta threat model](https://github.com/nibzard/awesome-agentic-patterns/blob/main/patterns/lethal-trifecta-threat-model.md)
- [langchain-ai/langchain PR #40556: TypeSafe agent middleware](https://github.com/langchain-ai/langchain/pull/40556): source of AutoModeMiddleware

### YouTube videos (study / beat these)
Channel names were not visible on the fetched pages, except the one marked. Confirm them before crediting anyone.
- [Deep Dive into the OWASP Top 10 for Agentic AI Applications](https://www.youtube.com/watch?v=-vXoC0UvpjY), John Sotiropoulos (OWASP ASI team): authoritative talk, no hands-on attacks
- [OWASP Top 10 For Agentic Applications 2026](https://www.youtube.com/watch?v=bc_TGm1mUcU), channel not confirmed: course-style walkthrough
- [OWASP Agentic Top 10 Explained: The New Security Risks of AI Agents](https://www.youtube.com/watch?v=UftYcziWO3g), channel not confirmed: explainer, theory only
- [Prompt Injection Tutorial: AI Agent Under Attack](https://www.youtube.com/watch?v=qmFPYhkrZDI), channel not confirmed (unverified; page gave no details): closest competitor format
- [Test Your AI Agents Like a Hacker - Automated Prompt Injection Attacks](https://www.youtube.com/watch?v=tWwv3oxYCeY), channel not confirmed: automated attacks, no defense metrics
- [Malicious Claude Skills - Invisible Prompt Injection Threats in AI Agents](https://www.youtube.com/watch?v=ZiBQXnX3sjs), channel not confirmed: skill supply-chain angle
- [Red Team an AI App with Promptfoo](https://www.youtube.com/watch?v=e7MlDhfN22s), channel not confirmed (a Promptfoo engineer demos it): payment-assistant red team
- [Promptfoo Red Teaming: A beginner's guide](https://www.youtube.com/watch?v=y6Dlsz5P8s8), channel not confirmed: install-to-first-scan walkthrough
- Also seen: [Red Teaming MCP with Promptfoo](https://www.youtube.com/watch?v=wuwnJE3DwSs) and [I Tried 5 Prompt Injection Attacks](https://www.youtube.com/watch?v=satkgjltgo0)

### Tools & install
```bash
npx promptfoo@latest redteam setup          # interactive red-team config
npx promptfoo@latest redteam run
pip install agentdojo                        # AgentDojo benchmark (check PyPI name/version)
pip install langchain-typesafe               # AutoModeMiddleware (experimental, alpha)
npm i ai@7 zod                               # AI SDK 7 tool approval (Node 22+)
```

### Not found (search for these)
- A single canonical YouTube channel focused on *agent* security. Search YouTube for "agent goal hijack demo" and "indirect prompt injection agent defense" and check which channels recur.
- The AgentDojo arXiv abstract page. Search `AgentDojo Debenedetti arXiv 2406` (the paper is linked from the repo README).

## 6. Caveats & fact-checks before filming
- **Attribute the ~17% figure** to Bitdefender's early-February 2026 sample. It is not "17% of all skills." The 1,184 figure comes from Antiy Labs' ClawHavoc report. Secondary coverage also cites "36.8% of skills have a vulnerability" and "135k exposed instances." Verify those in the primary report before using them.
- **OWASP has several lists** (LLM Top 10 2026, Agentic Top 10, MCP Top 10, and the new Agent Control Standard from Sept 2026). Say which one you mean on screen.
- **No defense is complete.** Present ASR reductions as results on *your* test set, not guarantees. Show the utility cost and false positives as well.
- **AutoModeMiddleware is experimental**, and its API "may change without notice." It is also fail-closed by design, so show what happens when the classifier API is down.
- **Ethics:** Attack only your own sandboxed agent and mock data. Don't publish working exfiltration payloads aimed at real products.
- **Pin versions:** promptfoo (the `npx` version you used), agentdojo release tag, `langchain-typesafe` (alpha), `ai@7.0.x`, the Lakera API version, the model IDs and date of the run. Put all of them in the README and on screen.
