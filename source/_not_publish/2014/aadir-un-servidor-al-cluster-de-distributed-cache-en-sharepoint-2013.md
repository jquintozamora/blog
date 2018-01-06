---
title: Añadir un servidor al cluster de Distributed Cache en SharePoint 2013
tags:
  - Español
permalink: aadir-un-servidor-al-cluster-de-distributed-cache-en-sharepoint-2013
id: 242
categories:
  - IT PRO
  - PowerShell
  - SharePoint 2013
date: 2014-10-08 15:32:54
---

SharePoint 2013 trae un nuevo servicio de cacheo de datos al que llama Distributed Cache. Este servicio se activa automáticamente para todos los servidores WFE y APPs de la granja de SharePoint.

Me gustaría explicar en otro post o artículo en detalle como funciona este servicio, lo tengo en los to do’s.

Pero lo que me gustaría comentar es como añadir o re-vincular un servidor que por lo que sea se ha salido del cluster de caché y nos está dando errores como este:

“Unexpected Exception in SPDistributedCachePointerWrapper::InitializeDataCacheFactory for usage 'DistributedLogonTokenCache' ”

&nbsp;

En ese caso lo primero que hacemos es ver si el servidor que recibe ese mensaje está en el Cluster de Distributed Cache:

Abrimos PowerShell:
<pre class="csharpcode">Get-CacheHost</pre>
[![image](https://blog.josequinto.com/wp-content/uploads/2014/10/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/10/image.png)

&nbsp;

Si no está en esta lista, tendremos que añadirlo de nuevo, y parece fácil pero hay que seguir un orden específico en los comandos PowerShell para que esto funcione bien:

Entramos en el servidor en cuestión y ejecutamos estos comandos:
<pre class="ps">

#Before you can administer anything related to the distributed cache 
# use this command to enable cache administration via PowerShell.
Use-CacheCluster

#Stop the distributed cache service on an individual machine. 
#The Graceful parameter will allow the cache service to migrate cached items to another host.
Stop-SPDistributedCacheServiceInstance -Graceful

#Removes a cache host from the cluster. 
#It’s always a good idea to stop the cache service before you remove it
Remove-SPDistributedCacheServiceInstance

#Adds a cache host back to the cluster. 
#If there is more than one host in the cluster, it will take a few minutes for the service to start 
#and for any cached items to be synchronized to the new host.
Add-SPDistributedCacheServiceInstance

#Restarts the distributed cache service on all servers in the cluster. 
#It will also clear the contents of the cache.
Restart-CacheCluster

#Re-check cluster cache status
Get-CacheHost
</pre>
&nbsp;

Después de esto,es recomendable hacer un **IISRESET **en los servidores frontales.

&nbsp;

Referencia en inglés: [http://almondlabs.com/blog/manage-the-distributed-cache/](http://almondlabs.com/blog/manage-the-distributed-cache/ "http://almondlabs.com/blog/manage-the-distributed-cache/")

&nbsp;

Espero que sea de ayuda.

JQ

@jquintozamora