---
title: How to invoke Ribbon button in SharePoint 2013 by using JavaScript
tags:
  - English
permalink: how-to-invoke-ribbon-button-in-sharepoint-2013-by-using-javascript
id: 331
categories:
  - javascript
  - Ribbon
date: 2015-01-30 18:48:37
---

Sometimes we need to emulate the behavior of Ribbon button from our custom webparts or automatically when onload the page.

If we need to emulate the click action of Ribbon buttons we should use this JavaScript code:

&nbsp;
<pre class="csharpcode">(function () {
    _spBodyOnLoadFunctionNames.push("emulateButtonFunction");
})();

function emulateButtonFunction()
{
       var instance = SP.Ribbon.PageManager.get_instance();
       if (instance)
           instance.get_commandDispatcher().executeCommand("Ribbon.ListForm.Edit.Actions.AttachFile", null);

}</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

&nbsp;

If you need to know what is the name of your desired button, please find here: [https://msdn.microsoft.com/en-us/library/office/ee537543(v=office.14).aspx](https://msdn.microsoft.com/en-us/library/office/ee537543(v=office.14).aspx "https://msdn.microsoft.com/en-us/library/office/ee537543(v=office.14).aspx") or [https://msdn.microsoft.com/en-us/library/office/bb802730(v=office.15).aspx](https://msdn.microsoft.com/en-us/library/office/bb802730(v=office.15).aspx "https://msdn.microsoft.com/en-us/library/office/bb802730(v=office.15).aspx")

Or in this path directory in front-end server: %ProgramFiles%\Common Files\Microsoft Shared\web server extensions\15\TEMPLATE\GLOBAL\XML\CMDUI.xml

&nbsp;

&nbsp;

References:

 - [https://social.msdn.microsoft.com/Forums/en-US/59662d9e-95ac-4ad0-a812-787d6e2bc425/possible-to-call-buttons-in-the-ribbon-with-javascript-jquery?forum=sharepointcustomizationprevious](https://social.msdn.microsoft.com/Forums/en-US/59662d9e-95ac-4ad0-a812-787d6e2bc425/possible-to-call-buttons-in-the-ribbon-with-javascript-jquery?forum=sharepointcustomizationprevious "https://social.msdn.microsoft.com/Forums/en-US/59662d9e-95ac-4ad0-a812-787d6e2bc425/possible-to-call-buttons-in-the-ribbon-with-javascript-jquery?forum=sharepointcustomizationprevious")

 - [https://social.msdn.microsoft.com/Forums/en-US/36a468a3-6787-435e-ab40-5f58ebe9024e/custom-action-for-out-of-the-box-attach-file-ribbon-button-not-working?forum=sharepointdevelopmentprevious](https://social.msdn.microsoft.com/Forums/en-US/36a468a3-6787-435e-ab40-5f58ebe9024e/custom-action-for-out-of-the-box-attach-file-ribbon-button-not-working?forum=sharepointdevelopmentprevious "https://social.msdn.microsoft.com/Forums/en-US/36a468a3-6787-435e-ab40-5f58ebe9024e/custom-action-for-out-of-the-box-attach-file-ribbon-button-not-working?forum=sharepointdevelopmentprevious")

&nbsp;

&nbsp;

Regards!

JQ

[@jquintozamora](https://twitter.com/jquintozamora)