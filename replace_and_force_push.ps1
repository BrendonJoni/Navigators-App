<#
replace_and_force_push.ps1

Dangerous: This script will overwrite the remote repository's `main` branch with your local project.
It performs these steps:
  - Prompts for local project path and remote URL (defaults provided)
  - Clones the remote to a temp folder
  - Creates a timestamped backup branch on the remote (so remote history is preserved)
  - Copies your local project into the clone (excludes .git and node_modules)
  - Commits the copied files in the clone
  - Force-pushes the clone's `main` branch to the remote (OVERWRITES remote main)

IMPORTANT: Only run this if you're 100% sure you want to replace remote history. Backup branch will be created but force-push is irreversible for remote main.

Usage:
  cd C:\Users\Lordarlem\Desktop\Again\againstAllOdds
  .\replace_and_force_push.ps1

The script will ask you to confirm before performing the destructive force-push.
#>

function Prompt-Default($prompt, $default) {
    $res = Read-Host "$prompt [$default]"
    if ([string]::IsNullOrWhiteSpace($res)) { return $default }
    return $res
}

$cwd = Get-Location
$defaultLocal = "$cwd"
$localProject = Prompt-Default "Local project folder (absolute)" $defaultLocal
if (-not (Test-Path $localProject)) {
    Write-Host "Local path not found: $localProject" -ForegroundColor Red
    exit 1
}

$defaultRemote = 'https://github.com/BrendonJoni/Navigators-App.git'
$remote = Prompt-Default "Remote repository URL" $defaultRemote

# prepare temp workdir
$date = Get-Date -Format "yyyyMMddHHmmss"
$workDir = Join-Path $env:TEMP "navigators_clone_force_$date"

Write-Host "Cloning $remote -> $workDir"
git clone $remote $workDir
if ($LASTEXITCODE -ne 0) {
    Write-Host "git clone failed (exit code $LASTEXITCODE). Aborting." -ForegroundColor Red
    exit 1
}

Push-Location $workDir

# create backup branch and push it
$backupBranch = "backup-$date"
Write-Host "Creating backup branch $backupBranch on remote"
git checkout -b $backupBranch
if ($LASTEXITCODE -ne 0) { Write-Host "git checkout failed" -ForegroundColor Yellow }

git push -u origin $backupBranch
if ($LASTEXITCODE -ne 0) { Write-Host "Warning: pushing backup branch failed (exit code $LASTEXITCODE)" -ForegroundColor Yellow }

# copy files from local project into the clone
Write-Host "Copying files from $localProject to $workDir (excluding .git, node_modules, .expo)"
$excludeDirs = @('.git','node_modules','.expo')

# Use robocopy to mirror
$robocopyCmd = "robocopy `"$localProject`" `"$workDir`" * /MIR /S /NFL /NDL /NJH /NJS /NP"
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

# Commit changes in clone
Write-Host "Preparing Git commit in clone (this will replace working tree)"
# ensure main branch exists locally
git checkout -B main
if ($LASTEXITCODE -ne 0) { Write-Host "git checkout -B main failed" -ForegroundColor Yellow }

git add --all
git commit -m "Force replace main with local project (prepared on $date)" --allow-empty
if ($LASTEXITCODE -ne 0) { Write-Host "git commit returned non-zero (maybe nothing to commit). Continuing..." -ForegroundColor Yellow }

# Confirm with user before destructive operation
Write-Host "About to FORCE PUSH local 'main' to remote origin/main, overwriting remote history." -ForegroundColor Yellow
$confirmation = Read-Host "Type YES to proceed with force-push"
if ($confirmation -ne 'YES') {
    Write-Host "Aborted by user. No force-push performed." -ForegroundColor Cyan
    Pop-Location
    exit 0
}

# Force push main to remote
Write-Host "Force-pushing main -> origin/main" -ForegroundColor Red
git push -u origin main --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "git push failed with exit code $LASTEXITCODE" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "Force-push completed. Remote 'main' overwritten." -ForegroundColor Green
Write-Host "Temporary clone left at: $workDir" -ForegroundColor Cyan

Pop-Location
