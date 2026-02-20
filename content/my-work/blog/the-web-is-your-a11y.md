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

_This is a write-up of a conference talk I’ve given at ../NEW 2025 in Newcastle. It aims to add a bit more context and links to further resources._

## Disclaimer

This blog post aims to showcase some of the latest capabilities in HTML, CSS, and JS that allow us to build complex UX patterns not only much easier but also more accessible by using the built-in platform as much as possible.

That will be the core focus of the post: showing code examples and demonstrating how they can help you make your app more accessible and usable for _everyone_. I will touch on a few core accessibility principles to set the groundwork, but I won’t spend too much time on them. Not because they are not important, they _absolutely_ are, but I think they’ve been covered enough1 that I don’t have to repeat all of that here.

## Part I: Usability — or “why accessibility should matter to you”

### The basics on disability categories

I do want to start with some numbers to get everyone on the same page. One of the more often (and most discouraging) reactions I get when mentioning accessibility and asking product team leads what they do to ensure their product is accessible is something like “our user base doesn’t need this”, or “we’re more of an internal tool for companies, we don’t need to focus on accessibility”.

Some companies even try to back this up, e.g. by stating usage numbers of screen readers and other assistive technologies, showing that virtually no one is using them, ergo “accessibility doesn’t matter”.

Firstly, using analytics data like this is ignorant at best. It’s a self-fulfilling prophecy: if your product is not accessible, no one who would need those accessibility features will be able to properly use or visit your website. So the fact that noone is using your website with assistive technologies should not justify not catering for them.

But almost more important than that, these kinds of arguments all make the same mistake by assuming accessibility is all about screen readers and the like.

> An estimated 1.3 billion people experience significant disability. This represents 16% of the world’s population, or 1 in 6 of us. — https://www.who.int

Roughly 1.3 billion people in the world today have some form of significant disability. This is a number often quoted in the context of accessibility. On the one hand that’s good, we definitely need to raise more awareness around this fact and normalise talking about how we as society can support people with disabilities. On the other hand, I think this rhetoric contributes to the ongoing misconception that these are the only people benefiting from accessibility in software.

To be clear: 16% of the world population is significant and should be an argument alone to care about accessibility. If you’re in Australia and you’re building for the Australian market, the number here is actually more around 20% based on 2023 reports. Why would you ever deliberately cut all those people out as potential customers?

But all of this is just talking about people with permanent disabilities, which doesn’t paint the full picture here. Accessibility goes a lot further than just catering for those. Generally, there are three broader categories we need to consider when we’re talking about accessibility.

![The three categories of disabilities you should consider when talking about how we can build a more accessible world, including the web — https://www.ul.ie](https://substackcdn.com/image/fetch/$s_!AAV8!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88436dcb-9015-4bab-8cb6-785450946983_2400x1480.png)

The first category, “permanent disabilities”, covers those people we just mentioned, those 16% of the world’s population. That’s physical disabilities like blindness or limited mobility, but also non-physical disabilities like dyslexia, ADHD, etc.

The second category includes everyone with “temporary disabilities”. Anyone with a broken arm or leg. Anyone with an eye infection that impacts their vision.

The third category includes everyone with “situational disabilities”. These are things like holding a baby, impairing your movement. Or being outside, and the sun shining onto your screen, affecting your vision. Or being in a crowded, loud place that prevents you from hearing audio properly.

The whole argument of “those 16% are not part of our user group, so we don’t need to care about accessibility” becomes moot extremely quickly when you look at the bigger picture. Literally every one of us will be part of the second and third categories at one point or another.

### Thinking further

And yet, in my opinion, this bigger picture isn’t the full picture still. I like the definition the Mozilla team puts out on their website.

> Accessibility is the practice of making your websites usable by as many people as possible. — https://developer.mozilla.org

The focus is on “usability” for as many users as possible. This does include catering for people with disabilities, but it doesn’t stop there. It also includes things like performance optimisations. Don’t just build for users on the latest iPhones or MacBooks. Don’t just build for users with the fastest internet connection. It includes concerns like cross-browser compatibility. Don’t just build for users on the latest Chrome version. It includes things like optimising for different input devices. Don’t just build for users who have access to a mouse. Build with keyboard accessibility in mind. Build for touch devices. The list goes on and on. I hope you got the gist.

The irony in all of this discussion is that most, if not all, accessibility improvements will usually end up benefiting all your users; it’s a win-win.

And beyond that, I’d even argue that building accessible software even helps your developers on various levels. Accessible code is usually more semantic, meaning it's more likely to “explain itself”, aka being self-documenting. And, to finally segway into the actual topic of this blog post, it often can reduce the amount of code significantly, if you’re using the platform where possible. So, win-win-win?

My general strategy here and advice for anyone who is trying to advocate for accessibility at their company or in their circles: call it “usability”.

## Part II: Affordances

Ok, now that we’re hopefully all on board that accessibility matters, let’s quickly cover one of the major aspects that drives a lot of accessibility concerns. This goes for everything in life, but I believe is especially true for digital media like the web. I’m talking about affordances.

It’s the idea of designing things in a way that their purpose and usage are clear without the need for a manual. The most common example, made popular by Donald Norman in his book “The Design of Everyday Things”, is a teapot. Even if you’ve never seen a teapot in your life, the shape of the spout and handle will still guide you towards its correct usage.

> When affordances are taken advantage of, the user knows what to do just by looking: no picture, label, or instruction needed. — “The Design of Everyday Things” by Donald A. Norman

These everyday examples often use visual affordances, but it doesn’t need to be visual. It could also be haptic or audio cues. It could be as simple as naming the thing in question well, so the correct usage becomes intuitively clear.

I think, especially around web development, this is where a lot of the conversations should start: semantic HTML. We should use semantics to describe our website in a way that anyone interpreting it (be it a human or a machine) knows what is what without needing further instructions.

When we say semantic HTML, I think of three layers:

- **Landmarks:** These are specific HTML tags that allow us to describe the broader structure of our document. They can help users navigate through the site more efficiently. This is their primary purpose: to semantically describe what the content within them is. They usually don’t have any functionality baked into them.
- **Semantic Elements:** These are elements with actual functionality and behaviours baked into them. I know it almost feels like a bit of a meme at this stage. “Use the platform”. But like most (good) memes, this keeps popping up because a lot of it stems from truth. The platform is where the juice is, and in our context, where the browsers do a lot of the work for you.
- **WAI-ARIA attributes:** These attributes are decoupled from HTML elements, meaning they allow you to enhance the accessibility of any element you need. Like landmarks, most of these attributes don’t actually give you functionality out of the box. Instead, you use them to describe the functionality you might have custom-built (e.g. in your Javascript) to ensure the browser and technologies like screen readers have access to the relevant information.

A lot of people, when they hear “accessibility”, mentally immediately jump to the last layer. I hope the code examples we’ll explore in the next parts of this blog post can show you why this isn’t a great approach.

Instead, always go from the top down: can I use a landmark to achieve what I’m aiming for here? No? Can I use semantic elements? No? Then let’s see if there are any ARIA attributes that can help me out.

## Part III: Code examples

Enough theory, though. Let’s look at real code examples to see what all of this means in practice. And let’s start with one that might cause you to roll your eyes, but stay with me, I promise there’s still stuff to learn from it.

### Buttons

```html
<div onClick="{handleClick}">Click me</div>
```

We’ve all seen it. We all say (hopefully mostly truthfully) that we’ve never done it. But it’s out there.

At first sight, the above might seem to work. When I click on the element, it triggers the callback. But we’re smart, and we know that assistive technology like screen readers needs affordances to know that a clickable element is clickable. The semantic here is “button”, so let’s use an aria attribute to label our element accordingly (I know, I know).

```html
<div role="button" onClick="{handleClick}">...</div>
```

Right, but ironically, most assistive technology uses affordances like the “role” attribute to announce the element type whenever it’s focused. Right now, the user cannot focus on our element, because divs by default are not focusable (because they are usually not interactive).

Let’s fix that by adding a tabindex.

```html
<div role="button" tabindex="0" onClick="{handleClick}">...</div>
```

Awesome, the user can now use e.g. their keyboard to focus the element. But they can’t actually trigger it via the keyboard. We only defined a click handler, which listens to mouse clicks (or finger presses on touch devices). To allow users to use the “Enter” key or spacebar to trigger the element, we need to add a keydown handler. Easy enough, though, right?

```html
<div
  role="button"
  tabindex="0"
  onClick="{handleClick}"
  onKeyDown="{handleKeyDown}"
>
  ...
</div>

function handleKeyDown (e) { switch (e.key) { case "Enter": case " ":
handleClick(e); break; } }
```

Phew! Now we have a clickable element that can also be focused, triggered through keyboard events, and is announced correctly by assistive technologies.

What is that? The project manager says we need to disable the element under certain conditions. No problem. We can’t use disabled, that attribute doesn’t exist on `div` elements, but we know ARIA, and we know there is an equivalent for that.

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

Like the `role` attribute, this just tells assistive technology that the element should be disabled, though. It doesn’t actually prevent us `onClick` or `onKeyDown` handlers to trigger. So we have to manually check within those callbacks if the element is disabled.

```html
function handleClick (e) { if (e.target.ariaDisabled !== 'true') { // Do
whatever we want to do... } }
```

Besides styling considerations, the spec also says disabled elements [shouldn’t receive any browsing events](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled#:~:text=If%20the%20disabled%20attribute%20is%20specified%20on%20a%20form%20control%2C%20the%20element%20and%20its%20form%20control%20descendants%20do%20not%20participate%20in%20constraint%20validation.%20Often%20browsers%20grey%20out%20such%20controls%20and%20it%20won%27t%20receive%20any%20browsing%20events%2C%20like%20mouse%20clicks%20or%20focus%2Drelated%20ones.). That doesn’t only include the triggers we just disabled, but it also includes things like focus. So we need to adjust that accordingly.

```html
<div
  role="button"
  aria-diabled={isDisabled}
  tabindex={isDisabled ? "-1" : "0"}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>...</div>
```

I’ll stop here. I hope we can all see how much effort we need to go through to manually make this clickable element accessible. And I know most if not all of you know the solution to this. Just use the button element.

```html
<button onClick="{handleClick}">Click me</button>
```

This element does everything we just implemented, out-of-the-box. And then some. We haven’t even touched on things like submitting forms, triggering dialogs and popovers (we’ll get to those shortly, though) and a lot of other functionality that’s baked into the `button` element.

All of this might seem like a stupid example because it’s obvious to you. But there are extremely valuable lessons to take away from this, which we can apply to pretty much all of the other code examples we’ll be looking at after this:

- Use the platform: there are built-in elements that browsers provide to us for a reason, so when applicable, use them
- ARIA attributes are great for giving more context to assistive technologies where semantic elements can’t or don’t exist, but they don’t replace semantic elements, because they won’t come with the same functionality as those elements
- More generally, the “I can implement this myself, how hard can it be” approach more often than not will lead you down a rabbit hole that will cost a lot of time and effort. If it doesn’t, it’s very likely you just don’t know what accessibility concerns you are actually missing in your custom implementation. Either way, it’s bad.

### Dialogs & popovers

Let’s look at the dialogs and popovers I just mentioned. First, what are they?

Dialogs, or “modals”, usually serve content to sit on top of your current page. This can be really helpful if you want to help keep the user wherever they currently are within your app, while they consume the content in question. Additionally, the dialog content is usually treated as the primary content on the page. While the dialog is active, the user shouldn’t be able to interact with the content on the page behind the dialog. Instead, they will have to close the dialog to do so.

Popovers are very similar, except for that last part. Instead of locking the user in to only be able to interact with the dialog content while it’s active, popovers show the new content while still keeping the previous content behind it enabled.

A variation of the popover you might also be familiar with is “tooltips”. This is additional content that is exposed to the user in the form of a popover, but instead of being triggered by a click (e.g. on a button), tooltips are usually triggered on hover.

All of these are great examples, because they are extremely common UX patterns, and for years we had to build custom solutions using Javascript because the platform didn’t provide native support for them. But that’s not true anymore!

### Dialogs

Let’s start with the [`dialog` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). This was introduced a while ago, and has been widely available as a baseline since 2022.

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
- Rendering the dialog on top of the current page content when active
- Trapping the focus within the dialog while it’s active. This means, while the dialog is active, the browser will prevent the user from interacting with anything outside of the dialog, including both trigger and focus interactions.
- Keyboard accessibility, e.g. closing the dialog by pressing the `escape` key, restoring focus to the last focused element within the document when closing a dialog, etc.

All of this without any Javascript. However, you can use JS with it if you so wish. Like many other HTML elements, the `dialog` DOM element provides additional JS methods to interact with it.

> **Side notes:** A few things worth noting on the above. To “render the dialog on top of the current page content”, the browser uses a different rendering layer for those elements. This means they will always be on top of the document content, independent of any z-index values provided.
>
> The “trapping of the focus” generally works out-of-the-box with the dialog element. However, if you control the opening of the dialog via Javascript, make sure you use the openModal method (instead of just open), which will also trigger the focus trap.
>
> Also, when using Javascript, don’t use the close method to close the dialog. Use requestClose instead, which will trigger a close event that you can hook into to prevent the close when necessary (e.g. to prevent unsaved changes from being lost, etc.)

It’s also worth noting that you can fully control the look and feel of the dialog via CSS. E.g. a common thing to customise is the backdrop, the background that will sit on top of the page content but behind the dialog content. You can adjust it via the ::backdrop pseudo selector.

```css
dialog {
  background: #fff;
  &::backdrop {
    background: #f00;
    opacity: 0.1;
  }
}
```

Another very common requirement when building a dialog component, from a UX perspective, is the ability to animate them in and out. This used to be pretty hard to impossible in CSS, because you couldn’t animate from or to `display: hidden`, but even there, we have made big advancements in recent years.

```css
dialog {
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out,
    display 0.5s allow-discrete,
    overlay 0.5s allow-discrete;
}
dialog:open {
  opacity: 1;
  transform: scale(1);
}

/* Styles for the starting state (when opening) */
/* This ensures a transition from 0 opacity to 1 when the dialog is first displayed */
@starting-style {
  dialog:open {
    opacity: 0;
    transform: scale(0.8);
  }
}
```

Not only can we target the open state of the dialog via the `:open` selector, the new [`starting-style` at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style) allows us to do what we couldn’t before. Animate elements in and out of existence. This is baseline newly available since 2024, meaning it’s been in all major browsers since then.

> **Side note:** I’ve mentioned baseline a couple of times, and will mention it more times as this blog post goes on. [“Baseline”](https://web.dev/baseline) is a fairly recent initiative driven by the likes of Google and Mozilla to help developers understand whether or not certain web features are safe to use. We distinguish between: “widely available” (it is supported by all major browsers), “newly available” (it is supported by all major browsers, but support has been added recently) and “limited availability” (not supported by all major browsers).
>
> This doesn’t mean that you can’t use features with “limited availability”, it just helps you understand which of the features you should treat as [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), vs. which of them you can rely on for core functionality without any polyfills or fallbacks. This philosophy is going to be even more important once we start talking about more experimental features later on in this post, e.g. customisable selects and scroll markers for accessible carousels.

### Popovers

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

### Tooltips

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

And I know I said it before, but I think you cannot stress this enough: all of this without needing a single line of Javascript! Magic!

> **Important:** the [interest API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/interestForElement) is currently still experimental and only supported by Chrome and Chromium browsers like Edge and Brave. But it [is part](https://github.com/web-platform-tests/interop/blob/main/2026/README.md#dialogs-and-popovers) of the [Interop 2026](https://wpt.fyi/interop-2026) list, which is a list of features browser vendors are aiming to collaborate on to align their implementation and overall support. So hopefully we’ll get there soon.

## Accordions

Another UX pattern that isn’t talked about enough (in my opinion) in the context of native HTML capabilities is accordions.

You might know the HTML `details` and `summary` elements. Maybe, like many of us, myself included, you learned about it because one day you wanted to add an accordion to your readme in your Github repo, and that’s the way to do it. Maybe you knew about it already before. Either way, chances are you don’t know the full extent to which these elements can actually help you build better accordions.

```html
<details>
  <summary>Click me to expand or collapse the content</summary>

  <div>
    <p>Some content you want to show in your accordion.</p>
    <p>
      This content can include any valid HTML, including tables, links, images,
      etc.
    </p>
    <img src="https://placecage.vercel.app/200/300" />
  </div>
</details>
```

In the example above, the `details` element defines the content of the accordion, where the `summary` is treated as the content that’s always visible, and usually used as the trigger to expand or collapse the accordion, while everything else within the `details` tag is used as the collapsible content.

Out-of-the-box, without any Javascript, this gives you:

- Keyboard accessibility (hopefully you start seeing a pattern here), e.g. expanding and collapsing the content using `Enter` or `Space`.
- Assistive technology support, so the content gets announced appropriately.
- Visual indication for the current state of the accordion
- One of the coolest features ever, not enough people know about: automatic reveal of the content when the user is using the browser search functionality (Cmd+F) so search the page, when the accordion content includes matches 🤯

Especially the last one is usually overlooked when people implement their own accordion components in their component library or design system. As someone who uses the browser search extensively, let me say this: if you are building any form of documentation website, and you use accordions, and your accordions don’t auto-reveal their content on search, you are THE DEVIL, and I hold you personally accountable for that!

Jokes aside, though, I hope this further highlights (if that was even needed) that accessibility features more often than not benefit all users, not just the ones with disabilities.

Something that’s often mentioned by developers knowing about the details and summary elements, which causes them not to be used, is the assumption that they are not very customisable. That’s not true.

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

But also, we can customise the behaviour. E.g. if we want to have a collection of accordions, where we only want to reveal one content at a time (meaning we want to collapse the currently expanded content if the user expands a different one within the group), we can do so via the `name` attribute.

```html
/* Only one of these accordions will be open at a time */
<details name="demo-group">...</details>
<details name="demo-group">...</details>
<details name="demo-group">...</details>
```

## Forms & inputs

Another thing that’s found in abundance on the web: forms. Most web apps are, in one way or another, really just a collection of tables and forms to update the data shown in the tables.

Now, the `form` element itself is hopefully nothing new, even though we’re using it less and less in the age of JS frameworks and SPAs, but let’s ignore that for a second.

### Form validation and input types

One of the capabilities introduced to HTML forms a while ago, but still often under-utilised, is validation.

```html
<form>
  <input type="text" required />
  <button>Submit</button>
</form>
```

In the example above, if we try to submit the form without filling in the field we [marked as `required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required), we will get a native error message pop-up that tells us we need to fill in that field.

Not only did we get the behaviour for free, but we also got free internationalisation. This error message will be in the user’s language, based on the browser settings. We also get accessibility for free; the error will be announced appropriately by screen readers and other assistive technology. Something I personally didn’t even know how to do manually correctly until very recently. And on top of that, we can use the validation status in our CSS to highlight invalid fields:

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

### Beyond validation

Input types do not only give us advanced validation rules. They can also control browser behaviour, e.g. what keyboard to show on mobile devices. E.g. the keyboard for an email input will be different from the standard keyboard, usually exposing characters like `@`, `-`, `_`, etc. The keyboard for an input of type tel will usually just be the keyboard, with access to the `+` character for country codes.

For anything that doesn’t have a dedicated type, you can use the [`pattern` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern) to give the browser a hint what kind of input you expect from the user, to potentially optimise the input controls:

```html
<input type="text" name="otp" pattern="[0-9]{6}" />
<input type="text" name="otp" pattern="[0-9A-Z]{6}" />
```

### Advanced input types and how to customise them

And then we have even more advanced form inputs that give us extended UIs for users to define specific values.

[**search**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search)

```html
<input type="search" />
```

Again, this allows the browser to render optimised mobile keyboards, in this case including a “search” button that submits the search. It also adds a button to the UI within the text field to clear the search, which can also be triggered by pressing `Escape`.

[**date**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date) / [**time**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time) / [**datetime**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local) / [**week**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/week)

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

These input types are possibly what cause you (and many others) to believe built-in inputs suck. They allow the user to input dates, date & time or specific weeks respectively. However, they are currently not very customisable when it comes to styles or behaviour, but I am hopeful with everything we’re seeing in the ecosystem at the moment that this will change in the future.

[**range**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range)

```html
<input type="range" min="0" max="10" step="2" />
```

This will (by default) render a progress bar with a “thumb” element that allows the user to select a value on the given range. Using the native range input gives you a bunch of accessibility features out of the box:

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

[**color**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color)

I think this one is underused. Too often, I find custom implementations that lack the basics when it comes to keyboard accessibility, let alone support for assistive technologies. Both of which you get “for free” by using the native input.

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

Ok, this leads us to one of my personal favourites. Another input type that’s been the pain for many of us over the past decades is “selects”. Dropdowns and autocompletes, where you want to provide the user with a predefined list of options.

Focusing on selects, we’ve always (since 1995) had the `select` element. It allows you to do just that, define a list of predefined options, and the browser will render a select element and menu for you.

```html
<select name="starter">
  <option value="1">Bulbasaur</option>
  <option value="4">Charmander</option>
  <option value="7">Squirtle</option>
</select>
```

This is great, but it has always been extremely limited. For one, we can’t use anything other than plain text as the label of our options. Secondly, we cannot control the styling of the options menu in the picker UI.

This means we can’t create very common UI patterns, where our options should have icons or sub-labels. And we can’t make the picker blend into the rest of our UI. Bummer!

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

Generally speaking, anything that’s not an `option` will be treated as the trigger element in the new appearance mode. So we could do something like this:

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

Now, I could go on for hours writing about the details of this experimental spec and showing examples, but I think instead it’s more efficient to link out to some of my favorite resources that do that already:

- https://nerdy.dev/nice-select — Great blog post and codepens by the legend Adam Argyle himself
- https://codepen.io/collection/BNZjPe — Codepen collection by Una Kravets
- https://codepen.io/collection/qOGape — Another codepen collection by Brecht De Ruyte

### Carousels

One last UX pattern, that’s also currently in the experimental stage. The ability to build accessible “native” carousels.

```html
<div class="carousel">
  <div class="carousel-item">...</div>
  <div class="carousel-item">...</div>
  <div class="carousel-item">...</div>
</div>
```

These could be image carousels, but they don’t have to be. They can contain whatever content we want. The key UX pattern here is that we want:

- The user should be able to scroll through the carousel items.
- We want the items to snap into position, usually meaning we want to make sure the browser snaps the currently active element to the center.
- We want to show “previous” and “next” buttons that allow the user to navigate the carousel manually one item at a time.
- We want to show a “menu” that shows how many carousel items we have, highlights the currently active item, and allows the user to jump to any carousel item by clicking on its respective menu item.

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

## Part IV: Beyond HTML — Accessibility in CSS & JS

Let’s look at some more examples outside of HTML. What other CSS and even JS features are worth looking at from the same accessibility and “out-of-the-box” angle?

### CSS media queries

A big one is CSS media queries. Over the past years, they have grown more and more advanced, no longer just helping us to implement responsive designs. Here are some examples of media queries that I think matter the most in the context of accessibility.

[**prefers-reduced-motion**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

```css
/* Remove or reduce motion where possible */
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0;
  transition-duration: 0;
  ...
}
```

Helps users with motion sensitivity to use your web app. It’s a simple setup for any CSS animations and transitions, and usually doesn’t add too much overhead even when dealing with JS animations, since you can use the same detection method there.

```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
```

[**prefers-color-scheme**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)

```css
@media (prefers-color-scheme: dark) {
  /* e.g. adjust color tokens to use dark colors */
}
```

You might be more familiar already with this one, given the hype around dark mode UIs over the recent years. This media query allows you to detect the user’s preference for dark or light mode, based on the browser settings (which are usually just inherited from the OS settings).

Dark mode can make your web app more usable in dark environments, putting less strain on the user’s eyes.

Often, you will want to combine this with a manual toggle, where the user can change the preference for your website specifically.

[**prefers-contrast**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast)

```css
@media (prefers-contrast: more) {
  /* provide higher contrast color scheme */
}
```

Back to the lesser-known queries. This media query allows users who have impaired sight to let the browser know they’d prefer higher contrasts to help with that impairment. If you’re e.g. using color tokens in your design system, make sure you include tokens for a high contrast version, and switch to those tokens based on the `prefers-contrast` media query. This way, you can e.g. serve AA contrast ratios by default, and AAA as opt-in, to make both your users and your designers happy. Win-win.

### Internationalisation (I18n)

Let’s explore the Javascript landscape a bit. One of the more well-known and yet in my experience most underused APIs in JS is the Internationalisation, aka the Intl API.

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

I cannot count the amount of `formatNumber` or `formatCurrency` helpers I have written as a frontend developer over the years. This API doesn’t replace those helpers per se; a big part of a good design system is consistency, especially when it comes to formatting of numbers and the like. However, this API should be used at the core of those opinionated design system-specific formatting helpers.

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

Another extremely common utility we write from scratch: turning arrays of things (e.g. of items we load from a database) into human-readable lists. We can’t use common translation techniques for this if the content is served from elsewhere. The list formatter from the Intl API allows us to deal with these scenarios.

The key takeaway here is that these are more examples of utilities we traditionally used to build ourselves from scratch. In the worst case, individually for every project we have. Not only does that lead to technical overhead and debt, but more often than not to inaccuracies and, in consequence, accessibility shortcomings that could easily be avoided by using the built-in platform features.

Even if you’re not using these APIs directly (which is likely, and totally fine), I think there still is a responsibility to choose a third-party library that does use them.

### Other useful Web APIs

- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) and [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- [Keyboard API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API)
- [Payment Handler API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API) and [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)
- [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [WebOTP API](https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API)

## Part V: Automated testing and tooling

Ok, I hope there were some interesting bits in these examples for at least some of you. And I hope through repetition that I managed to make my point clear: use the platform.

Now that we have a few ideas on how we can do that more, let’s deal with the next common question teams have. How can we test our web apps' accessibility, ideally directly in the browser?

There are obviously [a lot of tools](https://www.webyes.com/) [and libraries](https://www.deque.com/axe/devtools/) out there that help you with this. But the topic of this blog post is focused on “the platform”, so let’s look at what browsers themselves have to offer here.

### The (uncomfortable) truth about automated testing

Testing, especially in the context of accessibility, is extremely nuanced.

We can check for things like missing alt texts, but we can’t really test easily if the alt text we do detect is actually accurate or helpful for the user in this particular instance. We can check that elements that should be focusable are in fact focusable (or vice versa, an element that shouldn’t be isn’t), but we can’t really test easily whether we covered all elements that should or shouldn’t be focusable. We’re limited to the range of elements we identified and added to the tests manually.

[Studies](https://alphagov.github.io/accessibility-tool-audit/) have repeatedly shown that [only 30-40% of accessibility issues are actually being caught by automated testing](https://www.a11yproject.com/posts/automated-tools-can-ensure-full-accessibility-compliance/#:~:text=Studies%20highlight%20this%20gap.%20A%20Government%20Digital%20Service%20(GDS%20audit%20revealed%20that%20even%20the%20best%20automated%20tools%20detect%20only%2030%2D40%25%20of%20known%20accessibility%20issues.%20Accessibility%20expert%20Karl%20Groves%20notes%20that%20only%2025%20to%2033%25%20of%20WCAG%20guidelines%20can%20be%20reliably%20tested%20with%20automation.). Which, in other words, means: 70% of issues aren’t being caught. That’s _a lot_!

### Manual testing and debugging through the dev tools

So let’s focus on manual testing (for now). In this section, I’m mostly going to explore Google Chrome, since that’s the browser I personally have the most experience with. But that doesn’t mean these features are exclusive to Chrome or Chromium. If you’re using other browsers, it’s definitely worth checking them for similar functionality.

#### Accessibility tree

One of the most important tools to understand what assistive tools like screen readers see when they see your web app.

While most developers are very familiar with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), and maybe even the [CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model), and the elements tree in the devtools. None of this is what those assistive tools see. They use what we call the “accessibility tree”. It’s a simplified version of the DOM tree, with the main purpose to communicate the roles and meta information of the elements on the page.

![](https://substackcdn.com/image/fetch/$s_!GUMT!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F96e1c7bd-b6fc-40a7-bb76-e3ef140cbe4e_3248x2122.png)

If you ever want to ensure that certain elements are announced the way you want them to, this is the place to check. In recent versions, Chrome has made it increasingly easy to access this tree right from the elements view.

#### Color contrast, CSS overview panel & color blindness emulators

Next are some tools that can help with color contrasts. In the elements panel, in the right circumstances, when you select an element and open the color picker of the color attribute, Chrome will show you additional information about the color contrast and even help you improve it if it currently fails compliance.

![](https://substackcdn.com/image/fetch/$s_!KMyE!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4638ff66-92ff-4882-895c-ace339bdcdde_3248x2122.png)

This is very manual and tedious unless you're debugging a very targeted section of your app. Likely more useful at scale is using the “CSS overview” panel. Beyond other things, it lists all colors you are using on the current page, alongside contrast checks for all of them.

![](https://substackcdn.com/image/fetch/$s_!0vhv!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffab2ee68-170a-4c20-b9a8-55cc805d5fa0_3248x2122.png)

And finally, there’s the “Rendering” panel, which goes one step further. It allows you to emulate different kinds of visual impairments to see what users suffering of those would see when they visit your website.

![](https://substackcdn.com/image/fetch/$s_!qfUm!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F588897b1-1415-4931-afe9-b3905bcb103f_3248x2122.png)

Again, all of this can be extremely powerful to identify issues you weren’t originally aware of.

#### Lighthouse

Ok, this is a bit more Google-specific, but it has become a standard across web development, so it is definitely worth mentioning here, in my opinion: Lighthouse.

![](https://substackcdn.com/image/fetch/$s_!w5_e!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33e13162-6481-4990-8fea-308c63a73558_3248x2122.png)

Among other things, Lighthouse specifically reports on accessibility. The big shout-out I want to do here is not on the actual issues it highlights, even tho they are great, it’s on the often-overlooked “manual checks” lighthouse recommends. These are gold!

## Part VI: Accessibility in the age of AI

Finally, I want to talk about AI in the context of accessibility. Not only because it feels mandatory these days to do so, but because I genuinely think it’s important to start this discussion rather sooner than later, ideally yesterday.

### The potential and the risk of AI

There are a lot of applications for AI when it comes to accessibility, probably enough for a blog post of its own. A big one, based on what we just explored, is automation.

Things like automatically generating content for captions and alt texts based on the media, the recent boom in LLM power definitely gives us that. And one of the reasons I mentioned automated testing and manual testing tools before is that I think it does actually feed into this AI discussion.

I think AI has massive potential to improve accessibility on the web in the near to long-term future. One of the problems with automated testing is that, at the moment, you still have to write the tests that do something on your website to then check if it’s accessible. As we’ve seen, that’s very limited. It’s also very biased. [Expand]

AI, especially AI agents that can use the browser for you, could be a great way to break out of that. We could just give the agent instructions on what it should do on the website and let it explore whether it can do it in an accessible manner. Furthermore, we could instruct or restrict the agent to only use the keyboard or only use a screen reader to do the same tasks.

This really gets me excited about the usage of AI. Another aspect to consider is that a lot of those devtool features we just looked at, alongside many more, are available programmatically through the [devtools protocol](https://chromedevtools.github.io/devtools-protocol/).

This means we could give those agents access to those tools as well, for even more accurate accessibility assessments. The other huge opportunity I can see is better training of LLMs, with a focus on accessibility. The more popular code-gen tools become, the more important it becomes that this generated code actually has a certain level of quality. And a big quality measure _should be_ the accessibility of the application it created.

Which leads to the risks that AI brings in my eyes.

Right now, that quality is just not there. And if we don’t follow up on the potential of fixing the training, this will become a massive problem real quick. It’s the good old “garbage in, garbage out” problem, and it will affect a lot of people.

The other common AI problem is bias. Again, this topic probably deserves a blog post of its own. But generally speaking, it comes down to what the models are trained on. Currently, and historically, we haven’t been very good at including underrepresented groups enough in training data, which includes people with disabilities. Having AI drive more of the code-gen on the web means those biases will spread very quickly.

And all of this while at the same time triggering what some people call the “checkbox” phenomenon. Because a lot of companies don’t really see the value of accessibility, for one reason or another, they often only invest in it as much as they need to. Basically, they will do whatever needs to be done to get that “checkbox” ticked. Introducing AI allows those companies to say they’re using the latest tech and tick that checkbox, completely ignoring the quality problems we just talked about that AI likely still comes with, especially in the early days.

So, if you ask me, it’s pretty much like all other usages of AI: does it have huge potential? Absolutely. Should we use it? Also, absolutely. Do we need to be careful and mitigate a lot of risks? I think 100%, yes!

### The web is broken

![](https://substackcdn.com/image/fetch/$s_!R67O!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F471e8ce7-4738-4b33-baae-6d1dc597025f_2400x1350.png)

To highlight what I mean by those risks regarding what we’re training current LLMs with, I want to leave everyone with this challenge. I think in general, but especially when it comes to the accessibility and usability of the web, we have to start being honest with ourselves: the web is not fine, it’s broken.

Next time you’re using the web, take a piece of paper and put it next to your computer or carry it around with you. Then, every time you’re on a website that’s broken in some way, make a note of it.

If you try to focus on an element with your keyboard but you can’t, make a note of it.

If you can focus on an element, but you can’t actually see it, because the designers decided to remove the focus styles on all elements because they “look ugly”, make a note of it.

If you cmd+click on a link, and it doesn’t open in a new tab because it’s not actually using an anchor element but a JS click handler instead, make a note of it.

The first step is accepting that this is the status quo. The next step is to accept that we as developers have the responsibility, but also the opportunity, to fix that.

Not 100%. Not for every website on the planet. But small steps that you can take within your products and your range of influence can go an extremely long way for a lot of people. And those actions can help amplify the importance of this work to encourage others to do the same.
