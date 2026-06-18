# The Diagram System (the hero boards)

This is the vibe-check diagram engine. It is how you draw the big, polished boards a beginner actually wants to look at: the Experience Blueprint, the Opportunity Map, the Competitor Matrix, and the Story Map.

## What this is

One shared stylesheet (`engine.css`) plus four small renderers, one per board. You never hand-write the board's HTML. You produce a structured JSON object that describes the board, and the matching renderer draws it. Same renderer, any idea. The three sample datasets that ship beside the renderers (`data-clearlist.json`, `data-vinti.json`, `data-skillconcierge.json`) all drive the same blueprint engine with no code changes, so you can trust the pattern: change the JSON, never the renderer. One board breaks this pattern on purpose: the Crazy 8 board is hand-composed, not JSON-driven, and it gets its own section below.

Plain inline mermaid is only a fallback for a quick throwaway sketch in chat. Anything that lands in the blueprint or that the person keeps gets drawn with this engine.

All four files live here:

```
.claude/skills/vibe-check/assets/diagrams/
  engine.css        the shared look (never edit per board)
  blueprint.html    Experience Blueprint renderer
  opportunity.html  Opportunity Map renderer
  storymap.html     Story Map renderer
  matrix.html       Competitor Matrix renderer
```

## The four boards, and when each one shows up

| Board | Renderer | When you draw it |
|---|---|---|
| Experience Blueprint | `blueprint.html` | The spine. It fills across the whole session, from Phase 0 through Phase 5. See [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md). |
| Opportunity Map | `opportunity.html` | Phase 0, Step 4. Every need, placed by how much it hurts and how well today's tools handle it. |
| Competitor Matrix | `matrix.html` | Phase 0, Step 3.5. Rows are needs, columns are rivals, each cell is how well that rival handles that need. |
| Story Map | `storymap.html` | Phase 2. The journey across the top, capabilities hung under each step in V1 / V2 / Later lanes. This board lays the skeleton the blueprint fills in around. |

## The shared rules (true for all four boards)

Read these once. They keep the JSON small and stop the boards from ever overlapping.

- **Uniform header.** Every board takes a `header` object: `{ "crumb": "...", "title": "...", "sub": "..." }`. The `crumb` is the small all-caps line on top, the `title` is the big headline, the `sub` is the one-sentence plain-language explainer under it.
- **Placement is never coordinates.** You never give an x and a y. You give an index or a bucket (a quadrant, a grid cell, a column, a lane), and the renderer works out where it goes. This is why cards can never sit on top of each other. Overlap is structurally impossible.
- **Decoration is computed, not stored.** The little hand-placed tilt on sticky notes, the mark glyphs (the check, the squiggle, the cross), and the color tints all come from the renderer reading an enum you set (like `"well"` or `"gap"`). You never store a rotation angle or a hex color in the JSON.
- **Arrays for more than one card.** Anywhere a single cell can hold several notes, pass an array. One note can be a plain string or an object; the renderer handles both.
- **The footer is not data.** Every renderer hardcodes the footer text **Created using Vibe-Check skill** into its own markup. It is not a field you pass, so it can never be left out by accident. See the footer note at the end.

## The JSON shapes

### Experience Blueprint (`blueprint.html`)

The full schema lives in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md), so it is not repeated here. The one-object summary:

```json
{
  "state": "future",
  "offering": "App name",
  "scenario": "The one moment this board maps",
  "explainer": { "title": "...", "body": "...", "read": "..." },
  "phases": [ { "name": "Discover", "from": 1, "to": 2 } ],
  "steps": [ { "n": 1, "name": "Step name", "def": "what happens", "hidden": false } ],
  "layers": {
    "touchpoint": { "1": "card text", "2": "..." },
    "roles": {}, "process": {}, "technology": {}, "policy": {},
    "pitfall": {}, "rationale": {}, "question": {}, "note": {}
  }
}
```

The renderer owns the layer taxonomy, the colors, and the layer order. Your data only supplies content, keyed by step number, so empty cells are natural (just leave the step out). A `state` of `"current"` swaps the middle layers to Critical Moments, Opportunities, and Metrics for Checkup Mode.

### Opportunity Map (`opportunity.html`)

The renderer drops each need into one of four quadrants using fixed thresholds, then flows the cards inside that quadrant so they wrap neatly. Cards sort by `score` (highest first) inside a quadrant, and the top one gets the big red score badge.

Fields:

- `header`: `{ crumb, title, sub }`.
- `axes`: the framing labels around the plot. `{ "y": {"label","high","low"}, "x": {"label","low","high"} }`. Y top means high pain, bottom means low pain. X left means handled badly, right means handled well.
- `quadrants`: `{ gap, stakes, niche, low }`, each `{ "title", "tone" }`. `tone` is one of `win | stakes | low` and drives the background tint.
- `needs[]`: `{ "id", "label", "kicker?", "pain" (1 to 10), "served" (1 to 10), "score", "evidence" }`. `evidence` is `seen` (a solid border, you have real quotes) or `hunch` (a dashed border, plausible but not yet confirmed).
- `winner`: `{ "label", "meta" }` for the green side panel that names the single thing to build first.
- `formula`: a short string shown in the score panel, for example `Opportunity = Pain + max(0, Pain - Served)` (the gap never drops below zero, so a well-served need just scores its own Pain).
- `evidenceLegend[]`: `{ "type": "seen|hunch", "label" }`.

How the renderer buckets each need (fixed, so it is the same every time): `painHigh = pain >= 6`, `servedWell = served >= 6`.

- `painHigh && !servedWell` goes to `gap` (the corner where you win)
- `painHigh && servedWell` goes to `stakes`
- `!painHigh && !servedWell` goes to `niche`
- `!painHigh && servedWell` goes to `low`

`pain`, `served`, and `score` are stored so the renderer can sort and pick the top card. The placement is always the bucket, never a raw position.

```json
{
  "header": { "crumb": "Discovery · Step 4 · Opportunity Scoring", "title": "The Opportunity Map", "sub": "Every need, by how much it hurts and how well today's tools handle it." },
  "axes": {
    "y": { "label": "How much it hurts", "high": "a lot", "low": "a little" },
    "x": { "label": "How well today's tools already handle it", "low": "badly", "high": "well" }
  },
  "quadrants": {
    "gap":    { "title": "◆ The gap, build here", "tone": "win" },
    "stakes": { "title": "Table stakes, just match it", "tone": "stakes" },
    "niche":  { "title": "Niche, maybe later", "tone": "low" },
    "low":    { "title": "Low priority, leave it", "tone": "low" }
  },
  "needs": [
    { "id": "listing", "label": "Create an accurate listing in seconds", "kicker": "the differentiator", "pain": 9, "served": 3, "score": 15, "evidence": "seen" },
    { "id": "noshow", "label": "Stop buyers from no-showing", "pain": 8, "served": 2, "score": 14, "evidence": "seen" },
    { "id": "browse", "label": "Browse listings easily", "pain": 7, "served": 8, "score": 7, "evidence": "hunch" }
  ],
  "winner": { "label": "Create an accurate listing in seconds", "meta": "Opportunity 15 · hurts a lot (9), handled badly (3)." },
  "formula": "Opportunity = Pain + max(0, Pain - Served)",
  "evidenceLegend": [
    { "type": "seen", "label": "Seen it, real quotes back it up" },
    { "type": "hunch", "label": "Hunch, plausible but not yet confirmed" }
  ]
}
```

### Story Map (`storymap.html`)

One CSS grid. The columns are `172px` for the lane label plus one column per activity, so `172px repeat(activities.length,1fr)`. One row per release. Every note sits inside a grid cell, so notes never collide. The little tilt cycles automatically by index (`tilt-l`, then `tilt-r`, then `tilt-0`) in the renderer, never in your data.

Fields:

- `header`: `{ crumb, title, sub }`.
- `activities[]`: the backbone steps across the top, `{ "step" (number), "name" }`. The number of activities sets the column count.
- `releases[]`: the lanes, top to bottom, `{ "id", "label", "tape", "subnote?", "skeleton?", "band?" }`. `tape` is one of `green | blue | kraft` and tints the lane label. `band: true` adds the green walking-skeleton tint and dashed borders to that whole lane (use it on V1). `skeleton` is the small green "ship just this row" line.
- `cells{}`: the notes, looked up as `cells[releaseId][activityStep]`, each an array of note objects: `{ "kicker", "text", "color", "size?", "pin?", "aha?" }`. `color` is one of `y | g | b | o | p | ai` (`ai` is the purple AI family). `size: "sm"` makes a small note. `pin: true` adds the tape nub on top. `aha: true` appends the red `★ the aha moment` tag.

```json
{
  "header": { "crumb": "Phase 2 · User Story Map", "title": "ClearList Seller, Story Map", "sub": "Read left to right. Ship top to bottom. The green band alone is a real, working app." },
  "activities": [
    { "step": 1, "name": "Snap the items" },
    { "step": 2, "name": "AI writes the listing" }
  ],
  "releases": [
    { "id": "v1", "label": "V1 · first sale", "tape": "green", "subnote": "start to finish", "skeleton": "ship just this row", "band": true },
    { "id": "v2", "label": "V2 · make it shine", "tape": "blue", "subnote": "once V1 works" },
    { "id": "later", "label": "Later · someday", "tape": "kraft" }
  ],
  "cells": {
    "v1": {
      "1": [ { "kicker": "Do", "text": "Take or upload photos (up to 5)", "color": "g", "pin": true } ],
      "2": [ { "kicker": "AI", "text": "Your listing in ~15 seconds", "color": "ai", "aha": true } ]
    },
    "v2": { "1": [ { "kicker": "Do", "text": "Add a voice note", "color": "b", "size": "sm" } ] },
    "later": { "1": [ { "kicker": "Idea", "text": "Bulk multi-item upload", "color": "y", "size": "sm" } ] }
  }
}
```

### Competitor Matrix (`matrix.html`)

One CSS grid. Columns are `420px` for the row labels plus one per competitor, so `420px repeat(competitors.length,1fr)`. Rows are `96px` for the headers plus one per need, so `96px repeat(needs.length,1fr)`. One mark sits centered in each cell, so cells can never collide. The glyphs come from the renderer reading the enum.

Fields:

- `header`: `{ crumb, title, sub }`.
- `cornerLabel`: the small caption in the top-left corner.
- `competitors[]`: the column headers, `{ "name", "sub?" }`.
- `needs[]`: the rows, `{ "label", "type", "tag?", "marks" }`. `type` is one of `gap | stakes | plain` and sets the row's left stripe and tint (`gap` is green, `stakes` is amber, `plain` is neutral). `marks` is an array exactly `competitors.length` long, each one of `well | poor | none | na`.
- `legend[]`: `{ "mark": "well|poor|none", "label" }`.
- `callout`: a short green summary line.

The renderer maps each mark to a glyph: `well` becomes a check, `poor` becomes a squiggle, `none` becomes a cross, `na` becomes a dash.

```json
{
  "header": { "crumb": "Discovery · Step 3.5 · Competitor Matrix", "title": "Where Everyone's Weak", "sub": "A row everyone handles badly is your gap. A row everyone nails is table stakes." },
  "cornerLabel": "The need ↓ / How they do →",
  "competitors": [
    { "name": "Facebook Marketplace" },
    { "name": "A spreadsheet", "sub": "+ texts" }
  ],
  "needs": [
    { "label": "Create an accurate listing fast", "type": "gap", "tag": "◆ your gap", "marks": ["poor", "none"] },
    { "label": "Browse listings easily", "type": "stakes", "tag": "table stakes", "marks": ["well", "none"] }
  ],
  "legend": [
    { "mark": "well", "label": "Does it well" },
    { "mark": "poor", "label": "Does it poorly" },
    { "mark": "none", "label": "Doesn't do it" }
  ],
  "callout": "Most needs are wide open, that's the moving-sale gap."
}
```

## Crazy 8 (hand-composed, not JSON-driven)

This is the one board you draw by hand. Every other board on this page is JSON in, renderer out. Crazy 8 is the opposite: there is no renderer and no data file. You compose the HTML directly, one rough screen sketch per idea, authored straight against `engine.css` tokens and the shared `.stage` and `.head` primitives, with bespoke per-sketch classes for the card content itself. Each sketch is a real-ish core moment, not a labeled box, so the user reacts to something that feels like the app instead of an abstraction.

**When you draw it.** Phase 2, before you settle on one design. It is the diverge-then-converge move for the single most important interaction in the app.

**The confidence dial sets three knobs.** Read the dial (and the device, see below) early, then:

- **Count.** How many sketches you diverge into. A nervous first-timer gets about four so the board never overwhelms. The default is five or six. A confident or experienced person can go up to the full eight.
- **Fidelity.** How finished each sketch looks. A nervous beginner gets a touch more realistic so it reads clearly. A confident person gets rougher, faster sketches. Either way each one stays a recognizable frame with rough content in it, never a half-built app.
- **Frame.** The device the sketches are drawn inside. It follows the platform: a phone frame for a mobile app, a desktop browser frame for a web app. Form factor is read early in Phase 2, because you cannot sketch a core experience without knowing phone vs. screen. If it is unclear, ask one quick question before sketching.

**The device-frame variants.** Two starting files ship beside the JSON renderers:

- `crazy8.html` is the phone layout (sketches drawn inside phone frames, laid out as a comparison board).
- `crazy8-web.html` is the desktop-browser layout (fewer, wider frames for a web app).

Copy the one that matches the platform, then hand-edit the eight (or four, or six) frames to hold the actual idea sketches. They stay visually uniform because they all sit inside the same frame variant.

**Diverge, then converge.** The output is two beats. First the divergent board: N genuinely different directions side by side. Then the converge step: you fuse the bits the user cherry-picked into one combined direction, drawn so its provenance is visible (which picks came from which sketch). `crazy8-combine.html` is the worked example of that converged board.

**What it still inherits.** Even hand-composed, it follows the shared invariants: the uniform `header` object up top, the whole thing inside `.stage`, `engine.css` linked with `<link rel="stylesheet" href="engine.css">` and its tokens never redefined, and the exact footer **Created using Vibe-Check skill** linked to `https://github.com/TexasBedouin/vibe-check`, hardcoded in the markup the same way every renderer does it.

## How to render a board

This is the same move the visual blueprint uses (see [HTML-BLUEPRINT.md](HTML-BLUEPRINT.md), "How to generate it"). The renderer fetches a sibling JSON file and links the shared CSS, so all three files have to sit in the same folder.

1. **Find the temp folder.** `%TEMP%` on Windows. `$TMPDIR`, falling back to `/tmp`, on macOS and Linux.
2. **Write three files into the same fresh folder.** Stamp the folder name with a timestamp so each run is clean, for example `<tmpdir>/vibe-check-storymap-<timestamp>/`. Into it write:
   - the renderer for that board (`blueprint.html`, `opportunity.html`, `storymap.html`, or `matrix.html`), copied from `assets/diagrams/`,
   - its data file, named to match the param the renderer fetches (for example `data-clearlist.json`),
   - `engine.css`, copied from `assets/diagrams/`.
3. **Open the renderer in the browser.** `start <path>` on Windows, `open <path>` on macOS, `xdg-open <path>` on Linux. Open the HTML file from inside that folder, because it fetches its JSON sibling over `file://`.
4. **Print the full path in chat too**, in case it does not pop open on its own.

Crazy 8 is the exception to this flow: it has no data file, so you open its single self-contained HTML directly (with engine.css beside it in the same folder) rather than writing a renderer-plus-data pair.

A few things worth knowing:

- Each renderer reads `?data=<name>` from the URL and fetches `./data-<name>.json`, with a sensible default per board. On success it draws the board. On failure it writes a small error message into the page instead. Either way it sets `body[data-rendered="1"]` when it finishes, which a later platform can use to grab a headless screenshot.
- **PNG export is a later platform concern, not something the skill builds.** Inside the skill, the deliverable is the self-contained HTML opened in the browser, exactly like the existing blueprint flow.
- The Experience Blueprint is re-rendered at each checkpoint (the skeleton after Phase 2, more cells after the tech decisions, complete at Phase 5) by rewriting its JSON and opening it again. See "Show it filling" in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md).
- The renderers are stable. Between runs and between different app ideas, only the JSON changes.

## The shared engine.css

Always link it with `<link rel="stylesheet" href="engine.css">`. Never redefine its tokens in a board's own `<style>`. It gives every board:

- `:root` design tokens (the canvas colors, the ink colors, the brand blue and purple, the sticky-note colors, the status dot colors, the fonts).
- `.head` for the board header (crumb, title, sub).
- The sticky-note family: `.note` (plus `.sm` and `.lg` sizes, the color classes, the `.pin` tape nub, and the `.tilt-*` rotations).
- `.tape` for lane and section labels, with its color variants.
- `.ebox` for the editorial blueprint box, `.dot` for the garage-sale dot sticker, `.chip` for a small legend chip.
- The two canvas backgrounds: `.canvas-dots` (the warm dotted FigJam canvas) and `.canvas-blueprint` (the faint grid).
- `.stage`, the fixed-size frame every board sits inside.

A board's own `<style>` block is only for layout that is unique to that board (its grid, its quadrants, its lanes). The shared look stays in `engine.css`.

## The colors carry meaning, keep them

Do not rebrand these. They are not decoration. The legend on each board tells the reader what each color means, so changing them would break the board's own explanation of itself.

- For the Experience Blueprint layers, see the color list in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md).
- For the Opportunity Map, the Competitor Matrix, and the Story Map, the status colors line up: green means "well" or the gap to build, amber means "poorly" or table stakes, and a dashed border means "doesn't do it" (matrix) or "a hunch, not yet confirmed" (opportunity map).

## The footer

Every board carries the exact text **Created using Vibe-Check skill**, as a link to the skill's repo `https://github.com/TexasBedouin/vibe-check` (the word "Vibe-Check" is styled in brand-blue, underlines on hover, and opens in a new tab). It is hardcoded in each renderer's own markup, not passed in as data, so it cannot be dropped from any board. If you ever build a new renderer for this engine, hardcode that same footer link the same way.
