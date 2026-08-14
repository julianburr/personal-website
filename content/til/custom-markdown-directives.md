---
title: Custom markdown directives
description: How to add behaviour to your markdown without MDX
date: 2026-06-11
tags: markdown, js, node
---

As I'm rebuilding parts of this website, I started looking into how I can add more interactive elements into my blog posts and conference talk write-ups. Since all of that content is stored in markdown, this let me down the very fun path of custom directives, and how I can use them in [Next.js](https://nextjs.org/) (but the same works for any other NodeJS compatible framework really).

## What are custom directives

In short, they are a (fairly) standardised syntax to define custom tags, which allows you to add custom content and behaviours when you're parsing the markdown.

The reason I like this approach for my blog over e.g. [MDX[^1]]() is (as you will hopefully see below) that it stays mostly markdown, and JSX doesn't take over whole parts of your content.

What I mean is: if you wanted to do an image carousel in MDX, you would provide a component for that. But anything you pass into that component (including children) is now JSX as well. So if I want to define a text section for each of the images, I couldn't easily use markdown for that.

```mdx
# This is an MDX carousel example

With some markdown at the top, but then it quickly turns into JSX...

<Carousel
  items={[
    {
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdQDo_VRjAt58704ntJselil6lidhvEVS2z1F3xA-i1tnf1eu8cL3yT7GsysWEBodpiz8mPsAWcs3CC2__9I-vwQKGrSZjRBIotUu&s&ec=121902078',
      description:
        'This is now in JSX as well, so adding links, paragraphs, etc becomes a bit awkward...',
    },
  ]}
/>
```

Using custom directives solves that problem for me.

```md
# This is a carousel example with custom directives

Still some normal markdown at the top...

:::carousel

::carousel-item{imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdQDo_VRjAt58704ntJselil6lidhvEVS2z1F3xA-i1tnf1eu8cL3yT7GsysWEBodpiz8mPsAWcs3CC2__9I-vwQKGrSZjRBIotUu&s&ec=121902078"}
This is now still markdown, and I can use [links](https://google.com) and other markdown syntax as I like...
::

:::
```

## How does it work

As you can see in the example above, the syntax is fairly straightforward.

```md
::directive-name{prop="value" prop2="value2"}
...
::
```

If you want to nest directives, you just add more colons to the outer elements.

```md
:::outer-directive

::inner-directive
...
::

:::
```

## How to turn this into actual custom content and behaviours

This obviously heavily depends on your setup and the libraries you're using. I am using `react-markdown`, which is framework agnostic (in the sense that it doesn't matter if I am using [Next.js](https://nextjs.org/), [React Router](https://reactrouter.com/), [Tanstack Start](https://tanstack.com/start/latest) or [something](https://www.trantorinc.com/blog/best-react-frameworks) [else](https://www.gatsbyjs.com/), as long as it uses React). `react-markdown` uses `remark` under the hood, meaning I can control the markdown parsing and rendering through `remark` and `rehype` plugins.

This is my (rough) setup:

```js
import { MarkdownAsync } from 'react-markdown';
import remarkDirective from 'remark-directive';

import { Carousel } from '@/components/markdown/Carousel';

const remarkPlugins = [
  remarkDirectiveToHast,
  remarkDirective,
  // other remark plugins
];

const rehypePlugins = [
  // my rehype plugins
];

// define your components for all custom directives/tags here
const components = {
  carousel: Carousel,
};

const allowedNodes = Object.keys(components);

export function remarkDirectiveToHast() {
  return (tree) => {
    visit(tree, (node) => {
      const isDirective =
        node.type === 'leafDirective' ||
        node.type === 'containerDirective' ||
        node.type === 'textDirective';

      if (isDirective && allowedNodes.includes(node.name)) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});
        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}

export async function Markdown({ content }) {
  const rendered = await MarkdownAsync({
    children: content,
    remarkPlugins,
    rehypePlugins,
    components,
  });

  return <div className="markdown">{rendered}</div>;
}
```

And that's it. Now I can make directives for common UI patterns like carousels that are not natively supported by plain markdown, but also more specific things like Demo's and other interactive UIs within my otherwise pretty boring and static blog posts 🎉

---

[^1]: MDX is a content format, that allows you to use JSX within your markdown. This makes it a lot easier to integrate custom components and custom behaviours into markdown driven content. Read more here: https://mdxjs.com/
