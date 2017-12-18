---
title: How to configure webpack for replacing your API module path by a Mock API Path
language: English
url: how-to-configure-webpack-for-replacing-your-api-module-path-with-a-mock-api
id: 1094
categories:
  - api
  - mock
  - TypeScript
  - webpack
  - webpack 2
date: 2017-07-10 16:19:17
featuredKeywordsImage: featured.png
---

I’ve been working with **React**, **webpack** and **TypeScript** for almost two years, and it still surprise me when I look for a really custom solution and I end up with a generic solution which will solve my specific problem in a generic way.

Today, I am going to write about how to configure webpack to provide different Module path depending on our configuration. In my scenario I have two different APIs one is the “**REAL**” one and other is the “**MOCK**”. And I’d like to use the mocked API for development configuration and the real one for Production.

Let’s say we have a function to get all terms of a given taxonomy term set (in SharePoint Online) in order to display them in a React application. We are going to describe how to create the real&nbsp; API, Mock API, how to configure webpack to do the “**generic replacement**” and how to use the API.

### Real API

<script src="https://gist.github.com/jquintozamora/d3361c54ea2b98bd1de10e6343c11fdc.js"></script>

### Mock API

<script src="https://gist.github.com/jquintozamora/38a836ec063e7f3bd7c2838ed4dc2a48.js"></script>

### How to configure webpack

My recommendation is using a [NormalModuleReplacementPlugin](https://webpack.js.org/plugins/normal-module-replacement-plugin/) in our development configuration for webpack:

<script src="https://gist.github.com/jquintozamora/35087ed4261334b2f5b18a480bb3684c.js"></script>

### Usage

<script src="https://gist.github.com/jquintozamora/d6ae4af0d2c3d5158cee887cac9993f1.js"></script>

Enjoy!

[@jquintozamora](https://twitter.com/jquintozamora)