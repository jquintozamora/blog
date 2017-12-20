---
layout: post
title: How to integrate PnP JS Core and SharePoint Framework logging systems
language: English
permalink: how-to-integrate-pnp-js-core-and-sharepoint-framework-logging-systems
id: 939
categories:
  - PnP JS Core
  - react
  - SPFx
  - TypeScript
date: 2017-04-30 23:10:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Recently, I was playing with **[PnP JS Core](https://github.com/SharePoint/PnP-JS-Core)** library, which basically is a wrapper of SharePoint Rest API that allows us to easily use it.

I discovered some cool Features in this library which I really like them! For example, we are able to easily **cache queries**, do **batches**, and the library has a good Logging system, which actually is the main topic of this post.

## Integrate Logging
So, this post is intended to show how to integrate two different logging systems when developing a SharePoint Framework web part. 

Let´s share few documentation links to be aware which logging systems I am talking about:

*   [SPFx Log class](https://dev.office.com/sharepoint/reference/spfx/sp-core-library/log)  <li>[SPFx. Working with the Logging API](https://github.com/SharePoint/sp-dev-docs/wiki/Working-with-the-Logging-API)  <li>[PnP JS Logging implementation](https://github.com/SharePoint/PnP-JS-Core/blob/master/src/utils/logging.ts)  <li>[PnP JS. Working With: Logging](https://github.com/SharePoint/PnP-JS-Core/wiki/Working-With:-Logging)  <li>[React component logging with TypeScript](https://github.com/pepaar/typescript-webpack-react-redux-boilerplate/blob/master/App/Components/BaseComponent.tsx) 

After [creating our SPFx web part](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/build-a-hello-world-web-part), and [installing sp-pnp-js](https://github.com/SharePoint/PnP-JS-Core#get-started), then let´s import both logging systems classes:
<script src="https://gist.github.com/jquintozamora/a243b262348e2ac6b5c0dca50aebe5b4.js"></script> 


If we are using **React** to build our** SPFx webpart**, then we could use the following code in our React Component´s constructor:
<script src="https://gist.github.com/jquintozamora/2d77f3e9fedf96a75e31cc0e29274252.js"></script> 


We can see the comments as self-explanation how the integration have been done. So, basically we enable PnP JS Core Logging at Info level and we create a special FunctionListener to pass every message through SPFx Log system using the right method (verbose, info, warn or error). 

## Example
Let´s see an example how it works, imagine we have this code in which we are querying a library selecting a non-existing column called “assdafa”. 

[![image](./image.png "image")](./image.png)

PnP JS will provide an internal error giving more detail, we can see it on the following image:

[![error log](./image-1.png "image")](./image-1.png)

## Conclusion
Note that the source of the error is sp-loader instead of pnp-js, that is because we are using the FunctionListener to pass all the errors thru SPFx logger.
 > I created a [SPFx webpart sample to demonstrate this PnP JS functionality](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/blob/master/src/webparts/asyncAwaitPnPJs/components/AsyncAwaitPnPJs.tsx). Please check it out and any feedback is welcome! 
