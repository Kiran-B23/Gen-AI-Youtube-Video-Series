# 11. Small & local models (Gemma 4, Qwen 3.5)

> **Rank:** 11 of 11 · **Difficulty:** Beginner–Intermediate · **YouTube upside:** Medium–High · **Build time:** 1–2 days

## 1. Overview
Small language models now run well on laptops, phones, and Raspberry Pis, and concerns about privacy and cost are pushing inference onto local devices. Google released **Gemma 4** on April 2, 2026 under **Apache 2.0**, the first Gemma under a standard OSI license. It launched as E2B, E4B, 26B A4B (MoE), and 31B, and a 12B appeared later on Ollama and Hugging Face. The edge models (E2B/E4B) take image **and audio** input and have a 128K context. **Qwen 3.5** (Feb 2026) added a Small series (0.8B, 2B, 4B, 9B) and MoE models (35B-A3B, 122B-A10B, 397B-A17B), all natively multimodal. Ollama, llama.cpp, MLX, and LM Studio make running them a one-command job, and Unsloth makes LoRA fine-tuning possible on a single consumer GPU. Qwen has since shipped 3.6 and 3.8, so the "3.5" framing is already dated. Enterprise-adoption percentages in SLM blog posts are usually unsourced, so don't quote them.

## 2. Why it attracts subscribers
- **Audience:** Beginners and privacy-minded developers, Mac and gaming-PC owners, anyone tired of API bills, and people in regulated industries who can't send data to the cloud. Local-AI content has a broad audience with consumer appeal.
- **Competition gap:** YouTube is saturated with "run Gemma 4 / Qwen 3.5 locally with Ollama" setup videos and quick model tests (Fahd Mirza, Venelin Valkov, Labellerr AI, Kubesimplify, KGP Talkie). There are also several Unsloth fine-tuning walkthroughs. **Missing:** one end-to-end *useful* offline app (audio in, summary out) that is fine-tuned on your own data and scored against a cloud model on quality, cost, and privacy.
- **Winning angle:** "My laptop replaced a $20/month meeting-notes app." Record it fully offline (Wi-Fi visibly off), then run a blind side-by-side against a cloud model.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Built a Fully Offline Meeting Summarizer (Wi-Fi Off the Whole Time) | Full build | 18–22 min |
| 2 | Gemma 4 E4B vs Qwen 3.5 4B vs a Cloud Model on My Real Meetings | X vs Y benchmark | 12–15 min |
| 3 | I Fine-Tuned a Tiny Model on My Own Notes. Did It Beat the Big One? | Full build / benchmark | 15–18 min |
| 4 | Ollama vs llama.cpp vs MLX vs LM Studio: Same Model, Which Is Fastest on a Mac? | X vs Y benchmark | 10–12 min |
| 5 | Gemma 4 Can Hear Now: Audio Transcription in One Command | Explainer short | <1 min |

**Thumbnail / hook:** A laptop with a big red "Wi-Fi OFF" icon, a transcript scrolling past, and "$0.00" in huge text. Hook (first 15 s): *"I just turned off my Wi-Fi. In the next 15 minutes this laptop will transcribe, summarize, and pull action items from a one-hour meeting with no cloud and no API key. Then I'll fine-tune it on my own notes and see if it beats GPT."*

## 4. Project build plan
**Project:** *"A fully offline meeting summarizer on a laptop."*
**Stack:** Ollama (`gemma4:e4b`) · local transcription with whisper.cpp (or Gemma 4 E4B native audio for short clips) · Python/FastAPI or a simple CLI · Qwen 3.5 4B as a second local model · Unsloth (LoRA on Gemma 4 E2B/E4B) or mlx-lm LoRA on Apple Silicon · LM Studio as an optional GUI · a cloud model as the baseline.
**Steps:**
1. Install Ollama and pull `gemma4:e4b` and `qwen3.5:4b`. Record tokens/s and RAM use on your machine.
2. Build whisper.cpp with Metal/CUDA, download a model (e.g. `large-v3-turbo`), and transcribe a real one-hour meeting recording (with consent). Note the real-time factor.
3. For short clips, try Gemma 4 E4B native audio input as a one-model alternative and compare its transcript against whisper.cpp.
4. Chunk the transcript and prompt the local model for a summary, decisions, action items (owner + due date), and open questions as JSON (Ollama structured outputs).
5. Wrap it in a CLI or small web UI: drop in an audio file, get a Markdown note. Run it with Wi-Fi off on camera.
6. Build a small dataset of 50–200 of your own past meeting transcripts paired with your hand-written notes, in your preferred style.
7. Fine-tune Gemma 4 E2B/E4B with LoRA in Unsloth (Colab T4 or a local GPU) or mlx-lm LoRA on a Mac. Export to GGUF and import into Ollama with a Modelfile.
8. Evaluate base vs fine-tuned vs cloud on 20 held-out meetings: a blind human preference test, action-item recall against your key, and an LLM judge as a secondary check.
9. Report cost (cloud $ per meeting vs local electricity ≈ $0), latency end to end, and the privacy trade-off.
10. Publish the repo, Modelfile, and training notebook. Don't publish private meeting data.

**Demo moments:** Wi-Fi toggled off at the start. The transcript streaming live. Action items appearing as JSON cards. A before/after of the fine-tuned model matching your note style. A blind A/B where the audience guesses local vs cloud.
**On-screen numbers:** tokens/s per runtime (Ollama vs llama.cpp vs MLX) · RAM/VRAM used · whisper.cpp real-time factor and WER on a labeled clip · time from 1-hour audio to final note · action-item recall % (base / fine-tuned / cloud) · LoRA training time and VRAM (Unsloth lists ~8–10 GB for E2B and ~17 GB for E4B; verify) · $ per meeting, cloud vs local.

## 5. Resources
### Official docs & specs
- [Google blog: Gemma 4, byte for byte the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/): the launch post (Apr 2, 2026) (unverified, seen in search)
- [Google Open Source Blog: Gemma 4, expanding the Gemmaverse with Apache 2.0](https://opensource.googleblog.com/2026/03/gemma-4-expanding-the-gemmaverse-with-apache-20.html): the license post, dated Apr 2, 2026
- [Gemma 4 model card (Google AI for Developers)](https://ai.google.dev/gemma/docs/core/model_card_4) · [Gemma audio understanding docs](https://ai.google.dev/gemma/docs/capabilities/audio) · [DeepMind Gemma 4 page](https://deepmind.google/models/gemma/gemma-4/)
- [google/gemma-4-E4B-it (Hugging Face)](https://huggingface.co/google/gemma-4-E4B-it) · [google/gemma-4-E2B](https://huggingface.co/google/gemma-4-E2B) · [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)
- [Gemma 4 Technical Report (arXiv 2607.02770), PDF](https://arxiv.org/pdf/2607.02770) (unverified)
- [Qwen on X: Introducing the Qwen 3.5 Small Model Series (0.8B/2B/4B/9B)](https://x.com/Alibaba_Qwen/status/2028460046510965160) (unverified)
- [Unsloth: Qwen3.5, how to run locally](https://unsloth.ai/docs/models/qwen3.5)
- [Ollama library: gemma4](https://ollama.com/library/gemma4) · [gemma4:e4b](https://ollama.com/library/gemma4:e4b) · [qwen3.5](https://ollama.com/library/qwen3.5) · [qwen3.5:4b](https://ollama.com/library/qwen3.5:4b)
- [Ollama docs: OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility) · [ollama/docs on GitHub](https://github.com/ollama/ollama/tree/main/docs)
- [llama.cpp (ggml-org)](https://github.com/ggml-org/llama.cpp) · [build docs](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)
- [whisper.cpp (ggml-org)](https://github.com/ggml-org/whisper.cpp): C/C++ Whisper port (MIT), Metal/CUDA/Core ML
- [MLX](https://github.com/ml-explore/mlx) · [mlx-lm](https://github.com/ml-explore/mlx-lm) · [mlx-lm LORA.md](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/LORA.md): Apple Silicon inference and LoRA
- [Unsloth: Gemma 4 Fine-tuning Guide](https://unsloth.ai/docs/models/gemma-4/train): LoRA/QLoRA, VRAM table, notebooks
- [Unsloth Colab: Gemma4 (E4B) Audio notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Gemma4_(E4B)-Audio.ipynb) (unverified)
- [LM Studio docs](https://lmstudio.ai/docs/app) · [LM Studio REST API](https://lmstudio.ai/docs/developer/rest) · [lms CLI](https://lmstudio.ai/docs/cli)

### Articles & blog posts
- [Datature: Gemma 4, what computer vision engineers need to know](https://datature.io/blog/gemma-4-what-computer-vision-engineers-actually-need-to-know) (unverified)
- [DEV: Gemma 4's audio and video inputs, a hands-on guide](https://dev.to/pulkitgovrani/gemma-4s-audio-and-video-inputs-a-hands-on-guide-nobody-has-written-yet-2m2c) (unverified)
- [Trilogy AI: Qwen 3.5 brings native multimodality and long context to small models](https://trilogyai.substack.com/p/deep-dive-qwen-35-brings-native-multimodality) (unverified)
- [Better Stack: Qwen 3.5 small models, multimodal AI on your laptop, offline](https://betterstack.com/community/guides/ai/qwen-35/) (unverified)
- [KDnuggets: Run Qwen3.5 on an old laptop](https://www.kdnuggets.com/run-qwen3-5-on-an-old-laptop-a-lightweight-local-agentic-ai-setup-guide) (unverified)
- [DataCamp: How to run Qwen 3.5 locally on a single GPU](https://www.datacamp.com/tutorial/run-qwen-3-5-locally) (unverified)
- [Ideas2IT: Fine-tune Gemma 4 E2B with Unsloth on a free T4](https://www.ideas2it.com/blogs/fine-tune-gemma-4-e2b-unsloth) (unverified)
- [DEV (Zackriya): Local meeting notes with Whisper + Ollama summaries](https://dev.to/zackriya/local-meeting-notes-with-whisper-transcription-ollama-summaries-gemma3n-llama-mistral--2i3n) (unverified)

### GitHub repos & templates
- [paberr/ownscribe](https://github.com/paberr/ownscribe): local-first meeting transcription + summarization CLI (WhisperX, Ollama)
- [Kaewkloaw/Meeting-Summarizer-Local](https://github.com/Kaewkloaw/Meeting-Summarizer-Local): MLX Whisper + Ollama + Qwen3 4B
- [peteonrails/hushnote](https://github.com/peteonrails/hushnote): offline Linux transcription and summaries (unverified)
- [ARahim3/mlx-tune](https://github.com/ARahim3/mlx-tune): Unsloth-compatible fine-tuning API on MLX
- [sciences44/mlx-lora-finetune](https://github.com/sciences44/mlx-lora-finetune): Qwen3.5 LoRA on a Mac with an honest limitations section
- [ml-explore/mlx-examples](https://github.com/ml-explore/mlx-examples)

### YouTube videos (study / beat these)
- [How to Run Gemma 4 Locally Using Ollama: Full Setup & Test](https://www.youtube.com/watch?v=tQ9eIMVpMUs), Labellerr AI · Setup plus quick tests (Apr 2026).
- [Gemma 4 Deep Dive: Local LLM with Ollama, vLLM & llama.cpp](https://www.youtube.com/watch?v=XD68MiaxdgU), Kubesimplify · Covers several runtimes. No app build.
- [No GPU Needed! Run Gemma 4 Locally with Ollama](https://www.youtube.com/watch?v=8gMlO71lOsA), Real World Devs · CPU-only angle.
- [Gemma4 12B in Quantization-Aware Training (QAT) with Ollama: Full Testing](https://www.youtube.com/watch?v=JmfzWIhsTso), Fahd Mirza · QAT 12B tests.
- [Qwen 3.5 Local Test with Ollama | Coding, OCR, Data Extraction, Image Understanding](https://www.youtube.com/watch?v=6y66Wa7bYRA), Venelin Valkov · Capability tests.
- [Qwen3.5 9B: China's Master Stroke, Runs Locally for Video, Image, Coding and Text](https://www.youtube.com/watch?v=3bupWUq9Ems), Fahd Mirza · Hype-style first look.
- [Qwen3.6-35B-A3B vs Gemma4-26B: Quantized Local Showdown on Ollama](https://www.youtube.com/watch?v=Pv-z712J0EQ), Fahd Mirza · A head-to-head, but on larger models.
- [Qwen 3.8 on Ollama vs Muse Glimmer vs Gemma 4: Local LLM Coding Test](https://www.youtube.com/watch?v=G325IWB9MRk), KGP Talkie · Shows Qwen has moved on to 3.8 (Aug 2026).
- [Finetuning the Gemma 4 LLM via Unsloth](https://www.youtube.com/watch?v=u13wXQvD2OY), Hussain Arif · Colab LoRA walkthrough.
- [Fine-Tune Gemma 4 in Minutes (No Code!): Unsloth Studio Tutorial](https://www.youtube.com/watch?v=d9LGtygWEKQ), Prompt Engineer 48 · No-code Unsloth Studio.
- [How to Fine-tune Gemma-4-31B in 10 Minutes with Unsloth](https://www.youtube.com/watch?v=uxteqls8HC8), Breaking Divide · The large model, not the edge models.

**Notable channels:** Fahd Mirza (very high volume of local model tests), Venelin Valkov, Kubesimplify, KGP Talkie, Unsloth-focused creators.

### Tools & install
```bash
curl -fsSL https://ollama.com/install.sh | sh        # or the macOS app
ollama pull gemma4:e4b && ollama pull qwen3.5:4b
git clone https://github.com/ggml-org/whisper.cpp && cd whisper.cpp && cmake -B build && cmake --build build -j
pip install mlx-lm             # Apple Silicon
pip install unsloth            # NVIDIA / Colab LoRA
pip install ollama openai      # Python clients (OpenAI-compatible at http://localhost:11434/v1)
```

### Not found (search for these):
- The official Qwen 3.5 blog post or Hugging Face model card (only the X announcement, Unsloth docs, and Ollama pages were found). Search: `qwen.ai blog qwen3.5` and `huggingface.co/Qwen/Qwen3.5-4B`.
- The Ollama official quickstart page on docs.ollama.com (only the OpenAI-compat page was seen). Search: `docs.ollama.com quickstart`.
- A YouTube video of a fully offline meeting summarizer built on Gemma 4. None found, and that's the gap. Search: `site:youtube.com gemma 4 whisper.cpp meeting summarizer offline`.

## 6. Caveats & fact-checks before filming
- **Version drift:** Qwen has shipped 3.6 (e.g. 35B-A3B) and 3.8 since 3.5. Decide whether to title the video "Qwen 3.5" or use the current small model, and justify the choice on camera.
- Gemma 4 **launched** as four sizes (E2B, E4B, 26B A4B, 31B), and the 12B came later. Check which sizes support audio (the model card and Ollama differ on the 12B). Ollama lists 128K context for the edge models and 256K for the larger ones.
- Gemma 4's native audio is best for short clips. For a one-hour meeting, use whisper.cpp or chunk the audio, and say so.
- Gemma 4 under Apache 2.0 is a genuine change from earlier Gemma terms. Qwen 3.5 license terms vary by model size, so check each model card before claiming "Apache 2.0" for all.
- Benchmarks such as "Qwen3.5 9B matches GPT-OSS-120B" or "E2B 7.6 tok/s on a Raspberry Pi 5" come from secondary blogs. Measure on your own hardware.
- Unsloth's speed and VRAM claims (~1.5x faster, ~60% less VRAM) are Unsloth's own. Show your measured numbers.
- Don't quote enterprise-adoption percentages from SLM blog posts, since they're usually unsourced.
- Get consent from everyone recorded in the meeting audio. Don't publish the training data.
- **Pin versions:** Ollama version and model tags (e.g. `gemma4:e4b` digest), llama.cpp build number, whisper.cpp commit + model file, mlx-lm, unsloth, transformers, GGUF quant type (Q4_K_M, etc.), and the OS/hardware spec.
