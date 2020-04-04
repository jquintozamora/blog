---
layout: post
title: "Git: sync your fork with the original repo"
language: English
permalink: git-sync-your-fork-with-original-repo
id: 911
categories:
  - Git
tags:
  - Git
  - Sync Fork
date: 2020-04-04 8:00:00
featuredImage: 
  url: sync-fork.png
---

## Introduction

When collaborating with github projects, normally, you do your changes in your fork and branch and then push these changes to your branch ( and should automatically point to original repo master when you create a PR ). Recently I started collaborating with a github project called [excalidraw](https://github.com/excalidraw/excalidraw) and they use that approach. Even if that sounds a easy thing to do, but specially new developers could struggle to get sync done.

## Sync Fork with Original Repo

Best and quicker approach to sync your repo is:

![diagram sync fork](./sync-fork.png)

Let's explain the approach:

1. Configure `upstream`

  > We should have `origin: <our fork url>` and `upstream: <original repo url>`. If we don't have `upstream` configured then we should add it.

  ```console
  $ git remote -v

  origin	https://github.com/jquintozamora/excalidraw.git (fetch)
  origin	https://github.com/jquintozamora/excalidraw.git (push)


  $ git remote add upstream https://github.com/excalidraw/excalidraw.git


  $ git remote -v

  origin	https://github.com/jquintozamora/excalidraw.git (fetch)
  origin	https://github.com/jquintozamora/excalidraw.git (push)
  upstream	https://github.com/excalidraw/excalidraw.git (fetch)
  upstream	https://github.com/excalidraw/excalidraw.git (push)
  ```

  We should now see both `origin` and `upstream` setup properly done.

2. `fetch` changes from original repo ( upstream ) ⬇️
  ```console
  $ git fetch upstream -ap

  remote: Enumerating objects: 286, done.
  remote: Counting objects: 100% (286/286), done.
  remote: Compressing objects: 100% (66/66), done.
  remote: Total 322 (delta 249), reused 241 (delta 220), pack-reused 36
  Receiving objects: 100% (322/322), 125.10 KiB | 1.03 MiB/s, done.
  ...
  ```

3. `merge` changes from upstream into your fork 🔄
  ```console
  $ git merge upstream/master

  Updating 6635261..ae1eee1
  Fast-forward
  changes...
  ```

  After merge, we will have both repos on sync on our local machine. But, I'd recommend to push changes to have your fork updated on github too.

4. `push` to sync changes on github too ⬆️
  ```console
  $ git push origin master

  Total 0 (delta 0), reused 0 (delta 0)
  To https://github.com/jquintozamora/excalidraw.git
    6635261..ae1eee1  master -> master
  ```

🚀🚀 DONE 🚀🚀

I hope it works for you as well, if have any issues, please leave a comment, so we can discuss and try to help!

