---
title: Managed Property Types and Field Types equivalence
tags:
  - English
url: 190.html
id: 190
categories:
  - Search
  - SharePoint 2013
date: 2014-07-15 17:35:43
---

SharePoint Search Schema allow us to create Managed Properties in order to be able to use this properties in search queries. When we are creating Managed Properties we need to decide the type, and that is different from the type of the fields, so this is the equivalence:

**Managed Property Types:**

Text
Integer 
Decimal 
DateTime 
YesNo 
Binary

&nbsp;

**Field Types:**

SPFieldMultiLineText
SPFieldChoice
SPFieldMultiChoice
SPFieldNumber
SPFieldCurrency
SPFieldDateTime
SPFieldBoolean
SPFieldUser
SPFieldUrl
HtmlField
ImageField
LinkField
SPFieldLookup
SPFieldCalculated
OutcomeChoiceField
SummaryLinkField
MediaField
TaxonomyField
SPFieldGuid

&nbsp;

**Equivalence**:

Text: "**SPFieldMultiLineText**","**SPFieldChoice**","**SPFieldMultiChoice**",
"**SPFieldUser**","**SPFieldUrl**","**LinkField**","**SPFieldLookup**","**HtmlField**",
"**SPFieldCalculated**","**SummaryLinkField**","**SPFieldGuid**","**OutcomeChoiceField**"<p>Integer: "**SPFieldNumber**"<p>Decimal: "**SPFieldNumber**","**SPFieldCurrency**"<p>DateTime: "**SPFieldDateTime**"<p>YesNo: "**SPFieldBoolean**"<p>Binary: "**ImageField**","**MediaField**"

References:

- [http://technet.microsoft.com/en-us/library/jj613136.aspx#section30](http://technet.microsoft.com/en-us/library/jj613136.aspx#section30 "http://technet.microsoft.com/en-us/library/jj613136.aspx#section30")

Regards!
JQ
<p>@jquintozamora