"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import {
  technologyCatalog,
  technologiesSectionContent,
  type TechnologySelection,
} from "./technologies-data";

const easeOut = [0.22, 1, 0.36, 1] as const;

function TechnologyPickerCard({
  item,
  isSelected,
  onSelect,
}: {
  item: TechnologySelection;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.button
      type="button"
      aria-pressed={isSelected}
      aria-controls="technology-detail-panel"
      aria-label={`Show details for ${item.name}`}
      className={`group relative flex h-full min-h-[7.75rem] flex-col items-center justify-center overflow-hidden rounded-[1.45rem] px-4 py-5 text-center transition-[transform,box-shadow,background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1729] ${
        isSelected
          ? "bg-white/[0.09] text-white shadow-[0_24px_48px_rgba(1,6,15,0.34)]"
          : "bg-[#0f1a2d]/78 text-white/62 shadow-[0_12px_24px_rgba(1,6,15,0.24)] hover:bg-white/[0.06] hover:text-white hover:shadow-[0_20px_40px_rgba(1,6,15,0.3)]"
      }`}
      onClick={() => onSelect(item.slug)}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 240, damping: 24 }
      }
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 ${
          isSelected
            ? "bg-[radial-gradient(circle_at_top,rgba(255,178,74,0.18),transparent_52%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_46%)]"
        }`}
      />
      <span className="relative flex flex-col items-center">
        <span
          className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.15rem] transition-transform duration-300 ${
            isSelected
              ? "bg-[#0b1425] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              : "bg-[#111c30] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:scale-105"
          }`}
        >
          <item.Icon
            aria-hidden="true"
            className={`h-8 w-8 transition-transform duration-300 ease-out group-hover:scale-110 ${item.colorClass}`}
          />
        </span>
        <span className="mt-3 text-sm font-medium leading-5 text-white">
          {item.name}
        </span>
      </span>
    </m.button>
  );
}

function DetailList({
  title,
  Icon,
  items,
}: {
  title: string;
  Icon: typeof CheckCheck;
  items: string[];
}) {
  return (
    <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-white">
        <Icon className="h-4 w-4 text-[#8fe7dc]" />
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
          {title}
        </h4>
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-white/66">
        {items.map((entry) => (
          <li key={entry} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechnologiesSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [selectedTechnologySlug, setSelectedTechnologySlug] = useState<string>(
    technologiesSectionContent.defaultTechnologySlug
  );
  const detailPanelRef = useRef<HTMLElement | null>(null);

  const selectedTechnology =
    technologyCatalog.find((item) => item.slug === selectedTechnologySlug) ??
    technologyCatalog[0];
  const selectedTechnologyIndex = technologyCatalog.findIndex(
    (item) => item.slug === selectedTechnology.slug
  );
  const previousTechnology =
    technologyCatalog[
      (selectedTechnologyIndex - 1 + technologyCatalog.length) %
        technologyCatalog.length
    ];
  const nextTechnology =
    technologyCatalog[(selectedTechnologyIndex + 1) % technologyCatalog.length];

  const handleSelectTechnology = (slug: string) => {
    setSelectedTechnologySlug(slug);

    window.requestAnimationFrame(() => {
      detailPanelRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const handleInlineTechnologyChange = (slug: string) => {
    setSelectedTechnologySlug(slug);
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
            transition: { duration: 0.68, ease: easeOut },
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
          transition: { staggerChildren: 0.06, delayChildren: 0.05 },
        },
      };

  if (!selectedTechnology) {
    return null;
  }

  const projectName = selectedTechnology.shortName ?? selectedTechnology.name;

  return (
    <m.section
      id="technologies"
      aria-labelledby="technologies-title"
      aria-describedby="technologies-subtitle"
      className="scroll-mt-28"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <div className="relative overflow-hidden rounded-[2.8rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] px-5 py-8 shadow-[0_30px_100px_rgba(4,9,18,0.3)] sm:px-7 sm:py-10 lg:px-9 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,50,0.16),transparent_22%),radial-gradient(circle_at_88%_18%,rgba(111,215,204,0.14),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_62%)]"
        />
        <div className="relative mx-auto w-full max-w-[1400px]">
          <header className="max-w-4xl">
            <m.p
              className="eyebrow text-[#8fe7dc]"
              variants={fadeUp(14)}
            >
              Technology Stack
            </m.p>
            <m.h2
              id="technologies-title"
              className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-[3rem]"
              variants={fadeUp(22)}
            >
              {technologiesSectionContent.title}
            </m.h2>
            <m.p
              id="technologies-subtitle"
              className="mt-5 max-w-3xl text-base leading-8 text-white/68 sm:text-lg"
              variants={fadeUp(20)}
            >
              {technologiesSectionContent.subtitle}
            </m.p>
          </header>

          <m.div
            className="mt-10 rounded-[2rem] border border-white/8 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-6"
            variants={fadeUp(18)}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8fe7dc]">
                  Technology Library
                </p>
                <p className="mt-2 text-sm leading-7 text-white/66">
                  Open any card to see where it fits and how we use it.
                </p>
              </div>
              <span className="inline-flex h-11 items-center rounded-full bg-white/10 px-4 text-sm font-medium text-white">
                {technologyCatalog.length} technologies
              </span>
            </div>

            <m.div
              className="mt-6 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
              variants={stagger}
            >
              {technologyCatalog.map((item) => (
                <m.div key={item.slug} variants={fadeUp(14)}>
                  <TechnologyPickerCard
                    item={item}
                    isSelected={item.slug === selectedTechnology.slug}
                    onSelect={handleSelectTechnology}
                  />
                </m.div>
              ))}
            </m.div>
          </m.div>

          <AnimatePresence mode="wait" initial={false}>
            <m.article
              key={selectedTechnology.slug}
              id="technology-detail-panel"
              aria-live="polite"
              ref={detailPanelRef}
              className="relative mt-6 scroll-mt-32 overflow-hidden rounded-[2.2rem] border border-white/8 bg-white/[0.05] p-6 backdrop-blur-xl sm:scroll-mt-36 sm:p-8 lg:p-10"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.36, ease: easeOut }
              }
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-gradient-to-br ${selectedTechnology.accentClass} opacity-75 blur-3xl`}
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <p className="eyebrow text-[#8fe7dc]">
                        {selectedTechnology.categoryTitle}
                      </p>
                      <h3 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
                        {selectedTechnology.name}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-1 self-start rounded-full border border-white/8 bg-white/[0.05] p-1 backdrop-blur-xl">
                      <button
                        type="button"
                        aria-label={`Show previous technology: ${previousTechnology.name}`}
                        title={`Previous: ${previousTechnology.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        onClick={() =>
                          handleInlineTechnologyChange(previousTechnology.slug)
                        }
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="min-w-[5.5rem] px-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/54">
                        {selectedTechnologyIndex + 1} / {technologyCatalog.length}
                      </span>
                      <button
                        type="button"
                        aria-label={`Show next technology: ${nextTechnology.name}`}
                        title={`Next: ${nextTechnology.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        onClick={() =>
                          handleInlineTechnologyChange(nextTechnology.slug)
                        }
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-[1.8rem] bg-[#0c1729] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <selectedTechnology.Icon
                        aria-hidden="true"
                        className={`h-12 w-12 ${selectedTechnology.colorClass}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8fe7dc]">
                        Official {selectedTechnology.name} Logo
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/66">
                        A core technology inside our delivery toolkit for
                        scalable product engineering and enterprise execution.
                      </p>
                    </div>
                  </div>

                  <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
                    {selectedTechnology.overview}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={selectedTechnology.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit the official ${selectedTechnology.name} website in a new tab`}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Visit Official Website
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link
                      href={selectedTechnology.projectHref}
                      aria-label={`View our ${projectName} projects`}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/16"
                    >
                      View Our {projectName} Projects
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                  <DetailList
                    title="Common Uses"
                    Icon={CheckCheck}
                    items={selectedTechnology.commonUses}
                  />
                  <DetailList
                    title="Frameworks & Ecosystem"
                    Icon={Layers3}
                    items={selectedTechnology.ecosystem}
                  />
                  <DetailList
                    title={`Why We Use ${projectName}`}
                    Icon={Sparkles}
                    items={selectedTechnology.whyWeUse}
                  />
                </div>
              </div>
            </m.article>
          </AnimatePresence>
        </div>
      </div>
    </m.section>
  );
}
