---
layout: post
title: TypeScript functions to get current domain, site collection and Site urls with window.location fallback
language: English
permalink: typescript-functions-to-get-current-domain-site-collection-and-site-urls-with-window-location-fallback
id: 911
categories:
  - How-To
  - Quick-Note
  - Code-Reminder
tags:
  - TypeScript
  - Office 365
date: 2017-03-09 18:16:48
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Recently, I was working in a **TypeScript** project building a SPA application on top of Office 365 and I needed to get the current domain, current site collection and current site urls for using them in a different React components.

The case is we always rely on **_spPageContextInfo** to get this information, but in fact, we can use window.location object to build the urls as a fallback in case we need to use this Utils library before SP.js loaded or in other context.

## Code
Here is my solution for that problem using TypeScript:
<script src="https://gist.github.com/jquintozamora/aa3b10c08270385acaed0374cf00475a.js"></script> 
