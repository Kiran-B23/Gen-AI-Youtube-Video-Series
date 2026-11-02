import { useState, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api, fileUrl, type Job, type Project, type Step } from "../api";
import { Panes } from "../components/Shell";
import { ProjectHeader } from "../components/ProjectHeader";
import { LogPanel, statusTone } from "../components/LogPanel";
import { useJobStream } from "../components/useJobStream";
import { BenchmarkTable, PaceTable, PayoffsTable, QaList, ScenesTable, VoicePaceLog, WatchPanel } from "../components/artefacts";
import { Button, Card, ConfirmDialog, Empty, ErrorLine, Gate, Icon, Mark, Skeleton, type GateState, type Tone } from "../components/ui";
import { VoiceLadder } from "../components/VoiceLadder";

/** what run.sh deliver would say right now: deliver_check.py (qa / payoffs / watch for THIS render) + review.py --check */
function DeliverCheck({ slug }: { slug: string }) {
  const q = useQuery({ queryKey: ["deliver-check", slug], queryFn: () => api.deliverCheck(slug), refetchOnMount: "always" });
  if (q.isLoading) return <div><Empty>Running deliver_check.py and review.py --check…</Empty><Skeleton rows={4} /></div>;
  if (q.error || !q.data) return <ErrorLine error={q.error ?? "no answer"} what="The read-only deliver check did not answer." todo="Press re-check, or run the deliver step's checks in the terminal." />;
  const d = q.data;
  const block = (name: string, r: { code: number | null; output: string }) => (
    <div><div className="mb-1 flex flex-wrap items-center gap-2 text-xs font-medium"><Mark ok={r.code === 0} />{name}<span className="text-muted">exit <b className="font-extrabold text-ink">{r.code}</b></span></div>
      <pre className="out scroll-thin max-h-48 overflow-auto">{r.output || "(no output: clean)"}</pre></div>);
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2"><Gate state={d.ok ? "pass" : "fail"}>{d.ok ? "deliver would pass" : "deliver would refuse"}</Gate>
        <Button small kind="ghost" onClick={() => q.refetch()}>re-check</Button></div>
      {block("deliver_check.py (qa, payoffs, watch)", d.deliverCheck)}
      {block("review.py --check (fix list + watched tick)", d.reviewCheck)}
    </div>);
}

/** what the files say about a step (the job history says whether it ran; the artefacts say what it left) */
function artefactHint(p: Project, id: string): { text: string; tone: Tone } | null {
  const s = p.status;
  switch (id) {
    case "voice": return p.pace ? { text: `timings, ${p.pace.delivery} w/s`, tone: p.pace.deliveryFail || p.pace.rows.some((r) => r.flags.some((f) => f.kind === "fail")) ? "bad" : "ok" } : null;
    case "assemble": return p.exists.hf ? { text: "hf/ + layout.json", tone: "ok" } : null;
    case "payoffs": return s.payoffs ? { text: `${(s.payoffs.checked ?? 0) - (s.payoffs.failed ?? 0)}/${s.payoffs.checked} beats${s.payoffs.fresh === false ? ", stale" : ""}`, tone: !s.payoffs.ok ? "bad" : s.payoffs.fresh === false ? "warn" : "ok" } : null;
    case "render": return p.exists.mp4 ? { text: `${p.slug}.mp4`, tone: "ok" } : null;
    case "qa": return s.qa ? { text: `${s.qa.passed}/${s.qa.total}${s.qa.fresh === false ? ", stale" : ""}`, tone: s.qa.passed < s.qa.total ? "bad" : s.qa.fresh === false ? "warn" : "ok" } : null;
    case "watch": return p.watch ? { text: `${p.sheets.length} sheets, ${p.watch.unclear.length} unclear`, tone: p.watch.gates.every((g) => g.ok) ? "ok" : "bad" } : null;
    case "review": return s.review ? { text: `${s.review.open} open${s.review.watched ? ", watched" : ", not watched yet"}`, tone: s.review.open ? "bad" : s.review.watched ? "ok" : "accent" } : null;
    case "stills": return p.images.stills ? { text: "stills.png", tone: "ok" } : null;
    case "benchmark": return p.benchmark ? { text: `${p.benchmark.warnings.length} warnings`, tone: p.benchmark.warnings.length ? "warn" : "ok" } : null;
    case "deliver": return p.delivered ? { text: p.current ? "in shorts/" : "older copy in shorts/", tone: p.current ? "ok" : "warn" } : null;
    default: return null;
  }
}

const TONE_TEXT: Record<Tone, string> = { ok: "text-ok", bad: "text-bad", warn: "text-warn", accent: "text-accent", muted: "text-muted" };
/** what an artefact hint says, as a gate state (an "accent" hint is a gate that waits for the owner) */
const HINT_STATE: Record<Tone, GateState> = { ok: "pass", bad: "fail", warn: "warn", accent: "waiting", muted: "pending" };

/** the step's square: its number, or the gate's glyph once it has run (the one stepper language: pending, running, pass, fail) */
function StepIcon({ n, job }: { n: number; job?: Job }) {
  const st = job?.status;
  const state = st === "ok" ? "pass" : st === "failed" || st === "interrupted" ? "fail" : st === "running" ? "running" : st === "queued" ? "queued" : "pending";
  const word = { pass: "passed", fail: "failed", running: "running", queued: "queued", pending: "not run" }[state];
  return <span className="step-mark" data-state={state} title={word}>
    {state === "pass" ? <Icon name="check" label={`step ${n} ${word}`} /> : state === "fail" ? <Icon name="cross" label={`step ${n} ${word}`} /> : <><span aria-hidden="true">{n}</span><span className="sr-only">{` ${word}`}</span></>}</span>;
}

function StepRow({ p, step, n, job, selected, onSelect, onRun, last, children }:
  { p: Project; step: Step; n: number; job?: Job; selected: boolean; onSelect: () => void; onRun: () => void; last: boolean; children?: ReactNode }) {
  const hint = artefactHint(p, step.id);
  const busy = job?.status === "running" || job?.status === "queued";
  return (
    <li className="relative">
      {!last && <span aria-hidden="true" className="absolute bottom-[-4px] left-[23px] top-10 w-0.5 bg-ink" />}
      <div className={`flex items-start gap-3 px-2 py-2 ${selected ? "bg-paper-2" : "hover:bg-paper-2"}`}>
        <button onClick={onSelect} aria-current={selected ? "step" : undefined} title={step.what} className="flex min-w-0 flex-1 items-start gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
          <StepIcon n={n} job={job} />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-md font-extrabold leading-tight">{step.label}</span>
              {hint && <Gate state={HINT_STATE[hint.tone]}>{hint.text}</Gate>}
            </span>
            {job && <span className="mt-0.5 block text-xs text-muted" title={`job #${job.id}${job.exit_code !== null ? `, exit ${job.exit_code}` : ""}`}><span className={TONE_TEXT[statusTone(job.status)]}>{job.status}</span>, {ago(job.finished_at ?? job.started_at ?? job.created_at)}</span>}
          </span>
        </button>
        <Button small kind={selected ? "primary" : "default"} disabled={busy} onClick={onRun} title={busy ? "already queued or running" : `run.sh ${p.slug} ${step.id}${step.confirm ? " (asks first)" : ""}`}>{busy ? job!.status : "Run"}</Button>
      </div>
      {selected && children && <div className="relative z-[1] mb-2 ml-12 mt-1">{children}</div>}
    </li>
  );
}

function Artifact({ p, step, onResplit, onJob }: { p: Project; step: string; onResplit: () => void; onJob: (job: Job) => void }) {
  switch (step) {
    case "voice": return <><PaceTable p={p} /><VoiceLadder p={p} onResplit={onResplit} onJob={(id) => onJob({ id, slug: p.slug, step: "validate", flags: "", status: "queued", exit_code: null, created_at: new Date().toISOString(), started_at: null, finished_at: null })} /><VoicePaceLog p={p} /></>;
    case "preview": return (
      <Card title="HyperFrames Studio" right={<Link className="link" to={`/p/${p.slug}/preview`}>open Preview</Link>}>
        <p className="text-sm text-ink-2" title={`runs npx hyperframes preview --background --port ${p.previewPort} in hf/; the Preview tab also has the in-app composition preview (an approximation)`}>Run it, then open
          <a className="ml-1 link" href={`http://localhost:${p.previewPort}`} target="_blank" rel="noreferrer">localhost:{p.previewPort}</a> (this PC only).</p>
      </Card>);
    case "payoffs": return <><PayoffsTable p={p} />{p.images.payoffs && <Card title="payoffs.png"><img alt="payoffs" className="w-full border-2 border-ink" src={fileUrl(p.slug, "payoffs.png")} /></Card>}</>;
    case "stills": return p.images.stills ? <Card title="out/stills.png"><img alt="stills" className="w-full border-2 border-ink" src={fileUrl(p.slug, "stills.png")} /></Card> : <Card title="Stills"><Empty>No out/stills.png yet.</Empty></Card>;
    case "render": return p.exists.mp4 ? <Card title={`out/${p.slug}.mp4`}><video controls preload="metadata" className="mx-auto max-h-[70dvh] border-2 border-ink bg-plate" src={fileUrl(p.slug, `${p.slug}.mp4`)} /></Card> : <Card title="Render"><Empty>No MP4 yet.</Empty></Card>;
    case "qa": return <><QaList p={p} />{p.images.review && <Card title="review.png"><img alt="qa review" className="w-full border-2 border-ink" src={fileUrl(p.slug, "review.png")} /></Card>}</>;
    case "watch": return <WatchPanel p={p} />;
    case "benchmark": return <BenchmarkTable p={p} />;
    case "review": return (
      <Card title="Fix list" right={<Link className="link" to={`/p/${p.slug}/review`}>open Review</Link>}>
        {!p.review ? <Empty>No review.md yet.</Empty> : <>
          <div className="mb-3 flex flex-wrap gap-1"><Gate state={p.review.open ? "fail" : "pass"}><b>{p.review.open}</b> open</Gate><Gate state="done"><b>{p.review.rows.length}</b> rows</Gate><Gate state={p.review.watchedGate ? "pass" : "waiting"}>watched</Gate></div>
          <ul className="divide-y divide-rule text-sm">{p.review.rows.filter((r) => r.countsAsOpen).slice(0, 12).map((r) => <li key={r.id} className="py-1.5"><span className="block text-xs text-muted">{r.id}</span>{r.finding}</li>)}</ul></>}
      </Card>);
    case "deliver": {
      const s = p.status;
      const gates = [
        { name: "qa.json clean for this MP4", ok: !!s.qa && s.qa.passed === s.qa.total && s.qa.fresh !== false },
        { name: "payoffs.json clean for this composition", ok: !!s.payoffs && s.payoffs.ok && s.payoffs.fresh !== false },
        { name: "watch.json exists", ok: !!p.watch },
        { name: "review.md: no open row", ok: !!s.review && s.review.open === 0 },
        { name: "review.md ticked “Watched end to end”", ok: !!s.review?.watched },
      ];
      return <>
        <Card title={<span title="run.sh decides; this is a preview">What deliver will check</span>}>
          <ul className="space-y-1.5 text-sm">{gates.map((g) => <li key={g.name} className="flex items-center gap-2"><Mark ok={g.ok} />{g.name}</li>)}</ul></Card>
        <Card title="What deliver says now" right={<span>nothing is copied</span>}><DeliverCheck slug={p.slug} /></Card>
      </>;
    }
    default: return <ScenesTable p={p} />;
  }
}

export function Build() {
  const { slug = "" } = useParams();
  const [sp, setSp] = useSearchParams();
  const qc = useQueryClient();
  const project = useQuery({ queryKey: ["project", slug], queryFn: () => api.project(slug), refetchInterval: 10000 });
  const steps = useQuery({ queryKey: ["steps"], queryFn: api.steps, staleTime: Infinity });
  const [started, setStarted] = useState<Record<string, Job>>({});
  const [ask, setAsk] = useState<(Step & { resplitOnly?: boolean }) | null>(null);
  const [voiceMode, setVoiceMode] = useState<"" | "resplit" | "retake">("");
  const selected = sp.get("step") ?? "validate";
  const select = (id: string) => setSp({ step: id }, { replace: true });

  const run = useMutation({
    mutationFn: ({ step, confirm, flags }: { step: string; confirm?: boolean; flags?: string[] }) => api.run(slug, step, { confirm, flags }),
    onSuccess: (job) => { setStarted((s) => ({ ...s, [`${slug}/${job.step}`]: job })); select(job.step); qc.invalidateQueries({ queryKey: ["jobs"] }); },
  });
  const p = project.data;
  const jobFor = (id: string): Job | undefined => {
    const a = started[`${slug}/${id}`], b = p?.lastJobs[id];
    return a && (!b || a.id >= b.id) ? a : b;
  };
  const selJob = jobFor(selected);
  const stream = useJobStream(selJob?.id, slug);
  const live = (id: string) => (id === selected && stream.job ? stream.job : jobFor(id));

  if (project.error) return <div className="p-6"><ErrorLine error={project.error} what={`Could not load the project ${slug}.`} todo="Check the slug in studio/projects/, or reload." /></div>;
  if (steps.error) return <div className="p-6"><ErrorLine error={steps.error} what="Could not load the pipeline steps." todo="Reload; the server lists them from run.sh." /></div>;
  if (!p || !steps.data) return <div className="max-w-3xl space-y-6 p-6"><Empty>Loading…</Empty><Skeleton rows={8} label="Loading the pipeline" /></div>;
  const main = steps.data.filter((s) => s.main), extra = steps.data.filter((s) => !s.main);
  const start = (s: Step) => (s.confirm ? (setVoiceMode(""), setAsk(s)) : run.mutate({ step: s.id }));
  const askBody = ask?.resplitOnly ? "RESPLIT=1 run.sh voice re-splits the saved take with the current minPause / pad / pauseAfter. No Gemini request." : (ask?.confirm ?? "").replace("<slug>", slug);
  const selStep = steps.data.find((s) => s.id === selected) ?? main[0];
  const canCancel = stream.job && (stream.job.status === "running" || stream.job.status === "queued");
  const log = !(stream.job ?? selJob) && !stream.lines.length && !run.isError ? null : (
    <div className="space-y-2">
      <LogPanel lines={stream.lines} job={stream.job ?? selJob ?? null} end={stream.end} height="h-64" />
      {(canCancel || run.isError) && <div className="flex items-center gap-2 text-xs">
        {canCancel && <Button small kind="danger" onClick={() => api.cancel(stream.job!.id)}>Cancel job #{stream.job!.id}</Button>}
        {run.isError && <span role="alert" className="text-bad">{(run.error as Error).message}</span>}</div>}
    </div>);

  return (
    <Panes header={<ProjectHeader p={p} />} artifactTitle={<>Artifact: {selStep.label}</>}
      artifact={<Artifact p={p} step={selStep.id} onResplit={() => setAsk({ ...steps.data.find((x) => x.id === "voice")!, resplitOnly: true } as Step & { resplitOnly: true })}
        onJob={(job) => setStarted((s) => ({ ...s, [`${slug}/${job.step}`]: job }))} />} main={<>
      {p.personal && <div className="notice" data-tone="warn"><b>Personal build</b> (the owner’s avatar): never a channel video.</div>}
      <Card title="Pipeline">
        <ol className="space-y-1">{main.map((s, i) => <StepRow key={s.id} p={p} step={s} n={i + 1} job={live(s.id)} selected={s.id === selected} last={i === main.length - 1}
          onSelect={() => select(s.id)} onRun={() => start(s)}>{log}</StepRow>)}</ol>
        <h3 className="mb-1 mt-5 max-w-none border-t-2 border-ink pt-3 text-sm font-extrabold">Also</h3>
        <ol className="space-y-1">{extra.map((s, i) => <StepRow key={s.id} p={p} step={s} n={main.length + i + 1} job={live(s.id)} selected={s.id === selected} last
          onSelect={() => select(s.id)} onRun={() => start(s)}>{log}</StepRow>)}</ol>
      </Card>
      <ConfirmDialog open={!!ask} title={ask?.resplitOnly ? "Re-split the saved take?" : `Run ${ask?.label}?`} body={askBody} confirmLabel={ask?.resplitOnly ? "Re-split (free)" : `Run ${ask?.id}`}
        onCancel={() => setAsk(null)}
        onConfirm={() => { if (ask) run.mutate({ step: ask.id, confirm: true, flags: ask.resplitOnly ? ["resplit"] : ask.id === "voice" && voiceMode ? [voiceMode] : [] }); setAsk(null); }}>
        {ask?.id === "deliver" && <div className="mt-3"><DeliverCheck slug={slug} /></div>}
        {ask?.id === "voice" && !ask.resplitOnly && (
          <fieldset className="mt-3 space-y-1 text-sm"><legend className="mb-1 text-xs text-muted">voice mode</legend>
            {([["", "run.sh voice (as configured in scenes.json)"], ["resplit", "RESPLIT=1: re-split the saved take (no Gemini request)"], ["retake", "RETAKE=1: ask Gemini for a new take"]] as const).map(([v, label]) => (
              <label key={v} className="flex min-h-9 items-center gap-2"><input type="radio" name="voice-mode" checked={voiceMode === v} onChange={() => setVoiceMode(v)} />{label}</label>))}
          </fieldset>)}
      </ConfirmDialog>
    </>} />
  );
}
