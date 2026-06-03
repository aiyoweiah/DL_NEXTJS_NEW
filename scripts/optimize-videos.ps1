# Re-encode oversized source videos before uploading to Cloudflare Stream.
#
# What this does:
#   - The two 4K masters get downscaled to 1080p (Stream caps output at 1080p
#     on the Basic tier, so 4K input bytes are discarded server-side anyway).
#   - The two 60fps 1080p masters get re-timed to 30fps (visually identical
#     for talking-head / brand b-roll, halves the bitrate budget).
#   - The two already-sensible files are NOT touched and stay as-is.
#
# Settings: libx264 CRF 20, preset slow, AAC audio passthrough.
# CRF 20 is near-visually-lossless for source material like this; the slow
# preset keeps the file small so the second-generation re-encode that Stream
# performs on ingest does not accumulate noticeable artifacts.
#
# Run from anywhere:
#   pwsh scripts/optimize-videos.ps1
#
# Originals are never modified. Outputs land in Videos/_optimized/.

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot  = Split-Path -Parent $scriptDir
$srcDir    = Join-Path $repoRoot 'Videos'
$outDir    = Join-Path $srcDir   '_optimized'

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

# Verify ffmpeg is on PATH.
$ffmpeg = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
if (-not $ffmpeg) {
    Write-Error "ffmpeg not found on PATH. Install from https://www.gyan.dev/ffmpeg/builds/ or 'winget install Gyan.FFmpeg'."
}

# Per-file encode plan. Files not listed here are uploaded from their original
# location by the upload script (already optimal).
$plan = @(
    @{
        In       = 'DODO 品牌介绍视频_Full (2).mp4'
        Out      = 'DODO-brand-full.mp4'
        Filters  = 'fps=30'                    # 1080p60 -> 1080p30
        Note     = '1080p60 -> 1080p30'
    },
    @{
        In       = 'DODO如何筛选导师.mp4'
        Out      = 'DODO-tutor-selection.mp4'
        Filters  = 'fps=30'                    # 1080p60 -> 1080p30
        Note     = '1080p60 -> 1080p30'
    },
    @{
        In       = 'LCS详细介绍 New.mp4'
        Out      = 'LCS-detailed.mp4'
        Filters  = 'scale=1920:-2'             # 4K30 -> 1080p30
        Note     = '4K30 -> 1080p30'
    },
    @{
        In       = 'Ms.Kimberly Intro (1).mp4'
        Out      = 'kimberly-intro.mp4'
        Filters  = 'scale=-2:1920'             # vertical 4K -> vertical 1080 (1080x1920)
        Note     = 'vertical 4K -> vertical 1080p'
    }
)

foreach ($job in $plan) {
    $inPath  = Join-Path $srcDir $job.In
    $outPath = Join-Path $outDir $job.Out

    if (-not (Test-Path $inPath)) {
        Write-Warning "Skipping $($job.In) -- source not found."
        continue
    }
    if (Test-Path $outPath) {
        Write-Host "Skipping $($job.Out) -- already exists. Delete to re-encode."
        continue
    }

    Write-Host ""
    Write-Host "=== Encoding $($job.In) ($($job.Note)) ===" -ForegroundColor Cyan

    & $ffmpeg `
        -hide_banner -loglevel warning -stats `
        -i $inPath `
        -vf $job.Filters `
        -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p `
        -c:a aac -b:a 192k `
        -movflags '+faststart' `
        $outPath

    if ($LASTEXITCODE -ne 0) {
        Write-Error "ffmpeg failed on $($job.In) (exit $LASTEXITCODE)"
    }

    $inSize  = (Get-Item $inPath).Length
    $outSize = (Get-Item $outPath).Length
    $pct     = [math]::Round(($outSize / $inSize) * 100, 1)
    Write-Host ("  {0:N0} MB -> {1:N0} MB  ({2}% of original)" -f ($inSize/1MB), ($outSize/1MB), $pct) -ForegroundColor Green
}

Write-Host ""
Write-Host "Done. Optimized files in: $outDir" -ForegroundColor Green
