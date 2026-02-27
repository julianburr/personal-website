---
title: The Web Is Your A11y
description: Accessibility means usability and benefits everyone! Let's look at the tools in modern HTML, CSS and JS that make building accessible web applications easier than ever.
type: write-up
date: 2026-02-16
platform: Substack
talkUrl: https://www.julianburr.de/my-work/talks/the-web-is-your-a11y
externalUrl: https://julianburr.substack.com/p/the-web-is-your-a11y
coverUrl: https://substackcdn.com/image/fetch/$s_!hZMM!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8992adc6-9a81-4fec-98b5-32b382944121_2400x1480.png
---

_This is a write-up of a [conference talk](https://www.julianburr.de/my-work/talks/the-web-is-your-a11y) I've given at [../NEW 2025](https://slashnew.tech/) in Newcastle. It aims to add a bit more context and links to further resources._

---

## Introduction

This is not going to be a blog post about accessibility fundamentals. We will cover some core principles, but we won't dive too deep into the basics. Not because they aren't important, they _are_, but [they've been covered plenty by others[^1]]() and would just blow out the scope of what I want to focus on even more.

Instead, in this blog post we'll focus on the more practical side of things. More specifically: how we can use modern HTML, CSS and even JS to help us build more accessible web apps with less effort.

In my opinion, there's a few big problems in our industry at the moment, that I am trying to cover here:

- A lack of awareness about the importance of accessibility
- A lack of awareness about the available built-in features the platform (aka "modern browsers") give us, and how to use them
- More practical examples, but also thinking longer-term more purpose built tools and libraries as an abstraction layer on top of the platform
- Better ways to actually verify and test the accessibility of our apps

And one more question that's hanging in the room: [will AI fix everything for us?[^2]]()

## Part I: Why accessibility matters

One of the things I hear the most often is something like "we don't have blind users, we don't need to worry about or focus on accessibility". Or "noone is using our product with screen readers". This infuriates me on multiple levels.

For one, saying noone uses your web app with assistive technologies so you don't need to optimise it for assistive technologies is logically flawed. It's the usual trap of survivership bias: maybe you don't see anyone use it with these technologies because right now they can't.

But even if we ignore that, it highlights an extremely narrow and (in my opinion) wrong interpretation about what accessibility is about.

### Accessibility categories

> An estimated **1.3 billion people** experience significant disability. This represents **16% of the world's population**, or 1 in 6 of us. — [https://www.who.int](https://www.who.int/news-room/fact-sheets/detail/disability-and-health)

Firstly blind people, or even visually impaired more generally, are not the only ones with permanent disabilities. There are a lot of other groups that fall into that category: @@@TODO@@@.

According to studies, rougly 1.3 billion people world-wide today have some form of significant disabilities. That's 16% of all people in the world. In Australia, based on a [report of 2023 @@@TODO@@@](???) it's actually more than 20%. That's a lot. And those are the numbers usually quoted when making an argument for accessibility: if you don't optimise your web app, you eliminate 1/5th of the world as potential customers.

On the one hand, that's good. It's true, and I think it deserves more attention. But on the other hand, I think it still misses the bigger picture. Besides permanent disabilities, there are two more categories we need to consider:

- **Temporary disabilities:** @@@TODO@@@
- **Situational disabilities:** @@@TODO@@@

![The three categories of disabilities you should consider when talking about how we can build a more accessible world, including the web — https://www.ul.ie](https://substackcdn.com/image/fetch/$s_!AAV8!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88436dcb-9015-4bab-8cb6-785450946983_2400x1480.png)

The whole argument of "those 16% are not part of our user group, so we don't need to care about accessibility" becomes moot extremely quickly when you look at this. Literally everyone will be part of the second and third categories at one point or another. Accessibility matters for everyone, _literally_.

### Beyond screen readers

On top of all that, I think the first thing people jump to when hearing the word "accessibility" is screen readers, maybe color contrasts. Again, that's good, they are definitely part of it, but it's too close-minded. It goes far beyond that.

A lot of the best practises will cover more generally different forms of input (e.g. keyboard, AI agent) and output (e.g. screen reader, even those popular AI agents). And again, improvements benefit everyone. Disabled users, power-users, users that [simply prefer specific forms of input or output[^3]]().

## Part II: Words matter

### Usability

I hope this shows why I think that attitude towards accessibility is fundamentally flawed. To mitigate it, I often suggest a different definition for accessibility, or even a different term all together. I personally like how Mozilla defines it:

> Accessibility is the practice of making your websites usable by as many people as possible. — [https://developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility)

The focus is on "usability" for as many users as possible. This does include catering for people with disabilities, but it doesn't stop there.

It also suddenly includes things like:

- **Performance optimisations:** Don't just build for users on the latest iPhones or MacBooks. Don't just build for users with the fastest internet connection.
- **Cross-browser compatibility:** Don't just build for users on the latest Chrome version.
- ... the list goes on and on. I hope you got the gist.

We already established improvements here will benefit all users, a win-win. But I'd even argue a lot of it also benefits your developers and your abilitity to ship things faster. Accessible code is usually more semantic, meaning it's more likely to "explain itself", aka being self-documenting. And, to finally segway into the actual topic of this blog post, it often can reduce the amount of code significantly, if you're using the platform where possible. So, win-win-win?

**In summary:** my general strategy here and advice for anyone who is trying to advocate for accessibility at their company or in their circles: call it "usability".

### Affordances

> When affordances are taken advantage of, the user knows what to do just by looking: no picture, label, or instruction needed. — ["The Design of Everyday Things" by Donald A. Norman](https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things)

Ok, for a moment let's take a step back from the web and look at the "real" world. And let's talk about "affordances".

It's the idea of designing things in a way that their purpose and usage are clear without the need for a manual. The most common example, made popular by Donald Norman in his book "The Design of Everyday Things", is a teapot. Even if you've never seen a teapot in your life, the shape of the spout and handle will still guide you towards its correct usage. More specifically, Normal defines 5 key concepts that lead to that:

- **Affordances:** What actions are available?
- **Signifiers:** How do I interact with it?
- **Mapping:** Relation between controls and their actions.
- **Feedback:** Communicate to the user that the action has been done.
- **Contraints:** Don't allow wrong actions that could have damaging outcomes.

I think, especially around web development, this is still very applicable. And it's where a lot of the conversations should start: semantic HTML. We should use semantics to describe our website in a way that anyone interpreting it (be it a human or a machine) knows what is what without needing further instructions.

When we say semantic HTML, I think of three layers:

- **Landmarks:** These are specific HTML tags that allow us to describe the broader structure of our document. They can help users navigate through the site more efficiently. This is their primary purpose: to semantically describe what the content within them is. They usually don't have any functionality baked into them.
- **Semantic Elements:** These are elements with actual functionality and behaviours baked into them. I know it almost feels like a bit of a meme at this stage. "Use the platform". But like most (good) memes, this keeps popping up because a lot of it stems from truth. The platform is where the juice is, and in our context, where the browsers do a lot of the work for you.
- **WAI-ARIA attributes:** These attributes are decoupled from HTML elements, meaning they allow you to enhance the accessibility of any element you need. Like landmarks, most of these attributes don't actually give you functionality out of the box. Instead, you use them to describe the functionality you might have custom-built (e.g. in your Javascript) to ensure the browser and technologies like screen readers have access to the relevant information.

A lot of people, when they hear "accessibility", mentally immediately jump to the last layer. I hope the code examples we'll explore in the next parts of this blog post can show you why this isn't a great approach.

Instead, always go from the top down: is what I want to do just a container? Great, go with a landmark. Otherwise, does a tag exist for the functionality I need? Use it! If not, use attributes to describe the intended functionality, then implement it yourself.

## Part III: About reinventing the wheel

Enough theory, though. Let's look at real code examples to see what all of this means in practice.

```html
<div onClick="{handleClick}">Click me</div>
```

Yes, yes. I know. This might seem like an exaggerated example. But, at the same time, I promise you most of us have actually seen it in the wild. It's the dictionary definition of the "I will just implement the accessibility stuff myself, how hard can it be" attritude.

At first sight, the above might seem to work. When I click on the element, it triggers the callback. But we're smart, and we know that assistive technology like screen readers needs affordances to know that a clickable element is clickable. The semantic here is "button", so let's use an aria attribute to label our element accordingly (I know, I know).

```html
<div role="button" onClick="{handleClick}">...</div>
```

Right, but ironically, most assistive technology uses affordances like the "role" attribute to announce the element type whenever it's focused. Right now, the user cannot focus on our element, because divs by default are not focusable (because they are usually not interactive).

Let's fix that by adding a tabindex.

```html
<div role="button" tabindex="0" onClick="{handleClick}">...</div>
```

Awesome, the user can now use e.g. their keyboard to focus the element. But they can't actually trigger it via the keyboard. We only defined a click handler, which listens to mouse clicks (or finger presses on touch devices). To allow users to use the `Enter` key or spacebar to trigger the element, we need to add a keydown handler. Easy enough, though, right?

```html
<div
  role="button"
  tabindex="0"
  onClick="{handleClick}"
  onKeyDown="{handleKeyDown}"
>
  ...
</div>

<script>
  function handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        handleClick(e);
        break;
    }
  }
</script>
```

Phew! Now we have a clickable element that can also be focused, triggered through keyboard events, and is announced correctly by assistive technologies.

What is that? The project manager says we need to disable the element under certain conditions. No problem. We can't use disabled, that attribute doesn't exist on `div` elements, but we know ARIA, and we know there is an equivalent for that.

```html
<div
  role="button"
  aria-diabled="true"
  tabindex="0"
  onClick="{handleClick}"
  onKeyDown="{handleKeyDown}"
>
  ...
</div>
```

Like the `role` attribute, this just tells assistive technology that the element should be disabled, though. It doesn't actually prevent us `onClick` or `onKeyDown` handlers to trigger. So we have to manually check within those callbacks if the element is disabled.

```js
function handleClick(e) {
  if (e.target.ariaDisabled !== 'true') {
    // Do whatever we want to do...
  }
}
```

Besides styling considerations, the spec also says disabled elements [shouldn't receive any browsing events[^4]](). That doesn't only include the triggers we just disabled, but it also includes things like focus. So we need to adjust that accordingly.

```html
<div
  role="button"
  aria-diabled={isDisabled}
  tabindex={isDisabled ? "-1" : "0"}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>...</div>
```

I'll stop here. I hope we can all see how much effort we need to go through to manually make this clickable element accessible. And I know most if not all of you know the solution to this. Just use the button element.

```html
<button onClick="{handleClick}">Click me</button>
```

## Part IV: More code examples

I've read somewhere that to ensure any given message sticks with your audience, you should [repeat it at least 7 times[^5]](). I'm not sure if that's true, but here we go, only a few more to go 😉

Jokes aside, though, I also just want to highlight some of the more recent additions to the capabilities of HTML and CSS you might not know about. Remember, the goal here is to start using built-in functionalities more within the custom components that we commonly build ourselves for our web apps.

### Dialogs & Popovers

Let's start with one of the most abundant patterns on the web: dialogs. The [`dialog` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) has been [baseline widely availble[^6]]() since 2022, so no excuses anymore!

```html
<p>
  This is some content, with a
  <button command="show-modal" commandfor="demo-dialog">
    trigger to open a dialog</button
  >.
</p>

<dialog id="demo-dialog">
  <p>
    This is the dialog content. It is only visible once the dialog has been
    activated, e.g. by triggering the button in the paragraph above.
  </p>
  <button command="close" commandfor="demo-dialog">Close</button>
</dialog>
```

There are a few key parts to notice here:

- The triggering element, the button within our main content, has two attributes: `command` and `commandfor`. These attributes tell the browser what this button is intended to trigger. In this case, we want to trigger the `show-modal` command, and `commandfor` tells the browser what dialog this is referring to. Another value of the `command` attribute is close, which we can use within the dialog to provide a button to close it.
- The dialog itself then has the `id` we are pointing to with the `commandfor` attributes.

Just like the `button` element, the `dialog` element takes care of a lot of functionality for us, including many accessibility concerns. This includes:

- Hiding the content until the dialog is activated
- Rendering the dialog [on top of the current page content[^7]]() when active
- [Trapping the focus[^8]]() within the dialog while it's active. This means, while the dialog is active, the browser will prevent the user from interacting with anything outside of the dialog, including both trigger and focus interactions.
- Keyboard accessibility, e.g. closing the dialog by pressing the `escape` key, restoring focus to the last focused element within the document when closing a dialog, etc.

All of this without any Javascript. However, you can use JS with it if you so wish. Like many other HTML elements, the `dialog` DOM element provides additional JS methods to interact with it.

It's also worth noting that you can fully control the look and feel of the dialog via CSS. E.g. a common thing to customise is the backdrop, the background that will sit on top of the page content but behind the dialog content. You can adjust it via the ::backdrop pseudo selector.

```css
dialog {
  background: #fff;
  &::backdrop {
    background: #f00;
    opacity: 0.1;
  }
}
```

Another very common requirement when building a dialog component, from a UX perspective, is the ability to animate them in and out. This used to be pretty hard to impossible in CSS, because you couldn't animate from or to `display: hidden`, but even there, we have made big advancements in recent years.

```css
dialog {
  opacity: 0;
}

dialog:open {
  opacity: 1;
}

/* Styles for the starting state (when opening) */
/* This ensures a transition from 0 opacity to 1 when the dialog is first displayed */
@starting-style {
  dialog:open {
    opacity: 0;
  }
}
```

Not only can we target the open state of the dialog via the `:open` selector, the new [`starting-style` at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style) allows us to do what we couldn't before. Animate elements in and out of existence. This is baseline newly available since 2024, meaning it's been in all major browsers since then.

#### Popovers

Popovers don’t have their own HTML element, instead you can turn any element into a popover using the new [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover) (baseline newly available since 2024).

```html
<p>
  This is some content, with a
  <button popovertarget="demo-popover">trigger for a popover</button>.
</p>

<div popover id="demo-popover">
  <p>
    This is the popover content. It is only visible once the popover has been
    activated, but unlike a dialog still allows you to interact with the main
    document content.
  </p>
</div>
```

Other than that, the popover looks very similar to the dialog element we just explored. This time, unlike with most ARIA attributes, the attribute itself also controls all of the common functionality again, e.g.:

- Hiding the content until the popover is activated
- Automatically closing the popover when the user interacts with the document content (e.g. clicks on something in the main document)
- Keyboard accessibility, e.g. closing the popover when pressing `escape`

One major thing to note is the default positioning of these popovers. Somewhat counter-intuitively, they are positioned centered on the screen by default, instead of anchored to the element that triggered it (which is what you probably would expect). However, you can easily fix that with some [CSS anchor-positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor) (baseline newly available since 2026):

```css
button[popovertarget='demo-popover'] {
  anchor-name: --popover-anchor;
}

#demo-popover {
  margin: auto;
  position: absolute;
  position-anchor: --popover-anchor;
  position-area: bottom center;
}
```

This will automatically position the popover relative to the trigger button, based on whatever value you passed into `position-area`. To play around with different values, I highly recommend reading the [Chrome developer blog](https://developer.chrome.com/blog/anchor-positioning-api) entry and this online tool: https://chrome.dev/anchor-tool/.

#### Tooltips

As mentioned, tooltips are really just popovers, but instead of triggering them via click, we usually want to trigger them on hover.

Traditionally, HTML allowed us to have very basic tooltips via the `title` attribute. But this is limited. For one, we can only use plain text as the content, but probably more importantly, we cannot style the tooltips or adjust behaviours like the delay. All of that is fully controlled by the browser.

The new popover API changes that. To support hover as a trigger, browsers provided a new attribute on the triggering element.

```html
<p>
  This is some content, with a
  <button interestfor="demo-tooltip">trigger for a popover</button>.
</p>

<div popover id="demo-tooltip">
  <p>This is a tooltip. I can add more than just text here :)</p>
  <img src="https://placecage.vercel.app/200/300" />
</div>
```

Instead of `popovertarget`, we use `interestfor`. The rest can stay the same. By default, the interest invoker uses hover as its trigger (or press on touch devices that don’t have hover capabilities).

Not only does this allow us to completely customise the looks of the tooltip including enter and leave animations through CSS, but we can also control things like the delay for showing or hiding the tooltip.

```css
[interestfor] {
  interest-delay: 0.3s;
}

/* We probably still want to show immediately when triggered via focus */
[interestfor]:focus-visible {
  interest-delay: 0s;
}
```

And I know I said it before, but I think you cannot stress this enough: all of this [without needing a single line of Javascript![^9]]() Magic!

### Accordions

Another extremely common pattern on the web: having content collapsable, with a short summary that can toggle it between visible and hidden. It saves space and makes the site itself easier to scan without too much noise.

You might even know about the `details` and `summary` tags in HTML. They have been around for a while, and most developers stumble across it when looking for a way to render accordions in Github readmes 😅

Still, I think most of us don't use this built-in functionality enough.

```html
<details>
  <summary>Click me to expand or collapse the content</summary>

  <div>
    <p>Some content you want to show in your accordion.</p>
    <p>This content can include any valid HTML, e.g. tables, links, etc.</p>
    <img src="https://placecage.vercel.app/200/300" />
  </div>
</details>
```

In the example above, the `details` element defines the content of the accordion, where the `summary` is treated as the content that's always visible, and usually used as the trigger to expand or collapse the accordion, while everything else within the `details` tag is used as the collapsible content.

Out-of-the-box, without any Javascript, this gives you:

- Keyboard accessibility (hopefully you start seeing a pattern here), e.g. expanding and collapsing the content using `Enter` or `Space`.
- Assistive technology support, so the content gets announced appropriately.
- Visual indication for the current state of the accordion
- One of the coolest features ever, not enough people know about: automatic reveal of the content when the user is using the browser search functionality (Cmd+F) so search the page, when the accordion content includes matches 🤯

Especially the last one is usually overlooked when people implement their own accordion components in their component library or design system. As someone who uses the browser search extensively, let me say this: if you are building any form of documentation website, and you use accordions, and your accordions don't auto-reveal their content on search, you are THE DEVIL, and I hold you personally accountable for that!

Jokes aside, though, I hope this further highlights (if that was even needed) that accessibility features more often than not benefit all users, not just the ones with disabilities.

Something that's often mentioned by developers knowing about the details and summary elements, which causes them not to be used, is the assumption that they are not very customisable. That's not true.

For one, we can control the visuals completely through CSS.

```css
details {
  /* allows us to style the whole block */
}

details:open {
  /* pseudo selector to adjust styles in open state */
}

summary {
  /* allows us to style the accordion trigger */
}

summary::marker {
  /* pseudo element for the marker, you can use your own image etc */
}

details::details-content {
  /* pseudo element for the collapsable content */
  /* it's usually more convenient though to use a wrapping HTML element as container */
}
```

Also, we can customise the behaviour. E.g. if we want to have a collection of accordions, where we only want to reveal one content at a time (meaning we want to collapse the currently expanded content if the user expands a different one within the group), we can do so via the `name` attribute.

```html
<details name="demo-group">...</details>
<details name="demo-group">...</details>
<details name="demo-group">...</details>
```

### Forms & inputs

Another thing that's found in abundance on the web: forms. Most web apps are, in one way or another, really just a collection of tables and forms to update the data shown in the tables.

Now, the `form` element itself is hopefully nothing new, even though we're using it less and less in the age of JS frameworks and SPAs, but let's ignore that for a second.

One of the capabilities introduced to HTML forms a while ago, but still often under-utilised, is validation.

```html
<form>
  <input type="text" required />
  <button>Submit</button>
</form>
```

In the example above, if we try to submit the form without filling in the field we [marked as `required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required), we will get a native error message pop-up that tells us we need to fill in that field.

Not only did we get the behaviour for free, but we also got free internationalisation. This error message will be in the user's language, based on the browser settings. We also get accessibility for free; the error will be announced appropriately by screen readers and other assistive technology. Something I personally didn't even know how to do manually correctly until very recently. And on top of that, we can use the validation status in our CSS to highlight invalid fields:

```css
input:valid {
  /* style valid field */
}

input:invalid {
  /* style invalid field */
}

input:user-invalid {
  /* special pseudo selector that only triggers after submit attempt */
}

div.field:has(input:user-invalid) {
  /* you can use :has to style the field wrapper */
}
```

If you use Javascript, you can even further control the behaviour of the error notifications. Instead of the default pop-up, you can inject the error message, e.g. into the field component itself.

And the validation capabilities go beyond just required fields. We can use [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) and other attributes to get more advanced validation:

```html
<input type="url" />
<input type="email" />
<input type="tel" />
<input type="number" min="5" max="40" />
```

Input types do not only give us advanced validation rules. They can also control browser behaviour, e.g. what keyboard to show on mobile devices. E.g. the keyboard for an email input will be different from the standard keyboard, usually exposing characters like `@`, `-`, `_`, etc. The keyboard for an input of type tel will usually just be the keyboard, with access to the `+` character for country codes.

For anything that doesn't have a dedicated type, you can use the [`pattern` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern) to give the browser a hint what kind of input you expect from the user, to potentially optimise the input controls:

```html
<input type="text" name="otp" pattern="[0-9]{6}" />
<input type="text" name="otp" pattern="[0-9A-Z]{6}" />
```

And then we have even more advanced form inputs that give us extended UIs for users to define specific values.

#### [search](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search)

```html
<input type="search" />
```

Again, this allows the browser to render optimised mobile keyboards, in this case including a "search" button that submits the search. It also adds a button to the UI within the text field to clear the search, which can also be triggered by pressing `Escape`.

#### [date](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date) / [time](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time) / [datetime](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local) / [week](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/week)

```html
<input type="date" />
<input type="time" />
<input type="datetime-local" />
<input type="week" />

<script>
  $input.value; // e.g. "2017-06-01"
  $input.valueAsNumber; // e.g. 1496275200000, a JavaScript timestamp (ms)
  $input.showPicker(); // allows you to control the picker programatically
</script>
```

These input types are possibly what cause you (and many others) to believe built-in inputs suck. They allow the user to input dates, date & time or specific weeks respectively. However, they are currently not very customisable when it comes to styles or behaviour, but I am hopeful with everything we're seeing in the ecosystem at the moment that this will change in the future.

#### [range](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range)

```html
<input type="range" min="0" max="10" step="2" />
```

This will (by default) render a progress bar with a "thumb" element that allows the user to select a value on the given range. Using the native range input gives you a bunch of accessibility features out of the box:

- Ability to control valid input steps for the given range via the step attribute
- Keyboard accessibility for selecting values, e.g. controlling the thumb via arrow keys
- Touch support for controlling the value

You can also add a visual scale with labels more easily using the native element in combination with the [`datalist` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist) (baseline limited availability):

```html
<input type="range" min="0" max="30" step="1" list="values" />
<datalist id="values">
  <option value="0" label="🥶 too cold!" />
  <option value="15" label="😊 just right" />
  <option value="30" label="🥵 too hot!" />
</datalist>
```

#### [color](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color)

I think this one is underused. Too often, I find custom implementations that lack the basics when it comes to keyboard accessibility, let alone support for assistive technologies. Both of which you get "for free" by using the native input.

```html
<input type="color" />
```

You can use `datalist` again, if you want to offer the user a list of predefined colors:

```html
<input type="color" list="colors" />
<datalist id="colors">
  <option value="#ff000" label="Red" />
  <option value="#00ff00" label="Green" />
  <option value="#0000ff" label="Blue" />
</datalist>
```

Again, yes, the picker itself is not very customisable. But at least the input can be adjusted, and you can even use the old tricks we use for file inputs to completely build your own input UI, and just overlay the native input transparently on top of it.

```html
<label>
  <input type="color" />
  <div class="custom-picker">...</div>
</label>

<style>
  input[type='color'] {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  input[type='color'] + .custom-picker {
    /* do whatever you want */
    /* you _do_ need to communicate the value changes via JS though */
  }
</style>
```

### Custom selects

Ok, this leads us to one of my personal favourites. Another input type that's been the pain for many of us over the past decades is "selects". Dropdowns and autocompletes, where you want to provide the user with a predefined list of options.

Focusing on selects, we've always (since 1995) had the `select` element. It allows you to do just that, define a list of predefined options, and the browser will render a select element and menu for you.

```html
<select name="starter">
  <option value="1">Bulbasaur</option>
  <option value="4">Charmander</option>
  <option value="7">Squirtle</option>
</select>
```

This is great, but it has always been extremely limited. For one, we can't use anything other than plain text as the label of our options. Secondly, we cannot control the styling of the options menu in the picker UI.

This means we can't create very common UI patterns, where our options should have icons or sub-labels. And we can't make the picker blend into the rest of our UI. Bummer!

A [new experimental](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) (baseline limited availability, only in Chrome and Chromium at the time of writing) `appearance` value for selects aims to change that.

```html
<select>
  <option value="1">
    <img src="https://tinyurl.com/bulbasaur-svg" />
    <span>Bulbasaur</span>
  </option>
  <option value="4">
    <img src="https://tinyurl.com/charmander-svg" />
    <span>Charmander</span>
  </option>
  <option value="7">
    <img src="https://tinyurl.com/squirtle-svg" />
    <span>Squirtle</span>
  </option>
</select>

<style>
  select,
  ::picker(select) {
    appearance: base-select;
  }
</style>
```

With just those few lines of CSS, we finally have full control not only over the input itself, but over the picker and the options rendered within the picker as well, e.g:

```css
option {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  padding: 0.2em;
}

option > img {
  width: 1em;
  height: 1em;
}

option > span {
  font-weight: bold;
}
```

We can even customise what the trigger button of our select should look like and whats rendered within it as its selected state, via the new `selectedcontent` element.

Generally speaking, anything that's not an `option` will be treated as the trigger element in the new appearance mode. So we could do something like this:

```html
<select>
  <button>I choose you, <selectedcontent /></button>

  <option value="1">...</option>
  <option value="4">...</option>
  <option value="7">...</option>
</select>
```

`selectedcontent` will render the inner HTML of the currently selected option element. But since we can target the element via CSS, we can again completely customise what we want to show, i.e. hide the `img` element to only show the text label.

```css
selectedcontent > img {
  display: none;
}
```

Now, I could go on for hours writing about the details of this experimental spec and showing examples, but I think instead it's more efficient to link out to some of my favorite resources that do that already:

- https://nerdy.dev/nice-select — Great blog post and codepens by the legend Adam Argyle himself
- https://codepen.io/collection/BNZjPe — Codepen collection by Una Kravets
- https://codepen.io/collection/qOGape — Another codepen collection by Brecht De Ruyte

### Carousels

One last UX pattern, that's also currently in the experimental stage. The ability to build accessible "native" carousels.

```html
<div class="carousel">
  <div class="carousel-item">...</div>
  <div class="carousel-item">...</div>
  <div class="carousel-item">...</div>
</div>
```

These could be image carousels, but they don't have to be. They can contain whatever content we want. The key UX pattern here is that we want:

- The user should be able to scroll through the carousel items.
- We want the items to snap into position, usually meaning we want to make sure the browser snaps the currently active element to the center.
- We want to show "previous" and "next" buttons that allow the user to navigate the carousel manually one item at a time.
- We want to show a "menu" that shows how many carousel items we have, highlights the currently active item, and allows the user to jump to any carousel item by clicking on its respective menu item.

The solution: [scroll behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) and [scroll markers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker).

Scroll behavior allows us to define the snap behaviour we just described.

```css
.carousel {
  scrollbar-width: none;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  & > .carousel-item {
    scroll-snap-stop: always;
    scroll-snap-align: center;
  }
}
```

Scroll markers allow us to define the other UI elements (navigation and menu), purely through CSS. As you would expect, these then automatically come with all of the accessibility perks baked in.

The `::scroll-button` pseudo element gives us control over the navigational buttons (e.g. previous and next):

```css
/* Scroll controls */
.carousel {
  &::scroll-button(left) {
    content: ' ' / 'Previous';
    position: absolute;
    ...
  }

  &::scroll-button(right) {
    content: ' ' / 'Next';
    position: absolute;
    ...
  }
}
```

The `::scroll-marker-group` and `::scroll-marker` pseudo-elements then allow us to create a carousel item navigation:

```css
/* Advanced carousel item navigation */
.carousel {
  scroll-marker-group: after;

  &::scroll-marker-group {
    position: absolute;
    ...
  }

  & > .carousel-item {
  &::scroll-marker {
    content: '' / attr(data-name);
    ...
  }

  &::scroll-marker:target-current {
    ...
  }
}
```

Again, it is probably more sensible and a lot easier to explore and play around with these new features through codepens, rather than me writing endless more examples here in the post.

All-in-all, I hope these examples of new HTML features show how browser capabilities have evolved and keep evolving. And how these built-in features help us build increasingly common UX patterns more easily, and more accessible, most of the time with no Javascript needed.

## Part V: CSS & JS

Let's look at some more examples outside of HTML. What other CSS and even JS features are worth looking at from the same accessibility and "out-of-the-box" angle?

### CSS media queries

A big one is CSS media queries. Over the past years, they have grown more and more advanced, no longer just helping us to implement responsive designs. Here are some examples of media queries that I think matter the most in the context of accessibility.

#### [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

```css
/* Remove or reduce motion where possible */
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0;
  transition-duration: 0;
  ...
}
```

Helps users with motion sensitivity to use your web app. It's a simple setup for any CSS animations and transitions, and usually doesn't add too much overhead even when dealing with JS animations, since you can use the same detection method there.

```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
```

#### [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)

```css
@media (prefers-color-scheme: dark) {
  /* e.g. adjust color tokens to use dark colors */
}
```

You might be more familiar already with this one, given the hype around dark mode UIs over the recent years. This media query allows you to detect the user's preference for dark or light mode, based on the browser settings (which are usually just inherited from the OS settings).

Dark mode can make your web app more usable in dark environments, putting less strain on the user's eyes.

Often, you will want to combine this with a manual toggle, where the user can change the preference for your website specifically.

#### [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast)

```css
@media (prefers-contrast: more) {
  /* provide higher contrast color scheme */
}
```

Back to the lesser-known queries. This media query allows users who have impaired sight to let the browser know they'd prefer higher contrasts to help with that impairment. If you're e.g. using color tokens in your design system, make sure you include tokens for a high contrast version, and switch to those tokens based on the `prefers-contrast` media query. This way, you can e.g. serve AA contrast ratios by default, and AAA as opt-in, to make both your users and your designers happy. Win-win.

### Internationalisation (Intl) API

Let's explore the Javascript landscape a bit. One of the more well-known and yet in my experience most underused APIs in JS is the Internationalisation, aka the Intl API.

Baseline widely available since 2017 (yes, 2017!), it provides a range of utility methods to deal with internationalisation. One of the common mistakes I see people make when they hear about i18n is to immediately jump to translations, and then stay there. Translations undoubtedly are part of good i18n, but there are many other important parts to get right. The Intl API helps with those parts.

#### Formatting numbers, dates and times

```js
/* Numbers */
const number = new Intl.NumberFormat('de-DE');
number.format(value);

const currency = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

/* Dates & times */
const dateShort = new Intl.DateTimeFormat('en-US');
dateShort.format(timestamp);

const dateTimeLong = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
});
```

I cannot count the amount of `formatNumber` or `formatCurrency` helpers I have written as a frontend developer over the years. This API doesn't replace those helpers per se; a big part of a good design system is consistency, especially when it comes to formatting of numbers and the like. However, this API should be used at the core of those opinionated design system-specific formatting helpers.

Beyond just dates and times, the Intl API also provides powerful helpers for durations and relative time formats, with all localisation concerns dealt with for you.

```js
/* Relative time, e.g. "x minutes since" or "in x hours" */
const relativeTime = new Intl.RelativeTimeFormat('en', { style: 'short' });
relativeTime.format(timestamp);

/* Duration, e.g. "10 minutes" or "17 hours" */
const duration = new Intl.DurationFormat('fr-FR', { style: 'long' });
duration.format(durationObject);
```

#### Lists

```js
/* e.g. "Motorcycle, Bus and Car" */
const list = new Intl.ListFormat('en');
list.format(['Motorcycle', 'Bus', 'Car']);

const listLong = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
```

Another extremely common utility we write from scratch: turning arrays of things (e.g. of items we load from a database) into human-readable lists. We can't use common translation techniques for this if the content is served from elsewhere. The list formatter from the Intl API allows us to deal with these scenarios.

The key takeaway here is that these are more examples of utilities we traditionally used to build ourselves from scratch. In the worst case, individually for every project we have. Not only does that lead to technical overhead and debt, but more often than not to inaccuracies and, in consequence, accessibility shortcomings that could easily be avoided by using the built-in platform features.

Even if you're not using these APIs directly (which is likely, and totally fine), I think there still is a responsibility to choose a third-party library that does use them.

### Other Web APIs

I've already spent way too long on the examples, so I won't dive into the details here. This is just a list of Web APIs I personally find very interesting, especially when it comes to accessibility and improving the overall experience for your users:

- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) and [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- [Keyboard API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API)
- [Payment Handler API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API) and [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)
- [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [WebOTP API](https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API)

## Part VI: Testing and tooling

### The (uncomfortable) truth about automated testing

@@@TODO@@@

---

- studies show that you only catch 30-40% of accessibility issues through automated testing -> in other words, 70% aren't being caught
  - that's a lot (some might say too much ;)
- let's focus on manual testing instead then
- there are some toolkits that can help with testing within your codebase
  - axe (eslint, storybook plugins), ???
- but for this blog post, I want to stick to the browser itself, since that was the core premise: use built-in stuff
- for that, I will stick to Chrome here, mainly because that's my day-to-day browser, but I'm sure most of these things are very similarly available in the devtools of other browser vendors

### Accessibility tree

@@@TODO@@@

![](https://substackcdn.com/image/fetch/$s_!GUMT!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F96e1c7bd-b6fc-40a7-bb76-e3ef140cbe4e_3248x2122.png)

@@@TODO@@@

### Color contrast, CSS overview & color emulators

Next are some tools that can help with color contrasts. In the elements panel, in the right circumstances, when you select an element and open the color picker of the color attribute, Chrome will show you additional information about the color contrast and even help you improve it if it currently fails compliance.

![](https://substackcdn.com/image/fetch/$s_!KMyE!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4638ff66-92ff-4882-895c-ace339bdcdde_3248x2122.png)

This is very manual and tedious unless you're debugging a very targeted section of your app. Likely more useful at scale is using the "CSS overview" panel. Beyond other things, it lists all colors you are using on the current page, alongside contrast checks for all of them.

![](https://substackcdn.com/image/fetch/$s_!0vhv!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffab2ee68-170a-4c20-b9a8-55cc805d5fa0_3248x2122.png)

And finally, there's the "Rendering" panel, which goes one step further. It allows you to emulate different kinds of visual impairments to see what users suffering of those would see when they visit your website.

![](https://substackcdn.com/image/fetch/$s_!qfUm!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F588897b1-1415-4931-afe9-b3905bcb103f_3248x2122.png)

Again, all of this can be extremely powerful to identify issues you weren't originally aware of.

### Lighthouse

Ok, this is a bit more Google-specific, but it has become a standard across web development, so it is definitely worth mentioning here, in my opinion: Lighthouse.

![](https://substackcdn.com/image/fetch/$s_!w5_e!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33e13162-6481-4990-8fea-308c63a73558_3248x2122.png)

Among other things, Lighthouse specifically reports on accessibility. The big shout-out I want to do here is not on the actual issues it highlights, even tho they are great, it's on the often-overlooked manual checks lighthouse recommends. As we've seen, automation is hard and most issues won't be detected, so getting a manual checklist "for free" is gold!

## Part VII: Accessibility in the age of AI

### Potential and risks

Ok, finally, let's have a look at AI, and how it might change the way we thing about accessibility in the future. As with almost everything when it comes to AI (at least in my opinion), there are a lot of opportunities here, but also a lot of risks:

#### Potential

- **👍 Automation:** AI can potentially help with that automation issue we mentioned before. It can be trained on patterns and test for more advanced and more nuanced things more efficiently. At the very least, it can likely speed up the manual testing process.
  - ⚠️ But this can also be dangerous if we don't stay in the loop and just "trust me, bro" the AI. Still, I think overall there is a lot of potential here, especially when we give AI agents access to the browser and with it to the [devtools protocol[^10]](), it can perform a lot more sophisticated checks.
- **👍 Content generation:** AI can help with repetetive manual tasks like alt text generation. Again, I think we should always keep the human in the loop, so think of it more as speeding up your work, not doing your work for you.
- **👍 Code generation:** big opportunity to improve default accessibility in new code, given the increasing amount of code gen, assuming models improve and evolve in the right direction
  - ⚠️ Which, at the same time, is probably the biggest risk. Right now I would say we're still quite far away from that, and if models are trained with bad code, the code they generate will also be bad. It's simple: garbage in, garbage out.

#### Risks

- **👎 Biases:** More generally, AI biases are problematic. To be clear, humans are also biased. But AI threatens to amplify those biases by _a lot_ if we're not careful. This is especially poignant, since while I keep insisting that accessibility is for everyone, the group of people that absolutely rely on it to be able to use the web at all is ironically a group that's historically under-represented in training data.
- **👎 Checkbox problem:** Lastly, we'll be fighting what I would call the "checkbox" problem. Big companies already try to take any shortcuts they can. With AI, they will feel like they ticked the checkbox on accessibility and that their job is done, which might counter-intuitively lead to less efforts overall put into the matter.

Like with everything, personally I think AI should be treated as a tool to improve your professional processes and workflows, not completely replace them.

### The web is broken

Before wrapping up, [I want to leave you with one final task[^11]](). Take a pen and paper, and the next time you browse the web and find something that doesn't work quite as you would have expected it to, make a note of it.

- @@TODO@@
- @@TODO@@
- ...

All of this is what we currently feed into our AI models, that are throwing up the next generation of code faster than ever. Garbage in, garbage out.

The first steop is to accept a level of responsibility. Not only developers, anyone working on web products in one capacity or another needs to be more accountable.

None of us can fix the web 100% on our own. I'd even argue we won't be able to fix it 100% with all of us together. But what we _can_ do is to play our part in improving it a little bit at a time, and prevent the damage to become the new norm. This includes using the built-in platform more to make the web more usable and accessible. It includes being responsible in the use of AI.

The web, as it currently is, is broken. And I think we're at a pivot point in history where we will see if we can change that.

---

[^1]:
    Here are a few resources I personally think are doing a very good job covering fundamentals in more depth:

    **Blog posts:** @@@TODO@@@

    **Conference talks & videos:** @@@TODO@@@

[^2]: Spoiler alert, I don't think it will...

[^3]: This is [what the web was made for](@@@TODO@@@): to share information decoupled from its presentation, leaving that completely up to the consuming user. We obviously drifted away from that a bit since the 90s, but still... That was one of the core motivations for the web as an medium different from print.

[^4]:
    This is actually a great example for not knowing what you don't know. I didn't know this behaviour was [part of the spec](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled) until I made this demo...

    It's something I think needs to be discussed more often. Not only does re-implementing accessibility concerns yourself cost a lot more time and effort, you are also _very_ likely to get it wrong, e.g. because you're missing parts you didn't know about.

    Just don't do it if it can be avoided. Pretty please.

[^5]: I wasn't sure where I actually read it, I couldn't find the original book or talk reference. But researching it, it looks like it's a [pretty common marketing rule-of-thumb](https://www.optimove.com/resources/blog/marketing-rule-of-7).

[^6]:
    ["Baseline"](https://web.dev/baseline) is a fairly recent initiative driven by the likes of Google and Mozilla to help developers understand whether or not certain web features are safe to use. We distinguish between: "widely available" (it is supported by all major browsers), "newly available" (it is supported by all major browsers, but support has been added recently) and "limited availability" (not supported by all major browsers).

    This doesn't mean that you can't use features with "limited availability", it just helps you understand which of the features you should treat as [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), vs. which of them you can rely on for core functionality without any polyfills or fallbacks. This philosophy is going to be even more important once we start talking about more experimental features later on in this post, e.g. customisable selects and scroll markers for accessible carousels.

[^7]: To "render the dialog on top of the current page content", the browser uses a different rendering layer for those elements. This means they will always be on top of the document content, independent of any z-index values provided.

[^8]:
    The "trapping of the focus" generally works out-of-the-box with the dialog element. However, if you control the opening of the dialog via Javascript, make sure you use the [showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) method (instead of just open), which will also trigger the focus trap.

    Also, when using Javascript, don't use the close method to close the dialog. Use [requestClose](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/requestClose) instead, which will trigger a close event that you can hook into to prevent the close when necessary (e.g. to prevent unsaved changes from being lost, etc.)

[^9]: Important: the [interest API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/interestForElement) is currently still experimental and only supported by Chrome and Chromium browsers like Edge and Brave. But it [is part](https://github.com/web-platform-tests/interop/blob/main/2026/README.md#dialogs-and-popovers) of the [Interop 2026](https://wpt.fyi/interop-2026) list, which is a list of features browser vendors are aiming to collaborate on to align their implementation and overall support. So hopefully we’ll get there soon.

[^10]: @@TODO@@ - Explain the devtools protocol and add some relevant links here

[^11]: This is heavily inspired by the sentiment [Rich Harris](https://bsky.app/profile/rich-harris.dev) shared (and I'm sure a lot of others did before and after him) in his talk at [JS Nation in 2024](https://youtu.be/UegUi2fWBaU?t=1010), where he describes his core motivations for creating Svelte and continuously innovating with it, and the values it represents. I highly recommend watching both the talk and reading through [this Github discussion](https://github.com/sveltejs/svelte/discussions/10085), which was a result of it and describes the values and "north star" Svelte is aiming for and why.
