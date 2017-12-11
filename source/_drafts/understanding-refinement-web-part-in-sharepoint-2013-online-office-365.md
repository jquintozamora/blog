---
title: Understanding Refinement Web Part on SharePoint 2013 Online (Office 365)
tags:
  - English
url: 427.html
id: 427
categories:
  - JSOM
  - Managed Properties
  - Refiners
  - Search
  - User Profiles
date: 2015-08-13 09:47:24
---

In SharePoint 2013, a new search web part named Refinement was introduced, which helps in narrowing down the search results.

Refiners are based on **managed properties** from the search index.

To use managed properties as refiners, the managed properties must be **enabled as refiners**, or crawled properties must be mapped to managed properties that are enabled as refiners.

[![image](https://blog.josequinto.com/wp-content/uploads/2015/08/image4_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/08/image4.png)

&nbsp;

&nbsp;

## Understanding Refinement Web Part

By default Search Center in SharePoint 2013 is composed of four main web parts:

[![image](https://blog.josequinto.com/wp-content/uploads/2015/08/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/08/image.png)

[![image](https://blog.josequinto.com/wp-content/uploads/2015/08/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/08/image1.png)

As we know, Refinement Web Part is intended to filter information displayed in Search Results Web Part.

For us, as a Developers, we are interested on how we can modify the default behaviour of these web parts.

So, if we take a look the Web Part XML Definition of Refinement WebPart:
<div id="codeSnippetWrapper"><webParts>
<webPart xmlns=<span class="str">"http://schemas.microsoft.com/WebPart/v3"</span>>
<metaData>
<type name=<span class="str">"Microsoft.Office.Server.Search.WebControls.RefinementScriptWebPart, Microsoft.Office.Server.Search, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"</span> />
<importErrorMessage>Cannot import <span class="kwrd">this</span> Web Part.</importErrorMessage>
</metaData>
<data>
<properties>
<property name=<span class="str">"HelpUrl"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"UseManagedNavigationRefiners"</span> type=<span class="str">"bool"</span>>False</property>
<property name=<span class="str">"TitleUrl"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"Hidden"</span> type=<span class="str">"bool"</span>>False</property>
<property name=<span class="str">"ChromeType"</span> type=<span class="str">"chrometype"</span>>TitleOnly</property>
<property name=<span class="str">"AllowClose"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"TitleIconImageUrl"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"AllowMinimize"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"AllowEdit"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"Direction"</span> type=<span class="str">"direction"</span>>NotSet</property>
<property name=<span class="str">"Height"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"AllowConnect"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"MissingAssembly"</span> type=<span class="str">"string"</span>>Cannot import <span class="kwrd">this</span> Web Part.</property>
<property name=<span class="str">"AllowHide"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"Description"</span> type=<span class="str">"string"</span>>This webpart helps the users to refine search results</property>
<property name=<span class="str">"StatesJson"</span> type=<span class="str">"string"</span>>{}</property>
<property name=<span class="str">"QueryGroupName"</span> type=<span class="str">"string"</span>>Default</property>
<property name=<span class="str">"ChromeState"</span> type=<span class="str">"chromestate"</span>>Normal</property>
<property name=<span class="str">"ExportMode"</span> type=<span class="str">"exportmode"</span>>All</property>
<property name=<span class="str">"AllowZoneChange"</span> type=<span class="str">"bool"</span>>True</property>
**<property name=<span class="str">"RenderTemplateId"</span> type=<span class="str">"string"</span>>~sitecollection/_catalogs/masterpage/Display Templates/Filters/Control_Refinement.js</property>
**          <property name=<span class="str">"CatalogIconImageUrl"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"EmitStyleReference"</span> type=<span class="str">"bool"</span>>True</property>
<property name=<span class="str">"HelpMode"</span> type=<span class="str">"helpmode"</span>>Modeless</property>
<property name=<span class="str">"Title"</span> type=<span class="str">"string"</span>>Filter By:</property>
<property name=<span class="str">"AlternateErrorMessage"</span> type=<span class="str">"string"</span> <span class="kwrd">null</span>=<span class="str">"true"</span> />
<property name=<span class="str">"Width"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"EmptyMessage"</span> type=<span class="str">"string"</span> />
<property name=<span class="str">"ServerIncludeScriptsJson"</span> type=<span class="str">"string"</span>><span class="kwrd">null</span></property>
**    <property name=<span class="str">"SelectedRefinementControlsJson"</span> type=<span class="str">"string"</span>>{<span class="str">"refinerConfigurations"</span>:[{<span class="str">"propertyName"</span>:<span class="str">"RefinableString06"</span>,<span class="str">"type"</span>:<span class="str">"Text"</span>,<span class="str">"sortOrder"</span>:0,
<span class="str">"displayTemplate"</span>:<span class="str">"~sitecollection/_catalogs/masterpage/Display Templates/Filters/Custom_Filter_MultiValue.js"</span>,<span class="str">"sortBy"</span>:0,
<span class="str">"maxNumberRefinementOptions"</span>:15,<span class="str">"displayName"</span>:<span class="str">"Topics"</span>,<span class="str">"useDefaultDateIntervals"</span>:<span class="kwrd">false</span>,<span class="str">"aliases"</span>:<span class="kwrd">null</span>,<span class="str">"refinerSpecStringOverride"</span>:<span class="str">""</span>,
<span class="str">"intervals"</span>:<span class="kwrd">null</span>}]}</property>**
</properties>
</data>
</webPart>
</webParts></div>
&nbsp;

&nbsp;

We can see two important properties for us:

- **RenderTemplateId**: That is the Control Display Template for all the Refinement. If we need to change some common UI element, or functionality using JavaScript we can provide a Custom js file. More information here: [http://www.eliostruyf.com/creating-custom-refiner-control-display-templates-for-sharepoint-2013/](http://www.eliostruyf.com/creating-custom-refiner-control-display-templates-for-sharepoint-2013/ "http://www.eliostruyf.com/creating-custom-refiner-control-display-templates-for-sharepoint-2013/")

- **SelectedRefinementControlsJson**: It is a JSON-based property intended to configure declaratively all the refinement properties.
<div id="codeSnippetWrapper">
<pre  class="js">{
  "refinerConfigurations": [
    {
      "propertyName": "RefinableString06",
      "type": "Text",
      "sortOrder": 0,
      "displayTemplate": "~sitecollection/_catalogs/masterpage/Display Templates/Filters/Custom_Filter_MultiValue.js",
      "sortBy": 0,
      "maxNumberRefinementOptions": 15,
      "displayName": "Topics",
      "useDefaultDateIntervals": false,
      "aliases": null,
      "refinerSpecStringOverride": "",
      "intervals": null
    }
  ]
}</pre>
displaytemplate attribute is where we could configure custom refiner display template that was prevoiusly uploaded to “**_catalogs/masterpage/Display Templates/Filters**”

</div>
&nbsp;

## Connection between Refinement and Search Results Web Parts

In order to provide custom features for Refinement WebPart in Office 365 and SharePoint 2013, it is important to understand completely how Refinement Web Part and Search Result Web Part are interconnected, but let’s focus on this post at the **connection between Refinement and Search Results Web Parts**.

If we edit Refinement Web Part, we can see the Property “**Refinement Target**” that is linked directly to Search Results web part, which means this refiner panel is sending information directly to this Results Web Part.

[![image](https://blog.josequinto.com/wp-content/uploads/2015/08/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/08/image2.png)

Behind Scenes, the search web parts make use of a JSON formatted string in the URL to do the search and refinements. Also, these two webparts are interconnected by SharePoint OOTB JavaScript engine.

&nbsp;

&nbsp;

[![searchwebpartconnection-refinementwebpart](https://blog.josequinto.com/wp-content/uploads/2015/08/searchwebpartconnection-refinementwebpart_thumb.jpg "searchwebpartconnection-refinementwebpart")](https://blog.josequinto.com/wp-content/uploads/2015/08/searchwebpartconnection-refinementwebpart.jpg)

&nbsp;

You can see an extended explanation about **Search.clientcontrols.js** here: [https://blog.josequinto.com/2015/07/01/sharepoint-2013-javascript-search-files-classes-reference-refinement-web-part-classes-in-detail/](https://blog.josequinto.com/2015/07/01/sharepoint-2013-javascript-search-files-classes-reference-refinement-web-part-classes-in-detail/ "https://blog.josequinto.com/2015/07/01/sharepoint-2013-javascript-search-files-classes-reference-refinement-web-part-classes-in-detail/")

You can see some examples about URL Query String (hash) usage in Paul Ryan blog: [http://paulryan.com.au/2015/dynamically-generating-search-result-page-urls/](http://paulryan.com.au/2015/dynamically-generating-search-result-page-urls/ "http://paulryan.com.au/2015/dynamically-generating-search-result-page-urls/")

&nbsp;

&nbsp;

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)