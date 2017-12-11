---
title: >-
  Convert from two letters language code to four letters Language Tag with
  PowerShell
tags:
  - English
url: 647.html
id: 647
categories:
  - multilingual
  - PowerShell
date: 2016-04-21 18:40:29
---

Hi,  <p>This post is about how to convert two letter language code to four letter language tag format (Language Tag defined by Microsoft).  

## Introduction
 <p>Windows Language Tag was defined based on [IETF BCP 47](https://tools.ietf.org/html/bcp47) best practice that defines "**Tags for Identify Languages**" and all the values and the Windows version where released are documented here ([Windows Language Code Identifier (LCID) Reference](https://msdn.microsoft.com/en-us/library/cc233965.aspx)).  <p>As a summary, Language Tag like "**en-GB**" almost always are a combination of "**language-COUNTRY**". Where language uses **Language Code ISO** ([ISO 639-1](http://www-01.sil.org/iso639-3/codes.asp?order=639_1&letter=%25)) and COUNTRY uses **Country Code ISO** ([ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)). But there are some exceptions where some extension text are needed. For example:  

*   "de-AT" represents German ('de') as used in Austria ('AT').  <li>"sr-Latn-RS" represents Serbian ('sr') written using Latin script ('Latn') as used in Serbia ('RS').  <li>"es-419" represents Spanish ('es') appropriate to the UN-defined Latin America and Caribbean region ('419'). <p>Another interesting note is that language tags and their subtags, including private use and extensions, are to be treated as case insensitive: there exist conventions for the capitalization of some of the subtags, but these MUST NOT be taken to carry meaning. Thus, the tag "mn-Cyrl-MN" is not distinct from "MN-cYRL-mn" or "mN-cYrL-Mn" (or any other combination), and each of these variations conveys the same meaning: Mongolian written in the Cyrillic script as used in Mongolia.  <p>And there are some conventions to have in mind:  

*   [ISO639-1] **recommends that language codes be written in lowercase** ('mn' Mongolian).  <li>[ISO15924] recommends that script codes use lowercase with the initial letter capitalized ('Cyrl' Cyrillic).  <li>[ISO3166-1] **recommends that country codes be capitalized** ('MN' Mongolia). <p>&nbsp;

&nbsp;

## Why convert to Language Tag?

Sometimes, we are working with functions or methods that requires Language Tag like "es-ES" instead of two letter language code. For example the method [SetSingleValueProfileProperty](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.userprofiles.peoplemanager.setsinglevalueprofileproperty.aspx), when used for saving changes into "SPS-MUILanguages" property, it requires a valid four letter MS Language Tag.  <p>&nbsp; 

## How to convert?
 <p>We will use [CultureInfo](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo(v=vs.110).aspx) class behing **System.Globalization** namespace.  <p>**CultureInfo** constructor allows initialize a new instance of **CultureInfo** class.  <p>We will use the locale name constructor instead the integer code one.  <p>[CultureInfo Constructor (String)](https://msdn.microsoft.com/en-us/library/ky2chs3h(v=vs.110).aspx)  <p>The string parameter called "name" is:  <p>_Type: System.String_  <p>_A predefined CultureInfo name, Name of an existing CultureInfo, or Windows-only culture name. name is not case-sensitive._  <p>For a list of predefined culture names, see the [National Language Support (NLS) API Reference](http://go.microsoft.com/fwlink/?LinkId=200048). In the constructor we can use whatever of them in a not case-sensitive way.  <p>For example whatever of these parameters in the constructor:** "es", "eS", "Es", "ES", "es-es", "eS-ES", "ES-es", "ES-ES",** and any combination, will create **CultureInfo** for the Spanish of Spain language (LCID = **3082 **and Language Tag or Culture Name = **es-ES**):  <p>[![clip_image001](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image001_thumb.png "clip_image001")](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image001.png)  <p>Here, we have the PowerShell code to convert from two letters language code case insensitive to Language Tag (**four letter language-COUNTRY format**): 
<pre>$langToConvert = "es";
try{
	$cultureInfo = New-Object system.globalization.cultureinfo($langToConvert);
	$languageCulture = $cultureInfo.TextInfo.CultureName;
	$languageCulture
}
catch 
{
	Log "`n[Main] Errors found:`n$_" -ForegroundColor Red
}

</pre>
<p>&nbsp; <p>**As an interesting note**, in the Windows Language Code Identifier Reference you can find a table like that: 
<p>[![clip_image002](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image002_thumb.png "clip_image002")](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image002.png) 
<p>And the Language ID field is the same that LCID used in the CultureInfo object: 
<p>[![clip_image003](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image003_thumb.png "clip_image003")](https://blog.josequinto.com/wp-content/uploads/2016/04/clip_image003.png) 
<p>$cultureInfo.TextInfo.LCID is 3082, which means 0x0C0A in HEX. 
<p>&nbsp; <p>Hope that helps! 
<p>[@jquintozamora](https://twitter.com/jquintozamora)