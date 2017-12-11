---
title: >-
  Create WebTemplate based on Community features on SharePoint 2013 or Office
  365
tags:
  - English
url: 451.html
id: 451
categories:
  - Office 365
  - Provisioning
  - WebTemplate
date: 2015-10-26 15:46:36
---

Hi,

On this post we will show how to use classical XML Feature provisioning approach to create a WebTemplate using Community Features.&nbsp; 

As we already know, Microsoft recommends to use code provisioning approach rather than Feature XML technique in Office 365, even if using WebTemplate element in Office 365 is still 100% supported. 

If you want to read more about provisioning techniques, remote provisioning, etc. you can read:
 > Chris O’Brien post: [http://www.sharepointnutsandbolts.com/2015/01/custom-master-pages-and-web-templates-in-office-365--thoughts.html](http://www.sharepointnutsandbolts.com/2015/01/custom-master-pages-and-web-templates-in-office-365--thoughts.html "http://www.sharepointnutsandbolts.com/2015/01/custom-master-pages-and-web-templates-in-office-365--thoughts.html")
> 
> Vesa post: [http://blogs.msdn.com/b/vesku/archive/2013/08/23/site-provisioning-techniques-and-remote-provisioning-in-sharepoint-2013.aspx](http://blogs.msdn.com/b/vesku/archive/2013/08/23/site-provisioning-techniques-and-remote-provisioning-in-sharepoint-2013.aspx "http://blogs.msdn.com/b/vesku/archive/2013/08/23/site-provisioning-techniques-and-remote-provisioning-in-sharepoint-2013.aspx") 

Anyway, if you solution requires to use elements.xml inside Sandboxed solutions, this post will show you how to create a simple Site Template using Community Template as a basis.

&nbsp;

First of all, create Visual Studio project and Add a new Module (or empty element). 

Create Elements.xml and onet.xml inside the module. A new feature will be created to deploy this module, if isn’t, just create a new site-scoped feature and include this item.

[![image](https://blog.josequinto.com/wp-content/uploads/2015/10/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/10/image.png)

&nbsp;

Let’s show the code for Elements.xml and onet.xml files.

&nbsp;

Elements.xml
<script src="https://gist.github.com/jquintozamora/532e2f2c91efc10d404b.js"></script> 

Onet.xml
<script src="https://gist.github.com/jquintozamora/12214326646e031d9b11.js"></script> 

&nbsp;

&nbsp;

With the above code, we can create new Sites using our custom template. Let’s have some considerations about the code:

-&nbsp; WebTemplate file shoud point to **COMMUNITY BaseTemplateName.** Important: Without #0 ,,, it is added by SharePoint later.

- It is really important to add **NavBars** element, otherwise we can get this error:
 > System.NullReferenceException: Object reference not set to an instance of an object.  <p>at Microsoft.SharePoint.Portal.CommunitySiteFeatureReceiver.CustomizeQuickLaunch(SPWeb web)  <p>at Microsoft.SharePoint.Portal.CommunitySiteFeatureReceiver.FeatureActivated(SPFeatureReceiverProperties properties)  <p>at Microsoft.SharePoint.SPFeature.DoActivationCallout(Boolean fActivate, Boolean fForce)  <p>at Microsoft.SharePoint.SPFeature.Activate(SPSite siteParent, SPWeb webParent, SPFeaturePropertyCollection props, SPFeatureActivateFlags activateFlags, Boolean fForce) 

- When enabling Publishing Features using Community template as a base, the **WelcomePageUrl** property doesn't works, it is setup with **JSOM** <script src="https://gist.github.com/jquintozamora/c9a853a9096cc8023914.js"></script> <p>&nbsp;

Hope that helps. 

Thanks [Vard](https://twitter.com/vrdmn) helping on that.

&nbsp;

Regards!

JQ

[@jquintozamora](https://twitter.com/jquintozamora)