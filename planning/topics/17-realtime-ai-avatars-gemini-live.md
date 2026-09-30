# 17. Real-time AI avatars (Gemini 3.8 Live Avatar)

> **Rank:** 17 of 18 (new addition, suggested priority #9) · **Difficulty:** Medium · **YouTube upside:** High (the output is visual, and no one has posted a developer build yet) · **Build time:** 2–4 days (1 day for a working avatar + tools, 1–2 days for language switching, latency logging and the non-Google comparison)

## 1. Overview
Google announced **Gemini 3.8 Live with Live Avatar** on Sept 24, 2026 (Google blog, and the Cloud blog's `datePublished`; some coverage says it became available "starting September 25"). It is generally available in **Gemini Enterprise** (Agent Platform) with US and EU endpoints. The model ID is `gemini-3.8-live`. It streams over bidirectional WebSockets (`wss://{LOCATION}-aiplatform.googleapis.com/ws/google.cloud.aiplatform.v1.LlmBidiService/BidiGenerateContent`, OAuth bearer token). Input is 16 kHz PCM audio plus optional 1 FPS JPEG video (camera or screen, 768x768 is optimal). Output is 24 kHz PCM audio and a **24 FPS MP4 avatar stream** with lip-sync. You turn the avatar on with `response_modalities: ["VIDEO"]`, an `avatar_config` (prebuilt `avatar_name`, e.g. `"Ben"` in the docs sample) and a prebuilt voice (e.g. `"Puck"`). Tool calls are **asynchronous (`NON_BLOCKING`)**: the avatar keeps talking while a tool runs, a pending call is cancelled if the user changes the request, and an `INTERRUPT` tool response is downgraded to `WHEN_IDLE` while the user is still speaking. Google claims 97 languages with mid-conversation switching, and every audio and video output carries a SynthID watermark. ADK supports it through `run_live()` / `LiveRequestQueue`. **Key caveats:** custom avatars (a reference photo supplied in `customized_avatar`) are "only available to select customers" through your Google Cloud account team. Pricing has no separate line for avatar video. Existing videos are first-look tests and Google's own demos, and none of them is a developer build.

## 2. Why it attracts subscribers
- **Audience:** Developers building support bots, tutors, kiosks and sales assistants who already have a voice agent (see file 10) and want to know whether adding a face is worth the cost. Also frontend developers who enjoy WebSocket and media-streaming work.
- **Competition gap:** Existing coverage is either reaction and first-look testing (Franklin AI's "Insanely Fast (Live Test)", Noah Fry's "Google Gives AI a Face", Sam Witteveen's overview) or Google Cloud Tech's polished customer demos (Autotrader, Salesforce, insurance claims). Nobody shows **mic → WebSocket → `<video>` in their own web page, async tools running mid-sentence, a language switch, and measured latency**. Nobody compares the result against a non-Google avatar stack (LiveKit + Tavus/Simli/HeyGen LiveAvatar, or open-source MuseTalk) either.
- **Winning angle:** "I gave my AI agent a face." Build first, then measure: time to first frame, lip-sync drift, what happens when a tool call is slow, and cost per minute. The visuals carry the video, and the numbers give it credibility. Keep file 10 for voice and make this one about **what the viewer sees**.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Gave My AI Agent a Face (Gemini Live Avatar, Full Build) | Full build | 20–25 min |
| 2 | Gemini Live Avatar vs Tavus vs Simli vs Open-Source MuseTalk: Latency & Cost Per Minute | X vs Y benchmark | 15–18 min |
| 3 | I Tried to Break a Live Avatar: Interruptions, Slow Tools, 5 Languages in One Call | I tried to break it | 12–15 min |
| 4 | Build an AI Tutor With a Face That Looks Things Up Mid-Sentence (ADK + Async Tools) | Full build (mini) | 10–12 min |
| 5 | How Live Avatars Stream: 16 kHz In, 24 FPS Out | Explainer short | <60 s |

**Thumbnail / hook:** A split frame. On one side, your own terminal log showing `tool_call: docs_lookup … 1.8 s`. On the other, the avatar mid-sentence, still talking, labeled "It didn't stop talking." A stopwatch in the corner reads "first frame: X ms". **Hook (first 15 s):** "This avatar is generated live, 24 frames a second, lip-synced in 97 languages, and it keeps talking while my code looks things up in the background. Google only demoed it inside its own console. I wired it into a real web page, timed it, and tried to make it glitch."

## 4. Project build plan
**Project:** *"I gave my AI agent a face: a live-avatar docs tutor / support rep."*
**Stack:** Python + ADK (`google-adk`) with `run_live()` / `LiveRequestQueue`, or the raw `google-genai` SDK (`client.aio.live.connect`), on a small FastAPI/uvicorn WebSocket relay that keeps OAuth tokens off the browser. The browser page is plain JS or React: `getUserMedia` → AudioWorklet (16 kHz PCM) → WebSocket, and avatar MP4 chunks → MediaSource/`<video>`. It needs a Google Cloud project with Agent Platform enabled (`us-central1` or an EU region). Optional comparison stack: LiveKit Agents + a `livekit-agents[tavus|simli|liveavatar]` plugin, and MuseTalk on a GPU box.
**Steps:**
1. **Access check.** In the console, go to Agent Platform → Studio → Stream realtime, pick `gemini-3.8-live`, click **Live Avatar**, choose an avatar and voice, and click Start Session. Film this as the "zero-code baseline" before you write any code.
2. **Scaffold from the sample.** Clone `awesome-llm-apps/voice_ai_agents/insurance_claim_live_agent_team`. It already has an ADK graph, a WebSocket server (`live_demo/server.py`) and `avatar.js` playback. Strip it down to a single agent.
3. **Minimal session.** Connect with `response_modalities=["VIDEO"]`, `avatar_config=AvatarConfig(avatar_name="Ben")` and voice `Puck`, and set a system instruction such as "You are a docs tutor for <your library>."
4. **Mic in.** Capture the mic, resample to 16 kHz mono 16-bit PCM (`audio/pcm;rate=16000`), and stream frames over your relay WebSocket. Log the timestamp of the first audio frame sent.
5. **Avatar out.** Feed the 24 FPS MP4 chunks into a MediaSource-backed `<video>`. Log the time to the first rendered frame and the frame cadence, and show both on a small HUD overlay.
6. **Async tool.** Add `docs_lookup(query)`, declared `NON_BLOCKING`, which searches your docs (a local index, or file 09's hybrid RAG). Add an artificial 2 s delay and show the avatar still talking while the tool runs. Return `status`, `retryable` and `message` fields, and add a retry cap to the system instruction, as the Google guide recommends.
7. **Interruptions.** Barge in mid-answer, and change your question while a tool call is still pending. Show that the pending call is cancelled and that the tool response waits until you stop speaking (`WHEN_IDLE`).
8. **Language switching.** In one session, switch English → Hindi → Spanish → Japanese mid-conversation. Check the lip-sync by eye and note any drift or voice changes.
9. **Latency and cost panel.** Log p50/p95 for end-of-user-speech → first avatar frame, tool-call round trip, and reconnects. Estimate cost per minute from the published Live rates (see caveats).
10. **Non-Google path (segment or video #2).** Re-run the same tutor with LiveKit Agents + Tavus, Simli or HeyGen LiveAvatar, and optionally MuseTalk (open source, "30fps+ on V100"). Compare first-frame latency, visual quality, cost and lock-in.

**Demo moments:** The avatar appears in your own page, not Google's console. You ask "how do I configure X?" and the avatar says "let me check" and keeps talking while the tool log ticks. You cut it off mid-sentence and it stops cleanly. It switches to Hindi mid-sentence and stays lip-synced. A side-by-side of four avatar stacks answers the same question.
**On-screen numbers:** Time to first avatar frame (p50/p95), measured frame rate vs the claimed 24 FPS, end-of-speech → response latency, tool round trip and "talking while waiting" seconds, cost per minute (audio in/out + video in at published rates), session length before a forced reconnect, and the number of languages you tested out of the claimed 97.

## 5. Resources
### Official docs & specs
- [Introducing Gemini 3.8 Live with Live Avatar](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/) — Google blog, Sept 24, 2026: 97 languages, async tools, SynthID, allowlisted custom avatars (fetched)
- [Gemini 3.8 Live with Live Avatar is now generally available](https://cloud.google.com/blog/products/ai-machine-learning/gemini-3-8-live-with-live-avatar-is-now-generally-available) — Google Cloud blog: US/EU endpoints, provisioned throughput, customers (Autotrader, Equal AI "over 1 million live calls daily across 9 Indian languages", Salesforce) (fetched)
- [Developer's guide to Gemini 3.8 Live](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-8-live) — spec table (16 kHz in / 24 kHz + 24 FPS MP4 out), async tools, `WHEN_IDLE` downgrade, `custom_vocabulary`, `media_resolution` (fetched)
- [Configure live avatars](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-live-avatars) — `avatar_config`, WSS endpoint sample, `customized_avatar`, reference-image rules (PNG, ≥704x1280, bust shot) (fetched)
- [Gemini Live API overview (Agent Platform)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) — hub for sessions, streams, language/voice, async function calling, and migration from 2.5 Flash Live (fetched)
- [ADK: Live / bidi streaming](https://adk.dev/live/) — `run_live()`, `LiveRequestQueue`, `RunConfig`, Python/Java/TS (fetched)
- [Gemini Live API (Gemini Developer API)](https://ai.google.dev/gemini-api/docs/live-api) · [Get started with WebSockets](https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket) — the AI Studio-side docs. The overview page does not mention avatar output (fetched)
- [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing) — Gemini 3.8 Live rates (fetched; see caveats)
- [Agent Platform generative AI pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) — the Enterprise pricing page linked from the Cloud blog (unverified — page didn't render the Live rows)
- [Stream realtime in the Cloud console](https://console.cloud.google.com/agent-platform/studio/multimodal-live) — the zero-code avatar playground (linked from the Cloud blog; needs login)
- [gemini-live-api-dev SKILL.md](https://github.com/google-gemini/gemini-skills/blob/main/skills/gemini-live-api-dev/SKILL.md) — Google's agent skill: audio formats, session limits, ephemeral tokens, `NON_BLOCKING` rule (fetched)

### Articles & blog posts
- [Android Headlines: Google Gemini 3.8 Live Avatar](https://www.androidheadlines.com/2026/09/google-gemini-3-8-live-avatar.html) — launch coverage; custom avatars from "a single reference photo and audio sample" (fetched)
- [Fone Arena: Gemini 3.8 Live features](https://www.fonearena.com/blog/493399/google-gemini-3-8-live-features.html) — confirms allowlist-only custom avatars (fetched)
- [findmilan: Gemini 3.8 Live Avatar enterprise feature guide](https://www.findmilan.ca/blog/gemini-live-avatar-enterprise-agents-guide) — useful testing checklist; flags "24 supported languages" in Live API docs vs 97 in the press (fetched)
- [ccleaks: Gemini 3.8 Live Avatar hits enterprise GA](https://ccleaks.com/news/gemini-3-8-live-avatar-sep-2026) — lists what press coverage didn't answer (fetched)
- [Inferama: Live Avatar in Gemini 3.8 Live](https://www.inferama.com/en/actualidad/gemini-38-live-adds-an-animated-avatar-for-real-time-conversations) (unverified — seen in search; page loads but content not reviewed)
- [WindowsForum: Gemini 3.8 Live Avatar goes GA](https://windowsforum.com/news/gemini-3-8-live-avatar-goes-ga-in-enterprise-with-lip-synced-video.445917/) (unverified — 403)
- [LiveKit Agents: virtual avatar providers](https://docs.livekit.io/agents/models/avatar/) — 16 plugins incl. Anam, Beyond Presence, bitHuman, D-ID, LiveAvatar (HeyGen), Runway, Simli, Synthesia, Tavus (fetched)
- [LiveKit: LiveAvatar (HeyGen) plugin](https://docs.livekit.io/agents/models/avatar/plugins/liveavatar/) · [Simli plugin](https://docs.livekit.io/agents/models/avatar/plugins/simli/) · [Tavus plugin](https://docs.livekit.io/agents/models/avatar/plugins/tavus/) (fetched)
- [Tavus docs (CVI)](https://docs.tavus.io/) · [LiveAvatar docs](https://docs.liveavatar.com/) · [D-ID docs](https://docs.d-id.com/) · [Simli docs](https://docs.simli.com/) — non-Google streaming-avatar vendors (loaded; pricing not checked)

### GitHub repos & templates
- [awesome-llm-apps: insurance_claim_live_agent_team](https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/voice_ai_agents/insurance_claim_live_agent_team) — Google-linked ADK + Gemini 3.8 Live sample with optional avatar (`avatar.js`); the best starting point (fetched)
- [google-gemini/live-api-web-console](https://github.com/google-gemini/live-api-web-console) — React starter for the Live API over WebSockets; check its avatar support before relying on it
- [google/adk-samples](https://github.com/google/adk-samples) — ADK sample agents
- [Arun-Kumar-3/gemin-live-avatar](https://github.com/Arun-Kumar-3/gemin-live-avatar) — DIY alternative: Three.js avatar with amplitude lip-sync on Gemini Live audio (0 stars; no Google video) (fetched)
- [sanjayojha/gemini-live-ephemeral-websocket](https://github.com/sanjayojha/gemini-live-ephemeral-websocket) — ephemeral-token browser WebSocket pattern (unverified — seen in search only)
- [TMElyralab/MuseTalk](https://github.com/TMElyralab/MuseTalk) — open-source real-time lip-sync, "30fps+ on NVIDIA Tesla V100", MIT, v1.5 (Mar 2025), ~6.6k stars (fetched)
- [KwaiVGI/LivePortrait](https://github.com/KwaiVGI/LivePortrait) — open-source portrait animation (~19.1k stars); not real-time out of the box (fetched)
- [livekit/agents](https://github.com/livekit/agents) · [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) — open-source realtime frameworks for the non-Google comparison (see file 10)

### YouTube videos (study / beat these)
- [Gemini 3.8 Live Avatar Is Insanely Fast (Live Test)](https://www.youtube.com/watch?v=yPc4h2Se8F4) — Franklin AI · first-look speed test, no code
- [Gemini 3.8 Live Avatar Is Here... Google Gives AI a Face.](https://www.youtube.com/watch?v=YC6ywFAP77s) — Noah Fry · reaction/news
- [Gemini Live Avatars](https://www.youtube.com/watch?v=U236OfO-spI) — Sam Witteveen · developer-leaning overview; the closest competitor, so check how deep it goes
- [Gemini 3.8 Live with Live Avatar](https://www.youtube.com/watch?v=oVG-5BF-dWo) — Google Cloud Tech · official launch demo (embedded in Cloud blog)
- [Gemini 3.8 Live demo for insurance claim agent](https://www.youtube.com/watch?v=QXiJfxdcSgo) — Google Cloud Tech · the demo behind the sample repo
- [Autotrader AI-powered shopping assistant | Gemini 3.8 Live with Live Avatar](https://www.youtube.com/watch?v=0pS0I7mhv10) — Google Cloud Tech · customer case study
- [Salesforce's Agentforce and Gemini 3.8 Live](https://www.youtube.com/watch?v=1x8UAK9demI) — Google Cloud Tech · customer case study
- [Build a real-time voice AI agent with Google ADK and Gemini Live API](https://www.youtube.com/watch?v=yQEKMsCtsmE) — Google Cloud Tech · ADK voice tutorial (audio, not avatar); the base you'll extend
- **Notable channels:** Sam Witteveen, Google Cloud Tech, Franklin AI, Noah Fry. (Titles and channel names were verified through YouTube oEmbed.)

### Tools & install
```bash
pip install --upgrade google-genai websockets numpy   # per Google's 3.8 Live guide (google-genai 2.25.0 at research time)
pip install google-adk                                # ADK run_live / LiveRequestQueue (2.10.0 at research time)
npm i @google/genai                                   # JS SDK (2.24.0 at research time)
gcloud auth application-default login                 # ADC for the Agent Platform WSS endpoint
git clone https://github.com/Shubhamsaboo/awesome-llm-apps && cd awesome-llm-apps/voice_ai_agents/insurance_claim_live_agent_team
python -m uvicorn live_demo.server:app --reload --host 127.0.0.1 --port 4177   # after venv + requirements + .env
uv add "livekit-agents[tavus]~=1.8"                   # non-Google path; also [simli], [liveavatar]
```

### Not found — search for:
- Any per-minute or per-token price for **avatar video output** (neither pricing page showed one) — search `Gemini 3.8 Live avatar video output pricing`
- Official list of prebuilt avatar names beyond `Ben` — search `Gemini Live prebuilt avatars list avatar_name`
- Whether Live Avatar works on the **Gemini Developer API / AI Studio** (not just Enterprise Agent Platform) — search `Gemini API Live Avatar AI Studio response_modalities VIDEO`
- An existing developer build video (web page + code) of Live Avatar — search YouTube `Gemini Live Avatar tutorial code WebSocket`
- Pricing for Tavus / Simli / LiveAvatar / D-ID streaming minutes, for the comparison video — search each vendor's pricing page on filming day
- A real-time wrapper for LivePortrait (e.g. a "FasterLivePortrait" TensorRT fork mentioned in the LivePortrait README) — search GitHub `FasterLivePortrait`

## 6. Caveats & fact-checks before filming
- **Launch date:** the Google blog and the Cloud blog metadata say Sept 24, 2026. Fone Arena says it became available "starting September 25". Say "announced Sept 24".
- **Enterprise-first:** GA is "in Gemini Enterprise" (Agent Platform, OAuth, regional endpoint). Whether the avatar is available through an AI Studio API key is **unconfirmed**. Film on a Cloud project.
- **Custom avatars are gated:** `customized_avatar` is "only available to select customers" (contact your account team), and you are "responsible for securing all consents and rights". Don't promise viewers they can clone themselves. Use prebuilt avatars on camera.
- **Languages:** 97 is Google's figure for the avatar and speech. One guide found "24 supported languages" in Live API docs. Test the languages you show and say "Google claims 97".
- **Pricing:** the Gemini Developer API page lists Gemini 3.8 Live at input $0.75/M text, $3.00/M audio (≈$0.005/min), $1.00/M image/video (≈$0.002/min), and output $4.50/M text, $12.00/M audio (≈$0.018/min). It has **no separate avatar-video line**, and the Enterprise pricing page didn't render. Treat any per-minute estimate as provisional and re-check.
- **Session limits:** Google's Live API skill lists ~10 min connection lifetime and **2 min for audio+video sessions without context compression**. Plan reconnect/resumption logic before a long demo.
- **Claimed vs measured:** "sub-second latency" and "24 FPS" are Google specs. Show your own measured frame rate and latency and label them "on my network, filming date".
- **SynthID:** every avatar frame is watermarked, which is good for disclosure. Still tell viewers the avatar is AI-generated.
- **Third-party vendors:** the LiveKit plugin list and vendor docs were checked, but pricing and latency were not. The MuseTalk "30fps+" figure is from V100 hardware, so consumer GPUs will be slower.
- **Pin versions:** `gemini-3.8-live` (not an alias), `google-genai==2.25.x`, `google-adk==2.10.x`, `@google/genai@2.24.x`, `livekit-agents~=1.8`, MuseTalk v1.5. Show the filming date and region on screen.
