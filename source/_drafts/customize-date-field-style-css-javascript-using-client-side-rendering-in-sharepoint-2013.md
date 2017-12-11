---
title: >-
  Customize Date Field style (CSS, JavaScript) using Client-side rendering in
  SharePoint 2013
tags:
  - English
url: 147.html
id: 147
categories:
  - Branding
  - CSS
  - JSLink
  - List View Web Part
  - SharePoint 2013
date: 2014-06-24 07:38:06
---

Few weeks ago I posted about client-side rendering in SharePoint 2013: [https://blog.josequinto.com/2014/06/12/customize-the-rendering-of-a-xsltlistviewwebpart-with-client-side-rendering-csr-in-sharepoint-2013/](https://blog.josequinto.com/2014/06/12/customize-the-rendering-of-a-xsltlistviewwebpart-with-client-side-rendering-csr-in-sharepoint-2013/ "https://blog.josequinto.com/2014/06/12/customize-the-rendering-of-a-xsltlistviewwebpart-with-client-side-rendering-csr-in-sharepoint-2013/")**. **In this example, I overwrote a complete view for a List View Web Part, but now, we will override only a kind of field inside a List or Library.

Main goal is achieve the result like below image, where we have a document library with “Release Date” field of DateTime type.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb5.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image5.png)

### First step is create JS file and store it in our SharePoint:

<pre class="js">

(function () {
    ExecuteOrDelayUntilScriptLoaded(_registerSliderViewTemplate, 'clienttemplates.js');
})();

function _registerSliderViewTemplate() 
{ 
    // Initialize the variable that store the objects. 
    var overrideCtx = {}; 
    overrideCtx.Templates = {}; 

     overrideCtx.Templates.Fields = {
        "Release_x0020_Date": {
            "View": ReleaseDateViewTemplate
        }
    };

    // Register the template overrides. 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx); 
}

function ReleaseDateViewTemplate(ctx) 
{
    var date  = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var d = new Date(date);
    return "<div class='dateBox'><div class='dayDateBox'>" + d.getDay() + "</div><div class='monthDateBox' >" +  monthNames[d.getMonth()] + "</div></div>";
}
</pre>> Notes:
> 
> &nbsp;&nbsp; - When we apply this JS Script code in one List View Web Part, actually, we are overriding all List View Web Part components inside the same page. That is because SPClientTemplates.TemplateManager.RegisterTemplateOverrides affect to all templates of all LVWP included in the page that is declared the JSLink.
> 
> &nbsp;&nbsp; - Note that in this case, only is overwritten “Release_x0020_Date” field in all Lists and Libraries.
> 
> &nbsp;&nbsp; - We use ExecuteOrDelayUntilScriptLoaded to avoid JavaScript function execute before <span class="str">'clienttemplates.js'.</span>

&nbsp;

### Second step is link that JS file with a Web Part:

We can use JSLink property included in SharePoint 2013 List View Web Parts:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb6.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image6.png)
> Notes
> 
> &nbsp;&nbsp; - You need to use tokens in JSLink URL. You can use these: ~site , ~sitecollection, ~layouts, ~siteLayouts and&nbsp; ~siteCollectionLayouts.
> 
> &nbsp;&nbsp; - Please read this article: [http://sharepoint-community.net/profiles/blogs/5-facts-about-jslink-in-sharepoint-2013-you-might-not-know](http://sharepoint-community.net/profiles/blogs/5-facts-about-jslink-in-sharepoint-2013-you-might-not-know "http://sharepoint-community.net/profiles/blogs/5-facts-about-jslink-in-sharepoint-2013-you-might-not-know")

&nbsp;

### Last step is to add CSS code in our Master Page:

By using CSS we can make any design we can image, in my example I used the “blank space” in the title bar to relocate there the paging control by using css. Something like that:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb7.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image7.png)

CSS:

<pre class="css">
/* title and webpart box styles */
#divContainerWebPartZone .ms-webpart-titleText
{
    background-color: #d0d3d5;
    padding-left: 10px;
    padding-bottom: 3px;
}
#divContainerWebPartZone .ms-webpart-titleText a
{
    color: #C40C00 !important;
}
#divContainerWebPartZone .ms-wpContentDivSpace 
{
    padding-left: 5px;
}
#divContainerWebPartZone
{
    border: 1px #d0d3d5 solid;
}

/* pagging at top */
#divContainerWebPartZone .ms-bottompaging
{
    position: absolute;
    top: -46px;
    right: -2px;
}

/*  date Box */
.dateBox
{
    width: 50px;
    height: 50px;
    background-color: #C40C00;
    padding-left: 8px;
    margin-left: 5px;
}
.dayDateBox
{
    font-size: 25px;
    line-height: 25px;
    color: white;
    padding-top: 3px;
}
.monthDateBox
{
    font-size: 12px;
    color: white;
}
</pre>

&nbsp;

References:

- [http://www.rbradbrook.co.uk/blog/2013/04/14/introduction-to-client-side-rendering-in-sharepoint-2013/](http://www.rbradbrook.co.uk/blog/2013/04/14/introduction-to-client-side-rendering-in-sharepoint-2013/ "http://www.rbradbrook.co.uk/blog/2013/04/14/introduction-to-client-side-rendering-in-sharepoint-2013/")

- [http://msdn.microsoft.com/en-us/library/office/jj220061(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/office/jj220061(v=office.15).aspx "http://msdn.microsoft.com/en-us/library/office/jj220061(v=office.15).aspx")

- JSLINK: [http://cann0nf0dder.wordpress.com/2014/02/21/jslink-and-sp-clientcontext-being-null-or-undefined/](http://cann0nf0dder.wordpress.com/2014/02/21/jslink-and-sp-clientcontext-being-null-or-undefined/ "http://cann0nf0dder.wordpress.com/2014/02/21/jslink-and-sp-clientcontext-being-null-or-undefined/")

&nbsp;

&nbsp;

Hope that helps!

JQ

@jquintozamora