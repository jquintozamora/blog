---
title: >-
  Customize the rendering of a XSLTListViewWebPart with Client-Side Rendering
  (CSR) in SharePoint 2013
tags:
  - English
url: 132.html
id: 132
categories:
  - JSLink
  - SharePoint
date: 2014-06-12 15:52:53
---

We can use JavaScript or JQuery libraries in order to modify the rendering of a XSLTListViewWebPart in SharePoint 2013.

To accomplish that, we can use JSLink property that is included in that webpart (since SharePoint 2013).

More information about JSLink:

[http://www.idubbs.com/blog/2012/js-link-for-sharepoint-2013-web-partsa-quick-functional-primer/](http://www.idubbs.com/blog/2012/js-link-for-sharepoint-2013-web-partsa-quick-functional-primer/)

All these SharePoint components or objects use JSLink property:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image1.png)

&nbsp;

When we edit a XSLTListViewWebPart we find JS Link property in Miscellaneous section:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image2.png)

&nbsp;

The idea is override default SharePoint behavior by using JavaScript and that will let us to modify from List Fields in forms to complete view representation.

You can find here ([http://code.msdn.microsoft.com/office/Client-side-rendering-JS-2ed3538a](http://code.msdn.microsoft.com/office/Client-side-rendering-JS-2ed3538a "http://code.msdn.microsoft.com/office/Client-side-rendering-JS-2ed3538a")) good collection of Client-side Rendering customizations.

Even if we can modify several SharePoint objects, like SPView, later, that will be applied in XSLTListViewWebPart.

Let’s analyze the code inside CSRSLiderListView.js:
<pre class="js">
function _registerSliderViewTemplate() 
{ 
    // Initialize the variable that store the objects. 
    var overrideCtx = {}; 
    overrideCtx.Templates = {}; 

    overrideCtx.Templates.View = ViewOverrideFunc; 

    overrideCtx.BaseViewID = 1;
    overrideCtx.ListTemplateType = 100; 

    // Register the template overrides. 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx); 
}
</pre>
RegisterTemplateOverrides function will overrides the behavior of all lists with **BaseViewID** = 1 and **ListTemplateType** = 100\. (Custom Lists and Standard Views basically).

This is because, when we setup JSLink with this js code. All XLSTListViewWebParts will be overridden. To avoid that, we should add conditional code inside **ViewOverrideFunc**:
<pre class="js">
// This function builds the output for the view template
function ViewOverrideFunc(ctx) {

    if (ctx.listUrlDir != "/Lists/WhatComingNextCarousel") 
    {
         return RenderViewTemplate(ctx);
    }

    var listData = ctx.ListData;
    /* This is sctricly neccesary to avoid duplicate content */
    if (ctx.Templates.Body == '') 
    {
        return RenderViewTemplate(ctx);         
    }

    var finalHtml ='';

    finalHtml += "<div id='video-gallery' class='royalSlider videoGallery rsDefault'>";

    for (var idx in listData.Row) 
    {
        var listItem = listData.Row[idx];
        finalHtml += "<div class='rsContent'>";
        finalHtml += "        ![image ]()";
        finalHtml += "        <div class='rsTmb'>" + listItem.Title + "</div>";
        finalHtml += "        <div class='rsABlock'>";
        finalHtml += "            <div class='rsABlockDescription'>" + listItem.Description + "</div>";
        finalHtml += "            <span class='rsABlockReadMore'>[Read more...]()</span>";
        finalHtml += "        </div>";
        finalHtml += "</div>";

    }
    finalHtml += '</div>';

    return finalHtml;
}
</pre>
&nbsp;

We need to delay the load of this script:
<pre class="js">
(function () {
    ExecuteOrDelayUntilScriptLoaded(_registerSliderViewTemplate, 'clienttemplates.js');
})();
</pre>
&nbsp;

&nbsp;

Hope that helps!