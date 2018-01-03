---
layout: post
title: Cross-Browser and Device Testing with BrowserStack, Nightwatch and Office 365 Authentication
language: English
permalink: cross-browser-and-device-testing-with-browserstack-nightwatch-and-office-365-authentication
id: 855
tags:
  - BrowserStack
  - javascript
  - Nightwatch
  - Node.js
  - Selenium
  - Testing
date: 2017-01-12 19:17:51
featuredImage: 
  url: featured.svg
  width: 280
  height: auto
---

## Introduction
Recently I was working on a project with lots of **Responsive pages** to do. One of the main requirements was enabling Responsive experience in an **Office 365 intranet**, in fact the most used device on that company was **iPhone 5S**. Then I started developing using **Media Queries**, initially building a [responsive menu](https://github.com/jquintozamora/react-responsive-menu-component). 

## Testing responsive pages
Initially I was using the **Toogle Device Toolbar** of **Chrome Dev Tools** to quick develop the media queries and responsive CSS:

[![image](./image.png "image")](./image.png)

But almost always, this **iPhone “emulator”** isn’t enough because it provides different output render than iPhone itself.

### Real Device
**One possible option** I used before could be to have borrowed the **real device** and test directly there. That is not ideal when you have lot of responsive screens and pages to do… 

### Cloud Service
Going further, other option is to have a cloud service that allows you the possibility to test **cross-device** and **cross-browser** applications. Regarding the JS community there are two main options: 
- **BrowserStack**: [https://www.browserstack.com/](https://www.browserstack.com/ "https://www.browserstack.com/")
- **SauceLabs**: [https://saucelabs.com/](https://saucelabs.com/ "https://saucelabs.com/")

You can read a good comparison [here](http://www.analyzo.com/product-comparisons/170/Browserstack/697/Sauce-Labs/690). 

> Note that **none** of these two services are free. I haven’t seen good free products on this area. But feel free to post a comment if you know some.

### My choice
I decided to give a try to **BrowserStack** because it supports more mobile platforms and the Live version allows you to test some Automation minutes as well.

If you only need **Live Remote Access** and more support for different Mobile devices / OS versions / Browser versions, then probably you should consider [Amazon Device Farm](https://aws.amazon.com/device-farm/ "https://aws.amazon.com/device-farm/") as well. There is a new platform called [Xamarin Test Cloud](https://testcloud.xamarin.com/register) too, but is still in early stage (not supporting most scenarios).

Cool, so let’s give a go with **BrowserStack and Nightwatch**.

> **BrowserStack**: is a cloud-based cross-browser testing tool.
> **Nightwatch**: is a tool for making the browser automated testing easier. It uses Selenium behind scenes.

&nbsp;

### The code

Having this [repo](https://github.com/browserstack/nightwatch-browserstack) as a baseline, it was really easy to get my first test against **BrowserStack**.

The tricky part was enabling the Office 365 authentication using Nightwatch Node.js library.
<script src="https://gist.github.com/jquintozamora/15e80e099fd047a21ce1ea97745059fb.js"></script> 

&nbsp;

### Important

- The input Id’s input[id="**cred_userid_inputtext**"] are located in the login screen, so keep a track they don’t change.
- **saveScreenshot** method will save screenshots locally!!
- Because we have **'browserstack.debug': true'** in the config file then we could go to BroserStack site and see all the steps with the screenshots as well.
- **pause(50000)** is the time needed to authenticate (roughly).

&nbsp;
 > You can see, download, give feedback and collaborate on the Github project I created to keet this project: [nightwatch-browserstack-office365-authentication](https://github.com/jquintozamora/nightwatch-browserstack-office365-authentication "https://github.com/jquintozamora/nightwatch-browserstack-office365-authentication"). 

&nbsp;

Once you configure and run the **Github project**, you will get the results in the BrowserStack panel and in the command line as well: 

[![image](./image-1.png "image")](./image-1.png)
