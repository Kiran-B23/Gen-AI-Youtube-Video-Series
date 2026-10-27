// Jev · hyperframes-glass stage (kit.js loaded first) · same beats and facts as the reference-flat pilot
(function () {
  aurora();

  // ---------- s01 hook ----------
  group('g01', 0, S.s02);
  pop('h1', 0, { y: 50, b: 10, d: 0.35 });   // on screen from frame 1
  pop('h0', at('s01/word'), { y: 20 });
  pop('h2c', at('s01/decides'), { y: 60, s: 0.9 });
  sweep('h2c', at('s01/decides') + 0.35);

  // ---------- s02 meet Jev ----------
  group('g02', S.s02, S.s03 - 0.2);
  pop('meet', S.s02 - 0.2, { y: 10, d: 0.35 });
  pop('jevbig', S.s02 - 0.15, { y: 80, b: 30, d: 0.5 });
  pop('qa', at('s02/questions') - 0.15, { y: 60 });
  pop('ql1', at('s02/questions'), { y: 10 });
  [1, 2, 3].forEach(k => {
    tl.fromTo(`#qa${k} .q`, { opacity: 0, x: -60, filter: 'blur(10px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, at('s02/questions') + (k - 1) * 0.12);
    tl.fromTo('#ar' + k, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, at('s02/typed') + (k - 1) * 0.12);
    pop('an' + k, at('s02/typed') + 0.1 + (k - 1) * 0.12, { y: 0, s: 0.7, b: 12 });
    tl.to('#cf' + k, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, at('s02/confidence') + (k - 1) * 0.12);
  });
  pop('ql2', at('s02/typed'), { y: 10 }); pop('ql3', at('s02/confidence'), { y: 10 });
  sweep('qa', at('s02/confidence') + 0.2);

  // ---------- 01 read the ticket (s03-s04) ----------
  chapter('c1', S.s03, at('s03/ticket') + 0.6);
  group('g03', S.s03, S.s05 - 0.2);
  pop('ticket', at('s03/ticket'), { y: 70 });
  typeText('tkt', 'Charged twice this month. Refund me or I cancel.', at('s03/type'), at('s03/typed'));
  tl.to('#cur', { opacity: 0, duration: 0.01, repeat: 9, yoyo: true, repeatDelay: 0.25 }, at('s03/typed'));
  tl.to('#ticket', { y: -570, duration: 0.6, ease: 'power3.inOut' }, S.s04);
  tl.fromTo('#scan', { x: 0, opacity: 1 }, { x: 1010, duration: 0.7, ease: 'power1.inOut' }, at('s04/pass'));
  tl.to('#scan', { opacity: 0, duration: 0.1 }, at('s04/pass') + 0.7);
  pop('three', at('s04/three'), { y: 0, s: 1.3, b: 24 });
  ['r1', 'r2', 'r3'].forEach((r, k) => pop(r, S.s04 + 0.45 + k * 0.12, { x: -50, y: 0, d: 0.45 }));
  [['ra1', 'billing'], ['ra2', 'urgent'], ['ra3', 'high']].forEach(([id, b]) => pop(id, at('s04/' + b), { y: 0, s: 0.6, b: 10, ease: 'back.out(2)' }));

  // ---------- 02 check the cost (s05-s07) ----------
  chapter('c2', S.s05, S.s05 + 0.95);
  group('g05', S.s05 + 1.2, S.s06);
  pop('mini1', S.s05 + 1.3, { y: -20 });
  pop('clock', S.s05 + 1.3, { y: 0, s: 0.85 });
  pop('clocklab', S.s05 + 1.4, { y: 10 });
  pop('speedl', S.s05 + 1.45, { y: 20 });
  tl.to('#clkarc', { strokeDashoffset: 1068.1 * 0.9, duration: 0.5, ease: 'power2.out' }, at('s05/tenth'));
  pop('speed', at('s05/tenth'), { y: 0, s: 0.85, b: 20, d: 0.45 });

  group('g06', S.s06, S.s07 - 0.1);
  pop('pcard', S.s06 - 0.05, { y: 40, d: 0.45 });
  pop('pricel', S.s06 + 0.15, { y: 20 });
  count('price', 0, 0.042, at('s06/price'), 0.6, v => '$' + v.toFixed(3));
  sweep('pcard', at('s06/price') + 0.5);
  pop('outrow', at('s06/output'), { y: 40 });
  slam('free', at('s06/free'), -5);
  zoomOut('g06', S.s07 - 0.35, 0.25);

  group('g07', S.s07, S.s08 - 0.2);
  pop('cntwrap', S.s07 - 0.1, { y: 20 });
  tl.to('#cells', { opacity: 1, duration: 0.3 }, S.s07 - 0.1);
  const cv = $('cells'), cx = cv.getContext('2d'), COLS = 100, ROWS = 80, CW = 10, CH = 7, TOT = 7977, st = { n: 0, g: 0 };
  const draw = () => {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < COLS * ROWS; i++) {
      const c = i % COLS, r = Math.floor(i / COLS);
      cx.fillStyle = i < st.n && i < TOT ? (st.g > r / ROWS ? '#5CFFB5' : '#7CF5FF') : 'rgba(255,255,255,0.10)';
      cx.fillRect(c * CW + 1, r * CH + 1, CW - 2, CH - 2);
    }
  };
  draw();
  tl.fromTo(st, { n: 0 }, { n: TOT, duration: at('s07/items') - at('s07/labeled'), ease: 'power1.inOut', onUpdate: draw }, at('s07/labeled'));
  count('cnt', 0, TOT, at('s07/labeled'), at('s07/items') - at('s07/labeled'), v => Math.round(v).toLocaleString('en-US'));
  tl.fromTo(st, { g: 0 }, { g: 1.01, duration: 0.6, ease: 'power2.out', onUpdate: draw }, at('s07/cents'));
  pop('cost21', at('s07/cents'), { y: 0, s: 1.3, b: 20, ease: 'back.out(1.8)' });
  sweep('cost21', at('s07/cents') + 0.4);
  ['cntwrap', 'cells', 'cost21'].forEach(id => fade(id, at('s07/priciest') - 0.3, 0.3));
  tl.to('#bars', { opacity: 1, duration: 0.3 }, at('s07/priciest'));
  pop('bv1', at('s07/priciest') + 0.1, { y: 20 });
  tl.fromTo('#bf1', { scaleY: 0 }, { scaleY: 1, duration: 0.3 }, at('s07/priciest') + 0.1);
  tl.fromTo('#bf2', { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: 'power2.out' }, at('s07/priciest') + 0.3);
  count('bv2', 0, 62.99, at('s07/priciest') + 0.3, 1.6, v => '$' + v.toFixed(2));
  slam('x300', at('s07/times'), -4);

  // ---------- 03 find the catch (s08-s09) ----------
  const t8 = chapter('c3', S.s08, at('s08/catch') + 0.75);
  group('g08', S.s08, S.s09);
  pop('pctl', t8, { y: 20 });
  pop('donut', t8, { y: 0, s: 0.85 });
  count('pct', 0, 68, at('s08/pct'), 0.8, v => Math.round(v) + '%');
  tl.to('#dnarc', { strokeDashoffset: 942.5 * 0.32, duration: 0.8, ease: 'power2.out' }, at('s08/pct'));
  tl.fromTo('#dnmiss', { strokeDasharray: '0 942.5', strokeDashoffset: 0 }, { strokeDasharray: '301.6 942.5', strokeDashoffset: -640.9, duration: 0.5, ease: 'power2.out' }, at('s08/pct') + 0.8);
  pop('dnlab', at('s08/pct') + 0.9, { y: 10 });
  zoomOut('g08', S.s09 - 0.3, 0.25);

  group('g09', S.s09, S.s10 - 0.2);
  pop('tk2', S.s09 - 0.05, { y: 30, d: 0.45 });
  pop('json', at('s09/answer'), { y: 40 });
  pop('valid', at('s09/format'), { y: 0, s: 0.7, ease: 'back.out(2)' });
  sweep('json', at('s09/format') + 0.1);
  slam('wrong', at('s09/wrong'), -5);
  tl.to('#jteam', { color: '#FF5C8A', duration: 0.2 }, at('s09/wrong'));
  pop('should', at('s09/wrong') + 0.15, { y: 20 });

  // ---------- 04 route it (s10-s11) ----------
  chapter('c4', S.s10, at('s10/both') + 0.3);
  group('g10', S.s10, END('s11'));
  const t10 = at('s10/both') + 0.65;
  pop('node', t10, { y: 0, s: 0.5, b: 20 });
  tl.to(['#laneL', '#laneR'], { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, t10 + 0.15);
  pop('binL', t10 + 0.3, { y: 30 }); pop('binR', t10 + 0.3, { y: 30 });
  pop('ill10', t10 + 0.5, { y: 0 });
  const route = (id, t, side) => {   // drop onto the node's top edge, then slide down the lane into its bin
    tl.set('#' + id, { opacity: 1 }, t);
    tl.fromTo('#' + id, { x: 0, y: 0 }, { y: 100, duration: 0.35, ease: 'power2.out' }, t);
    tl.to('#' + id, { x: side * 280, y: 640, duration: 0.5, ease: 'power2.inOut' }, t + 0.55);   // stops above the bin: never covers its label
    tl.fromTo(side < 0 ? '#binL' : '#binR', { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }, t + 1.05);
    tl.to('#' + id, { opacity: 0, scale: 0.6, duration: 0.2 }, t + 1.0);
  };
  route('chip1', at('s10/confident'), -1);
  route('chip2', at('s10/unsure'), 1);
  route('chip3', END('s10') - 0.9, -1);
  route('chip4', S.s11 + 0.5, -1);
  tl.to('#router', { scale: 0.55, y: -90, duration: 0.6, ease: 'power3.inOut' }, S.s11 + 1.6);
  fade('ill10', S.s11 + 1.6, 0.2);
  tl.set('#stats', { opacity: 1 }, S.s11);
  pop('statk', S.s11 + 2.1, { y: 10 });
  pop('st1', at('s11/accuracy'), { y: 40 });
  count('sn1', 80, 99.6, at('s11/accuracy'), 0.8, v => v.toFixed(1) + '%');
  tl.to('#sb1', { scaleX: 1, duration: 0.8, ease: 'power2.out' }, at('s11/accuracy') + 0.1);
  pop('st2', at('s11/cost'), { y: 40 });
  count('sn2', 0, 47, at('s11/cost'), 0.7, v => Math.round(v) + '%');
  tl.to('#sb2', { scaleX: 1, duration: 0.7, ease: 'power2.out' }, at('s11/cost') + 0.1);
  sweep('st2', at('s11/cost') + 0.6);

  // ---------- s12 verdict ----------
  group('g12', S.s12, END('s12'));
  pop('v1', Math.min(at('s12/jev'), S.s12 - 0.15), { y: 50, d: 0.45 });
  pop('v2', at('s12/llm'), { y: 50, d: 0.5 });
  pop('vc1', at('s12/routing'), { x: -40, y: 0 });
  pop('vc2', at('s12/routing') + 0.5, { x: -40, y: 0 });
  slam('vc3', at('s12/writing'), -3);

  // ---------- s13 CTA ----------
  group('g13', S.s13, END('s13'));
  ctaWords('s13', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s13/tell'), { y: 30 });
})();
