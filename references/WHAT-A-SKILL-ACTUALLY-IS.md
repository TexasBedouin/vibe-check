# What an AI Skill Actually Is (and What It Can't Do)

Pull this in when the thing the user wants to build is *itself* an AI skill, assistant, or agent (a coach that lives in Claude, a bot that helps with X, an "AI that watches me and helps"). Beginners almost always arrive with the same wrong picture, and whole features get planned on top of it. Set it straight early, gently, before the plan gets built on sand.

## The wrong picture (what they usually imagine)

Most beginners picture a skill as a little robot that:
- watches everything they do, all day, across every app and project
- turns itself on automatically and is always running in the background
- learns their habits over time and rewrites itself to get smarter

That's a lovely vision. It's also not what a skill is. If you let that picture stand, you'll plan features that can't exist, and the build will hit a wall.

## What a skill actually is

> A skill is a set of instructions the AI reads when it's relevant. That's it.

From that, the real limits follow:

- **It only sees the current conversation.** Not your screen, not your other apps, not your other chats or projects. It works with what's in front of it, in this chat.
- **It doesn't run in the background.** There's no always-on robot watching you. It acts when you're in a conversation where it applies.
- **It can't rewrite or improve itself.** The instructions are fixed until a human changes them. A skill does not learn on its own.

None of this makes skills weak. It just means you design *with* the grain instead of against it.

## How to get what they actually wanted, for real

Take each piece of the wrong picture and translate it into something buildable:

- **"Always on, no remembering to turn it on"** → put the behavior in the tool's **project instructions** (or the project/space the user works in). Anything there is automatically part of every chat in that project. That's the real "always on."
- **"Watches me"** → it reads the conversation you're already having in that project. If you want it to know about work that happened elsewhere, you bring that in (paste it, or connect a tool later).
- **"Remembers me and learns my habits"** → that needs a **memory store**, because the skill itself can't remember. Three options, simplest first:
  1. The AI tool's built-in memory feature, if it has one
  2. A simple notes file the skill reads and updates
  3. A small app or database later (this is the thing that eventually justifies building an app at all)
- **"Improves itself over time"** → in V1, a *human* is the loop: you watch what works and edit the instructions. True self-improvement is a later, bounded feature, and it's only as good as the signal it learns from.

## What this means for the plan

- Be honest in the plan about what V1 can *see* (this conversation) and *remember* (whatever memory store you pick).
- Anything that needs cross-app watching, notifications, or long-term self-learning is almost always a **V2** that needs more than a skill (usually a companion app or connected tools). Park it clearly.
- The good news: a skill plus project instructions plus a little memory is enough to build something genuinely useful in V1, with almost no infrastructure. Lead with that, so the honest limits land as "here's what we can ship now," not "here's what you can't have."
