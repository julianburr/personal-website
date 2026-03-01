---
title: CSS anchor positioning
description: Finally smart positioning without JS
date: 2024-10-10
tags: css
---

At least almost. Browser support is still patchy, so I wouldn't use it in production just yet, but it's promising.

The idea is simple, allow developers to position an element relative to another element, purely with CSS (no JS involved). The browser then deals with collision avoidance (e.g. re-positioning the element if it would go off-screen) for you 🎉

```css
.anchor {
  /* The element you want to use as the source for the position */
  anchor-name: --my-anchor;
}

.floating-element {
  /* The floating element you want to "smartly position" based on the anchor */
  position: absolute;
  position-anchor: --my-anchor;
  position-area: bottom start;
}
```

Check out [this great guide by CSS-tricks](https://css-tricks.com/css-anchor-positioning-guide/) to see more advanced examples.
