"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import type { LandingPageContent } from "./landing-page-content";
import {
  sitePageMetadata,
  type SitePageSlug,
} from "./site-routes";
import TechnologiesHeaderPanel from "./technologies-header-panel";

type NavigationPanelMode = "desktop" | "mobile";

type NavigationPanelItem = {
  label: string;
  href: string;
};

type NavigationPanelSection = {
  title: string;
  items: NavigationPanelItem[];
};

type NavigationPanelConfig = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  sections: NavigationPanelSection[];
};

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function limitedItems(items: string[], limit = 6) {
  return uniqueItems(items).slice(0, limit);
}

function linkItems(items: string[], href: string, limit = 6): NavigationPanelItem[] {
  return limitedItems(items, limit).map((item) => ({
    label: item,
    href,
  }));
}

function getNavigationPanelConfig(
  href: string,
  content: LandingPageContent
): NavigationPanelConfig {
  const slug = href.replace("/", "") as SitePageSlug;
  const metadata = sitePageMetadata[slug];

  switch (href) {
    case "/company":
      return {
        eyebrow: content.aboutSection.eyebrow || metadata.title,
        title: content.aboutSection.title || metadata.title,
        description: content.aboutSection.description || metadata.description,
        ctaLabel: "View company page",
        sections: [
          {
            title: "Purpose",
            items: linkItems(
              [
                content.aboutSection.purpose.title,
                ...limitedItems(
                  content.aboutSection.principles.map((principle) => principle.title),
                  2
                ),
              ],
              href,
              3
            ),
          },
          {
            title: "Values",
            items: linkItems(
              content.aboutSection.principles.map((principle) => principle.title),
              href,
              6
            ),
          },
          {
            title: "Our People",
            items: linkItems(content.aboutSection.people.items, href, 6),
          },
        ],
      };
    case "/services":
      return {
        eyebrow: content.servicesSection.eyebrow || metadata.title,
        title: content.servicesSection.title || metadata.title,
        description: content.servicesSection.description || metadata.description,
        ctaLabel: "Explore services",
        sections: [
          {
            title: "Categories",
            items: linkItems(
              content.servicesSection.items.map((category) => category.title),
              href,
              8
            ),
          },
          {
            title: "Featured",
            items: linkItems(content.servicesSection.featuredTitles, href, 6),
          },
          {
            title: "Capabilities",
            items: linkItems(
              content.servicesSection.items.flatMap((category) => category.services),
              href,
              8
            ),
          },
        ],
      };
    case "/solutions":
      return {
        eyebrow: metadata.title,
        title: "Delivery solutions structured around real operating pressure.",
        description:
          "Move from direction to release with clearer sequencing, grounded decisions, and fewer execution surprises.",
        ctaLabel: "See solutions",
        sections: [
          {
            title: "Cadence",
            items: linkItems(
              content.delivery.cadence.map(
                (phase) => `${phase.phase} · ${phase.title}`
              ),
              href,
              6
            ),
          },
          {
            title: "Featured Work",
            items: linkItems(
              content.workSection.samples.map((sample) => sample.title),
              href,
              6
            ),
          },
          {
            title: "Work Types",
            items: linkItems(
              content.workSection.samples.map((sample) => sample.label),
              href,
              6
            ),
          },
        ],
      };
    case "/industries":
      return {
        eyebrow: metadata.title,
        title: "Software delivery tailored to industry context.",
        description:
          "We adapt product, data, automation, and platform priorities to the operating realities of each sector.",
        ctaLabel: "Browse industries",
        sections: [
          {
            title: "Sectors",
            items: linkItems(
              content.industryCatalog.map((industry) => industry.title),
              href,
              10
            ),
          },
          {
            title: "Example Focus Areas",
            items: linkItems(
              content.industryCatalog.flatMap((industry) => industry.services),
              href,
              8
            ),
          },
        ],
      };
    case "/insights":
      return {
        eyebrow: content.processSection.eyebrow || metadata.title,
        title: content.workingStyle.title || metadata.title,
        description: content.workingStyle.description || metadata.description,
        ctaLabel: "Read insights",
        sections: [
          {
            title: "Process",
            items: linkItems(
              content.processSection.steps.map(
                (step) => `${step.step} · ${step.summary}`
              ),
              href,
              6
            ),
          },
          {
            title: "Delivery Cadence",
            items: linkItems(
              content.delivery.cadence.map((phase) => phase.title),
              href,
              6
            ),
          },
        ],
      };
    case "/careers":
      return {
        eyebrow: content.careersSection.eyebrow || metadata.title,
        title: content.careersSection.title || metadata.title,
        description: content.careersSection.description || metadata.description,
        ctaLabel: "Explore careers",
        sections: [
          {
            title: content.careersSection.rolesTitle || "Roles",
            items: linkItems(content.careersSection.roles, href, 6),
          },
          {
            title: "What We Value",
            items: linkItems(
              content.aboutSection.principles.map((principle) => principle.title),
              href,
              6
            ),
          },
          {
            title: "How We Work",
            items: linkItems(content.aboutSection.people.items, href, 6),
          },
        ],
      };
    case "/contact":
      return {
        eyebrow: content.contactSection.eyebrow || metadata.title,
        title: content.contactSection.title || metadata.title,
        description: content.contactSection.description || metadata.description,
        ctaLabel: "Open contact page",
        sections: [
          {
            title: "Start Here",
            items: linkItems(
              [
                "Project brief",
                "Delivery bottleneck",
                "Timeline and scope",
                "Capability gap",
              ],
              href,
              4
            ),
          },
          {
            title: "Direct Contact",
            items: linkItems([content.contactEmail, content.contactPhone], href, 2),
          },
        ],
      };
    case "/technologies":
      return {
        eyebrow: metadata.title,
        title: metadata.title,
        description: metadata.description,
        ctaLabel: "See all technologies",
        sections: [],
      };
    default:
      return {
        eyebrow: metadata.title,
        title: metadata.title,
        description: metadata.description,
        ctaLabel: `Open ${metadata.title}`,
        sections: [],
      };
  }
}

export default function NavigationHeaderPanel({
  href,
  mode,
  content,
  onNavigate,
  onTechnologySelect,
}: {
  href: string;
  mode: NavigationPanelMode;
  content: LandingPageContent;
  onNavigate?: () => void;
  onTechnologySelect?: (
    technologyId: string,
    triggerElement: HTMLElement | null
  ) => void;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handlePageLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === href && !window.location.hash) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }

    onNavigate?.();
  };

  if (href === "/technologies") {
    return (
      <TechnologiesHeaderPanel
        mode={mode}
        onNavigate={onNavigate}
        onTechnologySelect={onTechnologySelect}
      />
    );
  }

  const panel = getNavigationPanelConfig(href, content);
  const desktopGridClass =
    panel.sections.length >= 3 ? "xl:grid-cols-3" : "xl:grid-cols-2";

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
              {panel.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2rem]">
              {panel.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {panel.description}
            </p>
          </div>

          <Link
            href={href}
            scroll
            className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--mega-menu-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[color:var(--foreground)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--mega-menu-cta-hover)]"
            onClick={(event) => handlePageLinkClick(event, href)}
          >
            {panel.ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className={
            mode === "desktop"
              ? `grid items-start gap-4 md:grid-cols-2 ${desktopGridClass}`
              : "grid gap-4"
          }
        >
          {panel.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.45rem] bg-[var(--mega-menu-card-bg)] p-4 shadow-[var(--mega-menu-card-shadow)]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--secondary)]">
                {section.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={`${section.title}-${item.label}`}>
                    <Link
                      href={item.href}
                      scroll
                      className="flex items-start gap-3 rounded-[1rem] px-2 py-1.5 text-sm leading-6 text-[color:var(--foreground)] transition-colors duration-200 hover:bg-[var(--mega-menu-hover)]"
                      onClick={(event) =>
                        handlePageLinkClick(event, item.href)
                      }
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
