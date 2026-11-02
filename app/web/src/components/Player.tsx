// The MP4 review player: the rendered out/<slug>.mp4 (served by /files with Range), frame-step at 30 fps, the scrub bar
// with the scenes and beats from build/layout.json, and "add finding at current time". Playback speed stays 1× unless
// the reviewer changes it. Captions are burned into the video, so any text track is kept hidden.
import { useEffect, useRef, useState, type RefObject } from "react";
import { sceneAt, secs, type Timeline } from "../api";
import { Scrubber, fmtTime, type BeatMark } from "./Scrubber";
import { Button, Icon } from "./ui";

export interface PlayerApi { seek: (t: number) => void; time: () => number; pause?: () => void }

export function Player({ src, tl, beats, apiRef, onAddFinding, label }: { src: string; tl: Timeline | null; beats?: BeatMark[];
  apiRef?: RefObject<PlayerApi | null>; onAddFinding?: (at: { t: number; scene: string | null }) => void; label?: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(tl?.total ?? 0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const fps = tl?.fps ?? 30;

  // smooth playhead while playing (timeupdate fires only ~4×/s)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => { if (v.current) setT(v.current.currentTime); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (x: number) => { const el = v.current; if (!el) return; el.currentTime = Math.max(0, Math.min(x, (el.duration || dur) - 0.001)); setT(el.currentTime); };
  // frame k covers [k/fps, (k+1)/fps): land just inside it so the decoder shows that frame
  const frame = (n: number) => { const el = v.current; if (!el) return; el.pause(); const k = Math.round(el.currentTime * fps) + n; seek(Math.max(0, k) / fps + 0.001); };
  useEffect(() => {
    if (apiRef) apiRef.current = { seek: (x) => { seek(x); v.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, time: () => v.current?.currentTime ?? 0, pause: () => v.current?.pause() };
  });

  const toggle = () => { const el = v.current; if (!el) return; if (el.paused) void el.play(); else el.pause(); };
  const sc = sceneAt(tl, t);
  const onKey = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === "SELECT") return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    else if (e.key === "," || (e.key === "ArrowLeft" && !e.shiftKey)) { e.preventDefault(); frame(-1); }
    else if (e.key === "." || (e.key === "ArrowRight" && !e.shiftKey)) { e.preventDefault(); frame(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); seek(t - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); seek(t + 1); }
  };
  return (
    <div className="space-y-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus" tabIndex={0} onKeyDown={onKey} aria-label={label ?? "video player"}>
      <div className="relative">
        <video ref={v} src={src} preload="metadata" playsInline muted={muted} onClick={toggle}
          className="mx-auto aspect-[9/16] max-h-[68dvh] w-full cursor-pointer border-2 border-ink bg-plate object-contain"
          onLoadedMetadata={(e) => { const el = e.currentTarget; setDur(el.duration); for (const tr of Array.from(el.textTracks)) tr.mode = "hidden"; el.playbackRate = rate; }}
          onPlay={() => setPlaying(true)} onPause={(e) => { setPlaying(false); setT(e.currentTarget.currentTime); }}
          onSeeked={(e) => setT(e.currentTarget.currentTime)} onTimeUpdate={(e) => !playing && setT(e.currentTarget.currentTime)} />
        {!playing && t === 0 && <button onClick={toggle} aria-label="play" className="btn btn--primary absolute inset-0 m-auto h-14 w-14 p-0"><Icon name="play" size={22} /></button>}
      </div>
      {tl ? <Scrubber tl={{ ...tl, total: dur || tl.total }} t={t} onSeek={seek} beats={beats} />
        : <input type="range" min={0} max={dur || 1} step={1 / fps} value={t} onChange={(e) => seek(Number(e.target.value))} className="w-full" aria-label="scrub" />}
      <div className="flex flex-wrap items-center gap-1.5">
        <Button small onClick={() => seek(t - 1)} title="back 1 s (shift+←)">−1s</Button>
        <Button small onClick={() => frame(-1)} title="previous frame (← or ,)"><Icon name="prev" size={12} />1f</Button>
        <Button small kind="primary" onClick={toggle} title="play / pause (space)">{playing ? "Pause" : "Play"}</Button>
        <Button small onClick={() => frame(1)} title="next frame (→ or .)">1f<Icon name="next" size={12} /></Button>
        <Button small onClick={() => seek(t + 1)} title="forward 1 s (shift+→)">+1s</Button>
        <span className="ml-1 flex gap-2 text-xs tabular-nums text-muted"><span><b className="font-extrabold text-ink">{fmtTime(t)}</b> / {fmtTime(dur)}</span><span>f<b className="font-extrabold text-ink">{Math.floor(t * fps + 1e-6)}</b></span>{sc && <span className="text-ink">{sc.id}</span>}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <select value={rate} onChange={(e) => { const r = Number(e.target.value); setRate(r); if (v.current) v.current.playbackRate = r; }}
            className="field field--sm" aria-label="playback speed" title="playback speed (stays 1× unless you change it)">
            <option value={1}>1×</option><option value={0.5}>0.5×</option><option value={0.25}>0.25×</option>
          </select>
          <Button small kind="ghost" onClick={() => setMuted(!muted)} title="mute">{muted ? "unmute" : "mute"}</Button>
          <Button small kind="ghost" onClick={() => v.current?.requestFullscreen?.()} title="full screen"><Icon name="full" label="full screen" /></Button>
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>Captions are burned into the render (no caption track shown). Keys: space plays, the arrow keys step a frame, shift and an arrow step 1 s.</span>
        {onAddFinding && <Button small onClick={() => { v.current?.pause(); onAddFinding({ t, scene: sc?.id ?? null }); }}>+ Finding at {secs(t)}{sc ? ` in ${sc.id}` : ""}</Button>}
      </div>
    </div>
  );
}
