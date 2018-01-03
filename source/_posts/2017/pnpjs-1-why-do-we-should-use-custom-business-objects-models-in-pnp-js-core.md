---
layout: post
title: Part 1. Why Should we use Custom Business Objects (Models) in PnP JS Core
language: English
permalink: why-do-we-should-use-custom-business-objects-models-in-pnp-js-core
id: 963
tags:
  - javascript
  - PnP
  - PnP JS Core
  - TypeScript
date: 2017-05-19 17:59:12
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

1. **Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core (this article)**
2. [Creating select and expand TypeScript Property Decorators to be used in PnP JS Core](/2017/05/29/creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core#Post-Series-Index)
3. [Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes](/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes#Post-Series-Index)
4. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
5. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
6. [Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**


## Introduction
The [PnP JS Core library](https://github.com/SharePoint/PnP-JS-Core) was created to help developers to simplify common operations within SharePoint and the SharePoint Framework by providing a fluent API (wrapper) for [SharePoint REST API](https://dev.office.com/sharepoint/docs/apis/rest/get-to-know-the-sharepoint-rest-service).

A few months ago I started to put my hands on PnP JS Core and I created a [new react sample showing the use of it with async / await](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-async-await-sp-pnp-js). By then I noticed how easy accessing to REST API services is by using this library, which even provides an API to cache data in the browser and do query batching.

Then I decided to give it a go for using in a real world application, and then the fun began ;) and I started to look into more advanced concepts like [Extending with Custom Business Objects](https://github.com/SharePoint/PnP-JS-Core/wiki/Extending-with-Custom-Business-Objects) and create [Response Parsers](https://github.com/SharePoint/PnP-JS-Core/wiki/Response-Parsers).

I **especially DO like** [**TypeScript**](https://www.typescriptlang.org/) to develop modern JS Applications and webparts. Moreover, when developing an application we often have defined entities and models representing the data we are manipulating. More in particular in client side development and using TypeScript as a OO Language **we like to have our data as a Typed object instead of using any :)**

> The **PnP JS Core** library provides a base for us to build our custom objects at different levels:
> *   **Item**
> import { Item } from "sp-pnp-js";
> *   **Items** (**ItemCollection**)
> import { Items } from "sp-pnp-js";
> For the full list see this [PnP JS Core github folder](https://github.com/SharePoint/PnP-JS-Core/tree/master/src/sharepoint).

## Why do we should use custom business objects in PnP JS Core?
Let's get to the point, quick answer is we **don't strictly need** create custom business objects in order to do queries with **PnP JS Core** library, but if we are using the combination of **TypeScript**, **React** and **PnP JS Core** it will be obvious the benefits it could give to our full development team.

However I would try to show you these benefits by providing two examples solving the same requirement (**Get Specific Item from a Custom SharePoint List**).

Let’s assume we have the following list with four columns:

[![clip_image001](./clip_image001.png "clip_image001")](./clip_image001.png)

We are going to use PnP JS Core to query the first item of that list but we will do in two ways:

1.  PnP JS Core **WITHOUT** custom model
2.  PnP JS Core **WITH** custom model

### PnP JS Core WITHOUT custom model
Let’s assume we already have an environment in which use PnP JS Core, if not you can use [this project as a reference to start with PnP JS Core, TypeScript, React and SPFx](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-async-await-sp-pnp-js).

Then let’s use the following code to query do the query:

<script src="https://gist.github.com/jquintozamora/3d06e687c4ce98b2be5f5d1eed8e0b85.js"></script>

Here you see an image as well, in order to** illustrate TypeScript compiling errors and intellisense**:

[![clip_image002](./clip_image002.png "clip_image002")](./clip_image002.png)

In the sample, we can see clearly the benefits of **type checking** and **intellisense** on TypeScript.

Initially we are using **any** as a Type for **plainItemAsAny** object and **we aren’t receiving help from the TypeScript** **compiler**.

In the following lines, we are using the **“as” operator inside .tsx** file ([introduced in TypeScript 1.6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html)). We are using it as a workaround to get type checking and intellisense,&nbsp; which help **avoiding some typical developer mistakes **like accessing title property instead of Title with capital letter.

> Actually, “as” operator inside .tsx file is the default way to cast objects (removing any ambiguity between JSX expressions and the TypeScript prefix cast operator).

The next image shows the console output for the previous code:

[![clip_image003](./clip_image003.png "clip_image003")](./clip_image003.png)

But, thinking little bit more about this scenario, we **defined the type dynamically** and **only for this part of our code**, which can't be reused elsewhere. In addition, imagine we need to **add some other properties in the model **and we should to **edit several parts** of our code including the **Types**, **.select(..)** method and so on.

**Then building our own Custom Business Objects (Models) starts making lot of sense, isn't it ?**

### PnP JS Core with custom objects

We've seen how** TypeScript helps building good quality code** using Types in general, and specifically for PnP JS Core. Now, we are going to show how to create our custom Model (**MyItem**) extending **Item** class already provided by **PnP JS Core**.

Create the custom object (model) in a separate .ts file:

<script src="https://gist.github.com/jquintozamora/43d61763771078d72a81890a63605ebc.js"></script>

**Note** that we initially import **Item** and **ODataEntity**. Item is needed to be able to **overrides get() method** and ODataEntity will be used to provide the **default** PnP JS Core **parser**.

How to use this custom object:

<script src="https://gist.github.com/jquintozamora/8e0730096fa2de82b341fc8fe1acb2e3.js"></script>

**Note** that&nbsp; we import our custom model (**MyItem**) at the beginning and we create **our constant with the specific type** “**MyItem**”. Take a look to the code and comments to see the benefits.

Let’s **highlight** how the **TypeScript compiler warns us** if we try do get some properties wrongly:

[![clip_image004](./clip_image004.png "clip_image004")](./clip_image004.png)

Let’s remarks how can we use **intellisense** too:

[![clip_image005](./clip_image005.png "clip_image005")](./clip_image005.png)

The following image shows the **console output** for this code:

[![clip_image006](./clip_image006.png "clip_image006")](./clip_image006.png)

**Note** how the real and final JavaScript object has more properties which inherits directly from Item class plus the own MyItem properties.

## Conclusion

We have shown how using our **custom business object in PnP JS Core DO help on**:

*   **Type checking**
*   **Intellisense**
*   **Improve performance** by **overriding select parameter**
*   Compatibility with **chaining methods**
*   Having **only one source of the truth of out model (improve maintenance**)

**However**, there are other aspects **could be improved like**:

*   **Support for complex expand and select **for sub-objects like .select("File/Length"). That could be done using **TypeScript decorators** combined with a small function in our model class.
*   **Isolate query and property names**. We could want FileLeafRef property to be called Name in our model. That could be done using **generic custom parsers** to be used across all our models.
*   **Avoid duplicate property definition in our code**. For example, we have in our custom model 4 properties defined but we [DO repeat the names in the static variable called Fields](https://gist.github.com/jquintozamora/43d61763771078d72a81890a63605ebc#file-jq-typescript-pnpjs-customobjectsoriginal-ts-L4), which is used to override the select parameter afterwards. We could avoid defining properties twice by using **TypeScript decorators**.
*   We have examples to override single Item, but **not for Item Collections,** and there are some features to consider when we implement custom collections. **We can extends Items class instead Item to achieve it!**

We are going to cover each of these improvements in the following posts of this series.
