---
layout: post
title: SharePoint List Site Collection Web Part Aggregator using SPSiteDataQuery and SPGridView
language: English
permalink: sharepoint-list-site-collection-web-part-aggregator-using-spsitedataquery-and-spgridview
id: 329
categories:
    - Article
tags:
  - SharePoint
  - webpart
date: 2015-01-30 18:34:44
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
I had a requirement to create an `Aggregation Web Part` to combine information from different sites in the same site collection. Moreover, it need to be represented as a table with sortable, filterable and exportable features enabled. Basically similar behavior we have in SharePoint OOTB lists.

We have here three main challenges:
- Data Access Layer: get all the information thru Site Collection efficiently.
- Presentation Layer: display all the information in a table with sortable and filterable columns.
- Export to excel: Add this feature to table.


## Data Access Layer
The best object to get information thru all Site Collection in terms of performance is SPSiteDataQuery.
> It is **very important** to add `ServerTemplate`
    ```cs
    q.Lists = "<Lists ServerTemplate='100' BaseType='0' MaxListLimit='0' />"
    ```
> Adding ServerTemplate: 19 seconds
> Without adding ServerTemplate: 6 seconds

```cs
public DataTable PopulateDatasetSPSiteDataQuery(string sortExpression, string contentType, string fieldsNames)
{
    if (!string.IsNullOrEmpty(contentType))
    {
        if (HttpRuntime.Cache[CACHE_KEY] == null)
        {
            string status = "The following items are NOT fetched from the cache";
            //In order to know all field Internal Names: $dependenciesList.Fields | Select InternalName
            SPSiteDataQuery q = new SPSiteDataQuery();
            string[] fields = getFieldsNames(fieldsNames);

            string nameField, typeField;

            q.ViewFields = "<FieldRef Name='Title' />";
            q.ViewFields += "<FieldRef Name='Team' Type='Lookup' Nullable='True' />";

            if (fields != null)
            {
                for (int i = 0; i < fields.Length; i++)
                {
                    nameField = fields[i].Split(',')[1].ToString();
                    typeField = fields[i].Split(',')[2].ToString();
                    q.ViewFields += String.Concat("<FieldRef Name='", nameField, "' Type='", typeField, "' Nullable='True' />");
                }
            }

            q.ViewFields += "<FieldRef Name='FileDirRef'  Nullable='True' />";
            // BaseType => GenericList = 0, DocumentLibrary = 1, DiscussionForum = 3, VoteOfSurvey = 4, IssueList = 5
            q.Lists = "<Lists ServerTemplate='100' BaseType='0' MaxListLimit='0' />"; 
            q.Webs = "<Webs Scope='SiteCollection' />"; // alcance de la busqueda
            q.Query = String.Concat("<Where><Eq><FieldRef Name='ContentType' /><Value Type='Text'>", contentType, "</Value></Eq></Where>"); 

            using (SPWeb w = new SPSite(String.Concat(HttpContext.Current.Request.Url.Scheme, "://", HttpContext.Current.Request.Url.Authority, "/PWA/")).OpenWeb())
            {
                DataTable oDataTable = new DataTable();
                using (SPMonitoredScope populateDataSet = new SPMonitoredScope("GetSiteData_PopulateData"))
                {
                    try
                    {
                        oDataTable = w.GetSiteData(q);
                        Logger.LogInfo(Logger.Constants.LogSource.LOGSRC_COMMON, "Number of items from GetSiteData_PopulateData: " + oDataTable.Rows.Count);
                    }
                    catch (Exception)
                    {
                        oDataTable = null;

                    }

                }

                if (oDataTable != null)
                {
                    newTable.Columns.Add("ProjectName");
                    foreach (DataColumn col in oDataTable.Columns) // Loop over the rows.
                    {
                        newTable.Columns.Add(col.ColumnName);
                    }

                    foreach (DataRow row in oDataTable.Rows) // Loop over the items.
                    {
                        DataRow newRow = newTable.Rows.Add();

                        newRow["ProjectName"] = row["FileDirRef"].ToString().Split('/')[1];
                        foreach (DataColumn col in oDataTable.Columns) // Loop over the rows.
                        {
                            string initialValue = row[col.ColumnName].ToString();
                            string finalValue = initialValue;
                            if (!string.IsNullOrEmpty(initialValue))
                            {
                                if (col.ColumnName.Equals("Team") || col.ColumnName.Equals("Depends_x0020_On"))
                                {
                                    try
                                    {
                                        SPFieldLookupValue lookupGroup = new SPFieldLookupValue(initialValue);
                                        finalValue = lookupGroup.LookupValue;
                                    }
                                    catch (Exception) { }
                                }
                                if (col.ColumnName.Equals("Due_x0020_Date") || col.ColumnName.Equals("DueDate"))
                                {
                                    finalValue = "";
                                    DateTime date;
                                    if (DateTime.TryParse(row[col.ColumnName].ToString(), out date))
                                    {
                                        finalValue = date.ToString("dd/MM/yyyy");
                                    }

                                }
                                if (col.ColumnName.Equals("AssignedTo"))
                                {
                                    try
                                    {
                                        SPFieldUserValue userValue = new SPFieldUserValue(w, initialValue);
                                        finalValue = userValue.LookupValue;
                                    }
                                    catch (Exception) { }
                                }

                            }
                            newRow[col.ColumnName] = finalValue;

                        }
                    }
                }
            }

            HttpRuntime.Cache.Add(CACHE_KEY,
            newTable,
            null,
            DateTime.MaxValue,
            TimeSpan.FromMinutes(CACHE_MINUTES),
            System.Web.Caching.CacheItemPriority.Default, null);
        }
        else
        {
            string status = "The following items ARE fetched from the cache!";
            newTable = (DataTable)HttpRuntime.Cache[CACHE_KEY];
        }
    }

    //clean up the sort expression if needed - the sort descending 
    //menu item causes the double in some cases 
    if (sortExpression.ToLowerInvariant().EndsWith("desc desc"))
        sortExpression = sortExpression.Substring(0, sortExpression.Length - 5);

    //need to handle the actual sorting of the data
    if (!string.IsNullOrEmpty(sortExpression))
    {
        try
        {
            DataView view = new DataView(newTable);
            view.Sort = sortExpression;
            DataTable newTable2 = view.ToTable();
            newTable.Clear();
            newTable.Merge(newTable2);
        }
        catch (Exception ex)
        {
            LiteralControl literal = new LiteralControl(string.Concat("SortExpression: ", ex.ToString()));
            this.Controls.Add(literal);
        }
    }

    return newTable;
}
```

&nbsp;

## Presentation Layer
After evaluating different alternatives the easiest approach is to use **SPGridView** because it provides OOTB features like filtering and sorting.

```cs
// Notice that PopulateDatasetSPSiteDataQuery is called from this.Controls
gridDS = new ObjectDataSource();
gridDS.ID = "gridDS";
gridDS.SelectMethod = "PopulateDatasetSPSiteDataQuery";
gridDS.TypeName = this.GetType().AssemblyQualifiedName;
gridDS.EnableViewState = false;
gridDS.SortParameterName = "SortExpression";
gridDS.SelectParameters.Add("contentType", ContentType);
gridDS.SelectParameters.Add("fieldsNames", FieldsNames);
gridDS.FilterExpression = FilterExpression;
this.Controls.Add(gridDS);

oGrid = new SPGridView();
oGrid.ID = "oGrid";
oGrid.AutoGenerateColumns = false;
oGrid.EnableViewState = false;

//Disable Pagging
oGrid.AllowPaging = false;

// Sorting Code
oGrid.AllowSorting = true;

//filtering 
oGrid.AllowFiltering = true;

StringBuilder filterDataFields = new StringBuilder();
FieldsArray = getFieldsNames(FieldsNames);
filterDataFields.Append("ProjectName");             
filterDataFields.Append(",");
filterDataFields.Append("Title");

//Fields in Object Data Source = ProjectName, ListId, WebId, ID, Title, Team, Depends_x0020_On, Due_x0020_Date, Status, FileDirRef, Notes
if (FieldsArray != null)
{
    for (int i = 0; i < FieldsArray.Length; i++)
    {
        string field = FieldsArray[i].Split(',')[1].ToString();
        if (!field.Equals("Notes"))
        {
            filterDataFields.Append(",");
            filterDataFields.Append(field);
        }
    }
}
//oGrid.FilterDataFields = "ProjectName,Title,Team,Depends_x0020_On,Due_x0020_Date,Status";
oGrid.FilterDataFields = filterDataFields.ToString();
oGrid.FilteredDataSourcePropertyName = "FilterExpression";
oGrid.FilteredDataSourcePropertyFormat = "{1} = '{0}'";

oGrid.Sorting += new GridViewSortEventHandler(gridView_Sorting);
oGrid.RowDataBound += new GridViewRowEventHandler(gridView_RowDataBound);

AddColumnsToSPGridView();

//TODO: 
//Add logic to make a custom data set and preprocess the information adapting the texts 
// and providing a new field called Project.

oGrid.DataSourceID = gridDS.ID;

// Add Control to Page
Controls.Add(oGrid);
```
&nbsp;


## Export to Excel
I have used this code to Export to excel the filtered items in the table.

```cs    
private void oBtn_Export_Click(object sender, EventArgs e)
{

    oGrid.AllowPaging = false;
    oGrid.AllowSorting = false;
    oGrid.AllowFiltering = false;

    System.IO.MemoryStream stream = new System.IO.MemoryStream();
    using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
    {
        DataSet ds = new DataSet();
        var dv = (DataView)gridDS.Select();
        if (dv != null && dv.Count > 0)
        {
            DataTable dt = dv.ToTable();
            //Check to hide columns
            List<String> columnsInGrid = new List<string>();
            if (oGrid.HeaderRow != null)
            {
                for (int i = 0; i < oGrid.HeaderRow.Cells.Count; i++)
                {
                    DataControlFieldHeaderCell headerfield = oGrid.HeaderRow.Cells[i] as DataControlFieldHeaderCell;
                    DataControlField spbf = headerfield.ContainingField as DataControlField;
                    //Notice that SortException allways must be the same that DataField
                    columnsInGrid.Add(spbf.SortExpression); //["DataField"]);
                }
            }
            for (int i = dt.Columns.Count - 1; i >= 0; i--)
            {
                if (!columnsInGrid.Contains(dt.Columns[i].ToString()))
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
    Page.Response.Buffer = true;
    Page.Response.Charset = "";

    //  NOTE: If you get an "HttpCacheability does not exist" error on the following line, make sure you have
    //  manually added System.Web to this project's References.
    string filename = "Report.xlsx";

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
```

&nbsp; 

## Download
You can download full code from here: [SiteCollectionWebPartAggregator.zip](./SiteCollectionWebPartAggregator.zip")
