---
title: Enable Azure Invocation Log at Web Job function Level for PnP Provisioning
tags:
  - English
url: 886.html
id: 886
categories:
  - Azure
  - log
  - PnP
date: 2017-02-16 17:01:38
---

Hi,

Few months ago I posted about [enabling log and trace information for PnP Core Provisioning when using Console Application](https://blog.josequinto.com/2016/08/02/enable-log-and-trace-information-for-pnp-core-provisioning-when-using-console-application/). 

Recently, I have been working in several projects with PnP Partner Pack Provisioning and some custom Web Jobs using PnP Core Provisioning bits as well. And there is one annoying thing in common, not having PnP Provisioning Logs!! So, sometimes we are blind and we don’t exactly know what is going on with the Site Creation.

This post is about Enable PnP Provisioning Invocation or Function Logs when using your custom Web Job or using PnP Partner Pack.

When I mention Invocation / Function Logs that is what I mean:

[![image](https://blog.josequinto.com/wp-content/uploads/2017/02/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/02/image.png)

**Note: In order to enable these logs, you should configure AzureWebJobsDashboard setting in the Azure Web App settings. IMPORTANT, it need to be in the UI, is not valid to have it on web.config only.**

[![image](https://blog.josequinto.com/wp-content/uploads/2017/02/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/02/image-1.png)

In my opinion it is important enable logs at this level because:

- **Invocation-Scoped Log**. Evey Site Creation will have its own log.

- **One URI per log **as well in the format: https://<webapp>,azurewebsites.net/azurejobs/api/logs/output/<invocationguid> 

Let’s see how to configure it.

### First Step. Configure app.config / web.config
<script src="https://gist.github.com/jquintozamora/9d084182708814a78435e79ec1f7077c.js"></script> 

&nbsp;

### Second Step. Link TextWriter log with Trace

Create a new custom TextWriterTraceListener using TextWriter log (ProcessQueueMessage one)&nbsp; and connect it to Trace listener previously configured. 

I highly recommends to add the curstom TraceFilter as well because a side effect of enable all Trace events is that we will be receiving tons of TokenCache and AcquireTokenHandlerBase Information logs and these will be annoying. In fact, it will be difficult to find the PnP logs among these ones:

“_OfficeDevPnP.PartnerPack.ContinousJob.exe Information: 0 : 02/16/2017 14:50:11: ab5a77a1-c3d7-4211-9f8b-22d3915163ae - AcquireTokenHandlerBase: === Token Acquisition finished successfully. An access token was retuned:
&nbsp;&nbsp;&nbsp; Access Token Hash: sdsdfsdffdgsfgsfgsd=
&nbsp;&nbsp;&nbsp; Refresh Token Hash: [No Refresh Token]
&nbsp;&nbsp;&nbsp; Expiration Time: 02/16/2017 15:48:46 +00:00
&nbsp;&nbsp;&nbsp; User Hash: null_”

_“[02/16/2017 16:10:11 > 5a8bde: INFO] OfficeDevPnP.PartnerPack.ContinousJob.exe Information: 0 : 02/16/2017 16:10:11: 9f72b853-367c-41a8-ac9a-d38a7a3f861c - TokenCache: An item matching the requested resource was found in the cache”_

So, in the below code you can see how to create custom RemoveWordsFilter and how to use it in the TextWriterTraceListener obejct.
<script src="https://gist.github.com/jquintozamora/e2e4c145905af47698efdfc296af511e.js"></script> 

&nbsp;

These are the results:

[![image](https://blog.josequinto.com/wp-content/uploads/2017/02/image_thumb-2.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/02/image-2.png)

That’s all. Enjoy it!

[@jquintozamora](https://twitter.com/jquintozamora)