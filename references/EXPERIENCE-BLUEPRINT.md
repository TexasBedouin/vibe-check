# The Experience Blueprint (the spine)

The Experience Blueprint is the one artifact the whole session is quietly building. Every phase before it fills a different part of the board. By the time you reveal the finished blueprint, the person has already made every decision on it, they just have not seen them collected in one place yet. So do not treat the blueprint as "a step near the end." Treat it as the destination, and treat every phase as how you grow it.

This is the **future-state** version of Practical Experience Blueprinting (Erik Flowers and Megan Miller), adapted for someone designing an app that does not exist yet. They are not mapping a current experience, they are designing the future one. That is why the layers are tuned for design, not observation (Potential Pitfalls and Rationale, not Metrics and Critical Moments). A current-state variant exists for Checkup Mode, see the note at the end.

## Show it filling (the progress map)

A beginner's biggest quiet fear is "how much further is this, and where am I." The filling blueprint answers that on its own, the way a progress tracker in an app's onboarding says "step 3 of 6." It is the visual form of "show the map before the walk," and every tick of progress is a real piece of their product appearing in front of them.

So do not hide the blueprint until the end:

- After **Phase 2 (The Experience)**, sketch the skeleton: the scenario, the steps across the top, and whatever experience cells you already have. Even mostly empty, it gives them the shape of the whole thing.
- At each checkpoint after that, show the board again with more cells filled, and name the progress out loud. "That is the experience and the tech locked in. Two rows left."
- At the end, reveal the complete board as "look how far we got," never as a surprise.

Keep the cadence calm. Re-show the board at a few checkpoints (after the experience, after the tech decisions, and complete at the end), not after every single answer.

## The board

One blueprint maps **one scenario**, the core moment that matters most (usually the aha moment from Phase 2). It is not the whole product. The opportunity map, competitor matrix, cost table, distribution, and growth loop sit alongside it as the strategy and the why-it-is-worth-building. The blueprint answers "what are we building, and how."

Anatomy, top to bottom:

- **Offering + Scenario.** The app's name, and the one moment this board maps.
- **Phases.** Yellow bars grouping the steps into chapters (Discover, Reserve, Pick Up).
- **Steps.** The journey across the top, left to right. Each step is **visible** (white, the user sees it) or **hidden** (black, backstage, they never see it). Hidden steps are real steps, not sub-notes.
- **Layers**, stacked under every step, in this order: **Touchpoint, Roles, Process, Technology, Policy, Potential Pitfalls, Rationale, Questions, Notes.**

Every card is one type, and the color is the type. Leave a cell empty when there is nothing there, an empty Critical cell or empty Touchpoint on a backstage step is itself a finding.

## What fills each layer (phase to cell)

This is the heart of the spine idea. You are not inventing the board at the end, you are harvesting it from the conversation you already had.

| Layer | Filled by | What to pull from that phase |
|---|---|---|
| Scenario | Phase 1 (The Dream) | the core outcome, the moment that matters |
| Steps | Phase 2 (story mapping + happy flow) | the journey, broken into steps, with backstage steps marked hidden |
| Touchpoint | Phase 2 (The Experience) | what the user taps or sees, screen by screen |
| Roles | Phase 0/1 (who it is for) | the user, plus any second side if it is a marketplace |
| Process | Phase 2 ("what has to be true for this step?") | the behind-the-scenes work each step needs |
| Technology | Phase 3 (Connections) + Phase 4 (Decisions) | the integrations and the stack choices, per step |
| Policy | Phase 4 (auth/money) + Phase 7 (privacy/legal) | the rules they are choosing to set |
| Potential Pitfalls | Phase 2 (rough-day, edge, stress test) + Phase 6 (riskiest assumption) + Phase 6.6 (cold-start) | every place this could break |
| Rationale | Phase 0 (opportunity scores) + Phase 4 (why this tech) | the why behind each decision |
| Questions | every "hunch/guess" tag and "revisit later" you flagged | the open unknowns |
| Notes | Phase 0 (the real quotes and observations) | context that does not fit elsewhere |

**Tech comes after the experience, never before.** Deciding the stack in a vacuum freezes a beginner ("what database should I use?" is terrifying and abstract). But once the experience rows are on the board, the tech question becomes concrete and almost answers itself: "Step 5 needs to hold a reservation and run a 48-hour timer, what is the simplest thing for that?" The blueprint turns one scary decision into a handful of small, obvious ones anchored to real steps. So the board drives the tech-stack conversation in Phase 4, and then absorbs the answers into the Technology and Process rows. The existing phase order (Experience, then Connections, then Decisions, then Blueprint) already does this. Keep it.

## How to fill a cell (the facilitation flow)

When you do fill cells live, do it the vibe-check way: one question at a time, offer your own answer, explain a layer the first time it shows up, and skip layers that are clearly empty. For a confident user, batch a few. For a true beginner, one at a time, and always offer a default they can accept or argue with.

The prompts, in plain beginner language (future-tense, because they are designing):

| Layer | Ask them |
|---|---|
| Steps | "What is the key action that defines this step? Is it something they see, or behind the scenes?" |
| Touchpoint | "What do they actually tap or see here?" |
| Roles | "Who needs to be involved at this step?" |
| Process | "What has to happen behind the scenes for this to work?" |
| Technology | "What tool or system might do that work? I will suggest one if you are not sure." |
| Policy | "Any rule we want to set here, like 'must verify email'?" |
| Potential Pitfall | "What could break this step, for them or behind the scenes?" |
| Rationale | "Why are we designing it this way? So future-you remembers." |
| Questions | "Anything we are still unsure about here?" |
| Notes | "Anything else worth writing down?" |

Do not interrogate them across all nine layers for every step. Use the conversation you already had to pre-fill most cells, then only ask about the gaps and the interesting ones (the touchpoint, the pitfall, the open question). The reveal lands because they built it, not because they sat through fifty questions.

## How it is generated (input-driven)

The blueprint is **input-driven**: you do not hand-write the HTML. You produce a single structured object describing the board, and the renderer draws it. Same renderer, any idea.

The shape (one object):

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
    "roles": { "1": "..." },
    "process": {}, "technology": {}, "policy": {},
    "pitfall": {}, "rationale": {}, "question": {}, "note": {}
  }
}
```

Layers are keyed by step number, so sparse cells are natural (omit a step to leave it empty, use an array for more than one card). A `state` of `"current"` swaps the layer set for Checkup Mode (Critical Moments, Opportunities, Metrics instead of Pitfalls and Rationale).

Render it the same way as the visual blueprint in [HTML-BLUEPRINT.md](HTML-BLUEPRINT.md): write a self-contained HTML file to the temp directory and open it in the browser. The renderer carries the taxonomy, the colors, the layer order, and the beginner hand-holding (a legend that defines every type in plain language, and a one-line hint under each lane). Every board carries the footer **"Created using Vibe-Check skill."**

## Colors (the taxonomy)

Keep these. They carry meaning through the legend, do not recolor them to a brand palette.

- Phase: yellow. Step visible: white. Step hidden: black.
- Touchpoint: blue. Roles: green. Process: light gray. Technology: dark gray. Policy: amber.
- Potential Pitfalls: pink/red. Rationale: light purple. Questions: purple. Notes: light blue.

## For Checkup Mode (current state)

The same board, with `state: "current"`, maps an experience that already exists. The future-state layers Potential Pitfalls and Rationale become Critical Moments, Opportunities, and Metrics. Use it when someone wants to understand or untangle a thing they have already built, not design a new one.
