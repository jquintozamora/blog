---
title: Change Site Contents Style in SharePoint 2013
tags:
  - English
url: 311.html
id: 311
categories:
  - CSS
  - SharePoint 2013
  - Style
date: 2014-11-24 09:31:08
---

SharePoint 2013 was redesigned thinking in metro style, that’s good for some things but this shouldn’t apply to all. For example, viewlsts.aspx page or Site Contents is used to see quickly all libraries and lists with its modified date and number of items.

With the new design it is impossible to see this information “quickly”, because you have big tiles with big scroll:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb8.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image8.png)

&nbsp;

**End users are really unhappy with that.**

In this post, I will show how to return to 2010 styles by using list of elements instead using grid as a presentation technique.

&nbsp;

This is quite straightforward, but we need to add our custom css in a separate file (never overwrite OOB css files).

So the steps will be:

1- Create our custom CSS, including this code:
<script src="https://gist.github.com/jquintozamora/8320ed4a973234312bc00bdf5c3ad8bc.js"></script>
&nbsp;

2- Create Custom Master page and add a reference to the css file

3- Create a Deploy Package in order to deploy these changes in PROD (this is optional but recommendable).

4- This is the final aspect:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb9.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image9.png)

&nbsp;

&nbsp;

&nbsp;

/*******************************

Update December 2014

*******************************/

The ideal solution to deploy, as always, with a feature

We can create Empty SharePoint 2013 project, and add new Feature, new mapped layout for the css and new CustomAction to add the Css reference:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/12/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/12/image2.png)

&nbsp;

Feature:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/12/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/12/image3.png)

&nbsp;

Layouts file for the css will contain the above code.

&nbsp;

Elements.xml file:

&nbsp;
<script src="https://gist.github.com/jquintozamora/a976a55d4c9415c0b60c4818b9e01c2f.js"></script>
&nbsp;

&nbsp;

&nbsp;

Regards!

HTH

@jquintozamora