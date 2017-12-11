---
title: >-
  Enable SQL Azure access from Azure WebJobs by adding firewall rules using
  PowerShell
tags:
  - English
url: 818.html
id: 818
categories:
  - Azure
  - PowerShell
  - SQL Azure
  - WebJob
date: 2016-09-19 12:35:31
---

Hi,

When we are developing custom Azure Web Apps or WebJobs, likely we will need access to Azure SQL database. Depends on the needs you will use Entity Framework, or direct Queries using Stored Procedures, but this is not the topic of this post. The topic today is how to allow our Azure WebJob to access to SQL Azure database, doesn’t matter what method we are using.

After some investigation, there are different ways to do that, I will share with you the different options I concluded:

**1\. Allow access other Azure Services** 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![image](https://blog.josequinto.com/wp-content/uploads/2016/09/image_thumb-1.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/09/image-1.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Security Note**: this approach enables access to ALL AZURE SERVICES IN THE SAME REGION (even from other subscriptions).

&nbsp;

**2\. Allow Outbound IP Addresses of the Azure Web App in SQL Azure using a specific firewall rule**

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A) Dynamic IP**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1\. Use TimerJob to add rules every certain time (if the IP changes)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [http://stackoverflow.com/questions/31700835/how-do-enable-internal-azure-services-for-sql-azure-in-c-sharp](http://stackoverflow.com/questions/31700835/how-do-enable-internal-azure-services-for-sql-azure-in-c-sharp)

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2\. Use Powershell and schedule a task every certain time (THIS IS THE SCENARIO APPLIED ON THIS POST)**

&nbsp;

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B) Static IP** (probably expensive, requires Premium App Service Plan)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1\. Using ASE ([https://blog.kloud.com.au/2016/04/05/when-to-use-an-azure-app-service-environment](https://blog.kloud.com.au/2016/04/05/when-to-use-an-azure-app-service-environment), [https://azure.microsoft.com/en-us/documentation/articles/app-service-web-how-to-create-an-app-service-environment](https://azure.microsoft.com/en-us/documentation/articles/app-service-web-how-to-create-an-app-service-environment)) and Add the Firewall rules manually only once

&nbsp;

Some useful references:

- Configure an Azure SQL Database server-level firewall rule using the Azure Portal ([https://azure.microsoft.com/en-gb/documentation/articles/sql-database-configure-firewall-settings/](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-configure-firewall-settings/))  <p>- Reserved IP: [https://azure.microsoft.com/en-us/pricing/details/ip-addresses/](https://azure.microsoft.com/en-us/pricing/details/ip-addresses/)  <p>- Azure Security fundamentals: [https://blog.kloud.com.au/2015/10/27/azure-security-fundamentals-azure-sql-database/](https://blog.kloud.com.au/2015/10/27/azure-security-fundamentals-azure-sql-database/)  <p>- Create a server firewall rule in SQL Azure: [https://azure.microsoft.com/en-gb/documentation/articles/sql-database-command-line-tools/](https://azure.microsoft.com/en-gb/documentation/articles/sql-database-command-line-tools/)  <p>- What is outgoing IP on Azure Web Apps: [https://peter.intheazuresky.com/2016/02/26/azure-web-apps-outgoing-ip-questionanswer](https://peter.intheazuresky.com/2016/02/26/azure-web-apps-outgoing-ip-questionanswer)  <p>&nbsp; <p>Now I will share the PowerShell script that you can configure with your Azure Web App and SQL Server details to add automatically the outbound IPs into SQL Azure firewall:

&nbsp;
<script src="https://gist.github.com/jquintozamora/dda8d7a88794b76e63009ad0beb11c8b.js"></script> 

&nbsp;

Notes on the code:

- **Change all the configuration parameters** including Azure Admin, Web App and SQL info.

- Run the script and enjoy!

- **Outbound Public URL aren’t Static by default, **so probably they could change over the time (is not usual but can happen). So, I recommend some daily task to check every day and add the new IPs if needed. As the code is ready to update if the IPs are different. (read more [here](https://peter.intheazuresky.com/2016/02/26/azure-web-apps-outgoing-ip-questionanswer/))

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)