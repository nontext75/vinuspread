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

Main page section heights and top positions have been measured against the Figma desktop, tablet, and mobile frames.

Current section sync state:

- Hero: matched by section height
- Intro: matched by section height
- Experience: matched by section height
- PlayReel: matched by section height
- How we work: matched by section height
- Clients: matched by section height
- Story: matched by section height
- Footer: matched by section height

Motion was adjusted so:

- Intro content is hidden before the hero section completes.
- Experience content is hidden while Intro is active.
- Intro remains visually separated from Hero during the scroll transition.
- Portfolio cards keep their staggered reveal behavior.

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

The overall goal is not fully complete yet.

Remaining items:

- Continue section by section comparison against Figma for all subpages.
- Recheck internal element positions, not only section heights.
- Confirm motion end states still match Figma static positions.
- Continue tablet and mobile visual QA.
- Remove or organize temporary audit artifacts if they are no longer needed.
- Final full browser screenshot comparison after all subpages are closed.

## Notes

Current priority is to keep the foundation stable and avoid creating page specific styles unless absolutely necessary. Component level style corrections should be applied before page level overrides.
