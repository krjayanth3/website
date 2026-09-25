"use client";

import Link from "next/link";
import Image from "next/image";
import { type ReactNode, type CSSProperties } from "react";
import { useWheelInteraction } from "./use-wheel-interaction";
import WheelDetail from "./wheel-detail";
import { ArrowRight, CodeXml, PanelsTopLeft, MonitorCog, Blocks, BrainCircuit, Building2, CloudCog, Code2, Database, GraduationCap, HeartPulse, RadioTower, ShieldCheck, Sprout, Workflow, Smartphone, ChartNoAxesCombined, Wrench, GitBranch } from "lucide-react";
import styles from "./three.module.css";

const icons = { product: CodeXml, web: PanelsTopLeft, managed: MonitorCog, education: GraduationCap, healthcare: HeartPulse, agriculture: Sprout, ai: BrainCircuit, security: ShieldCheck, cloud: CloudCog, enterprise: Building2, iot: RadioTower, blockchain: Blocks, automation: Workflow, frontend: Code2, backend: Database, mobile: Smartphone, devops: GitBranch, data: ChartNoAxesCombined, tools: Wrench };
export type EcosystemItem = { title: string; description: string; icon: keyof typeof icons; number?: string; href?: string; content?: ReactNode };
export default function Ecosystem({ items, label, center, caption, services = false, technologyPanel = false, showDetailLabel = true }: { items: EcosystemItem[]; label: string; center: string; caption?: string; services?: boolean; technologyPanel?: boolean; showDetailLabel?: boolean }) {
  const interaction = useWheelInteraction();
  const active = interaction.active;
  const item = active === null ? null : items[active];
  const ActiveIcon = item ? icons[item.icon] : null;
  return <div className={`${styles.ecosystem} ${services ? styles.services : ""} ${technologyPanel ? styles.technology : ""}`}>
    <div className={styles.orbit} role="group" data-wheel-nodes aria-label={label}>
      {<svg className={styles.serviceRing} viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="37" /><circle cx="50" cy="50" r="33" />
        {items.map((entry, index) => { const angle = index / items.length * Math.PI * 2; return <line key={entry.title} data-active={active === index} x1={50 + Math.sin(angle) * 15} y1={50 - Math.cos(angle) * 15} x2={50 + Math.sin(angle) * 37} y2={50 - Math.cos(angle) * 37} />; })}
      </svg>}
      <div className={styles.center} aria-hidden="true"><Image src="/abcx-logo-trimmed.png" alt="" width={565} height={653} sizes="80px" className={styles.centerLogo} /><span>{center}</span>{caption && <small className={styles.centerCaption}>{caption}</small>}</div>
      {items.map((item, index) => {
        const Icon = icons[item.icon];
        const angle = index / items.length * Math.PI * 2;
        const button = <button type="button" className={styles.node} style={{ "--x": `${50 + Math.sin(angle) * 37}%`, "--y": `${50 - Math.cos(angle) * 37}%` } as CSSProperties} {...interaction.nodeProps(index)} aria-describedby={services ? `${interaction.id}-description-${index}` : undefined} aria-controls={active === index ? `${interaction.id}${services ? ` ${interaction.id}-inline-${index}` : technologyPanel ? ` ${interaction.id}-mobile` : ""}` : undefined}><Icon aria-hidden="true" />{item.number && <span className={styles.nodeNumber}>{item.number}</span>}{item.title}</button>;
        return <div key={item.title} className={styles.nodeWrapper}>
          {button}
          {services && <div id={`${interaction.id}-inline-${index}`} className={styles.inlineDetail} hidden={active !== index} onFocus={interaction.keepOpen} onBlur={interaction.leave}>
            <p id={`${interaction.id}-description-${index}`}>{item.description}</p>
            {item.href && <Link href={item.href} aria-label={`Learn more about ${item.title}`}>Learn More <ArrowRight size={16} aria-hidden="true" /></Link>}
            <button type="button" aria-label="Close details" onClick={() => interaction.close()}>Close</button>
          </div>}
        </div>;

      })}
    </div>
    {technologyPanel && item && <section id={`${interaction.id}-mobile`} className={styles.technologyMobile} aria-label={`${item.title} technologies`} onFocus={interaction.keepOpen} onBlur={interaction.leave}>
      <div className={styles.mobileHeading}><h3>{item.title}</h3><button type="button" aria-label="Close details" onClick={() => interaction.close()}>Close</button></div>
      <p>{item.description}</p>{item.content}
    </section>}
    {item && ActiveIcon && <WheelDetail interaction={interaction} title={item.title} eyebrow={showDetailLabel ? label : ""} description={item.description} href={item.href} inlineOnMobile={services || technologyPanel} large={technologyPanel} icon={<ActiveIcon aria-hidden="true" />}>{item.content}</WheelDetail>}
  </div>;
}
