# The Visual Blueprint (and the Checkup Report)

vibe-check produces two versions of its output, for two very different readers.

First, a markdown plan. That's the precise instruction manual the user hands to their AI coding tool. Dense, specific, complete.

Second, a visual HTML blueprint. That's a friendly web page the human opens in a browser to actually see what they're building, and to believe they can pull it off.

The centerpiece of that page is the **Experience Blueprint**, the one big board the whole session has been quietly filling in. It is not made cold at the end. It starts as a skeleton after Phase 2 and grows a section at a time as the person makes decisions, so by the time you reveal the finished board they recognize every piece of it. The rest of the page (the goal, who it's for, the features, the cost, the build phases, the distribution, the growth loop) wraps around that board as the supporting story. See [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md) for what the board is and how it fills.

A wall of markdown is intimidating to someone who has never coded. A visual page built around one board they watched grow makes them feel "oh... I can see my whole app, and it's not scary." That confidence is the entire reason this thing exists.

The same scaffold gets reused for the **checkup report** in [CODE-CHECKUP.md](CODE-CHECKUP.md). The technique is borrowed from Matt Pocock's `improve-codebase-architecture` HTML report. The content and tone here are tuned for beginners.

---

## How to generate it

Write a single self-contained HTML file to the operating system's temp directory, so nothing clutters the user's project folder.

- Resolve the temp dir from `%TEMP%` on Windows, or `$TMPDIR` falling back to `/tmp` on macOS and Linux.
- Name it with a timestamp so each run is fresh: `<tmpdir>/vibe-check-blueprint-<timestamp>.html` (or `vibe-check-checkup-<timestamp>.html`).
- Open it for the user. `start <path>` on Windows, `open <path>` on macOS, `xdg-open <path>` on Linux.
- Tell them the full path in chat too, in case it doesn't pop open on its own.

Styling for the page comes from a CDN, so the file stands on its own. No build step, nothing to install.

- Tailwind (`https://cdn.tailwindcss.com`) for the page's layout and styling.
- The hero board and every other diagram are drawn with the **vibe-check diagram engine**, not plain mermaid. The engine is vendored with the skill, so nothing is fetched from a diagram CDN. See [DIAGRAM-SYSTEM.md](DIAGRAM-SYSTEM.md) for the engine, the four boards, their JSON shapes, and how to render one.

Plain inline mermaid stays available only as a throwaway fallback for a quick sketch in chat, never for the boards on this page.

The only script in the page itself is the Tailwind CDN include. Everything else is static HTML. No app code, no tracking, nothing that phones home.

### Rendering the boards

The diagram engine is **input-driven**: you never hand-write board HTML. You produce a small structured JSON object and a vendored renderer draws it (same renderer, any idea). To draw a board at render time, do exactly what the engine doc spells out: copy the renderer (`blueprint.html`, `opportunity.html`, `storymap.html`, or `matrix.html`), its `engine.css`, and a `data-<name>.json` file together into one fresh temp folder, then open the renderer in the browser. Because the renderer fetches its JSON over `file://`, all three files have to sit in the same folder.

The Experience Blueprint is the board you re-render at each checkpoint (skeleton after Phase 2, more cells after the tech decisions, complete at Phase 5) by rewriting its JSON and re-opening it, matching "Show it filling" in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md).

Every board carries the footer **Created using Vibe-Check skill**. It is hardcoded into each renderer, so it can never be dropped. Keep it.

---

## Scaffold

The page leads with the Experience Blueprint as the hero, then wraps the supporting sections around it. The hero is the board the person watched fill, not a fresh render.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your App Blueprint: {{app name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-stone-50 text-slate-800 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>              <!-- app name, one-line vision, a word of encouragement -->

      <!-- HERO: the centerpiece. The Experience Blueprint they watched fill. -->
      <section id="experience-blueprint">...</section>  <!-- the blueprint engine board (see EXPERIENCE-BLUEPRINT.md + DIAGRAM-SYSTEM.md) -->

      <!-- Everything below supports and explains the board above. -->
      <section id="the-goal">...</section>        <!-- the three lines -->
      <section id="who-its-for">...</section>
      <section id="discovery">...</section>       <!-- the Opportunity Map + Competitor Matrix boards (the why-it's-worth-building) -->
      <section id="user-flows">...</section>      <!-- the flow diagrams, rendered with the engine -->
      <section id="features">...</section>        <!-- V1 vs V2, plus the Story Map board -->
      <section id="architecture">...</section>    <!-- the engine architecture diagram, friendly labels -->
      <section id="tech-stack">...</section>      <!-- cards: tool / what it does / cost -->
      <section id="cost">...</section>            <!-- table with free-tier details -->
      <section id="timeline">...</section>
      <section id="distribution">...</section>    <!-- first 10 users, where they gather, the first move -->
      <section id="growth-loop">...</section>     <!-- the loop going around (or the honest no-loop note) -->
      <section id="build-phases">...</section>    <!-- numbered phases + checkpoints -->
      <section id="before-launch">...</section>   <!-- security / legal / accessibility -->
    </main>
  </body>
</html>
```

The hero `#experience-blueprint` is the one board the whole session built. Embed it from the rendered blueprint board, do not redraw it by hand. Its full anatomy (layers, colors, the future and current states) lives in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md), so this page links to it rather than repeating it. The supporting sections each get a one-line, plain-language intro and then point back at the board: "this is the why behind the board above," "these flows are the board read left to right," and so on.

---

## Tone and styling

The look should feel warm and encouraging, not like a corporate dashboard. This is someone's first app. The page should feel like a proud, hopeful kickoff, not a compliance document.

- Lots of whitespace. One friendly accent color (indigo or emerald). Save red strictly for genuine must-handle warnings, like a leaked secret or a payment risk.
- A short, warm header. Something like: *"Here's everything you're about to build. Take your time. Every piece is explained, and you've got this."*
- Each section gets a one-line, plain-language intro before any diagram or table.
- Use the beginner-friendly labels from the plan, never the technical ones. "Database (where your app saves things)," not "PostgreSQL." "AI Brain (makes the suggestions)," not "LLM endpoint."
- Celebrate. After the build-phases section, drop a small banner: *"That's a real, complete app. People have built companies on less."*

---

## Diagram patterns

The diagrams carry the weight. For a visual thinker, they explain more than any paragraph could. They are all drawn with the vibe-check diagram engine ([DIAGRAM-SYSTEM.md](DIAGRAM-SYSTEM.md)), never plain mermaid.

- **The Experience Blueprint (the hero).** This is the centerpiece of the whole page, the board the session has been filling since Phase 2. Lead with it. Its anatomy, layers, colors, and JSON shape live in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md), so do not restate them here, embed the rendered board and let it speak. The semantic colors carry meaning through its legend, so keep them, never recolor them to a brand palette.
- **The discovery boards.** Two boards make the case for why this app is worth building, and they sit just under the hero: the **Opportunity Map** (every need placed by how much it hurts and how well today's tools handle it) and the **Competitor Matrix** (a row everyone handles badly is your gap, a row everyone nails is table stakes). Both come straight from the engine. Their green/amber/dashed status colors mean something, so keep them.
- **User flows.** The happy path, the rough-day path, and the edge cases (the three the plan already defines), rendered with the engine. Color the rough-day and error branches amber, so the user can see "this is what happens when things go wrong, and we've already planned for it." These are the same flows that fed the blueprint's steps, so frame them as "the board above, walked through one path at a time."
- **Story Map.** The journey steps across the top with the V1 / V2 / Later capabilities hung under each, rendered with the engine. This is the skeleton the blueprint grew from, so it belongs near the features section as "here is what V1 has to include."
- **System architecture.** Friendly-labeled boxes showing how the pieces connect and how the data moves ("user adds a task → app saves it to the Database → AI Brain reads it → suggests the next one"), rendered with the engine. Draw the arrows in the direction the data actually travels.
- **Build phases.** A simple vertical stack of numbered cards, each with its checkpoint summary, so the user sees the journey as a set of achievable steps instead of one terrifying leap.
- **Cost.** A plain table. Each service, its free tier, and roughly when it starts costing money. Add a callout for the architecture cost warning from the plan (the "checking every 30 seconds gets expensive" point).
- **Growth loop.** A small circular loop diagram showing how one user's normal use creates the next user (user does the thing → it becomes visible to someone new → that someone signs up → back to the top), rendered with the engine. The arrow that closes the circle is the whole point, so make it visually obvious. If the app honestly has no loop, skip the diagram and render the distribution channel as the growth engine instead, warmly, not apologetically.

---

## The Crazy 3s comparison board

Reused in Phase 2 to show the three design directions side by side, so the user picks by seeing them rather than reading three paragraphs one after another. The idea is borrowed from gstack's design-shotgun, minus the image generation and the local server. Same self-contained HTML, no extra tools.

- Three cards in a row (they stack on mobile). One card per direction.
- Each card holds: the direction's name, a rough sketch of the layout (hand-built `<div>` boxes or a short text wireframe, never a generated image), and a one-line "best for" that says what it optimizes for.
- A short line under the board: *"Tell me which one feels right, or which bits you'd take from each, and I'll combine them into one."* The picking and mixing happen in chat, not in the page.

Keep it dead simple. No buttons, no JavaScript (the only script on the page is the Tailwind include). The board's only job is to make three options easy to compare at a glance. It is a plain Tailwind comparison, not a diagram-engine board, so it does not carry the engine footer.

## For the checkup report

Same scaffold, different sections. Instead of the planning sections, render the checkup findings (see [CODE-CHECKUP.md](CODE-CHECKUP.md)):

- A reassuring header: *"Your app's checkup. A messy app is normal. Here's what's worth tidying."*
- For the hero, the checkup uses the **current-state Experience Blueprint** (the same engine board with `state: "current"`, which swaps in Critical Moments, Opportunities, and Metrics). It maps the experience they already built, so they can see the tangles in context. See Checkup Mode in [EXPERIENCE-BLUEPRINT.md](EXPERIENCE-BLUEPRINT.md).
- One card per finding: a plain-language name, why-it-matters-to-you, what tidying looks like, a before-and-after picture, and a gentle priority badge (`Worth doing soon` in amber, `Worth doing eventually` in slate, `Optional polish` in light).
- A closing "If you only do one thing" card with your single top recommendation.

The before-and-after pictures are the centerpiece of each checkup card. These are not engine boards, so hand-built `<div>` boxes work better and feel more editorial:

- **Scatter into one box.** Before: six little labeled boxes with tangled connecting lines. After: one clean box labeled with the consolidated feature. Shows "smeared across files" becoming "one self-contained piece."
- **Middleman removed.** Before: A → middleman → B. After: A → B directly. Shows a pass-through that didn't earn its keep getting cut.
- **One giant box into tidy sections.** Before: one oversized box crammed with everything. After: a few right-sized labeled boxes.

Keep each picture compact, around 300px tall, so before and after sit comfortably side by side. The user should see the improvement at a glance, before they read a single word.
