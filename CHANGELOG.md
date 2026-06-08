# Changelog

All notable changes to vibe-check. This project uses semantic versioning, MAJOR.MINOR.PATCH: MAJOR for a big restructure, MINOR for a new technique or section, PATCH for small fixes and wording.

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
