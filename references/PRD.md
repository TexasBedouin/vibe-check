# The Interactive PRD (the final deliverable)

At the end of a session, vibe-check produces two things for two readers:

1. **The markdown plan**, for the AI coding tool. Dense, specific, complete. This is the "Hand to Your AI" content.
2. **The interactive PRD**, for the human. A single self-contained HTML file, tabbed and navigable, that bundles the whole session: the evidence, the chosen experience, the plan, and how to move forward, with every board embedded live.

The interactive PRD **replaces the old single-page visual blueprint**. The blueprint board still exists, it now lives *inside* the PRD as the centerpiece of the Experience tab. The markdown plan stays, it lives inside the PRD's "Hand to Your AI" tab (with a copy button) and is still the thing the user pastes into their coding tool.

A live example ships at [examples/clearlist-prd.html](../examples/clearlist-prd.html) (served rendered on GitHub Pages).

## When to build it

At the very end, once the session's work is done. It is the binder that the whole session has been filling. Everything from Phase 0 through Phase 8 lands here.

## The tabs

Organize around the session, not around a dev spec. Nine tabs:

1. **Start Here**: the offering, the three lines (goal, workaround, why it hurts), who it's for, the headline numbers (complexity, V1 timeline, cost), and how to use the doc.
2. **The Evidence**: proof it is worth building: the Opportunity Map and Competitor Matrix boards, the real quotes, the #1 underserved need. This is vibe-check's differentiator over a generic PRD.
3. **The Experience**: the lineage, in order: the **Crazy 8** board (the directions explored), the **convergence** (the combined direction), an "this is the most important part" callout tying it to the proven aha moment, then the **Experience Blueprint**. The experience is built on top of the Crazy 8 outcome, so show that.
4. **The Build Plan**: V1 vs V2, the **Story Map** (the journey with capabilities in V1/V2/Later lanes), the build phases with checkpoints, the data model, and a **tech-stack diagram**.
5. **Coding Guidelines**: the house rules so the build starts on solid ground (see [KEEPING-CODE-NAVIGABLE.md](KEEPING-CODE-NAVIGABLE.md) and the Phase 8 house-rules block), with a paste-ready block.
6. **Distribution & Growth**: first 10 users, the channel, the growth-loop diagram, the cold-start plan.
7. **Before Launch**: security, privacy, legal, accessibility, tagged handle-now vs before-launch.
8. **Hand to Your AI**: the full markdown plan in a code block with a copy button.
9. **Continue**: how to take the file anywhere, plus the embedded re-hydration snapshot.

A footer on every tab reads exactly **"This PRD was created by the vibe-check skill, by Amer Arab"**, linked to `https://github.com/TexasBedouin/vibe-check`.

## Boards embedded live and self-contained

Every board is embedded as a live, crisp diagram, not a screenshot, and the file has no external file dependencies. The mechanism, per board:

1. Take the board's renderer HTML (see [DIAGRAM-SYSTEM.md](DIAGRAM-SYSTEM.md)).
2. Inline `engine.css` into it (replace the `<link>` with a `<style>` holding the stylesheet).
3. Bake the data in. For the JSON-driven boards (blueprint, opportunity, matrix, story map), add a tiny `fetch` shim in the head that returns the board's data object for any `data-*.json` request, so the renderer runs with no server. The hand-composed Crazy 8 boards have no data, so they need only the `engine.css` inline.
4. Embed that self-contained board document in the page via an `<iframe srcdoc="...">` (HTML-escape the `"` and `&`). The iframe is sized to the board's native width (1920) and scaled down with a CSS transform to fit the column, so it stays crisp at any zoom.

The result is one HTML file that renders every board with no server and no external files. Google Fonts over a CDN is the only network call, and the page degrades gracefully without it.

## The re-hydration snapshot

Embed a complete machine-readable snapshot of the session in a `<script type="application/json" id="vibe-check-session">` block: the offering, the three lines, the discovery findings and scores, the chosen direction, the V1/V2 features, the tech stack, the data model, the build order, the coding guidelines, distribution, and before-launch. This is what lets the one file carry the whole session. The Continue tab tells the user: open a new vibe-check chat, attach this file, and say "continue from this PRD," and the AI re-hydrates the full context, no session lost.

## Style

Use the ClearList editorial tokens (DM Sans for body, DM Serif Display for headings, the clean gallery palette). Warm and professional, like a well-made handoff doc, not a corporate template. Sticky tab nav, one panel visible at a time. Keep it self-contained: all CSS and JS inline, no build step.

## How it is generated

The skill assembles the PRD from the session, then runs the inline-and-self-contain pass above (a small script that inlines `engine.css`, bakes each board's data in, and swaps the board embeds to `srcdoc`). Write the finished file to the temp directory and open it in the browser, the same delivery as every other artifact.
