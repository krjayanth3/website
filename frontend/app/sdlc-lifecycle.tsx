"use client";

import Image from "next/image";
import { Blocks, ClipboardList, Code2, Link2, RefreshCw, Rocket, ShieldCheck } from "lucide-react";
import { useWheelInteraction } from "./three/use-wheel-interaction";
import WheelDetail from "./three/wheel-detail";

import styles from "./sdlc-lifecycle.module.css";

const stages = [
  ["Requirements & Planning", "Understand before we engineer.", "We define business objectives, users, scope, functional requirements, technical requirements, dependencies, and constraints before development begins.", ClipboardList],
  ["Design & Architecture", "Design for today. Architect for tomorrow.", "We translate requirements into system architecture, user experiences, APIs, data models, integrations, and appropriate technology choices.", Blocks],
  ["Development", "Turning architecture into working software.", "We engineer applications, services, APIs, interfaces, and core functionality using technologies suited to the solution.", Code2],
  ["Integration", "Connecting systems into one solution.", "We connect applications, services, databases, APIs, cloud platforms, and external systems into reliable workflows.", Link2],
  ["Testing & Security", "Quality and security before release.", "We validate functionality, integrations, usability, performance, reliability, and security before software moves into production.", ShieldCheck],
  ["Deployment", "From build to production.", "We release software through appropriate infrastructure, deployment workflows, configuration, and delivery processes.", Rocket],
  ["Maintenance & Improvement", "Software evolves after launch.", "We monitor, maintain, troubleshoot, optimize, and continuously improve the solution as requirements and usage evolve.", RefreshCw],
] as const;

export default function SdlcLifecycle() {
  const interaction = useWheelInteraction();
  const activeStage = interaction.active;
  const active = activeStage === null ? null : stages[activeStage];
  const ActiveIcon = active?.[3];

  return (
    <div className={styles.shell}>
      <div className={styles.diagram}>
        <svg className={styles.lifecycleRing} viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="30" />
          {stages.map(([title], index) => { const angle = index / stages.length * Math.PI * 2; return <line key={title} data-active={activeStage === index} x1={50 + Math.sin(angle) * 16} y1={50 - Math.cos(angle) * 16} x2={50 + Math.sin(angle) * 34} y2={50 - Math.cos(angle) * 34} />; })}
        </svg>
        <div className={styles.hub}>
          <Image src="/abcx-logo-trimmed.png" alt="ABCX" width={565} height={653} sizes="56px" className={styles.hubLogo} />
          <strong className={styles.hubTitle}>Software Development<br />Lifecycle</strong>
          <span className={styles.hubCaption}>Plan • Build • Deliver • Improve</span>
        </div>
        <ol data-wheel-nodes>
          {stages.map(([title, , , Icon], index) => {
            const angle = index * (360 / stages.length);
            const customStyle = { "--angle": `${angle}deg`, "--stage-index": index, "--x": `${50 + Math.sin(angle * Math.PI / 180) * 34}%`, "--y": `${50 - Math.cos(angle * Math.PI / 180) * 34}%` } as React.CSSProperties;
            return (
              <li key={title} className={styles.stage} style={customStyle}>
                <button type="button" className={styles.stageButton} {...interaction.nodeProps(index)} aria-label={`Stage ${index + 1}: ${title}`}>
                  <span className={styles.node}><span className="flex flex-col items-center gap-1"><Icon aria-hidden="true" className="h-5 w-5" /><span className="text-xs font-bold text-[color:var(--foreground)]">{String(index + 1).padStart(2, "0")}</span></span></span>
                  <span className={styles.stageTitle}>{title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        {stages.map(([title], index) => {
          const angle = (index + 0.5) * (360 / stages.length);
          return <span key={`${title}-arrow`} className={styles.arrow} data-active={activeStage === index} style={{ "--angle": `${angle}deg` } as React.CSSProperties} aria-hidden="true">›</span>;
        })}
      </div>
      {active && ActiveIcon && <WheelDetail interaction={interaction} title={active[0]} eyebrow={`Stage ${String(activeStage! + 1).padStart(2, "0")}`} statement={active[1]} description={active[2]} icon={<ActiveIcon aria-hidden="true" />} />}
      <div className={styles.mobileCycle}>
        <ol data-wheel-nodes>{stages.map(([title, statement, , Icon], index) => <li key={title} className={styles.stage}><button type="button" className={styles.stageButton} {...interaction.nodeProps(index)} aria-label={`Stage ${index + 1}: ${title}`}><span className={styles.node}><span className="flex flex-col items-center gap-1"><Icon aria-hidden="true" className="h-5 w-5" /><span className="text-xs font-bold text-[color:var(--foreground)]">{String(index + 1).padStart(2, "0")}</span></span></span><span><strong className={styles.stageTitle}>{title}</strong><span className={styles.mobileStatement}>{statement}</span></span></button></li>)}</ol>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-[color:var(--accent)]"><RefreshCw aria-hidden="true" className="h-4 w-4" />Continuous Improvement</p>
      </div>
    </div>
  );
}
