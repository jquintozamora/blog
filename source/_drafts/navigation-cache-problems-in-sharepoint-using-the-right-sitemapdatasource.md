---
title: 'Navigation cache problems in SharePoint, using the right SiteMapDataSource'
tags:
  - English
url: 441.html
id: 441
categories:
  - Cache
  - Navigation
  - SharePoint
  - SharePoint 2010
  - SharePoint 2013
  - SharePoint Online
date: 2015-09-24 09:12:51
---

When we are using Publishing Sites in SharePoint 2013, we probably will use Navigation feature. That allows us to change Global and Current Navigation items.

I had some weird problem with Global Navigation and changes. I mean, doing changes in Navigation page, like not displaying sites, or pages, will not be reflecting in the Global Navigation in the master page.

&nbsp;

The first thing is to review the SiteMapDataSource and SharePoint:AspMenu items. These are intended to get the Data and Represent the data using HTML.

What we have is a copy of seattle.master :

&nbsp;
<div id="codeSnippetWrapper">
<pre class="xhtml">

<SharePoint:DelegateControl runat="server" ControlId="TopNavigationDataSource1" Id="topNavigationDelegate">
    <Template_Controls>
        <asp:SiteMapDataSource ShowStartingNode="False"
                                SiteMapProvider="SPNavigationProvider"
                                id="topSiteMap2"
                                runat="server"
                                StartingNodeUrl="sid:1002" />
    </Template_Controls>
</SharePoint:DelegateControl>

<SharePoint:AspMenu ID="SecondLevelMenu"
                    Runat="server"
                    CssClass="schindlerSecondLevelMenu"
                    EnableViewState="true"
                    DataSourceID="GlobalNavDataSource"
                    AccessKey="<%$Resources:wss,navigation_accesskey%>"
                    UseSimpleRendering="true"
                    UseSeparateCss="false"
                    Orientation="Horizontal"
                    StaticDisplayLevels="2"
                    AdjustForShowStartingNode="true"
                    MaximumDynamicDisplayLevels="2"
                    SkipLinkText=""/>

</pre>
&nbsp;

</div>
&nbsp;

But all this code seems to be ok working in a Team Site scenario. But, let's think about changing the SiteMapProvider.

There is a list of SiteMapProviders here: [https://ktskumar.wordpress.com/2008/04/14/sharepoint-navigation-providers-part-1/](https://ktskumar.wordpress.com/2008/04/14/sharepoint-navigation-providers-part-1/)

And a list of Publishing SiteMapProviders here: [http://blogs.msdn.com/b/ecm/archive/2007/02/10/moss-navigation-deep-dive-part-1.aspx](http://blogs.msdn.com/b/ecm/archive/2007/02/10/moss-navigation-deep-dive-part-1.aspx)

We can see that we have **special SiteMapProviders used for Publishing sites, so we changed the SiteMapProvider**:

&nbsp;
<div id="codeSnippetWrapper">
<pre class="xhtml">

<SharePoint:DelegateControl runat="server" ControlId="TopNavigationDataSource1" Id="topNavigationDelegate">
    <Template_Controls>
        <asp:SiteMapDataSource ShowStartingNode="False"
                                SiteMapProvider="CombinedNavSiteMapProvider"
                                id="topSiteMap2"
                                runat="server"
                                StartingNodeUrl="sid:1002" />
    </Template_Controls>
</SharePoint:DelegateControl>

</pre>
&nbsp;

</div>
&nbsp;

Bad luck, it didn’t work :(

But this didn't work because **asp:SiteMapDataSource is not intended for Publishing Sites, so we need to use PortalSiteMapDataSource**

&nbsp;

So the resolution for cache problems in Navigation using Publishing Sites is:

&nbsp;

How to include **PortalSiteMapDataSource** in our Master Page:

1\. Register Publishing Navigation controls
<div id="codeSnippetWrapper">
<pre class="xhtml">

<%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

</pre>
&nbsp;

</div>
2\. Add the control in the master page:
<div id="codeSnippetWrapper">
<pre class="xhtml">

<PublishingNavigation:PortalSiteMapDataSource ID="GlobalNavDataSource"
    Runat="server"
    SiteMapProvider="CombinedNavSiteMapProvider"
    ShowStartingNode="false"
    StartFromCurrentNode="true"
    StartingNodeOffset="0"
    TrimNonCurrentTypes="Heading"
    TreatStartingNodeAsCurrent="true" />

</pre>
&nbsp;

</div>
3\. Change asp:Menu DataSourceID
<div id="codeSnippetWrapper">
<pre class="xhtml">

<SharePoint:AspMenu ID="SecondLevelMenu"
           Runat="server"
           CssClass="schindlerSecondLevelMenu"
           EnableViewState="true"
           DataSourceID="GlobalNavDataSource"
           AccessKey="<%$Resources:wss,navigation_accesskey%>"
           UseSimpleRendering="true"
           UseSeparateCss="false"
           Orientation="Horizontal"
           StaticDisplayLevels="2"
           AdjustForShowStartingNode="true"
           MaximumDynamicDisplayLevels="2"
           SkipLinkText=""/>

</pre>
&nbsp;

</div>
**Note**:

Take care about the SiteMapProvider used in the SiteMapDataSource. Sometimes is better to use **CurrentNavSiteMapProvider or GlobalNavSiteMapProvider **instead **[CombinedNavSiteMapProvider](https://msdn.microsoft.com/EN-US/library/office/microsoft.sharepoint.publishing.navigation.portalsitemapprovider.combinednavsitemapprovider.aspx)**

&nbsp;

Using this approach, all inconsistencies between Navigation and master page, like cache, items are solved.

&nbsp;

References:

[https://msdn.microsoft.com/en-us/library/office/aa660698(v=office.12).aspx](https://msdn.microsoft.com/en-us/library/office/aa660698(v=office.12).aspx)

&nbsp;

&nbsp;

HTH

JQ

[@jquintozamora](https://twitter.com/jquintozamora)