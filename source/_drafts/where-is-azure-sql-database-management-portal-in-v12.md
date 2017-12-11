---
title: Where Azure SQL Database Management Portal is in V12?
tags:
  - English
url: 378.html
id: 378
categories:
  - Azure
  - SQL Azure
date: 2015-06-01 18:13:47
---

I don't often post things related with SQL because isn't my core expertise. But nowadays, with the advent of Azure-hosted or provided-hosted apps (aka SharePoint Add-ins), all developers in one way or another, we are involved in a SharePoint developments could have external databases.  <p>This afternoon I was deploying one Office 365 App in Azure, and because Authentications matters, had to deal with ADALTokenCacheDb.mdf. My initial idea was put this database into SQL Azure, so this is how my battle started with it. I want to thank to my colleague [@luismanez](https://twitter.com/luismanez) who helps me on this topics, providing some solutions to the recurrent problems with firewalls.  <p>&nbsp; 

## How can we manage SQL Azure Databases V12?
 <p>There are three portals for Azure, and each has different abilities regarding SQL Database V12\.  <p>[http://portal.azure.com/](http://portal.azure.com/)  <p>This Azure preview portal is new and is still at preview status. This portal is not quite yet at full General Availability (GA). This portal:  

*   Can manage your V12 server and database.  <li>Can upgrade your V11 database to V12. <p>[http://manage.windowsazure.com/](http://manage.windowsazure.com/)  <p>This Azure portal might eventually be phased out. This portal:  

*   Can manage your V12 server and database.  <li>Can not upgrade your V11 database to V12. <p>Azure SQL Database Management portal ([http://yourservername.database.windows.net](http://yourservername.database.windows.net))  

*   Cannot manage V12 servers. <p>This information if coming from official source ([https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-plan-prepare-upgrade/#limitations](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-plan-prepare-upgrade/#limitations)). And this is because using the new SQL Server V12 we will lose the Web-based Management Portal - SQL Azure database.  <p>Web-based Management Portal - SQL Azure database  <p>[.database.windows.net/?langid=en-us#$database=<databasename>&entity=Tables&workspace=SchemaManagement">https://<servername>.database.windows.net/?langid=en-us#$database=<databasename>&entity=Tables&workspace=SchemaManagement](https://<servername)  <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image001.png)  <p>&nbsp; <p>&nbsp; <p>So then, you will notice some changes in the Azure Management Interface….  

## What about "Manage Link" ?
 <p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image002.png)  

## What about "Design your SQL database" button?
 <p>[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image003_thumb.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image003.png)  <p>&nbsp; <p>When we create a new database server in Azure, we have two choices (in terms of version of SQL):  <p>[![clip_image004](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image004_thumb.png "clip_image004")](https://blog.josequinto.com/wp-content/uploads/2015/06/clip_image004.png)  

1.  Uncheck this checkbox and use the V11 database server <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Note> You will lose these news: [https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-whats-new/](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-whats-new/)

&nbsp;&nbsp;&nbsp;&nbsp; 2\. Use the V12 database server and loose the Web-browser management tool

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Note: You will lose Web-based Management Portal - SQL Azure database
 <p>&nbsp; <p>&nbsp; <p>If you are thinking on creating V11 version with a posteriori possible Upgrade you have information here:  <p>Powershell for upgrading to V12 from earlier version New Powershell cmdlets are available to start, cancel, or monitor an upgrade to Azure SQL Database V12 from V11 or any other pre-V12 version.  <p>For reference documentation about these cmdlets, see:  <p>* Get-AzureSqlServerUpgrade  <p>* Start-AzureSqlServerUpgrade  <p>* Stop-AzureSqlServerUpgrade  <p>[https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-whats-new/#v12-enhancements-expanded-database-management](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-v12-whats-new/#v12-enhancements-expanded-database-management)  <p>If you decide create V12 version of SQL Azure, probably you will have problems connecting to SQL Azure from VS.  <p>&nbsp; <p>&nbsp; 

## Problems connecting VS 2013 with SQL Azure?
 <p>Why can we connect using Mangement Portal, but not with VS?  <p>That is because Management Portal is a Silverlight application and is running in the web server (somewhere *database.windows.net) and to communicate with the SQL engines doesn't need to have 1433 TCP port opened. With VS your client machine need to connect to SQL Azure using TCP 1433 PORT and sometimes this isn’t allowed in our personal or our company firewall rules (in addition we need to add our client IP's in the Azure Management Portal ([/Configure">https://manage.windowsazure.com/#Workspaces/SqlAzureExtension/SqlServer/<servername>/Configure](https://manage.windowsazure.com/#Workspaces/SqlAzureExtension/SqlServer/<servername))  <p>&nbsp; <p>In the case you decide go with VS 2013, you probably will need to fight with Firewalls, there is some good points of information:  

*   SQL Database Connection Issues: [https://azure.microsoft.com/en-gb/documentation/articles/sql-database-connectivity-issues/](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-connectivity-issues/)  <li>Windows Azure SQL Database Connectivity Troubleshooting Guide: [http://social.technet.microsoft.com/wiki/contents/articles/1719.aspx](http://social.technet.microsoft.com/wiki/contents/articles/1719.aspx)  <li>Azure SQL Database Firewall: [https://msdn.microsoft.com/library/azure/ee621782.aspx](https://msdn.microsoft.com/library/azure/ee621782.aspx)  <li>How to: Configure Firewall Settings (Azure SQL Database): [https://msdn.microsoft.com/library/azure/jj553530.aspx?f=255&MSPPError=-2147217396](https://msdn.microsoft.com/library/azure/jj553530.aspx?f=255&MSPPError=-2147217396)  <li>Troubleshoot Microsoft Azure SQL Database connectivity: [https://support.microsoft.com/en-gb/kb/2980233/en-us](https://support.microsoft.com/en-gb/kb/2980233/en-us) <p>&nbsp; <p>If all your connectivity seems to be well, please **BE SURE YOUR DATABASE SERVER WAS CREATED IN YOUR PHYSICAL LOCATION (WEST EUROPE IN MY CASE).**&nbsp; <p>&nbsp; <p>HTH  <p>[@jquintozamora](https://twitter.com/jquintozamora)