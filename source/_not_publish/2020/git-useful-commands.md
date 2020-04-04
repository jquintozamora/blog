---
layout: post
title: Git useful commands for daily use
language: English
permalink: git-useful-commands
id: 911
categories:
  - Utilities
tags:
  - Git
date: 2019-12-06 18:00:24
featuredImage: 
  url: featured.png
---

This post is a compilation of useful git commands I normally use. I don't use UI tooling to work with git as I prefer to have 100% control on git commands triggered, so I'm using `git` on terminal (iTerm2)

## git pull => git fetch + git merge
There are few ways to bring the latest changes from git server, the academic one is `git pull` which internally is doing `git fetch` and `git merge` afterwards. I prefer to run these commands separately. Imagine I'm working on my-branch and I'd like to get latests:

```console
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

$ git fetch -ap
remote: Enumerating objects: 45, done.
remote: Counting objects: 100% (45/45), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 27 (delta 21), reused 26 (delta 20), pack-reused 0
Unpacking objects: 100% (27/27), done.

$ git merge
Updating 041cdac7..453f328d
Fast-forward
 package.json                             |   4 +-
 yarn.lock                                |   8 +-
 2 files changed, 10 insertions(+), 14 deletions(-)

$ git merge
Already up to date.

```

