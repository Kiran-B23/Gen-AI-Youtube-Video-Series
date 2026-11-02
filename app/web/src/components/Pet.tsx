// The run pet: a pixel-art helper that walks between the stations of a long job and acts out what it is doing right now.
//   ScriptPet: a video's script stage on the Video page (the video-scripter files the agent has written so far)
//   BuildPet: a video's build line on the Video page (run.sh steps from the app's job queue)
//   RunPet:   a Kaggle experiment run (run-plan.json + the progress events kaggle.sh watch relays from ntfy.sh)
// The one place in the app that moves on its own (owner's request, 2026-10-29): stepped sprite motion only, and none at all
// under reduced motion (pet.css).
import { useEffect, useState, type ReactNode } from "react";
import type { RunEvent, RunInfo, RunStage, VideoDetail } from "../api";
import "./pet.css";

type Activity = "idle" | "sleep" | "setup" | "load" | "still" | "clip" | "pack" | "other" | "dizzy" | "wait" | "read" | "cheer"
  | "voice" | "build" | "check";
interface JobState { state: RunEvent["state"]; t: number; secs?: number; vram?: number; error?: string }
interface Station { key: string; label: string; done: number; failed: number; total: number; secs: number; running?: boolean }
export interface RunView { stations: Station[]; at: number; activity: Activity; caption: string; detail: string; eta: number | null; live: boolean }

const KIND_ACT: Record<string, Activity> = { setup: "setup", still: "still", clip: "clip", pack: "pack" };
const fmt = (s: number) => (s >= 3600 ? `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min` : s >= 60 ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : `${Math.round(s)} s`);
const clock = (ms: number) => new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
/** a stage-level event (job null) on a one-job stage named like the stage (setup, pack) counts as that job */
const jobOf = (st: RunStage | undefined, e: RunEvent) => e.job ?? (st && st.jobs.length === 1 && st.jobs[0].id === st.key ? st.key : null);

export function runView(run: RunInfo, nowMs: number): RunView {
  const stages = run.plan.stages, p = run.progress;
  const events = [...(p?.events ?? [])].sort((a, b) => a.t - b.t);
  const jobs = new Map<string, JobState>(), loaded = new Set<string>();
  for (const e of events) {
    const st = stages.find((s) => s.key === e.stage), j = jobOf(st, e);
    if (j) jobs.set(`${e.stage}/${j}`, { state: e.state, t: e.t, secs: e.secs, vram: e.vram_gb, error: e.error });
    else if (e.state === "done") loaded.add(e.stage);
  }
  const js = (s: RunStage, id: string) => jobs.get(`${s.key}/${id}`);
  const stations: Station[] = [
    ...stages.map((s) => ({ key: s.key, label: s.label, total: s.jobs.length,
      done: s.jobs.filter((j) => js(s, j.id)?.state === "done").length, failed: s.jobs.filter((j) => js(s, j.id)?.state === "error").length,
      secs: s.jobs.reduce((n, j) => n + (js(s, j.id)?.secs ?? 0), 0) })),
    { key: "fetch", label: "Fetch", total: 1, done: run.fetched ? 1 : 0, failed: 0, secs: 0 },
    { key: "review", label: "Review", total: 1, done: run.reviewed ? 1 : 0, failed: 0, secs: 0 },
  ];
  const FETCH = stages.length, REVIEW = stages.length + 1;
  const status = p?.status ?? "", last = events.at(-1);
  const since = (iso?: string) => (iso ? Math.max(0, (nowMs - Date.parse(iso)) / 1000) : 0);

  // ETA: what's left at the planned pace, rescaled per stage by how its finished jobs actually went
  const eta = (): number | null => {
    if (status !== "running" && status !== "queued") return null;
    let left = 0;
    for (const s of stages) {
      const done = s.jobs.filter((j) => js(s, j.id)?.secs);
      const scale = done.length ? done.reduce((n, j) => n + js(s, j.id)!.secs! / j.expect, 0) / done.length : 1;
      const started = s.jobs.some((j) => js(s, j.id)) || loaded.has(s.key);
      if (s.load && !started) left += s.load;
      for (const j of s.jobs) {
        const st = js(s, j.id);
        if (!st) left += j.expect * scale;
        else if (st.state === "start") left += Math.max(0, j.expect * scale - (nowMs / 1000 - st.t));
      }
    }
    return nowMs + left * 1000;
  };

  const base = { stations, eta: eta(), live: status === "queued" || status === "running" };
  if (!p) return { ...base, at: 0, activity: "idle", caption: "Not pushed yet.", detail: "Push with experiments/kaggle.sh to watch it run here." };
  if (status === "queued") return { ...base, at: 0, activity: "sleep", caption: "Queued on Kaggle, waiting for a machine.", detail: `${fmt(since(p.pushed_at))} since the push` };
  if (status === "running") {
    if (!last) return { ...base, at: 0, activity: "setup", caption: "Kaggle started the notebook.", detail: "Waiting for its first progress line." };
    const si = Math.max(0, stages.findIndex((s) => s.key === last.stage)), s = stages[si], j = jobOf(s, last);
    const n = s ? s.jobs.findIndex((x) => x.id === j) : -1, expect = n >= 0 ? s.jobs[n].expect : s?.load ?? 0;
    const el = nowMs / 1000 - last.t, label = s?.label ?? last.stage;
    if (last.state === "start" && !j)
      return { ...base, at: si, activity: "load", caption: `Loading the model for ${label.toLowerCase()}.`, detail: `${fmt(el)}${expect ? ` of ~${fmt(expect)}` : ""}` };
    if (last.state === "start")
      return { ...base, at: si, activity: KIND_ACT[s?.kind ?? ""] ?? "other",
        caption: s.jobs.length > 1 ? `${label}: making ${j} (${n + 1} of ${s.jobs.length}).` : `${label}…`, detail: `${fmt(el)}${expect ? ` of ~${fmt(expect)}` : ""}` };
    if (last.state === "error")
      return { ...base, at: si, activity: "dizzy", caption: `${j ?? label} failed: ${last.error ?? "error"}. The run carries on.`, detail: `${fmt(el)} ago` };
    // a job just finished: walk on to the next station with work left
    const next = stages.findIndex((x, i) => i >= si && x.jobs.some((y) => !js(x, y.id) || js(x, y.id)!.state === "start"));
    const ni = next < 0 ? FETCH : next;
    return { ...base, at: ni, activity: "idle", caption: `Finished ${j ?? label}${last.secs ? ` in ${fmt(last.secs)}` : ""}.`,
      detail: ni === FETCH ? "Wrapping up the notebook." : `Next: ${stages[ni].label.toLowerCase()}.` };
  }
  if (status === "complete") {
    if (!run.fetched) return { ...base, at: FETCH, activity: "wait", caption: "Kaggle finished. The results are waiting to be fetched.", detail: `finished ${fmt(since(p.status_at))} ago` };
    if (!run.reviewed) return { ...base, at: REVIEW, activity: "read", caption: "Fetched. Reading the contact sheets for RESULTS.md.", detail: "" };
    return { ...base, at: REVIEW, activity: "cheer", caption: "Reviewed. This run is done.", detail: "" };
  }
  const si = last ? Math.max(0, stages.findIndex((s) => s.key === last.stage)) : 0;
  return { ...base, at: si, activity: "dizzy", caption: `Kaggle stopped the run (${status || "unknown"}).`, detail: p.message ?? "" };
}

/** 48×32 pixel sprite: the pet on the left, its prop for the activity on the right */
function Sprite({ activity, walking }: { activity: Activity; walking: boolean }) {
  const eyesShut = activity === "sleep";
  return (
    <svg viewBox="0 0 48 32" className={`pet__svg act-${walking ? "walk" : activity}`} shapeRendering="crispEdges" aria-hidden="true">
      <g className="pet__whole">
        <g className="pet__body">
          <rect x="8" y="5" width="4" height="4" className="c-body" /><rect x="20" y="5" width="4" height="4" className="c-body" />
          <rect x="6" y="8" width="20" height="16" className="c-body" />
          <rect x="9" y="11" width="14" height="9" className="c-face" />
          {eyesShut
            ? <><rect x="11" y="16" width="3" height="1" className="c-ink" /><rect x="18" y="16" width="3" height="1" className="c-ink" /></>
            : <g className="pet__eyes"><rect x="12" y="14" width="2" height="3" className="c-ink" /><rect x="18" y="14" width="2" height="3" className="c-ink" /></g>}
          <rect x="10" y="18" width="2" height="1" className="c-amber" /><rect x="20" y="18" width="2" height="1" className="c-amber" />
          {activity === "cheer"
            ? <><rect x="3" y="6" width="3" height="2" className="c-body" /><rect x="26" y="6" width="3" height="2" className="c-body" /></>
            : <rect x="26" y="16" width="3" height="2" className="c-body" />}
        </g>
        <g className="pet__legs-a"><rect x="9" y="24" width="3" height="4" className="c-body" /><rect x="20" y="24" width="3" height="4" className="c-body" /></g>
        <g className="pet__legs-b"><rect x="11" y="24" width="3" height="3" className="c-body" /><rect x="18" y="24" width="3" height="3" className="c-body" /></g>
      </g>
      {!walking && <Prop activity={activity} />}
    </svg>
  );
}

function Prop({ activity }: { activity: Activity }) {
  switch (activity) {
    case "setup": return <g className="prop prop--swing"><rect x="29" y="10" width="2" height="8" className="c-ink" /><rect x="27" y="7" width="6" height="3" className="c-ink" /><rect x="29" y="7" width="2" height="1" className="c-amber" /></g>;
    case "load": case "wait": return <g className="prop"><rect x="29" y="13" width="11" height="10" className="c-amber" /><rect x="29" y="17" width="11" height="1" className="c-ink" /><rect x="34" y="13" width="1" height="10" className="c-ink" /></g>;
    case "pack": return <g className="prop"><rect x="29" y="13" width="11" height="10" className="c-amber" /><rect x="29" y="17" width="11" height="2" className="c-face prop--tape" /></g>;
    case "still": return <g className="prop">
      <rect x="34" y="5" width="12" height="12" className="c-ink" /><rect x="35" y="6" width="10" height="10" className="c-face" />
      <rect x="35" y="17" width="1" height="8" className="c-ink" /><rect x="44" y="17" width="1" height="8" className="c-ink" />
      <rect x="37" y="8" width="2" height="2" className="c-body prop--dot1" /><rect x="40" y="11" width="3" height="2" className="c-amber prop--dot2" /><rect x="37" y="13" width="4" height="1" className="c-ink prop--dot3" />
      <g className="prop--brush"><rect x="29" y="10" width="1" height="7" className="c-ink" /><rect x="29" y="8" width="1" height="2" className="c-amber" /></g></g>;
    case "clip": return <g className="prop">
      <rect x="30" y="11" width="10" height="8" className="c-ink" /><rect x="40" y="13" width="4" height="4" className="c-amber" />
      <rect x="31" y="7" width="4" height="4" className="c-ink" /><rect x="36" y="7" width="4" height="4" className="c-ink" />
      <g className="prop--crank"><rect x="31" y="20" width="5" height="1" className="c-ink" /><rect x="33" y="18" width="1" height="5" className="c-ink" /></g></g>;
    case "read": return <g className="prop"><rect x="28" y="9" width="10" height="13" className="c-ink" /><rect x="29" y="10" width="8" height="11" className="c-face" />
      <rect x="30" y="12" width="6" height="1" className="c-ink" /><rect x="30" y="15" width="5" height="1" className="c-ink prop--dot2" /><rect x="30" y="18" width="6" height="1" className="c-ink prop--dot3" /></g>;
    case "sleep": return <g className="prop--zzz"><rect x="28" y="4" width="3" height="1" className="c-ink" /><rect x="29" y="5" width="1" height="1" className="c-ink" /><rect x="28" y="6" width="3" height="1" className="c-ink" />
      <rect x="33" y="0" width="4" height="1" className="c-ink" /><rect x="35" y="1" width="1" height="1" className="c-ink" /><rect x="34" y="2" width="1" height="1" className="c-ink" /><rect x="33" y="3" width="4" height="1" className="c-ink" /></g>;
    case "dizzy": return <g className="prop--stars"><rect x="9" y="1" width="2" height="2" className="c-amber" /><rect x="21" y="1" width="2" height="2" className="c-amber" /><rect x="15" y="0" width="2" height="2" className="c-bad" /></g>;
    case "cheer": return <g className="prop--confetti"><rect x="31" y="4" width="2" height="2" className="c-amber" /><rect x="38" y="9" width="2" height="2" className="c-body" /><rect x="34" y="14" width="2" height="2" className="c-amber" /><rect x="42" y="3" width="2" height="2" className="c-ink" /></g>;
    case "voice": return <g className="prop"><rect x="29" y="12" width="4" height="6" className="c-ink" /><rect x="30" y="18" width="2" height="5" className="c-ink" />
      <g className="prop--waves"><rect x="35" y="13" width="1" height="4" className="c-amber" /><rect x="37" y="11" width="1" height="8" className="c-amber" /><rect x="39" y="14" width="1" height="2" className="c-amber" /></g></g>;
    case "build": return <g className="prop"><rect x="30" y="18" width="5" height="5" className="c-amber" /><rect x="36" y="18" width="5" height="5" className="c-body" />
      <rect x="33" y="12" width="5" height="5" className="c-ink prop--drop" /></g>;
    case "check": return <g className="prop prop--scan"><rect x="30" y="9" width="8" height="8" className="c-ink" /><rect x="31" y="10" width="6" height="6" className="c-face" />
      <rect x="37" y="16" width="2" height="2" className="c-ink" /><rect x="39" y="18" width="2" height="2" className="c-ink" /></g>;
    case "other": return <g className="prop prop--swing"><rect x="29" y="9" width="2" height="9" className="c-ink" /><rect x="28" y="7" width="4" height="3" className="c-amber" /></g>;
    default: return null;
  }
}

/** the track: stations in a row, the pet above the one it is at; children render under the caption */
export function PetTrack({ v, title, right, children }: { v: RunView; title: ReactNode; right?: ReactNode; children?: ReactNode }) {
  // walk between stations: legs move while the pet's position transitions (pet.css), then it does the station's activity
  const [shownAt, setShownAt] = useState(v.at), [walking, setWalking] = useState(false);
  useEffect(() => {
    if (v.at === shownAt) return;
    setShownAt(v.at); setWalking(true);
    const t = setTimeout(() => setWalking(false), 1600); return () => clearTimeout(t);
  }, [v.at, shownAt]);
  const n = v.stations.length, pct = (i: number) => ((i + 0.5) / n) * 100;
  return (
    <section className="panel" aria-label="Progress">
      <header className="panel__head">
        <h2>{title}</h2>
        <div className="panel__meta">{right}{v.eta && <span title="planned pace, rescaled by the finished jobs">done about {clock(v.eta)}</span>}</div>
      </header>
      <div className="panel__body">
        <div className="pet-track">
          {/* at the last two stations the pet faces left, so its prop stays inside the track on a phone */}
          <div className={`pet ${walking ? "pet--walking" : ""} ${v.at >= n - 2 ? "pet--flip" : ""}`} style={{ left: `${pct(v.at)}%` }}>
            <Sprite activity={v.activity} walking={walking} />
          </div>
          <ol className="pet-track__stations" aria-label="Stations">
            {v.stations.map((s, i) => {
              const state = i === v.at ? "here" : s.done + s.failed >= s.total && (s.done || s.failed) ? "done" : "todo";
              return (
                <li key={s.key} data-state={state} data-failed={s.failed > 0 || undefined} aria-current={i === v.at ? "step" : undefined}>
                  <span className="pet-track__pad" aria-hidden="true" />
                  <span className="pet-track__label">{s.label}</span>
                  {s.total > 1 && <span className="pet-track__count">{s.done}/{s.total}{s.failed ? ` · ${s.failed}✕` : ""}</span>}
                  {s.secs > 0 && <span className="pet-track__count">{fmt(s.secs)}</span>}
                </li>);
            })}
          </ol>
        </div>
        <p className="mt-4 text-sm font-extrabold" aria-live="polite">{v.caption}</p>
        {v.detail && <p className="text-xs text-muted">{v.detail}</p>}
        {children}
      </div>
    </section>
  );
}

const useNow = (on: boolean) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { if (!on) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [on]);
  return now;
};

export function RunPet({ run }: { run: RunInfo }) {
  const now = useNow(["queued", "running"].includes(run.progress?.status ?? ""));
  const v = runView(run, now);
  const events = [...(run.progress?.events ?? [])].sort((a, b) => b.t - a.t).slice(0, 8);
  return (
    <PetTrack v={v} title={`Run · ${run.progress?.status ?? "not pushed"}`}>
      {events.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-extrabold">Last {events.length} progress lines</summary>
          <ul className="mt-1 space-y-0.5 text-xs text-muted">
            {events.map((e, i) => (
              <li key={i}><span className="text-ink">{clock(e.t * 1000)}</span> {e.stage}{e.job ? ` · ${e.job}` : ""} · {e.state}
                {e.secs ? ` · ${fmt(e.secs)}` : ""}{e.vram_gb ? ` · ${e.vram_gb} GB` : ""}{e.note ? ` · ${e.note}` : ""}{e.error ? ` · ${e.error}` : ""}</li>))}
          </ul>
        </details>)}
      {run.progress && <p className="mt-2 text-xs text-muted">Relayed through ntfy.sh by kaggle.sh watch · checked {clock(Date.parse(run.progress.checked_at))}</p>}
    </PetTrack>
  );
}

// ---------- a video's build line (Video page) ----------
/** run.sh steps grouped into the stations the pet walks; each station's activity */
const BUILD_STATIONS: { key: string; label: string; steps: string[]; act: Activity }[] = [
  { key: "setup", label: "Set up", steps: ["new", "validate"], act: "setup" },
  { key: "voice", label: "Voice", steps: ["voice"], act: "voice" },
  { key: "scenes", label: "Scenes", steps: ["clips", "assemble"], act: "build" },
  { key: "checks", label: "Checks", steps: ["payoffs", "check"], act: "check" },
  { key: "render", label: "Render", steps: ["render"], act: "clip" },
  { key: "qa", label: "Watch", steps: ["qa", "watch"], act: "check" },
  { key: "review", label: "Fixes", steps: ["review"], act: "read" },
];

export function buildView(p: NonNullable<VideoDetail["progress"]> | null, nowMs: number): RunView {
  const steps = p?.steps ?? {};
  const stations: Station[] = BUILD_STATIONS.map((s) => {
    const have = s.steps.filter((x) => steps[x]);
    const secs = have.reduce((n, x) => { const j = steps[x]; return n + (j.started_at && j.finished_at ? (Date.parse(j.finished_at) - Date.parse(j.started_at)) / 1000 : 0); }, 0);
    // a station counts as one job: done when its steps that ran all passed and its last step ran
    const done = have.length > 0 && have.every((x) => steps[x].status === "ok") && !!steps[s.steps[s.steps.length - 1]] ? 1 : 0;
    const failed = have.some((x) => steps[x].status === "failed") ? 1 : 0;
    return { key: s.key, label: s.label, total: 1, done, failed, secs: Math.round(secs) };
  });
  const base = { stations, eta: null, live: !!p && ["queued", "running"].includes(p.status) };
  if (!p) return { ...base, at: 0, activity: "sleep", caption: "Getting ready.", detail: "The agent is planning the build." };
  const si = Math.max(0, BUILD_STATIONS.findIndex((s) => s.steps.includes(p.step)));
  const j = steps[p.step], el = j?.started_at ? (nowMs - Date.parse(j.started_at)) / 1000 : 0;
  if (p.status === "queued") return { ...base, at: si, activity: "sleep", caption: `${p.words}: waiting its turn in the build queue.`, detail: "" };
  if (p.status === "running") return { ...base, at: si, activity: BUILD_STATIONS[si].act, caption: `${p.words}…`, detail: el ? `${fmt(el)} so far` : "" };
  if (p.status === "failed" || p.status === "interrupted")
    return { ...base, at: si, activity: "dizzy", caption: `${p.words} didn't pass.`, detail: "The agent reads the log and fixes it, then runs it again." };
  if (p.status === "cancelled") return { ...base, at: si, activity: "idle", caption: `${p.words} was stopped.`, detail: "" };
  // the last step passed and nothing runs: the agent is deciding the next step, so the pet walks on and waits there
  const next = Math.min(si + 1, BUILD_STATIONS.length - 1);
  return { ...base, at: next, activity: next === si ? "cheer" : "idle", caption: `${p.words}: done.`, detail: next === si ? "" : "The agent is lining up the next step." };
}

export function BuildPet({ v, right }: { v: VideoDetail; right?: ReactNode }) {
  const now = useNow(v.progress?.status === "running");
  return <PetTrack v={buildView(v.progress, now)} title="Building the video" right={right} />;
}

// ---------- a video's script stage (Video page) ----------
/** the video-scripter stages (labels of 6 letters or fewer, so 7 fit a phone) (.claude/skills/video-scripter/SKILL.md), each done when its last file exists */
const SCRIPT_STATIONS: { key: string; label: string; words: string; done: RegExp; act: Activity }[] = [
  { key: "research", label: "Facts", words: "Researching the topic", done: /^research\.md$/, act: "read" },
  { key: "youtube", label: "Shorts", words: "Studying the top YouTube Shorts", done: /^inspiration\.md$/, act: "check" },
  { key: "plan", label: "Plan", words: "Planning the hooks and the message", done: /^content-plan\.md$/, act: "build" },
  { key: "script", label: "Script", words: "Writing the script", done: /^script-(?!review).+\.md$/, act: "voice" },
  { key: "review", label: "Check", words: "Checking the script", done: /^script-review\.md$/, act: "check" },
  { key: "visuals", label: "Look", words: "Planning the visuals", done: /^storyboard-.+\.md$/, act: "still" },
  { key: "pack", label: "Pack", words: "Packing it up for you", done: /^package\.md$/, act: "pack" },
];

export function scriptView(v: VideoDetail, nowMs: number): RunView {
  const files = v.writing ?? [], t = (f: { mtime: string }) => Date.parse(f.mtime);
  const start = v.created ? Date.parse(v.created) : null;
  const doneAt = SCRIPT_STATIONS.map((s) => { const f = files.find((x) => s.done.test(x.name)); return f ? t(f) : null; });
  // no per-stage times: a session can stop overnight and resume, so the gap between two files isn't work time
  const stations: Station[] = SCRIPT_STATIONS.map((s, i) => ({ key: s.key, label: s.label, total: 1, done: doneAt[i] ? 1 : 0, failed: 0, secs: 0 }));
  const live = v.sessionStatus === "running" || v.sessionStatus === "queued";
  // the pet stands at the first stage whose file isn't written yet
  const first = doneAt.findIndex((d) => !d), at = first < 0 ? SCRIPT_STATIONS.length - 1 : first, st = SCRIPT_STATIONS[at];
  const last = files[files.length - 1];
  const saved = last ? `last saved ${last.name.replace(/\/$/, " folder")} at ${clock(t(last))}` : "";
  const base = { stations, at, eta: null, live };
  if (v.sessionStatus === "queued") return { ...base, activity: "sleep", caption: "Waiting for a free agent slot.", detail: saved };
  if (!live) return { ...base, activity: "idle", caption: "The agent isn't working right now.", detail: saved };
  if (first < 0) return { ...base, activity: "cheer", caption: "The script package is done: your turn is next.", detail: saved };
  const since = (at > 0 ? doneAt[at - 1] : start) ?? null;   // over 6 h means a stop in between: not shown
  return { ...base, activity: st.act, caption: `${st.words}…`,
    detail: [since && nowMs - since < 6 * 3600e3 ? `${fmt((nowMs - since) / 1000)} on this stage` : "", saved].filter(Boolean).join(" · ") };
}

export function ScriptPet({ v, right }: { v: VideoDetail; right?: ReactNode }) {
  const now = useNow(v.sessionStatus === "running");
  return <PetTrack v={scriptView(v, now)} title="Writing the script" right={right} />;
}
