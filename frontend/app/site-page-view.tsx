import BlogsPage from "./blogs-page";
import ConsultationPage from "./consultation-page";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import AboutPage from "./about-page";
import SiteChrome from "./site-chrome";
import type { LandingPageContent } from "./landing-page-content";
import type { SitePageSlug } from "./site-routes";
import ServicesSection from "./services-section";
import ProductsSection from "./products-section";
import TechAtAbcxPage from "./tech-at-abcx-page";

function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  align = "left",
  highlightTitle = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "left" | "center";
  highlightTitle?: boolean;
}) {
  const isCentered = align === "center";

  return (
    <section
      className={`editorial-depth rounded-[2.8rem] bg-[linear-gradient(135deg,#08111f_0%,#102139_58%,#0b3141_100%)] px-6 py-8 shadow-[0_30px_100px_rgba(4,9,18,0.3)] sm:px-8 sm:py-10 lg:px-10 lg:py-12 ${
        isCentered ? "text-center" : ""
      }`}
    >
      {eyebrow ? (
        <p className={`eyebrow text-[#8fe7dc] ${isCentered ? "mx-auto w-fit" : ""}`}>
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`${eyebrow ? "mt-4" : ""} text-4xl font-medium leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.5rem] ${
          isCentered ? "mx-auto" : "max-w-5xl"
        }`}
      >
        {highlightTitle ? (
          <span className="inline-block rounded-[0.5rem] bg-[#94a9ca]/90 px-4 py-2 shadow-[0_14px_34px_rgba(148,169,202,0.22)] sm:px-5 sm:py-3">
            {title}
          </span>
        ) : (
          title
        )}
      </h1>
      {description ? (
        <p
          className={`mt-6 text-lg leading-8 text-white/70 sm:text-xl ${
            isCentered ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      ) : null}

      {primaryCta || secondaryCta ? (
        <div
          className={`mt-8 flex flex-wrap gap-3 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/16"
            >
              {secondaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function Card({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-32 rounded-[2.1rem] bg-[color:var(--surface-strong)] p-6 shadow-[0_18px_44px_rgba(16,24,38,0.08)] sm:scroll-mt-36 sm:p-7"
    >
      <p className="eyebrow text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-[color:var(--foreground)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 text-sm leading-7 text-[color:var(--foreground)]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function renderServicesPage() {
  return <ServicesSection />;
}

function renderSolutionsPage() {
  return <ProductsSection />;
}

function renderIndustriesPage(content: LandingPageContent) {
  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Industries"
        title="Software delivery tailored to industry context."
        description="We adapt product design, data flow, workflow automation, and platform priorities to the commercial realities of each sector we support."
        primaryCta={{ label: "Discuss your sector", href: "/contact" }}
        secondaryCta={{ label: "Explore services", href: "/services" }}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {content.industryCatalog.map((industry) => (
          <article
            key={industry.title}
            className="rounded-[1.8rem] bg-[color:var(--surface-elevated)] p-6 shadow-[0_18px_44px_rgba(16,24,38,0.08)]"
          >
            <h2 className="text-2xl font-medium tracking-[-0.04em] text-[color:var(--foreground)]">
              {industry.title}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {industry.services.map((service) => (
                <div
                  key={service}
                  className="rounded-[1.25rem] bg-[color:var(--surface-soft)] px-4 py-3 text-sm text-[color:var(--foreground)]"
                >
                  {service}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function renderTechnologiesPage() {
  return <TechAtAbcxPage />;
}

function renderCareersPage(content: LandingPageContent) {
  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Careers"
        title={content.careersSection.title}
        description={content.careersSection.description}
        primaryCta={{
          label: content.careersSection.cta,
          href: `mailto:${content.contactEmail}?subject=Careers%20at%20AlphaBeastCodeX`,
        }}
        secondaryCta={{ label: "Learn about our company", href: "/company" }}
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card
          eyebrow={content.aboutSection.valuesTitle}
          title="The kind of teammates we value."
          description={content.careersSection.note}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {content.careersSection.roles.map((role) => (
              <article
                key={role}
                className="rounded-[1.5rem] bg-[color:var(--surface-soft)] p-5"
              >
                <p className="eyebrow text-[color:var(--accent)]">
                  {content.careersSection.rolesTitle}
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--foreground)]">
                  {role}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <Card
          eyebrow="What Matters Here"
          title="We hire for ownership, clarity, and practical judgment."
          description="We care about people who can move between detail and direction, communicate tradeoffs early, and keep execution grounded in the real business problem."
        >
          <BulletList
            items={[
              "People who can build useful systems without adding noise.",
              "Teammates who write clearly, collaborate calmly, and own outcomes.",
              "Builders who can balance speed, quality, and long-term maintainability.",
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

export default function SitePageView({
  slug,
  content,
}: {
  slug: SitePageSlug;
  content: LandingPageContent;
}) {
  const activeHref = `/${slug}`;
  const showFooter = true;
  const mainClassName =
    (slug === "company" || slug === "contact" || slug === "insights")
      ? "flex-1 pb-12 pt-6 sm:pt-10"
      : slug === "solutions" || slug === "services" || slug === "technologies"
        ? "flex-1 pb-12 pt-10 sm:pt-12"
        : undefined;

  return (
    <SiteChrome
      content={content}
      activeHref={activeHref}
      showFooter={showFooter}
      mainClassName={mainClassName}
    >
      {slug === "company"
        ? <AboutPage />
        : slug === "services"
          ? renderServicesPage()
          : slug === "solutions"
            ? renderSolutionsPage()
            : slug === "industries"
              ? renderIndustriesPage(content)
        : slug === "technologies"
                ? renderTechnologiesPage()
                : slug === "insights"
                  ? <BlogsPage />
                  : slug === "careers"
                    ? renderCareersPage(content)
                    : <ConsultationPage email={content.contactEmail} />}
    </SiteChrome>
  );
}
