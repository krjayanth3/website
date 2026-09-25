"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type FocusEvent } from "react";

/** One interaction model for desktop wheels and their mobile alternatives. */
export function useWheelInteraction() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const anchor = useRef<HTMLButtonElement | null>(null);
  const pinnedAnchor = useRef<HTMLButtonElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocus = useRef(false);
  const id = useId();
  const active = selected ?? hovered;
  const keepOpen = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const leave = useCallback(() => {
    keepOpen();
    timer.current = setTimeout(() => setHovered(null), 130);
  }, [keepOpen]);
  const close = useCallback((restoreFocus = true) => {
    keepOpen();
    setSelected(null);
    setHovered(null);
    const trigger = pinnedAnchor.current ?? anchor.current;
    pinnedAnchor.current = null;
    if (restoreFocus && trigger?.isConnected) {
      suppressFocus.current = true;
      trigger.focus({ preventScroll: true });
      suppressFocus.current = false;
    }
  }, [keepOpen]);
  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && active !== null) { event.preventDefault(); close(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [active, close]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const nodeProps = (index: number) => ({
    "aria-expanded": active === index,
    "aria-pressed": selected === index,
    "aria-controls": active === index ? id : undefined,
    "data-active": active === index,
    "data-pinned": selected === index,
    onPointerEnter(event: PointerEvent<HTMLButtonElement>) {
      if (event.pointerType !== "mouse") return;
      keepOpen();
      if (selected === null) anchor.current = event.currentTarget;
      setHovered(index);
    },
    onPointerLeave: leave,
    onFocus(event: FocusEvent<HTMLButtonElement>) {
      if (suppressFocus.current) return;
      keepOpen();
      if (selected === null) anchor.current = event.currentTarget;
      setHovered(index);
    },
    onBlur: leave,
    onClick(event: React.MouseEvent<HTMLButtonElement>) {
      keepOpen();
      if (selected === index) { close(false); return; }
      anchor.current = event.currentTarget;
      pinnedAnchor.current = event.currentTarget;
      setSelected(index);
      setHovered(null);
    },
    onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      if (event.key === "Tab" && !event.shiftKey && active === index) {
        const closeButton = card.current?.querySelector<HTMLButtonElement>("button");
        if (closeButton && closeButton.getClientRects().length > 0) { event.preventDefault(); keepOpen(); closeButton.focus(); }
        return;
      }
      const group = event.currentTarget.closest("[data-wheel-nodes]");
      const buttons = Array.from(group?.querySelectorAll<HTMLButtonElement>("button[data-active]") ?? []);
      const position = buttons.indexOf(event.currentTarget);
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 0;
      const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : direction ? (position + direction + buttons.length) % buttons.length : -1;
      if (next >= 0) { event.preventDefault(); buttons[next]?.focus(); }
    },
  });
  return { active, selected, id, anchor: selected === null ? anchor : pinnedAnchor, card, keepOpen, leave, close, nodeProps };
}
export type WheelInteraction = ReturnType<typeof useWheelInteraction>;
