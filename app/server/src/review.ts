// review.md: read and edit in exactly the format studio/tools/review.py writes, then let review.py re-validate.
// Edits are line-level: only the touched row (or tick line) changes; everything else in the file is kept byte for byte.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import { PIPELINE_PATH, PYTHON, REVIEW_PY, STUDIO } from "./config.js";

// the same row pattern as review.py (re.M): | id | time | scene | finding | status |
const ROW_RE = /^\| (?<id>[^|]+?) \| (?<time>[^|]*?) \| (?<scene>[^|]*?) \| (?<finding>.*?) \| (?<status>[^|]*?) \|$/;
const TICK_RE = /^- \[(?<mark>[ x])\] (?<label>Watched end to end|Listened on a phone with sound)(?<middle>.*?) · (?<date><date>|\d{4}-\d{2}-\d{2})(?<tail>.*)$/;

export type RowStatus = "open" | "fixed" | "accepted";
export interface ReviewRow { id: string; time: string; scene: string; finding: string; status: string; kind: RowStatus | "other"; reason: string;
  /** review.py counts a row as open when its status starts with "open" (any case), e.g. "open (needs the user's ear)" */ countsAsOpen: boolean; line: number }
export interface Tick { checked: boolean; date: string | null; line: number; text: string }

export function parseReview(text: string) {
  const lines = text.split("\n");
  const rows: ReviewRow[] = [];
  let watched: Tick | null = null, listened: Tick | null = null;
  lines.forEach((l, i) => {
    const m = l.match(ROW_RE);
    if (m?.groups) {
      const id = m.groups.id.trim();
      if (id === "id" || id === "---") return;
      const status = m.groups.status.trim();
      const km = status.match(/^(open|fixed|accepted)\b\s*(?:\((.*)\))?\s*$/s);
      rows.push({ id, time: m.groups.time.trim(), scene: m.groups.scene.trim(), finding: m.groups.finding.trim(), status,
        kind: (km?.[1] as RowStatus) ?? "other", reason: km?.[2]?.trim() ?? "", countsAsOpen: status.toLowerCase().startsWith("open"), line: i });
      return;
    }
    const t = l.match(TICK_RE);
    if (t?.groups) {
      const tick = { checked: t.groups.mark === "x", date: t.groups.date === "<date>" ? null : t.groups.date, line: i, text: l };
      if (t.groups.label.startsWith("Watched")) watched = tick; else listened = tick;
    }
  });
  // review.py's own test for the deliver gate: /- \[x\] Watched end to end/
  const watchedGate = /- \[x\] Watched end to end/.test(text);
  return { rows, watched: watched as Tick | null, listened: listened as Tick | null, watchedGate, open: rows.filter((r) => r.countsAsOpen).length };
}

const clean = (s: string) => s.replace(/[|\r\n]+/g, " ").replace(/\s+/g, " ").trim();
const today = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, local time (review.py uses time.strftime)

function writeAtomic(file: string, text: string) {
  const tmp = path.join(path.dirname(file), `.review.md.app-${process.pid}.tmp`);
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
}

export type ReviewPatch =
  | { op: "row"; id: string; status: RowStatus; reason?: string }
  | { op: "tick"; which: "watched" | "listened"; checked: boolean }
  | { op: "add"; id: string; time?: string; scene?: string; finding: string };

/** the user's listened seal: studio/watched/<slug>.json, the sha1 of each MP4 the user watched and listened to on a phone.
 *  It sits outside the agent's writable folders (sandbox + policy.ts), so an agent session can tick review.md but can never
 *  pass deliver's check (deliver_check.py). Written only here (the Review page's "Listened" tick) or by
 *  `review.py <slug> --listened` in the user's terminal. */
export function sealWatched(slug: string, checked: boolean) {
  const dir = path.join(STUDIO, "watched"), seal = path.join(dir, `${slug}.json`);
  if (!checked) { fs.rmSync(seal, { force: true }); return; }
  const out = path.join(STUDIO, "projects", slug, "out");
  const files: Record<string, string> = {};
  for (const f of [`${slug}.mp4`, `${slug}-remotion.mp4`]) {
    const fp = path.join(out, f);
    if (fs.existsSync(fp)) files[f] = crypto.createHash("sha1").update(fs.readFileSync(fp)).digest("hex");
  }
  if (!Object.keys(files).length) throw new ReviewError(409, "no rendered MP4 to mark as listened: render first");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(seal, JSON.stringify({ date: today(), by: "app", files }, null, 1) + "\n");
}

export class ReviewError extends Error { constructor(public code: number, msg: string) { super(msg); } }

export function applyPatch(file: string, patch: ReviewPatch) {
  if (!fs.existsSync(file)) {
    // the owner's first note on a video that has no fix list yet: start one from the template
    if (patch.op !== "add") throw new ReviewError(404, "no review.md yet: run the review step first");
    const slug = path.basename(path.dirname(file));
    fs.writeFileSync(file, fs.readFileSync(path.join(STUDIO, "templates", "project", "review.md"), "utf8").replace("__SLUG__", slug));
  }
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  const parsed = parseReview(text);
  if (patch.op === "row") {
    const row = parsed.rows.find((r) => r.id === patch.id);
    if (!row) throw new ReviewError(404, `no row ${patch.id}`);
    if (!["open", "fixed", "accepted"].includes(patch.status)) throw new ReviewError(400, "status must be open, fixed or accepted");
    const reason = clean(patch.reason ?? "");
    if (patch.status !== "open" && !reason) throw new ReviewError(400, `"${patch.status}" needs a reason (what changed / why it is fine)`);
    // "open" is written bare (review.py and deliver count any status starting with "open" as open)
    const status = patch.status === "open" ? "open" : `${patch.status} (${reason})`;
    lines[row.line] = `| ${row.id} | ${row.time} | ${row.scene} | ${row.finding} | ${status} |`;
  } else if (patch.op === "tick") {
    const t = patch.which === "watched" ? parsed.watched : parsed.listened;
    if (!t) throw new ReviewError(409, `review.md has no "${patch.which === "watched" ? "Watched end to end" : "Listened on a phone with sound"}" line`);
    const m = lines[t.line].match(TICK_RE)!.groups!;
    lines[t.line] = `- [${patch.checked ? "x" : " "}] ${m.label}${m.middle} · ${patch.checked ? today() : "<date>"}${m.tail}`;
    if (patch.which === "listened") sealWatched(path.basename(path.dirname(file)), patch.checked);
  } else if (patch.op === "add") {
    const id = clean(patch.id), finding = clean(patch.finding);
    if (!id || !finding || id === "id" || id === "---") throw new ReviewError(400, "a row needs an id and a finding");
    if (parsed.rows.some((r) => r.id === id)) throw new ReviewError(409, `row ${id} exists`);
    const header = lines.findIndex((l) => l === "| id | time | scene | finding | status |");
    if (header < 0 || lines[header + 1] !== "|---|---|---|---|---|") throw new ReviewError(409, "review.md has no findings table");
    let at = header + 2;
    while (at < lines.length && ROW_RE.test(lines[at])) at++;
    lines.splice(at, 0, `| ${id} | ${clean(patch.time ?? "")} | ${clean(patch.scene ?? "")} | ${finding} | open |`);
  } else throw new ReviewError(400, "unknown op");
  writeAtomic(file, lines.join("\n"));
}

/** review.py <slug> --check: read-only re-validation (exit 1 = open rows or a tick is missing). */
export function reviewCheck(slug: string): Promise<{ code: number | null; output: string }> {
  return new Promise((resolve) => {
    const p = spawn(PYTHON, [REVIEW_PY, slug, "--check"], { cwd: STUDIO, env: { ...process.env, PATH: PIPELINE_PATH } });
    let out = "";
    p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d));
    p.on("close", (code) => resolve({ code, output: out.trim() }));
    p.on("error", (e) => resolve({ code: -1, output: String(e) }));
  });
}
