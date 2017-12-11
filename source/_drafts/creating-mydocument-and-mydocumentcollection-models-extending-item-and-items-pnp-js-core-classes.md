---
title: >-
  Part 3. Creating MyDocument and MyDocumentCollection models extending Item and
  Items PnP JS Core classes
tags:
  - English
url: 1006.html
id: 1006
categories:
  - Custom Objects
  - decorator
  - PnP JS Core
date: 2017-06-15 23:22:47
---

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image.png)

This is a blog post in the series about working with **Custom Business Objects**, **Parsers** and **TypeScript decorators** in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/)
<li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/)
2.  **Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes (this article)**
3.  [Create Custom Parser and Array Parser to unify select and property names](https://blog.josequinto.com/2017/06/28/create-custom-parser-and-array-parser-to-generate-query-and-property-names-in-pnp-js-core/)
4.  [How to consume our decorators, models and parsers from SPFx, the winning combination](https://blog.josequinto.com/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination/) <li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**

## Introduction

In the previous posts of this series we explained why we should use [**Custom Business Objects in PnP JS Core**](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) and we implemented** **[**TypeScript decorators**](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/) to help us to have more **generic** and **maintainable** **code**. In this article, we will see how to implement **Custom Business Objects inheriting** from **Item** and **Items** **PnP JS Core generic classes** and using the previously created TypeScript decorators internally.

## What is the difference between Item and Items PnP JS Core classes?

Let's do the comparison with **Client Object Model**, **Item** is [ListItem](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.listitem.aspx) and **Items** is [ListItemCollection](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.listitemcollection.aspx). PnP Core JS expose these two different classes **Item** and **Items** with different methods within them. For example, you can see different [Item Methods](https://github.com/SharePoint/PnP-JS-Core/blob/master/src/sharepoint/items.ts#L104-L214) and [Items methods](https://github.com/SharePoint/PnP-JS-Core/blob/master/src/sharepoint/items.ts#L17-L98).

Imagine we are trying to get specific **Item or Document** from SharePoint using PnP Core JS then we will use this code (with no custom objects):

<script src="https://gist.github.com/jquintozamora/07226da85fd40208902aab08dc2e1a98.js"></script>

[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image001.png)

And **similarly**, to get **Items or Document Collection** we will use:

<script src="https://gist.github.com/jquintozamora/7904f639a6298bb12e3bfa5f8e3f9611.js"></script>

Here the result:

[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image002.png)

Now, we already know the **difference** between **Item** and **Items** from PnP JS Core. Let's **implement** our **two custom classes** **inheriting** both of them and combining TypeScript decorators.

## Custom classes implementation inheriting from Item and Items

We are going to create two new classes called "**MyDocument**" and "**MyDocumentCollection**".

**MyDocument**

<script src="https://gist.github.com/jquintozamora/0952c183746ca247ed74995e4bb84158.js"></script>

**MyDocumentCollection**

<script src="https://gist.github.com/jquintozamora/565da81f1db416992133de81b2ab7065.js"></script>

Note you can see the full code in this [github project](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators).

Ideally we will **create a folder in our solution to create all our models**:

[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image003_thumb.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image003.png)

## How to use MyDocument Custom Business Object from our PnP JS Core code

We can **easily use the class with the following code**:

How to consume **MyDocument**:

<script src="https://gist.github.com/jquintozamora/3607aed369a766aaf22d03347d49ef7b.js"></script>

[![clip_image004](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image004_thumb.png "clip_image004")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image004.png)

How to use **MyDocumentCollection**:

<script src="https://gist.github.com/jquintozamora/29ab148ea5abe1dd9984ce2f255423fa.js"></script>

[![clip_image005](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image005_thumb.png "clip_image005")](https://blog.josequinto.com/wp-content/uploads/2017/06/clip_image005.png)

We can notice how **both custom objects and decorators work well** because queries to **SP only brings the right data** "**Title**, **FileLeafRef** and **File/Length**", but **still** we **need a parser** in order to correctly do the **mapping** between the **query** properties into our **TypeScript** **objects** "**Title**, **Name** and **Size**" properties.

In the next post we are going to implement a **custom Parser and Array Parser to solve** this specific issue.

Remember this is a post series about working with Custom Business Objects, Parsers and TypeScript decorators in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/)
<li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/)
2.  **Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes (this article)**
3.  [Create Custom Parser and Array Parser to unify select and property names](https://blog.josequinto.com/2017/06/28/create-custom-parser-and-array-parser-to-generate-query-and-property-names-in-pnp-js-core/)
4.  [How to consume our decorators, models and parsers from SPFx, the winning combination](https://blog.josequinto.com/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination/) <li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**

Enjoy it!

[@jquintozamora](https://twitter.com/jquintozamora)