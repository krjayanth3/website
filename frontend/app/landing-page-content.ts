import { siteNavigationItems } from "./site-routes";

export const themeStorageKey = "abcx-theme";

export const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

export type ThemePreference = (typeof themeOptions)[number]["value"];

export const themeColorMap = {
  light: "#f4efe8",
  dark: "#08111f",
} as const;

export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialPlatform =
  | "instagram"
  | "twitter"
  | "facebook"
  | "whatsapp"
  | "linkedin";

export type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};

export type ServiceCategory = {
  title: string;
  description: string;
  services: string[];
};

export type IndustryCategory = {
  title: string;
  services: string[];
};

export type DeliveryCadenceItem = {
  phase: string;
  title: string;
  text: string;
};

export type ProcessStep = {
  step: string;
  summary: string;
};

export type WorkSample = {
  label: string;
  title: string;
  description: string;
  stack: string[];
};

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type LandingPageContent = {
  companyName: string;
  navigation: NavigationItem[];
  header: {
    search: string;
    contactAria: string;
    displayAria: string;
  };
  display: {
    themeModes: {
      system: string;
      light: string;
      dark: string;
    };
  };
  searchPlaceholder: string;
  contactEmail: string;
  contactPhone: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    focusAreas: string[];
  };
  delivery: {
    eyebrow: string;
    title: string;
    badge: string;
    cadence: DeliveryCadenceItem[];
  };
  workingStyle: {
    eyebrow: string;
    title: string;
    description: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
    overviewEyebrow: string;
    overviewTitle: string;
    overviewDescription: string;
    featuredTitles: string[];
    items: ServiceCategory[];
  };
  industryCatalog: IndustryCategory[];
  processSection: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  workSection: {
    eyebrow: string;
    title: string;
    samples: WorkSample[];
  };
  aboutSection: {
    eyebrow: string;
    title: string;
    description: string;
    purpose: {
      title: string;
      description: string;
    };
    valuesTitle: string;
    principles: AboutPrinciple[];
    people: {
      title: string;
      description: string;
      items: string[];
    };
  };
  careersSection: {
    eyebrow: string;
    title: string;
    description: string;
    rolesTitle: string;
    roles: string[];
    cta: string;
    note: string;
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
  };
  footer: {
    eyebrow: string;
    title: string;
    description: string;
    companyTag: string;
    cta: string;
    quickLinksTitle: string;
    quickLinks: NavigationItem[];
    serviceFocusTitle: string;
    serviceFocus: string[];
    contactTitle: string;
    contactLabel: string;
    socialLinksTitle: string;
    socialLinks: SocialLink[];
    note: string;
    legal: string;
  };
};

export const emptyLandingPageContent: LandingPageContent = {
  companyName: "AlphaBeastCodeX Private Limited",
  navigation: [...siteNavigationItems],
  header: {
    search: "Search",
    contactAria: "Contact AlphaBeastCodeX",
    displayAria: "Change site theme",
  },
  display: {
    themeModes: {
      system: "System",
      light: "Light",
      dark: "Dark",
    },
  },
  searchPlaceholder: "Search services, platforms and workflows...",
  contactEmail: "",
  contactPhone: "",
  hero: {
    eyebrow: "",
    title: "",
    description: "",
    primaryCta: "",
    secondaryCta: "",
    focusAreas: [],
  },
  delivery: {
    eyebrow: "",
    title: "",
    badge: "",
    cadence: [],
  },
  workingStyle: {
    eyebrow: "",
    title: "",
    description: "",
  },
  servicesSection: {
    eyebrow: "",
    title: "",
    description: "",
    overviewEyebrow: "",
    overviewTitle: "",
    overviewDescription: "",
    featuredTitles: [],
    items: [],
  },
  industryCatalog: [],
  processSection: {
    eyebrow: "",
    title: "",
    description: "",
    steps: [],
  },
  workSection: {
    eyebrow: "",
    title: "",
    samples: [],
  },
  aboutSection: {
    eyebrow: "",
    title: "",
    description: "",
    purpose: {
      title: "",
      description: "",
    },
    valuesTitle: "",
    principles: [],
    people: {
      title: "",
      description: "",
      items: [],
    },
  },
  careersSection: {
    eyebrow: "",
    title: "",
    description: "",
    rolesTitle: "",
    roles: [],
    cta: "",
    note: "",
  },
  contactSection: {
    eyebrow: "",
    title: "",
    description: "",
    placeholder: "",
  },
  footer: {
    eyebrow: "",
    title: "",
    description: "",
    companyTag: "",
    cta: "",
    quickLinksTitle: "",
    quickLinks: [...siteNavigationItems],
    serviceFocusTitle: "",
    serviceFocus: [],
    contactTitle: "",
    contactLabel: "",
    socialLinksTitle: "",
    socialLinks: [],
    note: "",
    legal: "",
  },
};

export const siteContentApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export const landingPageContentSlug = "landing-page";
