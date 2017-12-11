---
title: >-
  Mejorar el rendimiento del escritorio remoto - RDP–cuando usamos Windows
  Server 2012
tags:
  - Español
url: 169.html
id: 169
categories:
  - performance
  - Windows Server
date: 2014-07-03 15:08:37
---

Durante algún tiempo he estado maldiciendo al equipo de Windows Server por el hecho de ponerle la interfaz tipo Windows 8\. Y es que cuando trabajas en remoto conectándote a un servidor que probablemente tenga un ping hasta de 300 milisegundos, pues empieza a ser algo tedioso el tener que darle al botón de inicio y observar la parafernalia de efectos y pantalla que se muestra, cuando lo único que queremos es abrir un cmd o powershell….

En fin, ya me he desahogado… 

Hace unos días descubrí, gracias a mi compi **Jesús Pérez** ( [@VirtualPerez](https://twitter.com/VirtualPerez "https://twitter.com/VirtualPerez") ), que se <strike>puede</strike> debe configurar el sistema operativo con las siguientes buenas prácticas:

1.  Power Options --> High Performance

[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image001.png)<p>2.&nbsp; Server Properties --> System -> Advanced settings –> Adjust for best Performance

[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image002.png)

[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image003_thumb.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2014/07/clip_image003.png)<p><font color="#3c3d47">Configurando así el Windows Server 2012, conseguimos que, aunque estemos **usando remote desktop connection** con grandes pings, nos ahorra una serie de efectos del sistema (que en server deberían estar deshabilitados by default). Y que nos da la sensación de que la **manejabilidad del sistema es mucho mejor**.</font>

&nbsp;

Espero que ayude!

Saludos!

JQ

@jquintozamora