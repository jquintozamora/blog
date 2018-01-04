---
layout: post
title: CAML Query to Filter Lookup Field by Id using JSOM in Office 365 / SharePoint 2013
language: English
permalink: caml-query-to-filter-lookup-field-by-id-using-jsom-in-office-365-sharepoint-2013
id: 503
categories:
    - Code-Reminder
tags:
  - caml
  - javascript
  - JSOM
  - Office 365
date: 2015-12-17 18:18:57
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction

Few days ago, I wrote a post about how to [Create a new lookup field using JSOM in Office 365](./2015/12/02/create-a-new-lookup-field-using-jsom-in-sharepoint-2013-office-365). Continuing with the same scenario, we have **two related libraries**: **Documents** and **Pages**, and the requirement is to see for every page one list of related documents. 

So, the first step, was creating a lookup value in order to allow us to relate two libraries. And the next step, which is the post topic, is to use JSOM (JavaScript) code in a script webpart to query Documents library filtering by current page id, that means filtering by using Lookup ID column.

![image](./image-1.png)

If you look at the picture, this is how lookup field is filled in the **Documents library**.

And here is the code we need to use using a `Script WebPart` or `Content Editor WebPart` inside the Pages Library documents or pages. 

> Note: This is important to note that this code is using some context variables related to current page id and this code is only working if that is inside a page. For example, if we have a page like that:

![image](./image-2.png)

> Note: We can try / debug our code using F12 (Developer Tools in Chrome or IE). 

## Code
Here is the code to achieve the image results:
<script src="https://gist.github.com/jquintozamora/7956b7ef46360b47b484.js"></script> 
