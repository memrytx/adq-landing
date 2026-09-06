# Figma assets

Source: `exports/refs/AQDesign Landing.fig`, desktop frame `476:1344`.

- `figma-*-light.svg` contains the original decorative paths, affine transforms,
  gradient stops, opacity and blur from the local Figma document. The exports
  use disjoint vertical ranges so adjacent sections do not paint a light twice.
  The viewBox includes 1800 source pixels of transparent padding above and below
  so foreground blur is not clipped at the boundary between neighboring sections.
- `caseArtwork.ts` preserves the image-fill transforms, complete vector outlines
  and light paths for Adventure (`476:2576`, `476:2575`) and Bloom
  (`476:2604`, `476:2603`). `CaseArtwork.tsx` renders them together, with the
  original 94 px layer blur represented by SVG Gaussian sigma 47.
- `figma-adventure-source.png` and `figma-bloom-source.png` are the unmodified
  embedded image bytes from the supplied `.fig`, not cropped page screenshots.
- The title chips and broad heading accent use the supplied `im1.png`, `im2.png`
  and `im3.png` via `GlowAccent.tsx`.
- `figma-logo-01.svg` through `figma-logo-21.svg` preserve the publisher strip
  from groups `476:1451` and `476:1523`, including original vector paths,
  embedded image fills and transparent padding. These replace the unrelated
  ad-network logos previously used in the audience sections.
- `figma-portrait-light.svg` is the original poster halo (`476:2462`), separated
  from the AIGC / Video AI ambient layers. It is attached to each poster so it
  follows the mobile carousel and cannot appear at stale desktop coordinates.
- `figma-about-copy.svg` and `figma-process-title.svg` attach the original
  About / getting-started light paths to their content anchors. The About grid
  and process timeline use separate 2560 and 1728 layouts from the source frames.
- `figma-bloom-panel.svg` preserves the translucent blue fill and single
  gradient stroke of `476:2612`. It replaces the generic CSS border and fill;
  it is not layered inside another frame. The Bloom story image, CTA and copy
  use the original desktop dimensions and spacing.

Panels use one contour and a translucent backdrop. Do not place a baked PNG
frame inside that contour: the old frame exports include their own inset border
and transparent padding.

Desktop layout anchors checked at 2560 CSS pixels: cinematic 5195, videos 6584,
Adventure story 9472, Bloom 10817, Bloom story 12020, Plans 14911, Fast track
16230, UGC 18399, Required Assets panel 27563 (1374 × 1364), Important 29007
(1374 × 446). Responsive checks also cover 360, 820, 1366 and 1728 CSS pixels.
