---
title: Get Pages Library by GUID using JSOM in SharePoint 2013 / Office 365
tags:
  - English
permalink: get-pages-library-by-guid-using-jsom-in-sharepoint-2013-office-365
id: 434
categories:
  - javascript
  - JSOM
  - multilingual
  - Office 365
  - SharePoint 2013
  - SharePoint Online
date: 2015-09-08 17:13:37
---

Hi there,

Currently I am working on a multilingual project using Office 365\. As a developer, designing multilingual solutions for SharePoint, is tricky, because you need to take off your code all things like names of lists, names of views, etc.

In this post we will see how we can get the Pages Library using the GUID instead using “Pages” list name.

&nbsp;

The good thing here, is that we don’t have to know the GUID, because it can be extracted from the SP.Web property bag (thanks Vard).

&nbsp;

Here is the JavaScript (JSOM) code needed to get this value:

&nbsp;
<div id="codeSnippetWrapper">
<pre class="js">
// Get SharePoint Context       
var context = SP.ClientContext.get_current();

// Get All Properties from the current Web property bag
var allprop = context.get_web().get_allProperties();
context.load(allprop);
context.executeQueryAsync(
    function () 
    {
        // Extract the Pages Library GUID from __PagesListId property bag
        pagesListID = allprop.get_item("__PagesListId");
        console.log(pagesListID);
    }, 
    function(sender,args) 
    { 
        console.log(args.get_message())
    }
);
</pre>
&nbsp;

</div>
&nbsp;

&nbsp;

One important tip, when we need to look for all Properties in the property bag of Site, Web, List, Folder or whatever, we can use “SharePoint 2013 Client Browser” :

[![image](https://blog.josequinto.com/wp-content/uploads/2015/09/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/09/image.png)

&nbsp;

[Update 12/2015]

You can use **_spPageContextInfo.pageListId** if your code is running in a page that belongs to Pages Library.

For instance, if your code is in a Documents Library, this code _spPageContextInfo.pageListId will provide Documents Library GUID.

Or, if you are in a Custom List, this code _spPageContextInfo.pageListId will provide Custom List GUID.

(thanks for the comment Fran)

[/Update]

&nbsp;

&nbsp;

HTH

JQ

[@jquintozamora](https://twitter.com/jquintozamora)