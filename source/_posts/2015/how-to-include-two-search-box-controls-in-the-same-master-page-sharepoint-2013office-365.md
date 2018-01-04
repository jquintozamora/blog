---
layout: post
title: How to include two Search Box controls in the same master page - SharePoint 2013
language: English
permalink: how-to-include-two-search-box-controls-in-the-same-master-page-sharepoint-2013office-365
id: 414
categories:
  - Quick-Note
tags:
  - Search
  - SharePoint 2013
date: 2015-07-22 11:47:08
featuredImage: 
  url: featured.png 
  width: auto
  height: auto
---

## Introduction
Working with **SharePoint** is typical we have to do little **customizations** in **Branding**, so it is really helpful to understand and know the Out-of-the-box controls or webparts that SharePoint provides. That could be a good time saver to meet our requirements easily.

On this time, the requirement was to have two search controls in the same **master page**, one to find everything, other to find people.


Before SharePoint 2013, it was used the `SearchBoxEx` control, but with the Display Templates engine used in **SharePoint 2013**, there was included a new control named `SearchBoxScriptWebPart`.

You can see good description about these two controls and Display Templates, [here](http://www.eliostruyf.com/replacing-the-ootb-small-search-input-box-for-sharepoint-2013)

## Code
To achieve our goal and put two controls in the same **Master Page**, we can use this code:

<script src="https://gist.github.com/jquintozamora/ad047ab57c2895d3c02741a161b25d14.js"></script>

> Some important notes inside the code:
> - I roughly recommend to use `UseSiteCollectionSettings="true"` ONLY in one control. And in the other control use static links inside.
> - `InitialPrompt` text avoid to put the text using jQuery :D .
> - `UseSharedSettings="false"` will allow you to use custom Display Template and Results Page.
> - `RenderTemplateId` is useful to change completely the aspect, even it is needed to change GO Search icon. 
> - `ServerInitialRender="false"` will produce JS files and use Display Template engine, otherwise the control is rendered in the Server Side.
> - If you want to apply custom `RenderTemplateId` it is MANDATORY to have `ServerInitialRender="false"`.
> - `DefaultDropdownNodeId="1001"` is useful to set the default scope. 1001 – Search Everything, 1002 – Search People, …

## Read more...
- Branding the Search Box in SharePoint 2013: [http://www.eliostruyf.com/branding-the-search-box-in-sharepoint-2013/](http://www.eliostruyf.com/branding-the-search-box-in-sharepoint-2013)
- SearchBoxScriptWebPart properties: [https://msdn.microsoft.com/en-us/library/microsoft.office.server.search.webcontrols.searchboxscriptwebpart_properties.aspx](https://msdn.microsoft.com/en-us/library/microsoft.office.server.search.webcontrols.searchboxscriptwebpart_properties.aspx)
