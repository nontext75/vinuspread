# ScrollShowcase Specification

## Overview

- Target file: `src/components/scroll-showcase.tsx`
- Interaction model: scroll-driven sticky section
- Reference: Exo Ape showreel transition model, adapted for Vinuspread content

## DOM Structure

- Long parent section: `height: 320vh`
- Sticky viewport: `position: sticky; top: 0; min-height: 100dvh`
- Center media panel: aspect-ratio 16 / 10, rounded corners, layered gradients and grid texture
- Bottom rail: horizontal cards that translate based on scroll progress

## States & Behaviors

### Scroll progress

- Trigger: window scroll while the section is in view
- Mechanism: `getBoundingClientRect()` inside `requestAnimationFrame`
- State storage: refs only; no React state updates inside the frame loop
- Progress: clamped 0 to 1
- Smoothing: `current = lerp(current, target, 0.1)`
- Media state A: scale 0.28, y 34px, clipped by 14% inset
- Media state B: scale 1, y 0px
- Rail state A: x 0vw
- Rail state B: x about -64vw
- Title lines: move in from alternating horizontal directions and fade by local progress

## Text Content

- Product strategy
- Experience design
- Launch operation
- From first idea
- To usable systems
- And stable growth

## Responsive Behavior

- Desktop: large centered media with card rail under it
- Mobile: same interaction model with smaller padding and fluid type
