# The Test Kit (the cheap real-world check, ready to run)

Phase 6 in SKILL.md names the riskiest assumption and says "test it cheaply before you build." This file is the kit that makes that doable in a weekend: the tests, the words to send, the numbers that decide pass or fail, and what to do when the results come back. Pull it in at Phase 6, at the validate-only ending, and when someone returns saying "I ran the test."

It pairs with [EVIDENCE-LADDER.md](EVIDENCE-LADDER.md). The ladder says which rung you're on. This kit is how you climb.

## Three rules before any test

1. **Write the pass/fail number first.** Before a single message goes out, write down what result means "keep going" and what means "stop or change." People who decide afterward always find a reason to pass.
2. **Test strangers, not friends.** The right people are the ones from discovery: the folks in the communities you mined.
3. **If it takes two weeks to set up, it's not a test, it's a project.** Pick something you can launch in a day or two.

## Pick the test that fits the belief

| The risky belief | The test | Rung it earns |
|---|---|---|
| "These people really have this problem" | Five short conversations | 2 |
| "They'd want my answer to it" | Ten DMs, or a one-page waitlist | 3 |
| "They'd want this specific feature" | A fake-door button | 3 |
| "They'd pay for it" | A pre-order or deposit page | 4 |

Offer one test, your pick, with the reason (Rule 2). A beginner who gets four options runs none of them.

## The scripts

Build every script from the user's real material: the verbatim pain quotes from discovery, the name of the community, the job step where it hurts. Fill the blanks yourself and hand over something they can paste. Never leave a bracket in what you hand them.

### The ten DMs

Send to people who posted about the pain. Short, human, no pitch, no link.

> Hey, I saw your post about [the thing they said, in their words]. I'm looking into that exact problem and trying to understand it before I build anything. Could I ask you two quick questions about how you deal with it today? No pitch, I don't have anything to sell yet.

If they reply, ask the conversation questions below. Only at the end: "If I built something that did [the one-line answer], would you want to hear when it's ready?"

Mind the community's rules. Some forbid unsolicited DMs. When they do, post one genuinely useful question in the open thread instead and talk to whoever answers.

### The five conversations

The trap is asking people what they *would* do. People are kind and they guess badly about their future selves. Ask what they *did*.

1. "Tell me about the last time [the problem] happened. What was going on?"
2. "What did you do about it?"
3. "What else have you tried? What happened with that?"
4. "What does it cost you, in time or money, when it goes wrong?"
5. "If you could wave a wand, what would be different?"

Never describe your idea until they've answered all five. The second they hear it, they start being polite. Write down their exact words, the same way discovery keeps quotes verbatim.

### The one-page waitlist

One page, four parts, nothing else:

- **A headline in their words.** The strongest pain quote from discovery, turned into a promise.
- **Three lines on what it does.** The differentiator, then the two most important table stakes.
- **One email box.** "Tell me when it's ready."
- **One honest line.** "This isn't built yet. I'm checking whether it should be."

Share it once, in the place they already gather, as a helpful post, not an ad. Count visitors as well as signups, or the number means nothing.

### The fake-door button

For someone who already has a page or an app with visitors. Add a button for the feature that doesn't exist yet. When it's clicked, say so honestly: "We're still building this. Want to know when it's ready?" Count the clicks against the people who saw it. Always tell the truth on the other side of the door. A fake door that pretends is a dark pattern.

### The pre-order page

The same page as the waitlist, with a price and a way to pay or put down a small deposit, and a clear promise: "You'll be refunded in full if this doesn't ship by [date]." Then keep the promise. Check the payment provider's rules on pre-orders before you take a cent.

## The numbers (starting points, not statistics)

These are rules of thumb to argue with. Small tests are noisy. The point is not that these exact numbers are right. The point is that a number is written down before the test runs.

| Test | Pass | Fail | Too early to tell |
|---|---|---|---|
| Ten DMs | 5 or more reply, and 3 or more ask to hear when it's ready | 2 or fewer reply | Fewer than 10 sent |
| Five conversations | 3 or more describe a recent, specific time it hurt, and something they tried | Most have to think hard to remember one | Fewer than 5 done |
| Waitlist page | About 1 in 5 visitors from the right community leaves an email | Fewer than 1 in 20 | Under 100 visitors |
| Fake door | About 1 in 10 who see the button click it | Fewer than 1 in 50 | Under 100 views |
| Pre-order | 3 strangers pay or put down a deposit | Lots of visitors, none pay | Under 50 visitors |

Adjust with the user and say why. A pricey product needs fewer yeses. A free one needs more.

Write the chosen test, the pass line, and the fail line into the plan's Riskiest Assumption section and into the session file (see "Save points" in SKILL.md), so the result can be judged against what was promised.

## Reading the results (the come-back door)

Someone returns: "I ran the test." This is its own entry point. Don't restart the journey.

1. **Get the facts.** What test, how many people reached, what happened, and the pass/fail line that was written down beforehand. If there's a session file or PRD, read it for the line. If no line was ever written, say so gently, and agree on one now before looking at the result.
2. **Call it against the line.** Pass, fail, or too early to tell. Use the line as written. Don't move it.
3. **Mine the words.** Replies and conversations are new quotes. Sort them through the same five lenses as discovery and add them to the needs list. A test often teaches more through what people said than through the count.
4. **Update the ladder and the list.** Name the new rung. Re-rate the assumption that was tested, then look at the assumption list again and name the next riskiest one.
5. **Say what's next, one of four ways:**
   - **Pass:** "The bet survived. You've earned the build." Go to planning, or to Build Phase 1 if the plan exists.
   - **Pass, with a twist:** the count passed but people wanted something next to what was offered. Adjust the differentiator, then decide if the twist needs its own quick test.
   - **Fail:** kind and plain. "This one didn't hold. That cost you a weekend instead of three months." Offer the three honest moves: narrow the group, pivot to what people *did* respond to, or stop.
   - **Too early:** name exactly how many more people it takes, and the fastest way to reach them.
6. **Redraw the Verdict Card** with the new rung and the next test, and save the session file.

Celebrate a clean fail as much as a pass. Both are the test working.
