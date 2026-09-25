"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Pin, X } from "lucide-react";
import type { WheelInteraction } from "./use-wheel-interaction";
import styles from "./wheel-detail.module.css";

export default function WheelDetail({ interaction, title, eyebrow, statement, description, icon, href, inlineOnMobile = false, children, large = false }: {
  interaction: WheelInteraction; title: string; eyebrow: string; statement?: string; description: string; icon: ReactNode; href?: string; inlineOnMobile?: boolean; children?: ReactNode; large?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const connector = useRef<SVGPathElement>(null);
  const { active, anchor, card: cardRef, selected, id, keepOpen, leave, close } = interaction;
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const node = anchor.current;
    if (!panel || !node || active === null) return;
    let frame = 0;
    const place = () => {
      const rect = node.getBoundingClientRect();
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const margin = 20;
      const gap = 20;
      const viewport = window.visualViewport;
      const vw = viewport?.width ?? window.innerWidth;
      const vh = viewport?.height ?? window.innerHeight;
      const ox = viewport?.offsetLeft ?? 0;
      const oy = viewport?.offsetTop ?? 0;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let left: number;
      let top: number;
      if (vw < 700) {
        left = ox + margin;
        top = oy + vh - height - margin;
      } else {
        const preferRight = cx >= window.innerWidth / 2;
        const right = rect.right + gap;
        const leftSide = rect.left - width - gap;
        const fitsRight = right + width <= ox + vw - margin;
        const fitsLeft = leftSide >= ox + margin;
        if ((preferRight && fitsRight) || !fitsLeft && fitsRight) left = right;
        else if (fitsLeft) left = leftSide;
        else left = cx + gap;
        top = cy - height / 2;
        if (!fitsRight && !fitsLeft) top = rect.bottom + gap + height <= oy + vh - margin ? rect.bottom + gap : rect.top - height - gap;
      }
      left = Math.max(ox + margin, Math.min(left, ox + vw - width - margin));
      top = Math.max(oy + margin, Math.min(top, oy + vh - height - margin));
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      panel.style.visibility = "visible";
      const ex = Math.max(left, Math.min(cx, left + width));
      const ey = Math.max(top, Math.min(cy, top + height));
      connector.current?.setAttribute("d", `M ${cx} ${cy} L ${(cx + ex) / 2} ${ey} L ${ex} ${ey}`);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(place); };
    const resize = new ResizeObserver(schedule);
    resize.observe(panel);
    resize.observe(node);
    place();
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
    };
  }, [active, anchor, cardRef, title]);
  if (active === null || typeof document === "undefined") return null;
  return createPortal(<>
    <svg className={styles.connector} data-mobile-inline={inlineOnMobile} aria-hidden="true"><path ref={connector} /></svg>
    <div ref={(element) => { panelRef.current = element; cardRef.current = element; }} id={id} data-mobile-inline={inlineOnMobile} role="region" aria-label={`${title} details`} className={`${styles.card} ${large ? styles.large : ""}`} onPointerEnter={keepOpen} onPointerLeave={leave} onFocus={keepOpen} onBlur={leave} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const inside = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? []);
      const position = inside.indexOf(document.activeElement as HTMLElement);
      if ((!event.shiftKey && position < inside.length - 1) || (event.shiftKey && position > 0)) return;
      const node = anchor.current;
      if (!node) return;
      const focusable = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex="0"]'))
        .filter((element) => element.getClientRects().length > 0 && !panelRef.current?.contains(element) && !element.hasAttribute("disabled"));
      const target = event.shiftKey ? node : focusable[focusable.indexOf(node) + 1];
      if (target) { event.preventDefault(); target.focus(); }

    }}>
      <div className={styles.top}><span className={styles.icon}>{icon}</span><span className={styles.eyebrow}>{eyebrow}</span>{selected !== null && <Pin size={14} aria-label="Pinned" />}<button type="button" aria-label="Close details" onClick={() => close()}><X size={18} aria-hidden="true" /></button></div>
      <div key={title} className={styles.content} aria-live="polite" aria-atomic="true"><h3>{title}</h3>{statement && <p className={styles.statement}>{statement}</p>}<p>{description}</p>{children}{href && <Link href={href} className={styles.more} aria-label={`Learn more about ${title}`}>Learn More <ArrowRight size={16} aria-hidden="true" /></Link>}</div>
    </div>
  </>, document.body);
}
