"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Layers3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  homepageIndustryDescriptions,
  homepageIndustryIconMap,
  homepageServiceIconMap,
  homepageWhyAbcxItems,
} from "./homepage-config";
import {
  FeaturedWorkVisual,
  HomepageHeroMedia,
} from "./homepage-visuals";
import {
  emptyLandingPageContent,
  type LandingPageContent,
  type SocialPlatform,
} from "./landing-page-content";
import SiteFrame from "./site-frame";
import { siteNavigationItems } from "./site-routes";
import TechnologiesSection from "./technologies-section";
import { technologyCatalog } from "./technologies-data";

const easeOut = [0.22, 1, 0.36, 1] as const;
const loopEase = [0.37, 0, 0.63, 1] as const;
const spring = { type: "spring", stiffness: 220, damping: 24 } as const;
const viewport = { once: true, amount: 0.18 } as const;
const heroParticlePositions = [
  { left: "8%", top: "16%", size: "h-2 w-2", delay: 0 },
  { left: "18%", top: "70%", size: "h-1.5 w-1.5", delay: 0.4 },
  { left: "32%", top: "24%", size: "h-1.5 w-1.5", delay: 0.9 },
  { left: "48%", top: "78%", size: "h-2 w-2", delay: 1.3 },
  { left: "64%", top: "14%", size: "h-1.5 w-1.5", delay: 0.7 },
  { left: "78%", top: "64%", size: "h-2 w-2", delay: 1.6 },
  { left: "88%", top: "28%", size: "h-1.5 w-1.5", delay: 0.2 },
  { left: "94%", top: "82%", size: "h-1.5 w-1.5", delay: 1.1 },
] as const;

function getSocialMonogram(platform: SocialPlatform) {
  switch (platform) {
    case "instagram":
      return "IG";
    case "twitter":
      return "X";
    case "facebook":
      return "FB";
    case "whatsapp":
      return "WA";
    case "linkedin":
      return "IN";
    default:
      return "AB";
  }
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  const eyebrowClass =
    tone === "dark" ? "text-[#8fe7dc]" : "text-[color:var(--secondary)]";
  const titleClass =
    tone === "dark" ? "text-white" : "text-[color:var(--foreground)]";
  const descriptionClass =
    tone === "dark" ? "text-white/68" : "text-[color:var(--muted)]";

  return (
    <div className="max-w-3xl space-y-4">
      <p className={`eyebrow ${eyebrowClass}`}>{eyebrow}</p>
      <h2
        className={`text-3xl font-medium tracking-[-0.05em] sm:text-4xl lg:text-[3rem] ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-7 sm:text-lg ${descriptionClass}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CtaButton({
  href,
  label,
  onClick,
  variant = "primary",
  tone = "light",
  prefersReducedMotion,
}: {
  href: string;
  label: string;
  onClick?: (href: string) => void;
  variant?: "primary" | "secondary";
  tone?: "light" | "dark";
  prefersReducedMotion: boolean;
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]"
      : tone === "dark"
        ? "bg-white/10 text-white hover:bg-white/16"
        : "bg-[color:var(--surface-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-elevated)]";

  return (
    <m.a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      transition={spring}
      onClick={(event) => {
        if (!onClick || !href.startsWith("#")) {
          return;
        }

        event.preventDefault();
        onClick(href);
      }}
    >
      <span>{label}</span>
      {variant === "primary" ? (
        <ArrowRight className="h-4 w-4" />
      ) : (
        <ArrowUpRight className="h-4 w-4" />
      )}
    </m.a>
  );
}

function MetricCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
      <p className="eyebrow text-[#8fe7dc]">{label}</p>
      <p className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
        {value}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-7 text-white/66">{caption}</p>
    </article>
  );
}

function ServiceCard({
  title,
  description,
  prefersReducedMotion,
}: {
  title: string;
  description: string;
  prefersReducedMotion: boolean;
}) {
  const iconConfig = homepageServiceIconMap[title];
  const Icon = iconConfig?.Icon ?? Layers3;

  return (
    <m.article
      className="group h-full rounded-[2rem] border border-white/10 bg-[rgba(11,20,35,0.72)] p-6 shadow-[0_24px_60px_rgba(7,14,28,0.22)] backdrop-blur-xl"
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={spring}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-medium tracking-[-0.04em] text-white">
        {title}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-white/66">
        {description}
      </p>
      <Link
        href="/services"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity duration-200 group-hover:opacity-82"
      >
        <span>Learn More</span>
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </m.article>
  );
}

function SolutionCard({
  title,
  description,
  focusArea,
  prefersReducedMotion,
}: {
  title: string;
  description: string;
  focusArea?: string;
  prefersReducedMotion: boolean;
}) {
  const iconConfig = homepageIndustryIconMap[title];
  const Icon = iconConfig?.Icon ?? Building2;
  const accentClass = iconConfig?.accentClass ?? "text-[var(--secondary)]";

  return (
    <m.article
      className="rounded-[1.8rem] bg-[color:var(--surface-elevated)] p-5 shadow-[0_18px_44px_rgba(10,16,30,0.08)]"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={spring}
    >
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[color:var(--surface-soft)] ${accentClass}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[color:var(--foreground)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
        {description}
      </p>
      {focusArea ? (
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--secondary)]">
          {focusArea}
        </p>
      ) : null}
    </m.article>
  );
}

function ProcessCard({
  index,
  step,
  summary,
  prefersReducedMotion,
}: {
  index: number;
  step: string;
  summary: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <m.article
      className="rounded-[1.7rem] border border-white/8 bg-white/[0.05] p-5 backdrop-blur-xl"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={spring}
    >
      <p className="eyebrow text-[#8fe7dc]">0{index + 1}</p>
      <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">
        {step}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-7 text-white/66">{summary}</p>
    </m.article>
  );
}

function ValueCard({
  title,
  description,
  prefersReducedMotion,
}: {
  title: string;
  description: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <m.article
      className="rounded-[1.55rem] border border-white/8 bg-white/[0.05] p-5 backdrop-blur-xl"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={spring}
    >
      <h3 className="text-lg font-medium tracking-[-0.03em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{description}</p>
    </m.article>
  );
}

function WorkCard({
  sample,
  index,
  prefersReducedMotion,
}: {
  sample: LandingPageContent["workSection"]["samples"][number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const tone = index === 0 ? "accent" : index === 1 ? "secondary" : "mixed";

  return (
    <m.article
      className="overflow-hidden rounded-[2rem] bg-[color:var(--surface-strong)] p-5 shadow-[0_22px_60px_rgba(10,16,30,0.08)] sm:p-6"
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={spring}
    >
      <FeaturedWorkVisual tone={tone} />
      <div className="mt-6">
        <p className="eyebrow text-[color:var(--accent)]">{sample.label}</p>
        <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-[color:var(--foreground)]">
          {sample.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-[color:var(--muted)]">
          {sample.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {sample.stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[color:var(--surface-soft)] px-3 py-1.5 text-xs font-medium text-[color:var(--foreground)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </m.article>
  );
}

export default function LandingPage({
  initialContent,
}: {
  initialContent: LandingPageContent | null;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isContentAvailable = Boolean(initialContent);
  const copy = initialContent ?? emptyLandingPageContent;
  const footerQuickLinks = siteNavigationItems;
  const contactEmail = copy.contactEmail;
  const contactPhone = copy.contactPhone;
  const featuredServices = copy.servicesSection.featuredTitles
    .map((title) =>
      copy.servicesSection.items.find((category) => category.title === title)
    )
    .filter(
      (category): category is (typeof copy.servicesSection.items)[number] =>
        Boolean(category)
    );
  const solutionSpotlightTitles = [
    "Education & EdTech",
    "Healthcare & Life Sciences",
    "Agriculture & Agritech",
    "Banking, Finance & Insurance",
    "Retail & E-commerce",
    "Manufacturing & Industrial",
  ];
  const solutionSpotlights = solutionSpotlightTitles
    .map((title) =>
      copy.industryCatalog.find((industry) => industry.title === title)
    )
    .filter(
      (industry): industry is (typeof copy.industryCatalog)[number] =>
        Boolean(industry)
    );
  const aboutHighlights = copy.aboutSection.principles.slice(0, 2);
  const careerHighlights = copy.careersSection.roles.slice(0, 4);
  const heroMetrics = [
    {
      label: "Services",
      value: `${copy.servicesSection.items.length}+`,
      caption: "Structured delivery tracks across AI, product, cloud, and support.",
    },
    {
      label: "Industries",
      value: `${copy.industryCatalog.length}`,
      caption: "Context-driven delivery for sectors with real operational complexity.",
    },
    {
      label: "Technologies",
      value: `${technologyCatalog.length}`,
      caption: "Platforms and frameworks chosen for clarity, ownership, and scale.",
    },
    {
      label: "Work Samples",
      value: `${copy.workSection.samples.length}`,
      caption: "Representative examples that connect architecture to actual outcomes.",
    },
  ];

  const resolveSectionHref = (href: string) => {
    switch (href) {
      case "#company":
        return "#about";
      case "#solutions":
      case "#industries":
        return "#solutions";
      case "#insights":
        return "#process";
      default:
        return href;
    }
  };

  const jumpToSection = (href: string) => {
    if (href.startsWith("/")) {
      window.location.assign(href);
      return;
    }

    const resolvedHref = resolveSectionHref(href);
    const target = document.querySelector(resolvedHref);

    if (!(target instanceof HTMLElement)) {
      return;
    }

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const fadeUp = (distance = 28): Variants =>
    prefersReducedMotion
      ? {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        }
      : {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.72, ease: easeOut },
          },
        };

  const fadeIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.72, ease: easeOut },
        },
      };

  const stagger: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.06 },
        },
      };

  const orbPrimary = prefersReducedMotion
    ? { opacity: 0.68, scale: 1 }
    : {
        opacity: [0.42, 0.78, 0.5],
        x: [0, 18, 0],
        y: [0, -14, 0],
        scale: [0.96, 1.05, 0.98],
      };

  const orbSecondary = prefersReducedMotion
    ? { opacity: 0.58, scale: 1 }
    : {
        opacity: [0.3, 0.68, 0.38],
        x: [0, -16, 0],
        y: [0, 12, 0],
        scale: [0.94, 1.08, 0.98],
      };

  if (!isContentAvailable) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="relative isolate min-h-screen">
          <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-5 py-16 sm:px-8">
            <div className="panel max-w-2xl rounded-[2rem] p-8 text-center sm:p-10">
              <p className="eyebrow text-[color:var(--secondary)]">
                Content unavailable
              </p>
              <h1 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-[color:var(--foreground)] sm:text-4xl">
                The site content service is not reachable right now.
              </h1>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                Start the Django backend and reload the page so the landing-page
                content can be loaded from the database.
              </p>
            </div>
          </div>
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <SiteFrame content={copy} shellClassName="pb-16">
        <m.div
          className="hero-orb left-[4%] top-24 h-40 w-40 bg-[var(--accent-soft)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
          animate={orbPrimary}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 16,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: loopEase,
                }
          }
        />
        <m.div
          className="hero-orb right-[8%] top-44 h-48 w-48 bg-[var(--secondary-soft)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
          animate={orbSecondary}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 18,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: loopEase,
                  delay: 0.4,
                }
          }
        />

        <main className="flex flex-1 flex-col gap-20 pb-12 pt-10 sm:pt-14 lg:gap-24">
          <m.section
            className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] px-6 py-8 shadow-[0_34px_120px_rgba(4,9,18,0.34)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,50,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(111,215,204,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_62%)]" />
            <div className="pointer-events-none absolute inset-0">
              {heroParticlePositions.map((particle) => (
                <m.span
                  key={`${particle.left}-${particle.top}`}
                  className={`absolute rounded-full bg-white/35 ${particle.size}`}
                  style={{ left: particle.left, top: particle.top }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, -16, 0],
                          opacity: [0.18, 0.66, 0.22],
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 8,
                          delay: particle.delay,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: loopEase,
                        }
                  }
                />
              ))}
            </div>

            <div className="relative grid gap-12 xl:grid-cols-[0.94fr_1.06fr] xl:items-center">
              <m.div className="max-w-3xl space-y-8" variants={stagger}>
                <m.div variants={fadeUp(16)}>
                  <span className="eyebrow text-[#8fe7dc]">{copy.hero.eyebrow}</span>
                </m.div>

                <m.div className="space-y-5" variants={stagger}>
                  <m.h1
                    className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl lg:text-[5.75rem]"
                    variants={fadeUp(24)}
                  >
                    {copy.hero.title}
                  </m.h1>
                  <m.p
                    className="max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
                    variants={fadeUp(20)}
                  >
                    {copy.hero.description}
                  </m.p>
                </m.div>

                <m.div className="flex flex-col gap-3 sm:flex-row" variants={stagger}>
                  <m.div variants={fadeUp(18)}>
                    <CtaButton
                      href="#contact"
                      label={copy.hero.primaryCta}
                      onClick={jumpToSection}
                      tone="dark"
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </m.div>
                  <m.div variants={fadeUp(18)}>
                    <CtaButton
                      href={`mailto:${contactEmail}?subject=Discovery%20Call%20with%20AlphaBeastCodeX`}
                      label={copy.hero.secondaryCta}
                      variant="secondary"
                      tone="dark"
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </m.div>
                </m.div>

                <m.div className="flex flex-wrap gap-3" variants={stagger}>
                  {copy.hero.focusAreas.map((item) => (
                    <m.span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/86"
                      variants={fadeUp(14)}
                    >
                      {item}
                    </m.span>
                  ))}
                </m.div>
              </m.div>

              <m.div variants={fadeUp(28)}>
                <HomepageHeroMedia prefersReducedMotion={prefersReducedMotion} />
              </m.div>
            </div>

            <m.div
              className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
              variants={stagger}
            >
              {heroMetrics.map((metric) => (
                <m.div key={metric.label} variants={fadeUp(18)}>
                  <MetricCard
                    label={metric.label}
                    value={metric.value}
                    caption={metric.caption}
                  />
                </m.div>
              ))}
            </m.div>
          </m.section>

          <m.section
            className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <m.article
              className="rounded-[2.6rem] bg-[color:var(--surface-strong)] p-7 shadow-[0_24px_70px_rgba(10,16,30,0.08)] sm:p-8"
              variants={fadeUp(20)}
            >
              <SectionHeading
                eyebrow={copy.workingStyle.eyebrow}
                title={copy.workingStyle.title}
                description={copy.workingStyle.description}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.7rem] bg-[color:var(--surface-elevated)] p-5"
                  >
                    <p className="eyebrow text-[color:var(--accent)]">{item.title}</p>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {copy.aboutSection.people.items.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </m.article>

            <m.article
              className="rounded-[2.6rem] bg-[linear-gradient(135deg,#091320_0%,#102139_58%,#0b2e3c_100%)] p-7 shadow-[0_28px_90px_rgba(4,9,18,0.3)] sm:p-8"
              variants={fadeUp(22)}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <SectionHeading
                  eyebrow={copy.delivery.eyebrow}
                  title={copy.delivery.title}
                  description="A clear operating rhythm from early direction through production."
                  tone="dark"
                />
                <span className="self-start rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/84">
                  {copy.delivery.badge}
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.delivery.cadence.map((phase) => (
                  <article
                    key={phase.phase}
                    className="rounded-[1.7rem] border border-white/8 bg-white/[0.05] p-5 backdrop-blur-xl"
                  >
                    <p className="eyebrow text-[#8fe7dc]">{phase.phase}</p>
                    <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {phase.text}
                    </p>
                  </article>
                ))}
              </div>
            </m.article>
          </m.section>

          <m.section
            id="services"
            className="scroll-mt-28 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <m.article
              className="rounded-[2.7rem] bg-[linear-gradient(135deg,#091320_0%,#102139_58%,#0b2e3c_100%)] p-7 shadow-[0_28px_90px_rgba(4,9,18,0.3)] sm:p-8"
              variants={fadeUp(20)}
            >
              <SectionHeading
                eyebrow={copy.servicesSection.eyebrow}
                title={copy.servicesSection.title}
                description={copy.servicesSection.description}
                tone="dark"
              />

              <div className="mt-8 space-y-3">
                {copy.servicesSection.items.slice(0, 4).map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <div>
                      <p className="text-base font-medium text-white">{item.title}</p>
                      <p className="mt-2 max-w-sm text-sm leading-7 text-white/62">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/50" />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CtaButton
                  href="/services"
                  label="Explore Services"
                  variant="secondary"
                  tone="dark"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </m.article>

            <m.div className="grid gap-5 md:grid-cols-2" variants={stagger}>
              {featuredServices.map((category) => (
                <m.div key={category.title} variants={fadeUp(18)}>
                  <ServiceCard
                    title={category.title}
                    description={category.description}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </m.div>
              ))}
            </m.div>
          </m.section>

          <m.section
            id="solutions"
            className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <m.article
              className="rounded-[2.7rem] bg-[color:var(--surface-strong)] p-7 shadow-[0_24px_70px_rgba(10,16,30,0.08)] sm:p-8"
              variants={fadeUp(20)}
            >
              <SectionHeading
                eyebrow="Solutions"
                title="Delivery shaped around business context."
                description="Sector realities change product priorities. We design for that context instead of forcing generic architecture everywhere."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {solutionSpotlights.map((industry) => (
                  <SolutionCard
                    key={industry.title}
                    title={industry.title}
                    description={
                      homepageIndustryDescriptions[industry.title] ??
                      "Digital systems shaped for practical use."
                    }
                    focusArea={industry.services[0]}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </m.article>

            <m.article
              className="rounded-[2.7rem] bg-[linear-gradient(135deg,#091320_0%,#102139_58%,#0b2e3c_100%)] p-7 shadow-[0_28px_90px_rgba(4,9,18,0.3)] sm:p-8"
              variants={fadeUp(22)}
            >
              <SectionHeading
                eyebrow="Why ABCX"
                title="Senior execution without the noise."
                description="The team stays close to architecture, product direction, and release quality from the first working session onward."
                tone="dark"
              />

              <div className="mt-8 space-y-4">
                {homepageWhyAbcxItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.45rem] border border-white/8 bg-white/[0.05] px-5 py-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/66">
                          {item.description}
                        </p>
                      </div>
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    </div>
                  </article>
                ))}
              </div>
            </m.article>
          </m.section>

          <TechnologiesSection />

          <m.section
            id="work"
            className="scroll-mt-28 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <m.article
              className="rounded-[2.8rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] p-7 shadow-[0_28px_90px_rgba(4,9,18,0.32)] sm:p-8"
              variants={fadeUp(20)}
            >
              <SectionHeading
                eyebrow={copy.workSection.eyebrow}
                title={copy.workSection.title}
                description="Representative engagements across internal platforms, AI workflows, and customer-facing products."
                tone="dark"
              />

              <div className="mt-8 space-y-4">
                {copy.workSection.samples.map((sample) => (
                  <article
                    key={sample.title}
                    className="rounded-[1.55rem] border border-white/8 bg-white/[0.05] p-5"
                  >
                    <p className="eyebrow text-[#8fe7dc]">{sample.label}</p>
                    <h3 className="mt-4 text-xl font-medium text-white">
                      {sample.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {sample.description}
                    </p>
                  </article>
                ))}
              </div>
            </m.article>

            <m.div className="grid gap-6 xl:grid-cols-3" variants={stagger}>
              {copy.workSection.samples.map((sample, index) => (
                <m.div key={sample.title} variants={fadeUp(18)}>
                  <WorkCard
                    sample={sample}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </m.div>
              ))}
            </m.div>
          </m.section>

          <m.section
            id="process"
            className="scroll-mt-28 rounded-[2.9rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] px-6 py-8 shadow-[0_32px_100px_rgba(4,9,18,0.32)] sm:px-8 sm:py-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
              <m.div className="space-y-5" variants={fadeUp(20)}>
                <SectionHeading
                  eyebrow={copy.processSection.eyebrow}
                  title={copy.processSection.title}
                  description={copy.processSection.description}
                  tone="dark"
                />
                <p className="max-w-lg text-sm leading-7 text-white/62">
                  Decisions happen early, visibility stays high, and delivery
                  keeps moving with fewer avoidable surprises.
                </p>
              </m.div>

              <m.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5" variants={stagger}>
                {copy.processSection.steps.map((step, index) => (
                  <m.div key={step.step} variants={fadeUp(16)}>
                    <ProcessCard
                      index={index}
                      step={step.step}
                      summary={step.summary}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </m.div>
                ))}
              </m.div>
            </div>

            <m.div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5" variants={stagger}>
              {homepageWhyAbcxItems.map((item) => (
                <m.div key={item.title} variants={fadeUp(14)}>
                  <ValueCard
                    title={item.title}
                    description={item.description}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </m.div>
              ))}
            </m.div>
          </m.section>

          <m.section
            id="about"
            className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <m.article
              className="rounded-[2.6rem] bg-[color:var(--surface-strong)] p-7 shadow-[0_24px_70px_rgba(10,16,30,0.08)] sm:p-8"
              variants={fadeUp(20)}
            >
              <SectionHeading
                eyebrow={copy.aboutSection.eyebrow}
                title={copy.aboutSection.title}
                description={copy.aboutSection.description}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.7rem] bg-[color:var(--surface-elevated)] p-5">
                  <p className="eyebrow text-[color:var(--accent)]">
                    {copy.aboutSection.purpose.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                    {copy.aboutSection.purpose.description}
                  </p>
                </article>

                <article className="rounded-[1.7rem] bg-[color:var(--surface-elevated)] p-5">
                  <p className="eyebrow text-[color:var(--accent)]">
                    {copy.aboutSection.people.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                    {copy.aboutSection.people.description}
                  </p>
                </article>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {copy.aboutSection.people.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </m.article>

            <m.article
              className="rounded-[2.6rem] bg-[linear-gradient(135deg,#091320_0%,#102139_58%,#0b2e3c_100%)] p-7 shadow-[0_28px_90px_rgba(4,9,18,0.3)] sm:p-8"
              variants={fadeUp(22)}
            >
              <SectionHeading
                eyebrow={copy.careersSection.eyebrow}
                title={copy.careersSection.title}
                description={copy.careersSection.description}
                tone="dark"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {careerHighlights.map((role) => (
                  <article
                    key={role}
                    className="rounded-[1.55rem] border border-white/8 bg-white/[0.05] p-5"
                  >
                    <p className="eyebrow text-[#8fe7dc]">
                      {copy.careersSection.rolesTitle}
                    </p>
                    <p className="mt-4 text-base leading-7 text-white">{role}</p>
                  </article>
                ))}
              </div>

              <p className="mt-8 text-sm leading-7 text-white/62">
                {copy.careersSection.note}
              </p>

              <div className="mt-8">
                <CtaButton
                  href={`mailto:${contactEmail}?subject=Careers%20at%20AlphaBeastCodeX`}
                  label={copy.careersSection.cta}
                  tone="dark"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </m.article>
          </m.section>

          <m.section
            id="contact"
            className="scroll-mt-28 rounded-[3rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] px-6 py-8 shadow-[0_34px_120px_rgba(4,9,18,0.34)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-end">
              <m.div className="space-y-5" variants={fadeUp(20)}>
                <SectionHeading
                  eyebrow={copy.contactSection.eyebrow}
                  title={copy.contactSection.title}
                  description={copy.contactSection.description}
                  tone="dark"
                />
                <p className="max-w-2xl text-sm leading-7 text-white/62">
                  {copy.contactSection.placeholder}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <CtaButton
                    href={`mailto:${contactEmail}?subject=Start%20a%20Project%20with%20AlphaBeastCodeX`}
                    label="Start a Project"
                    tone="dark"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <CtaButton
                    href="/services"
                    label="Review Services"
                    variant="secondary"
                    tone="dark"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
              </m.div>

              <m.div className="grid gap-4 md:grid-cols-2" variants={stagger}>
                <m.a
                  href={`mailto:${contactEmail}`}
                  className="rounded-[1.9rem] border border-white/8 bg-white/[0.06] p-5 backdrop-blur-xl"
                  variants={fadeUp(16)}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={spring}
                >
                  <span className="eyebrow text-[#8fe7dc]">Email</span>
                  <span className="mt-4 block text-xl font-medium text-white">
                    {contactEmail}
                  </span>
                  <span className="mt-3 block text-sm leading-7 text-white/62">
                    Email is usually the fastest place to start.
                  </span>
                </m.a>

                <m.a
                  href={`tel:${contactPhone}`}
                  className="rounded-[1.9rem] border border-white/8 bg-white/[0.06] p-5 backdrop-blur-xl"
                  variants={fadeUp(16)}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={spring}
                >
                  <span className="eyebrow text-[#8fe7dc]">Phone</span>
                  <span className="mt-4 block text-xl font-medium text-white">
                    {contactPhone}
                  </span>
                  <span className="mt-3 block text-sm leading-7 text-white/62">
                    Useful for urgent coordination and faster working sessions.
                  </span>
                </m.a>
              </m.div>
            </div>
          </m.section>
        </main>

        <m.footer
          className="pb-8 pt-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn}
        >
          <m.div
            className="control-panel rounded-[2.6rem] bg-[linear-gradient(135deg,rgba(8,17,31,0.96),rgba(12,24,43,0.94),rgba(11,40,50,0.92))] px-6 py-8 shadow-[0_26px_80px_rgba(4,9,18,0.3)] sm:px-8 sm:py-10"
            variants={fadeUp(20)}
          >
            <div className="grid gap-10 lg:grid-cols-[1.18fr_0.72fr_0.92fr_0.8fr]">
              <m.div className="space-y-5" variants={stagger}>
                <m.div className="flex items-center gap-4" variants={fadeUp(14)}>
                  <Image
                    src="/abcx-logo-trimmed.png"
                    alt="ABCX logo"
                    width={44}
                    height={52}
                    className="h-11 w-auto object-contain"
                  />
                  <div className="min-w-0">
                    <p className="eyebrow text-[#8fe7dc]">{copy.footer.eyebrow}</p>
                    <p className="mt-2 text-xl font-medium tracking-[-0.04em] text-white sm:text-2xl">
                      {copy.companyName}
                    </p>
                  </div>
                </m.div>

                <m.p
                  className="max-w-xl text-base leading-7 text-white/66"
                  variants={fadeUp(16)}
                >
                  {copy.footer.description}
                </m.p>

                <m.div
                  className="flex flex-wrap items-center gap-3"
                  variants={fadeUp(18)}
                >
                  <span className="eyebrow text-[#8fe7dc]">
                    {copy.footer.companyTag}
                  </span>
                  <m.a
                    href="#contact"
                    className="inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-strong)]"
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    transition={spring}
                    onClick={(event) => {
                      event.preventDefault();
                      jumpToSection("#contact");
                    }}
                  >
                    {copy.footer.cta}
                  </m.a>
                </m.div>
              </m.div>

              <m.div className="space-y-4" variants={fadeUp(18)}>
                <p className="eyebrow text-[#8fe7dc]">
                  {copy.footer.quickLinksTitle}
                </p>
                <div className="space-y-3">
                  {footerQuickLinks.map((link) => (
                    <m.a
                      key={link.href}
                      href={link.href}
                      className="block text-sm leading-7 text-white/66 transition-colors hover:text-white"
                      whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                      transition={spring}
                      onClick={(event) => {
                        event.preventDefault();
                        jumpToSection(link.href);
                      }}
                    >
                      {link.label}
                    </m.a>
                  ))}
                </div>
              </m.div>

              <m.div className="space-y-4" variants={fadeUp(20)}>
                <p className="eyebrow text-[#8fe7dc]">
                  {copy.footer.serviceFocusTitle}
                </p>
                <div className="space-y-3">
                  {copy.footer.serviceFocus.map((service) => (
                    <m.a
                      key={service}
                      href="#services"
                      className="block text-sm font-medium leading-7 text-white transition-colors hover:text-[#8fe7dc]"
                      whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                      transition={spring}
                      onClick={(event) => {
                        event.preventDefault();
                        jumpToSection("#services");
                      }}
                    >
                      {service}
                    </m.a>
                  ))}
                </div>
              </m.div>

              <m.div className="space-y-4" variants={fadeUp(22)}>
                <p className="eyebrow text-[#8fe7dc]">
                  {copy.footer.contactTitle}
                </p>
                <p className="text-sm leading-7 text-white/62">
                  {copy.footer.contactLabel}
                </p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="block text-sm font-medium leading-7 text-white transition-opacity hover:opacity-80"
                  >
                    {contactEmail}
                  </a>
                  <a
                    href={`tel:${contactPhone}`}
                    className="block text-sm font-medium leading-7 text-white transition-opacity hover:opacity-80"
                  >
                    {contactPhone}
                  </a>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="eyebrow text-[#8fe7dc]">
                    {copy.footer.socialLinksTitle}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                    {copy.footer.socialLinks.map((link) => {
                      const socialMonogram = getSocialMonogram(link.platform);
                      const socialLinkContent = (
                        <>
                          <span className="text-[10px] font-semibold tracking-[0.16em] text-[#8fe7dc]">
                            {socialMonogram}
                          </span>
                          <span>{link.label}</span>
                        </>
                      );

                      if (!link.href) {
                        return (
                          <span
                            key={link.label}
                            aria-disabled="true"
                            className="inline-flex items-center gap-2 text-white/50"
                          >
                            {socialLinkContent}
                          </span>
                        );
                      }

                      return (
                        <m.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-white transition-colors hover:text-[#8fe7dc]"
                          whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                          transition={spring}
                        >
                          {socialLinkContent}
                        </m.a>
                      );
                    })}
                  </div>
                </div>
              </m.div>
            </div>

            <m.div
              className="mt-9 flex flex-col gap-2 text-sm leading-7 text-white/58 lg:flex-row lg:items-center lg:justify-between"
              variants={fadeUp(18)}
            >
              <p>{copy.footer.note}</p>
              <p>{copy.footer.legal}</p>
            </m.div>
          </m.div>
        </m.footer>
      </SiteFrame>
    </LazyMotion>
  );
}
