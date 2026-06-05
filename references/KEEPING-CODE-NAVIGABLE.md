# Keeping Your App Easy to Build On

This is hard-won software architecture wisdom, translated for someone who has never coded. The original ideas come from Matt Pocock's `improve-codebase-architecture` skill, and under that, from John Ousterhout's *A Philosophy of Software Design*. Credit where it's due. None of their jargon shows up here. All of their wisdom does.

Use this when you're shaping the **architecture blueprint** (Phase 5) and the **build phases** (Phase 8), and lean on it hard in **Checkup Mode** (see [CODE-CHECKUP.md](CODE-CHECKUP.md)).

---

## Why a beginner should care about any of this

Here's the thing nobody tells a first-time vibe coder. How your code is organized quietly controls how smart your AI tool gets to be.

Your AI is your engineer. But it has a limited working memory. It can only hold so much of your app in its head at one time. If your app is a tidy, well-organized space, the AI can find what it needs, understand it, and build cleanly. If your app is a junk drawer where every feature is smeared across twenty files, the AI gets confused, forgets things, breaks what used to work, and starts going in circles.

You've probably felt this already if you've vibe-coded before. At first the AI is pure magic. Then around week two it starts breaking something every time it fixes something. That's almost never the AI getting dumber. It's the codebase getting messier underneath it.

So this isn't abstract "good engineering hygiene" we're talking about. For a vibe coder, a navigable codebase is the difference between an AI that keeps helping you and an AI that quietly starts fighting you. Frame it exactly that way. It's self-interest, not virtue.

---

## The big idea: the microwave principle

This is the single most useful idea in professional software design, translated:

> A good piece of your app is like a microwave. A LOT happens inside, but the outside is just a few simple buttons.

You have no idea how a microwave actually heats food. You don't need to. You press "Popcorn," and it handles the rest. All the complexity is sealed up inside, behind a simple front.

The opposite, the thing to avoid, is a piece of your app that's all buttons and no microwave. A confusing control panel with forty switches that doesn't really do much. It looks busy. It's just passing your instructions along to something else.

So when you and your AI design a feature, the question to ask is this:

> "Does this do real work behind a simple front door? Or is it just a confusing layer that passes messages along?"

The first kind makes your app easier to build on. The second kind is clutter that makes everything harder.

Say it to the user like this: *"We want each part of your app to be a microwave. Simple to use, powerful inside. Not a cockpit full of switches that doesn't fly the plane."*

---

## The "does this earn its keep?" test

Professional engineers have a sharp little test for whether a piece of code is pulling its weight. Translated:

> Picture deleting a piece of your app. Then ask: did things actually get simpler, or did the same mess just move somewhere else?

If deleting it makes the whole app simpler and nothing important is lost, it wasn't earning its keep. It was a middleman. Cut it.

If deleting it means the same complicated work now has to be copy-pasted into five other places, it was earning its keep. It was doing real work in one tidy spot. Leave it alone.

This is the cleanest way to spot clutter. A part that exists only to pass things along ("take this, hand it to that") usually flunks the test. A part that genuinely handles something hard, so nothing else has to, passes it easily.

You don't need to run this constantly. It's a tool for the checkup, and for those moments when the app feels bloated and you can't tell which parts actually matter.

---

## One thing, one place

> When something breaks, you want exactly ONE place to go fix it. Not ten.

A well-organized app keeps each job in a single home. The way prices get calculated lives in one spot. The way users log in lives in one spot. So when a price comes out wrong, there's one place to look. When login breaks, there's one place to fix.

The messy version is the same logic sprinkled all over the app. The price gets figured a little bit here, a little bit there, slightly differently in three spots. Now a bug means hunting through the whole thing, and fixing it in one place doesn't fix the others.

The practical instruction for the AI, written into the plan: *"Keep each kind of work in one place. If we're calculating something or making a decision in more than one spot, that's the signal it should be pulled into a single home."*

This is also what makes your app cheap to change. Want to tweak how pricing works? One place. That's the payoff.

A close cousin of this is keeping the layers apart. Most apps have three: what the user sees (the screens), the logic that makes decisions (the rules), and where the data is saved (storage). Keep them in their own lanes. The screen asks the rules to do something, the rules ask storage to save it, and nobody reaches across to do another layer's job. When a screen starts calculating prices or talking straight to the database, the lanes have blurred, and that's exactly when a small change in one place breaks something three steps away. In plain terms for the plan: *"screens stay separate from the logic, and the logic stays separate from where data lives."*

---

## Beware the middleman (you already know this one)

The plan already warns about this in a different costume: the **"official SDK, not a third-party wrapper"** rule. Same lesson, just zoomed out.

> A middleman is anything that sits between you and the real thing, promising to make life easier, while quietly taking away your control.

A third-party wrapper around a company's official tool is a middleman, and it can silently drop features. A confusing layer of your own code that just forwards requests is a middleman too.

The instinct to build is this: when something isn't working, ask "am I talking to the real thing, or to a middleman that's gotten in the way?" Strip out the middlemen that don't earn their keep. Talk to the real thing directly.

---

## Lots of small, self-contained pieces, not one giant tangle

There are two ways to get this wrong, in opposite directions, and both hurt the AI.

One is the giant file that does everything. The AI can't hold it in its head. It's like trying to find a single sentence in a book with no chapters.

The other is a thousand tiny fragments, where one feature is sprinkled across forty files. To understand one thing, the AI (and you) has to bounce between dozens of places. It's like a recipe where every ingredient is stashed in a different room of the house.

The sweet spot sits between them:

> Group your app by feature, into pieces that each stand on their own. Everything about "scheduling a pickup" lives together. Everything about "user accounts" lives together. Each piece is its own little microwave. Understandable by itself, simple front door, real work inside.

When a feature is self-contained, the AI can work on it without having to understand your whole app at once. That keeps it fast and accurate, and it keeps it calm. When you describe the architecture in the plan, push for this shape.

---

## Give your app a map (so the AI never gets lost)

Two cheap habits make a codebase dramatically easier for the AI to navigate. Bake both into the plan.

First, a short project guide, often a file called `CLAUDE.md` or something similar. It says, in plain language, what the app is, how it's laid out, and the names of the important pieces. The AI reads it first and gets its bearings instantly. Keep it under about 100 lines. If it sprawls, the AI's working memory fills up with the guide instead of the actual work, so split the details into smaller guides inside the folders they belong to.

Second, consistent names for things. Decide what you call each concept and use that one word everywhere: in the code, in the plan, in your prompts. If it's a "pickup," it's always a "pickup." Never a "collection" one day and an "appointment" the next. Consistent names are how the AI keeps track of what's what. Drifting names are how it loses the thread.

These two habits are the beginner version of what professionals call "domain language" and "architecture decision records." You don't need the fancy versions. You need a map, and you need to call things by the same name twice.

---

## How this shows up in the plan

When you build the architecture blueprint and the build phases, apply all this quietly. You don't need to lecture the user with the whole thing. Instead:

- Shape each feature as a self-contained, microwave-style piece, and say so in plain words: *"We'll build scheduling as one self-contained part, so your AI can work on it without touching the rest of your app."*
- Note in the plan that each kind of work gets one home. One place for prices, one place for login.
- Include the project guide (`CLAUDE.md`, kept lean) and a short list of consistent names as a setup step.
- Carry the middleman warning through. Official SDKs, and talk to the real thing.

Then, weeks later, when the app has grown and started to feel tangled, that's when you bring out the full toolkit. The microwave principle, the earns-its-keep test, all of it, over in [CODE-CHECKUP.md](CODE-CHECKUP.md). Planning plants the habits. The checkup keeps them alive.
