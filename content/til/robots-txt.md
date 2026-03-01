---
title: robots.txt
description: Pretty significant change that might have flown under the radar
date: 2026-01-09
tags: devops
---

> **TL;DR:** \
> Your site will be removed from Google search results if you don't have a robots.txt file or the Googlebot site crawler can't access it.
>
> — https://www.alanwsmith.com/en/37/wa/jz/s1/

## Some other useful snippets in the context

### Allow everyone to crawl

```txt
User-agent: *
Disallow:
```

### Disallow everyone

E.g. for internal staging environments and tooling you don't want to end up in search engines.

```txt
User-agent: *
Disallow: /
```

### Disallow AI crawlers

I found the following on https://www.cyberciti.biz/web-developer/block-openai-bard-bing-ai-crawler-bots-using-robots-txt-file/.

They likely won't care and still consume your content, blocking through provider features like [Cloudflare's Security Block](https://www.cloudflare.com/lp/pg-security-block-ai-bots/) is probably the more reliable way to go, but still...

```txt
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: PerplexityBot
Disallow: /
User-agent: anthropic-ai
Disallow: /
‍User-agent: Claude-Web
Disallow: /
User-agent: ClaudeBot
Disallow: /
```
