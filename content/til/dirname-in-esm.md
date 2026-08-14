---
title: ESM and the freaking __dirname
description: Some of the lessons I learned
date: 2026-05-02
tags: js, node
---

This is another one of those TILs that's mainly for myself, because I keep forgetting how to do it 🙈

In ESM, helpers like `__dirname` and `__filename` are no longer available. They _are_ however still very useful for a lot of things, so in a lot of scripts I keep doing the same thing to get the old behaviour kind of mimicked:

```js
import * as path from 'node:path';
import * as url from 'node:url';

const _dirname = path.dirname(url.fileURLToPath(import.meta.url));
```

Alternatively, e.g. when you're building a library and you need or want to support both "old school" CJS and ESM, you can turn this into an [isometric solution[^1]]() that uses the existing `__dirname` whenever available, and falls back to the ESM way when not:

```js
import * as path from 'node:path';
import * as url from 'node:url';

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(url.fileURLToPath(import.meta.url));
```

---

[^1]: Isometric in the context of JS means that it works in multiple environments. That can be across NodeJS and browser environments, or like in this case across different packaging formats (ESM vs CJS)
