<#
replace_remote_with_local.ps1

Safe script to copy your local project into a clone of a remote repo and push it to a new branch.
It will:
  - Prompt for the local project path (default is the current project)
  - Prompt for the remote URL (default provided)
  - Clone the remote into a temp folder
  - Create a timestamped backup branch on the remote
  - Mirror (copy) your local project into the clone excluding .git and node_modules
  - Commit and push the changes to a new branch named replace-app-<timestamp>

Run this from PowerShell (make sure Git and robocopy are installed and on PATH).
Usage: Open PowerShell as your user and run:
  cd C:\Users\Lordarlem\Desktop\Again\againstAllOdds
  .\replace_remote_with_local.ps1

NOTE: This script does NOT force-overwrite remote main. It pushes to a new branch for review.
If you want to overwrite remote main, the script prints the command to do so at the end (manual step).
#>

# --- Helpers ---------------------------------------------------------------
function Prompt-Default($prompt, $default) {
    $res = Read-Host "$prompt [$default]"
    if ([string]::IsNullOrWhiteSpace($res)) { return $default }
    return $res
}

Try {
    $cwd = Get-Location
} Catch {
    $cwd = 'C:\'
}

$defaultLocal = "$cwd"
$localProject = Prompt-Default "Local project folder (absolute)" $defaultLocal
if (-not (Test-Path $localProject)) {
    Write-Host "Local path not found: $localProject" -ForegroundColor Red
    exit 1
}

$defaultRemote = 'https://github.com/BrendonJoni/Navigators-App.git'
$remote = Prompt-Default "Remote repository URL" $defaultRemote

# workdir in temp
$date = Get-Date -Format "yyyyMMddHHmmss"
$workDir = Join-Path $env:TEMP "navigators_clone_$date"

Write-Host "Cloning $remote -> $workDir"
git clone $remote $workDir
if ($LASTEXITCODE -ne 0) {
    Write-Host "git clone failed (exit code $LASTEXITCODE). Aborting." -ForegroundColor Red
    exit 1
}

Push-Location $workDir

# create backup branch from current HEAD and push it to origin
$backupBranch = "backup-$date"
Write-Host "Creating backup branch $backupBranch on remote"
git checkout -b $backupBranch
if ($LASTEXITCODE -ne 0) { Write-Host "git checkout failed" -ForegroundColor Yellow }

git push -u origin $backupBranch
if ($LASTEXITCODE -ne 0) { Write-Host "Warning: pushing backup branch failed (exit code $LASTEXITCODE)" -ForegroundColor Yellow }

# Mirror local project into the clone excluding sensitive folders
Write-Host "Copying files from $localProject to $workDir (excluding .git, node_modules, .expo)"
$excludeDirs = @('.git','node_modules','.expo')
$xdArgs = $excludeDirs | ForEach-Object { "/XD `"$localProject\$_`"" } | Out-String
$xdArgs = $xdArgs -replace "\n"," "

# Use robocopy for robust mirroring. /MIR mirrors; /NFL /NDL reduce logging
$robocopyCmd = "robocopy `"$localProject`" `"$workDir`" * /MIR /S /NFL /NDL /NJH /NJS /NP"
# Append /XD for excludes
foreach ($d in $excludeDirs) {
    $robocopyCmd += " /XD `"$localProject\$d`""
}

Write-Host "Running: $robocopyCmd"
Invoke-Expression $robocopyCmd
$robocopyExit = $LASTEXITCODE
if ($robocopyExit -ge 8) {
    Write-Host "robocopy failed with exit code $robocopyExit" -ForegroundColor Red
    Pop-Location
    exit 1
}

# Ensure .git in the workdir still present and points to origin.
# Stage, commit and push to a new branch
$replaceBranch = "replace-app-$date"
Write-Host "Preparing Git commit in clone (branch: $replaceBranch)"

git checkout -b $replaceBranch
if ($LASTEXITCODE -ne 0) { Write-Host "git checkout failed (maybe branch exists). Continuing..." -ForegroundColor Yellow }

git add --all

git commit -m "Replace app with local project (prepared on $date)"
if ($LASTEXITCODE -ne 0) { Write-Host "git commit returned non-zero (maybe nothing to commit)." -ForegroundColor Yellow }

git push -u origin $replaceBranch
if ($LASTEXITCODE -ne 0) { Write-Host "git push failed (exit $LASTEXITCODE)" -ForegroundColor Yellow }

Write-Host "Done. Your local project was copied into the clone and pushed to branch: $replaceBranch" -ForegroundColor Green
Write-Host "Remote now contains a backup branch: $backupBranch and a proposed branch: $replaceBranch"

Write-Host "If you're happy and want to overwrite remote main with your branch, run this (manual, destructive):" -ForegroundColor Yellow
Write-Host "  cd `"$workDir`"" -ForegroundColor Yellow
Write-Host "  git branch -M main" -ForegroundColor Yellow
Write-Host "  git push -u origin main --force" -ForegroundColor Yellow

# return to original working directory
Pop-Location

Write-Host "Temporary clone left at: $workDir" -ForegroundColor Cyan
Write-Host "Script finished." -ForegroundColor Green
