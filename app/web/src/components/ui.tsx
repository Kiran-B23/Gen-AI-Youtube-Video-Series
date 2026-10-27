import { useEffect, useRef, type ReactNode } from "react";

export type Tone = "ok" | "warn" | "bad" | "muted" | "accent";
const toneCls: Record<Tone, string> = {
  ok: "text-ok bg-ok/10 border-ok/25", warn: "text-warn bg-warn/10 border-warn/25", bad: "text-bad bg-bad/10 border-bad/25",
  muted: "text-muted bg-panel-2 border-line", accent: "text-accent bg-accent/10 border-accent/25",
};
export function Chip({ tone = "muted", children, title }: { tone?: Tone; children: ReactNode; title?: string }) {
  return <span title={title} className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 ${toneCls[tone]}`}>{children}</span>;
}

export function Card({ title, right, children, className = "", pad = true }: { title?: ReactNode; right?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={`rounded-xl border border-line bg-panel ${className}`}>
      {title !== undefined && (
        <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-line px-4 py-2.5">
          <h3 className="text-[13px] font-semibold">{title}</h3>
          {right && <div className="flex flex-wrap items-center gap-2 text-xs text-muted">{right}</div>}
        </header>
      )}
      <div className={pad ? "p-4" : ""}>{children}</div>
    </section>
  );
}

export function Button({ children, onClick, kind = "default", disabled, title, small, type = "button" }:
  { children: ReactNode; onClick?: () => void; kind?: "default" | "primary" | "danger" | "ghost"; disabled?: boolean; title?: string; small?: boolean; type?: "button" | "submit" }) {
  const k = { default: "border-line bg-panel hover:bg-panel-2", primary: "border-accent bg-accent text-accent-ink hover:opacity-90",
    danger: "border-bad/40 text-bad hover:bg-bad/10", ghost: "border-transparent hover:bg-panel-2 text-muted" }[kind];
  return (
    <button type={type} title={title} disabled={disabled} onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-[13px]"} ${k}`}>
      {children}
    </button>
  );
}

export const Empty = ({ children }: { children: ReactNode }) => <p className="text-[13px] text-muted">{children}</p>;

export function Mark({ ok, warn }: { ok: boolean | null | undefined; warn?: boolean }) {
  if (ok === null || ok === undefined) return <span className="text-muted">–</span>;
  return ok ? <span className={warn ? "text-warn" : "text-ok"}>{warn ? "⚠" : "✓"}</span> : <span className="text-bad">✗</span>;
}

/** confirmation for the steps that spend a request, a long render, or copy to shorts/ */
export function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel, children }:
  { open: boolean; title: string; body: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void; children?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  return (
    <dialog ref={ref} onCancel={onCancel} className="m-auto w-[min(92vw,460px)] rounded-xl border border-line bg-panel p-0 text-ink shadow-2xl backdrop:bg-black/50">
      <div className="p-5">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-2 text-[13px] text-muted">{body}</p>
        {children}
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <Button onClick={onCancel}>Cancel</Button>
        <Button kind="primary" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </dialog>
  );
}
