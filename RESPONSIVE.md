# Responsive layouts

Use the same width boundaries throughout the site, including JavaScript media queries.
The Figma frame sizes are reference viewports, not minimum supported screen widths.

| Layout | Reference viewport | CSS viewport width |
| --- | --- | --- |
| Phone | 360 × 780 | below 768px |
| Tablet | 820 × 1180 | 768–1300px |
| Laptop | 1728 × 1117 | 1301–1899px |
| Desktop | 2560 × 1440 | 1900px and above |

Typography stays fixed within each layout. Shared typography tokens are defined on
`.page` in `src/App.module.css`; section-specific type sizes use the same media ranges.
Containers, images and spacing can remain fluid. Allow text to wrap or give grid
labels enough intrinsic width instead of adding a local font breakpoint.

Do not introduce layout changes based on viewport height or aspect ratio. Keep
pointer, hover and reduced-motion queries for their respective input/accessibility
behaviour.

Verify both sides of 768, 1301 and 1900px, the four reference viewports, and intermediate
widths. Check text overflow, page overflow and actual screenshots of affected sections.
