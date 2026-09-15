# Visual layout rules

- Decorative glows must stay behind all text, images, videos and controls, including content in neighbouring sections. Never place a glow above content using a local stacking context.
- Gradients must fade to fully transparent before their bounds. Do not clip glows at information-block boundaries. Only the outer page may clip horizontal overflow.
- Verify mobile changes against the entire reference in exports/refs, including transitions between sections, then inspect affected details. Keep a full-page screenshot as well as viewport screenshots.
- Preserve mobile memory optimizations: use appropriately sized artwork and avoid large offscreen blur surfaces or scroll-driven light repaints.
