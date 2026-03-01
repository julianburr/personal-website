---
title: It's Time to Talk About Signals
description: What they are, how they work, and why the TC39 proposal is so exciting
type: write-up
date: 2025-06-14
platform: Substack
talkUrl: /my-work/talks/its-time-to-talk-about-signals
externalUrl: https://julianburr.substack.com/p/its-time-to-talk-about-signals
coverUrl: https://storage.googleapis.com/julianburr-me-assets/blog-covers/its-time-to-talk-about-signals.png
---

_This is a write-up of a [conference talk](/my-work/talks/its-time-to-talk-about-signals) I’ve given at [ReactSummit US 2025](https://gitnation.com/contents/from-pull-to-push-its-time-to-talk-about-signals) and other conferences, going a bit more into detail in some areas and linking out to further resources and references._

---

## Introduction

Signals have been a hot topic in the frontend community for a few years now, not only becoming increasingly popular in modern frameworks but also often the centre of heated discussions. I think we’ve hit that spot now, where it’s been long enough for many people to have heard about Signals, but many still do not really know what they are and what all the fuss is about, but now it’s too late to ask.

Especially with the TC39 proposal actively being worked on that aims to bring Signals into the core of the Javascript language, I believe it’s becoming more and more important to look under the hood. So in this post, I’m aiming to explore the fundamentals of web reactivity, how Signals fit into it, the problems they are trying to solve, and how they evolved into what we have today.

Before we get into things, though, a quick disclaimer: this is not an ode for Signals (and if you or your framework of choice is not using them, you’re wrong), nor one against them. The goal of this blog post is purely to introduce everyone to the underlying concepts, so you can hopefully make a more informed decision about whether signals are a good fit for you and your team.

## What are Signals?

Ok, to make sure everyone’s on the same page, let’s start at the very beginning. What are Signals?

In a nutshell, Signals are the idea of reactive variables in Javascript. What does that mean? Let’s imagine a very basic code example:

```js
let counter = 1;
let isEven = counter % 2 === 0;
let parity = isEven ? 'even' : 'odd';
```

In the code above, we’re declaring a few variables. counter is being assigned a plain primitive value (i.e. a number), the other two, however, are being calculated using previously declared values. We can call these “derived” values.

However, plain Javascript doesn’t really have a concept of dealing with derived values. What’s actually being stored are the primitive values of false and odd respectively, not the formula for how these values are calculated based on the other variables they depend on.

What that means is, if we change counter (which we can, since it’s just a mutable variable), by default nothing else happens. We have to manually re-assign isEven and parity again based on the new value of counter.

```js
counter = 6;
isEven = counter % 2 === 0; // redundant
parity = isEven ? 'even' : 'odd'; // redundant
```

Not only is this pretty redundant, it’s also error-prone. It’s easy to forget to recalculate variables that need recalculating based on our “state change”. We might also accidentally use the wrong logic to recalculate them, leading to a mismatched state.

Let’s pretend instead we had a magical new assignment operator that would allow us to tell the compiler that we want isEven and parity to be reactive. Meaning, we want their values to automatically recalculate whenever any of their dependents change. This has nothing to do with signals or the TC39 proposal just yet, it’s just a pseudo-code thought experiment to showcase reactive variables. It could look something like this:

```js
let counter = 1;
let isEven $= counter % 2 === 0;
let parity $= isEven ? "even" : "odd";

counter = 6;
// We don't need to do anything else
// The compiler automatically re-calculates `isEven` and `parity`
```

Instead of the normal `=`, we use the new `$=` reactive assignment operator. Now, if we change the value of counter, the compiler knows to automatically update any reactive variables that depend on it. Awesome, right?

## But … side effects are bad, right?

Your initial reaction might be scepticism, and rightfully so. Why would we want this? Most of us very likely learned early in our careers (especially when working with JS) that side effects are bad and should be avoided.

For me, when I started as a developer, the most common architectural principle for larger applications was MVC — model, view, controller. The core of this principle was that the view was always supposed to be a pure function of your model. In more modern terms, the UI should always be the result of a pure function of your state.

![Illustration of the MVC principle — your UI should be the result of a pure function of your state (aka your data)](https://substackcdn.com/image/fetch/$s_!-1hs!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F729a11ef-bd66-4984-9343-b7807fa40038_2400x1280.png)

Sounds familiar? This is one of the core principles that frameworks like React introduced and that made them so successful.

Pure functions are great for many reasons:

- They are predictable: if you feed the same state in, you always get the same UI out
- This makes them much easier to reason about and debug when something isn’t working as expected
- In general, following this principle helps avoid common pitfalls where the application state gets out of sync

Signals (or more generally, the idea of reactive variables), as we’ve just seen, feel very side-effect-y. We update the state, and auto-magically other stuff happens. So why would we want that?

The fact is, most of what we do as frontend developers can be boiled down to this:

- Managing state
- Managing actions that change the state
- Translating state (and state changes) to UI

Again, that’s exactly what the MVC model was built around. To understand how Signals can help with that and how we got from the purer MVC model to Signals, let’s take another step back and look at the history of reactivity on the web.

## From “pull” to “push” — a brief history of reactivity on the web

I’ll try to keep it short, I promise. But I think it’s important to understand how Signals have evolved and how they compare to alternative approaches.

### HTML & PHP (1990s)

And we have to start at the very beginning, or at least close to it. Some might say “the good ol’ times”, when things were a lot simpler. Plain HTML, generated by some kind of server-side language.

```html
<?php
  $counter = $_GET["counter"];
?>

<html>
  <body>
    <a href="?counter=<?php echo $counter + 1; ?>"></a>
    <a href="?counter=<?php echo $counter - 1; ?>"> </a>
    <p>Counter: <?php echo $counter; ?></p>
    <p>Parity: <?php echo $counter % 2 ? "odd" : "even"; ?></p>
  </body>
</html>
```

I’m using PHP as the example here, mainly because that was the language of choice when I started out. But it really doesn’t matter; any server-side language will do. The idea at the time was simple: we would have templates on the server that, based on the state, would return the UI to the user.

Our state comes from the request’s counter query param. Whenever the query param changes, the browser will go back to the server and re-request the page, which will re-run this template and return the new UI based on the new state.

![“Pull” based reactivity — on every state change, we’re pulling the new UI from the source of truth (e.g. in this case, the server)](https://substackcdn.com/image/fetch/$s_!DRdG!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1562ca50-9282-492b-84b9-f43fb8525483_1080x1400.png)

This method is what we would call the “pull” approach. It’s the perfect example of the “pure function” principle we talked about before. And it comes with all the benefits we said: it’s highly predictable, it’s easy to reason about when reading the code, and since we’re re-requesting the whole page every time some state changes, it’s almost impossible to end up with an inconsistent state within the UI.

As a useful helper for a mental model, you can compare this to game development. In the very early days of 2D games, we would normally draw the entire scene on every frame based on the current state, which changes over time, e.g., through user input. Because we’re redrawing the whole scene, we can be sure it will be fully coherent with the game state.

However, this approach has one (possibly obvious) downside: performance. It’s obviously not cheap to re-request the whole page on every state change, especially nowadays, where applications are more dynamic and stateful than ever.

So this isn’t really scalable.

### jQuery & AJAX (2005)

Enter Javascript. More specifically: jQuery.

> **Side tengant (possibly showing my age):** One of the unsung heroes of the web. Without going too much into a nostalgia tangent here, I do want to highlight that I think JavaScript probably wouldn’t have made it as the “language of the web” without jQuery. jQuery made it much more accessible for developers when browsers were still figuring out the basics and doing things quite differently from one another.

jQuery helped us with the core tasks we perform in web apps: handling state, listening for user events to trigger actions, and updating the DOM in response. It also introduced most developers to another emerging technology at the time: [AJAX](<https://en.wikipedia.org/wiki/Ajax_(programming)>).

```html
<button id="increase"></button>
<button id="decrease"></button>
<div id="content" data-count="0">
  <p>Counter: 0</p>
  <p>Parity: even</p>
</div>

<script>
  function update (inc) {
    var value = $("#content").attr("data-count") + inc;
    $("#content").attr("data-count", value);
    $.ajax(serverUrl, { value }).done((html) =>
      $("#content").html(html);
    });
  }

  $("#increase").click(() => update(1));
  $("#decrease").click(() => update(-1));
</script>
```

The original idea came from a [team at Microsoft](https://techcommunity.microsoft.com/blog/exchange/outlook-web-access---a-catalyst-for-web-evolution/608860) to allow the Outlook Web Access client to fetch the latest state of your inbox even after the page has finished loading. A team at Google picked it up and refined it into the standard we now know as AJAX (asynchronous Javascript and XML). jQuery, in good old jQuery fashion, took that API and made it more accessible for developers by creating [first-class helpers](https://api.jquery.com/jQuery.ajax/) that improved the DX.

With AJAX, we were able to make additional server calls at runtime, based on user actions or other triggers, after the initial page load had completed. We’re probably taking this for granted today, but at the time, this was revolutionary. And it offered a potential solution to our reactivity performance issues.

What if we only re-request the parts of the page that we know actually change based on the state change, instead of the whole page? This would do a few things:

- It would reduce the amount of stuff we need to request, meaning the server would need to do less work, which means it can respond faster
- But maybe more important than that, we’re not in full control over the interaction on the client side, so we can decide what we want to show and do while this is happening

No full page reload. We can just hide the UI we know will change, show a loading spinner, and swap it out with the final content once the AJAX request resolves. So not only is this approach faster, but it’s also much better from a user experience perspective.

It’s still a “pull” approach (we’re still pulling the new UI from the server whenever the state changes), but I would call it an “improved” version of it, since we’re not pulling the whole UI anymore, only the bits we really need.

Using our game development analogy, you can think of this as what’s known as [“immediate-mode”](<https://en.wikipedia.org/wiki/Immediate_mode_(computer_graphics)>). We’re still declaratively describing what should be drawn at any given time, even if we’re not necessarily re-drawing the whole scene every frame.

Unfortunately, I think jQuery was a bit ahead of its time, which left us with two fairly major issues: for one, while it helped a lot in making JS more accessible, there wasn’t really a huge ecosystem (yet) helping developers build large-scale, dynamic and reactive applications, meaning most of us kept re-inventing the wheel trying to do so. Which is sadly why these days are still remembered as the [“spaghetti code”](https://css-tricks.com/reactive-jquery-for-spaghetti-fied-legacy-codebases-or-when-you-cant-have-nice-things/) era.

The other issue is that by only partially fetching and replacing the UI, we introduced the potential for inconsistencies, thereby losing one of the core benefits of the original “pure” approach. It’s still better than what we had before, just not perfect.

### jQuery — going all-in on client-side

Also, once we got a taste, we quickly went even further. If we’re controlling UI changes in our JS now, why not move them entirely to the client and make them even more granular?

Basically, instead of asking the server to give us the new UI, why don’t we just mutate the DOM directly, especially for simple state changes? It’s even faster, since we’re cutting out the most expensive part, the server request.

```html
<button id="increase"></button>
<button id="decrease"></button>
<div id="content" data-count="0">
  <p>Counter: <span id="counter"></span></p>
  <p>Parity: <span id="parity"></span></p>
</div>

<script>
  function update (inc) {
    var value = $("#content").attr("data-count") + inc;
    var parity = value % 2 ? "odd" "even";
    $("#content").attr("data-count", value);
    $("#counter").text(value);
    $("#parity").text(parity);
  }

  update($content.attr("data-count"));
  $("#increase").click(() => update(1));
  $("#decrease").click(() => update(-1));
</script>
```

While it might look very similar, mainly because both examples use jQuery syntax, this technique turns our whole approach upside-down.

![“Push” based reactivity — whenever a state-changing action is triggered, we’re atomically updating the UI directly where needed, instead of relying on a separate source of truth re-constructing the whole UI for the new state](https://substackcdn.com/image/fetch/$s_!fqUk!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67b9ca77-ac36-4161-a339-62f8799f4f3f_1080x1400.png)

We would call this the “push” approach. We’re no longer “pulling” the new UI from somewhere (e.g. our server), instead we’re directly “pushing” the changes to the DOM.

And that means we lose all the benefits of the “pull” approach:

Mutating the DOM directly is much less predictable, harder to reason about, and harder to debug

It’s also much easier now to mess up, leading to an inconsistent state across the UI

On top of that, we’ve blurred the line between frontend and backend, making it unclear who’s responsible for the content. We’re still serving the initial content from templates on the server, but we adjust them on the fly on the frontend. It’s messy; we officially went too far.

### Frameworks to the Rescue — KnockoutJS (2010)

The first step to fixing this situation was the introduction of full client-side application frameworks.

```html
<button data-bind="click: increase"></button>
<button data-bind="click: decrease"></button>
<p>Counter: <span data-bind="text: counter"></span>>/p<</p>
<p>Parity: <span data-bind="text: parity"></span></p>

<script>
  function ViewModel () {
    this.counter = ko.observable(0);
    this.parity = ko.computed(() => this.counter() % 2 ? "odd" : "even");
    this.decrease = () => this.counter(this.counter() - 1);
    this.increase () => this.counter(this.counter() + 1);
  }

  ko.applyBindings(new ViewModel()):
</script>
```

I’m going with KnockoutJS here for a few reasons: mainly, it was the first framework I used professionally. Also, as such, Knockout was one of the earliest to introduce the three layers that still define application frameworks to this day:

- A way to manage your state, in this case, the `ViewModel`
- A way to define your UI via templates
- And, critically, a layer to combine those two, which we call “data binding”; it’s what gives your templating layer access to your state

To make that data-binding layer work, Knockout became one of the first frameworks to popularise the idea of reactive variables (calling them “observables”). And derived values, which were called “computeds”, but the concepts are the same as we saw in our initial pseudo-code thought experiment.

Whenever any `ko.observable` changes, all `ko.computed` values that use that observable would automatically re-calculate, and since you directly reference them in your UI, your UI would automatically update as well — magic!

To wrap up our game development analogy, this method of keeping track of your nodes in dependency trees and updating only what you need based on changes is comparable to [“retained-mode”](https://en.wikipedia.org/wiki/Retained_mode). The goal is to reduce unnecessary compute to make scene updates more efficient.

Now, underneath the hood, this is still a “push” approach, but the framework gives us a “pull”-like developer experience through those templating and data-binding layers; we feel like we’re in full control of how the state is represented in our UI at any given time.

So this is kind of a win-win situation; the performance benefits of the “push” approach, with the developer experience of the “pull” approach.

### The idea caught on...

And you can see that it worked by looking at other frameworks over the next decade.

```html
<button v-on:click="count++"></button>
<button v-on:click="count--"></button>
<p>Counter: {{ counter }}</p>
<p>Parity: {{ parity }}</p>

<script>
  var vm = new Vue({
    data: {
      counter: 0
    },
    computed: {
      parity: function () {
        return this.counter % 2 ? "odd" 'even";
      }
    }
  });
</script>
```

E.g. VueJS (2014), which had the concept of `data` and `computed` data for your reactive state management, which again was easily exposed within your templates through data bindings (in this case, through curly bracelets and `v-*` attributes, but the idea is still the same).

Newer versions of Vue have the concept of [“refs”](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) (not to be confused with [“template refs”](https://hackernoon.com/the-fundamental-principles-behind-mobx-7a725f71f3e8)), which is again the same concept, just in a more developer-friendly form.

```svelte
<button on:click={increase}> </button> "PUSH"
<button on:click={decrease}> </button>
<p>Counter: {counter}</p>
<p>Parity: {parity}</p>

let counter = 0;
const decrease = () => { counter -= 1; }
const increase = () => { counter += 1; }
const parity = counter % 2 ?
```

Svelte (2016) also used signal-like structures for its reactivity. It’s hard to see in the early days, though, because Svelte used to hide it behind its compiler, which turned all normal variables reactive underneath the hood.

```svelte
<button on:click={increase}></button>
<button on:click={decrease}> </button>
<p>Counter: {counter}</p>
<p>Parity: {parity}</p>

let counter = $state(0);
const decrease = () => { counter -= 1; }
const increase = () => { counter += 1; }
const parity = $derived(counter % 2 ? "odd" : "even");
```

A few years later, they (in my opinion, rightfully) decided that was a bit too much “black magic” and made the syntax more explicit by introducing [runes](http://svelte.dev/blog/runes), with `$state` and `$derived` doing the heavy lifting.

```js
function App() {
  const [counter, setCounter] = createSignal(0);
  const decrease = () => setCounter(counter() - 1);
  const increase = () => setCounter(counter() + 1);
  const parity = createComputed(() => (counter() % 2 ? 'odd' : 'even'));

  return (
    <>
      <button onClick={increase}></button>
      <button onClick={decrease}></button>
      <p>Counter: {counter}</p>
      <p>Parity: {parity}</p>
    </>
  );
}
```

And then Solid (2019) came around and coined the term “Signals” (or at least they get all the praise for it).

The list could go on and on, by the way, with frameworks like Angular changing their core architecture to Signals more recently (2023). And while the core ideas and principles remain the same as those introduced by KnockoutJS with its observables, the implementation has certainly been refined and improved over the years.

Which is one of the reasons Solid also began calling it a “pull-then-push” approach. We’ll go into what exactly that means in a bit. For now, it’s just important to note that it’s the improved version of the “pull” approach we ended up with today.

## Let’s talk about the elephant in the room

This should give you a rough idea of how we evolved from very pure “pull” approaches to Signals and “push” approaches within our client-side application frameworks. Essentially, we’ve been trading DX benefits of predictability and debuggability for performance benefits, with full application frameworks trying to give us the illusion of getting the best of both worlds.

But there is one major framework I haven’t mentioned yet (and some of you might be internally screaming about it), so let’s talk about React.

Since the very beginning, React has embraced the traditional “pull” approach. In fact, the reason the team at Facebook came up with the framework in the first place was to combat the increasingly “push”- oriented approaches within the team, which led to a lot of frustration with state inconsistencies and bugs in their apps.

> **Side note:** I don’t want to derail this blog post too much. If you want to learn more about this, I highly recommend watching the [2014 talk where they introduced React and Flux](https://www.youtube.com/watch?v=nYkdrAPrdcw) (their top-down state management system, which, not too long after, inspired the creation of Redux).

```js
function App () {
  const [counter, setCounter] = useState(0);
  const parity = useMemo(() => counter % 2 ? "odd" : "even");

  const decrease = () => setCounter(counter - 1);
  const increase = () => setCounter(counter + 1);

  return (
    <>
      <button onClick={decrement}></button>
      <button onClick={increment}></button>
      <p>Counter: {counter}</p
      <p>Parity: {parity}</p>
    </>
  );
}
```

While this code might look very similar to the Solid code we’ve seen before, there is no fine-grained state control going on here. Instead, React treats your application as a set of nested pure functions and, by embracing the “pull” approach, essentially re-renders your whole app every time some state changes.

Now, React tries to get away with that performance penalty through a few methods:

- For one, the componentisation itself: by breaking the app into many independent, much smaller parts, React can be much smarter about which parts actually need to re-render. e.g. state ideally lives within the components that need it, so whenever that state changes, only its component (and its children) need to re-render
- Secondly, virtual DOM: React tries to calculate what actually changes before updating the DOM, allowing it to skip many unnecessary yet time-consuming DOM manipulations.
- Thirdly, memoisation: that’s why your React code is cluttered with useMemo and useCallback, and in the future

The last two are worth seeing as a compromise. What they save in performance, they might cost in memory usage, so it’s all about finding the right balance.

To draw a comparison to game development for the last time (I promise): a lot of 3D renderers still redraw whole scenes on every frame, we have just come up with a lot of techniques to make those redraws more efficient, e.g. culling, batching, GPU-driven pipelines, updating only changed materials, etc.

The team even doubled down on this with the new compiler, which will take memoisation to a whole other level.

https://x.com/acdlite/status/1626590880126889984

### But aren’t Signals just making everything faster? Why not use them within React?

As I said in the beginning, I don’t want to get into which approach is better. Mostly because I don’t think that’s a helpful mindset, but also because the scope of a single blog post would definitely not be enough to analyse this. There is just too much nuance in building web apps to make a clear-cut case. Instead, the important thing I want everyone to take away from this section is that React fundamentally follows a different philosophy and will continue to do so, and that’s okay. So, while you can technically use Signals with React, at the end of the day, you will always be fighting the framework and its core concepts.

The React team itself showcased some of its recent experiments and findings on this at React Conf 2025 as well. Under the codename “React Fir”, they explored ways to improve overall app performance, with a special focus on state and its data structures.

![A slide from the [React Conf 2025](https://www.youtube.com/watch?v=uAmRtE52mYk) talk about React performance, and the experience they have run under the codename “React Fir”, exploring different opportunities for improvements](https://substackcdn.com/image/fetch/$s_!XO3h!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ab27fd7-5c8e-4354-a888-e0eba0a3f19d_2108x1176.png)

As you can see, this experiment included Signals. And while there may be some gains, they are negligible compared to other approaches the team is currently considering. This is definitely worth keeping an eye on; 2026 for React is likely going to be the year of external data stores.

## But how do Signals actually work?

Okay, this might have been quite a long introduction to set the scene, but hopefully it shows what Signals are and what problems they are trying to solve. So let’s move on to the next question: how do they work? How do we make variables reactive and magically re-calculate themselves whenever relevant state changes?

The core implementation might be simpler than you think. To understand this, let’s build a very simplified version ourselves.

> **Another disclaimer:** this is not meant to show you exactly how the TC39 proposal (or any existing Signal implementation, for that matter) works. It’s aiming to show you how they work conceptually. We will cover some of the bigger challenges and implementation improvements after this.

### An example in plain Javascript

Let’s again take a very basic example. Let’s say we have two counters, and we want to show the sum as well as the parity of the sum below them. To implement that in plain JS, we would probably do something like this:

```html
<p>
  <button id="one">Counter 1: <span id="valueone">0</span></button>
  <button id="two">Counter 2: <span id="valuetwo">0</span></button>
</p>

<p>Sum: <span id="sum">0</span></p>
<p>Parity: <span id="parity">even</span></p>

<script>
  window.one.onclick = () => {
    const currentOne = parseInt(window.valueone.innerText);
    const currentTwo = parseInt(window.valuetwo.innerText);

    const newOne = currentOne + 1;
    const newSum = newOne + currentTwo;
    const newParity = newSum % 2 === 0 ? 'even' : 'odd';

    window.valueone.innerText = newOne;
    window.sum.innerText = newSum;
    window.parity.innerText = newParity;
  };
</script>
```

Now, this is just handling the click on the first button. We’d need to do something very similar for the second button; it’s not quite the same code, so we make a separate handler for that:

```js
window.two.onclick = () => {
  const currentOne = parseInt(window.valueone.innerText);
  const currentTwo = parseInt(window.valuetwo.innerText);

  const newTwo = currentTwo + 1;
  const newSum = currentOne + newTwo;
  const newParity = newSum % 2 === 0 ? 'even' : 'odd';

  window.valuetwo.innerText = newTwo;
  window.sum.innerText = newSum;
  window.parity.innerText = newParity;
};
```

Next, the project manager (yes, this imaginary counter button app has a project manager) comes to us and says we need a third button that increases both counters by one at the same time.

```html
<p>
  <button id="one">Counter 1: <span id="valueone">0</span></button>
  <button id="two">Counter 2: <span id="valuetwo">0</span></button>
  <button id="both">Increase both</button>
</p>

<p>Sum: <span id="sum">0</span></p>
<p>Parity: <span id="parity">even</span></p>

<script>
  window.one.onclick = () => {
    const currentOne = parseInt(window.valueone.innerText);
    const currentTwo = parseInt(window.valuetwo.innerText);

    const newOne = currentOne + 1;
    const newSum = newOne + currentTwo;
    const newParity = newSum % 2 === 0 ? 'even' : 'odd';

    window.valueone.innerText = newOne;
    window.sum.innerText = newSum;
    window.parity.innerText = newParity;
  };

  window.two.onclick = () => {
    const currentOne = parseInt(window.valueone.innerText);
    const currentTwo = parseInt(window.valuetwo.innerText);

    const newTwo = currentTwo + 1;
    const newSum = currentOne + newTwo;
    const newParity = newSum % 2 === 0 ? 'even' : 'odd';

    window.valuetwo.innerText = newTwo;
    window.sum.innerText = newSum;
    window.parity.innerText = newParity;
  };

  window.both.onclick = () => {
    const currentOne = parseInt(window.valueone.innerText);
    const currentTwo = parseInt(window.valuetwo.innerText);

    const newOne = currentOne + 1;
    const newTwo = currentTwo + 1;
    const newSum = newOne + newTwo;
    const newParity = newSum % 2 === 0 ? 'even' : 'odd';

    window.valueone.innerText = newOne;
    window.valuetwo.innerText = newTwo;
    window.sum.innerText = newSum;
    window.parity.innerText = newParity;
  };
</script>
```

There’s nothing wrong with this code per se. It will do exactly what we want, but hopefully you can see the problem: it is very convoluted and repetitive and doesn’t scale well. It’s also very hard to read and reason about, because we’re mixing various concerns into the same code.

### Simplifying using Signals

Now, let’s imagine we had a Signals implementation we could utilise instead. What might that look like?

```html
<p>
  <button id="one">Counter 1: <span id="valueone">0</span></button>
  <button id="two">Counter 2: <span id="valuetwo">0</span></button>
  <button id="both">Increase both</button>
</p>

<p>Sum: <span id="sum">0</span></p>
<p>Parity: <span id="parity">even</span></p>

<script>
  import { signal, effect, computed } from './signal.js';

  const counter1 = signal(0);
  const counter2 = signal(0);
  const sum = computed(() => counter1.get() + counter2.get());
  const parity = computed(() => (sum.get() % 2 === 0 ? 'even' : 'odd'));

  window.buttonone.onclick = () => counter1.set(counter1.get() + 1);
  window.buttontwo.onclick = () => counter2.set(counter2.get() + 1);
  window.buttonboth.onclick = () => {
    counter1.set(counter1.get() + 1);
    counter2.set(counter2.get() + 1);
  };

  effect(() => (window.valueone.innerText = counter1.get()));
  effect(() => (window.valuetwo.innerText = counter2.get()));
  effect(() => (window.sum.innerText = sum.get()));
  effect(() => (window.parity.innerText = parity.get()));
</script>
```

First, we declare our state, using the signal and computed helpers, for pure and derived state. Then we define the actions that increase the counters. And lastly, we define the effects, the things we want to happen whenever the state changes, in our case, the respective DOM updates.

Not only is that code much shorter and much [DRYer](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), but it also nicely separates those three concerns (state, actions, effects). Neat, a win-win.

But right now, this isn’t doing anything because we haven’t implemented the Signal helpers yet. So let’s do that.

### Implementing Signals

Or at least the very simplified version of them. As we’ve seen in our main code, we’ll need three things: a `signal` helper, a `computed` helper for derived values, and an `effect` helper that lets us translate changes to the state into changes to the UI (or whatever else we want to do with them).

```js
export function signal(initialValue) {
  let value = initialValue;
  return {
    get: () => {
      return value;
    },
    set: (newValue) => {
      value = newValue;
    },
  };
}

export function computed(fn) {
  return {
    get: () => fn(),
  };
}

export function effect(fn) {
  fn();
}
```

The signal helper needs to store the signal's value and return a getter (which returns said value) and a setter (which allows us to update it).

For computed we only need the getter, because, by definition, you never set the value of a computed variable; you only describe how it’s being calculated based on other values.

For effects, in an attempt to keep things simple, we just take the effect function and execute it.

These are the bare bones, but if you run this code, you’ll see that still nothing happens; the core “magic” ingredients are still missing.

### Adding auto-subscriptions

Auto-subscriptions are the thing that tells your computed values that they need to recompute, and your effects that they need to re-run, based on the other signals they depend on. The easiest way to achieve this in our setup is to simply keep track of the currently running effect like so:

```js
let currentEffect = null;

export function signal(initialValue) {
  let value = initialValue;
  let subscribers = [];
  return {
    get: () => {
      if (currentEffect) {
        subscribers.push(currentEffect);
      }
      return value;
    },
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    },
  };
}

export function computed(fn) {
  return {
    get: () => fn(),
  };
}

export function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}
```

What’s happening here? Every time a Signal is read, it will internally keep track of that “consumer” as a subscriber. Then, whenever the Signal value is updated, we simply notify all subscribers.

This is actually not a bad mental model for Signals, even if it’s a bit incomplete; in their essence, Signals are really just fancy event emitters for your state.

And that’s it. In ~30 lines of code, we implemented the core structure for reactive variables, which massively simplified our app's business logic and made it more scalable in the future.

@@TODO@@ DEMO

## Issues & challenges

As I said before, this is a very simplified view of Signals. Real implementations have solved many common challenges that come with reactive state management. To highlight that, let’s look at a few of them now, just to get a feel for what we’re talking about.

### The order of re-calculation matters

```js
onst counter = signal(0);
const increased = computed(() => counter.get() + 1);
const isGreater = computed(() => increased.get() counter.get());

counter.set(1);
// Depending on the order the computed values will bere-calculated,
// you can end up in a glitch state where isGreater.get() equals false
```

In the example above, by definition, `increased` should always be the value of `counter` plus one, which means that the value of `isGreater` should always be true. But if we recalculate computed values in arbitrary order, we can end up in a state where we get the wrong result.

E.g. when `counter` changes, if we recalculate `isGreater` first, it will use an old value of `increased`, which will actually be the same as the new `counter`, so we wrongfully re-calculate `isGreater` as false.

The order matters! Which is why modern Signal implementations always use topological trees or similar structures to make sure the sequencing of recalculations is correct.

### Intermittent glitch states

```js
const counter1 = signal(0);
const counter2 = signal(0);
const sum = computed(() => counter1.get() + counter2.get());
const increaseBoth = (amount) => {
  counter1.set(counter1.get() + amount);
  counter2.set(counter2.get() + amount);
}

effect(() => console.log(`Sum: ${sum.get()}`);

increaseBoth(2);
// Creates two logs
//  Sum: 1
//  Sum: 2
```

Another common glitch occurs when you make multiple changes at once.

In this example, we have an effect that runs whenever sum changes. Then we have an action that updates both counters, increasing them by one each. [If we were to run this with the code from our earlier naive, simplified implementation, we see a glitch.](https://codepen.io/julianburr/pen/azZEWbp)

The effect (in this case, the console log) would run twice, once for the change of `counter1`, and then again for the change of `counter2`. Modern Signal implementations address this issue by batching multiple updates within a single update cycle.

### It’s worth being dirty and lazy as a Signal — the “pull-then-push” approach

```js
const counter = signal(0);
const isEven = computed(() => counter.get() % 2 === 0);
const parity = computed(() => (isEven.get() ? 'even' : 'odd'));

counter.set(3);
// isEven = false
// parity = "odd"
```

The last challenge I want to mention is less a glitch and more a question of how efficient we can get. In the example above, we update `counter`, and both `isEven` as well as `parity` (which directly or indirectly depend on it) recalculate.

```js
counter.set(5);
// isEven = false
// parity = "odd"
```

Now, let’s imagine we update counter again. `isEven` has to be recalculated because the value of its dependency changed. But after that, if we are smart, we can see that the value of `isEven`, which parity depends on, didn’t change, it’s still `false`.

Modern Signal implementations take advantage of this by using so-called “dirty” flags. Whenever a signal changes, all direct and indirect dependents are marked dirty. Then, based on the topological tree, we start recalculating; however, after each recalculation, we compare the new computed value with the old one. If the value hasn’t changed, we can mark that computed value as “clean”. All other computed values further down the branch that only depend on “clean” values can now skip their calculations.

This might not seem like a big deal, but in apps with huge amounts of state, this can be quite significant.

Modern implementations also have another trick up their sleeves. Instead of immediately recalculating any “dirty” computed values on state change, they wait for the UI to actually read the value. This is what Solid called the “pull-then-pull” approach, describing the lazy nature of the recalculation.

Again, in large-scale apps, this might save a lot of unnecessary recalculations, e.g. if the consumer of the computed value has been unmounted, etc.

The combination of all these improvements is what got us from KnockoutJS to where we are today regarding client-side application frameworks. And this is by no means an exhaustive list of all the glitches and performance challenges that frameworks have addressed.

## The TC39 proposal\*

![](https://substackcdn.com/image/fetch/$s_!0wBE!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fca866714-b1ff-4165-9989-98ba3bb53e0a_2400x1200.png)

Which brings us to the final part: let’s talk about the (at the time of writing) current [TC39 proposal](https://github.com/tc39/proposal-signals) and why I think it’s so exciting.

Throughout this post, you’ve hopefully noticed a pattern, a convergence of sorts. It’s what people have started calling the “carcinisation of the web”, borrowing the term from biology, where it describes a weird phenomenon (it’s really just as weird as you want it to be, but still) where completely independently multiple non-crustations have evolved over time into crab-like creatures with very similar features. This is pretty rare and shows that certain characteristics seem to just be “better” from an evolutionary sense.

Applying this metaphor to the web and frontend engineering, there are a few things you could pick out that seem to have emerged multiple times in the same shape, evolved completely independently from each other. Signals, or Signal-like structures, are a big one.

What that means, though, is that over the past 15-ish years, frameworks have spent a lot of effort basically re-inventing the wheel. One of the big ideas of the TC39 proposal is to take that load off their shoulders. By making Signals a first-class primitive in JS, we could centralise their implementation and optimisation within the language core, and allow frameworks to put that effort into other parts that probably matter more, e.g., different approaches to developer experience, optimising for different application use cases, etc.

Something else that comes with standardisation is that platforms, in this case browsers, server runtimes, etc, can start optimising for the standard. We’ve seen this before with JIT compilation, which led to huge performance wins in browsers and in V8 within Node on the server. I definitely expect something similar to happen when the Signals proposal makes it into the spec. Runtimes can start optimising more for how Signals and recalculations are handled, both computationally and memory-wise.

And any optimisations will benefit everyone. Win-win.

```js
const counter = new Signal.State(0);
const parity = new Signal.Computed(() =>
  counter.get() % 2 ? "odd" "even");

const decrease = () => counter.set(counter.get() - 1);
const increase = () => counter.set(counter.get() + 1);

// A library or framework defines effects using low-level
// primitives
declare function effect(cb: () => void): (() => void);
effect(() => window.counter.innerHTML = counter.get());
effect(() => window.parity.innerHTML = parity.get());
```

You can see that the proposed API looks very familiar. We have the core signals and the concept of computed values. There will still be effects, but they are most likely an implementation detail of whatever framework you’re using, so you usually don’t deal with them directly.

This is obviously a very early snapshot of the proposed API. The proposal is still in Stage 1, and very fundamental decisions are still being discussed within the [Discord](https://discord.gg/jt9TRqQ7), shaping the direction of all of this, including the DX. But you can try this out today with a [polyfill](https://github.com/proposal-signals/signal-polyfill), give feedback and actively participate.

## Conclusion

**Do I think Signals are the best thing ever?** No, as I’ve shown, it’s hopefully not too controversial to say that, conceptually, the “pull” approach (and the mindset of always re-rendering the whole app on every change) has its merits, if not for the performance penalties.

**Am I excited about Signals?** Absolutely, they are one of the possible solutions to speed up the web, which is a win for everyone.

**Am I still excited about where React and other frameworks can take the “pull” approach?** Also, absolutely yes! I think competition, especially intellectual in nature, is always a great way to have people think outside the box and find solutions we can’t even imagine right now, so I’m excited to see what the future of reactivity on the web might bring.

---

_**PS:** I highly recommended these additional resources for further reading:_

- _https://github.com/tc39/proposal-signals — it’s already linked in the last part above, but it’s worth mentioning again, the readme has some really good explanations and examples for the core motivations and concepts_
- _https://www.pzuraq.com/blog/what-makes-a-good-reactive-system — blog post series that explains the fundamentals of reactivity and auto-tracking_
- _https://milomg.dev/2022-12-01/reactivity — another great blog post going into the nitty-gritty about fine-grained reactivity_
- _https://hackernoon.com/the-fundamental-principles-behind-mobx-7a725f71f3e8 — blog post by Michael Weststrate on reactivity in MobX_
- _https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf — aaaand another blog post, this time by Solid creator Ryan Carniato_
- _https://gitnation.com/contents/standardizing-signals-in-tc39 — excellent JSNation 2024 talk by Daniel Ehrenberg_
