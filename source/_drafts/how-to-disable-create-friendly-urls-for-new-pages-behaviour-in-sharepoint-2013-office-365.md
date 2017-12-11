---
title: >-
  How to disable Creating Friendly URLs for New Pages behaviour in SharePoint
  2013 / Office 365 using JSOM
tags:
  - English
url: 470.html
id: 470
categories:
  - Navigation
  - Office 365
date: 2015-12-07 16:18:49
---

Hi,

Today I was trying to apply a filter in a Search Result Web Part in order to display items that match only with a specific content type and belonging to a specific sub site. 

It was annoying to me that the property Path neither the property ParentLink worked as expected. As many times, the search engine just returned 0 results.

This was the filter used in Query Tool: **Path:{Site.URL}**

Talking with my friend [Ben](https://twitter.com/BenCernuda) about the scenario we are trying to figure out why. Finally we noticed that OOB in SharePoint, when create a new Publishing Site Collection or Enterprise Wiki Site Collection (or cutsom WT inheriting in these), automatically the Manage Navigation is configured and with this one "Create friendly URLs for new pages automatically" option.

Navigation by default enables the options:  <p>[![image](https://blog.josequinto.com/wp-content/uploads/2015/12/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/12/image1.png)  <p>So, If you are in the scenario in which you need to do some filter using Site-scoped pages or do you prefer not enable the friendly urls in your sites, then you should disable the Create friendly urls option.  <p>&nbsp; <p>For now, there is no way to solve this in a declarative way (using XML files or Onet.xml configuration). So, to solve that we are going to apply some **JSOM (JavaScript) **code to configure it accordingly.  <p>&nbsp; <p>We should use this object in JSOM classes:  > <p>SP.Publishing.Navigation.**WebNavigationSettings**: [https://msdn.microsoft.com/en-us/library/office/jj994744.aspx](https://msdn.microsoft.com/en-us/library/office/jj994744.aspx)  <p>&nbsp; <p>The exact method is: > SP.Publishing.Navigation.WebNavigationSettings.**set_createFriendlyUrlsForNewPages**(value) 

&nbsp; <p>This is the code to disable the Create Friendly URLs for New Pages behaviour:  <p>&nbsp;
<script src="https://gist.github.com/jquintozamora/f98af80d59bbc7004d0c.js"></script> 

&nbsp;

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)