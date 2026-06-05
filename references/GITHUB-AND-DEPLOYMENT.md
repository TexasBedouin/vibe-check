# Your Code, Saved Safely, and Out on the Internet

A plain-language guide for someone who has never written code. No jargon without a translation right next to it. Read it with the user when they start building, and again when they're ready to put their app online.

The goal here isn't to turn anyone into a Git expert. Your AI tool can run all of these commands for them. The goal is that when the AI says "I've committed your changes and pushed to GitHub," the user doesn't feel a flash of panic. They know what just happened, and they know it's good news.

---

## Start with the fear, then take it away

Most beginners are quietly terrified of two things:

1. "What if I lose all my work?"
2. "What if I break it and can't get back to when it worked?"

Almost everything below exists to make those two fears disappear. Lead with that. Don't open with "Git is a distributed version control system." Open with "let me show you how to make sure you never lose your work, and how you can always get back to a version that worked."

---

## The three places your app can live

Use this exact mental model. Everything else hangs off it.

### 1. Your computer (this is called "local")

Right now your app lives on your laptop. The files sit in a folder. When you or your AI tool change something, it changes the files in that folder. Only you can see it. Nobody else on Earth can.

> "Local" just means "on your own machine." When someone says "run it locally," or "it works on my machine," they mean the copy sitting on your computer that only you can see.

This is where all the building happens. You build locally, test locally, break things locally, fix them locally. It's your private workshop. Nobody's watching, so make all the mess you want.

### 2. GitHub (this is called "remote")

GitHub is a website that keeps a copy of your whole project up in the cloud, on Microsoft's computers instead of yours. Think of it as three things at once. A backup, so if your laptop goes for a swim, your code is safe. A time machine, where every saved version is kept so you can always rewind. And a meeting point, so if you ever want a teammate, a freelancer, or a hosting service to see your code, this is where they get it.

> "Remote" just means "not on your computer... on someone else's, over the internet." GitHub is the most common remote. Your local folder and your GitHub copy are two copies of the same project that you keep in sync.

### 3. The live internet (this is called "production")

This is your app actually running on the internet, at a real web address, where real people use it. Your code travels from GitHub to a hosting service (something like Vercel) and out onto a live website.

> "Production" is the real, live version that real users touch. When something is "in production," it's out in the world. Breaking production is the thing you stay careful about, because real people are on it.

So here's the whole journey: you build on your **computer**, save it to **GitHub**, then publish it to the **live internet**. Local, remote, production.

---

## What is Git? (and how is it different from just "saving"?)

You already know what saving a file is. So why is there a whole second thing?

When you save a file the normal way, the old version is gone. Overwritten. Git doesn't work like that. Git is like a camera that photographs your entire project every time you tell it to. Each photo is permanent. You can flip back through the album to any moment and say "put everything back exactly how it was right here."

> Git is a tool that remembers every version of your project, forever. Normal saving paves over the past. Git keeps the past, so you can always walk back to it.

Two words your AI will say constantly:

- **Commit** means "take a photo right now, and write a one-line caption for what changed." A commit is one snapshot. The caption might be *"Added the login screen."* Good commits are small and frequent, like saving often in a video game right before the hard part.
- **Push** means "send my latest photos up to GitHub." Committing saves the snapshot on your computer. Pushing copies those snapshots to the cloud, where they're backed up and shareable.

So the everyday rhythm, which your AI does for you, is just this:

```
make a change  →  commit (snapshot + caption)  →  push (send it to GitHub)
```

When the AI says "let me commit and push this," now you know what it means. It saved a snapshot and backed it up to the cloud. That's a good moment. That's safety.

---

## What is GitHub, and do I really need an account?

**Git** is the tool, the camera. **GitHub** is the website where the photo albums live online. You need a free GitHub account to use it. Most people don't have one yet, and that's completely normal.

### Getting set up (walk them through it, gently)

1. Go to **github.com** and click **Sign up**. It's free. They'll pick a username, which becomes part of their public profile, so nudge them toward something they won't cringe at later.
2. Honestly, that's most of it. Your AI tool can connect the project to GitHub from there, but it'll need them to be logged in. The first time, it may ask them to authorize it. That's a button that says something like "Authorize," and clicking it just means "yes, I'm giving my tool permission to put code in my account."

> If they seem hesitant, reassure them. A GitHub account is as ordinary as a Google account for anyone who builds things. It's the standard, and it costs nothing.

### A "repository," what's that?

> A repository (everyone just says "repo") is the home for one project on GitHub. One app, one repo. It holds all your files and the whole photo album of versions.

### Public vs. private, the thing they'll worry about

When you make a repo, GitHub asks: public or private?

- **Private** means only you, and people you invite, can see the code. This is the right default for a beginner. Start private.
- **Public** means anyone on the internet can read your code.

> Say this plainly, because it's a common worry: a public repo means people can read your code, but it does NOT mean they can change it, and it does NOT mean your app's data or your secret keys are exposed (as long as you've handled secrets right, which is covered below). Still, start private. You can flip it to public later if you ever want to.

---

## Local vs. staging vs. production (the restaurant)

Beginners hear "staging" and "production" and lock up. Here's the picture that makes it click. Use it.

Imagine you run a restaurant.

- **Local is your kitchen at home,** where you, the chef, mess around. You try a new recipe, taste it, make a disaster, and nobody cares. That's your computer.
- **Staging is a dress-rehearsal dining room with the doors locked.** The dish is plated exactly as it'd be served, on the real tables, under the real lights, but no paying customers are in the room yet. You're checking that everything holds up under real conditions before the public ever sees it. That's a private test copy of your live app.
- **Production is the restaurant, open, full of paying guests.** This is real. Real customers, real money, real consequences. You don't run experiments here. You serve what you already tested.

> The rule: experiment in local, double-check in staging, only serve what's ready in production. The whole point is that mistakes happen in the kitchen, never in front of the guests.

For a first app, you might not even need a separate staging step. Local plus production is often plenty to start. But the instinct is what matters: never test something risky directly on the version real people are using. Most modern hosting tools (Vercel, for one) hand you a free "preview" link for every change, and that preview IS your dress-rehearsal dining room. Use it to look before you go live.

---

## Putting it on the internet ("deploying")

> Deploying just means publishing. You take your app from GitHub and make it live on the internet, so people can visit it at a real web address.

The modern way is almost magic, and it's the one to recommend. Call it connect-once, auto-publish:

1. You connect your GitHub repo to a hosting service. Vercel is the friendliest for beginners, and its free tier is generous.
2. From then on, every time you push to GitHub, the hosting service rebuilds and publishes your app on its own. You don't do anything special. Push your code, and a minute later the live website has updated itself.

That's the payoff for keeping everything on GitHub. Pushing your code and publishing your app become nearly the same motion.

> Tie this back to the plan's **code-ownership principle**. Your code lives on GitHub, which you own. The hosting service just reads from it. Want to switch hosting services someday? You take your code and go, and nothing's trapped. Never build on a platform that won't let you export your code.

---

## The one thing you MUST keep secret: keys

This is the single most important safety point in this whole file. Say it clearly, and don't rush it.

Your app will have secret keys. They're passwords that let your app talk to other services: the AI service, the payment service, the database. If someone gets your keys, they can run up bills in your name or walk off with data.

The rule:

> Secret keys NEVER go in your code. They live in a separate, protected file (usually called `.env`) that's deliberately kept off GitHub. Your code says "go look up the key from the protected file," and the key itself stays private.

There's a special file called **`.gitignore`**, which you can think of as a "do NOT photograph this" list. It tells Git to skip certain files, like your `.env` full of secrets, so they never get committed and never reach GitHub.

> When you set up the project, have the AI confirm it out loud: *"Are my secret keys in `.gitignore` and kept out of GitHub?"* This is one of the very few things worth checking yourself. A leaked key is the most common painful mistake beginners make, and it's so easy to avoid.

---

## "Will I break it?", and a word on branches

You don't need this on day one. Bring it in only when the user is comfortable and wants to try something risky without the fear.

Right now everything happens on the main version of your project, called **`main`** (sometimes `master`). That's the real one.

> A branch is a safe parallel copy where you can try something experimental without touching `main`. If the experiment works, you fold it back into `main`. If it's a disaster, you throw the branch away, and `main` never even knew.

The plain version: a branch is a sandbox. Build your sandcastle there. If it's great, keep it. If it collapses, no harm done... the real beach was never touched.

For a solo beginner, working straight on `main` and committing often is usually fine. Branches earn their keep once you're nervous about a big change, or once you're working with someone else. Don't force it early. Just plant the word now so it isn't scary later.

---

## Quick glossary (point here when a word comes up)

| Word | In plain English |
|------|------------------|
| **Local** | On your own computer. Private. Where you build. |
| **Remote** | Not on your computer, up in the cloud (usually GitHub). |
| **Git** | A tool that remembers every version of your project forever. |
| **GitHub** | The website that stores your project's versions online. |
| **Repository / repo** | The home for one project on GitHub. |
| **Commit** | Save a snapshot of your project, with a short caption. |
| **Push** | Send your snapshots up to GitHub. |
| **Pull** | Bring changes down from GitHub to your computer. |
| **Branch** | A safe parallel copy for experiments. |
| **`main`** | The real, primary version of your project. |
| **Deploy / ship** | Publish your app to the live internet. |
| **Production** | The real, live version that real users touch. |
| **Staging / preview** | A private test copy that looks live but isn't public yet. |
| **`.env`** | The protected file holding your secret keys. Kept off GitHub. |
| **`.gitignore`** | The "do not photograph" list. Files Git skips on purpose. |

---

## How to teach this in a session

Don't dump this whole file on the user. Weave it in at the right moments.

- **Early, when files first appear,** explain *local*. "Everything we're building right now lives only on your computer."
- **After the first real chunk of work,** bring in *Git, commit, push, and GitHub*. Frame it as "let's make sure you can never lose this." This is also the natural time to help them make a GitHub account if they don't have one.
- **At the deployment phase,** explain *production* and *deploying*, and show off the connect-once, auto-publish magic.
- **The moment any secret key appears** (the AI service, the database, payments), stop and cover the *secrets, `.env`, and `.gitignore`* rule. This one isn't optional.
- **Only if and when they want to try something scary,** introduce *branches*.

And always loop it back to the two fears. "This is how you never lose your work." "This is how you can always get back to a version that worked." That's the emotional payload. The commands are just the machinery underneath.
