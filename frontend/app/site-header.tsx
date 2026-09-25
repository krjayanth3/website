"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  themeColorMap,
  themeOptions,
  themeStorageKey,
} from "./landing-page-content";
import {
  siteHeaderNavigationItems,
} from "./site-routes";
import type { LandingPageContent, ThemePreference } from "./landing-page-content";

const easeOut = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 220, damping: 24 } as const;
const themeChangeEvent = "abcx-theme-change";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return isThemePreference(storedTheme) ? storedTheme : "system";
}

function resolveThemePreference(
  preference: ThemePreference
): "light" | "dark" {
  if (typeof window === "undefined") {
    return preference === "dark" ? "dark" : "light";
  }

  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return preference;
}

export default function SiteHeader({
  content,
  activeHref,
}: {
  content: LandingPageContent;
  activeHref?: string;
}) {
  const pathname = usePathname();
  const currentHref = pathname ?? activeHref;
  const isCompanyPage = activeHref === "/company" || pathname === "/";
  const prefersReducedMotion = useReducedMotion();
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const displayedThemePreference = themePreference;
  const displayedResolvedTheme = resolvedTheme;
  const ThemeModeIcon =
    displayedThemePreference === "light"
      ? Sun
      : displayedThemePreference === "dark"
        ? Moon
        : Monitor;

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const consultationLinkClassName =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[#0b1320]! shadow-[0_8px_24px_rgba(149,112,35,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]";

  const closeMobileMenu = () => setShowMobileMenu(false);

  const handleThemeCycle = () => {
    const themeCycleOrder = themeOptions.map((option) => option.value);
    const currentIndex = themeCycleOrder.indexOf(themePreference);
    const nextThemePreference =
      themeCycleOrder[(currentIndex + 1) % themeCycleOrder.length];

    setThemePreference(nextThemePreference);
    setResolvedTheme(resolveThemePreference(nextThemePreference));
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncThemeState = () => {
      const nextThemePreference = readThemePreference();
      setThemePreference(nextThemePreference);
      setResolvedTheme(resolveThemePreference(nextThemePreference));
    };

    syncThemeState();
    mediaQuery.addEventListener("change", syncThemeState);
    window.addEventListener("storage", syncThemeState);
    window.addEventListener(themeChangeEvent, syncThemeState);

    return () => {
      mediaQuery.removeEventListener("change", syncThemeState);
      window.removeEventListener("storage", syncThemeState);
      window.removeEventListener(themeChangeEvent, syncThemeState);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = themePreference;
    root.style.colorScheme = resolvedTheme;
    window.localStorage.setItem(themeStorageKey, themePreference);

    if (themeMeta instanceof HTMLMetaElement) {
      themeMeta.content = themeColorMap[resolvedTheme];
    }

    window.dispatchEvent(new Event(themeChangeEvent));
  }, [resolvedTheme, themePreference]);

  useEffect(() => {
    const syncHeaderScrollState = () => {
      setIsHeaderScrolled(window.scrollY > 14);
    };

    syncHeaderScrollState();
    window.addEventListener("scroll", syncHeaderScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncHeaderScrollState);
    };
  }, []);

  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShowMobileMenu(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!showMobileMenu) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !mobileMenuRef.current?.contains(target) &&
        !mobileMenuButtonRef.current?.contains(target)
      ) {
        closeMobileMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMobileMenu]);

  const themeToggleButton = (
    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center">
      <button
        type="button"
        aria-label={`Change theme. Current setting ${
          content.display.themeModes[displayedThemePreference]
        }.`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-85"
        onDragStart={(event) => event.preventDefault()}
        onClick={() => {
          closeMobileMenu();
          handleThemeCycle();
        }}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center drop-shadow-[0_1px_2px_rgba(8,17,31,0.18)] ${
            displayedThemePreference === "light"
              ? "text-[#f59e0b]"
              : displayedThemePreference === "dark"
                ? "text-[#7dd3fc]"
                : displayedResolvedTheme === "dark"
                  ? "text-[#d7e6ff]"
                  : "text-[#334155]"
          }`}
        >
          <ThemeModeIcon className="h-5 w-5" strokeWidth={2} />
        </span>
      </button>
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className="sticky top-0 z-50 w-full py-1 sm:py-1.5"
        initial={false}
      >
        <m.div
          className={`relative flex items-center justify-between gap-x-6 rounded-[1.75rem] px-4 py-2.5 sm:px-5 ${
            isCompanyPage ? "md:min-h-[88px]" : ""
          }`}
          animate={prefersReducedMotion ? undefined : { y: isHeaderScrolled ? 0 : -1 }}
          transition={prefersReducedMotion ? { duration: 0 } : spring}
          style={{
            backdropFilter: isHeaderScrolled ? "blur(18px)" : "blur(0px)",
            WebkitBackdropFilter: isHeaderScrolled ? "blur(18px)" : "blur(0px)",
            background: isHeaderScrolled
              ? resolvedTheme === "dark"
                ? "linear-gradient(135deg, rgba(11,19,32,0.94), rgba(18,33,52,0.9))"
                : "linear-gradient(135deg, rgba(248,250,252,0.94), rgba(237,242,247,0.9))"
              : "transparent",
            boxShadow: isHeaderScrolled
              ? resolvedTheme === "dark"
                ? "0 18px 40px rgba(3,10,22,0.28)"
                : "0 18px 40px rgba(15,23,42,0.08)"
              : "none",
          }}
        >
          <Link
            href="/"
            aria-label={content.companyName}
            className="shrink-0 pl-1 sm:pl-2"
            onClick={closeMobileMenu}
          >
            <m.span
              className="block"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={spring}
            >
              <Image
                src="/abcx-logo-trimmed.png"
                alt="ABCX logo"
                width={53}
                height={61}
                priority
                draggable={false}
                className="h-14 w-auto object-contain sm:h-[61px]"
              />
            </m.span>
          </Link>

          <div className="ml-auto flex h-11 shrink-0 items-center gap-3 text-[color:var(--foreground)]">
            <nav
              aria-label="Main navigation"
              className="hidden min-w-0 items-center gap-2 lg:flex xl:gap-3"
            >
              {siteHeaderNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.href === currentHref ? "page" : undefined}
                  className={
                    item.kind === "cta"
                      ? consultationLinkClassName
                      : `relative whitespace-nowrap rounded-full px-2.5 py-2 text-[15px] font-semibold tracking-[-0.015em] transition-colors duration-200 hover:text-[var(--accent)]! ${
                          item.href === currentHref
                            ? "text-[var(--accent)]!"
                            : isCompanyPage
                              ? resolvedTheme === "dark"
                                ? "text-white/88!"
                                : "text-black!"
                              : resolvedTheme === "dark"
                                ? "text-[#b8c5d5]!"
                                : "text-[#34445a]!"
                        }`
                  }
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              ref={mobileMenuButtonRef}
              type="button"
              aria-expanded={showMobileMenu}
              aria-controls="header-mobile-menu"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              className={`flex items-center rounded-full p-2 transition-colors duration-200 lg:hidden ${
                resolvedTheme === "dark"
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/5"
              }`}
              onClick={() => setShowMobileMenu((current) => !current)}
            >
              {showMobileMenu ? (
                <X className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )}
            </button>

            {themeToggleButton}
          </div>
        </m.div>

        <AnimatePresence>
          {showMobileMenu ? (
            <m.div
              ref={mobileMenuRef}
              id="header-mobile-menu"
              className="mt-2 overflow-hidden rounded-[1.7rem] border border-[var(--line)] bg-[color:var(--surface-strong)] shadow-[0_20px_50px_rgba(15,30,50,0.15)] backdrop-blur-2xl lg:hidden"
              initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: easeOut }}
            >
              <nav
                aria-label="Mobile navigation"
                className="max-h-[78vh] space-y-2 overflow-y-auto p-4"
              >
                {siteHeaderNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === currentHref ? "page" : undefined}
                    className={
                      item.kind === "cta"
                        ? `${consultationLinkClassName} w-full py-3`
                        : `block rounded-[1rem] bg-[color:var(--surface-soft)] px-4 py-3 text-[15px] font-semibold tracking-[-0.01em] text-[color:var(--foreground)]! transition-colors hover:text-[var(--accent)]! ${
                            item.href === currentHref ? "text-[var(--accent)]! ring-1 ring-[var(--accent)]" : ""
                          }`
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </m.div>
          ) : null}
        </AnimatePresence>
      </m.header>
    </LazyMotion>
  );
}
