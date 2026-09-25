import {
  landingPageContentSlug,
  siteContentApiBaseUrl,
} from "./landing-page-content";
import { emptyLandingPageContent } from "./landing-page-content";
import type { LandingPageContent } from "./landing-page-content";

export async function getLandingPageContent(): Promise<LandingPageContent> {
  try {
    const response = await fetch(
      `${siteContentApiBaseUrl}/api/content/site-pages/${landingPageContentSlug}/?locale=en`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return emptyLandingPageContent;
    }

    return (await response.json()) as LandingPageContent;
  } catch (error) {
    console.error("Failed to load landing-page content:", error);
    return emptyLandingPageContent;
  }
}
