---
layout: post
title: Get View by URL method implemented in JSOM for SharePoint 2013 / Office 365
language: English
permalink: get-view-by-url-method-implemented-in-jsom-for-sharepoint-2013-office-365
id: 438
categories:
    - Concept-Explained
tags:
  - javascript
  - JSOM
  - Office 365
  - SharePoint 2013
date: 2015-09-10 08:35:44
featuredImage: 
  url: featured.jpeg
  width: auto
  height: auto
---

## Introduction
If we take a look at [SP.View object](https://msdn.microsoft.com/en-us/library/office/jj245986.aspx) (sp.js) provided by Microsoft as part of **JSOM** libraries, we can see all Methods and Properties available like update, defaultView, [title](https://msdn.microsoft.com/en-us/library/office/jj247235.aspx), …

But, if we are looking for a way to get one  of all available views inside a List/Library, we should look at [SP.ViewCollection object](https://msdn.microsoft.com/en-us/library/office/jj245325.aspx).

![image](./image1.png)

## Multilingual project and getByTitle
Bad news here because working in a multilingual project, we should avoid `getByTitle` and working in a generic method that we need to apply to several lists in several webs we have a variable `GUID`.

So, in this scenario, the best option should be `getByURL`, because View URL (like `mod-view.aspx` or `AllItems.aspx`)  in most cases is constant between lists, webs and site collections.

Until now (September 2015) we haven’t `getByUrl` method available in SharePoint JSOM framework.

# Solution
I’d like to share a way to implement this method iterating through all views:

```js
function getViewByUrl(listGuid, viewUrl) 
{    
    var context = SP.ClientContext.get_current();
    // Get SP.ViewCollection object of given List
    var pagesListViews = context.get_web().get_lists().getById(listGuid).get_views();
    // Include only two needed fields to reduce network load
    context.load(pagesListViews, 'Include(Id,ServerRelativeUrl)');
    context.executeQueryAsync(
        function (sender, args) 
        {
            var viewfound = false;
            var viewEnumerator = pagesListViews.getEnumerator();
            while (viewEnumerator.moveNext()) 
            {
                var view = viewEnumerator.get_current();
                var url = view.get_serverRelativeUrl();
                // If url.contains(viewUrl)
                if (url.indexOf(viewUrl) >= 0)
                {
                    console.log(view.get_id().toString());
                    viewfound = true;
                    break;
                }
            }
            if (!viewfound)
            {
                console.log("Error: View not found.");
            }
        }, 
        function (sender, args) 
        {
            console.log('Error: ' + args.get_message());
        }
    );
}

// Invoke our function
var listGuid = "5f4eb15e-7d56-4e81-928b-9964ba8003d7";
var viewUrl = "AllItems.aspx";
getViewByUrl(listGuid,viewUrl);
```

> **Tip**: If you want to test this code in a SharePoint environment you can copy and paste the code directly in the Console of your browser and see what is the output.
