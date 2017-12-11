---
title: How to configure Visual Studio 2015 with the latest version of Node.js and NPM
tags:
  - English
url: 670.html
id: 670
categories:
  - Node.js
  - NPM
  - Visual Studio
date: 2016-05-04 09:18:21
---

Hi,

I recently installed Visual Studio 2015 Update 2 in order to work in a project, in which, we would like to use a combination of  different technologies like SharePoint stuff, React, Node.js, LESS and Gulp.

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image.png)

In my opinion, is good to to use new technologies at the right time, in terms of, learning curve, adoption and maturity. And now, I think is the right time for SharePoint developers to introduce little more technologies like Node.js and Gulp in our projects, which will help us on saving lot of development time.

&nbsp;

## Node.js

I was quite surprised when I first saw** Node.js** because even if it is only a **JavaScript runtime** implemented to run in a server. It has huge success in the development world because JavaScript is the common and shared language between all web developers. Which means that there is a lot of people involved on developing custom libraries and modules. Due to its success, there is a **great package ecosystem called NPM** (**Node Package Manager**) to help contributors to publish libraries and developers to use them. See more info here: [https://nodejs.org](https://nodejs.org). I recommend to read this book as well:
[![](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00MBL25GI&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=joseq21-20)](https://www.amazon.com/Beginning-Node-js-Basarat-Ali-Syed-ebook/dp/B00MBL25GI/ref=as_li_ss_il?_encoding=UTF8&me=&linkCode=li2&tag=joseq21-20&linkId=8ccb5c3a233ab57189e1d5e3641a945d)![](https://ir-na.amazon-adsystem.com/e/ir?t=joseq21-20&l=li2&o=1&a=B00MBL25GI)
&nbsp;

## NPM

It is the **largest ecosystem of open libraries** in the world, doesn’t matter if you are Java, PHP, C#, VB or ASP .Net Developer! That means that there is a los of modules and open libraries already implemented just ready to use them.

As a SharePoint and Web Developer one example that will make you to love NPM free libraries is [Gulp](http://gulpjs.com/), that is  a tool that helps you out with several tasks when it comes to web development. It's often used to do front end tasks like:

*   **Spinning up a web server** (not needed IIS, …)
*   **Reloading the browser** automatically whenever a file is saved
*   Using CSS pre-processors like **SASS** or **LESS** ([https://www.npmjs.com/package/gulp-less](https://www.npmjs.com/package/gulp-less "https://www.npmjs.com/package/gulp-less"))
*   **Optimizing assets like CSS**, JavaScript, and images ([https://www.npmjs.com/package/gulp-csso](https://www.npmjs.com/package/gulp-csso "https://www.npmjs.com/package/gulp-csso"))
*   **Upload files to SharePoint** libraries automatically ([https://www.npmjs.com/package/gulp-spsave](https://www.npmjs.com/package/gulp-spsave "https://www.npmjs.com/package/gulp-spsave"))

    *   You can see a good article of my colleague Vardhaman explaining how to use [here](http://www.vrdmn.com/2016/05/simple-bundle-minify-and-upload-js-to.html).
**YES**!! We can have a good way to automatize all the web compilers, bundlers, optimizers and uploaders when we work in SharePoint projects, which is **really good in terms of productivity**.

&nbsp;

&nbsp;

## Visual Studio 2015 Integration with NPM

By default Visual Studio 2015 knows what NPM is, I mean, **Visual Studio 2015** ships with it’s own version of Node.js and NPM. The OOTB version of NPM is located here: **C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\Extensions\Microsoft\Web Tools\External\npm\node_modules\npm\bin**

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-1.png)

The bad thing here, is that VS uses an OLD version of NPM, and I **HIGHLY recommend** to use latest version of Node.js and NPM. For me the primary motivator was the path length limitations in Windows. Nested** node_modules** folders buried 19 levels deep is no fun when you hit the max path length. The latest major version of** NPM– version 3.0.x and above – creates a flat store of packages**.

Using native VS 2015 Update 2 NPM version

[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image001.png)

Using **NPM 3.8.6** downloaded from nodejs.org (installed via Node.js executable)

[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image002.png)

Thanks [Fran](https://twitter.com/spcfran) for helping me on this!

&nbsp;

## Upgrade NPM in Visual Studio 2015

1\. Install in your development environment the latest version of **Node.js that includes NPM**: [https://nodejs.org](https://nodejs.org).

In my case (May 2016) it is v**6.0.0.**

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-2.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-2.png)

Check that NPM is installed as well:

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-3.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-3.png)

After install it, you can see the version for both tools, just typing:

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-4.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-4.png)

&nbsp;

2\. Now change “**Locations of External Tools**” configurations in VS 2015 in order to tell VS to use the latest version of NPM:

Configure it in** Options > Project and Solutions > External Web Tools**

Just add a new entry and move it to the top. NPM is located in the Node.js install directory:

[![clip_image001[5]](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image0015_thumb.png "clip_image001[5]")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image0015.png)

Note may need to **restart Visual Studio** for the tooling paths to be picked up.

&nbsp;

&nbsp;

## How can we check our VS 2015 is using version 3.8.6

**VS 2015** automatically runs NPM every time we save changes in the **package.json** file at the root folder of our project (SharePoint project as well). Try to crate [package.json](https://docs.npmjs.com/files/package.json) in your project root directory, save it and you will see in the output called "Bower/npm":

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-5.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-5.png)

Here an example of package.json file:

<script src="https://gist.github.com/jquintozamora/5f1dd8c277feacace8040c4b7855ad3f.js"></script>

You also can see how "**node_modules**" folder has been created in your project folder:

[![clip_image001[7]](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image0017_thumb.png "clip_image001[7]")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image0017.png)

&nbsp;

## Recap

- If you are using** NPM version 3.X.X** then you should have a flat store of packages in **node_modules**, which means no more node_modules subdirectories. You should appreciate a improvement on performance,

- You don’t need extra configuration to run NPM, the only thing to do is **create package.json** file in you root directory and when you save it an event is triggered to evaluate using the pre-configured NPM version.

- NPM is really good accepted in the development community and you have a lot of information around Internet, just google it!

- There are some good articles and courses from  John Papa: [http://www.johnpapa.net/get-up-and-running-with-node-and-visual-studio/](http://www.johnpapa.net/get-up-and-running-with-node-and-visual-studio/ "http://www.johnpapa.net/get-up-and-running-with-node-and-visual-studio/")

&nbsp;

&nbsp;

Regards!

@jquintozamora