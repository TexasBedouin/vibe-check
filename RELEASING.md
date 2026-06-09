# Releasing

How to cut a new version. Every shipped change should bump the version, so users get told when they're behind.

## Versioning

Semantic versioning, MAJOR.MINOR.PATCH:
- **PATCH** (1.0.0 to 1.0.1): wording, fixes, small clarifications.
- **MINOR** (1.0.0 to 1.1.0): a new technique, section, or capability.
- **MAJOR** (1.0.0 to 2.0.0): a big restructure that changes how the skill works.

## The fast way

```
./bump.sh <new-version> "<one-line changelog summary>"
```

Example:
```
./bump.sh 1.1.0 "Add a competitor-teardown step to discovery"
```

The script writes `VERSION`, updates the version number in `SKILL.md` and `README.md`, prepends a `CHANGELOG.md` entry dated today, commits, tags `vX.Y.Z`, pushes, and creates a GitHub release.

## The manual way

If you'd rather do it by hand, bump the version in three places that must stay in sync:

1. `VERSION`
2. the version line near the top of `SKILL.md` (so the running skill knows its own number)
3. a new entry at the top of `CHANGELOG.md`

Then:
```
git add -A && git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push && git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z" --notes "what changed"
```

## Why the version lives in SKILL.md too

A skill can't read its own `VERSION` file at runtime, it only reads the instructions. So the number has to be written into `SKILL.md` for the running skill to know what version it is and compare against the latest on GitHub. That's why the bump touches both.

> Note: the runtime version check in `SKILL.md` fetches the `VERSION` file from a hardcoded `master`-branch URL (`raw.githubusercontent.com/TexasBedouin/vibe-check/master/VERSION`). If the default branch is ever renamed (for example to `main`), that URL must be updated by hand or the check will silently fail.
