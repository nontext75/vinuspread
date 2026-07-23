# Vinuspread Current Work Status

Date: 2026-07-23
Branch: `main`

## Scope

Current work is focused on stabilizing the English website foundation and matching the implemented pages to the Figma reference.

Korean pages are intentionally removed from the active scope for now. The English version is the source of truth.

## Foundation

- Font direction is fixed to Instrument Sans.
- Font weights are limited to Regular and Medium.
- Korean font assets and `/ko` routes have been removed from the current implementation scope.
- Text style naming is being consolidated by role:
  - `display-*`
  - `heading-*`
  - `body-*`
  - `label-*`
- Ambiguous direct font sizing has been removed from components and pages where found.
- Hero display text is controlled through shared type variables.
- Tag sizing was moved into the shared `Tag` component through token based CSS.

## Main Page

Main page section heights, top positions, and internal still-cut geometry have been measured against the current English Figma desktop, tablet, and mobile frames.

Current section sync state:

- Hero: matched; current desktop height is 2418px
- Intro: matched
- Experience: matched card positions and responsive composition
- PlayReel: matched background treatment and Figma play-button artwork
- How we work: matched typography, service grid, icons, and CTA positions
- Clients: matched 28-logo matrix, responsive copy, cell sizes, and logo scales
- Story: matched responsive card rows, typography, and the three Figma source images
- Footer: matched against the main Footer component variants, not page-instance overrides

Current motion mode:

- The approved still layout is locked and motion has been restored without changing section geometry.
- Desktop fine-pointer devices use Lenis inertia synchronized with GSAP ScrollTrigger.
- Mobile and touch devices keep native scrolling.
- Home hero copy enters in a paced hierarchy; hero, project media, and PlayReel media respond to scroll progress.
- Subpage heroes, portfolio cards, story rows, Studio cards, contact rows, and project-detail content use restrained staggered entrances.
- `prefers-reduced-motion: reduce` disables inertial scrolling and renders all content in its resting state.

Current main page section start positions:

- Mobile: `0 / 890 / 1420 / 4038 / 4458 / 5411 / 6653 / 8354`
- Tablet: `0 / 1823 / 2497 / 4446 / 5086 / 5890 / 6866 / 8108`
- Desktop: `0 / 2418 / 3301 / 6493 / 7773 / 8927 / 10036 / 11021`

Footer main-component heights:

- Mobile: `876.9565px`
- Tablet: `761px`
- Desktop: `684px`

## English Subpages

The English Experience, Studio, Story, and Contact index pages were compared against the current Figma desktop, tablet, and mobile frames.

This pass intentionally changes page composition and page-scoped layout only. Shared component source files remain reserved for the separate component update.

Measured page heights:

- Experience: mobile `4590px`, tablet `3547px`, desktop `3095px`
- Studio: mobile `7174px`, tablet `6384px`, desktop `9894px`
- Story: mobile `5823px`, tablet `4129px`, desktop `4294px`
- Contact: mobile `3859px`, tablet `3874px`, desktop `3930px`

Responsive section margins:

- Mobile: `20px`
- Tablet: `40px`
- Desktop: generally `64px`; Story archive list uses the Figma-specific `80px`

Page-specific adjustments:

- Experience project grid rows, columns, gaps, cards, and desktop-only controls are aligned per breakpoint.
- Studio principles, vision, business, and clients section slots are aligned per breakpoint.
- Story hero, archive section, and card row slots are aligned per breakpoint.
- Contact hero, information grid, inquiry form, image sizing, labels, and CTA composition are aligned per breakpoint.
- All subpages use the main Footer component geometry rather than overridden page instances in Figma.

Static QA screenshots are stored under `output/playwright/subpage-*-static.png`.

## Detail Pages

The current English Experience detail and Story detail reference pages were checked against the latest Figma frames at desktop, tablet, and mobile widths.

Measured page heights with the existing main Footer component:

- Experience detail: mobile `4320px`, tablet `6995px`, desktop `15534px`
- Story detail: mobile `2793px`, tablet `2779px`, desktop `3882px`

Key adjustments:

- The Budongsan114 detail hero, metadata, overview, two content groups, four image crops, and responsive spacing now follow the current Figma reference.
- The duplicated mobile project title was removed.
- Large detail media are loaded directly so below-the-fold still-cut captures do not omit images.
- Story detail title, cover, article copy, dividers, sections, tags, and responsive section positions now follow the current Figma reference.
- The mobile Story title is fitted inside the real 390px viewport while the Figma header instance still carries its known fixed-width component override.
- Budongsan114 detail content groups now use viewport-triggered entrances while preserving the approved image crops and section heights.
- Shared detail-navigation and Footer layout source files were not changed; Header only restores its existing motion behavior without layout changes.

Static QA screenshots are stored under `output/playwright/detail-*-static.png`.

## QA Performed

The following checks passed:

```bash
npm run lint
npm run build
```

Search checks were also run for obvious style contamination:

- `font-bold`
- `font-semibold`
- `Pretendard`
- `NotoSansKR`
- `Google Sans`
- `font-ko`
- direct arbitrary `text-[...]`
- direct arbitrary `leading-[...]`
- invalid responsive body classes such as `md:body*`

No matches were found in `src/app` or `src/components` for those search patterns at the time of this status note.

Home, index, and detail-page browser measurements were repeated at `390px`, `1024px`, and `2560px` after motion was restored. All 21 route/viewport combinations retain the approved page heights with a `0px` delta and no horizontal overflow.

Motion QA also confirmed:

- Desktop wheel input eases toward its target instead of stepping directly.
- Home hero entrance, Intro pinning, project media parallax, PlayReel scaling, and section reveals run in normal mode.
- Mobile uses native scrolling and keeps the same approved layout.
- Reduced-motion mode creates no Lenis instance and leaves hero text at `opacity: 1`, `transform: none`, and `clip-path: none`.
- No page runtime errors remain in the checked routes.

## Remaining Work

- Final external browser review of motion feel and pacing.
- Apply the separately maintained shared component updates after that work is ready.

## Notes

The approved responsive geometry remains explicit and unchanged. Motion is layered through transforms, opacity, clip-path, and scroll progress so it does not alter document flow or the locked Figma section metrics.
