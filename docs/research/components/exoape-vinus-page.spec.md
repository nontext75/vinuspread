# ExoApeVinusPage Specification

## Overview

- Target files:
  - `src/app/page.tsx`
  - `src/components/scroll-showcase.tsx`
- Interaction model: Exo Ape-inspired scroll-driven editorial landing page.
- Content source: `https://vinus-website.vercel.app/`
- Behavior reference: `https://www.exoape.com/?ref=godly`

## Required Sections

### 1. Hero

- Full viewport.
- Navigation fixed at top.
- Large editorial title using Vinuspread's message.
- Real visual/media signal in first viewport.
- Must not look like a generic SaaS landing page.

### 2. Featured Projects

- Dark editorial section.
- Large section title.
- Project list/cards with Vinuspread project names.
- Hover affordance on desktop.

### 3. Showreel / Services

- Sticky scroll-driven section.
- Media panel scales and moves by scroll progress.
- Active service description changes by progress bucket.
- Use refs and direct style writes in RAF, not React state.

### 4. Insights / Clients

- Editorial list of three insight titles.
- Client list should be compact and not a fake logo wall unless real logos are used.

### 5. Contact Footer

- Large CTA.
- Vinuspread email, phone, hours, address.

## Motion Rules

- Desktop: cinematic scroll progress with `lerp(current, target, 0.1)` inside local animated sections.
- Mobile: motion simplified, no horizontal overflow.
- Reduced motion: keep layout usable.

## QA Requirements

- Capture desktop top and showcase.
- Capture mobile top and showcase.
- Build must pass.
- No clipped visible text.
- No mojibake / garbled Korean.

