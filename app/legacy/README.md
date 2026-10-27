# Video Studio app (local)

A local web UI for starting new videos. Type a topic and it runs `/video-scripter` through headless
Claude Code (`claude -p`). It streams what Claude is doing and shows the package files
(`productions/<date>-<slug>/`) as they're written. When the skill stops for a decision (the animation-plan
approval at step 5c, or an A/B/C pick), type your reply in the box and the same session continues
(`--resume`). It also lists every existing production so you can read its package.

```bash
cd app
npm install          # once
npm start            # build the UI and serve it on http://localhost:4321
npm run dev          # same port, with hot reload while you work on the UI
```

- **Local only.** The server binds to `127.0.0.1` and has no auth. It reads only top-level `.md` files
  in `productions/*/` (never `yt/`).
- **Permissions.** Runs use `--permission-mode auto` and can't use `AskUserQuestion`. Questions come back
  as plain text in the feed.
- **Run history** is in `app/.runs/` (git-ignored): `<id>.json` holds the metadata and `<id>.jsonl` the event log.
  A run's Claude session can also be opened in the terminal with `claude --resume <sessionId>`.
- `PORT` and `CLAUDE_BIN` env vars override the port and the `claude` binary.
- Rendering (`/video-studio`) isn't in the app yet. When a package is done, the run view shows the command.
