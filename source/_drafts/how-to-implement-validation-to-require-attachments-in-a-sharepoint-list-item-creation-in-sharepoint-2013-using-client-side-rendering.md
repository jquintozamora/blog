---
title: >-
  How to implement Validation to require Attachments in a SharePoint List Item
  creation in SharePoint 2013 using Client-side Rendering
tags:
  - English
url: 333.html
id: 333
categories:
  - client side rendering
  - javascript
  - JSLink
  - SharePoint
  - SharePoint 2013
date: 2015-01-30 19:03:39
---

One of the best improvements in SharePoint 2013 is JSLink or Client-side Rendering, because you can override the OOTB behavior of SharePoint Fields, Views, Items, New Form, Edit Form, View Form, etc.

&nbsp;

In this case we're going to implement **attachment required validation** in one SharePoint List.

&nbsp;

&nbsp;

<pre class="js">

(function () {
    _spBodyOnLoadFunctionNames.push("showAttachmentsHere");
})();

(function () {
    // Initialize the variable that stores the objects.
    var overrideCtx = {};
    overrideCtx.Templates = {};    
    overrideCtx.Templates.Fields = {
        "Attachments": {
            "NewForm": attachmentValidatorTemplate
        }
    };

     //overrideCtx.OnPostRender = postRenderfunc;

    // Register the template overrides.
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function showAttachmentsHere()
{
    var ats = document.getElementById('idAttachmentsRow');
    var table = ats.parentNode.parentNode;
    var el = document.createElement("span");
    el.innerHTML = "<a onclick='javascript:AttachFile2();'>attach CV</a>
<span id='spnError' class='ms-formvalidation ms-csrformvalidation'></span>";
    insertAfter(table, el);
}

// This function provides the rendering logic 
function attachmentValidatorTemplate(ctx) { 

    var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(ctx); 

    // Register a callback just before submit. 
    formCtx.registerGetValueCallback(formCtx.fieldName, function () { 
        return document.getElementById('idAttachmentsTable').rows.length; 
    }); 

    //Create container for various validations 
    var validators = new SPClientForms.ClientValidation.ValidatorSet(); 
    validators.RegisterValidator(new attachmentValidator()); 

    // Validation failure handler. 
    formCtx.registerValidationErrorCallback(formCtx.fieldName, attachmentOnError); 

    formCtx.registerClientValidator(formCtx.fieldName, validators); 

     var customAttach = '';
    customAttach += '';

    var finalresult = customAttach + SPFieldAttachments_Default(ctx);

    return finalresult;

}

function AttachFile2()
{
    var instance = SP.Ribbon.PageManager.get_instance();
    if (instance)
        instance.get_commandDispatcher().executeCommand("Ribbon.ListForm.Edit.Actions.AttachFile", null);
};

// Custom validation object to validate email format 
attachmentValidator = function () { 
    attachmentValidator.prototype.Validate = function (value) { 
        var isError = false; 
        var errorMessage = ""; 

        if (value == 0) { 
            isError = true; 
            errorMessage = "You must include file attached."; 
        } 

        //Send error message to error callback function (emailOnError) 
        return new SPClientForms.ClientValidation.ValidationResult(isError, errorMessage); 
    }; 
}; 

// Add error message to spnError element under the input field element 
function attachmentOnError(error) 
{ 
    document.getElementById("spnError").innerHTML = "<span role='alert'>" + error.errorMessage + "</span>"; 
} 

</pre>

&nbsp;

References:

- [https://social.technet.microsoft.com/Forums/sharepoint/en-US/ef5fee21-03c7-404e-a73b-a452d4a06c47/add-attachment-field-to-post-list-in-sharepoint-2013?forum=sharepointgeneral](https://social.technet.microsoft.com/Forums/sharepoint/en-US/ef5fee21-03c7-404e-a73b-a452d4a06c47/add-attachment-field-to-post-list-in-sharepoint-2013?forum=sharepointgeneral "https://social.technet.microsoft.com/Forums/sharepoint/en-US/ef5fee21-03c7-404e-a73b-a452d4a06c47/add-attachment-field-to-post-list-in-sharepoint-2013?forum=sharepointgeneral")

- [http://sharepoint.stackexchange.com/questions/120226/add-attachment-button-to-a-custom-new-form-sharepoint-2013](http://sharepoint.stackexchange.com/questions/120226/add-attachment-button-to-a-custom-new-form-sharepoint-2013 "http://sharepoint.stackexchange.com/questions/120226/add-attachment-button-to-a-custom-new-form-sharepoint-2013")

- [https://code.msdn.microsoft.com/office/Sample-8-List-add-and-edit-d228b751](https://code.msdn.microsoft.com/office/Sample-8-List-add-and-edit-d228b751 "https://code.msdn.microsoft.com/office/Sample-8-List-add-and-edit-d228b751")

- [http://sharepoint.stackexchange.com/questions/112506/sharepoint-2013-js-link-return-default-field-rendering](http://sharepoint.stackexchange.com/questions/112506/sharepoint-2013-js-link-return-default-field-rendering "http://sharepoint.stackexchange.com/questions/112506/sharepoint-2013-js-link-return-default-field-rendering")

- [http://blog.ithinksharepoint.com/2014/11/17/sharepoint-2013online-attachment-viewer-enhancement/](http://blog.ithinksharepoint.com/2014/11/17/sharepoint-2013online-attachment-viewer-enhancement/ "http://blog.ithinksharepoint.com/2014/11/17/sharepoint-2013online-attachment-viewer-enhancement/")

&nbsp;

&nbsp;

&nbsp;

HTH

JQ

@jquintozamora