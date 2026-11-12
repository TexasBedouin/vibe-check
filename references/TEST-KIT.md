# The Test Kit (the cheap real-world check, ready to run)

Phase 6 in SKILL.md names the riskiest assumption and says "test it cheaply before you build." This file is the kit that makes that doable in a weekend: the tests, the words to send, the numbers that decide pass or fail, and what to do when the results come back. Pull it in at Phase 6, at the validate-only ending, and when someone returns saying "I ran the test."

It pairs with [EVIDENCE-LADDER.md](EVIDENCE-LADDER.md). The ladder says which rung you're on. This kit is how you climb.

## Three rules before any test

1. **Write the pass/fail number first.** Before a single message goes out, write down what result means "keep going" and what means "stop or change." People who decide afterward always find a reason to pass.
2. **Test strangers, not friends.** The right people are the ones from discovery: the folks in the communities you mined.
3. **If it takes two weeks to set up, it's not a test, it's a project.** Pick something you can launch in a day or two.

## Write the test card first (five minutes)

The gap between "just try it" and a real test is about five minutes of writing. Four lines, from Matt Lerner's *Growth Levers*:

- **The risky belief:** "We believe people are not doing ___ because ___."
- **The test:** "To check, we will ___."
- **The prediction:** "We expect ___ to happen, by ___." A number and a date. This is the pass line from rule 1, the same line the result gets judged against later. Write the fail line beside it.
- **The decision:** "If we're right, we will ___. If we're wrong, we will ___."

Two things make the card work.

Write the belief about the *person*, not about your idea. "If I add a discount, more people will sign up" just says "I have an idea and I think I'm right." If it fails you've learned nothing about why. "People aren't signing up because they don't believe it will work for their kind of business" is a belief about them, and either result teaches you something. Starting with "people are not doing X because" pushes you toward the second kind. The beliefs in the table below are shorthand, so turn the one you pick into this form: "they'd pay for it" becomes "people aren't paying for a fix today because nothing handles the awkward part."

Fill in the decision line honestly. If you'd do the same thing whichever way the test comes out, skip the test and just do it.

The card goes in the plan's Riskiest Assumption section and the session file.

## Pick the test that fits the belief

| The risky belief | The test | Rung it earns |
|---|---|---|
| "These people really have this problem" | Five short conversations | 2 |
| "They'd want my answer to it" | Ten DMs, or a one-page waitlist | 3 |
| "They'd want this specific feature" | A fake-door button | 3 |
| "They'd pay for it" | A pre-order or deposit page | 4 |
| "This feature would change what they do" | Do it by hand for a few people (needs existing users) | none, it's a feature check |

Offer one test, your pick, with the reason (Rule 2). A beginner who gets four options runs none of them.

## The scripts

Build every script from the user's real material: the verbatim pain quotes from discovery, the name of the community, the job step where it hurts. Fill the blanks yourself and hand over something they can paste. Never leave a bracket in what you hand them.

### The ten DMs

Send to people who posted about the pain. Short, human, no pitch, no link.

> Hey, I saw your post about [the thing they said, in their words]. I'm looking into that exact problem and trying to understand it before I build anything. Could I ask you a few quick questions about how you deal with it today? No pitch, I don't have anything to sell yet.

If they reply, ask the conversation questions below. Only at the end: "If I built something that did [the one-line answer], would you want to hear when it's ready?"

Mind the community's rules. Some forbid unsolicited DMs. When they do, post one genuinely useful question in the open thread instead and talk to whoever answers.

### The five conversations

Open the way Bob Moesta does: "Imagine I'm filming a documentary about the last time this happened to you. I'll ask about small details, just talk me through it as best you remember." Then take them back to a specific day. Where were they, what had just happened, who else was there? You're listening for the detail that doesn't fit, because the real reason usually hides behind it. Moesta once learned that a couple bought a house after four years of putting it off because they'd been to a friend's funeral that morning. No list of features would have told him that.

The trap is asking people what they *would* do. People are kind and they guess badly about their future selves. Ask what they *did*.

1. "Tell me about the last time [the problem] happened. What was going on?"
2. "What did you do about it?"
3. "What else have you tried? What happened with that?"
4. "What does it cost you, in time or money, when it goes wrong?"
5. "The last time you switched to a new way of doing something like this, what almost stopped you?"
6. "If you could wave a wand, what would be different?"

Never describe your idea until they've answered all six. The second they hear it, they start being polite. Write down their exact words, the same way discovery keeps quotes verbatim.

### The one-page waitlist

One page, four parts, nothing else:

- **A headline in their words.** The strongest pain quote from discovery, turned into a promise.
- **Three lines on what it does.** The differentiator, then the two most important table stakes.
- **One email box.** "Tell me when it's ready."
- **One honest line.** "This isn't built yet. I'm checking whether it should be."

Share it once, in the place they already gather, as a helpful post, not an ad. Count visitors as well as signups, or the number means nothing.

### The fake-door button

For someone who already has a page or an app with visitors. Add a button for the feature that doesn't exist yet. When it's clicked, say so honestly: "We're still building this. Want to know when it's ready?" Count the clicks against the people who saw it. Always tell the truth on the other side of the door. A fake door that pretends is a dark pattern.

### The do-it-by-hand test

This one is for someone who already has users, even a handful. It doesn't climb the evidence ladder for a new idea. It tells you whether a feature is worth building. Because these people already use the product, the "strangers, not friends" rule doesn't apply here.

Before building a feature, deliver it yourself to a few people and watch what changes. Lerner tells of a small team that wanted to build reminders into their training app and had one engineer. The founders sent WhatsApp reminders by hand to half their users and left the other half alone. The reminded half came back far more often, and building the feature became an easy call.

Pick five to ten people. Do the thing manually for a week: send the message, write the summary, make the match. If you can, leave a similar group alone so you have something to compare against. Write down what people did differently, and how long it took you. If nobody's behavior changes when a human does it carefully, software probably won't change it either.

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
| Do it by hand | Most of the people you helped did the thing you hoped for (and clearly more than the group you left alone, if you kept one) | Hardly anyone you helped did it, or no difference from the group you left alone | Fewer than 5 people helped |

Adjust with the user and say why. A pricey product needs fewer yeses. A free one needs more.

Write the test card, the pass line, and the fail line into the plan's Riskiest Assumption section and into the session file (see "Save points" in SKILL.md), so the result can be judged against what was promised.

## Reading the results (the come-back door)

Someone returns: "I ran the test." This is its own entry point. Don't restart the journey.

1. **Get the facts.** What test, how many people reached, what happened, and the pass/fail line that was written down beforehand. If there's a session file or PRD, read it for the line. If no line was ever written, say so gently, and agree on one now before looking at the result.
2. **Call it against the line.** Pass, fail, or too early to tell. Use the line as written. Don't move it. On a fail, run "Find where it broke" below before deciding what it means.
3. **Mine the words.** Replies and conversations are new quotes. Sort them through the same five lenses as discovery and add them to the needs list. A test often teaches more through what people said than through the count.
4. **Update the ladder and the list.** Name the new rung. Re-rate the assumption that was tested, then look at the assumption list again and name the next riskiest one.
5. **Say what's next.** Pick the one that fits:
   - **Pass:** "The bet survived. You've earned the build." Go to planning, or to Build Phase 1 if the plan exists.
   - **Pass, with a twist:** the count passed but people wanted something next to what was offered. Adjust the differentiator, then decide if the twist needs its own quick test.
   - **Fail, and people didn't care (link 6 below):** kind and plain. "This one didn't hold. That cost you a weekend instead of three months." Offer the three honest moves: narrow the group, pivot to what people *did* respond to, or stop.
   - **Fail, and the offer was the problem (link 7):** they wanted it, and the price or the next step was too much. Change the price or shrink the step, and run it again.
   - **Fail, but the test broke before the idea got a fair try (links 1 to 5):** say which link broke, fix that one thing, and run it again. Change one thing at a time, or the rerun won't tell you anything. One rerun per broken link. If the same test has failed twice after fixes, stop blaming the test and treat it as a real fail.
   - **Too early:** name exactly how many more people it takes, and the fastest way to reach them.
6. **Redraw the Verdict Card** with the new rung and the next test, and save the session file.

Celebrate a clean fail as much as a pass. Both are the test working.

### Find where it broke (before you call it a fail)

A test can fail because the idea is wrong, or because the test never gave the idea a chance. Those need opposite responses, so check before you decide. This is not a way to rescue a result you don't like: the pass/fail line still stands, and this only decides what the fail means.

You walk the chain yourself, from what the user already told you. Ask only for what's missing, one question at a time. Stop at the first link that broke (the list is Lerner's). Links 2 to 5 are about a page, a post, or an ad. For conversations and the do-it-by-hand test, only links 1, 6 and 7 apply.

1. **The right people?** Did it reach the specific group from discovery, or whoever happened to scroll past?
2. **Did they notice it?** Views with no clicks can mean nobody stopped to look.
3. **Could they read it?** Show it to someone for three seconds and ask what it said.
4. **Did they understand it?** Ask someone to explain back what it does and what they'd still have to do themselves.
5. **Did they believe it?** A promise can be clear and still not trusted.
6. **Did they care?** It can be understood, believed, and simply not matter to them. This is the link that means the idea is in trouble.
7. **Was the next step worth it?** They wanted it, and the price, the signup, or the effort was more than it was worth to them.

Links 1 to 5 are problems with the test. Fix the first one that broke and run it again. Link 6 is a problem with the idea. Link 7 is a problem with the offer, which is often fixable.

If you can't tell which link broke, the test measured too many things at once. Make the next one smaller.
