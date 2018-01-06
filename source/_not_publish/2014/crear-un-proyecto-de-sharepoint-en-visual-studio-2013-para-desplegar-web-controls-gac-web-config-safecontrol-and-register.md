---
title: >-
  Crear un Proyecto de SharePoint en Visual Studio 2013 para desplegar Web
  Controls (GAC, web.config, SafeControl and Register)
tags:
  - Español
permalink: crear-un-proyecto-de-sharepoint-en-visual-studio-2013-para-desplegar-web-controls-gac-web-config-safecontrol-and-register
id: 221
categories:
  - Branding
  - Control
  - SharePoint
  - Visual Studio 2013
date: 2014-08-22 11:19:54
---

Han sido&nbsp; bastantes las veces que he tenido que hacer un Web Control para incluirlo en la master page o page layout. El motivo de hacer un webcontrol en lugar de un webpart es que el webpart hay que añadirlo en cada una de las páginas de SharePoint y en WebControl se puede añadir en la master o layout y queda fijo.

Hace algún tiempo escribí un post comentando como desplegar un control incluyendo el despliegue en la GAC, añadir el SafeControl en el web.config, etc.: [http://blogs.solidq.com/sharepoint/post.aspx?id=58&title=creating,+installing+and+configuring+sharepoint+controls+(webcontrol,+gac,+web.config,+safecontrol,+register)](http://blogs.solidq.com/sharepoint/post.aspx?id=58&title=creating,+installing+and+configuring+sharepoint+controls+(webcontrol,+gac,+web.config,+safecontrol,+register) "http://blogs.solidq.com/sharepoint/post.aspx?id=58&title=creating,+installing+and+configuring+sharepoint+controls+(webcontrol,+gac,+web.config,+safecontrol,+register)")

Ahora la cosa está más fácil y se puede automatizar el despliegue usando una feature.

Paso 1\. Crear un proyecto de tipo SharePoint Empty:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb3.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image3.png)

&nbsp;

Paso 2\. Añadir la Clase .cs con el código del control. En mi caso es un control que obtiene datos de una lista para mostrarlos en la master page, concretamente obtiene un Quote of the day aleatorio y lo muestra:

<pre class="c#">

using Microsoft.Office.Server;
using Microsoft.Office.Server.UserProfiles;
using Microsoft.SharePoint;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace XX.Controls
{
    [ToolboxData("<{0}:QuoteOfTheDay runat=server></{0}:QuoteOfTheDay>")]
    public class QuoteOfTheDay : WebControl
    {

        private String _listName = "QuoteOfTheDay";
        [Category("Behavior")]
        [PersistenceMode(PersistenceMode.Attribute)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Visible)]
        [Description("Type name of the list.")]
        public String ListName
        {
            get
            {
                return _listName;
            }
            set
            {
                _listName = value;
            }
        }

        protected override void CreateChildControls()
        {
            if (!string.IsNullOrEmpty(ListName))
            {
                SPList list = null;
                list = SPContext.Current.Site.RootWeb.GetList(SPContext.Current.Site.RootWeb.Url + "/Lists/" + ListName);
                if (list != null)
                {
                    int min = 0;
                    int max = list.ItemCount;

                    Random rnd = new Random();
                    int rndIndex = rnd.Next(min, max);

                    SPListItem item = list.Items[rndIndex];

                    SPFieldUserValue authorValue = new SPFieldUserValue(SPContext.Current.Site.RootWeb, item[SPBuiltInFieldId.Author].ToString());

                    SPServiceContext sContext = SPServiceContext.GetContext(SPContext.Current.Site);
                    UserProfileManager profileManager = new UserProfileManager(sContext);
                    UserProfile profile = profileManager.GetUserProfile(authorValue.User.LoginName);
                    UserProfileValueCollection values = profile[PropertyConstants.PictureUrl];

                    String pictureURL = "/_layouts/15/images/PersonPlaceholder.96x96x32.png";
                    if (values.Count > 0)
                    {
                        // Author Image: {37A5CA4C-7621-44d7-BF3B-583F742CE52F}
                        SPFieldUrlValue urlValue = new SPFieldUrlValue(values.Value.ToString());
                        pictureURL = urlValue.Url;
                    }

                    SPFieldUrlValue imageUrl = null;
                    if (item["Image"] != null)
                    {
                        imageUrl = new SPFieldUrlValue(item["Image"].ToString());
                    }
                    string divImageString = "";
                    if (imageUrl != null)
                    {
                        divImageString = "<div class='fQuoteImage'>![]()</div>";
                    }
                    string divs = @"<div class='fQuotePhrase'>
                                        <div class='mb-wrap mb-style-3'>
                                            > " + item.Title + @"
> "
> 
>                                                 + divImageString +
> 
>                                             @"
                                             <div class='mb-attribution'>
                                                <cite>
                                                    [
                                                        <div class='mb-author'>" + authorValue.User.Name + @"</div>
                                                    ]()
                                                </cite>
                                                <div class='mb-thumb'>![]()</div>
                                            </div>
                                        </div>
                                    </div>
                                    ";

                    this.Controls.Add(new LiteralControl(divs));
                }
                else
                {
                    this.Controls.Add(new LiteralControl("Unable to retrieve the list."));
                }
            }
            else
            {
                this.Controls.Add(new LiteralControl("Please you need to configure ListName Property."));
            }

        }

    }
}
</pre>

&nbsp;

Paso 3\. Crear una feature para que se despliegue a nivel de Web (SPWeb)

Este es el aspecto que tendrá la el proyecto despues de crear la feature:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb4.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image4.png)

&nbsp;

Paso 4\. Modificar el Package.package:

En la pestaña Advanced,

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb5.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image5.png)

Agregar un Assembly desde Project Output:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb6.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image6.png)

Añadir el asembly del proyecto actual y también un SafeControl:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb7.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image7.png)

Nota: Ayunque pongamos el PublicKeyToken como XXXXXXXXXXXXXXXXX, luego se sobreescribirá y se pondrá el valor correcto.

&nbsp;

Paso 5\. En las propiedades del proyecto, NO incluir el Assembly en el Package.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/08/image_thumb9.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/08/image9.png)

&nbsp;

Y esto es todo, de esta forma cuando desplegamos esta feature y package se desplegará la DLL en la GAC y se añadirá al web.config el SafeControl adecuado. Lo único que nos quedará de hacer manual es poner la directiva Register en la master o layout y añadir el control:

&nbsp;<p>`<%@ Register Tagprefix="CustomControls" Namespace="xx.Controls" Assembly="xx.Controls, Version=1.0.0.0, Culture=neutral, PublicKeyToken=XXXXXXXXXXXXXXXX" %>`<p>&nbsp;<p>`<``CustomControls:QuoteOfTheDay ``runat``=``"server"` `ListName``=``"Value"` `/>`<p>&nbsp;

&nbsp;

Espero que sea de ayuda!

@jquintozamora