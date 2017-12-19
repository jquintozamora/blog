---
layout: post
title: Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4
language: English
permalink: dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4
id: 1084
categories:
  - Code Splitting
  - TypeScript
  - webpack
date: 2017-06-29 10:14:41
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Overview 

Two days ago (27/06/2017), was released [TypeScript 2.4.0](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#typescript-24). Really good news to see that now dynamic import expressions are supported!.
> **Dynamic import expressions** are a new feature and part of **ECMAScript** that allows users to asynchronously request a module at any arbitrary point in your program.
**TC39** JavaScript committee has it’s own proposal which is in stage 3, and it’s called [import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import).

From other side, webpack bundler has a feature called Code Splitting – Async:
> **Code Splitting – Async** allows you to split your bundle into chunks which can be downloaded asynchronously at a later time. For instance, this allows to serve a minimal bootstrap bundle first and to asynchronously load additional features later.
&nbsp;

At first glance, I did a **strict relationship between** these two features. I mean, it’s **natural** to **think** (if we are using **webpack** in our dev **workflow**) that by using** TypeScript 2.4 dynamic import expressions, **will automatically **produce bundle chunks** and automatically **code-split you JS final bundle**. BUT, that is not as easy as it seems, because it **depends** **on** the **tsconfig.json** configuration we are working with.

The thing is that [webpack code splitting](https://webpack.js.org/guides/code-splitting) supports two similar techniques to achieve this goal: using import() (preferred, ECMAScript proposal) and require.ensure() (legacy, webpack specific). And what that means is the expected TypeScript output is leave the import() statement as it is instead of transpile it to anything else.

Let’s see and example to figure out how to configure **webpack + TypeScript 2.4**.

In the following code I want to lazy load the library moment but I am interested on code splitting as well, which means, having moment library in a **separate chunk of JS (javascript file)** and that will be loaded only when required.

<script src="https://gist.github.com/jquintozamora/fcffb0df5d0400da6a0191424bf36b37.js"></script>

&nbsp;

## Unexpected configuration for Code Splitting with webpack

<script src="https://gist.github.com/jquintozamora/4ac5f6791239b3810719a5af61265fc8.js"></script>

Output:

<script src="https://gist.github.com/jquintozamora/b1f267f26f970d4d1938ad246e9349dc.js"></script>

&nbsp;

Note how the** JS output from TypeScript 2.4.0 is resolving directly with a Promise.resolve() instead of using import().** Then, even if that solution will **work in terms of functionality**, but **not in terms of code splitting**, because that is NOT the input expected by webpack.

&nbsp;

## Expected TypeScript configuration for Code Splitting with webpack

<script src="https://gist.github.com/jquintozamora/492a563dfe35eb4cb0f8f206755fd39b.js"></script>

Output:

<script src="https://gist.github.com/jquintozamora/8a292b74aabd2f8d4a2212b5e469eb43.js"></script>

&nbsp;

&nbsp;
> However, **this output is the ideal for webpack Code Splitting**, and we don’t have to worry about the other “normal” imports which are transpiled using esnext, because **webpack knows how to handle all of them (imports and exports).**
&nbsp;

&nbsp;

## Conclusions

- **Using “module”: “esnext”** TypeScript produces the mimic impot() statement to be input for** Webpack Code Splitting.**

- Currently (TypeScript 2.4.0) There is a **bug** using “**module”: “esnext**”. Some external libraries like moment are not recognized by TypeScript if you don’t configure explicitely **“moduleResolution” : “node”.** **PLEASE, DON’T FORGET TO INCLUDE IT IN YOUR TSCONFIG.JSON.**

- You can see a working sample here: [TypeScript 2.4, Dynamic Import Expressions with webpack Code Splitting Sample](https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/AsyncLoading/AsyncLoading.tsx#L57-L68 "https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/AsyncLoading/AsyncLoading.tsx#L57-L68").

&nbsp;

Some TypeScript forums for reference:

- [[Master] wip-dynamic import](https://github.com/Microsoft/TypeScript/pull/14774 "https://github.com/Microsoft/TypeScript/pull/14774")

- [[Design Spec] ESNext import()](https://github.com/Microsoft/TypeScript/issues/14495 "https://github.com/Microsoft/TypeScript/issues/14495")

&nbsp;

Enjoy!