// Studio app server: LAN only, one password (basic auth), allow-listed run.sh steps, read-only artefact views,
// review.md edits in review.py's format. Never runs arbitrary commands.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { HOST, NO_AUTH, PASSWORD, PORT, SHORTS, VOICE_PACE_JSON, WEB_DIST, productionDir, projectDir, safeFile } from "./config.js";
import { CONFIRM_STEPS, STEPS, STEP_FLAGS, STEP_IDS, previewPort, stepEnv } from "./steps.js";
import { getProject, library, listProjects } from "./projects.js";
import { ReviewError, applyPatch, reviewCheck, type ReviewPatch } from "./review.js";
import { registerPreview } from "./preview.js";
import { GEMINI_VOICES, ScenesError, applyVoicePatch, type VoicePatch } from "./scenes.js";
import { SettingsError, agents, deliverPreview, expectedEvals, readPaceFile, runEvals, styles, writePace } from "./settings.js";
import { getProduction, listProductions, productionFile, watchProduction } from "./productions.js";
import * as jobs from "./jobs.js";
import * as agent from "./agent.js";

if (!NO_AUTH && PASSWORD.length < 8) {
  console.error("APP_PASSWORD is missing or shorter than 8 characters: copy app/.env.example to app/.env and set one.");
  process.exit(1);
}

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? "info" }, trustProxy: false });

// ---------- auth: HTTP basic, any user name, the one password (constant-time compare) ----------
const want = crypto.createHash("sha256").update(PASSWORD).digest();
app.addHook("onRequest", async (req, reply) => {
  if (NO_AUTH) return; // localhost only (HOST is forced to 127.0.0.1)
  const h = req.headers.authorization ?? "";
  const m = h.match(/^Basic\s+(.+)$/i);
  if (m) {
    const decoded = Buffer.from(m[1], "base64").toString("utf8");
    const pw = decoded.slice(decoded.indexOf(":") + 1);
    if (crypto.timingSafeEqual(crypto.createHash("sha256").update(pw).digest(), want)) return;
    await new Promise((r) => setTimeout(r, 400)); // slow down guessing
  }
  reply.header("WWW-Authenticate", 'Basic realm="studio app", charset="UTF-8"').code(401).send({ error: "password required" });
});

// security headers (the app is same-origin only; /preview/ sets SAMEORIGIN so the app can frame the composition)
app.addHook("onSend", async (_req, reply, payload) => {
  reply.header("X-Content-Type-Options", "nosniff").header("Referrer-Policy", "no-referrer");
  if (!reply.getHeader("X-Frame-Options")) reply.header("X-Frame-Options", "DENY");
  return payload;
});

await app.register(fastifyStatic, { root: fs.existsSync(WEB_DIST) ? WEB_DIST : path.resolve("."), serve: false });

const bad = (reply: any, code: number, error: string) => reply.code(code).send({ error });

// ---------- projects ----------
app.get("/api/steps", async () => STEPS);
app.get("/api/projects", async () => listProjects());
app.get<{ Params: { slug: string } }>("/api/projects/:slug", async (req, reply) => {
  const p = getProject(req.params.slug);
  return p ? { ...p, previewPort: previewPort(p.slug) } : bad(reply, 404, "no such project");
});

// ---------- steps → jobs ----------
app.post<{ Params: { slug: string; step: string }; Body: { confirm?: boolean; flags?: string[] } | undefined }>(
  "/api/projects/:slug/steps/:step", async (req, reply) => {
    const { slug, step } = req.params;
    if (!projectDir(slug)) return bad(reply, 404, "no such project");
    if (!STEP_IDS.has(step)) return bad(reply, 400, `step not allowed: ${step}`);
    if (CONFIRM_STEPS.has(step) && req.body?.confirm !== true) return bad(reply, 428, `${step} needs {"confirm": true}`);
    const env: Record<string, string> = {};
    for (const f of req.body?.flags ?? []) {
      const set = STEP_FLAGS[step]?.[f];
      if (!set) return bad(reply, 400, `flag not allowed for ${step}: ${f}`);
      Object.assign(env, set);
    }
    Object.assign(env, stepEnv(slug, step));
    const job = jobs.enqueue(slug, step, env);
    return reply.code(202).send({ ...job, position: jobs.queuePosition(job.id) });
  });

app.get<{ Querystring: { slug?: string; limit?: string } }>("/api/jobs", async (req) => {
  const limit = Math.min(500, Math.max(1, Number(req.query.limit ?? 100) || 100));
  return jobs.listJobs(limit, req.query.slug);
});
app.get<{ Params: { id: string } }>("/api/jobs/:id", async (req, reply) => {
  const job = jobs.getJob(Number(req.params.id));
  return job ? { ...job, position: job.status === "queued" ? jobs.queuePosition(job.id) : null } : bad(reply, 404, "no such job");
});
app.post<{ Params: { id: string } }>("/api/jobs/:id/cancel", async (req, reply) =>
  jobs.cancel(Number(req.params.id)) ? { ok: true } : bad(reply, 409, "job is not queued or running"));

// SSE: replay stored lines (after Last-Event-ID), then follow live; "end" carries the exit code.
app.get<{ Params: { id: string } }>("/api/jobs/:id/stream", (req, reply) => {
  const id = Number(req.params.id);
  const job = jobs.getJob(id);
  if (!job) return bad(reply, 404, "no such job");
  reply.hijack();
  const res = reply.raw;
  res.writeHead(200, { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
  const send = (event: string, data: unknown, eid?: number) =>
    res.write(`${eid !== undefined ? `id: ${eid}\n` : ""}event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  let last = Number(req.headers["last-event-id"] ?? 0) || 0;
  const flush = () => { for (const l of jobs.linesAfter(id, last)) { send("line", l, l.seq); last = l.seq; } };
  const finished = (j: jobs.Job) => !["queued", "running"].includes(j.status);
  const close = () => { jobs.events.off(`job:${id}`, onEvent); clearInterval(beat); res.end(); };
  const onEvent = (ev: { type: string; line?: jobs.Line; job?: jobs.Job }) => {
    if (ev.type === "line" && ev.line && ev.line.seq > last) { send("line", ev.line, ev.line.seq); last = ev.line.seq; }
    if (ev.type === "status" && ev.job) {
      send("status", { ...ev.job, position: ev.job.status === "queued" ? jobs.queuePosition(id) : null });
      if (finished(ev.job)) { flush(); send("end", { status: ev.job.status, exitCode: ev.job.exit_code }); close(); }
    }
  };
  const beat = setInterval(() => res.write(": ping\n\n"), 15000);
  jobs.events.on(`job:${id}`, onEvent);
  req.raw.on("close", close);
  send("status", { ...job, position: job.status === "queued" ? jobs.queuePosition(id) : null });
  flush();
  const now = jobs.getJob(id)!;
  if (finished(now)) { send("end", { status: now.status, exitCode: now.exit_code }); close(); }
});

// ---------- review.md ----------
app.patch<{ Params: { slug: string }; Body: ReviewPatch & { viewportWidth?: number } }>("/api/projects/:slug/review", async (req, reply) => {
  const p = projectDir(req.params.slug);
  if (!p) return bad(reply, 404, "no such project");
  const body = req.body;
  if (!body || typeof body !== "object") return bad(reply, 400, "body required");
  // the phone tick is meant to be given from a phone (the listen on a phone speaker is the point)
  if (body.op === "tick" && body.which === "listened" && body.checked && !(Number(body.viewportWidth) > 0 && Number(body.viewportWidth) <= 520))
    return bad(reply, 403, "tick 'Listened on a phone' from a phone-sized screen");
  try { applyPatch(path.join(p, "review.md"), body); }
  catch (e) { if (e instanceof ReviewError) return bad(reply, e.code, e.message); throw e; }
  const check = await reviewCheck(req.params.slug);
  return { ok: true, check, project: getProject(req.params.slug) };
});

// ---------- deliver pre-check (read-only: deliver_check.py + review.py --check) ----------
app.get<{ Params: { slug: string } }>("/api/projects/:slug/deliver-check", async (req, reply) => {
  const p = projectDir(req.params.slug);
  return p ? deliverPreview(req.params.slug, p) : bad(reply, 404, "no such project");
});

// ---------- voice ladder form: scenes.json voice.minPause / voice.name / per-scene pad + pauseAfter, then validate ----------
app.get("/api/voices", async () => {
  let log: any[] = [];
  try { log = JSON.parse(fs.readFileSync(VOICE_PACE_JSON, "utf8")); } catch { /* none yet */ }
  return GEMINI_VOICES.map((v) => {
    const takes = log.filter((x) => x.voice === v);
    return { name: v, takes: takes.length, rawPace: takes.length ? Number((takes.reduce((n, x) => n + x.raw_pace, 0) / takes.length).toFixed(2)) : null,
      last: takes.at(-1) ?? null };
  });
});
app.patch<{ Params: { slug: string }; Body: VoicePatch }>("/api/projects/:slug/voice", async (req, reply) => {
  const p = projectDir(req.params.slug);
  if (!p) return bad(reply, 404, "no such project");
  if (jobs.busy(req.params.slug)) return bad(reply, 409, "a step of this project is queued or running: save after it ends");
  let changes: string[];
  try { changes = applyVoicePatch(p, req.body ?? {}); }
  catch (e) { if (e instanceof ScenesError) return bad(reply, e.code, e.message); throw e; }
  const job = changes.length ? jobs.enqueue(req.params.slug, "validate", {}) : null;
  return { ok: true, changes, job, project: { ...getProject(req.params.slug), previewPort: previewPort(req.params.slug) } };
});

// ---------- library (shorts/) ----------
app.get("/api/library", async () => library());
app.get<{ Params: { name: string } }>("/shorts/:name", (req, reply) => {
  const real = safeFile(SHORTS, req.params.name, new Set([".mp4"]));
  if (!real || path.dirname(real) !== fs.realpathSync(SHORTS)) return bad(reply, 404, "not found");
  reply.header("Cache-Control", "no-cache");
  return reply.sendFile(path.basename(real), path.dirname(real));
});

// ---------- settings ----------
app.get("/api/settings/pace", async () => readPaceFile());
app.put<{ Body: { values: Record<string, unknown>; why: string } }>("/api/settings/pace", async (req, reply) => {
  try { const changes = writePace(req.body?.values ?? {}, req.body?.why ?? ""); return { ok: true, changes, pace: readPaceFile() }; }
  catch (e) { if (e instanceof SettingsError) return bad(reply, e.code, e.message); throw e; }
});
app.get("/api/settings/styles", async () => styles());
app.get("/api/settings/agents", async () => agents());
app.get("/api/settings/evals", async () => expectedEvals());
app.post("/api/settings/evals", async (_req, reply) => {
  try { return await runEvals(); }
  catch (e) { if (e instanceof SettingsError) return bad(reply, e.code, e.message); throw e; }
});

// ---------- SSE helper ----------
function sse(req: any, reply: any) {
  reply.hijack();
  const res = reply.raw;
  res.writeHead(200, { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
  const send = (event: string, data: unknown, eid?: number) =>
    res.write(`${eid !== undefined ? `id: ${eid}\n` : ""}event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  const beat = setInterval(() => res.write(": ping\n\n"), 15000);
  const closers: (() => void)[] = [() => clearInterval(beat)];
  let closed = false;
  const close = () => { if (closed) return; closed = true; closers.forEach((c) => c()); res.end(); };
  req.raw.on("close", close);
  return { send, onClose: (f: () => void) => closers.push(f), close };
}

// ---------- agent: queue (packages), sessions, approvals ----------
const pkgView = (id: number) => {
  const p = agent.getPkg(id);
  if (!p) return null;
  const s = agent.sessionOf(id) ?? null;
  return { ...p, session: s, gates: agent.gatesOf(s?.id), production: p.folder ? getProduction(p.folder) : null,
    prompt: agent.promptFor(p), active: agent.activeSession() };
};
app.get("/api/packages", async () => ({ items: agent.listPackages(), active: agent.activeSession(), approvals: agent.pendingApprovals() }));
app.post<{ Body: { topic?: string; format?: string; notes?: string; kind?: string; folder?: string; start?: boolean } }>("/api/packages", async (req, reply) => {
  const b = req.body ?? {};
  const kind = b.kind === "ask" ? "ask" : "package";
  const topic = String(b.topic ?? "").trim();
  const notes = String(b.notes ?? "").trim();
  const format = String(b.format ?? "reel");
  if (topic.length < 3 || topic.length > (kind === "ask" ? 4000 : 300)) return bad(reply, 400, kind === "ask" ? "a question of 3–4000 characters" : "a topic of 3–300 characters");
  if (kind === "package" && (/[\r\n]/.test(topic) || !(agent.FORMATS as readonly string[]).includes(format))) return bad(reply, 400, "one-line topic; format: reel");
  if (notes.length > 4000) return bad(reply, 400, "notes: 4000 characters at most");
  const folder = b.folder ? String(b.folder) : null;
  if (folder && !productionDir(folder)) return bad(reply, 400, "no such productions/ folder");
  const p = agent.createPackage(kind, topic, format, notes, folder);
  if (b.start) agent.start(p.id);
  return reply.code(201).send(pkgView(p.id));
});
app.get<{ Params: { id: string } }>("/api/packages/:id", async (req, reply) => pkgView(Number(req.params.id)) ?? bad(reply, 404, "no such item"));
app.post<{ Params: { id: string } }>("/api/packages/:id/start", async (req, reply) => {
  const id = Number(req.params.id);
  if (!agent.getPkg(id)) return bad(reply, 404, "no such item");
  try { agent.start(id); return pkgView(id); }
  catch (e) { if (e instanceof agent.AgentError) return bad(reply, e.code, e.message); throw e; }
});
app.post<{ Params: { id: string } }>("/api/packages/:id/stop", async (req, reply) => {
  const s = agent.sessionOf(Number(req.params.id));
  return s && agent.stop(s.id) ? pkgView(Number(req.params.id)) : bad(reply, 409, "not queued or running");
});
app.delete<{ Params: { id: string } }>("/api/packages/:id", async (req, reply) =>
  agent.deletePackage(Number(req.params.id)) ? { ok: true } : bad(reply, 409, "stop it first"));
app.post<{ Params: { id: string }; Body: { text?: string } }>("/api/sessions/:id/messages", async (req, reply) => {
  try { return agent.reply(Number(req.params.id), String(req.body?.text ?? "")); }
  catch (e) { if (e instanceof agent.AgentError) return bad(reply, e.code, e.message); throw e; }
});
app.post<{ Params: { id: string }; Body: { decision?: string } }>("/api/approvals/:id", async (req, reply) => {
  const d = req.body?.decision;
  if (d !== "allow" && d !== "deny") return bad(reply, 400, 'decision must be "allow" or "deny"');
  return agent.decide(req.params.id, d, "owner") ? { ok: true } : bad(reply, 409, "this approval is no longer pending");
});
// SSE: the session's stored messages (after Last-Event-ID), then live ones and status changes
app.get<{ Params: { id: string } }>("/api/sessions/:id/stream", (req, reply) => {
  const id = Number(req.params.id);
  const s = agent.getSession(id);
  if (!s) return bad(reply, 404, "no such session");
  const io = sse(req, reply);
  let last = Number(req.headers["last-event-id"] ?? 0) || 0;
  const onEvent = (ev: { type: string; msg?: agent.Msg; session?: agent.Session }) => {
    if (ev.type === "message" && ev.msg && ev.msg.seq > last) { io.send("message", ev.msg, ev.msg.seq); last = ev.msg.seq; }
    if (ev.type === "status") io.send("status", ev.session);
  };
  agent.events.on(`session:${id}`, onEvent);
  io.onClose(() => agent.events.off(`session:${id}`, onEvent));
  io.send("status", s);
  for (const m of agent.messagesAfter(id, last)) { io.send("message", m, m.seq); last = m.seq; }
});

// ---------- productions/ (package folders: Markdown artifacts, gate ticks, change feed) ----------
app.get("/api/productions", async () => listProductions());
app.get<{ Params: { folder: string } }>("/api/productions/:folder", async (req, reply) => getProduction(req.params.folder) ?? bad(reply, 404, "no such package folder"));
app.get<{ Params: { folder: string; name: string } }>("/api/productions/:folder/files/:name", async (req, reply) => {
  const t = productionFile(req.params.folder, req.params.name);
  return t === null ? bad(reply, 404, "not found") : { name: req.params.name, text: t };
});
app.get<{ Params: { folder: string } }>("/api/productions/:folder/events", (req, reply) => {
  if (!productionDir(req.params.folder)) return bad(reply, 404, "no such package folder");
  const io = sse(req, reply);
  const off = watchProduction(req.params.folder, (files) => io.send("change", { files }));
  if (off) io.onClose(off);
  io.send("ready", { folder: req.params.folder });
});

registerPreview(app);

// ---------- files: only studio/projects/<slug>/out/** (the MP4, sheets, PNGs, JSON) ----------
const FILE_EXT = new Set([".mp4", ".png", ".jpg", ".jpeg", ".json", ".wav", ".mp3", ".log", ".txt"]);
app.get<{ Params: { slug: string; "*": string } }>("/files/:slug/*", (req, reply) => {
  const p = projectDir(req.params.slug);
  if (!p) return bad(reply, 404, "no such project");
  const out = path.join(p, "out");
  const rel = req.params["*"] ?? "";
  if (!rel || rel.includes("\0") || rel.split(/[\\/]/).some((s) => s === ".." || s.startsWith("."))) return bad(reply, 400, "bad path");
  const abs = path.resolve(out, rel);
  if (!abs.startsWith(out + path.sep) || !FILE_EXT.has(path.extname(abs).toLowerCase())) return bad(reply, 404, "not found");
  let real: string;
  try { real = fs.realpathSync(abs); } catch { return bad(reply, 404, "not found"); }
  const realOut = fs.realpathSync(out);
  if (!real.startsWith(realOut + path.sep) || !fs.statSync(real).isFile()) return bad(reply, 404, "not found");
  reply.header("Cache-Control", "no-cache");
  return reply.sendFile(path.relative(realOut, real), realOut);
});

// ---------- the built web app (npm start); in dev Vite serves it and proxies /api and /files here ----------
if (fs.existsSync(path.join(WEB_DIST, "index.html"))) {
  app.get("/assets/*", (req, reply) => reply.sendFile(path.join("assets", (req.params as any)["*"]), WEB_DIST));
  app.setNotFoundHandler((req, reply) => {
    if (req.method !== "GET" || /^\/(api|files|preview|shorts)\//.test(req.url)) return bad(reply, 404, "not found");
    const f = req.url.split("?")[0].replace(/^\/+/, "");
    if (f && !f.includes("..") && fs.existsSync(path.join(WEB_DIST, f)) && fs.statSync(path.join(WEB_DIST, f)).isFile()) return reply.sendFile(f, WEB_DIST);
    return reply.sendFile("index.html", WEB_DIST); // client-side routes
  });
}

const stop = async () => { agent.shutdown(); jobs.shutdown(); await app.close(); process.exit(0); };
process.on("SIGINT", stop); process.on("SIGTERM", stop);

await app.listen({ host: HOST, port: PORT });
