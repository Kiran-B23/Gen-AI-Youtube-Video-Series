# Design: Studio app

The locked system for the studio app (`app/web/`). Every Hallmark run reads this first and every screen shares it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: app screen (a production console, not a dashboard of stat cards)
- Theme: Wayfind (dealt 1/3, seed production-console-where-one-d34b·c316738a·2026-10-28·r0), app scope: palette, face, radius and surfaces only
- Axes: light/mono/cool · posture: committed · modes: light (`platform`), dark (`night`), system
- Signature: the pipeline. One gate language (pending, running, pass, done, fail, stale, waiting for you) on the Build stepper, the Package scripter gates and the Projects card row (`Gate` and `.step-mark` in `components/ui.tsx` and `index.css`)

## Tokens
`app/web/src/tokens.css` is the source of truth (`@theme static` for colour, face, text, radius, shadow, easing; `:root` for space, motion, layers; dark under `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` and `:root[data-theme="dark"]`; `.plate` for the ink plate). The roles:
```css
:root {
  --color-paper: oklch(95.5% 0.006 250);  --color-paper-2: oklch(91% 0.009 250);  --color-paper-3: oklch(99.5% 0.005 250);
  --color-ink: oklch(16% 0.014 262);  --color-ink-2: oklch(29% 0.014 262);  --color-muted: oklch(47% 0.016 260);  --color-rule: oklch(80% 0.011 250);
  --color-accent: oklch(47% 0.244 268.8); /* the channel blue #2B3BE0 */  --color-accent-ink: oklch(99.5% 0.003 250);  --color-focus: var(--color-accent);
  --color-accent-2: oklch(81% 0.16 82); /* amber: figures on ink, and the "waiting for you" fill under ink text */
  --color-ok: oklch(47% 0.12 150);  --color-warn: oklch(51% 0.12 62);  --color-bad: oklch(50% 0.19 27);
  --color-plate: oklch(16% 0.014 262);  --color-plate-ink: oklch(93% 0.006 250);
  --font-display: "Chivo Mono Variable", "Chivo Mono", ui-monospace, monospace;  --font-body: var(--font-display);
  --radius-card: 0;  --radius-pill: 999px;  --rule-hair: 1px;  --rule-bar: 2px;  --shadow-card: 0 24px 40px -24px oklch(8% 0.01 260 / 0.6);
}
```
Night re-derives every role (paper 15%, ink 95%, cobalt lifted to oklch(63% 0.19 268.8) with dark ink on it, states lifted to L 70 to 78); the hue never moves. Contrast holds in both modes (body ≥ 4.5:1, states ≥ 4.5:1 on every paper, field edges and rings ≥ 3:1). The face is self-hosted (`@fontsource-variable/chivo-mono`, roman and italic): no runtime font request, so the LAN works offline.

Type scale (fixed, 1.125 to 1.2): 12px small and table text, 14px body, 16px panel heads, 19.2px, 23px page heads. Weights 400, 500, 800 only (`b`, `strong` are 800). Tabular numerals everywhere.

## Surfaces
- One container: `.panel` (`Card`), a 2px ink rule over a head row (h2 + meta). No box, no shadow, no card inside a card.
- The ink plate (`.plate`): the shell sidebar, the run log, the Trends top-10 board, agent input dumps. It carries the night colours in either mode.
- Second neutral (`--color-paper-2`): the right artifact pane, wells, hover, the selected step row.
- Tables before cards: `table.data`, horizontal rules only, a 2px ink head rule, sentence-case heads; a phone restacks rows (Review fix list, Trends top 10).
- Radius 0 everywhere. A shadow only under what floats (the dialog, the scrub tooltip).

## Controls
- Primary: cobalt fill, accent-ink text, square, Chivo Mono 800, 36px (32px small) with a 44px hit target.
- Secondary: transparent with a 2px ink border, same size; ghost: no border; danger: 2px bad border and text.
- Choice set (`.seg`): square cells sharing 2px borders; the chosen cell fills ink; the current route (`aria-current="page"`) fills cobalt.
- Fields (`.field`): square, a constant 2px `--color-muted` edge on paper-3, the focus ring an inset outline.
- Cobalt means one thing: live (running), the primary action, the current place. Amber only on ink or under ink text.

## Motion
- Character: still. Colour changes in `steps(1)` at `--dur-micro`, a 1px press; no pulse, no shimmer, no reveal. Under reduced motion everything ends at once (`base.css`).
- One exception, the run pet (`components/Pet.tsx`, `pet.css`; owner's request, 2026-10-29): a pixel sprite that walks a long job's stations (a video's build line on the Video page, a Kaggle run on Experiments) and acts out the current step. Stepped (`steps()`) sprite motion only, no easing or glow, and none at all under reduced motion. It replaces progress bars; don't add bars or other moving parts elsewhere.

## Variants
- The app keeps its own `data-theme` attribute (not `data-mode`) for the light, dark and system toggle in `Shell.tsx`.

## Exports
`app/web/src/tokens.css` in this project, already in Tailwind v4 form (`@theme static`). DTCG or shadcn blocks are added here on request, per Hallmark's `export-formats.md`.
