# Exo Ape Clone Brief for Vinuspread

## Objective

Use Exo Ape as the interaction and page-composition reference, but keep Vinuspread's content, service structure, project names, and contact information.

This is not a literal brand clone. The target is:

- Exo Ape-like cinematic scroll behavior;
- Vinuspread content and information architecture;
- Vinuspread visual identity preserved enough to avoid feeling like an unrelated redesign.

## Extracted Exo Ape Page Topology

1. Hero
   - Full viewport image-led hero.
   - Fixed navigation overlays the scene.
   - Large split title lines: `Digital / Design / Experience`.
   - Intro paragraph sits above the title.
   - Background image carries the first impression.

2. Featured Projects
   - Dark section.
   - Label, huge section title, short body.
   - Project media cards use image plus muted looping video.
   - Desktop interaction includes hover video play.

3. Showreel
   - Light grey/dark stage.
   - `Play Reel` title with masked title lines.
   - A video is visible and controlled by viewport play/pause.
   - Scroll progress drives transform timeline.

4. Featured Articles
   - Dark/media-led editorial section.
   - Layered images/videos in the background.
   - Huge masked title lines.

5. Footer
   - Sand/dark palette.
   - Large story CTA.
   - Footer video background.

## Source-Backed Behavior Model

Desktop is virtual-scrolled.

```js
target += wheel.deltaY
current = lerp(current, target, 0.1)
content.style.transform = `translate3d(0, ${-current}px, 0)`
```

Sections calculate local progress from `getBoundingClientRect()` and push that progress into paused timelines.

```js
progress = normalize(sectionBounds)
scrollTl.progress(progress)
```

Videos are not scroll-scrubbed by `video.currentTime` on the homepage. They play/pause by visibility or hover state.

## Vinuspread Adaptation

Map Exo Ape sections to Vinuspread:

1. Hero
   - Use Vinuspread's `THE PRODUCT PRACTICE` message.
   - Use a real Vinuspread visual asset or video still instead of fake UI blocks.
   - Preserve nav labels: vinuspread, experience, services, lab, blog, Contact.

2. Featured Projects
   - Use Vinuspread project names:
     - Mongdang
     - Shinhan Easy
     - Crowd OH!
     - macadamia
     - Budongsan114
     - Donga On book

3. Showreel
   - Use Vinuspread service model:
     - Product Strategy
     - Experience Design
     - Brand Systems
     - Launch & Operation
   - Implement scroll-driven scale/position/mask, not video currentTime scrubbing.

4. Articles / Insights
   - Use Vinuspread insight titles and dates.

5. Footer
   - Use Vinuspread contact details exactly.

## Implementation Rules

- No garbled Korean text.
- No fake Exo Ape copy.
- No copied Exo Ape photography as a brand asset in final implementation.
- Use real Vinuspread assets where possible.
- Use native scroll on mobile and simplify the motion.
- Avoid React state updates inside animation frames.
- Do not publish the URL until desktop and mobile screenshots are visually checked.

