---
title: >-
  Custom JavaScript function loaded after the UI has been loaded [onLoad] in
  SharePoint 2013
tags:
  - English
url: 388.html
id: 388
categories:
  - javascript
  - OnLoad
  - SharePoint 2013
date: 2015-06-16 09:28:39
---

Hi there,

If you are a SharePoint front-end developer, like me : ) , it is really important to understand the client life cycle (in terms of JavaScript Browser-engine, DOM, etc…).

In fact, there are some cases in which we need to include our custom JavaScript functions and we CAN “decide” in what moment on this life cycle we want to add our code.

&nbsp;

First of all is good to know what happens internally when we, as a users, request a web page to a web server. Behind the curtains there is a lot of events like App Cache, DNS, TCP, Request, Response, Processing and OnLoad. All of the are executed by the browsers, see the below image:

[![image](https://blog.josequinto.com/wp-content/uploads/2015/06/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/06/image.png)

Source: [http://www.w3.org/TR/navigation-timing/#processing-model](http://www.w3.org/TR/navigation-timing/#processing-model "http://www.w3.org/TR/navigation-timing/#processing-model")

&nbsp;

As I remarked in the picture, in this post we are talking about the onLoad subprocess. In fact, when working with SharePoint 2013, there is a lot of events taking place in this subprocess. This is because SharePoint is becoming more JavaScript-oriented.

For example, there are a lot of OOTB SharePoint JavaScript files: see this post series: [http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/](http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/ "http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/").

&nbsp;

The main goal of this post, apart of refresh the basics of browser engines and processes, is to do a investigation (research task) about the different techniques used to provided our custom JavaScript code loaded before / in the middle / after OnLoad events in SharePoint.

We will see 8 different techniques evaluating pros and cons and finally we will do a test experiment with all of them.

&nbsp;

## Sys.Application.pageLoad

Sys.Application class belongs to _[ASP.NET AJAX library](http://msdn.microsoft.com/en-us/library/bb397536(v=VS.90).aspx), that_ is built into ASP.NET 3.5 and is automatically made available behind all pages in a SharePoint Farm. The events are related to the Sys.Application class, which provides a runtime object to take care of client events and to manage client components. This object provides access to all its members without creating an instance for it.

*   pageInit
*   pageLoad
*   pageUnload
*   Note that this class can be used because we have in our masterpage the asp:ScriptManager class:

<asp:ScriptManager ID="ScriptManager" runat="server" EnablePageMethods="false" EnablePartialRendering="true" EnableScriptGlobalization="false" EnableScriptLocalization="true" />

&nbsp;

You can simply call the **Sys.Application.add_load** method from <head> or <body> to register a function that will execute right after the HTML elements on the page have been made accessible through the DOM.

Example of usage:
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">
Sys.Application.add_load(MyLoad);
function MyLoad()
{
   console.log("Sys.Application.pageLoad. Time: " + ((Date.now()) - performance.timing.navigationStart));        
}

</pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

Source: [http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser](http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser "http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser")

&nbsp;

&nbsp;

## Sys.WebForms.PageRequestManager.pageLoaded

This class is responsible for **partial post back**. This object will be initiated on its own, to get this object in client side, the page should have a ScriptManager and minimum one UpdatePanel. This object also has certain events which will be involved in the client page life cycle. The full name of the class along with the namespace is Sys.WebForms.PageRequestManager. Let us see the events related to this:

&nbsp;
*   initializeRequest
*   beginRequest
*   pageLoading
*   pageLoaded
*   endRequest
*   The **pageLoaded** event is raised after all content on the page is refreshed, whether it was refreshed because of a synchronous (full-page) postback or an asynchronous postback. You can use this event to provide a custom transition effect for updated content.

Note that this is the SharePoint UpdatePanel control:
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="xhtml">

</pre>
<div id="WebPartAdderUpdatePanelContainer">…</div>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

Here an example of usage:
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MyPageLoaded);
function MyPageLoaded(sender, args)
{
    console.log("Sys.WebForms.PageRequestManager.PageLoaded. Time: " + ((Date.now()) - performance.timing.navigationStart));
}

</pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

Source: [https://msdn.microsoft.com/en-us/library/bb397523(v=vs.100).aspx](https://msdn.microsoft.com/en-us/library/bb397523(v=vs.100).aspx "https://msdn.microsoft.com/en-us/library/bb397523(v=vs.100).aspx") and [http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser](http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser "http://www.codeproject.com/Articles/26033/The-Page-Life-Cycle-of-Client-Browser")

&nbsp;

&nbsp;

## jQuery(document).ready

This technique relies on [The jQuery Library](http://www.jquery.com/) and it is the technique that most Web designers and developers prefer but in my opinion we should evaluate carefully its usage. It will depends on the other needs we have because this technique depends upon a library that is not automatically integrated into the pages in a SharePoint site.

NOTE: You need to have jQuery library to use this technique.

&nbsp;
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js"><script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js" type="text/javascript"></script><script type="text/javascript">// <![CDATA[
    jQuery(document).ready(jqueryLoad);
    function jqueryLoad(){
        console.log("document.ready Jquery. Time: " + ((Date.now()) - performance.timing.navigationStart));
    }
// ]]></script></pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

&nbsp;

&nbsp;

## _spBodyOnLoadFunctionNames and _spBodyOnLoadFunctions

Pages in a SharePoint environment load in a set of JavaScript files for a JavaScript library which goes by the name of the _SharePoint JavaScript Class Library (JSOM). _This library contains more than 160 js files ([http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/](http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/ "http://www.spcaf.com/blog/sharepoint-javascript-context-dev-part-1/")).

One of them is named **init.js** which contains a global variables named **_spBodyOnLoadFunctionNames and _spBodyOnLoadFunctions.**

In fact, if we go further and see init.js file, we can found the function named ProcessDefaultOnLoad() as follows:
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">
function ProcessDefaultOnLoad() {
    ProcessPNGImages();
    UpdateAccessibilityUI();
    UpdateAnimationUserControl(false);
    window.setTimeout('ProcessImn()', 10);
	ProcessOnLoadFunctionNames(_spBodyOnLoadFunctionNames);
    ProcessOnLoadFunctions(_spBodyOnLoadFunctions);
	if (typeof _spUseDefaultFocus != "undefined")
	DefaultFocus();
	//…
}

</pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

And that is really useful, because we can understand the order in which these functions are executed, first _spBodyOnLoadFunctionNames  and after that _spBodyOnLoadFunctions.

So, here we have example of usage:
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">
_spBodyOnLoadFunctionNames.push('OnPageLoad');
function OnPageLoad(){
    console.log("_spBodyOnLoadFunctionNames. Time: " + ((Date.now()) - performance.timing.navigationStart));
}

var raiseFunc = function(){
    console.log("_spBodyOnLoadFunction. Time: " + ((Date.now()) - performance.timing.navigationStart));
};
_spBodyOnLoadFunctions.push(raiseFunc);

</pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

Source: [http://www.cyberbrutus.com/cyberbrutus/javascript-execution-after-page-load-in-sharepoint/](http://www.cyberbrutus.com/cyberbrutus/javascript-execution-after-page-load-in-sharepoint/ "http://www.cyberbrutus.com/cyberbrutus/javascript-execution-after-page-load-in-sharepoint/")

&nbsp;

&nbsp;

## ExecuteOrDelayUntilScriptLoaded

`ExecuteOrDelayUntilScriptLoaded` run after internal SharePoint scripts are loaded. This function allows to wait until one of SharePoint js files is loaded.

&nbsp;
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">ExecuteOrDelayUntilScriptLoaded(MyFunction, "sp.core.js");
function MyFunction(){
    console.log("ExecuteOrDelayUntilScriptLoaded:sp.core.js. Time: " + ((Date.now()) - performance.timing.navigationStart));
}</pre>
&nbsp;

</div>
</div>
</div>
&nbsp;

More information: [http://yakovenkomax.com/sharepoint-2013-page-load-events/](http://yakovenkomax.com/sharepoint-2013-page-load-events/ "http://yakovenkomax.com/sharepoint-2013-page-load-events/")

&nbsp;

&nbsp;

## SP.SOD.executeFunc

Make sure the SharePoint script file ‘SP.js’ is loaded before your code is executed.
<pre>function sharePointReady(){
    console.log("SP.SOD.executeFunc: sp.js. Time: " + ((Date.now()) - performance.timing.navigationStart));
}
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

</pre>
&nbsp;

## ExecuteOrDelayUntilBodyLoaded

ExecuteOrDelayUntilBodyLoaded runs **before** internal SharePoint scripts are loaded. It runs at early stage in the OnLoad subprocess.

&nbsp;
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<div id="codeSnippetWrapper">
<pre class="js">ExecuteOrDelayUntilBodyLoaded(delayBody);
function delayBody(){
    console.log("ExecuteOrDelayUntilBodyLoaded. Time from NavStart: " + ((Date.now()) - performance.timing.navigationStart));
}</pre>
&nbsp;

</div>
<!--CRLF-->

</div>
</div>
&nbsp;

&nbsp;

You can download the full JS file with all techniques implemented here: [https://blog.josequinto.com/wp-content/uploads/2015/06/JavaScriptCustomOnLoadFunctionInSharePoint2013.js](https://blog.josequinto.com/wp-content/uploads/2015/06/JavaScriptCustomOnLoadFunctionInSharePoint2013.js "https://blog.josequinto.com/wp-content/uploads/2015/06/JavaScriptCustomOnLoadFunctionInSharePoint2013.js")

&nbsp;

&nbsp;

[adrotate banner="1"]

##

## Experiment and Results

In order to discover which technique is better for each scenario, we can add all of them into a SharePoint Page and let’s see the execution order.

I did two tests, one in a SharePoint On Prem environment using a Empty Team Site and other in a SharePoint Online environment using custom template based on publishing template.

&nbsp;

Load times in ms
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="325">**Empty SharePoint 2013 - OnPremise + IE10**</td>
<td valign="top" width="64">Run 1</td>
<td valign="top" width="64">Run 2</td>
<td valign="top" width="143">Run 3 (Clean Cache)</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilBodyLoaded.</td>
<td valign="top" width="64">148</td>
<td valign="top" width="64">147</td>
<td valign="top" width="143">122</td>
</tr>
<tr>
<td valign="top" width="325">Sys.Application.pageLoad.</td>
<td valign="top" width="64">148</td>
<td valign="top" width="64">148</td>
<td valign="top" width="143">123</td>
</tr>
<tr>
<td valign="top" width="325">document.ready Jquery.</td>
<td valign="top" width="64">154</td>
<td valign="top" width="64">152</td>
<td valign="top" width="143">126</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunctionNames.</td>
<td valign="top" width="64">519</td>
<td valign="top" width="64">452</td>
<td valign="top" width="143">247</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunction.</td>
<td valign="top" width="64">531</td>
<td valign="top" width="64">463</td>
<td valign="top" width="143">261</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilScriptLoaded:sp.core.js.</td>
<td valign="top" width="64">539</td>
<td valign="top" width="64">471</td>
<td valign="top" width="143">310</td>
</tr>
<tr>
<td valign="top" width="325">SP.SOD.executeFunc: sp.js.</td>
<td valign="top" width="64">574</td>
<td valign="top" width="64">580</td>
<td valign="top" width="143">357</td>
</tr>
<tr>
<td valign="top" width="325">Sys.WebForms.PageRequestManager.PageLoaded.</td>
<td valign="top" width="64">840</td>
<td valign="top" width="64">736</td>
<td valign="top" width="143">791</td>
</tr>
</tbody>
</table>
&nbsp;
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="328">**Empty SharePoint 2013 - OnPremise + Chrome 43.0**</td>
<td valign="top" width="64">Run 1</td>
<td valign="top" width="64">Run 2</td>
<td valign="top" width="141">Run 3 (Clean Cache)</td>
</tr>
<tr>
<td valign="top" width="328">ExecuteOrDelayUntilBodyLoaded.</td>
<td valign="top" width="64">199</td>
<td valign="top" width="64">239</td>
<td valign="top" width="141">156</td>
</tr>
<tr>
<td valign="top" width="328">Sys.Application.pageLoad.</td>
<td valign="top" width="64">210</td>
<td valign="top" width="64">251</td>
<td valign="top" width="141">165</td>
</tr>
<tr>
<td valign="top" width="328">document.ready Jquery.</td>
<td valign="top" width="64">217</td>
<td valign="top" width="64">263</td>
<td valign="top" width="141">174</td>
</tr>
<tr>
<td valign="top" width="328">**SP.SOD.executeFunc: sp.js.**</td>
<td valign="top" width="64">506</td>
<td valign="top" width="64">**628 **</td>
<td valign="top" width="141">359</td>
</tr>
<tr>
<td valign="top" width="328">_spBodyOnLoadFunctionNames.</td>
<td valign="top" width="64">540</td>
<td valign="top" width="64">480</td>
<td valign="top" width="141">547</td>
</tr>
<tr>
<td valign="top" width="328">_spBodyOnLoadFunction.</td>
<td valign="top" width="64">557</td>
<td valign="top" width="64">495</td>
<td valign="top" width="141">559</td>
</tr>
<tr>
<td valign="top" width="328">ExecuteOrDelayUntilScriptLoaded:sp.core.js.</td>
<td valign="top" width="64">726</td>
<td valign="top" width="64">647</td>
<td valign="top" width="141">617</td>
</tr>
<tr>
<td valign="top" width="328">Sys.WebForms.PageRequestManager.PageLoaded.</td>
<td valign="top" width="64">1280</td>
<td valign="top" width="64">1291</td>
<td valign="top" width="141">1050</td>
</tr>
</tbody>
</table>
&nbsp;

&nbsp;

&nbsp;
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="325">**Publishing Custom - SP Online + Chrome 43.0**</td>
<td valign="top" width="64">Run 1</td>
<td valign="top" width="69">Run 2</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilBodyLoaded.</td>
<td valign="top" width="64">84</td>
<td valign="top" width="69">81</td>
</tr>
<tr>
<td valign="top" width="325">Sys.Application.pageLoad.</td>
<td valign="top" width="64">125</td>
<td valign="top" width="69">121</td>
</tr>
<tr>
<td valign="top" width="325">document.ready Jquery.</td>
<td valign="top" width="64">140</td>
<td valign="top" width="69">135</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunctionNames.</td>
<td valign="top" width="64">272</td>
<td valign="top" width="69">434</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunction.</td>
<td valign="top" width="64">278</td>
<td valign="top" width="69">438</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilScriptLoaded:sp.core.js.</td>
<td valign="top" width="64">501</td>
<td valign="top" width="69">652</td>
</tr>
<tr>
<td valign="top" width="325">SP.SOD.executeFunc: sp.js.</td>
<td valign="top" width="64">584</td>
<td valign="top" width="69">**628**</td>
</tr>
<tr>
<td valign="top" width="325">**Other loadings, AJAX, Yammer integration, …**</td>
<td valign="top" width="64"></td>
<td valign="top" width="69"></td>
</tr>
<tr>
<td valign="top" width="325">Sys.WebForms.PageRequestManager.PageLoaded.</td>
<td valign="top" width="64">1102</td>
<td valign="top" width="69">3777</td>
</tr>
</tbody>
</table>
&nbsp;
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="325">**Publishing Custom - SP Online + IE11**</td>
<td valign="top" width="64">Run 1</td>
<td valign="top" width="69">Run 2</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilBodyLoaded.</td>
<td valign="top" width="64">142</td>
<td valign="top" width="69">159</td>
</tr>
<tr>
<td valign="top" width="325">Sys.Application.pageLoad.</td>
<td valign="top" width="64">190</td>
<td valign="top" width="69">195</td>
</tr>
<tr>
<td valign="top" width="325">document.ready Jquery.</td>
<td valign="top" width="64">225</td>
<td valign="top" width="69">217</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunctionNames.</td>
<td valign="top" width="64">300</td>
<td valign="top" width="69">273</td>
</tr>
<tr>
<td valign="top" width="325">_spBodyOnLoadFunction.</td>
<td valign="top" width="64">303</td>
<td valign="top" width="69">276</td>
</tr>
<tr>
<td valign="top" width="325">ExecuteOrDelayUntilScriptLoaded:sp.core.js.</td>
<td valign="top" width="64">404</td>
<td valign="top" width="69">436</td>
</tr>
<tr>
<td valign="top" width="325">SP.SOD.executeFunc: sp.js.</td>
<td valign="top" width="64">513</td>
<td valign="top" width="69">**423**</td>
</tr>
<tr>
<td valign="top" width="325">Other loadings, AJAX, Yammer integration, …</td>
<td valign="top" width="64"></td>
<td valign="top" width="69"></td>
</tr>
<tr>
<td valign="top" width="325">Sys.WebForms.PageRequestManager.PageLoaded.</td>
<td valign="top" width="64">1950</td>
<td valign="top" width="69">3971</td>
</tr>
</tbody>
</table>
&nbsp;

Note that the times are collected using Navigation Timing provided by JavaScript: [http://www.w3.org/TR/navigation-timing/#introduction](http://www.w3.org/TR/navigation-timing/#introduction "http://www.w3.org/TR/navigation-timing/#introduction").

&nbsp;

&nbsp;

&nbsp;

## Conclusions

<span style="font-size: medium;">- ExecuteOrDelayUntilBodyLoaded function is always executed the first (but at this stage we can not access to SP methods). This could be usefull to execute our custom code at really earlier stage in the OnLoad process.</span>
<span style="font-size: medium;">- There are two SharePoint onLoad functions _**spBodyOnLoadFunctionNames** and _**spBodyOnLoadFunction**. Always executed in the order. SO, if we want to execute some code after all functions included by us (or other devs) in _spBodyOnLoadFunctionNames, then is useful to use this one _spBodyOnLoadFunction, because is executed the last.
</span>

<span style="font-size: medium;">-  </span>ExecuteOrDelayUntilScriptLoaded:sp.core.js and SP.SOD.executeFunc: sp.js. are swapping the order of execution in a random way.

&nbsp;

<span style="font-size: medium;">- If we want to execute some functions after all functions (SP, after load functions, Yammer, etc.) we can use this function to attach the OnLoad event --> **Sys.WebForms.PageRequestManager.PageLoaded.**</span>

&nbsp;

&nbsp;

<span style="font-size: medium;">**Note that these results are tested in my current scenario and probably isn’t the same that your scenario, but please feel free to add some conclusions, point of views, different scenarios, etc.**</span>

&nbsp;

<span style="font-size: medium;">Regards!</span>

HTH

[@jquintozamora](https://twitter.com/jquintozamora)
&nbsp;