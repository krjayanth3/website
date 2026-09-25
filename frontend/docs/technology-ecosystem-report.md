# Tech at ABCX category panels

## Files

Modified: `app/tech-at-abcx-page.tsx`, `app/three/ecosystem.tsx`, `app/three/three.module.css`, `app/three/wheel-detail.tsx`, `app/three/wheel-detail.module.css`.

Created: `app/three/technology-list.tsx`, `app/three/technology-list.module.css`.

## Data and layout

The unchanged `app/technologies-data.ts` remains the sole technology data source. All 11 existing categories and 52 technologies are retained. The existing centered category wheel now has numbers 01–11 and opens actual technology lists instead of representative-name text. The hub uses the official ABCX logo, TECHNOLOGY / ECOSYSTEM, and a small Engineering • Cloud • Data • AI line.

Removed the old All/category filter bar, its filter state, and the large individual-card catalog presentation. Kept the page hero, trademark/non-affiliation statement, security practices, engineering approach/principles and CTAs. No unrelated page content, routes, navbar or footer were changed.

## Panels and interaction

Extended the existing Ecosystem and WheelDetail components with optional panel content and a larger panel variant. The same `useWheelInteraction` remains responsible for focus/hover preview, delayed pointer-leave closing, click/tap pinning, selected-node toggling, category switching, close and Escape. No default category or panel is active.

TechnologyList renders compact two-column semantic lists. Each entry contains its existing official Icon component, original color class, full technology name and an official-site anchor. Logos keep square contain-style bounds without modifying their SVG viewBox. URLs are taken directly from each technology's original href; `_blank` and `noopener noreferrer` are preserved. No partner claims were introduced.

Desktop panels float through the existing portal, with decorative gold connectors and measured placement/flipping/clamping inside a 20px viewport margin. The larger variant has bounded height, internal scrolling when necessary and a sticky top row containing the close control. Opening panels does not reserve columns or move the centered wheel.

## Mobile and accessibility

Below 700px, the existing compact category-button layout remains. The selected category's compact technology list appears below it, with a close button. The floating desktop panel is hidden at this breakpoint. There is no All state showing the full catalog. Mobile content expansion follows the requested document-flow layout; desktop overlay opening leaves document height unchanged.

Category buttons retain expanded/pressed states, focus indicators, arrow/Home/End navigation, native Enter/Space activation and Escape dismissal. Official links remain ordinary anchors and are reachable through Tab after the close button. Panel content is HTML rather than WebGL text. The static page hero remains available before selection. Reduced-motion behavior is retained.

## Validation

- ESLint: passed.
- TypeScript (`tsc --noEmit`): passed.
- Next.js production build: passed.
- No formatter or unit-test command is configured; no new dependencies installed.
- Automated Chrome/CDP checks at 1920, 1440, 1280, 1024, 768, 430, 390 and 360px passed.
- Each viewport exposed all 11 categories with no default panel and no old filter bar or giant grid.
- Across all categories at every width, all 52 technology names and hrefs matched the existing data source; every entry retained an SVG logo, `_blank`, and safe rel attributes.
- Desktop panels remained within the viewport and did not alter document height. No horizontal document overflow was detected.
- The nine-item Backend list triggered internal panel scrolling as intended.
- Hover preview, pointer transfer to panel, leave-to-close, pin priority, click toggle, switching, close, Enter/Space, Escape and keyboard focus on an official link passed.
- Emulated touch selection and reduced-motion interaction passed.
- No uncaught browser exceptions in the tested flows. Desktop and mobile screenshots reviewed.

Testing used Chrome emulation rather than physical devices. External vendor websites were not navigated during verification; their preserved hrefs were compared against the original data instead.
