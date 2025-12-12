$sourceDir = "C:\Users\sinra\.gemini\antigravity\brain\9de53c16-5c46-4639-a4c7-3a5e1245e675"
$destDir = "c:\wedding\frontend\public\images"
$logFile = "c:\wedding\frontend\copy_log.txt"

Start-Transcript -Path $logFile -Force

Write-Output "Starting copy process..."
Write-Output "Source: $sourceDir"
Write-Output "Dest: $destDir"

if (-not (Test-Path $sourceDir)) {
    Write-Error "Source directory does not exist!"
    Stop-Transcript
    exit
}

if (-not (Test-Path $destDir)) {
    Write-Output "Destination directory does not exist. Creating..."
    New-Item -ItemType Directory -Force -Path $destDir
}

$files = @(
    @{ Src="sample_01_classic_studio_1765388419067.png"; Dest="sample_01.png" },
    @{ Src="sample_02_garden_wedding_1765388435475.png"; Dest="sample_02.png" },
    @{ Src="sample_03_close_up_elegant_1765388454553.png"; Dest="sample_03.png" },
    @{ Src="sample_04_casual_wedding_1765388490238.png"; Dest="sample_04.png" },
    @{ Src="sample_05_cinematic_wedding_1765388507594.png"; Dest="sample_05.png" }
)

foreach ($file in $files) {
    $srcPath = Join-Path $sourceDir $file.Src
    $destPath = Join-Path $destDir $file.Dest
    
    Write-Output "Copying $srcPath to $destPath"
    
    if (Test-Path $srcPath) {
        try {
            Copy-Item -Path $srcPath -Destination $destPath -Force -ErrorAction Stop
            Write-Output "Success."
        } catch {
            Write-Error "Failed to copy: $_"
        }
    } else {
        Write-Error "Source file not found: $srcPath"
    }
}

Write-Output "Copy process finished."
Stop-Transcript
