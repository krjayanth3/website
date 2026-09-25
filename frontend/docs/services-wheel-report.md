# Services wheel and R&D simplification

## Files modified

- `app/products-section.tsx`
- `app/services-section.tsx`
- `app/three/ecosystem.tsx`
- `app/three/three.module.css`
- `app/three/use-wheel-interaction.ts`
- `app/three/wheel-detail.tsx`
- `app/three/wheel-detail.module.css`

No dependencies or independent wheel interaction implementation were added.

## Products & R&D

Removed the entire repeated ten-category research card grid. Preserved the underlying research data, category names, icons and descriptions, the centered interactive wheel, the R&D notice, software-solution cards and CTA. The page now proceeds from the research introduction to the wheel and notice, then its existing CTA. No category or detail card is selected initially.

## Services

Replaced the nine-card listing on the Our Services page with the existing shared Ecosystem component. The existing heading and description remain. The wheel is generated from the unchanged `serviceCatalog`, preserving its nine descriptions and routes, with numbers 01–09 and matching Lucide icons. The center contains the official logo, OUR SERVICES, and Build • Scale • Secure • Transform.

The Services ring is decorative SVG; labels, buttons, descriptions and links are HTML. This avoids introducing another WebGL scene. The existing mobile alternatives and graphics for other ecosystem pages remain unchanged.

## Shared interaction and detail card

Reused `useWheelInteraction` and `WheelDetail`: focus/hover previews, 130ms delayed hover close, pointer transfer into the card, click/tap pins, pinned selection wins over hover, another node switches, same-node click toggles, close and Escape dismiss. Wheels remain centered because desktop detail cards render in a fixed portal rather than a layout column.

The shared card now accepts an optional internal Next.js Link. Keyboard Tab order reaches the close button and then Learn More; leaving the card returns to the normal page sequence. The hook's arrow navigation targets only node buttons so inline close buttons do not enter the wheel's arrow-key sequence.

Existing measured collision-aware positioning, a 20px viewport margin, side flipping/clamping and the decorative gold node-to-card connector are reused. Resize and scroll update placement. Reduced-motion behavior is retained.

## Mobile and accessibility

Below 700px Services displays the logo/label followed by nine stacked buttons. The active item's description, Learn More link and close control appear directly underneath. Only one item expands. The Services floating portal is hidden at this breakpoint. Mobile expansion may naturally move following rows; desktop overlays do not change document height.

Nodes retain button semantics, expanded/pressed states, focus outlines and controls relationships. Services adds descriptions referenced through `aria-describedby`. Service descriptions and relative route links are present in server-rendered HTML, including collapsed items; they are not canvas-only content. Official branding and all service detail pages remain unchanged.

## Validation

- ESLint: passed.
- TypeScript (`tsc --noEmit`): passed.
- Next.js production build: passed.
- No formatter or unit-test command is configured; no extra tools were installed.
- Chrome/CDP checks at 1920, 1440, 1280, 1024, 768, 430, 390 and 360px: all nine services present, clean default, no horizontal document overflow.
- All 45 desktop/tablet node-card combinations stayed within viewport margins without changing document height.
- All 27 mobile service expansions showed the correct description/link, with only one expanded item.
- Hover, node-to-card pointer handoff, preview close, pin priority, node switching, click toggle and close button passed.
- Focus preview, Enter and Space pinning, Escape, Tab to close and Tab to Learn More passed.
- Emulated touch pinning and reduced-motion interaction passed.
- All nine `/services/...` destinations returned HTTP 200. Every service Learn More target matched its existing relative route; none contains a localhost URL.
- Products retained ten R&D wheel nodes and only its two existing software-solution articles, confirming the repeated research articles were removed.
- No uncaught browser exceptions in tested flows. Desktop and mobile screenshots reviewed.

Responsive and touch checks used Chrome emulation, not physical devices. No separate screen-reader or cross-browser audit is claimed.
