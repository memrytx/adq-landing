# AQDesign Landing — project context

## Goal

Reproduce the AQDesign landing page from the supplied Figma exports as closely as possible using Vite, React, TypeScript, and CSS Modules. No UI framework is used.

## Source of truth

Use these sources in this order:

1. `../exports/pdf_images/` — primary visual references for the landing page on desktop, tablet, and mobile.
2. `../exports/Untitled.fig` (and its exports) — reference only for the placement and presentation of playable ads.
3. `../exports/ADQ_Design.fig` — reference only for video URLs.

Important scope rule: the user's playable HTML builds and their preview/icon assets may be used only inside the **Playable Ads** section. They must not replace imagery in Gaming, Non-Gaming, hero, case-study, or other sections.

Main exported reference frames found in `../exports/pdf_images/`:

- desktop reference: approximately `1728 × 26718`
- large desktop reference: approximately `2535 × 32768` (export of the 2560-wide frame)
- playable layout reference: approximately `2560 × 12759`
- tablet reference: approximately `1637 × 32768`
- mobile reference: approximately `360 × 16031`

## Assets

- Design images extracted from the supplied Figma file: `public/assets/design/`
- Playable previews: `public/assets/playable-previews/`
- Playable icons: `public/assets/playable-icons/`
- Local playable HTML builds: `public/playables/`
- Playable metadata: `src/data/playables.ts`

The company/user has permission to use the supplied assets.

## Project structure

- `src/App.tsx` — page composition and ambient pointer/scroll parallax
- `src/App.module.css` — all section layout, responsive rules, glows, and animations
- `src/components/Hero.tsx` — opening message and looping creative carousel
- `src/components/About.tsx` — AQDesign description and stats
- `src/components/AudienceBanner.tsx` — Gaming / Playable Ads / Non-Gaming transition sections
- `src/components/Gaming.tsx` — gaming showreels, offers, and cases
- `src/components/PlayableAds.tsx` — playable carousel, local playable modal, packages
- `src/components/PackageCarousel.tsx` — responsive package-card rail and mobile pagination dots
- `src/components/NonGaming.tsx` — UGC/AIGC/Video AI offers
- `src/components/VideoPlayer.tsx` — on-page YouTube/Google Drive video modal
- `src/components/Closing.tsx` — process and requirements
- `src/components/Footer.tsx` — site navigation, project CTA, copyright, and back-to-top link

## Video behavior

Videos open in a modal directly on the site:

- YouTube watch links are converted to `youtube.com/embed/...` URLs.
- Google Drive file links are converted to `/preview` URLs.
- Drive videos still need viewer permission for site visitors; otherwise Google will show an access screen inside the modal.

The exact source links are kept in `Gaming.tsx` and `NonGaming.tsx` and came from `ADQ_Design.fig`.

## Motion and interaction

- The hero creative rail loops continuously.
- The Plans carousel advances automatically and uses paired enter/exit animations: the old full plan leaves in the navigation direction and the new plan enters from the opposite side.
- Opening a playable pauses auto-advance.
- Company and ad-network logo rails loop continuously and pause on hover.
- Package cards become touch-scrollable snap carousels with translucent pagination dots below 900px.
- The end of Playable Ads contains a five-level BASIC / ENHANCED / ADVANCED / INTERACTIVE / PREMIUM 3D panel.
- Playable plan mapping is fixed by playable ID, not array order: BASIC = `ivg-131-4`, ENHANCED = `iop-434-25`, ADVANCED = `anb-25-20t`, INTERACTIVE = `anbm-03-57`, PREMIUM 3D = `ac-20-15`.
- Numerous local blue/purple glows sit behind content groups; additional slow-pulsing glow orbs react to pointer and scroll position at two parallax depths.
- Video play buttons open a modal without leaving the site.
- Offer video buttons are centered inside the image-only wrapper (`offerVisual`), so price rows do not affect their vertical position.
- Adventure Bay and Bloom City use their supplied transparent organic shapes; case detail icons are enlarged, key phrases are cyan, and Result labels/icons are green.
- Case imagery now uses the user's finished transparent exports rather than CSS masks: `case-adventure-art.png` + `case-adventure-glow.png`, and `case-bloom-art.png` + `case-bloom-glow.png`.
- Gaming case icons come from the supplied sprite exports `case-meta-icons.png` and `case-story-icons.png`; do not replace them with text glyphs.
- On mobile, case artwork is placed between the case heading and details, story posters form a horizontal snap rail, and video controls use the green/blue `Watch video` pill from the reference.
- `Mix Packages` is a two-column desktop composition with the heading beside two full-width cards; on mobile it is a snap carousel showing one card plus part of the next.
- `prefers-reduced-motion` is respected by the global CSS.

## Running locally

From this directory:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). On systems where PowerShell script execution is enabled, plain `npm` also works.

For a one-click Windows test, double-click `START_SITE.bat` next to `index.html`. It installs missing dependencies, starts Vite on `http://127.0.0.1:5173/`, and opens the default browser when the server is ready.

Production check:

```powershell
npm.cmd run build
```

## Visual QA targets

Compare at these widths first:

- `1728px` desktop
- `2560px` large desktop
- `820px` tablet
- `360px` mobile

Keep the desktop vertical rhythm close to the reference: sections should transition through visible blue/purple glows without multi-screen dead zones.

## Known environment notes

- This folder is not currently a Git repository, so there is no `git diff`/commit history here.
- Large Figma/PDF image exports may be capped at 32768px in height; compare proportionally and against the individual frame exports.
- The local site can be developed and checked without Dev Mode. The exported `.fig`, PDF frame images, and extracted assets are sufficient.

## Continuation checklist

When resuming in another chat:

1. Read this file.
2. Run `npm.cmd run build` before editing to establish a clean baseline.
3. Start Vite and visually compare the four QA widths against `../exports/pdf_images/`.
4. Preserve the source hierarchy and the playable-only scope rule above.
