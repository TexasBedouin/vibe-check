# Discovery Deep-Dive: ODI and the Competitor Gap

The discovery steps in SKILL.md (Steps 1 to 5) are the beginner-light version of Outcome-Driven Innovation, from Tony Ulwick and the Strategyn team. This file is the detail behind them: how to map needs properly, how to estimate the "served" side without surveying real customers, and how to read the result. Pull it in when you want the fuller method. None of it requires a research team or a survey.

## The honest version of what we're doing

Real ODI surveys hundreds of actual customers (Strategyn suggests 300 to 800 responses) on two dimensions: how important a need is, and how satisfied they are with their current way of meeting it. The opportunity lives where importance is high and satisfaction is low.

A beginner can't run that survey. So vibe-check substitutes:
- **Importance** becomes **Pain**, read from Reddit (how loudly and often people complain).
- **Satisfaction** becomes **Served**, read from the reviews of tools people already pay for, plus a competitor gap analysis (below).

This is directional, not statistical. It's a strong hypothesis built from public evidence, not proof from a representative sample. Say that to the user plainly and hold the results loosely. The point is to be far less wrong than building on a pure guess, not to be certain.

## Needs, mapped to job steps

Don't brainstorm needs in a vacuum. Walk the job steps from Step 1 and, for each step, pull the needs that live there. That way you cover the whole journey instead of fixating on one part.

A need is a quantifiable outcome, framed as Minimize or Maximize (vibe-check's "Reduce/Increase" is the same thing):
- "Minimize the time it takes to fill the pot."
- "Minimize the effort to get the pot under the tap."
- "Maximize the quality of the water."

For a beginner, a few solid needs per step is plenty. The rigorous version surfaces dozens per step from real interviews, then consolidates. You're aiming for the handful that clearly matter, not exhaustiveness.

## Estimating "Served" without a survey: the competitor gap matrix

This is the stand-in for asking customers how satisfied they are. Instead of asking them, look hard at the tools they already use.

1. List the 3 to 7 real solutions people use today for this job (including the ugly ones: a spreadsheet, a notebook, "I just don't").
2. Build a small matrix. Rows are your top needs (from Step 3). Columns are those solutions. In each cell, mark how well that solution meets that need: does it well, does it poorly, or doesn't do it at all.
3. Read the matrix:
   - A row where every column is "well" is **table stakes**. Expected, already solved, you must match it to be taken seriously, but it wins you nothing.
   - A row where every column is "poorly" or "not at all" is a **gap**. That's where an opportunity might live.
   - A column that's strong almost everywhere is a serious incumbent. Respect it.

Source the matrix the same way the skill reaches everything else: web search (`site:g2.com`, `site:capterra.com`, the competitor's own site and pricing/feature pages), the reviews already gathered, and a manual paste from the user if a page won't load. Never invent a competitor or a capability you didn't actually see.

## The rule that matters most: significantly better, or no opportunity

High importance does not mean opportunity. If a need is already well served, you have no room, no matter how much it matters.

The classic trap: "search the web" is hugely important to people, so you build a Google clone. Even if yours is just as good, you lose, because people already have a good-enough solution they trust. Switching costs are real.

So the bar is not "as good as." It's **significantly better on a need people actually feel**, or it's not worth building. The competitor matrix is how you find those gaps honestly.

There are two ways to clear the bar:
1. **Fix an underserved need** that annoys people right now (a gap row in your matrix).
2. **Surface a new need** people didn't realize could be met (new-category creation). Rarer, harder to validate from Reddit, but it's the other door.

## Segment by who you're serving (ICP)

The same need is underserved for one group and perfectly handled for another. So don't score for "users" in the abstract. Pick a specific group and score for them.

- Score the needs as if you were one specific kind of person (the cook, the busy parent, the solo estate-sale operator), not an average of everyone.
- If you have an existing product, two lenses help: your current users (their gaps are churn risks) and people you don't serve yet (their gaps are growth).
- A tell that you picked too broad a group: every need lands middling, nothing stands out as clearly underserved. That flat result means "go narrower," not "there's no opportunity." Pick a sharper group and the gaps appear.

This ties straight to Phase 6.5: the specific group you score for is the same group you'll name as your first 10 users and reach through their community.

## If you ever want the rigorous version

Everything above is the afternoon version. The real thing, when there's budget and a real user base:
- Interview real customers to surface needs in their own words, then consolidate to a clean list per job step.
- Run a survey on Importance and Satisfaction (1 to 5 or 1 to 10) across specific customer groups, 300 to 800 responses for stable results.
- Plot each need by average importance and satisfaction. Bottom-right (important, unsatisfied) is the opportunity zone.
- Strategyn's ODI whitepaper is the canonical, detailed source.

You don't need that to start. You need it to be sure. Start with the proxy, and graduate to the survey once you have users to survey.

## Credits

Outcome-Driven Innovation is Tony Ulwick and Strategyn. The competitor gap matrix here is the beginner stand-in for ODI's satisfaction survey, since a first-timer can't run one.
