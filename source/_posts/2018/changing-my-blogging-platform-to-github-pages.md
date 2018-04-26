---
layout: post
title: Changing my Blogging Platform to GitHub Pages
language: English
permalink: changing-my-blogging-platform-to-github-pages
id: 902
categories:
  - How-To
tags:
  - Github Pages
  - Hexo
  - PUG
  - Responsive Design
  - Netlify
  - Static Site Generator
date: 2018-02-08 08:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
> **"What's dangerous is not to EVOLVE"** _- Jeff Bezos_

I second that quote of **Jeff Bezos (CEO of Amazon)**. Changes are always good, there is always a lots of learnings when we get our hands dirty changing things and trying to improve something.

I decided to move my Blog from **WordPress** to **Node.js** and **Github Pages**. That wasn't quick decision, it took to me some weeks to investigate about **different platforms**, **hosting types** and **technologies**.

I'll try to go through every important point because I'm pretty sure my conclusions can help anyone else in the same situation.

<br >
## Hosting
Everyday is a learning experience 👨🏻‍🏫, I was told by a colleague I could use **GitHub Pages** as a free hosting as long as I used something called `Static Site Generator`. Then, I started to investigate, and it turned out to be amazing idea 💡. 

In a nutshell, **GitHub Pages** is able to provide _free_ hosting for **Static Pages** (html, css, js, assets, ...) and our laptop is able to run on-demand server to provide those assets. The only thing we need is a tool to create all the static assets and that's called `Static Site Generator`.
 
To be honest, that makes a lot of sense to me, as we can save money by using our laptop as a on demand server every time we need to publish a new content.

> 👉 I chose `GitHub Pages` as a free hosting.

<br >

## Static Site Generator (Blogging Platform)
That's quite **personal decision**, as there is a bunch of `Static Site Generators` depending on the **technology**, **language**, **template engine** or **framework** we want to work with:
- [Gatsby](https://www.gatsbyjs.org): Static Site Generator for `React`.
- [Jekyll](https://jekyllrb.com): Static Site Generator for `Ruby` supporting `Liquid` template engine and `Markdown` markup language.
- [Hexo](https://hexo.io): Static Site Generator specific for Blogs developed using `JavaScript` and supporting `SWIG`, `EJS`, `HAML` and `PUG` template engines and `Markdown` markup language.

There are more `Static Site Generators`, but my investigation ended here as I hadn't unlimited time for that. 
What I DO like of `Hexo` is the fact it is quite specific for blogging and already have lots of `themes` and `plugings`.

> 👉 I chose Hexo as a Blogging Platform and PUG as a template language. But in the near future I'm going to migrate it to Gatsby using React.

<br >


## Markdown
I _used_ to write my blog posts using **Windows Live Writer** because it handles really well copying and pasting from code editors, you could **copy and paste images** as well and its integration with `WordPress` was 👌. 

Currently, I use **macOS** at work and **Windows** at home, then I need a multi-device writing platform. 

Also, I do use `markdown` for writing documentation, commenting on github, and so on.

There is a pluging for `Hexo` called `hexo-migrator-wordpress` which helped a lot during the migration of all my 66 blog post from WordPress to Markdown. Even tough, I had to **review and adapt** most of them by hand lastly 🚜 ...

> 👉 I chose the combination between YAML (metadata) and Markdown as a markup language and VS Code as a IDE.

<br >

## HTTPS, HTTP/2, CDN, Cache, Proxy
Using **GitHub Pages** we can enable **HTTPS** for our custom domain, but I wouldn't recommend to use that because you lose control over lots of things like CDN support, scalability, continuous deployment and so on. 
There are lots of tools or platforms to act as a proxy between your files and the user using your custom domain. Let's name two included on my research:
- [Now.sh](https://zeit.co/now)
  - Node.js Server for [free](https://zeit.co/pricing).
  - Great Console cli.
- [Netlify](https://www.netlify.com/)
  - Provides free SSL certificate (One-Click SSL) by Let's Encrypt (self-renewing).
  - Easy to connect with your Github Project and branch.
  - Continuos Deployment.
  - One of the best First Byte Time.
  - Free for Personal Projects.
  - It supports HTTP/2.

> 👉 I chose Netlify because it's One-Click SSL, integration with Github and First Byte Time.

<br >

## New Web App and Design
I wanted a fresh and fully customizable web app and design 🚀🚀🚀.
I started with a `Hexo` theme called [melody](https://github.com/Molunerfinn/hexo-theme-melody), but eventually I fully customized it in order to achieve all the the requirements above.
- [x] Great Page Load
- [x] Mobile First
- [x] Responsive
- [x] Offline First
- [x] PWA 
- [x] Fixed Nav Menu
- [x] Table of Contents for posts
- [x] Back to top
- [x] Cards Design for listings
- [x] Comments (Disqus)
- [x] Search (Algolia)
- [x] Smooth scrolling
- [x] Great About Page using [Responsive Skill Card](https://codepen.io/jquintozamora/pen/qpMGjd)
- [x] Image optimization (ImageOptim)
- [x] Integration with Medium

To see further details about the implementation that's the Github Project: ⭐️️️️️ [José Quinto Blog](https://github.com/jquintozamora/blog) ⭐️️️️️

<br >

## SEO
Currently, I'm having around **8.000 Page Views** per month. It's not a lot, but still it's quite **important to me not to loose those visits** as a result of the migration. That's more important if we are migrating content and domain too, but still we have to be careful and track everything after the migration to be sure `SEO` isn't not affected negatively.
That's my **SEO action list**:

- [x] Redirect all HTTP to HTTPS requests (that's easy with Netlify)
- [x] Create permalinks with the exact URL we had before
- [x] Create 404 Page with Contact information (just in case)
- [x] Track and monitor Google Analytics to see the impact
- [x] Re-link your WebMaster Account 
- [x] Re-link your Google Analytics tag
- [x] Add canonical meta tag
- If some URL have changed
  - [x] 301 Redirects. OLD --301--> NEW.
- If Change domain
  - [x] Submit a Change Domain in WebMaster Tools (Google, Bing, ...)
  - [x] Rewrite all hardcoded links from your site (if any)
  - [x] [301 Redirects](https://codeable.io/move-website-new-domain-seo)
  - [x] Check links to your site (webmaster tool) and ask them to update your url
  - [x] [Read more](https://moz.com/blog/seo-guide-how-to-properly-move-domains)
  - [x] Update Backlinks 
  - [x] Update all your Profiles 
    - [x] Twitter
    - [x] Github
    - [x] Google Account
    - [x] Facebook
    - [x] LinkedId
    - [x] Forums
    - [x] Stackoverflow
    - [x] CodePen
  - [x] Update Github GISTS (the content)

<br >


## Publishing Workflow
I usually like to **copy things that works well** and there is no shame on doing that as long as you give proper credits. 
I got lots of my ideas from my friend [José Manuel Perez](https://twitter.com/jmperezperez) and I'd like to recommend 🔝 his post 🔝 about [Platform and Publishing Workflow](https://jmperezperez.com/choosing-platform-blogging)