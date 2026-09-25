# ABCX progressive 3D enhancement

Implemented on the existing Next.js 16.2.11 App Router / React 19.2 site. Tailwind, CSS modules, existing Framer Motion, content, routes, metadata, brand assets, navbar and footer are retained.

## Dependencies

- `three` 0.186: procedural WebGL geometry, materials, lighting and rendering.
- `@types/three` 0.186 (development only): TypeScript definitions.
- No React Three Fiber, Drei, additional animation library, downloaded models, textures or HDR environments were needed.

## New reusable files

- `app/three/renderer.ts`: shared procedural core, rings, nodes, selected connector, neutral/cool/gold lighting, capped resolution, lifecycle cleanup.
- `app/three/scene-canvas.tsx`: near-viewport dynamic import, visibility handling, device/motion constraints, context-loss fallback.
- `app/three/ecosystem.tsx`: reusable research/technology HTML controls and contextual panel over decorative geometry.
- `app/three/depth-region.tsx`: delegated local pointer handling for restrained card tilt.
- `app/three/three.module.css`: static fallback, hero, ecosystem, controls and responsive layouts.

## Modified files

`app/home-page.tsx`, `app/home-page.module.css`, `app/services-section.tsx`, `app/products-section.tsx`, `app/tech-at-abcx-page.tsx`, `app/sdlc-lifecycle.tsx`, `app/sdlc-lifecycle.module.css`, `app/site-frame.tsx`, `app/site-page-view.tsx`, `app/globals.css`, `package.json`, `package-lock.json`.

The workspace already contained extensive uncommitted website work. This update preserves that work; the list above identifies this enhancement's scope, rather than all files in git status.

## Page treatment

- **Home:** original heading, description and CTAs alongside a navy hexagonal engineering core, connected satellite nodes and gold orbital geometry. Slow local motion, modest pointer response and subtle scroll retreat/fade. Existing floating official technology logos remain. Home research/technology previews stay lightweight HTML; no additional preview WebGL contexts are created.
- **Services and products:** conventional semantic cards with local perspective tilt capped at roughly ±2°/±3°, 4px lift and restrained gold/shadow depth. Pointer behavior is disabled for touch, narrow screens and reduced motion.
- **Products/R&D:** ten existing research initiatives drive selectable HTML icon nodes and descriptions. Selection brings corresponding geometry forward, highlights its connector and retains the R&D disclaimer and full research cards.
- **Tech at ABCX:** eleven category nodes above the complete catalog. Selection reveals existing representative technology names. All 52 official technology links and their existing logos are retained. Catalog filter buttons now use the appropriate pressed-button group semantics.
- **SDLC:** seven original stages, 12° tilted real 3D ring, gold selected arc/connector, selected node depth, existing HTML stage labels and detail panel. No continuous lifecycle rotation. Arrow-key navigation selects stages; the mobile vertical timeline remains.
- **About, Blogs, Contact:** CSS atmosphere and existing HTML surface depth only. Contact links/forms remain conventional HTML. No WebGL added to these pages, the header, or footer.

## Accessibility and fallbacks

Canvas is decorative and aria-hidden. Important copy, headings, controls, links and detail panels remain HTML. Ecosystem controls support Tab, arrows, Home/End, Enter/Space, visible focus and pressed state. Detail panels announce changes politely. No focus trap.

At widths below 700px, reduced-motion preference, Save-Data, or reported device memory at/below 2GB, the renderer is not imported. The hero uses a CSS core, ecosystems use wrapping HTML buttons and SDLC uses the existing timeline. Desktop fallback also survives renderer initialization failure or context loss. Geometry is not required to understand or operate any page.

## Performance

- Shared dynamically imported renderer; loads within 200px of the viewport.
- Only the visible hero animates, capped around 30 rendered frames/second. Ecosystems and SDLC render on selection/resize/visibility changes, without persistent animation loops.
- DPR capped at 1.5. No realtime shadows, postprocessing, external textures, GLBs or HDR assets.
- Geometry/material reuse; animation cancellation, observer/listener removal, resource disposal and WebGL context release on cleanup.
- Final renderer/Three chunk measured around **548 KB raw / 134 KB gzip**. This is deferred rather than initial-route JavaScript; it is not a before/after total-site bundle comparison.

## Verification

- ESLint: passed.
- TypeScript `tsc --noEmit`: passed.
- Optimized Next.js production build: passed after integration and again after final styling adjustments.
- No formatter or automated test script is configured in this repository; no new formatter dependency was installed.
- Production Chrome checks at 1440, 1024, 768 and 390 CSS pixels, DPR 2: no document horizontal overflow on Home, Products or Tech.
- Desktop WebGL initialized on all four major visuals. The Home SDLC scene was not created until scrolling near it.
- Mobile and reduced-motion checks: zero WebGL canvases; all 52 official catalog links remained available.
- Tech selection updated its HTML detail panel.
- SDLC keyboard check: ArrowRight from Development focused and selected Integration, updating the HTML detail panel.
- Simulated WebGL context loss removed the hero canvas while retaining its heading and CSS fallback.
- Instrumented offscreen interval: zero WebGL draw calls. Visible hero sample: approximately 31 rendered frames/second, inferred from 12 indexed mesh draws per render.
- Measured initial layout shift: 0 in the sampled local Home run. Sampled JS heap: approximately 9.5 MB. These are local snapshots, not device-wide memory or benchmark guarantees.
- No uncaught runtime exceptions in the tested flows. Screenshots reviewed for desktop hero, research ecosystem, SDLC, tablet layout and mobile technology fallback.

## Limits

Responsive checks use Chrome device emulation, not physical tablets/phones. GPU utilization, thermal/power consumption, long-session memory trends, real-network load times and field Core Web Vitals were not measured. Local headless timing is not a guarantee for all hardware. Vendor destinations were preserved but not independently audited for availability. Existing background/header animations were retained and are outside the new renderer's draw-call measurements.

## Local preview

Production frontend: http://localhost:3100. Existing Django server started at 127.0.0.1:8000. The initial visual checks ran with the frontend content fallback because Django was stopped; after startup, the content API returned 200 and the existing About heading rendered successfully. No database migrations or content writes were performed. Home, Services, Products, Tech, About, Blogs and Contact returned HTTP 200.
