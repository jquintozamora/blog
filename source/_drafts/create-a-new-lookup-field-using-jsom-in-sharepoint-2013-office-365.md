---
title: Create a new Lookup field using JSOM in SharePoint 2013 / Office 365
tags:
  - English
url: 465.html
id: 465
categories:
  - JSOM
  - Office 365
  - Provisioning
date: 2015-12-02 14:14:16
---

Hi,

When we need to provision a new lookup column referencing a Library we can thing about using XML procedure that means using a code similar to this one:
<div>
<pre class="xhtml">

<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">  
  <Field
       ID="{6fe3193c-ad20-4f0f-ba9e-cdabb7d2c2e7}"
       Name="StandardPageLookup" 
       StaticName="StandardPageLookup" 
       DisplayName="Related Page" 
       SourceID="http://schemas.microsoft.com/sharepoint/v3" 
       Type="Lookup" 
       ShowField="Title" 
       Mult="TRUE" 
       UnlimitedLengthInDocumentLibrary="TRUE" 
       List="$Resources:osrvcore,List_Pages_UrlName;" 
       Overwrite="TRUE"
       Group="Site Columns">
  </Field>
</Elements>

</pre>
</div>
<div>But, bad news here, this code is expecting something like “List/ListName” and **it doesn’t works for a Libraries.** Unless you put there directly the Library ID ([http://www.sharepointnutsandbolts.com/2007/04/creating-list-based-site-columns-as.html](http://www.sharepointnutsandbolts.com/2007/04/creating-list-based-site-columns-as.html "http://www.sharepointnutsandbolts.com/2007/04/creating-list-based-site-columns-as.html")).</div>
<div>I am pretty sure, we don’t know the exact GUID of the referred library, in my case it is Pages Library, so, this way doesn’t works for my scenario. Even if I change $Resources:osrvcore,List_Pages_UrlName; by “Pages” or by “/Pages”. **It doesn’t works**.</div>
<div></div>
<div></div>
<div>Luckily, we have JSOM library that sometimes is helping us in the provisioning process.</div>
<div>You can use this code to create a new lookup to Pages Library in the Documents Library.</div>
<div>[![image](https://blog.josequinto.com/wp-content/uploads/2015/12/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/12/image.png)</div>
<div></div>
<div>Code:</div>
<script src="https://gist.github.com/jquintozamora/900e1b28f406b6410f48.js"></script>
<div>
</div>
&nbsp;

HTH