// The agent's only way to run a pipeline step: run_step queues `run.sh <slug> <step>` on the app's build queue (the
// same queue and allow-list as the Build page's Run button), outside the agent's sandbox, so the step has the Gemini
// key, Chrome, ffmpeg and the network it needs while the agent's own shell has none of them. policy.ts decides per call:
// before the owner approves the script it is refused (agent.ts); after it, every step runs, voice included, and a step past its fix rounds is refused. deliver is not offered.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { FOLDER_RE, PIPELINE_PATH, PRODUCTIONS, PROJECTS, PYTHON, REPO, STUDIO } from "./config.js";
import * as jobs from "./jobs.js";
import { AGENT_STEPS } from "./policy.js";
import { STEP_FLAGS } from "./steps.js";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,60}$/;
const WAIT_MS = 9 * 60 * 1000; // a tool call returns within ~9 min; a longer step (render) is followed with step_status
const text = (t: string, isError = false) => ({ content: [{ type: "text" as const, text: t }], isError });

/** wait for a job to finish (or WAIT_MS), then report its exit and the tail of its log */
async function report(id: number): Promise<ReturnType<typeof text>> {
  const done = (s?: string) => !!s && !["queued", "running"].includes(s);
  if (!done(jobs.getJob(id)?.status)) {
    await new Promise<void>((resolve) => {
      const on = (e: any) => { if (e.type === "status" && done(e.job?.status)) finish(); };
      const timer = setTimeout(() => finish(), WAIT_MS);
      const finish = () => { clearTimeout(timer); jobs.events.off(`job:${id}`, on); resolve(); };
      jobs.events.on(`job:${id}`, on);
      if (done(jobs.getJob(id)?.status)) finish();
    });
  }
  const j = jobs.getJob(id)!;
  const lines = jobs.linesAfter(id, 0);
  const tail = lines.slice(-60).map((l) => (l.stream === "err" ? "! " : "") + l.text).join("\n");
  if (!done(j.status)) return text(`job ${id} (${j.step}) is still ${j.status} after ${WAIT_MS / 60000} min: call step_status with job ${id} to keep waiting.\n--- log so far (last 60 lines) ---\n${tail}`);
  const ok = j.status === "ok";
  return text(`job ${id}: run.sh ${j.slug} ${j.step}${j.flags ? ` (${j.flags})` : ""} → ${j.status}${j.exit_code !== null ? `, exit ${j.exit_code}` : ""}\n--- last ${Math.min(60, lines.length)} of ${lines.length} log lines ---\n${tail}`, !ok);
}

const RESEARCH_MS = 20 * 60 * 1000; // a hard stop: yt-dlp can hang on a slow host
let researching = false;
/** yt_research.py with argv only (no shell), outside the sandbox; output to productions/<folder>/yt/; never browser cookies */
function research(folder: string, args: string[]): Promise<ReturnType<typeof text>> {
  return new Promise((resolve) => {
    const env: Record<string, string> = { ...(process.env as Record<string, string>), PATH: PIPELINE_PATH, PYTHONUNBUFFERED: "1", NO_COLOR: "1" };
    const out = path.join(PRODUCTIONS, folder, "yt");
    const proc = spawn(PYTHON, [path.join(STUDIO, "tools", "yt_research.py"), ...args, "--out", out], { cwd: REPO, env, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    const lines: string[] = [];
    const take = (d: Buffer) => { for (const l of d.toString("utf8").split("\n")) if (l.trim()) lines.push(l.split("\r").pop()!); if (lines.length > 400) lines.splice(0, lines.length - 400); };
    proc.stdout!.on("data", take); proc.stderr!.on("data", take);
    const timer = setTimeout(() => { lines.push(`(stopped after ${RESEARCH_MS / 60000} min)`); try { process.kill(-proc.pid!, "SIGKILL"); } catch { /* gone */ } }, RESEARCH_MS);
    proc.on("close", (code) => {
      clearTimeout(timer);
      resolve(text(`yt_research.py → exit ${code}; results in productions/${folder}/yt/\n--- last 60 lines ---\n${lines.slice(-60).join("\n")}`, code !== 0));
    });
    proc.on("error", (e) => { clearTimeout(timer); resolve(text(`could not start yt_research.py: ${e.message}`, true)); });
  });
}

export const studioServer = createSdkMcpServer({
  name: "studio",
  version: "1.0.0",
  tools: [
    tool("run_step",
      "Run one pipeline step for a studio project: `run.sh <slug> <step>` on the app's build queue, outside your sandbox (it has the voice key, Chrome, ffmpeg and network). Waits for it (up to ~9 min) and returns the exit and the log tail. Every step runs at once (voice included, after the owner approved the script); a step past its fix rounds is refused: then stop and report. deliver is the owner's. Use this for every run.sh step instead of the shell.",
      {
        slug: z.string().describe("the project folder name under studio/projects/"),
        step: z.enum(AGENT_STEPS),
        resplit: z.boolean().optional().describe("voice only: re-split the saved take (free, no Gemini request)"),
        retake: z.boolean().optional().describe("voice only: ask Gemini for a new take (spends a request)"),
      },
      async ({ slug, step, resplit, retake }) => {
        if (!SLUG_RE.test(slug)) return text(`bad slug: ${slug}`, true);
        const exists = fs.existsSync(path.join(PROJECTS, slug));
        if (step === "new" && exists) return text(`studio/projects/${slug} already exists`, true);
        if (step !== "new" && !exists) return text(`no project studio/projects/${slug}: run step "new" first`, true);
        if (jobs.busy(slug)) return text(`a step of ${slug} is already queued or running: wait for it (step_status) before starting another`, true);
        const env: Record<string, string> = step === "voice" ? { ...(resplit ? STEP_FLAGS.voice.resplit : {}), ...(retake ? STEP_FLAGS.voice.retake : {}) } : {};
        const job = jobs.enqueue(slug, step, env);
        return report(job.id);
      }),
    tool("research",
      "YouTube research for a package: runs studio/tools/yt_research.py outside your sandbox (YouTube needs more network than the sandbox gives), with a 20-minute hard stop, writing into productions/<folder>/yt/. Use this instead of running yt_research.py in the shell. Same options as the script (see the video-scripter skill).",
      {
        folder: z.string().describe("the package folder name under productions/, e.g. 2026-10-29-ollama-reel"),
        topic: z.string().optional(),
        context: z.string().optional(), exclude: z.string().optional(), queries: z.string().optional().describe("';'-separated queries"),
        urls: z.array(z.string().url()).optional().describe("analyse these videos instead of searching"),
        stage: z.enum(["search", "watch", "all"]).optional(), drop: z.string().optional(),
        shorts: z.number().int().min(0).max(10).optional(), long: z.number().int().min(0).max(6).optional(), low: z.number().int().min(0).max(6).optional(),
        min_views: z.number().int().min(0).optional(), per_query: z.number().int().min(1).max(30).optional(),
      },
      async (a) => {
        if (!FOLDER_RE.test(a.folder) || !fs.existsSync(path.join(PRODUCTIONS, a.folder))) return text(`no package folder productions/${a.folder}`, true);
        if (researching) return text("a research run is already going: wait for it", true);
        const args: string[] = [];
        if (a.topic) args.push(a.topic);
        for (const [k, v] of [["--context", a.context], ["--exclude", a.exclude], ["--queries", a.queries], ["--stage", a.stage], ["--drop", a.drop]] as const) if (v) args.push(k, v);
        for (const [k, v] of [["--shorts", a.shorts], ["--long", a.long], ["--low", a.low], ["--min-views", a.min_views], ["--per-query", a.per_query]] as const) if (v !== undefined) args.push(k, String(v));
        if (a.urls?.length) args.push("--urls", ...a.urls);
        if (!a.topic && !a.urls?.length) return text("give a topic or urls", true);
        researching = true;
        try { return await research(a.folder, args); } finally { researching = false; }
      }),
    tool("step_status", "Keep waiting for a run_step job that was still running, and get its exit and log tail.",
      { job: z.number().int().positive() },
      async ({ job }) => (jobs.getJob(job) ? report(job) : text(`no job ${job}`, true))),
  ],
});
