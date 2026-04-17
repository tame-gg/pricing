"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Demos";

const PLANS = [
  {
    name: "Basic",
    price: "100",
    bullets: ["Hosting", "Uptime monitoring", "Bug fixes"],
  },
  {
    name: "Standard",
    price: "200",
    bullets: [
      "Everything in Basic",
      "4 content updates / year",
      "Design tweaks",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "400",
    bullets: [
      "Everything in Standard",
      "SEO updates",
      "Priority support",
      "Unlimited updates",
    ],
  },
];

export default function Maintenance() {
  return (
    <section
      id="maintenance"
      className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeader
        eyebrow="Maintenance"
        title="Optional yearly care."
        subtitle="Keep your site fresh, fast, and indexed. Cancel anytime — these are not subscriptions, they're flat-yearly."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            whileHover={{ y: -4 }}
            className={`glass-soft rounded-xl p-7 transition-all duration-300 hover:border-gold/40 ${
              p.highlight ? "border-gold/30" : ""
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-ink text-lg tracking-wide">{p.name}</h3>
              {p.highlight && (
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold">
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-muted">$</span>
              <span className="editorial text-4xl text-ink">{p.price}</span>
              <span className="text-muted text-xs ml-1">/year</span>
            </div>
            <ul className="space-y-2.5">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-ink/85"
                >
                  <span className="text-gold mt-0.5">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
