// Experiments: read-only view of experiments/<name>/ (free-GPU model tests): README title, RESULTS.md, and the clips,
// previews and contact sheets they made. Only out/, results/ and images/ are listed or served; nothing here runs anything.
import fs from "node:fs";
import path from "node:path";
import { EXPERIMENTS, safeFile } from "./config.js";

export const EXP_RE = /^[a-z0-9][a-z0-9-]{0,80}$/;
/** the folders an experiment writes media to (git-ignored output); README/RESULTS are read separately */
const MEDIA_DIRS = ["out", "results", "images"];
export const EXP_EXT = new Set([".mp4", ".png", ".jpg", ".jpeg"]);
const MAX_FILES = 300;

export interface ExpFile { path: string; kind: "video" | "image"; size: number; mtime: string }
/** a live Kaggle run: run-plan.json (stations, expected seconds) + progress.json (kaggle.sh watch: status + relayed events) */
export interface RunEvent { t: number; stage: string; state: "start" | "done" | "error"; job: string | null; [k: string]: unknown }
export interface RunInfo {
  plan: { slug: string; stages: { key: string; label: string; kind: string; load?: number; jobs: { id: string; expect: number }[] }[] };
  progress: { pushed_at: string; status: string; status_at: string; checked_at: string; message?: string; events: RunEvent[] } | null;
  fetched: boolean; reviewed: boolean;
}
export interface Experiment { name: string; title: string; verdict: string | null; updated: string; results: string | null;
  videos: ExpFile[]; images: ExpFile[]; run: RunInfo | null }

export function experimentDir(name: string): string | null {
  if (!EXP_RE.test(name)) return null;
  const p = path.join(EXPERIMENTS, name);
  return fs.existsSync(p) && fs.statSync(p).isDirectory() ? p : null;
}

const read = (f: string) => { try { return fs.readFileSync(f, "utf8"); } catch { return null; } };

/** the first paragraph under "## Verdict", markdown emphasis stripped */
function verdict(results: string | null): string | null {
  const m = results?.match(/^## Verdict\s*\n+([\s\S]*?)(?:\n\s*\n|\n- |$)/m);
  return m ? m[1].replace(/\*\*|__|`/g, "").replace(/\s+/g, " ").trim() || null : null;
}

function media(dir: string): ExpFile[] {
  const out: ExpFile[] = [];
  const walk = (abs: string, depth: number) => {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(abs, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (out.length >= MAX_FILES || e.name.startsWith(".")) continue;
      const p = path.join(abs, e.name);
      if (e.isDirectory()) { if (depth < 3) walk(p, depth + 1); continue; }
      const ext = path.extname(e.name).toLowerCase();
      if (!e.isFile() || !EXP_EXT.has(ext)) continue;
      const st = fs.statSync(p);
      out.push({ path: path.relative(dir, p), kind: ext === ".mp4" ? "video" : "image", size: st.size, mtime: st.mtime.toISOString() });
    }
  };
  for (const d of MEDIA_DIRS) walk(path.join(dir, d), 1);
  return out.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
}

const mtime = (f: string) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
const json = (f: string) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };

function run(dir: string): RunInfo | null {
  const plan = json(path.join(dir, "run-plan.json"));
  if (!plan?.stages) return null;
  const p = json(path.join(dir, "progress.json"));
  // the topic stays on this PC: anyone holding it could read or post to the run's relay
  const progress = p ? { pushed_at: p.pushed_at, status: p.status, status_at: p.status_at, checked_at: p.checked_at, message: p.message || undefined,
    events: Array.isArray(p.events) ? p.events : [] } : null;
  const manifest = mtime(path.join(dir, "results", "manifest.json")), results = mtime(path.join(dir, "RESULTS.md"));
  const pushed = progress ? Date.parse(progress.pushed_at) : 0;
  // fetched / reviewed count only for this push: output and RESULTS.md written after it
  const fetched = Math.max(manifest, mtime(path.join(dir, "results", "kaggle-log.txt"))) > pushed;   // kaggle.sh fetch always writes the log
  return { plan, progress, fetched, reviewed: fetched && results > Math.max(manifest, pushed) };
}

function one(name: string, dir: string): Experiment {
  const readme = read(path.join(dir, "README.md"));
  const results = read(path.join(dir, "RESULTS.md"));
  const files = media(dir);
  const times = [...files.map((f) => f.mtime), ...["README.md", "RESULTS.md", "progress.json"].flatMap((f) => {
    try { return [fs.statSync(path.join(dir, f)).mtime.toISOString()]; } catch { return []; } })];
  return { name, title: readme?.match(/^#\s+(.+)$/m)?.[1].trim() ?? name, verdict: verdict(results), results,
    updated: times.sort().at(-1) ?? fs.statSync(dir).mtime.toISOString(),
    videos: files.filter((f) => f.kind === "video"), images: files.filter((f) => f.kind === "image"), run: run(dir) };
}

const live = (e: Experiment) => ["queued", "running"].includes(e.run?.progress?.status ?? "");
/** a live run first, then newest first */
export function listExperiments(): Experiment[] {
  let names: string[] = [];
  try { names = fs.readdirSync(EXPERIMENTS).filter((n) => experimentDir(n)); } catch { /* no experiments/ */ }
  return names.map((n) => one(n, path.join(EXPERIMENTS, n)))
    .sort((a, b) => Number(live(b)) - Number(live(a)) || b.updated.localeCompare(a.updated));
}

/** absolute path of a servable file, or null: only under out/, results/ or images/, media extensions, no dotfiles or .. */
export function experimentFile(name: string, rel: string): string | null {
  const dir = experimentDir(name);
  if (!dir || !MEDIA_DIRS.includes(rel.split(/[\\/]/)[0])) return null;
  return safeFile(dir, rel, EXP_EXT);
}
