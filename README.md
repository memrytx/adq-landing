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
