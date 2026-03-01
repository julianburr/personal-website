---
title: Pattern matching in Typescript
description: My new favorite library to increase code readability
date: 2025-01-22
tags: ts
---

I am very vocal when it comes to the importance of code simplicity and readibility. It not only makes scanning code much easier and faster for everyone, it also usually comes with the benefit of the code being easier to update, which is another thing I feel strongly about: a healthy code base evolves over time. The moment you feel like you don't want to touch a part of your code base, it's a clear sign of unpaid tech debt that will just become harder and harder to fix the longer it stays untouched.

Anyway, all of this is to say I really like the way `ts-pattern` allows you to turn your aweful switch statements into much more readable and much more powerful code:

## Examples

### Simple example

In its simplest form, it already adds a few things at least in my opinion. It's more readable (I guess that's subjective), but it also adds type safety elements, which is pretty powerful.

```ts
/* 😭 */
switch (foo) {
  case 'bar':
    doBar();
    break;

  case 'hello':
  case 'world':
    doHelloWorld();
    break;

  case 'foo':
    doFoo();
    break;
}

/* 😍 */
match(foo)
  .with('bar', () => doBar())
  .with('hello', 'world', () => doHelloWorld())
  .with('foo')
  .exhaustive();
```

The `.exhaustive()` part ensures on a TS level that you have covered all cases. Meaning, it will throw at build time if you haven't. And it will complain if you're not explicit, you have to either use `.exhaustive()` or cover any uncovered cases with an `.otherwise(() => ...)` fallback.

### Return values

Probably my biggest pet peeve with common switch statements.

```ts
/* 😭 */
let result: ResultA | ResultB | null = null;
switch (type) {
  case 'a':
    result = await calcA();
    break;
  case 'b':
    result = await calcB();
    break;
}

/* 😍 */
const result = match(type)
  .with('a', () => calcA())
  .with('b', () => calcB())
  .exhaustive();
```

Not only is this more readable, but the type is automatically inferred based on the return types of all my `.with` statements. Great!

### Pattern matching

The thing I promised in the title.

```ts
match(input)
  .with(P.number.between(0,9), () => /* ... */)
  .with(P.number.gt(9), () => /* ... */)
  .with(P.string, () => /* is a string */)
  .with(P.boolean, () => /* is a boolean */)
  .otherwise(() => /* ... */);
```

### Dealing with objects

```ts
match(obj)
  .with({ foo: 'bar' }, () => /* ... */)
  .with({ bar: 'foo' }, () => /* ... */)
  .exhaustive();
```

### Multiple input values

```ts
match([type, number])
  .with(['a', P.any], () => /* ... */)
  .with(['b', P.lt(0)], () => /* ... */)
  .with(['b', P.gte(0)], () => /* ... */)
  .exhaustive();
```

The library has heaps more features, these are just the highlights that really stand out for me in my day-to-day usage. Check out the docs here: https://github.com/gvergnaud/ts-pattern 🤓
