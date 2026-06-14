# Changelog

All notable changes to vibe-check. This project uses semantic versioning, MAJOR.MINOR.PATCH: MAJOR for a big restructure, MINOR for a new technique or section, PATCH for small fixes and wording.

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
