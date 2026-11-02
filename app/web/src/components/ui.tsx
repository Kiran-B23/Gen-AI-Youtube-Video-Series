import { useEffect, useRef, type ReactNode } from "react";

export type Tone = "ok" | "warn" | "bad" | "muted" | "accent";
export function Chip({ tone = "muted", children, title }: { tone?: Tone; children: ReactNode; title?: string }) {
  return <span title={title} className="chip" data-tone={tone}>{children}</span>;
}

/** the one container: a 2px ink rule over a head row (h2 + meta), then the body */
export function Card({ title, right, children, className = "", pad = true }: { title?: ReactNode; right?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={`panel ${className}`}>
      {title !== undefined && (
        <header className="panel__head">
          <h2>{title}</h2>
          {right && <div className="panel__meta">{right}</div>}
        </header>
      )}
      <div className={pad ? "panel__body" : ""}>{children}</div>
    </section>
  );
}

export function Button({ children, onClick, kind = "default", disabled, title, small, type = "button" }:
  { children: ReactNode; onClick?: () => void; kind?: "default" | "primary" | "danger" | "ghost"; disabled?: boolean; title?: string; small?: boolean; type?: "button" | "submit" }) {
  const k = { default: "", primary: "btn--primary", danger: "btn--danger", ghost: "btn--ghost" }[kind];
  return (
    <button type={type} title={title} disabled={disabled} onClick={onClick} className={`btn ${small ? "btn--sm" : ""} ${k}`}>
      {children}
    </button>
  );
}

export const Empty = ({ children }: { children: ReactNode }) => <p className="text-sm text-muted">{children}</p>;

/** loading: still skeleton rows in the shape of what is coming (no shimmer) */
export function Skeleton({ rows = 3, label = "Loading" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-2 py-1">
      <span className="visually-hidden">{label}</span>
      {Array.from({ length: rows }, (_, i) => <span key={i} className="skeleton" style={{ width: `${92 - ((i * 23) % 40)}%` }} />)}
    </div>
  );
}

/** error: what broke, then what to do */
export function ErrorLine({ error, what, todo }: { error: unknown; what: string; todo?: string }) {
  return (
    <div role="alert" className="space-y-1 text-sm">
      <p className="font-extrabold text-bad">{what}</p>
      <p className="text-muted">{(error as Error)?.message ?? String(error)}{todo ? ` ${todo}` : ""}</p>
    </div>
  );
}

type IconName = "check" | "cross" | "warn" | "pending" | "running" | "waiting" | "menu" | "play" | "pause" | "prev" | "next" | "full" | "close" | "chevron-right" | "chevron-down";
const PATHS: Record<IconName, ReactNode> = {
  check: <path d="M3 8.5 6.5 12 13 4.5" />,
  cross: <path d="M4 4l8 8M12 4l-8 8" />,
  warn: <><path d="M8 2.5 14.5 13.5h-13z" /><path d="M8 6.5v3.5M8 11.5v.5" /></>,
  pending: <rect x="3.5" y="3.5" width="9" height="9" />,
  running: <rect x="4" y="4" width="8" height="8" fill="currentColor" />,
  waiting: <><rect x="2.5" y="2.5" width="11" height="11" /><path d="M8 5v3.5l2.5 1.5" /></>,
  menu: <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />,
  play: <path d="M5 3l8 5-8 5z" fill="currentColor" />,
  pause: <path d="M5 3.5v9M11 3.5v9" />,
  prev: <><path d="M4 3.5v9" /><path d="M12.5 3.5 6.5 8l6 4.5z" fill="currentColor" /></>,
  next: <><path d="M12 3.5v9" /><path d="M3.5 3.5 9.5 8l-6 4.5z" fill="currentColor" /></>,
  full: <path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10" />,
  close: <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />,
  "chevron-right": <path d="M6 3.5 10.5 8 6 12.5" />,
  "chevron-down": <path d="M3.5 6 8 10.5 12.5 6" />,
};
/** the app's one icon set: 16px strokes in currentColor, square caps */
export function Icon({ name, size = 16, label }: { name: IconName; size?: number; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter"
      role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">{PATHS[name]}</svg>
  );
}

/** gate states, the same on Build, Package and the project cards */
export type GateState = "pending" | "running" | "pass" | "done" | "fail" | "warn" | "waiting";
const GATE_ICON: Record<GateState, IconName> = { pending: "pending", running: "running", pass: "check", done: "check", fail: "cross", warn: "warn", waiting: "waiting" };
const GATE_WORD: Record<GateState, string> = { pending: "not run", running: "running", pass: "passed", done: "written", fail: "failed", warn: "stale", waiting: "waiting for you" };
export function Gate({ state, children, title }: { state: GateState; children: ReactNode; title?: string }) {
  return (
    <span className="gate" data-state={state} title={title ?? GATE_WORD[state]}>
      <Icon name={GATE_ICON[state]} size={12} label={GATE_WORD[state]} />{children}
    </span>
  );
}

export function Mark({ ok, warn }: { ok: boolean | null | undefined; warn?: boolean }) {
  if (ok === null || ok === undefined) return <span className="inline-flex text-muted"><Icon name="pending" size={14} label="not run" /></span>;
  return ok ? <span className={`inline-flex ${warn ? "text-warn" : "text-ok"}`}><Icon name={warn ? "warn" : "check"} size={14} label={warn ? "warning" : "passed"} /></span>
    : <span className="inline-flex text-bad"><Icon name="cross" size={14} label="failed" /></span>;
}

/** confirmation for the steps that spend a request, a long render, or copy to shorts/ */
export function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel, children }:
  { open: boolean; title: string; body: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void; children?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  return (
    <dialog ref={ref} onCancel={onCancel} className="m-auto max-h-[min(86dvh,44rem)] w-[min(92vw,520px)] border-2 border-ink bg-paper p-0 text-ink shadow-card backdrop:bg-scrim">
      <div className="border-b-2 border-ink p-5">
        <h2 className="max-w-none text-lg font-extrabold">{title}</h2>
        <p className="mt-2 text-sm text-ink-2">{body}</p>
        {children}
      </div>
      <div className="flex justify-end gap-2 px-5 py-3">
        <Button onClick={onCancel}>Cancel</Button>
        <Button kind="primary" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </dialog>
  );
}
