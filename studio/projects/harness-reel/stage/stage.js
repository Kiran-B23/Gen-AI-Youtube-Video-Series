// Harness reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json, read with at(scene/target).
// Running object: the task card + its DONE stamp + its test row. The harness (outline, slots, loop) is built around the MODEL pill,
// which never changes colour, size or label. Camera moves come from the beats' "cam" (assemble), not from this file.
(function () {
  const pulse = (id, t, s = 1.06, d = 0.15) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const on = (id, t, d = 0.25) => tl.to('#' + id, { opacity: 1, duration: d }, t);
  const off = (id, t, d = 0.25) => tl.to(Array.isArray(id) ? id.map(x => '#' + x) : '#' + id, { opacity: 0, duration: d }, t);
  const draw = (id, t, d = 0.4) => { tl.set('#' + id, { opacity: 1 }, t); tl.fromTo('#' + id, { scaleY: 0 }, { scaleY: 1, duration: d, ease: 'power2.out' }, t); };
  const ringOn = t => { tl.set('#h-ring', { opacity: 1, scale: 0.92 }, t); tl.to('#h-ring', { scale: 1.1, duration: 0.5, ease: 'power2.out' }, t); tl.to('#h-ring', { opacity: 0, duration: 0.3 }, t + 1.0); };
  const dashed = (id, t, d = 0.4) => { tl.fromTo('#' + id, { opacity: 0 }, { opacity: 1, duration: d }, t); };
  const SEC = { blue: { ink: '#FFFFFF', bg: '#2433D9', slot: 'rgba(255,255,255,0.6)' }, yellow: { ink: '#0B1020', bg: '#FFC145', slot: 'rgba(11,16,32,0.55)' },
                light: { ink: '#0B1020', bg: '#F4F5FA', slot: 'rgba(11,16,32,0.5)' }, dark: { ink: '#FFFFFF', bg: '#0B1020', slot: 'rgba(255,255,255,0.5)' } };   // engine palette
  // the agent log: line n (1-based after the s02 reset) types on its word; past 5 lines the list scrolls up one row (42 px)
  const LOG = (id, text, t, n, d) => { tl.set('#' + id, { opacity: 1 }, t); typeText(id, text, t, t + (d ?? Math.min(0.8, 0.12 + text.length * 0.025)));
    if (n > 5) tl.to('#h-login', { y: -(n - 5) * 42, duration: 0.25, ease: 'power2.out' }, t - 0.05); };
  const theme = (t, k) => { const c = SEC[k];
    tl.set('#h-outline', { borderColor: c.ink }, t); tl.set(['#h-ain', '#h-aout'], { color: c.ink }, t); tl.set(['#h-c1', '#h-c2'], { borderLeftColor: c.ink }, t);
    tl.set(['#h-legA', '#h-legH'], { backgroundColor: c.bg, color: c.ink }, t);
    tl.set(['#h-gslot', '#h-cslot'], { borderColor: c.slot, color: c.ink }, t); };
  const E = END('s20');

  // ---------- groups (one per chapter of the reel) ----------
  show('h-g-obj', 0, S.s19);
  show('h-g-wb', 0, S.s14 + 0.4); show('h-g-wb', S.s17 - 0.31, S.s19);
  show('h-g-tg', S.s07 - 0.3, S.s07 + 2.0);
  show('h-g-tc', at('s09/tc') - 0.1, S.s10 + 1.0);
  show('h-g-pr', S.s14 - 0.1, S.s17 + 0.3);
  show('h-g-catch', S.s18 - 0.1, S.s19);
  group('h-g-rc', S.s19 - 0.3, S.s20);
  group('h-g-cta', S.s20 - 0.3, E);

  // ---------- frame 0 (light): the task card stamped DONE over a red failing row ----------
  tl.set('#h-card', { opacity: 0 }, 0);   // the workbench card takes over from the hook card in s02
  tl.set('#h-pill', { y: 190 }, 0);
  // owner note 2026-10-29: the opening was cluttered, every text on screen at once. Frame 0 is now one idea: the task card
  // and its DONE claim. The failing test, the strike and the MODEL question each arrive on their own word; the log waits for s02.
  tl.set('#h-log', { opacity: 0 }, 0);
  tl.set('#h-row0', { opacity: 0 }, 0);
  tl.fromTo('#h-stamp', { x: -285, y: 25, scale: 3.0, rotation: -14, opacity: 1 }, { scale: 2.4, rotation: -8, duration: 0.45, ease: 'back.out(1.6)' }, 0);
  theme(0, 'light');

  // ---------- s01 hook ----------
  tl.to('#h-stamp', { scale: 2.6, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, at('s01/done'));
  tl.to('#h-stamp', { backgroundColor: '#14B87A', color: '#FFFFFF', duration: 0.15 }, at('s01/done'));   // the claim is inked on its word
  tl.set('#h-stamp', { backgroundColor: 'rgba(255,255,255,0.9)', color: '#14B87A' }, S.s02 + 0.1);
  tl.fromTo('#h-row0', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, at('s01/xm'));   // "The test": the failing row arrives
  tl.to('#h-row0', { x: -16, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' }, at('s01/red'));
  tl.set('#h-row0', { x: 0 }, at('s01/red') + 0.4);
  tl.to('#h-row0', { backgroundColor: '#FDE4E7', duration: 0.2 }, at('s01/red'));
  tl.to('#h-strike', { scaleX: 1, duration: 0.35, ease: 'power2.out' }, at('s01/red') + 0.05);   // the test strikes the DONE claim
  pop('h-slot0', at('s01/slot'), { y: 20 });
  tl.fromTo('#h-pill', { opacity: 0, y: 400 }, { opacity: 1, y: 190, duration: 0.45, ease: 'power3.out' }, at('s01/pill'));
  pop('h-smart', at('s01/pill') + 0.15, { y: 20 });
  tl.to('#h-smart', { backgroundColor: '#8A8F9C', color: '#E6E8EE', duration: 0.3 }, at('s01/smart')); tl.set('#h-smart', { textDecoration: 'line-through' }, at('s01/smart'));

  // ---------- s02 (dark): the card moves to the workbench, the title re-types ----------
  tl.to(['#h-row0', '#h-slot0', '#h-smart'], { opacity: 0, y: -80, duration: 0.3, ease: 'power2.in' }, S.s02 - 0.2);
  tl.to('#h-stamp', { opacity: 0, scale: 1.4, duration: 0.25 }, S.s02 - 0.2);
  tl.to('#h-pill', { opacity: 0, y: 440, duration: 0.3, ease: 'power2.in' }, S.s02 - 0.2);
  tl.to('#h-card0', { x: -10, y: -50, scaleX: 0.977, scaleY: 0.684, duration: 0.5, ease: 'power3.inOut' }, S.s02 - 0.2);
  tl.to('#h-card0', { opacity: 0, duration: 0.2 }, S.s02 + 0.2);
  tl.fromTo('#h-card', { opacity: 0 }, { opacity: 1, duration: 0.2 }, S.s02 + 0.15);
  tl.to(['#h-lg1', '#h-lg2', '#h-lg3', '#h-lg4', '#h-lg4b'], { opacity: 0, duration: 0.2 }, S.s02 - 0.2);   // a new task: the log starts a fresh page
  tl.set(['#h-lg1', '#h-lg2', '#h-lg3', '#h-lg4', '#h-lg4b'], { display: 'none' }, S.s02 + 0.05);
  tl.set('#h-strike', { scaleX: 0 }, S.s02 + 0.1);
  tl.fromTo('#h-log', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, S.s02 + 0.1);
  tl.set('#h-ctitle', { opacity: 0 }, at('s02/title'));
  tl.set('#h-ctitleT', { opacity: 1 }, at('s02/title'));
  typeText('h-ctitleT', 'Add password-reset button', at('s02/title'), at('s02/title') + 0.9);
  LOG('h-lg5', '› task: add password-reset button', at('s02/title'), 1);
  tl.fromTo('#h-tag', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, at('s02/tag'));

  // ---------- s03: writes, re-reads, "looks fine", stops ----------
  pop('h-caret', at('s03/caret'), { y: 0 });
  tl.to('#h-caret', { opacity: 0, duration: 0.1 }, Math.max(at('s03/code') + 0.6, at('s03/caret') + 0.7));
  tl.to('#h-tag', { opacity: 0, duration: 0.2 }, at('s03/scan') - 0.3); tl.to('#h-tag', { opacity: 1, duration: 0.2 }, at('s03/stops') + 0.4);
  { const t = at('s03/code'); tl.set('#h-code', { opacity: 1 }, t);
    typeText('h-l1', 'function resetPassword(user) {', t, t + 0.45);
    typeText('h-l2', '  const token = makeToken(user)', t + 0.45, t + 0.9);
    typeText('h-l3', '  saveToken(user.id, token)', t + 0.9, t + 1.3);
    typeText('h-l4', '  return "ok"', t + 1.3, t + 1.55); }
  { const t = at('s03/scan'); tl.set('#h-cscan', { opacity: 1, y: 0 }, t); tl.to('#h-cscan', { y: 160, duration: 0.9, ease: 'none' }, t); tl.set('#h-cscan', { opacity: 0 }, t + 0.95); }
  LOG('h-lg6', '› writing code…', at('s03/code'), 2);
  tl.to('#h-log', { opacity: 0, duration: 0.2 }, at('s03/scan') - 0.35);   // the push-in on the code would carry the log over the captions
  tl.to('#h-log', { opacity: 1, duration: 0.25 }, at('s03/stops') + 0.25);
  LOG('h-lg7', '› re-read: looks fine', at('s03/stops') + 0.3, 3);
  pop('h-fine', at('s03/fine'), { y: 20 });
  tl.to('#h-fine', { opacity: 0, duration: 0.25 }, at('s03/stops') + 0.7);
  tl.set('#h-stamp', { x: 0, y: 0, rotation: -8 }, at('s03/stops') - 0.05);
  tl.fromTo('#h-stamp', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, at('s03/stops'));
  tl.fromTo('#h-row', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, at('s03/row'));
  tl.set('#h-cnr', { opacity: 1 }, at('s03/row'));
  LOG('h-lg8', '› DONE', at('s03/stops') + 1.0, 4);

  // ---------- s04: the test never ran ----------
  pulse('h-row', at('s04/test'), 1.04, 0.2); tl.to('#h-row', { borderColor: '#FFC145', duration: 0.2 }, at('s04/test'));
  tl.to('#h-cnr', { opacity: 0.2, duration: 0.12, yoyo: true, repeat: 3 }, at('s04/never')); tl.to('#h-cnr', { backgroundColor: '#FFC145', duration: 0.15 }, at('s04/never') + 0.1);
  LOG('h-lg9', '✗ tests: never ran', at('s04/never'), 5);
  tl.fromTo('#h-nr', { opacity: 0, scale: 1.8, rotation: -10 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.32, ease: 'back.out(2)' }, at('s04/ran'));

  // ---------- s05 (blue): Agent = [MODEL] + HARNESS, built on the diagram ----------
  theme(S.s05 - 0.05, 'blue');
  tl.to('#h-nr', { opacity: 0, scale: 0.2, x: 280, duration: 0.35, ease: 'power3.in' }, S.s05 - 0.1);
  tl.set('#h-cnr', { opacity: 1 }, S.s05 - 0.1);
  tl.set('#h-pill', { y: 0 }, S.s05 - 0.2);
  tl.fromTo('#h-pill', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, S.s05 + 0.02);
  pop('h-legA', at('s05/legA'), { y: 20 });
  ringOn(at('s05/ring'));
  tl.set('#h-outline', { opacity: 1 }, at('s05/outline')); tl.fromTo('#h-outline', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.out' }, at('s05/outline'));
  pop('h-legH', at('s05/legH'), { y: 20 });
  LOG('h-lg10', '› harness: on', at('s05/outline'), 6);

  // ---------- s06: around · BEFORE · AFTER ----------
  { const t = at('s06/dash'); tl.set('#h-dash', { opacity: 1, x: 43, y: 603 }, t); tl.to('#h-dash', { x: 933, duration: 0.6, ease: 'none' }, t); tl.to('#h-dash', { y: 923, duration: 0.25, ease: 'none' }, t + 0.6);
    tl.to('#h-dash', { x: 43, duration: 0.6, ease: 'none' }, t + 0.85); tl.to('#h-dash', { y: 603, duration: 0.25, ease: 'none' }, t + 1.45); tl.to('#h-dash', { opacity: 0, duration: 0.15 }, t + 1.7); }
  pop('h-gslot', at('s06/lb') - 0.05, { y: 20 }); on('h-lb', at('s06/lb'));
  on('h-ain', at('s06/ain')); pulse('h-gslot', at('s06/ain'), 1.04, 0.15);
  tl.set('#h-fly1', { opacity: 1, x: 150, y: 735, scale: 1 }, at('s06/lb')); tl.to('#h-fly1', { x: 395, scale: 0.4, duration: 0.55, ease: 'power2.in' }, at('s06/lb'));
  tl.set('#h-fly1', { opacity: 0 }, at('s06/lb') + 0.56);
  pop('h-cslot', at('s06/la') - 0.05, { y: 20 }); on('h-la', at('s06/la'));
  on('h-aout', at('s06/aout')); pulse('h-cslot', at('s06/aout'), 1.04, 0.15);
  tl.set('#h-fly2', { opacity: 1, x: 470, y: 755, scale: 0.4 }, at('s06/la')); tl.to('#h-fly2', { x: 760, y: 735, scale: 1, duration: 0.55, ease: 'power2.out' }, at('s06/la'));
  tl.to('#h-fly2', { opacity: 0, duration: 0.2 }, at('s06/la') + 0.9);

  // ---------- s07 (yellow): GUIDES · a short file it reads first: AGENTS.md ----------
  theme(S.s07 - 0.05, 'yellow');
  tl.fromTo('#h-tg', { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: 'power3.out' }, S.s07 - 0.25);
  tl.to('#h-tg', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.3, ease: 'power3.in' }, Math.max(S.s07 + 1.1, at('s07/tg') + 0.65));
  pop('h-doc', at('s07/doc'), { y: 30 });
  pulse('h-doc', at('s07/adoc'), 1.12, 0.15); tl.to('#h-doc', { borderColor: '#2B3BE0', duration: 0.2 }, at('s07/adoc')); pulse('h-ain', at('s07/adoc'), 1.2, 0.15);
  on('h-fn', at('s07/fn'), 0.15); on('h-md', at('s07/md'), 0.15);
  LOG('h-lg11', '› read AGENTS.md', at('s07/md'), 7);

  // ---------- s08: a map, not a manual · one new line ----------
  pop('h-toc', at('s08/toc'), { y: 10 });
  tl.fromTo('#h-toc i', { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.2, stagger: 0.12 }, at('s08/toc'));
  { const t = at('s08/stack');   // the 1,000-page manual slides in big, is crossed out, and is thrown away
    tl.fromTo('#h-manual', { opacity: 0, x: 280, rotation: 8 }, { opacity: 1, x: 0, rotation: -3, duration: 0.4, ease: 'power3.out' }, t);
    tl.fromTo('#h-manx', { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' }, t + 0.45);
    tl.to('#h-manual', { opacity: 0, x: 320, y: -90, rotation: 14, duration: 0.4, ease: 'power3.in' }, t + 1.05); }
  { const t = at('s08/nl'); tl.set('#h-nl', { opacity: 1 }, t); typeText('h-nl1', '+ Run tests', t, t + 0.5); typeText('h-nl2', 'before "done"', t + 0.5, t + 1.0); }
  tl.to('#h-mk', { scaleX: 1, duration: 0.35, ease: 'power2.out' }, at('s08/mk'));
  LOG('h-lg12', '+ rule: run tests before done', at('s08/nl') + 0.2, 8);

  // ---------- s09 (light): nobody checks that rule · CHECKS ----------
  theme(S.s09 - 0.05, 'light');
  pulse('h-nl', at('s09/c1') - 0.1, 1.06, 0.15);
  draw('h-c1', at('s09/c1'));
  pop('h-q', at('s09/q'), { y: 20 });
  LOG('h-lg13', '? rule check: none', at('s09/c1'), 9);
  tl.fromTo('#h-tc', { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: 'power3.out' }, at('s09/tc'));
  slam('h-tct', at('s09/tct'), 0);   // panel + AFTER kicker on "Second", the CHECKS title slams on "checks"
  tl.to('#h-tc', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.3, ease: 'power3.in' }, Math.min(at('s09/tct') + 0.7, S.s10 + 0.15));

  // ---------- s10: a hook runs the test every time it says done ----------
  off(['h-q', 'h-c1'], at('s10/hook') - 0.2, 0.2);
  pop('h-hook', at('s10/hook'), { y: 30 });
  // "a command your agent tool runs on its own": the hook box comes out of its slot to be read, then goes back to work
  tl.set('#h-cslot', { zIndex: 6 }, at('s10/htxt') - 0.06);   // the zoomed hook reads above the MODEL pill
  tl.to('#h-hook', { scale: 2.1, x: -292, y: -30, transformOrigin: '50% 50%', duration: 0.4, ease: 'power3.out' }, at('s10/htxt') - 0.05);
  tl.to('#h-hook', { scale: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.inOut' }, at('s10/spin') + 0.1); tl.set('#h-cslot', { zIndex: 'auto' }, at('s10/spin') + 0.6);
  { const t = at('s10/htxt'); tl.set('#h-htxt', { opacity: 1 }, t); typeText('h-h1', 'hook ›', t, t + 0.35); typeText('h-h2', 'run tests', t + 0.35, t + 0.8); }
  LOG('h-lg14', '› hook: run tests on done', at('s10/htxt'), 10);
  pop('h-play', at('s10/play'), { y: 0 });
  tl.to('#h-play', { rotation: 360, duration: 0.6, ease: 'power2.inOut' }, at('s10/spin')); tl.to('#h-hook', { boxShadow: '0 0 0 6px #FFC145', duration: 0.25 }, at('s10/spin'));   // armed
  draw('h-c2', at('s10/c2'));
  tl.to('#h-play', { rotation: '+=720', duration: 2.4, ease: 'none' }, at('s10/spin') + 0.6);
  { const t = at('s10/gh'); tl.set('#h-gh', { opacity: 1 }, t);
    tl.fromTo('#h-gh span:nth-child(1)', { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 1 }, t);
    tl.fromTo('#h-gh span:nth-child(2)', { opacity: 0, x: 30 }, { opacity: 1, x: 30, duration: 0.15, yoyo: true, repeat: 1 }, t + 0.45);
    tl.to('#h-c2', { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 3 }, t);
    [0, 0.65].forEach(o => { tl.set('#h-rscan', { opacity: 1, x: 0 }, t + o); tl.to('#h-rscan', { x: 820, duration: 0.55, ease: 'none' }, t + o); });   // every DONE runs the test
    tl.set('#h-rscan', { opacity: 0 }, t + 1.25); }
  { const t = at('s10/fire');
    tl.to('#h-stamp', { scale: 1.18, duration: 0.12, yoyo: true, repeat: 1 }, t);
    pulse('h-hook', t + 0.1, 1.08, 0.12);
    LOG('h-lg15', '› DONE → hook runs the test', t + 0.1, 11);
    tl.set('#h-rscan', { opacity: 1, x: 0 }, t + 0.15); tl.to('#h-rscan', { x: 820, duration: 0.7, ease: 'none' }, t + 0.15); tl.set('#h-rscan', { opacity: 0 }, t + 0.9); }

  // ---------- s11: red · the error and a hint go back to the agent ----------
  { const t = at('s11/red');
    tl.to('#h-row', { backgroundColor: '#FCE3E6', borderColor: '#E5364A', duration: 0.2 }, t);
    tl.set('#h-cnr', { opacity: 0 }, t); tl.fromTo('#h-cx', { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.25 }, t);
    tl.to('#h-stamp', { opacity: 0.25, duration: 0.3 }, t + 0.1);
    LOG('h-lg16', '✗ sends reset email', t, 12); }
  { const t = at('s11/err'); tl.set('#h-err', { opacity: 1 }, t); typeText('h-errt', '  expected email sent · got none', t, t + 0.8); tl.to('#h-login', { y: -(13 - 5) * 42, duration: 0.25 }, t - 0.05); }
  { const t = at('s11/hint'); tl.set('#h-hint', { opacity: 1 }, t); typeText('h-hintt', '  hint: call sendResetEmail()', t, t + 0.8); tl.to('#h-login', { y: -(14 - 5) * 42, duration: 0.25 }, t - 0.05); }
  { const t = at('s11/back');
    tl.set('#h-loop', { opacity: 1 }, t - 0.1);
    LOG('h-lg17', '→ back to the agent', t, 15);
    tl.set('#h-edot', { opacity: 1, x: 470, y: 1330 }, t);
    tl.to('#h-edot', { x: 828, y: 1010, duration: 0.3, ease: 'power1.inOut' }, t);
    tl.to('#h-edot', { x: 723, y: 961, duration: 0.2, ease: 'none' }, t + 0.3);
    tl.to('#h-edot', { x: 383, duration: 0.35, ease: 'none' }, t + 0.5);
    tl.to('#h-edot', { y: 846, duration: 0.25, ease: 'power1.out' }, t + 0.85); }
  ringOn(at('s11/ring'));
  tl.to('#h-edot', { opacity: 0, duration: 0.15 }, at('s11/ring') + 0.05);

  // ---------- s12: fix · re-run · green ----------
  LOG('h-lg18', '› edit: + sendResetEmail()', at('s12/fix'), 16);
  LOG('h-lg19', '› running tests…', at('s12/rerun'), 17);
  { const t = at('s12/fix'); tl.to('#h-l4', { opacity: 0, duration: 0.15 }, t); tl.set('#h-l4b', { opacity: 1 }, t + 0.1); typeText('h-l4b', '  sendResetEmail(user, token)', t + 0.1, t + 0.8); }
  { const t = at('s12/rerun'); tl.to('#h-play', { rotation: 720, duration: 0.6 }, t); pulse('h-hook', t, 1.08, 0.12);
    tl.set('#h-rscan', { opacity: 1, x: 0 }, t + 0.1); tl.to('#h-rscan', { x: 820, duration: 0.6, ease: 'none' }, t + 0.1); tl.set('#h-rscan', { opacity: 0 }, t + 0.75); }
  { const t = at('s12/ok');
    tl.to('#h-row', { backgroundColor: '#DDF6EC', borderColor: '#14B87A', duration: 0.2 }, t);
    tl.set('#h-cx', { opacity: 0 }, t); tl.fromTo('#h-cok', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, t);
    LOG('h-lg20', '✓ 1 passed', t, 18);
    off(['h-loop', 'h-c2'], t + 0.4, 0.3); }

  // ---------- s13: DONE, earned ----------
  pulse('h-row', at('s13/now'), 1.03, 0.15);   // "Now the test": the row answers before the ✓ bounces
  tl.to('#h-rgo', { scaleX: 1, duration: 0.6, ease: 'power2.out' }, at('s13/now'));   // the pass sweeps the row
  tl.to('#h-cok', { scale: 1.2, duration: 0.2, ease: 'back.out(2)' }, at('s13/pass'));
  tl.fromTo('#h-stamp', { opacity: 0.25, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, at('s13/done'));
  LOG('h-lg21', '› DONE ✓ (checked)', at('s13/done'), 19);
  tl.to('#h-outline', { borderColor: '#14B87A', duration: 0.25 }, at('s13/glow')); tl.to('#h-outline', { borderColor: '#0B1020', duration: 0.3 }, at('s13/glow') + 1.0);

  // ---------- s14 (dark): same model, a different harness ----------
  theme(S.s14 - 0.2, 'dark');
  tl.to('#h-g-wb', { scale: 0.45, x: 225, y: -190, transformOrigin: '505px 780px', duration: 0.45, ease: 'power3.inOut' }, S.s14 - 0.15);
  tl.to('#h-g-wb', { opacity: 0, duration: 0.2 }, at('s14/pr') + 0.1);
  tl.to(['#h-row', '#h-log'], { opacity: 0, y: 60, duration: 0.3, ease: 'power2.in' }, S.s14 - 0.15);
  tl.set('#h-card', { transformOrigin: '0 0' }, at('s14/dock') - 0.01);
  tl.to('#h-card', { scale: 0.393, y: -80, duration: 0.5, ease: 'power3.inOut' }, at('s14/dock'));
  tl.to('#h-stamp', { x: -434, y: -204, scale: 0.393, duration: 0.5, ease: 'power3.inOut' }, at('s14/dock'));
  tl.fromTo('#h-pr', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, transformOrigin: '540px 190px', duration: 0.4, ease: 'power3.out' }, at('s14/pr'));
  pop('h-lc', at('s14/lc'), { y: 20 }); on('h-lcf', at('s14/lcf'), 0.2);
  tl.set(['#h-rL', '#h-rR'], { opacity: 1, scale: 0.9 }, at('s14/same')); tl.to(['#h-rL', '#h-rR'], { opacity: 0, scale: 1.15, duration: 0.7 }, at('s14/same'));
  slam('h-same', at('s14/same'), 0);
  tl.to(['#h-old', '#h-olds'], { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' }, at('s14/old'));
  tl.fromTo('#h-newh', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.6)' }, at('s14/newh'));
  pop('h-fd', at('s14/newh') + 0.15, { y: 10 }); pop('h-fh', at('s14/newh') + 0.3, { y: 10 });

  // ---------- s15-s16: 52.8 % → 66.5 %, their own run ----------
  tl.to('#h-lc', { opacity: 0, duration: 0.2 }, at('s15/leg') - 0.1);
  pop('h-bfl', at('s15/leg'), { y: 10 }); pop('h-afl', at('s15/leg') + 0.15, { y: 10 });
  ['h-gridL', 'h-gridR'].forEach(id => { $(id).innerHTML = '<i></i>'.repeat(89); });   // 89 tasks
  on('h-gridL', at('s15/leg') + 0.2, 0.25); on('h-gridR', at('s15/leg') + 0.3, 0.25);
  tl.fromTo('#h-rL', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, at('s15/used'));
  count('h-n1', 30, 52.8, at('s15/n1'), Math.max(0.5, at('s15/n1l') - at('s15/n1')), v => v.toFixed(1) + '%');   // lands on "percent"
  tl.to('#h-n1', { scale: 1.08, duration: 0.2, ease: 'back.out(2)' }, at('s15/n1l'));
  { const d = Math.max(0.5, at('s15/n1l') - at('s15/n1')); tl.to('#h-gridL i:nth-child(-n+47)', { backgroundColor: '#FFFFFF', duration: 0.05, stagger: d / 47 }, at('s15/n1')); }
  pop('h-ts', at('s15/ts'), { y: 10 });
  tl.to('#h-rL', { opacity: 0, duration: 0.25 }, at('s16/n2') - 0.1); tl.fromTo('#h-rR', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, at('s16/n2') - 0.1);
  count('h-n2', 52.8, 66.5, at('s16/n2'), Math.max(0.5, at('s16/n2l') - at('s16/n2')), v => v.toFixed(1) + '%');   // lands on "five"
  tl.to('#h-n2', { scale: 1.08, duration: 0.2, ease: 'back.out(2)' }, at('s16/n2l'));
  { const d = Math.max(0.5, at('s16/n2l') - at('s16/n2')); tl.to('#h-gridR i:nth-child(-n+59)', { backgroundColor: '#FFC145', duration: 0.05, stagger: d / 59 }, at('s16/n2')); }
  tl.fromTo('#h-own', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, at('s16/own'));

  // ---------- s17 (blue): the habit · the new harness grows back ----------
  theme(S.s17 - 0.31, 'blue');
  const tWb = S.s17 + 0.15;   // the grow is a scene-entry action (no plan cue), keyed to the scene start
  tl.to('#h-g-pr', { opacity: 0, y: -60, duration: 0.15, ease: 'power2.in' }, S.s17 - 0.45);
  tl.set(['#h-err', '#h-hint', '#h-loop', '#h-c1', '#h-c2', '#h-q', '#h-gh', '#h-edot', '#h-ring'], { opacity: 0 }, S.s17 - 0.31);
  tl.set('#h-g-wb', { scale: 0.45, x: 225, y: -190, transformOrigin: '505px 780px' }, S.s17 - 0.31);
  tl.to('#h-g-wb', { opacity: 1, duration: 0.25 }, S.s17 - 0.3);
  tl.to('#h-g-wb', { scale: 0.75, x: 0, y: 0, duration: 0.55, ease: 'power3.inOut' }, tWb);
  tl.to('#h-card', { scale: 0.6, x: 198, y: -70, duration: 0.55, ease: 'power3.inOut' }, tWb);
  tl.to('#h-stamp', { x: -88, y: -152, scale: 0.6, duration: 0.55, ease: 'power3.inOut' }, tWb);
  tl.fromTo('#h-row', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, tWb + 0.2);
  tl.to('#h-log', { opacity: 1, y: 0, duration: 0.4 }, tWb + 0.3);
  tl.fromTo('#h-mc', { opacity: 0, y: -220 }, { opacity: 1, y: 0, duration: 0.4, ease: 'bounce.out' }, at('s17/mc'));
  { const t = at('s17/nr'); tl.to('#h-mc', { x: -150, scale: 0.6, opacity: 0.5, duration: 0.3 }, t); tl.to('#h-nl', { opacity: 0, duration: 0.15 }, t);
    tl.fromTo('#h-nr2', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3 }, t + 0.1);
    LOG('h-lg22', '+ rule: use npm test', t, 20); }
  { const t = at('s17/nc'); tl.to('#h-mc', { x: 150, opacity: 0, duration: 0.3 }, t);
    tl.fromTo('#h-nc2', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3 }, t + 0.1);
    LOG('h-lg23', '+ check: npm test', t, 21); }
  tl.to('#h-outline', { borderWidth: 14, duration: 0.3, ease: 'back.out(2)' }, at('s17/thick'));

  // ---------- s18: the catch: green = your checks passed ----------
  { const t = at('s18/crow');
    tl.to('#h-g-wb', { opacity: 0, duration: 0.3 }, t);
    tl.to(['#h-card', '#h-stamp', '#h-log'], { opacity: 0, duration: 0.3 }, t);
    tl.to('#h-row', { y: -260, scale: 0.85, duration: 0.5, ease: 'power3.inOut' }, t); }
  { const t = at('s18/eq'); tl.set('#h-eq', { opacity: 1 }, t); typeText('h-eqt', '= your checks passed', t, t + 0.7); }
  tl.to('#h-eq', { opacity: 0, y: -30, duration: 0.2 }, at('s18/verd') - 0.05);
  tl.fromTo('#h-verd', { opacity: 0, y: 40, scale: 1.25 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'back.out(2)' }, at('s18/verd'));
  tl.fromTo('#h-pen', { opacity: 0, x: -60, y: -40 }, { opacity: 1, x: 20, y: 90, duration: 0.4, ease: 'power3.out' }, at('s18/pen'));
  tl.to('#h-mk2', { scaleX: 1, duration: 0.4, ease: 'power2.out' }, at('s18/mk'));
  tl.to('#h-ul', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, at('s18/ul'));
  tl.to('#h-pen', { x: 400, duration: 0.5, ease: 'power2.out' }, at('s18/ul'));

  // ---------- s19 (yellow): recap chain ----------
  pop('h-mini', S.s19 + 0.02, { y: 20, d: 0.3 }); on('h-ra1', S.s19 + 0.1, 0.2);
  pop('h-r1', S.s19 - 0.05, { y: 40, d: 0.3 });
  pop('h-r2', at('s19/r2'), { y: 40 });
  tl.to('#h-mini', { y: 270, duration: 0.4, ease: 'power3.inOut' }, at('s19/r2') + 0.1);
  on('h-ra2', at('s19/r3m') - 0.2, 0.2);
  tl.fromTo('#h-r3m', { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.4, ease: 'bounce.out' }, at('s19/r3m'));
  tl.to('#h-r3m', { opacity: 0, scale: 0.5, duration: 0.2 }, at('s19/r3') - 0.05);
  pop('h-r3', at('s19/r3'), { y: 40 });
  tl.to('#h-mini', { y: 540, duration: 0.4, ease: 'power3.inOut' }, at('s19/r3') + 0.1);

  // ---------- s20 (dark): CTA, the mini DONE card loops back to frame 0 ----------
  ctaWords('s20', [['h-q1', 'What'], ['h-qa', 'should'], ['h-qb', 'I'], ['h-qc', 'explain'], ['h-q2', 'next']]);
  pop('h-fol', at('s20/fol'), { y: 30 });
  pop('h-mini2', S.s20 + 0.1, { y: 20 });
})();
