"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/** A single delegated handler per region; never a global listener per card. */
export default function DepthRegion({ children }: { children: ReactNode }) {
  const previous = useRef<HTMLElement | null>(null);
  const reset = () => {
    previous.current?.style.removeProperty("--tilt-x");
    previous.current?.style.removeProperty("--tilt-y");
    previous.current = null;
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 700px) and (prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-depth]");
    if (target !== previous.current) reset();
    if (!target) return;
    previous.current = target;
    const bounds = target.getBoundingClientRect();
    target.style.setProperty("--tilt-x", `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 4}deg`);
    target.style.setProperty("--tilt-y", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 6}deg`);
  };
  return <div className="depth-region" onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
