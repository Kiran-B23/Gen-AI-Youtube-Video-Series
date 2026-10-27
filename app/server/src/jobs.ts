// The job queue: one run.sh step at a time across all projects (Whisper and render are CPU-bound); the rest wait in
// SQLite (app/data.db). Each job's output lines are stored so a reopened page replays the log, then follows it live.
import { spawn, type ChildProcess } from "node:child_process";
import { EventEmitter } from "node:events";
import { PIPELINE_PATH, RUN_SH, STUDIO } from "./config.js";
import { db, now } from "./db.js";

export type JobStatus = "queued" | "running" | "ok" | "failed" | "cancelled" | "interrupted";
export interface Job { id: number; slug: string; step: string; flags: string; status: JobStatus; exit_code: number | null;
  created_at: string; started_at: string | null; finished_at: string | null }
export interface Line { seq: number; stream: "out" | "err" | "sys"; text: string; t: number }

db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL, step TEXT NOT NULL, flags TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL, exit_code INTEGER, created_at TEXT NOT NULL, started_at TEXT, finished_at TEXT);
CREATE TABLE IF NOT EXISTS job_lines (
  job_id INTEGER NOT NULL, seq INTEGER NOT NULL, stream TEXT NOT NULL, text TEXT NOT NULL, t INTEGER NOT NULL,
  PRIMARY KEY (job_id, seq));
CREATE INDEX IF NOT EXISTS jobs_slug ON jobs(slug, step, id);
`);
// a server restart kills its children: mark what was running so the history doesn't lie
db.prepare("UPDATE jobs SET status='interrupted', finished_at=? WHERE status='running'").run(now());

const q = {
  insert: db.prepare("INSERT INTO jobs (slug, step, flags, status, created_at) VALUES (?, ?, ?, 'queued', ?)"),
  get: db.prepare("SELECT * FROM jobs WHERE id=?"),
  next: db.prepare("SELECT * FROM jobs WHERE status='queued' ORDER BY id LIMIT 1"),
  start: db.prepare("UPDATE jobs SET status='running', started_at=? WHERE id=?"),
  finish: db.prepare("UPDATE jobs SET status=?, exit_code=?, finished_at=? WHERE id=?"),
  line: db.prepare("INSERT INTO job_lines (job_id, seq, stream, text, t) VALUES (?, ?, ?, ?, ?)"),
  lines: db.prepare("SELECT seq, stream, text, t FROM job_lines WHERE job_id=? AND seq>? ORDER BY seq"),
  list: db.prepare("SELECT * FROM jobs ORDER BY id DESC LIMIT ?"),
  listSlug: db.prepare("SELECT * FROM jobs WHERE slug=? ORDER BY id DESC LIMIT ?"),
  lastPerStep: db.prepare("SELECT j.* FROM jobs j JOIN (SELECT step, MAX(id) id FROM jobs WHERE slug=? GROUP BY step) m ON j.id=m.id"),
};

export const events = new EventEmitter(); // "job:<id>" → {type:"line", line} | {type:"status", job}
events.setMaxListeners(100);
let running: { job: Job; proc: ChildProcess; seq: number } | null = null;

export const getJob = (id: number) => q.get.get(id) as Job | undefined;
export const listJobs = (limit = 100, slug?: string) => (slug ? q.listSlug.all(slug, limit) : q.list.all(limit)) as Job[];
export const lastJobsPerStep = (slug: string) => Object.fromEntries((q.lastPerStep.all(slug) as Job[]).map((j) => [j.step, j]));
export const linesAfter = (id: number, seq: number) => q.lines.all(id, seq) as Line[];
/** a job of this project is queued or running (the scenes.json form refuses to write under a running step) */
export const busy = (slug: string) => !!db.prepare("SELECT 1 FROM jobs WHERE slug=? AND status IN ('queued','running') LIMIT 1").get(slug);
export const queuePosition = (id: number) =>
  (db.prepare("SELECT COUNT(*) n FROM jobs WHERE status='queued' AND id<?").get(id) as { n: number }).n;

export function enqueue(slug: string, step: string, env: Record<string, string>): Job {
  const flags = Object.entries(env).map(([k, v]) => `${k}=${v}`).join(" ");
  const id = Number(q.insert.run(slug, step, flags, now()).lastInsertRowid);
  const job = getJob(id)!;
  events.emit(`job:${id}`, { type: "status", job });
  pump();
  return getJob(id)!;
}

function addLine(job: Job, stream: Line["stream"], text: string) {
  if (!running) return;
  const line: Line = { seq: ++running.seq, stream, text, t: Date.now() };
  q.line.run(job.id, line.seq, stream, text, line.t);
  events.emit(`job:${job.id}`, { type: "line", line });
}

function pump() {
  if (running) return;
  const job = q.next.get() as Job | undefined;
  if (!job) return;
  q.start.run(now(), job.id);
  const env: Record<string, string> = { ...(process.env as Record<string, string>), PATH: PIPELINE_PATH, FORCE_COLOR: "0", NO_COLOR: "1", PYTHONUNBUFFERED: "1" };
  for (const kv of job.flags.split(" ").filter(Boolean)) { const [k, v] = kv.split("="); env[k] = v; }
  // argv only, no shell: bash run.sh <slug> <step>. detached → its own process group, so cancel stops the whole tree.
  const proc = spawn("bash", [RUN_SH, job.slug, job.step], { cwd: STUDIO, env, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  running = { job: getJob(job.id)!, proc, seq: 0 };
  events.emit(`job:${job.id}`, { type: "status", job: running.job });
  addLine(running.job, "sys", `$ ${job.flags ? job.flags + " " : ""}studio/tools/run.sh ${job.slug} ${job.step}`);
  for (const [stream, src] of [["out", proc.stdout!], ["err", proc.stderr!]] as const) {
    let buf = "";
    src.setEncoding("utf8");
    src.on("data", (d: string) => {
      buf += d;
      // progress bars rewrite the line with \r: keep the last state of each line
      const parts = buf.split("\n"); buf = parts.pop()!;
      for (const p of parts) addLine(running!.job, stream, p.split("\r").filter(Boolean).pop() ?? "");
    });
    src.on("end", () => { if (buf && running) addLine(running.job, stream, buf.split("\r").filter(Boolean).pop() ?? ""); buf = ""; });
  }
  const done = (code: number | null, signal: NodeJS.Signals | null, err?: Error) => {
    if (!running || running.job.id !== job.id) return;
    if (err) addLine(running.job, "sys", `spawn failed: ${err.message}`);
    const cancelled = getJob(job.id)?.status === "cancelled" || signal === "SIGTERM" || signal === "SIGKILL";
    const status: JobStatus = cancelled ? "cancelled" : code === 0 ? "ok" : "failed";
    addLine(running.job, "sys", `exit ${code ?? signal}`);
    q.finish.run(status, code, now(), job.id);
    running = null;
    events.emit(`job:${job.id}`, { type: "status", job: getJob(job.id)! });
    setImmediate(pump);
  };
  proc.on("error", (e) => done(-1, null, e));
  proc.on("close", (code, signal) => done(code, signal));
}

export function cancel(id: number): boolean {
  const job = getJob(id);
  if (!job) return false;
  if (job.status === "queued") {
    q.finish.run("cancelled", null, now(), id);
    events.emit(`job:${id}`, { type: "status", job: getJob(id)! });
    return true;
  }
  if (job.status === "running" && running?.job.id === id && running.proc.pid) {
    q.finish.run("cancelled", null, null, id);
    try { process.kill(-running.proc.pid, "SIGTERM"); } catch { /* already gone */ }
    return true;
  }
  return false;
}

export function shutdown() {
  if (running?.proc.pid) try { process.kill(-running.proc.pid, "SIGTERM"); } catch { /* gone */ }
}

pump(); // anything left queued from the last run starts now
