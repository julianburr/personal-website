---
title: The future of CSS is now
description: Just a quick reflection on recent features and overall vibes in the CSS world
date: 2025-04-10
tags: css
---

## Let's play a game

CSS or SASS (or whatever other library you love to use). It's wild to me how quickly CSS has been catching up with quality of life features, that code we used to have to run through pre-processing now works natively in modern browsers. This is obviously also fuelled by the browsers themselves over the past 5-10 years, pushing users more and more off old versions automatically: win-win 🎉

These are just a few of my personal highlights, definitely not meant to be an exhaustive list.

### CSS variables

I [wrote about CSS variables and how awesome they are before](/til/why-css-variables-are-awesome).

```css
:root {
  --color-main: #f00;
  --size-main: 1rem;
  --size-big: calc(var(--size-main) * 2);
}

/* override variable value based on user preferences */
@media (prefers-color-scheme: dark) {
  :root {
    --color-main: #ff0;
  }
}

/* override  value for specific sub-tree */
.element {
  --color-main: #0ff;
}
```

### Powerful built-in CSS functions 💪

These are not all new, but it shows how far we've come since the early days of CSS pre-processors, where functions like these were one of the core selling points.

```css
.element {
  /* calc, which can use variables to calculate final values */
  font-size: calc(var(--base-size) * 0.2rem);

  /* min / max */
  font-size: min(20em, 20rem);
  font-size: max(0.4em, 0.8rem);

  /* minmax */
  grid-template-columns: minmax(20rem, auto) 1fr 1fr;

  /* path, takes a SVG path string to define shapes */
  clip-path: path('...');

  /* abs / round */
  font-size: abs(calc(var(--size) / 12));
  font-size: round(calc(var(--size) / 12));

  /* sibling-count / sibling-index */
  width: calc(100% / sibling-count());
  width: calc(100% / sibling-index());
}
```

Check out all available functions (including experimental ones like `if`) here: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions

### Nested CSS

This is valid plain CSS now 🎉

```css
.container {
  h1,
  h2 {
    /* ... */
  }

  a {
    &:hover,
    &:focus {
      /* ... */
    }
  }
}
```

### Scoped CSS

A new approach to solving CSS scope bleed. I still believe the cascade is one of the core features of CSS and should be utilised where possible, but in cases where you do want to contain the styles you are defining this can be really useful.

```css
@scope (.sidebar) {
  img {
    /* ... */
  }
}
```

### Colors

I [did a deep dive](/til/the-maze-of-css-colors) on this before, so just to repeat that the different color functions and abilities in CSS today are wild and often underrated.

```css
.element {
  /* "classical" hex definition */
  color: #ff0;

  /* hex with alpha value */
  color: #ff0d;

  /* rgb() and rgba() */
  color: rgb(255, 255, 0);
  color: rgba(255, 255, 0, 0.8);
  color: rgb(255, 255, 0 / 0.8);

  /* hsl() and hsla() */
  color: hsl(60, 100%, 50%);
  color: hsla(60, 100%, 50%, 0.8);
  color: hsl(60, 100%, 50% / 0.8);

  /* lab() and lch() */
  color: lab(97% -22 104 / 80%);
  color: lch(97% 108 107 / 80%);

  /* "better" lab and lch - oklab() and oklch() */
  color: oklab(0.97 0 0.2 / 80%);
  color: oklch(0.968 0.211 109.77 / 80%);
}
```

Even better, you can still use hex or whatever other format you like in those new color functions, e.g.

```css
.element {
  color: oklab(from #f00 l a b / 80%);
}
```

### :has selector

As mentioned [here](/til/css-has-selector), the addition of the `:has` selector was huge imo, essentially giving us a parent selector among other capabilities.

```css
form:has(input:user-invalid) .error-message {
  /* ... */
}

label:has(+ input:checked) {
  /* ... */
}

button:has(:hover) .icon {
  /* ... */
}
```

### :is and :not selectors

Very similarly, these selector makes a lot of things _a lot_ smoother.

```css
label:has(input:not(:user-invalid)) {
  /* ... */
}

input:not(:checked) {
  /* ... */
}

.card:not(a) {
  /* ... */
}
```

```css
/* 😭 */
.content h1,
.content h2,
.content h3,
.content h4 {
  /* ... */
}

/* 😍 */
.content :is(h1, h2, h3, h4) {
  /* ... */
}
```

Any other cool CSS features that feel like they came straight out of the LESS/SASS era that I missed? 🤔
