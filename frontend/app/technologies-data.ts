import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import {
  SiAngular,
  SiApachekafka,
  SiArduino,
  SiDjango,
  SiDocker,
  SiEspressif,
  SiEthereum,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiGooglecloud,
  SiJenkins,
  SiKotlin,
  SiKubernetes,
  SiLangchain,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPytorch,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSqlite,
  SiSolidity,
  SiSpringboot,
  SiSwift,
  SiTensorflow,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandAzure, TbBrandOpenai } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

import { PowerBiLogo } from "./technology-logos";

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export type TechnologyItem = {
  slug: string;
  name: string;
  shortName?: string;
  href: string;
  Icon: IconType;
  colorClass: string;
  overview: string;
  commonUses: string[];
  ecosystem: string[];
  whyWeUse: string[];
  projectHref: string;
};

export type TechnologyCategory = {
  title: string;
  accentClass: string;
  items: TechnologyItem[];
};

export type TechnologySelection = TechnologyItem & {
  categoryTitle: string;
  accentClass: string;
};

export type TechnologyDetail = TechnologySelection & {
  id: string;
  category: string;
  description: string;
  useCases: string[];
  advantages: string[];
  disadvantages: string[];
  relatedTools: string[];
  relatedService: string;
  relatedServiceHref: string;
  officialUrl: string;
};

export type TechnologyDetailCategory = {
  title: string;
  accentClass: string;
  items: TechnologyDetail[];
};

function technology(
  item: Omit<TechnologyItem, "slug" | "projectHref"> & { projectHref?: string }
): TechnologyItem {
  return {
    ...item,
    slug: toSlug(item.name),
    projectHref: item.projectHref ?? "/solutions#featured-work",
  };
}

export const technologiesSectionContent = {
  title: "Technologies We Use",
  subtitle: "Chosen for delivery fit, maintainability, and scale.",
  defaultTechnologySlug: "java",
} as const;

export const technologyCategories = [
  {
    title: "AI & Machine Learning",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "OpenAI",
        href: "https://openai.com/",
        Icon: TbBrandOpenai,
        colorClass: "text-[#10a37f]",
        overview:
          "OpenAI helps us design copilots, retrieval assistants, and workflow automation that produce useful output while still leaving room for human review.",
        commonUses: [
          "AI copilots",
          "Support assistants",
          "Document intelligence",
          "Structured content generation",
        ],
        ecosystem: [
          "GPT models",
          "Function calling",
          "Embeddings",
          "Evals and prompt workflows",
        ],
        whyWeUse: [
          "Strong model quality",
          "Reliable API patterns",
          "Fast prototyping",
          "Good multimodal roadmap",
        ],
      }),
      technology({
        name: "Google Gemini",
        href: "https://deepmind.google/models/gemini/",
        Icon: SiGooglegemini,
        colorClass: "text-[#7c4dff]",
        overview:
          "Gemini gives us another strong multimodal option when teams need long-context reasoning, document understanding, or Google Cloud-aligned AI delivery.",
        commonUses: [
          "Multimodal assistants",
          "Knowledge search",
          "Long-context summarization",
          "AI workflow orchestration",
        ],
        ecosystem: [
          "Gemini API",
          "Vertex AI",
          "Function calling",
          "Long-context prompts",
        ],
        whyWeUse: [
          "Strong multimodal capability",
          "Cloud-native alignment",
          "Flexible deployment paths",
          "Useful long-context handling",
        ],
      }),
      technology({
        name: "TensorFlow",
        href: "https://www.tensorflow.org/",
        Icon: SiTensorflow,
        colorClass: "text-[#ff6f00]",
        overview:
          "TensorFlow supports production ML pipelines where training, model serving, and edge delivery need to fit into a governed enterprise workflow.",
        commonUses: [
          "Model training",
          "Predictive systems",
          "Edge inference",
          "Production ML pipelines",
        ],
        ecosystem: [
          "Keras",
          "TensorFlow Lite",
          "TensorFlow Serving",
          "TFX",
        ],
        whyWeUse: [
          "Mature ML tooling",
          "Production readiness",
          "Good edge support",
          "Strong ecosystem depth",
        ],
      }),
      technology({
        name: "PyTorch",
        href: "https://pytorch.org/",
        Icon: SiPytorch,
        colorClass: "text-[#ee4c2c]",
        overview:
          "PyTorch is a strong fit when experimentation, custom model work, and modern deep-learning workflows need to move quickly into real delivery.",
        commonUses: [
          "Deep learning models",
          "Computer vision",
          "NLP systems",
          "Model experimentation",
        ],
        ecosystem: [
          "TorchServe",
          "PyTorch Lightning",
          "Hugging Face",
          "ONNX export",
        ],
        whyWeUse: [
          "Flexible research workflow",
          "Developer-friendly APIs",
          "Fast model iteration",
          "Strong community adoption",
        ],
      }),
      technology({
        name: "LangChain",
        href: "https://www.langchain.com/",
        Icon: SiLangchain,
        colorClass: "text-[#1c3d5a]",
        overview:
          "LangChain helps us orchestrate LLM applications where prompts, tools, retrieval, and conversation state all need to work together cleanly.",
        commonUses: [
          "RAG applications",
          "AI agents",
          "Tool-using assistants",
          "Workflow chaining",
        ],
        ecosystem: [
          "Chains",
          "Retrievers",
          "Agents",
          "LangSmith workflows",
        ],
        whyWeUse: [
          "Speeds up LLM assembly",
          "Good tool integration",
          "Useful RAG patterns",
          "Clear orchestration model",
        ],
      }),
      technology({
        name: "scikit-learn",
        href: "https://scikit-learn.org/stable/",
        Icon: SiScikitlearn,
        colorClass: "text-[#f7931e]",
        overview: "scikit-learn provides dependable machine-learning tools for predictive analysis, model evaluation, and practical data science workflows.",
        commonUses: ["Predictive modeling", "Classification", "Regression", "Model evaluation"],
        ecosystem: ["NumPy", "SciPy", "pandas", "Joblib"],
        whyWeUse: ["Mature algorithms", "Consistent APIs", "Strong documentation", "Reliable Python integration"],
      }),
      technology({
        name: "OpenCV",
        href: "https://opencv.org/",
        Icon: SiOpencv,
        colorClass: "text-[#5c3ee8]",
        overview: "OpenCV provides a mature computer-vision toolkit for image processing, video analysis, and real-time visual applications.",
        commonUses: ["Image processing", "Computer vision", "Video analysis", "Object detection"],
        ecosystem: ["Python and C++ APIs", "DNN module", "Camera pipelines", "Edge deployment"],
        whyWeUse: ["Broad algorithm coverage", "Cross-platform support", "Realtime performance", "Mature open-source ecosystem"],
      }),
    ],
  },
  {
    title: "Frontend",
    accentClass: "from-[var(--secondary-soft)] to-transparent",
    items: [
      technology({
        name: "React",
        href: "https://react.dev/",
        Icon: SiReact,
        colorClass: "text-[#61dafb]",
        overview:
          "React gives us a flexible component model for building fast interfaces that stay maintainable as products grow in complexity.",
        commonUses: [
          "Web applications",
          "Internal dashboards",
          "Design systems",
          "Interactive portals",
        ],
        ecosystem: [
          "Next.js",
          "React Router",
          "TanStack Query",
          "Vite",
        ],
        whyWeUse: [
          "Reusable UI architecture",
          "Large ecosystem",
          "Strong hiring market",
          "Scales well across teams",
        ],
      }),
      technology({
        name: "Next.js",
        href: "https://nextjs.org/",
        Icon: SiNextdotjs,
        colorClass: "text-[color:var(--foreground)]",
        overview:
          "Next.js helps us ship polished frontend experiences with strong performance, SEO, server rendering, and clean product structure.",
        commonUses: [
          "Corporate websites",
          "Product frontends",
          "SEO landing pages",
          "Customer portals",
        ],
        ecosystem: [
          "App Router",
          "Server Components",
          "Server Actions",
          "Incremental rendering",
        ],
        whyWeUse: [
          "Excellent performance model",
          "SEO-friendly defaults",
          "Strong developer experience",
          "Works well with React teams",
        ],
      }),
      technology({
        name: "Angular",
        href: "https://angular.dev/",
        Icon: SiAngular,
        colorClass: "text-[#dd0031]",
        overview:
          "Angular is a dependable choice for structured enterprise frontends that benefit from strong conventions, typing, and predictable architecture.",
        commonUses: [
          "Enterprise portals",
          "Operational dashboards",
          "Admin systems",
          "Large-team SPAs",
        ],
        ecosystem: [
          "Angular CLI",
          "RxJS",
          "NgRx",
          "Angular Material",
        ],
        whyWeUse: [
          "Opinionated structure",
          "Good for larger teams",
          "Strong TypeScript fit",
          "Consistent delivery patterns",
        ],
      }),
      technology({
        name: "Vue.js",
        href: "https://vuejs.org/",
        Icon: SiVuedotjs,
        colorClass: "text-[#42b883]",
        overview:
          "Vue.js works well when teams want a lightweight, approachable frontend stack without giving up clarity or component-driven delivery.",
        commonUses: [
          "Web portals",
          "Marketing sites",
          "Operations tools",
          "Gradual frontend upgrades",
        ],
        ecosystem: [
          "Nuxt",
          "Pinia",
          "Vue Router",
          "Vite",
        ],
        whyWeUse: [
          "Approachable learning curve",
          "Clean component model",
          "Flexible integration",
          "Fast team onboarding",
        ],
      }),
      technology({
        name: "TypeScript",
        href: "https://www.typescriptlang.org/",
        Icon: SiTypescript,
        colorClass: "text-[#3178c6]",
        overview: "TypeScript adds static types to JavaScript so larger frontend applications remain easier to understand, refactor, and maintain.",
        commonUses: ["Web applications", "Design systems", "Shared libraries", "Full-stack JavaScript"],
        ecosystem: ["JavaScript", "React", "Node.js", "Editor tooling"],
        whyWeUse: ["Safer refactoring", "Better tooling", "Clearer contracts", "Scales across teams"],
      }),
      technology({
        name: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        Icon: SiTailwindcss,
        colorClass: "text-[#06b6d4]",
        overview: "Tailwind CSS supports fast, consistent interface development through composable utility classes and a configurable design system.",
        commonUses: ["Responsive interfaces", "Design systems", "Product websites", "Application UI"],
        ecosystem: ["Utility classes", "Theme configuration", "Responsive variants", "Build-time optimization"],
        whyWeUse: ["Fast UI delivery", "Consistent styling", "Small production output", "Flexible design tokens"],
      }),
    ],
  },
  {
    title: "Backend",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "Java",
        href: "https://www.java.com/",
        Icon: FaJava,
        colorClass: "text-[#f89820]",
        overview:
          "Java is a high-performance, object-oriented language we use for enterprise applications, backend systems, cloud-native services, and integration-heavy platforms.",
        commonUses: [
          "Enterprise applications",
          "REST APIs",
          "Microservices",
          "Banking and ERP systems",
        ],
        ecosystem: [
          "Spring Boot",
          "Hibernate",
          "Maven",
          "Gradle",
        ],
        whyWeUse: [
          "High performance",
          "Secure platform model",
          "Scales well in production",
          "Strong enterprise ecosystem",
        ],
      }),
      technology({
        name: "Spring Boot",
        href: "https://spring.io/projects/spring-boot",
        Icon: SiSpringboot,
        colorClass: "text-[#6db33f]",
        overview:
          "Spring Boot gives Java teams a practical way to launch secure, production-ready services without spending weeks on framework plumbing.",
        commonUses: [
          "Microservices",
          "Business APIs",
          "Internal platforms",
          "Integration services",
        ],
        ecosystem: [
          "Spring Data",
          "Spring Security",
          "Actuator",
          "Spring Cloud",
        ],
        whyWeUse: [
          "Fast service setup",
          "Strong security tooling",
          "Clear conventions",
          "Production observability",
        ],
      }),
      technology({
        name: "Python",
        href: "https://www.python.org/",
        Icon: SiPython,
        colorClass: "text-[#3776ab]",
        overview:
          "Python connects application delivery with AI, data, and automation work, making it a practical language for both fast prototypes and robust services.",
        commonUses: [
          "AI services",
          "Automation workflows",
          "Data pipelines",
          "Backend APIs",
        ],
        ecosystem: [
          "Django",
          "FastAPI",
          "Celery",
          "Pandas",
        ],
        whyWeUse: [
          "Excellent AI alignment",
          "Readable codebase",
          "Fast development speed",
          "Rich library ecosystem",
        ],
      }),
      technology({
        name: "Django",
        href: "https://www.djangoproject.com/",
        Icon: SiDjango,
        colorClass: "text-[#092e20]",
        overview:
          "Django helps us deliver secure, feature-rich web systems quickly when teams need batteries-included backend foundations and strong admin capability.",
        commonUses: [
          "Business web apps",
          "Admin platforms",
          "Content-heavy systems",
          "Workflow portals",
        ],
        ecosystem: [
          "Django REST Framework",
          "ORM",
          "Admin panel",
          "Celery",
        ],
        whyWeUse: [
          "Rapid delivery",
          "Built-in admin tooling",
          "Strong security defaults",
          "Mature community support",
        ],
      }),
      technology({
        name: "FastAPI",
        href: "https://fastapi.tiangolo.com/",
        Icon: SiFastapi,
        colorClass: "text-[#009688]",
        overview:
          "FastAPI is a strong fit for typed, high-speed APIs where performance, async behavior, and clean documentation all matter from day one.",
        commonUses: [
          "AI backends",
          "Async APIs",
          "Internal services",
          "Data-serving platforms",
        ],
        ecosystem: [
          "Pydantic",
          "Uvicorn",
          "OpenAPI",
          "SQLModel",
        ],
        whyWeUse: [
          "Fast runtime performance",
          "Excellent API docs",
          "Modern typing model",
          "Clean async support",
        ],
      }),
      technology({
        name: "Flask",
        href: "https://flask.palletsprojects.com/",
        Icon: SiFlask,
        colorClass: "text-[#000000]",
        overview:
          "Flask is a lightweight Python web framework suited to focused APIs, web services, and applications that benefit from a flexible architecture.",
        commonUses: [
          "Web APIs",
          "Backend services",
          "Internal tools",
          "Lightweight web applications",
        ],
        ecosystem: [
          "Werkzeug",
          "Jinja",
          "Flask extensions",
          "WSGI deployment",
        ],
        whyWeUse: [
          "Flexible architecture",
          "Fast development",
          "Strong Python ecosystem",
          "Good fit for focused services",
        ],
      }),
      technology({
        name: "Node.js",
        href: "https://nodejs.org/",
        Icon: SiNodedotjs,
        colorClass: "text-[#5fa04e]",
        overview:
          "Node.js helps us build event-driven services and JavaScript-native backends that fit naturally with modern web product teams.",
        commonUses: [
          "Realtime services",
          "APIs and BFFs",
          "Automation endpoints",
          "Integration layers",
        ],
        ecosystem: [
          "Express",
          "NestJS",
          "Prisma",
          "Socket.IO",
        ],
        whyWeUse: [
          "One-language web stack",
          "Fast iteration",
          "Good event handling",
          "Large package ecosystem",
        ],
      }),
      technology({
        name: "Express.js",
        href: "https://expressjs.com/",
        Icon: SiExpress,
        colorClass: "text-[#111111]",
        overview: "Express.js provides a focused Node.js foundation for web APIs, middleware pipelines, and server-side applications.",
        commonUses: ["Web APIs", "Backend services", "Middleware", "Integration endpoints"],
        ecosystem: ["Node.js", "Routing", "Middleware", "Template engines"],
        whyWeUse: ["Minimal core", "Large ecosystem", "Flexible architecture", "Fast API development"],
      }),
      technology({
        name: "Laravel",
        href: "https://laravel.com/",
        Icon: SiLaravel,
        colorClass: "text-[#ff2d20]",
        overview:
          "Laravel is useful when teams need a clear, productive PHP backend with elegant conventions and fast paths to stable business features.",
        commonUses: [
          "Business systems",
          "Customer portals",
          "API backends",
          "Operations workflows",
        ],
        ecosystem: [
          "Eloquent",
          "Blade",
          "Sanctum",
          "Queues",
        ],
        whyWeUse: [
          "Strong delivery speed",
          "Clean conventions",
          "Good CRUD ergonomics",
          "Mature PHP ecosystem",
        ],
      }),
    ],
  },
  {
    title: "Mobile",
    accentClass: "from-[var(--secondary-soft)] to-transparent",
    items: [
      technology({
        name: "Flutter",
        href: "https://flutter.dev/",
        Icon: SiFlutter,
        colorClass: "text-[#02569b]",
        overview:
          "Flutter helps us deliver polished cross-platform apps when teams want one codebase without giving up visual control or shipping speed.",
        commonUses: [
          "Business mobile apps",
          "Customer-facing apps",
          "Field operations tools",
          "Internal companion apps",
        ],
        ecosystem: [
          "Dart",
          "Firebase",
          "State management",
          "Plugin ecosystem",
        ],
        whyWeUse: [
          "Single codebase delivery",
          "Fast UI iteration",
          "Good performance",
          "Consistent design control",
        ],
      }),
      technology({
        name: "React Native",
        href: "https://reactnative.dev/",
        Icon: SiReact,
        colorClass: "text-[#61dafb]",
        overview:
          "React Native works well for mobile products where shared frontend knowledge, faster release cycles, and native-feeling interfaces all matter.",
        commonUses: [
          "Cross-platform apps",
          "MVP mobile products",
          "Internal apps",
          "Customer service apps",
        ],
        ecosystem: [
          "Expo",
          "React Navigation",
          "Native modules",
          "State management",
        ],
        whyWeUse: [
          "Shared React talent",
          "Shorter delivery cycles",
          "Good code reuse",
          "Solid product flexibility",
        ],
      }),
      technology({
        name: "Kotlin",
        href: "https://kotlinlang.org/",
        Icon: SiKotlin,
        colorClass: "text-[#7f52ff]",
        overview:
          "Kotlin is our go-to when Android delivery needs modern language safety, great tooling, and a clean path into native mobile performance.",
        commonUses: [
          "Android apps",
          "Native integrations",
          "Business mobility",
          "Device-side workflows",
        ],
        ecosystem: [
          "Jetpack",
          "Coroutines",
          "Compose",
          "Ktor",
        ],
        whyWeUse: [
          "Concise code",
          "Safer language features",
          "Strong Android support",
          "Modern ecosystem",
        ],
      }),
      technology({
        name: "Swift",
        href: "https://www.swift.org/",
        Icon: SiSwift,
        colorClass: "text-[#f05138]",
        overview:
          "Swift lets us build native Apple experiences where performance, platform APIs, and refined interaction details need to feel first-class.",
        commonUses: [
          "iOS applications",
          "Native Apple workflows",
          "Premium mobile UX",
          "Platform-specific features",
        ],
        ecosystem: [
          "SwiftUI",
          "UIKit",
          "Combine",
          "XCTest",
        ],
        whyWeUse: [
          "Native Apple performance",
          "Access to platform features",
          "Strong UX quality",
          "Reliable tooling",
        ],
      }),
    ],
  },
  {
    title: "Cloud",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "Amazon Web Services",
        shortName: "AWS",
        href: "https://aws.amazon.com/",
        Icon: FaAws,
        colorClass: "text-[#ff9900]",
        overview:
          "AWS gives us a broad cloud platform for scaling products, hosting services, and connecting infrastructure patterns that need to stay reliable under growth.",
        commonUses: [
          "Cloud migration",
          "API hosting",
          "Storage and backup",
          "Scalable production environments",
        ],
        ecosystem: [
          "EC2",
          "Lambda",
          "RDS",
          "S3",
        ],
        whyWeUse: [
          "Huge service breadth",
          "Battle-tested reliability",
          "Strong scaling options",
          "Global ecosystem support",
        ],
      }),
      technology({
        name: "Microsoft Azure",
        shortName: "Azure",
        href: "https://azure.microsoft.com/",
        Icon: TbBrandAzure,
        colorClass: "text-[#0078d4]",
        overview:
          "Azure is a strong fit for organizations already invested in Microsoft tooling, identity, and enterprise governance requirements.",
        commonUses: [
          "Enterprise hosting",
          "Identity-aware platforms",
          "Hybrid cloud delivery",
          "Business application modernization",
        ],
        ecosystem: [
          "App Service",
          "Functions",
          "Azure SQL",
          "Entra ID",
        ],
        whyWeUse: [
          "Enterprise Microsoft alignment",
          "Strong identity tooling",
          "Hybrid-cloud flexibility",
          "Governance-friendly services",
        ],
      }),
      technology({
        name: "Google Cloud Platform",
        shortName: "Google Cloud",
        href: "https://cloud.google.com/",
        Icon: SiGooglecloud,
        colorClass: "text-[#4285f4]",
        overview:
          "Google Cloud is especially useful when data, container platforms, and AI-adjacent services need to work together cleanly at scale.",
        commonUses: [
          "Data platforms",
          "Containerized services",
          "AI workloads",
          "Cloud-native product hosting",
        ],
        ecosystem: [
          "Cloud Run",
          "GKE",
          "BigQuery",
          "Vertex AI",
        ],
        whyWeUse: [
          "Strong analytics stack",
          "Clean container workflows",
          "Useful AI platform services",
          "Good developer ergonomics",
        ],
      }),
    ],
  },
  {
    title: "DevOps",
    accentClass: "from-[var(--secondary-soft)] to-transparent",
    items: [
      technology({
        name: "Docker",
        href: "https://www.docker.com/",
        Icon: SiDocker,
        colorClass: "text-[#2496ed]",
        overview:
          "Docker helps us package software consistently so environments stay predictable from local development through testing and production release.",
        commonUses: [
          "Containerized apps",
          "Developer environments",
          "Service packaging",
          "Deployment standardization",
        ],
        ecosystem: [
          "Docker Compose",
          "Registries",
          "Build pipelines",
          "Container images",
        ],
        whyWeUse: [
          "Environment parity",
          "Portable delivery units",
          "Faster onboarding",
          "Clean deployment workflows",
        ],
      }),
      technology({
        name: "Kubernetes",
        href: "https://kubernetes.io/",
        Icon: SiKubernetes,
        colorClass: "text-[#326ce5]",
        overview:
          "Kubernetes gives us orchestration control when applications need resilient scaling, predictable rollouts, and clearer production operations.",
        commonUses: [
          "Container orchestration",
          "Service scaling",
          "Blue-green rollouts",
          "Platform operations",
        ],
        ecosystem: [
          "Helm",
          "Ingress",
          "Prometheus",
          "Argo CD",
        ],
        whyWeUse: [
          "Scales services reliably",
          "Supports resilient deployments",
          "Platform portability",
          "Strong ops control",
        ],
      }),
      technology({
        name: "GitHub Actions",
        href: "https://github.com/features/actions",
        Icon: SiGithubactions,
        colorClass: "text-[#2088ff]",
        overview:
          "GitHub Actions keeps CI/CD close to the codebase so teams can automate builds, tests, security checks, and deployments with less overhead.",
        commonUses: [
          "Continuous integration",
          "Release automation",
          "Deployment workflows",
          "Quality checks",
        ],
        ecosystem: [
          "Workflows",
          "Environments",
          "Secrets",
          "Matrix builds",
        ],
        whyWeUse: [
          "Repo-native automation",
          "Fast setup",
          "Good visibility",
          "Flexible integrations",
        ],
      }),
      technology({
        name: "Jenkins",
        href: "https://www.jenkins.io/",
        Icon: SiJenkins,
        colorClass: "text-[#d24939]",
        overview:
          "Jenkins remains useful in delivery environments that require self-hosted CI, deep customization, or tighter integration with existing enterprise systems.",
        commonUses: [
          "Legacy CI pipelines",
          "Self-hosted automation",
          "Custom deployment flows",
          "Enterprise release control",
        ],
        ecosystem: [
          "Pipeline as code",
          "Agents",
          "Plugin ecosystem",
          "Shared libraries",
        ],
        whyWeUse: [
          "Very flexible automation",
          "Strong legacy integration",
          "Self-hosting control",
          "Mature pipeline tooling",
        ],
      }),
    ],
  },
  {
    title: "Databases",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "MySQL",
        href: "https://www.mysql.com/",
        Icon: SiMysql,
        colorClass: "text-[#4479a1]",
        overview:
          "MySQL is a dependable relational database when applications need transactional integrity, familiar tooling, and straightforward production operations.",
        commonUses: [
          "Business applications",
          "Transactional systems",
          "Web backends",
          "Operational reporting",
        ],
        ecosystem: [
          "InnoDB",
          "Replication",
          "ORMs",
          "Backup tooling",
        ],
        whyWeUse: [
          "Reliable relational model",
          "Broad hosting support",
          "Operational simplicity",
          "Strong community adoption",
        ],
      }),
      technology({
        name: "PostgreSQL",
        href: "https://www.postgresql.org/",
        Icon: SiPostgresql,
        colorClass: "text-[#4169e1]",
        overview:
          "PostgreSQL is our preferred choice for many modern systems because it handles structured data, advanced queries, and evolving application models very well.",
        commonUses: [
          "Core application data",
          "Analytics-backed products",
          "Geospatial systems",
          "API-driven platforms",
        ],
        ecosystem: [
          "JSONB",
          "PostGIS",
          "Extensions",
          "Logical replication",
        ],
        whyWeUse: [
          "Excellent data integrity",
          "Powerful query support",
          "Flexible data modeling",
          "Strong open-source maturity",
        ],
      }),
      technology({
        name: "MongoDB",
        href: "https://www.mongodb.com/",
        Icon: SiMongodb,
        colorClass: "text-[#47a248]",
        overview:
          "MongoDB helps when data structures change quickly, nested documents are natural, or product teams need a faster path through early schema evolution.",
        commonUses: [
          "Document stores",
          "Content-rich apps",
          "Rapid prototypes",
          "Flexible data models",
        ],
        ecosystem: [
          "Atlas",
          "Aggregation pipelines",
          "Change streams",
          "ODM tooling",
        ],
        whyWeUse: [
          "Flexible schemas",
          "Good for evolving products",
          "Handles nested data well",
          "Strong managed hosting options",
        ],
      }),
      technology({
        name: "Redis",
        href: "https://redis.io/",
        Icon: SiRedis,
        colorClass: "text-[#dc382d]",
        overview:
          "Redis gives us a fast in-memory layer for caching, queues, and real-time application behavior where latency needs to stay low.",
        commonUses: [
          "Caching",
          "Session storage",
          "Queues and jobs",
          "Rate limiting",
        ],
        ecosystem: [
          "Pub/Sub",
          "Streams",
          "Key-value storage",
          "TTL-based caching",
        ],
        whyWeUse: [
          "Very fast reads and writes",
          "Great for transient state",
          "Improves app responsiveness",
          "Useful in realtime flows",
        ],
      }),
      technology({
        name: "SQLite",
        href: "https://www.sqlite.org/",
        Icon: SiSqlite,
        colorClass: "text-[#003b57]",
        overview: "SQLite is a compact embedded database for local applications, prototypes, mobile products, and services that need simple durable storage.",
        commonUses: ["Embedded storage", "Mobile applications", "Local-first tools", "Prototypes"],
        ecosystem: ["SQL", "Single-file databases", "ACID transactions", "Language bindings"],
        whyWeUse: ["Zero configuration", "Small footprint", "Reliable file format", "Easy deployment"],
      }),
    ],
  },
  {
    title: "Data & Analytics",
    accentClass: "from-[var(--secondary-soft)] to-transparent",
    items: [
      technology({
        name: "Pandas",
        href: "https://pandas.pydata.org/",
        Icon: SiPandas,
        colorClass: "text-[#150458]",
        overview: "Pandas provides expressive data structures for cleaning, transforming, analyzing, and preparing tabular data in Python.",
        commonUses: ["Data preparation", "Data analysis", "Reporting pipelines", "Feature engineering"],
        ecosystem: ["Python", "NumPy", "Jupyter", "Data connectors"],
        whyWeUse: ["Productive data workflows", "Flexible tabular operations", "Strong ecosystem", "Clear analysis APIs"],
      }),
      technology({
        name: "NumPy",
        href: "https://numpy.org/",
        Icon: SiNumpy,
        colorClass: "text-[#4dabcf]",
        overview: "NumPy supplies efficient multidimensional arrays and numerical operations for scientific computing, analytics, and machine-learning workflows.",
        commonUses: ["Numerical computing", "Array processing", "Scientific analysis", "ML foundations"],
        ecosystem: ["Python", "SciPy", "pandas", "Jupyter"],
        whyWeUse: ["Efficient array operations", "Broad library support", "Stable APIs", "Foundation of Python data tools"],
      }),
      technology({
        name: "Power BI",
        href: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
        Icon: PowerBiLogo,
        colorClass: "text-[#f2c811]",
        overview:
          "Power BI helps us turn operational data into practical dashboards for business teams that need decisions to happen with clearer numbers.",
        commonUses: [
          "Executive dashboards",
          "KPI reporting",
          "Operational analytics",
          "Management scorecards",
        ],
        ecosystem: [
          "Power Query",
          "DAX",
          "Microsoft connectors",
          "Workspace publishing",
        ],
        whyWeUse: [
          "Strong Microsoft integration",
          "Good business adoption",
          "Governed reporting workflows",
          "Fast dashboard delivery",
        ],
      }),
      technology({
        name: "Tableau",
        href: "https://www.tableau.com/",
        Icon: IoLogoTableau,
        colorClass: "text-[#e97627]",
        overview:
          "Tableau is useful when teams want highly visual analytics, exploratory reporting, and dashboards that communicate insights clearly to non-technical audiences.",
        commonUses: [
          "Interactive dashboards",
          "Exploratory reporting",
          "Business storytelling",
          "Stakeholder analytics",
        ],
        ecosystem: [
          "Tableau Prep",
          "Tableau Server",
          "Tableau Cloud",
          "Data connectors",
        ],
        whyWeUse: [
          "Strong data storytelling",
          "Polished visualization layer",
          "Good stakeholder adoption",
          "Flexible analytics delivery",
        ],
      }),
      technology({
        name: "Apache Kafka",
        href: "https://kafka.apache.org/",
        Icon: SiApachekafka,
        colorClass: "text-[color:var(--foreground)]",
        overview:
          "Kafka helps us move high-volume events between systems so platforms can process data streams without tightly coupling every service together.",
        commonUses: [
          "Event streaming",
          "System integration",
          "Realtime pipelines",
          "Audit-friendly event flows",
        ],
        ecosystem: [
          "Kafka Connect",
          "Streams",
          "Schema Registry",
          "Consumer groups",
        ],
        whyWeUse: [
          "Handles high throughput",
          "Decouples services well",
          "Supports resilient event flows",
          "Useful integration backbone",
        ],
      }),
    ],
  },
  {
    title: "Blockchain",
    accentClass: "from-[var(--secondary-soft)] to-transparent",
    items: [
      technology({
        name: "Ethereum",
        href: "https://ethereum.org/",
        Icon: SiEthereum,
        colorClass: "text-[#627eea]",
        overview:
          "Ethereum remains a practical blockchain foundation when products need programmable trust, wallet interoperability, and access to a large ecosystem.",
        commonUses: [
          "Smart contract products",
          "Tokenized systems",
          "On-chain workflows",
          "Wallet-connected applications",
        ],
        ecosystem: [
          "EVM",
          "ERC standards",
          "Wallet integrations",
          "Layer 2 networks",
        ],
        whyWeUse: [
          "Mature ecosystem",
          "Strong interoperability",
          "Large developer community",
          "Reliable tooling landscape",
        ],
      }),
      technology({
        name: "Solidity",
        href: "https://soliditylang.org/",
        Icon: SiSolidity,
        colorClass: "text-[#363636]",
        overview:
          "Solidity is the language we reach for when building EVM-compatible contracts that need clear logic, ecosystem compatibility, and audit-friendly structure.",
        commonUses: [
          "Smart contracts",
          "Token logic",
          "DApp backends",
          "On-chain business rules",
        ],
        ecosystem: [
          "Hardhat",
          "Foundry",
          "OpenZeppelin",
          "Ethers.js",
        ],
        whyWeUse: [
          "Dominant EVM language",
          "Strong ecosystem support",
          "Good audit pathways",
          "Composability with existing tools",
        ],
      }),
    ],
  },
  {
    title: "IoT",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "Arduino",
        href: "https://www.arduino.cc/",
        Icon: SiArduino,
        colorClass: "text-[#00979d]",
        overview:
          "Arduino is excellent for rapid hardware prototyping when teams need to validate device behavior before moving deeper into custom embedded delivery.",
        commonUses: [
          "Prototype devices",
          "Sensor testing",
          "Control systems",
          "Training and workshops",
        ],
        ecosystem: [
          "Shields",
          "Sensors",
          "Arduino IDE",
          "Library ecosystem",
        ],
        whyWeUse: [
          "Fast prototyping",
          "Huge maker community",
          "Simple onboarding",
          "Good for early validation",
        ],
      }),
      technology({
        name: "Raspberry Pi",
        href: "https://www.raspberrypi.com/",
        Icon: SiRaspberrypi,
        colorClass: "text-[#c51a4a]",
        overview:
          "Raspberry Pi helps us prototype edge systems, local gateways, and connected experiments that benefit from a full operating system and flexible hardware access.",
        commonUses: [
          "Edge gateways",
          "Monitoring devices",
          "Prototype kiosks",
          "Camera and sensor projects",
        ],
        ecosystem: [
          "GPIO",
          "Python",
          "Linux tooling",
          "Peripheral modules",
        ],
        whyWeUse: [
          "Full OS flexibility",
          "Great edge prototyping platform",
          "Easy hardware access",
          "Strong community support",
        ],
      }),
      technology({
        name: "ESP32",
        href: "https://www.espressif.com/en/products/socs/esp32",
        Icon: SiEspressif,
        colorClass: "text-[#e7352c]",
        overview:
          "ESP32 is a practical choice for connected embedded devices where wireless capability, low cost, and real-world deployment efficiency all matter.",
        commonUses: [
          "Smart device firmware",
          "Wireless sensors",
          "Remote monitoring",
          "Embedded automation",
        ],
        ecosystem: [
          "ESP-IDF",
          "FreeRTOS",
          "OTA updates",
          "Bluetooth and Wi-Fi stacks",
        ],
        whyWeUse: [
          "Built-in connectivity",
          "Cost-efficient hardware",
          "Production-friendly footprint",
          "Useful embedded ecosystem",
        ],
      }),
    ],
  },
  {
    title: "Engineering Tools",
    accentClass: "from-[var(--accent-soft)] to-transparent",
    items: [
      technology({
        name: "Git",
        href: "https://git-scm.com/",
        Icon: SiGit,
        colorClass: "text-[#f05032]",
        overview: "Git supports traceable, collaborative source-control workflows across the software delivery lifecycle.",
        commonUses: ["Version control", "Branching workflows", "Change history"],
        ecosystem: ["Git hosting", "Code review", "CI/CD workflows"],
        whyWeUse: ["Distributed workflows", "Strong ecosystem", "Reliable change tracking"],
      }),
      technology({
        name: "GitHub",
        href: "https://github.com/",
        Icon: SiGithub,
        colorClass: "text-[#181717] dark:text-white",
        overview: "GitHub brings source code, review, collaboration, and automation workflows into one engineering platform.",
        commonUses: ["Code hosting", "Pull requests", "Team collaboration"],
        ecosystem: ["GitHub Actions", "Issues", "Code security"],
        whyWeUse: ["Integrated workflows", "Strong collaboration", "Broad tooling support"],
      }),
      technology({
        name: "Postman",
        href: "https://www.postman.com/",
        Icon: SiPostman,
        colorClass: "text-[#ff6c37]",
        overview: "Postman supports API exploration, testing, documentation, and collaborative development workflows.",
        commonUses: ["API testing", "Request collections", "API documentation"],
        ecosystem: ["Collections", "Mock servers", "Automated tests"],
        whyWeUse: ["Fast API feedback", "Shareable workflows", "Clear documentation"],
      }),
      technology({
        name: "Visual Studio Code",
        shortName: "VS Code",
        href: "https://code.visualstudio.com/",
        Icon: VscVscode,
        colorClass: "text-[#007acc]",
        overview: "Visual Studio Code provides a flexible development environment with strong language and tooling support.",
        commonUses: ["Application development", "Debugging", "Code navigation"],
        ecosystem: ["Extensions", "Integrated terminal", "Remote development"],
        whyWeUse: ["Flexible tooling", "Broad language support", "Productive workflows"],
      }),
    ],
  },
] satisfies TechnologyCategory[];

export const technologyCatalog = technologyCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryTitle: category.title,
    accentClass: category.accentClass,
  }))
) satisfies TechnologySelection[];

const technologyCategoryDefaults = {
  "AI & Machine Learning": {
    relatedService: "AI & Generative AI",
    relatedServiceHref: "/services",
    disadvantages: [
      "Model quality still depends on prompt design, grounding, and evaluation discipline.",
      "Inference costs can rise quickly when usage scales without guardrails.",
      "Governance, privacy, and human review remain important in production workflows.",
    ],
  },
  Frontend: {
    relatedService: "Web Development",
    relatedServiceHref: "/services",
    disadvantages: [
      "Interface complexity can grow quickly without strong component and state discipline.",
      "Performance, accessibility, and browser testing need ongoing attention.",
      "Large frontend codebases can become harder to evolve if design systems drift.",
    ],
  },
  Backend: {
    relatedService: "Custom Software Development",
    relatedServiceHref: "/services",
    disadvantages: [
      "Backend systems still require careful architecture, testing, and long-term maintenance.",
      "Operational complexity grows as services, integrations, and environments expand.",
      "Performance and reliability depend on good deployment, observability, and data design.",
    ],
  },
  Mobile: {
    relatedService: "Mobile App Development",
    relatedServiceHref: "/services",
    disadvantages: [
      "Device fragmentation, OS changes, and store release cycles add delivery overhead.",
      "Cross-platform work can still need native intervention for edge-case features.",
      "Mobile QA requires wider real-device testing than many web projects.",
    ],
  },
  Cloud: {
    relatedService: "Cloud & DevOps",
    relatedServiceHref: "/services",
    disadvantages: [
      "Cloud costs can drift without monitoring, budgeting, and architecture review.",
      "Vendor-specific services can increase lock-in if portability is ignored.",
      "Security and governance still need active design rather than default assumptions.",
    ],
  },
  DevOps: {
    relatedService: "DevOps Implementation",
    relatedServiceHref: "/services",
    disadvantages: [
      "Tooling can become noisy if pipelines and environments are not standardized.",
      "Operational automation still requires maintenance, review, and access control.",
      "Maturity takes time because release engineering depends on people and process as well as tools.",
    ],
  },
  Databases: {
    relatedService: "Data Engineering",
    relatedServiceHref: "/services",
    disadvantages: [
      "Schema design, indexing, and query quality still determine long-term performance.",
      "Migrations and data growth can create operational risk without planning.",
      "Backup, recovery, and access patterns need continuous discipline in production.",
    ],
  },
  "Data & Analytics": {
    relatedService: "Business Intelligence",
    relatedServiceHref: "/services",
    disadvantages: [
      "Dashboards are only as good as the quality and consistency of source data.",
      "Streaming and analytics platforms can add governance and operational overhead.",
      "Stakeholder alignment is still needed so metrics reflect real business decisions.",
    ],
  },
  Cybersecurity: {
    relatedService: "Security Consulting",
    relatedServiceHref: "/services",
    disadvantages: [
      "Security controls fail quickly when implementation details are rushed or inconsistent.",
      "Threat models and compliance expectations evolve, so guidance must be maintained.",
      "Strong security practice usually adds review steps that teams must plan for early.",
    ],
  },
  Blockchain: {
    relatedService: "Blockchain Consulting",
    relatedServiceHref: "/services",
    disadvantages: [
      "Smart-contract mistakes can be expensive and require careful audit processes.",
      "Transaction costs and chain performance constraints affect product design decisions.",
      "Wallet UX and ecosystem complexity can slow mainstream user adoption.",
    ],
  },
  IoT: {
    relatedService: "Smart Device Solutions",
    relatedServiceHref: "/services",
    disadvantages: [
      "Hardware constraints and connectivity variability add real-world delivery complexity.",
      "Device fleet management, updates, and monitoring need long-term operational planning.",
      "Testing often requires physical environments rather than browser-only workflows.",
    ],
  },
  "Engineering Tools": {
    relatedService: "Product Engineering",
    relatedServiceHref: "/services/product-engineering",
    disadvantages: [
      "Engineering tools still need shared conventions and disciplined team workflows.",
      "Extensions and integrations require review to avoid unnecessary complexity.",
      "Tooling should support delivery rather than dictate architecture decisions.",
    ],
  },
} as const satisfies Record<
  TechnologyCategory["title"],
  {
    relatedService: string;
    relatedServiceHref: string;
    disadvantages: string[];
  }
>;

const technologyOverrides: Partial<
  Record<
    TechnologySelection["slug"],
    {
      relatedService?: string;
      relatedServiceHref?: string;
      disadvantages?: string[];
    }
  >
> = {
  java: {
    relatedService: "Custom Software Development",
    disadvantages: [
      "More verbose than many modern languages, which can slow routine implementation work.",
      "Startup time and memory usage can be heavier than lightweight runtimes in some workloads.",
      "JVM tuning and operational management still matter in large production systems.",
    ],
  },
  "spring-boot": {
    relatedService: "Enterprise Software",
    relatedServiceHref: "/services",
  },
  openai: {
    relatedService: "Custom LLM Solutions",
    relatedServiceHref: "/services",
  },
  "google-gemini": {
    relatedService: "Generative AI Applications",
    relatedServiceHref: "/services",
  },
  tensorflow: {
    relatedService: "Machine Learning",
    relatedServiceHref: "/services",
  },
  pytorch: {
    relatedService: "Deep Learning",
    relatedServiceHref: "/services",
  },
  langchain: {
    relatedService: "AI Agents",
    relatedServiceHref: "/services",
  },
  react: {
    relatedService: "Web Development",
  },
  "next-js": {
    relatedService: "Corporate Websites",
  },
  angular: {
    relatedService: "Web Portals",
  },
  "vue-js": {
    relatedService: "CMS Development",
  },
  python: {
    relatedService: "AI Automation",
  },
  django: {
    relatedService: "Enterprise Software",
  },
  fastapi: {
    relatedService: "API Development",
  },
  "node-js": {
    relatedService: "API Development",
  },
  laravel: {
    relatedService: "Custom Software Development",
  },
  flutter: {
    relatedService: "Flutter Apps",
  },
  "react-native": {
    relatedService: "React Native Apps",
  },
  kotlin: {
    relatedService: "Android Apps",
  },
  swift: {
    relatedService: "iOS Apps",
  },
  "amazon-web-services": {
    relatedService: "AWS Solutions",
  },
  "microsoft-azure": {
    relatedService: "Microsoft Azure",
  },
  "google-cloud-platform": {
    relatedService: "Google Cloud Platform",
  },
  docker: {
    relatedService: "Docker & Kubernetes",
  },
  kubernetes: {
    relatedService: "Docker & Kubernetes",
  },
  "github-actions": {
    relatedService: "CI/CD Pipelines",
  },
  jenkins: {
    relatedService: "CI/CD Pipelines",
  },
  mysql: {
    relatedService: "Data Warehousing",
  },
  postgresql: {
    relatedService: "Data Engineering",
  },
  mongodb: {
    relatedService: "Data Engineering",
  },
  redis: {
    relatedService: "Performance Optimization",
  },
  "power-bi": {
    relatedService: "Power BI Dashboards",
  },
  tableau: {
    relatedService: "Tableau Dashboards",
  },
  "apache-kafka": {
    relatedService: "Enterprise Integration",
  },
  "oauth-2-0": {
    relatedService: "Identity & Access Management",
  },
  jwt: {
    relatedService: "Secure Application Development",
  },
  owasp: {
    relatedService: "Security Audits",
  },
  ethereum: {
    relatedService: "Enterprise Blockchain",
  },
  solidity: {
    relatedService: "Smart Contracts",
  },
  arduino: {
    relatedService: "Smart Device Solutions",
  },
  "raspberry-pi": {
    relatedService: "Remote Monitoring",
  },
  esp32: {
    relatedService: "Sensor Integration",
  },
} as const;

export const technologyDetailCategories = technologyCategories.map((category) => {
  const defaults =
    technologyCategoryDefaults[
      category.title as keyof typeof technologyCategoryDefaults
    ];

  return {
    title: category.title,
    accentClass: category.accentClass,
    items: category.items.map((item) => {
      const override =
        technologyOverrides[item.slug as keyof typeof technologyOverrides];

      return {
        ...item,
        id: item.slug,
        category: category.title,
        categoryTitle: category.title,
        accentClass: category.accentClass,
        description: item.overview,
        useCases: item.commonUses,
        advantages: item.whyWeUse,
        disadvantages: override?.disadvantages ?? defaults.disadvantages,
        relatedTools: item.ecosystem,
        relatedService: override?.relatedService ?? defaults.relatedService,
        relatedServiceHref:
          override?.relatedServiceHref ?? defaults.relatedServiceHref,
        officialUrl: item.href,
      };
    }),
  };
}) satisfies TechnologyDetailCategory[];

export const technologyDetailsCatalog = technologyDetailCategories.flatMap(
  (category) => category.items
) satisfies TechnologyDetail[];
