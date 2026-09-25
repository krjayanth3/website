"use client";

import {
  Bot, Boxes,
  Code2, Eye, FileKey2, Fingerprint, Gauge, GitBranch,
  KeyRound, LifeBuoy, LockKeyhole, Network, RefreshCw, Rocket, Scale,
  ShieldCheck, Wrench,
} from "lucide-react";
import Link from "next/link";
import EngineeringProcess from "./engineering-process";
import styles from "./tech-at-abcx-page.module.css";

import TechnologyList from "./three/technology-list";
import Ecosystem, { type EcosystemItem } from "./three/ecosystem";
import { technologyCategories } from "./technologies-data";

const labelMap: Record<string, string> = {
  "AI & Machine Learning": "AI & ML",
  IoT: "IoT & Edge",
};

const categoryIcons: EcosystemItem["icon"][] = ["ai", "frontend", "backend", "mobile", "cloud", "devops", "backend", "data", "blockchain", "iot", "tools"];

const technologyGroups = technologyCategories;
const securityItems = [
  ["OWASP Practices", ShieldCheck], ["OAuth 2.0", KeyRound], ["JWT", FileKey2],
  ["Identity & Access Management", Fingerprint], ["API Security", Network],
  ["Secure Coding", Code2], ["DevSecOps", GitBranch], ["Data Protection", LockKeyhole],
] as const;

const principles = [
  ["Performance", "Build responsive and efficient systems with performance considered throughout the engineering lifecycle.", Gauge],
  ["Security", "Integrate security considerations into architecture, development, infrastructure, and operations.", ShieldCheck],
  ["Scalability", "Design systems that can evolve as workloads, users, data, and business requirements grow.", Boxes],
  ["Reliability", "Build resilient systems with appropriate monitoring, testing, recovery, and operational practices.", LifeBuoy],
  ["Maintainability", "Create understandable, modular, documented, and maintainable software.", Wrench],
  ["Observability", "Design systems with meaningful logging, monitoring, metrics, and operational visibility.", Eye],
  ["Automation", "Automate repeatable development, testing, deployment, and operational workflows where appropriate.", Bot],
  ["Continuous Improvement", "Iterate using feedback, data, operational insights, and evolving technology.", RefreshCw],
] as const;

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="max-w-3xl"><p className="eyebrow text-[color:var(--accent)]">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl lg:text-5xl">{title}</h2><p className="mt-4 text-base leading-8 text-[color:var(--muted)] sm:text-lg">{description}</p></header>;
}

export default function TechAtAbcxPage() {
  return (
    <div className="space-y-20 pb-4 sm:space-y-24">
      <div className="space-y-8 sm:space-y-10">
        <section aria-labelledby="tech-heading" className="py-3 text-center sm:py-4">
          <h1 id="tech-heading" className="text-4xl font-semibold tracking-[-0.045em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">Tech at ABCX</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">The technologies, tools, and engineering practices behind the solutions we design and build.</p>
        </section>

        <section aria-labelledby="ecosystem-heading">
          <p id="ecosystem-heading" className="eyebrow text-[color:var(--accent)]">Our technology ecosystem</p>
          <Ecosystem label="Technology ecosystem" center={"TECHNOLOGY\nECOSYSTEM"} caption="Engineering • Cloud • Data • AI" technologyPanel items={technologyGroups.map((group, index) => ({
            title: labelMap[group.title] ?? group.title,
            description: `${group.items.length} technologies in this category. Explore their official websites below.`,
            icon: categoryIcons[index],
            number: String(index + 1).padStart(2, "0"),
            content: <TechnologyList items={group.items} />,
          }))} />
        <p className="mt-5 text-xs leading-6 text-[color:var(--muted)]">All product names, logos, brands, trademarks, and registered trademarks are property of their respective owners. Their use on this website is for identification and informational purposes and does not imply endorsement or affiliation.</p>
        </section>
      </div>

      <section aria-labelledby="security-heading" className={styles.security}>
        <header className={styles.securityHeader}>
          <h2 id="security-heading">Security Standards &amp; Practices</h2>
          <p>Security considerations integrated throughout architecture, development, deployment, and operations.</p>
        </header>
        <ul className={styles.securityGrid}>
          {securityItems.map(([name, Icon]) => (
            <li key={name} className={styles.securityItem}>
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <EngineeringProcess />

      <section aria-labelledby="principles-heading"><Heading eyebrow="Built with purpose" title="Engineering Principles" description="Principles that guide how we approach software architecture, development, and technology decisions." /><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{principles.map(([name, description, Icon]) => <article key={name} className="rounded-[1.5rem] border border-[var(--line)] bg-[color:var(--surface-strong)] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:shadow-[0_16px_38px_rgba(31,48,71,0.1)] motion-reduce:transform-none"><Icon aria-hidden="true" className="h-6 w-6 text-[color:var(--accent)]" /><h3 className="mt-5 text-lg font-semibold text-[color:var(--foreground)]">{name}</h3><p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p></article>)}</div></section>

      <section className="rounded-[2.25rem] border border-[var(--line)] bg-[color:var(--surface-strong)] px-6 py-11 text-center shadow-[0_20px_55px_rgba(31,48,71,0.09)] sm:px-10 sm:py-14"><Scale aria-hidden="true" className="mx-auto h-7 w-7 text-[color:var(--accent)]" /><p className="eyebrow mt-5 text-[color:var(--accent)]">Our approach</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">The right technology for the right problem.</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)]">We evaluate technologies based on business requirements, scalability, security, maintainability, performance, ecosystem maturity, and long-term sustainability — rather than adopting technology simply because it is trending.</p></section>

      <section className="rounded-[2.25rem] border border-[var(--line)] bg-[color:var(--surface-strong)] px-6 py-10 text-center sm:px-10 sm:py-12"><Rocket aria-hidden="true" className="mx-auto h-7 w-7 text-[color:var(--accent)]" /><p className="eyebrow mt-5 text-[color:var(--accent)]">Build with ABCX</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">Have a technology challenge?</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">Let&apos;s explore the architecture, technologies, and engineering approach that can turn your idea into a scalable digital solution.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/contact" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1320] hover:bg-[var(--accent-strong)]">Book Consultation</Link><Link href="/services" className="rounded-full border border-[var(--line)] bg-[color:var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] hover:border-[color:var(--accent)]">Explore Services</Link></div></section>
    </div>
  );
}
