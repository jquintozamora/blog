---
title: Create Thumbnails view using client-side rendering and OWA in SharePoint 2013
tags:
  - English
permalink: create-thumbnails-view-using-client-side-rendering-and-owa-in-sharepoint-2013
id: 303
categories:
  - client side rendering
  - CSS
  - javascript
  - JSLink
  - SharePoint 2013
date: 2014-11-13 10:47:00
---

&nbsp;

I’m really impressed with client-side rendering in SharePoint 2013\. Last week I had a requirement to create a new view type in SharePoint to allow users to see previews of documents in a grid instead using the typical format of SharePoint libraries.

In SharePoint 2010, probably I would need to create custom webpart, or custom XSLT to achieve that requirement and probably it will take one month of development. But now, with client-side rendering we can edit the way in that items are rendered saving a lot of costs.

Remember using properly CSR  we can modify the render of items keeping the Out of the box filtering, search box, sorting, paging, etc. That will save a lot of work ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/11/wlEmoticon-smile.png).

&nbsp;

Theory aside, this will be the aspect of SharePoint library applying this JS Link:

&nbsp;

**<IMPORTANT UPDATE>**
** If you are using Modern Document Libraries view, take into account: "CustomActions that deploy script, JSLinks and additional web parts on the page are currently not supported"**
[** https://blogs.office.com/2016/06/07/modern-document-libraries-in-sharepoint/
**](https://blogs.office.com/2016/06/07/modern-document-libraries-in-sharepoint/)**</IMPORTANT UPDATE>.**

&nbsp;

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb7.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image7.png)

&nbsp;

### How to apply?

Steps to apply this view:

&nbsp;

1\. Create JS file and upload in SharePoint

Ideally upload it with a solution (wsp) to save it in 15 hive and keep good performance.

<script src="https://gist.github.com/jquintozamora/14905bc261f2d0e64112.js"></script>

2\. Set JS Link property in List View Web Part

We can use JSLink property included in SharePoint 2013 List View Web Parts

- Create a new Standard view

- Edit main page of the view

- Edit XSLTListViewWebPart properties

- Set JS Link property as “~sitecollection/_catalogs/masterpage/OurSolution/CSRFile.js”

- Save

- Enjoy!!

&nbsp;

&nbsp;

References:

- [https://blog.josequinto.com/2014/06/24/customize-date-field-style-css-javascript-using-client-side-rendering-in-sharepoint-2013/](https://blog.josequinto.com/2014/06/24/customize-date-field-style-css-javascript-using-client-side-rendering-in-sharepoint-2013/ "https://blog.josequinto.com/2014/06/24/customize-date-field-style-css-javascript-using-client-side-rendering-in-sharepoint-2013/")

- SharePoint 2013 – OWA Server 2013 “To start seeing previews, please log on by opening the document.”: [http://chrishattonnzlsp.wordpress.com/2014/05/16/sharepoint-2013-owa-server-2013-to-start-seeing-previews-please-log-on-by-opening-the-document/](http://chrishattonnzlsp.wordpress.com/2014/05/16/sharepoint-2013-owa-server-2013-to-start-seeing-previews-please-log-on-by-opening-the-document/ "http://chrishattonnzlsp.wordpress.com/2014/05/16/sharepoint-2013-owa-server-2013-to-start-seeing-previews-please-log-on-by-opening-the-document/")

&nbsp;

&nbsp;

HTH

JQ

@jquintozamora