import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./blogs-page.module.css";

// No published article model or feed exists yet. Keep the publication honest:
// no synthetic posts, article metadata, filters, or subscription controls.
export default function BlogsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="insights-heading">
        <div>

          <h1 id="insights-heading">Ideas. Engineering.<br /><span>Technology.</span></h1>
          <p className={styles.description}>Insights from AlphaBeastCodeX on software engineering, artificial intelligence, cloud, cybersecurity, data, emerging technologies, and the ideas shaping modern digital systems.</p>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <svg viewBox="0 0 360 280" fill="none">
            <defs>
              <pattern id="insights-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" /></pattern>
            </defs>
            <rect x="8" y="8" width="344" height="264" fill="url(#insights-grid)" opacity=".2" />
            <g className={styles.connections}><path d="M30 82H90M270 192H328M180 32V58M180 224V252M36 202H65V140H90M270 116H302V60" /></g>
            <g className={styles.document}>
              <path d="M106 70H235L252 88V219H106Z" />
              <path d="M95 59H224L241 77V208H95Z" />
              <path d="M224 59V77H241" />
              <path d="M116 87H155M116 107H217M116 119H200M116 177H217M116 188H183" />
              <path className={styles.goldLine} d="M122 150H153L168 136L192 159H215" />
              <circle cx="122" cy="150" r="3" /><circle cx="168" cy="136" r="3" /><circle cx="215" cy="159" r="3" />
            </g>
            <g className={styles.nodes}><circle cx="30" cy="82" r="3" /><circle cx="328" cy="192" r="3" /><circle cx="180" cy="32" r="3" /><circle cx="180" cy="252" r="3" /><circle cx="36" cy="202" r="3" /></g>
          </svg>
        </div>
      </section>
      <section className={styles.emptyState} aria-labelledby="insights-coming-soon">
        <div className={styles.editorial}>
          <h2 id="insights-coming-soon">Engineering perspectives<br />are on the way.</h2>
          <div>
            <p>We&apos;re preparing technical articles covering software engineering, AI, cloud, cybersecurity, data, and emerging technologies.</p>
            <Link href="/company" className={styles.explore}>Explore ABCX<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
