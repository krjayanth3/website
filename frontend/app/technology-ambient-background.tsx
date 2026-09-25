"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { memo, useEffect, useMemo, useSyncExternalStore } from "react";

import {
  getTechnologyConstellationPageKind,
  technologyConstellationCatalog,
  technologyConstellationDepthOrder,
  technologyConstellationPagePresets,
  type TechnologyConstellationDepth,
  type TechnologyConstellationGlow,
  type TechnologyConstellationItem,
  type TechnologyConstellationPageKind,
  type TechnologyConstellationViewportKind,
} from "./technology-constellation-data";

const technologyConstellationMap = new Map(
  technologyConstellationCatalog.map((technology) => [technology.slug, technology])
);

const viewportConstellationScale = {
  desktop: {
    size: 1,
    opacity: 1,
    blur: 1,
    movementX: 1,
    movementY: 1,
    rotation: 1,
  },
  tablet: {
    size: 0.88,
    opacity: 0.88,
    blur: 0.72,
    movementX: 0.72,
    movementY: 0.76,
    rotation: 0.78,
  },
  mobile: {
    size: 0.76,
    opacity: 0.76,
    blur: 0.2,
    movementX: 0,
    movementY: 0.52,
    rotation: 0.35,
  },
} as const satisfies Record<
  TechnologyConstellationViewportKind,
  {
    size: number;
    opacity: number;
    blur: number;
    movementX: number;
    movementY: number;
    rotation: number;
  }
>;

function resolveViewportKind(width: number): TechnologyConstellationViewportKind {
  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
}

function subscribeToViewport(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange, { passive: true });

  return () => {
    window.removeEventListener("resize", onStoreChange);
  };
}

function getViewportSnapshot() {
  return resolveViewportKind(window.innerWidth);
}

function useViewportKind() {
  return useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    () => "desktop" as TechnologyConstellationViewportKind
  );
}

function subscribeToFinePointer(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function useFinePointer() {
  return useSyncExternalStore(subscribeToFinePointer, getFinePointerSnapshot, () => false);
}

function subscribeToDocumentVisibility(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);

  return () => {
    document.removeEventListener("visibilitychange", onStoreChange);
  };
}

function getDocumentVisibilitySnapshot() {
  return document.visibilityState === "visible";
}

function useDocumentVisible() {
  return useSyncExternalStore(
    subscribeToDocumentVisibility,
    getDocumentVisibilitySnapshot,
    () => true
  );
}

function subscribeToOverlayState(onStoreChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(() => {
    onStoreChange();
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: ["data-header-overlay", "data-dialog-overlay"],
  });

  return () => {
    observer.disconnect();
  };
}

function getOverlayStateSnapshot() {
  const root = document.documentElement.dataset;
  return root.headerOverlay === "open" || root.dialogOverlay === "open";
}

function useOverlayMutedState() {
  return useSyncExternalStore(subscribeToOverlayState, getOverlayStateSnapshot, () => false);
}

function useSubtleParallax(enabled: boolean) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, {
    stiffness: 24,
    damping: 26,
    mass: 1.35,
  });
  const springY = useSpring(pointerY, {
    stiffness: 24,
    damping: 26,
    mass: 1.35,
  });

  useEffect(() => {
    if (!enabled) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    let frameId: number | null = null;
    let nextX = 0;
    let nextY = 0;

    const updatePointer = () => {
      pointerX.set(nextX);
      pointerY.set(nextY);
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextX = (event.clientX / window.innerWidth - 0.5) * 2;
      nextY = (event.clientY / window.innerHeight - 0.5) * 2;

      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updatePointer);
    };

    const resetPointer = () => {
      nextX = 0;
      nextY = 0;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updatePointer);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", resetPointer);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", resetPointer);
    };
  }, [enabled, pointerX, pointerY]);

  return { pointerX: springX, pointerY: springY };
}

function getVisibleCount(
  pageKind: TechnologyConstellationPageKind,
  viewportKind: TechnologyConstellationViewportKind
) {
  const preset = technologyConstellationPagePresets[pageKind];

  switch (viewportKind) {
    case "mobile":
      return preset.mobileCount;
    case "tablet":
      return preset.tabletCount;
    default:
      return preset.desktopCount;
  }
}

function getGlowColor(glow: TechnologyConstellationGlow) {
  switch (glow) {
    case "gold":
      return "rgba(255, 178, 74, 0.22)";
    case "blue":
      return "rgba(97, 218, 251, 0.18)";
    default:
      return "rgba(111, 215, 204, 0.18)";
  }
}

function getDepthGlowRadius(depth: TechnologyConstellationDepth) {
  switch (depth) {
    case "near":
      return 22;
    case "middle":
      return 16;
    default:
      return 10;
  }
}

type ResolvedConstellationLogo = TechnologyConstellationItem & {
  resolvedSize: number;
  resolvedOpacity: number;
  resolvedBlur: number;
  resolvedMovementX: number;
  resolvedMovementY: number;
  resolvedRotation: number;
  resolvedParallax: number;
};

function resolveConstellationLogos(
  pageKind: TechnologyConstellationPageKind,
  viewportKind: TechnologyConstellationViewportKind,
  isMuted: boolean
) {
  const preset = technologyConstellationPagePresets[pageKind];
  const viewportScale = viewportConstellationScale[viewportKind];
  const visibleCount = getVisibleCount(pageKind, viewportKind);
  const selectedSlugs = preset.slugs.slice(0, visibleCount);
  const overlayOpacityMultiplier = isMuted ? 0.38 : 1;

  return selectedSlugs
    .map((slug) => technologyConstellationMap.get(slug))
    .filter(
      (
        technology
      ): technology is TechnologyConstellationItem => Boolean(technology)
    )
    .map((technology) => ({
      ...technology,
      resolvedSize: Math.round(technology.size * viewportScale.size),
      resolvedOpacity:
        technology.opacity *
        viewportScale.opacity *
        preset.opacityMultiplier *
        overlayOpacityMultiplier,
      resolvedBlur: technology.blur * viewportScale.blur,
      resolvedMovementX: technology.movementX * viewportScale.movementX,
      resolvedMovementY: technology.movementY * viewportScale.movementY,
      resolvedRotation: technology.rotation * viewportScale.rotation,
      resolvedParallax:
        viewportKind === "desktop" ? technology.parallax : technology.parallax * 0.45,
    }));
}

function FloatingTechnologyLogo({
  logo,
  pointerX,
  pointerY,
  shouldAnimate,
}: {
  logo: ResolvedConstellationLogo;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  shouldAnimate: boolean;
}) {
  const offsetX = useTransform(pointerX, (value) => value * logo.resolvedParallax);
  const offsetY = useTransform(pointerY, (value) => value * logo.resolvedParallax);
  const glowRadius = getDepthGlowRadius(logo.depth);
  const glowColor = getGlowColor(logo.glow);
  const filterValue = `blur(${logo.resolvedBlur}px) drop-shadow(0 0 ${glowRadius}px ${glowColor})`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transform-gpu"
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
      }}
    >
      <m.div
        className="relative flex items-center justify-center"
        style={{
          width: logo.resolvedSize,
          height: logo.resolvedSize,
          x: offsetX,
          y: offsetY,
          opacity: logo.resolvedOpacity,
          filter: filterValue,
          willChange: "transform, opacity, filter",
        }}
      >
        <m.div
          className="flex h-full w-full items-center justify-center"
          animate={
            shouldAnimate
              ? {
                  x: [
                    0,
                    logo.resolvedMovementX,
                    0,
                    -logo.resolvedMovementX,
                    0,
                  ],
                  y: [
                    0,
                    logo.resolvedMovementY,
                    0,
                    -logo.resolvedMovementY,
                    0,
                  ],
                  rotate: [
                    0,
                    logo.resolvedRotation,
                    0,
                    -logo.resolvedRotation,
                    0,
                  ],
                }
              : undefined
          }
          transition={
            shouldAnimate
              ? {
                  duration: logo.duration,
                  delay: logo.delay,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
              : { duration: 0 }
          }
        >
          <logo.Icon
            aria-hidden="true"
            className={`h-full w-full ${logo.colorClass}`}
          />
        </m.div>
      </m.div>
    </div>
  );
}

function TechnologyLogoLayer({
  depth,
  logos,
  pointerX,
  pointerY,
  shouldAnimate,
}: {
  depth: TechnologyConstellationDepth;
  logos: ResolvedConstellationLogo[];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  shouldAnimate: boolean;
}) {
  const layerLogos = logos.filter((logo) => logo.depth === depth);

  if (layerLogos.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {layerLogos.map((logo) => (
        <FloatingTechnologyLogo
          key={logo.slug}
          logo={logo}
          pointerX={pointerX}
          pointerY={pointerY}
          shouldAnimate={shouldAnimate}
        />
      ))}
    </div>
  );
}

function TechnologyConstellation({ activeHref }: { activeHref?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const viewportKind = useViewportKind();
  const hasFinePointer = useFinePointer();
  const isDocumentVisible = useDocumentVisible();
  const isOverlayMuted = useOverlayMutedState();
  const pageKind = getTechnologyConstellationPageKind(activeHref);
  const parallaxEnabled =
    !prefersReducedMotion &&
    viewportKind === "desktop" &&
    hasFinePointer &&
    !isOverlayMuted;
  const shouldAnimate =
    !prefersReducedMotion && isDocumentVisible && !isOverlayMuted;
  const { pointerX, pointerY } = useSubtleParallax(parallaxEnabled);

  const constellationLogos = useMemo(
    () => resolveConstellationLogos(pageKind, viewportKind, isOverlayMuted),
    [isOverlayMuted, pageKind, viewportKind]
  );

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      animate={{ opacity: isOverlayMuted ? 0.42 : 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,var(--accent-soft),transparent_26%),radial-gradient(circle_at_86%_16%,var(--secondary-soft),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.03))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,var(--body-start),transparent_28%),radial-gradient(circle_at_50%_54%,var(--body-mid),transparent_36%),linear-gradient(90deg,rgba(0,0,0,0.04),transparent_14%,transparent_86%,rgba(0,0,0,0.04))]" />
      <div className="absolute inset-0">
        {technologyConstellationDepthOrder.map((depth) => (
          <TechnologyLogoLayer
            key={depth}
            depth={depth}
            logos={constellationLogos}
            pointerX={pointerX}
            pointerY={pointerY}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </m.div>
  );
}

export default memo(TechnologyConstellation);
