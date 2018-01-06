---
title: Configurar la topología de Búsqueda de SharePoint 2013 con PowerShell
tags:
  - Español
permalink: configurar-la-topologa-de-bsqueda-de-sharepoint-2013-con-powershell
id: 115
categories:
  - SharePoint
date: 2014-05-27 09:21:04
---

La el motor de búsqueda de SharePoint es uno de los componentes más beneficiados de la versión 2013 de SharePoint, ya que se incluyeron en el muchas de las características de FAST. Debido a ello, y para tener claro como funciona un motor de búsquedas

[![image](https://blog.josequinto.com/wp-content/uploads/2014/05/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/05/image1.png)

##### 1\. Componente Rastreador (Crawler)

- Este componente es responsable de rastrear el contenido que proviene desde distintas fuentes de información. Invoca a los conectores y manejadores de protocolos adecuados para cada fuente de datos.<p>- Importante: Podemos desarrollar nuestros propios conectores personalizados Más información (en ingles): [http://msdn.microsoft.com/en-us/library/ee556429(v=office.15)](http://msdn.microsoft.com/en-us/library/ee556429(v=office.15))<p>- La base de datos de Crawl (A) se utiliza para almacenar información sobre los elementos rastreados y el historial del rastreo (tiempo del último rastreo, Id del último rastreo, …)

##### 2\. Componente de Procesamiento de Contenido (Content Processing)
<p>- Procesa los elementos rastreados y los pasa al componente de Indexación. Aquí es donde se usan los iFilters para hacer el parsing de los documentos. En SharePoint 2013 sigue pudiéndose extender los Format Handlers y crear un propio iFilter.<p>- Realiza una serie de procesos como: tokenización, detección de lenguaje, extracción de entidades, stopwords, stemming o lematización, etc.<p>- Escribe información en la base de datos de Links (B) para formar un Web Graph y poder usarlo en el modelo de ranking. Es decir, utiliza el mismo concepto que los motores de búsqueda de Internet para mejorar los ranking de resultados.<p>- Además también Genera variaciones fonéticas para la búsqueda de personas.

##### 3\. Componente de Procesamiento de Analíticas (Analytics Procesing)
<p>- Analiza los elementos rastreados y cómo los usuarios interaccionan con los resultados de búsqueda (Analytics Reporting Database - C). Por ejemplo, cuando un usuario ve una página ese evento se recoge en el (Event Store) y este componente puede usar esto para analizar comportamientos y mejorar el ranking consecuentemente.<p>- Podemos crear nuestros propios eventos personalizados<p>- También utiliza la base de datos de Link (B) para combinar esta información con la información de uso y obtener así mejoras para el algoritmo de ranking.

##### 4\. Componente de Indexación (Index Component)
<p>- Se encarga de obtener los elementos rastreados y procesados y escribirlos de forma adecuada en los ficheros de índice.<p>- También recibe las consultas de usuario en un formato compatible y comparable con el formato en que se almacenaron lo elementos. De esta forma es capaz de comparar la consulta del usuario con todos los documentos que tiene almacenados en el índice y devolver el conjunto de documentos (resultados) más adecuado.<p>- El componente de Índice permite Particiones de modo que se recomienda albergar hasta 10 millones de ítems en cada partición. Además se pueden configurar fácilmente réplicas del índice, de modo que podamos hacer tolerancia a fallos y también acercar el índice al componente de Query.<p>- ES importante saber que en SharePoint 2013 el índice alberga toda la información necesaria para hacer el procesamiento de consulta, es decir, los datos de security trimming están también en el fichero de índice.

##### 5\. Componente de Procesamiento de Consulta (Query Processing Component)
<p>- Realiza el procesamiento lingüístico en tiempo de consulta (word breaking, stemming, query spellcheking, expansión de la consulta [thesaurus]).<p>- Utiliza el modelo de similitud para convertir y adaptar la consulta en un formato adecuado y comparable con los documentos que existen en el índice.<p>- Optimiza la precisión y relevancia del motor de búsquedas<p>- Decide cuales de las “Reglas de Consulta” (nuevo término) son aplicables.<p>- Devuelve a la aplicación cliente los resultados de búsqueda

##### 6\. Administración de Búsqueda (Search Administration)
<p>- Responsable del aprovisionamiento y cambios en la topología de servidores de búsqueda<p>- Responsable de la coordinación de los distintos componentes mencionados anteriormente.<p>&nbsp;<p>Sabiendo esto, ya es más fácil decidir como será nuestra topología de búsqueda. Cabe decir, que en SharePoint 2013 tenemos una arquitectura mucho más escalable:<p>[![image](https://blog.josequinto.com/wp-content/uploads/2014/05/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/05/image2.png)<p>Fuente: [http://www.adrit.de/Blog/Post/9/Provisioning-SharePoint-2013-Search-Service-Application](http://www.adrit.de/Blog/Post/9/Provisioning-SharePoint-2013-Search-Service-Application "http://www.adrit.de/Blog/Post/9/Provisioning-SharePoint-2013-Search-Service-Application")<p>En la tabla de arriba podemos ver como todos los componentes de Enterprise Search son escalables y en todos se pueden implementar más de un servidor a modo de balanceo de carga y/o tolerancia a fallos.<p>&nbsp;<p>Veamos pues, como configurar la búsqueda en una granja de ejemplo que tiene 4 servidores, 1 WFE, 1 APP, 1 OWA y 1 BD. En cuyo caso utilizaremos el Servidor frontal para poner el componente de Query Processing y el resto los pondremos en el APP Server. Además pondremos replicas del índice para que esté cerca de todos los componentes:<p>[![image](https://blog.josequinto.com/wp-content/uploads/2014/05/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/05/image3.png)<p>Aquí os dejo el PowerShell usado para configurar esta granja:

<pre class="ps">

Add-PSSnapin Microsoft.SharePoint.PowerShell -erroraction SilentlyContinue

# Servers
$App01 = "<server 1 FQDN>"
$Web01 = "<server 2 FQDN>"

$SearchAppPoolName = "SharePoint_SearchAppPool"
$SearchAppPoolAccountName = "a\Search_Acount"

$SearchServiceName = "Enterprise Search Service Application"
$SearchServiceProxyName = "Enterprise Search Service Application Proxy"

$DatabaseServer = "alias-search"
$DatabaseName = "SP_EnterpriseSearch"

# Servers - Components Assignment
$adminServer = $App01
$crawlServer = $App01
$analyticsServer = $App01
$contentProcessingServer = $App01
$queryServer = $Web01
$indexServer1 = $App01
$indexServer2 = $Web01

####################  INSTANCE LEVEL CONFIGURATIONS ####################
# Check Enterprise Search Service Instance 1
Write-Host "Checking Enterprise Search Service Instance in $App01" -foreground Green
$SSIApp01 = Get-SPEnterpriseSearchServiceInstance -Identity $App01
if ($SSIApp01 -eq $null)
{
	throw "Unable to retrieve search service on $App01";
}
# Is Search Service Instance Online?
if ($SSIApp01.Status -ne "Online")
{
	Write-Host "Starting Enterprise Search Service Instance in $App01" -foreground Green
	$SSIApp01 | Start-SPEnterpriseSearchServiceInstance 
}
Write-Host "Starting Enterprise Search Query and Site Settings Service Instance in $App01" -foreground Green
Start-SPEnterpriseSearchQueryAndSiteSettingsServiceInstance $App01 -ErrorAction SilentlyContinue

# Check Enterprise Search Service Instance 2
Write-Host "Checking Enterprise Search Service Instance in $Web01" -foreground Green
$SSIWeb01 = Get-SPEnterpriseSearchServiceInstance -Identity $Web01
if ($SSIWeb01 -eq $null)
{
	throw "Unable to retrieve search service on $Web01";
}
# Is Search Service Instance Online?
if ($SSIWeb01.Status -ne "Online")
{
	Write-Host "Starting Enterprise Search Service Instance in $Web01" -foreground Green
	$SSIWeb01 | Start-SPEnterpriseSearchServiceInstance 
}
Write-Host "Starting Enterprise Search Query and Site Settings Service Instance in $Web01" -foreground Green
Start-SPEnterpriseSearchQueryAndSiteSettingsServiceInstance $Web01 -ErrorAction SilentlyContinue 
########################################################################

####################  SERVICE LEVEL CONFIGURATIONS #####################
Write-Host "Changing Enterprise Search Service Configurations (account, ...)" -foreground Green
$cred = Get-Credential $SearchAppPoolAccountName
$SearchService = Get-SPEnterpriseSearchService
Set-SPEnterpriseSearchService `
   -Identity $SearchService `
   -ServiceAccount $cred.UserName `
   -ServicePassword $cred.Password `
   -ContactEmail "searchadmin@company" `
   -ConnectionTimeout "60" `
   -AcknowledgementTimeout "60" `
   -ProxyType "Default" `
   -PerformanceLevel "Maximum"
########################################################################

##############  SERVICE APPLICATION LEVEL CONFIGURATIONS ###############
Write-Host "Checking Enterprise Search Service Application" -foreground Green
$searchServiceApp = Get-SPEnterpriseSearchServiceApplication $SearchServiceName -ErrorAction SilentlyContinue

if ($searchServiceApp -eq $null)
{
	$saAppPool = Get-SPServiceApplicationPool | where { $_.Name -eq $SearchAppPoolName }
	if ($saAppPool -eq $null)
	{
		Write-Host "Creating Search Application Pool $SearchAppPoolName" -foreground Green
		$saAppPool = New-SPServiceApplicationPool -Name $SearchAppPoolName -Account $SearchAppPoolAccountName -Verbose
	}
	$searchServiceApp = New-SPEnterpriseSearchServiceApplication -Name $SearchServiceName -ApplicationPool $saAppPool -DatabaseServer $DatabaseServer -DatabaseName $DatabaseName
	Write-Host "Search Service Application Created ($SearchServiceName)" -foreground Green
}
else
{
	throw "Search Service Application $SearchServiceName has been previously created.";
}
########################################################################

####################  SEARCH TOPOLOGY CONFIGURATIONS ###################
Write-Host "Checking Initial Search Topology" -foreground Green
$initialSearchTopology = ($searchServiceApp | Get-SPEnterpriseSearchTopology)
Write-Host "Creating a new Search Topology" -foreground Green
$newSearchTopology = New-SPEnterpriseSearchTopology -SearchApplication $searchServiceApp

# Admin Component
Write-Host "Creating a new Search Topology: Admin Component" -foreground Green
New-SPEnterpriseSearchAdminComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIApp01

# Content Processing Component
Write-Host "Creating a new Search Topology: Content Processing Component" -foreground Green
New-SPEnterpriseSearchContentProcessingComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIApp01
#New-SPEnterpriseSearchContentProcessingComponent –SearchTopology $newSearchTopology -SearchServiceInstance $App2SSI

# Analytics processing component
Write-Host "Creating a new Search Topology: Analytic Processing Component" -foreground Green
New-SPEnterpriseSearchAnalyticsProcessingComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIApp01

# Crawl component
Write-Host "Creating a new Search Topology: Crawl Component" -foreground Green
New-SPEnterpriseSearchCrawlComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIApp01

# Query Processing Component
Write-Host "Creating a new Search Topology: Query Processing Component" -foreground Green
New-SPEnterpriseSearchQueryProcessingComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIWeb01

# Two Index Replica
#Set the primary and replica index location; ensure these drives and folders exist on application servers and they are EMPTY!
$PrimaryIndexLocation = "E:\Media\Search\Index" 
$ReplicaIndexLocation = "E:\Media\Search\Index"
Write-Host "Creating a new Search Topology: IndexComponent And Replica" -foreground Green
New-SPEnterpriseSearchIndexComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIApp01 -RootDirectory $PrimaryIndexLocation -IndexPartition 0
New-SPEnterpriseSearchIndexComponent –SearchTopology $newSearchTopology -SearchServiceInstance $SSIWeb01 -RootDirectory $ReplicaIndexLocation -IndexPartition 0

Write-Host "Activating the new Search Topology" -foreground Green
$newSearchTopology.Activate()

Write-Host "Removing the old Search Topology" -foreground Green
Remove-SPEnterpriseSearchTopology -SearchApplication $searchServiceApp -Identity $initialSearchTopology 

Write-Host "Creating Proxy" -foreground Green
$searchProxy = New-SPEnterpriseSearchServiceApplicationProxy -Name $SearchServiceProxyName -SearchApplication $searchServiceApp 

########################################################################

Write-Host "Checking new Enterprise Search Service" -foreground Green
$ssa = Get-SPEnterpriseSearchServiceApplication
Get-SPEnterpriseSearchTopology -Active -SearchApplication $ssa

</pre><p>&nbsp;

Aquí podéis descargar también el fichero ps1: [EnterpriseSearch-SharePoint](https://blog.josequinto.com/wp-content/uploads/2014/05/enterprisesearch-sharepoint.zip "EnterpriseSearch-SharePoint").

&nbsp;

Espero que os sea de ayuda!

Saludos! 

JQ