---
title: How to add Go Back link to My Site in SharePoint 2013 using PowerShell
tags:
  - English
permalink: how-to-add-go-back-link-to-my-site/
id: 81
categories:
  - SharePoint
date: 2014-04-02 16:32:28
---

We can use this PowerShell script to change SuiteBarBrandingElementHtml:

&nbsp;
<pre class="ps">
#Web App url
$WebAppUrl = [https://mysite](https://mysite);
$Text = "Go to Intranet";
$newTopURL = "https://intranet";
$webApp = Get-SPWebApplication $WebAppUrl;
$html = "<div class='ms-core-brandingText'>[" + $Text + "]($newTopURL)</div>";
$webApp.SuiteBarBrandingElementHtml = $html;
$webApp.Update();
</pre>
&nbsp;

References:
> [http://www.wictorwilen.se/sharepoint-2013-central-administration-productivity-tip](http://www.wictorwilen.se/sharepoint-2013-central-administration-productivity-tip "http://www.wictorwilen.se/sharepoint-2013-central-administration-productivity-tip")
&nbsp;

Hope that helps!

JQ