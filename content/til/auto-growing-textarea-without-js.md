---
title: Auto-growing textarea without JS
description: Finally a CSS native way to do it
date: 2024-08-06
tags: css
---

https://x.com/boltdotnew/status/1820472342683763036

I cannot could how many times I've implemented this in JS, using React hooks etc, for various design systems at work and in personal projects. Great to finally see a CSS solution for this.

```css
textarea {
  field-sizing: content;
}
```

Usual caviat: currently only supported by Chrome, not in Safari or Firefox, but still great as a starting point and for non-critical functionality as progressive enhancement.

https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing

## New lh unit

Just because it's also mentioned in the tweet above, and it's pretty cool. It allows us to size things based on the elements line height, so we can set the size of a textarea to a specific number of rows in CSS now, just like we used to do it in plain HTML.

```css
textarea {
  line-height: 1.4;
  min-height: 3lh;
}
```
