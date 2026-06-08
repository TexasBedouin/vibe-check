# How Your AI Should Work With You

The plan's **House Rules** are about the code your AI writes. This file is about something different: how your AI *behaves* while it builds with you. Four ground rules.

They come from Andrej Karpathy's observations about where AI coding tools go wrong, packaged up nicely by the folks at [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT licensed). Credit to them. What's below is the same wisdom, retold for someone building their first app, with the exact words you can say to your AI to make it happen.

Here's the thing to understand first. Out of the box, an AI coding tool is eager. It wants to please you, fast. Left alone, that eagerness turns into three habits that quietly wreck a beginner's project: it guesses what you meant, it overbuilds, and it "improves" things you never asked it to touch. These four rules are how you keep the eagerness and lose the damage. Put them in your project guide (the CLAUDE.md file) so your AI follows them every session.

This is the other half of the deal we set up at the very start. You're the product manager, the AI is the engineer. The House Rules tell the engineer how to write the code. These four tell the engineer how to *work*.

---

## 1. Think before you code (make it pause)

**The trap:** you describe what you want, the AI fills in the blanks with its own guesses, and it confidently builds the wrong thing. You don't catch it until it's done, because it never told you what it assumed.

**The rule:** before writing code for anything that isn't trivial, the AI should say back what it's about to build, point out anything it's unsure about, and ask you instead of guessing. A ten-second check beats an hour of unwinding.

**Say this to your AI:**
> "Before you write any code, tell me in plain language what you're about to build, and ask me about anything that's unclear. Don't guess and run with it."

Beginners almost never do this, and it's the single highest-leverage habit on this list. The questions the AI asks will also teach you what actually matters about your own idea.

---

## 2. Keep it simple (no showing off)

**The trap:** you ask for a small thing, and the AI hands back a sprawling, clever, "future-proof" version with layers and options you never asked for. It looks impressive. It's also now too complicated for you (or the AI) to safely change later.

**The rule:** build the simplest thing that actually solves the problem in front of us. No features nobody asked for. No machinery built for an imaginary future that may never come.

**Say this to your AI:**
> "Build the simplest version that solves this. No extra features, no 'just in case' code, no clever abstractions. If you think something fancier is worth it, ask me first and tell me why."

Simple code is code you can understand, and code your AI can keep working in. Clever code is where projects go to get stuck.

---

## 3. Change only what I asked (don't redecorate)

**The trap:** you ask for one small fix, and the AI rewrites three files that were working perfectly fine, "tidies up" code it doesn't fully understand, and breaks two things in the process. This is the exact feeling behind "my AI keeps breaking stuff every time I ask for something."

**The rule:** touch only what the task needs. Leave working code alone, including its existing style. No surprise refactors, no side quests, no reaching into unrelated corners of the app.

**Say this to your AI:**
> "Only change what's needed for this specific task. Don't touch, rewrite, or 'improve' anything else, even if you think it could be better. If you spot something worth fixing elsewhere, just tell me, don't do it."

This one rule prevents more beginner heartbreak than almost anything. A small, contained change is easy to check and easy to undo. A sprawling one is how a working app quietly becomes a broken one.

---

## 4. Aim at a finish line (not just a command)

**The trap:** you toss the AI a vague instruction ("make the signup better"), it does *something*, you're not sure if it's right, and you're off into endless back-and-forth with no way to tell when you're actually done.

**The rule:** instead of barking an order, give the AI a clear, checkable description of what "done" looks like, and let it keep working until all of it is true. You're handing it a finish line to run at, not just a direction to start walking.

**Say this to your AI:**
> "Here's how we'll know this is done: [list the things that must be true: the user can do X, it shows Y when it fails, it works on a phone]. Keep working until all of those are true, then show me how each one checks out."

A finish line turns a fuzzy request into something the AI can actually aim for, and something you can actually verify. It also quietly forces you to know what you want, which is the whole job of a product manager.

---

## Putting it in the plan

Drop a short version of these four into the project guide (CLAUDE.md) so the AI reads them every session. Something like: *"Before coding non-trivial work, say what you'll build and ask about anything unclear. Build the simplest thing that works. Change only what the task needs and leave everything else alone. Work toward a clear definition of done and verify it."*

That's it. Four habits. They cost you nothing and they turn an eager-but-reckless assistant into one that actually behaves like a careful engineer working for you.
