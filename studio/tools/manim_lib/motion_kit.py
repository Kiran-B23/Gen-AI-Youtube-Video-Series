"""
Reusable motion-graphics primitives for studio clips (any topic). Import in a clip:

    import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
    from studio_style import *          # palette from the scene's section, T(), chip(), TimedScene, w(), at(), CLIP_LEN
    from motion_kit import *            # the primitives below

Every primitive uses the scene's section palette (BG / TEXT / ACCENT / ACCENT2 / DIM), so it fits any art direction.
Animations are finite and deterministic (Manim renders frame by frame). Catalogue: video-studio/references/clip-recipes.md.
"""
from studio_style import *
from studio_style import _rgb   # private helper used by the illustrations

# ---------- ambient ----------
def breathe(scene, mob, t_end, amp=0.08, period=1.6):
    """Ambient float for the 'breathe' phase: gently bob `mob` until clip time t_end (keeps the QA motion check green).
    First brings the camera home, so a span never ends zoomed off-centre."""
    if hasattr(scene, "camera_home"): scene.camera_home(min(0.4, max(0.1, t_end - scene.renderer.time - 0.1)))
    while scene.renderer.time + period / 2 <= t_end:
        scene.play(mob.animate.shift(UP * amp), run_time=period / 2, rate_func=there_and_back)
    scene.until(t_end)

# ---------- text & tokens ----------
def chip_rows(items, rows, size=72, gap=0.45, highlight=(), colors=(None, None), buff=0.26):
    """Chips for `items` laid out in rows: rows = [(start, end), ...]. Items in `highlight` use ACCENT, the rest ACCENT2.
    Returns (VGroup of rows, list of chips in item order)."""
    hi, lo = colors[0] or ACCENT, colors[1] or ACCENT2
    chips = [chip(t, hi if t in highlight else lo, size) for t in items]
    group = VGroup(*[VGroup(*chips[a:b]).arrange(RIGHT, buff=buff) for a, b in rows]).arrange(DOWN, buff=gap)
    return group, chips

def _set_line(parts_on_line, size, color):
    """Typeset one line as a single Text (so the font engine sets one shared baseline), then split its glyphs back into
    the parts. Parts with gap < 0.1 join without a space (punctuation, "'s"). Returns a list of VGroups, one per part."""
    txt = "".join((" " if (k and gap >= 0.1) else "") + t for k, (t, gap) in enumerate(parts_on_line))
    line = T(txt, size, color or TEXT)
    glyphs = [g for g in line.submobjects]                     # Manim Text: one submobject per non-space character
    out, i = [], 0
    for t, _ in parts_on_line:
        n = len(t.replace(" ", ""))
        out.append(VGroup(*glyphs[i:i + n])); i += n
    return line, out

def phrase(parts, size=72, color=None):
    """A one-line sentence built from separately addressable parts [(text, gap), ...] (gap >= 0.1 = a word space,
    < 0.1 = joined, e.g. "?" or "'s"): slice it, morph each part. Shared baseline guaranteed."""
    _, out = _set_line(parts, size, color)
    return VGroup(*out)

def wrap_phrase(parts, size=72, max_width=None, line_gap=0.35, color=None):
    """phrase() wrapped onto several lines to stay large. Joined parts never start a line. Lines are centred.
    Returns a flat VGroup of the parts in order; position it with .move_to()."""
    max_width = max_width or FRAME_W * 0.86
    lines, cur = [], []
    for k, (t, gap) in enumerate(parts):
        trial = cur + [(t, gap)]
        if cur and gap >= 0.1 and _set_line(trial, size, color)[0].width > max_width:
            lines.append(cur); cur = [(t, 0)]
        else:
            cur = trial
    if cur: lines.append(cur)
    allparts, y = [], 0.0
    lh = T("Hg", size).height
    for ln in lines:
        line, out = _set_line(ln, size, color)
        line.move_to([0, y, 0]); allparts += out; y -= lh + line_gap
    return VGroup(*allparts)

def flip_to(scene, mob, new, run_time=0.36, cue="ding"):
    """Card-flip `mob` into `new` (same place): squash, swap, unsquash. Returns `new`."""
    if cue: scene.cue(cue)
    new.move_to(mob)
    scene.play(mob.animate.stretch(0.02, 1), run_time=run_time * 0.45)
    new.stretch(0.02, 1); scene.remove(mob); scene.add(new)
    scene.play(new.animate.stretch(50, 1), run_time=run_time * 0.55)
    return new

def count_up(scene, to, pos, size=100, color=None, fmt="{:,}", suffix="", run_time=0.6, cue="riser"):
    """A number that counts up from 0 to `to` at `pos` (comma-grouped by default). Returns the live mobject."""
    if cue: scene.cue(cue)
    v = ValueTracker(0)
    num = always_redraw(lambda: T(fmt.format(int(v.get_value())) + suffix, size, color or ACCENT).move_to(pos))
    scene.add(num); scene.play(v.animate.set_value(to), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
    return num

def ribbon(text, size=78, color=None, y=2.4):
    """A long mono ribbon of text starting at the left edge; scroll it with .animate.shift(LEFT * (r.width - 10))."""
    r = T(text, size, color or ACCENT, mono=True)
    return r.move_to(UP * y).align_to(LEFT * 5.8, LEFT)

def card_pile(words, size=58, cols=5, bottom=-6.6, step=1.45, color=None, gap=0.22):
    """A pile of word cards: rows laid out by their real widths (never overlapping), stacked from `bottom` upward,
    every other row nudged sideways. Animate in with LaggedStart(*[FadeIn(c, shift=DOWN * 3) for c in pile], lag_ratio=0.02)."""
    pile, rows = VGroup(), []
    for r in range(0, len(words), cols):
        row = VGroup(*[chip(wd, color or ACCENT2, size, mono=False) for wd in words[r:r + cols]]).arrange(RIGHT, buff=gap)
        fit(row, 0.9); row.move_to([0.4 if (r // cols) % 2 else -0.4, bottom + (r // cols) * step, 0])
        rows.append(row); pile.add(*row)
    return pile

def shelf(rows_of_items, size=62, top=4.2, row_step=1.8, color=None, wood=None):
    """Items standing on real shelf planks (a vocabulary, a catalogue, a toolbox): plank + shadow + brackets.
    Returns (VGroup, {item: chip})."""
    wood = wood or (shade(TEXT, 0.75) if sum(_rgb(BG)) / 3 > 0.5 else shade(TEXT, 0.42))   # readable racks on light or dark sections
    tiles, g = {}, VGroup()
    for r, row in enumerate(rows_of_items):
        line = VGroup(*[chip(t, color or ACCENT2, size) for t in row]).arrange(RIGHT, buff=0.32).move_to(UP * (top - r * row_step))
        for t, c in zip(row, line): tiles[t] = c
        pw = max(line.width + 1.8, 6.0)   # the plank follows the row it carries
        plank = RoundedRectangle(corner_radius=0.06, width=pw, height=0.26, fill_color=wood, fill_opacity=1, stroke_width=0).next_to(line, DOWN, buff=0.08)
        shadow = plank.copy().set_fill(shade(wood, 0.5), 0.6).shift(DOWN * 0.12)
        brackets = VGroup(*[Polygon([x, 0, 0], [x + 0.5 * sgn, 0, 0], [x, -0.5, 0], fill_color=shade(wood, 0.6), fill_opacity=1, stroke_width=0)
                            .move_to(plank.get_bottom() + RIGHT * x + DOWN * 0.25) for x, sgn in ((-pw / 2 + 0.7, 1), (pw / 2 - 0.7, -1))])
        g.add(shadow, plank, brackets, line)
    return g, tiles

def knife(height=2.6):
    """A chef's knife pointing down: steel blade with a bright edge, wooden handle with rivets."""
    blade = Polygon([0, 0, 0], [0.42, 0.42, 0], [0.42, height, 0], [0, height, 0], fill_color="#DDE2E8", fill_opacity=1, stroke_width=0)
    edge = Line([0, 0.02, 0], [0, height, 0], color="#FFFFFF", stroke_width=5)
    spine = Line([0.42, 0.42, 0], [0.42, height, 0], color="#9AA3AE", stroke_width=6)
    handle = RoundedRectangle(corner_radius=0.14, width=0.56, height=1.4, fill_color="#6B4226", fill_opacity=1, stroke_width=0).next_to(blade, UP, buff=-0.02)
    rivets = VGroup(*[Dot(radius=0.06, color="#E6C79C").move_to(handle.get_center() + UP * d) for d in (0.35, -0.35)])
    return VGroup(blade, edge, spine, handle, rivets)

def slice_between(scene, parts, y=None, lift=2.0, spread=0.12, cue="tick"):
    """SLICE: a knife chops between consecutive parts (from phrase() or wrap_phrase(), one or several lines), then
    the pieces separate slightly. Line breaks get their cut just after the line's last part."""
    cuts = []
    for k in range(len(parts) - 1):
        a, b = parts[k], parts[k + 1]
        same_line = abs(a.get_center()[1] - b.get_center()[1]) < a.height * 0.5
        x = (a.get_right()[0] + b.get_left()[0]) / 2 if same_line else a.get_right()[0] + 0.18
        cuts.append((x, a.get_center()[1]))
    kn = knife(2.4).move_to([cuts[0][0], cuts[0][1] + lift, 0]); scene.add(kn)
    for x, cy in cuts:
        if cue: scene.cue(cue, at=scene.renderer.time + 0.06)
        scene.play(kn.animate.move_to([x, cy + lift, 0]), run_time=0.04)
        scene.play(kn.animate.move_to([x, cy, 0]), run_time=0.07, rate_func=rate_functions.ease_in_quad)
    scene.remove(kn)
    mid = (len(parts) - 1) / 2
    scene.play(*[parts[k].animate.shift(RIGHT * (k - mid) * spread) for k in range(len(parts))], run_time=0.2)

def price_tag(label, color=None, size=44):
    """A shop price tag with a hole: label things with IDs, prices, counts. TAG move: FadeIn(tag, shift=DOWN*0.3)."""
    col = color or ACCENT2
    lab = T(str(label), size, ink_on(col), mono=True)
    body = RoundedRectangle(corner_radius=0.12, width=lab.width + 0.75, height=lab.height + 0.36, fill_color=col, fill_opacity=1, stroke_width=0)
    lab.move_to(body).shift(RIGHT * 0.14)   # room for the hole
    hole = Circle(radius=0.07, color=shade(col, 0.5), fill_opacity=1).move_to(body.get_left() + RIGHT * 0.2)
    g = VGroup(VGroup(body), lab, hole); g.is_box = True; g.box_text = f"tag {label}"
    return g

def receipt(title, lines, total, accent="#C81D3A", width=6.3, ink="#2A1A12", paper="#FFFDF7"):
    """A paper receipt: [0] paper, [1] title, [2] line items (VGroup), [3] total. PRINT move: reveal [2] line by line."""
    head = T(title, 72, ink)
    rows = VGroup(*[T(l, 52, ink, mono=True) for l in lines]).arrange(DOWN, buff=0.14, aligned_edge=LEFT)
    tot = T(total, 80, accent)
    inner = VGroup(head, rows, tot).arrange(DOWN, buff=0.35)
    sheet = Rectangle(width=width, height=inner.height + 0.9, fill_color=paper, fill_opacity=1, stroke_width=0)
    inner.move_to(sheet)
    return VGroup(sheet, head, rows, tot)

def print_lines(scene, rcpt, run_time=0.9, cue="tick"):
    """PRINT: reveal a receipt's line items one by one (start them at low opacity so the paper is never blank)."""
    n = len(rcpt[2])
    if cue:
        for k in range(n): scene.cue(cue, at=scene.renderer.time + run_time * k / max(n, 1))
    scene.play(LaggedStart(*[l.animate.set_opacity(1) for l in rcpt[2]], lag_ratio=0.2), run_time=run_time)

def meter(label="TOKENS", panel_color=None, label_color=None, num_color=None, width=10.5, height=5.0):
    """A counter panel (taxi meter / scoreboard). Colours default to the section palette (a dark panel either way).
    Returns (VGroup(panel, label), ValueTracker, live number)."""
    panel_color = panel_color or "#14161C"; label_color = label_color or ACCENT2; num_color = num_color or "#FFFFFF"
    panel = RoundedRectangle(corner_radius=0.5, width=width, height=height, fill_color=panel_color, fill_opacity=1, stroke_width=0)
    lab = T(label, 54, label_color, mono=True).move_to(panel.get_top() + DOWN * 0.75)
    v = ValueTracker(0)
    num = always_redraw(lambda: T(f"{int(v.get_value())}", 200, num_color, mono=True).move_to(panel.get_center() + DOWN * 0.35))
    return VGroup(panel, lab), v, num

def chat_bubble(text_lines, fill, color, width=12.0, size=96, corner=0.45):
    """A chat bubble with one or more lines of text. Returns VGroup(bubble, *lines)."""
    lines = VGroup(*[T(t, size, color) for t in text_lines]).arrange(DOWN, buff=0.25)
    b = RoundedRectangle(corner_radius=corner, width=max(width, lines.width + 1.2), height=lines.height + 1.0, fill_color=fill, fill_opacity=1, stroke_width=0)
    lines.move_to(b)
    return VGroup(b, *lines)

def typing_dots(color=None):
    return VGroup(*[Dot(radius=0.18, color=color or DIM) for _ in range(3)]).arrange(RIGHT, buff=0.3)

def xray(scene, box, ghosts, cue="riser", run_time=0.8):
    """X-RAY: a scan line sweeps `box` (a chip()), its label fades and `ghosts` (what's hidden inside) appear."""
    if cue: scene.cue(cue)
    ghosts.move_to(box).scale_to_fit_width(box.width * 0.82).set_opacity(0)
    scan = Line(UP * box.height * 0.6, DOWN * box.height * 0.6, color=ACCENT, stroke_width=10).move_to(box.get_left() + RIGHT * 0.2)
    scene.add(ghosts, scan)
    scene.play(box[1].animate.set_opacity(0.12), scan.animate.move_to(box.get_right() + LEFT * 0.2), ghosts.animate.set_opacity(0.9),
               run_time=run_time, rate_func=linear)
    scene.remove(scan)

def unxray(scene, box, ghosts, run_time=0.35):
    scene.play(ghosts.animate.set_opacity(0), box[1].animate.set_opacity(1), run_time=run_time)

# ---------- layout ----------
def even_column(mobs, top=6.6, bottom=-6.6, center_x=0.0):
    """Stack mobjects top→bottom with equal gaps between `top` and `bottom` (frame units), so rows never overlap.
    If they don't fit, scales the whole column down to fit. Returns the VGroup."""
    g = VGroup(*mobs)
    total = sum(m.height for m in mobs)
    span = top - bottom
    if total > span * 0.92: g.scale(span * 0.92 / total); total = sum(m.height for m in mobs)
    gap = (span - total) / max(len(mobs) - 1, 1) if len(mobs) > 1 else 0
    y = top
    for m in mobs:
        m.move_to([center_x, y - m.height / 2, 0]); y -= m.height + gap
    return g


def fit(mob, frac=0.86):
    """Shrink `mob` (never enlarge) so it stays inside frac × frame width: clip edges are feathered, so anything
    wider than ~0.9 of the frame fades out at the sides."""
    if mob.width > FRAME_W * frac: mob.scale_to_fit_width(FRAME_W * frac)
    return mob


# ---------- polish: entrances, emphasis, clean morphs ----------
def pop_in(mob, scale=0.6, shift=ORIGIN, run_time=0.45):
    """Entrance with overshoot-and-settle (the default entrance; fades are for secondary elements)."""
    return FadeIn(mob, scale=scale, shift=shift, run_time=run_time, rate_func=rate_functions.ease_out_back)

def morph(a, b, run_time=0.45):
    """Clean change of form: cross-fade a → b with a little scale (never letter-scrambling glyph morphs)."""
    return AnimationGroup(FadeOut(a, scale=0.85, run_time=run_time * 0.8), FadeIn(b, scale=1.15, run_time=run_time, rate_func=rate_functions.ease_out_back))

def punch(scene, mob, factor=1.08, cue=None):
    """Quick emphasis: scale up and settle back."""
    if cue: scene.cue(cue)
    scene.play(mob.animate.scale(factor), run_time=0.12, rate_func=rate_functions.ease_out_quad)
    scene.play(mob.animate.scale(1 / factor), run_time=0.22, rate_func=rate_functions.ease_out_back)

def headline(text, size=110, color=None, frac=0.86):
    """Display headline (Anton), fitted to the safe width."""
    return fit(T(text, size, color or TEXT, display=True), frac)

# ---------- illustrations (vector, code-built: no licences needed) ----------
def strawberry(height=2.4, body="#E8394A", seed="#FFD24A", leaf="#2E9E4F"):
    """A friendly strawberry: rounded berry body, highlight, seeds, leaf crown and stem."""
    pts = [[0, -1.15, 0], [-0.62, -0.55, 0], [-0.98, 0.25, 0], [-0.78, 0.82, 0], [0, 0.98, 0], [0.78, 0.82, 0], [0.98, 0.25, 0], [0.62, -0.55, 0]]
    berry = Polygon(*pts, fill_color=body, fill_opacity=1, stroke_width=0).round_corners(0.32)
    shine = Ellipse(width=0.32, height=0.55, fill_color="#FFFFFF", fill_opacity=0.35, stroke_width=0).rotate(0.5).move_to([-0.45, 0.35, 0])
    seeds = VGroup(*[Ellipse(width=0.07, height=0.13, fill_color=seed, fill_opacity=1, stroke_width=0).move_to([x, y, 0])
                     for x, y in [(-0.5, 0.45), (0, 0.55), (0.5, 0.45), (-0.62, 0.0), (-0.2, 0.15), (0.22, 0.15), (0.62, 0.0),
                                  (-0.4, -0.35), (0, -0.25), (0.4, -0.35), (-0.15, -0.7), (0.18, -0.7)]])
    leaves = VGroup(*[Polygon([0, 0, 0], [0.28, 0.12, 0], [0.62, -0.02, 0], [0.28, -0.12, 0], fill_color=leaf, fill_opacity=1, stroke_width=0)
                      .rotate(a, about_point=ORIGIN) for a in (0.25, 1.0, 1.8, 2.6, 3.0)]).move_to([0, 0.98, 0])
    stem = RoundedRectangle(corner_radius=0.04, width=0.1, height=0.36, fill_color="#1F6B3A", fill_opacity=1, stroke_width=0).move_to([0.05, 1.22, 0])
    g = VGroup(berry, shine, seeds, leaves, stem)
    return g.scale_to_fit_height(height)

def cutting_board(width=13.0, height=8.0, wood="#D9A066", grain="#C4874C"):
    """A wooden cutting board: rounded plank, darker rim, grain lines and a hanging hole."""
    rim = RoundedRectangle(corner_radius=0.7, width=width, height=height, fill_color=shade(wood, 0.8), fill_opacity=1, stroke_width=0)
    top = RoundedRectangle(corner_radius=0.6, width=width - 0.3, height=height - 0.3, fill_color=wood, fill_opacity=1, stroke_width=0)
    lines = VGroup(*[Line([-width / 2 + 0.9, y, 0], [width / 2 - 1.8, y + 0.15 * ((k % 2) * 2 - 1), 0], color=grain, stroke_width=4, stroke_opacity=0.6)
                     for k, y in enumerate([height * f for f in (-0.3, -0.12, 0.05, 0.22, 0.36)])])
    hole = Circle(radius=0.32, fill_color=shade(wood, 0.55), fill_opacity=1, stroke_width=0).move_to([width / 2 - 0.85, 0, 0])
    return VGroup(rim, top, lines, hole)

def tags_under(chips, labels, color_for=lambda label: ACCENT2, scale=0.85, buff=0.14):
    """Price tags under each chip. If a tag is wider than its chip's slot, the row's chips are re-spaced so tags never touch."""
    tags = VGroup(*[price_tag(l, color_for(l)).scale(scale).next_to(c, DOWN, buff=buff) for c, l in zip(chips, labels)])
    return tags


# ---------- secondary motion ----------
def crumbs(scene, point, color=None, n=7, spread=1.1, run_time=0.45, up=0.9):
    """Particles burst from `point` (a cut, an impact): deterministic spray, then fade."""
    col = color or ACCENT
    dots = VGroup(*[Dot(radius=0.05 + 0.03 * ((k * 7) % 3), color=col).move_to(point) for k in range(n)])
    scene.add(dots)
    anims = []
    for k, d in enumerate(dots):
        ang = -0.4 + 0.8 * k / max(n - 1, 1)
        anims.append(d.animate.shift(RIGHT * spread * (k - n / 2) / n * 2 + UP * (up - 0.5 * abs(ang))).set_opacity(0))
    scene.play(*anims, run_time=run_time, rate_func=rate_functions.ease_out_quad)
    scene.remove(dots)

def swing_in(tag, from_angle=0.35):
    """TAG move: a price tag swings in on its string (rotates about its hole), settling with a bounce."""
    pivot = tag.get_top() + LEFT * (tag.width / 2 - 0.2)
    tag.rotate(from_angle, about_point=pivot)
    return Rotate(tag, -from_angle, about_point=pivot, run_time=0.55, rate_func=rate_functions.ease_out_back)

def settle(mob, dy=0.25, run_time=0.5):
    """Drop-and-bounce arrival."""
    mob.shift(UP * dy)
    return mob.animate(rate_func=rate_functions.ease_out_bounce, run_time=run_time).shift(DOWN * dy)

def roll_to(scene, tracker, value, run_time=0.6):
    """Counter roll with a slight overshoot (reads like a mechanical counter)."""
    scene.play(tracker.animate.set_value(value), run_time=run_time, rate_func=rate_functions.ease_out_back)

# ---------- richer illustrations ----------
def phone_frame(width=11.0, height=15.5, body="#1A1A1E", screen=None):
    """A phone: rounded body, screen, notch. Returns VGroup(body, screen, notch); put content on .screen_rect."""
    b = RoundedRectangle(corner_radius=1.0, width=width, height=height, fill_color=body, fill_opacity=1, stroke_width=0)
    _lum = sum(_rgb(BG)) / 3
    sc = RoundedRectangle(corner_radius=0.75, width=width - 0.5, height=height - 0.5, fill_color=screen or (shade(BG, 1.35) if _lum < 0.5 else shade(BG, 0.93)), fill_opacity=1, stroke_width=0)   # screen reads against light or dark sections
    notch = RoundedRectangle(corner_radius=0.2, width=3.2, height=0.5, fill_color=body, fill_opacity=1, stroke_width=0).move_to(sc.get_top() + DOWN * 0.45)
    g = VGroup(b, sc, notch); g.screen_rect = sc
    return g

def bowl(n=5, width=6.0, color="#F3E3C7", rim="#D9A066"):
    """A bowl of strawberries: back wall, berries, then the front lip over their bottoms (so they sit *in* the bowl)."""
    import math
    cx, cy = 0.0, 0.0
    back = Ellipse(width=width, height=width * 0.42, fill_color=shade(color, 0.85), fill_opacity=1, stroke_width=0).move_to([cx, cy, 0])
    berries = VGroup(*[strawberry(1.35 + 0.2 * ((k * 3) % 2)).move_to([cx + (k - (n - 1) / 2) * width * 0.17, cy + 0.55 + 0.18 * ((k * 5) % 3) / 2, 0])
                       .rotate(0.25 - 0.12 * k) for k in range(n)])
    pts = [[cx + width / 2 * math.cos(t), cy + width * 0.21 * math.sin(t), 0] for t in [math.pi + i * math.pi / 40 for i in range(41)]]   # lower half of the ellipse
    lip = Polygon(*pts, fill_color=color, fill_opacity=1, stroke_color=rim, stroke_width=8)
    g = VGroup(back, berries, lip)
    return g

def printer(width=8.0, color="#3A3F4B"):
    """A receipt printer: body, paper slot, a lit button. Receipts emerge from .slot (its top edge)."""
    body = RoundedRectangle(corner_radius=0.35, width=width, height=2.6, fill_color=color, fill_opacity=1, stroke_width=0)
    top = RoundedRectangle(corner_radius=0.25, width=width - 0.6, height=0.5, fill_color=shade(color, 1.35), fill_opacity=1, stroke_width=0).move_to(body.get_top() + DOWN * 0.45)
    slot = Rectangle(width=width - 1.6, height=0.18, fill_color="#0B0D12", fill_opacity=1, stroke_width=0).move_to(body.get_top() + DOWN * 0.12)
    btn = Dot(radius=0.14, color="#5AD67D").move_to(body.get_right() + LEFT * 0.7 + DOWN * 0.6)
    g = VGroup(body, top, slot, btn); g.slot = slot
    return g

def grain_board(width=13.0, height=8.0, wood="#D9A066"):
    """cutting_board with a visible edge highlight and a soft contact shadow (depth)."""
    b = cutting_board(width, height, wood)
    shadow = RoundedRectangle(corner_radius=0.7, width=width, height=height, fill_color="#000000", fill_opacity=0.18, stroke_width=0).shift(DOWN * 0.25)
    hi = RoundedRectangle(corner_radius=0.6, width=width - 0.3, height=height - 0.3, stroke_color="#FFFFFF", stroke_opacity=0.25, stroke_width=4, fill_opacity=0)
    return VGroup(shadow, b, hi)

# ---------- futuristic / tech set (the channel aesthetic: glass, glow, HUD, scan beams) ----------
def glow(mob, color=None, layers=4, spread=0.05, opacity=0.18):
    """Soft glow behind a stroke/fill mobject: stacked, widening, fading copies (Manim has no blur). Returns VGroup(glow, mob)."""
    col = color or ACCENT
    halo = VGroup(*[mob.copy().set_stroke(col, width=(mob.get_stroke_width() or 4) + 10 * (k + 1), opacity=opacity * (1 - k / layers)).set_fill(opacity=0)
                    for k in range(layers)])
    return VGroup(halo, mob)

def glass_panel(width, height, tint=None, radius=0.45):
    """Translucent glass card: tinted fill, hairline light border, top highlight. The modern replacement for 'a card'."""
    t = tint or TEXT
    plate = RoundedRectangle(corner_radius=radius, width=width, height=height, fill_color=t, fill_opacity=0.14, stroke_color=t, stroke_opacity=0.55, stroke_width=3)
    hi = Line(plate.get_corner(UL) + RIGHT * radius + DOWN * 0.02, plate.get_corner(UR) + LEFT * radius + DOWN * 0.02, color=t, stroke_opacity=0.8, stroke_width=3)
    return VGroup(plate, hi)

def hud_tag(label, color=None, size=44):
    """HUD-style data tag: thin glowing frame, mono label, a tick mark. The futuristic replacement for a price tag."""
    col = color or ACCENT2
    lab = T(str(label), size, col, mono=True)
    frame = RoundedRectangle(corner_radius=0.08, width=lab.width + 0.5, height=lab.height + 0.34, stroke_color=col, stroke_width=3, fill_color=col, fill_opacity=0.10)
    lab.move_to(frame)
    tick = Line(frame.get_top() + UP * 0.22, frame.get_top(), color=col, stroke_width=3)
    g = VGroup(VGroup(frame), lab, tick); g.is_box = True; g.box_text = f"tag {label}"
    return g

def scan_beam(scene, parts, color=None, lift=1.6, cue="tick"):
    """SCAN-SLICE: a glowing vertical beam sweeps across `parts` (phrase/wrap_phrase); at each gap it flashes and the
    pieces separate. The futuristic replacement for a knife."""
    col = color or ACCENT
    cuts = []
    for k in range(len(parts) - 1):
        a, b = parts[k], parts[k + 1]
        same = abs(a.get_center()[1] - b.get_center()[1]) < a.height * 0.5
        cuts.append(((a.get_right()[0] + b.get_left()[0]) / 2 if same else a.get_right()[0] + 0.18, a.get_center()[1]))
    h = max(p.height for p in parts) + lift
    beam = glow(Line(UP * h / 2, DOWN * h / 2, color=col, stroke_width=6), col).move_to([parts[0].get_left()[0] - 0.3, cuts[0][1], 0])
    scene.add(beam)
    for x, cy in cuts:
        if cue: scene.cue(cue, at=scene.renderer.time + 0.05)
        scene.play(beam.animate.move_to([x, cy, 0]), run_time=0.08, rate_func=linear)
        flash = Line(UP * h / 2, DOWN * h / 2, color="#FFFFFF", stroke_width=10).move_to([x, cy, 0])
        scene.add(flash); scene.play(FadeOut(flash), run_time=0.06)
    scene.play(FadeOut(beam), *[parts[k].animate.shift(RIGHT * (k - (len(parts) - 1) / 2) * 0.12) for k in range(len(parts))], run_time=0.2)

def grid_floor(width=14.0, height=5.0, color=None, rows=6, cols=10):
    """Perspective grid (a 'digital floor') for depth under a scene."""
    col = color or ACCENT2
    g = VGroup()
    for r in range(rows + 1):
        t = r / rows; y = -height / 2 + height * t ** 1.6; w = width * (0.35 + 0.65 * t)
        g.add(Line([-w / 2, y, 0], [w / 2, y, 0], color=col, stroke_width=3, stroke_opacity=0.25 + 0.4 * (1 - t)))
    for c in range(cols + 1):
        u = c / cols - 0.5
        g.add(Line([u * width * 0.35, -height / 2, 0], [u * width, height / 2, 0], color=col, stroke_width=3, stroke_opacity=0.35))
    return g

def data_bars(values, labels, width=5.0, max_h=5.0, color=None, unit="", subs=None):
    """Glowing bar meters (a comparison of counts); returns (VGroup, [bars]) with .animate-able bars.
    `subs`: an optional caption per bar, fitted to the bar width (so neighbours never overlap)."""
    col = color or ACCENT
    m = max(values); out, bars = VGroup(), []
    for k, (v, l) in enumerate(zip(values, labels)):
        x = (k - (len(values) - 1) / 2) * (width + 1.2)
        bh = max_h * v / m
        bar = RoundedRectangle(corner_radius=0.2, width=width, height=bh, fill_color=col, fill_opacity=0.9, stroke_width=0).move_to([x, -max_h / 2 + bh / 2, 0])
        back = RoundedRectangle(corner_radius=0.2, width=width, height=max_h, fill_color=TEXT, fill_opacity=0.06, stroke_color=TEXT, stroke_opacity=0.2, stroke_width=2).move_to([x, 0, 0])
        num = T(f"{v}{unit}", 96, col, display=True).next_to(back, UP, buff=0.3)
        lab = T(l, 54, TEXT).next_to(back, DOWN, buff=0.3)
        out.add(back, bar, num, lab)
        if subs:
            sb = T(subs[k], 40, DIM); sb.scale_to_fit_width(min(sb.width, width)); out.add(sb.next_to(lab, DOWN, buff=0.15))
        bars.append((bar, num, bh))
    return out, bars
