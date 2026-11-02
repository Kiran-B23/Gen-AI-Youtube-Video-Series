// REA reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json
(function () {
  const pulse = (id, t, s = 1.06) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const kick = (id, t0, t1) => { tl.fromTo('#' + id, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, t0); tl.to('#' + id, { opacity: 0, duration: 0.2 }, t1 - 0.2); };
  const HX = '0123456789ABCDEF';
  const hexRows = (rows, pairs) => Array.from({ length: rows }, () => Array.from({ length: pairs }, () => HX[Math.floor(rnd() * 16)] + HX[Math.floor(rnd() * 16)]).join(' ')).join('\n');
  $('hex0i').innerHTML = '<div id="hex0it">' + hexRows(30, 8) + '</div>';
  $('hex4i').innerHTML = '<div id="hex4it">' + hexRows(22, 8) + '</div>';
  $('hexbi').innerHTML = '<div id="hexbit">' + hexRows(24, 6) + '</div>';
  $('hexci').innerHTML = '<div id="hexcit">' + hexRows(14, 7) + '</div>';
  $('grid0').innerHTML = Array.from({ length: 40 }, (_, i) => `<i id="g0c${i}"></i>`).join('');
  $('grid').innerHTML = Array.from({ length: 100 }, (_, i) => `<i id="gc${i}"></i>`).join('');
  $('bo').innerHTML = Array.from({ length: 63 }, (_, i) => `<i id="bo${i}"></i>`).join('');
  $('br').innerHTML = Array.from({ length: 63 }, (_, i) => `<i id="br${i}"></i>`).join('');
  $('itab').innerHTML = Array.from({ length: 11 }, (_, i) => `<i id="it${i}" style="width:${55 + Math.floor(rnd() * 40)}%"></i>`).join('');
  // bricks: 6 columns x 3 rows, 120 x 44, pitch 134 x 58 (panel coords: grid origin 69,40)
  const FILL = ['#2B3BE0', '#FFD23F', '#EEF1F6'];
  let bh = '';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) bh += `<i id="bk${r}${c}" class="r-brick" style="left:${c * 134}px;top:${r * 58}px;background:${FILL[r]}"></i>`;
  $('bricks').innerHTML = bh + Array.from({ length: 6 }, (_, i) => `<i id="sh${i}" class="r-shard" style="left:${40 + (i % 3) * 20}px;top:${126 + Math.floor(i / 3) * 14}px"></i>`).join('');
  const bx = (c) => 69 + c * 134 + 60 - 15 - 453, by = (r) => 40 + r * 58 + 44 - 366;   // ball offset to hit a brick from below
  const ball = (dx, dy, t, d = 0.32) => tl.to('#ball', { keyframes: [{ x: dx, y: dy, duration: d, ease: 'power2.out' }, { x: 0, y: 0, duration: d, ease: 'power2.in' }] }, t - d);
  const needle = (pct, t) => tl.to('#needle', { x: pct * 5.4, duration: 0.35, ease: 'back.out(1.6)' }, t);
  tl.set('#needle', { x: 270 }, 0);
  const sgn = v => (v > 0.5 ? '+' : v < -0.5 ? '−' : '') + Math.abs(Math.round(v));

  // ---------- s01-s02 hook (dark), built on the voice (openings rule, 2026-10-30) ----------
  // 0 s: the sealed game.exe card alone (its label + the caption). "source code" slams and is struck on its words,
  // the file opens (hex streams in) and "1996" lands on "1996"; the counter and its grid arrive on "matched" (s02).
  group('g01', 0, S.s03);
  tl.set(['#hex0'], { opacity: 1 }, 0);
  tl.set(['#hex0i', '#cnt0', '#grid0'], { opacity: 0 }, 0);
  tl.fromTo('#hex0', { scale: 0.96, backgroundColor: '#24305A' }, { scale: 1, duration: 0.5, ease: 'power2.out' }, 0);   // sealed: a lit slab
  tl.to('#hex0', { backgroundColor: '#0B1020', duration: 0.4 }, at('s01/hex'));                                      // opened: the bytes show
  tl.fromTo('#hex0it', { y: 0 }, { y: -420, duration: S.s03, ease: 'none' }, 0);
  slam('srcc', at('s01/src'), -2);
  tl.to('#srcx', { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at('s01/code'));
  pulse('hex0', at('s01/file'), 1.03);
  tl.to('#hex0i', { opacity: 1, duration: 0.4 }, at('s01/hex'));
  pop('y96', at('s01/hex'), { y: 20 });
  pop('agent0', at('s02/agent'), { x: 60, y: 0 });
  tl.fromTo('#fn0', { opacity: 0, x: -120, y: -380, scale: 0.4 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }, at('s02/funcs'));
  tl.fromTo('#cnt0', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', immediateRender: false }, at('s02/matched'));
  tl.to('#grid0', { opacity: 1, duration: 0.25 }, at('s02/matched'));
  slam('one0', at('s02/matched') + 0.15, -3);
  tl.to(Array.from({ length: 40 }, (_, i) => '#g0c' + i), { backgroundColor: '#2ED3A0', duration: 0.12, stagger: Math.max(0.01, (at('s02/tests') + 0.4 - at('s02/matched')) / 40) }, at('s02/matched'));
  pulse('fn0', at('s02/tests'), 1.03);

  // ---------- s03 REA (blue) ----------
  group('g03', S.s03, S.s04);
  pop('reas', S.s03 - 0.05, { y: 20 });
  slam('rea', at('s03/rea'), 0);
  typeText('reav', 'Reverse Engineer Anything', at('s03/rev') - 0.05, at('s03/rev') + 1.0);
  pop('reao', at('s03/open'), { y: 30 });
  pulse('rea', at('s03/rev'), 1.04);

  // ---------- s04 look inside without source (blue) ----------
  group('g04', S.s04, S.s05);
  pop('reac', S.s04 - 0.05, { y: 20 });
  pop('agent4', at('s04/agent'), { x: -40, y: 0 });
  pop('arr4', at('s04/agent') + 0.2, { x: -20, y: 0 });
  tl.fromTo('#hex4', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, S.s04 + 0.1);
  tl.fromTo('#hex4it', { y: 0 }, { y: -120, duration: D.s04, ease: 'none' }, S.s04);
  tl.set('#scan4', { opacity: 1, y: 0 }, at('s04/inside'));
  tl.to('#scan4', { y: 470, duration: 0.9, ease: 'none' }, at('s04/inside'));
  tl.set('#scan4', { opacity: 0 }, at('s04/inside') + 0.9);
  tl.to('#hex4', { backgroundColor: 'rgba(11,16,32,0.35)', duration: 0.5 }, at('s04/inside') + 0.4);
  tl.to('#hex4i', { color: '#FFFFFF', duration: 0.5 }, at('s04/inside') + 0.4);
  pop('src4', at('s04/without') - 0.1, { y: 20 });
  tl.to('#src4x', { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at('s04/without') + 0.35);

  // ---------- s05 the loop: agent -> REA -> decompilers -> evidence (blue) ----------
  group('g05', S.s05, S.s06);
  pop('c1', S.s05 - 0.05, { y: 40, ease: 'power3.out' });
  pulse('c1', at('s05/q'), 1.03);
  pop('a12', at('s05/q') + 0.45, { y: -20 });
  pop('c2', at('s05/q') + 0.55, { y: 40, ease: 'power3.out' });
  pop('a23', at('s05/dec') - 0.1, { y: -20 });
  pop('c3', at('s05/dec'), { y: 40, ease: 'power3.out' });
  pulse('fhex', at('s05/compiled'), 1.06);
  tl.to('#fhex', { opacity: 0, rotationX: 90, duration: 0.2 }, at('s05/readable'));
  tl.fromTo('#fcode', { opacity: 0, rotationX: -90 }, { opacity: 1, rotationX: 0, duration: 0.25 }, at('s05/readable') + 0.2);
  pop('farr', at('s05/readable') + 0.3, { x: -30, y: 0 });
  pop('a34', at('s05/evidence') - 0.3, { y: -20 });
  pop('c4', at('s05/evidence') - 0.2, { y: 40, ease: 'power3.out' });
  ['ev1', 'ev2', 'ev3'].forEach((id, k) => pop(id, at('s05/evidence') + 0.1 + k * 0.15, { y: 30 }));
  tl.to(['#ev1', '#ev2', '#ev3'], { y: -10, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.1 }, at('s05/evidence') + 0.9);
  pulse('c1', S.s06 - 0.6, 1.03);

  // ---------- the game panel (s06-s11) ----------
  group('gpan', S.s06, S.s12);
  tl.fromTo('#pan', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, S.s06 - 0.05);
  for (let r = 0; r < 3; r++) tl.fromTo(Array.from({ length: 6 }, (_, c) => `#bk${r}${c}`), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'back.out(1.6)' }, S.s06 + 0.05 + r * 0.15);
  kick('kq', S.s06, S.s07);
  pulse('ball', at('s06/question'), 1.3);
  ball(bx(0), by(2), at('s06/left'));
  tl.to('#bk20', { opacity: 0, scale: 0.6, duration: 0.15 }, at('s06/left'));
  for (let i = 0; i < 6; i++) tl.fromTo('#sh' + i, { opacity: 1, x: 0, y: 0, rotation: 0 }, { opacity: 0, x: (i % 3 - 1) * 70, y: -40 - Math.floor(i / 3) * 50, rotation: 120 * (i % 2 ? 1 : -1), duration: 0.6, ease: 'power2.out' }, at('s06/left'));
  pulse('spL', at('s06/left') + 0.05, 1.35);
  needle(18, at('s06/left') + 0.05);
  pulse('spL', at('s06/hear'), 1.25);
  ball(bx(0), by(1), at('s06/left2'));
  pulse('bk10', at('s06/left2'), 1.12);
  pulse('spL', at('s06/left2') + 0.05, 1.35);
  pop('qm', at('s06/how'), { y: 30, s: 0.5 });
  fade('qm', S.s07 - 0.2, 0.2);
  tl.set('#bk20', { opacity: 1, scale: 1 }, S.s07);   // the brick is back for the trace
  tl.to('#pan', { opacity: 0.55, duration: 0.3 }, S.s07);
  tl.to('#pan', { opacity: 1, duration: 0.3 }, S.s09 - 0.1);

  // ---------- the bench: game.exe + the function card (s07-s11) ----------
  group('gbench', S.s07, S.s12);
  kick('kd', S.s07, S.s10);
  tl.fromTo('#hexb', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, S.s07 - 0.05);
  tl.fromTo('#hexbit', { y: 0 }, { y: -160, duration: S.s08 - S.s07, ease: 'none' }, S.s07);
  tl.fromTo('#fn', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, at('s07/draft'));
  pulse('fn', at('s07/sound'), 1.02);
  slam('inc', at('s07/incomplete'), -4);
  tl.fromTo('#slot', { backgroundColor: 'rgba(229,54,74,0)' }, { backgroundColor: 'rgba(229,54,74,0.35)', duration: 0.18, yoyo: true, repeat: 3 }, at('s07/input'));
  pulse('slot', at('s07/input') + 0.05, 1.25);
  // s08: the raw instructions take a number in
  tl.to('#hexbi', { opacity: 0, duration: 0.25 }, at('s08/instr'));
  tl.fromTo('#itab', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, at('s08/instr') + 0.1);
  tl.to('#it4', { backgroundColor: '#FFD23F', duration: 0.2 }, at('s08/number'));
  pulse('it4', at('s08/number') + 0.05, 1.08);
  pop('lit', at('s08/number') + 0.1, { y: 20 });
  slam('neq', at('s08/mismatch'), 0);
  tl.set('#scanb', { opacity: 1, y: 0 }, at('s08/digging'));
  tl.to('#scanb', { y: 500, duration: 0.8, ease: 'none' }, at('s08/digging'));
  tl.set('#scanb', { opacity: 0 }, at('s08/digging') + 0.8);
  // s09: follow the call back to the brick; the number is its position; it fills the slot
  fade('neq', S.s09, 0.2); fade('lit', S.s09, 0.2);
  tl.to('#callp', { opacity: 1, strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, at('s09/call'));
  const PATH = [[803, 900], [760, 800], [520, 760], [260, 650], [201, 470]];
  tl.set('#dot', { opacity: 1, x: PATH[0][0], y: PATH[0][1] }, at('s09/call'));
  tl.to('#dot', { keyframes: PATH.slice(1).map(([x, y]) => ({ x, y, duration: 0.16 })), ease: 'none' }, at('s09/call') + 0.05);
  tl.to('#bk20', { backgroundColor: '#FFD23F', duration: 0.2 }, at('s09/brick'));
  pulse('bk20', at('s09/brick'), 1.2);
  pop('ruler', at('s09/position') - 0.2, { y: 10 });
  tl.to('#dot', { keyframes: PATH.slice(0, -1).reverse().map(([x, y]) => ({ x, y, duration: 0.14 })), ease: 'none' }, at('s09/position') + 0.1);
  tl.set('#dot', { opacity: 0 }, at('s09/position') + 0.7);
  typeText('slot', 'position', at('s09/position') + 0.6, at('s09/position') + 1.0);
  tl.to('#slot', { borderStyle: 'solid', borderColor: '#0B1020', backgroundColor: 'rgba(43,59,224,0.12)', duration: 0.2 }, at('s09/position') + 0.6);
  tl.set('#inc', { opacity: 0 }, at('s09/position') + 0.6);
  pulse('fn', at('s09/screen'), 1.03);
  // s10-s11 (yellow): the constants, the formula, and the needle it drives
  kick('kf', S.s10, S.s12);
  tl.set('#illb', { color: 'rgba(11,16,32,0.6)' }, S.s10 - 0.05);
  tl.to('#callp', { opacity: 0, duration: 0.2 }, S.s10 - 0.1);
  tl.set('#bk20', { backgroundColor: FILL[2] }, S.s10);
  tl.to('#blur', { opacity: 0, duration: 0.2 }, S.s10);
  tl.set('#fnk1', { display: 'none' }, at('s10/formula')); tl.set('#fnk2', { display: 'inline' }, at('s10/formula'));
  pop('k1', at('s10/constants'), { y: 20 }); pop('k2', at('s10/constants') + 0.15, { y: 20 });
  tl.to(['#k1', '#k2'], { x: 420, y: 140, opacity: 0, duration: 0.45, ease: 'power2.in', stagger: 0.1 }, at('s10/formula'));
  typeText('f1', 'position', at('s10/pos'), at('s10/pos') + 0.4);
  typeText('f2', '× 1.5625', at('s10/times'), at('s10/times') + 0.4);
  typeText('f3', '− 500', at('s10/minus'), at('s10/minus') + 0.3);
  typeText('f4', '× pan scale (1.0)', at('s11/scale') - 0.2, at('s11/scale') + 0.5);
  typeText('f5', '→ whole number', at('s11/scale') + 0.7, at('s11/scale') + 1.2);
  ball(bx(0), by(1), at('s11/left'));
  pulse('bk10', at('s11/left'), 1.12);
  needle(0, at('s11/left')); pulse('spL', at('s11/left') + 0.05, 1.35);
  count('pv', 0, -500, at('s11/left'), 0.4, sgn);
  ball(0, -170, at('s11/centre'));
  needle(50, at('s11/centre'));
  count('pv', -500, 0, at('s11/centre'), 0.3, sgn);
  ball(bx(5), by(1), at('s11/right'));
  pulse('bk15', at('s11/right'), 1.12);
  needle(100, at('s11/right')); pulse('spR', at('s11/right') + 0.05, 1.35);
  count('pv', 0, 500, at('s11/right'), 0.4, sgn);

  // ---------- s12-s14 the check (blue) ----------
  group('g12', S.s12, S.s15);
  kick('kc', S.s12, S.s15);
  tl.fromTo('#colO', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, S.s12 - 0.05);
  tl.fromTo('#colR', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, at('s12/rebuilt'));
  pop('cmp', at('s12/tested'), { y: 0, s: 0.4 });
  tl.fromTo('#cmp', { rotation: 0 }, { rotation: 360, duration: 0.6, ease: 'power2.inOut' }, at('s12/tested') + 0.3);
  pulse('colO', at('s12/original'), 1.04);
  tl.fromTo('#hexcit', { y: 0 }, { y: -120, duration: S.s15 - S.s12, ease: 'none' }, S.s12);
  tl.fromTo('#grid', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, S.s13 - 0.05);
  for (let r = 0; r < 5; r++) tl.to(Array.from({ length: 20 }, (_, c) => '#gc' + (r * 20 + c)), { backgroundColor: '#2ED3A0', duration: 0.1, stagger: 0.025 },
    at('s13/every') + r * Math.max(0.25, (at('s13/all') + 0.6 - at('s13/every')) / 5));
  count('cntn', 0, 3205, at('s13/all'), 0.9, v => Math.round(v).toLocaleString('en-US'));
  tl.fromTo('.r-cof2', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at('s13/all') + 0.5);
  pop('mt', at('s13/match'), { y: 20 });
  pop('one1', at('s13/match') + 0.15, { y: 20 });
  tl.to(['#cnt', '#grid', '#mt'], { opacity: 0, y: -40, duration: 0.25 }, S.s14 - 0.1);
  tl.to('#one1', { y: 100, x: -40, duration: 0.35, ease: 'power2.inOut' }, S.s14 - 0.1);
  tl.fromTo('#bytes', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, at('s14/compiled'));
  { const a = at('s14/same'), b = at('s14/bytes') + 0.8, st = (b - a) / 63;
    tl.to(Array.from({ length: 63 }, (_, i) => '#bo' + i), { backgroundColor: '#FFFFFF', duration: 0.08, stagger: st }, a);
    tl.to(Array.from({ length: 63 }, (_, i) => '#br' + i), { backgroundColor: '#2ED3A0', duration: 0.08, stagger: st }, a + 0.05); }
  count('b63n', 0, 63, at('s14/bytes') - 0.1, 0.8, v => Math.round(v));
  tl.set('#b63', { opacity: 1 }, at('s14/bytes') - 0.1);
  pulse('b63', at('s14/original'), 1.06);

  // ---------- s15-s16 not a clone button; the evidence (light) ----------
  group('g15', S.s15, S.s17);
  pop('clb', S.s15 - 0.05, { y: 30 });
  slam('ncl', at('s15/clone'), -5);
  tl.fromTo(['#clx1', '#clx2'], { scaleX: 0 }, { scaleX: 1, duration: 0.2, stagger: 0.08, ease: 'power3.out' }, at('s15/clone') - 0.1);
  tl.to('#clb', { opacity: 0.45, duration: 0.2 }, at('s15/clone'));
  pop('rec', at('s15/recovers'), { y: 40, ease: 'power3.out' });
  pop('src15', at('s15/original') - 0.2, { y: 20 });
  tl.to('#src15x', { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at('s15/original') + 0.3);
  ['e1', 'e2', 'e3'].forEach((id, k) => tl.fromTo('#' + id, { opacity: 0, y: 80, rotation: (k - 1) * 8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.5)' }, at('s16/evidence') + k * 0.15));
  tl.fromTo('#mag', { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.25 }, at('s16/answer') - 0.2);
  tl.to('#mag', { x: 760, duration: Math.max(0.8, at('s16/check') - at('s16/answer') + 0.2), ease: 'power1.inOut' }, at('s16/answer'));
  ['t1', 't2', 't3'].forEach((id, k) => pop(id, at('s16/check') + k * 0.15, { y: 0, s: 0.3 }));

  // ---------- s17-s18 the catch (dark) ----------
  group('g17', S.s17, S.s19);
  kick('kx', S.s17, S.s19);
  { const w = (x, n) => W('s17', x, n) ?? S.s17;
    [['cw1', at('s17/only')], ['cw2', at('s17/only') + 0.2], ['cw3', w('software') - 0.05], ['cw4', w('you') - 0.05], ['cw5', w('you') + 0.2], ['cw6', w('examine') - 0.05]]
      .forEach(([id, t]) => pop(id, t, { y: 50, ease: 'power4.out', d: 0.3 })); }
  pulse('kx', at('s17/catch'), 1.1);
  pop('ch1', at('s17/own'), { x: -40, y: 0 });
  pop('ch2', at('s17/allowed'), { x: -40, y: 0 });
  pulse('ch2', W('s17', 'examine') ?? at('s17/allowed') + 0.6, 1.04);
  [['x1', 'lic'], ['x2', 'laws'], ['x3', 'rights']].forEach(([id, k]) => slam(id, at('s18/' + k), 0));
  pulse('cw3', S.s18 + 0.1, 1.04);

  // ---------- s19 verdict (yellow) ----------
  group('g19', S.s19, S.s20);
  pop('v1', S.s19 - 0.05, { y: 40, ease: 'power3.out' });
  pulse('v1', at('s19/learning'), 1.04);
  pop('v2', at('s19/security'), { y: 40, ease: 'power3.out' });
  pop('v3', at('s19/preserving'), { y: 40, ease: 'power3.out' });
  tl.to(['#v1', '#v2', '#v3'], { opacity: 0, scale: 0.6, duration: 0.3, stagger: 0.06, ease: 'power2.in' }, at('s19/ask') - 0.15);
  pop('vq', at('s19/ask') + 0.1, { y: 50, ease: 'power3.out' });
  pop('ve', at('s19/evidence') - 0.35, { y: 30 });
  pop('vk', at('s19/evidence') - 0.1, { y: 40 });

  // ---------- s20 CTA (dark) ----------
  group('g20', S.s20, END('s20'));
  ctaWords('s20', [['q1', 'what'], ['q2', 'should'], ['q3', 'i'], ['q4', 'explain'], ['q5', 'next']]);
  pop('ctaf', at('s20/tell'), { y: 30 });
})();
