---
title: >-
  Using PowerShell to Set Available Web Templates via CSOM in SharePoint Online
  / Office 365
tags:
  - English
url: 607.html
id: 607
categories:
  - Office 365
  - PowerShell
  - SharePoint Online
date: 2016-02-12 10:03:34
---

Hi,

Sometimes, the easiest way to deploy some additions, or updates in an already deployed SharePoint Online solution, is using **PowerShell**. 

In my case, I had the requirement of **updating some Web Templates** in a **Office 365** **Intranet** and enable these Web Templates to be used in several sites that were already provisioned. So, ideally to achieve a **clean Upgrade**,&nbsp; we should e**dit the Web Template** to add the changes and do the **feature upgrade** to implement the change for **future sites created** and for the already created sites, we just update the** Avaliable Web Templates using PowerShell**.

There is no easy way to update Available Web Template using Client Object Model (CSOM, JSOM), I mean, we don’t have any property or method to do it. Instead we should use a Web-based property bag called “**__WebTemplates**”. This property bag is used to read and write this property in the Server Object Model dlls: [http://blogs.msdn.com/b/maximeb/archive/2008/08/20/how-to-sort-the-list-of-sites-in-the-create-sites-page.aspx](http://blogs.msdn.com/b/maximeb/archive/2008/08/20/how-to-sort-the-list-of-sites-in-the-create-sites-page.aspx "http://blogs.msdn.com/b/maximeb/archive/2008/08/20/how-to-sort-the-list-of-sites-in-the-create-sites-page.aspx"). 

[![image](https://blog.josequinto.com/wp-content/uploads/2016/02/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/02/image.png)

&nbsp;

If we analyze little bit more the value of the Property Bag we can see the format used to store this property is XML:

[![image](https://blog.josequinto.com/wp-content/uploads/2016/02/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/02/image-1.png)

In this post we will use PowerShell to Add more Web Templates to the Available List by setting properly “**__WebTemplates**” property bag.
<script src="https://gist.github.com/jquintozamora/d8e966997a9881efc6d6.js"></script> 

&nbsp;

References:

- Paul Ryan post: [http://paulryan.com.au/2014/setting-default-page-layout-via-csom/](http://paulryan.com.au/2014/setting-default-page-layout-via-csom/ "http://paulryan.com.au/2014/setting-default-page-layout-via-csom/")

&nbsp;

Enjoy!

[@jquintozamora](https://twitter.com/jquintozamora)