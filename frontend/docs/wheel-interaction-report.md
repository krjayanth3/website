# Wheel interaction refinement

## Files

Created:
- `app/three/use-wheel-interaction.ts`
- `app/three/wheel-detail.tsx`
- `app/three/wheel-detail.module.css`

Updated:
- `app/three/ecosystem.tsx`
- `app/three/scene-canvas.tsx`
- `app/three/renderer.ts`
- `app/three/three.module.css`
- `app/sdlc-lifecycle.tsx`
- `app/sdlc-lifecycle.module.css`

## Shared behavior

Products/R&D and Tech reuse their existing ecosystem component. That component and the existing SDLC component now share `useWheelInteraction` and `WheelDetail`.

The initial selected and hovered nodes are null. The renderer accepts null and removes active node/connector styling. Wheel containers use centered block layouts and auto horizontal margins; the old detail columns are no longer used. The detail portal does not occupy document layout space.

Hover or focus previews a node. A 130ms delayed close lets the pointer travel into the card; entering or focusing the card cancels that delay. Click/tap pins or toggles the node. A pinned selection has priority over hover, and clicking another node switches it. Close and Escape clear selection and preview. The close button returns focus to the triggering node without reopening its preview. Tab can move from the node to the close button and back to the normal page sequence; tabbing away does not dismiss a pinned card.

Nodes expose expanded/pressed states and a controls relationship to the open card. Focus outlines, a pinned marker or stage underline, and the card pin icon provide non-color state indicators. Arrow keys and Home/End move between nodes. Enter/Space use native button activation.

## Contextual positioning and connector

The detail component measures the active node and rendered card. It prefers the node's side, flips if space is insufficient, then considers placement above/below and clamps to a 20px viewport margin. It recalculates on scroll, resize, visual-viewport changes and element resizing. A thin decorative fixed SVG path joins the active node to the nearest card edge. The connector and card render above page content through a portal, avoiding clipping by page containers.

Tablet retains the circle and uses the same collision checks. Below 700px, details use a compact nonmodal bottom sheet with a close button and internal scrolling. Existing ecosystem mobile buttons and SDLC timeline remain. Card and node animation is disabled for reduced motion; the existing renderer fallback also remains active.

## Lifecycle center

Removed the visible `SDLC` acronym completely from the hub. The official logo is followed by exactly two explicit title lines: `Software Development` and `Lifecycle`, then `Plan • Build • Deliver • Improve`. The full title occurs once inside the hub. The navy surface, gold outline, outer ring and shadow were restored as explicitly requested by this brief. R&D and Tech logo centers retain their existing background-free appearance.

All seven stage names, numbers, icons, ordering, orbital positions, arrows and ring geometry remain. R&D categories, Tech catalog data, all 52 official website links and existing vendor logos are unchanged. Navbar, footer, routes and unrelated content were not modified.

## Validation

- ESLint: passed.
- TypeScript (`tsc --noEmit`): passed.
- Final Next.js production build: passed.
- No formatter or unit-test command is configured; no additional tooling/dependencies installed.
- Automated Chrome/CDP browser checks covered 1920, 1440, 1280, 1024, 768, 430, 390 and 360px widths for all three wheels (24 route/viewport combinations).
- Every node was opened at each width: 224 node/card checks. No card escaped the viewport margin and document height did not change when opening/switching cards. No horizontal document overflow was detected.
- All combinations loaded with no detail card or pressed node. Ecosystem centering was measured; SDLC centering and its two-line center title were visually reviewed.
- Mouse preview, node-to-card handoff, delayed close, click toggle, switching, pin priority and close-button behavior passed.
- Focus preview, native Enter pin, Escape close, Tab-to-close-button and onward navigation passed. Pinned state survived tabbing away.
- Emulated touch pinning and reduced-motion interaction passed.
- The complete Tech catalog still contained 52 official links.
- No uncaught browser exceptions in the tested flows.

Tests used Chrome emulation rather than physical devices. Desktop R&D and SDLC screenshots were reviewed. There is no claim of a separate screen-reader audit or cross-browser/device-lab certification.

Preview refreshed at http://localhost:3101.
