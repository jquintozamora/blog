---
title: >-
  Part 4. Create Custom Parser and Array Parser to generate query and property
  names in PnP JS Core
tags:
  - English
url: 1024.html
id: 1024
categories:
  - Parser
  - PnP JS Core
  - TypeScript
date: 2017-06-28 10:40:26
---

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-3.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-3.png)

This is a blog post in the series about working with Custom Business Objects, Parsers and TypeScript decorators in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core ](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/)<li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/)<li>[Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes ](https://blog.josequinto.com/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes/)
2.  **Create Custom Parser and Array Parser to unify select and property names (this article)**
3.  [How to consume our decorators, models and parsers from SPFx, the winning combination](https://blog.josequinto.com/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination/) <li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**<p>**
**

## Introduction

In the previous posts of this series we explained why we should use [**Custom Business Objects in PnP JS Core**](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) and we implemented TypeScript decorators and Custom Business Object **inheriting from Item** and **Items** **PnP JS Core** classes to help us to have more **generic** and **maintainable** ** code **. In this article, we will see how to solve some specific issue to **unify** **query** and **business object properties** by creating custom **Parser** and **Array Parser** in PnP JS Core. 

## What is a custom parsers in PnP JS Core?

PnP JS Core makes use of parser classes to **handle converting the response object returned by fetch into the result**. The **default parser implemented**,** **[**ODataDefaultParser**](https://github.com/SharePoint/PnP-JS-Core/wiki/Response-Parsers) is used for all requests by default (except a few special cases). But, we can create a custom parser by **extending ODataParserBase<T> class**.<p>

## What is the difference between Parsers and Array Parsers?
<p>**Parsers** process **returned single item**.<p>**Array Parsers** process returned **Item Collections as an array**.<p>

## Parser and Array Parser implementation
<p>Here we have both implementations for **SelectDecoratorArrayParser** and **SelectDecoratorParser** which is using the decorator metadata in order to combine the results and provide our real business object. For example, [in the previous post](https://blog.josequinto.com/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes/), we did map **@select("File/Length")** with the property called **Size**, then the parser will be actually provide the information in the proper Size property.<script src="https://gist.github.com/jquintozamora/e601e5b36662547fa496bf390b91265a.js"></script><p>

## How to use Custom Parsers?

Here is an example of consuming information from a SP library by using custom objects and custom parsers.<p>**
**> <p>**Sample 1\. Query one single document using MyDocument custom object and SelectDecoratorParsers (single)**<script src="https://gist.github.com/jquintozamora/7499df249d96451c89a8fc3d06734f29.js"></script>

<p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image001_thumb-1.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image001-1.png)

> **Sample 2\. Query multiple documents using MyDocument and MyDocumentCollection custom object classes and SelectDecoratorsArrayParser (returning just the Custom Object properties):**<script src="https://gist.github.com/jquintozamora/b570bb8e698c58d520e1730bed840a14.js"></script>

[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image002_thumb-1.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image002-1.png)

> **Sample 3\. Query multiple documents using MyDocument and MyDocumentCollection custom object classes and SelectDecoratorsArrayParser (returning the full PnP JS Core object):**<script src="https://gist.github.com/jquintozamora/625f82c89774623ee6d06610e6182965.js"></script>

[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image003_thumb-1.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image003-1.png)<p>
<p>**The ideal scenario is using the sample 3 because will allows us continue with the pnp js core method chain if needed.**

Remember this is a post series about working with **Custom Business Objects, Parsers and TypeScript decorators** in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core ](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/)<li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/)<li>[Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes ](https://blog.josequinto.com/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes/)
2.  **Create Custom Parser and Array Parser to unify select and property names (this article)**
3.  [How to consume our decorators, models and parsers from SPFx, the winning combination](https://blog.josequinto.com/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination/) <li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**<p>
Enjoy!

[@jquintozamora](https://twitter.com/jquintozamora)