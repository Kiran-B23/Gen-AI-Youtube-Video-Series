// Live composition preview (no render): hf/index.html in a same-origin iframe, scaled to fit 1080×1920, driven by the
// server's injected preview runtime (the same emulation tools/payoffs.mjs uses: .clip windows, <video> clips seeked to
// t − start, window.__timelines.main.seek(t, false)). Play = requestAnimationFrame seeking in real time with
// assets/mix.wav as the clock. An approximation: the HyperFrames runtime is not loaded; the MP4 is the truth.
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { previewUrl, sceneAt, type Timeline } from "../api";
import { Scrubber, fmtTime, type BeatMark } from "./Scrubber";
import { Button, Chip, Icon } from "./ui";
import type { PlayerApi } from "./Player";

interface Info { duration: number | null; clips: number; videos: number; videosNotLoaded: number; videosBlocked: number; timelines: string[];
  fonts: string; fontsLoaded: string[]; fontsFailed: string[]; errors: string[] }
type PreviewWin = Window & { __preview?: { ready: () => boolean; seek: (t: number, playing?: boolean) => void; pause: () => void; info: () => Info } };

export function CompositionPreview({ slug, tl, version, beats, apiRef, onTime }: { slug: string; tl: Timeline; version: number | null;
  beats?: BeatMark[]; apiRef?: RefObject<PlayerApi | null>; onTime?: (t: number, playing: boolean) => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [W, H] = tl.size;
  const fps = tl.fps;
  const [scale, setScale] = useState(0.25);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [info, setInfo] = useState<Info | null>(null);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState<"audio" | "wall">("audio");
  const [audioErr, setAudioErr] = useState(false);
  const wall = useRef({ t0: 0, at: 0 });

  // fit the 1080×1920 page into the box
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(() => { const r = el.getBoundingClientRect(); setScale(Math.min(r.width / W, (window.innerHeight * 0.56) / H)); });
    ro.observe(el); return () => ro.disconnect();
  }, [W, H]);

  const win = () => frame.current?.contentWindow as PreviewWin | null | undefined;
  const drive = (x: number, live: boolean) => { const w = win(); try { if (w?.__preview?.ready()) w.__preview.seek(x, live); } catch { /* reloading */ } };
  const readInfo = () => { try { const i = win()?.__preview?.info(); if (i) setInfo(i); } catch { /* reloading */ } };

  const seek = useCallback((x: number) => {
    const c = Math.max(0, Math.min(x, tl.total - 1 / fps));
    if (audio.current && !audioErr) { try { audio.current.currentTime = c; } catch { /* not loaded */ } }
    wall.current = { t0: c, at: performance.now() };
    tRef.current = c; setT(c);
    drive(c, false);
    if (!playing) setTimeout(readInfo, 400);
  }, [tl.total, fps, audioErr, playing]);
  useEffect(() => { if (apiRef) apiRef.current = { seek, time: () => tRef.current }; });
  useEffect(() => { onTime?.(t, playing); }, [t, playing]); // eslint-disable-line react-hooks/exhaustive-deps

  // after the iframe loads: wait for the composition's timeline, fonts, then show the current time
  const onLoad = () => {
    setState("loading");
    const started = performance.now();
    const poll = () => {
      const w = win();
      let ok = false; try { ok = !!w?.__preview?.ready(); } catch { /* cross-document race */ }
      if (ok) {
        const fonts = (w!.document as Document).fonts;
        (fonts ? fonts.ready : Promise.resolve()).then(() => { drive(tRef.current, false); setState("ready"); setTimeout(readInfo, 300); });
      } else if (performance.now() - started > 20000) { setState("failed"); readInfo(); }
      else setTimeout(poll, 150);
    };
    poll();
  };

  // playback: audio is the clock (mix.wav); without it, the wall clock
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const a = audio.current;
      let x = clock === "audio" && a && !a.paused ? a.currentTime : wall.current.t0 + (performance.now() - wall.current.at) / 1000;
      if (x >= tl.total - 1 / fps) { x = tl.total - 1 / fps; setPlaying(false); a?.pause(); }
      drive(x, true); tRef.current = x; setT(x);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, clock, tl.total, fps]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = async () => {
    if (state !== "ready") return;
    const a = audio.current;
    wall.current = { t0: tRef.current, at: performance.now() };
    if (a && !audioErr) {
      try {
        // a seek before the mix's metadata arrived is dropped by the browser: wait for it, then seek, then check
        if (a.readyState < 1) await new Promise((r) => { a.addEventListener("loadedmetadata", r, { once: true }); setTimeout(r, 4000); });
        a.currentTime = tRef.current; await a.play();
        if (Math.abs(a.currentTime - tRef.current) > 0.25) a.currentTime = tRef.current;
        setClock("audio");
      } catch { setClock("wall"); }
    } else setClock("wall");
    setPlaying(true);
  };
  const pause = () => {
    audio.current?.pause(); setPlaying(false);
    try { win()?.__preview?.pause(); } catch { /* */ }
    drive(tRef.current, false); setTimeout(readInfo, 400);
  };
  const step = (n: number) => { if (playing) pause(); seek(Math.round(tRef.current * fps + n) / fps + 0.001); };
  const sc = sceneAt(tl, t);
  const src = `${previewUrl(slug)}${version ? `?v=${Math.round(version)}` : ""}`;

  return (
    <div className="space-y-3">
      <div className="notice" data-tone="warn">
        <b>Approximation of the render.</b> This is hf/index.html in a frame with the HyperFrames runtime emulated (clip windows + the GSAP timeline
        seeked to t, as payoffs does), not the renderer. Timing, fonts and most motion match; video clips, filters and anything the runtime adds can
        differ. The MP4 is the truth.
      </div>
      <div ref={box} className="relative w-full">
        <div className="relative mx-auto overflow-hidden border-2 border-ink bg-plate" style={{ width: W * scale, height: H * scale }} onClick={() => (playing ? pause() : play())}>
          <iframe ref={frame} src={src} title={`${slug} composition`} onLoad={onLoad} tabIndex={-1}
            style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0, pointerEvents: "none", display: "block" }} />
          {state !== "ready" && <div className="absolute inset-0 grid place-items-center bg-scrim text-sm text-plate-ink">
            {state === "loading" ? "loading the composition…" : "the composition has no window.__timelines.main (see the notes below)"}</div>}
          {state === "ready" && !playing && <span aria-hidden="true" className="pointer-events-none absolute inset-0 m-auto grid h-12 w-12 place-items-center bg-accent text-accent-ink"><Icon name="play" size={20} /></span>}
        </div>
        <audio ref={audio} src={previewUrl(slug, "assets/mix.wav")} preload="auto" onError={() => { setAudioErr(true); setClock("wall"); }} />
      </div>
      <Scrubber tl={tl} t={t} onSeek={(x) => { if (playing) { seek(x); wall.current = { t0: x, at: performance.now() }; } else seek(x); }} beats={beats} />
      <div className="flex flex-wrap items-center gap-1.5">
        <Button small onClick={() => step(-fps)}>−1s</Button>
        <Button small onClick={() => step(-1)} title="previous frame"><Icon name="prev" size={12} />1f</Button>
        <Button small kind="primary" disabled={state !== "ready"} onClick={() => (playing ? pause() : play())}>{playing ? "Pause" : "Play"}</Button>
        <Button small onClick={() => step(1)} title="next frame">1f<Icon name="next" size={12} /></Button>
        <Button small onClick={() => step(fps)}>+1s</Button>
        <span className="ml-1 flex gap-2 text-xs tabular-nums text-muted"><span><b className="font-extrabold text-ink">{fmtTime(t)}</b> / {fmtTime(tl.total)}</span><span>f<b className="font-extrabold text-ink">{Math.floor(t * fps + 1e-6)}</b></span>{sc && <span className="text-ink">{sc.id}</span>}</span>
        <span className="ml-auto flex flex-wrap gap-1.5">
          <Chip tone={clock === "audio" && !audioErr ? "ok" : "warn"} title="what drives playback">clock: {audioErr ? "wall (no mix.wav)" : clock === "audio" ? "mix.wav" : "wall"}</Chip>
          <Button small kind="ghost" onClick={() => { pause(); frame.current?.contentWindow?.location.reload(); }} title="reload hf/ (after assemble)">reload</Button>
        </span>
      </div>
      {info && (
        <div className="flex flex-wrap gap-1.5 text-xs">
          <Chip>{info.clips} clips</Chip>
          <Chip tone={info.videos && info.videosNotLoaded ? "warn" : "muted"} title="video clips (seeked to t − start; they play muted while previewing)">{info.videos} video clips{info.videosNotLoaded ? `, ${info.videosNotLoaded} not decoded yet` : ""}</Chip>
          <Chip tone={info.fontsFailed.length ? "bad" : "ok"} title={info.fontsLoaded.join(", ")}>fonts {info.fonts}{info.fontsFailed.length ? `, failed: ${info.fontsFailed.join(", ")}` : `, ${new Set(info.fontsLoaded).size} loaded`}</Chip>
          <Chip tone={info.duration && Math.abs(info.duration - tl.total) > 0.5 ? "warn" : "muted"} title="the GSAP timeline's own length vs layout.json">timeline {info.duration?.toFixed(1) ?? "unknown"} s</Chip>
          {info.errors.length > 0 && <Chip tone="bad" title={info.errors.join("\n")}>{info.errors.length} page error(s)</Chip>}
        </div>)}
    </div>
  );
}
