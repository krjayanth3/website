import Ecosystem, { type EcosystemItem } from "./three/ecosystem";
import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  Building2,
  CloudCog,
  CodeXml,
  GraduationCap,
  HeartPulse,
  Info,
  RadioTower,
  ShieldCheck,
  Sprout,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const softwareSolutions = [
  {
    category: "Software as a Service",
    title: "SaaS Solutions",
    description:
      "We design and develop scalable, cloud-based SaaS applications tailored to modern business requirements, from architecture and development to deployment and ongoing improvement.",
    icon: CloudCog,
    href: "/services/enterprise-solutions",
  },
  {
    category: "Custom Software",
    title: "Custom Software Development",
    description:
      "We build secure, scalable, and purpose-driven software solutions tailored to specific business processes, operational requirements, and digital transformation goals.",
    icon: CodeXml,
    href: "/services/product-engineering",
  },
] as const;

const researchInitiatives = [
  {
    category: "Education",
    title: "Education Technology",
    description:
      "Exploring intelligent learning platforms, digital assessments, skill development, training, and technology-enabled educational experiences.",
    icon: GraduationCap,
  },
  {
    category: "Healthcare",
    title: "Healthcare Technology",
    description:
      "Researching digital health technologies focused on healthcare workflows, accessibility, data management, and connected care experiences.",
    icon: HeartPulse,
  },
  {
    category: "Agriculture",
    title: "Agriculture Technology",
    description:
      "Exploring smart agriculture, monitoring, resource optimization, automation, and data-driven decision-support technologies.",
    icon: Sprout,
  },
  {
    category: "Artificial Intelligence",
    title: "AI & Intelligent Systems",
    description:
      "Researching generative AI, conversational AI, agentic systems, machine learning, computer vision, and intelligent automation.",
    icon: BrainCircuit,
  },
  {
    category: "Cybersecurity",
    title: "Security Technologies",
    description:
      "Exploring application security, threat detection, security assessment, data protection, and intelligent cybersecurity technologies.",
    icon: ShieldCheck,
  },
  {
    category: "Cloud",
    title: "Cloud Technologies",
    description:
      "Researching cloud-native platforms, infrastructure automation, observability, scalability, monitoring, and intelligent cloud operations.",
    icon: CloudCog,
  },
  {
    category: "Enterprise",
    title: "Enterprise Technology",
    description:
      "Exploring enterprise applications, SaaS platforms, workflow automation, API ecosystems, and intelligent business systems.",
    icon: Building2,
  },
  {
    category: "IoT",
    title: "IoT & Smart Systems",
    description:
      "Exploring connected devices, sensor-based systems, real-time monitoring, edge computing, and intelligent automation.",
    icon: RadioTower,
  },
  {
    category: "Blockchain",
    title: "Blockchain Technologies",
    description:
      "Researching distributed applications, smart contracts, traceability solutions, secure digital records, and blockchain-enabled systems.",
    icon: Blocks,
  },
  {
    category: "Automation",
    title: "Intelligent Automation",
    description:
      "Exploring AI-powered workflows, AIOps, process optimization, autonomous systems, and intelligent operational technologies.",
    icon: Workflow,
  },
] as const;

const researchIcons: EcosystemItem["icon"][] = ["education", "healthcare", "agriculture", "ai", "security", "cloud", "enterprise", "iot", "blockchain", "automation"];

const cardClassName =
  "group rounded-[1.75rem] border border-[var(--line)] bg-[color:var(--surface-strong)] shadow-[0_12px_35px_rgba(31,48,71,0.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:shadow-[0_20px_50px_rgba(31,48,71,0.12)] motion-reduce:transform-none motion-reduce:transition-none";

function SectionHeading({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <header className="max-w-3xl">
      {(eyebrow || badge) && <div className="flex flex-wrap items-center gap-3">
        {eyebrow && <p className="eyebrow text-[color:var(--accent)]">{eyebrow}</p>}
        {badge ? (
          <span className="rounded-full border border-[var(--line)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--foreground)]">
            {badge}
          </span>
        ) : null}
      </div>}
      <h2 className={`${eyebrow || badge ? "mt-4 " : ""}text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl lg:text-5xl`}>
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
        {description}
      </p>
    </header>
  );
}

export default function ProductsSection() {
  return (
    <div className="space-y-12 pb-4 sm:space-y-16">
      <section aria-labelledby="products-heading" className="py-3 text-center sm:py-4">
        <h1
          id="products-heading"
          className="text-4xl font-semibold tracking-[-0.045em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl"
        >
          Products &amp; R&amp;D
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          Building intelligent software solutions and exploring emerging
          technologies to solve real-world challenges.
        </p>
      </section>

      <section aria-labelledby="software-solutions-heading">
        <SectionHeading
          title="Software Solutions for Every Business Need"
          description="We design and build custom software, SaaS platforms, web and mobile applications, AI-powered systems, cloud solutions, and enterprise software tailored to your requirements."
        />
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {softwareSolutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article data-depth key={solution.title} className={`${cardClassName} flex min-h-[24rem] flex-col p-7 sm:p-8`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-[color:var(--surface-soft)] text-[color:var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none">
                  <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)] sm:text-3xl">
                  {solution.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-8 text-[color:var(--muted)]">
                  {solution.description}
                </p>
                <Link
                  href={solution.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--accent)]"
                  aria-label={`Explore ${solution.title}`}
                >
                  Explore Solutions
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="research-heading">
        <SectionHeading
          title="Research & Development"
          description="Exploring emerging technologies and industry-focused solutions designed to address real-world challenges."
        />

        <Ecosystem showDetailLabel={false} label="Innovation ecosystem · R&D" center="RESEARCH & DEVELOPMENT" items={researchInitiatives.map((item, index) => ({ title: item.title, description: item.description, icon: researchIcons[index] }))} />

        <aside className="mt-8 flex gap-4 rounded-[1.5rem] border border-[var(--line)] bg-[color:var(--surface-soft)] p-5 sm:p-6" aria-labelledby="research-notice-heading">
          <Info aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[color:var(--accent)]" />
          <div>
            <h3 id="research-notice-heading" className="font-semibold text-[color:var(--foreground)]">
              Research &amp; Development Notice
            </h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              The initiatives presented in this section are currently under research and development. Features, specifications, availability, and commercial release plans may evolve as development progresses.
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-[2.25rem] border border-[var(--line)] bg-[color:var(--surface-strong)] px-6 py-10 text-center shadow-[0_20px_55px_rgba(31,48,71,0.09)] sm:px-10 sm:py-12">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
          Have an idea that needs the right technology?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
          Partner with AlphaBeastCodeX to design and build scalable software solutions tailored to your business.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1320] transition-colors hover:bg-[var(--accent-strong)]">
            Book Consultation
          </Link>
          <Link href="/services" className="rounded-full border border-[var(--line)] bg-[color:var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:border-[color:var(--accent)]">
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}
