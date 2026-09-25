"use client";

import { useRef, useState, type FormEvent } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { serviceCatalog } from "./service-catalog";
import styles from "./consultation-page.module.css";

export default function ConsultationPage({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submission = useRef<{ payload: string; id: string } | null>(null);
  const sending = useRef(false);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const time = String(data.get("time") || "").trim();
    if (!name || !time) {
      const field = form.elements.namedItem(!name ? "name" : "time") as HTMLInputElement;
      field.setCustomValidity("Please enter a value, not just spaces.");
      field.reportValidity();
      return;
    }
    const payload = { name, email: String(data.get("email") || "").trim(), service: String(data.get("service") || ""), preferred_time: time };
    const serialized = JSON.stringify(payload);
    if (submission.current?.payload !== serialized) submission.current = { payload: serialized, id: crypto.randomUUID() };
    sending.current = true;
    setState("sending");
    try {
      const response = await fetch("/api/consultations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submission_id: submission.current.id }),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error(result.error || "Please try again.");
      setMessage("Your consultation request has been received. ABCX will contact you to arrange a time.");
      setState("success");
      form.reset();
      submission.current = null;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We couldn't save your request. Please try again.");
      setState("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className={styles.page} aria-labelledby="consultation-heading">
      <header className={styles.heading}>
        <h1 id="consultation-heading">Book a <span>Consultation</span></h1>
        <p>Schedule a free 30-minute discovery call to discuss your technology needs.</p>
      </header>
      <form className={styles.form} onSubmit={submitRequest} onInput={event => {
        if (event.target instanceof HTMLInputElement) event.target.setCustomValidity("");
        if (!sending.current) setState("idle");
      }}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="consultation-name">Full Name</label>
            <input id="consultation-name" name="name" autoComplete="name" placeholder="Jane Smith" required maxLength={120} />
          </div>
          <div className={styles.field}>
            <label htmlFor="consultation-email">Work Email</label>
            <input id="consultation-email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required maxLength={254} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="consultation-service">Service of Interest</label>
          <select id="consultation-service" name="service" defaultValue="" required>
            <option value="" disabled>Select a service…</option>
            {serviceCatalog.map(service => <option key={service.slug} value={service.title}>{service.title}</option>)}
            <option value="Not sure yet">Not sure yet — help me decide</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="consultation-time">Preferred Date/Time Range</label>
          <div className={styles.timeField}>
            <CalendarDays size={20} aria-hidden="true" />
            <input id="consultation-time" name="time" placeholder="e.g. Next Tuesday morning, IST" aria-describedby="consultation-time-help" required maxLength={200} />
          </div>
          <p id="consultation-time-help" className={styles.hint}>Include your timezone so we can arrange a suitable time.</p>
        </div>
        <button type="submit" className={styles.submit} disabled={state === "sending"}>{state === "sending" ? "Submitting…" : "Request Consultation"}<Clock3 size={20} aria-hidden="true" /></button>
        {state === "success" && <p role="status" className={styles.status}>{message}</p>}
        {state === "error" && <p role="alert" className={styles.status}>{message} You can also email <a href={`mailto:${email}`}>{email}</a>.</p>}
      </form>
    </section>
  );
}
