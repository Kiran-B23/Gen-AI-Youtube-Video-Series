// Paths and settings. The app never stores pipeline state of its own: the repo's files are the record.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url)); // app/server/src (dev) or app/server/dist (built)
export const APP = path.resolve(here, "../..");
export const REPO = path.resolve(APP, "..");
export const STUDIO = path.join(REPO, "studio");
export const PROJECTS = path.join(STUDIO, "projects");
export const SHORTS = path.join(REPO, "shorts");
export const RUN_SH = path.join(STUDIO, "tools", "run.sh");
export const PYTHON = path.join(STUDIO, ".venv", "bin", "python");
export const REVIEW_PY = path.join(STUDIO, "tools", "review.py");
export const PACE_JSON = path.join(STUDIO, "templates", "reel", "pace.json");
export const VOICE_PACE_JSON = path.join(STUDIO, "voice-pace.json");
export const REF_BENCHMARK = path.join(REPO, "references", "benchmark.json");
export const WEB_DIST = path.join(APP, "web", "dist");
export const DB_FILE = path.join(APP, "data.db");
export const PRODUCTIONS = path.join(REPO, "productions");
/** free-GPU model tests (read-only Experiments page) */
export const EXPERIMENTS = path.join(REPO, "experiments");
export const AGENTS_DIR = path.join(REPO, ".claude", "agents");
export const STYLES_DIR = path.join(STUDIO, "templates", "styles");
export const SCRIPTER = path.join(REPO, ".claude", "skills", "video-scripter");
export const LINT_PY = path.join(SCRIPTER, "scripts", "lint_package.py");
export const EVALS_DIR = path.join(SCRIPTER, "evals");
export const DELIVER_CHECK_PY = path.join(STUDIO, "tools", "deliver_check.py");
/** the trend radar (studio/tools/trends.py): its jobs ride the build queue under this pseudo-slug (not a project) */
export const TRENDS_DIR = path.join(REPO, "references", "trends");
export const TRENDS_PY = path.join(STUDIO, "tools", "trends.py");
export const TRENDS_SLUG = "_trends";

/** Minimal KEY=VALUE reader for app/.env (no dependency; real env vars win). */
function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    const v = m[2].replace(/^(['"])(.*)\1$/, "$2");
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}
loadEnv(path.join(APP, ".env"));

export const PASSWORD = process.env.APP_PASSWORD ?? "";
/** APP_NO_AUTH=1: no password, and the server binds to this PC only (127.0.0.1), whatever APP_HOST says. */
export const NO_AUTH = process.env.APP_NO_AUTH === "1";
export const HOST = NO_AUTH ? "127.0.0.1" : (process.env.APP_HOST ?? "0.0.0.0");
export const PORT = Number(process.env.APP_PORT ?? 4310);
/** HyperFrames Studio (run.sh <slug> preview): base port; each project gets a stable port base + (hash % 200). */
export const PREVIEW_PORT_BASE = Number(process.env.APP_PREVIEW_PORT_BASE ?? 3100);
/** PATH the pipeline expects (studio/tools/run.sh sets it too; the app sets it for review.py). */
export const PIPELINE_PATH = [path.join(process.env.HOME ?? "", ".local/bin"), path.join(process.env.HOME ?? "", ".local/node/bin"), process.env.PATH ?? ""].join(":");

export const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,80}$/;
export function projectDir(slug: string): string | null {
  if (!SLUG_RE.test(slug)) return null;
  const p = path.join(PROJECTS, slug);
  return fs.existsSync(path.join(p, "scenes.json")) ? p : null;
}

/** productions/<date>-<slug>/ (a video-scripter package folder) */
export const FOLDER_RE = /^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]{0,80}$/;
export function productionDir(folder: string): string | null {
  if (!FOLDER_RE.test(folder)) return null;
  const p = path.join(PRODUCTIONS, folder);
  return fs.existsSync(p) && fs.statSync(p).isDirectory() ? p : null;
}

/** path checks shared by every static route: no "..", no dot-files, stays under root after symlinks */
export function safeFile(root: string, rel: string, exts: Set<string>): string | null {
  if (!rel || rel.includes("\0") || rel.split(/[\\/]/).some((s) => s === ".." || s.startsWith("."))) return null;
  const abs = path.resolve(root, rel);
  if (!abs.startsWith(root + path.sep) || !exts.has(path.extname(abs).toLowerCase())) return null;
  try {
    const real = fs.realpathSync(abs), realRoot = fs.realpathSync(root);
    return real.startsWith(realRoot + path.sep) && fs.statSync(real).isFile() ? real : null;
  } catch { return null; }
}
