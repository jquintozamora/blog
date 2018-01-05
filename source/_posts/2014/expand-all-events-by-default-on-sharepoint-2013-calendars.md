---
layout: post
title: Expand all events by default on SharePoint 2013 Calendars
language: English
permalink: expand-all-events-by-default-on-sharepoint-2013-calendars
id: 317
categories:
  - Code-Reminder
tags:
  - SharePoint 2013
  - Calendar
date: 2014-12-01 18:47:51
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
I’m very **upset** with current available configurations in **SharePoint calendars**. By design, SharePoint 2013 calendars **only displays 3 events at maximum**, and the others events are hidden behind “# more items” tag:

![image](./image.png)


## Code
The best approach I found was **to call every more items element** by querying all of them:

<script src="https://gist.github.com/jquintozamora/10822eb275c5d85d6000cee17dc0f28f.js"></script>

## Notes
Some considerations in this code:
- It is really important to call our JS function after `SP.UI.ApplicationPages.Calendar.js`, **otherwise it won’t have effect.

## Final result
![image](./image1.png)
