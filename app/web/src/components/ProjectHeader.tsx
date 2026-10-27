import { NavLink } from "react-router";
import { ago, type Project } from "../api";
import { StatusChips } from "./StatusChips";

export function ProjectHeader({ p }: { p: Project }) {
  const tab = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-1 text-[13px] ${isActive ? "bg-panel text-ink shadow-sm" : "text-muted hover:text-ink"}`;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h1 className="break-all text-lg font-semibold">{p.slug}</h1>
          <span className="text-xs text-muted">{p.format} · {p.engine}{p.spec.stage ? ` · ${p.spec.stage}` : ""} · updated {ago(p.mtime)}</span>
        </div>
        <div className="mt-0.5 truncate text-xs text-muted">
          {p.package ? <>package <span className={`font-mono ${p.package.exists ? "" : "text-bad line-through"}`}>{p.package.path}</span></> : "no package linked in scenes.json"}
          {p.spec.voice && <> · voice {p.spec.voice.name ?? p.spec.voice.engine}</>}
        </div>
        <div className="mt-2"><StatusChips s={{ ...p, ...p.status }} /></div>
      </div>
      <div className="flex rounded-lg border border-line bg-panel-2 p-0.5">
        <NavLink to={`/p/${p.slug}/build`} className={tab}>Build</NavLink>
        <NavLink to={`/p/${p.slug}/preview`} className={tab}>Preview</NavLink>
        <NavLink to={`/p/${p.slug}/review`} className={tab}>Review</NavLink>
      </div>
    </div>
  );
}
