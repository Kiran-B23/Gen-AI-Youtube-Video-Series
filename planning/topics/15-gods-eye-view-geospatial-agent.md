# 15. AI-built geospatial "God's Eye View" apps + an agent layer

> **Rank:** 15 of 18 (new addition, suggested priority #6) · **Difficulty:** Medium · **YouTube upside:** Very high for clicks (visual, "spy satellite" framing, newsjacking) · **Build time:** 4–6 days (fork + feed + MCP/agent layer), plus 1 day for the voice loop and b-roll

## 1. Overview
God's Eye View (formerly "WorldView") is Bilawal Sidhu's "spy satellite simulator in your browser, except the data is real." It puts live public data on a photorealistic 3D globe: aircraft (OpenSky + adsb.lol, "11,000+ live aircraft"), ships (AISStream), satellites (CelesTrak), USGS earthquakes, NASA FIRMS fires, weather, transit, ~3,600 public CCTV feeds projected into 3D, and radio. On top of that sits a hands-free voice agent. The stack is vanilla JavaScript + **CesiumJS** + **Vite**, with **Google Photorealistic 3D Tiles** for the planet and the **OpenAI Realtime API** for voice. The README lists **29 voice tools** (`src/voice/`), and all keys stay server-side behind a local proxy. It was open-sourced under **MIT** on **Aug 24, 2026**. It hit 8,258 stars by Aug 28 (explainx), reached **#1 on GitHub Trending (daily and weekly, August 2026)**, and had **44.8k stars / 9.1k forks** on Sept 29 (GitHub API). It is **#2 on Trendshift's monthly list (+6.3k this month)**. The README claims "5M+ on YouTube" and "25M+ across socials" for the original series. The app starts **without API keys**: 17 of 19 layers/map sources have a keyless path. Photoreal 3D needs a Cesium ion token (free for personal, non-commercial use) or a metered Google Maps key. Voice needs an OpenAI key, with a $2 warning and a $5 hard cap per session. **Key caveats:** it is exploratory and "not a hardened production service". The data "may be delayed, incomplete, modeled, inferred, or wrong". Several datasets are non-commercial (OpenSky, TeleGeography, the Cesium ion free tier). The maintainers won't merge named-person search, face recognition or individual tracking ("People are not a query type here").

## 2. Why it attracts subscribers
- **Audience:** Developers and makers who saw the viral clips and want to *own* one: JS/web devs, GIS/OSINT hobbyists, agent builders looking for a visual MCP demo, and the wider "AI builds cool stuff" audience that clicks on spy/Palantir framing.
- **Competition gap:** Most videos are "self-host it" or install guides (GENZ TECH, Prism Labs, TheAIHobbyGuy, Shubham Cyber Security, Alex Hitt, Tech Flantic), reaction/explainers (Matt Wolfe, Codedigipt, Cyberbaddie), or Bilawal's own series. A few customize it (Virtual Nerds' OSINT conflict map, American Nexus's own build). None of the ones found expose the layers as **tools/MCP** so that an **external LLM agent** can query, reason over and narrate the data. The built-in voice agent is OpenAI-only (the README says "Want Gemini or another provider behind the mic? PRs welcome"). There's also no "build a feature with a coding agent on camera" video tied to its layer interface.
- **Winning angle:** "I built a voice-controlled AI spy satellite for my city." Keep the spectacle, but the substance is the agent layer. Your city's own feed becomes a layer, every layer becomes an MCP tool, and any agent (Claude/GPT/local) can answer "what's flying over my house and why?" while narrating in voice. Close with an honest privacy segment on what public data can and can't reveal.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Built a Voice-Controlled AI Spy Satellite for My City | Full build | 20–25 min |
| 2 | I Turned God's Eye View Into an MCP Server (Any AI Can Now "See" the Planet) | Full build (mini) | 12–15 min |
| 3 | I Let a Coding Agent Add a New Live Layer to God's Eye View | Agent-builds-it challenge | 12–15 min |
| 4 | Is This Legal? What "Public Data" Spy Globes Can Really See | Explainer / ethics | 8–10 min |
| 5 | Ask the Planet: "What's Flying Over Me Right Now?" | Short | <60 s |

**Thumbnail / hook:** Night-vision 3D view of your city with aircraft/ship boxes drawn in, a speech bubble reading "What's that helicopter doing?", and a terminal overlay showing an MCP tool call. **Hook (first 15 s):** "This open-source spy globe went #1 on GitHub. Out of the box it's a beautiful viewer. I gave it a brain: my city's live data, an AI agent that can query every layer, and a voice I can just talk to. Here's everything it can see, and the things it deliberately won't."

## 4. Project build plan
**Project:** *"I built a voice-controlled AI spy satellite for my city": God's Eye View fork + local data layer + MCP tool server + LLM agent + voice loop.*
**Stack:** Fork of `bilawalsidhu/gods-eye-view` (Node 24.14+ or 26.x, Vite, CesiumJS), Cesium ion free token (personal/non-commercial) or a restricted Google Maps key, an OpenSky OAuth client (optional, for more credits), `@modelcontextprotocol/sdk` (TypeScript) for the tool server, an LLM with tool calling (Claude via Claude Code/Agent SDK, or OpenAI), the repo's existing OpenAI Realtime voice session (or your own voice stack from file 10), and a coding agent (Claude Code/Codex) for the on-camera build segment.
**Steps:**
1. Fork and run it: `npm ci && npm run doctor && npm run dev` → `http://localhost:4173`. Start keyless, then add a Cesium ion token for photoreal 3D. Read `docs/CURRENT-STATE.md` first, as `CONTRIBUTING.md` says to.
2. Pick your city and a local feed not already in the app, such as a city open-data API, a GTFS-Realtime transit feed or air-quality sensors. Confirm its license first.
3. Add the feed as a layer by copying an existing layer factory in `src/layers/<family>/`. It must implement the layer interface (`init/enable/disable/update/destroy/getStats`). Proxy any keyed request through `server/providers/` so the key never reaches the browser.
4. **Coding-agent segment:** give Claude Code/Codex the layer interface + `CONTRIBUTING.md` + the feed's docs and have it write the new layer on camera. Time it, count the corrections, and keep the failures in the edit.
5. Expose layers as tools: write a small MCP server (TS SDK) that wraps the app's server-side data (or its proxy endpoints). Suggested tools: `flights_in_bbox`, `nearest_aircraft(lat,lon)`, `vessels_near`, `quakes_last_24h`, `satellite_next_pass`, `my_city_feed_query`, `fly_camera_to(place)`. Return provenance + staleness on every result, following the README's "answers say when a feed is stale".
6. Add the LLM agent: connect Claude (or GPT) to the MCP server and give it a system prompt that tells it to narrate like an analyst, cite the feed and timestamp, and refuse person-level queries. Test it on multi-step questions such as "Which aircraft over the city is lowest, and is there a camera near it?"
7. Close the loop back to the globe: have the agent's `fly_camera_to`/`track` tool calls drive the Cesium view, following the pattern in `src/voice/gevActions.js`.
8. Voice loop: either extend the built-in Realtime session with 2–3 new tools (`src/voice/actionSchemas.js` + `server/providers/openai/tools.js`), or put your own speech-to-text → agent → text-to-speech loop in front of the MCP agent (file 10). Keep the $5 session cap on.
9. Privacy pass: blur or avoid showing live CCTV frames of people on camera, keep ALPR locations as locations only, and don't track private individuals. Script a short explainer on what ADS-B/AIS is and why it's broadcast publicly.
10. Measure and film: tool-call latency, voice round-trip, OpenSky credits used, and $ per session. Record a 60-second "ask the planet" short.

**Demo moments:** Say "Take me to my city and show me every aircraft below 3,000 ft". The globe flies there, the agent calls `flights_in_bbox`, and it narrates. Your local feed pops onto the globe as a new layer that the coding agent wrote live. The agent chains tools ("nearest camera to that vessel") and says when data is stale. A refusal moment: ask it to track a specific person and it declines, citing the project's line. End with a split screen: the same question answered by Claude via MCP vs the built-in OpenAI voice agent.
**On-screen numbers:** Stars/trending (44.8k, #1 GitHub Trending Aug 2026, Trendshift monthly #2), the number of live contacts in your bbox, tool-call latency (p50), voice round-trip time, OpenSky credits per query (1–4 depending on area) against the daily quota (400 anonymous / 4,000 standard), OpenAI $ per session against the $5 cap, and coding-agent build time + number of fixes.

## 5. Resources
### Official docs & specs
- [CesiumJS reference docs](https://cesium.com/learn/cesiumjs/ref-doc/) · [CesiumJS Quickstart](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/) · [Sandcastle](https://sandcastle.cesium.com/) — globe engine the app is built on
- [CesiumJS: Photorealistic 3D Tiles from Google Maps Platform](https://cesium.com/learn/cesiumjs-learn/cesiumjs-photorealistic-3d-tiles/) — Cesium's tutorial for the exact tileset the app uses
- [Cesium ion pricing / plans](https://cesium.com/platform/cesium-ion/pricing/) — free Community plan eligibility (personal, non-commercial)
- [Google Photorealistic 3D Tiles (Map Tiles API)](https://developers.google.com/maps/documentation/tile/3d-tiles) — root tileset `tile.googleapis.com/v1/3dtiles/root.json`; one root request ≈ 3 hours of tile requests; CesiumJS ≥1.91 for attribution (fetched)
- [Map Tiles API policies](https://developers.google.com/maps/documentation/tile/policies) · [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
- [OpenSky REST API docs](https://openskynetwork.github.io/opensky-api/rest.html) — `/states/all` with `lamin/lomin/lamax/lomax`; OAuth2 client credentials; 400 credits/day anonymous, 4,000 standard (fetched)
- [OpenSky data/API page](https://opensky-network.org/data/api) · [OpenSky terms of use](https://opensky-network.org/about/terms-of-use) (unverified — 403 to fetch; the repo's DATA_SOURCES.md describes the license as non-commercial research/education)
- [AISStream documentation](https://aisstream.io/documentation) — WebSocket AIS feed (free key)
- [CelesTrak GP data formats](https://celestrak.org/NORAD/documentation/gp-data-formats.php) · [CelesTrak current GP element sets](https://celestrak.org/NORAD/elements/)
- [USGS GeoJSON earthquake feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) · [NASA FIRMS API](https://firms.modaps.eosdis.nasa.gov/api/) · [adsb.lol API](https://api.adsb.lol/docs) · [Launch Library 2 docs](https://ll.thespacedevs.com/docs/)
- [OpenAI Realtime guide](https://platform.openai.com/docs/guides/realtime) · [OpenAI Realtime + MCP guide](https://platform.openai.com/docs/guides/realtime-mcp) (unverified content — JS-rendered pages; both returned 200)
- [Model Context Protocol intro](https://modelcontextprotocol.io/docs/getting-started/intro) · [MCP specification (latest)](https://modelcontextprotocol.io/specification/latest) — see file 03

### Articles & blog posts
- [explainx.ai: God's Eye View open-source spy satellite simulator (Aug 2026)](https://explainx.ai/blog/gods-eye-view-open-source-spy-satellite-simulator-august-2026) — Aug 24 release; 8,258 stars / 1,843 forks by Aug 28; says "28-tool voice agent" (README now says 29) (fetched)
- [Firmatic: God's Eye View open source](https://firmatic.nl/en/blog/gods-eye-view-open-source/) — 4,600 stars in 2 days; "2,601 unit tests"; single 7,383-line dev server; no Google key = black planet; built a keyless variant (fetched)
- [KBS Sidhu (Substack): The planet in one browser tab](https://kbssidhu.substack.com/p/the-planet-in-one-browser-tab-bilawal) — Aug 25; written by Bilawal's father (disclosed); background + viewer concerns about surveillance (fetched)
- [Medium/Codex: God's Eye View is now open source, here's what I found](https://medium.com/codex/gods-eye-view-is-now-open-source-here-s-what-i-found-740c053ed189) (unverified — 403 on fetch)
- [Map the World (Bilawal Sidhu's Substack)](https://maptheworld.ai/) — "the newsletter behind the project" per the README
- [Product Hunt: God's Eye View](https://www.producthunt.com/products/god-s-eye-view) — #8 Product of the Day per the README
- [Pinokio: God's Eye View app](https://pinokio.co/apps/github-com-bilawalsidhu-gods-eye-view) — one-click installer (needs Pinokio 8.2+)
- [Trendshift monthly](https://trendshift.io/monthly) — #2 monthly, +6.3k (fetched Sept 29; Trendshift's star count lags GitHub)
- [OSSInsight: gods-eye-view](https://ossinsight.io/analyze/bilawalsidhu/gods-eye-view) · [Star History](https://star-history.com/#bilawalsidhu/gods-eye-view&Date) — for an on-screen star-growth chart

### GitHub repos & templates
- [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) — the app (MIT; 44.8k stars; releases v0.1.0 Aug 31, v0.1.1 Sept 1) (fetched)
- [CONTRIBUTING.md](https://github.com/bilawalsidhu/gods-eye-view/blob/main/CONTRIBUTING.md) — layer interface, where the voice tools live (`src/voice/actionSchemas.js`, `server/providers/openai/tools.js`, `src/voice/gevActions.js`)
- [DATA_SOURCES.md](https://github.com/bilawalsidhu/gods-eye-view/blob/main/DATA_SOURCES.md) — per-dataset licenses (OpenSky non-commercial, TeleGeography CC BY-NC-SA, Google no-caching) · [SECURITY.md](https://github.com/bilawalsidhu/gods-eye-view/blob/main/SECURITY.md) — LAN-sharing threat model
- [CesiumGS/cesium](https://github.com/CesiumGS/cesium) — CesiumJS source (Apache-2.0)
- [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) · [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — for the tool server

### YouTube videos (study / beat these)
- [We Got Open Source God's Eye Before GTA 6](https://www.youtube.com/watch?v=GRJaKcXZS94) — Bilawal Sidhu · the official walkthrough linked from the README
- [God's Eye View Blew Up. Here's What You Can Do With It.](https://www.youtube.com/watch?v=o_FJ1NIH9yw) — Bilawal Sidhu · follow-up on what to build
- [Ex-Google Maps PM Vibe Coded Palantir In a Weekend](https://www.youtube.com/watch?v=rXvU7bPJ8n4) — Bilawal Sidhu · the original viral "WorldView" build
- [Ex-Google PM Builds God's Eye to Monitor Iran in 4D](https://www.youtube.com/watch?v=0p8o7AeHDzg) · [Ex-Google PM Uses God's Eye to Reveal Iran's Chokehold on the World's Oil](https://www.youtube.com/watch?v=ccZzOGnT4Cg) — Bilawal Sidhu · series episodes ([full playlist](https://youtube.com/playlist?list=PL6qSg2I-7_koPbDnSMo0QeeHX_RknA2uv))
- [Bilawal Sidhu on Building God's Eye View](https://www.youtube.com/watch?v=NR_GMq2lDCE) — Riley Brown · interview, useful for backstory
- [He Built The Ultimate Spy Tool (Free and Open-Source)](https://www.youtube.com/watch?v=S2VJU5DQqlU) — Matt Wolfe · big-channel reaction/overview
- [God's Eye View Setup: Self-Host a Live 3D Spy Globe (Free & Open Source)](https://www.youtube.com/watch?v=XrRCt9QV9KI) — GENZ TECH · self-host tutorial (the typical format)
- [God's Eye View: 13 Live Spy Layers on a Free 3D Globe](https://www.youtube.com/watch?v=rXEDx5sd3H4) — Prism Labs · layer tour
- [I Customized Bilawal Sidhu's God's Eye View – Here's My OSINT Conflict Map](https://www.youtube.com/watch?v=71gfDc3GJsY) — Virtual Nerds · closest competitor (customization, no agent layer seen in title)
- [I Built God's Eye View System using Open Source OSINT!](https://www.youtube.com/watch?v=6hutaXj1k54) — American Nexus · rebuild angle
- Also: [God's Eye View FREE Install — Skip Pinokio & Protect Your Setup](https://www.youtube.com/watch?v=6VjSpRPDleg) (TheAIHobbyGuy | Get Going Fast), [God's Eye View isn't just a spy tool](https://www.youtube.com/watch?v=Lnt87XxNKJo) (Kaya Rezende), [God's Eye View Blew Up: Here's Our Honest Review](https://www.youtube.com/watch?v=W23GVKvjLNc) (ZigNet AI), [Google Photorealistic 3D Tiles in Cesium ion](https://www.youtube.com/watch?v=TZxFovugAbU) (Cesium, official), [How To Test Canvas Based Applications with AI Agents (Cesium + MCP)](https://www.youtube.com/watch?v=7TUN5mGIc-k) (Life at FlytBase; related Cesium + MCP pattern)
- **Notable channels:** Bilawal Sidhu, Matt Wolfe, Riley Brown, Prism Labs, Virtual Nerds. (Titles and channel names were verified through YouTube oEmbed; the videos weren't watched, so the notes come from titles.)

### Tools & install
```bash
git clone https://github.com/bilawalsidhu/gods-eye-view.git && cd gods-eye-view
npm ci && npm run doctor && npm run dev          # Node 24.14+ or 26.x; opens http://localhost:4173
OPENAI_API_KEY="…" AISSTREAM_API_KEY="…" npm run dev -- --host localhost --port 4173   # optional keys via env
# OPENSKY_AUTH_MODE=anon                         # keyless flights; or import OAuth creds:
# ./scripts/opensky-import-client.sh /path/to/credentials.json
npm i @modelcontextprotocol/sdk                  # for your MCP tool server
```

### Not found — search for:
- An existing God's Eye View **MCP server / agent fork**: none found in the YouTube searches. Search GitHub `gods-eye-view mcp` and `cesium mcp server` before claiming "first".
- The contents of the Medium/Codex "here's what I found" article (403): open it in a browser.
- An independent source for "5M+ YouTube views" (a README claim): check the [playlist](https://youtube.com/playlist?list=PL6qSg2I-7_koPbDnSMo0QeeHX_RknA2uv) view counts on filming day.
- A Hacker News launch thread for the open-source release: search `hn.algolia.com God's Eye View`.
- OpenSky's current commercial/operational terms: open the [terms page](https://opensky-network.org/about/terms-of-use) in a browser (it blocked the fetch).

## 6. Caveats & fact-checks before filming
- **Star/trending numbers move daily.** 8,258 by Aug 28 (explainx), 4,600 in 2 days (Firmatic), 44.8k on Sept 29 (GitHub API). Trendshift shows a lagging 30.2k beside its monthly #2 (+6.3k). Show a dated screenshot.
- **Repo dates:** the GitHub repo was *created* June 22, 2026 and made public/open-sourced Aug 24. Don't say "built in 4 days".
- **Tool/layer counts changed after launch:** explainx says 28 voice tools and 13 layers (10 keyless). The current README says **29 tools** and **19 layers/map sources (17 keyless)**. Quote the README on filming day.
- **License nuance:** the code is MIT (the LICENSE file was checked), but GitHub's API reports `NOASSERTION` because bundled datasets carry their own terms. OpenSky is non-commercial and may need a written agreement for operational use. TeleGeography is CC BY-NC-SA. The Cesium ion free tier is personal/non-commercial only. Google tiles may not be cached or rehosted. Don't monetize a hosted fork without checking these.
- **Costs:** Google's direct route needs billing enabled (README: first 1,000 3D Tiles sessions/month free "currently"). OpenAI Realtime is "a few cents per active minute" per the README. Keep the $5 cap on and restrict the browser-visible Google/ion keys.
- **Privacy/ethics (say it on camera):** ADS-B and AIS are public broadcasts, and the CCTV feeds are published city/DOT cameras. Aggregating them still raises concerns (surveillance comments are covered in the KBS Sidhu piece). Camera frames can contain people and plates, and nothing blurs them. Some aircraft deliberately limit their broadcast, so don't try to de-anonymize them. Follow the project's line: no named-person search, face recognition or individual tracking.
- **Not for navigation/safety:** the README says data may be "delayed, incomplete, modeled, inferred, or wrong". Traffic is simulated, and Space Missions is labeled `RECONSTRUCTED ESTIMATE`.
- **LAN exposure:** binding to `0.0.0.0` "brokers your configured API keys to anyone who can reach it". Don't stream a LAN-shared instance.
- **Media reuse:** the README's GIFs "aren't licensed for standalone reuse". Record your own footage and keep the Google/Cesium attribution visible.
- **Pin versions:** `gods-eye-view` at a specific commit or tag (v0.1.1 was the latest release at research time; `main` moves daily), Node 24.14.x, the CesiumJS version in its `package.json`, the exact `@modelcontextprotocol/sdk` version, and the OpenAI Realtime model (STD vs MINI). Show the filming date on screen.
