---
title: Refactoring
description: Improving the Design of Existing Code
tags: testing, coding
author: Martin Fowler
cover: https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543958218i/35135772.jpg
externalUrl: https://www.goodreads.com/book/show/44936.Refactoring
status: read
---

## Summary

The key message throughout the book in regards to refactoring: do it in small, safe steps, as a continuous habit rather than a one-off cleanup. When in doubt, refactor first so that adding the next feature is easy.

### The safety net: tests

A reliable test suite is what makes refactoring safe. The book stresses writing tests first (or adding them around the code you're about to change) and keeping them fast and trustworthy. Without that net, small steps are much riskier.

### Recognising what to change: code smells

Code smells (a term from Kent Beck in this context) are surface signs of deeper design problems—they tell you where refactoring will pay off, not that something is "wrong" by definition.

### Core techniques

The book organizes refactorings into a catalog with names, motivations, and step-by-step mechanics—so you can apply them safely and talk about them with others. The main themes:

- **Composing methods:** Extract and inline methods so each piece does one thing; separate calculation from presentation when they're tangled.
- **Moving features:** Move Method and Move Field when responsibilities sit in the wrong place, so behavior stays with the data it uses.
- **Organizing data:** Encapsulate, replace primitives with small types, and clarify collections so data shape supports clearer design.
- **Simplifying conditionals:** Guard clauses and replacing conditionals with polymorphism make branching easier to read and extend.
- **Simplifying method calls:** Rename, reorder or remove parameters, preserve whole objects; keep interfaces clear and hard to misuse.
- **Dealing with generalization:** Adjust inheritance (push up/down, replace with delegation) so reuse stays healthy instead of painful.

### Bigger restructures and reality

Some changes are too large for micro-steps alone; the book outlines strategies for larger restructures while keeping the system runnable.

Refactoring is framed as economics and tradeoffs, not perfection; balance ideal design with real constraints.

Use IDE and tooling to automate the mechanical parts and keep each step small and reversible. The goal is a sustainable workflow: continuous improvement, backed by tests and shared discipline.
