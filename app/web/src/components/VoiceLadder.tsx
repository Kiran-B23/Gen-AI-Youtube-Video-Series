// The pace ladder in Build → Voice: 1) RESPLIT the saved take after raising voice.minPause / per-scene "pad" (free),
// 2) "pauseAfter" words on the fast scenes, 3) a retake (or another voice; the picker shows each voice's logged raw pace).
// Saving writes only those keys in scenes.json, then the server queues validate.
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Project } from "../api";
import { Button, Card, Chip } from "./ui";

export function VoiceLadder({ p, onResplit, onJob }: { p: Project; onResplit: () => void; onJob: (id: number) => void }) {
  const qc = useQueryClient();
  const voices = useQuery({ queryKey: ["voices"], queryFn: api.voices, staleTime: 60000 });
  const init = useMemo(() => ({
    sentence: p.spec.voice?.minPause?.sentence?.toString() ?? "", comma: p.spec.voice?.minPause?.comma?.toString() ?? "",
    voice: p.spec.voice?.name ?? "",
    scenes: Object.fromEntries(p.scenes.map((s) => [s.id, { pad: s.pad?.toString() ?? "", pauseAfter: s.pauseAfter.join(", ") }])) as Record<string, { pad: string; pauseAfter: string }>,
  }), [p]);
  const [f, setF] = useState(init);
  useEffect(() => setF(init), [init]);
  const [all, setAll] = useState(false);
  const fast = new Set((p.pace?.rows ?? []).filter((r) => r.flags.length).map((r) => r.scene));
  const shown = p.scenes.filter((s) => all || fast.has(s.id) || s.pad !== null || s.pauseAfter.length);
  const num = (v: string) => (v.trim() === "" ? null : Number(v));
  const patch = () => {
    const out: Record<string, unknown> = {};
    if (f.sentence !== init.sentence || f.comma !== init.comma) out.minPause = { sentence: num(f.sentence), comma: num(f.comma) };
    if (f.voice && f.voice !== init.voice) out.voiceName = f.voice;
    const sc: Record<string, unknown> = {};
    for (const s of p.scenes) {
      const a = f.scenes[s.id], b = init.scenes[s.id];
      if (!a || !b) continue;
      const x: Record<string, unknown> = {};
      if (a.pad !== b.pad) x.pad = num(a.pad);
      if (a.pauseAfter !== b.pauseAfter) x.pauseAfter = a.pauseAfter.split(/[,\s]+/).map((w) => w.trim()).filter(Boolean);
      if (Object.keys(x).length) sc[s.id] = x;
    }
    if (Object.keys(sc).length) out.scenes = sc;
    return out;
  };
  const changes = Object.keys(patch()).length > 0;
  const save = useMutation({
    mutationFn: () => api.voice(p.slug, patch()),
    onSuccess: (d) => { qc.setQueryData(["project", p.slug], d.project); if (d.job) onJob(d.job.id); },
  });
  const inp = "w-16 rounded-md border border-line bg-panel px-1.5 py-0.5 text-right text-xs";
  const vp = voices.data?.find((v) => v.name === (f.voice || init.voice));
  return (
    <Card pad={false} title="Pace ladder (scenes.json)" right={<span>save → validate runs</span>}>
      <div className="space-y-3 px-4 py-3 text-[12.5px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">1 ·</span>
          <Button small kind="primary" onClick={onResplit} title="RESPLIT=1 run.sh voice: re-split the saved take with the current pauses (no Gemini request)">Re-split the saved take (free)</Button>
          <span className="text-muted">after changing the pauses below; never speeds the voice</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted">voice.minPause</span>
          <label className="flex items-center gap-1">sentence <input className={inp} value={f.sentence} placeholder="0.5" onChange={(e) => setF({ ...f, sentence: e.target.value })} /> s</label>
          <label className="flex items-center gap-1">comma <input className={inp} value={f.comma} placeholder="0.22" onChange={(e) => setF({ ...f, comma: e.target.value })} /> s</label>
          <span className="text-[11px] text-muted">empty = pace.json default; capped by pause_*_max</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted">voice</span>
          <select value={f.voice} onChange={(e) => setF({ ...f, voice: e.target.value })} disabled={p.spec.voice?.engine !== "gemini" && !!p.spec.voice?.engine || p.spec.voice?.speakers}
            className="rounded-md border border-line bg-panel px-1.5 py-1 text-xs" aria-label="voice">
            {!f.voice && <option value="">(voice.py default)</option>}
            {(voices.data ?? []).slice().sort((a, b) => Number(b.takes > 0) - Number(a.takes > 0) || a.name.localeCompare(b.name)).map((v) =>
              <option key={v.name} value={v.name}>{v.name}{v.rawPace !== null ? ` · raw ${v.rawPace} w/s (${v.takes} take${v.takes > 1 ? "s" : ""})` : " · no take logged"}</option>)}
          </select>
          {vp?.rawPace != null && <Chip tone={vp.rawPace > 3.2 ? "bad" : vp.rawPace > 2.6 ? "warn" : "ok"}>raw {vp.rawPace} w/s</Chip>}
          <span className="text-[11px] text-muted">{p.spec.voice?.engine && p.spec.voice.engine !== "gemini" ? `engine ${p.spec.voice.engine}: picker is for Gemini` : "a new voice needs a retake (spends a request)"}</span>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between"><span className="font-semibold">2 · per scene <span className="font-normal text-muted">pad (hold after the line) · pauseAfter (words that get a sentence pause)</span></span>
            <button className="text-[11px] text-accent hover:underline" onClick={() => setAll(!all)}>{all ? "flagged scenes only" : `all ${p.scenes.length} scenes`}</button></div>
          <div className="scroll-thin max-h-72 overflow-auto"><table className="data">
            <thead><tr><th>scene</th><th className="num">pad s</th><th>pauseAfter</th><th>line</th></tr></thead>
            <tbody>{shown.map((s) => (
              <tr key={s.id} className={fast.has(s.id) ? "bg-warn/5" : ""}>
                <td className="font-mono">{s.id}{fast.has(s.id) && <span className="text-warn"> ⚠</span>}</td>
                <td className="num"><input className={inp} value={f.scenes[s.id]?.pad ?? ""} placeholder={String(p.spec.padSeconds)} aria-label={`${s.id} pad`}
                  onChange={(e) => setF({ ...f, scenes: { ...f.scenes, [s.id]: { ...f.scenes[s.id], pad: e.target.value } } })} /></td>
                <td><input className="w-40 rounded-md border border-line bg-panel px-1.5 py-0.5 text-xs" value={f.scenes[s.id]?.pauseAfter ?? ""} placeholder="word, word" aria-label={`${s.id} pauseAfter`}
                  onChange={(e) => setF({ ...f, scenes: { ...f.scenes, [s.id]: { ...f.scenes[s.id], pauseAfter: e.target.value } } })} /></td>
                <td className="max-w-[16rem] truncate text-muted" title={s.say}>{s.say}</td>
              </tr>))}</tbody>
          </table>{shown.length === 0 && <div className="py-2 text-xs text-muted">No flagged scenes. “all scenes” to edit any.</div>}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button small kind="primary" disabled={!changes || save.isPending} onClick={() => save.mutate()}>Save to scenes.json</Button>
          {changes && <Button small kind="ghost" onClick={() => setF(init)}>Reset</Button>}
          {save.isError && <span className="text-[11px] text-bad">{(save.error as Error).message}</span>}
          {save.isSuccess && <span className="text-[11px] text-ok">{save.data.changes.length ? `saved: ${save.data.changes.join(" · ")} · validate queued` : "nothing changed"}</span>}
        </div>
        <div className="text-[11px] text-muted"><span className="font-semibold">3 ·</span> still failing: shorten the line and retake (Run voice → RETAKE=1).</div>
      </div>
    </Card>
  );
}
