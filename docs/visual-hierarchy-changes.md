# Visual hierarchy changes

Date: 2026-07-23

- Type scale is role based: `display`, `heading`, `body`, `label`.
- English font is Instrument Sans only. Weights are limited to Regular 400 and Medium 500.
- Removed Korean font usage from the English build. Korean pages are currently removed until the English system is stable.
- `body-md` is the default body style: 14px on mobile, 16px on desktop, with a consistent unitless line height.
- `body-lg` is the larger lead/body style: 20px on mobile, 24px on desktop, with a consistent unitless line height.
- `body-xl` is used for the large homepage lead copy: 24px on mobile, 36px on desktop.
- `heading-intro` is used for the homepage intro statement: 32px on mobile, 56px on desktop.
- `display-section` and `heading-card-large` cover the homepage portfolio title/card hierarchy without page-level font overrides.
- `label-sm` stays at 12px for meta labels and compact UI labels.
- 22px type usage is not allowed. It should merge into 20px or 24px depending on hierarchy.
- Component text stacks now prefer consistent 8px mobile and 16px desktop vertical gaps where the content role is comparable.
- Portfolio card, list card, service card, studio philosophy media, captioned media, story cover, and project content media now own their ratio styles at component/foundation level.
- `ServiceCard` now owns its home-process mobile typography and stacking rules through `mode="homeProcess"`. Page-level selectors no longer reach into its internal title/detail/icon structure.
- Experience section structure now matches Figma hierarchy: title block, CTA, divider, then portfolio grid with 96px section gaps. Feature portfolio cards use a 24px media-to-copy gap and 8px copy-stack gap.
- `CategoryBadge` now owns the Figma badge treatment through `label-badge`: 14px desktop, Medium, #F4F4F4 background, and #6E6E73 text.
- Client logo grid now owns its matrix, logo opacity, divider color, and 2560 desktop size at component/foundation level. The home page only supplies the section title/copy and component placement.
- Home story list now uses the Figma card variant values at component level: 144px circular media, 36px regular title, 16px body/meta, 48px internal gap, and no initial transform during the static sync phase.
- Footer now uses footer-specific color tokens, Meta 16 labels, Display 120 next-page title with 1.0 line-height, 642px desktop main area plus 72px utility area for the 714px home footer.
- Portfolio and story list reveal motion now enters from below with staggered timing, while final layout size remains flow based.
- Homepage intro now uses a desktop sticky hold zone so the white intro screen stays readable before the Experience section enters. The root container uses `overflow-x: clip` instead of vertical overflow clipping so sticky positioning can work.
- Portfolio card reveal now animates vertical movement only. Opacity fade was removed to prevent images and text from appearing washed out during scroll.
- Home `How we work` service cards now keep their typography inside `ServiceCard mode="homeProcess"`: 24px Medium title with 1.2 line-height, 16px details with 8px vertical gap, and the service grid uses the Figma 64px vertical padding.
- Component-first style cleanup pass:
  - Removed page-level component internals overrides such as `titleClassName`, `descriptionClassName`, `copyClassName`, `contentClassName`, `mediaClassName`, `iconClassName`, and `detailsClassName`.
  - `PortfolioCard`, `ServiceCard`, `StudioPhilosophyCard`, `StoryListItem`, `FormSection`, and `FormField` now own their internal typography, media ratio, spacing, and label emphasis.
  - Form textarea spacing and label emphasis now use `FormField variant="textarea"` instead of page-level `gap` or `labelClassName` overrides.
- Homepage static sync check at 2560px:
  - Hero: 2560×2508, large title 360px / 0.9 line-height, lead 36px, CTA 24px.
  - Intro: 2560×883, content frame 1440px at x=560, y=200, intro copy 56px / 1.1 line-height, CTA 24px.
  - Experience: 2560×3226, title/copy/CTA/divider/canvas positions match the Figma section rhythm.
  - PlayReel: 2560×1280, centered 168px play button.
  - How we work: 2560×1152, 1440px centered content grid with 96px section gaps.
  - Clients: 2560×1109, 2368×353 logo matrix.
  - Story: 2560×985, 1168px / 1168px two-column layout.
  - Footer: 2560×714, 642px main footer plus 72px utility footer.
- Direct typography/color override audit:
  - No remaining `text-[...]`, `leading-[...]`, `font-[...]`, `tracking-[...]`, `font-bold`, `font-semibold`, `Pretendard`, `font-ko`, or `font-korean` patterns in `src/app` and `src/components`.
- Homepage motion adjustment:
  - Intro pin motion is applied only in the 768px–2199px range so the 2560px Figma static section positions remain unchanged.
  - At 2560px, verified section document positions remain: Hero 0, Intro 2508, Experience 3391, PlayReel 6617, How we work 7897, Clients 9049, Story 10158, Footer 11143.
  - Intro motion now starts with a white hold frame, then moves the whole intro content block upward without opacity fade or line-by-line spacing distortion.
  - Experience cards retain upward stagger movement without opacity fade.
- Subpage component-first cleanup:
  - `SubpageHero` now accepts `titleLabel` so multiline display titles keep clean accessible labels without page-specific typography overrides.
  - Experience, Studio, Story, and Contact subpage heroes now preserve visual line breaks while exposing correct single-sentence title labels.
  - Work detail hero hides responsive duplicate title spans from assistive text and exposes one `aria-label` title.
  - Story detail header/body no longer rely on fixed height with hidden overflow. Long titles now expand safely and keep 160px between title and cover image at 1440px.
  - Header menu email and `VisionFormula` word weight were moved to direct component-level text styles instead of relying on incidental parent styling.
  - Mobile subpage heroes were audited at 390px. `Studio` and `Story` mobile hero heights now leave safe space below the lead copy instead of clipping it.
  - Responsive subpage audit at 1440px, 1024px, and 390px reports `overflowX: 0` for Experience list, Experience detail, Studio, Story list, Story detail, and Contact.
- Component-first overflow safety pass:
  - `StoryListItem`, `Footer`, and `NextProjectLink` now use `min-height` instead of fixed height where editable text can change component height.
  - Archive story rows and footer blocks use visible overflow so component text is not clipped by motion or content changes.
  - Page section containers that wrap reusable components now use visible overflow with CSS `min-height` where the design still needs a measured section footprint.
  - Re-audited `/`, `/work`, `/work/budongsan114-mediate-bizsolution`, `/studio`, `/news`, `/news/ux-writing-single-button`, and `/contact` at 1440px, 1024px, and 390px. All report `overflowX: 0`; the only remaining overflow detector hit is the intentional full-bleed PlayReel media mask.
- Main Hero / Intro / Experience pass:
  - 2560px static section positions remain aligned to the recorded Figma baseline: Hero 2508, Intro 883, Experience 3226, PlayReel 1280, How we work 1152, Clients 1109, Story 985, Footer 714.
  - Medium desktop Intro motion no longer starts at `y: 960px`; it now starts within a 120–180px range so the white Intro screen shows copy immediately after the Hero clears.
  - Intro pin duration was reduced from 1.2 viewport heights to 0.85 viewport heights to avoid the “extra empty scroll” feeling before Experience enters.
  - Experience title/copy reveal no longer uses opacity fade. The copy remains readable during scroll and only moves vertically.
  - `PortfolioCard` owns the category badge placement. The badge now sits in the title row instead of overlaying the image, matching the component structure used in Figma.
- Main PlayReel / How we work / Clients / Story / Footer pass:
  - PlayReel remains a full-bleed 1440×720 / 2560×1280 media section and does not overlap the How we work content.
  - How we work service grid keeps component-owned typography and does not clip service copy during scroll.
  - Clients section now declares `data-header-theme="dark"` so the global header switches to the white treatment on the dark background.
  - Main reveal motion for later sections no longer hides text with opacity. `data-reveal`, service cards, and client blocks now use vertical movement only so static screenshots remain readable.
  - Story heading is no longer sticky on desktop. This prevents the large Ideas & Insights title from overlapping the fixed header near the footer transition.
  - Re-audited homepage at 1440px, 2560px, and 390px. All report `overflowX: 0`.
- Experience list component-first sync:
  - `PortfolioCard` owns the category badge placement again. The badge now sits inside the media at bottom-right, matching the current Figma Experience card component, instead of being positioned by the title row.
  - `SubpageHero` desktop content start now uses a shared 136px top padding after the fixed header. This aligns Experience, Studio, Story, and Contact hero content starts from the component layer.
  - Fixed invalid `line-height: min(0.92em, var(...))` usage on subpage and story-detail titles. Titles now use the role token directly, so computed line height matches the design-system scale.
  - Subpage lead copy now uses the shared secondary text color at component level.
  - Re-audited Experience at 2560px: Header 92, Hero 866, Portfolio List 1449, Footer 714, overflowX 0.
  - Re-audited Experience, Studio, Story, Contact, Experience Detail, and Story Detail at 1440px. All report `overflowX: 0`.

## Component-first style pass - 2026-07-23 05:51
- Applied component/foundation first correction: tablet project display token now resolves before page-level layout.
- Stabilized PortfolioCard media/image layer through shared CSS, not per-page overrides.
- Reduced ProjectContentBlock image parallax travel to prevent image clipping during scroll.
- Verified forbidden direct font patterns, lint, and production build pass.


## Home static sync pass - 2026-07-23 06:02
- Preserved exact 2560 Home section heights against Figma: Hero 2508, Intro 883, Work 3226, Reel 1280, Studio 1152, Clients 1109, Stories 985, Footer 714.
- Removed Intro ScrollTrigger pin during static sync because pinSpacing added non-Figma layout space on 1440 desktop.
- Neutralized scroll reveal y-transforms for static layout pass; motion will be reapplied after static sync.
- Standardized ArrowLink component height to 48px instead of the previous 41px runtime height.
- Kept Story home rows at 240px rather than Figma 243px to obey the 4px rhythm rule; total row list is intentionally normalized.
- Verified no direct 22px/text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.


## Component-first form and formula pass - 2026-07-23 06:20
- Moved Contact attachment control into `FormFileControl` so file button size, label typography, gap, and hover state are component-owned.
- Moved form textarea baseline styling into `formTextareaClassName`; page instances now only declare contextual height.
- Replaced Studio inline vision formula circle markup with the shared `VisionFormula` component.
- Restored `VisionFormula` circle sizing at component level so page sections do not own the token shape.
- Verified no direct text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.

## Home PC static alignment follow-up - 2026-07-23 06:38
- Corrected Home Studio CTA group alignment to center against the Figma Desktop action block.
- Corrected Footer desktop main block from 642px runtime height to the Figma-aligned 610px component height; Home footer remains 714px overall with the intended lower remainder.
- Set PlayReel background image to eager loading so static screenshot QA does not show an unloaded black section.
- Re-measured Home Desktop 2560: Hero 2508, Intro 883, Work 3226, Reel 1280, Studio 1152, Clients 1109, Stories 985, Footer 714, overflowX 0.
- Verified no direct text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.

## Subpage PC sync follow-up - 2026-07-23 07:05
- Re-measured Experience Desktop 2560 and aligned section rhythm to current Figma: Hero 868, Portfolio List 1451, Footer 714, overflowX 0.
- Re-measured Experience Detail Desktop 2560 and aligned detail rhythm: Hero 1522, Meta 258, Overview 396, Content 12602, Detail Navigation 72, Footer 682, overflowX 0.
- Rebuilt Studio Vision from component-first structure: title block, description, and image/formula overlay now follow the Figma component order instead of page-owned inline formula markup.
- `VisionFormula` now owns its token gap and plus-sign layout; Studio places the reusable component over the image instead of recreating token circles on the page.
- Re-measured Studio Desktop 2560: Hero 868, Principles 2762 including divider rhythm, Vision 2067, Field of Business 2413 including divider rhythm, Clients 1014, Footer starts at 9212, overflowX 0.
- Verified no direct text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.

## Story and Contact PC sync - 2026-07-23 07:30
- Re-measured Story Desktop 2560 against Figma: Header 88, Hero 868, Story List 2656, Footer 682, bodyHeight 4294, overflowX 0.
- Re-measured Story Detail Desktop 2560 against Figma: Article Header 550, Cover 1280, Body 1210, Detail Navigation 72, Footer 690, bodyHeight 3890, overflowX 0.
- Contact desktop form now follows the component-first compact form pattern instead of the previous oversized numbered `FormSection` structure.
- Added compact form controls to `FormField` and compact file attachment sizing to `FormFileControl`; desktop Contact consumes those component primitives.
- Re-measured Contact Desktop 2560 against Figma: Hero 868, Info Grid 1058, Project Inquiry 1234, Footer 682, bodyHeight 3930, overflowX 0.
- Verified no direct text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.

## Component-first responsive pass - 2026-07-23
- Kept style ownership on shared components first: `PortfolioCard` now owns category badge placement in the title row, and `FormFileControl` compact mode is reused by both desktop and mobile Contact forms.
- Corrected Home mobile clients selector so the 720px height applies to `ClientLogoGrid` only, not the section title block.
- Added tablet-only `ClientLogoGrid` cell height normalization at the foundation/component CSS layer.
- Re-synced Home section rhythm at 390px, 1024px, and 2560px while preserving the 2560 desktop baseline.
- Current Home runtime check: 390px body 9612px against 9613px target; 1024px body 9074px against 9060px target; 2560px body 11857px unchanged.
- Verified no direct text px/font-bold/font-semibold/Pretendard patterns, lint pass, build pass.

## Component-first responsive correction - 2026-07-23
- Applied style/spacing corrections to shared primitives before page layout:
  - `FormField` now uses a tighter component-owned label/control gap.
  - `Tag` now owns responsive compact sizing: 40px mobile, 44px tablet/desktop.
  - `ProjectContentBlock` now owns mobile-only media height caps for the Budongsan detail page so tall desktop image ratios do not break the mobile layout.
- Contact responsive sync:
  - 390px: Hero 583, Info 1176, Inquiry 1198, Footer 965.
  - 1024px: Hero 642, Info 1404, Inquiry 941, Footer 806.
  - 2560px: Hero 868, Info 1058, Inquiry 1234, Footer 682.
- Story detail responsive sync:
  - 390px: Article Header 341, Cover 260, Body 1208, Detail Nav 88, Footer 965.
  - 1024px: Article Header 361, Cover 512, Body 969, Detail Nav 72, Footer 806.
  - 2560px: Article Header 550, Cover 1280, Body 1210, Detail Nav 72, Footer 690.
- Experience detail responsive sync:
  - 390px: Hero 480, Meta 301, Content 2318, Footer 965. Meta is 5px above target because editable overview text naturally occupies 301px.
  - 1024px: Hero 576, Meta 244, Overview 261, Content 5075, Footer 806.
  - 2560px: Hero 1522, Meta 258, Overview 396, Content 12602, Footer 682.
- Verified forbidden direct text/font patterns, lint, and production build pass.

## Main motion reapply pass - 2026-07-23
- Reintroduced main-page motion without changing layout height:
  - Hero keeps image parallax and staged title reveal.
  - Intro now pins the content block inside the white section with `pinSpacing: false`, while only inner text/link layers move on the Y axis.
  - Experience project cards rise from below with staggered timing on both mobile and desktop canvases.
  - Studio, service grid, clients, and story sections use transform-only reveal motion.
- Motion implementation follows the current static-sync rule: no animated width/height/padding, no opacity fade-out for main copy, no layout-affecting pin spacing.
- Runtime check after motion:
  - 390px Home: body 9612, Hero 981, Intro 530, Experience 2681, Reel 420, Studio 957, Clients 1272, Story 1806, Footer 965, overflowX 0.
  - 1024px Home: body 9074, Hero 1777, Intro 677, Experience 1986, Reel 640, Studio 864, Clients 988, Story 1336, Footer 806, overflowX 0.
  - 2560px Home: body 11857, Hero 2508, Intro 883, Experience 3226, Reel 1280, Studio 1152, Clients 1109, Story 985, Footer 714, overflowX 0.
- Verified forbidden direct text/font patterns, lint, and production build pass.

## Component style ownership cleanup - 2026-07-23
- Confirmed shared components are the first owner of typography styles:
  - All component-level heading, paragraph, label, definition, and address text now uses a `display-*`, `heading-*`, `body-*`, `label-*`, or component-owned form type class.
  - Added the missing `label-sm` type class to the Header menu footer description.
- Removed duplicated typography overrides from the Home page-local style block; Home now relies on the global type utilities already applied in markup.
- Left page-local inline style only where it is motion-owned transform state, not typography or layout token ownership.
- Confirmed Korean route files are deleted in git status and only Instrument Sans regular/medium font files remain in `src/app/fonts`.
- Verified forbidden direct text/font patterns, lint, and production build pass.

## Home PC component-first grid correction - 2026-07-23
- Applied the latest Home PC correction at the shared component CSS layer first:
  - `ClientLogoGrid` now owns its 2560 desktop matrix row height through `.client-logo-grid--matrix`, not page-local padding.
  - The 7 × 4 client matrix now renders as `2368 × 353` with 88px rows, matching the current Figma desktop layout.
- Re-measured Home Desktop 2560 with reduced motion:
  - Hero 2508, Intro 883, Experience 3226, Reel 1280, Studio 1152, Clients 1109, Story 985, Footer 714.
  - Body height 11857, horizontal overflow 0, client logo grid 2368 × 353.
- Verified no direct text px, inline font sizing, `font-bold`, `font-semibold`, Pretendard, Noto Sans KR, Google Sans, or Korean font classes remain in `src`.
- Verified lint and production build pass.

## Home intro motion gate correction - 2026-07-23
- Corrected the Home Intro to Experience transition without changing static layout values:
  - During the Intro pin range, Experience is hidden at the motion layer so it no longer appears underneath the centered Intro copy.
  - Near the end of the Intro range, the Intro content moves upward and is hidden before Experience becomes visible.
  - The gate starts at the exact Hero to Intro boundary and releases at the Experience section boundary.
- Re-measured Home Desktop 2560 in both reduced and normal motion:
  - Body height 11857, horizontal overflow 0.
  - Hero 2508, Intro 883, Experience 3226, Reel 1280, Studio 1152, Clients 1109, Story 985, Footer 714.
- Rechecked subpage PC runtime stability in normal motion:
  - Experience list 3125, Experience detail 15532, Studio 9899, Story list 4294, Story detail 3890, Contact 3930.
  - All checked pages have horizontal overflow 0.
- Verified forbidden direct text/font patterns, lint, and production build pass.

## Responsive runtime QA correction - 2026-07-23
- Rechecked Home at 390px, 1024px, and 2560px in reduced and normal motion.
- Corrected Home tablet `How we work` section:
  - `ServiceCard` home-process tablet variant now owns compact card height, icon size, title type, and detail rhythm, preventing details from colliding with the CTA row.
  - Home tablet section layout now keeps the title below the sticky header while preserving compact section height.
- Home runtime after correction:
  - 390px: body 9612, Hero 981, Intro 530, Experience 2681, Reel 420, Studio 957, Clients 1272, Story 1806, Footer 965, overflowX 0.
  - 1024px: body 9063, Hero 1777, Intro 677, Experience 1972, Reel 640, Studio 867, Clients 988, Story 1336, Footer 806, overflowX 0.
  - 2560px: body 11857, Hero 2508, Intro 883, Experience 3226, Reel 1280, Studio 1152, Clients 1109, Story 985, Footer 714, overflowX 0.
- Rechecked responsive subpages at 390px and 1024px in reduced and normal motion:
  - Experience list, Experience detail, Studio, Story list, Story detail, and Contact all hold stable body heights with horizontal overflow 0.
- Hid the Next.js development overlay portal in local QA only, so visual screenshots are not contaminated by the red dev indicator.
- Verified forbidden direct text/font patterns, lint, and production build pass.
