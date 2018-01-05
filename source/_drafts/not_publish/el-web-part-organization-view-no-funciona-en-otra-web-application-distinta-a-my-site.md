---
title: >-
  El Web Part Organization View no funciona en otra Web Application distinta a
  My Site
tags:
  - Español
permalink: el-web-part-organization-view-no-funciona-en-otra-web-application-distinta-a-my-site
id: 172
categories:
  - javascript
  - SharePoint
  - SharePoint 2013
  - webpart
date: 2014-07-08 10:25:38
---

Cuando intentamos poner el Organization Chart o Web Part Organization View en una página distinta a la que viene por defecto (My Sites), es cuando nos damos cuenta que no funciona, incluso si ya habiamos asegurado que podría ponerse sin problemas ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/07/wlemoticon-smile.png).

En realidad el problema real es&nbsp; que al utilizar Claims Based authentication, el código JavaScript que se encarga de comunicarse con el Object Silverlight en el caso de la vista Silverlight, y el prototipo JavaScript que se encarga de actuar en caso de la vista Web, no están implementados adecuadamente para soportarlo.

Buscando en internet, encontré solución para ambos. La primera función CreateHierarchyChartControl arregla la versión Silverligth y la segunda, en la cual sobrescribimos el prototipo de SP.UI.Portal.SimpleProfileBrowser.prototype.$2S_0 arregla la versión web.

Simplemente inclutyendo este código o bien en el page layout (justo arriba del webpart zone donde pongamos el org chart) o bien usando un Content Editor:

<pre class="js">

<script type="text/javascript">
                    function CreateHierarchyChartControl(parentId, profileId, type, persistControlId) {
                        var i = profileId.indexOf("|");
                        var claimsmode = profileId.substr(i-1,1);
                        if((i >=0 ) & (claimsmode=="w"))
                        {
                            profileId = profileId.substr(i+1,profileId.length-i-1);
                            var initParam = profileId + ',' + type + ',' + persistControlId;
                            var host = document.getElementById(parentId);
                            host.setAttribute('width', '100%');
                            host.setAttribute('height', '100%');
                            Silverlight.createObject('/_layouts/ClientBin/hierarchychart.xap',
                                                        host,
                                                        'ProfileBrowserSilverlightControl',
                                                        {
                                                            top: '30',
                                                            width: '100%',
                                                            height: '100%',
                                                            version: '2.0',
                                                            isWindowless: 'true',
                                                            enableHtmlAccess: 'true'
                                                        },
                                                        {
                                                            onLoad: OnHierarchyChartLoaded
                                                        },
                                                        initParam,
                                                        null);
                        }
                    }
                    SP.UI.Portal.SimpleProfileBrowser.prototype.$2S_0 = function ($p0, $p1, $p2) 
                    {
                        var i = $p0.indexOf("|");
                        $p0 = $p0.substr(i+1,$p0.length-i-1);

                        var $v_0 = $get($p1);
                        if ($v_0) {
                            $v_0.innerHTML = '<DIV></DIV><DIV></DIV><DIV></DIV>';
                            this.$h_0 = $v_0.firstChild;
                            this.$16_0 = this.$h_0.nextSibling;
                            this.$1e_0 = this.$16_0.nextSibling;
                        }
                        if ($p2) {
                            this.$h_0.innerHTML = String.format(SpsClient.ScriptResources.silverlight_Install_Message, '[Silverlight](javascript:Silverlight.getSilverlight()');
                            Sys.UI.DomElement.addCssClass(this.$h_0, 'ms-profileBrowserHeaderText');
                            Sys.UI.DomElement.addCssClass(this.$h_0.firstChild.nextSibling, 'ms-profileBrowserSilverlightLink');
                        }
                        this.$2V_0($p0);
                    }
                </script>
</pre>

&nbsp;

Referencias:

- [http://social.technet.microsoft.com/wiki/contents/articles/23593.sharepoint-2013-organization-browser-web-part-does-not-render-in-html-view-for-windows-claims-users.aspx](http://social.technet.microsoft.com/wiki/contents/articles/23593.sharepoint-2013-organization-browser-web-part-does-not-render-in-html-view-for-windows-claims-users.aspx "http://social.technet.microsoft.com/wiki/contents/articles/23593.sharepoint-2013-organization-browser-web-part-does-not-render-in-html-view-for-windows-claims-users.aspx")

- [http://support.microsoft.com/kb/2643420](http://support.microsoft.com/kb/2643420 "http://support.microsoft.com/kb/2643420")

&nbsp;

Espero que sea de ayuda!

Saludos!

JQ

@jquintozamora