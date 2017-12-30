---
layout: post
title: Office 365. PnP Provisioning – Hide default Title column and Enable menu for Other Custom Text Column
language: English
permalink: office-365-pnp-provisioning-hide-default-title-column-and-enable-menu-for-other-custom-text-column
id: 778
categories:
  - PnP
  - Provisioning
date: 2016-07-11 16:21:26
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
Playing with **PnP Provisioning** is funny as you have different set of features and requirements you can achieve when provisioning sites. 

Last month I found sort of bug at version **v2.4.1605** of PnP Core: [Can not Convert Object when provisioning pnp:file Display Template](/2016/06/14/office-365-cannot-convert-object-problem-when-provisioning-pnpfile-display-template).

Working with the same version I had a requirement to provision a **Content Type** that inherits of Item but we MUST **hide OOTB Title** column and provision** List Instance**, bind the Content Type to the new List and enable contextual menu on the **Custom_Title** field.

If it is the first time you use the PnP Provisioning, please highly recommends you look into this [GitHub page](https://github.com/OfficeDev/PnP-Sites-Core/tree/master/Core) (where MS publish the PnP Core solution).

## Using PnP Provisioning:
I will quick remind a step by step to start using PnP Provisioning:

1. Create Console Application to invoke PnP Core classes.
2. Add Packages needed using Package Manager Console. Here is how my packages.config looks like:
  <script src="https://gist.github.com/jquintozamora/f515a5b04ed7b3f4c458fb5203db2051.js"></script> 

  Now, we can see OfficeDevPnP.Core in our Project References:

  [![image](./image.png "image")](./image.png)

3. Create a function to read the XML file (Provisioning Template) and Apply it to Web object on SharePoint or Office 365.

4. Call this function from Main method but before configure your environment settings.

  <script src="https://gist.github.com/jquintozamora/470f7dbf18c5d7ffcba7708fa5adddaa.js"></script> 

5. Create a two folders in your Project:
  - **Assets folder**: where you can put all the files you need to provision (Display Templates, Master Pages, JS, CSS, Page Layouts, WebParts, etc.)
  - **Config folder**: where you can put all your Provisioning Template xml files.

6. Create **Site Collection level Provisioning Template (JQ.SiteCollection.Template.xml)**:

  <script src="https://gist.github.com/jquintozamora/f396ccabb878f0f54d96536bc509572b.js"></script> 

  In this case, we will Provision:
  - A new Hyperlink field.
  - A new Text field used as a Custom Title. **It is important to use these four attributes to enable the field as a Link and Menu in** **the SharePoint views**: 
    ```xml
    LinkToItemAllowed="Required" 
    LinkToItem="True" 
    ListItemMenuAllowed="Required" 
    ListItemMenu="True" 
    ```
    > Thank you Dario for your post: [Linking a custom column to the Item and the Item menu](http://js231sharepoint.com/linking-a-custom-column-to-the-item-and-the-item-menu-on-sharepoint).
  - A **new Content Type** that inherits of **Item** but with the two new fields previously created and **OOTB Title column hidden**. 

7. Create **Sub-site level Provisioning Template (JQ.Resources.Template.xml)**.

  <script   src="https://gist.github.com/jquintozamora/547c298bbdc19b6b2735847dc3fed524.js"></script> 

  A new list will be provisioned **using and binding to the previously created Content Type**.


## Conclusion
This is how the solution looks at the end, and we have meet two requirements:

- Hide OOTB Title column. 
- Enable menu on QuickLinks Title column.
[![image](./image-1.png "image")](./image-1.png)
[![image](./image-2.png "image")](./image-2.png)
**Using traditional provisioning approach that isn’t as easy as configure a XML file.**
