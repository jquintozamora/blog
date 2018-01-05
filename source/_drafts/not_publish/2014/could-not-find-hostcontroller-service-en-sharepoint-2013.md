---
title: Could not find HostController Service en SharePoint 2013
tags:
  - Español
permalink: could-not-find-hostcontroller-service-en-sharepoint-2013
id: 206
categories:
  - SharePoint 2013
  - SharePoint Search
date: 2014-08-14 18:20:27
---

Si nos encontramos un error parecido al de abajo por el LOG ULS de SharePoint 2013:

Could not find HostController Service in server servername. Skipping the server. Exception : System.ArgumentException: Could not find the ServiceInstance in server servername
at Microsoft.Office.Server.Search.Administration.SearchAdminUtils.GetServiceInstancesOnServers[T](IEnumerable`1 servers, String notFoundMessage)
at Microsoft.Office.Server.Search.Administration.SearchAdminUtils.GetServiceInstanceOnServer[T](String serverName)
at Microsoft.Office.Server.Search.Administration.Topology.SearchTopologyUtils.<>c__DisplayClassb.<CleanupOrphanNodesInSystem>b__4(SPServer farmServer)

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image1.png)

&nbsp;

Es debido a que para cada uno de los servidores, servidores de correo, alias de SQL, … que tengamos configurados en nuestro servidor, cuando está en marcha la búsqueda, intenta buscar al servicio de HostController buscando en esa lista, de arriba hacia abajo:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image2.png)

Por lo que tendremos que convivir con esta excepción.

&nbsp;

Espero que sea de ayuda,

JQ

@jquintozamora