import { NavLink } from "react-router";
import { ago, type Project } from "../api";
import { StatusChips } from "./StatusChips";

export function ProjectHeader({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
      <div className="min-w-0 space-y-1.5">
        <h1 className="max-w-none break-all text-xl font-extrabold leading-tight">{p.slug}</h1>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 text-xs text-muted">
          <span>updated <span className="text-ink-2">{ago(p.mtime)}</span></span>
          {p.package && <div className="min-w-0 truncate"><span className="sr-only">package </span><span>
            <span className={p.package.exists ? "text-ink-2" : "text-bad line-through"} title={p.package.exists ? p.package.path : `${p.package.path} (missing)`}>{p.package.path.replace(/^productions\//, "")}</span></span></div>}
          <details className="disclose open:basis-full">
            <summary>Details</summary>
            <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              <dt>format</dt><dd className="text-ink-2">{p.format}</dd>
              <dt>engine</dt><dd className="text-ink-2">{p.engine}</dd>
              {p.spec.stage && <><dt>stage</dt><dd className="text-ink-2">{p.spec.stage}</dd></>}
              {p.spec.voice && <><dt>voice</dt><dd className="text-ink-2">{p.spec.voice.name ?? p.spec.voice.engine}</dd></>}
              {!p.package && <><dt>package</dt><dd>none linked in scenes.json</dd></>}
            </dl>
          </details>
        </div>
        <StatusChips s={{ ...p, ...p.status }} />
      </div>
      <nav className="seg" aria-label="Project views">
        <NavLink to={`/p/${p.slug}/build`}>Build</NavLink>
        <NavLink to={`/p/${p.slug}/preview`}>Preview</NavLink>
        <NavLink to={`/p/${p.slug}/review`}>Review</NavLink>
      </nav>
    </div>
  );
}
