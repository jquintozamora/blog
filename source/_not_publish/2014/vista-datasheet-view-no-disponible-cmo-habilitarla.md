---
title: Vista DataSheet View no disponible. ¿Cómo habilitarla?
tags:
  - Español
permalink: vista-datasheet-view-no-disponible-cmo-habilitarla/
id: 77
categories:
  - SharePoint
date: 2014-01-24 11:39:02
---

Uno de los típicos problemas cuando trabajamos con SharePoint 2010 es que tenemos deshabilitada la vista datasheet desde nuestras bibliotecas de documentos.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/01/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/01/image.png)

Cuando vemos algo así como la imagen de arriba, el problema suele ser porque estamos abriendo algún navegador no soportado.

Pero cuando estamos viendo habilitada la opcion de DataSheet pero nos sale un mensaje así:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/01/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/01/image1.png)

"The list cannot be displayed in Datasheet View for one or more of the following reasons:<p>- A datasheet component compatible with Microsoft SharePoint Foundation is not installed.
- Your Web browser does not support ActiveX controls.
- A component is not properly configured for 32-bit or 64-bit support."<p>&nbsp;

Entonces el problema es que no se está encontrando la librería adecuada, que se instala con la versión de 32 bits de Office.

La recomendación oficial de Microsoft es instalar Office 32 bits. Pero si por lo que sea tu negocio requiere de la versión de 64 bits, se puede hacer un truco, instalando los 2007 Office System Driver: Data Connectivity Components ( [http://www.microsoft.com/en-us/download/details.aspx?id=23734](http://www.microsoft.com/en-us/download/details.aspx?id=23734 "http://www.microsoft.com/en-us/download/details.aspx?id=23734") ).

&nbsp;

Se puede ver más información desde la página oficial de Microsoft: [http://office.microsoft.com/en-us/sharepoint-server-help/use-datasheet-view-in-64-bit-office-2010-HA101882420.aspx](http://office.microsoft.com/en-us/sharepoint-server-help/use-datasheet-view-in-64-bit-office-2010-HA101882420.aspx "http://office.microsoft.com/en-us/sharepoint-server-help/use-datasheet-view-in-64-bit-office-2010-HA101882420.aspx")

&nbsp;

&nbsp;

Saludos!

JQ