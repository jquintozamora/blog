---
layout: post
title: How to Unzip Azure Blobs programmatically using Memory Streams in Azure WebJOBs
language: English
permalink: how-to-unzip-azure-blobs-programmatically-using-memory-streams-in-azure-webjobs
id: 814
categories:
  - Azure
  - 'C#'
  - WebJob
date: 2016-09-13 16:52:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
Recently I had to **extract files from a .zip file** stored on Azure Blob Storage in Azure WebJob process. 


## The approach
This is what I did from scratch:

1. [**Create WebJob** project](https://azure.microsoft.com/en-gb/documentation/articles/websites-dotnet-webjobs-sdk)

2. [Create Non-continuous Azure WebJob](https://github.com/Azure/azure-webjobs-sdk-samples/blob/master/BasicSamples/TableOperations/Program.cs)
```cs
static void Main()
{
  var host = new JobHost();
  host.Call(typeof(Functions).GetMethod(“MyMethod”));
}

public class Functions
{
  [NoAutomaticTrigger]
  public static void MyMethod()
  {
    // code
  }
}
```

3. Install WindowsAzure.ConfigurationManager and WindowsAzure.Storage nuget packages.
```ps
Install-Package Microsoft.WindowsAzure.ConfigurationManager
Install-Package WindowsAzure.Storage
```

4. Add **System.IO.Compression.dll **from system dlls.

5. Add this code:
<script src="https://gist.github.com/jquintozamora/ee5f5525c01347c5ff4e7bb880f64c85.js"></script> 


## Important notes
- Previously we need to create Azure Storage Account and get the **storageAccountName** and **storageAccountKey**.
- **CloudConfigurationManager** is able to retrieve settings firdt from Azure WebApp Settings UI and secondly from App.config file.
- We must create a new **Blob Container** and change in the code (or add a new app setting).
- **ZipArchive** is the system native approach to unzip files.
- Isn’t needed store temporary files to unzip and **I have tested files until 150 MB (10MB compressed) on WebJobs working fine**.
