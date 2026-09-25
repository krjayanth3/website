import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const themeBootstrapScript = `
  (() => {
    try {
      const root = document.documentElement;
      const storedTheme = localStorage.getItem("abcx-theme");
      const themePreference =
        storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
          ? storedTheme
          : "system";
      const resolvedTheme =
        themePreference === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : themePreference;

      root.dataset.theme = resolvedTheme;
      root.dataset.themePreference = themePreference;
      root.style.colorScheme = resolvedTheme;

      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) {
        themeMeta.setAttribute(
          "content",
          resolvedTheme === "dark" ? "#08111f" : "#f4efe8"
        );
      }
    } catch (error) {
      console.error(error);
    }
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "AlphaBeastCodeX Private Limited | Software Product Engineering",
    template: "%s | AlphaBeastCodeX Private Limited",
  },
  description:
    "AlphaBeastCodeX Private Limited designs, builds, and scales custom software platforms, internal tools, and AI-powered workflows for ambitious teams.",
  applicationName: "AlphaBeastCodeX Private Limited",
  keywords: [
    "software company",
    "product engineering",
    "web development",
    "platform modernization",
    "AI workflow automation",
  ],
};

export const viewport: Viewport = {
  themeColor: "#f4efe8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-x-hidden font-sans">
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
