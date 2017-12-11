---
title: '[SharePoint 2013] Cambiar los Alternate Access Mappings con PowerShell'
tags:
  - Español
url: 196.html
id: 196
categories:
  - AAM
  - PowerShell
  - SharePoint
  - SharePoint 2010
  - SharePoint 2013
date: 2014-07-31 16:42:58
---

Hoy me ha ocurrido tal cosa, que no sabría si sería capaz de recuperar la administración central de SharePoint, o había muerto definitivamente.

Hasta el día de ayer, accedía a la administración central de SharePoint con una URL como esta:

https://admin.mydomain.com

Donde, esta era mi configuración de Alternate Access Mappings:

&nbsp;
<table border="2" width="632" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="253">Internal URL</td>
<td valign="top" width="198">Zone</td>
<td valign="top" width="177">Public URL for Zone</td>
</tr>
<tr>
<td valign="top" width="304">https://admin.mydomain.com</td>
<td valign="top" width="223">Default</td>
<td valign="top" width="194">https://admin.mydomain.com</td>
</tr>
<tr>
<td valign="top" width="318">http://admin.mydomain.com</td>
<td valign="top" width="231">Default</td>
<td valign="top" width="201">https://admin.mydomain.com</td>
</tr>
</tbody>
</table>
Lo cual quiere decir, que la URL de acceso desde el exterior es con https, pero la URL interna es https. Por lo que estoy usando la técnica SSL-Offloading para que desde mi servidor Firewall hasta los servidores de SharePoint se trabaje con http, pero desde el servidor firewall hacía afuera se haga a través de https.

Bien, el tema es que estoy haciendo un cambio de dominio, y mi nuevo dominio es newdomain en lugar de mydomain. Y lo primero que hago es cambiar la configuración en el servidor de firewall y en los DNS.

Con estos cambios, por error, consigo que la administración central quede inaccesible, debido a que el nombre [https://admin.mydomain.com](https://admin.mydomain.com/) ya no está direccionado hacia el servidor correspondiente de SharePoint.

Ante esta situación, tenemos dos opciones:

1- Volver a pedir a Networks Team que deshagan el cambio para cambiar los AAM y los IIS Bindings antes del cambio.

2- Arreglarlo con PowerShell y algo de astucia.

El punto 1 retrasaría bastante, ya que como siempre, el equipo de Networks está muy solicitado. Vamos a por el reto del punto 2: cambiar los AAM sin Central Admin ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/07/wlemoticon-smile1.png)

La nueva tabla que yo quiero en los AAM para mi Central Admin es:
<table border="2" width="632" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="253">Internal URL</td>
<td valign="top" width="198">Zone</td>
<td valign="top" width="177">Public URL for Zone</td>
</tr>
<tr>
<td valign="top" width="304">https://admin.newdomain.com</td>
<td valign="top" width="223">Default</td>
<td valign="top" width="194">https://admin.newdomain.com</td>
</tr>
<tr>
<td valign="top" width="318">http://admin.newdomain.com</td>
<td valign="top" width="231">Default</td>
<td valign="top" width="201">https://admin.newdomain.com</td>
</tr>
</tbody>
</table>
Además de hacer esto por la parte de SharePoint también tendré que cambiar los IIS Bindings para la App de la Administración Central.

<pre class="ps">

# Este nos muestra la tabla de AAM con los campos IncomingURL (url interna), Zone y PublicURL
Get-SPAlternateURL -WebApplication https://admin.mydomain.com

#Vemos que están los valores anteriores 

# Cambiamos los valores de la Public URL para esta zona y applicacion
Set-SPAlternateURL -Identity https://admin.mydomain.com -Url https://admin.newdomain.com -Zone "Default"

# Volvemos a consultar los valores, pero esta vez podemos como Identity la nueva url, ya que la otra no funcionará
Get-SPAlternateURL -Identity https://admin.newdomain.com

# Hasta este punto, hemos cambiado la parte de URL pública, pero nos queda la parte de Internal URL
# lo cual no es para nada intuitivo, ni está documentado.

# Primer Paso: Crear una nueva asignación de URL Interna
# Fijémonos en la URL interna que va sin https y en el parámetro -Internal, que le dice al comando que este valor será el internal URL
New-SPAlternateURL -WebApplication https://admin.newdomain.com -Url http://admin.newdomain.com -Zone "Default" -Internal

# Llegados a este punto, tendremos una tabla de AAM con tres entradas
# https://admin.newdomain.com ….
# http://admin.newdomain.com ….
# http://admin.mydomain.com  ….
Remove-SPAlternateURL -Identity http://admin.mydomain.com 

# Preguntará confirmación, le  decimos que sí.</pre>

Y ahora solamente nos queda cambiar la configuración de los IIS Bindings para que refleje también el nuevo valor admin.newdomain.com en lugar de admin.mydomain.com.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/07/image_thumb7.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/07/image7.png)

&nbsp;

Y esto es todo amigos ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/07/wlemoticon-smile1.png)

&nbsp;

Espero que sirva de ayuda!

Saludos

JQ

@jquintozamora