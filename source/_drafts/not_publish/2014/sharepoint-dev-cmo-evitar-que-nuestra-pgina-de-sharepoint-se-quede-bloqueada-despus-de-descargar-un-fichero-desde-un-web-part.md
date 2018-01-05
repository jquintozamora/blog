---
title: >-
  [SharePoint DEV] Cómo evitar que nuestra página de SharePoint se quede
  bloqueada después de descargar un fichero desde un Web Part
tags:
  - Español
permalink: sharepoint-dev-cmo-evitar-que-nuestra-pgina-de-sharepoint-se-quede-bloqueada-despus-de-descargar-un-fichero-desde-un-web-part
id: 152
categories:
  - Export
  - SharePoint
date: 2014-06-30 15:25:22
---

Cuando desarrollamos un Web Part de SharePoint, a veces se nos pide como requisito que exportemos ciertos datos al pulsar un botón. Debido a que en SharePoint la página completa está embebida dentro de un único <form>, solamente tendremos un hilo de ejecución. Esto quiere decir, que si mandamos a exportar algo a través de la sobre escritura del objeto HttpContext.Current.Response, esta descarga bloqueará la página y quedará en un estado de “necesito refrescar para volver a funcionar”.

Imaginemos que tenemos un webpart con un SPGridView en el que queremos poder un botón para Exportar a Excel:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/06/image_thumb8.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/06/image8.png)

Si implementamos el boton de Export con el típico método de Page.Response.WriteBinary(…):

<pre class="c#">
        private void oBtn_Export_Click(object sender, EventArgs e)
        {
            System.IO.MemoryStream stream = new System.IO.MemoryStream();
            using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
            {
                DataSet ds = new DataSet();
                ds.Tables.Add(GetDataTable());

                ExportExcel.WriteExcelFile(ds, document);

            }
            stream.Flush();
            stream.Position = 0;

            Page.Response.ClearContent();
            Page.Response.Clear();
            Page.Response.ClearHeaders();

            Page.Response.Buffer = true;
            Page.Response.Charset = "";

            //  NOTE: If you get an "HttpCacheability does not exist" error on the following line, make sure you have
            //  manually added System.Web to this project's References.
            string filename = "filename.xlsx";

            Page.Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
            Page.Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Page.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Page.Response.AddHeader("Content-Length", stream.Length.ToString());

            byte[] data1 = new byte[stream.Length];
            stream.Read(data1, 0, data1.Length);
            stream.Close();
            Page.Response.BinaryWrite(data1);
            Page.Response.Flush();
            Page.Response.End();

        }
</pre>

&nbsp;

Lo que nos ocurrirá será que la primera vez que clicamos el botón de Export nos dejará la página web sin estado, esto es, que si intentamos realizar una acción como exportar otra vez, no funcionará, a no ser que recarguemos la página. Tampoco funcionarán los filtros del SPGridView, si los tenemos activados. En definitiva, necesitamos de alguna forma volver a refrescar la página, ya sea con JavaScript o mediante algún otro medio automatizado para evitar perjudicar en la User Experience.

La solución menos intrusiva y más fácil de implementar sería poner ese JavaScript en la propiedad “OnClientClick” del Botón:

<pre class="c#">

Button oBtn_Export = new Button();
oBtn_Export.ID = "btn_export";
oBtn_Export.Text = "Export to Excel";
oBtn_Export.CssClass = "ButtonHeightWidth";
oBtn_Export.OnClientClick = "_spFormOnSubmitCalled = false;_spSuppressFormOnSubmitWrapper=true;";
oBtn_Export.Click += new EventHandler(oBtn_Export_Click);
this.Controls.Add(oBtn_Export);

</pre>

&nbsp;

Referencias:

- [http://reversealchemy.nl/building-a-spgridview-control-part-1-introducing-the-spgridview/](http://reversealchemy.nl/building-a-spgridview-control-part-1-introducing-the-spgridview/ "http://reversealchemy.nl/building-a-spgridview-control-part-1-introducing-the-spgridview/")

- [http://mytechsoup.com/?p=36](http://mytechsoup.com/?p=36 "http://mytechsoup.com/?p=36")

- [http://social.technet.microsoft.com/Forums/es-ES/2f31e42c-c717-499e-a5e4-dc174512dd1d/responseend-page-does-not-respond-after-file-download?forum=sharepointgeneralprevious](http://social.technet.microsoft.com/Forums/es-ES/2f31e42c-c717-499e-a5e4-dc174512dd1d/responseend-page-does-not-respond-after-file-download?forum=sharepointgeneralprevious "http://social.technet.microsoft.com/Forums/es-ES/2f31e42c-c717-499e-a5e4-dc174512dd1d/responseend-page-does-not-respond-after-file-download?forum=sharepointgeneralprevious")

&nbsp;

Espero que os sea de ayuda ![Gui&ntilde;o](https://blog.josequinto.com/wp-content/uploads/2014/06/wlemoticon-winkingsmile.png)

JQ

@jquintozamora