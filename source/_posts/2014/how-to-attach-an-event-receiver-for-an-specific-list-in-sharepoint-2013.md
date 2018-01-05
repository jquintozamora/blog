---
layout: post
title: How to attach an event receiver for an specific list in SharePoint 2013
language: English
permalink: how-to-attach-an-event-receiver-for-an-specific-list-in-sharepoint-2013
id: 298
categories:
  - Code-Reminder
tags:
  - event receiver
  - PowerShell
  - SharePoint
  - SharePoint 2010
  - SharePoint 2013
date: 2014-11-06 17:39:14
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
In **SharePoint** we can use event receivers to trigger events like adding, updating, deleting elements from a list. When we need to do some extra tasks it is really useful and straightforward method.

I’d like to explain what happens behind scenes when we are creating `Event Receiver` project in _Visual Studio_. 

In this case I will use **Visual Studio 2013** and **SharePoint 2013**.

## Event Receiver parameters
First of all, we need to define the Event Receiver parameters:
- **Scope**: only one List (Lists/PublishedFeed)
- **Activation Scope**: using a Web-scoped Feature 
- **Type**: ItemAdded (complete list [here](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.speventreceivertype.aspx))
- **Execution Stage**: first add the item, later execute my code – so, ItemAdded instead ItemAdding

## Create event receiver
Now we can follow this procedure for creating the Event Receiver:

1. Create New Project in Visual Studio of type “SharePoint 2013 – Empty Project”
 > ![image](./image.png) 

2. Add new item of type “Event Receiver”
 > ![image](./image1.png) 

3. Rename Feature to give its more friendly name and define scope to Web
 > ![image](./image2.png)   

4. Edit Elements.xml file 
  > You will notice that there is Receivers element with ** ListTemplateId="100"** (or similar depends on the list type you chose when created Event Receiver)
  > It is important to know that if you deploy this feature with this Event Receiver it will be deployed on all “Custom Lists”. 

  Our scope is to have only in one list so we will update with that:
  ```xml
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
  ```
  > **IMPORTANT to put ListUrl in order to scope the activation of this event receiver only to this list.**

5. Edit .cs to create your custom code
  ```cs
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
  ```

6. Deploy the solution in SharePoint
That will activate the feature and the feature activation process automatically will attach the event receiver to the list.
> **Note: If you deactivate the feature the event receiver will be removed from the list too.**

7. Test Event Receiver
We can use this PowerShell to check that Event Receiver is attached.

```bash
$spWeb = Get-SPWeb http://site;
$spList = $spWeb.Lists["MicroFeed"];
$spList.EventReceivers | Select Name, Assembly, Type;
```

## Results
So, if the feature is disabled:
![image](./image3.png)

We will have these OOB event receivers:
![image](./image4.png)

&nbsp;
And if the feature is enabled:
![image](./image5.png)

We will have our own event receiver too:
![image](./image6.png)
