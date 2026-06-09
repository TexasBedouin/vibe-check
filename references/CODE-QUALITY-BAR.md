# The Code-Quality Bar: a Definition of Done

For the build phase. This is the standard your AI tool clears before it's allowed to say a change is "done." It exists because of one uncomfortable truth: with today's AI, getting code to *work* is the easy part. Getting code that's actually *good* is the hard part, and even the strongest models struggle with it (Cognition's FrontierCode benchmark was built to measure exactly this gap, and the best models still score low).

For a vibe coder that lesson is simple: **working is the floor, not the bar.** "It runs" is not "it's good." And bad-but-working code is precisely what turns into the tangled mess you can't touch later, the one Checkup Mode exists to clean up. So you want to keep the bar high from the start, not pay for it down the line.

## The Definition of Done

Tell your AI: a change is not done until all of these are true. Put a short version in your project guide so it applies every time.

1. **It works, and it didn't break anything that worked before.** Run it. Then run the thing that already worked and confirm it still does. New code that quietly breaks old code is the most common own-goal.
2. **The build, the linter, and the formatter are all green.** Actually run them. Fix the warnings, don't leave a pile of them. If the project has a format command, run it so the code matches the house style instead of drifting.
3. **The tests actually test something (the fail-first rule).** A test that passes even on the broken code is theater. A real test fails before the fix and passes after. If you write a test, check that it would have caught the bug, by confirming it fails on the old version first.
4. **The change touched only what it needed to.** No drive-by rewrites, no "while I was in there" refactors of unrelated files. Small, contained changes are easy to check and easy to undo (this is the "change only what I asked" rule from [HOW-YOUR-AI-SHOULD-WORK.md](HOW-YOUR-AI-SHOULD-WORK.md)).
5. **It follows the project's own conventions and reads clearly.** Same names, same patterns, same structure as the rest of the code (the House Rules and the project map). A stranger, or future you, should be able to read it without a tour.

## How to use it

- **At every build checkpoint**, the AI runs this list before it reports the phase done. Not "I think it works," but "here's the build passing, here's the test failing-then-passing, here's that I only touched these files."
- **Say it plainly to your AI:** *"Before you tell me this is done: run the build and the linter and make them pass, show me a test that fails on the old code and passes on the new, and confirm you only changed what this task needed."*
- **When something feels off later**, this same list is your checklist for what "good" was supposed to mean.

Most of this the skill already pushes for (scope discipline, conventions, proving the change). The three worth saying out loud, because they get skipped most: **make the build and linter green, write tests that fail first, and remember that working is the floor, not the bar.**

## Credit

The "is this actually mergeable, not just correct" framing, and the fail-first test idea, are drawn from Cognition's FrontierCode benchmark, translated here into a few plain instructions for a first-time builder.
