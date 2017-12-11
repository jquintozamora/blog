---
title: Expand all events by default on SharePoint 2013 Calendars
tags:
  - English
url: 317.html
id: 317
categories:
  - SharePoint 2013
date: 2014-12-01 18:47:51
---

Hi,

I’m very upset with current available configurations in SharePoint calendars. By design, SharePoint 2013 calendars only displays 3 events at maximum, and the others events are hidden behind “# more items” tag:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/12/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/12/image.png)

&nbsp;

&nbsp;

The best approach I found was call every more items element by querying all of them:

&nbsp;

<script src="https://gist.github.com/jquintozamora/10822eb275c5d85d6000cee17dc0f28f.js"></script>

Some considerations in this code:

- It is really important to call our JS function after **SP.UI.ApplicationPages.Calendar.js, **otherwise it won’t have effect.

&nbsp;

The final result:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/12/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/12/image1.png)

&nbsp;

Enjoy!

&nbsp;

HTH

@jquintozamora