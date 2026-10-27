import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api, type ProjectSummary } from "../api";
import { Chip } from "./ui";

function RailProject({ p }: { p: ProjectSummary }) {
  const loc = useLocation();
  const active = loc.pathname.startsWith(`/p/${p.slug}/`);
  const dot = p.delivered ? "bg-ok" : p.review?.open === 0 && p.review.watched ? "bg-accent" : p.exists.mp4 ? "bg-warn" : "bg-line";
  return (
    <NavLink to={`/p/${p.slug}/${loc.pathname.endsWith("/review") ? "review" : "build"}`}
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] ${active ? "bg-panel-2 font-medium text-ink" : "text-muted hover:bg-panel-2 hover:text-ink"}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <span className="truncate">{p.slug}</span>
      {p.personal && <span className="ml-auto text-[10px] text-muted">personal</span>}
    </NavLink>
  );
}

function QueueStatus() {
  const jobs = useQuery({ queryKey: ["jobs", "rail"], queryFn: () => api.jobs(undefined, 20), refetchInterval: 3000 });
  const running = jobs.data?.find((j) => j.status === "running");
  const queued = jobs.data?.filter((j) => j.status === "queued").length ?? 0;
  return (
    <div className="border-t border-line px-3 py-3 text-xs">
      <div className="mb-1 font-semibold uppercase tracking-wide text-muted text-[10.5px]">Queue</div>
      {running ? <NavLink to={`/p/${running.slug}/build?step=${running.step}`} className="flex items-center gap-1.5 text-ink hover:underline">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />{running.slug} · {running.step}</NavLink>
        : <span className="text-muted">builds idle</span>}
      {queued > 0 && <div className="mt-1"><Chip tone="warn">{queued} queued</Chip></div>}
      <AgentStatus />
    </div>
  );
}

type Theme = "system" | "light" | "dark";
function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => { try { return (localStorage.getItem("studio-theme") as Theme) || "system"; } catch { return "system"; } });
  useEffect(() => {
    const r = document.documentElement;
    if (theme === "system") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", theme);
    try { localStorage.setItem("studio-theme", theme); } catch { /* private mode */ }
  }, [theme]);
  return [theme, () => setTheme(theme === "system" ? "light" : theme === "light" ? "dark" : "system")];
}

function AgentStatus() {
  const q = useQuery({ queryKey: ["packages"], queryFn: api.packages, refetchInterval: 4000 });
  const n = q.data?.approvals.length ?? 0;
  if (!q.data?.active && !n) return null;
  const sid = q.data?.approvals[0]?.session_id ?? q.data?.active;
  const item = q.data?.items.find((i) => i.session?.id === sid);
  return (
    <NavLink to={item ? `/packages/${item.id}` : "/queue"} className="mt-1 flex items-center gap-1.5 text-ink hover:underline">
      <span className={`h-2 w-2 rounded-full ${n ? "bg-warn" : "animate-pulse bg-accent"}`} />{n ? `${n} approval${n > 1 ? "s" : ""} waiting` : "agent running"}</NavLink>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [theme, cycleTheme] = useTheme();
  const projects = useQuery({ queryKey: ["projects"], queryFn: api.projects, refetchInterval: 15000 });
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full">
      <aside className={`${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-line bg-panel md:static md:flex md:w-60 md:shrink-0`}>
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-[13px] font-bold text-accent-ink">S</div>
          <div><div className="text-[14px] font-semibold leading-4">Studio</div><div className="text-[11px] text-muted">video pipeline</div></div>
        </div>
        <nav className="space-y-0.5 px-2">
          {([["/", "All projects"], ["/queue", "Queue · packages"], ["/library", "Library"], ["/settings", "Settings"]] as const).map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-lg px-2.5 py-1.5 text-[13px] ${isActive ? "bg-panel-2 font-medium" : "text-muted hover:bg-panel-2 hover:text-ink"}`}>{label}</NavLink>))}
        </nav>
        <div className="mt-3 px-4 text-[10.5px] font-semibold uppercase tracking-wide text-muted">Projects</div>
        <div className="scroll-thin mt-1 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2" onClick={() => setOpen(false)}>
          {projects.data?.map((p) => <RailProject key={p.slug} p={p} />)}
        </div>
        <QueueStatus />
        <div className="flex items-center justify-between border-t border-line px-3 py-2 text-[11px] text-muted">
          <span>theme</span>
          <button onClick={cycleTheme} className="rounded-md border border-line px-2 py-0.5 hover:text-ink" title="system → light → dark">{theme === "system" ? "◐ system" : theme === "light" ? "☀ light" : "☾ dark"}</button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line bg-panel px-3 py-2 md:hidden">
          <button onClick={() => setOpen(true)} className="rounded-md border border-line px-2 py-1 text-sm" aria-label="open the project list">☰</button>
          <span className="font-semibold">Studio</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** main pane + the right "artifact" pane (stacks under the main pane below xl) */
export function Panes({ header, main, artifact, artifactTitle }: { header: ReactNode; main: ReactNode; artifact: ReactNode; artifactTitle: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
      <main className="scroll-thin min-w-0 flex-1 xl:overflow-y-auto">
        <div className="z-10 border-b border-line bg-bg/95 px-5 py-3 md:sticky md:top-0 md:backdrop-blur">{header}</div>
        <div className="space-y-4 p-5">{main}</div>
      </main>
      <aside className="scroll-thin border-t border-line bg-panel/40 xl:w-[min(46%,600px)] xl:shrink-0 xl:overflow-y-auto xl:border-l xl:border-t-0">
        <div className="sticky top-0 z-10 border-b border-line bg-bg/90 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted backdrop-blur">{artifactTitle}</div>
        <div className="space-y-4 p-5">{artifact}</div>
      </aside>
    </div>
  );
}
