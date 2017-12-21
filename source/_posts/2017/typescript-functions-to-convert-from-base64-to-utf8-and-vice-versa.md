---
layout: post
title: TypeScript functions to convert from Base64 to UTF8 and vice versa
language: English
permalink: typescript-functions-to-convert-from-base64-to-utf8-and-vice-versa
id: 907
categories:
  - javascript
  - TypeScript
date: 2017-03-08 18:19:58
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

Few days ago I wrote a post about [uploading JSON object using JavaScript](/2017/03/03/upload-json-object-as-a-file-into-office-365-using-javascript-jsom). There are some dependencies using this approach, which are b64EncodeUnicode and b64DecodeUnicode functions.

I’d like to share how to write these functions using TypeScript:
<script src="https://gist.github.com/jquintozamora/e40dd700df79e8e68a8becb5dee68154.js"></script> 
