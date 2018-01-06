---
title: >-
  Detectar Información sobre la Versión y Edición de Reporting Services para
  SharePoint
tags:
  - Español
permalink: detectar-informacin-sobre-la-versin-y-edicin-de-reporting-services-para-sharepoint
id: 79
categories:
  - SharePoint 2010
  - SSRS
date: 2014-02-03 01:10:29
---

Reporting Services en modo integrado con SharePoint tiene sus diferencias con el modo nativo. Entre ellas, es un verdadero dolor de cabeza encontrar la versión y edición de SSRS integrado con SharePoint. Veamos como podemos detectarlo.

En primer lugar, para poder ver estos datos, la forma más fácil es a través de los LOGs, y Reporting Services tiene los siguientes logs:
<table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top">&nbsp;</td><td valign="top">

**SharePoint**
</td><td valign="top">

**Native**
</td></tr><tr><td valign="top">

**Execution Logging**
</td><td valign="top">

ExecutionLog views in the ReportServer database.
</td><td valign="top">

ExecutionLog views in the ReportServer database.
</td></tr><tr><td valign="top">

**Trace Logging**
</td><td valign="top">

Tracelog files OR SharePoint ULS
</td><td valign="top">

Tracelog files
</td></tr><tr><td valign="top">

**HTTP**
</td><td valign="top">

IIS logs
</td><td valign="top">

Report Server Service HTTP Logs
</td></tr></tbody></table>

Concretamente la información sobre versión y edición la encontraremos en el “Trace Logs”.

Podemos encontrar información en el Technet sobre donde configurar y encontrar los [Trace Logs para la instancia Nativa de Reporting Services](http://technet.microsoft.com/en-us/library/ms156500.aspx), pero poco hay sobre el modo integrado con SharePoint.

En la ruta: “C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebServicesReporting” podemos encontrar la misma informacion que en el modo nativo encontrabamos bajo “Program FilesMicrosoft SQL ServerMSRS11.<instance name>Reporting ServicesReportServer” y concretamente el fichero rsreportserver.config es el equivalente a ReportingServicesService.exe.config, que es donde encontraremos la directiva RStrace.

Y en la ruta “C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebServicesLogFiles” es donde encontramos los ficheros de LOGS desde donde podremos extraer la versión y la edición tal como se comenta en [este artículo](http://msdn.microsoft.com/en-us/library/bb630446(v=sql.105).aspx).

To find version and edition information for a report server instance

1.  Open the Report Server service trace log file in a text editor. The file name is ReportServerService_<timestamp>.log and it is located in the folder, C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebServicesLogFiles folder.
<li>

    Report Server version information is in <Product> at the top of the file.
<li>

    Edition information for the report server can be found in the INFO statements further down in the file:

        *   <p>Reporting Services starting SKU shows the edition of the report server instance.

&nbsp;

Leer más:

- Reporting Services Execution and Trace Logging: [http://technet.microsoft.com/en-us/library/ms157403.aspx](http://technet.microsoft.com/en-us/library/ms157403.aspx "http://technet.microsoft.com/en-us/library/ms157403.aspx")

- Detect Version Information: [http://msdn.microsoft.com/en-us/library/bb630446(v=sql.105).aspx](http://msdn.microsoft.com/en-us/library/bb630446(v=sql.105).aspx "http://msdn.microsoft.com/en-us/library/bb630446(v=sql.105).aspx")

&nbsp;

Un saludo!

JQ