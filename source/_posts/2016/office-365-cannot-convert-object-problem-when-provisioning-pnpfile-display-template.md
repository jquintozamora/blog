---
layout: post
title: Office 365. Cannot Convert Object Problem when provisioning pnp:File Display Template
language: English
permalink: office-365-cannot-convert-object-problem-when-provisioning-pnpfile-display-template
id: 765
categories:
  - Problem-Solution
tags:
  - Office 365
  - PnP
date: 2016-06-14 18:01:51
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
When we are using PnP Provisioning Core Engine to deploy SharePoint artifacts, we probably need to deploy Display Templates.

My colleague Kevin posted this blog post about this: [http://sharepointcookies.com/2015/07/working-with-display-templates-with-the-new-pnp-provisioning-core-engine/](http://sharepointcookies.com/2015/07/working-with-display-templates-with-the-new-pnp-provisioning-core-engine).

## Problem
But, some changes has been done in the PnP Provisioning Code and we need to adjust a little bit the code.

I am using PnP Version (v2.4.1605):

[![image](./image.png "image")](./image.png)

&nbsp;

Here is the **error** received when I tried to provision Display Templates:

```
Cannot convert object of type 'System.Int32' to type 'System.String[]'
at System.Web.Script.Serialization.ObjectConverter.ConvertObjectToTypeInternal(Object o, Type type, JavaScriptSerializer serializer, Boolean throwOnError, Object& convertedObject)  
at System.Web.Script.Serialization.ObjectConverter.ConvertObjectToTypeMain(Object o, Type type, JavaScriptSerializer serializer, Boolean throwOnError, Object& convertedObject)  
at System.Web.Script.Serialization.JavaScriptSerializer.Deserialize(JavaScriptSerializer serializer, String input, Type type, Int32 depthLimit)  
at System.Web.Script.Serialization.JavaScriptSerializer.Deserialize[T](String input)  
at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.ObjectFiles.SetFileProperties(File file, IDictionary`2 properties, Boolean checkoutIfRequired)  
at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.ObjectFiles.ProvisionObjects(Web web, ProvisioningTemplate template, TokenParser parser, ProvisioningTemplateApplyingInformation applyingInformation)  
at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.SiteToTemplateConversion.ApplyRemoteTemplate(Web web, ProvisioningTemplate template, ProvisioningTemplateApplyingInformation provisioningInfo)  
at Microsoft.SharePoint.Client.WebExtensions.ApplyProvisioningTemplate(Web web, ProvisioningTemplate template, ProvisioningTemplateApplyingInformation applyingInformation)  
```

[![clip_image001](./clip_image001.png "clip_image001")](./clip_image001.png)  

&nbsp;

## Solution

<script src="https://gist.github.com/jquintozamora/29a288cd94f074446d999a5bd3d57c25.js"></script> 

Note that the problem where two properties: **UIVersion** and **TargetControlType** and the workaround was to wrap them **into string array**.
