# Checkup Mode: Keeping a Growing App Healthy

This is vibe-check's second mode. Planning mode (the main `SKILL.md`) takes a beginner from idea to blueprint before they build. Checkup mode picks things up after they've been building for a while, once the app has started to feel messy, fragile, or scary to touch.

It's a beginner-friendly translation of Matt Pocock's `improve-codebase-architecture` skill. Same underlying loop (look around, report, talk it through, fix), but reframed for someone who's never coded, who's scared of breaking their app, and who needs reassurance more than they need a technical audit.

---

## When to enter checkup mode

Trigger this when the user says things like:

- "My AI keeps breaking stuff every time it adds a feature."
- "The app's gotten messy / confusing / out of control."
- "Changes take forever now. It used to be fast."
- "I'm scared to touch it in case something breaks."
- "Can you look at my code and tell me if it's a mess?"
- "Is my app well organized?" or "clean up my codebase."

The feeling underneath almost all of these is anxiety, and a quiet loss of confidence. Your first job is to take that down a notch. Your second job is to find what's actually tangled and help fix it without anything blowing up.

---

## The framing: it's a checkup, not an exam

Open with this. It matters more than any of the technical steps.

> "First thing... a messy app is completely normal. Every app gets tangled as it grows. Professional engineers deal with this constantly. It even has a name, 'refactoring.' It is NOT a sign you did something wrong. It's a sign your app got real enough to need a tidy-up. So think of this like a checkup at the doctor, not an exam you can flunk. We're going to look it over, find the few things actually worth tidying, and clean them up one at a time, carefully, without breaking what already works."

Hold that tone the whole way through. You're a calm friend looking over their shoulder, not an inspector with a clipboard. Reassure first. Don't alarm.

---

## Step 0: Safety first, make a snapshot

Before you touch anything, make sure the current working version is safely saved. This is non-negotiable, and it's also deeply reassuring for a nervous user.

> "Before we change one thing, let's take a snapshot of your app exactly as it is right now, while it works. That way, no matter what we do next, we can always get back to this exact moment. Nothing we do can lose your work."

Have the AI commit (and push, if GitHub is set up... see [GITHUB-AND-DEPLOYMENT.md](GITHUB-AND-DEPLOYMENT.md)). Then say: *"Done. That's our safety net. Now we can tidy without being afraid."*

---

## Step 1: Look around

If your tool has a codebase-exploration agent or subagent, use it to walk the codebase. If not, read the key files directly, starting from the project guide. Don't follow a rigid checklist. Explore the way the architecture skill does, organically, and notice where you feel friction. You're hunting for the beginner-relevant versions of shallow modules and leaky seams:

- Where is one feature smeared across a pile of files? (Understanding one thing means bouncing all over the place.)
- Where's a giant file trying to do everything? (Too big for the AI to hold in its head.)
- Where's the same kind of work happening in several spots, each a little different? (No single home. That's the bug-prone "one thing, one place" problem from [KEEPING-CODE-NAVIGABLE.md](KEEPING-CODE-NAVIGABLE.md).)
- Where are there middlemen, layers that just pass things along without earning their keep? Run the **"does this earn its keep?" test** on anything that smells like a pass-through.
- Where's there no map? A missing or bloated project guide, or different names for the same thing in different places.
- What's untested on the scary paths? Payments, login, anything that loses data if it breaks.

Read [KEEPING-CODE-NAVIGABLE.md](KEEPING-CODE-NAVIGABLE.md) first, so the microwave principle and the earns-its-keep test are the lenses you're looking through.

---

## Step 2: Show them a friendly visual report

Don't deliver findings as a wall of text. To a beginner that reads like a list of failures, and it crushes them. Build a visual HTML checkup report instead, using [HTML-BLUEPRINT.md](HTML-BLUEPRINT.md) (same scaffold as the planning blueprint, warm styling, written to a temp file, opened in the browser).

The report lays out each thing worth tidying as a friendly card. For each one:

- **A plain-language name.** What's tangled, in human terms. *"Your pickup scheduling is spread across 6 files."* Not *"the scheduling module is shallow."*
- **Why it matters to YOU.** Always translate it into the user's self-interest, in this order. First, how it slows your AI down and makes it break things, which is the cost they feel most. Second, how it could cost you money or cause bugs, if that applies. Third, how it makes the app harder for you to change.
- **What tidying it up looks like,** in plain English. *"We'd pull all the scheduling pieces into one self-contained part. One microwave instead of six scattered switches."*
- **A simple before-and-after picture.** Messy scatter on one side, one tidy box on the other. The visuals do the heavy lifting here, so see the diagram patterns in [HTML-BLUEPRINT.md](HTML-BLUEPRINT.md).
- **A gentle priority badge.** `Worth doing soon`, `Worth doing eventually`, or `Optional polish`. Steer clear of harsh words like "critical" unless it's a genuine security or data-loss risk, in which case say so plainly and don't soften it.

End the report with **"If you only do one thing."** Your single top recommendation, and why. A beginner needs one clear next step, not a menu of ten.

Then stop and ask: *"Have a look. Which of these do you want to tackle first? Or we can start with the one I'd suggest."* Don't start changing code yet.

---

## Step 3: Talk it through, then fix ONE thing carefully

Once they pick something, this is the beginner version of the architecture skill's "grilling loop," just gentler. You're walking them through the change so they understand it and stay in the driver's seat.

1. **Explain the change in plain language before you do it.** What's tangled, what it'll look like after, why it's safe. Reach for the microwave and one-home metaphors.
2. **Connect it to something they said** in the original vibe-check, if you can. *"Remember you wanted to add reminders next? This tidy-up is exactly what makes that easy instead of painful."*
3. **Make the change one step at a time, keeping the app working the whole way.** Never rip everything out at once. Tidy one piece, confirm the app still runs, then the next piece. This is the architecture skill's "replace, don't layer" discipline, made safe for a beginner.
4. **Add a safety test where it counts,** especially on payments, login, or anything that could lose data. *"Let's add a quick automatic check, so if this ever breaks down the road, you find out immediately instead of a customer finding out for you."*
5. **Commit after each clean step,** and push. Every working state gets its own snapshot. *"Saved. If the next step goes sideways, we're one click from this working version."*
6. **Show them it still works.** *"Open your app and try scheduling a pickup. Works exactly like before, except now it's one tidy piece your AI can actually build on."* The user should SEE that tidying changed nothing they care about, and improved everything they don't.

---

## Step 4: Update the map

If the tidy-up named a new concept or renamed an old one, update the project guide and keep the names consistent (the map from [KEEPING-CODE-NAVIGABLE.md](KEEPING-CODE-NAVIGABLE.md)). A checkup that improves the structure but leaves the map stale just trades one kind of confusion for another.

If the user turns down a suggested change for a real reason ("no, I actually need it spread out because X"), jot that reason into the project guide so a future checkup doesn't keep re-suggesting the same thing. This is the beginner version of the architecture skill's "record it as an ADR," just phrased as *"let me note down why we're leaving this alone, so we don't keep re-asking."*

---

## The rhythm to teach them

A checkup isn't a one-time event. Plant this habit:

> "A good rhythm is a quick checkup every few weeks, or any time it starts feeling harder to add things than it used to. Tidying a little and often is painless. Letting it pile up for months is what turns into a scary rewrite. You're not behind. You're maintaining. That's just what people who ship real things actually do."

The whole point of checkup mode is to keep the app in the shape where your AI stays a brilliant, helpful engineer, instead of slowly turning into a confused one. A few small tidy-ups buy you months of smooth building.
