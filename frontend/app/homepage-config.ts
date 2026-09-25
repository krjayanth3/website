import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BriefcaseBusiness,
  CloudCog,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers3,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sprout,
  Workflow,
} from "lucide-react";

export const homepageServiceIconMap: Record<
  string,
  { Icon: LucideIcon; accentClass: string }
> = {
  "AI & Generative AI": {
    Icon: Bot,
    accentClass: "from-[var(--accent-soft)] to-transparent",
  },
  "Software Development": {
    Icon: Layers3,
    accentClass: "from-[var(--secondary-soft)] to-transparent",
  },
  "Web Development": {
    Icon: Workflow,
    accentClass: "from-[var(--accent-soft)] to-transparent",
  },
  "Mobile App Development": {
    Icon: Smartphone,
    accentClass: "from-[var(--secondary-soft)] to-transparent",
  },
  "Cloud & DevOps": {
    Icon: CloudCog,
    accentClass: "from-[var(--accent-soft)] to-transparent",
  },
  Cybersecurity: {
    Icon: ShieldCheck,
    accentClass: "from-[var(--secondary-soft)] to-transparent",
  },
};

export const homepageIndustryDescriptions: Record<string, string> = {
  "Banking, Finance & Insurance": "Core systems built for trust and control.",
  "Education & EdTech": "Digital learning made smarter.",
  "Energy, Utilities & Telecom": "Infrastructure data turned into action.",
  "Healthcare & Life Sciences": "Technology that improves patient care.",
  "Logistics & Supply Chain": "Operations made visible from end to end.",
  "Manufacturing & Industrial": "Systems that keep production moving.",
  "Media, Entertainment & OTT": "Content platforms built for scale.",
  "Public Sector & Smart Cities": "Digital services designed for real communities.",
  "Real Estate & PropTech": "Property workflows simplified across teams.",
  "Retail & E-commerce": "Commerce experiences tuned for conversion.",
  "Agriculture & Agritech": "Smart solutions for modern farming.",
  "Travel, Hospitality & Leisure": "Guest journeys shaped with better systems.",
};

export const homepageIndustryIconMap: Record<
  string,
  { Icon: LucideIcon; accentClass: string }
> = {
  "Education & EdTech": {
    Icon: GraduationCap,
    accentClass: "text-[var(--secondary)]",
  },
  "Healthcare & Life Sciences": {
    Icon: HeartPulse,
    accentClass: "text-[var(--accent)]",
  },
  "Agriculture & Agritech": {
    Icon: Sprout,
    accentClass: "text-[var(--secondary)]",
  },
  "Banking, Finance & Insurance": {
    Icon: BriefcaseBusiness,
    accentClass: "text-[var(--accent)]",
  },
  "Retail & E-commerce": {
    Icon: ShoppingBag,
    accentClass: "text-[var(--accent)]",
  },
  "Manufacturing & Industrial": {
    Icon: Factory,
    accentClass: "text-[var(--secondary)]",
  },
};

export const homepageWhyAbcxItems = [
  {
    title: "Senior-led delivery",
    description: "Decisions stay close to the work.",
  },
  {
    title: "Transparent communication",
    description: "Risks and tradeoffs stay visible.",
  },
  {
    title: "Scalable architecture",
    description: "Systems are shaped for what comes next.",
  },
  {
    title: "Security-first approach",
    description: "Protection is built into the design.",
  },
  {
    title: "Long-term partnership",
    description: "Support continues after launch.",
  },
] as const;
