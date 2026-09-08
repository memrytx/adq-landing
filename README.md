# AQDesign Landing

Landing page built with Vite, React, TypeScript, and CSS modules.

## Local development

Run `START_SITE.bat`, or use:

```bash
npm ci
npm run dev
```

The local URL is `http://127.0.0.1:5173/adq-landing/`.

## Deployment

All build assets are included in this repository. The original Figma/PDF
reference folder outside the repository is not required for development or deployment.
Imported raster exports live in `src/assets/exported/`; public images and
playables live in `public/`.

`npm run build` checks local asset references (including filename case and paths
outside the repository) before compiling. Run `npm run check:assets` separately
to diagnose missing assets.

Push the `main` branch and select **GitHub Actions** in **Settings → Pages → Build and deployment → Source**.

The workflow publishes the production build to:

https://memrytx.github.io/adq-landing/

## Local video files

All 11 videos are included in `public/assets/videos/` (about 235 MB total).
They are H.264/AAC MP4 files with fast-start metadata and retain the original
Full HD dimensions. Commit these files along with the code: Vite copies them
to `dist/assets/videos/`, and no external video embed is used at runtime.
Videos are only loaded when the viewer opens, not on initial page load.

`src/data/videos.ts` maps the files to the page. Original YouTube/Drive links
are recorded in `scripts/video-sources.json`. To encode replacement originals
with matching filenames, install ffmpeg/ffprobe and run:

```bash
python scripts/prepare-videos.py PATH_TO_ORIGINALS
```

The encoding script intentionally does not overwrite existing MP4 files.
