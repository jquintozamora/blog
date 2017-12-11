---
title: Filtering Result Source by List or Library Template in SharePoint 2013
tags:
  - English
url: 188.html
id: 188
categories:
  - Result Source
  - Search
  - SharePoint 2013
date: 2014-07-15 15:03:55
---

SharePoint 2013 bring with a powerful search engine, remember MS Product Team included a lot of FAST features. So, in my opinion, one of the best features included are Result Sources ([http://technet.microsoft.com/en-us/library/dn186229(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn186229(v=office.15).aspx "http://technet.microsoft.com/en-us/library/dn186229(v=office.15).aspx")). It allows us to use search scopes and provided controlled and filtered sets of results.

One of the first things I’d like to do is replace Content Query Web Parts for Content Search Web Part. For that, one of my needs is to be able to create Result Source by filtering only one kind of items or list templates.

For example, imagine I want to filter search results only displaying items in Posts libraries, that is quite easy, the only to do is create Result Source with the following filter: **{searchTerms} Path:{Site.URL} (contentclass:STS_ListItem_Posts)**

[![image](https://blog.josequinto.com/wp-content/uploads/2014/07/image_thumb6.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/07/image6.png)

So, the important keyword to filter List / Items Templates is “contentclass” property.

It seems that the STS_ListItem and STS_List are two types and you need to use a specific list type and list item type. So, you can use:

- STS_ListItem_Posts to filter by Post Items only

- STS_List_Posts to filter by Post List including post items and post views, …

&nbsp;

There are more predefined codes to use in contentclass property, we can see following list:

"STS_Web": // Site<p>"STS_List_850": // Page Library<p>"STS_ListItem_850": // Page<p>"STS_List_DocumentLibrary": // Document Library<p>"STS_ListItem_DocumentLibrary": // Document Library Items<p>"STS_List_GenericList": // Custom List<p>"STS_ListItem_GenericList": // Custom List Item<p>"STS_List_Links": // Links List<p>"STS_ListItem_Links": // Links List Item<p>"STS_List_Tasks": // Tasks List<p>"STS_ListItem_Tasks": // Tasks List Item<p>"STS_List_Events": // Events List<p>"STS_ListItem_Events": // Events List Item<p>"STS_List_Announcements": // Announcements List<p>"STS_ListItem_Announcements": // Announcements List Item<p>"STS_List_Contacts": // Contacts List<p>"STS_ListItem_Contacts": // Contacts List Item<p>"STS_List_DiscussionBoard": // Discussion List<p>"STS_ListItem_DiscussionBoard": // Discussion List Item<p>"STS_List_IssueTracking": // Issue Tracking List<p>"STS_ListItem_IssueTracking": // Issue Tracking List Item<p>"STS_List_GanttTasks": // Project Tasks List<p>"STS_ListItem_GanttTasks": // Project Tasks List Item<p>"STS_List_Survey": // Survey List<p>"STS_ListItem_Survey": // Survey List Item<p>"STS_List_PictureLibrary": // Picture Library<p>"STS_ListItem_PictureLibrary": // Picture Library Item<p>"STS_List_WebPageLibrary": // Web Page Library<p>"STS_ListItem_WebPageLibrary": // Web Page Library Item<p>"STS_List_XMLForm": // Form Library<p>"STS_ListItem_XMLForm": // Form Library Item<p>&nbsp;

I tried to find a complete list in MS documentation but I haven’t success…

&nbsp;

References: 

- [http://social.technet.microsoft.com/Forums/sharepoint/en-US/9f87d5d7-08bf-442d-ad3f-91036d164954/content-class-identifier-stslist](http://social.technet.microsoft.com/Forums/sharepoint/en-US/9f87d5d7-08bf-442d-ad3f-91036d164954/content-class-identifier-stslist "http://social.technet.microsoft.com/Forums/sharepoint/en-US/9f87d5d7-08bf-442d-ad3f-91036d164954/content-class-identifier-stslist")

&nbsp;

Hope that helps!

Regards!

@jquintozamora