---
title: The maze of CSS colors
description: Why we have so many color functions and how they work
date: 2025-10-20
tags: css, design systems
---

Stumbled across this gem today that finally made the differences between color systems click for me. Like, I understood what they are before, but not really where the newer color functions can be supperior over the old ones, and why.

https://www.youtube.com/watch?v=gJ2HOj22gDo

## TL;DR

- traditional color pickers "lie" about color lightness
- the `hsl` color space "lies" about color lightness
- human perceived lightness is affected by the hue, new color spaces like `lch` and `lab` attempt to fix this
- they were still off though, so `oklch` and `oklab` were created to match true human perception
- increasing the true-ness to perceived color lightness makes it easier to create accessible color palettes dynamically
- concretely in the context of CSS, using `oklch` and `oklab` will allow you to create color palettes using base values e.g. from CSS variables much more easily

## Early CSS color functions

### Good ol' hex

```css
.element {
  color: #ff0; /* short form */
  color: #ffff00; /* long form */
}
```

The hex code describes the red, green and blue values to apply. We can adjust the opacity by adding adding another hex value at the end.

```css
.element {
  color: #ff0d;
  color: #ffff00dd;
}
```

### rgb() and rgba()

Introduced in the early 2000s, these helper functions gave us the same color space but a different way to describe the color. Instead of hex, these functions take decimal values.

Especially when CSS variables became a thing, these functions become very useful.

```css
.element {
  color: rgb(255, 255, 0);
  color: rgba(255, 255, 0, 0.8);

  /* rgb() with the new opacity syntax using the `/` separator */
  color: rgb(255, 255, 0 / 0.8);

  /* using variables */
  color: rgba(255, 255, 0 / var(--opacity));
```

### hsl() and hsla()

Instead of describing the color through their "red", "green" and "blue" values, `hsl` describes them through their `hue` (which is a "simplified" layer of the color value, so somewhat close to what we had with rgb), `saturation` and `lightness`.

```css
.element {
  color: hsl(60, 100%, 50%);
  color: hsl(60, 100%, 50% / 0.8);

  color: hsla(60, 100%, 50%, 0.8);
}
```

## The problem

The lightness value in hsl (and for most rgb color pickers) is deceptive. The way we perceive lightness is through a combination of things, the hue (aka the wave length of the light) being part of it.

You can easily visualise this by picking a color on the hsl spectrum, and just adjusting the hue. If you turn the two colors into greyscale and compare them, you will find (most of the time) that they actually look different. They have what we would call different "values".

![Palette to showcase saturation / value differential — just changing the hue, we get very different lightness for all the different saturations](https://uc2275d28afa7e6b3e86c928cc44.previews.dropboxusercontent.com/p/thumb/AC7HQ2nuUn9gqNen_9eJNh7ZzsX1Lrh9OVvs2dZ8zvluSVkxTUS8t1d5_EbBHcShWKbPVN-rxq08M8zPfQNyjdbk85jAf0cDf0xB7TPjdtwl-usCznKWghg0ThQhk6DJn0jTJ1L91oM7VKO2LRJO2iOmaPsIBdanw5rdm3Ip68UGsO13XqwtKnHOLiJfHHgmT-bGD9j6tetA3hhI4lm3wTjeE0VtnoKakWPdfGozB64LxDDVeLra3j_1ScwPdu459X7uJ9xdZgbk1sByzj_eLQLv_Bc6KshCDvCWxs-s3Zm4mDf3gZvAh1k_myNQVdEhPOXM8DcC4888r6NoHtR-9luFjFTI_qtDP2q8IlXDX-8reab0MOc05IZ33nEYg59lS79RDm84AkVN2oEA2YdMNV9c/p.png?is_prewarmed=true)

Now, why is this a problem? The traditional rgb/hsl color pickers usually show the value as the third dimension, but due to the differential that property actually changes based on the other two.

It becomes a problem when we use these color systems to create our color palettes more dynamically, e.g. find colors that go well with each other and give each base color a palette of different brightnesses. This impacts accessibility, but is not limited to it.

## The solution: modern color functions

### lab() and lch()

`lab`, short for lightness, a-axis (green to magenta) and b-axis (blue to yellow), and `lch` (lightness, chrome, hue) fix this by making the "real" perceived lightness the first value.

```css
.element {
  color: lab(97% -22 104 / 80%);
  color: lch(97% 108 107 / 80%);
}
```

Meaning, if you want a color with the same "value" (aka lightness), but different hue, the lightness value actually stays the same.

Neat. Especially, if you're trying to generate color palettes dynamically from a base color, e.g. utilising CSS variables.

```css
.element {
  color: lab(calc(var(--base-lightness) + 30%) 22 104);
}
```

### The "ok" version of lab and lch

But despite the effort, even `lab` and `lch` are not fully true to human perception. So [Björn Ottosson](https://bottosson.github.io/posts/oklab/) created "Oklab" in 2020, where the "ok" literlly stands for ok, as in "adequate". The same has since been done for `lch` with "Oklch", which gives us these new CSS functions:

```css
.element {
  color: oklab(0.97 0 0.2 / 80%);
  color: oklch(0.968 0.211 109.77 / 80%);
}
```

## Further resources

- https://www.youtube.com/watch?v=6aCsAMgwnjE — Video by Adam ArgyleInk on the topic
- https://www.youtube.com/watch?v=vGfTyHPWZLE & https://www.youtube.com/watch?v=gPacarD9NuA — Great intro videos by Kevin Powell (as usual)
- https://css-tricks.com/css-color-functions/
- https://developer.mozilla.org/en-US/blog/css-color-module-level-4/
- https://developer.chrome.com/blog/css-relative-color-syntax
