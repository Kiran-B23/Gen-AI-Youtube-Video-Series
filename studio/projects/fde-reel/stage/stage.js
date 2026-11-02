// FDE reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json, read with the kit's at() helper.
// Running object: the claims-assistant card (illustrative). It cracks (s01), meets locked data (s03), gets an engineer (s04-s05),
// is found/built/shipped (s06-s08), docks top-left through the numbers (s10-s15) and grows back for the recap (s16).
// Camera moves come from the beats' "cam" (assemble), not from this file.
(function () {
  const on = (id, t, d = 0.25) => tl.to('#' + id, { opacity: 1, duration: d }, t);
  const off = (ids, t, d = 0.25) => tl.to([].concat(ids).map(x => '#' + x), { opacity: 0, duration: d }, t);
  const pulse = (id, t, s = 1.08, d = 0.15) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const stampIn = (id, t, rot = -5) => tl.fromTo('#' + id, { opacity: 0, scale: 1.8, rotation: rot - 8 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.3, ease: 'back.out(2)' }, t);
  const typeIn = (id, text, t, d) => { tl.set('#' + id, { opacity: 1 }, t); typeText(id, text, t, t + (d ?? Math.min(0.9, 0.1 + text.length * 0.03))); };
  const drawY = (id, t, d = 0.35, origin = '50% 0%') => { tl.set('#' + id, { opacity: 1, transformOrigin: origin }, t); tl.fromTo('#' + id, { scaleY: 0 }, { scaleY: 1, duration: d, ease: 'power2.out' }, t); };
  const drawX = (id, t, d = 0.4) => { tl.set('#' + id, { opacity: 1 }, t); tl.fromTo('#' + id, { scaleX: 0 }, { scaleX: 1, duration: d, ease: 'power2.out' }, t); };
  const strokeIn = (id, t, d = 0.5) => { const el = $(id), L = el.getTotalLength ? el.getTotalLength() : 1000;
    tl.set('#' + id, { opacity: 1, strokeDasharray: L, strokeDashoffset: L }, t); tl.to('#' + id, { strokeDashoffset: 0, duration: d, ease: 'power2.out' }, t); };
  const SEC = { dark: { ink: '#FFFFFF', bg: '#0B1020', dim: 'rgba(255,255,255,0.7)' }, blue: { ink: '#FFFFFF', bg: '#2B3BE0', dim: 'rgba(255,255,255,0.75)' },
                light: { ink: '#0B1020', bg: '#EEF1F6', dim: 'rgba(11,16,32,0.6)' }, yellow: { ink: '#0B1020', bg: '#FFD23F', dim: 'rgba(11,16,32,0.65)' } };
  const theme = (t, k) => { const c = SEC[k];
    tl.set('#f-outline', { borderColor: c.ink }, t); tl.set('#f-clab', { backgroundColor: c.bg, color: c.ink }, t);
    tl.set(['#f-t1', '#f-t2', '#f-t3'], { color: c.ink }, t); tl.set('#f-code', { color: c.ink }, t); tl.set('#f-tag', { color: c.dim }, t);
    tl.set('#f-badge', { borderColor: k === 'dark' ? '#FFD23F' : '#FFFFFF' }, t); };
  // tracker chips: the active step is filled (navy on light/yellow, yellow on dark), the others dim outlines
  const hi = (id, t, k) => tl.set('#' + id, { backgroundColor: k === 'dark' ? '#FFD23F' : '#0B1020', color: k === 'dark' ? '#0B1020' : '#FFFFFF', borderColor: k === 'dark' ? '#FFD23F' : '#0B1020', opacity: 1 }, t);
  const lo = (id, t, k) => tl.set('#' + id, { backgroundColor: 'rgba(0,0,0,0)', color: SEC[k].ink, borderColor: SEC[k].ink, opacity: 0.45 }, t);
  const E = END('s17');

  // ---------- groups ----------
  show('f-g-hook', 0, S.s02 + 0.45);
  show('f-g-wb', 0, S.s10 + 0.6);
  show('f-g-title', S.s04, S.s05 + 0.7);
  show('f-g-prod', S.s09, S.s10 + 0.35);
  show('f-g-dock', S.s10, S.s16 + 0.6);
  show('f-g-dem', S.s10, S.s12 + 0.05);
  show('f-g-fit', S.s12 - 0.05, S.s14 + 0.05);
  show('f-g-want', S.s14 - 0.05, S.s16 + 0.05);
  group('f-g-rc', S.s16 - 0.05, S.s17 + 0.05);
  group('f-g-cta', S.s17 - 0.05, E);

  // ---------- frame 0 (dark): the card works in the demo, cracks in the company ----------
  theme(0, 'dark');
  // owner note 2026-10-30 ("the opening looks cluttered"): frame 0 is one idea, the demo working. The crack, the red strip and
  // "Breaks in the company." each arrive on their own word; the card sits lower and larger in the frame.
  tl.set('#f-cw', { y: 540 }, 0);
  tl.set(['#f-cr1', '#f-cr2', '#f-strip'], { opacity: 0 }, 0);
  // openings rule (2026-10-30): 0 s is the card alone (1 thing, 2 words). The answer lands on "assistant", the headline
  // types with the voice (s01 has "captions": false: the headline is the caption), DEMO stamps on "demo", the
  // "illustrative" tag arrives after the hook.
  tl.set(['#f-w1', '#f-w2', '#f-w3', '#f-ans', '#f-demo', '#f-tag'], { opacity: 0 }, 0);
  tl.fromTo('#f-card', { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'power2.out' }, 0);
  const word = (id, t) => tl.fromTo('#' + id, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out', immediateRender: false }, t);
  word('f-w1', at('s01/hw1')); word('f-w2', at('s01/hw2')); word('f-w3', at('s01/hw3'));

  // ---------- s01 hook ----------
  tl.fromTo('#f-ans', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: 'back.out(1.7)', immediateRender: false }, at('s01/ans'));
  tl.to('#f-ans', { boxShadow: '0 0 0 6px #2ED3A0', duration: 0.2 }, at('s01/ans') + 0.25);   // the demo answer is ringed green
  tl.fromTo('#f-demo', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, at('s01/demo'));
  tl.to('#f-demo', { backgroundColor: '#2ED3A0', color: '#0B1020', duration: 0.15 }, at('s01/demo') + 0.3);   // the claim is inked
  tl.to('#f-tag', { opacity: 1, duration: 0.3 }, 3.2);
  tl.set('#f-houtline', { opacity: 1 }, at('s01/houtline'));
  tl.fromTo('#f-houtline', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power2.out' }, at('s01/houtline'));
  tl.set('#f-hlocks', { opacity: 1 }, at('s01/hlocks'));
  tl.fromTo(['#f-hl1', '#f-hl2'], { y: -120 }, { y: 0, duration: 0.4, ease: 'bounce.out', stagger: 0.08 }, at('s01/hlocks'));
  tl.to('#f-h1', { opacity: 0.35, duration: 0.3 }, at('s01/hlocks'));
  { const t = at('s01/strip');
    strokeIn('f-cr1', t - 0.05, 0.25); strokeIn('f-cr2', t + 0.18, 0.12);
    tl.fromTo('#f-strip', { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, transformOrigin: '50% 100%', duration: 0.2 }, t);
    tl.to('#f-h1', { opacity: 0, y: -50, duration: 0.2, ease: 'power2.in' }, t);
    tl.fromTo('#f-h2', { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, t + 0.05);
    tl.to('#f-ans', { x: -10, duration: 0.05, yoyo: true, repeat: 3 }, t); tl.set('#f-ans', { opacity: 0 }, t + 0.2); tl.set('#f-ansr', { opacity: 1 }, t + 0.2);
    tl.to('#f-strip', { x: -14, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' }, t); tl.set('#f-strip', { x: 0 }, t + 0.4);
    tl.to('#f-strip', { backgroundColor: '#9E1426', duration: 0.2 }, t + 0.1); }

  // ---------- s02 (light): the card moves to the workbench ----------
  theme(S.s02 - 0.05, 'light');
  tl.to(['#f-htext', '#f-houtline', '#f-hlocks'], { opacity: 0, y: -60, duration: 0.3, ease: 'power2.in' }, S.s02 - 0.2);
  tl.to('#f-demo', { opacity: 0, scale: 1.4, duration: 0.25 }, S.s02 - 0.2);
  tl.to(['#f-cr1', '#f-cr2', '#f-strip', '#f-ansr', '#f-q'], { opacity: 0, duration: 0.2 }, S.s02 - 0.2);
  tl.to('#f-cw', { y: 0, duration: 0.55, ease: 'power3.inOut' }, S.s02 - 0.15);
  typeIn('f-ins', 'Insurance Co. · ', at('s02/ins'), 0.5);
  pop('f-q', at('s02/q'), { y: 20 });

  // ---------- s03: scanned PDFs, an old system, broken wires ----------
  tl.fromTo('#f-pdf', { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at('s03/pdf'));
  { const t = at('s03/scan'); tl.set('#f-scan', { opacity: 1, y: 0 }, t); tl.to('#f-scan', { y: 230, duration: 0.9, ease: 'none' }, t); tl.to('#f-scan', { opacity: 0, duration: 0.2 }, t + 0.95);
    tl.to('#f-pdf .f-page', { filter: 'contrast(0.8) blur(0.6px)', duration: 0.6 }, t + 0.2); }
  tl.fromTo('#f-old', { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at('s03/old'));
  typeIn('f-oldtxt', 'CLAIM 4471\nOPEN', at('s03/oldtxt'), 0.6);
  { const t = at('s03/locks');
    tl.set(['#f-dl', '#f-dr'], { opacity: 1, transformOrigin: '50% 0%' }, t); tl.fromTo(['#f-dl', '#f-dr'], { scaleY: 0 }, { scaleY: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, t);
    tl.set('#f-locks', { opacity: 1 }, t + 0.1); tl.fromTo(['#f-ll', '#f-lr'], { scale: 1.8 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, t + 0.1);
    typeIn('f-ans3', "Sorry, I can't find that.", t + 0.15, 0.6); }

  // ---------- s04 (blue): the model is fine; nobody connected it ----------
  theme(S.s04 - 0.05, 'blue');
  pop('f-model', at('s04/model'), { y: 10 });
  tl.fromTo('#f-mring', { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, at('s04/model') + 0.2);   // lock: the MODEL pill stays green-ringed "fine" from s04 on
  { const t = at('s04/gaps'); tl.set('#f-gaps', { opacity: 1 }, t); tl.fromTo('#f-gaps i', { opacity: 0 }, { opacity: 0.95, duration: 0.12, yoyo: true, repeat: 3 }, t); tl.set('#f-gaps i', { opacity: 0.95 }, t + 0.5); }
  tl.fromTo('#f-gaps i', { opacity: 0.95 }, { opacity: 0.35, duration: 0.15, yoyo: true, repeat: 1 }, at('s04/slot') - 0.6);
  { const t = at('s04/gaps');   // "Nobody connected it.": the unreachable data lights red, then the card that can't reach it
    tl.to(['#f-pdf', '#f-old'], { borderColor: '#E5364A', borderWidth: 8, duration: 0.3 }, t + 0.6);
    tl.to('#f-card', { borderColor: '#E5364A', duration: 0.3 }, t + 1.3);
    tl.to(['#f-pdf', '#f-old'], { borderColor: '#0B1020', borderWidth: 4, duration: 0.3 }, S.s05 + 0.2);
    tl.to('#f-card', { borderColor: '#0B1020', duration: 0.3 }, S.s05 + 0.2); }   // the gaps flash again on "That's"
  tl.set('#f-slot', { opacity: 1 }, at('s04/slot')); tl.fromTo('#f-slot', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, at('s04/slot'));
  { const t = at('s04/title');
    tl.to('#f-wb', { scale: 0.6, transformOrigin: '540px 1450px', duration: 0.45, ease: 'power3.inOut' }, t - 0.1);
    tl.fromTo('#f-title', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, t); }
  drawX('f-tline', at('s04/tline'), 0.4);

  // ---------- s05: the engineer works inside the customer's company ----------
  { const t = S.s05 - 0.1;
    tl.to('#f-title', { opacity: 0, scale: 0.2, x: -290, y: 878, duration: 0.45, ease: 'power3.in' }, t);
    tl.to('#f-wb', { scale: 1, duration: 0.5, ease: 'power3.inOut' }, t + 0.1);
    tl.set('#f-badge', { x: -320, y: 0 }, t); tl.to('#f-badge', { opacity: 1, duration: 0.25 }, t + 0.35); }
  { const t = at('s05/outline');
    tl.set('#f-outline', { opacity: 1 }, t); tl.fromTo('#f-outline', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.out' }, t);
    tl.to('#f-badge', { x: 0, duration: 0.6, ease: 'power3.inOut' }, t + 0.1);
    tl.to('#f-slot', { opacity: 0, duration: 0.3 }, t + 0.5); }
  typeIn('f-clab', "CUSTOMER'S COMPANY", at('s05/clab'), 0.6);
  tl.to('#f-outline', { borderColor: '#FFD23F', borderWidth: 9, duration: 0.3 }, at('s05/clab'));   // the company lights up on its word
  tl.to('#f-outline', { borderColor: '#FFFFFF', borderWidth: 4, duration: 0.4 }, at('s05/code') - 0.3);
  tl.to('#f-card', { borderColor: '#FFD23F', duration: 0.3 }, at('s05/code'));
  typeIn('f-code', 'connect( )', at('s05/code'), 0.45);
  pulse('f-badge', at('s05/badge'), 1.1, 0.16); tl.to('#f-badge', { backgroundColor: '#FFD23F', color: '#0B1020', duration: 0.2 }, at('s05/badge')); tl.to('#f-badge span', { color: '#0B1020', duration: 0.2 }, at('s05/badge'));   // the engineer is on
  { const t = at('s05/dline'); drawX('f-dlh', t, 0.3); drawY('f-dlv', t + 0.25, 0.45, '50% 100%'); }

  // ---------- s06 (yellow): 01 FIND ----------
  theme(S.s06 - 0.05, 'yellow');
  tl.to(['#f-dlh', '#f-dlv'], { opacity: 0, duration: 0.2 }, S.s06 - 0.1); tl.to('#f-card', { borderColor: '#0B1020', duration: 0.2 }, S.s06 - 0.1);
  { const t = at('s06/trk'); tl.fromTo('#f-trk', { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, t);
    hi('f-t1', t + 0.1, 'yellow'); lo('f-t2', t, 'yellow'); lo('f-t3', t, 'yellow'); }
  tl.to('#f-badge', { x: 24, duration: 0.35, ease: 'power2.out' }, at('s06/badge'));
  pop('f-team', at('s06/team'), { y: 20 });
  { const t = at('s06/ring');
    tl.set('#f-ring', { opacity: 1, x: 465, y: 425 }, t);
    tl.to('#f-ring', { x: 205, y: 800, duration: 0.45, ease: 'power2.inOut' }, t + 0.05);
    tl.to('#f-ring', { x: 665, y: 800, duration: 0.5, ease: 'power2.inOut' }, t + 0.6); }
  stampIn('f-blk', at('s06/blk'), -5);
  tl.to('#f-ring', { opacity: 0, duration: 0.2 }, at('s06/blk') + 0.1);

  // ---------- s07 (light): 02 BUILD ----------
  theme(S.s07 - 0.05, 'light');
  lo('f-t1', S.s07, 'light'); hi('f-t2', S.s07, 'light'); lo('f-t3', S.s07, 'light');
  tl.to('#f-blk', { opacity: 0, scale: 0.3, duration: 0.3, ease: 'power2.in' }, S.s07 - 0.1);
  { const t = at('s07/wl'); off(['f-gaps', 'f-dl'], t, 0.15); drawY('f-wl', t, 0.45); }
  { const t = at('s07/okl'); tl.set('#f-ll', { opacity: 0 }, t); pop('f-okl', t, { y: 0, s: 1.4 });
    tl.set('#f-pd0', { opacity: 1, x: 0, y: 0 }, t + 0.1); tl.to('#f-pd0', { y: -140, duration: 0.45, ease: 'none' }, t + 0.1); tl.set('#f-pd0', { opacity: 0 }, t + 0.56); }
  { const t = at('s07/okl') + 0.7; tl.to('#f-pdf', { borderColor: '#14B87A', duration: 0.3 }, t); tl.to('#f-pdf .f-page', { y: -14, duration: 0.35, stagger: 0.1, ease: 'power2.out' }, t + 0.2); }   // the PDFs open up
  { const t = at('s07/okr'); tl.to('#f-old', { borderColor: '#14B87A', duration: 0.3 }, t + 0.3); off('f-dr', t - 0.1, 0.15); drawY('f-wr', t - 0.1, 0.4); tl.set('#f-lr', { opacity: 0 }, t); pop('f-okr', t, { y: 0, s: 1.4 }); }
  tl.to('#f-ans3', { opacity: 0, duration: 0.2 }, at('s07/okr') + 0.2);
  tl.fromTo('#f-tiles', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, at('s07/tiles'));
  for (let k = 0; k < 5; k++) pop('f-tk' + k, at('s07/ticks') + k * 0.15, { y: 0, s: 1.5, d: 0.25 });

  // ---------- s08 (dark): 03 SHIP ----------
  theme(S.s08 - 0.05, 'dark');
  lo('f-t1', S.s08, 'dark'); lo('f-t2', S.s08, 'dark'); hi('f-t3', S.s08, 'dark');
  { const t = at('s08/live'); stampIn('f-live', t, 0); tl.to('#f-card', { y: -10, duration: 0.25, yoyo: true, repeat: 1 }, t); }
  { const t = at('s08/pulse'); tl.set('#f-pulse', { opacity: 1 }, t); tl.fromTo(['#f-pd1', '#f-pd2'], { y: 0 }, { y: -140, duration: 0.55, ease: 'none' }, t);
    tl.to(['#f-pd1', '#f-pd2'], { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1 }, t + 0.55); }
  tl.to('#f-tiles', { opacity: 0, duration: 0.25 }, at('s08/ansg') - 0.3);
  typeIn('f-ansg', 'Yes, water damage is covered.', at('s08/ansg'), 0.8);
  pop('f-ptag', at('s08/ansg') + 0.5, { y: 10 });
  stampIn('f-stripok', at('s08/stripok'), 0);
  tl.to('#f-pulse', { opacity: 0, duration: 0.2 }, at('s08/stripok') + 0.3);

  // ---------- s09: report back to the product team ----------
  tl.to('#f-code', { opacity: 0, duration: 0.2 }, S.s09 - 0.1);
  pop('f-note', at('s09/note'), { y: 30 });
  { const t = at('s09/prod');
    tl.to('#f-wb', { scale: 0.62, transformOrigin: '60px 840px', duration: 0.5, ease: 'power3.inOut' }, t - 0.05);
    tl.fromTo('#f-prod', { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, t);
    tl.to('#f-note', { x: -10, y: -560, scale: 0.8, duration: 0.7, ease: 'power2.inOut' }, t + 0.35); }
  tl.to('#f-model', { scale: 1.12, duration: 0.25, ease: 'back.out(2)' }, at('s09/model'));   // the note is about the model: it steps forward, ring kept
  { const t = at('s09/notet'); tl.to('#f-note', { opacity: 0, duration: 0.2 }, t - 0.1); typeIn('f-notet', 'misreads handwritten notes', t, 0.7); }

  // ---------- s10 (yellow): why care: job posts ----------
  tl.to('#f-g-wb', { scale: 0.1, opacity: 0, transformOrigin: '300px 260px', duration: 0.45, ease: 'power3.in' }, S.s10 - 0.1);
  tl.to('#f-prod', { opacity: 0, duration: 0.25 }, S.s10 - 0.1);
  pop('f-dock', at('s10/dock'), { y: -20 });
  { const t = at('s10/dock'); tl.set('#f-ghost', { opacity: 1 }, t);   // owner row s10/open: empty slots fill the frame on "care", the posts fill them on "posts"
    tl.fromTo('#f-ghost .f-gh', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.008, ease: 'power2.out' }, t + 0.1);
    tl.to('#f-ghost', { opacity: 0, duration: 0.3 }, at('s10/num')); }
  { const t = at('s10/grid'); tl.set('#f-grid', { opacity: 1 }, t);
    tl.fromTo('#f-grid .f-gt', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.016, ease: 'back.out(2)' }, t); }
  { const t = at('s10/arrow'); tl.to('#f-grid', { y: -24, duration: 0.4, ease: 'power2.out' }, t); drawY('f-arrow', t, 0.5, '50% 100%'); }
  { const t = at('s10/num'); tl.to('#f-grid', { opacity: 0.3, duration: 0.3 }, t);
    count('f-num', 10, 1000, t, 0.9, v => Math.round(v).toLocaleString('en-US') + ' %+'); }
  pop('f-yr', at('s10/yr'), { y: 20 });

  // ---------- s11: all tech jobs ----------
  { const t = S.s11 - 0.05;
    off(['f-grid', 'f-arrow', 'f-yr'], t, 0.25);
    drawY('f-bar1', t + 0.1, 0.6, '50% 100%'); on('f-bl1', t + 0.3);
    tl.to('#f-num', { x: -220, y: -330, scale: 0.55, duration: 0.6, ease: 'power3.inOut' }, t + 0.1); }
  { const t = at('s11/bar2'); tl.fromTo('#f-bar2', { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, transformOrigin: '50% 100%', duration: 0.4, ease: 'power2.out' }, t); on('f-bl2', t + 0.1); }
  { const t = at('s11/race'); tl.set('#f-race', { opacity: 1 }, t); tl.fromTo('#f-race', { scaleY: 0.05 }, { scaleY: 1, duration: 0.9, ease: 'power1.out' }, t); }
  count('f-n13', 1, 13, at('s11/n13'), 0.6, v => Math.round(v) + ' %');
  pulse('f-bar1', at('s11/n13') + 0.8, 1.02, 0.2);

  // ---------- s12 (light): is it for you? travel ----------
  // owner row s12/open: the question lands big in the middle on "you", then parks as the header on "Palantir"
  $('f-hd').textContent = 'IS IT FOR YOU?';
  tl.fromTo('#f-hd', { opacity: 0, x: 210, y: 360, scale: 2.4 }, { opacity: 1, scale: 2, duration: 0.3, ease: 'back.out(2)' }, at('s12/hd'));
  tl.to('#f-hd', { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power3.inOut' }, at('s12/pal') - 0.35);
  pop('f-pal', at('s12/pal'), { y: 20 });
  pop('f-ant', at('s12/ant'), { y: 20 });
  { const t = at('s12/brk'); drawX('f-brk', t, 0.35); drawY('f-brk2', t + 0.15, 0.25); }
  { const t = at('s12/strip'); on('f-tlab', t);
    tl.set('#f-strp', { opacity: 1 }, t); tl.fromTo('#f-strp .f-cell', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.04 }, t);
    tl.fromTo('#f-suit', { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, t + 0.35); }
  { const t = at('s12/q25'); tl.to('#f-f25', { scaleX: 1, duration: 0.45, ease: 'power2.out' }, t); count('f-q25', 1, 25, t, 0.45, v => Math.round(v) + ' %'); }
  { const t = at('s12/verd'); tl.to('#f-f50', { scaleX: 1, duration: 0.45, ease: 'power2.out' }, t);
    tl.to('#f-q25', { opacity: 0, duration: 0.15 }, t); stampIn('f-verd', t + 0.05, 0); }

  // ---------- s13: the bar varies ----------
  { const t = S.s13 - 0.05;
    tl.to(['#f-brk', '#f-brk2', '#f-tlab', '#f-strp', '#f-suit'], { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' }, t);
    tl.to('#f-hd', { opacity: 0, scale: 0.6, duration: 0.3 }, t);
    tl.to('#f-verd', { scale: 0.3, x: 290, y: -700, opacity: 0, duration: 0.5, ease: 'power3.in' }, t);
    pop('f-tchip', t + 0.45, { y: 0, s: 0.6 }); }
  { const t = at('s13/bar'); on('f-elab', t); tl.set('#f-bar', { opacity: 1 }, t); tl.fromTo('#f-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, t); }
  { const t = at('s13/six'); count('f-six', 1, 6, t, 0.5, v => String(Math.round(v))); pop('f-mo', t + 0.2, { y: 20 }); }
  pulse('f-ant', at('s13/four') - 0.8, 1.08, 0.18);   // "Anthropic,": breaks the hold between six and four
  { const t = at('s13/four'); count('f-four', 1, 4, t, 0.4, v => String(Math.round(v))); pop('f-yrs', t + 0.2, { y: 20 });
    tl.to('#f-bar', { rotation: 3, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, t + 0.1); }
  tl.to('#f-tchip', { opacity: 0, duration: 0.25 }, S.s14 - 0.1);

  // ---------- s14 (blue): want in? build ----------
  typeIn('f-hd2', 'WANT IN?', at('s14/hd'), 0.35);
  { const t = at('s14/app');
    tl.fromTo('#f-app', { opacity: 0, scale: 0.25, x: 0, y: -250 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.55, ease: 'power3.out' }, t);
    typeIn('f-blabel', 'BUILD', t + 0.1, 0.3); }
  typeIn('f-apph', 'Your app', at('s14/apph'), 0.4);
  { const t = at('s14/stk'); tl.fromTo('#f-stk', { opacity: 0, y: -160, rotation: -8 }, { opacity: 1, y: 0, rotation: 4, duration: 0.45, ease: 'bounce.out' }, t);
    drawX('f-awire', t + 0.4, 0.3); }

  // ---------- s15: test, explain ----------
  { const t = at('s15/tst'); typeIn('f-tst', 'TEST', t, 0.25);
    tl.fromTo('#f-trow', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, t + 0.05);
    for (let k = 0; k < 5; k++) pop('f-tt' + k, t + 0.35 + k * 0.15, { y: 0, s: 1.5, d: 0.25 });
    typeIn('f-ab2', "Yes, it's covered.", t + 0.4, 0.6); }
  { const t = at('s15/exp'); typeIn('f-exp', 'EXPLAIN', t, 0.3); pop('f-ncc', t + 0.1, { y: 20 }); }
  { const t = at('s15/bub'); tl.set('#f-bub', { opacity: 1, x: 0, y: -40 }, t);   // owner row s15/bubble: out of the app, along above the TEST row, then down beside it
    tl.to('#f-bub', { x: 330, duration: 0.35, ease: 'power2.inOut' }, t); tl.to('#f-bub', { y: 60, duration: 0.25, ease: 'power2.out' }, t + 0.35);
    tl.to('#f-ncc', { borderColor: '#14B87A', duration: 0.2 }, t + 0.55); }

  // ---------- s16 (yellow): recap on the same card ----------
  { const t = at('s16/mini'); tl.to('#f-dock', { opacity: 0, duration: 0.2 }, t);
    // owner row s16/open: the card arrives large in the middle of the zone, then settles at the top as FIND lands
    tl.fromTo('#f-mini', { opacity: 0, scale: 0.35, x: -150, y: -30 }, { opacity: 1, scale: 1.35, x: -105, y: 211, duration: 0.5, ease: 'power3.out' }, t);
    tl.to('#f-mini', { scale: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.inOut' }, at('s16/c1') - 0.45); }
  pop('f-c1', at('s16/c1'), { y: 30 });
  { const t = at('s16/c2'); strokeIn('f-a1', t - 0.1, 0.2); pop('f-c2', t, { y: 30 }); }
  { const t = at('s16/c3'); strokeIn('f-a2', t - 0.1, 0.2); pop('f-c3', t, { y: 30 }); }
  { const t = at('s16/c4'); strokeIn('f-a3', t - 0.1, 0.25); pop('f-c4', t, { y: 30 }); strokeIn('f-a4', t + 0.35, 0.6); pulse('f-mini', t + 0.95, 1.04, 0.18); }

  // ---------- s17 (dark): CTA ----------
  ctaWords('s17', [['f-w0', 'What'], ['f-w1', 'should'], ['f-w2', 'I']]);
  pop('f-w3', at('s17/cq') - 0.05, { y: 40, ease: 'power4.out', d: 0.3 });
  pop('f-w4', at('s17/fol') - 0.05, { y: 40, ease: 'power4.out', d: 0.3 });
  tl.fromTo('#f-fol', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at('s17/fol') + 0.05);
})();
