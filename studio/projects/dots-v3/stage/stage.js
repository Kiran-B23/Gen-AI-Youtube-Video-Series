// Dots reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json, read with at(scene/target).
// Running object: the dot window (#d-win, native box x 40-1040 y 240-1120) + the dot's computer pane (#d-pane) + a cursor.
(function () {
  const pulse = (id, t, s = 1.06, d = 0.15) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const slide = (id, t, o = {}) => tl.fromTo('#' + id, { opacity: 0, x: o.x ?? 0, y: o.y ?? 30 }, { opacity: 1, x: 0, y: 0, duration: o.d ?? 0.4, ease: 'power3.out' }, t);
  const win = (t, X, Y, s, d = 0.6) => tl.to('#d-win', { x: X - 40, y: Y - 240, scale: s, transformOrigin: '0 0', duration: d, ease: 'power3.inOut' }, t);
  const cur = (x, y, t, d = 0.45) => tl.to('#d-cur', { x: x - 14, y, duration: d, ease: 'power2.inOut' }, t);
  const click = (t) => { tl.to('#d-cur', { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1 }, t); };
  const title = (id, t0, t1) => {   // section title: lands under the wipe, shrinks to a 32 px kicker at y 150, leaves at the next wipe
    tl.fromTo('#' + id, { opacity: 0, y: 40, scale: 1 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, t0 - 0.3);
    tl.to('#' + id, { scale: 0.34, x: 80, y: -100, duration: 0.35, ease: 'power3.inOut' }, t0 + 0.45);   // kicker at x 152: ≥ 40 px from the edge under every push (1.28 about x 540)
    tl.to('#' + id, { opacity: 0, duration: 0.2 }, t1 - 0.3);
  };
  const chip = (n, t) => tl.set(['#d-ct1', '#d-ct2', '#d-ct3'], { display: i => (i + 1 === n ? 'inline' : 'none') }, t);
  const pad2 = n => String(n).padStart(2, '0');
  $('d-time').innerHTML = '<span id="d-hh">3</span><span id="d-colon">:</span><span id="d-mm">00</span>';
  const DOCK = { x: 150, y: 540, s: 0.78 };   // s03 and s18-s19: the window shrinks under the giant type
  const L = (lx, ly) => [lx + 40, ly + 240];                              // window-local -> stage, window at full
  const Ld = (lx, ly, Y) => [150 + 0.78 * lx, Y + 0.78 * ly];            // docked at scale 0.78

  // ---------- the running object lives through the whole reel ----------
  group('d-g-win', 0, S.s20 + 0.6);
  tl.set('#d-win', { x: 0, y: 160, scale: 1, transformOrigin: '0 0', opacity: 1 }, 0);
  tl.set(['#d-dotend', '#d-cur'], { opacity: 0 }, 0);   // hook: the window sits under the giant clock
  tl.set('#d-goal', { opacity: 1, y: 0 }, 0);   // pinned: the s18 fromTo must not pre-render its offset into the hook
  tl.set('#d-illus', { opacity: 0 }, 0);

  // ---------- s01 hook (dark): 3:00 AM, the bug lands ----------
  { const n = Math.ceil(S.s03 / 0.5);
    tl.fromTo('#d-colon', { opacity: 1 }, { opacity: 0.12, duration: 0.5, yoyo: true, repeat: n, ease: 'steps(1)' }, 0); }
  pulse('d-clock', at('s01/clock'), 1.05, 0.25);
  tl.fromTo('#d-slack', { opacity: 0, x: 900 }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' }, at('s01/slack'));
  slam('d-illus', at('s01/illus'), -2);

  // ---------- s02 hook: morning rolls in, the fix is waiting ----------
  { const t = at('s02/roll'), o = { v: 180 };
    tl.to(o, { v: 420, duration: 1.2, ease: 'power2.inOut', onUpdate: () => { const m = Math.round(o.v); $('d-hh').textContent = Math.floor(m / 60); $('d-mm').textContent = pad2(m % 60); } }, t);
    tl.to('#d-clock', { color: '#FFFFFF', duration: 1.2 }, t);
    chip(2, t); tl.set('#d-spin', { display: 'inline-block' }, t);
    tl.fromTo('#d-spin', { rotation: 0 }, { rotation: 360 * 3, duration: 1.5, ease: 'none' }, t);
    chip(3, t + 1.5); tl.set('#d-spin', { display: 'none' }, t + 1.5); }
  slam('d-sped', at('s02/sped'), -3);
  tl.to('#d-clock', { opacity: 0, duration: 0.2 }, at('s02/link'));   // the push on "review" would carry the giant clock off the left edge
  slide('d-rev1', at('s02/bubble'), { y: 40 });
  tl.to('#d-ul1', { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at('s02/link') + 0.1);
  tl.to('#d-link1', { color: '#0B1020', duration: 0.3 }, at('s02/link') + 0.1);

  // ---------- s03 what it is (blue): the window docks under "A DOT" ----------
  camHome(S.s03 - 0.42, 0.38);
  tl.to(['#d-clock', '#d-sped'], { opacity: 0, duration: 0.2 }, S.s03 - 0.35);
  win(S.s03 - 0.3, DOCK.x, DOCK.y, DOCK.s, 0.55);
  group('d-g-what', S.s03 - 0.3, S.s05);
  title('d-t3', S.s03, S.s05);
  slam('d-adot', at('s03/adot'), -3);
  pop('d-chip3', at('s03/chip'), { y: 30 });
  tl.to('#d-av', { boxShadow: '0 0 0 14px rgba(43,59,224,0.35)', duration: 0.25 }, at('s03/avatar'));
  pulse('d-av', at('s03/avatar'), 1.18, 0.2);

  // ---------- s04: the goal is typed; the dot keeps working while the chat dims ----------
  tl.to(['#d-adot', '#d-chip3'], { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' }, S.s04 - 0.1);
  win(S.s04 - 0.05, 40, 240, 1, 0.5);
  tl.to(['#d-goal', '#d-slack', '#d-rev1'], { opacity: 0, duration: 0.25 }, S.s04 - 0.05);   // a fresh chat: how it starts
  chip(1, S.s04);
  tl.set('#d-clockchip', { opacity: 1 }, S.s04);
  tl.set('#d-ph', { display: 'none' }, at('s04/typed'));
  typeText('d-typed', 'keep the checkout bug-free', at('s04/typed'), at('s04/typed') + 0.8);
  pulse('d-send', at('s04/sent') - 0.1, 0.8, 0.1);
  tl.set('#d-ph', { display: 'inline' }, at('s04/sent')); typeText('d-typed', '', at('s04/sent'), at('s04/sent') + 0.01);
  slide('d-goal2', at('s04/sent'), { y: 40 });
  chip(2, at('s04/working')); tl.set('#d-spin', { display: 'inline-block' }, at('s04/working'));
  tl.fromTo('#d-spin', { rotation: 0 }, { rotation: 360 * 8, duration: 8, ease: 'none' }, at('s04/working'));
  tl.to('#d-pfill', { scaleX: 0.3, duration: 1.2, ease: 'none' }, at('s04/working'));
  tl.to('#d-pfill', { scaleX: 0.55, duration: Math.max(0.5, S.s05 - at('s04/dim')), ease: 'none' }, at('s04/dim'));
  tl.to('#d-dim', { opacity: 1, duration: 0.35 }, at('s04/dim'));

  // ---------- s05-s09 how it works (light): the dot's computer under the chat ----------
  group('d-g-how', S.s05 - 0.3, S.s10);
  title('d-t5', S.s05, S.s10);
  tl.set('#d-illus', { backgroundColor: 'rgba(11,16,32,0.1)', color: '#0B1020' }, S.s05 - 0.2);
  tl.to('#d-dim', { opacity: 0, duration: 0.3 }, S.s05);   // the chat re-lights
  tl.set('#d-pfill2', { scaleX: 0.55 }, 0);
  tl.fromTo('#d-pane', { opacity: 0, y: 520 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, at('s05/pane'));
  tl.to('#d-pfill2', { scaleX: 0.9, duration: Math.max(1, at('s08/bar') - at('s05/pane') - 0.2), ease: 'none' }, at('s05/pane'));
  typeText('d-urltxt', 'localhost:4920/checkout', at('s05/url'), at('s05/url') + 0.8);
  pop('d-form', at('s05/form'), { y: 30 });
  // s06: it investigates, writes the fix, tests it
  slide('d-inv', at('s06/invest'), { y: 40 });
  tl.to(['#d-td1', '#d-td2', '#d-td3'], { y: -8, duration: 0.22, yoyo: true, repeat: 30, stagger: 0.1, ease: 'sine.inOut' }, at('s06/invest') + 0.3);
  slam('d-example', at('s06/example'), -2);
  tl.to('#d-code', { opacity: 1, duration: 0.2 }, at('s06/code') - 0.05);
  typeText('d-c1', '  validate(card)', at('s06/code'), at('s06/code') + 0.35);
  typeText('d-c2', '- submit(order)', at('s06/code') + 0.35, at('s06/code') + 0.7);
  typeText('d-c3', '+ submit(order, fix)', at('s06/code') + 0.7, at('s06/code') + 1.1);
  typeText('d-termtxt', '$ npm test', at('s06/passed') - 0.4, at('s06/passed'));
  tl.set('#d-scan', { opacity: 1, x: 0 }, at('s06/passed') - 0.1);
  tl.to('#d-scan', { x: 1000, duration: 0.5, ease: 'none' }, at('s06/passed') - 0.1);
  tl.set('#d-scan', { opacity: 0 }, at('s06/passed') + 0.4);
  count('d-passed', 0, 12, at('s06/passed') + 0.05, 0.6, v => Math.round(v) + ' passed');
  pop('d-sped2', at('s06/passed') + 0.6, { y: 20 });
  // s07: open the computer, watch it work
  tl.set('#d-label', { opacity: 1 }, at('s07/label'));
  typeText('d-label', "Dot's computer", at('s07/label'), at('s07/label') + 0.7);
  { const [fx, fy] = [330, 1040];
    tl.set('#d-cur', { opacity: 1, x: 560 - 14, y: 1180 }, at('s07/field') - 0.5);
    cur(fx, fy, at('s07/field') - 0.45); click(at('s07/field'));
    tl.set('#d-f1', { attr: { class: 'd-fbox lit' } }, at('s07/field'));
    typeText('d-f1t', '4242 1881', at('s07/field') + 0.05, at('s07/field') + 0.6);
    tl.to('#d-pay', { backgroundColor: '#14B87A', duration: 0.25 }, at('s07/field') + 0.7); }
  // s08: done, the results come back for review
  chip(3, at('s08/bar')); tl.set('#d-spin', { display: 'none' }, at('s08/bar'));
  tl.to('#d-pfill2', { scaleX: 1, backgroundColor: '#14B87A', duration: 0.4, ease: 'power2.out' }, at('s08/bar'));
  slide('d-rev2', at('s08/result'), { y: 40 });
  { const [lx, ly] = L(130, 540);
    cur(lx + 120, ly, at('s08/click') - 0.3); click(at('s08/click') + 0.15);
    tl.to('#d-ul2', { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at('s08/click'));
    tl.set('#d-link2', { attr: { class: 'd-link lit' } }, at('s08/click') + 0.2); }
  // s09: a schedule: the pane slides away, the profile sheet opens on "Scheduled"
  // the pane leaves as the camera pushes in on "review" (under that zoom its terminal fell into the caption band, s08 @ 42.8)
  tl.to('#d-pane', { y: 520, opacity: 0, duration: 0.3, ease: 'power3.in' }, at('s08/click') - 0.2);
  tl.to('#d-cur', { opacity: 0, duration: 0.2 }, at('s09/sheet') - 0.35);
  tl.to('#d-sped2', { opacity: 0, duration: 0.2 }, at('s08/click') + 0.05);
  tl.to('#d-passed', { x: 510, y: -1102, scale: 0.78, duration: 0.5, ease: 'power3.inOut' }, at('s08/click') + 0.05);   // "12 passed" stays, as a chip on the bar
  tl.fromTo('#d-profile', { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at('s09/sheet'));
  slide('d-pr1', at('s09/sheet') + 0.3, { y: 20, d: 0.3 }); slide('d-pr2', at('s09/sheet') + 0.45, { y: 20, d: 0.3 });
  tl.to('#d-tabline', { x: 210, duration: 0.35, ease: 'power3.inOut' }, at('s09/sheet') + 0.8);
  tl.to(['#d-pr1', '#d-pr2'], { opacity: 0, duration: 0.2 }, at('s09/sheet') + 0.9);
  tl.set(['#d-goal2', '#d-inv', '#d-rev2'], { opacity: 0 }, at('s09/sheet') + 0.6);   // under the sheet from here on: nothing ghosts through the flips
  pop('d-calrow', at('s09/calrow'), { y: 20 });
  typeText('d-caltxt', 'Calendar check · every morning', at('s09/calrow') + 0.05, at('s09/calrow') + 0.9);
  pulse('d-calclock', at('s09/toggle'), 1.15, 0.15);
  tl.to('#d-caltoggle', { backgroundColor: '#2B3BE0', duration: 0.2 }, at('s09/toggle'));
  tl.to('#d-caltoggle b', { x: 28, duration: 0.2, ease: 'power2.out' }, at('s09/toggle'));

  // ---------- s10-s15 you set the rules (yellow) ----------
  camHome(S.s10 - 0.42, 0.38);
  group('d-g-rules', S.s10 - 0.3, S.s16);
  title('d-t10', S.s10, S.s16);
  tl.to('#d-passed', { opacity: 0, duration: 0.2 }, S.s10 - 0.3);
  tl.to('#d-profile', { opacity: 0, scale: 0.96, duration: 0.2 }, at('s10/rules') - 0.05);
  pop('d-rules', at('s10/rules'), { y: 30, s: 0.96 });
  { const [ax, ay] = L(190, 290);
    tl.set('#d-cur', { opacity: 1, x: 700, y: 900 }, at('s10/rule') - 0.5);
    cur(ax, ay, at('s10/rule') - 0.45); click(at('s10/rule'));
    tl.to('#d-addrule', { color: '#0B1020', duration: 0.2 }, at('s10/rule'));
    pop('d-rulefield', at('s10/rule'), { y: 16, s: 0.97, d: 0.3 });
    typeText('d-ruletxt', 'Merging a fix to main', at('s10/rule') + 0.1, at('s10/rule') + 1.0); }
  tl.set('#d-slots', { opacity: 1 }, at('s10/slots'));
  ['#d-slots .d-slot'].forEach(sel => tl.fromTo(sel, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: 'power3.out' }, at('s10/slots')));
  // s11-s14: one level per beat, each label on its own word (2026-10-27, option b)
  pop('d-lv1', at('s11/lv1'), { y: 16 }); pop('d-lv2', at('s12/lv2'), { y: 16 }); pop('d-lv3', at('s13/lv3'), { y: 16 }); pop('d-lv4', at('s14/lv4'), { y: 16 });
  pop('d-lv2sub', at('s12/lv2sub'), { y: 10, s: 1, d: 0.35, ease: 'power3.out' });
  pop('d-wait', at('s13/wait'), { y: 10, s: 1, d: 0.35, ease: 'power3.out' });
  tl.to('#d-wait .d-wd', { y: -6, duration: 0.2, yoyo: true, repeat: Math.max(1, Math.floor((S.s14 - at('s13/wait')) / 0.4)), stagger: 0.12, ease: 'sine.inOut' }, at('s13/wait') + 0.3);
  slam('d-youdo', at('s14/youdo'), -2);
  tl.to('#d-cur', { opacity: 0, duration: 0.2 }, at('s11/slots4'));
  // s15: the floor: a password always stays with you
  { const [cx, cy] = L(620, 480);
    tl.set('#d-cur', { opacity: 1, x: cx, y: cy - 60 }, at('s15/drift') - 0.05);
    cur(cx, cy + 180, at('s15/drift'), 0.9); }
  pop('d-pw', at('s15/pw'), { y: 30 });
  slam('d-alwaysyou', at('s15/alwaysyou'), -2);
  { const [rx, ry] = L(130, 1050 - 240);
    cur(rx, ry, at('s15/locked') - 0.35); click(at('s15/locked'));
    tl.to('#d-pw', { x: 12, duration: 0.06, yoyo: true, repeat: 5, ease: 'sine.inOut' }, at('s15/locked'));
    tl.to('#d-pwradio', { borderColor: '#E5364A', duration: 0.2 }, at('s15/locked')); }

  // ---------- s16-s17 the catch (dark) ----------
  camHome(S.s16 - 0.42, 0.38);
  group('d-g-catch', S.s16 - 0.3, S.s18);
  title('d-t13', S.s16, S.s18);
  tl.set('#d-illus', { backgroundColor: 'rgba(255,255,255,0.16)', color: '#fff' }, S.s16 - 0.2);
  tl.to('#d-cur', { opacity: 0, duration: 0.2 }, S.s16 - 0.3);
  tl.to('#d-rules', { opacity: 0, scale: 0.96, duration: 0.2 }, at('s16/plugins') - 0.05);
  pop('d-plugins', at('s16/plugins'), { y: 30, s: 0.96 });
  { const [tx, ty] = L(455, 335);
    tl.set('#d-cur', { opacity: 1, x: tx + 200, y: ty + 200 }, at('s16/off') - 0.5);
    cur(tx, ty, at('s16/off') - 0.45); click(at('s16/off'));
    tl.to('#d-tg1', { backgroundColor: '#C9CBD3', duration: 0.2 }, at('s16/off'));
    tl.to('#d-tg1 b', { x: -28, duration: 0.2, ease: 'power2.out' }, at('s16/off'));
    tl.to('#d-prow1', { color: '#9A9DAA', backgroundColor: '#FBFBFC', duration: 0.3 }, at('s16/off') + 0.1);
    tl.to(['#d-l1', '#d-l2'], { opacity: 0, duration: 0.2 }, at('s16/off') + 0.2); }
  tl.set('#d-note1', { attr: { class: 'd-note lit' } }, at('s16/notes')); pulse('d-note1', at('s16/notes'), 1.08, 0.15);
  tl.set('#d-note2', { attr: { class: 'd-note lit' } }, at('s16/notes') + 0.3); pulse('d-note2', at('s16/notes') + 0.3, 1.08, 0.15);
  pulse('d-note1', at('s16/stays'), 1.06, 0.15); pulse('d-note2', at('s16/stays') + 0.1, 1.06, 0.15);
  slam('d-stays', at('s16/stays'), -2);
  // s17: the only wipe is the whole dot
  { const [mx, my] = L(880, 30);
    cur(mx, my, at('s17/menu') - 0.45); click(at('s17/menu'));
    pop('d-menu', at('s17/menu'), { y: -16, d: 0.25 });
    const [rx, ry] = L(670, 150);
    cur(rx, ry, at('s17/menu') + 0.35); click(at('s17/menu') + 0.75);
    tl.set('#d-menureset', { attr: { class: 'hot' } }, at('s17/menu') + 0.75); }
  tl.to('#d-menu', { opacity: 0, duration: 0.15 }, at('s17/dialog') - 0.05);
  pop('d-dialog', at('s17/dialog'), { y: 40, s: 0.94 });
  tl.set('#d-lit1', { attr: { class: 'd-lit on' } }, at('s17/lit1')); pulse('d-lit1', at('s17/lit1'), 1.08, 0.15);
  tl.set('#d-lit2', { attr: { class: 'd-lit on' } }, at('s17/lit2')); pulse('d-lit2', at('s17/lit2'), 1.08, 0.15);
  tl.set('#d-lit3', { attr: { class: 'd-lit on' } }, at('s17/lit3')); pulse('d-lit3', at('s17/lit3'), 1.08, 0.15);
  { const [bx, by] = L(790, 600);
    cur(bx, by, at('s17/gone') - 0.5); click(at('s17/gone') - 0.05);
    tl.to('#d-cur', { opacity: 0, duration: 0.15 }, at('s17/gone'));
    tl.to('#d-win', { scale: 0.05, x: 475, y: 95, duration: 0.6, ease: 'power3.in' }, at('s17/gone'));
    tl.to('#d-win', { opacity: 0, duration: 0.15 }, at('s17/gone') + 0.6);
    tl.fromTo('#d-dotend', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.2, duration: 0.6, ease: 'power2.in' }, at('s17/gone') + 0.6); }

  // ---------- s18-s19 my take (blue): a fresh dot, the rule set to "Ask before taking action" ----------
  camHome(S.s18 - 0.42, 0.38);
  group('d-g-take', S.s18 - 0.3, S.s20);
  title('d-t15', S.s18, S.s20);
  tl.set(['#d-plugins', '#d-dialog', '#d-menu', '#d-stays'], { opacity: 0 }, S.s18 - 0.4);
  chip(1, S.s18 - 0.4);
  tl.set('#d-win', { x: DOCK.x - 40, y: 520 - 240, scale: DOCK.s, transformOrigin: '0 0', opacity: 0 }, S.s18 - 0.4);
  tl.fromTo('#d-win', { opacity: 0, y: 520 - 240 + 60 }, { opacity: 1, y: 520 - 240, duration: 0.45, ease: 'power3.out' }, S.s18 - 0.05);
  tl.fromTo('#d-goal', { opacity: 0, y: 64 }, { opacity: 1, y: 34, duration: 0.35, ease: 'power3.out' }, S.s18 + 0.35);
  pulse('d-chip', S.s18 + 0.7, 1.1, 0.15);
  slide('d-rev3', at('s18/diff') - 0.25, { y: 40 });
  slide('d-diff', at('s18/diff'), { y: 30 });
  tl.fromTo('#d-dred', { backgroundColor: 'rgba(229,54,74,0)' }, { backgroundColor: 'rgba(229,54,74,0.35)', duration: 0.15, yoyo: true, repeat: 3 }, at('s18/diff') + 0.3);
  pop('d-kick', at('s18/kicker'), { y: 20 });
  { const [lx, ly] = Ld(130, 395, 520);
    tl.set('#d-cur', { opacity: 1, x: lx + 300, y: ly + 200 }, at('s18/ring') - 0.5);
    cur(lx + 110, ly, at('s18/ring') - 0.45); click(at('s18/ring'));
    tl.to('#d-ul3', { scaleX: 1, duration: 0.25, ease: 'power3.out' }, at('s18/ring'));
    pop('d-ring', at('s18/ring') + 0.1, { y: 0, s: 1.3, d: 0.3 }); }
  // s19
  pulse('d-kick', at('s19/pulse'), 1.08, 0.18);
  tl.to(['#d-rev3', '#d-diff', '#d-cur'], { opacity: 0, duration: 0.2 }, at('s19/chosen') - 0.3);
  tl.to('#d-kick', { opacity: 0, duration: 0.2 }, at('s19/chosen') - 0.25);
  pop('d-rulebox', at('s19/chosen') - 0.2, { y: 20, s: 0.96 });
  { const [rx, ry] = Ld(115, 455, 520);
    tl.set('#d-cur', { opacity: 1, x: rx + 250, y: ry + 160 }, at('s19/chosen') - 0.15);
    cur(rx, ry, at('s19/chosen') - 0.1, 0.3); click(at('s19/chosen') + 0.2); }
  pop('d-rdot', at('s19/chosen') + 0.2, { y: 0, s: 0.3, d: 0.25 });
  tl.fromTo('#d-rhl', { opacity: 0 }, { opacity: 1, duration: 0.2 }, at('s19/chosen') + 0.2);
  slam('d-askfirst', at('s19/askfirst'), -3);
  tl.to('#d-cur', { opacity: 0, duration: 0.2 }, at('s19/askfirst'));
  tl.to(['#d-rdot', '#d-rhl'], { y: -72, duration: 0.35, ease: 'power3.inOut' }, at('s19/loosen'));
  pulse('d-rulebox', at('s19/earned'), 1.03, 0.2);
  pop('d-earned', at('s19/earned'), { y: 10 });

  // ---------- s20-s21 CTA (dark): the window shrinks away upward ----------
  camHome(S.s20 - 0.42, 0.38);
  tl.to('#d-win', { y: -1300, scale: 0.5, opacity: 0, duration: 0.5, ease: 'power3.in' }, S.s20 - 0.1);
  tl.to(['#d-askfirst', '#d-rulebox'], { opacity: 0, duration: 0.2 }, S.s20 - 0.3);
  group('d-g-cta', S.s20, END('s21'));
  { const w = (x) => W('s20', x) ?? at('s20/question');
    [['d-q1', w('what')], ['d-q2', w('should')], ['d-q3', w('i')], ['d-q4', at('s20/question')], ['d-q5', at('s20/question') + 0.25]]
      .forEach(([id, t]) => pop(id, t - 0.05, { y: 40, ease: 'power4.out', d: 0.3 })); }
  pop('d-ctaf', at('s21/follow'), { y: 30 });
})();

// ---------- life: the running object never rests (references/ig-reels.md: a camera that never rests, state changes on the
// running object, numbers that stay). Everything here acts on the window / pane / cursor; captions are never touched. ----------
(function () {
  const blink = (id, t0, t1) => {   // a text caret: on at t0, blinks every 0.5 s, gone at t1
    if (t1 <= t0) return;
    tl.set('#' + id, { opacity: 1 }, t0);
    tl.fromTo('#' + id, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'steps(1)', yoyo: true, repeat: Math.max(0, Math.floor((t1 - t0) / 0.5) - 1), immediateRender: false }, t0);
    tl.set('#' + id, { opacity: 0 }, t1);
  };
  const halo = (t0, t1) => {   // the avatar's status ring pulses while the chip says "Working…"
    const n = Math.max(1, Math.floor((t1 - t0) / 1.0));
    tl.fromTo('#d-halo', { opacity: 0.85, scale: 1 }, { opacity: 0, scale: 2.6, duration: 1.0, ease: 'power1.out', repeat: n - 1, immediateRender: false }, t0);
    tl.set('#d-halo', { opacity: 0, scale: 1 }, t0 + n * 1.0);
  };
  const cur = (x, y, t, d = 0.45) => tl.to('#d-cur', { x: x - 14, y, duration: d, ease: 'power2.inOut' }, t);
  const pulse = (id, t, s = 1.06, d = 0.15) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const chip = (n, t) => tl.set(['#d-ct1', '#d-ct2', '#d-ct3'], { display: i => (i + 1 === n ? 'inline' : 'none') }, t);

  // s01-s02: the dot picks the bug up the moment it lands (always on): Working… + spinner + status ring until the roll ends
  { const t0 = at('s01/slack') + 0.35, t1 = at('s02/roll');
    chip(2, t0); tl.set('#d-spin', { display: 'inline-block' }, t0);
    tl.fromTo('#d-spin', { rotation: 0 }, { rotation: 360 * Math.round((t1 - t0) / 0.6), duration: t1 - t0, ease: 'none', immediateRender: false }, t0);
    halo(t0, at('s02/roll') + 1.5); }
  halo(S.s03 + 0.3, at('s03/avatar') - 0.1);   // s03 "always on": the ring keeps pulsing on the docked window
  // s04: the composer caret follows the typing, comes back after send; the ring pulses while the dot works (s04 -> s08 "done")
  { const ty = at('s04/typed'), sent = at('s04/sent');
    tl.set('#d-ccaret', { x: 0 }, S.s04);
    blink('d-ccaret', S.s04 + 0.1, at('s04/dim'));
    const o = { v: 0 };
    tl.fromTo(o, { v: 0 }, { v: 1, duration: Math.max(0.2, sent - ty), ease: 'none', onUpdate: () => { const el = $('d-typed'); gsap.set('#d-ccaret', { x: el && el.textContent ? el.offsetWidth + 2 : 0 }); } }, ty);
    tl.set('#d-ccaret', { x: 0 }, sent + 0.02);
    halo(at('s04/working'), at('s08/bar'));
    const t2 = at('s04/working') + 8;   // the spinner keeps turning until "done"
    if (at('s08/bar') > t2) tl.fromTo('#d-spin', { rotation: 2880 }, { rotation: 2880 + 360 * Math.round((at('s08/bar') - t2) / 0.6), duration: at('s08/bar') - t2, ease: 'none', immediateRender: false }, t2); }

  // s05-s06: the pane's terminal logs what the dot is doing, line by line, until the tests run
  { const lines = ['› open localhost:4920/checkout', '› load the checkout page', '› fill card · expiry · name', '› tap Pay on iOS Safari',
      '<span class="d-lred">✗ Pay fails · submit(order)</span>', '› read checkout.ts', '› trace submit(order)', '› write the fix',
      '› submit(order, fix)', '› run the tests'];
    $('d-log').innerHTML = lines.join('\n');
    const t0 = at('s05/pane') + 0.3, t1 = at('s06/passed') - 0.5;
    tl.set('#d-log', { opacity: 1 }, t0);
    tl.set('#d-log', { y: 64 }, 0);
    tl.fromTo('#d-log', { y: 64 }, { y: 112 - lines.length * 40 - 8, duration: t1 - t0, ease: 'none', immediateRender: false }, t0);
    tl.to('#d-log', { opacity: 0, duration: 0.12 }, t1); }

  // s07: the dot's cursor works the page (code -> expiry -> the card field), types, taps Pay
  { const t = at('s07/label');
    tl.set('#d-cur', { opacity: 1, x: 760 - 14, y: 1250 }, t + 0.15);
    cur(700, 1010, t + 0.2, 0.7); cur(420, 1100, t + 1.0, 0.6); cur(560, 1180, at('s07/field') - 1.1, 0.55);
    blink('d-fcaret', at('s07/field'), at('s07/field') + 0.7);
    cur(180, 1232, at('s07/field') + 0.62, 0.3);
    tl.to('#d-cur', { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1 }, at('s07/field') + 0.7); }
  // s08: the number that landed stays, and pulses when the results come back
  pulse('d-passed', at('s08/result'), 1.12, 0.18);
  // s09 / s10: carets in the fields being typed
  blink('d-calcaret', at('s09/calrow') + 0.05, at('s09/toggle'));
  blink('d-rcaret', at('s10/rule') + 0.1, S.s16 - 0.3);
  // s11: a highlight walks the four levels with the voice
  { const T = [at('s11/hl1'), at('s12/hl2'), at('s13/hl3'), at('s14/hl4')];
    tl.fromTo('#d-shl', { opacity: 0, y: 0 }, { opacity: 1, duration: 0.2 }, T[0] - 0.25);
    for (let k = 1; k < 4; k++) { const d = Math.min(0.6, T[k] - T[k - 1] - 0.1); tl.fromTo('#d-shl', { y: 90 * (k - 1) }, { y: 90 * k, duration: d, ease: 'power2.inOut', immediateRender: false }, T[k] - d); }
    tl.to('#d-shl', { opacity: 0, duration: 0.25 }, at('s15/drift')); }
  // s16: what the Slack app fed the dot flows along the lines until it is switched off
  tl.fromTo(['#d-l1', '#d-l2'], { strokeDashoffset: 0 }, { strokeDashoffset: -24 * Math.round((at('s16/off') - at('s16/plugins')) / 0.25), duration: at('s16/off') + 0.2 - at('s16/plugins'), ease: 'none' }, at('s16/plugins'));

  // ---------- the rig: a slow camera drift toward the next action between the planned moves (≤ 1.03) ----------
  // keyframes [t, focus x, focus y, amount 0-1, content top, content bottom]; amount 0 = at rest (every planned camera move
  // and every wipe starts from rest); the rig scales ≤ 1.03 about the focus and pans it a little toward the zone centre,
  // clamped so nothing leaves the stage zone (y 220-1460) and the sides grow ≤ 16 px.
  const CAMS = ['s02/link', 's05/pane', 's06/passed', 's07/home', 's08/click', 's09/sheet', 's11/slots4', 's16/slackrow', 's17/dialog', 's19/chosen'].map(at);
  // while the camera is zoomed (1.25-1.28) the window's text spans the frame edge to edge: the rig only pans (y), never scales
  const ZOOMED = [[CAMS[0], S.s03 - 0.42], [CAMS[1], CAMS[2]], [CAMS[4], S.s10 - 0.42], [CAMS[6], S.s16 - 0.42], [CAMS[7], S.s18 - 0.42], [CAMS[9], S.s20 - 0.42]];
  const st = (fx, fy, a, top, bot, t) => {
    if (ZOOMED.some(([z0, z1]) => t >= z0 && t < z1)) {
      const y = a * 20 * (Math.abs(840 - fy) < 40 ? -1 : Math.sign(840 - fy));
      return { x: 0, y: Math.min(Math.min(1452, bot + 30) - bot, Math.max(Math.max(222, top - 18) - top, y)), scale: 1 };
    }
    const s = 1 + 0.03 * a, p = 0.03 * a;
    let x = (1 - s) * fx + p * (540 - fx), y = (1 - s) * fy + p * (840 - fy);
    const xl = 24 - 40 * s, xh = 1056 - 1040 * s; x = xl > xh ? (xl + xh) / 2 : Math.min(xh, Math.max(xl, x));
    const yl = Math.max(222, top - 18) - top * s, yh = Math.min(1452, bot + 30) - bot * s; y = yl > yh ? (yl + yh) / 2 : Math.min(yh, Math.max(yl, y));
    return { x, y, scale: s };
  };
  const A = [220, 1280], D3 = [540, 1230], F = [240, 1120], PN = [240, 1420], DK = [520, 1210];
  const K = [
    [0, 420, 796, 0, ...A], [at('s01/slack'), 420, 796, 0.6, ...A], [at('s02/roll'), 330, 330, 0.35, ...A], [at('s02/bubble'), 400, 866, 0.6, ...A],
    [CAMS[0], 300, 912, 1, ...A], [CAMS[0] + 0.6, 300, 912, 0, ...A],
    [S.s03, 540, 623, 0, ...D3], [at('s03/chip'), 540, 623, 0.5, ...D3], [S.s04 - 0.1, 540, 700, 1, ...D3], [S.s04 + 0.45, 540, 700, 0, ...D3],
    [S.s04 + 0.46, 520, 1065, 0, ...F], [at('s04/sent'), 520, 1065, 0.45, ...F], [at('s04/working'), 540, 600, 0.5, ...F], [at('s04/dim'), 540, 420, 0.9, ...F],
    [S.s05 - 0.45, 540, 420, 1, ...F], [S.s05 - 0.05, 540, 420, 0, ...F], [CAMS[1] - 0.01, 540, 1000, 0.8, ...F], [CAMS[1] + 0.6, 540, 1000, 0, ...F],
    [CAMS[1] + 0.61, 300, 1080, 0, ...PN], [at('s06/invest'), 300, 1080, 0.35, ...PN], [at('s06/example'), 700, 1100, 0.15, ...PN], [CAMS[2], 540, 1340, 0.45, ...PN],
    [CAMS[2] + 0.6, 540, 1340, 0, ...PN], [CAMS[3] + 0.6, 560, 1150, 0, ...PN], [at('s07/field'), 330, 1040, 0.8, ...PN], [at('s08/bar'), 540, 880, 0.5, ...PN],
    [at('s08/result'), 300, 680, 0.6, ...PN], [CAMS[4], 250, 790, 1, ...PN], [CAMS[4] + 0.6, 250, 790, 0, ...F], [CAMS[5], 540, 620, 0.5, ...F],
    [CAMS[5] + 0.6, 540, 620, 0, ...F], [at('s09/toggle'), 760, 580, 0.9, ...F], [S.s10 - 0.45, 760, 580, 1, ...F], [S.s10 - 0.05, 760, 580, 0, ...F],
    [at('s10/rule'), 300, 520, 0.7, ...F], [at('s10/slots'), 400, 760, 0.4, ...F], [CAMS[6], 400, 760, 0.8, ...F], [CAMS[6] + 0.6, 400, 760, 0, ...F],
    [at('s11/lv1'), 400, 650, 0.25, ...F], [at('s12/lv2'), 400, 740, 0.4, ...F], [at('s13/lv3'), 400, 830, 0.55, ...F], [at('s14/lv4'), 400, 920, 0.7, ...F],
    [at('s15/drift'), 700, 800, 0.4, ...F], [at('s15/pw'), 800, 1010, 0.7, ...F], [at('s15/locked'), 800, 1010, 0.25, ...F], [S.s16 - 0.45, 800, 1010, 0.6, ...F],
    [S.s16 - 0.05, 800, 1010, 0, ...F], [at('s16/plugins'), 540, 560, 0.5, ...F], [CAMS[7], 300, 600, 0.9, ...F], [CAMS[7] + 0.6, 300, 600, 0, ...F],
    [at('s16/notes'), 700, 560, 0.6, ...F], [at('s16/stays'), 300, 820, 0.8, ...F], [at('s17/menu'), 850, 300, 0.5, ...F], [CAMS[8], 850, 300, 0.8, ...F],
    [CAMS[8] + 0.6, 850, 300, 0, ...F], [at('s17/lit1'), 300, 720, 0.35, ...F], [at('s17/lit3'), 600, 760, 0.5, ...F], [at('s17/gone'), 830, 840, 0.6, ...F],
    [at('s17/gone') + 0.6, 830, 840, 0, ...F],
    [S.s18, 540, 900, 0, ...DK], [at('s18/diff'), 540, 958, 0.4, ...DK], [at('s18/kicker'), 300, 713, 0.8, ...DK], [at('s18/ring'), 251, 828, 1, ...DK],
    [at('s19/pulse'), 400, 720, 0.6, ...DK], [CAMS[9], 400, 760, 0.9, ...DK], [CAMS[9] + 0.6, 400, 760, 0, ...DK], [at('s19/loosen'), 300, 790, 0.5, ...DK],
    [at('s19/earned'), 650, 800, 1, ...DK], [S.s20 - 0.45, 540, 760, 0.6, ...DK], [S.s20 - 0.1, 540, 760, 0, ...DK],
  ];
  tl.set('#d-rig', { x: 0, y: 0, scale: 1, transformOrigin: '0 0' }, 0);
  for (let k = 0; k + 1 < K.length; k++) {
    const [t0, ...a] = K[k], [t1, ...b] = K[k + 1];
    if (t1 - t0 < 0.02) continue;
    tl.fromTo('#d-rig', st(...a, t0), { ...st(...b, t1), duration: t1 - t0, ease: 'none', immediateRender: false }, t0);
  }
})();

// ---------- the camera keeps every text inside the frame (sweep 2026-10-17: the 1.35-1.4 pushes cut "eckout", "d number",
// "nvestigating", "he fix is ready", "Goal: … bug-fre"). The window's content (bubbles, composer, •••) runs stage x 120-955
// and the pane plus the chat above it x 100-945, so a push is capped at 1.28 (pane: 1.25) and centred on that span (keeping its y); s06 "tests" pulls back to the whole computer instead
// (a 1000 px pane cannot fit the frame at any zoom) and s07's move home is then already there. ----------
(function () {
  const pane = [at('s05/pane')], home = [at('s06/passed')];
  const near = (t, list) => list.some(x => Math.abs(t - x) < 0.01);
  tl.getChildren(false, true, false).filter(tw => { const g = tw.targets ? tw.targets() : []; return g[0] && g[0].id === 'cam' && +tw.vars.scale > 1.001; })
    .forEach(tw => {
      const t = tw.startTime(), d = tw.duration(), z = +tw.vars.scale, Y = (CAMC - tw.vars.y) / z;
      tw.kill();
      if (near(t, home)) { camHome(t, d); return; }
      if (near(t, pane)) cam(t, 522, Y, Math.min(z, 1.25), d); else cam(t, 540, Y, Math.min(z, 1.28), d);
    });
})();
