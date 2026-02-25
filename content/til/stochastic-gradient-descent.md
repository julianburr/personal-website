---
title: Stochastic gradient descent
description: 'Or: the magic of "grokking"'
date: 2026-02-25
tags: ml
---

I'm currently diving deep into ML training and challenges, especially around biases, that come with it. While reading ["The Alignment Problem" by Brian Christian](/library/the-alignment-problem) I found a great example for ["stochastic gradient descent"[^1]]() training.

I also learned the term "grokking today" 😅

## Training the model

The idea is that you want to train a model ["modular addition"[^2]](). This is a great demo use case, because the modular part of the calculation means there will be a recognisable pattern in the results. It's also just maths, so you can easily create a training data set through a for loop.

```ts
/**
 * Simplified example for creating the training data set
 * E.g. if we wanted to train the model on `(a + b) % 5`
 */

const size = 100; // size of the training data set
const dataset = [];

// Helper function for mathematical modulo to ensure non-negative results.
const mathematicalModulo = (a, b) => (a + b) % 5;

for (let i = 0; i < size; i++) {
  // Generate random integers within a reasonable range
  const input1 = Math.floor(Math.random() * 100);
  const input2 = Math.floor(Math.random() * 100);

  // Calculate the result of their sum modulo
  const result = mathematicalModulo(a, b);

  // Add the sample to the dataset
  dataset.push({
    input1,
    input2,
    output,
  });
}
```

In the real example we want the divisor to also change, but you get the gist. Once we have this, we can "simply" train a model, and then start feeding it inputs that were not in the dataset.

Because it's just maths, we can then check the models response against what the actual mathematically correct result would be, and use that to align the model and measure our error rate over time.

## Grokking

The fascinating thing here, and why this is a common demo example in the world of ML and gradient descent learning, is that you can see if you plot the error rate of the model, that it start really high and stays there for quite some time.

What this means is that for the most part, in the beginning after the model has been trained, it doesn't actually know anything. It mostly just memoised the training data, and gives random gibberish for anything it hasn't seen before. But through gradient descent, it will eventually find the relevant pattern, and seeminlgy suddenly the error rate will drop massively. That's what is called "grokking" in ML training context.

## Over-fitting

On the other end of the spectrum, there's another interesting phenomenon called "over-fitting". It describes what happens when you keep training the model, even beyond the point where its good, it will start deterioating at some point, because it starts finding very nieche patterns that are just true for the training set.

Again, modulo addition (or any other mathematical challenge you train a model on) is great, because it's black and white whether the models prediction is correct or not. We can very easily test the correctness using the mathimatical formula, it's a universal truth.

Where all of this becomes extremely interesting (at least for me) is when we go outside of that real. What if we want to train models on something that has more nuance, no clear "right" or "wrong", or even better, something that requires "morals" to evaluate. How do we know when the grokking has happened and the model is fully accurate? How do we know if we went to far and over-fitted the model?

## Modular addition demo

You can run the example below, which will let you start the training process of a model and plot the error rate over time on a graph.

You can see that the "training errors" goes down pretty much immediately, meaning the amounts of errors the model does when given data it saw during the intiial training goes down. The "test errors" stays at 100% though, meaning the model always fails on data it hasn't seen during initial training.

However, if you keep it running for long enough (for me usually around the 60,000 steps mark), the "test errors" will eventually and pretty suddenly drop. That is the "grokking" moment.

:demo{id="stochasticGradientDescent"}

---

[^1]:
    Stochasic gradient descent works by initialising the model with random weights. Then the model is gradually updates with each sample, based on its error.

    See [https://www.ibm.com](https://www.ibm.com/think/topics/stochastic-gradient-descent) for more details.

[^2]: The "modulo" operation returns the remainder of a division, after one number is divided by another. E.g. "6 mod 4" would devide 6 by 4, and check for the remainder, in this case 2. In Javascript, the "modulo" opperation uses the "%" operator
