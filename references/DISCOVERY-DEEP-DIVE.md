# Discovery Deep-Dive: ODI and the Competitor Gap

The discovery steps in SKILL.md (Steps 2 to 5) are the beginner-light version of Outcome-Driven Innovation, from Tony Ulwick and the Strategyn team. This file is the detail behind them: how to map needs properly, how to estimate the "served" side without surveying real customers, and how to read the result. Pull it in when you want the fuller method. None of it requires a research team or a survey.

## The honest version of what we're doing

Real ODI surveys hundreds of actual customers (Strategyn suggests 300 to 800 responses) on two dimensions: how important a need is, and how satisfied they are with their current way of meeting it. The opportunity lives where importance is high and satisfaction is low.

A beginner can't run that survey. So vibe-check substitutes:
- **Importance** becomes **Pain**, read from the pain-tagged quotes across the whole wide net (how loudly and often people complain). Most of these come off Reddit, but a bitter paid-tool review carries raw pain too.
- **Satisfaction** becomes **Served**, read mostly from the reviews of tools people already pay for, plus the competitor gap analysis (below). Remember the core principle below: the source does not own the axis, the quote does.

This is directional, not statistical. It's a strong hypothesis built from public evidence, not proof from a representative sample. Say that to the user plainly and hold the results loosely. The point is to be far less wrong than building on a pure guess, not to be certain.

## Needs, mapped to job steps

Don't brainstorm needs in a vacuum. Walk the job steps from Step 1 and, for each step, pull the needs that live there. That way you cover the whole journey instead of fixating on one part.

A need is a quantifiable outcome, framed as Minimize or Maximize (vibe-check's "Reduce/Increase" is the same thing):
- "Minimize the time it takes to fill the pot."
- "Minimize the effort to get the pot under the tap."
- "Maximize the quality of the water."

For a beginner, a few solid needs per step is plenty. The rigorous version surfaces dozens per step from real interviews, then consolidates. You're aiming for the handful that clearly matter, not exhaustiveness.

## Cast a wide net: where to look and how to pull it

The core principle, stated plainly: **the source does not own the axis, the quote does.** A Reddit rant can carry "how well is this served" signal. A review of a paid tool can carry raw, unmet pain. So you don't assign Reddit to Pain and review sites to Served and call it a day. You research wide once, pool everything, then let each quote vote for the axis it actually speaks to. This is strictly more signal from the same research.

Cast the net across two kinds of places at once:

- **Reddit, for raw venting.** The subreddits where these people gather, searched with the struggle phrases. This is unfiltered, before-anyone-sold-them-anything pain.
- **The reviews of tools people already pay for.** G2, Capterra, Trustpilot, Google Play, and the Apple App Store are the always-on ones. Add the category-specific sources when they fit: Amazon for physical goods, the Chrome Web Store for browser extensions, Product Hunt for newer tools. These are customers telling you, in their own words, exactly what today's tools get right and wrong.

**The no-product-yet flip.** A funded team mines its *own* reviews and support tickets. A first-timer has none, because nothing is built. So you mine the next best thing: the reviews of competitors and adjacent tools, plus Reddit. Same signal, borrowed from the market that already exists.

**The fetch ladder, the same three rungs for every source.** Reddit and the review sites all block bots, so never just open a link and give up when it fails:

1. **Web search with `site:` first.** Add `site:reddit.com`, `site:g2.com`, `site:capterra.com`, `site:trustpilot.com` (and so on) to your searches. Search engines have already indexed these pages, so the results carry the real quotes even when the page itself won't load. Fair warning, and it's now the norm rather than the exception: since mid-2024 Reddit blocks every search crawler except Google, so on most tools `site:reddit.com` returns zero. That's a policy block, not a dead topic, and no rephrasing gets around it. Don't keep retrying the same search, move to rung 2. The review-site filters are unaffected.
2. **Reach Reddit another way; fetch endpoints for the rest.** For Reddit, the workaround that actually holds up is a real browser (a Playwright-style tool) pointed at a Redlib mirror, an alternative Reddit front-end (e.g. `safereddit.com`) that fetches Reddit from an allowed address and serves plain HTML; scrape that. A plain URL-fetcher fails on the mirror because it can't pass the mirror's bot challenge, so it has to be a real browser. Mirrors are volatile, so keep a rotating list (`eu.safereddit.com`, `redlib.perennialte.ch`, `l.opnxng.com`, and whatever the live redlib instance list shows) and fall through it. Don't reach for a Google API here: Google closed its Custom Search JSON API to new users and is retiring it in 2027, so it returns a permission error no matter how it's configured. The only keyed option left is a paid third-party search API, and the one worth setting up is Serper.dev (see "The Serper.dev upgrade" right below the ladder). The old `old.reddit.com` / `.json` / PullPush archive (`api.pullpush.io`) paths still occasionally work but are increasingly blocked, so don't rely on them. For review sites: try the cached or mobile version of the page.
3. **Hand it to the user.** If nothing loads, give them the exact sites and phrases to paste in and ask them to copy back what they find. You do the analysis; they're your browser for a minute. Never invent a quote or a competitor you didn't actually see.

**The Serper.dev upgrade (optional, and worth it if you do this more than once).** Serper.dev is a keyed API that queries Google itself, which means `site:reddit.com` works again and every blocked review site becomes findable in one call. It turns rung 1 from "often returns nothing" into the strongest rung on the ladder. If the user is willing to spend five minutes:

1. Sign up at `serper.dev` (email, no card). New accounts start with a pile of free credits; after that it's roughly a dollar per thousand searches.
2. In the Serper dashboard, copy the API key.
3. Store it as an environment variable named `SERPER_API_KEY`. Never paste the key into code, a chat, or a plan document; that's the same "keys are secrets" rule the build phase teaches.
4. Search with one call per query:

```bash
curl -s -X POST https://google.serper.dev/search \
  -H "X-API-KEY: $SERPER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"q":"site:reddit.com <struggle phrase>","num":10}'
```

Swap the `site:` filter per source (`site:g2.com`, `site:capterra.com`, `site:trustpilot.com`, and so on). Read the `organic[]` array in the response: each item carries `link`, `title`, `snippet`, and often `date`. Keep the `link` as the quote's permalink, because the verification pass below needs it. Serper finds the threads; reading them in full still goes through rung 2's browser-and-mirror route, since the API returns snippets, not whole pages.

**Capture the permalink while you're there.** Any quote that might end up in the plan or on a board should carry its thread or review URL from the moment you grab it. A quote you can't point back to is a quote you'll end up defending from memory.

**Verify sources before they steer anything.** Capturing a permalink is not the same as confirming it is real. An AI research pass can produce a confident, well-formatted quote attached to a Reddit thread or a G2 review that does not exist, and a single hallucinated source can tilt a whole opportunity score. So there is a verification pass between gathering and scoring, and it is not optional:

1. **Re-fetch every deliverable-bound source.** For each quote or competitor-matrix claim you intend to keep, go back to its URL and confirm the page resolves and the quoted text is present on it. Use the same three-rung ladder; a source you cannot re-fetch by any rung has not been verified.
2. **Text match, not gist match.** The words in your notes must be findable at the URL (only `[...]` elisions allowed). Page loads but the sentence isn't there means the quote was reconstructed from memory: correct it to the real text or drop it.
3. **Fail closed.** A source that fails either check cannot lift a need to **seen it** and cannot carry a need alone. Cut it, or keep it flagged "unverified" and exclude it from the scoring math.
4. **A high fail rate condemns the whole sweep.** A stray dead link happens. Several failing quotes means the research pass was inventing, so throw the batch out and re-research rather than salvaging pieces of it.

Record the verification outcome (how many checked, how many failed, how many dropped) so it can be stated plainly later. That count is what separates a directional finding from a fabricated one.

**The confidence dial sets the net's width.** A nervous first-timer gets Reddit plus the two or three most obvious review sites, enough to ground the idea without overwhelming them. A confident user making a specific claim gets the full net so the reality-check has teeth. Cast wide first, then prune in the sort. Narrowing too early is how you miss the signal that would have changed the plan.

## Sort the catch: five lenses

Once the net is in, you have a pile of raw quotes from both kinds of source. Sort each one through five lenses, borrowed from a sales-research method and reframed for a builder deciding *what to build* rather than someone selling. Each lens feeds a specific downstream artifact, so nothing you gather goes to waste.

- **Lens A, what's already nailed.** From glowing reviews, especially the ones with numbers or concrete outcomes, read which needs are *already* well served. That tells you high Served, the table stakes you must match, what "great" looks like in this category, and that money is genuinely moving. (Read the reviews, not the marketing copy.)
- **Lens B, pain language, verbatim.** Capture the exact words for the before-state: "before X we were...", "the biggest frustration was...", "we couldn't ___ until...", "I gave up and just...". This feeds the Pain score, the plan's "problem in their own words" line, and any honest before/after story you tell later. Keep the user's exact language; do not paraphrase the pain into product-speak.
- **Lens C, objection mapping.** From the 1-to-3-star reviews and the "cons," group the complaints by theme and note how often each one recurs. A complaint that recurs *and* is handled badly everywhere is both a low Served score and differentiator fuel. A complaint that's actually praise-with-caveats, or something praised everywhere, is table stakes. This lens is the engine of the Served rating.
- **Lens D, switching and displacement.** Watch for "we switched to X," "I wish it did Y," and the missing-feature requests. The reason people move from one tool to another is the gap worth owning. This feeds the competitor matrix and points straight at the differentiator.
- **Lens E, buyer language.** The reviewer's stated role or title validates the ICP, your ideal customer profile, the one specific kind of person you're building for (it ties directly to "score for a specific group" and your first 10 users). The "vs [competitor]" phrasing and the category words they use reveal who belongs in the matrix and what language to use later for distribution and SEO.

**Tag every item you keep**, four small fields, so a guess never wears a finding's clothes:
- which need it touches,
- whether it speaks to **Pain**, **Served**, or **both**,
- its source (which site, which sub),
- evidence strength: **seen it / hunch / guess** (the same tags the skill already uses). A need only earns **seen it** when at least three independent sources back it up (different people in different threads or reviews, not one loud thread); with fewer, it stays a hunch.

Keep this light and directional, not a CRM. Per item, capture the verbatim quote, the source, and the rating / role / date *if it's there*. A star rating is a cheap Served proxy (1 to 3 stars usually means badly served), but it's optional, not required.

### The source-bias guardrail

Each kind of source leans a particular way, and naming the lean is how you keep the ODI proxy honest:

- **Reddit over-represents the frustrated and the unserved.** People mostly post there when something is broken or they've given up. Don't let that volume convince you that *every* tool in the space fails. The happy users are quietly using their tool and never posting.
- **Review sites over-represent current paying customers.** Someone who tried three tools, found none that fit, and walked away rarely writes a review. So a generally-satisfied review page can understate the real pain felt by all the people who never found a tool worth keeping.

The fix is not to rigidly assign each site to one axis. The fix is to *tag the bias* on the quotes you pull, and to weight accordingly when you score. A pile of furious Reddit threads plus a wall of calm 4-star reviews is not a contradiction; it's two different populations, and the truth is usually between them.

## Estimating "Served" without a survey: the competitor gap matrix

This is the stand-in for asking customers how satisfied they are. Instead of asking them, look hard at the tools they already use.

1. List the 3 to 7 real solutions people use today for this job (including the ugly ones: a spreadsheet, a notebook, "I just don't").
2. Build a small matrix. Rows are your top needs (from Step 3). Columns are those solutions. In each cell, mark how well that solution meets that need: does it well, does it poorly, or doesn't do it at all.
3. Read the matrix:
   - A row where every column is "well" is **table stakes**. Expected, already solved, you must match it to be taken seriously, but it wins you nothing.
   - A row where every column is "poorly" or "not at all" is a **gap**. That's where an opportunity might live.
   - A column that's strong almost everywhere is a serious incumbent. Respect it.

Source the matrix from the wide net you already cast (see "Cast a wide net" above), the reviews you already gathered and sorted, and a manual paste from the user if a page won't load. Never invent a competitor or a capability you didn't actually see.

## The rule that matters most: significantly better, or no opportunity

High importance does not mean opportunity. If a need is already well served, you have no room, no matter how much it matters.

The classic trap: "search the web" is hugely important to people, so you build a Google clone. Even if yours is just as good, you lose, because people already have a good-enough solution they trust. Switching costs are real.

So the bar is not "as good as." It's **significantly better on a need people actually feel**, or it's not worth building. The competitor matrix is how you find those gaps honestly.

There are two ways to clear the bar:
1. **Fix an underserved need** that annoys people right now (a gap row in your matrix).
2. **Surface a new need** people didn't realize could be met (new-category creation). Rarer, harder to validate from Reddit, but it's the other door.

## Segment by who you're serving (your ideal customer profile)

The same need is underserved for one group and perfectly handled for another. So don't score for "users" in the abstract. Pick a specific group and score for them.

- Score the needs as if you were one specific kind of person (the cook, the busy parent, the solo estate-sale operator), not an average of everyone.
- If you have an existing product, two lenses help: your current users (their gaps are churn risks) and people you don't serve yet (their gaps are growth).
- A tell that you picked too broad a group: every need lands middling, nothing stands out as clearly underserved. That flat result means "go narrower," not "there's no opportunity." Pick a sharper group and the gaps appear.
- **For a marketplace, segment per side.** A two-sided product has one ICP per side (the seller and the buyer), and you run this whole exercise once for each. Their top needs usually look nothing alike, and the second side's basics become the first side's table stakes. The fuller method is in [MULTI-SIDED.md](MULTI-SIDED.md).

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
