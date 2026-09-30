# 13. Local voice cloning & AI dubbing (VoiceStudio / OmniVoice)

> **Rank:** 13 of 18 (new addition, suggested priority #3–4) · **Difficulty:** Medium · **YouTube upside:** Very high (trending repo + "$0 vs ElevenLabs" + your own channel as the demo) · **Build time:** 2–3 days for the pipeline + 1 day for the A/B test and MCP wrapper

## 1. Overview
**debpalash/VoiceStudio** is #1 on Trendshift's monthly chart (33.3k stars counted there; **46.1k stars / 5.2k forks live on GitHub**). It bills itself as "the open-source, fully-local ElevenLabs alternative," offering "voice cloning, voice design, video dubbing, dictation, transcription & audiobook creation in 646 languages." It runs locally as an Electron desktop app (moved off Tauri in v0.5.3), exposes an OpenAI-compatible local API and MCP for agents, and is AGPL-3.0. Its core engine is **k2-fsa/OmniVoice**: a 0.6B diffusion-LM-style zero-shot TTS built on Qwen3-0.6B, covering 600+ languages and trained on 581k hours of open data. OmniVoice does cloning from 3–10 s of reference audio, voice design from text attributes ("female, low pitch, british accent"), and reaches an RTF as low as 0.025 (arXiv 2604.00688; `pip install omnivoice`, v0.2.1). Commercial context: **ElevenLabs Eleven v4 / v4 Turbo** shipped Sept 28 (90+ languages, 10-second Instant Voice Clones, "#1 by Artificial Analysis"). **Gemini 3.8 Flash TTS** added voice design and voice replication on Sept 22; the model ID is `gemini-3.8-flash-tts` and it returns `voice_...`/`voicekey_...` IDs. **How this differs from file 10:** file 10 covers *realtime, conversational* voice agents (latency, turn-taking, speech-to-speech). This file covers *offline, batch* voice generation: cloning, translation, time alignment and remuxing a finished video, where quality and sync matter more than milliseconds. **Key caveats:** the OmniVoice *code* is Apache-2.0, but the Hugging Face *weights* are **CC-BY-NC** (non-commercial). Both projects forbid unauthorized cloning.

## 2. Why it attracts subscribers
- **Audience:** Creators and developers who want their content in Hindi, Spanish, Portuguese and other languages without paying per character. Indian dev channels in particular, where multilingual reach is the growth lever. Also local-AI and self-hosting fans.
- **Competition gap:** Current videos are install guides and "free ElevenLabs alternative" first-looks: Open Projects, kilObit, AiThatSpeaks, CLI Stack, Jarods Journey, and Jeff Geerling's "ElevenLabs just got nuked by open source" at ~670k views. ElevenLabs and Google push their own dubbing and cloning demos. Nobody found runs a **full, reproducible pipeline on a real channel video** (transcribe → translate with timing → clone → remux → upload as YouTube multi-language audio) **plus a blind A/B test against Eleven v4 plus an honest consent/licensing segment**.
- **Winning angle:** "I dubbed my own YouTube video into 5 languages for $0, then made native speakers guess which one was ElevenLabs." It's your own voice (the consent story is clean), and the result is measurable: blind preference, sync drift, and cost.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Dubbed My Own YouTube Video Into 5 Languages for $0 (Local AI) | Full build | 20–25 min |
| 2 | Free Local Voice Clone vs ElevenLabs v4: Native Speakers Pick Blind | X vs Y benchmark | 12–15 min |
| 3 | I Tried to Break OmniVoice: Accents, Numbers, Code, and 10 Languages | I tried to break it | 12–15 min |
| 4 | Turn Your Dubbing Pipeline Into an MCP Tool (Claude/Codex Can Dub Videos) | Full build (mini) | 10–12 min |
| 5 | Is Cloning a Voice Legal? The 60-Second Version | Explainer short | <60 s |

**Thumbnail / hook:** Your face with 5 flags coming out of your mouth as speech bubbles, a crossed-out "$99/mo" and a big "$0". Small text: "Which one is ElevenLabs?" **Hook (first 15 s):** "This is me speaking Hindi. And Spanish. And Japanese. I don't speak any of them. It ran on my own GPU, cost nothing, and then I asked native speakers to pick it blind against ElevenLabs' brand-new v4. The results surprised me, and so did the license fine print."

## 4. Project build plan
**Project:** *"I dubbed my own YouTube video into 5 languages for $0."*
**Stack:** Python 3.11; `faster-whisper` or WhisperX (word timestamps + alignment) for transcription; any LLM for segment-level translation with a duration budget; OmniVoice (`omnivoice` 0.2.1) for cloning, run directly or through VoiceStudio's local API; ffmpeg for time-stretching (`atempo`), mixing and remuxing; ElevenLabs v4 API for the A/B baseline (Gemini 3.8 Flash TTS optional); the MCP Python SDK or FastMCP to expose the pipeline as a tool; and a tiny web page for the blind test.
**Steps:**
1. **Consent first:** record a 10–20 s clean reference clip of *your own* voice, with a signed/recorded consent note on file (even for yourself; it models good practice). Pick a 5–8 min video from your channel.
2. **Separate and transcribe:** split out the voice track (optionally with a stem separator so music and effects are preserved), then run faster-whisper/WhisperX to get segments with word timestamps.
3. **Translate with timing:** send segments to the LLM with each segment's source duration and a target syllable/character budget ("fit in 3.4 s"), keeping terms such as code identifiers untranslated. Store the output as JSON (id, start, end, src, tgt).
4. **Clone:** for each segment and language, generate with OmniVoice `model.generate(text=…, ref_audio="ref.wav", ref_text=…)` (or VoiceStudio's dubbing mode / local API). Log RTF and GPU memory.
5. **Align:** measure each clip's length against its slot. Time-stretch within ±15% with ffmpeg `atempo`; beyond that, send it back to the LLM for a shorter translation. Track drift in ms.
6. **Remux:** place clips on a silent timeline, mix them with the music/effects stem, and export an audio-only track per language. Upload each track in YouTube Studio → Languages (multi-language audio needs Advanced features, and you must delete any auto-dub in that language first).
7. **Baseline:** generate the same segments with Eleven v4 (Instant Voice Clone of your own voice) and record the cost per minute of audio.
8. **Blind A/B:** build a page that plays random pairs (OmniVoice vs Eleven v4, with order randomized) to native or fluent speakers of each language. Collect preference, naturalness (1–5) and "sounds like the creator?" (1–5). Aim for at least 10 raters per language.
9. **MCP tool:** wrap the pipeline as `dub_video(path, languages[])` with FastMCP and call it from an agent. Or show that VoiceStudio already ships MCP and compare.
10. Close on the failure reel (mispronounced numbers, code terms, drift spots) and a licensing/consent recap.

**Demo moments:** Your own voice switching languages mid-sentence in a side-by-side. A timeline view showing clips squeezed into their slots and the drift counter. The YouTube player's audio-track menu with your 5 languages. The blind-test reveal. An agent calling `dub_video` through MCP.
**On-screen numbers:** Total $ (local: $0 plus electricity; Eleven v4: $ per minute from your invoice), GPU time and RTF per language, mean and max sync drift (ms), % of segments needing re-translation, blind preference % per language (with n), speaker-similarity score, and WER from re-transcribing the dubbed audio with Whisper.

## 5. Resources
### Official docs & specs
- [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) — 46.1k stars, AGPL-3.0, local API + MCP, `npx skills add debpalash/VoiceStudio`; "obtain permission before cloning voices" (fetched)
- [voicestudio.sh](https://voicestudio.sh) — site and one-line installer; OpenAI-compatible API, "free for personal use" (fetched; the site's "11,000+ stars" is stale)
- [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice) — code under Apache-2.0, ~14k stars; `omnivoice-demo`/`omnivoice-infer` CLIs; 3–10 s reference audio (fetched)
- [OmniVoice model card (Hugging Face)](https://huggingface.co/k2-fsa/OmniVoice) — 0.6B, Qwen3-0.6B base, **CC-BY-NC weights**, usage prohibition text (fetched)
- [OmniVoice HF Space](https://huggingface.co/spaces/k2-fsa/OmniVoice) — try it in the browser (loads)
- [arXiv 2604.00688: OmniVoice: Towards Omnilingual Zero-Shot TTS with Diffusion Language Models](https://arxiv.org/abs/2604.00688) — Zhu et al. (incl. Daniel Povey), 581k hours, 600+ languages (fetched)
- [ElevenLabs: Eleven v4](https://elevenlabs.io/blog/eleven-v4) — Sept 28; v4 + v4 Turbo, 90+ languages, 10 s IVC, ~150 ms TTFS for Turbo (fetched)
- [ElevenLabs models docs](https://elevenlabs.io/docs/overview/models) (loads; check the v4 model ID here) · [ElevenLabs: Introducing Dubbing v2](https://elevenlabs.io/blog/introducing-dubbing-v2) (seen in the blog index; not opened)
- [Gemini API: Speech generation](https://ai.google.dev/gemini-api/docs/speech-generation) — `gemini-3.8-flash-tts`, voice design and replication, 200 voices/project, 1-year TTL, 130+ languages (fetched)
- [YouTube Help: Add multi-language features to your videos](https://support.google.com/youtube/answer/13338784) — upload dubbed tracks; needs Advanced features; delete any auto-dub first (fetched)
- [YouTube Help: Disclosing use of GenAI content](https://support.google.com/youtube/answer/14328491) — lists "cloning one's own voice to create voice overs or dubs" as **not** requiring disclosure (fetched)
- [YouTube Help: Protecting your identity](https://support.google.com/youtube/answer/2801895) — privacy/likeness complaint route (title fetched; body not reviewed)
- [EU AI Act, Article 50](https://artificialintelligenceact.eu/article/50/) — machine-readable marking + deepfake disclosure; applies from **Aug 2, 2026** (fetched)
- [FTC: proposed protections against AI impersonation of individuals](https://www.ftc.gov/news-events/news/press-releases/2024/02/ftc-proposes-new-protections-combat-ai-impersonation-individuals) — Feb 15, 2024; voice-cloning fraud context (fetched)
- [ffmpeg documentation](https://ffmpeg.org/ffmpeg.html) (loads)

### Articles & blog posts
- [Trendshift monthly](https://trendshift.io/monthly) — VoiceStudio #1 with 33.3k (fetched; the ranking changes daily)
- [Digital Applied: AI model releases September 2026 tracker](https://www.digitalapplied.com/blog/ai-model-releases-september-2026-tracker) — Eleven v4 at $0.08/1k chars (v4) and $0.04 (Turbo) with a 72% launch discount to Oct 12; Gemini 3.8 Flash TTS on Sept 22, with **voice replication unavailable in Illinois, Texas, EEA, UK, Switzerland and India** (fetched; secondary)
- ElevenLabs blog index: [elevenlabs.io/blog](https://elevenlabs.io/blog) — also lists the v3 GA post and the Dubbing v2 post (fetched)

### GitHub repos & templates
- [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) · [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice) (above)
- [openai/whisper](https://github.com/openai/whisper) · [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) · [m-bain/whisperX](https://github.com/m-bain/whisperX) — transcription + word alignment (all load)
- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) · [FastMCP](https://gofastmcp.com) — for the `dub_video` tool (both load)

### YouTube videos (study / beat these)
- [VoiceStudio is the open-source, fully-local ElevenLabs alternative - voice cloning](https://www.youtube.com/watch?v=51kvdaUKApo) — Open Projects · overview/first look
- [This Open-Source AI Can Clone Voices in Seconds... And It's FREE](https://www.youtube.com/watch?v=2KemGhEI0Ck) — kilObit · ~23k views; hype first-look
- [OmniVoice Studio: FREE OpenSource ElevenLabs Alternative | Voice Clone, Video Dubbing](https://www.youtube.com/watch?v=xkFkvxYKe1Q) — AiThatSpeaks · dubbing walkthrough
- [VoiceStudio: The Local, Open-Source ElevenLabs Alternative (16 TTS Engines on Your Hardware)](https://www.youtube.com/watch?v=RUbxKD7ErtE) — CLI Stack · engine catalogue tour
- [VoiceStudio - Clone, Dub and Narrate (Full Tutorial) | September Updates](https://www.youtube.com/watch?v=2m1WXCR5kVE) — Full Stack · newest tutorial
- [Open Source AI TTS With 600 Languages - Installation and Showcase of Omnivoice](https://www.youtube.com/watch?v=Edpsu61cwG8) — Jarods Journey · install + showcase
- [Real-time AI voice cloning with OmniVoice](https://www.youtube.com/watch?v=WENMgQE9tws) — No place like localhost · ~53k views
- [ElevenLabs just got nuked by open source](https://www.youtube.com/watch?v=dQ841Pd6YvQ) — Jeff Geerling · ~670k views; the bar for the "open vs ElevenLabs" framing
- [Introducing Eleven v4 and Eleven v4 Turbo](https://www.youtube.com/watch?v=th_tXR2QQ6U) — ElevenLabs · official launch (your A/B opponent)
- [Gemini 3.8 Flash TTS with Voice Cloning](https://www.youtube.com/watch?v=GDUBXR-ql78) — Sam Witteveen · ~78k views; developer walkthrough
- [Create your own voices with Gemini 3.8 text-to-speech](https://www.youtube.com/watch?v=FL6mI_Br-mc) — Google DeepMind · official
- [I Built an Open-Source AI Video Dubbing Agent | LangGraph + Whisper + Python](https://www.youtube.com/watch?v=ss1oQfCs5Z0) — NightDevil PT · closest to this build, ~80 views (gap)
- Also: [OmniVoice v0.2.1 – Clone Your Voice in 600+ Languages! Complete Installation Guide](https://www.youtube.com/watch?v=KXNKE3ZRvNg) (AiThatSpeaks), [Translate your Video to 90+ Languages Using Dubbing v2](https://www.youtube.com/watch?v=CapfiSbuAvM) (ElevenLabs), [Stop Paying ElevenLabs | FREE AI Dubbing + Voice Cloning](https://www.youtube.com/watch?v=O8CUNGyvbz4) (VFX Nirvana; channel from search metadata only)
- **Notable channels:** Jeff Geerling, Sam Witteveen, ElevenLabs, Google DeepMind, Jarods Journey, AiThatSpeaks. (Channel names were verified through YouTube oEmbed or YouTube search-result metadata. View counts are from Sept 29.)

### Tools & install
```bash
pip install omnivoice                              # OmniVoice 0.2.1 (install PyTorch for your GPU first)
omnivoice-demo                                     # local web UI to sanity-check cloning
curl -fsSL https://voicestudio.sh/install | sh     # VoiceStudio one-line install (macOS/Linux) — read the script first
pip install faster-whisper                         # or: pip install whisperx
pip install "mcp[cli]" fastmcp                     # MCP server for the dub_video tool
sudo apt install ffmpeg                            # atempo stretch, mixing, remux
```

### Not found — search for:
- Tennessee ELVIS Act primary text/summary — search `Tennessee ELVIS Act voice likeness AI 2024 text`
- US NO FAKES Act current status (congress.gov returned 403) — search `NO FAKES Act 2026 status Senate`
- India: personality-rights / voice-cloning court orders and any IT Rules synthetic-media labeling — search `Delhi High Court personality rights AI voice cloning order` and `MeitY synthetically generated information labelling rules`
- VoiceStudio's exact local API port and MCP config — check the repo README/docs on install
- An Eleven v4 price on an official ElevenLabs page (only the tracker gives $0.08/1k chars) — search `ElevenLabs v4 pricing per character`
- Independent WER/similarity benchmarks of OmniVoice vs Eleven v4 — search `OmniVoice vs ElevenLabs v4 benchmark`

## 6. Caveats & fact-checks before filming
- **Consent, ethics and legal (say this on camera):**
  - Clone **only your own voice**, or voices with explicit, recorded, revocable consent. OmniVoice's card prohibits "unauthorized voice cloning, voice impersonation, fraud, scams," and VoiceStudio requires permission before cloning. Never demo celebrity or colleague voices "for fun".
  - **YouTube:** cloning your *own* voice for dubs is explicitly listed as not needing the GenAI disclosure. Cloning *someone else* realistically ("makes a real person appear to say… something they didn't") does need it, and people can file likeness complaints.
  - **EU AI Act Art. 50** (in force Aug 2, 2026): providers must machine-mark synthetic audio, and deployers must disclose deepfakes. EU viewers are in scope even if you're not in the EU.
  - **US:** the FTC treats AI impersonation as fraud territory, and several states have voice-likeness laws (e.g. Tennessee's ELVIS Act; see "Not found"). **India:** courts have granted personality-rights protection against AI voice misuse (verify specific cases before naming them). This is not legal advice, so say so.
  - Add a spoken or visual "AI-dubbed" label on the dubbed tracks anyway. It builds trust even where it isn't required.
- **License fine print (important for a monetized channel):** OmniVoice **weights are CC-BY-NC**, and whether dubbing a monetized YouTube video counts as "commercial" is a real question. VoiceStudio is AGPL-3.0, and its other bundled engines each carry their own licenses. Frame "$0" as "$0 for personal/non-commercial use; check licenses before monetizing."
- **Gemini voice replication is reportedly unavailable in India**, the EEA, the UK and elsewhere (per the tracker, not the docs). If you film from India, you may not be able to demo it.
- **Numbers that conflict:** VoiceStudio says 646 languages while OmniVoice says 600+. Trendshift shows 33.3k but GitHub shows 46.1k (Trendshift counts differently). Eleven v4 Turbo latency is ~150 ms per ElevenLabs but ~100 ms per the tracker. Cite the primary source.
- **"#1 on Artificial Analysis"** is ElevenLabs' claim (the tracker cites 1319 Elo), so label it vendor-reported.
- **Language coverage ≠ quality:** 600+ languages doesn't mean equal quality. Test your 5 target languages specifically and show at least one weak one.
- **Sync:** translated speech is often 10–30% longer, so budget for re-translation passes. Lip-sync is out of scope unless you add a lip-sync model.
- **Pin versions:** `omnivoice==0.2.1` plus the exact HF weights revision, the VoiceStudio release tag, the `faster-whisper`/WhisperX version and Whisper model size, the Eleven v4 model ID, and the ffmpeg version. Show the filming date on screen.
