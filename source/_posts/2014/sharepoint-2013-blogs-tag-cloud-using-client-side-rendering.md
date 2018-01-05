---
layout: post
title: Blogs Tag Cloud using Client Side Rendering
language: English
permalink: sharepoint-2013-blogs-tag-cloud-using-client-side-rendering
id: 184
categories:
    - Code-Reminder
tags:
  - client side rendering
  - JSLink
  - SharePoint 2013
date: 2014-07-14 18:13:33
featuredImage: 
  url: featured.jpg
  width: auto
  height: auto
---

## Introduction
One of the most missed features in **SharePoint Blog Template** (even in SharePoint 2013) is a `Tag Cloud webpart` to represent information about Posts Categories. 

Until now, I usually get done this task by using XSLT and this [Waldek’s post](http://blog.mastykarz.nl/generating-tag-cloud-content-query-web-part)

But, with SharePoint 2013, we have available **CSR – Client Side Rendering** and we can use it to achieve our `Tag (Categories) Cloud Web Part`. 

## Click through

1. Create a new View in Posts lists. We will name this view `TagCloud` and select only Categories field
    ![image](./image4.png)

2. We will add Posts app or webpart to our page. 
    ![image](./image5.png)

    > We will edit this webpart to assign “TagCloud” view in it.

3. We will create js file to use CSR to customize this view

    > More information about Client Side Rendering: 
    > - [https://blog.josequinto.com/2014/06/12/customize-the-rendering-of-a-xsltlistviewwebpart-with-client-side-rendering-csr-in-sharepoint-2013/](./2014/06/12/customize-the-rendering-of-a-xsltlistviewwebpart-with-client-side-rendering-csr-in-sharepoint-2013)
    > - [https://blog.josequinto.com/2014/06/24/customize-date-field-style-css-javascript-using-client-side-rendering-in-sharepoint-2013/](./2014/06/24/customize-date-field-style-css-javascript-using-client-side-rendering-in-sharepoint-2013)

    So, create myCSRTagCloud.js file:

    ```js
    (function () {
        ExecuteOrDelayUntilScriptLoaded(_registerBlogsBodyViewTemplate, 'clienttemplates.js');
    })();

    function _registerBlogsBodyViewTemplate() 
    { 
        // Initialize the variable that store the objects. 
        var overrideCtx = {}; 
        overrideCtx.Templates = {}; 
        overrideCtx.Templates.View = ViewOverrideFunc; 
        // Register the template overrides. 
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx); 
    }

    // This function builds the output for the view template
    function ViewOverrideFunc(ctx) {
        if (ctx.view != "{VIEWGUID}") {
            return RenderViewTemplate(ctx);
        }

        var listData = ctx.ListData;
        /* This is sctricly neccesary to avoid duplicate content */
        if (ctx.Templates.Body == '') {
            return RenderViewTemplate(ctx);         
        }

        var finalHtml ='';

        if (ctx.view == "{VIEWGUID}") {
            var categoryArray = new Array();
            for (var idx in listData.Row) {
                var listItem = listData.Row[idx];
                var categs = listItem.PostCategory;
                if (categs != null) {
                    for(i=0 ; i< categs.length ; i++) {
                        var categ = categs[i];
                        var categName = categ.lookupValue;
                        var categId = categ.lookupId;
                        categoryArray.push({name: categName, id: categId});
                    }
                }
            }

            var tags = {};
            var ids = {};
            categoryArray.forEach(function(x) {
                tags[x.name] = (tags[x.name] || 0)+1;
                ids[x.name] = x.id;
            });

            finalHtml += "<div id='tagCloudTitle' class='tagCloudTitle'>Top Trending Tags</div>";
            finalHtml += "<div id='tagCloud' class='tagCloudContainer'>";

            /*
                minCount: minimum number of times tag must be used to show up in the cloud (defaults to 0)
                minSize: minimum font size for tags in the cloud (defaults to 1em)
                maxSize: maximum font size for tags in the cloud (defaults to 4.5em)
                delim: delimiter(s) to insert between tags in the cloud (defaults to 1 space)
            */
            var minCount = 0;
            var minSize = 1;
            var maxSize = 2; //(in 'em' units)
            var delim = '&nbsp;';
            delim = '';

            var maxSeen = 0; 
            var fontSize = maxSize;
            var fontSizes = [];
            for (var tag in tags) {
                if (tags[tag] > minCount) {
                    if (tags[tag] > maxSeen) { maxSeen = tags[tag]; }
                    fontSize = maxSize * (tags[tag] - minCount);
                    fontSizes.push(fontSize);
                }                        
            }

            var counter = 0;
            for (var tag in tags) {
                var baseUrl =  ctx.HttpRoot + '/Lists/Categories/Category.aspx?CategoryId=' + ids[tag];
                if (tags[tag] > minCount) {
                    var ems = ((fontSizes[counter]-minSize) / (maxSeen - minCount)) + minSize;
                    counter++;
                    finalHtml +="    [" + tag + "]()" + delim;
                }            
            }
            finalHtml += '</div>';
        }
        return finalHtml;
    }
    ```
    > Note: We should put the right `ViewGUID` in the IF. You can debug this javascript file in order to get this `GUID` from the ctx variable (javascript).

4. Edit you Posts webpart added previously
    Change default `Chrome Type` to `None`.
    Change JSLink to: `~sitecollection/_catalogs/masterpage/js/csr/myCSRTagCloud.js`
    > Important: use token `~sitecollection` and store the js file in that url.


## Read more...
- Work with JavaScript Arrays of Objects: [http://eloquentjavascript.net/chapter4.html](http://eloquentjavascript.net/chapter4.html)

- Tag Cloud . js: [https://github.com/buyog/MiscJS/blob/master/tagCloud.js](https://github.com/buyog/MiscJS/blob/master/tagCloud.js)

- Simple Tag Cloud with JavaScript: [http://palagpat-coding.blogspot.com.es/2009/06/simple-tag-cloud-generator-in.html](http://palagpat-coding.blogspot.com.es/2009/06/simple-tag-cloud-generator-in.html)

- Count duplicated values in JavaScript Array: [http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript](http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript)

- Generating Tag Cloud in SharePoint 2007 and 2010 with XSLT: [http://blog.mastykarz.nl/generating-tag-cloud-content-query-web-part/](http://blog.mastykarz.nl/generating-tag-cloud-content-query-web-part)
