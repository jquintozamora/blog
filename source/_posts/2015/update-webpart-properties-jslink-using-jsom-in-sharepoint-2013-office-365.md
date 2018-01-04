---
layout: post
title: Update WebPart Properties (JSLink) using JSOM in SharePoint 2013 (Office 365)
language: English
permalink: update-webpart-properties-jslink-using-jsom-in-sharepoint-2013-office-365
id: 447
categories:
    - Code-Reminder
tags:
  - JSOM
  - Office 365
  - SharePoint 2013
  - webpart
date: 2015-09-30 16:52:42
featuredImage: 
  url: featured.jpeg
  width: auto
  height: auto
---

## Introduction
Working with **SharePoint Online**, we should be thinking on solving provisioning tasks using **JSOM** in combination with **XML** using **SharePoint provisioning engine**.

This post is intended to describe how to update a WebPart Property using JSOM. 
Specifically, I'm updating `JSLink` property for a given `webpart` and page.

## Code
```js
var listName = "NewsIdeas"
var jslinkURL = "~sitecollection/Style Library/JSLink/NewsIdeas_NewForm.js";
var pageUrl = "/Lists/" + listName + "/NewForm.aspx";

var clientContext = new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
console.log(_spPageContextInfo.webServerRelativeUrl);
var oFile = clientContext.get_web().getFileByServerRelativeUrl(_spPageContextInfo.webServerRelativeUrl + pageUrl); 
var limitedWebPartManager = oFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
var collWebPart = limitedWebPartManager.get_webParts();

clientContext.load(collWebPart);
clientContext.executeQueryAsync(function () 
{
    var webPartDef = null;
    for (var x = 0; x < collWebPart.get_count() && !webPartDef; x++) {
        var temp = collWebPart.get_item(x);
        console.log(temp.get_id().toString());
    }
    webPartDef = collWebPart.get_item(0);
    if (!webPartDef) {
        console.log("Web Part: " + wpId + " not found on page: " + _spPageContextInfo.webServerRelativeUrl);
        return;
    }
    var webPartProperties = webPartDef.get_webPart().get_properties();
    clientContext.load(webPartProperties);
    clientContext.executeQueryAsync(
        function () {
            var webpartprops = webPartProperties;
            console.log(webpartprops.get_item('JSLink'));
            webpartprops.set_item("JSLink", jslinkURL);
            webPartDef.saveWebPartChanges();
            clientContext.load(webPartDef);
            clientContext.executeQueryAsync(
            function () {
                console.log("WebPart properties saved.");
            },
            function() 
            {
                console.log("Failed save WebPart Properties"); 
            });
        }, 
        function () 
        { 
            console.log("Failed to load web part properties"); 
        });
}, 
function () { 
    console.log("Failed to load web part collection"); 
});
```