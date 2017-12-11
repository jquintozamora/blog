---
title: How to attach an event receiver for an specific list in SharePoint 2013
tags:
  - English
url: 298.html
id: 298
categories:
  - event receiver
  - PowerShell
  - SharePoint
  - SharePoint 2010
  - SharePoint 2013
date: 2014-11-06 17:39:14
---

In SharePoint we can use event receivers to trigger events like adding, updating, deleting elements from a list. When we need to do some extra tasks it is really useful and straightforward method.

I’d like to explain what happens behind scenes when we are creating Event Receiver project in Visual Studio. 

In this case I will use Visual Studio 2013 and SharePoint 2013.

&nbsp;

First of all, we need to define the Event Receiver parameters:
 > **Scope**: only one List (Lists/PublishedFeed)
> 
> **Activation Scope**: using a Web-scoped Feature
> 
> **Type**: ItemAdded (complete list here: [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.speventreceivertype.aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.speventreceivertype.aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.speventreceivertype.aspx"))
> 
> **Execution Stage**: first add the item, later execute my code – so, ItemAdded instead ItemAdding
> 
> &nbsp; 

Now we can follow this procedure for creating the Event Receiver:

&nbsp;

1\. Create New Project in Visual Studio of type “SharePoint 2013 – Empty Project”
 > [![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image.png) 

2\. Add new item of type “Event Receiver”
 > [![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image1.png) 

3\. Rename Feature to give its more friendly name and define scope to Web
 > [![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image2.png)   

4\. Edit Elements.xml file 

You will notice that there is Receivers element with ** ListTemplateId="100"** (or similar depends on the list type you chose when created Event Receiver)

It is important to know that if you deploy this feature with this Event Receiver it will be deployed on all “Custom Lists”. 

Our scope is to have only in one list so we will update with that:

<pre class="xhtml">

<?xml version="1.0" encoding="utf-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Receivers ListUrl="Lists/PublishedFeed" >
      <Receiver>
        <Name>NewsfeedNotificationItemAdded</Name>
        <Type>ItemAdded</Type>
        <Assembly>$SharePoint.Project.AssemblyFullName$</Assembly>
        <Class>NewsfeedEventReceiver.NewsfeedNotification.NewsfeedNotification</Class>
        <SequenceNumber>10000</SequenceNumber>
      </Receiver>
  </Receivers>
</Elements>
</pre>

**IMPORTANT to put ListUrl in order to scope the activation of this event receiver only to this list.**

&nbsp;

5\. Edit .cs to create your custom code

<pre class="c#">

namespace NewsfeedEventReceiver.NewsfeedNotification
{
    /// <summary>
    /// List Item Events
    /// </summary>
    public class NewsfeedNotification : SPItemEventReceiver
    {
        /// <summary>
        /// An item was added.
        /// </summary>
        public override void ItemAdded(SPItemEventProperties properties)
        {
            base.ItemAdded(properties);

            string title = properties.ListItem.Title;
            string content = properties.ListItem["SearchContent"].ToString();

            SPDiagnosticsService diagSvc = SPDiagnosticsService.Local;
            diagSvc.WriteTrace(0, new SPDiagnosticsCategory("Newsfeed Notification", TraceSeverity.Monitorable, EventSeverity.Information),
                    TraceSeverity.Monitorable, "Writing to the ULS log:  {0}", new object[] { title + ": " + content });   

        }
    }
}

</pre>

&nbsp;

6\. Deploy the solution in SharePoint

That will activate the feature and the feature activation process automatically will attach the event receiver to the list.

**Note: If you deactivate the feature the event receiver will be removed from the list too.**

&nbsp;

7\. Test Event Receiver

We can use this PowerShell to check that Event Receiver is attached.

<pre class="ps">

$spWeb = Get-SPWeb http://site;
$spList = $spWeb.Lists["MicroFeed"];
$spList.EventReceivers | Select Name, Assembly, Type;

</pre>

&nbsp;

So, if the feature is disabled:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image3.png)

We will have these OOB event receivers:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb4.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image4.png)

&nbsp;

And if the feature is enabled:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb5.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image5.png)

We will have our own event receiver too:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/11/image_thumb6.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/11/image6.png)

&nbsp;

&nbsp;

HTH

Regards!

JQ

@jquintozamora