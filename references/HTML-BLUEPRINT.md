# The Visual Blueprint (and the Checkup Report)

vibe-check produces two versions of its output, for two very different readers.

First, a markdown plan. That's the precise instruction manual the user hands to their AI coding tool. Dense, specific, complete.

Second, a visual HTML blueprint. That's a friendly web page the human opens in a browser to actually understand what they're building, and to believe they can pull it off.

A wall of markdown is intimidating to someone who has never coded. A visual page with diagrams, cost cards, and a clear build path makes them feel "oh... I can see my whole app, and it's not scary." That confidence is the entire reason this thing exists.

The same scaffold gets reused for the **checkup report** in [CODE-CHECKUP.md](CODE-CHECKUP.md). The technique is borrowed from Matt Pocock's `improve-codebase-architecture` HTML report. The content and tone here are tuned for beginners.

---

## How to generate it

Write a single self-contained HTML file to the operating system's temp directory, so nothing clutters the user's project folder.

- Resolve the temp dir from `%TEMP%` on Windows, or `$TMPDIR` falling back to `/tmp` on macOS and Linux.
- Name it with a timestamp so each run is fresh: `<tmpdir>/vibe-check-blueprint-<timestamp>.html` (or `vibe-check-checkup-<timestamp>.html`).
- Open it for the user. `start <path>` on Windows, `open <path>` on macOS, `xdg-open <path>` on Linux.
- Tell them the full path in chat too, in case it doesn't pop open on its own.

Styling and diagrams come from CDNs, so the file stands completely on its own. No build step, nothing to install.

- Tailwind (`https://cdn.tailwindcss.com`) for layout and styling.
- Mermaid (ESM import from a CDN) for the flow and architecture diagrams the user has already seen in the conversation.

The only scripts in the file are those two CDN includes. Everything else is static HTML. No app code, no tracking, nothing that phones home.

---

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your App Blueprint: {{app name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
  </head>
  <body class="bg-stone-50 text-slate-800 font-sans">
    <main class="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>           <!-- app name, one-line vision, a word of encouragement -->
      <section id="the-goal">...</section>        <!-- the three lines -->
      <section id="who-its-for">...</section>
      <section id="user-flows">...</section>      <!-- mermaid: happy / rough day / edge cases -->
      <section id="features">...</section>        <!-- V1 vs V2 -->
      <section id="architecture">...</section>    <!-- mermaid: friendly-labeled system diagram -->
      <section id="tech-stack">...</section>      <!-- cards: tool / what it does / cost -->
      <section id="cost">...</section>            <!-- table with free-tier details -->
      <section id="timeline">...</section>
      <section id="build-phases">...</section>    <!-- numbered phases + checkpoints -->
      <section id="before-launch">...</section>   <!-- security / legal / accessibility -->
    </main>
  </body>
</html>
```

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

The diagrams carry the weight. For a visual thinker, they explain more than any paragraph could.

- **User flows.** Mermaid `flowchart` for the happy path, the rough-day path, and the edge cases (the three the plan already defines). Color the rough-day and error branches amber, so the user can see "this is what happens when things go wrong, and we've already planned for it."
- **System architecture.** Mermaid `flowchart` with friendly-labeled boxes showing how the pieces connect and how the data moves ("user adds a task → app saves it to the Database → AI Brain reads it → suggests the next one"). Draw the arrows in the direction the data actually travels.
- **Build phases.** A simple vertical stack of numbered cards, each with its checkpoint summary, so the user sees the journey as a set of achievable steps instead of one terrifying leap.
- **Cost.** A plain table. Each service, its free tier, and roughly when it starts costing money. Add a callout for the architecture cost warning from the plan (the "checking every 30 seconds gets expensive" point).

---

## For the checkup report

Same scaffold, different sections. Instead of the planning sections, render the checkup findings (see [CODE-CHECKUP.md](CODE-CHECKUP.md)):

- A reassuring header: *"Your app's checkup. A messy app is normal. Here's what's worth tidying."*
- One card per finding: a plain-language name, why-it-matters-to-you, what tidying looks like, a before-and-after picture, and a gentle priority badge (`Worth doing soon` in amber, `Worth doing eventually` in slate, `Optional polish` in light).
- A closing "If you only do one thing" card with your single top recommendation.

The before-and-after pictures are the centerpiece of each checkup card. You don't need Mermaid for these. Hand-built `<div>` boxes work better and feel more editorial:

- **Scatter into one box.** Before: six little labeled boxes with tangled connecting lines. After: one clean box labeled with the consolidated feature. Shows "smeared across files" becoming "one self-contained piece."
- **Middleman removed.** Before: A → middleman → B. After: A → B directly. Shows a pass-through that didn't earn its keep getting cut.
- **One giant box into tidy sections.** Before: one oversized box crammed with everything. After: a few right-sized labeled boxes.

Keep each picture compact, around 300px tall, so before and after sit comfortably side by side. The user should see the improvement at a glance, before they read a single word.
