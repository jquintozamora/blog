---
title: >-
  Retrieve Static and Internal Field Names of a SharePoint List using JavaScript
  in Office 365
tags:
  - English
url: 478.html
id: 478
categories:
  - javascript
  - JSOM
  - Office 365
  - SharePoint 2013
date: 2015-12-08 17:52:52
---

Hi,

There are scenarios where we need to show and compare Internal and Static field names of a SharePoint list. 

For instance, if we want to do CAML query over some custom fields, but we don’t remember exactly the Internal Name of the field, we can use this code directly copied and pasted in the browser console to get all the names.

&nbsp;

Using JSOM or JavaScript Object Model, It is important the difference between get all fields directly from a list and get all view fields from a view.

**get_fields()** returns SP.FieldCollection object --- contains all SP.Field object properties > [https://msdn.microsoft.com/en-us/library/office/jj246815.aspx](https://msdn.microsoft.com/en-us/library/office/jj246815.aspx)

**get_viewFields()** returns SP.ViewFieldCollection object --- only field names (Internal Names), but not a SP.Field object > [https://msdn.microsoft.com/en-us/library/office/jj244841.aspx](https://msdn.microsoft.com/en-us/library/office/jj244841.aspx) 

&nbsp;

A little more information about the Object Model:

&nbsp; - SP.FieldCollection object: [https://msdn.microsoft.com/en-us/library/office/jj246909.aspx](https://msdn.microsoft.com/en-us/library/office/jj246909.aspx "https://msdn.microsoft.com/en-us/library/office/jj246909.aspx")
 > Represents a collection of [SP.Field](https://msdn.microsoft.com/en-us/library/office/jj246815.aspx) objects. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![image](https://blog.josequinto.com/wp-content/uploads/2015/12/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/12/image2.png)

&nbsp;

&nbsp; - SP.ViewFieldCollection Object: [https://msdn.microsoft.com/EN-US/library/office/jj244841.aspx](https://msdn.microsoft.com/EN-US/library/office/jj244841.aspx "https://msdn.microsoft.com/EN-US/library/office/jj244841.aspx")&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![image](https://blog.josequinto.com/wp-content/uploads/2015/12/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/12/image3.png)

&nbsp;

Anyway, this is the code to get all the field information:

&nbsp;
<script src="https://gist.github.com/jquintozamora/8774f1e6444209253d39.js"></script> 

&nbsp;

&nbsp;

HTH

@jquintozamora