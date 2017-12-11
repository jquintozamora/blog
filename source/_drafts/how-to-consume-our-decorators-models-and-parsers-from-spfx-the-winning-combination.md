---
title: >-
  Part 5. How to consume our decorators, models and parsers from SPFx, the
  winning combination
tags:
  - English
url: 1073.html
id: 1073
categories:
  - PnP JS Core
  - SPFx
  - TypeScript
date: 2017-06-28 11:33:42
---

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-4.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-4.png)

This is a blog post in the series about working with Custom Business Objects, Parsers and TypeScript decorators in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) <li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/) <li>[Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes](https://blog.josequinto.com/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes/)2.  [Create Custom Parser and Array Parser to unify select and property names](https://blog.josequinto.com/2017/06/28/create-custom-parser-and-array-parser-to-generate-query-and-property-names-in-pnp-js-core/)
3.  **How to consume our decorators, models and parsers from SPFx, the winning combination (this article)** <li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!****
**

## Introduction
<p>In the previous posts of this series we explained why we should use [**Custom Business Objects in PnP JS Core**](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) and we implemented **TypeScript decorators,** Custom Business Object **inheriting from Item** and **Items** **PnP JS Core** classes, and **custom Parsers**. In this article, we will see how to use all of them together in order to get the** max benefit from querying PnP JS Core from SharePoint Framework Web Part**.

## SPFx Web Part sample

All code samples we are going to see here, actually, are implemented in this **Github project**: [spfx-react-sp-pnp-js-property-decorators](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators "https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators").
> There are some **requisites** to have in order to run this webpart sample. 
> 
> 1\. Create a list called PnPJSSample with four colums (ID, Title, Category and Quantity).
> 
> 2\. Upload some documents in the Documents library.

In the following code sample, we can see different ways to consume and query against PnP JS Core using different combinations of decorators, models and parsers:

<script src="https://gist.github.com/jquintozamora/c5ed551b7e72e8fc31d0dd322a1ad041.js"></script>

We can see after looking into the different code samples, how they actually work, and what is the result from the browser console:

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-5.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-5.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-6.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-6.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-7.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-7.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-8.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-8.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-9.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-9.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-10.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-10.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-11.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-11.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-12.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-12.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-13.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-13.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-14.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-14.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-15.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-15.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-16.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-16.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-17.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-17.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-18.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-18.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-19.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-19.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-20.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-20.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-21.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-21.png)

## Conclusion

In my opinion, if we are going to create custom classes in our TypeScript projects for consuming SharePoint lists by using PnP JS Core, the ideal is being integrated with it. And by using decorators will do our life easier and our code more maintainable. 

There are multiple ways to create and consume custom objects and parsers, but this post is intended to show the differences and give you an overview in order to decide what to use. 

From my point of view, the ideal way to consume is:

<script src="https://gist.github.com/jquintozamora/c321d9dc77591ed75e259f52c5377fc8.js"></script>

Console Result:

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-22.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-22.png)

And the reason is because:

- We can use **@select** and **@expand** decorators **efficiently**

- We can continue using **method chain** after as(MyDocumentCollection). For example **skip(1)**

- **JavaScript objects returned** in the Array are named **MyDocument** (better for **debugging**)

- We can use **intellisense** **in VS Code** with our custom model properties (Size, Title and Name).

Remember this is a post series about working with **Custom Business Objects, Parsers and TypeScript decorators** in PnP JS Core:

1.  [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](https://blog.josequinto.com/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/) <li>[Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](https://blog.josequinto.com/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core/)<li>[Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes](https://blog.josequinto.com/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes/)2.  [Create Custom Parser and Array Parser to unify select and property names](https://blog.josequinto.com/2017/06/28/create-custom-parser-and-array-parser-to-generate-query-and-property-names-in-pnp-js-core/)
3.  **How to consume our decorators, models and parsers from SPFx, the winning combination (this article)**<li>[Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**<p>
Enjoy!

[@jquintozamora](https://twitter.com/jquintozamora)