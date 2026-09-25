"use client";

import { useEffect, useRef } from "react";
import type { SceneKind, createScene } from "./renderer";
import styles from "./three.module.css";

type Controller = ReturnType<typeof createScene>;

export default function SceneCanvas({ kind, count = 7, selected = null }: { kind: SceneKind; count?: number; selected?: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const selection = useRef(selected);
  useEffect(() => {
    selection.current = selected;
    controller.current?.select(selected);
  }, [selected]);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const constraints = window.matchMedia("(max-width: 699px), (prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    let cancelled = false;
    let loading = false;
    let near = false;
    let visible = false;
    const dispose = () => {
      const current = controller.current;
      controller.current = null;
      current?.dispose();
      delete host.dataset.ready;
    };
    const load = async () => {
      if (cancelled || loading || controller.current || !near || constraints.matches || device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 2)) return;
      loading = true;
      try {
        const { createScene } = await import("./renderer");
        if (cancelled || constraints.matches) return;
        controller.current = createScene(host, kind, count);
        controller.current.select(selection.current);
        controller.current.visibility(visible);
        host.dataset.ready = "true";
      } catch {
        dispose(); // The CSS fallback and all semantic content remain available.
      } finally {
        loading = false;
      }
    };
    const proximity = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; if (near) void load(); }, { rootMargin: "200px" });
    const viewport = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; controller.current?.visibility(visible); });
    const onConstraints = () => { if (constraints.matches) dispose(); else void load(); };
    const onContextLost = (event: Event) => { event.preventDefault(); dispose(); };
    host.addEventListener("webglcontextlost", onContextLost, true);
    constraints.addEventListener("change", onConstraints);
    proximity.observe(host);
    viewport.observe(host);
    return () => {
      cancelled = true;
      proximity.disconnect();
      viewport.disconnect();
      constraints.removeEventListener("change", onConstraints);
      host.removeEventListener("webglcontextlost", onContextLost, true);
      dispose();
    };
  }, [kind, count]);
  return <div ref={hostRef} className={styles.canvas} data-kind={kind} aria-hidden="true"><div className={styles.fallback}><span /><span /><i /></div></div>;
}
