---
title: >-
  SharePoint List Site Collection Web Part Aggregator using SPSiteDataQuery and
  SPGridView
tags:
  - English
url: 329.html
id: 329
categories:
  - SharePoint
  - webpart
date: 2015-01-30 18:34:44
---

Hi,

I had a requirement to create an Aggregation Web Part to combine information from different sites in the same site collection. Moreover, it need to be represented as a table with sortable, filterable and exportable features enabled. Basically similar behavior we have in SharePoint OOTB lists.

We have here three main challenges:

- Data Access Layer: get all the information thru Site Collection efficiently.

- Presentation Layer: display all the information in a table with sortable and filterable columns.

- Export to excel: Add this feature to table.

&nbsp;

**Data Access Layer**

The best object to get information thru all Site Collection in terms of performance is SPSiteDataQuery.

It is **very important** to add ServerTemplate

&nbsp; q.Lists = "<Lists ServerTemplate='100' BaseType='0' MaxListLimit='0' />"

Adding ServerTemplate: 19 seconds

Without adding ServerTemplate: 6 seconds

&nbsp;
<pre class="csharpcode"><span class="kwrd">public</span> DataTable PopulateDatasetSPSiteDataQuery(<span class="kwrd">string</span> sortExpression, <span class="kwrd">string</span> contentType, <span class="kwrd">string</span> fieldsNames)
        {
            <span class="kwrd">if</span> (!<span class="kwrd">string</span>.IsNullOrEmpty(contentType))
            {
                <span class="kwrd">if</span> (HttpRuntime.Cache[CACHE_KEY] == <span class="kwrd">null</span>)
                {
                    <span class="kwrd">string</span> status = <span class="str">"The following items are **NOT** fetched from the cache

"</span>;
                    <span class="rem">//In order to know all field Internal Names: $dependenciesList.Fields | Select InternalName</span>
                    SPSiteDataQuery q = <span class="kwrd">new</span> SPSiteDataQuery();
                    <span class="kwrd">string</span>[] fields = getFieldsNames(fieldsNames);

                    <span class="kwrd">string</span> nameField, typeField;

                    q.ViewFields = <span class="str">"<FieldRef Name='Title' />"</span>;
                    q.ViewFields += <span class="str">"<FieldRef Name='Team' Type='Lookup' Nullable='True' />"</span>;

                    <span class="kwrd">if</span> (fields != <span class="kwrd">null</span>)
                    {
                        <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i < fields.Length; i++)
                        {
                            nameField = fields[i].Split(<span class="str">','</span>)[1].ToString();
                            typeField = fields[i].Split(<span class="str">','</span>)[2].ToString();
                            q.ViewFields += String.Concat(<span class="str">"<FieldRef Name='"</span>, nameField, <span class="str">"' Type='"</span>, typeField, <span class="str">"' Nullable='True' />"</span>);
                        }
                    }

                    q.ViewFields += <span class="str">"<FieldRef Name='FileDirRef'  Nullable='True' />"</span>;
                    q.Lists = <span class="str">"<Lists ServerTemplate='100' BaseType='0' MaxListLimit='0' />"</span>; <span class="rem">// tipo de objeto donde queremos buscar. GenericList = 0, DocumentLibrary = 1, DiscussionForum = 3, VoteOfSurvey = 4, IssueList = 5</span>
                    q.Webs = <span class="str">"<Webs Scope='SiteCollection' />"</span>; <span class="rem">// alcance de la busqueda</span>

                    q.Query = String.Concat(<span class="str">"<Where><Eq><FieldRef Name='ContentType' /><Value Type='Text'>"</span>, contentType, <span class="str">"</Value></Eq></Where>"</span>); <span class="rem">// query CAML</span>

                        <span class="kwrd">using</span> (SPWeb w = <span class="kwrd">new</span> SPSite(String.Concat(HttpContext.Current.Request.Url.Scheme, <span class="str">"://"</span>, HttpContext.Current.Request.Url.Authority, <span class="str">"/PWA/"</span>)).OpenWeb())
                        {
                            DataTable oDataTable = <span class="kwrd">new</span> DataTable();
                            <span class="kwrd">using</span> (SPMonitoredScope populateDataSet = <span class="kwrd">new</span> SPMonitoredScope(<span class="str">"GetSiteData_PopulateData"</span>))
                            {
                                <span class="kwrd">try</span>
                                {
                                    oDataTable = w.GetSiteData(q);
                                    Logger.LogInfo(Logger.Constants.LogSource.LOGSRC_COMMON, <span class="str">"Number of items from GetSiteData_PopulateData: "</span> + oDataTable.Rows.Count);
                                }
                                <span class="kwrd">catch</span> (Exception)
                                {
                                    oDataTable = <span class="kwrd">null</span>;

                                }

                            }

                            <span class="kwrd">if</span> (oDataTable != <span class="kwrd">null</span>)
                            {
                                newTable.Columns.Add(<span class="str">"ProjectName"</span>);
                                <span class="kwrd">foreach</span> (DataColumn col <span class="kwrd">in</span> oDataTable.Columns) <span class="rem">// Loop over the rows.</span>
                                {
                                    newTable.Columns.Add(col.ColumnName);
                                }

                                <span class="kwrd">foreach</span> (DataRow row <span class="kwrd">in</span> oDataTable.Rows) <span class="rem">// Loop over the items.</span>
                                {
                                    DataRow newRow = newTable.Rows.Add();

                                    newRow[<span class="str">"ProjectName"</span>] = row[<span class="str">"FileDirRef"</span>].ToString().Split(<span class="str">'/'</span>)[1];
                                    <span class="kwrd">foreach</span> (DataColumn col <span class="kwrd">in</span> oDataTable.Columns) <span class="rem">// Loop over the rows.</span>
                                    {
                                        <span class="kwrd">string</span> initialValue = row[col.ColumnName].ToString();
                                        <span class="kwrd">string</span> finalValue = initialValue;
                                        <span class="kwrd">if</span> (!<span class="kwrd">string</span>.IsNullOrEmpty(initialValue))
                                        {
                                            <span class="kwrd">if</span> (col.ColumnName.Equals(<span class="str">"Team"</span>) || col.ColumnName.Equals(<span class="str">"Depends_x0020_On"</span>))
                                            {
                                                <span class="kwrd">try</span>
                                                {
                                                    SPFieldLookupValue lookupGroup = <span class="kwrd">new</span> SPFieldLookupValue(initialValue);
                                                    finalValue = lookupGroup.LookupValue;
                                                }
                                                <span class="kwrd">catch</span> (Exception) { }
                                            }
                                            <span class="kwrd">if</span> (col.ColumnName.Equals(<span class="str">"Due_x0020_Date"</span>) || col.ColumnName.Equals(<span class="str">"DueDate"</span>))
                                            {
                                                finalValue = <span class="str">""</span>;
                                                DateTime date;
                                                <span class="kwrd">if</span> (DateTime.TryParse(row[col.ColumnName].ToString(), <span class="kwrd">out</span> date))
                                                {
                                                    finalValue = date.ToString(<span class="str">"dd/MM/yyyy"</span>);
                                                }

                                            }
                                            <span class="kwrd">if</span> (col.ColumnName.Equals(<span class="str">"AssignedTo"</span>))
                                            {
                                                <span class="kwrd">try</span>
                                                {
                                                    SPFieldUserValue userValue = <span class="kwrd">new</span> SPFieldUserValue(w, initialValue);
                                                    finalValue = userValue.LookupValue;
                                                }
                                                <span class="kwrd">catch</span> (Exception) { }
                                            }

                                        }
                                        newRow[col.ColumnName] = finalValue;

                                    }
                                }
                            }
                        }

                        HttpRuntime.Cache.Add(CACHE_KEY,
                        newTable,
                        <span class="kwrd">null</span>,
                        DateTime.MaxValue,
                        TimeSpan.FromMinutes(CACHE_MINUTES),
                        System.Web.Caching.CacheItemPriority.Default, <span class="kwrd">null</span>);
                }
                <span class="kwrd">else</span>
                {
                    <span class="kwrd">string</span> status = <span class="str">"The following items **ARE** fetched from the cache!

"</span>;
                    newTable = (DataTable)HttpRuntime.Cache[CACHE_KEY];
                }
            }

            <span class="rem">//clean up the sort expression if needed - the sort descending </span>
            <span class="rem">//menu item causes the double in some cases </span>
            <span class="kwrd">if</span> (sortExpression.ToLowerInvariant().EndsWith(<span class="str">"desc desc"</span>))
                sortExpression = sortExpression.Substring(0, sortExpression.Length - 5);

            <span class="rem">//need to handle the actual sorting of the data</span>
            <span class="kwrd">if</span> (!<span class="kwrd">string</span>.IsNullOrEmpty(sortExpression))
            {
                <span class="kwrd">try</span>
                {
                    DataView view = <span class="kwrd">new</span> DataView(newTable);
                    view.Sort = sortExpression;
                    DataTable newTable2 = view.ToTable();
                    newTable.Clear();
                    newTable.Merge(newTable2);
                }
                <span class="kwrd">catch</span> (Exception ex)
                {
                    LiteralControl literal = <span class="kwrd">new</span> LiteralControl(<span class="kwrd">string</span>.Concat(<span class="str">"SortExpression: "</span>, ex.ToString()));
                    <span class="kwrd">this</span>.Controls.Add(literal);
                }
            }

            <span class="kwrd">return</span> newTable;
        }</pre>

&nbsp;

**Presentation Layer**

After evaluating different alternatives the easiest approach is to use **SPGridView** because it provides OOTB features like filtering and sorting.
<pre class="csharpcode"><span class="rem">// Notice that PopulateDatasetSPSiteDataQuery is called from this.Controls</span>
                gridDS = <span class="kwrd">new</span> ObjectDataSource();
                gridDS.ID = <span class="str">"gridDS"</span>;
                gridDS.SelectMethod = <span class="str">"PopulateDatasetSPSiteDataQuery"</span>;
                gridDS.TypeName = <span class="kwrd">this</span>.GetType().AssemblyQualifiedName;
                gridDS.EnableViewState = <span class="kwrd">false</span>;
                gridDS.SortParameterName = <span class="str">"SortExpression"</span>;
                gridDS.SelectParameters.Add(<span class="str">"contentType"</span>, ContentType);
                gridDS.SelectParameters.Add(<span class="str">"fieldsNames"</span>, FieldsNames);
                gridDS.FilterExpression = FilterExpression;
                <span class="kwrd">this</span>.Controls.Add(gridDS);

                oGrid = <span class="kwrd">new</span> SPGridView();
                oGrid.ID = <span class="str">"oGrid"</span>;
                oGrid.AutoGenerateColumns = <span class="kwrd">false</span>;
                oGrid.EnableViewState = <span class="kwrd">false</span>;

                <span class="rem">//Disable Pagging</span>
                oGrid.AllowPaging = <span class="kwrd">false</span>;

                <span class="rem">// Sorting Code</span>
                oGrid.AllowSorting = <span class="kwrd">true</span>;

                <span class="rem">//filtering </span>
                oGrid.AllowFiltering = <span class="kwrd">true</span>;

                StringBuilder filterDataFields = <span class="kwrd">new</span> StringBuilder();
                FieldsArray = getFieldsNames(FieldsNames);
                filterDataFields.Append(<span class="str">"ProjectName"</span>);             
                filterDataFields.Append(<span class="str">","</span>);
                filterDataFields.Append(<span class="str">"Title"</span>);

                <span class="rem">//Fields in Object Data Source = ProjectName, ListId, WebId, ID, Title, Team, Depends_x0020_On, Due_x0020_Date, Status, FileDirRef, Notes</span>
                <span class="kwrd">if</span> (FieldsArray != <span class="kwrd">null</span>)
                {
                    <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i < FieldsArray.Length; i++)
                    {
                       <span class="kwrd">string</span> field = FieldsArray[i].Split(<span class="str">','</span>)[1].ToString();
                       <span class="kwrd">if</span> (!field.Equals(<span class="str">"Notes"</span>))
                       {
                           filterDataFields.Append(<span class="str">","</span>);
                           filterDataFields.Append(field);
                       }
                    }
                }
                <span class="rem">//oGrid.FilterDataFields = "ProjectName,Title,Team,Depends_x0020_On,Due_x0020_Date,Status";</span>
                oGrid.FilterDataFields = filterDataFields.ToString();
                oGrid.FilteredDataSourcePropertyName = <span class="str">"FilterExpression"</span>;
                oGrid.FilteredDataSourcePropertyFormat = <span class="str">"{1} = '{0}'"</span>;

                oGrid.Sorting += <span class="kwrd">new</span> GridViewSortEventHandler(gridView_Sorting);
                oGrid.RowDataBound += <span class="kwrd">new</span> GridViewRowEventHandler(gridView_RowDataBound);

                AddColumnsToSPGridView();

                <span class="rem">//TODO: </span>
                <span class="rem">//Add logic to make a custom data set and preprocess the information adapting the texts </span>
                <span class="rem">// and providing a new field called Project.</span>

                oGrid.DataSourceID = gridDS.ID;

                <span class="rem">// Add Control to Page</span>
                Controls.Add(oGrid);</pre>

&nbsp; <p>&nbsp; <p>**Export to Excel**
<p>I have used this code to Export to excel the filtered items in the table.
<p>&nbsp;<pre class="csharpcode">        <span class="kwrd">private</span> <span class="kwrd">void</span> oBtn_Export_Click(<span class="kwrd">object</span> sender, EventArgs e)
        {

            oGrid.AllowPaging = <span class="kwrd">false</span>;
            oGrid.AllowSorting = <span class="kwrd">false</span>;
            oGrid.AllowFiltering = <span class="kwrd">false</span>;

            System.IO.MemoryStream stream = <span class="kwrd">new</span> System.IO.MemoryStream();
            <span class="kwrd">using</span> (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, <span class="kwrd">true</span>))
            {
                DataSet ds = <span class="kwrd">new</span> DataSet();
                var dv = (DataView)gridDS.Select();
                <span class="kwrd">if</span> (dv != <span class="kwrd">null</span> && dv.Count > 0)
                {
                    DataTable dt = dv.ToTable();
                    <span class="rem">//Check to hide columns</span>
                    List<String> columnsInGrid = <span class="kwrd">new</span> List<<span class="kwrd">string</span>>();
                    <span class="kwrd">if</span> (oGrid.HeaderRow != <span class="kwrd">null</span>)
                    {
                        <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i < oGrid.HeaderRow.Cells.Count; i++)
                        {
                            DataControlFieldHeaderCell headerfield = oGrid.HeaderRow.Cells[i] <span class="kwrd">as</span> DataControlFieldHeaderCell;
                            DataControlField spbf = headerfield.ContainingField <span class="kwrd">as</span> DataControlField;
                            <span class="rem">//Notice that SortException allways must be the same that DataField</span>
                            columnsInGrid.Add(spbf.SortExpression); <span class="rem">//["DataField"]);</span>
                        }
                    }
                    <span class="kwrd">for</span> (<span class="kwrd">int</span> i = dt.Columns.Count - 1; i >= 0; i--)
                    {
                        <span class="kwrd">if</span> (!columnsInGrid.Contains(dt.Columns[i].ToString()))
                        {
                            dt.Columns.RemoveAt(i);
                        }
                    }
                    ds.Tables.Add(dt);
                }
                ExportExcel.WriteExcelFile(ds, document);

            }
            stream.Flush();
            stream.Position = 0;

            Page.Response.ClearContent();
            Page.Response.Clear();
            Page.Response.ClearHeaders();
            Page.Response.Buffer = <span class="kwrd">true</span>;
            Page.Response.Charset = <span class="str">""</span>;

            <span class="rem">//  NOTE: If you get an "HttpCacheability does not exist" error on the following line, make sure you have</span>
            <span class="rem">//  manually added System.Web to this project's References.</span>
            <span class="kwrd">string</span> filename = <span class="str">"Report.xlsx"</span>;

            Page.Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
            Page.Response.AddHeader(<span class="str">"content-disposition"</span>, <span class="str">"attachment; filename="</span> + filename);
            Page.Response.ContentType = <span class="str">"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"</span>;
            Page.Response.AddHeader(<span class="str">"Content-Length"</span>, stream.Length.ToString());

            <span class="kwrd">byte</span>[] data1 = <span class="kwrd">new</span> <span class="kwrd">byte</span>[stream.Length];
            stream.Read(data1, 0, data1.Length);
            stream.Close();
            Page.Response.BinaryWrite(data1);
            Page.Response.Flush();
            Page.Response.End();

        }</pre>
<p>&nbsp; <p>&nbsp; <p>You can download full code from here: [SiteCollectionWebPartAggregator.zip](https://blog.josequinto.com/wp-content/uploads/2015/01/SiteCollectionWebPartAggregator.zip "https://blog.josequinto.com/wp-content/uploads/2015/01/SiteCollectionWebPartAggregator.zip")
<p>&nbsp; <p>&nbsp; <p>&nbsp; <p>&nbsp; <p>- References: 

- [http://blogs.technet.com/b/elfarodeprojectserver/archive/2012/02/22/project-server-2010-elevados-tiempos-de-respuesta-al-cargar-paginas-de-sitios-pwa.aspx](http://blogs.technet.com/b/elfarodeprojectserver/archive/2012/02/22/project-server-2010-elevados-tiempos-de-respuesta-al-cargar-paginas-de-sitios-pwa.aspx "http://blogs.technet.com/b/elfarodeprojectserver/archive/2012/02/22/project-server-2010-elevados-tiempos-de-respuesta-al-cargar-paginas-de-sitios-pwa.aspx")

- [http://apmblog.compuware.com/2009/01/28/sharepoint-list-performance-how-list-column-indices-really-work-under-the-hood/](http://apmblog.compuware.com/2009/01/28/sharepoint-list-performance-how-list-column-indices-really-work-under-the-hood/ "http://apmblog.compuware.com/2009/01/28/sharepoint-list-performance-how-list-column-indices-really-work-under-the-hood/")

- [http://msdn.microsoft.com/es-es/library/microsoft.sharepoint.spsitedataquery_members(v=office.15).aspx](http://msdn.microsoft.com/es-es/library/microsoft.sharepoint.spsitedataquery_members(v=office.15).aspx "http://msdn.microsoft.com/es-es/library/microsoft.sharepoint.spsitedataquery_members(v=office.15).aspx")

- [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsitedataquery.lists.aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsitedataquery.lists.aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsitedataquery.lists.aspx")

- [http://abstractspaces.wordpress.com/tag/reference-cheat-sheet-caml-basetype-servertemplate/](http://abstractspaces.wordpress.com/tag/reference-cheat-sheet-caml-basetype-servertemplate/ "http://abstractspaces.wordpress.com/tag/reference-cheat-sheet-caml-basetype-servertemplate/")

- Query Lists: [http://central.corasworks.net/wpsupport/10/default.htm?turl=Docs%2FAdvanced%2Fquerylists1.htm](http://central.corasworks.net/wpsupport/10/default.htm?turl=Docs%2FAdvanced%2Fquerylists1.htm "http://central.corasworks.net/wpsupport/10/default.htm?turl=Docs%2FAdvanced%2Fquerylists1.htm")

- [Walkthrough:SPSiteDataQuery example code in C# ](http://www.cnblogs.com/jerry-chen/archive/2009/04/15/1436562.html): [http://www.cnblogs.com/jerry-chen/archive/2009/04/15/1436562.html](http://www.cnblogs.com/jerry-chen/archive/2009/04/15/1436562.html "http://www.cnblogs.com/jerry-chen/archive/2009/04/15/1436562.html")

- [http://blogs.msdn.com/b/powlo/archive/2007/02/25/displaying-custom-data-through-sharepoint-lists-using-spgridview-and-spmenufield.aspx](http://blogs.msdn.com/b/powlo/archive/2007/02/25/displaying-custom-data-through-sharepoint-lists-using-spgridview-and-spmenufield.aspx "http://blogs.msdn.com/b/powlo/archive/2007/02/25/displaying-custom-data-through-sharepoint-lists-using-spgridview-and-spmenufield.aspx")

&nbsp;

&nbsp;

HTH!

Regards!

JQ

@jquintozamora