# Managing Your AI While You Build

Three things that keep your AI tool working like a careful engineer instead of an eager one: the four ground rules for how it should behave, the improvement loop for getting unstuck, and the definition of done that decides when a change is actually finished.

---

## Part 1: How Your AI Should Work With You

The plan's **House Rules** are about the code your AI writes. This part is about something different: how your AI *behaves* while it builds with you. Four ground rules.

They come from Andrej Karpathy's observations about where AI coding tools go wrong. What's below is the same wisdom, retold for someone building their first app, with the exact words you can say to your AI to make it happen.

Here's the thing to understand first. Out of the box, an AI coding tool is eager. It wants to please you, fast. Left alone, that eagerness turns into three habits that quietly wreck a beginner's project: it guesses what you meant, it overbuilds, and it "improves" things you never asked it to touch. These four rules are how you keep the eagerness and lose the damage. Put them in your project guide (the CLAUDE.md file) so your AI follows them every session.

This is the other half of the deal we set up at the very start. You're the product manager, the AI is the engineer. The House Rules tell the engineer how to write the code. These four tell the engineer how to *work*.

### 1. Think before you code (make it pause)

**The trap:** you describe what you want, the AI fills in the blanks with its own guesses, and it confidently builds the wrong thing. You don't catch it until it's done, because it never told you what it assumed.

**The rule:** before writing code for anything that isn't trivial, the AI should say back what it's about to build, point out anything it's unsure about, and ask you instead of guessing. A ten-second check beats an hour of unwinding.

**Say this to your AI:**
> "Before you write any code, tell me in plain language what you're about to build, and ask me about anything that's unclear. Don't guess and run with it."

Beginners almost never do this, and it's the single highest-leverage habit on this list. The questions the AI asks will also teach you what actually matters about your own idea.

### 2. Keep it simple (no showing off)

**The trap:** you ask for a small thing, and the AI hands back a sprawling, clever, "future-proof" version with layers and options you never asked for. It looks impressive. It's also now too complicated for you (or the AI) to safely change later.

**The rule:** build the simplest thing that actually solves the problem in front of us. No features nobody asked for. No machinery built for an imaginary future that may never come.

**Say this to your AI:**
> "Build the simplest version that solves this. No extra features, no 'just in case' code, no clever abstractions. If you think something fancier is worth it, ask me first and tell me why."

Simple code is code you can understand, and code your AI can keep working in. Clever code is where projects go to get stuck.

### 3. Change only what I asked (don't redecorate)

**The trap:** you ask for one small fix, and the AI rewrites three files that were working perfectly fine, "tidies up" code it doesn't fully understand, and breaks two things in the process. This is the exact feeling behind "my AI keeps breaking stuff every time I ask for something."

**The rule:** touch only what the task needs. Leave working code alone, including its existing style. No surprise refactors, no side quests. Unrelated corners of the app stay untouched.

**Say this to your AI:**
> "Only change what's needed for this specific task. Don't touch, rewrite, or 'improve' anything else, even if you think it could be better. If you spot something worth fixing elsewhere, just tell me, don't do it."

This one rule prevents more beginner heartbreak than almost anything. A small, contained change is easy to check and easy to undo. A sprawling one is how a working app quietly becomes a broken one.

### 4. Aim at a finish line (not just a command)

**The trap:** you toss the AI a vague instruction ("make the signup better"), it does *something*, you're not sure if it's right, and you're off into endless back-and-forth with no way to tell when you're actually done.

**The rule:** instead of barking an order, give the AI a clear, checkable description of what "done" looks like, and let it keep working until all of it is true. You're handing it a finish line to run at, not just a direction to start walking.

**Say this to your AI:**
> "Here's how we'll know this is done: [list the things that must be true: the user can do X, it shows Y when it fails, it works on a phone]. Keep working until all of those are true, then show me how each one checks out."

A finish line turns a fuzzy request into something the AI can actually aim for, and something you can actually verify. It also quietly forces you to know what you want, which is the whole job of a product manager.

### Putting it in the plan

Drop a short version of these four into the project guide (CLAUDE.md) so the AI reads them every session. Something like: *"Before coding non-trivial work, say what you'll build and ask about anything unclear. Build the simplest thing that works. Change only what the task needs and leave everything else alone. Work toward a clear definition of done and verify it."*

That's it. Four habits. They cost you nothing and they turn an eager-but-reckless assistant into one that actually behaves like a careful engineer working for you.

The standard for what "done" actually means lives in Part 3 below: it works without breaking anything, the build and linter are green, any test it wrote fails on the old code and passes on the new, it touched only what the task needed, and it matches the project's style. Working is the floor, not the bar.

---

## Part 2: The Improvement Loop: How to Get Unstuck and Actually Finish

This part is for the messy middle of building, when you're not planning anymore and not done yet. You ask your AI to fix something, it says "done!", you look... and it's not done. You ask again. It changes something else. Three rounds later you genuinely can't tell if you're closer to working or further away. You're going in circles, and the app feels like it's sliding sideways.

There's a way out of that, and it's not "prompt harder." It's a loop.

The idea comes from a thing Andrej Karpathy noticed in machine-learning research. The one-liner is this: **a clear goal, plus a way to check it, plus small repeated steps, turns chaos into steady progress.** You don't need to understand the research. You need the loop.

### Why a beginner needs this

When you don't know how code works, it's easy to let the AI take ten swings at once, accept "it's fixed now" on faith, and end up somewhere worse than you started. The loop fixes that by doing the opposite of all-over-the-place. One small change. One check. Keep it or undo it. Again. Boring on purpose, and boring is what actually finishes apps.

### The loop

#### Step 1: Name the finish line

Before anything, say what "done and correct" actually looks like, in things you can check. This is rule #4 above (aim at a finish line) doing real work. Not "make checkout better." Instead: "a logged-in user can buy one item, they see a success screen, and a failed card shows a clear error." Now you have a target you can point at.

#### Step 2: Save a snapshot first

Commit the working version before you touch anything (see [GITHUB-AND-DEPLOYMENT.md](GITHUB-AND-DEPLOYMENT.md)). This is what makes the whole loop safe. Every step becomes undoable, so you can try things without fear.

#### Step 3: Make ONE small change

Just one. Not ten. The same discipline as a checkup. One change means that when you check in a second, you know exactly what caused the result. Ten changes at once and you're back to guessing.

#### Step 4: Check that it actually worked, and didn't break anything else

This is the heart of it. The AI does not get to *tell* you it works. It has to *show* you. Run the app. Run the tests if you have them. Walk the finish-line list from Step 1 and confirm each item with your own eyes. And check that the thing that already worked still works.

> Say this: *"Don't tell me it's fixed. Show me. Run it, walk through each item on our done-list, and confirm the old stuff still works too."*

A claim is not evidence. This one habit will save you more grief than anything else in this whole skill.

**And make sure the test is a real test.** A test that passes even on the broken version is testing nothing. A good test fails before the fix and passes after. So if the AI writes one, have it confirm the test fails on the old code first, then passes on the new. More on this in Part 3 below.

#### Step 5: Keep it or undo it

If the check passed, keep it: commit, and that's your new safe snapshot. If it didn't, undo it back to the last snapshot and try a different way. Do not pile a second fix on top of a broken first one. That's how the sideways slide starts.

Then repeat from Step 3 until the finish line is met.

### Give the loop a memory

Each round, have the AI look at what it already tried so it doesn't keep banging on the same dead end.

> Say this: *"Before you try again, here's what we've already tried that didn't work: [list]. Don't repeat any of those. Tell me what's different about this attempt."*

Without this, an AI will happily suggest the same broken idea three times in slightly different clothes.

### When you're going in circles (this is the important part)

If two or three rounds in a row don't move you closer to the finish line, stop changing code. Flailing faster doesn't help. Step back and change the approach instead.

> Say this: *"We've tried a few times and we're not getting closer. Stop. Explain, in plain language, WHY this isn't working and what you actually think is going on. Then suggest a different approach before we touch any more code."*

Sometimes the real problem is that the finish line was fuzzy, or the change is in the wrong place entirely. A beginner's instinct is to keep prompting. The pro move is to stop and re-aim.

### Two ways to run it

**Supervised (start here).** You stay in the loop. The AI proposes one change, shows you the check, and you decide keep or undo. Slower, but you stay in control and you learn what's happening. This is the right speed for your first app.

**Autonomous (a power-up you earn).** Once you have real automatic tests, you can hand the AI the whole loop: "keep doing change-check-keep-or-revert on your own until the done-list is all true or you've tried 20 times, then show me the result." This is genuinely powerful. It's also only as safe as your check. If your done-list is weak or you have no tests, an autonomous loop will march in the wrong direction with total confidence and a clean commit history. So earn it: get your checks solid first, then let it run.

### Kicking off a supervised loop

> Say this: *"We're going to work in a loop. Here's the finish line: [your checkable done-list]. Commit the current working version first. Then make one small change, run it, and show me how each item on the list checks out, plus proof the old stuff still works. If it passed, commit it. If not, undo it and we'll try a different way. One change at a time. Ready?"*

That's the whole thing. A goal you can check, one small step, real proof each time, and the freedom to undo. It feels slow for about ten minutes, and then you realize you're actually finishing, instead of going in circles.

---

## Part 3: The Code-Quality Bar: a Definition of Done

For the build phase. This is the standard your AI tool clears before it's allowed to say a change is "done." It exists because of one uncomfortable truth: with today's AI, getting code to *work* is the easy part. Getting code that's actually *good* is the hard part, and even the strongest models struggle with it (Cognition's FrontierCode benchmark was built to measure exactly this gap, and the best models still score low).

For a vibe coder that lesson is simple: **working is the floor, not the bar.** "It runs" is not "it's good." And bad-but-working code is precisely what turns into the tangled mess you can't touch later, the one Checkup Mode exists to clean up. So you want to keep the bar high from the start, not pay for it down the line.

### The Definition of Done

Tell your AI: a change is not done until all of these are true. Put a short version in your project guide so it applies every time.

1. **It works, and it didn't break anything that worked before.** Run it. Then run the thing that already worked and confirm it still does. New code that quietly breaks old code is the most common own-goal.
2. **The build, the linter, and the formatter are all green.** Actually run them. Fix the warnings, don't leave a pile of them. If the project has a format command, run it so the code matches the house style instead of drifting.
3. **The tests actually test something (the fail-first rule).** A test that passes even on the broken code is theater. A real test fails before the fix and passes after. If you write a test, check that it would have caught the bug, by confirming it fails on the old version first.
4. **The change touched only what it needed to.** No drive-by rewrites, no "while I was in there" refactors of unrelated files. Small, contained changes are easy to check and easy to undo (this is the "change only what I asked" rule from Part 1 above).
5. **It follows the project's own conventions and reads clearly.** Same names, same patterns, same structure as the rest of the code (the House Rules and the project map). A stranger, or future you, should be able to read it without a tour.

### How to use it

- **At every build checkpoint**, the AI runs this list before it reports the phase done. Not "I think it works," but "here's the build passing, here's the test failing-then-passing, here's that I only touched these files."
- **Say it plainly to your AI:** *"Before you tell me this is done: run the build and the linter and make them pass, show me a test that fails on the old code and passes on the new, and confirm you only changed what this task needed."*
- **When something feels off later**, this same list is your checklist for what "good" was supposed to mean.

Most of this the skill already pushes for (scope discipline, conventions, proving the change). The three worth saying out loud, because they get skipped most: **make the build and linter green, write tests that fail first, and remember that working is the floor, not the bar.**

---

## Credits

- The four ground rules come from Andrej Karpathy's observations about where AI coding tools go wrong, packaged up nicely by the folks at [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT licensed). Credit to them.
- The improvement loop comes from a thing Andrej Karpathy noticed in machine-learning research, packaged up by [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) (MIT licensed). Credit to them.
- The "is this actually mergeable, not just correct" framing, and the fail-first test idea, are drawn from Cognition's FrontierCode benchmark, translated here into a few plain instructions for a first-time builder.
