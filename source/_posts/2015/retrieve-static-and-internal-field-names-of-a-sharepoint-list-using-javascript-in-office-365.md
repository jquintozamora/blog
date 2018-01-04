---
layout: post
title: Retrieve Static and Internal Field Names of a SharePoint List using JavaScript in Office 365
language: English
permalink: retrieve-static-and-internal-field-names-of-a-sharepoint-list-using-javascript-in-office-365
id: 478
categories:
  - Code-Reminder
tags:
  - javascript
  - JSOM
  - Office 365
  - SharePoint 2013
date: 2015-12-08 17:52:52
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
There are scenarios where we need to show and compare **Internal** and **Static** field names of a **SharePoint list**. 

For instance, if we want to do **CAML** query over some custom fields, but we don’t remember exactly the Internal Name of the field, we can use this code directly copied and pasted in the browser console to get all the names.

## JavaScript Object Model reference
Using JSOM or JavaScript Object Model, It is important the difference between get all fields directly from a list and get all view fields from a view.

- `get_fields()` returns `SP.FieldCollection` object -- contains all SP.Field object properties > [https://msdn.microsoft.com/en-us/library/office/jj246815.aspx](https://msdn.microsoft.com/en-us/library/office/jj246815.aspx)

- `get_viewFields()` returns `SP.ViewFieldCollection` object --- only field names (Internal Names), but not a SP.Field object > [https://msdn.microsoft.com/en-us/library/office/jj244841.aspx](https://msdn.microsoft.com/en-us/library/office/jj244841.aspx) 

A little more information about the Object Model:

- SP.FieldCollection object: [https://msdn.microsoft.com/en-us/library/office/jj246909.aspx](https://msdn.microsoft.com/en-us/library/office/jj246909.aspx)
> Represents a collection of [SP.Field](https://msdn.microsoft.com/en-us/library/office/jj246815.aspx) objects. 

  ![image](./image2.png)

- SP.ViewFieldCollection Object: [https://msdn.microsoft.com/EN-US/library/office/jj244841.aspx](https://msdn.microsoft.com/EN-US/library/office/jj244841.aspx)

  ![image](./image3.png)


## Code
This is the code to get all the field information:

<script src="https://gist.github.com/jquintozamora/8774f1e6444209253d39.js"></script> 
