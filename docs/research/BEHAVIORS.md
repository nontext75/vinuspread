# Behaviors

## Reference Interaction Model

Exo Ape's important homepage transition pattern is not video frame scrubbing. The media plays independently, while scroll progress controls spatial properties around it: scale, translation, opacity, sticky positioning, and text movement.

## Vinuspread Implementation

- `ScrollShowcase` uses a long section with a sticky viewport.
- Scroll progress is calculated from the section's `getBoundingClientRect()`.
- The media panel scales from small to full size as the user moves through the section.
- A horizontal content rail shifts according to the same progress.
- The active copy changes by progress bucket.
- Reduced-motion users still get the static sticky composition without CSS animation loops.

## Browser Status

Pixel-perfect extraction is blocked until Browser or Chrome control is available in this same Codex task. The current implementation is therefore an applied motion prototype using the previously analyzed Exo Ape behavior model and Vinuspread's live content.
