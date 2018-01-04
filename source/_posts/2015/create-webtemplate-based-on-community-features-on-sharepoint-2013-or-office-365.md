---
title: Create WebTemplate based on Community features on SharePoint 2013 or Office 365
language: English
permalink: create-webtemplate-based-on-community-features-on-sharepoint-2013-or-office-365
id: 451
categories:
  - Code-Reminder
tags:
  - Office 365
  - Provisioning
  - WebTemplate
date: 2015-10-26 15:46:36
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
On this post we will show how to use **classical XML Feature** provisioning approach to create a WebTemplate using Community Features.

As we already know, **Microsoft recommends** to use code provisioning approach rather than **Feature XML technique** in Office 365, even if using `WebTemplate` element in Office 365 is still 100% supported. 

### More info...
If you want to read more about **provisioning techniques**, remote provisioning, etc. you can read:
1. Chris O’Brien [post](http://www.sharepointnutsandbolts.com/2015/01/custom-master-pages-and-web-templates-in-office-365--thoughts.html)
2. Vesa [post](http://blogs.msdn.com/b/vesku/archive/2013/08/23/site-provisioning-techniques-and-remote-provisioning-in-sharepoint-2013.aspx) 

Anyway, if you solution requires to use `elements.xml` inside **Sandboxed solutions**, this post will show you how to create a simple Site Template using **Community Template** as a basis.

## Click trough

1. First of all, create Visual Studio project and Add a new `Module` (or empty element). 

2. Create `Elements.xml` and `onet.xml` inside the module. A new feature will be created to deploy this module, if isn’t, just create a new site-scoped feature and include this item.

  ![image](./image.png)

  `Elements.xml`
  <script src="https://gist.github.com/jquintozamora/532e2f2c91efc10d404b.js"></script> 

  `Onet.xml`
  <script src="https://gist.github.com/jquintozamora/12214326646e031d9b11.js"></script> 

3. With the above code, we can create new `Sites` using our custom template. Let’s have some considerations about the code:

- WebTemplate file should point to **COMMUNITY BaseTemplateName.** 
> Important: Without #0 ,,, it is added by SharePoint later.

- It is really important to add **NavBars** element, otherwise we can get this error:
  ```
  System.NullReferenceException: Object reference not set to an instance of an object.  
  at Microsoft.SharePoint.Portal.CommunitySiteFeatureReceiver.CustomizeQuickLaunch(SPWeb web)  
  at Microsoft.SharePoint.Portal.CommunitySiteFeatureReceiver.FeatureActivated(SPFeatureReceiverProperties properties)  
  at Microsoft.SharePoint.SPFeature.DoActivationCallout(Boolean fActivate, Boolean fForce)  
  at Microsoft.SharePoint.SPFeature.Activate(SPSite siteParent, SPWeb webParent, SPFeaturePropertyCollection props, SPFeatureActivateFlags activateFlags, Boolean fForce) 
  ```
- When enabling Publishing Features using Community template as a base, the **WelcomePageUrl** property doesn't works, as a workaround we can setup with **JSOM** 
<script src="https://gist.github.com/jquintozamora/c9a853a9096cc8023914.js"></script> 
