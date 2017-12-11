---
title: >-
  Office 365. Cannot Convert OBject Problem when provisioning pnp:File Display
  Template
tags:
  - English
url: 765.html
id: 765
categories:
  - Office 365
  - PnP
date: 2016-06-14 18:01:51
---

When we are using PnP Provisioning Core Engine to deploy SharePoint artefacts, we probably need to deploy Display Templates.

My colleague Kevin posted this blog post about this: [http://sharepointcookies.com/2015/07/working-with-display-templates-with-the-new-pnp-provisioning-core-engine/](http://sharepointcookies.com/2015/07/working-with-display-templates-with-the-new-pnp-provisioning-core-engine/ "http://sharepointcookies.com/2015/07/working-with-display-templates-with-the-new-pnp-provisioning-core-engine/").

But, some changes has been done in the PnP Provisioning Code and we need to adjust a little bit the code.

I am using PnP Version (v2.4.1605):

[![image](https://blog.josequinto.com/wp-content/uploads/2016/06/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/06/image.png)

&nbsp;

Here is the **error** received when I tried to provision Display Templates:

**Cannot convert object of type 'System.Int32' to type 'System.String[]'**  <p>at System.Web.Script.Serialization.ObjectConverter.ConvertObjectToTypeInternal(Object o, Type type, JavaScriptSerializer serializer, Boolean throwOnError, Object& convertedObject)  <p>at System.Web.Script.Serialization.ObjectConverter.ConvertObjectToTypeMain(Object o, Type type, JavaScriptSerializer serializer, Boolean throwOnError, Object& convertedObject)  <p>at System.Web.Script.Serialization.JavaScriptSerializer.Deserialize(JavaScriptSerializer serializer, String input, Type type, Int32 depthLimit)  <p>at System.Web.Script.Serialization.JavaScriptSerializer.Deserialize[T](String input)  <p>at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.ObjectFiles.SetFileProperties(File file, IDictionary`2 properties, Boolean checkoutIfRequired)  <p>at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.ObjectFiles.ProvisionObjects(Web web, ProvisioningTemplate template, TokenParser parser, ProvisioningTemplateApplyingInformation applyingInformation)  <p>at OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers.SiteToTemplateConversion.ApplyRemoteTemplate(Web web, ProvisioningTemplate template, ProvisioningTemplateApplyingInformation provisioningInfo)  <p>at Microsoft.SharePoint.Client.WebExtensions.ApplyProvisioningTemplate(Web web, ProvisioningTemplate template, ProvisioningTemplateApplyingInformation applyingInformation)  <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/06/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/06/clip_image001.png)  <p>&nbsp;
<script src="https://gist.github.com/jquintozamora/29a288cd94f074446d999a5bd3d57c25.js"></script> 

&nbsp;

Note that the problem where two properties: **UIVersion** and **TargetControlType** and the workaround was to wrap them **into string array**.

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)