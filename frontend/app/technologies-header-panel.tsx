"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import {
  technologyDetailCategories,
  type TechnologyDetailCategory,
  type TechnologyDetail,
} from "./technologies-data";

const easeOut = [0.22, 1, 0.36, 1] as const;

function getTechnologyColumnCount(width: number) {
  if (width >= 1280) {
    return 4;
  }

  if (width >= 1024) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
}

function findFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.tabIndex !== -1 &&
      !element.getAttribute("aria-hidden")
  );
}

export function TechnologyDetailModal({
  technology,
  onClose,
  onNavigate,
  returnFocusRef,
}: {
  technology: TechnologyDetail | null;
  onClose: () => void;
  onNavigate?: () => void;
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  const handleNavigate = () => {
    returnFocusRef.current = null;
    onClose();
    onNavigate?.();
  };

  useEffect(() => {
    if (!technology) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    const root = document.documentElement;
    document.body.style.overflow = "hidden";
    root.dataset.dialogOverlay = "open";

    const focusDialog = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = findFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusDialog);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      delete root.dataset.dialogOverlay;
      returnFocusElement?.focus();
    };
  }, [onClose, returnFocusRef, technology]);

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {technology ? (
        <m.div
          className="fixed inset-0 z-[120] flex justify-center overflow-y-auto bg-[rgba(8,17,31,0.42)] p-2 backdrop-blur-md sm:items-center sm:p-6"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: easeOut }}
          onMouseDownCapture={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`technology-modal-title-${technology.id}`}
            aria-describedby={`technology-modal-description-${technology.id}`}
            className="relative my-auto flex h-[calc(100vh-1rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.9rem] bg-[color:var(--surface-strong)] shadow-[0_30px_80px_rgba(8,17,31,0.24)] sm:h-auto sm:max-h-[90vh]"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 14, scale: 0.985 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.985 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: easeOut }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-r ${technology.accentClass} opacity-80 blur-3xl`}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-[rgba(198,163,77,0.22)] px-5 py-5 sm:px-7">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.2rem] bg-[color:var(--surface-elevated)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <technology.Icon
                    aria-hidden="true"
                    className={`h-8 w-8 ${technology.colorClass}`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-[color:var(--secondary)]">
                    {technology.category}
                  </p>
                  <h2
                    id={`technology-modal-title-${technology.id}`}
                    className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[color:var(--foreground)] sm:text-4xl"
                  >
                    {technology.name}
                  </h2>
                  <p
                    id={`technology-modal-description-${technology.id}`}
                    className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base"
                  >
                    {technology.description}
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label={`Close ${technology.name} details`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--surface-soft)] text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <section className="space-y-8 lg:border-r lg:border-[var(--line)] lg:pr-8">
                  <div>
                    <p className="eyebrow text-[color:var(--secondary)]">
                      Related ABCX Service
                    </p>
                    <p className="mt-3 text-lg font-medium text-[color:var(--foreground)]">
                      {technology.relatedService}
                    </p>
                  </div>

                  <div>
                    <p className="eyebrow text-[color:var(--secondary)]">
                      Common Uses
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
                      {technology.useCases.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-[color:var(--secondary)]">
                      Main Advantages
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
                      {technology.advantages.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="eyebrow text-[color:var(--secondary)]">
                      Limitations
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
                      {technology.disadvantages.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c6a34d]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="eyebrow text-[color:var(--secondary)]">
                      Related Tools & Platforms
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {technology.relatedTools.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full bg-[color:var(--surface-soft)] px-3.5 py-2 text-sm font-medium text-[color:var(--foreground)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 border-t border-[rgba(198,163,77,0.22)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="text-sm leading-6 text-[color:var(--muted)]">
                Official website and related service links open in a new or current page as expected.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={technology.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Visit Official Website
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href={technology.relatedServiceHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={handleNavigate}
                >
                  View Related Service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    portalRoot
  );
}

export default function TechnologiesHeaderPanel({
  mode,
  onNavigate,
  onTechnologySelect,
}: {
  mode: "desktop" | "mobile";
  onNavigate?: () => void;
  onTechnologySelect?: (
    technologyId: string,
    triggerElement: HTMLElement | null
  ) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const viewportWidth = useSyncExternalStore(
    (onStoreChange) => {
      if (mode !== "desktop") {
        return () => {};
      }

      window.addEventListener("resize", onStoreChange);

      return () => {
        window.removeEventListener("resize", onStoreChange);
      };
    },
    () => (mode === "desktop" ? window.innerWidth : 0),
    () => 0
  );
  const columnCount = mode === "desktop" ? getTechnologyColumnCount(viewportWidth) : 1;

  const technologyColumns = useMemo(() => {
    const resolvedColumnCount = columnCount;
    const columns = Array.from({ length: resolvedColumnCount }, () => ({
      items: [] as TechnologyDetailCategory[],
      weight: 0,
    }));

    for (const category of technologyDetailCategories) {
      const categoryWeight = Math.ceil(category.items.length / 2) + 2;
      let targetColumn = columns[0];

      for (const column of columns) {
        if (column.weight < targetColumn.weight) {
          targetColumn = column;
        }
      }

      targetColumn.items.push(category);
      targetColumn.weight += categoryWeight;
    }

    return columns.map((column) => column.items).filter((items) => items.length > 0);
  }, [columnCount]);

  const handleTechnologiesPageClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/technologies" && !window.location.hash) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }

    onNavigate?.();
  };

  return (
    <div
      className={
        mode === "desktop"
          ? "relative isolate max-h-[min(70vh,40rem)] overflow-y-auto rounded-[1.8rem] border border-[var(--mega-menu-border)] bg-[color:var(--surface-strong)] p-5 shadow-[var(--mega-menu-shadow)] sm:p-6"
          : "relative isolate space-y-4 rounded-[1.6rem] border border-[var(--mega-menu-border)] bg-[color:var(--surface-strong)] p-4 shadow-[var(--mega-menu-shadow)]"
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--mega-menu-bg)]"
      />
      <div className="relative">
        <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-[color:var(--secondary)]">
              Technology Stack
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2rem]">
              Explore the technologies behind ABCX delivery.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Browse each category, open any technology for detailed context,
              and jump from the stack into the related service line.
            </p>
          </div>

          <Link
            href="/technologies"
            scroll
            className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--mega-menu-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[color:var(--foreground)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--mega-menu-cta-hover)]"
            onClick={handleTechnologiesPageClick}
          >
            See all technologies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className={
            mode === "desktop"
              ? "grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid gap-4"
          }
        >
          {technologyColumns.map((column, columnIndex) => (
            <div key={`technology-column-${columnIndex}`} className="space-y-4">
              {column.map((category) => (
                <section
                  key={category.title}
                  aria-labelledby={`tech-category-${category.title}`}
                  className="w-full rounded-[1.45rem] bg-[var(--mega-menu-card-bg)] p-4 shadow-[var(--mega-menu-card-shadow)]"
                >
                  <h3
                    id={`tech-category-${category.title}`}
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary)]"
                  >
                    {category.title}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {category.items.map((technology) => (
                      <m.button
                        key={technology.id}
                        type="button"
                        aria-label={`Open ${technology.name} details`}
                        className="group flex min-h-0 cursor-pointer items-center gap-3 rounded-[1rem] px-2 py-2 text-left text-[color:var(--foreground)] transition-[transform,background-color] duration-200 hover:bg-[var(--mega-menu-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.18, ease: easeOut }
                        }
                        onClick={(event) => {
                          onTechnologySelect?.(technology.id, event.currentTarget);
                          onNavigate?.();
                        }}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                          <technology.Icon
                            aria-hidden="true"
                            className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${technology.colorClass}`}
                          />
                        </span>
                        <span className="text-sm font-medium leading-5">
                          {technology.name}
                        </span>
                      </m.button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
