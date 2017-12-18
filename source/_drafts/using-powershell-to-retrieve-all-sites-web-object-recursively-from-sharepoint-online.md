---
title: >-
  Using PowerShell To retrieve all Sites (Web Object) recursively from
  SharePoint Online
tags:
  - English
url: 615.html
id: 615
categories:
  - CSOM
  - Office 365
  - PowerShell
  - SharePoint Online
date: 2016-03-17 17:45:49
---

Hi there,

When you deploy a solution in SharePoint Online (SPO) sometimes, you need to apply some post – configurations and need to iterate thru all sites and sub-sites in a given Site Collection. In general talking about Office 365, there is more frequent the use of PowerShell to solve some kind of processes automation.

If you google about this topic, there are a lot of ways to achieve this, from server code doing some SPWeb.AllWebs to some JavaScript code, but in this scenario I will do using CSOM (Client Side Object Model) and PowerShell. On this way, this method could be valid to use in SharePoint Online and SharePoint 2013 OnPrem.

I’d like to share a PowerShell function and script that uses “Recursion” to achieve this task:

&nbsp;
<script src="https://gist.github.com/jquintozamora/fbb398e619ae32aab834.js"></script> 

One important consideration is I assumed the **DLLS** are in a** subfolder called DLLs** in the same path the PowerShell script is.

You can download the full script: [PS.IterateAllWebsRecursively.zip](https://blog.josequinto.com/wp-content/uploads/2016/03/PS.IterateAllWebsRecursively.zip "https://blog.josequinto.com/wp-content/uploads/2016/03/PS.IterateAllWebsRecursively.zip")

HTH

[@jquintozamora](https://twitter.com/jquintozamora)