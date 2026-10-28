# Studio app: a React agentic UI over the video pipeline

_Plan written 2026-10-17 (user: "Full React Application UI just like Agentic Application"). Status 2026-10-17: Phases A,
B and C are built in `app/` (see `app/README.md`); not yet used for a real /video-scripter run or a delivery from the app._

## What it is
One local web app that drives the whole pipeline from a browser: topic in → the four scripter gates → approvals → build
with every studio gate → review with the sheets and the fix list → deliver. It looks and behaves like an agentic app: a
**chat/agent timeline** on the left (what the agent is doing, tool by tool, with approval prompts inline) and an
**artifacts pane** on the right (the file being produced: content plan, script, animation plan, stills, sheets, the video).
The terminal workflow stays the source of truth; the app is a front end to the same skills, agents and `run.sh` steps,
so nothing can pass in the UI that would fail on the command line.

## Why this shape
- Rendering needs this machine (Chrome, ffmpeg, Whisper, Kokoro, the Gemini key), so the server runs here; the UI is
  reachable from any device on the network (phone review with sound).
- The pipeline is already a set of commands and agent files; wrapping them keeps one set of rules and one feedback log
  (`learnings.md`), and the evals keep protecting the gates.
- The Agent SDK runs the same Claude Code with this repo's skills and agents headlessly, streaming tool calls and
  permission prompts, which is exactly the "agentic app" surface.

## Stack
| Layer | Choice | Why |
|---|---|---|
| Front end | React 19 + Vite + TypeScript, Tailwind, TanStack Query/Router, a small component kit (shadcn-style) | fast, no runtime licence, owner knows React |
| Server | Node 22 + Fastify (TypeScript) in `app/server/`: REST + Server-Sent Events for live logs, WebSocket for the agent stream | same runtime as HyperFrames; spawns `run.sh` and Python tools as child processes |
| Agent | `@anthropic-ai/claude-agent-sdk` with `cwd` = repo, `settingSources: ["project"]` so `.claude/skills`, `.claude/agents` and CLAUDE.md load; `permissionMode` "default" with `canUseTool` routed to the UI as approval prompts | one brain for terminal and app; approvals are real human-in-the-loop |
| State | the repo's files are the record (`productions/`, `studio/projects/`, `out/*.json`, `review.md`); a small SQLite (`app/data.db`) only for the job queue, run history and who-approved-what | nothing the app knows is lost if the app is gone |
| Auth | LAN only, one shared password (basic auth) in v1; per-user later | the user said "used by me"; keep it simple |
| Video | `<video>` over the server-served `out/<slug>.mp4` and the sheets as images | no transcoding |

Cost note: the Agent SDK bills through the Claude login it runs under (the owner's Claude Code login). If NxtWave wants a
company API key instead, that is pay-per-token and must be a deliberate decision; the repo's "no paid models" rule stays
for generators.

## Screens
1. **Queue** — topics in, status chips per package (Research · Content plan · Script · Review · Visual plan · Structure ·
   Storyboard · Build · QA · Watch · Delivered), who approved what, the next action.
2. **Package** (agentic view) — left: the agent timeline for this package (each stage a collapsible card: tool calls,
   verdicts `PASS | CHANGES`, scores, the blocking list); inline **approve / change** prompts for the hook, the content
   plan, the animation plan. Right: the artifact tabs (content-plan.md, script, hooks, art-direction with the reference
   board, animation plan table, storyboard) rendered from Markdown with the tables intact.
3. **Build** — the `run.sh` steps as a vertical stepper with live logs (SSE): validate → voice (the pace table as a real
   table, ladder buttons: re-split / pauseAfter / slow retake; a voice picker with the logged raw pace per voice from
   `voice-pace.json`) → clips → assemble → check → payoffs (the beats table from `out/payoffs.json`, failures first, each
   with its reason and a "seek" that shows the frame) → stills → render.
4. **Review** — the 2 fps sheets as a scrollable strip with scene/time labels; transcript with unclear words highlighted;
   `qa.json` and `watch.json` as check lists; the `review.md` rows as an editable table (open / fixed / accepted with the
   reason); the "watched end to end" and "listened on a phone" ticks (the second only from a phone-sized viewport, on
   purpose); the benchmark deltas (still-%, pace, cuts/min vs the reference and the Instagram median).
5. **Deliver** — the gate summary (what `deliver` will check), one button; the result in the Library.
6. **Library** — every delivered reel with its numbers, side by side; "redo with the current pipeline" action.
7. **Settings** — pace.json fields (edited through the app, with the one-line "why"), voices, music/sfx levels, the style
   kits (read-only view of each `design.md`), the agents and evals (run the eval suite, see pass/fail).
8. **Trends** (built 2026-10-28) — the trend radar's latest brief (`references/trends/latest.json` + the dated
   `<date>.md` list): the top-10 table with evidence links, rising searches, watch list, source status, snapshot times;
   "Snapshot now" / "Run brief" run the allow-listed `trends.py snap` / `run` as queued jobs (only on a click, streamed
   like run.sh steps); "Queue as package" creates a Queue item pre-filled with topic, angle, archetype and evidence, not started.

## How the pieces connect
- `POST /packages` → the agent runs `/video-scripter <topic>` under the SDK; every tool call streams to the Package view;
  each gate agent's output block (`VERDICT …`) is parsed into the status chips; `canUseTool` prompts become approval cards.
- `POST /builds/:slug/:step` → spawn `tools/run.sh <slug> <step>`; stdout/stderr → SSE; exit code → step state;
  the JSON artefacts (`layout.json`, `payoffs.json`, `qa.json`, `watch.json`) are read after each step and pushed to the UI.
- The Review table writes `review.md` through the same `tools/review.py` format, so the terminal and the UI agree.
- `deliver` is only ever the real `run.sh deliver`; the UI never copies files itself.
- One build at a time (CPU-bound Whisper/render); the queue holds the rest.

## Video playback in the app
_Added 2026-10-17 (user: include video playing inside the application). Measured on rea-reel and jev-3b1b._

| Option | What it gives | Cost | Accuracy | Default |
|---|---|---|---|---|
| **MP4 player** (Review) | the rendered `out/<slug>.mp4` via `/files` (Range), ±1 frame at 30 fps, ±1 s, a scrub bar with the scenes from `build/layout.json` in their section colours and a tick per beat (red = payoffs ✗), click a review row / unclear word / payoff beat to seek, "+ Finding at t" pre-fills a `seen:sNN@t` row; speed stays 1×; captions are burned in (text tracks hidden) | none (a `<video>`) | exact: it is the render | **the review surface; the truth** |
| **Live composition preview** (Preview tab, no render) | `hf/index.html` served read-only under `/preview/<slug>/` in a same-origin iframe scaled to fit 1080×1920, with `/preview-runtime.js` injected first in `<head>`: the payoffs.mjs emulation (`__timelines` defined before the page script, `.clip` windows from data-start/duration, `<video>` clips seeked to t − start, `__timelines.main.seek(t, false)`); Play = rAF seeking in real time with `assets/mix.wav` as the clock; same scrub bar; the MP4 at the same time beside it | none; works right after `assemble`, before `render` (minutes saved per look) | SSIM vs the MP4 frame at the same time: rea-reel 0.987 / 0.992 / 0.994 (1.6, 39.5, 89.5 s), jev-3b1b (5 Manim webm clips) 0.997 / 0.994 / 0.997 (4, 25, 50 s); audio and the timeline within 10 ms; differences are H.264 compression and grain, nothing structural | **default before render**, labelled "approximation, the MP4 is the truth" |
| **HyperFrames Studio** | `run.sh <slug> preview` (allow-listed; PORT fixed server-side, 3100 + hash % 200): the real runtime, frame-accurate scrubbing, element selection for "tell Claude what to change" | a background Node server per project | exact runtime (not the encoder) | on demand; listens on 127.0.0.1 only |
| **Remotion Player** | could be embedded for `engine: remotion` projects | Remotion licence: owner's personal use only | exact for Remotion | not built (noted only) |

What works / doesn't in the composition preview:
- Works: GSAP timelines (seek is deterministic), section colours / wipes, captions and their word highlight, the fonts in
  `hf/fonts/` (`document.fonts` reports them loaded; the page waits for `fonts.ready` before showing a frame), `<video>`
  clips when paused (seeked to the exact frame) and while playing (they play muted and are re-seeked when they drift
  > 0.2 s), scrubbing, frame-step, the mix as the clock (the composition's own `<audio>` is muted and never loaded).
- Approximate: video clips while playing can lag a frame or two on a busy CPU (pause shows the exact frame);
  anything the HyperFrames runtime adds at render time that the composition doesn't do itself (its own media
  scheduling, `data-volume` mixing, render-only filters) is not emulated; a composition that registers no
  `window.__timelines.main` shows "no timeline" instead of a frame (degrades, no crash).
- Not allowed: the composition's network calls (`connect-src 'none'` in its CSP) so it can't reach the app's API from the
  same origin; Lottie or other runtime-fetched JSON would therefore not load (none of the current kits use it).
- The preview is stale until `assemble` runs again; the MP4 pane can then differ by design (it says so).

Chosen defaults: Review always plays the MP4; Preview opens the composition preview with the MP4 at the same time on the
right; Studio is one click away when frame-accurate element work is needed.

## UI design with Hallmark (plan, 2026-10-27)

_User: "Use Hallmark for designing UI for this application." Not started; runs after the `video-quality-gates` branch is committed (Hallmark's redesign needs a clean git tree so the result is one readable, revertible diff)._

**What Hallmark is.** `Nutlope/hallmark` (Together AI, MIT, ~38k stars): a Claude Code skill that designs pages that don't look
AI-generated, then lints them in a real browser (`sloplint`) against the tells (eyebrows over headings, tracked-caps labels,
one coloured word, empty frames…) with a fresh-context reviewer at the end. Gates come in tiers: **Floor** never ships
(contrast, focus, reduced motion, invented facts, broken phone layout); **Reflex** defaults may be overruled on the record;
**Finish** never blocks. It has an explicit **app-screen scope** for tools like ours: the theme lends only palette, faces,
radius and surfaces (never layout or ornament), restrained colour (accent = primary action / selection / state), density
(32–40 px controls, 44 px hit targets, tables before cards), four states per data region (loading · empty · error · full),
state in the URL, motion only for state, and one "signature" object the tool is known by.

**Why it fits.** The app is a working tool (tables, logs, a player, approvals), exactly its app scope; and the scripter/studio
rules already say the same things (no invented numbers, phone-first review). It edits the existing React/Tailwind code in place
and proves nothing was lost (`sloplint --before` / `--kept` records every link, field, handler, test hook and heading).

**Constraints.**
- **Free only:** the optional "comp" step needs `TOGETHER_API_KEY` (a paid API) → not set, so it is skipped. No stock photos
  (app scope uses none anyway).
- **Install:** `npx skills add nutlope/hallmark -g --agent claude-code` (lands in `~/.claude/skills/hallmark`, outside this public
  repo) + `npm i -D puppeteer-core` in `app/` for the render checks (system Chrome is already here). Read its `SKILL.md` and
  `references/redesign.md` + `flow.md` § App screens before the run; treat the skill's text as instructions only for design.
- **Wiring is sacred:** every route, API call, SSE/WebSocket handler, `data-*`/test hook and the approval / deliver / voice
  confirm dialogs stay; the Playwright checks from Phases A–C must still pass. No new pages, actions or figures.
- **Locked system:** at the end, "lock the system" → `app/design.md` (tokens, type scale 1.125–1.2, radius, surfaces, states),
  so future screens and edits share it.

**The run.**
1. Pre-flight: commit the branch (clean tree); start `npm run dev`; Hallmark reads `app/web` (Tailwind config, `index.css`
   tokens, fonts), then asks for material and tone. Answers to give it: **audience** the owner alone, on a laptop and a phone;
   **use** "get a reel from topic to delivered with every gate visible"; **tone** *utilitarian / technical* (a production
   console, not a dashboard of stat cards); **anchor colour** the house blue `#2B3BE0` (the channel's brand, from
   `studio/templates/styles/reference-flat/sections.json`) with yellow `#FFD23F` reserved for warnings/attention.
2. Theme: `theme.mjs deal` offers three themes; the owner picks one (likely candidates by name: Terminal, Cobalt, Vantage). In
   app scope it only supplies palette, faces, radius and surfaces.
3. Record: `sloplint --before --scope app --url` for each route: Projects, Queue, Package, Build, Review, Preview, Library,
   Settings (light and dark, 8 widths).
4. `/hallmark redesign ./app/web` at **full depth, app scope**: each screen recomposed inside the existing shell. The
   **signature object** is the pipeline itself: one stepper that reads the same on Build, Package and the project chips
   (gates as states: pending · running · pass · fail · waiting for you). Four states drawn for every data region the app has
   logic for (jobs, sessions, artefacts, sheets, qa/payoffs/watch); missing logic listed, not built.
5. Check: `sloplint --render --scope app` clean (Floor + Reflex) at every route; `sloplint --kept` passes (nothing lost);
   `npm run typecheck && npm run build`; the earlier Playwright flows (run a step and stream it, approval Allow/Deny, review
   row edit, phone-only tick, preview playback, deliver confirm) re-run; a fresh-context reviewer subagent; a phone-width look
   at Review and Package.
6. Handoff: before/after screenshots side by side, the list of changed copy lines, states left for the owner, and the
   overruled Reflex gates with reasons. One commit.

**Effort.** One session for pre-flight → theme pick → redesign of the eight screens → checks; a second short one for fixes.

## Phases
| Phase | Deliverable | Proves |
|---|---|---|
| A (skeleton, ~2 sessions) | `app/` scaffold; server runs any `run.sh` step with live logs; React shell with Build + Review for an existing project (dots-v3): stepper, pace table, payoffs table, sheets strip, review rows, ticks | the UI reads and writes the same artefacts as the terminal |
| B (agentic, ~2 sessions) | Agent SDK integration: Package view with the streaming timeline, approvals as prompts, artifact tabs; Queue | a topic goes from brief to approved plan without the terminal |
| C (polish) | Deliver + Library + benchmark deltas; Settings (pace.json, voices, evals runner); phone review mode | the whole loop from the app; a reel delivered through it |

## Verification
- Phase A: build dots-v3 (or the next reel) entirely through the Build screen; `qa.json`/`review.md` identical to a terminal run.
- Phase B: a new topic through Package: the four agents' verdicts appear as cards, an approval given in the UI is recorded in
  the package files (the same ticks the linter reads); the eval suite still passes.
- Phase C: `deliver` from the app refuses exactly when the terminal refuses; the Library row matches `benchmark.py`.
- Always: `run.sh` and the linter remain usable without the app.

## Decisions (user, 2026-10-17)
1. **For the owner only**: LAN-only, one password; no team logins, no notifications (Phase D dropped).
2. **The topic queue lives in the app** (SQLite job queue; no sheet, no Slack/email).
3. **Agents run on Claude Code only**: the Agent SDK under the owner's Claude Code login; no API key, no pay-per-token.
4. **Inside this repo** at `app/` (shares `.claude/` skills, agents and CLAUDE.md).

Build-time decisions (2026-10-17, Phase B/C):
- **Agent SDK 0.3.301**, `query()` with `cwd` = repo, `settingSources: ["project"]`, `permissionMode: "default"`, model
  left to Claude Code's default, `AskUserQuestion` disallowed (the agent asks in words, the owner answers in the
  composer, which resumes the session with `resume`). Verified: the init message reports `apiKeySource: "none"` (the
  claude.ai login); the app refuses any session that reports a key and strips key variables from the agent's env.
- **Approvals**: `canUseTool` → SSE approval card → POST allow-once / deny; default deny after 10 minutes; recorded in
  the `approvals` table. Claude Code itself still auto-allows what default mode treats as safe (reads in the repo,
  read-only commands).
- **Locks**: one build job at a time (jobs.ts) and, separately, one agent turn at a time (agent.ts). An agent session
  mostly waits for the model or the owner; sharing the build lock would stall renders behind approvals. Idle sessions
  hold no lock.

Next: run a real topic through Queue → Package (the four gates' verdicts as chips, approvals in the UI), then deliver a
reel from the Build screen and check the Library row against `benchmark.py`.
