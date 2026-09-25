"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

import {
  themeColorMap,
  themeOptions,
  themeStorageKey,
} from "./landing-page-content";
import type { ThemePreference } from "./landing-page-content";

const themeChangeEvent = "abcx-theme-change";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function resolveTheme(preference: ThemePreference) {
  if (
    preference === "system" &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark" as const;
  }

  return preference === "system" ? ("light" as const) : preference;
}

function applyTheme(preference: ThemePreference) {
  if (typeof window === "undefined") {
    return;
  }

  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolvedTheme;
  window.localStorage.setItem(themeStorageKey, preference);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", themeColorMap[resolvedTheme]);
  }
}

function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return isThemePreference(storedTheme) ? storedTheme : "system";
}

function subscribeToThemePreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const syncTheme = () => {
    applyTheme(readThemePreference());
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== themeStorageKey) {
      return;
    }

    syncTheme();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(themeChangeEvent, syncTheme);
  mediaQuery.addEventListener("change", syncTheme);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(themeChangeEvent, syncTheme);
    mediaQuery.removeEventListener("change", syncTheme);
  };
}

export default function ThemeCycleButton() {
  const themePreference = useSyncExternalStore<ThemePreference>(
    subscribeToThemePreference,
    readThemePreference,
    () => "system"
  );
  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    applyTheme(themePreference);
  }, [themePreference]);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatusMessage(""), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const handleCycle = () => {
    const currentIndex = themeOptions.findIndex(
      (option) => option.value === themePreference
    );
    const nextOption = themeOptions[(currentIndex + 1) % themeOptions.length];

    applyTheme(nextOption.value);
    window.dispatchEvent(new Event(themeChangeEvent));
    setStatusMessage(`Theme: ${nextOption.label}`);
  };

  const stableThemePreference = hasHydrated ? themePreference : "system";
  const currentThemeLabel =
    themeOptions.find((option) => option.value === stableThemePreference)
      ?.label ??
    "System";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Change theme. Current setting ${currentThemeLabel}.`}
        className="flex items-center gap-2 rounded-full bg-[color:var(--surface-soft)] px-3 py-2 text-sm font-medium text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(16,24,38,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
        onClick={handleCycle}
      >
        <Image
          src="/theme-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
        <span className="hidden sm:inline">{currentThemeLabel}</span>
      </button>

      {statusMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute right-0 top-[calc(100%+0.5rem)] whitespace-nowrap text-[11px] font-semibold tracking-[0.12em] text-[color:var(--muted)]"
        >
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
