---
title: Relocate the “Show More Posts” button in Newsfeed webpart of SharePoint 2013
tags:
  - English
url: 139.html
id: 139
categories:
  - Branding
  - CSS
  - Newsfeed
  - SharePoint 2013
date: 2014-06-23 13:34:18
---

When we are working on stylize of My Site Newsfeed or Site Feed Web Part in SharePoint 2013, probably we should remove “show more posts” button from below.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image3.png)

One solution, instead remove it, may be put it at the top (over title box).

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb4.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image4.png)

&nbsp;

The css code you need to use is:

<pre class="css">
/* Reallocate Show more post at top */
.ms-microfeed-seeMoreThreadsDivContainer
{
    position: absolute;
    top: -90px;
    right: 0px;
    left: auto;
}
.ms-microfeed-seeMoreThreadsDiv
{
    left: 0px;
}
</pre>

&nbsp;

&nbsp;

Hope that helps!

JQ

@jquintozamora