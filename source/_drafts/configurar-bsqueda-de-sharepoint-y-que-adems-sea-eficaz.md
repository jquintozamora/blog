---
title: Configurar Búsqueda de SharePoint y que además sea eficaz
tags:
  - Español
url: 58.html
id: 58
categories:
  - SharePoint 2013
  - SharePoint Search
  - SPConf
date: 2013-10-10 00:01:18
---

Es siempre tarea de SPAdmins el hacer que el servicio de búsqueda quede configurado después de una instalación de SharePoint, pero ahora hay que hacer un seguimiento y preguntarse:

¿La Búsqueda en SharePoint funciona bien?

¿Quien ha logrado hacerla funcionar bien con el siguiente, siguiente del Wizard?

Respuesta esperada: Nadie!

El motor de Búsqueda de SharePoint es muy criticado por los usuarios de SharePoint, sin embargo a nivel de características y funcionalidades es **uno de los más potentes del mercado**.

Realmente, cuando terminas la instalación de SharePoint y estas orgulloso de haberlo conseguido en el tiempo record de semana y media, entonces crees que todo está configurado y te encuentras con que a las tres semanas te viene un usuario y te dice:

[**usuario1**]: oye, que la búsqueda no me funciona, que le doy a buscar y me salen cero resultados.

[**<span style="color: #c0504d;">SPAdmin</span>**]: lo miro, pero estoy liado con otra cosa (mentira).

Aquí es cuando vas a la Central Administration y ves que la aplicación de servicio de Búsqueda no tiene ningún rastreo hecho.. Mmm se olvidó en el momento de configuración. Vale fácil, allá vamos rastreo completo que tarda 30 minutos ya que hay poquitos documentos.

Entonces, pasa otra semana y te viene el usuario:

[**usuario1**]: oye, que la búsqueda ahora si que me muestra resultados, pero no me encuentra lo que busco (casi todos los resultados son urls de vistas o listas de SharePoint).

[<span style="color: #c0504d;">**SPAdmin**</span>]: Pufff, la búsqueda de SharePoint es que no es muy buena (mentira, solo que no sabemos configurarla bien). Veré a ver que puedo hacer, pero esto es prioridad baja.

[**usuario1**]: vaya, la búsqueda de SharePoint no es buena, que pena, con lo que cuesta

Y aquí es donde en SharePoint 2010 iríamos a configurar un Scope que solamente tenga los documentos y que no contenga listas, pero cuando nos dicen que tenemos que configurar audiencias también, y que el scope tiene que ser compilado y que hay que hacer una serie de pasos inacabables, se nos quitan las ganas y lo dejamos de por vida como tarea que vamos retrasando. Pero, en SharePoint 2013 la cosa cambia. Ya que tenemos muchos cambios, entre ellos algunos que sustituyen a los scopes y muchas configuraciones de tuning. Os recomiendo que vengáis mi sesión de Búsqueda Empresarial de la Iberian SharePoint Conference  ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2013/10/wlemoticon-smile1.png).

Post-Conference intentaré compartir la información para aquellos que no hayan podido asistir.

<Update>

Aquí os dejo el enlace a las slides de la sesión: http://www.slideshare.net/quintorel/bsqueda-empresarial-en-sharepoint-2013-iberian-sharepoint-conference-jos-quinto

</Update>

Un Saludo!

JQ