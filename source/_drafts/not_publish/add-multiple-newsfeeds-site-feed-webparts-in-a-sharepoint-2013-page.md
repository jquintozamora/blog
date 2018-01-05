---
title: Add multiple Newsfeed (Site Feed) WebParts in a SharePoint 2013 page
tags:
  - English
permalink: add-multiple-newsfeeds-site-feed-webparts-in-a-sharepoint-2013-page
id: 354
categories:
  - Newsfeed
date: 2015-03-30 16:16:36
---

Hi there,

Behind scenes, SharePoint sites whit “Site Feed” feature enabled, have a list called “Microfeed” (/Lists/PublishedFeed) that contains all data related to Site Feed. This data is also stored in Distributed Cache service, but finally it lives in this library. It is important that only the people have access to this Site will be able to show this feed data.

I had a requirement to add two Newsfeeds in the same SharePoint 2013 page. SharePoint 2013, OOTB, only allows to put one Newsfeed per site.

&nbsp;

So, internally the solution is to create a new subsite and try to put in the same page two Site Feed (one using the current site feed and another using the subsite feed).

In terms of management is good solution because SharePoint allows to have different permissions in different subsites and it meets with the requirements.

&nbsp;

The main problem is the Presentation layer as we need to put two Site Feeds in the same SharePoint page.

&nbsp;

## Solution 1\. Extended Site Feed WebPart

I will try to create custom WebPart inheriting from FeedWebPartBase class which is the Base Class used by Site Feed WebPart. Reference: [https://bilalasmar.wordpress.com/2014/02/22/extended-site-feed-web-part/](https://bilalasmar.wordpress.com/2014/02/22/extended-site-feed-web-part/ "https://bilalasmar.wordpress.com/2014/02/22/extended-site-feed-web-part/")

&nbsp;

### FeedWebPartBase class

In order to display Site Feed FeedWebPartBase class is used by Microsoft OOTB. 

This class internally works in two stages (server and client)

&nbsp; - Server: from server code are generated some HTML divs to store metadata and base div.

&nbsp; - Client: from Client (JavaScript) code is build all newsfeed presentation using this file ('SP.UI.Microfeed.js').

&nbsp;

#### Server code in detail

Class: Microsoft.SharePoint.Portal.WebControls.FeedWebPartBase  <p>DLL: Microsoft.SharePoint.Portal.dll  <p>[![image](https://blog.josequinto.com/wp-content/uploads/2015/03/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/03/image.png)  <p>&nbsp; <p>Some important functions are:  <p>RegisterScripts:  <p>[![image](https://blog.josequinto.com/wp-content/uploads/2015/03/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/03/image1.png)  <p>&nbsp; <p>WriteInitialDataToPage:  <p>[![image](https://blog.josequinto.com/wp-content/uploads/2015/03/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2015/03/image2.png)  <p>&nbsp; <p>We can see here how are hardcoded some divs here. We need to put special attention in “<div id=’ms-microfeeddiv’…” because this DIV is the base used by JavaScript later to build all newsfeed elements.  <p>&nbsp; <p>&nbsp; 

#### Client code in detail
 <p>This is the content created by WebPart from Server code:  <p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2015/03/clip_image002_thumb.jpg "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2015/03/clip_image002.jpg)

&nbsp;

Now, the same WebPart by using SPPageContentManager.RegisterStartupScript generates this JavaScript to be loaded by SharePoint page:

SP.SOD.executeFunc('SP.UI.Microfeed.js', **'SP.UI.MicroFeed.SPMicroFeed.initializePublishedFeed'**, function() { SP.UI.MicroFeed.SPMicroFeed.initializePublishedFeed(  <p>'a\\jquinto', 'Social', '', '', true, true, 'https:\u002f\u002furl-site\u002fsocial', true);});  <p>&nbsp; <p>And inside “SP.UI.Microfeed.js” we can see the ID of this DIV hardcoded:  <p>**SP.UI.MicroFeed.SPMicroFeed.$1s = 'ms-microfeeddiv';**  <p>&nbsp;

**So, even if we can provide different URL in the Extended WebPart, in terms of presentation layer it is impossible to represent two Site Feed because JS has the ID hardcoded. **

&nbsp;

What if we create new SP.UI.Microfeed.js file changing the DIV’s ID?

That will work in the first page load, but later when we will interact with the component (click to retrieve more posts, etc..) it will uses the same hardcoded ID.

&nbsp;

**At this point, it easiest to create a new WebPart rather that modify the current one or extending this. **

**<font size="4">So SOLUTION 1, DOESN’T WORKS.</font>**

&nbsp;

&nbsp;

&nbsp;

## Solution 2\. Add “Page Viewer WebPart” and modify the Master Page of the subsite

This was the solution adopted because it didn’t require a lot of development effort. The idea is:

1- Create Subsite and Enable “Site Feed” feature.

2- Add “Site Feed” WebPart in the new Subsite

3- Go to Main Site and do the same “Enable Site Feed Feature” and “Add Site Feed to home Page”.

4- In the main Site, add “Page Viewer” webpart and put as a link the page created before which contains Subsite Feed”.

5- We can see now two feeds in the same page, and it works because the second one is iframe that uses another JavaScript context.

6- The main problem is we have the Ribbon, Title, Navigation, etc… in the iframe, but we can remove it by creating a new Master Page and/or Layout and change it only for this subsite and page.

7- You can download an example of empty master page here: [https://blog.josequinto.com/wp-content/uploads/2015/03/EmptyMasterPageSample.zip](https://blog.josequinto.com/wp-content/uploads/2015/03/EmptyMasterPageSample.zip "https://blog.josequinto.com/wp-content/uploads/2015/03/EmptyMasterPageSample.zip")

8- Upload this example to /_catalogs/masterpage and change that content type to Master Page, After that, Publish it and will be able to use this master page in your SubSite.

&nbsp;

&nbsp;

&nbsp;

HTH

@jquintozamora