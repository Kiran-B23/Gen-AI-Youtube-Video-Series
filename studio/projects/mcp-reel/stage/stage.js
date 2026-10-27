// MCP reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json
(function () {
  const pulse = (id, t, s = 1.06) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const laneColour = (sid, c) => tl.set('#lanes', { color: c }, S[sid] - 0.05);

  // ---------- s01 hook (dark): the answered chat is on screen from frame 0 ----------
  group('g01', 0, S.s02);
  tl.set(['#h1q', '#h1a'], { opacity: 1 }, 0);
  tl.fromTo('#h1q', { x: 40 }, { x: 0, duration: 0.6, ease: 'power3.out' }, 0);
  slam('h1h', 0.15, -2);   // the claim is on screen from the first second
  pulse('h1h', at('s01/weather'), 1.05);
  tl.fromTo('#h1x', { opacity: 0, scale: 2.2, rotation: -20 }, { opacity: 1, scale: 1, rotation: 8, duration: 0.3, ease: 'back.out(2)' }, at('s01/how'));
  tl.fromTo('#h1a', { x: 0 }, { x: 10, duration: 0.06, yoyo: true, repeat: 5 }, at('s01/rain'));

  // ---------- s02-s03 the question meets the model alone (blue) ----------
  group('g02', S.s02, S.s04);
  pop('q2', S.s02 - 0.1, { y: 60, ease: 'power3.out' });
  typeText('q2t', 'Will it rain in Tokyo tomorrow?', at('s02/q') + 0.25, at('s02/tom') + 0.35);
  pop('m3', S.s03 - 0.1, { y: 60, ease: 'power3.out' });
  tl.fromTo('#m3 .m-tr', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.12 }, at('s03/own') + 0.1);
  pop('cal', at('s03/live') - 0.1, { y: 30 });
  pop('tomc', at('s03/live') + 0.4, { x: 60, y: 0 });
  tl.to('#tomc', { x: -36, duration: 0.18, ease: 'power2.in' }, at('s03/tom'));
  tl.to('#tomc', { x: 24, duration: 0.45, ease: 'back.out(3)' }, at('s03/tom') + 0.18);
  slam('nolive', at('s03/tom') + 0.35, -4);

  // ---------- the relay desk: visible s04-s14, hidden only under the chapter cards ----------
  const t07 = chapter('c1', S.s07, at('s07/menu') + 0.35);
  const t10 = chapter('c2', S.s10, at('s10/note') + 0.35);
  const t12 = chapter('c3', S.s12, at('s12/call') + 0.35);
  [[S.s04, S.s07 - 0.2], [t07 + 0.05, S.s10 - 0.2], [t10 + 0.05, S.s12 - 0.2], [t12 + 0.05, S.s15]].forEach(([a, b]) => group('gdesk', a, b));
  [[S.s06, S.s07 - 0.2], [t07 + 0.05, S.s10 - 0.2], [t10 + 0.05, S.s12 - 0.2], [t12 + 0.05, S.s15]].forEach(([a, b]) => show('gobj', a, b));
  laneColour('s04', '#FFD23F'); laneColour('s07', '#2B3BE0'); laneColour('s10', '#0B1020'); laneColour('s12', '#FFD23F');
  progress([['s07', 'light'], ['s10', 'yellow'], ['s12', 'blue']], [['p1', 's07'], ['p2', 's10'], ['p3', 's12']], S.s07, S.s15 - 0.2);

  // ---------- s04 the twist (dark): model and server, nothing between ----------
  pop('tm', S.s04 - 0.1, { y: -40, ease: 'power3.out' });
  pop('ts', S.s04 + 0.05, { y: 40, ease: 'power3.out' });
  pop('tw', S.s04 + 0.2, { y: 30 });
  group('g04', S.s04, S.s05 + 0.3);
  tl.to('#gap', { opacity: 1, duration: 0.4 }, S.s04 + 0.15);
  tl.fromTo('#gap', { scale: 1 }, { scale: 1.04, duration: Math.max(0.3, at('s04/never') - at('s04/twist')), ease: 'power1.inOut' }, at('s04/twist'));
  slam('never', at('s04/never'), -4);
  tl.fromTo('#gap', { backgroundPosition: '0px 0px' }, { backgroundPosition: '204px 0px', duration: D.s04 + 0.4, ease: 'none' }, S.s04);   // stripes keep moving: never a still frame
  tl.fromTo('#never', { x: 0 }, { x: 14, duration: 0.05, yoyo: true, repeat: 5 }, at('s04/once'));
  tl.fromTo(['#tm', '#ts'], { y: 0 }, { y: (i) => (i ? 18 : -18), duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at('s04/once') + 0.35);
  fade('never', S.s05 - 0.1, 0.25); fade('gap', S.s05 + 0.05, 0.25);

  // ---------- s05 the concept (blue): the app fills the gap ----------
  pop('ta', at('s05/app'), { y: 0, s: 0.6, ease: 'back.out(1.8)' });
  tl.to(['#ln1', '#ln2', '#ln3'], { scaleY: 1, duration: 0.3, stagger: 0.12, ease: 'power2.out' }, at('s05/app') + 0.25);
  slam('mcpc', at('s05/mcp'), -3);
  group('g05', S.s05, S.s06);
  pop('mbig', at('s05/mcp') - 0.05, { y: 40, ease: 'power4.out' });
  typeText('mfull', 'Model Context Protocol', at('s05/proto') - 0.5, at('s05/proto') + 0.45);

  // ---------- s06 the cast ----------
  tl.set(['#tms', '#tas', '#tss'], { opacity: 0 }, 0);
  [['ta', 'tas', 'app'], ['tm', 'tms', 'model'], ['ts', 'tss', 'server']].forEach(([tile, lab, w]) => {
    pulse(tile, at('s06/' + w)); tl.to('#' + lab, { opacity: 1, duration: 0.25 }, at('s06/' + w));
  });
  tl.to('#tw', { backgroundColor: '#FFD23F', borderColor: '#0B1020', duration: 0.3 }, at('s06/tool'));
  pulse('ts', (W('s06', 'wraps') ?? at('s06/tool') - 0.8) - 0.05, 1.06);
  tl.fromTo('#tss', { color: 'rgba(11,16,32,0.65)' }, { color: '#2B3BE0', duration: 0.25 }, (W('s06', 'wraps') ?? at('s06/tool') - 0.8));
  tl.fromTo('#qcard', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 1 }, at('s06/tool') + 0.1);
  { const f0 = at('s06/server'), f1 = S.s07 - 0.2, n = Math.max(1, Math.floor((f1 - f0) / 0.7));   // a signal runs down the MCP lane
    tl.set('#flow', { opacity: 1, y: 0 }, f0); tl.to('#flow', { y: 56, duration: 0.35, ease: 'power1.inOut', yoyo: true, repeat: 2 * n - 1 }, f0); tl.set('#flow', { opacity: 0 }, f1); }
  pop('qcard', at('s06/app') + 0.15, { x: 320, y: 0, s: 1, ease: 'power3.out', d: 0.55 });

  // ---------- STEP 1 the menu (s07-s09, light) ----------
  tl.fromTo('#clist', { opacity: 0, y: 0 }, { opacity: 1, duration: 0.2 }, Math.max(t07, at('s07/asks') - 0.1));
  tl.to('#clist', { y: 105, duration: 0.5, ease: 'power2.inOut' }, Math.max(t07, at('s07/asks') - 0.1) + 0.2);
  tl.to('#clist', { opacity: 0, duration: 0.2 }, at('s07/do') + 0.2);
  pop('menu', at('s08/tools') - 0.05, { y: 40, ease: 'power3.out' });
  tl.to(['#d1', '#d2', '#d3'], { backgroundSize: '100% 30%', duration: 0.35, stagger: 0.12 }, at('s08/desc'));
  pulse('r1', at('s08/fc'), 1.03);
  pop('ia', at('s08/city'), { y: 10 }); pop('ib', at('s08/date'), { y: 10 });
  tl.fromTo('#cback', { opacity: 0, y: 110 }, { opacity: 1, y: 110, duration: 0.2 }, at('s08/tools'));   // the reply travels back up to the app
  tl.to('#cback', { y: 0, duration: Math.max(0.8, at('s08/fc') - at('s08/tools')), ease: 'power1.inOut' }, at('s08/tools') + 0.2);
  tl.to('#cback', { opacity: 0, duration: 0.25 }, at('s08/fc') + 0.3);
  pulse('ta', at('s08/fc') + 0.1, 1.06);
  pulse('qcard', (W('s08', 'weather') ?? at('s08/fc') + 1.3) - 0.05, 1.05);   // the question is about weather: it lights up
  tl.fromTo('#qcard', { borderColor: '#0B1020' }, { borderColor: '#FFD23F', duration: 0.3, yoyo: true, repeat: 1 }, (W('s08', 'weather') ?? at('s08/fc') + 1.3));
  pulse('qcard', at('s08/city') - 0.05, 1.04);
  tl.to('#qtk', { backgroundSize: '100% 100%', duration: 0.3 }, at('s08/city')); pulse('qtk', at('s08/city'), 1.12);   // the question already holds the city ...
  tl.to('#qtm', { backgroundSize: '100% 100%', duration: 0.3 }, at('s08/date')); pulse('qtm', at('s08/date'), 1.12);   // ... and the date
  tl.to('#qcard', { y: -250, duration: 0.4, ease: 'power2.inOut' }, at('s09/slides'));
  tl.to('#qcard', { y: -565, scale: 0.8, duration: 0.4, ease: 'power2.inOut' }, at('s09/slides') + 0.45);
  tl.to('#menu', { y: -250, duration: 0.45, ease: 'power2.inOut' }, at('s09/slides') + 0.1);
  tl.to('#menu', { y: -659, duration: 0.45, ease: 'power2.inOut' }, Math.max(at('s09/slides') + 0.6, at('s09/model') - 0.2));
  pulse('tm', at('s09/question'), 1.04);

  // ---------- STEP 2 the note (s10-s11, yellow) ----------
  tl.set('#scan', { opacity: 1, y: 0 }, at('s10/reads'));
  tl.to('#scan', { y: 320, duration: 0.8, ease: 'none' }, at('s10/reads'));
  tl.set('#scan', { opacity: 0 }, at('s10/reads') + 0.8);
  tl.to(['#r2', '#r3'], { opacity: 0, duration: 0.25 }, at('s10/picks'));
  tl.to('#d1', { height: 0, opacity: 0, duration: 0.3 }, at('s10/picks') + 0.2);
  tl.to('#menu', { height: 168, duration: 0.4, ease: 'power2.inOut' }, at('s10/picks') + 0.25);
  tl.to('#r1', { backgroundColor: 'rgba(255,210,63,0.45)', duration: 0.3 }, at('s10/picks'));
  pop('runb', S.s11, { y: 10 });
  tl.to('#runb', { backgroundColor: '#5E6678', duration: 0.2 }, at('s11/run'));
  tl.fromTo('#runx', { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, at('s11/run'));
  pop('note', at('s11/note') - 0.15, { y: 30 });
  typeText('notet', '{"name": "get_forecast",\n "arguments": {"city": "Tokyo",\n   "date": "tomorrow"}}', at('s11/note') + 0.1, at('s11/tom') + 0.45);

  // ---------- STEP 3 the call (s12-s14, blue) ----------
  tl.to('#note', { y: 249, duration: 0.5, ease: 'power2.inOut' }, Math.max(t12, at('s12/note') - 0.1));
  slam('tcall', Math.max(t12, at('s12/note') - 0.1) + 0.5, -3);
  tl.to('#note', { y: 504, duration: 0.5, ease: 'power2.inOut' }, at('s12/server') - 0.1);
  tl.set('#pulse', { opacity: 1, y: 0 }, at('s13/asks'));
  tl.to('#pulse', { y: 44, duration: 0.3, yoyo: true, repeat: 3, ease: 'power1.inOut' }, at('s13/asks'));
  tl.set('#pulse', { opacity: 0 }, at('s13/asks') + 1.25);
  pulse('tw', at('s13/weather'), 1.08);
  tl.to('#note', { scale: 0.6, opacity: 0, duration: 0.3 }, at('s13/weather'));
  pop('res', at('s13/weather') + 0.3, { y: 20 });
  tl.to('#res', { y: -300, duration: 0.5, ease: 'power2.inOut' }, at('s13/back'));
  tl.to('#res', { y: -564, duration: 0.45, ease: 'power2.inOut' }, at('s14/hands'));
  pulse('tm', at('s14/hands') + 0.45, 1.04);
  fade('res', at('s14/answers'), 0.2);
  const tYes = (W('s14', 'yes') ?? at('s14/answers') + 0.4) - 0.1;
  pop('reply', tYes - 0.05, { y: 20, d: 0.3 });
  [['rw1', 'yes', 0], ['rw2', 'pack', 0], ['rw3', 'an', 2], ['rw4', 'umbrella', 0]].forEach(([id, w, n], k) =>   // 'an' is the 3rd match ('and', 'answers', 'an')
    pop(id, Math.max(tYes, (W('s14', w, n) ?? tYes + 0.3 * k) - 0.05), { y: 20, d: 0.3 }));

  // ---------- why a standard (s15-s17, light) ----------
  group('g15', S.s15, S.s18);
  $('grid').innerHTML = Array.from({ length: 16 }, (_, i) => `<div class="m-tile2" id="gt${i}">custom<br>code</div>`).join('');
  pop('gk1', S.s15 - 0.1, { y: 20 });
  tl.fromTo('#tools .chip', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, S.s15);
  ['ap1', 'ap2', 'ap3', 'ap4'].forEach((id, k) => pop(id, Math.min(S.s15 + 0.5, at('s15/before')) + k * 0.12, { x: -40, y: 0 }));   // the grid's rows are on screen at once
  const g0 = at('s15/every1'), g1 = at('s15/every2') + 0.6;
  for (let i = 0; i < 16; i++) tl.fromTo('#gt' + i, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2)' }, g0 + i * (g1 - g0) / 16);
  fade('gk1', at('s16/now') - 0.1, 0.2); pop('gk2', at('s16/now') + 0.1, { y: 20 });
  for (let i = 0; i < 16; i++) tl.to('#gt' + i, { scale: 0, opacity: 0, duration: 0.25 }, at('s16/now') + i * 0.02);
  ['ap1', 'ap2', 'ap3', 'ap4'].forEach((id, k) => tl.to('#' + id, { x: 255 + 174 * k, y: 440 - 140 * k, duration: 0.6, ease: 'power3.inOut' }, at('s16/now') + 0.25 + k * 0.08));
  tl.to('#rail', { scaleX: 1, duration: 0.45, ease: 'power2.out' }, at('s16/one') - 0.1);
  tl.fromTo('#plugs .m-pl', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }, at('s16/one') + 0.1);
  tl.to('#plugs i', { scaleY: 1, duration: 0.3, stagger: 0.08 }, at('s16/one') + 0.25);
  ['ap1', 'ap2', 'ap3', 'ap4'].forEach((id, k) => pulse(id, (W('s16', 'apps') ?? at('s16/plug') - 1.5) + k * 0.1, 1.1));
  tl.fromTo('#plugs .m-pl', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.08 }, (W('s16', 'speak') ?? at('s16/plug') - 1.1));
  tl.to('#ups i', { scaleY: 1, duration: 0.35, stagger: 0.1, ease: 'power2.out' }, at('s16/plug'));
  { const r0 = at('s16/plug') + 0.2, r1 = at('s17/chatgpt'), n = Math.max(1, Math.round((r1 - r0) / 0.9));   // traffic on the shared rail
    tl.set('#railg', { opacity: 1, x: 0 }, r0); tl.to('#railg', { x: 680, duration: 0.9, ease: 'none', repeat: n - 1 }, r0); tl.set('#railg', { opacity: 0 }, r0 + 0.9 * n); }
  [['ap1', 'chatgpt'], ['ap2', 'gemini'], ['ap3', 'copilot'], ['ap4', 'vs']].forEach(([id, w], k) => {   // each name lands on its word
    const t = Math.max(at('s17/chatgpt'), (W('s17', w) ?? at('s17/chatgpt') + 0.45 * k) - 0.1);
    tl.to(`#${id} em`, { opacity: 0, duration: 0.15 }, t); tl.to(`#${id} strong`, { opacity: 1, duration: 0.2 }, t + 0.05); pulse(id, t, 1.12);
  });
  tl.fromTo('#rail', { scaleY: 1 }, { scaleY: 1.25, duration: 0.18, yoyo: true, repeat: 1 }, at('s17/use'));
  tl.to('#ups i', { scaleY: 0.6, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.08 }, at('s17/use') + 0.1);
  count('n10k', 0, 10000, at('s17/num'), 1.0, v => (Math.round(v / 10) * 10).toLocaleString('en-US') + '+');
  pop('n10l', at('s17/num') + 0.6, { y: 20 });

  // ---------- the catch (s18-s20, dark) ----------
  group('g18', S.s18, S.s21 - 0.15);
  pop('cmenu', S.s18 - 0.1, { y: 60, ease: 'power3.out' });
  pop('believe', at('s18/believes') - 0.45, { y: 40, ease: 'power4.out' });
  pulse('believe', at('s18/menu'), 1.03);
  fade('believe', S.s19 - 0.1, 0.25);
  tl.to('#cmenu', { y: -500, duration: 0.5, ease: 'power3.inOut' }, S.s19 - 0.05);
  tl.to('#hid', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, at('s19/hide'));
  pop('uview', at('s19/see') - 0.2, { y: 40 });
  tl.set('#cscan', { opacity: 1, y: 0 }, at('s20/reads'));
  tl.to('#cscan', { y: 250, duration: 0.7, ease: 'none' }, at('s20/reads'));
  tl.set('#cscan', { opacity: 0 }, at('s20/reads') + 0.7);
  pop('cmodel', S.s20 - 0.05, { y: 40 });
  tl.to('#arrp', { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, at('s20/follow') - 0.35);
  tl.to('#cmodel', { backgroundColor: '#FF4D5E', color: '#FFFFFF', duration: 0.3 }, at('s20/follow') + 0.1);

  // ---------- what to do (s21-s22, dark) ----------
  group('g21', S.s21 - 0.1, S.s23 - 0.15);
  pop('do1', S.s21 - 0.1, { x: -60, y: 0, ease: 'power3.out' });
  pulse('do1', at('s21/trust'), 1.03);
  pop('prev', at('s21/check') - 0.15, { y: 40 });
  pulse('appr', at('s21/approve'), 1.15);
  pop('do3', S.s22 - 0.1, { x: -60, y: 0, ease: 'power3.out' });
  slam('allx', at('s22/every'), -6);

  // ---------- recap (s23, yellow) ----------
  group('g23', S.s23, S.s24);
  pop('rc1', at('s23/menu') - 0.15, { x: -60, y: 0, ease: 'power3.out' }); pop('rq', at('s23/menu'), { y: 10 });
  pop('rc2', at('s23/note') - 0.1, { x: -60, y: 0, ease: 'power3.out' }); tl.to('#rq', { y: 250, duration: 0.35, ease: 'power2.inOut' }, at('s23/note'));
  pop('rc3', at('s23/call') - 0.1, { x: -60, y: 0, ease: 'power3.out' }); tl.to('#rq', { y: 500, duration: 0.35, ease: 'power2.inOut' }, at('s23/call'));
  pop('dd', at('s23/decides') - 0.4, { y: 40 });
  pulse('dd', at('s23/does'), 1.05);

  // ---------- CTA (s24) ----------
  group('g24', S.s24, END('s24'));
  ctaWords('s24', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s24/tell'), { y: 30 });
})();
