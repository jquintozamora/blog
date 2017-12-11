---
title: Configure SharePoint Usage Service in a multi-server farm
tags:
  - English
url: 105.html
id: 105
categories:
  - SharePoint
date: 2014-05-12 15:24:15
---

Hi there, 

There are scenarios where is needed to configure some services in a multi-server farm. In my example, I have 4 servers environment, one apps server, one WFE, one DB and other for Office Web Apps.

I want to have best practices applied in all servers, then I should enable / disable services in the farm depends on the needs. In my case, I want enable Logs (IIS, Diagnostic and Usage) in all APPS and WFE servers. 

I have configured all LOGS in one separate drive:

[![image](https://blog.josequinto.com/wp-content/uploads/2014/05/image_thumb.png "image")](https://blog.josequinto.com/wp-content/uploads/2014/05/image.png)

In order to do that, you can use these scripts:

&nbsp;

<pre class="ps">

$configLocation = "E:bits/scripts7-Post-Config-Logging.xml";
[xml]$configXml = Get-Content $configLocation
ConfigureIISLogging $configXml
ConfigureDiagnosticLogging $configXml
ConfigureUsageLogging $configXml

</pre>

Where functions are:

&nbsp;

<pre class="ps">

# ====================================================================================
# Func: EnsureFolder
# Desc: Checks for the existence and validity of a given path, and attempts to create if it doesn't exist.
# From: Modified from patch 9833 at http://autospinstaller.codeplex.com/SourceControl/list/patches by user timiun
# ====================================================================================
Function EnsureFolder ($path)
{
        If (!(Test-Path -Path $path -PathType Container))
        {
            Write-Host -ForegroundColor White " - $path doesn't exist; creating..."
            Try
            {
                New-Item -Path $path -ItemType Directory | Out-Null
            }
            Catch
            {
                Write-Warning "$($_.Exception.Message)"
                Throw " - Could not create folder $path!"
            }
        }
}
#EndRegion

# ====================================================================================
# Func: ImportWebAdministration
# Desc: Load IIS WebAdministration Snapin/Module
# From: Inspired by http://stackoverflow.com/questions/1924217/powershell-load-webadministration-in-ps1-script-on-both-iis-7-and-iis-7-5
# ====================================================================================
Function ImportWebAdministration
{
    $queryOS = Gwmi Win32_OperatingSystem
    $queryOS = $queryOS.Version
    Try
    {
        If ($queryOS.Contains("6.0")) # Win2008
        {
            If (!(Get-PSSnapin WebAdministration -ErrorAction SilentlyContinue))
            {
                If (!(Test-Path $env:ProgramFilesIISPowerShellSnapinIIsConsole.psc1))
                {
                    Start-Process -Wait -NoNewWindow -FilePath msiexec.exe -ArgumentList "/i `"$env:SPbitsPrerequisiteInstallerFilesiis7psprov_x64.msi`" /passive /promptrestart"
                }
                Add-PSSnapin WebAdministration
            }
        }
        Else # Win2008R2 or Win2012
        {
            Import-Module WebAdministration
        }
    }
    Catch
    {
        Throw " - Could not load IIS Administration module."

    }
}
#EndRegion

#Region File System Functions
# ====================================================================================
# Func: CompressFolder
# Desc: Enables NTFS compression for a given folder
# From: Based on concepts & code found at http://www.humanstuff.com/2010/6/24/how-to-compress-a-file-using-powershell
# ====================================================================================
Function CompressFolder ($folder)
{
    # Replace  with \ for WMI
    $wmiPath = $folder.Replace("","\");
    $wmiDirectory = Get-WmiObject -Class "Win32_Directory" -Namespace "rootcimv2" -ComputerName $env:COMPUTERNAME -Filter "Name='$wmiPath'"
    # Check if folder is already compressed
    If (!($wmiDirectory.Compressed))
    {
        Write-Host -ForegroundColor White " - Compressing $folder and subfolders..."
        $compress = $wmiDirectory.CompressEx("","True")
    }
    Else {Write-Host -ForegroundColor White " - $folder is already compressed."}
}
#EndRegion

#Region Configure Logging

# ===================================================================================
# Func: ConfigureIISLogging
# Desc: Configures IIS Logging for the local server
# ===================================================================================
Function ConfigureIISLogging([xml]$xmlinput)
{
    $IISLogConfig = $xmlinput.Configuration.Logging.IISLogs
    Write-Host -ForegroundColor White " - Configuring IIS logging..."
    If (!([string]::IsNullOrEmpty($IISLogConfig.Path)))
    {
        $IISLogDir = $IISLogConfig.Path
        EnsureFolder $IISLogDir
        ImportWebAdministration
        $oldIISLogDir = Get-WebConfigurationProperty "/system.applicationHost/sites/siteDefaults" -name logfile.directory.Value
        $oldIISLogDir = $oldIISLogDir -replace ("%SystemDrive%","$env:SystemDrive")
        If ($IISLogDir -ne $oldIISLogDir) # Only change the global IIS logging location if the desired location is different than the current
        {
            Write-Host -ForegroundColor White " - Setting the global IIS logging location..."
            # The line below is from http://stackoverflow.com/questions/4626791/powershell-command-to-set-iis-logging-settings
            Set-WebConfigurationProperty "/system.applicationHost/sites/siteDefaults" -name logfile.directory -value $IISLogDir
            # TODO: Fix this so it actually moves all files within subfolders
            If (Test-Path -Path $oldIISLogDir)
            {
                Write-Host -ForegroundColor White " - Moving any contents in old location $oldIISLogDir to $IISLogDir..."
                ForEach ($item in $(Get-ChildItem -Path $oldIISLogDir))
                {
                    Move-Item -Path $oldIISLogDir$item -Destination $IISLogDir -Force -ErrorAction SilentlyContinue
                }
            }
        }
    }
    Else # Assume default value if none was specified in the XML input file
    {
        $IISLogDir = "$env:SystemDriveInetpublogs" # We omit the trailing LogFiles so we can compress the entire logs folder including Failed Requests etc.
    }
    # Finally, enable NTFS compression on the IIS log location to save disk space
    If ($IISLogConfig.Compress -eq $true)
    {
        CompressFolder $IISLogDir
    }
}

# ===================================================================================
# Func: ConfigureDiagnosticLogging
# Desc: Configures Diagnostic (ULS) Logging for the farm
# From: Originally suggested by Codeplex user leowu70: http://autospinstaller.codeplex.com/discussions/254499
#       And Codeplex user timiun: http://autospinstaller.codeplex.com/discussions/261598
# ===================================================================================
Function ConfigureDiagnosticLogging([xml]$xmlinput)
{
    $ULSLogConfig = $xmlinput.Configuration.Logging.ULSLogs
    $ULSLogDir = $ULSLogConfig.LogLocation
    $ULSLogDiskSpace = $ULSLogConfig.LogDiskSpaceUsageGB
    $ULSLogRetention = $ULSLogConfig.DaysToKeepLogs
    $ULSLogCutInterval = $ULSLogConfig.LogCutInterval
    Write-Host -ForegroundColor White " - Configuring SharePoint diagnostic (ULS) logging..."
    If (!([string]::IsNullOrEmpty($ULSLogDir)))
    {
        $doConfig = $true
        EnsureFolder $ULSLogDir
        $oldULSLogDir = $(Get-SPDiagnosticConfig).LogLocation
        $oldULSLogDir = $oldULSLogDir -replace ("%CommonProgramFiles%","$env:CommonProgramFiles")
    }
    Else # Assume default value if none was specified in the XML input file
    {
        $ULSLogDir = "$env:CommonProgramFilesMicrosoft SharedWeb Server Extensions15LOGS"
    }
    If (!([string]::IsNullOrEmpty($ULSLogDiskSpace)))
    {
        $doConfig = $true
        $ULSLogMaxDiskSpaceUsageEnabled = $true
    }
    Else # Assume default values if none were specified in the XML input file
    {
        $ULSLogDiskSpace = 1000
        $ULSLogMaxDiskSpaceUsageEnabled = $false
    }
    If (!([string]::IsNullOrEmpty($ULSLogRetention)))
    {$doConfig = $true}
    Else # Assume default value if none was specified in the XML input file
    {
        $ULSLogRetention = 14
    }
    If (!([string]::IsNullOrEmpty($ULSLogCutInterval)))
    {$doConfig = $true}
    Else # Assume default value if none was specified in the XML input file
    {
        $ULSLogCutInterval = 30
    }
    # Only modify the Diagnostic Config if we have specified at least one value in the XML input file
    If ($doConfig)
    {
        Write-Host -ForegroundColor White " - Setting SharePoint diagnostic (ULS) logging options:"
        Write-Host -ForegroundColor White "  - DaysToKeepLogs: $ULSLogRetention"
        Write-Host -ForegroundColor White "  - LogMaxDiskSpaceUsageEnabled: $ULSLogMaxDiskSpaceUsageEnabled"
        Write-Host -ForegroundColor White "  - LogDiskSpaceUsageGB: $ULSLogDiskSpace"
        Write-Host -ForegroundColor White "  - LogLocation: $ULSLogDir"
        Write-Host -ForegroundColor White "  - LogCutInterval: $ULSLogCutInterval"
        Set-SPDiagnosticConfig -DaysToKeepLogs $ULSLogRetention -LogMaxDiskSpaceUsageEnabled:$ULSLogMaxDiskSpaceUsageEnabled -LogDiskSpaceUsageGB $ULSLogDiskSpace -LogLocation $ULSLogDir -LogCutInterval $ULSLogCutInterval
        # Only move log files if the old & new locations are different, and if the old location actually had a value
        If (($ULSLogDir -ne $oldULSLogDir) -and (!([string]::IsNullOrEmpty($oldULSLogDir))))
        {
            Write-Host -ForegroundColor White " - Moving any contents in old location $oldULSLogDir to $ULSLogDir..."
            ForEach ($item in $(Get-ChildItem -Path $oldULSLogDir) | Where-Object {$_.Name -like "*.log"})
            {
                Move-Item -Path $oldULSLogDir$item -Destination $ULSLogDir -Force -ErrorAction SilentlyContinue
            }
        }
    }
    # Finally, enable NTFS compression on the ULS log location to save disk space
    If ($ULSLogConfig.Compress -eq $true)
    {
        CompressFolder $ULSLogDir
    }
}

# ===================================================================================
# Func: ConfigureUsageLogging
# Desc: Configures Usage Logging for the farm
# From: Submitted by Codeplex user deedubya (http://www.codeplex.com/site/users/view/deedubya); additional tweaks by @brianlala
# ===================================================================================
Function ConfigureUsageLogging([xml]$xmlinput)
{
    If (Get-SPUsageService)
    {
        $usageLogConfig = $xmlinput.Configuration.Logging.UsageLogs
        $usageLogDir = $usageLogConfig.UsageLogDir
        $usageLogMaxSpaceGB = $usageLogConfig.UsageLogMaxSpaceGB
        $usageLogCutTime = $usageLogConfig.UsageLogCutTime
        Write-Host -ForegroundColor White " - Configuring Usage Logging..."
        # Syntax for command: Set-SPUsageService [-LoggingEnabled {1 | 0}] [-UsageLogLocation <Path>] [-UsageLogMaxSpaceGB <1-20>] [-Verbose]
        # These are a per-farm settings, not per WSS Usage service application, as there can only be one per farm.
        Try
        {
            If (!([string]::IsNullOrEmpty($usageLogDir)))
            {
                EnsureFolder $usageLogDir
                $oldUsageLogDir = $(Get-SPUsageService).UsageLogDir
                $oldUsageLogDir = $oldUsageLogDir -replace ("%CommonProgramFiles%","$env:CommonProgramFiles")
            }
            Else # Assume default value if none was specified in the XML input file
            {
                $usageLogDir = "$env:CommonProgramFilesMicrosoft SharedWeb Server Extensions15LOGS"
            }
            # UsageLogMaxSpaceGB must be between 1 and 20.
            If (($usageLogMaxSpaceGB -lt 1) -or ([string]::IsNullOrEmpty($usageLogMaxSpaceGB))) {$usageLogMaxSpaceGB = 5} # Default value
            If ($usageLogMaxSpaceGB -gt 20) {$usageLogMaxSpaceGB = 20} # Maximum value
            # UsageLogCutTime must be between 1 and 1440
            If (($usageLogCutTime -lt 1) -or ([string]::IsNullOrEmpty($usageLogCutTime))) {$usageLogCutTime = 30} # Default value
            If ($usageLogCutTime -gt 1440) {$usageLogCutTime = 1440} # Maximum value
            # Set-SPUsageService's LoggingEnabled is 0 for disabled, and 1 for enabled
            $loggingEnabled = 1
            Set-SPUsageService -LoggingEnabled $loggingEnabled -UsageLogLocation "$usageLogDir" -UsageLogMaxSpaceGB $usageLogMaxSpaceGB -UsageLogCutTime $usageLogCutTime | Out-Null
            # Only move log files if the old & new locations are different, and if the old location actually had a value
            If (($usageLogDir -ne $oldUsageLogDir) -and (!([string]::IsNullOrEmpty($oldUsageLogDir))))
            {
                Write-Host -ForegroundColor White " - Moving any contents in old location $oldUsageLogDir to $usageLogDir..."
                ForEach ($item in $(Get-ChildItem -Path $oldUsageLogDir) | Where-Object {$_.Name -like "*.usage"})
                {
                    Move-Item -Path $oldUsageLogDir$item -Destination $usageLogDir -Force -ErrorAction SilentlyContinue
                }
            }
            # Finally, enable NTFS compression on the usage log location to save disk space
            If ($usageLogConfig.Compress -eq $true)

            {
                CompressFolder $usageLogDir
            }
        }
        Catch
        {
            Write-Output $_
            Throw " - Error configuring usage logging"
        }
        Write-Host -ForegroundColor White " - Done configuring usage logging."
    }
    Else
    {
        Write-Host -ForegroundColor White " - No usage service; skipping usage logging config."
    }
}

</pre>

&nbsp;

you should edit the config xml in order to define yout environment variables:

&nbsp;

You can download code here: [SharePoint-Logs-Config](https://blog.josequinto.com/wp-content/uploads/2014/05/sharepoint-logs-config.zip "SharePoint-Logs-Config").

<pre class="scheme">

<Configuration>
    <Logging>
        <IISLogs Compress="true">
            <Path>F:LogsIIS</Path>
        </IISLogs>
        <ULSLogs Compress="true">
            <LogLocation>F:LogsULS</LogLocation>
            <LogDiskSpaceUsageGB>5</LogDiskSpaceUsageGB>
            <DaysToKeepLogs></DaysToKeepLogs>
            <LogCutInterval></LogCutInterval>
        </ULSLogs>
        <UsageLogs Compress="true">
            <UsageLogDir>F:LogsUsage</UsageLogDir>
            <UsageLogMaxSpaceGB>5</UsageLogMaxSpaceGB>
            <UsageLogCutTime></UsageLogCutTime>
        </UsageLogs>
    </Logging>
</Configuration>

</pre>

&nbsp;

#### Important Notes: 

1\. You need to be sure that ALL servers have the same drive letter for LOGS. (For example: "F:Logs”). This is because there are services like SPUsageService that requires the same configuration in all servers in the farm.

2\. Be sure that execute these functions using the SharePoint 2013 Shell. 

&nbsp;

&nbsp;

Hope that helps!

JQ

Regards!