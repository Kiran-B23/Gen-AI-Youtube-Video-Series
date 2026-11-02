// Videos: the home screen of the simple interface. One card per video (GET /api/videos), grouped by whose turn it is,
// a "New video" form that creates and starts a package, and the top trend topics as ideas to start from.
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ago, api, fileUrl, type TrendTopic, type Video } from "../api";
import { Button, Card, Empty, ErrorLine, Skeleton } from "../components/ui";
import { PageHead, StageChip, isYourTurn } from "../components/video";

interface Draft { topic: string; notes: string }

function NewVideo({ draft, setDraft, onClose }: { draft: Draft; setDraft: (d: Draft) => void; onClose: () => void }) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const make = useMutation({
    mutationFn: () => api.createPkg({ kind: "package", topic: draft.topic.trim(), format: "reel", notes: draft.notes.trim(), start: true }),
    onSuccess: (p) => { qc.invalidateQueries({ queryKey: ["videos"] }); nav(`/v/pkg-${p.id}`); },
  });
  return (
    <Card title="New video" right={<Button small kind="ghost" onClick={onClose}>Close</Button>}>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (draft.topic.trim()) make.mutate(); }}>
        <label className="block space-y-1">
          <span className="block text-xs text-muted">Topic</span>
          <input autoFocus className="field w-full" value={draft.topic} placeholder="e.g. What is a context window?"
            onChange={(e) => setDraft({ ...draft, topic: e.target.value })} />
        </label>
        <label className="block space-y-1">
          <span className="block text-xs text-muted">Notes for the agent (optional)</span>
          <textarea className="field w-full" rows={3} value={draft.notes} placeholder="Angle, audience, anything to include or avoid"
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" kind="primary" disabled={!draft.topic.trim() || make.isPending}>{make.isPending ? "Starting…" : "Start"}</Button>
          <span className="text-xs text-muted">The agent researches and writes the script, then asks you to read it.</span>
        </div>
        {make.isError && <ErrorLine error={make.error} what="Could not start the video." />}
      </form>
    </Card>
  );
}

function VideoCard({ v }: { v: Video }) {
  return (
    <Link to={`/v/${encodeURIComponent(v.key)}`} className="flex min-w-0 gap-3 border-t-2 border-ink py-3 no-underline hover:bg-paper-2">
      <div className="h-[96px] w-[54px] shrink-0 overflow-hidden border-2 border-ink bg-paper-2">
        {v.hasVideo && v.slug && <video muted playsInline preload="metadata" src={`${fileUrl(v.slug, `${v.slug}.mp4`)}#t=0.1`} className="h-full w-full object-cover" aria-hidden="true" tabIndex={-1} />}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="min-w-0 max-w-none truncate text-md font-extrabold">{v.title}</h3>
          <span className="shrink-0 text-xs text-muted">{ago(v.updated)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StageChip stage={v.stage} text={v.stageText} />
          {v.personal && <span className="text-xs text-muted">personal</span>}
        </div>
        {v.why && <p className="line-clamp-2 text-xs text-ink-2">{v.why}</p>}
      </div>
    </Link>
  );
}

function Group({ title, items, open = true }: { title: string; items: Video[]; open?: boolean }) {
  if (!items.length) return null;
  const grid = <div className="grid gap-x-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">{items.map((v) => <VideoCard key={v.key} v={v} />)}</div>;
  return open
    ? <section className="space-y-2"><h2 className="max-w-none text-md font-extrabold">{title} <span className="font-medium text-muted">{items.length}</span></h2>{grid}</section>
    : <details className="disclose space-y-2"><summary className="text-md font-extrabold">{title} <span className="font-medium">{items.length}</span></summary>{grid}</details>;
}

function Ideas({ onMake }: { onMake: (t: TrendTopic) => void }) {
  const q = useQuery({ queryKey: ["trends"], queryFn: api.trends });
  const top = q.data?.latest?.top.slice(0, 5) ?? [];
  return (
    <Card title="Ideas" right={<Link to="/trends" className="link">All trends</Link>}>
      {q.isLoading && <Skeleton rows={3} label="Loading ideas" />}
      {q.error && <ErrorLine error={q.error} what="Could not load the ideas." />}
      {q.data && !top.length && <Empty>No trend topics yet. Open Ideas to take a snapshot.</Empty>}
      <ol className="divide-y divide-rule">{top.map((t) => (
        <li key={t.key} className="flex flex-wrap items-start justify-between gap-2 py-2.5">
          <div className="min-w-0 flex-1 basis-60">
            <div className="font-extrabold [overflow-wrap:anywhere]">{t.name}</div>
            {t.angle && <p className="text-xs text-ink-2">{t.angle}</p>}
          </div>
          <Button small onClick={() => onMake(t)}>Make this</Button>
        </li>))}</ol>
    </Card>
  );
}

export function Videos() {
  const q = useQuery({ queryKey: ["videos"], queryFn: api.videos, refetchInterval: 5000 });
  const [form, setForm] = useState(false);
  const [draft, setDraft] = useState<Draft>({ topic: "", notes: "" });
  const [personal, setPersonal] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const all = (q.data ?? []).filter((v) => personal || !v.personal);
  const hidden = (q.data ?? []).filter((v) => v.personal).length;
  const make = (t: TrendTopic) => {
    setDraft({ topic: t.name.replace(/[\r\n]+/g, " ").slice(0, 300), notes: [t.angle && `Angle: ${t.angle}`, t.why && `Why now: ${t.why}`].filter(Boolean).join("\n") });
    setForm(true);
    top.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  return (
    <div ref={top} className="scroll-thin flex-1 overflow-y-auto">
      <PageHead right={!form && <Button kind="primary" onClick={() => setForm(true)}>New video</Button>}>
        <h1 className="max-w-none text-xl font-extrabold">Videos</h1>
      </PageHead>
      <div className="space-y-8 px-4 py-6 sm:px-6">
        {form && <NewVideo draft={draft} setDraft={setDraft} onClose={() => setForm(false)} />}
        {q.isLoading && <Skeleton rows={4} label="Loading videos" />}
        {q.error && <ErrorLine error={q.error} what="Could not load the videos." todo="Reload the page." />}
        {q.data && !all.length && <Empty>No videos yet. Press New video, or pick an idea below.</Empty>}
        <Group title="Waiting for you" items={all.filter((v) => isYourTurn(v.stage))} />
        <Group title="In progress" items={all.filter((v) => !isYourTurn(v.stage) && v.stage !== "delivered")} />
        <Group title="Done" items={all.filter((v) => v.stage === "delivered")} open={false} />
        {hidden > 0 && (
          <label className="flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" checked={personal} onChange={(e) => setPersonal(e.target.checked)} /> Show personal ({hidden})
          </label>)}
        <Ideas onMake={make} />
      </div>
    </div>
  );
}
