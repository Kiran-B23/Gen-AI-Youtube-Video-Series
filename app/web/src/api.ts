// Typed client for the app server. Every call is same-origin: the browser's basic-auth credentials ride along.
export type JobStatus = "queued" | "running" | "ok" | "failed" | "cancelled" | "interrupted";
export interface Job { id: number; slug: string; step: string; flags: string; status: JobStatus; exit_code: number | null;
  created_at: string; started_at: string | null; finished_at: string | null; position?: number | null }
export interface Step { id: string; label: string; what: string; confirm?: string; main: boolean }
export interface LogLine { seq: number; stream: "out" | "err" | "sys"; text: string; t: number }

export interface ProjectSummary {
  slug: string; format: string; engine: string; personal: boolean;
  package: { path: string; exists: boolean } | null;
  exists: Record<string, boolean | number> & { sheets: number };
  voice: boolean;
  payoffs: { failed: number | null; checked: number | null; fresh: boolean | null; ok: boolean } | null;
  qa: { passed: number; total: number; warnings: number; fresh: boolean | null } | null;
  review: { rows: number; open: number; watched: boolean; listened: boolean } | null;
  delivered: boolean; current: boolean; at?: string; mtime: string;
}
export interface PaceRow { scene: string; duration: number; words: number; wps: number; guessed: number; guessedPct: number; text: string;
  flags: { kind: "fail" | "warn"; what: string }[] }
export interface Pace { rows: PaceRow[]; delivery: number; deliveryFail: boolean; totalSeconds: number;
  limits: { target: number; sceneWarn: number; sceneMax: number; deliveryMax: number; minWordsGate: number }; accept: { accept: number; why: string } | null }
export interface ReviewRow { id: string; time: string; scene: string; finding: string; status: string; kind: "open" | "fixed" | "accepted" | "other";
  reason: string; countsAsOpen: boolean }
export interface Tick { checked: boolean; date: string | null }
export interface Check { name: string; ok: boolean; detail: string }
export interface Beat { scene: string; target: string; word: string; at: number; ok: boolean; skipped?: boolean; reason: string; mode?: string }
export interface Project extends Omit<ProjectSummary, "payoffs" | "qa" | "review"> {
  status: Pick<ProjectSummary, "payoffs" | "qa" | "review">;
  spec: { voice: { engine?: string; name?: string; model?: string; minPause: { sentence?: number; comma?: number } | null; speakers: boolean } | null;
    stage: string | null; music: string | null; padSeconds: number; pace: any };
  scenes: { id: string; type: string; section: string | null; say: string; words: number; pad: number | null; pauseAfter: string[];
    beats: { word: string; target: string; check: string | null }[] }[];
  timeline: Timeline | null;
  hfMtime: number | null;
  previewPort: number;
  pace: Pace | null;
  voicePace: { date: string; voice: string; model: string; raw_pace: number; words: number }[];
  voicePaceAll: { date: string; slug: string; voice: string; raw_pace: number; words: number }[];
  qa: { file: string; sha1: string; date: string; checks: Check[]; warnings: { name: string; detail: string }[]; pace?: any; still_pct?: number; duration?: number } | null;
  payoffs: { generated: string; summary: Record<string, number>; beats: Beat[]; captions: any[]; motion: { scene: string; longest_still_s: number; at: number; ok: boolean }[];
    camera: { scene: string; moves: number; ok: boolean }[]; warnings: string[] } | null;
  watch: { file: string; date: string; transcript: string; unclear: { scene: string; t: number; word: string; p: number }[]; pauses: [number, number][];
    pace_delivery: number; pace_by_scene: Record<string, number>; levels: Record<string, number>; gates: Check[] } | null;
  benchmark: { file: string; date: string; metrics: Record<string, number | null>; benchmark: Record<string, number | null>; ig_median: Record<string, number | null>; warnings: string[] } | null;
  review: { rows: ReviewRow[]; watched: Tick | null; listened: Tick | null; watchedGate: boolean; open: number } | null;
  sheets: string[];
  images: Record<"stills" | "review" | "transitions" | "payoffs", boolean>;
  lastJobs: Record<string, Job>;
}

export interface TimelineScene { id: string; start: number; duration: number; section: string | null; color: string | null; ink: string | null }
export interface Timeline { total: number; size: [number, number]; fps: number; mtime: number; scenes: TimelineScene[];
  beats: { scene: string; target: string; word: string; at: number }[] }

// ---------- Phase B: agent queue, sessions, package folders ----------
export type SessionStatus = "queued" | "running" | "idle" | "stopped" | "failed" | "interrupted";
export interface Session { id: number; package_id: number; sdk_session_id: string | null; status: SessionStatus; pending: string | null;
  queued_at: string | null; started_at: string | null; finished_at: string | null; turns: number; cost_usd: number | null;
  model: string | null; api_key_source: string | null; error: string | null; created_at: string }
export interface Gate { gate: string; verdict: string; scores: string | null; seq: number }
export interface Pkg { id: number; kind: "package" | "ask"; topic: string; format: string; notes: string; folder: string | null; created_at: string;
  session: Session | null; gates: Gate[] }
export interface FileGate { id: string; label: string; state: "todo" | "done" | "open" | "pass" | "bad"; verdict?: { verdict: string; scores: string | null } | null; detail?: string | null }
export interface Production { folder: string; files: { name: string; size: number; mtime: string }[]; gates: FileGate[];
  tabs: { id: string; label: string; file: string | null }[]; others: string[] }
export interface PkgView extends Pkg { production: Production | null; prompt: string; active: number | null }
export interface AgentMsg { seq: number; kind: string; data: any; t: number }

// ---------- Phase C ----------
export interface LibraryItem { file: string; slug: string; engine: string; project: boolean; size: number; deliveredAt: string; current: boolean; hasSheets: boolean;
  qa: { passed: number; total: number; warnings: number; date: string | null; forThisFile: boolean | null; duration: number | null } | null;
  benchmark: { date: string; metrics: Record<string, number | null>; reference: Record<string, number | null>; ig: Record<string, number | null> } | null;
  review: { open: number; rows: number; watched: boolean; listened: boolean } | null }
export interface PaceField { key: string; value: number; meaning: string; unit: string; min: number; max: number; int?: boolean; usedBy: string }
export interface EvalResult { fixture: string; exit: number | null; passed: number | null; total: number | null; failed: number | null;
  expected: { failed: number | null; checks: number | null; text: string } | null; ok: boolean | null; failures: string[]; output: string }
export interface Voice { name: string; takes: number; rawPace: number | null; last: { date: string; slug: string; raw_pace: number } | null }
export interface CmdOut { code: number | null; output: string }

// ---------- trend radar (references/trends/latest.json, written by studio/tools/trends.py) ----------
export interface TrendEvidence { title: string; url: string; source: string; metric: string; by: string }
export interface TrendTopic { key: string; name: string; score: number; best_vel: number; families: string[]; n_items: number; fit: number;
  first_seen: string; fresh: boolean; continuing: boolean; archetype: string; angle: string; why: string; evidence: TrendEvidence[];
  rank?: number; single?: boolean }
export interface TrendSourceStatus { ok: boolean | null; n: number; at?: string; secs?: number; note?: string; error?: string; skipped?: string }
export interface TrendLatest { date: string; generated_at: string;
  snapshots: { latest: string; previous: string | null; gap_h: number | null; files: string[] };
  counts: { items: number; excluded: number; topics: number };
  top: TrendTopic[]; watch: TrendTopic[];
  rising: { term: string; seed: string; rank: number; url: string }[];
  rising_trends: { term: string; geo: string; traffic: number; url: string; news: string }[];
  per_source: Record<string, { title: string; url: string; metric: string; by: string }[]>;
  status: Record<string, TrendSourceStatus>; briefs: string[] }
export interface Trends { latest: TrendLatest | null; briefs: string[]; snapshots: string[]; snapshotCount: number;
  lastJobs: Record<string, Job>; busy: boolean; steps: Record<string, string> }

export class ApiError extends Error { constructor(public status: number, msg: string) { super(msg); } }
async function call<T>(method: string, url: string, body?: unknown): Promise<T> {
  const r = await fetch(url, { method, headers: body ? { "content-type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new ApiError(r.status, data.error ?? r.statusText);
  return data as T;
}
export const api = {
  steps: () => call<Step[]>("GET", "/api/steps"),
  projects: () => call<ProjectSummary[]>("GET", "/api/projects"),
  project: (slug: string) => call<Project>("GET", `/api/projects/${encodeURIComponent(slug)}`),
  jobs: (slug?: string, limit = 50) => call<Job[]>("GET", `/api/jobs?limit=${limit}${slug ? `&slug=${encodeURIComponent(slug)}` : ""}`),
  run: (slug: string, step: string, opts: { confirm?: boolean; flags?: string[] } = {}) =>
    call<Job>("POST", `/api/projects/${encodeURIComponent(slug)}/steps/${step}`, opts),
  cancel: (id: number) => call<{ ok: boolean }>("POST", `/api/jobs/${id}/cancel`),
  review: (slug: string, patch: Record<string, unknown>) =>
    call<{ ok: boolean; check: { code: number | null; output: string }; project: Project }>("PATCH", `/api/projects/${encodeURIComponent(slug)}/review`, patch),
  deliverCheck: (slug: string) => call<{ deliverCheck: CmdOut; reviewCheck: CmdOut; ok: boolean }>("GET", `/api/projects/${encodeURIComponent(slug)}/deliver-check`),
  voices: () => call<Voice[]>("GET", "/api/voices"),
  voice: (slug: string, patch: Record<string, unknown>) =>
    call<{ ok: boolean; changes: string[]; job: Job | null; project: Project }>("PATCH", `/api/projects/${encodeURIComponent(slug)}/voice`, patch),
  // agent
  packages: () => call<{ items: Pkg[]; active: number | null; approvals: { id: string; session_id: number; tool: string; summary: string; created_at: string }[] }>("GET", "/api/packages"),
  pkg: (id: number) => call<PkgView>("GET", `/api/packages/${id}`),
  createPkg: (b: { kind: "package" | "ask"; topic: string; format?: string; notes?: string; folder?: string; start?: boolean }) => call<PkgView>("POST", "/api/packages", b),
  startPkg: (id: number) => call<PkgView>("POST", `/api/packages/${id}/start`),
  stopPkg: (id: number) => call<PkgView>("POST", `/api/packages/${id}/stop`),
  deletePkg: (id: number) => call<{ ok: boolean }>("DELETE", `/api/packages/${id}`),
  send: (sid: number, text: string) => call<Session>("POST", `/api/sessions/${sid}/messages`, { text }),
  approve: (id: string, decision: "allow" | "deny") => call<{ ok: boolean }>("POST", `/api/approvals/${id}`, { decision }),
  productions: () => call<{ folder: string; files: number; mtime: string; gates: FileGate[] }[]>("GET", "/api/productions"),
  production: (folder: string) => call<Production>("GET", `/api/productions/${encodeURIComponent(folder)}`),
  productionFile: (folder: string, name: string) => call<{ name: string; text: string }>("GET", `/api/productions/${encodeURIComponent(folder)}/files/${encodeURIComponent(name)}`),
  // library + settings
  library: () => call<LibraryItem[]>("GET", "/api/library"),
  pace: () => call<{ note: string; fields: PaceField[] }>("GET", "/api/settings/pace"),
  savePace: (values: Record<string, number>, why: string) => call<{ ok: boolean; changes: string[]; pace: { note: string; fields: PaceField[] } }>("PUT", "/api/settings/pace", { values, why }),
  styles: () => call<{ name: string; path: string; text: string }[]>("GET", "/api/settings/styles"),
  agents: () => call<{ name: string; path: string; text: string }[]>("GET", "/api/settings/agents"),
  runEvals: () => call<{ date: string; ok: boolean; results: EvalResult[] }>("POST", "/api/settings/evals"),
  // trend radar
  trends: () => call<Trends>("GET", "/api/trends"),
  trendBrief: (date: string) => call<{ date: string; text: string }>("GET", `/api/trends/briefs/${encodeURIComponent(date)}`),
  trendJob: (step: "snap" | "run") => call<Job>("POST", `/api/trends/jobs/${step}`),
};
export const previewUrl = (slug: string, rel = "index.html") => `/preview/${encodeURIComponent(slug)}/${rel}`;
export const shortsUrl = (name: string) => `/shorts/${encodeURIComponent(name)}`;
/** seconds → "12.3s" (the review.md time format) */
export const secs = (t: number, d = 1) => `${t.toFixed(d)}s`;
export function sceneAt(tl: Timeline | null | undefined, t: number) {
  return tl?.scenes.find((s) => t >= s.start && t < s.start + s.duration) ?? tl?.scenes[tl.scenes.length - 1] ?? null;
}
export const fileUrl = (slug: string, rel: string) => `/files/${encodeURIComponent(slug)}/${rel.split("/").map(encodeURIComponent).join("/")}`;

export function ago(iso: string | null | undefined) {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} d ago`;
}
