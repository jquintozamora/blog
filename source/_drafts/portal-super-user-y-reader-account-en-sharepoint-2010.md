---
title: Portal Super User y Reader account en SharePoint 2010
tags:
  - Español
url: 63.html
id: 63
categories:
  - SharePoint 2010
  - Super User Account
date: 2013-11-18 18:17:09
---

Una de las tareas que se suele olvidar después de instalar y configurar SharePoint es establecer la cuenta que la caché de objetos de SharePoint utiliza para cachear. Sí que es cierto que esto solamente aplica si creamos sitios de publicación, pero el hecho de no tenerla configurada se traduce en una gran cantidad de fallos de caché “cache misses”. Por ejemplo para una página sencillita, si habilitamos el Developer Dashboard de SharePoint 2010 nos dice que existen 7362 errores de este tipo:

[![image](https://blog.josequinto.com/wp-content/uploads/2013/11/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2013/11/image.png)

Y si clicamos nos dice:

_Publishing Cache Warning 7362 Object Cache: The super user account utilized by the cache is not configured. This can increase the number of cache misses, which causes the page requests to consume unneccesary system resources.
&nbsp; To configure the account use the following command 'stsadm -o setproperty -propertyname portalsuperuseraccount -propertyvalue account -url webappurl'. The account should be any account that has Full Control access to the SharePoint databases but is not an application pool account.
&nbsp; Additional Data:
&nbsp; Current default super user account: SHAREPOINTsystem_

Para entender el porqué de este problema veamos la explicación.

&nbsp;

### Caché de Objetos de SharePoint

El objetivo de la “object cache” es reducir la carga en el servidor backend (sql server). Para ello crea una caché en cada uno de los servidores web, cacheando listas, items, etc. Para realizar este cacheo utiliza las cuentas “Portal Super User y Portal Super Reader”. La cuenta Portal Super User deve tener Full Control en la Web App. Y la cuenta Portal Super Reader debe tener Full Read access en la Web App.

Sí, esta muy bien saber esto, pero para entenderlo bien, lo contaré un poco más en detalle.

### Cuenta de usuario de Object Caché en detalle

En SharePoint 2010, cuando se realiza una consulta a ciertos items (ver biblioteca, una vista, código CAML, …) por debajo se está teniendo en cuenta **quien es el usuario** que está accediendo a esta información para poder** filtrarla dependiendo de los permisos**. Si está activada la **característica de publicación**, se activa la **caché de objetos** por defecto. Los **controles de publicación** (esos que se ponen en las páginas maestras y layouts para obtener items, navegación, etc.) realizan peticiones a la caché de objetos. Y esta caché de objetos **se rellena haciendo dos consultas**. La primera utilizando la cuenta **Portal Super User que incluye los items en borrador (draft)** y la segunda usando la **Portal Super Reader que incluye solamente los elementos que están publicados**. Evidentemente también se trae a caché las ACLs para a posteriori poder filtrar la información de acuerdo a los permisos. Si no se tienen configuradas estas dos cuentas la caché se obtiene para cada usuario que realiza la consulta y si se configuran estas dos cuentas solamente se obtienen los datos desde sql server hasta caché para estos dos usuarios. Lo cual se traduce en menos espacio de memoria ocupado en la caché. Digamos que en** lugar de hacer muchas cachés pequeñas, se construyen dos muy grandes con todos los elementos**, y luego ya se filtrarán los datos para cada usuario.

De forma predeterminada, la **Portal Super User es la System Account** del site y la **Portal Super Reader es NT AuthorityLocal Service**. Esto no es bueno por dos motivos:

1\. Algunos items están desprotegidos por la System Account. Por lo que cuando se hace una consulta que incluye estos items se devuelven las versiones desprotegidas en lugar de la ultima publicada. **Debido a esto, se hace otra consulta (repetición**) para obtener la versión correcta del item. **Esto afecta negativamente al rendimiento**. Por este motivo la Portal Super User account debe estar configurada a una cuenta que nunca acceda al sistema., vamos que se crea específicamente para este fin.

2\. La cuenta NT AuthorityLocal Service que no** es resuelta correctamente por Claims Authentication** va a obtener un **Access Denied** error cuando el sistema intente obtener estos datos. Y este acceso denegado va a necesitar después una conversión de cuentas que aunque se produzca, pero está repercutiendo **negativamente al rendimiento también**.

&nbsp;

### Configurar las cuentas de caché de objetos

Para ello vea la siguiente página: [http://technet.microsoft.com/es-es/library/ff758656.aspx](http://technet.microsoft.com/es-es/library/ff758656.aspx "http://technet.microsoft.com/es-es/library/ff758656.aspx")

Y cuidado, ya que si estamos usando Claims la segunda tarea con PowerShell es así:

$wa = Get-SPWebApplication -Identity "<WebApplication>" 

$wa.Properties["portalsuperuseraccount"] = "i:0#.w|domainsuperuser" 

$wa.Properties["portalsuperreaderaccount"] = "i:0#.w|domainsuperreader" 

$wa.Update()

&nbsp;

Una vez configurada, vemos que desaparecen los warning en el Developer Dashboard.

&nbsp;

&nbsp;

Referencias:

- [Configure object cache user accounts](http://technet.microsoft.com/en-us/library/ff758656(v=office.14).aspx "http://technet.microsoft.com/en-us/library/ff758656(v=office.14).aspx")

- [Resolving The super user account utilized by the cache is not configured](http://www.sharepointchick.com/archive/2010/10/06/resolving-the-super-user-account-utilized-by-the-cache-is.aspx "http://www.sharepointchick.com/archive/2010/10/06/resolving-the-super-user-account-utilized-by-the-cache-is.aspx")

- [SharePoint 2010 – Enable & using Developer Dashboard](http://blogs.technet.com/b/patrick_heyde/archive/2009/11/16/sharepoint-2010-enable-using-developer-dashboard.aspx "http://blogs.technet.com/b/patrick_heyde/archive/2009/11/16/sharepoint-2010-enable-using-developer-dashboard.aspx")

&nbsp;

&nbsp;

Un Saludo 

JQ

@jquintozamora