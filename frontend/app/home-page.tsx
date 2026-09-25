import {
  ArrowRight,
  Blocks,
  Bot,
  BriefcaseBusiness,
  CloudCog,
  GraduationCap,
  Lightbulb,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import type { LandingPageContent } from "./landing-page-content";
import styles from "./home-page.module.css";
import SceneCanvas from "./three/scene-canvas";
import threeStyles from "./three/three.module.css";
import SdlcLifecycle from "./sdlc-lifecycle";
import SiteChrome from "./site-chrome";
import { technologyCatalog } from "./technologies-data";

const services = [
  ["Product Engineering", "End-to-end software product design, development, integration, and evolution.", Blocks],
  ["Data & AI", "AI, machine learning, intelligent automation, and data-driven solutions.", Bot],
  ["Cloud & Infrastructure", "Cloud-native architecture, infrastructure modernization, deployment, and scalable environments.", CloudCog],
  ["Security & Compliance", "Security-focused engineering, application protection, API security, and secure development practices.", ShieldCheck],
  ["Enterprise Solutions", "Business applications, backend platforms, APIs, integrations, and workflow solutions.", BriefcaseBusiness],
  ["Managed IT Services", "Ongoing technology operations, maintenance, monitoring, and technical support.", Wrench],
] as const;

const researchAreas = [
  "Education", "Healthcare", "Agriculture", "Artificial Intelligence",
  "Cybersecurity", "Cloud", "IoT", "Blockchain", "Automation",
] as const;

const technologyNames = [
  "Python", "React", "Java", "Spring Boot", "Amazon Web Services",
  "Microsoft Azure", "Google Cloud Platform", "Docker", "Kubernetes",
  "Flutter", "TensorFlow", "PostgreSQL",
] as const;

const technologies = technologyNames.flatMap((name) => {
  const item = technologyCatalog.find((technology) => technology.name === name);
  return item ? [item] : [];
});

const programs = ["Internships", "Technical Training", "Workshops", "Skill Development", "Mentorship"] as const;

const cardClass = styles.card;
const textLinkClass = "group inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

function SectionHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description?: string }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow text-[color:var(--accent)]">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[color:var(--foreground)] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[color:var(--muted)] sm:text-lg">{description}</p> : null}
    </header>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={textLinkClass}>{children}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></Link>;
}

export default function HomePage({ content }: { content: LandingPageContent }) {
  return (
    <SiteChrome content={content} activeHref="/" mainClassName="flex-1 pb-12 pt-4 sm:pt-6">
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="home-heading">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-[8%] h-[75%] rounded-full bg-[radial-gradient(circle,var(--surface-strong)_0%,transparent_68%)] opacity-80" />
          <div className="relative mx-auto max-w-5xl px-2">
            <h1 id="home-heading" className="mx-auto mt-5 max-w-4xl text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[color:var(--foreground)]">
              Engineering Technology<br className="hidden sm:block" /> for <span className="text-[color:var(--accent)]">Tomorrow.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">AlphaBeastCodeX designs and builds software, AI-powered solutions, cloud platforms, and digital products for modern businesses.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row lg:justify-start">
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1320] transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">Explore Our Services <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[color:var(--surface-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:border-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">Book Consultation</Link>
            </div>
          </div>
          <div className={threeStyles.heroVisual}><SceneCanvas kind="hero" count={8} /></div>
        </section>

        <section aria-labelledby="services-heading">
          <SectionHeading id="services-heading" eyebrow="What we do" title="Technology solutions for modern businesses." description="From software engineering to AI, cloud, security, and enterprise technology, we help organizations turn ideas and requirements into digital solutions." />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, description, Icon]) => (
              <article data-depth key={title} className={`${cardClass} group p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(31,48,71,0.09)] motion-reduce:transform-none`}>
                <Icon aria-hidden="true" className="h-6 w-6 text-[color:var(--accent)]" />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
                <div className="mt-5"><ArrowLink href="/services">Learn More</ArrowLink></div>
              </article>
            ))}
          </div>
          <div className="mt-7"><ArrowLink href="/services">Explore All Services</ArrowLink></div>
        </section>

        <section aria-labelledby="products-heading">
          <SectionHeading id="products-heading" eyebrow="What we build" title="Software built to solve real problems." />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article data-depth className={`${cardClass} relative overflow-hidden p-6`}><div aria-hidden="true" className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--accent-soft)] blur-3xl" /><h3 className="relative text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">SaaS Solutions</h3><p className="relative mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)]">Scalable cloud-based software solutions designed for modern businesses and evolving digital requirements.</p><div className="relative mt-6"><ArrowLink href="/solutions">Explore Products</ArrowLink></div></article>
            <article data-depth className={`${cardClass} relative overflow-hidden p-6`}><div aria-hidden="true" className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--secondary-soft)] blur-3xl" /><h3 className="relative text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Custom Software Development</h3><p className="relative mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)]">Purpose-built software engineered around specific business processes, requirements, and digital transformation goals.</p><div className="relative mt-6"><ArrowLink href="/solutions">Explore Solutions</ArrowLink></div></article>
          </div>
        </section>

        <section aria-labelledby="research-heading" className="py-4">
          <Lightbulb aria-hidden="true" className="mb-6 h-6 w-6 text-[color:var(--accent)]" />
          <SectionHeading id="research-heading" eyebrow="Research & Development" title="Exploring what&apos;s next." description="Our R&D initiatives explore how emerging technologies can address real-world challenges across industries." />
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">These exploratory initiatives are not presented as released commercial products.</p>
          <div className="mt-5 flex flex-wrap gap-2">{researchAreas.map((area) => <span key={area} className="rounded-full border border-[var(--line)] bg-[color:var(--surface-soft)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)]">{area}</span>)}</div>
          <div className="mt-7"><ArrowLink href="/solutions">Explore Products &amp; R&amp;D</ArrowLink></div>
        </section>

        <section aria-labelledby="technology-heading">
          <SectionHeading id="technology-heading" eyebrow="Tech at ABCX" title="Built with modern technology." description="We select technologies based on the needs of each solution — considering scalability, security, performance, maintainability, and long-term sustainability." />
          <div className={styles.technologyMarquee}>
            <div className={styles.technologyViewport} tabIndex={0} role="region" aria-label="Technology showcase. Hover or focus to pause motion.">
              {[technologies].map((row, rowIndex) => (
                <div key={rowIndex} className={styles.technologyTrack}>
                  {[0, 1].map(copy => <div key={copy} className={styles.technologyGroup} aria-hidden={copy === 1 ? true : undefined}>
                    {row.map(technology => <div key={technology.slug} className={`${styles.technologyCard} flex min-h-24 flex-col items-center justify-center gap-3 rounded-xl bg-[color:var(--surface-strong)] p-3 text-center`}><technology.Icon role="img" aria-label={`${technology.name} logo`} size={30} className={technology.colorClass} /><span className="text-xs font-semibold text-[color:var(--foreground)]">{technology.name === "Amazon Web Services" ? technology.shortName : technology.name}</span></div>)}
                  </div>)}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7"><ArrowLink href="/technologies">Explore Tech at ABCX</ArrowLink></div>
        </section>

        <section aria-labelledby="process-heading" className="rounded-[2rem] border border-[var(--line)] bg-[color:var(--surface-strong)] px-5 py-8 shadow-[0_16px_42px_rgba(31,48,71,0.07)] sm:px-8 sm:py-10">
          <div className="flex justify-center text-center"><SectionHeading id="process-heading" eyebrow="How we engineer" title="Our Software Development Lifecycle" description="A structured approach from requirements to deployment and continuous improvement, with quality and security considered throughout the software lifecycle." /></div>
          <SdlcLifecycle />
        </section>

        <section aria-labelledby="training-heading" className="grid gap-7 bg-[color:var(--surface-soft)] px-5 py-8 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><GraduationCap aria-hidden="true" className="mb-5 h-7 w-7 text-[color:var(--accent)]" /><SectionHeading id="training-heading" eyebrow="Learn • Build • Grow" title="Training & Internship" description="Practical learning opportunities designed to help students and aspiring professionals gain exposure to modern technologies and real-world software development." /><div className="mt-6 flex flex-wrap gap-2">{programs.map((program) => <span key={program} className="rounded-full bg-[color:var(--surface-strong)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)]">{program}</span>)}</div></div>
          <ArrowLink href="/careers">Explore Programs</ArrowLink>
        </section>

        <section aria-labelledby="insights-heading">
          <SectionHeading id="insights-heading" eyebrow="Insights" title="Ideas, engineering & technology." />
          <div className="mt-8 bg-[color:var(--surface-soft)] px-5 py-6"><p className="font-semibold text-[color:var(--foreground)]">No published articles yet.</p><p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">New ABCX insights will appear here when they are published.</p></div>
          <div className="mt-6"><ArrowLink href="/insights">View All Blogs</ArrowLink></div>
        </section>

        <section className="rounded-2xl bg-[color:var(--surface-strong)] px-6 py-10 text-center shadow-[0_12px_32px_rgba(31,48,71,0.06)] sm:px-8 sm:py-12">
          <Network aria-hidden="true" className="mx-auto h-7 w-7 text-[color:var(--accent)]" /><p className="eyebrow mt-5 text-[color:var(--accent)]">Let&apos;s build together</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl">Have an idea?<br />Let&apos;s build what&apos;s next.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)]">Talk to AlphaBeastCodeX about your software, AI, cloud, or digital product requirements.</p><div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row"><Link href="/contact" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1320] hover:bg-[var(--accent-strong)]">Book Consultation</Link><Link href="/contact" className="rounded-full border border-[var(--line)] bg-[color:var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] hover:border-[color:var(--accent)]">Contact Us</Link></div>
        </section>
      </div>
    </SiteChrome>
  );
}
