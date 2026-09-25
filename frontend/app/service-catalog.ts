import {
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CloudCog,
  CodeXml,
  GraduationCap,
  MonitorCog,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceCatalogItem = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
};

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "Design, deploy, and manage secure, scalable, and reliable cloud infrastructure.",
    icon: CloudCog,
    capabilities: ["Cloud architecture", "Infrastructure automation", "Platform reliability"],
  },
  {
    slug: "security-compliance",
    title: "Security & Compliance",
    description:
      "Protect applications, infrastructure, data, and digital assets with robust security solutions.",
    icon: ShieldCheck,
    capabilities: ["Application security", "Risk assessment", "Compliance readiness"],
  },
  {
    slug: "data-ai",
    title: "Data & AI",
    description:
      "Transform data into actionable insights with AI, machine learning, analytics, and intelligent automation.",
    icon: BrainCircuit,
    capabilities: ["AI solutions", "Data platforms", "Intelligent automation"],
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    description:
      "Build production-ready digital products from idea and architecture to development, testing, and deployment.",
    icon: CodeXml,
    capabilities: ["Product strategy", "Software engineering", "Quality and release"],
  },
  {
    slug: "web-mobile-development",
    title: "Web & Mobile Development",
    description:
      "Build modern websites, web applications, e-commerce platforms, and mobile experiences.",
    icon: PanelsTopLeft,
    capabilities: ["Web applications", "Mobile experiences", "E-commerce platforms"],
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    description:
      "Develop enterprise applications, APIs, integrations, workflows, and business automation solutions.",
    icon: Building2,
    capabilities: ["Enterprise applications", "API integration", "Workflow automation"],
  },
  {
    slug: "managed-it-services",
    title: "Managed IT Services",
    description:
      "Keep technology running reliably with proactive monitoring, maintenance, optimization, and technical support.",
    icon: MonitorCog,
    capabilities: ["Proactive monitoring", "System maintenance", "Technical support"],
  },
  {
    slug: "business-technology-consulting",
    title: "Business & Technology Consulting",
    description:
      "Create practical technology strategies, architectures, modernization plans, and digital transformation roadmaps.",
    icon: ChartNoAxesCombined,
    capabilities: ["Technology strategy", "Architecture planning", "Modernization roadmaps"],
  },
  {
    slug: "training-internship",
    title: "Training & Internship",
    description:
      "Industry-focused training, internships, and hands-on learning programs designed to build practical technology skills and real-world experience.",
    icon: GraduationCap,
    capabilities: [
      "Internships",
      "Technical training",
      "Workshops",
      "Skill development programs",
      "Academic project guidance",
      "Mentorship",
      "Hands-on learning",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}
