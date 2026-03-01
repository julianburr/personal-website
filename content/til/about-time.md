---
title: About time
description: Temporal API finally progresses to TC39 stage 4
date: 2026-01-14
tags: js
---

https://bsky.app/profile/pipobscure.com/post/3mccy5clzts2n

The new [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) finally made it into Chrome's stable release today, meaning the proposal made it to stage 4 in the TC39 process. One step closer to a bright new future where dates and times in JS don't suck anymore 🎉

## Highlights from the new API

### Simple manipulations

```js
const date = Temporal.PlainDate.from('2025-01-18');
const newDate = date.add({ days: 2 });
```

### Time zones and calendars built-in

```js
const dt = '2025-01-18T14:30[America/New_York]';
const zonedDateTime = Temporal.ZonedDateTime.from(dt);
zonedDateTime.toString(); // => "2025-01-18T14:30:00-05:00[America/New_York]"

const dateWithCalendar =
  Temporal.PlainDate.from('2025-01-18').withCalendar('japanese');
dateWithCalendar.toString(); // => "2025-01-18[u-ca=japanese]"
```

### Dealing with durations

```ts
const durations = [
  Temporal.Duration.from({ hours: 1 }),
  Temporal.Duration.from({ hours: 2 }),
  Temporal.Duration.from({ hours: 1, minutes: 30 }),
  Temporal.Duration.from({ hours: 1, minutes: 45 }),
];

const startingPoint = Temporal.PlainDate.from('2021-01-01');
startingPoint.add(durations[1]).from(startingPoint);

// Calculating durations
const start = Temporal.PlainDate.from('2025-01-01');
const end = Temporal.PlainDate.from('2025-01-18');
const duration = end.since(start);
```

### Further reading

- https://developer.chrome.com/blog/new-in-chrome-144#temporal
- https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/
- https://tc39.es/proposal-temporal/docs/
- https://medium.com/@ignatovich.dm/a-dive-into-javascripts-temporal-api-time-management-made-simple-ba3ffc67d3df
