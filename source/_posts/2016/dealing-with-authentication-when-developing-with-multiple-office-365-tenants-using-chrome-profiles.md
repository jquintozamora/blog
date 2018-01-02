---
layout: post
title: Dealing with authentication when Developing with multiple Office 365 tenants using Chrome Profiles
language: English
url: dealing-with-authentication-when-developing-with-multiple-office-365-tenants-using-chrome-profiles
id: 626
categories:
  - Chrome
  - Productivity
  - Tip
date: 2016-04-18 18:13:53
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
When we are developing with **multiple tenants in Office 365** using the same development environment, I am pretty sure we are annoyed when we have to deal with with the **Office 365 authentication**.

That is not Office 365 issue, is just having different accounts having to access to the same authentication portal in the same PC. This could also happens if we have different Yammer accounts with different group per each one.

The typical error when we access SharePoint site (Office 365) is:
 > We're sorry, but ... can't be found in the ...sharepoint.com directory. Please try again later, while we try to automatically fix this for you. 

[![image](./image-4.png "image")](./image-4.png)

Due miscellaneous reasons the “_click here to sign in with different account to this site_” might not work and then you end up in nice loop of trying to get rid of the login information.


## Solution

You can use incognito session to open the browser with different credentials, but still this is time consuming because every time you need to put the credentials.

My recommendation here is to use **Chrome profiles** in combination with a **desktop shortcut**. 

This is a quick productivity tip, it only takes you 15 minutes to apply, but it will save a lot of time afterwards. 

**Chrome browser** has a nice feature allows to create different Profiles. And every profile has their own Cache, Session data, History, etc. For every profile Chrome creates a new folder in the path: “C:\Users\youruser\AppData\Local\Google\Chrome\User Data”. Here an example of OfficeNetwork profile I created:

[![image](./image.png "image")](./image.png)


The good point here is that you can configure a shortcut to open chrome with a specified profile and url. 

## Click thought
Do following steps to create it:

1. Right click on Desktop and New – Shotcut

  [![image](./image-1.png "image")](./image-1.png)

2. In the location of the item we will call to PowerShell with a execution command:
  ```
  C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -command "& 'Start-Process' 'chrome.exe' 'https://www.yammer.com/itpronetwork --profile-directory=OfficeNetwork'"
  ```
  > Notes
  > - profile-directory parameter can’t contains spaces. 
  > - First time this script is executed the profile OfficeNetwork is created (probably with other Display Name like “Person X”). We can change later the display name using Chrome Settings. But is important to create the Profile with the script just to avoid white spaces. 
  > - In my case I am configuring the Profile called “OfficeNetwork” to open the Office 365 Network url with Chrome using PowerShell as a bridge. 
  > [![image](./image-2.png "image")](./image-2.png)

3. Click on Next and put a name of the shortcut

  [![image](./image-3.png "image")](./image-3.png)

4. Click Finish

5. Optionally, you can change the icon in the shortcut properties. In this example I selected Chrome.exe icon to relate this with a webpage.

  [![image](./image-5.png "image")](./image-5.png)

6. Double click on shortcut and Enjoy!!

  [![image](./image-6.png "image")](./image-6.png)

Do this **for every site** you need to have different cookies, session, etc in the browser. And you will save a lot of time looking for credentials, urls, etc…