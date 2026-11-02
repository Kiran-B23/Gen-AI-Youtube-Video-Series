// Video: one video from topic to delivery (GET /api/videos/:key). A four-step bar, then only what the owner does at
// this stage: read and approve the script, wait while it builds, watch it and leave notes (or approve and deliver),
// download it. Everything else (agent timeline, checks, build steps) sits behind "Details" on the existing pages.
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fileUrl, sceneAt, shortsUrl, type Project, type VideoDetail } from "../api";
import { Markdown } from "../components/Markdown";
import { Player, type PlayerApi } from "../components/Player";
import { fmtTime } from "../components/Scrubber";
import { parseTime } from "../components/ReviewTable";
import { useJobStream } from "../components/useJobStream";
import { Button, Card, Chip, ConfirmDialog, Empty, ErrorLine, Icon, Skeleton, type Tone } from "../components/ui";
import { PageHead, StageChip, isLive } from "../components/video";
import { BuildPet, ScriptPet } from "../components/Pet";

const STEPS = ["Script", "Building", "Your review", "Delivered"];
function stepOf(v: VideoDetail) {
  switch (v.stage) {
    case "script": case "your-script": return 0;
    case "building": return 1;
    case "your-review": return 2;
    case "delivered": return 3;
    default: return v.hasVideo ? 2 : v.slug ? 1 : 0;
  }
}

function StepBar({ v }: { v: VideoDetail }) {
  const at = stepOf(v);
  const nowState = v.stage === "stopped" ? "fail" : v.stage === "delivered" ? "pass" : isLive(v.stage) ? "running" : "waiting";
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Steps">
      {STEPS.map((s, i) => {
        const state = i < at ? "pass" : i === at ? nowState : "pending";
        return (
          <li key={s} aria-current={i === at ? "step" : undefined} className={`flex min-w-0 flex-col gap-1.5 border-t-2 pt-2 ${i <= at ? "border-ink" : "border-rule"}`}>
            <span className="step-mark" data-state={state}>{state === "pass" ? <Icon name="check" size={14} /> : state === "fail" ? <Icon name="cross" size={14} /> : i + 1}</span>
            <span className={`text-xs leading-tight ${i === at ? "font-extrabold text-ink" : "text-muted"}`}>{s}</span>
          </li>);
      })}
    </ol>
  );
}

const latest = (v: VideoDetail) => v.messages[v.messages.length - 1]?.text ?? null;
const useRefreshVideo = (key: string) => { const qc = useQueryClient(); return () => { qc.invalidateQueries({ queryKey: ["video", key] }); qc.invalidateQueries({ queryKey: ["videos"] }); }; };

/** the reply state of one send: sent now, held until the agent's turn ends, or the server's error */
function SendState({ m }: { m: { isError: boolean; error: unknown; isSuccess: boolean; data?: { queued: boolean } } }) {
  if (m.isError) return <span role="alert" className="text-xs text-bad">{(m.error as Error).message}</span>;
  if (m.isSuccess) return <span role="status" className="text-xs text-ok">{m.data?.queued ? "Will be sent when the agent finishes this turn." : "Sent."}</span>;
  return null;
}

function useSend(key: string, after?: () => void) {
  const refresh = useRefreshVideo(key);
  return useMutation({ mutationFn: (text: string) => api.videoMessage(key, text), onSuccess: () => { refresh(); after?.(); } });
}

function StopButton({ v }: { v: VideoDetail }) {
  const refresh = useRefreshVideo(v.key);
  const stop = useMutation({ mutationFn: () => api.stopPkg(v.packageId!), onSuccess: refresh });
  if (!v.packageId || !(v.sessionStatus === "running" || v.sessionStatus === "queued")) return null;
  return <span className="flex flex-wrap items-center gap-2">
    <Button kind="danger" small onClick={() => stop.mutate()} disabled={stop.isPending}>Stop</Button>
    {stop.isError && <span role="alert" className="text-xs text-bad">{(stop.error as Error).message}</span>}
  </span>;
}

// ---------- stages ----------
function Writing({ v }: { v: VideoDetail }) {
  const m = latest(v);
  return (
    <>
      <ScriptPet v={v} right={<StopButton v={v} />} />
      <Card title="The agent's latest note">
        <p className="text-sm text-ink-2">You'll be asked to read the script when it's ready.</p>
        {m && <div className="mt-3 border-l-2 border-rule pl-3"><Markdown text={m} /></div>}
      </Card>
    </>
  );
}

function ReadScript({ v }: { v: VideoDetail }) {
  const refresh = useRefreshVideo(v.key);
  const approve = useMutation({ mutationFn: () => api.approveScript(v.packageId!), onSuccess: refresh });
  const [text, setText] = useState("");
  const send = useSend(v.key, () => setText(""));
  const m = latest(v);
  return (
    <>
      <Card title="Read the script">
        {m ? <Markdown text={m} /> : <Empty>The agent has not written a summary. Open the full script below.</Empty>}
        {v.script && <details className="disclose mt-4"><summary>Full script file</summary><div className="mt-2 bg-paper-2 p-3"><Markdown text={v.script} /></div></details>}
      </Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {v.packageId && <div className="space-y-1">
          <button className="btn btn--primary min-h-12 px-6 text-md" onClick={() => approve.mutate()} disabled={approve.isPending}>{approve.isPending ? "Approving…" : "Approve script"}</button>
          <p className="text-xs text-muted">The agent then builds the video on its own.</p>
          {approve.isError && <p role="alert" className="text-xs text-bad">{(approve.error as Error).message}</p>}
        </div>}
        <div className="min-w-0 flex-1 space-y-2">
          <label className="block text-xs text-muted" htmlFor="changes">Ask for changes</label>
          <textarea id="changes" className="field w-full" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="What should change in the script?" />
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => send.mutate(text.trim())} disabled={!text.trim() || send.isPending}>Send</Button>
            <SendState m={send} />
          </div>
        </div>
      </div>
    </>
  );
}

function Building({ v }: { v: VideoDetail }) {
  // the run pet walks the build line and acts out the step that is running (components/Pet.tsx)
  return (
    <>
      <BuildPet v={v} right={<StopButton v={v} />} />
      {v.next && <p className="notice">Your message will be sent when the agent finishes this turn.</p>}
      {v.messages.length > 0 && <Card title="The agent's latest notes">
        <ol className="space-y-3">
          {v.messages.slice(-3).map((m) => (
            <li key={m.t} className="border-l-2 border-rule pl-3 text-xs">
              <span className="block text-muted">{new Date(m.t).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</span>
              <div className="[&_.md]:text-xs"><Markdown text={m.text} /></div>
            </li>))}
        </ol>
      </Card>}
    </>
  );
}

// ---------- the review: player + notes ----------
const noteTone = (s: string): Tone => (s === "fixed" ? "ok" : s === "open" ? "warn" : "muted");
interface DraftNote { k: number; t: number; scene: string | null; text: string }

function Notes({ v, p, player, deliver }: { v: VideoDetail; p: Project; player: React.RefObject<PlayerApi | null>; deliver: boolean }) {
  const qc = useQueryClient();
  const slug = p.slug;
  const [now, setNow] = useState(0);
  useEffect(() => { const id = setInterval(() => setNow(player.current?.time() ?? 0), 250); return () => clearInterval(id); }, [player]);
  const [drafts, setDrafts] = useState<DraftNote[]>([]);
  const [extra, setExtra] = useState("");
  const rows = p.review?.rows ?? [];
  const mine = rows.filter((r) => r.id.startsWith("you:") || r.id.startsWith("seen:"));

  const nextId = (proj: Project) => `you:${1 + Math.max(0, ...(proj.review?.rows ?? []).map((r) => /^you:(\d+)$/.exec(r.id)?.[1]).filter(Boolean).map(Number))}`;
  const saveOne = async (d: DraftNote) => {
    const cur = qc.getQueryData<Project>(["project", slug]) ?? p;
    const r = await api.review(slug, { op: "add", id: nextId(cur), time: `${d.t.toFixed(1)}s`, scene: d.scene ?? "", finding: d.text.trim() });
    qc.setQueryData(["project", slug], r.project);
    setDrafts((xs) => xs.filter((x) => x.k !== d.k));
  };
  const save = useMutation({ mutationFn: saveOne });
  const refresh = useRefreshVideo(v.key);
  const rerun = useMutation({
    mutationFn: async () => { for (const d of drafts.filter((x) => x.text.trim())) await saveOne(d); return api.videoMessage(v.key, extra.trim()); },
    onSuccess: () => { setExtra(""); refresh(); qc.invalidateQueries({ queryKey: ["project", slug] }); },
  });

  const add = () => {
    player.current?.pause?.();
    const t = player.current?.time() ?? 0;
    setDrafts((xs) => [...xs, { k: Date.now(), t, scene: sceneAt(p.timeline, t)?.id ?? null, text: "" }]);
  };
  const canNote = true; // the first note creates the fix list (server: review.ts)
  const pending = drafts.some((d) => d.text.trim());
  const open = p.review?.open ?? 0;

  return (
    <div className="space-y-6">
      <Card title="Your notes">
        {!canNote ? <Empty>Notes open once the checks have written the fix list.</Empty> : <div className="space-y-3">
          <Button onClick={add}>Add note at {fmtTime(now)}</Button>
          {drafts.map((d) => (
            <div key={d.k} className="flex flex-wrap items-center gap-2">
              <button className="link text-xs" onClick={() => player.current?.seek(d.t)}>{fmtTime(d.t)}</button>
              <input autoFocus className="field field--sm min-w-0 flex-1 basis-48" value={d.text} placeholder="What's wrong here?" aria-label={`note at ${fmtTime(d.t)}`}
                onChange={(e) => setDrafts((xs) => xs.map((x) => (x.k === d.k ? { ...x, text: e.target.value } : x)))}
                onKeyDown={(e) => { if (e.key === "Enter" && d.text.trim()) save.mutate(d); }} />
              <Button small kind="primary" onClick={() => save.mutate(d)} disabled={!d.text.trim() || save.isPending}>Save</Button>
              <Button small kind="ghost" onClick={() => setDrafts((xs) => xs.filter((x) => x.k !== d.k))}>Remove</Button>
            </div>))}
          {save.isError && <p role="alert" className="text-xs text-bad">{(save.error as Error).message}</p>}
          {mine.length > 0 ? <ul className="divide-y divide-rule border-y border-rule">{mine.map((r) => {
            const t = parseTime(r.time);
            return (
              <li key={r.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2 text-sm">
                {t !== null ? <button className="link text-xs" onClick={() => player.current?.seek(t)} title="play from here">{fmtTime(t)}</button> : <span className="text-xs text-muted">{r.time}</span>}
                <span className="min-w-0 flex-1 basis-48 [overflow-wrap:anywhere]">{r.finding}</span>
                <Chip tone={noteTone(r.kind)}>{r.kind === "other" ? r.status : r.kind}</Chip>
              </li>);
          })}</ul> : !drafts.length && <Empty>No notes yet. Play the video and press Add note where something is off.</Empty>}
        </div>}
      </Card>
      <div className="space-y-2">
        <label className="block text-xs text-muted" htmlFor="extra">Anything else?</label>
        <textarea id="extra" className="field w-full" rows={2} value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Optional: anything not tied to a moment" />
        <div className="flex flex-wrap items-center gap-2">
          <Button kind={deliver ? "default" : "primary"} onClick={() => rerun.mutate()} disabled={rerun.isPending || (!open && !pending && !extra.trim())}
            title="the agent fixes every open note and builds the video again">{rerun.isPending ? "Sending…" : "Send notes & re-run"}</Button>
          {deliver && <ApproveDeliver v={v} slug={slug} open={open} />}
        </div>
        <SendState m={rerun} />
      </div>
    </div>
  );
}

function ApproveDeliver({ v, slug, open }: { v: VideoDetail; slug: string; open: number }) {
  const [ask, setAsk] = useState(false);
  const [jobId, setJobId] = useState<number | null>(null);
  const refresh = useRefreshVideo(v.key);
  const go = useMutation({ mutationFn: () => api.approveDeliver(slug), onSuccess: (r) => setJobId(r.job.id) });
  const { lines, job, end } = useJobStream(jobId, slug);
  useEffect(() => { if (end) refresh(); }, [end]); // eslint-disable-line react-hooks/exhaustive-deps
  const status = end?.status ?? job?.status;
  const why = [...lines].reverse().find((l) => /✗/.test(l.text))?.text.trim();
  return (
    <>
      <Button kind="primary" onClick={() => setAsk(true)} disabled={go.isPending || (!!jobId && !end)}>Approve & deliver</Button>
      <ConfirmDialog open={ask} title="Approve this video?" confirmLabel="Approve & deliver"
        body={`${open} open note${open === 1 ? "" : "s"} will be accepted as is. The video is then copied to shorts/.`}
        onCancel={() => setAsk(false)} onConfirm={() => { setAsk(false); go.mutate(); }} />
      {go.isError && <span role="alert" className="text-xs text-bad">{(go.error as Error).message}</span>}
      {jobId && !end && <span role="status" className="text-xs text-muted">{status === "queued" ? "Waiting to deliver…" : "Delivering…"}</span>}
      {end && (end.status === "ok"
        ? <span role="status" className="text-xs font-extrabold text-ok">Delivered</span>
        : <span role="alert" className="text-xs text-bad">Not delivered{why ? `: ${why.replace(/^✗\s*/, "")}` : ` (${end.status})`}</span>)}
    </>
  );
}

function Watch({ v, deliver }: { v: VideoDetail; deliver: boolean }) {
  const slug = v.slug!;
  const q = useQuery({ queryKey: ["project", slug], queryFn: () => api.project(slug), refetchInterval: 10000 });
  const player = useRef<PlayerApi | null>(null);
  const [changes, setChanges] = useState(false);
  const m = latest(v);
  if (q.isLoading) return <Skeleton rows={4} label="Loading the video" />;
  if (q.error) return <ErrorLine error={q.error} what="Could not load the video." todo="Reload the page." />;
  const p = q.data!;
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-3">
        <Player src={fileUrl(slug, `${slug}.mp4`)} tl={p.timeline} apiRef={player} label="the video" />
        {!deliver && <a className="btn btn--primary w-full" href={shortsUrl(`${slug}.mp4`)} download>Download</a>}
      </div>
      <div className="min-w-0 space-y-6">
        {deliver ? <Notes v={v} p={p} player={player} deliver />
          : changes ? <Notes v={v} p={p} player={player} deliver={false} />
          : <Card title="Delivered"><p className="mb-3 text-sm text-ink-2">The video is in shorts/. Want something changed?</p><Button onClick={() => setChanges(true)}>Make changes</Button></Card>}
        {m && <details className="disclose"><summary>What the agent said</summary><div className="mt-2 text-xs [&_.md]:text-xs"><Markdown text={m} /></div></details>}
      </div>
    </div>
  );
}

// ---------- always: talk to the agent, details ----------
function Talk({ v }: { v: VideoDetail }) {
  const [text, setText] = useState("");
  const send = useSend(v.key, () => setText(""));
  const go = () => { if (text.trim() && !send.isPending) send.mutate(text.trim()); };
  return (
    <Card title="Talk to the agent">
      <textarea className="field w-full" rows={3} value={text} onChange={(e) => setText(e.target.value)} aria-label="message to the agent"
        placeholder="Ask a question or tell it what to do" onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); go(); } }} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button onClick={go} disabled={!text.trim() || send.isPending}>Send</Button>
        <span className="text-xs text-muted">ctrl+enter</span>
        <SendState m={send} />
      </div>
    </Card>
  );
}

function Details({ v }: { v: VideoDetail }) {
  const links: [string, string][] = [];
  if (v.packageId) links.push([`/packages/${v.packageId}`, "Agent timeline"]);
  if (v.slug) links.push([`/p/${v.slug}/review`, "Checks & fix list"], [`/p/${v.slug}/build`, "Build steps"], [`/p/${v.slug}/preview`, "Live preview"]);
  if (v.folder) links.push([`/productions/${encodeURIComponent(v.folder)}`, "Package files"]);
  if (!links.length) return null;
  return (
    <details className="disclose border-t-2 border-ink pt-2">
      <summary>Details</summary>
      <ul className="mt-2 space-y-1 text-sm">{links.map(([to, label]) => <li key={to}><Link to={to} className="link">{label}</Link></li>)}</ul>
      {v.cost != null && <p className="mt-2 text-xs text-muted">Agent cost so far: ${v.cost.toFixed(2)}</p>}
    </details>
  );
}

function Stopped({ v }: { v: VideoDetail }) {
  const send = useSend(v.key);
  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-3 border-2 border-bad p-3">
      <p className="min-w-0 flex-1 basis-60 text-sm text-bad"><b>Stopped.</b> {v.why}</p>
      <span className="flex flex-wrap items-center gap-2">
        <Button kind="primary" onClick={() => send.mutate("continue")} disabled={send.isPending || !(v.sessionId || v.slug)}>Continue</Button>
        <SendState m={send} />
      </span>
    </div>
  );
}

export function VideoPage() {
  const key = useParams().key ?? "";
  const q = useQuery({ queryKey: ["video", key], queryFn: () => api.video(key),
    refetchInterval: (qq) => (qq.state.data && isLive(qq.state.data.stage) ? 3000 : 10000) });
  const v = q.data;
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <PageHead right={v && <StageChip stage={v.stage} text={v.stageText} />}>
        <Link to="/" className="link text-xs text-muted">← Videos</Link>
        <h1 className="max-w-none text-xl font-extrabold [overflow-wrap:anywhere]">{v?.title ?? "Video"}</h1>
      </PageHead>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {q.isLoading && <Skeleton rows={5} label="Loading the video" />}
        {q.error && <ErrorLine error={q.error} what="Could not load this video." todo="Go back to Videos and open it again." />}
        {v && <>
          <StepBar v={v} />
          {v.stage === "stopped" && <Stopped v={v} />}
          {v.stage === "script" && <Writing v={v} />}
          {v.stage === "your-script" && <ReadScript v={v} />}
          {v.stage === "building" && <Building v={v} />}
          {v.stage === "your-review" && v.slug && <Watch key="review" v={v} deliver />}
          {v.stage === "delivered" && v.slug && <Watch key="done" v={v} deliver={false} />}
          {v.stage === "stopped" && latest(v) && <Card title="The agent's last message"><Markdown text={latest(v)!} /></Card>}
          {(v.sessionId || v.slug) && <Talk v={v} />}
          <Details v={v} />
        </>}
      </div>
    </div>
  );
}
