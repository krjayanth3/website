export const siteNavigationItems = [
  { label: "About us", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Tech at ABCX", href: "/technologies" },
  { label: "Blogs", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteHeaderNavigationItems = [
  { label: "Home", href: "/", kind: "link" },
  { label: "Services", href: "/services", kind: "link" },
  { label: "Products", href: "/solutions", kind: "link" },
  { label: "Tech at ABCX", href: "/technologies", kind: "link" },
  { label: "About", href: "/company", kind: "link" },
  { label: "Blogs", href: "/insights", kind: "link" },
  { label: "Book Consultation", href: "/contact", kind: "cta" },
] as const;

export type SitePageSlug =
  | "company"
  | "services"
  | "solutions"
  | "industries"
  | "technologies"
  | "insights"
  | "careers"
  | "contact";

export const sitePageSlugs = siteNavigationItems.map((item) =>
  item.href.replace("/", "")
) as SitePageSlug[];

export const legacyHeaderHrefMap = {
  "#company": "/company",
  "#services": "/services",
  "#solutions": "/solutions",
  "#industries": "/industries",
  "#technologies": "/technologies",
  "#insights": "/insights",
  "#careers": "/careers",
  "#contact": "/contact",
} as const;

export const sitePageMetadata: Record<
  SitePageSlug,
  { title: string; description: string }
> = {
  company: {
    title: "About AlphaBeastCodeX (ABCX)",
    description:
      "Learn about AlphaBeastCodeX (ABCX), our approach to software engineering, technology innovation, research, intelligent systems, and practical digital solutions.",
  },
  services: {
    title: "Services",
    description:
      "Explore AlphaBeastCodeX services across AI, software engineering, cloud, mobile, cybersecurity, integration, and support.",
  },
  solutions: {
    title: "Products & R&D",
    description:
      "Explore AlphaBeastCodeX software solutions and research initiatives across AI, education, healthcare, agriculture, cybersecurity, cloud, IoT, blockchain, enterprise technology, and intelligent automation.",
  },
  industries: {
    title: "Industries",
    description:
      "Review the industries AlphaBeastCodeX supports with practical software, AI, automation, and platform delivery.",
  },
  technologies: {
    title: "Tech at ABCX",
    description:
      "Explore the technologies, engineering practices, cloud platforms, AI frameworks, development tools, and software engineering approach used at AlphaBeastCodeX.",
  },
  insights: {
    title: "ABCX Insights",
    description:
      "Explore insights from AlphaBeastCodeX on software engineering, artificial intelligence, cloud, cybersecurity, data, and emerging technologies.",
  },
  careers: {
    title: "Careers",
    description:
      "Explore careers at AlphaBeastCodeX and learn about the kind of teammates, builders, and operators we value.",
  },
  contact: {
    title: "Contact",
    description:
      "Contact AlphaBeastCodeX to discuss software development, AI workflows, product delivery, modernization, and support.",
  },
};
