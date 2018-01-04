---
layout: post
title: Create a new Lookup field using JSOM in SharePoint 2013 / Office 365
language: English
permalink: create-a-new-lookup-field-using-jsom-in-sharepoint-2013-office-365
id: 465
categories:
  - Code-Reminder
tags:
  - JSOM
  - Office 365
  - Provisioning
date: 2015-12-02 14:14:16
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
When we need to provision a **new lookup column** referencing a Library we can thing about using XML procedure that means using a code similar to this one:

```xml
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
```

But, bad news here, this code is expecting something like `List/ListName` and **it doesn’t works for a Libraries.** Unless you put there directly the `Library ID` ([http://www.sharepointnutsandbolts.com/2007/04/creating-list-based-site-columns-as.html](http://www.sharepointnutsandbolts.com/2007/04/creating-list-based-site-columns-as.html)).

I am pretty sure, we don’t know the exact `GUID` of the referred library, in my case it is `Pages Library`, so, this way doesn’t works for my scenario. Even if I change `$Resources:osrvcore,List_Pages_UrlName;` by `Pages` or by `/Pages`. **It doesn’t works**.

## JSOM to rescue
Luckily, we have JSOM library that sometimes is helping us in the provisioning process.
You can use this code to create a new lookup to `Pages Library` in the `Documents Library`.

![image](./image.png)

## Code
<script src="https://gist.github.com/jquintozamora/900e1b28f406b6410f48.js"></script>