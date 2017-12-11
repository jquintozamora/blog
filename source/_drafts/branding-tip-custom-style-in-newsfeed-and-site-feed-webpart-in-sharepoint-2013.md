---
title: >-
  [Branding Tip] Custom Style in Newsfeed and Site Feed webpart in SharePoint
  2013
tags:
  - English
url: 126.html
id: 126
categories:
  - Branding
  - CSS
  - Newsfeed
  - SharePoint 2013
  - Style
date: 2014-06-09 12:00:16
---

Hi,

A typical requirement in SharePoint 2013 intranets is the ability to customize styling of My Site Newsfeed or Site Feed Web Part. The MySite News Feed Web Part (also known as the MicroFeedWebPart) has roughly 181 related CSS classes in portal.css.

I’d like to share with you a custom CSS included in SharePoint master page in order to stylize Newsfeed Web Part. The main changes are:

&nbsp;&nbsp; - Custom header and title styles

&nbsp;&nbsp; - Change Newsfeed height and add scroll bar (Limit the height of Site Feed web part)

&nbsp;&nbsp; - Change margins and padding in order to have more compressed style

&nbsp;&nbsp; - Change width for all thread divs (newsfeed items) in order to maintain aspect when scroll bar is included

&nbsp;&nbsp; - Change Post Box height

&nbsp;&nbsp; - Change Add a reply width to avoid collapse with scroll bar.

These are the CSS classes modified:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image.png)

That is the code:

<pre class="css">

/********* Newsfeed Styles **************/
.ms-microfeed-siteFeedTitleArea
{
    background-color: silver;
    padding-left: 20px;
    text-transform:uppercase;
    padding-bottom: 3px;
    padding-top: 2px;
    margin-bottom: 5px;
}
.ms-microfeed-siteFeedMicroBlogPart
{
    margin-bottom: 2px;
}
.ms-microfeed-siteFeedTitleLabel
{
    color: red !important;
}
.ms-microfeed-threadsDiv
{
    height: 250px;
    overflow-y: auto;
    overflow-x: hidden;    
}
.ms-microfeed-thread
{
    max-width: 435px;    
    margin-bottom: 10px;
}
.ms-microfeed-replyArea
{
    max-width: 375px;
    min-width: 300px;
}
.ms-microfeed-attachmentButton
{
    padding-top: 2px;
    padding-bottom: 2px;
    display: block;
}
.ms-microfeed-postButton
{
    padding-top: 2px;
    padding-bottom: 2px;
}
.ms-microfeed-postButtonSpan
{
    margin-top: 2px;
}
.ms-microfeed-postBox
{
    height: 20px;
}
</pre>

&nbsp;

**UPDATE**: If we add display: block; CSS property on .ms-microfeed-attachmentButton class. Then, when we click on “Start a conversation” we will maintain the height on the webpart. If we don’t have this css, then when focus on that textarea, the height will be increased and our global design can be affected negatively. 

&nbsp;

Some references:

 -[http://www.sbrickey.com/Tech/Blog/Post/A_smaller_Profile_Picture_in_the_SharePoint_Newsfeed](http://www.sbrickey.com/Tech/Blog/Post/A_smaller_Profile_Picture_in_the_SharePoint_Newsfeed "http://www.sbrickey.com/Tech/Blog/Post/A_smaller_Profile_Picture_in_the_SharePoint_Newsfeed")

- [http://toastertech.com/2013/06/changing-the-width-of-the-site-feed-or-my-site-newsfeed-web-part/](http://toastertech.com/2013/06/changing-the-width-of-the-site-feed-or-my-site-newsfeed-web-part/ "http://toastertech.com/2013/06/changing-the-width-of-the-site-feed-or-my-site-newsfeed-web-part/")

&nbsp;

&nbsp;

Hope that Helps!

JQ