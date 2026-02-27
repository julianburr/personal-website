---
title: Out-of-Order Streaming — The Future of Web Development
description: Streaming has been around forever, to improve performance of large websites. But what is the new trend of out-of-order streaming all about?
type: write-up
date: 2025-12-04
platform: Substack
talkUrl: /my-work/talks/out-of-order-streaming
externalUrl: https://julianburr.substack.com/p/out-of-order-streaming
coverUrl: https://storage.googleapis.com/julianburr-me-assets/blog-covers/out-of-order-streaming.png
---

_This is a write-up of a [conference talk given at multiple conferences](/my-work/talks/out-of-order-streaming), including [ReactSummit US 2024](https://gitnation.com/contents/lets-build-suspense) and [Øredev 2025](https://www.youtube.com/watch?v=TJ2JOa0w6QY)._

---

## Disclaimer

This is a post about out-of-order streaming. It’s heavily inspired by React Server Components (RSC) and React Suspense on the server, but if you don’t know React (or don’t like it), don’t leave. The concepts and code examples we'll discuss are all decoupled from it. They’re not even JS-specific; you could apply any of this to any other server-side language like PHP.

## Part I: A brief history of web rendering

Ok, with that out of the way, let’s dive into it. To talk about out-of-order streaming, it’s important to understand the core problem it is trying to solve. And to understand that, it’s helpful to take a very quick look at the history of rendering on the web.

### HTML & PHP

And it makes sense to start at the very beginning; good ol’ HTML. These were simpler times, when the web was static, and so were the files driving it. Whenever a user opens a page in the browser, all the server needs to do is look up the respective file in the file system and return it. Voila. Simple, fast, efficient.

![](https://substackcdn.com/image/fetch/$s_!1G85!,w_720,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F121cb0cb-ce3c-4d08-8cbc-3854a146d669_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!Pgwj!,w_720,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F720fb09a-ec2f-4c89-931c-b207b975c12b_2400x1600.png)

But not very dynamic. And we do want to serve dynamic content, be it content from external sources (e.g. a database) or content specific to the current user. Or a combination of both. Static HTML won’t cut it.

So we started using server-side languages, e.g. PHP, to generate said HTML on the fly. This allowed us to do all that dynamic stuff (and then some), but it obviously came at a cost. For anything that has to do a lot of stuff on the server, the response times could become very slow very quickly. And especially in the time when navigating between pages still meant a full page reload, slow response times really hurt the user experience, leaving them waiting on blank pages.

### jQuery & AJAX

To solve this, we introduced Javascript. Or, more specifically, AJAX.

Javascript has already been around for a while, but it’s pretty hard to use, with lots of quirks to make it work properly cross-browser. But there’s a library that fixes that, makes Javascript a lot more accessible for developers, and by doing so lifts it up to become the de facto language powering the web: jQuery.

> **Side quest:** Without spending too long on the nostalgia here, I still want to highlight what a massive role jQuery has played for Javascript to become what it is today. Not only did it help with the aforementioned cross-browser compatibility, it also added many utilities that made common tasks massively more developer-friendly (e.g. event listeners, selecting DOM elements, manipulating the DOM, etc.).

Another utility helper was added in 2005, when a team at Google released AJAX, “asynchronous Javascript and XML”. The concept was actually developed by Microsoft, who were trying to find a way in the web version of Outlook to update the inbox information dynamically, after the page has already been loaded. AJAX basically took that idea and refined it.

jQuery then took that technology and wrapped a utility around it to make it easier to use for developers. With this new $.ajax(…) helper, we were suddenly able to make network requests from the client, as I said, after the initial page load had already been completed and the connection with the server been closed. This might not sound like much, nowadays we’re taking fetch pretty much for granted, but at the time, this was massive!

What does that mean specifically for us, though? It means we can think about our UI more granularly. When the user navigates (or performs other actions that change the UI), instead of having to load the whole new page from the server, we can request a subset of the UI that actually changes. Static elements (e.g. global navigation) can stay the same.

![](https://substackcdn.com/image/fetch/$s_!CLtf!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a400b19-9798-47dc-88c5-24e5d94989c4_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!o6Ws!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7237fac4-a49f-4cb0-8f69-c5ade2b530f0_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!CWwl!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8944d6c8-e04e-4c87-bcba-57f60a889c9a_2400x1600.png)

This does two things: for one, it means we request less from the server, meaning the server realistically has to do less work and can respond faster. But also, we’re now doing all of this client-side, meaning we’re in full control over the UI while this is happening. This means even beyond the performance, we can massively improve the user experience, e.g. by showing in-app loading states and nicer transitions between different content.

So this helps with the UX issues, but now the DX is what is suffering. In a lot of ways, jQuery was just a bit ahead of its time. There weren’t any application frameworks at the time that could help developers write solid, scalable code in this way, so most of us kept re-inventing the wheel, coming up with home-baked solutions from scratch. The code was also often weirdly split across frontend and backend, without any clear ownership of which one is responsible for the rendering layer. All of this led to why we still, to this day, unfortunately remember the jQuery era as the “spaghetti code” era.

### SPAs

To “un-spaghettify” the situation, we decided to go all-in on JS and client-side. This is the beginning of the single-page-applications era; moving everything into JS meant that we could now take advantage of the first full web application frameworks, like KnockoutJS or Angular.

All application frameworks, to this day, work essentially with three layers:

- Some utility to manage your state
- Some form of templating that allows you to describe your UI
- And, most importantly, something we call “data-binding”, which connects the previous two

The idea behind SPAs is that everything happens client-side, the server just returns an empty div and a bunch of JS, and that JS then creates the DOM of the page and automatically makes it interactive as it does so.

![](https://substackcdn.com/image/fetch/$s_!Kngm!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd97f9a4c-b58a-41c5-acc7-2d8796a97286_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!M1ht!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9a765a9-7aa9-4936-ab0b-37c08aac5133_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!xnxG!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6c24ed1-fdd3-4c5f-b08b-f70726879d28_2400x1600.png)

This was a huge step in the evolution of the web. Suddenly, from a DX perspective, we were able to fairly easily build complex and super interactive web apps at large scale. And the ability to make everything interactive was also huge from a UX perspective.

However, again, there was one big downside: the initial load. Especially with larger apps, the server returning an empty page and having to load all JS, which might load even more JS or make other network requests, before it can show the actual page, can very quickly lead to waterfalls and a terrible first load experience for the user. This is especially true for users with a slow network or on a low-end device.

### SSR & SSG

We realised that we went a little bit too far. But we did like the fancy new frameworks that came with SPAs, so with the rise of NodeJS, the idea was simple: what if we could use these same frameworks on the server to generate the initial HTML response?

Server-side rendering (SSR) and static site generation (SSG) are behaving very similarly here, so I’m covering them in one section together. The only difference, really, is when the HTML is generated. For SSR, that’s on-demand at request time, for SSG it’s at build time, so you usually can’t do much request-specific stuff in the response.

Either way, the idea is that the server can use the FE framework to generate the initial, static HTML, alongside the JS as it did for SPAs, and then on the client, the framework injects all the dynamic parts into the HTML the server returned. The goal was to kind of get the best of both worlds.

![](https://substackcdn.com/image/fetch/$s_!R7gM!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8039620-a3e9-40b0-9ae1-04faf9beace0_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!prs1!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fefa0d367-adb2-4ccb-b5be-15ae3d3f0e86_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!7lEQ!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2a8a21b-8c95-4045-bba5-af8f6cf2350a_2400x1600.png)

In theory, this is great. But the phase where the client takes over and injects the dynamic parts quickly became the new bottleneck. It’s what we call hydration @@TODO@@ actually properly elaborate on need for hydration beforehand.

Essentially, we need to render the page twice: once on the server for the initial static HTML, and then again to create a virtual copy of the page, to then be able to inject the dynamic stuff into it. Now, different frameworks have found different approaches and workarounds to this, to mitigate some of the performance issues, but generally speaking, that’s how it works. And it’s hopefully fairly obvious why this isn’t great.

Also, we’re now back to where we started with HTML & PHP. If the server needs to do a lot of work to render the initial HTML, server response times can get really slow, really quickly. Not great.

### Server components

Enter: the idea of server components. Again, React made the idea and terminology popular, but there are a lot of frameworks now that work in very similar ways.

The truth is, most parts of our web apps are static, meaning they only need to be rendered once. So what if we could tell the bundler which parts of our app are static, and therefore don’t need to be in the client-side bundle and don’t need to be hydrated, and which parts are dynamic, and do need all of that. That’s exactly what the idea behind server components is.

![](https://substackcdn.com/image/fetch/$s_!S_23!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F782c8bb8-deda-4a0d-8262-2fed82e8bb1c_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!BLsR!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F934bd3da-5213-4c4c-8755-00ce6adefe5c_2400x1600.png)

![](https://substackcdn.com/image/fetch/$s_!i93l!,w_474,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84d2462f-8502-4fd2-889f-fbabe3b95e26_2400x1600.png)

React does it via directives, other frameworks do it through some bundler magic and specific closure conventions. But the core concept is the same: tell the bundler which parts only ever need to run on the server and can be completely removed from the runtime code shipped. This reduces the hydration to a minimum. It also potentially reduces the JS bundle size massively, making the load times even faster, especially at scale.

But on its own, server components don’t do anything about the other problem of server response times when the server needs to do a lot of work to render different parts of the page.

So, finally, this is where out-of-order streaming comes in. As I mentioned in the beginning, in React, this is what Suspense on the server does for you. So if you use React, a lot of this might look familiar to you, even if you didn’t know what Suspense actually does underneath the hood. The core idea is completely independent of React.

## Part II: Let’s code

This hopefully framed the core issue we’re trying to solve for, performance and the ever-growing cost of JS bundle size and hydration performance. To understand how Suspense solves this problem, let’s take a look at a very simplified implementation of a demo app.

### Server-side rendering

Let’s start with traditional server-side rendering.

```js
import express from "express";
import { renderToString } from "react-dom/server";

const app = express();

app.use(express.static("out"));

app.get("/", async (req, res) => {
  const app = (
    <>
      <Header />
      <Title id={req.query.id} />
      <Details id={req.query.id} />
      <Similar id={req.query.id} />
    </>
  );

  let content = `<!doctype html><html><body>`;
  const contents = await Promise.all(
  app.props.children.map(async (child) => {
    const element = await child.type(child.props);
    return renderToString(element);
  });
  content += contents.join("");
  content += `</body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.send(content);
}

app.listen(process.env.PORT || 3000);
```

This is creating a fairly basic NodeJS server, with an endpoint that returns our app. I’m using JSX here, but again like React you don’t have to, it’s mainly helpful to keep things readable and concise here.

If we look at one of the components, you can see (if you’re familiar with React) that there’s something special about it.

```js
import { fetchTitle } from '../api/title.ts';

export async function Title({ id }) {
  const data = await fetchTitle({ id });
  return (
    <section>
      <img src={data.image} />
      <div>
        <h2>{data.name}</h2>
        <p>{data.datePublished.substring(0, 4)}</p>
        <p>{data.description}</p>
      </div>
    </section>
  );
}
```

It’s not only a function, but it’s also an asynchronous function. For the sake of this demo, app components are treated as “server components”. As we’ve explored before means they are only rendered once (on the server). This also means we don’t need to worry about any client-side bundle here, which is great.

Now, running this server gives you what you would expect. When visiting the page, the server returns the correct HTML, but when navigating, you can feel the delay before the browser receives the new page’s HTML.

@@TODO@@ PREVIEW DEMO

This is what I mentioned before, one of the big downsides of server-side rendering. When the server needs to do a lot of work, or, in this case, relies on other external services that might take a bit longer, the server's response time can quickly increase quite drastically.

### Introduce streaming

To combat that, let’s introduce streaming. HTTP streaming has been around forever, basically since the web started. The idea is simple: when the browser request comes in, the server responds immediately, but leaves the connection open, and then keeps sending more stuff as it becomes available. Once everything is sent, the server closes the connection, so the browser knows the interaction is over.

We can keep all component code as is; all we need to change is the rendering logic in the server handler:

```js
// Instead of collecting the HTML string as before and
// sending it back all in one go, we can stream the HTML

res.setHeader('Content-Type', 'text/html');
res.write(`<!doctype html><html><body>`);
for (let child of app.props.children) {
  const element = await child.type(child.props);
  res.write(renderToString(element));
}
res.write(`</body></html>`);
res.end();
```

This is great. Instead of having to wait seconds for the complete server response, the browser can now handle the immediate partial response. However, running this code will quickly show the big limitation when it comes to “traditional” streaming.

@@TODO@@ PREVIEW DEMO

We can only append to the stream. Meaning, we can only resolve items in the order they need to appear within the HTML document. In our case, this means we do get an immediate response, but it only contains the page header with the app logo. All other content must wait until the title component is resolved, even if any of the other components rendered after it resolve faster.

It’s better than before, but it’s still not great from a user experience perspective.

### Finally: Out-of-order streaming

What would we do in a fully client-side rendered app? We would try to show some kind of loading state, right? Some animated skeleton, perhaps, to indicate for each section that we’re still waiting for the actual content to come in.

In React, you can do that using Suspense. They are really just boundaries that allow you to define a fallback UI to be rendered whenever anything underneath them (from a component tree perspective) is still waiting for any asynchronous work to be done.

This is already cool, but the (in my opinion) real magic happens on the server. Let’s try to implement a somewhat simplified version ourselves.

First, let’s create that “Suspense” component. It needs to allow us to define a fallback UI.

```js
export function Suspense({ fallback }) {
  return (
    <div data-suspense-id={id} style={{ display: 'contents' }}>
      {fallback}
    </div>
  );
}
```

And we want to render said fallback until the children of the Suspense component are all ready to be rendered. We also want the boundary to be identifiable (you’ll see what for in a second), so we give each one a unique ID.

```js
export let suspended: any = {};
let uuid = 0;

export function Suspense({ fallback, children }: any) {
  const id = uuid++;
  suspended[id] = children;
  return (
    <div data-suspense-id={id} style={{ display: 'contents' }}>
      {fallback}
    </div>
  );
}
```

> **Side note:** A bit of random CSS trivia here. If you ever need a div (e.g. to be able to target the DOM element itself, but maybe also for styling purposes, etc.) but you don’t want it to affect the layout of the current parent node, you can use display: contents. This tells the CSS layout engine to ignore this div for layout purposes. E.g. if the container is using flex or grid, the “contents” div will be ignored for the flex or div layout. Instead, the engine will look at the children to construct the layout. Pretty cool!

Ok, now we have a Suspense component, and with it a dictionary with any suspended children. Now, let’s adjust the server.

First, we adjust what we’re actually rendering, adding the Suspense boundary:

```js
const app = (
  <>
    <Header />
    <Suspense fallback={<Skeleton />}>
      <Title id={req.query.id} />
      <Details id={req.query.id} />
      <Similar id={req.query.id} />
    </Suspense>
  </>
);
```

Next, we adjust the streaming logic itself:

```js
// First, the same rendering logic as before
for (let child of app.props.children) {
  const element = await child.type(child.props);
  res.write(renderToString(element));
}

// But afterwards, we check for any suspended components
// If there are any, we render them
if (Object.keys(suspended).length) {
  await Promise.all(
    Object.entries(suspended).map(async ([key, content]) => {
      const children = Array.isArray(content) ? content : [content];
      const contents = await Promise.all(
        children.map(async (child) => {
          const element = await child.type(child.props);
          return renderToString(element);
        }),
      );
      res.write(contents.join(''));
      delete suspended[key];
    }),
  );
}
```

Now, you might be screaming “this can’t be all, this doesn’t seem right”, and you would be correct. If we were to run the server as is, the suspense boundary would render the loading states (as expected, and as we want it to), but then it would additionally render the final content underneath it once it’s ready, instead of replacing the loading state with it.

To fix that, we need to add the final piece of magic. The core piece that makes this “out-of-order” streaming is that it allows us to stream HTML independent of the order we want to display things in.

For that, we need two ingredients: first, there is the HTML template tag. It allows us to send HTML to the browser, but at the same time tells the browser to ignore it for rendering purposes. But because it’s in the DOM, we can still find, reference and use it. Like a template. We will use the template tag for any suspended content we want to stream “out-of-order”.

Secondly, in order to actually swap out the loading states for their respective suspended contents, we _do_ need a little bit of JS on the client side. So we just add it to the server response.

Now, there’s a million different ways you could implement the swap. In this example, I’m going to use HTML custom elements. Mainly because I like them.

With those two ingredients, the code looks something like this:

```js
if (Object.keys(suspended).length) {
  await Promise.all(
    Object.entries(suspended).map(async ([key, content]) => {
      const children = Array.isArray(content) ? content : [content];
      const contents = await Promise.all(
        children.map(async (child) => {
          const element = await child.type(child.props);
          return renderToString(element);
        }),
      );
      res.write(
        contents.join(`
        <template>${contents.join('')}</template>
        <suspense-content target-id="${key}"></suspense-content>
      `),
      );
      delete suspended[key];
    }),
  );
}
```

Almost there. As you can see, we’re now rendering the template tag and the custom HTML element via the suspense-content tag. The only thing left is to actually implement that custom element.

```js
res.write(`
  <script>
    window.customElements.define('suspense-content',
      class SuspenseContent extends HTMLElement {
        connectedCallback () {
          const content = this.previousElementSibling.content;
          const id = this.getAttribute('target-id');
          const target = document.querySelector('[data-suspense-id="' + id + '"]');
          target.innerHTML = י':
          while (content.firstChild) {
            target.appendChild(content.firstChild);
          }
        }
      }
    );
  </script>
`);
```

That’s it. That’s all the (client-side) JS we need. We define the custom element by extending HTMLElement. This gives us a connectedCallback class method, which will be called whenever a tag of this custom element is being rendered in the DOM. In there, all we do is find the previous sibling of the custom element. Since we’re controlling the render, we know that this will be the template tag with the suspended content. Then we find the corresponding loading state, using the suspense-id. This is why we gave all loading fallbacks those unique identifiers. Once we have the template and the ID of the fallback, we simply swap the template content in place of the loading state.

Et voila.

@@TODO@@ PREVIEW DEMO

If we load this solution in the browser and navigate around, we see that our original problem is solved. Now, when clicking on a link, the user gets immediate visual feedback by being taken to the target page. The dynamic content is being “suspended”, but in its place, we now have a nice, much more meaningful loading skeleton.

The additional beauty of the way Suspense boundaries work is that we’re not limited to a single one. We can have as many as we want. They allow us to fine-grain where we want to show skeletons (or spinners, or whatever loading style you prefer) based on the UI, rather than being forced to have them on an individual component level.

This means we could easily add a boundary for each of the sections.

```js
const app = (
  <>
    <Header />
    <Suspense fallback={<TitleSkeleton />}>
      <Title id={req.query.id} />
    </Suspense>
    <Suspense fallback={<DetailsSkeleton />}>
      <Details id={req.query.id} />
    </Suspense>
    <Suspense fallback={<SimilarSkeleton />}>
      <Similar id={req.query.id} />
    </Suspense>
  </>
);
```

In our case, this makes sense because we know the spatial dimensions of the pending content. If your content height is dynamic, you might want to stick to fewer skeletons to avoid nasty layout shifts once the content loads in.

For us, refactoring this means the content can load in even faster, because now each section can be shown whenever they’re ready, instead of having to wait for all sections to be available before revealing the whole content at once.

### The icing on the cake — using the platform

This approach for streaming in dynamic content comes with a bunch of benefits, because we’re using the platform (as god, aka Tim Berners Lee, intended).

I know, it sounds a bit like a meme by now, but the best memes work because they are funny and yet fundamentally true. Especially nowadays, more and more frameworks keep preaching about using the platform. But what does this actually mean in our case?

A great example is the browser history. If we go back into the app and navigate around as we did before, but now we decide we want to go back to the previous page and hit the “browser back” button, the previous page loads immediately. Not in the way it did when we originally navigated to it, showing the app logo and our loading skeletons. No, immediately in the sense of “all content is immediately there”. This is because we streamed the whole content, including the suspended parts, in one server response. Which is what the browser caches and reuses for the “back” and “forward” functionality.

@@TODO@@ PREVIEW DEMO

Getting perks like this for free should hopefully convince most people that “using the platform” is meme-y, but absolutely worth trying.

## Conclusion

I hope this example showed how out-of-order streaming conceptually works and what problems it’s trying to solve.

To recap: over the years, the web has become more and more dynamic, which has led us down a path away from classical server-centric architectures towards fully client-side rendered web apps, leading to major performance and overall UX issues.

The trend has been “back to the server” for a while now, but traditional server-side rendering, even with streaming, still has severe shortcomings.

Out-of-order streaming, together with things like server components, attempts to offer a modern solution, allowing us to continue building dynamic experiences, but with a fraction of the JS that needs to be shipped to the client.

**Is out-of-order streaming the silver bullet that solves web development forever?** Of course not, silver bullets don’t exist. There will always be nuance and specific needs for web apps, based on the app, the team behind it, the available resources, etc.

**Should you take a look at it / keep an eye on it?** Absolutely! Even without being a silver bullet, it’s definitely a powerful tool that has been added to our toolbox.

**What might the future bring?** I personally hope things like out-of-order streaming, server components, “suspense”-like loading boundaries, etc., will all get adopted more and more into the core of either our application frameworks, or (even better) the core of the platform itself (aka JS and web standards). Either way, the goal should be that developers don’t need to know about all this or even think about it; it’s all hidden away behind a low-level abstraction layer. Which also means it would be easy to change and adapt as our ideas and technologies evolve.
