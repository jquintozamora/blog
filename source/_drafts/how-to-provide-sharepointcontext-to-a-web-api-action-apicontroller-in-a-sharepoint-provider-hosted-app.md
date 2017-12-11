---
title: >-
  How to provide SharePointContext to a Web API Action (ApiController) in a
  Provider-hosted SharePoint ADd-In
tags:
  - English
url: 807.html
id: 807
categories:
  - ApiController
  - Azure
  - Office 365
  - SharePointContext
  - Web API
date: 2016-09-05 19:39:32
---

Hi,  <p>Recently I have been played with **Azure Web Apps**, and its integration with **SharePoint**. In this post we will see how to provide Authentication to** Web API REST **actions using **SharePointContext**, which means that we only will be able to invoke our REST actions if we are behind the context of SharePoint Provider-hosted App.  <p>It's really easy and well documented to use SharePointContextFilter in a typical MVC project, but when you try to apply to Web API project, then is really tricky.  <p>&nbsp; 

### Introduction
 <p>When we want to provide SharePoint Context and Authentication into a normal MVC Web App, we should include the package called "**AppForSharePointWebToolKit**" ([https://www.nuget.org/packages/AppForSharePointWebToolkit/](https://www.nuget.org/packages/AppForSharePointWebToolkit/)) and this package will add to the project three files:  

*   Filters\SharePointContextFilterAttribute.cs  <li>SharePointContext.cs  <li>TokenHelper.cs <p>These files contain logic to have the SharePoint context in SharePoint apps that make use of Azure Access Control Services (Office 365) and High trust apps (SharePoint OnPremises).  <p>In normal MVC projects that is ideal because once added this project, you only need to tag your action with [SharePointContextFilter] attribute:  <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image001.png)  <p>Note that **SharePointContextFilterAttribute** can be used to decorate complete controllers as well!  <p>SharePointContextFilter attribute enforces the SharePoint context, we only can access to Index() if we are in the context of SharePoint Provider-hosted App. For example, **when a user tries to visit directly the web**, and has **not been logged** **in** using the SharePoint Site Content App Launcher (or similar) the user will not be allowed to enter. Moreover, if we go directly to the remote web using the query string parameter but didn't login on this session, this **SharePointContextFilter** causes a **redirect** to the **SharePoint** **site**, to login to the site and when the user has been logged in, the user will be redirected back to the remote web. **If the user can't login, the context can’t be created and thus, the code within the action, won’t be executed. So, the SharePointContextFilter causes a redirect to the error page.**  <p>This approach sounds ideal to provide SharePointContext and Authentication mechanism as well.  <p>&nbsp; 

### The problem with SharePointContextFilterAttribute and Web API
 <p>If we are building a Web API project or Controller and we want to have the same approach we probably go for applying this solution as well (or try it):  <p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image002.png)  <p>But, we will realise that doesn't work!  <p>It's not working because two main reasons:  <p>**Point 1\. ActionFilterAttribute**  

*   Controller class WORKS fine with System.Web.Mvc.ActionFilterAttribute  <li>**ApiController** class DOESN'T WORK with System.Web.Mvc.ActionFilterAttribute  <li>**ApiController** WORKs with System.Web.Http.Filters.ActionFilterAttribute [instead](http://stackoverflow.com/questions/12992722/why-is-my-asp-net-web-api-actionfilterattribute-onactionexecuting-not-firing). <p>**Point 2\. Web API (ApiController) is stateless component**, which means that doesn't have Session State.  <p>&nbsp; 

### My Solution
 <p>After lot of googling, the community have a couple of solutions:  

*   **Bas Lijten**: [http://blog.baslijten.com/getting-sharepoint-2013-apps-and-webapi-to-work/](http://blog.baslijten.com/getting-sharepoint-2013-apps-and-webapi-to-work/)  <li>**Scot Hillier**: [https://www.itunity.com/article/managing-tokens-sharepoint-2013-singlepage-providerhosted-apps-445](https://www.itunity.com/article/managing-tokens-sharepoint-2013-singlepage-providerhosted-apps-445) <p>I tried to apply both without success because my scenario is different.  <p>So this is the solution I adopted in** three easy steps:**  <p>1.&nbsp; Change **WebApiConfig.cs** to enable Session State in Web API (same approach [here](http://www.strathweb.com/2012/11/adding-session-support-to-asp-net-web-api/)).
<script src="https://gist.github.com/jquintozamora/abe9c22734c2d368ac78a15f20ef952e.js"></script> 

&nbsp;

2.&nbsp; Create a new filter called **SharePointContextWebAPIFilterAttribute.cs** behind Filters folder.

<script src="https://gist.github.com/jquintozamora/fc55926328e39df86801dc0e7d9fe53c.js"></script> <p>&nbsp;

**Notes** in the above code:

- System.Web.Http.Controllers.**HttpActionContext** doesn’t have **HttpContext** object associated, so we will use **HttpContext**.**Current** instead inside OnActionExecuting when called CheckRedirectionStatus method from SharePointContextProvider class..

- System.Web.Http.Controllers.**HttpActionContext** doesn’t have Result property, we will use Response property to redirect and create Error response in the code.

&nbsp;

3\. Use **SharePointContextWebAPIFilter** instead SharePointContextFilter in our **Web API actions**:

<script src="https://gist.github.com/jquintozamora/0aca058efe7e18ad1562e1fa002c01bf.js"></script> <p>&nbsp; 

### How to test this approach is working 
 <p>1\. If we go directly to our REST Service:

[http://myapp.azurewebsites.net/api/mycustom/1](http://myapp.azurewebsites.net/api/mycustom/1)  <p>We will receive this error:  <p>[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image003_thumb.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image003.png)  <p>&nbsp; <p>2\. If we go to our SharePoint Provider-hosted app and we click on our App Launcher we will be redirected to login page and after that to an url like that:

[https://myapp.azurewebsites.net/home/index/?SPHostUrl=https%3A%2F%2Fmytenant%2Esharepoint%2Ecom&SPLanguage=en-US&SPClientTag=0&SPProductNumber=16%2E0%2E5625%2E1208&SPAppWebUrl=https%3A%2F%2Fmytenant-appguid%2Esharepoint%2Ecom&SPHasRedirectedToSharePoint=1](https://myapp.azurewebsites.net/home/index/?SPHostUrl=https%3A%2F%2Fmytenant%2Esharepoint%2Ecom&SPLanguage=en-US&SPClientTag=0&SPProductNumber=16%2E0%2E5625%2E1208&SPAppWebUrl=https%3A%2F%2Fmytenant-appguid%2Esharepoint%2Ecom&SPHasRedirectedToSharePoint=1)  <p>This isn't our Web API, but is our gateway to login into Provider-hosted app. Once logged in, we can change the url "home/index" by our REST call, for example:  <p>[https://myapp.azurewebsites.net/api/mycustom/1/?SPHostUrl=https%3A%2F%2Fmytenant%2Esharepoint%2Ecom&SPLanguage=en-US&SPClientTag=0&SPProductNumber=16%2E0%2E5625%2E1208&SPAppWebUrl=https%3A%2F%2Fmytenant-appguid%2Esharepoint%2Ecom&SPHasRedirectedToSharePoint=1](https://myapp.azurewebsites.net/api/mycustom/1/?SPHostUrl=https%3A%2F%2Fmytenant%2Esharepoint%2Ecom&SPLanguage=en-US&SPClientTag=0&SPProductNumber=16%2E0%2E5625%2E1208&SPAppWebUrl=https%3A%2F%2Fmytenant-appguid%2Esharepoint%2Ecom&SPHasRedirectedToSharePoint=1)  <p>That should give you the information requested in the browser.  <p>&nbsp; <p>3\. If we are logged in our SharePoint Provider-hosted app and we use F12 (Console) to make an ajax query:
 <p><script src="https://gist.github.com/jquintozamora/a0f0a5e9a08f2b1a066e5742b079cdd1.js"></script> <p>[![clip_image004](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image004_thumb.png "clip_image004")](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image004.png)  <p>If we use ajax we** also need to include the query string (sharepoint context) in the call**:  <p><script src="https://gist.github.com/jquintozamora/6e162d8766eb8e00ad69858d75137d94.js"></script> <p>Using location.search will include all the parameters needed (thank for the tip [Kev](http://sharepointcookies.com/)):  <p>[![clip_image005](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image005_thumb.png "clip_image005")](https://blog.josequinto.com/wp-content/uploads/2016/09/clip_image005.png)  <p>And here we have successful ajax query to our Web API REST call from our SharePoint Provider-hosted app page. ![Smile](https://blog.josequinto.com/wp-content/uploads/2016/09/wlEmoticon-smile.png)&nbsp; <p>&nbsp; <p>Enjoy!!!  <p>&nbsp; <p>References:  

*   Introduction to SharePointContext for Provider-hosted SharePoint Apps: [https://blogs.msdn.microsoft.com/kaevans/2013/09/24/introducing-sharepointcontext-for-provider-hosted-sharepoint-apps/](https://blogs.msdn.microsoft.com/kaevans/2013/09/24/introducing-sharepointcontext-for-provider-hosted-sharepoint-apps/)  <li>[http://blog.baslijten.com/convert-mvc-application-to-shareptoint-2013-provider-hosted-app/](http://blog.baslijten.com/convert-mvc-application-to-shareptoint-2013-provider-hosted-app/)  <li>ASP.NET MVC 4 Custom Action Filters: [http://www.asp.net/mvc/overview/older-versions/hands-on-labs/aspnet-mvc-4-custom-action-filters](http://www.asp.net/mvc/overview/older-versions/hands-on-labs/aspnet-mvc-4-custom-action-filters) <p>&nbsp; <p>[@jquintozamora](https://twitter.com/jquintozamora)