---
title: 'Cool CSS anchor positioning use case: margin notes'
description: Footnotes (or rather margin notes) without any JS
date: 2026-01-20
tags: css
---

While reviving my personal website, I've been playing around with modern CSS features a lot. One of the things I always wanted, especially on my longer blog posts or on my conference talk write-ups, is the ability to show footnotes with further remarks and maybe some follow up links.

But I didn't want to do the usual (boring) "show a little number next to the thing and when the user clicks on it they get sent all the way down to the footnotes section of the page" thing. My ideal UX was to show the footnotes kind of as margin notes, scribbled on the side next to the text, but automatically aligned with its anchor.

My initial thought was "just use JS", but then I remembered [anchor positioning](/til/css-anchor-positioning) exists (and is finally supported by all major browsers, yay!), and you can do some pretty cool stuff with it.

## The code

The core challenge here is not only to position the margin note correctly, based on the achor position, but also to stack multiple notes correctly when I have multiple anchors in close approximity (e.g. on the same line).

```html
<div class="flex flex-row relative">
  <main>
    ...
    <a role="doc-noteref" class="fnref" href="#fn1">some reference<sup>1</sup></a>
    <a role="doc-noteref" class="fnref" href="#fn2">another reference<sup>1</sup></a>
    ...
  </main>

  <aside>
    <div class="fn" id="fn1"><sup>1<sup> ...</div>
    <div class="fn" id="fn2"><sup>2<sup> ...</div>
  <aside>
</div>

<style>
  aside {
    --gap: 12px;
  }

  [href="#fn1"] {
    anchor-name: --fnref-1;
  }

  [href="#fn2"] {
    anchor-name: --fnref-2;
  }

  .fn {
    position: absolute;
    right: 0;
  }

  #fn1 {
    anchor-name: --fn-1;
    position-anchor: --fnref-1;
    top: anchor(top); /* places the footnote next to the reference */
  }

  #fn2 {
    anchor-name: --fn-2;
    position-anchor: --fnref-2;
    top: max(
      anchor(top),
      calc(anchor(--fn-1 bottom) + --gap)
      /**
       * ^ check the position of the previous footnote, with some
       *  extra gap defined on the `aside` element
       **/
  }
</style>
```

The last part is the magic bit. Using `max(...)` and `anchor(...)` allows us to tell the browser to stack footnotes when necessary, or align them with their reference anchors if possible.

We can even do cool hover effects, to highlight the anchor when we hover the footnote or vice versa

```css
body:has([href='#fn1']:hover, [href='#fn1']:focus) #fn1 {
  /* anchor is active, highlight the footnote */
}

body:has(#fn1:hover, #fn1:focus-within) [href='#fn1'] {
  /* footnote is active, highlight the anchor */
}
```

Link to codepen to play around with: https://codepen.io/julianburr/pen/KwgPKMB

## Some gotchas

The main gotcha I ran into was weird issue with anchor references not being defined when I thought they should be. Turns out, based on the spec, anchors are only defined based on the closest parent element that's used a position reference, meaning the closest parent that has `position: absolute` or `position: relative`.

In my first attempt, I positioned the `aside` element `absolute`, which meant in the `.fn` selector the anchors for my `.fnref` elements weren't available.

Just something to keep in mind, if you run into issues like this, check your positioning setup.
