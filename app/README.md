# Studio app (Phases A–C)

A web UI over the studio pipeline, for the owner only: **Build** runs the `studio/tools/run.sh` steps with live logs,
**Preview** shows the composition before any render, **Review** holds the render with review tools, the 2 fps sheets,
the gates and the editable fix list (`review.md`), **Queue** + **Package** run the video-scripter agent (Claude Agent SDK)
with approval cards, **Library** lists what was delivered, **Settings** edits `pace.json` and runs the linter evals.
Plan and decisions are in [`docs/studio-app-plan.md`](../docs/studio-app-plan.md).

The terminal stays the source of truth. The app never writes pipeline state of its own:
- every build step is `bash studio/tools/run.sh <slug> <step>`, spawned as a plain argv (no shell);
- the fix list is edited line by line in exactly the format `studio/tools/review.py` writes, and then
  `review.py <slug> --check` re-validates it (its output is shown under the table);
- the only other files it writes: `scenes.json` voice knobs (voice.minPause, voice.name, per-scene pad / pauseAfter;
  validate runs after each save) and `studio/templates/reel/pace.json` (with a required "why" appended to its note);
- `app/data.db` (SQLite) holds the job queue + logs, and the agent queue, sessions, messages and approvals.

## Run it
```bash
cd app
cp .env.example .env        # set APP_PASSWORD (8+ characters); app/.env is git-ignored
npm install                 # once (Node 22: export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH")
npm run build               # server → server/dist, web → web/dist
npm start                   # http://<this-pc>:4310 (any user name + the password)
npm run dev                 # dev: server on :4310 (tsx watch) + Vite on :5173 with /api and /files proxied
npm run typecheck           # both packages
```
Open it from a phone on the same network to review with sound. The "Listened on a phone" tick is enabled only on a
phone-sized screen, and the server refuses it from a wider one. The agent needs the owner's Claude Code login on this
machine (`claude /login` once; nothing else to configure).

## Screens
- **Projects**: one card per `studio/projects/<slug>` with chips: voice, payoffs (✗ n / stale when `hf/` changed since),
  qa n/14 (stale when the MP4 changed since), open rows, watched, delivered (or "older" when `shorts/` holds a different MP4).
- **Build**: the stepper validate → voice → clips → assemble → check → payoffs → render → qa → watch → review, plus stills,
  benchmark, Studio preview and deliver. Each step has a Run button and its log streams inline over SSE with the exit
  status. The right pane shows that step's artefact: the pace table for voice plus the **pace ladder** form (1: "Re-split
  the saved take (free)" = RESPLIT=1; voice.minPause sentence/comma; 2: per-scene pad and pauseAfter, flagged scenes first;
  the voice picker shows each Gemini voice's logged raw pace from `studio/voice-pace.json`; saving writes scenes.json and
  queues validate), the payoffs beats, qa checks, watch gates, the benchmark, and for **deliver** what `deliver_check.py`
  and `review.py --check` say right now (read-only), repeated inside the confirm before the real `run.sh <slug> deliver`.
- **Preview** (before render): the live composition preview, HyperFrames Studio, and the MP4 at the same time. See below.
- **Review**: the MP4 player with review tools, the sheets strip (12 s each, click to enlarge), the transcript with unclear
  words marked, qa + watch + payoffs + benchmark, and `review.md` as an editable table (status open / fixed / accepted +
  reason, "add a finding") with the two sign-off ticks. Click a row's time, an unclear word or a payoff beat's time to seek.
- **Queue**: new package (topic, format reel, notes → `/video-scripter <topic>` + the notes) or "Ask the agent" (a free
  question, optionally showing a package folder's artifacts), start / stop / open / remove, the package folder once the
  agent writes it, and every `productions/*` folder with its gate chips (from the ticks and VERDICT lines in the files).
- **Package**: left the agent timeline (a card per tool call with its input and result, subagent calls nested under their
  Agent card, VERDICT chips, approval cards inline with Allow once / Deny, a composer whose reply resumes the session);
  right the package's Markdown as tabs (content-plan, script, script-review, hooks, art-direction, animation-plan,
  storyboard, publish, qa, then the rest), re-rendered when a file changes (fs.watch → SSE).
- **Library**: `shorts/*.mp4` matched to projects with qa and benchmark numbers side by side (plus the reference reel and
  the Instagram median rows); click a thumbnail to play the delivered file.
- **Trends**: the trend radar's latest brief (`references/trends/latest.json` + the dated `<date>.md` list, from
  `studio/tools/trends.py`): snapshot times, the top-10 table with evidence links, rising searches, watch list, source
  status, per-source top 5. "Snapshot now" / "Run brief" queue `trends.py snap` / `run` (allow-listed, on the build
  queue, one at a time, only on a click; the log streams like a step). "Queue as package" creates a Queue item with the
  topic, angle, archetype and evidence in its notes and does **not** start the agent.
- **Settings**: `pace.json` (each field's meaning and which tool reads it; numbers range-checked and cross-checked, a
  one-line "why" is required and appended to the `_` note with the date), Run evals (the linter on each
  `evals/fixtures/*`, compared with the ✗ counts `evals/README.md` expects), the style kits' `design.md` and the four
  agents, read-only. Light / dark / system toggle in the sidebar.

## Video in the app
- **MP4 player** (Review): `/files` serves the render with Range requests. Play / pause, ±1 frame at 30 fps (keys ← → or
  , .), ±1 s, a scrub bar with the scenes from `build/layout.json` in their section colours and a tick per beat (red when
  payoffs failed it), hover for time + scene + beat. Speed stays 1× unless changed. Captions are burned in, so any text
  track is hidden. "+ Finding at 12.3s · s04" fills the add-row (`seen:s04@12.3`, time, scene) and focuses the finding.
- **Composition preview** (Preview, no render): `hf/` is served read-only under `/preview/<slug>/` and
  `/preview-runtime.js` is injected first in `<head>` (the file on disk is never changed). The runtime does what
  `tools/payoffs.mjs` does: `window.__timelines ||= {}`, `.clip` elements hidden outside `[data-start, +duration)`,
  `<video>` clips seeked to t − start (playing muted, re-synced when they drift > 0.2 s), and
  `__timelines.main.seek(t, false)`. Play steps the seek every animation frame with `assets/mix.wav` as the clock (the
  wall clock if the mix is missing). The page carries a CSP with `connect-src 'none'`, so a composition can't call the app's
  API. The UI says it is an approximation; the MP4 is the truth. Measured against rea-reel's MP4: SSIM 0.987–0.994 at
  1.6 / 39.5 / 89.5 s, and 0.994–0.997 on jev-3b1b (Manim webm clips) at 4 / 25 / 50 s.
- **HyperFrames Studio**: "Start Studio" runs the allow-listed `run.sh <slug> preview` with `PORT` fixed server-side
  (3100 + hash(slug) % 200). The real runtime, frame-accurate, with element selection. It listens on 127.0.0.1 only (open
  it on this PC, or `ssh -L`), keeps running after the step ends; stop it with
  `npx hyperframes preview studio/projects/<slug>/hf --stop`.
- **Remotion**: for `engine: remotion` projects the Remotion Player could be embedded later (the owner's personal use
  only, per the licence note in CLAUDE.md); it is not built.

## Agent (Phase B)
- `@anthropic-ai/claude-agent-sdk` 0.3.301 (`query()`), which runs its bundled Claude Code (2.1.301) with `cwd` = the repo,
  `settingSources: ["project"]` (so `.claude/skills`, `.claude/agents` and CLAUDE.md load), `permissionMode: "default"`,
  the model left to Claude Code's default, `disallowedTools: ["AskUserQuestion"]` (the agent asks in words).
- **Auth: the owner's Claude Code login, no API key.** The app strips `ANTHROPIC_API_KEY` / `ANTHROPIC_AUTH_TOKEN` /
  Bedrock / Vertex switches from the agent's environment, and refuses the session if the CLI's init message reports any
  `apiKeySource` other than `none` (= claude.ai login).
- **Approvals**: `canUseTool` → an approval card (tool, a one-line summary, the reason Claude Code gives, the full input)
  over SSE; POST `/api/approvals/:id` allow (once) or deny; **denied by default after 10 minutes**; stopping the session or
  a server restart expires it. Every decision is kept in the `approvals` table (who/when). Claude Code still auto-allows
  what its default mode treats as safe (reads inside the repo, read-only commands such as `ls` or `sleep`); writes,
  edits, network and other commands ask.
- **Follow-ups**: a reply queues a new `query()` with `resume: <sdk session id>`, so the conversation continues
  ("Approve, hook A"). A session is `queued → running → idle` (waiting for you) and can be stopped (abort) at any time.
- **Lock: one agent turn at a time, separate from the build queue.** A session spends most of its life waiting for the
  model or for the owner, and it must not block a render (or wait behind one). Idle sessions hold no lock. The agent can
  still run cheap commands itself (lint_package.py) through approvals.
- **Gates**: `VERDICT: PASS | CHANGES | READY | NEEDS RESEARCH` and its `scores:` / `depth:` line are parsed from text and
  tool results (attributed to the Agent call's `subagent_type`), and the package files' ticks ("Script review passed",
  "Visual plan passed", "Structure check passed", qa.md) become the chips.

## API (all behind the password)
| | |
|---|---|
| `GET /api/projects` · `GET /api/projects/:slug` | artefacts, freshness, pace table, timeline (scenes, sections, beats), qa / payoffs / watch / benchmark, review rows, sheets, last job per step, preview port |
| `POST /api/projects/:slug/steps/:step` | queue a step; body `{confirm: true}` for voice / render / deliver, `{flags: ["resplit" or "retake"]}` for voice |
| `GET /api/projects/:slug/deliver-check` | `deliver_check.py` + `review.py --check` output (read-only) |
| `PATCH /api/projects/:slug/voice` · `GET /api/voices` | `{minPause, voiceName, scenes: {sNN: {pad, pauseAfter}}}` → scenes.json, then validate is queued · voices + logged raw pace |
| `GET /api/jobs` · `GET /api/jobs/:id` · `POST /api/jobs/:id/cancel` · `GET /api/jobs/:id/stream` | history, cancel, SSE log |
| `PATCH /api/projects/:slug/review` | `{op: "row", id, status, reason}` · `{op: "tick", which, checked}` · `{op: "add", id, time, scene, finding}` |
| `GET/POST /api/packages` · `GET/DELETE /api/packages/:id` · `POST /api/packages/:id/start\|stop` | the agent queue (`{kind: "package"\|"ask", topic, format, notes, folder?, start?}`) |
| `POST /api/sessions/:id/messages` · `GET /api/sessions/:id/stream` · `POST /api/approvals/:id` | reply (resume), SSE timeline, `{decision: "allow"\|"deny"}` |
| `GET /api/productions` · `/:folder` · `/:folder/files/:name` · `/:folder/events` | package folders, their Markdown, change feed (SSE) |
| `GET /api/trends` · `GET /api/trends/briefs/:date` · `POST /api/trends/jobs/snap\|run` | latest.json + brief/snapshot lists + last jobs · one dated brief (Markdown) · queue a trends.py job (409 while one is queued or running) |
| `GET /api/library` · `GET /shorts/:name` | delivered reels + numbers · the delivered MP4 |
| `GET/PUT /api/settings/pace` · `GET /api/settings/styles\|agents` · `GET/POST /api/settings/evals` | pace.json, read-only docs, linter evals |
| `GET /files/:slug/<path>` · `GET /preview/:slug/<path>` · `GET /preview-runtime.js` | `out/` only · `hf/` only (read-only, runtime injected into HTML) |

## Security
- **LAN only, one password.** It binds `0.0.0.0:4310` (set `APP_HOST=127.0.0.1` to keep it on this machine). HTTP basic
  auth with the password from `app/.env`, compared in constant time; it refuses to start without one. Basic auth over
  plain HTTP is readable on the network: trusted network only, never port-forward it.
- **Allow-listed steps only.** Only these `run.sh` steps can run: validate, voice, clips, assemble, check, payoffs, stills,
  render, qa, watch, review, benchmark, preview, deliver. The slug must match `[a-z0-9-]` and an existing project, the env
  switches are fixed server-side (RESPLIT / RETAKE for voice, PORT for preview), and nothing from the request reaches a
  shell. `new` and `remotion*` are not exposed. The trend radar adds exactly two more: `python studio/tools/trends.py snap`
  and `… run` (argv only, cwd = the repo), on the same one-at-a-time queue.
- **The agent** is Claude Code under its own permission system: the app only answers its permission prompts (never
  `bypassPermissions`), with a 10-minute default deny. It gets the repo's project settings only (not `~/.claude` user
  settings or user-scope MCP servers).
- **One build job at a time** across all projects (Whisper and render are CPU-bound); **one agent turn at a time**.
  After a restart, a running job / turn is marked `interrupted` and queued ones continue.
- **Files**: `/files` serves only that project's `out/`, `/preview` only its `hf/` (with `X-Frame-Options: SAMEORIGIN` and a
  CSP with `connect-src 'none'`), `/shorts` only top-level `shorts/*.mp4`, `/api/productions` only `productions/<date>-<slug>/*.md`.
  All reject `..`, dot-files and paths that resolve outside (symlinks too), with an extension allow-list.
- No paid APIs: the only request that costs anything is the pipeline's own `voice` step (Gemini TTS), which asks first.
  The agent runs on the Claude Code login (subscription usage), never on a key.

## Layout
`server/` Fastify + TypeScript: `index.ts` routes and auth, `db.ts` SQLite, `jobs.ts` build queue, `steps.ts` the
allow-list, `projects.ts` artefact views + timeline + library, `pace.ts` pace table, `review.ts` review.md editor,
`scenes.ts` the voice knobs in scenes.json, `preview.ts` `/preview` + the injected runtime, `agent.ts` Agent SDK sessions +
approvals, `productions.ts` package folders + fs watch, `settings.ts` pace.json / docs / evals / deliver pre-check ·
`web/` React 19 + Vite + Tailwind 4 + TanStack Query + React Router + react-markdown (remark-gfm) · `legacy/` the earlier
`claude -p` scripter runner (unchanged apart from its repo path).
