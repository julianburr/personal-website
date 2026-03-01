---
title: PNPM
description: Worth giving a try if you're looking at your package manager setup
date: 2024-11-04
tags: npm
---

Not going to dive too deep into things here, just a general observation from the places I worked at and my personal side projects.

`npm` has come a long way. As far as I'm concerned, it largely has caught up with `yarn` on a feature level, e.g. around workspaces and general mono repo utilities. It's performance also isn't as aweful as it used to be (admittingly I don't work in Amazon or Microsoft scale code bases where this might not be true).

`pnpm` _does_ take the performance to another level though.

I'm not gonna start the pointless discussion which one is better, or that using one or the other is stupid. Like with most things, the truth is more nuanced than that and will always depend on your specific circumstances, use cases, your team, etc.

All I'm saying is if you're starting a new project and you have the flexibility to try it out, do it 😊

## What I like about it + some useful tips

- like I said, the performance is _a lot_ better in my experience, which is mostly based on small to medium sized monorepos
- no need for `run` or `--` argument forwarding; I don't know why but having used `npm` for a while again now after using `yarn` (v1) for years, it's just driving me nuts 😅

```bash
npm run dev -- --foo=bar # 😭
pnpm dev --foo=bar       # 😍
```

- you can migrate your existing lockfile easily via `pnpm import`: https://pnpm.io/cli/import
- if any of your tooling locally or in CI/CD relies on `node_modules` being in a certain filesystem location, definitely double check what you need to adjust so everything still works with `pnpm`'s way of hoisting
- I am still waiting for the day different package managers play nice with each other, when you try to symlink packages from multiple repos that use different managers; probably a pipe-dream, but still...

Check out the docs here: https://pnpm.io/motivation
