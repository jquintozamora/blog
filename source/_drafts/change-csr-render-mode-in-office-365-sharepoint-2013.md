---
title: Change CSR Render Mode in Office 365 / SharEPoint 2013
tags:
  - English
url: 509.html
id: 509
categories:
  - client side rendering
  - JSLink
  - Office 365
date: 2016-01-04 17:33:42
---

Hi there,

After SharePoint 2013 was introduced a new feature called Client Side Rendering ([here a good overview](http://www.codeproject.com/Articles/620110/SharePoint-Client-Side-Rendering-List-Views)). 

Using Client Side Rendering and JSLink, probably we have found something called CSR Render Mode, you can see in the above image:

[![image](https://blog.josequinto.com/wp-content/uploads/2016/01/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/01/image.png)

Server Render falls back to XSLT, while Standard and Custom are based on CSR.

There is a good article about the difference between these three methods: [http://www.codeproject.com/Articles/610259/SharePoint-Client-Side-Rendering-List-Forms](http://www.codeproject.com/Articles/610259/SharePoint-Client-Side-Rendering-List-Forms "http://www.codeproject.com/Articles/610259/SharePoint-Client-Side-Rendering-List-Forms")

Anyway, in this blog blog we will see how to change CSR Render Mode.

&nbsp;

### Change CSR Render Mode

It is important to know:

- **CSR Render Mode **is a feature** only available** in **ListFormWebPart** but **not in XsltListViewWebPart**. 

- Inside a custom list we have four OOTB pages: <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/01/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/01/clip_image001.png) <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By default the webpart we have in every page are: <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **ListFormWebPart** <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DispForm.aspx <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EditForm.aspx <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NewForm.aspx <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **XsltListViewWebPart** <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AllItems.aspx <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Custom views <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We can see this information putting ?Contents=1 in the pages or&nbsp; /_layouts/15/spcontnt.aspx?&url=<page url> <p>&nbsp; <p>So, if we want tha see and change the dropdown list to change CSR Render Mode, we need to edit the right page: DispForm, EditForm, NewForm or whatever page with ListFormWebPart. <p>&nbsp; <p>HTH&nbsp; <p>[@jquintozamora](https://twitter.com/jquintozamora)