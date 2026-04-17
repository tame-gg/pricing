"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { SectionHeader } from "./Demos";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      const payload = {
        name: String(fd.get("name") ?? ""),
        business: String(fd.get("business") ?? ""),
        contact: String(fd.get("contact") ?? ""),
        type: String(fd.get("type") ?? ""),
        budget: String(fd.get("budget") ?? ""),
        description: String(fd.get("description") ?? ""),
        company_url: String(fd.get("company_url") ?? ""),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Could not send message.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <SectionHeader
        eyebrow="Get in touch"
        title="Let's build something."
        subtitle="Tell me a bit about your business. Andrew responds within 24 hours — Charlotte, Gastonia, Fort Mill, Rock Hill."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass rounded-2xl p-7 md:p-12"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
            >
              <Field label="Name" name="name" required />
              <Field label="Business Name" name="business" />
              <Field
                label="Phone or Email"
                name="contact"
                required
                className="md:col-span-2"
              />
              <Select
                label="Project Type"
                name="type"
                options={[
                  "Website",
                  "Maintenance",
                  "NFC Cards",
                  "Other",
                ]}
              />
              <Select
                label="Budget Range"
                name="budget"
                options={[
                  "Under $300",
                  "$300 – $600",
                  "$600 – $1,000",
                  "$1,000+",
                  "Not sure yet",
                ]}
              />
              <Field
                label="Brief Description"
                name="description"
                multiline
                className="md:col-span-2"
              />

              {/* Honeypot — hidden from real users, bots fill it */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label>
                  Company URL
                  <input
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-2">
                <div className="space-y-2 max-w-sm">
                  <p className="text-muted text-xs tracking-wide">
                    By submitting, you'll get a reply from Andrew within 24
                    hours. No spam, no auto-responders.
                  </p>
                  {error && (
                    <p className="text-red-400/90 text-xs leading-snug">
                      {error}
                    </p>
                  )}
                </div>
                <SubmitButton submitting={submitting} />
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="w-16 h-16 mx-auto rounded-full bg-gold/15 border border-gold flex items-center justify-center mb-6"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="#E8C36D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
              <h3 className="editorial text-2xl md:text-3xl text-ink mb-3">
                Got it — I'll be in touch within 24 hours.
              </h3>
              <p className="text-muted text-sm">
                Meanwhile, feel free to text or DM if it's urgent.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Direct contact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-10 text-muted text-sm flex flex-wrap justify-center items-center gap-x-6 gap-y-3"
      >
        <span>Prefer to talk first? Text, call, or email.</span>
        <a
          href="tel:+17047909158"
          className="text-ink hover:text-gold transition-colors flex items-center gap-2"
        >
          <PhoneIcon />
          +1 (704) 790-9158
        </a>
        <a
          href="mailto:web@tame.gg"
          className="text-ink hover:text-gold transition-colors flex items-center gap-2"
        >
          <MailIcon />
          web@tame.gg
        </a>
        <a
          href="https://instagram.com/tame.gg"
          target="_blank"
          rel="noreferrer"
          className="text-ink hover:text-gold transition-colors flex items-center gap-2"
        >
          <InstagramIcon />
          @tame.gg
        </a>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  multiline,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  multiline?: boolean;
  className?: string;
}) {
  return (
    <label className={`block underline-input pb-2 ${className}`}>
      <span className="block text-[10px] tracking-[0.3em] uppercase text-muted mb-3">
        {label}
        {required && <span className="text-gold ml-1">·</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className="w-full bg-transparent text-ink text-base outline-none border-b border-white/10 pb-2 resize-none focus:border-transparent transition-colors"
        />
      ) : (
        <input
          type="text"
          name={name}
          required={required}
          className="w-full bg-transparent text-ink text-base outline-none border-b border-white/10 pb-2 focus:border-transparent transition-colors"
        />
      )}
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block underline-input pb-2">
      <span className="block text-[10px] tracking-[0.3em] uppercase text-muted mb-3">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          className="w-full appearance-none bg-transparent text-ink text-base outline-none border-b border-white/10 pb-2 pr-8 focus:border-transparent transition-colors"
        >
          <option value="" disabled className="bg-bg">
            Choose…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-bg text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gold"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  );
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="magnetic relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm tracking-[0.18em] uppercase font-medium bg-gold text-black hover:bg-goldlight shadow-gold transition-colors disabled:opacity-70"
    >
      {submitting ? (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black/70 animate-pulse" />
          Sending
        </span>
      ) : (
        "Send Inquiry →"
      )}
    </button>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3 7l9 7 9-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2C9 21 3 15 3 6c0-1 1-2 2-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
