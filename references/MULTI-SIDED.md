# Multi-Sided Products: Discovering Every Side

The sides-gate in Phase 0 asks one question: *does this only work if two or more different kinds of people both show up?* If yes, it's a marketplace (or a two-sided platform), and the default discovery flow has a trap built in: it grills for **one** user and the ODI rule pushes you to go **narrower** onto that one person. For a marketplace that's only half the job. This file is the other half. Pull it in the moment the gate says multi-sided.

A common beginner miss, and an easy one even for pros: you build for the side you *are* (the seller, because you're the seller), and you never really discover the other side. A marketplace dies there.

## First, name the sides as real people

Don't say "buyers and sellers" in the abstract. Do the Phase 0 "who exactly" grill once **per side**, until each is a person you can picture:

- The **seller**: a 40-something parent moving cross-country in three weeks, garage full of furniture, wants it gone before the truck comes.
- The **buyer**: someone furnishing a first apartment on a budget, scanning local listings on their phone, burned before by no-shows and fakes.

Two different humans, two different worst moments. Write both down.

Some products have **three** sides (a food-delivery app has eaters, restaurants, and couriers). Same rule: name each, discover each. But for a first build, it's usually worth collapsing to the two that matter most and parking the third.

## Discover each side separately

Run the discovery you'd run for one product, once per side:

- **Map each side's job** (Step 1). The seller's job is "clear the pile before the deadline." The buyer's job is "furnish a room cheaply without getting scammed." Different jobs.
- **Pull each side's pain** (Step 2, Reddit). Sellers vent in r/declutter; buyers vent somewhere else entirely. Go to both.
- **Score each side's needs** (Step 4). Two ranked tables, one per side. The buyers' top underserved need will look nothing like the sellers'. That's not a problem, it's the point.

## The dependency map: the other side's basics are YOUR table stakes

Here's the move that separates a marketplace that works from one that doesn't. Write down, for each side, **what it needs from the other side to even bother showing up**:

- The buyer needs: real items (not fakes), a fair price they can trust, a pickup that feels safe, a seller who won't ghost them.
- The seller needs: buyers who actually show up, who don't lowball endlessly, who are easy to coordinate with.

Now the key insight: **the buyer's must-haves are the seller's table stakes.** A seller-facing tool that produces listings buyers don't trust gets no buyers, which means it gets no sellers either, no matter how good the seller experience is. You cannot win one side while ignoring the other's basics. The two sides hold each other up.

So when you set V1 scope (Step 5), the differentiator can live on one side, but the **table stakes must cover both**. Skipping the buyer's trust-and-safety basics to ship the seller's magic faster is the classic way a marketplace launches and then just sits there, empty on one side.

## Map both sides' flows

In Phase 2, draw the core flow **once per side**, plus the moment they meet:

- The seller's happy flow (list → publish → get a reservation → hand it over).
- The buyer's happy flow (find → reserve → schedule → pick up).
- The **handoff** where they touch: the reservation, the message, the booking. That seam is where most marketplace bugs and most trust problems live, so design it on purpose.

The user-story-mapping (features fall out of the journey) then runs twice, once per side, and the union is your real feature list.

## The compound riskiest-assumption

For a single-sided app the riskiest bet is "people want this." For a marketplace it's almost always **"both sides actually show up."** Test both, cheaply, before building:

- Ten DMs to potential sellers AND ten to potential buyers.
- A one-page "are you a buyer or a seller?" waitlist that collects emails for both, so you can see which side is even reachable.

And name the **hard side**: one side is always harder to get than the other (usually supply, the sellers/creators, because making something takes more effort than consuming it). The hard side is the one your whole launch has to crack first, and it's the heart of the cold-start problem.

## Then: the cold-start problem

Discovering both sides tells you *what* to build. It doesn't get the first people in the door. An empty marketplace is worthless to whoever shows up first, on either side, so a multi-sided product almost always has a **cold-start problem**: how do you get enough of both sides at once for the thing to be useful to anyone? That's its own playbook, in **[references/COLD-START.md](references/COLD-START.md)**. Surface it in Phase 6.6.
