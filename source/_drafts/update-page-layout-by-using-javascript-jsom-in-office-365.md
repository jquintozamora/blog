---
title: Update Page Layout by using JavaScript (JSOM) in Office 365
tags:
  - English
url: 861.html
id: 861
categories:
  - javascript
  - JSOM
  - Office 365
date: 2017-01-19 15:57:21
---

&nbsp;

[![image](https://blog.josequinto.com/wp-content/uploads/2017/01/image_thumb-2.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/01/image-2.png)

Hi,

I’m going to show how to update or change the page layout for a given SharePoint page. That sounds quite straightforward, but we have to mind some important bits:

- **Check in, check out status** of the current page or item we are changing.

- **CAML query using Page Layout as a FieldRef filter**

- Use **SP**.**FieldUrlValue** to update the Page Layout property.

I’d like to share the JSOM (JavaScript) code having in mind these assumptions:

- we **already have both layouts in the _catalogs/masterpage library**

- we are executing the JS code in the **subsite** in which we want to update the pages 

- we are **iterating thru all the pages** currently using pageLayoutToChange and set to them the new layout.

&nbsp;
<script src="https://gist.github.com/jquintozamora/f759a6aa362ca63ad3c8921a5bc738c5.js"></script> 

&nbsp;

Hope that helps!

@jquintozamora