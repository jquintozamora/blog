---
title: Cómo mover colecciones de sitios entre entornos de SharePoint
tags:
  - Español
permalink: cmo-mover-colecciones-de-sitios-entre-entornos-de-sharepoint
id: 225
categories:
  - PowerShell
  - SharePoint
date: 2014-08-27 14:06:42
---

Una de las prácticas más necesitadas de SharePoint es poder actualizar el contenido entre entornos, por ejemplo, actualizar tu colección de sitios desde el servidor de PROD o UAT hasta Desarrollo. Si alguien lo hace sin tener ningún problema, que lo comente y le invitamos a una caña.

Para ello hay que tener en cuenta cosas como:

 - Tener las mismas versiones de las features, soluciones, etc, en ambos sitios, 

- Tener actualizados los metadatos administrados: [http://www.matthewjbailey.com/synchronize-import-or-copy-term-stores-managed-metadata-in-sharepoint/](http://www.matthewjbailey.com/synchronize-import-or-copy-term-stores-managed-metadata-in-sharepoint/ "http://www.matthewjbailey.com/synchronize-import-or-copy-term-stores-managed-metadata-in-sharepoint/")

- Tener un usuario común entre entornos como administrador, puede facilitar las cosas.

&nbsp;

En definitiva, este método también se puede utilizar para desplegar una nueva Web Application en un nuevo entorno teniendo otro entorno de partida. Por ejemplo, imaginemos que queremos montar un entorno de Disaster Recovery y queremos tener allí la ultima versión de todo, se podría utilizar ciertos scripts de PowerShell para automatizar el tema.

Veamos los pasos a seguir, partiendo de la base que queremos montar un entorno nuevo, crear la web app, etc:

1- Hacer el .bak a de la Content Database en el servidor Origen.

2- Restaurar el .bak de la Content Database en el servidor de BD destino.

3- Crear la Web Application en la granja destino.

<pre class="ps">

Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue 

$name = "SharePoint-TeamSite";
$port = 80
$hostHeader = "sitecollection.mydomain.com";
$url = "http://sitecollection.mydomain.com";
$appPoolName = "TeamSiteAppPool";
$managedAccount = "intranetpool";
$dbServer = "alias-content";
$dbName = "SP_Content_To_Remove";

#To create Claims-based authentication
$ap = New-SPAuthenticationProvider
New-SPWebApplication -Name $name -Port $port -HostHeader $hostHeader -URL $url -ApplicationPool $appPoolName -ApplicationPoolAccount (Get-SPManagedAccount $managedAccount) -DatabaseName $dbName -DatabaseServer $dbServer -AuthenticationProvider $ap
</pre>

4- Agregar la BD de Contenido en la nueva APP Web

<pre class="ps">Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue 

$dbServer = "alias-content";
$dbName = "SP_Content_Restored";
$Webapp = "http://sitecollection.mydomain.com";

Mount-SPContentDatabase $dbName -DatabaseServer $dbServer -WebApplication $Webapp

$dbTest = Get-SPContentDatabase -site $Webapp
Test-SPContentDatabase $dbTest -showrowcounts</pre>

5- Post Configurationes

- Cambiar los AAM, Cambiar el Site Collection Administrator, Installar las Features, Soluciones, etc.

&nbsp;

Y esto es todo!

&nbsp;

&nbsp;

Espero que les sea de ayuda!

@jquintozamora