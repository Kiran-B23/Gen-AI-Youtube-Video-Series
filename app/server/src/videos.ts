// The simple interface's model (owner, 2026-10-29: "re-plan the UI with a simple interface"): a *video* is an agent
// package (topic → productions/<folder>/) and/or the studio project built from it (studio/projects/<slug>/, whose
// scenes.json "package" names the folder). Each video has one stage in plain words, and the owner's turn is explicit.
import fs from "node:fs";
import path from "node:path";
import { PRODUCTIONS } from "./config.js";
import * as agent from "./agent.js";
import { lastJobsPerStep, busy } from "./jobs.js";
import { listProjects } from "./projects.js";

export type Stage = "script" | "your-script" | "building" | "your-review" | "delivered" | "stopped";
const STAGE_TEXT: Record<Stage, string> = {
  "script": "Writing the script", "your-script": "Your turn: read the script", "building": "Building the video",
  "your-review": "Your turn: watch it", "delivered": "Delivered", "stopped": "Stopped",
};
/** the build line, in order: "step k of n" on the Video page */
export const BUILD_LINE = ["new", "validate", "voice", "assemble", "payoffs", "check", "render", "qa", "watch", "review"];
const STEP_WORDS: Record<string, string> = { new: "Setting up", validate: "Checking the plan", voice: "Recording the voice", clips: "Building clips",
  assemble: "Assembling", payoffs: "Checking the visuals", check: "Checking the layout", render: "Rendering", qa: "Checking the render",
  watch: "Watching it", review: "Writing the fix list", stills: "Taking stills", deliver: "Delivering" };

type Proj = ReturnType<typeof listProjects>[number];
type PkgRow = ReturnType<typeof agent.listPackages>[number];

function stageOf(pkg: PkgRow | null, proj: Proj | null): { stage: Stage; why: string } {
  const s = pkg?.session ?? null;
  const live = !!s && (s.status === "running" || s.status === "queued");
  const job = proj ? busy(proj.slug) : false;
  if (proj?.delivered && proj.current && !live) return { stage: "delivered", why: "in shorts/" };
  if (live || job) {
    if (pkg?.kind === "package" && !pkg.script_approved_at && !proj) return { stage: "script", why: "the agent is researching and writing" };
    return { stage: "building", why: job ? "a pipeline step is running" : "the agent is working" };
  }
  if (proj?.exists.mp4) return { stage: "your-review", why: proj.review ? `${proj.review.open} open note(s) in the fix list` : "rendered" };
  if (pkg?.kind === "package" && !pkg.script_approved_at && s?.sdk_session_id && s.status === "idle") return { stage: "your-script", why: "approve it or ask for changes" };
  if (s && (s.status === "failed" || s.status === "stopped" || s.status === "interrupted")) return { stage: "stopped", why: s.error ? s.error.slice(0, 160) : `the session ${s.status}` };
  if (s?.status === "idle") return { stage: "stopped", why: "the agent stopped before a render: read its last message" };
  return { stage: proj ? "building" : "script", why: proj ? "not rendered yet" : "not started" };
}

export function listVideos() {
  const pkgs = agent.listPackages().filter((p) => p.kind === "package" || p.folder);
  const projs = listProjects();
  const byFolder = new Map(projs.filter((p) => p.package).map((p) => [p.package!.path.replace(/^productions\//, "").replace(/\/$/, ""), p]));
  const used = new Set<string>();
  const out: any[] = [];
  const seenFolder = new Set<string>();
  for (const pkg of pkgs) {
    if (pkg.kind === "ask" && pkg.folder && seenFolder.has(pkg.folder)) continue;   // a revision session of a video already listed
    if (pkg.kind === "ask" && !(pkg.folder && byFolder.has(pkg.folder))) continue;   // a one-off question, not a video
    if (pkg.folder && seenFolder.has(pkg.folder)) continue;
    if (pkg.folder) seenFolder.add(pkg.folder);
    const proj = pkg.folder ? byFolder.get(pkg.folder) ?? null : null;
    if (proj) used.add(proj.slug);
    out.push(view(pkg, proj));
  }
  for (const proj of projs) if (!used.has(proj.slug)) out.push(view(null, proj));
  return out.sort((a, b) => b.updated.localeCompare(a.updated));
}

function view(pkg: PkgRow | null, proj: Proj | null) {
  const { stage, why } = stageOf(pkg, proj);
  const s = pkg?.session ?? null;
  const updated = [proj?.mtime, s?.finished_at, s?.started_at, pkg?.created_at].filter(Boolean).sort().pop() ?? "";
  return {
    key: pkg ? `pkg-${pkg.id}` : proj!.slug,
    title: pkg?.kind === "package" ? pkg.topic : proj?.title ?? proj?.slug ?? pkg?.topic ?? "",
    packageId: pkg?.id ?? null, sessionId: s?.id ?? null, sessionStatus: s?.status ?? null, next: s?.next ?? null,
    slug: proj?.slug ?? null, folder: pkg?.folder ?? proj?.package?.path.replace(/^productions\//, "") ?? null,
    personal: proj?.personal ?? false, hasVideo: !!proj?.exists.mp4,
    stage, stageText: STAGE_TEXT[stage], why, updated, cost: s?.cost_usd ?? null, created: pkg?.created_at ?? null,
  };
}

export function getVideo(key: string) {
  const v = listVideos().find((x) => x.key === key || x.slug === key);
  if (!v) return null;
  const texts = v.sessionId ? agent.lastTexts(v.sessionId, 6) : [];
  let progress = null;
  if (v.slug) {
    const last = lastJobsPerStep(v.slug);
    const running = Object.values(last).find((j: any) => j.status === "running" || j.status === "queued") as any;
    const latest = Object.values(last).sort((a: any, b: any) => b.id - a.id)[0] as any;
    const cur = running ?? latest;
    if (cur) progress = { step: cur.step, words: STEP_WORDS[cur.step] ?? cur.step, status: cur.status,
      index: Math.max(0, BUILD_LINE.indexOf(cur.step)) + 1, of: BUILD_LINE.length,
      // per build step, its latest job (the run pet on the Video page walks this line)
      steps: Object.fromEntries(Object.entries(last).filter(([k]) => BUILD_LINE.includes(k) || k === "clips")
        .map(([k, j]: [string, any]) => [k, { status: j.status, started_at: j.started_at, finished_at: j.finished_at }])) };
  }
  // the script the owner approves: the read-aloud section of script-<format>.md, when the package has one
  let script: string | null = null;
  if (v.folder) {
    const dir = path.join(PRODUCTIONS, v.folder);
    try {
      const f = fs.readdirSync(dir).find((n) => /^script-(?!review).+\.md$/.test(n));
      if (f) script = fs.readFileSync(path.join(dir, f), "utf8");
    } catch { /* none yet */ }
  }
  // while the script is written: the package files made so far (the pet on the Video page walks the scripter's stages).
  // Files older than this video's package are left out: a folder can hold an earlier run's files.
  let writing: { name: string; mtime: string }[] | null = null;
  if (v.folder && (v.stage === "script" || v.stage === "your-script")) {
    const dir = path.join(PRODUCTIONS, v.folder), since = v.created ? Date.parse(v.created) : 0;
    try {
      writing = fs.readdirSync(dir, { withFileTypes: true })
        .filter((e) => (e.isFile() && e.name.endsWith(".md")) || (e.isDirectory() && e.name === "yt"))
        .map((e) => ({ name: e.isDirectory() ? `${e.name}/` : e.name, ms: fs.statSync(path.join(dir, e.name)).mtimeMs }))
        .filter((f) => f.ms >= since).sort((a, b) => a.ms - b.ms)
        .map((f) => ({ name: f.name, mtime: new Date(f.ms).toISOString() }));
    } catch { writing = []; }
  }
  return { ...v, messages: texts, progress, script, writing };
}
