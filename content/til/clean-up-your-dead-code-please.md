---
title: Clean up your dead code, please!
description: Modern tooling that keeps your code base tidy
date: 2026-02-16
tags: js
---

https://bsky.app/profile/webpro.nl/post/3mexvmxkwcs24

With modern tooling there is no excuse anymore to have code bases with huge amounts of dead code (or configs!) flying around.

## Some tooling suggestions

- [`knip`](https://knip.dev/) — clean up unused dependencies, files and code
- [`ts-prune`](https://github.com/nadeesha/ts-prune) or [`tsr`](https://github.com/line/tsr)
- [`eslint`](https://eslint.org/) — especially for rules around unused imports, variables, magic numbers, etc
- [`prettier`](https://prettier.io/) — code formatting shouldn't be a big discussion really, it's all about consistency at the end of the day
- [`biome`](https://biomejs.dev/), [`oxlint`](https://oxc.rs/docs/guide/usage/linter.html) or [`oxfmt`](https://oxc.rs/docs/guide/usage/formatter.html) as current `eslint` and `prettier` alternatives
- use [Github Actions](https://github.com/features/actions) and/or [`husky`](https://github.com/typicode/husky) for git hooks to run the tooling automatically
