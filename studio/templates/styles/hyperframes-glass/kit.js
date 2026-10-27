// hyperframes-glass house style · stage helpers (loaded before the project's stage.js). Same API names as reference-flat.
const $ = id => document.getElementById(id);
const END = sid => S[sid] + D[sid];
let __seed = 4821; const rnd = () => { __seed = (__seed * 1664525 + 1013904223) % 4294967296; return __seed / 4294967296; };

const show = (id, t0, t1) => { tl.set('#' + id, { visibility: 'visible', opacity: 1 }, t0); if (t1 != null) tl.set('#' + id, { visibility: 'hidden', opacity: 0 }, t1); };
// blur-in: the signature entrance (focus pulls in while it rises)
const pop = (id, t, o = {}) => tl.fromTo('#' + id, { opacity: 0, y: o.y ?? 40, x: o.x ?? 0, scale: o.s ?? 0.96, filter: `blur(${o.b ?? 18}px)` },
  { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)', duration: o.d ?? 0.6, ease: o.ease ?? 'power3.out' }, t);
const fade = (id, t, d = 0.3) => tl.to('#' + id, { opacity: 0, filter: 'blur(12px)', duration: d }, t);
// glass "slam": drops in from a 3D tilt and settles
const slam = (id, t, rot = -4) => tl.fromTo('#' + id, { opacity: 0, scale: 1.6, rotationX: 50, rotation: rot - 6, filter: 'blur(14px)' },
  { opacity: 1, scale: 1, rotationX: 0, rotation: rot, filter: 'blur(0px)', duration: 0.5, ease: 'back.out(1.6)' }, t);
const count = (id, from, to, t, d, fmt) => { const el = $(id), o = { v: from }; el.textContent = fmt(to);
  tl.fromTo('#' + id, { opacity: 0, filter: 'blur(16px)', scale: 0.9 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.4, ease: 'power3.out' }, t);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } }, t); };
const typeText = (id, text, t0, t1) => { const el = $(id), o = { n: 0 }; el.textContent = ''; tl.fromTo(o, { n: 0 }, { n: text.length, duration: Math.max(0.2, t1 - t0), ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)); } }, t0); };
// per-word rise: wraps each word of #id in .wd and raises them in turn
const words = (id, t, step = 0.07) => { const el = $(id); el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="wd">${w}</span>`).join(' ');
  tl.set('#' + id, { opacity: 1 }, t);
  tl.fromTo(`#${id} .wd`, { opacity: 0, y: 60, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: step, ease: 'power3.out' }, t); };
const sweep = (cardId, t) => tl.fromTo(`#${cardId} .sweep`, { xPercent: 0, opacity: 1 }, { xPercent: 475, duration: 0.9, ease: 'power2.inOut' }, t);   // transforms only (the capture engine snaps layout props)
// glass drift: slow 3D tilt so nothing ever sits still
const drift = (id, t0, t1) => tl.fromTo('#' + id, { scale: 1, rotationY: -2 }, { scale: 1.02, rotationY: 2, duration: t1 - t0, ease: 'sine.inOut' }, t0);
const group = (id, t0, t1) => { show(id, t0, t1); drift(id, t0, t1); };
// zoom-through between steps: the outgoing group pushes towards the viewer and blurs out
const zoomOut = (id, t, d = 0.35) => tl.to('#' + id, { scale: 1.25, opacity: 0, filter: 'blur(20px)', duration: d, ease: 'power2.in' }, t);

// chapter card: kicker + gradient numeral + title, blur-in, zooms through on exit; returns when it has fully left
const chapter = (id, t0, t1) => {
  t0 -= 0.2; show(id, t0, t1 + 0.35);
  tl.fromTo(`#${id} .chapn`, { opacity: 0, scale: 0.7, filter: 'blur(30px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, t0);
  tl.fromTo(`#${id} .chapk`, { opacity: 0, scaleX: 1.6, transformOrigin: '0% 50%' }, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' }, t0);   // tracking-in, as a transform
  tl.fromTo(`#${id} .chapt`, { opacity: 0, y: 40, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, t0 + 0.12);
  zoomOut(id, t1, 0.35);
  return t1 + 0.35;
};
// progress: ring fills k/n, label "STEP k / n"
const progress = (lights, t0, t1) => {
  tl.set('#prog', { opacity: 1 }, t0); tl.set('#prog', { opacity: 0 }, t1);
  lights.forEach((sid, k) => { tl.to('#prog .pfg', { strokeDashoffset: 150.8 * (1 - (k + 1) / lights.length), duration: 0.5, ease: 'power2.out' }, S[sid]);
    if (typeof NUMBERED !== 'undefined' && NUMBERED) tl.set('#plab', { textContent: `STEP ${k + 1} / ${lights.length}` }, S[sid]); });   // numbers only when the structure check allows steps (const NUMBERED = true in stage.js)
};
// aurora: deterministic drift of the three blobs over the whole video
const aurora = () => { [['.a1', 260, 180], ['.a2', -240, -220], ['.a3', 200, -260]].forEach(([c, x, y]) =>
  tl.fromTo('#aurora ' + c, { x: 0, y: 0 }, { x, y, duration: TOTAL, ease: 'sine.inOut' }, 0)); };
const ctaWords = (sid, pairs) => pairs.forEach(([id, w]) => pop(id, (W(sid, w) ?? S[sid]) - 0.05, { y: 50, d: 0.45 }));
