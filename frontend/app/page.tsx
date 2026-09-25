import type { Metadata } from "next";

import HomePage from "./home-page";
import { getLandingPageContent } from "./site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AlphaBeastCodeX | Software, AI & Digital Engineering",
  description:
    "AlphaBeastCodeX builds software, AI-powered solutions, cloud platforms, digital products, and custom technology solutions for modern businesses.",
};

export default async function Home() {
  const content = await getLandingPageContent();

  return <HomePage content={content} />;
}
