---
title: 'npm install fails on Windows 10: ENOENT,–4058, operation not permitted, rename'
tags:
  - English
url: 1013.html
id: 1013
categories:
  - Node.js
  - NPM
date: 2017-06-23 15:08:53
---

Currently I have faced different issues when doing npm install on some of my projects.

My current environment is:

- **Windows 10** (OS Build 15063.413)

- Node version: **8.1.2**

- NPM version: **5.0.3**

Every time I tried **npm install** or install a isolated package I got errors like this one:

[![image](https://blog.josequinto.com/wp-content/uploads/2017/06/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2017/06/image-1.png)

Text error:

_npm ERR! path D:\GitHub\react-typescript-webpack2-cssModules-postCSS\node_modules\ts-loader

npm ERR! code ENOENT

npm ERR! errno -4058

npm ERR! syscall rename

npm ERR! enoent ENOENT: no such file or directory, rename 'D:\GitHub\react-typescript-webpack2-cssModules-postCSS\node_m

odules\ts-loader' -> 'D:\GitHub\react-typescript-webpack2-cssModules-postCSS\node_modules\.ts-loader.DELETE'

npm ERR! enoent This is related to npm not being able to find a file._

For me (there are lots of different scenarios) the solution was:

1\. **Close VS Code**

2\. Remove package-lock.json, node_modules and npm cache
> **del package-lock.json**
> 
> **rd /s /q node_modules**<p>**npm cache clear --force**

3\. Retry **npm i**

If you still have this problem, read this: [https://github.com/npm/npm/issues/10826](https://github.com/npm/npm/issues/10826 "https://github.com/npm/npm/issues/10826")

Hope that helps!

[@jquintozamora](https://twitter.com/jquintozamora)