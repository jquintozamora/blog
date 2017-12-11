---
title: Upload JSON Object as a File into OFfice 365 using JavaScript (JSOM)
tags:
  - English
url: 902.html
id: 902
categories:
  - javascript
  - JSOM
  - Office 365
date: 2017-03-03 13:11:24
---

[![image](https://blog.josequinto.com/wp-content/uploads/2017/03/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/03/image.png)

Hi,

In this post, I am going to show how to convert and upload a JSON Object into a SharePoint library using JavaScript Client Object Model.

That approach will be valid using the code inside a SharePoint Web Part, will not be valid for SP Apps or JavaScript applications running outside of SharePoint context.

Here you can see the code:
<script src="https://gist.github.com/jquintozamora/9c64c12df47f151ff5e998e0e6dfba34.js"></script> 

&nbsp;

I tested it in Chrome 56 and Internet Explorer 11 and it worked.
 > IMPORTANT:
> 
> If you want to upload other kind of documents (more that 2 MB). Then I recommend you take a look to this post: [http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/](http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/ "http://sharepointcookies.com/2017/02/programmatically-uploading-large-files-client-side-to-sharepoint-2013/") from my colleague [Kev](https://twitter.com/BeckettKev). 

Please, feel free to write a comment if that is not working in your specific scenario!

[@jquintozamora](https://twitter.com/jquintozamora)