import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ago, api, fileUrl } from "../api";
import { StatusChips } from "../components/StatusChips";
import { Empty } from "../components/ui";

export function Projects() {
  const q = useQuery({ queryKey: ["projects"], queryFn: api.projects });
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bg/90 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold">Projects</h1>
        <p className="text-xs text-muted">studio/projects/*: newest first. Build runs the run.sh steps; Review holds the sheets and the fix list.</p>
      </div>
      <div className="grid gap-4 p-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
        {q.isLoading && <Empty>Loading…</Empty>}
        {q.error && <Empty>Could not load projects: {(q.error as Error).message}</Empty>}
        {q.data?.map((p) => (
          <div key={p.slug} className="flex flex-col overflow-hidden rounded-xl border border-line bg-panel">
            <div className="flex gap-3 p-4">
              <div className="h-[86px] w-[48px] shrink-0 overflow-hidden rounded-md border border-line bg-panel-2">
                {p.exists.sheets > 0 && <img loading="lazy" alt="" src={fileUrl(p.slug, "watch/sheet-01.png")} className="h-full w-full object-cover object-left-top" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <Link to={`/p/${p.slug}/build`} className="truncate text-[15px] font-semibold hover:underline">{p.slug}</Link>
                  <span className="shrink-0 text-[11px] text-muted">{ago(p.mtime)}</span>
                </div>
                <div className="truncate text-xs text-muted">{p.package ? <span className="font-mono">{p.package.path.replace(/^productions\//, "")}</span> : "no package"} · {p.engine}{p.personal ? " · personal" : ""}</div>
                <div className="mt-2"><StatusChips s={p} /></div>
              </div>
            </div>
            <div className="mt-auto flex border-t border-line text-[13px]">
              <Link to={`/p/${p.slug}/build`} className="flex-1 py-2 text-center hover:bg-panel-2">Build</Link>
              <Link to={`/p/${p.slug}/review`} className="flex-1 border-l border-line py-2 text-center hover:bg-panel-2">Review</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
