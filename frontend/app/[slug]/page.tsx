import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SitePageView from "../site-page-view";
import { getLandingPageContent } from "../site-content";
import { sitePageMetadata, sitePageSlugs } from "../site-routes";
import type { SitePageSlug } from "../site-routes";

export const dynamic = "force-dynamic";

function isSitePageSlug(value: string): value is SitePageSlug {
  return sitePageSlugs.includes(value as SitePageSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isSitePageSlug(slug)) {
    return {};
  }

  return {
    title: sitePageMetadata[slug].title,
    description: sitePageMetadata[slug].description,
  };
}

export async function generateStaticParams() {
  return sitePageSlugs.map((slug) => ({ slug }));
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isSitePageSlug(slug)) {
    notFound();
  }

  const content = await getLandingPageContent();

  return <SitePageView slug={slug} content={content} />;
}
