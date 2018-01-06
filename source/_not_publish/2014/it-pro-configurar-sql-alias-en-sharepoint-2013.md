---
title: '[IT Pro] Configurar SQL Alias en SharePoint 2013'
tags:
  - Español
permalink: it-pro-configurar-sql-alias-en-sharepoint-2013
id: 88
categories:
  - Alias
  - IT PRO
  - SharePoint
  - SharePoint 2010
  - SharePoint 2013
date: 2014-04-15 15:47:21
---

Cuando nos disponemos a instalar una granja de servidores de SharePoint, lo primero que podemos pensar es que tenemos que pasar los asistentes en todos los servidores involucrados, y esto se instala solito. Pero no es así, todo IT Pro de SharePoint que se precie va a instalar y configurar la granja de servidores con PowerShell ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/04/wlemoticon-smile.png). Bien se con el SPAutoInstaller o bien, los más puristas (como yo), nos haremos nuestros propios scripts.

Bueno, pues para mejorar la facilidad de mantenimiento y permitir flexibilidad para mover a futuros las bases de datos a diferentes servidores de SQL Server, una de las buenas prácticas de los IT Pro de SharePoint es configurar SQL Server Connection Alias en cada uno de los servidores de la granja (menos los propios de SQL Server).

La primera vez que me dijeron esto, me pregunté

### ¿Que es un Alias de SQL Server?

Pues es simplemente un enlace al servidor de SQL Server, pero usando otro nombre. El cual se usa en las máquinas cliente, en el caso de SharePoint en los servidores Web y de Aplicaciones, que son los clientes que se conectarán contra el SQL Server. En este artículo hay más información: [http://blog.idera.com/sharepoint/performance-webcasts/plan-your-sharepoint-farm-right-with-a-sql-server-alias/](http://blog.idera.com/sharepoint/performance-webcasts/plan-your-sharepoint-farm-right-with-a-sql-server-alias/ "http://blog.idera.com/sharepoint/performance-webcasts/plan-your-sharepoint-farm-right-with-a-sql-server-alias/")

Y la verdad es que, conectar SharePoint con SQL Server a través de un Alias en lugar de usar el nombre NetBIOS siempre es buena idea, se mire por donde se mire. Pero el beneficio principal, es que si necesitamos cambiar el servidor de SQL Server o conectar con otra dirección del Cluster de SQL, podremos hacerlo fácilmente, solamente cambiando la dirección en el Alias y reiniciando el servicio SharePoint Timer Service.

### ¿Cómo configurar un Alias de SQL Server para SharePoint?

Normalmente, cuando se está instalando / configurando la granja es el mejor momento para realizar esta configuración. Se puede utilizar la herramienta CliConfg.exe (que viene con Windows) o también PowerShell.

En versiones anteriores, cuando PowerShell no tenía tanta relevancia, la mejor opción era usar la utilidad de Windows CliConfg.exe, especialmente cuando habilitamos Kerberos.

Hay dos aplicativos de Client Config Utility para SQL Server:

Versión de **64 bits**: C:windowssystem32cliconfg.exe –> Esta es utilizada por SharePoint

Versión de **32 bits**: C:WindowsSysWOW64cliconfg.exe –> Utilizada por aplicaciones .Net o WCF Services que se ejecuten en alguno de los servidores de SharePoint.

[![image](https://blog.josequinto.com/wp-content/uploads/2014/04/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/04/image.png)

**Nota:** Y sí, no me equivoco, la versión de 64 bits, por raro que parezca está en la ruta system32 de Windows. Esto es algo que puede confundirnos.

Si queremos configurar los alias manualmente con este aplicativo, podemos usar el paso a paso de este post: [http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/](http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/ "http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/").

Tener en cuenta que esta configuración debe aplicarse en cada uno de los servidores de la granja, excepto los servidores de base de datos. IMPORTANTE no aplicar en el SQL Server.

Además tener en cuenta, que para el caso de SharePoint solamente hace falta configurar los Alias con la versión de 64 bits.

### Configurar los Alias de SQL para SharePoint con PowerShell

Veamos el siguiente fichero PowerShell, en el que tenemos tres funciones usadas y al final el código para añadir cuantro alias con el objetivo de poder incluso aislar a nivel de instancia de BD en el futuro, depende de la utilidad.
<div id="codeSnippetWrapper">
<pre id="codeSnippet" class="csharpcode">
# ===================================================================================
# Func: MatchComputerName
# Desc: Returns TRUE if the $computerName specified matches one of the items in $computersList.
#        Supports wildcard matching (# for a a number, * for any non whitepace character)
# ===================================================================================
Function MatchComputerName($computersList, $computerName)
{
    If ($computersList -like "*$computerName*") { Return $true; }
    foreach ($v in $computersList) {
      If ($v.Contains("*") -or $v.Contains("#")) {
            # wildcard processing
            foreach ($item in -split $v) {
                $item = $item -replace "#", "[d]"
                $item = $item -replace "*", "[S]*"
                if ($computerName -match $item) {return $true;}
            }
        }
    }
}

# ====================================================================================
# Func: Add-SQLAlias
# Desc: Creates a local SQL alias (like using cliconfg.exe) so the real SQL server/name doesn't get hard-coded in SharePoint
#       if local database server is being used, then use Shared Memory protocol
# From: Bill Brockbank, SharePoint MVP (billb@navantis.com)
# ====================================================================================
Function Add-SQLAlias()
{
    [CmdletBinding(DefaultParameterSetName="BuildPath+SetupInfo")]
    param
    (
        [Parameter(Mandatory=$false, ParameterSetName="BuildPath+SetupInfo")][ValidateNotNullOrEmpty()]
        [String]$aliasName = "SharePointDB",

        [Parameter(Mandatory=$false, ParameterSetName="BuildPath+SetupInfo")][ValidateNotNullOrEmpty()]
        [String]$SQLInstance = $env:COMPUTERNAME,

        [Parameter(Mandatory=$false, ParameterSetName="BuildPath+SetupInfo")][ValidateNotNullOrEmpty()]
        [String]$port = ""
    )

    If ((MatchComputerName $SQLInstance $env:COMPUTERNAME) -or ($SQLInstance.StartsWith($env:ComputerName +""))) {
        $protocol = "dbmslpcn" # Shared Memory
    }
    else {
        $protocol = "DBMSSOCN" # TCP/IP
    }

    $serverAliasConnection="$protocol,$SQLInstance"
    If ($port -ne "")
    {
         $serverAliasConnection += ",$port"
    }
    $notExist = $true
    $client = Get-Item 'HKLM:SOFTWAREMicrosoftMSSQLServerClient' -ErrorAction SilentlyContinue
    # Create the key in case it doesn't yet exist
    If (!$client) 
    {
        $client = New-Item 'HKLM:SOFTWAREMicrosoftMSSQLServerClient' -Force
    }
    $client.GetSubKeyNames() | ForEach-Object -Process { If ( $_ -eq 'ConnectTo') { $notExist=$false }}
    If ($notExist)
    {
        $data = New-Item 'HKLM:SOFTWAREMicrosoftMSSQLServerClientConnectTo'
    }
    # Add Alias
    $data = New-ItemProperty HKLM:SOFTWAREMicrosoftMSSQLServerClientConnectTo -Name $aliasName -Value $serverAliasConnection -PropertyType "String" -Force -ErrorAction SilentlyContinue
}

# ====================================================================================
# Func: CheckSQLAccess
# Desc: Checks if the install account has the correct SQL database access and permissions
# By:   Sameer Dhoot (http://sharemypoint.in/about/sameerdhoot/)
# From: http://sharemypoint.in/2011/04/18/powershell-script-to-check-sql-server-connectivity-version-custering-status-user-permissions/
# Adapted for use in AutoSPInstaller by @brianlala
# ====================================================================================
Function CheckSQLAccess($sqlServer)
{
    If ($sqlServer) # Only check the SQL instance if it has a value
    {
        $objSQLConnection = New-Object System.Data.SqlClient.SqlConnection
        $objSQLCommand = New-Object System.Data.SqlClient.SqlCommand
        Try
        {
            $objSQLConnection.ConnectionString = "Server=$sqlServer;Integrated Security=SSPI;"
            Write-Host -ForegroundColor White " - Testing access to SQL server/instance/alias:" $sqlServer
            Write-Host -ForegroundColor White " - Trying to connect to `"$sqlServer`"..." -NoNewline
            $objSQLConnection.Open() | Out-Null
            Write-Host -ForegroundColor Black -BackgroundColor Green "Success"
            $strCmdSvrDetails = "SELECT SERVERPROPERTY('productversion') as Version"
            $strCmdSvrDetails += ",SERVERPROPERTY('IsClustered') as Clustering"
            $objSQLCommand.CommandText = $strCmdSvrDetails
            $objSQLCommand.Connection = $objSQLConnection
            $objSQLDataReader = $objSQLCommand.ExecuteReader()
            If ($objSQLDataReader.Read())
            {
                Write-Host -ForegroundColor White (" - SQL Server version is: {0}" -f $objSQLDataReader.GetValue(0))
                $SQLVersion = $objSQLDataReader.GetValue(0)
                [int]$SQLMajorVersion,[int]$SQLMinorVersion,[int]$SQLBuild,$null = $SQLVersion -split "."
                If ((($SQLMajorVersion -eq 10) -and ($SQLMinorVersion -lt 5) -and ($SQLBuild -lt 2714)) -or (($SQLMajorVersion -eq 9) -and ($SQLBuild -lt 4220)))
                {
                    Throw " - Unsupported SQL version!"
                }
                If ($objSQLDataReader.GetValue(1) -eq 1)
                {
                    Write-Host -ForegroundColor White " - This instance of SQL Server is clustered"
                }
                Else
                {
                    Write-Host -ForegroundColor White " - This instance of SQL Server is not clustered"
                }
            }
            $objSQLDataReader.Close()
        }
        Catch
        {
            Write-Host -ForegroundColor Red " - Fail"
            $errText = $error[0].ToString()
            If ($errText.Contains("network-related"))
            {
                Throw " - Connection Error. Check server name, port, firewall."
            }
            ElseIf ($errText.Contains("Login failed"))
            {
                Throw " - Not able to login. SQL Server login not created."
            }
            ElseIf ($errText.Contains("Unsupported SQL version"))
            {
                Throw " - SharePoint 2010 requires SQL 2005 SP3+CU3, SQL 2008 SP1+CU2, or SQL 2008 R2."
            }
            Else
            {
                If (!([string]::IsNullOrEmpty($serverRole)))
                {
                    Throw " - $currentUser does not have `'$serverRole`' role!"
                }
                Else {Throw " - $errText"}
            }
        }
    }
}

#### BEGIN CODE ######

#This is the name of your SQL Alias
$AliasConfig = "alias-config-db"
$AliasContent = "alias-content-db"
$AliasServiceApp = "alias-serviceapp-db"
$AliasSearch = "alias-search-db"

#This is the name of your SQL server (the actual name!)
$ServerName = "myServerName"
#This is the port to your SQL instance
$sqlport = "1433"

#Creating our TCP/IP Aliases
Add-SQLAlias -AliasName $AliasConfig -SQLInstance $ServerName -Port $sqlport
Add-SQLAlias -AliasName $AliasContent -SQLInstance $ServerName -Port $sqlport
Add-SQLAlias -AliasName $AliasServiceApp -SQLInstance $ServerName -Port $sqlport
Add-SQLAlias -AliasName $AliasSearch -SQLInstance $ServerName -Port $sqlport

#Check Access
CheckSQLAccess($AliasConfig);
CheckSQLAccess($AliasContent);
CheckSQLAccess($AliasServiceApp);
CheckSQLAccess($AliasSearch);</pre>

&nbsp;

</div>
&nbsp;

Podéis descargar el .zip con el fichero ps1 [SharePoint-Alias-SQL-Server.zip](https://blog.josequinto.com/wp-content/uploads/2014/04/sharepoint-alias-sql-server.zip).

&nbsp;

Referencias:

- [http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/](http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/ "http://nikpatel.net/2013/09/05/step-by-step-configuring-sql-alias-on-all-sharepoint-web-and-application-servers/")

- [http://blogs.msdn.com/b/priyo/archive/2013/09/13/sql-alias-for-sharepoint.aspx](http://blogs.msdn.com/b/priyo/archive/2013/09/13/sql-alias-for-sharepoint.aspx "http://blogs.msdn.com/b/priyo/archive/2013/09/13/sql-alias-for-sharepoint.aspx")

- [http://msdn.microsoft.com/en-us/library/windows/desktop/ms724072(v=vs.85).aspx](http://msdn.microsoft.com/en-us/library/windows/desktop/ms724072(v=vs.85).aspx "http://msdn.microsoft.com/en-us/library/windows/desktop/ms724072(v=vs.85).aspx")

- [http://www.microsoftvirtualacademy.com/training-courses/tuning-sql-server-2012-for-sharepoint-2013-jump-start#fbid=0aDnWGWkzVJ](http://www.microsoftvirtualacademy.com/training-courses/tuning-sql-server-2012-for-sharepoint-2013-jump-start#fbid=0aDnWGWkzVJ "http://www.microsoftvirtualacademy.com/training-courses/tuning-sql-server-2012-for-sharepoint-2013-jump-start#fbid=0aDnWGWkzVJ")

- [http://social.technet.microsoft.com/Forums/es-ES/06bcde36-5f16-408f-895a-ea4842b48b97/how-to-enable-tcpip-in-sql-server-client-network-utility-in-powershell?forum=winserverpowershell](http://social.technet.microsoft.com/Forums/es-ES/06bcde36-5f16-408f-895a-ea4842b48b97/how-to-enable-tcpip-in-sql-server-client-network-utility-in-powershell?forum=winserverpowershell "http://social.technet.microsoft.com/Forums/es-ES/06bcde36-5f16-408f-895a-ea4842b48b97/how-to-enable-tcpip-in-sql-server-client-network-utility-in-powershell?forum=winserverpowershell")

- [http://sqladm.blogspot.com.es/2011/04/sql-alias.html](http://sqladm.blogspot.com.es/2011/04/sql-alias.html "http://sqladm.blogspot.com.es/2011/04/sql-alias.html")

&nbsp;

&nbsp;

Espero que os guste ![Sonrisa](https://blog.josequinto.com/wp-content/uploads/2014/04/wlemoticon-smile.png)

Saludos

JQ