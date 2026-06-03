# scripts/

Local utility scripts for the DODO web project. None of these run at
build time — they're operator tools you invoke from your machine.

## Video pipeline

The `Videos/` folder at the repo root holds source MP4 masters and is
git-ignored. Videos are uploaded to **Cloudflare Stream** and embedded
on the site via a `<VideoPlayer />` component that points at the Stream
UID stored in `Videos/video-manifest.json` (which IS committed).

### 1. `optimize-videos.ps1` — pre-upload re-encode

Downscales 4K masters to 1080p and re-times 60fps masters to 30fps
before upload. Cloudflare Stream re-encodes everything anyway, but
shrinking source files first means a much faster upload from a home
connection and avoids sending bytes that Stream would discard.

```powershell
powershell -ExecutionPolicy Bypass -File scripts\optimize-videos.ps1
```

Originals in `Videos/` are never modified. Outputs land in
`Videos/_optimized/`. The script skips files that already exist in
the output folder, so re-runs are cheap.

Requires `ffmpeg` on PATH. Install via:
`winget install Gyan.FFmpeg`

### 2. `upload-videos-to-stream.mjs` — push to Cloudflare Stream

Reads credentials from `.env.local` at the repo root:

```
CF_ACCOUNT_ID=<your account id>
CF_STREAM_API_TOKEN=<token with Stream:Edit scope>
```

Create the API token at: dash.cloudflare.com → My Profile → API Tokens
→ Create Token → Custom token → Permissions: `Account / Stream / Edit`.

Then:

```bash
node scripts/upload-videos-to-stream.mjs
```

For each video in the VIDEOS array, the script prefers the optimized
file at `Videos/_optimized/<name>.mp4` and falls back to the original
under `Videos/<name>.mp4`. It writes/updates `Videos/video-manifest.json`
mapping a stable key (e.g. `dodo-brand-full`) to the Stream UID. Keys
already in the manifest are skipped on re-run, so the script is safe
to re-execute after adding new videos.

### Adding a new video

1. Drop the source file in `Videos/`.
2. If it's larger than ~150 MB or higher than 1080p, add an entry to
   the `$plan` array in `optimize-videos.ps1` and re-run it.
3. Add an entry to the `VIDEOS` array in `upload-videos-to-stream.mjs`
   with a unique `key`.
4. Run `node scripts/upload-videos-to-stream.mjs`.
5. Reference the key in the page where you want to embed it.
