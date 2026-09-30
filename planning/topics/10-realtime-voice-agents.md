# 10. Realtime voice agents

> **Rank:** 10 of 11 · **Difficulty:** Intermediate–Advanced · **YouTube upside:** Medium–High (demos are visual) · **Build time:** 3–5 days

## 1. Overview
Realtime voice agents listen, think, and speak with sub-second latency. They come in two shapes: a cascaded STT → LLM → TTS pipeline, or a single speech-to-speech model. LiveKit Agents and Pipecat are the two leading open-source frameworks. LiveKit's own blog (Sept 21, 2026) says both "grew about 63–64%" in stars between Jan 1 and Sept 15, 2026, and it now lists Pipecat at ~15.9k and LiveKit Agents at ~14.4k stars. The model layer is moving fast. OpenAI shipped gpt-realtime-2.1 on July 6, 2026 (p95 latency down "at least 25%" via caching) and then **GPT-Live-1** (full-duplex) GA on Sept 10, 2026. Google's Gemini 3.1 Flash Live (Mar 26, 2026) is now marked "legacy preview," and Google points to Gemini 3.8 Live instead. Recheck every model name the day you film. The star figures come from LiveKit, which is one of the two frameworks being compared.

## 2. Why it attracts subscribers
- **Audience:** Intermediate-to-advanced developers, agency builders selling AI receptionists to small businesses, and startup founders. Voice demos are visual and easy to share, and there is clear business value (booked appointments).
- **Competition gap:** YouTube has plenty of "first LiveKit agent in 10/20 minutes" (Cole Medin, Brendan Jowett), "LiveKit + Twilio phone agent" (CodeTV, Jonas Massie), and Pipecat starter videos (Speechmatics, Hugo Pod, Kno2gether), plus official Gemini Live tutorials from Google. **Missing:** a same-task head-to-head of LiveKit vs Pipecat, and cascade vs speech-to-speech, with a measured latency waterfall. Also missing: videos on turn-taking and "does the caller need a human?" decisions.
- **Winning angle:** "I built the same phone receptionist on LiveKit and Pipecat and measured every millisecond." Put a latency waterfall on screen and add a live interruption stress test.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Built an AI Phone Receptionist That Books Real Appointments | Full build | 20–25 min |
| 2 | LiveKit vs Pipecat: Same Agent, Every Millisecond Measured | X vs Y benchmark | 15–18 min |
| 3 | Cascade (Deepgram + LLM + ElevenLabs) vs GPT-Live-1 vs Gemini Live: Which Feels Human? | X vs Y benchmark | 12–15 min |
| 4 | I Tried to Break My Voice Agent (Interruptions, Noise, Accents, Spelling Emails) | I tried to break it | 10–12 min |
| 5 | Where Voice Agent Latency Actually Goes (in 60 s) | Explainer short | <1 min |

**Thumbnail / hook:** A phone on screen with a live waveform, a stopwatch reading "412 ms," and the text "IT BOOKED IT." Hook (first 15 s): *"You're about to hear me call a dentist's office that doesn't have a receptionist. I'll interrupt it, change my mind twice, and spell my email. Watch the latency counter in the corner."*

## 4. Project build plan
**Project:** *"A phone receptionist that books appointments."*
**Stack:** LiveKit Agents (Python) **or** Pipecat · STT: Deepgram Flux or AssemblyAI Universal-Streaming · LLM: a fast tool-calling model · TTS: ElevenLabs Flash or Inworld · Speech-to-speech alternative: OpenAI Realtime (gpt-realtime-2.1 / GPT-Live-1) or Gemini Live · Turn detection: LiveKit turn detector / Pipecat Smart Turn v3 · Telephony: LiveKit Phone Numbers, or Twilio/Plivo SIP trunk · Calendar: Google Calendar or Cal.com API · A Jev (Topic 1) "caller done? / needs human?" classifier.
**Steps:**
1. Scaffold from `livekit-examples/agent-starter-python` (or `pipecat init`) and get a browser voice loop working in console mode.
2. Write the receptionist persona and a strict booking flow (collect name, reason, date/time, and phone number, then confirm by reading it back).
3. Add tools `check_availability`, `book_slot`, and `transfer_to_human` against a real calendar API.
4. Turn on interruption handling (barge-in) and semantic turn detection (Smart Turn v3 or LiveKit's turn detector). Tune the endpointing thresholds.
5. Add the Jev (or small-LLM) classifier on each user turn: `caller_finished` (Noul), `needs_human` (Noul), and `intent` (Choice). Escalate when needs_human ≥ 0.9.
6. Connect a phone number: LiveKit Phone Numbers, or a Twilio Elastic SIP trunk → LiveKit SIP inbound trunk plus a dispatch rule (use explicit agent dispatch).
7. Instrument each hop (VAD end → STT final → LLM first token → TTS first audio → caller hears it) and render a per-turn latency waterfall.
8. Swap the cascade for a speech-to-speech model (OpenAI Realtime / Gemini Live) behind the same tools, then re-run the same 20 scripted calls.
9. Stress test with background noise, overlapping speech, spelled emails, and accents. Record the failures.
10. Tally the cost per minute for each configuration and publish the repo.

**Demo moments:** A live phone call booking a slot that then appears in the calendar. Barge-in mid-sentence. The agent correctly transferring an angry caller to a human. The waterfall chart animating per turn. The same call on the cascade and speech-to-speech setups, back to back.
**On-screen numbers:** p50/p95 voice-to-voice latency per stack · a per-hop breakdown (STT ms, LLM TTFT ms, TTS TTFA ms, network) · booking success rate over 20 calls · false-interruption rate · $/minute (e.g. GPT-Live-1 is listed at $0.05/min by third parties; verify) · WER on spelled emails and phone numbers.

## 5. Resources
### Official docs & specs
- [LiveKit Agents docs](https://docs.livekit.io/agents/): framework intro, pipeline, turn detection, tools
- [LiveKit Telephony intro](https://docs.livekit.io/telephony/) · [Agents telephony integration](https://docs.livekit.io/telephony/agents-integration/) · [Plivo SIP trunk setup](https://docs.livekit.io/telephony/start/providers/plivo/)
- [LiveKit: OpenAI GPT-Live plugin guide](https://docs.livekit.io/agents/models/realtime/plugins/gpt-live/) · [LiveKit: Inworld TTS plugin](https://docs.livekit.io/agents/models/tts/inworld/)
- [Pipecat documentation](https://docs.pipecat.ai/overview/introduction) · [Pipecat Inworld TTS service](https://docs.pipecat.ai/server/services/tts/inworld) · [Smart Turn on Pipecat Cloud](https://docs.pipecat.ai/pipecat-cloud/guides/smart-turn)
- [OpenAI: Getting started with the Realtime API](https://developers.openai.com/api/docs/guides/realtime)
- [OpenAI model page: gpt-realtime-2.1](https://developers.openai.com/api/docs/models/gpt-realtime-2.1) · [gpt-realtime-2.1-mini](https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini) · [GPT-Live-1](https://developers.openai.com/api/docs/models/gpt-live-1)
- [OpenAI Community: gpt-realtime-2.1 and -mini announcement (Jul 6 2026)](https://community.openai.com/t/new-realtime-models-on-the-api-gpt-realtime-2-1-and-gpt-realtime-2-1-mini/1385896): pricing, plus reports of tool-calling regressions
- [OpenAI: Build more natural voice experiences with GPT-Live-1 in the API](https://openai.com/index/introducing-gpt-live-1-in-the-api/) (unverified, seen in search) · [Introducing gpt-realtime](https://openai.com/index/introducing-gpt-realtime/) (unverified)
- [Gemini: Gemini 3.1 Flash Live preview model page](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-live-preview): now marked legacy, points to Gemini 3.8 Live
- [Gemini Live API capabilities guide](https://ai.google.dev/gemini-api/docs/live-api/capabilities) · [Google blog: Build with Gemini 3.1 Flash Live](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-3-1-flash-live/) (unverified)
- [Deepgram Flux quickstart](https://developers.deepgram.com/docs/flux/quickstart) · [Build a Flux-enabled voice agent](https://developers.deepgram.com/docs/flux/agent) · [Flux API ref](https://developers.deepgram.com/reference/speech-to-text/listen-flux)
- [AssemblyAI Universal Streaming docs](https://www.assemblyai.com/docs/streaming/universal-streaming) (the Universal-3 Pro API reference link returned 404 on 2026-09-29; find it from the docs sidebar)
- [ElevenLabs: Models](https://elevenlabs.io/docs/overview/models) · [Understanding latency](https://elevenlabs.io/docs/eleven-api/concepts/latency) · [Latency optimization](https://elevenlabs.io/docs/eleven-api/guides/how-to/best-practices/latency-optimization)
- [Twilio: Use SIP with Twilio Voice](https://www.twilio.com/docs/voice/api/sip-interface) · [Twilio blog: OpenAI Realtime SIP connector + Elastic SIP Trunking](https://www.twilio.com/en-us/blog/developers/tutorials/product/openai-realtime-api-elastic-sip-trunking) (unverified)
- [Plivo: LiveKit integration guide](https://www.plivo.com/docs/voice-agents/sip-trunking/integration-guides/livekit) (unverified)

### Articles & blog posts
- [LiveKit: The best open source frameworks for realtime voice and video AI agents (Sept 21 2026)](https://livekit.com/blog/best-open-source-voice-and-video-ai-agent-frameworks): the source of the "63–64%" star-growth figure. Covers LiveKit, Pipecat, TEN, Dograh, Vision Agents, Vocode.
- [TECHSY: 6 Best Open-Source Voice Agent Frameworks (2026)](https://techsy.io/en/blog/best-open-source-voice-agent-frameworks): the July 14 star counts (unverified)
- [MarkTechPost: OpenAI releases gpt-realtime-2.1 and -mini (Jul 6 2026)](https://www.marktechpost.com/2026/07/06/openai-gpt-realtime-2-1-mini-reasoning-realtime-api/) (unverified)
- [TechRepublic: GPT-Live-1 lets AI listen and speak at the same time](https://www.techrepublic.com/article/news-openai-gpt-live-1-real-time-voice-agents/) (unverified)
- [Deepgram: Introducing Flux conversational speech recognition](https://deepgram.com/learn/introducing-flux-conversational-speech-recognition) (unverified)
- [AssemblyAI: Introducing Universal-Streaming](https://www.assemblyai.com/blog/introducing-universal-streaming) (unverified)
- [Inworld: Realtime TTS-2](https://inworld.ai/blog/realtime-tts-2) (unverified)
- [WebRTC.ventures: The Voice AI Latency Budget, where every millisecond goes (Sept 2026)](https://webrtc.ventures/2026/09/voice-ai-latency-budget/) (unverified)
- [Hamming AI: Voice AI latency, what's fast, what's slow](https://hamming.ai/resources/voice-ai-latency-whats-fast-whats-slow-how-to-fix-it) (unverified)
- [Evalgent: Pipecat vs LiveKit (2026)](https://www.evalgent.com/blog/pipecat-vs-livekit) · [Inworld: Vapi vs Pipecat vs LiveKit](https://inworld.ai/resources/vapi-vs-pipecat-vs-livekit) (both unverified, vendor-written)

### GitHub repos & templates
- [livekit/agents: examples](https://github.com/livekit/agents/tree/main/examples) · [basic_agent.py](https://github.com/livekit/agents/blob/main/examples/voice_agents/basic_agent.py)
- [livekit-examples/agent-starter-python](https://github.com/livekit-examples/agent-starter-python): a complete voice AI starter
- [livekit/livekit](https://github.com/livekit/livekit): the WebRTC SFU server
- [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)
- [pipecat-ai/smart-turn](https://github.com/pipecat-ai/smart-turn) · [smart-turn-v3 on HF](https://huggingface.co/pipecat-ai/smart-turn-v3): open audio turn-detection model (BSD-2)
- [NVIDIA/voice-agent-examples](https://github.com/NVIDIA/voice-agent-examples): Pipecat-based orchestrator examples
- [GitHub topic: voice-agents](https://github.com/topics/voice-agents) · [yzfly/awesome-voice-agents](https://github.com/yzfly/awesome-voice-agents) (unverified; many forks exist, so check which is canonical)

### YouTube videos (study / beat these)
- [Build Your First Voice AI Agent in 20 Minutes with LiveKit (Open Source)](https://www.youtube.com/watch?v=TXVyxJdlzQs), Cole Medin · Popular starter. No telephony or latency measurement.
- [Master LiveKit Voice Agents in 10 Minutes! (Full Tutorial)](https://www.youtube.com/watch?v=eMaLOQbj4GE), Brendan Jowett · Agency-focused quick build.
- [Build an AI Voice Agent That Qualifies and Transfers Calls (LiveKit Tutorial)](https://www.youtube.com/watch?v=R9Phzvz5Zbk), Jonas Massie · Close to our receptionist. Covers transfer logic.
- [Use LiveKit + Twilio to build a phone AI agent](https://www.youtube.com/watch?v=2HmqSXHYMJ8), CodeTV · SIP wiring (Apr 2025, may be outdated).
- [Native Telephony for Voice Agents | LiveKit Phone Numbers Demo](https://www.youtube.com/watch?v=sus2G_FYpzk), LiveKit · Official, skips Twilio.
- [Set up a 100% Local AI Voice Agent in 10 minutes! (LiveKit)](https://www.youtube.com/watch?v=VvGLdwSf41w), Thanh-y David Nguyen · Local stack angle.
- [Building your first Voice AI Agent with Pipecat Step-by-Step](https://www.youtube.com/watch?v=Uxz3Uo9py_4), Speechmatics · Vendor-made Pipecat intro.
- [How To Build Your First AI Voice Agent On Pipecat](https://www.youtube.com/watch?v=wjeAYO6e4ac), Hugo Pod · Pipecat + Twilio phone calls.
- [Full Pipeline: Real-Time Voice AI Agent with Pipecat](https://www.youtube.com/watch?v=-FeavjPdX1Y), Arindam Majumder · Pipeline explanation (Apr 2026).
- [Build a real-time voice AI agent with Gemini Live API](https://www.youtube.com/watch?v=pFc-HcUgFgY), Google Cloud Tech · Official (Aug 2026).
- [Add Telephony to a Gemini Live Agent](https://www.youtube.com/watch?v=FCb4LSzPVmo), Google for Developers · Twilio + Cloud Run.

**Notable channels:** LiveKit (official), Cole Medin, Brendan Jowett, Jonas Massie, Hugo Pod, Google Cloud Tech / Google for Developers.

### Tools & install
```bash
pip install "livekit-agents[openai,deepgram,elevenlabs,silero,turn-detector]"   # extras names: verify in docs
uv tool install "pipecat-ai[cli]"            # Pipecat CLI (per docs)
pip install "pipecat-ai[daily,deepgram,openai,elevenlabs]"
pip install twilio deepgram-sdk assemblyai elevenlabs
brew install livekit-cli                     # lk CLI for SIP trunks/dispatch rules (verify)
```

### Not found (search for these):
- A YouTube head-to-head of LiveKit vs Pipecat on the same task (only blog comparisons found). Search: `site:youtube.com "livekit" "pipecat" comparison`.
- An OpenAI Realtime / GPT-Live-1 YouTube build tutorial (search returned only blogs). Search: `site:youtube.com "gpt-live-1"` and `site:youtube.com "gpt-realtime-2" voice agent`.
- The TECHSY July 14 star counts (13,416 / 11,356) weren't re-opened. Search: `techsy pipecat 13,416 stars`.

## 6. Caveats & fact-checks before filming
- **Model churn:** gpt-realtime-2.1 (Jul 6) has since been joined by GPT-Live-1 (GA Sept 10, 2026, full-duplex, with a separate reasoning backend). Gemini 3.1 Flash Live is now "legacy preview," and Google points to **Gemini 3.8 Live**. Use whichever is current on filming day and say the date on camera.
- **Star counts:** the "63–64% growth" figure comes from LiveKit's own blog, and LiveKit is one of the two frameworks being compared, so attribute it. Counts differ by snapshot (TECHSY Jul 14: Pipecat 13,416 / LiveKit 11,356; LiveKit blog Sept: 15.9k / 14.4k).
- The "25% lower p95" claim is OpenAI's own and applies across Realtime voice models via caching. Measure your own p95 rather than repeating it.
- Community posts report tool-calling regressions after migrating to gpt-realtime-2.1. Test tool calls explicitly.
- Vendor latency figures (ElevenLabs Flash "~75 ms," Inworld "25 ms TTFB") exclude network. Show end-to-end numbers measured from the caller's side.
- Latency comparison blogs (e.g. "LiveKit 750–900 ms vs Pipecat 800–950 ms") come from vendors or agencies. Don't cite them as independent.
- **Telephony compliance:** recording consent and call-disclosure laws vary by region. Use a test number and your own calendar. For Twilio, enable PSTN transfer if you demo transfers.
- **Pin versions:** livekit-agents (1.5.x+), pipecat-ai (1.x), smart-turn v3, OpenAI model ID (gpt-realtime-2.1 / gpt-live-1), Gemini Live model ID, Deepgram model (flux), ElevenLabs model ID, and the SIP provider config.
