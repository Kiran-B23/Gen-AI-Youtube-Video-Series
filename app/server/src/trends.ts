// The trend radar (references/trends/, written by studio/tools/trends.py): read-only views of latest.json, the dated
// briefs and the snapshot list. The only things the app can run are `trends.py snap` and `trends.py run`, queued as
// jobs (one job at a time, on the same queue as the run.sh steps) and only when the owner clicks.
import fs from "node:fs";
import path from "node:path";
import { TRENDS_DIR, TRENDS_SLUG } from "./config.js";
import { busy, lastJobsPerStep } from "./jobs.js";

export const TREND_STEPS: Record<string, string> = {
  snap: "one snapshot of every source → references/trends/snapshots/ (3–7 min, polite: one request at a time)",
  run: "a snapshot, then the brief: the latest snapshot vs the one before → <date>.md + latest.json",
};
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const readJson = (f: string) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const ls = (dir: string, re: RegExp) => { try { return fs.readdirSync(dir).filter((f) => re.test(f)).sort(); } catch { return []; } };

export function trends() {
  const snaps = ls(path.join(TRENDS_DIR, "snapshots"), /^\d{4}-\d{2}-\d{2}T\d{4}\.json$/).map((f) => f.slice(0, -5));
  return {
    latest: readJson(path.join(TRENDS_DIR, "latest.json")),
    briefs: ls(TRENDS_DIR, /^\d{4}-\d{2}-\d{2}\.md$/).map((f) => f.slice(0, -3)).reverse(),
    snapshots: snaps.slice(-20).reverse(),
    snapshotCount: snaps.length,
    lastJobs: lastJobsPerStep(TRENDS_SLUG),
    busy: busy(TRENDS_SLUG),
    steps: TREND_STEPS,
  };
}

export function trendBrief(date: string): string | null {
  if (!DATE_RE.test(date)) return null;
  const f = path.join(TRENDS_DIR, `${date}.md`);
  try { return fs.statSync(f).isFile() ? fs.readFileSync(f, "utf8") : null; } catch { return null; }
}
