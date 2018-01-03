---
layout: post
title: Using PowerShell To retrieve all Sites (Web Object) recursively from SharePoint Online
language: English
permalink: using-powershell-to-retrieve-all-sites-web-object-recursively-from-sharepoint-online
id: 615
categories:
  - How-To
  - Code-Reminder
tags:
  - CSOM
  - Office 365
  - PowerShell
  - SharePoint Online
date: 2016-03-17 17:45:49
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
When you deploy a solution for **SharePoint Online (SPO)**, sometimes, you need to apply some post – configurations and need to iterate through **all sites and sub-sites** in a given Site Collection. In general talking about Office 365, there is more frequent the use of PowerShell to solve some kind of processes automation.

If you google about this topic, there are a lot of _ways_ to achieve this, from server code doing some `SPWeb.AllWebs` to some JavaScript code, but in this scenario I will do using **CSOM** (Client Side Object Model) and **PowerShell**. On this way, this method could be valid to use in SharePoint Online and SharePoint 2013 OnPrem.

## Code
I’d like to share a PowerShell function and script that uses “Recursion” to achieve this task:

<script src="https://gist.github.com/jquintozamora/fbb398e619ae32aab834.js"></script> 

> One important consideration is I assumed the **DLLS** are in a** subfolder called DLLs** in the same path the PowerShell script is.

## Download code
You can download the full script: [PS.IterateAllWebsRecursively.zip](./PS.IterateAllWebsRecursively.zip)
