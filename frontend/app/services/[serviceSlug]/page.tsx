import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLandingPageContent } from "../../site-content";
import { getServiceBySlug, serviceCatalog } from "../../service-catalog";
import SiteChrome from "../../site-chrome";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  return service
    ? { title: service.title, description: service.description }
    : {};
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const content = await getLandingPageContent();
  const Icon = service.icon;

  return (
    <SiteChrome content={content} activeHref="/services">
      <article className="mx-auto max-w-5xl py-4 sm:py-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All services
        </Link>

        <div className="mt-6 rounded-[2.25rem] border border-[var(--line)] bg-[color:var(--surface-strong)] p-7 shadow-[0_24px_70px_rgba(31,48,71,0.1)] sm:p-10 lg:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-[color:var(--surface-soft)] text-[color:var(--accent)]">
            <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <p className="eyebrow mt-7 text-[color:var(--accent)]">Service</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            {service.description}
          </p>

          <section aria-labelledby="capabilities-heading" className="mt-10 border-t border-[var(--line)] pt-8">
            <h2 id="capabilities-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              Capabilities
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-3 rounded-2xl bg-[color:var(--surface-soft)] px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[color:var(--accent)]" />
                  {capability}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </SiteChrome>
  );
}
