import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ago, api, fileUrl, type ProjectSummary } from "../api";
import { GateStrip, nextStatus } from "../components/StatusChips";
import { Empty, ErrorLine, Gate } from "../components/ui";

export function Projects() {
  const q = useQuery({ queryKey: ["projects"], queryFn: api.projects });
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
        <h1 className="max-w-none text-xl font-extrabold">Projects</h1>
      </div>
      <div className="grid gap-x-6 gap-y-8 px-4 py-6 sm:px-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
        {q.isLoading && Array.from({ length: 6 }, (_, i) => (
          <div key={i} role={i === 0 ? "status" : undefined} className="flex gap-3 border-t-2 border-rule pt-3">
            {i === 0 && <span className="sr-only">Loading projects</span>}
            <span className="skeleton h-[96px] w-[54px] shrink-0" /><span className="flex-1 space-y-2"><span className="skeleton w-2/3" /><span className="skeleton w-1/2" /><span className="skeleton w-5/6" /></span>
          </div>))}
        {q.error && <ErrorLine error={q.error} what="Could not load the projects." todo="Reload; the server reads studio/projects/." />}
        {q.data?.length === 0 && <Empty>No projects in studio/projects/ yet. Make one with /video-studio from a package.</Empty>}
        {q.data?.map((p) => (
          <article key={p.slug} className="flex min-w-0 flex-col border-t-2 border-ink">
            <div className="flex gap-3 py-3">
              <div className="h-[96px] w-[54px] shrink-0 overflow-hidden border-2 border-ink bg-paper-2">
                {p.exists.sheets > 0 && <img loading="lazy" alt="" width={54} height={96} src={fileUrl(p.slug, "watch/sheet-01.png")} className="h-full w-full object-cover object-left-top" />}
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="min-w-0 max-w-none truncate text-md font-extrabold"><Link to={`/p/${p.slug}/build`} className="link no-underline hover:underline">{p.slug}</Link></h2>
                  <span className="shrink-0 text-xs text-muted">{ago(p.mtime)}</span>
                </div>
                {p.personal && <div className="text-xs text-ink">personal</div>}
                <Next p={p} />
                <GateStrip s={p} />
              </div>
            </div>
            <nav className="seg mt-auto flex" aria-label={`${p.slug} views`}>
              <Link to={`/p/${p.slug}/build`} className="flex-1 justify-center">Build</Link>
              <Link to={`/p/${p.slug}/review`} className="flex-1 justify-center">Review</Link>
            </nav>
          </article>
        ))}
      </div>
    </div>
  );
}

function Next({ p }: { p: ProjectSummary }) {
  const n = nextStatus(p);
  return <div><Gate state={n.state}>{n.text}</Gate></div>;
}
