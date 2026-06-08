# The Improvement Loop: How to Get Unstuck and Actually Finish

This file is for the messy middle of building, when you're not planning anymore and not done yet. You ask your AI to fix something, it says "done!", you look... and it's not done. You ask again. It changes something else. Three rounds later you genuinely can't tell if you're closer to working or further away. You're going in circles, and the app feels like it's sliding sideways.

There's a way out of that, and it's not "prompt harder." It's a loop.

The idea comes from a thing Andrej Karpathy noticed in machine-learning research, packaged up by [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) (MIT licensed). Credit to them. The one-liner is this: **a clear goal, plus a way to check it, plus small repeated steps, turns chaos into steady progress.** You don't need to understand the research. You need the loop.

---

## Why a beginner needs this

When you don't know how code works, it's easy to let the AI take ten swings at once, accept "it's fixed now" on faith, and end up somewhere worse than you started. The loop fixes that by doing the opposite of all-over-the-place. One small change. One check. Keep it or undo it. Again. Boring on purpose, and boring is what actually finishes apps.

---

## The loop

### Step 1: Name the finish line

Before anything, say what "done and correct" actually looks like, in things you can check. This is rule #4 from [HOW-YOUR-AI-SHOULD-WORK.md](HOW-YOUR-AI-SHOULD-WORK.md) doing real work. Not "make checkout better." Instead: "a logged-in user can buy one item, they see a success screen, and a failed card shows a clear error." Now you have a target you can point at.

### Step 2: Save a snapshot first

Commit the working version before you touch anything (see [GITHUB-AND-DEPLOYMENT.md](GITHUB-AND-DEPLOYMENT.md)). This is what makes the whole loop safe. Every step becomes undoable, so you can try things without fear.

### Step 3: Make ONE small change

Just one. Not ten. The same discipline as a checkup. One change means that when you check in a second, you know exactly what caused the result. Ten changes at once and you're back to guessing.

### Step 4: Check that it actually worked, and didn't break anything else

This is the heart of it. The AI does not get to *tell* you it works. It has to *show* you. Run the app. Run the tests if you have them. Walk the finish-line list from Step 1 and confirm each item with your own eyes. And check that the thing that already worked still works.

> Say this: *"Don't tell me it's fixed. Show me. Run it, walk through each item on our done-list, and confirm the old stuff still works too."*

A claim is not evidence. This one habit will save you more grief than anything else in this whole skill.

### Step 5: Keep it or undo it

If the check passed, keep it: commit, and that's your new safe snapshot. If it didn't, undo it back to the last snapshot and try a different way. Do not pile a second fix on top of a broken first one. That's how the sideways slide starts.

Then repeat from Step 3 until the finish line is met.

---

## Give the loop a memory

Each round, have the AI look at what it already tried so it doesn't keep banging on the same dead end.

> Say this: *"Before you try again, here's what we've already tried that didn't work: [list]. Don't repeat any of those. Tell me what's different about this attempt."*

Without this, an AI will happily suggest the same broken idea three times in slightly different clothes.

---

## When you're going in circles (this is the important part)

If two or three rounds in a row don't move you closer to the finish line, stop changing code. Flailing faster doesn't help. Step back and change the approach instead.

> Say this: *"We've tried a few times and we're not getting closer. Stop. Explain, in plain language, WHY this isn't working and what you actually think is going on. Then suggest a different approach before we touch any more code."*

Sometimes the real problem is that the finish line was fuzzy, or the change is in the wrong place entirely. A beginner's instinct is to keep prompting. The pro move is to stop and re-aim.

---

## Two ways to run it

**Supervised (start here).** You stay in the loop. The AI proposes one change, shows you the check, and you decide keep or undo. Slower, but you stay in control and you learn what's happening. This is the right speed for your first app.

**Autonomous (a power-up you earn).** Once you have real automatic tests, you can hand the AI the whole loop: "keep doing change-check-keep-or-revert on your own until the done-list is all true or you've tried 20 times, then show me the result." This is genuinely powerful. It's also only as safe as your check. If your done-list is weak or you have no tests, an autonomous loop will march in the wrong direction with total confidence and a clean commit history. So earn it: get your checks solid first, then let it run.

---

## Kicking off a supervised loop

> Say this: *"We're going to work in a loop. Here's the finish line: [your checkable done-list]. Commit the current working version first. Then make one small change, run it, and show me how each item on the list checks out, plus proof the old stuff still works. If it passed, commit it. If not, undo it and we'll try a different way. One change at a time. Ready?"*

That's the whole thing. A goal you can check, one small step, real proof each time, and the freedom to undo. It feels slow for about ten minutes, and then you realize you're actually finishing, instead of going in circles.
