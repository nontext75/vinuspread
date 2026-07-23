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

Current comparison mode:

- All page motion and transitions are disabled for still-cut comparison.
- Browser audit reports zero running animations and zero elements with active animation/transition duration.
- Smooth scrolling is disabled (`scroll-behavior: auto`).

Current main page section start positions:

- Mobile: `0 / 890 / 1420 / 4038 / 4458 / 5411 / 6653 / 8354`
- Tablet: `0 / 1823 / 2497 / 4446 / 5086 / 5890 / 6866 / 8108`
- Desktop: `0 / 2418 / 3301 / 6493 / 7773 / 8927 / 10036 / 11021`

Footer main-component heights:

- Mobile: `876.9565px`
- Tablet: `761px`
- Desktop: `684px`

## Detail Pages

Experience detail and Story detail pages were checked across desktop, tablet, and mobile.

Measured result:

- Experience detail: desktop, tablet, mobile section heights match the current Figma reference.
- Story detail: desktop, tablet, mobile section heights match the current Figma reference.

Key adjustments:

- Story detail body text now uses scoped responsive body variables.
- Project detail overview was adjusted on mobile to match the target section height.
- Detail page structure avoids duplicated mobile overview content.

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

## Remaining Work

- External still-cut review/acceptance of the completed English home page.
- Restore and refine motion only after the still-cut review is approved.
- Continue subpage comparison as a separate pass.

## Notes

Current priority is to keep the foundation stable and avoid creating page specific styles unless absolutely necessary. Component level style corrections should be applied before page level overrides.
