import Image from "next/image";
import Link from "next/link";

import SiteFrame from "./site-frame";
import type { LandingPageContent } from "./landing-page-content";

function getSocialMonogram(platform: string) {
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

export default function SiteChrome({
  content,
  activeHref,
  showFooter = true,
  mainClassName = "flex-1 pb-12 pt-24 sm:pt-28",
  children,
}: {
  content: LandingPageContent;
  activeHref: string;
  showFooter?: boolean;
  mainClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <SiteFrame content={content} activeHref={activeHref} shellClassName="pb-10">
      <main className={mainClassName}>{children}</main>

      {showFooter ? (
        <footer className="border-t border-[var(--line)] px-0 pt-8 sm:pt-10 lg:pt-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/abcx-logo-trimmed.png"
                  alt="ABCX logo"
                  width={44}
                  height={52}
                  className="h-11 w-auto object-contain"
                />
                <div className="min-w-0">
                  <p className="eyebrow text-[color:var(--secondary)]">
                    {content.footer.eyebrow}
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.04em] text-[color:var(--foreground)] sm:text-2xl">
                    {content.companyName}
                  </p>
                </div>
              </Link>

              <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
                {content.footer.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-[color:var(--secondary)]">
                  {content.footer.companyTag}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-strong)]"
                >
                  {content.footer.cta}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <p className="detail-label text-[color:var(--secondary)]">
                {content.footer.serviceFocusTitle}
              </p>
              <div className="space-y-3">
                {content.footer.serviceFocus.map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    className="block text-sm font-medium leading-7 text-[color:var(--foreground)] transition-colors hover:text-[var(--accent)]"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="detail-label text-[color:var(--secondary)]">
                {content.footer.contactTitle}
              </p>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                {content.footer.contactLabel}
              </p>
              <div className="space-y-3">
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="block text-sm font-medium leading-7 text-[color:var(--foreground)] transition-opacity hover:opacity-80"
                >
                  {content.contactEmail}
                </a>
                <a
                  href={`tel:${content.contactPhone}`}
                  className="block text-sm font-medium leading-7 text-[color:var(--foreground)] transition-opacity hover:opacity-80"
                >
                  {content.contactPhone}
                </a>
              </div>
              <div className="space-y-3 pt-2">
                <p className="detail-label text-[color:var(--secondary)]">
                  {content.footer.socialLinksTitle}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                  {content.footer.socialLinks.map((link) => {
                    const socialMonogram = getSocialMonogram(link.platform);
                    const socialLabel = (
                      <>
                        <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--secondary)]">
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
                          className="inline-flex items-center gap-2 text-[color:var(--muted)]"
                        >
                          {socialLabel}
                        </span>
                      );
                    }

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[color:var(--foreground)] transition-colors hover:text-[var(--accent)]"
                      >
                        {socialLabel}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-2 text-sm leading-7 text-[color:var(--muted)] lg:flex-row lg:items-center lg:justify-between">
            <p>{content.footer.note}</p>
            <p>{content.footer.legal}</p>
          </div>
        </footer>
      ) : null}
    </SiteFrame>
  );
}
