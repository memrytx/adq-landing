# Image loading audit � 2026-10-21

The landing page now uses WebP derivatives, responsive previews, and deferred offscreen image loading. Original PNGs remain available as source assets; the layout and glow layers are retained.

## Measurements

Chrome, empty HTTP cache, no network throttling, 900px viewport height, widths 1440 and 390, device scale factor 1. Measure transferred response bytes over the first 8 seconds without scrolling. These are local development measurements, not internet speed or Core Web Vitals scores. Lazy-loading thresholds and animation timing can change which near-screen resources are requested.

| Environment | Desktop | Mobile |
| --- | ---: | ---: |
| Original Vite development server, port 5173 | 59.09 MB | 26.89 MB |
| Optimized development server, port 5173 | 5.73 MB | 4.92 MB |
| Optimized production preview | 1.80 MB | 1.37 MB |

Development before/after reduction: approximately 90% desktop and 82% mobile. The original 21.90 MB `im3.png` glow is now a 200 KB desktop WebP and a 99 KB mobile WebP. The full set of 49 preview images is reduced from 22.65 MB of PNG originals to 2.42 MB of full-size WebP variants, with separate smaller variants.

## Changes

- `MediaImage` selects WebP variants using native `srcset`/`sizes`, reserves image dimensions, decodes asynchronously, and defaults to lazy loading. Hero title and the first carousel set remain eager.
- Soft decorative surfaces are bounded to 1280px on desktop and 900px on mobile; image quality is 90. Source artwork uses a larger 2560px limit. Transparency remains intact.
- Publisher logos use native lazy loading.
- Desktop SVG case artwork requests its image only within 600px of the viewport and at a desktop/tablet breakpoint. Mobile uses its dedicated artwork.
- The playable carousel's automatic timer runs only while the showcase is visible. Swipes, buttons and demo launch behavior remain available.
- Asset validation checks every original and optimized path declared in the responsive image manifest.

## Regeneration and preview

The derivatives are stored with the project; FFmpeg is not needed for regular builds.

When replacing source artwork, run `npm run optimize:images` with FFmpeg available on PATH, or set `FFMPEG_PATH` to its executable path. The script uses the original PNG files, generates WebP derivatives and updates `src/data/optimizedImages.json`. It writes image output through temporary files to avoid exposing partial images during regeneration.

Run `npm run build` and then `npm run preview` to review the production bundle. Port 5173 is a development server: React's development runtime, source modules and hot reload add several MB that are absent in production. Deploy the generated `dist` directory, not the development server.

## Verification

- Production build and asset validation passed.
- Browser checks at 390, 820, 1440 and 2560px: no broken images or horizontal page overflow after scrolling/loading content.
- Deferred desktop case illustrations load on approach; they remain unloaded on mobile.
- Interactive plan selection loads the optimized preview correctly.
- Initial network capture after optimization contains no HTTP errors.
- Screenshots and raw network/QA data: workspace `design-audit/oct21-network-*.json`, `oct21-image-qa.json`, and `oct21-optimized-*.png`.

Full-page QA deliberately forces image decoding; its traffic is not the first-screen measurement. No claim is made about remote-host loading time, LCP, or CDN caching based on loopback measurements.
