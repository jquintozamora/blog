---
layout: post
title: Building my first Voice App for Google Home with NodeJS 
language: English
permalink: building-voice-app-google-home-action-node-js
id: 905
categories:
  - How-To
tags:
  - Voice App
  - Google Home
date: 2018-05-12 08:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction


<br>

## Concepts
When I started looking at the documentation 👨‍💻, I realized there is a completely *new vocabulary and concepts*. Let's see some of the concepts I learnt:
- `Actions on Google`: It is the name for Google Home custom applications. They are called Google Home actions, but the name on the Google documentation is [**Actions on Google**](https://github.com/actions-on-google)
- `Types of custom app`: There are three kind of custom app for Google Home. `DialogFlow`, `Smart home` and `Actions SDK`.
  - Actions SDK is the basis. It uses the libraries created by Google in their more basis flavour.
  - DialogFlow. Use a simple speech interaction builder to create your Assistant app. 
  - Smart Home. Build an app that lets users control IoT devices through the Google Assistant.
- `Fulfillment`: In order to serve the actual information the user is requesting, you'll need to setup fulfillment, which requires deploying a service and calling an API.


<br>
