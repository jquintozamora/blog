---
layout: post
title: Compile, optimize and watch our LESS / CSS files with Gulp tasks using Visual Studio 2015 in our SharePoint Online solutions
language: English
permalink: compile-optimize-and-watch-our-less-css-files-with-gulp-tasks-using-visual-studio-2015-in-our-sharepoint-online-solutions
id: 753
categories:
  - Article
  - Architecture-Concept
  - Concept-Explained
  - Download-Project
tags:
  - CSS
  - Gulp
  - LESS
  - Node
  - Node.js
  - Office 365
  - SharePoint Online
date: 2016-05-20 15:05:59
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
When we are working on **SharePoint **(or **Office 365**) projects, eventually you need to integrate custom **CSS, HTML, JavaScript** within SharePoint components. I remember my first projects with SharePoint 2007 where we coded server components with C# or VB and it were really hard to integrate custom CSS and JavaScript in our solutions. But since a time ago, developing custom components for SharePoint OnPrem or Online becomes increasingly standard, from the viewpoint of the Web Development standards.

Anyway, if we need to include custom CSS files in our solution. We can do it in several ways:
*   Including CSS file with **Custom Action**
*   Including CSS file in a **custom Master Page**
*   Including CSS as an **Alternate CSS**
*   And more…

This article is not about what is the best way to include CSS in our projects, neither how to integrate themable CSS in our solutions, this article is about how to integrate **LESS**, **Node.js** and **Gulp** in our **SharePoint Online Solutions** using **Visual Studio 2015.**

## Old approach
Ordinarily, we create our **LESS** files and rely on **Visual Studio Web Essentials** to compile LESS files into the final CSS. There are couple of cons with this approach:

1.  If you have a LESS file that **depends** **on other**, you always need to save the last one, even if the changes were done in other. I mean, imagine we have Layouts.less and MasterPage.less. Inside **MasterPage.less **we have **@import "Layouts.less";** so the final file (after compiling LESS) called MasterPage.css will be the combination of Layouts and MasterPage. Imagine you change some classes in Layout.less, and **Web Essentials automatically compiles Layous.less file for you**, but Web Essentials** is not able to see the dependency of MasterPage and therefore MasterPage.less is not compiled automatically unless you open add some useless char and save it.**
2.  You cannot configure Web Essentials to do some extra tasks after compiling, like **CSS optimization, upload files to SharePoint,** etc.

One of the things I like of **Gulp** is that has been used for Web Developers a long time and you have a lot of free and good plugins. Because that, you can use **Gulp tasks** and modules to **compile**, **optimize** and **upload to SharePoint** the results of your LESS files, which is really good in terms of **productivity**. Note that if you use VS 2015, you will benefit from **Task Runner Explorer** (to manage **Gulp** **directly in UI**) and **Node.js integration**.

We will show a sort of starter template for LESS, Node.js and Gulp together to integrate in SharePoint projects. Let's start with the Folder Structure and after that we will see step by step how to create all files.

## Folder Structure
This is an example of Folders Structure in our SharePoint Project:

[![image](./image-7.png "image")](./image-7.png)

Some note aside this folder structure:

*   Note that this is a **basic example**, in a real SharePoint project there will be more folders, modules, features, etc.
*   There are 5 less files behind Styles/LESS folder:

    *   **JQ.Extensions.Foundation.less** is the CSS provided by Foundation framework that helps us to provide responsive, multi columns layout, etc.
    *   **JQ.Globals.less** is where we define global variables
    *   **JQ.MasterPage.less** is the main file that will be included in our SharePoint pages.
    *   **JQ.Responsive.less** is a file used exclusively to create responsive classes. That will be imported in MasterPage.less.
    *   **JQ.Themable.less** is a file used for Themable CSS that will be integrated in SharePoint Theme Feature.
    *   **JQ.Themable.Responsive.less** is used for providing responsive styles and media queries for Themable CSS.
    *   This is an example, I am pretty sure we will have in our projects more files like: Common, WebParts, …

*   **Output** folder used to store the result of compiling and optimizing LESS with Gulp tasks.
*   **Elements.xml** where we will configure the files to be uploaded to SharePoint in the wsp package. In this case will be **JQ.MasterPage.min.css **and **JQ.Themable.min.css**.
*   **package.json** to configure NPM tool and install our desired packages (luckily VS 2015 understands this format)
*   **gulpfile.js** where will be created Gulp tasks (VS 2015 also reads this file and provide us UI interface to manage them called **Task Runner Explorer**).
*   **gulp.config.js** is used by gulpfile.js to get all the configurations needed. (this is some kind of standard as you can see in the John Papa gulp patterns ([https://github.com/johnpapa/gulp-patterns](https://github.com/johnpapa/gulp-patterns)).
&nbsp;

## Configure NPM and package.json

VS 2015 automatically runs **NPM** every time we save changes in the **package.json** file located at the root folder of our project (SharePoint project as well).

**I highly recommend you [upgrade NPM version used by VS 2015](/2016/05/04/how-to-configure-visual-studio-2015-integration-with-latest-version-of-node-js-and-npm)**.

Let’s see how to **create a new package.json** file in our project:

Right click on the project, Add New Item and Create a file called package.json (there is a template called NPM configuration file)

[![clip_image002](./clip_image002-2.png "clip_image002")](./clip_image002-2.png)

This is how the template looks:

[![clip_image003](./clip_image003.png "clip_image003")](./clip_image003.png)

Because this post is about how to compile, optimize and upload LESS these are the required packages to install as a devDependencies:

&nbsp;

<script src="https://gist.github.com/jquintozamora/2228079ee4d1950a4de04c03e37b723a.js"></script>

[![clip_image004](./clip_image004.png "clip_image004")](./clip_image004.png)

Ofter you create and just when you save the package.json file, you can see in the **Bower/npm console** when you have the file package.json, how the packages are installed.

[![clip_image005](./clip_image005.png "clip_image005")](./clip_image005.png)

[![clip_image006](./clip_image006.png "clip_image006")](./clip_image006.png)

[![clip_image007](./clip_image007.png "clip_image007")](./clip_image007.png)

Also, we will see a new folder called "**node_modules**" in our project (check Show all files button in the **Solution Explorer**).

[![clip_image008](./clip_image008.png "clip_image008")](./clip_image008.png)

You can also see the folder in the **file system**:

[![clip_image009](./clip_image009.png "clip_image009")](./clip_image009.png)

Good stuff! Now, we have configured **NPM integration with VS 2015**!

Let’s see how to introduce Gulp in this scenario.

&nbsp;

## What is Gulp

From gulp site ([https://github.com/gulpjs/gulp](https://github.com/gulpjs/gulp)):

> "gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow."

In other words, **Gulp is a task manager**. I like it because it have **tons of free plugins** or **NPM packages** to integrate with. And because it is **integrated in VS 2015 using the Task Runner Explorer**:

[![clip_image010](./clip_image010.png "clip_image010")](./clip_image010.png)

We will see later on this post how **Task Runner Explorer** works and how can **we manage gulp tasks within it**.

&nbsp;

## Create Gulp file in VS 2015

We already have **Gulp** installed because we installed via **NPM and package.json file**.

We are going to create a file called **gulpfile.js** at the root folder of the project

Right click on the project, Add new Item, type gulp in search box and you can see the template called "Gulp configuration file".

[![clip_image011](./clip_image011.png "clip_image011")](./clip_image011.png)

**gulpfile.js MUST be at root folder in the project:**

[![clip_image012](./clip_image012.png "clip_image012")](./clip_image012.png)

This is how your first gulpfile.js file looks:

[![clip_image013](./clip_image013.png "clip_image013")](./clip_image013.png)

If we use **require('gulp')** in our gulpfile.js file, then the gulp plugin will be imported to use in our code. But we will need to have gulp installed on this project folder (under **node_modules**) but this is no problem because we did it before using the **package.json file devDependencies: “gulp”: “3.9.1”.**

For this specific example, this is our gulpfile.js sample file, used to compile, optimize and upload LESS / CSS files to SharePoint Online:

<script src="https://gist.github.com/jquintozamora/3158fc93a879cfce8c12e4e79c55ce6e.js"></script>

I'd like to clarify some **gulp concepts** and **functions** used in this code:

### General concepts of Gulp

*   **require**: this keyword is used to import a module (npm module for example).

*   **gulp.task** function creates task to be **executed** **on** **demand** or attached to **before build**, **after build**, **clean** or **project** **open** events. More information here: [https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn) or [https://gulp.readme.io/docs/gulptaskname-fn](https://gulp.readme.io/docs/gulptaskname-fn)

*   **gulp.src** function defines source files to use in the gulp **pipeline**. More info: [https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) and [https://gulp.readme.io/docs/gulpsrcglobs-options](https://gulp.readme.io/docs/gulpsrcglobs-options)

*   **.pipe** function:
The whole build system of Gulp is based on a **streams concept**. Gulp provides a ‘starting stream’, which you create via **gulp.src**. It takes a path as an input and returns a stream of (virtual) files as an output. All you do then using** .pipe()** is passing this output as an input of a **transformation**, which takes a stream of virtual files as an input and returns transformed virtual files as an output.

On the ‘end’ side of this transformation is **gulp.dest** - it takes a stream of virtual files as an input and writes a real ones as the output in a directory specified as parameter of this transformation. That means **each task should consist of a sequence of stream transformations ended with a final gulp.dest transformation**. Source: [http://blog.arkency.com/2015/03/gulp-modern-approach-to-asset-pipeline-for-rails-developers/](http://blog.arkency.com/2015/03/gulp-modern-approach-to-asset-pipeline-for-rails-developers/)

*   **gulp.watch** function are used to watch files and do something when a file changes. More info here: [https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb) or [https://gulp.readme.io/docs/gulpwatchglob-opts-fn](https://gulp.readme.io/docs/gulpwatchglob-opts-fn)

*   The way gulp implements **dependency** **between** **tasks** is by adding array of dependencies in the task definition for example: gulp.task("css-upload-to-sharepoint", **['css-optimize']**, function () {…}); defines "css-upload-to-sharepoint" task but force to execute "css-optimize" task before.

### Functions and 3rd party plugins

*   **gulp-load-plugins** ([https://www.npmjs.com/package/gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)) plugin will be used to lazy load the plugins on demand. Then we need to use the "$." before the name of the module when we want to use them i.e. $.less().

*   We can use **functions inside a gulp task**. i.e. The function **uploadToSharePoint** is used in order to upload separately the normal CSS file and the themed one inside the same task.

*   **require('./gulp.config')();** will load all configuration settings stored in a separate file called "gulp.config.js". Note this is some kind of standard as you can see in the John Papa gulp patterns ([https://github.com/johnpapa/gulp-patterns](https://github.com/johnpapa/gulp-patterns)).

*   **gulp-ccso** plugin is intended to minify and optimize the CSS file. [https://www.npmjs.com/package/gulp-csso](https://www.npmjs.com/package/gulp-csso)

*   **gulp-print** plugin is used to print names of files to the console so that you can see what's going through the the gulp pipe. [https://www.npmjs.com/package/gulp-print](https://www.npmjs.com/package/gulp-print)

*   **gulp-less** plugin is intended to compile LESS files into CSS. [https://www.npmjs.com/package/gulp-less](https://www.npmjs.com/package/gulp-less)

*   **gulp-autoprefixer** plugin is intended to add some tags in the css to made it compatible with more browsers. [https://www.npmjs.com/package/gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

*   **gulp-spsave** plugin is used to to upload files to SharePoint. If you want read more, you can read Vard post here: [http://www.vrdmn.com/2016/05/simple-bundle-minify-and-upload-js-to.html](http://www.vrdmn.com/2016/05/simple-bundle-minify-and-upload-js-to.html)

*   **<binding BeforeBuild='css-optimize' />** that line is very important to indicate to VS 2015 the task "css-optimize" must be executed **before build** the project.


## Create Gulp configuration file in VS 2015

Let's create a configuration file, because we will need some place where we can put the configuration parameters for out gulp file. There are lots of ways to do that, but my preferred one is just create a separated JS file called "gulp.config.js" which is sort of standard in web development world.

[![clip_image014](./clip_image014.png "clip_image014")](./clip_image014.png)

<script src="https://gist.github.com/jquintozamora/1c6982e3ab00c982cad973f78c65706f.js"></script>

In this example we must note:

*   **This isn't .json file, it is .js instead**. The reason is because we want to use the parameters as a function directly.
*   In the UserConfig you should put you **LocalMachineUser** and tenant information. This will be used by **gulp-spsave** plugin.

I highly **recommend** **John Papa's Gulp course**: [https://www.pluralsight.com/courses/javascript-build-automation-gulpjs](https://www.pluralsight.com/courses/javascript-build-automation-gulpjs)

## How to manage gulp tasks using Task Runner Explorer in VS 2015

You can view **Task Runner Explorer** using View menu in **Visual Studio 2015**:

[![clip_image015](./clip_image015.png "clip_image015")](./clip_image015.png)

Once enabled, this is how **Task Runner Explorer** looks:

[![clip_image016](./clip_image016.png "clip_image016")](./clip_image016.png)

**Note** that Task Runner Explorer uses the current project **gulpfile.js** (**MUST** be in the root folder of the project) to analyse it and provide the **Tasks and Bindings Views**.

In the **Bindings view** we can see how the task **"css-optimize"** is configured to run **before** building the project.

In the **Tasks view** you can configure **Bindings** and we also can run gulp talks by clicking right button and "**Run**":

[![clip_image017](./clip_image017.png "clip_image017")](./clip_image017.png)

### Run css-optimize task

If we run the **"css-optimize"** task we see how gulp runs **two** **tasks**, first **"less-compile"** and second **"css-optimize"** as the first one is dependent on the second one:

[![clip_image018](./clip_image018.png "clip_image018")](./clip_image018.png)

You can see how **VS opens** a **screen** to allow us to **follow the process**. We can see names of the files in pink because we used gulp-print plugin to show them.

After running this tasks we will generate 4 files in Output directory (**JQ.MasterPage.css, JQ.MasterPage.min.css, JQ.Themable.css and JQ.Themable.min.css**) as we indicated on gulp configuration file.

&nbsp;

### Run css-upload-to-sharepoint task

As we have three tasks and two dependencies, then if we execute **css-upload-to-sharepoint**, then will be executed css-optimize and therefore will be executed "less-compile" because how are configured the dependencies. So, if we have changed some **LESS** files and we want to update the file into SharePoint the only thing to do is right click on the task and Run:

[![clip_image019](./clip_image019.png "clip_image019")](./clip_image019.png)

You can see in the console all the process.

And if you navigate to your site you can see **two files** uploaded to **Styles** and **en-us/Themable** folders inside Style Library in our **SharePoint Online (or OnPrem**).

[![clip_image020](./clip_image020.png "clip_image020")](./clip_image020.png)

[![clip_image021](./clip_image021.png "clip_image021")](./clip_image021.png)

&nbsp;

### Run watcher-less task

**Watcher-less task is intended to listen all LESS files** (update event) and when some of these files are modified, then it will run "**css-upload-to-sharepoint"** task.

If you run watcher-less task you can see how one console appears and keep running listening to changes in LESS files:

[![clip_image022](./clip_image022.png "clip_image022")](./clip_image022.png)

Now, If you change a LESS file you can see how the task runs! **This is magic!!**

&nbsp;

## Include Output files in the Project, module and Solution

After compile and optimize our css files with gulp task, we need to take into account that these final files created, need to be **included in our project, module and solution**. Follow these steps:

Show all files, check and uncheck

[![clip_image023](./clip_image023.png "clip_image023")](./clip_image023.png)

We can see the new files aren't included in the project

[![clip_image024](./clip_image024.png "clip_image024")](./clip_image024.png)

Select them:

[![clip_image025](./clip_image025.png "clip_image025")](./clip_image025.png)

**Include in the project**:

[![clip_image026](./clip_image026.png "clip_image026")](./clip_image026.png)

Here they are:

[![clip_image027](./clip_image027.png "clip_image027")](./clip_image027.png)

Now, because these files are inside a SharePoint module, **we need to configure the .css (not .min.css) files to not deploy**:

[![clip_image028](./clip_image028.png "clip_image028")](./clip_image028.png)

Change the **deployment type properties **of the file to** NoDeployment**.

[![clip_image029](./clip_image029.png "clip_image029")](./clip_image029.png)

Now we have included the files in the project we will include them in the Module, editing the Elements.xml file as follows:

<script src="https://gist.github.com/jquintozamora/a389695630a6b77da7c53a113808f430.js"></script>

&nbsp;

[![clip_image030](./clip_image030.png "clip_image030")](./clip_image030.png)

Now, the **result is that we have this folder structure**:

[![clip_image031](./clip_image031.png "clip_image031")](./clip_image031.png)

**But** we only **will be deploying in SharePoint** (inside the Module via feature) **two files:** **JQ.MasterPage.min.css** and **JQ.Themable.min.css**. And that is ideal because we are **combining the power of LESS and Gulp inside a SharePoint Project**.


## Download full project
You can download full project [here](./JQ.SharePoint.GulpSample.zip).
