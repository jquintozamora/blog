---
title: >-
  SharePoint Online PowerShell problem: Cannot convert the
  "Microsoft.SharePoint.Client.ClientContext"
tags:
  - English
url: 599.html
id: 599
categories:
  - Office 365
  - PowerShell
date: 2016-01-26 16:01:00
---

Hi, 

When we are doing a SharePoint deployment using PowerShell there we could find similar problem like that:
 > **Cannot convert the "Microsoft.SharePoint.Client.ClientContext" value of type "Microsoft.SharePoint.Client.ClientContext" to type "Microsoft.SharePoint.Client.ClientRuntimeContext"."** 

In my scenario I was trying to Activate a Sandboxed solution using PowerShell:
<pre class="ps">$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl);
$credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($adminUsername, $secureAdminPassword);
$ctx.Credentials = $credentials

[Microsoft.SharePoint.Client.Publishing.DesignPackage]::Install($ctx, $ctx.Site, $wsp, $filerelativeurl);</pre>

And I received the error mentioned before. I did some checks: 
<p>- Run as administrator 
<p>- Run using SharePoint Online PowerShell command line. 
<p>- Check I have installed Client Components. 

## Solution

<p>But after some investigations, the reason is the version of SharePoint Client Components and SharePoint Online Management Shell I was using. 
<p>[![image](https://blog.josequinto.com/wp-content/uploads/2016/01/image_thumb-13.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/01/image-13.png)
<p>To solve it, Install latest version of them, uninstall previous verions and **restart Powershell console**.

&nbsp;

Regards!

[@jquintozamora](https://twitter.com/jquintozamora)