---
title: Stochastic gradient descent
description: 'Or: the magic of "grokking"'
date: 2026-02-25
tags: ml
---

I'm currently diving deep into ML training and challenges, especially around biases, that come with it. While reading ["The Alignment Problem" by Brian Christian](/library/the-alignment-problem) I found a great example for "stochastic gradient descent" training.

I also learned the term "grokking" today 😅

## Training approach

The core idea of stochastic gradient descent is that we start with a model with completely random ("stochastic") weights. Then, to train it, we take a labelled dataset, and use it as inputs to feed into the model and see what it returns.

From the output, [we calculate the "loss"](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html) (a number that measures how bad the prediction is). From that loss, we can use [gradient descent](https://ml-cheatsheet.readthedocs.io/en/latest/gradient_descent.html) to adjust the model to become more accurate.

## Modular addition

The demo example is to train a model on ["modular addition"[^1]](). This is a great use case, because "modulo" is pure maths, so we can easily create a big dataset. So what we do:

- create a huge dataset with inputs and (what we know to be) correct results
- split that dataset into a training set and a test (or validation) set
- we then randomly feed the model inputs from the dataset, but only adjust it when the inputs came from the training set

This allows us to keep track of both the models accuracy of the data we trained it on, as well as data is hasn't been specifically trained on.

```ts {"alt": "Simplified example for creating the dataset. We then split this into a training and a test set." }
/**
 * E.g. if we wanted to train the model on `(a + b) % 5`
 */

const size = 100; // size of the training data set
const dataset = [];

for (let i = 0; i < size; i++) {
  // Generate random integers within a reasonable range
  const input1 = Math.floor(Math.random() * 100);
  const input2 = Math.floor(Math.random() * 100);

  // Calculate the result of their sum modulo
  const result = (a, b) => (a + b) % 5;

  // Add the sample to the dataset
  dataset.push({
    input1,
    input2,
    output,
  });
}
```

## Grokking

The fascinating thing is that, if we plot out the error rates for training vs. test data, we can see that it training error goes down pretty quickly, basically immediately when we start the training. The test error however stays at 100% for a while.

This means during that initial training phase, the model might seem like its getting smarter, but it's really just memoising the correct responses based on our adjustments. Any data we haven't specially trained it on, it still gets wrong.

If you keep training though, after a while the test error will suddenly start dropping quite drastically as well. This is the "grokking" moment, when the model suddenly finds an accurate pattern that allows it to predict the results even for inputs it hasn't seen before.

It might just be me, but this blew my mind when I first read about it.

## Over-fitting

On the other end of the spectrum, if we would keep training, we might eventually hit a spot where the test error starts rising again. That's what we would call "over-fitting", the model starts refining the patterns it thinks it sees, but narrows down too specifcally on the training set.

This is fascinating, because is means there's a sweet spot for well trained models. But what I find even more interesting is the implications this has on more sophisticated training.

In our demo example, this is all fine because we have a part of the dataset we held back that we use to visualise the test error. We know the right results for those inputs, we just don't tell the model. But imagine we didn't have that. What if the results of the model were much more nuanced and up for interpretation? What if they involved some level of morals? How would we know when the model is optimised (aka "grokking" has happened, but we haven't over-fitted it yet)?

## The demo

You can run the example below, which will let you start the training process of a model and plot the error rate over time on a graph.

As described before, when you start the training you will see the "training error" rate drop pretty much immediately, while the "test error" rate stays at 100%. However, if you keep it running for long enough (for me usually around the 60,000 steps mark), the "test errors" will eventually and pretty suddenly drop. That is the "grokking" moment.

:demo{id="stochasticGradientDescent"}

If you want to play around with this yourself, you can check out this [CodeSandbox](https://codesandbox.io/p/sandbox/95p7hm).

---

[^1]:
    "Modulo" (often written as "mod") is a way to calculate the remainder after integer division. Basically, how often can you fit a into b without breaking it into fractions.

    For example, 18 mod 4 means: divide 18 by 4, which goes 4 times with a remainder of 2.
