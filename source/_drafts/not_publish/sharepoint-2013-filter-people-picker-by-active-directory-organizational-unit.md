---
title: 'SharePoint 2013: Filter People Picker by Active Directory Organizational Unit'
tags:
  - English
permalink: sharepoint-2013-filter-people-picker-by-active-directory-organizational-unit
id: 341
categories:
  - security
  - SharePoint 2013
date: 2015-02-12 19:03:14
---

Hi, 

Today I’ll try to explain as much as I know, the configuration we can do in People Picker.

&nbsp;

This is the official Microsoft paper about Configure People Picker in SharePoint 2013 ([https://technet.microsoft.com/en-us/library/gg602075.aspx](https://technet.microsoft.com/en-us/library/gg602075.aspx)).  

#### &nbsp;

## SPSite – UserAccountDirectoryPath
 <p>**IMPORTANT**: This property is related to Site Collection <p>The Stsadm **setsiteuseraccountdirectorypath** operation allows the user's directory path to be set to a specific OU in the same domain. After the directory path is set to a site collection, the People Picker control will only search under that particular OU. <p>&nbsp; <p>Get Current Values: <p>stsadm -o getsiteuseraccountdirectorypath -url [https://site](https://site) <p>PowerShell: <p>$site = Get-SPSite [https://site](https://site) <p>$site.UserAccountDirectoryPath <p>&nbsp; <p>Set Value: <p>stsadm -o setsiteuseraccountdirectorypath -path "OU=Offices,DC=A,DC=local" -url [https://site](https://site) <p>PowerShell: <p>$site = Get-SPSite [https://site](https://site) <p>$site.UserAccountDirectoryPath = "OU=Offices,DC=A,DC=local"; #ONLY ONE Organizational Unit <p>&nbsp; <p>Reset: <p>stsadm -o setsiteuseraccountdirectorypath -path "" -url [https://site](https://site) <p>PowerShell: <p>$site = Get-SPSite [https://site](https://site) <p>$site.UserAccountDirectoryPath = ""; <p>&nbsp; <p>Get All: <p>Get current user account directory path for all Site Collections in a Web Application. <p>**Get-SPSite -Limit All | Select Url, UserAccountDirectoryPath** <p> <p> <p>&nbsp; <p>**Important notes:** <p>1\. -url attribute corresponds with Site Collection, not with Web Application. <p>2\. This command only can be configured with one OU if you need more OU’s you need to use Stsadm **Peoplepicker**-**serviceaccountdirectorypaths** property. 

#### &nbsp;

#### &nbsp;

## Peoplepicker-serviceaccountdirectorypaths
 <p>**IMPORTANT**: This property is related to Web Application.  <p>This can be used to get more than one OU. <p>&nbsp; <p>Get Current Values: <p>stsadm -o getproperty -propertyname peoplepicker-serviceaccountdirectorypaths -url [https://site](https://site) –> Not working due to HTTPS <p>Using the same command with http Web Application extension: <p>stsadm -o getproperty -url [http://httpsite](http://httpsite) -pn peoplepicker-serviceaccountdirectorypaths <p>Other way to get values thru PowerShell: <p>$wa = Get-SPWebApplication [https://webapp](https://webapp) <p>$wa.PeoplePickerSettings <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2015/02/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2015/02/clip_image001.png) <p>&nbsp; <p>Set Value: <p>stsadm -o setproperty -propertyname peoplepicker-serviceaccountdirectorypaths -propertyvalue "OU=Offices,DC=A,DC=local;OU=Security,OU=Groups,DC=A,DC=local" -url [https://site](https://site) <p>stsadm -o setproperty -propertyname peoplepicker-serviceaccountdirectorypaths -propertyvalue "OU=Offices,DC=A,DC=local" -url [http://httpsite](http://httpsite) <p>Impossible to set with PowerShell because ReadOnly Proterty. <p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2015/02/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2015/02/clip_image002.png) <p>&nbsp; <p>Reset: <p>stsadm -o setproperty -propertyname peoplepicker-serviceaccountdirectorypaths -propertyvalue "" -url [http://httpsite](http://httpsite) <p>Important Note: <p>- stsadm -o setproperty -propertyname peoplepicker-serviceaccountdirectorypaths **Not working with https ![Triste](https://blog.josequinto.com/wp-content/uploads/2015/02/wlEmoticon-sadsmile.png)** <p>- Even applying this property at Web Application level using HTTP, it is not working. I think Site Collection Property (**setsiteuseraccountdirectorypath**) overrides this one. <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Even more it seems to be the unification for al Site Collections:  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; § Enables a farm administrator to manage the site collection that has a specific organizational unit (OU) setting as defined in the Setsiteuseraccountdirectorypath setting. For more information, see Peoplepicker-serviceaccountdirectorypaths. [https://technet.microsoft.com/en-us/library/gg602075.aspx](https://technet.microsoft.com/en-us/library/gg602075.aspx) <p>&nbsp; <p>&nbsp; <p>&nbsp; <p>For now we haven’t solution to filter People Picker by two or more Organizational Units. <p>Let’s Reset all Web Application and Site Collection AccountDirectoryPaths and try to use Custom Filter: <p>&nbsp; <p>&nbsp; <p>&nbsp; 

#### 

## ActiveDirectoryCustomFilter
 <p>We can use Custom AD Filter. <p>Use ldp.exe to test the filter. <p>[http://support.microsoft.com/kb/252335/en-us](http://support.microsoft.com/kb/252335/en-us) <p>[http://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx](http://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx) <p>&nbsp; <p>Filter by two OU: (|(ou=Security)(ou=Offices)) <p>$wa = Get-SPWebApplication [https://site](https://site) <p>$wa.PeoplePickerSettings.ActiveDirectoryCustomFilter ="(ou=Offices)" <p>$wa.Update() <p>&nbsp; <p>DOESN’’T WORK! <p>Because the LDAP filter CAN’T FILTER BY TWO DIFFERNET OU’s <p>&nbsp; <p>&nbsp; 

## Conclusion
 <p>- We can filter each Site collection independently to use one different OU  <p>- We can’t use the OU filter in one Site Collection to use two or more OU for the same site Collection. <p>- We can use ActiveDirectoryCustomFilter to filter by different AD Atributes – see references section. <p>- Ideally we will use SPSite – UserAccountDirectoryPath (using PowerShell method) to configure People Picker as a Site Collection Level. – That’s the best option nowadays. <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PowerShell:  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $site = Get-SPSite [https://site](https://site) <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $site.UserAccountDirectoryPath = "OU=Offices,DC=A,DC=local"; #ONLY ONE Organizational Unit

&nbsp; <p>&nbsp; 

## References
 <p>- [https://technet.microsoft.com/en-us/library/gg602075.aspx](https://technet.microsoft.com/en-us/library/gg602075.aspx) <p>- [http://social.technet.microsoft.com/Forums/sharepoint/en-US/558195b3-19bd-48b3-8798-c1c49c1e74b4/people-picker-pull-groups-from-only-certain-ous?forum=sharepointgeneralprevious](http://social.technet.microsoft.com/Forums/sharepoint/en-US/558195b3-19bd-48b3-8798-c1c49c1e74b4/people-picker-pull-groups-from-only-certain-ous?forum=sharepointgeneralprevious) <p>- [http://technet.microsoft.com/en-us/library/gg602075(v=office.15).aspx](http://technet.microsoft.com/en-us/library/gg602075(v=office.15).aspx) <p>- [https://technet.microsoft.com/en-us/library/cc263012(office.12).aspx](https://technet.microsoft.com/en-us/library/cc263012(office.12).aspx) <p>LDAP Filter:  <p>[http://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx](http://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx)  <p>Search AD with PowerShell:  <p>[https://technet.microsoft.com/en-us/library/ff730967.aspx](https://technet.microsoft.com/en-us/library/ff730967.aspx)  <p>How AD Searches works:  <p>[https://technet.microsoft.com/en-us/library/cc755809(v=ws.10).aspx](https://technet.microsoft.com/en-us/library/cc755809(v=ws.10).aspx)