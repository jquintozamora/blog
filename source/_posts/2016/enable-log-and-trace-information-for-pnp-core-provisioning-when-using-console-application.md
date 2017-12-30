---
layout: post
title: Enable Log and Trace information for PnP Core Provisioning when using Console Application
language: English
permalink: enable-log-and-trace-information-for-pnp-core-provisioning-when-using-console-application
id: 790
categories:
  - log
  - PnP
  - Provisioning
  - trace
date: 2016-08-02 14:06:20
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
Looking into [PnP Provisioning](https://github.com/OfficeDev/PnP-Sites-Core) I noticed there isn’t configuration to set up proper log and trace information (version **v2.4.1605). **

If you haven’t chance to look into PnP Core solution, and you want to know how to start, take a look here: [Office 365 PnP Provisioning starting point](https://blog.josequinto.com/2016/07/11/office-365-pnp-provisioning-hide-default-title-column-and-enable-menu-for-other-custom-text-column/ "https://blog.josequinto.com/2016/07/11/office-365-pnp-provisioning-hide-default-title-column-and-enable-menu-for-other-custom-text-column/").

Anyway, if you’d like to add some extended information about what is happening internally when we are provisioning some **site templates**, we can achieve it following these steps:

## Configuring Log
In _app.config_ (console application) just add these xml inside `configuration` element.

<script src="https://gist.github.com/jquintozamora/9d084182708814a78435e79ec1f7077c.js"></script>

Including that enables **Event viewer** information to be displayed directly in the console:

[![image](./image.png "image")](./image.png)

> **IMPORTANT**: you can enable this extended information on Azure WebJobs too. Just copy the xml at the end of app.config.

## Usage in our Console App
Now, if we also want to log all the Console App information into a file, we should add this code to our main:
<script src="https://gist.github.com/jquintozamora/406402e01b65cb29b244e5ff26fc909a.js"></script>

> Note: Remember we should then use Trace.WriteLine instead Console,WriteLine in our program.

```ps
Trace.WriteLine("");
Trace.WriteLine("Press enter to exit…");
```

That will **create a .log** file including the same text and information we see in the console app screen.
