---
layout: post
title: 'npm install fails on Windows 10: ENOENT 4058 operation not permitted, rename'
language: English
permalink: npm-install-fails-on-windows-10-enoent-4058-operation-not-permitted-rename
id: 1013
categories:
  - Node.js
  - NPM
date: 2017-06-23 15:08:53
---

Recently, I've faced different issues when tryng `npm install` in some of the project I've been working with.

## Environment

- **Windows 10** (OS Build 15063.413)
- Node version: **8.1.2**
- NPM version: **5.0.3**

Every time I tried **npm install** or install a isolated package I got errors like this one:
[![ENOENT 4058](./image-1.png "enoent4058")](./image-1.png)

## Error
```bash
_npm ERR! path \GitHub\react-typescript-webpack2-cssModules-postCSS\node_modules\ts-loader
npm ERR! code ENOENT
npm ERR! errno -4058
npm ERR! syscall rename
npm ERR! enoent ENOENT: no such file or directory, rename 'D:\GitHub\react-typescript-webpack2-cssModules-postCSS\node_m
odules\ts-loader' -> '\GitHub\react-typescript-webpack2-cssModules-postCSS\node_modules\.ts-loader.DELETE'
npm ERR! enoent This is related to npm not being able to find a file._
```

## Solution 
The solution for my specific scenario was:

1\. **Close VS Code**
2\. Remove package-lock.json, node_modules and npm cache
```ps
# Windows
del package-lock.json
rd /s /q node_modules
npm cache clear --force
```
```bash
# macOs
rm package-lock.json
rm -rf node_modules/
npm cache clear --force
```
3\. Retry **npm i**


## Read more...
If you still have this problem, read this: [https://github.com/npm/npm/issues/10826](https://github.com/npm/npm/issues/10826 "https://github.com/npm/npm/issues/10826")
