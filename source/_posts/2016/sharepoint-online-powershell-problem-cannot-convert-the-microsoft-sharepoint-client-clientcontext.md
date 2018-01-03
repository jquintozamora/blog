---
layout: post
title: "SharePoint Online PowerShell problem: Cannot convert the `Microsoft.SharePoint.Client.ClientContext`"
language: English
permalink: sharepoint-online-powershell-problem-cannot-convert-the-microsoft-sharepoint-client-clientcontext
id: 599
categories:
  - Problem-Solution
tags:
  - Office 365
  - PowerShell
date: 2016-01-26 16:01:00
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
categories: 
  - Problem-Solution
---

## Introduction
When we are doing a **SharePoint deployment** using PowerShell there we could find similar problem like that:
 > **Cannot convert the "Microsoft.SharePoint.Client.ClientContext" value of type "Microsoft.SharePoint.Client.ClientContext" to type "Microsoft.SharePoint.Client.ClientRuntimeContext"."** 

## Problem
In my scenario I was trying to **Activate** a Sandboxed solution using PowerShell:

```ps
$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl);
$credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($adminUsername, $secureAdminPassword);
$ctx.Credentials = $credentials

[Microsoft.SharePoint.Client.Publishing.DesignPackage]::Install($ctx, $ctx.Site, $wsp, $filerelativeurl);
```

And I received the **error** mentioned before. I did some checks: 
- Run as administrator 
- Run using SharePoint Online PowerShell command line. 
- Check I have installed Client Components. 

## Solution
But after some investigations, the reason is the version of SharePoint Client Components and SharePoint Online Management Shell I was using. 
![image](./image-13.png)

To solve it, Install latest version of them, **uninstall previous versions** and **restart Powershell console**.
