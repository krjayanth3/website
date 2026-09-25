import { ArrowUpRight } from "lucide-react";
import type { TechnologyItem } from "../technologies-data";
import styles from "./technology-list.module.css";

export default function TechnologyList({ items }: { items: TechnologyItem[] }) {
  return <ul className={styles.list}>{items.map((technology) => <li key={technology.slug}>
    <a href={technology.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit the official ${technology.name} website`} className={styles.item}>
      <span className={styles.logo}><technology.Icon role="img" aria-label={`${technology.name} logo`} size={30} className={technology.colorClass} style={{ display: "block", width: 30, height: 30, flexShrink: 0 }} /></span>
      <span className={styles.name}>{technology.name}</span>
      <span className={styles.link}>Visit Official Site <ArrowUpRight size={13} aria-hidden="true" /></span>
    </a>
  </li>)}</ul>;
}
