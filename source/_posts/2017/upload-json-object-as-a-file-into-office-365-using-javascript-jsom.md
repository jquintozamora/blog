---
layout: post
title: Upload JSON Object as a File into Office 365 using JavaScript (JSOM)
language: English
permalink: upload-json-object-as-a-file-into-office-365-using-javascript-jsom
id: 902
categories:
  - How-To
  - Quick-Note
  - Code-Reminder
tags:
  - javascript
  - JSOM
  - Office 365
date: 2017-03-03 13:11:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
This post is intended to explain how to **convert** and upload a **JSON Object** into a SharePoint library using **JavaScript Client Object Model**.

That approach will be valid using the code inside a SharePoint Web Part, will not be valid for SP Apps or JavaScript applications running outside of SharePoint context.

Here you can see the code:
<script src="https://gist.github.com/jquintozamora/9c64c12df47f151ff5e998e0e6dfba34.js"></script> 

## Browser Coverage
I tested it in **Chrome 56** and **Internet Explorer 11** and it worked.

## Read more...
> **IMPORTANT**: 
> If you want to upload other kind of documents (more that 2 MB). Then I recommend you take a look to this post: [http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/](http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/ "http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/") from my colleague [Kev](https://twitter.com/BeckettKev). 

Please, write a comment if that's not working in your specific scenario!
