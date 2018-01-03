---
layout: post
title: Using PowerShell to Add WebPart to SharePoint Page via CSOM in Office 365
language: English
permalink: using-powershell-to-add-webpart-to-sharepoint-page-via-csom-in-office-365
id: 609
categories:
  - How-To
  - Code-Reminder
tags:
  - CSOM
  - Office 365
  - PowerShell
  - SharePoint Online
date: 2016-02-16 13:07:30
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction 
This time, I was supposed to add a **webpart** to SharePoint Online page **programmatically**. 

It depends on our requirements, but we could use **JavaScript** or other **Client Object Model libraries** to add a web part to SharePoint page. My advice is, even if your requirements guide you to write **PowerShell script**, try to use Client Object Model instead Server Object Model, whenever possible.

## Code
Let’s share the code to add a `Content Editor webpart` to a **SharePoint page**:
<script src="https://gist.github.com/jquintozamora/cbb69be3dd39208749ca.js"></script> 

## Good to know
While I was developing this program, I found a problem with the format of XML. Specifically this problem:
 > The file you imported is not valid. Verify that the file is a Web Part description file (*.webpart or *.dwp) and that it contains well-formed XML. `$wp = $webpartManager.ImportWebPart($WebPartXml.OuterXml)`

Using **PowerShell** is really important consider the **type of the variables** we are using, in my case I was trying to `ImportWebPart` using a PowerShell variable called `$WebPartXml`, but the real XML object (as string) that `ImportWebPart` function expects is `$WebPartXml.OuterXml`.

## Credits
Lot of thanks to my friend [Benja](https://twitter.com/BenCernuda) for helping on that!