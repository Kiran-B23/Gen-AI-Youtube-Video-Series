// Read-only views of studio/projects/<slug>/: what exists, what is fresh, and the parsed artefacts.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { PROJECTS, REPO, SHORTS, VOICE_PACE_JSON, projectDir } from "./config.js";
import { paceTable } from "./pace.js";
import { parseReview } from "./review.js";
import { lastJobsPerStep } from "./jobs.js";

const stat = (f: string) => { try { return fs.statSync(f); } catch { return null; } };
function readJson(f: string): any {
  try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; }
}

// sha1 of a file, cached by (path, size, mtime): qa.json / payoffs.json record the sha1 of what they checked
const shaCache = new Map<string, { key: string; sha: string }>();
function sha1(f: string): string | null {
  const s = stat(f); if (!s) return null;
  const key = `${s.size}:${s.mtimeMs}`; const c = shaCache.get(f);
  if (c?.key === key) return c.sha;
  const sha = crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex");
  shaCache.set(f, { key, sha });
  return sha;
}

function files(p: string, slug: string) {
  const o = path.join(p, "out");
  const f = {
    scenes: path.join(p, "scenes.json"), timings: path.join(p, "build", "timings.json"), layout: path.join(p, "build", "layout.json"),
    hf: path.join(p, "hf", "index.html"), payoffs: path.join(o, "payoffs.json"), mp4: path.join(o, `${slug}.mp4`),
    qa: path.join(o, "qa.json"), watch: path.join(o, "watch.json"), benchmark: path.join(o, "benchmark.json"),
    review: path.join(p, "review.md"), stills: path.join(o, "stills.png"), reviewPng: path.join(o, "review.png"),
    transitionsPng: path.join(o, "transitions.png"), payoffsPng: path.join(o, "payoffs.png"),
  };
  return f;
}

function sheets(p: string): string[] {
  const d = path.join(p, "out", "watch");
  try { return fs.readdirSync(d).filter((n) => /^sheet-\d+\.png$/.test(n)).sort(); } catch { return []; }
}

function delivered(slug: string, mp4: string) {
  const d = path.join(SHORTS, `${slug}.mp4`); const ds = stat(d); const ms = stat(mp4);
  if (!ds) return { delivered: false, current: false };
  return { delivered: true, current: !!ms && ds.size === ms.size, at: ds.mtime.toISOString() };
}

/** status chips + freshness, cheap enough for the list (sha1s are cached) */
function summarize(slug: string, p: string) {
  const f = files(p, slug);
  const exists = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, !!stat(v)])) as Record<keyof typeof f, boolean>;
  const spec = readJson(f.scenes) ?? {};
  const qa = exists.qa ? readJson(f.qa) : null;
  const po = exists.payoffs ? readJson(f.payoffs) : null;
  const mp4sha = exists.mp4 && (qa || po) ? sha1(f.mp4) : null;
  const hfsha = exists.hf && po ? sha1(f.hf) : null;
  const review = exists.review ? parseReview(fs.readFileSync(f.review, "utf8")) : null;
  const mtimes = Object.values(f).map((v) => stat(v)?.mtimeMs ?? 0);
  const pkg = typeof spec.package === "string" ? spec.package : null;
  return {
    slug,
    title: spec.title ?? null,
    format: spec.format ?? "reel",
    engine: spec.engine ?? "hyperframes",
    personal: slug.startsWith("personal-"),
    package: pkg ? { path: pkg, exists: fs.existsSync(path.join(REPO, pkg)) } : null,
    exists: { ...exists, sheets: sheets(p).length },
    voice: exists.timings,
    payoffs: po ? { failed: po.summary?.failed ?? null, checked: po.summary?.checked ?? null, fresh: hfsha ? po.index_sha1 === hfsha : null,
      ok: (po.summary?.failed ?? 1) === 0 && (po.summary?.caption_overflow ?? 0) === 0 && (po.summary?.still_scenes ?? 0) === 0 } : null,
    qa: qa ? { passed: (qa.checks ?? []).filter((c: any) => c.ok).length, total: (qa.checks ?? []).length,
      warnings: (qa.warnings ?? []).length, fresh: mp4sha ? qa.sha1 === mp4sha : null } : null,
    review: review ? { rows: review.rows.length, open: review.open, watched: review.watchedGate, listened: !!review.listened?.checked } : null,
    ...delivered(slug, f.mp4),
    mtime: new Date(Math.max(...mtimes)).toISOString(),
  };
}

/** build/layout.json → what the players draw on the scrub bar: scenes (section colours) and beat ticks */
function timeline(file: string) {
  const L = readJson(file);
  if (!L) return null;
  const sections = L.sections ?? {};
  return {
    total: L.total as number, size: (L.size ?? [1080, 1920]) as [number, number], fps: 30, mtime: stat(file)?.mtimeMs ?? 0,
    scenes: (L.scenes ?? []).map((s: any) => ({ id: s.id, start: s.start, duration: s.duration, section: s.section ?? null,
      color: sections[s.section]?.bg ?? null, ink: sections[s.section]?.text ?? null })),
    beats: (L.beats ?? []).map((b: any) => ({ scene: b.scene, target: b.target, word: b.word, at: b.at })),
  };
}

export function listProjects() {
  return fs.readdirSync(PROJECTS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && projectDir(d.name))
    .map((d) => summarize(d.name, path.join(PROJECTS, d.name)))
    .sort((a, b) => b.mtime.localeCompare(a.mtime));
}

export function getProject(slug: string) {
  const p = projectDir(slug); if (!p) return null;
  const f = files(p, slug);
  const spec = readJson(f.scenes) ?? {};
  const timings = readJson(f.timings);
  const reviewText = stat(f.review) ? fs.readFileSync(f.review, "utf8") : null;
  const review = reviewText ? parseReview(reviewText) : null;
  const voicePace = (readJson(VOICE_PACE_JSON) ?? []) as any[];
  const scenes = (spec.scenes ?? []).map((s: any) => ({
    id: s.id, type: s.type, section: s.section ?? null, say: s.say ?? "",
    pad: typeof s.pad === "number" ? s.pad : null, pauseAfter: Array.isArray(s.pauseAfter) ? s.pauseAfter : [],
    words: String(s.say ?? "").split(/\s+/).filter(Boolean).length,
    beats: (s.beats ?? []).map((b: any) => ({ word: b.word, target: b.target, check: b.check ?? null })),
  }));
  const po = readJson(f.payoffs);
  const sum = summarize(slug, p);
  return {
    ...sum,
    // the chips/freshness (the raw artefacts below reuse the names payoffs / qa / review)
    status: { payoffs: sum.payoffs, qa: sum.qa, review: sum.review },
    spec: { voice: spec.voice ? { engine: spec.voice.engine, name: spec.voice.name, model: spec.voice.model, minPause: spec.voice.minPause ?? null,
      speakers: !!spec.voice.speakers } : null,
      stage: spec.stage?.kit ?? null, music: spec.music ?? null, padSeconds: spec.padSeconds ?? 0.3, pace: spec.pace ?? null },
    scenes,
    pace: timings ? paceTable(timings, spec) : null,
    timeline: timeline(f.layout),
    hfMtime: stat(f.hf)?.mtimeMs ?? null,
    voicePace: voicePace.filter((v) => v.slug === slug),
    voicePaceAll: voicePace,
    qa: readJson(f.qa),
    // tweens are the timeline dump (large, not needed by the UI)
    payoffs: po ? { ...po, tweens: undefined } : null,
    watch: readJson(f.watch),
    benchmark: readJson(f.benchmark),
    review: review ? { rows: review.rows.map(({ line, ...r }) => r), watched: review.watched && { checked: review.watched.checked, date: review.watched.date },
      listened: review.listened && { checked: review.listened.checked, date: review.listened.date }, watchedGate: review.watchedGate, open: review.open } : null,
    sheets: sheets(p),
    images: { stills: !!stat(f.stills), review: !!stat(f.reviewPng), transitions: !!stat(f.transitionsPng), payoffs: !!stat(f.payoffsPng) },
    lastJobs: lastJobsPerStep(slug),
  };
}

// ---------- Library: every reel in shorts/ matched to its project, with the qa / benchmark numbers ----------
export function library() {
  let names: string[] = [];
  try { names = fs.readdirSync(SHORTS).filter((n) => n.endsWith(".mp4") && !n.startsWith(".")); } catch { /* no shorts/ yet */ }
  return names.map((name) => {
    const base = name.replace(/\.mp4$/, ""), remotion = base.endsWith("-remotion"), slug = remotion ? base.slice(0, -9) : base;
    const d = stat(path.join(SHORTS, name))!;
    const p = projectDir(slug);
    const out = p ? path.join(p, "out") : null;
    const mp4 = out ? path.join(out, name) : null;
    const ms = mp4 ? stat(mp4) : null;
    // qa.json / benchmark.json describe the last checked render (deliver_check reads qa.json for both engines);
    // forThisFile says whether that is the delivered file
    const qa = out ? readJson(path.join(out, "qa.json")) : null;
    const bm = out ? readJson(path.join(out, "benchmark.json")) : null;
    const review = p && fs.existsSync(path.join(p, "review.md")) ? parseReview(fs.readFileSync(path.join(p, "review.md"), "utf8")) : null;
    return {
      file: name, slug, engine: remotion ? "remotion" : "hyperframes", project: !!p, size: d.size, deliveredAt: d.mtime.toISOString(),
      // same bytes as the project's current render? (size first; sha1 only when sizes match)
      current: !!ms && ms.size === d.size && sha1(mp4!) === sha1(path.join(SHORTS, name)),
      hasSheets: p ? sheets(p).length > 0 : false,
      qa: qa ? { passed: (qa.checks ?? []).filter((c: any) => c.ok).length, total: (qa.checks ?? []).length, warnings: (qa.warnings ?? []).length,
        date: qa.date ?? null, forThisFile: qa.sha1 ? qa.sha1 === sha1(path.join(SHORTS, name)) : null, duration: qa.duration ?? null } : null,
      benchmark: bm ? { date: bm.date, metrics: bm.metrics ?? {}, reference: bm.benchmark ?? {}, ig: bm.ig_median ?? {} } : null,
      review: review ? { open: review.open, rows: review.rows.length, watched: review.watchedGate, listened: !!review.listened?.checked } : null,
    };
  }).sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));
}
