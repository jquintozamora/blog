---
layout: post
title: Part 2. Creating select and expand TypeScript Property Decorators to be used in PnP JS Core
language: English
permalink: creating-select-and-expand-typescript-property-decorators-to-be-used-in-pnp-js-core
id: 981
categories:
  - decorator
  - PnP
  - PnP JS Core
  - TypeScript
date: 2017-05-29 14:19:50
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Post Series Index
This is a blog post in the series about working with **Custom Business Objects**, **Parsers** and **Decorators** in [PnP JS Core](https://github.com/SharePoint/PnP-JS-Core):

1. [Introduction to Why do we should use Custom Business Objects (Models) in PnP JS Core](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core#Post-Series-Index) 
2. **Creating select and expand TypeScript Property Decorators to be used in PnP JS Core (this article)**
3. [Creating MyDocument and MyDocumentCollection models extending Item and Items PnP JS Core classes](/2017/06/15/creating-mydocument-and-mydocumentcollection-models-extending-item-and-items-pnp-js-core-classes#Post-Series-Index)
4. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
5. [How to consume our decorators, models and parsers from SPFx, the winning combination](/2017/06/28/how-to-consume-our-decorators-models-and-parsers-from-spfx-the-winning-combination#Post-Series-Index)
6. [Github project!](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators) **Please remember to “star” if you liked it!**


## Introduction
In the previous post of this series we explained why we should use **Custom Business Objects in PnP JS Core** and at the end of the article we summarized some improvements to work with Business Objects in a more generic and usable way. In order to achieve it, we propose the usage of TypeScript Decorators in combination with Custom Business Objects and Custom Generic Parsers. In this article, we are going to see what are **TypeScript property decorators** and how to implement them for this specific scenario.

## What are TypeScript Property Decorators?
Generally speaking, **decorators** are special bindings to easily **provide extra functionality** for classes, methods, accessors, properties and parameters.

[TC39](http://ecma-international.org/memento/TC39.htm) members are working on the definition of a [standard for ECMAScript Decorators](https://tc39.github.io/proposal-decorators/) due to the success of **TypeScript experimental decorators’** **implementation** and to the **good **acceptance ****of them on [Angular](https://angular.io/), [Aurelia](http://aurelia.io/) and [Ember](https://www.emberjs.com/) frameworks.

> In **Typescript**, A Decorator is a special kind of declaration that can be attached to a [class declaration](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators), [method](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators), [accessor](https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators), [property](https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators), or [parameter](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators).

There are the [four different decorator declarations available](https://github.com/Microsoft/TypeScript/blob/v2.3.3/src/lib/es5.d.ts#L1296-L1299) (by May 2017 - TypeScript 2.3.3):

<script src="https://gist.github.com/jquintozamora/7ee4cc7047122448cc06abadc3a7493f.js"></script>

In this post, we will only use "[property decorators](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#property-decorators)".

For example, see how the class **MyDocument** could have a select decorator to query **FileRefLeaf** field and do the mapping with **Name** property in our class:

<script src="https://gist.github.com/jquintozamora/20d715203186a3e9463ba76ca270142d.js"></script>

## How could Decorators help to Custom Business Objects in PnP JS Core 
As we described in [the previous post of this series](/2017/05/19/why-do-we-should-use-custom-business-objects-models-in-pnp-js-core/), we can define a **Custom Business Object with this code**:

<script src="https://gist.github.com/jquintozamora/43d61763771078d72a81890a63605ebc.js"></script>

You can see in the code how we create and maintain 4 different properties in the class definition, and **separately**, we **also maintain an array of names for every property** we want to query against the **server using SP Rest API with select parameter**.

The idea of decorators in this scenario is achieve something like:

<script src="https://gist.github.com/jquintozamora/dce0f50d7cce5870ed90e2c0172629c0.js"></script>



## Property Decorators’ implementation for select and expand in PnP JS Core 
Once we have more context about what is a decorator intended for, let´s see **how to implement property decorators and property **[**decorator factory**](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#decorator-factories)**.** Basically, a decorator factory is a function that returns a function of type [PropertyDecorator](https://github.com/Microsoft/TypeScript/blob/v2.3.3/src/lib/es5.d.ts#L1297).

Have a look into the [TypeScript type definitions for decorators](https://github.com/Microsoft/TypeScript/blob/v2.3.3/src/lib/es5.d.ts#L1296-L1299) and note how all of them are different, for example, **PropertyDecorator** type have two parameters target (the class or instance in which the property is) and propertyKey (the name of the property). Also note how **PropertyDecorator** in a way contrary to **MethodDecorator** returns nothing, which means that in order to **add extra functionality** **we can´t return a modified property** as a result of the decorator function, **we should modify the target object itself instead**.

Now, we are going to describe how to** implement two decorators for select and expand functionalities**. The idea of these decorator is to make an **annotation** on the class and store in the target object **two lists** of the properties **tagged with @select and @expand **in order to be used later at query time.

<script src="https://gist.github.com/jquintozamora/9677a70d9698778399c5697ed1c7e2ae.js"></script>

## Important Notes

- **@select** decorator implementation has **queryName as optional,** so if there isn´t queryName, we are getting the** property name itself** to be used in the query.

- **Decorator factories** are used because we need to provide **custom queryName** for the query if needed. 

- We **extract** the functionality **setMetadata** as a separate function as it will be used on **both decorators**.

- I **considered** to use [reflect-metadata API](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#metadata) to set metadata, but **isn't needed on this scenario** as we are storing the metadata in the actual object (target) and **we** **don´t need extra overload**.

If you´d like see the **real implementation of decorators**: [take a look to this file which have all the decorators implements for PnP JS Core example.](https://github.com/jquintozamora/spfx-react-sp-pnp-js-property-decorators/blob/master/src/webparts/customBusinessObjectsPnPJs/utils/decorators.ts)

Let´s see now how this implementation is working on a real **SPFx webpart** and what is its runtime behavior:

<script src="https://gist.github.com/jquintozamora/e06157d6800885f15e7ddabcecaddc2b.js"></script>

In the code we have a PnP JS Core Custom Object which inherits from **Item** and because of that is provided with some already implemented methods **get(), getAs<type>(), constructor**, and so on, that **we can override** to change some behavior (we will see in the next post how to override get() method to actually use the provided decorators.

Apart from that, our custom class also defines two properties called **Title** and **Name** and they both are using **@select decorator** to set this property as **queriable** via “select” parameter of the REST API. The first one will use “**_Title_**” in the query, and the second one will use “**_FileLeafRef_**”, which means a query like that:

**/_api/web/lists/getByTitle('PnPJSSample')/items(1)?$select=Title,FileLeafRef**

### How the metadata is stored using decorators?
Let´s see this example at runtime:

**Property 1: Title**

[![clip_image002](./clip_image002-1.png "clip_image002")](./clip_image002-1.png)

**Property 2: FileLeafRef:**

[![clip_image003](./clip_image003-1.png "clip_image003")](./clip_image003-1.png)

We can see how we use the target object to store the information using **__select__** property. Ideally we should use **ES Symbol** when they have more browser support.

### When is decorator code executed?
Code for property decorators is executed **when JavaScript engine read (import) our custom class**, **just at the beginning**.

Imagine we define our custom class **MyDocument** as external module and we import this module from our webpart component .tsx file. Then, the code is executed just in the import evaluation, as we can see in the following picture:

[![clip_image004](./clip_image004-1.png "clip_image004")](./clip_image004-1.png)

| #  | Description  |
|-------|------|
|1      | ** Import** our Custom Object class from our tsx component. |
|2 and 3| **When JavaScript** engine **evaluate the import** is when it will **evaluate and execute all decorator functions** |
|4      | **After** evaluating all **decorator functions**, the array of selected properties is already generated and stored on **MyDocument**, then it returns to the execution of out component, just **after the import** instruction. |
|5      | **In the get method of our PnP JS** Core Custom Object we already have our selectors evaluated and we have the information we need stored in MyDocument object as own property |
