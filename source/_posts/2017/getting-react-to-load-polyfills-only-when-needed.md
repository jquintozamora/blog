---
layout: post
title: Getting React to Load polyfills only when needed
language: English
permalink: getting-react-to-load-polyfills-only-when-needed
id: 866
categories:
  - Feature Detection
  - JavaScript
  - Polyfill
  - React
date: 2017-01-20 17:27:25
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
As a front-end developer, providing **support to different browsers and devices** isn’t an easy task. In fact, it’s the trickiest part of web development because there are differences in terms of **HTML, CSS and JavaScript** functions supported for every browser / device.

There are quite good web sites documenting these differences in terms of:

- **HTML and CSS**: [http://caniuse.com/](http://caniuse.com/ "http://caniuse.com/")

- **JavaScript / ES6 / Transpilers / Polyfills**: [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/ "https://kangax.github.io/compat-table/es6/")

Anyways, if we already know that, and we are newbies on **React**, and like to apply **some polyfills to our React application** using a feature detection / dynamic / only load when needed strategy. Then I will quick show how to do it possible easily.

I am taking some assumptions:

*   You **want to isolate your app code** from the browser supported features (applying polyfills)  <li>You have to add polyfills to yout web application because requires **support to different browsers and devices**  <li>You want to use **polyfill service like **[**polyfill.io**](https://polyfill.io/v2/docs) instead of including the polyfills in your bundle  <li>You want (should) to [load polyfills only when needed](https://philipwalton.com/articles/loading-polyfills-only-when-needed)  <li>You want to optimize the experience for users on modern browser  <li>You want to save the polyfill service call when possible (using this **polyfillLoader**) 

## How to load polyfills only when needed
Here is the code:
<script src="https://gist.github.com/jquintozamora/a894bee1d22783402ad4590b1f550609.js"></script> 

&nbsp;

> **IMPORTANT**
> - I am using an **npm package** that wraps feature detection code and do polyfill.io call only with non supported features to be polyfilled: [https://www.npmjs.com/package/polyfill-io-feature-detection](https://www.npmjs.com/package/polyfill-io-feature-detection "https://www.npmjs.com/package/polyfill-io-feature-detection")
> - That function isn’t limited only to **React**, so you can use **whatever technology** which uses JavaScript.

&nbsp;

## Usage Samples

I used this polyfill loader in some Github projects:

- [React responsive menu](https://github.com/jquintozamora/react-responsive-menu-component)

- [React and OpenLayers custom control](https://github.com/jquintozamora/react-openLayers3-sample)

&nbsp;