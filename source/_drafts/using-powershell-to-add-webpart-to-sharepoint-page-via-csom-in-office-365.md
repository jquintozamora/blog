---
title: Using PowerShell to Add WebPart to SharePoint Page via CSOM in Office 365
tags:
  - English
url: 609.html
id: 609
categories:
  - CSOM
  - Office 365
  - PowerShell
  - SharePoint Online
date: 2016-02-16 13:07:30
---

Hi,

This time, I was supposed to add a webpart to SharePoint Online page programmatically. 

It depends on our requirements, but we could use JavaScript or other Client Object Model libraries to add a web part to SharePoint page. My advice is, even if your requirements guide you to write PowerShell script, try to use Client Object Model instead Server Object Model, whenever possible.

Let’s share the code to add a Content Editor webpart to a SharePoint page:
<script src="https://gist.github.com/jquintozamora/cbb69be3dd39208749ca.js"></script> 

&nbsp;

While I was developing this program, I found a problem with the format of XML. Specifically this problem:
 > The file you imported is not valid. Verify that the file is a Web Part description file (*.webpart or *.dwp) and that it contains well-formed XML.<pre>$wp = $webpartManager.ImportWebPart($WebPartXml.OuterXml)</pre>

Using PowerShell is really important consider the type of the variables we are using, in my case I was trying to ImportWebPart using a PowerShell variable called $WebPartXml, but the real XML object (as string) that ImportWebPart function expects is $WebPartXml.OuterXml.

&nbsp;

Lot of thanks to my friend [Benja](https://twitter.com/BenCernuda "https://twitter.com/BenCernuda") for helping on that! ![Open-mouthed smile](https://blog.josequinto.com/wp-content/uploads/2016/02/wlEmoticon-openmouthedsmile.png)&nbsp;

Regards!

[@jquintozamora](https://twitter.com/jquintozamora)