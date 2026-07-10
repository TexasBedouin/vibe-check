# Changelog

All notable changes to vibe-check. This project uses semantic versioning, MAJOR.MINOR.PATCH: MAJOR for a big restructure, MINOR for a new technique or section, PATCH for small fixes and wording.

## [2.6.0] - 2026-07-10

The lean core release. The most common piece of feedback on the skill was that SKILL.md had grown too big, and the feedback was right: the whole file loads into the AI's context every time the skill triggers, no matter which door someone came through, and at 16,000 words it was starting a long session deep in the hole. This release finally makes SKILL.md practice the progressive disclosure it preaches. Nothing was deleted: every gate, every formula, every script, and every conversational move survives word for word. What moved was the reference-grade detail, into the reference files that already existed for exactly this purpose (much of it was duplicated there all along). SKILL.md drops from 16,149 words to about 13,000, from 96KB to 78KB, and every session now starts thousands of tokens lighter, which means more room for the session itself and better attention on the rules that stay.

### Added
- **references/PLAN-TEMPLATE.md.** The verbatim blocks for the Phase 8 plan document now live in one paste-ready file: the House Rules block, the checkpoint block format with its five rules, the three pre-launch audit prompts, the Working With Your AI Tool checklist, and the debug-logging prompt. Phase 8 pulls it in when assembling the plan, so the blocks land word for word.
- **The three loop shapes, walked out loud, in references/GROWTH-LOOPS.md.** The "how it spins" narratives for the content, invite, and signal loops (the leaky tap, the shared Figma file, the Livestrong wristband) and the worked call examples moved there from Phase 6.6, next to the taxonomy they belong with.

### Changed
- **Phase 0 now points instead of repeating.** The fetch ladder, the five sorting lenses, and the source-verification protocol were fully specced in references/DISCOVERY-DEEP-DIVE.md and re-taught in SKILL.md. The skill file now keeps the beats, the gates, the scoring formula, the anchors, the evidence floor, and the no-go script, and sends the sweep itself to the deep-dive.
- **Phase 6.6 keeps the diagnostic, the reference keeps the teaching.** The three routing questions, the honest no-loop rule, and the cold-start gate stay; the shape narratives and the bootstrap strategies point at GROWTH-LOOPS.md and COLD-START.md instead of restating them.
- **Phase 8 keeps the outline, PLAN-TEMPLATE.md keeps the blocks.** The 22-section plan structure, the framing scripts, and the build-phase list are unchanged; the verbatim templates moved out.
- Repeated statements now appear once: the depth rule (evidence sets the width of the net, the confidence dial only shapes delivery) and the evidence-tag definitions each have a single home with short callbacks.
- The Reference Files index entries were tightened to what routes a decision, since each file explains itself once opened.

### Fixed
- SKILL.md no longer violates its own design rule ("depth goes in conditional references, SKILL.md stays lean").

## [2.5.1] - 2026-07-10

Launch day. vibe-check is live on Product Hunt. This is a marker release, no behavior changes: it adds the Product Hunt badge and launch note to the README so the repo points visitors at the launch, and it exists mostly so the people watching this repo for releases hear about the launch. Everything in v2.5.0 (the three on-ramps, the Serper.dev find layer, the README front door) is the substance.

Live on Product Hunt: https://www.producthunt.com/products/vibe-check-6?launch=vibe-check-7

## [2.5.0] - 2026-07-09

The on-ramps release. Not everyone starts at the same spot: some people want the whole journey, some just want a straight answer on whether their idea holds up, and some arrive with validation already done and shouldn't have to sit through discovery again. Planning Mode now routes between three named on-ramps, and the ladder's find layer gets an optional keyed upgrade.

### Added
- **Three on-ramps in Planning Mode.** One light routing question right after the confidence dial sends people down the full journey (the default), a **validate-only** pass, or a **plan-only** path for someone arriving with validation in hand. The harm check at the top of Beat 1 runs on every on-ramp. Trigger phrases for the new doors are in the frontmatter description.
- **The findings summary is now a specced deliverable.** The validate-only ending (and the no-go stop) delivers four parts in order: the read, the top needs with evidence tags and their strongest quotes, the differentiator the evidence supports (or what it points at instead), and the open questions with the cheapest way to answer each. It closes with the door open to come back and plan.
- **An evidence ingest step for the plan-only on-ramp.** Arriving research gets mapped onto the same structures discovery would have produced: a needs list with honestly earned tags (the three-source floor still applies), a differentiator that must carry a seen-it tag, and a top-three confirm. Material too thin to support that gets named, with a fast Beat 2 pass offered as the honest fix. Phases 1 through 8 run unchanged from the ingested map.
- **Serper.dev setup steps in references/DISCOVERY-DEEP-DIVE.md.** The optional keyed find layer, spelled out: signup, the `SERPER_API_KEY` env var (never hardcoded), the one-call search pattern with per-source `site:` filters, and reading `organic[]` with the permalink kept for the verification pass. Rung 2 in SKILL.md now points at it, because a Serper key turns rung 1 from "often returns nothing" back into the strongest rung.

### Changed
- **The README is a front door now.** Amer's banner up top, the three on-ramps explained, a services block for people who want the method driven for them, all three examples linked (the AuDHD validation report was missing), and the "What the skill produces" list finally names the boards: the Opportunity Map, the Competitor Matrix, the Crazy 8, the Experience Blueprint, the Story Map, the riskiest-assumption Phase 0, and the glossary.
- **The AuDHD example is explicitly a public sample.** Its claim-by-claim table and methodology detail tables now summarize in prose and note that the full versions ship with the author's engagement work. The report keeps the verdict, the boards, and the 26 quotes.
- Rule 8 now sanctions hand-composed engine-style (or clean mermaid) rendering for the growth-loop circle and the tech-stack view, which were promised as drawn but had no sanctioned way to be drawn.
- The "Words You Now Know" glossary has a home in the interactive PRD (Start Here tab), instead of surviving only inside the raw markdown tab.

### Fixed
- The "80% of the signal" phrasing survived in both example transcripts after 2.2.0 removed it from the skill; both now use the honest "real head start" framing.
- references/COLD-START.md no longer speaks as the owner of Vinti ("my own" → "the author's own").
- The ClearList transcript's version note told two stories (v1.8.0 in the opener, "reflects v2.1.0" in the footer); the footer now says plainly what it is and what it predates.
- examples/README.md said "two examples" while listing three, and now states the current skill version next to what each example reflects.

## [2.4.1] - 2026-07-05

Correction to the 2.4.0 fetch ladder. The Google Custom Search API it floated as an optional direct path turns out to be a dead end for anyone new: Google closed the Custom Search JSON API to new customers and is retiring it entirely on Jan 1 2027. The console still lets you enable it and shows a green badge, but every call returns a permission error, so the suggestion would send people down a long rabbit hole.

### Fixed
- Rung 2 in SKILL.md Step 2 and references/DISCOVERY-DEEP-DIVE.md no longer suggests a Google Custom Search API key. It now says plainly that Google's own API is closed to new users and retiring in 2027, and that the only keyed option is an optional paid third-party search API (Serper, SerpAPI). The real browser + Redlib mirror method stays the primary workaround.

## [2.4.0] - 2026-07-04

The Reddit-access release. Reddit changed the ground under the discovery sweep: since mid-2024 it blocks every search crawler except Google, so the old rung-1 advice ("just search `site:reddit.com`") now quietly returns nothing on most tools, and the fetch endpoints it leaned on are increasingly blocked too. The ladder is rewritten to match reality.

### Changed
- **The fetch ladder tells the truth about Reddit now.** Rung 1 warns that `site:reddit.com` returns zero on most tools (a policy block, not a dead topic) and that no rephrasing gets around it, so stop retrying and move on; the review-site filters still work. Rung 2 is rewritten around the method that actually holds up: a real browser pointed at a Redlib mirror (an alternative Reddit front-end like safereddit.com that fetches Reddit from an allowed address), with a rotating instance list because mirrors are volatile, plus an optional note that a Google Custom Search API key (free ~100/day) is the one sanctioned direct path for heavy repeated use. Rung 3 (hand it to the user) keeps the "never invent a thread you didn't load" floor. Both SKILL.md Step 2 and references/DISCOVERY-DEEP-DIVE.md updated.

## [2.3.0] - 2026-07-04

The verification release. Discovery cast a wide net, sorted the catch, and scored it, but nothing ever went back to confirm the evidence was real. An AI research pass can attach a confident, well-formatted quote to a Reddit thread or a G2 review that never existed, and a single invented source can tilt a whole opportunity score. This release closes that gap.

### Added
- **A source-verification pass, sitting between gathering and scoring.** Step 3 now re-opens every quote's permalink before anything gets scored, using the same fetch ladder, and confirms two things: the page still loads, and the quoted words are actually on it. It fails closed. A source that will not resolve, or whose text is not there, cannot earn a "seen it" tag and cannot carry a need on its own; it gets dropped or flagged "unverified" and kept out of the scoring math. When more than a couple of quotes fail the check, the whole sweep is treated as unreliable and re-run, because a cluster of bad sources means the research pass was inventing, not reading. The honest checked/failed/dropped count gets said out loud when it matters.
- **references/DISCOVERY-DEEP-DIVE.md** carries the fuller version, "Verify sources before they steer anything," with the text-match rule, the fail-closed rule, and the rule that a high fail rate condemns the sweep.

## [2.2.0] - 2026-07-02

The honesty release. A full multi-agent audit of the skill (six review dimensions, adversarial verification, then a live end-to-end dress rehearsal on a real idea) surfaced everything below.

### Added
- **Discovery can now end in "don't build this."** Beat 2 has a third scripted outcome alongside confirm and redirect: when every high-pain need is already well served, the money gut-check fails completely, or the evidence stays mostly guesses after a full sweep, the skill says so plainly and offers the three honest moves: narrow and re-check, pivot to the adjacent underserved need the evidence does point at, or stop with a findings summary instead of a build plan. Knowing not to build something is discovery working, not failing.
- **Evidence now gates the big decisions.** A need earns "seen it" only with roughly three independent sources; a hunch or guess at the top of the ranking triggers a targeted re-search or an explicit demotion; the Step 5 differentiator must carry a "seen it" tag. Plus an anchoring rubric so Pain and Served scores stop being vibes, and two confirm gates so the user corrects the needs list and challenges the top three before anything locks.
- **The riskiest-assumption test is now Build Phase 0** in the plan template, with its own checkpoint, and its own plan section. It was named in Phase 6 and then structurally skippable.
- **An ethics check at the top of Beat 1**, before any grilling or research, for ideas whose core purpose is to harm, deceive, or surveil people who did not opt in.
- **A third evidence tier on the Opportunity Map.** "Guess" now renders with its own dotted style and legend entry; unknown values render as guess, never silently upgraded to hunch.
- **The fetch ladder learned about crawler blocks**: what to do when `site:reddit.com` returns nothing (the PullPush archive, with its limits stated), and a rule to capture permalinks at the moment of capture.
- The session glossary ("Words You Now Know") actually lands in the plan as its own numbered section, as promised.

### Fixed
- **The board render flow never worked from disk.** Since 2.0.0 the docs said to open a renderer beside its JSON file; every modern browser blocks `fetch()` between local files, so that showed an error page. Boards now bake the data in via the same shim the PRD uses. (Empirically reproduced during the audit, in headless Edge, before the fix.)
- Escaping gaps in two renderers (the Opportunity Map's axis labels, the blueprint's phase ranges) and a type-coercion bug that corrupted blueprint phase bars when JSON carried string numbers.
- The invented "80% of the signal" statistic in the honesty script is gone; the paragraph that teaches calibration no longer fabricates precision.
- The job map is now solution-free, as ODI intends: steps name the outcome sought, never the tool used today.
- Stale docs from the 2.1.0 transition: HTML-BLUEPRINT.md no longer claims to be the second deliverable and no longer documents the retired Crazy 3s board; examples/README.md and both example sessions now describe the interactive PRD honestly; README's mermaid and Crazy 3s references updated; DIAGRAM-SYSTEM.md's stale Step 3.5 crumbs, header rule, note-shape rule, and score-badge claim corrected; PRD.md's srcdoc escape order spelled out (& first, then quotes); broken relative links inside references/ fixed; EXPERIENCE-BLUEPRINT.md added to the reference index.
- The assistant no longer claims the author's products as its own ("ClearList, the product this skill's author built").
- Rule 1's question pacing and the confidence dial no longer contradict each other, and research depth is now explicitly set by evidence, not confidence.
- RELEASING.md's manual checklist now includes README.md (bump.sh already required it), and bump.sh fails loudly if the CHANGELOG entry doesn't land instead of shipping a release without one.

## [2.1.0] - 2026-06-20

### Added
- **The interactive PRD, the final deliverable.** At the end of a session vibe-check now produces a single self-contained, tabbed HTML file the human opens in a browser: Start Here, the Evidence (with the Opportunity Map and Competitor Matrix embedded live), the Experience (the Crazy 8 and its convergence, then the Experience Blueprint), the Build Plan (with the Story Map and a tech-stack diagram), Coding Guidelines, Distribution & Growth, Before Launch, Hand to Your AI (the full markdown plan with a copy button), and Continue. Every board is embedded live and self-contained (engine.css inlined, data baked in, no external files), and a machine-readable re-hydration snapshot lets the one file resume the session in a new chat. Footer on every tab: "This PRD was created by the vibe-check skill, by Amer Arab." See references/PRD.md and the live example at examples/clearlist-prd.html.

### Changed
- The interactive PRD replaces the old single-page visual HTML blueprint as the human deliverable. The Experience Blueprint board now lives inside the PRD, and the markdown plan (unchanged) lives in the PRD's "Hand to Your AI" tab.
- references/HTML-BLUEPRINT.md is now the shared HTML scaffold for the visual checkup report, inherited by the PRD.

## [2.0.0] - 2026-06-18

### Added
- **The vibe-check diagram engine (the hero boards).** A shared design layer (`engine.css`) plus input-driven renderers that turn a small JSON description into a polished, FigJam-grade board: the Experience Blueprint, the Opportunity Map, the Competitor Matrix, and the Story Map. Same renderer, any idea. Each board is written to the temp dir and opened in the browser (the same delivery as the visual blueprint), and carries a "Created using Vibe-Check skill" footer linked to the repo. See references/DIAGRAM-SYSTEM.md.
- **The Experience Blueprint as the spine.** A full future-state experience blueprint (scenario, phases, visible and hidden steps, and the layers Touchpoint, Roles, Process, Technology, Policy, Potential Pitfalls, Rationale, Questions, Notes) is now the artifact the whole session fills in. It sketches its skeleton in Phase 2 and fills across the phases like an onboarding progress tracker, then reveals complete in Phase 5. See references/EXPERIENCE-BLUEPRINT.md.
- **Crazy 3s became Crazy 8.** Phase 2 now diverges into device-framed sketches (a phone frame for a mobile app, a browser frame for a web app) of the one main interaction, with the count scaled by the confidence dial, then converges the user's picks into a single combined direction with visible provenance.
- **The confidence dial as a soft knobs model.** The early read of who you are talking to now formally calibrates pace, jargon, hand-holding, decision-making, blueprint-fill cadence, and the Crazy 8 count and fidelity. A dial you keep nudging, not a label.
- **The wide-net discovery reframe.** Step 2 is now "Cast the wide net": one research sweep across Reddit and the reviews of tools people pay for at once (G2, Capterra, Trustpilot, Google Play, the Apple App Store, plus category-specific sources like Amazon, the Chrome Web Store, and Product Hunt), pooling every quote. The core principle: the source does not own the axis, the quote does. Step 3 "Sort the catch" runs five lenses to bucket each quote into Pain or Served, with a source-bias guardrail, and Step 4 scores both axes off the same pooled, tagged corpus. Replaces the split where Reddit owned Pain and review sites owned Served.

### Changed
- references/HTML-BLUEPRINT.md now treats the Experience Blueprint as the centerpiece of the visual blueprint, with the hero boards drawn by the engine instead of plain mermaid.
- Rule 8 ("Draw everything") now draws the hero boards with the engine; inline mermaid is a quick-sketch fallback only.
- The two example sessions and references/MULTI-SIDED.md updated to the wide-net discovery flow.

## [1.8.0] - 2026-06-14

### Added
- **Multi-sided / marketplace discovery awareness (conditional).** A new Phase 0 "how many sides?" gate detects two-sided products, and the skill then discovers *each* side, not just the one the founder happens to be. Per-side ICP scoring (the second side's basics are the first side's table stakes), the other side's struggling moment in Phase 1, both-sides flows in Phase 2, and a compound riskiest-assumption in Phase 6 ("both sides actually show up," and which side is harder to get). Single-sided apps skip all of it.
- **Cold-start brainstorming in Phase 6.6 (conditional).** After finding the growth loop, the skill asks whether the loop can even start. For marketplaces, networks, and social apps that need critical mass, it brainstorms a bootstrap strategy with the user (single-player mode first, start narrow, hold the network behind a liquidity threshold, seed the hard side by hand, seed supply not demand) and names a minimum-liquidity threshold to cross before opening the doors.
- **references/MULTI-SIDED.md** and **references/COLD-START.md**: the fuller playbooks behind both, loaded only when the product is multi-sided or has a cold-start problem.

## [1.7.2] - 2026-06-13

- Fix frontmatter YAML (block-scalar description) so the skill is installable via the skills CLI and indexable on skills.sh

## [1.7.1] - 2026-06-13

- Add an ethical lens and a craft second look to Phase 2, and deepen Crazy 3s into comparable sketches

## [1.7.0] - 2026-06-12

### Added
- **Phase 6.6: Growth Loops (the engine that compounds).** Right after Distribution, the skill now helps a beginner find the one way their app recruits its next user on its own, preferably viral and organic. Reframes growth from a one-way funnel ("pour effort in the top forever") to a loop ("using the app creates the next user"), and gives three buildable shapes in plain language: the content loop (public output found on Google), the invite loop (using it pulls in someone new), and the signal loop (others see and copy). Pushes building the loop into the core flow tied to the aha moment, names the one metric that proves it's spinning, and is honest that not every app has a loop, a faked one is worse than none.
- **references/GROWTH-LOOPS.md:** the fuller playbook, why a loop beats a funnel, the canonical examples (Netflix, LinkedIn, Uber, Substack, Airbnb), the loop taxonomy (big-engine types and viral/content/paid boosters), how to find and sketch your loop, and the four accelerators.
- A matching **Growth Loop** section in the plan document.

### Credits
Brian Balfour / Reforge (growth loops), Casey Winters and Kevin Kwok (loop taxonomy).

## [1.6.0] - 2026-06-09

- De-bloat: dedupe SKILL.md under 500 lines, merge the three build references into MANAGING-YOUR-AI.md, trim the description under the 1024-char limit, fix portability

## [1.5.0] - 2026-06-09

### Added
- **Evidence tags on the opportunity table** (seen it / hunch / guess), so a guess never passes for a finding. If most needs are hunches, that's a go-validate signal, not a green light.
- **Needs in the user's language, not the product's:** a feature named as a need is a solution in disguise (opportunity laundering). Dig under it for the real pain.
- **The framing check (Phase 6):** a blunt honesty pass before building, catching solution-first, outcome mismatch, mostly-guesses, and a solution dressed as a need.
- **The riskiest-assumption test (Phase 6):** name the one belief that sinks the idea if it's wrong, and the cheapest way to test it before building (waitlist, ten DMs, fake door). If the test takes two weeks, it's a project, not a test.
- **Outcome sharpening (Phase 1):** keep the goal singular and checkable ("I'd know it worked if ___"), and trace every decision back to it.

### Credits
Teresa Torres, Continuous Discovery Habits (opportunity solution trees).

## [1.4.0] - 2026-06-09

### Added
- **Step 3.5: Map the competition.** A competitor gap matrix that estimates how well current tools serve each need, the beginner stand-in for ODI's customer satisfaction survey. Feeds the Served score and the table-stakes vs differentiator split.
- **Stronger ODI in Step 4:** ICP segmentation (score for a specific group; a flat middling result means the group is too broad), the "significantly better, or no opportunity" rule, the two ways to win, and a note that Pain/Served are ODI's Importance/Satisfaction.
- Needs are now pulled per job step for fuller coverage.
- **references/DISCOVERY-DEEP-DIVE.md:** the fuller ODI method, competitor matrix template, ICP detail, and an honest rigor caveat (real ODI surveys hundreds of customers; this is a directional proxy).
- **references/CODE-QUALITY-BAR.md:** a build-phase Definition of Done the coding AI clears on every change (works without breaking anything, build/lint/format green, fail-first tests, scope contained, matches conventions). FrontierCode-inspired. Working is the floor, not the bar. The fail-first test rule is also wired into the improvement loop.
- Crazy 3s can render the three directions as a side-by-side comparison board in the HTML blueprint (idea from gstack's design-shotgun, static HTML only).

### Fixed
- Bob Moesta credit link (was broken) now points to The Rewired Group.

### Credits
Tony Ulwick / Strategyn (ODI), Cognition (FrontierCode), Garry Tan / gstack (design-shotgun).

## [1.3.0] - 2026-06-08

### Added
- Phase 6.5: Distribution (the final boss). The skill now forces a specific answer to "who will reach the first users, and how," instead of assuming "build it and they will come." It requires naming the first 10 users, the one place they already gather, and the first concrete move to reach them, and it points back at the Phase 0 discovery communities as the launch channel (discovery and distribution are the same map). Pushes starting distribution before launch, not after. Added a matching Distribution section to the plan document.

## [1.2.0] - 2026-06-08

### Added
- Discovery now reads two sources, one per axis of the opportunity score. Reddit for Pain (how much it hurts), and the reviews of tools people already pay for (G2, Capterra, app stores) for Served (how well current tools handle it). The 1-to-3-star reviews and feature requests sharpen the Served rating and hand Step 5 its table-stakes and differentiator lists directly.
- A willingness-to-pay gut-check in Step 4: is there money already moving in the space (paid products, freelancers hired, ads)? Real pain with no money near it is a yellow flag.
- Review sites use the same fetch ladder as Reddit (site:g2.com / site:capterra.com web search first, then direct read, then manual paste), since they block bots too.

## [1.1.0] - 2026-06-08

### Fixed
- Discovery no longer assumes the AI can fetch reddit.com directly. Reddit blocks bots (Claude Code, for one, can't fetch it), which made Beat 2 fail for testers. Step 2 now reaches Reddit through a ladder: web search with `site:reddit.com` first (how Gemini-style tools read Reddit), then Reddit's `old.reddit.com` / `.json` / `search.json` read endpoints, then a manual hand-off where the user pastes threads back. Reddit-only, no widening to noisier sources.

### Changed
- Rank Reddit findings by signal: a high-upvote, recurring thread beats a stray comment.
- Dropped the "go talk to real users" nudge. This skill validates through Reddit, not by sending people to do interviews.

## [1.0.0] - 2026-06-08

First formally versioned release. Consolidates the skill as it stands after its initial build and several rounds of dogfooding.

### Discovery and planning
- Two modes: Planning Mode and Checkup Mode.
- Confidence dial: read the person first, then match the pace.
- Discovery always runs, in two beats: grill the user first, then reality-check on Reddit and ODI. The skip is always the user's explicit call.
- Future press release for pulling out the vision when the grill stalls.
- Opportunity scoring with real ODI math: Pain + (Pain - Served), ranked.
- V1 scope split into the differentiator (build to win) and table stakes (build to not lose).
- The struggling moment (demand-side) and the aha moment with onboarding-outward design.
- Crazy 3s design directions with sharing and voting, plus the desirable / feasible / viable / usable lens.
- User story mapping to derive the real feature list from the journey.

### Building and beyond
- Build phases with plain-language checkpoints.
- Two deliverables: the markdown plan and a visual HTML blueprint.
- GitHub and deployment basics for absolute beginners.
- Keeping code navigable (the microwave principle), and Checkup Mode for a codebase that has grown messy.
- How your AI should work (four ground rules) and the supervised improvement loop.
- What a skill actually is, for when the idea being planned is itself an AI skill.

### Credits
grill-me and improve-codebase-architecture (Matt Pocock), office-hours (Garry Tan), autoresearch (Udit Goenka), teach (Matt Pocock), the Design Sprint (Jake Knapp), user story mapping (Jeff Patton), Jobs to be Done (Bob Moesta).
