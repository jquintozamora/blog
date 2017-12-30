---
layout: post
title: How to ApplyTheme using Gulp Task in  SharePoint Online Projects
language: English
permalink: how-to-applytheme-using-gulp-task-in-sharepoint-online-projects
id: 768
categories:
  - CSS
  - Gulp
  - Office 365
  - Theming engine
date: 2016-06-21 11:30:05
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction

This blog post will show you how to create a Gulp task in **Visual Studio 2015** intended to Apply a SharePoint theme with custom spcolor file. 

## Why do we need a Gulp task to Apply a SharePoint theme?

For example, if we are playing with our CSS files, changing some properties, classes, etc. and we want to see how it looks in SharePoint sites. Then, we have two options:

1. We are using custom [themable CSS files](https://msdn.microsoft.com/en-us/library/office/dn266906.aspx).

2. We are using custom CSS (non-themable)

Let’s assume we are using **themable css** in our **SharePoint Online** project, then playing, trying, and testing CSS classes is **tricky** because SharePoint, OOTB is using **Theming Engine** to convert our CSS to Themed CSS files (stored eventually under **/_catalogs/theme/Themed folder**). 

Let’s assume again, we are using** Gulp** as a **task manager** and we have our task to **compile LESS** files, **optimize** CSS, and **upload** it to SharePoint automatically (as you can see in my previous article: [Gulp tasks to compile LESS, optimize and upload CSS to SharePoint.](/2016/05/20/compile-optimize-and-watch-our-less-css-files-with-gulp-tasks-using-visual-studio-2015-in-our-sharepoint-online-solutions)

**Then here is the problem**, even if we upload to SharePoint our final CSS files, the final styles will not be applied because we have the original CSS, but not the converted CSS stored in Theme library (**/_catalogs/theme/Themed**). That means, **we need to Apply the theme using our SPColor file in order to get the converted themedcss files**.
 > **Important: **that applies if you are using the old theming engine, if you are using the new theming engine then all the conversion will be done in runtime instead as a background process. You can see more infomation here: [http://www.eliostruyf.com/using-new-theming-engine-sharepoint-online/](http://www.eliostruyf.com/using-new-theming-engine-sharepoint-online/ "http://www.eliostruyf.com/using-new-theming-engine-sharepoint-online/"). 

&nbsp;

## How to create Gulp task and use ApplyTheme method?

We will use REST web services to Apply theme from Gulp task. 

We will use a NPM plugin called [sp-request](https://www.npmjs.com/package/sp-request) to authenticate with SharePoint.

<script src="https://gist.github.com/jquintozamora/4c1d782fbeef3d508239d3449d5f2a0e.js"></script> 

&nbsp;

## Important Notes
- We must **include in our package.json** “**sp-request**” dev dependency: **"sp-request": "^1.1.3"**

- **colorPaletteUrl** requires the site collection relative url to work fine.
