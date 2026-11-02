# Research · Ollama: run a small AI model on your own laptop

_Researched on 2026-10-28. Labels: company claim · independent · our test · community._
_Every source is Ollama's own (official docs in the `ollama/ollama` GitHub repo, the docs site's source). ollama.com itself is
outside the research sandbox, so model sizes come from the README's model table in its last version that carried one
(commit 379fd64fa8, 2026-02-12). No "our test": Ollama could not be installed or run from the research sandbox, so every terminal
shown is an illustrative replica of the documented commands._

## One-line definition (by what it does)
Ollama is a free, open-source (MIT) app that downloads an open AI model to your computer and lets you chat with it from your
terminal, with one command: `ollama run <model>`.

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Install on macOS / Linux: `curl -fsSL https://ollama.com/install.sh \| sh`; on Windows: `irm https://ollama.com/install.ps1 \| iex`, or download the app (Ollama.dmg / OllamaSetup.exe) | [README](https://github.com/ollama/ollama/blob/main/README.md) | 2026-10-13 (last README commit) | company claim (official docs) | the exact first step | reel |
| S2 | "Chat with a model": `ollama run gemma4`; "See ollama.com/library for the full list" | [README](https://github.com/ollama/ollama/blob/main/README.md) · [CLI reference](https://github.com/ollama/ollama/blob/main/docs/cli.mdx) | 2026-10-13 | official docs | the one command that downloads and starts a model | reel |
| S3 | Model table: **Llama 3.2 · 3B · 2.0GB · `ollama run llama3.2`**; Llama 3.2 · 1B · 1.3GB · `ollama run llama3.2:1b`; Gemma 3 · 1B · 815MB; Gemma 3 · 4B · 3.3GB; Phi 4 Mini · 3.8B · 2.5GB; Llama 3.1 · 8B · 4.7GB; Llama 3.3 · 70B · 43GB | [README @379fd64fa8](https://github.com/ollama/ollama/blob/379fd64fa8/README.md#model-library) | 2026-02-12 | official docs | "small" made concrete: a 3B model is a 2 GB download; big ones are 40 GB+ | reel (llama3.2 · 2.0GB) |
| S4 | "You should have at least 8 GB of RAM available to run the 7B models, 16 GB to run the 13B models, and 32 GB to run the 33B models." | [README @379fd64fa8](https://github.com/ollama/ollama/blob/379fd64fa8/README.md#model-library) | 2026-02-12 | official docs | sets the expectation: an 8 GB laptop handles small models | reel |
| S5 | "Ollama runs locally. We don't see your prompts or data when you run locally. When using cloud-hosted models, we process your prompts and responses to provide the service…" | [FAQ: Does Ollama send my prompts and answers back to ollama.com?](https://github.com/ollama/ollama/blob/main/docs/faq.mdx) | 2026-10 (main) | company claim (official docs) | the privacy reason to run local, and its condition (local models, not cloud ones) | reel |
| S6 | Ollama also offers cloud models ("Sign in to use cloud models, or choose a local model"); local-only mode: set `disable_ollama_cloud` / `OLLAMA_NO_CLOUD=1` | [Quickstart](https://github.com/ollama/ollama/blob/main/docs/quickstart.mdx) · [FAQ: disable cloud](https://github.com/ollama/ollama/blob/main/docs/faq.mdx) | 2026-10 (main) | official docs | the condition on "private": pick a local model | reel (catch candidate) |
| S7 | "Ollama pulls models from the Internet" (the download needs a connection) | [FAQ: proxy](https://github.com/ollama/ollama/blob/main/docs/faq.mdx) | 2026-10 (main) | official docs | the first run downloads; afterwards the model file is on your disk | reel |
| S8 | Models are stored at `~/.ollama/models` (macOS), `/usr/share/ollama/.ollama/models` (Linux), `C:\Users\%username%\.ollama\models` (Windows) | [FAQ: Where are models stored?](https://github.com/ollama/ollama/blob/main/docs/faq.mdx) | 2026-10 (main) | official docs | "it's a file on your laptop" made visible | reel (illustrative path) |
| S9 | Local API at `http://localhost:11434` (e.g. `/api/chat`) | [README](https://github.com/ollama/ollama/blob/main/README.md) · [Windows doc](https://github.com/ollama/ollama/blob/main/docs/windows.mdx) | 2026-10 | official docs | your own code can call it | explainer (cut from reel) |
| S10 | `ollama ps` shows loaded models and whether they run on CPU or GPU ("100% CPU means the model was loaded entirely in system memory") | [FAQ](https://github.com/ollama/ollama/blob/main/docs/faq.mdx) | 2026-10 (main) | official docs | works without a GPU (slower) | cut |
| S11 | macOS needs Sonoma (v14)+, Apple M series (CPU and GPU) or x86 (CPU only); Windows 10 22H2+; models "can be tens to hundreds of GB in size" | [macOS](https://github.com/ollama/ollama/blob/main/docs/macos.mdx) · [Windows](https://github.com/ollama/ollama/blob/main/docs/windows.mdx) | 2026-10 (main) | official docs | system requirements | cut (description) |
| S12 | Repo: MIT licence, 185,116 stars, latest release v0.40.12 (2026-10-27) | [GitHub API](https://github.com/ollama/ollama) | 2026-10-28 | independent (GitHub data) | "free, open source" is true; star count is trivia | reel ("free, open source") · cut (stars, version) |

## Running-example candidates
1. **`ollama run llama3.2` on an 8 GB laptop** (S3, S4): one command → a 2.0 GB download → a `>>>` prompt → a question answered
   in the terminal, then the same question with Wi-Fi off. Simple, true, reproducible. **Pick.**
2. `ollama run gemma4` (the README's current example): its size isn't in the docs we can reach, so it can't be shown honestly.
3. `ollama launch claude` (coding agents): a second idea; out for a "short and simple" reel.

## Analogy candidates
- "Download the brain once, then it lives on your disk" (a 2 GB file in `~/.ollama/models`).
- "Like a music file vs streaming": the model is a file you own, not a service you call.

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- **Cloud models exist in the same app** (S5, S6): only local models keep prompts on your machine; cloud ones go to Ollama's servers.
- **RAM** (S4): 8 GB for 7B models; small (1–3B) models are what most laptops handle.
- **Small models are weaker** than frontier chatbots (general knowledge; no Ollama source states a quality number).
- **The first run needs internet** (S7) to download the model.
- **Disk:** big models are tens of GB (S3, S11).

## Alternatives / competitors
LM Studio, llama.cpp, GPT4All, Jan (not researched further; a comparison is out of scope for this reel).

## Viewer questions to answer
- Is it free? (MIT, open source, S12; local use needs no account, S6 quickstart: "choose a local model")
- Will it run on my laptop? (8 GB RAM for 7B; a 3B model is 2 GB, S3, S4)
- Does it need internet? (only to download, S7)
- Is it private? (local models: "We don't see your prompts", S5)

## Cut by the viewer-value filter (and why)
- Star count, release number v0.40.12, founders, funding: trivia.
- `ollama launch` integrations (Claude Code, Codex, OpenClaw), Python/JS libraries, REST API: real but a second video.
- Flash attention, KV-cache quantisation, `OLLAMA_NUM_PARALLEL`: advanced tuning.
- Docker image, proxies, ngrok/Cloudflare tunnels: not a laptop beginner's need.
