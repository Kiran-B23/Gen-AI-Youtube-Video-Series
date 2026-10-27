// Settings: studio/templates/reel/pace.json (edit with a required "why", appended to its "_" note), read-only views of
// the style kits' design.md and the four gate agents, and the linter evals (lint_package.py on each fixture vs the
// counts evals/README.md expects). Plus the deliver pre-check (deliver_check.py + review.py --check, both read-only).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { AGENTS_DIR, DELIVER_CHECK_PY, EVALS_DIR, LINT_PY, PACE_JSON, PIPELINE_PATH, PYTHON, REPO, STUDIO, STYLES_DIR } from "./config.js";
import { reviewCheck } from "./review.js";

/** what each pace.json number means (from the tools that read it) */
export const PACE_FIELDS: Record<string, { meaning: string; unit: string; min: number; max: number; int?: boolean; usedBy: string }> = {
  target: { meaning: "House pace: the delivery the script and the voice aim for; the pace table colours against it, and validate caps a beat's words at target × max_beat_s.", unit: "w/s", min: 1, max: 4, usedBy: "voice.py · validate.py · qa" },
  budget: { meaning: "Pace used to estimate a script's runtime from its word count (words ÷ budget) in validate.", unit: "w/s", min: 1, max: 4, usedBy: "validate.py" },
  scene_warn: { meaning: "A scene reading faster than this warns in the pace table.", unit: "w/s", min: 1, max: 5, usedBy: "voice.py · app pace table" },
  scene_max: { meaning: "A scene reading faster than this fails (scenes under min_words_gate words only warn).", unit: "w/s", min: 1, max: 5, usedBy: "voice.py · qa" },
  delivery_max: { meaning: "The whole video's delivery pace (all words ÷ total speech time incl. pads) fails above this.", unit: "w/s", min: 1, max: 5, usedBy: "voice.py · qa" },
  raw_take_retake: { meaning: "A scene whose raw take reads faster than this can't be fixed with pauses: cut words or retake.", unit: "w/s", min: 1, max: 6, usedBy: "voice.py (ladder hint)" },
  pause_sentence: { meaning: "Default minimum pause after a sentence (voice.minPause.sentence overrides per project).", unit: "s", min: 0, max: 2, usedBy: "voice.py" },
  pause_sentence_max: { meaning: "Cap for the sentence pause so a read never turns choppy.", unit: "s", min: 0, max: 2, usedBy: "voice.py" },
  pause_comma: { meaning: "Default minimum pause after a comma (voice.minPause.comma overrides).", unit: "s", min: 0, max: 1, usedBy: "voice.py" },
  pause_comma_max: { meaning: "Cap for the comma pause.", unit: "s", min: 0, max: 1, usedBy: "voice.py" },
  pad_section_end: { meaning: "The per-scene \"pad\" (hold) the pace ladder suggests at a section end.", unit: "s", min: 0, max: 3, usedBy: "docs · ladder" },
  max_change_s: { meaning: "Longest a frame may go without a visible change (payoffs / qa still checks).", unit: "s", min: 0.5, max: 10, usedBy: "qa · payoffs" },
  max_beat_s: { meaning: "Longest beat in a reel.", unit: "s", min: 1, max: 20, usedBy: "validate.py" },
  max_beat_s_long: { meaning: "Longest beat in long-form.", unit: "s", min: 1, max: 60, usedBy: "validate.py" },
  min_words_gate: { meaning: "Scenes with fewer words only warn on pace (short lines measure noisily).", unit: "words", min: 1, max: 40, int: true, usedBy: "voice.py · app pace table" },
};

export function readPaceFile(file = PACE_JSON) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
  return {
    note: typeof raw._ === "string" ? raw._ : "",
    fields: Object.entries(raw).filter(([k, v]) => k !== "_" && typeof v === "number").map(([k, v]) => ({ key: k, value: v as number, ...(PACE_FIELDS[k] ?? { meaning: "(not documented in the app)", unit: "", min: -1e9, max: 1e9, usedBy: "" }) })),
  };
}

export class SettingsError extends Error { constructor(public code: number, msg: string) { super(msg); } }

/** Python's json.dump(ensure_ascii=True) style, which is how pace.json is written ("÷" as ÷) */
const asciiJson = (v: unknown, indent: number) => JSON.stringify(v, null, indent).replace(/[\u007f-￿]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));

/** validate + write; appends "(app, <date>: k a → b, …: <why>)" to the "_" note. Returns the change list. */
export function writePace(values: Record<string, unknown>, why: string, file = PACE_JSON) {
  const reason = String(why ?? "").replace(/\s+/g, " ").trim();
  if (reason.length < 8) throw new SettingsError(400, "a one-line \"why\" (8+ characters) is required: it is appended to pace.json's note");
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
  const next = { ...raw };
  const changes: string[] = [];
  for (const [k, v] of Object.entries(values ?? {})) {
    if (k === "_" || typeof raw[k] !== "number") throw new SettingsError(400, `unknown field: ${k}`);
    const n = typeof v === "string" ? Number(v) : v;
    const f = PACE_FIELDS[k];
    if (typeof n !== "number" || !Number.isFinite(n)) throw new SettingsError(400, `${k}: not a number`);
    if (f && (n < f.min || n > f.max)) throw new SettingsError(400, `${k}: ${n} is outside ${f.min}–${f.max} ${f.unit}`);
    if (f?.int && !Number.isInteger(n)) throw new SettingsError(400, `${k}: must be a whole number`);
    if (n !== raw[k]) { changes.push(`${k} ${raw[k]} → ${n}`); next[k] = n; }
  }
  const g = (k: string) => next[k] as number;
  const rel: [string, string][] = [["scene_warn", "scene_max"], ["pause_sentence", "pause_sentence_max"], ["pause_comma", "pause_comma_max"],
    ["max_beat_s", "max_beat_s_long"], ["target", "delivery_max"], ["target", "scene_warn"]];
  for (const [a, b] of rel) if (typeof next[a] === "number" && typeof next[b] === "number" && g(a) > g(b)) throw new SettingsError(400, `${a} (${g(a)}) must not exceed ${b} (${g(b)})`);
  if (!changes.length) throw new SettingsError(400, "nothing changed");
  const date = new Date().toLocaleDateString("sv-SE");
  next._ = `${String(raw._ ?? "").trim()} (app, ${date}: ${changes.join(", ")}: ${reason.replace(/[()]/g, "")})`;
  const tmp = path.join(path.dirname(file), `.pace.json.app-${process.pid}.tmp`);
  fs.writeFileSync(tmp, asciiJson(next, 2) + "\n");
  fs.renameSync(tmp, file);
  return changes;
}

export function styles() {
  let dirs: string[] = [];
  try { dirs = fs.readdirSync(STYLES_DIR).filter((d) => fs.existsSync(path.join(STYLES_DIR, d, "design.md"))).sort(); } catch { /* none */ }
  return dirs.map((d) => ({ name: d, path: path.relative(REPO, path.join(STYLES_DIR, d, "design.md")), text: fs.readFileSync(path.join(STYLES_DIR, d, "design.md"), "utf8") }));
}

export function agents() {
  let files: string[] = [];
  try { files = fs.readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".md")).sort(); } catch { /* none */ }
  return files.map((f) => ({ name: f.replace(/\.md$/, ""), path: path.relative(REPO, path.join(AGENTS_DIR, f)), text: fs.readFileSync(path.join(AGENTS_DIR, f), "utf8") }));
}

function run(cmd: string, args: string[], cwd: string, timeoutMs = 120000): Promise<{ code: number | null; output: string }> {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, env: { ...process.env, PATH: PIPELINE_PATH, PYTHONUNBUFFERED: "1", NO_COLOR: "1" } });
    let out = "";
    const t = setTimeout(() => p.kill("SIGTERM"), timeoutMs);
    p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d));
    p.on("close", (code) => { clearTimeout(t); resolve({ code, output: out.trim() }); });
    p.on("error", (e) => { clearTimeout(t); resolve({ code: -1, output: String(e) }); });
  });
}

/** what evals/README.md says each linter fixture must produce */
export function expectedEvals(): Record<string, { failed: number | null; checks: number | null; text: string }> {
  const md = fs.readFileSync(path.join(EVALS_DIR, "README.md"), "utf8");
  const out: Record<string, { failed: number | null; checks: number | null; text: string }> = {};
  for (const line of md.split("\n")) {
    if (!line.includes("lint_package.py")) continue;
    const cell = line.split("|").map((c) => c.trim())[3] ?? "";
    // "good: 0 ✗ (41 checks) · bad: every planted error ✗ (currently 13 …"
    const good = cell.match(/good:\s*(\d+)\s*✗\s*\((\d+) checks\)/);
    if (good && line.includes("fixtures/good-reel")) out["good-reel"] = { failed: +good[1], checks: +good[2], text: cell };
    const cur = cell.match(/currently (\d+)/);
    if (cur && line.includes("bad-reel")) out["bad-reel"] = { failed: +cur[1], checks: null, text: cell };
    const exact = cell.match(/exactly (\d+) ✗/);
    const named = line.match(/fixtures\/(bad-[a-z]+)`/);
    if (exact && named) out[named[1]] = { failed: +exact[1], checks: null, text: cell };
    const gr = cell.match(/good-reel: (\d+) ✗ across all (\d+) checks/);
    if (gr && !out["good-reel"]) out["good-reel"] = { failed: +gr[1], checks: +gr[2], text: cell };
  }
  return out;
}

let evalsRunning = false;
export async function runEvals() {
  if (evalsRunning) throw new SettingsError(409, "the evals are already running");
  evalsRunning = true;
  try {
    const fx = path.join(EVALS_DIR, "fixtures");
    const expected = expectedEvals();
    const results = [];
    for (const name of fs.readdirSync(fx).filter((d) => fs.statSync(path.join(fx, d)).isDirectory()).sort()) {
      const r = await run("python3", [LINT_PY, path.join(fx, name)], REPO);
      // "lint_package: 36/41 passed · FAILED: 5"  or  "lint_package: 41/41 passed"
      const m = r.output.match(/lint_package:\s*(\d+)\/(\d+) passed/);
      const passed = m ? +m[1] : null, total = m ? +m[2] : null, failed = m ? total! - passed! : null;
      const exp = expected[name] ?? null;
      const ok = exp?.failed != null && failed != null ? failed === exp.failed && (exp.checks == null || exp.checks === total) : null;
      results.push({ fixture: name, exit: r.code, passed, total, failed, expected: exp, ok,
        failures: r.output.split("\n").filter((l) => l.trim().startsWith("✗")).map((l) => l.trim()), output: r.output.slice(-6000) });
    }
    return { date: new Date().toISOString(), results, ok: results.every((r) => r.ok !== false) };
  } finally { evalsRunning = false; }
}

/** What deliver will say, without delivering: deliver_check.py (qa / payoffs / watch) and review.py --check. */
export async function deliverPreview(slug: string, p: string) {
  const mp4 = path.join(p, "out", `${slug}.mp4`);
  const gate = fs.existsSync(mp4) ? await run(PYTHON, [DELIVER_CHECK_PY, slug, mp4], STUDIO) : { code: 1, output: `no out/${slug}.mp4: render first` };
  const review = await reviewCheck(slug);
  return { deliverCheck: gate, reviewCheck: review, ok: gate.code === 0 && review.code === 0 };
}
