import DepthRegion from "./three/depth-region";
import SiteHeader from "./site-header";
import { siteShellClassName } from "./site-shell";
import TechnologyAmbientBackground from "./technology-ambient-background";
import type { LandingPageContent } from "./landing-page-content";

export default function SiteFrame({
  content,
  activeHref,
  shellClassName = "",
  children,
}: {
  content: LandingPageContent;
  activeHref?: string;
  shellClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <DepthRegion><div className="relative isolate min-h-screen">
      <TechnologyAmbientBackground activeHref={activeHref} />
      <div
        className={`${siteShellClassName} relative z-10 flex min-h-screen flex-col ${shellClassName}`.trim()}
      >
        <SiteHeader content={content} activeHref={activeHref} />
        {children}
      </div>
    </div></DepthRegion>
  );
}
