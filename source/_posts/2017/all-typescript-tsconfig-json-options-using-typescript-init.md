---
layout: post
title: All TypeScript 2.3 options for tsconfig.json (tsc --init)
language: English
permalink: all-typescript-tsconfig-json-options-using-typescript-init
id: 928
categories:
  - TypeScript
date: 2017-04-28 07:05:52
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Yesterday [was released TypeScript 2.3](https://blogs.msdn.microsoft.com/typescript/2017/04/27/announcing-typescript-2-3/) and one of the improvements was an easier startup with better help, richer init, and quicker strictness.

It means that TypeScript’s `--init` output so that potential options are explicitly listed out in comments. As an example, `tsconfig.json` output will look something like the following:

<script src="https://gist.github.com/jquintozamora/01431b0b988e3a6ced7e32086f746ac8.js"></script>

We can see how TypeScript team added a new flag called “strict” which is activated by default when create "tsc --init".

`--strict` flag, which enables the following settings

*   `--noImplicitAny`
*   `--strictNullChecks`
*   `--noImplicitThis`
*   `--alwaysStrict` (which enforces JavaScript strict mode in all files)
This `--strict` flag represents a set of flags that the TypeScript team believes will lead to the most optimal developer experience in using the language.

You can see the full options in the [official wiki page](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Compiler%20Options.md) as well.

## Read more...
You can read  [the full list of what’s new in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What) and [read TypeScript’s Roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap) to see what’s coming in the future!
