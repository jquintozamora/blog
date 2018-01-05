---
layout: post
title: Change Site Contents Style in SharePoint 2013
language: English
permalink: change-site-contents-style-in-sharepoint-2013
id: 311
categories:
  - Code-Reminder
tags:
  - CSS
  - SharePoint 2013
  - Style
date: 2014-11-24 09:31:08
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
**SharePoint 2013** was redesigned thinking in **metro** style, that’s good for some things but this shouldn’t apply to all. For example, `viewlsts.aspx` page or **Site Contents** is used to see quickly all libraries and lists with its modified date and number of items.

With the new design it is impossible to see this information “quickly”, because you have big tiles with big scroll:

![image](./image8.png)

**End users are really unhappy with that.**

## Solution
In this post, I will show how to return to **2010 styles** by using list of elements instead using grid as a presentation technique.


This is quite straightforward, but we need to add our custom css in a separate file (never overwrite OOB css files).

So the steps will be:

1. Create our custom CSS, including this code:
  <script src="https://gist.github.com/jquintozamora/8320ed4a973234312bc00bdf5c3ad8bc.js"></script>

2. Create Custom Master page and add a reference to the css file

3. Create a Deploy Package in order to deploy these changes in PROD (this is optional but recommendable).

4. This is the final aspect:
  ![image](./image9.png)

&nbsp;

## Update December 2014
The ideal solution to deploy, as always, with a feature

1. We can create Empty SharePoint 2013 project, and add new Feature, new mapped layout for the css and new CustomAction to add the Css reference:
  ![image](./image2.png)

2. Feature:
  ![image](./image3.png)

3. Layouts file for the css will contain the above code.

4. Elements.xml file:
  <script src="https://gist.github.com/jquintozamora/a976a55d4c9415c0b60c4818b9e01c2f.js"></script>
