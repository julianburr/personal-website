---
title: CSS :has selector
description: We finally have the parent selector we always wanted
date: 2023-12-23
tags: css
---

https://x.com/wesbos/status/1737148340322652632

The CSS `:has` selector is one of the most powerful additions to CSS in recent years, and it's finally supported widely enough for me to confortably use it in production code.

Definitely dive deeper into Wes' thread, it's worth the read. I'm just gonna list my personal highlights here what I am using it the most for.

## The obvious one: style an element based on whether or not it has certain children

This is useful on multiple levels. You can obviously use it for styling a component differently, based on what children are passed into it, but you can also use it for debugging purposes.

```css
figure:has(figcaption) {
  /* ... */
}

.list-item:has(.thumbnail) {
  /* ... */
}

.list-item:has(.thumnail video) {
  /* ... */
}
```

## Form validation state

In the same way, you can use state selectors to style parents based on the state of any of their children. This is especially useful for form validation, if you're using HTML5 validation, [which you should!](/til/html-form-validation-basics)

```css
form:has(input:user-invalid) {
  /** 
   * Note: 
   *  :user-invalid is true when the user attempted at least once to submit the form
   *  :invalid is true immediately even without submit
   */
}

form label:has(input:user-invalid) {
  /* ... */
}
```

## Parent selector in disguise

It might not proudly say it on the tin, but imo this is the most exciting capability the `:has` selector is giving us: we finally have a parent selector in CSS tada 🎉

It might feel a bit counter intuitive at first, but generally the idea is to use the `:has` on the parent, to narrow the selector down, to then style a child element based on that. Just remember, with great power comes great something something 🙈

```css
body:has(input:checked) .notification-bar {
  /* ... */
}

form:has(input:user-invalid) .error-message {
  /* ... */
}

button:has(:hover) .icon {
  /* ... */
}
```

## Previous siblings

Another big one imo. We've had next sibling and general sibling selectors for a while now, but `:has` allows us to specifically target the previous sibling (using the next sibling selector within it).

```css
label + input {
  /**
  * Targets any `input` that is a direct sibling to a `label`
  *  <label ... />
  *  <input ... /> <-- targeted
  **/
}

input:has(+ label) {
  /**
   * The other way round, targets any `input` that has a `label` as the direct sibling
   *  <input ... /> <-- sstill targetting the input
   *  <label ... />
   **/
}
```

## Check out the docs

As usual, check out the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has), they're always a solid guide through this kind of stuff 🤓
