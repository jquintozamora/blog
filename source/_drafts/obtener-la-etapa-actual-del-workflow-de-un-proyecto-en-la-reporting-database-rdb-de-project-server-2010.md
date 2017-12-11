---
title: >-
  Obtener la etapa actual del workflow de un proyecto en la Reporting Database
  (RDB) de Project Server 2010
tags:
  - Español
url: 71.html
id: 71
categories:
  - Project Server 2010
  - SharePoint 2010
date: 2013-11-22 12:56:59
---

El tema de hoy es Project Server 2010, y el caso es que entender completamente como están mapeados y representados los estados de los flujos de trabajo de etapas de los proyectos en la Reporting Database, es una tarea compleja. 

Por ello, voy a documentar lo aprendido.

### 1\. ¿Que es la Reporting Database?

Es una base de datos en la cual unos Jobs de Project Server almacenan periódicamente la información relativa a Projects, Resources, Tasks, Issues, Risks, … Para ello obtiene los datos de las bases de datos de Project Server a través de PSI y de los sitios de SharePoint de Project Server para el caso de los Issues, Risks, etc.

### 2\. ¿Para que se usa la Reporting Database?

Cuando se quieren obtener datos de Project Server desde aplicaciones la mejor opción es utilizar la Project RDB. Ya que ahí está toda la información que necesitaremos agregada y actualizada con un retraso máximo de 5 minutos. Otras opciones son consultar información de Project Server a través de [PSI](http://msdn.microsoft.com/en-us/library/office/ms457477(v=office.14).aspx), pero es menos eficiente en términos de programación y de rendimiento. 

### 3\. ¿En que tablas se almacenan los proyectos y los estados de su flujo de trabajo asociado?

El esquema completo de la Reporting Database (RDB en adelante), se puede encontrar en el [SDK de Project Server](http://www.microsoft.com/en-us/download/details.aspx?id=15511). Pero a modo resumen:

**Información de proyectos**

Obtenerla desde la vista llamada** MSP_EpmProject_UserView**. Podréis observar que existe una tabla en la RDB que se llama MSP_EpmProject pero esta tabla no contiene los Custom Fields que se agregan en Project Server y probablemente los necesitemos, así que usar la visa.

**Información del estado actual del flujo de trabajo**

Cada proyecto en Project Server tiene asociado un flujo de trabajo, cuyas etapas pueden personalizarse para cada caso en cuestión. Pero lo que siempre es igual es el modo en que se almacenan estas etapas y se asocian a los proyectos en la RDB. Esta asociación se hace a través de dos tablas:

MSP_EpmWorkflowStage: Contiene la información de las etapas disponibles, que como bien comentaba, se pueden personalizar y agregar cuantas se quieran desde la configuración de Project Server. 

SELECT&nbsp; [StageUID]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[PhaseUID]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageName]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageDescription]
&nbsp;&nbsp; FROM [PWA_Reporting].[dbo].[MSP_EpmWorkflowStage]

&nbsp;

MSP_EpmWorkflowStatusInformation: Contiene la relación N a N entre los Projects y las Stages o etapas. Esta relación viene determinada por estos campos:

SELECT [ProjectUID]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageUID]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageOrder]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageStatus]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageEntryDate]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageCompletionDate]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[LastModifiedDate]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,[StageInformation]
&nbsp;&nbsp; FROM [PWA_Reporting].[dbo].[MSP_EpmWorkflowStatusInformation]

Donde:

- ProjectUID: Es el ID del proyecto que se puede obtener de la vista de Projects mencionada antes.

- StageUID: ID de la etapa que lo relaciona con la tabla MSP_EpmWorkflowStage.

- StageOrder: Indica el número de orden que tiene esta etapa dentro del flujo de trabajo.

- StageEntryDate: Fecha en la que se entró en dicha etapa. Si es NULL es porque todavía no se ha entrado en la etapa.

- StageCompletionDate: Fecha que se finalizó la etapa. Si es NULL es porque todavía no se ha finalizado la etapa. 

- StageStatus: Indica el estado de cada etapa dentro del flujo de trabajo. Cada proyecto tiene asociadas N etapas (las que se personalicen) y cada etapa dentro de cada proyecto tiene un estado, que es un número entre 0 y 6\. 

&nbsp;&nbsp; - **StageStatus = 0** –> Not Started. Etapa no iniciada.

&nbsp;&nbsp; - **StageStatus = 1** –> Waiting for Input. Etapa en marcha esperando algún tipo de acción por parte del usuario.

&nbsp;&nbsp; - **StageStatus = 2** –> Waiting for Approval. Etapa en marcha.

&nbsp;&nbsp; - **StageStatus = 3** –> Workflow Processing. Tarea en marcha.

&nbsp;&nbsp; - **StageStatus = 4** –> Stage Completed. El Workflow ya pasó por esta etapa y se completó con éxito.

&nbsp;&nbsp; - **StageStatus = 5** –> Completed with Errors. El Workflow pasó por esta etapa pero ocurrió algún error y no ha podido pasarse a la siguiente etapa.

&nbsp;&nbsp; - **StageStatus = 6** –> Workflow Completed. Este estado se pondrá solamente en la ultima etapa y cuando esta sea cerrada con éxito.

&nbsp;&nbsp; Se puede ver más información del estado de las etapas aquí: [http://social.technet.microsoft.com/Forums/projectserver/en-US/9b69e29d-19fc-45d1-a816-4645bc87ac78/filter-based-on-worklow-state?forum=projectserver2010general](http://social.technet.microsoft.com/Forums/projectserver/en-US/9b69e29d-19fc-45d1-a816-4645bc87ac78/filter-based-on-worklow-state?forum=projectserver2010general "http://social.technet.microsoft.com/Forums/projectserver/en-US/9b69e29d-19fc-45d1-a816-4645bc87ac78/filter-based-on-worklow-state?forum=projectserver2010general")

El resto de campos son auto-entendibles.

&nbsp;

### 4\. ¿Cómo puedo saber la etapa actual de todos los proyectos?

Ya tenemos todo el material necesario para obtener las etapas y los proyectos. Tendremos que hacer el cruce de las tres tablas anteriores para obtener toda la información.

Veamos pues esta consulta:

USE PWA_Reporting

GO

SELECT 
&nbsp;&nbsp;&nbsp;&nbsp; *

FROM
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmWorkflowStage as s

INNER JOIN
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmWorkflowStatusInformation as wi 
&nbsp;&nbsp;&nbsp;&nbsp; ON s.StageUID = wi.StageUID

INNER JOIN
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmProject_UserView as p 
&nbsp;&nbsp;&nbsp;&nbsp; ON wi.ProjectUID = p.ProjectUID

&nbsp;

Esta consulta nos devuelve la cantidad total de proyectos cruzados con el número de etapas. Es decir, si tenemos 100 proyectos y 7 etapas –> Esta consulta devolverá 700 filas. Que incluirá una fila por cada etapa que ha pasado, que está y que tiene que pasar, para cada proyecto. Pero lo que nos interesa ahora no es saber el estado de todas las etapas para todos los proyectos, sino conocer para cada proyecto, cual es su etapa actual (por la que va el workflow).

Por ejemplo, la siguiente imagen muestra para un proyecto aleatorio las 7 filas correspondientes con sus 7 etapas.&nbsp; De las cuales vemos que la primera etapa (StageOrder = 0) terminó satisfactoriamente (StageStatus = 4) y la segunda etapa (StageOrder = 1) está esperando un input (StageStatus = 1). El resto de etapas todavía no han comenzado.

[![image](https://blog.josequinto.com/wp-content/uploads/2013/11/image_thumb1.png "image")](https://blog.josequinto.com/wp-content/uploads/2013/11/image1.png)

Sabiendo esto,&nbsp; para filtrar toda la información y dejar solamente la (solo una) etapa actual del proyecto, debemos de quitar aquellos StageStatus = 0 puesto que no han comenzado todavía y también los StageStatus = 4, ya que estas etapas ya están finalizadas y se habrá pasado a la siguiente. 

La consulta final sería: 

USE PWA_Reporting

GO

SELECT 
&nbsp;&nbsp;&nbsp;&nbsp; p.ProjectName
&nbsp;&nbsp;&nbsp;&nbsp; ,s.StageName
&nbsp;&nbsp;&nbsp;&nbsp; ,wi.StageStatus
&nbsp;&nbsp;&nbsp;&nbsp; ,wi.StageEntryDate
&nbsp;&nbsp;&nbsp;&nbsp; ,wi.StageCompletionDate

FROM
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmWorkflowStage as s

INNER JOIN
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmWorkflowStatusInformation as wi 
&nbsp;&nbsp;&nbsp;&nbsp; ON s.StageUID = wi.StageUID

INNER JOIN
&nbsp;&nbsp;&nbsp;&nbsp; MSP_EpmProject_UserView as p 
&nbsp;&nbsp;&nbsp;&nbsp; ON wi.ProjectUID = p.ProjectUID

WHERE
&nbsp;&nbsp;&nbsp;&nbsp; --Remove these Stages not started, because we want to get the current stage of projects
&nbsp;&nbsp;&nbsp;&nbsp; wi.StageStatus <> 0
&nbsp;&nbsp;&nbsp;&nbsp; -- Remove these Stages completed, because we want to get current stage
&nbsp;&nbsp;&nbsp;&nbsp; AND wi.StageStatus <> 4

ORDER BY p.ProjectName, wi.StageOrder

&nbsp;

Hay varias consideraciones a tener en cuenta aquí:

 Cuando el StageStatus = 5 (Etapa completada con errores) también debemos incluirlo en la consulta, por ello no se ha eliminado en el Where. Y esto es así, por que si un proyecto tiene una etapa con estado 5 se pone fecha de fin a esta etapa, pero no se pone fecha de comienzo a la siguiente y digamos que el flujo de trabajo queda en esta etapa erróneamente y no se comienza la siguiente. Fijémonos en la imagen:

[![image](https://blog.josequinto.com/wp-content/uploads/2013/11/image_thumb2.png "image")](https://blog.josequinto.com/wp-content/uploads/2013/11/image2.png)

Por ello, no es buena practica basarnos solamente en los campos StageEntryDate y StageCompletionDate para realizar filtrados y saber en que etapa estamos. Es mejor fijarnos en los StageStatus.

Hay que tener en cuenta también que nos saldrán los proyectos con flujo de trabajo finalizado, es decir, con StageStatus = 6 en su ultima etapa.

&nbsp;

Espero que sirva de ayuda!

&nbsp;

Un saludo

JQ

@jquintozamora