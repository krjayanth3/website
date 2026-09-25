"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, BrainCircuit, Cloud, Database, ShieldCheck, Building2, Sparkles } from "lucide-react";
import styles from "./about-page.module.css";

const principles = [
  ["Engineering", "We approach technology through structured design, development, testing, security, deployment, and continuous improvement."],
  ["Innovation", "We explore emerging technologies and their practical applications through research, experimentation, and prototyping."],
  ["Practicality", "Technology should address meaningful requirements rather than add complexity for its own sake."],
  ["Continuous Learning", "Learning, experimentation, and improvement are part of how we approach technology and engineering."],
] as const;

const focusAreas = [
  { name: "Software", x: 50, y: 9, Icon: Code2 },
  { name: "AI", x: 22, y: 28, Icon: BrainCircuit },
  { name: "Cloud", x: 78, y: 28, Icon: Cloud },
  { name: "Data", x: 18, y: 64, Icon: Database },
  { name: "Security", x: 82, y: 64, Icon: ShieldCheck },
  { name: "Enterprise", x: 33, y: 90, Icon: Building2 },
  { name: "Emerging Technologies", x: 67, y: 90, Icon: Sparkles },
] as const;

const today = ["Software Engineering", "AI & Data", "Cloud", "Security", "Enterprise Technology"];
const tomorrow = ["Research & Development", "Emerging Technologies", "Intelligent Systems", "Automation", "Future Digital Products"];

export default function AboutPage() {
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealAll = () => {
      if (motion.matches) {
        sections.forEach(section => { section.dataset.reveal = "seen"; });
        root.dataset.identity = "complete";
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const section = entry.target as HTMLElement;
        section.dataset.visible = String(entry.isIntersecting);
        if (entry.isIntersecting) {
          section.dataset.reveal = "seen";
          if (section.id === "about-hero" && !root.dataset.identity) {
            root.dataset.identity = motion.matches ? "complete" : "play";
          }
        }
      });
    }, { threshold: 0.06 });
    sections.forEach(section => {
      if (!motion.matches && section.getBoundingClientRect().top > window.innerHeight) {
        section.dataset.reveal = "pending";
      }
      observer.observe(section);
    });
    const visibility = () => { root.dataset.hidden = String(document.hidden); };
    visibility();
    revealAll();
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", revealAll);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return (
    <div ref={page} className={styles.page}>
      <section id="about-hero" className={styles.hero} aria-labelledby="about-heading">

        <h1 id="about-heading">AlphaBeastCodeX.<span>Built to Engineer What&apos;s Next.</span></h1>
        <p className={styles.intro}>AlphaBeastCodeX Private Limited, known as ABCX, is a technology company focused on software engineering, intelligent systems, and emerging technologies.</p>
        <p className={styles.support}>We combine engineering, experimentation, and modern technology to build practical digital solutions and explore what comes next.</p>
        <div className={styles.identity} aria-hidden="true">
          <div className={styles.wordmark}>
            {[["A", "lpha"], ["B", "east"], ["C", "ode"], ["X", ""]].map(([initial, rest]) => (
              <span className={styles.namePart} key={initial}>
                <span className={styles.initial}>{initial}</span>
                <span className={styles.remainder} style={{ "--letters": `${rest.length}ch` } as CSSProperties}>{rest}</span>
              </span>
            ))}
          </div>
          <Image className={styles.identityLogo} src="/abcx-logo-trimmed.png" alt="" width={565} height={653} sizes="64px" />
        </div>
      </section>

      <section className={styles.story} aria-labelledby="about-story">
        <header><h2 id="about-story">Technology Should Solve Real Problems.</h2></header>
        <div className={styles.storyCopy}>
          <p>ABCX was established with a focus on bringing software engineering, intelligent technologies, and practical problem-solving together.</p>
          <p>We design, experiment, engineer, and continuously improve technology with a focus on addressing real-world requirements.</p>
          <p>Our work spans modern software development and emerging technologies, while our research initiatives allow us to explore new ideas, approaches, and applications.</p>
        </div>
      </section>

      <section aria-labelledby="about-principles">
        <header className={styles.sectionHeader}><h2 id="about-principles">How We Think About Technology.</h2></header>
        <ol className={styles.principles}>
          {principles.map(([title, description], index) => (
            <li key={title}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3><p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.focus} aria-labelledby="about-focus">
        <header className={styles.centerHeader}><h2 id="about-focus">Where We Build and Explore.</h2><p>ABCX works across interconnected areas of modern technology, combining software engineering with intelligent systems, infrastructure, security, data, and emerging technologies.</p></header>
        <div className={styles.constellation}>
          <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {focusAreas.map(({ name, x, y }, index) => {
              const endX = 50 + (x - 50) * 0.76;
              const endY = 48 + (y - 48) * 0.76;
              return <g key={name} style={{ animationDelay: `${index * -2}s` }}>
                <line x1={50 + (x - 50) * 0.3} y1={48 + (y - 48) * 0.3} x2={endX} y2={endY} />
                <circle cx={endX} cy={endY} r="0.3" />
              </g>;
            })}
          </svg>
          <div className={styles.focusLogo}><Image src="/abcx-logo-trimmed.png" alt="ABCX" width={565} height={653} sizes="(max-width: 639px) 70px, 96px" /></div>
          <ul className={styles.focusNodes} aria-label="ABCX technology focus areas">
            {focusAreas.map(({ name, x, y, Icon }, index) => <li key={name} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${-index * 2}s` } as CSSProperties}><span className={styles.focusNode}><Icon aria-hidden="true" /><span>{name}</span></span></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-direction">
        <header className={styles.sectionHeader}><h2 id="about-direction">Building Today.<br />Exploring Tomorrow.</h2><p>ABCX balances practical software engineering today with continuous exploration of technologies that may shape future digital solutions.</p></header>
        <div className={styles.direction}>
          <div><h3>Today</h3><ul>{today.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Tomorrow</h3><ul>{tomorrow.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section className={styles.beyond} aria-labelledby="about-beyond">
        <div className={styles.learningPath} aria-hidden="true"><span>Code</span><span>Learn</span><span>Build</span><span>Grow</span></div>
        <div><h2 id="about-beyond">Technology Grows<br />When People Grow.</h2><p className={styles.beyondCopy}>Alongside technology development, ABCX supports practical learning through training and internship initiatives designed to provide students and aspiring professionals with exposure to modern technologies and real-world software engineering practices.</p><Link href="/services/training-internship" className={styles.textLink}>Explore Training &amp; Internship<ArrowRight size={17} aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.finalCta} aria-labelledby="about-cta">
        <h2 id="about-cta">Ideas become meaningful<br />when they&apos;re engineered well.</h2><p>Talk to ABCX about software, AI, cloud, enterprise technology, or digital product development.</p>
        <div className={styles.actions}><Link href="/contact" className={styles.primary}>Book Consultation</Link><Link href="/contact" className={styles.textLink}>Contact Us<ArrowRight size={17} aria-hidden="true" /></Link></div>
      </section>
    </div>
  );
}
