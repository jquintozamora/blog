---
layout: post
title: Part 4. Create Custom Parser and Array Parser to generate query and property names in PnP JS Core
language: English
permalink: create-custom-parser-and-array-parser-to-generate-query-and-property-names-in-pnp-js-core
id: 1024
categories:
  - Parser
  - PnP JS Core
  - TypeScript
date: 2017-06-28 10:40:26
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Post Series Index
This is a blog post in the series about working with **Custom Business Objects**, **Parsers** and **Decorators** in [PnP JS Core](https://github.com/SharePoint/PnP-JS-Core):

1. [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core#Post-Series-Index) 
2. [Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core#Post-Series-Index)
3. [Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes](/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes#Post-Series-Index)  
4. **Create Custom Parser and Array Parser to unify select and property names (this article)**
5. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
6. [Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**

## Introduction
In the previous posts of this series we explained why we should use [**Custom Business Objects in PnP JS Core**](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) and we implemented TypeScript decorators and Custom Business Object **inheriting from Item** and **Items** **PnP JS Core** classes to help us to have more **generic** and **maintainable** ** code **. In this article, we will see how to solve some specific issue to **unify** **query** and **business object properties** by creating custom **Parser** and **Array Parser** in PnP JS Core. 

## What is a custom parsers in PnP JS Core?
PnP JS Core makes use of parser classes to **handle converting the response object returned by fetch into the result**. The **default parser implemented**,** **[**ODataDefaultParser**](https://github.com/SharePoint/PnP-JS-Core/wiki/Response-Parsers) is used for all requests by default (except a few special cases). But, we can create a custom parser by **extending ODataParserBase<T> class**.

## What is the difference between Parsers and Array Parsers?
**Parsers** process **returned single item**. **Array Parsers** process returned **Item Collections as an array**.

## Parser and Array Parser implementation
Here we have both implementations for **SelectDecoratorArrayParser** and **SelectDecoratorParser** which is using the decorator metadata in order to combine the results and provide our real business object. For example, [in the previous post](/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes), we did map **@select("File/Length")** with the property called **Size**, then the parser will be actually provide the information in the proper Size property.

<script src="https://gist.github.com/jquintozamora/e601e5b36662547fa496bf390b91265a.js"></script>

## How to use Custom Parsers?
Here is an example of consuming information from a SP library by using custom objects and custom parsers.

> **Sample 1\. Query one single document using MyDocument custom object and SelectDecoratorParsers (single)**

<script src="https://gist.github.com/jquintozamora/7499df249d96451c89a8fc3d06734f29.js"></script>

[![Sample 1](./clip_image001-1.png "sample 1")](./clip_image001-1.png)

> **Sample 2\. Query multiple documents using MyDocument and MyDocumentCollection custom object classes and SelectDecoratorsArrayParser (returning just the Custom Object properties):**

<script src="https://gist.github.com/jquintozamora/b570bb8e698c58d520e1730bed840a14.js"></script>

[![Sample 2](./clip_image002-1.png "sample 2")](./clip_image002-1.png)

> **Sample 3\. Query multiple documents using MyDocument and MyDocumentCollection custom object classes and SelectDecoratorsArrayParser (returning the full PnP JS Core object):**

<script src="https://gist.github.com/jquintozamora/625f82c89774623ee6d06610e6182965.js"></script>

[![Sample 3](./clip_image003-1.png "sample 3")](./clip_image003-1.png)

## Conclusion
The ideal scenario is using the **sample 3** because will allows us continue with the pnp js core method chain if needed.
