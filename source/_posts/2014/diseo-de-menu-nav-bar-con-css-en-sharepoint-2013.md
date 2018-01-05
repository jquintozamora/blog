---
layout: post
title: Three level CSS Navigation Menu for SharePoint 2013
language: English
permalink: diseo-de-menu-nav-bar-con-css-en-sharepoint-2013
id: 200
categories:
    - Code-Reminder
tags:
  - Branding
  - CSS
  - SharePoint
  - SharePoint 2013
date: 2014-08-04 15:46:33
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
This post is intended to show how to customize a SharePoint 2013 navigation menu with 3 levels using CSS.

![image](./image.png)

## Master Page
We've to add this code to our master page:

```xml
<!-- ===== STARTER: Global navigation ================== -->
<div class="globalMenuNavigation">
    <SharePoint:AjaxDelta ID="DeltaTopNavigation" BlockElement="true" CssClass="ms-displayInline ms-core-navigation ms-dialogHidden" runat="server">
        <SharePoint:DelegateControl runat="server" ControlId="TopNavigationDataSource" Id="topNavigationDelegate">
            <Template_Controls><asp:SiteMapDataSource ShowStartingNode="False" SiteMapProvider="SPNavigationProvider" id="topSiteMap" runat="server" StartingNodeUrl="sid:1002"/></Template_Controls>
        </SharePoint:DelegateControl>

        <SharePoint:AspMenu ID="TopNavigationMenu" Runat="server" EnableViewState="false" DataSourceID="topSiteMap" AccessKey="<%$Resources:wss,navigation_accesskey%>" UseSimpleRendering="true" UseSeparateCss="false" Orientation="Horizontal" StaticDisplayLevels="2" AdjustForShowStartingNode="true" MaximumDynamicDisplayLevels="2" SkipLinkText="" />
    </SharePoint:AjaxDelta>
</div>
```

After server response this HTML code is returned:

```html
<div class="globalMenuNavigation">
    <div id="DeltaTopNavigation" class="ms-displayInline ms-core-navigation ms-dialogHidden">
        <div id="zz12_TopNavigationMenu" class=" noindex ms-core-listMenu-horizontalBox">
            <span class="additional-background ms-navedit-flyoutArrow">
                <span class="menu-item-text">
                    <a href="/">Link 1.1</a>
                </span>
            </span>
            <span aria-haspopup="true" class="additional-background ms-navedit-flyoutArrow dynamic-children">
                <span class="menu-item-text">
                    <a href="/">Link 1.2</a>
                </span>
            </span>
            <span class="additional-background ms-navedit-flyoutArrow">
                <span class="menu-item-text">
                    <a href="/team-sites/ito-team-site">Link 1.2.1</a>
                </span>
            </span>
        </div>
    </div>
</div>
```
> Note: It's always good to have this rendered code in order to see how to customize the CSS to achieve out goal.

## Code

```css
/******************************************
    NAV MENU</span>
*******************************************/
.globalMenuNavigation, 
.ms-core-navigation,
.ms-core-listMenu-horizontalBox,
.ms-core-listMenu-horizontalBox ul,
.ms-core-listMenu-horizontalBox ul li,
.ms-core-listMenu-horizontalBox ul li a
{
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
    line-height: 1;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.globalMenuNavigation, 
.ms-core-navigation, 
.ms-core-listMenu-horizontalBox, 
.ms-core-listMenu-horizontalBox > ul
{
    height: 34px;
    display:block;
}
.ms-core-listMenu-horizontalBox > ul > li,
.ms-core-listMenu-horizontalBox > ul > li > a
{
    height: 34px;
    vertical-align: middle;
}

/*Disable the inline link editing menu*/
.ms-core-listMenu-horizontalBox > .ms-core-listMenu-root > .ms-listMenu-editLink 
{
    display:none;
}
.ms-core-listMenu-horizontalBox ul, .ms-core-listMenu-horizontalBox li
{
    display:block;
}

/*Level 1*/
.ms-core-listMenu-horizontalBox li.static > .ms-core-listMenu-item
{
    margin-right:0px !important;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root 
{
    position:relative;
    z-index:10;
    padding-left:0px;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root > li 
{
    font-weight:bold;
    float:left;
    position:relative;
    padding:0px;
    margin:0px;
    padding-top: 10px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 0px;
    z-index:10;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root > li.selected
{
    background-color: #A1A1A1;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li a, 
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li a.selected 
{
    color: white;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li a.parent 
{
    padding-right:25px;
    position:relative;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root > li:hover 
{
    box-shadow: inset 0px -3px 0px rgba(0, 114, 198, 1);
    background-color: #A1A1A1;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root > li:hover > a 
{
    text-decoration:none;
    color:#FFF !important;
}

/*Level 2*/
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li:hover ul 
{
    display: block;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li:hover ul ul 
{
    display: none;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul 
{
    display:none;
    width:200px !important;
    position:absolute;
    top:0;
    margin-top:0px;
    left:0px !important;
    padding:0px;
    list-style:none;

    background: #A1A1A1;
    background-image:url('../menu_bg.png');
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul li 
{
    font-weight:normal;
    height: 34px;
    line-height: 34px;
    vertical-align: middle;
    padding-left: 10px;
    padding-top: 10px;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul.dynamic li 
{
    color: white;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul li:hover 
{
    background:#FFF;
    border-left:5px solid #0072C6;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li ul li:hover > a 
{
    color:#A1A1A1;
}

/*Level 3 */
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul li ul 
{
    display:none;
    left:100%;
    top:0;
    padding-left:0px;
    margin:-2px 0 0 100%;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root li ul li:hover ul 
{
    display: block;
}
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul li ul li a,
.ms-core-listMenu-horizontalBox ul.ms-core-listMenu-root ul li ul li a.selected 
{
    color: white;
}
```

> Note we are hiding the `Edit Links` button
