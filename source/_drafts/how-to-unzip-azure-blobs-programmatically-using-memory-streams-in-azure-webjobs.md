---
title: >-
  How to Unzip Azure Blobs programmatically using Memory Streams in Azure
  WebJOBs
tags:
  - English
url: 814.html
id: 814
categories:
  - Azure
  - 'C#'
  - WebJob
date: 2016-09-13 16:52:24
---

[![image](https://blog.josequinto.com/wp-content/uploads/2016/09/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2016/09/image.png)

Hi,

Recently I had to **extract files from a .zip** **file stored on Azure Blob Storage in Azure WebJob process**. 

&nbsp;

This is what I did from scratch:

1\. **Create WebJob** project: [https://azure.microsoft.com/en-gb/documentation/articles/websites-dotnet-webjobs-sdk/](https://azure.microsoft.com/en-gb/documentation/articles/websites-dotnet-webjobs-sdk/ "https://azure.microsoft.com/en-gb/documentation/articles/websites-dotnet-webjobs-sdk/")

2\. Create Non-continuous Azure WebJob: [https://github.com/Azure/azure-webjobs-sdk-samples/blob/master/BasicSamples/TableOperations/Program.cs](https://github.com/Azure/azure-webjobs-sdk-samples/blob/master/BasicSamples/TableOperations/Program.cs "https://github.com/Azure/azure-webjobs-sdk-samples/blob/master/BasicSamples/TableOperations/Program.cs")

static void **Main**()
{
&nbsp;&nbsp;&nbsp; var host = new JobHost();
&nbsp;&nbsp;&nbsp; host.Call(typeof(**Functions**).GetMethod("MyMethod"));
}

public class **Functions**
{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** [NoAutomaticTrigger]**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public static void MyMethod()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

}

&nbsp;

3\. Install WindowsAzure.ConfigurationManager and WindowsAzure.Storage nuget packages.

&nbsp;&nbsp; > **Install-Package Microsoft.WindowsAzure.ConfigurationManager**

&nbsp;&nbsp; > **Install-Package WindowsAzure.Storage**

&nbsp;

4\. Add **System.IO.Compression.dll **from system dlls.

5\. Add this code:
<script src="https://gist.github.com/jquintozamora/ee5f5525c01347c5ff4e7bb880f64c85.js"></script> 

&nbsp;

Notes on the above code:

- Previously we need to create Azure Storage Account and get the **storageAccountName** and **storageAccountKey**.

- **CloudConfigurationManager** is able to retrieve settings firdt from Azure WebApp Settings UI and secondly from App.config file.

- We must create a new **Blob Container** and change in the code (or add a new app setting).

- **ZipArchive** is the system native approach to unzip files.

- Isn’t needed store temporary files to unzip and **I have tested files until 150 MB (10MB compressed) on WebJobs working fine**.

&nbsp;

HTH

[@jquintozamora](https://twitter.com/jquintozamora)