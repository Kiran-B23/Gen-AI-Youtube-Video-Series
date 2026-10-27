// Jev pilot stage · every motion is keyed to a spoken word: at(<scene>/<target>) reads the beats in scenes.json
(function () {
  const $ = id => document.getElementById(id);
  const END = sid => S[sid] + D[sid];
  let seed = 4821; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };   // deterministic (frames render out of order)

  const show = (id, t0, t1) => { tl.set('#' + id, { visibility: 'visible', opacity: 1 }, t0); if (t1 != null) tl.set('#' + id, { visibility: 'hidden', opacity: 0 }, t1); };
  const pop = (id, t, o = {}) => tl.fromTo('#' + id, { opacity: 0, y: o.y ?? 30, x: o.x ?? 0, scale: o.s ?? 0.9 }, { opacity: 1, y: 0, x: 0, scale: 1, duration: o.d ?? 0.45, ease: o.ease ?? 'back.out(1.7)' }, t);
  const fade = (id, t, d = 0.3) => tl.to('#' + id, { opacity: 0, duration: d }, t);
  const slam = (id, t, rot = -5) => tl.fromTo('#' + id, { opacity: 0, scale: 2.2, rotation: rot - 10 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.32, ease: 'back.out(2)' }, t);
  const count = (id, from, to, t, d, fmt) => { const el = $(id), o = { v: from }; tl.fromTo(o, { v: from }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } }, t); };
  const drift = (id, t0, t1) => tl.fromTo('#' + id, { scale: 1 }, { scale: 1.018, duration: t1 - t0, ease: 'none' }, t0);   // nothing ever sits still
  const group = (id, t0, t1) => { show(id, t0, t1); drift(id, t0, t1); };


  // ---------- s01 hook ----------
  group('g01', 0, END('s01'));
  const words = ['billing', 'yes', 'no', '0.97', 'high', 'shipping', 'urgent', '0.52', 'refund', 'low', 'sales', '0.88', 'spam', 'true', 'false', '0.91'];
  $('matrix').innerHTML = Array.from({ length: 6 * 20 }, () => `<span class="${rnd() < 0.12 ? 'hi' : ''}">${words[Math.floor(rnd() * words.length)]}</span>`).join('');
  pop('h1', 0, { y: 60, s: 1.15, ease: 'power4.out', d: 0.3 });   // the hook is on screen from frame 1
  pop('h0', at('s01/word'), { y: 20 });
  tl.to('#matrix', { opacity: 1, duration: 0.5 }, at('s01/decides'));
  tl.fromTo('#matrix', { y: 0 }, { y: -80, duration: END('s01') - at('s01/decides'), ease: 'none' }, at('s01/decides'));
  pop('h2', at('s01/decides'), { y: 0, s: 1.25, ease: 'back.out(2)', d: 0.4 });

  // ---------- s02 meet Jev ----------
  group('g02', S.s02, S.s03 - 0.2);   // clear before the next chapter numeral lands
  pop('meet', S.s02 - 0.2, { y: 10, d: 0.3 }); pop('jevbig', S.s02 - 0.15, { y: 80, s: 1, ease: 'power4.out', d: 0.4 });
  pop('ql1', at('s02/questions'), { y: 10 });
  [1, 2, 3].forEach(k => {
    tl.fromTo(`#qa${k} .q`, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, at('s02/questions') + (k - 1) * 0.12);
    tl.fromTo('#ar' + k, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, at('s02/typed') + (k - 1) * 0.12);
    pop('an' + k, at('s02/typed') + 0.1 + (k - 1) * 0.12, { y: 0, s: 0.6 });
    tl.set('#cf' + k, { opacity: 1 }, at('s02/confidence'));
    tl.fromTo(`#cf${k} i`, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, at('s02/confidence') + (k - 1) * 0.12);
  });
  pop('ql2', at('s02/typed'), { y: 10 }); pop('ql3', at('s02/confidence'), { y: 10 });

  // ---------- chapter cards ----------
  const chapter = (id, t0, t1, keep) => {
    t0 -= 0.2;   // lands under the section wipe, so the scene opens on the section title
    show(id, t0, keep ? t1 : t1 + 0.25);
    tl.fromTo(`#${id} .chapt`, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power4.out' }, t0);
    if (!keep) tl.to('#' + id, { opacity: 0, y: -60, duration: 0.25, ease: 'power2.in' }, t1);   // content starts only after this exit
  };

  // ---------- s03-s04 the ticket ----------
  chapter('c1', S.s03, S.s04 - 0.05, false);
  group('g03', S.s03, S.s05 - 0.2);
  pop('ticket', at('s03/ticket'), { y: 60 });
  const TXT = 'Charged twice this month. Refund me or I cancel.';
  const tk = { n: 0 }; $('tkt').textContent = '';
  tl.fromTo(tk, { n: 0 }, { n: TXT.length, duration: at('s03/typed') - at('s03/type'), ease: 'none', onUpdate: () => { $('tkt').textContent = TXT.slice(0, Math.round(tk.n)); } }, at('s03/type'));
  tl.to('#cur', { opacity: 0, duration: 0.01, repeat: 9, yoyo: true, repeatDelay: 0.25 }, at('s03/typed'));
  tl.to('#ticket', { y: -570, duration: 0.55, ease: 'power3.inOut' }, S.s04);
  tl.fromTo('#scan', { x: 0, opacity: 1 }, { x: 1010, duration: 0.7, ease: 'power1.inOut' }, at('s04/pass'));
  tl.to('#scan', { opacity: 0, duration: 0.1 }, at('s04/pass') + 0.7);
  pop('three', at('s04/three'), { y: 0, s: 1.3 });
  ['r1', 'r2', 'r3'].forEach((r, k) => pop(r, S.s04 + 0.45 + k * 0.12, { y: 0, x: -40, ease: 'power3.out', d: 0.35 }));
  [['ra1', 'billing'], ['ra2', 'urgent'], ['ra3', 'high']].forEach(([id, b]) => pop(id, at('s04/' + b), { y: 0, s: 0.5, ease: 'back.out(2.4)' }));

  // ---------- s05 speed ----------
  chapter('c2', S.s05, S.s05 + 1.0, false);
  group('g05', S.s05, END('s05'));
  pop('mini1', S.s05 + 1.25, { y: -20 });
  tl.fromTo('#clock', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, S.s05 + 1.25);
  pop('clocklab', S.s05 + 1.35, { y: 10 });
  pop('speedl', S.s05 + 1.35, { y: 20 });
  tl.to('#clkarc', { strokeDashoffset: 1068.1 * 0.9, duration: 0.5, ease: 'power2.out' }, at('s05/tenth'));
  tl.fromTo('#speed', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, at('s05/tenth'));

  // ---------- s06 price ----------
  group('g06', S.s06 - 0.15, END('s06'));
  pop('pricel', S.s06 - 0.15, { y: 20, d: 0.3 });
  tl.fromTo('#price', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, at('s06/price'));
  count('price', 0, 0.042, at('s06/price'), 0.6, v => '$' + v.toFixed(3));
  pop('outrow', at('s06/output'), { y: 40 });
  slam('free', at('s06/free'), -6);
  // breathe through the pause between the price and "output" (the conversational read leaves ~3 s)
  tl.fromTo('#price', { scale: 1 }, { scale: 1.06, duration: 0.9, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at('s06/price') + 0.8);
  tl.fromTo('#pricel', { y: 0 }, { y: -10, duration: 0.9, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at('s06/price') + 1.2);

  // ---------- s07 7,977 items for 21 cents · vs the priciest LLM ----------
  group('g07', S.s07, S.s08 - 0.2);
  pop('cntwrap', S.s07 - 0.15, { y: 20 }); tl.set('#cnt', { opacity: 0 }, 0);   // label opens the scene; the number shows only once it counts (never a '0')
  tl.fromTo('#cnt', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, at('s07/labeled')); tl.to('#cells', { opacity: 1, duration: 0.2 }, S.s07 - 0.15);   // the empty grid opens the scene
  const cv = $('cells'), cx = cv.getContext('2d'), COLS = 100, ROWS = 80, CW = 10, CH = 7, TOT = 7977, st = { n: 0, g: 0 };
  const draw = () => {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < COLS * ROWS; i++) {
      const c = i % COLS, r = Math.floor(i / COLS);
      if (i < st.n && i < TOT) { cx.fillStyle = st.g > (r / ROWS) ? '#14B87A' : '#0B1020'; cx.fillRect(c * CW + 1, r * CH + 1, CW - 2, CH - 2); }
      else { cx.fillStyle = 'rgba(11,16,32,0.22)'; cx.fillRect(c * CW + 1, r * CH + 1, CW - 2, CH - 2); }
    }
  };
  draw();
  tl.fromTo(st, { n: 0 }, { n: TOT, duration: at('s07/items') - at('s07/labeled'), ease: 'power1.inOut', onUpdate: draw }, at('s07/labeled'));
  count('cnt', 0, TOT, at('s07/labeled'), at('s07/items') - at('s07/labeled'), v => Math.round(v).toLocaleString('en-US'));
  tl.fromTo(st, { g: 0 }, { g: 1.01, duration: 0.6, ease: 'power2.out', onUpdate: draw }, at('s07/cents'));
  pop('cost21', at('s07/cents'), { y: 0, s: 1.4, ease: 'back.out(2)' });
  ['cntwrap', 'cells', 'cost21'].forEach(id => fade(id, at('s07/priciest') - 0.3, 0.3));
  tl.to('#bars', { opacity: 1, duration: 0.3 }, at('s07/priciest'));
  pop('bv1', at('s07/priciest') + 0.1, { y: 20 });
  tl.fromTo('#bf1', { scaleY: 0 }, { scaleY: 1, duration: 0.3 }, at('s07/priciest') + 0.1);
  tl.fromTo('#bf2', { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: 'power2.out' }, at('s07/priciest') + 0.3);
  tl.set('#bv2', { opacity: 1 }, at('s07/priciest') + 0.3);
  count('bv2', 0, 62.99, at('s07/priciest') + 0.3, 1.6, v => '$' + v.toFixed(2));
  slam('x300', at('s07/times'), -4);

  // ---------- s08 the catch: 68% ----------
  chapter('c3', S.s08, at('s08/catch') + 0.85, false);
  group('g08', S.s08, END('s08'));
  const wf = $('waffle'); wf.innerHTML = '<i></i>'.repeat(100); const cells = Array.from(wf.children);
  const t8 = at('s08/catch') + 1.1;
  pop('pctl', t8, { y: 20 }); tl.to('#waffle', { opacity: 1, duration: 0.4 }, t8);
  tl.fromTo('#pct', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, at('s08/pct'));
  count('pct', 0, 68, at('s08/pct'), 0.8, v => Math.round(v) + '%');
  tl.to(cells.slice(0, 68), { backgroundColor: '#FFD23F', borderColor: '#FFD23F', duration: 0.05, stagger: 0.011 }, at('s08/pct'));
  tl.to(cells.slice(68), { borderColor: 'rgba(255,77,94,0.75)', duration: 0.2, stagger: 0.01 }, at('s08/pct') + 0.8);

  // ---------- s09 valid but wrong ----------
  group('g09', S.s09, S.s10 - 0.2);
  pop('tk2', S.s09 - 0.2, { y: 30, d: 0.35 });
  pop('json', at('s09/answer'), { y: 40 });
  pop('valid', at('s09/format'), { y: 0, s: 0.6, ease: 'back.out(2.2)' });
  slam('wrong', at('s09/wrong'), -6);
  tl.to('#jteam', { color: '#FF4D5E', duration: 0.2 }, at('s09/wrong'));
  pop('should', at('s09/wrong') + 0.15, { y: 20 });

  // ---------- s10 route it · s11 one university test ----------
  chapter('c4', S.s10, at('s10/both') + 0.35, false);
  group('g10', S.s10, END('s11'));
  const t10 = at('s10/both') + 0.6;
  pop('node', t10, { y: 0, s: 0.5 });
  tl.to('#laneL', { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, t10 + 0.15); tl.to('#laneR', { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, t10 + 0.15);
  pop('binL', t10 + 0.35, { y: 30 }); pop('binR', t10 + 0.45, { y: 30 });
  pop('ill10', t10 + 0.5, { y: 0 });
  const route = (id, t, side) => {   // drop onto the node's top edge, pause, slide down the lane into its bin (never cover the JEV label)
    tl.set('#' + id, { opacity: 1 }, t);
    tl.fromTo('#' + id, { x: 0, y: 0 }, { y: 100, duration: 0.35, ease: 'power2.out' }, t);
    tl.to('#' + id, { x: side * 280, y: 790, duration: 0.55, ease: 'power2.inOut' }, t + 0.55);
    tl.fromTo(side < 0 ? '#binL' : '#binR', { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }, t + 1.1);
    tl.to('#' + id, { opacity: 0, duration: 0.2 }, t + 1.1);
  };
  route('chip1', at('s10/confident'), -1);
  route('chip2', at('s10/unsure'), 1);
  route('chip3', END('s10') - 0.9, -1);
  route('chip4', S.s11 + 0.6, -1);
  tl.to('#router', { scale: 0.55, y: -90, duration: 0.6, ease: 'power3.inOut' }, S.s11 + 1.2);
  fade('ill10', S.s11 + 1.2, 0.2);
  tl.set('#stats', { opacity: 1 }, S.s11);
  pop('statk', S.s11 + 1.8, { y: 10 });   // after the router has shrunk out of the way
  pop('st1', at('s11/accuracy'), { y: 40 });
  count('sn1', 80, 99.6, at('s11/accuracy'), 0.8, v => v.toFixed(1) + '%');
  tl.to('#sb1', { scaleX: 1, duration: 0.8, ease: 'power2.out' }, at('s11/accuracy') + 0.1);
  pop('st2', at('s11/cost'), { y: 40 });
  tl.fromTo('#st1', { scale: 1 }, { scale: 1.04, duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at('s11/accuracy') + 1.0);
  tl.fromTo('#router', { rotation: 0 }, { rotation: 1.5, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, S.s11 + 1.9);
  count('sn2', 0, 47, at('s11/cost'), 0.7, v => Math.round(v) + '%');
  tl.to('#sb2', { scaleX: 1, duration: 0.7, ease: 'power2.out' }, at('s11/cost') + 0.1);

  // ---------- s12 verdict ----------
  group('g12', S.s12, END('s12'));
  pop('v1', Math.min(at('s12/jev'), S.s12 - 0.15), { y: 50, ease: 'power4.out', d: 0.3 });
  pop('v2', at('s12/llm'), { y: 50, ease: 'power4.out' });
  pop('vc1', at('s12/routing'), { x: -40, y: 0, ease: 'power3.out' });
  pop('vc2', at('s12/routing') + 0.5, { x: -40, y: 0, ease: 'power3.out' });
  slam('vc3', at('s12/writing'), -3);

  // ---------- s13 CTA: the question builds word by word, as spoken ----------
  group('g13', S.s13, END('s13'));
  [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']].forEach(([id, w]) => pop(id, (W('s13', w) ?? S.s13) - 0.05, { y: 40, ease: 'power4.out', d: 0.3 }));
  pop('ctaf', at('s13/tell'), { y: 30 });
})();
