---
title: To infinity and (not) beyond
description: When you really need to render stuff on top...
date: 2024-02-10
tags: css
---

https://x.com/adamwathan/status/1756011225861726512

Oh noo! 🙈

Put this on the list of things I should never have learned about, because I'm not strong or mature enough to not immediately go rogue and use it everywhere 😅

## calc(infinity)

Within the `calc` function, you can use a range of new keywords, including `infinity`, which will resolve to the highest possible positive integer (2,147,483,647). You can also use it in its negative form `-infinity`.

```css
.element {
  border-radius: calc(infinity * 1px);
  z-index: calc(infinity);
  animation-duration: calc(infinity * 1s);
  /* ... */
}
```

Apparently you can also spell it however you like (casing-wise), just in case you want to be extra extra special 😅

> As usual for CSS keywords, these are ASCII case-insensitive. Thus, calc(InFiNiTy) is perfectly valid. However, NaN must be serialized with this canonical casing. — [https://drafts.csswg.org/css-values/](https://drafts.csswg.org/css-values/#calc-error-constants)

Docs are here: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc 🤓
