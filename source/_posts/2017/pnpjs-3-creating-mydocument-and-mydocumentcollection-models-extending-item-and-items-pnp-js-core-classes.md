---
layout: post
id: 1006
title: Part 3. Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes
permalink: creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes
description: Part 3 of a series of blog posts to create a class model for PnP JS Core
language: English
date: 2017-06-15 23:22:47
tags:
  - Custom Objects
  - decorator
  - PnP JS Core
featuredImage: 
  url: featured.png
  width: auto
  height: auto
categories: 
  - Series
  - PnPJsCore
---


## Post Series Index
This is a blog post in the series about working with **Custom Business Objects**, **Parsers** and **Decorators** in [PnP JS Core](https://github.com/SharePoint/PnP-JS-Core):

1. [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core#Post-Series-Index) 
2. [Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core#Post-Series-Index)
3. **Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes (this article)**
4. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
5. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
6. [Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**


## Introduction
In the previous posts of this series we explained why we should use [**Custom Business Objects in PnP JS Core**](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) and we implemented [**TypeScript decorators**](/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/) to help us to have more **generic** and **maintainable** **code**. In this article, we will see how to implement **Custom Business Objects inheriting** from **Item** and **Items** **PnP JS Core generic classes** and using the previously created TypeScript decorators internally.

## What is the difference between Item and Items PnP JS Core classes?
Let's do the comparison with **Client Object Model**, **Item** is [ListItem](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.listitem.aspx) and **Items** is [ListItemCollection](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.listitemcollection.aspx). PnP Core JS expose these two different classes **Item** and **Items** with different methods within them. For example, you can see different [Item Methods](https://github.com/SharePoint/PnP-JS-Core/blob/master/src/sharepoint/items.ts#L104-L214) and [Items methods](https://github.com/SharePoint/PnP-JS-Core/blob/master/src/sharepoint/items.ts#L17-L98).

Imagine we are trying to get specific **Item or Document** from SharePoint using PnP Core JS then we will use this code (with no custom objects):

<script src="https://gist.github.com/jquintozamora/07226da85fd40208902aab08dc2e1a98.js"></script>

[![wit no custom objects](./clip_image001.png "clip_image001")](./clip_image001.png)

And **similarly**, to get **Items or Document Collection** we will use:

<script src="https://gist.github.com/jquintozamora/7904f639a6298bb12e3bfa5f8e3f9611.js"></script>

Here the result:

[![with no custom object result](./clip_image002.png "clip_image002")](./clip_image002.png)

Now, we already know the **difference** between **Item** and **Items** from PnP JS Core. Let's **implement** our **two custom classes** **inheriting** both of them and combining TypeScript decorators.

## Custom classes implementation inheriting from Item and Items
We are going to create two new classes called "**MyDocument**" and "**MyDocumentCollection**".

**MyDocument**
<script src="https://gist.github.com/jquintozamora/0952c183746ca247ed74995e4bb84158.js"></script>

**MyDocumentCollection**
<script src="https://gist.github.com/jquintozamora/565da81f1db416992133de81b2ab7065.js"></script>

Note you can see the full code in this [github project](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators).

Ideally we will **create a folder in our solution to create all our models**:

[![folder models](./clip_image003.png "clip_image003")](./clip_image003.png)

## How to use MyDocument Custom Business Object from our PnP JS Core code
We can **easily use the class with the following code**:

How to consume **MyDocument**:
<script src="https://gist.github.com/jquintozamora/3607aed369a766aaf22d03347d49ef7b.js"></script>

[![consume MyDocument](./clip_image004.png "clip_image004")](./clip_image004.png)

How to use **MyDocumentCollection**:

<script src="https://gist.github.com/jquintozamora/29ab148ea5abe1dd9984ce2f255423fa.js"></script>

[![consume MyDocumentCollection](./clip_image005.png "clip_image005")](./clip_image005.png)

## Conclusion
We can notice how **both custom objects and decorators work well** because queries to **SP only brings the right data** "**Title**, **FileLeafRef** and **File/Length**", but **still** we **need a parser** in order to correctly do the **mapping** between the **query** properties into our **TypeScript** **objects** "**Title**, **Name** and **Size**" properties.

In the next post we are going to implement a **custom Parser and Array Parser to solve** this specific issue.
