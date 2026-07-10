# Plan Templates: The Verbatim Blocks for Phase 8

Phase 8 in SKILL.md compiles the plan document. This file holds the paste-ready blocks that go into that plan word for word: the House Rules starting point, the checkpoint block format, the pre-launch audit prompts, and the debug-logging prompt. Pull it in when you assemble the plan, so the blocks land in the document exactly as written here.

## The House Rules paste block (plan section 10)

Once you've picked the rules that fit the app, hand the user this ready-to-paste starting point. They copy it into their project guide (CLAUDE.md or whatever their tool uses) and adapt the names to their app:

```markdown
# House Rules for [Your App]

You're the engineer. I'm the product manager. Follow these on every change.

## How to work
- Think first: before non-trivial code, say what you'll build and ask about anything unclear. Don't guess.
- Keep it simple: build the simplest thing that solves the problem. No extra features, no "just in case" code.
- Change only what I asked: don't rewrite or "improve" unrelated code. If you spot something, tell me, don't do it.
- Aim at a finish line: work to a clear, checkable "done," then show me how each item checks out.

## How to write code
- Don't repeat yourself: one home for each piece of logic.
- Same name everywhere: if it's a "pickup," it's always a "pickup."
- Handle the sad path: every failure shows a friendly message and a way out.
- Leave a trail: log important actions (what happened, worked or failed, any error).
- Keep layers apart: screens, logic, and data storage stay separate.
- Self-contained features: each feature in its own folder.

## Definition of done (every change clears all of these)
- It works and didn't break anything that worked before.
- Build, linter, and formatter are green.
- Any test fails on the old code and passes on the new (fail-first).
- It touched only what the task needed.
- It matches the project's names and patterns.

Working is the floor, not the bar.
```

## The checkpoint block (plan section 19)

For EACH build phase, put a CHECKPOINT block in the plan, in this exact format:

```
═══════════════════════════════════════════════════════════
🔖 CHECKPOINT: [Phase Name]
═══════════════════════════════════════════════════════════

STOP here. Before moving to the next phase, explain to the user:

📍 WHERE WE ARE
"We just finished [phase name]. Here's what your app can do now: [plain-language description of what works]."

🔧 WHAT WE JUST BUILT
[1-3 bullet points explaining what was built, in plain language]
- Example: "We set up Supabase. This is where all your users' data gets saved. Picture a giant, organized spreadsheet your app reads from and writes to on its own."
- Example: "We added login with Google. When someone taps 'Sign in with Google,' your app asks Google to confirm who they are, and Google sends back their name and email. Your app never even sees their Google password."

💡 WHY WE BUILT IT THIS WAY
[Connect back to the decisions made during the vibe-check session]
- Example: "Remember how we talked about your users being in a rush? That's why we went with Google login instead of email and password. One tap, instead of thumbing out a password on a phone."

📋 WHAT'S NEXT
"Next up, we'll build [next phase in plain language]. This is where [what it means for the user's app]."

❓ QUESTIONS?
Ask the user: "Does all of this make sense so far? Want to see any of it actually working before we move on? Anything nagging at you?"

Wait for the user to respond before continuing.
═══════════════════════════════════════════════════════════
```

### Rules for checkpoints

1. **Every checkpoint waits for the user before continuing.** Don't print it and barrel ahead. They need a beat to take it in, ask things, and feel solid.
2. **Plain language, no exceptions.** No jargon in a checkpoint. If a technical word is unavoidable, re-explain it in a line, even if you explained it before. They may have forgotten, and that's fine.
3. **Always loop back to WHY.** The "why we built it this way" part should point at a specific thing they said earlier. That teaches them architecture isn't random... every choice traces back to something THEY told you they needed.
4. **Show it, don't just say it.** Where you can, tell them how to see the thing: "Open your browser and go to localhost:3000. You should see your login page." Or "Tap the sign-in button. Watch it bounce you over to Google."
5. **Celebrate, specifically.** Beginners have no idea how much they've pulled off. After a big phase, say something real: "You now have a working app with user accounts and a database. That's a genuine product. Most of the hard plumbing is already done."

## The pre-launch audit prompts (plan section 17)

Drop these three prompts into the plan for the user to run before they show the app to a single soul:

- *Security audit:* "Audit my codebase for security vulnerabilities. Check authentication, authorization, input validation, rate limiting, secrets management, file upload security, CORS/CSRF protections, and timing attacks. Give me a severity rating for each issue found."
- *Scalability audit:* "Audit my codebase for scalability issues. Check for N+1 queries, unbounded database reads, missing pagination, polling vs real-time listeners, caching gaps, cold start performance, and concurrent user handling. Estimate the monthly cost impact of each issue."
- *Production readiness audit:* "Audit my codebase for production readiness. Check for error monitoring, test coverage on payment and authentication paths, accessibility basics, and deployment configuration. Tell me what will fail silently in production."

## The Working With Your AI Tool checklist (plan section 18)

The practical build habits that go into the plan's "Working With Your AI Tool" section:

- Keep your project instruction file (CLAUDE.md or whatever your tool uses) under 100 lines. If it bloats, split the details into smaller files inside the folders they belong to.
- Set up logging early, before the bugs ever show up, with the debug-logging prompt below.
- Turn off AI-tool plugins and integrations you aren't actively using. They quietly eat your AI's working memory.
- Treat every prompt like a tiny spec. Not "add login." Instead: "Add login with Google and email. Show a spinner while it's checking. If it fails, show a friendly error with a retry button. If they're already logged in, drop them straight on the dashboard." Specific prompts, fewer nasty surprises.
- Before you let the AI apply a fix, ask it: "How does this change what my user sees? Will it make the app slower? What does this look like to my user on their worst day?"
- Manage *how* the AI works, not just what it writes: the four ground rules, the supervised improvement loop, and the definition of done, all in [MANAGING-YOUR-AI.md](MANAGING-YOUR-AI.md). Put a short version in the project guide so the AI follows it every session.

## The debug-logging prompt (plan section 18)

Set up logging early, before the bugs ever show up. The plan tells the user to ask their AI once:

> "Define a simple, consistent debug-logging plan for this app. Say what to log, the levels (from quiet INFO up to loud ERROR), and short category names for each feature. Write it to docs/DEBUG-LOGGING.md and follow it everywhere you write code."

Then the project guide points at that file so the AI reads it first and logs the same way every time. It feels pointless right now... it's the thing that saves them the first time something breaks and they have no idea why.
