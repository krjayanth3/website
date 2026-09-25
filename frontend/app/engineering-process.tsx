import { Activity, Binoculars, Blocks, CloudUpload, Code2, RefreshCw, ShieldCheck, TestTube2 } from "lucide-react";
import styles from "./engineering-process.module.css";

const process = [
  ["Discover", "Understand business objectives, requirements, users, constraints, and technical opportunities.", Binoculars],
  ["Design", "Plan user experiences, system architecture, APIs, data models, and technology choices.", Blocks],
  ["Build", "Develop maintainable software using modern engineering practices and appropriate technologies.", Code2],
  ["Test", "Validate functionality, integrations, performance, usability, and software quality.", TestTube2],
  ["Secure", "Apply security considerations throughout application, infrastructure, data, and deployment workflows.", ShieldCheck],
  ["Deploy", "Deliver applications through reliable cloud infrastructure and automated deployment processes.", CloudUpload],
  ["Operate", "Monitor applications, infrastructure, reliability, performance, and operational health.", Activity],
  ["Improve", "Iterate using feedback, operational insights, optimization, and evolving business requirements.", RefreshCw],
] as const;

export default function EngineeringProcess({ eyebrow }: { eyebrow?: string }) {
  return (
      <section aria-labelledby="process-heading" className={styles.processSection}>
        <header className={styles.processHeader}>
          {eyebrow && <p className={styles.processLabel}>{eyebrow}</p>}
          <h2 id="process-heading">From Idea to Production</h2>
          <p>A structured engineering approach designed to turn requirements into reliable, maintainable, and scalable digital solutions.</p>
        </header>
        <ol className={styles.processGrid}>
          {process.map(([name, description, Icon], index) => (
            <li key={name} className={styles.processCard}>
              <div className={styles.processCardHeader}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
  );
}
