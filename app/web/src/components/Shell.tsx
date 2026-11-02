import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { Icon } from "./ui";

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

export function Shell({ children }: { children: ReactNode }) {
  const [theme, cycleTheme] = useTheme();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full">
      <aside className={`plate ${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-30 w-64 flex-col border-r-2 border-ink-rule md:static md:flex md:shrink-0`}>
        <div className="border-b-2 border-ink-rule px-4 py-4">
          <div className="text-lg font-extrabold leading-none tracking-tight">Studio</div>
        </div>
        <nav className="px-2 py-2" aria-label="Studio">
          {([["/", "Videos"], ["/trends", "Ideas"], ["/experiments", "Experiments"], ["/settings", "Settings"]] as const).map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex min-h-9 items-center px-2.5 text-sm ${isActive || (to === "/" && loc.pathname.startsWith("/v/")) ? "bg-accent font-medium text-accent-ink" : "text-ink-2 hover:bg-paper-2 hover:text-ink"}`}>{label}</NavLink>))}
        </nav>
        <div className="flex-1" />
        <div className="flex items-center justify-between border-t-2 border-ink-rule px-4 py-2 text-xs text-muted">
          <span>theme</span>
          <button onClick={cycleTheme} className="btn btn--sm" title="system, then light, then dark">{theme}</button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-20 bg-scrim md:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="plate flex items-center gap-3 px-3 py-2 md:hidden">
          <button onClick={() => setOpen(true)} className="btn btn--sm" aria-label="open the menu"><Icon name="menu" /></button>
          <span className="font-extrabold">Studio</span>
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
        <div className="z-10 border-b-2 border-ink bg-paper px-4 py-3 sm:px-6 md:sticky md:top-0">{header}</div>
        <div className="space-y-6 px-4 py-5 sm:px-6">{main}</div>
      </main>
      <aside className="scroll-thin border-t-2 border-ink bg-paper-2 xl:w-[min(46%,620px)] xl:shrink-0 xl:overflow-y-auto xl:border-l-2 xl:border-t-0">
        <div className="z-10 border-b border-rule bg-paper-2 px-4 py-3 text-sm font-extrabold sm:px-6">{artifactTitle}</div>
        <div className="space-y-6 px-4 py-5 sm:px-6">{artifact}</div>
      </aside>
    </div>
  );
}
