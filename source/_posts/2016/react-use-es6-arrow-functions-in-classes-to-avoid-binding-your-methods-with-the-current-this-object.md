---
layout: post
title: "React: Use ES6 arrow functions in Classes TO avoid binding your methods with the current This object"
language: English
permalink: react-use-es6-arrow-functions-in-classes-to-avoid-binding-your-methods-with-the-current-this-object
id: 845
categories:
  - How-To
  - New-Feature-Info
tags:
  - arrow functions
  - Babel
  - ES6
  - javascript
  - react
date: 2016-12-07 14:53:41
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Working with **React** sometimes, if you like well-organized and structured code, you will be in the situation to have to do things like:
```
this.minus = this.minus.bind(this);
```

## Using arrow functions
We can **avoid having to bind every method** by using **ES6 arrow functions** inside of the class methods. That means that we need to use the babel plugin called [“transform-class-properties”](http://babeljs.io/docs/plugins/transform-class-properties/) explicitly because by now (dec 2016) it is an experimental feature in babel.

[![image](./image.png "image")](./image.png)

### Read more about arrow functions
Arrow function example. More info about [arrow functions](http://www.2ality.com/2012/04/arrow-functions.html).

## How to configure ti use with Babel
If you previously had a project using **React with ES6**, these are the three changes you should do to achieve it:
- Add “**transform-class-properties**” to .babelrc file.
- Change the class method by an **arrow function in component class**.
- Install the babel plugin “**babel-plugin-transform-class-properties**” using npm i --save-dev babel-plugin-transform-class-properties. (likely in the near future will be included as a babel ootb feature)

## Code sample
Take a look to this **github commit to see the changes in detail**: [https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template/commit/7818c657864d66e8ded99de5ff633db013d125c2?diff=unified](https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template/commit/7818c657864d66e8ded99de5ff633db013d125c2?diff=unified "https://github.com/jquintozamora/react-es6-webpack-minimal-starter-template/commit/7818c657864d66e8ded99de5ff633db013d125c2?diff=unified")
