---
title: Create Quick Links toggle lateral panel with jQuery
tags:
  - English
url: 161.html
id: 161
categories:
  - Branding
  - CSS
  - javascript
  - jQuery
date: 2014-07-03 14:57:04
---

Today, I ‘d like to share with how to make a toggle panel using HTML, CSS and jQuery.

After days researching and googling about this topic, I’m really happy with this solution because have clear design, contains fixed area and hyperlinks whatever you want. Even, you can integrate that in SharePoint environment using Client-side rendering if you want. See the below image:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/07/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/07/image.png)&nbsp;&nbsp;&nbsp; [![image](https://blog.josequinto.com/wp-content/uploads/2014/07/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/07/image1.png)

The head markup (file to include):

<pre class="xhtml">    
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">    
	<title> Toggle Panel Example</title>
	<script class="rs-file" src="js/jquery-1.11.1.min.js"></script>
	<script type= "text/javascript" src= "js/toogle-panel.js"></script>
	<link type="text/css" href="css/toggle-panel.css" rel="stylesheet">
</head>
</pre>

&nbsp;

The Markup:

<pre class="xhtml">

<div id="togglePanelMain">
   <!-- Panel activation button -->
    <div id="togglePanelSwitcher" >
        <div class="togglePanelSwitcherText">
            Quick
        </div>
        <div id="togglePanelSwitcherButtonContainer">
            ![](css/toggle-arrows.png)
        </div>
        <div class="togglePanelSwitcherText">
            Links
        </div>
    </div>
   <!-- toggle panel -->
    <div id="togglePanelContainer">
        <div class="togglePanelTitle">Quick Links Title</div>
        <div class="togglePanelBody" >
            <div class="togglePanelLinkContainer" >
                [LinkTitle](http://linkurl)
            </div>
        </div>
        <div class="togglePanelBody" >
            <div class="togglePanelLinkContainer" >
                [Link Title 1 for now is working](http://linkurl)
            </div>
        </div>
    </div>
<div>
</pre>

&nbsp;

CSS:

<pre class="csharpcode">#togglePanelMain
{
    top: 100px; 
    right: -402px; 
    width: 380px;
    min-height: 213px;
    position: fixed; 
    z-index: 9999;

    background-color: white; 
    border: 1px #888a8b solid;

    color: #d0d3d5;

    /* be care modifying that, could affect to overall design */
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;

    text-align: left; 
}
#togglePanelSwitcher
{
    top: -1px; 
    left: -25px;
    width: 25px; 
    height: 195px; 
    position: absolute; 
    z-index: 9999; 
    /*background: url("toggle.png") no-repeat center rgb(0, 0, 0); */
    background-color: #888a8b;

    display: block; 
    cursor:pointer;

    /* remove onfocus border */
    outline: none;

    text-align: center;
    padding-top: 5px;
    padding-bottom: 15px;
    overflow: hidden;

}
#togglePanelSwitcher:hover
{
    color: white;
    font-weight: bold;
}
.togglePanelSwitcherText
{
    word-wrap: break-word;
    text-transform: uppercase;
    width: 8px;
    text-align: center;
    margin-left: 8px;
    font-family: "Segoe UI","Segoe",Tahoma,Helvetica,Arial,sans-serif; 
    font-size: 12px; 
    padding-bottom: 5px;
    padding-top: 5px;

}
#togglePanelSwitcherButton
{
    position: absolute;
}
#togglePanelSwitcherButtonContainer
{
    position: relative;
    height: 25px;
}

#togglePanelContainer
{
    padding: 0px 0px 0px 0px;
}
.togglePanelTitle
{
    margin-top: 5px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    color: black;
    font-family: "Segoe UI","Segoe",Tahoma,Helvetica,Arial,sans-serif; 
    font-size: 12px;
    border-bottom: 1px black dashed;

}
.togglePanelLinkContainer
{

    padding-top: 2px;
    padding-bottom: 4px;
}
.togglePanelLinkA
{
    font-family: "Segoe UI","Segoe",Tahoma,Helvetica,Arial,sans-serif; 
    font-size: 12px;
    padding-left: 5px;
    display: block;
    width: 100%;
}
.togglePanelLinkContainer:hover 
{
    background-color: #C40C00;
}
.togglePanelLinkContainer:hover a
{
    color: white !important;
}

</pre>

&nbsp;

JavaScript (jQuery):

<pre class="csharpcode">

$(document).ready(function() {

    var panel = $('#togglePanelMain'),
    button = $('#togglePanelSwitcher'),
    imgButton = $('#togglePanelSwitcherButton');

    function first(e) {
       //Code for first time click goes here
        e.preventDefault();
        panel.stop().animate({right: 0},200, function(){});
        imgButton.stop().animate({left: -25},200, function(){});
        $(this).one("click", second);
    }
    function second(e) {
       //Code for second time click goes here
        e.preventDefault();
        panel.stop().animate({right: -402},200, function(){});
        imgButton.stop().animate({left: 0},200, function(){});
        $(this).one("click", first);
    }

    button.one("click", first);

});
</pre>

Note: Using jQuery 1.11.x we need to change the way on we working with .toggle function, because it is not supported to use toggle with two functions, so in the above code toggle function was replaced by first and second functions.

You can download full project here: [Toogle-Lateral-Panel-Links](https://blog.josequinto.com/wp-content/uploads/2014/07/toogle-lateral-panel-links.zip "Toogle-Lateral-Panel-Links")

&nbsp;

Hope that helps!

Regards!

JQ

@jquintozamora