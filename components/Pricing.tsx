"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Demos";

type Tier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  popular?: boolean;
  delivery: string;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "250",
    tagline: "Get online, fast.",
    features: [
      "1–3 pages",
      "Mobile responsive",
      "Contact form",
      "Basic animations",
    ],
    delivery: "Delivered in 7 days",
  },
  {
    name: "Standard",
    price: "450",
    tagline: "The sweet spot.",
    popular: true,
    features: [
      "5 pages",
      "Mobile responsive",
      "SEO basics",
      "Google Maps",
      "Contact form",
      "Custom animations",
    ],
    delivery: "Delivered in 10 days",
  },
  {
    name: "Premium",
    price: "750",
    tagline: "Everything, dialed.",
    features: [
      "Unlimited pages",
      "Full SEO",
      "Online booking integration",
      "Full animations",
    ],
    delivery: "Priority 7-day delivery",
  },
];

type Addon = { label: string; price: string; required?: boolean };

const ADDONS: Addon[] = [
  { label: "NFC Cards · 5-pack", price: "$25" },
  { label: "NFC Cards · 25-pack", price: "$80" },
  { label: "Logo Design", price: "$75" },
  { label: "Domain Setup", price: "$25", required: true },
  { label: "Booking Integration", price: "$75–$150" },
  { label: "Extra Revision Round", price: "$50" },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeader
        eyebrow="Pricing"
        title="Straightforward. No surprises."
        subtitle="Flat-rate packages. 50% deposit, 50% at launch. No subscriptions, no recurring fees unless you want maintenance."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {TIERS.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} />
        ))}
      </div>

      {/* Objection tagline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center text-ink/85 text-sm md:text-base tracking-[0.05em] mt-14"
      >
        No hidden fees. No yearly contracts.{" "}
        <span className="text-gold italic">Pay once, own forever.</span>
      </motion.p>

      {/* Add-ons */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="text-muted text-xs tracking-[0.3em] uppercase mr-2 w-full text-center md:w-auto md:text-left">
          Add-ons
        </span>
        {ADDONS.map((a) => (
          <div
            key={a.label}
            className={`glass-soft rounded-full px-5 py-2.5 text-sm flex items-center gap-3 transition-colors ${
              a.required
                ? "border-gold/45 bg-gold/[0.04]"
                : "hover:border-gold/40"
            }`}
          >
            <span className="text-gold">+</span>
            <span className="text-ink">{a.label}</span>
            <span className="text-muted text-xs">{a.price}</span>
            {a.required && (
              <span className="text-[9px] tracking-[0.22em] uppercase text-gold/90 border-l border-gold/30 pl-3">
                Required
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function PricingCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 16,
        mass: 0.9,
        delay: index * 0.12,
      }}
      whileHover={{ y: -8 }}
      className={`relative group ${
        tier.popular ? "lg:-translate-y-4" : ""
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-goldlight text-black text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-1.5 rounded-full shadow-gold">
            Most Popular
          </div>
        </div>
      )}

      <div
        className={`glass rounded-2xl p-8 md:p-10 h-full flex flex-col transition-all duration-500 ${
          tier.popular
            ? "border-gold/60 animate-pulse-gold"
            : "group-hover:border-gold/40 group-hover:shadow-goldsoft"
        }`}
      >
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="editorial text-2xl text-ink">{tier.name}</h3>
          {tier.popular && (
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
              Recommended
            </span>
          )}
        </div>
        <p className="text-muted text-sm mb-8">{tier.tagline}</p>

        <div className="flex items-end gap-2 mb-8">
          <span className="text-muted text-2xl mb-2">$</span>
          <span className="editorial text-6xl text-ink leading-none">
            {tier.price}
          </span>
          <span className="text-muted text-sm mb-2">flat</span>
        </div>

        <div className="gold-divider mb-7 opacity-60" />

        <ul className="space-y-3.5 mb-10 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-ink/90">
              <CheckIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="text-muted text-xs tracking-[0.2em] uppercase mb-5">
          {tier.delivery}
        </div>

        <button
          type="button"
          onClick={() => {
            const key = tier.name.toLowerCase();
            window.dispatchEvent(
              new CustomEvent("checkout:selectTier", { detail: { tier: key } }),
            );
            document
              .getElementById("checkout")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={`block w-full text-center px-6 py-3.5 rounded-full text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 ${
            tier.popular
              ? "bg-gold text-black hover:bg-goldlight"
              : "border border-gold/40 text-ink hover:border-gold hover:text-goldlight"
          }`}
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-1 flex-shrink-0"
    >
      <path
        d="M2 7.5L5.5 11L12 3"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
