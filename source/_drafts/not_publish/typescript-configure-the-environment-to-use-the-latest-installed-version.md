---
title: 'TypeScript: Configure the environment to use the latest installed version'
tags:
  - English
permalink: typescript-configure-the-environment-to-use-the-latest-installed-version/
id: 681
categories:
  - TypeScript
date: 2016-05-05 10:43:51
---

Hi,

Yesterday (4th May 2016), Microsoft announced the new SharePoint Framework ([https://www.youtube.com/watch?v=T_bGyqKwT4g](https://www.youtube.com/watch?v=T_bGyqKwT4g "https://www.youtube.com/watch?v=T_bGyqKwT4g")). **TypeScript** will be important technology for developing new client web parts, you can see a good article of my colleague Chris ([http://www.sharepointnutsandbolts.com/2016/05/the-new-sharepoint-development-model.html](http://www.sharepointnutsandbolts.com/2016/05/the-new-sharepoint-development-model.html "http://www.sharepointnutsandbolts.com/2016/05/the-new-sharepoint-development-model.html")). 

TypeScript code is not processed by browsers that work with JavaScript code. Therefore to be executed, TypeScript code has to be translated into JavaScript. This operation is referred to as transpilation and the tools that perform it are called transpilers.

I ‘d like to share some tips to configure you dev environment with the latest installed version of TypeScript. 

&nbsp;

### Download TypeScript

There are may places where download TypeScript, but I prefer to use the official page maintained by Microsoft (which was recently rebranded): [http://www.typescriptlang.org](http://www.typescriptlang.org).&nbsp; Current version is TypeScript 1.8.

Microsoft recommends to **download directly from npm**, using this command: “npm install –g typescript”. So, if you have installed NPM the installation will be quite easy:

&nbsp;

### Install TypeScript

We will open our preferred Shell, in my case is PowerShell window and type “npm install –g typescript” to install it globally.

[![image](https://blog.josequinto.com/wp-content/uploads/2016/05/image_thumb-6.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/05/image-6.png)

We can see that the path used to store the transpiler executable is “**C:\User\<your user>\AppData\Roaming\npm**“

Note: you can also install the next version (currently in development) of typescript typing: “npm install –g [typescript@next](mailto:typescript@next)”

### &nbsp;

### Check TypeScript version

Now, we can check the version installed on out machine just typing: “**tsc –version**”, 

Surprisingly, I saw the version 1.0.3.0 instead version 1.8… what happens??? let’s see the Env:Path variable…

&nbsp;

### Use the latest version of TypeScript

Let's look into the Path variable "$Env:Path" in PowerShell. These are the values I can see in my machine (it will be different for every machine, depending on the installed Software)

_C:\Windows\system32;
C:\Windows;
C:\Windows\System32\Wbem;
C:\Windows\System32\Windows PowerShell\v1.0\;
C:\Program Files (x86)\Microsoft ASP.NET\ASP.NET Web Pages\v1.0\;
C:\Program Files\Microsoft SQL Server\110\Tools\Binn\;
C:\Windows\idmu\common;
C:\Program Files (x86)\Microsoft SDKs\Azure\CLI\wbin;
**C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\;**
C:\Program Files (x86)\Windows Kits\8.1\Windows Performance Toolkit\;
C:\Program Files (x86)\Windows Live\Shared;
C:\Program Files (x86)\Skype\Phone\;
C:\Program Files\Git\cmd;
C:\Program Files\nodejs\;
C:\Program Files (x86)\TextAI\VisualText\BIN;
C:\Program Files (x86)\Microsoft VS Code\bin;
**C:\Users\jose.quinto\AppData\Roaming\npm;**
.;_
<font size="1"></font> 

We can see two Paths for TypeScript, and our PowerShell will pick up the first one!! Let’s remove the version 1.0\.  <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image001_thumb-1.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image001-1.png)  <p>Remove this line:  <p>**C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\**  <p>**RESTART POWERSHELL** and it works!  <p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image002_thumb-1.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2016/05/clip_image002-1.png)  <p>&nbsp;

Note if you are using VS Code you can configure the TypeScript version used for your workspace: [http://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions](http://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions "http://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions")

&nbsp;

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)