# 8. Personal autonomous agents (OpenClaw)

> **Rank:** 8 of 11 · **Difficulty:** Beginner–Intermediate · **YouTube upside:** High (consumer appeal) · **Build time:** ~1 day

## 1. Overview
OpenClaw is a self-hosted, model-agnostic, MIT-licensed personal agent that acts for you through messaging apps (Telegram, WhatsApp and others), with skills (SKILL.md) from the ClawHub registry. Peter Steinberger created it as "Clawdbot." It was renamed "Moltbot" on Jan 27, 2026 after trademark complaints from Anthropic, and then became "OpenClaw" three days later. Steinberger has since joined OpenAI. The project passed ~247K GitHub stars by early March 2026 (secondary sources say 250K in March). OpenClaw 2.0 (v2026.8.1, Aug 30, 2026) is its biggest release: 16,000+ merged PRs from 933 contributors, onboarding that auto-detects your existing subscriptions, keys and local models, multi-user sessions, explicit permission modes, and private credential prompts. NVIDIA's NemoClaw wraps OpenClaw inside the OpenShell sandbox and policy runtime for hardened use. The main caveat is that broad system access is risky. The ClawHavoc campaign pushed 1,184 malicious skills to ClawHub, so pair this video with Topic 6.

## 2. Why it attracts subscribers
- **Audience:** A broad audience that includes non-experts: productivity and self-hosting fans, Raspberry Pi and homelab people, and developers who want a "Jarvis." It has the biggest consumer appeal in the list.
- **Competition gap:** YouTube is saturated with "OpenClaw setup for beginners" videos (many VPS/Hostinger-sponsored) and "OpenClaw 2.0 just dropped" news videos. Security videos exist but are mostly talking heads. What's missing is an *after-setup* video: a real week of use with custom skills, a local or low-cost model, a real cost and latency breakdown, and a hardening segment that shows before and after using `openclaw security` and sandboxing.
- **Winning angle:** "My OpenClaw agent runs my week (on a $80 Pi)." Keep it lifestyle-friendly, but prove it with numbers: the monthly bill, tasks completed, and what broke. End with "I tried a malicious skill on my own agent" as the security cliffhanger that leads into Topic 6.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | My OpenClaw Agent Ran My Week on a Raspberry Pi (Real Costs) | Full build + vlog | 20–30 min |
| 2 | OpenClaw 2.0: Migrating My 1.x Agent (What Broke) | Migration guide | 12–18 min |
| 3 | Local vs Cloud Brain: Ollama vs Claude/GPT Inside OpenClaw | X vs Y benchmark | 15–20 min |
| 4 | I Installed a Malicious Skill on My Own Agent (So You Don't) | I tried to break it | 12–15 min |
| 5 | OpenClaw vs NemoClaw: Is NVIDIA's Sandbox Worth It? | X vs Y | 12–15 min |
| 6 | Build an OpenClaw skill in 60 seconds | Explainer short | <60 s |

**Thumbnail / hook:** A Raspberry Pi with a lobster sticker next to a phone showing a Telegram chat ("Your week: 3 meetings moved, $212 expenses logged"). Text: "IT RUNS MY LIFE." Hook (first 15 s): "For seven days, this $80 computer ran my calendar, logged every expense from a photo of the receipt, and messaged me a plan every morning. Here's the exact setup, what it cost, and the one config change that stops it from getting hacked."

## 4. Project build plan
**Project:** *"My OpenClaw agent runs my week."*
**Stack:** OpenClaw 2.0 (v2026.8.1+, Node 24.16+/26). A Raspberry Pi 5 (8GB, SSD) or a small VPS. Ollama with a tool-capable local model, plus a low-cost cloud model as a fallback. Telegram as the channel. Two custom skills (SKILL.md). Optional: NVIDIA NemoClaw/OpenShell for the sandbox comparison.
**Steps:**
1. Flash 64-bit Raspberry Pi OS Lite, then install OpenClaw (`npm install -g openclaw@latest` or the installer script) and run `openclaw onboard --install-daemon`. Show 2.0's auto-detection of models and keys.
2. Install Ollama and pull a tool-capable model. Configure the `ollama/` provider with the native URL (`http://host:11434`, *not* `/v1`) and `keep_alive`.
3. Connect Telegram with DM pairing and your user on the allowlist. Keep the Gateway on `bind: loopback`, with remote access only via Tailscale.
4. Write custom skill 1, `calendar-digest`, in `~/.openclaw/workspace/skills/calendar-digest/SKILL.md`. It reads an ICS/Google Calendar feed and sends a 7am digest with conflicts.
5. Write custom skill 2, `expense-logger`. You send a receipt photo or a text like "$14 lunch," and it appends a row to a CSV or Google Sheet, then gives a weekly total on request. Restrict `allowed-tools` to what it needs.
6. Run for a real week and log every task, failure, token count and cost. Keep a spreadsheet for the on-screen numbers.
7. Hardening segment: run `openclaw security` (audit), turn on sandboxing for all sessions, keep filesystem access scoped to the workspace, disable `web_fetch`/browser for the small local model, and use 2.0's private credential prompts.
8. Supply-chain demo: install a *harmless, self-written* "malicious-looking" skill (e.g. one that tries to read `~/.ssh`) and show the sandbox or policy blocking it. Explain ClawHavoc and the checklist for vetting ClawHub skills.
9. Optional: rerun the same agent under NemoClaw/OpenShell and compare setup time, policy controls and overhead.
10. Wrap-up: a monthly cost projection for Pi power + model tokens, and a verdict on what's worth automating.

**Demo moments:** The morning digest arriving on your phone. A receipt photo turning into a spreadsheet row. The local model fumbling a tool call while the cloud model succeeds. `openclaw security` flagging an exposed setting. The sandbox denying a skill's attempt to read `~/.ssh`.
**On-screen numbers:** Weekly and projected monthly cost (Pi electricity + API tokens), tasks attempted vs succeeded (%), median response latency local vs cloud (s), tokens per digest, Gateway start time (2.0 claims ~575 ms), and Pi RAM/CPU usage.

## 5. Resources
### Official docs & specs
- [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw): main repo (pnpm workspace); docs source lives under `docs/`
- [OpenClaw Docs](https://docs.openclaw.ai/), [Getting started](https://docs.openclaw.ai/start/getting-started), [Install](https://docs.openclaw.ai/install)
- [OpenClaw 2.0 / v2026.8.1 release notes (docs)](https://docs.openclaw.ai/releases/2026.8.1) and the [GitHub release v2026.8.1](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1)
- [OpenClaw on Raspberry Pi (official)](https://docs.openclaw.ai/install/raspberry-pi)
- [OpenClaw Ollama provider setup](https://docs.openclaw.ai/providers/ollama/setup) and [Local models](https://docs.openclaw.ai/gateway/local-models)
- [Ollama docs: OpenClaw integration](https://docs.ollama.com/integrations/openclaw)
- [Skills](https://docs.openclaw.ai/tools/skills) and [Creating skills](https://docs.openclaw.ai/tools/creating-skills)
- [ClawHub docs](https://docs.openclaw.ai/clawhub) and the [openclaw/clawhub registry repo](https://github.com/openclaw/clawhub)
- [Gateway security](https://docs.openclaw.ai/gateway/security) and the [Security CLI](https://docs.openclaw.ai/cli/security)
- [openclaw on npm](https://www.npmjs.com/package/openclaw)
- [NVIDIA NemoClaw product page](https://www.nvidia.com/en-us/ai/nemoclaw/), [NVIDIA/NemoClaw repo](https://github.com/NVIDIA/NemoClaw), [NemoClaw vs OpenShell CLI guide](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/cli-selection-guide), [NVIDIA newsroom announcement](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw)

### Articles & blog posts
- [The Rundown: OpenClaw 2.0 review (setup, multiplayer, cost, security)](https://www.therundown.ai/tools/openclaw-2-0)
- [CellCog: OpenClaw 2.0, what's new and what breaks](https://cellcog.ai/blog/openclaw-2-0/): useful for the migration video
- [The New Stack: NVIDIA's NemoClaw is OpenClaw with guardrails](https://thenewstack.io/nemoclaw-openclaw-with-guardrails/)
- [Penligent: what NemoClaw changes and what it still cannot fix](https://www.penligent.ai/hackinglabs/nvidia-openclaw-security-what-nemoclaw-changes-and-what-it-still-cannot-fix/)
- [Adafruit Learning System: OpenClaw on Raspberry Pi](https://learn.adafruit.com/openclaw-on-raspberry-pi/installing-openclaw)
- [ajfisher: running OpenClaw on a Raspberry Pi](https://ajfisher.me/2026/02/03/openclaw-raspberrypi-howto/)
- [DataCamp: Using OpenClaw with Ollama (local data analyst)](https://www.datacamp.com/tutorial/openclaw-ollama-tutorial)
- [Nebius: OpenClaw security architecture and hardening guide](https://nebius.com/blog/posts/openclaw-security)
- [DefectDojo: OpenClaw hardening checklist](https://defectdojo.com/blog/the-openclaw-hardening-checklist-in-depth-edition)
- [Antiy Labs: ClawHavoc (1,184 malicious skills)](https://www.antiy.net/p/clawhavoc-analysis-of-large-scale-poisoning-campaign-targeting-the-openclaw-skill-market-for-ai-agents/) and [Bitdefender: malicious skill trap](https://www.bitdefender.com/en-us/blog/labs/helpful-skills-or-hidden-payloads-bitdefender-labs-dives-deep-into-the-openclaw-malicious-skill-trap)
- [TechCrunch: OpenClaw's assistants building their own social network (Moltbook)](https://techcrunch.com/2026/01/30/openclaws-ai-assistants-are-now-building-their-own-social-network/)
- [Pragmatic Engineer: the creator of Clawd, "I ship code I don't read"](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)
- [Wikipedia: OpenClaw](https://en.wikipedia.org/wiki/OpenClaw): history and naming timeline (cross-check)

### GitHub repos & templates
- [vincentkoc/awesome-openclaw](https://github.com/vincentkoc/awesome-openclaw): curated list by OpenClaw's chief architect; marks official vs community entries
- [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills): 5,400+ categorized ClawHub skills. Treat these as untrusted.
- [openclaw skill-creator SKILL.md](https://github.com/openclaw/openclaw/blob/main/skills/skill-creator/SKILL.md): a reference skill format
- [openclaw/docs](https://github.com/openclaw/docs): mirror of the published docs site

### YouTube videos (study / beat these)
Channel names were not visible on the fetched pages. Confirm them before crediting anyone.
- [OpenClaw 2.0 with Chief Architect Vincent Koc](https://www.youtube.com/watch?v=SfUvqHz9m-8), channel not confirmed: insider interview, good for fact-checking 2.0 features
- [OpenClaw 2.0 just dropped (what changed?)](https://www.youtube.com/watch?v=nS3iywyEI6o), channel not confirmed: news recap (control UI, shared sessions, remote workers)
- [OpenClaw 2.0 Is Finally Here: But Is It Worth Using?](https://www.youtube.com/watch?v=Swk39qgSG5g), channel not confirmed: opinion review
- [OpenClaw Tutorial for Beginners: Full Setup, Use Cases, and Security](https://www.youtube.com/watch?v=UULGy-f6aE0), channel not confirmed: pre-2.0 (Mar 2026), email and calendar use
- [Full OpenClaw Setup Tutorial: Step-by-Step Walkthrough (UPDATED)](https://www.youtube.com/watch?v=wKIGlSWDC44), channel not confirmed: pre-2.0 setup
- [Hardening OpenClaw Deployments](https://www.youtube.com/watch?v=m1rDBEDtm6A), channel not confirmed: claims 35% of exposed deployments are vulnerable (verify)
- [What cybersecurity pros need to know about OpenClaw and Moltbook](https://www.youtube.com/watch?v=F0QCrxwwSg0), IBM podcast (per search snippet)
- [NVIDIA NemoClaw + OpenShell: OpenClaw Agent in a Secure Sandbox, Local vLLM Setup](https://www.youtube.com/watch?v=k1kl6xPb_HU), channel not confirmed
- [NemoClaw Tutorial: Run OpenClaw Safely with NVIDIA (Full Setup)](https://www.youtube.com/watch?v=M0ciMpB-EMY), channel not confirmed
- **Gap noted:** almost every setup tutorial predates 2.0 or is VPS-sponsored. No "one real week + real costs + hardening" video turned up.

### Tools & install
```bash
npm install -g openclaw@latest --allow-scripts=openclaw   # Node 24.16+ / 26 (omit flag on npm <=11.15)
openclaw onboard --install-daemon
openclaw gateway start && openclaw gateway install        # run as a service (Pi)
openclaw security                                         # security audit CLI (check subcommands in docs)
curl -fsSL https://ollama.com/install.sh | sh && ollama pull <tool-capable-model>
clawhub install <skill-slug>                              # only after reviewing the skill source
```

### Not found (search for these)
- A primary source for the exact "247,000 stars by March 2, 2026" figure. Search "OpenClaw 247k stars March 2" or check a star-history chart for `openclaw/openclaw`.
- An OpenShell standalone docs or repo page. Search "NVIDIA OpenShell github agent runtime".

## 6. Caveats & fact-checks before filming
- **Security first:** ClawHub publishing only required a GitHub account at least a week old. ClawHavoc (1,184 malicious skills) and Bitdefender's ~17% sample show that the registry is not vetted. Never install community skills without reading them, and use sandboxing plus a loopback-bound Gateway.
- **Star counts differ** (247K vs "250K") depending on the source and date. Show a dated screenshot instead of quoting a number.
- **The naming history is sensitive.** The Moltbot rename followed Anthropic trademark complaints, and fake $CLAWD tokens and handle-sniping scams circulated. Don't promote any token.
- **Local small models are weaker at tool calling.** OpenClaw's docs advise sandboxing and disabling web and browser tools for small models. Show the failures honestly.
- **"Free" isn't free:** the MIT software costs nothing, but tokens, always-on hardware and connected services cost money. Show the bill.
- **2.0 changed onboarding, permissions and the config layout**, so 1.x tutorials (including most on YouTube) may break. Check the release notes for breaking changes.
- **Pin versions:** OpenClaw `v2026.8.x` (the exact tag), Node version, Ollama version and model tag, NemoClaw/OpenShell release, Raspberry Pi OS build, plus the filming date on screen.
